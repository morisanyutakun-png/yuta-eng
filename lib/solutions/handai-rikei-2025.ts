import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2025年度（令和7年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。$\cos\angle\mathrm{AOB}=\tfrac{\mathrm{OC}}{\mathrm{OA}}=\tfrac13$ なので角は固定。 */
const CS1 = 1 / 3;
const SN1 = Math.sqrt(1 - CS1 * CS1);
/** 図で使う $t$。 */
const T1 = 3.2;
const A1: [number, number] = [3 * CS1, 3 * SN1];
const B1: [number, number] = [T1, 0];
const P1: [number, number] = [(A1[0] + 2 * B1[0]) / 3, (A1[1] + 2 * B1[1]) / 3];
const R1: [number, number] = [(2 * T1 + 9) / (2 * T1 + 1), 0];

/** 第2問。$f\left(\alpha\right)-f\left(\beta\right)=4$ のときの変曲点が描く曲線。 */
const C2 = (x: number): number => x ** 3 - 3 * x;
/** 図で使う $p$ とそのときの $f$。 */
const P2 = -1.4;
const M2 = P2 * P2 - 1;
const F2 = (x: number): number => x ** 3 + 3 * P2 * x * x + 3 * M2 * x;

/** 第3問の楕円 $3x^{2}+\left(y+1\right)^{2}=3$。 */
const E3 = (t: number): [number, number] => [Math.cos(t), -1 + Math.sqrt(3) * Math.sin(t)];

