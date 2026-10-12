import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2020年度（令和2年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の曲線 y = e^{-x} - e^{-2x}。 */
const CV20 = (x: number): number => Math.exp(-x) - Math.exp(-2 * x);

/** 第1問の a = g(u)（u = e^{-t}）。接点を u で表したときの通過点の x 座標。 */
const G20 = (u: number): number => -Math.log(u) + (u - 1) / (2 * u - 1);

export const kyudaiRikei2020: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["接線", "通過範囲", "増減", "値域"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$t$ を $-4$ から $4$ まで $4000$ 点に刻んで $t-\\frac{f(t)}{f'(t)}$ と $g(u)$（$u=e^{-t}$）が一致することを確かめた",
          "$u$ を $200$ 万点に刻んで $g(u)$ を計算すると、$0<a<\\frac32+2\\log2$ に入る値は1つもなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`点 $(a,0)$ を通り、曲線 $y=e^{-x}-e^{-2x}$ に接する直線が存在するような定数 $a$ の値の範囲を求める`,
          answer: String.raw`$a\le0$ または $a\ge\dfrac32+2\log2$`,
          approach: String.raw`接点を $t$ として、接線が $(a,0)$ を通る条件から $a$ を $t$ で表す。$u=e^{-t}$ とおくと式が整理でき、$u$ の関数の値域を調べる問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)=e^{-x}-e^{-2x}$ とおくと $f'(x)=-e^{-x}+2e^{-2x}$ である。接点を $\left(t,f(t)\right)$ とすると接線は`,
            },
            { k: "math", t: String.raw`y=f(t)+f'(t)(x-t)` },
            { k: "p", t: String.raw`で、$(a,0)$ を通る条件は` },
            { k: "math", t: String.raw`0=f(t)+f'(t)(a-t)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$f'(t)=0$ は起こらない。** $f'(t)=0$ は $e^{-t}=2e^{-2t}$、つまり $e^{t}=2$、$t=\log2$ のときで、このとき $f(\log2)=\dfrac12-\dfrac14=\dfrac14\ne0$ だから上の式が成り立たない。よって $f'(t)\ne0$ としてよく`,
            },
            { k: "math", t: String.raw`a=t-\frac{f(t)}{f'(t)}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$u=e^{-t}$ とおく。** $u>0$ で $t=-\log u$、$f=u-u^{2}$、$f'=-u+2u^{2}=u(2u-1)$ だから`,
            },
            {
              k: "math",
              t: String.raw`\frac{f(t)}{f'(t)}=\frac{u(1-u)}{u(2u-1)}=\frac{1-u}{2u-1}`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`a=g(u):=-\log u+\frac{u-1}{2u-1}\qquad\left(u>0,\;u\ne\tfrac12\right)`,
            },
            { k: "p", t: String.raw`である。求めるのは $g$ の値域である。` },
            { k: "p", t: String.raw`**増減。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
g'(u)&=-\frac1u+\frac{(2u-1)-2(u-1)}{(2u-1)^{2}}=-\frac1u+\frac1{(2u-1)^{2}}\\[1mm]
&=\frac{-(2u-1)^{2}+u}{u(2u-1)^{2}}=\frac{-4u^{2}+5u-1}{u(2u-1)^{2}}=\frac{-(4u-1)(u-1)}{u(2u-1)^{2}}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。分母は正なので、$g'$ の符号は $(4u-1)(1-u)$ の符号に等しい。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<u<\dfrac14$：$g'<0$（減少）`,
                String.raw`$\dfrac14<u<1$：$g'>0$（増加）。ただし $u=\dfrac12$ で切れている`,
                String.raw`$u>1$：$g'<0$（減少）`,
              ],
            },
            { k: "p", t: String.raw`**端の値と極値。** ` },
            {
              k: "math",
              t: String.raw`g\!\left(\tfrac14\right)=\log4+\frac{-\frac34}{-\frac12}=2\log2+\frac32,\qquad g(1)=0`,
            },
            {
              k: "steps",
              items: [
                String.raw`$u\to+0$：$-\log u\to+\infty$、$\dfrac{u-1}{2u-1}\to1$ なので $g\to+\infty$`,
                String.raw`$u\to\dfrac12-0$：$2u-1\to-0$、$u-1\to-\dfrac12$ なので $\dfrac{u-1}{2u-1}\to+\infty$、$g\to+\infty$`,
                String.raw`$u\to\dfrac12+0$：同じく $\to-\infty$`,
                String.raw`$u\to\infty$：$-\log u\to-\infty$、分数は $\to\dfrac12$ なので $g\to-\infty$`,
              ],
            },
            { k: "p", t: String.raw`**値域。** 4つの区間に分けて見る。` },
            {
              k: "steps",
              items: [
                String.raw`$\left(0,\frac14\right]$：$+\infty$ から $2\log2+\frac32$ まで減少 → $\left[2\log2+\frac32,\;\infty\right)$`,
                String.raw`$\left[\frac14,\frac12\right)$：$2\log2+\frac32$ から $+\infty$ まで増加 → $\left[2\log2+\frac32,\;\infty\right)$`,
                String.raw`$\left(\frac12,1\right]$：$-\infty$ から $0$ まで増加 → $(-\infty,\,0]$`,
                String.raw`$[1,\infty)$：$0$ から $-\infty$ まで減少 → $(-\infty,\,0]$`,
              ],
            },
            { k: "p", t: String.raw`合わせて` },
            {
              k: "math",
              t: String.raw`a\le0\quad\text{または}\quad a\ge\frac32+2\log2`,
            },
            { k: "p", t: String.raw`である（$\frac32+2\log2=2.886$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=g(u)=-\log u+\frac{u-1}{2u-1}$ のグラフ。$u=\frac12$ が漸近線で、左側（$u<\frac12$）では $u=\frac14$ の極小 $\frac32+2\log2=2.886$ より下にならず、右側（$u>\frac12$）では $u=1$ の極大 $0$ より上にならない。$0<a<\frac32+2\log2$ には届かない。`,
                view: [-0.15, 3.15, -3.2, 6.2],
                step: { x: 0.5, y: 1 },
                items: [
                  { k: "curve", f: G20, from: 0.015, to: 0.495 },
                  { k: "curve", f: G20, from: 0.505, to: 3.1 },
                  { k: "seg", a: [0.5, -3.2], b: [0.5, 6.2], dash: true, faint: true },
                  { k: "seg", a: [-0.15, 1.5 + 2 * Math.log(2)], b: [3.15, 1.5 + 2 * Math.log(2)], dash: true, faint: true },
                  { k: "seg", a: [-0.15, 0], b: [3.15, 0], dash: true, faint: true },
                  { k: "dot", at: [0.25, 1.5 + 2 * Math.log(2)], label: "(1/4, 3/2+2log2)", place: "above-right" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`曲線 $y=e^{-x}-e^{-2x}$。$x=\log2$ で最大値 $\frac14$、$x=0$ で $0$ を横切り、$x\to\infty$ で $0$ に近づく。$x<0$ では $-e^{-2x}$ が効いて急激に下がる。接線が通れる $x$ 軸上の点は $a\le0$ と $a\ge\frac32+2\log2=2.886$ の部分である。`,
                view: [-1.3, 5.3, -1.4, 1.1],
                step: { x: 1, y: 0.5 },
                items: [
                  { k: "curve", f: CV20, from: -1.1, to: 5.2 },
                  { k: "dot", at: [Math.log(2), 0.25], label: "(log 2, 1/4)", place: "above-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [1.5 + 2 * Math.log(2), 0], label: "3/2 + 2log2", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$u=e^{-t}$ とおくと $t=-\log u$ で、$t$ の全体が $u>0$ に対応する。置換で範囲が狭まらない。`,
            String.raw`$u=\frac12$（$t=\log2$）で $g$ は定義されない。ここは $f'(t)=0$ に当たり、接線が水平で $x$ 軸と交わらない。区間を分けて調べる。`,
            String.raw`$u=\frac14$ は極小、$u=1$ は極大である。値域が2つの区間の和になるのは、$u=\frac12$ で切れているからである。`,
            String.raw`$g(1)=0$、つまり $a=0$ は含まれる。接点は $t=0$ で、接線 $y=x$ が原点を通る。`,
          ],
          check: String.raw`$u$ を $200$ 万点に刻んで $g(u)$ を計算すると、$0<a<2\log2+\frac32=2.886294$ に入る値は1つもなかった。$g\!\left(\frac14\right)=2.886294$、$g(1)=0$ も一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "整式",
      topics: ["1 の原始6乗根", "因数分解", "合同式", "中国剰余定理"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$c=1-b$、$d=a+b$ のとき $f\\!\\left(\\frac{1+\\sqrt3\\,i}2\\right)=0$ になることを確かめた",
          "$\\left|a\\right|,\\left|b\\right|\\le40$ の整数を全探索して4つの合同条件をみたす組を探すと $(a,b)=(6,29)$ だけだった",
          "$a=6,b=29,c=-28,d=35$ で $f(1)=43$（$7$ で割って $1$、$11$ で割って $10$）、$f(-1)=87$（$7$ で割って $3$、$11$ で割って $10$）を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$c,d$ を $a,b$ を用いて表す`,
          answer: String.raw`$c=1-b$、$d=a+b$`,
          approach: String.raw`$\dfrac{1+\sqrt3\,i}2$ は $x^{2}-x+1=0$ の解である。係数が整数（とくに実数）なので $f(x)$ は $x^{2}-x+1$ で割り切れる。商を $x^{2}+px+q$ とおいて係数を比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\omega=\dfrac{1+\sqrt3\,i}2$ とおく。$\omega$ は`,
            },
            { k: "math", t: String.raw`x^{2}-x+1=0` },
            {
              k: "p",
              t: String.raw`の解である（$\omega=\cos\frac\pi3+i\sin\frac\pi3$、和 $1$・積 $1$ の2解の一方）。$f$ の係数は実数なので、$\omega$ が解なら共役 $\bar\omega$ も解である。よって $f(x)$ は $(x-\omega)(x-\bar\omega)=x^{2}-x+1$ で割り切れる。`,
            },
            { k: "p", t: String.raw`商を $x^{2}+px+q$ とおくと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(x)&=\left(x^{2}-x+1\right)\left(x^{2}+px+q\right)\\[1mm]
&=x^{4}+(p-1)x^{3}+(q-p+1)x^{2}+(p-q)x+q
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。係数を比べて` },
            {
              k: "math",
              t: String.raw`a=p-1,\qquad b=q-p+1,\qquad c=p-q,\qquad d=q`,
            },
            {
              k: "p",
              t: String.raw`となる。1本目から $p=a+1$、2本目に入れて $q=b+p-1=a+b$。よって`,
            },
            {
              k: "math",
              t: String.raw`c=p-q=(a+1)-(a+b)=1-b,\qquad d=q=a+b`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\omega$ は1の**原始6乗根**で、最小多項式は $x^{2}-x+1$ である。$x^{2}+x+1$（原始3乗根）と取り違えない。`,
            String.raw`「係数が実数だから共役も解」を根拠にする。$a,b,c,d$ が整数という条件はここでは実数であれば足りる。`,
          ],
          check: String.raw`$c=1-b$、$d=a+b$ とすると、$a,b$ を何にとっても $f(\omega)=0$ になることを数値で確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(1)$ を $7$ で割ると $1$、$11$ で割ると $10$ 余り、$f(-1)$ を $7$ で割ると $3$、$11$ で割ると $10$ 余るとする。$\left|a\right|\le40$、$\left|b\right|\le40$ のとき $f(x)=0$ の解をすべて求める`,
          answer: String.raw`$x=\dfrac{1\pm\sqrt3\,i}2,\qquad x=\dfrac{-7\pm\sqrt{91}\,i}2$`,
          approach: String.raw`(1) を使って $f(1)$、$f(-1)$ を $a,b$ だけで書く。$f(-1)=3b$ となるので $b$ が先に決まり、続いて $a$ が決まる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $c=1-b$、$d=a+b$ なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(1)&=1+a+b+c+d=1+a+b+(1-b)+(a+b)=2a+b+2\\[1mm]
f(-1)&=1-a+b-c+d=1-a+b-(1-b)+(a+b)=3b
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$b$ を決める。** $f(-1)=3b$ の条件から` },
            {
              k: "math",
              t: String.raw`3b\equiv3\pmod7,\qquad3b\equiv10\pmod{11}`,
            },
            {
              k: "p",
              t: String.raw`である。1本目は $3$ と $7$ が互いに素なので $b\equiv1\pmod7$。2本目は $3\cdot4=12\equiv1\pmod{11}$ より両辺を $4$ 倍して $b\equiv40\equiv7\pmod{11}$。`,
            },
            {
              k: "p",
              t: String.raw`$b=1+7k$ とおいて $1+7k\equiv7\pmod{11}$、$7k\equiv6$。$7\cdot8=56\equiv1\pmod{11}$ より $k\equiv48\equiv4\pmod{11}$。$k=4$ で $b=29$ だから`,
            },
            { k: "math", t: String.raw`b\equiv29\pmod{77}` },
            {
              k: "p",
              t: String.raw`である。$\left|b\right|\le40$ をみたすのは $b=29$ だけである（次は $29-77=-48$ で範囲外）。`,
            },
            { k: "p", t: String.raw`**$a$ を決める。** $f(1)=2a+29+2=2a+31$ で` },
            {
              k: "math",
              t: String.raw`2a+31\equiv1\pmod7,\qquad2a+31\equiv10\pmod{11}`,
            },
            {
              k: "p",
              t: String.raw`である。$31\equiv3\pmod7$ より $2a\equiv-2\equiv5\pmod7$、$2\cdot4=8\equiv1\pmod7$ より $a\equiv20\equiv6\pmod7$。$31\equiv9\pmod{11}$ より $2a\equiv1\pmod{11}$、$2\cdot6=12\equiv1$ より $a\equiv6\pmod{11}$。`,
            },
            {
              k: "p",
              t: String.raw`$a\equiv6$ が法 $7$ でも法 $11$ でも成り立つので $a\equiv6\pmod{77}$。$\left|a\right|\le40$ より $a=6$ である。`,
            },
            { k: "p", t: String.raw`**解を求める。** $a=6$、$b=29$ なので` },
            {
              k: "math",
              t: String.raw`c=1-29=-28,\qquad d=6+29=35,\qquad p=a+1=7,\qquad q=a+b=35`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`f(x)=\left(x^{2}-x+1\right)\left(x^{2}+7x+35\right)`,
            },
            { k: "p", t: String.raw`で、$x^{2}+7x+35=0$ の判別式は $49-140=-91$ だから` },
            {
              k: "math",
              t: String.raw`x=\frac{1\pm\sqrt3\,i}2,\qquad x=\frac{-7\pm\sqrt{91}\,i}2`,
            },
            { k: "p", t: String.raw`の4つが解である。` },
          ],
          pitfalls: [
            String.raw`$f(-1)=3b$ と、$a$ が消えるのがこの問題の仕掛けである。$b$ から先に決める。`,
            String.raw`法 $7$ と法 $11$ を合わせると法 $77$ になる。$\left|a\right|,\left|b\right|\le40$ という条件で、$77$ 幅のうち1つだけに絞られる。`,
            String.raw`$3b\equiv10\pmod{11}$ は「$3$ で割る」のではなく「$3$ の逆元 $4$ を掛ける」。`,
            String.raw`最後に4つの解をすべて書く。$x^{2}-x+1=0$ の2解も解である。`,
          ],
          check: String.raw`$\left|a\right|,\left|b\right|\le40$ の整数を全探索すると、4つの合同条件をみたすのは $(a,b)=(6,29)$ だけだった。このとき $f(1)=43$、$f(-1)=87$ で、$43=7\cdot6+1=11\cdot3+10$、$87=7\cdot12+3=11\cdot7+10$ と条件どおりだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["中点連結", "等面四面体", "内積", "外接球"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec u,\\vec v,\\vec w$ を直交する座標軸方向にとって $\\left|\\vec u\\right|^{2}=12$、$\\left|\\vec v\\right|^{2}=8$、$\\left|\\vec w\\right|^{2}=4$ とすると、$\\mathrm{AB}=\\sqrt5$、$\\mathrm{BC}=\\sqrt3$、$\\mathrm{CA}=2$ になり $\\ell,m,n$ が互いに直交することを確かめた",
          "この配置で直線 $\\mathrm{OB}$ と $\\mathrm{CA}$ のなす角が $60^\\circ$、重心から4頂点までの距離がすべて $1.224744871=\\frac{\\sqrt6}2$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`直線 $\mathrm{OB}$ と直線 $\mathrm{CA}$ のなす角 $\theta$ を求める`,
          answer: String.raw`$\theta=\dfrac\pi3$`,
          approach: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$ などとおくと、3直線の方向は $\vec b+\vec c-\vec a$、$\vec c+\vec a-\vec b$、$\vec a+\vec b-\vec c$ である。これらを $\vec u,\vec v,\vec w$ と呼んで主役にすると、辺の長さがすべて $\left|\vec u\right|,\left|\vec v\right|,\left|\vec w\right|$ で書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおく。$\ell$ は $\dfrac{\vec a}2$ と $\dfrac{\vec b+\vec c}2$ を通るので、方向は`,
            },
            {
              k: "math",
              t: String.raw`\vec u=\vec b+\vec c-\vec a,\qquad\vec v=\vec c+\vec a-\vec b,\qquad\vec w=\vec a+\vec b-\vec c`,
            },
            { k: "p", t: String.raw`がそれぞれ $\ell,m,n$ の方向である。` },
            {
              k: "p",
              t: String.raw`**逆に解く。** $\vec v+\vec w=2\vec a$、$\vec w+\vec u=2\vec b$、$\vec u+\vec v=2\vec c$ なので`,
            },
            {
              k: "math",
              t: String.raw`\vec a=\frac{\vec v+\vec w}2,\qquad\vec b=\frac{\vec w+\vec u}2,\qquad\vec c=\frac{\vec u+\vec v}2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**辺の長さ。** 仮定より $\vec u,\vec v,\vec w$ は互いに直交する。$U=\left|\vec u\right|$ などとおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\mathrm{AB}^{2}&=\left|\vec b-\vec a\right|^{2}=\left|\frac{\vec u-\vec v}2\right|^{2}=\frac{U^{2}+V^{2}}4\\[1mm]
\mathrm{BC}^{2}&=\left|\frac{\vec v-\vec w}2\right|^{2}=\frac{V^{2}+W^{2}}4,\qquad
\mathrm{CA}^{2}=\frac{W^{2}+U^{2}}4
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。与えられた値を入れると` },
            {
              k: "math",
              t: String.raw`U^{2}+V^{2}=20,\qquad V^{2}+W^{2}=12,\qquad W^{2}+U^{2}=16`,
            },
            {
              k: "p",
              t: String.raw`となる。3本を足して $2\left(U^{2}+V^{2}+W^{2}\right)=48$、すなわち $U^{2}+V^{2}+W^{2}=24$。よって`,
            },
            {
              k: "math",
              t: String.raw`U^{2}=12,\qquad V^{2}=8,\qquad W^{2}=4`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**なす角。** ` },
            {
              k: "math",
              t: String.raw`\vec b=\frac{\vec w+\vec u}2,\qquad\overrightarrow{\mathrm{CA}}=\vec a-\vec c=\frac{\vec v+\vec w}2-\frac{\vec u+\vec v}2=\frac{\vec w-\vec u}2`,
            },
            { k: "p", t: String.raw`なので、直交性から` },
            {
              k: "math",
              t: String.raw`\vec b\cdot\overrightarrow{\mathrm{CA}}=\frac{\left(\vec w+\vec u\right)\cdot\left(\vec w-\vec u\right)}4=\frac{W^{2}-U^{2}}4=\frac{4-12}4=-2`,
            },
            {
              k: "p",
              t: String.raw`である。また $\left|\vec b\right|=\dfrac{\sqrt{W^{2}+U^{2}}}2=\dfrac{\sqrt{16}}2=2$、$\left|\overrightarrow{\mathrm{CA}}\right|=2$ だから`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\left(\vec b,\overrightarrow{\mathrm{CA}}\right)=\frac{-2}{2\cdot2}=-\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。ベクトルのなす角は $120^\circ$ だが、**直線**のなす角は $0\le\theta\le\dfrac\pi2$ の側をとるので`,
            },
            { k: "math", t: String.raw`\theta=180^\circ-120^\circ=60^\circ=\frac\pi3` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{OA}^{2}=\frac{V^{2}+W^{2}}4=3=\mathrm{BC}^{2}$、$\mathrm{OB}=\mathrm{CA}=2$、$\mathrm{OC}=\mathrm{AB}=\sqrt5$ となっている。向かい合う辺の長さが等しい四面体（等面四面体）である。3本の中点を結ぶ直線が互いに直交する、という条件がこれを生んでいる。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec u,\vec v,\vec w$ を主役にすると、$\vec a,\vec b,\vec c$ も辺の長さもすべて $U,V,W$ で書ける。$\vec a,\vec b,\vec c$ のままだと内積が6個出てきて収拾がつかない。`,
            String.raw`「直線のなす角」は $0\le\theta\le\frac\pi2$ にとる。内積が負でも $180^\circ$ から引く。`,
            String.raw`$\ell\perp m$ などの条件は $\vec u\cdot\vec v=0$ などであって、$\vec a\cdot\vec b=0$ ではない。`,
          ],
          check: String.raw`$\vec u=(\sqrt{12},0,0)$、$\vec v=(0,\sqrt8,0)$、$\vec w=(0,0,2)$ として $\mathrm{A},\mathrm{B},\mathrm{C}$ を作ると、$\mathrm{AB}=2.236068=\sqrt5$、$\mathrm{BC}=1.732051=\sqrt3$、$\mathrm{CA}=2$ で条件どおり、$\ell,m,n$ の内積もすべて $0$、$\mathrm{OB}$ と $\mathrm{CA}$ のなす角は $60.000000^\circ$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`四面体 $\mathrm{OABC}$ の4つの頂点をすべて通る球の半径を求める`,
          answer: String.raw`$\dfrac{\sqrt6}2$`,
          approach: String.raw`$\vec u,\vec v,\vec w$ の方向を座標軸にとると、4頂点の座標が簡単に書ける。外心を $(x,y,z)$ とおいて4点から等距離という条件を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec u,\vec v,\vec w$ は互いに直交するので、これらの方向を座標軸にとって`,
            },
            {
              k: "math",
              t: String.raw`\vec u=(U,0,0),\qquad\vec v=(0,V,0),\qquad\vec w=(0,0,W)`,
            },
            { k: "p", t: String.raw`としてよい。すると` },
            {
              k: "math",
              t: String.raw`\mathrm{O}(0,0,0),\quad\mathrm{A}\!\left(0,\tfrac V2,\tfrac W2\right),\quad\mathrm{B}\!\left(\tfrac U2,0,\tfrac W2\right),\quad\mathrm{C}\!\left(\tfrac U2,\tfrac V2,0\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**外心。** 中心を $\mathrm{P}(x,y,z)$ とする。$\mathrm{PO}=\mathrm{PA}$ は $\left|\mathrm{P}\right|^{2}=\left|\mathrm{P}-\mathrm{A}\right|^{2}$、展開して $2\,\mathrm{P}\cdot\mathrm{A}=\left|\mathrm{A}\right|^{2}$ である。$X=xU$、$Y=yV$、$Z=zW$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`Y+Z=\frac{V^{2}+W^{2}}4,\qquad X+Z=\frac{U^{2}+W^{2}}4,\qquad X+Y=\frac{U^{2}+V^{2}}4`,
            },
            {
              k: "p",
              t: String.raw`となる。3本を足すと $X+Y+Z=\dfrac{U^{2}+V^{2}+W^{2}}4=\dfrac{24}4=6$ だから`,
            },
            {
              k: "math",
              t: String.raw`X=6-\frac{V^{2}+W^{2}}4=3,\qquad Y=6-\frac{U^{2}+W^{2}}4=2,\qquad Z=6-\frac{U^{2}+V^{2}}4=1`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**半径。** $R^{2}=x^{2}+y^{2}+z^{2}=\dfrac{X^{2}}{U^{2}}+\dfrac{Y^{2}}{V^{2}}+\dfrac{Z^{2}}{W^{2}}$ なので` },
            {
              k: "math",
              t: String.raw`R^{2}=\frac9{12}+\frac48+\frac14=\frac34+\frac12+\frac14=\frac32`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`R=\sqrt{\frac32}=\frac{\sqrt6}2`,
            },
            { k: "p", t: String.raw`である（$1.2247$ ほど）。` },
            {
              k: "note",
              t: String.raw`$X=\dfrac{U^{2}}4$、$Y=\dfrac{V^{2}}4$、$Z=\dfrac{W^{2}}4$ なので $\mathrm{P}=\left(\dfrac U4,\dfrac V4,\dfrac W4\right)$ で、これは4頂点の重心である。等面四面体では外心と重心が一致する。向かい合う辺が $p,q,r$ なら $R=\dfrac{\sqrt{p^{2}+q^{2}+r^{2}}}{2\sqrt2}=\dfrac{\sqrt{5+3+4}}{2\sqrt2}=\dfrac{\sqrt6}2$ とも書ける。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec u,\vec v,\vec w$ の方向を座標軸にとってよい。直交していることが使える最大の場面である。`,
            String.raw`$X=xU$ などと置き換えると連立方程式が対称になり、足して引くだけで解ける。`,
            String.raw`$R^{2}$ に戻すとき $x=\frac XU$ なので $x^{2}=\frac{X^{2}}{U^{2}}$ である。$X^{2}$ のままにしない。`,
          ],
          check: String.raw`この座標で重心 $\left(\frac U4,\frac V4,\frac W4\right)$ から4頂点までの距離を計算すると、すべて $1.224744871$ で、$\frac{\sqrt6}2=1.224744871$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["素因数の個数", "余事象", "サイコロ", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$6^{4}=1296$ 通りをすべて列挙して積 $X$ を計算すると、$25$ の倍数が $171$ 通り（$\\frac{19}{144}$）、$4$ の倍数が $999$ 通り（$\\frac{37}{48}$）、$100$ の倍数が $82$ 通り（$\\frac{41}{648}$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$X$ が $25$ の倍数になる確率を求める`,
          answer: String.raw`$\dfrac{19}{144}$`,
          approach: String.raw`$25=5^{2}$ で、$1$ から $6$ のうち $5$ を因数にもつのは $5$ だけである。よって「$5$ が2個以上出る」確率を、余事象で求める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1,\dots,6$ のうち $5$ で割り切れるのは $5$ だけなので、$X$ が $5^{2}$ で割り切れるのは「出た目に $5$ が2個以上ある」ときである。余事象を数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$5$ が0個：$5^{4}=625$ 通り`,
                String.raw`$5$ が1個：$ {}_4\mathrm{C}_1\cdot1\cdot5^{3}=4\cdot125=500$ 通り`,
              ],
            },
            { k: "p", t: String.raw`合わせて $625+500=1125$ 通りだから` },
            {
              k: "math",
              t: String.raw`P=1-\frac{1125}{6^{4}}=1-\frac{1125}{1296}=\frac{171}{1296}=\frac{19}{144}`,
            },
            { k: "p", t: String.raw`である（$0.132$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$25$ の倍数には $5$ が**2個**必要である。$5$ が1個では足りない。`,
            String.raw`$\frac{171}{1296}$ は $9$ で約分して $\frac{19}{144}$ になる。`,
          ],
          check: String.raw`$1296$ 通りを全列挙すると $25$ の倍数は $171$ 通りで、$\frac{171}{1296}=\frac{19}{144}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$X$ が $4$ の倍数になる確率を求める`,
          answer: String.raw`$\dfrac{37}{48}$`,
          approach: String.raw`各目がもつ $2$ の個数を数える。$1,3,5$ は $0$ 個、$2,6$ は $1$ 個、$4$ は $2$ 個である。合計が $2$ 以上になる確率を、余事象（合計 $0$ または $1$）で求める。`,
          blocks: [
            { k: "p", t: String.raw`各目を素因数 $2$ の個数で分類する。` },
            {
              k: "steps",
              items: [
                String.raw`$2$ の個数が $0$：$1,3,5$ の**3**通り`,
                String.raw`$2$ の個数が $1$：$2,6$ の**2**通り`,
                String.raw`$2$ の個数が $2$：$4$ の**1**通り`,
              ],
            },
            {
              k: "p",
              t: String.raw`$X$ が $4=2^{2}$ の倍数になるのは、4個ぶんの合計が $2$ 以上のときである。余事象を数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`合計 $0$：4個とも $\{1,3,5\}$。$3^{4}=81$ 通り`,
                String.raw`合計 $1$：1個が $\{2,6\}$、残り3個が $\{1,3,5\}$。$ {}_4\mathrm{C}_1\cdot2\cdot3^{3}=4\cdot2\cdot27=216$ 通り`,
              ],
            },
            { k: "p", t: String.raw`合わせて $81+216=297$ 通りだから` },
            {
              k: "math",
              t: String.raw`P=1-\frac{297}{1296}=1-\frac{11}{48}=\frac{37}{48}`,
            },
            { k: "p", t: String.raw`である（$0.771$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$4$ は $2$ を**2個**もつ。$4$ が1個出ればそれだけで条件をみたす。目を「偶数・奇数」で分けるだけでは足りない。`,
            String.raw`$\frac{297}{1296}$ は $27$ で約分して $\frac{11}{48}$ になる。`,
          ],
          check: String.raw`全列挙すると $4$ の倍数は $999$ 通りで、$\frac{999}{1296}=\frac{37}{48}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$X$ が $100$ の倍数になる確率を求める`,
          answer: String.raw`$\dfrac{41}{648}$`,
          approach: String.raw`$100=2^{2}\cdot5^{2}$ なので、(1) と (2) の両方が同時に成り立つ場合を数える。$5$ の個数で場合分けし、残りの目で $2$ を2個そろえられるかを見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$100=2^{2}\cdot5^{2}$ だから、「$5$ が2個以上」かつ「$2$ の個数の合計が2以上」である。$5$ の個数 $k$ で分ける。$5$ 以外の目は $\{1,2,3,4,6\}$ の5通りで、$5$ 自身は $2$ を1個ももたない。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k=4$：残り0個で $2$ が足りない。**0** 通り`,
                String.raw`$k=3$：残り1個が $2$ を2個もつ必要があるので $4$ に限る。場所の選び方 $ {}_4\mathrm{C}_3=4$ 通りで、**4** 通り`,
                String.raw`$k=2$：場所の選び方 $ {}_4\mathrm{C}_2=6$ 通り。残り2個は $\{1,2,3,4,6\}$ からで、$2$ の個数の合計が2以上`,
              ],
            },
            {
              k: "p",
              t: String.raw`$k=2$ の「残り2個」を数える。$\{1,3\}$ が $2$ を0個（2通り）、$\{2,6\}$ が1個（2通り）、$\{4\}$ が2個（1通り）なので、順序つき $5^{2}=25$ 通りのうち`,
            },
            {
              k: "steps",
              items: [
                String.raw`合計 $0$：$2\times2=4$ 通り`,
                String.raw`合計 $1$：$2\cdot(2\times2)=8$ 通り`,
              ],
            },
            {
              k: "p",
              t: String.raw`で、合計 $2$ 以上は $25-12=13$ 通り。よって $k=2$ は $6\times13=78$ 通りである。`,
            },
            { k: "p", t: String.raw`合計して $4+78=82$ 通りだから` },
            {
              k: "math",
              t: String.raw`P=\frac{82}{1296}=\frac{41}{648}`,
            },
            { k: "p", t: String.raw`である（$0.063$ ほど）。` },
            {
              k: "note",
              t: String.raw`(1) と (2) の確率を掛けても答えにならない。$5$ が多く出ると $2$ を作る余地が減るので、2つの事象は独立でない。実際 $\frac{19}{144}\cdot\frac{37}{48}=\frac{703}{6912}=0.102$ で、正しい $0.063$ とは合わない。`,
            },
          ],
          pitfalls: [
            String.raw`$5$ を2個以上使うと、$2$ を供給できる目が2個以下に減る。ここが (1)(2) の単純な組み合わせにならない理由である。`,
            String.raw`$k=4$（全部 $5$）は $X=625$ で $4$ の倍数でない。忘れずに除く。`,
            String.raw`$k=2$ の残り2個は順序つきで数える。場所の選び方 $ {}_4\mathrm{C}_2$ とは別勘定である。`,
          ],
          check: String.raw`全列挙すると $100$ の倍数は $82$ 通りで、$\frac{82}{1296}=\frac{41}{648}$ だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["立体の切り口", "体積", "回転体", "最大最小の半径"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$S(t)=4\\sqrt{1-t^{2}}$ を数値積分すると $6.2831853$ となり $2\\pi$ と一致した",
          "回転体の体積を数値積分すると $88.5391576$、$\\frac{28\\pi}3+6\\pi^{2}=88.5391578$ と一致し、$400$ 万点のモンテカルロでも $88.536$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$-1\le t\le1$ のとき、平面 $x=t$ で $T$ を切った断面積 $S(t)$ と、$T$ の体積を求める`,
          answer: String.raw`$S(t)=4\sqrt{1-t^{2}}$、体積は $2\pi$`,
          approach: String.raw`まず分ける平面の式を出す。$x$ 軸を含む平面は $\alpha y+\beta z=0$ の形で、$(0,2,2)$ を通ることから $z=y$ と決まる。$T$ は $0\le z\le y$ の側である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$E$ と分ける平面。** $E$ は`,
            },
            {
              k: "math",
              t: String.raw`E=\left\{(x,y,z)\;\middle|\;x^{2}+(y-2)^{2}\le1,\;0\le z\le3\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$x$ 軸（$y=z=0$）を含む平面は $\alpha y+\beta z=0$ と書ける。$(0,2,2)$ を通るので $2\alpha+2\beta=0$、$\beta=-\alpha$。よって平面は`,
            },
            { k: "math", t: String.raw`z=y` },
            {
              k: "p",
              t: String.raw`である。$D$（$z=0$ の円）では $y\ge1>0=z$ なので、$D$ を含むのは $z\le y$ の側である。また円板上では $y\le3$ なので $z\le y\le3$ となり、$z\le3$ の条件は自動的にみたされる。したがって`,
            },
            {
              k: "math",
              t: String.raw`T=\left\{(x,y,z)\;\middle|\;x^{2}+(y-2)^{2}\le1,\;\;0\le z\le y\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**断面積。** $x=t$ で切ると、$(y-2)^{2}\le1-t^{2}$ より $y$ は $2-s\le y\le2+s$（$s=\sqrt{1-t^{2}}$）を動く。各 $y$ に対して $z$ は $0$ から $y$ まで。よって`,
            },
            {
              k: "math",
              t: String.raw`S(t)=\int_{2-s}^{2+s}y\,dy=\left[\frac{y^{2}}2\right]_{2-s}^{2+s}=\frac{(2+s)^{2}-(2-s)^{2}}2=\frac{8s}2=4s`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`S(t)=4\sqrt{1-t^{2}}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**体積。** ` },
            {
              k: "math",
              t: String.raw`V=\int_{-1}^{1}4\sqrt{1-t^{2}}\,dt=4\cdot\frac\pi2=2\pi`,
            },
            {
              k: "p",
              t: String.raw`である（$\int_{-1}^{1}\sqrt{1-t^{2}}dt$ は半径 $1$ の半円の面積 $\frac\pi2$）。`,
            },
            {
              k: "note",
              t: String.raw`$S(t)=4s$ は「幅 $2s$ × 高さ（$y$ の平均 $2$）」とも読める。断面の台形は上底 $2-s$、下底 $2+s$、幅 $2s$ の台形で、面積は $\frac{(2-s)+(2+s)}2\cdot2s=4s$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「$x$ 軸を含む平面」なので、平面の式に $x$ が入らない。$\alpha y+\beta z=0$ から始める。`,
            String.raw`$T$ がどちら側かは $D$（$z=0$ の円板）が入るかで決める。$z\le y$ の側である。`,
            String.raw`$z\le3$ は効かない。円板上で $y\le3$ だから、$z\le y\le3$ が自動で成り立つ。`,
          ],
          check: String.raw`$S(t)=4\sqrt{1-t^{2}}$ を数値積分すると $6.2831853$ で、$2\pi=6.2831853$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$T$ を $x$ 軸のまわりに1回転させてできる立体の体積を求める`,
          answer: String.raw`$\dfrac{28\pi}3+6\pi^{2}$`,
          approach: String.raw`$x=t$ での断面（$yz$ 平面内の台形）を原点のまわりに回すと、原点からの距離の最小・最大で決まる円環になる。領域はつながっているので、その間の距離はすべて現れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=t$ での $T$ の断面は、$yz$ 平面内の`,
            },
            {
              k: "math",
              t: String.raw`K_t=\left\{(y,z)\;\middle|\;2-s\le y\le2+s,\;\;0\le z\le y\right\}\qquad\left(s=\sqrt{1-t^{2}}\right)`,
            },
            {
              k: "p",
              t: String.raw`という台形である。$x$ 軸のまわりの回転は、この平面内で原点のまわりに回すことに当たるので、回転後の断面は「$K_t$ に現れる原点からの距離 $r=\sqrt{y^{2}+z^{2}}$ の値」で決まる。$K_t$ は連結だから、$r$ の値は最小から最大まですべて現れ、断面は円環になる。`,
            },
            {
              k: "p",
              t: String.raw`**最小。** $z\ge0$ より $r\ge y\ge2-s$ で、$(y,z)=(2-s,0)$ で $r=2-s$。よって $r_{\min}=2-s$。`,
            },
            {
              k: "p",
              t: String.raw`**最大。** $z\le y\le2+s$ より $r^{2}=y^{2}+z^{2}\le2y^{2}\le2(2+s)^{2}$ で、$(y,z)=(2+s,2+s)$ で等号。よって $r_{\max}=\sqrt2\,(2+s)$。`,
            },
            { k: "p", t: String.raw`したがって回転後の断面積は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\pi\left\{2(2+s)^{2}-(2-s)^{2}\right\}
&=\pi\left\{\left(8+8s+2s^{2}\right)-\left(4-4s+s^{2}\right)\right\}\\[1mm]
&=\pi\left(4+12s+s^{2}\right)=\pi\left(5-t^{2}+12\sqrt{1-t^{2}}\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である（$s^{2}=1-t^{2}$）。これを積分して` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
V&=\pi\int_{-1}^{1}\left(5-t^{2}\right)dt+12\pi\int_{-1}^{1}\sqrt{1-t^{2}}\,dt\\[1mm]
&=\pi\left[5t-\frac{t^{3}}3\right]_{-1}^{1}+12\pi\cdot\frac\pi2
=\pi\cdot\frac{28}3+6\pi^{2}
\end{aligned}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`V=\frac{28\pi}3+6\pi^{2}`,
            },
            { k: "p", t: String.raw`である（$88.54$ ほど）。` },
          ],
          pitfalls: [
            String.raw`回転体の断面は「最小から最大までの円環」である。領域がつながっていることを言っておくと、穴あきにならない理由がはっきりする。`,
            String.raw`最大は台形の角 $(2+s,\,2+s)$ でとる。$z$ の上限が $y$ なので、$y$ が最大のところで $z$ も最大にできる。`,
            String.raw`$\int_{-1}^{1}\left(5-t^{2}\right)dt=10-\frac23=\frac{28}3$ である。偶関数なので $2\int_0^1$ としてもよい。`,
            String.raw`$\pi^{2}$ の項が出るのは $\int\sqrt{1-t^{2}}dt$ に $\pi$ が入るからである。答えに $\pi$ と $\pi^{2}$ が混ざる。`,
          ],
          check: String.raw`数値積分で $88.5391576$、$\frac{28\pi}3+6\pi^{2}=88.5391578$ と一致した。$400$ 万点のモンテカルロでも $88.536$ になった。`,
        },
      ],
    },
  ],
};
