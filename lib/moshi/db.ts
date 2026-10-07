import { Pool } from "pg";

/**
 * 申込の保存。
 *
 * 接続先は環境変数 DATABASE_URL だけから読む。接続文字列をコードに書かない。
 * 設定がないときは「いまは受け付けられない」と呼ぶ側が答えられるようにして、
 * 設定漏れで 500 を返し原因が分からなくなるのを避ける。
 *
 * ドライバは標準の pg を使う。Neon も通常の接続文字列を受けるので同じコードで動き、
 * 手元の Postgres でもそのまま動く。試せない経路を本番にだけ置かない。
 * サーバーレスでは接続が増えがちなので、Neon では末尾が -pooler の
 * 接続文字列（プール経由）を使うこと。
 */

declare global {
  // 開発中の再読み込みでプールが増え続けないよう、1つだけ持ち回す
  var __moshiPool: Pool | undefined;
}

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

function pool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL が設定されていない");
  if (!globalThis.__moshiPool) {
    globalThis.__moshiPool = new Pool({
      connectionString: url,
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
      // 手元の Postgres は TLS なしで動かすので、接続文字列の指定に従う
      ssl: /sslmode=disable|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: true },
    });
  }
  return globalThis.__moshiPool;
}

export type ApplicationInput = {
  name: string;
  email: string;
  grade: string;
  faculty: string | null;
  universityIds: string[];
};

export type ApplicationResult = {
  /** 今回の申込で新しく加わった大学 */
  added: string[];
  /** すでに申し込み済みだった大学 */
  already: string[];
  /** その人が現在申し込んでいる大学すべて */
  all: string[];
  /** 同じメールアドレスの申込が前からあったか */
  returning: boolean;
};

/**
 * 申込を保存する。
 *
 * 同じメールアドレスの申込があれば、新しい大学を足すだけにする。
 * 氏名・学年・志望学部は最後に送られたもので上書きする（書き直しに使える）。
 * 同じ大学は二重に入らない（中間表の主キーで弾く）。
 *
 * 途中で失敗したときに「人は作られたが大学は入っていない」状態を残さないよう、
 * ひとつのトランザクションにまとめる。
 */
