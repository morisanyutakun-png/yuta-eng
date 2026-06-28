// 料金・対応科目の単一ソース。トップの料金表示・申込フォーム・Stripe API の
// すべてがここを参照する。金額の権威はサーバー（API）側でここから再計算する。

export type Subject = {
  id: string;
  label: string;
  area: "物理" | "化学" | "数学" | "英語";
  color: string;
};

export const SUBJECTS: Subject[] = [
  { id: "physics-basic", label: "物理基礎", area: "物理", color: "#1d4ed8" },
  { id: "physics", label: "物理", area: "物理", color: "#1d4ed8" },
  { id: "chemistry-basic", label: "化学基礎", area: "化学", color: "#0d9488" },
  { id: "chemistry", label: "化学", area: "化学", color: "#0d9488" },
  { id: "math-1a", label: "数学IA", area: "数学", color: "#16a34a" },
  { id: "math-2bc", label: "数学IIBC", area: "数学", color: "#16a34a" },
  { id: "math-3c", label: "数学IIIC", area: "数学", color: "#16a34a" },
  { id: "english-reading", label: "英語長文", area: "英語", color: "#ea580c" },
  { id: "english-grammar", label: "英文法", area: "英語", color: "#ea580c" },
];

export const SUBJECT_AREAS: Subject["area"][] = ["物理", "化学", "数学", "英語"];

export const CURRENCY = "jpy";

/** 教科数に応じた月額（税込・円）。1=4,980 / 2=8,800 / 3=12,800 / 4教科以降は +3,000/教科。 */
export function monthlyTotal(count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 4980;
  if (count === 2) return 8800;
  if (count === 3) return 12800;
  return 12800 + (count - 3) * 3000;
}

/** 初月は半額。 */
export function firstMonthTotal(count: number): number {
  return Math.round(monthlyTotal(count) / 2);
}

export function isValidSubjectId(id: unknown): id is string {
  return typeof id === "string" && SUBJECTS.some((s) => s.id === id);
}

export function subjectsByIds(ids: string[]): Subject[] {
  return ids
    .map((id) => SUBJECTS.find((s) => s.id === id))
    .filter((s): s is Subject => Boolean(s));
}

export function formatYen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}

/** 初月半額クーポンの ID（Stripe 上で 50% off・duration once を使い回す）。 */
export const FIRST_MONTH_COUPON_ID = "nobit-first-month-50";
