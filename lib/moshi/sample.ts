import type { Block } from "@/lib/solutions/types";

/**
 * 模試の見本。
 *
 * 申し込む前に「どんな問題が出て、どう採点されるのか」を確かめられるようにする。
 * 文章で「記述式です」「人の手で採点します」と書くより、1題そのまま見せるほうが早い。
 *
 * 出どころは**当サイトの既刊「合格答案をつくる」シリーズの予想問題**で、
 * それを作り替えた（数値と問い方を変えた）ものを載せている。
 * 大学の過去問そのものではない。原問題の文章も図も使っていない。
 *
 * 答えは式を立て直して確かめたのではなく、$S_n$ と $a_n$ の関係だけから
 * 数列を直接作って突き合わせてある（一般項と $T_n$ の閉じた式を、
 * 定義どおりに足し上げた値と $n=24$ まで照合）。
 *
 * 配点・採点基準は**本模試のもの**で、大学が公表しているものではない。
 */

export const sampleMeta = {
  field: "数列",
  /** この1題の配点。模試全体の配点ではない */
  points: 20,
  /** 本番で想定している解答時間の目安 */
  minutes: 25,
  note: "既刊「合格答案をつくる」シリーズの予想問題を作り替えた見本です。大学の過去問そのものではありません。",
};

export type SampleSub = {
  label: string;
  task: string;
  answer: string;
  blocks: Block[];
  /** この小問の配点 */
  points: number;
  /** 何に点が付くか */
  gain: string[];
  /** どこで引かれるか */
  lose: string[];
};

export const sampleLead = String.raw`数列 $\{a_n\}$ の初項から第 $n$ 項までの和を $S_n$ とする。すべての自然数 $n$ に対して`;

export const sampleCondition = String.raw`S_n = 2a_n - 3n`;

export const sampleTail = "が成り立つとする。";

