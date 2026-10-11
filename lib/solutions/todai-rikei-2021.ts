import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2021年度（令和3年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問(2) の上側・下側の境界。 */
const UP1 = (x: number) => x * x + 2 * Math.abs(x);
const LO1 = (x: number) => (Math.abs(x) >= 1 ? x * x - 2 * Math.abs(x) : x * x - 2);

/** 第3問。$C$ と接線。 */
const F3 = (x: number) => x / (x * x + 3);
const G3 = (x: number) => (x + 1) / 8;

/** 第5問。$f'(\theta)$ の符号を決める関数。 */
const H5 = (al: number) => (t: number) =>
  Math.cos(t / 2) * (t + Math.sin(t) + al) - Math.sin(t / 2) * (Math.cos(t) + 3);

export const todaiRikei2021: SolutionSet = {
  slug: "todai-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式",
      topics: ["2次方程式の解の配置", "領域の図示", "通過範囲", "1次式の値域"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$(X,Y)$ を格子で動かし、$a$ を細かく振って三角形の内部に入る $(a,b)$ があるかを直接探す判定と、答えの不等式による判定が、境界の刻み幅ぶんを除いて1点も食い違わないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $(a,b)$ のとりうる範囲を図示する`,
          answer: String.raw`3点 $(-2,0)$、$(2,0)$、$(0,-2)$ を頂点とする三角形の内部（周は含まない）`,
          approach: String.raw`共有点の $x$ 座標は $x^{2}+ax+b=-x^{2}$、すなわち2次方程式 $2x^{2}+ax+b=0$ の解である。「一方の解が $-1<x<0$、他方が $0<x<1$」は、2次関数の値の符号だけで言いかえられる。下に凸なので、$-1,\,0,\,1$ での値が「正・負・正」であればよい。`,
          blocks: [
            { k: "p", t: String.raw`共有点の $x$ 座標は $x^{2}+ax+b=-x^{2}$ の解、すなわち` },
            { k: "math", t: String.raw`h(x)=2x^{2}+ax+b=0` },
            {
              k: "p",
              t: String.raw`の解である。条件は「$h(x)=0$ が $-1<x<0$ と $0<x<1$ にそれぞれ解を1つずつもつ」ことである。$h$ は下に凸の2次関数なので、これは`,
            },
            { k: "math", t: String.raw`h(-1)>0,\qquad h(0)<0,\qquad h(1)>0` },
            { k: "p", t: String.raw`と同値である。それぞれ書き下すと` },
            { k: "math", t: String.raw`2-a+b>0,\qquad b<0,\qquad 2+a+b>0` },
            {
              k: "p",
              t: String.raw`すなわち $b>a-2$ かつ $b>-a-2$ かつ $b<0$ である。3直線 $b=a-2$、$b=-a-2$、$b=0$ の交点は $(0,-2)$、$(2,0)$、$(-2,0)$ なので、求める範囲はこの3点を頂点とする三角形の内部（周を含まない）である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`点 $(a,b)$ のとりうる範囲（網かけ）。3直線 $b=0$、$b=a-2$、$b=-a-2$ が境界で、境界は含まない。横軸が $a$、縦軸が $b$。`,
                view: [-3.1, 3.1, -3.0, 1.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[-2, 0], [2, 0], [0, -2]] },
                  { k: "seg", a: [-2, 0], b: [2, 0], dash: true },
                  { k: "seg", a: [2, 0], b: [0, -2], dash: true },
                  { k: "seg", a: [0, -2], b: [-2, 0], dash: true },
                  { k: "dot", at: [-2, 0], label: "(−2, 0)", place: "above-left" },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "above-right" },
                  { k: "dot", at: [0, -2], label: "(0, −2)", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`判別式を使う必要はない。$h(-1)>0$、$h(0)<0$、$h(1)>0$ が言えれば、中間値の定理から2つの区間に解が1つずつあり、2次方程式なのでそれで全部である。`,
            String.raw`「2つの共有点をもつ」はこの3条件に含まれている。$h(0)<0$ だけで相異なる2実解があることが従う。`,
          ],
          check: String.raw`$(a,b)=(0,-1)$ は三角形の内部にある。このとき $2x^{2}-1=0$ の解は $x=\pm\dfrac{1}{\sqrt2}=\pm0.707$ で、確かに $-1<x<0$ と $0<x<1$ に1つずつある。$(a,b)=(0,-3)$（三角形の外）では解が $\pm\sqrt{1.5}=\pm1.22$ となり範囲から外れる。`,
        },
        {
          label: "(2)",
          task: String.raw`放物線 $C$ の通りうる範囲を図示する`,
          answer: String.raw`$x^{2}+\min\left\{-2|x|,\,-2\right\}<y<x^{2}+2|x|$、すなわち $|x|\ge1$ では $(|x|-1)^{2}-1<y<(|x|+1)^{2}-1$、$|x|<1$ では $x^{2}-2<y<x^{2}+2|x|$（境界は含まない）`,
          approach: String.raw`点 $(X,Y)$ が $C$ 上にあるのは $Y=X^{2}+aX+b$ のときで、$X$ を固定すると $aX+b$ は $(a,b)$ の1次式である。1次式が三角形の内部を動くときにとる値の範囲は、3頂点での値の最小と最大のあいだの開区間になる。頂点が3つしかないので、各 $X$ について3つの値を比べるだけで済む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`点 $(X,Y)$ が条件をみたすある $C$ の上にあることは、(1) の三角形の内部にある $(a,b)$ で $Y=X^{2}+aX+b$ となるものが存在すること、すなわち`,
            },
            { k: "math", t: String.raw`Y-X^{2}\ \in\ \left\{aX+b\ \middle|\ (a,b)\ \text{は三角形の内部}\right\}` },
            {
              k: "p",
              t: String.raw`である。$X$ を固定すると $aX+b$ は $(a,b)$ の1次式である。三角形は凸で、1次式はその上で頂点のどこかで最大・最小になるから、内部を動かしたときにとる値の全体は、3頂点での値の**最小と最大のあいだの開区間**になる。3頂点での値は`,
            },
            {
              k: "math",
              t: String.raw`(-2,0)\mapsto-2X,\qquad (2,0)\mapsto2X,\qquad (0,-2)\mapsto-2`,
            },
            { k: "p", t: String.raw`である。最大は $\max\left\{-2X,2X,-2\right\}=2|X|$（$2|X|\ge0>-2$）、最小は` },
            {
              k: "math",
              t: String.raw`\min\left\{-2X,2X,-2\right\}=\min\left\{-2|X|,\ -2\right\}=\begin{cases}-2|X|&(|X|\ge1)\\[1mm]-2&(|X|<1)\end{cases}`,
            },
            { k: "p", t: String.raw`である。よって求める範囲は` },
            {
              k: "math",
              t: String.raw`x^{2}+\min\left\{-2|x|,\,-2\right\}<y<x^{2}+2|x|`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\begin{cases}\left(|x|-1\right)^{2}-1<y<\left(|x|+1\right)^{2}-1&(|x|\ge1)\\[1mm]x^{2}-2<y<\left(|x|+1\right)^{2}-1&(|x|<1)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`で、境界は含まない。$|x|=1$ では下側の2つの式がどちらも $-1$ を与え、つながっている。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`放物線 $C$ の通りうる範囲（網かけ）。上の境界は $y=x^{2}+2|x|$、下の境界は $|x|\ge1$ で $y=x^{2}-2|x|$、$|x|<1$ で $y=x^{2}-2$。境界は含まない。縦方向は縮めて描いてある。`,
                view: [-2.45, 2.45, -2.6, 9.6],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fillBetween", top: UP1, bottom: LO1, from: -2.4, to: 2.4 },
                  { k: "curve", f: UP1, from: -2.4, to: 2.4, dash: true },
                  { k: "curve", f: LO1, from: -2.4, to: 2.4, dash: true },
                  { k: "dot", at: [0, 0], label: "(0, 0)", place: "above-right" },
                  { k: "dot", at: [0, -2], label: "(0, −2)", place: "below" },
                  { k: "dot", at: [1, -1], label: "(1, −1)", place: "below-right" },
                  { k: "dot", at: [-1, -1], label: "(−1, −1)", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$(a,b)$ を個別に動かすのではなく、$X$ を固定して「$aX+b$ という1つの量」の値域を見るのが要点である。1次式なので、凸領域の上での値域は頂点だけ調べれば決まる。`,
            String.raw`$\min\left\{-2X,2X\right\}=-2|X|$ と $-2$ の大小が $|X|=1$ で入れかわるので、下側の境界はそこで式が変わる。上側は $\max\left\{-2X,2X\right\}=2|X|$ がつねに $-2$ 以上なので、場合分けは要らない。`,
            String.raw`三角形の周は含まないので、求める範囲も開区間になり、境界の曲線は含まない。`,
          ],
          check: String.raw`$x=0$ では $y=b$ で、$b$ は $-2<b<0$ を動く。式でも下側 $0-2=-2$、上側 $0+0=0$ で一致する。$x=2$ では下側 $4-4=0$、上側 $4+4=8$。実際 $(a,b)=(2,0)$ の極限で $y=x^{2}+2x$ が上の境界、$(-2,0)$ の極限で $y=x^{2}-2x$ が下の境界になる。$(X,Y)$ を格子で動かして $a$ を細かく振る総当たりの判定とも、境界の近傍を除いて1点も食い違わなかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["複素数の連立", "1次変換の像", "凸多角形", "領域の図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha,\\beta,\\gamma$ をランダムな複素数で $2000$ 組とり、導いた $a,b,c$ から $f(0),f(1),f(i)$ を計算し直して一致することを確かめた",
          "$\\alpha,\\beta,\\gamma$ を $[1,2]$ のランダムな実数で $2000$ 組とり、$f(2)=(3\\beta-\\gamma-\\alpha)+(\\beta+\\gamma-2\\alpha)i$ が成り立つことを確かめた",
          "立方体 $[1,2]^{3}$ を $31^{3}$ の格子で動かした像がすべて六角形に入ること、逆に六角形の格子点すべてについて $[1,2]$ 内の $\\alpha,\\beta,\\gamma$ が見つかることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(0)=\alpha$、$f(1)=\beta$、$f(i)=\gamma$ のとき $a,b,c$ を $\alpha,\beta,\gamma$ で表す`,
          answer: String.raw`$a=\dfrac{(\beta-\gamma)+(\beta+\gamma-2\alpha)i}{2}$、$b=\dfrac{(\beta+\gamma-2\alpha)(1-i)}{2}$、$c=\alpha$`,
          approach: String.raw`$f(0)=c$ がすぐ出るので、残りは $a,b$ の2元1次連立である。$i^{2}=-1$ を使って $f(i)=-a+bi+c$ とだけ気をつければ、あとは複素数の計算で解ける。`,
          blocks: [
            { k: "p", t: String.raw`$f(0)=c=\alpha$ である。また` },
            {
              k: "math",
              t: String.raw`f(1)=a+b+c=\beta,\qquad f(i)=a\cdot i^{2}+bi+c=-a+bi=\gamma-c`,
            },
            { k: "p", t: String.raw`なので、$p=\beta-\alpha$、$q=\gamma-\alpha$ とおくと` },
            { k: "math", t: String.raw`a+b=p,\qquad -a+bi=q` },
            { k: "p", t: String.raw`となる。$b=p-a$ を2つめに入れると $-a+(p-a)i=q$、すなわち $-a(1+i)=q-pi$ で` },
            {
              k: "math",
              t: String.raw`a=\frac{pi-q}{1+i}=\frac{(pi-q)(1-i)}{2}=\frac{(p-q)+(p+q)i}{2}`,
            },
            { k: "p", t: String.raw`を得る。さらに` },
            {
              k: "math",
              t: String.raw`b=p-a=\frac{2p-(p-q)-(p+q)i}{2}=\frac{(p+q)(1-i)}{2}`,
            },
            { k: "p", t: String.raw`である。$p-q=\beta-\gamma$、$p+q=\beta+\gamma-2\alpha$ だから` },
            {
              k: "math",
              t: String.raw`a=\frac{(\beta-\gamma)+(\beta+\gamma-2\alpha)i}{2},\qquad b=\frac{(\beta+\gamma-2\alpha)(1-i)}{2},\qquad c=\alpha`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          check: String.raw`$f(z)=z^{2}$ なら $\alpha=0$、$\beta=1$、$\gamma=i^{2}=-1$ で、式に入れると $a=\dfrac{2+0}{2}=1$、$b=0$、$c=0$ となり元に戻る。$f(z)=z$ なら $\alpha=0$、$\beta=1$、$\gamma=i$ で $a=\dfrac{(1-i)+(1+i)i}{2}=0$、$b=\dfrac{(1+i)(1-i)}{2}=1$ となり、やはり戻る。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(0),f(1),f(i)$ がいずれも $1$ 以上 $2$ 以下の実数であるとき、$f(2)$ のとりうる範囲を図示する`,
          answer: String.raw`6点 $-2i$、$3-i$、$4+i$、$3+2i$、$i$、$-1-i$ を頂点とする六角形の周と内部（$x+y$、$2x-y$、$x-3y$ がそれぞれ $[-2,5]$、$[-1,7]$、$[-3,6]$ に入る点の全体）`,
          approach: String.raw`$f(2)=4a+2b+c$ を (1) の式で $\alpha,\beta,\gamma$ に書き直すと、実部も虚部も $\alpha,\beta,\gamma$ の1次式になる。つまり $f(2)$ は立方体 $1\le\alpha,\beta,\gamma\le2$ を1次式で平面に写した像である。1次式による凸な立体の像は凸多角形になるので、立方体の8頂点の像をとってその凸包を求めればよい。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
4a&=2(\beta-\gamma)+2(\beta+\gamma-2\alpha)i\\[1mm]
2b&=(\beta+\gamma-2\alpha)(1-i)\\[1mm]
c&=\alpha
\end{aligned}`,
            },
            { k: "p", t: String.raw`だから、$f(2)=4a+2b+c$ の実部と虚部はそれぞれ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\text{実部}&=2(\beta-\gamma)+(\beta+\gamma-2\alpha)+\alpha=3\beta-\gamma-\alpha\\[1mm]
\text{虚部}&=2(\beta+\gamma-2\alpha)-(\beta+\gamma-2\alpha)=\beta+\gamma-2\alpha
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。すなわち` },
            {
              k: "math",
              t: String.raw`f(2)=\left(3\beta-\gamma-\alpha\right)+\left(\beta+\gamma-2\alpha\right)i\qquad\left(1\le\alpha,\beta,\gamma\le2\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\alpha=1+s$、$\beta=1+t$、$\gamma=1+u$（$0\le s,t,u\le1$）とおくと`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{実部},\ \text{虚部}\right)=(1,0)+s(-1,-2)+t(3,1)+u(-1,1)`,
            },
            {
              k: "p",
              t: String.raw`となる。$s,t,u$ はそれぞれ $0$ から $1$ まで独立に動くので、像は立方体を1次式で写したもの、すなわち凸多角形で、その頂点は $(s,t,u)$ が立方体の頂点（各成分が $0$ か $1$）のときの像の中にある。8頂点の像は`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
&(0,0,0)\to(1,0),\quad(1,0,0)\to(0,-2),\quad(0,1,0)\to(4,1),\quad(0,0,1)\to(0,1)\\[1mm]
&(1,1,0)\to(3,-1),\quad(1,0,1)\to(-1,-1),\quad(0,1,1)\to(3,2),\quad(1,1,1)\to(2,0)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。このうち $(1,0)$ と $(2,0)$ は他の6点でできる六角形の内部にあるので、像は`,
            },
            {
              k: "math",
              t: String.raw`(0,-2),\ (3,-1),\ (4,1),\ (3,2),\ (0,1),\ (-1,-1)`,
            },
            {
              k: "p",
              t: String.raw`を頂点とする六角形（周を含む）である。$\alpha,\beta,\gamma$ の動く範囲が閉じているので、境界も含む。6本の辺を不等式で書くと`,
            },
            {
              k: "math",
              t: String.raw`-2\le x+y\le5,\qquad -1\le 2x-y\le7,\qquad -3\le x-3y\le6`,
            },
            { k: "p", t: String.raw`（$x$ が実部、$y$ が虚部）となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$f(2)$ のとりうる範囲（網かけ）。6点 $-2i,\ 3-i,\ 4+i,\ 3+2i,\ i,\ -1-i$ を頂点とする六角形で、周も含む。横軸が実部、縦軸が虚部。`,
                view: [-2.4, 5.4, -3.2, 3.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, -2], [3, -1], [4, 1], [3, 2], [0, 1], [-1, -1]] },
                  { k: "seg", a: [0, -2], b: [3, -1] },
                  { k: "seg", a: [3, -1], b: [4, 1] },
                  { k: "seg", a: [4, 1], b: [3, 2] },
                  { k: "seg", a: [3, 2], b: [0, 1] },
                  { k: "seg", a: [0, 1], b: [-1, -1] },
                  { k: "seg", a: [-1, -1], b: [0, -2] },
                  { k: "dot", at: [0, -2], label: "−2i", place: "below" },
                  { k: "dot", at: [3, -1], label: "3−i", place: "below-right" },
                  { k: "dot", at: [4, 1], label: "4+i", place: "right" },
                  { k: "dot", at: [3, 2], label: "3+2i", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "i", place: "above-left" },
                  { k: "dot", at: [-1, -1], label: "−1−i", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\alpha,\beta,\gamma$ が実数であることを使うと、$f(2)$ の実部・虚部がそれぞれ $\alpha,\beta,\gamma$ の実1次式になる。複素数のまま動かそうとすると見通しが悪い。`,
            String.raw`8頂点の像のうち2つは内部に落ちる。全部を頂点として結んではいけない。`,
            String.raw`$\alpha,\beta,\gamma$ の範囲は閉区間なので、答えの六角形も周を含む。`,
          ],
          check: String.raw`$\alpha=\beta=\gamma=1$ なら $f(2)=3-1-1=1$、虚部 $1+1-2=0$ で $(1,0)$、たしかに六角形の内部にある。$\alpha,\beta,\gamma$ を $[1,2]$ の格子 $31^{3}$ 通りで動かした像はすべて3つの不等式をみたし、逆に六角形内の格子点それぞれについて $[1,2]$ の中の $\alpha,\beta,\gamma$ が見つかった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分法・積分法",
      topics: ["接線", "分数関数", "部分分数", "三角関数による置換積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f'(1)=\\frac18$ を数値微分で確かめ、$f(-3)-g(-3)=0$ を直接代入で確かめた",
          "$\\int_{-3}^{1}\\{f(x)-g(x)\\}^{2}dx$ をシンプソン法で数値積分して $0.1042844721$ を得て、$\\frac{5\\sqrt3}{24}\\pi+\\frac{\\log3}{8}-\\frac76=0.1042844721$ と小数10桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C$ と $\ell$ の共有点で $\mathrm{A}$ と異なるものがただ1つ存在することを示し、その $x$ 座標を求める`,
          answer: String.raw`$x=-3$`,
          approach: String.raw`共有点の方程式を作ると分母が払えて3次方程式になる。接点では重解になるはずなので、$(x-1)^{2}$ でくくれる。残る1次因子が答えを与える。`,
          blocks: [
            { k: "p", t: String.raw`$f'(x)=\dfrac{\left(x^{2}+3\right)-x\cdot2x}{\left(x^{2}+3\right)^{2}}=\dfrac{3-x^{2}}{\left(x^{2}+3\right)^{2}}$ より $f(1)=\dfrac14$、$f'(1)=\dfrac{2}{16}=\dfrac18$ なので` },
            { k: "math", t: String.raw`g(x)=\frac14+\frac18(x-1)=\frac{x+1}{8}` },
            { k: "p", t: String.raw`である。共有点は $\dfrac{x}{x^{2}+3}=\dfrac{x+1}{8}$ の解で、$x^{2}+3>0$ だから分母を払って` },
            {
              k: "math",
              t: String.raw`8x=(x+1)\left(x^{2}+3\right)\iff x^{3}+x^{2}-5x+3=0`,
            },
            { k: "p", t: String.raw`となる。$x=1$ は接点だから重解のはずで、実際` },
            { k: "math", t: String.raw`x^{3}+x^{2}-5x+3=(x-1)^{2}(x+3)` },
            {
              k: "p",
              t: String.raw`と因数分解できる。よって解は $x=1$（2重）と $x=-3$ だけで、$\mathrm{A}$ と異なる共有点はただ1つ、$x=-3$ の点である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=f(x)$ のグラフ（曲線）と点 $\mathrm{A}(1,\frac14)$ での接線 $\ell$（直線）。$x=-3$ でもう一度交わる。縦方向は拡大して描いてある。`,
                view: [-4.6, 3.2, -0.5, 0.5],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: F3, from: -4.5, to: 3.1 },
                  { k: "seg", a: [-4.5, G3(-4.5)], b: [3.1, G3(3.1)] },
                  { k: "dot", at: [1, 0.25], label: "A", place: "above-left" },
                  { k: "dot", at: [-3, -0.25], label: "x = −3", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$f(-3)=\dfrac{-3}{9+3}=-\dfrac14$、$g(-3)=\dfrac{-3+1}{8}=-\dfrac14$ で一致する。また $(x-1)^{2}(x+3)$ を展開すると $\left(x^{2}-2x+1\right)(x+3)=x^{3}+x^{2}-5x+3$ となり、元の式に戻る。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\int_{\alpha}^{1}\left\{f(x)-g(x)\right\}^{2}dx$ を計算する`,
          answer: String.raw`$\dfrac{5\sqrt3}{24}\pi+\dfrac{\log3}{8}-\dfrac76$`,
          approach: String.raw`$f-g$ は分母が $x^{2}+3$ の分数式で、分子は (1) で求めた3次式である。2乗すると分母が $\left(x^{2}+3\right)^{2}$ になって扱いにくいが、先に**分子を分母で割って**おくと「多項式」「$\frac{1}{x^{2}+3}$ 型」「$\frac{x}{x^{2}+3}$ 型」「$\frac{1}{\left(x^{2}+3\right)^{2}}$ 型」の4種類に分かれ、どれも計算できる形になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`f(x)-g(x)=\frac{8x-(x+1)\left(x^{2}+3\right)}{8\left(x^{2}+3\right)}=-\frac{x^{3}+x^{2}-5x+3}{8\left(x^{2}+3\right)}`,
            },
            { k: "p", t: String.raw`である。ここで分子を分母で割ると` },
            {
              k: "math",
              t: String.raw`x^{3}+x^{2}-5x+3=\left(x^{2}+3\right)(x+1)-8x`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`\left\{f(x)-g(x)\right\}^{2}=\frac{1}{64}\left\{(x+1)-\frac{8x}{x^{2}+3}\right\}^{2}=\frac{1}{64}\left\{(x+1)^{2}-\frac{16x(x+1)}{x^{2}+3}+\frac{64x^{2}}{\left(x^{2}+3\right)^{2}}\right\}`,
            },
            { k: "p", t: String.raw`となる。$\alpha=-3$ として3つの部分を順に計算する。まず` },
            {
              k: "math",
              t: String.raw`\int_{-3}^{1}(x+1)^{2}dx=\left[\frac{(x+1)^{3}}{3}\right]_{-3}^{1}=\frac83+\frac83=\frac{16}{3}`,
            },
            { k: "p", t: String.raw`である。次に $\dfrac{x^{2}+x}{x^{2}+3}=1+\dfrac{x-3}{x^{2}+3}$ と直すと` },
            {
              k: "math",
              t: String.raw`\int_{-3}^{1}\frac{x}{x^{2}+3}dx=\left[\frac12\log\left(x^{2}+3\right)\right]_{-3}^{1}=\frac12\log\frac{4}{12}=-\frac12\log3`,
            },
            { k: "p", t: String.raw`であり、$x=\sqrt3\tan\theta$ と置換すると $x=-3$ で $\theta=-\dfrac\pi3$、$x=1$ で $\theta=\dfrac\pi6$ なので` },
            {
              k: "math",
              t: String.raw`\int_{-3}^{1}\frac{dx}{x^{2}+3}=\frac{1}{\sqrt3}\int_{-\frac\pi3}^{\frac\pi6}d\theta=\frac{1}{\sqrt3}\cdot\frac\pi2=\frac{\sqrt3}{6}\pi`,
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`-16\int_{-3}^{1}\frac{x^{2}+x}{x^{2}+3}dx=-16\left\{4-\frac12\log3-3\cdot\frac{\sqrt3}{6}\pi\right\}=-64+8\log3+8\sqrt3\,\pi`,
            },
            {
              k: "p",
              t: String.raw`である。最後に $\dfrac{x^{2}}{\left(x^{2}+3\right)^{2}}=\dfrac{1}{x^{2}+3}-\dfrac{3}{\left(x^{2}+3\right)^{2}}$ と直す。$\dfrac{1}{\left(x^{2}+3\right)^{2}}$ の積分は、$\left(\dfrac{x}{x^{2}+3}\right)'=\dfrac{3-x^{2}}{\left(x^{2}+3\right)^{2}}$ と $3-x^{2}=6-\left(x^{2}+3\right)$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac{x}{x^{2}+3}\right)'=\frac{6}{\left(x^{2}+3\right)^{2}}-\frac{1}{x^{2}+3}`,
            },
            { k: "p", t: String.raw`と書けることから` },
            {
              k: "math",
              t: String.raw`\int_{-3}^{1}\frac{dx}{\left(x^{2}+3\right)^{2}}=\frac16\left\{\left[\frac{x}{x^{2}+3}\right]_{-3}^{1}+\int_{-3}^{1}\frac{dx}{x^{2}+3}\right\}=\frac16\left(\frac14+\frac14+\frac{\sqrt3}{6}\pi\right)=\frac{1}{12}+\frac{\sqrt3}{36}\pi`,
            },
            { k: "p", t: String.raw`となる。したがって` },
            {
              k: "math",
              t: String.raw`64\int_{-3}^{1}\frac{x^{2}}{\left(x^{2}+3\right)^{2}}dx=64\left\{\frac{\sqrt3}{6}\pi-3\left(\frac1{12}+\frac{\sqrt3}{36}\pi\right)\right\}=\frac{16\sqrt3}{3}\pi-16`,
            },
            { k: "p", t: String.raw`である。3つを足して $\dfrac{1}{64}$ 倍すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_{-3}^{1}\left\{f-g\right\}^{2}dx&=\frac{1}{64}\left\{\frac{16}{3}-64+8\log3+8\sqrt3\,\pi+\frac{16\sqrt3}{3}\pi-16\right\}\\[1mm]
&=\frac{1}{64}\left\{-\frac{224}{3}+8\log3+\frac{40\sqrt3}{3}\pi\right\}=\frac{5\sqrt3}{24}\pi+\frac{\log3}{8}-\frac76
\end{aligned}`,
            },
            { k: "p", t: String.raw`を得る。` },
          ],
          pitfalls: [
            String.raw`$\left(f-g\right)^{2}$ をそのまま展開すると分母が4次になって手が止まる。先に分子を分母で割り、$(x+1)-\dfrac{8x}{x^{2}+3}$ の形にしてから2乗する。`,
            String.raw`$\displaystyle\int\frac{dx}{\left(x^{2}+3\right)^{2}}$ は公式を覚えていなくても、$\dfrac{x}{x^{2}+3}$ を微分すれば $\dfrac{1}{\left(x^{2}+3\right)^{2}}$ と $\dfrac{1}{x^{2}+3}$ の関係が出るので、そこから求まる。`,
            String.raw`$\tan$ の置換で、$x=-3$ に対応する $\theta$ は $-\dfrac\pi3$ である（$\tan\theta=-\sqrt3$）。符号を落としやすい。`,
          ],
          check: String.raw`$\dfrac{5\sqrt3}{24}\pi+\dfrac{\log3}{8}-\dfrac76=1.133685+0.137327-1.166667=0.104284$。被積分関数をそのままシンプソン法で $-3$ から $1$ まで数値積分すると $0.1042844721$ となり、小数10桁まで一致する。被積分関数は2乗なので値が正であることとも合う。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数",
      topics: ["合同式", "二項係数", "階乗の2の指数", "組合せの整除"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$2\\le a\\le13$、$1\\le b<a$ のすべてで $ {}_{4a+1}\\mathrm{C}_{4b+1}$ と $ {}_{a}\\mathrm{C}_{b}$ の2の指数が一致する（奇数 $K,L$ が取れる）ことを確かめた",
          "$2\\le a\\le15$ で $a-b$ が偶数のすべての組について、$ {}_{4a+1}\\mathrm{C}_{4b+1}$ と $ {}_{a}\\mathrm{C}_{b}$ を $4$ で割った余りが一致することを多倍長整数で確かめた",
          "$ {}_{2021}\\mathrm{C}_{37}$ を多倍長整数で直接計算して $4$ で割った余りが $3$ であることを確かめ、$ {}_{505}\\mathrm{C}_{9}$、$ {}_{126}\\mathrm{C}_{2}$ の余りもどちらも $3$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$K,L$ が正の奇数、$A,B$ が正の整数で $KA=LB$ のとき、$K\equiv L\pmod4$ ならば $A\equiv B\pmod4$ であることを示す`,
          answer: String.raw`$K(A-B)=(L-K)B$ が $4$ の倍数で、$K$ が奇数だから $A-B$ が $4$ の倍数`,
          approach: String.raw`$A-B$ が $4$ の倍数であることを示したい。$KA=LB$ から $K(A-B)$ を作ると、残りが $(L-K)B$ になり、仮定からこれは $4$ の倍数である。あとは $K$ が奇数、つまり $4$ と互いに素であることを使う。`,
          blocks: [
            { k: "p", t: String.raw`$KA=LB$ より` },
            { k: "math", t: String.raw`K(A-B)=KA-KB=LB-KB=(L-K)B` },
            {
              k: "p",
              t: String.raw`である。仮定より $L-K$ は $4$ の倍数なので、右辺は $4$ の倍数である。よって $K(A-B)$ は $4$ の倍数である。`,
            },
            {
              k: "p",
              t: String.raw`$K$ は奇数なので $K$ と $4$ は互いに素である。したがって $A-B$ が $4$ の倍数でなければならない。すなわち $A$ を $4$ で割った余りと $B$ を $4$ で割った余りは等しい。`,
            },
          ],
          pitfalls: [
            String.raw`$KA=LB$ の両辺を $K$ で割ってはいけない。$A-B$ を作ってから「奇数と $4$ が互いに素」を使う。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$a>b>0$ のとき、$A={}_{4a+1}\mathrm{C}_{4b+1}$、$B={}_{a}\mathrm{C}_{b}$ に対して $KA=LB$ となる正の奇数 $K,L$ が存在することを示す`,
          answer: String.raw`$(4n)!=2^{3n}\,n!\,c_n$（$c_n$ は奇数）と書けて、$K=(4b+1)c_bc_{a-b}$、$L=(4a+1)c_a$ とすればよい`,
          approach: String.raw`$\dfrac AB$ を階乗で書き下して、$2$ のべきだけを取り出す。$(4n)!$ の中の偶数をまとめて $2$ をくくり出すと、$(4n)!=2^{3n}\,n!\times(\text{奇数})$ という形になる。この「奇数」の部分が、そのまま $K,L$ の材料になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$2$ のべきをくくり出す。** $1$ から $2n$ までの積で、偶数だけを集めると $2\cdot4\cdots2n=2^{n}n!$ だから`,
            },
            { k: "math", t: String.raw`(2n)!=\left(\text{$2n$ 以下の奇数の積}\right)\times2^{n}n!` },
            { k: "p", t: String.raw`である。これを2回使うと` },
            {
              k: "math",
              t: String.raw`(4n)!=\left(\text{$4n$ 以下の奇数の積}\right)\times2^{2n}(2n)!=\left(\text{奇数}\right)\times2^{3n}\,n!`,
            },
            {
              k: "p",
              t: String.raw`となる。そこで正の奇数 $c_n$ を $(4n)!=2^{3n}\,n!\,c_n$ で定める（$c_0=1$）。`,
            },
            { k: "p", t: String.raw`**$\dfrac AB$ を書く。** $m=a-b\ (\ge1)$ とおく。` },
            {
              k: "math",
              t: String.raw`\frac AB=\frac{(4a+1)!}{(4b+1)!\,(4m)!}\cdot\frac{b!\,m!}{a!}=\frac{(4a+1)!}{a!}\cdot\frac{b!}{(4b+1)!}\cdot\frac{m!}{(4m)!}`,
            },
            { k: "p", t: String.raw`であり、$\dfrac{(4n+1)!}{n!}=(4n+1)\cdot\dfrac{(4n)!}{n!}=(4n+1)2^{3n}c_n$ だから` },
            {
              k: "math",
              t: String.raw`\frac AB=\frac{(4a+1)2^{3a}c_a}{(4b+1)2^{3b}c_b\cdot2^{3m}c_m}=\frac{(4a+1)c_a}{(4b+1)c_bc_m}`,
            },
            { k: "p", t: String.raw`となる（$a=b+m$ なので $2$ のべきはすべて打ち消し合う）。したがって` },
            {
              k: "math",
              t: String.raw`K=(4b+1)c_bc_m,\qquad L=(4a+1)c_a`,
            },
            {
              k: "p",
              t: String.raw`とおけば $KA=LB$ が成り立つ。$4b+1$、$4a+1$ は奇数、$c_b,c_m,c_a$ も奇数なので、$K,L$ はともに正の奇数である。`,
            },
          ],
          pitfalls: [
            String.raw`$2$ のべきが打ち消し合うのは $3a=3b+3m$、つまり $a=b+m$ だからである。$4a+1$、$4b+1$ という「$4$ で割ると $1$ 余る形」が効いていて、$1$ がずれると成り立たない。`,
          ],
          check: String.raw`$a=4$、$b=1$ なら $A={}_{17}\mathrm{C}_{5}=6188=2^{2}\cdot7\cdot13\cdot17$、$B={}_{4}\mathrm{C}_{1}=4$ で、$2$ の指数はどちらも $2$ である。$2\le a\le13$ の範囲のすべての $(a,b)$ で $2$ の指数が一致することを確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`さらに $a-b$ が $2$ で割り切れるとき、$ {}_{4a+1}\mathrm{C}_{4b+1}$ と $ {}_{a}\mathrm{C}_{b}$ を $4$ で割った余りが等しいことを示す`,
          answer: String.raw`(2) の $K,L$ が $K\equiv L\pmod4$ をみたすので、(1) が使える`,
          approach: String.raw`(1) を使うには $K\equiv L\pmod4$ を言えばよい。$4a+1\equiv4b+1\equiv1\pmod4$ なので、残るのは $c_bc_m\equiv c_a\pmod4$ である。$c_n$ の漸化式を $4$ を法として見ると、$c_n$ の余りは $n$ を $4$ で割った余りだけで決まることが分かる。`,
          blocks: [
            { k: "p", t: String.raw`**$c_n$ を $4$ で割った余り。** 定義から` },
            {
              k: "math",
              t: String.raw`\frac{c_{n+1}}{c_n}=\frac{(4n+4)!}{(4n)!}\cdot\frac{n!}{(n+1)!}\cdot\frac{1}{2^{3}}=\frac{(4n+1)(4n+2)(4n+3)(4n+4)}{8(n+1)}`,
            },
            { k: "p", t: String.raw`で、$(4n+2)(4n+4)=8(2n+1)(n+1)$ だから` },
            { k: "math", t: String.raw`c_{n+1}=c_n(4n+1)(4n+3)(2n+1)` },
            {
              k: "p",
              t: String.raw`となる。$4$ を法とすると $4n+1\equiv1$、$4n+3\equiv3$ なので $c_{n+1}\equiv3(2n+1)c_n$ であり、$n$ が偶数なら $2n+1\equiv1$ で $c_{n+1}\equiv3c_n$、$n$ が奇数なら $2n+1\equiv3$ で $c_{n+1}\equiv9c_n\equiv c_n$ となる。$c_0=1$ から順に`,
            },
            {
              k: "math",
              t: String.raw`c_0\equiv1,\quad c_1\equiv3,\quad c_2\equiv3,\quad c_3\equiv1,\quad c_4\equiv1,\quad c_5\equiv3,\ \dots\pmod4`,
            },
            {
              k: "p",
              t: String.raw`となり、$c_n$ を $4$ で割った余りは $n$ を $4$ で割った余りだけで決まって`,
            },
            {
              k: "math",
              t: String.raw`c_n\equiv\begin{cases}1&\left(n\equiv0,3\pmod4\right)\\[1mm]3&\left(n\equiv1,2\pmod4\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$K\equiv L$ を示す。** $4a+1\equiv4b+1\equiv1\pmod4$ なので、(2) の $K,L$ について $K\equiv c_bc_m$、$L\equiv c_a=c_{b+m}\pmod4$ である。$m=a-b$ が偶数のとき $c_bc_m\equiv c_{b+m}$ を示す。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$m\equiv0\pmod4$ のとき：$c_m\equiv1$、また $b+m\equiv b$ なので $c_{b+m}\equiv c_b$。両辺とも $c_b$ になり成り立つ。`,
                String.raw`$m\equiv2\pmod4$ のとき：$c_m\equiv3$、また $b+m\equiv b+2$ である。$b$ を $4$ で割った余りで4通り調べると、$b\equiv0$ では $3\cdot1=3$ と $c_2\equiv3$、$b\equiv1$ では $3\cdot3\equiv1$ と $c_3\equiv1$、$b\equiv2$ では $3\cdot3\equiv1$ と $c_4\equiv1$、$b\equiv3$ では $3\cdot1=3$ と $c_5\equiv3$ で、いずれも一致する。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $K\equiv L\pmod4$ であり、(1) より $A$ と $B$ を $4$ で割った余りは等しい。すなわち $ {}_{4a+1}\mathrm{C}_{4b+1}$ と $ {}_{a}\mathrm{C}_{b}$ を $4$ で割った余りは等しい。`,
            },
          ],
          pitfalls: [
            String.raw`$m$ が奇数だと $c_bc_m\equiv c_{b+m}$ は崩れる。たとえば $b=1$、$m=1$ なら左辺 $3\cdot3\equiv1$、右辺 $c_2\equiv3$ で一致しない。「$a-b$ が偶数」という条件はここで効いている。`,
          ],
          check: String.raw`$a=4$、$b=2$（$a-b=2$）では $ {}_{17}\mathrm{C}_{9}=24310$ で $4$ で割ると $2$ 余り、$ {}_{4}\mathrm{C}_{2}=6$ も $2$ 余る。$2\le a\le15$ で $a-b$ が偶数のすべての組を多倍長整数で調べても例外はなかった。`,
        },
        {
          label: "(4)",
          task: String.raw`$ {}_{2021}\mathrm{C}_{37}$ を $4$ で割った余りを求める`,
          answer: String.raw`$3$`,
          approach: String.raw`$2021=4\cdot505+1$、$37=4\cdot9+1$ なので (3) がそのまま使える。$505$ と $9$ もまた「$4$ で割ると $1$ 余る形」なので、もう一度使えて一気に小さくなる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2021=4\cdot505+1$、$37=4\cdot9+1$ で、$505-9=496$ は偶数だから (3) より`,
            },
            { k: "math", t: String.raw`{}_{2021}\mathrm{C}_{37}\equiv{}_{505}\mathrm{C}_{9}\pmod4` },
            {
              k: "p",
              t: String.raw`である。さらに $505=4\cdot126+1$、$9=4\cdot2+1$ で $126-2=124$ は偶数だから、もう一度 (3) を使って`,
            },
            { k: "math", t: String.raw`{}_{505}\mathrm{C}_{9}\equiv{}_{126}\mathrm{C}_{2}\pmod4` },
            { k: "p", t: String.raw`となる。最後は直接計算して` },
            {
              k: "math",
              t: String.raw`{}_{126}\mathrm{C}_{2}=\frac{126\cdot125}{2}=7875=4\cdot1968+3`,
            },
            { k: "p", t: String.raw`なので、求める余りは $3$ である。` },
          ],
          pitfalls: [
            String.raw`(3) を使うには「上も下も $4$ で割ると $1$ 余る」ことと「$a-b$ が偶数」の両方が要る。$2021$ と $37$、$505$ と $9$ はどちらもみたしているので2回続けて使える。`,
          ],
          check: String.raw`多倍長整数で $ {}_{2021}\mathrm{C}_{37}$ をそのまま計算して $4$ で割ると、余りは $3$ になる。$ {}_{505}\mathrm{C}_{9}$、$ {}_{126}\mathrm{C}_{2}$ の余りもどちらも $3$ で、2段階の言いかえが正しいことも確かめられる。`,
        },
      ],
    },
    {
      no: 5,
      field: "微分法",
      topics: ["半角の公式", "関数の増減", "中間値の定理", "最大値の位置"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f$ の数値微分の符号変化を $\\theta$ の $200000$ 等分で数え、$\\alpha=0.1\\sim3.0$ のどれでも $0<\\theta<\\pi$ に零点がちょうど1つであることを確かめた",
          "$f$ の最大値の位置を同じ刻みの全探索で求め、$\\alpha<2-\\frac\\pi2=0.42920$ のときだけ $\\frac\\pi2$ より左にあることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0<\theta<\pi$ に $f'(\theta)=0$ となる $\theta$ がただ1つ存在することを示す`,
          answer: String.raw`$f'(\theta)=4\cos\dfrac\theta2\cdot h(\theta)$ と書け、$h$ は狭義減少で $h(0)=\alpha>0$、$h(\pi)=-2<0$`,
          approach: String.raw`$f'$ をそのまま微分して増減を見ようとすると行き詰まる。$1+\cos\theta=2\cos^{2}\dfrac\theta2$、$\sin\theta=2\sin\dfrac\theta2\cos\dfrac\theta2$ を使って $\cos\dfrac\theta2$ でくくると、残りの因子 $h$ の導関数が驚くほど簡単になり、符号がすぐ分かる。`,
          blocks: [
            { k: "p", t: String.raw`$f(\theta)=\left(\theta+\sin\theta+\alpha\right)^{2}+\left(\cos\theta+3\right)^{2}$ だから` },
            {
              k: "math",
              t: String.raw`f'(\theta)=2\left(\theta+\sin\theta+\alpha\right)\left(1+\cos\theta\right)-2\sin\theta\left(\cos\theta+3\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$1+\cos\theta=2\cos^{2}\dfrac\theta2$、$\sin\theta=2\sin\dfrac\theta2\cos\dfrac\theta2$ を代入すると $\cos\dfrac\theta2$ でくくれて`,
            },
            {
              k: "math",
              t: String.raw`f'(\theta)=4\cos\frac\theta2\left\{\cos\frac\theta2\left(\theta+\sin\theta+\alpha\right)-\sin\frac\theta2\left(\cos\theta+3\right)\right\}`,
            },
            { k: "p", t: String.raw`となる。内側を` },
            {
              k: "math",
              t: String.raw`h(\theta)=\cos\frac\theta2\left(\theta+\sin\theta+\alpha\right)-\sin\frac\theta2\left(\cos\theta+3\right)`,
            },
            {
              k: "p",
              t: String.raw`とおく。$0\le\theta<\pi$ では $\cos\dfrac\theta2>0$ なので、この範囲で $f'(\theta)=0$ となるのは $h(\theta)=0$ のときに限る。`,
            },
            { k: "p", t: String.raw`**$h$ を微分する。** 積の微分を順に行い、半角の公式で整理すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
h'(\theta)&=-\frac12\sin\frac\theta2\left(\theta+\sin\theta+\alpha\right)+\cos\frac\theta2\left(1+\cos\theta\right)\\[1mm]
&\qquad-\frac12\cos\frac\theta2\left(\cos\theta+3\right)+\sin\frac\theta2\sin\theta
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。$1+\cos\theta=2\cos^{2}\dfrac\theta2$、$\cos\theta=1-2\sin^{2}\dfrac\theta2$、$\sin\theta=2\sin\dfrac\theta2\cos\dfrac\theta2$ を入れて、$\alpha$ と $\theta$ を含まない3項をまとめると`,
            },
            {
              k: "math",
              t: String.raw`2\cos^{3}\frac\theta2-2\cos\frac\theta2+3\sin^{2}\frac\theta2\cos\frac\theta2=\cos\frac\theta2\sin^{2}\frac\theta2`,
            },
            { k: "p", t: String.raw`となるので` },
            {
              k: "math",
              t: String.raw`h'(\theta)=\cos\frac\theta2\sin^{2}\frac\theta2-\frac12\sin\frac\theta2\left(\theta+\sin\theta+\alpha\right)=\sin\frac\theta2\left\{\frac12\sin\theta-\frac12\left(\theta+\sin\theta+\alpha\right)\right\}`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`h'(\theta)=-\frac12\left(\theta+\alpha\right)\sin\frac\theta2` },
            {
              k: "p",
              t: String.raw`を得る。$0<\theta\le\pi$ では $\theta+\alpha>0$、$\sin\dfrac\theta2>0$ だから $h'(\theta)<0$ で、$h$ は $[0,\pi]$ で狭義減少である。`,
            },
            { k: "p", t: String.raw`両端の値は` },
            { k: "math", t: String.raw`h(0)=\alpha>0,\qquad h(\pi)=0-1\cdot(-1+3)=-2<0` },
            {
              k: "p",
              t: String.raw`なので、中間値の定理と狭義減少性から $h(\theta)=0$ となる $\theta$ は $0<\theta<\pi$ にただ1つである。よって $f'(\theta)=0$ となる $\theta$ もただ1つである。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=h(\theta)$ のグラフ（上が $\alpha=0.3$、下が $\alpha=0.6$）。どちらも狭義減少で、$h(0)=\alpha>0$ から $h(\pi)=-2$ まで下がるので、$0$ を切る点はちょうど1つ。破線は $\theta=\frac\pi2$。`,
                view: [-0.15, 3.35, -2.4, 1.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: H5(0.3), from: 0, to: Math.PI },
                  { k: "curve", f: H5(0.6), from: 0, to: Math.PI },
                  { k: "seg", a: [Math.PI / 2, -2.3], b: [Math.PI / 2, 1.1], dash: true, faint: true },
                  { k: "dot", at: [0, 0.3], label: "α = 0.3", place: "above-right" },
                  { k: "dot", at: [0, 0.6], label: "α = 0.6", place: "above-right" },
                  { k: "text", at: [Math.PI / 2, 1.05], label: "θ = π/2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\theta=\pi$ でも $f'(\pi)=0$ になる（$\cos\dfrac\pi2=0$ のため）が、これは区間の端なので「$0<\theta<\pi$ にただ1つ」には数えない。$\cos\dfrac\theta2$ でくくることで、この端の零点と本質的な零点をはっきり分けられる。`,
            String.raw`$h'(\theta)=-\dfrac12(\theta+\alpha)\sin\dfrac\theta2$ はきれいに消えてくれるが、途中の整理を飛ばすと符号が追えない。$\cos\dfrac\theta2$ でくくった3項が $\cos\dfrac\theta2\sin^{2}\dfrac\theta2$ にまとまるところが山場である。`,
          ],
          check: String.raw`$\alpha=0.3$ のとき $h(0)=0.3$、$h(1)=0.26\ldots$、$h(1.5)=-0.07\ldots$、$h(\pi)=-2$ で、$1.4$ 付近で1回だけ $0$ を切る。$f$ の数値微分の符号変化を $\theta$ の $200000$ 等分で数えても、$\alpha$ をいろいろ変えて零点はつねにちょうど1つだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(\theta)$ が区間 $0<\theta<\dfrac\pi2$ のある点で最大になるような $\alpha$ の範囲を求める`,
          answer: String.raw`$0<\alpha<2-\dfrac\pi2$`,
          approach: String.raw`(1) より $f'$ の符号は $h$ の符号と同じで、$h$ は減少しながら1回だけ $0$ を切る。だから $f$ は「上がって下がる」形で、最大は必ずその零点 $\theta_0$ で起きる。あとは $\theta_0<\dfrac\pi2$ を $h$ の単調性で言いかえれば、$h\!\left(\dfrac\pi2\right)<0$ という1つの不等式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の $\theta_0$（$h(\theta_0)=0$ となる唯一の点）をとる。$h$ は狭義減少だから $0\le\theta<\theta_0$ で $h>0$、$\theta_0<\theta\le\pi$ で $h<0$ である。$0\le\theta<\pi$ では $\cos\dfrac\theta2>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`f'(\theta)=4\cos\frac\theta2\,h(\theta)\ \begin{cases}>0&(0<\theta<\theta_0)\\[1mm]<0&(\theta_0<\theta<\pi)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`となり、$f$ は $[0,\theta_0]$ で増加、$[\theta_0,\pi]$ で減少する。よって $f$ は $\theta=\theta_0$ でのみ最大になる。`,
            },
            {
              k: "p",
              t: String.raw`求める条件は $0<\theta_0<\dfrac\pi2$ である。$\theta_0>0$ はつねに成り立つ。$h$ は狭義減少なので`,
            },
            { k: "math", t: String.raw`\theta_0<\frac\pi2\iff h\!\left(\frac\pi2\right)<0` },
            { k: "p", t: String.raw`である。実際に計算すると、$\cos\dfrac\pi4=\sin\dfrac\pi4=\dfrac{1}{\sqrt2}$、$\sin\dfrac\pi2=1$、$\cos\dfrac\pi2=0$ より` },
            {
              k: "math",
              t: String.raw`h\!\left(\frac\pi2\right)=\frac{1}{\sqrt2}\left(\frac\pi2+1+\alpha\right)-\frac{1}{\sqrt2}\cdot3=\frac{1}{\sqrt2}\left(\alpha+\frac\pi2-2\right)`,
            },
            { k: "p", t: String.raw`となる。これが負になる条件は $\alpha<2-\dfrac\pi2$ である。$2-\dfrac\pi2=0.429\ldots>0$ なので、$\alpha>0$ とあわせて` },
            { k: "math", t: String.raw`0<\alpha<2-\frac\pi2` },
            { k: "p", t: String.raw`が求める範囲である。` },
          ],
          pitfalls: [
            String.raw`最大の位置が $\theta_0$ そのものであることを先に確定させる。「$f'$ の零点がただ1つ」だけでは、そこが最大か最小かは決まらない。$f'$ が正から負へ変わることまで言う。`,
            String.raw`$\theta_0=\dfrac\pi2$ は区間 $0<\theta<\dfrac\pi2$ に入らないので、$\alpha=2-\dfrac\pi2$ は範囲から外れる。不等号は等号なしである。`,
          ],
          check: String.raw`$2-\dfrac\pi2=0.42920$。$\alpha=0.3$ のとき $f$ の最大の位置を数値で探すと $\theta=1.4213<\dfrac\pi2=1.5708$、$\alpha=0.43$ のときは $\theta=1.5716>\dfrac\pi2$ となり、境目がちょうど $0.4292$ 付近にあることが確かめられる。`,
        },
      ],
    },
    {
      no: 6,
      field: "整式・整数",
      topics: ["恒等式と係数比較", "因数分解", "有理数解", "平方数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$-12\\le a\\le12$ の整数について、$p$ を分母 $4$ 以下の有理数で広く走査して $p^{6}-4cp^{2}-b^{2}=0$ の解を探し、$a=0$ のときだけ見つかることを有理数演算で確かめた",
          "$a=0$ のとき $x^{4}+2x-\\frac34=\\left(x^{2}+x-\\frac12\\right)\\left(x^{2}-x+\\frac32\\right)$ となることを展開で確かめた",
          "$a^{2}+1$ が平方数になる整数 $a$ が $0$ だけであることを $|a|\\le1000$ で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p\ne0$ のとき $q,r$ を $p,b$ で表す`,
          answer: String.raw`$q=\dfrac{p^{3}-b}{2p}$、$r=\dfrac{p^{3}+b}{2p}$`,
          approach: String.raw`右辺を展開して係数を比べるだけである。$x^{3}$ の項は自動的に消え、$x^{2}$ と $x$ の係数から $q+r$ と $r-q$ が分かるので、連立して解く。`,
          blocks: [
            { k: "p", t: String.raw`右辺を展開すると` },
            {
              k: "math",
              t: String.raw`\left(x^{2}+px+q\right)\left(x^{2}-px+r\right)=x^{4}+\left(q+r-p^{2}\right)x^{2}+p(r-q)x+qr`,
            },
            { k: "p", t: String.raw`である。左辺 $x^{4}+bx+c$ と係数を比べて` },
            { k: "math", t: String.raw`q+r=p^{2},\qquad p(r-q)=b,\qquad qr=c` },
            { k: "p", t: String.raw`を得る。$p\ne0$ より $r-q=\dfrac bp$ なので、$q+r=p^{2}$ とあわせて` },
            { k: "math", t: String.raw`q=\frac{1}{2}\left(p^{2}-\frac bp\right)=\frac{p^{3}-b}{2p},\qquad r=\frac{1}{2}\left(p^{2}+\frac bp\right)=\frac{p^{3}+b}{2p}` },
            { k: "p", t: String.raw`となる。` },
            {
              k: "note",
              t: String.raw`残る条件 $qr=c$ に代入すると $\dfrac{p^{6}-b^{2}}{4p^{2}}=c$、すなわち $p^{6}-4cp^{2}-b^{2}=0$ となる。これが $p$ の決定条件で、(2)(3) の出発点になる。`,
            },
          ],
          check: String.raw`$p=1$、$b=2$ とすると $q=\dfrac{1-2}{2}=-\dfrac12$、$r=\dfrac{1+2}{2}=\dfrac32$。$\left(x^{2}+x-\dfrac12\right)\left(x^{2}-x+\dfrac32\right)$ を展開すると $x^{4}+2x-\dfrac34$ となり、$x^{2}$ の項が消えていることも確かめられる。`,
        },
        {
          label: "(2)",
          task: String.raw`$b=(a^{2}+1)(a+2)$、$c=-\left(a+\dfrac34\right)(a^{2}+1)$ のとき、$\left\{p^{2}-(a^{2}+1)\right\}\left\{p^{4}+f(a)p^{2}+g(a)\right\}=0$ をみたす有理数係数の整式 $f,g$ を1組求める`,
          answer: String.raw`$f(t)=t^{2}+1$、$g(t)=\left(t^{2}+1\right)(t+2)^{2}$`,
          approach: String.raw`(1) の注で見たとおり、$p$ がみたすべき式は $p^{6}-4cp^{2}-b^{2}=0$ である。$P=p^{2}$ とおくと $P$ の3次方程式になり、与えられた形は「$P-(a^{2}+1)$ を因数にもつ」と言っている。実際に $P=a^{2}+1$ が解になることを確かめてから、割り算で残りの2次式を求めればよい。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $p$ は $p^{6}-4cp^{2}-b^{2}=0$ をみたす。$P=p^{2}$、$A=a^{2}+1$ とおくと` },
            {
              k: "math",
              t: String.raw`b^{2}=A^{2}(a+2)^{2},\qquad -4c=(4a+3)A`,
            },
            { k: "p", t: String.raw`なので、方程式は` },
            { k: "math", t: String.raw`P^{3}+(4a+3)AP-A^{2}(a+2)^{2}=0` },
            { k: "p", t: String.raw`となる。$P=A$ を代入すると` },
            {
              k: "math",
              t: String.raw`A^{3}+(4a+3)A^{2}-A^{2}(a+2)^{2}=A^{2}\left\{\left(a^{2}+1\right)+(4a+3)-(a+2)^{2}\right\}=A^{2}\cdot0=0`,
            },
            { k: "p", t: String.raw`となるので、$P-A$ で割り切れる。$P^{3}+(4a+3)AP-A^{2}(a+2)^{2}=(P-A)\left(P^{2}+fP+g\right)$ とおいて展開すると` },
            {
              k: "math",
              t: String.raw`P^{3}+(f-A)P^{2}+(g-Af)P-Ag`,
            },
            { k: "p", t: String.raw`なので、係数を比べて $f=A$、$g-Af=(4a+3)A$、すなわち` },
            {
              k: "math",
              t: String.raw`f=a^{2}+1,\qquad g=A^{2}+(4a+3)A=A\left(a^{2}+4a+4\right)=\left(a^{2}+1\right)(a+2)^{2}`,
            },
            {
              k: "p",
              t: String.raw`を得る（定数項も $-Ag=-A^{2}(a+2)^{2}$ となって合う）。よって $f(t)=t^{2}+1$、$g(t)=\left(t^{2}+1\right)(t+2)^{2}$ とすればよい。`,
            },
          ],
          check: String.raw`$a=0$ なら $A=1$、$b=2$、$c=-\dfrac34$ で、方程式は $P^{3}+3P-4=(P-1)\left(P^{2}+P+4\right)=0$。$f(0)=1$、$g(0)=4$ で、$P^{2}+f(0)P+g(0)=P^{2}+P+4$ と一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$a$ を整数とし、$x^{4}+(a^{2}+1)(a+2)x-\left(a+\dfrac34\right)(a^{2}+1)$ が有理数係数の2次式の積に因数分解できる $a$ をすべて求める`,
          answer: String.raw`$a=0$`,
          approach: String.raw`4次式が有理数係数の2次式の積に分かれるとき、最高次の係数をそろえれば両方とも最高次係数 $1$ にできる。$x^{3}$ の項がないので、2つの2次式の1次の係数は符号だけが違う。つまり問題文の形そのものになり、有理数の $p$ が存在することと同じになる。(2) の因数分解を使うと、$p^{2}$ の候補はほぼ $a^{2}+1$ に絞られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`4次式が有理数係数の2次式2つの積になるとき、両方を最高次の係数 $1$ にそろえてよい。$x^{3}$ の項がないので2つの1次の係数は和が $0$、すなわち $p$ と $-p$ である。つまり因数分解できることは、有理数 $p,q,r$ で問題文の恒等式が成り立つことと同じである。`,
            },
            { k: "p", t: String.raw`**$p=0$ の場合。** このとき $b=p(r-q)=0$ だから $(a^{2}+1)(a+2)=0$、すなわち $a=-2$ である。さらに $q+r=0$、$qr=c$ から $-q^{2}=c$ だが` },
            {
              k: "math",
              t: String.raw`a=-2\ \Longrightarrow\ c=-\left(-2+\frac34\right)\cdot5=\frac{25}{4}>0`,
            },
            { k: "p", t: String.raw`で $-q^{2}>0$ は起こらない。よって $p=0$ の場合は因数分解できない。` },
            {
              k: "p",
              t: String.raw`**$p\ne0$ の場合。** (2) より $P=p^{2}$ は`,
            },
            {
              k: "math",
              t: String.raw`\left\{P-\left(a^{2}+1\right)\right\}\left\{P^{2}+\left(a^{2}+1\right)P+\left(a^{2}+1\right)(a+2)^{2}\right\}=0`,
            },
            { k: "p", t: String.raw`をみたす。後ろの2次式について、2解の和は $-\left(a^{2}+1\right)<0$、積は $\left(a^{2}+1\right)(a+2)^{2}\ge0$ である。よって実数解があってもすべて $0$ 以下で、$P=p^{2}>0$ にはなりえない。` },
            {
              k: "p",
              t: String.raw`したがって $P=p^{2}=a^{2}+1$ でなければならない。$p$ は有理数なので $a^{2}+1$ は有理数の平方であり、$a$ が整数なので $a^{2}+1$ は平方数である。$a^{2}+1=k^{2}$（$k\ge0$ の整数）とすると`,
            },
            { k: "math", t: String.raw`(k-|a|)(k+|a|)=1` },
            {
              k: "p",
              t: String.raw`で、左辺の2つはともに正の整数だから $k-|a|=k+|a|=1$、すなわち $a=0$、$k=1$ である。`,
            },
            {
              k: "p",
              t: String.raw`逆に $a=0$ のときは $b=2$、$c=-\dfrac34$、$p=1$ として (1) より $q=-\dfrac12$、$r=\dfrac32$ となり`,
            },
            {
              k: "math",
              t: String.raw`x^{4}+2x-\frac34=\left(x^{2}+x-\frac12\right)\left(x^{2}-x+\frac32\right)`,
            },
            { k: "p", t: String.raw`と因数分解できる。よって求める $a$ は $a=0$ だけである。` },
          ],
          pitfalls: [
            String.raw`$p=0$ の場合を落とさない。$b=0$ になる $a=-2$ だけが候補だが、そこでも $c>0$ のため成立しない。`,
            String.raw`$P^{2}+\left(a^{2}+1\right)P+\left(a^{2}+1\right)(a+2)^{2}=0$ の解を捨てる根拠は「和が負・積が $0$ 以上」である。判別式を計算する必要はない。`,
            String.raw`$a^{2}+1$ が「有理数の平方」であることから「整数の平方」へ進むには、$a$ が整数であることを使う。整数の平方根は整数か無理数のどちらかである。`,
          ],
          check: String.raw`$-12\le a\le12$ の整数について、$p$ を分母 $4$ 以下の有理数で広く走査して $p^{6}-4cp^{2}-b^{2}=0$ の解を探すと、見つかるのは $a=0$ のときだけで、そのとき $p=\pm1$、$\{q,r\}=\left\{-\dfrac12,\dfrac32\right\}$ となる。$a^{2}+1$ が平方数になる整数も $|a|\le1000$ の範囲で $a=0$ だけだった。`,
        },
      ],
    },
  ],
};
