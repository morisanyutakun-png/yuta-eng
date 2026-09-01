import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookCta } from "@/components/book-cta";
import { getUniversity, related, summarize, universities, yearRange } from "@/lib/data";
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
  const description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学を${years ?? "過去8年分"}にわたって分析。` +
    `試験時間と大問構成、年度別の出題一覧、分野ごとの頻度、目標点までまとめています。`;

  return {
    title,
    description,
    alternates: { canonical: `/univ/${u.slug}` },
    openGraph: { title, description, url: `/univ/${u.slug}`, type: "article" },
  };
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const years = yearRange(u);
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
        mainEntityOfPage: `${site.url}/univ/${u.slug}`,
        about: { "@type": "CollegeOrUniversity", name: u.university },
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

      <article className="mx-auto max-w-3xl px-4">
        <nav aria-label="パンくず" className="pt-6 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-sky-400">
            トップ
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/universities" className="hover:text-sky-700 dark:hover:text-sky-400">
            大学一覧
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700 dark:text-slate-300">{u.name}</span>
        </nav>

        <header className="border-b border-slate-200 pb-7 pt-4 dark:border-slate-800">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100 sm:text-[1.75rem]">
            {u.name}の出題傾向と対策
          </h1>
          <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
            {[u.university, u.course, years ? `${years}の分析` : null].filter(Boolean).join("・")}
          </p>
        </header>

        <div className="space-y-6 py-8">
          {u.lead.length > 0 && <Blocks blocks={u.lead} />}
        </div>

        {u.sections.map((s) => (
          <section key={s.title} className="border-t border-slate-200 py-8 dark:border-slate-800">
            <h2 className="text-lg font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
              {s.title.replace(/^\d+(\.\d+)?[.．\s　]*/, "")}
            </h2>
            <div className="mt-4 space-y-5">
              <Blocks blocks={s.blocks} />
            </div>
          </section>
        ))}

        <div className="border-t border-slate-200 pt-8 dark:border-slate-800">
          <BookCta u={u} />
        </div>

        {siblings.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-7 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">同じ区分の他大学</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/univ/${s.slug}`}
                    className="inline-block rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-800 dark:border-slate-800 dark:text-slate-300 dark:hover:border-sky-700 dark:hover:text-sky-300"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
