import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2022年度（令和4年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問。$a=\tfrac12$ のときの $f\left(x\right)=4t\left(t-\tfrac12\right)^{2}$（$t=\cos x$）。 */
const F22 = (x: number): number => {
  const t = Math.cos(x);
  return 4 * t * (t - 0.5) ** 2;
};

/** 第2問の $f\left(x\right)=x^{-x}$。 */
const G22 = (x: number): number => Math.exp(-x * Math.log(x));

/** 第4問の断面図（$h=\tfrac12$ のときの平面 $\mathrm{OAB}$）。 */
const H22 = 0.5;
const OY22 = Math.sqrt(1 + H22 * H22);
const R22 = Math.sqrt(1 + H22 * H22) / (1 + Math.sqrt(H22 * H22 + 2));
const Q22: [number, number] = [
  1 - 1 / Math.sqrt(H22 * H22 + 2),
  OY22 / Math.sqrt(H22 * H22 + 2),
];

export const uec2022: SolutionSet = {
  slug: "uec",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "情報理工学域",
  university: "電気通信大学",
  short: "電通大",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数・積分",
      topics: ["3倍角と2倍角の公式", "cos x の整式に直す", "共有点の個数", "三角関数の定積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a=-0.8,0,0.3,0.5,0.9$ で $f\\left(\\tfrac{4\\pi}3\\right)=-\\left(2a+1\\right)$ になり、$f$ と $2t\\left(2t-1\\right)\\left(t-a\\right)$ の差も $10^{-15}$ 以下だった",
          "$t$ の解 $0,\\tfrac12,a$ の相異なる個数は $a=0,\\tfrac12$ のときだけ $2$ 個だった",
          "$a=\\tfrac12$ で導関数の符号を追うと極大は $x=4.8798409$（$\\cos x=0.1666705$）、面積は数値 $0.021392904$ で式 $\\tfrac{22-2\\pi-9\\sqrt3}6=0.021392904$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$\left|a\right|<1$、$\pi<x<2\pi$ で $f\left(x\right)=\cos3x-\left(2a+1\right)\cos2x+\left(2a+3\right)\cos x-\left(2a+1\right)$ とする。$f\left(\dfrac{4\pi}{3}\right)$ を $a$ で表す`,
          answer: String.raw`$f\left(\dfrac{4\pi}{3}\right)=-\left(2a+1\right)$`,
          approach: String.raw`$\cos4\pi=1$、$\cos\dfrac{8\pi}{3}=\cos\dfrac{2\pi}{3}=-\dfrac12$、$\cos\dfrac{4\pi}{3}=-\dfrac12$ を代入する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f\left(\frac{4\pi}{3}\right)=1-\left(2a+1\right)\left(-\frac12\right)+\left(2a+3\right)\left(-\frac12\right)-\left(2a+1\right)`,
            },
            { k: "p", t: String.raw`である。真ん中の2項をまとめると` },
            {
              k: "math",
              t: String.raw`\frac{\left(2a+1\right)-\left(2a+3\right)}{2}=\frac{-2}{2}=-1`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f\left(\frac{4\pi}{3}\right)=1-1-\left(2a+1\right)=-\left(2a+1\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$a=-0.8,0,0.3,0.5,0.9$ で直接計算すると $-\left(2a+1\right)$ と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$t=\cos x$ とおくとき、$f\left(x\right)$ を $t$ の整式で表す`,
          answer: String.raw`$f=2t\left(2t-1\right)\left(t-a\right)$`,
          approach: String.raw`$\cos3x=4t^{3}-3t$、$\cos2x=2t^{2}-1$ を入れる。定数項がきれいに消える。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f=4t^{3}-3t-\left(2a+1\right)\left(2t^{2}-1\right)+\left(2a+3\right)t-\left(2a+1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$-\left(2a+1\right)\left(2t^{2}-1\right)=-2\left(2a+1\right)t^{2}+\left(2a+1\right)$ なので、定数項は $\left(2a+1\right)-\left(2a+1\right)=0$ で消える。$t$ の項は $-3t+\left(2a+3\right)t=2at$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`f=4t^{3}-2\left(2a+1\right)t^{2}+2at=2t\left\{2t^{2}-\left(2a+1\right)t+a\right\}`,
            },
            { k: "p", t: String.raw`で、中かっこは $\left(2t-1\right)\left(t-a\right)$ と因数分解できる。したがって` },
            { k: "math", t: String.raw`f=2t\left(2t-1\right)\left(t-a\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(i) の値もここから出る。$x=\dfrac{4\pi}{3}$ では $t=-\dfrac12$ なので $2\left(-\dfrac12\right)\left(-2\right)\left(-\dfrac12-a\right)=-\left(2a+1\right)$ となる。`,
            },
          ],
          check: String.raw`$\pi\leqq x\leqq2\pi$ の $1001$ 点で、もとの式とこの積の差が $10^{-15}$ 以下だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`曲線 $y=f\left(x\right)$ と $x$ 軸の共有点の個数が $2$ 個となるような $a$ の値をすべて求める`,
          answer: String.raw`$a=0,\ \dfrac12$`,
          approach: String.raw`$\pi<x<2\pi$ では $t=\cos x$ が $\left(-1,1\right)$ と1対1に対応する。$t$ の解 $0,\dfrac12,a$ が何個に重なるかを見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\cos x$ は $\pi<x<2\pi$ で $-1$ から $1$ まで**増加する**ので、$x$ と $t$ は1対1に対応する。したがって共有点の個数は、$-1<t<1$ における`,
            },
            { k: "math", t: String.raw`2t\left(2t-1\right)\left(t-a\right)=0` },
            {
              k: "p",
              t: String.raw`の相異なる解の個数に等しい。解は $t=0,\ \dfrac12,\ a$ で、$\left|a\right|<1$ よりどれも $-1<t<1$ に入る。`,
            },
            {
              k: "p",
              t: String.raw`この3つが相異なれば $3$ 個、どれか2つが一致すれば $2$ 個である。一致するのは $a=0$ または $a=\dfrac12$ のときだけである（$0\ne\dfrac12$ なので3つが同時に一致することはない）。よって`,
            },
            { k: "math", t: String.raw`a=0,\qquad a=\frac12` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=0$ なら $f=2t^{2}\left(2t-1\right)$、$a=\dfrac12$ なら $f=t\left(2t-1\right)^{2}$ で、重解のところでは曲線が $x$ 軸に接する。「共有点の個数」なので接する点も $1$ 個と数える。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos x$ が1対1になるのは、区間が $\pi<x<2\pi$ だから。$0<x<2\pi$ なら1つの $t$ に $x$ が2つ対応する。`,
          ],
          check: String.raw`$a=-0.8,0,0.25,0.5,0.9$ で相異なる $t$ の解を数えると $3,2,3,2,3$ 個だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`$a$ を (iii) で求めた値のうち最大のものとする。$f\left(x\right)$ が $x=\beta$ で極大になるとき $\cos\beta$ の値を求める`,
          answer: String.raw`$\cos\beta=\dfrac16$`,
          approach: String.raw`$a=\dfrac12$ で $f=4t\left(t-\dfrac12\right)^{2}$。$t$ が $x$ の増加関数なので、$t$ の関数として極大を探せばよい。`,
          blocks: [
            { k: "p", t: String.raw`(iii) の最大のほうは $a=\dfrac12$ で、このとき` },
            {
              k: "math",
              t: String.raw`f=2t\left(2t-1\right)\left(t-\frac12\right)=4t\left(t-\frac12\right)^{2}=4t^{3}-4t^{2}+t`,
            },
            {
              k: "p",
              t: String.raw`である。$F\left(t\right)=4t^{3}-4t^{2}+t$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`F'\left(t\right)=12t^{2}-8t+1=\left(6t-1\right)\left(2t-1\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$t=\dfrac16$ で極大、$t=\dfrac12$ で極小である。$\pi<x<2\pi$ では $t=\cos x$ が増加するので、$f$ が $x$ について極大になるのは $F$ が $t$ について極大になるところ、つまり`,
            },
            { k: "math", t: String.raw`\cos\beta=\frac16` },
            { k: "p", t: String.raw`のときである。` },
            {
              k: "note",
              t: String.raw`$t$ が $x$ の**増加**関数なので、極大・極小の種類はそのまま移る。減少関数なら入れかわるので、向きの確認は要る。`,
            },
          ],
          check: String.raw`導関数の符号を追うと、極大は $x=4.8798409$ でそこでの $\cos x$ は $0.1666705$（$\dfrac16=0.1666667$）だった。`,
        },
        {
          label: "(v)",
          task: String.raw`曲線 $y=f\left(x\right)$ と $x$ 軸で囲まれた部分の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{22-2\pi-9\sqrt3}{6}$`,
          approach: String.raw`$f=0$ は $t=0$（$x=\dfrac{3\pi}{2}$）と $t=\dfrac12$（$x=\dfrac{5\pi}{3}$）。囲まれるのはこの間だけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a=\dfrac12$ では $f=4t\left(t-\dfrac12\right)^{2}$ なので、$t<0$ で $f<0$、$t>0$ で $f\geqq0$（$t=\dfrac12$ で $0$）である。$x$ でいうと $f=0$ は`,
            },
            {
              k: "math",
              t: String.raw`t=0\ \Longleftrightarrow\ x=\frac{3\pi}{2},\qquad t=\frac12\ \Longleftrightarrow\ x=\frac{5\pi}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。区間 $\pi<x<2\pi$ は両端を含まないので、曲線と $x$ 軸で囲まれるのは $\dfrac{3\pi}{2}\leqq x\leqq\dfrac{5\pi}{3}$ の部分だけである。ここでは $f\geqq0$ なので`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac{3\pi}{2}}^{\frac{5\pi}{3}}\left(4\cos^{3}x-4\cos^{2}x+\cos x\right)dx`,
            },
            { k: "p", t: String.raw`である。$\cos^{3}x=\left(1-\sin^{2}x\right)\cos x$、$\cos^{2}x=\dfrac{1+\cos2x}{2}$ を使うと原始関数は` },
            {
              k: "math",
              t: String.raw`G\left(x\right)=5\sin x-\frac43\sin^{3}x-2x-\sin2x`,
            },
            { k: "p", t: String.raw`である。$x=\dfrac{5\pi}{3}$ では $\sin x=-\dfrac{\sqrt3}{2}$、$\sin2x=\sin\dfrac{10\pi}{3}=-\dfrac{\sqrt3}{2}$ なので` },
            {
              k: "math",
              t: String.raw`G\left(\frac{5\pi}{3}\right)=-\frac{5\sqrt3}{2}+\frac{\sqrt3}{2}-\frac{10\pi}{3}+\frac{\sqrt3}{2}=-\frac{3\sqrt3}{2}-\frac{10\pi}{3}`,
            },
            { k: "p", t: String.raw`であり、$x=\dfrac{3\pi}{2}$ では $\sin x=-1$、$\sin2x=0$ なので` },
            {
              k: "math",
              t: String.raw`G\left(\frac{3\pi}{2}\right)=-5+\frac43-3\pi=-\frac{11}{3}-3\pi`,
            },
            { k: "p", t: String.raw`である。差をとると` },
            {
              k: "math",
              t: String.raw`S=-\frac{3\sqrt3}{2}-\frac{10\pi}{3}+\frac{11}{3}+3\pi=\frac{11}{3}-\frac{\pi}{3}-\frac{3\sqrt3}{2}=\frac{22-2\pi-9\sqrt3}{6}`,
            },
            { k: "p", t: String.raw`である（$0.0214\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1/2 のときの y = f(x)（π < x < 2π）。x = 3π/2 で x 軸と交わり、x = 5π/3 で x 軸に接する。この2点のあいだの細い部分が (v) の面積。",
                view: [3.0, 6.45, -9.5, 1.6],
                items: [
                  { k: "fillBetween", top: F22, bottom: () => 0, from: (3 * Math.PI) / 2, to: (5 * Math.PI) / 3 },
                  { k: "curve", f: F22, from: Math.PI, to: 2 * Math.PI },
                  { k: "dot", at: [(3 * Math.PI) / 2, 0], label: "x = 3π/2", place: "below-left" },
                  { k: "dot", at: [(5 * Math.PI) / 3, 0], label: "x = 5π/3", place: "below-right" },
                  { k: "dot", at: [2 * Math.PI - Math.acos(1 / 6), F22(Math.acos(1 / 6))] },
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption:
                  "囲まれた部分の拡大図。縦だけを大きく引き伸ばしてある。左端 x = 3π/2 では交わり、右端 x = 5π/3 では接している。",
                view: [4.6, 5.35, -0.016, 0.094],
                items: [
                  { k: "fillBetween", top: F22, bottom: () => 0, from: (3 * Math.PI) / 2, to: (5 * Math.PI) / 3 },
                  { k: "curve", f: F22, from: 4.6, to: 5.35 },
                  { k: "dot", at: [(3 * Math.PI) / 2, 0] },
                  { k: "dot", at: [(5 * Math.PI) / 3, 0] },
                  { k: "dot", at: [2 * Math.PI - Math.acos(1 / 6), F22(Math.acos(1 / 6))], label: "極大", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t<0$（$\pi<x<\dfrac{3\pi}{2}$）でも $f<0$ だが、$x\to\pi$ で $f\to-9$ のままなので、$x$ 軸と囲む図形にはならない。右側も同じ。`,
          ],
          check: String.raw`数値積分すると $0.021392904$ で、$\dfrac{22-2\pi-9\sqrt3}6=0.021392904$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["対数微分法", "値域と極限", "定積分で和をはさむ", "不等式の証明"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\sqrt x\\log x$ を $0<x\\leqq1$ で $20$ 万点走査すると最小は $-0.7357589$ で、$-\\tfrac2e=-0.7357589$ と一致した",
          "$\\tfrac{f'}{f}$ と $\\tfrac{f''}{f}$ は $x=0.3,1,2$ で数値微分と一致し、極大は $f\\left(\\tfrac1e\\right)=1.444667861$（$e^{\\frac1e}=1.444667861$）だった",
          "$\\displaystyle\\int_a^b\\left(1+\\log x\\right)x^{-x}dx=a^{-a}-b^{-b}$ が $\\left(a,b\\right)=\\left(0.5,2\\right),\\left(1,3\\right)$ で成り立ち、不等式も $\\left(n,m\\right)=\\left(1,5\\right),\\left(2,6\\right),\\left(3,9\\right)$ で成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$y=\sqrt x\log x$（$0<x\leqq1$）の値域を求める`,
          answer: String.raw`$-\dfrac2e\leqq y\leqq0$`,
          approach: String.raw`微分すると $y'=\dfrac{\log x+2}{2\sqrt x}$。$x=e^{-2}$ で最小。`,
          blocks: [
            {
              k: "math",
              t: String.raw`y'=\frac{1}{2\sqrt x}\log x+\sqrt x\cdot\frac1x=\frac{\log x+2}{2\sqrt x}`,
            },
            {
              k: "p",
              t: String.raw`である。$y'=0$ は $x=e^{-2}$ で、$0<x<e^{-2}$ では $y'<0$、$e^{-2}<x\leqq1$ では $y'>0$ である。よって最小は`,
            },
            {
              k: "math",
              t: String.raw`y\left(e^{-2}\right)=e^{-1}\cdot\left(-2\right)=-\frac2e`,
            },
            { k: "p", t: String.raw`である。端のようすは` },
            {
              k: "math",
              t: String.raw`\lim_{x\to+0}\sqrt x\log x=\lim_{s\to+0}2s\log s=0,\qquad y\left(1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である（$s=\sqrt x$ とおいた）。$\left(0,e^{-2}\right]$ で $0$ より小さい値から $-\dfrac2e$ まで、$\left[e^{-2},1\right]$ で $-\dfrac2e$ から $0$ まで連続に動き、$y=0$ は $x=1$ で実際にとる。したがって値域は`,
            },
            { k: "math", t: String.raw`-\frac2e\leqq y\leqq0` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$20$ 万点走査すると最小は $-0.7357589$ で、$-\dfrac2e=-0.7357589$ と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$f\left(x\right)=x^{-x}$（$x>0$）について $\displaystyle\lim_{x\to+0}f\left(x\right)$ と $\displaystyle\lim_{x\to\infty}f\left(x\right)$ を求める`,
          answer: String.raw`$\displaystyle\lim_{x\to+0}f\left(x\right)=1$、$\displaystyle\lim_{x\to\infty}f\left(x\right)=0$`,
          approach: String.raw`$f=e^{-x\log x}$。$x\log x=\sqrt x\cdot\left(\sqrt x\log x\right)$ と見て (i) を使う。`,
          blocks: [
            { k: "p", t: String.raw`$x>0$ では $f\left(x\right)=e^{-x\log x}$ である。` },
            { k: "p", t: String.raw`**$x\to+0$**。$0<x\leqq1$ では (i) より $\left|\sqrt x\log x\right|\leqq\dfrac2e$ なので` },
            {
              k: "math",
              t: String.raw`\left|x\log x\right|=\sqrt x\left|\sqrt x\log x\right|\leqq\frac{2\sqrt x}{e}\to0`,
            },
            {
              k: "p",
              t: String.raw`である。よって $x\log x\to0$、$f\to e^{0}=1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$x\to\infty$**。$x\log x\to\infty$ なので $f=e^{-x\log x}\to0$ である。`,
            },
          ],
          check: String.raw`$x=10^{-9}$ で $f=1.0000000$、$x=50$ で $f=1.1\times10^{-85}$ だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$\dfrac{f'\left(x\right)}{f\left(x\right)}$ と $\dfrac{f''\left(x\right)}{f\left(x\right)}$ を求める`,
          answer: String.raw`$\dfrac{f'}{f}=-1-\log x$、$\dfrac{f''}{f}=\left(1+\log x\right)^{2}-\dfrac1x$`,
          approach: String.raw`対数微分法。$\log f=-x\log x$ を微分する。`,
          blocks: [
            { k: "p", t: String.raw`$f>0$ なので $\log f=-x\log x$ とおける。両辺を微分すると` },
            {
              k: "math",
              t: String.raw`\frac{f'}{f}=-\left(\log x+1\right)=-1-\log x`,
            },
            { k: "p", t: String.raw`である。これを $f'=f\left(-1-\log x\right)$ と書いてもう一度微分すると` },
            {
              k: "math",
              t: String.raw`f''=f'\left(-1-\log x\right)+f\cdot\left(-\frac1x\right)=f\left\{\left(1+\log x\right)^{2}-\frac1x\right\}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{f''}{f}=\left(1+\log x\right)^{2}-\frac1x`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$x=0.3,1,2$ で数値微分と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$f\left(x\right)$ の極値を求める`,
          answer: String.raw`$x=\dfrac1e$ で極大値 $e^{\frac1e}$（極小値はない）`,
          approach: String.raw`$f>0$ なので $f'$ の符号は $-1-\log x$ の符号。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(x\right)>0$ なので、$f'=f\left(-1-\log x\right)$ の符号は $-1-\log x$ の符号と同じである。これは $x<\dfrac1e$ で正、$x>\dfrac1e$ で負なので、$x=\dfrac1e$ で極大である。`,
            },
            {
              k: "math",
              t: String.raw`f\left(\frac1e\right)=\left(\frac1e\right)^{-\frac1e}=e^{\frac1e}`,
            },
            { k: "p", t: String.raw`が極大値である（$1.4446\ldots$）。極小値はない。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = x^(−x) のグラフ（x > 0）。x → +0 で 1 に近づき、x = 1/e で極大 e^(1/e)、x = 1 で 1 を通り、そのあと 0 に近づく。点線は y = 1。",
                view: [-0.25, 3.25, -0.2, 1.7],
                items: [
                  { k: "seg", a: [-0.25, 1], b: [3.25, 1], dash: true, faint: true },
                  { k: "curve", f: G22, from: 0.004, to: 3.25 },
                  { k: "dot", at: [1 / Math.E, Math.E ** (1 / Math.E)], label: "極大", place: "above-right" },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "below-right" },
                  { k: "text", at: [3.0, 1], label: "y = 1", place: "above" },
                ],
              },
            },
          ],
          check: String.raw`$f\left(\dfrac1e\right)=1.444667861$ で、$e^{\frac1e}=1.444667861$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$0<a<b$ に対して $\displaystyle\int_{a}^{b}\left(1+\log x\right)x^{-x}dx$ を求め、自然数 $n<m$ に対して $\displaystyle\sum_{k=n+1}^{m}k^{-k}<\frac{n^{-n}-m^{-m}}{1+\log n}$ を示す`,
          answer: String.raw`$\displaystyle\int_{a}^{b}\left(1+\log x\right)x^{-x}dx=a^{-a}-b^{-b}$。不等式は区間 $\left[k-1,k\right]$ ごとに評価して足す`,
          approach: String.raw`(iii) より $\left(1+\log x\right)x^{-x}=-f'\left(x\right)$。各区間で $1+\log x\geqq1+\log n$、$x^{-x}>k^{-k}$ を使う。`,
          blocks: [
            { k: "p", t: String.raw`(iii) より $f'\left(x\right)=-\left(1+\log x\right)x^{-x}$ なので` },
            {
              k: "math",
              t: String.raw`\int_{a}^{b}\left(1+\log x\right)x^{-x}dx=-\left[f\left(x\right)\right]_{a}^{b}=a^{-a}-b^{-b}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**不等式の証明**。$k$ を $n+1\leqq k\leqq m$ の整数とし、区間 $\left[k-1,k\right]$ を考える。` },
            {
              k: "steps",
              items: [
                String.raw`この区間では $x\geqq k-1\geqq n\geqq1$ なので $1+\log x\geqq1+\log n>0$`,
                String.raw`(iv) より $f\left(x\right)=x^{-x}$ は $x>\dfrac1e$ で減少し、$k-1\geqq1>\dfrac1e$ だから、$k-1\leqq x<k$ で $x^{-x}>k^{-k}$`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\int_{k-1}^{k}\left(1+\log x\right)x^{-x}dx>\left(1+\log n\right)\int_{k-1}^{k}k^{-k}dx=\left(1+\log n\right)k^{-k}`,
            },
            {
              k: "p",
              t: String.raw`である（被積分関数は連続で、区間の内部で真に大きいので不等号は真になる）。左辺は $\left(k-1\right)^{-\left(k-1\right)}-k^{-k}$ だから、$k=n+1$ から $m$ まで足すと左辺は途中が消えて`,
            },
            {
              k: "math",
              t: String.raw`n^{-n}-m^{-m}>\left(1+\log n\right)\sum_{k=n+1}^{m}k^{-k}`,
            },
            { k: "p", t: String.raw`となる。$1+\log n>0$ で割れば` },
            {
              k: "math",
              t: String.raw`\sum_{k=n+1}^{m}k^{-k}<\frac{n^{-n}-m^{-m}}{1+\log n}`,
            },
            { k: "p", t: String.raw`である。（証明終わり）` },
            {
              k: "note",
              t: String.raw`$\left(1+\log x\right)x^{-x}$ をそのまま積分できるのが (iii) のごほうび。$\displaystyle\int_{k-1}^{k}$ の形にして足すと、望遠鏡のように中が消えて $n^{-n}-m^{-m}$ だけが残る。`,
            },
          ],
          pitfalls: [
            String.raw`$1+\log x\geqq1+\log n$ を使うために、区間の左端が $n$ 以上であることを確かめる。$k\geqq n+1$ なので $k-1\geqq n$ でちょうどよい。`,
          ],
          check: String.raw`$\left(n,m\right)=\left(1,5\right),\left(2,6\right),\left(3,9\right)$ で左辺・右辺を計算すると、すべて不等式が成り立った。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列・極限",
      topics: ["分数形の漸化式", "数学的帰納法", "階差数列", "積の極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式を分数のまま回すと $a_n=9+\\tfrac6{3^{n}-1}$ が $n=1$ から $11$ まで一致した",
          "$b_n=\\tfrac{3^{n}-1}2$ と $b_{n+1}-b_n=3^{n}$ も同じ範囲で一致した",
          "$\\tfrac{a_1a_2\\cdots a_n}{9^{n}}$ は $\\tfrac{3^{n+1}-1}{2\\cdot3^{n}}$ と一致し、$n=10$ で $1.499991532$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$a_1=12$、$a_{n+1}=\dfrac{\left(3^{n+1}+1\right)a_n-3^{n+3}}{3^{n-1}a_n-\left(3^{n+1}-1\right)}$ のとき、$a_n-9>0$ を数学的帰納法で証明する`,
          answer: String.raw`$a_{n+1}-9=\dfrac{a_n-9}{3^{n-1}\left(a_n-9\right)+1}$ となるので、$a_n>9$ なら $a_{n+1}>9$`,
          approach: String.raw`$a_{n+1}-9$ を計算すると、分子が $a_n-9$ だけになる。`,
          blocks: [
            { k: "p", t: String.raw`**$n=1$ のとき** $a_1-9=3>0$ で成り立つ。` },
            { k: "p", t: String.raw`**$n=k$ で成り立つとする**（$a_k>9$）。` },
            {
              k: "math",
              t: String.raw`a_{k+1}-9=\frac{\left(3^{k+1}+1\right)a_k-3^{k+3}-9\left\{3^{k-1}a_k-\left(3^{k+1}-1\right)\right\}}{3^{k-1}a_k-\left(3^{k+1}-1\right)}`,
            },
            {
              k: "p",
              t: String.raw`である。$9\cdot3^{k-1}=3^{k+1}$、$9\cdot3^{k+1}=3^{k+3}$ なので、分子は`,
            },
            {
              k: "math",
              t: String.raw`\left(3^{k+1}+1-3^{k+1}\right)a_k-3^{k+3}+3^{k+3}-9=a_k-9`,
            },
            { k: "p", t: String.raw`となる。また分母は` },
            {
              k: "math",
              t: String.raw`3^{k-1}a_k-3^{k+1}+1=3^{k-1}\left(a_k-9\right)+1`,
            },
            {
              k: "p",
              t: String.raw`で、$a_k-9>0$ より $1$ より大きい。したがって`,
            },
            {
              k: "math",
              t: String.raw`a_{k+1}-9=\frac{a_k-9}{3^{k-1}\left(a_k-9\right)+1}>0`,
            },
            {
              k: "p",
              t: String.raw`である（分子も分母も正）。よって $n=k+1$ でも成り立つ。帰納法によりすべての自然数 $n$ で $a_n-9>0$ である。（証明終わり）`,
            },
          ],
          check: String.raw`漸化式を分数のまま回すと、$n=1$ から $11$ まで $a_n>9$ だった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$b_n=\dfrac{3}{a_n-9}$ とするとき $b_{n+1}-b_n$ を求める`,
          answer: String.raw`$b_{n+1}-b_n=3^{n}$`,
          approach: String.raw`(i) で出した $a_{n+1}-9$ の式の逆数をとる。`,
          blocks: [
            { k: "p", t: String.raw`(i) より` },
            {
              k: "math",
              t: String.raw`b_{n+1}=\frac{3}{a_{n+1}-9}=\frac{3\left\{3^{n-1}\left(a_n-9\right)+1\right\}}{a_n-9}=3^{n}+\frac{3}{a_n-9}`,
            },
            { k: "p", t: String.raw`である（$3\cdot3^{n-1}=3^{n}$）。よって` },
            { k: "math", t: String.raw`b_{n+1}-b_n=3^{n}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1$ から $10$ まで $b_{n+1}-b_n=3^{n}$ が分数のまま成り立った。`,
        },
        {
          label: "(iii)",
          task: String.raw`$\left\{b_n\right\}$ の一般項を求める`,
          answer: String.raw`$b_n=\dfrac{3^{n}-1}{2}$`,
          approach: String.raw`(ii) は階差。初項は $b_1=\dfrac{3}{12-9}=1$。`,
          blocks: [
            { k: "p", t: String.raw`$b_1=\dfrac{3}{a_1-9}=\dfrac33=1$ である。(ii) より $n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`b_n=b_1+\sum_{k=1}^{n-1}3^{k}=1+\frac{3\left(3^{n-1}-1\right)}{2}=\frac{2+3^{n}-3}{2}=\frac{3^{n}-1}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=1$ でも $\dfrac{3-1}{2}=1$ となり成り立つ。`,
            },
          ],
          check: String.raw`$n=1$ から $11$ まで $b_n=\dfrac{3^{n}-1}2$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$\left\{a_n\right\}$ の一般項を求める`,
          answer: String.raw`$a_n=9+\dfrac{6}{3^{n}-1}$`,
          approach: String.raw`$b_n=\dfrac{3}{a_n-9}$ を $a_n$ について解く。`,
          blocks: [
            {
              k: "math",
              t: String.raw`a_n=9+\frac{3}{b_n}=9+\frac{6}{3^{n}-1}`,
            },
            { k: "p", t: String.raw`である。$n=1$ では $9+\dfrac62=12$ で初項と合う。` },
          ],
          check: String.raw`$a_1,\ldots,a_4=12,\dfrac{39}4,\dfrac{120}{13},\dfrac{363}{40}$ が漸化式の値と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$\alpha=\displaystyle\lim_{n\to\infty}a_n$ と $\beta=\displaystyle\lim_{n\to\infty}\frac{a_1a_2a_3\cdots a_n}{\alpha^{n}}$ を求める`,
          answer: String.raw`$\alpha=9$、$\beta=\dfrac32$`,
          approach: String.raw`$\dfrac{a_k}{9}=\dfrac{3^{k+1}-1}{3\left(3^{k}-1\right)}$ と書くと、積が途中で消える形になる。`,
          blocks: [
            { k: "p", t: String.raw`$3^{n}-1\to\infty$ なので` },
            {
              k: "math",
              t: String.raw`\alpha=\lim_{n\to\infty}\left(9+\frac{6}{3^{n}-1}\right)=9`,
            },
            { k: "p", t: String.raw`である。次に` },
            {
              k: "math",
              t: String.raw`\frac{a_k}{9}=1+\frac{2}{3\left(3^{k}-1\right)}=\frac{3\left(3^{k}-1\right)+2}{3\left(3^{k}-1\right)}=\frac{3^{k+1}-1}{3\left(3^{k}-1\right)}`,
            },
            { k: "p", t: String.raw`と書ける。$k=1$ から $n$ まで掛けると、分子と分母で同じ因子が次々に消えて` },
            {
              k: "math",
              t: String.raw`\frac{a_1a_2\cdots a_n}{9^{n}}=\frac{1}{3^{n}}\cdot\frac{3^{n+1}-1}{3^{1}-1}=\frac{3^{n+1}-1}{2\cdot3^{n}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\beta=\lim_{n\to\infty}\frac{3^{n+1}-1}{2\cdot3^{n}}=\frac32`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{a_k}{9}$ を $\dfrac{c_{k+1}}{3c_k}$（$c_k=3^{k}-1$）の形に書けたのがかぎ。積の形の極限は、こうして「次の項との比」に直すと望遠鏡のように消える。`,
            },
          ],
          check: String.raw`$\dfrac{a_1\cdots a_n}{9^{n}}$ は $n=1,2,5,10$ で $\dfrac43,\dfrac{13}9,1.497942387,1.499991532$ となり、$\dfrac32$ に近づいた。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間図形",
      topics: ["辺に接する球", "断面に現れる内接円", "接線の長さ", "球を平面で切った部分の体積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$h=0.5,1,\\sqrt2,3$ で、座標から求めた $r$ と $\\tfrac{\\sqrt{h^{2}+2}-1}{\\sqrt{h^{2}+1}}$、$R$ と $\\tfrac{\\sqrt2\\left(\\sqrt{h^{2}+2}-1\\right)}h$ が一致した",
          "$R\\left(h\\right)$ を $50$ 万点走査すると最小は $1.0000000$ で $h=1.41421$（$\\sqrt2=1.4142136$）だった",
          "$h=\\tfrac12$ で $R=\\sqrt2$、$\\mathrm{K}=\\left(0,0,-1\\right)$、$\\mathrm{KM}=1.3416408=\\tfrac{3\\sqrt5}5$。体積は断面積の積分で $0.09199817$ となり、式の値と $10^{-12}$ まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`底面 $\mathrm{ABCD}$ が1辺 $2$ の正方形、$\mathrm{OA}=\mathrm{OB}=\mathrm{OC}=\mathrm{OD}$、$\mathrm{OH}=h$ の正四角錐 $\mathrm{O\text-ABCD}$ について、$\mathrm{OA}$ を $h$ で表す。また8本の辺すべてに接する球 $S$ を平面 $\mathrm{OAB}$ で切った断面の円の半径 $r\left(h\right)$ を $h$ で表す`,
          answer: String.raw`$\mathrm{OA}=\sqrt{h^{2}+2}$、$r\left(h\right)=\dfrac{\sqrt{h^{2}+2}-1}{\sqrt{h^{2}+1}}$`,
          approach: String.raw`断面の円は、3辺 $\mathrm{OA},\mathrm{OB},\mathrm{AB}$ に接するので三角形 $\mathrm{OAB}$ の内接円。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ は正方形の中心なので $\mathrm{AH}=\sqrt2$ である。$\mathrm{OH}\perp\mathrm{AH}$ より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{OA}=\sqrt{h^{2}+\left(\sqrt2\right)^{2}}=\sqrt{h^{2}+2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`球 $S$ は3辺 $\mathrm{OA},\mathrm{OB},\mathrm{AB}$ に接していて、これらは平面 $\mathrm{OAB}$ 内にある。球を平面で切った円は、その平面内の接線にはそのまま接するので、**断面の円は三角形 $\mathrm{OAB}$ の内接円**である。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{AB}$ の中点を $\mathrm{M}'$ とすると $\mathrm{OM}'\perp\mathrm{AB}$ で、$\mathrm{M}'\mathrm{H}=1$ だから $\mathrm{OM}'=\sqrt{h^{2}+1}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\left(\triangle\mathrm{OAB}\right)=\frac12\cdot2\cdot\sqrt{h^{2}+1}=\sqrt{h^{2}+1}`,
            },
            { k: "p", t: String.raw`であり、周の半分は` },
            {
              k: "math",
              t: String.raw`s=\frac{2\sqrt{h^{2}+2}+2}{2}=\sqrt{h^{2}+2}+1`,
            },
            { k: "p", t: String.raw`である。内接円の半径は（面積）÷ $s$ なので` },
            {
              k: "math",
              t: String.raw`r\left(h\right)=\frac{\sqrt{h^{2}+1}}{\sqrt{h^{2}+2}+1}=\frac{\sqrt{h^{2}+2}-1}{\sqrt{h^{2}+1}}`,
            },
            {
              k: "p",
              t: String.raw`である（分母を有理化した。$\left(h^{2}+2\right)-1=h^{2}+1$ を使う）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "平面 OAB で切った断面（図は h = 1/2 のとき）。円は三角形 OAB の内接円で、P は AB との接点（AB の中点）、Q は OA との接点。",
                view: [-1.6, 1.6, -0.45, 1.45],
                items: [
                  { k: "seg", a: [1, 0], b: [-1, 0] },
                  { k: "seg", a: [1, 0], b: [0, OY22] },
                  { k: "seg", a: [-1, 0], b: [0, OY22] },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [R22 * Math.cos(t), R22 + R22 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "dot", at: [0, OY22], label: "O", place: "above" },
                  { k: "dot", at: [1, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [-1, 0], label: "B", place: "below-left" },
                  { k: "dot", at: [0, 0], label: "P", place: "below" },
                  { k: "dot", at: Q22, label: "Q", place: "right" },
                ],
              },
            },
          ],
          check: String.raw`$h=0.5,1,\sqrt2,3$ で、座標から求めた内接円の半径とこの式が一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`線分 $\mathrm{AP}$ および線分 $\mathrm{AQ}$ の長さを求める`,
          answer: String.raw`$\mathrm{AP}=\mathrm{AQ}=1$`,
          approach: String.raw`内接円の接線の長さ。頂点 $\mathrm{A}$ からの接線の長さは $s-\mathrm{OB}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P},\mathrm{Q}$ は (i) の内接円と辺 $\mathrm{AB},\mathrm{OA}$ の接点なので、$\mathrm{AP}=\mathrm{AQ}$（同じ点からの接線の長さ）である。内接円の接線の長さの公式より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}=\mathrm{AQ}=s-\mathrm{OB}=\left(\sqrt{h^{2}+2}+1\right)-\sqrt{h^{2}+2}=1`,
            },
            { k: "p", t: String.raw`である。$h$ によらない。` },
            {
              k: "note",
              t: String.raw`$\mathrm{AP}=1=\dfrac{\mathrm{AB}}{2}$ なので、$\mathrm{P}$ は $\mathrm{AB}$ の中点である。対称性からも分かる。`,
            },
          ],
          check: String.raw`$h=\dfrac12$ の座標で $\mathrm{P}$ が $\mathrm{AB}$ の中点、$\mathrm{AQ}=1$ になった。`,
        },
        {
          label: "(iii)",
          task: String.raw`球 $S$ の半径 $R\left(h\right)$ を $h$ で表し、$R\left(h\right)$ が最小となる $h$ の値 $h_0$ を求める`,
          answer: String.raw`$R\left(h\right)=\dfrac{\sqrt2\left(\sqrt{h^{2}+2}-1\right)}{h}$、$h_0=\sqrt2$（最小値 $1$）`,
          approach: String.raw`対称性から中心 $\mathrm{K}$ は直線 $\mathrm{OH}$ 上。$\mathrm{KP}\perp\mathrm{AB}$ と $\mathrm{KQ}\perp\mathrm{OA}$ から位置を決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ を原点、底面を $z=0$ として $\mathrm{A}\left(1,1,0\right)$、$\mathrm{B}\left(-1,1,0\right)$、$\mathrm{O}\left(0,0,h\right)$ とおく。対称性から $\mathrm{K}\left(0,0,k\right)$ である。$L=\sqrt{h^{2}+2}$ と書く。`,
            },
            {
              k: "p",
              t: String.raw`(ii) より $\mathrm{AQ}=1$ なので $\mathrm{Q}=\mathrm{A}+\dfrac1L\left(\mathrm{O}-\mathrm{A}\right)$ である。$\overrightarrow{\mathrm{KQ}}\perp\overrightarrow{\mathrm{AO}}$ から`,
            },
            {
              k: "math",
              t: String.raw`-2\left(1-\frac1L\right)+h\left(\frac hL-k\right)=0,\qquad hk=\frac{h^{2}+2}{L}-2=L-2`,
            },
            { k: "p", t: String.raw`となり $k=\dfrac{L-2}{h}$ である。$\mathrm{P}$ は $\mathrm{AB}$ の中点 $\left(0,1,0\right)$ なので` },
            {
              k: "math",
              t: String.raw`R=\mathrm{KP}=\sqrt{1+k^{2}}=\sqrt{1+\frac{\left(L-2\right)^{2}}{L^{2}-2}}`,
            },
            { k: "p", t: String.raw`である（$h^{2}=L^{2}-2$）。中身を通分すると` },
            {
              k: "math",
              t: String.raw`1+\frac{L^{2}-4L+4}{L^{2}-2}=\frac{2L^{2}-4L+2}{L^{2}-2}=\frac{2\left(L-1\right)^{2}}{L^{2}-2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`R\left(h\right)=\frac{\sqrt2\left(L-1\right)}{h}=\frac{\sqrt2\left(\sqrt{h^{2}+2}-1\right)}{h}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最小**。$L=\sqrt{h^{2}+2}$（$L>\sqrt2$）を変数にとると $h^{2}=L^{2}-2$ で`,
            },
            {
              k: "math",
              t: String.raw`R^{2}=\frac{2\left(L-1\right)^{2}}{L^{2}-2},\qquad\frac{d}{dL}\left\{\frac{\left(L-1\right)^{2}}{L^{2}-2}\right\}=\frac{2\left(L-1\right)\left(L-2\right)}{\left(L^{2}-2\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$L>\sqrt2>1$ なので符号は $L-2$ で決まり、$L=2$ で最小になる。$L=2$ は $h^{2}=2$、つまり`,
            },
            { k: "math", t: String.raw`h_0=\sqrt2` },
            {
              k: "p",
              t: String.raw`である。このとき $R=\dfrac{\sqrt2\left(2-1\right)}{\sqrt2}=1$、$k=\dfrac{2-2}{\sqrt2}=0$ なので、球の中心は底面の中心 $\mathrm{H}$ に一致する。`,
            },
          ],
          check: String.raw`$R\left(h\right)$ を $50$ 万点走査すると最小は $1.0000000$ で $h=1.41421$（$\sqrt2=1.4142136$）だった。`,
        },
        {
          label: "(iv)(ア)",
          task: String.raw`$R\left(h\right)=\sqrt2$ となる $h$ を求め、$\mathrm{K}$ から面 $\mathrm{OAB}$ に下ろした垂線 $\mathrm{KM}$ の長さを求める`,
          answer: String.raw`$h=\dfrac12$、$\mathrm{KM}=\dfrac{3\sqrt5}{5}$`,
          approach: String.raw`$R=\sqrt2$ の式を解く。$\mathrm{KM}$ は $R^{2}=r^{2}+\mathrm{KM}^{2}$ から。`,
          blocks: [
            { k: "p", t: String.raw`$R\left(h\right)=\sqrt2$ は` },
            {
              k: "math",
              t: String.raw`\sqrt{h^{2}+2}-1=h,\qquad h^{2}+2=h^{2}+2h+1,\qquad h=\frac12`,
            },
            {
              k: "p",
              t: String.raw`である（$\sqrt{h^{2}+2}=h+1>0$ も満たす）。$R$ は $h=\sqrt2$ で最小値 $1$ をとり、$h\to\infty$ で $\sqrt2$ に下から近づくので、$R=\sqrt2$ となるのはこの1つだけである。`,
            },
            {
              k: "p",
              t: String.raw`$h=\dfrac12$ のとき (i) より`,
            },
            {
              k: "math",
              t: String.raw`r=\frac{\sqrt{\frac14+2}-1}{\sqrt{\frac14+1}}=\frac{\frac32-1}{\frac{\sqrt5}{2}}=\frac{1}{\sqrt5}`,
            },
            {
              k: "p",
              t: String.raw`である。球を平面 $\mathrm{OAB}$ で切った円の半径が $r$、中心からその平面までの距離が $\mathrm{KM}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{KM}^{2}=R^{2}-r^{2}=2-\frac15=\frac95,\qquad\mathrm{KM}=\frac{3}{\sqrt5}=\frac{3\sqrt5}{5}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{KM}=\dfrac{3}{\sqrt5}=1.3416\ldots<R=\sqrt2=1.4142\ldots$ なので、球は4つの側面からわずかにはみ出している。(イ) はそのはみ出した部分の体積を聞いている。`,
            },
          ],
          check: String.raw`座標で $\mathrm{K}=\left(0,0,-1\right)$、面 $\mathrm{OAB}$ は $y+2z=1$ となり、距離は $1.3416408=\dfrac{3\sqrt5}5$ だった。`,
        },
        {
          label: "(iv)(イ)",
          task: String.raw`球 $S$ を平面 $\mathrm{ABCD}$ で2つに分け、$\mathrm{K}$ を含まない方を $S'$ とする。$S'$ のうち正四角錐 $\mathrm{O\text-ABCD}$ に含まれない部分の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{4\left(100\sqrt2-63\sqrt5\right)}{75}\pi$`,
          approach: String.raw`はみ出しているのは4つの側面のぶんだけ。1つぶんは球を平面で切った小さいほう（球冠）そのもの。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h=\dfrac12$ では $k=\dfrac{L-2}{h}=\dfrac{\frac32-2}{\frac12}=-1$ なので $\mathrm{K}\left(0,0,-1\right)$、$R=\sqrt2$ である。$\mathrm{K}$ は底面 $z=0$ より下なので、$S'$ は球の $z\geqq0$ の部分である。`,
            },
            {
              k: "p",
              t: String.raw`正四角錐は「$z\geqq0$」と「4つの側面の内側」の5つの不等式で表される。$S'$ はすでに $z\geqq0$ をみたすので、四角錐に**含まれない**のは、どれかの側面の外側にある部分である。`,
            },
            {
              k: "p",
              t: String.raw`面 $\mathrm{OAB}$ の外側にある部分は、球を平面 $\mathrm{OAB}$ で切ったときの小さいほう（球冠）である。$\mathrm{KM}=\dfrac{3}{\sqrt5}$ なので、その高さは`,
            },
            {
              k: "math",
              t: String.raw`t=R-\mathrm{KM}=\sqrt2-\frac{3}{\sqrt5}`,
            },
            {
              k: "p",
              t: String.raw`である。この球冠が $z\geqq0$ に入っていることも確かめられる。実際、切り口の円の最も低い点は辺 $\mathrm{AB}$ との接点 $\mathrm{P}\left(0,1,0\right)$ で、ちょうど $z=0$ に接する。また隣り合う2つの球冠は、辺 $\mathrm{OA}$ との接点 $\mathrm{Q}$ で接するだけで重ならない。`,
            },
            { k: "p", t: String.raw`球冠の体積は $\dfrac{\pi}{3}t^{2}\left(3R-t\right)$ である。` },
            {
              k: "math",
              t: String.raw`t^{2}=2-\frac{6\sqrt2}{\sqrt5}+\frac95=\frac{19-6\sqrt{10}}{5},\qquad3R-t=2\sqrt2+\frac{3}{\sqrt5}=\frac{10\sqrt2+3\sqrt5}{5}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{\pi}{3}t^{2}\left(3R-t\right)=\frac{\pi}{75}\left(19-6\sqrt{10}\right)\left(10\sqrt2+3\sqrt5\right)`,
            },
            { k: "p", t: String.raw`である。展開すると $\sqrt{10}\cdot\sqrt2=2\sqrt5$、$\sqrt{10}\cdot\sqrt5=5\sqrt2$ より` },
            {
              k: "math",
              t: String.raw`\left(19-6\sqrt{10}\right)\left(10\sqrt2+3\sqrt5\right)=190\sqrt2+57\sqrt5-120\sqrt5-90\sqrt2=100\sqrt2-63\sqrt5`,
            },
            { k: "p", t: String.raw`である。側面は4つあるので` },
            {
              k: "math",
              t: String.raw`V=4\cdot\frac{\pi}{75}\left(100\sqrt2-63\sqrt5\right)=\frac{4\left(100\sqrt2-63\sqrt5\right)}{75}\pi`,
            },
            { k: "p", t: String.raw`である（$0.0920\ldots$）。` },
            {
              k: "note",
              t: String.raw`$100\sqrt2=141.42\ldots$、$63\sqrt5=140.87\ldots$ とほとんど等しいので、$V$ は小さな値になる。球が側面からほんのわずかだけ顔を出している、という図のとおり。`,
            },
          ],
          pitfalls: [
            String.raw`4つの球冠が重ならないこと、底面より下にはみ出さないことを確かめてから $4$ 倍する。接点でちょうど接するので重なりは体積 $0$。`,
          ],
          check: String.raw`断面積を $z$ について数値積分すると $0.09199817$ で、式の値 $0.09199817$ と $10^{-12}$ まで一致した。`,
        },
      ],
    },
  ],
};
