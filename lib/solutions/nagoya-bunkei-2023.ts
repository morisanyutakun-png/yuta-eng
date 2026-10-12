import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2023年度（令和5年度）一般選抜 前期日程 数学（文科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 3問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。第2問の図は、問題の立方体の絵ではなく、
 * 解くために自分で取り出した断面（長方形 ADGF）を描いたものである。
 * 名古屋大学はこの年度の問題を公開していないので、リンクも張らない。
 */

/** 第1問(3) の2つのグラフ（$a=2$）。 */
const F23 = (x: number): number => x ** 3 - 4 * x * x + 5;
const G23 = (x: number): number => -x * x + 1;

/** 第2問の断面図。$p=\tfrac12$ の例。A を原点、AD を右、AF を下にとる。 */
const P23 = 0.5;
const S2 = Math.sqrt(2);
const X23: [number, number] = [P23 / (1 + P23), (-S2 * P23) / (1 + P23)];

export const nagoyaBunkei2023: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["因数分解", "共有点の個数", "3次関数の極値", "グラフの図示"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=-3,-1,0,2,5$ と $x$ を4通りとって $f(x)-g(x)=(x+1)(x-2)(x-a)$ を確かめ、相異なる解の個数が $a=-1,2$ のときだけ2になった",
          "$a=-1$ では極大値 $0.268354$（$1$ 以下）、$a=2$ では極大値 $f(0)=5$、極小値 $f\\left(\\tfrac83\\right)=-4.481481=-\\tfrac{121}{27}$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数、$f(x)=x^{3}-\left(a+2\right)x^{2}+\left(a-2\right)x+2a+1$、$g(x)=-x^{2}+1$ とするとき、$f(x)-g(x)$ を因数分解する`,
          answer: String.raw`$f(x)-g(x)=\left(x+1\right)\left(x-2\right)\left(x-a\right)$`,
          approach: String.raw`$a$ が文字のまま入っているので、$a$ を含まない因数を探す。$x=-1$ を入れると $a$ の項が打ち消し合って $0$ になるので、$x+1$ が因数である。あとは割って2次式を因数分解する。`,
          blocks: [
            { k: "p", t: String.raw`まず差を整理すると` },
            {
              k: "math",
              t: String.raw`f(x)-g(x)=x^{3}-\left(a+2\right)x^{2}+\left(a-2\right)x+2a+1+x^{2}-1=x^{3}-\left(a+1\right)x^{2}+\left(a-2\right)x+2a`,
            },
            { k: "p", t: String.raw`である。これを $h(x)$ とおく。$x=-1$ を代入すると` },
            {
              k: "math",
              t: String.raw`h(-1)=-1-\left(a+1\right)-\left(a-2\right)+2a=-1-a-1-a+2+2a=0`,
            },
            { k: "p", t: String.raw`なので、$h(x)$ は $x+1$ で割り切れる。実際に割ると` },
            {
              k: "math",
              t: String.raw`h(x)=\left(x+1\right)\left(x^{2}-\left(a+2\right)x+2a\right)`,
            },
            { k: "p", t: String.raw`である。2次因子は、和が $a+2$、積が $2a$ になる2数が $2$ と $a$ なので` },
            { k: "math", t: String.raw`x^{2}-\left(a+2\right)x+2a=\left(x-2\right)\left(x-a\right)` },
            { k: "p", t: String.raw`と分解できる。よって` },
            {
              k: "math",
              t: String.raw`f(x)-g(x)=\left(x+1\right)\left(x-2\right)\left(x-a\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a$ について整理して $x^{3}-x^{2}-2x-a\left(x^{2}-x-2\right)=\left(x^{2}-x-2\right)\left(x-a\right)$ と見てもよい。$x^{2}-x-2=\left(x+1\right)\left(x-2\right)$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$a$ が入ったままの3次式でも、$a$ の係数でくくると共通因数が見える。$a$ について整理するのが定石である。`,
          ],
          check: String.raw`$a=5,\ x=3.7$ で両辺を計算すると一致した。$a$ を5通り、$x$ を4通り試しても一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$y=f(x)$ と $y=g(x)$ のグラフの共有点が2個となるような $a$ を求める`,
          answer: String.raw`$a=-1$ または $a=2$`,
          approach: String.raw`共有点の $x$ 座標は $f(x)-g(x)=0$ の解。(1) の因数分解から解は $-1,\ 2,\ a$ の3つで、共有点が2個になるのは、このうち2つが一致するときである。`,
          blocks: [
            { k: "p", t: String.raw`共有点の $x$ 座標は $f(x)-g(x)=0$、すなわち` },
            { k: "math", t: String.raw`\left(x+1\right)\left(x-2\right)\left(x-a\right)=0` },
            {
              k: "p",
              t: String.raw`の解である。解は $x=-1,\ 2,\ a$ で、$x$ が決まれば共有点は1つに決まるから、共有点の個数は**相異なる解の個数**である。`,
            },
            { k: "p", t: String.raw`$-1\neq2$ なので、相異なる解が2個になるのは $a$ が $-1$ か $2$ に一致するとき、つまり` },
            { k: "math", t: String.raw`a=-1\quad\text{または}\quad a=2` },
            {
              k: "p",
              t: String.raw`のときである（それ以外の $a$ では3個）。`,
            },
          ],
          pitfalls: [
            String.raw`「共有点が2個」は「方程式の解が2個」ではなく「**相異なる**解が2個」。重解を1個と数える。`,
          ],
          check: String.raw`$a=-3,0,5$ では解が3個、$a=-1,2$ では2個になった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a$ が (2) の条件を満たし、さらに $f(x)$ の極大値が $1$ より大きいとき、$y=f(x)$ と $y=g(x)$ のグラフを同じ座標平面に図示する`,
          answer: String.raw`$a=2$。$y=f(x)=x^{3}-4x^{2}+5$ は $(0,5)$ で極大、$\left(\tfrac83,-\tfrac{121}{27}\right)$ で極小。$y=g(x)=-x^{2}+1$ とは $x=-1$ で交わり、$x=2$ で接する`,
          approach: String.raw`(2) の2つの候補について、それぞれ $f'$ を計算して極大値を求め、$1$ より大きいほうを選ぶ。$a=2$ なら $f'$ が因数分解できて極値が暗算で出る。`,
          blocks: [
            { k: "p", t: String.raw`**$a=-1$ の場合。** $f(x)=x^{3}-x^{2}-3x-1$ で` },
            { k: "math", t: String.raw`f'(x)=3x^{2}-2x-3` },
            {
              k: "p",
              t: String.raw`である。$f'(x)=0$ の解は $x=\dfrac{1\pm\sqrt{10}}{3}$ で、極大を与えるのは小さいほう $x=\dfrac{1-\sqrt{10}}{3}=-0.7208\cdots$ である。このとき`,
            },
            { k: "math", t: String.raw`f\left(\frac{1-\sqrt{10}}{3}\right)=0.2683\cdots<1` },
            {
              k: "p",
              t: String.raw`なので条件を満たさない。（$f(-1)=-1-1+3-1=0$ と $f(0)=-1$ から、極大値が $0$ と $1$ のあいだの小さな値になることは、値を出さなくても $f(-1)=0$、$f(0)=-1$ と増減表から見当がつく。）`,
            },
            { k: "p", t: String.raw`**$a=2$ の場合。** $f(x)=x^{3}-4x^{2}+0\cdot x+5=x^{3}-4x^{2}+5$ で` },
            { k: "math", t: String.raw`f'(x)=3x^{2}-8x=x\left(3x-8\right)` },
            { k: "p", t: String.raw`である。$f'(x)=0$ の解は $x=0,\ \dfrac83$ で、$x<0$ で $f'>0$、$0<x<\dfrac83$ で $f'<0$、$x>\dfrac83$ で $f'>0$ だから` },
            {
              k: "steps",
              items: [
                String.raw`$x=0$ で極大、極大値 $f(0)=5$`,
                String.raw`$x=\dfrac83$ で極小、極小値 $f\left(\dfrac83\right)=\dfrac{512}{27}-\dfrac{256}{9}+5=-\dfrac{121}{27}$`,
              ],
            },
            { k: "p", t: String.raw`である。極大値 $5>1$ なので条件を満たす。よって` },
            { k: "math", t: String.raw`a=2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**2つのグラフの位置関係。** このとき (1) より`,
            },
            {
              k: "math",
              t: String.raw`f(x)-g(x)=\left(x+1\right)\left(x-2\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left(x-2\right)^{2}\geqq0$ なので、$x<-1$ では $f<g$、$x>-1$ では $f\geqq g$（等号は $x=2$）。つまり $x=-1$ で交わって上下が入れ替わり、$x=2$ では**接する**（重解なので交わらずに触れる）。交点は`,
            },
            {
              k: "math",
              t: String.raw`\left(-1,\ 0\right),\qquad\left(2,\ -3\right)`,
            },
            { k: "p", t: String.raw`である。$y=g(x)=-x^{2}+1$ は上に凸で頂点 $(0,1)$ の放物線である。以上をまとめると次の図になる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 2 のときの y = f(x) = x³ - 4x² + 5（3次曲線）と y = g(x) = -x² + 1（上に凸の放物線）。x = -1 で交わり、x = 2 で接する。f は (0, 5) で極大、(8/3, -121/27) で極小。",
                view: [-2.8, 5.6, -6.2, 6.2],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: F23, from: -1.43, to: 4.06 },
                  { k: "curve", f: G23, from: -2.68, to: 2.68 },
                  { k: "dot", at: [0, 5], label: "極大 (0, 5)", place: "above-right" },
                  { k: "dot", at: [8 / 3, -121 / 27], label: "極小 (8/3, -121/27)", place: "below-right" },
                  { k: "dot", at: [-1, 0], label: "(-1, 0)", place: "above-left" },
                  { k: "dot", at: [2, -3], label: "(2, -3) で接する", place: "right" },
                  { k: "text", at: [3.9, 3.46], label: "y = f(x)", place: "right" },
                  { k: "text", at: [2.6, -5.76], label: "y = g(x)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$a=-1$ を「極大値が $1$ 以下だから」ときちんと外す。2つの候補のうち片方を選ぶのがこの小問の主眼である。`,
            String.raw`$x=2$ は重解なので接する。図でここを「交差」に描かない。`,
            String.raw`$f$ の極小値 $-\dfrac{121}{27}$ は $g$ の値 $-\left(\tfrac83\right)^{2}+1=-\dfrac{55}{9}=-\dfrac{165}{27}$ より上にある。極小点が放物線より上にくることも図に反映させる。`,
          ],
          check: String.raw`$f(-1)=-1-4+5=0=g(-1)$、$f(2)=8-16+5=-3=g(2)$ で、交点の座標が合う。$f'(2)=12-16=-4$、$g'(2)=-4$ で接線の傾きも一致し、確かに接している。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間図形",
      topics: ["断面への帰着", "相似比", "四面体の体積", "相加平均と相乗平均"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "立方体に座標を入れ、$p=0,\\ 0.2,\\ 0.5,\\ \\sqrt2-1,\\ 0.9,\\ 1$ について $\\mathrm{X}$ が線分 $\\mathrm{AG}$ 上にも線分 $\\mathrm{FP}$ 上にもあることを確かめた",
          "同じ $p$ で $\\mathrm{AX}=\\dfrac{\\sqrt3\\,p}{1+p}$、$\\triangle\\mathrm{APX}=\\dfrac{\\sqrt2\\,p^{2}}{2(1+p)}$、$V=\\dfrac{p^{2}+1}{6(1+p)}$ が小数9桁まで一致した（体積は行列式で計算）",
          "$p$ を $10^{-5}$ 刻みで動かすと $V$ の最小は $p=0.41421$ での $0.138071187$ で、$\\dfrac{\\sqrt2-1}{3}=0.138071187$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`1辺 $1$ の立方体 $\mathrm{ABCD}$–$\mathrm{EFGH}$ の辺 $\mathrm{AD}$ 上に $\mathrm{AP}=p$ となる点 $\mathrm{P}$ をとると、線分 $\mathrm{AG}$ と線分 $\mathrm{FP}$ は四角形 $\mathrm{ADGF}$ 上で交わる。その交点を $\mathrm{X}$ として $\mathrm{AX}$ を $p$ で表す`,
          answer: String.raw`$\mathrm{AX}=\dfrac{\sqrt{3}\,p}{1+p}$`,
          approach: String.raw`$\mathrm{A},\mathrm{D},\mathrm{G},\mathrm{F}$ は同一平面上にあり、$\mathrm{AD}\parallel\mathrm{FG}$、$\mathrm{AD}=1$、$\mathrm{FG}=1$、$\mathrm{AF}=\mathrm{DG}=\sqrt2$ なので、四角形 $\mathrm{ADGF}$ は長方形である。$\mathrm{AG}$ も $\mathrm{FP}$ もこの長方形の中にあるので、**空間の問題を平面の問題に落として**相似で片づく。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "解くために取り出した断面。四角形 ADGF は AD = FG = 1、AF = DG = √2 の長方形で、AG と FP はその中で交わる。図は p = 1/2 のとき。網かけは (2) の三角形 APX。",
                view: [-0.65, 1.75, -1.72, 0.35],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: [[0, 0], [P23, 0], X23] },
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, -S2] },
                  { k: "seg", a: [1, -S2], b: [0, -S2] },
                  { k: "seg", a: [0, -S2], b: [0, 0] },
                  { k: "seg", a: [0, 0], b: [1, -S2] },
                  { k: "seg", a: [0, -S2], b: [P23, 0] },
                  { k: "dot", at: [0, 0], label: "A", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "D", place: "above-right" },
                  { k: "dot", at: [1, -S2], label: "G", place: "below-right" },
                  { k: "dot", at: [0, -S2], label: "F", place: "below-left" },
                  { k: "dot", at: [P23, 0], label: "P", place: "above" },
                  { k: "dot", at: X23, label: "X", place: "right" },
                  { k: "text", at: [0.5, -S2], label: "1", place: "below" },
                  { k: "text", at: [0, -S2 / 2], label: "√2", place: "left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**長方形に直す。** $\mathrm{AD}$ と $\mathrm{FG}$ はどちらも立方体の辺で、平行で長さが $1$ である。よって $\mathrm{ADGF}$ は平行四辺形、とくに $\mathrm{AF}$ は正方形 $\mathrm{ABFE}$ の対角線で $\mathrm{AF}=\sqrt2$、$\mathrm{AD}\perp\mathrm{AF}$（$\mathrm{AD}$ は面 $\mathrm{ABFE}$ に垂直）だから、$\mathrm{ADGF}$ は`,
            },
            { k: "math", t: String.raw`\mathrm{AD}=\mathrm{FG}=1,\qquad\mathrm{AF}=\mathrm{DG}=\sqrt{2}` },
            { k: "p", t: String.raw`の長方形である。$\mathrm{P}$ は $\mathrm{AD}$ 上、$\mathrm{G}$ は長方形の頂点なので、$\mathrm{AG}$ も $\mathrm{FP}$ もこの長方形の中にある。` },
            {
              k: "p",
              t: String.raw`**相似。** $\mathrm{AP}\parallel\mathrm{FG}$ で、$\mathrm{X}$ は $\mathrm{AG}$ と $\mathrm{FP}$ の交点だから、$\triangle\mathrm{XAP}$ と $\triangle\mathrm{XGF}$ は相似である（錯角が等しい）。相似比は`,
            },
            { k: "math", t: String.raw`\mathrm{AP}:\mathrm{GF}=p:1` },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{AX}:\mathrm{XG}=p:1,\qquad\mathrm{AX}=\frac{p}{p+1}\,\mathrm{AG}` },
            { k: "p", t: String.raw`である。$\mathrm{AG}$ は1辺 $1$ の立方体の対角線なので $\mathrm{AG}=\sqrt{3}$ である。よって` },
            { k: "math", t: String.raw`\mathrm{AX}=\frac{\sqrt{3}\,p}{1+p}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$p=0$ のとき $\mathrm{X}=\mathrm{A}$、$p=1$ のとき（$\mathrm{P}=\mathrm{D}$）$\mathrm{AX}=\dfrac{\sqrt3}{2}$ で $\mathrm{X}$ は $\mathrm{AG}$ の中点。長方形の対角線どうしの交点になるので、確かに中点である。`,
            },
          ],
          pitfalls: [
            String.raw`立方体のまま考えずに、$\mathrm{A},\mathrm{D},\mathrm{G},\mathrm{F}$ が同一平面にあることを使って平面図形に落とす。ここがこの大問の設計である。`,
            String.raw`$\mathrm{AG}=\sqrt3$（空間対角線）、$\mathrm{AF}=\sqrt2$（面の対角線）を取り違えない。`,
          ],
          check: String.raw`$p=0.5$ で座標計算すると $\mathrm{AX}=0.577350269$、$\dfrac{\sqrt3\cdot0.5}{1.5}=\dfrac{1}{\sqrt3}=0.577350269$ で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`三角形 $\mathrm{APX}$ の面積を $p$ で表す`,
          answer: String.raw`$\dfrac{\sqrt{2}\,p^{2}}{2\left(1+p\right)}$`,
          approach: String.raw`底辺を $\mathrm{AP}=p$ とすると、高さは $\mathrm{X}$ から直線 $\mathrm{AD}$ までの距離である。長方形の中で $\mathrm{X}$ は $\mathrm{AG}$ を $p:1$ に内分するので、高さは $\mathrm{DG}=\sqrt2$ の $\dfrac{p}{1+p}$ 倍になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`長方形 $\mathrm{ADGF}$ の中で考える。$\mathrm{X}$ は $\mathrm{AG}$ を $p:1$ に内分する点なので、$\mathrm{X}$ から辺 $\mathrm{AD}$ に下ろした距離は、$\mathrm{G}$ から $\mathrm{AD}$ までの距離 $\mathrm{DG}=\sqrt{2}$ の $\dfrac{p}{1+p}$ 倍である。つまり高さは`,
            },
            { k: "math", t: String.raw`h=\frac{\sqrt{2}\,p}{1+p}` },
            { k: "p", t: String.raw`である。底辺は $\mathrm{AP}=p$ なので` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{APX}=\frac{1}{2}\cdot p\cdot\frac{\sqrt{2}\,p}{1+p}=\frac{\sqrt{2}\,p^{2}}{2\left(1+p\right)}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`高さは $\mathrm{AX}$ ではない。$\mathrm{AD}$ を底辺に見たときの $\mathrm{X}$ の「高さ」で、長方形の縦の長さ $\sqrt2$ の $\tfrac{p}{1+p}$ 倍である。`,
          ],
          check: String.raw`$p=0.9$ で座標から外積で面積を出すと $0.301450786$、式の値も $0.301450786$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`四面体 $\mathrm{ABPX}$ と四面体 $\mathrm{EFGX}$ の体積の和を $V$ とするとき、$V$ を $p$ で表す`,
          answer: String.raw`$V=\dfrac{p^{2}+1}{6\left(1+p\right)}$`,
          approach: String.raw`2つの四面体それぞれで「底面 $\times$ 高さ」の組を選びやすい向きを探す。$\mathrm{ABPX}$ は $\triangle\mathrm{APX}$ を底面にすると高さが $\mathrm{AB}$ に一致し、$\mathrm{EFGX}$ は $\triangle\mathrm{EFG}$ を底面にすると高さが $\mathrm{X}$ の「高さ」になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**四面体 $\mathrm{ABPX}$。** $\mathrm{A},\mathrm{P},\mathrm{X}$ はいずれも平面 $\mathrm{ADGF}$ 上にある。辺 $\mathrm{AB}$ はこの平面に垂直である（$\mathrm{AB}\perp\mathrm{AD}$ かつ $\mathrm{AB}\perp\mathrm{AF}$ ではないので、正確には次のように見る）。`,
            },
            {
              k: "p",
              t: String.raw`座標を $\mathrm{A}(0,0,1),\ \mathrm{B}(1,0,1),\ \mathrm{C}(1,1,1),\ \mathrm{D}(0,1,1),\ \mathrm{E}(0,0,0),\ \mathrm{F}(1,0,0),\ \mathrm{G}(1,1,0),\ \mathrm{H}(0,1,0)$ ととる。このとき $\mathrm{P}(0,p,1)$ で、(1) より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{X}=\mathrm{A}+\frac{p}{1+p}\overrightarrow{\mathrm{AG}}=\left(t,\ t,\ 1-t\right),\qquad t=\frac{p}{1+p}`,
            },
            { k: "p", t: String.raw`である。四面体 $\mathrm{ABPX}$ の体積は、$\overrightarrow{\mathrm{AB}}=(1,0,0)$、$\overrightarrow{\mathrm{AP}}=(0,p,0)$、$\overrightarrow{\mathrm{AX}}=(t,t,-t)$ から` },
            {
              k: "math",
              t: String.raw`\frac{1}{6}\left|\det\begin{pmatrix}1&0&0\\0&p&0\\t&t&-t\end{pmatrix}\right|=\frac{1}{6}\left|1\cdot\left(p\cdot\left(-t\right)-0\cdot t\right)\right|=\frac{pt}{6}`,
            },
            { k: "p", t: String.raw`である。$t=\dfrac{p}{1+p}$ を入れて` },
            {
              k: "math",
              t: String.raw`\left(\text{四面体 }\mathrm{ABPX}\right)=\frac{p^{2}}{6\left(1+p\right)}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**四面体 $\mathrm{EFGX}$。** $\triangle\mathrm{EFG}$ は底面（$z=0$ の平面）にあり、$\mathrm{EF}=\mathrm{FG}=1$、$\mathrm{EF}\perp\mathrm{FG}$ なので面積は $\dfrac12$ である。高さは $\mathrm{X}$ の $z$ 座標`,
            },
            { k: "math", t: String.raw`1-t=1-\frac{p}{1+p}=\frac{1}{1+p}` },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\left(\text{四面体 }\mathrm{EFGX}\right)=\frac{1}{3}\cdot\frac{1}{2}\cdot\frac{1}{1+p}=\frac{1}{6\left(1+p\right)}`,
            },
            { k: "p", t: String.raw`である。2つを足して` },
            {
              k: "math",
              t: String.raw`V=\frac{p^{2}}{6\left(1+p\right)}+\frac{1}{6\left(1+p\right)}=\frac{p^{2}+1}{6\left(1+p\right)}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\triangle\mathrm{APX}$ を底面にすると、(2) の面積 $\dfrac{\sqrt2\,p^{2}}{2(1+p)}$ に、$\mathrm{B}$ から平面 $\mathrm{ADGF}$ までの距離 $\dfrac{1}{\sqrt2}$（正方形 $\mathrm{ABFE}$ の1辺 $1$ に対する対角線までの距離）を掛けて $\tfrac13$ 倍しても同じ値になる。`,
            },
          ],
          pitfalls: [
            String.raw`座標を入れてしまえば四面体の体積は行列式で一発。空間図形で迷ったら座標を置く。`,
            String.raw`$\mathrm{X}$ の $z$ 座標がそのまま $\mathrm{EFGX}$ の高さになる。底面が $z=0$ の平面にあるからである。`,
          ],
          check: String.raw`$p=0.2$ で座標から行列式で計算すると $V=0.144444444$、式の値も $0.144444444$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`点 $\mathrm{P}$ を辺 $\mathrm{AD}$ 上で動かすときの $V$ の最小値を求める`,
          answer: String.raw`$\dfrac{\sqrt{2}-1}{3}$（$p=\sqrt{2}-1$ のとき）`,
          approach: String.raw`$u=p+1$ と置き換えると $V=\dfrac16\left(u+\dfrac2u-2\right)$ となり、相加平均と相乗平均の関係がそのまま使える形になる。等号成立の $u=\sqrt2$ が範囲に入っていることを確かめる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{P}$ は辺 $\mathrm{AD}$ 上なので $0\leqq p\leqq1$ である。$u=p+1$ とおくと $1\leqq u\leqq2$ で、$p=u-1$ より` },
            { k: "math", t: String.raw`p^{2}+1=\left(u-1\right)^{2}+1=u^{2}-2u+2` },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`V=\frac{u^{2}-2u+2}{6u}=\frac{1}{6}\left(u+\frac{2}{u}-2\right)`,
            },
            { k: "p", t: String.raw`である。$u>0$ なので相加平均と相乗平均の関係から` },
            {
              k: "math",
              t: String.raw`u+\frac{2}{u}\geqq2\sqrt{u\cdot\frac{2}{u}}=2\sqrt{2}`,
            },
            { k: "p", t: String.raw`で、等号は $u=\dfrac2u$、すなわち $u=\sqrt2$ のときである。$1<\sqrt2<2$ なので $u=\sqrt2$ は範囲内で、そのとき` },
            { k: "math", t: String.raw`p=\sqrt{2}-1\qquad\left(0<\sqrt{2}-1<1\right)` },
            { k: "p", t: String.raw`である。よって最小値は` },
            {
              k: "math",
              t: String.raw`V=\frac{1}{6}\left(2\sqrt{2}-2\right)=\frac{\sqrt{2}-1}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`両端では $p=0$ でも $p=1$ でも $V=\dfrac16=0.1667$ で、最小値 $\dfrac{\sqrt2-1}{3}=0.1381$ より大きい。$\mathrm{P}$ が $\mathrm{A}$ にも $\mathrm{D}$ にも寄りすぎない位置で $V$ が最小になる。`,
            },
          ],
          pitfalls: [
            String.raw`$u=p+1$ と置き換えずに $\dfrac{p^{2}+1}{6(p+1)}$ のまま微分してもよいが、相加・相乗が使える形に直すほうが文系の範囲でも速い。`,
            String.raw`相加・相乗の等号成立 $u=\sqrt2$ が $1\leqq u\leqq2$ に入ることを確かめる。入らなければ端点で最小になる。`,
          ],
          check: String.raw`$p$ を $10^{-5}$ 刻みで $0$ から $1$ まで動かすと、最小は $p=0.41421$ での $0.138071187$ で、$\dfrac{\sqrt2-1}{3}=0.138071187$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["状態の推移", "条件つき確率", "非復元抽出", "末尾の条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "復元の場合、残り枚数の分布を分数のまま8回ぶん計算すると $0$ 枚が $\\tfrac3{32}$、$1$ 枚が $\\tfrac9{16}$、$2$ 枚が $\\tfrac{21}{64}$、$3$ 枚が $\\tfrac1{64}$ で、和がちょうど $1$ になった",
          "非復元の場合、$\\{1,1,2,2,3,3,4,4\\}$ の相異なる並び $2520$ 通りを全列挙すると、カードが残らないのは $180$ 通りで $\\tfrac{180}{2520}=\\tfrac1{14}$ だった",
          "40万回のシミュレーションで $0.56306$（$\\tfrac9{16}=0.5625$）と $0.07146$（$\\tfrac1{14}=0.07143$）になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$1,2,3,4$ の数字が2個ずつ計8個の球が袋に入っている。カードを8枚用意し、「球を1個取り出して数字が $k$ のとき、残りのカードが $k$ 枚以上なら1枚取り除き、$k$ 枚未満なら取り除かない」という試行を8回行う。球を毎回袋に戻すとき、8回のあとでカードが1枚だけ残っている確率を求める`,
          answer: String.raw`$\dfrac{9}{16}$`,
          approach: String.raw`どの数字も確率 $\tfrac14$ で出る。残りカードが $4$ 枚以上あるうちは必ず1枚減るので、最初の5回は自動的に減って残り $3$ 枚になる。残り3回だけを場合分けすればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**数字の確率。** 各数字の球は2個ずつで計8個なので、1回の試行で数字 $k$ が出る確率はどれも $\dfrac28=\dfrac14$ である。`,
            },
            {
              k: "p",
              t: String.raw`**最初の5回は必ず減る。** 残りカードが $c$ 枚のとき、$k\leqq c$ なら1枚減る。$k\leqq4$ なので、$c\geqq4$ のあいだはどんな $k$ でも必ず減る。はじめは $c=8$ だから`,
            },
            { k: "math", t: String.raw`8\to7\to6\to5\to4\to3` },
            {
              k: "p",
              t: String.raw`と、1回目から5回目まではかならず1枚ずつ減り、5回目のあとは確実に $c=3$ である。`,
            },
            {
              k: "p",
              t: String.raw`**残り3回。** 8回終えて $c=1$ になるには、残りの3回でちょうど2枚減ればよい。$c=3$ のとき減る確率は $k\leqq3$ で $\dfrac34$、$c=2$ のときは $\dfrac24=\dfrac12$、$c=1$ のときは $\dfrac14$ である。減ることを $\mathrm{R}$、減らないことを $\mathrm{S}$ と書くと、2回減るのは次の3通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{RRS}$：$c=3\to2\to1\to1$。$\dfrac34\cdot\dfrac12\cdot\dfrac34=\dfrac{9}{32}$`,
                String.raw`$\mathrm{RSR}$：$c=3\to2\to2\to1$。$\dfrac34\cdot\dfrac12\cdot\dfrac12=\dfrac{6}{32}$`,
                String.raw`$\mathrm{SRR}$：$c=3\to3\to2\to1$。$\dfrac14\cdot\dfrac34\cdot\dfrac12=\dfrac{3}{32}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`（$c=1$ で減らない確率は $1-\dfrac14=\dfrac34$、$c=2$ で減らない確率は $\dfrac12$、$c=3$ で減らない確率は $\dfrac14$ である。）足して`,
            },
            {
              k: "math",
              t: String.raw`\frac{9}{32}+\frac{6}{32}+\frac{3}{32}=\frac{18}{32}=\frac{9}{16}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`同じやり方で $0$ 枚が $\dfrac3{32}$、$2$ 枚が $\dfrac{21}{64}$、$3$ 枚が $\dfrac1{64}$ と出て、4つを足すとちょうど $1$ になる。よい検算になる。`,
            },
          ],
          pitfalls: [
            String.raw`「残りのカードが $k$ 枚**以上**」なので、$c=k$ のときは減る。$c=3,\ k=3$ は減るほうである。`,
            String.raw`最初の5回で確実に $c=3$ になることに気づけば、場合分けは3回ぶんで済む。8回ぶん場合分けしない。`,
          ],
          check: String.raw`残り枚数の分布を分数のまま8回ぶん計算すると $\left(0,1,2,3\right)$ 枚が $\dfrac3{32},\dfrac9{16},\dfrac{21}{64},\dfrac1{64}$ で、和が $1$ になった。40万回のシミュレーションでも $0.56306$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`取り出した球を袋に戻さないとき、8回の試行のあとでカードが残っていない確率を求める`,
          answer: String.raw`$\dfrac{1}{14}$`,
          approach: String.raw`8回で8枚すべてなくなるには、毎回必ず1枚減らなければならない。(1) と同じ理由で最初の5回は自動的に減るので、条件は「6回目に $3$ 以下」「7回目に $2$ 以下」「8回目に $1$」だけである。非復元なので、球の並び方（順列）の問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**条件の言い換え。** カードが8枚あり試行が8回なので、全部なくなるのは**毎回1枚ずつ減る**ときだけである。$j$ 回目の直前の残り枚数は $9-j$ なので、条件は`,
            },
            {
              k: "math",
              t: String.raw`k_{j}\leqq9-j\qquad\left(j=1,2,\dots,8\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$k_{j}\leqq4$ なので $j\leqq5$ では自動的に成り立つ。残るのは`,
            },
            {
              k: "steps",
              items: [
                String.raw`6回目：$k_{6}\leqq3$`,
                String.raw`7回目：$k_{7}\leqq2$`,
                String.raw`8回目：$k_{8}\leqq1$、つまり $k_{8}=1$`,
              ],
            },
            { k: "p", t: String.raw`の3つだけである。` },
            {
              k: "p",
              t: String.raw`**数える。** 8個の球を区別して1列に並べると $8!$ 通りで、どれも同様に確からしい。後ろ3つ（6,7,8回目に出る球）だけが問題なので、後ろから順に選ぶ。`,
            },
            {
              k: "steps",
              items: [
                String.raw`8回目：数字 $1$ の球2個のどちらか。$2$ 通り`,
                String.raw`7回目：数字 $2$ 以下、つまり $1$ がもう1個と $2$ が2個の計3個から。$3$ 通り`,
                String.raw`6回目：数字 $3$ 以下の球は $1,1,2,2,3,3$ の6個で、うち2個はすでに使った。$6-2=4$ 通り`,
              ],
            },
            { k: "p", t: String.raw`残り5個の並べ方は $5!$ 通りなので、条件を満たす並べ方は $2\cdot3\cdot4\cdot5!$ 通りである。よって確率は` },
            {
              k: "math",
              t: String.raw`\frac{2\cdot3\cdot4\cdot5!}{8!}=\frac{24}{8\cdot7\cdot6}=\frac{24}{336}=\frac{1}{14}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`後ろ3つを決めるのが $8\cdot7\cdot6=336$ 通りで、そのうち条件を満たすのが $24$ 通り、と見ても同じである。前の5回は何が出ても必ず1枚減るので、数える必要がない。`,
            },
          ],
          pitfalls: [
            String.raw`非復元なので「数字 $1$ は2個しかない」ことが効く。8回目に $1$ を使うと、7回目に使える $1$ は残り1個だけである。`,
            String.raw`6回目の数え方で「すでに使った2個を引く」のを忘れない。7回目に選んだ球は必ず $3$ 以下なので、ちょうど2個減る。`,
            String.raw`球を区別して $8!$ 通りで数えると、同じ数字が2個ずつあっても分母・分子の両方で同じ重複度が出るので、そのまま確率になる。`,
          ],
          check: String.raw`$\left\{1,1,2,2,3,3,4,4\right\}$ の相異なる並び $2520$ 通りを全列挙すると、カードが残らないのは $180$ 通りで $\dfrac{180}{2520}=\dfrac1{14}$ だった。40万回のシミュレーションでも $0.07146$ になった。`,
        },
      ],
    },
  ],
};
