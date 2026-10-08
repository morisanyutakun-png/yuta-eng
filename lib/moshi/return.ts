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

/** 架空の同一受験者集団から計算。順位は同点同順位、分散は母分散。 */
const scores = returnSample.populationScores;
const count = scores.length;
const mean = scores.reduce((sum, score) => sum + score, 0) / count;
const standardDeviation = Math.sqrt(scores.reduce((sum, score) => sum + (score - mean) ** 2, 0) / count);

export const returnStatistics = {
  count,
  mean,
  standardDeviation,
  deviation: 50 + (10 * (returnTotals.score - mean)) / standardDeviation,
  rank: 1 + scores.filter((score) => score > returnTotals.score).length,
  bins: Array.from({ length: 6 }, (_, index) => {
    const lower = index * 10;
    const upper = index === 5 ? returnTotals.max : lower + 9;
    return { lower, upper, count: scores.filter((score) => score >= lower && score <= upper).length };
  }),
};
