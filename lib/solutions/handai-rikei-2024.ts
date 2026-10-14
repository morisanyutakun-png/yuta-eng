import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2024年度（令和6年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の $f_n\left(x\right)=1-\tfrac12e^{nx}+\cos\tfrac x3$（図は $n=2$）。 */
const N1H = 2;
const F1H = (x: number): number => 1 - Math.exp(N1H * x) / 2 + Math.cos(x / 3);

/** 第2問。$f\left(1+i\right)$ がとりうる値は中心 $2+2i$、半径 $2\sqrt2$ の閉円板。 */
const R2H = 2 * Math.SQRT2;

/** 第4問の図。$a=2$ のときの円 $C$ と、回転させる図形。 */
const A4H = 2;
const C4H = (t: number): [number, number] => [A4H + Math.cos(t), Math.sin(t)];

export const handaiRikei2024: SolutionSet = {
  slug: "handai-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "極限",
      topics: ["中間値の定理", "単調性から解がただ1つ", "はさみうち", "指数と対数の極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,2,5,20,100$ で二分法によって解 $a_n$ を求めると、$a_n$ は $1.336,0.687,0.277,0.0693,0.01386$ と $0$ に近づいた",
          "$na_n$ は $1.3363,1.3732,1.3842,1.3862,1.38629$ となり、$\\log4=1.3862944$ に近づいた",
          "$n=1$ で $0\\leqq x\\leqq5$ の $f_n'$ の最大は $-0.5$ で、つねに負だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`自然数 $n$ に対して $f_n\left(x\right)=1-\dfrac12e^{nx}+\cos\dfrac x3$（$x\geqq0$）とする。$f_n\left(x\right)=0$ がただ1つの実数解をもつことを示す`,
          answer: String.raw`$f_n$ は $x\geqq0$ で狭義単調減少、$f_n\left(0\right)=\dfrac32>0$、$x\to\infty$ で $-\infty$`,
          approach: String.raw`$f_n'\left(x\right)\leqq-\dfrac16<0$ を示す。$e^{nx}\geqq1$ と $\left|\sin\right|\leqq1$ でおさえる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f_n'\left(x\right)=-\frac n2e^{nx}-\frac13\sin\frac x3`,
            },
            {
              k: "p",
              t: String.raw`である。$x\geqq0$、$n\geqq1$ では $e^{nx}\geqq1$ なので $\dfrac n2e^{nx}\geqq\dfrac12$ であり、$\left|\dfrac13\sin\dfrac x3\right|\leqq\dfrac13$ だから`,
            },
            {
              k: "math",
              t: String.raw`f_n'\left(x\right)\leqq-\frac12+\frac13=-\frac16<0`,
            },
            { k: "p", t: String.raw`である。よって $f_n$ は $x\geqq0$ で狭義単調減少する。` },
            { k: "p", t: String.raw`端のようすは` },
            {
              k: "math",
              t: String.raw`f_n\left(0\right)=1-\frac12+1=\frac32>0`,
            },
            {
              k: "p",
              t: String.raw`であり、$1+\cos\dfrac x3$ は $0$ 以上 $2$ 以下で有界、$-\dfrac12e^{nx}\to-\infty$ なので $x\to\infty$ で $f_n\to-\infty$ である。`,
            },
            {
              k: "p",
              t: String.raw`$f_n$ は連続で狭義単調減少し、$\dfrac32>0$ から $-\infty$ まで動くので、中間値の定理によって $f_n\left(x\right)=0$ は $x>0$ にただ1つ解をもつ。（証明終わり）`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = fₙ(x) のグラフ（図は n = 2）。x = 0 で 3/2 から始まり、ずっと減って −∞ に落ちる。x 軸と交わる点がただ1つの解 aₙ。",
                view: [-0.35, 1.9, -3.4, 2.1],
                items: [
                  { k: "curve", f: F1H, from: 0, to: 1.9 },
                  { k: "dot", at: [0, 1.5], label: "(0, 3/2)", place: "above-right" },
                  { k: "dot", at: [0.686585622, 0], label: "aₙ", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$n=1$ で $0\leqq x\leqq5$ の $f_n'$ の最大は $-0.5$ で、つねに負だった。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の解を $a_n$ とするとき $\displaystyle\lim_{n\to\infty}a_n$ を求める`,
          answer: String.raw`$\displaystyle\lim_{n\to\infty}a_n=0$`,
          approach: String.raw`$f_n\left(a_n\right)=0$ から $e^{na_n}=2\left(1+\cos\dfrac{a_n}{3}\right)\leqq4$。`,
          blocks: [
            { k: "p", t: String.raw`$f_n\left(a_n\right)=0$ より` },
            {
              k: "math",
              t: String.raw`\frac12e^{na_n}=1+\cos\frac{a_n}{3},\qquad e^{na_n}=2\left(1+\cos\frac{a_n}{3}\right)`,
            },
            { k: "p", t: String.raw`である。右辺は $0$ 以上 $4$ 以下なので $e^{na_n}\leqq4$、すなわち` },
            {
              k: "math",
              t: String.raw`na_n\leqq\log4,\qquad0<a_n\leqq\frac{\log4}{n}`,
            },
            {
              k: "p",
              t: String.raw`である（$a_n>0$ は (1) から）。はさみうちの原理より $\displaystyle\lim_{n\to\infty}a_n=0$ である。`,
            },
          ],
          check: String.raw`$n=1,2,5,20,100$ で $a_n=1.336,0.687,0.277,0.0693,0.01386$ と $0$ に近づいた。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}na_n$ を求める`,
          answer: String.raw`$\displaystyle\lim_{n\to\infty}na_n=\log4=2\log2$`,
          approach: String.raw`(2) の等式を $na_n$ について解く。$a_n\to0$ なので $\cos\dfrac{a_n}{3}\to1$。`,
          blocks: [
            { k: "p", t: String.raw`(2) の等式の両辺の対数をとると` },
            {
              k: "math",
              t: String.raw`na_n=\log\left\{2\left(1+\cos\frac{a_n}{3}\right)\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。(2) より $a_n\to0$ なので $\cos\dfrac{a_n}{3}\to1$ であり、$\log$ は連続だから`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}na_n=\log\left(2\cdot2\right)=\log4=2\log2`,
            },
            { k: "p", t: String.raw`である（$1.3862\ldots$）。` },
            {
              k: "note",
              t: String.raw`$a_n\approx\dfrac{\log4}{n}$ ということ。(2) で作った上からの評価 $a_n\leqq\dfrac{\log4}{n}$ が、実はほぼ等号だったと分かる。`,
            },
          ],
          check: String.raw`$na_n$ は $n=1,2,5,20,100$ で $1.3363,1.3732,1.3842,1.3862,1.38629$ となり、$\log4=1.3862944$ に近づいた。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["複素数の1次変換", "絶対値の条件", "円板の和", "等号が成り立つ場合"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "条件をみたす $\\left(\\alpha,\\beta\\right)$ を $10$ 万組とると、$\\left|f\\left(1+i\\right)-\\left(2+2i\\right)\\right|$ の最大は $2.8198$ で $2\\sqrt2=2.8284$ に近づいた",
          "$\\alpha=-2+i$、$\\beta=3-i$ では $f\\left(1\\right)=2$、$f\\left(i\\right)=1-3i$ で $\\left|f\\left(1\\right)-3\\right|=1$、$\\left|f\\left(i\\right)-1\\right|=3$ とどちらも等号",
          "そのとき $f\\left(1+i\\right)=0$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(z\right)=z^{2}+\alpha z+\beta$ とし、$\alpha,\beta$ は $\left|f\left(1\right)-3\right|\leqq1$ かつ $\left|f\left(i\right)-1\right|\leqq3$ をみたして動く。$f\left(1+i\right)$ がとりうる値の範囲を求める`,
          answer: String.raw`$\left|f\left(1+i\right)-\left(2+2i\right)\right|\leqq2\sqrt2$。すなわち中心 $2+2i$、半径 $2\sqrt2$ の円板（周を含む）`,
          approach: String.raw`$f\left(1\right)$ と $f\left(i\right)$ を変数にとり直すと、$f\left(1+i\right)$ はその1次式で書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$u=f\left(1\right)=1+\alpha+\beta$、$v=f\left(i\right)=-1+\alpha i+\beta$ とおく。$\alpha,\beta$ が複素数全体を動くとき $u,v$ も独立に複素数全体を動く（$u,v$ から $\alpha,\beta$ が一意に決まる）。実際`,
            },
            {
              k: "math",
              t: String.raw`u-v=2+\alpha\left(1-i\right),\qquad\alpha=\frac{u-v-2}{1-i},\qquad\beta=u-1-\alpha`,
            },
            { k: "p", t: String.raw`である。一方` },
            {
              k: "math",
              t: String.raw`f\left(1+i\right)=\left(1+i\right)^{2}+\alpha\left(1+i\right)+\beta=2i+\alpha\left(1+i\right)+\beta`,
            },
            { k: "p", t: String.raw`で、$\beta=u-1-\alpha$ を入れると $\alpha$ の項がまとまって` },
            {
              k: "math",
              t: String.raw`f\left(1+i\right)=u-1+2i+\alpha i`,
            },
            { k: "p", t: String.raw`である。$p=u-3$、$q=v-1$（条件は $\left|p\right|\leqq1$、$\left|q\right|\leqq3$）とおくと $u-v-2=p-q$ なので` },
            {
              k: "math",
              t: String.raw`\alpha i=\frac{\left(p-q\right)i}{1-i}=\frac{\left(p-q\right)\left(i-1\right)}{2}`,
            },
            { k: "p", t: String.raw`である（分母を有理化した）。したがって` },
            {
              k: "math",
              t: String.raw`f\left(1+i\right)=\left(p+3\right)-1+2i+\frac{\left(p-q\right)\left(i-1\right)}{2}=\left(2+2i\right)+\frac{p\left(1+i\right)+q\left(1-i\right)}{2}`,
            },
            { k: "p", t: String.raw`である。$\left|1+i\right|=\left|1-i\right|=\sqrt2$ なので` },
            {
              k: "math",
              t: String.raw`\left|\frac{p\left(1+i\right)}{2}\right|\leqq\frac{\sqrt2}{2},\qquad\left|\frac{q\left(1-i\right)}{2}\right|\leqq\frac{3\sqrt2}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$p$ は $\left|p\right|\leqq1$ の円板全体を動くので $\dfrac{p\left(1+i\right)}{2}$ は半径 $\dfrac{\sqrt2}{2}$ の円板全体を、同様に $\dfrac{q\left(1-i\right)}{2}$ は半径 $\dfrac{3\sqrt2}{2}$ の円板全体を動く。2つは独立なので、和は半径`,
            },
            {
              k: "math",
              t: String.raw`\frac{\sqrt2}{2}+\frac{3\sqrt2}{2}=2\sqrt2`,
            },
            { k: "p", t: String.raw`の円板全体を動く。したがって $f\left(1+i\right)$ がとりうる値の範囲は` },
            {
              k: "math",
              t: String.raw`\left|f\left(1+i\right)-\left(2+2i\right)\right|\leqq2\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`すなわち**中心 $2+2i$、半径 $2\sqrt2$ の円板（周を含む）**である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "f(1+i) がとりうる値（塗った円板）。中心は 2 + 2i、半径は 2√2。原点までの距離もちょうど 2√2 なので、原点は円周の上にある。",
                view: [-2.2, 6.2, -1.9, 6.0],
                items: [
                  {
                    k: "fill",
                    pts: Array.from({ length: 73 }, (_, i): [number, number] => [
                      2 + R2H * Math.cos((2 * Math.PI * i) / 72),
                      2 + R2H * Math.sin((2 * Math.PI * i) / 72),
                    ]),
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [
                      2 + R2H * Math.cos(t),
                      2 + R2H * Math.sin(t),
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [0, 0], b: [2, 2], dash: true, faint: true },
                  { k: "dot", at: [2, 2], label: "2 + 2i", place: "above-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\alpha,\beta$ のまま動かそうとすると大変。$f\left(1\right),f\left(i\right)$ を変数にとり直すと、条件がそのまま「2つの円板」になる。`,
          ],
          check: String.raw`条件をみたす $\left(\alpha,\beta\right)$ を $10$ 万組とると、中心からの距離の最大は $2.8198$ で $2\sqrt2=2.8284$ に近づいた。`,
        },
        {
          label: "(2)",
          task: String.raw`$f\left(1+i\right)=0$ であるとき、$\alpha,\beta$ の値を求める`,
          answer: String.raw`$\alpha=-2+i$、$\beta=3-i$`,
          approach: String.raw`原点は円板の**周**の上なので、2つの不等式で等号が成り立ち、向きも決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|0-\left(2+2i\right)\right|=\left|2+2i\right|=2\sqrt2$ なので、原点は (1) の円板の周上にある。つまり`,
            },
            {
              k: "math",
              t: String.raw`\frac{p\left(1+i\right)}{2}+\frac{q\left(1-i\right)}{2}=-\left(2+2i\right)`,
            },
            {
              k: "p",
              t: String.raw`で、左辺の2つの大きさの和がちょうど $2\sqrt2$ に等しい。和の絶対値が各項の絶対値の和に等しくなるのは、**2つが同じ向き**でそれぞれ最大の大きさをとるときに限る。$-\left(2+2i\right)$ の向きは $-\dfrac{1+i}{\sqrt2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{p\left(1+i\right)}{2}=\frac{\sqrt2}{2}\cdot\left(-\frac{1+i}{\sqrt2}\right)=-\frac{1+i}{2}`,
            },
            { k: "p", t: String.raw`より $p=-1$、同じように` },
            {
              k: "math",
              t: String.raw`\frac{q\left(1-i\right)}{2}=\frac{3\sqrt2}{2}\cdot\left(-\frac{1+i}{\sqrt2}\right)=-\frac{3\left(1+i\right)}{2}`,
            },
            {
              k: "p",
              t: String.raw`より $q\left(1-i\right)=-3\left(1+i\right)$、すなわち $q=-\dfrac{3\left(1+i\right)^{2}}{2}=-3i$ である（$\left|q\right|=3$ で条件に合う）。`,
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`u=f\left(1\right)=p+3=2,\qquad v=f\left(i\right)=q+1=1-3i`,
            },
            { k: "p", t: String.raw`である。(1) の式に入れると` },
            {
              k: "math",
              t: String.raw`\alpha=\frac{u-v-2}{1-i}=\frac{-1+3i}{1-i}=\frac{\left(-1+3i\right)\left(1+i\right)}{2}=-2+i`,
            },
            {
              k: "math",
              t: String.raw`\beta=u-1-\alpha=2-1-\left(-2+i\right)=3-i`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`確かめ算：$f\left(1\right)=1+\left(-2+i\right)+\left(3-i\right)=2$ で $\left|2-3\right|=1$、$f\left(i\right)=-1+\left(-2+i\right)i+\left(3-i\right)=1-3i$ で $\left|1-3i-1\right|=3$。どちらもぎりぎり条件をみたしている。`,
            },
          ],
          pitfalls: [
            String.raw`三角不等式の等号は「向きがそろう」とき。大きさだけ最大にしても足りない。`,
          ],
          check: String.raw`$\alpha=-2+i$、$\beta=3-i$ で $f\left(1\right)=2$、$f\left(i\right)=1-3i$、$f\left(1+i\right)=0$ になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["ねじれの位置", "外積の向き", "基底による分解", "存在と一意性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "ランダムに2万組のねじれた2直線を作り、下の方法で $s,t$ を決めると、できた直線はどの場合も両方に直交した",
          "2点が一致してしまう（＝直線が決まらない）ことは一度もなかった",
          "$\\vec u,\\vec v,\\vec n$ が1次独立でない組は、はじめから外して数えた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`空間内の2直線 $\ell,m$ はねじれの位置にあるとする。$\ell$ と $m$ の両方に直交する直線がただ1つ存在することを示す`,
          answer: String.raw`方向は $\vec n=\vec u\times\vec v$ に限られ、$\vec{\mathrm{BA}}=a\vec u+b\vec v+c\vec n$ と分解すると $s=-a$、$t=b$ とただ1通りに決まる`,
          approach: String.raw`$\left\{\vec u,\vec v,\vec n\right\}$ が空間の基底になることを使う。ねじれの位置だから $c\ne0$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell$ を点 $\mathrm{A}$ と方向ベクトル $\vec u$ で、$m$ を点 $\mathrm{B}$ と方向ベクトル $\vec v$ で表す。ねじれの位置なので $\ell$ と $m$ は平行でなく、交わらない。平行でないことから $\vec u,\vec v$ は1次独立で`,
            },
            { k: "math", t: String.raw`\vec n=\vec u\times\vec v\ne\vec0` },
            {
              k: "p",
              t: String.raw`である。$\vec n$ は $\vec u$ とも $\vec v$ とも垂直なので、$\left\{\vec u,\vec v,\vec n\right\}$ は空間の基底になる。`,
            },
            { k: "p", t: String.raw`**方向は $\vec n$ に限られる**。` },
            {
              k: "p",
              t: String.raw`求める直線の方向ベクトルを $\vec w$ とすると、$\ell$ とも $m$ とも垂直だから $\vec w\cdot\vec u=\vec w\cdot\vec v=0$ である。$\vec u,\vec v$ に垂直なベクトルは $\vec n$ の定数倍に限るので、$\vec w$ は $\vec n$ に平行である。`,
            },
            { k: "p", t: String.raw`**交わる点の決まり方**。` },
            {
              k: "p",
              t: String.raw`求める直線が $\ell$ と $\mathrm{P}=\mathrm{A}+s\vec u$ で、$m$ と $\mathrm{Q}=\mathrm{B}+t\vec v$ で交わるとすると、$\overrightarrow{\mathrm{QP}}$ が $\vec n$ に平行であればよい。$\overrightarrow{\mathrm{BA}}$ を基底で`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{BA}}=a\vec u+b\vec v+c\vec n`,
            },
            { k: "p", t: String.raw`と（ただ1通りに）分解すると` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{QP}}=\overrightarrow{\mathrm{BA}}+s\vec u-t\vec v=\left(a+s\right)\vec u+\left(b-t\right)\vec v+c\vec n`,
            },
            {
              k: "p",
              t: String.raw`である。これが $\vec n$ の定数倍になるのは、基底の係数の一意性から`,
            },
            {
              k: "math",
              t: String.raw`a+s=0\ \text{かつ}\ b-t=0,\qquad\text{つまり}\quad s=-a,\ t=b`,
            },
            { k: "p", t: String.raw`のときに限る。すなわち $\mathrm{P},\mathrm{Q}$ はただ1通りに決まる。` },
            { k: "p", t: String.raw`**$\mathrm{P}\ne\mathrm{Q}$ であること**。` },
            {
              k: "p",
              t: String.raw`このとき $\overrightarrow{\mathrm{QP}}=c\vec n$ である。もし $c=0$ なら $\mathrm{P}=\mathrm{Q}$ となり、$\ell$ と $m$ が交わってしまう。これはねじれの位置であることに反するので $c\ne0$ である。よって $\mathrm{P}\ne\mathrm{Q}$ で、2点 $\mathrm{P},\mathrm{Q}$ を通る直線がただ1つ定まる。`,
            },
            {
              k: "p",
              t: String.raw`この直線は方向が $\vec n$ なので $\ell$ とも $m$ とも垂直で、しかも $\mathrm{P}$ で $\ell$ と、$\mathrm{Q}$ で $m$ と交わるから、両方に直交する。逆に両方に直交する直線は上の議論から必ずこれになる。したがってそのような直線はただ1つである。（証明終わり）`,
            },
            {
              k: "note",
              t: String.raw`$\left|c\right|\left|\vec n\right|=\mathrm{PQ}$ が2直線の最短距離でもある。$\overrightarrow{\mathrm{BA}}$ の $\vec n$ 方向の成分がそのまま距離になる、という見方ができる。`,
            },
          ],
          pitfalls: [
            String.raw`「方向が決まる」だけでは足りない。$\ell,m$ と実際に交わる位置がただ1通りであること、そして2点が一致しないことまで言う。`,
          ],
          check: String.raw`ランダムに2万組のねじれた2直線を作って $s=-a$、$t=b$ とすると、$\overrightarrow{\mathrm{QP}}$ はどの場合も $\vec u,\vec v$ と直交し、$\mathrm{P}\ne\mathrm{Q}$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分（回転体）",
      topics: ["y 軸のまわりの回転", "円板と円環", "ドーナツ形の体積", "2次方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1.5,2,4.566$ で数値積分した $V_1$ が $\\pi\\left(2a^{2}+\\pi a+\\tfrac43\\right)$ と小数6桁まで一致した",
          "同じ $a$ で $V_2$ が $2\\pi^{2}a$ と一致した",
          "$a=\\tfrac{9\\pi+\\sqrt{81\\pi^{2}-96}}{12}=4.5663949$ で $V_1-2V_2$ が $-2.8\\times10^{-14}$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a>1$ とし、$xy$ 平面で点 $\left(a,0\right)$ を中心とする半径 $1$ の円を $C$ とする。$C$ の $x\geqq a$ の部分と $y$ 軸および2直線 $y=1$、$y=-1$ で囲まれた図形を $y$ 軸のまわりに1回転してできる立体の体積 $V_1$ を求める`,
          answer: String.raw`$V_1=\pi\left(2a^{2}+\pi a+\dfrac43\right)$`,
          approach: String.raw`高さ $y$ の断面は半径 $a+\sqrt{1-y^{2}}$ の円板。$\displaystyle\int_{-1}^{1}\sqrt{1-y^{2}}dy=\frac{\pi}{2}$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ の $x\geqq a$ の部分は $x=a+\sqrt{1-y^{2}}$（$-1\leqq y\leqq1$）である。囲まれた図形は、各 $y$ について $0\leqq x\leqq a+\sqrt{1-y^{2}}$ の部分である。$y$ 軸のまわりに回すと断面は**円板**なので`,
            },
            {
              k: "math",
              t: String.raw`V_1=\pi\int_{-1}^{1}\left(a+\sqrt{1-y^{2}}\right)^{2}dy=\pi\int_{-1}^{1}\left\{a^{2}+2a\sqrt{1-y^{2}}+\left(1-y^{2}\right)\right\}dy`,
            },
            { k: "p", t: String.raw`である。それぞれ` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}a^{2}dy=2a^{2},\qquad\int_{-1}^{1}\sqrt{1-y^{2}}\,dy=\frac{\pi}{2},\qquad\int_{-1}^{1}\left(1-y^{2}\right)dy=\frac43`,
            },
            {
              k: "p",
              t: String.raw`である（2つめは半径 $1$ の半円の面積）。したがって`,
            },
            {
              k: "math",
              t: String.raw`V_1=\pi\left(2a^{2}+\pi a+\frac43\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "図は a = 2 のとき。円 C と、(1) で回転させる図形（塗った部分。y 軸・y = ±1・C の右半分で囲む）。(2) では円 C の内部そのものを回す。",
                view: [-0.6, 3.6, -1.7, 1.7],
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0, -1],
                      ...Array.from({ length: 41 }, (_, i): [number, number] => {
                        const y = -1 + (2 * i) / 40;
                        return [A4H + Math.sqrt(Math.max(0, 1 - y * y)), y];
                      }),
                      [0, 1],
                    ],
                  },
                  { k: "param", f: C4H, from: 0, to: 2 * Math.PI },
                  { k: "seg", a: [-0.6, 1], b: [3.6, 1], dash: true, faint: true },
                  { k: "seg", a: [-0.6, -1], b: [3.6, -1], dash: true, faint: true },
                  { k: "dot", at: [A4H, 0], label: "(a, 0)", place: "below" },
                  { k: "text", at: [3.6, 1], label: "y = 1", place: "above-left" },
                  { k: "text", at: [3.6, -1], label: "y = −1", place: "below-left" },
                ],
              },
            },
          ],
          check: String.raw`$a=1.5,2,4.566$ で数値積分した値と式が小数6桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ で囲まれた図形を $y$ 軸のまわりに1回転してできる立体の体積を $V_2$ とする。$V_1=2V_2$ となる $a$ の値を求める`,
          answer: String.raw`$a=\dfrac{9\pi+\sqrt{81\pi^{2}-96}}{12}$`,
          approach: String.raw`$V_2$ は円環を積む。$\left(a+\sqrt{\ }\right)^{2}-\left(a-\sqrt{\ }\right)^{2}=4a\sqrt{\ }$ ときれいになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a>1$ なので円 $C$ は $y$ 軸と交わらず、$x>0$ の側にある。高さ $y$ の断面は、外半径 $a+\sqrt{1-y^{2}}$、内半径 $a-\sqrt{1-y^{2}}$ の**円環**である。`,
            },
            {
              k: "math",
              t: String.raw`V_2=\pi\int_{-1}^{1}\left\{\left(a+\sqrt{1-y^{2}}\right)^{2}-\left(a-\sqrt{1-y^{2}}\right)^{2}\right\}dy=\pi\int_{-1}^{1}4a\sqrt{1-y^{2}}\,dy`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`V_2=4a\pi\cdot\frac{\pi}{2}=2\pi^{2}a`,
            },
            { k: "p", t: String.raw`である。$V_1=2V_2$ は` },
            {
              k: "math",
              t: String.raw`\pi\left(2a^{2}+\pi a+\frac43\right)=4\pi^{2}a,\qquad2a^{2}-3\pi a+\frac43=0`,
            },
            { k: "p", t: String.raw`すなわち $6a^{2}-9\pi a+4=0$ である。解は` },
            {
              k: "math",
              t: String.raw`a=\frac{9\pi\pm\sqrt{81\pi^{2}-96}}{12}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt{81\pi^{2}-96}=26.52\ldots$、$9\pi=28.27\ldots$ なので、$-$ のほうは $0.146\ldots<1$ で条件 $a>1$ に反する。したがって`,
            },
            {
              k: "math",
              t: String.raw`a=\frac{9\pi+\sqrt{81\pi^{2}-96}}{12}`,
            },
            { k: "p", t: String.raw`である（$4.566\ldots$）。` },
            {
              k: "note",
              t: String.raw`$V_2=2\pi^{2}a$ は「ドーナツの体積 ＝ 断面積 $\pi$ × 重心が回る長さ $2\pi a$」でもある（パップス・ギュルダンの定理）。断面の計算と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$a>1$ という条件が効く。2解のうち小さいほうを落とさずに、きちんと外す理由を書く。`,
          ],
          check: String.raw`$a=4.5663949$ で $V_1-2V_2$ が $-2.8\times10^{-14}$ になり、もう一方の解は $0.146$ で $a>1$ に反した。`,
        },
      ],
    },
    {
      no: 5,
      field: "整数",
      topics: ["互いに素な個数", "包除原理", "オイラー関数", "約数となる条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(p,q,r\\right)=\\left(2,3,5\\right),\\left(3,5,7\\right),\\left(2,5,11\\right)$ と $a,b,c\\in\\left\\{1,2\\right\\}$ で、数え上げた $f$ と式が一致した",
          "$5\\leqq n\\leqq100$ を全部調べると、$f\\left(n\\right)$ が $n$ の約数になるのは $6,8,12,16,18,24,32,36,48,54,64,72,96$ の $13$ 個だった",
          "これは $2^{a}$ と $2^{a}3^{b}$（$a,b\\geqq1$）の形の数と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$1$ から $n$ までのうち $n$ と互いに素なものの個数を $f\left(n\right)$ とする。自然数 $a,b,c$ と相異なる素数 $p,q,r$ に対して $f\left(p^{a}q^{b}r^{c}\right)=p^{a-1}q^{b-1}r^{c-1}\left(p-1\right)\left(q-1\right)\left(r-1\right)$ を示す`,
          answer: String.raw`包除原理で $N\left(1-\dfrac1p\right)\left(1-\dfrac1q\right)\left(1-\dfrac1r\right)$ を計算する`,
          approach: String.raw`$N=p^{a}q^{b}r^{c}$ と互いに素でないのは「$p,q,r$ のどれかの倍数」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$N=p^{a}q^{b}r^{c}$ とおく。$1$ 以上 $N$ 以下の整数が $N$ と互いに素でないのは、$p,q,r$ のどれかで割り切れるときである。$1$ から $N$ までで $p$ の倍数は $\dfrac Np$ 個、$pq$ の倍数は $\dfrac{N}{pq}$ 個、というふうに数えられるので、包除原理より`,
            },
            {
              k: "math",
              t: String.raw`f\left(N\right)=N-\left(\frac Np+\frac Nq+\frac Nr\right)+\left(\frac{N}{pq}+\frac{N}{qr}+\frac{N}{rp}\right)-\frac{N}{pqr}`,
            },
            { k: "p", t: String.raw`である。右辺は因数分解できて` },
            {
              k: "math",
              t: String.raw`f\left(N\right)=N\left(1-\frac1p\right)\left(1-\frac1q\right)\left(1-\frac1r\right)`,
            },
            { k: "p", t: String.raw`となる。$N=p^{a}q^{b}r^{c}$ を入れると` },
            {
              k: "math",
              t: String.raw`f\left(N\right)=p^{a}q^{b}r^{c}\cdot\frac{p-1}{p}\cdot\frac{q-1}{q}\cdot\frac{r-1}{r}=p^{a-1}q^{b-1}r^{c-1}\left(p-1\right)\left(q-1\right)\left(r-1\right)`,
            },
            { k: "p", t: String.raw`である。（証明終わり）` },
            {
              k: "note",
              t: String.raw`素因数が1種類なら $f\left(p^{a}\right)=p^{a-1}\left(p-1\right)$、2種類なら $f\left(p^{a}q^{b}\right)=p^{a-1}q^{b-1}\left(p-1\right)\left(q-1\right)$ と、同じ形になる。(2) ではこれらも使う。`,
            },
          ],
          check: String.raw`3組の素数と $a,b,c\in\left\{1,2\right\}$ で、数え上げた値と式が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$f\left(n\right)$ が $n$ の約数となる $5$ 以上 $100$ 以下の自然数 $n$ をすべて求める`,
          answer: String.raw`$n=6,8,12,16,18,24,32,36,48,54,64,72,96$`,
          approach: String.raw`まず $n$ が偶数であること、次に奇数部分が $3$ の冪に限ることを示す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$n$ は偶数**。$n\geqq5$ が奇数とすると、$n$ は奇素数 $p$ をもち、$f\left(n\right)$ は $p-1$（偶数）で割り切れるので偶数である。偶数は奇数の約数になれないので、$f\left(n\right)$ は $n$ の約数にならない。`,
            },
            {
              k: "p",
              t: String.raw`そこで $n=2^{a}m$（$a\geqq1$、$m$ は奇数）と書く。(1) と同じ形の式から`,
            },
            {
              k: "math",
              t: String.raw`f\left(n\right)=f\left(2^{a}\right)f\left(m\right)=2^{a-1}f\left(m\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$m=1$ のとき**：$f\left(n\right)=2^{a-1}$ は $2^{a}$ の約数なので条件をみたす。$5\leqq2^{a}\leqq100$ から $n=8,16,32,64$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$m>1$ のとき**：$m$ の奇素数 $p$ について $f\left(m\right)$ は $p-1$（偶数）で割り切れるので、$f\left(m\right)=2^{s}t$（$t$ は奇数、$s\geqq1$）と書ける。このとき`,
            },
            {
              k: "math",
              t: String.raw`f\left(n\right)=2^{a-1+s}t`,
            },
            {
              k: "p",
              t: String.raw`で、これが $n=2^{a}m$（$2$ の指数は $a$）の約数になるには $a-1+s\leqq a$、つまり $s=1$ が必要である。`,
            },
            {
              k: "p",
              t: String.raw`もし $m$ が相異なる奇素数 $p,q$ をもつと、$f\left(m\right)$ は $\left(p-1\right)\left(q-1\right)$ で割り切れて $4$ の倍数になり $s\geqq2$ となる。よって $m=p^{b}$（$p$ は奇素数、$b\geqq1$）である。`,
            },
            {
              k: "math",
              t: String.raw`f\left(m\right)=p^{b-1}\left(p-1\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$s=1$ は $p-1\equiv2\pmod4$ を意味する。さらに $f\left(n\right)=2^{a-1}p^{b-1}\left(p-1\right)=2^{a}p^{b-1}\cdot\dfrac{p-1}{2}$ が $2^{a}p^{b}$ の約数になるには、$\dfrac{p-1}{2}$ が $p$ の約数でなければならない。$p-1$ と $p$ は互いに素なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{p-1}{2}=1,\qquad p=3`,
            },
            {
              k: "p",
              t: String.raw`である（このとき $p-1=2$ で $s=1$ も成り立つ）。したがって $n=2^{a}3^{b}$（$a,b\geqq1$）である。逆にこの形なら $f\left(n\right)=2^{a-1}\cdot3^{b-1}\cdot2=2^{a}3^{b-1}$ で、確かに $n$ の約数である。`,
            },
            { k: "p", t: String.raw`$5\leqq2^{a}3^{b}\leqq100$ を数え上げると` },
            {
              k: "steps",
              items: [
                String.raw`$b=1$：$6,12,24,48,96$`,
                String.raw`$b=2$：$18,36,72$`,
                String.raw`$b=3$：$54$`,
              ],
            },
            { k: "p", t: String.raw`である。$m=1$ の場合と合わせて` },
            {
              k: "math",
              t: String.raw`n=6,8,12,16,18,24,32,36,48,54,64,72,96`,
            },
            { k: "p", t: String.raw`の $13$ 個である。` },
            {
              k: "note",
              t: String.raw`答えは「$2$ の冪」と「$2$ の冪 × $3$ の冪」。$f\left(n\right)$ は $n$ に $\dfrac{p-1}{p}$ を掛けていく関数なので、分母の $p$ を $n$ 側でちょうど吸収できるのが $p=2,3$ だけ、と見ると納得しやすい。`,
            },
          ],
          pitfalls: [
            String.raw`「$2$ の指数」を比べるのがかぎ。$f\left(m\right)$ が $4$ の倍数になると、もう $n$ の $2$ の指数に収まらない。`,
          ],
          check: String.raw`$5\leqq n\leqq100$ を全部調べると、$f\left(n\right)\mid n$ となるのはこの $13$ 個だけだった。`,
        },
      ],
    },
  ],
};
