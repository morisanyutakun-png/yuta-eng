import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2020年度（令和2年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\sin x+\tfrac12\sin2x+\tfrac13\sin3x$。 */
const F20U = (x: number): number =>
  Math.sin(x) + Math.sin(2 * x) / 2 + Math.sin(3 * x) / 3;

/** 第2問の $y=\sqrt{x^{2}-1}$ と、$n=2$ での接線。 */
const G20U = (x: number): number => Math.sqrt(Math.max(0, x * x - 1));
const T20U = (x: number): number => (2 / Math.sqrt(3)) * (x - 0.5);

/** 第3問の軌跡。中心 $-1+3i$、半径 $\sqrt{10}$ の円。 */
const K20: [number, number] = [-1, 3];
const R20 = Math.sqrt(10);

export const uec2020: SolutionSet = {
  slug: "uec",
  year: 2020,
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
      topics: ["和積の公式", "因数分解して解く", "極値", "回転体の体積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f'=\\cos x+\\cos2x+\\cos3x$ は数値微分と一致し、$\\cos2x\\left(2\\cos x+1\\right)$ との差は $10^{-15}$ 以下だった",
          "$f\\left(\\tfrac{\\pi}4\\right)=1.4428090$、$f\\left(\\tfrac{2\\pi}3\\right)=0.4330127$、$f\\left(\\tfrac{3\\pi}4\\right)=0.4428090$ が式の値と一致した",
          "$\\left[0,\\pi\\right]$ での $f$ の最小は $0$（端点）で、体積は数値 $6.716814106$、$\\tfrac{49\\pi^{2}}{72}=6.716814106$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\sin x+\dfrac12\sin2x+\dfrac13\sin3x$ の導関数 $f'\left(x\right)$ を求める`,
          answer: String.raw`$f'\left(x\right)=\cos x+\cos2x+\cos3x$`,
          approach: String.raw`$\left(\sin kx\right)'=k\cos kx$ なので、係数がちょうど打ち消し合う。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\cos x+\frac12\cdot2\cos2x+\frac13\cdot3\cos3x=\cos x+\cos2x+\cos3x`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値微分と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$\cos\left(\alpha+\beta\right)+\cos\left(\alpha-\beta\right)$ を $\cos\alpha,\cos\beta$ で、$\cos\left(\alpha+\beta\right)-\cos\left(\alpha-\beta\right)$ を $\sin\alpha,\sin\beta$ で表す`,
          answer: String.raw`$\cos\left(\alpha+\beta\right)+\cos\left(\alpha-\beta\right)=2\cos\alpha\cos\beta$、$\cos\left(\alpha+\beta\right)-\cos\left(\alpha-\beta\right)=-2\sin\alpha\sin\beta$`,
          approach: String.raw`加法定理を2つ書いて足す・引く。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\cos\left(\alpha+\beta\right)=\cos\alpha\cos\beta-\sin\alpha\sin\beta`,
            },
            {
              k: "math",
              t: String.raw`\cos\left(\alpha-\beta\right)=\cos\alpha\cos\beta+\sin\alpha\sin\beta`,
            },
            { k: "p", t: String.raw`である。足すと $\sin$ の項が消えて` },
            {
              k: "math",
              t: String.raw`\cos\left(\alpha+\beta\right)+\cos\left(\alpha-\beta\right)=2\cos\alpha\cos\beta`,
            },
            { k: "p", t: String.raw`で、引くと $\cos$ の項が消えて` },
            {
              k: "math",
              t: String.raw`\cos\left(\alpha+\beta\right)-\cos\left(\alpha-\beta\right)=-2\sin\alpha\sin\beta`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(iii) では前者を $\alpha=2x$、$\beta=x$ で使う。(v) では後者（と前者）が直交性の計算に効く。`,
            },
          ],
          check: String.raw`$\alpha,\beta$ をいくつか選んで両辺が一致することを確かめた。`,
        },
        {
          label: "(iii)",
          task: String.raw`$0<x<\pi$ で $f'\left(x\right)=0$ の解を求める`,
          answer: String.raw`$x=\dfrac{\pi}{4},\ \dfrac{2\pi}{3},\ \dfrac{3\pi}{4}$`,
          approach: String.raw`$\cos x+\cos3x=2\cos2x\cos x$ でくくる。`,
          blocks: [
            { k: "p", t: String.raw`(ii) を $\alpha=2x$、$\beta=x$ で使うと` },
            {
              k: "math",
              t: String.raw`\cos3x+\cos x=2\cos2x\cos x`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=2\cos2x\cos x+\cos2x=\cos2x\left(2\cos x+1\right)`,
            },
            { k: "p", t: String.raw`である。$f'=0$ は $\cos2x=0$ または $\cos x=-\dfrac12$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$\cos2x=0$：$0<2x<2\pi$ より $2x=\dfrac{\pi}{2},\dfrac{3\pi}{2}$、つまり $x=\dfrac{\pi}{4},\dfrac{3\pi}{4}$`,
                String.raw`$\cos x=-\dfrac12$：$0<x<\pi$ より $x=\dfrac{2\pi}{3}$`,
              ],
            },
            { k: "p", t: String.raw`よって解は $x=\dfrac{\pi}{4},\dfrac{2\pi}{3},\dfrac{3\pi}{4}$ である。` },
          ],
          check: String.raw`$f'$ と $\cos2x\left(2\cos x+1\right)$ の差は $10^{-15}$ 以下で、符号変化も3か所だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`$y=f\left(x\right)$（$0<x<\pi$）の極値を求める`,
          answer: String.raw`$x=\dfrac{\pi}{4}$ で極大値 $\dfrac{2\sqrt2}{3}+\dfrac12$、$x=\dfrac{2\pi}{3}$ で極小値 $\dfrac{\sqrt3}{4}$、$x=\dfrac{3\pi}{4}$ で極大値 $\dfrac{2\sqrt2}{3}-\dfrac12$`,
          approach: String.raw`$\cos2x$ と $2\cos x+1$ の符号を別々に追う。`,
          blocks: [
            {
              k: "steps",
              items: [
                String.raw`$0<x<\dfrac{\pi}{4}$：$\cos2x>0$、$2\cos x+1>0$ なので $f'>0$`,
                String.raw`$\dfrac{\pi}{4}<x<\dfrac{2\pi}{3}$：$\cos2x<0$、$2\cos x+1>0$ なので $f'<0$`,
                String.raw`$\dfrac{2\pi}{3}<x<\dfrac{3\pi}{4}$：$\cos2x<0$、$2\cos x+1<0$ なので $f'>0$`,
                String.raw`$\dfrac{3\pi}{4}<x<\pi$：$\cos2x>0$、$2\cos x+1<0$ なので $f'<0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $x=\dfrac{\pi}{4},\dfrac{3\pi}{4}$ で極大、$x=\dfrac{2\pi}{3}$ で極小である。値は`,
            },
            {
              k: "math",
              t: String.raw`f\left(\frac{\pi}{4}\right)=\frac{\sqrt2}{2}+\frac12+\frac13\cdot\frac{\sqrt2}{2}=\frac{2\sqrt2}{3}+\frac12`,
            },
            {
              k: "math",
              t: String.raw`f\left(\frac{2\pi}{3}\right)=\frac{\sqrt3}{2}+\frac12\left(-\frac{\sqrt3}{2}\right)+0=\frac{\sqrt3}{4}`,
            },
            {
              k: "math",
              t: String.raw`f\left(\frac{3\pi}{4}\right)=\frac{\sqrt2}{2}-\frac12+\frac13\cdot\frac{\sqrt2}{2}=\frac{2\sqrt2}{3}-\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x)（0 ≦ x ≦ π）。x = π/4 と x = 3π/4 で極大、x = 2π/3 で極小。両端で 0 になり、その間はずっと正。塗った部分が (v) で回転させる部分。",
                view: [-0.3, 3.5, -0.25, 1.75],
                items: [
                  { k: "fillBetween", top: F20U, bottom: () => 0, from: 0, to: Math.PI },
                  { k: "curve", f: F20U, from: 0, to: Math.PI },
                  { k: "dot", at: [Math.PI / 4, F20U(Math.PI / 4)], label: "極大", place: "above" },
                  { k: "dot", at: [(2 * Math.PI) / 3, F20U((2 * Math.PI) / 3)], label: "極小", place: "below-left" },
                  { k: "dot", at: [(3 * Math.PI) / 4, F20U((3 * Math.PI) / 4)], label: "極大", place: "above-right" },
                  { k: "text", at: [Math.PI, 0], label: "x = π", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`数値では $1.4428090$、$0.4330127$、$0.4428090$ となり式の値と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`曲線 $y=f\left(x\right)$（$0\leqq x\leqq\pi$）と $x$ 軸で囲まれた部分を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{49\pi^{2}}{72}$`,
          approach: String.raw`$f^{2}$ を展開し、(ii) を使って $\displaystyle\int_0^{\pi}\sin mx\sin nx\,dx$ を計算する。$m\ne n$ なら $0$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(0\right)=f\left(\pi\right)=0$ で、(iv) より $0<x<\pi$ では最小でも $f\left(\dfrac{2\pi}{3}\right)=\dfrac{\sqrt3}{4}>0$ なので、$f\geqq0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int_{0}^{\pi}\left\{f\left(x\right)\right\}^{2}dx`,
            },
            { k: "p", t: String.raw`である。(ii) の後者（符号を変えて）から` },
            {
              k: "math",
              t: String.raw`\sin mx\sin nx=\frac12\left\{\cos\left(m-n\right)x-\cos\left(m+n\right)x\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$k$ が $0$ でない整数のとき $\displaystyle\int_{0}^{\pi}\cos kx\,dx=\left[\frac{\sin kx}{k}\right]_{0}^{\pi}=0$ なので`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\pi}\sin mx\sin nx\,dx=\begin{cases}0&\left(m\ne n\right)\\[2pt]\dfrac{\pi}{2}&\left(m=n\right)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である（$m=n$ のときは $\dfrac12\displaystyle\int_0^{\pi}\left(1-\cos2mx\right)dx=\dfrac{\pi}{2}$）。したがって $f^{2}$ を展開すると、異なる番号どうしの積はすべて消えて`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\pi}f^{2}dx=\left(1^{2}+\left(\frac12\right)^{2}+\left(\frac13\right)^{2}\right)\cdot\frac{\pi}{2}=\frac{49}{36}\cdot\frac{\pi}{2}=\frac{49\pi}{72}`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`V=\frac{49\pi^{2}}{72}` },
            { k: "p", t: String.raw`である（$6.7168\ldots$）。` },
            {
              k: "note",
              t: String.raw`$1+\dfrac14+\dfrac19=\dfrac{36+9+4}{36}=\dfrac{49}{36}$ である。係数を $\dfrac1k$ にそろえてあるのは、この形にするためだろう。`,
            },
          ],
          pitfalls: [
            String.raw`$f^{2}$ をまともに展開すると項が6つ出るが、$\sin mx\sin nx$（$m\ne n$）の積分はすべて $0$。先にこれを示しておくと一気に片づく。`,
          ],
          check: String.raw`数値積分すると $6.716814106$ で、$\dfrac{49\pi^{2}}{72}=6.716814106$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["ルートを含む関数の接線", "指数関数による置換", "接線と曲線で囲む面積", "対数と極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3,5,10$ で接線の $x$ 切片は $\\tfrac1n$ になった",
          "$x=\\tfrac{e^{t}+e^{-t}}2$ に $t=\\log\\left(n+\\sqrt{n^{2}-1}\\right)$ を入れると $n$ に戻り、不定積分の式も数値積分と一致した",
          "$S_n$ は $n=2,3,5,10$ で式と小数7桁まで一致し、$T_n$ は $n=10^{6}$ で $0.4888946$ と $\\tfrac12$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\sqrt{x^{2}-1}$（$x\geqq1$）、$C\colon y=f\left(x\right)$ とする。$x>1$ での $f'\left(x\right)$ を求め、$C$ 上の点 $\left(n,f\left(n\right)\right)$（$n\geqq2$ の整数）における接線 $\ell_n$ と $x$ 軸の交点の $x$ 座標 $x_n$ を $n$ で表す`,
          answer: String.raw`$f'\left(x\right)=\dfrac{x}{\sqrt{x^{2}-1}}$、$x_n=\dfrac1n$`,
          approach: String.raw`接線の式に $y=0$ を入れる。$\sqrt{n^{2}-1}$ が約分されて消える。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{2x}{2\sqrt{x^{2}-1}}=\frac{x}{\sqrt{x^{2}-1}}`,
            },
            { k: "p", t: String.raw`である。接線 $\ell_n$ は` },
            {
              k: "math",
              t: String.raw`y=\sqrt{n^{2}-1}+\frac{n}{\sqrt{n^{2}-1}}\left(x-n\right)`,
            },
            { k: "p", t: String.raw`で、$y=0$ とおいて両辺に $\sqrt{n^{2}-1}>0$ を掛けると` },
            {
              k: "math",
              t: String.raw`\left(n^{2}-1\right)+n\left(x-n\right)=0,\qquad nx=1`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`x_n=\frac1n` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$C$ は双曲線 $x^{2}-y^{2}=1$ の上半分。接点の $x$ 座標と $x$ 切片の積が $1$ になるのは、この双曲線の接線の性質である。`,
            },
          ],
          check: String.raw`$n=2,3,5,10$ で $x$ 切片は $\dfrac1n$ になった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$x\geqq1$ のとき $x=\dfrac{e^{t}+e^{-t}}{2}$ を満たす実数 $t\geqq0$ を $x$ で表す`,
          answer: String.raw`$t=\log\left(x+\sqrt{x^{2}-1}\right)$`,
          approach: String.raw`$u=e^{t}$ とおくと $u^{2}-2xu+1=0$。$t\geqq0$ から $u\geqq1$ のほうを選ぶ。`,
          blocks: [
            { k: "p", t: String.raw`$u=e^{t}>0$ とおくと $u+\dfrac1u=2x$、すなわち` },
            { k: "math", t: String.raw`u^{2}-2xu+1=0,\qquad u=x\pm\sqrt{x^{2}-1}` },
            {
              k: "p",
              t: String.raw`である。$t\geqq0$ より $u\geqq1$ だが、$x-\sqrt{x^{2}-1}=\dfrac{1}{x+\sqrt{x^{2}-1}}\leqq1$（等号は $x=1$）なので $u=x+\sqrt{x^{2}-1}$ をとる。よって`,
            },
            { k: "math", t: String.raw`t=\log\left(x+\sqrt{x^{2}-1}\right)` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=2,3,5,10$ でこの $t$ を使うと $\dfrac{e^{t}+e^{-t}}2$ が $n$ に戻った。`,
        },
        {
          label: "(iii)",
          task: String.raw`$x=\dfrac{e^{t}+e^{-t}}{2}$（$t\geqq0$）とおくとき、$I=\displaystyle\int f\left(x\right)dx$ を $t$ の式で表す`,
          answer: String.raw`$I=\dfrac{e^{2t}-e^{-2t}}{8}-\dfrac{t}{2}$（積分定数は省略）`,
          approach: String.raw`$x^{2}-1=\left(\dfrac{e^{t}-e^{-t}}{2}\right)^{2}$ になるのがかぎ。`,
          blocks: [
            {
              k: "math",
              t: String.raw`x^{2}-1=\frac{e^{2t}+2+e^{-2t}}{4}-1=\frac{e^{2t}-2+e^{-2t}}{4}=\left(\frac{e^{t}-e^{-t}}{2}\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$t\geqq0$ では $e^{t}\geqq e^{-t}$ なので $f\left(x\right)=\dfrac{e^{t}-e^{-t}}{2}$ である。また $dx=\dfrac{e^{t}-e^{-t}}{2}dt$ だから`,
            },
            {
              k: "math",
              t: String.raw`I=\int\left(\frac{e^{t}-e^{-t}}{2}\right)^{2}dt=\frac14\int\left(e^{2t}-2+e^{-2t}\right)dt`,
            },
            { k: "p", t: String.raw`である。計算すると` },
            {
              k: "math",
              t: String.raw`I=\frac14\left(\frac{e^{2t}}{2}-2t-\frac{e^{-2t}}{2}\right)=\frac{e^{2t}-e^{-2t}}{8}-\frac{t}{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\displaystyle\int_1^{n}\sqrt{x^{2}-1}\,dx$ を数値積分した値と、この式の差が $n=2,3,5,10$ で小数7桁まで一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$C$、$x$ 軸および接線 $\ell_n$ で囲まれた部分の面積 $S_n$ を $n$ で表す`,
          answer: String.raw`$S_n=\dfrac12\log\left(n+\sqrt{n^{2}-1}\right)-\dfrac{\sqrt{n^{2}-1}}{2n}$`,
          approach: String.raw`（三角形の面積）−（$C$ の下の面積）。後者は (ii)(iii) で計算する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell_n$ は $\left(\dfrac1n,0\right)$ と $\left(n,\sqrt{n^{2}-1}\right)$ を通り、$C$ は $\left(1,0\right)$ で $x$ 軸と交わる。囲まれる部分は、$\ell_n$ の下の三角形から、$C$ の下の部分を取り除いたものである。`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{三角形}\right)=\frac12\left(n-\frac1n\right)\sqrt{n^{2}-1}=\frac{\left(n^{2}-1\right)^{\frac32}}{2n}`,
            },
            { k: "p", t: String.raw`である。一方、$t_n=\log\left(n+\sqrt{n^{2}-1}\right)$ とおくと (ii)(iii) より` },
            {
              k: "math",
              t: String.raw`\int_{1}^{n}\sqrt{x^{2}-1}\,dx=\left[\frac{e^{2t}-e^{-2t}}{8}-\frac t2\right]_{0}^{t_n}`,
            },
            {
              k: "p",
              t: String.raw`である。$e^{t_n}=n+\sqrt{n^{2}-1}$、$e^{-t_n}=n-\sqrt{n^{2}-1}$ なので`,
            },
            {
              k: "math",
              t: String.raw`e^{2t_n}-e^{-2t_n}=\left(e^{t_n}-e^{-t_n}\right)\left(e^{t_n}+e^{-t_n}\right)=2\sqrt{n^{2}-1}\cdot2n=4n\sqrt{n^{2}-1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\int_{1}^{n}\sqrt{x^{2}-1}\,dx=\frac{n\sqrt{n^{2}-1}}{2}-\frac{t_n}{2}`,
            },
            { k: "p", t: String.raw`となる。したがって` },
            {
              k: "math",
              t: String.raw`S_n=\frac{\left(n^{2}-1\right)^{\frac32}}{2n}-\frac{n\sqrt{n^{2}-1}}{2}+\frac{t_n}{2}`,
            },
            { k: "p", t: String.raw`で、前の2項は $\sqrt{n^{2}-1}$ でくくると` },
            {
              k: "math",
              t: String.raw`\sqrt{n^{2}-1}\cdot\frac{\left(n^{2}-1\right)-n^{2}}{2n}=-\frac{\sqrt{n^{2}-1}}{2n}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`S_n=\frac12\log\left(n+\sqrt{n^{2}-1}\right)-\frac{\sqrt{n^{2}-1}}{2n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "C: y = √(x² − 1) と、n = 2 のときの接線 ℓ₂。接点は (2, √3)、x 切片は (1/2, 0)。塗った部分が S₂。",
                view: [-0.2, 2.6, -0.3, 2.1],
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0.5, 0],
                      [2, Math.sqrt(3)],
                      ...Array.from({ length: 41 }, (_, i): [number, number] => {
                        const x = 2 - (i / 40) * 1;
                        return [x, G20U(x)];
                      }),
                    ],
                  },
                  { k: "curve", f: G20U, from: 1, to: 2.6 },
                  { k: "seg", a: [0.4, T20U(0.4)], b: [2.5, T20U(2.5)] },
                  { k: "dot", at: [2, Math.sqrt(3)], label: "(2, √3)", place: "above-left" },
                  { k: "dot", at: [0.5, 0], label: "(1/2, 0)", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$n=2,3,5,10$ で、三角形から数値積分を引いた値とこの式が小数7桁まで一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$T_1=0$、$T_n=\dfrac{S_n}{\log n}$（$n\geqq2$）とするとき、$T=\displaystyle\lim_{n\to\infty}T_n$ を求める`,
          answer: String.raw`$T=\dfrac12$`,
          approach: String.raw`$\log\left(n+\sqrt{n^{2}-1}\right)=\log n+\log\left(1+\sqrt{1-\tfrac1{n^{2}}}\right)$ と分ける。`,
          blocks: [
            { k: "p", t: String.raw`$n+\sqrt{n^{2}-1}=n\left(1+\sqrt{1-\dfrac1{n^{2}}}\right)$ なので` },
            {
              k: "math",
              t: String.raw`\log\left(n+\sqrt{n^{2}-1}\right)=\log n+\log\left(1+\sqrt{1-\frac1{n^{2}}}\right)`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`T_n=\frac12+\frac{1}{\log n}\left\{\frac12\log\left(1+\sqrt{1-\frac1{n^{2}}}\right)-\frac{\sqrt{n^{2}-1}}{2n}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。中かっこは $n\to\infty$ で $\dfrac12\log2-\dfrac12$ に収束し、$\dfrac{1}{\log n}\to0$ なので第2項は $0$ に行く。したがって`,
            },
            { k: "math", t: String.raw`T=\frac12` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`収束はとてもゆっくりで、$n=10^{6}$ でも $T_n=0.4889$ 程度。$\dfrac{1}{\log n}$ しか効かないからである。`,
            },
          ],
          check: String.raw`$n=10^{2},10^{4},10^{6}$ で $T_n=0.4667,0.4833,0.4889$ となり、$\dfrac12$ に近づいた。`,
        },
      ],
    },
    {
      no: 3,
      field: "複素数平面",
      topics: ["共役複素数を含む方程式", "非自明解をもつ条件", "複素数で表した直線", "交点の軌跡"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$z=3-i$ を代入すると $\\left(2+i\\right)z-\\left(1-i\\right)\\bar z=3+3i$ になった",
          "$k=0$ では $z=-2+i$ が $\\left(3+4i\\right)z-5\\bar z=0$ をみたし、$k=\\pm1$ では非自明解が見つからなかった",
          "$t=-5,-1,0,0.5,2,10$ で交点はどれも $\\left(x+1\\right)^{2}+\\left(y-3\\right)^{2}=10$ 上にあり、$\\ell$ と $m$ のなす角の余弦はつねに $\\tfrac1{\\sqrt2}$、$t\\to\\infty$ で $\\left(2,2\\right)$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "[I]",
          task: String.raw`方程式 $\left(2+i\right)z-\left(1-i\right)\bar z=3+3i$ の解を求める`,
          answer: String.raw`$z=3-i$`,
          approach: String.raw`$z=x+yi$ とおいて実部・虚部を比べる。`,
          blocks: [
            { k: "p", t: String.raw`$z=x+yi$（$x,y$ は実数）とおくと` },
            {
              k: "math",
              t: String.raw`\left(2+i\right)\left(x+yi\right)=\left(2x-y\right)+\left(x+2y\right)i`,
            },
            {
              k: "math",
              t: String.raw`\left(1-i\right)\left(x-yi\right)=\left(x-y\right)+\left(-x-y\right)i`,
            },
            { k: "p", t: String.raw`なので、差は` },
            {
              k: "math",
              t: String.raw`x+\left(2x+3y\right)i`,
            },
            { k: "p", t: String.raw`である。$3+3i$ と比べて $x=3$、$2x+3y=3$ より $y=-1$。よって` },
            { k: "math", t: String.raw`z=3-i` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$z=3-i$ を代入すると左辺が $3+3i$ になった。`,
        },
        {
          label: "[II]",
          task: String.raw`$k$ を実数とする。$\left(3+4i\right)z-\left(5+ki\right)\bar z=0$ が $z\ne0$ の解をもつときの $k$ を求める`,
          answer: String.raw`$k=0$`,
          approach: String.raw`$x,y$ の同次連立1次方程式にして、非自明解をもつ条件（行列式 $=0$）を使う。`,
          blocks: [
            { k: "p", t: String.raw`$z=x+yi$ とおくと` },
            {
              k: "math",
              t: String.raw`\left(3+4i\right)\left(x+yi\right)=\left(3x-4y\right)+\left(4x+3y\right)i`,
            },
            {
              k: "math",
              t: String.raw`\left(5+ki\right)\left(x-yi\right)=\left(5x+ky\right)+\left(kx-5y\right)i`,
            },
            { k: "p", t: String.raw`なので、方程式は` },
            {
              k: "math",
              t: String.raw`\begin{cases}-2x-\left(4+k\right)y=0\\\left(4-k\right)x+8y=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`となる。これが $\left(x,y\right)\ne\left(0,0\right)$ の解をもつのは、2式が同じ直線を表すとき、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\left(-2\right)\cdot8-\left\{-\left(4+k\right)\right\}\left(4-k\right)=-16+\left(16-k^{2}\right)=-k^{2}=0`,
            },
            { k: "p", t: String.raw`のときである。よって $k=0$ である。` },
            {
              k: "p",
              t: String.raw`実際 $k=0$ なら2式はどちらも $x=-2y$ となり、たとえば $z=-2+i$ が解になる。`,
            },
          ],
          pitfalls: [
            String.raw`$-k^{2}=0$ なので $k=0$ だけ。$k^{2}=16$ などと見間違えないよう、符号をていねいに。`,
          ],
          check: String.raw`$k=0$ では $z=-2+i$ が解になり、$k=\pm1$ では非自明解が見つからなかった。`,
        },
        {
          label: "[III](i)",
          task: String.raw`$t$ を実数とし、$\ell\colon\left(t+i\right)z-\left(t-i\right)\bar z=4\left(t-2\right)i$ とする。$\ell$ が $t$ によらず通る定点 $\mathrm{A}\left(\alpha\right)$ の $\alpha$ を求める`,
          answer: String.raw`$\alpha=-4+2i$`,
          approach: String.raw`$w=t+i$ とすると $\bar w=t-i$ なので、左辺は $2i\,\mathrm{Im}\left(wz\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t$ が実数なので $\overline{t+i}=t-i$ である。$w=t+i$、$z=x+yi$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`wz-\overline{wz}=2i\,\mathrm{Im}\left(wz\right)`,
            },
            { k: "p", t: String.raw`で、$wz=\left(tx-y\right)+\left(x+ty\right)i$ だから $\ell$ は` },
            {
              k: "math",
              t: String.raw`2i\left(x+ty\right)=4\left(t-2\right)i,\qquad x+ty=2t-4`,
            },
            { k: "p", t: String.raw`である。$t$ について整理すると` },
            {
              k: "math",
              t: String.raw`\left(x+4\right)+t\left(y-2\right)=0`,
            },
            {
              k: "p",
              t: String.raw`で、これがすべての実数 $t$ で成り立つのは $x=-4$ かつ $y=2$ のときである。よって`,
            },
            { k: "math", t: String.raw`\alpha=-4+2i` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=-3,0,1,5$ のどれでも $\left(-4,2\right)$ が $\ell$ 上にあった。`,
        },
        {
          label: "[III](ii)",
          task: String.raw`$m\colon\left(1-i\right)\left(t+i\right)z-\left(1+i\right)\left(t-i\right)\bar z=0$ とするとき、$\ell$ と $m$ のなす角 $\theta$（$0\leqq\theta\leqq\dfrac{\pi}{2}$）を求める`,
          answer: String.raw`$\theta=\dfrac{\pi}{4}$`,
          approach: String.raw`$m$ も同じように $\mathrm{Im}\left\{\left(1-i\right)wz\right\}=0$ と書ける。法線ベクトルの内積をとる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(1+i\right)\left(t-i\right)\bar z=\overline{\left(1-i\right)\left(t+i\right)z}$ なので、$m$ は $\mathrm{Im}\left\{\left(1-i\right)wz\right\}=0$ である。`,
            },
            {
              k: "math",
              t: String.raw`\left(1-i\right)wz=\left\{\left(tx-y\right)+\left(x+ty\right)\right\}+\left\{\left(x+ty\right)-\left(tx-y\right)\right\}i`,
            },
            { k: "p", t: String.raw`なので、$m$ は` },
            {
              k: "math",
              t: String.raw`\left(1-t\right)x+\left(1+t\right)y=0`,
            },
            {
              k: "p",
              t: String.raw`である。$\ell\colon x+ty=2t-4$ の法線ベクトルは $\vec{n_1}=\left(1,t\right)$、$m$ のそれは $\vec{n_2}=\left(1-t,1+t\right)$ である。`,
            },
            {
              k: "math",
              t: String.raw`\vec{n_1}\cdot\vec{n_2}=\left(1-t\right)+t\left(1+t\right)=1+t^{2}`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec{n_1}\right|=\sqrt{1+t^{2}},\qquad\left|\vec{n_2}\right|=\sqrt{2+2t^{2}}=\sqrt2\sqrt{1+t^{2}}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\cos\angle\left(\vec{n_1},\vec{n_2}\right)=\frac{1+t^{2}}{\sqrt2\left(1+t^{2}\right)}=\frac{1}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`で、$t$ によらず $\dfrac{\pi}{4}$ である。法線のなす角と直線のなす角は等しい（または補角）ので`,
            },
            { k: "math", t: String.raw`\theta=\frac{\pi}{4}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=-3,0,1,5$ で法線の余弦はつねに $0.707106781=\dfrac1{\sqrt2}$ だった。`,
        },
        {
          label: "[III](iii)",
          task: String.raw`$t$ が実数全体を動くとき、$\ell$ と $m$ の交点 $\mathrm{P}\left(z\right)$ が描く図形を求める`,
          answer: String.raw`中心 $-1+3i$、半径 $\sqrt{10}$ の円。ただし点 $2+2i$ を除く`,
          approach: String.raw`2式から $t$ を消去する。または「$\mathrm{A}$ と原点を見込む角が $\dfrac{\pi}{4}$」と見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell\colon x+ty=2t-4$、$m\colon\left(1-t\right)x+\left(1+t\right)y=0$ である。$m$ は $\left(x+y\right)+t\left(y-x\right)=0$ とも書ける。`,
            },
            {
              k: "p",
              t: String.raw`$y\ne2$ かつ $x\ne y$ のとき、それぞれから`,
            },
            {
              k: "math",
              t: String.raw`t=\frac{x+4}{2-y},\qquad t=\frac{x+y}{x-y}`,
            },
            { k: "p", t: String.raw`である。等しいとおいて分母を払うと` },
            {
              k: "math",
              t: String.raw`\left(x+4\right)\left(x-y\right)=\left(x+y\right)\left(2-y\right)`,
            },
            { k: "p", t: String.raw`で、展開すると $-xy$ が両辺で消えて` },
            {
              k: "math",
              t: String.raw`x^{2}+4x-4y=2x+2y-y^{2},\qquad x^{2}+y^{2}+2x-6y=0`,
            },
            { k: "p", t: String.raw`となる。平方完成して` },
            {
              k: "math",
              t: String.raw`\left(x+1\right)^{2}+\left(y-3\right)^{2}=10`,
            },
            {
              k: "p",
              t: String.raw`である。すなわち中心 $-1+3i$、半径 $\sqrt{10}$ の円である。除いた場合（$y=2$ のとき $\mathrm{P}=\mathrm{A}\left(-4,2\right)$、$x=y$ のとき $\mathrm{P}=\mathrm{O}$）もこの円の上にあり、それぞれ $t=\dfrac13$、$t=2$ で実際にとる。`,
            },
            {
              k: "p",
              t: String.raw`**とれない点**。$\ell$ と $m$ は (ii) より $\dfrac{\pi}{4}$ で交わるので、つねにただ1点で交わる。$t\to\pm\infty$ では $\ell$ は $y=2$ に、$m$ は $y=x$ に近づくので、$\mathrm{P}$ は $\left(2,2\right)$ に近づく。しかし $x=y=2$ を $\ell$ に入れると $2+2t=2t-4$ となって成り立たないので、$\left(2,2\right)$ はとれない。`,
            },
            {
              k: "p",
              t: String.raw`よって $\mathrm{P}$ が描くのは**中心 $-1+3i$、半径 $\sqrt{10}$ の円から点 $2+2i$ を除いたもの**である。`,
            },
            {
              k: "note",
              t: String.raw`$\ell$ は定点 $\mathrm{A}$ を、$m$ は原点 $\mathrm{O}$ を通り、交わる角が $\dfrac{\pi}{4}$ で一定である。だから $\mathrm{P}$ は線分 $\mathrm{AO}$ を $\dfrac{\pi}{4}$ の角で見込む点の集合、つまり円周角の定理から円になる。$\mathrm{AO}=2\sqrt5$ なので半径は $\dfrac{2\sqrt5}{2\sin\frac{\pi}{4}}=\sqrt{10}$ で、確かに合う。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "交点 P が描く円（中心 −1 + 3i、半径 √10）。A(−4, 2) と原点 O はこの円上にある。点線は t = 0 のときの ℓ（x = −4）と m（y = −x）で、交点は (−4, 4)。白丸の (2, 2) はとれない点。",
                view: [-5.6, 5.0, -2.0, 7.2],
                items: [
                  {
                    k: "param",
                    f: (th: number): [number, number] => [
                      K20[0] + R20 * Math.cos(th),
                      K20[1] + R20 * Math.sin(th),
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [-4, -2.0], b: [-4, 7.2], dash: true, faint: true },
                  { k: "seg", a: [-5.0, 5.0], b: [4.5, -4.5], dash: true, faint: true },
                  { k: "dot", at: [-4, 2], label: "A", place: "left" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [-4, 4], label: "t = 0 の P", place: "above-right" },
                  { k: "text", at: [2, 2], label: "(2, 2) は除く", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「円全体」と答えると減点されうる。$t\to\pm\infty$ の極限の点がとれないことを確かめる。`,
          ],
          check: String.raw`$t=-5,-1,0,0.5,2,10$ の交点はどれも円の式を満たし、$t=10^{8}$ では $\left(2.0000000,2.0000000\right)$ に近づいた。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列・微分",
      topics: ["整式の漸化式", "階差数列", "数学的帰納法", "極値をもつ条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f_n$ を分数係数のまま $n=21$ まで作り、$a_n=3-\\tfrac{n\\left(n-1\\right)}2$、$b_n-2n-1=2^{n-1}$ がどちらも一致した",
          "$c_n=3n-2-\\tfrac{\\left(n-1\\right)n\\left(n+1\\right)}6$ と $c_{n+1}-c_n=3-\\tfrac{n\\left(n+1\\right)}2$ も一致し、$d_n>0$ もすべて成り立った",
          "$c_n<0$ となるのは $n\\geqq5$ のときだけで、$f_n'$ の $0<x<1$ での符号変化の回数は $n\\leqq4$ で $0$、$n\\geqq5$ で $1$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f_1\left(x\right)=x+3$、$f_{n+1}\left(x\right)=\left(x+1\right)\left\{f_n\left(x\right)-n\right\}+x^{n+1}$ とする。$a_n=f_n\left(0\right)$ について $a_1$、$a_{n+1}-a_n$、$a_n$ を求める`,
          answer: String.raw`$a_1=3$、$a_{n+1}-a_n=-n$、$a_n=3-\dfrac{n\left(n-1\right)}{2}$`,
          approach: String.raw`$x=0$ を代入する。$0^{n+1}=0$（$n\geqq1$）。`,
          blocks: [
            { k: "p", t: String.raw`$a_1=f_1\left(0\right)=3$ である。$x=0$ を代入すると、$n\geqq1$ では $0^{n+1}=0$ なので` },
            {
              k: "math",
              t: String.raw`a_{n+1}=1\cdot\left(a_n-n\right)+0=a_n-n,\qquad a_{n+1}-a_n=-n`,
            },
            { k: "p", t: String.raw`である。階差から、$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`a_n=3+\sum_{k=1}^{n-1}\left(-k\right)=3-\frac{n\left(n-1\right)}{2}`,
            },
            { k: "p", t: String.raw`で、$n=1$ でも $3$ となり成り立つ。` },
          ],
          check: String.raw`$f_n$ を実際に作ると $a_1,\ldots,a_5=3,2,0,-3,-7$ で、式と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$b_n=f_n\left(1\right)$ とするとき $b_n-2n-1$ を $n$ で表す`,
          answer: String.raw`$b_n-2n-1=2^{n-1}$`,
          approach: String.raw`$x=1$ を代入すると $b_{n+1}=2b_n-2n+1$。$b_n-2n-1$ とおくと等比になる。`,
          blocks: [
            { k: "p", t: String.raw`$b_1=f_1\left(1\right)=4$ である。$x=1$ を代入すると` },
            {
              k: "math",
              t: String.raw`b_{n+1}=2\left(b_n-n\right)+1=2b_n-2n+1`,
            },
            { k: "p", t: String.raw`である。$e_n=b_n-2n-1$ とおくと $b_n=e_n+2n+1$ で` },
            {
              k: "math",
              t: String.raw`e_{n+1}+2n+3=2\left(e_n+2n+1\right)-2n+1=2e_n+2n+3`,
            },
            { k: "p", t: String.raw`なので $e_{n+1}=2e_n$ である。$e_1=4-3=1$ だから` },
            { k: "math", t: String.raw`b_n-2n-1=e_n=2^{n-1}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$b_1,\ldots,b_5=4,7,11,16,22$ に対して $b_n-2n-1=1,2,4,8,16$ となった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$c_n=f_n'\left(0\right)$ とするとき $c_{n+1}-c_n$ と $c_n$ を $n$ で表す`,
          answer: String.raw`$c_{n+1}-c_n=3-\dfrac{n\left(n+1\right)}{2}$、$c_n=3n-2-\dfrac{\left(n-1\right)n\left(n+1\right)}{6}$`,
          approach: String.raw`漸化式を微分してから $x=0$ を代入する。`,
          blocks: [
            { k: "p", t: String.raw`漸化式の両辺を $x$ で微分すると` },
            {
              k: "math",
              t: String.raw`f_{n+1}'\left(x\right)=\left\{f_n\left(x\right)-n\right\}+\left(x+1\right)f_n'\left(x\right)+\left(n+1\right)x^{n}`,
            },
            { k: "p", t: String.raw`である。$x=0$ を代入すると（$n\geqq1$ より $0^{n}=0$）` },
            {
              k: "math",
              t: String.raw`c_{n+1}=\left(a_n-n\right)+c_n,\qquad c_{n+1}-c_n=a_n-n=3-\frac{n\left(n-1\right)}{2}-n`,
            },
            { k: "p", t: String.raw`で、整理すると` },
            {
              k: "math",
              t: String.raw`c_{n+1}-c_n=3-\frac{n\left(n+1\right)}{2}`,
            },
            { k: "p", t: String.raw`である。$c_1=f_1'\left(0\right)=1$ なので、$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`c_n=1+\sum_{k=1}^{n-1}\left\{3-\frac{k\left(k+1\right)}{2}\right\}=1+3\left(n-1\right)-\frac12\sum_{k=1}^{n-1}\left(k^{2}+k\right)`,
            },
            { k: "p", t: String.raw`である。$\displaystyle\sum_{k=1}^{n-1}\left(k^{2}+k\right)=\frac{\left(n-1\right)n\left(n+1\right)}{3}$ なので` },
            {
              k: "math",
              t: String.raw`c_n=3n-2-\frac{\left(n-1\right)n\left(n+1\right)}{6}`,
            },
            { k: "p", t: String.raw`で、$n=1$ でも $1$ となり成り立つ。` },
          ],
          check: String.raw`$c_1,\ldots,c_5=1,3,3,0,-7$ となり、式と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$d_n=f_n'\left(1\right)$ とするとき $d_n>0$ を証明する`,
          answer: String.raw`$d_{n+1}=2d_n+2^{n-1}+2n+2$ と $d_1=1>0$ から帰納法`,
          approach: String.raw`(iii) の微分した式に $x=1$ を代入し、(ii) の $b_n$ を使う。`,
          blocks: [
            { k: "p", t: String.raw`(iii) の式に $x=1$ を代入すると` },
            {
              k: "math",
              t: String.raw`d_{n+1}=\left(b_n-n\right)+2d_n+\left(n+1\right)=2d_n+b_n+1`,
            },
            { k: "p", t: String.raw`である。(ii) より $b_n=2^{n-1}+2n+1$ なので` },
            {
              k: "math",
              t: String.raw`d_{n+1}=2d_n+2^{n-1}+2n+2`,
            },
            {
              k: "p",
              t: String.raw`である。$d_1=f_1'\left(1\right)=1>0$ であり、$d_n>0$ とすると $2^{n-1}+2n+2>0$ だから $d_{n+1}>0$ である。よって帰納法によりすべての自然数 $n$ で $d_n>0$ である。（証明終わり）`,
            },
          ],
          check: String.raw`$d_1,\ldots,d_5=1,7,22,56,130$ でどれも正、$n=20$ まで正だった。`,
        },
        {
          label: "(v)",
          task: String.raw`$y=f_n\left(x\right)$ が $0<x<1$ の範囲に極値をとるための $n$ の条件を求める`,
          answer: String.raw`$n\geqq5$`,
          approach: String.raw`$d_n>0$ はいつも成り立つので、$c_n<0$ になるかどうかで決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$n\geqq5$ のとき**。$6c_n=18n-12-\left(n^{3}-n\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`c_n<0\iff n^{3}-19n+12>0`,
            },
            {
              k: "p",
              t: String.raw`である。$g\left(n\right)=n^{3}-19n+12$ とおくと $g\left(1\right)=-6$、$g\left(2\right)=-18$、$g\left(3\right)=-18$、$g\left(4\right)=0$、$g\left(5\right)=42$ で、$n\geqq3$ では $g'\left(n\right)=3n^{2}-19>0$ だから $g$ は増加する。よって $g\left(n\right)>0$ となるのは $n\geqq5$ のときだけである。`,
            },
            {
              k: "p",
              t: String.raw`$n\geqq5$ なら $f_n'\left(0\right)=c_n<0$、$f_n'\left(1\right)=d_n>0$ である。$f_n$ は $\left[0,1\right]$ で連続な多項式なので最小値をとるが、$f_n'\left(0\right)<0$ より $x=0$ の右側で値が下がるので $x=0$ では最小にならず、$f_n'\left(1\right)>0$ より $x=1$ の左側で値が下がるので $x=1$ でも最小にならない。したがって最小値をとるのは $0<x<1$ の内部の点で、そこは**極小**である。`,
            },
            {
              k: "p",
              t: String.raw`**$n\leqq4$ のとき**。漸化式から順に計算すると`,
            },
            {
              k: "math",
              t: String.raw`f_1=x+3,\quad f_2=2x^{2}+3x+2,\quad f_3=3x^{3}+5x^{2}+3x,\quad f_4=4x^{4}+8x^{3}+8x^{2}-3`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f_1'=1,\quad f_2'=4x+3,\quad f_3'=9x^{2}+10x+3,\quad f_4'=8x\left(2x^{2}+3x+2\right)`,
            },
            {
              k: "p",
              t: String.raw`である。どれも $0<x<1$ で正なので、$f_n$ はこの区間で単調増加であり極値をとらない（$2x^{2}+3x+2$ は判別式が負で正）。`,
            },
            { k: "p", t: String.raw`したがって求める条件は` },
            { k: "math", t: String.raw`n\geqq5` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=4$ は $c_4=0$ でちょうど境い目。$f_4'\left(0\right)=0$ だが $0<x<1$ では $f_4'>0$ なので、極値にはならない。ここが引っかけどころ。`,
            },
          ],
          pitfalls: [
            String.raw`$f_n'\left(0\right)<0$ と $f_n'\left(1\right)>0$ だけでは「$f_n'$ の零点がある」までしか言えない。最小値が内部でとられることを言うと「極値」まで言い切れる。`,
          ],
          check: String.raw`$f_n'$ の $0<x<1$ での符号変化を数えると、$n\leqq4$ で $0$ 回、$n=5$ から $20$ までは $1$ 回だった。`,
        },
      ],
    },
  ],
};
