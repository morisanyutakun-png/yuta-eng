import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2020年度（令和2年度）一般入試 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の $g\left(x\right)=\dfrac{x^{2}}{x^{3}+1}$。 */
const G20 = (x: number): number => (x * x) / (x ** 3 + 1);

/** 第3問の図で使う $t$。 */
const T3 = 0.95;
const A3: [number, number] = [Math.SQRT2 * T3, 0];
const B3: [number, number] = [
  (T3 + Math.sqrt(1 - T3 * T3)) / Math.SQRT2,
  (T3 - Math.sqrt(1 - T3 * T3)) / Math.SQRT2,
];
const TH3 = Math.atan2(B3[1], B3[0]);

/** 第3問(4) の断面図で使う $\left|x\right|+\left|y\right|\leqq a$ の $a$。 */
const SQ20 = 1.25;
/** 正方形の「すみ」のうち単位円の外にある部分。`rot` だけ回した頂点の列を返す。 */
const CORNER20 = (rot: number): [number, number][] => {
  const d = Math.sqrt(2 - SQ20 * SQ20);
  const f1 = Math.atan2((SQ20 - d) / 2, (SQ20 + d) / 2);
  const pts: [number, number][] = [];
  for (let i = 0; i <= 24; i++) {
    const ph = f1 - (2 * f1 * i) / 24;
    pts.push([Math.cos(ph), Math.sin(ph)]);
  }
  pts.push([SQ20, 0]);
  return pts.map(([x, y]): [number, number] => [
    x * Math.cos(rot) - y * Math.sin(rot),
    x * Math.sin(rot) + y * Math.cos(rot),
  ]);
};

/** 第4問の三角形。$\mathrm{OA}=8$、$\mathrm{OB}=10$、$\mathrm{AB}=12$。 */
const B4: [number, number] = [1.25, Math.sqrt(100 - 1.25 * 1.25)];
const G4: [number, number] = [4, (50 - 4 * 1.25) / Math.sqrt(100 - 1.25 * 1.25)];
const D4: [number, number] = [8 * (6 / 7), 0];
const E4: [number, number] = [B4[0] * (32 / 35), B4[1] * (32 / 35)];

