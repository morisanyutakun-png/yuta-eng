import {
  examLevels,
  mockExams,
  type ExamFileKey,
  type ExamLevel,
  type MockExam,
} from "@/data/mock-exams";

/**
 * 商品データの読み出し。
 *
 * 画面・API はどれも data/mock-exams.ts を直接さわらず、ここを通す。
 * 「販売中かどうか」「どの Price ID を使うか」の判断を1か所にまとめ、
 * 画面では買えないのに API では買える、といった食い違いを作らないため。
 */

export const allExams = (): MockExam[] => mockExams;

export const getExam = (id: string): MockExam | undefined => mockExams.find((e) => e.id === id);

export const isOnSale = (exam: MockExam) => exam.status === "on-sale";

export const levelLabel = (level: ExamLevel) => examLevels[level].label;

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

/** 画面に出す価格の表記。デジタル商品なので送料は無い */
export const priceLabel = (exam: MockExam) => `${yen(exam.price)}（税込）`;

export const examPath = (exam: MockExam) => `/mock-exams/${exam.id}`;

export const fileLabel = (exam: MockExam, key: ExamFileKey) =>
  exam.files.find((f) => f.key === key)?.label ?? key;

/** 購入者がダウンロードするときのファイル名。日本語のまま渡す */
export const downloadName = (exam: MockExam, key: ExamFileKey) =>
  `${exam.title}_${fileLabel(exam, key)}.pdf`.replace(/[\\/:*?"<>|\s]+/g, "_");

/**
 * 使う Stripe の Price ID。
 * テスト用の鍵で本番の Price ID を指定すると Stripe がエラーを返すので、
 * 鍵の種類に合わせて選ぶ。無ければ null（決済時に価格を組み立てる）。
 */
export function stripePriceIdFor(exam: MockExam): string | null {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const live = key.startsWith("sk_live_") || key.startsWith("rk_live_");
  const id = live ? exam.stripePriceId?.live : exam.stripePriceId?.test;
  return id?.trim() || null;
}

/** 一覧の絞り込みの並び。「すべて」は画面側で足す */
export const levelOrder: ExamLevel[] = ["zento-standard", "zento-high", "kanmuri"];

