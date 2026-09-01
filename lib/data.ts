import raw from "@/data/analysis.json";

/** 原稿の LaTeX から起こしたインライン片。 */
export type Span =
  | { t: "text"; v: string }
  | { t: "b"; v: string }
  | { t: "u"; v: string }
  | { t: "math"; v: string };

export type Cell = { spans: Span[]; colSpan: number };

export type Block =
  | { type: "p"; spans: Span[] }
  | { type: "list"; ordered: boolean; items: Span[][] }
  | { type: "table"; head: Cell[]; rows: Cell[][] };

export type Section = { title: string; blocks: Block[] };

export type Book = {
  title: string;
  asin: string;
  price: number | null;
  pages: number | null;
  amazonUrl: string;
};

/** 原稿の導入文から拾った要点。取れなかった項目は入らない。 */
export type Facts = {
  examTime?: number;
  questions?: number;
  style?: string;
  points?: number;
};

export type University = {
  slug: string;
  name: string;
  university: string;
  course: string;
  group: string;
  /** 検索用の読み・略称 */
  kana: string;
  folder: string;
  analysisTitle: string;
  /** ["2019", "2026"] のような分析対象年度。取れないこともある。 */
  years: string[];
  facts: Facts;
  /** 冒頭に出す1〜2文 */
  summary: string;
  lead: Block[];
  sections: Section[];
  yearTable: { head: Cell[]; rows: Cell[][] } | null;
  fieldTable: { head: Cell[]; rows: Cell[][] } | null;
  books: Book[];
};

export const universities = raw as University[];

export function getUniversity(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug);
}

/** グループ順に並べた [グループ名, 大学[]] の配列。 */
export function byGroup(order: readonly string[]): [string, University[]][] {
  const map = new Map<string, University[]>();
  for (const u of universities) {
    if (!map.has(u.group)) map.set(u.group, []);
    map.get(u.group)!.push(u);
  }
  return [...map.entries()]
    .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
    .map(([g, list]) => [g, list.sort((a, b) => a.name.localeCompare(b.name, "ja"))]);
}

/** 同じグループの他大学（関連リンク用）。 */
export function related(u: University, limit = 6): University[] {
  return universities.filter((x) => x.group === u.group && x.slug !== u.slug).slice(0, limit);
}

export const spanText = (spans: Span[]): string => spans.map((s) => s.v).join("");

/** 「2019〜2026年度」のような表示用の文字列。 */
export function yearRange(u: University): string | null {
  return u.years.length === 2 ? `${u.years[0]}〜${u.years[1]}年度` : null;
}

/** 検索・一覧に出す 1 行の要約。分析本文の先頭から作る。 */
export function summarize(u: University, max = 110): string {
  const text = (u.summary || "").replace(/\$[^$]*\$/g, "").replace(/\s+/g, "");
  if (text) return text.length > max ? `${text.slice(0, max)}…` : text;

  const first =
    u.lead.find((b) => b.type === "p") ??
    u.sections.flatMap((s) => s.blocks).find((b) => b.type === "p");
  if (!first || first.type !== "p") return "";
  const raw = spanText(first.spans).replace(/\s+/g, "");
  return raw.length > max ? `${raw.slice(0, max)}…` : raw;
}

/** 見出しの通し番号（「1.2 」など）を落とす。 */
export function cleanHeading(title: string): string {
  return title.replace(/^\d+(\.\d+)?[.．\s　]*/, "").trim();
}

/** 見出しからアンカー用の id を作る。 */
export function sectionId(index: number): string {
  return `s${index + 1}`;
}

/** 要点を「120分・大問5題・完全記述式」のような1行にする。 */
export function factsLine(u: University): string {
  const { examTime, questions, style } = u.facts;
  return [examTime ? `${examTime}分` : null, questions ? `大問${questions}題` : null, style]
    .filter(Boolean)
    .join("・");
}
