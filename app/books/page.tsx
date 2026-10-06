import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { ProductPanel, type Product } from "@/components/product-panel";
import { allBooks, bookMetaLine, gokakuBooks, yen } from "@/lib/books";
import { universities, universityCount, type University } from "@/lib/data";
import { shortName } from "@/lib/seo";
import { kanseiAll, seriesName, shindan } from "@/lib/series";
import { groupOrder, site } from "@/lib/site";

const gokakuList = allBooks.filter((b) => b.series === "gokaku");
// シリーズの顔に出す表紙。刊行順の先頭だと中期日程などになることがあるので、
// 一覧と同じ並び（群の順）の先頭大学を使う
const order: readonly string[] = groupOrder;
const leadUniv = [...universities].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group))[0];
const gokakuCount = gokakuList.length;
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

        {/*
          3つのシリーズを同じ型で並べる。順番は使う順（決める→固める→仕上げる）。
          どれも「表紙→名前→だれ向けか→特徴→価格→ボタン」で書くので、
          2つ目からは同じ位置を見るだけで比べられる。
        */}
        <section aria-labelledby="series-heading" className="mt-4">
          <h2 id="series-heading" className="rule-mark serif h-sect text-ink">
            3つのシリーズ
          </h2>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.9rem] text-ink-2">
            使う順に並べています。志望校を決め、頻出分野を固め、本番の形式で仕上げる、という流れです。
          </p>

          <ul className="mt-7 space-y-10">
            {(
              [
                {
                  cover: shindan.cover,
                  coverAlt: "志望校診断模試の表紙",
                  name: "旧帝大・難関国公立大理系数学 志望校診断模試",
                  audience: "志望校がまだ決まっていない人へ",
                  points: [
                    `${shindan.rounds}回分の模試を解いて、${shindan.universities.length}大学との相性を判定します。`,
                    `過去問${shindan.pastExams}題を分析して作問し、分野別・能力別に得点を分けて出します。`,
                    "どの大学を目指すかを決めてから、下の2つに進めます。",
                  ],
                  meta: [yen(shindan.catalog.price), bookMetaLine(shindan.catalog)].filter(Boolean).join("・"),
                  href: "/shindan",
                  hrefLabel: "判定の仕組みを見る",
                  amazonUrl: shindan.amazonUrl,
                },
                {
                  cover: kansei[0].cover,
                  coverAlt: `${kansei[0].name} 分野別完成演習の表紙`,
                  name: `過去問の前に 分野別完成演習（${kansei.length}冊）`,
                  audience: "標準問題は終えたが、過去問はまだ早いと感じる人へ",
                  points: [
                    "志望校の頻出分野だけを取り出し、標準から本番の水準まで段階的に上げます。",
                    "章ごとに分野がまとまっているので、苦手な分野から始められます。",
                    `いまは${kansei.length}大学ぶんを刊行しています。`,
                  ],
                  meta: kansei[0].catalog
                    ? [yen(kansei[0].catalog.price), bookMetaLine(kansei[0].catalog)].filter(Boolean).join("・") +
                      "（1冊あたり）"
                    : null,
                  href: "/kansei",
                  hrefLabel: "収録分野を見る",
                  amazonUrl: kansei[0].amazonUrl,
                },
                {
                  cover: `/covers/${leadUniv.books[0].asin}.webp`,
                  coverAlt: `${leadUniv.books[0].title}の表紙`,
                  name: `${site.seriesName}（${universityCount()}大学・${gokakuCount}冊）`,
                  audience: "志望校が決まっていて、本番の形式で仕上げたい人へ",
                  points: [
                    "本番と同じ試験時間・大問構成・解答形式で書き下ろした予想問題集です。",
                    "小問ごとの加点・減点を示した採点表が付いているので、自分の答案を採点できます。",
                    "過去問そのものは入っていません。過去問演習と並べて使います。",
                  ],
                  meta: `¥${Math.min(...gokakuList.map((b) => b.price ?? Infinity)).toLocaleString()}〜（大学・巻による）`,
                  href: "/universities",
                  hrefLabel: "大学別に見る",
                  amazonUrl: null,
                },
              ] satisfies Product[]
            ).map((p, i) => (
              <li key={p.name} className="border-t border-rule pt-10 first:border-0 first:pt-0">
                <ProductPanel p={p} priority={i === 0} />
              </li>
            ))}
          </ul>
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
