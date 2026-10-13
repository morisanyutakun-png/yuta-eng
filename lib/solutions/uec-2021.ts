import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2021年度（令和3年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 大学が公開している解答例も、他社の解答解説も読んでいない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\dfrac{\cos x}{1+\sin x}$ と、$x=\tfrac{\pi}4$ に関して対称な $C_2$。 */
const F21U = (x: number): number => Math.cos(x) / (1 + Math.sin(x));
const G21U = (x: number): number => F21U(Math.PI / 2 - x);

/** 第3問の2曲線。 */
const C1_21 = (x: number): number => x + 1 / x;
const C2_21 = (x: number): number => x + 5 / (9 * x);

export const uec2021: SolutionSet = {
  slug: "uec",
  year: 2021,
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
      topics: ["商の微分", "グラフの凹凸", "直線に関する対称移動", "回転体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f'=-\\tfrac1{1+\\sin x}$ と $f''=\\tfrac{\\cos x}{\\left(1+\\sin x\\right)^{2}}$ は $x=-1,0,1,2,4$ で数値微分と一致した",
          "$x=\\tfrac{\\pi}4$ で $C_1$ と $C_2$ の値がどちらも $0.4142136$（$\\sqrt2-1$）になった",
          "$\\left\\{f\\right\\}^{2}+2f'+1$ は $1001$ 点で $10^{-11}$ 以下、体積は数値 $1.078024169$ で $\\left(6-4\\sqrt2\\right)\\pi=1.078024169$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=\dfrac{\cos x}{1+\sin x}$（$-\dfrac{\pi}{2}<x<\dfrac{3\pi}{2}$）の $f'\left(x\right)$ と $f''\left(x\right)$ を求める`,
          answer: String.raw`$f'\left(x\right)=-\dfrac{1}{1+\sin x}$、$f''\left(x\right)=\dfrac{\cos x}{\left(1+\sin x\right)^{2}}$`,
          approach: String.raw`商の微分。分子で $\sin^{2}x+\cos^{2}x=1$ がまとまる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{-\sin x\left(1+\sin x\right)-\cos x\cdot\cos x}{\left(1+\sin x\right)^{2}}=\frac{-\sin x-\sin^{2}x-\cos^{2}x}{\left(1+\sin x\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。分子は $-\left(1+\sin x\right)$ なので約分できて` },
            { k: "math", t: String.raw`f'\left(x\right)=-\frac{1}{1+\sin x}` },
            { k: "p", t: String.raw`である。これをもう一度微分すると` },
            {
              k: "math",
              t: String.raw`f''\left(x\right)=\frac{\cos x}{\left(1+\sin x\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$f\left(x\right)=\dfrac{\cos x}{1+\sin x}=\tan\left(\dfrac{\pi}{4}-\dfrac x2\right)$ とも書ける。$f'=-\dfrac12\sec^{2}\left(\dfrac{\pi}{4}-\dfrac x2\right)$ からも同じ式になる。`,
            },
          ],
          check: String.raw`$x=-1,0,1,2,4$ で数値微分と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$y=f\left(x\right)$ のグラフの凹凸を調べ、$C_1$ の概形を述べる`,
          answer: String.raw`$-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ で下に凸、$\dfrac{\pi}{2}<x<\dfrac{3\pi}{2}$ で上に凸。変曲点は $\left(\dfrac{\pi}{2},0\right)$。つねに減少し、両端で $+\infty$ と $-\infty$`,
          approach: String.raw`$1+\sin x>0$ なので、$f''$ の符号は $\cos x$ の符号。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$-\dfrac{\pi}{2}<x<\dfrac{3\pi}{2}$ では $\sin x>-1$ なので $1+\sin x>0$ である。よって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$f'=-\dfrac{1}{1+\sin x}<0$ なので、$f$ はこの区間でつねに**減少**する`,
                String.raw`$f''$ の符号は $\cos x$ の符号と同じ。$-\dfrac{\pi}{2}<x<\dfrac{\pi}{2}$ で $f''>0$（下に凸）、$\dfrac{\pi}{2}<x<\dfrac{3\pi}{2}$ で $f''<0$（上に凸）`,
                String.raw`$x=\dfrac{\pi}{2}$ で凹凸が変わり、$f\left(\dfrac{\pi}{2}\right)=0$ なので変曲点は $\left(\dfrac{\pi}{2},0\right)$`,
              ],
            },
            {
              k: "p",
              t: String.raw`端のようすは $f\left(x\right)=\tan\left(\dfrac{\pi}{4}-\dfrac x2\right)$ と書くと見やすい。$x\to-\dfrac{\pi}{2}+0$ で偏角は $\dfrac{\pi}{2}$ に近づくので $f\to+\infty$、$x\to\dfrac{3\pi}{2}-0$ で偏角は $-\dfrac{\pi}{2}$ に近づくので $f\to-\infty$ である。`,
            },
            {
              k: "p",
              t: String.raw`つまり $C_1$ は、左端で $+\infty$ から下がり始め、$\left(0,1\right)$ を通り、$\left(\dfrac{\pi}{2},0\right)$ で凹凸を変えて、右端で $-\infty$ に落ちる単調減少の曲線である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "C1（太線）と、直線 x = π/4 に関して折り返した C2（細い線）。2つは x = π/4 で交わる。塗った部分が (v) で回転させる領域で、点線は対称の軸 x = π/4。",
                view: [-1.9, 4.9, -2.6, 2.9],
                items: [
                  { k: "seg", a: [Math.PI / 4, -2.6], b: [Math.PI / 4, 2.9], dash: true, faint: true },
                  { k: "fillBetween", top: F21U, bottom: G21U, from: 0, to: Math.PI / 4 },
                  { k: "curve", f: F21U, from: -1.37, to: 4.42 },
                  { k: "curve", f: G21U, from: -2.85, to: 2.94, faint: true },
                  { k: "dot", at: [Math.PI / 4, Math.SQRT2 - 1], label: "交点", place: "right" },
                  { k: "dot", at: [Math.PI / 2, 0], label: "変曲点", place: "below-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                  { k: "text", at: [Math.PI / 4, 2.6], label: "x = π/4", place: "right" },
                ],
              },
            },
          ],
          check: String.raw`$f''$ の符号は $x=0,1$ で正、$x=2,4$ で負になり、$\cos x$ の符号と合った。`,
        },
        {
          label: "(iii)",
          task: String.raw`直線 $x=\dfrac{\pi}{4}$ に関して $C_1$ と対称な曲線を $C_2$ とする。$C_1$ と $C_2$ の交点の座標を求める`,
          answer: String.raw`$\left(\dfrac{\pi}{4},\ \sqrt2-1\right)$`,
          approach: String.raw`$C_2$ は $y=f\left(\dfrac{\pi}{2}-x\right)$。$f$ は単調なので $x=\dfrac{\pi}{2}-x$ だけが解。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線 $x=\dfrac{\pi}{4}$ に関する対称移動は $x\mapsto\dfrac{\pi}{2}-x$ なので、$C_2$ の方程式は`,
            },
            {
              k: "math",
              t: String.raw`y=f\left(\frac{\pi}{2}-x\right)=\frac{\sin x}{1+\cos x}`,
            },
            {
              k: "p",
              t: String.raw`である。交点では $f\left(x\right)=f\left(\dfrac{\pi}{2}-x\right)$ だが、(ii) より $f$ は定義域で**狭義単調減少**なので1対1である。よって`,
            },
            {
              k: "math",
              t: String.raw`x=\frac{\pi}{2}-x,\qquad x=\frac{\pi}{4}`,
            },
            { k: "p", t: String.raw`だけが交点を与える。$y$ の値は` },
            {
              k: "math",
              t: String.raw`f\left(\frac{\pi}{4}\right)=\frac{\frac{\sqrt2}{2}}{1+\frac{\sqrt2}{2}}=\frac{\sqrt2}{2+\sqrt2}=\sqrt2-1`,
            },
            { k: "p", t: String.raw`である。よって交点は $\left(\dfrac{\pi}{4},\sqrt2-1\right)$ である。` },
            {
              k: "note",
              t: String.raw`$\tan\dfrac{\pi}{8}=\sqrt2-1$ である。$f\left(x\right)=\tan\left(\dfrac{\pi}{4}-\dfrac x2\right)$ に $x=\dfrac{\pi}{4}$ を入れると $\tan\dfrac{\pi}{8}$ になる。`,
            },
          ],
          check: String.raw`$x=\dfrac{\pi}4$ で $C_1$ と $C_2$ の値がどちらも $0.4142136$ になり、$\sqrt2-1=0.4142136$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$\left\{f\left(x\right)\right\}^{2}$ を $f'\left(x\right)$ の式で表し、$\left\{f\left(x\right)\right\}^{2}$ の不定積分を求める`,
          answer: String.raw`$\left\{f\left(x\right)\right\}^{2}=-2f'\left(x\right)-1$、$\displaystyle\int\left\{f\left(x\right)\right\}^{2}dx=-2f\left(x\right)-x+C$`,
          approach: String.raw`$f^{2}=\dfrac{1-\sin x}{1+\sin x}$ を $\dfrac{2}{1+\sin x}-1$ と直す。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\left\{f\left(x\right)\right\}^{2}=\frac{\cos^{2}x}{\left(1+\sin x\right)^{2}}=\frac{1-\sin^{2}x}{\left(1+\sin x\right)^{2}}=\frac{1-\sin x}{1+\sin x}`,
            },
            { k: "p", t: String.raw`である。分子を $1-\sin x=2-\left(1+\sin x\right)$ と書くと` },
            {
              k: "math",
              t: String.raw`\left\{f\left(x\right)\right\}^{2}=\frac{2}{1+\sin x}-1=-2f'\left(x\right)-1`,
            },
            { k: "p", t: String.raw`である（(i) より $\dfrac{1}{1+\sin x}=-f'$）。したがって` },
            {
              k: "math",
              t: String.raw`\int\left\{f\left(x\right)\right\}^{2}dx=-2f\left(x\right)-x+C=-\frac{2\cos x}{1+\sin x}-x+C`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{1-\sin x}{1+\sin x}$ をふつうに積分しようとすると $t=\tan\dfrac x2$ の置換などが要る。(i) の形に気づけば一瞬で終わる。`,
            },
          ],
          check: String.raw`$\left\{f\right\}^{2}+2f'+1$ は $1001$ 点で $10^{-11}$ 以下、原始関数の数値微分も $f^{2}$ と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$C_1$、$C_2$ および $y$ 軸で囲まれた部分を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\left(6-4\sqrt2\right)\pi$`,
          approach: String.raw`$0\leqq x\leqq\dfrac{\pi}{4}$ で上が $C_1$、下が $C_2$。どちらも $0$ 以上なので円環。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=0$ では $C_1$ が $y=1$、$C_2$ が $y=0$ である。(iii) より2曲線は $x=\dfrac{\pi}{4}$ で交わるので、囲まれた部分は $0\leqq x\leqq\dfrac{\pi}{4}$ で $g\left(x\right)\leqq y\leqq f\left(x\right)$（$g\left(x\right)=f\left(\dfrac{\pi}{2}-x\right)$）の部分である。ここで $f\geqq g\geqq0$ なので、回転体の断面は円環で`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int_{0}^{\frac{\pi}{4}}\left\{f\left(x\right)^{2}-g\left(x\right)^{2}\right\}dx`,
            },
            { k: "p", t: String.raw`である。(iv) より` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{4}}f^{2}dx=\left[-2f\left(x\right)-x\right]_{0}^{\frac{\pi}{4}}=\left\{-2\left(\sqrt2-1\right)-\frac{\pi}{4}\right\}-\left(-2\right)=4-2\sqrt2-\frac{\pi}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。また $g\left(x\right)=f\left(\dfrac{\pi}{2}-x\right)$ なので、$u=\dfrac{\pi}{2}-x$ と置換すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{4}}g^{2}dx=\int_{\frac{\pi}{4}}^{\frac{\pi}{2}}f^{2}du=\left[-2f-u\right]_{\frac{\pi}{4}}^{\frac{\pi}{2}}=-\frac{\pi}{2}+2\left(\sqrt2-1\right)+\frac{\pi}{4}`,
            },
            { k: "p", t: String.raw`すなわち $2\sqrt2-2-\dfrac{\pi}{4}$ である。引き算すると $\dfrac{\pi}{4}$ が消えて` },
            {
              k: "math",
              t: String.raw`V=\pi\left\{\left(4-2\sqrt2\right)-\left(2\sqrt2-2\right)\right\}=\left(6-4\sqrt2\right)\pi`,
            },
            { k: "p", t: String.raw`である（$1.078\ldots$）。` },
          ],
          pitfalls: [
            String.raw`$C_2$ の式を $y$ について解き直す必要はない。$g\left(x\right)=f\left(\dfrac{\pi}{2}-x\right)$ のまま置換すれば (iv) がそのまま使える。`,
          ],
          check: String.raw`数値積分すると $1.078024169$ で、$\left(6-4\sqrt2\right)\pi=1.078024169$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["長方形の面積の最大", "距離の2乗の極値", "半円が入る条件", "大小の評価"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$k=1,2,5$ で $g\\left(t\\right)=2te^{-kt^{2}}$ の最大を走査すると、$t=\\tfrac1{\\sqrt{2k}}$ で $S_1=\\sqrt{\\tfrac2{ke}}$ と一致した",
          "$h\\left(s\\right)=s^{2}+e^{-2ks^{2}}$ の導関数は $s=0,\\pm\\sqrt{\\tfrac{\\log2k}{2k}}$ で $0$ になり、$h$ の極小値は $\\tfrac{\\log2k+1}{2k}$ と一致した",
          "$r=\\sqrt{\\tfrac{\\log2k+1}{2k}}$ では半円が $D$ に入り、$1.001$ 倍にするとはみ出した。$k=\\tfrac{4^{N}}e$ で $2S_2<S_1$ となるのは $N\\geqq5$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$k\geqq1$、$f\left(x\right)=e^{-kx^{2}}$ とする。$4$ 点 $\left(\pm t,0\right)$、$\left(\pm t,f\left(t\right)\right)$（$t>0$）を頂点とする長方形の面積を $g\left(t\right)$ とするとき、$g'\left(t\right)$ と $g\left(t\right)$ の最大値 $S_1$ を求める`,
          answer: String.raw`$g'\left(t\right)=2e^{-kt^{2}}\left(1-2kt^{2}\right)$、$S_1=\sqrt{\dfrac{2}{ke}}$`,
          approach: String.raw`$g\left(t\right)=2te^{-kt^{2}}$。積の微分。`,
          blocks: [
            { k: "p", t: String.raw`長方形の横は $2t$、縦は $f\left(t\right)=e^{-kt^{2}}$ なので $g\left(t\right)=2te^{-kt^{2}}$ である。` },
            {
              k: "math",
              t: String.raw`g'\left(t\right)=2e^{-kt^{2}}+2t\left(-2kt\right)e^{-kt^{2}}=2e^{-kt^{2}}\left(1-2kt^{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$e^{-kt^{2}}>0$ なので符号は $1-2kt^{2}$ で決まり、$t=\dfrac{1}{\sqrt{2k}}$ の前後で正から負に変わる。よってここで最大になり`,
            },
            {
              k: "math",
              t: String.raw`S_1=g\left(\frac{1}{\sqrt{2k}}\right)=\frac{2}{\sqrt{2k}}e^{-\frac12}=\sqrt{\frac2k}\cdot\frac{1}{\sqrt e}=\sqrt{\frac{2}{ke}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$k=1,2,5$ で走査すると、最大は $t=\dfrac1{\sqrt{2k}}$ で $\sqrt{\dfrac2{ke}}$ と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$h\left(s\right)=\mathrm{OP}^{2}$（$\mathrm{P}\left(s,f\left(s\right)\right)$）が極値をとる $s$ をすべて求める`,
          answer: String.raw`$s=0,\ \pm\sqrt{\dfrac{\log2k}{2k}}$`,
          approach: String.raw`$h=s^{2}+e^{-2ks^{2}}$。$h'=2s\left(1-2ke^{-2ks^{2}}\right)$ と因数分解する。`,
          blocks: [
            { k: "math", t: String.raw`h\left(s\right)=s^{2}+e^{-2ks^{2}}` },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`h'\left(s\right)=2s-4kse^{-2ks^{2}}=2s\left(1-2ke^{-2ks^{2}}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\varphi\left(s\right)=1-2ke^{-2ks^{2}}$ とおくと、$\varphi$ は偶関数で $\left|s\right|$ について増加し、$\varphi\left(0\right)=1-2k\leqq-1<0$（$k\geqq1$）、$\left|s\right|\to\infty$ で $\varphi\to1>0$ である。よって $\varphi=0$ となる正の $s$ がただ1つあり、それは`,
            },
            {
              k: "math",
              t: String.raw`e^{-2ks^{2}}=\frac{1}{2k},\qquad s^{2}=\frac{\log2k}{2k},\qquad s_0=\sqrt{\frac{\log2k}{2k}}`,
            },
            { k: "p", t: String.raw`である（$k\geqq1$ より $\log2k>0$）。符号を表にすると` },
            {
              k: "steps",
              items: [
                String.raw`$s<-s_0$：$2s<0$、$\varphi>0$ なので $h'<0$`,
                String.raw`$-s_0<s<0$：$2s<0$、$\varphi<0$ なので $h'>0$`,
                String.raw`$0<s<s_0$：$2s>0$、$\varphi<0$ なので $h'<0$`,
                String.raw`$s>s_0$：$h'>0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`となり、$s=-s_0$ で極小、$s=0$ で極大、$s=s_0$ で極小である。したがって極値をとるのは`,
            },
            {
              k: "math",
              t: String.raw`s=0,\qquad s=\pm\sqrt{\frac{\log2k}{2k}}`,
            },
            { k: "p", t: String.raw`である。極小値は` },
            {
              k: "math",
              t: String.raw`h\left(\pm s_0\right)=\frac{\log2k}{2k}+\frac{1}{2k}=\frac{\log2k+1}{2k}`,
            },
            { k: "p", t: String.raw`で、極大値は $h\left(0\right)=1$ である。` },
          ],
          check: String.raw`$k=1,2,5$ で $h'$ が $s=0,\pm s_0$ で $0$ になり、極小値も式と一致した。`,
        },
        {
          label: "(iii)",
          task: String.raw`$D\colon0\leqq y\leqq f\left(x\right)$、$E_r\colon0\leqq y\leqq\sqrt{r^{2}-x^{2}}$ とする。$E_r\subset D$ となるように $r$ を動かすとき、$E_r$ の面積の最大値 $S_2$ を求める`,
          answer: String.raw`$S_2=\dfrac{\pi\left(1+\log2k\right)}{4k}$`,
          approach: String.raw`$E_r\subset D$ は「$\left|x\right|\leqq r$ で $r^{2}\leqq x^{2}+f\left(x\right)^{2}=h\left(x\right)$」と同じ。(ii) の極小値が効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$E_r$ は原点中心・半径 $r$ の上半円である。$E_r\subset D$ は、$\left|x\right|\leqq r$ のすべてで $\sqrt{r^{2}-x^{2}}\leqq f\left(x\right)$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`r^{2}\leqq x^{2}+f\left(x\right)^{2}=h\left(x\right)\qquad\left(\left|x\right|\leqq r\right)`,
            },
            { k: "p", t: String.raw`と同値である。$s_0=\sqrt{\dfrac{\log2k}{2k}}$ とおき、$M=h\left(s_0\right)=\dfrac{\log2k+1}{2k}$ とする。` },
            {
              k: "steps",
              items: [
                String.raw`$r\leqq s_0$ のとき：$h$ は $\left[0,r\right]$ で減少するので最小は $h\left(r\right)=r^{2}+e^{-2kr^{2}}>r^{2}$。条件はつねに成り立つ`,
                String.raw`$r>s_0$ のとき：最小は $h\left(s_0\right)=M$ なので、条件は $r^{2}\leqq M$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$s_0^{2}=\dfrac{\log2k}{2k}<M$ なので $s_0<\sqrt M$ であり、条件を満たす $r$ の最大値は $\sqrt M$ である。このとき面積は`,
            },
            {
              k: "math",
              t: String.raw`S_2=\frac{\pi}{2}M=\frac{\pi\left(\log2k+1\right)}{4k}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$r=\sqrt M$ のとき、半円は $x=\pm s_0$ のところで曲線 $y=f\left(x\right)$ に接する。$h$ の極小が「原点から曲線までの最短距離」を与えるからである。`,
            },
          ],
          pitfalls: [
            String.raw`「$r$ を大きくすると条件が崩れる」のは、$h$ の最小を $x=\pm s_0$ でとるため。$r\leqq s_0$ の場合も忘れずに確かめる。`,
          ],
          check: String.raw`$k=1,2,5$ で $r=\sqrt M$ なら半円が $D$ に入り、$1.001$ 倍にするとはみ出した。`,
        },
        {
          label: "(iv)",
          task: String.raw`$k=\dfrac{4^{N}}{e}$（$N=1,2,3,\ldots$）のとき、$2S_2<S_1$ となる最小の $N$ を求める。必要なら $4<\dfrac{e\pi\log2}{\sqrt2}<5$ を用いてよい`,
          answer: String.raw`$N=5$`,
          approach: String.raw`$k=\dfrac{4^{N}}{e}$ を入れると $1+\log2k=\left(2N+1\right)\log2$、$\sqrt{\dfrac2{ke}}=\dfrac{\sqrt2}{2^{N}}$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$k=\dfrac{4^{N}}{e}$ のとき $2k=\dfrac{2\cdot4^{N}}{e}$ なので` },
            {
              k: "math",
              t: String.raw`\log2k=\log2+2N\log2-1,\qquad1+\log2k=\left(2N+1\right)\log2`,
            },
            { k: "p", t: String.raw`である。また $ke=4^{N}$ だから` },
            {
              k: "math",
              t: String.raw`S_1=\sqrt{\frac{2}{ke}}=\frac{\sqrt2}{2^{N}},\qquad2S_2=\frac{\pi\left(1+\log2k\right)}{2k}=\frac{\pi e\left(2N+1\right)\log2}{2\cdot4^{N}}`,
            },
            { k: "p", t: String.raw`である。$2S_2<S_1$ は` },
            {
              k: "math",
              t: String.raw`\frac{\pi e\left(2N+1\right)\log2}{2\cdot4^{N}}<\frac{\sqrt2}{2^{N}}`,
            },
            { k: "p", t: String.raw`すなわち、両辺に $\dfrac{2\cdot4^{N}}{\sqrt2\cdot2^{N}}>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`\frac{e\pi\log2}{\sqrt2}\left(2N+1\right)<2^{N+1}`,
            },
            { k: "p", t: String.raw`となる。$A=\dfrac{e\pi\log2}{\sqrt2}$ とおくと $4<A<5$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$N=4$：左辺 $=9A>9\times4=36>32=2^{5}$ なので成り立たない`,
                String.raw`$N=5$：左辺 $=11A<11\times5=55<64=2^{6}$ なので成り立つ`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$N\leqq3$ でも同様に $\left(2N+1\right)A\geqq4\left(2N+1\right)\geqq2^{N+1}$（$N=1$ で $12>4$、$N=2$ で $20>8$、$N=3$ で $28>16$）なので成り立たない。したがって最小の $N$ は`,
            },
            { k: "math", t: String.raw`N=5` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$A=4.1855\ldots$ なので、$N=4$ では $9A=37.6\ldots>32$、$N=5$ では $11A=46.0\ldots<64$ と、どちらもぎりぎりではない。与えられた評価 $4<A<5$ で足りる。`,
            },
          ],
          check: String.raw`$N=1$ から $8$ まで $2S_2$ と $S_1$ を計算すると、$2S_2<S_1$ になるのは $N\geqq5$ のときだけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分積分",
      topics: ["接線の方程式", "外から引いた2本の接線", "ベクトルによる三角形の面積", "曲線と直線で囲む面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$t=0.5,1,2.5$ で $s=\\tfrac{3t}5,3t$ の接線がどちらも $\\mathrm{P}\\left(t,g\\left(t\\right)\\right)$ を通った",
          "三角形の面積はどの $t$ でも $1.066666667$ で $\\tfrac{16}{15}$ と一致した",
          "直線 $\\mathrm{QR}$ の傾きと切片は $1-\\tfrac5{9t^{2}}$ と $\\tfrac2t$ に一致し、囲む面積はどの $t$ でも $0.790562088$（$\\tfrac{12}5-\\log5$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f\left(x\right)=x+\dfrac1x$（$x>0$）、$C_1\colon y=f\left(x\right)$ とする。$C_1$ 上の点 $\left(s,f\left(s\right)\right)$ における接線 $\ell$ の方程式を求める`,
          answer: String.raw`$\ell\colon y=\left(1-\dfrac{1}{s^{2}}\right)x+\dfrac2s$`,
          approach: String.raw`$f'\left(x\right)=1-\dfrac1{x^{2}}$。代入して整理する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`y=\left(s+\frac1s\right)+\left(1-\frac{1}{s^{2}}\right)\left(x-s\right)`,
            },
            { k: "p", t: String.raw`である。定数項は` },
            {
              k: "math",
              t: String.raw`s+\frac1s-s+\frac1s=\frac2s`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\ell\colon y=\left(1-\frac{1}{s^{2}}\right)x+\frac2s`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$s=0.6,3$ などで接点を通り傾きが一致することを確かめた。`,
        },
        {
          label: "(ii)",
          task: String.raw`$g\left(x\right)=x+\dfrac{5}{9x}$、$C_2\colon y=g\left(x\right)$ とする。$C_2$ 上の点 $\mathrm{P}\left(t,g\left(t\right)\right)$（$t>0$）から $C_1$ へ引いた2本の接線の接点を、$x$ 座標の小さいほうから $\mathrm{Q},\mathrm{R}$ とするとき、$x_1\left(t\right),x_2\left(t\right)$ を求める`,
          answer: String.raw`$x_1\left(t\right)=\dfrac{3t}{5}$、$x_2\left(t\right)=3t$`,
          approach: String.raw`$\ell$ が $\mathrm{P}$ を通る条件を $s$ の2次方程式にする。`,
          blocks: [
            { k: "p", t: String.raw`$\ell$ が $\mathrm{P}\left(t,t+\dfrac{5}{9t}\right)$ を通る条件は` },
            {
              k: "math",
              t: String.raw`t+\frac{5}{9t}=\left(1-\frac{1}{s^{2}}\right)t+\frac2s,\qquad\frac{5}{9t}=-\frac{t}{s^{2}}+\frac2s`,
            },
            { k: "p", t: String.raw`である。両辺に $9ts^{2}>0$ を掛けると` },
            {
              k: "math",
              t: String.raw`5s^{2}=-9t^{2}+18ts,\qquad5s^{2}-18ts+9t^{2}=0`,
            },
            { k: "p", t: String.raw`となる。$s$ について解くと` },
            {
              k: "math",
              t: String.raw`s=\frac{18t\pm\sqrt{324t^{2}-180t^{2}}}{10}=\frac{18t\pm12t}{10}=3t,\ \frac{3t}{5}`,
            },
            {
              k: "p",
              t: String.raw`である。どちらも正なので接点は2つあり、$x$ 座標の小さいほうから`,
            },
            {
              k: "math",
              t: String.raw`x_1\left(t\right)=\frac{3t}{5},\qquad x_2\left(t\right)=3t`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=0.5,1,2.5$ でどちらの接線も $\mathrm{P}$ を通った。`,
        },
        {
          label: "(iii)",
          task: String.raw`$\overrightarrow{\mathrm{PQ}}$ と $\overrightarrow{\mathrm{PR}}$ を $t$ で表し、三角形 $\mathrm{PQR}$ の面積 $S_1\left(t\right)$ を求める`,
          answer: String.raw`$\overrightarrow{\mathrm{PQ}}=\left(-\dfrac{2t}{5},\ -\dfrac{2t}{5}+\dfrac{10}{9t}\right)$、$\overrightarrow{\mathrm{PR}}=\left(2t,\ 2t-\dfrac{2}{9t}\right)$、$S_1\left(t\right)=\dfrac{16}{15}$（$t$ によらない）`,
          approach: String.raw`成分を計算して $\dfrac12\left|x_1y_2-x_2y_1\right|$。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{Q}\left(\dfrac{3t}{5},\dfrac{3t}{5}+\dfrac{5}{3t}\right)$、$\mathrm{R}\left(3t,3t+\dfrac{1}{3t}\right)$、$\mathrm{P}\left(t,t+\dfrac{5}{9t}\right)$ なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=\left(-\frac{2t}{5},\ -\frac{2t}{5}+\frac{10}{9t}\right),\qquad\overrightarrow{\mathrm{PR}}=\left(2t,\ 2t-\frac{2}{9t}\right)`,
            },
            { k: "p", t: String.raw`である（$\dfrac{5}{3t}-\dfrac{5}{9t}=\dfrac{10}{9t}$、$\dfrac{1}{3t}-\dfrac{5}{9t}=-\dfrac{2}{9t}$）。面積は` },
            {
              k: "math",
              t: String.raw`S_1=\frac12\left|\left(-\frac{2t}{5}\right)\left(2t-\frac{2}{9t}\right)-2t\left(-\frac{2t}{5}+\frac{10}{9t}\right)\right|`,
            },
            { k: "p", t: String.raw`である。中身は` },
            {
              k: "math",
              t: String.raw`\left(-\frac{4t^{2}}{5}+\frac{4}{45}\right)-\left(-\frac{4t^{2}}{5}+\frac{20}{9}\right)=\frac{4}{45}-\frac{100}{45}=-\frac{32}{15}`,
            },
            { k: "p", t: String.raw`で、$t^{2}$ の項が消える。よって` },
            { k: "math", t: String.raw`S_1\left(t\right)=\frac12\cdot\frac{32}{15}=\frac{16}{15}` },
            { k: "p", t: String.raw`で、$t$ によらない一定の値である。` },
          ],
          check: String.raw`$t=0.5,1,2.5$ のどれでも $1.066666667$ になり、$\dfrac{16}{15}=1.066666667$ と一致した。`,
        },
        {
          label: "(iv)",
          task: String.raw`直線 $\mathrm{QR}$ の方程式を求める`,
          answer: String.raw`$y=\left(1-\dfrac{5}{9t^{2}}\right)x+\dfrac2t$`,
          approach: String.raw`2点の傾きを計算する。$\dfrac{12t}{5}$ が共通因数になる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{R}$ と $\mathrm{Q}$ の差は` },
            {
              k: "math",
              t: String.raw`x_2-x_1=\frac{12t}{5},\qquad y_2-y_1=\frac{12t}{5}+\frac{1}{3t}-\frac{5}{3t}=\frac{12t}{5}-\frac{4}{3t}`,
            },
            { k: "p", t: String.raw`なので、傾きは` },
            {
              k: "math",
              t: String.raw`\frac{\frac{12t}{5}-\frac{4}{3t}}{\frac{12t}{5}}=1-\frac{4}{3t}\cdot\frac{5}{12t}=1-\frac{5}{9t^{2}}`,
            },
            { k: "p", t: String.raw`である。$y$ 切片は $\mathrm{Q}$ を代入して` },
            {
              k: "math",
              t: String.raw`\left(\frac{3t}{5}+\frac{5}{3t}\right)-\left(1-\frac{5}{9t^{2}}\right)\frac{3t}{5}=\frac{5}{3t}+\frac{1}{3t}=\frac2t`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{QR}\colon y=\left(1-\frac{5}{9t^{2}}\right)x+\frac2t`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(i) の接線は $y=\left(1-\dfrac{1}{s^{2}}\right)x+\dfrac2s$ だった。$\mathrm{QR}$ は $y$ 切片が $\dfrac2t$ で同じ形をしている。これは $\mathrm{P}$ から引いた2接点を結ぶ直線（極線）の性質である。`,
            },
          ],
          check: String.raw`$t=0.5,1,2.5$ で2点から求めた傾き・切片がこの式と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$C_1$ と直線 $\mathrm{QR}$ とで囲まれた部分の面積 $S_2\left(t\right)$ を求める`,
          answer: String.raw`$S_2\left(t\right)=\dfrac{12}{5}-\log5$（$t$ によらない）`,
          approach: String.raw`$\dfrac{3t}{5}\leqq x\leqq3t$ で直線が上。差を積分すると $\log$ の部分がきれいにまとまる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{QR}$ は $C_1$ と $x=\dfrac{3t}{5},3t$ で接するように交わり、その間では直線が上にある。差は`,
            },
            {
              k: "math",
              t: String.raw`\left\{\left(1-\frac{5}{9t^{2}}\right)x+\frac2t\right\}-\left(x+\frac1x\right)=-\frac{5x}{9t^{2}}+\frac2t-\frac1x`,
            },
            { k: "p", t: String.raw`である。原始関数は` },
            {
              k: "math",
              t: String.raw`-\frac{5x^{2}}{18t^{2}}+\frac{2x}{t}-\log x`,
            },
            { k: "p", t: String.raw`である。$x=3t$ では` },
            {
              k: "math",
              t: String.raw`-\frac{5\cdot9t^{2}}{18t^{2}}+6-\log3t=\frac72-\log3t`,
            },
            { k: "p", t: String.raw`であり、$x=\dfrac{3t}{5}$ では` },
            {
              k: "math",
              t: String.raw`-\frac{5}{18t^{2}}\cdot\frac{9t^{2}}{25}+\frac65-\log\frac{3t}{5}=-\frac1{10}+\frac65-\log\frac{3t}{5}=\frac{11}{10}-\log\frac{3t}{5}`,
            },
            { k: "p", t: String.raw`である。差をとると $\log$ の中の $3t$ が消えて` },
            {
              k: "math",
              t: String.raw`S_2=\frac72-\frac{11}{10}-\log3t+\log\frac{3t}{5}=\frac{12}{5}-\log5`,
            },
            { k: "p", t: String.raw`である（$0.7906\ldots$）。これも $t$ によらない。` },
            {
              k: "figure",
              fig: {
                caption:
                  "C1（下に凸の曲線）と C2（その下にある曲線）。P は C2 上の点、Q と R は P から C1 に引いた2本の接線の接点。塗った部分が (v) の面積で、図は t = 1 のとき。",
                view: [-0.3, 4.3, -0.5, 4.6],
                items: [
                  {
                    k: "fillBetween",
                    top: (x: number) => (1 - 5 / 9) * x + 2,
                    bottom: C1_21,
                    from: 0.6,
                    to: 3,
                  },
                  { k: "curve", f: C1_21, from: 0.24, to: 4.3 },
                  { k: "curve", f: C2_21, from: 0.14, to: 4.3, faint: true },
                  { k: "seg", a: [0.2, (1 - 5 / 9) * 0.2 + 2], b: [4.2, (1 - 5 / 9) * 4.2 + 2] },
                  { k: "seg", a: [0.2, (1 - 1 / 0.36) * 0.2 + 2 / 0.6], b: [4.2, (1 - 1 / 0.36) * 4.2 + 2 / 0.6], dash: true, faint: true },
                  { k: "seg", a: [0.2, (1 - 1 / 9) * 0.2 + 2 / 3], b: [4.2, (1 - 1 / 9) * 4.2 + 2 / 3], dash: true, faint: true },
                  { k: "dot", at: [1, C2_21(1)], label: "P", place: "below-right" },
                  { k: "dot", at: [0.6, C1_21(0.6)], label: "Q", place: "left" },
                  { k: "dot", at: [3, C1_21(3)], label: "R", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\log3t-\log\dfrac{3t}{5}=\log5$ と、$t$ がきれいに消える。消えなければ計算を疑う。`,
          ],
          check: String.raw`$t=0.5,1,2.5$ のどれでも $0.790562088$ になり、$\dfrac{12}5-\log5=0.790562088$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列・整数",
      topics: ["3進法との対応", "桁ごとの個数と和", "何番目かを数える", "等比数列の和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$6$ 桁までを全列挙して並べると $1,4,7,11,14,17,41,\\ldots$ となり、$m$ 桁の個数は $3^{m}$、$m$ 桁以下は $\\tfrac{3^{m+1}-3}2$ と一致した",
          "$m$ 桁すべての和は $m=1,2,3,4$ で $12,396,11988,359964$ となり式と一致した。$a_{100}=7171$",
          "$P_m$ の順位 $I\\left(m\\right)=2\\cdot3^{m-1}+1$、$L\\left(m\\right)=\\tfrac{7\\cdot3^{m-1}-1}2$、$M\\left(k\\right)=\\tfrac{5\\left(9^{k}-1\\right)}4$ がすべて一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$1,4,7$ の3つの数字だけで表せる正の整数を小さい順に並べた数列を $\left\{a_n\right\}$ とする。$m$ 桁の整数の個数 $t\left(m\right)$ と、$m$ 桁以下の整数の個数 $T\left(m\right)$ を $m$ で表す`,
          answer: String.raw`$t\left(m\right)=3^{m}$、$T\left(m\right)=\dfrac{3^{m+1}-3}{2}$`,
          approach: String.raw`各桁が $1,4,7$ の3通り。先頭も $0$ にならないので制限なし。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$m$ 桁の各位が $1,4,7$ のどれかで、どれを選んでも先頭が $0$ になることはない。よって`,
            },
            { k: "math", t: String.raw`t\left(m\right)=3^{m}` },
            { k: "p", t: String.raw`である。$m$ 桁以下はこれを $1$ 桁から $m$ 桁まで足して` },
            {
              k: "math",
              t: String.raw`T\left(m\right)=\sum_{j=1}^{m}3^{j}=\frac{3\left(3^{m}-1\right)}{2}=\frac{3^{m+1}-3}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$1\to0$、$4\to1$、$7\to2$ と読みかえると、$m$ 桁の数は $m$ 桁の3進数（先頭が $0$ でもよい）と1対1に対応する。小さい順に並べる順序も3進数の大小と一致する。これが全体のかぎ。`,
            },
          ],
          check: String.raw`$6$ 桁までを全列挙すると、$m=1,2,3,4$ で個数は $3,9,27,81$、累計は $3,12,39,120$ となり式と一致した。`,
        },
        {
          label: "(ii)",
          task: String.raw`$m$ 桁の整数すべての和 $S\left(m\right)$ を $m$ で表す`,
          answer: String.raw`$S\left(m\right)=\dfrac{4\cdot3^{m-1}\left(10^{m}-1\right)}{3}$`,
          approach: String.raw`各位に $1,4,7$ がちょうど $3^{m-1}$ 回ずつ現れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`ある1つの位に注目すると、そこが $1,4,7$ になるものがそれぞれ $3^{m-1}$ 個ずつある。したがって、その位の数字の総和は`,
            },
            {
              k: "math",
              t: String.raw`3^{m-1}\left(1+4+7\right)=12\cdot3^{m-1}`,
            },
            { k: "p", t: String.raw`である。位の重みは $10^{m-1},10^{m-2},\ldots,1$ なので` },
            {
              k: "math",
              t: String.raw`S\left(m\right)=12\cdot3^{m-1}\left(10^{m-1}+\cdots+1\right)=12\cdot3^{m-1}\cdot\frac{10^{m}-1}{9}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`S\left(m\right)=\frac{4\cdot3^{m-1}\left(10^{m}-1\right)}{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$m=1,2,3,4$ で全列挙の和は $12,396,11988,359964$ となり、式と一致した。`,
        },
        {
          label: "(iii)",
          task: String.raw`第 $100$ 項 $a_{100}$ を求める`,
          answer: String.raw`$a_{100}=7171$`,
          approach: String.raw`$T\left(3\right)=39$、$T\left(4\right)=120$ なので $4$ 桁の $61$ 番目。3進法に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$T\left(3\right)=\dfrac{81-3}{2}=39$、$T\left(4\right)=\dfrac{243-3}{2}=120$ なので、$a_{100}$ は4桁で、4桁のなかの $100-39=61$ 番目である。`,
            },
            {
              k: "p",
              t: String.raw`(i) の対応（$1\to0,\ 4\to1,\ 7\to2$）で、$j$ 番目の4桁の数は $j-1$ を4桁の3進数で書いたものに対応する。$61-1=60$ を3進法にすると`,
            },
            {
              k: "math",
              t: String.raw`60=2\cdot27+0\cdot9+2\cdot3+0=\left(2020\right)_{3}`,
            },
            { k: "p", t: String.raw`である。$2\to7,\ 0\to1$ と戻すと` },
            { k: "math", t: String.raw`a_{100}=7171` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`全列挙して並べた $100$ 番目は $7171$ だった。`,
        },
        {
          label: "(iv)",
          task: String.raw`$m\geqq2$ とし、最高位が $7$ でそれ以外がすべて $1$ の $m$ 桁の整数を $P_m$ とする。$m$ 桁の整数のなかで $P_m$ が $I\left(m\right)$ 番目、数列全体で第 $L\left(m\right)$ 項であるとき、$I\left(m\right)$ と $L\left(m\right)$ を求める`,
          answer: String.raw`$I\left(m\right)=2\cdot3^{m-1}+1$、$L\left(m\right)=\dfrac{7\cdot3^{m-1}-1}{2}$`,
          approach: String.raw`$P_m$ に対応する3進数は $\left(200\cdots0\right)_3=2\cdot3^{m-1}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P_m=71\cdots1$ を (i) の対応で読みかえると、3進数 $\left(20\cdots0\right)_{3}=2\cdot3^{m-1}$ になる。$j$ 番目が $j-1$ に対応するので`,
            },
            { k: "math", t: String.raw`I\left(m\right)=2\cdot3^{m-1}+1` },
            { k: "p", t: String.raw`である。数列全体での番号は、$m-1$ 桁以下の個数を足して` },
            {
              k: "math",
              t: String.raw`L\left(m\right)=T\left(m-1\right)+I\left(m\right)=\frac{3^{m}-3}{2}+2\cdot3^{m-1}+1`,
            },
            { k: "p", t: String.raw`である。$3^{m}=3\cdot3^{m-1}$ として通分すると` },
            {
              k: "math",
              t: String.raw`L\left(m\right)=\frac{3\cdot3^{m-1}-3+4\cdot3^{m-1}+2}{2}=\frac{7\cdot3^{m-1}-1}{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$m=2,3,4,5$ で全列挙の順位は $I=7,19,55,163$、$L=10,31,94,283$ となり式と一致した。`,
        },
        {
          label: "(v)",
          task: String.raw`$7$ と $1$ が $k$ 回交互に並ぶ $2k$ 桁の整数 $7171\cdots71$ が数列の第 $M\left(k\right)$ 項であるとき、$M\left(k\right)$ を $k$ で表す`,
          answer: String.raw`$M\left(k\right)=\dfrac{5\left(9^{k}-1\right)}{4}$`,
          approach: String.raw`対応する3進数は $\left(2020\cdots20\right)_3$。$9$ を公比とする等比数列の和になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$7171\cdots71$（$2k$ 桁）を読みかえると3進数 $\left(2020\cdots20\right)_{3}$ になる。$2$ が $3^{2k-1},3^{2k-3},\ldots,3^{1}$ の位に並ぶので、その値は`,
            },
            {
              k: "math",
              t: String.raw`2\left(3^{2k-1}+3^{2k-3}+\cdots+3\right)=6\left(9^{k-1}+9^{k-2}+\cdots+1\right)=6\cdot\frac{9^{k}-1}{8}=\frac{3\left(9^{k}-1\right)}{4}`,
            },
            { k: "p", t: String.raw`である。よって $2k$ 桁のなかでの順位は $\dfrac{3\left(9^{k}-1\right)}{4}+1$ である。全体では` },
            {
              k: "math",
              t: String.raw`M\left(k\right)=T\left(2k-1\right)+\frac{3\left(9^{k}-1\right)}{4}+1=\frac{9^{k}-3}{2}+\frac{3\left(9^{k}-1\right)}{4}+1`,
            },
            { k: "p", t: String.raw`である（$T\left(2k-1\right)=\dfrac{3^{2k}-3}{2}=\dfrac{9^{k}-3}{2}$）。通分すると` },
            {
              k: "math",
              t: String.raw`M\left(k\right)=\frac{2\left(9^{k}-3\right)+3\left(9^{k}-1\right)+4}{4}=\frac{5\cdot9^{k}-5}{4}=\frac{5\left(9^{k}-1\right)}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k=2$ のとき $M\left(2\right)=\dfrac{5\cdot80}{4}=100$ で、(iii) の $a_{100}=7171$ と合う。`,
            },
          ],
          check: String.raw`$k=1,2,3$ で全列挙の順位は $10,100,910$ となり、式の値と一致した。`,
        },
      ],
    },
  ],
};
