import raw from "@/data/books.json";

/**
 * 販売中の本（data/books.json）。
 * ASIN と大学の対応は scripts/book-registry.mjs、
 * 書名・価格・ページ数・発売日は Amazon の商品ページから `npm run data:books` で取り直す。
 */
export type SeriesKey = "gokaku" | "kansei" | "shindan";

export type Book = {
  asin: string;
  series: SeriesKey;
  /** 大学別分析と同じ slug（診断模試だけ "shindan"） */
  slug: string;
  /** 第何巻か。1冊しかない本は 1 */
  vol: number;
  /** 一覧・見出しに出す短い書名（Amazon の商品名の副題より前） */
  title: string;
  /** Amazon の商品名そのまま（構造化データに使う） */
  fullTitle: string;
  pages: number | null;
  /** 税込価格（円） */
  price: number | null;
  /** 発売日 YYYY-MM-DD */
  released: string | null;
  isbn13: string | null;
};

export const allBooks = Object.values(raw as Record<string, Book>);

export const amazonUrl = (asin: string) => `https://www.amazon.co.jp/dp/${asin}`;

const byVol = (a: Book, b: Book) => a.vol - b.vol;

/** その大学の「合格答案をつくる」全巻。 */
export const gokakuBooks = (slug: string) => allBooks.filter((b) => b.series === "gokaku" && b.slug === slug).sort(byVol);

/** その大学の「分野別完成演習」。まだ出ていなければ undefined。 */
export const kanseiBook = (slug: string) => allBooks.find((b) => b.series === "kansei" && b.slug === slug);

export const shindanBookData = allBooks.find((b) => b.series === "shindan");

export const yen = (n?: number | null) => (n ? `¥${n.toLocaleString("ja-JP")}` : null);

/** 発売日「2026-09-07」→「2026年9月7日」 */
export function releasedLabel(d?: string | null) {
  if (!d) return null;
  const [y, m, day] = d.split("-").map(Number);
  return `${y}年${m}月${day}日`;
}

/** 「138ページ・2026年9月6日発売」 */
export const bookMetaLine = (b?: Pick<Book, "pages" | "released"> | null) =>
  [b?.pages ? `${b.pages}ページ` : null, releasedLabel(b?.released) ? `${releasedLabel(b?.released)}発売` : null]
    .filter(Boolean)
    .join("・");
