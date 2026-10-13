import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2021年度（令和3年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の領域。横軸 $a$、縦軸 $b$。境界は $a=0$（$b\geqq0$）と放物線 $a=\tfrac{b^{2}}{4}$（$b<0$）。 */
const REG1X: [number, number][] = [
  [0, 3.5],
  [0, 0],
  ...Array.from({ length: 36 }, (_, i): [number, number] => {
    const b = -(3.5 * i) / 35;
    return [(b * b) / 4, b];
  }),
  [6, -3.5],
  [6, 3.5],
];

/** 第4問の図。$y=x^{3}-2x$ と、線分 PS の通過領域。 */
const C4X = (x: number): number => x ** 3 - 2 * x;
const S4X = (x: number): number => -8 * x ** 3 + 7 * x;
const REG4X: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = -2 + i / 40;
    return [x, C4X(x)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = -1 + i / 80;
    return [x, S4X(x)];
  }),
];

export const tohokuRikei2021: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数",
      topics: ["解の配置", "判別式", "領域の図示", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)$ を $0.01$ 刻みで $72$ 万点とり、$ax^{2}+bx+1=0$ が正の解をもつかどうかを数値で判定すると、「$a\\geqq0$ かつ（$b\\geqq0$ または $b^{2}<4a$）」と完全に一致した（差異 0 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a,b$ を実数とするとき、曲線 $y=ax^{2}+bx+1$ が $x$ 軸の正の部分と共有点をもたないような点 $(a,b)$ の領域を図示する`,
          answer: String.raw`$a\geqq0$ かつ $b\geqq0$、または $b<0$ かつ $a>\dfrac{b^{2}}{4}$`,
          approach: String.raw`$f(x)=ax^{2}+bx+1$ とおくと $f(0)=1>0$ が効く。$a$ の符号で場合分けし、$a>0$ のときは「判別式」と「軸の位置」で正の解の有無を判定する。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=ax^{2}+bx+1$ とおく。$f(0)=1>0$ である。求めるのは「$f(x)=0$ が正の解をもたない」条件である。` },
            {
              k: "p",
              t: String.raw`**$a<0$ のとき。** $x\to+\infty$ で $f(x)\to-\infty$ であり $f(0)=1>0$ だから、中間値の定理より正の解が必ずある。よって不適。`,
            },
            {
              k: "p",
              t: String.raw`**$a=0$ のとき。** $f(x)=bx+1$ である。$b=0$ なら $f\equiv1$ で解なし。$b\neq0$ なら解は $x=-\dfrac1b$ で、これが正になるのは $b<0$ のときである。よって正の解をもたないのは $b\geqq0$ のときである。`,
            },
            {
              k: "p",
              t: String.raw`**$a>0$ のとき。** 下に凸の放物線で $f(0)=1>0$ だから、正の解をもつのは「実数解をもち、かつ軸が正」のときに限る。すなわち`,
            },
            {
              k: "math",
              t: String.raw`b^{2}-4a\geqq0\quad\text{かつ}\quad-\frac{b}{2a}>0\ \left(\Longleftrightarrow b<0\right)`,
            },
            { k: "p", t: String.raw`である。その否定をとると、正の解をもたない条件は` },
            {
              k: "math",
              t: String.raw`b\geqq0\quad\text{または}\quad b^{2}<4a`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**まとめ。** 3つの場合を合わせると、求める領域は` },
            {
              k: "math",
              t: String.raw`\left\{a\geqq0\ \text{かつ}\ b\geqq0\right\}\ \cup\ \left\{b<0\ \text{かつ}\ a>\frac{b^{2}}{4}\right\}`,
            },
            { k: "p", t: String.raw`である（$b<0$ で $a>\dfrac{b^{2}}{4}$ なら自動的に $a>0$）。図示すると次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "横軸 a、縦軸 b。網かけが求める領域。b ≧ 0 の側は b 軸（a = 0）を含み、b < 0 の側は放物線 a = b²/4 を含まない。",
                view: [-2, 6, -3.5, 3.5],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: REG1X },
                  { k: "param", f: (b: number) => [(b * b) / 4, b], from: -3.5, to: 0 },
                  { k: "seg", a: [0, 0], b: [0, 3.5] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "text", at: [1.6, -2.6], label: "a = b²/4", place: "right" },
                  { k: "text", at: [5.9, -0.1], label: "a", place: "below-left" },
                  { k: "text", at: [0, 3.4], label: "b", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$a=0$（1次になる場合）を別に扱う。2次方程式として処理すると漏れる。`,
            String.raw`$a>0$ では $f(0)>0$ なので「2解とも正」か「2解とも負」のどちらかになる。軸の符号だけで区別できる。`,
            String.raw`境界の扱い：$b\geqq0$ 側は $a=0$ を含み、$b<0$ 側は $b^{2}=4a$（重解が正）を含まない。`,
          ],
          check: String.raw`$(a,b)=(1,-3)$ では $b^{2}=9>4=4a$ で、$x^{2}-3x+1=0$ の解 $\tfrac{3\pm\sqrt5}{2}$ はどちらも正。$(a,b)=(3,-3)$ では $9<12$ で実数解なし。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式",
      topics: ["面積比", "内分点", "2変数の値域", "整数解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "三角形と $a,b$ を2万組ランダムにとって面積比を計算すると、$\\dfrac{T}{S}=\\dfrac{1-a-b+2ab}{2}$ と小数9桁まで一致した（反例 0 件）",
          "$0<a,b<\\tfrac12$ を細かく動かすと $\\dfrac TS$ は $0.250002$ から $0.497253$ までを動いた（$\\left(\\tfrac14,\\tfrac12\\right)$）",
          "$3\\leqq p,q\\leqq199$ を全探索すると $\\dfrac ST$ が整数になるのは $(p,q)=(4,6),(6,4)$ だけで、どちらも $\\dfrac ST=3$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0<a<1$、$0<b<1$ とし、三角形 $\mathrm{ABC}$ で辺 $\mathrm{AB}$ を $a:1-a$ に内分する点を $\mathrm{P}$、辺 $\mathrm{BC}$ を $b:1-b$ に内分する点を $\mathrm{Q}$、辺 $\mathrm{CA}$ の中点を $\mathrm{R}$、$S=\triangle\mathrm{ABC}$、$T=\triangle\mathrm{PQR}$ とするとき、$\dfrac TS$ を $a,b$ で表す`,
          answer: String.raw`$\dfrac{T}{S}=\dfrac{1-a-b+2ab}{2}$`,
          approach: String.raw`$\mathrm{A}$ を基準にして $\vec u=\overrightarrow{\mathrm{AB}}$、$\vec v=\overrightarrow{\mathrm{AC}}$ で3点を表す。面積比は「$\vec u,\vec v$ での係数の行列式」で決まるので、$\vec u,\vec v$ の具体形は要らない。`,
          blocks: [
            { k: "p", t: String.raw`$\vec u=\overrightarrow{\mathrm{AB}}$、$\vec v=\overrightarrow{\mathrm{AC}}$ とおくと` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AP}}=a\vec u,\qquad\overrightarrow{\mathrm{AQ}}=\vec u+b\left(\vec v-\vec u\right)=\left(1-b\right)\vec u+b\vec v,\qquad\overrightarrow{\mathrm{AR}}=\frac12\vec v`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=\left(1-a-b\right)\vec u+b\vec v,\qquad\overrightarrow{\mathrm{PR}}=-a\vec u+\frac12\vec v`,
            },
            {
              k: "p",
              t: String.raw`である。$\vec u=\left(u_{1},u_{2}\right)$、$\vec v=\left(v_{1},v_{2}\right)$ の成分で書くと、三角形の面積は $\tfrac12\left|u_{1}v_{2}-u_{2}v_{1}\right|$ などで表され、$\vec p=\alpha\vec u+\beta\vec v$、$\vec q=\gamma\vec u+\delta\vec v$ に対して`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec p\ \text{と}\ \vec q\ \text{が張る平行四辺形}\right|=\left|\alpha\delta-\beta\gamma\right|\cdot\left|\vec u\ \text{と}\ \vec v\ \text{が張る平行四辺形}\right|`,
            },
            { k: "p", t: String.raw`が成り立つ。したがって` },
            {
              k: "math",
              t: String.raw`\frac{T}{S}=\left|\left(1-a-b\right)\cdot\frac12-b\cdot\left(-a\right)\right|=\left|\frac{1-a-b+2ab}{2}\right|`,
            },
            { k: "p", t: String.raw`である。最後に絶対値を外す。$1-a-b+2ab$ を $b$ について整理すると` },
            {
              k: "math",
              t: String.raw`1-a-b+2ab=\left(1-a\right)-b\left(1-2a\right)`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a\leqq\tfrac12$：$1-2a\geqq0$ なので $0<b<1$ より $>\left(1-a\right)-\left(1-2a\right)=a>0$`,
                String.raw`$a>\tfrac12$：$1-2a<0$ なので $>1-a>0$`,
              ],
            },
            { k: "p", t: String.raw`とつねに正である。よって` },
            {
              k: "math",
              t: String.raw`\frac{T}{S}=\frac{1-a-b+2ab}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=b=\tfrac12$ なら $\mathrm{P},\mathrm{Q},\mathrm{R}$ はすべて中点で中点三角形になり、$\dfrac TS=\dfrac{1-\frac12-\frac12+\frac12}{2}=\dfrac14$。よく知られた値と合う。`,
            },
          ],
          pitfalls: [
            String.raw`「$\mathrm{AB}$ を $a:1-a$ に内分」は $\overrightarrow{\mathrm{AP}}=a\overrightarrow{\mathrm{AB}}$。比の向きを取り違えない。`,
            String.raw`面積比は $\vec u,\vec v$ の取り方によらない。具体的な三角形で計算しなくてよい。`,
          ],
          check: String.raw`三角形と $a,b$ を2万組ランダムにとって確かめ、反例は $0$ 件だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a,b$ が $0<a<\tfrac12$、$0<b<\tfrac12$ の範囲を動くとき、$\dfrac TS$ のとりうる値の範囲を求める`,
          answer: String.raw`$\dfrac14<\dfrac TS<\dfrac12$`,
          approach: String.raw`$g(a,b)=1-a-b+2ab$ は $a$ を固定すると $b$ の1次式。1次式の値域は端点で決まるので、$b$ を先に動かし、次に $a$ を動かす、と2段階で考える。`,
          blocks: [
            { k: "p", t: String.raw`$g(a,b)=1-a-b+2ab$ とおくと $\dfrac TS=\dfrac{g}{2}$ である。$a$ を固定すると` },
            {
              k: "math",
              t: String.raw`g=\left(1-a\right)-\left(1-2a\right)b`,
            },
            {
              k: "p",
              t: String.raw`は $b$ の1次式で、$0<a<\tfrac12$ より傾き $-\left(1-2a\right)<0$、つまり $b$ について減少する。$0<b<\tfrac12$ だから`,
            },
            {
              k: "math",
              t: String.raw`g\left(a,\tfrac12\right)<g<g\left(a,0\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac12<g<1-a`,
            },
            {
              k: "p",
              t: String.raw`である（$g\left(a,\tfrac12\right)=1-a-\tfrac12+a=\tfrac12$、$g\left(a,0\right)=1-a$）。次に $a$ を $0<a<\tfrac12$ で動かすと $1-a$ は $\left(\tfrac12,1\right)$ を動くので、$g$ のとりうる値は`,
            },
            { k: "math", t: String.raw`\frac12<g<1` },
            {
              k: "p",
              t: String.raw`の範囲に収まる。逆にこの範囲のどの値もとれる。実際 $a$ を $0$ に近づけ $b$ を $0$ に近づければ $g\to1$、$a,b$ を $\tfrac12$ に近づければ $g\to\tfrac12$ で、$g$ は連続だから中間の値もすべてとる。したがって`,
            },
            {
              k: "math",
              t: String.raw`\frac14<\frac TS<\frac12`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`端点 $a,b=0,\tfrac12$ は範囲に入らないので、不等号はすべて真の不等号になる。`,
            String.raw`「すべての中間値をとる」ことに触れておく。範囲を上下から押さえただけでは、値域が区間全体だとは言えない。`,
          ],
          check: String.raw`$a,b$ を細かく動かすと $\dfrac TS$ は $0.250002$ から $0.497253$ までを動いた。`,
        },
        {
          label: "(3)",
          task: String.raw`$p,q$ を $3$ 以上の整数とし $a=\dfrac1p$、$b=\dfrac1q$ とするとき、$\dfrac ST$ が整数となる組 $(p,q)$ をすべて求める`,
          answer: String.raw`$(p,q)=(4,6),\ (6,4)$`,
          approach: String.raw`(2) と同じ評価で $\dfrac ST$ の動く範囲を押さえると、整数になりうる値がただ1つに絞れる。そのあとは $(p-3)(q-3)=3$ という形の整数問題になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\frac ST=\frac{2}{1-\frac1p-\frac1q+\frac{2}{pq}}=\frac{2pq}{pq-p-q+2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**値の範囲。** $p,q\geqq3$ より $0<a\leqq\tfrac13$、$0<b\leqq\tfrac13$ である。(2) と同じ計算で、$g=1-a-b+2ab$ は $a$ を固定すると $b$ について減少するから`,
            },
            {
              k: "math",
              t: String.raw`g\left(a,\tfrac13\right)\leqq g<g\left(a,0\right),\qquad\frac{2-a}{3}\leqq g<1-a`,
            },
            {
              k: "p",
              t: String.raw`である（$g\left(a,\tfrac13\right)=1-a-\tfrac13+\tfrac{2a}{3}=\tfrac23-\tfrac a3$）。$0<a\leqq\tfrac13$ で動かすと $\dfrac{2-a}{3}\geqq\dfrac{2-\frac13}{3}=\dfrac59$、$1-a<1$ なので`,
            },
            { k: "math", t: String.raw`\frac59\leqq g<1,\qquad\frac{5}{18}\leqq\frac TS<\frac12` },
            { k: "p", t: String.raw`である。逆数をとると` },
            {
              k: "math",
              t: String.raw`2<\frac ST\leqq\frac{18}{5}=3.6`,
            },
            { k: "p", t: String.raw`である。この範囲の整数は $3$ だけだから、条件は $\dfrac ST=3$ である。` },
            { k: "p", t: String.raw`**$\dfrac ST=3$ を解く。**` },
            {
              k: "math",
              t: String.raw`\frac{2pq}{pq-p-q+2}=3,\qquad2pq=3pq-3p-3q+6`,
            },
            { k: "p", t: String.raw`すなわち $pq-3p-3q+6=0$ である。両辺に $3$ を足して因数分解すると` },
            {
              k: "math",
              t: String.raw`pq-3p-3q+9=3,\qquad\left(p-3\right)\left(q-3\right)=3`,
            },
            {
              k: "p",
              t: String.raw`である。$p,q\geqq3$ より $p-3,q-3$ は $0$ 以上の整数で、積が $3$ になるのは`,
            },
            {
              k: "math",
              t: String.raw`\left(p-3,\ q-3\right)=\left(1,3\right),\ \left(3,1\right)`,
            },
            { k: "p", t: String.raw`のときだけである。よって` },
            { k: "math", t: String.raw`(p,q)=(4,6),\ (6,4)` },
            {
              k: "p",
              t: String.raw`である。実際 $(p,q)=(4,6)$ なら $\dfrac TS=\dfrac{1-\frac14-\frac16+\frac1{12}}{2}=\dfrac{\frac23}{2}=\dfrac13$ で $\dfrac ST=3$ である。`,
            },
          ],
          pitfalls: [
            String.raw`まず値域を押さえて「整数は $3$ しかない」と決めるのが要。いきなり $\dfrac{2pq}{pq-p-q+2}=N$ を整数問題として解こうとすると大変になる。`,
            String.raw`$(p-3)(q-3)=3$ で $p-3=0$（$3$ の約数でない）は起こらない。$0\cdot$（何か）$=3$ は不可能である。`,
          ],
          check: String.raw`$3\leqq p,q\leqq199$ を全探索すると $(4,6)$ と $(6,4)$ だけで、どちらも $\dfrac ST=3$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "場合の数",
      topics: ["円に内接する図形", "直径と直角", "余事象", "対称性による数え上げ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "正八角形の頂点から3個を選ぶ $56$ 通りを全列挙すると、直角三角形 $24$ 個、二等辺三角形 $24$ 個、両方が $8$ 個、どちらでもないものが $16$ 個だった",
          "4頂点の選び方 $70$ 通りを全列挙すると、条件 $(*)$ を満たすものは $54$ 個だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正八角形 $\mathrm{A}_{1}\mathrm{A}_{2}\cdots\mathrm{A}_{8}$ の3個の頂点を結んでできる三角形のうち、直角三角形であるものの個数を求める`,
          answer: String.raw`$24$ 個`,
          approach: String.raw`正八角形の頂点は1つの円周上にある。円に内接する三角形が直角三角形になるのは、1辺が直径のとき（タレスの定理）に限る。直径を先に選べばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正八角形の8個の頂点は外接円の周上にある。円に内接する三角形が直角三角形であることと、その1辺が直径であることは同値である（円周角の定理）。`,
            },
            {
              k: "p",
              t: String.raw`8個の頂点のうち直径の両端になる組は、向かい合う頂点の組 $\mathrm{A}_{1}\mathrm{A}_{5}$、$\mathrm{A}_{2}\mathrm{A}_{6}$、$\mathrm{A}_{3}\mathrm{A}_{7}$、$\mathrm{A}_{4}\mathrm{A}_{8}$ の $4$ 組である。`,
            },
            {
              k: "p",
              t: String.raw`直径を1つ決めると、残り $6$ 個の頂点のどれを3つめに選んでも直角三角形になる。また、1つの直角三角形に含まれる直径はちょうど1本（直角は1か所）なので、重複して数えることはない。よって`,
            },
            { k: "math", t: String.raw`4\times6=24\ \text{個}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`直角三角形の斜辺は必ず直径。先に直径を選ぶと数え漏れも重複もない。`,
          ],
          check: String.raw`$56$ 通りを全列挙して内積で直角を判定すると $24$ 個だった。`,
        },
        {
          label: "(2)",
          task: String.raw`3個の頂点を結んでできる三角形のうち、直角三角形でも二等辺三角形でもないものの個数を求める`,
          answer: String.raw`$16$ 個`,
          approach: String.raw`全体から「直角」「二等辺」を引き、両方であるものを足し戻す（包除）。二等辺かどうかは、3頂点が分ける弧の長さ（$45^{\circ}$ を単位とする3つの数）で判定できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`三角形は全部で $ {}_{8}\mathrm{C}_{3}=56$ 個である。3頂点が円周を分ける3つの弧の長さを $45^{\circ}$ 単位で $\left(x,y,z\right)$ とすると、$x+y+z=8$、$x,y,z\geqq1$ である。弦の長さは弧の長さで決まるので`,
            },
            {
              k: "steps",
              items: [
                String.raw`二等辺 $\iff$ $x,y,z$ のうち2つ以上が等しい`,
                String.raw`直角 $\iff$ $x,y,z$ のどれかが $4$（その弦が直径）`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$8$ を正の整数3つに分ける分け方は $\left\{6,1,1\right\},\left\{5,2,1\right\},\left\{4,3,1\right\},\left\{4,2,2\right\},\left\{3,3,2\right\}$ の5通りである。`,
            },
            {
              k: "p",
              t: String.raw`個数の数え方：順序つきの組 $\left(x,y,z\right)$ と頂点の出発点 $8$ 通りを掛けると $8\times\left(\text{順序つきの個数}\right)$ になり、各三角形は出発点の選び方で $3$ 回ずつ数えられる。したがって三角形の個数は $\dfrac{8\times\left(\text{順序つきの個数}\right)}{3}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left\{6,1,1\right\}$：順序つき $3$ 通り $\Rightarrow$ $8$ 個（二等辺、直角でない）`,
                String.raw`$\left\{4,2,2\right\}$：順序つき $3$ 通り $\Rightarrow$ $8$ 個（二等辺かつ直角）`,
                String.raw`$\left\{3,3,2\right\}$：順序つき $3$ 通り $\Rightarrow$ $8$ 個（二等辺、直角でない）`,
                String.raw`$\left\{4,3,1\right\}$：順序つき $6$ 通り $\Rightarrow$ $16$ 個（直角、二等辺でない）`,
                String.raw`$\left\{5,2,1\right\}$：順序つき $6$ 通り $\Rightarrow$ $16$ 個（どちらでもない）`,
              ],
            },
            { k: "p", t: String.raw`合計は $8+8+8+16+16=56$ で全体と合う。よって` },
            {
              k: "math",
              t: String.raw`\left(\text{直角}\right)=8+16=24,\qquad\left(\text{二等辺}\right)=8+8+8=24,\qquad\left(\text{両方}\right)=8`,
            },
            { k: "p", t: String.raw`であり、どちらでもないものは` },
            {
              k: "math",
              t: String.raw`56-\left(24+24-8\right)=56-40=16\ \text{個}`,
            },
            {
              k: "p",
              t: String.raw`である（$\left\{5,2,1\right\}$ の $16$ 個がそれにあたる）。`,
            },
          ],
          pitfalls: [
            String.raw`直角と二等辺は重なる（$\left\{4,2,2\right\}$）。単純に引くだけだと引きすぎる。`,
            String.raw`弧の長さの組を分類すると、5通りしかないので見通しがよい。個々の三角形を調べる必要はない。`,
          ],
          check: String.raw`全列挙すると、直角 $24$、二等辺 $24$、両方 $8$、どちらでもない $16$ で、この数え方と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`4個の頂点を結んでできる四角形のうち、「4個の頂点から3点を選んで直角三角形を作れる」ものの個数を求める`,
          answer: String.raw`$54$ 個`,
          approach: String.raw`(1) より「3点で直角三角形が作れる」$\iff$「4点の中に直径の両端の組がある」。余事象（直径の組を1つも含まない4点）を数えるほうが簡単である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`4個の頂点から3点を選んで直角三角形が作れるのは、(1) より「その4点の中に直径の両端となる2点が含まれる」ときである（含まれていれば、残り2点のどちらを3つめにしても直角三角形になる）。`,
            },
            {
              k: "p",
              t: String.raw`4頂点の選び方は $ {}_{8}\mathrm{C}_{4}=70$ 通りである。余事象、すなわち「直径の組を1つも含まない」選び方を数える。`,
            },
            {
              k: "p",
              t: String.raw`8個の頂点は向かい合う4組のペアに分かれる。直径の組を含まないように4点を選ぶには、どのペアからも高々1個しか選べない。4組から合計4個を選ぶのだから、各ペアからちょうど1個ずつ選ぶことになり`,
            },
            { k: "math", t: String.raw`2^{4}=16\ \text{通り}` },
            { k: "p", t: String.raw`である。よって求める個数は` },
            { k: "math", t: String.raw`70-16=54\ \text{個}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`余事象の $16$ 個は「向かい合う頂点を同時には含まない4点」で、たとえば $\mathrm{A}_{1}\mathrm{A}_{2}\mathrm{A}_{3}\mathrm{A}_{4}$ がその1つである。`,
            },
          ],
          pitfalls: [
            String.raw`条件は4点全体の性質（直径の組があるか）に帰着する。3点の組ごとに調べる必要はない。`,
            String.raw`4組のペアから4個選ぶとき、1個も余らないので「各ペアからちょうど1個」になる。ここは鳩の巣の議論である。`,
          ],
          check: String.raw`$70$ 通りを全列挙すると $54$ 個だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・積分法",
      topics: ["3次曲線と直線", "解と係数の関係", "軌跡", "通過領域の面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1.2,1.5,1.8$ で $k=a^{3}-3a$ として3次方程式を数値で解くと、最大の解が $a$ に一致し、$\\mathrm{S}$ の座標が $\\left(-\\tfrac a2,\\ a^{3}-\\tfrac72a\\right)$ と一致した",
          "$\\mathrm{S}$ の $y$ 座標が $-8X^{3}+7X$（$X=-\\tfrac a2$）と一致した",
          "面積を $\\int_{1}^{2}\\tfrac32\\left(a^{2}-1\\right)\\sqrt{12-3a^{2}}\\,da$ で数値計算すると $3.374999986$、$\\tfrac{27}8=3.375$ と一致した。200万点のモンテカルロでも $3.3713$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`傾きが $1$ で曲線 $y=x^{3}-2x$ と異なる3点で交わる直線 $\ell$ について、交点を $x$ 座標の小さい順に $\mathrm{P},\mathrm{Q},\mathrm{R}$、線分 $\mathrm{PQ}$ の中点を $\mathrm{S}$ とする。$\mathrm{R}$ の座標を $\left(a,a^{3}-2a\right)$ とするとき $\mathrm{S}$ の座標を求める`,
          answer: String.raw`$\mathrm{S}\left(-\dfrac a2,\ a^{3}-\dfrac72a\right)$`,
          approach: String.raw`$\ell\colon y=x+k$ とおくと交点の $x$ 座標は $x^{3}-3x-k=0$ の3解で、解と係数の関係から和が $0$。$\mathrm{S}$ は $\ell$ 上にあるので $y$ 座標もすぐ出る。`,
          blocks: [
            { k: "p", t: String.raw`$\ell\colon y=x+k$ とおく。曲線と連立すると` },
            {
              k: "math",
              t: String.raw`x^{3}-2x=x+k,\qquad x^{3}-3x-k=0\qquad\cdots\text{①}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{P},\mathrm{Q},\mathrm{R}$ の $x$ 座標を $p<q<a$ とすると、① に $x^{2}$ の項がないので解と係数の関係から`,
            },
            { k: "math", t: String.raw`p+q+a=0,\qquad p+q=-a` },
            { k: "p", t: String.raw`である。よって $\mathrm{S}$ の $x$ 座標は` },
            { k: "math", t: String.raw`\frac{p+q}{2}=-\frac a2` },
            {
              k: "p",
              t: String.raw`である。$\mathrm{P},\mathrm{Q}$ はともに $\ell$ 上にあるので、その中点 $\mathrm{S}$ も $\ell$ 上にある。また $\mathrm{R}$ が $\ell$ 上にあることから $a^{3}-2a=a+k$、すなわち $k=a^{3}-3a$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\left(\mathrm{S}\ \text{の}\ y\ \text{座標}\right)=-\frac a2+k=-\frac a2+a^{3}-3a=a^{3}-\frac72a`,
            },
            { k: "p", t: String.raw`である。すなわち` },
            {
              k: "math",
              t: String.raw`\mathrm{S}\left(-\frac a2,\ a^{3}-\frac72a\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\mathrm{S}$ は $\mathrm{P},\mathrm{Q}$ の中点なので、$\ell$ 上にある。$y$ 座標を曲線から求めようとしない。`,
            String.raw`$x^{2}$ の係数が $0$ なので3解の和が $0$。これが $p+q=-a$ を与える。`,
          ],
          check: String.raw`$a=1.5$ では $k=-1.125$、3解は $-1.895644,\ 0.395644,\ 1.5$ で、$\mathrm{S}=(-0.75,-1.875)$。式の値と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\ell$ が条件を満たしながら動くとき、点 $\mathrm{S}$ の軌跡を求める`,
          answer: String.raw`曲線 $y=-8x^{3}+7x$ の $-1<x<-\dfrac12$ の部分`,
          approach: String.raw`(1) の $\mathrm{S}$ の座標から $a$ を消去する。$a$ の動く範囲は「① が異なる3実数解をもつ」条件から決まり、それは $y=x^{3}-3x$ の極値で決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$a$ の範囲。** ① が異なる3実数解をもつ条件を調べる。$h(x)=x^{3}-3x$ とおくと $h'(x)=3\left(x^{2}-1\right)$ で、$x=-1$ で極大 $h(-1)=2$、$x=1$ で極小 $h(1)=-2$ である。よって $h(x)=k$ が異なる3実数解をもつのは`,
            },
            { k: "math", t: String.raw`-2<k<2` },
            {
              k: "p",
              t: String.raw`のときである。このとき最大の解 $a$ は $x>1$ の側にあり、$k=-2$ で $a=1$（$h$ のグラフが極小に接する）、$k=2$ で $a=2$（$h(2)=2$）に対応する。$h$ は $x>1$ で増加だから $k$ と $a$ は1対1に対応し`,
            },
            { k: "math", t: String.raw`1<a<2` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**消去。** $X=-\dfrac a2$ とおくと $a=-2X$ で、(1) より` },
            {
              k: "math",
              t: String.raw`Y=a^{3}-\frac72a=\left(-2X\right)^{3}-\frac72\left(-2X\right)=-8X^{3}+7X`,
            },
            { k: "p", t: String.raw`である。$1<a<2$ は $-1<X<-\dfrac12$ にあたる。よって求める軌跡は` },
            {
              k: "math",
              t: String.raw`y=-8x^{3}+7x\qquad\left(-1<x<-\frac12\right)`,
            },
            {
              k: "p",
              t: String.raw`である（両端 $\left(-\tfrac12,-\tfrac52\right)$ と $\left(-1,1\right)$ は含まない）。`,
            },
          ],
          pitfalls: [
            String.raw`$a$ の範囲を出さずに消去だけすると、曲線全体を答えてしまう。3交点をもつ条件が範囲を決める。`,
            String.raw`$k$ と $a$ が1対1に対応することを言っておく。$h$ が $x>1$ で単調だからである。`,
          ],
          check: String.raw`$a=1.8$ では $\mathrm{S}=(-0.9,-0.468)$ で、$-8(-0.9)^{3}+7(-0.9)=-0.468$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\ell$ が条件を満たしながら動くとき、線分 $\mathrm{PS}$ が動いてできる領域の面積を求める`,
          answer: String.raw`$\dfrac{27}{8}$`,
          approach: String.raw`線分 $\mathrm{PS}$ は傾き $1$ なので、$v=y-x$ に注目すると $v=k$ で一定。$k$ は $a$ とともに単調に動くから、$v$ を固定するごとに $x$ の区間が1つ決まる。面積は「区間の長さ」を $v$ で積分すればよい。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが線分 PS の通過領域。左下の境界は P の軌跡（曲線 y = x³ - 2x の -2 ≦ x ≦ -1 の部分）、右の境界は S の軌跡 y = -8x³ + 7x、下の境界は k = -2 のときの線分 PS。a → 2 では P と S が (-1, 1) に重なる。",
                view: [-3.4, 1.4, -4.7, 1.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: REG4X },
                  { k: "curve", f: C4X, from: -2.4, to: 1.4 },
                  { k: "curve", f: S4X, from: -1, to: -0.5 },
                  { k: "seg", a: [-2, -4], b: [-0.5, -2.5] },
                  { k: "dot", at: [-2, -4], label: "(-2, -4)", place: "below-right" },
                  { k: "dot", at: [-0.5, -2.5], label: "(-1/2, -5/2)", place: "right" },
                  { k: "dot", at: [-1, 1], label: "(-1, 1)", place: "above-right" },
                  { k: "text", at: [1.3, C4X(1.3)], label: "y = x³ - 2x", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**座標の取り替え。** 線分 $\mathrm{PS}$ は $\ell\colon y=x+k$ の一部なので、その上の点は $y-x=k$ を満たす。そこで $v=y-x$ とおくと、$\left(x,y\right)\mapsto\left(x,v\right)$ は面積を変えない変換（せん断）である。`,
            },
            {
              k: "p",
              t: String.raw`$a$ を決めると $k=a^{3}-3a$ が決まり、線分 $\mathrm{PS}$ は $\left(x,v\right)$ 平面では高さ $v=k$ の水平な線分`,
            },
            {
              k: "math",
              t: String.raw`p\left(a\right)\leqq x\leqq-\frac a2`,
            },
            {
              k: "p",
              t: String.raw`になる。$1<a<2$ で $\dfrac{dk}{da}=3\left(a^{2}-1\right)>0$ だから $k$ は $a$ とともに増加し、$-2<k<2$ を1対1に動く。したがって高さ $v$ を決めると $a$ が1つに定まり、断面はちょうど1つの区間になる。`,
            },
            { k: "p", t: String.raw`**区間の長さ。** $p,q$ は ① の $x=a$ 以外の2解なので、解と係数の関係から` },
            {
              k: "math",
              t: String.raw`p+q=-a,\qquad pq+a\left(p+q\right)=-3\ \Longrightarrow\ pq=a^{2}-3`,
            },
            { k: "p", t: String.raw`である。よって $p,q$ は $t^{2}+at+\left(a^{2}-3\right)=0$ の2解で` },
            {
              k: "math",
              t: String.raw`p=\frac{-a-\sqrt{12-3a^{2}}}{2},\qquad q=\frac{-a+\sqrt{12-3a^{2}}}{2}`,
            },
            { k: "p", t: String.raw`である（判別式は $a^{2}-4\left(a^{2}-3\right)=12-3a^{2}>0$）。区間の長さは` },
            {
              k: "math",
              t: String.raw`-\frac a2-p=\frac{\sqrt{12-3a^{2}}}{2}`,
            },
            { k: "p", t: String.raw`である（$-\dfrac a2$ は $p,q$ の中点）。` },
            { k: "p", t: String.raw`**積分。** $dv=\left(3a^{2}-3\right)da$ なので、求める面積は` },
            {
              k: "math",
              t: String.raw`\int_{-2}^{2}\left(-\frac a2-p\right)dv=\int_{1}^{2}\frac{\sqrt{12-3a^{2}}}{2}\cdot3\left(a^{2}-1\right)da=\frac{3\sqrt3}{2}\int_{1}^{2}\left(a^{2}-1\right)\sqrt{4-a^{2}}\,da`,
            },
            { k: "p", t: String.raw`である。$a=2\sin\theta$（$\tfrac\pi6\leqq\theta\leqq\tfrac\pi2$）とおくと $da=2\cos\theta\,d\theta$、$\sqrt{4-a^{2}}=2\cos\theta$ で` },
            {
              k: "math",
              t: String.raw`\int_{1}^{2}\left(a^{2}-1\right)\sqrt{4-a^{2}}\,da=4\int_{\frac\pi6}^{\frac\pi2}\left(4\sin^{2}\theta-1\right)\cos^{2}\theta\,d\theta`,
            },
            { k: "p", t: String.raw`である。$4\sin^{2}\theta\cos^{2}\theta=\sin^{2}2\theta=\dfrac{1-\cos4\theta}{2}$、$\cos^{2}\theta=\dfrac{1+\cos2\theta}{2}$ を使うと被積分関数は` },
            {
              k: "math",
              t: String.raw`\frac{1-\cos4\theta}{2}-\frac{1+\cos2\theta}{2}=-\frac{\cos4\theta+\cos2\theta}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`4\int_{\frac\pi6}^{\frac\pi2}\left(\cdots\right)d\theta=-2\left[\frac{\sin4\theta}{4}+\frac{\sin2\theta}{2}\right]_{\frac\pi6}^{\frac\pi2}=-2\left(0-\frac{3\sqrt3}{8}\right)=\frac{3\sqrt3}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（$\theta=\tfrac\pi6$ で $\tfrac{\sin\frac{2\pi}{3}}{4}+\tfrac{\sin\frac\pi3}{2}=\tfrac{\sqrt3}{8}+\tfrac{\sqrt3}{4}=\tfrac{3\sqrt3}{8}$）。したがって面積は`,
            },
            {
              k: "math",
              t: String.raw`\frac{3\sqrt3}{2}\cdot\frac{3\sqrt3}{4}=\frac{27}{8}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a\to2$ では $p\to q\to-1$ で線分 $\mathrm{PS}$ は1点 $\left(-1,1\right)$ につぶれる。領域は $\left(-2,-4\right),\left(-\tfrac12,-\tfrac52\right),\left(-1,1\right)$ を頂点とする曲線三角形になる。`,
            },
          ],
          pitfalls: [
            String.raw`傾き $1$ の線分が動くので $y-x$ を見る。$y$ そのものを見ると断面が複雑になる。`,
            String.raw`$k$ が $a$ について単調なので、各高さの断面が1区間になる。重なりを心配しなくてよい。`,
            String.raw`$-\dfrac a2$ は $p,q$ の中点なので、区間の長さは $\dfrac{q-p}{2}$ に等しい。`,
          ],
          check: String.raw`数値積分すると $3.374999986$、$\dfrac{27}{8}=3.375$ と一致した。200万点のモンテカルロでも $3.3713$ だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "複素数平面",
      topics: ["共線条件", "二等辺三角形", "軌跡の図示", "面積の最大"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$z$ を20万個ランダムにとり、$\\mathrm{O},\\mathrm{A},\\mathrm{B}$ が同一直線上にあることと $z$ が実数であることが完全に一致した（反例 0 件）",
          "$z=i,\\ 0.5+0.3i,\\ 1+i,\\ \\tfrac32+\\tfrac{\\sqrt3}{2}i$ などで、二等辺になるのが $\\left|z\\right|=1$・$\\left|z-1\\right|=1$・$\\operatorname{Re}z=\\tfrac12$ のいずれかのときと一致した",
          "$0<\\theta\\leqq\\tfrac\\pi3$ で3つの曲線上を細かく走査すると、面積の最大は $1.299038106=\\dfrac{3\\sqrt3}{4}$、そのとき $z=\\tfrac32+\\tfrac{\\sqrt3}{2}i$（$\\theta=\\tfrac\\pi6$、$\\left|z\\right|=\\sqrt3$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$z$ を複素数とし、複素数平面上の3点 $\mathrm{O}(0)$、$\mathrm{A}(z)$、$\mathrm{B}\left(z^{2}\right)$ について、3点が同一直線上にあるための $z$ の必要十分条件を求める`,
          answer: String.raw`$z$ が実数であること`,
          approach: String.raw`$\mathrm{O}$ を基準にすると、$\mathrm{A},\mathrm{B}$ の位置ベクトルは $z$ と $z^{2}$ である。同一直線上 $\iff$ 一方が他方の実数倍、で、$\dfrac{z^{2}}{z}=z$ がそのまま条件になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3点が同一直線上にあるのは、$z^{2}$ が $z$ の実数倍であるとき、すなわち実数 $t$ があって $z^{2}=tz$ となるときである（$z=0$ なら3点とも $\mathrm{O}$ に重なり、どの直線上にもある）。`,
            },
            { k: "p", t: String.raw`$z^{2}=tz$ は $z\left(z-t\right)=0$ と同値なので` },
            { k: "math", t: String.raw`z=0\quad\text{または}\quad z=t\ \left(\text{実数}\right)` },
            {
              k: "p",
              t: String.raw`である。どちらも「$z$ が実数」にまとめられる。逆に $z$ が実数なら $z,z^{2}$ はともに実軸上にあり、$\mathrm{O}$ も実軸上だから3点は同一直線上にある。よって求める必要十分条件は`,
            },
            { k: "math", t: String.raw`z\ \text{が実数}\quad\left(z=\bar z\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`言い換えると、$z$ が実数でなければ $\mathrm{O},\mathrm{A},\mathrm{B}$ は三角形をなす。(2)(3) ではこの事実を使う。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{z^{2}}{z}=z$ が実数、という形で書くと $z\neq0$ を仮定することになる。$z=0$ を別に確認する。`,
          ],
          check: String.raw`$z$ を20万個ランダムにとると、$\operatorname{Im}\left(\bar z\cdot z^{2}\right)=0$ となるのと $\operatorname{Im}z=0$ が完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ が二等辺三角形の頂点になるような $z$ 全体を複素数平面上に図示する`,
          answer: String.raw`円 $\left|z\right|=1$、円 $\left|z-1\right|=1$、直線 $\operatorname{Re}z=\dfrac12$ の和集合から、実軸上の点（$z=0,\pm1,\tfrac12,2$）を除いたもの`,
          approach: String.raw`3辺の長さを $\left|z\right|$ で書くと、$\mathrm{OA}=\left|z\right|$、$\mathrm{OB}=\left|z\right|^{2}$、$\mathrm{AB}=\left|z\right|\left|z-1\right|$ となる。どの2辺が等しいかで3つの条件に分かれ、$\left|z\right|>0$ で割ると見慣れた図形になる。`,
          blocks: [
            { k: "p", t: String.raw`まず三角形になる条件は、(1) より「$z$ が実数でない」ことである。このとき $\left|z\right|>0$ で、3辺の長さは` },
            {
              k: "math",
              t: String.raw`\mathrm{OA}=\left|z\right|,\qquad\mathrm{OB}=\left|z^{2}\right|=\left|z\right|^{2},\qquad\mathrm{AB}=\left|z^{2}-z\right|=\left|z\right|\left|z-1\right|`,
            },
            { k: "p", t: String.raw`である。二等辺になるのは次の3つのいずれかのときである（いずれも $\left|z\right|>0$ で割った）。` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{OA}=\mathrm{OB}$：$\left|z\right|=\left|z\right|^{2}$ より $\left|z\right|=1$`,
                String.raw`$\mathrm{OA}=\mathrm{AB}$：$\left|z\right|=\left|z\right|\left|z-1\right|$ より $\left|z-1\right|=1$`,
                String.raw`$\mathrm{OB}=\mathrm{AB}$：$\left|z\right|^{2}=\left|z\right|\left|z-1\right|$ より $\left|z\right|=\left|z-1\right|$、すなわち $\operatorname{Re}z=\dfrac12$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である（3つめは $0$ と $1$ から等距離、つまり線分の垂直二等分線）。これらから実軸上の点を除いたものが答えである。実軸と交わるのは`,
            },
            {
              k: "math",
              t: String.raw`z=\pm1\ \left(\left|z\right|=1\right),\qquad z=0,\ 2\ \left(\left|z-1\right|=1\right),\qquad z=\frac12\ \left(\operatorname{Re}z=\tfrac12\right)`,
            },
            { k: "p", t: String.raw`の5点である。図示すると次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "2つの円 |z| = 1、|z-1| = 1 と直線 Re z = 1/2 の和集合。実軸上の5点（0, 1/2, ±1, 2）は三角形にならないので除く。3つの曲線は (1±√3 i)/2 で交わり、そこでは正三角形になる。",
                view: [-1.6, 2.6, -1.6, 1.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI },
                  { k: "param", f: (t: number) => [1 + Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI },
                  { k: "seg", a: [0.5, -1.6], b: [0.5, 1.6] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "1", place: "below-right" },
                  { k: "dot", at: [0.5, Math.sqrt(3) / 2], label: "(1+√3i)/2", place: "above-right" },
                  { k: "text", at: [0.5, 1.55], label: "Re z = 1/2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$z$ が実数の点を必ず除く。そこでは3点が一直線上に並び、三角形にならない。`,
            String.raw`$\left|z\right|=\left|z-1\right|$ は円ではなく直線（垂直二等分線）。3つのうち1つだけ形が違う。`,
          ],
          check: String.raw`$z=i$（$\left|z\right|=1$）、$z=1+i$（$\left|z-1\right|=1$）、$z=\tfrac12+2i$（$\operatorname{Re}z=\tfrac12$）はいずれも二等辺になり、$z=2+i$ はどの条件も満たさず二等辺にならなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ が二等辺三角形の頂点であり、かつ $z$ の偏角 $\theta$ が $0\leqq\theta\leqq\dfrac\pi3$ を満たすとき、三角形 $\mathrm{OAB}$ の面積の最大値とそのときの $z$ を求める`,
          answer: String.raw`最大値 $\dfrac{3\sqrt3}{4}$、$z=\dfrac32+\dfrac{\sqrt3}{2}i$`,
          approach: String.raw`面積を $r=\left|z\right|$ と $\theta$ で書くと $\dfrac12r^{3}\sin\theta$ になる。(2) の3つの場合それぞれで $r$ が $\theta$ の式になるので、1変数の最大問題を3回解けばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z=r\left(\cos\theta+i\sin\theta\right)$（$r>0$）とおく。三角形になるには $z$ が実数でないので $0<\theta\leqq\dfrac\pi3$ である。頂点 $0,z,z^{2}$ の三角形の面積は`,
            },
            {
              k: "math",
              t: String.raw`\frac12\left|\operatorname{Im}\left(\bar z\cdot z^{2}\right)\right|=\frac12\left|\operatorname{Im}\left(\left|z\right|^{2}z\right)\right|=\frac12r^{2}\cdot r\sin\theta=\frac{r^{3}\sin\theta}{2}`,
            },
            { k: "p", t: String.raw`である（$\sin\theta>0$）。(2) の3つの場合を順に調べる。` },
            { k: "p", t: String.raw`**(i) $\left|z\right|=1$。** $r=1$ なので面積は $\dfrac{\sin\theta}{2}$ で、$\theta=\dfrac\pi3$ のとき最大値 $\dfrac{\sqrt3}{4}$ である。` },
            {
              k: "p",
              t: String.raw`**(ii) $\left|z-1\right|=1$。** この円を極方程式で書くと $r=2\cos\theta$（$-\tfrac\pi2<\theta<\tfrac\pi2$）である。よって面積は`,
            },
            {
              k: "math",
              t: String.raw`F(\theta)=\frac{\left(2\cos\theta\right)^{3}\sin\theta}{2}=4\cos^{3}\theta\sin\theta`,
            },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`F'(\theta)=4\left(-3\cos^{2}\theta\sin^{2}\theta+\cos^{4}\theta\right)=4\cos^{2}\theta\left(\cos^{2}\theta-3\sin^{2}\theta\right)=4\cos^{2}\theta\left(1-4\sin^{2}\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$0<\theta\leqq\tfrac\pi3$ では $\cos\theta>0$ だから符号は $1-4\sin^{2}\theta$ で決まる。$\sin\theta=\dfrac12$、つまり $\theta=\dfrac\pi6$ の前後で正から負に変わるので、$\theta=\dfrac\pi6$ で最大になる。そのとき $r=2\cos\dfrac\pi6=\sqrt3$ で`,
            },
            {
              k: "math",
              t: String.raw`F\left(\frac\pi6\right)=\frac{\left(\sqrt3\right)^{3}\cdot\frac12}{2}=\frac{3\sqrt3}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**(iii) $\operatorname{Re}z=\dfrac12$。** $r\cos\theta=\dfrac12$ より $r=\dfrac{1}{2\cos\theta}$ である。面積は`,
            },
            {
              k: "math",
              t: String.raw`\frac{1}{2}\cdot\frac{\sin\theta}{8\cos^{3}\theta}=\frac{\tan\theta}{16\cos^{2}\theta}`,
            },
            {
              k: "p",
              t: String.raw`で、$0<\theta\leqq\tfrac\pi3$ では $\tan\theta$ も $\dfrac{1}{\cos^{2}\theta}$ も増加するから $\theta=\dfrac\pi3$ で最大、値は $\dfrac{\sqrt3\cdot4}{16}=\dfrac{\sqrt3}{4}$ である。`,
            },
            { k: "p", t: String.raw`**まとめ。** 3つの最大値は $\dfrac{\sqrt3}{4}$、$\dfrac{3\sqrt3}{4}$、$\dfrac{\sqrt3}{4}$ なので、全体の最大値は` },
            { k: "math", t: String.raw`\frac{3\sqrt3}{4}` },
            { k: "p", t: String.raw`である。これを与えるのは (ii) の $\theta=\dfrac\pi6$、$r=\sqrt3$ のときで` },
            {
              k: "math",
              t: String.raw`z=\sqrt3\left(\cos\frac\pi6+i\sin\frac\pi6\right)=\sqrt3\left(\frac{\sqrt3}{2}+\frac12i\right)=\frac32+\frac{\sqrt3}{2}i`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`このとき $\mathrm{OA}=\sqrt3$、$\mathrm{OB}=3$、$\mathrm{AB}=\sqrt3\cdot1=\sqrt3$ で、$\mathrm{OA}=\mathrm{AB}$ の二等辺三角形になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$\theta=0$ は実数になって三角形にならない。$0<\theta\leqq\tfrac\pi3$ で考える。`,
            String.raw`円 $\left|z-1\right|=1$ の極方程式が $r=2\cos\theta$ であること。これを使うと1変数になる。`,
            String.raw`3つの場合すべてを調べる。(i)(iii) は端点で最大になるが、(ii) だけ途中に最大がある。`,
          ],
          check: String.raw`3つの曲線上を細かく走査すると、面積の最大は $1.299038106=\dfrac{3\sqrt3}{4}$、そのとき $z=1.5+0.8660254i$、$\theta=\dfrac\pi6$、$r=\sqrt3$ だった。`,
        },
      ],
    },
    {
      no: 6,
      field: "積分法",
      topics: ["部分積分", "テイラーの定理の剰余項", "不等式の評価", "e の近似"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.5,1,2$ と $n=1,2,5$ で $1+a+\\cdots+\\tfrac{a^{n}}{n!}+R_{n}$ を数値計算すると、どれも $e^{a}$ と小数12桁まで一致した",
          "同じ $(a,n)$ で $\\dfrac{a^{n+1}}{(n+1)!}\\leqq R_{n}\\leqq\\dfrac{e^{a}a^{n+1}}{(n+1)!}$ がすべて成り立った",
          "$\\left|e-\\sum_{k=0}^{n}\\tfrac1{k!}\\right|$ は $n=5$ で $1.615\\times10^{-3}$、$n=6$ で $2.263\\times10^{-4}$ となり、$10^{-3}$ を下回る最小の $n$ は $6$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の実数 $a$ と正の整数 $n$ に対して $e^{a}=1+a+\dfrac{a^{2}}{2!}+\cdots+\dfrac{a^{n}}{n!}+\displaystyle\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}\,dx$ を示す`,
          answer: String.raw`$R_{n}=\displaystyle\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}dx$ とおくと部分積分で $R_{n-1}=\dfrac{a^{n}}{n!}+R_{n}$`,
          approach: String.raw`$R_{n}$ を部分積分すると $R_{n-1}$ との関係が出る。$R_{0}=e^{a}-1$ から順に足し上げれば示せる。`,
          blocks: [
            { k: "p", t: String.raw`$R_{n}=\displaystyle\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}\,dx$（$n\geqq0$）とおく。$n=0$ では` },
            {
              k: "math",
              t: String.raw`R_{0}=\int_{0}^{a}e^{x}\,dx=e^{a}-1`,
            },
            { k: "p", t: String.raw`である。$n\geqq1$ で部分積分（$e^{x}$ を積分、$\dfrac{\left(a-x\right)^{n}}{n!}$ を微分）すると` },
            {
              k: "math",
              t: String.raw`R_{n}=\left[\frac{\left(a-x\right)^{n}}{n!}e^{x}\right]_{0}^{a}+\int_{0}^{a}\frac{\left(a-x\right)^{n-1}}{\left(n-1\right)!}e^{x}\,dx`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{d}{dx}\dfrac{\left(a-x\right)^{n}}{n!}=-\dfrac{\left(a-x\right)^{n-1}}{\left(n-1\right)!}$ なので符号が反転して $+$ になる）。第1項は $x=a$ で $0$、$x=0$ で $\dfrac{a^{n}}{n!}$ だから`,
            },
            {
              k: "math",
              t: String.raw`R_{n}=-\frac{a^{n}}{n!}+R_{n-1},\qquad\text{すなわち}\quad R_{n-1}=\frac{a^{n}}{n!}+R_{n}`,
            },
            { k: "p", t: String.raw`である。これを $n$ 回繰り返すと` },
            {
              k: "math",
              t: String.raw`R_{0}=\frac{a}{1!}+R_{1}=\frac{a}{1!}+\frac{a^{2}}{2!}+R_{2}=\cdots=\sum_{k=1}^{n}\frac{a^{k}}{k!}+R_{n}`,
            },
            { k: "p", t: String.raw`である。$R_{0}=e^{a}-1$ とあわせて` },
            {
              k: "math",
              t: String.raw`e^{a}=1+\sum_{k=1}^{n}\frac{a^{k}}{k!}+R_{n}=1+a+\frac{a^{2}}{2!}+\cdots+\frac{a^{n}}{n!}+\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}dx`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$\left(a-x\right)^{n}$ を微分すると内側の $-1$ が出る。部分積分の符号に注意する。`,
            String.raw`$\left[\ \right]_{0}^{a}$ の上端が $0$ になるのがポイント。下端だけが残る。`,
          ],
          check: String.raw`$a=1,n=5$ で数値計算すると、右辺は $2.718281828459$ で $e$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`正の実数 $a$ と正の整数 $n$ に対して $\dfrac{a^{n+1}}{\left(n+1\right)!}\leqq\displaystyle\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}dx\leqq\dfrac{e^{a}a^{n+1}}{\left(n+1\right)!}$ を示す`,
          answer: String.raw`$0\leqq x\leqq a$ で $1\leqq e^{x}\leqq e^{a}$ を使い、$\displaystyle\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}dx=\frac{a^{n+1}}{\left(n+1\right)!}$ を掛ける`,
          approach: String.raw`被積分関数のうち $e^{x}$ の部分だけを定数で上下から押さえる。残りの積分は直接計算できる。`,
          blocks: [
            { k: "p", t: String.raw`$0\leqq x\leqq a$ では $e^{x}$ は増加だから` },
            { k: "math", t: String.raw`1=e^{0}\leqq e^{x}\leqq e^{a}` },
            {
              k: "p",
              t: String.raw`である。また $\dfrac{\left(a-x\right)^{n}}{n!}\geqq0$ なので、これを掛けて $0$ から $a$ まで積分すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}dx\leqq\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}dx\leqq e^{a}\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}dx`,
            },
            { k: "p", t: String.raw`である。真ん中以外の積分は直接計算できて` },
            {
              k: "math",
              t: String.raw`\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}dx=\left[-\frac{\left(a-x\right)^{n+1}}{\left(n+1\right)!}\right]_{0}^{a}=\frac{a^{n+1}}{\left(n+1\right)!}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\frac{a^{n+1}}{\left(n+1\right)!}\leqq\int_{0}^{a}\frac{\left(a-x\right)^{n}}{n!}e^{x}dx\leqq\frac{e^{a}a^{n+1}}{\left(n+1\right)!}`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`不等式を掛けるときは、掛ける側 $\dfrac{\left(a-x\right)^{n}}{n!}$ が $0$ 以上であることを確認する。`,
          ],
          check: String.raw`$a=1,n=5$ では $R_{5}=0.001615162$ で、下界 $\tfrac{1}{6!}=0.001388889$、上界 $\tfrac{e}{6!}=0.003775391$ のあいだに入った。`,
        },
        {
          label: "(3)",
          task: String.raw`$\left|e-\left(1+1+\dfrac{1}{2!}+\cdots+\dfrac{1}{n!}\right)\right|<10^{-3}$ を満たす最小の正の整数 $n$ を求める`,
          answer: String.raw`$n=6$`,
          approach: String.raw`(1) を $a=1$ で使うと、絶対値の中身はちょうど $R_{n}$ になる。(2) の上下の評価で、$n\leqq5$ では不可、$n=6$ では可を示す。`,
          blocks: [
            { k: "p", t: String.raw`(1) で $a=1$ とすると` },
            {
              k: "math",
              t: String.raw`e-\left(1+1+\frac{1}{2!}+\cdots+\frac{1}{n!}\right)=R_{n},\qquad R_{n}=\int_{0}^{1}\frac{\left(1-x\right)^{n}}{n!}e^{x}dx>0`,
            },
            { k: "p", t: String.raw`である。よって絶対値は $R_{n}$ そのもので、(2) の $a=1$ の場合から` },
            {
              k: "math",
              t: String.raw`\frac{1}{\left(n+1\right)!}\leqq R_{n}\leqq\frac{e}{\left(n+1\right)!}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$n\leqq5$ では不可。** $\left(n+1\right)!\leqq6!=720<1000$ なので $R_{n}\geqq\dfrac{1}{\left(n+1\right)!}>\dfrac{1}{1000}=10^{-3}$ となり、条件を満たさない。`,
            },
            {
              k: "p",
              t: String.raw`**$n=6$ は可。** $\left(n+1\right)!=7!=5040$ で、$e<3$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`R_{6}\leqq\frac{e}{5040}<\frac{3}{5040}=\frac{1}{1680}<\frac{1}{1000}=10^{-3}`,
            },
            { k: "p", t: String.raw`である。したがって求める最小の $n$ は` },
            { k: "math", t: String.raw`n=6` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`実際 $1+1+\tfrac1{2!}+\cdots+\tfrac1{6!}=2.7180556$ で、$e=2.7182818$ との差は $2.26\times10^{-4}$。$n=5$ では差が $1.62\times10^{-3}$ で $10^{-3}$ を超える。`,
            },
          ],
          pitfalls: [
            String.raw`$R_{n}>0$ なので絶対値は外れる。符号の確認を飛ばさない。`,
            String.raw`「最小の $n$」なので、$n=6$ で成り立つことと $n\leqq5$ で成り立たないことの両方を示す。下からの評価 $\dfrac{1}{(n+1)!}$ が後者に効く。`,
          ],
          check: String.raw`数値では $n=5$ で $1.615\times10^{-3}$、$n=6$ で $2.263\times10^{-4}$ となり、$10^{-3}$ を下回る最小の $n$ は $6$ だった。`,
        },
      ],
    },
  ],
};