export const sampleSubs: SampleSub[] = [
  {
    label: "(1)",
    task: String.raw`$a_1,\ a_2,\ a_3$ を求めよ。`,
    answer: String.raw`$a_1=3,\quad a_2=9,\quad a_3=21$`,
    points: 4,
    blocks: [
      {
        k: "p",
        t: String.raw`$n=1$ のとき $S_1=a_1$ だから、与えられた関係式は $a_1=2a_1-3$ となり $a_1=3$。`,
      },
      {
        k: "p",
        t: String.raw`$n=2$ のとき $S_2=a_1+a_2$ だから $3+a_2=2a_2-6$ となり $a_2=9$。同様に $n=3$ では $3+9+a_3=2a_3-9$ となり $a_3=21$。`,
      },
    ],
    gain: [
      "$S_1=a_1$ を使って $a_1$ を出している",
      "$S_2,\\ S_3$ を前の項の和として書き直している",
      "3つとも正しい",
    ],
    lose: [
      "$a_1$ を求めずに $a_2$ から書き始めている",
      "答えだけで、どの $n$ を代入したかが読み取れない",
    ],
  },
  {
    label: "(2)",
    task: String.raw`$a_{n+1}$ を $a_n$ を用いて表し、一般項 $a_n$ を求めよ。`,
    answer: String.raw`$a_{n+1}=2a_n+3$、$\ a_n=3\left(2^{n}-1\right)$`,
    points: 8,
    blocks: [
      {
        k: "p",
        t: String.raw`$a_{n+1}=S_{n+1}-S_n$ である。与えられた関係式を $n+1$ と $n$ で書いて差をとると`,
      },
      {
        k: "math",
        t: String.raw`a_{n+1}=\left\{2a_{n+1}-3(n+1)\right\}-\left(2a_n-3n\right)=2a_{n+1}-2a_n-3`,
      },
      {
        k: "p",
        t: String.raw`整理して $a_{n+1}=2a_n+3$ を得る。これは $n\ge1$ で成り立つ。`,
      },
      {
        k: "p",
        t: String.raw`両辺に $3$ を足すと $a_{n+1}+3=2\left(a_n+3\right)$ となるので、数列 $\{a_n+3\}$ は公比 $2$ の等比数列である。初項は $a_1+3=6$ だから`,
      },
      {
        k: "math",
        t: String.raw`a_n+3=6\cdot2^{\,n-1}=3\cdot2^{\,n}\qquad\text{よって}\qquad a_n=3\left(2^{\,n}-1\right)`,
      },
      {
        k: "note",
        t: String.raw`$n=1,2,3$ を入れると $3,\ 9,\ 21$ となり、(1) で求めた値と合う。漸化式を立てたあとは、必ず最初の数項で確かめておきたい。`,
      },
    ],
    gain: [
      "$a_{n+1}=S_{n+1}-S_n$ を使うと述べている",
      "差をとって $a_{n+1}=2a_n+3$ まで整理できている",
      "$a_n+3$ が等比数列になることを使い、初項を $a_1+3=6$ と正しく取っている",
      "一般項が合っている",
    ],
    lose: [
      "$a_n=S_n-S_{n-1}$ を $n\\ge2$ の断りなしに $n=1$ でも使っている",
      "等比数列の初項を $a_1=3$ としてしまい、$+3$ の分だけずれている",
      "漸化式は出せたが、一般項まで解ききれていない",
    ],
  },
  {
    label: "(3)",
    task: String.raw`$\displaystyle T_n=\sum_{k=1}^{n}k\,a_k$ を $n$ を用いて表せ。`,
    answer: String.raw`$T_n=3(n-1)\cdot2^{\,n+1}+6-\dfrac{3n(n+1)}{2}$`,
    points: 8,
    blocks: [
      {
        k: "p",
        t: String.raw`(2) より $k\,a_k=3k\cdot2^{\,k}-3k$ だから`,
      },
      {
        k: "math",
        t: String.raw`T_n=3\sum_{k=1}^{n}k\cdot2^{\,k}-3\sum_{k=1}^{n}k`,
      },
      {
        k: "p",
        t: String.raw`後ろの和は $\dfrac{n(n+1)}{2}$ である。前の和を $U_n=\displaystyle\sum_{k=1}^{n}k\cdot2^{\,k}$ とおき、$2$ 倍してずらして引く。`,
      },
      {
        k: "math",
        t: String.raw`U_n-2U_n=2+\sum_{k=2}^{n}2^{\,k}-n\cdot2^{\,n+1}=2+\left(2^{\,n+1}-4\right)-n\cdot2^{\,n+1}`,
      },
      {
        k: "p",
        t: String.raw`左辺は $-U_n$ だから $U_n=(n-1)\cdot2^{\,n+1}+2$ となる。したがって`,
      },
      {
        k: "math",
        t: String.raw`T_n=3\left\{(n-1)\cdot2^{\,n+1}+2\right\}-\frac{3n(n+1)}{2}=3(n-1)\cdot2^{\,n+1}+6-\frac{3n(n+1)}{2}`,
      },
      {
        k: "note",
        t: String.raw`$n=1$ では $T_1=1\cdot a_1=3$ で、式の値も $0+6-3=3$。$n=2$ では $3+2\cdot9=21$ で、式の値も $24+6-9=21$。`,
      },
    ],
    gain: [
      "$k\\,a_k$ を $2$ つの和に分けている",
      "$\\sum_{k=1}^{n}k\\cdot2^{\\,k}$ をずらして引く方法で正しく求めている",
      "$\\sum_{k=1}^{n}k=\\dfrac{n(n+1)}{2}$ を使っている",
      "最後まで $n$ の式にまとめきっている",
    ],
    lose: [
      "ずらして引くときに、両端の項（$k=1$ の分と $k=n+1$ の分）の扱いを誤っている",
      "$U_n$ までは出せたが、$T_n$ に戻すときの係数 $3$ を落としている",
      "$n=1$ などで確かめておらず、符号の誤りがそのまま残っている",
    ],
  },
];
