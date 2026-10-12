import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2023年度（令和5年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第2問の図。f(x) = |x-1| + x - 1。 */
const F23 = (x: number): number => Math.abs(x - 1) + x - 1;

/** 第5問の曲線 C。 */
const CX23 = (t: number): number => t + 2 * Math.sin(t) ** 2;
const CY23 = (t: number): number => t + Math.sin(t);

export const kyudaiRikei2023: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面",
      topics: ["相反方程式", "対称式", "基本対称式", "正三角形条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x=\\frac{1\\pm\\sqrt3\\,i}{2}$ が $x^{4}-2x^{3}+3x^{2}-2x+1$ とその導関数をともに $0$ にする（重解である）ことを確かめた",
          "$p+q+r=0$ をみたす複素数を $2$ 万組ランダムにとって $p^{4}+q^{4}+r^{4}=\\frac{\\left(p^{2}+q^{2}+r^{2}\\right)^{2}}{2}$ を確かめた",
          "正三角形では与式が $0$、直角二等辺三角形や一般の三角形では $0$ にならないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`4次方程式 $x^{4}-2x^{3}+3x^{2}-2x+1=0$ を解く`,
          answer: String.raw`$x=\dfrac{1\pm\sqrt3\,i}{2}$（どちらも重解）`,
          approach: String.raw`係数が $1,-2,3,-2,1$ と左右対称（相反方程式）なので、$x^{2}$ で割って $t=x+\dfrac1x$ とおく。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=0$ は解でない（代入すると $1=0$）ので、両辺を $x^{2}$ で割ってよい。`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+\frac1{x^{2}}-2\left(x+\frac1x\right)+3=0`,
            },
            {
              k: "p",
              t: String.raw`$t=x+\dfrac1x$ とおくと $x^{2}+\dfrac1{x^{2}}=t^{2}-2$ だから`,
            },
            {
              k: "math",
              t: String.raw`t^{2}-2-2t+3=0\quad\Longleftrightarrow\quad(t-1)^{2}=0`,
            },
            { k: "p", t: String.raw`すなわち $t=1$（重解）である。` },
            { k: "p", t: String.raw`**$x$ に戻す。** $x+\dfrac1x=1$ より` },
            {
              k: "math",
              t: String.raw`x^{2}-x+1=0,\qquad x=\frac{1\pm\sqrt3\,i}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$t$ が重解だったので、もとの4次式は $\left(x^{2}-x+1\right)^{2}$ に等しく、この2つがそれぞれ重解である。`,
            },
            {
              k: "note",
              t: String.raw`$x=\frac{1\pm\sqrt3\,i}{2}=\cos\left(\pm\frac\pi3\right)+i\sin\left(\pm\frac\pi3\right)$ で、$1$ の原始6乗根である。`,
            },
          ],
          pitfalls: [
            String.raw`相反方程式では $x=0$ が解でないことを先に断ってから $x^{2}$ で割る。`,
            String.raw`$x^{2}+\frac1{x^{2}}=\left(x+\frac1x\right)^{2}-2$ の $-2$ を忘れない。`,
            String.raw`$t=1$ が重解なので、$x$ の4つの解は2種類が2個ずつである。「4つの異なる解」と書かない。`,
          ],
          check: String.raw`$x=\frac{1\pm\sqrt3\,i}{2}$ を4次式に代入すると $0$、導関数 $4x^{3}-6x^{2}+6x-2$ に代入しても $0$ になり、重解であることが確かめられる。`,
        },
        {
          label: "(2)",
          task: String.raw`$(\alpha-\beta)^{4}+(\beta-\gamma)^{4}+(\gamma-\alpha)^{4}=0$ のとき $\triangle\mathrm{ABC}$ がどのような三角形かを答える`,
          answer: String.raw`正三角形`,
          approach: String.raw`$p=\alpha-\beta$、$q=\beta-\gamma$、$r=\gamma-\alpha$ とおくと $p+q+r=0$ である。このとき $p^{4}+q^{4}+r^{4}=\dfrac{\left(p^{2}+q^{2}+r^{2}\right)^{2}}{2}$ という恒等式が成り立つので、条件は $p^{2}+q^{2}+r^{2}=0$ に帰着する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p=\alpha-\beta$、$q=\beta-\gamma$、$r=\gamma-\alpha$ とおくと $p+q+r=0$ である。基本対称式を`,
            },
            {
              k: "math",
              t: String.raw`e_1=p+q+r=0,\qquad e_2=pq+qr+rp,\qquad e_3=pqr`,
            },
            { k: "p", t: String.raw`とおく。` },
            { k: "p", t: String.raw`**2乗和と4乗和。** $e_1=0$ なので` },
            {
              k: "math",
              t: String.raw`p^{2}+q^{2}+r^{2}=e_1^{2}-2e_2=-2e_2`,
            },
            { k: "p", t: String.raw`である。また` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
p^{4}+q^{4}+r^{4}&=\left(p^{2}+q^{2}+r^{2}\right)^{2}-2\left(p^{2}q^{2}+q^{2}r^{2}+r^{2}p^{2}\right)\\[1mm]
&=4e_2^{2}-2\left(e_2^{2}-2e_3e_1\right)=4e_2^{2}-2e_2^{2}=2e_2^{2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$p^{2}q^{2}+q^{2}r^{2}+r^{2}p^{2}=e_2^{2}-2e_3e_1$ で $e_1=0$）。まとめると`,
            },
            {
              k: "math",
              t: String.raw`p^{4}+q^{4}+r^{4}=2e_2^{2}=\frac{\left(p^{2}+q^{2}+r^{2}\right)^{2}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**条件を書き直す。** 与式 $=0$ は $2e_2^{2}=0$、すなわち $e_2=0$ と同値である。$e_1=e_2=0$ だから $p,q,r$ は3次方程式`,
            },
            { k: "math", t: String.raw`z^{3}-e_3=0` },
            {
              k: "p",
              t: String.raw`の3つの解である。$\triangle\mathrm{ABC}$ は三角形なので $p\ne0$、したがって $e_3\ne0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$z^{3}=e_3$ の3解は、1つを $z_0$ とすると $z_0,\;\omega z_0,\;\omega^{2}z_0$（$\omega=\cos\dfrac{2\pi}3+i\sin\dfrac{2\pi}3$）である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\left|p\right|=\left|q\right|=\left|r\right|`,
            },
            {
              k: "p",
              t: String.raw`すなわち $\mathrm{AB}=\mathrm{BC}=\mathrm{CA}$ で、$\triangle\mathrm{ABC}$ は**正三角形**である。`,
            },
            {
              k: "p",
              t: String.raw`逆に正三角形なら $q=\omega p$、$r=\omega^{2}p$（または $\omega$ と $\omega^{2}$ を入れ替え）と書けて、$e_2=p^{2}\left(\omega+\omega^{3}+\omega^{2}\right)=p^{2}\left(\omega+\omega^{2}+1\right)=0$ だから与式は $0$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$p+q+r=0$ に気づくのが出発点。$(\alpha-\beta)+(\beta-\gamma)+(\gamma-\alpha)=0$ である。`,
            String.raw`$p^{4}+q^{4}+r^{4}=0$ から $p=q=r=0$ とはできない。複素数なので2乗が負にもなる。`,
            String.raw`「正三角形」と答えるだけでなく、逆も成り立つこと（正三角形なら条件をみたす）に触れておくと安全である。`,
          ],
          check: String.raw`$p+q+r=0$ となる複素数を $2$ 万組ランダムにとると、つねに $p^{4}+q^{4}+r^{4}=\frac{\left(p^{2}+q^{2}+r^{2}\right)^{2}}{2}$ だった。頂点 $0,1,\frac{1+\sqrt3 i}{2}$（正三角形）では与式が $0$、$0,1,i$（直角二等辺）では $2$、$0,2,0.3+1.1i$ では $15.14$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列",
      topics: ["絶対値のついた漸化式", "場合分け", "等比数列", "収束と発散"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha=-5,0,1,1.2,1.49,1.5,1.7,1.99$ で $a_{200}$ を計算するとすべて $0$ になり、$\\alpha=2$ では $2$ のまま、$\\alpha=2.0001,3$ では $10^{56}$ 超に発散した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha\le1$ のとき数列 $\{a_n\}$ の収束・発散を調べる`,
          answer: String.raw`$0$ に収束する`,
          approach: String.raw`$f(x)=\left|x-1\right|+x-1$ を場合分けで書き直すと、$x<1$ では $f(x)=0$、$x\ge1$ では $f(x)=2(x-1)$ という、とても単純な関数になる。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=\left|x-1\right|+x-1$ とおくと $a_{n+1}=f(a_n)$ である。` },
            {
              k: "math",
              t: String.raw`f(x)=\begin{cases}(1-x)+x-1=0&(x<1)\\[1mm](x-1)+x-1=2(x-1)&(x\ge1)\end{cases}`,
            },
            { k: "p", t: String.raw`である。つまり**$1$ より小さい値が出たら、次からはずっと $0$** になる。` },
            {
              k: "steps",
              items: [
                String.raw`$\alpha<1$ のとき：$a_2=f(\alpha)=0$。以後 $0<1$ なので $a_3=a_4=\cdots=0$。`,
                String.raw`$\alpha=1$ のとき：$a_2=2(1-1)=0$。以後やはり $0$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらの場合も $n\ge2$ で $a_n=0$ だから、$\{a_n\}$ は $0$ に収束する。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$f(x)=\left|x-1\right|+x-1$ のグラフ。$x<1$ では $0$、$x\ge1$ では傾き $2$ の直線 $2(x-1)$。点線は $y=x$ で、交点 $x=0$ と $x=2$ が不動点にあたる。`,
                view: [-1.4, 3.6, -0.6, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: F23, from: -1.4, to: 3.6 },
                  { k: "seg", a: [-0.6, -0.6], b: [3.4, 3.4], dash: true },
                  { k: "dot", at: [0, 0], label: "", place: "below-right" },
                  { k: "dot", at: [2, 2], label: "(2, 2)", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\alpha=1$ を忘れない。$x\ge1$ 側の式を使うが、値は $0$ になる。`,
            String.raw`$f(x)=0$（$x<1$）はただ1点に潰す写像である。ここに入ったら二度と出られない。`,
          ],
          check: String.raw`$\alpha=-5,0,1$ のいずれでも $a_{200}=0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\alpha>2$ のとき数列 $\{a_n\}$ の収束・発散を調べる`,
          answer: String.raw`正の無限大に発散する（$a_n=2+(\alpha-2)2^{n-1}$）`,
          approach: String.raw`$a_n\ge1$ であるかぎり $a_{n+1}-2=2\left(a_n-2\right)$ となり、$a_n-2$ が公比 $2$ の等比数列になる。$\alpha>2$ なら初項が正なので、$a_n$ はずっと $2$ より大きく、場合分けが切り替わらない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_n\ge1$ のときは $a_{n+1}=2\left(a_n-1\right)$ で、両辺から $2$ を引くと`,
            },
            { k: "math", t: String.raw`a_{n+1}-2=2\left(a_n-2\right)` },
            {
              k: "p",
              t: String.raw`となる。$\alpha>2$ のとき $a_1-2=\alpha-2>0$ なので、帰納的に $a_n-2>0$、すなわち $a_n>2\ge1$ が続き、この式をずっと使える。よって`,
            },
            { k: "math", t: String.raw`a_n-2=(\alpha-2)\,2^{\,n-1},\qquad a_n=2+(\alpha-2)\,2^{\,n-1}` },
            {
              k: "p",
              t: String.raw`である。$\alpha-2>0$ と $2^{\,n-1}\to\infty$ より`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}a_n=+\infty` },
            { k: "p", t: String.raw`で、$\{a_n\}$ は正の無限大に発散する。` },
          ],
          pitfalls: [
            String.raw`$a_{n+1}=2(a_n-1)$ が使えるのは $a_n\ge1$ のときだけである。「$a_n>2$ がずっと続く」ことを帰納法で押さえてから一般項を書く。`,
            String.raw`$\alpha=2$ のときは $a_n=2$ のまま（$2$ に収束）で、発散しない。$\alpha>2$ という条件が効いている。`,
          ],
          check: String.raw`$\alpha=2.0001$ で $a_{200}=1.61\times10^{56}$、$\alpha=3$ で $1.61\times10^{60}$ と、$(\alpha-2)2^{199}$ に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$1<\alpha<\dfrac32$ のとき数列 $\{a_n\}$ の収束・発散を調べる`,
          answer: String.raw`$0$ に収束する（$a_3$ 以降はすべて $0$）`,
          approach: String.raw`$a_1=\alpha\ge1$ なので $a_2=2\alpha-2$ である。$\alpha<\dfrac32$ だと $a_2<1$ になり、そこから先は (1) と同じく $0$ に落ちる。`,
          blocks: [
            { k: "p", t: String.raw`$1<\alpha$ より $a_1\ge1$ なので` },
            { k: "math", t: String.raw`a_2=2(\alpha-1)=2\alpha-2` },
            { k: "p", t: String.raw`である。$1<\alpha<\dfrac32$ だから` },
            { k: "math", t: String.raw`0<a_2<2\cdot\frac32-2=1` },
            {
              k: "p",
              t: String.raw`すなわち $a_2<1$ である。よって $a_3=f(a_2)=0$ となり、以後 $a_n=0$（$n\ge3$）である。したがって $\{a_n\}$ は $0$ に収束する。`,
            },
            {
              k: "note",
              t: String.raw`$\alpha=\dfrac32$ だとちょうど $a_2=1$ になり、$a_3=2(1-1)=0$。やはり $0$ に落ちるが、1回ぶん長くもつ。この境目が (3) と (4) を分けている。`,
            },
          ],
          pitfalls: [
            String.raw`$a_2=2\alpha-2$ が $1$ 未満かどうかを決めるのは $\alpha<\frac32$ である。$\frac32$ という半端な境目はここから出てくる。`,
            String.raw`$a_2>0$ でも $1$ 未満なら次は $0$ である。「正だから減りながら続く」ではない。`,
          ],
          check: String.raw`$\alpha=1.2$ で $a_2=0.4<1$、$\alpha=1.49$ で $a_2=0.98<1$ となり、どちらも $a_{200}=0$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$\dfrac32\le\alpha<2$ のとき数列 $\{a_n\}$ の収束・発散を調べる`,
          answer: String.raw`$0$ に収束する（ある $N$ から先はすべて $0$）`,
          approach: String.raw`この範囲では $a_2\ge1$ なので、すぐには $0$ に落ちない。$a_n=2-(2-\alpha)2^{\,n-1}$ と書けるので、$2-\alpha>0$ より $(2-\alpha)2^{\,n-1}$ はいくらでも大きくなり、いつかは $a_n<1$ になる。そこから先は $0$ である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_n\ge1$ であるかぎり (2) と同じ式が使えて`,
            },
            { k: "math", t: String.raw`a_n=2+(\alpha-2)\,2^{\,n-1}=2-(2-\alpha)\,2^{\,n-1}` },
            {
              k: "p",
              t: String.raw`である。$\dfrac32\le\alpha<2$ では $0<2-\alpha\le\dfrac12$ なので、$a_n$ は $n$ とともに**減っていく**。`,
            },
            {
              k: "p",
              t: String.raw`**いつかは $1$ を下回る。** $2^{\,n-1}\to\infty$ かつ $2-\alpha>0$ だから $(2-\alpha)2^{\,n-1}\to\infty$ で、`,
            },
            { k: "math", t: String.raw`(2-\alpha)\,2^{\,n-1}>1` },
            {
              k: "p",
              t: String.raw`をみたす $n$ が存在する。そのような最小の $n$ を $N$ とすると、$n<N$ では $a_n\ge1$ なので上の式が使えて、$a_N=2-(2-\alpha)2^{\,N-1}<1$ である。`,
            },
            {
              k: "p",
              t: String.raw`$a_N<1$ だから $a_{N+1}=f(a_N)=0$ で、以後 $a_n=0$ である。よって $\{a_n\}$ は $0$ に収束する。`,
            },
            {
              k: "note",
              t: String.raw`$\alpha=2$ だけが例外で、このとき $a_n=2$（すべての $n$）となり $2$ に収束する。$\alpha<2$ ならどんなに $2$ に近くても、有限回で $0$ に落ちる。`,
            },
          ],
          pitfalls: [
            String.raw`(3) と違って「$a_2<1$」とは言えない。$a_2=2\alpha-2\ge1$ である。何回かかるかは $\alpha$ によるので、「ある $N$ が存在する」という形で書く。`,
            String.raw`$2^{\,n-1}$ がいくらでも大きくなることを根拠にする。$2-\alpha$ が小さくても、かけ算で必ず $1$ を超える。`,
            String.raw`$a_N=1$ ちょうどになることもある（$\alpha=2-2^{-(N-1)}$）。そのときも $a_{N+1}=2(1-1)=0$ なので結論は変わらない。`,
          ],
          check: String.raw`$\alpha=1.5$ では $a_2=1$、$a_3=0$。$\alpha=1.99$ では $a_8=0.72<1$ となって $a_9=0$。いずれも $a_{200}=0$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "ベクトル",
      topics: ["1次独立", "連立1次方程式", "格子点の基底", "整数解"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,c,d$ をランダムに $2$ 万組とって、$\\vec v=\\left(\\frac dD,-\\frac bD\\right)$、$\\vec w=\\left(-\\frac cD,\\frac aD\\right)$ が4つの条件をみたすことを確かめた",
          "$-4\\le a,b,c,d\\le4$ の整数をすべて走査して、$-3\\le q_1,q_2\\le3$ の整数ベクトルすべてに対し $r,s$ が整数になる $D$ を集めると $\\{-1,1\\}$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件 I がすべての $\vec q$ に対して成り立つとき $D\ne0$ であることを示す`,
          answer: String.raw`$D=0$ なら $r\vec m+s\vec n$ は1本の直線上しか動けず、その外の $\vec q$ をとれない`,
          approach: String.raw`対偶を示す。$D=0$ は $\vec m$ と $\vec n$ が平行であることを意味するので、$r\vec m+s\vec n$ の動ける範囲は原点を通る1本の直線に限られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`対偶「$D=0$ ならば、条件 I をみたさない $\vec q$ が存在する」を示す。`,
            },
            {
              k: "p",
              t: String.raw`**$D=0$ は平行を意味する。** $D=ad-bc=0$ とする。$\vec m=(a,c)\ne\vec0$ なので $a\ne0$ または $c\ne0$ である。$a\ne0$ のとき $d=\dfrac{bc}a$ だから`,
            },
            {
              k: "math",
              t: String.raw`\vec n=(b,d)=\left(b,\;\frac{bc}a\right)=\frac ba\,(a,c)=\frac ba\,\vec m`,
            },
            {
              k: "p",
              t: String.raw`となり $\vec n$ は $\vec m$ の実数倍である。$c\ne0$ のときも $b=\dfrac{ad}c$ から同様に $\vec n=\dfrac dc\vec m$ となる。`,
            },
            {
              k: "p",
              t: String.raw`**動ける範囲。** $\vec n=k\vec m$ と書けるので`,
            },
            { k: "math", t: String.raw`r\vec m+s\vec n=(r+sk)\,\vec m` },
            {
              k: "p",
              t: String.raw`である。$r,s$ を実数全体で動かしても、これは $\vec m$ の実数倍しか作れない。つまり原点を通る直線 $\ell$（方向 $\vec m$）の上の点だけである。`,
            },
            {
              k: "p",
              t: String.raw`$\vec m=(a,c)\ne\vec0$ だから、$\ell$ に乗らないベクトル、たとえば $\vec q=(-c,a)$（$\vec m$ と垂直で $\vec0$ でない）は作れない。これは「条件 I がすべての $\vec q$ で成り立つ」に反する。`,
            },
            { k: "p", t: String.raw`よって対偶が示され、$D\ne0$ である。` },
          ],
          pitfalls: [
            String.raw`$\vec m\ne\vec0$、$\vec n\ne\vec0$ が仮定に入っている。$\vec m=\vec0$ の場合を気にする必要はない。`,
            String.raw`$D=0$ から $\vec n=k\vec m$ を導くとき、$a=0$ か $c=0$ かで場合分けが要る。いきなり割らない。`,
            String.raw`反例の $\vec q$ は具体的に挙げる。$(-c,a)$ は $\vec m$ と垂直なので、$\vec m$ の実数倍にはなりえない。`,
          ],
          check: String.raw`$\vec m=(1,2)$、$\vec n=(2,4)$（$D=0$）では $r\vec m+s\vec n$ は直線 $y=2x$ 上しか動かず、$\vec q=(-2,1)$ は作れない。`,
        },
        {
          label: "(2)",
          task: String.raw`$\vec m\cdot\vec v=\vec n\cdot\vec w=1$、$\vec m\cdot\vec w=\vec n\cdot\vec v=0$ をみたす $\vec v,\vec w$ を求める`,
          answer: String.raw`$\vec v=\left(\dfrac dD,\;-\dfrac bD\right)$、$\vec w=\left(-\dfrac cD,\;\dfrac aD\right)$`,
          approach: String.raw`$\vec v=(v_1,v_2)$ とおくと、条件は $v_1,v_2$ についての連立1次方程式になる。係数行列の「たすきがけ」がちょうど $D$ で、$D\ne0$ だから一意に解ける。`,
          blocks: [
            { k: "p", t: String.raw`**$\vec v$ を求める。** $\vec v=(v_1,v_2)$ とおくと条件は` },
            {
              k: "math",
              t: String.raw`\begin{cases}\vec m\cdot\vec v=a\,v_1+c\,v_2=1\\[1mm]\vec n\cdot\vec v=b\,v_1+d\,v_2=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。上を $d$ 倍、下を $c$ 倍して引くと $(ad-bc)v_1=d$、つまり $v_1=\dfrac dD$。上を $b$ 倍、下を $a$ 倍して引くと $(bc-ad)v_2=b$、つまり $v_2=-\dfrac bD$。よって`,
            },
            { k: "math", t: String.raw`\vec v=\left(\frac dD,\;-\frac bD\right)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$\vec w$ を求める。** $\vec w=(w_1,w_2)$ とおくと` },
            {
              k: "math",
              t: String.raw`\begin{cases}a\,w_1+c\,w_2=0\\[1mm]b\,w_1+d\,w_2=1\end{cases}`,
            },
            { k: "p", t: String.raw`で、同じように解いて` },
            { k: "math", t: String.raw`\vec w=\left(-\frac cD,\;\frac aD\right)` },
            { k: "p", t: String.raw`である。$D\ne0$ なのでどちらも一意に定まる。` },
            {
              k: "note",
              t: String.raw`この $\vec v,\vec w$ の役目は「$\vec q=r\vec m+s\vec n$ と書けたとき、$r$ と $s$ を取り出す」ことである。実際、内積をとると$\vec q\cdot\vec v=r\left(\vec m\cdot\vec v\right)+s\left(\vec n\cdot\vec v\right)=r$、同様に $\vec q\cdot\vec w=s$ となる。(3) はこの性質で解ける。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec v$ は「$\vec m$ 方向」ではない。$\vec n$ と垂直で、$\vec m$ との内積が $1$ になるベクトルである。`,
            String.raw`成分の位置に注意。$\vec v$ には $d,b$、$\vec w$ には $c,a$ が出る。入れ替えないこと。`,
          ],
          check: String.raw`$a,b,c,d$ をランダムに $2$ 万組とって4つの内積を計算すると、すべて条件どおりだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a,b,c,d$ が整数で、成分が整数のすべての $\vec q$ に対して条件 II が成り立つとき、$D$ のとりうる値をすべて求める`,
          answer: String.raw`$D=1,\;-1$`,
          approach: String.raw`(2) の注のとおり $r=\vec q\cdot\vec v$、$s=\vec q\cdot\vec w$ である。$\vec q=(1,0),(0,1)$ の2つを入れるだけで $D$ が $a,b,c,d$ のすべてを割ることが分かり、そこから $D^{2}\mid D$ が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$r,s$ を書き下す。** $\vec q=r\vec m+s\vec n$ のとき、$\vec v$ との内積をとると`,
            },
            {
              k: "math",
              t: String.raw`\vec q\cdot\vec v=r\left(\vec m\cdot\vec v\right)+s\left(\vec n\cdot\vec v\right)=r\cdot1+s\cdot0=r`,
            },
            { k: "p", t: String.raw`であり、同様に $s=\vec q\cdot\vec w$ である。したがって $\vec q=(q_1,q_2)$ に対して` },
            {
              k: "math",
              t: String.raw`r=\frac{q_1d-q_2b}{D},\qquad s=\frac{-q_1c+q_2a}{D}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$D$ が4つすべてを割る。** 条件 II より、これらが整数になる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\vec q=(1,0)$：$r=\dfrac dD$、$s=-\dfrac cD$ が整数 $\Rightarrow$ $D$ は $d$ と $c$ を割る`,
                String.raw`$\vec q=(0,1)$：$r=-\dfrac bD$、$s=\dfrac aD$ が整数 $\Rightarrow$ $D$ は $b$ と $a$ を割る`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $a=Da'$、$b=Db'$、$c=Dc'$、$d=Dd'$ と整数で書ける。すると`,
            },
            {
              k: "math",
              t: String.raw`D=ad-bc=D^{2}\left(a'd'-b'c'\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$D\ne0$ なので両辺を $D$ で割って`,
            },
            { k: "math", t: String.raw`1=D\left(a'd'-b'c'\right)` },
            {
              k: "p",
              t: String.raw`となる。$D$ も $a'd'-b'c'$ も整数だから $D=\pm1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**逆も成り立つ。** $D=\pm1$ なら (2) の $\vec v,\vec w$ の成分 $\dfrac dD,-\dfrac bD,-\dfrac cD,\dfrac aD$ はすべて整数である。よって整数ベクトル $\vec q$ に対し $r=\vec q\cdot\vec v$、$s=\vec q\cdot\vec w$ はどちらも整数で、条件 II が成り立つ。`,
            },
            { k: "p", t: String.raw`したがって $D$ のとりうる値は` },
            { k: "math", t: String.raw`D=1,\;-1` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$r,s$ が整数として存在する」を使うには、まず $r,s$ が一意に決まることを言う必要がある。(2) の $\vec v,\vec w$ がその役目を果たす。`,
            String.raw`$\vec q=(1,0)$ と $(0,1)$ の2つだけで $a,b,c,d$ すべてが $D$ で割り切れると分かる。すべての $\vec q$ を相手にしなくてよい。`,
            String.raw`$D=\pm1$ が十分条件でもあることを示さないと「とりうる値」として確定しない。逆向きを忘れない。`,
          ],
          check: String.raw`$-4\le a,b,c,d\le4$ の整数をすべて走査し、$-3\le q_1,q_2\le3$ の整数ベクトルすべてで $r,s$ が整数になるものを集めると、$D$ は $-1$ と $1$ しか現れなかった。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法",
      topics: ["関数方程式", "加法定理", "微分可能性", "指数関数と三角関数"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=e^{ax}\\cos bx$、$g(x)=e^{ax}\\sin bx$ が条件 (A)(B) をみたすことを、$a,b,x,y$ をランダムに $2$ 万組とって確かめた",
          "$f(0)=1$、$g(0)=0$、$f'(0)=a$、$g'(0)=b$ を数値微分で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件 (A), (B), (C) から $f(0)=1$、$g(0)=0$ となることを示す`,
          answer: String.raw`(B) で $x=y=0$ とすると $g(0)\left\{1-2f(0)\right\}=0$、$f(0)=\frac12$ は (A) に反するので $g(0)=0$、すると (A) から $f(0)=1$`,
          approach: String.raw`(A) と (B) に $x=y=0$ を代入する。(B) のほうが因数分解しやすく、$g(0)=0$ か $f(0)=\frac12$ の2択になる。後者を (A) で潰す。`,
          blocks: [
            { k: "p", t: String.raw`$x=y=0$ を代入する。(A) から` },
            { k: "math", t: String.raw`f(0)=f(0)^{2}-g(0)^{2}\quad\cdots\text{①}` },
            { k: "p", t: String.raw`(B) から` },
            { k: "math", t: String.raw`g(0)=2f(0)g(0)\quad\Longleftrightarrow\quad g(0)\left\{1-2f(0)\right\}=0` },
            { k: "p", t: String.raw`である。よって $g(0)=0$ または $f(0)=\dfrac12$ である。` },
            {
              k: "p",
              t: String.raw`**$f(0)=\dfrac12$ は起こらない。** これを ① に入れると`,
            },
            {
              k: "math",
              t: String.raw`\frac12=\frac14-g(0)^{2}\quad\Longrightarrow\quad g(0)^{2}=-\frac14`,
            },
            {
              k: "p",
              t: String.raw`となるが、$g$ は実数値関数なので $g(0)^{2}\ge0$ であり、矛盾する。`,
            },
            {
              k: "p",
              t: String.raw`**よって $g(0)=0$。** ① に入れると $f(0)=f(0)^{2}$、すなわち $f(0)\left\{f(0)-1\right\}=0$ である。(C) より $f(0)\ne0$ だから`,
            },
            { k: "math", t: String.raw`f(0)=1,\qquad g(0)=0` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`(C) の $f(0)\ne0$ は最後に効く。これがないと $f(0)=0$、$g(0)=0$ という自明な解（$f\equiv g\equiv0$）が残る。`,
            String.raw`$f(0)=\frac12$ を切るのに「実数値関数」であることを使う。問題文に書いてある条件なので、根拠として挙げておく。`,
          ],
          check: String.raw`$f(x)=e^{ax}\cos bx$、$g(x)=e^{ax}\sin bx$ では $f(0)=1$、$g(0)=0$ で、確かに条件どおりだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ がすべての $x$ で微分可能で $f'(x)=-g(x)$ となることを示す`,
          answer: String.raw`$\dfrac{f(x+h)-f(x)}{h}=f(x)\cdot\dfrac{f(h)-f(0)}{h}-g(x)\cdot\dfrac{g(h)-g(0)}{h}\to-g(x)$`,
          approach: String.raw`加法定理 (A) を使って $f(x+h)-f(x)$ を「$x$ の関数」$\times$「$h$ だけの差分商」の形に直す。(1) で $f(0)=1$、$g(0)=0$ が分かっているので、$x=0$ での微分可能性（条件 (D)）だけで極限が出る。`,
          blocks: [
            { k: "p", t: String.raw`(A) より $f(x+h)=f(x)f(h)-g(x)g(h)$ なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(x+h)-f(x)&=f(x)\left\{f(h)-1\right\}-g(x)g(h)\\[1mm]
&=f(x)\left\{f(h)-f(0)\right\}-g(x)\left\{g(h)-g(0)\right\}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（(1) の $f(0)=1$、$g(0)=0$ を使った）。両辺を $h\;(\ne0)$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`\frac{f(x+h)-f(x)}{h}=f(x)\cdot\frac{f(h)-f(0)}{h}-g(x)\cdot\frac{g(h)-g(0)}{h}`,
            },
            {
              k: "p",
              t: String.raw`となる。条件 (D) より $f,g$ は $x=0$ で微分可能で $f'(0)=0$、$g'(0)=1$ だから、$h\to0$ のとき右辺の2つの差分商はそれぞれ $f'(0)=0$、$g'(0)=1$ に収束する。よって`,
            },
            {
              k: "math",
              t: String.raw`\lim_{h\to0}\frac{f(x+h)-f(x)}{h}=f(x)\cdot0-g(x)\cdot1=-g(x)`,
            },
            {
              k: "p",
              t: String.raw`である。極限が存在したので $f$ は**すべての $x$ で**微分可能で、$f'(x)=-g(x)$ である。`,
            },
            {
              k: "note",
              t: String.raw`まったく同じやり方を (B) に施すと $g'(x)=f(x)$ が出る。(3) ではこちらも使う。`,
            },
          ],
          pitfalls: [
            String.raw`「$x=0$ でしか微分可能と仮定されていない」のがこの問題の肝である。加法定理で $h$ を $0$ のそばに追い出すのが要点。`,
            String.raw`$f(h)-1$ を $f(h)-f(0)$ と書き直すところで (1) を使う。ここを飛ばすと差分商の形にならない。`,
            String.raw`「極限が存在するから微分可能」と、微分可能性のほうを結論として書く。先に $f'(x)$ があると仮定しない。`,
          ],
          check: String.raw`$f(x)=\cos x$、$g(x)=\sin x$ では $f'(x)=-\sin x=-g(x)$ で、確かに成り立つ。`,
        },
        {
          label: "(3)",
          task: String.raw`$\left\{f(x)+ig(x)\right\}\left(\cos x-i\sin x\right)=1$ となることを示す`,
          answer: String.raw`実部 $u=f\cos x+g\sin x$、虚部 $v=g\cos x-f\sin x$ はともに導関数が $0$ で、$u(0)=1$、$v(0)=0$`,
          approach: String.raw`左辺を展開して実部と虚部に分け、それぞれを微分する。(2) の $f'=-g$、$g'=f$ を使うと、どちらも $0$ になって定数だと分かる。あとは $x=0$ の値を見るだけ。`,
          blocks: [
            { k: "p", t: String.raw`左辺を展開すると` },
            {
              k: "math",
              t: String.raw`\left\{f(x)+ig(x)\right\}\left(\cos x-i\sin x\right)=u(x)+i\,v(x)`,
            },
            { k: "p", t: String.raw`ただし` },
            {
              k: "math",
              t: String.raw`u(x)=f(x)\cos x+g(x)\sin x,\qquad v(x)=g(x)\cos x-f(x)\sin x`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$u,v$ は定数。** (2) より $f'=-g$、$g'=f$（同じ議論を (B) に施して得られる）だから`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
u'(x)&=f'\cos x-f\sin x+g'\sin x+g\cos x\\[1mm]
&=-g\cos x-f\sin x+f\sin x+g\cos x=0
\end{aligned}`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
v'(x)&=g'\cos x-g\sin x-f'\sin x-f\cos x\\[1mm]
&=f\cos x-g\sin x+g\sin x-f\cos x=0
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。導関数が恒等的に $0$ なので $u,v$ はともに定数関数である。`,
            },
            { k: "p", t: String.raw`**値を決める。** (1) より $f(0)=1$、$g(0)=0$ だから` },
            {
              k: "math",
              t: String.raw`u(0)=1\cdot1+0\cdot0=1,\qquad v(0)=0\cdot1-1\cdot0=0`,
            },
            { k: "p", t: String.raw`である。よって $u(x)\equiv1$、$v(x)\equiv0$、すなわち` },
            {
              k: "math",
              t: String.raw`\left\{f(x)+ig(x)\right\}\left(\cos x-i\sin x\right)=1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この等式から $f(x)+ig(x)=\dfrac1{\cos x-i\sin x}=\cos x+i\sin x$ となり、実部・虚部を比べて $f(x)=\cos x$、$g(x)=\sin x$ が出る。`,
            },
          ],
          pitfalls: [
            String.raw`複素数のまま微分するのではなく、実部 $u$ と虚部 $v$ に分けてから実関数として微分する。高校の範囲で書くならこの形がよい。`,
            String.raw`$g'(x)=f(x)$ は (2) の文面には出てこないが、同じ議論で得られる。使う前にひとこと断る。`,
            String.raw`$\left|\cos x-i\sin x\right|=1$ なので $\cos x-i\sin x$ は決して $0$ にならない。割り算してよい。`,
          ],
          check: String.raw`$f=\cos x$、$g=\sin x$ とすると $u=\cos^{2}x+\sin^{2}x=1$、$v=\sin x\cos x-\cos x\sin x=0$ で、確かに $1$ になる。`,
        },
        {
          label: "(4)",
          task: String.raw`$p(x)=e^{-\frac ab x}f\!\left(\frac xb\right)$、$q(x)=e^{-\frac ab x}g\!\left(\frac xb\right)$ が (B), (D) をみたすことを示し、$f(x)$、$g(x)$ を求める`,
          answer: String.raw`$f(x)=e^{ax}\cos bx$、$g(x)=e^{ax}\sin bx$`,
          approach: String.raw`(B) の確認は、指数の部分が $e^{-\frac ab x}e^{-\frac ab y}=e^{-\frac ab(x+y)}$ ときれいに揃うので、$f,g$ の (B) をそのまま使える。(D) は積の微分で $x=0$ の値を計算するだけ。あとは前半の結論 $p=\cos$、$q=\sin$ を逆に解く。`,
          blocks: [
            { k: "p", t: String.raw`**(B) の確認。** 右辺を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
p(x)q(y)+q(x)p(y)
&=e^{-\frac ab x}f\!\left(\tfrac xb\right)e^{-\frac ab y}g\!\left(\tfrac yb\right)
+e^{-\frac ab x}g\!\left(\tfrac xb\right)e^{-\frac ab y}f\!\left(\tfrac yb\right)\\[1mm]
&=e^{-\frac ab(x+y)}\left\{f\!\left(\tfrac xb\right)g\!\left(\tfrac yb\right)+g\!\left(\tfrac xb\right)f\!\left(\tfrac yb\right)\right\}\\[1mm]
&=e^{-\frac ab(x+y)}\,g\!\left(\tfrac xb+\tfrac yb\right)=e^{-\frac ab(x+y)}\,g\!\left(\tfrac{x+y}b\right)=q(x+y)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（3行目で $f,g$ の条件 (B) を使った）。よって $p,q$ は (B) をみたす。`,
            },
            {
              k: "p",
              t: String.raw`**(D) の確認。** $f,g$ は $x=0$ で微分可能なので、積と合成の微分より $p,q$ も $x=0$ で微分可能で`,
            },
            {
              k: "math",
              t: String.raw`p'(x)=-\frac ab\,e^{-\frac ab x}f\!\left(\tfrac xb\right)+\frac1b\,e^{-\frac ab x}f'\!\left(\tfrac xb\right)`,
            },
            { k: "p", t: String.raw`である。$x=0$ を代入し、$f(0)=1$、$f'(0)=a$（条件 (D)$'$）を使うと` },
            {
              k: "math",
              t: String.raw`p'(0)=-\frac ab\cdot1+\frac1b\cdot a=0`,
            },
            { k: "p", t: String.raw`となる。同様に $g(0)=0$、$g'(0)=b$ より` },
            {
              k: "math",
              t: String.raw`q'(0)=-\frac ab\cdot0+\frac1b\cdot b=1`,
            },
            { k: "p", t: String.raw`である。よって $p,q$ は (D) をみたす。` },
            {
              k: "p",
              t: String.raw`**$f,g$ を求める。** 前半の結論より $p(x)=\cos x$、$q(x)=\sin x$ である。定義式に戻して`,
            },
            {
              k: "math",
              t: String.raw`e^{-\frac ab x}f\!\left(\frac xb\right)=\cos x\quad\Longrightarrow\quad f\!\left(\frac xb\right)=e^{\frac ab x}\cos x`,
            },
            { k: "p", t: String.raw`である。$t=\dfrac xb$、すなわち $x=bt$ とおくと` },
            {
              k: "math",
              t: String.raw`f(t)=e^{at}\cos bt`,
            },
            { k: "p", t: String.raw`となる。同様に` },
            {
              k: "math",
              t: String.raw`g(t)=e^{at}\sin bt`,
            },
            { k: "p", t: String.raw`である。つまり空欄は` },
            {
              k: "math",
              t: String.raw`\boxed{\;\text{ア}\;}=e^{ax}\cos bx,\qquad\boxed{\;\text{イ}\;}=e^{ax}\sin bx`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$b\ne0$ という仮定は、$\frac xb$ と $\frac ab$ を作るために必要である。$b=0$ だと $g'(0)=0$ となり、$g\equiv0$、$f(x)=e^{ax}$ という別の形になる。`,
            },
          ],
          pitfalls: [
            String.raw`$p,q$ が (B) をみたす計算では、$e^{-\frac ab x}e^{-\frac ab y}$ が $e^{-\frac ab(x+y)}$ にまとまることが要点である。指数の肩が $x+y$ で揃うから加法定理がそのまま移る。`,
            String.raw`$p'(0)$ の計算で $f'\!\left(\frac xb\right)$ の係数 $\frac1b$（合成関数の微分）を落とさない。`,
            String.raw`最後に $t=\frac xb$ で変数を戻す。$f\!\left(\frac xb\right)$ のままでは答えにならない。`,
          ],
          check: String.raw`$f(x)=e^{ax}\cos bx$、$g(x)=e^{ax}\sin bx$ について、$a,b,x,y$ をランダムに $2$ 万組とって (A), (B) を確かめるとすべて成立した。数値微分でも $f'(0)=a$、$g'(0)=b$ になった。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["媒介変数表示", "接線", "面積", "単調性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\frac{dx}{dt}=1+2\\sin2t=0$ の解が $0<t<\\pi$ に $t=\\frac{7\\pi}{12},\\frac{11\\pi}{12}$ の2つあり、そこでの $x$ が $3.698621$ と $3.013768$ で異なることを確かめた",
          "面積 $\\int(x-y)\\,dy$ を $200$ 万点で数値積分すると $1.2283696986$ となり、$\\frac{2\\pi}3-\\frac{\\sqrt3}2=1.2283696986$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`曲線 $C$ に接する直線のうち $y$ 軸と平行なものがいくつあるかを求める`,
          answer: String.raw`2つ`,
          approach: String.raw`$y$ 軸に平行な接線をもつのは $\dfrac{dx}{dt}=0$ かつ $\dfrac{dy}{dt}\ne0$ のところである。$\dfrac{dx}{dt}=1+2\sin2t$ なので $\sin2t=-\dfrac12$ を解く。`,
          blocks: [
            { k: "p", t: String.raw`$x=t+2\sin^{2}t=t+1-\cos2t$ なので` },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=1+2\sin2t,\qquad\frac{dy}{dt}=1+\cos t`,
            },
            {
              k: "p",
              t: String.raw`である。$0<t<\pi$ では $\cos t>-1$ なので $\dfrac{dy}{dt}>0$、つまり $\dfrac{dy}{dt}$ は決して $0$ にならない。`,
            },
            {
              k: "p",
              t: String.raw`**$\dfrac{dx}{dt}=0$ を解く。** $\sin2t=-\dfrac12$ で、$0<t<\pi$ より $0<2t<2\pi$ だから`,
            },
            {
              k: "math",
              t: String.raw`2t=\frac{7\pi}6,\;\frac{11\pi}6\qquad\Longrightarrow\qquad t=\frac{7\pi}{12},\;\frac{11\pi}{12}`,
            },
            {
              k: "p",
              t: String.raw`の2つである。どちらでも $\dfrac{dy}{dt}>0$ なので、接線は $y$ 軸に平行になる。`,
            },
            {
              k: "p",
              t: String.raw`**異なる直線か。** 2つの $t$ での $x$ 座標を比べる。$x=t+1-\cos2t$ で $\cos\dfrac{7\pi}6=-\dfrac{\sqrt3}2$、$\cos\dfrac{11\pi}6=\dfrac{\sqrt3}2$ だから`,
            },
            {
              k: "math",
              t: String.raw`x=\frac{7\pi}{12}+1+\frac{\sqrt3}2\;(=3.6986),\qquad x=\frac{11\pi}{12}+1-\frac{\sqrt3}2\;(=3.0138)`,
            },
            { k: "p", t: String.raw`と異なる。よって求める直線は**2つ**である。` },
          ],
          pitfalls: [
            String.raw`$\frac{dy}{dt}\ne0$ も確かめる。両方 $0$ だと接線の向きが決まらない。`,
            String.raw`$0<t<\pi$ を $0<2t<2\pi$ に直してから $\sin2t=-\frac12$ を解く。$2t$ の範囲を $(0,\pi)$ のままにすると解を落とす。`,
            String.raw`「$t$ が2つ」で終わらせず、$x$ 座標が異なる（＝直線が2本ある）ことを確かめる。`,
          ],
          check: String.raw`$t=\frac{7\pi}{12}=1.832596$、$\frac{11\pi}{12}=2.879793$ で $\frac{dx}{dt}=0$ になり、$x$ はそれぞれ $3.698621$、$3.013768$ と異なった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ のうち $y\le x$ にある部分と直線 $y=x$ で囲まれた図形の面積を求める`,
          answer: String.raw`$\dfrac{2\pi}3-\dfrac{\sqrt3}2$`,
          approach: String.raw`$\dfrac{dy}{dt}=1+\cos t>0$ なので $y$ は $t$ の増加関数、つまり $C$ は「$x$ を $y$ の関数として表したグラフ」である。だから面積は $\displaystyle\int(x-y)\,dy$ でよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$y\le x$ となる $t$ の範囲。** $x-y=2\sin^{2}t-\sin t=\sin t\left(2\sin t-1\right)$ で、$0<t<\pi$ では $\sin t>0$ だから`,
            },
            {
              k: "math",
              t: String.raw`x-y\ge0\quad\Longleftrightarrow\quad\sin t\ge\frac12\quad\Longleftrightarrow\quad\frac\pi6\le t\le\frac{5\pi}6`,
            },
            {
              k: "p",
              t: String.raw`である。両端 $t=\dfrac\pi6,\dfrac{5\pi}6$ では $x=y$ となり、$C$ は直線 $y=x$ 上にある。`,
            },
            {
              k: "p",
              t: String.raw`**$x$ は $y$ の関数。** $\dfrac{dy}{dt}=1+\cos t>0$ なので、$y$ は $t$ について狭義増加である。したがって $C$ 上の点は $y$ の値で一意に決まり、$x$ を $y$ の関数とみてよい（$x$ のほうは (1) で見たとおり増減するが、面積計算には関係しない）。`,
            },
            {
              k: "p",
              t: String.raw`**面積。** 同じ $y$ に対する「曲線の $x$」と「直線の $x\,(=y)$」の差を $y$ で積分すればよい。$dy=(1+\cos t)\,dt$ だから`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac\pi6}^{\frac{5\pi}6}\left(2\sin^{2}t-\sin t\right)\left(1+\cos t\right)dt`,
            },
            { k: "p", t: String.raw`である。展開すると` },
            {
              k: "math",
              t: String.raw`\left(2\sin^{2}t-\sin t\right)\left(1+\cos t\right)=2\sin^{2}t-\sin t+2\sin^{2}t\cos t-\sin t\cos t`,
            },
            { k: "p", t: String.raw`で、4つの項を順に積分する。` },
            {
              k: "steps",
              items: [
                String.raw`$\displaystyle\int_{\frac\pi6}^{\frac{5\pi}6}2\sin^{2}t\,dt=\Bigl[t-\tfrac12\sin2t\Bigr]_{\frac\pi6}^{\frac{5\pi}6}=\left(\tfrac{5\pi}6+\tfrac{\sqrt3}4\right)-\left(\tfrac\pi6-\tfrac{\sqrt3}4\right)=\tfrac{2\pi}3+\tfrac{\sqrt3}2$`,
                String.raw`$\displaystyle\int_{\frac\pi6}^{\frac{5\pi}6}(-\sin t)\,dt=\Bigl[\cos t\Bigr]_{\frac\pi6}^{\frac{5\pi}6}=-\tfrac{\sqrt3}2-\tfrac{\sqrt3}2=-\sqrt3$`,
                String.raw`$\displaystyle\int_{\frac\pi6}^{\frac{5\pi}6}2\sin^{2}t\cos t\,dt=\Bigl[\tfrac23\sin^{3}t\Bigr]_{\frac\pi6}^{\frac{5\pi}6}=\tfrac1{12}-\tfrac1{12}=0$`,
                String.raw`$\displaystyle\int_{\frac\pi6}^{\frac{5\pi}6}(-\sin t\cos t)\,dt=\Bigl[\tfrac14\cos2t\Bigr]_{\frac\pi6}^{\frac{5\pi}6}=\tfrac18-\tfrac18=0$`,
              ],
            },
            { k: "p", t: String.raw`足し合わせて` },
            {
              k: "math",
              t: String.raw`S=\frac{2\pi}3+\frac{\sqrt3}2-\sqrt3=\frac{2\pi}3-\frac{\sqrt3}2`,
            },
            { k: "p", t: String.raw`である（$1.2284$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`曲線 $C$（$0<t<\pi$）と直線 $y=x$。$t=\frac\pi6$ と $t=\frac{5\pi}6$ で交わり、その間で $C$ は直線の右側（$y\le x$）にある。$t=\frac{7\pi}{12}$ 付近で $x$ がいったん最大になり、曲線が折り返しているのが (1) の2本の鉛直接線にあたる。`,
                view: [-0.2, 4.4, -0.2, 3.9],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [CX23(t), CY23(t)],
                    from: 0.001,
                    to: Math.PI - 0.001,
                  },
                  { k: "seg", a: [0, 0], b: [3.9, 3.9], dash: true },
                  {
                    k: "dot",
                    at: [CX23(Math.PI / 6), CY23(Math.PI / 6)],
                    label: "t = π/6",
                    place: "below-right",
                  },
                  {
                    k: "dot",
                    at: [CX23((5 * Math.PI) / 6), CY23((5 * Math.PI) / 6)],
                    label: "t = 5π/6",
                    place: "left",
                  },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x$ は単調でない（(1) で見たとおり折り返す）が、$y$ は単調増加である。だから「$y$ で積分する」ほうを選ぶ。$x$ で積分しようとすると場合分けが要る。`,
            String.raw`$y\le x$ の範囲は $\sin t\ge\frac12$、つまり $\frac\pi6\le t\le\frac{5\pi}6$ である。$\sin t\le\frac12$ と向きを取り違えない。`,
            String.raw`$dy=(1+\cos t)dt$ を掛け忘れない。$\int(x-y)dt$ ではない。`,
          ],
          check: String.raw`$\int_{\pi/6}^{5\pi/6}(x-y)(1+\cos t)\,dt$ を $200$ 万点のシンプソン法で計算すると $1.2283696986$ となり、$\frac{2\pi}3-\frac{\sqrt3}2=1.2283696986$ と一致した。`,
        },
      ],
    },
  ],
};
