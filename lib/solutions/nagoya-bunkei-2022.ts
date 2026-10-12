import { nagoyaRikei2022 } from "@/lib/solutions/nagoya-rikei-2022";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2022年度（令和4年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子を理科系・文科系の両方で突き合わせたところ、
 * **文科系の第1問・第2問は、理科系の第1問・第2問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理科系の側から借りる。第3問だけが文科系独自の問題である。
 *
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => nagoyaRikei2022.questions.find((q) => q.no === no)!;

/** 理科系 第1問（整式の剰余）。文科系の第1問とまったく同じ問題。 */
const sharedSeishiki: Question = { ...rikei(1), no: 1 };

/** 理科系 第2問（サイコロ）。文科系の第2問とまったく同じ問題。 */
const sharedSaikoro: Question = { ...rikei(2), no: 2 };

/** 第3問の図。$a=\tfrac32,\ b=\tfrac92$（(3) で最大を与える値）の例。 */
const A22 = 1.5;
const B22 = 4.5;
const C1_22 = (x: number): number => (x * x) / 2;
const C2_22 = (x: number): number => -((x - A22) ** 2) + B22;
const RT22 = Math.sqrt(-2 * A22 * A22 + 6 * B22);
const AL22 = (4 * A22 - 2 * RT22) / 6;
const BE22 = (4 * A22 + 2 * RT22) / 6;

