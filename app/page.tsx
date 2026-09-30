import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CoverShelf } from "@/components/cover-shelf";
import { KanseiCards } from "@/components/kansei-cards";
import { LearningPath } from "@/components/learning-path";
import { TopFields } from "@/components/top-fields";
import { UniversityFinder } from "@/components/university-finder";
import { siteTotals, universities } from "@/lib/data";
import { finderItems } from "@/lib/finder";
import { kanseiPublished, seriesTagline, shindan } from "@/lib/series";
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
    "大学別 数学 問題集",
    "志望校 診断 数学",
    "難関国公立 数学",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og/home.jpg"] },
};

export default function HomePage() {
  const t = siteTotals();
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

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8">
        <section className="pb-8 pt-11 sm:pt-14">
          <h1 className="serif text-[1.9rem] leading-[1.35] text-ink sm:text-[2.5rem]">
            大学別
            <br className="sm:hidden" />
            数学入試分析
          </h1>
          <p className="prose-ja mt-5 max-w-[34rem] text-[0.95rem] text-ink-2">
            国公立・私立{t.universities}大学の数学入試を、{t.span}の過去問から
            <strong className="font-semibold text-ink">年度別・分野別の表</strong>
            に整理しました。試験時間、大問構成、頻出分野、目標点まで。
          </p>

          <CoverShelf />

          <dl className="mt-7 flex gap-8 border-y border-rule py-4">
            {[
              { k: "分析大学", v: t.universities, u: "大学" },
              { k: "予想問題集", v: t.books, u: "冊" },
              // 大学ごとに5〜9年分とばらつくので、合計の延べ年数を出す
              { k: "分析した入試", v: t.totalYears, u: "年分" },
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
        </section>

        <>
          <LearningPath compact className="mb-10 lg:hidden" />
          <LearningPath className="mb-12 hidden lg:block" />
        </>

        <UniversityFinder items={items} groups={usedGroups} />

        <TopFields />

        <section aria-labelledby="series-heading" className="mt-16">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">過去問の前にシリーズ</p>
          <h2 id="series-heading" className="serif mt-1 text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            {seriesTagline}
          </h2>
          <p className="prose-ja mt-2.5 max-w-[36rem] text-[0.9rem] text-ink-2">
            旧帝大・難関国公立の理系数学を目指す人向けに、過去問に入る前の段階を2冊に分けました。
            志望校診断模試で行き先を決め、その大学の分野別完成演習で頻出分野を固めてから過去問へ進みます。
          </p>

          <Link
            href="/shindan"
            className="group mt-6 flex gap-4 border-y border-navy/20 bg-paper-2/70 px-4 py-5 transition-colors hover:bg-paper-2"
          >
            <Image
              src="/covers/kansei/thumb/shindan.webp"
              alt="志望校診断模試の表紙"
              width={160}
              height={226}
              sizes="76px"
              className="w-[76px] shrink-0 self-start rounded-[2px] border border-rule shadow-[0_1px_3px_rgba(26,29,33,0.14)]"
            />
            <span className="min-w-0">
              <span className="block text-[0.68rem] font-bold text-navy">1　志望校が決まっていないなら</span>
              <span className="serif mt-1 block text-[1.05rem] leading-snug text-ink group-hover:text-navy">
                旧帝大・難関国公立大 理系数学 志望校診断模試
              </span>
              <span className="prose-ja mt-1.5 block text-[0.82rem] text-ink-2">
                {shindan.rounds}回の模試で「得点の形」を分析し、{shindan.universities.map((u) => u.name).join("・")}
                の{shindan.universities.length}大学との相性を判定します。
              </span>
            </span>
          </Link>

          <div className="mt-8">
            <h3 className="text-[0.9rem] font-semibold text-ink">
              <span className="mr-2 text-[0.68rem] font-bold text-navy">2</span>
              志望校が決まったら、大学別の分野別完成演習（{kanseiPublished.length}冊刊行）
            </h3>
            <div className="mt-4">
              <KanseiCards />
            </div>
            <p className="mt-4 text-[0.85rem]">
              <Link href="/kansei" className="text-navy underline underline-offset-4">
                分野別完成演習のシリーズ全体を見る
              </Link>
            </p>
          </div>
        </section>

        <section className="mt-16 border-t border-rule pt-7">
          <h2 className="serif text-[1.1rem] text-ink">このサイトについて</h2>
          <p className="prose-ja mt-2.5 text-[0.88rem] text-ink-2">
            各大学の公表資料と実際の問題冊子にあたって作成した分析です。分析年数は大学によって
            {t.minYears}〜{t.maxYears}年分と幅があり、各ページに対象年度を明記しています。
            出題形式・分野構成を調べたものであり、問題文の転載はしていません。
            分析にもとづく予想問題集「{site.seriesName}」全{t.books}冊も、各大学のページから辿れます。
            旧帝大・難関国公立の理系数学については、過去問に入る前の「過去問の前にシリーズ」（志望校診断模試・分野別完成演習）も紹介しています。
          </p>
        </section>
      </div>
    </>
  );
}
