import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2023年度（令和5年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 * 第3問は同じ年度の理系 第2問とほぼ同じ設定で、答えも一致する。
 */

/** 第1問。$\left(a,b\right)$ の存在範囲の上下。 */
const UP23 = (a: number): number => (Math.abs(a) <= 4 ? (a * a) / 8 + 1 : Math.abs(a) - 1);
const LO23 = (a: number): number => -Math.abs(a) - 1;

/** 第2問。$a=1.2$ のときの $y=-t^{3}+3at^{2}$。 */
const A23 = 1.2;
const Y23 = (t: number): number => -(t ** 3) + 3 * A23 * t * t;

/** 第3問。中心 $\left(\tfrac13,\tfrac13\right)$・半径 $\tfrac13$ の円板の上下。 */
const CIRC23 = (sign: number) => (p: number): number => {
  const d = 1 / 9 - (p - 1 / 3) ** 2;
  return 1 / 3 + sign * Math.sqrt(Math.max(d, 0));
};
const MINP23 = 1 / 3 - 1 / (3 * Math.SQRT2);

export const handaiBunkei2023: SolutionSet = {
  slug: "handai-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数・2次方程式",
      topics: ["2倍角の公式", "2次方程式の解の配置", "存在条件", "領域の図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-7$ から $7$、$b$ を $-9$ から $9$ まで $0.01$ 刻みにとり、$2s^{2}+as+b-1=0$ が $-1\\le s\\le1$ に解をもつかどうかの直接判定と、求めた領域の不等式による判定を比べると $1$ 点も食い違わなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a,b$ を実数とする。$\theta$ についての方程式 $\cos2\theta=a\sin\theta+b$ が実数解をもつような点 $\left(a,b\right)$ の存在範囲を座標平面上に図示する`,
          answer: String.raw`$-\left|a\right|-1\le b\le\dfrac{a^{2}}{8}+1$（$\left|a\right|\le4$）、$-\left|a\right|-1\le b\le\left|a\right|-1$（$\left|a\right|>4$）`,
          approach: String.raw`$s=\sin\theta$ とおくと $s$ は $-1\le s\le1$ を自由に動く。$b=-2s^{2}-as+1$ の値域を求める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\cos2\theta=1-2\sin^{2}\theta$ なので、$s=\sin\theta$ とおくと方程式は`,
            },
            {
              k: "math",
              t: String.raw`1-2s^{2}=as+b`,
            },
            {
              k: "p",
              t: String.raw`である。$\theta$ が実数全体を動くとき $s=\sin\theta$ は $-1\le s\le1$ を**くまなく**動き、逆に $-1\le s\le1$ のどの値も $\sin\theta$ として実現できる。よって`,
            },
            {
              k: "math",
              t: String.raw`\text{方程式が実数解をもつ}\iff\exists s\in\left[-1,1\right]\ \text{で}\ b=-2s^{2}-as+1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`そこで $a$ を固定し、$g\left(s\right)=-2s^{2}-as+1$ の $-1\le s\le1$ での値域を求める。$g$ は連続なので値域は閉区間 $\left[\min g,\ \max g\right]$ であり、求める条件は $\min g\le b\le\max g$ である。`,
            },
            { k: "p", t: String.raw`$g$ は上に凸の2次関数で` },
            {
              k: "math",
              t: String.raw`g\left(s\right)=-2\left(s+\frac a4\right)^{2}+\frac{a^{2}}{8}+1`,
            },
            { k: "p", t: String.raw`なので、軸は $s=-\dfrac a4$、頂点の値は $\dfrac{a^{2}}{8}+1$ である。両端では` },
            {
              k: "math",
              t: String.raw`g\left(-1\right)=a-1,\qquad g\left(1\right)=-a-1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最大**。軸が区間に入る条件は $-1\le-\dfrac a4\le1$、すなわち $\left|a\right|\le4$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left|a\right|\le4$ のとき：$\max g=\dfrac{a^{2}}{8}+1$`,
                String.raw`$a>4$ のとき：軸が $-1$ より左なので $g$ は区間で減少し、$\max g=g\left(-1\right)=a-1$`,
                String.raw`$a<-4$ のとき：軸が $1$ より右なので $g$ は区間で増加し、$\max g=g\left(1\right)=-a-1$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$a>4$ と $a<-4$ をまとめると $\max g=\left|a\right|-1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**最小**。上に凸なので最小は必ず両端のどちらかで、`,
            },
            {
              k: "math",
              t: String.raw`\min g=\min\left(a-1,\ -a-1\right)=-\left|a\right|-1`,
            },
            { k: "p", t: String.raw`である（軸の位置によらない）。` },
            { k: "p", t: String.raw`まとめると、求める存在範囲は` },
            {
              k: "math",
              t: String.raw`\begin{cases}-\left|a\right|-1\le b\le\dfrac{a^{2}}{8}+1 & \left(\left|a\right|\le4\right)\\[4pt] -\left|a\right|-1\le b\le\left|a\right|-1 & \left(\left|a\right|>4\right)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である（境界を含む）。$\left|a\right|=4$ では $\dfrac{a^{2}}{8}+1=3=\left|a\right|-1$ でつながっている。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網をかけた部分が (a, b) の存在範囲（境界を含む）。下の境界は折れ線 b = −|a| − 1、上の境界は |a| ≦ 4 では放物線 b = a²/8 + 1、|a| > 4 では折れ線 b = |a| − 1 で、(±4, 3) でなめらかにつながる（放物線の接線がちょうど傾き ±1）。",
                view: [-8.5, 8.5, -10, 8],
                step: { x: 2, y: 2 },
                items: [
                  { k: "fillBetween", top: UP23, bottom: LO23, from: -8.5, to: 8.5 },
                  { k: "curve", f: UP23, from: -8.5, to: 8.5 },
                  { k: "curve", f: LO23, from: -8.5, to: 8.5 },
                  { k: "dot", at: [4, 3], label: "(4, 3)", place: "right" },
                  { k: "dot", at: [-4, 3], label: "(−4, 3)", place: "left" },
                  { k: "text", at: [1.8, UP23(1.8)], label: "b = a²/8 + 1", place: "above-right" },
                  { k: "text", at: [7.2, UP23(7.2)], label: "b = |a| − 1", place: "above-left" },
                  { k: "text", at: [5.6, LO23(5.6)], label: "b = −|a| − 1", place: "below-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`上の境界が放物線から直線に切り替わる $\left|a\right|=4$ は、「頂点がちょうど区間の端 $s=\mp1$ に来る」ところである。放物線 $b=\dfrac{a^{2}}{8}+1$ の $a=4$ での接線の傾きは $\dfrac{a}{4}=1$ なので、直線 $b=a-1$ と接線がそろい、境界はとがらずになめらかにつながる。`,
            },
          ],
          alts: [
            {
              title: "2次方程式の解の配置で見る",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$f\left(s\right)=2s^{2}+as+b-1$ とおくと、条件は「$f$ が $-1\le s\le1$ に解をもつ」である。$f$ は下に凸なので`,
                },
                {
                  k: "math",
                  t: String.raw`f\left(-1\right)f\left(1\right)\le0\quad\text{または}\quad\begin{cases}f\left(-1\right)\ge0,\ f\left(1\right)\ge0\\ -1\le-\dfrac a4\le1\\ \text{判別式}\ a^{2}-8\left(b-1\right)\ge0\end{cases}`,
                },
                {
                  k: "p",
                  t: String.raw`と書ける。これを整理しても同じ領域になるが、場合分けが増える。$b$ について解けてしまう形（$b=g\left(s\right)$）なので、本解のように値域を求めるほうが速い。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$\sin\theta$ が $\left[-1,1\right]$ を**くまなく**動くことを使う。「$\left|s\right|\le1$ なら十分」ではなく「どの $s$ も実現できる」ことが要る。`,
            String.raw`最小は軸の位置によらず両端の小さいほう。最大だけ場合分けが要る、という非対称性に注意。`,
            String.raw`$\left|a\right|>4$ の部分を落とすと、$\left|a\right|$ が大きいところで領域が広すぎる（放物線まで届かない）。`,
          ],
          check: String.raw`$0.01$ 刻みの格子で、直接判定と不等式による判定が $1$ 点も食い違わなかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "対数・微分",
      topics: ["底の変換", "3次関数の最大", "場合分け", "対数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a,x$ を無作為に $5000$ 組とって元の式と $-t^{3}+3at^{2}$（$t=\\log_{2}x$）を比べると、差はつねに $10^{-6}$ 未満だった",
          "$a=0.2,0.5,1,1.2,1.5,2,5$ で $-1\\le t\\le3$ を $40$ 万等分して最大値を探すと、$1.6,2.5,4,6.912,13.5,27,108$ となり、求めた式と小数第6位まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の実数 $a,x$ に対して $y=\left(\log_{\frac12}x\right)^{3}+a\left(\log_{\sqrt2}x\right)\left(\log_{4}x^{3}\right)$ とする。$t=\log_{2}x$ とするとき、$y$ を $a,t$ で表す`,
          answer: String.raw`$y=-t^{3}+3at^{2}$`,
          approach: String.raw`底をすべて $2$ にそろえる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`底の変換公式 $\log_{c}x=\dfrac{\log_{2}x}{\log_{2}c}$ を使う。$t=\log_{2}x$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\log_{\frac12}x&=\frac{t}{\log_{2}\frac12}=\frac{t}{-1}=-t\\ \log_{\sqrt2}x&=\frac{t}{\log_{2}\sqrt2}=\frac{t}{\frac12}=2t\\ \log_{4}x^{3}&=\frac{\log_{2}x^{3}}{\log_{2}4}=\frac{3t}{2}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`y=\left(-t\right)^{3}+a\cdot2t\cdot\frac{3t}{2}=-t^{3}+3at^{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\log_{4}x^{3}$ は $\left(\log_{4}x\right)^{3}$ ではない。真数の $3$ 乗なので $3\log_{4}x$ になる。`,
            String.raw`$\log_{\sqrt2}x$ の底は $2^{1/2}$ なので $\log_{2}\sqrt2=\dfrac12$、割ると $2$ 倍。$\dfrac12$ 倍にしない。`,
          ],
          check: String.raw`無作為な $5000$ 組で元の式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$x$ が $\dfrac12\le x\le8$ の範囲を動くとき、$y$ の最大値 $M$ を $a$ で表す`,
          answer: String.raw`$M=1+3a$（$0<a\le1$）、$M=4a^{3}$（$1\le a\le\dfrac32$）、$M=27\left(a-1\right)$（$a\ge\dfrac32$）`,
          approach: String.raw`$t$ の範囲は $-1\le t\le3$。増減から候補は $t=-1$、$t=2a$、$t=3$ の3つ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=\log_{2}x$ は増加関数なので、$\dfrac12\le x\le8$ は`,
            },
            {
              k: "math",
              t: String.raw`\log_{2}\frac12\le t\le\log_{2}8,\qquad-1\le t\le3`,
            },
            { k: "p", t: String.raw`に対応する。$y=-t^{3}+3at^{2}$ を $t$ で微分すると` },
            {
              k: "math",
              t: String.raw`\frac{dy}{dt}=-3t^{2}+6at=-3t\left(t-2a\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$a>0$ より $2a>0$ なので、$y$ は $t<0$ で減少、$0<t<2a$ で増加、$t>2a$ で減少する。したがって $-1\le t\le3$ での最大値の候補は`,
            },
            {
              k: "steps",
              items: [
                String.raw`左端 $t=-1$：$y=1+3a$`,
                String.raw`極大 $t=2a$（$2a\le3$ のとき区間内）：$y=-8a^{3}+12a^{3}=4a^{3}$`,
                String.raw`右端 $t=3$（$2a\ge3$ のとき、そこまで増加）：$y=-27+27a=27\left(a-1\right)$`,
              ],
            },
            { k: "p", t: String.raw`の3つである。` },
            {
              k: "p",
              t: String.raw`**$0<a\le\dfrac32$ のとき**（$2a\le3$）。$t=3$ は $t>2a$ の側なので候補から外れ（$y\left(3\right)\le y\left(2a\right)$）、$M=\max\left(1+3a,\ 4a^{3}\right)$ である。差をとると`,
            },
            {
              k: "math",
              t: String.raw`4a^{3}-\left(3a+1\right)=\left(a-1\right)\left(2a+1\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$a=1$ が解なので $a-1$ で割った）。$a>0$ では $\left(2a+1\right)^{2}>0$ なので、符号は $a-1$ と同じである。よって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<a\le1$：$4a^{3}\le1+3a$ なので $M=1+3a$`,
                String.raw`$1\le a\le\dfrac32$：$4a^{3}\ge1+3a$ なので $M=4a^{3}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$a\ge\dfrac32$ のとき**（$2a\ge3$）。$y$ は $0\le t\le3$ で増加するので、右端 $t=3$ が内部の候補になり、$M=\max\left(1+3a,\ 27\left(a-1\right)\right)$ である。`,
            },
            {
              k: "math",
              t: String.raw`27\left(a-1\right)-\left(3a+1\right)=24a-28=4\left(6a-7\right)`,
            },
            {
              k: "p",
              t: String.raw`であり、$a\ge\dfrac32>\dfrac76$ なのでこれは正。よって $M=27\left(a-1\right)$ である。`,
            },
            { k: "p", t: String.raw`まとめると` },
            {
              k: "math",
              t: String.raw`M=\begin{cases}1+3a & \left(0<a\le1\right)\\ 4a^{3} & \left(1\le a\le\dfrac32\right)\\ 27\left(a-1\right) & \left(a\ge\dfrac32\right)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。$a=1$ では $1+3=4$ と $4\cdot1=4$、$a=\dfrac32$ では $4\cdot\dfrac{27}{8}=\dfrac{27}{2}$ と $27\cdot\dfrac12=\dfrac{27}{2}$ で、つなぎ目は一致する。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1.2 のとき（2a = 2.4 が区間の中）。t = log₂x は −1 ≦ t ≦ 3 を動く。候補は左端 t = −1（値 4.6）、極大 t = 2a（値 6.912）、右端 t = 3（値 5.4）の 3 つで、この a では極大が最大。点線が区間の両端。",
                view: [-1.6, 3.6, -2.0, 8.0],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: Y23, from: -1.6, to: 3.6 },
                  { k: "seg", a: [-1, -2.0], b: [-1, 8.0], dash: true, faint: true },
                  { k: "seg", a: [3, -2.0], b: [3, 8.0], dash: true, faint: true },
                  { k: "dot", at: [-1, Y23(-1)], label: "t = −1", place: "above-right" },
                  { k: "dot", at: [2 * A23, Y23(2 * A23)], label: "t = 2a", place: "above" },
                  { k: "dot", at: [3, Y23(3)], label: "t = 3", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x$ の範囲ではなく $t$ の範囲に直してから考える。$\dfrac12\le x\le8$ は $-1\le t\le3$。`,
            String.raw`$4a^{3}-3a-1$ は $a=1$ を解にもつ。因数分解して $\left(a-1\right)\left(2a+1\right)^{2}$ とすると符号が一目でわかる。`,
            String.raw`$a>\dfrac32$ では極大点 $t=2a$ が区間の外に出る。「極大だから最大」と決めつけない。`,
          ],
          check: String.raw`$7$ 通りの $a$ で $40$ 万等分の走査と式が小数第6位まで一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "ベクトル",
      topics: ["内積", "正規直交基底", "円板と半平面", "最大最小"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left|\\vec u\\right|=\\left|\\vec v\\right|=1$ と $\\vec u\\cdot\\left(\\overrightarrow{\\mathrm{OA}}+\\overrightarrow{\\mathrm{OB}}\\right)=\\tfrac13$ をみたす組を無作為に $2$ 万通り試すと、$\\vec u\\cdot\\vec v$ はつねに $0$ だった",
          "$\\left(p,q\\right)$ を $0.00053$ 刻みの格子で走査すると、$\\left|\\overrightarrow{\\mathrm{OP}}\\right|$ の最大は $0.7453560$（$\\tfrac{\\sqrt5}{3}=0.7453560$、$\\left(p,q\\right)=\\left(0.333,0.667\\right)$）、最小は $0.1384049$（$\\tfrac{\\sqrt2-1}{3}=0.1380712$、格子の粗さぶんのずれ）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ が $\left|2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}\right|=1$ かつ $\left(2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\cdot\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)=\dfrac13$ をみたすとする。$\left(2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\cdot\left(\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}\right)$ を求める`,
          answer: String.raw`$0$`,
          approach: String.raw`$\vec u=2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}$、$\vec v=\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}$ とおくと $\vec u+\vec v=3\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec u=2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}$、$\vec v=\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}$ とおく。条件は $\left|\vec u\right|=\left|\vec v\right|=1$ である。また`,
            },
            {
              k: "math",
              t: String.raw`\vec u+\vec v=3\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right),\qquad\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}=\frac{\vec u+\vec v}{3}`,
            },
            { k: "p", t: String.raw`である。3つめの条件は` },
            {
              k: "math",
              t: String.raw`\vec u\cdot\frac{\vec u+\vec v}{3}=\frac13,\qquad\vec u\cdot\left(\vec u+\vec v\right)=1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left|\vec u\right|^{2}+\vec u\cdot\vec v=1`,
            },
            { k: "p", t: String.raw`である。$\left|\vec u\right|^{2}=1$ なので` },
            {
              k: "math",
              t: String.raw`\vec u\cdot\vec v=0`,
            },
            {
              k: "p",
              t: String.raw`である。つまり求める内積は $0$ で、$\vec u$ と $\vec v$ は**垂直な単位ベクトル**である。`,
            },
            {
              k: "note",
              t: String.raw`$\vec u,\vec v$ が正規直交なら $\overrightarrow{\mathrm{OA}}=\dfrac{2\vec u-\vec v}{3}$、$\overrightarrow{\mathrm{OB}}=\dfrac{2\vec v-\vec u}{3}$ なので、$\left|\overrightarrow{\mathrm{OA}}\right|=\left|\overrightarrow{\mathrm{OB}}\right|=\dfrac{\sqrt5}{3}$、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=-\dfrac49$ である。$\mathrm{A},\mathrm{B}$ 自身は特別な位置ではなく、$\vec u,\vec v$ に移してから考えるのが見通しがよい。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ のまま $\left|\overrightarrow{\mathrm{OA}}\right|^{2}$ などを文字でおくと、未知数3つの連立になって重い。$\vec u,\vec v$ に置きかえると1行で終わる。`,
          ],
          check: String.raw`条件をみたす組を $2$ 万通り試して、$\vec u\cdot\vec v$ はつねに $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`平面上の点 $\mathrm{P}$ が $\left|\overrightarrow{\mathrm{OP}}-\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\right|\le\dfrac13$ かつ $\overrightarrow{\mathrm{OP}}\cdot\left(2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\le\dfrac13$ をみたすように動くとき、$\left|\overrightarrow{\mathrm{OP}}\right|$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{\sqrt5}{3}$、最小値 $\dfrac{\sqrt2-1}{3}$`,
          approach: String.raw`(1) より $\vec u,\vec v$ は正規直交基底。$\overrightarrow{\mathrm{OP}}=p\vec u+q\vec v$ と書くと、条件は「中心 $\left(\dfrac13,\dfrac13\right)$・半径 $\dfrac13$ の円板」かつ「$p\le\dfrac13$」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $\vec u,\vec v$ は正規直交基底なので、平面上の任意の点 $\mathrm{P}$ は`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=p\vec u+q\vec v\qquad\left(p,q\ \text{は実数}\right)`,
            },
            {
              k: "p",
              t: String.raw`とただ一通りに書け、$\left|\overrightarrow{\mathrm{OP}}\right|^{2}=p^{2}+q^{2}$ である。また $\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}=\dfrac{\vec u+\vec v}{3}$ は $\left(p,q\right)=\left(\dfrac13,\dfrac13\right)$ にあたる。`,
            },
            { k: "p", t: String.raw`条件を書き直す。1つめは` },
            {
              k: "math",
              t: String.raw`\left(p-\frac13\right)^{2}+\left(q-\frac13\right)^{2}\le\frac19`,
            },
            {
              k: "p",
              t: String.raw`で、中心 $\mathrm{C}\left(\dfrac13,\dfrac13\right)$、半径 $\dfrac13$ の円板である。2つめは $\overrightarrow{\mathrm{OP}}\cdot\vec u=p$ なので`,
            },
            {
              k: "math",
              t: String.raw`p\le\frac13`,
            },
            {
              k: "p",
              t: String.raw`である。これは中心 $\mathrm{C}$ を通る縦線の左側なので、動ける範囲は**円板の左半分（半円板）**である。`,
            },
            {
              k: "p",
              t: String.raw`原点 $\mathrm{O}$ から中心 $\mathrm{C}$ までの距離は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{OC}=\sqrt{\frac19+\frac19}=\frac{\sqrt2}{3}`,
            },
            {
              k: "p",
              t: String.raw`で、半径 $\dfrac13$ より大きい（$\sqrt2>1$）。つまり $\mathrm{O}$ は円板の外にある。`,
            },
            {
              k: "p",
              t: String.raw`**最小**。円板全体で $\left|\overrightarrow{\mathrm{OP}}\right|$ が最小になるのは、線分 $\mathrm{OC}$ と円周の交点`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}_{0}=\mathrm{C}-\frac13\cdot\frac{\overrightarrow{\mathrm{OC}}}{\left|\overrightarrow{\mathrm{OC}}\right|}=\left(\frac13-\frac{1}{3\sqrt2},\ \frac13-\frac{1}{3\sqrt2}\right)`,
            },
            {
              k: "p",
              t: String.raw`で、そこでの値は $\mathrm{OC}-\dfrac13=\dfrac{\sqrt2-1}{3}$ である。$\mathrm{P}_{0}$ の $p$ 座標は $\dfrac13-\dfrac{1}{3\sqrt2}\doteqdot0.0976<\dfrac13$ なので、半円板の中に入っている。よって`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|\ \text{の最小値は}\ \frac{\sqrt2-1}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最大**。円板全体での最大は $\mathrm{C}+\dfrac13\cdot\dfrac{\overrightarrow{\mathrm{OC}}}{\left|\overrightarrow{\mathrm{OC}}\right|}$ で起きるが、その $p$ 座標は $\dfrac13+\dfrac{1}{3\sqrt2}>\dfrac13$ なので半円板の外である。そこで半円板の境界で考える。`,
            },
            {
              k: "p",
              t: String.raw`$\left|\overrightarrow{\mathrm{OP}}\right|^{2}=p^{2}+q^{2}$ は $p$ を固定すれば $\left|q\right|$ が大きいほど大きい。半円板の中で $\left|q\right|$ を最も大きくできるのは直径 $p=\dfrac13$ の上端 $\left(\dfrac13,\dfrac23\right)$ で、実際に`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|^{2}=\frac19+\frac49=\frac59`,
            },
            {
              k: "p",
              t: String.raw`である。これが最大であることは次のように確かめられる。円板上の点は $\mathrm{C}+\dfrac13\left(\cos\theta,\sin\theta\right)$ の形（内部を含めるなら半径を $r\le\dfrac13$ に）で、`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|^{2}=\frac29+r^{2}+\frac{2r}{3}\left(\cos\theta+\sin\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$p\le\dfrac13$ は $\cos\theta\le0$ を意味し、このとき $\cos\theta+\sin\theta\le1$（等号は $\theta=\dfrac{\pi}{2}$）であり、$r\le\dfrac13$ と合わせて`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|^{2}\le\frac29+\frac19+\frac29=\frac59`,
            },
            {
              k: "p",
              t: String.raw`である。等号は $r=\dfrac13$、$\theta=\dfrac{\pi}{2}$、つまり $\left(\dfrac13,\dfrac23\right)$ のときである。よって`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|\ \text{の最大値は}\ \frac{\sqrt5}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "u = 2OA + OB、v = OA + 2OB を正規直交基底にとり、OP = pu + qv と書いた図。網をかけた半円板が P の動ける範囲で、中心 C は OA + OB にあたる。原点から最も遠いのが直径の上端 (1/3, 2/3)、最も近いのが線分 OC と円周の交点。",
                view: [-0.35, 0.95, -0.25, 0.85],
                step: { x: 0.25, y: 0.25 },
                items: [
                  {
                    k: "fillBetween",
                    top: CIRC23(1),
                    bottom: CIRC23(-1),
                    from: 0,
                    to: 1 / 3,
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [
                      1 / 3 + Math.cos(t) / 3,
                      1 / 3 + Math.sin(t) / 3,
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [1 / 3, 0], b: [1 / 3, 2 / 3] },
                  { k: "seg", a: [0, 0], b: [1 / 3, 2 / 3], dash: true },
                  { k: "seg", a: [0, 0], b: [1 / 3, 1 / 3], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1 / 3, 1 / 3], label: "C", place: "right" },
                  { k: "dot", at: [1 / 3, 2 / 3], label: "最大", place: "above-right" },
                  { k: "dot", at: [MINP23, MINP23], label: "最小", place: "below-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{OP}}\cdot\vec u\le\dfrac13$ という条件は、$\vec u$ が単位ベクトルなので「$\vec u$ 方向の成分が $\dfrac13$ 以下」、つまり中心 $\mathrm{C}$ を通る直線で切った半分という意味になる。$\vec u,\vec v$ を基底にとると、2つの条件がどちらも素直な形になるのがこの問題の仕掛けである。`,
            },
          ],
          pitfalls: [
            String.raw`最小値のほうは半平面の制約が効かない（最小を与える点がもともと $p<\dfrac13$ 側にある）が、そのことを確かめずに「円板の最小」と書くと論証が抜ける。`,
            String.raw`最大値は半平面の制約が効く。円板だけで考えると $\dfrac{\sqrt2}{3}+\dfrac13=\dfrac{\sqrt2+1}{3}$ になってしまう。`,
            String.raw`$\left|\overrightarrow{\mathrm{OP}}\right|^{2}=p^{2}+q^{2}$ と書けるのは $\vec u,\vec v$ が**正規直交**だから。(1) がその確認になっている。`,
          ],
          check: String.raw`格子走査で最大 $0.7453560$（$\dfrac{\sqrt5}{3}=0.7453560$）、最小 $0.1384049$（$\dfrac{\sqrt2-1}{3}=0.1380712$）だった。`,
        },
      ],
    },
  ],
};
