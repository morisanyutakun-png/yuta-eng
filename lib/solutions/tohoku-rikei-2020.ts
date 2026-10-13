import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2020年度（令和2年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の図。$\mathrm{A}(0,0)$、$\mathrm{C}(1,0)$、$\mathrm{B}\left(\tfrac78,\tfrac{\sqrt{15}}8\right)$。 */
const CO1 = 7 / 8;
const SI1 = Math.sqrt(15) / 8;
const P1Z: [number, number] = [CO1, Math.sqrt(15) / 24];

/** 第2問の図。$a=1$ の例。円 $C$ の中心 $(1,2)$、半径 $1$。$L,M$ は $(1,1)$ で直交する。 */
const L2Z = (x: number): number => (4 * x - 1) / 3;
const M2Z = (x: number): number => (7 - 3 * x) / 4;

export const tohokuRikei2020: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と計量",
      topics: ["余弦定理", "座標の導入", "2次関数の最小", "垂線の足"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\cos\\theta=\\tfrac78$、$\\sin\\theta=\\tfrac{\\sqrt{15}}8$ で $\\mathrm{AB}=\\mathrm{AC}=1$、$\\mathrm{BC}=0.5$ になる座標を作った",
          "$s$ を $10^{-5}$ 刻みで動かすと $\\mathrm{AP}^{2}+\\mathrm{BP}^{2}+\\mathrm{CP}^{2}$ の最小は $s=0.66667$ での $0.937500000$ で、$\\tfrac{15}{16}=0.9375$、$s=\\tfrac23$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{AB}=1$、$\mathrm{AC}=1$、$\mathrm{BC}=\tfrac12$ の $\triangle\mathrm{ABC}$ について、$\angle\mathrm{BAC}=\theta$ とするとき $\cos\theta,\ \sin\theta$ を求める`,
          answer: String.raw`$\cos\theta=\dfrac78$、$\sin\theta=\dfrac{\sqrt{15}}{8}$`,
          approach: String.raw`3辺が分かっているので余弦定理そのまま。$\sin$ は $\sin^{2}+\cos^{2}=1$ と $0<\theta<\pi$ から決まる。`,
          blocks: [
            { k: "p", t: String.raw`余弦定理から` },
            {
              k: "math",
              t: String.raw`\mathrm{BC}^{2}=\mathrm{AB}^{2}+\mathrm{AC}^{2}-2\,\mathrm{AB}\cdot\mathrm{AC}\cos\theta`,
            },
            { k: "p", t: String.raw`すなわち $\dfrac14=1+1-2\cos\theta$ なので` },
            {
              k: "math",
              t: String.raw`2\cos\theta=2-\frac14=\frac74,\qquad\cos\theta=\frac78`,
            },
            { k: "p", t: String.raw`である。$0<\theta<\pi$ より $\sin\theta>0$ だから` },
            {
              k: "math",
              t: String.raw`\sin\theta=\sqrt{1-\left(\frac78\right)^{2}}=\sqrt{\frac{15}{64}}=\frac{\sqrt{15}}{8}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\mathrm{A}(0,0)$、$\mathrm{C}(1,0)$、$\mathrm{B}\left(\tfrac78,\tfrac{\sqrt{15}}8\right)$ とすると $\mathrm{AB}=\mathrm{AC}=1$、$\mathrm{BC}=0.5$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{B}$ から辺 $\mathrm{AC}$ に下ろした垂線の足を $\mathrm{H}$ とし、$0<s<1$ の実数 $s$ に対し辺 $\mathrm{BH}$ を $s:\left(1-s\right)$ に内分する点を $\mathrm{P}$ とするとき、$\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}$ の最小値とそのときの $s$ を求める`,
          answer: String.raw`最小値 $\dfrac{15}{16}$（$s=\dfrac23$ のとき）`,
          approach: String.raw`$\mathrm{A}$ を原点、$\mathrm{AC}$ を $x$ 軸にとって座標を入れる。$\mathrm{P}$ は $\mathrm{BH}$ 上なので $x$ 座標が固定され、$y$ 座標だけが動く1変数の2次関数になる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "A を原点、AC を x 軸にとったところ。B の座標は (cosθ, sinθ) = (7/8, √15/8) で、H はその真下。P は BH 上を動く。",
                view: [-0.2, 1.25, -0.25, 0.75],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [0, 0], b: [CO1, SI1] },
                  { k: "seg", a: [1, 0], b: [CO1, SI1] },
                  { k: "seg", a: [CO1, SI1], b: [CO1, 0], dash: true },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "C", place: "below-right" },
                  { k: "dot", at: [CO1, SI1], label: "B", place: "above-right" },
                  { k: "dot", at: [CO1, 0], label: "H", place: "below" },
                  { k: "dot", at: P1Z, label: "P", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ を原点、半直線 $\mathrm{AC}$ を $x$ 軸の正の向きにとる。$\mathrm{AC}=1$ より $\mathrm{C}(1,0)$ で、$\mathrm{AB}=1$、$\angle\mathrm{BAC}=\theta$ より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{B}\left(\cos\theta,\ \sin\theta\right)=\left(\frac78,\ \frac{\sqrt{15}}{8}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{H}$ は $\mathrm{B}$ から $x$ 軸に下ろした垂線の足なので $\mathrm{H}\left(\tfrac78,0\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $\mathrm{BH}$ を $s:\left(1-s\right)$ に内分するので、$\mathrm{P}$ の $x$ 座標は $\tfrac78$ のままで、$y$ 座標は`,
            },
            {
              k: "math",
              t: String.raw`u=\frac{\sqrt{15}}{8}\left(1-s\right)`,
            },
            { k: "p", t: String.raw`である。$0<s<1$ より $0<u<\dfrac{\sqrt{15}}{8}$ である。このとき` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}=\frac{49}{64}+u^{2},\qquad\mathrm{BP}^{2}=\left(\frac{\sqrt{15}}{8}-u\right)^{2},\qquad\mathrm{CP}^{2}=\frac{1}{64}+u^{2}`,
            },
            { k: "p", t: String.raw`である（$\mathrm{CP}$ の $x$ 方向の差は $\tfrac78-1=-\tfrac18$）。足し合わせると` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}=\frac{50}{64}+\frac{15}{64}+3u^{2}-\frac{\sqrt{15}}{4}u=3u^{2}-\frac{\sqrt{15}}{4}u+\frac{65}{64}`,
            },
            { k: "p", t: String.raw`である。$u$ の2次関数として平方完成する。$u$ の係数 $-\dfrac{\sqrt{15}}{4}$ を $2\cdot3$ で割ると $-\dfrac{\sqrt{15}}{24}$ なので` },
            {
              k: "math",
              t: String.raw`=3\left(u-\frac{\sqrt{15}}{24}\right)^{2}+\frac{65}{64}-3\left(\frac{\sqrt{15}}{24}\right)^{2}`,
            },
            { k: "p", t: String.raw`であり、$3\left(\dfrac{\sqrt{15}}{24}\right)^{2}=3\cdot\dfrac{15}{576}=\dfrac{45}{576}=\dfrac{5}{64}$ だから、定数項は` },
            {
              k: "math",
              t: String.raw`\frac{65}{64}-\frac{5}{64}=\frac{60}{64}=\frac{15}{16}`,
            },
            {
              k: "p",
              t: String.raw`である。頂点 $u=\dfrac{\sqrt{15}}{24}$ は $0<u<\dfrac{\sqrt{15}}{8}$ の内部にあるので、ここで最小値 $\dfrac{15}{16}$ をとる。このとき`,
            },
            {
              k: "math",
              t: String.raw`\frac{\sqrt{15}}{8}\left(1-s\right)=\frac{\sqrt{15}}{24},\qquad1-s=\frac13,\qquad s=\frac23`,
            },
            { k: "p", t: String.raw`である。よって最小値は $\dfrac{15}{16}$ で、$s=\dfrac23$ のときである。` },
            {
              k: "note",
              t: String.raw`$\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}$ は重心で最小になる。重心の $y$ 座標は $\dfrac{0+\frac{\sqrt{15}}8+0}{3}=\dfrac{\sqrt{15}}{24}$ で、$\mathrm{P}$ がちょうどその高さに来るときが答えである（$x$ 座標は $\tfrac78$ に固定されているが、和が $x$ と $y$ で分離するので $y$ だけ最適にすればよい）。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ は線分 $\mathrm{BH}$ 上にあるので $x$ 座標は動かない。動くのは $y$ だけで、1変数の2次関数になる。`,
            String.raw`$s:\left(1-s\right)$ の内分なので、$\mathrm{B}$ 側から測って $\mathrm{BP}:\mathrm{PH}=s:\left(1-s\right)$。$y$ 座標は $\left(1-s\right)$ 倍になる。`,
          ],
          check: String.raw`$s$ を $10^{-5}$ 刻みで動かすと、最小は $s=0.66667$ での $0.937500000$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式",
      topics: ["円と直線の距離", "共有点の個数", "連立方程式", "集合の要素数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$L$ と $M$ の交点は $(a,a)$ で、これが $C$ 上にあるのは $a=1$ のときだけだった",
          "中心 $(a,2)$ と $L,M$ の距離を半径 $\\left|a\\right|$ と比べて共有点の個数を数えると、和集合が3個になるのは $a=-8,\\ \\tfrac89,\\ 1$ のときだった",
          "$a$ を $0.0001$ 刻みで走査すると $-8$ と $1$ が出て（$\\tfrac89$ は刻みに乗らない）、$a=\\tfrac89$ を直接入れると $\\left|C\\cap L\\right|=2$、$\\left|C\\cap M\\right|=1$ で和集合3個だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a\neq0$ の実数とし、円 $C\colon x^{2}-2ax+y^{2}-4y+4=0$、直線 $L\colon-4x+3y+a=0$、直線 $M\colon3x+4y-7a=0$ を考えるとき、$L$ と $M$ の交点が $C$ 上にあるような $a$ を求める`,
          answer: String.raw`$a=1$`,
          approach: String.raw`まず $L$ と $M$ を連立して交点を求める。係数が $\left(-4,3\right)$ と $\left(3,4\right)$ で直交しているので、消去もきれいに進む。`,
          blocks: [
            { k: "p", t: String.raw`$C$ を平方完成すると` },
            {
              k: "math",
              t: String.raw`\left(x-a\right)^{2}+\left(y-2\right)^{2}=a^{2}`,
            },
            { k: "p", t: String.raw`なので、中心 $\left(a,2\right)$、半径 $\left|a\right|$ の円である（$a\neq0$ なので半径は正）。` },
            { k: "p", t: String.raw`$L,M$ を連立する。` },
            {
              k: "math",
              t: String.raw`\begin{cases}-4x+3y=-a\\3x+4y=7a\end{cases}`,
            },
            { k: "p", t: String.raw`上を $4$ 倍、下を $3$ 倍して引くと $-25x=-25a$、つまり $x=a$ である。上に戻して $-4a+3y=-a$ より $y=a$ だから、交点は` },
            { k: "math", t: String.raw`\left(a,\ a\right)` },
            { k: "p", t: String.raw`である。これが $C$ 上にある条件は` },
            {
              k: "math",
              t: String.raw`\left(a-a\right)^{2}+\left(a-2\right)^{2}=a^{2},\qquad a^{2}-4a+4=a^{2}`,
            },
            { k: "p", t: String.raw`すなわち $-4a+4=0$ で、$a=1$ である。` },
            {
              k: "note",
              t: String.raw`$L$ の法線ベクトルは $\left(-4,3\right)$、$M$ の法線ベクトルは $\left(3,4\right)$ で、内積は $-12+12=0$。つまり $L\perp M$ である。(3) でこの事実は直接は使わないが、図を描くときの見当になる。`,
            },
          ],
          check: String.raw`$a=1$ のとき交点は $(1,1)$ で、$C\colon\left(x-1\right)^{2}+\left(y-2\right)^{2}=1$ に代入すると $0+1=1$ で成り立つ。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ と $L$ が異なる2つの共有点をもつような $a$ の範囲を求める`,
          answer: String.raw`$a<-3$ または $a>\dfrac34$`,
          approach: String.raw`中心から直線までの距離が半径より小さい、という条件を書く。両辺とも $0$ 以上なので2乗して比べられる。`,
          blocks: [
            { k: "p", t: String.raw`中心 $\left(a,2\right)$ と $L\colon-4x+3y+a=0$ の距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|-4a+6+a\right|}{\sqrt{\left(-4\right)^{2}+3^{2}}}=\frac{\left|-3a+6\right|}{5}=\frac{3\left|a-2\right|}{5}`,
            },
            { k: "p", t: String.raw`である。異なる2点で交わる条件は、これが半径 $\left|a\right|$ より小さいことなので` },
            {
              k: "math",
              t: String.raw`\frac{3\left|a-2\right|}{5}<\left|a\right|,\qquad9\left(a-2\right)^{2}<25a^{2}`,
            },
            { k: "p", t: String.raw`である（両辺 $0$ 以上なので2乗してよい）。展開して整理すると` },
            {
              k: "math",
              t: String.raw`9a^{2}-36a+36<25a^{2},\qquad16a^{2}+36a-36>0,\qquad4a^{2}+9a-9>0`,
            },
            { k: "p", t: String.raw`である。左辺は $\left(4a-3\right)\left(a+3\right)$ と因数分解できるので` },
            {
              k: "math",
              t: String.raw`\left(4a-3\right)\left(a+3\right)>0,\qquad a<-3\ \text{または}\ a>\frac34`,
            },
            { k: "p", t: String.raw`である（いずれも $a\neq0$ を満たす）。` },
          ],
          pitfalls: [
            String.raw`半径は $a$ ではなく $\left|a\right|$。$a<0$ の場合を落とさない。`,
          ],
          check: String.raw`$a=1$ では距離 $\tfrac35<1$ で2点、$a=\tfrac12$ では $\tfrac{3\cdot1.5}{5}=0.9>0.5$ で共有点なしだった。`,
        },
        {
          label: "(3)",
          task: String.raw`集合 $\left\{\mathrm{P}\mid\mathrm{P}\ \text{は}\ C\ \text{と}\ L\ \text{の共有点}\right\}\cup\left\{\mathrm{P}\mid\mathrm{P}\ \text{は}\ C\ \text{と}\ M\ \text{の共有点}\right\}$ の要素の個数が $3$ となる $a$ をすべて求める`,
          answer: String.raw`$a=-8,\ \dfrac89,\ 1$`,
          approach: String.raw`$C$ と $M$ についても (2) と同じ計算をする。2つの集合が共通の要素をもつのは、その点が $L$ と $M$ の交点 $(a,a)$ でもあるときに限るので、(1) から $a=1$ のときだけ。それ以外は個数を足すだけである。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1 のとき。L と M は直交し、その交点 (1, 1) が円 C 上にある。C は L とも M とも2点で交わるが、そのうち1点が共通なので和集合は3個になる。",
                view: [-1.1, 3.3, -0.2, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "param", f: (t: number) => [1 + Math.cos(t), 2 + Math.sin(t)], from: 0, to: 2 * Math.PI },
                  { k: "curve", f: L2Z, from: 0.1, to: 2.8 },
                  { k: "curve", f: M2Z, from: -1.1, to: 2.6 },
                  { k: "dot", at: [1, 2], label: "中心 (1, 2)", place: "above-right" },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "below" },
                  { k: "text", at: [2.75, L2Z(2.75)], label: "L", place: "right" },
                  { k: "text", at: [-1.05, M2Z(-1.05)], label: "M", place: "above-right" },
                  { k: "text", at: [1, 3.05], label: "C", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`**$C$ と $M$。** 中心 $\left(a,2\right)$ と $M\colon3x+4y-7a=0$ の距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|3a+8-7a\right|}{5}=\frac{4\left|a-2\right|}{5}`,
            },
            { k: "p", t: String.raw`である。これと半径 $\left|a\right|$ を比べると` },
            {
              k: "steps",
              items: [
                String.raw`$16\left(a-2\right)^{2}<25a^{2}\iff9a^{2}+64a-64>0\iff\left(9a-8\right)\left(a+8\right)>0\iff a<-8$ または $a>\dfrac89$：2点`,
                String.raw`$\left(9a-8\right)\left(a+8\right)=0\iff a=-8$ または $a=\dfrac89$：1点（接する）`,
                String.raw`それ以外：0点`,
              ],
            },
            { k: "p", t: String.raw`である。(2) と同様に $C$ と $L$ については` },
            {
              k: "steps",
              items: [
                String.raw`$a<-3$ または $a>\dfrac34$：2点`,
                String.raw`$a=-3$ または $a=\dfrac34$：1点`,
                String.raw`それ以外：0点`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**重なりの有無。** 2つの集合が共通の点をもつなら、その点は $L$ 上にも $M$ 上にもあるので $L$ と $M$ の交点 $(a,a)$ であり、かつ $C$ 上にある。(1) よりそれは $a=1$ のときだけである。`,
            },
            {
              k: "p",
              t: String.raw`**$a\neq1$ のとき。** 2つの集合は交わらないので、要素数は $\left|C\cap L\right|+\left|C\cap M\right|$ である。これが $3$ になるのは $\left(2,1\right)$ か $\left(1,2\right)$ の組み合わせのときである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left|C\cap L\right|=1$ は $a=-3,\ \tfrac34$。このとき $\left|C\cap M\right|=2$ には $a<-8$ か $a>\tfrac89$ が必要だが、$-3$ も $\tfrac34$ も当てはまらない。不適`,
                String.raw`$\left|C\cap M\right|=1$ は $a=-8,\ \tfrac89$。$a=-8$ は $a<-3$ を満たし、$a=\tfrac89$ は $\tfrac89>\tfrac34$ を満たすので、どちらも $\left|C\cap L\right|=2$。適する`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$a=1$ のとき。** 距離は $L$ について $\tfrac35$、$M$ について $\tfrac45$ で、どちらも半径 $1$ より小さいので $\left|C\cap L\right|=\left|C\cap M\right|=2$ である。共通の点 $(1,1)$ が1つあるので、和集合の要素数は`,
            },
            { k: "math", t: String.raw`2+2-1=3` },
            { k: "p", t: String.raw`で、条件を満たす。` },
            { k: "p", t: String.raw`以上より、求める $a$ は` },
            { k: "math", t: String.raw`a=-8,\quad\frac89,\quad1` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a=1$ の「2点ずつだが1点が共通」を見落としやすい。(1) はそのための誘導である。`,
            String.raw`$\left|C\cap L\right|=1$ の2つの値がいずれも $\left|C\cap M\right|=2$ の条件を満たさないことを、きちんと確認する。`,
          ],
          check: String.raw`$a=-8$ では $L$ との距離 $6<8$（2点）、$M$ との距離 $8=8$（接する）で和集合3個。$a=\tfrac89$ では $\tfrac23<\tfrac89$（2点）と $\tfrac89=\tfrac89$（接する）で3個だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["数学的帰納法", "指数の大小", "小さい場合の調べ上げ", "不定方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $11$ まで $2^{n}+n^{2}+8$ と $3^{n}$ を比べると、$\\geqq$ になるのは $n=1,2$ だけだった（差は $8,\\ 7,\\ -2,\\ -41,\\dots$）",
          "$n=1$ では $a+b=8$ の9組、$n=2$ では $2a+b=7$ の4組、合わせて13組になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n\geqq3$ のとき $2^{n}+n^{2}+8<3^{n}$ が成り立つことを示す`,
          answer: String.raw`$n=3$ で $25<27$。帰納法の step は $3\cdot3^{n}>3\left(2^{n}+n^{2}+8\right)$ と $2\cdot2^{n}+\left(n+1\right)^{2}+8\leqq3\cdot2^{n}+3n^{2}+24$ から`,
          approach: String.raw`数学的帰納法。$3^{n+1}=3\cdot3^{n}$ と $3$ 倍になるのに対し、左辺は $2^{n}$ が $2$ 倍、$n^{2}$ が少し増えるだけなので、余裕をもって押さえられる。`,
          blocks: [
            { k: "p", t: String.raw`$n=3$ のとき $2^{3}+3^{2}+8=25$、$3^{3}=27$ で $25<27$ ✓。` },
            { k: "p", t: String.raw`$n\geqq3$ で $2^{n}+n^{2}+8<3^{n}$ が成り立つと仮定する。このとき` },
            {
              k: "math",
              t: String.raw`3^{n+1}=3\cdot3^{n}>3\left(2^{n}+n^{2}+8\right)=3\cdot2^{n}+3n^{2}+24`,
            },
            { k: "p", t: String.raw`である。一方、示したい式の左辺は` },
            {
              k: "math",
              t: String.raw`2^{n+1}+\left(n+1\right)^{2}+8=2\cdot2^{n}+n^{2}+2n+9`,
            },
            { k: "p", t: String.raw`である。両者の差をとると` },
            {
              k: "math",
              t: String.raw`\left(3\cdot2^{n}+3n^{2}+24\right)-\left(2\cdot2^{n}+n^{2}+2n+9\right)=2^{n}+2n^{2}-2n+15`,
            },
            {
              k: "p",
              t: String.raw`で、$2^{n}>0$、$2n^{2}-2n=2n\left(n-1\right)\geqq0$（$n\geqq1$）だからこれは正である。よって`,
            },
            {
              k: "math",
              t: String.raw`2^{n+1}+\left(n+1\right)^{2}+8<3\cdot2^{n}+3n^{2}+24<3^{n+1}`,
            },
            { k: "p", t: String.raw`となり、$n+1$ でも成り立つ。数学的帰納法より $n\geqq3$ のすべてで成り立つ。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$3^{n+1}>3\left(\text{左辺}\right)$ という「3倍の余裕」を作ってから比べる。直接 $2^{n+1}+\cdots<3^{n+1}$ を示そうとすると手がかりが少ない。`,
          ],
          check: String.raw`$n=3,\dots,11$ で数値を比べると、差 $3^{n}-\left(2^{n}+n^{2}+8\right)$ は $2,41,178,621,2002,6233,19082,57917,174970$ とどんどん開いた。`,
        },
        {
          label: "(2)",
          task: String.raw`不等式 $2^{n}+n^{2}+8\geqq3^{n}$ を満たす $n$ をすべて求める`,
          answer: String.raw`$n=1,\ 2$`,
          approach: String.raw`(1) より $n\geqq3$ はすべて不適。残る $n=1,2$ を直接確かめるだけ。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $n\geqq3$ では $2^{n}+n^{2}+8<3^{n}$ なので、条件を満たさない。残りを調べる。` },
            {
              k: "steps",
              items: [
                String.raw`$n=1$：$2+1+8=11\geqq3$ ✓`,
                String.raw`$n=2$：$4+4+8=16\geqq9$ ✓`,
              ],
            },
            { k: "p", t: String.raw`よって求める $n$ は` },
            { k: "math", t: String.raw`n=1,\ 2` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1,\dots,11$ を計算すると、$\geqq$ になるのは $n=1,2$ だけだった。`,
        },
        {
          label: "(3)",
          task: String.raw`等式 $2^{n}+n^{2}+8=3^{n}+an+b$ を満たす $a,b,n$（$a,b$ は $0$ 以上の整数、$n$ は正の整数）の組をすべて求める`,
          answer: String.raw`$n=1$ で $a+b=8$ となる9組、$n=2$ で $2a+b=7$ となる4組、計13組`,
          approach: String.raw`$a,b\geqq0$ なので右辺の $an+b$ は $0$ 以上。したがって $2^{n}+n^{2}+8-3^{n}\geqq0$ が必要で、(2) から $n$ が $1$ か $2$ に限られる。`,
          blocks: [
            { k: "p", t: String.raw`$D(n)=2^{n}+n^{2}+8-3^{n}$ とおくと、条件は` },
            { k: "math", t: String.raw`D(n)=an+b` },
            {
              k: "p",
              t: String.raw`である。$a,b\geqq0$、$n\geqq1$ より右辺は $0$ 以上だから $D(n)\geqq0$ が必要で、(2) より $n=1$ または $n=2$ である。`,
            },
            { k: "p", t: String.raw`**$n=1$。** $D(1)=2+1+8-3=8$ なので $a+b=8$ である。$a,b\geqq0$ の整数だから` },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(0,8\right),\left(1,7\right),\left(2,6\right),\left(3,5\right),\left(4,4\right),\left(5,3\right),\left(6,2\right),\left(7,1\right),\left(8,0\right)`,
            },
            { k: "p", t: String.raw`の9組である。` },
            { k: "p", t: String.raw`**$n=2$。** $D(2)=4+4+8-9=7$ なので $2a+b=7$ である。$b=7-2a\geqq0$ より $a\leqq3$ だから` },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(0,7\right),\left(1,5\right),\left(2,3\right),\left(3,1\right)`,
            },
            { k: "p", t: String.raw`の4組である。` },
            { k: "p", t: String.raw`以上、求める組 $(a,b,n)$ は合わせて**13組**である。` },
            {
              k: "note",
              t: String.raw`$a,b$ が $0$ 以上という条件が、$n$ を2通りに絞る決め手になっている。もし $a,b$ が負でもよければ、どの $n$ でも解が作れてしまう。`,
            },
          ],
          pitfalls: [
            String.raw`$a=0$ や $b=0$ も「$0$ 以上の整数」なので含める。`,
            String.raw`$n$ が先に決まり、そのあと $a,b$ の組を数える、という順番で考える。`,
          ],
          check: String.raw`全探索すると $n=1$ で9組、$n=2$ で4組の計13組だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["復元と非復元の混在", "状態の推移", "負の二項分布", "比をとって最大を探す"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "箱と手元の状態を分数のまま遷移させると、2回後に手元が白2個は $\\tfrac3{40}$、3回後に白1赤1は $\\tfrac9{40}$ だった",
          "ちょうど $n$ 回目で停止する確率を分数で求めると $\\tfrac1{32},\\tfrac5{64},\\tfrac{15}{128},\\tfrac{35}{256},\\tfrac{35}{256},\\tfrac{63}{512},\\dots$ となり、$\\dfrac{ {}_{n-1}\\mathrm{C}_{4}}{2^{n}}$ と完全に一致した",
          "最大になるのは $n=8$ と $n=9$（ともに $\\tfrac{35}{256}$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`白玉3個・赤玉2個の計5個が入った箱から無作為に玉を1個取り出し、硬貨を投げて表なら手元に残し裏なら箱に戻す試行を行う（箱が空になったら停止）。2回の試行の結果、手元に白玉が2個ある確率を求める`,
          answer: String.raw`$\dfrac{3}{40}$`,
          approach: String.raw`2回とも「白を引いて表」であればよい。1回目で白が1個減るので、2回目の箱の中身が変わることに注意する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`手元に白が2個あるには、2回とも「白玉を引き、かつ表が出る」必要がある。`,
            },
            {
              k: "steps",
              items: [
                String.raw`1回目：箱は白3・赤2の5個。白を引く確率 $\dfrac35$、表が出る確率 $\dfrac12$`,
                String.raw`2回目：1回目で白が1個減っているので箱は白2・赤2の4個。白を引く確率 $\dfrac24=\dfrac12$、表が出る確率 $\dfrac12$`,
              ],
            },
            { k: "p", t: String.raw`よって求める確率は` },
            {
              k: "math",
              t: String.raw`\frac35\cdot\frac12\cdot\frac12\cdot\frac12=\frac{3}{40}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`表が出たら玉は箱に戻らないので、2回目の箱の中身が変わる。確率を使い回さない。`,
          ],
          check: String.raw`状態を分数のまま遷移させると $\tfrac3{40}=0.075$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`3回の試行の結果、手元の玉が白玉1個・赤玉1個の計2個となる確率を求める`,
          answer: String.raw`$\dfrac{9}{40}$`,
          approach: String.raw`3回のうち裏が1回、表が2回で、残った2個が白1・赤1。裏が何回目かで3つに分け、さらに白と赤の順で2つに分ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3回のうち表が2回（白1個と赤1個を残す）、裏が1回である。裏が何回目かで場合分けする。玉を戻す回は箱の中身を変えないことに注意する。`,
            },
            {
              k: "p",
              t: String.raw`**裏が1回目。** 1回目はどの玉でもよく裏（確率 $\tfrac12$）。箱は白3赤2のまま。2・3回目で白と赤を1個ずつ残すので`,
            },
            {
              k: "math",
              t: String.raw`\frac12\left(\frac35\cdot\frac12\cdot\frac24\cdot\frac12+\frac25\cdot\frac12\cdot\frac34\cdot\frac12\right)=\frac12\left(\frac3{40}+\frac3{40}\right)=\frac{3}{40}`,
            },
            { k: "p", t: String.raw`である（白→赤の順と赤→白の順）。` },
            {
              k: "p",
              t: String.raw`**裏が2回目。** 1回目に白（または赤）を表で残し、2回目は裏、3回目に赤（または白）を表で残す。`,
            },
            {
              k: "math",
              t: String.raw`\frac35\cdot\frac12\cdot\frac12\cdot\frac24\cdot\frac12+\frac25\cdot\frac12\cdot\frac12\cdot\frac34\cdot\frac12=\frac{3}{80}+\frac{3}{80}=\frac{3}{40}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**裏が3回目。** 1・2回目で白と赤を1個ずつ残し、3回目が裏。`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac35\cdot\frac12\cdot\frac24\cdot\frac12+\frac25\cdot\frac12\cdot\frac34\cdot\frac12\right)\cdot\frac12=\frac{3}{20}\cdot\frac12=\frac{3}{40}`,
            },
            { k: "p", t: String.raw`である。3つを足して` },
            {
              k: "math",
              t: String.raw`\frac{3}{40}\times3=\frac{9}{40}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`3つの場合がすべて $\tfrac3{40}$ になるのは偶然ではない。裏の回は箱の中身を変えないので、「表が出た2回がどの玉だったか」の確率が裏の位置によらないからである。`,
            },
          ],
          pitfalls: [
            String.raw`裏が出た回も「玉を引く」ので、どの玉を引いたかで確率は分かれない（戻すので状態は同じ）。まとめて確率 $1\cdot\tfrac12$ と扱える。`,
            String.raw`表が出た2回の順（白が先か赤が先か）で箱の中身が変わるので、両方を計算する。`,
          ],
          check: String.raw`状態を分数のまま遷移させると $\tfrac9{40}=0.225$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ を $5$ 以上の整数とするとき、ちょうど $n$ 回目で試行が停止する確率 $p_{n}$ を求める`,
          answer: String.raw`$p_{n}=\dfrac{ {}_{n-1}\mathrm{C}_{4}}{2^{n}}$`,
          approach: String.raw`停止するのは5個目の玉を手元に残した瞬間。どの玉を引いたかは停止のタイミングに関係しないので、「表が出た回数」だけを見ればよく、ふつうの反復試行になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`箱の玉が減るのは「表が出た」ときだけで、どの色の玉を引いたかは関係しない。したがって、$k$ 回の試行のあとに箱から減った玉の個数は「表が出た回数」に等しい。`,
            },
            {
              k: "p",
              t: String.raw`ちょうど $n$ 回目で停止するのは、$n$ 回目が表（5個目を残す）で、かつ最初の $n-1$ 回のうち表がちょうど4回のときである。表・裏はそれぞれ確率 $\tfrac12$ で独立だから`,
            },
            {
              k: "math",
              t: String.raw`p_{n}={}_{n-1}\mathrm{C}_{4}\left(\frac12\right)^{4}\left(\frac12\right)^{n-5}\cdot\frac12=\frac{ {}_{n-1}\mathrm{C}_{4}}{2^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=5$ なら $\dfrac{ {}_{4}\mathrm{C}_{4}}{2^{5}}=\dfrac1{32}$ で、これは5回とも表が出る確率 $\left(\tfrac12\right)^{5}$ と一致する。`,
            },
          ],
          pitfalls: [
            String.raw`玉の色は停止のタイミングに影響しない。色ごとに場合分けしようとすると、かえって複雑になる。`,
            String.raw`「$n$ 回目が表」を忘れない。最初の $n-1$ 回で4回表、というだけでは $n$ 回目に停止するとは限らない。`,
          ],
          check: String.raw`状態を分数のまま遷移させて停止確率を求めると $p_{5},\dots,p_{10}=\tfrac1{32},\tfrac5{64},\tfrac{15}{128},\tfrac{35}{256},\tfrac{35}{256},\tfrac{63}{512}$ で、この式と完全に一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$p_{n}$ が最大となる $n$ を求める`,
          answer: String.raw`$n=8,\ 9$`,
          approach: String.raw`階乗の比は約分できるので、$\dfrac{p_{n+1}}{p_{n}}$ を $1$ と比べる。これで増減が一気に分かる。`,
          blocks: [
            { k: "p", t: String.raw`比をとると` },
            {
              k: "math",
              t: String.raw`\frac{p_{n+1}}{p_{n}}=\frac{ {}_{n}\mathrm{C}_{4}}{2^{n+1}}\cdot\frac{2^{n}}{ {}_{n-1}\mathrm{C}_{4}}=\frac12\cdot\frac{ {}_{n}\mathrm{C}_{4}}{ {}_{n-1}\mathrm{C}_{4}}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{ {}_{n}\mathrm{C}_{4}}{ {}_{n-1}\mathrm{C}_{4}}=\dfrac{n}{n-4}$（$n\geqq5$）なので` },
            {
              k: "math",
              t: String.raw`\frac{p_{n+1}}{p_{n}}=\frac{n}{2\left(n-4\right)}`,
            },
            { k: "p", t: String.raw`である。これを $1$ と比べると、$n-4>0$ だから` },
            {
              k: "math",
              t: String.raw`\frac{n}{2\left(n-4\right)}>1\iff n>2n-8\iff n<8`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "steps",
              items: [
                String.raw`$5\leqq n<8$：$p_{n}<p_{n+1}$（増加）`,
                String.raw`$n=8$：$p_{8}=p_{9}$`,
                String.raw`$n>8$：$p_{n}>p_{n+1}$（減少）`,
              ],
            },
            { k: "p", t: String.raw`となり、$p_{n}$ が最大になるのは` },
            { k: "math", t: String.raw`n=8,\ 9` },
            {
              k: "p",
              t: String.raw`のときである（最大値は $p_{8}=p_{9}=\dfrac{ {}_{7}\mathrm{C}_{4}}{2^{8}}=\dfrac{35}{256}$）。`,
            },
          ],
          pitfalls: [
            String.raw`差ではなく比をとる。階乗と $2^{n}$ がどちらも約分できる。`,
            String.raw`$n=8$ で比がちょうど $1$ になるので、最大を与える $n$ は2つある。1つだけ答えない。`,
          ],
          check: String.raw`分数で計算すると $p_{7}=\tfrac{15}{128}=\tfrac{30}{256}$、$p_{8}=p_{9}=\tfrac{35}{256}$、$p_{10}=\tfrac{63}{512}=\tfrac{31.5}{256}$ で、$n=8,9$ が最大だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "複素数平面",
      topics: ["分母の実数化", "軌跡が円になること", "媒介変数表示", "図示"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$t=-1,-0.5,0,0.5,1,3$ で $z=\\dfrac{-1}{t+i}$ の実部・虚部が $\\dfrac{-t}{t^{2}+1}$、$\\dfrac{1}{t^{2}+1}$ と一致した",
          "同じ $t$ で $\\left|z-\\tfrac i2\\right|$ がすべて $0.500000000$ になった",
          "$t=-1,0,1$ での $z$ は $\\tfrac12+\\tfrac i2$、$i$、$-\\tfrac12+\\tfrac i2$ で、円の上半分の両端と頂点にあたる",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数 $t$ に対して $z=\dfrac{-1}{t+i}$ とするとき、$z$ の実部と虚部を $t$ で表す`,
          answer: String.raw`実部 $-\dfrac{t}{t^{2}+1}$、虚部 $\dfrac{1}{t^{2}+1}$`,
          approach: String.raw`分母の共役を分母・分子に掛けて実数化する。`,
          blocks: [
            { k: "p", t: String.raw`分母・分子に $t-i$ を掛けると` },
            {
              k: "math",
              t: String.raw`z=\frac{-1}{t+i}=\frac{-\left(t-i\right)}{\left(t+i\right)\left(t-i\right)}=\frac{-t+i}{t^{2}+1}`,
            },
            { k: "p", t: String.raw`である（$t$ は実数なので $t+i\neq0$）。よって` },
            {
              k: "math",
              t: String.raw`\operatorname{Re}z=-\frac{t}{t^{2}+1},\qquad\operatorname{Im}z=\frac{1}{t^{2}+1}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=-0.5$ では $z=0.4+0.8i$ で、$\tfrac{0.5}{1.25}=0.4$、$\tfrac{1}{1.25}=0.8$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`絶対値 $\left|z-\dfrac i2\right|$ を求める`,
          answer: String.raw`$\dfrac12$（$t$ によらず一定）`,
          approach: String.raw`(1) の成分で引き算して2乗和を計算する。分子が $\left(t^{2}+1\right)^{2}$ にまとまる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`z-\frac i2=-\frac{t}{t^{2}+1}+i\left(\frac{1}{t^{2}+1}-\frac12\right)=-\frac{t}{t^{2}+1}+i\cdot\frac{1-t^{2}}{2\left(t^{2}+1\right)}`,
            },
            { k: "p", t: String.raw`である。絶対値の2乗は` },
            {
              k: "math",
              t: String.raw`\left|z-\frac i2\right|^{2}=\frac{t^{2}}{\left(t^{2}+1\right)^{2}}+\frac{\left(1-t^{2}\right)^{2}}{4\left(t^{2}+1\right)^{2}}=\frac{4t^{2}+\left(1-t^{2}\right)^{2}}{4\left(t^{2}+1\right)^{2}}`,
            },
            { k: "p", t: String.raw`で、分子は` },
            {
              k: "math",
              t: String.raw`4t^{2}+1-2t^{2}+t^{4}=t^{4}+2t^{2}+1=\left(t^{2}+1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\left|z-\frac i2\right|^{2}=\frac14,\qquad\left|z-\frac i2\right|=\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`つまり $z$ は、$t$ が何であっても中心 $\dfrac i2$、半径 $\dfrac12$ の円の上にある。`,
            },
          ],
          check: String.raw`$t=-1,-0.5,0,0.5,1,3$ のいずれでも $\left|z-\tfrac i2\right|=0.500000000$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`実数 $t$ が $-1\leqq t\leqq1$ の範囲を動くとき、点 $z$ がどのような図形を描くかを複素数平面上に図示する`,
          answer: String.raw`中心 $\dfrac i2$、半径 $\dfrac12$ の円の上半分（$\operatorname{Im}z\geqq\dfrac12$ の部分）。両端 $\pm\dfrac12+\dfrac i2$ を含む`,
          approach: String.raw`(2) より $z$ は円周上にある。あとはどの範囲を動くかで、偏角を調べる。$t=\tan\alpha$ とおくと半角の形になって一目で分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $z$ は中心 $\dfrac i2$、半径 $\dfrac12$ の円 $K$ の上にある。$z-\dfrac i2=\dfrac12\left(\cos\varphi+i\sin\varphi\right)$ とおくと、(2) の計算から`,
            },
            {
              k: "math",
              t: String.raw`\cos\varphi=\frac{-2t}{t^{2}+1},\qquad\sin\varphi=\frac{1-t^{2}}{t^{2}+1}`,
            },
            {
              k: "p",
              t: String.raw`である。$t=\tan\alpha$（$-\tfrac\pi4\leqq\alpha\leqq\tfrac\pi4$ が $-1\leqq t\leqq1$ に対応）とおくと、2倍角の公式から`,
            },
            {
              k: "math",
              t: String.raw`\frac{2t}{1+t^{2}}=\sin2\alpha,\qquad\frac{1-t^{2}}{1+t^{2}}=\cos2\alpha`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\cos\varphi=-\sin2\alpha=\cos\left(\frac\pi2+2\alpha\right),\qquad\sin\varphi=\cos2\alpha=\sin\left(\frac\pi2+2\alpha\right)`,
            },
            {
              k: "p",
              t: String.raw`である。よって $\varphi=\dfrac\pi2+2\alpha$ ととれる。$-\dfrac\pi4\leqq\alpha\leqq\dfrac\pi4$ では`,
            },
            { k: "math", t: String.raw`0\leqq\varphi\leqq\pi` },
            {
              k: "p",
              t: String.raw`であり、$\varphi$ は $\alpha$ とともに連続に増加する。したがって $z$ は円 $K$ の上半分（$\varphi$ が $0$ から $\pi$ までの部分）をちょうど1回描く。端点は`,
            },
            {
              k: "math",
              t: String.raw`t=-1\ \left(\varphi=0\right)\colon\ z=\frac12+\frac i2,\qquad t=1\ \left(\varphi=\pi\right)\colon\ z=-\frac12+\frac i2`,
            },
            { k: "p", t: String.raw`で、$t=0$（$\varphi=\tfrac\pi2$）では $z=i$ である。図示すると次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "太い弧が答え。中心 i/2、半径 1/2 の円の上半分で、両端 1/2 + i/2 と -1/2 + i/2 を含む。原点（t → ±∞ に対応）は含まない。",
                view: [-1.0, 1.0, -0.35, 1.35],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t) / 2, 0.5 + Math.sin(t) / 2],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t) / 2, 0.5 + Math.sin(t) / 2],
                    from: 0,
                    to: Math.PI,
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [0, 0.5], label: "i/2", place: "left" },
                  { k: "dot", at: [0, 1], label: "i（t = 0）", place: "above-right" },
                  { k: "dot", at: [0.5, 0.5], label: "1/2 + i/2（t = -1）", place: "right" },
                  { k: "dot", at: [-0.5, 0.5], label: "-1/2 + i/2（t = 1）", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`円周全体ではなく上半分だけ。$t$ の範囲が偏角の範囲を決める。`,
            String.raw`$\operatorname{Im}z=\dfrac{1}{t^{2}+1}$ は $-1\leqq t\leqq1$ で $\dfrac12\leqq\operatorname{Im}z\leqq1$。これを見ても「上半分」が分かる。`,
          ],
          check: String.raw`$t=-1,0,1$ での $z$ はそれぞれ $\tfrac12+\tfrac i2$、$i$、$-\tfrac12+\tfrac i2$ で、弧の右端・頂点・左端にあたった。`,
        },
      ],
    },
    {
      no: 6,
      field: "積分法",
      topics: ["置換積分による対称性", "部分積分", "漸化式", "有理数であることの証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$(m,n)$ を6通りとって数値積分すると $A(m,n)=A(n,m)$、$A(m+2,n)+A(m,n+2)=A(m,n)$ がいずれも小数9桁まで成り立った",
          "$A(m,1)=\\dfrac{1}{m+1}$ が $m=1,2,3,5$ で一致した",
          "$A(m,n+2)=\\dfrac{n+1}{m+1}A(m+2,n)$ が6通りすべてで一致した",
          "$A(2,2)=0.196349541=\\dfrac{\\pi}{16}$（$m,n$ とも偶数のときは有理数にならない）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$A(m,n)=\displaystyle\int_{0}^{\frac\pi2}\cos^{m}x\sin^{n}x\,dx$ について、$A(m,n)=A(n,m)$ と $A(m+2,n)+A(m,n+2)=A(m,n)$ を示す`,
          answer: String.raw`前者は $x=\tfrac\pi2-u$ の置換、後者は $\cos^{2}x+\sin^{2}x=1$`,
          approach: String.raw`1つめは「$\sin$ と $\cos$ を入れ替える置換」。2つめは足すと $1$ になることを使って括り出すだけ。`,
          blocks: [
            { k: "p", t: String.raw`**前半。** $x=\dfrac\pi2-u$ とおくと $dx=-du$、$\cos x=\sin u$、$\sin x=\cos u$ で、$x$ が $0\to\tfrac\pi2$ のとき $u$ は $\tfrac\pi2\to0$ である。よって` },
            {
              k: "math",
              t: String.raw`A(m,n)=\int_{\frac\pi2}^{0}\sin^{m}u\cos^{n}u\left(-du\right)=\int_{0}^{\frac\pi2}\cos^{n}u\sin^{m}u\,du=A(n,m)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**後半。** 被積分関数を足すと` },
            {
              k: "math",
              t: String.raw`\cos^{m+2}x\sin^{n}x+\cos^{m}x\sin^{n+2}x=\cos^{m}x\sin^{n}x\left(\cos^{2}x+\sin^{2}x\right)=\cos^{m}x\sin^{n}x`,
            },
            { k: "p", t: String.raw`なので、$0$ から $\tfrac\pi2$ まで積分して` },
            {
              k: "math",
              t: String.raw`A(m+2,n)+A(m,n+2)=A(m,n)`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          check: String.raw`$(m,n)=(2,3)$ で数値積分すると $A(2,3)=A(3,2)=0.133333333$、$A(4,3)+A(2,5)=0.133333333$ で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$A(m,1)$ を求める`,
          answer: String.raw`$A(m,1)=\dfrac{1}{m+1}$`,
          approach: String.raw`$\sin x\,dx$ が $\cos x$ の微分（符号つき）なので、$\cos x=u$ の置換でただの多項式の積分になる。`,
          blocks: [
            { k: "p", t: String.raw`$u=\cos x$ とおくと $du=-\sin x\,dx$、$x$ が $0\to\tfrac\pi2$ のとき $u$ は $1\to0$ である。よって` },
            {
              k: "math",
              t: String.raw`A(m,1)=\int_{0}^{\frac\pi2}\cos^{m}x\sin x\,dx=\int_{1}^{0}u^{m}\left(-du\right)=\int_{0}^{1}u^{m}du=\frac{1}{m+1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(1) より $A(1,n)=A(n,1)=\dfrac{1}{n+1}$ でもある。`,
            },
          ],
          check: String.raw`$m=1,2,3,5$ で数値積分すると $0.5,\ 0.333333333,\ 0.25,\ 0.166666667$ で、$\tfrac1{m+1}$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$A(m,n+2)=\dfrac{n+1}{m+1}A(m+2,n)$ が成り立つことを示す`,
          answer: String.raw`$\cos^{m}x\sin x$ を積分、$\sin^{n+1}x$ を微分して部分積分すると、境界項が $0$ になる`,
          approach: String.raw`$\cos^{m}x\sin^{n+2}x=\left(\cos^{m}x\sin x\right)\cdot\sin^{n+1}x$ と分け、前半を積分する側にとる。原始関数が $-\dfrac{\cos^{m+1}x}{m+1}$ になり、分母の $m+1$ が出てくる。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{d}{dx}\left(-\dfrac{\cos^{m+1}x}{m+1}\right)=\cos^{m}x\sin x$ である。これを使って部分積分すると` },
            {
              k: "math",
              t: String.raw`A(m,n+2)=\int_{0}^{\frac\pi2}\sin^{n+1}x\cdot\left(\cos^{m}x\sin x\right)dx=\left[-\frac{\sin^{n+1}x\cos^{m+1}x}{m+1}\right]_{0}^{\frac\pi2}+\int_{0}^{\frac\pi2}\frac{\cos^{m+1}x}{m+1}\left(n+1\right)\sin^{n}x\cos x\,dx`,
            },
            {
              k: "p",
              t: String.raw`である。境界項は、$x=\tfrac\pi2$ で $\cos^{m+1}x=0$、$x=0$ で $\sin^{n+1}x=0$ なので $0$ である（$m,n\geqq1$）。残った積分は`,
            },
            {
              k: "math",
              t: String.raw`\frac{n+1}{m+1}\int_{0}^{\frac\pi2}\cos^{m+2}x\sin^{n}x\,dx=\frac{n+1}{m+1}A(m+2,n)`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`A(m,n+2)=\frac{n+1}{m+1}A(m+2,n)`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`どちらを積分する側にとるかで分母が決まる。$\cos^{m}x\sin x$ を積分側にとると $m+1$ が分母に出て、目的の形になる。`,
          ],
          check: String.raw`$(m,n)=(5,4)$ では $A(5,6)=0.011544012$、$\tfrac{5}{6}A(7,4)=0.011544012$ で一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$m$ または $n$ が奇数ならば $A(m,n)$ は有理数であることを示す`,
          answer: String.raw`(1) で $m$ が奇数の場合を $n$ が奇数の場合に帰着させ、(2) を出発点に (3) で $n$ を $2$ ずつ上げる帰納法`,
          approach: String.raw`(1)(2)(3) がそのまま道具になる。(1) で「$n$ が奇数」の場合だけ示せばよいことにし、(2) を $n=1$ の場合、(3) を $n$ を $2$ 増やす step として使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $A(m,n)=A(n,m)$ なので、$m$ が奇数の場合は $n$ が奇数の場合に帰着する。よって「$n$ が奇数ならば $A(m,n)$ は有理数」を示せばよい。`,
            },
            {
              k: "p",
              t: String.raw`$n=2k+1$（$k\geqq0$）として、$k$ についての数学的帰納法で「すべての正の整数 $m$ に対し $A(m,2k+1)$ は有理数」を示す。`,
            },
            {
              k: "p",
              t: String.raw`**$k=0$。** (2) より $A(m,1)=\dfrac{1}{m+1}$ で、これは有理数である。`,
            },
            {
              k: "p",
              t: String.raw`**$k\to k+1$。** すべての $m$ について $A(m,2k+1)$ が有理数と仮定する。(3) で $n=2k+1$ とすると`,
            },
            {
              k: "math",
              t: String.raw`A\left(m,\ 2k+3\right)=\frac{2k+2}{m+1}A\left(m+2,\ 2k+1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。右辺は有理数 $\dfrac{2k+2}{m+1}$ と、仮定より有理数である $A(m+2,2k+1)$ の積だから有理数である。`,
            },
            {
              k: "p",
              t: String.raw`よって数学的帰納法より、$n$ が奇数のとき $A(m,n)$ はつねに有理数である。$m$ が奇数のときも (1) より同じ結論になる。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$m,n$ がともに偶数のときは有理数にならないことがある。たとえば $A(2,2)=\dfrac{\pi}{16}=0.19635\cdots$ である。実際 $A(m,n)$ の値は、$m,n$ がともに偶数のときだけ $\pi$ を含む。`,
            },
          ],
          pitfalls: [
            String.raw`帰納法は「すべての $m$ について」という形で回す。(3) で $m$ が $m+2$ に変わるので、$m$ を固定したままでは回らない。`,
            String.raw`$u=\cos x$ の置換で $\int_{0}^{1}u^{m}\left(1-u^{2}\right)^{k}du$ に直して「多項式の積分だから有理数」としてもよい。こちらのほうが短い。`,
          ],
          check: String.raw`$A(2,3)=\tfrac2{15}=0.133333333$、$A(4,1)=\tfrac15=0.2$、$A(5,4)=0.025396825=\tfrac{8}{315}$ と、いずれも有理数だった。`,
        },
      ],
    },
  ],
};
