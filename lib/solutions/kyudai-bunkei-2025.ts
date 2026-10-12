import { kyudaiRikei2025 } from "@/lib/solutions/kyudai-rikei-2025";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2025年度（令和7年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 九州大学はこの年度の問題を公開しているので、そのページへリンクしている。
 *
 * 文科系の第3問は理科系の第3問、第4問は理科系の第5問とまったく同じ問題だった。
 * 同じ解説を2通り書くと必ず食い違うので、理科系の側を1つの正本として持ち、
 * ここでは番号だけ差し替えて使い回す。
 */

const rikei = (no: number) => kyudaiRikei2025.questions.find((q) => q.no === no)!;

/** 理科系 第3問と共通の出題（整数）。番号はそのまま第3問。 */
const sharedSeisu: Question = { ...rikei(3) };
/** 理科系 第5問と共通の出題（確率）。番号だけ文科系のものに付け替える。 */
const sharedKakuritsu: Question = { ...rikei(5), no: 4 };

/** 第1問の2曲線。 */
const CB25 = (x: number): number => x ** 3 + x * x - x - 1;
const PB25 = (x: number): number => x * x;

export const kyudaiBunkei2025: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["共通接線", "接線の方程式", "4次方程式", "因数分解"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$t$ を $-4$ から $4$ まで $80$ 万点に刻んで、3次曲線の接線が放物線にも接する条件 $b+\\frac{m^{2}}4=0$ をみたす $t$ を探すと $t=\\pm1$ の2つだけだった",
          "$9t^{4}+4t^{3}-6t^{2}-4t-3=(t-1)(t+1)\\left(9t^{2}+4t+3\\right)$ で、$9t^{2}+4t+3$ の判別式が $-92<0$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`2つの曲線 $y=x^{3}+x^{2}-x-1$、$y=x^{2}$ の両方に接するすべての直線の方程式を求める`,
          answer: String.raw`$y=0$ と $y=4x-4$`,
          approach: String.raw`放物線 $y=x^{2}$ に接する直線は、傾きを $m$ とすると $y=mx-\dfrac{m^{2}}4$ の形に限られる。これと「3次曲線の接線」が一致する条件を $t$（3次曲線の接点）の式にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**放物線の接線。** $y=x^{2}$ の $x=s$ での接線は $y=2sx-s^{2}$ である。傾きを $m=2s$ とおくと $s=\dfrac m2$ で`,
            },
            { k: "math", t: String.raw`y=mx-\frac{m^{2}}4` },
            {
              k: "p",
              t: String.raw`となる。つまり「傾き $m$、$y$ 切片 $b$ の直線が $y=x^{2}$ に接する」$\Longleftrightarrow$ $b=-\dfrac{m^{2}}4$ である。`,
            },
            {
              k: "p",
              t: String.raw`**3次曲線の接線。** $f(x)=x^{3}+x^{2}-x-1$、$f'(x)=3x^{2}+2x-1$ である。$x=t$ での接線は $y=f(t)+f'(t)(x-t)$ で、`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
m&=f'(t)=3t^{2}+2t-1\\[1mm]
b&=f(t)-t\,f'(t)=\left(t^{3}+t^{2}-t-1\right)-t\left(3t^{2}+2t-1\right)=-2t^{3}-t^{2}-1
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**条件を立てる。** $b=-\dfrac{m^{2}}4$ に代入して` },
            {
              k: "math",
              t: String.raw`-2t^{3}-t^{2}-1=-\frac{\left(3t^{2}+2t-1\right)^{2}}4`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`4\left(2t^{3}+t^{2}+1\right)=\left(3t^{2}+2t-1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。右辺を展開すると` },
            {
              k: "math",
              t: String.raw`9t^{4}+12t^{3}-2t^{2}-4t+1`,
            },
            { k: "p", t: String.raw`なので、移項して整理すると` },
            {
              k: "math",
              t: String.raw`9t^{4}+4t^{3}-6t^{2}-4t-3=0`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "p",
              t: String.raw`**解く。** $t=1$ を代入すると $9+4-6-4-3=0$ で成り立つ。$t=-1$ でも $9-4-6+4-3=0$ で成り立つ。よって $(t-1)(t+1)=t^{2}-1$ で割れて`,
            },
            {
              k: "math",
              t: String.raw`9t^{4}+4t^{3}-6t^{2}-4t-3=\left(t-1\right)\left(t+1\right)\left(9t^{2}+4t+3\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$9t^{2}+4t+3$ の判別式は $16-108=-92<0$ なので実数解をもたない。したがって $t=\pm1$ だけである。`,
            },
            { k: "p", t: String.raw`**接線を書く。** ` },
            {
              k: "steps",
              items: [
                String.raw`$t=1$：$m=3+2-1=4$、$b=-2-1-1=-4$。直線 $y=4x-4$`,
                String.raw`$t=-1$：$m=3-2-1=0$、$b=2-1-1=0$。直線 $y=0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。それぞれ放物線との接点は $x=\dfrac m2$、すなわち $x=2$ と $x=0$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`3次曲線 $y=x^{3}+x^{2}-x-1$（$x=-1$ で重解をもち、そこで $x$ 軸に接する）と放物線 $y=x^{2}$、そして2本の共通接線 $y=0$、$y=4x-4$。$y=0$ は3次曲線に $(-1,0)$ で、放物線に $(0,0)$ で接する。$y=4x-4$ は3次曲線に $(1,0)$ で、放物線に $(2,4)$ で接する。`,
                view: [-2.6, 3.4, -2.6, 5.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: CB25, from: -2.4, to: 1.9 },
                  { k: "curve", f: PB25, from: -2.3, to: 2.3 },
                  { k: "seg", a: [-2.6, 0], b: [3.4, 0], dash: true },
                  { k: "seg", a: [-0.2, 4 * -0.2 - 4], b: [2.35, 4 * 2.35 - 4], dash: true },
                  { k: "dot", at: [-1, 0], label: "(-1, 0)", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [2, 4], label: "(2, 4)", place: "right" },
                  { k: "dot", at: [0, 0], label: "", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`放物線の接線は「$b=-\frac{m^{2}}4$」の1本の式にまとまる。接点 $s$ を残したまま2変数で連立すると手間が増える。`,
            String.raw`「両方に接する」なので、3次曲線とは接するが放物線とはただ交わるだけ、という直線は数えない。`,
            String.raw`$t=\pm1$ がすぐ見つかる。$f(x)=x^{3}+x^{2}-x-1=(x-1)(x+1)^{2}$ と因数分解できるので、$x=\pm1$ は $x$ 軸との交点である。`,
            String.raw`$9t^{2}+4t+3$ が実数解をもたないことまで言って、「これですべて」と締める。`,
          ],
          check: String.raw`$t$ を $-4$ から $4$ まで $80$ 万点に刻んで $b+\frac{m^{2}}4=0$ となる $t$ を探すと $t=1,-1$ の2つだけだった。得られた2直線は、どちらも3次曲線と放物線の両方に接していた。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形",
      topics: ["中線定理", "円周上の点", "最大値", "内積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "中心角 $120^\\circ$ の2点をとると $\\mathrm{AB}=1.732050808=\\sqrt3$ になることを確かめた",
          "$\\mathrm{P}$ を円周上 $20$ 万点に動かして $\\mathrm{AP}^{2}+\\mathrm{BP}^{2}$ を計算すると、最大は $6.000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`半径 $1$ の円周 $C$ 上の2点 $\mathrm{A},\mathrm{B}$ が $\mathrm{AB}=\sqrt3$ をみたすとき、$\mathrm{P}$ が $C$ 上を動くときの $\mathrm{AP}^{2}+\mathrm{BP}^{2}$ の最大値を求める`,
          answer: String.raw`$6$`,
          approach: String.raw`$\mathrm{AB}$ の中点を $\mathrm{M}$ とすると、中線定理から $\mathrm{AP}^{2}+\mathrm{BP}^{2}=2\mathrm{PM}^{2}+\dfrac{\mathrm{AB}^{2}}2$ となる。あとは $\mathrm{PM}$ の最大を求めるだけである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`円の中心を $\mathrm{O}$、$\mathrm{AB}$ の中点を $\mathrm{M}$ とする。`,
            },
            {
              k: "p",
              t: String.raw`**中線定理。** 三角形 $\mathrm{ABP}$ で $\mathrm{M}$ が $\mathrm{AB}$ の中点だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}+\mathrm{BP}^{2}=2\,\mathrm{PM}^{2}+\frac{\mathrm{AB}^{2}}2=2\,\mathrm{PM}^{2}+\frac32`,
            },
            { k: "p", t: String.raw`である（$\mathrm{P}$ が直線 $\mathrm{AB}$ 上にあっても成り立つ）。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{OM}$ の長さ。** $\mathrm{OM}\perp\mathrm{AB}$ で、$\mathrm{AM}=\dfrac{\sqrt3}2$、$\mathrm{OA}=1$ だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{OM}=\sqrt{1-\frac34}=\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{PM}$ の最大。** $\mathrm{P}$ は $\mathrm{O}$ を中心とする半径 $1$ の円周上を動くので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{PM}\le\mathrm{PO}+\mathrm{OM}=1+\frac12=\frac32`,
            },
            {
              k: "p",
              t: String.raw`で、等号は $\mathrm{P}$ が半直線 $\mathrm{MO}$ の延長と円の交点にあるとき（$\mathrm{M}$ から見て $\mathrm{O}$ の向こう側）に成り立つ。したがって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}+\mathrm{BP}^{2}\le2\cdot\frac94+\frac32=\frac92+\frac32=6`,
            },
            { k: "p", t: String.raw`で、最大値は $6$ である。` },
            {
              k: "note",
              t: String.raw`ベクトルでも同じことができる。$\mathrm{O}$ を原点として$\mathrm{AP}^{2}+\mathrm{BP}^{2}=\left|\vec p-\vec a\right|^{2}+\left|\vec p-\vec b\right|^{2}=4-2\,\vec p\cdot\left(\vec a+\vec b\right)$であり、$\mathrm{AB}^{2}=3$ から $\vec a\cdot\vec b=-\dfrac12$、$\left|\vec a+\vec b\right|=1$ が出る。$\vec p$ が $\vec a+\vec b$ と逆向きのとき最大で $4+2=6$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`半径 $1$ の円周上に $\mathrm{AB}=\sqrt3$（中心角 $120^\circ$）となる $\mathrm{A},\mathrm{B}$ をとる。$\mathrm{M}$ は $\mathrm{AB}$ の中点で $\mathrm{OM}=\frac12$。$\mathrm{PM}$ が最大 $\frac32$ になるのは、$\mathrm{P}$ が $\mathrm{M}$ の反対側の端にあるときで、そのとき $\mathrm{AP}^{2}+\mathrm{BP}^{2}=6$。`,
                view: [-1.9, 1.9, -1.35, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (u: number): [number, number] => [Math.cos(u), Math.sin(u)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0.5, Math.sqrt(3) / 2], b: [0.5, -Math.sqrt(3) / 2] },
                  { k: "seg", a: [-1, 0], b: [0.5, Math.sqrt(3) / 2] },
                  { k: "seg", a: [-1, 0], b: [0.5, -Math.sqrt(3) / 2] },
                  { k: "seg", a: [-1, 0], b: [0.5, 0], dash: true },
                  { k: "dot", at: [0.5, Math.sqrt(3) / 2], label: "A", place: "above-right" },
                  { k: "dot", at: [0.5, -Math.sqrt(3) / 2], label: "B", place: "below-right" },
                  { k: "dot", at: [0.5, 0], label: "M", place: "right" },
                  { k: "dot", at: [0, 0], label: "O", place: "above" },
                  { k: "dot", at: [-1, 0], label: "P", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`中線定理 $\mathrm{AP}^{2}+\mathrm{BP}^{2}=2\mathrm{PM}^{2}+\frac{\mathrm{AB}^{2}}2$ の $\frac{\mathrm{AB}^{2}}2$ を忘れない。$\mathrm{AB}^{2}=3$ なので $\frac32$ である。`,
            String.raw`$\mathrm{PM}$ の最大は $\mathrm{PO}+\mathrm{OM}$ である。$\mathrm{P}$ は円周上なので $\mathrm{PO}=1$ に固定される。`,
            String.raw`$\mathrm{AB}=\sqrt3$ は中心角 $120^\circ$ に当たる（$2\sin60^\circ=\sqrt3$）。$\mathrm{OM}=\cos60^\circ=\frac12$ と見てもよい。`,
          ],
          check: String.raw`中心角 $120^\circ$ の2点をとると $\mathrm{AB}=1.732050808=\sqrt3$ で、$\mathrm{P}$ を円周上 $20$ 万点に動かすと $\mathrm{AP}^{2}+\mathrm{BP}^{2}$ の最大は $6.000000$ だった。`,
        },
      ],
    },
    sharedSeisu,
    sharedKakuritsu,
  ],
};
