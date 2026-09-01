import type { Metadata } from "next";
import Link from "next/link";

import { UniversityFinder, type FinderItem } from "@/components/university-finder";
import { summarize, universities } from "@/lib/data";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "大学一覧",
  description: `${site.name}で分析している${universities.length}大学の一覧。旧帝大・難関国公立から医学部・私立大まで、大学ごとの数学の出題形式・年度別の出題傾向を掲載しています。`,
  alternates: { canonical: "/universities" },
};

export default function UniversitiesPage() {
  const usedGroups = groupOrder.filter((g) => universities.some((u) => u.group === g));

  const items: FinderItem[] = universities.map((u) => ({
    slug: u.slug,
    name: u.name,
    university: u.university,
    course: u.course,
    group: u.group,
    keywords: [u.name, u.university, u.course, u.group, u.kana].join(" "),
    examTime: u.facts.examTime ?? null,
    questions: u.facts.questions ?? null,
    books: u.books.length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "分析している大学一覧",
    numberOfItems: universities.length,
    itemListElement: universities.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: u.name,
      url: `${site.url}/univ/${u.slug}`,
      description: summarize(u, 100),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <nav aria-label="パンくず" className="pt-5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-sky-700 dark:hover:text-sky-400">
            トップ
          </Link>
          <span className="mx-1.5 text-slate-300">/</span>
          <span className="text-slate-700 dark:text-slate-300">大学一覧</span>
        </nav>

        <header className="pb-6 pt-4">
          <h1 className="head-ja text-[1.6rem] font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2rem]">
            大学一覧
          </h1>
          <p className="prose-ja mt-3 text-[0.95rem] text-slate-600 dark:text-slate-400">
            分析している{universities.length}大学です。大学名・かな・「医学部」などで絞り込めます。
          </p>
        </header>

        <UniversityFinder items={items} groups={usedGroups} />
      </div>
    </>
  );
}
