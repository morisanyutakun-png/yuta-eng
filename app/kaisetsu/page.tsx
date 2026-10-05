import type { Metadata } from "next";
import Link from "next/link";

import { subject } from "@/lib/seo";
import { NOT_OFFICIAL, lastUpdated, published, questionCount, setPath, solutionUniversities } from "@/lib/solutions";
import { site } from "@/lib/site";

const years = [...new Set(published.map((s) => s.year))].sort((a, b) => b - a);
const unis = solutionUniversities();

const title = "大学入試数学 過去問の解答・解説｜独自解答と詳解";
const description =
  `大学入試の数学の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解を、大学別・年度別に掲載しています。` +
  `現在は${unis.length}大学・${published.length}区分・全${questionCount}問。問題文は載せず、大学公式の問題公開ページへリンクで案内します。` +
  `公式解答ではありません。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "大学入試 数学 過去問 解答",
    "入試数学 解説",
    "過去問 詳解",
    "大学入試 数学 別解",
    ...unis.flatMap(({ u }) => [`${u.university} 数学 過去問 解答`, `${subject(u)} 解答速報`]),
    ...years.map((y) => `${y}年度 入試数学 解答`),
  ],
  alternates: { canonical: "/kaisetsu" },
  openGraph: {
    title,
    description,
    url: "/kaisetsu",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export default function KaisetsuTop() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${site.url}/kaisetsu`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    hasPart: published.map((s) => ({
      "@type": "Article",
      headline: `${s.short} ${s.year}年度 ${s.subject} 解答・解説`,
      url: `${site.url}${setPath(s)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">過去問の解答・解説</span>
        </nav>

        <header className="pb-6 pt-4">
          <h1 className="serif text-[1.7rem] leading-snug text-ink sm:text-[2.1rem]">過去問の解答・解説</h1>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.92rem] leading-[1.95] text-ink-2">
            大学入試の数学の過去問を、当サイトで独自に解いた解答・計算過程・詳解・別解です。
            どの方針をなぜ選ぶのか、場合分けや端点の確認をどこまで書くのか、答案で省略しない方がよい説明は何かまで載せています。
            現在は{unis.length}大学・{published.length}区分・全{questionCount}問。
          </p>
          <p className="prose-ja mt-3 max-w-[38rem] border-l-2 border-navy/40 bg-paper-2/60 px-4 py-3 text-[0.84rem] leading-[1.9] text-ink-2">
            {NOT_OFFICIAL}
            問題文は各大学が公開しているページへ、ページごとにリンクしています。
            {lastUpdated && `最終更新 ${lastUpdated.replace(/-/g, "/")}。`}
          </p>
        </header>

        <section aria-labelledby="by-univ" className="mt-2">
          <h2 id="by-univ" className="rule-mark serif text-[1.3rem] text-ink">
            大学から探す
          </h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {unis.map(({ u, sets }) => (
              <li key={u.slug}>
                <Link
                  href={`/kaisetsu/${u.slug}`}
                  className="group flex min-h-[3.6rem] items-center justify-between gap-4 py-3.5"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.98rem] font-semibold text-ink transition-colors group-hover:text-navy">
                      {subject(u)}
                    </span>
                    <span className="mt-0.5 block text-[0.74rem] text-ink-3">
                      {u.university}
                      {u.course && `・${u.course}`}／
                      {sets.map((s) => `${s.year}年度（全${s.questions.length}問）`).join("・")}
                    </span>
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="size-3.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
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

        <section aria-labelledby="by-year" className="mt-12">
          <h2 id="by-year" className="rule-mark serif text-[1.3rem] text-ink">
            年度から探す
          </h2>
          <div className="mt-4 space-y-6">
            {years.map((y) => (
              <div key={y}>
                <h3 className="serif border-b border-rule pb-1.5 text-[0.95rem] text-ink">{y}年度入試</h3>
                <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem]">
                  {published
                    .filter((s) => s.year === y)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={setPath(s)} className="text-navy underline underline-offset-4">
                          {s.short} {s.subject}（{s.division}）
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="policy" className="mt-14 border-t border-rule pt-7">
          <h2 id="policy" className="serif text-[1.15rem] text-ink">
            掲載のきまり
          </h2>
          <ul className="prose-ja mt-3 list-disc space-y-2 pl-5 text-[0.86rem] leading-[1.9] text-ink-2 marker:text-ink-3">
            <li>問題文・図・表は掲載していません。問題は各大学の公開ページでご覧ください。</li>
            <li>解答・計算過程・詳解・別解は、原典にあたったうえで当サイトが独自に作成したものです。</li>
            <li>大学の公式解答・出題意図や、予備校・問題集の解答解説は引用も要約もしていません。</li>
            <li>配点・採点基準・難易度を大学の公表値として示すことはしません。当サイトの見立てを出すときは、その旨を明記します。</li>
            <li>原典が確認できていない年度・大問はページを作っていません。推測で埋めることはしません。</li>
          </ul>
        </section>
      </div>
    </>
  );
}
