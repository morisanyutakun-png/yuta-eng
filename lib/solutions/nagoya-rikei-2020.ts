import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2020年度（令和2年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の図に使う例。$(a,b)=(0.3,\,1)$ は $a^{2}<b^{2}$ を満たす。 */
const A20 = 0.3;
const B20 = 1;
/** $(b^{2}-a^{2})x^{2}+2ax-(1+b^{2})=0$ の2解。大きいほうが $C_{1}$ 上、小さいほうが $C_{2}$ 上。 */
const RT20 = ((): [number, number] => {
  const p = B20 * B20 - A20 * A20;
  const q = 2 * A20;
  const r = -(1 + B20 * B20);
  const d = Math.sqrt(q * q - 4 * p * r);
  return [(-q + d) / (2 * p), (-q - d) / (2 * p)];
})();
const P20: [number, number] = [RT20[0], (A20 * RT20[0] - 1) / B20];
const Q20: [number, number] = [RT20[1], (A20 * RT20[1] - 1) / B20];

/** 第3問の図に使うサンプル。$x=0.6$ と、その折り返し先3つ。 */
const X20 = 0.6;

export const nagoyaRikei2020: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式",
      topics: ["双曲線", "解と係数の関係", "点と直線の距離", "面積の最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)$ を7通り試し、$a^{2}<b^{2}$ のときだけ交点の $x$ 座標が正と負に1つずつ出ることを確かめた",
          "$(a,b)=(0.3,1),(2,3),(3,-4),(-1.5,2.5),(0,2)$ で、交点を数値で求めて外積から $\\triangle\\mathrm{APQ}$ の面積を出すと、$\\dfrac{(1+b^{2}-a^{2})^{3/2}}{b^{2}-a^{2}}$ と小数10桁まで一致した",
          "$u=b^{2}-a^{2}$ を $10^{-5}$ 刻みで動かすと、$S$ の最小は $u=2.00000$ での $2.5980762114=\\dfrac{3\\sqrt{3}}{2}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`双曲線 $x^{2}-y^{2}=1$ の $x>0$ の部分を $C_{1}$、$x<0$ の部分を $C_{2}$ とするとき、直線 $ax-by=1$ が $C_{1},C_{2}$ の両方と1点ずつで交わるための $a,b$ の条件を求める`,
          answer: String.raw`$a^{2}<b^{2}$`,
          approach: String.raw`$y$ を消して $x$ の2次方程式にすると、「$C_{1}$ と $C_{2}$ に1点ずつ」は「$x$ の2解が正と負に1つずつ」と言い換わる。符号が分かれる条件は判別式ではなく**解の積が負**なので、定数項と2次の係数の比だけ見ればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$b=0$ は不適。** $b=0$ なら直線は $ax=1$ で、$a\neq0$ のときは $x=\tfrac1a$ という $y$ 軸に平行な直線である。$x$ の符号が1つに決まるので、$C_{1}$ と $C_{2}$ の両方とは交われない。$a=0$ なら直線にならない。よって $b\neq0$ である。`,
            },
            { k: "p", t: String.raw`$b\neq0$ のとき $y=\dfrac{ax-1}{b}$ を $x^{2}-y^{2}=1$ に代入して、両辺を $b^{2}$ 倍すると` },
            { k: "math", t: String.raw`b^{2}x^{2}-\left(ax-1\right)^{2}=b^{2}` },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(b^{2}-a^{2}\right)x^{2}+2ax-\left(1+b^{2}\right)=0\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。双曲線上の点は $x$ が決まれば $y=\tfrac{ax-1}{b}$ で1つに決まるので、交点と ① の実数解は1対1に対応する。したがって求める条件は` },
            { k: "math", t: String.raw`\text{① が正の解と負の解を1つずつもつ}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**係数を見る。** まず $b^{2}-a^{2}=0$ だと ① は1次方程式になり、解が1つしかないので不適である。よって $b^{2}-a^{2}\neq0$ で、① は2次方程式である。`,
            },
            { k: "p", t: String.raw`2解を $x_{1},x_{2}$ とすると、解と係数の関係から` },
            { k: "math", t: String.raw`x_{1}x_{2}=\frac{-\left(1+b^{2}\right)}{b^{2}-a^{2}}` },
            { k: "p", t: String.raw`である。解が正と負に1つずつあるのは $x_{1}x_{2}<0$ のとき、つまり` },
            {
              k: "math",
              t: String.raw`\frac{1+b^{2}}{b^{2}-a^{2}}>0\quad\Longleftrightarrow\quad b^{2}-a^{2}>0`,
            },
            {
              k: "p",
              t: String.raw`のときである（$1+b^{2}>0$ に注意）。このとき2解の積が負なので判別式は自動的に正になり、実数解も確かに2つある。よって求める条件は`,
            },
            { k: "math", t: String.raw`a^{2}<b^{2}\qquad\left(\text{すなわち}\ \left|a\right|<\left|b\right|\right)` },
            { k: "p", t: String.raw`である（このとき $b\neq0$ も自動的に成り立つ）。` },
          ],
          pitfalls: [
            String.raw`$y$ 軸に平行な場合（$b=0$）を先に外しておく。代入して割る操作が使えないので、別扱いが要る。`,
            String.raw`「2つの実数解をもつ」だけでは足りない。両方とも正だと $C_{1}$ 側に2点、$C_{2}$ 側に0点になる。見るのは解の**積の符号**である。`,
            String.raw`$b^{2}-a^{2}=0$ の場合は2次方程式ですらない。係数が $0$ になる場合を落とさない。`,
          ],
          check: String.raw`$(a,b)=(1,0.3)$（$a^{2}>b^{2}$）では2解とも同符号になり、$(a,b)=(0.3,1)$ では $x=1.189,\,-1.848$ と符号が分かれた。`,
        },
        {
          label: "(2)",
          task: String.raw`$a^{2}<b^{2}$ のとき、$\mathrm{A}(a,\,b)$ と、直線 $ax-by=1$ が $C_{1},C_{2}$ と交わる点 $\mathrm{P},\mathrm{Q}$ でできる $\triangle\mathrm{APQ}$ の面積 $S$ を $a,b$ で表す`,
          answer: String.raw`$S=\dfrac{\left(1+b^{2}-a^{2}\right)^{\frac{3}{2}}}{b^{2}-a^{2}}$`,
          approach: String.raw`$\mathrm{PQ}$ を底辺、$\mathrm{A}$ から直線までの距離を高さとする。$\mathrm{PQ}$ は ① の2解の差から、距離は点と直線の距離の公式から出る。交点の座標そのものは要らない。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "(a, b) = (0.3, 1) のときの様子。双曲線 x² - y² = 1 の右の枝が C1、左の枝が C2 で、直線 ax - by = 1 が各枝と1点ずつで交わる。網かけが △APQ。",
                view: [-2.7, 2.7, -2.25, 1.85],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[A20, B20], P20, Q20] },
                  { k: "param", f: (t: number) => [Math.cosh(t), Math.sinh(t)], from: -1.51, to: 1.35 },
                  { k: "param", f: (t: number) => [-Math.cosh(t), Math.sinh(t)], from: -1.51, to: 1.35 },
                  { k: "curve", f: (x: number) => (A20 * x - 1) / B20, from: -2.7, to: 2.7 },
                  { k: "dot", at: [A20, B20], label: "A(a, b)", place: "above-right" },
                  { k: "dot", at: P20, label: "P", place: "above-right" },
                  { k: "dot", at: Q20, label: "Q", place: "above-left" },
                  { k: "text", at: [1.95, 1.65], label: "C₁", place: "left" },
                  { k: "text", at: [-1.95, 1.65], label: "C₂", place: "right" },
                  { k: "text", at: [2.6, -0.22], label: "ax - by = 1", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`**高さ。** $\mathrm{A}(a,b)$ と直線 $ax-by-1=0$ の距離 $d$ は` },
            {
              k: "math",
              t: String.raw`d=\frac{\left|a\cdot a-b\cdot b-1\right|}{\sqrt{a^{2}+b^{2}}}=\frac{\left|a^{2}-b^{2}-1\right|}{\sqrt{a^{2}+b^{2}}}`,
            },
            { k: "p", t: String.raw`である。$a^{2}-b^{2}<0$ だから $a^{2}-b^{2}-1<0$ で、絶対値が外れて` },
            { k: "math", t: String.raw`d=\frac{1+b^{2}-a^{2}}{\sqrt{a^{2}+b^{2}}}` },
            { k: "p", t: String.raw`である。とくに $d>0$ なので $\mathrm{A}$ は直線上になく、$\triangle\mathrm{APQ}$ はつぶれない。` },
            { k: "p", t: String.raw`**底辺。** ① の2解を $x_{1},x_{2}$ とすると、解と係数の関係から` },
            {
              k: "math",
              t: String.raw`x_{1}+x_{2}=\frac{-2a}{b^{2}-a^{2}},\qquad x_{1}x_{2}=\frac{-\left(1+b^{2}\right)}{b^{2}-a^{2}}`,
            },
            { k: "p", t: String.raw`である。$k=b^{2}-a^{2}\ (>0)$ とおくと` },
            {
              k: "math",
              t: String.raw`\left(x_{1}-x_{2}\right)^{2}=\frac{4a^{2}}{k^{2}}+\frac{4\left(1+b^{2}\right)}{k}=\frac{4\left\{a^{2}+\left(1+b^{2}\right)k\right\}}{k^{2}}`,
            },
            { k: "p", t: String.raw`で、中身を展開すると` },
            {
              k: "math",
              t: String.raw`a^{2}+\left(1+b^{2}\right)\left(b^{2}-a^{2}\right)=a^{2}+b^{2}-a^{2}+b^{4}-a^{2}b^{2}=b^{2}\left(1+b^{2}-a^{2}\right)`,
            },
            { k: "p", t: String.raw`となる。したがって` },
            {
              k: "math",
              t: String.raw`\left(x_{1}-x_{2}\right)^{2}=\frac{4b^{2}\left(1+b^{2}-a^{2}\right)}{k^{2}}`,
            },
            { k: "p", t: String.raw`である。$y=\tfrac{ax-1}{b}$ より $y_{1}-y_{2}=\tfrac{a}{b}\left(x_{1}-x_{2}\right)$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}^{2}=\left(x_{1}-x_{2}\right)^{2}\left(1+\frac{a^{2}}{b^{2}}\right)=\frac{4b^{2}\left(1+b^{2}-a^{2}\right)}{k^{2}}\cdot\frac{a^{2}+b^{2}}{b^{2}}=\frac{4\left(1+b^{2}-a^{2}\right)\left(a^{2}+b^{2}\right)}{k^{2}}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}=\frac{2\sqrt{\left(1+b^{2}-a^{2}\right)\left(a^{2}+b^{2}\right)}}{k}`,
            },
            { k: "p", t: String.raw`である（$k>0$）。` },
            { k: "p", t: String.raw`**面積。** 以上から` },
            {
              k: "math",
              t: String.raw`S=\frac{1}{2}\cdot\mathrm{PQ}\cdot d=\frac{1}{2}\cdot\frac{2\sqrt{\left(1+b^{2}-a^{2}\right)\left(a^{2}+b^{2}\right)}}{k}\cdot\frac{1+b^{2}-a^{2}}{\sqrt{a^{2}+b^{2}}}`,
            },
            { k: "p", t: String.raw`で、$\sqrt{a^{2}+b^{2}}$ が約分されて` },
            {
              k: "math",
              t: String.raw`S=\frac{\left(1+b^{2}-a^{2}\right)^{\frac{3}{2}}}{b^{2}-a^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$S$ が $a,b$ に $b^{2}-a^{2}$ の形でしか依存していないのが、この問題のしかけである。(3) でそのまま効く。`,
            },
          ],
          pitfalls: [
            String.raw`交点の座標を根号で書き下すと式が重くなる。$\mathrm{PQ}$ は $\left(x_{1}-x_{2}\right)^{2}=\left(x_{1}+x_{2}\right)^{2}-4x_{1}x_{2}$ で出す。`,
            String.raw`$\left|a^{2}-b^{2}-1\right|$ の絶対値は (1) の条件 $b^{2}>a^{2}$ で外れる。符号の根拠を書いておく。`,
          ],
          check: String.raw`$(a,b)=(3,-4)$ で交点を数値で求め、$\tfrac12\left|\overrightarrow{\mathrm{AP}}\times\overrightarrow{\mathrm{AQ}}\right|$ を計算すると $3.2324881426$、式の値も $3.2324881426$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$S$ の最小値と、それを与える $a,b$ の条件を求める`,
          answer: String.raw`最小値 $\dfrac{3\sqrt{3}}{2}$。$b^{2}-a^{2}=2$ のとき`,
          approach: String.raw`$S$ は $u=b^{2}-a^{2}$ だけの関数 $\dfrac{(1+u)^{3/2}}{u}$ である。$u>0$ で1変数の最小化に落ちるので、微分するだけでよい。`,
          blocks: [
            { k: "p", t: String.raw`$u=b^{2}-a^{2}$ とおくと、(1) より $u>0$ で、$a,b$ が条件を満たして動くとき $u$ は $u>0$ の全体を動く（たとえば $a=0,\ b=\sqrt{u}$）。(2) より` },
            { k: "math", t: String.raw`S=g(u)=\frac{\left(1+u\right)^{\frac{3}{2}}}{u}\qquad\left(u>0\right)` },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`g'(u)=\frac{\dfrac{3}{2}\left(1+u\right)^{\frac{1}{2}}\cdot u-\left(1+u\right)^{\frac{3}{2}}}{u^{2}}=\frac{\left(1+u\right)^{\frac{1}{2}}\left\{\dfrac{3}{2}u-\left(1+u\right)\right\}}{u^{2}}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`g'(u)=\frac{\sqrt{1+u}}{u^{2}}\cdot\frac{u-2}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{\sqrt{1+u}}{u^{2}}>0$ なので $g'$ の符号は $u-2$ の符号と同じで、$0<u<2$ で $g'<0$、$u>2$ で $g'>0$ である。したがって $g$ は $u=2$ で最小になる。`,
            },
            { k: "math", t: String.raw`g(2)=\frac{3^{\frac{3}{2}}}{2}=\frac{3\sqrt{3}}{2}` },
            { k: "p", t: String.raw`よって $S$ の最小値は $\dfrac{3\sqrt{3}}{2}$ で、それを与えるのは` },
            { k: "math", t: String.raw`b^{2}-a^{2}=2` },
            {
              k: "p",
              t: String.raw`のときである（この条件は $b^{2}-a^{2}=2>0$ なので (1) の条件を自動的に満たす）。`,
            },
          ],
          pitfalls: [
            String.raw`$u=b^{2}-a^{2}$ が $u>0$ の全体を動けることを言っておく。範囲が狭ければ端点での値も調べる必要がある。`,
            String.raw`答えは「$a,b$ の値」ではなく「$a,b$ の条件」である。$b^{2}-a^{2}=2$ を満たす $(a,b)$ はすべて最小を与える。`,
          ],
          check: String.raw`$u$ を $10^{-5}$ 刻みで $0$ から $20$ まで動かすと、最小は $u=2.00000$ での $2.5980762114$ で、$\tfrac{3\sqrt3}{2}=2.5980762114$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["素数", "不等式の評価", "約数の絞り込み", "平方数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$m\\leqq200$ で $2,\\ m^{2}+1,\\ m^{4}+1$ が相異なる素数になるのは $m=2,4,6,16,20,24,54,56,74,90,160,180$ で、すべて偶数だった",
          "そのうち小さい6つで $a^{2}<bc$ となる $a$ を総当たりすると、毎回 $a=2$ と $a=m^{2}+1$ の2つだけだった",
          "$m=2,4,6,16,20$ について $(x+y)(x^{2}+2y^{2}+2xy)=2(m^{2}+1)(m^{4}+1)$ の正の整数解を全探索すると、いつも $(x,y)=(2,\\ m^{2}-1)$ の1組だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$2,\ m^{2}+1,\ m^{4}+1$ が相異なる素数となる正の整数 $m$ を1つ固定し、この3数のうち1つを $a$、残り2つを $b,c$ とするとき、$a^{2}<bc$ となる $a$ をすべて求める`,
          answer: String.raw`$a=2$ と $a=m^{2}+1$`,
          approach: String.raw`まず $m$ が偶数（とくに $m\geqq2$）であることを押さえる。あとは3通りを順に不等式で判定するだけで、どれも因数分解できる形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$m$ は偶数で $m\geqq2$。** $m$ が奇数なら $m^{2}+1$ は偶数である。これが素数なら $m^{2}+1=2$、つまり $m=1$ だが、そのとき3数は $2,2,2$ で相異なるという条件に反する。よって $m$ は偶数で、$m\geqq2$ である。`,
            },
            { k: "p", t: String.raw`以下、3通りを順に調べる。` },
            { k: "p", t: String.raw`**(i) $a=2$ のとき。** $bc=\left(m^{2}+1\right)\left(m^{4}+1\right)$ で、$m\geqq2$ より` },
            { k: "math", t: String.raw`\left(m^{2}+1\right)\left(m^{4}+1\right)\geqq5\cdot17=85>4=a^{2}` },
            { k: "p", t: String.raw`なので、つねに $a^{2}<bc$ である。` },
            { k: "p", t: String.raw`**(ii) $a=m^{2}+1$ のとき。** $bc=2\left(m^{4}+1\right)$ である。$a^{2}<bc$ は` },
            {
              k: "math",
              t: String.raw`\left(m^{2}+1\right)^{2}<2\left(m^{4}+1\right)`,
            },
            { k: "p", t: String.raw`と同値で、移項すると` },
            {
              k: "math",
              t: String.raw`0<2m^{4}+2-\left(m^{4}+2m^{2}+1\right)=m^{4}-2m^{2}+1=\left(m^{2}-1\right)^{2}`,
            },
            { k: "p", t: String.raw`となる。$m\geqq2$ より $m^{2}-1\neq0$ なので右辺は正であり、$a^{2}<bc$ が成り立つ。` },
            { k: "p", t: String.raw`**(iii) $a=m^{4}+1$ のとき。** $bc=2\left(m^{2}+1\right)$ である。$m\geqq2$ より` },
            {
              k: "math",
              t: String.raw`a^{2}=\left(m^{4}+1\right)^{2}>m^{4}+1\geqq m^{4}+1`,
            },
            { k: "p", t: String.raw`であり、一方` },
            {
              k: "math",
              t: String.raw`bc=2m^{2}+2\leqq m^{4}+1`,
            },
            {
              k: "p",
              t: String.raw`である（$m^{4}+1-2m^{2}-2=\left(m^{2}-1\right)^{2}-2\geqq 9-2>0$、$m\geqq2$ より $m^{2}-1\geqq3$）。よって $a^{2}>bc$ となり、不適である。`,
            },
            { k: "p", t: String.raw`以上より、$a^{2}<bc$ となるのは` },
            { k: "math", t: String.raw`a=2\quad\text{と}\quad a=m^{2}+1` },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "note",
              t: String.raw`(ii) で出てきた $\left(m^{2}-1\right)^{2}$ は (2) でそのまま平方数として現れる。ここが誘導になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$m=1$ を外しておかないと (ii) の不等号が等号になってしまう。「相異なる」という条件が効く。`,
            String.raw`$m$ が奇数だと $m^{2}+1$ が $2$ より大きい偶数になって素数でない。最初にこれを言う。`,
          ],
          check: String.raw`$m=2,4,6,16,20,24$ のそれぞれで3通りを総当たりすると、$a^{2}<bc$ になるのは毎回 $a=2$ と $a=m^{2}+1$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`正の整数 $x,y$ が $\left(x+y\right)\left(x^{2}+2y^{2}+2xy\right)=2\left(m^{2}+1\right)\left(m^{4}+1\right)$ を満たすとき、$x,y$ を求める`,
          answer: String.raw`$x=2$、$y=m^{2}-1$`,
          approach: String.raw`$x^{2}+2y^{2}+2xy=\left(x+y\right)^{2}+y^{2}$ と変形すると、左辺は $s=x+y$ を使って $s\left(s^{2}+y^{2}\right)$ になる。$0<y<s$ から $s^{3}<\left(\text{右辺}\right)<2s^{3}$ が出るので、$s$ は右辺の約数のうちこの不等式を満たすものに限られる。右辺は相異なる3つの素数の積なので、約数は8個しかない。`,
          blocks: [
            { k: "p", t: String.raw`**左辺を整理する。** $x^{2}+2y^{2}+2xy=\left(x^{2}+2xy+y^{2}\right)+y^{2}=\left(x+y\right)^{2}+y^{2}$ なので、$s=x+y$ とおくと与式は` },
            { k: "math", t: String.raw`s\left(s^{2}+y^{2}\right)=N,\qquad N=2\left(m^{2}+1\right)\left(m^{4}+1\right)` },
            { k: "p", t: String.raw`となる。$x,y$ は正の整数なので $1\leqq y\leqq s-1$、とくに $0<y<s$ である。すると` },
            { k: "math", t: String.raw`s^{3}<s\left(s^{2}+y^{2}\right)<s\left(s^{2}+s^{2}\right)=2s^{3}` },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`s^{3}<N<2s^{3}\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`である。また $s$ は $N$ の約数である。` },
            {
              k: "p",
              t: String.raw`**約数を絞る。** $p=m^{2}+1$、$q=m^{4}+1$ とおくと $2,p,q$ は相異なる素数で、$m\geqq2$ より $2<p<q$ である。$N=2pq$ の正の約数は`,
            },
            { k: "math", t: String.raw`1,\quad2,\quad p,\quad q,\quad 2p,\quad 2q,\quad pq,\quad 2pq` },
            { k: "p", t: String.raw`の8個しかない。① の前半 $s^{3}<N=2pq$ を満たすものを見ていく。` },
            {
              k: "steps",
              items: [
                String.raw`$s=2q,\ pq,\ 2pq$：$s\geqq pq$ なので $s^{3}\geqq p^{3}q^{3}>2pq=N$。不適`,
                String.raw`$s=2p$：$s^{3}=8p^{3}<2pq$ は $4p^{2}<q$ と同値。しかし $q=m^{4}+1<m^{4}+2m^{2}+1=p^{2}<4p^{2}$ なので不適`,
                String.raw`$s=q$：① の後半 $N<2s^{3}$ は $2pq<2q^{3}$ でよいが、前半 $q^{3}<2pq$ は $q^{2}<2p$ と同値。$q>p$ より $q^{2}>p^{2}>2p$（$p\geqq5$）なので不適`,
                String.raw`$s=1,\ 2$：$y<s$ から $y\geqq1$ と合わせて $s\geqq2$、さらに $s=2$ なら $N<2\cdot8=16$ だが $N\geqq2\cdot5\cdot17=170$ で不適`,
              ],
            },
            { k: "p", t: String.raw`残るのは $s=p=m^{2}+1$ である。実際このとき ① は` },
            {
              k: "math",
              t: String.raw`p^{3}<2pq<2p^{3}\quad\Longleftrightarrow\quad\frac{p^{2}}{2}<q<p^{2}`,
            },
            { k: "p", t: String.raw`と同値で、$p^{2}=m^{4}+2m^{2}+1$、$q=m^{4}+1$ だから` },
            {
              k: "math",
              t: String.raw`q<p^{2}\ \text{は}\ 0<2m^{2},\qquad \frac{p^{2}}{2}<q\ \text{は}\ 0<\left(m^{2}-1\right)^{2}`,
            },
            { k: "p", t: String.raw`と同値で、どちらも $m\geqq2$ で成り立つ（後者は (1)(ii) そのものである）。` },
            { k: "p", t: String.raw`**$y$ を求める。** $s=p$ を $s\left(s^{2}+y^{2}\right)=2pq$ に入れると $s^{2}+y^{2}=2q$、すなわち` },
            {
              k: "math",
              t: String.raw`y^{2}=2\left(m^{4}+1\right)-\left(m^{2}+1\right)^{2}=m^{4}-2m^{2}+1=\left(m^{2}-1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。$y>0$ かつ $m\geqq2$ だから` },
            { k: "math", t: String.raw`y=m^{2}-1,\qquad x=s-y=\left(m^{2}+1\right)-\left(m^{2}-1\right)=2` },
            { k: "p", t: String.raw`である。これは $x,y$ とも正の整数で、条件を満たす。よって` },
            { k: "math", t: String.raw`x=2,\qquad y=m^{2}-1` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x^{2}+2y^{2}+2xy$ をそのまま扱わず、$\left(x+y\right)^{2}+y^{2}$ と見る。$x+y$ でくくれる形になるのがすべての出発点である。`,
            String.raw`$0<y<s$ から $s^{3}<N<2s^{3}$ という**両側**の評価が出る。片側だけだと約数が絞りきれない。`,
            String.raw`$N=2pq$ の約数は8個。1つずつ潰すときに $2p$ と $q$ を忘れやすい。`,
          ],
          check: String.raw`$m=2,4,6,16,20$ で右辺の約数を総当たりして解を探すと、いつも $(x,y)=(2,\,m^{2}-1)$ の1組だけだった（$m=2$ なら $(2,3)$、$m=20$ なら $(2,399)$）。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分法",
      topics: ["凸関数", "対称性による積分の分割", "置換積分", "不等式の証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=x^{2},\\ e^{0.4x},\\ \\cosh(x-3),\\ x^{4}-3x+1$（いずれも $f''>0$）で $F$ を $[0,\\tfrac{\\pi}{2}]$ の2001点で計算すると最小値はちょうど $0$（$x=\\tfrac\\pi2$ での値）だった",
          "同じ4つで $\\int_{0}^{2\\pi}f(x)\\cos x\\,dx$ を数値積分するとすべて正だった",
          "$g(x)=-x,\\ e^{-x},\\ 5-\\tfrac{x^{3}}{30},\\ \\cos\\tfrac{x}{4}$（いずれも $g'<0$）で $\\int_{0}^{2\\pi}g(x)\\sin x\\,dx$ と $G(t)=g(t)+g(\\pi-t)-g(\\pi+t)-g(2\\pi-t)$ の最小値がどちらも正だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0\leqq x\leqq2\pi$ で $f''(x)>0$ のとき、$F(x)=f(x)-f(\pi-x)-f(\pi+x)+f(2\pi-x)$ が $0\leqq x\leqq\tfrac{\pi}{2}$ で $F(x)\geqq0$ であることを示す`,
          answer: String.raw`$F'(x)<0$ かつ $F\!\left(\tfrac{\pi}{2}\right)=0$ なので、$F$ は $\left[0,\tfrac\pi2\right]$ で減少して最後に $0$ になる`,
          approach: String.raw`$F$ の値を直接評価するのは難しいが、$F'$ は $f'$ の差だけでできている。$f''>0$ は「$f'$ が増加」ということなので、差の符号がすぐ読める。あとは右端 $x=\tfrac\pi2$ で $F=0$ になることに気づけばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0\leqq x\leqq\tfrac{\pi}{2}$ のとき、$\pi-x,\ \pi+x,\ 2\pi-x$ はいずれも $\left[0,2\pi\right]$ に入る（順に $\left[\tfrac\pi2,\pi\right],\ \left[\pi,\tfrac{3\pi}{2}\right],\ \left[\tfrac{3\pi}{2},2\pi\right]$）。だから $F$ はこの区間で定義でき、微分もできる。`,
            },
            { k: "p", t: String.raw`**右端の値。** $x=\tfrac{\pi}{2}$ を入れると $\pi-x=\tfrac\pi2$、$\pi+x=\tfrac{3\pi}{2}$、$2\pi-x=\tfrac{3\pi}{2}$ なので` },
            {
              k: "math",
              t: String.raw`F\left(\frac{\pi}{2}\right)=f\left(\frac{\pi}{2}\right)-f\left(\frac{\pi}{2}\right)-f\left(\frac{3\pi}{2}\right)+f\left(\frac{3\pi}{2}\right)=0`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**導関数の符号。** 合成関数の微分で` },
            {
              k: "math",
              t: String.raw`F'(x)=f'(x)+f'(\pi-x)-f'(\pi+x)-f'(2\pi-x)`,
            },
            { k: "p", t: String.raw`である（$-f(\pi-x)$ の導関数は $+f'(\pi-x)$、$f(2\pi-x)$ の導関数は $-f'(2\pi-x)$）。2つずつ組にすると` },
            {
              k: "math",
              t: String.raw`F'(x)=\left\{f'(x)-f'(\pi+x)\right\}+\left\{f'(\pi-x)-f'(2\pi-x)\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$f''>0$ より $f'$ は $\left[0,2\pi\right]$ で**狭義単調増加**である。$x<\pi+x$ と $\pi-x<2\pi-x$ だから、2つの $\left\{\ \right\}$ はどちらも負である。よって`,
            },
            { k: "math", t: String.raw`F'(x)<0\qquad\left(0\leqq x\leqq\frac{\pi}{2}\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**結論。** $F$ は $\left[0,\tfrac\pi2\right]$ で単調減少なので、$0\leqq x\leqq\tfrac\pi2$ のとき $F(x)\geqq F\!\left(\tfrac\pi2\right)=0$ である。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$F$ を直接評価しようとしない。$f$ の形は分からず、分かるのは「$f'$ が増加」だけである。`,
            String.raw`$-f(\pi-x)$ を微分すると符号が2回変わって $+f'(\pi-x)$ になる。内側の微分 $-1$ を落とさない。`,
          ],
          check: String.raw`$f=x^{2},\ e^{0.4x},\ \cosh(x-3),\ x^{4}-3x+1$ のそれぞれで $\left[0,\tfrac\pi2\right]$ を2000等分して $F$ を計算すると、最小値はいずれもちょうど $0$（右端での値）だった。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の $f$ について $\displaystyle\int_{0}^{2\pi}f(x)\cos x\,dx\geqq0$ を示す`,
          answer: String.raw`4つの区間に分けて折り返すと $\displaystyle\int_{0}^{2\pi}f(x)\cos x\,dx=\int_{0}^{\frac{\pi}{2}}F(t)\cos t\,dt\geqq0$`,
          approach: String.raw`$\cos$ は $\pi-x,\ \pi+x,\ 2\pi-x$ の置換で符号が $-,-,+$ と変わる。これは $F$ の係数 $-1,-1,+1$ とちょうど同じなので、$\left[0,2\pi\right]$ を4等分して全部 $\left[0,\tfrac\pi2\right]$ に折り返すと被積分関数が $F(t)\cos t$ にまとまる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "y = cos x のグラフ。x, π-x, π+x, 2π-x の4点での cos の値は順に c, -c, -c, c（図は x = 0.6 の場合）。F(x) の係数 +1, -1, -1, +1 と同じ並びになる。",
                view: [-0.45, 6.78, -1.42, 1.42],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: Math.cos, from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [X20, Math.cos(X20)], label: "x", place: "above" },
                  { k: "dot", at: [Math.PI - X20, -Math.cos(X20)], label: "π-x", place: "below" },
                  { k: "dot", at: [Math.PI + X20, -Math.cos(X20)], label: "π+x", place: "below" },
                  { k: "dot", at: [2 * Math.PI - X20, Math.cos(X20)], label: "2π-x", place: "above" },
                  { k: "seg", a: [Math.PI / 2, -1.42], b: [Math.PI / 2, 1.42], dash: true, faint: true },
                  { k: "seg", a: [Math.PI, -1.42], b: [Math.PI, 1.42], dash: true, faint: true },
                  { k: "seg", a: [(3 * Math.PI) / 2, -1.42], b: [(3 * Math.PI) / 2, 1.42], dash: true, faint: true },
                ],
              },
            },
            { k: "p", t: String.raw`積分区間を $\left[0,\tfrac\pi2\right],\ \left[\tfrac\pi2,\pi\right],\ \left[\pi,\tfrac{3\pi}{2}\right],\ \left[\tfrac{3\pi}{2},2\pi\right]$ の4つに分け、後ろの3つを置換で $\left[0,\tfrac\pi2\right]$ に移す。` },
            { k: "p", t: String.raw`**$\left[\tfrac\pi2,\pi\right]$：$x=\pi-t$。** $dx=-dt$、$\cos x=-\cos t$、$t$ は $\tfrac\pi2$ から $0$ まで動くので` },
            {
              k: "math",
              t: String.raw`\int_{\frac{\pi}{2}}^{\pi}f(x)\cos x\,dx=\int_{\frac{\pi}{2}}^{0}f(\pi-t)\left(-\cos t\right)\left(-dt\right)=-\int_{0}^{\frac{\pi}{2}}f(\pi-t)\cos t\,dt`,
            },
            { k: "p", t: String.raw`**$\left[\pi,\tfrac{3\pi}{2}\right]$：$x=\pi+t$。** $dx=dt$、$\cos x=-\cos t$、$t$ は $0$ から $\tfrac\pi2$ まで動くので` },
            {
              k: "math",
              t: String.raw`\int_{\pi}^{\frac{3\pi}{2}}f(x)\cos x\,dx=-\int_{0}^{\frac{\pi}{2}}f(\pi+t)\cos t\,dt`,
            },
            { k: "p", t: String.raw`**$\left[\tfrac{3\pi}{2},2\pi\right]$：$x=2\pi-t$。** $dx=-dt$、$\cos x=\cos t$、$t$ は $\tfrac\pi2$ から $0$ まで動くので` },
            {
              k: "math",
              t: String.raw`\int_{\frac{3\pi}{2}}^{2\pi}f(x)\cos x\,dx=\int_{0}^{\frac{\pi}{2}}f(2\pi-t)\cos t\,dt`,
            },
            { k: "p", t: String.raw`4つを足すと、$\cos t$ でくくれて` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2\pi}f(x)\cos x\,dx=\int_{0}^{\frac{\pi}{2}}\left\{f(t)-f(\pi-t)-f(\pi+t)+f(2\pi-t)\right\}\cos t\,dt`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2\pi}f(x)\cos x\,dx=\int_{0}^{\frac{\pi}{2}}F(t)\cos t\,dt`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq t\leqq\tfrac\pi2$ では (1) より $F(t)\geqq0$、また $\cos t\geqq0$ なので被積分関数は $0$ 以上である。したがって`,
            },
            { k: "math", t: String.raw`\int_{0}^{2\pi}f(x)\cos x\,dx\geqq0` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`置換のたびに「$dx$ の符号」と「積分範囲の向き」の2か所で符号が出る。両方を同時に処理して混乱しないよう、1つずつ書く。`,
            String.raw`$F$ の係数の並び $+1,-1,-1,+1$ と、$\cos$ の値の並び $+,-,-,+$ が一致することがこの問題の核心である。(1) の $F$ の形はそのために作られている。`,
          ],
          check: String.raw`$f=x^{2}$ なら $\int_{0}^{2\pi}x^{2}\cos x\,dx=4\pi=12.566$、$f=e^{0.4x}$ なら $3.912$ と、数値積分でも正だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$0\leqq x\leqq2\pi$ で $g'(x)<0$ のとき、$\displaystyle\int_{0}^{2\pi}g(x)\sin x\,dx\geqq0$ を示す`,
          answer: String.raw`同じ折り返しで $\displaystyle\int_{0}^{2\pi}g(x)\sin x\,dx=\int_{0}^{\frac{\pi}{2}}\left\{g(t)+g(\pi-t)-g(\pi+t)-g(2\pi-t)\right\}\sin t\,dt$ となり、$\left\{\ \right\}>0$`,
          approach: String.raw`(2) とまったく同じ4分割を $\sin$ でやる。$\sin$ の符号の並びは $+,+,-,-$ になるので、できあがる $\left\{\ \right\}$ は「$g$ の値を $\pi$ ずらして引いた差」2つの和になり、$g$ が減少であることだけで正と分かる。$f''$ にあたる仮定は要らない。`,
          blocks: [
            { k: "p", t: String.raw`(2) と同じ置換をする。$\sin$ については` },
            {
              k: "math",
              t: String.raw`\sin\left(\pi-t\right)=\sin t,\quad\sin\left(\pi+t\right)=-\sin t,\quad\sin\left(2\pi-t\right)=-\sin t`,
            },
            { k: "p", t: String.raw`なので、同じ計算で` },
            {
              k: "math",
              t: String.raw`\int_{\frac{\pi}{2}}^{\pi}g\sin\,dx=\int_{0}^{\frac{\pi}{2}}g(\pi-t)\sin t\,dt`,
            },
            {
              k: "math",
              t: String.raw`\int_{\pi}^{\frac{3\pi}{2}}g\sin\,dx=-\int_{0}^{\frac{\pi}{2}}g(\pi+t)\sin t\,dt`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac{3\pi}{2}}^{2\pi}g\sin\,dx=-\int_{0}^{\frac{\pi}{2}}g(2\pi-t)\sin t\,dt`,
            },
            { k: "p", t: String.raw`となる。4つを足して` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2\pi}g(x)\sin x\,dx=\int_{0}^{\frac{\pi}{2}}G(t)\sin t\,dt`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`G(t)=g(t)+g(\pi-t)-g(\pi+t)-g(2\pi-t)`,
            },
            { k: "p", t: String.raw`とおいた。これを2つずつ組にすると` },
            {
              k: "math",
              t: String.raw`G(t)=\left\{g(t)-g(\pi+t)\right\}+\left\{g(\pi-t)-g(2\pi-t)\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$g'<0$ より $g$ は $\left[0,2\pi\right]$ で狭義単調減少である。$t<\pi+t$ と $\pi-t<2\pi-t$ だから、2つの $\left\{\ \right\}$ はどちらも正である。よって $G(t)>0$ である。`,
            },
            { k: "p", t: String.raw`$0\leqq t\leqq\tfrac\pi2$ では $\sin t\geqq0$ なので被積分関数は $0$ 以上で、` },
            { k: "math", t: String.raw`\int_{0}^{2\pi}g(x)\sin x\,dx\geqq0` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\cos$ のときは「ずらした差の差」まで要ったので $f''>0$（$f'$ が増加）が必要だったが、$\sin$ では「ずらした差」で止まるので $g'<0$（$g$ が減少）だけで足りる。(1)(2) と (3) の仮定が違うのはこのためである。`,
            },
          ],
          pitfalls: [
            String.raw`$\sin$ の符号の並びは $+,+,-,-$ で、$\cos$ の $+,-,-,+$ とは違う。そのため $G$ の係数は $+1,+1,-1,-1$ になる。`,
            String.raw`(1)(2) を使おうとしなくてよい。$g$ には2階微分の仮定がないので、むしろ使えない。`,
          ],
          check: String.raw`$g=-x$ で $\int_{0}^{2\pi}(-x)\sin x\,dx=2\pi=6.283$、$g=e^{-x}$ で $0.499$、$g=\cos\tfrac{x}{4}$ で $1.0667$ と、いずれも正だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率・漸化式",
      topics: ["推移確率", "連立漸化式", "3項間漸化式", "和の比較"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "状態（2つの駒の距離）の推移を分数のまま20回ぶん回すと $p_{1}=0,\\ p_{2}=\\tfrac29,\\ p_{3}=\\tfrac4{27},\\ p_{4}=\\tfrac{10}{81},\\ p_{5}=\\tfrac{8}{81},\\ p_{6}=\\tfrac{58}{729}$ になった",
          "閉じた式 $\\dfrac{(1+\\sqrt2)^{n-1}-(1-\\sqrt2)^{n-1}}{\\sqrt2\\cdot3^{n}}$ との差は $n=1$〜$20$ で最大 $2.8\\times10^{-17}$ だった",
          "$N=2$ から $12$ まで、奇数番の和 $<$ 偶数番の和 がすべて成り立った",
          "30万回のシミュレーションで $p_{2},\\dots,p_{6}=0.22304,\\ 0.14838,\\ 0.12339,\\ 0.09965,\\ 0.07951$（理論値 $0.22222,\\ 0.14815,\\ 0.12346,\\ 0.09877,\\ 0.07956$）、後攻の勝率 $0.571$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正方形の頂点を反時計回りに $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ とし、先攻の駒を $\mathrm{A}$、後攻の駒を $\mathrm{C}$ に置く。先攻から交互にサイコロを振り、出た目を $3$ で割った余りが $0$ なら動かさず、$1$ なら自分の駒を反時計回りに、$2$ なら時計回りに隣へ動かす。移った先に相手の駒があればそこで終了とするとき、ちょうど $n$ 回目で勝敗が決まる確率を $p_{n}$ として $p_{2},p_{3}$ を求める`,
          answer: String.raw`$p_{2}=\dfrac{2}{9}$、$p_{3}=\dfrac{4}{27}$`,
          approach: String.raw`$3$ で割った余りは $0,1,2$ がそれぞれ確率 $\tfrac13$ で出る。注目すべきは駒の位置そのものではなく**2つの駒の間の距離**（正方形の辺をいくつたどるか）で、これは $2$（対角）か $1$（隣）しかない。状態が2つだけなので一気に見通しがよくなる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "正方形の頂点を反時計回りに A, B, C, D とし、先攻の駒を A、後攻の駒を C に置いたところ。最初は2つの駒は対角（距離 2）にある。",
                view: [-1.8, 1.8, -1.59, 1.59],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [1, 1], b: [-1, 1] },
                  { k: "seg", a: [-1, 1], b: [-1, -1] },
                  { k: "seg", a: [-1, -1], b: [1, -1] },
                  { k: "seg", a: [1, -1], b: [1, 1] },
                  { k: "seg", a: [1, 1], b: [-1, -1], dash: true, faint: true },
                  { k: "dot", at: [1, 1], label: "A（先攻）", place: "above-right" },
                  { k: "dot", at: [-1, 1], label: "B", place: "above-left" },
                  { k: "dot", at: [-1, -1], label: "C（後攻）", place: "below-left" },
                  { k: "dot", at: [1, -1], label: "D", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**余りの確率。** $1$ から $6$ のうち、$3$ で割った余りが $0$ なのは $3,6$、$1$ なのは $1,4$、$2$ なのは $2,5$ の各2通りである。よって「動かさない」「反時計回りに1つ」「時計回りに1つ」はそれぞれ確率 $\dfrac13$ である。`,
            },
            {
              k: "p",
              t: String.raw`**状態は距離だけで決まる。** 正方形の頂点を反時計回りに $0,1,2,3$ と番号づけ、2つの駒の番号の差を $4$ を法として見る。駒は「隣」か「対角」のどちらかにあり、距離は $1$ か $2$ である（$0$ になったら終了）。`,
            },
            { k: "p", t: String.raw`距離 $2$（対角）のとき、振った人が駒を動かすとどちらに回しても距離 $1$ になる。相手の駒に乗ることはない。したがって` },
            {
              k: "steps",
              items: [
                String.raw`距離 $2$ から：確率 $\dfrac13$ で距離 $2$ のまま、確率 $\dfrac23$ で距離 $1$ へ。終了しない`,
                String.raw`距離 $1$ から：相手の側へ回せば乗るので確率 $\dfrac13$ で**終了**、逆へ回すと距離 $2$ で確率 $\dfrac13$、動かさなければ距離 $1$ のままで確率 $\dfrac13$`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらの駒を動かすかで状況は変わらない（距離だけで決まる）ので、先攻・後攻の区別は確率の計算には影響しない。`,
            },
            { k: "p", t: String.raw`**計算。** 最初は $\mathrm{A}$ と $\mathrm{C}$ で距離 $2$ である。` },
            {
              k: "p",
              t: String.raw`1回目：距離 $2$ からなので終了しない。$p_{1}=0$ で、1回目のあと距離 $2$ である確率が $\tfrac13$、距離 $1$ である確率が $\tfrac23$ である。`,
            },
            {
              k: "p",
              t: String.raw`2回目：終了するのは「1回目のあと距離 $1$」かつ「2回目に相手の側へ回す」ときなので`,
            },
            { k: "math", t: String.raw`p_{2}=\frac{2}{3}\cdot\frac{1}{3}=\frac{2}{9}` },
            {
              k: "p",
              t: String.raw`である。2回目のあとの状態は、距離 $2$ が $\tfrac13\cdot\tfrac13+\tfrac23\cdot\tfrac13=\tfrac13$、距離 $1$ が $\tfrac13\cdot\tfrac23+\tfrac23\cdot\tfrac13=\tfrac49$ である。`,
            },
            { k: "p", t: String.raw`3回目：同様に` },
            { k: "math", t: String.raw`p_{3}=\frac{4}{9}\cdot\frac{1}{3}=\frac{4}{27}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「出た目を $3$ で割った余り」なので、$0,1,2$ はどれも確率 $\tfrac13$。$\tfrac16$ 刻みで考えなくてよい。`,
            String.raw`対角にいる状態からはどう動いても相手に乗れない。最初の1回で勝負がつくことはないので $p_{1}=0$ である。`,
          ],
          check: String.raw`30万回のシミュレーションで $p_{2}=0.22304$（$\tfrac29=0.22222$）、$p_{3}=0.14838$（$\tfrac4{27}=0.14815$）だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$p_{n}$ を求める`,
          answer: String.raw`$p_{n}=\dfrac{\left(1+\sqrt{2}\right)^{n-1}-\left(1-\sqrt{2}\right)^{n-1}}{\sqrt{2}\cdot3^{n}}$`,
          approach: String.raw`$n$ 回目を振る直前に「まだ終わっておらず距離が $2$／$1$」である確率を $u_{n},v_{n}$ とおくと、連立漸化式になる。$p_{n}=\tfrac13v_{n}$ なので、$v_{n}$ の3項間漸化式に直して特性方程式を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 回目を振る直前に、まだ勝敗がついておらず2つの駒の距離が $2$ である確率を $u_{n}$、距離が $1$ である確率を $v_{n}$ とする。(1) の推移から`,
            },
            {
              k: "math",
              t: String.raw`u_{n+1}=\frac{1}{3}u_{n}+\frac{1}{3}v_{n},\qquad v_{n+1}=\frac{2}{3}u_{n}+\frac{1}{3}v_{n}\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。また終了するのは距離 $1$ から相手の側へ回したときだけなので` },
            { k: "math", t: String.raw`p_{n}=\frac{1}{3}v_{n}\qquad\cdots\text{②}` },
            { k: "p", t: String.raw`である。初期条件は $u_{1}=1,\ v_{1}=0$ である。` },
            { k: "p", t: String.raw`**3項間漸化式にする。** ① の第1式から $u_{n}=3u_{n+1}-v_{n}$ である。これを第2式の $n\to n+1$ の形` },
            { k: "math", t: String.raw`v_{n+2}=\frac{2}{3}u_{n+1}+\frac{1}{3}v_{n+1}` },
            { k: "p", t: String.raw`に使うため、第2式 $v_{n+1}=\tfrac23u_{n}+\tfrac13v_{n}$ から` },
            {
              k: "math",
              t: String.raw`u_{n+1}=\frac{1}{3}\left(u_{n}+v_{n}\right)=\frac{1}{3}\left(\frac{3}{2}v_{n+1}-\frac{1}{2}v_{n}+v_{n}\right)=\frac{1}{2}v_{n+1}+\frac{1}{6}v_{n}`,
            },
            {
              k: "p",
              t: String.raw`を得る（第2式を $u_{n}=\tfrac32v_{n+1}-\tfrac12v_{n}$ と解いて代入した）。これを $v_{n+2}=\tfrac23u_{n+1}+\tfrac13v_{n+1}$ に入れると`,
            },
            {
              k: "math",
              t: String.raw`v_{n+2}=\frac{2}{3}\left(\frac{1}{2}v_{n+1}+\frac{1}{6}v_{n}\right)+\frac{1}{3}v_{n+1}=\frac{2}{3}v_{n+1}+\frac{1}{9}v_{n}`,
            },
            { k: "p", t: String.raw`となる。② より $p_{n}$ も同じ漸化式を満たす。` },
            {
              k: "math",
              t: String.raw`p_{n+2}=\frac{2}{3}p_{n+1}+\frac{1}{9}p_{n},\qquad p_{1}=0,\quad p_{2}=\frac{2}{9}`,
            },
            { k: "p", t: String.raw`**特性方程式。** $t^{2}=\tfrac23t+\tfrac19$、すなわち $9t^{2}-6t-1=0$ を解くと` },
            {
              k: "math",
              t: String.raw`t=\frac{6\pm\sqrt{36+36}}{18}=\frac{6\pm6\sqrt{2}}{18}=\frac{1\pm\sqrt{2}}{3}`,
            },
            { k: "p", t: String.raw`である。よって定数 $A,B$ を使って` },
            {
              k: "math",
              t: String.raw`p_{n}=A\left(\frac{1+\sqrt{2}}{3}\right)^{n}+B\left(\frac{1-\sqrt{2}}{3}\right)^{n}`,
            },
            { k: "p", t: String.raw`と書ける。$\alpha=\tfrac{1+\sqrt2}{3}$、$\beta=\tfrac{1-\sqrt2}{3}$ とおくと、$p_{1}=0$ から $A\alpha+B\beta=0$、$p_{2}=\tfrac29$ から $A\alpha^{2}+B\beta^{2}=\tfrac29$ である。前者より $B\beta=-A\alpha$ なので` },
            {
              k: "math",
              t: String.raw`A\alpha^{2}+\left(-A\alpha\right)\beta=A\alpha\left(\alpha-\beta\right)=\frac{2}{9}`,
            },
            { k: "p", t: String.raw`である。$\alpha-\beta=\tfrac{2\sqrt2}{3}$、$\alpha=\tfrac{1+\sqrt2}{3}$ だから` },
            {
              k: "math",
              t: String.raw`A=\frac{2}{9}\cdot\frac{1}{\alpha\left(\alpha-\beta\right)}=\frac{2}{9}\cdot\frac{9}{\left(1+\sqrt{2}\right)\cdot2\sqrt{2}}=\frac{1}{\sqrt{2}\left(1+\sqrt{2}\right)}`,
            },
            { k: "p", t: String.raw`で、同様に $B=-A\dfrac{\alpha}{\beta}=-\dfrac{1}{\sqrt2\left(1-\sqrt2\right)}$ である。これを代入すると` },
            {
              k: "math",
              t: String.raw`p_{n}=\frac{1}{\sqrt{2}}\left\{\frac{\alpha^{n}}{1+\sqrt{2}}-\frac{\beta^{n}}{1-\sqrt{2}}\right\}=\frac{1}{\sqrt{2}\cdot3^{n}}\left\{\left(1+\sqrt{2}\right)^{n-1}-\left(1-\sqrt{2}\right)^{n-1}\right\}`,
            },
            { k: "p", t: String.raw`である。すなわち` },
            {
              k: "math",
              t: String.raw`p_{n}=\frac{\left(1+\sqrt{2}\right)^{n-1}-\left(1-\sqrt{2}\right)^{n-1}}{\sqrt{2}\cdot3^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,2,3,4$ を入れると $0,\ \tfrac29,\ \tfrac4{27},\ \tfrac{10}{81}$ となり、(1) と合う。$\left(1+\sqrt2\right)^{n-1}-\left(1-\sqrt2\right)^{n-1}$ は $\sqrt2$ の整数倍なので、$p_{n}$ はちゃんと有理数になる。`,
            },
          ],
          pitfalls: [
            String.raw`状態を「駒の位置の組」で立てると $4\times4$ になって手に負えない。距離だけに潰すと2状態で済む。`,
            String.raw`$p_{1}=0$ を初期条件に使う。$p_{2},p_{3}$ から始めてもよいが、$p_{1}=0$ のほうが連立が軽い。`,
          ],
          check: String.raw`漸化式を分数のまま $n=20$ まで回した値と、この式の値の差は最大 $2.8\times10^{-17}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$2$ 以上の任意の整数 $N$ に対して $\displaystyle\sum_{m=1}^{\left[\frac{N+1}{2}\right]}p_{2m-1}<\sum_{m=1}^{\left[\frac{N}{2}\right]}p_{2m}$ が成り立つこと（このゲームが後攻に有利であること）を示す`,
          answer: String.raw`$n\geqq2$ で $p_{n}>p_{n+1}$ を示し、$p_{1}=0$ とあわせて項ごとに比べる`,
          approach: String.raw`左辺は $N$ 回以内に先攻が勝つ確率、右辺は後攻が勝つ確率である。項数は同じか左が1つ多いだけなので、$p_{2m}>p_{2m+1}$ を言えば項ごとの比較で終わる。$p_{n}$ の単調減少は閉じた式を使わなくても、$u_{n},v_{n}$ の大小から出る。`,
          blocks: [
            { k: "p", t: String.raw`**$v_{n}>u_{n}$（$n\geqq2$）。** ① より` },
            {
              k: "math",
              t: String.raw`v_{n+1}-u_{n+1}=\left(\frac{2}{3}u_{n}+\frac{1}{3}v_{n}\right)-\left(\frac{1}{3}u_{n}+\frac{1}{3}v_{n}\right)=\frac{1}{3}u_{n}`,
            },
            {
              k: "p",
              t: String.raw`である。$u_{1}=1>0$ で、$u_{n+1}=\tfrac13\left(u_{n}+v_{n}\right)$ と $u_{n},v_{n}\geqq0$ から帰納的に $u_{n}>0$（すべての $n$）なので`,
            },
            { k: "math", t: String.raw`v_{n}-u_{n}=\frac{1}{3}u_{n-1}>0\qquad\left(n\geqq2\right)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$p_{n}>p_{n+1}$（$n\geqq2$）。** ② と ① より` },
            {
              k: "math",
              t: String.raw`p_{n}-p_{n+1}=\frac{1}{3}\left(v_{n}-v_{n+1}\right)=\frac{1}{3}\left\{v_{n}-\left(\frac{2}{3}u_{n}+\frac{1}{3}v_{n}\right)\right\}=\frac{2}{9}\left(v_{n}-u_{n}\right)`,
            },
            { k: "p", t: String.raw`である。$n\geqq2$ では $v_{n}-u_{n}>0$ なので` },
            { k: "math", t: String.raw`p_{n}>p_{n+1}\qquad\left(n\geqq2\right)\qquad\cdots\text{③}` },
            { k: "p", t: String.raw`である。つまり $p_{2}>p_{3}>p_{4}>\cdots$ である。` },
            { k: "p", t: String.raw`**和の比較。** 左辺を $L$、右辺を $R$ とおく。$N$ の偶奇で場合分けする。` },
            {
              k: "p",
              t: String.raw`③ は「奇数番より1つ手前の偶数番のほうが大きい」という形なので、$p_{2m}$ と $p_{2m+1}$ を組にして比べる。`,
            },
            {
              k: "p",
              t: String.raw`**$N=2K$（$K\geqq1$）のとき。** $\left[\tfrac{N+1}{2}\right]=K$、$\left[\tfrac{N}{2}\right]=K$ なので $L=p_{1}+p_{3}+\cdots+p_{2K-1}$、$R=p_{2}+p_{4}+\cdots+p_{2K}$ である。$R$ の最後の項 $p_{2K}$ と $L$ の最初の項 $p_{1}$ を別にしてから組にすると`,
            },
            {
              k: "math",
              t: String.raw`R-L=p_{2K}-p_{1}+\sum_{m=1}^{K-1}\left(p_{2m}-p_{2m+1}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$p_{1}=0$、$p_{2K}>0$ で、③ より各 $p_{2m}-p_{2m+1}>0$ だから $R-L>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$N=2K+1$（$K\geqq1$）のとき。** $\left[\tfrac{N+1}{2}\right]=K+1$、$\left[\tfrac{N}{2}\right]=K$ なので $L=p_{1}+p_{3}+\cdots+p_{2K+1}$、$R=p_{2}+p_{4}+\cdots+p_{2K}$ である。やはり $p_{2m}$ と $p_{2m+1}$ で組にすると`,
            },
            {
              k: "math",
              t: String.raw`R-L=\sum_{m=1}^{K}\left(p_{2m}-p_{2m+1}\right)-p_{1}=\sum_{m=1}^{K}\left(p_{2m}-p_{2m+1}\right)`,
            },
            { k: "p", t: String.raw`で、③ より各項が正だから $R-L>0$ である。` },
            { k: "p", t: String.raw`いずれの場合も $L<R$、すなわち` },
            {
              k: "math",
              t: String.raw`\sum_{m=1}^{\left[\frac{N+1}{2}\right]}p_{2m-1}<\sum_{m=1}^{\left[\frac{N}{2}\right]}p_{2m}`,
            },
            { k: "p", t: String.raw`が成り立つ。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$N\to\infty$ とすると先攻の勝率は約 $0.429$、後攻は約 $0.571$ に近づく。最初の1回では決して決まらず、しかも1回振るごとに「次に決まる確率」が減っていくので、1手遅く始める後攻のほうが有利になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\left[\tfrac{N+1}{2}\right]$ と $\left[\tfrac{N}{2}\right]$ は $N$ が奇数のとき $1$ だけ違う。項数がそろわない場合を落とさない。`,
            String.raw`組にするときは $p_{2m-1}$ と $p_{2m}$ ではなく $p_{2m}$ と $p_{2m+1}$ でそろえる。前者だと不等号の向きが逆になる。`,
            String.raw`$p_{n}$ の単調減少は閉じた式から言ってもよいが、$v_{n}>u_{n}$ を示すほうが短く、根号を扱わずに済む。`,
          ],
          check: String.raw`$N=2$ から $12$ まで数値で両辺を計算すると、すべて左辺 $<$ 右辺だった（たとえば $N=12$ で $0.37923<0.53172$）。30万回のシミュレーションでも後攻の勝率が $0.571$ だった。`,
        },
      ],
    },
  ],
};
