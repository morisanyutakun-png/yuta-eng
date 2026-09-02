import type { Metadata } from "next";
import Link from "next/link";

import { UniversityFinder } from "@/components/university-finder";
import { summarize, universities } from "@/lib/data";
import { finderItems } from "@/lib/finder";
import { shortName } from "@/lib/seo";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "大学一覧｜数学の傾向と対策を大学別に",
  description: `数学の傾向と対策を掲載している${universities.length}大学の一覧。旧帝大・難関国公立から医学部・私立大まで、大学ごとの試験時間・大問構成・頻出分野を過去問8年分から分析しています。`,
  keywords: ["大学別 数学 一覧", "大学入試 数学 傾向", "医学部 数学 傾向と対策", "国公立 数学 過去問 分析"],
  alternates: { canonical: "/universities" },
  openGraph: {
    url: `${site.url}/universities`,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
};

export default function UniversitiesPage() {
  const usedGroups = groupOrder.filter((g) => universities.some((u) => u.group === g));
  const items = finderItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "数学の傾向と対策を掲載している大学一覧",
    numberOfItems: universities.length,
    itemListElement: universities.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${shortName(u)}数学の傾向と対策`,
      url: `${site.url}/univ/${u.slug}`,
      description: summarize(u, 100),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">大学一覧</span>
        </nav>

        <header className="pb-6 pt-4">
          <h1 className="serif text-[1.7rem] leading-snug text-ink sm:text-[2.1rem]">大学一覧</h1>
          <p className="prose-ja mt-3 max-w-[34rem] text-[0.92rem] text-ink-2">
            数学の傾向と対策をまとめている{universities.length}大学です。
            大学名・かな・「医学部」などで絞り込めます。
          </p>
        </header>

        <UniversityFinder items={items} groups={usedGroups} />
      </div>
    </>
  );
}
