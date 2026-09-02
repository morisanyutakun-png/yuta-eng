import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookCta, InlineCta } from "@/components/book-cta";
import { FactsCard } from "@/components/facts-card";
import { FaqSection } from "@/components/faq";
import { FieldChart } from "@/components/field-chart";
import { Toc } from "@/components/toc";
import {
  cleanHeading,
  factsLine,
  getUniversity,
  related,
  sectionId,
  summarize,
  universities,
  yearRange,
} from "@/lib/data";
import { Blocks } from "@/lib/render";
import { buildFaq, keywords, shortName } from "@/lib/seo";
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

  const years = yearRange(u);
  const short = shortName(u);
  const title = `${short}数学の傾向と対策｜${years ?? "過去8年"}の出題分析`;
  const line = factsLine(u);
  const top = u.fieldChart?.items.slice(0, 3).map((i) => i.label.replace(/（.*?）/g, "")) ?? [];

  const description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学の傾向と対策。` +
    `${line ? `${line}。` : ""}${years ?? "過去8年"}の過去問を年度別・分野別に分析し、` +
    `${top.length ? `頻出は${top.join("・")}。` : ""}時間配分と目標点までまとめました。`;

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
        { url: `/covers/${u.books[0].asin}.webp`, width: 620, height: 876, alt: `${u.books[0].title}の表紙` },
      ],
    },
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const years = yearRange(u);
  const siblings = related(u);
  const short = shortName(u);
  const faq = buildFaq(u);

  // 記事が長いので、本文の途中にも導線を1つ挟む
  const midpoint = Math.min(2, Math.max(1, Math.floor(u.sections.length / 2)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${short}数学の傾向と対策｜${years ?? "過去8年"}の出題分析`,
        description: summarize(u, 200),
        inLanguage: "ja",
        author: { "@type": "Person", name: site.author },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}/univ/${u.slug}`,
        about: { "@type": "CollegeOrUniversity", name: u.university },
        articleSection: u.sections.map((s) => cleanHeading(s.title)),
        image: `${site.url}/covers/${u.books[0].asin}.webp`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "大学一覧", item: `${site.url}/universities` },
          { "@type": "ListItem", position: 3, name: `${short}数学`, item: `${site.url}/univ/${u.slug}` },
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
        name: b.title,
        url: b.amazonUrl,
        inLanguage: "ja",
        author: { "@type": "Person", name: site.author },
        numberOfPages: b.pages ?? undefined,
        image: `${site.url}/covers/${b.asin}.webp`,
        isPartOf: { "@type": "BookSeries", name: site.seriesName },
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-[38rem] px-5 sm:px-6">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href="/universities" className="hover:text-navy">
            大学一覧
          </Link>
        </nav>

        <header className="pb-7 pt-4">
          <p className="text-[0.72rem] font-semibold tracking-wide text-navy">
            {u.university}
            {u.course && `・${u.course}`}
          </p>
          <h1 className="serif mt-2.5 text-[1.75rem] leading-[1.4] text-ink sm:text-[2.15rem]">
            {short}数学の
            <br />
            傾向と対策
          </h1>
          <p className="mt-3 text-[0.78rem] text-ink-3">
            {years ? `${years}の過去問8年分を分析` : "過去問を分析"}
          </p>
          {u.summary && <p className="prose-ja mt-5 text-[0.95rem] text-ink-2">{summarize(u, 140)}</p>}
        </header>

        <FactsCard u={u} />
        <Toc titles={u.sections.map((s) => s.title)} />

        {u.fieldChart && <FieldChart data={u.fieldChart} name={short} />}

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

        <FaqSection items={faq} name={short} />

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
                      {shortName(s)}数学の傾向と対策
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
                52大学の分析をすべて見る
              </Link>
            </p>
          </section>
        )}
      </article>
    </>
  );
}
