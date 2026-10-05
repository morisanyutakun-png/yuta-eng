import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { LearningPath } from "@/components/learning-path";
import { allBooks, bookMetaLine, gokakuBooks, yen } from "@/lib/books";
import { universities, universityCount, type University } from "@/lib/data";
import { shortName } from "@/lib/seo";
import { kanseiAll, seriesName, seriesTagline, shindan } from "@/lib/series";
import { groupOrder, site } from "@/lib/site";

const gokakuCount = allBooks.filter((b) => b.series === "gokaku").length;
const title = `教材一覧｜合格答案をつくる（${universityCount()}大学${gokakuCount}冊）と過去問の前に`;
const description =
  `大学入試の数学対策の教材一覧です。本番と同じ形式の予想問題集「合格答案をつくる」を${universityCount()}大学・${gokakuCount}冊、` +
  `過去問に入る前の「過去問の前に」シリーズ（志望校診断模試・大学別の分野別完成演習${kanseiAll.filter((k) => k.published).length}冊）を掲載しています。` +
  `大学ごとの出題分析ページから、その大学の教材にたどれます。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "合格答案をつくる",
    "過去問の前に",
    "大学入試 数学 問題集",
    "大学別 数学 予想問題集",
    "数学 予想問題 採点基準",
    "大学別 数学 問題集 一覧",
  ],
  alternates: { canonical: "/books" },
  openGraph: {
    title,
    description,
    url: "/books",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

function UniversityRow({ u }: { u: University }) {
  const books = gokakuBooks(u.slug);
  return (
    <li className="border-b border-rule py-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[0.95rem] font-semibold text-ink">
          <Link href={`/univ/${u.slug}`} className="underline decoration-rule underline-offset-4 hover:text-navy">
            {shortName(u)}数学
          </Link>
        </h3>
        {books.length > 1 && (
          <span className="shrink-0 text-[0.7rem] tabular-nums text-ink-3">全{books.length}巻</span>
        )}
      </div>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {books.map((b) => (
          <li key={b.asin} className="flex items-center gap-2.5">
            {/* 幅の狭い画面では行ごと Amazon へ。ボタンを置くと見出しが潰れるため */}
            <a
              href={`https://www.amazon.co.jp/dp/${b.asin}`}
              rel="noopener nofollow sponsored"
              target="_blank"
              className="flex min-w-0 flex-1 items-center gap-2.5"
            >
              <Image
                src={`/covers/thumb/${b.asin}.webp`}
                alt={`${b.title}の表紙`}
                width={160}
                height={226}
                loading="lazy"
                sizes="36px"
                className="w-9 shrink-0 rounded-[2px] border border-rule"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.82rem] text-ink">{b.title}</span>
                <span className="block text-[0.68rem] tabular-nums text-ink-3">
                  {[yen(b.price), bookMetaLine(b)].filter(Boolean).join("・")}
                </span>
              </span>
            </a>
            <AmazonButton
              href={`https://www.amazon.co.jp/dp/${b.asin}`}
              label="Amazon"
              className="hidden shrink-0 !min-h-8 !px-2.5 !text-[0.72rem] sm:inline-flex"
            />
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function BooksPage() {
  const kansei = kanseiAll.filter((k) => k.published);
  const groups = groupOrder
    .map((g) => [g, universities.filter((u) => u.group === g)] as const)
    .filter(([, list]) => list.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "大学入試 数学の教材一覧",
        numberOfItems: allBooks.length,
        itemListElement: allBooks.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.fullTitle,
          url: `https://www.amazon.co.jp/dp/${b.asin}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "教材一覧", item: `${site.url}/books` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">教材一覧</span>
        </nav>

        <header className="pb-6 pt-4">
          <h1 className="serif text-[1.75rem] leading-[1.35] text-ink sm:text-[2.2rem]">教材一覧</h1>
          <p className="prose-ja mt-4 max-w-[38rem] text-[0.95rem] text-ink-2">
            大学入試の数学対策として、本番と同じ形式の予想問題集「{site.seriesName}」を{universityCount()}大学・
            {gokakuCount}冊、過去問に入る前に使う「{seriesName}」を{kansei.length + 1}冊出しています。
            どれも大学ごとの出題分析から書き下ろした非公式の独自教材です。
          </p>
        </header>

        <LearningPath compact className="mb-12 lg:mb-14" />

        <section aria-labelledby="kako-heading" className="mt-4">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">{seriesName}</p>
          <h2 id="kako-heading" className="rule-mark serif mt-1 text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            過去問に入る前の2段階
          </h2>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.9rem] text-ink-2">
            {seriesTagline}——その間を埋めるシリーズです。志望校診断模試で行き先を決め、その大学の分野別完成演習で頻出分野を固めます。
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-10">
            <div className="flex gap-4 border border-rule bg-white p-4">
              <Link href="/shindan" className="w-[84px] shrink-0">
                <Image
                  src={shindan.cover}
                  alt="志望校診断模試の表紙"
                  width={310}
                  height={438}
                  sizes="84px"
                  className="w-full rounded-[2px] border border-rule"
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[0.66rem] font-bold text-navy">1　志望校を決める</p>
                <p className="serif mt-1 text-[0.98rem] leading-snug text-ink">
                  <Link href="/shindan" className="hover:text-navy">
                    旧帝大・難関国公立大理系数学 志望校診断模試
                  </Link>
                </p>
                <p className="mt-1 text-[0.7rem] tabular-nums text-ink-3">
                  {[yen(shindan.catalog.price), bookMetaLine(shindan.catalog)].filter(Boolean).join("・")}
                </p>
                <AmazonButton href={shindan.amazonUrl} label="Amazon" className="mt-2 !min-h-8 !px-2.5 !text-[0.72rem]" />
              </div>
            </div>

            <div>
              <p className="text-[0.66rem] font-bold text-navy">2　志望校の頻出分野を固める（分野別完成演習 {kansei.length}冊）</p>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {kansei.map((k) => (
                  <li key={k.slug} className="flex items-center gap-2.5">
                    <Link href={`/kansei/${k.slug}`} className="w-9 shrink-0">
                      <Image
                        src={`/covers/kansei/thumb/${k.slug}.webp`}
                        alt={`${k.name} 分野別完成演習の表紙`}
                        width={160}
                        height={226}
                        loading="lazy"
                        sizes="36px"
                        className="w-full rounded-[2px] border border-rule"
                      />
                    </Link>
                    <span className="min-w-0 flex-1">
                      <Link
                        href={`/kansei/${k.slug}`}
                        className="block truncate text-[0.82rem] text-ink hover:text-navy"
                      >
                        {k.name}
                      </Link>
                      <span className="block text-[0.68rem] tabular-nums text-ink-3">
                        {k.total.fields}分野・{k.total.problems}題
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="gokaku-heading" className="mt-16">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">{site.seriesName}</p>
          <h2 id="gokaku-heading" className="rule-mark serif mt-1 text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            本番形式の予想問題集（{universityCount()}大学・{gokakuCount}冊）
          </h2>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.9rem] text-ink-2">
            各大学の過去問を分析して書き下ろした予想問題に、どこで何点入るかを示した採点基準を付けた問題集です。
            大学名から、その大学の出題分析（傾向と対策）に移れます。
          </p>

          <div className="mt-6 lg:columns-2 lg:gap-x-12">
            {groups.map(([g, list]) => (
              <section key={g} className="mt-8 break-inside-avoid first:mt-0 lg:mb-8 lg:mt-0">
                <h3 className="serif border-b border-rule pb-1.5 text-[1rem] text-ink">
                  {g}
                  <span className="ml-2 text-[0.72rem] font-normal text-ink-3">{universityCount(list)}大学</span>
                </h3>
                <ul>
                  {list.map((u) => (
                    <UniversityRow key={u.slug} u={u} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <p className="mt-12 text-[0.85rem]">
          <Link href="/universities" className="text-navy underline underline-offset-4">
            大学ごとの出題分析（傾向と対策）をすべて見る
          </Link>
        </p>
      </div>
    </>
  );
}