export const handaiRikei2025: SolutionSet = {
  slug: "handai-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "ベクトル",
      topics: ["内積と正射影", "垂線の足", "内分点", "線分上にある条件"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "座標で取り直すと $\\overrightarrow{\\mathrm{OA}}\\cdot\\overrightarrow{\\mathrm{OB}}=t$ になり、$\\mathrm{OR}=\\tfrac{2t+9}{2t+1}$ も一致した",
          "$t$ を $0.0001$ 刻みで動かして $\\tfrac t2\\leqq\\mathrm{OR}\\leqq t$ をみたす範囲を調べると $2.3861\\leqq t\\leqq3.8423$ だった",
          "$\\tfrac{1+\\sqrt{73}}4=2.3860009$、$\\tfrac{3\\left(1+\\sqrt{17}\\right)}4=3.8423292$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の三角形 $\mathrm{OAB}$ で $\angle\mathrm{AOB}$ は鋭角、$\mathrm{OA}=3$、$\mathrm{OB}=t$ とする。$\mathrm{A}$ から直線 $\mathrm{OB}$ に下ろした垂線の足を $\mathrm{C}$、$\mathrm{OC}=1$ とするとき、内積 $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}$ を $t$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=t$`,
          approach: String.raw`$\mathrm{OC}$ は $\overrightarrow{\mathrm{OA}}$ の $\overrightarrow{\mathrm{OB}}$ 方向への正射影の長さ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{C}$ は $\mathrm{A}$ から直線 $\mathrm{OB}$ に下ろした垂線の足なので、$\mathrm{OC}=\mathrm{OA}\left|\cos\angle\mathrm{AOB}\right|$ である。$\angle\mathrm{AOB}$ は鋭角だから $\cos\angle\mathrm{AOB}>0$ で`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{AOB}=\frac{\mathrm{OC}}{\mathrm{OA}}=\frac13`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=\mathrm{OA}\cdot\mathrm{OB}\cos\angle\mathrm{AOB}=3\cdot t\cdot\frac13=t`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{OA}=3$ と $\mathrm{OC}=1$ で $\angle\mathrm{AOB}$ は $\arccos\dfrac13$ に**固定**される。動くのは $t=\mathrm{OB}$ だけである。`,
            },
          ],
          check: String.raw`座標で取り直すと内積はどの $t$ でも $t$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`線分 $\mathrm{AB}$ を $2:1$ に内分する点を $\mathrm{P}$、$\mathrm{A}$ から直線 $\mathrm{OP}$ に下ろした垂線と直線 $\mathrm{OB}$ の交点を $\mathrm{R}$ とする。線分 $\mathrm{OR}$ の長さを $t$ で表す`,
          answer: String.raw`$\mathrm{OR}=\dfrac{2t+9}{2t+1}$`,
          approach: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$ とし、$\overrightarrow{\mathrm{OR}}=s\vec b$ とおいて $\overrightarrow{\mathrm{AR}}\cdot\overrightarrow{\mathrm{OP}}=0$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a\cdot\vec b=t$、$\left|\vec a\right|^{2}=9$、$\left|\vec b\right|^{2}=t^{2}$ である。$\mathrm{P}$ は $\mathrm{AB}$ を $2:1$ に内分するので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac{\vec a+2\vec b}{3}`,
            },
            { k: "p", t: String.raw`である。$\mathrm{R}$ は直線 $\mathrm{OB}$ 上なので $\overrightarrow{\mathrm{OR}}=s\vec b$ とおける。$\mathrm{AR}\perp\mathrm{OP}$ より` },
            {
              k: "math",
              t: String.raw`\left(s\vec b-\vec a\right)\cdot\left(\vec a+2\vec b\right)=0`,
            },
            { k: "p", t: String.raw`である。展開すると` },
            {
              k: "math",
              t: String.raw`s\left(\vec a\cdot\vec b\right)+2s\left|\vec b\right|^{2}-\left|\vec a\right|^{2}-2\left(\vec a\cdot\vec b\right)=0`,
            },
            { k: "p", t: String.raw`すなわち $st+2st^{2}=9+2t$ である。$t>0$ より` },
            {
              k: "math",
              t: String.raw`s=\frac{2t+9}{t\left(2t+1\right)}>0`,
            },
            { k: "p", t: String.raw`となる。$s>0$ なので $\mathrm{R}$ は半直線 $\mathrm{OB}$ 上にあり` },
            {
              k: "math",
              t: String.raw`\mathrm{OR}=s\left|\vec b\right|=st=\frac{2t+9}{2t+1}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=1,3,5$ などで座標から求めた $\mathrm{OR}$ とこの式が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`線分 $\mathrm{OB}$ の中点を $\mathrm{M}$ とする。$\mathrm{R}$ が線分 $\mathrm{MB}$ 上にあるときの $t$ の範囲を求める`,
          answer: String.raw`$\dfrac{1+\sqrt{73}}{4}\leqq t\leqq\dfrac{3\left(1+\sqrt{17}\right)}{4}$`,
          approach: String.raw`$\mathrm{R}$ は半直線 $\mathrm{OB}$ 上なので、条件は $\dfrac t2\leqq\mathrm{OR}\leqq t$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OM}=\dfrac t2$、$\mathrm{OB}=t$ で、$\mathrm{R}$ は半直線 $\mathrm{OB}$ 上にあるから、$\mathrm{R}$ が線分 $\mathrm{MB}$ 上にある条件は`,
            },
            {
              k: "math",
              t: String.raw`\frac t2\leqq\frac{2t+9}{2t+1}\leqq t`,
            },
            { k: "p", t: String.raw`である（$2t+1>0$）。` },
            { k: "p", t: String.raw`**右の不等式**：両辺に $2t+1>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`2t+9\leqq t\left(2t+1\right),\qquad2t^{2}-t-9\geqq0`,
            },
            {
              k: "p",
              t: String.raw`である。$2t^{2}-t-9=0$ の解は $t=\dfrac{1\pm\sqrt{73}}{4}$ で、$t>0$ だから`,
            },
            { k: "math", t: String.raw`t\geqq\frac{1+\sqrt{73}}{4}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**左の不等式**：同じく両辺に $2\left(2t+1\right)>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`t\left(2t+1\right)\leqq2\left(2t+9\right),\qquad2t^{2}-3t-18\leqq0`,
            },
            {
              k: "p",
              t: String.raw`である。$2t^{2}-3t-18=0$ の解は $t=\dfrac{3\pm\sqrt{153}}{4}=\dfrac{3\pm3\sqrt{17}}{4}$ なので`,
            },
            { k: "math", t: String.raw`t\leqq\frac{3\left(1+\sqrt{17}\right)}{4}` },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{1+\sqrt{73}}{4}\leqq t\leqq\frac{3\left(1+\sqrt{17}\right)}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（$2.386\ldots\leqq t\leqq3.842\ldots$）。この範囲は $t>0$ に含まれるので、ほかの条件は要らない。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "三角形 OAB と点 P, R, M（図は t = 3.2 のとき）。∠AOB は cos が 1/3 に固定されている。点線は AR で、直線 OP と垂直。R が M と B のあいだに入る t の範囲を聞いている。",
                view: [-0.7, 4.4, -0.7, 3.3],
                items: [
                  { k: "seg", a: [0, 0], b: A1 },
                  { k: "seg", a: [0, 0], b: [4.1, 0] },
                  { k: "seg", a: A1, b: B1 },
                  { k: "seg", a: [0, 0], b: [P1[0] * 1.25, P1[1] * 1.25], faint: true },
                  { k: "seg", a: A1, b: R1, dash: true },
                  { k: "seg", a: A1, b: [A1[0], 0], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: A1, label: "A", place: "above-left" },
                  { k: "dot", at: B1, label: "B", place: "below-right" },
                  { k: "dot", at: [A1[0], 0], label: "C", place: "below-left" },
                  { k: "dot", at: P1, label: "P", place: "right" },
                  { k: "dot", at: R1, label: "R", place: "below" },
                  { k: "dot", at: [T1 / 2, 0], label: "M", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{R}$ が半直線 $\mathrm{OB}$ のどちら側にあるかを (2) で確かめてある（$s>0$）。確かめずに長さだけで議論しない。`,
          ],
          check: String.raw`$t$ を $0.0001$ 刻みで走査すると、条件をみたすのは $2.3861\leqq t\leqq3.8423$ で、式の値 $2.3860009$ と $3.8423292$ に一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分（3次関数）",
      topics: ["極大と極小の差", "解と係数の関係", "変曲点", "軌跡"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(p,m\\right)=\\left(0.5,-1\\right),\\left(2,1\\right),\\left(-1,-3\\right)$ で $f\\left(\\alpha\\right)-f\\left(\\beta\\right)$ が $4\\left(p^{2}-m\\right)^{\\frac32}$ と一致した",
          "$m=p^{2}-1$ とすると $f\\left(\\alpha\\right)-f\\left(\\beta\\right)$ はどの $p$ でも $4$ になった",
          "そのときの変曲点は $p=-2,-0.5,0,1,2.5$ で $\\left(-p,-p^{3}+3p\\right)$ となり、$y=x^{3}-3x$ の上にあった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=x^{3}+3px^{2}+3mx$ が $x=\alpha$ で極大値、$x=\beta$ で極小値をとるとき、$f\left(\alpha\right)-f\left(\beta\right)$ を $p,m$ で表す`,
          answer: String.raw`$f\left(\alpha\right)-f\left(\beta\right)=4\left(p^{2}-m\right)^{\frac32}$（ただし $p^{2}>m$）`,
          approach: String.raw`$f\left(\alpha\right)-f\left(\beta\right)=\displaystyle\int_{\beta}^{\alpha}f'\,dx$ と見ると、$\left(\beta-\alpha\right)^{3}$ の形にまとまる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=3x^{2}+6px+3m=3\left(x^{2}+2px+m\right)`,
            },
            {
              k: "p",
              t: String.raw`である。極大と極小をもつので $f'=0$ は相異なる2実解 $\alpha<\beta$ をもち、判別式より $p^{2}-m>0$ である。解と係数の関係から`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta=-2p,\qquad\alpha\beta=m,\qquad\beta-\alpha=2\sqrt{p^{2}-m}`,
            },
            { k: "p", t: String.raw`である。$f'=3\left(x-\alpha\right)\left(x-\beta\right)$ なので` },
            {
              k: "math",
              t: String.raw`f\left(\alpha\right)-f\left(\beta\right)=\int_{\beta}^{\alpha}f'\left(x\right)dx=-3\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx`,
            },
            { k: "p", t: String.raw`である。よく知られた公式 $\displaystyle\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=-\frac{\left(\beta-\alpha\right)^{3}}{6}$ から` },
            {
              k: "math",
              t: String.raw`f\left(\alpha\right)-f\left(\beta\right)=\frac{\left(\beta-\alpha\right)^{3}}{2}=\frac{\left(2\sqrt{p^{2}-m}\right)^{3}}{2}=4\left(p^{2}-m\right)^{\frac32}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\alpha$ が極大、$\beta$ が極小なので $\alpha<\beta$。向きを逆にすると符号を間違える。`,
            },
          ],
          check: String.raw`3組の $\left(p,m\right)$ で、極値を直接計算した差とこの式が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$p,m$ が $f\left(\alpha\right)-f\left(\beta\right)=4$ をみたしながら動くとき、曲線 $y=f\left(x\right)$ の変曲点の軌跡を求める`,
          answer: String.raw`曲線 $y=x^{3}-3x$ 全体`,
          approach: String.raw`条件から $m=p^{2}-1$。変曲点は $f''=0$ の $x=-p$。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $4\left(p^{2}-m\right)^{\frac32}=4$、つまり $p^{2}-m=1$ なので` },
            { k: "math", t: String.raw`m=p^{2}-1` },
            { k: "p", t: String.raw`である（このとき $p^{2}-m=1>0$ なので、確かに極大・極小をもつ）。` },
            { k: "p", t: String.raw`$f''\left(x\right)=6x+6p$ なので変曲点の $x$ 座標は $x=-p$ で、` },
            {
              k: "math",
              t: String.raw`y=f\left(-p\right)=-p^{3}+3p^{3}-3mp=2p^{3}-3p\left(p^{2}-1\right)=-p^{3}+3p`,
            },
            { k: "p", t: String.raw`である。変曲点を $\left(X,Y\right)$ とすると $X=-p$、つまり $p=-X$ なので` },
            {
              k: "math",
              t: String.raw`Y=-\left(-X\right)^{3}+3\left(-X\right)=X^{3}-3X`,
            },
            {
              k: "p",
              t: String.raw`である。$p$ は実数全体を動けるので $X$ も実数全体を動く。したがって軌跡は曲線`,
            },
            { k: "math", t: String.raw`y=x^{3}-3x` },
            { k: "p", t: String.raw`の**全体**である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "変曲点の軌跡 y = x³ − 3x（太線）。細い曲線は p = −1.4（m = p² − 1）のときの y = f(x) で、その変曲点が軌跡の上に乗っている。",
                view: [-3.4, 3.4, -4.6, 4.6],
                items: [
                  { k: "curve", f: F2, from: -0.5, to: 3.4, faint: true },
                  { k: "curve", f: C2, from: -2.4, to: 2.4 },
                  { k: "dot", at: [-P2, C2(-P2)], label: "変曲点", place: "right" },
                  { k: "text", at: [-2.0, C2(-2.0)], label: "y = x³ − 3x", place: "below-left" },
                  { k: "text", at: [3.0, F2(3.0)], label: "y = f(x)", place: "below" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$f\left(\alpha\right)-f\left(\beta\right)$ が一定なら「極値の高さの差」が一定。その条件が $p^{2}-m=1$ という、$p$ と $m$ の間のきれいな関係になる。`,
            },
          ],
          pitfalls: [
            String.raw`「軌跡を求めよ」なので、動ける範囲（ここでは全体）まで答える。$X$ が全実数をとることを一言添える。`,
          ],
          check: String.raw`$p=-2,-0.5,0,1,2.5$ で変曲点を計算すると、どれも $y=x^{3}-3x$ の上にあった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["空間の角と内積", "軌跡が楕円になる", "積の最大最小", "端点の扱い"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(x,y\\right)=\\left(\\tfrac12,\\tfrac12\\right)$ と $\\left(-\\tfrac{\\sqrt6}3,0\\right)$ で $\\cos\\angle\\mathrm{OAP}=0.866025404=\\cos30^{\\circ}$ になった",
          "$3x^{2}+\\left(y+1\\right)^{2}=3$ かつ $y\\geqq0$ を $200$ 万点走査すると、最大は $2.2500000$（$\\tfrac94$）で $\\left(0.5,0.5\\right)$ だった",
          "最小は $0.1835034$ で $\\left(-0.8164966,0\\right)$、$1-\\tfrac{\\sqrt6}3=0.1835034$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`座標空間の3点 $\mathrm{O}\left(0,0,0\right)$、$\mathrm{A}\left(0,1,1\right)$、$\mathrm{P}\left(x,y,0\right)$ について、$\angle\mathrm{OAP}=30^{\circ}$ かつ $y\geqq0$ をみたすように $\mathrm{P}$ が動くとき、$\left(x+1\right)\left(y+1\right)$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac94$（$\left(x,y\right)=\left(\dfrac12,\dfrac12\right)$）、最小値 $1-\dfrac{\sqrt6}{3}$（$\left(x,y\right)=\left(-\dfrac{\sqrt6}{3},0\right)$）`,
          approach: String.raw`$\angle\mathrm{OAP}=30^{\circ}$ を内積で書くと、$\mathrm{P}$ は楕円の上を動く。1変数に直して微分する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{AO}}=\left(0,-1,-1\right)$、$\overrightarrow{\mathrm{AP}}=\left(x,y-1,-1\right)$ で $\left|\overrightarrow{\mathrm{AO}}\right|=\sqrt2$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}=-\left(y-1\right)+1=2-y`,
            },
            { k: "p", t: String.raw`なので、$\cos30^{\circ}=\dfrac{\sqrt3}{2}$ より` },
            {
              k: "math",
              t: String.raw`\frac{2-y}{\sqrt2\sqrt{x^{2}+\left(y-1\right)^{2}+1}}=\frac{\sqrt3}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$2-y>0$ に注意して両辺を2乗し、整理すると`,
            },
            {
              k: "math",
              t: String.raw`4\left(2-y\right)^{2}=6\left\{x^{2}+\left(y-1\right)^{2}+1\right\},\qquad3x^{2}+y^{2}+2y-2=0`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`3x^{2}+\left(y+1\right)^{2}=3\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`である。これは中心 $\left(0,-1\right)$、$x$ 方向の半径 $1$、$y$ 方向の半径 $\sqrt3$ の楕円である。$y\geqq0$ の部分では $y+1\geqq1>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`y+1=\sqrt{3\left(1-x^{2}\right)}`,
            },
            {
              k: "p",
              t: String.raw`で、$y\geqq0$ は $3\left(1-x^{2}\right)\geqq1$、つまり $x^{2}\leqq\dfrac23$ と同じである。また $y\leqq\sqrt3-1<2$ なので $2-y>0$ も自動的に満たされる。`,
            },
            { k: "p", t: String.raw`$F=\left(x+1\right)\left(y+1\right)$ とおくと` },
            {
              k: "math",
              t: String.raw`F\left(x\right)=\sqrt3\left(x+1\right)\sqrt{1-x^{2}}\qquad\left(-\frac{\sqrt6}{3}\leqq x\leqq\frac{\sqrt6}{3}\right)`,
            },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`F'\left(x\right)=\sqrt3\cdot\frac{\left(1-x^{2}\right)-x\left(x+1\right)}{\sqrt{1-x^{2}}}=\frac{-\sqrt3\left(2x-1\right)\left(x+1\right)}{\sqrt{1-x^{2}}}`,
            },
            {
              k: "p",
              t: String.raw`である（分子は $-2x^{2}-x+1=-\left(2x-1\right)\left(x+1\right)$）。定義域では $x+1>0$ なので、符号は $-\left(2x-1\right)$ で決まり、$x=\dfrac12$ の前後で正から負に変わる。$\dfrac12<\dfrac{\sqrt6}{3}=0.816\ldots$ なので $x=\dfrac12$ は定義域の内部にある。`,
            },
            { k: "p", t: String.raw`したがって最大は $x=\dfrac12$ のときで` },
            {
              k: "math",
              t: String.raw`F\left(\frac12\right)=\sqrt3\cdot\frac32\cdot\sqrt{\frac34}=\sqrt3\cdot\frac32\cdot\frac{\sqrt3}{2}=\frac94`,
            },
            {
              k: "p",
              t: String.raw`である（このとき $y+1=\dfrac32$ より $y=\dfrac12$）。最小は端点のどちらかで、$x^{2}=\dfrac23$ のとき $\sqrt{1-x^{2}}=\dfrac{1}{\sqrt3}$ だから`,
            },
            {
              k: "math",
              t: String.raw`F\left(\pm\frac{\sqrt6}{3}\right)=\sqrt3\left(\pm\frac{\sqrt6}{3}+1\right)\cdot\frac{1}{\sqrt3}=1\pm\frac{\sqrt6}{3}`,
            },
            { k: "p", t: String.raw`である。小さいほうをとって` },
            {
              k: "math",
              t: String.raw`\left(\text{最小値}\right)=1-\frac{\sqrt6}{3}`,
            },
            {
              k: "p",
              t: String.raw`である（このとき $x=-\dfrac{\sqrt6}{3}$、$y=0$）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "P の軌跡。楕円 3x² + (y + 1)² = 3 のうち y ≧ 0 の部分（太線）だけを動く。塗りはないが、両端は y = 0 の点で、そこも含む。",
                view: [-2.0, 2.0, -2.5, 1.2],
                items: [
                  { k: "param", f: E3, from: 0, to: 2 * Math.PI, faint: true },
                  {
                    k: "param",
                    f: E3,
                    from: Math.asin(1 / Math.sqrt(3)),
                    to: Math.PI - Math.asin(1 / Math.sqrt(3)),
                  },
                  { k: "dot", at: [0.5, 0.5], label: "最大", place: "above-right" },
                  { k: "dot", at: [-Math.sqrt(6) / 3, 0], label: "最小", place: "below-left" },
                  { k: "dot", at: [Math.sqrt(6) / 3, 0], place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`2乗するので $2-y>0$ を確かめる。また $y\geqq0$ で定義域が $\left|x\right|\leqq\dfrac{\sqrt6}{3}$ に切れるので、最小は端点になる。`,
          ],
          check: String.raw`$200$ 万点走査すると最大 $2.2500000$（$\left(0.5,0.5\right)$）、最小 $0.1835034$（$\left(-0.8164966,0\right)$）で、式の値と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分（評価と極限）",
      topics: ["絶対値による評価", "部分積分", "積和の公式", "区間のずらし"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$t=1,5,50,500$ で $\\left|\\displaystyle\\int_t^{2t}\\tfrac{\\sin x}{x^{2}}dx\\right|<\\tfrac1t$ が成り立った",
          "$\\displaystyle\\int_t^{2t}\\tfrac{\\cos x}xdx$ は $t=50$ で $0.00048$、$t=500$ で $0.0018$ と $0$ に近づいた",
          "$\\displaystyle\\int_1^t\\tfrac{f\\left(x\\right)}xdx$ は $t=10^{3},10^{4}$ で $0.04297,0.04276$ となり、$\\tfrac12\\displaystyle\\int_1^2\\tfrac{\\cos x}xdx=0.0427885$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$t>0$ のとき $-\dfrac1t<\displaystyle\int_{t}^{2t}\frac{\sin x}{x^{2}}dx<\dfrac1t$ が成り立つことを示す`,
          answer: String.raw`$\left|\displaystyle\int_t^{2t}\frac{\sin x}{x^{2}}dx\right|\leqq\int_t^{2t}\frac{dx}{x^{2}}=\frac{1}{2t}<\frac1t$`,
          approach: String.raw`$\left|\sin x\right|\leqq1$ で上からおさえる。`,
          blocks: [
            { k: "p", t: String.raw`$t>0$ なので $t\leqq x\leqq2t$ では $x>0$ である。$\left|\sin x\right|\leqq1$ より` },
            {
              k: "math",
              t: String.raw`\left|\int_{t}^{2t}\frac{\sin x}{x^{2}}dx\right|\leqq\int_{t}^{2t}\frac{\left|\sin x\right|}{x^{2}}dx\leqq\int_{t}^{2t}\frac{dx}{x^{2}}=\left[-\frac1x\right]_{t}^{2t}=\frac1t-\frac1{2t}=\frac{1}{2t}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{1}{2t}<\dfrac1t$ だから`,
            },
            {
              k: "math",
              t: String.raw`-\frac1t<\int_{t}^{2t}\frac{\sin x}{x^{2}}dx<\frac1t`,
            },
            { k: "p", t: String.raw`である。（証明終わり）` },
          ],
          check: String.raw`$t=1,5,50,500$ で数値積分すると、どれも $\dfrac1t$ より小さかった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{t\to\infty}\int_{t}^{2t}\frac{\cos x}{x}dx=0$ を示す`,
          answer: String.raw`部分積分して $\dfrac{\sin2t}{2t}-\dfrac{\sin t}{t}+\displaystyle\int_t^{2t}\frac{\sin x}{x^{2}}dx$。3つとも $0$ に行く`,
          approach: String.raw`$\dfrac1x$ を微分する側にとって部分積分すると、(1) の形が出る。`,
          blocks: [
            { k: "p", t: String.raw`$\left(\sin x\right)'=\cos x$ を使って部分積分すると` },
            {
              k: "math",
              t: String.raw`\int_{t}^{2t}\frac{\cos x}{x}dx=\left[\frac{\sin x}{x}\right]_{t}^{2t}+\int_{t}^{2t}\frac{\sin x}{x^{2}}dx=\frac{\sin2t}{2t}-\frac{\sin t}{t}+\int_{t}^{2t}\frac{\sin x}{x^{2}}dx`,
            },
            { k: "p", t: String.raw`である。$\left|\sin\right|\leqq1$ と (1) より` },
            {
              k: "math",
              t: String.raw`\left|\int_{t}^{2t}\frac{\cos x}{x}dx\right|\leqq\frac{1}{2t}+\frac1t+\frac1t=\frac{5}{2t}`,
            },
            {
              k: "p",
              t: String.raw`である。$t\to\infty$ で右辺は $0$ に行くので、はさみうちの原理より`,
            },
            {
              k: "math",
              t: String.raw`\lim_{t\to\infty}\int_{t}^{2t}\frac{\cos x}{x}dx=0`,
            },
            { k: "p", t: String.raw`である。（証明終わり）` },
          ],
          check: String.raw`$t=50$ で $0.00048$、$t=500$ で $0.0018$ と、$0$ の近くにとどまった。`,
        },
        {
          label: "(3)",
          task: String.raw`$f\left(x\right)=\sin\dfrac{3x}{2}\sin\dfrac{x}{2}$ とするとき、$\displaystyle\lim_{t\to\infty}\int_{1}^{t}\frac{f\left(x\right)}{x}dx=\frac12\int_{1}^{2}\frac{\cos x}{x}dx$ を示す`,
          answer: String.raw`積和の公式で $f=\dfrac{\cos x-\cos2x}{2}$。置換して区間をずらすと (2) が効く`,
          approach: String.raw`$\displaystyle\int_1^t\frac{\cos2x}{x}dx=\int_2^{2t}\frac{\cos x}{x}dx$ と直すのがかぎ。`,
          blocks: [
            { k: "p", t: String.raw`積和の公式より` },
            {
              k: "math",
              t: String.raw`f\left(x\right)=\sin\frac{3x}{2}\sin\frac{x}{2}=\frac12\left(\cos x-\cos2x\right)`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\int_{1}^{t}\frac{f\left(x\right)}{x}dx=\frac12\int_{1}^{t}\frac{\cos x}{x}dx-\frac12\int_{1}^{t}\frac{\cos2x}{x}dx`,
            },
            { k: "p", t: String.raw`である。後ろの積分で $u=2x$ とおくと $\dfrac{dx}{x}=\dfrac{du}{u}$ なので` },
            {
              k: "math",
              t: String.raw`\int_{1}^{t}\frac{\cos2x}{x}dx=\int_{2}^{2t}\frac{\cos u}{u}du`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\int_{1}^{t}\frac{f}{x}dx=\frac12\left(\int_{1}^{t}\frac{\cos x}{x}dx-\int_{2}^{2t}\frac{\cos x}{x}dx\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$t>2$ として区間を分けると、$\displaystyle\int_2^t$ が共通で消えて`,
            },
            {
              k: "math",
              t: String.raw`=\frac12\left(\int_{1}^{2}\frac{\cos x}{x}dx-\int_{t}^{2t}\frac{\cos x}{x}dx\right)`,
            },
            { k: "p", t: String.raw`となる。(2) より第2項は $t\to\infty$ で $0$ に行くので` },
            {
              k: "math",
              t: String.raw`\lim_{t\to\infty}\int_{1}^{t}\frac{f\left(x\right)}{x}dx=\frac12\int_{1}^{2}\frac{\cos x}{x}dx`,
            },
            { k: "p", t: String.raw`である。（証明終わり）` },
            {
              k: "note",
              t: String.raw`$\dfrac{\cos2x}{x}$ の積分が $\dfrac{\cos u}{u}$ の積分に化けるのは、$\dfrac{dx}{x}$ が「比の形」で倍率に鈍感だから。この手の「$\log$ 的な積分」でよく使う。`,
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\int_1^t\frac{\cos2x}{x}dx$ を $\displaystyle\int_2^{2t}$ に直すとき、下端も $2$ になる。上端だけ変えない。`,
          ],
          check: String.raw`$t=10^{3},10^{4}$ で左辺は $0.04297,0.04276$ となり、右辺 $0.0427885$ に近づいた。`,
        },
      ],
    },
    {
      no: 5,
      field: "確率",
      topics: ["文字列の入れかえ", "偶奇で場合を分ける", "対称性", "確率の漸化式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $16$ まで分数のまま全状態を追うと、奇数 $n$ では $p_n=q_n=0$ だった",
          "$p_{2k}-q_{2k}$ は $k=1,\\ldots,8$ で $\\left(\\tfrac14\\right)^{k}$ と一致した",
          "偶数 $n$ では $p_n=\\tfrac13\\left(1+2^{1-n}\\right)$ と一致した（$p_2=\\tfrac12$、$p_4=\\tfrac38$、$p_6=\\tfrac{11}{32}$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{A},\mathrm{B},\mathrm{C}$ を並べた文字列に対し、表なら1文字目と2文字目、裏なら2文字目と3文字目を入れかえる。$\mathrm{ABC}$ から始めて $n$ 回後に $\mathrm{ABC}$ である確率を $p_n$、$\mathrm{BCA}$ である確率を $q_n$ とするとき、$p_{2k}-q_{2k}$ を求める`,
          answer: String.raw`$p_{2k}-q_{2k}=\left(\dfrac14\right)^{k}$`,
          approach: String.raw`$2$ 回ぶんの操作を考えると、3つの「偶順列」の間の移り方が対称になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回の操作はどちらも「2文字の入れかえ」なので、$n$ 回後の並びは、もとの並びを $n$ 回入れかえたものである。入れかえ1回で**偶奇**が変わるので、$n$ が奇数のときは $\mathrm{ABC}$（入れかえ0回）にも $\mathrm{BCA}$（入れかえ2回）にもなれない。つまり奇数回後に現れるのは $\mathrm{BAC},\mathrm{ACB},\mathrm{CBA}$ の3つだけである。`,
            },
            {
              k: "p",
              t: String.raw`偶数回後に現れるのは $\mathrm{ABC},\mathrm{BCA},\mathrm{CAB}$ の3つである。$2$ 回の操作をまとめて考えると、たとえば $\mathrm{ABC}$ からは`,
            },
            {
              k: "steps",
              items: [
                String.raw`表表：$\mathrm{ABC}\to\mathrm{BAC}\to\mathrm{ABC}$`,
                String.raw`表裏：$\mathrm{ABC}\to\mathrm{BAC}\to\mathrm{BCA}$`,
                String.raw`裏表：$\mathrm{ABC}\to\mathrm{ACB}\to\mathrm{CAB}$`,
                String.raw`裏裏：$\mathrm{ABC}\to\mathrm{ACB}\to\mathrm{ABC}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので、$\mathrm{ABC}$ のままが $\dfrac12$、$\mathrm{BCA}$ と $\mathrm{CAB}$ がそれぞれ $\dfrac14$ である。$\mathrm{BCA}$、$\mathrm{CAB}$ から始めても同じように調べると、どの状態からも`,
            },
            {
              k: "p",
              t: String.raw`**自分自身に $\dfrac12$、ほかの2つにそれぞれ $\dfrac14$**`,
            },
            {
              k: "p",
              t: String.raw`となる。$a_k=p_{2k}$、$b_k=q_{2k}$、$c_k$ を $\mathrm{CAB}$ である確率とすると`,
            },
            {
              k: "math",
              t: String.raw`a_{k+1}=\frac12a_k+\frac14b_k+\frac14c_k,\qquad b_{k+1}=\frac14a_k+\frac12b_k+\frac14c_k`,
            },
            { k: "p", t: String.raw`である。差をとると $c_k$ が消えて` },
            {
              k: "math",
              t: String.raw`a_{k+1}-b_{k+1}=\frac14\left(a_k-b_k\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。$k=0$ のとき（$0$ 回後）$a_0=1$、$b_0=0$ なので $a_0-b_0=1$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`p_{2k}-q_{2k}=a_k-b_k=\left(\frac14\right)^{k}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$k=1,\ldots,8$ で全状態を分数のまま追うと、差は $\dfrac14,\dfrac1{16},\dfrac1{64},\ldots$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$n$ を正の整数とするとき $p_n$ を求める`,
          answer: String.raw`$n$ が奇数のとき $p_n=0$、$n$ が偶数のとき $p_n=\dfrac13\left(1+2^{1-n}\right)$`,
          approach: String.raw`(1) の漸化式で $b_k+c_k=1-a_k$ を使うと、$a_k$ だけの漸化式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ が奇数のときは (1) で見たとおり $\mathrm{ABC}$ にはなれないので $p_n=0$ である。`,
            },
            { k: "p", t: String.raw`$n=2k$ のときは、$a_k+b_k+c_k=1$ を使って` },
            {
              k: "math",
              t: String.raw`a_{k+1}=\frac12a_k+\frac14\left(b_k+c_k\right)=\frac12a_k+\frac14\left(1-a_k\right)=\frac14a_k+\frac14`,
            },
            { k: "p", t: String.raw`である。$a=\dfrac14a+\dfrac14$ を解くと $a=\dfrac13$ なので` },
            {
              k: "math",
              t: String.raw`a_{k}-\frac13=\frac14\left(a_{k-1}-\frac13\right)`,
            },
            { k: "p", t: String.raw`である。$a_0=1$ より $a_0-\dfrac13=\dfrac23$ だから` },
            {
              k: "math",
              t: String.raw`a_k=\frac13+\frac23\left(\frac14\right)^{k}`,
            },
            { k: "p", t: String.raw`である。$n=2k$ のとき $\left(\dfrac14\right)^{k}=2^{-2k}=2^{-n}$ なので` },
            {
              k: "math",
              t: String.raw`p_n=\frac13+\frac23\cdot2^{-n}=\frac13\left(1+2^{1-n}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n\to\infty$ では $p_n$ は偶数番目で $\dfrac13$ に近づく。$2$ 回ぶんの操作が3つの状態を対称に混ぜるので、行き着く先が $\dfrac13$ ずつになる。`,
            },
          ],
          pitfalls: [
            String.raw`偶奇で答えが変わる。奇数のとき $0$ だと先に言い切ってから、偶数の場合を計算する。`,
          ],
          check: String.raw`$p_2=\dfrac12$、$p_4=\dfrac38$、$p_6=\dfrac{11}{32}$、$p_8=\dfrac{43}{128}$ が式と一致し、奇数番目はすべて $0$ だった。`,
        },
      ],
    },
  ],
};
