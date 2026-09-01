import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookCta } from "@/components/book-cta";
import { FactsCard } from "@/components/facts-card";
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
  const title = `${u.name}の出題傾向と対策${years ? `｜${years}の分析` : ""}`;
  const line = factsLine(u);
  const description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学を${years ?? "過去8年分"}にわたって分析。` +
    `${line ? `${line}。` : ""}年度別の出題一覧、分野ごとの頻度、小問の型と目標点までまとめています。`;

  return {
    title,
    description,
    keywords: [
      `${u.university} 数学`,
      `${u.name} 傾向`,
      `${u.university} 過去問 分析`,
      `${u.university} 数学 対策`,
    ],
    alternates: { canonical: `/univ/${u.slug}` },
    openGraph: { title, description, url: `/univ/${u.slug}`, type: "article" },
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const siblings = related(u);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${u.name}の出題傾向と対策`,
        description: summarize(u, 200),
        inLanguage: "ja",
        author: { "@type": "Person", name: site.author },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}/univ/${u.slug}`,
        about: { "@type": "CollegeOrUniversity", name: u.university },
        articleSection: u.sections.map((s) => cleanHeading(s.title)),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "大学一覧", item: `${site.url}/universities` },
          { "@type": "ListItem", position: 3, name: u.name, item: `${site.url}/univ/${u.slug}` },
        ],
      },
      ...u.books.map((b) => ({
        "@type": "Book",
        name: b.title,
        url: b.amazonUrl,
        inLanguage: "ja",
        author: { "@type": "Person", name: site.author },
        numberOfPages: b.pages ?? undefined,
        isPartOf: { "@type": "BookSeries", name: site.seriesName },
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-2xl px-5 sm:px-6">
        <nav aria-label="パンくず" className="pt-5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-sky-400">
            トップ
          </Link>
          <span className="mx-1.5 text-slate-300">/</span>
          <Link href="/universities" className="hover:text-sky-700 dark:hover:text-sky-400">
            大学一覧
          </Link>
        </nav>

        <header className="pb-8 pt-4">
          <p className="text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-400">
            {u.university}
            {u.course && `・${u.course}`}
          </p>
          <h1 className="head-ja mt-2 text-[1.6rem] font-bold leading-[1.45] tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2rem]">
            {u.name}の
            <br className="sm:hidden" />
            出題傾向と対策
          </h1>
          {u.summary && (
            <p className="prose-ja mt-4 text-[0.95rem] text-slate-600 dark:text-slate-400">
              {summarize(u, 130)}
            </p>
          )}
        </header>

        <div className="space-y-4">
          <FactsCard u={u} />
          <Toc titles={u.sections.map((s) => s.title)} />
        </div>

        {u.lead.length > 0 && (
          <div className="prose-ja mt-9 space-y-5">
            <Blocks blocks={u.lead} />
          </div>
        )}

        {u.sections.map((s, i) => (
          <section key={s.title} id={sectionId(i)} className="mt-11 scroll-mt-20">
            <h2 className="head-ja border-l-4 border-sky-600 pl-3.5 text-[1.15rem] font-bold leading-[1.5] text-slate-900 dark:border-sky-500 dark:text-slate-100 sm:text-[1.3rem]">
              {cleanHeading(s.title)}
            </h2>
            <div className="prose-ja mt-5 space-y-5">
              <Blocks blocks={s.blocks} />
            </div>
          </section>
        ))}

        <div className="mt-14">
          <BookCta u={u} />
        </div>

        {siblings.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-7 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">同じ区分の他大学</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/univ/${s.slug}`}
                    className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-700 transition-colors hover:border-sky-400 hover:bg-sky-50/60 dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/30"
                  >
                    <span className="truncate font-medium">{s.name}</span>
                    <span className="shrink-0 text-xs text-slate-400">{factsLine(s) || s.university}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              <Link href="/universities" className="text-sky-700 underline underline-offset-4 dark:text-sky-400">
                52大学すべてを見る
              </Link>
            </p>
          </section>
        )}
      </article>
    </>
  );
}
