import raw from "@/data/series.json";
import { amazonUrl, kanseiCatalog, shindanCatalog, type CatalogEntry } from "@/lib/catalog";
import type { Block, Span } from "@/lib/data";

/*
 * 「過去問の前に」シリーズ（志望校診断模試・分野別完成演習）。
 * 中身は原稿から scripts/extract-series.mjs で起こした data/series.json、
 * Amazon の商品情報は lib/catalog.ts。この2つをここで合わせる。
 */

export const seriesName = "過去問の前にシリーズ";
export const seriesTagline = "標準問題は終えた。過去問はまだ早い。";

export type KanseiChapter = {
  no: number;
  field: string;
  range: string;
  problems: number;
  subquestions: number | null;
  minutes: number;
  standard: number;
  hard: number;
  honban: number;
  /** 章扉の一言（「数え上げる前に、何で分類するかを決める」） */
  lead: string;
  /** 章扉の「その分野でこの大学が何を要求するか」 */
  strategy: Block[];
  /** 収録問題の題材名・レベル・目標時間（問題文そのものは持たない） */
  list: { id: string; level: string; title: Span[]; minutes: number }[];
};

export type KanseiBook = {
  slug: string;
  name: string;
  university: string;
  uni: string;
  alias?: string;
  /** 本書が分析した過去問の年度 [2019, 2026] */
  years: number[];
  total: {
    fields: number;
    problems: number;
    subquestions: number | null;
    minutes: number;
    standard: number;
    hard: number;
    honban: number;
  };
  /** 数学III を学ぶ前に解ける章（原稿の「数学III 履修中」の記述） */
  beforeIII: { label: string | null; chapters: number[]; problems: number };
  /** 誘導を外した「本番ならこう出る」を収録しているか */
  honban: boolean;
  /** 付録の見出し（巻ごとに違う） */
  appendices: { label: string; title: string }[];
  /** その大学の過去問で受験生が手を止める理由（原稿「本書はどこに置かれる本か」） */
  opener: string;
  chapters: KanseiChapter[];
};

export type Kansei = KanseiBook & {
  catalog: CatalogEntry;
  /** ASIN があれば公開。なければ「近日追加予定」 */
  published: boolean;
  amazonUrl: string | null;
  cover: string;
};

export type Shindan = {
  slug: string;
  name: string;
  rounds: number;
  minutes: number;
  questions: number;
  points: number;
  problems: number;
  pastExams: number;
  universities: {
    name: string;
    minutes: number;
    questions: number;
    perQuestion: number;
    formula: boolean;
    summary: Span[];
  }[];
  tags: {
    field: { name: string; points: number; desc: Span[] }[];
    ability: { name: string; points: number; desc: Span[] }[];
  };
  scope: { knows?: Span[]; unknown?: Span[] };
  judgements: { label: string; desc: Span[] }[];
  /** 回ごとの「たまたま動く幅」（標準偏差の目安） */
  noise: number[];
  differences: { same?: Span[]; differ?: Span[][] };
  next: string;
  easier: boolean;
  catalog: CatalogEntry;
  amazonUrl: string;
  cover: string;
};

const data = raw as unknown as { kansei: KanseiBook[]; shindan: Omit<Shindan, "catalog" | "amazonUrl" | "cover"> };

export const kanseiAll: Kansei[] = data.kansei.map((b) => {
  const catalog = kanseiCatalog[b.slug] ?? { asin: null };
  return {
    ...b,
    catalog,
    published: Boolean(catalog.asin),
    amazonUrl: catalog.asin ? amazonUrl(catalog.asin) : null,
    // 表紙は slug 名で書き出してある（ASIN が後から決まっても描き直さずに済む）
    cover: `/covers/kansei/${b.slug}.webp`,
  };
});

/** 公開済み（ASIN あり）の巻だけ。ページを作るのはこちら。 */
export const kanseiPublished = kanseiAll.filter((k) => k.published);
export const kanseiUpcoming = kanseiAll.filter((k) => !k.published);

export function getKansei(slug: string): Kansei | undefined {
  return kanseiPublished.find((k) => k.slug === slug);
}

/** 大学別分析のページから、同じ大学の完成演習を引く（未公開も含む）。 */
export function kanseiFor(slug: string): Kansei | undefined {
  return kanseiAll.find((k) => k.slug === slug);
}

export const shindan: Shindan = {
  ...data.shindan,
  catalog: shindanCatalog,
  amazonUrl: amazonUrl(shindanCatalog.asin!),
  cover: "/covers/kansei/shindan.webp",
};

/** 完成演習の書名（表紙どおり）。 */
export const kanseiTitle = (k: KanseiBook) => `${k.name} 分野別完成演習`;

/** 「東京大学（理系）」のような、検索語に使う大学名。科学大は理系の区分を持たない。 */
export const kanseiUniversityLabel = (k: KanseiBook) =>
  k.name.includes("理系") ? `${k.university}（理系）` : k.university;

/** 目標時間の合計を「1日90分なら◯日」に直す（原稿の使い方の目安と同じ割り方）。 */
export const daysAt = (minutes: number, perDay = 90) => Math.ceil(minutes / perDay);

export const yen = (n?: number) => (n ? `¥${n.toLocaleString("ja-JP")}` : null);

/** 発売日「2026-09-07」→「2026年9月7日」 */
export function releasedLabel(d?: string) {
  if (!d) return null;
  const [y, m, day] = d.split("-").map(Number);
  return `${y}年${m}月${day}日`;
}
