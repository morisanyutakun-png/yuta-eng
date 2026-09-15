/**
 * 「過去問の前に」シリーズの Amazon 商品情報。
 *
 * 原稿（~/…/front.tex）には ASIN・価格・発売日がないので、ここだけは手で持つ。
 * 値はすべて Amazon.co.jp の各商品ページで 2026-09-15 に確認したもの。推測で埋めないこと。
 *
 * ── 近日追加予定の巻を公開するには ──
 * `asin` を書き足すだけでよい。data/series.json には原稿から起こした中身が
 * 8冊ぶん入っているので、次のビルドで /kansei/<slug> のページ・サイトマップ・
 * 一覧のリンク・大学別分析からの導線がまとめて有効になる。
 * title / pages / price / released / isbn13 は分かったものだけ足せばよい（無ければ表示しない）。
 */
export type CatalogEntry = {
  asin: string | null;
  /** Amazon の商品名（副題まで） */
  title?: string;
  pages?: number;
  /** 税込価格（円） */
  price?: number;
  /** 発売日 YYYY-MM-DD */
  released?: string;
  isbn13?: string;
};

/** 分野別完成演習。キーは scripts/series-meta.mjs の slug（＝大学別分析の slug）。 */
export const kanseiCatalog: Record<string, CatalogEntry> = {
  "todai-rikei": {
    asin: "B0HJ1JGFDV",
    title: "過去問の前に 東大理系数学 2027年度対策: 分野別完成演習―標準問題は終えた。過去問はまだ早い。",
    pages: 134,
    price: 2695,
    released: "2026-09-07",
    isbn13: "979-8172448904",
  },
  "kyodai-rikei": {
    asin: "B0HHZQ8X7H",
    title: "過去問の前に 京大理系数学 2027年度対策: 分野別完成演習―標準問題は終えた。過去問はまだ早い。",
    pages: 138,
    price: 2695,
    released: "2026-09-06",
    isbn13: "979-8172340017",
  },
  "handai-rikei": {
    asin: "B0HJR15WBD",
    title: "過去問の前に 阪大理系数学 2027年度対策: 分野別完成演習―標準問題は終えた。過去問はまだ早い。",
    pages: 142,
    price: 2695,
    released: "2026-09-14",
    isbn13: "979-8174210158",
  },
  "nagoya-rikei": {
    asin: "B0HJ1YXFWW",
    title: "過去問の前に 名大理系数学 2027年度対策: 分野別完成演習―標準問題は終えた。過去問はまだ早い。",
    pages: 142,
    price: 2695,
    released: "2026-09-06",
    isbn13: "979-8172214677",
  },
  kagakudai: {
    asin: "B0HHZPM96X",
    title: "過去問の前に 東京科学大数学 2027年度対策: 分野別完成演習―標準問題は終えた。過去問はまだ早い。",
    pages: 128,
    price: 2695,
    released: "2026-09-06",
    isbn13: "979-8172328251",
  },
  // 近日追加予定（原稿は完成済み。ASIN が決まったら書き足す）
  "tohoku-rikei": { asin: null },
  "kyudai-rikei": { asin: null },
  "hokudai-rikei": { asin: null },
};

/** 志望校診断模試。 */
export const shindanCatalog: CatalogEntry = {
  asin: "B0HJQP1VD3",
  title:
    "過去問の前に 旧帝大・難関国公立大理系数学 志望校診断模試 2027年度対策: 5回の模試で「得点の形」を分析し、8大学との相性を判定―標準問題は終えた。過去問はまだ早い。",
  pages: 128,
  price: 2695,
  released: "2026-09-14",
  isbn13: "979-8174021310",
};

export const amazonUrl = (asin: string) => `https://www.amazon.co.jp/dp/${asin}`;
