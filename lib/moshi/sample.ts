import raw from "@/data/moshi-sample.json";

/**
 * 模試の見本。
 *
 * 中身は LaTeX で組んである（assets/moshi-sample/moshi-sample.tex）。
 * 画面に HTML で書き起こすのではなく、**書籍と同じ組版の PDF を作ってから**
 * 1ページずつの画像にして載せる。書店で手に取るのと同じ見え方にしたいからで、
 * 作り方も書籍の試し読みとそろえてある（scripts/build-moshi-sample.py）。
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
  /** 扉・問題・解答・採点のどれか。偏りの確認に使う */
  kind: string;
  page: number;
  width: number;
  height: number;
};

export type MoshiSampleBooklet = { pdf: string; pages: MoshiSamplePage[] };

/**
 * 2冊ある。
 *   problem … 本番と同じ体裁の問題・解答と解説・採点基準
 *   return  … 受験後にお返しする「合格への手引き」1人分（受験者・得点は架空）
 *
 * 受験料で何が返ってくるのかは、文章で説明するより返却の見本を見せるほうが早い。
 */
export const moshiSample = raw as Record<"problem" | "return", MoshiSampleBooklet>;

/** 返却見本に出てくる受験者・得点は架空のもの。必ず添える */
export const RETURN_NOTICE =
  "受験後にお返しする「合格への手引き」を、1人分そのまま載せています。中に出てくる受験者・得点・答案はすべて架空のもので、実在の受験者のものではありません。";

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
  "既刊「合格答案をつくる」シリーズの予想問題を作り替えた見本です。大学の過去問そのものではありません。配点と採点基準は本模試のもので、大学が公表しているものではありません。";
