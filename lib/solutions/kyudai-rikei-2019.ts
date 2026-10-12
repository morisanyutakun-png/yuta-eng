import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2019年度（平成31年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第4問の3点。正三角形 OAB。 */
const O19: [number, number] = [0, 0];
const A19: [number, number] = [2, 0];
const B19: [number, number] = [1, Math.sqrt(3)];
/** 極限の点 (5/3, √3/3)。 */
const L19: [number, number] = [5 / 3, Math.sqrt(3) / 3];

export const kyudaiRikei2019: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["2変数の最小", "定積分の計算", "平方完成", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,2,3,5$ で $x=-\\frac6{n\\pi}$、$y=\\frac3{n\\pi}$ としたときの定積分を数値計算すると $\\frac12-\\frac3{n^{2}\\pi^{2}}$ と小数9桁まで一致した",
          "$(x,y)$ をその近傍で $7\\times7$ 通りに動かしても、それより小さい値は出なかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$x,y$ がすべての実数を動くときの $\displaystyle\int_0^1\left(\sin(2n\pi t)-xt-y\right)^{2}dt$ の最小値を $I_n$ とするとき、$\displaystyle\lim_{n\to\infty}I_n$ を求める`,
          answer: String.raw`$I_n=\dfrac12-\dfrac3{n^{2}\pi^{2}}$、$\displaystyle\lim_{n\to\infty}I_n=\dfrac12$`,
          approach: String.raw`展開して項ごとに積分すると、$x,y$ の2次式になる。$y$、$x$ の順に平方完成すればよい。必要な積分は3つだけである。`,
          blocks: [
            { k: "p", t: String.raw`**使う積分。** $s(t)=\sin(2n\pi t)$ とおく。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_0^1s^{2}dt&=\int_0^1\frac{1-\cos(4n\pi t)}2dt=\frac12\\[1mm]
\int_0^1s\,dt&=\left[-\frac{\cos(2n\pi t)}{2n\pi}\right]_0^1=\frac{-1+1}{2n\pi}=0\\[1mm]
\int_0^1t\,s\,dt&=\left[-\frac{t\cos(2n\pi t)}{2n\pi}\right]_0^1+\int_0^1\frac{\cos(2n\pi t)}{2n\pi}dt=-\frac1{2n\pi}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（2本目・3本目とも $\cos(2n\pi)=1$、$\int_0^1\cos(2n\pi t)dt=0$ を使った）。$A=-\dfrac1{2n\pi}$ とおく。`,
            },
            { k: "p", t: String.raw`**展開する。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
J(x,y)&=\int_0^1\left(s-xt-y\right)^{2}dt\\[1mm]
&=\int_0^1s^{2}dt-2x\int_0^1ts\,dt-2y\int_0^1s\,dt+x^{2}\int_0^1t^{2}dt+2xy\int_0^1t\,dt+y^{2}\\[1mm]
&=\frac12-2Ax+\frac{x^{2}}3+xy+y^{2}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$y$ について平方完成。** ` },
            {
              k: "math",
              t: String.raw`y^{2}+xy=\left(y+\frac x2\right)^{2}-\frac{x^{2}}4`,
            },
            { k: "p", t: String.raw`なので、$y=-\dfrac x2$ のとき最小で` },
            {
              k: "math",
              t: String.raw`J=\frac12-2Ax+\frac{x^{2}}3-\frac{x^{2}}4=\frac12-2Ax+\frac{x^{2}}{12}`,
            },
            { k: "p", t: String.raw`となる。` },
            { k: "p", t: String.raw`**$x$ について平方完成。** ` },
            {
              k: "math",
              t: String.raw`\frac{x^{2}}{12}-2Ax=\frac1{12}\left(x-12A\right)^{2}-12A^{2}`,
            },
            { k: "p", t: String.raw`なので、$x=12A$ のとき最小で` },
            {
              k: "math",
              t: String.raw`I_n=\frac12-12A^{2}=\frac12-12\cdot\frac1{4n^{2}\pi^{2}}=\frac12-\frac3{n^{2}\pi^{2}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}I_n=\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\int_0^1\sin^{2}(2n\pi t)dt=\frac12$ は $n$ によらない。$n$ が大きいほど $\sin(2n\pi t)$ は速く振動し、1次関数では近似しようがなくなる。だから最小値は「近似しない（$x=y=0$）」ときの値 $\frac12$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$\int_0^1\sin(2n\pi t)dt=0$ である。$n$ が整数なので、ちょうど整数周期ぶん積分することになる。`,
            String.raw`$\int_0^1t\sin(2n\pi t)dt=-\frac1{2n\pi}$ は部分積分で出る。符号を間違えやすい。`,
            String.raw`$y$ から先に平方完成する。$x$ から始めると $xy$ の処理が面倒になる。`,
            String.raw`$x=12A=-\frac6{n\pi}$、$y=-\frac x2=\frac3{n\pi}$ で、どちらも $n\to\infty$ で $0$ に近づく。`,
          ],
          check: String.raw`$n=1$ で $I_n=0.196036449$、$n=5$ で $0.487841458$ となり、数値積分の値と小数9桁まで一致した。$(x,y)$ をその近傍で動かしても、より小さい値は出なかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "整式",
      topics: ["次数の比較", "恒等式", "係数比較", "連立方程式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=x^{2}+3$、$g(x)=x^{2}-2$ を $x=-5$ から $5$ まで $0.01$ 刻みで代入し、2つの恒等式がどちらも成り立つことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)$ の次数と $g(x)$ の次数はともに $2$ 以下であることを示す`,
          answer: String.raw`次数を $m,n$ とすると第1式から $2m=n+2$、第2式から $3n=m+4$ となり $m=n=2$`,
          approach: String.raw`両辺の次数を比べる。第1式から $n$ が $m$ で表せ、それを第2式に入れると $m$ が決まる。右辺でどの項が最高次になるかで場合分けが要る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f,g$ は $0$ でないので次数が定まる。$m=\deg f$、$n=\deg g$ とおく。`,
            },
            {
              k: "p",
              t: String.raw`**第1式。** 左辺 $f(x^{2})$ の次数は $2m$。右辺 $\left(x^{2}+2\right)g(x)+7$ の次数は $n+2$（$g$ の最高次係数は $0$ でないので打ち消しは起きず、$n+2\ge2>0$ だから $+7$ でも変わらない）。よって`,
            },
            { k: "math", t: String.raw`2m=n+2,\qquad\text{すなわち}\quad n=2m-2` },
            {
              k: "p",
              t: String.raw`である。$n\ge0$ より $m\ge1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**第2式。** 左辺 $g(x^{3})$ の次数は $3n=6m-6$。右辺は $x^{4}f(x)$（次数 $m+4$）、$-3x^{2}g(x)$（次数 $n+2=2m$）、$-6x^{2}-2$（次数 $2$）の和である。$m+4$ と $2m$ を比べて場合分けする。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$m<4$：$m+4>2m$ かつ $m+4>2$ なので右辺の次数は $m+4$。$6m-6=m+4$ より $m=2$。これは $m<4$ をみたす。◯`,
                String.raw`$m>4$：$2m>m+4$ なので右辺の次数は $2m$。$6m-6=2m$ より $m=\frac32$ となり $m>4$ に反する。×`,
                String.raw`$m=4$：$m+4=2m=8$ で打ち消しの可能性がある。第1式の最高次を比べると、$f$ の最高次係数と $g$ の最高次係数が等しい（ともに $x^{8}$ の係数）。よって $x^{4}f-3x^{2}g$ の $x^{8}$ の係数は $1-3=-2$ 倍になって $0$ でなく、右辺の次数は $8$。左辺は $3n=18$ で合わない。×`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $m=2$、$n=2m-2=2$ である。どちらも $2$ 以下（実際は $2$ ちょうど）である。`,
            },
          ],
          pitfalls: [
            String.raw`$m=4$ のときだけ打ち消しが起こりうる。ここを飛ばすと論証が穴になる。第1式から2つの最高次係数が等しいと分かるのが鍵である。`,
            String.raw`$n=2m-2\ge0$ から $m\ge1$ が出る。$m=0$（定数）は第1式を成り立たせられない。`,
          ],
          check: String.raw`(2) で求める $f=x^{2}+3$、$g=x^{2}-2$ はどちらも2次で、確かに $2m=4=n+2$、$3n=6=m+4$ をみたす。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ と $g(x)$ を求める`,
          answer: String.raw`$f(x)=x^{2}+3$、$g(x)=x^{2}-2$`,
          approach: String.raw`(1) より $f=ax^{2}+bx+c$、$g=px^{2}+qx+r$ とおける。第1式から $q=0$ などが決まり、第2式に入れれば残りも決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)=ax^{2}+bx+c$、$g(x)=px^{2}+qx+r$（$a\ne0$、$p\ne0$）とおく。`,
            },
            { k: "p", t: String.raw`**第1式。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f\left(x^{2}\right)&=ax^{4}+bx^{2}+c\\[1mm]
\left(x^{2}+2\right)g(x)+7&=px^{4}+qx^{3}+(r+2p)x^{2}+2qx+(2r+7)
\end{aligned}`,
            },
            { k: "p", t: String.raw`を係数比較して` },
            {
              k: "math",
              t: String.raw`a=p,\qquad q=0,\qquad b=r+2p,\qquad c=2r+7`,
            },
            { k: "p", t: String.raw`である（$x$ の係数からも $q=0$）。` },
            { k: "p", t: String.raw`**第2式。** $q=0$ を使って` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
g\left(x^{3}\right)&=px^{6}+r\\[1mm]
x^{4}f(x)-3x^{2}g(x)-6x^{2}-2&=ax^{6}+bx^{5}+(c-3p)x^{4}-(3r+6)x^{2}-2
\end{aligned}`,
            },
            { k: "p", t: String.raw`を係数比較すると` },
            {
              k: "steps",
              items: [
                String.raw`$x^{6}$：$p=a$（第1式と同じ）`,
                String.raw`$x^{5}$：$0=b$`,
                String.raw`$x^{4}$：$0=c-3p$、すなわち $c=3p$`,
                String.raw`$x^{2}$：$0=-(3r+6)$、すなわち $r=-2$`,
                String.raw`定数項：$r=-2$（上と一致）`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$b=0$ と $b=r+2p$ から $0=-2+2p$、よって $p=1$、$a=1$。$c=3p=3$ で、第1式の $c=2r+7=-4+7=3$ とも合う。`,
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`f(x)=x^{2}+3,\qquad g(x)=x^{2}-2`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**確かめ。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left(x^{2}+2\right)\left(x^{2}-2\right)+7&=x^{4}-4+7=x^{4}+3=f\left(x^{2}\right)\\[1mm]
x^{4}\left(x^{2}+3\right)-3x^{2}\left(x^{2}-2\right)-6x^{2}-2&=x^{6}+3x^{4}-3x^{4}+6x^{2}-6x^{2}-2=x^{6}-2=g\left(x^{3}\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`で、どちらも成り立つ。` },
          ],
          pitfalls: [
            String.raw`第1式で $q=0$ がまず決まる。これを第2式に入れてから係数比較すると式が短くなる。`,
            String.raw`$c$ は第1式（$c=2r+7$）と第2式（$c=3p$）の両方から出る。食い違わないことを確かめておくと検算になる。`,
            String.raw`最後に両方の恒等式に代入して確かめる。係数比較は条件を使い切ったつもりでも抜けやすい。`,
          ],
          check: String.raw`$x$ を $-5$ から $5$ まで $0.01$ 刻みに動かして2つの恒等式を計算すると、どちらも $10^{-9}$ 以内で成り立った。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["判別式", "複素数平面", "偏角", "数え上げ"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$6^{3}=216$ 通りを全列挙して2解を複素数として計算すると、重解が $5$ 通り（$\\frac5{216}$）、2解とも単位円周上が $30$ 通り（$\\frac5{36}$）、2直線のなす鋭角が $60^\\circ$ が $14$ 通り（$\\frac7{108}$）だった",
          "$ac=b^{2}$ が $8$ 通り、$3ac=b^{2}$ が $6$ 通りで、合わせて $14$ 通りになることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}_1$ と $\mathrm{P}_2$ が一致する確率を求める`,
          answer: String.raw`$\dfrac5{216}$`,
          approach: String.raw`2解が一致するのは重解のとき、つまり判別式 $b^{2}-4ac=0$ のときである。$b$ は偶数に限られるので、$b=2,4,6$ を調べればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}_1=\mathrm{P}_2$ は $z_1=z_2$、すなわち重解で、$b^{2}=4ac$ である。右辺は偶数なので $b$ は偶数である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$b=2$：$ac=1$ より $(a,c)=(1,1)$ の**1**通り`,
                String.raw`$b=4$：$ac=4$ より $(1,4),(2,2),(4,1)$ の**3**通り`,
                String.raw`$b=6$：$ac=9$ より $(3,3)$ の**1**通り`,
              ],
            },
            { k: "p", t: String.raw`合わせて $5$ 通りだから` },
            { k: "math", t: String.raw`P=\frac5{216}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$b$ が奇数だと $b^{2}$ も奇数で、$4ac$（偶数）と等しくなれない。先に偶数に絞ると早い。`,
            String.raw`$ac=9$ では $(1,9),(9,1)$ はサイコロの目にない。範囲を忘れない。`,
          ],
          check: String.raw`$216$ 通りを全列挙すると重解は $5$ 通りだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}_1$ と $\mathrm{P}_2$ がともに単位円の周上にある確率を求める`,
          answer: String.raw`$\dfrac5{36}$`,
          approach: String.raw`解と係数の関係から $z_1z_2=\dfrac ca$ なので、$\left|z_1\right|=\left|z_2\right|=1$ なら $c=a$ が必要である。逆に $c=a$ のとき、虚数解なら共役どうしで自動的に $\left|z\right|=1$、実数解なら $z_1=z_2=-1$ の場合に限る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`解と係数の関係より $z_1z_2=\dfrac ca$ である。$\left|z_1\right|=\left|z_2\right|=1$ なら $\left|z_1z_2\right|=1$、$a,c>0$ だから`,
            },
            { k: "math", t: String.raw`\frac ca=1,\qquad\text{すなわち}\quad c=a` },
            { k: "p", t: String.raw`が必要である。以下 $c=a$ として、判別式 $D=b^{2}-4a^{2}$ で分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$D<0$（$b<2a$）：$z_2=\overline{z_1}$ なので $\left|z_1\right|^{2}=z_1\overline{z_1}=z_1z_2=1$、つまり $\left|z_1\right|=\left|z_2\right|=1$。◯`,
                String.raw`$D=0$（$b=2a$）：重解 $z=-\dfrac b{2a}=-1$ で $\left|z\right|=1$。◯`,
                String.raw`$D>0$（$b>2a$）：相異なる実数解で積が $1$、和が $-\dfrac ba<0$。2数は異なるので片方の絶対値は $1$ より大きい。×`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって条件は「$c=a$ かつ $b\le2a$」である。$a$ ごとに $b$ の個数を数える（$c$ は $a$ に決まる）。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a=1&:\;b\le2\;\Rightarrow\;2\text{ 通り}\\
a=2&:\;b\le4\;\Rightarrow\;4\text{ 通り}\\
a\ge3&:\;b\le2a\ge6\;\Rightarrow\;6\text{ 通りずつ}
\end{aligned}`,
            },
            { k: "p", t: String.raw`合計 $2+4+6\cdot4=30$ 通りだから` },
            {
              k: "math",
              t: String.raw`P=\frac{30}{216}=\frac5{36}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$c=a$ は必要条件にすぎない。$D>0$ の場合は除く必要がある。`,
            String.raw`$D=0$（$b=2a$）のときは重解 $-1$ で、これは単位円周上にある。含めてよい。`,
            String.raw`$a\ge3$ では $2a\ge6$ なので $b$ は $1$ から $6$ まで全部使える。`,
          ],
          check: String.raw`全列挙すると、2解とも単位円周上にあるのは $30$ 通りで、$\frac{30}{216}=\frac5{36}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{P}_1,\mathrm{O}$ を通る直線を $\ell_1$、$\mathrm{P}_2,\mathrm{O}$ を通る直線を $\ell_2$ とするとき、$\ell_1$ と $\ell_2$ のなす鋭角が $60^\circ$ である確率を求める`,
          answer: String.raw`$\dfrac7{108}$`,
          approach: String.raw`実数解のときは2点とも実軸上なので2直線が一致してしまう。だから虚数解の場合だけ。$z_1$ の偏角を $\theta$ とすると $z_2$ の偏角は $-\theta$ で、2直線のなす角は $\theta$ だけで決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**実数解は不適。** $c\ge1$ なので $0$ は解でなく、実数解なら $\mathrm{P}_1,\mathrm{P}_2$ はともに実軸上の原点以外の点である。すると $\ell_1=\ell_2=$ 実軸となり、なす角は $0^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`**虚数解の場合。** $D<0$ のとき`,
            },
            {
              k: "math",
              t: String.raw`z_1=\frac{-b+i\sqrt{4ac-b^{2}}}{2a},\qquad z_2=\overline{z_1}`,
            },
            {
              k: "p",
              t: String.raw`である。$z_1$ の実部 $-\dfrac b{2a}<0$、虚部 $>0$ だから、偏角 $\theta$ は $90^\circ<\theta<180^\circ$ をみたす。$z_2$ の偏角は $-\theta$ である。`,
            },
            {
              k: "p",
              t: String.raw`2直線のなす角は、方向の角の差 $2\theta$ を $180^\circ$ で測り直したもので、鋭角側をとると`,
            },
            {
              k: "math",
              t: String.raw`\min\left(2\theta-180^\circ,\;360^\circ-2\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$180^\circ<2\theta<360^\circ$）。これが $60^\circ$ になるのは`,
            },
            {
              k: "math",
              t: String.raw`2\theta-180^\circ=60^\circ\;\Rightarrow\;\theta=120^\circ,\qquad360^\circ-2\theta=60^\circ\;\Rightarrow\;\theta=150^\circ`,
            },
            { k: "p", t: String.raw`のときである。` },
            {
              k: "p",
              t: String.raw`**条件を $a,b,c$ の式にする。** $\tan\theta=\dfrac{\text{虚部}}{\text{実部}}=\dfrac{\sqrt{4ac-b^{2}}}{-b}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\theta=120^\circ$：$\tan120^\circ=-\sqrt3$ より $\sqrt{4ac-b^{2}}=\sqrt3\,b$、2乗して $4ac-b^{2}=3b^{2}$、すなわち $ac=b^{2}$`,
                String.raw`$\theta=150^\circ$：$\tan150^\circ=-\dfrac1{\sqrt3}$ より $\sqrt{4ac-b^{2}}=\dfrac b{\sqrt3}$、2乗して $3\left(4ac-b^{2}\right)=b^{2}$、すなわち $3ac=b^{2}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらも $4ac-b^{2}>0$（$D<0$）をみたす（前者は $3b^{2}>0$、後者は $\frac{b^{2}}3>0$）。`,
            },
            { k: "p", t: String.raw`**数える。** $ac=b^{2}$：` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
b=1&:\;ac=1\;\Rightarrow\;1\text{ 通り}\\
b=2&:\;ac=4\;\Rightarrow\;(1,4),(2,2),(4,1)\;\;3\text{ 通り}\\
b=3,4,5,6&:\;ac=9,16,25,36\;\Rightarrow\;(3,3),(4,4),(5,5),(6,6)\;\;1\text{ 通りずつ}
\end{aligned}`,
            },
            { k: "p", t: String.raw`で $1+3+4=8$ 通り。$3ac=b^{2}$ は $b$ が $3$ の倍数に限られ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
b=3&:\;ac=3\;\Rightarrow\;(1,3),(3,1)\;\;2\text{ 通り}\\
b=6&:\;ac=12\;\Rightarrow\;(2,6),(3,4),(4,3),(6,2)\;\;4\text{ 通り}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で $6$ 通り。2つの条件は同時には成り立たない（$ac=b^{2}$ かつ $3ac=b^{2}$ なら $b=0$）ので、合わせて $8+6=14$ 通りである。`,
            },
            {
              k: "math",
              t: String.raw`P=\frac{14}{216}=\frac7{108}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`実数解のときは2直線が一致してしまう。虚数解だけを考えればよい、と最初に切っておく。`,
            String.raw`「直線のなす鋭角」なので $2\theta$ をそのまま使わない。$180^\circ$ を法にして $90^\circ$ 以下に直す。$\theta=120^\circ$ と $150^\circ$ の2つが出る。`,
            String.raw`$\tan\theta$ の式を2乗するとき、$b>0$、$\sqrt{4ac-b^{2}}>0$ なので符号の確認は済んでいる。`,
            String.raw`$ac=12$ では $(1,12),(12,1)$ はサイコロの目にない。`,
          ],
          check: String.raw`全列挙して2直線のなす鋭角を計算すると、$60^\circ$ になるのは $14$ 通りで、$\frac{14}{216}=\frac7{108}$ だった。内訳も $ac=b^{2}$ が $8$ 通り、$3ac=b^{2}$ が $6$ 通りと一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["垂線の足", "漸化式", "等比数列", "極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{P}_1$ を $t_1=0.05,0.5,0.95$ の3通りにとって操作を $60$ 回くり返すと、いずれも $(1.666666667,\;0.577350269)$ に収束し、$\\left(\\frac53,\\frac{\\sqrt3}3\\right)$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$n\to\infty$ のとき $\mathrm{P}_n$ が限りなく近づく点の座標を求める`,
          answer: String.raw`$\left(\dfrac53,\;\dfrac{\sqrt3}3\right)$`,
          approach: String.raw`$\mathrm{P}_n$ を線分 $\mathrm{AB}$ 上の位置 $t_n$（$\mathrm{A}$ からの比）で表すと、1回の操作が $t$ の1次式になる。あとは等比数列に帰着する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OAB}$ は1辺 $2$ の正三角形である（$\mathrm{OA}=2$、$\mathrm{OB}=\sqrt{1+3}=2$、$\mathrm{AB}=\sqrt{1+3}=2$）。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{P}_n$ の表し方。** $\mathrm{P}_n=\mathrm{A}+t_n\left(\mathrm{B}-\mathrm{A}\right)$ とおく（$0<t_n<1$）。成分で書くと`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}_n=\left(2-t_n,\;\sqrt3\,t_n\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{Q}_n$。** $\mathrm{OB}$ 方向の単位ベクトルは $\vec e=\left(\dfrac12,\dfrac{\sqrt3}2\right)$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}_n}\cdot\vec e=\frac{2-t_n}2+\frac{\sqrt3\cdot\sqrt3\,t_n}2=\frac{2-t_n+3t_n}2=1+t_n`,
            },
            {
              k: "p",
              t: String.raw`なので $\mathrm{Q}_n=\left(1+t_n\right)\vec e=\left(\dfrac{1+t_n}2,\;\dfrac{\sqrt3\left(1+t_n\right)}2\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{R}_n$。** $\mathrm{OA}$ は $x$ 軸上なので、$\mathrm{Q}_n$ から下ろした垂線の足は $y$ 座標を $0$ にするだけ。`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{R}_n=\left(r_n,\;0\right),\qquad r_n=\frac{1+t_n}2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{P}_{n+1}$。** $\mathrm{AB}$ 方向の単位ベクトルは $\vec d=\dfrac{\mathrm{B}-\mathrm{A}}2=\left(-\dfrac12,\dfrac{\sqrt3}2\right)$ である。$\overrightarrow{\mathrm{AR}_n}=\left(r_n-2,\,0\right)$ だから`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AR}_n}\cdot\vec d=-\frac{r_n-2}2=\frac{2-r_n}2`,
            },
            { k: "p", t: String.raw`で、$\mathrm{P}_{n+1}=\mathrm{A}+\dfrac{2-r_n}2\vec d=\mathrm{A}+\dfrac{2-r_n}4\left(\mathrm{B}-\mathrm{A}\right)$ である。つまり` },
            {
              k: "math",
              t: String.raw`t_{n+1}=\frac{2-r_n}4=\frac{2-\frac{1+t_n}2}4=\frac{3-t_n}8`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**極限。** 不動点は $t=\dfrac{3-t}8$、すなわち $9t=3$、$t=\dfrac13$ である。` },
            {
              k: "math",
              t: String.raw`t_{n+1}-\frac13=\frac{3-t_n}8-\frac13=\frac{9-3t_n-8}{24}=-\frac{t_n-\frac13}8`,
            },
            {
              k: "p",
              t: String.raw`なので $\left\{t_n-\dfrac13\right\}$ は公比 $-\dfrac18$ の等比数列である。$\left|-\dfrac18\right|<1$ だから`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}t_n=\frac13` },
            { k: "p", t: String.raw`である。よって $\mathrm{P}_n$ は` },
            {
              k: "math",
              t: String.raw`\left(2-\frac13,\;\frac{\sqrt3}3\right)=\left(\frac53,\;\frac{\sqrt3}3\right)`,
            },
            { k: "p", t: String.raw`に近づく。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`正三角形 $\mathrm{OAB}$ と、極限の点 $\left(\frac53,\frac{\sqrt3}3\right)$（$\mathrm{AB}$ を $1:2$ に内分する点）。$\mathrm{P}_n\to\mathrm{Q}_n\to\mathrm{R}_n\to\mathrm{P}_{n+1}$ と垂線を下ろすたびに、$\mathrm{AB}$ 上の位置 $t$ が $\frac13$ へ $-\frac18$ 倍ずつ近づく。`,
                view: [-0.5, 2.9, -0.45, 2.15],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: O19, b: A19 },
                  { k: "seg", a: A19, b: B19 },
                  { k: "seg", a: B19, b: O19 },
                  { k: "dot", at: O19, label: "O", place: "below-left" },
                  { k: "dot", at: A19, label: "A(2, 0)", place: "below-right" },
                  { k: "dot", at: B19, label: "B(1, √3)", place: "above" },
                  { k: "dot", at: L19, label: "(5/3, √3/3)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AB}$ 上の位置を1つの数 $t$ で表すのが要点。2成分を追うと漸化式が見えない。`,
            String.raw`$\mathrm{A}$ を起点にとると $t_{n+1}=\frac{3-t_n}8$ ときれいになる。$\mathrm{B}$ 起点でもよいが式が変わる。`,
            String.raw`公比が負（$-\frac18$）なので、$t_n$ は $\frac13$ の上下を行き来しながら近づく。`,
            String.raw`$\mathrm{P}_1$ がどこでも同じ点に近づく。初期値によらないことが、公比の絶対値が $1$ より小さいことから分かる。`,
          ],
          check: String.raw`$t_1=0.05,0.5,0.95$ の3通りで操作を $60$ 回くり返すと、いずれも $(1.666666667,\,0.577350269)$ になり、$\left(\frac53,\frac{\sqrt3}3\right)=(1.666666667,\,0.577350269)$ と一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "複素数平面",
      topics: ["1次分数変換", "軌跡", "絶対値", "除外点"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1,b=1,c=-1$ で $w(i)=i$、$w(-i)=-i$ になることを確かめた",
          "$z=it$ を $t=-1000$ から $1000$ まで $0.01$ 刻みで動かすと $\\left|w\\right|=1$ が $10^{-9}$ 以内で成り立ち、偏角は $\\pm3.1396$ までしか届かず（$\\pm\\pi$ に達しない）、$-1$ への最接近は $0.002$ だった",
          "$c$ を単位円周上の他の点にとると $\\left|w\\right|=1$ は保たれるが、$t=\\tan\\frac\\theta2$ で $w=-1$ になってしまうことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`3条件 (ア)(イ)(ウ) をみたす $a,b,c$ を求め、さらに $C$ を求めて複素数平面上に図示する`,
          answer: String.raw`$a=1$、$b=1$、$c=-1$。$C$ は単位円から点 $-1$ を除いたもの`,
          approach: String.raw`(ア) は $z=\pm i$ の2本の式で、辺々足し引きすると $a$ と $b$ が $c$ で表せる。(イ) は「虚軸上のすべての $z$ で $\left|w\right|=1$」を $t$ の恒等式にすると $\left|c\right|=1$ に落ちる。最後に (ウ) で $c$ が1つに決まる。`,
          blocks: [
            { k: "p", t: String.raw`**(ア) から $a,b$。** $z=i$ で $w=i$ より` },
            {
              k: "math",
              t: String.raw`ai+b=i(ci+1)=-c+i\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`$z=-i$ で $w=-i$ より` },
            {
              k: "math",
              t: String.raw`-ai+b=-i(-ci+1)=-c-i\qquad\cdots\text{②}`,
            },
            { k: "p", t: String.raw`である。①$-$② より $2ai=2i$、すなわち` },
            { k: "math", t: String.raw`a=1` },
            { k: "p", t: String.raw`①$+$② より $2b=-2c$、すなわち` },
            { k: "math", t: String.raw`b=-c` },
            { k: "p", t: String.raw`である。よって $w=\dfrac{z-c}{cz+1}$ である。` },
            {
              k: "p",
              t: String.raw`**(イ) から $\left|c\right|=1$。** $z=it$（$t$ は実数）とおく。$c=p+qi$ として`,
            },
            {
              k: "math",
              t: String.raw`\left|w\right|=1\quad\Longleftrightarrow\quad\left|it-c\right|=\left|cit+1\right|`,
            },
            { k: "p", t: String.raw`である。両辺を2乗すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left|it-c\right|^{2}&=\left|-p+(t-q)i\right|^{2}=t^{2}-2qt+\left(p^{2}+q^{2}\right)\\[1mm]
\left|cit+1\right|^{2}&=\left|(1-qt)+pti\right|^{2}=\left(p^{2}+q^{2}\right)t^{2}-2qt+1
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。これが**すべての実数 $t$** で等しいので、$t$ の2次式として係数を比べて`,
            },
            {
              k: "math",
              t: String.raw`1=p^{2}+q^{2},\qquad-2q=-2q,\qquad p^{2}+q^{2}=1`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`\left|c\right|=1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**(ウ) から $c=-1$。** $\left|c\right|=1$ なので $c=\cos\theta+i\sin\theta$ と書ける。$w=-1$ となる $z=it$ があるかを調べる。`,
            },
            {
              k: "math",
              t: String.raw`\frac{it-c}{cit+1}=-1\;\Longleftrightarrow\;it-c=-cit-1\;\Longleftrightarrow\;it(1+c)=c-1`,
            },
            {
              k: "p",
              t: String.raw`である。$c\ne-1$ のとき $1+c\ne0$ だから`,
            },
            {
              k: "math",
              t: String.raw`it=\frac{c-1}{c+1}=\frac{e^{i\theta}-1}{e^{i\theta}+1}
=\frac{e^{i\frac\theta2}-e^{-i\frac\theta2}}{e^{i\frac\theta2}+e^{-i\frac\theta2}}
=\frac{2i\sin\frac\theta2}{2\cos\frac\theta2}=i\tan\frac\theta2`,
            },
            {
              k: "p",
              t: String.raw`となる（分母分子に $e^{-i\theta/2}$ を掛けた）。$c\ne-1$ なら $\cos\dfrac\theta2\ne0$ なので $t=\tan\dfrac\theta2$ は実数であり、この $z=it$ に対して $w=-1$ になってしまう。これは (ウ) に反する。`,
            },
            {
              k: "p",
              t: String.raw`（分母が $0$ になる心配はない。$cit+1=0$ は $t=\dfrac i c$ で、これが実数になるのは $c$ が純虚数のときだけだが、仮定より除かれている。）`,
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`c=-1,\qquad a=1,\qquad b=-c=1`,
            },
            {
              k: "p",
              t: String.raw`である（$c=-1$ は実数なので「純虚数でない」をみたす）。`,
            },
            { k: "p", t: String.raw`**$C$ を求める。** ` },
            {
              k: "math",
              t: String.raw`w=\frac{z+1}{-z+1}=\frac{1+it}{1-it}\qquad(z=it)`,
            },
            {
              k: "p",
              t: String.raw`である。分子と分母は互いに共役なので $\left|w\right|=1$ である。偏角を見ると、$1+it$ の偏角を $\varphi$（$-\dfrac\pi2<\varphi<\dfrac\pi2$、$\tan\varphi=t$）として $1-it$ の偏角は $-\varphi$ だから`,
            },
            { k: "math", t: String.raw`\arg w=2\varphi\in(-\pi,\;\pi)` },
            {
              k: "p",
              t: String.raw`である。$t$ が実数全体を動くと $\varphi$ は $\left(-\dfrac\pi2,\dfrac\pi2\right)$ 全体を動くので、$\arg w$ は $(-\pi,\pi)$ 全体を動く。したがって`,
            },
            {
              k: "math",
              t: String.raw`C=\left\{\,w\;\middle|\;\left|w\right|=1,\;w\ne-1\,\right\}`,
            },
            {
              k: "p",
              t: String.raw`すなわち**単位円から点 $-1$ を除いたもの**である。確かに (イ)(ウ) をみたしている。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`軌跡 $C$。単位円のうち、点 $-1$ だけが抜けている（$\circ$ 印の位置）。$z=0$ のとき $w=1$、$z=\pm i$ のとき $w=\pm i$ で、$z=it$ の $t$ を $\pm\infty$ に飛ばすと $w$ は $-1$ に近づくが決して届かない。`,
                view: [-2.1, 2.1, -1.45, 1.45],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (u: number): [number, number] => [Math.cos(u), Math.sin(u)],
                    from: -Math.PI + 0.06,
                    to: Math.PI - 0.06,
                  },
                  { k: "dot", at: [1, 0], label: "1 (z = 0)", place: "right" },
                  { k: "dot", at: [0, 1], label: "i (z = i)", place: "above" },
                  { k: "dot", at: [0, -1], label: "-i (z = -i)", place: "below" },
                  { k: "text", at: [-1.0, -0.14], label: "-1 は除く", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`(ア) の2本は足し引きすると $a$ と $b$ が別々に出る。連立を正面から解かない。`,
            String.raw`(イ) は「虚軸上のすべての点で」なので、$t$ についての恒等式として係数比較する。1点で成り立つだけでは足りない。`,
            String.raw`(ウ) は「$c\ne-1$ なら $-1$ が $C$ に入ってしまう」という形で使う。$c$ を1つに決めるのはこの条件だけである。`,
            String.raw`$C$ は単位円**全体ではない**。点 $-1$ が抜けることを図でも示す。$t\to\pm\infty$ の極限が $-1$ で、到達しない。`,
            String.raw`「$c$ は純虚数でない」という仮定は、分母 $cz+1$ が虚軸上で $0$ にならないことを保証している。`,
          ],
          check: String.raw`$a=1,b=1,c=-1$ で $w(i)=i$、$w(-i)=-i$ を確かめた。$t$ を $-1000$ から $1000$ まで $0.01$ 刻みで動かすと $\left|w\right|=1$ が $10^{-9}$ 以内で成り立ち、偏角は $\pm3.1396$ までしか届かず、$-1$ への最接近は $0.002$ だった。$c$ を単位円周上の他の点（$e^{0.3i},e^{i},e^{2i}$）にとると、$t=\tan\frac\theta2$ でちょうど $w=-1$ になった。`,
        },
      ],
    },
  ],
};
