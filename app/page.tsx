import type { Metadata } from "next";

import { TopFields } from "@/components/top-fields";
import { UniversityFinder } from "@/components/university-finder";
import { universities } from "@/lib/data";
import { finderItems } from "@/lib/finder";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}｜${site.tagline}` },
  description: site.description,
  keywords: [
    "大学別 数学 傾向と対策",
    "大学入試 数学 過去問 分析",
    "数学 頻出分野",
    "二次試験 数学 対策",
    "医学部 数学 対策",
    "大学別 数学 頻出分野",
  ],
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const bookCount = universities.reduce((a, u) => a + u.books.length, 0);
  const usedGroups = groupOrder.filter((g) => universities.some((u) => u.group === g));
  const items = finderItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "ja",
    publisher: { "@type": "Person", name: site.author },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6">
        <section className="pb-8 pt-11 sm:pt-14">
          <h1 className="serif text-[1.9rem] leading-[1.35] text-ink sm:text-[2.5rem]">
            大学別
            <br className="sm:hidden" />
            数学入試分析
          </h1>
          <p className="prose-ja mt-5 max-w-[34rem] text-[0.95rem] text-ink-2">
            国公立・私立{universities.length}大学の数学を、過去問8年分から
            <strong className="font-semibold text-ink">年度別・分野別の表</strong>
            に整理しました。試験時間、大問構成、頻出分野、目標点まで。
          </p>

          <dl className="mt-7 flex gap-8 border-y border-rule py-4">
            {[
              { k: "分析大学", v: universities.length, u: "大学" },
              { k: "予想問題集", v: bookCount, u: "冊" },
              { k: "分析年度", v: 8, u: "年分" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[0.68rem] text-ink-3">{s.k}</dt>
                <dd className="serif mt-1 leading-none text-ink">
                  <span className="text-[1.7rem] tabular-nums">{s.v}</span>
                  <span className="ml-0.5 font-sans text-[0.7rem] font-normal text-ink-3">{s.u}</span>
                </dd>
              </div>
            ))}
          </dl>
          <TopFields />
        </section>

        <UniversityFinder items={items} groups={usedGroups} />

        <section className="mt-16 border-t border-rule pt-7">
          <h2 className="serif text-[1.1rem] text-ink">このサイトについて</h2>
          <p className="prose-ja mt-2.5 text-[0.88rem] text-ink-2">
            各大学の公表資料と、実際の問題冊子8年分にあたって作成した分析です。
            出題形式・分野構成を調べたものであり、問題文の転載はしていません。
            分析にもとづく予想問題集「{site.seriesName}」全{bookCount}冊も、各大学のページから辿れます。
          </p>
        </section>
      </div>
    </>
  );
}
