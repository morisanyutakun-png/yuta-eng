import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2022年度（令和4年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第5問の曲線 C。z(t) = 5e^{it} + e^{-5it} に当たる。 */
const CX22 = (t: number): number => 5 * Math.cos(t) + Math.cos(5 * t);
const CY22 = (t: number): number => 5 * Math.sin(t) - Math.sin(5 * t);

export const kyudaiRikei2022: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル",
      topics: ["外積", "単位法線ベクトル", "平面に関する対称点", "折れ線の最短"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec n=\\frac13(2,-2,-1)$ が $\\vec a\\cdot\\vec n=\\vec b\\cdot\\vec n=0$、$\\left|\\vec n\\right|=1$、$x$ 成分が正をみたすことを確かめた",
          "$\\mathrm{P}'(0,4,1)$ が平面に関して $\\mathrm{P}$ と対称（中点が平面上、$\\overrightarrow{\\mathrm{PP}'}$ が $\\vec n$ に平行）であることを確かめた",
          "平面 $\\alpha$ 上の点を $801\\times801$ 通りに刻んで $\\left|\\overrightarrow{\\mathrm{PR}}\\right|+\\left|\\overrightarrow{\\mathrm{RQ}}\\right|$ の最小を探すと $6.928203$（$=4\\sqrt3$）で、$\\mathrm{R}(3,1,4)$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\vec a,\vec b$ の両方に垂直で、$x$ 成分が正、大きさが $1$ のベクトル $\vec n$ を求める`,
          answer: String.raw`$\vec n=\dfrac13\left(2,\,-2,\,-1\right)$`,
          approach: String.raw`外積 $\vec a\times\vec b$ が両方に垂直なベクトルを与える。あとは大きさで割り、$x$ 成分の符号を合わせる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=(1,1,0)$、$\vec b=(2,1,2)$ である。外積は`,
            },
            {
              k: "math",
              t: String.raw`\vec a\times\vec b=\left(1\cdot2-0\cdot1,\;0\cdot2-1\cdot2,\;1\cdot1-1\cdot2\right)=(2,\,-2,\,-1)`,
            },
            {
              k: "p",
              t: String.raw`で、大きさは $\sqrt{4+4+1}=3$ である。$x$ 成分 $2>0$ なのでそのまま割って`,
            },
            { k: "math", t: String.raw`\vec n=\frac13\left(2,\,-2,\,-1\right)` },
            {
              k: "p",
              t: String.raw`である。実際 $\vec a\cdot\vec n=\dfrac{2-2+0}3=0$、$\vec b\cdot\vec n=\dfrac{4-2-2}3=0$ となっている。`,
            },
            {
              k: "note",
              t: String.raw`外積を使わないなら $\vec n=(p,q,r)$ とおいて $p+q=0$、$2p+q+2r=0$、$p^{2}+q^{2}+r^{2}=1$ を解く。$q=-p$、$r=-\frac p2$ から同じ答えになる。`,
            },
          ],
          pitfalls: [
            String.raw`「$x$ 成分が正」という条件で向きが1つに決まる。$-\vec n$ のほうを答えない。`,
            String.raw`大きさ $1$ にするのを忘れない。$(2,-2,-1)$ のままでは $\left|\vec n\right|=3$ である。`,
          ],
          check: String.raw`$\vec a\cdot\vec n=\vec b\cdot\vec n=0$、$\left|\vec n\right|=1$ を数値で確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`平面 $\alpha$ に関して点 $\mathrm{P}$ と対称な点 $\mathrm{P}'$ の座標を求める`,
          answer: String.raw`$\mathrm{P}'(0,\,4,\,1)$`,
          approach: String.raw`平面 $\alpha$ は原点を通るので、$\mathrm{P}$ から平面までの符号つき距離は $\overrightarrow{\mathrm{OP}}\cdot\vec n$ である。対称点はそのぶんを2回ぶん戻した点になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`平面 $\alpha$ は $\mathrm{O},\mathrm{A},\mathrm{B}$ を通る、すなわち原点を通り $\vec n$ を法線とする平面である。$\mathrm{P}(4,0,-1)$ について`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}\cdot\vec n=\frac{4\cdot2+0\cdot(-2)+(-1)\cdot(-1)}3=\frac{8+1}3=3`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{P}$ から平面までの距離が $3$ で、$\vec n$ の側にある）。対称点は`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\overrightarrow{\mathrm{OP}'}&=\overrightarrow{\mathrm{OP}}-2\left(\overrightarrow{\mathrm{OP}}\cdot\vec n\right)\vec n
=(4,0,-1)-6\cdot\frac13(2,-2,-1)\\[1mm]
&=(4,0,-1)-(4,-4,-2)=(0,\,4,\,1)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**確かめ。** 中点は $\left(2,2,0\right)$ で、$\vec n$ との内積は $\dfrac{4-4-0}3=0$ だから平面上にある。また $\overrightarrow{\mathrm{PP}'}=(-4,4,2)=-6\vec n$ で $\vec n$ に平行である。`,
            },
          ],
          pitfalls: [
            String.raw`$2\left(\overrightarrow{\mathrm{OP}}\cdot\vec n\right)\vec n$ の $2$ を忘れると、対称点ではなく垂線の足になる。`,
            String.raw`平面が原点を通るので定数項がない。通らない平面ならここに平行移動が入る。`,
          ],
          check: String.raw`中点 $(2,2,0)$ が平面上にあり、$\overrightarrow{\mathrm{PP}'}$ が $\vec n$ の $-6$ 倍であることを確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{R}$ が平面 $\alpha$ 上を動くとき $\left|\overrightarrow{\mathrm{PR}}\right|+\left|\overrightarrow{\mathrm{RQ}}\right|$ が最小となる $\mathrm{R}$ の座標を求める`,
          answer: String.raw`$\mathrm{R}(3,\,1,\,4)$（最小値は $4\sqrt3$）`,
          approach: String.raw`$\mathrm{R}$ が平面上にあるかぎり $\left|\overrightarrow{\mathrm{PR}}\right|=\left|\overrightarrow{\mathrm{P}'\mathrm{R}}\right|$ なので、求めるのは「$\mathrm{P}'$ と $\mathrm{Q}$ を結ぶ折れ線の長さの最小」である。$\mathrm{P}'$ と $\mathrm{Q}$ が平面の反対側にあれば、線分 $\mathrm{P}'\mathrm{Q}$ と平面の交点が答えになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{R}$ が平面 $\alpha$ 上にあるとき、対称性から $\left|\overrightarrow{\mathrm{PR}}\right|=\left|\overrightarrow{\mathrm{P}'\mathrm{R}}\right|$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{PR}}\right|+\left|\overrightarrow{\mathrm{RQ}}\right|=\left|\overrightarrow{\mathrm{P}'\mathrm{R}}\right|+\left|\overrightarrow{\mathrm{RQ}}\right|\ge\left|\overrightarrow{\mathrm{P}'\mathrm{Q}}\right|`,
            },
            {
              k: "p",
              t: String.raw`であり（三角不等式）、等号は $\mathrm{R}$ が線分 $\mathrm{P}'\mathrm{Q}$ 上にあるときである。`,
            },
            {
              k: "p",
              t: String.raw`**反対側にあるか。** $\overrightarrow{\mathrm{OP}'}\cdot\vec n=-3$、$\overrightarrow{\mathrm{OQ}}\cdot\vec n=\dfrac{8-0-5}3=1$ で符号が逆なので、線分 $\mathrm{P}'\mathrm{Q}$ は平面 $\alpha$ と交わる。その交点が求める $\mathrm{R}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**交点。** $\overrightarrow{\mathrm{OR}}=\overrightarrow{\mathrm{OP}'}+s\left(\overrightarrow{\mathrm{OQ}}-\overrightarrow{\mathrm{OP}'}\right)$ とおくと、$\overrightarrow{\mathrm{OR}}\cdot\vec n=0$ より`,
            },
            {
              k: "math",
              t: String.raw`-3+s\left(1-(-3)\right)=0\quad\Longrightarrow\quad s=\frac34`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OQ}}-\overrightarrow{\mathrm{OP}'}=(4,-4,4)$ だから` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=(0,4,1)+\frac34(4,-4,4)=(3,\,1,\,4)`,
            },
            { k: "p", t: String.raw`すなわち $\mathrm{R}(3,1,4)$ である。` },
            {
              k: "p",
              t: String.raw`**最小値。** $\left|\overrightarrow{\mathrm{P}'\mathrm{Q}}\right|=\sqrt{4^{2}+(-4)^{2}+4^{2}}=\sqrt{48}=4\sqrt3$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「平面に関する対称点に飛ばす」のが定石である。$\mathrm{P}$ のまま最小化しようとすると2変数の計算になる。`,
            String.raw`$\mathrm{P}'$ と $\mathrm{Q}$ が平面の**反対側**にあることを確かめる。同じ側だと線分が平面と交わらず、答えが変わる。`,
            String.raw`$\mathrm{R}$ が本当に平面 $\alpha$ 上にあるか（$\overrightarrow{\mathrm{OR}}\cdot\vec n=\frac{6-2-4}3=0$）を最後に確かめておく。`,
          ],
          check: String.raw`平面上の点を $801\times801$ 通りに刻んで直接最小を探すと $6.928203$ で $\mathrm{R}=(3,1,4)$ となり、$4\sqrt3=6.928203$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "整式",
      topics: ["剰余の定理", "重根と微分", "因数分解", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n,\\alpha,\\beta$ を $3000$ 組ランダムにとり、求めた $A,B,C$ について $x^{n}-A(x-\\alpha)(x-\\beta)-B(x-\\alpha)-C$ が $x=\\alpha$ で $0$、$x=\\beta$ で値も微分係数も $0$ になる（$(x-\\alpha)(x-\\beta)^{2}$ で割り切れる）ことを確かめた",
          "$n=3,5,7$ で $\\beta\\to\\alpha$ としたときの $A$ が $\\frac{n(n-1)}2\\alpha^{n-2}$ に近づくことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x^{n}=(x-\alpha)(x-\beta)^{2}Q(x)+A(x-\alpha)(x-\beta)+B(x-\alpha)+C$ をみたす実数 $A,B,C$ と整式 $Q(x)$ が存在することを示す`,
          answer: String.raw`$x^{n}$ を3次式 $(x-\alpha)(x-\beta)^{2}$ で割った余り（2次以下）を $A(x-\alpha)(x-\beta)+B(x-\alpha)+C$ の形に書き直せばよい`,
          approach: String.raw`まず割り算をして商 $Q$ と余り $R$（2次以下）を作る。次に、2次以下の整式はどれも $(x-\alpha)(x-\beta)$、$(x-\alpha)$、$1$ の1次結合で書けることを言う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**割り算。** $(x-\alpha)(x-\beta)^{2}$ は3次式なので、$x^{n}$ をこれで割ると`,
            },
            {
              k: "math",
              t: String.raw`x^{n}=(x-\alpha)(x-\beta)^{2}Q(x)+R(x),\qquad R\text{ は2次以下}`,
            },
            { k: "p", t: String.raw`となる整式 $Q,R$ がただ1組定まる。` },
            {
              k: "p",
              t: String.raw`**余りを書き直す。** $R(x)=px^{2}+qx+r$ とする。`,
            },
            {
              k: "math",
              t: String.raw`A=p,\qquad B=R'(\beta)\text{ のかわりに次のように順に決める}`,
            },
            {
              k: "p",
              t: String.raw`というより、$A,B,C$ を次の順に決めればよい。まず $A=p$（$x^{2}$ の係数）とすると`,
            },
            {
              k: "math",
              t: String.raw`R(x)-A(x-\alpha)(x-\beta)`,
            },
            {
              k: "p",
              t: String.raw`は $x^{2}$ の係数が $p-A=0$ になるので1次以下である。これを $Bx+C'$ と書き、さらに $B$ を使って`,
            },
            {
              k: "math",
              t: String.raw`Bx+C'=B(x-\alpha)+\left(C'+B\alpha\right)`,
            },
            {
              k: "p",
              t: String.raw`と直し、$C=C'+B\alpha$ とおく。すると`,
            },
            {
              k: "math",
              t: String.raw`R(x)=A(x-\alpha)(x-\beta)+B(x-\alpha)+C`,
            },
            {
              k: "p",
              t: String.raw`となる。$A,B,C$ はいずれも実数である（$p,q,r,\alpha,\beta$ が実数だから）。以上で題意の表し方が存在する。`,
            },
            {
              k: "note",
              t: String.raw`$(x-\alpha)(x-\beta)$、$x-\alpha$、$1$ はそれぞれ2次・1次・0次なので、次数の高いほうから順に係数を合わせていける。一般に「次数がすべて異なる $n+1$ 個の整式は、$n$ 次以下の整式を1通りに表す」という形になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$n\ge3$ なので $x^{n}$ は3次式で割れる。$Q(x)$ の存在は整式の割り算そのものである。`,
            String.raw`「存在を示せ」なので、具体的に $A,B,C$ を作る手順を書けばよい。一意性までは問われていない。`,
          ],
          check: String.raw`$n=3$、$\alpha=2$、$\beta=5$ でやってみると $x^{3}=(x-2)(x-5)^{2}\cdot1+10(x-2)(x-5)+39(x-2)+8$ となり、確かに書ける。`,
        },
        {
          label: "(2)",
          task: String.raw`$A,B,C$ を $n,\alpha,\beta$ で表す`,
          answer: String.raw`$C=\alpha^{n}$、$B=\dfrac{\beta^{n}-\alpha^{n}}{\beta-\alpha}$、$A=\dfrac{n\beta^{n-1}(\beta-\alpha)-\left(\beta^{n}-\alpha^{n}\right)}{(\beta-\alpha)^{2}}$`,
          approach: String.raw`$x=\alpha$ を代入すると $C$ が、$x=\beta$ を代入すると $B$ が出る。$A$ は両辺を微分して $x=\beta$ を代入すればよい。$(x-\beta)^{2}$ があるので、微分しても $Q$ の項は消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$x=\alpha$ を代入。** 右辺は $C$ だけが残るので`,
            },
            { k: "math", t: String.raw`C=\alpha^{n}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$x=\beta$ を代入。** 右辺は $B(\beta-\alpha)+C$ なので`,
            },
            {
              k: "math",
              t: String.raw`\beta^{n}=B(\beta-\alpha)+\alpha^{n}\quad\Longrightarrow\quad B=\frac{\beta^{n}-\alpha^{n}}{\beta-\alpha}`,
            },
            { k: "p", t: String.raw`である（$\alpha\ne\beta$ なので割ってよい）。` },
            {
              k: "p",
              t: String.raw`**両辺を微分して $x=\beta$。** 左辺の導関数は $nx^{n-1}$。右辺の第1項 $(x-\alpha)(x-\beta)^{2}Q(x)$ の導関数は`,
            },
            {
              k: "math",
              t: String.raw`(x-\beta)^{2}Q+2(x-\alpha)(x-\beta)Q+(x-\alpha)(x-\beta)^{2}Q'`,
            },
            {
              k: "p",
              t: String.raw`で、3項とも $(x-\beta)$ を因数にもつから $x=\beta$ で $0$ になる。第2項の導関数は $A\left\{(x-\beta)+(x-\alpha)\right\}$ で $x=\beta$ では $A(\beta-\alpha)$、第3項は $B$、第4項は $0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`n\beta^{n-1}=A(\beta-\alpha)+B`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`A=\frac{n\beta^{n-1}-B}{\beta-\alpha}=\frac{n\beta^{n-1}(\beta-\alpha)-\left(\beta^{n}-\alpha^{n}\right)}{(\beta-\alpha)^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$A$ を出すのに微分を使う。$(x-\beta)^{2}$ があるおかげで、微分しても未知の $Q$ が顔を出さない。`,
            String.raw`$x=\beta$ の代入だけでは $B$ しか出ない。$A$ には「$\beta$ が重根に近い」という情報が要る。`,
            String.raw`$B$ の式は $\beta^{n-1}+\beta^{n-2}\alpha+\cdots+\alpha^{n-1}$ とも書ける。(3) ではこちらが使いやすい。`,
          ],
          check: String.raw`$n,\alpha,\beta$ を $3000$ 組ランダムにとり、$x^{n}-A(x-\alpha)(x-\beta)-B(x-\alpha)-C$ が $x=\alpha$ で $0$、$x=\beta$ で値も微分係数も $0$ になることを確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`$n,\alpha$ を固定して $\beta\to\alpha$ としたときの $\displaystyle\lim_{\beta\to\alpha}A$ を求める`,
          answer: String.raw`$\dfrac{n(n-1)}2\,\alpha^{\,n-2}$`,
          approach: String.raw`$\beta^{n}-\alpha^{n}=(\beta-\alpha)\left(\beta^{n-1}+\beta^{n-2}\alpha+\cdots+\alpha^{n-1}\right)$ で約分すると、$A$ は $\dfrac{0}{0}$ の形がひとつほどける。もう一度同じ因数分解を使えば極限が見える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta^{n}-\alpha^{n}=(\beta-\alpha)\displaystyle\sum_{k=0}^{n-1}\beta^{\,n-1-k}\alpha^{\,k}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`A=\frac{(\beta-\alpha)\left\{n\beta^{\,n-1}-\sum_{k=0}^{n-1}\beta^{\,n-1-k}\alpha^{\,k}\right\}}{(\beta-\alpha)^{2}}
=\frac{n\beta^{\,n-1}-\sum_{k=0}^{n-1}\beta^{\,n-1-k}\alpha^{\,k}}{\beta-\alpha}`,
            },
            {
              k: "p",
              t: String.raw`である。分子の $n\beta^{\,n-1}$ を $\sum_{k=0}^{n-1}\beta^{\,n-1}$（$n$ 個の和）と見ると`,
            },
            {
              k: "math",
              t: String.raw`A=\sum_{k=0}^{n-1}\frac{\beta^{\,n-1}-\beta^{\,n-1-k}\alpha^{\,k}}{\beta-\alpha}
=\sum_{k=0}^{n-1}\beta^{\,n-1-k}\cdot\frac{\beta^{\,k}-\alpha^{\,k}}{\beta-\alpha}`,
            },
            { k: "p", t: String.raw`となる。ここでもう一度同じ因数分解を使うと` },
            {
              k: "math",
              t: String.raw`\frac{\beta^{\,k}-\alpha^{\,k}}{\beta-\alpha}=\sum_{j=0}^{k-1}\beta^{\,k-1-j}\alpha^{\,j}`,
            },
            {
              k: "p",
              t: String.raw`で（$k=0$ のときは $0$）、これは $\beta\to\alpha$ のとき $k\,\alpha^{\,k-1}$ に収束する（$k$ 個の項がすべて $\alpha^{k-1}$ に近づく）。また $\beta^{\,n-1-k}\to\alpha^{\,n-1-k}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\lim_{\beta\to\alpha}A=\sum_{k=0}^{n-1}\alpha^{\,n-1-k}\cdot k\,\alpha^{\,k-1}
=\alpha^{\,n-2}\sum_{k=0}^{n-1}k=\frac{n(n-1)}2\,\alpha^{\,n-2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この値は $ {}_n\mathrm{C}_2\,\alpha^{\,n-2}$、つまり $x^{n}$ を $x=\alpha$ のまわりで $(x-\alpha)$ の整式に展開したときの $(x-\alpha)^{2}$ の係数である。$\beta=\alpha$ にすると $(x-\alpha)^{3}$ で割った余りを求める問題になる、と思えば自然な答えである。`,
            },
          ],
          pitfalls: [
            String.raw`$(\beta-\alpha)^{2}$ が分母にあるので、約分を2回ぶん進める必要がある。1回では $\frac00$ が残る。`,
            String.raw`$\sum_{k=0}^{n-1}k=\frac{n(n-1)}2$ である。$\frac{n(n+1)}2$ としない。`,
            String.raw`$\alpha=0$ のときも、$n\ge3$ なら $\alpha^{n-2}=0$ で式は成り立つ。`,
          ],
          check: String.raw`$n=3,\alpha=2$ で $\beta=\alpha+10^{-5}$ とすると $A=6.000012$、$\frac{3\cdot2}2\cdot2=6$。$n=5,\alpha=1.5$ で $33.750449$、理論値 $33.75$。$n=7,\alpha=-1.2$ で $-52.2533$、理論値 $-52.2547$ と、いずれも近づいた。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["互いに素", "平方数の余り", "倍数の証明", "解の構成"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\le n\\le299$、$1\\le m\\le1999$ で $n^{4}=1+210m^{2}$ を全探索すると $(m,n)=(116,41)$ だけが見つかった",
          "$n=41$ のとき $n^{2}-1=1680=168\\times10$ で、確かに $168$ の倍数だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\dfrac{n^{2}+1}2$、$\dfrac{n^{2}-1}2$ が互いに素な整数であることを示す`,
          answer: String.raw`$n$ は奇数なので両方とも整数で、差が $1$ だから最大公約数は $1$`,
          approach: String.raw`まず $n$ が奇数であることを言う。$n$ が偶数だと左辺が偶数、右辺が奇数になって矛盾する。あとは2つの差が $1$ であることを使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$n$ は奇数。** $210m^{2}$ は偶数なので $1+210m^{2}$ は奇数である。よって $n^{4}$ は奇数で、$n$ も奇数である。`,
            },
            {
              k: "p",
              t: String.raw`**整数であること。** $n$ が奇数なら $n^{2}$ も奇数なので、$n^{2}+1$ と $n^{2}-1$ はどちらも偶数である。よって $\dfrac{n^{2}+1}2$、$\dfrac{n^{2}-1}2$ はともに整数である。`,
            },
            {
              k: "p",
              t: String.raw`**互いに素。** $d$ を2つの正の公約数とすると、$d$ は差`,
            },
            {
              k: "math",
              t: String.raw`\frac{n^{2}+1}2-\frac{n^{2}-1}2=1`,
            },
            {
              k: "p",
              t: String.raw`も割り切る。よって $d=1$ で、2つは互いに素である。`,
            },
          ],
          pitfalls: [
            String.raw`「整数であること」と「互いに素であること」の2つを示す。奇数であることがその両方の土台になる。`,
            String.raw`連続する2整数は互いに素、という形に持ち込む。$\frac{n^{2}-1}2$ と $\frac{n^{2}+1}2$ は連続している。`,
          ],
          check: String.raw`$n=41$ では $\frac{1681+1}2=841$、$\frac{1681-1}2=840$ で、$841=29^{2}$、$840$ と互いに素である。`,
        },
        {
          label: "(2)",
          task: String.raw`$n^{2}-1$ が $168$ の倍数であることを示す`,
          answer: String.raw`$168=8\cdot3\cdot7$ で、$8\mid n^{2}-1$（$n$ 奇数）、$3\mid n^{2}-1$、$7\mid n^{2}-1$ をそれぞれ示す`,
          approach: String.raw`$168=2^{3}\cdot3\cdot7$ と素因数分解する。$8$ は「奇数の平方は $8$ で割って $1$ 余る」から。$3$ と $7$ は、$n^{4}\equiv1$ であることから $n^{2}\equiv1$ を導く。`,
          blocks: [
            { k: "p", t: String.raw`$168=2^{3}\cdot3\cdot7$ なので、$8,3,7$ の倍数であることを順に示す。` },
            {
              k: "p",
              t: String.raw`**$8$ の倍数。** (1) より $n$ は奇数である。$n=2k+1$ とすると`,
            },
            {
              k: "math",
              t: String.raw`n^{2}-1=4k(k+1)`,
            },
            {
              k: "p",
              t: String.raw`で、$k(k+1)$ は連続2整数の積だから偶数である。よって $n^{2}-1$ は $8$ の倍数である。`,
            },
            {
              k: "p",
              t: String.raw`**$3$ の倍数。** ① より $n^{4}-1=210m^{2}$ は $3$ の倍数なので $n^{4}\equiv1\pmod3$ である。$n^{2}$ を $3$ で割った余りは $0$ か $1$ で、$n^{4}=\left(n^{2}\right)^{2}$ の余りはそれぞれ $0,1$ だから、$n^{4}\equiv1$ となるのは $n^{2}\equiv1\pmod3$ のときに限る。よって $3\mid n^{2}-1$。`,
            },
            {
              k: "p",
              t: String.raw`**$7$ の倍数。** 同じく $7\mid210m^{2}=n^{4}-1$ より $n^{4}\equiv1\pmod7$ である。$n^{2}$ を $7$ で割った余りは $0,1,2,4$ のいずれかで、$n^{4}$ の余りはそれぞれ`,
            },
            {
              k: "math",
              t: String.raw`0^{2}=0,\quad1^{2}=1,\quad2^{2}=4,\quad4^{2}=16\equiv2\pmod7`,
            },
            {
              k: "p",
              t: String.raw`となる。$n^{4}\equiv1$ になるのは $n^{2}\equiv1\pmod7$ のときだけである。よって $7\mid n^{2}-1$。`,
            },
            {
              k: "p",
              t: String.raw`$8,3,7$ はどの2つも互いに素なので、$n^{2}-1$ は $8\cdot3\cdot7=168$ の倍数である。`,
            },
          ],
          pitfalls: [
            String.raw`$168=8\cdot21$ と分けて、$8$ と $3$ と $7$ を別々に示す。$168$ をそのまま扱おうとしない。`,
            String.raw`$n^{4}\equiv1$ から $n^{2}\equiv1$ を出すところが要点である。$n^{2}\equiv-1$ も $n^{4}\equiv1$ をみたしうるので、法 $3$・法 $7$ では $-1$ が平方数の余りに現れないことを確かめる必要がある。表を作るのが確実である。`,
            String.raw`平方数を $7$ で割った余りは $0,1,2,4$ の4通りである。$3,5,6$ は現れない。`,
          ],
          check: String.raw`$n=41$ で $n^{2}-1=1680=168\times10$ であり、確かに $168$ の倍数である。`,
        },
        {
          label: "(3)",
          task: String.raw`① をみたす自然数の組 $(m,n)$ を1つ求める`,
          answer: String.raw`$(m,n)=(116,\;41)$`,
          approach: String.raw`(2) より $n^{2}-1=168k$ と書ける。これを ① に入れて整理すると $m^{2}=\dfrac{8k(84k+1)}5$ となり、$k$ を小さいほうから試せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $n^{2}=168k+1$（$k$ は自然数）と書ける。$n^{2}+1=168k+2$ なので`,
            },
            {
              k: "math",
              t: String.raw`210m^{2}=n^{4}-1=\left(n^{2}-1\right)\left(n^{2}+1\right)=168k\,(168k+2)=336k\,(84k+1)`,
            },
            { k: "p", t: String.raw`である。両辺を $42$ で割ると` },
            {
              k: "math",
              t: String.raw`5m^{2}=8k\,(84k+1)`,
            },
            { k: "p", t: String.raw`となる。$k$ を小さいほうから試す。` },
            {
              k: "steps",
              items: [
                String.raw`$k=1$：$8\cdot85=680$、$m^{2}=136$。平方数でない。`,
                String.raw`$k=5$：$40\cdot421=16840$、$m^{2}=3368$。$58^{2}=3364$ で平方数でない。`,
                String.raw`$k=10$：$80\cdot841=67280$、$m^{2}=13456=116^{2}$。◯`,
              ],
            },
            {
              k: "p",
              t: String.raw`$k=10$ のとき $n^{2}=168\cdot10+1=1681=41^{2}$ だから $n=41$、$m=116$ である。`,
            },
            { k: "p", t: String.raw`**確かめ。** ` },
            {
              k: "math",
              t: String.raw`41^{4}=1681^{2}=2\,825\,761,\qquad1+210\cdot116^{2}=1+210\cdot13\,456=2\,825\,761`,
            },
            { k: "p", t: String.raw`で一致する。よって $(m,n)=(116,41)$ である。` },
            {
              k: "note",
              t: String.raw`$841=29^{2}$、$840=4\cdot210$ となっていて、$\frac{n^{2}+1}2=29^{2}$、$\frac{n^{2}-1}2=4\cdot210$ である。(1) の「互いに素」から、$2\cdot\frac{n^{2}-1}2\cdot\frac{n^{2}+1}2=105m^{2}$ の素因数がどちらに振り分けられるかを考えると、この形に行き着く。`,
            },
          ],
          pitfalls: [
            String.raw`「1つ求めよ」なので、見つけたら代入して確かめれば十分である。すべて求める必要はない。`,
            String.raw`$n$ をそのまま探すと $41^{4}=2825761$ まで届かない。$n^{2}-1=168k$ に直して $k$ で探すと手が届く。`,
            String.raw`$5m^{2}=8k(84k+1)$ なので、$5$ が $8k(84k+1)$ を割り切る必要がある。$k=10$ はこれをみたす。`,
          ],
          check: String.raw`$1\le n\le299$、$1\le m\le1999$ を全探索すると、① をみたすのは $(m,n)=(116,41)$ だけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["定積分の定義", "導関数の定義", "平均値の定理", "区分求積法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "増加関数 $f(x)=x^{3}+e^{x}$、$f(x)=\\sqrt{x+1}$ について、$n=10,100,1000$ で $0\\le\\int_0^1f-S_n\\le\\frac{f(1)-f(0)}n$ が成り立つことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\left\{F(x)+G(x)\right\}'=F'(x)+G'(x)$ を導関数の定義から示し、これと定積分の定義 ① から $\displaystyle\int_a^b\left\{f(x)+g(x)\right\}dx=\int_a^bf(x)\,dx+\int_a^bg(x)\,dx$ を示す`,
          answer: String.raw`差分商を2つに分け、それぞれの極限が存在することから和の極限を得る。あとは $F+G$ が $f+g$ の原始関数になることを ① に入れる`,
          approach: String.raw`どちらも定義どおりに書き下すだけである。前半は「極限の和は和の極限」、後半は「$F+G$ が $f+g$ の原始関数」という一言で済む。`,
          blocks: [
            { k: "p", t: String.raw`**前半。** $H(x)=F(x)+G(x)$ とおくと、$h\ne0$ について` },
            {
              k: "math",
              t: String.raw`\frac{H(x+h)-H(x)}{h}=\frac{F(x+h)-F(x)}{h}+\frac{G(x+h)-G(x)}{h}`,
            },
            {
              k: "p",
              t: String.raw`である。$F,G$ は微分可能なので、$h\to0$ のとき右辺の2つの極限はそれぞれ $F'(x)$、$G'(x)$ として存在する。極限の和の性質より左辺の極限も存在して`,
            },
            { k: "math", t: String.raw`H'(x)=F'(x)+G'(x)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**後半。** $F'=f$、$G'=g$ となる $F,G$ をとる。前半より`,
            },
            { k: "math", t: String.raw`(F+G)'=F'+G'=f+g` },
            {
              k: "p",
              t: String.raw`なので、$F+G$ は $f+g$ の原始関数である。定義 ① を $f+g$ に対して使うと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_a^b\left\{f(x)+g(x)\right\}dx&=\left\{F(b)+G(b)\right\}-\left\{F(a)+G(a)\right\}\\[1mm]
&=\left\{F(b)-F(a)\right\}+\left\{G(b)-G(a)\right\}\\[1mm]
&=\int_a^bf(x)\,dx+\int_a^bg(x)\,dx
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（最後の等号で $f,g$ それぞれに ① を使った）。`,
            },
          ],
          pitfalls: [
            String.raw`「極限が存在するから分けてよい」の順に書く。$F',G'$ が存在することが仮定である。`,
            String.raw`定義 ① は「原始関数の差」である。原始関数の取り方によらないと問題文にあるので、好きな $F,G$ をとってよい。`,
          ],
          check: String.raw`$f=x^{2}$、$g=\sin x$、$[a,b]=[0,1]$ で両辺を計算すると、どちらも $\frac13+1-\cos1$ になる。`,
        },
        {
          label: "(2)",
          task: String.raw`定積分の定義 ① と平均値の定理を用いて、$a<b$ かつ区間 $a\le x\le b$ で $g(x)>0$ ならば $\displaystyle\int_a^bg(x)\,dx>0$ であることを示す`,
          answer: String.raw`原始関数 $G$ に平均値の定理を使うと $\int_a^bg=G(b)-G(a)=g(c)(b-a)>0$`,
          approach: String.raw`① より定積分は $G(b)-G(a)$ である。$G$ は微分可能なので平均値の定理が使え、$G(b)-G(a)=G'(c)(b-a)=g(c)(b-a)$ となる。あとは符号を見るだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$G'(x)=g(x)$ となる $G$ をとる。定義 ① より`,
            },
            { k: "math", t: String.raw`\int_a^bg(x)\,dx=G(b)-G(a)` },
            {
              k: "p",
              t: String.raw`である。$G$ は区間 $a\le x\le b$ で微分可能（したがって連続）なので、平均値の定理より`,
            },
            {
              k: "math",
              t: String.raw`G(b)-G(a)=G'(c)\,(b-a)=g(c)\,(b-a)`,
            },
            {
              k: "p",
              t: String.raw`をみたす $c$ が $a<c<b$ の範囲に存在する。仮定より $g(c)>0$、また $a<b$ より $b-a>0$ だから`,
            },
            { k: "math", t: String.raw`\int_a^bg(x)\,dx=g(c)(b-a)>0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この (2) は、性質 (C) を「差 $g-h$ に適用する」形で使うときの土台になる。$g\ge h$ なら $\int(g-h)\ge0$、すなわち $\int g\ge\int h$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「$g>0$ だから積分も正」は直感では当たり前だが、ここでは定義 ① からきちんと導くことが求められている。`,
            String.raw`平均値の定理を使う対象は $g$ ではなく**原始関数 $G$** である。`,
          ],
          check: String.raw`$g(x)=x^{2}+1>0$、$[a,b]=[0,2]$ で $\int=\frac83+2>0$ となり、確かに正である。`,
        },
        {
          label: "(3)",
          task: String.raw`空欄 ア に入る記号を (A), (B), (C) から選び、不等式 ② を示す`,
          answer: String.raw`ア $=$ (C)`,
          approach: String.raw`$f$ が増加関数なので、小区間 $\left[\frac{i-1}n,\frac in\right]$ 上では $f$ の値が両端の値の間にある。これを定数関数と比べるのが性質 (C) である。定数の定積分は ① から直接計算できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`空欄 ア は **(C)**（大小関係が定積分に移る性質）である。`,
            },
            {
              k: "p",
              t: String.raw`**定数の定積分。** 定数 $k$ に対し $(kx)'=k$ なので、① より`,
            },
            {
              k: "math",
              t: String.raw`\int_a^bk\,dx=kb-ka=k(b-a)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**不等式 ②。** $f$ は増加関数なので、$\dfrac{i-1}n\le x\le\dfrac in$ では`,
            },
            {
              k: "math",
              t: String.raw`f\!\left(\frac{i-1}n\right)\le f(x)\le f\!\left(\frac in\right)`,
            },
            {
              k: "p",
              t: String.raw`が成り立つ。左の不等式に (C) を（$g=f$、$h=$ 定数 $f\!\left(\frac{i-1}n\right)$ として）適用すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac{i-1}n}^{\frac in}f(x)\,dx\ \ge\ \int_{\frac{i-1}n}^{\frac in}f\!\left(\frac{i-1}n\right)dx=f\!\left(\frac{i-1}n\right)\cdot\frac1n`,
            },
            {
              k: "p",
              t: String.raw`である（区間の幅が $\dfrac in-\dfrac{i-1}n=\dfrac1n$）。右の不等式に同じく (C) を適用すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac{i-1}n}^{\frac in}f(x)\,dx\ \le\ f\!\left(\frac in\right)\cdot\frac1n`,
            },
            { k: "p", t: String.raw`である。2つを合わせて ② が得られる。` },
          ],
          pitfalls: [
            String.raw`(C) を使う相手は**定数関数**である。「定数関数に対する定積分の計算を行う」という下線部はそのことを指している。`,
            String.raw`区間の幅が $\frac1n$ であることから $\frac1n$ が出る。$f$ の値そのものが積分値になるのではない。`,
            String.raw`$f$ が増加関数だから、左端で最小・右端で最大になる。減少関数なら不等号が逆になる。`,
          ],
          check: String.raw`$f(x)=x^{3}+e^{x}$、$n=10$、$i=4$ で $\frac1{10}f(0.3)=0.1619$、$\int_{0.3}^{0.4}f=0.1697$、$\frac1{10}f(0.4)=0.1856$ となり、② のとおり挟まれている。`,
        },
        {
          label: "(4)",
          task: String.raw`空欄 イ に入る記号を (A), (B), (C) から選び、不等式 ③ を示す`,
          answer: String.raw`イ $=$ (B)`,
          approach: String.raw`$\int_0^1$ を $n$ 個の小区間の和に分けるのが性質 (B) である。② を $i=1$ から $n$ まで足すと、左側から $S_n$ が、右側から「右端和」が出てくる。2つの差は途中が打ち消し合って $\frac{f(1)-f(0)}n$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`空欄 イ は **(B)**（区間を分けて足す性質）である。これを繰り返し使うと`,
            },
            {
              k: "math",
              t: String.raw`\int_0^1f(x)\,dx=\sum_{i=1}^{n}\int_{\frac{i-1}n}^{\frac in}f(x)\,dx`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**左側の不等式。** ② の左側を $i=1$ から $n$ まで足すと`,
            },
            {
              k: "math",
              t: String.raw`\int_0^1f(x)\,dx\ \ge\ \sum_{i=1}^{n}\frac1nf\!\left(\frac{i-1}n\right)=S_n`,
            },
            { k: "p", t: String.raw`すなわち $\displaystyle\int_0^1f(x)\,dx-S_n\ge0$ である。` },
            {
              k: "p",
              t: String.raw`**右側の不等式。** ② の右側を足すと`,
            },
            {
              k: "math",
              t: String.raw`\int_0^1f(x)\,dx\ \le\ \sum_{i=1}^{n}\frac1nf\!\left(\frac in\right)=T_n`,
            },
            { k: "p", t: String.raw`とおける。ここで` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
T_n-S_n&=\frac1n\sum_{i=1}^{n}\left\{f\!\left(\frac in\right)-f\!\left(\frac{i-1}n\right)\right\}\\[1mm]
&=\frac1n\left\{f(1)-f(0)\right\}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（途中の項が次々に打ち消し合う）。したがって`,
            },
            {
              k: "math",
              t: String.raw`\int_0^1f(x)\,dx-S_n\ \le\ T_n-S_n=\frac{f(1)-f(0)}n`,
            },
            { k: "p", t: String.raw`となり、2つを合わせて ③ が示された。` },
            {
              k: "note",
              t: String.raw`$f$ が増加関数なので $f(1)-f(0)\ge0$ であり、③ の右辺は $n\to\infty$ で $0$ に収束する。はさみうちの原理から $S_n\to\int_0^1f(x)\,dx$ がしたがう。これが区分求積法である。`,
            },
          ],
          pitfalls: [
            String.raw`(B) は「$a\le c\le b$ のとき2つに分ける」形だが、これを繰り返せば $n$ 個に分けられる。そのことを一言添えておく。`,
            String.raw`$S_n$ は**左端**の値を使う和である。$T_n$（右端の和）と取り違えない。`,
            String.raw`$T_n-S_n$ が望遠鏡のように打ち消し合うのが要点。$f(1)-f(0)$ だけが残る。`,
          ],
          check: String.raw`$f(x)=x^{3}+e^{x}$（増加関数、$f(1)-f(0)=e$）で $n=100$ とすると $\int_0^1f-S_n=0.01351$ で、$\frac{f(1)-f(0)}n=0.02718$ 以下である。$f(x)=\sqrt{x+1}$ でも $n=10,100,1000$ で ③ が成り立った。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["媒介変数表示", "和積の公式", "面積", "対称性と回転"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\frac{dx}{dt}=-10\\sin3t\\cos2t$、$\\frac{dy}{dt}=10\\sin3t\\sin2t$ を数値微分と突き合わせた",
          "$0<t<\\frac\\pi6$ で $\\frac{dx}{dt}<0$、$\\frac{dy}{dx}=-\\tan2t<0$ を確かめた",
          "面積を $40$ 万点で数値積分すると $5.2359878$ となり、$\\frac{5\\pi}3=5.2359878$ と一致した",
          "$x(-t)=x(t)$、$y(-t)=-y(t)$ と、$e^{i\\pi/3}z(t)=z\\!\\left(t+\\frac\\pi3\\right)$（$z=5e^{it}+e^{-5it}$）を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0<t<\dfrac\pi6$ で $\dfrac{dx}{dt}<0$、$\dfrac{dy}{dx}<0$ であることを示す`,
          answer: String.raw`$\dfrac{dx}{dt}=-10\sin3t\cos2t<0$、$\dfrac{dy}{dx}=-\tan2t<0$`,
          approach: String.raw`微分したあと和積の公式でまとめると、因数の符号が一目で分かる形になる。`,
          blocks: [
            { k: "p", t: String.raw`微分して和積の公式を使う。` },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=-5\sin t-5\sin5t=-5\left(\sin5t+\sin t\right)=-10\sin3t\cos2t`,
            },
            {
              k: "math",
              t: String.raw`\frac{dy}{dt}=5\cos t-5\cos5t=-5\left(\cos5t-\cos t\right)=10\sin3t\sin2t`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin A+\sin B=2\sin\frac{A+B}2\cos\frac{A-B}2$、$\cos A-\cos B=-2\sin\frac{A+B}2\sin\frac{A-B}2$）。`,
            },
            {
              k: "p",
              t: String.raw`**符号。** $0<t<\dfrac\pi6$ のとき $0<3t<\dfrac\pi2$ なので $\sin3t>0$、$0<2t<\dfrac\pi3$ なので $\cos2t>0$、$\sin2t>0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=-10\sin3t\cos2t<0`,
            },
            { k: "p", t: String.raw`である。また $\dfrac{dx}{dt}\ne0$ なので` },
            {
              k: "math",
              t: String.raw`\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{10\sin3t\sin2t}{-10\sin3t\cos2t}=-\tan2t`,
            },
            {
              k: "p",
              t: String.raw`となり、$0<2t<\dfrac\pi3$ では $\tan2t>0$ だから $\dfrac{dy}{dx}<0$ である。`,
            },
          ],
          pitfalls: [
            String.raw`和積でまとめると $\sin3t$ が共通因数として出て、$\frac{dy}{dx}$ で約分される。これをしないと符号が読みにくい。`,
            String.raw`$\frac{dy}{dx}$ を出すには $\frac{dx}{dt}\ne0$ が要る。先に $\frac{dx}{dt}<0$ を示しておく順番がよい。`,
          ],
          check: String.raw`$t=0.01,0.2,0.4,0.52$ で数値微分と式が一致し、どれも $\frac{dx}{dt}<0$、$\frac{dy}{dx}=-\tan2t<0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ の $0\le t\le\dfrac\pi6$ の部分、$x$ 軸、直線 $y=\dfrac1{\sqrt3}x$ で囲まれた図形の面積を求める`,
          answer: String.raw`$\dfrac{5\pi}3$`,
          approach: String.raw`両端が $x$ 軸上と直線上にあるので、閉じた曲線になる。面積は $\dfrac12\oint\left(x\,dy-y\,dx\right)$ で求まり、$x$ 軸と原点を通る直線の上ではこの被積分式が $0$ になるので、曲線の部分だけ積分すればよい。`,
          blocks: [
            { k: "p", t: String.raw`**両端。** $t=0$ では` },
            { k: "math", t: String.raw`x=5+1=6,\qquad y=0-0=0` },
            { k: "p", t: String.raw`で $x$ 軸上の点 $(6,0)$。$t=\dfrac\pi6$ では` },
            {
              k: "math",
              t: String.raw`x=5\cdot\frac{\sqrt3}2+\left(-\frac{\sqrt3}2\right)=2\sqrt3,\qquad y=5\cdot\frac12-\frac12=2`,
            },
            {
              k: "p",
              t: String.raw`で、$\dfrac{2\sqrt3}{\sqrt3}=2$ だから直線 $y=\dfrac1{\sqrt3}x$ の上にある。よって「原点 $\to(6,0)$（$x$ 軸）$\to$ 曲線 $\to\left(2\sqrt3,2\right)\to$ 原点（直線）」が閉じた道になる。`,
            },
            {
              k: "p",
              t: String.raw`**面積の公式。** 閉曲線で囲まれた面積は $\dfrac12\left|\oint\left(x\,dy-y\,dx\right)\right|$ である。原点を通る直線 $y=kx$ 上では $x\,dy-y\,dx=x\cdot k\,dx-kx\,dx=0$、$x$ 軸（$y=0$、$dy=0$）でも $0$ なので、この2つの辺は寄与しない。したがって`,
            },
            {
              k: "math",
              t: String.raw`S=\frac12\int_0^{\frac\pi6}\left(x\frac{dy}{dt}-y\frac{dx}{dt}\right)dt`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**被積分関数。** (1) の式を使って計算すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x\frac{dy}{dt}-y\frac{dx}{dt}
&=5\left(5\cos t+\cos5t\right)\left(\cos t-\cos5t\right)+5\left(5\sin t-\sin5t\right)\left(\sin t+\sin5t\right)\\[1mm]
&=5\Bigl[5\left(\cos^{2}t+\sin^{2}t\right)-\left(\cos^{2}5t+\sin^{2}5t\right)-4\left(\cos t\cos5t-\sin t\sin5t\right)\Bigr]\\[1mm]
&=5\left(5-1-4\cos6t\right)=20\left(1-\cos6t\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\cos t\cos5t-\sin t\sin5t=\cos6t$）。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\frac12\int_0^{\frac\pi6}20\left(1-\cos6t\right)dt=10\left[t-\frac{\sin6t}6\right]_0^{\frac\pi6}=10\cdot\frac\pi6=\frac{5\pi}3`,
            },
            { k: "p", t: String.raw`である（$\sin\pi=0$）。$5.236$ ほどである。` },
          ],
          pitfalls: [
            String.raw`$x\,dy-y\,dx$ は「原点を通る直線」の上では $0$ になる。この問題では境界の2辺がどちらもそうなので、曲線だけ積分すればよい。`,
            String.raw`$\cos t\cos5t-\sin t\sin5t$ は $\cos(t+5t)=\cos6t$ である。符号と和を間違えない。`,
            String.raw`$\left(2\sqrt3,2\right)$ が直線 $y=\frac1{\sqrt3}x$ 上にあることを確かめておく。ここがずれていると図形が閉じない。`,
          ],
          check: String.raw`$\frac12\int_0^{\pi/6}\left(xy'-yx'\right)dt$ を $40$ 万点で数値積分すると $5.2359878$ となり、$\frac{5\pi}3=5.2359878$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$C$ が $x$ 軸に関して対称であること、および $C$ 上の点を原点中心に反時計回りに $\dfrac\pi3$ 回転させた点が $C$ 上にあることを示す`,
          answer: String.raw`$t\mapsto-t$ で $(x,-y)$ になり、複素数で書くと $z(t)=5e^{it}+e^{-5it}$、$e^{i\frac\pi3}z(t)=z\!\left(t+\dfrac\pi3\right)$`,
          approach: String.raw`対称性は $t\to-t$ の代入でただちに出る。回転のほうは、$x+iy$ を複素数でまとめると見通しがよい。`,
          blocks: [
            { k: "p", t: String.raw`**$x$ 軸対称。** $t$ を $-t$ に置き換えると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x(-t)&=5\cos(-t)+\cos(-5t)=5\cos t+\cos5t=x(t)\\[1mm]
y(-t)&=5\sin(-t)-\sin(-5t)=-5\sin t+\sin5t=-y(t)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$t$ が範囲を動けば $-t$ も（周期 $2\pi$ で読み替えて）範囲を動くので、$C$ 上の点 $(x,y)$ に対して $(x,-y)$ も $C$ 上にある。すなわち $C$ は $x$ 軸に関して対称である。`,
            },
            {
              k: "p",
              t: String.raw`**回転。** $C$ 上の点を複素数 $z(t)=x+iy$ で表すと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
z(t)&=\left(5\cos t+\cos5t\right)+i\left(5\sin t-\sin5t\right)\\[1mm]
&=5\left(\cos t+i\sin t\right)+\left(\cos5t-i\sin5t\right)=5e^{it}+e^{-5it}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（ここで $e^{i\theta}=\cos\theta+i\sin\theta$ と略記した）。原点中心に $\dfrac\pi3$ 回転させるのは $e^{i\frac\pi3}$ を掛けることだから`,
            },
            {
              k: "math",
              t: String.raw`e^{i\frac\pi3}z(t)=5e^{i\left(t+\frac\pi3\right)}+e^{i\frac\pi3}e^{-5it}`,
            },
            { k: "p", t: String.raw`である。一方` },
            {
              k: "math",
              t: String.raw`z\!\left(t+\frac\pi3\right)=5e^{i\left(t+\frac\pi3\right)}+e^{-5i\left(t+\frac\pi3\right)}=5e^{i\left(t+\frac\pi3\right)}+e^{-5it}e^{-i\frac{5\pi}3}`,
            },
            {
              k: "p",
              t: String.raw`で、$e^{-i\frac{5\pi}3}=e^{-i\frac{5\pi}3+2\pi i}=e^{i\frac\pi3}$ だから、2つは一致する。すなわち`,
            },
            {
              k: "math",
              t: String.raw`e^{i\frac\pi3}z(t)=z\!\left(t+\frac\pi3\right)`,
            },
            {
              k: "p",
              t: String.raw`である。右辺は $C$ 上の点（$t+\dfrac\pi3$ を周期 $2\pi$ で範囲に入れ直す）なので、回転させた点は $C$ 上にある。`,
            },
            {
              k: "note",
              t: String.raw`複素数を使わなくても、加法定理で $x\cos\frac\pi3-y\sin\frac\pi3$ と $x\sin\frac\pi3+y\cos\frac\pi3$ を計算して $x\!\left(t+\frac\pi3\right)$、$y\!\left(t+\frac\pi3\right)$ に一致することを示せばよい。式は長くなる。`,
            },
          ],
          pitfalls: [
            String.raw`$e^{-5i\left(t+\frac\pi3\right)}$ の指数は $-5t-\frac{5\pi}3$ である。$-\frac{5\pi}3$ と $+\frac\pi3$ が $2\pi$ 違いで同じ、というのが鍵。`,
            String.raw`$t+\frac\pi3$ が与えられた範囲 $-\pi\le t<\pi$ をはみ出すことがある。周期 $2\pi$ なので読み替えてよいと断っておく。`,
          ],
          check: String.raw`$t=0.3,1.1,-2.5$ で $x(-t)=x(t)$、$y(-t)=-y(t)$、$e^{i\pi/3}z(t)=z\!\left(t+\frac\pi3\right)$ がすべて $10^{-12}$ 以内で成り立った。`,
        },
        {
          label: "(4)",
          task: String.raw`曲線 $C$ の概形を図示する`,
          answer: String.raw`原点から見て $6$ の距離に6個の尖点をもち、その間で $4$ まで内側にへこむ、6回対称の閉曲線（外サイクロイド）`,
          approach: String.raw`(3) の2つの対称性で、$0\le t\le\dfrac\pi6$ の一部分だけ描けば全体が復元できる。$\left|z(t)\right|$ の最大・最小と、$\dfrac{dz}{dt}=0$ になる点（尖点）を押さえる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**大きさ。** $z(t)=5e^{it}+e^{-5it}$ の2項の偏角は $t$ と $-5t$ で、差は $6t$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\left|z(t)\right|^{2}=25+1+2\cdot5\cos6t=26+10\cos6t`,
            },
            {
              k: "p",
              t: String.raw`である。$\cos6t=1$（$t=\dfrac{k\pi}3$）で最大 $\sqrt{36}=6$、$\cos6t=-1$（$t=\dfrac\pi6+\dfrac{k\pi}3$）で最小 $\sqrt{16}=4$ になる。`,
            },
            {
              k: "p",
              t: String.raw`**尖点。** (1) の式より $\dfrac{dx}{dt}=\dfrac{dy}{dt}=0$ となるのは $\sin3t=0$、すなわち $t=\dfrac{k\pi}3$ のときである。このとき $\left|z\right|=6$ で、曲線は向きを変える。$k=0,\pm1,\pm2,3$ の**6個の尖点**が、偏角 $0^\circ,\pm60^\circ,\pm120^\circ,180^\circ$ の方向、原点から距離 $6$ のところにある。`,
            },
            {
              k: "p",
              t: String.raw`**形。** (1) より $0<t<\dfrac\pi6$ では $x$ は減少、$y$ は増加で、$\dfrac{dy}{dx}=-\tan2t$ は $0$ から $-\sqrt3$ まで減る。つまり $(6,0)$ から出て左上に、だんだん傾きを急にしながら $\left(2\sqrt3,2\right)$ へ向かう。`,
            },
            {
              k: "p",
              t: String.raw`あとは (3) の $x$ 軸対称と $\dfrac\pi3$ 回転対称を使って、この弧を折り返し・回転させて並べればよい。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`曲線 $C$ の概形。原点から距離 $6$ の6方向（$0^\circ,\pm60^\circ,\pm120^\circ,180^\circ$）に尖点があり、その中間（$\pm30^\circ,\pm90^\circ,\pm150^\circ$）で距離 $4$ まで内側にへこむ。点線は距離 $4$ と $6$ の円。濃い部分が (2) で扱った $0\le t\le\frac\pi6$ の弧。`,
                view: [-8.4, 8.4, -6.8, 6.8],
                step: { x: 2, y: 2 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [6 * Math.cos(t), 6 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [4 * Math.cos(t), 4 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [CX22(t), CY22(t)],
                    from: -Math.PI,
                    to: Math.PI,
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [CX22(t), CY22(t)],
                    from: 0,
                    to: Math.PI / 6,
                  },
                  { k: "dot", at: [6, 0], label: "t = 0", place: "below-right" },
                  { k: "dot", at: [2 * Math.sqrt(3), 2], label: "t = π/6", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t=\frac{k\pi}3$ では $\frac{dx}{dt}$ と $\frac{dy}{dt}$ が**同時に** $0$ になる。なめらかな点ではなく尖点なので、丸く描かない。`,
            String.raw`$\left|z\right|$ が $4$ と $6$ の間を6回往復する。へこみの深さ（$4$）を測っておくと形が決まる。`,
            String.raw`(3) の2つの対称性を使えば、描くべきは $0\le t\le\frac\pi6$ の弧ひとつだけである。全部を計算しない。`,
          ],
          check: String.raw`$t$ を $0$ から $2\pi$ まで $601$ 点に刻んで $\left|z(t)\right|$ を計算すると、最小 $4.000000$、最大 $6.000000$ で、最大は $t=\frac{k\pi}3$ のところだった。`,
        },
      ],
    },
  ],
};
