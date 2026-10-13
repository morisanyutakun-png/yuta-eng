import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2019年度（平成31年度）一般入試 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第3問(2) の図に置く $M$ の点。$13w=u+vi$ で $u\equiv5v\pmod{13}$ となるもの。 */
const M19: [number, number][] = (
  [
    [0, 0],
    [13, 0],
    [5, 1],
    [10, 2],
    [2, 3],
    [7, 4],
    [12, 5],
    [4, 6],
    [1, 8],
    [6, 9],
    [3, 11],
    [0, 13],
  ] as [number, number][]
).map(([u, v]): [number, number] => [u / 13, v / 13]);

export const kagakudai2019: SolutionSet = {
  slug: "kagakudai",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と計量・不等式",
      topics: ["平方完成による不等式の証明", "正三角形になる等号条件", "四面体の4つの面に足し上げる"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$h,s,t$ を乱数で20万通り取り、$p^{2}+q^{2}+r^{2}-4\\sqrt3S$ がつねに $0$ 以上になることを確認した",
          "$h=1.7$、$s=-\\tfrac{\\sqrt3}{3}h$、$t=\\tfrac{\\sqrt3}{3}h$ で差はちょうど $0$ で、そのとき $p=q=r$ だった",
          "四面体の4頂点を乱数で10万通り取り、$a^{2}+b^{2}+c^{2}+\\ell^{2}+m^{2}+n^{2}-2\\sqrt3T$ がつねに $0$ 以上になることを確認した",
          "正四面体 $(1,1,1),(1,-1,-1),(-1,1,-1),(-1,-1,1)$ では両辺とも $48$ で一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$h>0$ とする。$\mathrm{O}\left(0,0\right)$、$\mathrm{P}\left(h,s\right)$、$\mathrm{Q}\left(h,t\right)$（$s<t$）について、三角形 $\mathrm{OPQ}$ の面積を $S$、辺 $\mathrm{OP},\mathrm{OQ},\mathrm{PQ}$ の長さを $p,q,r$ とするとき、$p^{2}+q^{2}+r^{2}\geqq4\sqrt3\,S$ を示し、等号成立時の $s,t$ を求める`,
          answer: String.raw`等号が成り立つのは $s=-\dfrac{\sqrt3}{3}h$、$t=\dfrac{\sqrt3}{3}h$ のとき`,
          approach: String.raw`$u=t-s$、$v=t+s$ とおくと、左辺－右辺が $u$ と $v$ だけの式になり、$h$ について平方完成できる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{P},\mathrm{Q}$ はともに直線 $x=h$ 上にあるので、$\mathrm{PQ}$ を底辺と見ると高さは $h$ で` },
            { k: "math", t: String.raw`p^{2}=h^{2}+s^{2},\qquad q^{2}=h^{2}+t^{2},\qquad r^{2}=\left(t-s\right)^{2},\qquad S=\frac12h\left(t-s\right)` },
            { k: "p", t: String.raw`である。$u=t-s\;\left(>0\right)$、$v=t+s$ とおくと $s^{2}+t^{2}=\dfrac{u^{2}+v^{2}}{2}$ なので` },
            {
              k: "math",
              t: String.raw`p^{2}+q^{2}+r^{2}-4\sqrt3\,S=2h^{2}+\frac{u^{2}+v^{2}}{2}+u^{2}-2\sqrt3\,hu=2h^{2}-2\sqrt3\,hu+\frac32u^{2}+\frac{v^{2}}{2}`,
            },
            { k: "p", t: String.raw`である。$h$ について平方完成すると` },
            {
              k: "math",
              t: String.raw`2h^{2}-2\sqrt3\,hu+\frac32u^{2}=2\left(h-\frac{\sqrt3}{2}u\right)^{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`p^{2}+q^{2}+r^{2}-4\sqrt3\,S=2\left(h-\frac{\sqrt3}{2}u\right)^{2}+\frac{v^{2}}{2}\geqq0`,
            },
            { k: "p", t: String.raw`であり、$p^{2}+q^{2}+r^{2}\geqq4\sqrt3\,S$ が成り立つ。等号が成り立つのは` },
            {
              k: "math",
              t: String.raw`h=\frac{\sqrt3}{2}u\quad\text{かつ}\quad v=0,\qquad\text{つまり}\quad u=\frac{2\sqrt3}{3}h,\ \ v=0`,
            },
            { k: "p", t: String.raw`のときで、$t-s=\dfrac{2\sqrt3}{3}h$、$t+s=0$ より` },
            { k: "math", t: String.raw`s=-\frac{\sqrt3}{3}h,\qquad t=\frac{\sqrt3}{3}h` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "原点 O と、直線 x = h 上の2点 P(h, s)、Q(h, t) を結んだ三角形。PQ を底辺と見ると高さが h になる。",
                view: [-0.5, 2.5, -1.35, 1.3],
                items: [
                  { k: "seg", a: [1.7, -1.2], b: [1.7, 1.25], dash: true },
                  { k: "seg", a: [0, 0], b: [1.7, -0.6] },
                  { k: "seg", a: [0, 0], b: [1.7, 1.1] },
                  { k: "seg", a: [1.7, -0.6], b: [1.7, 1.1] },
                  { k: "dot", at: [0, 0], label: "O", place: "left" },
                  { k: "dot", at: [1.7, -0.6], label: "P(h, s)", place: "below-right" },
                  { k: "dot", at: [1.7, 1.1], label: "Q(h, t)", place: "above-right" },
                  { k: "text", at: [1.7, -1.2], label: "x = h", place: "below" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`等号のときは $p=q=\sqrt{h^{2}+\dfrac{h^{2}}{3}}=\dfrac{2\sqrt3}{3}h$、$r=t-s=\dfrac{2\sqrt3}{3}h$ なので、三角形 $\mathrm{OPQ}$ は正三角形である。`,
            },
          ],
          pitfalls: [
            String.raw`$s<t$ なので $u=t-s>0$ である。$S=\dfrac12h\left(t-s\right)$ に絶対値を付ける必要はない。`,
          ],
          check: String.raw`$h,s,t$ を乱数で20万通り取って左辺－右辺を計算したところ、最小値は $0$ 以上だった。`,
        },
        {
          label: "(2)",
          task: String.raw`四面体 $\mathrm{ABCD}$ の表面積を $T$、辺 $\mathrm{BC},\mathrm{CA},\mathrm{AB}$ の長さを $a,b,c$、辺 $\mathrm{AD},\mathrm{BD},\mathrm{CD}$ の長さを $\ell,m,n$ とするとき、$a^{2}+b^{2}+c^{2}+\ell^{2}+m^{2}+n^{2}\geqq2\sqrt3\,T$ を示し、等号成立時の四面体を答える`,
          answer: String.raw`等号が成り立つのは正四面体のとき`,
          approach: String.raw`(1) は「どんな三角形でも、3辺の平方の和 $\geqq4\sqrt3\times$ 面積」という形に読み替えられる。これを4つの面すべてに使って足す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず (1) を、座標を使わない形に言い直す。任意の三角形について、1つの頂点を原点に置き、向かい合う辺が直線 $x=h$（$h$ はその頂点から対辺までの距離）に乗るように座標をとれば、他の2頂点は $\left(h,s\right),\left(h,t\right)$（$s<t$）と書ける。よって (1) から次がいえる。`,
            },
            {
              k: "p",
              t: String.raw`**どんな三角形でも、3辺の長さを $p,q,r$、面積を $S$ とすると $p^{2}+q^{2}+r^{2}\geqq4\sqrt3\,S$ であり、等号が成り立つのは正三角形のときに限る。**`,
            },
            {
              k: "p",
              t: String.raw`（等号条件は (1) の注のとおり。逆に正三角形なら $p=q=r$、$S=\dfrac{\sqrt3}{4}p^{2}$ より両辺とも $3p^{2}$ で等号になる。）`,
            },
            { k: "p", t: String.raw`四面体 $\mathrm{ABCD}$ の4つの面の3辺は、それぞれ` },
            {
              k: "steps",
              items: [
                String.raw`面 $\mathrm{ABC}$ … $a,b,c$`,
                String.raw`面 $\mathrm{ABD}$ … $c,m,\ell$`,
                String.raw`面 $\mathrm{ACD}$ … $b,n,\ell$`,
                String.raw`面 $\mathrm{BCD}$ … $a,n,m$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。6本の辺はどれもちょうど2つの面に現れるから、4つの面について「3辺の平方の和」を足し合わせると`,
            },
            {
              k: "math",
              t: String.raw`2\left(a^{2}+b^{2}+c^{2}+\ell^{2}+m^{2}+n^{2}\right)`,
            },
            { k: "p", t: String.raw`になる。一方、4つの面に上の不等式を使って足すと、面積の和は $T$ だから` },
            {
              k: "math",
              t: String.raw`2\left(a^{2}+b^{2}+c^{2}+\ell^{2}+m^{2}+n^{2}\right)\geqq4\sqrt3\,T`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`a^{2}+b^{2}+c^{2}+\ell^{2}+m^{2}+n^{2}\geqq2\sqrt3\,T`,
            },
            {
              k: "p",
              t: String.raw`である。等号が成り立つのは4つの面すべてで等号が成り立つとき、つまり4つの面がすべて正三角形のときである。このとき面 $\mathrm{ABC}$ から $a=b=c$、面 $\mathrm{ABD}$ から $c=m=\ell$、面 $\mathrm{ACD}$ から $b=n=\ell$ が出るので6辺がすべて等しく、四面体 $\mathrm{ABCD}$ は**正四面体**である。逆に正四面体なら4つの面が正三角形なので等号が成り立つ。`,
            },
          ],
          pitfalls: [
            String.raw`辺が2つの面に現れることを使うので、左辺に出るのは $2\left(a^{2}+\cdots+n^{2}\right)$ である。係数 $2$ を落とすと $4\sqrt3\,T$ のままになってしまう。`,
            String.raw`「4つの面が正三角形」から直ちに「正四面体」と書かず、6辺が等しいことまで確かめる。`,
          ],
          check: String.raw`四面体の4頂点を乱数で10万通り取って左辺－右辺を計算したところ、最小値は $0.166$ で、正四面体では両辺とも $48$ で一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["置換して積分区間を固定する", "絶対値のついた積分の場合分け", "積分方程式の微分", "定数の決定"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$x=1,1.3,1.7,2$ で左辺を数値積分し、右辺と小数9桁まで一致した",
          "$A=5-8\\log2=-0.545177444$、$B=4\\left(\\log2\\right)^{2}+5\\log2=5.387547958$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$1\leqq x\leqq2$ で $\displaystyle\int_{\frac1x}^{\frac2x}\left|\log y\right|f\left(xy\right)dy=3x\left(\log x-1\right)+A+\frac Bx$ が成り立つような連続関数 $f\left(x\right)$（$1\leqq x\leqq2$ で定義）と定数 $A,B$ を求める`,
          answer: String.raw`$f\left(x\right)=6x\log x+\dfrac52-4\log2$、$A=5-8\log2$、$B=4\left(\log2\right)^{2}+5\log2$`,
          approach: String.raw`$t=xy$ と置換すると積分区間が $1\leqq t\leqq2$ に固定される。あとは絶対値を $t$ と $x$ の大小で外し、2回微分して $f$ を取り出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=xy$ と置換する。$x>0$ で、$y:\dfrac1x\to\dfrac2x$ のとき $t:1\to2$、$dy=\dfrac{dt}{x}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac1x}^{\frac2x}\left|\log y\right|f\left(xy\right)dy=\frac1x\int_{1}^{2}\left|\log t-\log x\right|f\left(t\right)dt`,
            },
            { k: "p", t: String.raw`である。そこで` },
            {
              k: "math",
              t: String.raw`F\left(x\right)=\int_{1}^{2}\left|\log t-\log x\right|f\left(t\right)dt`,
            },
            { k: "p", t: String.raw`とおくと、与えられた等式は両辺を $x$ 倍して` },
            {
              k: "math",
              t: String.raw`F\left(x\right)=3x^{2}\left(\log x-1\right)+Ax+B\qquad\left(1\leqq x\leqq2\right)\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`と書き直せる。$1\leqq x\leqq2$、$1\leqq t\leqq2$ のとき $\log t-\log x$ の符号は $t$ と $x$ の大小で決まるから`,
            },
            {
              k: "math",
              t: String.raw`F\left(x\right)=\int_{1}^{x}\left(\log x-\log t\right)f\left(t\right)dt+\int_{x}^{2}\left(\log t-\log x\right)f\left(t\right)dt`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`P\left(x\right)=\int_{1}^{x}f\left(t\right)dt,\qquad Q\left(x\right)=\int_{1}^{x}\left(\log t\right)f\left(t\right)dt`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`F\left(x\right)=2\left(\log x\right)P\left(x\right)-2Q\left(x\right)+Q\left(2\right)-\left(\log x\right)P\left(2\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。$f$ は連続なので $P,Q$ は微分可能で $P'=f$、$Q'=\left(\log x\right)f$ である。微分すると $\left(\log x\right)f\left(x\right)$ の項が打ち消し合って`,
            },
            {
              k: "math",
              t: String.raw`F'\left(x\right)=\frac{2P\left(x\right)}{x}+2\left(\log x\right)f\left(x\right)-2\left(\log x\right)f\left(x\right)-\frac{P\left(2\right)}{x}=\frac{2P\left(x\right)-P\left(2\right)}{x}`,
            },
            { k: "p", t: String.raw`である。$\left(\ast\right)$ の右辺を微分すると $6x\log x-3x+A$ なので` },
            {
              k: "math",
              t: String.raw`2P\left(x\right)-P\left(2\right)=6x^{2}\log x-3x^{2}+Ax\qquad\left(1\leqq x\leqq2\right)\quad\cdots\left(\ast\ast\right)`,
            },
            { k: "p", t: String.raw`である。もう一度微分すると $12x\log x+6x-6x+A$ となり` },
            { k: "math", t: String.raw`f\left(x\right)=6x\log x+\frac A2` },
            { k: "p", t: String.raw`を得る。$\left(\ast\ast\right)$ で $x=1$ とすると $P\left(1\right)=0$ より` },
            { k: "math", t: String.raw`P\left(2\right)=3-A` },
            { k: "p", t: String.raw`である。一方 $\displaystyle\int_{1}^{2}t\log t\,dt=\left[\frac{t^{2}}{2}\log t-\frac{t^{2}}{4}\right]_{1}^{2}=2\log2-\frac34$ なので` },
            {
              k: "math",
              t: String.raw`P\left(2\right)=\int_{1}^{2}\left(6t\log t+\frac A2\right)dt=6\left(2\log2-\frac34\right)+\frac A2=12\log2-\frac92+\frac A2`,
            },
            { k: "p", t: String.raw`である。2つを等しいとおくと $\dfrac32A=\dfrac{15}2-12\log2$、すなわち` },
            { k: "math", t: String.raw`A=5-8\log2,\qquad f\left(x\right)=6x\log x+\frac52-4\log2` },
            { k: "p", t: String.raw`である。最後に $\left(\ast\right)$ で $x=1$ とする。$\log1=0$、$P\left(1\right)=Q\left(1\right)=0$ より $F\left(1\right)=Q\left(2\right)$ で、右辺は $-3+A+B$ だから` },
            { k: "math", t: String.raw`B=Q\left(2\right)+3-A` },
            { k: "p", t: String.raw`である。$\displaystyle\int_{1}^{2}t\left(\log t\right)^{2}dt=\left[\frac{t^{2}}{2}\left(\log t\right)^{2}\right]_{1}^{2}-\int_{1}^{2}t\log t\,dt=2\left(\log2\right)^{2}-2\log2+\frac34$、$\displaystyle\int_{1}^{2}\log t\,dt=2\log2-1$ を使うと` },
            {
              k: "math",
              t: String.raw`Q\left(2\right)=6\left\{2\left(\log2\right)^{2}-2\log2+\frac34\right\}+\frac A2\left(2\log2-1\right)=4\left(\log2\right)^{2}-3\log2+2`,
            },
            { k: "p", t: String.raw`となり` },
            { k: "math", t: String.raw`B=4\left(\log2\right)^{2}-3\log2+2+3-\left(5-8\log2\right)=4\left(\log2\right)^{2}+5\log2` },
            {
              k: "p",
              t: String.raw`を得る。逆に、この $f,A,B$ に対して $\left(\ast\right)$ の両辺は導関数が一致し、$x=1$ での値も一致するので、$1\leqq x\leqq2$ で等しい。よって`,
            },
            {
              k: "math",
              t: String.raw`f\left(x\right)=6x\log x+\frac52-4\log2,\qquad A=5-8\log2,\qquad B=4\left(\log2\right)^{2}+5\log2`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$t=xy$ の置換で積分区間が $x$ によらなくなるのが要。置換しないと絶対値の場合分けが $y$ と $x$ の両方に絡んで扱いにくい。`,
            String.raw`$F\left(x\right)$ を微分するとき、$\left(\log x\right)f\left(x\right)$ の項が2つ出て打ち消し合う。ここを落とすと $f$ が合わない。`,
            String.raw`$A$ は「2回微分して出た式」だけでは決まらない。$P\left(2\right)$ を2通りに表して初めて決まる。`,
          ],
          check: String.raw`$x=1,1.3,1.7,2$ で左辺を数値積分したところ、右辺と小数9桁まで一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "複素数平面・整数",
      topics: ["複素数の割り算と格子", "半径の中の格子点を数える", "合同式で格子を書き表す", "領域に含まれる点の数え上げ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$r$ を $0.00005$ 刻みで走査したところ、$10\\leqq N\\left(r\\right)<25$ となるのは $0.55475\\leqq r\\leqq0.78445$ で、$\\tfrac{2\\sqrt{13}}{13}=0.554700$・$\\tfrac{2\\sqrt{26}}{13}=0.784465$ と合った",
          "$-20\\leqq m,n\\leqq20$ の格子をすべて $\\tfrac{z}{3+2i}$ に移し、領域に入るものを数えたら 12 個だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$i$ を虚数単位とし、実部と虚部がともに整数である複素数 $z$ により $\dfrac{z}{3+2i}$ と表される複素数全体の集合を $M$ とする。原点を中心とする半径 $r$ の円上またはその内部に含まれる $M$ の要素の個数を $N\left(r\right)$ とするとき、集合 $\left\{r\mid10\leqq N\left(r\right)<25\right\}$ を求める`,
          answer: String.raw`$\dfrac{2\sqrt{13}}{13}\leqq r<\dfrac{2\sqrt{26}}{13}$ を満たす $r$ 全体`,
          approach: String.raw`$\left|3+2i\right|=\sqrt{13}$ なので、数えるのは $m^{2}+n^{2}\leqq13r^{2}$ を満たす整数の組の個数になる。`,
          blocks: [
            { k: "p", t: String.raw`$z=m+ni$（$m,n$ は整数）とおく。$\left|3+2i\right|=\sqrt{3^{2}+2^{2}}=\sqrt{13}$ なので` },
            { k: "math", t: String.raw`\left|\frac{z}{3+2i}\right|=\frac{\left|z\right|}{\sqrt{13}}=\frac{\sqrt{m^{2}+n^{2}}}{\sqrt{13}}` },
            {
              k: "p",
              t: String.raw`である。$z\mapsto\dfrac{z}{3+2i}$ は1対1だから、$N\left(r\right)$ は $m^{2}+n^{2}\leqq13r^{2}$ を満たす整数の組 $\left(m,n\right)$ の個数に等しい。`,
            },
            { k: "p", t: String.raw`$m^{2}+n^{2}$ の値ごとに組の個数を数えると、次のようになる。` },
            {
              k: "steps",
              items: [
                String.raw`$m^{2}+n^{2}=0$ … $1$ 個（累計 $1$）`,
                String.raw`$m^{2}+n^{2}=1$ … $4$ 個（累計 $5$）`,
                String.raw`$m^{2}+n^{2}=2$ … $4$ 個（累計 $9$）`,
                String.raw`$m^{2}+n^{2}=3$ … $0$ 個（累計 $9$）`,
                String.raw`$m^{2}+n^{2}=4$ … $4$ 個（累計 $13$）`,
                String.raw`$m^{2}+n^{2}=5$ … $8$ 個（$\left(\pm1,\pm2\right),\left(\pm2,\pm1\right)$。累計 $21$）`,
                String.raw`$m^{2}+n^{2}=6,7$ … $0$ 個（累計 $21$）`,
                String.raw`$m^{2}+n^{2}=8$ … $4$ 個（累計 $25$）`,
              ],
            },
            { k: "p", t: String.raw`つまり $N\left(r\right)$ のとりうる値は $1,5,9,13,21,25,\ldots$ である。したがって` },
            {
              k: "steps",
              items: [
                String.raw`$N\left(r\right)\geqq10$ となるのは累計が $13$ 以上のとき、つまり $13r^{2}\geqq4$`,
                String.raw`$N\left(r\right)<25$ となるのは累計が $21$ 以下のとき、つまり $13r^{2}<8$`,
              ],
            },
            { k: "p", t: String.raw`である。よって $4\leqq13r^{2}<8$、すなわち` },
            { k: "math", t: String.raw`\frac{2}{\sqrt{13}}\leqq r<\frac{2\sqrt2}{\sqrt{13}}` },
            { k: "p", t: String.raw`である。分母を有理化して` },
            { k: "math", t: String.raw`\frac{2\sqrt{13}}{13}\leqq r<\frac{2\sqrt{26}}{13}` },
            { k: "p", t: String.raw`（およそ $0.5547\leqq r<0.7845$）が答えである。` },
          ],
          pitfalls: [
            String.raw`$N$ は $1,5,9,13,21,25$ と飛び飛びに増える。$m^{2}+n^{2}=5$ のように表し方が $8$ 通りある値があるので、累計をていねいに追う。`,
            String.raw`$10\leqq N<25$ を満たす $N$ の値は $13$ と $21$ の2つだが、$r$ の範囲はそれらがつながって1つの区間になる。`,
          ],
          check: String.raw`$r$ を $0.00005$ 刻みで走査したところ、$10\leqq N\left(r\right)<25$ となるのは $0.55475\leqq r\leqq0.78445$ で、上の区間と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`複素数平面の相異なる2点 $z,w$ を結ぶ線分を $L\left(z,w\right)$ で表すとき、6つの線分 $L\left(0,1\right)$、$L\left(1,1+\dfrac i2\right)$、$L\left(1+\dfrac i2,\dfrac{1+i}{2}\right)$、$L\left(\dfrac{1+i}{2},\dfrac12+i\right)$、$L\left(\dfrac12+i,i\right)$、$L\left(i,0\right)$ で囲まれる領域の内部または境界に含まれる $M$ の要素の個数を求める`,
          answer: String.raw`$12$ 個`,
          approach: String.raw`$13w=u+vi$ とおくと、$w\in M$ は $u\equiv5v\pmod{13}$ というひとつの合同式になる。あとは $v=0,1,\ldots,13$ で $u$ を拾う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$w\in M$ とすると $w=\dfrac{z}{3+2i}=\dfrac{z\left(3-2i\right)}{13}$ なので、$13w$ の実部と虚部は整数である。そこで $13w=u+vi$（$u,v$ は整数）とおく。`,
            },
            {
              k: "p",
              t: String.raw`逆に $13w=u+vi$（$u,v$ は整数）のとき、$w\in M$ であることは $\left(3+2i\right)w=z$ が実部・虚部とも整数であることと同じである。`,
            },
            {
              k: "math",
              t: String.raw`\left(3+2i\right)w=\frac{\left(3+2i\right)\left(u+vi\right)}{13}=\frac{\left(3u-2v\right)+\left(2u+3v\right)i}{13}`,
            },
            {
              k: "p",
              t: String.raw`なので、条件は「$3u-2v$ と $2u+3v$ がともに $13$ の倍数」である。$9$ も $7$ も $13$ と互いに素で`,
            },
            {
              k: "math",
              t: String.raw`9\left(3u-2v\right)=27u-18v\equiv u-5v,\qquad7\left(2u+3v\right)=14u+21v\equiv u+8v\equiv u-5v\pmod{13}`,
            },
            { k: "p", t: String.raw`だから、どちらの条件も` },
            { k: "math", t: String.raw`u\equiv5v\pmod{13}` },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`次に領域を書き表す。6つの線分の端点は順に $0,\,1,\,1+\dfrac i2,\,\dfrac{1+i}{2},\,\dfrac12+i,\,i$ で、これらを結んだ図形は「1辺 $1$ の正方形から右上の1辺 $\dfrac12$ の正方形を取り除いたL字形」である。$w=x+yi$ とすると、境界を含めた領域は`,
            },
            {
              k: "math",
              t: String.raw`0\leqq x\leqq1,\quad0\leqq y\leqq1,\quad\text{かつ}\quad\left(x\leqq\frac12\ \text{または}\ y\leqq\frac12\right)`,
            },
            { k: "p", t: String.raw`で表される。$x=\dfrac{u}{13}$、$y=\dfrac{v}{13}$ なので、求めるのは` },
            {
              k: "math",
              t: String.raw`0\leqq u\leqq13,\quad0\leqq v\leqq13,\quad\left(u\leqq6\ \text{または}\ v\leqq6\right),\quad u\equiv5v\pmod{13}`,
            },
            {
              k: "p",
              t: String.raw`を満たす整数の組 $\left(u,v\right)$ の個数である（$u,v$ は整数なので $u\leqq\dfrac{13}{2}$ は $u\leqq6$ と同じ）。$v$ を $0$ から $13$ まで動かし、$0\leqq u\leqq13$ で $u\equiv5v\pmod{13}$ となる $u$ を拾うと`,
            },
            {
              k: "steps",
              items: [
                String.raw`$v=0$ … $u=0,13$（$v\leqq6$ なのでどちらも適する）… $2$ 個`,
                String.raw`$v=1,2,3,4,5,6$ … 順に $u=5,10,2,7,12,4$（$v\leqq6$ なので適する）… $6$ 個`,
                String.raw`$v=7$ … $u=9$。$u>6$ かつ $v>6$ なので適さない … $0$ 個`,
                String.raw`$v=8$ … $u=1$ … $1$ 個`,
                String.raw`$v=9$ … $u=6$ … $1$ 個`,
                String.raw`$v=10$ … $u=11$。適さない … $0$ 個`,
                String.raw`$v=11$ … $u=3$ … $1$ 個`,
                String.raw`$v=12$ … $u=8$。適さない … $0$ 個`,
                String.raw`$v=13$ … $u=0$ は適し、$u=13$ は適さない … $1$ 個`,
              ],
            },
            { k: "p", t: String.raw`となる。合計すると` },
            { k: "math", t: String.raw`2+6+0+1+1+0+1+0+1=12` },
            { k: "p", t: String.raw`で、求める個数は $12$ 個である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "6つの線分で囲まれたL字形の領域（1辺1の正方形から右上の1辺2分の1の正方形を取り除いた形）と、その内部または境界にある M の要素12個。",
                view: [-0.18, 1.18, -0.1, 1.1],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0, 0],
                      [1, 0],
                      [1, 0.5],
                      [0.5, 0.5],
                      [0.5, 1],
                      [0, 1],
                    ],
                  },
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, 0.5] },
                  { k: "seg", a: [1, 0.5], b: [0.5, 0.5] },
                  { k: "seg", a: [0.5, 0.5], b: [0.5, 1] },
                  { k: "seg", a: [0.5, 1], b: [0, 1] },
                  { k: "seg", a: [0, 1], b: [0, 0] },
                  ...M19.map((at): { k: "dot"; at: [number, number] } => ({ k: "dot", at })),
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$v=0$ と $v=13$ では $0\leqq u\leqq13$ に候補が2つ入る。片方だけ数えると足りない。`,
            String.raw`「内部または境界」なので、$w=1$（$u=13,v=0$）や $w=i$（$u=0,v=13$）も数える。`,
          ],
          check: String.raw`$-20\leqq m,n\leqq20$ の格子をすべて $\dfrac{z}{3+2i}$ に移し、領域に入るものを数えたところ 12 個だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間図形・場合の数",
      topics: ["平面を1枚ずつ足して数える", "一般の位置", "交線が平行になる3枚", "最大から2番目・3番目の値"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "係数が $-2$ 以上 $2$ 以下の整数である平面 271 枚から無作為に $n$ 枚を選び、交線と交点から領域の個数を分数のまま数えた",
          "$n=3$ で現れた値は大きい順に $8,7,6,4$、$n=4$ では $15,14,12,11,10$（$13$ は一度も現れなかった）",
          "$n=5,6,7$ で大きい順に3つは $26,25,24$ / $42,41,40$ / $64,63,62$ で、$\\tfrac{n^{3}+5n+6}{6}$ から $0,1,2$ を引いた値と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`空間内の相異なる $n$ 枚の平面 $H_{1},\ldots,H_{n}$ が空間を $T\left(H_{1},\ldots,H_{n}\right)$ 個の空間領域に分けるとき、$T$ のとりうる値のうち最も大きいものを求める`,
          answer: String.raw`$\dfrac{n^{3}+5n+6}{6}$`,
          approach: String.raw`平面を1枚ずつ足す。$H_{k}$ を足すと、$H_{k}$ が先の平面との交線で分けられる部分の個数だけ領域が増える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**準備1（平面上の直線）**　平面上に相異なる $m$ 本の直線があるとき、それらが平面を分ける部分の個数を数える。直線を1本ずつ引くと、$k$ 本目の直線はすでに引いた直線との交点で区切られて（交点の個数）$+1$ 本の部分に分かれ、その本数だけ部分の個数が増える。よって`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{部分の個数}\right)=1+m+\sum_{P}\left(j_{P}-1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。和は交点 $P$ 全体にわたり、$j_{P}$ は $P$ を通る直線の本数である（$P$ を通る $j_{P}$ 本のうち、2本目以降の $j_{P}-1$ 本が $P$ を新しい交点として数える）。$j_{P}\geqq2$ のとき $j_{P}-1\leqq\dfrac{j_{P}\left(j_{P}-1\right)}{2}$ であり、2本の直線は高々1点で交わるので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{P}\left(j_{P}-1\right)\leqq\sum_{P}\frac{j_{P}\left(j_{P}-1\right)}{2}\leqq\frac{m\left(m-1\right)}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。等号はどの2本も交わり、どの3本も1点を通らないときに成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`**準備2（空間）**　空間でも平面を1枚ずつ足す。$H_{k}$ を足すとき、$H_{k}$ は $H_{1},\ldots,H_{k-1}$ との交線（平行な平面とは交線がない）によっていくつかの部分に分かれ、その部分の個数だけ空間領域が増える。この個数を $R_{k}$ とすると`,
            },
            { k: "math", t: String.raw`T\left(H_{1},\ldots,H_{n}\right)=1+\sum_{k=1}^{n}R_{k}` },
            { k: "p", t: String.raw`である。$H_{k}$ 上の交線は高々 $k-1$ 本なので、準備1から` },
            {
              k: "math",
              t: String.raw`R_{k}\leqq1+\left(k-1\right)+\frac{\left(k-1\right)\left(k-2\right)}{2}`,
            },
            { k: "p", t: String.raw`であり、$k=1$ から $n$ まで足すと` },
            {
              k: "math",
              t: String.raw`T\leqq1+n+\frac{n\left(n-1\right)}{2}+\frac{n\left(n-1\right)\left(n-2\right)}{6}=\frac{n^{3}+5n+6}{6}`,
            },
            { k: "p", t: String.raw`を得る。次に、この値が実際にとれることを示す。` },
            { k: "math", t: String.raw`H_{k}\colon x+ky+k^{2}z=k^{3}\qquad\left(k=1,2,\ldots,n\right)` },
            { k: "p", t: String.raw`とおくと、次が成り立つ。` },
            {
              k: "steps",
              items: [
                String.raw`どの2枚も平行でない。法線ベクトル $\left(1,k,k^{2}\right)$ は、$k$ が違えば平行にならない（第1成分がどれも $1$ だから、平行なら一致してしまう）。`,
                String.raw`どの3枚もただ1点で交わる。$k=k_{1},k_{2},k_{3}$ に対する係数行列の行列式はファンデルモンドの行列式で $\left(k_{2}-k_{1}\right)\left(k_{3}-k_{1}\right)\left(k_{3}-k_{2}\right)\neq0$ である。`,
                String.raw`どの4枚も共有点をもたない。点 $\left(x,y,z\right)$ が相異なる4つの $k$ で $x+ky+k^{2}z=k^{3}$ を満たすとすると、$k$ の3次式 $k^{3}-zk^{2}-yk-x$ が相異なる4つの実数解をもつことになり矛盾する。`,
              ],
            },
            {
              k: "p",
              t: String.raw`したがって $H_{k}$ 上の $k-1$ 本の交線は相異なり（3枚が直線を共有しないから）、どの2本も交わり（3枚が1点で交わるから）、どの3本も1点を通らない（4枚が共有点をもたないから）。よって $R_{k}$ は最大値をとり`,
            },
            { k: "math", t: String.raw`T=\frac{n^{3}+5n+6}{6}` },
            {
              k: "p",
              t: String.raw`となる。以下これを $T_{\max}$ と書く。なお $T_{\max}=1+n+\dfrac{n\left(n-1\right)}{2}+\dfrac{n\left(n-1\right)\left(n-2\right)}{6}$ で、$n=3$ で $8$、$n=4$ で $15$ である（問題文の例と合う）。`,
            },
          ],
          pitfalls: [
            String.raw`$R_{k}$ は「$H_{k}$ と交わる平面の枚数」ではなく「$H_{k}$ が交線で分けられる部分の個数」である。`,
          ],
          check: String.raw`$n=3,4,5,6,7$ について無作為な平面の組で領域の個数を数えたところ、最大値はそれぞれ $8,15,26,42,64$ で $\dfrac{n^{3}+5n+6}{6}$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$T$ のとりうる値のうち2番目に大きいものを求める（$n\geqq2$）`,
          answer: String.raw`$\dfrac{n^{3}+5n}{6}=\dfrac{n\left(n^{2}+5\right)}{6}$`,
          approach: String.raw`$T_{\max}-T$ は $0$ 以上の整数なので、$T=T_{\max}-1$ となる配置を1つ作ればよい。「交線が平行になる3枚」を1組だけ作る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$T_{\max}-T$ は $0$ 以上の整数だから、$T=T_{\max}-1$ となる配置が1つでもあれば、それが2番目に大きい値である。`,
            },
            {
              k: "p",
              t: String.raw`$n=2$ のときは2枚を平行にとると $T=3=T_{\max}-1$ である（$T_{\max}=4$）。`,
            },
            {
              k: "p",
              t: String.raw`$n\geqq3$ のときは、(1) の $H_{k}\colon x+ky+k^{2}z=k^{3}$（$k=1,\ldots,n-1$）に`,
            },
            { k: "math", t: String.raw`H_{n}\colon3x+2y=c` },
            { k: "p", t: String.raw`を加える。$H_{i}\cap H_{j}$ の方向ベクトルは2つの法線の外積` },
            {
              k: "math",
              t: String.raw`\left(1,i,i^{2}\right)\times\left(1,j,j^{2}\right)=\left(j-i\right)\left(ij,\ -\left(i+j\right),\ 1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$H_{n}$ の法線 $\left(3,2,0\right)$ とこれの内積は $\left(j-i\right)\left\{3ij-2\left(i+j\right)\right\}$ で、$1\leqq i<j\leqq n-1$ でこれが $0$ になるのは`,
            },
            {
              k: "steps",
              items: [
                String.raw`$i=1$ のとき $3j=2+2j$ より $j=2$`,
                String.raw`$i\geqq2$ のとき $3ij-2\left(i+j\right)\geqq6j-2i-2j=4j-2i>0$（$j>i$ だから）`,
              ],
            },
            {
              k: "p",
              t: String.raw`より $\left(i,j\right)=\left(1,2\right)$ のときだけである。また $\left(1,k,k^{2}\right)$ が $\left(3,2,0\right)$ の定数倍なら $k^{2}=0$ すなわち $k=0$ となって $1\leqq k\leqq n-1$ に反するので、$H_{n}$ はどの $H_{k}$ とも交わる。`,
            },
            {
              k: "p",
              t: String.raw`ここで、$H_{n}$ 上の2本の交線 $H_{i}\cap H_{n}$ と $H_{j}\cap H_{n}$ が平行であることは、その共通の方向が $H_{i}$ にも $H_{j}$ にも含まれること、つまり $H_{n}$ が $H_{i}\cap H_{j}$ の方向を含むことと同じである。上の計算から、それが起こるのは $\left(i,j\right)=\left(1,2\right)$ の1組だけである。`,
            },
            {
              k: "p",
              t: String.raw`$c$ は、$H_{i}\cap H_{j}\cap H_{l}$（有限個の点）のどれも $H_{n}$ 上に来ないように、かつ $H_{n}$ が直線 $H_{1}\cap H_{2}$ を含まないように選ぶ。どちらも $c$ の有限個の値を避ければよい。`,
            },
            {
              k: "p",
              t: String.raw`このとき $H_{n}$ 上の $n-1$ 本の交線は相異なり、平行な組は1組だけ、3本が1点を通ることもないので`,
            },
            {
              k: "math",
              t: String.raw`R_{n}=1+\left(n-1\right)+\left\{\frac{\left(n-1\right)\left(n-2\right)}{2}-1\right\}`,
            },
            {
              k: "p",
              t: String.raw`となる。$H_{1},\ldots,H_{n-1}$ の側は (1) の最大の配置のままなので $T=T_{\max}-1$ である。よって2番目に大きい値は`,
            },
            {
              k: "math",
              t: String.raw`\frac{n^{3}+5n+6}{6}-1=\frac{n^{3}+5n}{6}=\frac{n\left(n^{2}+5\right)}{6}`,
            },
            { k: "p", t: String.raw`である（$n=2$ で $3$、$n=3$ で $7$、$n=4$ で $14$）。` },
            {
              k: "note",
              t: String.raw`3枚の平面が「どの2枚の交線も互いに平行」になる形は、三角柱の3つの側面のような配置である。問題文の2つ目の例（$x=0$、$y=0$、$x+y=1$ で $T=7$）がまさにこれで、$n=3$ の $T_{\max}=8$ より $1$ だけ小さい。`,
            },
          ],
          pitfalls: [
            String.raw`2枚を平行にしたり、3枚で1本の直線を共有させたりすると、減り方は $1$ ではなく $n-1$ になる（(3) で確かめる）。$1$ だけ減らすには「交線が平行な3枚」を使う。`,
          ],
          check: String.raw`無作為な平面の組で $n=3,4,5,6,7$ の領域の個数を数えたところ、2番目に大きい値はそれぞれ $7,14,25,41,63$ で、$\dfrac{n\left(n^{2}+5\right)}{6}$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$T$ のとりうる値のうち3番目に大きいものを求める（$n\geqq3$）`,
          answer: String.raw`$n=4$ のときは $12$、$n=3$ および $n\geqq5$ のときは $\dfrac{n^{3}+5n-6}{6}$`,
          approach: String.raw`$T=T_{\max}-2$ が作れるかどうかを調べる。$n\geqq5$ では「交線が平行な3枚」を2組作れるが、$n=4$ ではできず、$13$ が飛ぶ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$n\geqq5$ のとき**　(1) の $H_{k}$（$k=1,\ldots,n-1$）に`,
            },
            { k: "math", t: String.raw`H_{n}\colon2x+5y+11z=c` },
            {
              k: "p",
              t: String.raw`を加える。$\left(2,5,11\right)$ と $\left(ij,-\left(i+j\right),1\right)$ の内積は $2ij-5\left(i+j\right)+11$ で、これが $0$ になるのは`,
            },
            {
              k: "math",
              t: String.raw`j\left(2i-5\right)=5i-11,\qquad\text{つまり}\quad j=\frac{5i-11}{2i-5}`,
            },
            { k: "p", t: String.raw`のときである。$1\leqq i<j$ で調べると` },
            {
              k: "steps",
              items: [
                String.raw`$i=1$ のとき $j=\dfrac{-6}{-3}=2$（適する）`,
                String.raw`$i=2$ のとき $j=\dfrac{-1}{-1}=1<i$（不適）`,
                String.raw`$i=3$ のとき $j=\dfrac{4}{1}=4$（適する）`,
                String.raw`$i=4$ のとき $j=\dfrac93=3<i$（不適）`,
                String.raw`$i\geqq5$ のとき $5i-11<3\left(2i-5\right)$（$i>4$ と同値）より $j<3\leqq i$（不適）`,
              ],
            },
            {
              k: "p",
              t: String.raw`より $\left(i,j\right)=\left(1,2\right),\left(3,4\right)$ の2組だけである。この2つの方向 $\left(2,-3,1\right)$ と $\left(12,-7,1\right)$ は平行でないので、$H_{n}$ 上では $H_{1},H_{2}$ から来る2本と、$H_{3},H_{4}$ から来る2本がそれぞれ平行になり、2つの方向は異なる。また $\left(1,k,k^{2}\right)$ が $\left(2,5,11\right)$ の定数倍なら $k=\dfrac52$ かつ $k^{2}=\dfrac{11}{2}$ となって矛盾するので、$H_{n}$ はどの $H_{k}$ とも交わる。`,
            },
            {
              k: "p",
              t: String.raw`$c$ を (2) と同じように選べば`,
            },
            {
              k: "math",
              t: String.raw`R_{n}=1+\left(n-1\right)+\left\{\frac{\left(n-1\right)\left(n-2\right)}{2}-2\right\}`,
            },
            {
              k: "p",
              t: String.raw`となり $T=T_{\max}-2$ である。この配置は $1,2,3,4$ がすべて $1\leqq k\leqq n-1$ に入ること、つまり $n\geqq5$ で作れる。よって3番目に大きい値は $T_{\max}-2=\dfrac{n^{3}+5n-6}{6}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$n=3$ のとき**　$T_{\max}=8$ で、$z=0$、$z=1$、$x=0$ の3枚をとると、平行な2枚が空間を3つの層に分け、$x=0$ がそれぞれを2つに分けるので $T=6=T_{\max}-2$ である。$\dfrac{n^{3}+5n-6}{6}$ に $n=3$ を入れると $6$ なので、$n\geqq5$ と同じ式で書ける。`,
            },
            {
              k: "p",
              t: String.raw`**$n=4$ のとき**　$T_{\max}=15$ だが、$T=13$ は起こらない。4枚を好きな順に足すとして $T=1+R_{1}+R_{2}+R_{3}+R_{4}$、$R_{1}=1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**(i) 2枚が平行なとき**　その2枚を後ろに回して $H_{3}\parallel H_{4}$ とすると、$H_{4}$ 上の交線は $H_{1},H_{2}$ から来る高々2本なので $R_{4}\leqq1+2+1=4$ である。$R_{2}\leqq2$、$R_{3}\leqq4$ とあわせて $T\leqq1+1+2+4+4=12<13$。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) 3枚が1本の直線 $\ell$ を共有するとき**　その3枚を後ろに回して $H_{2},H_{3},H_{4}$ が $\ell$ を共有するとすると、$H_{2}\cap H_{4}=H_{3}\cap H_{4}=\ell$ なので $H_{4}$ 上の交線は高々2本で $R_{4}\leqq4$ である。やはり $T\leqq1+1+2+4+4=12<13$。`,
            },
            {
              k: "p",
              t: String.raw`**(iii) どの2枚も平行でなく、どの3枚も直線を共有しないとき**　$R_{2}=2$ である。また`,
            },
            {
              k: "steps",
              items: [
                String.raw`$H_{3}$ 上の交線 $H_{1}\cap H_{3}$、$H_{2}\cap H_{3}$ は相異なる2直線で、交わるなら $R_{3}=4$、平行なら $R_{3}=3$。`,
                String.raw`$H_{4}$ 上の交線は相異なる3直線で、3直線が平面を分ける部分の個数は $7$（どの2本も交わりどの3本も1点を通らない）、$6$（ちょうど1組が平行、または3本が1点を通る）、$4$（3本とも平行）のいずれか。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$T=13$ なら $R_{3}+R_{4}=9$ だが、$R_{3}$ は $3$ か $4$、$R_{4}$ は $4,6,7$ のいずれかなので $\left(R_{3},R_{4}\right)=\left(3,6\right)$ しかない。`,
            },
            {
              k: "p",
              t: String.raw`$R_{3}=3$ は $H_{1}\cap H_{3}$ と $H_{2}\cap H_{3}$ が平行ということである。その共通の方向を $\vec v$ とすると、$\vec v$ は $H_{1}$ にも $H_{2}$ にも含まれるので $H_{1}\cap H_{2}$ の方向でもある。つまり $H_{1},H_{2},H_{3}$ はどの2枚の交線も $\vec v$ 方向で、3枚とも $\vec v$ に平行である。`,
            },
            {
              k: "p",
              t: String.raw`このとき $H_{1},H_{2},H_{3}$ に共有点はない。共有点 $\mathrm{A}$ があれば、$\mathrm{A}$ を通り $\vec v$ 方向の直線が $H_{1}\cap H_{2}$ でも $H_{1}\cap H_{3}$ でもあることになり、3枚が1本の直線を共有してしまうからである。`,
            },
            { k: "p", t: String.raw`$R_{4}=6$ になるのは次の2つの場合だが、どちらも矛盾する。` },
            {
              k: "steps",
              items: [
                String.raw`3本が1点 $\mathrm{A}$ を通る場合。$\mathrm{A}$ は $H_{1},H_{2},H_{3},H_{4}$ のすべての上にあり、とくに $H_{1},H_{2},H_{3}$ の共有点になる。これは上で否定した。`,
                String.raw`ちょうど1組が平行な場合。$H_{i}\cap H_{4}$ と $H_{j}\cap H_{4}$（$i,j\in\left\{1,2,3\right\}$）が平行なら、同じ理由でその方向は $H_{i}\cap H_{j}$ の方向、つまり $\vec v$ であり、$H_{4}$ も $\vec v$ に平行になる。すると4枚とも $\vec v$ に平行なので $H_{4}$ 上の3本の交線はすべて $\vec v$ 方向、つまり3本とも平行で $R_{4}=4$ となり、$R_{4}=6$ に反する。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $n=4$ では $T=13$ は起こらない。一方 $z=0$、$z=1$、$x=0$、$y=0$ の4枚をとると、3つの層を4つの象限が切るので $T=3\times4=12$ である。したがって $n=4$ のときの3番目に大きい値は $12$ である。`,
            },
            { k: "p", t: String.raw`まとめると、3番目に大きい値は` },
            {
              k: "math",
              t: String.raw`n=4\ \text{のとき}\ 12,\qquad n=3\ \text{または}\ n\geqq5\ \text{のとき}\ \frac{n^{3}+5n-6}{6}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「最大から1ずつ減った値が必ず実現する」とは限らない。$n=4$ では $15,14$ の次が $12$ で、$13$ は飛ぶ。`,
            String.raw`$n=4$ で $13$ が作れないことは、実例を探すだけでは示せない。場合分けで尽くす必要がある。`,
          ],
          check: String.raw`無作為な平面の組で数えたところ、$n=4$ では $15,14,12,11,10$ が現れ、$13$ は一度も現れなかった。$n=5,6,7$ では3番目に大きい値がそれぞれ $24,40,62$ で $\dfrac{n^{3}+5n-6}{6}$ と一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "数列・微分法",
      topics: ["対数をとって増減を見る", "隣り合う項の比", "比がちょうど1になる番号", "最大値をとる項"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$k=1,\\ldots,39$ の $b_{k}$ を分数のまま計算したところ、最大値は $\\tfrac{177147}{131072}$ で $k=2,3$ の2つで達成された",
          "比 $\\tfrac{b_{k+1}}{b_{k}}$ は $k=1,2,3,4,5,6$ で $1.06787,1,0.96560,0.94478,0.93083,0.92083$ と減少した",
          "$f\\left(x\\right)=\\left(x+1\\right)\\log\\left(1+\\tfrac1x\\right)$ を $0.01$ 刻みで $x=0.01$ から $29.99$ まで調べ、つねに減少することを確認した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\left(x+1\right)\log\left(1+\dfrac1x\right)$ は $x>0$ で減少することを示す`,
          answer: String.raw`$f'\left(x\right)=\log\left(1+\dfrac1x\right)-\dfrac1x<0$ より減少する`,
          approach: String.raw`微分すると $\log\left(1+t\right)-t$（$t=\dfrac1x$）の形になり、よく使う不等式 $\log\left(1+t\right)<t$ でかたづく。`,
          blocks: [
            { k: "p", t: String.raw`$x>0$ で $f\left(x\right)=\left(x+1\right)\left\{\log\left(x+1\right)-\log x\right\}$ なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\log\left(1+\frac1x\right)+\left(x+1\right)\left(\frac{1}{x+1}-\frac1x\right)=\log\left(1+\frac1x\right)-\frac1x`,
            },
            {
              k: "p",
              t: String.raw`である（$\left(x+1\right)\left(\dfrac{1}{x+1}-\dfrac1x\right)=1-\dfrac{x+1}{x}=-\dfrac1x$）。ここで $g\left(t\right)=\log\left(1+t\right)-t$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`g'\left(t\right)=\frac{1}{1+t}-1=-\frac{t}{1+t}<0\qquad\left(t>0\right)`,
            },
            { k: "p", t: String.raw`で $g\left(0\right)=0$ なので、$t>0$ では $g\left(t\right)<0$、すなわち` },
            { k: "math", t: String.raw`\log\left(1+t\right)<t\qquad\left(t>0\right)` },
            {
              k: "p",
              t: String.raw`である。$x>0$ のとき $t=\dfrac1x>0$ だから $f'\left(x\right)=\log\left(1+\dfrac1x\right)-\dfrac1x<0$ であり、$f\left(x\right)$ は $x>0$ で減少する。`,
            },
          ],
          check: String.raw`$x$ を $0.01$ 刻みで $0.01$ から $29.99$ まで動かしたところ、$f$ はつねに減少し、$f\left(0.01\right)=4.6613$、$f\left(29.99\right)=1.0165$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a=\dfrac{2^{8}}{3^{4}}$ として $b_{k}=\dfrac{\left(k+1\right)^{k+1}}{a^{k}k!}$（$k=1,2,3,\ldots$）とするとき、数列 $\left\{b_{k}\right\}$ の項の最大値 $M$ を既約分数で表し、$b_{k}=M$ となる $k$ をすべて求める`,
          answer: String.raw`$M=\dfrac{3^{11}}{2^{17}}=\dfrac{177147}{131072}$、$k=2,3$`,
          approach: String.raw`隣り合う項の比をとると $\dfrac{b_{k+1}}{b_{k}}=\dfrac{1}{a}\left(1+\dfrac{1}{k+1}\right)^{k+2}$ となり、対数が $f\left(k+1\right)-\log a$ になる。(1) よりこの比は減少する。`,
          blocks: [
            { k: "p", t: String.raw`すべての $k$ で $b_{k}>0$ である。隣り合う項の比をとると` },
            {
              k: "math",
              t: String.raw`\frac{b_{k+1}}{b_{k}}=\frac{\left(k+2\right)^{k+2}}{a^{k+1}\left(k+1\right)!}\cdot\frac{a^{k}k!}{\left(k+1\right)^{k+1}}=\frac1a\cdot\frac{\left(k+2\right)^{k+2}}{\left(k+1\right)^{k+2}}=\frac1a\left(1+\frac{1}{k+1}\right)^{k+2}`,
            },
            { k: "p", t: String.raw`である。対数をとると` },
            {
              k: "math",
              t: String.raw`\log\frac{b_{k+1}}{b_{k}}=\left(k+2\right)\log\left(1+\frac{1}{k+1}\right)-\log a=f\left(k+1\right)-\log a`,
            },
            {
              k: "p",
              t: String.raw`となる。(1) より $f$ は $x>0$ で減少するので、$k$ が増えると $\dfrac{b_{k+1}}{b_{k}}$ は減少する。`,
            },
            { k: "p", t: String.raw`ここで` },
            { k: "math", t: String.raw`a=\frac{2^{8}}{3^{4}}=\frac{256}{81}=\left(\frac43\right)^{4}` },
            { k: "p", t: String.raw`であることに注目する。$k=2$ とすると` },
            {
              k: "math",
              t: String.raw`\frac{b_{3}}{b_{2}}=\frac1a\left(1+\frac13\right)^{4}=\frac1a\left(\frac43\right)^{4}=1`,
            },
            { k: "p", t: String.raw`である。比は減少するから` },
            {
              k: "steps",
              items: [
                String.raw`$k=1$ では $\dfrac{b_{2}}{b_{1}}>1$、つまり $b_{1}<b_{2}$`,
                String.raw`$k=2$ では $\dfrac{b_{3}}{b_{2}}=1$、つまり $b_{2}=b_{3}$`,
                String.raw`$k\geqq3$ では $\dfrac{b_{k+1}}{b_{k}}<1$、つまり $b_{3}>b_{4}>b_{5}>\cdots$`,
              ],
            },
            { k: "p", t: String.raw`となり、最大値は $b_{2}=b_{3}$ である。実際に計算すると` },
            {
              k: "math",
              t: String.raw`b_{2}=\frac{3^{3}}{a^{2}\cdot2!}=\frac{27}{2}\cdot\frac{3^{8}}{2^{16}}=\frac{3^{11}}{2^{17}}`,
            },
            { k: "p", t: String.raw`であり、$b_{3}=\dfrac{4^{4}}{a^{3}\cdot3!}=\dfrac{2^{8}}{6}\cdot\dfrac{3^{12}}{2^{24}}=\dfrac{3^{12}}{3\cdot2^{17}}=\dfrac{3^{11}}{2^{17}}$ でも同じ値になる。$3^{11}$ は奇数なので既約分数である。よって` },
            {
              k: "math",
              t: String.raw`M=\frac{3^{11}}{2^{17}}=\frac{177147}{131072},\qquad b_{k}=M\ \text{となる}\ k\ \text{は}\ k=2,3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=\left(\dfrac43\right)^{4}$ と見ると、$\dfrac{b_{k+1}}{b_{k}}=1$ は $\left(1+\dfrac{1}{k+1}\right)^{k+2}=\left(1+\dfrac13\right)^{4}$、つまり $k+1=3$ である。$a$ がこの形に作ってあることが、答えがちょうど2つになる理由である。`,
            },
          ],
          pitfalls: [
            String.raw`比がちょうど $1$ になる $k$ があるので、最大値をとる $k$ は2つある。$k=2$ だけ答えると足りない。`,
            String.raw`比が減少することは (1) から従う。$\left(1+\dfrac{1}{k+1}\right)^{k+2}$ が減少すると「なんとなく」書くのではなく、(1) を使う。`,
          ],
          check: String.raw`$k=1,\ldots,39$ の $b_{k}$ を分数のまま計算したところ、最大値は $\dfrac{177147}{131072}$ で $k=2,3$ の2つで達成された。`,
        },
      ],
    },
  ],
};