export async function saveApplication(input: ApplicationInput): Promise<ApplicationResult> {
  const client = await pool().connect();
  try {
    await client.query("begin");

    const before = await client.query<{ university_id: string | null }>(
      `select u.university_id
         from exam_applications a
         left join exam_application_universities u on u.application_id = a.id
        where lower(a.email) = lower($1)`,
      [input.email],
    );
    const returning = before.rowCount !== null && before.rowCount > 0;
    const had = before.rows.map((r) => r.university_id).filter((v): v is string => Boolean(v));

    const ins = await client.query<{ id: string }>(
      `insert into exam_applications (name, email, grade, faculty)
       values ($1, $2, $3, $4)
       on conflict (lower(email)) do update
          set name = excluded.name,
              grade = excluded.grade,
              faculty = excluded.faculty,
              updated_at = now()
       returning id`,
      [input.name, input.email, input.grade, input.faculty],
    );
    const id = ins.rows[0].id;

    for (const universityId of input.universityIds) {
      await client.query(
        `insert into exam_application_universities (application_id, university_id)
         values ($1, $2) on conflict do nothing`,
        [id, universityId],
      );
    }

    const after = await client.query<{ university_id: string }>(
      `select university_id from exam_application_universities where application_id = $1`,
      [id],
    );

    await client.query("commit");

    return {
      added: input.universityIds.filter((u) => !had.includes(u)),
      already: input.universityIds.filter((u) => had.includes(u)),
      all: after.rows.map((r) => r.university_id),
      returning,
    };
  } catch (e) {
    await client.query("rollback").catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

/**
 * メールの結果を書くための列を足す。
 *
 * 足すだけ・何度流しても同じ結果になる文だけを使う。
 * 既にある行には触らず、値は null で入る（PostgreSQL 11 以降は即座に終わる）。
 *
 * 1つのインスタンスにつき一度しか試さない。権限が無いなどで足せなくても、
 * 申込そのものは成り立っているので、黙って諦める。
 */
let columnsEnsured = false;

async function ensureMailColumns(): Promise<boolean> {
  if (columnsEnsured) return true;
  try {
    await pool().query(`
      alter table exam_applications add column if not exists mail_confirmation text;
      alter table exam_applications add column if not exists mail_admin        text;
      alter table exam_applications add column if not exists mail_at           timestamptz;
    `);
    columnsEnsured = true;
    console.log("[moshi-db] メールの記録用の列を追加した");
    return true;
  } catch (e) {
    console.error("[moshi-db] 列を追加できなかった:", e instanceof Error ? e.message : e);
    return false;
  }
}

/**
 * メールの結果を申込に書いておく。
 *
 * 届かなかったときに、あとから「何が起きたか」を管理画面で見られるようにする。
 * 以前は送信結果を捨てていたので、届かない理由を外からは追えなかった。
 *
 * 列がまだ無いときは、その場で足してから書き直す。
 * 移行のためだけに手で1回コマンドを流す、という手順を残さないため。
 * 足せなかったときは黙って見送る（申込そのものは成り立っている）。
 */
export async function recordMailResult(
  email: string,
  confirmation: string,
  admin: string,
): Promise<void> {
  const write = () =>
    pool().query(
      `update exam_applications
          set mail_confirmation = $2, mail_admin = $3, mail_at = now()
        where lower(email) = lower($1)`,
      [email, confirmation.slice(0, 200), admin.slice(0, 200)],
    );

  try {
    await write();
    columnsEnsured = true;
  } catch (e) {
    // 42703 = そんな列は無い。足してから一度だけ書き直す。
    const code = (e as { code?: string })?.code;
    if (code !== "42703") return;
    if (!(await ensureMailColumns())) return;
    try {
      await write();
    } catch {
      /* 足した直後に書けないなら、記録は諦める */
    }
  }
}

/** 申込者の人数だけを数える。運営あての知らせに添える。 */
export async function countApplications(): Promise<number | null> {
  try {
    const r = await pool().query<{ n: number }>("select count(*)::int as n from exam_applications");
    return r.rows[0].n;
  } catch {
    return null;
  }
}

/**
 * 申込を1件消す。
 *
 * 管理画面から、試しに入れた申込を片づけるためのもの。
 * 中間表は外部キーで一緒に消える（scripts/moshi-schema.sql の on delete cascade）。
 * 消したものは戻らないので、呼ぶ側で必ず確かめてから呼ぶこと。
 * 戻り値は消した人の氏名とメールアドレス。画面に「何を消したか」を出すために使う。
 */
export async function deleteApplication(id: string): Promise<{ name: string; email: string } | null> {
  const r = await pool().query<{ name: string; email: string }>(
    "delete from exam_applications where id = $1 returning name, email",
    [id],
  );
  return r.rows[0] ?? null;
}

export type Summary = {
  total: number;
  byUniversity: { universityId: string; count: number }[];
  applicants: {
    id: string;
    name: string;
    email: string;
    grade: string;
    faculty: string | null;
    status: string;
    payment: string;
    createdAt: string;
    universityIds: string[];
    /** 確認メールの結果。記録がなければ null */
    mailConfirmation: string | null;
    /** 運営への知らせの結果 */
    mailAdmin: string | null;
  }[];
};

/** 管理画面に出す集計。大学別の人数が一番見たい数字なので先に出す。 */
export async function summary(): Promise<Summary> {
  const p = pool();

  const total = await p.query<{ n: number }>("select count(*)::int as n from exam_applications");
  const counts = await p.query<{ university_id: string; n: number }>(
    `select university_id, count(*)::int as n
       from exam_application_universities
      group by university_id
      order by n desc, university_id`,
  );
  const people = await p.query<{
    id: string;
    name: string;
    email: string;
    grade: string;
    faculty: string | null;
    application_status: string;
    payment_status: string;
    created_at: Date;
    universities: string[];
    mail_confirmation: string | null;
    mail_admin: string | null;
  }>(
    // 列がまだ無い表でも落ちないよう、行ごと JSON にしてから取り出す。
    // 無い列は null になるだけで、問い合わせ自体は通る。
    `select a.id, a.name, a.email, a.grade, a.faculty,
            a.application_status, a.payment_status, a.created_at,
            to_jsonb(a) ->> 'mail_confirmation' as mail_confirmation,
            to_jsonb(a) ->> 'mail_admin'        as mail_admin,
            coalesce(array_agg(u.university_id) filter (where u.university_id is not null), '{}') as universities
       from exam_applications a
       left join exam_application_universities u on u.application_id = a.id
      group by a.id
      order by a.created_at desc`,
  );

  return {
    total: total.rows[0].n,
    byUniversity: counts.rows.map((r) => ({ universityId: r.university_id, count: r.n })),
    applicants: people.rows.map((r) => ({
      id: String(r.id),
      name: r.name,
      email: r.email,
      grade: r.grade,
      faculty: r.faculty,
      status: r.application_status,
      payment: r.payment_status,
      createdAt: new Date(r.created_at).toISOString(),
      universityIds: r.universities ?? [],
      mailConfirmation: r.mail_confirmation,
      mailAdmin: r.mail_admin,
    })),
  };
}
