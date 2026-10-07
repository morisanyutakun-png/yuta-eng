import { DeleteApplicant } from "@/components/moshi-admin-delete";
import { moshi, moshiUniversity } from "@/lib/moshi/config";
import { hasDatabase, summary } from "@/lib/moshi/db";
import { adminAddress, canNotifyAdmin, canSendMail } from "@/lib/moshi/mail";

/**
 * 申込の確認用。
 *
 * 見たいのは「どの大学に需要があるか」なので、大学別の人数を最初に出す。
 * 申込が0件の大学も行として出す。0だと分かることに意味があるため。
 *
 * この画面は middleware.ts の Basic 認証で守っている。
 * 検索結果に出ないよう、indexing も止める。
 */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

/** メールの結果を1行で。記録が無い申込は「—」にする（古い申込など） */
function MailState({ label, detail }: { label: string; detail: string | null }) {
  if (!detail) return <span className="block text-[0.72rem] text-ink-3">{label} —</span>;
  const ok = detail === "ok";
  return (
    <span className="block whitespace-nowrap text-[0.72rem]">
      <span className="text-ink-3">{label} </span>
      <span className={ok ? "text-navy" : "font-semibold text-accent"}>{ok ? "送信済み" : detail}</span>
    </span>
  );
}

const jp = (iso: string) =>
  new Date(iso).toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

export default async function MoshiAdmin() {
  if (!hasDatabase()) {
    return (
      <div className="page py-12">
        <h1 className="serif h-sect text-ink">模試の申込</h1>
        <p className="prose-ja mt-4 text-[0.9rem] text-ink-2">
          DATABASE_URL が設定されていないため、申込を読み出せません。
        </p>
      </div>
    );
  }

  const s = await summary();
  // 設定の状態。鍵そのものは出さず、入っているかどうかだけを見せる
  const notify = adminAddress();
  const settings = [
    { k: "申込の保存（DATABASE_URL）", ok: hasDatabase() },
    { k: "申込者への確認メール（RESEND_API_KEY・MOSHI_MAIL_FROM）", ok: canSendMail() },
    {
      // 届かないときに、ここを見れば原因が分かるようにする。
      // アドレスそのものは出さず、@ より後ろだけを見せる。
      k: `運営への知らせ（MOSHI_ADMIN_EMAIL）${notify ? `… @${notify.split("@")[1] ?? ""}` : ""}`,
      ok: canNotifyAdmin(),
    },
  ];
  const counts = new Map(s.byUniversity.map((b) => [b.universityId, b.count]));
  // 申込のない大学も 0 として並べる
  const rows = moshi.universities
    .map((u) => ({ u, n: counts.get(u.id) ?? 0 }))
    .sort((a, b) => b.n - a.n || a.u.university.localeCompare(b.u.university, "ja"));

  return (
    <div className="page page-wide py-10">
      <h1 className="serif h-page text-ink">模試の申込</h1>
      <p className="mt-2 text-[0.85rem] text-ink-2">
        総申込人数 <strong className="serif text-[1.3rem] tabular-nums text-ink">{s.total}</strong> 人
        <span className="ml-3 text-ink-3">延べ {s.byUniversity.reduce((n, b) => n + b.count, 0)} 件</span>
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 border-y border-rule py-3 text-[0.8rem]">
        {settings.map((x) => (
          <li key={x.k} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={x.ok ? "text-navy" : "text-accent"}>
              {x.ok ? "●" : "○"}
            </span>
            <span className="text-ink-2">{x.k}</span>
            <span className={x.ok ? "text-ink-3" : "font-semibold text-accent"}>
              {x.ok ? "設定済み" : "未設定"}
            </span>
          </li>
        ))}
      </ul>

      <section aria-labelledby="by-univ" className="mt-9">
        <h2 id="by-univ" className="rule-mark serif h-sect text-ink">
          大学別の申込人数
        </h2>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {rows.map(({ u, n }) => (
            <li key={u.id} className="flex items-center gap-4 py-2.5">
              <span className="min-w-0 flex-1 text-[0.95rem] text-ink">
                {u.university}
                <span className="ml-2 text-[0.78rem] text-ink-3">{u.exam}</span>
              </span>
              {/* 多い少ないが一目で分かるよう、数字の横に長さも出す */}
              <span className="hidden h-1.5 w-40 overflow-hidden bg-paper-2 sm:block">
                <span
                  className="block h-full bg-navy"
                  style={{ width: `${s.total ? Math.round((n / Math.max(1, rows[0].n)) * 100) : 0}%` }}
                />
              </span>
              <span className="serif w-12 shrink-0 text-right text-[1.05rem] tabular-nums text-ink">{n}</span>
              <span className="w-4 shrink-0 text-[0.75rem] text-ink-3">人</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="people" className="mt-12">
        <h2 id="people" className="rule-mark serif h-sect text-ink">
          申込者一覧
        </h2>
        {s.applicants.length === 0 ? (
          <p className="mt-4 text-[0.9rem] text-ink-2">まだ申込はありません。</p>
        ) : (
          <div className="table-wrap mt-4">
            <table className="w-full min-w-[58rem] border-collapse text-left text-[0.8rem]">
              <thead>
                <tr className="border-b-2 border-navy/35 bg-paper-2">
                  {["申込日時", "氏名", "メールアドレス", "学年", "志望学部", "申込大学", "メール送信", "状態", ""].map((h) => (
                    <th key={h || "操作"} scope="col" className="whitespace-nowrap px-3 py-2.5 text-[0.72rem] font-bold text-navy">
                      {h || <span className="sr-only">操作</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.applicants.map((a) => (
                  <tr key={a.id} className="border-b border-rule bg-white even:bg-paper-2/55">
                    <td className="whitespace-nowrap px-3 py-2.5 align-top tabular-nums text-ink-2">{jp(a.createdAt)}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 align-top font-semibold text-ink">{a.name}</td>
                    <td className="px-3 py-2.5 align-top break-all text-ink-2">{a.email}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 align-top text-ink-2">{a.grade}</td>
                    <td className="whitespace-nowrap px-3 py-2.5 align-top text-ink-2">{a.faculty ?? "—"}</td>
                    <td className="px-3 py-2.5 align-top text-ink-2">
                      {a.universityIds.map((id) => moshiUniversity(id)?.university ?? id).join("、")}
                    </td>
                    {/*
                      届いたかどうかを1件ずつ出す。
                      失敗した理由をそのまま出すので、何が起きたかが画面で分かる。
                    */}
                    <td className="px-3 py-2.5 align-top">
                      <MailState label="確認" detail={a.mailConfirmation} />
                      <MailState label="運営" detail={a.mailAdmin} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 align-top text-ink-3">
                      {a.status}／{a.payment}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <DeleteApplicant id={a.id} name={a.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {s.applicants.length > 0 && (
          <p className="mt-3 text-[0.76rem] leading-relaxed text-ink-3">
            「取り消す」を押すと、その申込を完全に消します。元に戻せません。
            試しに入れた申込を片づけるためのものです。
          </p>
        )}
      </section>
    </div>
  );
}
