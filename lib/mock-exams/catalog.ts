import {
  examLevels,
  mockExams as staticMockExams,
  type ExamFileKey,
  type ExamLevel,
  type MockExam,
} from "@/data/mock-exams";

/**
 * 商品データの表示・計算ヘルパー（クライアント・サーバー共通）。
 *
 * `node:fs` などの Node.js 専用モジュールを含まないため、
 * クライアントコンポーネントからも安全に import できる。
 */

export const mockExams = staticMockExams;

export const isOnSale = (exam: MockExam) => exam.status === "on-sale";

export const levelLabel = (level: ExamLevel) => examLevels[level].label;

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

/** 画面に出す価格の表記。デジタル商品なので送料は無い */
export const priceLabel = (exam: MockExam) => `${yen(exam.price)}（税込）`;

export const examPath = (exam: MockExam) => `/mock-exams/${exam.id}`;

export const fileLabel = (exam: MockExam, key: ExamFileKey) => {
  if (key === "full") return "全4冊統合版（問題・解答用紙・解説・基準）";
  return exam.files.find((f) => f.key === key)?.label ?? key;
};

/** 購入者がダウンロードするときのファイル名。日本語のまま渡す */
export const downloadName = (exam: MockExam, key: ExamFileKey) =>
  `${exam.title}_${fileLabel(exam, key)}.pdf`.replace(/[\\/:*?"<>|\s]+/g, "_");

/**
 * 使う Stripe の Price ID。
 */
export function stripePriceIdFor(exam: MockExam): string | null {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  const live = key.startsWith("sk_live_") || key.startsWith("rk_live_");
  const id = live ? exam.stripePriceId?.live : exam.stripePriceId?.test;
  return id?.trim() || null;
}

/** 一覧の絞り込みの並び。「すべて」は画面側で足す */
export const levelOrder: ExamLevel[] = ["zento-standard", "zento-high", "kanmuri"];
