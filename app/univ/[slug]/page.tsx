import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/article-layout";
import { AsideBook } from "@/components/aside-book";
import { BookCta, InlineCta } from "@/components/book-cta";
import { FaqSection } from "@/components/faq";
import { FieldChart } from "@/components/field-chart";
import { LookInsideSection } from "@/components/look-inside-section";
import { SolutionsCallout, SolutionsLink } from "@/components/solutions-link";
import { solutionsFor } from "@/lib/solutions";
import { StudyPlan } from "@/components/study-plan";
import { Toc } from "@/components/toc";
import { UnivHero } from "@/components/univ-hero";
import {
  cleanHeading,
  factsLine,
  getUniversity,
  related,
  sectionId,
  summarize,
  universities,
  universityCount,
  yearLabel,
} from "@/lib/data";
import { sampleFor } from "@/lib/samples";
import { kanseiFor } from "@/lib/series";
import { Blocks } from "@/lib/render";
import { buildFaq, keywords, pageTitle, shortName, subject } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return universities.map((u) => ({ slug: u.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) return {};

  const title = pageTitle(u);
  const line = factsLine(u);
  const top = u.fieldChart?.items.slice(0, 3).map((i) => i.label.replace(/（.*?）/g, "")) ?? [];
  // 年度が取れない大学に「過去8年」と書かない。取れた範囲だけを言う。
  const label = yearLabel(u);
  const scope = label ? `${label}の過去問` : "過去問";

  let description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学の傾向と対策。` +
    `${line ? `${line}。` : ""}${scope}を年度別・分野別に分析し、` +
    `${top.length ? `頻出は${top.join("・")}。` : ""}時間配分と目標点までまとめました。`;
  // 試験時間や分野の内訳が原稿にない大学は、ここまでで短くなりすぎる。
  // 一般論で埋めずに、その大学の書き出しをそのまま足して補う。
  if (description.length < 70) {
    const lead = summarize(u, 150 - description.length);
    if (lead) description = `${description}${lead}`;
  }

  return {
    title,
    description,
    keywords: keywords(u),
    alternates: { canonical: `/univ/${u.slug}` },
    openGraph: {
      title,
      description,
      url: `/univ/${u.slug}`,
      type: "article",
      images: [
        { url: `/og/${u.slug}.jpg`, width: 1200, height: 630, alt: `${subject(u)}の傾向と対策` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og/${u.slug}.jpg`],
    },
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const siblings = related(u);
  const faq = buildFaq(u);
  const short = shortName(u);
  const kansei = kanseiFor(u.slug);
  // 抜粋を用意できている巻を出す（第1巻に無ければ次の巻）
  const sampleBook = u.books.find((b) => sampleFor(b.asin));

  // 記事が長いので、本文の途中にも導線を1つ挟む
  const midpoint = Math.min(2, Math.max(1, Math.floor(u.sections.length / 2)));

  // 分析の節と同じ重さで目次に並べる。解説も試し読みもこのページの中身なので、
  // 目次に出ていないと「分析しか無い」と思われて読まれない。
  const tocExtra = [
    ...(solutionsFor(u.slug).length ? [{ href: "#solutions", label: "過去問の解答・解説" }] : []),
    ...(sampleBook ? [{ href: "#look-inside", label: "教材の試し読み" }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: pageTitle(u),
        description: summarize(u, 200),
        inLanguage: "ja",
        author: { "@type": "Person", name: site.author },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}/univ/${u.slug}`,
        about: { "@type": "CollegeOrUniversity", name: u.university },
        articleSection: u.sections.map((s) => cleanHeading(s.title)),
        image: `${site.url}/og/${u.slug}.jpg`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "大学一覧", item: `${site.url}/universities` },
          { "@type": "ListItem", position: 3, name: subject(u), item: `${site.url}/univ/${u.slug}` },
        ],
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      ...u.books.map((b) => ({
        "@type": "Book",
        "@id": b.amazonUrl,
        name: b.fullTitle,
        url: b.amazonUrl,
        inLanguage: "ja",
        bookFormat: "https://schema.org/Paperback",
        author: { "@type": "Person", name: site.author },
        numberOfPages: b.pages ?? undefined,
        isbn: b.isbn13 ?? undefined,
        datePublished: b.released ?? undefined,
        image: `${site.url}/covers/${b.asin}.webp`,
        isPartOf: { "@type": "BookSeries", name: site.seriesName },
        // 検索結果に価格が出ると、Amazon へ進む前の迷いが1つ減る
        ...(b.price
          ? {
              offers: {
                "@type": "Offer",
                price: b.price,
                priceCurrency: "JPY",
                url: b.amazonUrl,
                seller: { "@type": "Organization", name: "Amazon.co.jp" },
              },
            }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleLayout
        breadcrumb={[
          { href: "/", label: "トップ" },
          { href: "/universities", label: "大学一覧" },
          { label: `${short}数学` },
        ]}
        aside={
          <>
            <AsideBook
              eyebrow="この分析からつくった予想問題集"
              title={u.books[0].title}
              cover={`/covers/${u.books[0].asin}.webp`}
              href={u.books[0].amazonUrl}
              book={u.books[0]}
              note={`本番と同じ形式の予想問題${u.books[0].rounds ? `${u.books[0].rounds}回分` : ""}。${
                u.books.length > 1 ? `全${u.books.length}巻。` : ""
              }`}
              detail={{ href: "#books", label: "収録内容と全巻を見る" }}
            />
            {kansei?.published && kansei.amazonUrl && (
              <AsideBook
                eyebrow="過去問の前に"
                title={`${kansei.name} 分野別完成演習`}
                cover={`/covers/kansei/${kansei.slug}.webp`}
                href={kansei.amazonUrl}
                book={kansei.catalog}
                note={`頻出${kansei.total.fields}分野・全${kansei.total.problems}題を段階的に。`}
                detail={{ href: `/kansei/${kansei.slug}`, label: "収録分野と出題傾向を見る" }}
              />
            )}
            <Toc titles={u.sections.map((s) => s.title)} variant="aside" extra={tocExtra} />
          </>
        }
      >
        <UnivHero u={u} />

        <SolutionsCallout slug={u.slug} />

        <Toc titles={u.sections.map((s) => s.title)} extra={tocExtra} />

        {u.fieldChart && (
          <FieldChart data={u.fieldChart} name={subject(u)} yearCount={u.yearCount} />
        )}

        {u.lead.length > 0 && (
          <div className="prose-ja mt-11 space-y-5 text-[0.95rem] text-ink-2">
            <Blocks blocks={u.lead} />
          </div>
        )}

        {u.sections.map((s, i) => (
          <div key={s.title}>
            {i === midpoint && <InlineCta u={u} />}
            <section id={sectionId(i)} className="mt-11 scroll-mt-20">
              <h2 className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
                {cleanHeading(s.title)}
              </h2>
              <div className="prose-ja mt-4 space-y-5 text-[0.95rem] text-ink-2">
                <Blocks blocks={s.blocks} />
              </div>
            </section>
          </div>
        ))}

        <SolutionsLink slug={u.slug} />

        <StudyPlan u={u} />

        {sampleBook && <LookInsideSection book={sampleBook} />}

        <FaqSection items={faq} name={subject(u)} />

        <div className="mt-14">
          <BookCta u={u} />
        </div>

        {siblings.length > 0 && (
          <section className="mt-14 border-t border-rule pt-7">
            <h2 className="serif text-[1.05rem] text-ink">同じ区分の他大学</h2>
            <ul className="mt-3 divide-y divide-rule border-y border-rule">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/univ/${s.slug}`}
                    className="flex min-h-12 items-center justify-between gap-3 py-3 transition-colors hover:text-navy"
                  >
                    <span className="truncate text-[0.9rem] font-medium text-ink">
                      {subject(s)}の傾向と対策
                    </span>
                    <span className="shrink-0 text-[0.72rem] tabular-nums text-ink-3">
                      {factsLine(s) || s.university}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.85rem]">
              <Link href="/universities" className="text-navy underline underline-offset-4">
                {universityCount()}大学の分析をすべて見る
              </Link>
            </p>
          </section>
        )}
      </ArticleLayout>
    </>
  );
}
