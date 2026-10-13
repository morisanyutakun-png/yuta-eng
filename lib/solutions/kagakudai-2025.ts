import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2025年度（令和7年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$f(x)=x\log(1+x)$ と、$I=\int_{a}^{b}g(x)dx$ にあたる領域。 */
const F1K = (x: number): number => x * Math.log(1 + x);
const A1K = Math.log(2);
const B1K = 2 * Math.log(3);
const AREA1K: [number, number][] = [
  [0, A1K],
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = 1 + i / 40;
    return [x, F1K(x)];
  }),
  [0, B1K],
];

/** 第5問の図。$f(t)=\dfrac{t^{2}-1}{t^{3}}$。 */
const F5K = (t: number): number => (t * t - 1) / (t * t * t);
const MX5K = (2 * Math.sqrt(3)) / 9;
/** $0<k<\tfrac{2\sqrt3}9$ の例。$k=0.25$ のとき解は3つ。 */
const K5 = 0.25;

export const kagakudai2025: SolutionSet = {
  slug: "kagakudai",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["部分積分", "逆関数の定積分", "置換積分", "微積分学の基本定理"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$F(x)=\\tfrac{x^{2}-1}2\\log(1+x)-\\tfrac{x^{2}}4+\\tfrac x2$ を数値微分すると、$x=0.3,1,2,3.5$ で $x\\log(1+x)$ と小数9桁まで一致した",
          "$a=f(1)=0.693147181=\\log2$、$b=f(2)=2.197224577=2\\log3$ だった",
          "逆関数 $g$ を2分法で作って $\\int_{a}^{b}g\\,dx$ を数値積分すると $2.303383541$ で、$\\tfrac52\\log3-\\log2+\\tfrac14=2.303383541$ と一致した",
          "$R(x)=\\int_{0}^{x}\\left(1+f(u)\\right)du$ を数値積分した値が、$x=0.5,1,2,3$ で求めた式と小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`関数 $f(x)$ を $x\geqq0$ に対して $f(x)=x\log\left(1+x\right)$ と定める。不定積分 $\displaystyle\int x\log\left(1+x\right)dx$ を求める`,
          answer: String.raw`$\dfrac{x^{2}-1}{2}\log\left(1+x\right)-\dfrac{x^{2}}{4}+\dfrac{x}{2}+C$`,
          approach: String.raw`部分積分。$x$ の原始関数として $\dfrac{x^{2}}{2}$ ではなく $\dfrac{x^{2}-1}{2}$ を選ぶと、残る積分が $\dfrac{x^{2}-1}{1+x}=x-1$ ときれいに約分される。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(\dfrac{x^{2}-1}{2}\right)'=x$ なので、これを $x$ の原始関数として部分積分する。`,
            },
            {
              k: "math",
              t: String.raw`\int x\log\left(1+x\right)dx=\frac{x^{2}-1}{2}\log\left(1+x\right)-\int\frac{x^{2}-1}{2}\cdot\frac{1}{1+x}dx`,
            },
            { k: "p", t: String.raw`である。残る積分は $x^{2}-1=\left(x+1\right)\left(x-1\right)$ だから約分できて` },
            {
              k: "math",
              t: String.raw`\int\frac{x^{2}-1}{2\left(1+x\right)}dx=\frac12\int\left(x-1\right)dx=\frac{x^{2}}{4}-\frac{x}{2}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\int x\log\left(1+x\right)dx=\frac{x^{2}-1}{2}\log\left(1+x\right)-\frac{x^{2}}{4}+\frac{x}{2}+C`,
            },
            { k: "p", t: String.raw`である（$C$ は積分定数）。` },
            {
              k: "note",
              t: String.raw`$\dfrac{x^{2}}{2}$ をとると残りが $\displaystyle\int\frac{x^{2}}{2\left(1+x\right)}dx$ となり、割り算が必要になる。定数 $-\dfrac12$ をずらしておくのがこの問題のコツである。`,
            },
          ],
          check: String.raw`求めた式を数値微分すると、$x=0.3,1,2,3.5$ で $x\log\left(1+x\right)$ と小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$y=f(x)$（$x\geqq0$）の逆関数を $y=g(x)$（$x\geqq0$）とし、$a,b$ を $g(a)=1$、$g(b)=2$ となる実数とする。定積分 $I=\displaystyle\int_{a}^{b}g(x)\,dx$ の値を求める`,
          answer: String.raw`$I=\dfrac52\log3-\log2+\dfrac14$`,
          approach: String.raw`逆関数の定積分は、グラフを $y=x$ で折り返して考える。長方形の面積から、もとの関数の定積分を引けばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$g(a)=1$ は $a=f(1)=1\cdot\log2=\log2$ ということである。同様に $b=f(2)=2\log3$ である。`,
            },
            {
              k: "p",
              t: String.raw`$f$ は $x\geqq0$ で増加する（$f'(x)=\log\left(1+x\right)+\dfrac{x}{1+x}>0$）ので逆関数をもつ。$y=g(x)$ のグラフは $y=f(x)$ のグラフを直線 $y=x$ について折り返したものである。したがって`,
            },
            {
              k: "math",
              t: String.raw`\int_{a}^{b}g(x)\,dx=2b-1\cdot a-\int_{1}^{2}f(x)\,dx`,
            },
            {
              k: "p",
              t: String.raw`が成り立つ（下の図のとおり、左向きの領域の面積を「大きい長方形 $-$ 小さい長方形 $-$ 曲線の下の面積」で測った）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが I = ∫g dx にあたる領域。y = f(x) の左側で、高さが a から b までの部分。これは [0, 2]×[0, b] の長方形から [0, 1]×[0, a] の長方形と、1 ≦ x ≦ 2 で曲線の下にある部分を取り除いたもの。a = log 2 ≒ 0.69、b = 2log 3 ≒ 2.20。",
                view: [-0.5, 3.2, -0.3, 2.8],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: AREA1K },
                  { k: "curve", f: F1K, from: 0, to: 2.35 },
                  { k: "seg", a: [0, A1K], b: [1, A1K], dash: true, faint: true },
                  { k: "seg", a: [0, B1K], b: [2, B1K], dash: true, faint: true },
                  { k: "seg", a: [1, 0], b: [1, A1K], dash: true, faint: true },
                  { k: "seg", a: [2, 0], b: [2, B1K], dash: true, faint: true },
                  { k: "dot", at: [1, A1K], label: "(1, a)", place: "below-right" },
                  { k: "dot", at: [2, B1K], label: "(2, b)", place: "above-left" },
                  { k: "text", at: [2.35, F1K(2.35)], label: "y = f(x)", place: "right" },
                ],
              },
            },
            { k: "p", t: String.raw`(1) より $F(x)=\dfrac{x^{2}-1}{2}\log\left(1+x\right)-\dfrac{x^{2}}{4}+\dfrac{x}{2}$ とおくと` },
            {
              k: "math",
              t: String.raw`F(2)=\frac32\log3-1+1=\frac32\log3,\qquad F(1)=0-\frac14+\frac12=\frac14`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int_{1}^{2}f(x)\,dx=\frac32\log3-\frac14`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`I=2\cdot2\log3-\log2-\left(\frac32\log3-\frac14\right)=\frac52\log3-\log2+\frac14`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a,b$ は $f$ の値であって $g$ の値ではない。$g(a)=1\iff a=f(1)$ と読みかえる。`,
            String.raw`$2b-a$ の係数は「上の長方形の横幅 $2$」と「下の長方形の横幅 $1$」。長方形の取りかたを図で確かめる。`,
          ],
          check: String.raw`逆関数 $g$ を2分法で作って数値積分すると $2.303383541$ で、$\dfrac52\log3-\log2+\dfrac14=2.303383541$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`関数 $P(x)$ を $x\geqq0$ に対して $P(x)=\displaystyle\int_{0}^{x}\sqrt{1+f(t)}\,dt$ と定める。$y=P(x)$ の、定義域を $x\geqq0$ とする逆関数 $y=Q(x)$ が微分可能であることは証明なしに認めてよい。関数 $R(x)$ を $x\geqq0$ に対して $R(x)=\displaystyle\int_{0}^{P(x)}\frac{1}{Q'(v)}dv$ と定めるとき、$R(x)$ を求める`,
          answer: String.raw`$R(x)=\dfrac{x^{2}-1}{2}\log\left(1+x\right)-\dfrac{x^{2}}{4}+\dfrac{3x}{2}$`,
          approach: String.raw`逆関数の微分 $Q'(v)=\dfrac{1}{P'\left(Q(v)\right)}$ を使うと被積分関数が $P'\left(Q(v)\right)$ になる。さらに $v=P(u)$ と置換すると、$P'$ の2乗の積分、つまり $1+f$ の積分になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$Q'$ を書きかえる。** $Q$ は $P$ の逆関数なので、逆関数の微分法より`,
            },
            {
              k: "math",
              t: String.raw`Q'(v)=\frac{1}{P'\left(Q(v)\right)},\qquad\text{すなわち}\qquad\frac{1}{Q'(v)}=P'\left(Q(v)\right)`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`R(x)=\int_{0}^{P(x)}P'\left(Q(v)\right)dv`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**置換する。** $v=P(u)$ とおくと $dv=P'(u)\,du$ である。$P(0)=0$ なので、$v$ が $0$ から $P(x)$ まで動くとき $u$ は $0$ から $x$ まで動く。また $Q\left(P(u)\right)=u$ だから`,
            },
            {
              k: "math",
              t: String.raw`R(x)=\int_{0}^{x}P'(u)\cdot P'(u)\,du=\int_{0}^{x}\left\{P'(u)\right\}^{2}du`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$P'$ を求める。** 微積分学の基本定理より $P'(u)=\sqrt{1+f(u)}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left\{P'(u)\right\}^{2}=1+f(u)=1+u\log\left(1+u\right)`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`R(x)=\int_{0}^{x}\left\{1+u\log\left(1+u\right)\right\}du=x+\Bigl[F(u)\Bigr]_{0}^{x}`,
            },
            {
              k: "p",
              t: String.raw`である。(1) の $F$ について $F(0)=\dfrac{0-1}{2}\log1-0+0=0$ だから`,
            },
            {
              k: "math",
              t: String.raw`R(x)=x+\frac{x^{2}-1}{2}\log\left(1+x\right)-\frac{x^{2}}{4}+\frac{x}{2}=\frac{x^{2}-1}{2}\log\left(1+x\right)-\frac{x^{2}}{4}+\frac{3x}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{1}{Q'}$ という形を見たら逆関数の微分を思い出す。$\dfrac{1}{Q'(v)}=P'\left(Q(v)\right)$ と直せば、あとは置換で $\left(P'\right)^{2}$ の積分に化ける、という一本道である。`,
            },
          ],
          pitfalls: [
            String.raw`$Q'(v)=\dfrac{1}{P'\left(Q(v)\right)}$ の引数は $Q(v)$ であって $v$ ではない。`,
            String.raw`$P(0)=0$ を確かめてから積分区間を $0\to x$ に取りかえる。`,
            String.raw`$F(0)=0$ は $\log1=0$ による。定数項の扱いを間違えない。`,
          ],
          check: String.raw`$R(x)=\displaystyle\int_{0}^{x}\left(1+f(u)\right)du$ を数値積分すると、$x=0.5,1,2,3$ で求めた式と小数9桁まで一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["ねじれの位置の2直線", "共通垂線", "四面体の体積", "三角関数の合成"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{P}\\left(\\tfrac19,-\\tfrac19,1\\right)$、$\\mathrm{Q}\\left(1,\\tfrac79,\\tfrac{13}9\\right)$ で $\\overrightarrow{\\mathrm{PQ}}=\\left(\\tfrac89,\\tfrac89,\\tfrac49\\right)$、2つの方向ベクトルとの内積はどちらもちょうど $0$、長さは $1.333333333$ だった",
          "$t=0,0.7,1.5,3,5,10$ で行列式から求めた体積が $\\tfrac23\\left(2+\\sin t\\right)\\left(2+\\cos t\\right)$ と小数9桁まで一致した",
          "$t$ を $0$ から $20$ まで $2\\times10^{-4}$ 刻みで走査すると、最大 $4.885618083$（$t=0.78540$）、最小 $1.114381917$（$t=3.92700$）で、$\\tfrac{9\\pm4\\sqrt2}3$ および $\\tfrac\\pi4,\\tfrac{5\\pi}4$ と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`空間の点 $\left(0,0,1\right)$ を通り $\left(1,-1,0\right)$ を方向ベクトルとする直線を $\ell$、点 $\left(1,0,3\right)$ を通り $\left(0,1,-2\right)$ を方向ベクトルとする直線を $m$ とする。$\mathrm{P}$ を $\ell$ 上、$\mathrm{Q}$ を $m$ 上の点とし、直線 $\mathrm{PQ}$ が $\ell$ とも $m$ とも垂直であるとき、$\mathrm{P}$ と $\mathrm{Q}$ の座標、および線分 $\mathrm{PQ}$ の長さを求める`,
          answer: String.raw`$\mathrm{P}\left(\dfrac19,-\dfrac19,1\right)$、$\mathrm{Q}\left(1,\dfrac79,\dfrac{13}{9}\right)$、$\mathrm{PQ}=\dfrac43$`,
          approach: String.raw`$\mathrm{P},\mathrm{Q}$ をそれぞれ媒介変数で表し、$\overrightarrow{\mathrm{PQ}}$ と2つの方向ベクトルとの内積が $0$ という2本の式を連立する。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{P},\mathrm{Q}$ を媒介変数 $s,u$ で` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(s,\ -s,\ 1\right),\qquad\mathrm{Q}\left(1,\ u,\ 3-2u\right)`,
            },
            { k: "p", t: String.raw`と表す。このとき` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=\left(1-s,\ u+s,\ 2-2u\right)`,
            },
            { k: "p", t: String.raw`である。$\ell$ の方向ベクトル $\left(1,-1,0\right)$ との内積が $0$ より` },
            {
              k: "math",
              t: String.raw`\left(1-s\right)-\left(u+s\right)=0,\qquad u=1-2s`,
            },
            { k: "p", t: String.raw`である。$m$ の方向ベクトル $\left(0,1,-2\right)$ との内積が $0$ より` },
            {
              k: "math",
              t: String.raw`\left(u+s\right)-2\left(2-2u\right)=0,\qquad5u+s=4`,
            },
            { k: "p", t: String.raw`である。$u=1-2s$ を代入すると` },
            {
              k: "math",
              t: String.raw`5\left(1-2s\right)+s=4,\qquad-9s=-1,\qquad s=\frac19,\quad u=\frac79`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(\frac19,\ -\frac19,\ 1\right),\qquad\mathrm{Q}\left(1,\ \frac79,\ \frac{13}{9}\right)`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=\left(\frac89,\ \frac89,\ \frac49\right),\qquad\mathrm{PQ}=\frac19\sqrt{64+64+16}=\frac{12}{9}=\frac43`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{PQ}}=\dfrac49\left(2,2,1\right)$ で、$\left(2,2,1\right)$ は $\left(1,-1,0\right)$ とも $\left(0,1,-2\right)$ とも垂直になっている。2直線の共通垂線の向きである。`,
            },
          ],
          check: String.raw`内積はどちらもちょうど $0$、長さは $1.333333333$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\ell$ 上に2点 $\mathrm{A}=\left(t,-t,1\right)$、$\mathrm{B}=\left(2+t+\sin t,\ -2-t-\sin t,\ 1\right)$、$m$ 上に2点 $\mathrm{C}=\left(1,t,3-2t\right)$、$\mathrm{D}=\left(1,\ 2+t+\cos t,\ -1-2t-2\cos t\right)$ があるとする（$t$ は実数）。四面体 $\mathrm{ABCD}$ の体積を $V(t)$ とするとき、$V(0)$ を求める`,
          answer: String.raw`$V(0)=4$`,
          approach: String.raw`$\overrightarrow{\mathrm{AB}}$ は $\ell$ の方向ベクトルの定数倍、$\overrightarrow{\mathrm{CD}}$ は $m$ の方向ベクトルの定数倍である。体積の行列式をその形で整理すると、驚くほどきれいになる。`,
          blocks: [
            { k: "p", t: String.raw`まず2つの辺ベクトルを計算する。` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}=\left(2+\sin t\right)\left(1,-1,0\right),\qquad\overrightarrow{\mathrm{CD}}=\left(2+\cos t\right)\left(0,1,-2\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{A},\mathrm{B}$ は $\ell$ 上、$\mathrm{C},\mathrm{D}$ は $m$ 上なので当然だが、係数が $2+\sin t$、$2+\cos t$ になっているのがポイント）。$\alpha=2+\sin t>0$、$\beta=2+\cos t>0$ とおく。`,
            },
            { k: "p", t: String.raw`四面体の体積は` },
            {
              k: "math",
              t: String.raw`V(t)=\frac16\left|\det\left[\overrightarrow{\mathrm{AB}},\ \overrightarrow{\mathrm{AC}},\ \overrightarrow{\mathrm{AD}}\right]\right|`,
            },
            {
              k: "p",
              t: String.raw`である。$\overrightarrow{\mathrm{AD}}=\overrightarrow{\mathrm{AC}}+\overrightarrow{\mathrm{CD}}$ で、行列式は同じ列を足しても変わらないから`,
            },
            {
              k: "math",
              t: String.raw`\det\left[\overrightarrow{\mathrm{AB}},\ \overrightarrow{\mathrm{AC}},\ \overrightarrow{\mathrm{AD}}\right]=\det\left[\overrightarrow{\mathrm{AB}},\ \overrightarrow{\mathrm{AC}},\ \overrightarrow{\mathrm{CD}}\right]=\alpha\beta\det\left[\vec e,\ \overrightarrow{\mathrm{AC}},\ \vec f\right]`,
            },
            { k: "p", t: String.raw`である（$\vec e=\left(1,-1,0\right)$、$\vec f=\left(0,1,-2\right)$）。ここで` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AC}}=\left(1-t,\ 2t,\ 2-2t\right)`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{AC}}\times\vec f$ を計算すると` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AC}}\times\vec f=\left(-2t-2,\ 2-2t,\ 1-t\right)`,
            },
            { k: "p", t: String.raw`で、$\vec e$ との内積は` },
            {
              k: "math",
              t: String.raw`\left(-2t-2\right)-\left(2-2t\right)+0=-4`,
            },
            {
              k: "p",
              t: String.raw`である。$t$ が消えてしまうのがこの問題の仕掛けである。したがって`,
            },
            {
              k: "math",
              t: String.raw`V(t)=\frac16\left|\alpha\beta\cdot\left(-4\right)\right|=\frac23\left(2+\sin t\right)\left(2+\cos t\right)`,
            },
            { k: "p", t: String.raw`である。$t=0$ を入れると` },
            {
              k: "math",
              t: String.raw`V(0)=\frac23\cdot2\cdot3=4`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{AD}}$ をそのまま使わず $\overrightarrow{\mathrm{AC}}+\overrightarrow{\mathrm{CD}}$ に分けると、行列式が「$\ell$ の向き、つなぎ、$m$ の向き」の形になる。`,
            String.raw`$2+\sin t$ も $2+\cos t$ も正なので、絶対値はそのまま外せる。`,
          ],
          check: String.raw`$t$ を6通りとって行列式から直接体積を求めると、この式と小数9桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$t$ が $t\geqq0$ を動くとき、$V(t)$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{9+4\sqrt2}{3}$、最小値 $\dfrac{9-4\sqrt2}{3}$`,
          approach: String.raw`(2) の $V(t)=\dfrac23\left(2+\sin t\right)\left(2+\cos t\right)$ を展開し、$u=\sin t+\cos t$ でまとめる。$\sin t\cos t=\dfrac{u^{2}-1}{2}$ なので $u$ の2次関数になる。`,
          blocks: [
            { k: "p", t: String.raw`展開すると` },
            {
              k: "math",
              t: String.raw`\left(2+\sin t\right)\left(2+\cos t\right)=4+2\left(\sin t+\cos t\right)+\sin t\cos t`,
            },
            { k: "p", t: String.raw`である。$u=\sin t+\cos t$ とおくと $u^{2}=1+2\sin t\cos t$ より $\sin t\cos t=\dfrac{u^{2}-1}{2}$ なので` },
            {
              k: "math",
              t: String.raw`=4+2u+\frac{u^{2}-1}{2}=\frac{u^{2}+4u+7}{2}=\frac{\left(u+2\right)^{2}+3}{2}`,
            },
            { k: "p", t: String.raw`である。$u=\sqrt2\sin\left(t+\dfrac{\pi}{4}\right)$ なので、$t\geqq0$ のとき $u$ は` },
            {
              k: "math",
              t: String.raw`-\sqrt2\leqq u\leqq\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`のすべての値をとる。$\dfrac{\left(u+2\right)^{2}+3}{2}$ は $u\geqq-2$ で増加するので、$-\sqrt2\leqq u\leqq\sqrt2$ では単調増加である。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$u=\sqrt2$（$t=\dfrac\pi4+2k\pi$）のとき最大で $\dfrac{\left(\sqrt2+2\right)^{2}+3}{2}=\dfrac{9+4\sqrt2}{2}$`,
                String.raw`$u=-\sqrt2$（$t=\dfrac{5\pi}4+2k\pi$）のとき最小で $\dfrac{\left(2-\sqrt2\right)^{2}+3}{2}=\dfrac{9-4\sqrt2}{2}$`,
              ],
            },
            { k: "p", t: String.raw`である。$V=\dfrac23\times\left(\text{これ}\right)$ なので` },
            {
              k: "math",
              t: String.raw`V_{\max}=\frac23\cdot\frac{9+4\sqrt2}{2}=\frac{9+4\sqrt2}{3},\qquad V_{\min}=\frac23\cdot\frac{9-4\sqrt2}{2}=\frac{9-4\sqrt2}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。$t\geqq0$ では $t=\dfrac\pi4$ と $t=\dfrac{5\pi}4$ がどちらも範囲に入るので、どちらの値も実際にとる。`,
            },
            {
              k: "note",
              t: String.raw`$\dfrac{9+4\sqrt2}{3}=4.885\cdots$、$\dfrac{9-4\sqrt2}{3}=1.114\cdots$ である。$V(0)=4$ はそのあいだにある。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(2+\sin t\right)\left(2+\cos t\right)$ を $\sin t$ と $\cos t$ で別々に最大化してはいけない。同時に $1$ にはできない。`,
            String.raw`$u$ の2次関数の頂点 $u=-2$ は $\left[-\sqrt2,\sqrt2\right]$ の外にある。だから区間の端で最大最小になる。`,
          ],
          check: String.raw`$t$ を $0$ から $20$ まで細かく走査すると、最大 $4.885618083$（$t=0.78540$）、最小 $1.114381917$（$t=3.92700$）だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["終了条件のあるゲーム", "並びの数え上げ", "等比級数", "級数の和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "状態遷移で $40$ 回まで追って求めた $Q_{0},\\ldots,Q_{4}$ が、$p=0.5,0.3,0.8$ のいずれでも $\\left(1-p\\right)^{2}\\left\\{p\\left(2-p\\right)\\right\\}^{n}$ と小数9桁まで一致した",
          "$p=0.3$ では $\\sum nQ_{n}=1.040816$ で $\\tfrac{p(2-p)}{(1-p)^{2}}=1.040816$ と一致した（$p=0.8$ は $40$ 回打ち切りのため確率の合計が $0.745$ しかなく、級数も途中までしか足せていない）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0<p<1$ とする。表が出る確率が $p$、裏が出る確率が $1-p$ である1枚のコインを使い、点数 $0$ から始めて「表が出るごとに $1$ 点加算、裏が出たときは点数はそのまま、2回続けて裏が出たら終了」というゲームを行う。$0$ 以上の整数 $n$ に対し、ゲームが終わったときに $n$ 点となっている確率を $Q_{n}$ とするとき、$Q_{1},Q_{2}$ を $p$ を用いて表す`,
          answer: String.raw`$Q_{1}=p\left(1-p\right)^{2}\left(2-p\right)$、$Q_{2}=p^{2}\left(1-p\right)^{2}\left(2-p\right)^{2}$`,
          approach: String.raw`終わるまでの表裏の並びを直接数える。最後の2文字は必ず裏裏で、その前には裏が2つ続いてはいけない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$q=1-p$ とおく。ゲームが終わるときの表裏の並びは、最後が「裏裏」で、それより前には「裏裏」が現れないものである。さらに、最後の裏裏の直前の文字は表でなければならない（裏なら、そこで既に裏が2つ続いている）。`,
            },
            {
              k: "p",
              t: String.raw`**$n=1$。** 表が1枚だけ現れる。最後の裏裏より前の部分は「表」か「裏表」の2通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`表・裏・裏：確率 $pq^{2}$`,
                String.raw`裏・表・裏・裏：確率 $qpq^{2}=pq^{3}$`,
              ],
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`Q_{1}=pq^{2}+pq^{3}=pq^{2}\left(1+q\right)=p\left(1-p\right)^{2}\left(2-p\right)`,
            },
            { k: "p", t: String.raw`である（$1+q=2-p$）。` },
            {
              k: "p",
              t: String.raw`**$n=2$。** 表が2枚。表の前（2か所）にそれぞれ裏を $0$ 枚か $1$ 枚入れられる（2枚続けては入れられない）。最後の表のうしろには裏を入れられない（そこは最後の裏裏になる）。したがって裏の枚数 $k$ は $0,1,2$ で、入れ方は $ {}_{2}\mathrm{C}_{k}$ 通りである。`,
            },
            {
              k: "math",
              t: String.raw`Q_{2}=q^{2}\sum_{k=0}^{2}{}_{2}\mathrm{C}_{k}p^{2}q^{k}=q^{2}p^{2}\left(1+q\right)^{2}=p^{2}\left(1-p\right)^{2}\left(2-p\right)^{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`最後の裏裏の直前は必ず表（または並びの先頭）。ここを見落とすと重複して数えてしまう。`,
          ],
          check: String.raw`$p=0.5$ では $Q_{1}=0.1875$、$Q_{2}=0.140625$ で、状態遷移で求めた値と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$Q_{n}$ を $n$ と $p$ を用いて表す`,
          answer: String.raw`$Q_{n}=\left(1-p\right)^{2}\left\{p\left(2-p\right)\right\}^{n}$`,
          approach: String.raw`(1) と同じ数え方を一般の $n$ で行う。表 $n$ 枚の「前」に裏を $0$ 枚か $1$ 枚ずつ置く、という数え方で二項定理がそのまま効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`終了までの並びを「$w$ ＋ 裏裏」と書く。$w$ には裏が2つ続かず、$w$ の最後は表（または $w$ は空）である。$w$ に含まれる表の枚数が $n$ である。`,
            },
            {
              k: "p",
              t: String.raw`$n$ 枚の表を並べたとき、裏を入れられるのは「各表の直前」の $n$ か所だけで、それぞれ $0$ 枚か $1$ 枚である（2枚入れると裏が続く。最後の表のうしろに入れると $w$ が裏で終わってしまう）。裏を $k$ 枚入れる方法は $ {}_{n}\mathrm{C}_{k}$ 通りで、その確率は $p^{n}q^{k}$ である。`,
            },
            { k: "p", t: String.raw`最後の裏裏の確率 $q^{2}$ を掛けて、二項定理より` },
            {
              k: "math",
              t: String.raw`Q_{n}=q^{2}\sum_{k=0}^{n}{}_{n}\mathrm{C}_{k}p^{n}q^{k}=q^{2}p^{n}\left(1+q\right)^{n}=\left(1-p\right)^{2}\left\{p\left(2-p\right)\right\}^{n}`,
            },
            { k: "p", t: String.raw`である。$n=0$ のときも $Q_{0}=q^{2}=\left(1-p\right)^{2}$（いきなり裏裏）で合っている。` },
            {
              k: "note",
              t: String.raw`$r=p\left(2-p\right)=1-\left(1-p\right)^{2}$ とおくと $Q_{n}=\left(1-r\right)r^{n}$ である。つまり点数は、成功確率 $1-r$ の幾何分布にしたがう。$0<p<1$ のとき $0<r<1$ なので $\displaystyle\sum_{n=0}^{\infty}Q_{n}=1$ となり、確率の合計も合う。`,
            },
          ],
          pitfalls: [
            String.raw`裏を置ける場所は $n+1$ か所ではなく $n$ か所。最後の表のうしろは使えない。`,
          ],
          check: String.raw`$p=0.5,0.3,0.8$ のいずれでも、状態遷移で求めた $Q_{0},\ldots,Q_{4}$ とこの式が小数9桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$0<x<1$ を満たす実数 $x$ に対して $\dfrac{1}{\left(1-x\right)^{2}}=\displaystyle\sum_{n=0}^{\infty}\left(n+1\right)x^{n}$ が成り立つことを示す（必要ならば $0<x<1$ のとき $\displaystyle\lim_{n\to\infty}nx^{n}=0$ であることを証明なしで使ってよい）`,
          answer: String.raw`部分和に $\left(1-x\right)$ を掛けて階差をとると等比級数になる`,
          approach: String.raw`部分和 $S_{N}=\displaystyle\sum_{n=0}^{N}\left(n+1\right)x^{n}$ を作り、$S_{N}-xS_{N}$ を計算する。`,
          blocks: [
            { k: "p", t: String.raw`$S_{N}=\displaystyle\sum_{n=0}^{N}\left(n+1\right)x^{n}$ とおく。` },
            {
              k: "math",
              t: String.raw`\left(1-x\right)S_{N}=\sum_{n=0}^{N}\left(n+1\right)x^{n}-\sum_{n=0}^{N}\left(n+1\right)x^{n+1}`,
            },
            { k: "p", t: String.raw`で、2つめの和で添字を $n+1\to n$ とずらすと` },
            {
              k: "math",
              t: String.raw`=\sum_{n=0}^{N}\left(n+1\right)x^{n}-\sum_{n=1}^{N+1}nx^{n}=1+\sum_{n=1}^{N}x^{n}-\left(N+1\right)x^{N+1}`,
            },
            { k: "p", t: String.raw`である。はじめの2項をまとめると等比数列の和で` },
            {
              k: "math",
              t: String.raw`\left(1-x\right)S_{N}=\sum_{n=0}^{N}x^{n}-\left(N+1\right)x^{N+1}=\frac{1-x^{N+1}}{1-x}-\left(N+1\right)x^{N+1}`,
            },
            { k: "p", t: String.raw`となる。$0<x<1$ より $1-x\neq0$ なので` },
            {
              k: "math",
              t: String.raw`S_{N}=\frac{1-x^{N+1}}{\left(1-x\right)^{2}}-\frac{\left(N+1\right)x^{N+1}}{1-x}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<x<1$ より $x^{N+1}\to0$、また与えられた事実より $\left(N+1\right)x^{N+1}\to0$（$N\to\infty$）なので`,
            },
            {
              k: "math",
              t: String.raw`\lim_{N\to\infty}S_{N}=\frac{1}{\left(1-x\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。すなわち級数は収束して` },
            {
              k: "math",
              t: String.raw`\sum_{n=0}^{\infty}\left(n+1\right)x^{n}=\frac{1}{\left(1-x\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`無限級数は「部分和の極限」として扱う。いきなり項別に操作しない。`,
            String.raw`$\left(N+1\right)x^{N+1}\to0$ は与えられた事実（$\lim nx^{n}=0$）から従う。ここを使うことを明記する。`,
          ],
          check: String.raw`$x=0.5$ では右辺 $4$、部分和 $S_{40}=3.99999\cdots$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`無限級数 $\displaystyle\sum_{n=0}^{\infty}nQ_{n}$ を $p$ を用いて表す`,
          answer: String.raw`$\dfrac{p\left(2-p\right)}{\left(1-p\right)^{2}}$`,
          approach: String.raw`(2) で $Q_{n}=\left(1-r\right)r^{n}$（$r=p\left(2-p\right)$）と書けた。$\displaystyle\sum nr^{n}$ は、(3) の級数から等比級数を引けば出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$r=p\left(2-p\right)$ とおく。$0<p<1$ のとき $r=1-\left(1-p\right)^{2}$ で $0<r<1$ である。(2) より $Q_{n}=\left(1-r\right)r^{n}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{n=0}^{\infty}nQ_{n}=\left(1-r\right)\sum_{n=0}^{\infty}nr^{n}`,
            },
            { k: "p", t: String.raw`である。$n=\left(n+1\right)-1$ と分けると、(3) と等比級数の和から` },
            {
              k: "math",
              t: String.raw`\sum_{n=0}^{\infty}nr^{n}=\sum_{n=0}^{\infty}\left(n+1\right)r^{n}-\sum_{n=0}^{\infty}r^{n}=\frac{1}{\left(1-r\right)^{2}}-\frac{1}{1-r}=\frac{r}{\left(1-r\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\sum_{n=0}^{\infty}nQ_{n}=\left(1-r\right)\cdot\frac{r}{\left(1-r\right)^{2}}=\frac{r}{1-r}`,
            },
            { k: "p", t: String.raw`である。$1-r=\left(1-p\right)^{2}$ だから` },
            {
              k: "math",
              t: String.raw`\sum_{n=0}^{\infty}nQ_{n}=\frac{p\left(2-p\right)}{\left(1-p\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$p=\dfrac12$ なら $\dfrac{\frac12\cdot\frac32}{\frac14}=3$ で、平均 $3$ 点でゲームが終わる。$p\to1$ では発散する（表ばかり出てなかなか終わらない）。`,
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\sum nr^{n}$ をそのまま (3) に当てはめない。$n$ と $n+1$ のずれを等比級数で調整する。`,
          ],
          check: String.raw`$p=0.3$ では $1.040816$ で、$\dfrac{p\left(2-p\right)}{\left(1-p\right)^{2}}=1.040816$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列・三角関数",
      topics: ["フィボナッチ数列", "カッシーニの等式", "tan の加法定理", "望遠鏡和"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n+1}a_{n-1}-a_{n}^{2}$ は $n=2$ から $11$ まで $1,-1,1,-1,\\ldots$ と $\\left(-1\\right)^{n}$ に一致した",
          "$a_{2m}\\tan\\left(b_{2m+1}+b_{2m+2}\\right)$ は $m=1$ から $7$ までちょうど $1.0$ だった",
          "$\\displaystyle\\sum_{m=0}^{13}b_{2m+1}=1.570793180$ で、$\\tfrac\\pi2=1.570796327$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`数列 $\left\{a_{n}\right\}$ を $a_{1}=a_{2}=1$、$a_{n+2}=a_{n+1}+a_{n}$ で定め、数列 $\left\{b_{n}\right\}$ を $\tan b_{n}=\dfrac{1}{a_{n}}$（$0<b_{n}<\dfrac{\pi}{2}$）で定める。$n\geqq2$ に対して $a_{n+1}a_{n-1}-a_{n}^{2}$ を求める`,
          answer: String.raw`$a_{n+1}a_{n-1}-a_{n}^{2}=\left(-1\right)^{n}$`,
          approach: String.raw`$c_{n}=a_{n+1}a_{n-1}-a_{n}^{2}$ とおいて $c_{n+1}$ を $c_{n}$ で表すと、$c_{n+1}=-c_{n}$ という簡単な関係になる。`,
          blocks: [
            { k: "p", t: String.raw`$c_{n}=a_{n+1}a_{n-1}-a_{n}^{2}$（$n\geqq2$）とおく。漸化式 $a_{n+2}=a_{n+1}+a_{n}$ より` },
            {
              k: "math",
              t: String.raw`c_{n+1}=a_{n+2}a_{n}-a_{n+1}^{2}=\left(a_{n+1}+a_{n}\right)a_{n}-a_{n+1}^{2}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`c_{n+1}=a_{n+1}a_{n}+a_{n}^{2}-a_{n+1}^{2}=a_{n}^{2}-a_{n+1}\left(a_{n+1}-a_{n}\right)`,
            },
            { k: "p", t: String.raw`である。漸化式より $a_{n+1}-a_{n}=a_{n-1}$ なので` },
            {
              k: "math",
              t: String.raw`c_{n+1}=a_{n}^{2}-a_{n+1}a_{n-1}=-\left(a_{n+1}a_{n-1}-a_{n}^{2}\right)=-c_{n}`,
            },
            { k: "p", t: String.raw`である。初項は` },
            {
              k: "math",
              t: String.raw`c_{2}=a_{3}a_{1}-a_{2}^{2}=2\cdot1-1=1`,
            },
            { k: "p", t: String.raw`だから、$c_{n}=\left(-1\right)^{n-2}c_{2}=\left(-1\right)^{n}$ である。よって` },
            {
              k: "math",
              t: String.raw`a_{n+1}a_{n-1}-a_{n}^{2}=\left(-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$c_{n+1}=-c_{n}$ を導くときは、$a_{n+2}$ と $a_{n+1}$ のどちらを分解するか決めてから進める。`,
          ],
          check: String.raw`$n=2$ から $11$ まで直接計算すると $1,-1,1,-1,\ldots$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$m\geqq1$（$m$ は整数）に対して $a_{2m}\cdot\tan\left(b_{2m+1}+b_{2m+2}\right)$ を求める`,
          answer: String.raw`$a_{2m}\cdot\tan\left(b_{2m+1}+b_{2m+2}\right)=1$`,
          approach: String.raw`$\tan$ の加法定理で $\tan\left(b_{2m+1}+b_{2m+2}\right)$ を $a$ の式にし、(1) のカッシーニ型の等式で分母を書きかえる。`,
          blocks: [
            { k: "p", t: String.raw`$\tan b_{k}=\dfrac{1}{a_{k}}$ なので、加法定理より` },
            {
              k: "math",
              t: String.raw`\tan\left(b_{2m+1}+b_{2m+2}\right)=\frac{\frac{1}{a_{2m+1}}+\frac{1}{a_{2m+2}}}{1-\frac{1}{a_{2m+1}a_{2m+2}}}=\frac{a_{2m+1}+a_{2m+2}}{a_{2m+1}a_{2m+2}-1}`,
            },
            {
              k: "p",
              t: String.raw`である（分母・分子に $a_{2m+1}a_{2m+2}$ を掛けた）。分子は $a_{2m+3}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`a_{2m}\tan\left(b_{2m+1}+b_{2m+2}\right)=\frac{a_{2m}a_{2m+3}}{a_{2m+1}a_{2m+2}-1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**分子を整理する。** $a_{2m+3}=a_{2m+2}+a_{2m+1}$、$a_{2m}=a_{2m+2}-a_{2m+1}$ なので`,
            },
            {
              k: "math",
              t: String.raw`a_{2m}a_{2m+3}=\left(a_{2m+2}-a_{2m+1}\right)\left(a_{2m+2}+a_{2m+1}\right)=a_{2m+2}^{2}-a_{2m+1}^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**分母と比べる。** (1) を $n=2m+1$（奇数）で使うと $a_{2m+2}a_{2m}-a_{2m+1}^{2}=-1$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`a_{2m+1}^{2}=a_{2m+2}a_{2m}+1=a_{2m+2}\left(a_{2m+2}-a_{2m+1}\right)+1`,
            },
            { k: "p", t: String.raw`である。これを使うと` },
            {
              k: "math",
              t: String.raw`a_{2m+2}^{2}-a_{2m+1}^{2}=a_{2m+2}^{2}-a_{2m+2}^{2}+a_{2m+1}a_{2m+2}-1=a_{2m+1}a_{2m+2}-1`,
            },
            { k: "p", t: String.raw`となり、分子と分母が一致する。よって` },
            {
              k: "math",
              t: String.raw`a_{2m}\cdot\tan\left(b_{2m+1}+b_{2m+2}\right)=1`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`(1) を使う $n$ の偶奇に注意する。ここでは $n=2m+1$（奇数）なので右辺は $-1$ である。`,
            String.raw`加法定理の分母 $1-\tan\tan$ が $0$ でないことは、$a_{2m+1}a_{2m+2}\geqq2\cdot3=6>1$（$m\geqq1$）から分かる。`,
          ],
          check: String.raw`$m=1$ から $7$ まで数値計算すると、どれもちょうど $1.0$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`無限級数 $\displaystyle\sum_{m=0}^{\infty}b_{2m+1}$ を求める`,
          answer: String.raw`$\dfrac{\pi}{2}$`,
          approach: String.raw`(2) は $\tan\left(b_{2m+1}+b_{2m+2}\right)=\dfrac{1}{a_{2m}}=\tan b_{2m}$ ということ。角の範囲を確かめれば $b_{2m+1}=b_{2m}-b_{2m+2}$ となり、和が望遠鏡式にたたまれる。`,
          blocks: [
            { k: "p", t: String.raw`(2) より $m\geqq1$ のとき` },
            {
              k: "math",
              t: String.raw`\tan\left(b_{2m+1}+b_{2m+2}\right)=\frac{1}{a_{2m}}=\tan b_{2m}`,
            },
            {
              k: "p",
              t: String.raw`である。$m\geqq1$ では $a_{2m+1}\geqq2$、$a_{2m+2}\geqq3$ なので $0<b_{2m+1}\leqq\arctan\dfrac12$、$0<b_{2m+2}\leqq\arctan\dfrac13$ であり`,
            },
            {
              k: "math",
              t: String.raw`0<b_{2m+1}+b_{2m+2}\leqq\arctan\frac12+\arctan\frac13=\frac{\pi}{4}<\frac{\pi}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$b_{2m}$ も $\left(0,\dfrac\pi2\right)$ にあり、$\tan$ はこの区間で1対1だから`,
            },
            {
              k: "math",
              t: String.raw`b_{2m+1}+b_{2m+2}=b_{2m},\qquad\text{すなわち}\qquad b_{2m+1}=b_{2m}-b_{2m+2}`,
            },
            { k: "p", t: String.raw`である（$m\geqq1$）。したがって部分和は望遠鏡式にたたまれて` },
            {
              k: "math",
              t: String.raw`\sum_{m=1}^{M}b_{2m+1}=\sum_{m=1}^{M}\left(b_{2m}-b_{2m+2}\right)=b_{2}-b_{2M+2}`,
            },
            {
              k: "p",
              t: String.raw`である。$a_{2}=1$ より $\tan b_{2}=1$、$0<b_{2}<\dfrac\pi2$ なので $b_{2}=\dfrac\pi4$ である。また $a_{2M+2}\to\infty$ より $\tan b_{2M+2}\to0$、よって $b_{2M+2}\to0$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\sum_{m=1}^{\infty}b_{2m+1}=\frac{\pi}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。最後に $m=0$ の項を足す。$a_{1}=1$ より $b_{1}=\dfrac{\pi}{4}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{m=0}^{\infty}b_{2m+1}=\frac{\pi}{4}+\frac{\pi}{4}=\frac{\pi}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`具体的には $\dfrac\pi4+\arctan\dfrac12+\arctan\dfrac15+\arctan\dfrac1{13}+\cdots=\dfrac\pi2$ ということである。分母に現れるのは奇数番目のフィボナッチ数 $1,2,5,13,34,\ldots$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\tan X=\tan Y$ から $X=Y$ と言うには、$X,Y$ がともに $\tan$ が1対1である区間に入っていることが要る。ここを確かめる。`,
            String.raw`$m=0$ の項 $b_{1}$ は (2) の関係に乗らない（$a_{0}$ が定義されていない）。別に足す。`,
          ],
          check: String.raw`$m=0$ から $13$ まで足すと $1.570793180$ で、$\dfrac\pi2=1.570796327$ に近づいた。`,
        },
      ],
    },
    {
      no: 5,
      field: "微分法",
      topics: ["分数関数の増減", "グラフの概形", "方程式の解の個数", "条件の読みかえ"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$f\\left(\\sqrt3\\right)=0.384900179=\\tfrac{2\\sqrt3}9$、$f\\left(-\\sqrt3\\right)=-0.384900179$ だった",
          "$f\\left(-\\tfrac{\\sqrt3}2\\right)=0.384900179$ で、$t=\\sqrt3$ での極大値とちょうど同じだった",
          "$k$ を $-0.6$ から $0.6$ まで動かして $f(t)=k$ の解を数え、3個以上になるときの最小解 $x$ を集めると、$x<-\\sqrt3$ 側は $\\left[-55.54,-1.804\\right]$、もう一方は $\\left[-0.9912,-0.8663\\right]$ で、$-\\sqrt3=-1.7321$、$-\\tfrac{\\sqrt3}2=-0.8660$ と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`関数 $f(t)=\dfrac{t^{2}-1}{t^{3}}$（$t\neq0$）の増減を調べ、グラフの概形をかく`,
          answer: String.raw`$f'(t)=\dfrac{3-t^{2}}{t^{4}}$。$t=-\sqrt3$ で極小値 $-\dfrac{2\sqrt3}{9}$、$t=\sqrt3$ で極大値 $\dfrac{2\sqrt3}{9}$`,
          approach: String.raw`$f(t)=\dfrac1t-\dfrac1{t^{3}}$ と分けてから微分すると楽である。分母 $t^{4}$ はつねに正なので、符号は分子だけで決まる。`,
          blocks: [
            { k: "p", t: String.raw`$f(t)=\dfrac{1}{t}-\dfrac{1}{t^{3}}=t^{-1}-t^{-3}$ なので` },
            {
              k: "math",
              t: String.raw`f'(t)=-t^{-2}+3t^{-4}=\frac{-t^{2}+3}{t^{4}}=\frac{3-t^{2}}{t^{4}}`,
            },
            {
              k: "p",
              t: String.raw`である。$t^{4}>0$ なので、$f'$ の符号は $3-t^{2}$ の符号と同じである。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t<-\sqrt3$：$f'<0$ で減少`,
                String.raw`$-\sqrt3<t<0$：$f'>0$ で増加`,
                String.raw`$0<t<\sqrt3$：$f'>0$ で増加`,
                String.raw`$t>\sqrt3$：$f'<0$ で減少`,
              ],
            },
            { k: "p", t: String.raw`である。極値は` },
            {
              k: "math",
              t: String.raw`f\left(\pm\sqrt3\right)=\frac{3-1}{\pm3\sqrt3}=\pm\frac{2}{3\sqrt3}=\pm\frac{2\sqrt3}{9}`,
            },
            {
              k: "p",
              t: String.raw`で、$t=-\sqrt3$ で極小値 $-\dfrac{2\sqrt3}{9}$、$t=\sqrt3$ で極大値 $\dfrac{2\sqrt3}{9}$ をとる。`,
            },
            { k: "p", t: String.raw`そのほかの様子は` },
            {
              k: "steps",
              items: [
                String.raw`$f(-t)=-f(t)$ なので原点について対称（奇関数）`,
                String.raw`$f(t)=0$ となるのは $t=\pm1$`,
                String.raw`$t\to+0$ のとき $f\to-\infty$、$t\to-0$ のとき $f\to+\infty$（$y$ 軸が漸近線）`,
                String.raw`$t\to\pm\infty$ のとき $f\to0$（$x$ 軸が漸近線）`,
              ],
            },
            { k: "p", t: String.raw`である。グラフの概形は次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(t) のグラフ。原点について対称で、y 軸と x 軸が漸近線。t = -√3 で極小値 -2√3/9 ≒ -0.385、t = √3 で極大値 2√3/9 ≒ 0.385。t = ±1 で 0 になる。",
                view: [-4, 4, -0.65, 0.65],
                step: { x: 1, y: 0.25 },
                items: [
                  { k: "curve", f: F5K, from: -4, to: -0.81 },
                  { k: "curve", f: F5K, from: 0.81, to: 4 },
                  { k: "dot", at: [-Math.sqrt(3), -MX5K], label: "極小", place: "below" },
                  { k: "dot", at: [Math.sqrt(3), MX5K], label: "極大", place: "above" },
                  { k: "dot", at: [-1, 0], label: "-1", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "1", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t=0$ は定義域に入らない。増減表は $t<0$ と $t>0$ を分けて書く。`,
            String.raw`$-\sqrt3<t<0$ と $0<t<\sqrt3$ はどちらも増加だが、$t=0$ をまたいで「増加」とは言えない。`,
          ],
          check: String.raw`$f\left(\sqrt3\right)=0.384900179$、$\dfrac{2\sqrt3}{9}=0.384900179$ で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`実数 $x,y,z$ が、$x<y<z$、$xyz\neq0$、$x^{3}y^{2}-x^{3}=x^{2}y^{3}-y^{3}$、$y^{3}z^{2}-y^{3}=y^{2}z^{3}-z^{3}$ を満たしながら動くとき、$x$ が取り得る値の範囲を求める`,
          answer: String.raw`$x<-\sqrt3$ または $-1<x<-\dfrac{\sqrt3}{2}$`,
          approach: String.raw`2本の等式はどちらも $f(x)=f(y)$、$f(y)=f(z)$ と書きかえられる。つまり「$f$ の値が等しい3点が $x<y<z$ の順に並ぶ」という問題になり、(1) のグラフを横線で切る話に変わる。`,
          blocks: [
            { k: "p", t: String.raw`**条件を書きかえる。** 1本目の等式は` },
            {
              k: "math",
              t: String.raw`x^{3}\left(y^{2}-1\right)=y^{3}\left(x^{2}-1\right)`,
            },
            { k: "p", t: String.raw`である。$xyz\neq0$ なので $x^{3}y^{3}\neq0$ で、両辺を $x^{3}y^{3}$ で割ると` },
            {
              k: "math",
              t: String.raw`\frac{y^{2}-1}{y^{3}}=\frac{x^{2}-1}{x^{3}},\qquad\text{すなわち}\qquad f(y)=f(x)`,
            },
            { k: "p", t: String.raw`である。2本目も同様に $f(z)=f(y)$ となる。よって条件は` },
            {
              k: "math",
              t: String.raw`f(x)=f(y)=f(z)\quad\text{かつ}\quad x<y<z`,
            },
            {
              k: "p",
              t: String.raw`である。つまり、ある値 $k$ について方程式 $f(t)=k$ が相異なる3つ以上の解をもち、$x$ はそのうち最小のもの、ということである。`,
            },
            { k: "p", t: String.raw`**解の個数を調べる。** $A=\dfrac{2\sqrt3}{9}$ とおく。(1) のグラフを $y=k$ で切ると` },
            {
              k: "steps",
              items: [
                String.raw`$k>A$ または $k<-A$：解は1個`,
                String.raw`$k=\pm A$：解は2個`,
                String.raw`$0<k<A$：解は3個（$-1<t<0$ に1つ、$1<t<\sqrt3$ に1つ、$t>\sqrt3$ に1つ）`,
                String.raw`$k=0$：解は2個（$t=\pm1$）`,
                String.raw`$-A<k<0$：解は3個（$t<-\sqrt3$ に1つ、$-\sqrt3<t<-1$ に1つ、$0<t<1$ に1つ）`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。したがって条件を満たす $k$ は $-A<k<0$ または $0<k<A$ であり、このとき解はちょうど3個なので $x,y,z$ はその3個に決まる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "k = 0.25（0 < k < 2√3/9 ≒ 0.385）のときの横線。交点は3つで、いちばん左のものが x にあたる。k を 0 から 2√3/9 まで動かすと、この左端の交点は -1 から -√3/2 まで動く。k が負のときは左端の交点が t < -√3 の側に移る。",
                view: [-4, 4, -0.65, 0.65],
                step: { x: 1, y: 0.25 },
                items: [
                  { k: "curve", f: F5K, from: -4, to: -0.81 },
                  { k: "curve", f: F5K, from: 0.81, to: 4 },
                  { k: "seg", a: [-4, K5], b: [4, K5], dash: true },
                  { k: "seg", a: [-4, -K5], b: [4, -K5], dash: true, faint: true },
                  { k: "dot", at: [-Math.sqrt(3), -MX5K] },
                  { k: "dot", at: [Math.sqrt(3), MX5K] },
                  { k: "text", at: [-3.6, K5], label: "y = k", place: "above-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**$x$ の範囲。** $0<k<A$ のときは、最小の解は $-1<t<0$ の部分にある。この部分で $f$ は増加し、$f(-1)=0$ である。$f(t)=A$ となる $t$ をこの範囲で探すと`,
            },
            {
              k: "math",
              t: String.raw`f\left(-\frac{\sqrt3}{2}\right)=\frac{\frac34-1}{-\frac{3\sqrt3}{8}}=\frac{-\frac14\cdot8}{-3\sqrt3}=\frac{2}{3\sqrt3}=\frac{2\sqrt3}{9}=A`,
            },
            {
              k: "p",
              t: String.raw`なので、$t=-\dfrac{\sqrt3}{2}$ である。$f$ は $-1<t<0$ で増加するから、$k$ が $0$ から $A$ まで動くとき最小の解は $-1$ から $-\dfrac{\sqrt3}{2}$ まで動く。両端は $k=0$、$k=A$ にあたり条件を満たさないので`,
            },
            { k: "math", t: String.raw`-1<x<-\frac{\sqrt3}{2}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$-A<k<0$ のときは、最小の解は $t<-\sqrt3$ の部分にある。この部分で $f$ は減少し、$t\to-\infty$ で $f\to0$、$t=-\sqrt3$ で $f=-A$ である。$k$ が $-A$ から $0$ まで動くとき、最小の解は $-\sqrt3$ から $-\infty$ まで動く。端は条件を満たさないので`,
            },
            { k: "math", t: String.raw`x<-\sqrt3` },
            { k: "p", t: String.raw`である。以上より求める範囲は` },
            {
              k: "math",
              t: String.raw`x<-\sqrt3\quad\text{または}\quad-1<x<-\frac{\sqrt3}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$f\left(-\dfrac{\sqrt3}{2}\right)=f\left(\sqrt3\right)$ になっているのが鍵である。$9\left(t^{2}-1\right)=2\sqrt3\,t^{3}$ を整理した $2\sqrt3\,t^{3}-9t^{2}+9=0$ は $t=\sqrt3$ を解にもち、$\left(t-\sqrt3\right)$ でくくると $t=-\dfrac{\sqrt3}{2}$（重解 $t=\sqrt3$ とあわせて）が出る。`,
            },
          ],
          pitfalls: [
            String.raw`$x^{3}y^{3}$ で割ってよいのは $xyz\neq0$ があるから。この条件を使うことを書く。`,
            String.raw`$k=0$ のときは解が $t=\pm1$ の2個しかない。$0$ をまたいで一続きの範囲にしない。`,
            String.raw`$k=\pm A$ のときは極値をとる点で2つの解が重なり、相異なる解は2個になる。端点を含めない。`,
          ],
          check: String.raw`$k$ を細かく動かして $f(t)=k$ の最小解を集めると、$\left[-55.54,-1.804\right]$ と $\left[-0.9912,-0.8663\right]$ の2つの範囲に分かれ、$-\sqrt3=-1.7321$、$-\dfrac{\sqrt3}{2}=-0.8660$ と合った。`,
        },
      ],
    },
  ],
};