export const nitech2020: SolutionSet = {
  slug: "nitech",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["積と合成の微分", "分数関数の増減", "定数を分離して解の個数", "極値をとる点の個数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f'$ と $g'$ の式は、$k$ と $x$ をいくつか変えて数値微分と一致した",
          "$g$ の極大値は $0.5291337$ で $\\tfrac{\\sqrt[3]4}3=0.5291337$、極小値は $g\\left(0\\right)=0$",
          "$2k\\left(x^{3}+1\\right)-3x^{2}=0$ の実数解を $k=-1,0,0.1,0.5,0.7,\\tfrac{\\sqrt[3]4}2,0.9,2$ で数えると $0,1,3,3,3,2,1,1$ 個、符号が変わるのは $0,0,3,3,1,1,1$ 個だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x>-1$ で $f\left(x\right)=\dfrac{e^{kx}}{\sqrt{x^{3}+1}}$（$k$ は定数）のとき $f'\left(x\right)$ を計算する`,
          answer: String.raw`$f'\left(x\right)=\dfrac{e^{kx}\left\{2k\left(x^{3}+1\right)-3x^{2}\right\}}{2\left(x^{3}+1\right)^{\frac32}}$`,
          approach: String.raw`$f=e^{kx}\left(x^{3}+1\right)^{-\frac12}$ と書いて積の微分。`,
          blocks: [
            { k: "p", t: String.raw`$x>-1$ では $x^{3}+1>0$ なので、$f\left(x\right)=e^{kx}\left(x^{3}+1\right)^{-\frac12}$ と書ける。積の微分で` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=ke^{kx}\left(x^{3}+1\right)^{-\frac12}+e^{kx}\cdot\left(-\frac12\right)\left(x^{3}+1\right)^{-\frac32}\cdot3x^{2}`,
            },
            { k: "p", t: String.raw`である。$\left(x^{3}+1\right)^{-\frac32}$ でくくると` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{e^{kx}}{2\left(x^{3}+1\right)^{\frac32}}\left\{2k\left(x^{3}+1\right)-3x^{2}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$e^{kx}>0$、$\left(x^{3}+1\right)^{\frac32}>0$ なので、**$f'$ の符号は $2k\left(x^{3}+1\right)-3x^{2}$ の符号だけで決まる**。(3)(4) はここが出発点になる。`,
            },
          ],
          check: String.raw`$k=-1,0.3,2$、$x=-0.5,0.2,1.3,3$ で数値微分と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$g\left(x\right)=\dfrac{x^{2}}{x^{3}+1}$（$x>-1$）の増減を調べ、極値を求める`,
          answer: String.raw`$x=0$ で極小値 $0$、$x=\sqrt[3]2$ で極大値 $\dfrac{\sqrt[3]4}{3}$`,
          approach: String.raw`商の微分。分子は $-x^{4}+2x=x\left(2-x^{3}\right)$ ときれいに因数分解できる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`g'\left(x\right)=\frac{2x\left(x^{3}+1\right)-x^{2}\cdot3x^{2}}{\left(x^{3}+1\right)^{2}}=\frac{-x^{4}+2x}{\left(x^{3}+1\right)^{2}}=\frac{x\left(2-x^{3}\right)}{\left(x^{3}+1\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。分母は正なので、符号は $x\left(2-x^{3}\right)$ で決まる。$g'=0$ となるのは $x=0,\sqrt[3]2$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-1<x<0$：$x<0$、$2-x^{3}>2>0$ なので $g'<0$（減少）`,
                String.raw`$0<x<\sqrt[3]2$：$x>0$、$2-x^{3}>0$ なので $g'>0$（増加）`,
                String.raw`$x>\sqrt[3]2$：$x>0$、$2-x^{3}<0$ なので $g'<0$（減少）`,
              ],
            },
            { k: "p", t: String.raw`よって $x=0$ で極小、$x=\sqrt[3]2$ で極大である。値は` },
            {
              k: "math",
              t: String.raw`g\left(0\right)=0,\qquad g\left(\sqrt[3]2\right)=\frac{\sqrt[3]4}{2+1}=\frac{\sqrt[3]4}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`端のようすも見ておく。$x\to-1+0$ では分母が $+0$、分子が $1$ に近づくので $g\to+\infty$。$x\to\infty$ では $g\sim\dfrac1x\to+0$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = g(x) のグラフ（x > −1）。x = −1 の右で +∞、x = 0 で極小 0、x = ∛2 で極大 ∛4/3、その後 +0 に近づく。点線は水平な直線 y = 2k/3 で、交点の個数が (3) の答えになる。",
                view: [-1.9, 5.3, -0.6, 2.6],
                items: [
                  { k: "seg", a: [-1, -0.6], b: [-1, 2.6], dash: true, faint: true },
                  { k: "curve", f: G20, from: -0.885, to: 5.3 },
                  { k: "seg", a: [-1.9, 0.35], b: [5.3, 0.35], dash: true },
                  { k: "dot", at: [Math.cbrt(2), Math.cbrt(4) / 3], label: "極大", place: "above-right" },
                  { k: "dot", at: [0, 0], label: "極小", place: "below-right" },
                  { k: "dot", at: [-0.5452, 0.35] },
                  { k: "dot", at: [0.6757, 0.35] },
                  { k: "dot", at: [2.7205, 0.35] },
                  { k: "text", at: [4.6, 0.35], label: "y = 2k/3", place: "above" },
                  { k: "text", at: [-1, 2.3], label: "x = −1", place: "left" },
                ],
              },
            },
          ],
          check: String.raw`極大値は $0.5291337$ で $\dfrac{\sqrt[3]4}3=0.5291337$ と一致し、$g'$ の式も数値微分と合った。`,
        },
        {
          label: "(3)",
          task: String.raw`方程式 $f'\left(x\right)=0$ の相異なる実数解の個数を求める`,
          answer: String.raw`$k<0$ のとき $0$ 個、$k=0$ のとき $1$ 個、$0<k<\dfrac{\sqrt[3]4}{2}$ のとき $3$ 個、$k=\dfrac{\sqrt[3]4}{2}$ のとき $2$ 個、$k>\dfrac{\sqrt[3]4}{2}$ のとき $1$ 個`,
          approach: String.raw`(1) より $f'=0$ は $2k=3g\left(x\right)$。(2) のグラフと水平な直線の交点の個数を数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より、$x>-1$ で $f'\left(x\right)=0$ は $2k\left(x^{3}+1\right)-3x^{2}=0$ と同じである。$x^{3}+1>0$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`2k=3\cdot\frac{x^{2}}{x^{3}+1}=3g\left(x\right),\qquad\text{つまり}\quad g\left(x\right)=\frac{2k}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。求める個数は、$y=g\left(x\right)$ のグラフと水平な直線 $y=\dfrac{2k}{3}$ の共有点の個数である。`,
            },
            {
              k: "p",
              t: String.raw`(2) より $g$ は $\left(-1,0\right)$ で $+\infty$ から $0$ まで減り、$\left(0,\sqrt[3]2\right)$ で $0$ から $\dfrac{\sqrt[3]4}{3}$ まで増え、$\left(\sqrt[3]2,\infty\right)$ で $\dfrac{\sqrt[3]4}{3}$ から $+0$ まで減る。$\dfrac{2k}{3}=c$ とおくと`,
            },
            {
              k: "steps",
              items: [
                String.raw`$c<0$：どの区間とも交わらない。$0$ 個`,
                String.raw`$c=0$：$x=0$ だけ。$1$ 個`,
                String.raw`$0<c<\dfrac{\sqrt[3]4}{3}$：3つの区間で1個ずつ。$3$ 個`,
                String.raw`$c=\dfrac{\sqrt[3]4}{3}$：1つめの区間で1個、あとの2区間は $x=\sqrt[3]2$ で1個。$2$ 個`,
                String.raw`$c>\dfrac{\sqrt[3]4}{3}$：1つめの区間だけ。$1$ 個`,
              ],
            },
            {
              k: "p",
              t: String.raw`$c=\dfrac{2k}{3}$ なので、$c=\dfrac{\sqrt[3]4}{3}$ は $k=\dfrac{\sqrt[3]4}{2}$ にあたる。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k<0$ のとき $0$ 個`,
                String.raw`$k=0$ のとき $1$ 個`,
                String.raw`$0<k<\dfrac{\sqrt[3]4}{2}$ のとき $3$ 個`,
                String.raw`$k=\dfrac{\sqrt[3]4}{2}$ のとき $2$ 個`,
                String.raw`$k>\dfrac{\sqrt[3]4}{2}$ のとき $1$ 個`,
              ],
            },
            {
              k: "note",
              t: String.raw`$\dfrac{\sqrt[3]4}{2}=\dfrac{2^{\frac23}}{2}=2^{-\frac13}=\dfrac{1}{\sqrt[3]2}$ である。$0.7937\ldots$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$k$ をかけたまま3次方程式として扱うと場合分けが重くなる。$k$ を分離して「グラフと水平な直線」に持ち込む。`,
          ],
          check: String.raw`$k=-1,0,0.1,0.5,0.7,\dfrac{\sqrt[3]4}2,0.9,2$ で数えると、順に $0,1,3,3,3,2,1,1$ 個だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$f\left(x\right)$ が極値をとる $x$ の値の個数を求める`,
          answer: String.raw`$k\leqq0$ のとき $0$ 個、$0<k<\dfrac{\sqrt[3]4}{2}$ のとき $3$ 個、$k\geqq\dfrac{\sqrt[3]4}{2}$ のとき $1$ 個`,
          approach: String.raw`解の個数ではなく**符号が変わる点**の個数。$g$ が極値をとる点で接するときは符号が変わらない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $f'$ の符号は $2k\left(x^{3}+1\right)-3x^{2}$ の符号、つまり $x^{3}+1>0$ で割った $\dfrac{2k}{3}-g\left(x\right)$ の符号と同じである。$f$ が $x_0$ で極値をとるのは、$g\left(x\right)-\dfrac{2k}{3}$ が $x_0$ の前後で**符号を変える**ときに限る。`,
            },
            {
              k: "p",
              t: String.raw`(3) で数えた共有点のうち、$g$ が単調な区間の内部で横切るものは符号が変わる。符号が変わらないのは、水平な直線が $g$ の極大・極小のところで接する場合、すなわち`,
            },
            {
              k: "steps",
              items: [
                String.raw`$c=0$（$k=0$）で $x=0$ のとき … $g$ の極小。$g\geqq0$ なので符号は変わらない`,
                String.raw`$c=\dfrac{\sqrt[3]4}{3}$（$k=\dfrac{\sqrt[3]4}{2}$）で $x=\sqrt[3]2$ のとき … $g$ の極大。符号は変わらない`,
              ],
            },
            { k: "p", t: String.raw`の2つである。よって極値をとる $x$ の個数は` },
            {
              k: "steps",
              items: [
                String.raw`$k<0$：共有点が $0$ 個なので $0$ 個`,
                String.raw`$k=0$：共有点 $1$ 個はすべて接するので $0$ 個`,
                String.raw`$0<k<\dfrac{\sqrt[3]4}{2}$：共有点 $3$ 個すべてで符号が変わるので $3$ 個`,
                String.raw`$k=\dfrac{\sqrt[3]4}{2}$：共有点 $2$ 個のうち $x=\sqrt[3]2$ は接するので $1$ 個`,
                String.raw`$k>\dfrac{\sqrt[3]4}{2}$：共有点 $1$ 個で符号が変わるので $1$ 個`,
              ],
            },
            {
              k: "p",
              t: String.raw`すなわち $k\leqq0$ で $0$ 個、$0<k<\dfrac{\sqrt[3]4}{2}$ で $3$ 個、$k\geqq\dfrac{\sqrt[3]4}{2}$ で $1$ 個である。`,
            },
            {
              k: "note",
              t: String.raw`$k=0$ のときは $f\left(x\right)=\dfrac{1}{\sqrt{x^{3}+1}}$ で、$f'\left(x\right)=-\dfrac{3x^{2}}{2\left(x^{3}+1\right)^{\frac32}}\leqq0$。$x=0$ でだけ $0$ になるが、ずっと減少なので極値はない。(3) と (4) で答えがずれるのはここである。`,
            },
          ],
          pitfalls: [
            String.raw`$f'\left(x_0\right)=0$ は極値であることの必要条件にすぎない。重解（接する場合）を落とさない。`,
          ],
          check: String.raw`符号が変わる点を数えると、$k=-1,0,0.1,0.5,\dfrac{\sqrt[3]4}2,0.9,2$ で順に $0,0,3,3,1,1,1$ 個だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列・極限",
      topics: ["連立漸化式", "2乗の差が変わらない形", "数学的帰納法", "はさみうちの原理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "整数のまま $n=1$ から $14$ まで計算して、$x_n^{2}-5y_n^{2}=\\left(-1\\right)^{n}$ と $\\left(\\mathrm{P}_n\\right)$ がどちらも成り立った",
          "$n=40$ での $\\tfrac{x_n}{y_n}$ は $2.23606797749979$ で、$\\sqrt5=2.23606797749979$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x_1=2$、$y_1=1$、$x_{n+1}=2x_n+5y_n$、$y_{n+1}=x_n+2y_n$ のとき、数列 $\left\{x_n^{2}-5y_n^{2}\right\}$ の一般項を求める`,
          answer: String.raw`$x_n^{2}-5y_n^{2}=\left(-1\right)^{n}$`,
          approach: String.raw`$x_{n+1}^{2}-5y_{n+1}^{2}$ を展開すると、もとの式の $-1$ 倍になる。`,
          blocks: [
            { k: "p", t: String.raw`$a_n=x_n^{2}-5y_n^{2}$ とおく。漸化式を代入すると` },
            {
              k: "math",
              t: String.raw`a_{n+1}=\left(2x_n+5y_n\right)^{2}-5\left(x_n+2y_n\right)^{2}`,
            },
            { k: "p", t: String.raw`である。展開すると` },
            {
              k: "math",
              t: String.raw`=4x_n^{2}+20x_ny_n+25y_n^{2}-5x_n^{2}-20x_ny_n-20y_n^{2}=-x_n^{2}+5y_n^{2}=-a_n`,
            },
            {
              k: "p",
              t: String.raw`となり、$x_ny_n$ の項が消える。$a_1=2^{2}-5\cdot1^{2}=-1$ なので、$\left\{a_n\right\}$ は公比 $-1$ の等比数列で`,
            },
            {
              k: "math",
              t: String.raw`a_n=\left(-1\right)\cdot\left(-1\right)^{n-1}=\left(-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(x,y\right)\mapsto\left(2x+5y,x+2y\right)$ は $x^{2}-5y^{2}$ を $-1$ 倍する。$2^{2}-5\cdot1^{2}=-1$ だからで、$x+y\sqrt5$ に $2+\sqrt5$ を掛ける操作だと思うと見通しがよい。`,
            },
          ],
          check: String.raw`整数のまま $n=1$ から $14$ まで計算して、$x_n^{2}-5y_n^{2}=\left(-1\right)^{n}$ を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`条件 $\left(\mathrm{P}_n\right)$「$x_n\geqq2y_n$ かつ $y_n\geqq4^{n-1}$」について、$\left(\mathrm{P}_k\right)$ ならば $\left(\mathrm{P}_{k+1}\right)$ を示す`,
          answer: String.raw`$x_{k+1}-2y_{k+1}=y_k>0$ と $y_{k+1}=x_k+2y_k\geqq4y_k\geqq4^{k}$ からいえる`,
          approach: String.raw`差 $x_{k+1}-2y_{k+1}$ を計算すると $y_k$ だけが残る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(\mathrm{P}_k\right)$ が成り立つとする。まず $y_k\geqq4^{k-1}>0$ で、$x_k\geqq2y_k>0$ である。`,
            },
            { k: "p", t: String.raw`**1つめの条件**。` },
            {
              k: "math",
              t: String.raw`x_{k+1}-2y_{k+1}=\left(2x_k+5y_k\right)-2\left(x_k+2y_k\right)=y_k>0`,
            },
            { k: "p", t: String.raw`なので $x_{k+1}\geqq2y_{k+1}$ である（$x_k$ が消えるのがポイント）。` },
            { k: "p", t: String.raw`**2つめの条件**。$x_k\geqq2y_k$ を使うと` },
            {
              k: "math",
              t: String.raw`y_{k+1}=x_k+2y_k\geqq2y_k+2y_k=4y_k\geqq4\cdot4^{k-1}=4^{k}`,
            },
            { k: "p", t: String.raw`である。よって $\left(\mathrm{P}_{k+1}\right)$ が成り立つ。` },
            {
              k: "note",
              t: String.raw`$\left(\mathrm{P}_1\right)$ は $x_1=2\geqq2y_1=2$、$y_1=1\geqq4^{0}=1$ でどちらも等号つきで成り立つ。したがって帰納法によりすべての自然数 $n$ で $\left(\mathrm{P}_n\right)$ が成り立つ。(3) ではこれを使う。`,
            },
          ],
          check: String.raw`$n=1$ から $14$ まで、$x_n\geqq2y_n$ と $y_n\geqq4^{n-1}$ がどちらも成り立つことを確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`極限 $\displaystyle\lim_{n\to\infty}\frac{x_n}{y_n}$ を求める`,
          answer: String.raw`$\displaystyle\lim_{n\to\infty}\frac{x_n}{y_n}=\sqrt5$`,
          approach: String.raw`(1) を $y_n^{2}$ で割る。(2) から $y_n\to\infty$ なので右辺は $0$ に行く。`,
          blocks: [
            { k: "p", t: String.raw`(1) の両辺を $y_n^{2}>0$ で割ると` },
            {
              k: "math",
              t: String.raw`\left(\frac{x_n}{y_n}\right)^{2}-5=\frac{\left(-1\right)^{n}}{y_n^{2}}`,
            },
            { k: "p", t: String.raw`である。(2) より $y_n\geqq4^{n-1}$ なので` },
            {
              k: "math",
              t: String.raw`\left|\frac{\left(-1\right)^{n}}{y_n^{2}}\right|=\frac{1}{y_n^{2}}\leqq\frac{1}{16^{\,n-1}}\to0\quad\left(n\to\infty\right)`,
            },
            { k: "p", t: String.raw`であり、はさみうちの原理から` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\left(\frac{x_n}{y_n}\right)^{2}=5`,
            },
            {
              k: "p",
              t: String.raw`である。また (2) より $\dfrac{x_n}{y_n}\geqq2>0$ なので、$\dfrac{x_n}{y_n}$ は正の値をとり続ける。$u\mapsto u^{2}$ は $u>0$ で連続で単調なので`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{x_n}{y_n}=\sqrt5`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{x_n}{y_n}$ は $\sqrt5$ の近似分数を作っていく。$\dfrac21,\dfrac94,\dfrac{38}{17},\dfrac{161}{72},\ldots$ と $\sqrt5=2.2360679\ldots$ に速く近づく。`,
            },
          ],
          pitfalls: [
            String.raw`2乗の極限が $5$ でも、それだけでは $\dfrac{x_n}{y_n}\to\sqrt5$ とはいえない。符号が一定であることを (2) から言う。`,
          ],
          check: String.raw`$n=40$ で $\dfrac{x_n}{y_n}=2.23606797749979$ となり、$\sqrt5=2.23606797749979$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式・積分法",
      topics: ["円と直線の交点", "扇形を使った面積", "置換積分", "断面積から体積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$t=0.75,0.85,0.95,1$ で $\\mathrm{B}$ を直接求めると $\\left|\\mathrm{OB}\\right|=1$ で、$\\cos\\left(\\theta-\\tfrac{\\pi}4\\right)$ がそれぞれ $t$ に一致した",
          "$S\\left(t\\right)$ を極座標で数値積分した値は、同じ4つの $t$ で式の値と小数7桁まで一致した",
          "$\\displaystyle\\int_{\\frac1{\\sqrt2}}^{1}S\\left(t\\right)dt$ は数値 $0.0096698$ で $\\tfrac{1+\\sqrt2}6-\\tfrac{\\pi}8=0.0096698$、$K$ の体積は数値 $0.077359$ で $\\tfrac{4\\left(1+\\sqrt2\\right)}3-\\pi=0.077359$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円 $C\colon x^{2}+y^{2}=1$ と直線 $\ell\colon y=-x+\sqrt2\,t$（$\dfrac1{\sqrt2}\leqq t\leqq1$）の共有点で $D$ に属する点を $\mathrm{B}$、$\ell$ と $x$ 軸の交点を $\mathrm{A}$、$\angle\mathrm{AOB}=\theta$ とするとき、$t$ を $\theta$ で表す`,
          answer: String.raw`$t=\cos\left(\theta-\dfrac{\pi}{4}\right)$（このとき $0\leqq\theta\leqq\dfrac{\pi}{4}$）`,
          approach: String.raw`$\mathrm{B}$ は単位円上なので $\mathrm{B}=\left(\cos\theta,\sin\theta\right)$。これを $\ell$ の式に入れて合成する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}=\left(\sqrt2\,t,0\right)$ は $x$ 軸の正の部分にある（$t>0$）。$\mathrm{B}$ は単位円上の点で、$D$ の条件 $0\leqq y\leqq x$ から $0\leqq\theta\leqq\dfrac{\pi}{4}$ である。よって`,
            },
            { k: "math", t: String.raw`\mathrm{B}=\left(\cos\theta,\ \sin\theta\right)` },
            { k: "p", t: String.raw`とおける。$\mathrm{B}$ は $\ell$ 上にあるので $\sin\theta=-\cos\theta+\sqrt2\,t$、すなわち` },
            { k: "math", t: String.raw`\cos\theta+\sin\theta=\sqrt2\,t` },
            { k: "p", t: String.raw`である。左辺を合成すると $\sqrt2\cos\left(\theta-\dfrac{\pi}{4}\right)$ なので` },
            { k: "math", t: String.raw`t=\cos\left(\theta-\frac{\pi}{4}\right)` },
            {
              k: "p",
              t: String.raw`である。$0\leqq\theta\leqq\dfrac{\pi}{4}$ のとき $-\dfrac{\pi}{4}\leqq\theta-\dfrac{\pi}{4}\leqq0$ で、$t$ は $\dfrac1{\sqrt2}$ から $1$ まで動く。問題の $t$ の範囲とちょうど対応している。`,
            },
            {
              k: "note",
              t: String.raw`円と直線の交点は2つあるが、$x\geqq y$ を満たすほうが $\mathrm{B}$ である。連立して解くと $x=\dfrac{t\pm\sqrt{1-t^{2}}}{\sqrt2}$ で、$+$ のほうが $\mathrm{B}$ にあたる。`,
            },
          ],
          check: String.raw`$t=0.75,0.85,0.95,1$ で $\mathrm{B}$ を直接求めると $\left|\mathrm{OB}\right|=1$ で、$\cos\left(\theta-\dfrac{\pi}4\right)$ がそれぞれ $t$ に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$D$ の面積 $S\left(t\right)$ を $\theta$ で表す`,
          answer: String.raw`$S=\dfrac12\left(\sin^{2}\theta+\sin\theta\cos\theta-\theta\right)$`,
          approach: String.raw`極座標で書くと $D=\left\{0\leqq\varphi\leqq\theta,\ 1\leqq r\leqq\dfrac{t}{\cos\left(\varphi-\frac{\pi}{4}\right)}\right\}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(x,y\right)=\left(r\cos\varphi,r\sin\varphi\right)$ とおく。$0\leqq y\leqq x$ は $0\leqq\varphi\leqq\dfrac{\pi}{4}$、$x^{2}+y^{2}\geqq1$ は $r\geqq1$ である。$\ell$ は $r\left(\cos\varphi+\sin\varphi\right)=\sqrt2\,t$、つまり`,
            },
            {
              k: "math",
              t: String.raw`r=\frac{t}{\cos\left(\varphi-\frac{\pi}{4}\right)}\ \left(=\rho\left(\varphi\right)\text{ とおく}\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$y\leqq-x+\sqrt2\,t$ は $r\leqq\rho\left(\varphi\right)$ である。$\rho\left(\varphi\right)\geqq1$ となるのは $\cos\left(\varphi-\dfrac{\pi}{4}\right)\leqq t=\cos\left(\theta-\dfrac{\pi}{4}\right)$、すなわち $0\leqq\varphi\leqq\theta$ のときである。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{\theta}\frac12\left\{\rho\left(\varphi\right)^{2}-1^{2}\right\}d\varphi=\frac12\int_{0}^{\theta}\left\{\frac{t^{2}}{\cos^{2}\left(\varphi-\frac{\pi}{4}\right)}-1\right\}d\varphi`,
            },
            { k: "p", t: String.raw`である。$\displaystyle\int\frac{d\varphi}{\cos^{2}\left(\varphi-\frac{\pi}{4}\right)}=\tan\left(\varphi-\frac{\pi}{4}\right)$ なので` },
            {
              k: "math",
              t: String.raw`S=\frac{t^{2}}{2}\left\{\tan\left(\theta-\frac{\pi}{4}\right)+1\right\}-\frac{\theta}{2}`,
            },
            { k: "p", t: String.raw`である。$t=\cos\left(\theta-\dfrac{\pi}{4}\right)$ を入れて $\psi=\theta-\dfrac{\pi}{4}$ とおくと` },
            {
              k: "math",
              t: String.raw`\frac{t^{2}}{2}\left(\tan\psi+1\right)=\frac{\cos\psi\sin\psi+\cos^{2}\psi}{2}=\frac{1+\sin2\psi+\cos2\psi}{4}`,
            },
            {
              k: "p",
              t: String.raw`で、$2\psi=2\theta-\dfrac{\pi}{2}$ より $\sin2\psi=-\cos2\theta$、$\cos2\psi=\sin2\theta$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`S=\frac{1-\cos2\theta+\sin2\theta}{4}-\frac{\theta}{2}=\frac12\left(\sin^{2}\theta+\sin\theta\cos\theta-\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\theta=0$ なら $S=0$（$\mathrm{A}$ と $\mathrm{B}$ が重なる）、$\theta=\dfrac{\pi}{4}$ なら $S=\dfrac12-\dfrac{\pi}{8}$ で、三角形から扇形を引いた値と合う。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "D のようす（図は t = 0.95 のとき）。単位円の外、直線 ℓ の下、2直線 y = 0 と y = x のあいだ。塗った部分が D で、左下の角が θ。",
                view: [-0.25, 1.75, -0.28, 1.02],
                items: [
                  {
                    k: "fill",
                    pts: [
                      ...Array.from({ length: 33 }, (_, i): [number, number] => {
                        const ph = (TH3 * i) / 32;
                        return [Math.cos(ph), Math.sin(ph)];
                      }),
                      A3,
                    ],
                  },
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [Math.cos(ph), Math.sin(ph)],
                    from: -0.25,
                    to: Math.PI / 2 + 0.25,
                  },
                  { k: "seg", a: [0, 0], b: [0.95, 0.95], dash: true, faint: true },
                  { k: "seg", a: [0.42, Math.SQRT2 * T3 - 0.42], b: [1.5, Math.SQRT2 * T3 - 1.5] },
                  { k: "dot", at: A3, label: "A", place: "below-right" },
                  { k: "dot", at: B3, label: "B", place: "above-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "text", at: [1.1, 0.1], label: "D", place: "right" },
                  { k: "text", at: [0.42, Math.SQRT2 * T3 - 0.42], label: "ℓ", place: "above-right" },
                  { k: "text", at: [0.95, 0.95], label: "y = x", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$D$ は「三角形から扇形を引いたもの」ではない。$\theta<\dfrac{\pi}{4}$ のときは円が $\ell$ からはみ出すので、角 $\varphi$ の範囲も $\theta$ までに切れる。`,
          ],
          check: String.raw`$t=0.75,0.85,0.95,1$ で、極座標による数値積分と式の値が小数7桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\int_{\frac1{\sqrt2}}^{1}S\left(t\right)dt$ の値を求める`,
          answer: String.raw`$\dfrac{1+\sqrt2}{6}-\dfrac{\pi}{8}$`,
          approach: String.raw`$t=\cos\alpha$（$\alpha=\dfrac{\pi}{4}-\theta$）と置換する。$dt=-\sin\alpha\,d\alpha$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha=\dfrac{\pi}{4}-\theta$ とおくと $t=\cos\alpha$ で、$t:\dfrac1{\sqrt2}\to1$ は $\alpha:\dfrac{\pi}{4}\to0$ にあたる。(2) の途中の式に $\theta=\dfrac{\pi}{4}-\alpha$ を入れると`,
            },
            {
              k: "math",
              t: String.raw`S=\frac{\cos^{2}\alpha-\sin\alpha\cos\alpha}{2}+\frac{\alpha}{2}-\frac{\pi}{8}`,
            },
            { k: "p", t: String.raw`である。$dt=-\sin\alpha\,d\alpha$ なので` },
            {
              k: "math",
              t: String.raw`\int_{\frac1{\sqrt2}}^{1}S\,dt=\int_{0}^{\frac{\pi}{4}}\left\{\frac{\cos^{2}\alpha-\sin\alpha\cos\alpha}{2}+\frac{\alpha}{2}-\frac{\pi}{8}\right\}\sin\alpha\,d\alpha`,
            },
            { k: "p", t: String.raw`である。4つに分けて計算する。` },
            {
              k: "math",
              t: String.raw`\frac12\int_{0}^{\frac{\pi}{4}}\cos^{2}\alpha\sin\alpha\,d\alpha=\frac12\left[-\frac{\cos^{3}\alpha}{3}\right]_{0}^{\frac{\pi}{4}}=\frac16\left(1-\frac{\sqrt2}{4}\right)`,
            },
            {
              k: "math",
              t: String.raw`-\frac12\int_{0}^{\frac{\pi}{4}}\sin^{2}\alpha\cos\alpha\,d\alpha=-\frac12\left[\frac{\sin^{3}\alpha}{3}\right]_{0}^{\frac{\pi}{4}}=-\frac{\sqrt2}{24}`,
            },
            {
              k: "math",
              t: String.raw`\frac12\int_{0}^{\frac{\pi}{4}}\alpha\sin\alpha\,d\alpha=\frac12\left[\sin\alpha-\alpha\cos\alpha\right]_{0}^{\frac{\pi}{4}}=\frac{\sqrt2}{4}-\frac{\sqrt2\,\pi}{16}`,
            },
            {
              k: "math",
              t: String.raw`-\frac{\pi}{8}\int_{0}^{\frac{\pi}{4}}\sin\alpha\,d\alpha=-\frac{\pi}{8}\left(1-\frac{\sqrt2}{2}\right)=-\frac{\pi}{8}+\frac{\sqrt2\,\pi}{16}`,
            },
            { k: "p", t: String.raw`足すと $\dfrac{\sqrt2\,\pi}{16}$ が消えて` },
            {
              k: "math",
              t: String.raw`\int_{\frac1{\sqrt2}}^{1}S\,dt=\frac16-\frac{\sqrt2}{24}-\frac{\sqrt2}{24}+\frac{\sqrt2}{4}-\frac{\pi}{8}=\frac16+\frac{\sqrt2}{6}-\frac{\pi}{8}`,
            },
            { k: "p", t: String.raw`すなわち $\dfrac{1+\sqrt2}{6}-\dfrac{\pi}{8}$（$0.00967\ldots$）である。` },
          ],
          pitfalls: [
            String.raw`$S$ は $\theta$ の式なので、$dt$ のままでは積分できない。$t=\cos\alpha$ と置換して $\alpha$ の積分に直す。`,
          ],
          check: String.raw`数値積分すると $0.0096698$ で、$\dfrac{1+\sqrt2}6-\dfrac{\pi}8=0.0096698$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$4$ 点 $\left(\pm\sqrt2,0,0\right)$、$\left(0,\pm\sqrt2,0\right)$ を頂点とする正方形を底面、$\left(0,0,1\right)$ を頂点とする四角錐 $V$ から、円柱 $W\colon x^{2}+y^{2}<1$、$0\leqq z\leqq1$ を除いた立体 $K$ の体積を求める`,
          answer: String.raw`$\dfrac{4\left(1+\sqrt2\right)}{3}-\pi$`,
          approach: String.raw`高さ $z$ の断面は「正方形から単位円板を除いた4すみ」。すみ1つぶんの面積が (2) の $S$ そのものになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`高さ $z$ での $V$ の断面は $\left|x\right|+\left|y\right|\leqq a$（$a=\sqrt2\left(1-z\right)$）である。$K$ の断面はここから $x^{2}+y^{2}<1$ を除いたものになる。`,
            },
            {
              k: "p",
              t: String.raw`正方形が単位円の内側に入ってしまうのは、頂点までの距離 $a$ が $1$ 以下のとき、つまり $a\leqq1$ のときで、このとき断面は空である。$a=\sqrt2\left(1-z\right)>1$ は $0\leqq z<1-\dfrac1{\sqrt2}$ にあたる。`,
            },
            {
              k: "p",
              t: String.raw`$a>1$ のとき、断面は4すみの合同な図形からなる。$x$ 軸の正の向きにあるすみは、直線 $x+y=a$ と $x-y=a$ と単位円で囲まれる部分である。$\dfrac{a}{\sqrt2}=t$ とおくと、上半分は`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}\geqq1,\quad y\leqq-x+\sqrt2\,t,\quad0\leqq y\leqq x`,
            },
            {
              k: "p",
              t: String.raw`そのもので、これは $D$ である。$a:1\to\sqrt2$ は $t:\dfrac1{\sqrt2}\to1$ に対応するので、断面積は`,
            },
            { k: "math", t: String.raw`A\left(z\right)=4\times2S\left(t\right)=8S\left(t\right),\qquad t=1-z` },
            {
              k: "p",
              t: String.raw`である（$t=\dfrac{a}{\sqrt2}=1-z$）。$dz=-dt$ で、$z:0\to1-\dfrac1{\sqrt2}$ は $t:1\to\dfrac1{\sqrt2}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\left(K\text{ の体積}\right)=\int_{0}^{1-\frac1{\sqrt2}}8S\left(1-z\right)dz=8\int_{\frac1{\sqrt2}}^{1}S\left(t\right)dt`,
            },
            { k: "p", t: String.raw`となり、(3) がそのまま使える。` },
            {
              k: "math",
              t: String.raw`\left(K\text{ の体積}\right)=8\left(\frac{1+\sqrt2}{6}-\frac{\pi}{8}\right)=\frac{4\left(1+\sqrt2\right)}{3}-\pi`,
            },
            { k: "p", t: String.raw`である（$0.0774\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "高さ z での断面（図は a = 1.25 のとき）。正方形 |x| + |y| ≦ a から単位円の内部を除くと、合同な4すみが残る。右のすみの上半分が (2) の D にあたる。",
                view: [-1.75, 1.75, -1.4, 1.4],
                items: [
                  { k: "fill", pts: CORNER20(0) },
                  { k: "fill", pts: CORNER20(Math.PI / 2) },
                  { k: "fill", pts: CORNER20(Math.PI) },
                  { k: "fill", pts: CORNER20(-Math.PI / 2) },
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [Math.cos(ph), Math.sin(ph)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [SQ20, 0], b: [0, SQ20] },
                  { k: "seg", a: [0, SQ20], b: [-SQ20, 0] },
                  { k: "seg", a: [-SQ20, 0], b: [0, -SQ20] },
                  { k: "seg", a: [0, -SQ20], b: [SQ20, 0] },
                  { k: "text", at: [1.18, 0], label: "すみ", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$a=\sqrt2$（$z=0$）では断面積が $2a^{2}-\pi=4-\pi$ で、正方形から円をまるごと引いた値になる。$8S\left(1\right)=8\left(\dfrac12-\dfrac{\pi}{8}\right)=4-\pi$ と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$a\leqq1$ の範囲では断面が空になる。$z$ の積分範囲を $0\leqq z\leqq1$ のままにしない。`,
          ],
          check: String.raw`断面積を数値積分して体積を求めると $0.077359$ で、$\dfrac{4\left(1+\sqrt2\right)}3-\pi=0.077359$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "ベクトル",
      topics: ["内積と三角形の面積", "外心の位置ベクトル", "直線が辺と交わる条件", "面積比の最小"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "座標で $\\mathrm{O}\\left(0,0\\right)$、$\\mathrm{A}\\left(8,0\\right)$、$\\mathrm{B}$ を取り直すと $\\mathrm{AB}=12$、内積 $10$、面積 $39.6862697$（$15\\sqrt7=39.6862697$）",
          "外心を連立で求めると3頂点までの距離がどれも $6.0474316$ で、$\\vec{a},\\vec b$ での係数は $0.4285714=\\tfrac37$ と $0.4571429=\\tfrac{16}{35}$ だった",
          "$x$ を $0.00001$ 刻みで動かすと、$\\mathrm{E}$ が辺 $\\mathrm{OB}$ 上に乗る最小の $x$ は $0.78948$（$\\tfrac{15}{19}=0.7894737$）、面積の最小は $x=0.85714$ で $31.1010766$（$\\tfrac{576\\sqrt7}{49}=31.1010766$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{OA}=8$、$\mathrm{OB}=10$、$\mathrm{AB}=12$ の三角形 $\mathrm{OAB}$ で、$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$ とするとき $\vec a\cdot\vec b$ を求める`,
          answer: String.raw`$\vec a\cdot\vec b=10$`,
          approach: String.raw`$\left|\vec b-\vec a\right|^{2}=\mathrm{AB}^{2}$ を展開する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=\left|\vec b-\vec a\right|^{2}=\left|\vec a\right|^{2}-2\vec a\cdot\vec b+\left|\vec b\right|^{2}`,
            },
            { k: "p", t: String.raw`に $\mathrm{AB}=12$、$\left|\vec a\right|=8$、$\left|\vec b\right|=10$ を入れると` },
            {
              k: "math",
              t: String.raw`144=64-2\vec a\cdot\vec b+100,\qquad\vec a\cdot\vec b=\frac{164-144}{2}=10`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`座標で取り直すと内積は $10$、$\mathrm{AB}=12$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`三角形 $\mathrm{OAB}$ の面積 $S$ を求める`,
          answer: String.raw`$S=15\sqrt7$`,
          approach: String.raw`$S=\dfrac12\sqrt{\left|\vec a\right|^{2}\left|\vec b\right|^{2}-\left(\vec a\cdot\vec b\right)^{2}}$。`,
          blocks: [
            {
              k: "math",
              t: String.raw`S=\frac12\sqrt{\left|\vec a\right|^{2}\left|\vec b\right|^{2}-\left(\vec a\cdot\vec b\right)^{2}}=\frac12\sqrt{64\cdot100-100}=\frac12\sqrt{6300}`,
            },
            { k: "p", t: String.raw`で、$6300=900\times7$ だから` },
            { k: "math", t: String.raw`S=\frac12\cdot30\sqrt7=15\sqrt7` },
            { k: "p", t: String.raw`である（$39.686\ldots$）。` },
          ],
          check: String.raw`座標から求めた面積は $39.6862697$ で、$15\sqrt7=39.6862697$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`三角形 $\mathrm{OAB}$ の外心を $\mathrm{G}$ とするとき、$\overrightarrow{\mathrm{OG}}$ を $\vec a,\vec b$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OG}}=\dfrac37\vec a+\dfrac{16}{35}\vec b$`,
          approach: String.raw`外心は $\overrightarrow{\mathrm{OG}}\cdot\vec a=\dfrac{\left|\vec a\right|^{2}}2$、$\overrightarrow{\mathrm{OG}}\cdot\vec b=\dfrac{\left|\vec b\right|^{2}}2$ で決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{G}$ は $\mathrm{OA}$ の垂直二等分線上にあるので、$\mathrm{OA}$ の中点を $\mathrm{M}$ として $\left(\overrightarrow{\mathrm{OG}}-\dfrac{\vec a}{2}\right)\cdot\vec a=0$、つまり`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OG}}\cdot\vec a=\frac{\left|\vec a\right|^{2}}{2}=32,\qquad\overrightarrow{\mathrm{OG}}\cdot\vec b=\frac{\left|\vec b\right|^{2}}{2}=50`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OG}}=s\vec a+t\vec b$ とおくと、$\vec a\cdot\vec b=10$ を使って` },
            {
              k: "math",
              t: String.raw`\begin{cases}64s+10t=32\\10s+100t=50\end{cases}`,
            },
            { k: "p", t: String.raw`となる。2式目は $s+10t=5$ なので $s=5-10t$。1式目に入れると` },
            {
              k: "math",
              t: String.raw`64\left(5-10t\right)+10t=32,\qquad-630t=-288,\qquad t=\frac{16}{35}`,
            },
            { k: "p", t: String.raw`で、$s=5-\dfrac{160}{35}=\dfrac{15}{35}=\dfrac37$ である。よって` },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OG}}=\frac37\vec a+\frac{16}{35}\vec b` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`係数の和は $\dfrac{15}{35}+\dfrac{16}{35}=\dfrac{31}{35}<1$ なので、$\mathrm{G}$ は辺 $\mathrm{AB}$ より $\mathrm{O}$ 側にある。どちらの係数も正なので三角形の内部にある（この三角形は鋭角三角形）。`,
            },
          ],
          check: String.raw`外心を連立で求めると3頂点までの距離がどれも $6.0474316$ で、係数は $\dfrac37$ と $\dfrac{16}{35}$ になった。`,
        },
        {
          label: "(4)",
          task: String.raw`辺 $\mathrm{OA}$ 上に $\mathrm{O}$ と異なる点 $\mathrm{D}$ をとり $\dfrac{\mathrm{OD}}{\mathrm{OA}}=x$ とする。直線 $\mathrm{DG}$ が辺 $\mathrm{OB}$ と交わるための $x$ の範囲を求める`,
          answer: String.raw`$\dfrac{15}{19}\leqq x\leqq1$`,
          approach: String.raw`直線 $\mathrm{DG}$ 上の点で $\vec a$ の係数が $0$ になるものを求め、$\vec b$ の係数が $0$ と $1$ のあいだに入る条件を書く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OD}}=x\vec a$（$0<x\leqq1$）である。直線 $\mathrm{DG}$ 上の点は $u$ を実数として`,
            },
            {
              k: "math",
              t: String.raw`\left(1-u\right)x\vec a+u\left(\frac37\vec a+\frac{16}{35}\vec b\right)=\left\{\left(1-u\right)x+\frac{3u}{7}\right\}\vec a+\frac{16u}{35}\vec b`,
            },
            {
              k: "p",
              t: String.raw`と書ける。これが直線 $\mathrm{OB}$ 上にあるのは $\vec a$ の係数が $0$ のとき、つまり`,
            },
            {
              k: "math",
              t: String.raw`\left(1-u\right)x+\frac{3u}{7}=0,\qquad u\left(\frac37-x\right)=-x,\qquad u=\frac{7x}{7x-3}`,
            },
            {
              k: "p",
              t: String.raw`のときである（$x=\dfrac37$ なら $\mathrm{DG}$ は $\mathrm{OB}$ と平行で交わらない）。このとき`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OE}}=\frac{16u}{35}\vec b=\frac{16x}{5\left(7x-3\right)}\vec b`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{E}$ が辺 $\mathrm{OB}$ 上（$\mathrm{O}$ を除く）にある条件は $0<\dfrac{16x}{5\left(7x-3\right)}\leqq1$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x>0$ なので、正であることから $7x-3>0$、つまり $x>\dfrac37$`,
                String.raw`$1$ 以下であることから $16x\leqq5\left(7x-3\right)=35x-15$、つまり $19x\geqq15$、$x\geqq\dfrac{15}{19}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\dfrac{15}{19}>\dfrac37$ なので、$x>\dfrac37$ は自動で満たされる。$\mathrm{D}$ は辺 $\mathrm{OA}$ 上なので $x\leqq1$ も必要である。よって`,
            },
            { k: "math", t: String.raw`\frac{15}{19}\leqq x\leqq1` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「直線 $\mathrm{OB}$ と交わる」ではなく「**辺** $\mathrm{OB}$ と交わる」。$\vec b$ の係数が $0$ より大きく $1$ 以下であることまで書く。`,
          ],
          check: String.raw`$x$ を $0.00001$ 刻みで動かすと、$\mathrm{E}$ が辺 $\mathrm{OB}$ 上に乗る最小の $x$ は $0.78948$ で、$\dfrac{15}{19}=0.7894737$ と合った。`,
        },
        {
          label: "(5)",
          task: String.raw`(4) の範囲で $\mathrm{D}$ を動かす。直線 $\mathrm{DG}$ と辺 $\mathrm{OB}$ の交点を $\mathrm{E}$ とするとき、三角形 $\mathrm{ODE}$ の面積の最小値とそのときの $x$ を求める`,
          answer: String.raw`$x=\dfrac67$ のとき最小値 $\dfrac{576\sqrt7}{49}$`,
          approach: String.raw`面積は $x\cdot\dfrac{\mathrm{OE}}{\mathrm{OB}}\cdot S$。$x$ の分数関数になるので微分する。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{\mathrm{OD}}{\mathrm{OA}}=x$、$\dfrac{\mathrm{OE}}{\mathrm{OB}}=\dfrac{16x}{5\left(7x-3\right)}$ なので` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ODE}=x\cdot\frac{16x}{5\left(7x-3\right)}\cdot S=\frac{16x^{2}}{5\left(7x-3\right)}\cdot15\sqrt7=48\sqrt7\cdot\frac{x^{2}}{7x-3}`,
            },
            { k: "p", t: String.raw`である。$h\left(x\right)=\dfrac{x^{2}}{7x-3}$ とおくと` },
            {
              k: "math",
              t: String.raw`h'\left(x\right)=\frac{2x\left(7x-3\right)-7x^{2}}{\left(7x-3\right)^{2}}=\frac{7x^{2}-6x}{\left(7x-3\right)^{2}}=\frac{x\left(7x-6\right)}{\left(7x-3\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{15}{19}\leqq x\leqq1$ では $x>0$ なので符号は $7x-6$ で決まり、$x=\dfrac67$ の前後で負から正に変わる。$\dfrac{15}{19}=0.789\ldots<\dfrac67=0.857\ldots<1$ なので、$x=\dfrac67$ で最小になる。`,
            },
            {
              k: "math",
              t: String.raw`h\left(\frac67\right)=\frac{\frac{36}{49}}{6-3}=\frac{12}{49}`,
            },
            { k: "p", t: String.raw`なので、最小値は` },
            {
              k: "math",
              t: String.raw`48\sqrt7\cdot\frac{12}{49}=\frac{576\sqrt7}{49}`,
            },
            { k: "p", t: String.raw`である（$31.10\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "三角形 OAB と外心 G。点線は最小のときの直線 DE（x = 6/7）で、G を通る。うすい円は外接円。",
                view: [-3.0, 11.2, -1.5, 11.0],
                items: [
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [
                      G4[0] + Math.hypot(G4[0], G4[1]) * Math.cos(ph),
                      G4[1] + Math.hypot(G4[0], G4[1]) * Math.sin(ph),
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0, 0], b: [8, 0] },
                  { k: "seg", a: [8, 0], b: B4 },
                  { k: "seg", a: B4, b: [0, 0] },
                  { k: "seg", a: D4, b: E4, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [8, 0], label: "A", place: "below-right" },
                  { k: "dot", at: B4, label: "B", place: "above-right" },
                  { k: "dot", at: G4, label: "G", place: "right" },
                  { k: "dot", at: D4, label: "D", place: "below" },
                  { k: "dot", at: E4, label: "E", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=\dfrac67$ が (4) の範囲に入っているかを必ず確かめる。入っていなければ端点が最小になる。`,
          ],
          check: String.raw`$x$ を $0.00001$ 刻みで動かすと、最小は $x=0.85714$ で $31.1010766$、$\dfrac{576\sqrt7}{49}=31.1010766$ と一致した。`,
        },
      ],
    },
  ],
};