export const nagoyaBunkei2022: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    sharedSeishiki,
    sharedSaikoro,
    {
      no: 3,
      field: "2次関数・積分法",
      topics: ["2次方程式の判別式", "1/6公式", "解の差", "2次関数の最大"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)$ を6通りとり、$-2a^{2}+6b>0$ かどうかが交点2個かどうかと一致することを確かめた",
          "同じ $(a,b)$ で面積をシンプソン法で数値積分すると $\\dfrac{4\\sqrt2}{27}\\left(3b-a^{2}\\right)^{3/2}$ と小数10桁まで一致した",
          "$3b-a^{2}=18$ となる $(a,b)$ を4通り試すと、いずれも面積がちょうど $16.0000000000$ になった",
          "$b=a+3$ の上で $a$ を $10^{-5}$ 刻みに動かすと、$S$ の最大は $a=1.5,\\ b=4.5$ での $7.905694150$ で、$\\dfrac{5\\sqrt{10}}{2}=7.905694150$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b$ を実数とし、$C_{1}\colon y=\tfrac12x^{2}$、$C_{2}\colon y=-\left(x-a\right)^{2}+b$ とするとき、$C_{1}$ と $C_{2}$ が異なる2点で交わるための $a,b$ の条件を求める`,
          answer: String.raw`$b>\dfrac{a^{2}}{3}$`,
          approach: String.raw`2式を連立して $x$ の2次方程式にし、判別式が正であればよい。$x^{2}$ の係数がそろわないので、係数を整数にしてから判別式を取ると計算が軽い。`,
          blocks: [
            { k: "p", t: String.raw`$y$ を消去すると` },
            { k: "math", t: String.raw`\frac{1}{2}x^{2}=-\left(x-a\right)^{2}+b` },
            { k: "p", t: String.raw`で、整理して両辺を2倍すると` },
            { k: "math", t: String.raw`3x^{2}-4ax+2\left(a^{2}-b\right)=0\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`となる。$x$ が決まれば交点は1つに決まるので、異なる2点で交わるのは ① が異なる2つの実数解をもつときである。判別式を4で割ったものは` },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=\left(2a\right)^{2}-3\cdot2\left(a^{2}-b\right)=4a^{2}-6a^{2}+6b=-2a^{2}+6b`,
            },
            { k: "p", t: String.raw`なので、条件は $-2a^{2}+6b>0$、すなわち` },
            { k: "math", t: String.raw`b>\frac{a^{2}}{3}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\tfrac12x^{2}$ のまま判別式を取ると分数が残る。両辺を2倍して整数係数にしてから進める。`,
          ],
          check: String.raw`$(a,b)=(3,2)$ では $-2\cdot9+12=-6<0$ で交点がなく、$(a,b)=(2,3)$ では $-8+18=10>0$ で交点が2つあった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C_{1}$ と $C_{2}$ で囲まれた図形の面積を $S$ とするとき、$S=16$ となるための $a,b$ の条件を求める`,
          answer: String.raw`$3b-a^{2}=18$（すなわち $b=\dfrac{a^{2}}{3}+6$）`,
          approach: String.raw`$S$ は2曲線の差の積分で、差は $x^{2}$ の係数が $-\tfrac32$ の2次式になる。いわゆる $\tfrac16$ 公式 $\displaystyle\int_{\alpha}^{\beta}\left|k\left(x-\alpha\right)\left(x-\beta\right)\right|dx=\frac{\left|k\right|}{6}\left(\beta-\alpha\right)^{3}$ を使えば、解の差だけ分かればよい。`,
          blocks: [
            { k: "p", t: String.raw`① の2解を $\alpha<\beta$ とする。$\alpha\leqq x\leqq\beta$ では $C_{2}$ が上なので` },
            {
              k: "math",
              t: String.raw`S=\int_{\alpha}^{\beta}\left\{\left(-\left(x-a\right)^{2}+b\right)-\frac{1}{2}x^{2}\right\}dx`,
            },
            { k: "p", t: String.raw`である。被積分関数は ① の左辺の $-\tfrac12$ 倍なので` },
            {
              k: "math",
              t: String.raw`\left(-\left(x-a\right)^{2}+b\right)-\frac{1}{2}x^{2}=-\frac{3}{2}\left(x-\alpha\right)\left(x-\beta\right)`,
            },
            { k: "p", t: String.raw`と書ける。$\tfrac16$ 公式から` },
            {
              k: "math",
              t: String.raw`S=\frac{3}{2}\cdot\frac{\left(\beta-\alpha\right)^{3}}{6}=\frac{\left(\beta-\alpha\right)^{3}}{4}`,
            },
            { k: "p", t: String.raw`である。解と係数の関係から $\alpha+\beta=\dfrac{4a}{3}$、$\alpha\beta=\dfrac{2\left(a^{2}-b\right)}{3}$ なので` },
            {
              k: "math",
              t: String.raw`\left(\beta-\alpha\right)^{2}=\frac{16a^{2}}{9}-\frac{8\left(a^{2}-b\right)}{3}=\frac{16a^{2}-24a^{2}+24b}{9}=\frac{8\left(3b-a^{2}\right)}{9}`,
            },
            { k: "p", t: String.raw`である。$u=3b-a^{2}$ とおくと (1) の条件は $u>0$ で` },
            {
              k: "math",
              t: String.raw`\beta-\alpha=\frac{2\sqrt{2}}{3}\sqrt{u},\qquad\left(\beta-\alpha\right)^{3}=\frac{16\sqrt{2}}{27}u^{\frac{3}{2}}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`S=\frac{4\sqrt{2}}{27}\left(3b-a^{2}\right)^{\frac{3}{2}}\qquad\cdots\text{②}`,
            },
            { k: "p", t: String.raw`である。$S=16$ とすると` },
            {
              k: "math",
              t: String.raw`u^{\frac{3}{2}}=16\cdot\frac{27}{4\sqrt{2}}=\frac{108}{\sqrt{2}}=54\sqrt{2}`,
            },
            { k: "p", t: String.raw`で、両辺を2乗して` },
            {
              k: "math",
              t: String.raw`u^{3}=\left(54\sqrt{2}\right)^{2}=2916\cdot2=5832=18^{3}`,
            },
            { k: "p", t: String.raw`である。$u>0$ より $u=18$、すなわち` },
            { k: "math", t: String.raw`3b-a^{2}=18\qquad\left(b=\frac{a^{2}}{3}+6\right)` },
            {
              k: "p",
              t: String.raw`が条件である（このとき $b=\dfrac{a^{2}}{3}+6>\dfrac{a^{2}}{3}$ なので (1) の条件も満たしている）。`,
            },
          ],
          pitfalls: [
            String.raw`$\tfrac16$ 公式の $k$ は $x^{2}$ の係数の絶対値。ここでは $\tfrac32$ であって $1$ でも $\tfrac12$ でもない。`,
            String.raw`$u^{3}=5832$ から $u=18$ を出すには $18^{3}=5832$ に気づく。$5832=8\cdot729=2^{3}\cdot3^{6}$ と素因数分解すれば $u=2\cdot3^{2}=18$ と分かる。`,
          ],
          check: String.raw`$3b-a^{2}=18$ となる $(a,b)=(0,6),(1,\tfrac{19}{3}),(-2.5,\tfrac{97}{12}),(3,9)$ のどれでも、数値積分した面積がちょうど $16.0000000000$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a,b$ が $b\leqq a+3$ を満たすとき、$S$ の最大値を求める`,
          answer: String.raw`$\dfrac{5\sqrt{10}}{2}$（$a=\dfrac32,\ b=\dfrac92$ のとき）`,
          approach: String.raw`② より $S$ は $u=3b-a^{2}$ の増加関数なので、$u$ を最大にすればよい。$b\leqq a+3$ を使うと $u$ は $a$ の2次式で上から押さえられ、平方完成で終わる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "S が最大になる a = 3/2, b = 9/2 のとき。C1 は下に凸、C2 は上に凸で、網かけが囲む部分。交点の x 座標は 1 ± √10/2。",
                view: [-2.2, 5.0, -0.8, 5.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: C2_22, bottom: C1_22, from: AL22, to: BE22 },
                  { k: "curve", f: C1_22, from: -2.2, to: 3.22 },
                  { k: "curve", f: C2_22, from: -0.8, to: 3.8 },
                  { k: "dot", at: [AL22, C1_22(AL22)], label: "交点", place: "above-left" },
                  { k: "dot", at: [BE22, C1_22(BE22)], label: "交点", place: "right" },
                  { k: "dot", at: [A22, B22], label: "(a, b)", place: "above-right" },
                  { k: "text", at: [3.1, 4.8], label: "C₁", place: "right" },
                  { k: "text", at: [3.7, 0.66], label: "C₂", place: "right" },
                ],
              },
            },
            { k: "p", t: String.raw`$u=3b-a^{2}$ とおく。② より` },
            { k: "math", t: String.raw`S=\frac{4\sqrt{2}}{27}u^{\frac{3}{2}}` },
            { k: "p", t: String.raw`で、これは $u>0$ の範囲で $u$ について増加する。よって $u$ の最大を求めればよい。` },
            { k: "p", t: String.raw`$b\leqq a+3$ より $3b\leqq3a+9$ だから` },
            {
              k: "math",
              t: String.raw`u=3b-a^{2}\leqq3a+9-a^{2}=-\left(a-\frac{3}{2}\right)^{2}+\frac{45}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。右辺は $a=\dfrac32$ のとき最大値 $\dfrac{45}{4}$ をとり、そのとき等号が成り立つのは $b=a+3=\dfrac92$ のときである。この $(a,b)$ は $u=\dfrac{45}{4}>0$ なので (1) の条件も満たす。`,
            },
            { k: "p", t: String.raw`よって $u$ の最大値は $\dfrac{45}{4}$ で、そのときの $S$ は` },
            {
              k: "math",
              t: String.raw`S=\frac{4\sqrt{2}}{27}\left(\frac{45}{4}\right)^{\frac{3}{2}}=\frac{4\sqrt{2}}{27}\cdot\frac{45\sqrt{45}}{8}=\frac{4\sqrt{2}}{27}\cdot\frac{135\sqrt{5}}{8}`,
            },
            { k: "p", t: String.raw`である（$\sqrt{45}=3\sqrt5$ より $45\sqrt{45}=135\sqrt5$）。整理すると` },
            {
              k: "math",
              t: String.raw`S=\frac{540\sqrt{10}}{216}=\frac{5\sqrt{10}}{2}`,
            },
            { k: "p", t: String.raw`である。数値では $7.9057\cdots$ である。` },
          ],
          pitfalls: [
            String.raw`$S$ を $a,b$ の2変数で直接扱わない。$u=3b-a^{2}$ ひとつにまとめてしまえば1変数の最大問題になる。`,
            String.raw`$b\leqq a+3$ は不等式なので、$u$ を最大にするには $b$ を上限 $a+3$ まで上げる。そのうえで $a$ を動かす。`,
            String.raw`$\left(\tfrac{45}{4}\right)^{3/2}=\dfrac{45^{3/2}}{8}$。分母の $4$ も $\tfrac32$ 乗する。`,
          ],
          check: String.raw`$b=a+3$ の上で $a$ を $10^{-5}$ 刻みに動かすと、$S$ の最大は $a=1.50000$ での $7.905694150$ で、$\dfrac{5\sqrt{10}}{2}=7.905694150$ と一致した。$(a,b)=(1.5,4.5)$ で数値積分しても同じ値になった。`,
        },
      ],
    },
  ],
};
