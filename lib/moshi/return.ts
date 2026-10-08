import raw from "@/data/moshi-return.json";

type ReturnQuestion = {
  no: number;
  field: string;
  subs: { no: number; score: number; max: number }[];
  comment: string;
  review: string;
};

/** Web の概要と返却 PDF の共通データ。すべて架空の成績例。 */
export const returnSample = raw as Omit<typeof raw, "questions"> & { questions: ReturnQuestion[] };

export function questionScore(q: ReturnQuestion) {
  const score = q.subs.reduce((n, s) => n + s.score, 0);
  const max = q.subs.reduce((n, s) => n + s.max, 0);
  return { score, max, rate: (score / max) * 100 };
}

export const returnTotals = returnSample.questions.reduce(
  (total, q) => {
    const { score, max } = questionScore(q);
    return { score: total.score + score, max: total.max + max };
  },
  { score: 0, max: 0 },
);
