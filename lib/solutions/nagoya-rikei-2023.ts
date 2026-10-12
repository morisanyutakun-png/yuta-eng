import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2023年度（令和5年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問(3) の境界。上が s = p²/4、下が s = max(0, 4p-16)。 */
const UP23 = (p: number): number => (p * p) / 4;
const LO23 = (p: number): number => Math.max(0, 4 * p - 16);

/** 第3問の G(x) = x² - e^x/x（x<0）。a = G(x) の解の個数が共有点の個数。 */
const G23 = (x: number): number => x * x - Math.exp(x) / x;

export const nagoyaRikei2023: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面",
      topics: ["共役な解", "円周上の条件", "解と係数の関係", "解の配置"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "円 $\\left|z-1\\right|=1$ 上の点を $2$ 万組ランダムにとって $\\alpha+\\overline\\alpha=\\alpha\\overline\\alpha$ を確かめ、$p=t+u$、$q=t+u+tu$、$r=2tu$、$s=tu$ で4次式が一致することを確かめた",
          "$(p,s)$ を $20$ 万組ランダムにとり、$X^{2}-pX+s=0$ の2解がともに $(0,4)$ にある（相異なる）ことと、$0<p<8$ かつ $s>0$ かつ $s>4p-16$ かつ $s<\\frac{p^{2}}4$ が完全に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha+\overline\alpha=\alpha\overline\alpha$ を示す`,
          answer: String.raw`$\left|\alpha-1\right|=1$ の両辺を2乗して $\left(\alpha-1\right)\left(\overline\alpha-1\right)=1$ を展開するだけ`,
          approach: String.raw`$\left|w\right|^{2}=w\overline w$ を使う。$\overline{\alpha-1}=\overline\alpha-1$（$1$ は実数）に注意。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha$ は点 $1$ を中心とする半径 $1$ の円周上にあるので $\left|\alpha-1\right|=1$ である。両辺を2乗して`,
            },
            {
              k: "math",
              t: String.raw`\left(\alpha-1\right)\overline{\left(\alpha-1\right)}=1`,
            },
            { k: "p", t: String.raw`すなわち $\left(\alpha-1\right)\left(\overline\alpha-1\right)=1$ である。展開すると` },
            {
              k: "math",
              t: String.raw`\alpha\overline\alpha-\alpha-\overline\alpha+1=1`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\alpha+\overline\alpha=\alpha\overline\alpha` },
            { k: "p", t: String.raw`である。$\beta$ についても同様に $\beta+\overline\beta=\beta\overline\beta$ が成り立つ。` },
          ],
          pitfalls: [
            String.raw`$\overline{\alpha-1}=\overline\alpha-\overline1=\overline\alpha-1$ である。$1$ の共役は $1$。`,
            String.raw`$\left|\alpha-1\right|^{2}=\left(\alpha-1\right)\left(\overline\alpha-1\right)$ の形にするのが要点。絶対値のまま扱わない。`,
          ],
          check: String.raw`円周上の点を $2$ 万組ランダムにとって両辺を計算すると、いつも $10^{-9}$ 以内で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$t=\alpha+\overline\alpha$、$u=\beta+\overline\beta$ とおくとき、$p,q,r,s$ を $t,u$ で表す`,
          answer: String.raw`$p=t+u$、$q=t+u+tu$、$r=2tu$、$s=tu$`,
          approach: String.raw`4次式を $(x-\alpha)(x-\overline\alpha)\cdot(x-\beta)(x-\overline\beta)$ と2つの2次式の積に分ける。(1) より定数項が $t$、$u$ そのものになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`4つの解が $\alpha,\overline\alpha,\beta,\overline\beta$ なので`,
            },
            {
              k: "math",
              t: String.raw`x^{4}-px^{3}+qx^{2}-rx+s=\left(x-\alpha\right)\left(x-\overline\alpha\right)\left(x-\beta\right)\left(x-\overline\beta\right)`,
            },
            { k: "p", t: String.raw`である。(1) より $\alpha\overline\alpha=t$、$\beta\overline\beta=u$ だから` },
            {
              k: "math",
              t: String.raw`\left(x-\alpha\right)\left(x-\overline\alpha\right)=x^{2}-tx+t,\qquad
\left(x-\beta\right)\left(x-\overline\beta\right)=x^{2}-ux+u`,
            },
            { k: "p", t: String.raw`である。この2つを掛けると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
&\left(x^{2}-tx+t\right)\left(x^{2}-ux+u\right)\\[1mm]
&=x^{4}-\left(t+u\right)x^{3}+\left(t+u+tu\right)x^{2}-2tu\,x+tu
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。係数を比べて` },
            {
              k: "math",
              t: String.raw`p=t+u,\qquad q=t+u+tu,\qquad r=2tu,\qquad s=tu`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$q=p+s$、$r=2s$ という関係も読み取れる。4次方程式の係数が2つの数 $t,u$ だけで決まってしまう、というのがこの問題の仕掛けである。`,
            },
          ],
          pitfalls: [
            String.raw`$x^{2}$ の係数は $u+tu+t$ である。3つの積の組み合わせを数え落とさない。`,
            String.raw`$x$ の係数は $-tu-tu=-2tu$ である。2回出てくる。`,
            String.raw`$(1)$ がないと定数項が $\alpha\overline\alpha$ のままで、$t,u$ では書けない。`,
          ],
          check: String.raw`$t,u$ をランダムにとって $\left(x^{2}-tx+t\right)\left(x^{2}-ux+u\right)$ と $x^{4}-px^{3}+qx^{2}-rx+s$ の値を3点で比べると、いつも一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`座標平面において点 $(p,s)$ のとりうる範囲を図示する`,
          answer: String.raw`$0<p<8$ かつ $\max\left(0,\;4p-16\right)<s<\dfrac{p^{2}}4$`,
          approach: String.raw`$t,u$ は $X^{2}-pX+s=0$ の2解である。4つの解が相異なる条件は「$t\ne u$ かつ $0<t<4$、$0<u<4$」なので、2次方程式の解の配置の問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$t,u$ の動く範囲。** $\alpha=1+\left(\cos\theta+i\sin\theta\right)$ と書くと $t=\alpha+\overline\alpha=2+2\cos\theta$ である。$\alpha$ が実数（$\theta=0,\pi$）だと $\alpha=\overline\alpha$ になって解が相異ならないので、$\alpha$ は虚数、すなわち`,
            },
            { k: "math", t: String.raw`0<t<4` },
            {
              k: "p",
              t: String.raw`である（$t=4$ は $\alpha=2$、$t=0$ は $\alpha=0$ に当たる）。$u$ も同様に $0<u<4$。`,
            },
            {
              k: "p",
              t: String.raw`また $t$ の値は組 $\left\{\alpha,\overline\alpha\right\}$ を決める（$\cos\theta$ が決まるから）ので、$\left\{\alpha,\overline\alpha\right\}$ と $\left\{\beta,\overline\beta\right\}$ が交わらない条件は $t\ne u$ である。`,
            },
            {
              k: "p",
              t: String.raw`**解の配置に直す。** (2) より $t,u$ は $X^{2}-pX+s=0$ の2解である。「相異なる2解がともに $0<X<4$ にある」条件は、$F(X)=X^{2}-pX+s$ として`,
            },
            {
              k: "steps",
              items: [
                String.raw`判別式：$p^{2}-4s>0$、すなわち $s<\dfrac{p^{2}}4$`,
                String.raw`$F(0)>0$：$s>0$`,
                String.raw`$F(4)>0$：$16-4p+s>0$、すなわち $s>4p-16$`,
                String.raw`軸：$0<\dfrac p2<4$、すなわち $0<p<8$`,
              ],
            },
            { k: "p", t: String.raw`の4つである。まとめると求める範囲は` },
            {
              k: "math",
              t: String.raw`0<p<8\quad\text{かつ}\quad\max\left(0,\;4p-16\right)<s<\frac{p^{2}}4`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\begin{cases}0<p\le4&:\;0<s<\dfrac{p^{2}}4\\[2mm]4<p<8&:\;4p-16<s<\dfrac{p^{2}}4\end{cases}`,
            },
            { k: "p", t: String.raw`である（境界はすべて含まない）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$(p,s)$ のとりうる範囲（塗った部分、境界は含まない）。上の境界は放物線 $s=\frac{p^{2}}4$（$t=u$ に当たる）、下は $s=0$（$t$ か $u$ が $0$）と直線 $s=4p-16$（$t$ か $u$ が $4$）。3本は $(0,0)$、$(4,0)$、$(8,16)$ で出会い、曲線三角形になる。`,
                view: [-1.4, 9.4, -2.2, 18.2],
                step: { x: 2, y: 4 },
                items: [
                  { k: "fillBetween", top: UP23, bottom: LO23, from: 0, to: 8 },
                  { k: "curve", f: UP23, from: -1.2, to: 9.2 },
                  { k: "curve", f: (p: number) => 4 * p - 16, from: 4, to: 9.2, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [4, 0], label: "(4, 0)", place: "below" },
                  { k: "dot", at: [8, 16], label: "(8, 16)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`軸の条件 $0<\frac p2<4$ を落とさない。$F(0)>0$、$F(4)>0$ だけでは「2解がともに $4$ より大きい」場合を除けない。`,
            String.raw`$t=u$（判別式 $=0$）は $\left\{\alpha,\overline\alpha\right\}=\left\{\beta,\overline\beta\right\}$ を意味し、4解が相異ならない。だから放物線上は除く。`,
            String.raw`$s=\frac{p^{2}}4$ と $s=4p-16$ は $p=8$（$s=16$）で接する。$\frac{p^{2}}4-(4p-16)=\frac{(p-8)^{2}}4$ だからである。`,
          ],
          check: String.raw`$(p,s)$ を $20$ 万組ランダムにとり、$X^{2}-pX+s=0$ の2解がともに $(0,4)$ にあるかを直接判定すると、上の4条件と完全に一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["2円の交わり", "回転体の体積", "球欠と円錐", "最大値と極限"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)=(3,1.2),(5,2),(2,0.5)$ のそれぞれで、円錐と球欠に分けた数値積分と $\\frac\\pi3(r-h)\\left\\{2r^{2}-(a-b)(r+h)\\right\\}$ が小数9桁まで一致した",
          "同じ3通りで $V(r)$ の最大を $20$ 万点に刻んで探すと、$\\frac{3a^{2}+2ab+b^{2}}{3a+b}$ と小数5桁まで一致した",
          "$a=10,100,1000,100000$（$b=1.2$）で $r(a)-a$ を計算すると $0.4308,0.4032,0.4003,0.4000$ と $\\frac b3=0.4$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`半径 $r$ のみたすべき条件を求める`,
          answer: String.raw`$a-b<r<a+b$`,
          approach: String.raw`2円が2点で交わる条件は「中心間距離が半径の和より小さく、差より大きい」である。中心間距離は $a$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ の中心は原点、$D$ の中心は $(a,0)$ なので中心間距離は $a$ である。2円が異なる2点で交わる条件は`,
            },
            {
              k: "math",
              t: String.raw`\left|r-b\right|<a<r+b`,
            },
            { k: "p", t: String.raw`である。右側から $r>a-b$。左側は` },
            {
              k: "math",
              t: String.raw`-a<r-b<a\quad\Longleftrightarrow\quad b-a<r<a+b`,
            },
            {
              k: "p",
              t: String.raw`で、$0<b<a$ より $b-a<0<r$ だから左は自動的に成り立つ。よって`,
            },
            { k: "math", t: String.raw`a-b<r<a+b` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「2点で交わる」なので接する場合（等号）は入れない。`,
            String.raw`$\left|r-b\right|<a$ の左側は $0<b<a$ のおかげで自動的にみたされる。`,
          ],
          check: String.raw`$a=3$、$b=1.2$ で $1.8<r<4.2$。$r=2,3,4$ のとき確かに2点で交わり、$r=1.7,4.3$ では交わらなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ と $D$ の交点のうち $y$ 座標が正のものを $\mathrm{P}$ とするとき、$\mathrm{P}$ の $x$ 座標 $h(r)$ を求める`,
          answer: String.raw`$h(r)=\dfrac{a^{2}-b^{2}+r^{2}}{2a}$`,
          approach: String.raw`2円の方程式を引き算すると $y^{2}$ が消えて、$x$ の1次方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`$C:x^{2}+y^{2}=r^{2}$、$D:(x-a)^{2}+y^{2}=b^{2}$ である。辺々引くと` },
            {
              k: "math",
              t: String.raw`x^{2}-(x-a)^{2}=r^{2}-b^{2}\quad\Longleftrightarrow\quad2ax-a^{2}=r^{2}-b^{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`h(r)=\frac{a^{2}-b^{2}+r^{2}}{2a}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$h(r)-(a-b)=\dfrac{r^{2}-(a-b)^{2}}{2a}>0$（(1) より $r>a-b$）なので、$\mathrm{P}$ は $\mathrm{R}(a-b,0)$ より右にある。また $r-h(r)=\dfrac{(a+b-r)(r-(a-b))}{2a}\cdot\dfrac{\cdots}{\cdots}$ の形で正になり、$\mathrm{P}$ は $\mathrm{Q}(r,0)$ より左にある。`,
            },
          ],
          pitfalls: [
            String.raw`$y$ 座標が正という条件は $x$ 座標には効かない。2つの交点は $x$ 座標が同じである。`,
            String.raw`引き算で $x^{2}$ と $y^{2}$ が同時に消える。$x$ の1次式になるのが要点。`,
          ],
          check: String.raw`$a=3$、$b=1.2$、$r=3$ のとき $h=\frac{9-1.44+9}6=2.76$ で、2円の交点を数値で求めた $x$ 座標と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{Q}(r,0)$、$\mathrm{R}(a-b,0)$ とし、$D$ の内部にある $C$ の弧 $\mathrm{PQ}$、線分 $\mathrm{QR}$、線分 $\mathrm{RP}$ で囲まれる図形を $A$ とする。$A$ を $x$ 軸の周りに1回転してできる立体の体積 $V(r)$ を求める`,
          answer: String.raw`$V(r)=\dfrac\pi3\left(r-h\right)\left\{2r^{2}-(a-b)\left(r+h\right)\right\}$（$h=h(r)$）`,
          approach: String.raw`$A$ は「$\mathrm{R}$ から $\mathrm{P}$ までは直線、$\mathrm{P}$ から $\mathrm{Q}$ までは円弧」が上の境界で、下は $x$ 軸である。回転すると「円錐＋球欠」になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h=h(r)$、$k=\sqrt{r^{2}-h^{2}}$（$\mathrm{P}$ の $y$ 座標）とおく。(2) の注より $a-b<h<r$ である。`,
            },
            {
              k: "p",
              t: String.raw`$A$ は $a-b\le x\le r$ の範囲にあり、上の境界は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a-b\le x\le h$：線分 $\mathrm{RP}$、すなわち $y=\dfrac{k\left(x-(a-b)\right)}{h-(a-b)}$`,
                String.raw`$h\le x\le r$：円 $C$ の弧、すなわち $y=\sqrt{r^{2}-x^{2}}$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**円錐の部分。** 底面の半径 $k$、高さ $h-(a-b)$ の円錐なので`,
            },
            {
              k: "math",
              t: String.raw`V_1=\frac13\pi k^{2}\left(h-a+b\right)=\frac\pi3\left(r^{2}-h^{2}\right)\left(h-a+b\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**球欠の部分。** ` },
            {
              k: "math",
              t: String.raw`V_2=\pi\int_h^{r}\left(r^{2}-x^{2}\right)dx=\pi\left[r^{2}x-\frac{x^{3}}3\right]_h^{r}
=\pi\left(\frac23r^{3}-r^{2}h+\frac{h^{3}}3\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**足してまとめる。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
V(r)&=\frac\pi3\left\{\left(r^{2}-h^{2}\right)\left(h-a+b\right)+2r^{3}-3r^{2}h+h^{3}\right\}\\[1mm]
&=\frac\pi3\left\{2r^{2}\left(r-h\right)-(a-b)\left(r^{2}-h^{2}\right)\right\}\\[1mm]
&=\frac\pi3\left(r-h\right)\left\{2r^{2}-(a-b)\left(r+h\right)\right\}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（2行目では $r^{2}h-r^{2}(a-b)-h^{3}+h^{2}(a-b)+2r^{3}-3r^{2}h+h^{3}$ を整理した）。`,
            },
          ],
          pitfalls: [
            String.raw`$A$ の上の境界が $x=h$ で切り替わる。円錐と球欠に分けて足す。`,
            String.raw`円錐の高さは $h-(a-b)$ であって $h$ ではない。頂点は $\mathrm{R}$ にある。`,
            String.raw`$h^{3}$ がきれいに打ち消し合う。整理すると $(r-h)$ でくくれる。`,
          ],
          check: String.raw`$(a,b)=(3,1.2),(5,2),(2,0.5)$ の各5点で、円錐＋球欠の数値積分とこの式が小数9桁まで一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$V(r)$ の最大値を与える $r$ を求め、それを $r(a)$ とおいたときの $\displaystyle\lim_{a\to\infty}\left(r(a)-a\right)$ を求める`,
          answer: String.raw`$r(a)=\dfrac{3a^{2}+2ab+b^{2}}{3a+b}$、$\displaystyle\lim_{a\to\infty}\left(r(a)-a\right)=\dfrac b3$`,
          approach: String.raw`$V$ を $r$ で微分する。$h'(r)=\dfrac ra$ を使って整理すると、$V'=0$ が $r$ の2次方程式になり、$r=a-b$ が解の1つだと分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h=\dfrac{a^{2}-b^{2}+r^{2}}{2a}$ より $h'=\dfrac ra$ である。(3) の`,
            },
            {
              k: "math",
              t: String.raw`\frac3\pi V=2r^{3}-2r^{2}h+(a-b)\left(h^{2}-r^{2}\right)`,
            },
            { k: "p", t: String.raw`を微分すると` },
            {
              k: "math",
              t: String.raw`\frac3\pi V'=6r^{2}-4rh-2r^{2}\cdot\frac ra+(a-b)\left(2h\cdot\frac ra-2r\right)`,
            },
            { k: "p", t: String.raw`である。$2r$ でくくると` },
            {
              k: "math",
              t: String.raw`\frac3\pi V'=2r\left\{3r-2h-\frac{r^{2}}a+\frac{(a-b)(h-a)}a\right\}`,
            },
            {
              k: "p",
              t: String.raw`となる。中かっこを $2a^{2}$ 倍し、$2ah=a^{2}-b^{2}+r^{2}$ を使って $h$ を消すと`,
            },
            {
              k: "math",
              t: String.raw`2a^{2}\left\{\;\cdots\;\right\}=-\left\{(3a+b)r^{2}-6a^{2}r+\left(3a^{3}-a^{2}b-ab^{2}-b^{3}\right)\right\}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`V'(r)=-\frac{\pi r}{3a^{2}}\left\{(3a+b)r^{2}-6a^{2}r+\left(3a^{3}-a^{2}b-ab^{2}-b^{3}\right)\right\}`,
            },
            { k: "p", t: String.raw`となる。中かっこの2次式を解く。判別式は` },
            {
              k: "math",
              t: String.raw`36a^{4}-4(3a+b)\left(3a^{3}-a^{2}b-ab^{2}-b^{3}\right)=4b^{2}(2a+b)^{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`r=\frac{6a^{2}\pm2b(2a+b)}{2(3a+b)}=\frac{3a^{2}\pm b(2a+b)}{3a+b}`,
            },
            { k: "p", t: String.raw`である。符号 $-$ のほうは` },
            {
              k: "math",
              t: String.raw`\frac{3a^{2}-2ab-b^{2}}{3a+b}=\frac{(3a+b)(a-b)}{3a+b}=a-b`,
            },
            {
              k: "p",
              t: String.raw`と、定義域の左端そのものである。したがって定義域の内部にある解は符号 $+$ のほうだけで`,
            },
            {
              k: "math",
              t: String.raw`r_0=\frac{3a^{2}+2ab+b^{2}}{3a+b}`,
            },
            { k: "p", t: String.raw`である（$r_0<a+b$ も確かめられる：$(a+b)(3a+b)-\left(3a^{2}+2ab+b^{2}\right)=2ab>0$）。` },
            {
              k: "p",
              t: String.raw`**増減。** 2次式は $(3a+b)\left(r-(a-b)\right)\left(r-r_0\right)$ と因数分解できるので`,
            },
            {
              k: "math",
              t: String.raw`V'(r)=-\frac{\pi r\,(3a+b)}{3a^{2}}\left(r-(a-b)\right)\left(r-r_0\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$a-b<r<r_0$ では $V'>0$、$r_0<r<a+b$ では $V'<0$。よって $r=r_0$ で最大になる。`,
            },
            {
              k: "math",
              t: String.raw`r(a)=\frac{3a^{2}+2ab+b^{2}}{3a+b}`,
            },
            { k: "p", t: String.raw`**極限。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
r(a)-a&=\frac{3a^{2}+2ab+b^{2}-a(3a+b)}{3a+b}=\frac{ab+b^{2}}{3a+b}=\frac{b(a+b)}{3a+b}\\[1mm]
&=\frac{b\left(1+\frac ba\right)}{3+\frac ba}\;\xrightarrow[a\to\infty]{}\;\frac b3
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$h$ も $r$ の関数なので、積の微分で $h'=\frac ra$ が出てくる。$h$ を定数扱いしない。`,
            String.raw`$V'=0$ の2次方程式の一方の解が $r=a-b$（定義域の端）になる。これに気づくと因数分解が速い。`,
            String.raw`$b$ は固定したまま $a\to\infty$ とする。$\frac{b(a+b)}{3a+b}$ で分母分子を $a$ で割る。`,
          ],
          check: String.raw`$(a,b)=(3,1.2),(5,2),(2,0.5)$ で $V(r)$ の最大を $20$ 万点に刻んで探すと $3.494112,\;5.823520,\;2.192310$ で、式の値 $3.494118,\;5.823529,\;2.192308$ と一致した。$b=1.2$ で $a=10,100,1000,100000$ とすると $r(a)-a$ は $0.4308,0.4032,0.4003,0.4000$ と $\frac b3=0.4$ に近づいた。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分法",
      topics: ["方程式の実数解の個数", "増減", "接する条件", "定数分離"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$e^{x}=\\frac{2x^{3}}{x-1}$ の負の解を $10^{-5}$ 刻みで探すと $x=-0.74539$ の1つだけだった",
          "$x^{3}-3x=e^{x}$ の負の解を同じ刻みで探すと $x=-1.70079,\;-0.26242$ の2つだった",
          "$G(x)=x^{2}-\\frac{e^{x}}x$ を $x<0$ で $200$ 万点に刻むと、最小値 $1.192251753$（$x=-0.745385$）をとり、両端で $+\\infty$ に発散することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`方程式 $e^{x}=\dfrac{2x^{3}}{x-1}$ の負の実数解の個数を求める`,
          answer: String.raw`1個`,
          approach: String.raw`$x<0$ では右辺が正で、$e^{x}$ は $0$ から $1$ へ増加する。右辺の増減を調べると単調減少なので、交わるのは1回だけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\varphi(x)=\dfrac{2x^{3}}{x-1}$ とおく。$x<0$ では $x^{3}<0$、$x-1<0$ なので $\varphi(x)>0$ である。`,
            },
            { k: "p", t: String.raw`**$\varphi$ の増減。** ` },
            {
              k: "math",
              t: String.raw`\varphi'(x)=\frac{6x^{2}(x-1)-2x^{3}}{(x-1)^{2}}=\frac{4x^{3}-6x^{2}}{(x-1)^{2}}=\frac{2x^{2}\left(2x-3\right)}{(x-1)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$x<0$ では $2x^{2}>0$、$2x-3<0$、$(x-1)^{2}>0$ なので $\varphi'(x)<0$、つまり $\varphi$ は**狭義減少**である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x\to-\infty$：$\varphi(x)=\dfrac{2x^{3}}{x-1}\approx2x^{2}\to+\infty$`,
                String.raw`$x\to-0$：$\varphi(x)\to\dfrac0{-1}=0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`一方 $e^{x}$ は $x<0$ で**狭義増加**し、$x\to-\infty$ で $0$、$x\to-0$ で $1$ に近づく。`,
            },
            {
              k: "p",
              t: String.raw`$\varphi(x)-e^{x}$ は（減少）$-$（増加）なので狭義減少で、$x\to-\infty$ で $+\infty$、$x\to-0$ で $0-1=-1<0$ である。中間値の定理より符号が変わる点がただ1つあり、求める個数は`,
            },
            { k: "math", t: String.raw`1\ \text{個}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この方程式は、(3) に出てくる「$y=x\left(x^{2}-a\right)$ と $y=e^{x}$ が接する」条件そのものである。接点では $x^{3}-ax=e^{x}$ と $3x^{2}-a=e^{x}$ が同時に成り立ち、$a$ を消すと $e^{x}=\dfrac{2x^{3}}{x-1}$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$x<0$ に限ると $\varphi>0$ で、$e^{x}$ と比べられる。$x>1$ などでは話が変わる。`,
            String.raw`$\varphi'$ の分子は $4x^{3}-6x^{2}=2x^{2}(2x-3)$ である。$x^{2}$ でくくると符号が $2x-3$ だけで決まる。`,
            String.raw`「減少する関数」と「増加する関数」が交わるのは高々1回。これで個数が確定する。`,
          ],
          check: String.raw`$x$ を $-10$ から $0$ まで $10^{-5}$ 刻みで調べると、符号が変わるのは $x=-0.74539$ の1か所だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$y=x\left(x^{2}-3\right)$ と $y=e^{x}$ のグラフの $x<0$ における共有点の個数を求める`,
          answer: String.raw`2個`,
          approach: String.raw`$\psi(x)=x^{3}-3x-e^{x}$ の増減を調べる。$\psi'=3x^{2}-3-e^{x}$ の符号が $x<0$ でどう変わるかを見る。`,
          blocks: [
            { k: "p", t: String.raw`$\psi(x)=x^{3}-3x-e^{x}$ とおく。$x<0$ での $\psi=0$ の解の個数を数える。` },
            { k: "p", t: String.raw`**$\psi'$ の符号。** ` },
            {
              k: "math",
              t: String.raw`\psi'(x)=3x^{2}-3-e^{x}=3\left(x^{2}-1\right)-e^{x}`,
            },
            {
              k: "p",
              t: String.raw`である。$x<0$ では $0<e^{x}<1$ なので`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-1\le x<0$：$3\left(x^{2}-1\right)\le0<e^{x}$ なので $\psi'<0$`,
                String.raw`$x<-1$：$3\left(x^{2}-1\right)$ は $x$ が小さいほど大きく（$x=-1$ で $0$、$x=-1.5$ で $3.75$）、$e^{x}$ は $x$ が小さいほど小さい。$x=-1$ で $\psi'=-e^{-1}<0$、$x=-1.5$ で $\psi'=3.75-e^{-1.5}>0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$x<-1$ では $3\left(x^{2}-1\right)$ が減少関数（$x$ について）、$e^{x}$ が増加関数なので $\psi'$ は狭義減少、したがって $\psi'=0$ となる $x_0$ が $-1.5<x_0<-1$ にただ1つある。まとめると`,
            },
            {
              k: "math",
              t: String.raw`x<x_0:\;\psi'>0\;(\text{増加}),\qquad x_0<x<0:\;\psi'<0\;(\text{減少})`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**値を見る。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x\to-\infty&:\;\psi\to-\infty\\[1mm]
\psi(-1)&=-1+3-e^{-1}=2-e^{-1}>0\\[1mm]
\psi(0)&=-1<0
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`$x_0<-1$ なので $\psi\left(x_0\right)\ge\psi(-1)>0$ である。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left(-\infty,x_0\right)$：$-\infty$ から $\psi(x_0)>0$ へ増加 → 解が1個`,
                String.raw`$\left(x_0,0\right)$：$\psi(x_0)>0$ から $-1<0$ へ減少 → 解が1個`,
              ],
            },
            { k: "p", t: String.raw`で、合わせて` },
            { k: "math", t: String.raw`2\ \text{個}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\psi'$ の零点が $x<0$ にちょうど1つであることを示す。$-1\le x<0$ では符号が決まり、$x<-1$ では単調性から1つと分かる。`,
            String.raw`$\psi(-1)=2-\frac1e>0$ が効く。$x_0$ の値を求める必要はなく、$\psi(x_0)\ge\psi(-1)>0$ で足りる。`,
            String.raw`$x\to-\infty$ では $x^{3}$ が効いて $\psi\to-\infty$。$e^{x}\to0$ なので $x^{3}-3x$ の挙動そのものである。`,
          ],
          check: String.raw`$x$ を $-10$ から $0$ まで $10^{-5}$ 刻みで調べると、符号が変わるのは $x=-1.70079$ と $x=-0.26242$ の2か所だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a>0$、$f(x)=x\left(x^{2}-a\right)$ とする。$y=f(x)$ と $y=e^{x}$ の $x<0$ における共有点が1個のみであるような $a$ がただ1つ存在することを示す`,
          answer: String.raw`$a=G(x)=x^{2}-\dfrac{e^{x}}x$ の最小値（$x<0$）がその $a$`,
          approach: String.raw`$a$ について解いて定数分離する。$x<0$ で $x^{3}-ax=e^{x}\iff a=x^{2}-\dfrac{e^{x}}x$。右辺を $G(x)$ とおくと、共有点の個数は $y=G(x)$ と $y=a$ の交点の個数である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x<0$ では $x\ne0$ なので、$x^{3}-ax=e^{x}$ は`,
            },
            {
              k: "math",
              t: String.raw`a=x^{2}-\frac{e^{x}}x\;=:\;G(x)`,
            },
            {
              k: "p",
              t: String.raw`と同値である。$x<0$ では $-\dfrac{e^{x}}x>0$ なので $G(x)>0$ で、共有点の個数は「$y=G(x)$（$x<0$）と水平線 $y=a$ の交点の個数」に等しい。`,
            },
            { k: "p", t: String.raw`**$G$ の増減。** ` },
            {
              k: "math",
              t: String.raw`G'(x)=2x-\frac{e^{x}\cdot x-e^{x}}{x^{2}}=2x-\frac{e^{x}(x-1)}{x^{2}}`,
            },
            { k: "p", t: String.raw`である。$G'(x)=0$ は両辺に $x^{2}$ を掛けて` },
            {
              k: "math",
              t: String.raw`2x^{3}=e^{x}(x-1)\quad\Longleftrightarrow\quad e^{x}=\frac{2x^{3}}{x-1}`,
            },
            {
              k: "p",
              t: String.raw`となり、これは (1) の方程式そのものである。よって $G'$ の零点は $x<0$ にちょうど1つ、それを $x_1$ とする。`,
            },
            { k: "p", t: String.raw`**両端での挙動。** ` },
            {
              k: "steps",
              items: [
                String.raw`$x\to-0$：$x^{2}\to0$、$-\dfrac{e^{x}}x\to-\dfrac1{-0}=+\infty$ なので $G\to+\infty$`,
                String.raw`$x\to-\infty$：$x^{2}\to+\infty$、$-\dfrac{e^{x}}x\to0$ なので $G\to+\infty$`,
              ],
            },
            {
              k: "p",
              t: String.raw`両端で $+\infty$ に発散し、途中の極値が1つだけなので、その $x_1$ は**極小**であり $G$ の最小値を与える。$m=G\left(x_1\right)>0$ とおくと増減は`,
            },
            {
              k: "math",
              t: String.raw`x<x_1:\;\text{減少},\qquad x_1<x<0:\;\text{増加}`,
            },
            { k: "p", t: String.raw`である。したがって $y=G(x)$ と $y=a$ の交点の個数は` },
            {
              k: "steps",
              items: [
                String.raw`$0<a<m$：$0$ 個`,
                String.raw`$a=m$：$1$ 個`,
                String.raw`$a>m$：$2$ 個`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。よって共有点がちょうど1個になる $a$ は $a=m$ のときに限り、そのような $a$ はただ1つ存在する。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$G(x)=x^{2}-\frac{e^{x}}x$（$x<0$）。両端で $+\infty$ に発散し、$x_1=-0.7454$ で最小値 $m=1.1923$ をとる。水平線 $y=a$ との交点の個数が共有点の個数で、$a=m$ のときだけ1個になる。$a=3$（(2) の場合）では2個である。`,
                view: [-3.3, 0.3, -0.8, 11.2],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: G23, from: -3.2, to: -0.09 },
                  { k: "seg", a: [-3.3, 1.192251753], b: [0.3, 1.192251753], dash: true },
                  { k: "seg", a: [-3.3, 3], b: [0.3, 3], dash: true, faint: true },
                  { k: "dot", at: [-0.745385, 1.192251753], label: "最小 m = 1.192", place: "below-left" },
                  { k: "dot", at: [-1.70079, 3], label: "a = 3 では2個", place: "above-left" },
                  { k: "dot", at: [-0.26242, 3], label: "", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$a$ について解いて定数分離するのが要点。$f$ と $e^{x}$ を直接比べると $a$ が2か所に入って扱いにくい。`,
            String.raw`$G'=0$ が (1) の方程式に一致する。(1) を「極値が1つしかない」ことの根拠に使う。`,
            String.raw`両端で $+\infty$ だから、唯一の極値は極小である。極大だと両端で $+\infty$ と矛盾する。`,
            String.raw`$a>0$ という条件は $G>0$ と整合している。$a\le0$ は最初から対象外である。`,
          ],
          check: String.raw`$G$ を $x<0$ で $200$ 万点に刻むと、最小値 $1.192251753$（$x=-0.745385$）をとり、$x\to-0$ で $99999$、$x=-10$ で $100.0$ と両端で大きくなった。$a=3$ では交点が2個（(2) と一致）だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["多項式の係数", "二項定理", "係数比較", "恒等式の証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,2,3,5,7$ で $P_n(x)$ を展開して係数 $ {}_n\\mathrm{B}_m$ を求めると、和がそれぞれ $1,2,6,120,5040$ で $n!$ と一致した",
          "$1\\le n\\le8$、$1\\le k\\le n$ のすべてで $\\sum_{j=k}^{n}{}_n\\mathrm{B}_j\\cdot{}_j\\mathrm{C}_k={}_{n+1}\\mathrm{B}_{k+1}$ を整数のまま確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`等式 $\displaystyle\sum_{m=1}^{n}{}_n\mathrm{B}_m=n!$ を示す`,
          answer: String.raw`$P_n(x)=\sum{}_n\mathrm{B}_m x^{m}$ に $x=1$ を代入する`,
          approach: String.raw`係数の和は $x=1$ を代入した値である。左辺の積が階乗になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P_n(x)=x(x+1)\cdots(x+n-1)=\displaystyle\sum_{m=1}^{n}{}_n\mathrm{B}_m\,x^{m}$ に $x=1$ を代入すると`,
            },
            {
              k: "math",
              t: String.raw`P_n(1)=1\cdot2\cdot3\cdots n=n!`,
            },
            { k: "p", t: String.raw`であり、右辺は` },
            {
              k: "math",
              t: String.raw`\sum_{m=1}^{n}{}_n\mathrm{B}_m\cdot1^{m}=\sum_{m=1}^{n}{}_n\mathrm{B}_m`,
            },
            { k: "p", t: String.raw`である。よって $\displaystyle\sum_{m=1}^{n}{}_n\mathrm{B}_m=n!$ が成り立つ。` },
          ],
          pitfalls: [
            String.raw`$P_n(x)$ は定数項をもたない（$x$ が因数）。だから和は $m=1$ から始まる。`,
            String.raw`$x=1$ を入れると $1\cdot2\cdots n$ で、$n$ 個の連続整数の積になる。`,
          ],
          check: String.raw`$n=1,2,3,5,7$ で係数を展開して足すと $1,2,6,120,5040$ となり、$n!$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`等式 $P_n(x+1)=\displaystyle\sum_{m=1}^{n}\left({}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_0+{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_1x+\cdots+{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_mx^{m}\right)$ を示す`,
          answer: String.raw`$P_n(x+1)=\sum{}_n\mathrm{B}_m(x+1)^{m}$ に二項定理を使うだけ`,
          approach: String.raw`$P_n$ の式の $x$ に $x+1$ を代入し、$(x+1)^{m}$ を二項定理で展開する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P_n(x)=\displaystyle\sum_{m=1}^{n}{}_n\mathrm{B}_m\,x^{m}$ は恒等式なので、$x$ を $x+1$ に置き換えてよい。`,
            },
            {
              k: "math",
              t: String.raw`P_n(x+1)=\sum_{m=1}^{n}{}_n\mathrm{B}_m\left(x+1\right)^{m}`,
            },
            { k: "p", t: String.raw`である。二項定理より` },
            {
              k: "math",
              t: String.raw`\left(x+1\right)^{m}=\sum_{j=0}^{m}{}_m\mathrm{C}_j\,x^{j}={}_m\mathrm{C}_0+{}_m\mathrm{C}_1x+\cdots+{}_m\mathrm{C}_mx^{m}`,
            },
            { k: "p", t: String.raw`なので、代入して` },
            {
              k: "math",
              t: String.raw`P_n(x+1)=\sum_{m=1}^{n}\left({}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_0+{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_1x+\cdots+{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_mx^{m}\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$P_n(x+1)=(x+1)(x+2)\cdots(x+n)$ でもあるが、ここでは係数の形が欲しいので展開した式のほうを使う。`,
            String.raw`二項定理の和は $j=0$ から始まる。$ {}_m\mathrm{C}_0=1$ の項（定数項）を落とさない。`,
          ],
          check: String.raw`$n=3$ で $P_3(x+1)=(x+1)(x+2)(x+3)$ を展開すると $x^{3}+6x^{2}+11x+6$ で、右辺の計算と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$k=1,2,\dots,n$ に対して $\displaystyle\sum_{j=k}^{n}{}_n\mathrm{B}_j\cdot{}_j\mathrm{C}_k={}_{n+1}\mathrm{B}_{k+1}$ を示す`,
          answer: String.raw`$P_{n+1}(x)=x\,P_n(x+1)$ の両辺で $x^{k+1}$ の係数を比べる`,
          approach: String.raw`$P_n(x+1)=(x+1)(x+2)\cdots(x+n)$ なので、$x$ を掛けると $P_{n+1}(x)$ になる。右辺は (2) で展開済みなので、係数比較すれば終わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P_n(x+1)=(x+1)(x+2)\cdots(x+n)$ だから`,
            },
            {
              k: "math",
              t: String.raw`x\,P_n(x+1)=x(x+1)(x+2)\cdots(x+n)=P_{n+1}(x)`,
            },
            { k: "p", t: String.raw`である。(2) の式に $x$ を掛けると` },
            {
              k: "math",
              t: String.raw`P_{n+1}(x)=\sum_{m=1}^{n}\sum_{j=0}^{m}{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_j\,x^{\,j+1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$x^{k+1}$ の係数を比べる。** 左辺 $P_{n+1}(x)=\displaystyle\sum_{m=1}^{n+1}{}_{n+1}\mathrm{B}_m\,x^{m}$ の $x^{k+1}$ の係数は $ {}_{n+1}\mathrm{B}_{k+1}$ である。`,
            },
            {
              k: "p",
              t: String.raw`右辺で $x^{j+1}=x^{k+1}$ となるのは $j=k$ のときだけ。$j\le m$ が必要なので $m$ は $k$ 以上 $n$ 以下を動き、係数は`,
            },
            {
              k: "math",
              t: String.raw`\sum_{m=k}^{n}{}_n\mathrm{B}_m\cdot{}_m\mathrm{C}_k`,
            },
            { k: "p", t: String.raw`である。$m$ を $j$ と書き直して` },
            {
              k: "math",
              t: String.raw`\sum_{j=k}^{n}{}_n\mathrm{B}_j\cdot{}_j\mathrm{C}_k={}_{n+1}\mathrm{B}_{k+1}`,
            },
            { k: "p", t: String.raw`が成り立つ。` },
            {
              k: "note",
              t: String.raw`$ {}_n\mathrm{B}_m$ は「$n$ 個のものを $m$ 個の輪に分ける場合の数」（第1種スターリング数）である。この等式はその組合せ的な意味からも説明できるが、ここでは多項式の係数比較だけで済む。`,
            },
          ],
          pitfalls: [
            String.raw`$x\,P_n(x+1)=P_{n+1}(x)$ に気づくのが要点。$P_n(x+1)$ は $(x+1)$ から $(x+n)$ までの積である。`,
            String.raw`和の範囲が $m\ge k$ になるのは、$ {}_m\mathrm{C}_k$ が $m<k$ で $0$ だからである（あるいは二項定理の和が $j\le m$ だから）。`,
            String.raw`左辺の添字は $k+1$、右辺は $j$（$=m$）から $k$ を選ぶ。1つずれるので気をつける。`,
          ],
          check: String.raw`$1\le n\le8$、$1\le k\le n$ のすべての組で、左辺と右辺を整数のまま計算して一致した。`,
        },
      ],
    },
  ],
};
