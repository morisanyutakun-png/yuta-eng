import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2020年度（令和2年度）一般選抜 前期日程 数学（文科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 3問とも自分で解き直した。理科系の同年度とは別問題で、共通の大問はなかった。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の図。$S(a)$ が最小になる $a=\tfrac{2\sqrt3}{9}$ の例。 */
const A20 = (2 * Math.sqrt(3)) / 9;
const F20 = (x: number): number => 2 * x * x - 2 * A20 * x - A20 * A20;
const T1_20 = (A20 * (1 - Math.sqrt(3))) / 2;
const T2_20 = (A20 * (1 + Math.sqrt(3))) / 2;

/** 第2問(1) の図。和が $\vec0$ になる3つの単位ベクトル。 */
const UV20 = (k: number): [number, number] => {
  const t = Math.PI / 2 + (2 * Math.PI * k) / 3;
  return [Math.cos(t), Math.sin(t)];
};

/** 第3問の図。$n=4$ の領域 $D$ に含まれる格子点。 */
const LAT20: [number, number][] = [];
for (let x = 0; x <= 4; x += 1) {
  for (let y = 0; y <= 4 - x; y += 1) {
    LAT20.push([x, y]);
  }
}

export const nagoyaBunkei2020: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数・積分法",
      topics: ["解の配置", "絶対値つき定積分", "3次関数の増減", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を10通りとって2解 $\\dfrac{a\\left(1\\pm\\sqrt3\\right)}{2}$ を計算し、どちらも $\\left[-1,1\\right]$ に入るかどうかが $\\left|a\\right|\\leqq\\sqrt3-1$ と完全に一致した",
          "$a=-0.6,-0.2,0,0.2,0.3849,0.6,0.73$ で $\\int_{-1}^{1}\\left|f\\right|dx$ を数値積分すると $2\\sqrt3\\left|a\\right|^{3}-2a^{2}+\\dfrac43$ と小数9桁まで一致した",
          "$a$ を $5\\times10^{-6}$ 刻みで動かすと最小は $a=0.384900$ での $1.2345679012$ で、$\\dfrac{2\\sqrt3}{9}=0.384900$、$\\dfrac{100}{81}=1.2345679012$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数、$f(x)=2x^{2}-2ax-a^{2}$ とするとき、方程式 $f(x)=0$ の解 $t$ が必ず $-1\leqq t\leqq1$ を満たすための $a$ の条件を求める`,
          answer: String.raw`$-\left(\sqrt{3}-1\right)\leqq a\leqq\sqrt{3}-1$`,
          approach: String.raw`この2次方程式は解の公式がきれいに出る（判別式が $a$ の平方の定数倍）ので、解を直接書き下して評価するのがいちばん早い。解の配置の3条件（判別式・軸・端点の値）で解いてもよい。`,
          blocks: [
            { k: "p", t: String.raw`判別式を4で割ったものは` },
            { k: "math", t: String.raw`\frac{D}{4}=a^{2}+2a^{2}=3a^{2}\geqq0` },
            { k: "p", t: String.raw`なので、実数解はつねに存在する。解の公式から` },
            {
              k: "math",
              t: String.raw`t=\frac{2a\pm\sqrt{12a^{2}}}{4}=\frac{2a\pm2\sqrt{3}\left|a\right|}{4}=\frac{a\pm\sqrt{3}\left|a\right|}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$a\geqq0$ でも $a<0$ でも、2解の集合は $\left\{\dfrac{\left(1-\sqrt3\right)a}{2},\ \dfrac{\left(1+\sqrt3\right)a}{2}\right\}$ になる。それぞれの絶対値は`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(\sqrt{3}-1\right)\left|a\right|}{2},\qquad\frac{\left(\sqrt{3}+1\right)\left|a\right|}{2}`,
            },
            { k: "p", t: String.raw`で、後者のほうが大きい。したがって「2解とも $\left[-1,1\right]$ に入る」条件は` },
            {
              k: "math",
              t: String.raw`\frac{\left(\sqrt{3}+1\right)\left|a\right|}{2}\leqq1,\qquad\text{すなわち}\quad\left|a\right|\leqq\frac{2}{\sqrt{3}+1}`,
            },
            { k: "p", t: String.raw`である。有理化すると $\dfrac{2}{\sqrt3+1}=\dfrac{2\left(\sqrt3-1\right)}{2}=\sqrt3-1$ なので、求める条件は` },
            { k: "math", t: String.raw`-\left(\sqrt{3}-1\right)\leqq a\leqq\sqrt{3}-1` },
            { k: "p", t: String.raw`である（$\sqrt3-1=0.732\cdots$）。` },
            {
              k: "note",
              t: String.raw`解の配置で解くなら、$f(1)\geqq0$ から $-1-\sqrt3\leqq a\leqq\sqrt3-1$、$f(-1)\geqq0$ から $1-\sqrt3\leqq a\leqq1+\sqrt3$、軸 $x=\dfrac a2$ が $\left[-1,1\right]$ にあることから $-2\leqq a\leqq2$ となり、共通部分は同じ $1-\sqrt3\leqq a\leqq\sqrt3-1$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\sqrt{12a^{2}}=2\sqrt3\left|a\right|$ で、$2\sqrt3\,a$ ではない。$a$ の符号で場合分けしてもよいが、結局同じ条件になる。`,
            String.raw`$a=0$ のとき解は $t=0$（重解）で、これも条件を満たす。等号を外さない。`,
          ],
          check: String.raw`$a=0.73\ (<\sqrt3-1)$ では解が $-0.267199,\ 0.997199$ で区間内、$a=0.8$ では $1.092820$ が外に出た。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の条件を満たす $a$ に対し $S(a)=\displaystyle\int_{-1}^{1}\left|f(x)\right|dx$ を求める`,
          answer: String.raw`$S(a)=2\sqrt{3}\left|a\right|^{3}-2a^{2}+\dfrac{4}{3}$`,
          approach: String.raw`絶対値は「符号が変わるところで区間を切る」のが基本だが、ここでは2解がともに $\left[-1,1\right]$ の中にあるので、$\displaystyle\int_{-1}^{1}\left|f\right|=\int_{-1}^{1}f-2\int_{t_{1}}^{t_{2}}f$ と書ける。後ろの積分は $\tfrac16$ 公式で一発である。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "a = 2√3/9 のときの y = f(x)。2つの解は -1 と 1 のあいだにあり、網かけの3つの部分の面積の合計が S(a)。",
                view: [-1.75, 1.75, -0.3, 2.75],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fillBetween", top: F20, bottom: () => 0, from: -1, to: T1_20 },
                  { k: "fillBetween", top: () => 0, bottom: F20, from: T1_20, to: T2_20 },
                  { k: "fillBetween", top: F20, bottom: () => 0, from: T2_20, to: 1 },
                  { k: "curve", f: F20, from: -1.02, to: 1.25 },
                  { k: "seg", a: [-1, 0], b: [-1, 2.6], dash: true },
                  { k: "seg", a: [1, 0], b: [1, 1.1], dash: true },
                  { k: "dot", at: [T1_20, 0], label: "t₁", place: "below-left" },
                  { k: "dot", at: [T2_20, 0], label: "t₂", place: "below-right" },
                  { k: "text", at: [-1, 2.6], label: "x = -1", place: "above" },
                  { k: "text", at: [1, 1.1], label: "x = 1", place: "above" },
                  { k: "text", at: [1.25, 2.0], label: "y = f(x)", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`2解を $t_{1}\leqq t_{2}$ とすると、(1) の条件より $-1\leqq t_{1}\leqq t_{2}\leqq1$ である。$f$ は下に凸なので $t_{1}\leqq x\leqq t_{2}$ で $f\leqq0$、それ以外で $f\geqq0$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`S(a)=\int_{-1}^{1}\left|f\right|dx=\int_{-1}^{1}f\,dx-2\int_{t_{1}}^{t_{2}}f\,dx`,
            },
            {
              k: "p",
              t: String.raw`と書ける（負の部分だけ符号を反転させるので、全体の積分から負の部分を2回引く）。`,
            },
            { k: "p", t: String.raw`**第1項。** 奇関数の項は消えて` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\left(2x^{2}-2ax-a^{2}\right)dx=2\cdot\frac{2}{3}-0-2a^{2}=\frac{4}{3}-2a^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**第2項。** $f(x)=2\left(x-t_{1}\right)\left(x-t_{2}\right)$ なので、$\tfrac16$ 公式から` },
            {
              k: "math",
              t: String.raw`\int_{t_{1}}^{t_{2}}f\,dx=-\frac{2}{6}\left(t_{2}-t_{1}\right)^{3}=-\frac{\left(t_{2}-t_{1}\right)^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。(1) より2解の差は` },
            {
              k: "math",
              t: String.raw`t_{2}-t_{1}=\frac{\left(\sqrt{3}+1\right)\left|a\right|}{2}+\frac{\left(\sqrt{3}-1\right)\left|a\right|}{2}=\sqrt{3}\left|a\right|`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int_{t_{1}}^{t_{2}}f\,dx=-\frac{3\sqrt{3}\left|a\right|^{3}}{3}=-\sqrt{3}\left|a\right|^{3}`,
            },
            { k: "p", t: String.raw`である。以上から` },
            {
              k: "math",
              t: String.raw`S(a)=\left(\frac{4}{3}-2a^{2}\right)+2\sqrt{3}\left|a\right|^{3}=2\sqrt{3}\left|a\right|^{3}-2a^{2}+\frac{4}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=0$ では $S=\dfrac43$ で、$\displaystyle\int_{-1}^{1}2x^{2}dx=\dfrac43$ と合う。$S$ は $a$ の偶関数（$\left|a\right|$ しか出てこない）である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|a\right|^{3}$ であって $a^{3}$ ではない。$a<0$ でも $t_{2}-t_{1}>0$ だからである。`,
            String.raw`$\tfrac16$ 公式の係数は $x^{2}$ の係数 $2$。$\dfrac{2}{6}\left(t_{2}-t_{1}\right)^{3}$ である。`,
          ],
          check: String.raw`$a=0.73$ で数値積分すると $1.6151277516$、式の値は $1.6151277513$ で一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$S(a)$ の値が最小となる $a$ を求める`,
          answer: String.raw`$a=\pm\dfrac{2\sqrt{3}}{9}$（このとき $S=\dfrac{100}{81}$）`,
          approach: String.raw`$S$ は偶関数なので $a\geqq0$ で考えれば十分。$a\geqq0$ では $S=2\sqrt3a^{3}-2a^{2}+\tfrac43$ という3次関数なので、微分して増減を見る。極小を与える $a$ が (1) の範囲に入っていることを確かめる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S(-a)=S(a)$ なので $0\leqq a\leqq\sqrt3-1$ で考えればよい。この範囲では`,
            },
            { k: "math", t: String.raw`S(a)=2\sqrt{3}a^{3}-2a^{2}+\frac{4}{3}` },
            { k: "p", t: String.raw`で、微分すると` },
            {
              k: "math",
              t: String.raw`S'(a)=6\sqrt{3}a^{2}-4a=2a\left(3\sqrt{3}a-2\right)`,
            },
            { k: "p", t: String.raw`である。$S'(a)=0$ となるのは $a=0$ と` },
            {
              k: "math",
              t: String.raw`a=\frac{2}{3\sqrt{3}}=\frac{2\sqrt{3}}{9}=0.3849\cdots`,
            },
            {
              k: "p",
              t: String.raw`である。$0<a<\dfrac{2\sqrt3}{9}$ では $S'<0$、$a>\dfrac{2\sqrt3}{9}$ では $S'>0$ なので、$a=\dfrac{2\sqrt3}{9}$ で最小になる。これは $\sqrt3-1=0.732\cdots$ より小さいので (1) の範囲に入っている。`,
            },
            { k: "p", t: String.raw`そのときの値は、$\left(\dfrac{2\sqrt3}{9}\right)^{2}=\dfrac{4}{27}$、$\left(\dfrac{2\sqrt3}{9}\right)^{3}=\dfrac{2\sqrt3}{9}\cdot\dfrac{4}{27}=\dfrac{8\sqrt3}{243}$ から` },
            {
              k: "math",
              t: String.raw`S=2\sqrt{3}\cdot\frac{8\sqrt{3}}{243}-2\cdot\frac{4}{27}+\frac{4}{3}=\frac{48}{243}-\frac{8}{27}+\frac{4}{3}=\frac{16}{81}-\frac{24}{81}+\frac{108}{81}=\frac{100}{81}`,
            },
            { k: "p", t: String.raw`である。偶関数なので、$a<0$ 側にも同じ最小値を与える点があり、答えは` },
            { k: "math", t: String.raw`a=\pm\frac{2\sqrt{3}}{9}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\left|a\right|$ が入っているので、そのまま微分しない。偶関数であることを使って $a\geqq0$ に限ってから微分する。`,
            String.raw`答えは2つある。$a=\dfrac{2\sqrt3}{9}$ だけで止めない。`,
            String.raw`極小を与える $a$ が (1) の範囲 $\left[-\left(\sqrt3-1\right),\sqrt3-1\right]$ に入るかを確かめる。外れていれば端点が最小になる。`,
          ],
          check: String.raw`$a$ を $5\times10^{-6}$ 刻みで動かすと最小は $a=0.384900$ での $1.2345679012$ で、$\dfrac{2\sqrt3}{9}=0.3849001795$、$\dfrac{100}{81}=1.2345679012$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["単位ベクトルの和", "内積", "垂線の足と外心", "正四面体"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "和が $\\vec0$ になる単位ベクトル3組を2万通り作り、3辺がつねに等しく $\\sqrt3$ になることを確かめた（反例 0 件）",
          "球面上の正三角形を2万通り作り、$\\left|\\overrightarrow{\\mathrm{OA}}+\\overrightarrow{\\mathrm{OB}}+\\overrightarrow{\\mathrm{OC}}\\right|=3\\left|\\overrightarrow{\\mathrm{OH}}\\right|$ が成り立つことを確かめた",
          "$\\left|\\overrightarrow{\\mathrm{OH}}\\right|=\\tfrac13$ の配置で $\\mathrm{D}$ を $-3\\overrightarrow{\\mathrm{OH}}$ にとると、$\\left|\\overrightarrow{\\mathrm{OA}}+\\overrightarrow{\\mathrm{OB}}+\\overrightarrow{\\mathrm{OC}}+\\overrightarrow{\\mathrm{OD}}\\right|=3.6\\times10^{-16}$、6辺がすべて $1.632993162=\\tfrac{2\\sqrt6}{3}$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上に $\left|\overrightarrow{\mathrm{OP}}\right|=\left|\overrightarrow{\mathrm{OQ}}\right|=\left|\overrightarrow{\mathrm{OR}}\right|=1$ をみたす相異なる4点 $\mathrm{O},\mathrm{P},\mathrm{Q},\mathrm{R}$ があるとき、$\left|\overrightarrow{\mathrm{OP}}+\overrightarrow{\mathrm{OQ}}+\overrightarrow{\mathrm{OR}}\right|=0$ ならば三角形 $\mathrm{PQR}$ は正三角形であることを示す`,
          answer: String.raw`$\vec{p}+\vec{q}+\vec{r}=\vec{0}$ から $\vec{p}\cdot\vec{q}=\vec{q}\cdot\vec{r}=\vec{r}\cdot\vec{p}=-\tfrac12$ となり、3辺がすべて $\sqrt3$`,
          approach: String.raw`1つのベクトルを残り2つで表して長さを取る、という2行で内積が決まる。あとは $\left|\vec{q}-\vec{p}\right|^{2}=2-2\vec{p}\cdot\vec{q}$ に入れるだけである。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "長さ1のベクトル3本の和が 0 になるのは、互いに 120° ずつ向きが違うとき。先端 P, Q, R は単位円に内接する正三角形になる。",
                view: [-1.45, 1.45, -1.28, 1.28],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI, faint: true },
                  { k: "seg", a: UV20(0), b: UV20(1) },
                  { k: "seg", a: UV20(1), b: UV20(2) },
                  { k: "seg", a: UV20(2), b: UV20(0) },
                  { k: "seg", a: [0, 0], b: UV20(0) },
                  { k: "seg", a: [0, 0], b: UV20(1) },
                  { k: "seg", a: [0, 0], b: UV20(2) },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: UV20(0), label: "P", place: "above" },
                  { k: "dot", at: UV20(1), label: "Q", place: "below-left" },
                  { k: "dot", at: UV20(2), label: "R", place: "below-right" },
                ],
              },
            },
            { k: "p", t: String.raw`$\vec{p}=\overrightarrow{\mathrm{OP}}$、$\vec{q}=\overrightarrow{\mathrm{OQ}}$、$\vec{r}=\overrightarrow{\mathrm{OR}}$ とおく。仮定は $\left|\vec{p}\right|=\left|\vec{q}\right|=\left|\vec{r}\right|=1$ と $\vec{p}+\vec{q}+\vec{r}=\vec{0}$ である。` },
            { k: "p", t: String.raw`$\vec{r}=-\left(\vec{p}+\vec{q}\right)$ の両辺の長さの2乗を取ると` },
            {
              k: "math",
              t: String.raw`1=\left|\vec{p}+\vec{q}\right|^{2}=\left|\vec{p}\right|^{2}+2\vec{p}\cdot\vec{q}+\left|\vec{q}\right|^{2}=2+2\vec{p}\cdot\vec{q}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\vec{p}\cdot\vec{q}=-\frac{1}{2}` },
            { k: "p", t: String.raw`である。$\vec{p},\vec{q},\vec{r}$ の役割は対称なので、同じ計算で` },
            {
              k: "math",
              t: String.raw`\vec{q}\cdot\vec{r}=\vec{r}\cdot\vec{p}=-\frac{1}{2}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}^{2}=\left|\vec{q}-\vec{p}\right|^{2}=1-2\left(-\frac{1}{2}\right)+1=3`,
            },
            { k: "p", t: String.raw`で、同様に $\mathrm{QR}^{2}=\mathrm{RP}^{2}=3$ である。3辺がすべて $\sqrt3$ で等しいので、三角形 $\mathrm{PQR}$ は正三角形である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\vec{p}\cdot\vec{q}=-\tfrac12$ は、なす角が $120^{\circ}$ ということである。3本の単位ベクトルが $120^{\circ}$ ずつ開いている、という図のとおりの結論になる。`,
            },
          ],
          pitfalls: [
            String.raw`「相異なる4点」という条件から $\mathrm{P},\mathrm{Q},\mathrm{R}$ は相異なるが、実は $\vec{p}\cdot\vec{q}=-\tfrac12$ 自体が $\vec{p}\neq\vec{q}$ を保証している。`,
          ],
          check: String.raw`和が $\vec0$ になる単位ベクトル3組を2万通り作ると、3辺はつねに $\sqrt3$ で等しかった。`,
        },
        {
          label: "(2)",
          task: String.raw`空間内に $\left|\overrightarrow{\mathrm{OA}}\right|=\left|\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OC}}\right|=\left|\overrightarrow{\mathrm{OD}}\right|=1$ をみたす相異なる5点があり、$\mathrm{O}$ から平面 $\mathrm{ABC}$ に下ろした垂線の足を $\mathrm{H}$ とする。命題(i)「$\left|\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}\right|=3\left|\overrightarrow{\mathrm{OH}}\right|$ ならば三角形 $\mathrm{ABC}$ は正三角形」と、命題(ii)「$\left|\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}+\overrightarrow{\mathrm{OD}}\right|=0$ かつ $\left|\overrightarrow{\mathrm{OH}}\right|=\tfrac13$ ならば四面体 $\mathrm{ABCD}$ は正四面体」を示す`,
          answer: String.raw`$\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}=3\overrightarrow{\mathrm{OH}}+\left(\overrightarrow{\mathrm{HA}}+\overrightarrow{\mathrm{HB}}+\overrightarrow{\mathrm{HC}}\right)$ と直交分解し、(1) を $\mathrm{H}$ を中心として使う`,
          approach: String.raw`$\mathrm{H}$ は $\mathrm{A},\mathrm{B},\mathrm{C}$ から等距離（三角形 $\mathrm{ABC}$ の外心）である。$\overrightarrow{\mathrm{OX}}=\overrightarrow{\mathrm{OH}}+\overrightarrow{\mathrm{HX}}$ と分けると、$\overrightarrow{\mathrm{OH}}$ と $\overrightarrow{\mathrm{HX}}$ は直交するので、長さの2乗が「縦の成分」と「横の成分」にきれいに分かれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**準備。$\mathrm{H}$ は外心。** $\overrightarrow{\mathrm{OH}}$ は平面 $\mathrm{ABC}$ に垂直なので、$\mathrm{X}=\mathrm{A},\mathrm{B},\mathrm{C}$ について $\overrightarrow{\mathrm{OH}}\perp\overrightarrow{\mathrm{HX}}$ である。三平方の定理から`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{HX}}\right|^{2}=\left|\overrightarrow{\mathrm{OX}}\right|^{2}-\left|\overrightarrow{\mathrm{OH}}\right|^{2}=1-\left|\overrightarrow{\mathrm{OH}}\right|^{2}`,
            },
            {
              k: "p",
              t: String.raw`なので、$\mathrm{HA}=\mathrm{HB}=\mathrm{HC}$ である。この共通の値を $R$ とおく。$\mathrm{A},\mathrm{B},\mathrm{C}$ は相異なるので $R>0$ である。`,
            },
            { k: "p", t: String.raw`**直交分解。** $\vec{h}=\overrightarrow{\mathrm{OH}}$、$\vec{u}=\overrightarrow{\mathrm{HA}}+\overrightarrow{\mathrm{HB}}+\overrightarrow{\mathrm{HC}}$ とおく。$\overrightarrow{\mathrm{OX}}=\vec{h}+\overrightarrow{\mathrm{HX}}$ を3つ足して` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}=3\vec{h}+\vec{u}`,
            },
            { k: "p", t: String.raw`である。$\vec{u}$ は平面 $\mathrm{ABC}$ に平行なので $\vec{h}\perp\vec{u}$ であり` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}\right|^{2}=9\left|\vec{h}\right|^{2}+\left|\vec{u}\right|^{2}\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`が成り立つ。` },
            { k: "p", t: String.raw`**命題(i)。** 仮定 $\left|\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}\right|=3\left|\vec{h}\right|$ を ① に入れると` },
            { k: "math", t: String.raw`9\left|\vec{h}\right|^{2}=9\left|\vec{h}\right|^{2}+\left|\vec{u}\right|^{2}` },
            { k: "p", t: String.raw`なので $\vec{u}=\vec{0}$、すなわち` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{HA}}+\overrightarrow{\mathrm{HB}}+\overrightarrow{\mathrm{HC}}=\vec{0}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\overrightarrow{\mathrm{HA}}\right|=\left|\overrightarrow{\mathrm{HB}}\right|=\left|\overrightarrow{\mathrm{HC}}\right|=R>0$ なので、各ベクトルを $R$ で割れば長さ1の3本のベクトルの和が $\vec0$ になる。これは平面 $\mathrm{ABC}$ の中での話だから、(1) がそのまま使えて三角形 $\mathrm{ABC}$ は正三角形である。$\blacksquare$`,
            },
            {
              k: "p",
              t: String.raw`**命題(ii)。** $\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}+\overrightarrow{\mathrm{OD}}=\vec0$ より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}=-\overrightarrow{\mathrm{OD}},\qquad\left|\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}\right|=1`,
            },
            { k: "p", t: String.raw`である。$\left|\vec{h}\right|=\tfrac13$ とあわせて ① に入れると` },
            { k: "math", t: String.raw`1=9\cdot\frac{1}{9}+\left|\vec{u}\right|^{2}=1+\left|\vec{u}\right|^{2}` },
            {
              k: "p",
              t: String.raw`なので $\vec{u}=\vec0$ である。よって命題(i) の議論から三角形 $\mathrm{ABC}$ は正三角形で、しかも`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=-\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}\right)=-3\vec{h}`,
            },
            {
              k: "p",
              t: String.raw`である。つまり $\mathrm{D}$ は、$\mathrm{O}$ から平面 $\mathrm{ABC}$ に下ろした垂線の反対向きに $3\left|\vec{h}\right|=1$ だけ進んだ点である。`,
            },
            { k: "p", t: String.raw`**辺の長さ。** $R^{2}=1-\left|\vec{h}\right|^{2}=1-\dfrac19=\dfrac89$ である。正三角形の外接円の半径が $R$ なら1辺は $\sqrt3R$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{AB}=\mathrm{BC}=\mathrm{CA}=\sqrt{3}\cdot\frac{2\sqrt{2}}{3}=\frac{2\sqrt{6}}{3}`,
            },
            { k: "p", t: String.raw`である。一方 $\overrightarrow{\mathrm{DA}}=\overrightarrow{\mathrm{OA}}-\overrightarrow{\mathrm{OD}}=\left(\vec{h}+\overrightarrow{\mathrm{HA}}\right)+3\vec{h}=4\vec{h}+\overrightarrow{\mathrm{HA}}$ で、$\vec{h}\perp\overrightarrow{\mathrm{HA}}$ だから` },
            {
              k: "math",
              t: String.raw`\mathrm{DA}^{2}=16\left|\vec{h}\right|^{2}+R^{2}=\frac{16}{9}+\frac{8}{9}=\frac{24}{9}=\frac{8}{3}`,
            },
            { k: "p", t: String.raw`すなわち $\mathrm{DA}=\sqrt{\dfrac83}=\dfrac{2\sqrt{6}}{3}$ である。$\mathrm{DB},\mathrm{DC}$ も同じである。よって6辺がすべて $\dfrac{2\sqrt6}{3}$ で等しく、四面体 $\mathrm{ABCD}$ は正四面体である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$\mathrm{H}$ が三角形 $\mathrm{ABC}$ の外心であることを最初に言う。$\mathrm{O}$ から等距離の3点を平面に落とすので当然だが、これがないと $R$ が共通だと言えない。`,
            String.raw`直交分解 ① が議論の中心。「縦（$\vec{h}$ 方向）」と「横（平面内）」が直交するので、長さの2乗が足し算になる。`,
            String.raw`(ii) では三角形 $\mathrm{ABC}$ が正三角形であることだけでは足りない。$\mathrm{D}$ の位置（$-3\vec{h}$）まで決めて6辺を比べる。`,
          ],
          check: String.raw`$\left|\overrightarrow{\mathrm{OH}}\right|=\tfrac13$ の配置で $\mathrm{D}=-3\overrightarrow{\mathrm{OH}}$ ととると、4本のベクトルの和の大きさが $3.6\times10^{-16}$、6辺がすべて $1.632993162=\dfrac{2\sqrt6}{3}$ になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "場合の数",
      topics: ["格子点の数え上げ", "長方形の数え方", "和の計算", "積の形への因数分解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $12$ まで4重ループで総当たりし、$R(n)=\\dfrac{(n-1)n(n+1)(n+2)}{24}$、$S(n)=\\dfrac{(n-1)n(n+1)}{6}$ と完全に一致した",
          "$R(3)=5,\\ R(4)=15,\\ S(3)=4,\\ S(4)=10$",
          "$R(n)=1001$ となる $n$ は $1\\leqq n\\leqq59$ の範囲で $n=12$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x\geqq0,\ y\geqq0,\ x+y\leqq n$ で定まる領域を $D$ とし、4つの頂点がすべて $D$ に含まれる格子点で $x$ 軸と平行な辺をもつ長方形の数を $R(n)$ とするとき、$R(3)$ と $R(4)$ を求める`,
          answer: String.raw`$R(3)=5$、$R(4)=15$`,
          approach: String.raw`長方形は「左右の $x$ 座標の組 $x_{1}<x_{2}$」と「上下の $y$ 座標の組 $y_{1}<y_{2}$」で決まる。4頂点がすべて $D$ に入る条件は、右上の頂点 $(x_{2},y_{2})$ だけ見れば足りる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "n = 4 のときの領域 D と、その中の15個の格子点。網かけは長方形の一例（x1 = 0, x2 = 2, y1 = 1, y2 = 2）。",
                view: [-0.9, 5.1, -0.65, 4.65],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 1], [2, 1], [2, 2], [0, 2]] },
                  { k: "seg", a: [0, 0], b: [4, 0] },
                  { k: "seg", a: [0, 0], b: [0, 4] },
                  { k: "seg", a: [4, 0], b: [0, 4] },
                  ...LAT20.map((q) => ({ k: "dot" as const, at: q })),
                  { k: "text", at: [2.6, 1.9], label: "x + y = 4", place: "above-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**条件の整理。** 求める長方形は、$x$ 軸に平行な辺をもつので $y$ 軸にも平行な辺をもつ。したがって整数 $x_{1}<x_{2}$、$y_{1}<y_{2}$ を使って4頂点が`,
            },
            {
              k: "math",
              t: String.raw`\left(x_{1},y_{1}\right),\ \left(x_{2},y_{1}\right),\ \left(x_{1},y_{2}\right),\ \left(x_{2},y_{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`と書ける。4頂点が $D$ に入る条件は $x_{1}\geqq0$、$y_{1}\geqq0$ と、$x_{i}+y_{j}\leqq n$ が4通りすべてで成り立つことだが、$x_{1}<x_{2}$、$y_{1}<y_{2}$ なので左辺が最大になるのは右上の頂点である。よって条件は`,
            },
            {
              k: "math",
              t: String.raw`0\leqq x_{1}<x_{2},\qquad0\leqq y_{1}<y_{2},\qquad x_{2}+y_{2}\leqq n`,
            },
            { k: "p", t: String.raw`だけでよい。$x_{2}\geqq1$、$y_{2}\geqq1$ も自動的に従う。` },
            {
              k: "p",
              t: String.raw`**数える。** 右上の頂点 $\left(x_{2},y_{2}\right)$ を固定すると、$x_{1}$ は $0,1,\dots,x_{2}-1$ の $x_{2}$ 通り、$y_{1}$ は $y_{2}$ 通りである。よって`,
            },
            {
              k: "math",
              t: String.raw`R(n)=\sum_{x_{2}=1}^{n-1}\ \sum_{y_{2}=1}^{n-x_{2}}x_{2}\,y_{2}`,
            },
            { k: "p", t: String.raw`である。$n=3$ では` },
            {
              k: "steps",
              items: [
                String.raw`$x_{2}=1$：$y_{2}=1,2$ で $1\cdot1+1\cdot2=3$`,
                String.raw`$x_{2}=2$：$y_{2}=1$ で $2\cdot1=2$`,
              ],
            },
            { k: "math", t: String.raw`R(3)=3+2=5` },
            { k: "p", t: String.raw`である。$n=4$ では` },
            {
              k: "steps",
              items: [
                String.raw`$x_{2}=1$：$1\cdot\left(1+2+3\right)=6$`,
                String.raw`$x_{2}=2$：$2\cdot\left(1+2\right)=6$`,
                String.raw`$x_{2}=3$：$3\cdot1=3$`,
              ],
            },
            { k: "math", t: String.raw`R(4)=6+6+3=15` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`4頂点すべてを調べる必要はない。$x+y$ がいちばん大きいのは右上の頂点なので、そこだけで足りる。`,
            String.raw`$x_{1}$ の個数は $x_{2}$ 通り（$0$ から $x_{2}-1$）。$x_{2}+1$ 通りではない。`,
          ],
          check: String.raw`4重ループの総当たりで $R(3)=5$、$R(4)=15$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$R(n)$ のうち特に1つの辺が $x$ 軸上にある長方形の数を $S(n)$ とするとき、$S(n)$ を求める`,
          answer: String.raw`$S(n)=\dfrac{\left(n-1\right)n\left(n+1\right)}{6}$`,
          approach: String.raw`$y_{1}=0$ に固定するだけ。すると $y_{1}$ の選び方が1通りになり、和が1重になる。$\sum k$ と $\sum k^{2}$ の公式で closed form になる。`,
          blocks: [
            { k: "p", t: String.raw`1つの辺が $x$ 軸上にあるのは $y_{1}=0$ のときである。(1) の数え方で $y_{1}$ の選び方が1通りに固定されるので` },
            {
              k: "math",
              t: String.raw`S(n)=\sum_{x_{2}=1}^{n-1}\ \sum_{y_{2}=1}^{n-x_{2}}x_{2}=\sum_{k=1}^{n-1}k\left(n-k\right)`,
            },
            { k: "p", t: String.raw`である（$x_{2}=k$ とおいた。$y_{2}$ は $1$ から $n-k$ までの $n-k$ 通り）。計算すると` },
            {
              k: "math",
              t: String.raw`S(n)=n\sum_{k=1}^{n-1}k-\sum_{k=1}^{n-1}k^{2}=n\cdot\frac{\left(n-1\right)n}{2}-\frac{\left(n-1\right)n\left(2n-1\right)}{6}`,
            },
            { k: "p", t: String.raw`で、$\dfrac{\left(n-1\right)n}{6}$ でくくると` },
            {
              k: "math",
              t: String.raw`S(n)=\frac{\left(n-1\right)n}{6}\left\{3n-\left(2n-1\right)\right\}=\frac{\left(n-1\right)n\left(n+1\right)}{6}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$S(3)=\dfrac{2\cdot3\cdot4}{6}=4$、$S(4)=\dfrac{3\cdot4\cdot5}{6}=10$ である。$S(n)={}_{n+1}\mathrm{C}_{3}$ という形でもある。`,
            },
          ],
          pitfalls: [
            String.raw`$y_{1}=0$ に固定しても $y_{2}$ は動く。$y_{2}$ の個数 $n-x_{2}$ を落とさない。`,
          ],
          check: String.raw`総当たりで $S(1)\sim S(12)$ を数えると $0,1,4,10,20,35,56,84,120,165,220,286$ で、式の値と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$R(n)$ を求める`,
          answer: String.raw`$R(n)=\dfrac{\left(n-1\right)n\left(n+1\right)\left(n+2\right)}{24}$`,
          approach: String.raw`下の辺の高さ $y_{1}=j$ で分類する。$j$ だけ下にずらすと、領域はちょうど $D$ の $n$ を $n-j$ に取り替えたものになり、その中で「下の辺が $x$ 軸上」の長方形を数えることになる。つまり (2) の $S$ の和になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`下の辺の高さ $y_{1}=j$（$0\leqq j\leqq n$）で場合分けする。$y_{1}=j$ の長方形は、$x_{2}+y_{2}\leqq n$ かつ $j<y_{2}$ を満たすものである。$y'=y-j$ と平行移動すると、条件は`,
            },
            {
              k: "math",
              t: String.raw`0\leqq x_{1}<x_{2},\qquad 0=y_{1}'<y_{2}',\qquad x_{2}+y_{2}'\leqq n-j`,
            },
            {
              k: "p",
              t: String.raw`となり、これは「$n$ を $n-j$ に取り替えた領域で、下の辺が $x$ 軸上にある長方形」の条件そのものである。よってその個数は $S(n-j)$ で`,
            },
            {
              k: "math",
              t: String.raw`R(n)=\sum_{j=0}^{n}S\left(n-j\right)=\sum_{m=1}^{n}S(m)`,
            },
            { k: "p", t: String.raw`である（$S(0)=0$ なので $m=0$ の項は落とした）。(2) より $S(m)=\dfrac{m^{3}-m}{6}$ だから` },
            {
              k: "math",
              t: String.raw`R(n)=\frac{1}{6}\left(\sum_{m=1}^{n}m^{3}-\sum_{m=1}^{n}m\right)=\frac{1}{6}\left\{\left(\frac{n\left(n+1\right)}{2}\right)^{2}-\frac{n\left(n+1\right)}{2}\right\}`,
            },
            { k: "p", t: String.raw`である。$T=\dfrac{n\left(n+1\right)}{2}$ とおくと $R(n)=\dfrac{T\left(T-1\right)}{6}$ で` },
            {
              k: "math",
              t: String.raw`T-1=\frac{n^{2}+n-2}{2}=\frac{\left(n-1\right)\left(n+2\right)}{2}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`R(n)=\frac{1}{6}\cdot\frac{n\left(n+1\right)}{2}\cdot\frac{\left(n-1\right)\left(n+2\right)}{2}=\frac{\left(n-1\right)n\left(n+1\right)\left(n+2\right)}{24}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$R(n)={}_{n+2}\mathrm{C}_{4}$ という形になっている。$R(3)=\dfrac{2\cdot3\cdot4\cdot5}{24}=5$、$R(4)=\dfrac{3\cdot4\cdot5\cdot6}{24}=15$ で (1) と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$j$ だけ平行移動すると「同じ形の小さい問題」になる、という見方が要。直接2重和を計算してもできるが、$\sum x_{2}y_{2}$ の計算が重くなる。`,
            String.raw`$T\left(T-1\right)$ の形にまとめると、$T-1$ が $\dfrac{\left(n-1\right)\left(n+2\right)}{2}$ と因数分解できて見通しがよい。`,
          ],
          check: String.raw`総当たりで $R(1)\sim R(12)$ を数えると $0,1,5,15,35,70,126,210,330,495,715,1001$ で、式の値と完全に一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$R(n)=1001$ となる $n$ を求める`,
          answer: String.raw`$n=12$`,
          approach: String.raw`$1001=7\cdot11\cdot13$ に素因数分解してから $\left(n-1\right)n\left(n+1\right)\left(n+2\right)=24024$ を見ると、連続4整数の積として $11\cdot12\cdot13\cdot14$ が見える。$R$ は $n$ について増加するので、答えは1つだけである。`,
          blocks: [
            { k: "p", t: String.raw`(3) より` },
            {
              k: "math",
              t: String.raw`\frac{\left(n-1\right)n\left(n+1\right)\left(n+2\right)}{24}=1001`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(n-1\right)n\left(n+1\right)\left(n+2\right)=24\cdot1001=24024`,
            },
            {
              k: "p",
              t: String.raw`である。左辺は連続する4つの整数の積で、$n$ が $1$ 以上の範囲で増加する。$24024$ の4乗根はおよそ $12.4$ なので $n+1$ あたりが $12$ 前後と見当をつけると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=11$：$10\cdot11\cdot12\cdot13=17160$（小さい）`,
                String.raw`$n=12$：$11\cdot12\cdot13\cdot14=132\cdot182=24024$（一致）`,
                String.raw`$n=13$：$12\cdot13\cdot14\cdot15=32760$（大きい）`,
              ],
            },
            { k: "p", t: String.raw`となるので` },
            { k: "math", t: String.raw`n=12` },
            { k: "p", t: String.raw`である。左辺が増加関数なので、これ以外に解はない。` },
            {
              k: "note",
              t: String.raw`$1001=7\cdot11\cdot13$ なので $24024=2^{3}\cdot3\cdot7\cdot11\cdot13$ である。$11$ と $13$ が因数に入っていることから、連続4整数のうち2つが $11,13$、つまり $11,12,13,14$ だと当たりがつく。`,
            },
          ],
          pitfalls: [
            String.raw`$1001$ を素因数分解してから考える。$7\cdot11\cdot13$ は覚えておくと速い。`,
            String.raw`解が1つだけであることに触れる。左辺が $n$ について増加することを言えばよい。`,
          ],
          check: String.raw`$1\leqq n\leqq59$ で $R(n)$ を計算すると、$1001$ になるのは $n=12$ だけだった。`,
        },
      ],
    },
  ],
};
