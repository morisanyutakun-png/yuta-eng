import { getUniversity, universities } from "@/lib/data";
import { nagoyaBunkei2026 } from "@/lib/solutions/nagoya-bunkei-2026";
import { nagoyaRikei2025 } from "@/lib/solutions/nagoya-rikei-2025";
import { nagoyaRikei2026 } from "@/lib/solutions/nagoya-rikei-2026";
import { tohokuBunkei2026 } from "@/lib/solutions/tohoku-bunkei-2026";
import { todaiBunkei2026 } from "@/lib/solutions/todai-bunkei-2026";
import { sources } from "@/lib/solutions/sources";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 解答解説の入口。
 *
 * ここで「公開してよいもの」だけを選り分ける。ページも sitemap も、
 * すべてこのファイルが返すものだけから作る。書きかけ・未確認のものは外に出ない。
 */

/** 書いた解説をすべて並べる。原典の確認が済んでいないものもここには入る。 */
const all: SolutionSet[] = [todaiBunkei2026, nagoyaRikei2026, nagoyaBunkei2026, tohokuBunkei2026, nagoyaRikei2025];

/**
 * 公開してよい大問だけに絞る。
 *
 * 条件をここ1か所に集めておき、ページも sitemap もこの関数を通ったものだけから作る。
 * 「status を published にし忘れていないか」ではなく「published にしてよい状態か」を見る。
 */
function publishable(set: SolutionSet): SolutionSet | null {
  const source = set.source ?? sources[set.slug]?.[set.year] ?? null;
  if (!source) return null; // 原典が確認できていない年度は公開しない
  const questions = set.questions.filter(
    (q) =>
      q.status === "published" &&
      q.review.sourceChecked && // 原典にあたって大学・年度・科目・区分・大問番号を照合した
      q.review.rightsHolds.length === 0 && // 権利面の保留が残っていない
      q.review.todos.length === 0 && // 公開前の作業が残っていない
      q.subs.length > 0,
  );
  if (!questions.length) return null;
  return { ...set, source, questions };
}

/** 書いたが公開条件を満たしていないもの。報告と npm run check:solutions のためだけに使う。 */
export const withheld = all.flatMap((set) =>
  set.questions
    .filter((q) => !publishable(set)?.questions.some((p) => p.no === q.no))
    .map((q) => ({ slug: set.slug, year: set.year, no: q.no, status: q.status, review: q.review })),
);

/** 公開中の解説セット。年度の新しい順、同じ年度なら大学ページの並び順。 */
export const published: SolutionSet[] = all
  .map(publishable)
  .filter((s): s is SolutionSet => s !== null)
  .sort((a, b) => b.year - a.year || universities.findIndex((u) => u.slug === a.slug) - universities.findIndex((u) => u.slug === b.slug));

export const hasSolutions = published.length > 0;

/** その大学の公開中の解説（年度の新しい順）。 */
export const solutionsFor = (slug: string): SolutionSet[] => published.filter((s) => s.slug === slug);

/** 大学・年度を指定して1セット取り出す。 */
export const solutionSet = (slug: string, year: number): SolutionSet | undefined =>
  published.find((s) => s.slug === slug && s.year === year);

export const questionOf = (set: SolutionSet, no: number): Question | undefined =>
  set.questions.find((q) => q.no === no);

/** 解説を出している大学の一覧。解答解説トップと大学一覧で使う。 */
export function solutionUniversities() {
  const slugs = [...new Set(published.map((s) => s.slug))];
  return slugs
    .map((slug) => {
      const u = getUniversity(slug);
      const sets = solutionsFor(slug);
      return u ? { u, sets, years: sets.map((s) => s.year) } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
}

/** 公開中の大問の総数。見出しや構造化データの数字に使う。 */
export const questionCount = published.reduce((n, s) => n + s.questions.length, 0);

/** 一番新しい更新日。トップに「最終更新」を出すため。 */
export const lastUpdated = published
  .flatMap((s) => s.questions.map((q) => q.updated))
  .sort()
  .at(-1);

/** 解説ページで必ず出す断り書き。公式解答と取り違えられないようにする。 */
export const NOT_OFFICIAL =
  "大学の公式解答ではなく、当サイト独自の解答・解説です。問題文は掲載していません。";

/** URL の組み立て。既存の /univ/<slug> に合わせて /kaisetsu/<slug>/<year> にする。 */
export const setPath = (s: Pick<SolutionSet, "slug" | "year">) => `/kaisetsu/${s.slug}/${s.year}`;
export const questionPath = (s: Pick<SolutionSet, "slug" | "year">, no: number) => `${setPath(s)}/${no}`;
