import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { UniversityFinder } from "@/components/university-finder";
import { siteTotals, summarize, universities, universityCount } from "@/lib/data";
import { finderItems } from "@/lib/finder";
import { shindan } from "@/lib/series";
import { subject } from "@/lib/seo";
import { sectionStyle } from "@/lib/sections";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "大学一覧｜数学の傾向と対策を大学別に",
  description: `数学の傾向と対策を掲載している${universityCount()}大学（理系・文系などの区分ごとに${universities.length}ページ）の一覧。旧帝大・難関国公立から医学部・私立大まで、試験時間・大問構成・頻出分野を過去問から分析しています。大学名・かなで絞り込めます。`,
  keywords: [
    "大学別 数学 傾向と対策",
    "大学入試 数学 頻出分野",
    "医学部 数学 傾向と対策",
    "国公立 数学 過去問 分析",
    "二次試験 数学 対策",
  ],
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
  // 見出しの横に並べる表紙。検索されやすい大学から3冊
  const rank = (g: string) => usedGroups.findIndex((x) => x === g);
  const headerCovers = [...universities]
    .sort((a, b) => rank(a.group) - rank(b.group))
    .slice(0, 3)
    .map((u) => `/covers/thumb/${u.books[0].asin}.webp`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "数学の傾向と対策を掲載している大学一覧",
    numberOfItems: universities.length,
    itemListElement: universities.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${subject(u)}の傾向と対策`,
      url: `${site.url}/univ/${u.slug}`,
      description: summarize(u, 100),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8" style={sectionStyle("universities")}>
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">大学一覧</span>
        </nav>

        <PageHeader
          section="universities"
          title="大学一覧"
          covers={headerCovers}
          facts={[
            { icon: "grid", label: `${universityCount()}大学・${universities.length}区分` },
            { icon: "clock", label: `${siteTotals().minYears}〜${siteTotals().maxYears}年分` },
            { icon: "doc", label: "年度別の表" },
          ]}
          lead={
            <>
              数学の傾向と対策をまとめている{universityCount()}大学です。大学名・かな・「医学部」などで絞り込めます。
            </>
          }
        />

        <div className="mt-4">
          <UniversityFinder items={items} groups={usedGroups} headingLevel="h2" />
        </div>

        <p className="prose-ja mb-6 mt-7 border-l-2 border-navy/40 bg-paper-2/60 px-4 py-3 text-[0.82rem] text-ink-2">
          旧帝大・難関国公立の理系で志望校を決めきれていない場合は、
          <Link href="/shindan" className="font-semibold text-navy underline underline-offset-4">
            志望校診断模試
          </Link>
          で{shindan.universities.length}大学との相性を、決まっている場合は
          <Link href="/kansei" className="font-semibold text-navy underline underline-offset-4">
            大学別の分野別完成演習
          </Link>
          で頻出分野を固められます。
        </p>

      </div>
    </>
  );
}
