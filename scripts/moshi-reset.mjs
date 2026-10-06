/**
 * 模試の参加申込をすべて消す。試しに入れたものを片づけるためのもの。
 *
 *   DATABASE_URL='…' node scripts/moshi-reset.mjs --yes
 *
 * 取り消せないので、--yes を付けないと何も消さずに件数だけ出す。
 * 特定の1件だけ消したいときは --email=xxx@example.com を使う。
 */
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL が設定されていない。");
  process.exit(1);
}

const args = process.argv.slice(2);
const go = args.includes("--yes");
const one = args.find((a) => a.startsWith("--email="))?.slice("--email=".length);

const client = new pg.Client({
  connectionString: url,
  ssl: /sslmode=disable|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: true },
});
await client.connect();

const where = one ? "where lower(email) = lower($1)" : "";
const params = one ? [one] : [];

const { rows } = await client.query(
  `select a.id, a.name, a.email, a.created_at,
          coalesce(array_agg(u.university_id) filter (where u.university_id is not null), '{}') as unis
     from exam_applications a
     left join exam_application_universities u on u.application_id = a.id
     ${where ? where.replace("where", "where") : ""}
     group by a.id order by a.created_at`,
  params,
);

if (rows.length === 0) {
  console.log(one ? `${one} の申込は見つからなかった。` : "申込は1件もない。");
  await client.end();
  process.exit(0);
}

console.log(`${one ? `${one} の` : ""}対象 ${rows.length} 件:\n`);
for (const r of rows) {
  const when = new Date(r.created_at).toLocaleString("ja-JP");
  console.log(`  ${when}  ${r.name}  ${r.email}  [${r.unis.join(", ")}]`);
}

if (!go) {
  console.log("\n消すなら --yes を付けて実行する。取り消せないので注意。");
  await client.end();
  process.exit(0);
}

// 中間表は外部キーの on delete cascade で一緒に消える
const del = await client.query(
  one
    ? "delete from exam_applications where lower(email) = lower($1)"
    : "delete from exam_applications",
  params,
);
console.log(`\n${del.rowCount} 件を削除した。`);
await client.end();
