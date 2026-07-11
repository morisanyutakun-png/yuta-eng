// 料金・対応教材（講座）の単一ソース。トップの料金表示・申込フォーム・Stripe API の
// すべてがここを参照する。金額の権威はサーバー（API）側でここから再計算する。
//
// 料金モデル：買い切り。1教材（講座）＝ 約100回分の分割課題 ＋ 添削 ＋ 習慣化アプリ。
// 教材をやり切ったら修了（＝終わりがある）。添削は「その教材の全課題（約100回）」に込み。
// 時間縛り（月額）ではなく、教材の分量で自然に上限が決まる。

export type Subject = {
  id: string;
  label: string;
  /** 発行API・通知向けの表示名。未指定なら label を使う。 */
  registrationLabel?: string;
  area: "物理" | "化学" | "数学" | "英語";
  color: string;
};

// 1教材（講座）＝ここでは1つの購入単位。物理は基礎・標準・発展に分ける。
export const SUBJECTS: Subject[] = [
  {
    id: "physics-basic",
    label: "物理 基礎",
    registrationLabel: "物理入門演習",
    area: "物理",
    color: "#1d4ed8",
  },
  {
    id: "physics",
    label: "物理 標準",
    registrationLabel: "物理標準演習",
    area: "物理",
    color: "#1d4ed8",
  },
  {
    id: "physics-advanced",
    label: "物理 発展",
    registrationLabel: "物理発展演習",
    area: "物理",
    color: "#1d4ed8",
  },
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

/** 1教材（約100回分・添削込み・買い切り）の通常価格（税込・円）。 */
export const MATERIAL_PRICE = 14800;

/** 2教材以上「開講記念パック」の1教材あたり単価（税込・円）→ 2教材で24,800。 */
export const PACK_UNIT_PRICE = 12400;

/** 1教材あたりのおおよその添削回数（＝教材の分量）。値ごろ感の説明に使う。 */
export const GRADING_COUNT = 100;

/**
 * 1日1回ペースで進めた場合の目安の日数（＝約100回分）。
 * 「約100日ぶん」「100日プログラム」など、期間としての値ごろ感の説明に使う。
 * 実際は自分のペースで進められる（毎日でなくてもよい）。
 */
export const PROGRAM_DAYS = GRADING_COUNT;

/**
 * 1日あたりの目安額（税込・円）＝ 買い切り価格 ÷ 約100回分。
 * 14,800 ÷ 100 = 148円。総額を分量で割った参考値で、追加課金ではない。
 */
export const PER_DAY_PRICE = Math.round(MATERIAL_PRICE / GRADING_COUNT);

/** 開講記念キャンペーン（2教材以上のパック割）の締切。JSTで判定。 */
export const CAMPAIGN_DEADLINE_ISO = "2026-08-06T23:59:59+09:00";
export const CAMPAIGN_NAME = "夏の開講記念";
/** 画面表示用の締切ラベル。 */
export const CAMPAIGN_DEADLINE_LABEL = "8/6";

/** キャンペーン（パック割）が有効か。既定は現在時刻で判定。 */
export function isCampaignActive(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(CAMPAIGN_DEADLINE_ISO).getTime();
}

/** 定価合計（パック割なし・税込）＝ 教材数 × 単価。 */
export function listTotal(count: number): number {
  return Math.max(0, count) * MATERIAL_PRICE;
}

/**
 * 実支払い合計（税込）。キャンペーン中は2教材以上でパック単価を適用。
 * 金額の権威はサーバー側。API はサーバー時刻の campaign 判定でここを再計算する。
 */
export function buyoutTotal(count: number, campaign: boolean = isCampaignActive()): number {
  if (count <= 0) return 0;
  if (campaign && count >= 2) return count * PACK_UNIT_PRICE;
  return count * MATERIAL_PRICE;
}

/** パック割の割引額（税込・0以上）。 */
export function packSavings(count: number, campaign: boolean = isCampaignActive()): number {
  return Math.max(0, listTotal(count) - buyoutTotal(count, campaign));
}

export function isValidSubjectId(id: unknown): id is string {
  return typeof id === "string" && SUBJECTS.some((s) => s.id === id);
}

export function subjectsByIds(ids: string[]): Subject[] {
  return ids
    .map((id) => SUBJECTS.find((s) => s.id === id))
    .filter((s): s is Subject => Boolean(s));
}

export function registrationLabelsBySubjects(subjects: Subject[]): string[] {
  return subjects.map((s) => s.registrationLabel ?? s.label);
}

export function formatYen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}
