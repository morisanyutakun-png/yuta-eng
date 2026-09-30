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

/** 「合格答案をつくる」の1冊。data/books.json（Amazon で確認した情報）から作る。 */
export type Book = {
  /** 一覧・見出しに出す短い書名 */
  title: string;
  /** Amazon の商品名そのまま（構造化データ用） */
  fullTitle: string;
  asin: string;
  /** 第何巻か */
  vol: number;
  price: number | null;
  pages: number | null;
  /** 発売日 YYYY-MM-DD */
  released: string | null;
  isbn13: string | null;
  /** 収録している予想問題の回数（原稿の set ファイル数）。取れないこともある。 */
  rounds?: number;
  /** 別解を載せているか。載せていない巻がある。 */
  altSolutions?: boolean;
  amazonUrl: string;
};

/** 原稿の導入文から拾った要点。取れなかった項目は入らない。 */
export type Facts = {
  examTime?: number;
  questions?: number;
  style?: string;
  points?: number;
  /** 「教育学部・農学部は100分」のように、学部で試験時間が分かれるときの但し書き。 */
  examTimeNote?: string;
  /**
   * 1冊の問題冊子から、志望学部の指定（千葉大・新潟大・愛媛大）や
   * 受験生自身の選択（筑波大）で解く大問が決まる方式。
   * 冊子に並ぶ題数と実際に解く題数が違うので、大問数は出さない。
   */
  selective?: boolean;
};

export type University = {
  slug: string;
  name: string;
  university: string;
  course: string;
  group: string;
  /** 見出し・タイトルに出す短い呼び名。name から作れない大学だけ持つ。 */
  short?: string;
  /** 検索用の読み・略称 */
  kana: string;
  folder: string;
  analysisTitle: string;
  /** ["2019", "2026"] のような分析対象年度。取れないこともある。 */
  years: string[];
  /** 実際に載っている年度の数。years が飛び飛びのこともあるので別に持つ。 */
  yearCount: number | null;
  facts: Facts;
  /** 冒頭に出す1〜2文 */
  summary: string;
  /** 「難易度と目標」から拾った目標点の一文。取れないこともある。 */
  goal: string;
  /**
   * 次年度から形式が変わる大学の、変更点の一文。
   * ページの数字は過去問から出しているので、これがあるときは併記しないと古い情報になる。
   */
  change: string;
  lead: Block[];
  sections: Section[];
  yearTable: { head: Cell[]; rows: Cell[][] } | null;
  fieldTable: { head: Cell[]; rows: Cell[][] } | null;
  /** 分野別頻度を棒グラフに描くための形。取れないこともある。 */
  fieldChart: FieldChart | null;
  books: Book[];
};

export type FieldChart = {
  /** 原稿の表見出しそのまま（「8年中」「8年40題中」など） */
  unit: string;
  /**
   * count が何を数えているか。
   * "question" … 題数を数えていて、denom が分母になる
   * "year"     … 期間が年で書かれているだけで、count は題数。分母にはできない
   */
  kind: "question" | "year" | "unknown";
  /** 分母として表示してよい題数。null なら分母を出さない。 */
  denom: number | null;
  /** 集計対象の期間（年）。取れないこともある。 */
  years: number | null;
  /** count の合計。1題が複数分野にまたがるので denom を超えうる。 */
  total: number;
  items: { label: string; count: number; note: string }[];
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

/**
 * 「2019〜2026年度（8年分）」のような、年度と年数をまとめた表示。
 * 大学によって5年分・6年分・9年分と幅があるので、
 * 「過去8年分」と決め打ちせずここを通す。
 */
export function yearLabel(u: University): string | null {
  const range = yearRange(u);
  if (!range) return null;
  return u.yearCount ? `${range}（${u.yearCount}年分）` : range;
}

/** 「8年分」だけの短い表示。年数が取れなければ null。 */
export function yearsLabel(u: University): string | null {
  return u.yearCount ? `${u.yearCount}年分` : null;
}

/**
 * サイト全体の集計。トップに出す数字を、決め打ちではなくデータから出す。
 * 大学ごとに分析年数が5〜9年とばらつくので、「過去8年分」とは書けない。
 */
export function siteTotals() {
  const counts = universities.map((u) => u.yearCount).filter((n): n is number => n != null);
  const years = universities.flatMap((u) => u.years.map(Number)).filter(Boolean);
  return {
    universities: universities.length,
    books: universities.reduce((a, u) => a + u.books.length, 0),
    /** 年度データが取れている大学の数 */
    analyzed: counts.length,
    minYears: counts.length ? Math.min(...counts) : 0,
    maxYears: counts.length ? Math.max(...counts) : 0,
    /** 「2018〜2026年度」。全大学を通した年度の幅。 */
    span: years.length ? `${Math.min(...years)}〜${Math.max(...years)}年度` : null,
    /** 延べ分析年数。「合計◯年分」として出せる。 */
    totalYears: counts.reduce((a, n) => a + n, 0),
  };
}

/** 検索・一覧に出す 1 行の要約。分析本文の先頭から作る。 */
export function summarize(u: University, max = 110): string {
  // 抽出の時点で数式は平文へ落としてある（scripts/extract-analysis.mjs の spansToPlain）。
  // ここで $…$ を削ると「配点は$100$点」が「配点は点」になってしまうので、削らない。
  const text = (u.summary || "").replace(/\s+/g, "");
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
  const { examTime, questions, style, selective } = u.facts;
  return [
    examTime ? `${examTime}分` : null,
    questions ? `大問${questions}題` : null,
    selective ? "解く問題を選択" : null,
    style,
  ]
    .filter(Boolean)
    .join("・");
}

/**
 * 分野別グラフの数え方を1行で説明する文。
 * 「8年中」と書かれた表の数字は年数ではなく題数なので、
 * そのまま「8年のうち何回」と書くと「16 / 8年」のような表示になる。
 */
export function fieldChartCaption(c: FieldChart, yearCount?: number | null): string {
  // 表の見出しに年が書かれていない（「30題中」だけ）ときは、
  // そのページの分析年数を使う。どちらも無ければ期間を言わない。
  const n = c.years ?? yearCount ?? null;
  const span = n ? `${n}年分` : "分析対象期間";
  if (c.kind === "question" && c.denom) {
    const over = c.total > c.denom;
    return `${span}・全${c.denom}題の出題分野を数えたもの。${
      over ? "1題が複数の分野にまたがるため、合計は題数を上回る。" : ""
    }`;
  }
  return `${span}で、その分野が出た題数。`;
}
