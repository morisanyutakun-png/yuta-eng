import type { Metadata } from "next";
import Link from "next/link";

import { UniversityCard } from "@/components/university-card";
import { byGroup, universities } from "@/lib/data";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}｜${site.tagline}` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const groups = byGroup(groupOrder);
  const bookCount = universities.reduce((a, u) => a + u.books.length, 0);

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

      <div className="mx-auto max-w-4xl px-4">
        <section className="border-b border-slate-200 py-12 dark:border-slate-800 sm:py-16">
          <h1 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            大学別 数学入試分析
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.9] text-slate-700 dark:text-slate-300">
            {universities.length}大学の数学について、過去8年分の出題を年度別・分野別の表に整理しました。
            試験時間と大問数、どの分野が何回出ているか、小問の型と目標点まで、
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              対策を決めるのに必要な事実
            </strong>
            だけを載せています。
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            分析にもとづく予想問題集「{site.seriesName}」全{bookCount}冊も各ページから辿れます。
          </p>
        </section>

        {groups.map(([group, list]) => (
          <section key={group} className="border-b border-slate-200 py-8 last:border-0 dark:border-slate-800">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {group}
              <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">{list.length}件</span>
            </h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((u) => (
                <UniversityCard key={u.slug} u={u} />
              ))}
            </div>
          </section>
        ))}

        <p className="py-8 text-sm">
          <Link href="/universities" className="text-sky-700 underline underline-offset-4 dark:text-sky-400">
            大学一覧をまとめて見る
          </Link>
        </p>
      </div>
    </>
  );
}
