import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2024年度（令和6年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\dfrac1{\cos^{2}x}-16\sin^{2}x$。 */
const F24 = (x: number): number => 1 / Math.cos(x) ** 2 - 16 * Math.sin(x) ** 2;

/** 第2問の2曲線。 */
const C1_24 = (x: number): number => Math.exp(x) * Math.sqrt(Math.max(0, 6 - Math.exp(x)));
const C2_24 = (x: number): number => 2 * Math.SQRT2 * Math.exp(x / 2);

/** 第3問の楕円 $x^{2}+\dfrac{y^{2}}4=1$。 */
const E24 = (t: number): [number, number] => [Math.cos(t), 2 * Math.sin(t)];
/** 第3問の円 $C_a$。 */
const CA24 =
  (a: number) =>
  (t: number): [number, number] => [a + (a + 1) * Math.cos(t), (a + 1) * Math.sin(t)];

export const uec2024: SolutionSet = {
  slug: "uec",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "情報理工学域",
  university: "電気通信大学",
  short: "電通大",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数・微分積分",
      topics: ["2倍角の公式", "三角方程式", "合成関数の微分", "三角関数の定積分"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f\\left(\\tfrac{\\pi}{12}\\right)$ と $f\\left(\\tfrac{5\\pi}{12}\\right)$ はどちらも $0$（誤差 $10^{-15}$ 以下）",
          "数値微分すると $x=0,\\pm\\tfrac{\\pi}3$ で $f'=0$ になり、$x=-1.3,-0.5,0.5,1.3$ での符号は $-,+,-,+$ だった",
          "面積を数値積分すると $4.913478794$ で、$\\tfrac{8\\pi}3-2\\sqrt3=4.913478794$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ で $f\left(x\right)=\dfrac{1}{\cos^{2}x}-16\sin^{2}x$ とする。$0<x<\dfrac{\pi}{2}$ での $f\left(x\right)=0$ の解 $\alpha,\beta$（$\alpha<\beta$）を求める`,
          answer: String.raw`$\alpha=\dfrac{\pi}{12}$、$\beta=\dfrac{5\pi}{12}$`,
          approach: String.raw`分母を払うと $16\sin^{2}x\cos^{2}x=1$。$2\sin x\cos x=\sin2x$ でまとめる。`,
          blocks: [
            { k: "p", t: String.raw`$\cos x\ne0$ なので、$f\left(x\right)=0$ は両辺に $\cos^{2}x$ を掛けて` },
            {
              k: "math",
              t: String.raw`1=16\sin^{2}x\cos^{2}x=4\left(2\sin x\cos x\right)^{2}=4\sin^{2}2x`,
            },
            {
              k: "p",
              t: String.raw`となる。よって $\sin^{2}2x=\dfrac14$、$\sin2x=\pm\dfrac12$ である。$0<x<\dfrac{\pi}{2}$ では $0<2x<\pi$ なので $\sin2x>0$ で`,
            },
            { k: "math", t: String.raw`\sin2x=\frac12,\qquad2x=\frac{\pi}{6},\ \frac{5\pi}{6}` },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`\alpha=\frac{\pi}{12},\qquad\beta=\frac{5\pi}{12}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$f\left(\dfrac{\pi}{12}\right)$ と $f\left(\dfrac{5\pi}{12}\right)$ はどちらも $0$（誤差 $10^{-15}$ 以下）だった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$\tan\alpha,\ \tan\beta$ の値を求める`,
          answer: String.raw`$\tan\alpha=2-\sqrt3$、$\tan\beta=2+\sqrt3$`,
          approach: String.raw`加法定理でもよいが、$1+\tan^{2}x=\dfrac1{\cos^{2}x}$ を使うと (i) の式から直接出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=\tan x$ とおくと $\dfrac1{\cos^{2}x}=1+t^{2}$、$\sin^{2}x=\dfrac{t^{2}}{1+t^{2}}$ なので、$f\left(x\right)=0$ は`,
            },
            {
              k: "math",
              t: String.raw`1+t^{2}=\frac{16t^{2}}{1+t^{2}},\qquad\left(1+t^{2}\right)^{2}=16t^{2}`,
            },
            { k: "p", t: String.raw`となる。$0<x<\dfrac{\pi}{2}$ では $t>0$ なので $1+t^{2}=4t$、すなわち` },
            { k: "math", t: String.raw`t^{2}-4t+1=0,\qquad t=2\pm\sqrt3` },
            {
              k: "p",
              t: String.raw`である。$\tan$ は $0<x<\dfrac{\pi}{2}$ で増加するから、$\alpha<\beta$ より`,
            },
            {
              k: "math",
              t: String.raw`\tan\alpha=2-\sqrt3,\qquad\tan\beta=2+\sqrt3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\tan\dfrac{\pi}{12}=2-\sqrt3$、$\tan\dfrac{5\pi}{12}=2+\sqrt3$ は加法定理（$\dfrac{\pi}{12}=\dfrac{\pi}{3}-\dfrac{\pi}{4}$）からも出る。積が $1$ なのは $\alpha+\beta=\dfrac{\pi}{2}$ だから。`,
            },
          ],
          check: String.raw`$\tan\dfrac{\pi}{12}=0.2679492=2-\sqrt3$、$\tan\dfrac{5\pi}{12}=3.7320508=2+\sqrt3$ だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`$-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ における $f'\left(x\right)=0$ の解をすべて求める`,
          answer: String.raw`$x=0,\ \pm\dfrac{\pi}{3}$`,
          approach: String.raw`$f'=\dfrac{2\sin x\left(1-16\cos^{4}x\right)}{\cos^{3}x}$ と整理する。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{d}{dx}\left(\cos x\right)^{-2}=2\left(\cos x\right)^{-3}\sin x$ なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{2\sin x}{\cos^{3}x}-32\sin x\cos x=\frac{2\sin x\left(1-16\cos^{4}x\right)}{\cos^{3}x}`,
            },
            {
              k: "p",
              t: String.raw`である。$\cos x>0$ なので $f'=0$ は $\sin x=0$ または $\cos^{4}x=\dfrac1{16}$ である。後者は $\cos^{2}x=\dfrac14$、$\cos x>0$ より $\cos x=\dfrac12$ である。よって`,
            },
            { k: "math", t: String.raw`x=0,\qquad x=\pm\frac{\pi}{3}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値微分すると $x=0,\pm\dfrac{\pi}3$ で $f'=0$ になった。`,
        },
        {
          label: "(iv)",
          task: String.raw`$-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ における $f\left(x\right)$ の極値をすべて求める`,
          answer: String.raw`$x=0$ で極大値 $1$、$x=\pm\dfrac{\pi}{3}$ で極小値 $-8$`,
          approach: String.raw`$f'$ の符号を $\sin x$ と $1-16\cos^{4}x$ に分けて調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\cos^{3}x>0$ なので、$f'$ の符号は $\sin x$ と $1-16\cos^{4}x$ の積の符号である。$\left|x\right|<\dfrac{\pi}{3}$ では $\cos x>\dfrac12$ なので $1-16\cos^{4}x<0$、$\dfrac{\pi}{3}<\left|x\right|<\dfrac{\pi}{2}$ では $\cos x<\dfrac12$ なので $1-16\cos^{4}x>0$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-\dfrac{\pi}{2}<x<-\dfrac{\pi}{3}$：$\sin x<0$、$1-16\cos^{4}x>0$ なので $f'<0$（減少）`,
                String.raw`$-\dfrac{\pi}{3}<x<0$：$\sin x<0$、$1-16\cos^{4}x<0$ なので $f'>0$（増加）`,
                String.raw`$0<x<\dfrac{\pi}{3}$：$\sin x>0$、$1-16\cos^{4}x<0$ なので $f'<0$（減少）`,
                String.raw`$\dfrac{\pi}{3}<x<\dfrac{\pi}{2}$：$\sin x>0$、$1-16\cos^{4}x>0$ なので $f'>0$（増加）`,
              ],
            },
            { k: "p", t: String.raw`よって $x=\pm\dfrac{\pi}{3}$ で極小、$x=0$ で極大である。値は` },
            {
              k: "math",
              t: String.raw`f\left(0\right)=1-0=1,\qquad f\left(\pm\frac{\pi}{3}\right)=\frac{1}{\left(\frac12\right)^{2}}-16\cdot\frac34=4-12=-8`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ。偶関数で、x = 0 で極大 1、x = ±π/3 で極小 −8。x = ±π/2 に近づくと +∞ に発散する。塗った部分が (v) の D。",
                view: [-1.7, 1.7, -10.5, 10.5],
                items: [
                  { k: "seg", a: [-Math.PI / 2, -10.5], b: [-Math.PI / 2, 10.5], dash: true, faint: true },
                  { k: "text", at: [-Math.PI / 2, -9.5], label: "x = −π/2", place: "left" },
                  { k: "text", at: [Math.PI / 2, -9.5], label: "x = π/2", place: "right" },
                  { k: "seg", a: [Math.PI / 2, -10.5], b: [Math.PI / 2, 10.5], dash: true, faint: true },
                  { k: "fillBetween", top: () => 0, bottom: F24, from: Math.PI / 12, to: (5 * Math.PI) / 12 },
                  { k: "curve", f: F24, from: -1.38, to: 1.38 },
                  { k: "dot", at: [0, 1], label: "極大 1", place: "above" },
                  { k: "dot", at: [Math.PI / 3, -8], label: "極小 −8", place: "below-right" },
                  { k: "dot", at: [-Math.PI / 3, -8], label: "極小 −8", place: "below-left" },
                  { k: "dot", at: [Math.PI / 12, 0] },
                  { k: "dot", at: [(5 * Math.PI) / 12, 0] },
                  { k: "text", at: [Math.PI / 4, -4.5], label: "D", place: "below" },
                ],
              },
            },
          ],
          check: String.raw`$f'$ の符号は $x=-1.3,-0.5,0.5,1.3$ で順に $-,+,-,+$ で、増減表と合った。`,
        },
        {
          label: "(v)",
          task: String.raw`$0<x<\dfrac{\pi}{2}$ で曲線 $y=f\left(x\right)$ と $x$ 軸で囲まれた領域 $D$ の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{8\pi}{3}-2\sqrt3$`,
          approach: String.raw`$\alpha<x<\beta$ で $f<0$。$16\sin^{2}x=8-8\cos2x$ と直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0<x<\dfrac{\pi}{2}$ で $f=0$ となるのは $x=\alpha,\beta$ だけで、その間では $f<0$（たとえば $f\left(\dfrac{\pi}{4}\right)=2-8=-6$）。囲まれた領域はここだけである。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac{\pi}{12}}^{\frac{5\pi}{12}}\left(16\sin^{2}x-\frac{1}{\cos^{2}x}\right)dx`,
            },
            { k: "p", t: String.raw`である。$16\sin^{2}x=8\left(1-\cos2x\right)$ なので` },
            {
              k: "math",
              t: String.raw`S=\left[8x-4\sin2x-\tan x\right]_{\frac{\pi}{12}}^{\frac{5\pi}{12}}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sin\dfrac{5\pi}{6}=\sin\dfrac{\pi}{6}=\dfrac12$ なので $-4\sin2x$ の項は両端で同じ値になり、差し引きで消える。残るのは`,
            },
            {
              k: "math",
              t: String.raw`S=8\left(\frac{5\pi}{12}-\frac{\pi}{12}\right)-\left\{\left(2+\sqrt3\right)-\left(2-\sqrt3\right)\right\}=\frac{8\pi}{3}-2\sqrt3`,
            },
            { k: "p", t: String.raw`である（$4.913\ldots$）。(ii) の値がそのまま効く。` },
          ],
          pitfalls: [
            String.raw`$f<0$ の区間なので、$\displaystyle\int f\,dx$ ではなく $\displaystyle\int\left(-f\right)dx$ を計算する。`,
          ],
          check: String.raw`数値積分すると $4.913478794$ で、$\dfrac{8\pi}3-2\sqrt3=4.913478794$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["指数関数の置き換え", "ルートを含む関数の微分", "置換積分", "回転体の体積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$x=\\log2$ と $x=\\log4$ で $f$ と $g$ の値が一致し（$4$ と $4\\sqrt2$）、極大値も $f\\left(\\log4\\right)=5.6568542=4\\sqrt2$ だった",
          "$-\\tfrac23\\left(6-e^{x}\\right)^{\\frac32}$ を数値微分すると $e^{x}\\sqrt{6-e^{x}}$ と一致した",
          "面積は数値 $0.134006751$ で式 $\\tfrac{40-28\\sqrt2}3=0.134006751$、体積は数値 $4.188790205$ で $\\tfrac{4\\pi}3=4.188790205$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=e^{x}\sqrt{6-e^{x}}$、$g\left(x\right)=2\sqrt2\,e^{\frac x2}$ とする。$6-e^{x}\geqq0$ となる範囲 $x\leqq x_0$ の $x_0$ を求め、$C_1\colon y=f\left(x\right)$ と $C_2\colon y=g\left(x\right)$ の共有点をすべて求める`,
          answer: String.raw`$x_0=\log6$。共有点は $\left(\log2,\ 4\right)$ と $\left(\log4,\ 4\sqrt2\right)$`,
          approach: String.raw`$t=e^{\frac x2}>0$ とおくと $e^{x}=t^{2}$。$t$ の4次式が複2次式になる。`,
          blocks: [
            { k: "p", t: String.raw`$6-e^{x}\geqq0$ は $e^{x}\leqq6$、すなわち $x\leqq\log6$ である。よって $x_0=\log6$ である。` },
            { k: "p", t: String.raw`共有点は $f\left(x\right)=g\left(x\right)$ から求める。$t=e^{\frac x2}>0$ とおくと $e^{x}=t^{2}$ で` },
            {
              k: "math",
              t: String.raw`t^{2}\sqrt{6-t^{2}}=2\sqrt2\,t,\qquad t\sqrt{6-t^{2}}=2\sqrt2`,
            },
            { k: "p", t: String.raw`である（$t>0$ で割った）。両辺とも正なので2乗して` },
            {
              k: "math",
              t: String.raw`t^{2}\left(6-t^{2}\right)=8,\qquad t^{4}-6t^{2}+8=0,\qquad\left(t^{2}-2\right)\left(t^{2}-4\right)=0`,
            },
            {
              k: "p",
              t: String.raw`となる。$t^{2}=e^{x}$ なので $e^{x}=2$ または $e^{x}=4$、つまり $x=\log2,\ \log4$ である。どちらも $x\leqq\log6$ を満たす。$y$ の値は`,
            },
            {
              k: "math",
              t: String.raw`f\left(\log2\right)=2\sqrt{4}=4,\qquad f\left(\log4\right)=4\sqrt{2}`,
            },
            { k: "p", t: String.raw`である。よって共有点は $\left(\log2,4\right)$ と $\left(\log4,4\sqrt2\right)$ である。` },
          ],
          pitfalls: [
            String.raw`2乗するので、両辺が正であることを確かめてから。ここは $t>0$ と $\sqrt{\ }\geqq0$ から明らか。`,
          ],
          check: String.raw`$x=\log2$ で $f=g=4$、$x=\log4$ で $f=g=5.6568542=4\sqrt2$ だった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$x<x_0$ で $f'\left(x\right)$ を求め、$f\left(x\right)$ の極値を求める`,
          answer: String.raw`$f'\left(x\right)=\dfrac{3e^{x}\left(4-e^{x}\right)}{2\sqrt{6-e^{x}}}$。$x=\log4$ で極大値 $4\sqrt2$（極小値はない）`,
          approach: String.raw`積の微分。$\sqrt{6-e^{x}}$ でくくる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=e^{x}\sqrt{6-e^{x}}+e^{x}\cdot\frac{-e^{x}}{2\sqrt{6-e^{x}}}=\frac{e^{x}\left\{2\left(6-e^{x}\right)-e^{x}\right\}}{2\sqrt{6-e^{x}}}`,
            },
            { k: "p", t: String.raw`である。中かっこは $12-3e^{x}=3\left(4-e^{x}\right)$ なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{3e^{x}\left(4-e^{x}\right)}{2\sqrt{6-e^{x}}}`,
            },
            {
              k: "p",
              t: String.raw`である。$x<\log6$ では分母も $e^{x}$ も正なので、符号は $4-e^{x}$ で決まる。$x<\log4$ で正、$\log4<x<\log6$ で負なので、$x=\log4$ で極大である。極小値はない。`,
            },
            { k: "math", t: String.raw`f\left(\log4\right)=4\sqrt{6-4}=4\sqrt2` },
            { k: "p", t: String.raw`が極大値である。` },
            {
              k: "note",
              t: String.raw`極大をとる点が $C_1$ と $C_2$ の共有点の1つになっている。だから $C_2$ は $C_1$ の頂上を通る。`,
            },
          ],
          check: String.raw`数値微分と式が一致し、極大値は $f\left(\log4\right)=5.6568542=4\sqrt2$ だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`不定積分 $I=\displaystyle\int e^{x}\sqrt{6-e^{x}}\,dx$ を求める`,
          answer: String.raw`$I=-\dfrac23\left(6-e^{x}\right)^{\frac32}$（積分定数は省略）`,
          approach: String.raw`$u=6-e^{x}$ とおくと $du=-e^{x}dx$。`,
          blocks: [
            { k: "p", t: String.raw`$u=6-e^{x}$ とおくと $du=-e^{x}\,dx$ なので` },
            {
              k: "math",
              t: String.raw`I=\int\sqrt u\left(-du\right)=-\frac23u^{\frac32}=-\frac23\left(6-e^{x}\right)^{\frac32}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`この式を数値微分すると $e^{x}\sqrt{6-e^{x}}$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$C_1$ と $C_2$ で囲まれた領域 $D$ の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{40-28\sqrt2}{3}$`,
          approach: String.raw`$\log2<x<\log4$ で $f>g$。(iii) を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=\log3$ で $f=3\sqrt3=5.19\ldots$、$g=2\sqrt6=4.89\ldots$ なので、$\log2<x<\log4$ では $f>g$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\log2}^{\log4}\left\{f\left(x\right)-g\left(x\right)\right\}dx=\left[-\frac23\left(6-e^{x}\right)^{\frac32}-4\sqrt2\,e^{\frac x2}\right]_{\log2}^{\log4}`,
            },
            { k: "p", t: String.raw`である。$e^{\frac x2}$ は $x=\log2,\log4$ でそれぞれ $\sqrt2,\ 2$ だから` },
            {
              k: "math",
              t: String.raw`\left(\text{上端}\right)=-\frac23\cdot2^{\frac32}-8\sqrt2=-\frac{4\sqrt2}{3}-8\sqrt2`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{下端}\right)=-\frac23\cdot4^{\frac32}-4\sqrt2\cdot\sqrt2=-\frac{16}{3}-8`,
            },
            { k: "p", t: String.raw`である。引き算して` },
            {
              k: "math",
              t: String.raw`S=\left(\frac{16}{3}+8\right)-\left(\frac{4\sqrt2}{3}+8\sqrt2\right)=\frac{40}{3}-\frac{28\sqrt2}{3}=\frac{40-28\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`である（$0.134\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "C1（山の形の曲線）と C2（右上がりの曲線）。2つは log 2 と log 4 で交わり、そのあいだの細い部分が D。点線は x = log 6 で、C1 はここで x 軸に達する。",
                view: [-0.3, 2.1, -0.8, 7.8],
                items: [
                  { k: "seg", a: [Math.log(6), -0.8], b: [Math.log(6), 7.8], dash: true, faint: true },
                  { k: "fillBetween", top: C1_24, bottom: C2_24, from: Math.log(2), to: Math.log(4) },
                  { k: "curve", f: C1_24, from: -0.3, to: Math.log(6) },
                  { k: "curve", f: C2_24, from: -0.3, to: 2.1 },
                  { k: "dot", at: [Math.log(2), 4], label: "(log 2, 4)", place: "below-right" },
                  { k: "dot", at: [Math.log(4), 4 * Math.SQRT2], label: "(log 4, 4√2)", place: "above-left" },
                  { k: "text", at: [1.65, C1_24(1.65)], label: "C1", place: "below-right" },
                  { k: "text", at: [2.0, C2_24(2.0)], label: "C2", place: "left" },
                  { k: "text", at: [Math.log(6), 0], label: "x = log 6", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`数値積分すると $0.134006751$ で、$\dfrac{40-28\sqrt2}3=0.134006751$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$D$ を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{4\pi}{3}$`,
          approach: String.raw`$f^{2}-g^{2}=6e^{2x}-e^{3x}-8e^{x}$。$e^{x}$ の多項式なのでそのまま積分できる。`,
          blocks: [
            { k: "p", t: String.raw`$D$ は $x$ 軸より上にあるので、断面は円環で` },
            {
              k: "math",
              t: String.raw`V=\pi\int_{\log2}^{\log4}\left\{f\left(x\right)^{2}-g\left(x\right)^{2}\right\}dx`,
            },
            { k: "p", t: String.raw`である。$f^{2}=e^{2x}\left(6-e^{x}\right)$、$g^{2}=8e^{x}$ なので` },
            {
              k: "math",
              t: String.raw`f^{2}-g^{2}=6e^{2x}-e^{3x}-8e^{x}`,
            },
            { k: "p", t: String.raw`で、原始関数は $3e^{2x}-\dfrac{e^{3x}}{3}-8e^{x}$ である。$e^{x}=4$ と $e^{x}=2$ を代入すると` },
            {
              k: "math",
              t: String.raw`\left(\text{上端}\right)=48-\frac{64}{3}-32=-\frac{16}{3},\qquad\left(\text{下端}\right)=12-\frac83-16=-\frac{20}{3}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`V=\pi\left(-\frac{16}{3}+\frac{20}{3}\right)=\frac{4\pi}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`面積は $\sqrt{\ }$ が残って汚いのに、体積は2乗するので $e^{x}$ の多項式になり、きれいな値になる。`,
            },
          ],
          check: String.raw`数値積分すると $4.188790205$ で、$\dfrac{4\pi}3=4.188790205$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["楕円上の最大値", "線分の傾きの最大", "円と楕円の共有点", "共有点をもつ条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "楕円を $4000$ 等分して走査すると $x+\\sqrt2y$ の最大は $2.9999996$（$3$）で、そのときの点は $\\left(0.3328,1.8860\\right)$、$\\left(\\tfrac13,\\tfrac{4\\sqrt2}3\\right)=\\left(0.3333,1.8856\\right)$ に近かった",
          "同じ走査で $\\tfrac{y}{x-3}$ の最大は $0.7071067$（$\\tfrac1{\\sqrt2}=0.7071068$）で、そのときの点は $\\left(0.3328,-1.8860\\right)$ だった",
          "$a=-2,-0.5,-0.01,0,0.5,1,2,2.99,3,3.01,3.5$ について $\\mathrm{A}$ 以外の共有点の有無を調べると、あるのは $a=0,0.5,1,2,2.99$ のときだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$D\colon x^{2}+\dfrac{y^{2}}{4}\leqq1$ を $\mathrm{P}\left(x,y\right)$ が動くとき、$x+\sqrt2\,y$ の最大値とそのときの $x,y$ を求める`,
          answer: String.raw`最大値 $3$、$\left(x,y\right)=\left(\dfrac13,\ \dfrac{4\sqrt2}{3}\right)$`,
          approach: String.raw`$x=r\cos\theta$、$y=2r\sin\theta$（$0\leqq r\leqq1$）とおいて合成する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ の点は $x=r\cos\theta$、$y=2r\sin\theta$（$0\leqq r\leqq1$）と書ける。このとき`,
            },
            {
              k: "math",
              t: String.raw`x+\sqrt2\,y=r\left(\cos\theta+2\sqrt2\sin\theta\right)`,
            },
            { k: "p", t: String.raw`である。合成すると $\sqrt{1+8}=3$ なので` },
            {
              k: "math",
              t: String.raw`\cos\theta+2\sqrt2\sin\theta=3\sin\left(\theta+\varphi\right)\leqq3`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin\varphi=\dfrac13$、$\cos\varphi=\dfrac{2\sqrt2}{3}$）。よって $x+\sqrt2y\leqq3r\leqq3$ で、等号は $r=1$ かつ $\sin\left(\theta+\varphi\right)=1$ のときである。このとき`,
            },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac13,\qquad\sin\theta=\frac{2\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`x=\frac13,\qquad y=2\cdot\frac{2\sqrt2}{3}=\frac{4\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`で、最大値は $3$ である。` },
            {
              k: "note",
              t: String.raw`「直線 $x+\sqrt2y=k$ が $D$ と共有点をもつ最大の $k$」と見て、楕円に接する条件から求めてもよい。`,
            },
          ],
          check: String.raw`楕円を $4000$ 等分して走査すると最大は $2.9999996$ で、点は $\left(0.3328,1.8860\right)$ だった。`,
        },
        {
          label: "(ii)",
          task: String.raw`$\mathrm{P}\left(x,y\right)$ が $D$ を動くとき、$\dfrac{y}{x-3}$ の最大値とそのときの $x,y$ を求める`,
          answer: String.raw`最大値 $\dfrac{\sqrt2}{2}$、$\left(x,y\right)=\left(\dfrac13,\ -\dfrac{4\sqrt2}{3}\right)$`,
          approach: String.raw`$k=\dfrac{y}{x-3}$ は点 $\left(3,0\right)$ と $\mathrm{P}$ を結ぶ直線の傾き。接する条件を判別式で出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k=\dfrac{y}{x-3}$ とおくと、$\mathrm{P}$ は直線 $y=k\left(x-3\right)$ 上にある。つまり求める最大値は、この直線が $D$ と共有点をもつような $k$ の最大値である。$D$ の点は $\left|x\right|\leqq1<3$ なので $x-3\ne0$ でよい。`,
            },
            { k: "p", t: String.raw`$y=k\left(x-3\right)$ を楕円の式に代入すると` },
            {
              k: "math",
              t: String.raw`4x^{2}+k^{2}\left(x-3\right)^{2}=4,\qquad\left(4+k^{2}\right)x^{2}-6k^{2}x+9k^{2}-4=0`,
            },
            { k: "p", t: String.raw`である。判別式を計算すると` },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=9k^{4}-\left(4+k^{2}\right)\left(9k^{2}-4\right)=16-32k^{2}`,
            },
            {
              k: "p",
              t: String.raw`となる。共有点をもつ条件は $16-32k^{2}\geqq0$、すなわち $k^{2}\leqq\dfrac12$ である。よって最大値は`,
            },
            { k: "math", t: String.raw`k=\frac{1}{\sqrt2}=\frac{\sqrt2}{2}` },
            { k: "p", t: String.raw`である。このとき重解で` },
            {
              k: "math",
              t: String.raw`x=\frac{3k^{2}}{4+k^{2}}=\frac{\frac32}{\frac92}=\frac13,\qquad y=k\left(x-3\right)=\frac{1}{\sqrt2}\cdot\left(-\frac83\right)=-\frac{4\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(i) の直線 $x+\sqrt2y=3$ は $y=0$ のとき $x=3$ なので、やはり点 $\left(3,0\right)$ を通る。つまり (i) と (ii) は、点 $\left(3,0\right)$ から楕円に引いた2本の接線を上下で見ているだけで、接点が $\left(\dfrac13,\pm\dfrac{4\sqrt2}{3}\right)$ とそろうのも偶然ではない。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "楕円 E と領域 D（塗った部分）。2本の直線はどちらも点 (3, 0) を通り、E に (1/3, 4√2/3) と (1/3, −4√2/3) で接する。右下がりのほうが (i) の x + √2 y = 3、右上がりのほうが (ii) の傾き √2/2 の直線。",
                view: [-1.9, 3.8, -2.5, 2.5],
                items: [
                  {
                    k: "fill",
                    pts: Array.from({ length: 73 }, (_, i): [number, number] =>
                      E24((2 * Math.PI * i) / 72),
                    ),
                  },
                  { k: "param", f: E24, from: 0, to: 2 * Math.PI },
                  { k: "seg", a: [-1.8, (3 + 1.8) / Math.SQRT2], b: [3.7, (3 - 3.7) / Math.SQRT2] },
                  {
                    k: "seg",
                    a: [-1.8, (-1.8 - 3) / Math.SQRT2],
                    b: [3.7, (3.7 - 3) / Math.SQRT2],
                  },
                  { k: "dot", at: [3, 0], label: "(3, 0)", place: "below" },
                  { k: "dot", at: [1 / 3, (4 * Math.SQRT2) / 3], label: "接点", place: "above-right" },
                  { k: "dot", at: [1 / 3, -(4 * Math.SQRT2) / 3], label: "接点", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x-3<0$ なので、$y>0$ の側では $k<0$ になる。最大値を与える点は下半分にある。`,
          ],
          check: String.raw`走査すると最大は $0.7071067$ で、点は $\left(0.3328,-1.8860\right)$ だった。`,
        },
        {
          label: "(iii)",
          task: String.raw`円 $C_a\colon\left(x-a\right)^{2}+y^{2}=\left(a+1\right)^{2}$（$a\ne-1$）と楕円 $E$ が点 $\mathrm{A}\left(-1,0\right)$ と異なる共有点をもつとき、その共有点の $x$ 座標 $x_0$ を $a$ で表す`,
          answer: String.raw`$x_0=\dfrac{3-2a}{3}$`,
          approach: String.raw`$E$ から $y^{2}=4\left(1-x^{2}\right)$ を代入する。$x=-1$ が解であることが分かっているので因数分解できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C_a$ はどの $a$ についても $\mathrm{A}\left(-1,0\right)$ を通る（$\left(-1-a\right)^{2}=\left(a+1\right)^{2}$）。共有点では $y^{2}=4\left(1-x^{2}\right)$ なので、円の式に代入すると`,
            },
            {
              k: "math",
              t: String.raw`\left(x-a\right)^{2}+4\left(1-x^{2}\right)=\left(a+1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。展開して整理すると $a^{2}$ が消えて` },
            {
              k: "math",
              t: String.raw`-3x^{2}-2ax+4=2a+1,\qquad3x^{2}+2ax+2a-3=0\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。$x=-1$ を入れると $3-2a+2a-3=0$ なので、$x=-1$ は $\left(\ast\right)$ の解である。解と係数の関係から、もう一方の解は`,
            },
            {
              k: "math",
              t: String.raw`\left(-1\right)+x_0=-\frac{2a}{3},\qquad x_0=1-\frac{2a}{3}=\frac{3-2a}{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$a=1$ では $x_0=\dfrac13$ で、実際に $\left(\dfrac13,\pm1.8856\right)$ が両方の曲線上にあった。`,
        },
        {
          label: "(iv)",
          task: String.raw`円 $C_a$ と楕円 $E$ が点 $\mathrm{A}\left(-1,0\right)$ と異なる共有点をもつような $a$ の範囲を求める`,
          answer: String.raw`$0\leqq a<3$`,
          approach: String.raw`$x_0$ が楕円の $x$ の範囲 $-1\leqq x\leqq1$ に入り、しかも $x_0\ne-1$ であること。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(\ast\right)$ の解 $x_0$ に対応する点が実際に楕円上にあるには $-1\leqq x_0\leqq1$ が必要で、それで十分である（このとき $y=\pm2\sqrt{1-x_0^{2}}$ が決まる）。`,
            },
            {
              k: "p",
              t: String.raw`さらに $\mathrm{A}$ と異なる点でなければならない。$x_0=-1$ だと $y=0$ となって $\mathrm{A}$ 自身なので、$x_0\ne-1$ が要る。一方 $x_0=1$ なら点は $\left(1,0\right)$ で、$\mathrm{A}$ とは異なるのでよい。まとめると`,
            },
            { k: "math", t: String.raw`-1<x_0\leqq1` },
            { k: "p", t: String.raw`である。$x_0=\dfrac{3-2a}{3}$ を入れると` },
            {
              k: "steps",
              items: [
                String.raw`$x_0\leqq1$：$3-2a\leqq3$ より $a\geqq0$`,
                String.raw`$x_0>-1$：$3-2a>-3$ より $a<3$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`0\leqq a<3` },
            { k: "p", t: String.raw`である（$a\ne-1$ は自動的に満たされる）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "楕円 E と円 C_a（a = 0, 1, 2 の3つ）。どの円も A(−1, 0) を通る。a が 0 から 3 に近づくにつれて、もう1つの共有点は (1, 0) から A に向かって動く。",
                view: [-2.2, 5.3, -3.3, 3.3],
                items: [
                  { k: "param", f: CA24(0), from: 0, to: 2 * Math.PI, faint: true },
                  { k: "param", f: CA24(1), from: 0, to: 2 * Math.PI, faint: true },
                  { k: "param", f: CA24(2), from: 0, to: 2 * Math.PI, faint: true },
                  { k: "param", f: E24, from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [-1, 0], label: "A", place: "left" },
                  { k: "dot", at: [1, 0], label: "a = 0", place: "below-right" },
                  { k: "dot", at: [1 / 3, 2 * Math.sqrt(1 - 1 / 9)], label: "a = 1", place: "above-right" },
                  { k: "dot", at: [-1 / 3, 2 * Math.sqrt(1 - 1 / 9)], label: "a = 2", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x_0=1$ のとき共有点は $\left(1,0\right)$ の1点だけだが、$\mathrm{A}$ とは別の点なので範囲に入る。端の扱いに注意。`,
          ],
          check: String.raw`$a=-2,-0.5,-0.01,0,0.5,1,2,2.99,3,3.01,3.5$ で調べると、$\mathrm{A}$ 以外の共有点があるのは $a=0,0.5,1,2,2.99$ のときだけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["置き換えで等比数列にする", "階差数列", "分数式の約分", "最大になる項"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式を分数のまま回すと $a_n=\\tfrac{n\\left(n+1\\right)}{2^{n}}$ が $n=1$ から $11$ まで一致した",
          "$b_2=-\\tfrac32$、$b_3=-\\tfrac32$、$b_4=\\tfrac54$ で、$b_n=\\tfrac{n\\left(n+1\\right)\\left(n^{2}-5n+5\\right)}{2^{n}}$ と $d_n=\\tfrac{n^{2}-5n+5}2$ も $n=1$ から $11$ まで一致した",
          "$b_{n+1}-b_n=\\tfrac{P\\left(n\\right)}{2^{n+1}}$ が $P\\left(n\\right)=-\\left(n+1\\right)\\left(n-2\\right)\\left(n^{2}-7n+1\\right)$ で成り立ち、$b_n$ の最大は $n=7$ の $8.3125$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$a_1=1$、$2na_{n+1}-\left(n+2\right)a_n=0$ とする。$c_n=\dfrac{a_n}{n\left(n+1\right)}$ とおくとき $c_{n+1}$ を $c_n$ で表し、$\left\{a_n\right\}$ の一般項を求める`,
          answer: String.raw`$c_{n+1}=\dfrac{c_n}{2}$、$a_n=\dfrac{n\left(n+1\right)}{2^{n}}$`,
          approach: String.raw`$a_{n+1}=\dfrac{\left(n+2\right)a_n}{2n}$ を $c_{n+1}$ の定義に入れると $\left(n+2\right)$ が約分される。`,
          blocks: [
            { k: "p", t: String.raw`漸化式より $a_{n+1}=\dfrac{\left(n+2\right)a_n}{2n}$ である。よって` },
            {
              k: "math",
              t: String.raw`c_{n+1}=\frac{a_{n+1}}{\left(n+1\right)\left(n+2\right)}=\frac{\left(n+2\right)a_n}{2n\left(n+1\right)\left(n+2\right)}=\frac{a_n}{2n\left(n+1\right)}=\frac{c_n}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$c_1=\dfrac{a_1}{1\cdot2}=\dfrac12$ なので $\left\{c_n\right\}$ は初項 $\dfrac12$、公比 $\dfrac12$ の等比数列で`,
            },
            { k: "math", t: String.raw`c_n=\frac{1}{2^{n}}` },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`a_n=n\left(n+1\right)c_n=\frac{n\left(n+1\right)}{2^{n}}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`漸化式を分数のまま回すと、$n=1$ から $11$ までこの式と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$b_1=1$、$\dfrac{2n}{n+1}b_{n+1}-\dfrac{n+2}{n+1}b_n=\dfrac{n\left(n^{2}-4\right)}{2^{n-1}}$ のとき、$b_2,b_3,b_4$ を求める`,
          answer: String.raw`$b_2=-\dfrac32$、$b_3=-\dfrac32$、$b_4=\dfrac54$`,
          approach: String.raw`$b_{n+1}=\dfrac{n+2}{2n}b_n+\dfrac{\left(n+1\right)\left(n^{2}-4\right)}{2^{n}}$ に $n=1,2,3$ を入れる。`,
          blocks: [
            { k: "p", t: String.raw`両辺に $\dfrac{n+1}{2n}$ を掛けると` },
            {
              k: "math",
              t: String.raw`b_{n+1}=\frac{n+2}{2n}b_n+\frac{\left(n+1\right)\left(n^{2}-4\right)}{2^{n}}`,
            },
            { k: "p", t: String.raw`である。順に代入すると` },
            {
              k: "math",
              t: String.raw`b_2=\frac32\cdot1+\frac{2\cdot\left(-3\right)}{2}=\frac32-3=-\frac32`,
            },
            {
              k: "math",
              t: String.raw`b_3=\frac44\cdot\left(-\frac32\right)+\frac{3\cdot0}{4}=-\frac32`,
            },
            {
              k: "math",
              t: String.raw`b_4=\frac56\cdot\left(-\frac32\right)+\frac{4\cdot5}{8}=-\frac54+\frac52=\frac54`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=2$ のとき右辺の $n^{2}-4$ が $0$ になるので $b_3=b_2$ になる。(v) で効いてくる。`,
            },
          ],
          check: String.raw`分数のまま計算して $b_2=-\dfrac32$、$b_3=-\dfrac32$、$b_4=\dfrac54$ を確かめた。`,
        },
        {
          label: "(iii)",
          task: String.raw`$d_n=\dfrac{2^{n-1}}{n\left(n+1\right)}b_n$ とおくとき $d_{n+1}$ を $d_n$ で表し、$\left\{d_n\right\}$ の一般項を求める`,
          answer: String.raw`$d_{n+1}=d_n+n-2$、$d_n=\dfrac{n^{2}-5n+5}{2}$`,
          approach: String.raw`$b_{n+1}$ の式を入れる。第1項が $d_n$ に、第2項が $\dfrac{n^{2}-4}{n+2}=n-2$ になる。`,
          blocks: [
            { k: "p", t: String.raw`(ii) の形を使うと` },
            {
              k: "math",
              t: String.raw`d_{n+1}=\frac{2^{n}}{\left(n+1\right)\left(n+2\right)}\left\{\frac{n+2}{2n}b_n+\frac{\left(n+1\right)\left(n^{2}-4\right)}{2^{n}}\right\}`,
            },
            { k: "p", t: String.raw`である。第1項は` },
            {
              k: "math",
              t: String.raw`\frac{2^{n}\left(n+2\right)}{2n\left(n+1\right)\left(n+2\right)}b_n=\frac{2^{n-1}}{n\left(n+1\right)}b_n=d_n`,
            },
            { k: "p", t: String.raw`で、第2項は` },
            {
              k: "math",
              t: String.raw`\frac{\left(n+1\right)\left(n^{2}-4\right)}{\left(n+1\right)\left(n+2\right)}=\frac{\left(n-2\right)\left(n+2\right)}{n+2}=n-2`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`d_{n+1}=d_n+n-2` },
            { k: "p", t: String.raw`である。$d_1=\dfrac{2^{0}}{1\cdot2}b_1=\dfrac12$ なので、$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`d_n=\frac12+\sum_{k=1}^{n-1}\left(k-2\right)=\frac12+\frac{\left(n-1\right)n}{2}-2\left(n-1\right)`,
            },
            { k: "p", t: String.raw`である。通分すると` },
            {
              k: "math",
              t: String.raw`d_n=\frac{1+\left(n-1\right)\left(n-4\right)}{2}=\frac{n^{2}-5n+5}{2}`,
            },
            { k: "p", t: String.raw`で、$n=1$ でも $\dfrac{1-5+5}{2}=\dfrac12$ となり成り立つ。` },
          ],
          check: String.raw`$d_n$ を定義どおり計算すると、$n=1$ から $11$ まで $\dfrac{n^{2}-5n+5}2$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$\left\{b_n\right\}$ の一般項を求め、$b_{n+1}-b_n=\dfrac{P\left(n\right)}{2^{n+1}}$ をみたす $n$ の整式 $P\left(n\right)$ を求める`,
          answer: String.raw`$b_n=\dfrac{n\left(n+1\right)\left(n^{2}-5n+5\right)}{2^{n}}$、$P\left(n\right)=-\left(n+1\right)\left(n-2\right)\left(n^{2}-7n+1\right)$`,
          approach: String.raw`$b_n=\dfrac{n\left(n+1\right)}{2^{n-1}}d_n$。差は通分して $2^{n+1}$ にそろえる。`,
          blocks: [
            { k: "p", t: String.raw`$d_n$ の定義から` },
            {
              k: "math",
              t: String.raw`b_n=\frac{n\left(n+1\right)}{2^{n-1}}d_n=\frac{n\left(n+1\right)\left(n^{2}-5n+5\right)}{2^{n}}`,
            },
            { k: "p", t: String.raw`である。$n$ を $n+1$ にすると $\left(n+1\right)^{2}-5\left(n+1\right)+5=n^{2}-3n+1$ なので` },
            {
              k: "math",
              t: String.raw`b_{n+1}=\frac{\left(n+1\right)\left(n+2\right)\left(n^{2}-3n+1\right)}{2^{n+1}},\qquad b_n=\frac{2n\left(n+1\right)\left(n^{2}-5n+5\right)}{2^{n+1}}`,
            },
            { k: "p", t: String.raw`である。差をとると` },
            {
              k: "math",
              t: String.raw`P\left(n\right)=\left(n+1\right)\left\{\left(n+2\right)\left(n^{2}-3n+1\right)-2n\left(n^{2}-5n+5\right)\right\}`,
            },
            { k: "p", t: String.raw`である。中かっこを展開すると` },
            {
              k: "math",
              t: String.raw`\left(n^{3}-n^{2}-5n+2\right)-\left(2n^{3}-10n^{2}+10n\right)=-n^{3}+9n^{2}-15n+2`,
            },
            {
              k: "p",
              t: String.raw`である。$n=2$ を入れると $0$ になるので $n-2$ で割り切れて $-n^{3}+9n^{2}-15n+2=-\left(n-2\right)\left(n^{2}-7n+1\right)$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`P\left(n\right)=-\left(n+1\right)\left(n-2\right)\left(n^{2}-7n+1\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1$ から $10$ まで $b_{n+1}-b_n$ と $\dfrac{P\left(n\right)}{2^{n+1}}$ が分数のまま一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$b_n$ が最大になる自然数 $n$ を求める`,
          answer: String.raw`$n=7$`,
          approach: String.raw`$b_{n+1}-b_n$ の符号は $P\left(n\right)$ の符号。3つの因数の符号を追う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2^{n+1}>0$ なので $b_{n+1}-b_n$ の符号は $P\left(n\right)=-\left(n+1\right)\left(n-2\right)\left(n^{2}-7n+1\right)$ の符号である。自然数 $n$ では $n+1>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$n^{2}-7n+1=0$ の解は $\dfrac{7\pm\sqrt{45}}{2}=0.14\ldots,\ 6.85\ldots$ なので、$1\leqq n\leqq6$ で負、$n\geqq7$ で正である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=1$：$\left(n-2\right)<0$、$\left(n^{2}-7n+1\right)<0$ なので $P<0$。$b_2<b_1$`,
                String.raw`$n=2$：$P=0$ なので $b_3=b_2$`,
                String.raw`$3\leqq n\leqq6$：$\left(n-2\right)>0$、$\left(n^{2}-7n+1\right)<0$ なので $P>0$。増加`,
                String.raw`$n\geqq7$：$\left(n-2\right)>0$、$\left(n^{2}-7n+1\right)>0$ なので $P<0$。減少`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $b_1>b_2=b_3$ でいったん下がり、$b_3<b_4<\cdots<b_7$ と上がって、$b_7>b_8>\cdots$ と下がる。最大の候補は $b_1$ と $b_7$ だが`,
            },
            {
              k: "math",
              t: String.raw`b_1=1,\qquad b_7=\frac{7\cdot8\cdot\left(49-35+5\right)}{2^{7}}=\frac{56\cdot19}{128}=\frac{133}{16}=8.3125`,
            },
            { k: "p", t: String.raw`なので $b_7$ のほうが大きい。したがって $b_n$ が最大になるのは` },
            { k: "math", t: String.raw`n=7` },
            { k: "p", t: String.raw`のときである。` },
            {
              k: "note",
              t: String.raw`$b_n$ は単調ではなく、いったん負になってから増える。だから「増加から減少に変わる点」だけ見て終わりにせず、最初の $b_1$ とも比べる必要がある。`,
            },
          ],
          pitfalls: [
            String.raw`$n=2$ で $P=0$（$b_3=b_2$）になるのを見落とさない。符号が $-,0,+,\ldots,+,-$ と変わる。`,
          ],
          check: String.raw`$b_1$ から $b_{11}$ を分数で計算すると $1,-1.5,-1.5,1.25,4.6875,7.21875,8.3125,8.15625,7.207,5.908,4.576$ で、最大は $n=7$ だった。`,
        },
      ],
    },
  ],
};
