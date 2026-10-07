import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HeaderStats, PageHeader } from "@/components/page-header";
import { sectionStyle } from "@/lib/sections";
import { subject } from "@/lib/seo";
import { NOT_OFFICIAL, lastUpdated, published, questionCount, setPath, solutionUniversities } from "@/lib/solutions";
import { site } from "@/lib/site";

const years = [...new Set(published.map((s) => s.year))].sort((a, b) => b - a);
const unis = solutionUniversities();

const title = "大学入試数学 過去問の解答・解説｜独自解答と詳解";
const description =
  `大学入試の数学の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解を、大学別・年度別に掲載しています。` +
  `現在は${unis.length}大学・${published.length}年度分・全${questionCount}問。問題文は掲載していません。公式解答ではありません。`;

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

      <div
        className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
        style={sectionStyle("kaisetsu")}
      >
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">過去問の解答・解説</span>
        </nav>

        {/*
          最初の画面には「何の解答か」「どれだけあるか」だけを置く。
          掲載のきまりは下に節があるので、ここでは1行の断り書きとリンクだけにする。
        */}
        <PageHeader
          section="kaisetsu"
          title="過去問の解答・解説"
          covers={unis.slice(0, 3).map(({ u }) => `/covers/thumb/${u.books[0].asin}.webp`)}
          lead={
            <>
              大学入試の数学の過去問を、当サイトで独自に解いた解答・計算過程・詳解・別解です。
              どの方針をなぜ選ぶのか、答案で省略しない方がよい説明は何かまで書いています。
            </>
          }
          meta={
            <HeaderStats
              items={[
                { k: "掲載した大学", v: unis.length, u: "大学" },
                { k: "掲載した年度", v: published.length, u: "年度分" },
                { k: "解いた大問", v: questionCount, u: "問" },
              ]}
            />
          }
        />

        <p className="prose-ja mt-5 text-[0.82rem] leading-[1.9] text-ink-3">
          {NOT_OFFICIAL}
          {lastUpdated && `　最終更新 ${lastUpdated.replace(/-/g, "/")}。`}
          <Link href="/kaisetsu/policy" className="ml-1 text-navy underline underline-offset-4">
            掲載方針
          </Link>
        </p>

        <section aria-labelledby="by-univ" className="mt-12">
          <h2 id="by-univ" className="rule-mark rule-mark-accent serif text-[1.3rem] text-ink">
            大学から探す
          </h2>
          {/* 表紙を添えると、文字だけの行より目的の大学を見つけやすい */}
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unis.map(({ u, sets }) => {
              const total = sets.reduce((n, s) => n + s.questions.length, 0);
              return (
                <li key={u.slug}>
                  <Link href={`/kaisetsu/${u.slug}`} className="card card-link group flex h-full gap-3.5 p-3.5">
                    <Image
                      src={`/covers/thumb/${u.books[0].asin}.webp`}
                      alt=""
                      width={160}
                      height={226}
                      loading="lazy"
                      sizes="56px"
                      className="h-[79px] w-[56px] shrink-0 rounded-[2px] border border-rule object-cover"
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[0.97rem] font-semibold leading-snug text-ink transition-colors group-hover:text-navy">
                        {subject(u)}
                      </span>
                      <span className="mt-0.5 text-[0.73rem] text-ink-3">
                        {u.university}
                        {u.course && `・${u.course}`}
                      </span>
                      <span className="mt-auto flex flex-wrap items-center gap-1 pt-2">
                        {sets.map((s) => (
                          <span key={s.year} className="badge">
                            {s.year}年度
                          </span>
                        ))}
                        <span className="badge badge-accent">全{total}問</span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="by-year" className="mt-14">
          <h2 id="by-year" className="rule-mark serif text-[1.3rem] text-ink">
            年度から探す
          </h2>
          <div className="mt-5 space-y-5">
            {years.map((y) => (
              <div key={y}>
                <h3 className="serif text-[1rem] text-ink">
                  {y}年度入試
                  <span className="ml-2 font-sans text-[0.72rem] font-normal text-ink-3">
                    {published.filter((s) => s.year === y).length}区分
                  </span>
                </h3>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {published
                    .filter((s) => s.year === y)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={setPath(s)}
                          className="badge transition-colors hover:border-navy/40 hover:text-navy"
                        >
                          {s.short}
                          <span className="text-ink-3">（{s.division}）</span>
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
            <li>問題文・図・表は掲載していません。書き写しも言い換えもしていません。</li>
            <li>解答・計算過程・詳解・別解は、原典にあたったうえで当サイトが独自に作成したものです。</li>
            <li>大学の公式解答・出題意図や、予備校・問題集の解答解説は引用も要約もしていません。</li>
            <li>配点・採点基準・難易度を大学の公表値として示すことはしません。当サイトの見立てを出すときは、その旨を明記します。</li>
            <li>原典が確認できていない年度・大問はページを作っていません。推測で埋めることはしません。</li>
            <li>
              問題を転載している非公式サイトへのリンクはしていません。くわしくは
              <Link href="/kaisetsu/policy" className="mx-1 font-semibold text-navy underline underline-offset-4">
                掲載方針
              </Link>
              をご覧ください。
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
