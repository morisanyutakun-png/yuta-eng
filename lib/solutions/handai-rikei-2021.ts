import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2021年度（令和3年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。$y=\tfrac1x$ と点 $\mathrm{P}\left(\tfrac12,\tfrac32\right)$ からの2本の接線。 */
const INV21 = (x: number): number => 1 / x;
/** 第1問。$\left(a,b\right)=\left(1,\tfrac12\right)$ のときの2つの接点と、そこでの接線。 */
const SQ21 = 2 - Math.SQRT2;
const TQ21 = 2 + Math.SQRT2;
const TL21 = (x: number): number => -(x / (SQ21 * SQ21)) + 2 / SQ21;
const TR21 = (x: number): number => -(x / (TQ21 * TQ21)) + 2 / TQ21;

/** 第1問(2)。$ab=\tfrac94a-3a^{3}$。 */
const AB21 = (a: number): number => (9 / 4) * a - 3 * a * a * a;

/** 第3問。$t=1$ での $\log x$ と上下からの評価。 */
const LOG21 = (x: number): number => Math.log(x);
const UP21 = (x: number): number => x - 1;
const LO21 = (x: number): number => x - 1 - ((x - 1) * (x - 1)) / 2;

/** 第5問。$x-\tan x=\pi$ の $\left|x\right|<\tfrac{\pi}{2}$ での解 $x_{1}$。 */
function solveX21(n: number): number {
  let lo = -Math.PI / 2 + 1e-12;
  let hi = 0;
  for (let i = 0; i < 200; i += 1) {
    const m = (lo + hi) / 2;
    if (m - Math.tan(m) > n * Math.PI) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}
const T21 = solveX21(1);
const U21 = -T21 + 2 * Math.PI;
const M21 = Math.cos(T21);
const C21 = Math.sin(T21) - T21 * Math.cos(T21);
const TAN21 = (x: number): number => M21 * x + C21;

export const handaiRikei2021: SolutionSet = {
  slug: "handai-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・2次方程式",
      topics: ["曲線の接線", "2次方程式の2解", "3次関数の最大", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$ab<1$ をみたす $\\left(a,b\\right)$ を $2$ 万組とって $s,t$ の式を計算すると、どちらも接線が $\\mathrm{P}$ を通り、$0<s<t$ だった（違反 $0$ 件）",
          "$0<a<\\tfrac{\\sqrt3}{2}$ を $40$ 万等分して $\\tfrac ts$ を直接計算すると、最小 $3.000000000$ が $a=0.4999998$、$b=1.5000007$ で起き、そのとき $ab=0.750000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b$ を $ab<1$ をみたす正の実数とする。点 $\mathrm{P}\left(a,b\right)$ から曲線 $y=\dfrac1x$（$x>0$）に2本の接線を引き、接点を $\mathrm{Q}\left(s,\dfrac1s\right)$、$\mathrm{R}\left(t,\dfrac1t\right)$（$s<t$）とする。$s$ と $t$ を $a,b$ で表す`,
          answer: String.raw`$s=\dfrac{1-\sqrt{1-ab}}{b}$、$t=\dfrac{1+\sqrt{1-ab}}{b}$`,
          approach: String.raw`接点の $x$ 座標 $u$ がみたす2次方程式 $bu^{2}-2u+a=0$ を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=\dfrac1x$ のとき $y'=-\dfrac1{x^{2}}$ なので、$x=u$（$u>0$）における接線は`,
            },
            {
              k: "math",
              t: String.raw`y=\frac1u-\frac{1}{u^{2}}\left(x-u\right)=-\frac{x}{u^{2}}+\frac2u`,
            },
            { k: "p", t: String.raw`である。これが $\mathrm{P}\left(a,b\right)$ を通る条件は` },
            {
              k: "math",
              t: String.raw`b=-\frac{a}{u^{2}}+\frac2u,\qquad bu^{2}-2u+a=0\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$b>0$ なので $\left(\ast\right)$ は2次方程式で、判別式は`,
            },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=1-ab>0`,
            },
            {
              k: "p",
              t: String.raw`である。よって異なる2つの実数解をもつ。解と係数の関係から和は $\dfrac2b>0$、積は $\dfrac ab>0$ なので、2解はともに正であり、どちらも接点として使える。したがって2本の接線が引ける。`,
            },
            { k: "p", t: String.raw`$\left(\ast\right)$ を解くと` },
            {
              k: "math",
              t: String.raw`u=\frac{1\pm\sqrt{1-ab}}{b}`,
            },
            { k: "p", t: String.raw`であり、$s<t$ だから` },
            {
              k: "math",
              t: String.raw`s=\frac{1-\sqrt{1-ab}}{b},\qquad t=\frac{1+\sqrt{1-ab}}{b}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1、b = 1/2 のとき（ab = 1/2 < 1）。点 P から双曲線 y = 1/x に引いた 2 本の接線と、その接点 Q（s = 2 − √2 ≒ 0.586）、R（t = 2 + √2 ≒ 3.414）。",
                view: [-0.3, 4.4, -0.3, 3.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: INV21, from: 0.28, to: 4.4 },
                  { k: "seg", a: [0, TL21(0)], b: [1.25, TL21(1.25)] },
                  { k: "seg", a: [-0.3, TR21(-0.3)], b: [4.4, TR21(4.4)] },
                  { k: "dot", at: [1, 0.5], label: "P(a, b)", place: "below-left" },
                  { k: "dot", at: [SQ21, 1 / SQ21], label: "Q", place: "above-left" },
                  { k: "dot", at: [TQ21, 1 / TQ21], label: "R", place: "above-right" },
                  { k: "text", at: [4.3, TR21(4.3)], label: "y = 1/x", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x>0$ の枝だけを考えるので、2解がともに正であることを言う必要がある。和と積の符号で済む。`,
            String.raw`$ab<1$ は「接線が2本引ける」ための条件そのもの（$D>0$）である。これを導いておくと (2) の確認が楽になる。`,
          ],
          check: String.raw`$2$ 万組の $\left(a,b\right)$ で、$s,t$ から作った接線がどちらも $\mathrm{P}$ を通った。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{P}\left(a,b\right)$ が曲線 $y=\dfrac94-3x^{2}$ 上の $x>0$、$y>0$ をみたす部分を動くとき、$\dfrac ts$ の最小値とそのときの $a,b$ の値を求める`,
          answer: String.raw`最小値 $3$、$a=\dfrac12$、$b=\dfrac32$`,
          approach: String.raw`$k=\sqrt{1-ab}$ とおくと $\dfrac ts=\dfrac{1+k}{1-k}$ は $k$ の増加関数。$k$ を最小にする、つまり $ab$ を最大にする。`,
          blocks: [
            { k: "p", t: String.raw`(1) より、$k=\sqrt{1-ab}$ とおくと $0<k<1$ であり` },
            {
              k: "math",
              t: String.raw`\frac ts=\frac{1+k}{1-k}=\frac{2}{1-k}-1`,
            },
            {
              k: "p",
              t: String.raw`である。$0<k<1$ で $\dfrac{2}{1-k}$ は増加関数なので、$\dfrac ts$ は $k$ について増加する。つまり`,
            },
            {
              k: "math",
              t: String.raw`\frac ts\ \text{が最小}\iff k\ \text{が最小}\iff ab\ \text{が最大}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ の条件は $a>0$ かつ $b=\dfrac94-3a^{2}>0$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`0<a<\frac{\sqrt3}{2}`,
            },
            { k: "p", t: String.raw`である。このとき` },
            {
              k: "math",
              t: String.raw`g\left(a\right)=ab=a\left(\frac94-3a^{2}\right)=\frac94a-3a^{3}`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`g'\left(a\right)=\frac94-9a^{2}=9\left(\frac12-a\right)\left(\frac12+a\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0<a<\dfrac{\sqrt3}{2}$ では $\dfrac12+a>0$ なので、$g'$ の符号は $\dfrac12-a$ と同じである。よって $g$ は $0<a<\dfrac12$ で増加、$\dfrac12<a<\dfrac{\sqrt3}{2}$ で減少し、$a=\dfrac12$ で最大になる。その値は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac12\right)=\frac98-\frac38=\frac34`,
            },
            {
              k: "p",
              t: String.raw`である。$ab$ の最大値 $\dfrac34$ は $1$ より小さいので、$\mathrm{P}$ はつねに $ab<1$ をみたし、どの位置でも接線が2本引ける。`,
            },
            { k: "p", t: String.raw`このとき` },
            {
              k: "math",
              t: String.raw`k=\sqrt{1-\frac34}=\frac12,\qquad\frac ts=\frac{1+\tfrac12}{1-\tfrac12}=3`,
            },
            { k: "p", t: String.raw`であり、$b=\dfrac94-3\cdot\dfrac14=\dfrac32$ である。よって` },
            {
              k: "math",
              t: String.raw`\frac ts\ \text{の最小値は}\ 3\quad\left(a=\frac12,\ b=\frac32\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "ab = (9/4)a - 3a³ のグラフ（0 < a < √3/2 の部分）。a = 1/2 で最大値 3/4 をとる。ab が大きいほど k = √(1-ab) が小さく、t/s も小さくなる。",
                view: [-0.12, 1.15, -0.15, 0.9],
                step: { x: 0.25, y: 0.25 },
                items: [
                  { k: "curve", f: AB21, from: 0, to: Math.sqrt(3) / 2 },
                  { k: "seg", a: [0, 0.75], b: [0.5, 0.75], dash: true },
                  { k: "seg", a: [0.5, 0], b: [0.5, 0.75], dash: true },
                  { k: "dot", at: [0.5, 0.75], label: "最大 3/4", place: "above-right" },
                  {
                    k: "dot",
                    at: [Math.sqrt(3) / 2, 0],
                    label: "a = √3/2",
                    place: "below-left",
                  },
                ],
              },
            },
          ],
          alts: [
            {
              title: "対称式から $\\dfrac ts$ を直接見る",
              blocks: [
                {
                  k: "p",
                  t: String.raw`解と係数の関係より $s+t=\dfrac2b$、$st=\dfrac ab$ なので`,
                },
                {
                  k: "math",
                  t: String.raw`\frac{\left(s+t\right)^{2}}{st}=\frac{4/b^{2}}{a/b}=\frac{4}{ab}`,
                },
                {
                  k: "p",
                  t: String.raw`である。左辺は $r=\dfrac ts>1$ を使うと $\dfrac{\left(s+t\right)^{2}}{st}=\dfrac st+2+\dfrac ts=r+\dfrac1r+2$ と書ける。よって`,
                },
                {
                  k: "math",
                  t: String.raw`r+\frac1r+2=\frac{4}{ab}`,
                },
                {
                  k: "p",
                  t: String.raw`である。$r>1$ では $r+\dfrac1r$ は $r$ の増加関数なので、$r$ が最小 $\iff$ $ab$ が最大である。$ab$ の最大値 $\dfrac34$ を入れると $r+\dfrac1r+2=\dfrac{16}{3}$、$3r^{2}-10r+3=0$、$\left(3r-1\right)\left(r-3\right)=0$ となり、$r>1$ より $r=3$ である。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$y>0$ の条件を落とすと $a$ の範囲が $\left(0,\infty\right)$ になり、$ab$ がいくらでも負に大きくなって最大が取れなくなる。`,
            String.raw`$\dfrac ts$ を $a,b$ の式のまま2変数で扱うと手間が増える。$ab$ という1つの量だけで決まることに気づくのが要点。`,
          ],
          check: String.raw`$40$ 万等分の走査で最小 $3.000000000$（$a=0.4999998$、$b=1.5000007$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["空間ベクトル", "共面条件", "内分点", "内積と角"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "同一平面上にない $\\mathrm{O},\\mathrm{A},\\mathrm{B},\\mathrm{C}$ を $2$ 万組無作為にとり、$t=\\tfrac{2s}{s+1}$ とすると、$\\mathrm{A}_{0},\\mathrm{B}_{0},\\mathrm{P},\\mathrm{Q}$ の張る行列式がつねに $0$ になった（違反 $0$ 件）",
          "(2) の条件をみたす座標を作って $\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OQ}}=0$ を $0<s<1$ で数値的に解くと、解は $s=0.200001$ の1つだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`空間内に同一平面上にない4点 $\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ がある。$0<s<1$、$0<t<1$ とし、$\mathrm{OA}$ を $1:1$ に内分する点を $\mathrm{A}_{0}$、$\mathrm{OB}$ を $1:2$ に内分する点を $\mathrm{B}_{0}$、$\mathrm{AC}$ を $s:\left(1-s\right)$ に内分する点を $\mathrm{P}$、$\mathrm{BC}$ を $t:\left(1-t\right)$ に内分する点を $\mathrm{Q}$ とする。$\mathrm{A}_{0},\mathrm{B}_{0},\mathrm{P},\mathrm{Q}$ が同一平面上にあるとき、$t$ を $s$ で表す`,
          answer: String.raw`$t=\dfrac{2s}{s+1}$`,
          approach: String.raw`$\vec a,\vec b,\vec c$ を基底にとり、$\overrightarrow{\mathrm{A}_{0}\mathrm{Q}}=\alpha\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}+\beta\overrightarrow{\mathrm{A}_{0}\mathrm{P}}$ の係数を比較する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおく。4点が同一平面上にないので、$\vec a,\vec b,\vec c$ は1次独立である。すなわち`,
            },
            {
              k: "math",
              t: String.raw`x\vec a+y\vec b+z\vec c=\vec 0\ \Longrightarrow\ x=y=z=0`,
            },
            { k: "p", t: String.raw`が成り立つ。内分点を書くと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{OA}_{0}}&=\frac12\vec a, & \overrightarrow{\mathrm{OB}_{0}}&=\frac13\vec b,\\ \overrightarrow{\mathrm{OP}}&=\left(1-s\right)\vec a+s\vec c, & \overrightarrow{\mathrm{OQ}}&=\left(1-t\right)\vec b+t\vec c\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{B}_{0}$ は $\mathrm{OB}_{0}:\mathrm{B}_{0}\mathrm{B}=1:2$ なので $\dfrac13\vec b$）。`,
            },
            {
              k: "p",
              t: String.raw`4点が同一平面上にある条件は、実数 $\alpha,\beta$ を用いて`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{A}_{0}\mathrm{Q}}=\alpha\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}+\beta\overrightarrow{\mathrm{A}_{0}\mathrm{P}}`,
            },
            { k: "p", t: String.raw`と書けることである。各ベクトルは` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}&=-\frac12\vec a+\frac13\vec b\\ \overrightarrow{\mathrm{A}_{0}\mathrm{P}}&=\left(\frac12-s\right)\vec a+s\vec c\\ \overrightarrow{\mathrm{A}_{0}\mathrm{Q}}&=-\frac12\vec a+\left(1-t\right)\vec b+t\vec c\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、1次独立性から係数を比べて` },
            {
              k: "math",
              t: String.raw`\begin{cases}-\dfrac12=-\dfrac{\alpha}{2}+\beta\left(\dfrac12-s\right)\\[2pt] 1-t=\dfrac{\alpha}{3}\\[2pt] t=\beta s\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。第2式から $\alpha=3\left(1-t\right)$、第3式から $\beta=\dfrac ts$（$s>0$）。これを第1式に入れると`,
            },
            {
              k: "math",
              t: String.raw`-\frac12=-\frac32\left(1-t\right)+\frac ts\left(\frac12-s\right)=-\frac32+\frac32t+\frac{t}{2s}-t`,
            },
            { k: "p", t: String.raw`であり、整理すると` },
            {
              k: "math",
              t: String.raw`1=\frac t2+\frac{t}{2s}=\frac{t\left(s+1\right)}{2s}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`t=\frac{2s}{s+1}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<s<1$ のとき $2s<s+1$ なので $0<t<1$ をみたしており、条件に合う。`,
            },
          ],
          pitfalls: [
            String.raw`$1:2$ の内分を $\dfrac23\vec b$ と取り違えやすい。$\mathrm{OB}_{0}:\mathrm{B}_{0}\mathrm{B}=1:2$ なので $\mathrm{OB}_{0}$ は $\mathrm{OB}$ の $\dfrac13$ である。`,
            String.raw`「同一平面上にない4点」は $\vec a,\vec b,\vec c$ の1次独立を保証するための条件。これを明示しないと係数比較ができない。`,
          ],
          check: String.raw`$2$ 万組の無作為な配置で、$t=\dfrac{2s}{s+1}$ のとき4点が同一平面上にあった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\left|\overrightarrow{\mathrm{OA}}\right|=1$、$\left|\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OC}}\right|=2$、$\angle\mathrm{AOB}=120^{\circ}$、$\angle\mathrm{BOC}=90^{\circ}$、$\angle\mathrm{COA}=60^{\circ}$、$\angle\mathrm{POQ}=90^{\circ}$ のとき、$s$ の値を求める`,
          answer: String.raw`$s=\dfrac15$`,
          approach: String.raw`内積をすべて数値にし、$\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ を $s,t$ の式にしてから (1) を代入。`,
          blocks: [
            { k: "p", t: String.raw`与えられた長さと角から` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\vec a\cdot\vec b&=1\cdot2\cos120^{\circ}=-1\\ \vec b\cdot\vec c&=2\cdot2\cos90^{\circ}=0\\ \vec c\cdot\vec a&=2\cdot1\cos60^{\circ}=1\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`であり、$\left|\vec a\right|^{2}=1$、$\left|\vec b\right|^{2}=\left|\vec c\right|^{2}=4$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\angle\mathrm{POQ}=90^{\circ}$ は $\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ である。展開すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}&=\left\{\left(1-s\right)\vec a+s\vec c\right\}\cdot\left\{\left(1-t\right)\vec b+t\vec c\right\}\\ &=\left(1-s\right)\left(1-t\right)\vec a\cdot\vec b+\left(1-s\right)t\,\vec a\cdot\vec c+s\left(1-t\right)\vec c\cdot\vec b+st\left|\vec c\right|^{2}\\ &=-\left(1-s\right)\left(1-t\right)+\left(1-s\right)t+0+4st\end{aligned}`,
            },
            { k: "p", t: String.raw`である。整理すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}&-\left(1-s-t+st\right)+t-st+4st\\ &=-1+s+2t+2st\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、条件は` },
            {
              k: "math",
              t: String.raw`s+2t+2st=1\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。(1) の $t=\dfrac{2s}{s+1}$ を代入し、両辺に $s+1$ を掛けると` },
            {
              k: "math",
              t: String.raw`s\left(s+1\right)+4s+4s^{2}=s+1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`5s^{2}+4s-1=0,\qquad\left(5s-1\right)\left(s+1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$0<s<1$ より $s=\dfrac15$ である。このとき $t=\dfrac{2/5}{6/5}=\dfrac13$ で、たしかに $0<t<1$ をみたす。`,
            },
            {
              k: "note",
              t: String.raw`$\left|\vec a\right|=1$、$\left|\vec b\right|=\left|\vec c\right|=2$ と3つの角が与えられているが、$\vec b\cdot\vec c=0$ なので $\vec b$ と $\vec c$ の項が1つ消え、式がかなり軽くなる。4点が同一平面上にないことは、この長さと角の組でグラム行列式が正になることから確かめられる。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\vec c\right|^{2}=4$ を $1$ と間違えると $st$ の係数がずれて別の答えになる。長さが $\mathrm{A}$ だけ $1$ であることに注意。`,
            String.raw`$\left(\ast\right)$ を解いて出る $s=-1$ は $0<s<1$ の外なので捨てる。`,
          ],
          check: String.raw`座標を作って $\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ を数値的に解くと $s=0.200001$ の1つだけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分・積分・極限",
      topics: ["微分による不等式", "定積分と不等式", "区分求積法", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "(1) の不等式を $t\\ge1$、$x\\ge t$ の無作為な $20$ 万組で確かめたところ、違反は $0$ 件だった",
          "(2) の不等式をシンプソン法の数値積分で $400$ 組確かめたところ、違反は $0$ 件だった",
          "$a_{n}-\\left(2\\log2-1\\right)n$ は $n=10,10^{2},10^{3},10^{4},10^{5}$ で $-0.3507,-0.3470,-0.3466,-0.34658,-0.34657$ となり、$-\\tfrac{\\log2}{2}=-0.3465736$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を自然数、$t$ を $t\ge1$ をみたす実数とする。$x\ge t$ のとき $-\dfrac{\left(x-t\right)^{2}}{2}\le\log x-\log t-\dfrac1t\left(x-t\right)\le0$ を示す`,
          answer: String.raw`差をとって微分すると、右の不等式は $\dfrac1x-\dfrac1t\le0$ から、左の不等式は $\left(x-t\right)\dfrac{xt-1}{xt}\ge0$ から出る`,
          approach: String.raw`$x=t$ で $0$ になる関数を2つ作り、$x\ge t$ での符号を微分で見る。`,
          blocks: [
            { k: "p", t: String.raw`**右側**。$h\left(x\right)=\log x-\log t-\dfrac1t\left(x-t\right)$ とおくと $h\left(t\right)=0$ で` },
            {
              k: "math",
              t: String.raw`h'\left(x\right)=\frac1x-\frac1t=\frac{t-x}{xt}`,
            },
            {
              k: "p",
              t: String.raw`である。$x\ge t\ge1>0$ なので $t-x\le0$、$xt>0$ であり $h'\left(x\right)\le0$、つまり $h$ は $x\ge t$ で減少する。よって $h\left(x\right)\le h\left(t\right)=0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**左側**。$k\left(x\right)=h\left(x\right)+\dfrac{\left(x-t\right)^{2}}{2}$ とおくと $k\left(t\right)=0$ で`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}k'\left(x\right)&=\frac1x-\frac1t+\left(x-t\right)=\frac{t-x}{xt}+\left(x-t\right)\\ &=\left(x-t\right)\left(1-\frac{1}{xt}\right)=\left(x-t\right)\cdot\frac{xt-1}{xt}\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$x\ge t\ge1$ より $x-t\ge0$、$xt\ge1$ なので $xt-1\ge0$、$xt>0$ であり $k'\left(x\right)\ge0$、つまり $k$ は増加する。よって $k\left(x\right)\ge k\left(t\right)=0$ である。`,
            },
            { k: "p", t: String.raw`2つを合わせて` },
            {
              k: "math",
              t: String.raw`-\frac{\left(x-t\right)^{2}}{2}\le\log x-\log t-\frac1t\left(x-t\right)\le0`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "t = 1 のとき。真ん中が y = log x、上が x = t での接線 y = log t + (x−t)/t、下が接線から (x−t)²/2 を引いた放物線。x ≧ t では接線が上から、放物線が下から log x を挟む。",
                view: [-0.1, 4.3, -1.0, 2.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: UP21, from: -0.1, to: 3.7 },
                  { k: "curve", f: LO21, from: 1, to: 3.65 },
                  { k: "curve", f: LOG21, from: 0.37, to: 4.3 },
                  { k: "dot", at: [1, 0], label: "x = t", place: "below-left" },
                  { k: "text", at: [4.2, 1.45], label: "y = log x", place: "left" },
                  { k: "text", at: [3.45, 2.45], label: "接線", place: "left" },
                  { k: "text", at: [3.5, -0.85], label: "接線 − (x−t)²/2", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`左側で $xt\ge1$ を使うところが $t\ge1$ の効き所。$0<t<1$ だと $x$ が $t$ に近いとき $k'<0$ になり、不等式は成り立たない。`,
          ],
          check: String.raw`$20$ 万組の $\left(t,x\right)$ で違反は $0$ 件だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$-\dfrac{1}{6n^{3}}\le\displaystyle\int_{t}^{t+\frac1n}\log x\,dx-\dfrac1n\log t-\dfrac{1}{2tn^{2}}\le0$ を示す`,
          answer: String.raw`(1) の各辺を $t$ から $t+\dfrac1n$ まで積分するだけ`,
          approach: String.raw`$\displaystyle\int_{t}^{t+\frac1n}\left(x-t\right)dx=\dfrac{1}{2n^{2}}$、$\displaystyle\int_{t}^{t+\frac1n}\left(x-t\right)^{2}dx=\dfrac{1}{3n^{3}}$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t\le x\le t+\dfrac1n$ では $x\ge t$ なので (1) が使える。各辺を $t$ から $t+\dfrac1n$ まで積分すると、不等号の向きは保たれる。`,
            },
            { k: "p", t: String.raw`真ん中の積分は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\int_{t}^{t+\frac1n}\left\{\log x-\log t-\frac1t\left(x-t\right)\right\}dx\\ &=\int_{t}^{t+\frac1n}\log x\,dx-\frac1n\log t-\frac1t\left[\frac{\left(x-t\right)^{2}}{2}\right]_{t}^{t+\frac1n}\\ &=\int_{t}^{t+\frac1n}\log x\,dx-\frac1n\log t-\frac{1}{2tn^{2}}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。左辺の積分は` },
            {
              k: "math",
              t: String.raw`\int_{t}^{t+\frac1n}\left\{-\frac{\left(x-t\right)^{2}}{2}\right\}dx=-\frac12\left[\frac{\left(x-t\right)^{3}}{3}\right]_{t}^{t+\frac1n}=-\frac{1}{6n^{3}}`,
            },
            { k: "p", t: String.raw`であり、右辺の積分は $0$ である。したがって` },
            {
              k: "math",
              t: String.raw`-\frac{1}{6n^{3}}\le\int_{t}^{t+\frac1n}\log x\,dx-\frac1n\log t-\frac{1}{2tn^{2}}\le0`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$\dfrac1t$ は $x$ について定数なので積分の外に出せる。ここを $x$ の関数と勘違いしない。`,
          ],
          check: String.raw`数値積分で $400$ 組確かめて違反 $0$ 件だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{n}=\displaystyle\sum_{k=0}^{n-1}\log\left(1+\dfrac kn\right)$ とおく。$\displaystyle\lim_{n\to\infty}\left(a_{n}-pn\right)=q$ をみたす実数 $p,q$ を求める`,
          answer: String.raw`$p=2\log2-1$、$q=-\dfrac{\log2}{2}$`,
          approach: String.raw`(2) を $t=1+\dfrac kn$（$k=0,\ldots,n-1$）で足し合わせる。積分は $\displaystyle\int_{1}^{2}\log x\,dx$ にまとまり、残った項は区分求積法で $\log2$ に向かう。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t_{k}=1+\dfrac kn$（$k=0,1,\ldots,n-1$）とおくと $t_{k}\ge1$ なので (2) が使える。$t_{k}+\dfrac1n=t_{k+1}$ だから、$k$ について足すと`,
            },
            {
              k: "math",
              t: String.raw`-\frac{n}{6n^{3}}\le\sum_{k=0}^{n-1}\int_{t_{k}}^{t_{k+1}}\log x\,dx-\frac1n\sum_{k=0}^{n-1}\log t_{k}-\frac{1}{2n^{2}}\sum_{k=0}^{n-1}\frac{1}{t_{k}}\le0`,
            },
            { k: "p", t: String.raw`である。積分は区間がつながって` },
            {
              k: "math",
              t: String.raw`\sum_{k=0}^{n-1}\int_{t_{k}}^{t_{k+1}}\log x\,dx=\int_{1}^{2}\log x\,dx=\Bigl[x\log x-x\Bigr]_{1}^{2}=2\log2-1`,
            },
            {
              k: "p",
              t: String.raw`となる。また $\displaystyle\sum_{k=0}^{n-1}\log t_{k}=a_{n}$ である。さらに`,
            },
            {
              k: "math",
              t: String.raw`R_{n}=\frac1n\sum_{k=0}^{n-1}\frac{1}{1+\frac kn}`,
            },
            { k: "p", t: String.raw`とおくと、残りの項は $\dfrac{1}{2n}R_{n}$ と書ける。まとめると` },
            {
              k: "math",
              t: String.raw`-\frac{1}{6n^{2}}\le\left(2\log2-1\right)-\frac{a_{n}}{n}-\frac{R_{n}}{2n}\le0`,
            },
            { k: "p", t: String.raw`である。両辺に $n$ を掛けて（$n>0$ なので向きは保たれる）` },
            {
              k: "math",
              t: String.raw`-\frac{1}{6n}\le\left(2\log2-1\right)n-a_{n}-\frac{R_{n}}{2}\le0`,
            },
            { k: "p", t: String.raw`である。すなわち` },
            {
              k: "math",
              t: String.raw`-\frac{R_{n}}{2}\le a_{n}-\left(2\log2-1\right)n\le-\frac{R_{n}}{2}+\frac{1}{6n}`,
            },
            { k: "p", t: String.raw`である。$R_{n}$ は区分求積法により` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}R_{n}=\int_{0}^{1}\frac{dx}{1+x}=\Bigl[\log\left(1+x\right)\Bigr]_{0}^{1}=\log2`,
            },
            {
              k: "p",
              t: String.raw`であり、$\dfrac{1}{6n}\to0$ である。はさみうちの原理より`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\left\{a_{n}-\left(2\log2-1\right)n\right\}=-\frac{\log2}{2}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`p=2\log2-1,\qquad q=-\frac{\log2}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$p$ だけなら区分求積法で $\dfrac{a_{n}}{n}\to\displaystyle\int_{0}^{1}\log\left(1+x\right)dx=2\log2-1$ とすぐ出る。難しいのは「ずれ」$q$ のほうで、そこに (1)(2) の精密な不等式が効いている。$q=-\dfrac{f\left(1\right)-f\left(0\right)}{2}$（$f\left(x\right)=\log\left(1+x\right)$）という形は、台形公式と長方形公式の差として説明できる。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n}$ の和は $k=0$ から $n-1$ まで。$k=n$ の項（$\log2$）を入れてしまうと $q$ が $+\dfrac{\log2}{2}$ になる。`,
            String.raw`$\dfrac{R_{n}}{2}$ の極限を取る前に $n$ を掛ける順番を間違えると、$q$ が出ずに $0$ になってしまう。不等式を $n$ 倍してから極限を取る。`,
          ],
          check: String.raw`$a_{n}-pn$ は $n=10^{5}$ で $-0.3465740$、$q=-0.3465736$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分・整数",
      topics: ["定積分の計算", "整数の合同", "約数の個数", "因数分解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left|a\\right|,\\left|b\\right|\\le40$ の範囲で条件 $\\left(\\ast\\right)$ をみたす整数の組をすべて拾うと、現れた $c$ はすべて $3$ の倍数だった",
          "$c=3600$ のとき $N=3c^{2}=2^{8}\\cdot3^{5}\\cdot5^{4}$ の約数を全部調べて数えると、$a<b$ をみたす組はちょうど $180$ 個で、どの組でも定積分の等式が厳密に成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`整数 $a,b,c$ が $\displaystyle\int_{a}^{c}\left(x^{2}+bx\right)dx=\int_{b}^{c}\left(x^{2}+ax\right)dx\ \cdots\left(\ast\right)$ および $a\ne b$ をみたすとき、$c$ が $3$ の倍数であることを示す`,
          answer: String.raw`$\left(\ast\right)$ は $\left(b-a\right)\left\{\left(2a+b\right)\left(a+2b\right)+3c^{2}\right\}=0$ と同値。$a\ne b$ より $\left(2a+b\right)\left(a+2b\right)=-3c^{2}$。法 $3$ で見ると $3\mid\left(a-b\right)$ がわかり、$a-b=3m$ を戻すと $3\left(a+m\right)\left(a+2m\right)=-c^{2}$ から $3\mid c$`,
          approach: String.raw`両辺を計算して因数分解し、合同式を2段階で使う。`,
          blocks: [
            { k: "p", t: String.raw`両辺を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\int_{a}^{c}\left(x^{2}+bx\right)dx&=\frac{c^{3}-a^{3}}{3}+\frac b2\left(c^{2}-a^{2}\right)\\ \int_{b}^{c}\left(x^{2}+ax\right)dx&=\frac{c^{3}-b^{3}}{3}+\frac a2\left(c^{2}-b^{2}\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、差をとると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\frac{b^{3}-a^{3}}{3}+\frac{c^{2}}{2}\left(b-a\right)+\frac{ab}{2}\left(b-a\right)\\ &=\left(b-a\right)\left\{\frac{a^{2}+ab+b^{2}}{3}+\frac{c^{2}}{2}+\frac{ab}{2}\right\}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。$6$ 倍して整理すると` },
            {
              k: "math",
              t: String.raw`\left(b-a\right)\left(2a^{2}+5ab+2b^{2}+3c^{2}\right)=0`,
            },
            { k: "p", t: String.raw`であり、$2a^{2}+5ab+2b^{2}=\left(2a+b\right)\left(a+2b\right)$ だから` },
            {
              k: "math",
              t: String.raw`\left(b-a\right)\left\{\left(2a+b\right)\left(a+2b\right)+3c^{2}\right\}=0`,
            },
            { k: "p", t: String.raw`となる。$a\ne b$ なので` },
            {
              k: "math",
              t: String.raw`\left(2a+b\right)\left(a+2b\right)=-3c^{2}\quad\cdots\left(\ast\ast\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**第1段**。$\left(\ast\ast\right)$ の右辺は $3$ の倍数である。法 $3$ で $2a+b\equiv b-a$、$a+2b\equiv a-b$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left(2a+b\right)\left(a+2b\right)\equiv-\left(a-b\right)^{2}\pmod3`,
            },
            {
              k: "p",
              t: String.raw`である。よって $3\mid\left(a-b\right)^{2}$ であり、$3$ は素数なので $3\mid\left(a-b\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`**第2段**。$b-a=3m$（$m$ は $0$ でない整数）とおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}2a+b&=3a+\left(b-a\right)=3\left(a+m\right)\\ a+2b&=3a+2\left(b-a\right)=3\left(a+2m\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、$\left(\ast\ast\right)$ は` },
            {
              k: "math",
              t: String.raw`9\left(a+m\right)\left(a+2m\right)=-3c^{2},\qquad c^{2}=-3\left(a+m\right)\left(a+2m\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。右辺は $3$ の倍数なので $3\mid c^{2}$、$3$ は素数だから $3\mid c$ である。すなわち $c$ は $3$ の倍数である。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`第1段だけでは「$a-b$ が $3$ の倍数」しか出ず、$c$ については何も言えない。もう一度代入して $9$ が現れるところまで進める必要がある。`,
            String.raw`$a\ne b$ を使わないと $\left(\ast\right)$ は $b-a=0$ でも成り立ってしまう（このとき $c$ は何でもよい）。`,
          ],
          check: String.raw`$\left|a\right|,\left|b\right|\le40$ での全数調査で、現れた $c$ はすべて $3$ の倍数だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$c=3600$ のとき、$\left(\ast\right)$ および $a<b$ をみたす整数の組 $\left(a,b\right)$ の個数を求める`,
          answer: String.raw`$180$ 個`,
          approach: String.raw`$u=2a+b$、$v=a+2b$ とおくと $uv=-3c^{2}$。$a,b$ が整数になる条件は $3\mid\left(u+v\right)$ で、これは $u$ の $3$ 指数がちょうど $1$ 以上 $4$ 以下であることに言い換わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a<b$ なので $a\ne b$ であり、(1) より条件は $\left(\ast\ast\right)$ と同値である。$u=2a+b$、$v=a+2b$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`uv=-3c^{2}=-3\cdot3600^{2}`,
            },
            { k: "p", t: String.raw`である。逆に $u,v$ から` },
            {
              k: "math",
              t: String.raw`a=\frac{2u-v}{3},\qquad b=\frac{2v-u}{3}`,
            },
            {
              k: "p",
              t: String.raw`と戻せる。$2u-v\equiv-\left(u+v\right)$、$2v-u\equiv-\left(u+v\right)\pmod3$ なので、$a,b$ がともに整数になる条件は`,
            },
            {
              k: "math",
              t: String.raw`3\mid\left(u+v\right)`,
            },
            {
              k: "p",
              t: String.raw`の1つだけである。また $v-u=b-a$ なので、$a<b\iff u<v$ である。`,
            },
            {
              k: "p",
              t: String.raw`$uv=-3c^{2}<0$ なので $u,v$ は異符号であり、$u<v$ と合わせて $u<0<v$ である。そこで $u=-d$（$d$ は正の整数）とおくと、$d$ は`,
            },
            {
              k: "math",
              t: String.raw`N=3\cdot3600^{2}=3\cdot\left(2^{4}\cdot3^{2}\cdot5^{2}\right)^{2}=2^{8}\cdot3^{5}\cdot5^{4}`,
            },
            {
              k: "p",
              t: String.raw`の正の約数で、$v=\dfrac Nd$ である。逆に $N$ の正の約数 $d$ ひとつに対して $\left(u,v\right)=\left(-d,\dfrac Nd\right)$ がひと通り決まり、$u<0<v$ も自動的に成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`残る条件は $3\mid\left(u+v\right)=\dfrac Nd-d$ である。$d$ に含まれる $3$ の個数を $e$（$0\le e\le5$）とすると、$\dfrac Nd$ に含まれる $3$ の個数は $5-e$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$e=0$ のとき。$d$ は $3$ の倍数でなく $\dfrac Nd$ は $3$ の倍数なので、差は $3$ の倍数でない。`,
                String.raw`$1\le e\le4$ のとき。$d$ も $\dfrac Nd$ も $3$ の倍数なので、差は $3$ の倍数である。`,
                String.raw`$e=5$ のとき。$d$ は $3$ の倍数だが $\dfrac Nd$ は $3$ の倍数でないので、差は $3$ の倍数でない。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって条件は $1\le e\le4$ である。$d=2^{i}3^{e}5^{j}$（$0\le i\le8$、$0\le j\le4$）と書けるので、求める個数は`,
            },
            {
              k: "math",
              t: String.raw`9\times4\times5=180`,
            },
            { k: "p", t: String.raw`である。すなわち $\left(a,b\right)$ は **$180$ 組**ある。` },
            {
              k: "note",
              t: String.raw`たとえば $d=3$ のとき $u=-3$、$v=\dfrac N3=12960000$ で、$a=\dfrac{-6-12960000}{3}=-4320002$、$b=\dfrac{25920000+3}{3}=8640001$ である。たしかに整数で $a<b$ になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$u,v$ から $a,b$ に戻すとき、整数になる条件は2つあるように見えて、法 $3$ では同じ1つの条件に帰着する。2つ別々に場合分けすると混乱する。`,
            String.raw`$N$ の約数の総数 $9\cdot6\cdot5=270$ から引くのではなく、$e$ の範囲を直接 $4$ 通りに絞るほうが速い。`,
            String.raw`$a<b$ を $a\le b$ にすると $a=b$ の場合が混ざるが、$a=b$ では $\left(\ast\ast\right)$ を経由できないので別扱いになる。`,
          ],
          check: String.raw`$N$ の約数を全部調べて数えると $180$ 個で、どの組でも定積分の等式が厳密に成り立った。`,
        },
      ],
    },
    {
      no: 5,
      field: "微分・三角関数",
      topics: ["単調性と中間値の定理", "共通接線", "三角関数", "必要十分条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a=-10,-3,-1,0,0.5,2,7,100$ のそれぞれで $x-\\tan x=a$ の $\\left|x\\right|<\\tfrac{\\pi}{2}$ での解を数えると、どれもちょうど $1$ 個だった",
          "$n=1,\\ldots,5$ で $x_{n}$ を求め、$u=-x_{n}+2n\\pi$ とすると $\\cos u=\\cos x_{n}$ と $\\sin u-u\\cos u=\\sin x_{n}-x_{n}\\cos x_{n}$ がともに成り立ち、$u\\ge\\tfrac{\\pi}{2}$ だった",
          "$\\left|t\\right|<\\tfrac{\\pi}{2}$ の無作為な $t$ を $2000$ 個とって同じ条件を調べると、成り立つものは $1$ つもなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数とする。$x$ についての方程式 $x-\tan x=a$ の実数解のうち $\left|x\right|<\dfrac{\pi}{2}$ をみたすものがちょうど1個あることを示す`,
          answer: String.raw`$f\left(x\right)=x-\tan x$ は $f'\left(x\right)=-\tan^{2}x\le0$（等号は $x=0$ のみ）より $\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$ で狭義単調減少。両端での極限が $+\infty$ と $-\infty$ なので、中間値の定理より解はちょうど1個`,
          approach: String.raw`狭義単調減少と、値域が実数全体であることを示す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(x\right)=x-\tan x$ は $-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ で連続・微分可能で`,
            },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=1-\frac{1}{\cos^{2}x}=-\tan^{2}x\le0`,
            },
            {
              k: "p",
              t: String.raw`である。等号は $x=0$ のときだけなので、$f$ はこの区間で**狭義単調減少**である。したがって $f\left(x\right)=a$ の解は多くても1個である。`,
            },
            { k: "p", t: String.raw`次に値域を見る。` },
            {
              k: "math",
              t: String.raw`\lim_{x\to-\frac{\pi}{2}+0}\tan x=-\infty,\qquad\lim_{x\to\frac{\pi}{2}-0}\tan x=+\infty`,
            },
            { k: "p", t: String.raw`であり、$x$ の部分は有界なので` },
            {
              k: "math",
              t: String.raw`\lim_{x\to-\frac{\pi}{2}+0}f\left(x\right)=+\infty,\qquad\lim_{x\to\frac{\pi}{2}-0}f\left(x\right)=-\infty`,
            },
            {
              k: "p",
              t: String.raw`である。よって、どんな実数 $a$ に対しても $f\left(x_{-}\right)>a>f\left(x_{+}\right)$ となる $x_{-}<x_{+}$ が区間内にとれる。$f$ は連続なので中間値の定理より $f\left(x\right)=a$ の解が $x_{-}$ と $x_{+}$ の間に存在する。`,
            },
            {
              k: "p",
              t: String.raw`存在と一意性を合わせて、解はちょうど1個である。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$a>0$ のとき $f\left(0\right)=0<a$ と減少性から解は負、$a<0$ のときは正、$a=0$ のときは $x=0$ である。とくに $a=n\pi>0$ での解 $x_{n}$ は $-\dfrac{\pi}{2}<x_{n}<0$ をみたす。`,
            },
          ],
          pitfalls: [
            String.raw`$f'\le0$ だけでは狭義減少と言い切れない。等号が1点だけであることを添える（または $f'<0$ が $x\ne0$ で成り立つと書く）。`,
          ],
          check: String.raw`$8$ 通りの $a$ で数えて、どれもちょうど $1$ 個だった。`,
        },
        {
          label: "(2)",
          task: String.raw`自然数 $n$ に対し、$x-\tan x=n\pi$ かつ $\left|x\right|<\dfrac{\pi}{2}$ をみたす $x$ を $x_{n}$ とおく。$\left|t\right|<\dfrac{\pi}{2}$ とする。曲線 $C:y=\sin x$ 上の点 $\mathrm{P}\left(t,\sin t\right)$ における接線が、$x\ge\dfrac{\pi}{2}$ の領域に含まれる点においても $C$ と接するための必要十分条件が、$t$ が $x_{1},x_{2},x_{3},\ldots$ のいずれかと等しいことであることを示す`,
          answer: String.raw`$u$ での接線と $t$ での接線が一致する条件は $\cos u=\cos t$ かつ $\sin u-u\cos u=\sin t-t\cos t$。これを解くと $u=-t+2k\pi$ かつ $t-\tan t=k\pi$ となり、$u\ge\dfrac{\pi}{2}$ から $k$ は自然数。よって $t=x_{k}$`,
          approach: String.raw`接線を「傾き」と「$y$ 切片」の2つで特徴づけ、$\cos u=\cos t$ の2つの場合を潰す。`,
          blocks: [
            { k: "p", t: String.raw`$C$ 上の点 $\left(u,\sin u\right)$ における接線は` },
            {
              k: "math",
              t: String.raw`y=\cos u\cdot x+\left(\sin u-u\cos u\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$g\left(u\right)=\sin u-u\cos u$ とおく。2つの接線が同じ直線である条件は、傾きと切片がともに一致すること、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\cos u=\cos t\quad\text{かつ}\quad g\left(u\right)=g\left(t\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$\cos u=\cos t$ は $u=t+2k\pi$ または $u=-t+2k\pi$（$k$ は整数）と同値である。$\left|t\right|<\dfrac{\pi}{2}$ より $\cos t>0$ であることに注意する。`,
            },
            { k: "p", t: String.raw`**(i) $u=t+2k\pi$ の場合**。$\cos u=\cos t$ なので` },
            {
              k: "math",
              t: String.raw`g\left(u\right)=\sin t-\left(t+2k\pi\right)\cos t=g\left(t\right)-2k\pi\cos t`,
            },
            {
              k: "p",
              t: String.raw`である。$g\left(u\right)=g\left(t\right)$ は $2k\pi\cos t=0$、$\cos t>0$ より $k=0$、すなわち $u=t$ を意味する。しかし $u=t<\dfrac{\pi}{2}$ なので、$x\ge\dfrac{\pi}{2}$ の点にはならない。この場合は不適である。`,
            },
            { k: "p", t: String.raw`**(ii) $u=-t+2k\pi$ の場合**。$\sin u=-\sin t$ なので` },
            {
              k: "math",
              t: String.raw`g\left(u\right)=-\sin t-\left(-t+2k\pi\right)\cos t`,
            },
            { k: "p", t: String.raw`であり、$g\left(u\right)=g\left(t\right)$ は` },
            {
              k: "math",
              t: String.raw`-\sin t+t\cos t-2k\pi\cos t=\sin t-t\cos t`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`2\left(t\cos t-\sin t\right)=2k\pi\cos t`,
            },
            { k: "p", t: String.raw`である。$\cos t>0$ で割って` },
            {
              k: "math",
              t: String.raw`t-\tan t=k\pi\quad\cdots\left(\sharp\right)`,
            },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "p",
              t: String.raw`さらに $u\ge\dfrac{\pi}{2}$ を課す。$k$ の符号で分ける。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k\ge1$ のとき。$\left(\sharp\right)$ の右辺は正なので (1) の注意より $t<0$、よって $u=-t+2k\pi>2k\pi\ge2\pi>\dfrac{\pi}{2}$ で条件をみたす。また (1) の一意性から $t=x_{k}$ である。`,
                String.raw`$k=0$ のとき。$\left(\sharp\right)$ は $t-\tan t=0$ で、(1) より $t=0$。このとき $u=0<\dfrac{\pi}{2}$ なので不適。`,
                String.raw`$k\le-1$ のとき。$\left(\sharp\right)$ の右辺は負なので $t>0$、よって $u=-t+2k\pi<2k\pi\le-2\pi<\dfrac{\pi}{2}$ で不適。`,
              ],
            },
            {
              k: "p",
              t: String.raw`以上より、「$\mathrm{P}$ における接線が $x\ge\dfrac{\pi}{2}$ の点でも $C$ と接する」ことは「ある自然数 $k$ について $t-\tan t=k\pi$」と同値であり、(1) の一意性からこれは「$t$ が $x_{1},x_{2},x_{3},\ldots$ のいずれかと等しい」ことと同値である。$\blacksquare$`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "n = 1 の場合。x₁ ≒ −1.3518 における y = sin x の接線は、x = −x₁ + 2π ≒ 7.635（点線より右）でもう一度 sin x に接する。点線は x = π/2。",
                view: [-2.2, 9.5, -1.6, 1.6],
                step: { x: 1, y: 0.5 },
                items: [
                  {
                    k: "curve",
                    f: (x: number): number => Math.sin(x),
                    from: -2.2,
                    to: 9.5,
                  },
                  { k: "curve", f: TAN21, from: -2.2, to: 9.5 },
                  { k: "seg", a: [Math.PI / 2, -1.6], b: [Math.PI / 2, 1.6], dash: true },
                  { k: "dot", at: [T21, Math.sin(T21)], label: "P", place: "below-right" },
                  { k: "dot", at: [U21, Math.sin(U21)], label: "2つめの接点", place: "above-left" },
                  { k: "text", at: [Math.PI / 2, 1.35], label: "x = π/2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「接する」を「通る」と読み替えてはいけない。接線は傾きと切片の2つがそろって初めて一致する。`,
            String.raw`$\cos u=\cos t$ の解を $u=\pm t+2k\pi$ の両方書かないと、(i) の場合（$u=t$ しかない）を捨てる理由が示せない。`,
            String.raw`$u\ge\dfrac{\pi}{2}$ という領域の条件が $k\ge1$、つまり「自然数」を生んでいる。ここを落とすと $k=0$ も入ってしまう。`,
          ],
          check: String.raw`$n=1,\ldots,5$ で2つの接線が数値的に一致し、無作為な $t$（$2000$ 個）では1つも一致しなかった。`,
        },
      ],
    },
  ],
};
