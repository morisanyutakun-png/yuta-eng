import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import { moshi, priceLabel, roundLabel } from "@/lib/moshi/config";
import { THANKS_COOKIE } from "@/lib/moshi/validate";
import { site } from "@/lib/site";

/**
 * 参加申込のあとに来るページ。
 *
 * 申し込んだ大学は URL に載せず、画面側に残しておいた控えから読む。
 * 直接この住所を開いた人にも、何も壊れずに案内だけが出るようにする。
 *
 * 独立した住所にしてあるので、ここに来た回数をそのまま申込の数として数えられる。
 * 検索結果には出さない（申し込んだ人だけが通る場所なので）。
 */
const title = "参加申込を受け付けました";
const description =
  `${moshi.title}の参加申込を受け付けました。お申し込みいただいた大学と、このあとの流れをご案内しています。` +
  `正式な受験日程とお支払い方法は、確定しだいメールでお知らせします。現時点では料金は発生していません。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/moshi/thanks" },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: "/moshi/thanks",
    type: "article",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
};

// cookie を読むのでページは都度組み立てる
export const dynamic = "force-dynamic";

/** 申込直後だけ渡ってくる控え。無ければ何も出さない */
async function lastApplication() {
  try {
    const raw = (await cookies()).get(THANKS_COOKIE)?.value;
    if (!raw) return null;
    const d = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    const ids: string[] = Array.isArray(d?.u) ? d.u : [];
    const list = ids
      .map((id) => moshi.universities.find((u) => u.id === id))
      .filter((u): u is NonNullable<typeof u> => Boolean(u));
    return list.length ? { list, mailed: Boolean(d?.m), returning: Boolean(d?.r) } : null;
  } catch {
    return null;
  }
}

export default async function MoshiThanks() {
  const done = await lastApplication();
  const next = [
    ["これから", `${roundLabel}。正式な受験期間が決まりしだい、メールでご案内します。`],
    ["お支払い", `受験料は${priceLabel}の予定です。現時点では料金は発生していません。お支払い方法は日程のご案内とあわせてお知らせします。`],
    ["取り消し", "お支払いの期限までにご入金が確認できない場合、お申し込みは自動的に取り消しとなります。"],
  ] as const;

  return (
    <div className="page">
      <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
        <Link href="/" className="hover:text-navy">
          トップ
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <Link href="/moshi" className="hover:text-navy">
          {moshi.title}
        </Link>
        <span className="mx-1.5 text-rule">／</span>
        <span className="text-ink-2">参加申込</span>
      </nav>

      <header className="border-b border-rule pb-8 pt-7">
        <p className="eyebrow">{moshi.season}・{moshi.title}</p>
        <h1 className="serif h-page mt-1.5 text-ink">参加申込を受け付けました。</h1>
        <p className="prose-ja mt-4 max-w-[38rem] text-[0.97rem] leading-[1.95] text-ink-2">
          正式な受験日程・受験料のお支払い方法については、確定後にメールでご案内します。
        </p>
      </header>

      {/* 申し込んだ大学と、メールを送れたかどうか。画面側の控えから読む */}
      {done ? (
        <section aria-labelledby="applied" className="mt-8">
          <h2 id="applied" className="text-[0.74rem] font-bold tracking-wide text-ink-3">
            申込済み
          </h2>
          <ul className="mt-2.5 border border-rule">
            {done.list.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-b border-rule px-4 py-3 last:border-0 sm:px-5"
              >
                <span className="text-[1rem] font-semibold text-ink">{u.university}</span>
                <span className="text-[0.82rem] text-ink-2">{u.exam}</span>
              </li>
            ))}
          </ul>

          {done.returning && (
            <p className="prose-ja mt-3 text-[0.84rem] leading-[1.9] text-ink-2">
              以前のお申し込みと同じメールアドレスでしたので、同じ申込にまとめました。
              上の一覧が、現在お申し込みいただいているすべての模試です。
            </p>
          )}

          <p className="prose-ja mt-3 text-[0.82rem] leading-[1.9] text-ink-3">
            {done.mailed
              ? "確認メールをお送りしました。数分たっても届かない場合は、迷惑メールフォルダをご確認ください。"
              : "確認メールの送信ができませんでした。お申し込み自体は受け付けていますので、そのままお待ちください。"}
          </p>
        </section>
      ) : (
        <p className="prose-ja mt-7 text-[0.9rem] leading-[1.95] text-ink-2">
          お申し込みいただいた内容は、確認メールに記載しています。ご確認ください。
        </p>
      )}

      <section aria-labelledby="next" className="mt-12">
        <h2 id="next" className="rule-mark serif h-sect text-ink">
          このあとの流れ
        </h2>
        <dl className="mt-5 border border-rule">
          {next.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-rule px-4 py-3.5 last:border-0 sm:grid-cols-[6rem_1fr] sm:px-5"
            >
              <dt className="text-[0.8rem] leading-relaxed text-ink-3">{k}</dt>
              <dd className="prose-ja text-[0.88rem] leading-[1.9] text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="meanwhile" className="mt-12">
        <h2 id="meanwhile" className="serif h-sect text-ink">
          受験までのあいだに
        </h2>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {[
            { href: "/universities", h: "志望校の出題分析を読む", b: "試験時間・大問構成・頻出分野を年度別にまとめています。" },
            { href: "/kaisetsu", h: "過去問の解答・解説を読む", b: "当サイトが独自に解いた解答と詳解です。答案の書き方の参考にどうぞ。" },
            { href: "/books", h: "教材を見る", b: "本番と同じ形式の予想問題集と、分野別の演習書を刊行しています。" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center justify-between gap-5 py-4">
                <span className="min-w-0">
                  <span className="block text-[0.93rem] font-semibold text-ink transition-colors group-hover:text-navy">
                    {l.h}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed text-ink-3">{l.b}</span>
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-3.5 shrink-0 text-ink-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.78rem] leading-[1.9] text-ink-3">
        お申し込みの取り消しや内容の変更をご希望の場合は、
        {site.contact ? (
          <a href={`mailto:${site.contact}`} className="mx-1 underline underline-offset-4 hover:text-navy">
            {site.contact}
          </a>
        ) : (
          "お問い合わせ先"
        )}
        までご連絡ください。
        <Link href="/moshi/privacy" className="ml-1 underline underline-offset-4 hover:text-navy">
          個人情報の取り扱い
        </Link>
      </p>
    </div>
  );
}
