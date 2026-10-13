import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2019年度（平成31年度）一般入試 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\left(2e-x\right)\log x$。 */
const F19U = (x: number): number => (2 * Math.E - x) * Math.log(x);

/** 第2問の $f\left(x\right)=\dfrac1{\sin x}-2\cos2x-1$。 */
const G19U = (x: number): number => 1 / Math.sin(x) - 2 * Math.cos(2 * x) - 1;

/** 第3問の双曲線 $\dfrac{x^{2}}{16}-\dfrac{y^{2}}{64}=1$（右の枝と左の枝）。 */
const H19R = (t: number): [number, number] => [4 * Math.cosh(t), 8 * Math.sinh(t)];
const H19L = (t: number): [number, number] => [-4 * Math.cosh(t), 8 * Math.sinh(t)];
/** 図の上下の端（$y=\pm17$）にあたる媒介変数の値。 */
const T19 = Math.asinh(17 / 8);

export const uec2019: SolutionSet = {
  slug: "uec",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "情報理工学域",
  university: "電気通信大学",
  short: "電通大",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["対数関数の微分", "2階微分で単調性を見る", "部分積分", "曲線と x 軸で囲む面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f\\left(1\\right)=f\\left(2e\\right)=0$、$f'\\left(e\\right)=0$、$f\\left(e\\right)=2.718281828=e$ になった",
          "$f'$ と $f''$ の式は $x=0.5,1,3,6$ で数値微分と一致した",
          "$\\tfrac{x^{2}}2\\log x-\\tfrac{x^{2}}4$ の微分は $x\\log x$ と一致し、面積は数値 $8.0409144$ で式も $8.0409144$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\left(2e-x\right)\log x$（$x>0$）について $f\left(x\right)=0$ をみたす $x$ をすべて求める`,
          answer: String.raw`$x=1,\ 2e$`,
          approach: String.raw`積が $0$ なので、どちらかの因数が $0$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(2e-x\right)\log x=0$ は $2e-x=0$ または $\log x=0$ である。$x>0$ の範囲で`,
            },
            { k: "math", t: String.raw`x=2e,\qquad x=1` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$f\left(1\right)=f\left(2e\right)=0$ だった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$f'\left(x\right)$ と $f''\left(x\right)$ を求める`,
          answer: String.raw`$f'\left(x\right)=-\log x+\dfrac{2e}{x}-1$、$f''\left(x\right)=-\dfrac{x+2e}{x^{2}}$`,
          approach: String.raw`積の微分。$f''$ は分母をそろえる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=-\log x+\left(2e-x\right)\cdot\frac1x=-\log x+\frac{2e}{x}-1`,
            },
            { k: "p", t: String.raw`である。もう一度微分すると` },
            {
              k: "math",
              t: String.raw`f''\left(x\right)=-\frac1x-\frac{2e}{x^{2}}=-\frac{x+2e}{x^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$x>0$ では $f''<0$。つまり $f'$ は**つねに減少**する。これが (iii) のかぎになる。`,
            },
          ],
          check: String.raw`$x=0.5,1,3,6$ で数値微分と一致した。`,
        },
        {
          label: "(iii)",
          task: String.raw`$f\left(x\right)$ の極値を求める`,
          answer: String.raw`$x=e$ で極大値 $e$（極小値はない）`,
          approach: String.raw`$f''<0$ より $f'$ は減少。$f'\left(e\right)=0$ に気づけばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(ii) より $x>0$ で $f''<0$ なので、$f'$ は狭義単調減少である。また`,
            },
            {
              k: "math",
              t: String.raw`f'\left(e\right)=-1+\frac{2e}{e}-1=-1+2-1=0`,
            },
            {
              k: "p",
              t: String.raw`なので、$f'$ は $0<x<e$ で正、$x>e$ で負である。したがって $x=e$ で極大になり`,
            },
            {
              k: "math",
              t: String.raw`f\left(e\right)=\left(2e-e\right)\log e=e`,
            },
            { k: "p", t: String.raw`が極大値である。極小値はない。` },
            {
              k: "note",
              t: String.raw`$f'$ が減少するので $f'=0$ の解はたかだか1つ。$x=e$ で $0$ になることに気づけば、それが唯一の解だと言い切れる。`,
            },
          ],
          check: String.raw`$1<x<6$ を $40$ 万点走査すると最大は $x=2.7182875$ で値 $2.7182818=e$ だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`不定積分 $I=\displaystyle\int x\log x\,dx$ を求める`,
          answer: String.raw`$I=\dfrac{x^{2}}{2}\log x-\dfrac{x^{2}}{4}$（積分定数は省略）`,
          approach: String.raw`部分積分。$\log x$ を微分する側にとる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`I=\frac{x^{2}}{2}\log x-\int\frac{x^{2}}{2}\cdot\frac1x\,dx=\frac{x^{2}}{2}\log x-\frac{x^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値微分すると $x\log x$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`曲線 $y=f\left(x\right)$ と $x$ 軸で囲まれた部分の面積 $S$ を求める`,
          answer: String.raw`$S=2e^{2}\log2-e^{2}+2e-\dfrac14$`,
          approach: String.raw`$1\leqq x\leqq2e$ で $f\geqq0$。$\displaystyle\int\log x\,dx$ と (iv) を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(i) より $f=0$ は $x=1,2e$ だけで、その間では $f>0$（たとえば $f\left(e\right)=e>0$）である。$x<1$ でも $x>2e$ でも $f<0$ なので、囲まれる部分は $1\leqq x\leqq2e$ の1つだけである。`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{1}^{2e}\left(2e-x\right)\log x\,dx=2e\int_{1}^{2e}\log x\,dx-\int_{1}^{2e}x\log x\,dx`,
            },
            { k: "p", t: String.raw`である。$\displaystyle\int\log x\,dx=x\log x-x$ なので` },
            {
              k: "math",
              t: String.raw`\int_{1}^{2e}\log x\,dx=\left(2e\log2e-2e\right)-\left(0-1\right)=2e\log2+1`,
            },
            { k: "p", t: String.raw`である（$\log2e=\log2+1$）。また (iv) より` },
            {
              k: "math",
              t: String.raw`\int_{1}^{2e}x\log x\,dx=\left(2e^{2}\log2e-e^{2}\right)-\left(-\frac14\right)=2e^{2}\log2+e^{2}+\frac14`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`S=\left(4e^{2}\log2+2e\right)-\left(2e^{2}\log2+e^{2}+\frac14\right)=2e^{2}\log2-e^{2}+2e-\frac14`,
            },
            { k: "p", t: String.raw`である（$8.0409\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ。x = 1 と x = 2e で x 軸と交わり、x = e で極大 e。塗った部分が S。",
                view: [-0.5, 6.6, -1.6, 3.5],
                items: [
                  { k: "fillBetween", top: F19U, bottom: () => 0, from: 1, to: 2 * Math.E },
                  { k: "curve", f: F19U, from: 0.12, to: 6.4 },
                  { k: "dot", at: [Math.E, Math.E], label: "極大 (e, e)", place: "above" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-left" },
                  { k: "dot", at: [2 * Math.E, 0], label: "(2e, 0)", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`数値積分すると $8.0409144$ で、式の値も $8.0409144$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "三角関数・積分",
      topics: ["2倍角の公式", "sin x の3次式に直す", "重解と接する形", "1/sin x の積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f'=\\tfrac{\\cos x\\left(8\\sin^{3}x-1\\right)}{\\sin^{2}x}$ は $x=0.4,1,2,2.8$ で数値微分と一致した",
          "$f\\left(\\tfrac{\\pi}6\\right)=f\\left(\\tfrac{5\\pi}6\\right)=0$、$f\\left(\\tfrac{\\pi}2\\right)=2$、$\\left(0,\\pi\\right)$ での最小は $0$ だった",
          "$\\tfrac12\\log\\tfrac{1-\\cos x}{1+\\cos x}$ の微分は $\\tfrac1{\\sin x}$ と一致し、面積は数値 $2.2715715$、式も $2.2715715$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\dfrac{1}{\sin x}-2\cos2x-1$（$0<x<\pi$）の $f'\left(x\right)$ を求める`,
          answer: String.raw`$f'\left(x\right)=\dfrac{\cos x\left(8\sin^{3}x-1\right)}{\sin^{2}x}$`,
          approach: String.raw`$\left(\sin x\right)^{-1}$ の微分と $\sin2x=2\sin x\cos x$ を使ってまとめる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=-\frac{\cos x}{\sin^{2}x}+4\sin2x=-\frac{\cos x}{\sin^{2}x}+8\sin x\cos x`,
            },
            { k: "p", t: String.raw`である。$\cos x$ でくくり、分母を $\sin^{2}x$ にそろえると` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{\cos x\left(8\sin^{3}x-1\right)}{\sin^{2}x}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$x=0.4,1,2,2.8$ で数値微分と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$0<x<\pi$ で $f\left(x\right)=0$ をみたす $x$ をすべて求める`,
          answer: String.raw`$x=\dfrac{\pi}{6},\ \dfrac{5\pi}{6}$`,
          approach: String.raw`$2\cos2x+1=3-4\sin^{2}x$。$s=\sin x$ の3次方程式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\cos2x=1-2\sin^{2}x$ なので $2\cos2x+1=3-4\sin^{2}x$ である。$s=\sin x$（$0<s\leqq1$）とおくと`,
            },
            {
              k: "math",
              t: String.raw`f=\frac1s-3+4s^{2}`,
            },
            { k: "p", t: String.raw`である。$f=0$ の両辺に $s>0$ を掛けると` },
            {
              k: "math",
              t: String.raw`4s^{3}-3s+1=0,\qquad\left(s+1\right)\left(2s-1\right)^{2}=0`,
            },
            {
              k: "p",
              t: String.raw`となる。$0<s\leqq1$ より $s=\dfrac12$ だけで、$0<x<\pi$ では`,
            },
            { k: "math", t: String.raw`x=\frac{\pi}{6},\qquad x=\frac{5\pi}{6}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(2s-1\right)^{2}$ と重解になっているので、曲線は $x$ 軸に**接する**。(iii) の極小値が $0$ になるのはこのためである。`,
            },
          ],
          check: String.raw`$f\left(\dfrac{\pi}6\right)$ も $f\left(\dfrac{5\pi}6\right)$ も $0$（誤差 $10^{-16}$）だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$0<x<\pi$ における $f\left(x\right)$ の極値をすべて求める`,
          answer: String.raw`$x=\dfrac{\pi}{6},\dfrac{5\pi}{6}$ で極小値 $0$、$x=\dfrac{\pi}{2}$ で極大値 $2$`,
          approach: String.raw`(i) の形で $\cos x$ と $8\sin^{3}x-1$ の符号を追う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\sin^{2}x>0$ なので符号は $\cos x$ と $8\sin^{3}x-1$ で決まる。$8\sin^{3}x-1>0$ は $\sin x>\dfrac12$、つまり $\dfrac{\pi}{6}<x<\dfrac{5\pi}{6}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<x<\dfrac{\pi}{6}$：$\cos x>0$、$8\sin^{3}x-1<0$ なので $f'<0$`,
                String.raw`$\dfrac{\pi}{6}<x<\dfrac{\pi}{2}$：$\cos x>0$、$8\sin^{3}x-1>0$ なので $f'>0$`,
                String.raw`$\dfrac{\pi}{2}<x<\dfrac{5\pi}{6}$：$\cos x<0$、$8\sin^{3}x-1>0$ なので $f'<0$`,
                String.raw`$\dfrac{5\pi}{6}<x<\pi$：$\cos x<0$、$8\sin^{3}x-1<0$ なので $f'>0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $x=\dfrac{\pi}{6},\dfrac{5\pi}{6}$ で極小、$x=\dfrac{\pi}{2}$ で極大である。値は (ii) の $f=\dfrac1s+4s^{2}-3$ に $s=\dfrac12,1$ を入れて`,
            },
            {
              k: "math",
              t: String.raw`f\left(\frac{\pi}{6}\right)=f\left(\frac{5\pi}{6}\right)=2+1-3=0,\qquad f\left(\frac{\pi}{2}\right)=1+4-3=2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x)（0 < x < π）。x = π/6 と x = 5π/6 で x 軸に接し（極小 0）、x = π/2 で極大 2。両端では +∞ に発散する。塗った部分が (v) の面積。",
                view: [-0.35, 3.5, -0.7, 3.4],
                items: [
                  { k: "fillBetween", top: G19U, bottom: () => 0, from: Math.PI / 6, to: (5 * Math.PI) / 6 },
                  { k: "curve", f: G19U, from: 0.3, to: Math.PI - 0.3 },
                  { k: "dot", at: [Math.PI / 2, 2], label: "極大 2", place: "above" },
                  { k: "dot", at: [Math.PI / 6, 0], label: "π/6", place: "below-left" },
                  { k: "dot", at: [(5 * Math.PI) / 6, 0], label: "5π/6", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$\left(0,\pi\right)$ の $20$ 万点走査で最小は $0$、$f\left(\dfrac{\pi}2\right)=2$ だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`不定積分 $I=\displaystyle\int\frac{dx}{\sin x}$ を求める`,
          answer: String.raw`$I=\dfrac12\log\dfrac{1-\cos x}{1+\cos x}$（積分定数は省略）`,
          approach: String.raw`分母分子に $\sin x$ を掛けて $u=\cos x$ と置換する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`I=\int\frac{\sin x}{\sin^{2}x}dx=\int\frac{\sin x}{1-\cos^{2}x}dx`,
            },
            { k: "p", t: String.raw`である。$u=\cos x$ とおくと $du=-\sin x\,dx$ なので` },
            {
              k: "math",
              t: String.raw`I=-\int\frac{du}{1-u^{2}}=-\frac12\int\left(\frac{1}{1-u}+\frac{1}{1+u}\right)du=\frac12\log\frac{1-u}{1+u}`,
            },
            {
              k: "p",
              t: String.raw`である（$0<x<\pi$ では $-1<u<1$ なので絶対値は外せる）。$u=\cos x$ に戻して`,
            },
            {
              k: "math",
              t: String.raw`I=\frac12\log\frac{1-\cos x}{1+\cos x}`,
            },
            { k: "p", t: String.raw`である（$=\log\tan\dfrac x2$ とも書ける）。` },
          ],
          check: String.raw`$x=0.5,1.5,2.5$ で数値微分すると $\dfrac1{\sin x}$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`曲線 $y=f\left(x\right)$ と $x$ 軸で囲まれた部分の面積 $S$ を求める`,
          answer: String.raw`$S=2\log\left(2+\sqrt3\right)+\sqrt3-\dfrac{2\pi}{3}$`,
          approach: String.raw`$f\geqq0$ で、$x=\dfrac{\pi}{6},\dfrac{5\pi}{6}$ で接する。その間を積分する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(ii) より $sf=4s^{3}-3s+1=\left(s+1\right)\left(2s-1\right)^{2}\geqq0$ で $s>0$ だから、$0<x<\pi$ でつねに $f\geqq0$ である。$x$ 軸と囲むのは、接する2点のあいだ $\dfrac{\pi}{6}\leqq x\leqq\dfrac{5\pi}{6}$ だけである。`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac{\pi}{6}}^{\frac{5\pi}{6}}\left(\frac{1}{\sin x}-2\cos2x-1\right)dx=\left[\frac12\log\frac{1-\cos x}{1+\cos x}-\sin2x-x\right]_{\frac{\pi}{6}}^{\frac{5\pi}{6}}`,
            },
            { k: "p", t: String.raw`である。$\cos\dfrac{5\pi}{6}=-\dfrac{\sqrt3}{2}$ なので` },
            {
              k: "math",
              t: String.raw`\frac{1-\cos x}{1+\cos x}=\frac{2+\sqrt3}{2-\sqrt3}=\left(2+\sqrt3\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`で、対数の項は $\log\left(2+\sqrt3\right)$ である。同じように $x=\dfrac{\pi}{6}$ では $\log\left(2-\sqrt3\right)=-\log\left(2+\sqrt3\right)$ になる。また $\sin\dfrac{5\pi}{3}=-\dfrac{\sqrt3}{2}$、$\sin\dfrac{\pi}{3}=\dfrac{\sqrt3}{2}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\left\{\log\left(2+\sqrt3\right)+\frac{\sqrt3}{2}-\frac{5\pi}{6}\right\}-\left\{-\log\left(2+\sqrt3\right)-\frac{\sqrt3}{2}-\frac{\pi}{6}\right\}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`S=2\log\left(2+\sqrt3\right)+\sqrt3-\frac{2\pi}{3}`,
            },
            { k: "p", t: String.raw`である（$2.2716\ldots$）。` },
            {
              k: "note",
              t: String.raw`$\left(2+\sqrt3\right)\left(2-\sqrt3\right)=1$ なので $\log\left(2-\sqrt3\right)=-\log\left(2+\sqrt3\right)$。だから対数の項が2倍になる。`,
            },
          ],
          pitfalls: [
            String.raw`$f\geqq0$ なので「$x$ 軸と囲む」のは接点どうしのあいだだけ。両端 $x\to0,\pi$ では発散するので、そこまで積分しない。`,
          ],
          check: String.raw`数値積分すると $2.2715715$ で、式の値も $2.2715715$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "2次曲線",
      topics: ["双曲線の漸近線", "点と直線の距離", "陰関数の微分", "直線が通過する領域"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(5,6\\right)$ は $C$ 上にあり、$2x-y=0$ との距離は $1.7888544=\\tfrac4{\\sqrt5}$、$2x+y=0$ とは $7.1554175$ だった",
          "$m=-2\\pm\\sqrt6$ のとき直線が $\\left(1,6\\right)$ を通った",
          "$m$ と $x$ をランダムに $20$ 万通りとって $\\ell$ 上の点を作ると、$4x^{2}-y^{2}>64$ になることは一度もなかった。$C$ 上の4点で $m=\\tfrac{2x_1+y_1}8$ が成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`双曲線 $C\colon\dfrac{x^{2}}{16}-\dfrac{y^{2}}{64}=1$ の2つの漸近線のうち、$C$ 上の点 $\left(5,6\right)$ との距離が小さいほうの漸近線 $\ell_1$ の方程式と、その距離 $d$ を求める`,
          answer: String.raw`$\ell_1\colon y=2x$、$d=\dfrac{4\sqrt5}{5}$`,
          approach: String.raw`漸近線は $y=\pm\dfrac84x=\pm2x$。点と直線の距離の公式で比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\dfrac{x^{2}}{16}-\dfrac{y^{2}}{64}=0$ から漸近線は $y=\pm2x$ である。$\left(5,6\right)$ は $\dfrac{25}{16}-\dfrac{36}{64}=\dfrac{25-9}{16}=1$ で確かに $C$ 上にある。`,
            },
            {
              k: "math",
              t: String.raw`\left(2x-y=0\ \text{との距離}\right)=\frac{\left|10-6\right|}{\sqrt5}=\frac{4}{\sqrt5},\qquad\left(2x+y=0\right)=\frac{\left|10+6\right|}{\sqrt5}=\frac{16}{\sqrt5}`,
            },
            { k: "p", t: String.raw`なので、近いほうは $y=2x$ で` },
            { k: "math", t: String.raw`d=\frac{4}{\sqrt5}=\frac{4\sqrt5}{5}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値では $1.7888544$ と $7.1554175$ で、$\dfrac4{\sqrt5}=1.7888544$ と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$C$ 上の点 $\left(5,6\right)$ における $C$ の接線の傾きを求める`,
          answer: String.raw`$\dfrac{10}{3}$`,
          approach: String.raw`両辺を $x$ で微分する（陰関数の微分）。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{2x}{16}-\frac{2yy'}{64}=0,\qquad y'=\frac{4x}{y}`,
            },
            { k: "p", t: String.raw`である。$\left(5,6\right)$ を入れると` },
            { k: "math", t: String.raw`y'=\frac{20}{6}=\frac{10}{3}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\dfrac{4x}y=\dfrac{20}6=3.3333333=\dfrac{10}3$ だった。`,
        },
        {
          label: "(iii)(ア)",
          task: String.raw`$\ell\colon2\left(m^{2}+1\right)x-\left(m^{2}-1\right)y=16m$ が点 $\left(1,6\right)$ を通るような $m$ をすべて求める`,
          answer: String.raw`$m=-2\pm\sqrt6$`,
          approach: String.raw`代入して $m$ の2次方程式にする。`,
          blocks: [
            {
              k: "math",
              t: String.raw`2\left(m^{2}+1\right)-6\left(m^{2}-1\right)=16m`,
            },
            { k: "p", t: String.raw`すなわち $-4m^{2}+8=16m$、整理して` },
            { k: "math", t: String.raw`m^{2}+4m-2=0,\qquad m=-2\pm\sqrt6` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$m=-2\pm\sqrt6$ で左辺と右辺が一致した。`,
        },
        {
          label: "(iii)(イ)",
          task: String.raw`$m$ が実数全体を動くとき、$\ell$ が通過する領域 $D$ を表す不等式を求める`,
          answer: String.raw`$\dfrac{x^{2}}{16}-\dfrac{y^{2}}{64}\leqq1$（つまり $4x^{2}-y^{2}\leqq64$）`,
          approach: String.raw`$m$ についての2次方程式とみて、実数解をもつ条件を書く。`,
          blocks: [
            { k: "p", t: String.raw`$\ell$ の式を $m$ について整理すると` },
            {
              k: "math",
              t: String.raw`\left(2x-y\right)m^{2}-16m+\left(2x+y\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。点 $\left(x,y\right)$ が $D$ に属することは、この $m$ の方程式が実数解をもつことと同じである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$2x-y\ne0$ のとき：2次方程式なので判別式 $\geqq0$、つまり $256-4\left(2x-y\right)\left(2x+y\right)\geqq0$`,
                String.raw`$2x-y=0$ のとき：$-16m+4x=0$ から $m=\dfrac x4$ でつねに解がある。このとき $4x^{2}-y^{2}=0\leqq64$`,
              ],
            },
            { k: "p", t: String.raw`である。前者を整理すると` },
            {
              k: "math",
              t: String.raw`\left(2x-y\right)\left(2x+y\right)=4x^{2}-y^{2}\leqq64`,
            },
            {
              k: "p",
              t: String.raw`で、後者もこれに含まれる。よって $D$ は`,
            },
            {
              k: "math",
              t: String.raw`4x^{2}-y^{2}\leqq64,\qquad\text{すなわち}\quad\frac{x^{2}}{16}-\frac{y^{2}}{64}\leqq1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`境界は双曲線 $C$ そのもの。$D$ は「$C$ の2つの枝にはさまれた側」である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "双曲線 C と漸近線 y = ±2x（点線）。領域 D は 2 つの枝にはさまれた側（境界を含む）で、塗った部分。直線 ℓ はこの中だけを動く。",
                view: [-19.5, 19.5, -17.0, 17.0],
                items: [
                  {
                    k: "fill",
                    pts: [
                      ...Array.from({ length: 61 }, (_, i): [number, number] =>
                        H19R(-T19 + (2 * T19 * i) / 60),
                      ),
                      ...Array.from({ length: 61 }, (_, i): [number, number] =>
                        H19L(T19 - (2 * T19 * i) / 60),
                      ),
                    ],
                  },
                  { k: "seg", a: [-8.5, -17.0], b: [8.5, 17.0], dash: true, faint: true },
                  { k: "seg", a: [-8.5, 17.0], b: [8.5, -17.0], dash: true, faint: true },
                  { k: "param", f: H19R, from: -T19, to: T19 },
                  { k: "param", f: H19L, from: -T19, to: T19 },
                  { k: "dot", at: [5, 6], label: "(5, 6)", place: "right" },
                  { k: "text", at: [0, 9], label: "D", place: "above" },
                ],
              },
            },
          ],
          check: String.raw`$m$ と $x$ をランダムに $20$ 万通りとって $\ell$ 上の点を作ると、$4x^{2}-y^{2}>64$ になることは一度もなかった。`,
        },
        {
          label: "(iii)(ウ)",
          task: String.raw`$\ell$ が $C$ 上の点 $\left(x_1,y_1\right)$ を通るとき、$m$ を $x_1,y_1$ の1次式で表す`,
          answer: String.raw`$m=\dfrac{2x_1+y_1}{8}$`,
          approach: String.raw`$C$ 上では判別式が $0$ になり、重解 $m=\dfrac{8}{2x_1-y_1}$。$\left(2x_1-y_1\right)\left(2x_1+y_1\right)=64$ で書き直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(x_1,y_1\right)$ が $C$ 上なら $4x_1^{2}-y_1^{2}=64$、つまり $\left(2x_1-y_1\right)\left(2x_1+y_1\right)=64$ である。(イ) の2次方程式の判別式は`,
            },
            {
              k: "math",
              t: String.raw`256-4\left(2x_1-y_1\right)\left(2x_1+y_1\right)=256-4\cdot64=0`,
            },
            {
              k: "p",
              t: String.raw`なので重解で、$2x_1-y_1\ne0$（積が $64\ne0$ だから）より`,
            },
            {
              k: "math",
              t: String.raw`m=\frac{16}{2\left(2x_1-y_1\right)}=\frac{8}{2x_1-y_1}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{1}{2x_1-y_1}=\dfrac{2x_1+y_1}{64}$ を使うと` },
            {
              k: "math",
              t: String.raw`m=\frac{8\left(2x_1+y_1\right)}{64}=\frac{2x_1+y_1}{8}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`判別式が $0$ ということは、$C$ 上の点を通る $\ell$ はただ1つで、しかもそこで $C$ に接している。実際 $\left(5,6\right)$ では $m=\dfrac{10+6}{8}=2$ で、$\ell$ は $10x-3y=32$、傾き $\dfrac{10}{3}$。(ii) の接線の傾きと一致する。`,
            },
          ],
          check: String.raw`$C$ 上の4点で $m=\dfrac{2x_1+y_1}8$ とすると $\ell$ の式の残差が $10^{-14}$ 以下だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["さいころと数直線", "余りで分ける", "確率の漸化式", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$p_1=\\tfrac56$、$p_2=\\tfrac{13}{18}$ で、$p_n=\\tfrac12\\left\\{1+\\left(\\tfrac23\\right)^{n}\\right\\}$ が $n=1$ から $11$ まで一致した",
          "余り $0,1,2$ の確率を分数のまま追うと $q_1,\\ldots,q_6=\\tfrac13,\\tfrac5{18},\\tfrac13,\\tfrac{73}{216},\\tfrac13,\\tfrac{863}{2592}$ だった",
          "$q_{n+2}=-\\tfrac{q_n}{12}+\\tfrac{13}{36}$ が $n=1$ から $10$ まで成り立ち、奇数 $n$ で $\\tfrac13$、偶数 $n=2m$ で $\\tfrac13+\\tfrac23\\left(-\\tfrac1{12}\\right)^{m}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "[I](i)",
          task: String.raw`さいころを投げ、$1,3,5$ なら $\mathrm{P}$ を $+2$、$6$ なら $+1$、$2,4$ なら動かさない。原点から始めて $n$ 回後の座標が $2$ の倍数である確率を $p_n$ とするとき、$p_1,p_2$ を求める`,
          answer: String.raw`$p_1=\dfrac56$、$p_2=\dfrac{13}{18}$`,
          approach: String.raw`$2$ の倍数かどうかは、$+1$（確率 $\dfrac16$）のときだけ変わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1$ 回の移動量は $+2$（確率 $\dfrac12$）、$+1$（確率 $\dfrac16$）、$0$（確率 $\dfrac13$）である。偶奇は $+1$ のときだけ変わる。`,
            },
            {
              k: "p",
              t: String.raw`$1$ 回後は、$+2$ か $0$ なら偶数のままなので`,
            },
            { k: "math", t: String.raw`p_1=\frac12+\frac13=\frac56` },
            { k: "p", t: String.raw`である。$2$ 回後は` },
            {
              k: "math",
              t: String.raw`p_2=\frac56\cdot\frac56+\frac16\cdot\frac16=\frac{25}{36}+\frac{1}{36}=\frac{26}{36}=\frac{13}{18}`,
            },
            { k: "p", t: String.raw`である（偶数のまま、または奇数から奇数へ戻る）。` },
          ],
          check: String.raw`分数のまま計算して $p_1=\dfrac56$、$p_2=\dfrac{13}{18}$ を確かめた。`,
        },
        {
          label: "[I](ii)",
          task: String.raw`$p_{n+1}$ を $p_n$ で表し、$p_n$ を $n$ の式で表す`,
          answer: String.raw`$p_{n+1}=\dfrac{2}{3}p_n+\dfrac16$、$p_n=\dfrac12\left\{1+\left(\dfrac23\right)^{n}\right\}$`,
          approach: String.raw`偶奇が変わるのは確率 $\dfrac16$。特性方程式の解 $\dfrac12$ を引く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 回後に偶数なら、$n+1$ 回後も偶数である確率は $\dfrac56$。奇数なら偶数になる確率は $\dfrac16$。よって`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac56p_n+\frac16\left(1-p_n\right)=\frac23p_n+\frac16`,
            },
            { k: "p", t: String.raw`である。$p=\dfrac23p+\dfrac16$ を解くと $p=\dfrac12$ なので` },
            {
              k: "math",
              t: String.raw`p_{n+1}-\frac12=\frac23\left(p_n-\frac12\right)`,
            },
            { k: "p", t: String.raw`である。$p_1-\dfrac12=\dfrac13$ だから` },
            {
              k: "math",
              t: String.raw`p_n-\frac12=\frac13\left(\frac23\right)^{n-1}=\frac12\left(\frac23\right)^{n},\qquad p_n=\frac12\left\{1+\left(\frac23\right)^{n}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`漸化式を分数のまま回すと、$n=1$ から $11$ までこの式と一致した。`,
        },
        {
          label: "[II](iii)",
          task: String.raw`$n$ 回後の座標が $3$ の倍数である確率を $q_n$ とするとき、$q_2$ を求める`,
          answer: String.raw`$q_2=\dfrac{5}{18}$`,
          approach: String.raw`座標を $3$ で割った余りで分けて、$2$ 回ぶんを数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1$ 回の移動量を $3$ で割った余りは、$2$（確率 $\dfrac12$）、$1$（確率 $\dfrac16$）、$0$（確率 $\dfrac13$）である。`,
            },
            {
              k: "p",
              t: String.raw`$2$ 回で余りの和が $3$ の倍数になるのは、$\left(0,0\right)$、$\left(1,2\right)$、$\left(2,1\right)$ のときなので`,
            },
            {
              k: "math",
              t: String.raw`q_2=\frac13\cdot\frac13+\frac16\cdot\frac12+\frac12\cdot\frac16=\frac19+\frac1{12}+\frac1{12}=\frac{5}{18}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`余りの分布を分数のまま追うと $q_2=\dfrac5{18}$ になった。`,
        },
        {
          label: "[II](iv)",
          task: String.raw`$q_{n+2}$ を $q_n$ で表す`,
          answer: String.raw`$q_{n+2}=-\dfrac{1}{12}q_n+\dfrac{13}{36}$`,
          approach: String.raw`$2$ 回ぶんの移動量の余りを先に計算する。$1$ と $2$ の確率が等しくなるのがポイント。`,
          blocks: [
            { k: "p", t: String.raw`$2$ 回ぶんの移動量を $3$ で割った余りの分布を計算すると` },
            {
              k: "steps",
              items: [
                String.raw`余り $0$：$\dfrac13\cdot\dfrac13+\dfrac16\cdot\dfrac12+\dfrac12\cdot\dfrac16=\dfrac5{18}$`,
                String.raw`余り $1$：$\dfrac13\cdot\dfrac16+\dfrac16\cdot\dfrac13+\dfrac12\cdot\dfrac12=\dfrac{13}{36}$`,
                String.raw`余り $2$：$\dfrac13\cdot\dfrac12+\dfrac12\cdot\dfrac13+\dfrac16\cdot\dfrac16=\dfrac{13}{36}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。余り $1$ と $2$ の確率が**どちらも $\dfrac{13}{36}$ で等しい**のがかぎ。だから、$n$ 回後に $3$ の倍数でない（余りが $1$ でも $2$ でも）場合、$2$ 回後に $3$ の倍数になる確率はどちらも $\dfrac{13}{36}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`q_{n+2}=\frac{5}{18}q_n+\frac{13}{36}\left(1-q_n\right)=-\frac{3}{36}q_n+\frac{13}{36}=-\frac{1}{12}q_n+\frac{13}{36}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1$ から $10$ まで、分数のまま計算した $q_n$ がこの関係をみたした。`,
        },
        {
          label: "[II](v)",
          task: String.raw`$q_n$ を求め、$\displaystyle\lim_{n\to\infty}q_n$ を求める`,
          answer: String.raw`$n$ が奇数なら $q_n=\dfrac13$、$n=2m$（偶数）なら $q_n=\dfrac13+\dfrac23\left(-\dfrac{1}{12}\right)^{m}$。極限は $\dfrac13$`,
          approach: String.raw`$q_{n+2}-\dfrac13=-\dfrac1{12}\left(q_n-\dfrac13\right)$。偶奇で初項が違う。`,
          blocks: [
            { k: "p", t: String.raw`$q=-\dfrac1{12}q+\dfrac{13}{36}$ を解くと $q=\dfrac13$ なので` },
            {
              k: "math",
              t: String.raw`q_{n+2}-\frac13=-\frac{1}{12}\left(q_n-\frac13\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$q_1$ は $1$ 回で余りが $0$ になる確率だから $q_1=\dfrac13$ で、$q_1-\dfrac13=0$。よって奇数番目はすべて`,
            },
            { k: "math", t: String.raw`q_n=\frac13\qquad\left(n\ \text{が奇数}\right)` },
            { k: "p", t: String.raw`である。偶数番目は $q_2-\dfrac13=\dfrac5{18}-\dfrac6{18}=-\dfrac1{18}$ なので、$n=2m$ のとき` },
            {
              k: "math",
              t: String.raw`q_{2m}-\frac13=\left(-\frac{1}{12}\right)^{m-1}\left(-\frac{1}{18}\right)=\frac23\left(-\frac{1}{12}\right)^{m}`,
            },
            {
              k: "p",
              t: String.raw`である（$-\dfrac1{18}=\dfrac23\cdot\left(-\dfrac1{12}\right)$）。すなわち`,
            },
            {
              k: "math",
              t: String.raw`q_{2m}=\frac13+\frac23\left(-\frac{1}{12}\right)^{m}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|-\dfrac1{12}\right|<1$ なので $m\to\infty$ で $0$ に行き、奇数番目は $\dfrac13$ そのものだから`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}q_n=\frac13` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`奇数回ではちょうど $\dfrac13$ になる。$1$ 回の移動量の余りが $0,1,2$ で $\dfrac13,\dfrac16,\dfrac12$ と偏っているのに、こうなるのは面白い。偶奇で挙動が違うので、漸化式は $q_{n+1}$ ではなく $q_{n+2}$ で立てるのが自然である。`,
            },
          ],
          pitfalls: [
            String.raw`$q_{n+1}$ を $q_n$ だけで書くことはできない（余り $1$ と $2$ の確率が違うため）。$2$ 回分まとめると対称になる。`,
          ],
          check: String.raw`全探索した $q_1,\ldots,q_6=\dfrac13,\dfrac5{18},\dfrac13,\dfrac{73}{216},\dfrac13,\dfrac{863}{2592}$ が式と一致した。`,
        },
      ],
    },
  ],
};
