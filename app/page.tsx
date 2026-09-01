import type { Metadata } from "next";

import { UniversityFinder, type FinderItem } from "@/components/university-finder";
import { universities } from "@/lib/data";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}｜${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const bookCount = universities.reduce((a, u) => a + u.books.length, 0);
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
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "ja",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <section className="pb-7 pt-10 sm:pt-14">
          <h1 className="head-ja text-[1.7rem] font-bold leading-[1.4] tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2.25rem]">
            大学別
            <br className="sm:hidden" />
            数学入試分析
          </h1>
          <p className="prose-ja mt-4 text-[0.95rem] text-slate-600 dark:text-slate-400">
            {universities.length}大学の数学を、過去8年分の出題から
            <strong className="font-semibold text-slate-900 dark:text-slate-200">
              年度別・分野別の表
            </strong>
            に整理しました。試験時間、大問の構成、どの分野が何回出ているか、目標点まで。
          </p>
          <dl className="mt-6 flex gap-6 border-y border-slate-200 py-4 dark:border-slate-800">
            <div>
              <dt className="text-[0.7rem] text-slate-500 dark:text-slate-400">分析大学</dt>
              <dd className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {universities.length}
                <span className="ml-0.5 text-xs font-medium text-slate-500">大学</span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] text-slate-500 dark:text-slate-400">予想問題集</dt>
              <dd className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {bookCount}
                <span className="ml-0.5 text-xs font-medium text-slate-500">冊</span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] text-slate-500 dark:text-slate-400">分析年度</dt>
              <dd className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                8<span className="ml-0.5 text-xs font-medium text-slate-500">年分</span>
              </dd>
            </div>
          </dl>
        </section>

        <UniversityFinder items={items} groups={usedGroups} />

        <section className="mt-14 rounded-2xl bg-slate-50 p-5 dark:bg-slate-900/60">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">このサイトについて</h2>
          <p className="prose-ja mt-2.5 text-sm text-slate-600 dark:text-slate-400">
            各大学の公表資料と、実際の問題冊子8年分にあたって作成した分析です。
            出題形式・分野構成を調べたものであり、問題文の転載はしていません。
            分析にもとづく予想問題集「{site.seriesName}」全{bookCount}冊も各ページから辿れます。
          </p>
        </section>
      </div>
    </>
  );
}
