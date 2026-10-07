import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AsideBook } from "@/components/aside-book";
import { FactStrip } from "@/components/fact-strip";
import { ArticleLayout, AsideCard } from "@/components/article-layout";
import { SolutionFooter } from "@/components/solution-footer";
import { SourceLink } from "@/components/source-link";
import { SubQuestionBlock } from "@/components/solution-blocks";
import { amazonUrl } from "@/lib/books";
import { getUniversity } from "@/lib/data";
import { shortName, subject } from "@/lib/seo";
import { NOT_OFFICIAL, published, questionOf, questionPath, setPath, solutionSet } from "@/lib/solutions";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string; year: string; q: string }> };

export function generateStaticParams() {
  return published.flatMap((s) =>
    s.questions.map((q) => ({ slug: s.slug, year: String(s.year), q: String(q.no) })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, year, q } = await params;
  const s = solutionSet(slug, Number(year));
  const u = getUniversity(slug);
  const question = s && questionOf(s, Number(q));
  if (!s || !u || !question) return {};
  const short = shortName(u);
  const title = `${s.short} ${s.year}年度 数学 第${question.no}問の解答・解説｜${question.field}`;
  const description =
    `${s.university}${s.year}年度（${s.schedule}・${s.division}）数学 第${question.no}問（${question.field}）の、当サイト独自の解答・計算過程・詳解` +
    `${question.subs.some((x) => x.alts?.length) ? "・別解" : ""}。` +
    `${question.topics.join("、")}を使います。小問は${question.subs.map((x) => x.label).filter(Boolean).join("")}の${question.subs.length}問。` +
    `問題文は載せていません。公式解答ではありません。`;
  return {
    title,
    description,
    keywords: [
      `${short} ${s.year} 数学 第${question.no}問`,
      `${short} ${s.year} 第${question.no}問 解答`,
      `${s.university} ${s.year}年度 数学 第${question.no}問`,
      `${short} 数学 ${question.field}`,
      ...question.topics.map((t) => `${short} ${t} 解説`),
      ...question.topics,
    ],
    alternates: { canonical: `/kaisetsu/${s.slug}/${s.year}/${question.no}` },
    openGraph: {
      title,
      description,
      url: `/kaisetsu/${s.slug}/${s.year}/${question.no}`,
      type: "article",
      images: [{ url: `/og/${s.slug}.jpg`, width: 1200, height: 630, alt: subject(u) }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${s.slug}.jpg`] },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug, year, q } = await params;
  const s = solutionSet(slug, Number(year));
  const u = getUniversity(slug);
  const question = s && questionOf(s, Number(q));
  if (!s || !u || !question) notFound();

  const idx = s.questions.findIndex((x) => x.no === question.no);
  const prev = s.questions[idx - 1];
  const next = s.questions[idx + 1];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${s.short} ${s.year}年度 数学 第${question.no}問の解答・解説`,
      description: `${s.university}${s.year}年度 数学 第${question.no}問（${question.field}）の、当サイト独自の解答・解説。`,
      author: { "@type": "Person", name: site.author },
      publisher: { "@type": "Organization", name: site.name },
      dateModified: question.updated,
      inLanguage: "ja",
      isAccessibleForFree: true,
      url: `${site.url}${questionPath(s, question.no)}`,
      about: [{ "@type": "Thing", name: question.field }, ...question.topics.map((t) => ({ "@type": "Thing", name: t }))],
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
        { "@type": "ListItem", position: 4, name: `${s.year}年度`, item: `${site.url}${setPath(s)}` },
        { "@type": "ListItem", position: 5, name: `第${question.no}問`, item: `${site.url}${questionPath(s, question.no)}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleLayout
        section="kaisetsu"
        breadcrumb={[
          { href: "/kaisetsu", label: "過去問の解答・解説" },
          { href: `/kaisetsu/${s.slug}`, label: subject(u) },
          { href: setPath(s), label: `${s.year}年度` },
          { label: `第${question.no}問` },
        ]}
        aside={
          <>
            {/* その年度のほかの大問へ。読みながら行き来できるようにする */}
            <AsideCard title={`${s.year}年度の大問`}>
              <ol className="-my-1">
                {s.questions.map((q) => {
                  const here = q.no === question.no;
                  return (
                    <li key={q.no}>
                      <Link
                        href={questionPath(s, q.no)}
                        aria-current={here ? "page" : undefined}
                        className={`flex gap-2.5 py-1.5 text-[0.86rem] leading-relaxed transition-colors hover:text-navy ${
                          here ? "font-semibold text-navy" : "text-ink-2"
                        }`}
                      >
                        <span aria-hidden="true" className="serif shrink-0 tabular-nums text-ink-3">
                          0{q.no}
                        </span>
                        <span className="prose-ja min-w-0">{q.field}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </AsideCard>

            {/* 読み終えた人がいちばん探すもの。読みながら目に入る位置に置く */}
            {u.books[0] && (
              <AsideBook
                eyebrow="当サイト運営者が制作した教材"
                title={u.books[0].title}
                cover={`/covers/${u.books[0].asin}.webp`}
                href={amazonUrl(u.books[0].asin)}
                book={u.books[0]}
                detail={{ href: `/univ/${u.slug}`, label: "この大学の出題分析を見る" }}
                note={`${subject(u)}の出題を分析して書き下ろした予想問題集です。`}
              />
            )}
          </>
        }
      >
        <FactStrip
          items={[
            { icon: "pen", label: "独自の解答・詳解" },
            { icon: "doc", label: "問題文は非掲載" },
            { icon: "check", label: `小問${question.subs.length}問・無料` },
          ]}
          className="mt-4"
        />

        <header className="pb-2 pt-5">
          <p className="eyebrow">
            {s.university}　{s.year}年度　{s.schedule}　{s.division}
          </p>
          <h1 className="serif mt-1 text-[1.6rem] leading-snug text-ink sm:text-[1.95rem]">
            第{question.no}問 {question.field}の解答・解説
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.74rem] text-ink-3">
            <span>{question.topics.join("・")}</span>
            {question.ownDifficulty && (
              <span className="border border-rule px-1.5 py-0.5">
                当サイトの体感難易度：{question.ownDifficulty}
              </span>
            )}
            <span className="tabular-nums">最終更新 {question.updated.replace(/-/g, "/")}</span>
          </p>
        </header>

        {s.source && <SourceLink source={s.source} division={s.division} />}

        {question.subs.map((sub) => (
          <SubQuestionBlock key={sub.label || "x"} sub={sub} qNo={question.no} />
        ))}

        <nav aria-label="同じ年度の大問" className="mt-12 flex items-center justify-between gap-4 border-t border-rule pt-5 text-[0.86rem]">
          {prev ? (
            <Link href={questionPath(s, prev.no)} className="text-navy underline underline-offset-4">
              ← 第{prev.no}問 {prev.field}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={questionPath(s, next.no)} className="text-right text-navy underline underline-offset-4">
              第{next.no}問 {next.field} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <p className="mt-5 text-[0.86rem]">
          <Link href={setPath(s)} className="font-semibold text-navy underline underline-offset-4">
            {s.year}年度の全{s.questions.length}問をまとめて読む
          </Link>
        </p>

        <p className="prose-ja mt-10 border-t border-rule pt-5 text-[0.78rem] leading-[1.9] text-ink-3">
          {NOT_OFFICIAL}
          解答は当サイトで検算していますが、誤りが残っている可能性はあります。
          <Link href="/kaisetsu/policy" className="ml-1 underline underline-offset-4 hover:text-navy">
            掲載方針
          </Link>
        </p>

        <SolutionFooter set={s} />
      </ArticleLayout>
    </>
  );
}
