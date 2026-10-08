import raw from "@/data/moshi-sample.json";

/**
 * 模試の見本。
 *
 * 問題は書籍と同じ組版。返却見本は独立したカラーの成績レポート。
 * PDF とページ画像は scripts/build-moshi-sample.py で生成し、
 * 返却内容は data/moshi-return.json を Web の概要と共有する。
 *
 * 出どころは既刊「合格答案をつくる」シリーズの予想問題を作り替えたもの。
 * 大学の過去問そのものではない。配点・採点基準は本模試のもので、
 * 大学が公表しているものではない。
 *
 * 答えは scripts/verify-solutions.py で確かめてある。式を立て直すのではなく、
 * $S_n$ と $a_n$ の関係だけから数列を直接作って突き合わせている。
 */

export type MoshiSamplePage = {
  file: string;
  label: string;
  /** ページの内容。1ページに複数の内容がある場合は「・」でつなぐ */
  kind: string;
  page: number;
  width: number;
  height: number;
  /** 画像内容のハッシュ。更新前の最適化画像を表示しないための版識別子 */
  version?: string;
};

export type MoshiSampleBooklet = { pdf: string; pages: MoshiSamplePage[] };

/**
 * 2冊ある。
 *   problem … 大学を特定しない共通の問題・解答と解説・採点基準
 *   return  … 受験後にお返しする「合格への手引き」1人分（受験者・得点は架空）
 *
 * 受験料で何が返ってくるのかは、文章で説明するより返却の見本を見せるほうが早い。
 */
const sampleData = raw as Record<"problem" | "return", MoshiSampleBooklet>;
const returnVersion = sampleData.return.pages.map((page) => page.version).filter(Boolean).join("-");
export const moshiSample = {
  problem: sampleData.problem,
  return: {
    ...sampleData.return,
    pdf: returnVersion ? `${sampleData.return.pdf}?v=${returnVersion}` : sampleData.return.pdf,
    pages: sampleData.return.pages.map((page) => ({
      ...page,
      file: page.version ? `${page.file}?v=${page.version}` : page.file,
    })),
  },
};

/** 大学名・回次・日付・受験者・成績は架空。全大学で同じ見本を使う */
export const RETURN_NOTICE =
  "この見本は全大学共通の「合格への手引き」です。大学名・回次・日付・受験者・成績・統計・判定はすべて架空で、特定大学の試験や公式配点を示すものではありません。成績冊子はA4横・表裏2ページ。採点済み答案は、実際の返却時に別添PDFでお渡しします。両面印刷は短辺とじを選んでください。";

export const sampleMeta = {
  /** この見本に収めた大問の分野 */
  field: "数列",
  /** この1題の配点。模試全体の配点ではない */
  points: 20,
  /** 本番で想定している解答時間の目安 */
  minutes: 25,
};

/** 見本のすぐそばに必ず出す断り書き。言い換えずにこの文を使う。 */
export const SAMPLE_NOTICE =
  "特定の大学・回次を想定しない共通見本です。既刊「合格答案をつくる」シリーズの予想問題を作り替えたもので、大学の過去問そのものではありません。配点・採点基準はこの見本のもので、大学が公表しているものではありません。";
