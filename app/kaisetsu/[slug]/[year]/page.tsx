import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SolutionFooter } from "@/components/solution-footer";
import { SourceLink } from "@/components/source-link";
import { SubQuestionBlock } from "@/components/solution-blocks";
import { shortName, subject } from "@/lib/seo";
import { NOT_OFFICIAL, published, questionPath, solutionSet } from "@/lib/solutions";
import { getUniversity } from "@/lib/data";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string; year: string }> };

export function generateStaticParams() {
  return published.map((s) => ({ slug: s.slug, year: String(s.year) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, year } = await params;
  const s = solutionSet(slug, Number(year));
  const u = getUniversity(slug);
  if (!s || !u) return {};
  const short = shortName(u);
  const title = `${s.short} ${s.year}年度 数学の解答・解説｜全${s.questions.length}問の詳解`;
  const description =
    `${s.university}${s.year}年度（${s.schedule}・${s.division}）の数学について、当サイトが独自に解いた解答・計算過程・詳解・別解。` +
    `全${s.questions.length}問の分野は${s.questions.map((q) => q.field).join("、")}。` +
    `問題文は掲載していません。公式解答ではありません。`;
  return {
    title,
    description,
    keywords: [
      `${short} ${s.year} 数学 解答`,
      `${s.university} ${s.year}年度 数学 解答`,
      `${short} ${s.year} 数学 解説`,
      `${short} 数学 ${s.year} 詳解`,
      `${short} 数学 解答速報`,
      ...s.questions.map((q) => `${short} ${s.year} 第${q.no}問`),
      ...s.questions.flatMap((q) => q.topics.map((t) => `${short} 数学 ${t}`)),
    ],
    alternates: { canonical: `/kaisetsu/${s.slug}/${s.year}` },
    openGraph: {
      title,
      description,
      url: `/kaisetsu/${s.slug}/${s.year}`,
      type: "article",
      images: [{ url: `/og/${s.slug}.jpg`, width: 1200, height: 630, alt: subject(u) }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${s.slug}.jpg`] },
  };
}

export default async function YearPage({ params }: Props) {
  const { slug, year } = await params;
  const s = solutionSet(slug, Number(year));
  const u = getUniversity(slug);
  if (!s || !u) notFound();
  const updated = s.questions.map((q) => q.updated).sort().at(-1)!;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${s.short} ${s.year}年度 数学の解答・解説`,
      description: `${s.university}${s.year}年度（${s.schedule}・${s.division}）数学の、当サイト独自の解答・解説。`,
      author: { "@type": "Person", name: site.author },
      publisher: { "@type": "Organization", name: site.name },
      dateModified: updated,
      inLanguage: "ja",
      isAccessibleForFree: true,
      url: `${site.url}/kaisetsu/${s.slug}/${s.year}`,
      about: s.questions.map((q) => ({ "@type": "Thing", name: q.field })),
      ...(s.source?.kind === "official"
        ? { citation: { "@type": "CreativeWork", name: s.source.pageTitle, url: s.source.url } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
        { "@type": "ListItem", position: 2, name: "過去問の解答・解説", item: `${site.url}/kaisetsu` },
        { "@type": "ListItem", position: 3, name: subject(u), item: `${site.url}/kaisetsu/${s.slug}` },
        { "@type": "ListItem", position: 4, name: `${s.year}年度`, item: `${site.url}/kaisetsu/${s.slug}/${s.year}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href="/kaisetsu" className="hover:text-navy">
            過去問の解答・解説
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href={`/kaisetsu/${s.slug}`} className="hover:text-navy">
            {subject(u)}
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">{s.year}年度</span>
        </nav>

        <header className="pb-2 pt-4">
          <p className="eyebrow">
            {s.university}　{s.year}年度　{s.schedule}　{s.division}
          </p>
          <h1 className="serif mt-1 text-[1.65rem] leading-snug text-ink sm:text-[2rem]">
            {s.short} {s.year}年度 {s.subject}の解答・解説
          </h1>
          <p className="prose-ja mt-3 text-[0.92rem] leading-[1.95] text-ink-2">
            全{s.questions.length}問。当サイトで独自に解いた解答・計算過程・詳解・別解を、大問ごとに載せています。
          </p>
          <p className="mt-2 text-[0.72rem] tabular-nums text-ink-3">最終更新 {updated.replace(/-/g, "/")}</p>
        </header>

        {s.source && <SourceLink source={s.source} division={s.division} />}

        <nav aria-labelledby="qlist" className="mt-7 border-y border-rule py-3.5">
          <h2 id="qlist" className="text-[0.72rem] font-bold tracking-wide text-ink-2">
            この年度の大問
          </h2>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.86rem]">
            {s.questions.map((q) => (
              <li key={q.no}>
                <a href={`#q${q.no}`} className="text-navy underline underline-offset-4">
                  第{q.no}問
                </a>
                <span className="ml-1 text-ink-3">{q.field}</span>
              </li>
            ))}
          </ul>
        </nav>

        {s.questions.map((q) => (
          <article key={q.no} id={`q${q.no}`} className="mt-12 scroll-mt-4">
            <header className="border-b border-rule pb-2.5">
              <h2 className="serif text-[1.35rem] leading-snug text-ink">
                第{q.no}問　{q.field}
              </h2>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] text-ink-3">
                <span>{q.topics.join("・")}</span>
                {q.ownDifficulty && (
                  <span className="border border-rule px-1.5 py-0.5">
                    当サイトの体感難易度：{q.ownDifficulty}
                  </span>
                )}
              </p>
            </header>

            {q.subs.map((sub) => (
              <SubQuestionBlock key={sub.label || "x"} sub={sub} qNo={q.no} />
            ))}

            <p className="mt-5 text-[0.82rem]">
              <Link href={questionPath(s, q.no)} className="text-navy underline underline-offset-4">
                第{q.no}問だけのページ
              </Link>
            </p>
          </article>
        ))}

        <p className="prose-ja mt-14 border-t border-rule pt-5 text-[0.78rem] leading-[1.9] text-ink-3">
          {NOT_OFFICIAL}
          解答は当サイトで検算していますが、誤りが残っている可能性はあります。
          <Link href="/kaisetsu/policy" className="ml-1 underline underline-offset-4 hover:text-navy">
            掲載方針
          </Link>
          配点・採点基準・難易度を大学の公表値として示すことはしていません。
        </p>

        <SolutionFooter set={s} />
      </div>
    </>
  );
}
