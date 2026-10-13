import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2023年度（令和5年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\sin x\sin2x-\left|\cos x\right|\cos^{2}x$。 */
const F23 = (x: number): number =>
  Math.sin(x) * Math.sin(2 * x) - Math.abs(Math.cos(x)) * Math.cos(x) ** 2;

/** 第2問の $f\left(x\right)=\dfrac{\log x}{\left(x+e\right)^{2}}$。 */
const G23 = (x: number): number => Math.log(x) / (x + Math.E) ** 2;

/** 第3問の曲線 $C$。 */
const C23 = (t: number): [number, number] => [t * Math.sqrt(t), Math.sqrt(t * (2 * t - 1))];

export const uec2023: SolutionSet = {
  slug: "uec",
  year: 2023,
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
      topics: ["2倍角の公式", "絶対値による場合分け", "3次関数の最大最小", "絶対値のついた定積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$0\\leqq x\\leqq\\pi$ を $1001$ 点に分けて、$f$ と $2\\cos x-2\\cos^{3}x-\\left|\\cos x\\right|\\cos^{2}x$ の差が $10^{-15}$ 以下だった",
          "$200$ 万点の全探索で零点は $2$ 個、最大 $0.6285394$（$\\tfrac{4\\sqrt2}9=0.6285394$）、最小 $-1.0886621$（$-\\tfrac{4\\sqrt6}9=-1.0886621$）",
          "$\\displaystyle\\int_0^{\\pi}\\left|f\\right|dx$ の数値は $2.103133692$ で、$\\tfrac{12+4\\sqrt3}9=2.103133692$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$\sin x\sin2x$ を $\cos x$ の式で表す`,
          answer: String.raw`$\sin x\sin2x=2\cos x-2\cos^{3}x$`,
          approach: String.raw`$\sin2x=2\sin x\cos x$ を使うと $\sin^{2}x$ が出るので、$1-\cos^{2}x$ に直す。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\sin x\sin2x=\sin x\cdot2\sin x\cos x=2\sin^{2}x\cos x`,
            },
            { k: "p", t: String.raw`である。$\sin^{2}x=1-\cos^{2}x$ を入れると` },
            {
              k: "math",
              t: String.raw`\sin x\sin2x=2\left(1-\cos^{2}x\right)\cos x=2\cos x-2\cos^{3}x`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`これで $f\left(x\right)=2\cos x-2\cos^{3}x-\left|\cos x\right|\cos^{2}x$ となり、$c=\cos x$ だけの式になる。$0\leqq x\leqq\pi$ では $x\mapsto\cos x$ が $\left[-1,1\right]$ への1対1の対応なので、以下は $c$ の問題として考えればよい。`,
            },
          ],
          check: String.raw`$0\leqq x\leqq\pi$ を $1001$ 点に分けて、両辺の差が $10^{-15}$ 以下であることを確かめた。`,
        },
        {
          label: "(ii)",
          task: String.raw`$0\leqq x\leqq\pi$ で $f\left(x\right)=0$ をみたす $x$ の個数 $N$ を求める`,
          answer: String.raw`$N=2$`,
          approach: String.raw`$c=\cos x$ とおき、$c\geqq0$ と $c<0$ で $\left|c\right|$ を外して解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$c=\cos x$ とおく。$0\leqq x\leqq\pi$ のとき $c$ は $1$ から $-1$ まで1対1に動く。(i) より`,
            },
            {
              k: "math",
              t: String.raw`f=2c-2c^{3}-\left|c\right|c^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$c\geqq0$ のとき**（$0\leqq x\leqq\dfrac{\pi}{2}$）` },
            {
              k: "math",
              t: String.raw`f=2c-3c^{3}=c\left(2-3c^{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`なので $c=0$ または $c^{2}=\dfrac23$、つまり $c=0,\ \dfrac{\sqrt6}{3}$ である。どちらも $\left[0,1\right]$ に入る。`,
            },
            { k: "p", t: String.raw`**$c<0$ のとき**（$\dfrac{\pi}{2}<x\leqq\pi$）` },
            {
              k: "math",
              t: String.raw`f=2c-2c^{3}+c^{3}=2c-c^{3}=c\left(2-c^{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$c<0$ なら $c\ne0$、$c^{2}\leqq1<2$ なので $2-c^{2}>0$ である。よって $f<0$ となり解はない。`,
            },
            {
              k: "p",
              t: String.raw`したがって $c=0$（$x=\dfrac{\pi}{2}$）と $c=\dfrac{\sqrt6}{3}$（$x=\arccos\dfrac{\sqrt6}{3}$）の2つで、`,
            },
            { k: "math", t: String.raw`N=2` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\left|\cos x\right|$ があるので $x=\dfrac{\pi}{2}$ の前後で式が変わる。$c=0$ を二重に数えない。`,
          ],
          check: String.raw`$200$ 万点の全探索でも零点は $2$ 個だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$0\leqq x\leqq\pi$ における $f\left(x\right)$ の最大値 $M$ と最小値 $m$ を求める`,
          answer: String.raw`$M=\dfrac{4\sqrt2}{9}$、$m=-\dfrac{4\sqrt6}{9}$`,
          approach: String.raw`$c$ の3次関数として、$\left[0,1\right]$ と $\left[-1,0\right]$ で別々に調べる。`,
          blocks: [
            { k: "p", t: String.raw`**$0\leqq c\leqq1$**：$h\left(c\right)=2c-3c^{3}$ とおくと` },
            {
              k: "math",
              t: String.raw`h'\left(c\right)=2-9c^{2}=0\ \Longleftrightarrow\ c=\frac{\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`で、ここで最大になる。値は` },
            {
              k: "math",
              t: String.raw`h\left(\frac{\sqrt2}{3}\right)=\frac{2\sqrt2}{3}-3\cdot\frac{2\sqrt2}{27}=\frac{6\sqrt2-2\sqrt2}{9}=\frac{4\sqrt2}{9}`,
            },
            { k: "p", t: String.raw`である。端では $h\left(0\right)=0$、$h\left(1\right)=-1$ である。` },
            { k: "p", t: String.raw`**$-1\leqq c<0$**：$k\left(c\right)=2c-c^{3}$ とおくと` },
            {
              k: "math",
              t: String.raw`k'\left(c\right)=2-3c^{2}=0\ \Longleftrightarrow\ c=-\frac{\sqrt6}{3}`,
            },
            {
              k: "p",
              t: String.raw`（負のほう）で、$c<-\dfrac{\sqrt6}{3}$ では $k'<0$、$-\dfrac{\sqrt6}{3}<c<0$ では $k'>0$ なのでここで最小になる。値は`,
            },
            {
              k: "math",
              t: String.raw`k\left(-\frac{\sqrt6}{3}\right)=-\frac{2\sqrt6}{3}+\frac{2\sqrt6}{9}=-\frac{4\sqrt6}{9}`,
            },
            { k: "p", t: String.raw`である。端では $k\left(-1\right)=-1$ である。` },
            {
              k: "p",
              t: String.raw`$\dfrac{4\sqrt6}{9}=1.088\ldots>1$ なので、全体の最小は $-\dfrac{4\sqrt6}{9}$、最大は $\dfrac{4\sqrt2}{9}$ である。すなわち`,
            },
            {
              k: "math",
              t: String.raw`M=\frac{4\sqrt2}{9},\qquad m=-\frac{4\sqrt6}{9}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ（0 ≦ x ≦ π）。x = π/2 の前後で式が変わる。零点は x = arccos(√6/3) ≒ 0.615 と x = π/2 の2つ。塗った部分の面積の合計が (v) の J。",
                view: [-0.4, 3.4, -1.45, 1.05],
                items: [
                  { k: "fillBetween", top: () => 0, bottom: F23, from: 0, to: Math.acos(Math.sqrt(6) / 3) },
                  {
                    k: "fillBetween",
                    top: F23,
                    bottom: () => 0,
                    from: Math.acos(Math.sqrt(6) / 3),
                    to: Math.PI / 2,
                  },
                  { k: "fillBetween", top: () => 0, bottom: F23, from: Math.PI / 2, to: Math.PI },
                  { k: "curve", f: F23, from: 0, to: Math.PI },
                  { k: "dot", at: [Math.acos(Math.sqrt(2) / 3), (4 * Math.SQRT2) / 9], label: "最大", place: "above-right" },
                  {
                    k: "dot",
                    at: [Math.acos(-Math.sqrt(6) / 3), (-4 * Math.sqrt(6)) / 9],
                    label: "最小",
                    place: "below-left",
                  },
                  { k: "dot", at: [Math.acos(Math.sqrt(6) / 3), 0] },
                  { k: "dot", at: [Math.PI / 2, 0] },
                  { k: "text", at: [Math.PI, 0], label: "x = π", place: "below-left" },
                ],
              },
            },
          ],
          check: String.raw`$200$ 万点の全探索で最大 $0.6285394$、最小 $-1.0886621$ となり、式の値と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`不定積分 $I=\displaystyle\int\cos^{3}x\,dx$ を求める`,
          answer: String.raw`$I=\sin x-\dfrac{\sin^{3}x}{3}$（積分定数は省略）`,
          approach: String.raw`$\cos^{3}x=\left(1-\sin^{2}x\right)\cos x$ として $u=\sin x$ と置換する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`I=\int\left(1-\sin^{2}x\right)\cos x\,dx`,
            },
            { k: "p", t: String.raw`で、$u=\sin x$ とおくと $du=\cos x\,dx$ だから` },
            {
              k: "math",
              t: String.raw`I=\int\left(1-u^{2}\right)du=u-\frac{u^{3}}{3}=\sin x-\frac{\sin^{3}x}{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値微分すると $\cos^{3}x$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`定積分 $J=\displaystyle\int_{0}^{\pi}\left|f\left(x\right)\right|dx$ を求める`,
          answer: String.raw`$J=\dfrac{12+4\sqrt3}{9}$`,
          approach: String.raw`(ii) の零点で3つに分け、それぞれの符号で絶対値を外す。原始関数は (iv) から作る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p=\arccos\dfrac{\sqrt6}{3}$ とおく。(ii)(iii) の符号から`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\leqq x<p$：$c>\dfrac{\sqrt6}{3}$ なので $2-3c^{2}<0$、よって $f<0$`,
                String.raw`$p<x<\dfrac{\pi}{2}$：$0<c<\dfrac{\sqrt6}{3}$ なので $f>0$`,
                String.raw`$\dfrac{\pi}{2}<x\leqq\pi$：$c<0$ なので $f<0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。原始関数は (iv) を使って作る。$0\leqq x\leqq\dfrac{\pi}{2}$ では $f=2\cos x-3\cos^{3}x$ なので`,
            },
            {
              k: "math",
              t: String.raw`F_1\left(x\right)=2\sin x-3\left(\sin x-\frac{\sin^{3}x}{3}\right)=\sin^{3}x-\sin x`,
            },
            { k: "p", t: String.raw`であり、$\dfrac{\pi}{2}\leqq x\leqq\pi$ では $f=2\cos x-\cos^{3}x$ なので` },
            {
              k: "math",
              t: String.raw`F_2\left(x\right)=2\sin x-\left(\sin x-\frac{\sin^{3}x}{3}\right)=\sin x+\frac{\sin^{3}x}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。$\cos p=\dfrac{\sqrt6}{3}$ より $\sin p=\dfrac{\sqrt3}{3}$、$\sin^{3}p=\dfrac{\sqrt3}{9}$ なので`,
            },
            {
              k: "math",
              t: String.raw`F_1\left(p\right)=\frac{\sqrt3}{9}-\frac{\sqrt3}{3}=-\frac{2\sqrt3}{9},\qquad F_1\left(0\right)=0,\qquad F_1\left(\frac{\pi}{2}\right)=0`,
            },
            {
              k: "math",
              t: String.raw`F_2\left(\frac{\pi}{2}\right)=1+\frac13=\frac43,\qquad F_2\left(\pi\right)=0`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`J=-\left\{F_1\left(p\right)-F_1\left(0\right)\right\}+\left\{F_1\left(\tfrac{\pi}{2}\right)-F_1\left(p\right)\right\}-\left\{F_2\left(\pi\right)-F_2\left(\tfrac{\pi}{2}\right)\right\}`,
            },
            {
              k: "math",
              t: String.raw`=\frac{2\sqrt3}{9}+\frac{2\sqrt3}{9}+\frac43=\frac{4\sqrt3}{9}+\frac{12}{9}=\frac{12+4\sqrt3}{9}`,
            },
            { k: "p", t: String.raw`である（$2.103\ldots$）。` },
            {
              k: "note",
              t: String.raw`$F_1\left(0\right)=F_1\left(\dfrac{\pi}{2}\right)=0$ なので、前の2つの部分の面積はどちらも $\dfrac{2\sqrt3}{9}$ で等しい。`,
            },
          ],
          pitfalls: [
            String.raw`絶対値を外すときは $x=\dfrac{\pi}{2}$ でも式が変わる。零点だけでなく、場合分けの境い目でも切る。`,
          ],
          check: String.raw`数値積分すると $2.103133692$ で、$\dfrac{12+4\sqrt3}9=2.103133692$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["商の微分", "解がただ1つであることの証明", "部分分数分解", "部分積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\tfrac{g\\left(x\\right)}{x\\left(x+e\\right)^{3}}$ は $x=0.5,1.5,3$ で数値微分と $10^{-10}$ まで一致した",
          "$g$ の極大は $x=e^{-\\frac12}$ で $3.931343148$、$e+2e^{-\\frac12}=3.931343148$。$g\\left(e\\right)=0$ もちょうど成り立った",
          "$f\\left(e\\right)=0.0338338208=\\tfrac1{4e^{2}}$、$I$ は数値 $0.228127378$、$S$ は数値 $0.044187658$ で式と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\dfrac{\log x}{\left(x+e\right)^{2}}$（$x>0$）の導関数を $f'\left(x\right)=\dfrac{g\left(x\right)}{x\left(x+e\right)^{3}}$ と表すとき、$g\left(x\right)$ を求める`,
          answer: String.raw`$g\left(x\right)=x+e-2x\log x$`,
          approach: String.raw`商の微分をして、分母を $x\left(x+e\right)^{3}$ にそろえる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{\frac1x\left(x+e\right)^{2}-\log x\cdot2\left(x+e\right)}{\left(x+e\right)^{4}}=\frac{\frac{x+e}{x}-2\log x}{\left(x+e\right)^{3}}`,
            },
            { k: "p", t: String.raw`である。分子分母に $x$ を掛けると` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{x+e-2x\log x}{x\left(x+e\right)^{3}}`,
            },
            { k: "p", t: String.raw`なので $g\left(x\right)=x+e-2x\log x$ である。` },
          ],
          check: String.raw`$x=0.5,1.5,3$ で、この式と数値微分が $10^{-10}$ まで一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$g\left(x\right)$ の極値を求め、$x>0$ で $g\left(x\right)=0$ がただ1つの実数解をもつことを示す`,
          answer: String.raw`$x=e^{-\frac12}$ で極大値 $e+2e^{-\frac12}$（極小値はない）。$g$ は増加してから減少し、$x\to+0$ で $e>0$、$x\to\infty$ で $-\infty$ なので解はただ1つ`,
          approach: String.raw`$g'=-1-2\log x$。$x\to+0$ では $x\log x\to0$ を使う。`,
          blocks: [
            {
              k: "math",
              t: String.raw`g'\left(x\right)=1-2\left(\log x+1\right)=-1-2\log x`,
            },
            {
              k: "p",
              t: String.raw`である。$g'=0$ は $\log x=-\dfrac12$、すなわち $x=e^{-\frac12}$ で、$x<e^{-\frac12}$ では $g'>0$、$x>e^{-\frac12}$ では $g'<0$ である。よってここで極大になり`,
            },
            {
              k: "math",
              t: String.raw`g\left(e^{-\frac12}\right)=e^{-\frac12}+e-2e^{-\frac12}\left(-\frac12\right)=e+2e^{-\frac12}`,
            },
            { k: "p", t: String.raw`が極大値である（$3.93\ldots$）。極小値はない。` },
            { k: "p", t: String.raw`**解がただ1つであること**。端のようすを見る。` },
            {
              k: "math",
              t: String.raw`\lim_{x\to+0}g\left(x\right)=0+e-2\lim_{x\to+0}x\log x=e>0`,
            },
            {
              k: "math",
              t: String.raw`\lim_{x\to\infty}g\left(x\right)=\lim_{x\to\infty}\left\{x\left(1-2\log x\right)+e\right\}=-\infty`,
            },
            {
              k: "p",
              t: String.raw`である。$g$ は $\left(0,e^{-\frac12}\right]$ で増加するので、この区間では $g\left(x\right)>e>0$ となり解はない。$\left[e^{-\frac12},\infty\right)$ では連続かつ**狭義単調減少**で、値は $e+2e^{-\frac12}>0$ から $-\infty$ まで動くので、中間値の定理によりこの区間にただ1つ解をもつ。したがって $x>0$ での解はただ1つである。（証明終わり）`,
            },
            {
              k: "note",
              t: String.raw`その解は実は $x=e$ である。$g\left(e\right)=e+e-2e\log e=2e-2e=0$ となる。(iii) ではこれを使う。`,
            },
          ],
          check: String.raw`極大値は $3.931343148$ で $e+2e^{-\frac12}=3.931343148$、また $g\left(e\right)=0$ がちょうど成り立った。`,
        },
        {
          label: "(iii)",
          task: String.raw`$f\left(x\right)$ の極値を求める`,
          answer: String.raw`$x=e$ で極大値 $\dfrac{1}{4e^{2}}$（極小値はない）`,
          approach: String.raw`$f'$ の符号は $g$ の符号。(ii) の解が $x=e$ だと気づけばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x>0$ では $x\left(x+e\right)^{3}>0$ なので、$f'$ の符号は $g$ の符号と同じである。`,
            },
            {
              k: "p",
              t: String.raw`$g\left(e\right)=e+e-2e\log e=0$ であり、(ii) より $g=0$ の解はただ1つなので、その解は $x=e$ である。(ii) の増減から $g$ は $x<e$ で正、$x>e$ で負なので、$f$ は $x=e$ で極大になる。極小値はない。`,
            },
            {
              k: "math",
              t: String.raw`f\left(e\right)=\frac{\log e}{\left(e+e\right)^{2}}=\frac{1}{4e^{2}}`,
            },
            { k: "p", t: String.raw`が極大値である（$0.0338\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ（x > 0）。x = 1 で x 軸と交わり、x = e で極大 1/(4e²)。塗った部分が (v) の S で、右端は直線 x = e。",
                view: [-0.3, 5.2, -0.09, 0.055],
                items: [
                  { k: "seg", a: [Math.E, -0.09], b: [Math.E, 0.055], dash: true, faint: true },
                  { k: "fillBetween", top: G23, bottom: () => 0, from: 1, to: Math.E },
                  { k: "curve", f: G23, from: 0.44, to: 5.2 },
                  { k: "dot", at: [Math.E, 1 / (4 * Math.E ** 2)], label: "極大", place: "above-right" },
                  { k: "dot", at: [1, 0] },
                  { k: "text", at: [1, -0.022], label: "x = 1", place: "below" },
                  { k: "text", at: [Math.E, -0.07], label: "x = e", place: "right" },
                ],
              },
            },
          ],
          check: String.raw`$f\left(e\right)=0.0338338208$ で、$\dfrac1{4e^{2}}=0.0338338208$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`定積分 $I=\displaystyle\int_{1}^{e}\frac{1}{x\left(x+e\right)}dx$ を求める`,
          answer: String.raw`$I=\dfrac1e\log\dfrac{1+e}{2}$`,
          approach: String.raw`$\dfrac{1}{x\left(x+e\right)}=\dfrac1e\left(\dfrac1x-\dfrac1{x+e}\right)$ と分ける。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{1}{x\left(x+e\right)}=\frac1e\left(\frac1x-\frac1{x+e}\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`I=\frac1e\left[\log\frac{x}{x+e}\right]_{1}^{e}=\frac1e\left(\log\frac{e}{2e}-\log\frac{1}{1+e}\right)`,
            },
            { k: "p", t: String.raw`である。整理すると` },
            {
              k: "math",
              t: String.raw`I=\frac1e\left(\log\frac12+\log\left(1+e\right)\right)=\frac1e\log\frac{1+e}{2}`,
            },
            { k: "p", t: String.raw`である（$0.228\ldots$）。` },
          ],
          check: String.raw`数値積分すると $0.228127378$ で、式の値 $0.228127378$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`曲線 $y=f\left(x\right)$、$x$ 軸および直線 $x=e$ で囲まれた部分の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac1e\log\dfrac{1+e}{2}-\dfrac{1}{2e}$`,
          approach: String.raw`$1\leqq x\leqq e$ で $f\geqq0$。部分積分すると (iv) がそのまま出てくる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(x\right)=0$ は $x=1$ だけで、$x>1$ では $f>0$ である。よって囲まれる部分は $1\leqq x\leqq e$ の部分で`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{1}^{e}\frac{\log x}{\left(x+e\right)^{2}}dx`,
            },
            {
              k: "p",
              t: String.raw`である。$\left(-\dfrac{1}{x+e}\right)'=\dfrac{1}{\left(x+e\right)^{2}}$ を使って部分積分すると`,
            },
            {
              k: "math",
              t: String.raw`S=\left[-\frac{\log x}{x+e}\right]_{1}^{e}+\int_{1}^{e}\frac{1}{x\left(x+e\right)}dx`,
            },
            { k: "p", t: String.raw`である。第1項は $\log1=0$ なので` },
            {
              k: "math",
              t: String.raw`\left[-\frac{\log x}{x+e}\right]_{1}^{e}=-\frac{1}{2e}-0=-\frac{1}{2e}`,
            },
            { k: "p", t: String.raw`で、第2項は (iv) の $I$ そのものである。したがって` },
            {
              k: "math",
              t: String.raw`S=\frac1e\log\frac{1+e}{2}-\frac{1}{2e}`,
            },
            { k: "p", t: String.raw`である（$0.0442\ldots$）。` },
            {
              k: "note",
              t: String.raw`(iv) は (v) の下ごしらえ。部分積分で $\log x$ を微分すると $\dfrac1x$ が出て、ちょうど $\dfrac{1}{x\left(x+e\right)}$ の形になる。`,
            },
          ],
          check: String.raw`数値積分すると $0.044187658$ で、式の値 $0.044187658$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "媒介変数表示・積分法",
      topics: ["媒介変数で表された曲線", "不等式の証明", "媒介変数のままの接線", "媒介変数のままの面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$t=\\tfrac12$ で $\\left(\\tfrac{\\sqrt2}4,0\\right)$、$t=1$ で $\\left(1,1\\right)$ になった",
          "$t$ を $\\tfrac12$ から $10.5$ まで $100$ 万点刻みで走査すると $g\\left(t\\right)-f\\left(t\\right)$ の最大は $0$ だった",
          "$t=5$ での接線の傾きは $0.4222222=\\tfrac{19}{45}$、切片は $1.9876160=\\tfrac{8\\sqrt5}9$。面積は多角形近似で $0.100000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$t\geqq\dfrac12$ で $f\left(t\right)=t\sqrt t$、$g\left(t\right)=\sqrt{t\left(2t-1\right)}$ とし、$C\colon x=f\left(t\right),\ y=g\left(t\right)$ とする。$C$ と $x$ 軸の共有点の座標を求める`,
          answer: String.raw`$\left(\dfrac{\sqrt2}{4},\ 0\right)$`,
          approach: String.raw`$y=0$ は $t\left(2t-1\right)=0$。$t\geqq\dfrac12$ より $t=\dfrac12$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=0$ は $t\left(2t-1\right)=0$、つまり $t=0$ または $t=\dfrac12$ である。$t\geqq\dfrac12$ なので $t=\dfrac12$ だけで`,
            },
            {
              k: "math",
              t: String.raw`x=\frac12\sqrt{\frac12}=\frac{1}{2\sqrt2}=\frac{\sqrt2}{4}`,
            },
            { k: "p", t: String.raw`である。よって共有点は $\left(\dfrac{\sqrt2}{4},0\right)$ である。` },
          ],
          check: String.raw`$t=\dfrac12$ で $\left(0.3535534,0\right)$ となり、$\dfrac{\sqrt2}4=0.3535534$ と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$C$ と直線 $y=x$ の共有点の座標を求める`,
          answer: String.raw`$\left(1,\ 1\right)$`,
          approach: String.raw`$f\left(t\right)=g\left(t\right)$ を2乗すると $t\left(t-1\right)^{2}=0$。`,
          blocks: [
            { k: "p", t: String.raw`どちらも $0$ 以上なので、2乗して` },
            {
              k: "math",
              t: String.raw`t^{3}=2t^{2}-t,\qquad t^{3}-2t^{2}+t=0,\qquad t\left(t-1\right)^{2}=0`,
            },
            {
              k: "p",
              t: String.raw`である。$t\geqq\dfrac12$ より $t=1$ で、このとき $x=1$、$y=\sqrt{1\cdot1}=1$ である。よって共有点は $\left(1,1\right)$ である。`,
            },
          ],
          check: String.raw`$t=1$ で $\left(1,1\right)$ になった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$C$ が不等式 $y\leqq x$ の表す領域に含まれることを示す`,
          answer: String.raw`$f\left(t\right)^{2}-g\left(t\right)^{2}=t\left(t-1\right)^{2}\geqq0$ から`,
          approach: String.raw`どちらも $0$ 以上なので、2乗の差を見ればよい。`,
          blocks: [
            { k: "p", t: String.raw`$t\geqq\dfrac12$ では $f\left(t\right)>0$、$g\left(t\right)\geqq0$ である。2乗の差をとると` },
            {
              k: "math",
              t: String.raw`f\left(t\right)^{2}-g\left(t\right)^{2}=t^{3}-\left(2t^{2}-t\right)=t\left(t-1\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$t\geqq\dfrac12>0$ かつ $\left(t-1\right)^{2}\geqq0$ なので、これは $0$ 以上である。両方とも $0$ 以上だから`,
            },
            { k: "math", t: String.raw`g\left(t\right)\leqq f\left(t\right),\qquad\text{つまり}\quad y\leqq x` },
            { k: "p", t: String.raw`である。よって $C$ は領域 $y\leqq x$ に含まれる。（証明終わり）` },
            {
              k: "note",
              t: String.raw`等号は $t=1$、つまり (ii) の共有点 $\left(1,1\right)$ のときだけ。ここで $C$ は直線 $y=x$ に接している。`,
            },
          ],
          check: String.raw`$t$ を $\dfrac12$ から $10.5$ まで $100$ 万点刻みで走査すると $g-f$ の最大は $0$ だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`$C$ 上の点 $\left(5\sqrt5,\ 3\sqrt5\right)$ における接線の方程式を求める`,
          answer: String.raw`$y=\dfrac{19}{45}x+\dfrac{8\sqrt5}{9}$`,
          approach: String.raw`$x=5\sqrt5=5^{\frac32}$ から $t=5$。$\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=t^{\frac32}=5^{\frac32}$ より $t=5$ で、このとき $y=\sqrt{5\cdot9}=3\sqrt5$ となり確かに与えられた点である。`,
            },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=\frac32\sqrt t,\qquad\frac{dy}{dt}=\frac{4t-1}{2\sqrt{2t^{2}-t}}`,
            },
            { k: "p", t: String.raw`なので、$t=5$ では` },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=\frac{3\sqrt5}{2},\qquad\frac{dy}{dt}=\frac{19}{2\cdot3\sqrt5}=\frac{19}{6\sqrt5}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\frac{dy}{dx}=\frac{19}{6\sqrt5}\cdot\frac{2}{3\sqrt5}=\frac{38}{90}=\frac{19}{45}`,
            },
            { k: "p", t: String.raw`である。接線は` },
            {
              k: "math",
              t: String.raw`y-3\sqrt5=\frac{19}{45}\left(x-5\sqrt5\right)`,
            },
            { k: "p", t: String.raw`で、整理すると` },
            {
              k: "math",
              t: String.raw`y=\frac{19}{45}x+3\sqrt5-\frac{19\sqrt5}{9}=\frac{19}{45}x+\frac{27\sqrt5-19\sqrt5}{9}=\frac{19}{45}x+\frac{8\sqrt5}{9}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値で傾き $0.4222222=\dfrac{19}{45}$、切片 $1.9876160=\dfrac{8\sqrt5}9$ になった。`,
        },
        {
          label: "(v)",
          task: String.raw`$C$、直線 $y=x$ および $x$ 軸で囲まれた部分の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{1}{10}$`,
          approach: String.raw`$y$ で積分する。$\displaystyle\int_{0}^{1}x\,dy$ を $t$ の積分に直すと、$\sqrt{\ }$ がきれいに消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(i)(ii)(iii) より、$t$ が $\dfrac12$ から $1$ まで動くと $C$ は $\left(\dfrac{\sqrt2}{4},0\right)$ から $\left(1,1\right)$ へ動き、ずっと直線 $y=x$ の右下にある。したがって囲まれる部分は`,
            },
            {
              k: "math",
              t: String.raw`\left\{\left(x,y\right)\ \middle|\ 0\leqq y\leqq1,\ y\leqq x\leqq X\left(y\right)\right\}`,
            },
            { k: "p", t: String.raw`（$X\left(y\right)$ は $C$ の $x$ 座標）である。よって` },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{1}X\left(y\right)dy-\int_{0}^{1}y\,dy=\int_{\frac12}^{1}f\left(t\right)\frac{dy}{dt}dt-\frac12`,
            },
            { k: "p", t: String.raw`である。被積分関数は` },
            {
              k: "math",
              t: String.raw`t^{\frac32}\cdot\frac{4t-1}{2\sqrt{t}\sqrt{2t-1}}=\frac{t\left(4t-1\right)}{2\sqrt{2t-1}}`,
            },
            { k: "p", t: String.raw`と簡単になる。$u=2t-1$（$t=\dfrac{u+1}{2}$、$dt=\dfrac{du}{2}$）とおくと $4t-1=2u+1$ で` },
            {
              k: "math",
              t: String.raw`\int_{\frac12}^{1}\frac{t\left(4t-1\right)}{2\sqrt{2t-1}}dt=\int_{0}^{1}\frac{\left(u+1\right)\left(2u+1\right)}{8\sqrt u}du=\frac18\int_{0}^{1}\left(2u^{\frac32}+3u^{\frac12}+u^{-\frac12}\right)du`,
            },
            { k: "p", t: String.raw`である。計算すると` },
            {
              k: "math",
              t: String.raw`=\frac18\left(\frac45+2+2\right)=\frac18\cdot\frac{24}{5}=\frac35`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S=\frac35-\frac12=\frac{1}{10}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 C（太線）と直線 y = x。C は t = 1/2 で x 軸に達し、t = 1 で直線に接する。塗った部分が (v) の S。点線は (iv) の接点がある t = 5 のあたりまでの C の続き。",
                view: [-0.25, 2.15, -0.35, 1.35],
                items: [
                  { k: "seg", a: [-0.25, -0.25], b: [1.35, 1.35], dash: true },
                  {
                    k: "fill",
                    pts: [
                      [0, 0],
                      ...Array.from({ length: 41 }, (_, i): [number, number] =>
                        C23(0.5 + 0.5 * (i / 40) ** 2),
                      ),
                    ],
                  },
                  { k: "param", f: C23, from: 0.5, to: 2.0 },
                  { k: "dot", at: [Math.SQRT2 / 4, 0], label: "t = 1/2", place: "below" },
                  { k: "dot", at: [1, 1], label: "t = 1", place: "above-left" },
                  { k: "text", at: [1.35, 1.35], label: "y = x", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x$ で積分しようとすると、$C$ の下側と直線で挟まれた部分の上下関係が分かりにくい。$y$ で積分するほうが素直。`,
          ],
          check: String.raw`曲線を細かい折れ線にして面積を求めると $0.100000000$ で、$\dfrac1{10}$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["等差数列の決定", "和の公式", "極限", "部分分数分解による和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a_n=\\left(2n+1\\right)\\sqrt3$ とすると $a_1a_2=45$、$a_2a_3=105$ がどちらも成り立った",
          "$T_n$ を直接足した値が $n=1,2,3,5$ で $n\\left(4n^{2}+18n+23\\right)$ と一致した",
          "$\\tfrac{T_n}{nS_n}$ は $n=2\\times10^{6}$ で $2.3094040$、$\\tfrac{4\\sqrt3}3=2.3094011$。$U_n$ も $n=1,2,5,10$ で $\\tfrac{n}{9\\left(2n+3\\right)}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`すべての項が正の等差数列 $\left\{a_n\right\}$ が $a_1a_2=45$、$a_2a_3=105$ をみたすとき、一般項 $a_n$ を求める`,
          answer: String.raw`$a_n=\left(2n+1\right)\sqrt3$`,
          approach: String.raw`2式の差をとると $a_2\left(a_3-a_1\right)=2a_2d=60$。`,
          blocks: [
            { k: "p", t: String.raw`公差を $d$ とする。2式の差をとると` },
            {
              k: "math",
              t: String.raw`a_2a_3-a_1a_2=a_2\left(a_3-a_1\right)=2a_2d=105-45=60`,
            },
            { k: "p", t: String.raw`なので $a_2d=30$ である。また $a_1=a_2-d$ だから` },
            {
              k: "math",
              t: String.raw`a_1a_2=\left(a_2-d\right)a_2=a_2^{2}-a_2d=a_2^{2}-30=45`,
            },
            {
              k: "p",
              t: String.raw`となり $a_2^{2}=75$ である。すべての項が正なので $a_2=5\sqrt3$ で、$d=\dfrac{30}{5\sqrt3}=2\sqrt3$、$a_1=5\sqrt3-2\sqrt3=3\sqrt3$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`a_n=3\sqrt3+\left(n-1\right)\cdot2\sqrt3=\left(2n+1\right)\sqrt3`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a_3-a_1=2d$ であって $d$ ではない。ここを間違えると $a_2^{2}=105$ になってしまう。`,
          ],
          check: String.raw`この式で $a_1a_2=45$、$a_2a_3=105$ がどちらも成り立った。`,
        },
        {
          label: "(ii)",
          task: String.raw`$T_n=\displaystyle\sum_{k=1}^{n}a_ka_{k+1}$ を $n$ で表す`,
          answer: String.raw`$T_n=n\left(4n^{2}+18n+23\right)$`,
          approach: String.raw`$a_ka_{k+1}=3\left(2k+1\right)\left(2k+3\right)=3\left(4k^{2}+8k+3\right)$ を和の公式で足す。`,
          blocks: [
            {
              k: "math",
              t: String.raw`a_ka_{k+1}=3\left(2k+1\right)\left(2k+3\right)=3\left(4k^{2}+8k+3\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`T_n=3\left\{4\cdot\frac{n\left(n+1\right)\left(2n+1\right)}{6}+8\cdot\frac{n\left(n+1\right)}{2}+3n\right\}`,
            },
            { k: "p", t: String.raw`である。整理すると` },
            {
              k: "math",
              t: String.raw`T_n=2n\left(n+1\right)\left(2n+1\right)+12n\left(n+1\right)+9n=n\left(4n^{2}+18n+23\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`直接足した値が $n=1,2,3,5$ でこの式と一致した（$45,150,339,1065$）。`,
        },
        {
          label: "(iii)",
          task: String.raw`$S_n=\displaystyle\sum_{k=1}^{n}a_k$ とするとき、極限 $\displaystyle\lim_{n\to\infty}\frac{T_n}{nS_n}$ を求める`,
          answer: String.raw`$\dfrac{4\sqrt3}{3}$`,
          approach: String.raw`$S_n=\sqrt3\,n\left(n+2\right)$。分母分子とも $n^{3}$ の項を見る。`,
          blocks: [
            {
              k: "math",
              t: String.raw`S_n=\sqrt3\sum_{k=1}^{n}\left(2k+1\right)=\sqrt3\left\{n\left(n+1\right)+n\right\}=\sqrt3\,n\left(n+2\right)`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\frac{T_n}{nS_n}=\frac{n\left(4n^{2}+18n+23\right)}{\sqrt3\,n^{2}\left(n+2\right)}=\frac{4n^{2}+18n+23}{\sqrt3\,n\left(n+2\right)}`,
            },
            { k: "p", t: String.raw`で、分母分子を $n^{2}$ で割ると` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{T_n}{nS_n}=\frac{4}{\sqrt3}=\frac{4\sqrt3}{3}`,
            },
            { k: "p", t: String.raw`である（$2.309\ldots$）。` },
          ],
          check: String.raw`$n=2\times10^{6}$ で $2.3094040$ となり、$\dfrac{4\sqrt3}3=2.3094011$ に近づいていた。`,
        },
        {
          label: "(iv)",
          task: String.raw`$U_n=\displaystyle\sum_{k=1}^{n}\frac{1}{a_ka_{k+1}}$ を $n$ で表す`,
          answer: String.raw`$U_n=\dfrac{n}{9\left(2n+3\right)}$`,
          approach: String.raw`$\dfrac{1}{\left(2k+1\right)\left(2k+3\right)}=\dfrac12\left(\dfrac1{2k+1}-\dfrac1{2k+3}\right)$。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{1}{a_ka_{k+1}}=\frac{1}{3\left(2k+1\right)\left(2k+3\right)}=\frac16\left(\frac{1}{2k+1}-\frac{1}{2k+3}\right)`,
            },
            { k: "p", t: String.raw`である。中間が消えて` },
            {
              k: "math",
              t: String.raw`U_n=\frac16\left(\frac13-\frac{1}{2n+3}\right)=\frac16\cdot\frac{2n}{3\left(2n+3\right)}=\frac{n}{9\left(2n+3\right)}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1,2,5,10$ で直接足した値と一致した（$\dfrac1{45}$ など）。`,
        },
        {
          label: "(v)",
          task: String.raw`極限 $\displaystyle\lim_{n\to\infty}U_n$ を求める`,
          answer: String.raw`$\dfrac{1}{18}$`,
          approach: String.raw`(iv) の式で $n\to\infty$。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}U_n=\lim_{n\to\infty}\frac{n}{9\left(2n+3\right)}=\frac{1}{18}`,
            },
            { k: "p", t: String.raw`である（$0.0555\ldots$）。` },
            {
              k: "note",
              t: String.raw`$\dfrac16\cdot\dfrac13=\dfrac1{18}$ で、これは $\dfrac16\cdot\dfrac1{2\cdot1+1}$、つまり最初に残る項そのもの。無限級数では「最初に残る項」だけが生き残る。`,
            },
          ],
          check: String.raw`$n=10$ で $0.0483092$、$n\to\infty$ で $\dfrac1{18}=0.0555556$ に近づく。`,
        },
      ],
    },
  ],
};
