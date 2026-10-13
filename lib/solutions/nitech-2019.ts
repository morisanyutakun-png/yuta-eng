import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2019年度（平成31年度）一般入試 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図で使う $k$。 */
const K19 = 2.5;
/** $C\colon y=\dfrac{k}{1+x}$。 */
const C19 = (x: number): number => K19 / (1 + x);
/** $\ell\colon y=-\dfrac x2+k$。 */
const L19 = (x: number): number => -x / 2 + K19;
/** 点 $\left(-1,1\right)$ から引いた接線。接点は $\left(2k-1,\tfrac12\right)$。 */
const TG19 = (x: number): number => 0.5 - (K19 / (2 * K19) ** 2) * (x - (2 * K19 - 1));

/** 第3問の $\mathrm{P}$、$\mathrm{Q}$、$\mathrm{R}$。 */
const P19 = (t: number): [number, number] => [Math.cos(t), Math.sin(t)];
const Q19 = (t: number): [number, number] => [2 * Math.cos(2 * t), 2 * Math.sin(2 * t)];
const R19 = (t: number): [number, number] => [
  (4 * Math.cos(t) + 2 * Math.cos(2 * t)) / 5,
  (4 * Math.sin(t) + 2 * Math.sin(2 * t)) / 5,
];

export const nitech2019: SolutionSet = {
  slug: "nitech",
  year: 2019,
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
      topics: ["分数関数の接線", "通る点から接点を求める", "面積と対数", "軸をずらした回転体"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$k=0.6,1,2.5$ で、接点 $\\left(2k-1,\\tfrac12\\right)$ における接線に $x=-1$ を入れると値はどれも $1$ だった",
          "面積を数値積分すると $k=1$ で $0.056852819$、式 $k^{2}-\\tfrac14-k\\log2k$ も $0.056852819$",
          "体積を数値積分すると $k=1$ で $0.083190988$、式も $0.083190988$（$k=0.6,2.5$ でも一致）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$k>\dfrac12$、$f\left(x\right)=\dfrac{k}{1+x}$、$C\colon y=f\left(x\right)$ とする。点 $\left(-1,1\right)$ から $C$ に引いた接線の接点 $\mathrm{P}$ の座標を求める`,
          answer: String.raw`$\mathrm{P}\left(2k-1,\ \dfrac12\right)$`,
          approach: String.raw`接点を $\left(a,\dfrac{k}{1+a}\right)$ とおいて接線を作り、$\left(-1,1\right)$ を代入する。`,
          blocks: [
            { k: "p", t: String.raw`$f'\left(x\right)=-\dfrac{k}{\left(1+x\right)^{2}}$ なので、接点を $\left(a,\dfrac{k}{1+a}\right)$ とすると接線は` },
            {
              k: "math",
              t: String.raw`y=\frac{k}{1+a}-\frac{k}{\left(1+a\right)^{2}}\left(x-a\right)`,
            },
            { k: "p", t: String.raw`である。$x=-1$、$y=1$ を代入すると` },
            {
              k: "math",
              t: String.raw`1=\frac{k}{1+a}-\frac{k\left(-1-a\right)}{\left(1+a\right)^{2}}=\frac{k}{1+a}+\frac{k}{1+a}=\frac{2k}{1+a}`,
            },
            { k: "p", t: String.raw`となる。よって $1+a=2k$、$a=2k-1$ である。$k>\dfrac12$ より $a>0$ で、` },
            {
              k: "math",
              t: String.raw`f\left(a\right)=\frac{k}{2k}=\frac12`,
            },
            { k: "p", t: String.raw`である。したがって $\mathrm{P}\left(2k-1,\dfrac12\right)$ である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ の $y$ 座標は $k$ によらず $\dfrac12$ になる。(4) で回転軸が $y=\dfrac12$ なのはこのためである。`,
            },
          ],
          check: String.raw`$k=0.6,1,2.5$ で、接線に $x=-1$ を入れると値はどれも $1$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\left(0,k\right)$ と $\mathrm{P}$ を通る直線 $\ell$ の方程式を求める`,
          answer: String.raw`$\ell\colon y=-\dfrac12x+k$`,
          approach: String.raw`2点の傾きを計算するだけ。$2k-1$ が約分される。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\left(\text{傾き}\right)=\frac{\frac12-k}{\left(2k-1\right)-0}=\frac{-\frac{2k-1}{2}}{2k-1}=-\frac12`,
            },
            { k: "p", t: String.raw`である（$k>\dfrac12$ より $2k-1\ne0$）。$y$ 切片が $k$ なので` },
            { k: "math", t: String.raw`\ell\colon y=-\frac12x+k` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(0,k\right)$ は $C$ 上の点（$f\left(0\right)=k$）でもある。だから $\ell$ は $C$ の割線で、(3) の $D$ は $C$ と $\ell$ ではさまれた部分になる。`,
            },
          ],
          check: String.raw`$\left(0,k\right)$ と $\left(2k-1,\dfrac12\right)$ はどちらもこの直線上にある。`,
        },
        {
          label: "(3)",
          task: String.raw`$C$ と $\ell$ で囲まれる図形 $D$ の面積 $S$ を求める`,
          answer: String.raw`$S=k^{2}-\dfrac14-k\log2k$`,
          approach: String.raw`交点は $x=0$ と $x=2k-1$。その間で $\ell$ が上。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{k}{1+x}=-\dfrac x2+k$ の両辺に $1+x>0$ を掛けて整理すると` },
            {
              k: "math",
              t: String.raw`k=\left(-\frac x2+k\right)\left(1+x\right),\qquad0=x\left(k-\frac12-\frac x2\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、交点の $x$ 座標は $x=0$ と $x=2k-1$ である。$0<x<2k-1$ では $k-\dfrac12-\dfrac x2>0$ なので $\ell$ が $C$ より上にある。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{2k-1}\left\{\left(-\frac x2+k\right)-\frac{k}{1+x}\right\}dx=\left[-\frac{x^{2}}{4}+kx-k\log\left(1+x\right)\right]_{0}^{2k-1}`,
            },
            { k: "p", t: String.raw`である。$1+\left(2k-1\right)=2k$ なので` },
            {
              k: "math",
              t: String.raw`S=-\frac{\left(2k-1\right)^{2}}{4}+k\left(2k-1\right)-k\log2k`,
            },
            { k: "p", t: String.raw`で、前の2項をまとめると` },
            {
              k: "math",
              t: String.raw`-\frac{4k^{2}-4k+1}{4}+2k^{2}-k=-k^{2}+k-\frac14+2k^{2}-k=k^{2}-\frac14`,
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`S=k^{2}-\frac14-k\log2k` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "C と ℓ、接線、回転軸のようす（図は k = 2.5 のとき）。塗った部分が D。点線のうち右下がりのゆるやかな直線が点 (−1, 1) からの接線で、水平な点線が (4) の回転軸 y = 1/2。",
                view: [-1.2, 4.8, -0.4, 3.6],
                items: [
                  { k: "fillBetween", top: L19, bottom: C19, from: 0, to: 2 * K19 - 1 },
                  { k: "curve", f: C19, from: -0.28, to: 4.8 },
                  { k: "seg", a: [-0.2, L19(-0.2)], b: [4.8, L19(4.8)] },
                  { k: "seg", a: [-1.2, TG19(-1.2)], b: [4.8, TG19(4.8)], dash: true },
                  { k: "seg", a: [-1.2, 0.5], b: [4.8, 0.5], dash: true },
                  { k: "dot", at: [-1, 1], label: "(−1, 1)", place: "above-left" },
                  { k: "dot", at: [0, K19], label: "(0, k)", place: "above-right" },
                  { k: "dot", at: [2 * K19 - 1, 0.5], label: "P", place: "above-right" },
                  { k: "text", at: [2, (L19(2) + C19(2)) / 2], label: "D", place: "above" },
                  { k: "text", at: [-0.28, C19(-0.28)], label: "C", place: "right" },
                  { k: "text", at: [4.6, L19(4.6)], label: "ℓ", place: "below-right" },
                  { k: "text", at: [-1.1, 0.5], label: "y = 1/2", place: "above" },
                ],
              },
            },
          ],
          check: String.raw`数値積分すると $k=1$ で $0.056852819$、式 $k^{2}-\dfrac14-k\log2k$ も $0.056852819$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$D$ を直線 $y=\dfrac12$ のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\pi\left\{\dfrac{\left(2k-1\right)^{3}}{12}-k^{2}+\dfrac14+k\log2k\right\}$`,
          approach: String.raw`$D$ は全部 $y\geqq\dfrac12$ にあるので、断面は円環。$\ell$ 側が外半径、$C$ 側が内半径。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0\leqq x\leqq2k-1$ では $C$ も $\ell$ も $y\geqq\dfrac12$ である（$C$ は減少して $x=2k-1$ でちょうど $\dfrac12$）。よって断面は円環で`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int_{0}^{2k-1}\left\{\left(-\frac x2+k-\frac12\right)^{2}-\left(\frac{k}{1+x}-\frac12\right)^{2}\right\}dx`,
            },
            { k: "p", t: String.raw`である。$2k-1=2c$（$c=k-\dfrac12>0$）とおくと` },
            {
              k: "math",
              t: String.raw`-\frac x2+k-\frac12=\frac{2c-x}{2},\qquad\frac{k}{1+x}-\frac12=\frac{2c-x}{2\left(1+x\right)}`,
            },
            { k: "p", t: String.raw`なので、共通因数でくくれて` },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{4}\int_{0}^{2c}\left(2c-x\right)^{2}\left\{1-\frac{1}{\left(1+x\right)^{2}}\right\}dx`,
            },
            { k: "p", t: String.raw`である。前半は` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2c}\left(2c-x\right)^{2}dx=\left[-\frac{\left(2c-x\right)^{3}}{3}\right]_{0}^{2c}=\frac{8c^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。後半は $w=1+x$、$A=2c+1=2k$ とおくと $2c-x=A-w$ で` },
            {
              k: "math",
              t: String.raw`\int_{1}^{A}\frac{\left(A-w\right)^{2}}{w^{2}}dw=\int_{1}^{A}\left(\frac{A^{2}}{w^{2}}-\frac{2A}{w}+1\right)dw=\left[-\frac{A^{2}}{w}-2A\log w+w\right]_{1}^{A}`,
            },
            { k: "p", t: String.raw`となり、値は $A^{2}-1-2A\log A$ である。$8c^{3}=\left(2k-1\right)^{3}$、$A=2k$ だから` },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{4}\left\{\frac{\left(2k-1\right)^{3}}{3}-4k^{2}+1+4k\log2k\right\}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`V=\pi\left\{\frac{\left(2k-1\right)^{3}}{12}-k^{2}+\frac14+k\log2k\right\}`,
            },
            { k: "p", t: String.raw`である。(3) の $S$ を使うと $V=\pi\left\{\dfrac{\left(2k-1\right)^{3}}{12}-S\right\}$ と書ける。` },
            {
              k: "note",
              t: String.raw`$\left(\ell-\frac12\right)^{2}-\left(C-\frac12\right)^{2}$ を展開してから積分すると、$\dfrac{1}{\left(1+x\right)^{2}}$ と $\dfrac{1}{1+x}$ と多項式が混ざって重い。共通因数 $\left(2c-x\right)^{2}$ でくくってから $w=1+x$ と置換すると軽くなる。`,
            },
          ],
          pitfalls: [
            String.raw`$D$ が回転軸をまたいでいないことを先に確かめる。またいでいれば円環ではなく円板になる。`,
          ],
          check: String.raw`数値積分すると $k=1$ で $0.083190988$、式も $0.083190988$ だった（$k=0.6,2.5$ でも一致）。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["2階微分で不等式を示す", "はさみうちの原理", "ルートの置換積分", "広義積分の極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$e^{x}-\\tfrac{x^{2}}2$ を $0\\leqq x\\leqq20$ で $0.001$ 刻みに調べると最小は $1$（$x=0$）だった",
          "$-2\\left(\\sqrt x+1\\right)e^{-\\sqrt x}$ を数値微分すると $e^{-\\sqrt x}$ と一致した",
          "$\\displaystyle\\int_{0}^{400}e^{-\\sqrt x}dx$ の数値は $2.0000072$ で、極限 $2$ に合っている",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x\geqq0$ のとき $e^{x}>\dfrac{x^{2}}{2}$ が成り立つことを示す`,
          answer: String.raw`$h\left(x\right)=e^{x}-\dfrac{x^{2}}{2}$ は $x\geqq0$ で増加し、$h\left(0\right)=1>0$`,
          approach: String.raw`2回微分する。$h''=e^{x}-1\geqq0$ から $h'$ の符号が決まる。`,
          blocks: [
            { k: "p", t: String.raw`$h\left(x\right)=e^{x}-\dfrac{x^{2}}{2}$ とおく。` },
            {
              k: "math",
              t: String.raw`h'\left(x\right)=e^{x}-x,\qquad h''\left(x\right)=e^{x}-1`,
            },
            {
              k: "p",
              t: String.raw`である。$x\geqq0$ では $e^{x}\geqq1$ なので $h''\left(x\right)\geqq0$、つまり $h'$ は $x\geqq0$ で増加する。したがって`,
            },
            {
              k: "math",
              t: String.raw`h'\left(x\right)\geqq h'\left(0\right)=1>0\quad\left(x\geqq0\right)`,
            },
            { k: "p", t: String.raw`である。よって $h$ も $x\geqq0$ で増加し` },
            {
              k: "math",
              t: String.raw`h\left(x\right)\geqq h\left(0\right)=1>0`,
            },
            { k: "p", t: String.raw`となる。すなわち $e^{x}>\dfrac{x^{2}}{2}$ である。（証明終わり）` },
          ],
          check: String.raw`$0\leqq x\leqq20$ を $0.001$ 刻みで調べると $h$ の最小は $1$（$x=0$）だった。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の不等式を使って $\displaystyle\lim_{x\to\infty}xe^{-x}=0$ を示す`,
          answer: String.raw`$0<xe^{-x}<\dfrac2x$ ではさみうち`,
          approach: String.raw`$e^{x}>\dfrac{x^{2}}{2}$ の両辺の逆数をとる。`,
          blocks: [
            { k: "p", t: String.raw`$x>0$ とする。(1) より $e^{x}>\dfrac{x^{2}}{2}>0$ なので、逆数をとると` },
            {
              k: "math",
              t: String.raw`0<\frac{1}{e^{x}}<\frac{2}{x^{2}}`,
            },
            { k: "p", t: String.raw`である。両辺に $x>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`0<xe^{-x}<\frac{2}{x}`,
            },
            {
              k: "p",
              t: String.raw`となる。$x\to\infty$ で $\dfrac2x\to0$ だから、はさみうちの原理より $\displaystyle\lim_{x\to\infty}xe^{-x}=0$ である。（証明終わり）`,
            },
          ],
          check: String.raw`$x=50$ で $xe^{-x}=9.6\times10^{-21}$、$\dfrac2x=0.04$ で不等式も成り立っている。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\int e^{-\sqrt x}\,dx$ を求める`,
          answer: String.raw`$-2\left(\sqrt x+1\right)e^{-\sqrt x}+C$`,
          approach: String.raw`$t=\sqrt x$ とおくと $dx=2t\,dt$。あとは部分積分。`,
          blocks: [
            { k: "p", t: String.raw`$t=\sqrt x$（$t\geqq0$）とおくと $x=t^{2}$、$dx=2t\,dt$ なので` },
            {
              k: "math",
              t: String.raw`\int e^{-\sqrt x}dx=\int e^{-t}\cdot2t\,dt=2\int te^{-t}dt`,
            },
            { k: "p", t: String.raw`である。部分積分すると` },
            {
              k: "math",
              t: String.raw`\int te^{-t}dt=-te^{-t}+\int e^{-t}dt=-te^{-t}-e^{-t}=-\left(t+1\right)e^{-t}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int e^{-\sqrt x}dx=-2\left(\sqrt x+1\right)e^{-\sqrt x}+C`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$-2\left(\sqrt x+1\right)e^{-\sqrt x}$ を数値微分すると $e^{-\sqrt x}$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$\displaystyle\lim_{R\to\infty}\int_{0}^{R}e^{-\sqrt x}\,dx$ を求める`,
          answer: String.raw`$2$`,
          approach: String.raw`(3) の原始関数を代入し、(2) を使って極限をとる。`,
          blocks: [
            { k: "p", t: String.raw`(3) より` },
            {
              k: "math",
              t: String.raw`\int_{0}^{R}e^{-\sqrt x}dx=\left[-2\left(\sqrt x+1\right)e^{-\sqrt x}\right]_{0}^{R}=2-2\left(\sqrt R+1\right)e^{-\sqrt R}`,
            },
            { k: "p", t: String.raw`である。$u=\sqrt R$ とおくと $R\to\infty$ のとき $u\to\infty$ で` },
            {
              k: "math",
              t: String.raw`2\left(\sqrt R+1\right)e^{-\sqrt R}=2ue^{-u}+2e^{-u}`,
            },
            {
              k: "p",
              t: String.raw`である。(2) より $ue^{-u}\to0$、また $e^{-u}\to0$ なので、この式は $0$ に収束する。したがって`,
            },
            {
              k: "math",
              t: String.raw`\lim_{R\to\infty}\int_{0}^{R}e^{-\sqrt x}dx=2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(1)(2) は (4) の下ごしらえである。$ue^{-u}\to0$ を「指数のほうが強いから」で済ませず、(1) の不等式から導くのがこの問題の筋。`,
            },
          ],
          check: String.raw`$\displaystyle\int_{0}^{400}e^{-\sqrt x}dx$ の数値は $2.0000072$ で、$2$ に合っている。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式・積分法",
      topics: ["直線に関する対称点", "線分と円の交わり", "弓形の面積", "曲線の長さ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{Q}=\\left(2\\cos2\\theta,2\\sin2\\theta\\right)$ は $\\theta=0,0.4,\\tfrac{\\pi}3,1.5,3$ のどれでも $\\mathrm{PQ}=\\mathrm{PA}$ で、$\\angle\\mathrm{APQ}$ の二等分方向と $\\overrightarrow{\\mathrm{OP}}$ の外積が $0$ だった",
          "線分 $\\mathrm{AP}$ が円の内部に入るかを調べると、$\\theta=1.0272$ では入らず $\\theta=1.0672$ では入った（境い目は $\\tfrac{\\pi}3=1.0472$）",
          "$\\mathrm{Q}$ の弓形の面積は数値 $2.456739397$ で $\\tfrac{4\\pi}3-\\sqrt3=2.456739397$、$C_2$ の長さは数値 $1.600000000$ で $\\tfrac85=1.6$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`原点 $\mathrm{O}$ を中心とする半径 $1$ の円周 $C$ と点 $\mathrm{A}\left(2,0\right)$ がある。$C$ 上の $\mathrm{P}\left(\cos\theta,\sin\theta\right)$（$0\leqq\theta\leqq\pi$）について、線分 $\mathrm{AP}$ と $C$ の共有点が $\mathrm{P}$ だけとなる $\theta$ の範囲 $a\leqq\theta\leqq b$ を求める`,
          answer: String.raw`$a=0$、$b=\dfrac{\pi}{3}$`,
          approach: String.raw`方べきの定理。$\mathrm{A}$ から円に引いた直線の2交点を $\mathrm{P},\mathrm{P}'$ とすると $\mathrm{AP}\cdot\mathrm{AP}'=3$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OA}=2>1$ なので $\mathrm{A}$ は円の外にある。$\mathrm{A}$ の方べきは $\mathrm{OA}^{2}-1^{2}=3$ である。直線 $\mathrm{AP}$ と $C$ のもう1つの交点を $\mathrm{P}'$ とすると`,
            },
            { k: "math", t: String.raw`\mathrm{AP}\cdot\mathrm{AP}'=3` },
            {
              k: "p",
              t: String.raw`である。線分 $\mathrm{AP}$ が $\mathrm{P}$ 以外で $C$ と交わらないのは、$\mathrm{P}$ のほうが $\mathrm{A}$ に近い（または $\mathrm{P}=\mathrm{P}'$）とき、つまり $\mathrm{AP}\leqq\mathrm{AP}'$ のときである。$\mathrm{AP}\cdot\mathrm{AP}'=3$ なので、これは`,
            },
            { k: "math", t: String.raw`\mathrm{AP}^{2}\leqq3` },
            { k: "p", t: String.raw`と同じである。一方` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}=\left(2-\cos\theta\right)^{2}+\sin^{2}\theta=5-4\cos\theta`,
            },
            { k: "p", t: String.raw`なので、条件は $5-4\cos\theta\leqq3$、すなわち $\cos\theta\geqq\dfrac12$ である。$0\leqq\theta\leqq\pi$ では` },
            { k: "math", t: String.raw`0\leqq\theta\leqq\frac{\pi}{3}` },
            { k: "p", t: String.raw`である。よって $a=0$、$b=\dfrac{\pi}{3}$ である。` },
            {
              k: "note",
              t: String.raw`$\theta=\dfrac{\pi}{3}$ のときは $\mathrm{AP}=\sqrt3$ で、これは $\mathrm{A}$ からの接線の長さと等しい。つまり線分 $\mathrm{AP}$ は円に接していて、共有点は $\mathrm{P}$ だけである。境い目も範囲に入る。`,
            },
          ],
          pitfalls: [
            String.raw`「直線」ではなく「線分」なので、$\mathrm{P}'$ が $\mathrm{A}$ と $\mathrm{P}$ のあいだにあるかどうかが問題になる。`,
          ],
          check: String.raw`線分が円の内部に入るかを調べると、$\theta=1.0272$ では入らず $\theta=1.0672$ では入った（境い目は $\dfrac{\pi}3=1.0472$）。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{PQ}=\mathrm{PA}$ かつ半直線 $\mathrm{OP}$ が $\angle\mathrm{APQ}$ を二等分するような $\mathrm{Q}\left(x\left(\theta\right),y\left(\theta\right)\right)$ について、$x\left(\theta\right)$ と $y\left(\theta\right)$ を $\theta$ で表す`,
          answer: String.raw`$x\left(\theta\right)=2\cos2\theta$、$y\left(\theta\right)=2\sin2\theta$`,
          approach: String.raw`条件は「$\mathrm{Q}$ は直線 $\mathrm{OP}$ に関して $\mathrm{A}$ と対称」と同じ。直線 $\mathrm{OP}$ は原点を通り傾き角 $\theta$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{PA}=\mathrm{PQ}$ のとき、$\angle\mathrm{APQ}$ の二等分線は線分 $\mathrm{AQ}$ の垂直二等分線でもある。したがって条件 (i)(ii) は`,
            },
            { k: "p", t: String.raw`**$\mathrm{Q}$ は直線 $\mathrm{OP}$ に関して $\mathrm{A}$ と対称**` },
            {
              k: "p",
              t: String.raw`と言いかえられる。直線 $\mathrm{OP}$ は原点を通り、$x$ 軸の正の向きと角 $\theta$ をなす。原点からの距離は対称移動で変わらないので、$\mathrm{Q}$ は原点中心・半径 $\mathrm{OA}=2$ の円周上にあり、その偏角は $\mathrm{A}$ の偏角 $0$ を $\theta$ の向きに折り返した $2\theta$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`x\left(\theta\right)=2\cos2\theta,\qquad y\left(\theta\right)=2\sin2\theta`,
            },
            {
              k: "p",
              t: String.raw`である。$\theta=0$ でも $\theta=\pi$ でも $\mathrm{Q}=\left(2,0\right)=\mathrm{A}$ となり、問題の但し書きと合っている。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "Q の作り方（図は θ = 0.7 のとき）。Q は直線 OP について A と対称な点。PQ = PA で、半直線 OP が ∠APQ を二等分する。",
                view: [-2.4, 2.6, -1.25, 2.4],
                items: [
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [Math.cos(ph), Math.sin(ph)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0, 0], b: [2.3 * Math.cos(0.7), 2.3 * Math.sin(0.7)], dash: true },
                  { k: "seg", a: P19(0.7), b: [2, 0] },
                  { k: "seg", a: P19(0.7), b: Q19(0.7) },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [2, 0], label: "A", place: "below-right" },
                  { k: "dot", at: P19(0.7), label: "P", place: "above" },
                  { k: "dot", at: Q19(0.7), label: "Q", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{PQ}=\mathrm{PA}$ だけなら $\mathrm{Q}$ は円周上を動く。二等分の条件まで使って1点に決まる。`,
          ],
          check: String.raw`$\theta=0,0.4,\dfrac{\pi}3,1.5,3$ のどれでも $\mathrm{PQ}=\mathrm{PA}$ で、二等分方向と $\overrightarrow{\mathrm{OP}}$ が平行になった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\theta$ が $a\leqq\theta\leqq b$ で動くときの $\mathrm{Q}$ の軌跡を $C_1$ とする。$C_1$ の両端を結ぶ線分と $C_1$ で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{4\pi}{3}-\sqrt3$`,
          approach: String.raw`$C_1$ は半径 $2$ の円の弧。中心角は $\dfrac{2\pi}{3}$ で、弓形の面積は扇形から三角形を引く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1)(2) より、$\theta$ が $0$ から $\dfrac{\pi}{3}$ まで動くと $\mathrm{Q}$ の偏角 $2\theta$ は $0$ から $\dfrac{2\pi}{3}$ まで動く。つまり $C_1$ は原点中心・半径 $2$ の円の弧で、中心角は $\dfrac{2\pi}{3}$ である。両端は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{Q}\left(0\right)=\left(2,0\right),\qquad\mathrm{Q}\left(\frac{\pi}{3}\right)=\left(-1,\sqrt3\right)`,
            },
            { k: "p", t: String.raw`である。求める図形は弓形なので` },
            {
              k: "math",
              t: String.raw`S=\left(\text{扇形}\right)-\left(\text{三角形}\right)=\frac12\cdot2^{2}\cdot\frac{2\pi}{3}-\frac12\cdot2^{2}\sin\frac{2\pi}{3}`,
            },
            { k: "p", t: String.raw`である。計算すると` },
            {
              k: "math",
              t: String.raw`S=\frac{4\pi}{3}-2\cdot\frac{\sqrt3}{2}=\frac{4\pi}{3}-\sqrt3`,
            },
            { k: "p", t: String.raw`である（$2.4567\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "C1（半径 2 の弧）と C2（線分 PQ を 1 : 4 に内分する点の軌跡）。うすい円は半径 1 の円 C。塗った部分が (3) の弓形。",
                view: [-2.4, 2.6, -1.25, 2.5],
                items: [
                  {
                    k: "fill",
                    pts: Array.from({ length: 41 }, (_, i): [number, number] =>
                      Q19((Math.PI / 3) * (i / 40)),
                    ),
                  },
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [Math.cos(ph), Math.sin(ph)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "param", f: Q19, from: 0, to: Math.PI / 3 },
                  { k: "param", f: R19, from: 0, to: Math.PI / 3 },
                  { k: "seg", a: [2, 0], b: [-1, Math.sqrt(3)], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [2, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [-1, Math.sqrt(3)], label: "(−1, √3)", place: "above-left" },
                  { k: "text", at: Q19(0.52), label: "C1", place: "above-right" },
                  { k: "text", at: R19(0.3), label: "C2", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`弓形の面積を数値で求めると $2.456739397$ で、$\dfrac{4\pi}3-\sqrt3=2.456739397$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`線分 $\mathrm{PQ}$ を $1:4$ に内分する点を $\mathrm{R}$ とする。$\theta$ が $a\leqq\theta\leqq b$ で動くときの $\mathrm{R}$ の軌跡 $C_2$ の長さ $L$ を求める`,
          answer: String.raw`$L=\dfrac85$`,
          approach: String.raw`$\mathrm{R}=\dfrac{4\mathrm{P}+\mathrm{Q}}{5}$。速さを計算すると $\cos\dfrac{\theta}{2}$ の定数倍になる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{PR}:\mathrm{RQ}=1:4$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{R}=\frac{4\mathrm{P}+\mathrm{Q}}{5}=\left(\frac{4\cos\theta+2\cos2\theta}{5},\ \frac{4\sin\theta+2\sin2\theta}{5}\right)`,
            },
            { k: "p", t: String.raw`である。$\theta$ で微分すると` },
            {
              k: "math",
              t: String.raw`\frac{d\mathrm{R}}{d\theta}=\frac45\left(-\sin\theta-\sin2\theta,\ \cos\theta+\cos2\theta\right)`,
            },
            { k: "p", t: String.raw`である。速さの2乗は` },
            {
              k: "math",
              t: String.raw`\left(\frac45\right)^{2}\left\{\left(\sin\theta+\sin2\theta\right)^{2}+\left(\cos\theta+\cos2\theta\right)^{2}\right\}=\left(\frac45\right)^{2}\left(2+2\cos\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin\theta\sin2\theta+\cos\theta\cos2\theta=\cos\theta$ を使った）。$2+2\cos\theta=4\cos^{2}\dfrac{\theta}{2}$ で、$0\leqq\theta\leqq\dfrac{\pi}{3}$ では $\cos\dfrac{\theta}{2}>0$ だから`,
            },
            {
              k: "math",
              t: String.raw`\left|\frac{d\mathrm{R}}{d\theta}\right|=\frac45\cdot2\cos\frac{\theta}{2}=\frac85\cos\frac{\theta}{2}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{\frac{\pi}{3}}\frac85\cos\frac{\theta}{2}\,d\theta=\frac85\left[2\sin\frac{\theta}{2}\right]_{0}^{\frac{\pi}{3}}=\frac{16}{5}\sin\frac{\pi}{6}=\frac85`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ は半径 $1$ を角 $\theta$ で、$\mathrm{Q}$ は半径 $2$ を角 $2\theta$ で回る。$\mathrm{R}$ はその重みつき平均なので、エピサイクロイドの仲間になる。長さが $\dfrac85$ ときれいに出るのはこの構造のおかげ。`,
            },
          ],
          pitfalls: [
            String.raw`$\sqrt{2+2\cos\theta}=2\left|\cos\dfrac{\theta}{2}\right|$ の絶対値を外すとき、$\theta$ の範囲を確かめる。`,
          ],
          check: String.raw`$C_2$ の長さを細かく折れ線で近似すると $1.600000000$ で、$\dfrac85=1.6$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面",
      topics: ["3点が異なる条件", "一直線上にある条件", "正三角形になる条件", "垂直条件と絶対値"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\tfrac{z^{5}-z}{z^{3}-z}=z^{2}+1$ を使うと、$z=0.7$ と $z=0.7i$ では3点が一直線上に、$z=0.5+0.5i$ では一直線上にならなかった",
          "$z=\\pm e^{\\frac{\\pi}3i}$ では3辺がどれも $1.732051$ で、$\\mathrm{A}\\to\\mathrm{B}\\to\\mathrm{C}$ の外積が正（反時計回り）だった",
          "$\\mathrm{Re}\\left(1+\\tfrac1{z^{2}}\\right)=0$ を満たす $z$ を $20$ 万通り作ると、$\\left|z\\right|$ の最大は $0.99999998$ で $1$ を超えなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`複素数平面上の3点 $\mathrm{A}\left(z\right)$、$\mathrm{B}\left(z^{3}\right)$、$\mathrm{C}\left(z^{5}\right)$ が異なる3点となるための $z$ の条件を求める`,
          answer: String.raw`$z\ne0$ かつ $z^{4}\ne1$（つまり $z\ne0,\pm1,\pm i$）`,
          approach: String.raw`3つの差を因数分解する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`z^{3}-z=z\left(z^{2}-1\right),\quad z^{5}-z^{3}=z^{3}\left(z^{2}-1\right),\quad z^{5}-z=z\left(z^{4}-1\right)`,
            },
            { k: "p", t: String.raw`がすべて $0$ でなければよい。はじめの2つは` },
            {
              k: "math",
              t: String.raw`z\ne0\ \text{かつ}\ z^{2}\ne1`,
            },
            { k: "p", t: String.raw`と同値で、3つめは` },
            {
              k: "math",
              t: String.raw`z\ne0\ \text{かつ}\ z^{4}\ne1`,
            },
            {
              k: "p",
              t: String.raw`と同値である。$z^{4}=1$ は $z^{2}=1$ を含むので、まとめると`,
            },
            { k: "math", t: String.raw`z\ne0\ \text{かつ}\ z^{4}\ne1` },
            { k: "p", t: String.raw`すなわち $z\ne0,\ 1,\ -1,\ i,\ -i$ である。` },
          ],
          check: String.raw`$z=\pm1,\pm i,0$ ではどれかの2点が重なり、それ以外では3点とも異なることを確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`異なる3点 $\mathrm{A},\mathrm{B},\mathrm{C}$ が同一直線上にあるような $z$ をすべて求める`,
          answer: String.raw`$z$ が実数または純虚数（ただし $z\ne0,\pm1,\pm i$）`,
          approach: String.raw`$\dfrac{z^{5}-z}{z^{3}-z}$ が実数であること。約分すると $z^{2}+1$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3点が同一直線上にあるのは $\dfrac{\mathrm{C}-\mathrm{A}}{\mathrm{B}-\mathrm{A}}$ が実数のときである。(1) の因数分解を使って約分すると`,
            },
            {
              k: "math",
              t: String.raw`\frac{z^{5}-z}{z^{3}-z}=\frac{z\left(z^{2}-1\right)\left(z^{2}+1\right)}{z\left(z^{2}-1\right)}=z^{2}+1`,
            },
            { k: "p", t: String.raw`である。よって条件は **$z^{2}$ が実数**であることである。` },
            {
              k: "p",
              t: String.raw`$z=p+qi$（$p,q$ は実数）とおくと $z^{2}=p^{2}-q^{2}+2pqi$ なので、$z^{2}$ が実数なのは $pq=0$、つまり $p=0$ または $q=0$ のときである。これは`,
            },
            { k: "p", t: String.raw`$z$ が実数、または $z$ が純虚数` },
            {
              k: "p",
              t: String.raw`ということである。(1) の条件とあわせて、$z\ne0,\pm1,\pm i$ を満たす実数または純虚数 $z$ が答えである。`,
            },
            {
              k: "note",
              t: String.raw`$z^{4}-1=\left(z^{2}-1\right)\left(z^{2}+1\right)$ の約分が全体のかなめ。(3)(4) でも同じ $z^{2}+1$ が出てくる。`,
            },
          ],
          check: String.raw`$z=0.7$ と $z=0.7i$ では3点が一直線上にあり、$z=0.5+0.5i$ ではそうならなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{A},\mathrm{B},\mathrm{C}$ が正三角形の頂点になるときの $z^{2}$ の値をすべて求め、さらに $\mathrm{A},\mathrm{B},\mathrm{C}$ がこの順に反時計回りに並ぶような $z$ をすべて求める`,
          answer: String.raw`$z^{2}=\dfrac{-1\pm\sqrt3\,i}{2}$。反時計回りになるのは $z=\pm\dfrac{1+\sqrt3\,i}{2}$`,
          approach: String.raw`正三角形 $\iff\dfrac{\mathrm{C}-\mathrm{A}}{\mathrm{B}-\mathrm{A}}=\cos\left(\pm\dfrac{\pi}{3}\right)+i\sin\left(\pm\dfrac{\pi}{3}\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $\dfrac{\mathrm{C}-\mathrm{A}}{\mathrm{B}-\mathrm{A}}=z^{2}+1$ である。$\mathrm{A},\mathrm{B},\mathrm{C}$ が正三角形の頂点になるのは、この値の絶対値が $1$ で偏角が $\pm\dfrac{\pi}{3}$ のとき、すなわち`,
            },
            {
              k: "math",
              t: String.raw`z^{2}+1=\cos\left(\pm\frac{\pi}{3}\right)+i\sin\left(\pm\frac{\pi}{3}\right)=\frac{1\pm\sqrt3\,i}{2}`,
            },
            { k: "p", t: String.raw`のときである。よって` },
            {
              k: "math",
              t: String.raw`z^{2}=\frac{1\pm\sqrt3\,i}{2}-1=\frac{-1\pm\sqrt3\,i}{2}`,
            },
            { k: "p", t: String.raw`である（複号同順ではなく、2つの値がどちらも答え）。` },
            {
              k: "p",
              t: String.raw`次に並び方を見る。$\mathrm{A},\mathrm{B},\mathrm{C}$ がこの順に反時計回りなら、$\overrightarrow{\mathrm{AB}}$ を $+\dfrac{\pi}{3}$ 回すと $\overrightarrow{\mathrm{AC}}$ になるので`,
            },
            {
              k: "math",
              t: String.raw`z^{2}+1=\cos\frac{\pi}{3}+i\sin\frac{\pi}{3},\qquad z^{2}=\frac{-1+\sqrt3\,i}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。これは $\cos\dfrac{2\pi}{3}+i\sin\dfrac{2\pi}{3}$ なので、$z$ は絶対値 $1$、偏角 $\dfrac{\pi}{3}$ または $\dfrac{\pi}{3}+\pi$ の数で`,
            },
            {
              k: "math",
              t: String.raw`z=\pm\left(\cos\frac{\pi}{3}+i\sin\frac{\pi}{3}\right)=\pm\frac{1+\sqrt3\,i}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "z = cos(π/3) + i sin(π/3) のときの A, B, C。どれも単位円上にあり、A(z) は偏角 π/3、B(z³) は偏角 π、C(z⁵) は偏角 5π/3。この順に反時計回りに並ぶ。",
                view: [-1.75, 1.75, -1.4, 1.4],
                items: [
                  {
                    k: "param",
                    f: (ph: number): [number, number] => [Math.cos(ph), Math.sin(ph)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0.5, Math.sqrt(3) / 2], b: [-1, 0] },
                  { k: "seg", a: [-1, 0], b: [0.5, -Math.sqrt(3) / 2] },
                  { k: "seg", a: [0.5, -Math.sqrt(3) / 2], b: [0.5, Math.sqrt(3) / 2] },
                  { k: "dot", at: [0.5, Math.sqrt(3) / 2], label: "A", place: "above-right" },
                  { k: "dot", at: [-1, 0], label: "B", place: "left" },
                  { k: "dot", at: [0.5, -Math.sqrt(3) / 2], label: "C", place: "below-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$z^{2}$ を聞かれているので、まず $z^{2}$ の2値を答える。$z$ を求めるのは「反時計回り」の条件がついてから。`,
          ],
          check: String.raw`$z=\pm e^{\frac{\pi}3i}$ では3辺がどれも $1.732051$ で、$\mathrm{A}\to\mathrm{B}\to\mathrm{C}$ の外積が正になった。`,
        },
        {
          label: "(4)",
          task: String.raw`直線 $\mathrm{AC}$ と直線 $\mathrm{BC}$ が垂直であるとき、$\left|z\right|<1$ が成り立つことを示す`,
          answer: String.raw`$\dfrac{\mathrm{C}-\mathrm{A}}{\mathrm{C}-\mathrm{B}}=1+\dfrac1{z^{2}}$ が純虚数 $ki$ となるので $z^{2}=\dfrac{1}{-1+ki}$、$\left|z\right|^{2}=\dfrac1{\sqrt{1+k^{2}}}<1$`,
          approach: String.raw`垂直 $\iff$ 比が純虚数。比を約分すると $1+\dfrac{1}{z^{2}}$ になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の因数分解を使うと` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{C}-\mathrm{A}}{\mathrm{C}-\mathrm{B}}=\frac{z\left(z^{4}-1\right)}{z^{3}\left(z^{2}-1\right)}=\frac{z^{2}+1}{z^{2}}=1+\frac{1}{z^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。2直線が垂直であることは、この値が純虚数であることと同値である。よって実数 $k\ne0$ を用いて`,
            },
            {
              k: "math",
              t: String.raw`1+\frac{1}{z^{2}}=ki,\qquad\frac{1}{z^{2}}=-1+ki,\qquad z^{2}=\frac{1}{-1+ki}`,
            },
            { k: "p", t: String.raw`と書ける。絶対値をとると` },
            {
              k: "math",
              t: String.raw`\left|z\right|^{2}=\left|z^{2}\right|=\frac{1}{\left|-1+ki\right|}=\frac{1}{\sqrt{1+k^{2}}}`,
            },
            {
              k: "p",
              t: String.raw`である。$k\ne0$ より $\sqrt{1+k^{2}}>1$ なので $\left|z\right|^{2}<1$、すなわち $\left|z\right|<1$ である。（証明終わり）`,
            },
            {
              k: "note",
              t: String.raw`$k=0$ だと $1+\dfrac{1}{z^{2}}=0$、つまり $z^{2}=-1$ で $z=\pm i$ になり、(1) で除いた値である。だから $k\ne0$ としてよい。`,
            },
          ],
          pitfalls: [
            String.raw`「純虚数」は $0$ を含まない。$k\ne0$ をはっきりさせないと $\left|z\right|<1$ の不等号が等号つきになってしまう。`,
          ],
          check: String.raw`この条件を満たす $z$ を $20$ 万通り作ると、$\left|z\right|$ の最大は $0.99999998$ で $1$ を超えなかった。`,
        },
      ],
    },
  ],
};
