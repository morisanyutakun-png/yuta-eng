import { tohokuRikei2023 } from "@/lib/solutions/tohoku-rikei-2023";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2023年度（令和5年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第1問は理系の第1問とまったく同じ問題**だった（小問の並びも同じ）。
 * 同じ問題に別々の解説を書くと食い違いが生まれるので、解説は理系の側から借りる。
 * 第2問から第4問は文系だけの問題なので、自分で解き直した
 * （第4問は理系の第6問と設定だけ共通だが、与えられた関数が違う別の問題である）。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2023.questions.find((q) => q.no === no)!;

/** 理系 第1問（確率）。文系の第1問とまったく同じ問題。 */
const sharedGame: Question = { ...rikei(1), no: 1 };

/** 第2問の図。円 $C$ は中心 $\mathrm{O}$、半径 $1$。$\mathrm{L}(4,0)$。 */
const MY23 = Math.sqrt(15) / 4;
const PT_L: [number, number] = [4, 0];
const PT_M: [number, number] = [0.25, MY23];
const PT_N: [number, number] = [0.25, -MY23];

/** 第3問の図。$m(a)$ のグラフ。 */
const M3L = (a: number): number => 3 * a * a + 12 * a + 6;
const M3M = (a: number): number => -a * a - 3;
const M3R = (a: number): number => 3 * a * a - 3;

/** 第4問 (1) の通過領域。頂点を順に並べた多角形。 */
const SWEEP1: [number, number][] = [
  [0, 0],
  [1, 2],
  [2, 3],
  [3, 1],
  [2, 0],
  [4 / 3, 4 / 3],
  [5 / 4, 3 / 2],
  [1, 1],
];

/** 第4問 (3) の通過領域。$f(x)=\tfrac12(x-1)^{2}$。 */
const F43 = (x: number): number => 0.5 * (x - 1) ** 2;
const SWEEP3: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = (2 * i) / 40;
    return [x, F43(x)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = 2 - (2 * i) / 40;
    return [x + 1, F43(x) + 1];
  }),
];

export const tohokuBunkei2023: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    sharedGame,
    {
      no: 2,
      field: "図形と計量",
      topics: ["円の接線", "三平方の定理", "内接円の半径", "外接円の半径"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{M}\\left(\\tfrac14,\\tfrac{\\sqrt{15}}4\\right)$ が円上にあり、$\\overrightarrow{\\mathrm{LM}}\\cdot\\overrightarrow{\\mathrm{OM}}=0$（接線であること）を確かめた",
          "$\\triangle\\mathrm{LMN}$ の面積は $3.630921887$ で、$\\tfrac{15\\sqrt{15}}{16}=3.630921887$ と一致した",
          "$r=\\dfrac{S}{s}=0.750000000$、$R=\\dfrac{abc}{4S}=2.000000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の半径 $1$ の円 $C$ の中心 $\mathrm{O}$ から距離 $4$ だけ離れた点 $\mathrm{L}$ をとる。$\mathrm{L}$ を通る円 $C$ の2本の接線を考え、この2本の接線と円 $C$ の接点をそれぞれ $\mathrm{M},\mathrm{N}$ とするとき、三角形 $\mathrm{LMN}$ の面積を求める`,
          answer: String.raw`$\dfrac{15\sqrt{15}}{16}$`,
          approach: String.raw`$\mathrm{OM}\perp\mathrm{LM}$ なので $\triangle\mathrm{OML}$ は直角三角形。$\mathrm{MN}$ は $\mathrm{OL}$ に垂直で、交点は直角三角形の斜辺に下ろした垂線の足になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`接線の性質から $\mathrm{OM}\perp\mathrm{LM}$ である。$\mathrm{OM}=1$、$\mathrm{OL}=4$ なので三平方の定理より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{LM}=\mathrm{LN}=\sqrt{4^{2}-1^{2}}=\sqrt{15}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{M}$ と $\mathrm{N}$ は直線 $\mathrm{OL}$ について対称なので、$\mathrm{MN}\perp\mathrm{OL}$ である。$\mathrm{MN}$ と $\mathrm{OL}$ の交点を $\mathrm{H}$ とすると、$\mathrm{H}$ は直角三角形 $\mathrm{OML}$ の斜辺 $\mathrm{OL}$ に $\mathrm{M}$ から下ろした垂線の足である。面積を2通りに表すと`,
            },
            {
              k: "math",
              t: String.raw`\frac12\cdot\mathrm{OM}\cdot\mathrm{LM}=\frac12\cdot\mathrm{OL}\cdot\mathrm{MH},\qquad\mathrm{MH}=\frac{1\cdot\sqrt{15}}{4}=\frac{\sqrt{15}}{4}`,
            },
            { k: "p", t: String.raw`である。また $\mathrm{OM}^{2}=\mathrm{OH}\cdot\mathrm{OL}$ より` },
            {
              k: "math",
              t: String.raw`\mathrm{OH}=\frac{1}{4},\qquad\mathrm{LH}=4-\frac14=\frac{15}{4}`,
            },
            { k: "p", t: String.raw`である。$\mathrm{MN}=2\,\mathrm{MH}=\dfrac{\sqrt{15}}{2}$ なので` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{LMN}=\frac12\cdot\mathrm{MN}\cdot\mathrm{LH}=\frac12\cdot\frac{\sqrt{15}}{2}\cdot\frac{15}{4}=\frac{15\sqrt{15}}{16}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "実線が円 C（中心 O、半径 1）と三角形 LMN。細い破線は △LMN の内接円（中心 (1, 0)、半径 3/4）と外接円（中心 (2, 0)、半径 2）で、(2) の答えにあたる。OM ⊥ LM、MN ⊥ OL になっている。",
                view: [-1.4, 4.6, -2.2, 2.2],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [2 + 2 * Math.cos(t), 2 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [1 + 0.75 * Math.cos(t), 0.75 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: PT_L, b: PT_M },
                  { k: "seg", a: PT_L, b: PT_N },
                  { k: "seg", a: PT_M, b: PT_N },
                  { k: "seg", a: [0, 0], b: PT_M, dash: true },
                  { k: "seg", a: [0, 0], b: PT_N, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: PT_L, label: "L", place: "below-right" },
                  { k: "dot", at: PT_M, label: "M", place: "above" },
                  { k: "dot", at: PT_N, label: "N", place: "below" },
                  { k: "text", at: [-Math.SQRT1_2, Math.SQRT1_2], label: "C", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{MN}$ は $\mathrm{OL}$ の中点ではなく、$\mathrm{O}$ 寄りの $\mathrm{OH}=\dfrac14$ のところで交わる。`,
          ],
          check: String.raw`座標で $\mathrm{M}\left(\tfrac14,\tfrac{\sqrt{15}}4\right)$ として計算すると面積は $3.630921887$ で、$\dfrac{15\sqrt{15}}{16}=3.630921887$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`三角形 $\mathrm{LMN}$ の内接円の半径 $r$ と、外接円の半径 $R$ をそれぞれ求める`,
          answer: String.raw`$r=\dfrac34$、$R=2$`,
          approach: String.raw`$r$ は「面積 $=$ 内接円の半径 $\times$ 周の半分」、$R$ は正弦定理（または $S=\dfrac{abc}{4R}$）。3辺と面積はすでに (1) で出ている。`,
          blocks: [
            { k: "p", t: String.raw`3辺は $\mathrm{LM}=\mathrm{LN}=\sqrt{15}$、$\mathrm{MN}=\dfrac{\sqrt{15}}{2}$ なので、周の半分は` },
            {
              k: "math",
              t: String.raw`s=\frac12\left(\sqrt{15}+\sqrt{15}+\frac{\sqrt{15}}{2}\right)=\frac{5\sqrt{15}}{4}`,
            },
            { k: "p", t: String.raw`である。$\triangle\mathrm{LMN}=rs$ より` },
            {
              k: "math",
              t: String.raw`r=\frac{15\sqrt{15}/16}{5\sqrt{15}/4}=\frac{15\sqrt{15}}{16}\cdot\frac{4}{5\sqrt{15}}=\frac{15}{20}=\frac34`,
            },
            { k: "p", t: String.raw`である。次に $\triangle\mathrm{LMN}=\dfrac{\mathrm{LM}\cdot\mathrm{LN}\cdot\mathrm{MN}}{4R}$ より` },
            {
              k: "math",
              t: String.raw`R=\frac{\sqrt{15}\cdot\sqrt{15}\cdot\frac{\sqrt{15}}{2}}{4\cdot\frac{15\sqrt{15}}{16}}=\frac{\frac{15\sqrt{15}}{2}}{\frac{15\sqrt{15}}{4}}=2`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`r=\frac34,\qquad R=2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`正弦定理で確かめることもできる。$\angle\mathrm{MLO}=\theta$ とすると $\sin\theta=\dfrac14$、$\cos\theta=\dfrac{\sqrt{15}}{4}$ で $\angle\mathrm{MLN}=2\theta$、$\sin2\theta=2\cdot\dfrac14\cdot\dfrac{\sqrt{15}}{4}=\dfrac{\sqrt{15}}{8}$ である。$\dfrac{\mathrm{MN}}{\sin2\theta}=2R$ より $2R=\dfrac{\sqrt{15}/2}{\sqrt{15}/8}=4$、$R=2$ となる。`,
            },
            {
              k: "note",
              t: String.raw`外接円の中心は $\mathrm{OL}$ の中点（$\mathrm{O}$ から距離 $2$ の点）である。$\mathrm{L}$ までも $2$、$\mathrm{M}$ までも $\sqrt{\left(2-\tfrac14\right)^{2}+\tfrac{15}{16}}=\sqrt{\tfrac{49}{16}+\tfrac{15}{16}}=2$ で確かに等しい。`,
            },
          ],
          pitfalls: [
            String.raw`$s$ は周の長さではなく、その半分。$S=rs$ の形で覚えておく。`,
          ],
          check: String.raw`座標計算でも $r=0.750000000$、$R=2.000000000$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "2次関数",
      topics: ["区間が動く最大最小", "軸と区間の位置関係", "場合分け", "関数の関数の最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-8$ から $8$ まで $0.02$ 刻みで動かし、各 $a$ で区間を2万分割して最大・最小を数値的に求めたところ、立てた $M(a)$・$m(a)$ の式と全部一致した",
          "$m(a)$ を $0.0001$ 刻みで走査すると最小は $a=-2$ での $-6.000000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数とし、2次関数 $f(x)=x^{2}+2ax-3$ を考える。実数 $x$ が $a\leqq x\leqq a+3$ の範囲を動くときの $f(x)$ の最大値を $M(a)$ とするとき、$M(a)$ を $a$ で表す`,
          answer: String.raw`$a\leqq-\dfrac34$ のとき $M(a)=3a^{2}-3$、$a\geqq-\dfrac34$ のとき $M(a)=3a^{2}+12a+6$`,
          approach: String.raw`下に凸なので、最大値は2つの端点のうち軸から遠いほうでとる。軸 $x=-a$ と区間の中点 $x=a+\dfrac32$ の大小で分かれる。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=\left(x+a\right)^{2}-a^{2}-3$ なので、軸は $x=-a$、下に凸である。` },
            {
              k: "p",
              t: String.raw`下に凸な関数は、区間の端点のうち**軸から遠いほう**で最大になる。区間の中点は $x=a+\dfrac32$ なので、軸と中点の大小で分かれる。`,
            },
            {
              k: "math",
              t: String.raw`-a\leqq a+\frac32\iff-\frac32\leqq2a\iff a\geqq-\frac34`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "steps",
              items: [
                String.raw`$a\leqq-\dfrac34$（軸が中点より右）：左端 $x=a$ で最大。$M(a)=f(a)=a^{2}+2a^{2}-3=3a^{2}-3$`,
                String.raw`$a\geqq-\dfrac34$（軸が中点より左）：右端 $x=a+3$ で最大。$M(a)=f(a+3)=\left(a+3\right)^{2}+2a\left(a+3\right)-3=3a^{2}+12a+6$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$a=-\dfrac34$ ではどちらの式も $-\dfrac{21}{16}$ で一致する（両端で同時に最大）。`,
            },
          ],
          pitfalls: [
            String.raw`最大は「軸から遠いほうの端点」。最小のときの考えかた（軸が区間に入るかどうか）とは分かれかたが違う。`,
          ],
          check: String.raw`$a$ を $0.02$ 刻みで動かして区間を2万分割し、数値的に最大を求めるとこの式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ の $a\leqq x\leqq a+3$ での最小値を $m(a)$ とするとき、$m(a)$ を $a$ で表す`,
          answer: String.raw`$a<-\dfrac32$ のとき $3a^{2}+12a+6$、$-\dfrac32\leqq a\leqq0$ のとき $-a^{2}-3$、$a>0$ のとき $3a^{2}-3$`,
          approach: String.raw`最小は、軸が区間の中にあれば頂点、区間の外なら近いほうの端点。軸 $x=-a$ が $a\leqq-a\leqq a+3$ を満たすかどうかで3つに分ける。`,
          blocks: [
            { k: "p", t: String.raw`軸 $x=-a$ が区間 $\left[a,\ a+3\right]$ に入る条件は` },
            {
              k: "math",
              t: String.raw`a\leqq-a\ \text{かつ}\ -a\leqq a+3\iff a\leqq0\ \text{かつ}\ a\geqq-\frac32`,
            },
            { k: "p", t: String.raw`すなわち $-\dfrac32\leqq a\leqq0$ である。これで3つに分かれる。` },
            {
              k: "steps",
              items: [
                String.raw`$a<-\dfrac32$（軸が区間より右）：右端 $x=a+3$ が軸に最も近い。$m(a)=f(a+3)=3a^{2}+12a+6$`,
                String.raw`$-\dfrac32\leqq a\leqq0$（軸が区間の中）：頂点で最小。$m(a)=f(-a)=-a^{2}-3$`,
                String.raw`$a>0$（軸が区間より左）：左端 $x=a$ が軸に最も近い。$m(a)=f(a)=3a^{2}-3$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。境目では $a=-\dfrac32$ のときどちらも $-\dfrac{21}{4}$、$a=0$ のときどちらも $-3$ で、つながっている。`,
            },
          ],
          pitfalls: [
            String.raw`軸が区間の外にあるときは「近いほうの端点」。$a<-\dfrac32$ では軸 $-a$ が区間より右なので、右端 $a+3$ が近い。`,
          ],
          check: String.raw`(1) と同じ走査で最小も確かめ、この式と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$a$ がすべての実数を動くとき、$m(a)$ の最小値を求める`,
          answer: String.raw`$-6$（$a=-2$ のとき）`,
          approach: String.raw`(2) の3つの区間それぞれで $m(a)$ の最小を求め、いちばん小さいものを選ぶ。各区間の端点も忘れずに見る。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "m(a) のグラフ。a < -3/2 では 3a² + 12a + 6（頂点 a = -2）、-3/2 ≦ a ≦ 0 では -a² - 3、a > 0 では 3a² - 3 の3本がつながっている。いちばん低いのは a = -2 のときの -6。",
                view: [-4.3, 1.7, -7.2, 7],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: M3L, from: -4.08, to: -1.5 },
                  { k: "curve", f: M3M, from: -1.5, to: 0 },
                  { k: "curve", f: M3R, from: 0, to: 1.7 },
                  { k: "dot", at: [-2, -6], label: "最小値 -6", place: "below" },
                  { k: "dot", at: [-1.5, -5.25] },
                  { k: "dot", at: [0, -3] },
                  { k: "text", at: [1.5, M3R(1.5)], label: "y = m(a)", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`(2) の3つの場合それぞれで最小を調べる。` },
            {
              k: "p",
              t: String.raw`**$a<-\dfrac32$ のとき。** $3a^{2}+12a+6=3\left(a+2\right)^{2}-6$ である。頂点 $a=-2$ はこの範囲に入っているので、最小値は`,
            },
            { k: "math", t: String.raw`-6\qquad\left(a=-2\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$-\dfrac32\leqq a\leqq0$ のとき。** $-a^{2}-3$ は $a^{2}$ が大きいほど小さい。$\left|a\right|$ が最大なのは $a=-\dfrac32$ なので、最小値は`,
            },
            { k: "math", t: String.raw`-\frac94-3=-\frac{21}{4}\qquad\left(a=-\frac32\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$a>0$ のとき。** $3a^{2}-3$ は増加するので、$a>0$ では $-3$ より大きい（$a=0$ は含まないので下限は取らない）。`,
            },
            { k: "p", t: String.raw`3つを比べると` },
            {
              k: "math",
              t: String.raw`-6<-\frac{21}{4}=-5.25<-3`,
            },
            { k: "p", t: String.raw`なので、$m(a)$ の最小値は` },
            { k: "math", t: String.raw`-6\qquad\left(a=-2\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=-2$ のとき区間は $-2\leqq x\leqq1$、軸は $x=2$ で区間の外にある。最小は右端 $x=1$ でとり、$f(1)=1-4-3=-6$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$3a^{2}+12a+6$ の頂点 $a=-2$ が、その場合分けの範囲 $a<-\dfrac32$ に入っているかを確かめる。入っていなければ端点の値を使うことになる。`,
          ],
          check: String.raw`$m(a)$ を $0.0001$ 刻みで走査すると、最小は $a=-2$ での $-6.000000000$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["線分の通過領域", "傾きをそろえる変換", "折れ線のとき", "放物線と接線"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$y-x$ を高さとみる座標に移して各高さの区間の長さを数値積分すると、(1) は $3.624750$（$\\tfrac{29}8=3.625$）、(3) は $2.000000$ だった",
          "モンテカルロ法でも (1) は $3.59$、(3) は $2.01$ でおおむね合った",
          "(1) は $\\displaystyle\\int_{0}^{2}\\left|f'(x)-1\\right|dx=4$ とは一致しない。重なりが $\\tfrac38$ あるぶん小さくなる",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`関数 $f(x)$ に対して、座標平面上の2つの点 $\mathrm{P}\left(x,f(x)\right)$、$\mathrm{Q}\left(x+1,f(x)+1\right)$ を考える。実数 $x$ が $0\leqq x\leqq2$ の範囲を動くとき線分 $\mathrm{PQ}$ が通過してできる図形の面積を $S$ とおく。$f(x)=-2\left|x-1\right|+2$ に対して $S$ の値を求める`,
          answer: String.raw`$S=\dfrac{29}{8}$`,
          approach: String.raw`$\mathrm{PQ}$ はいつも傾き $1$、長さ $\sqrt2$ の線分である。そこで「$y-x$ の値」を高さと見ると、線分は水平な線分になり、通過領域の様子が一気に見やすくなる（面積は変わらない）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{PQ}}=\left(1,1\right)$ なので、線分 $\mathrm{PQ}$ は傾き $1$ で、$\mathrm{P}$ から右上に進む長さ $\sqrt2$ の線分である。線分上の点は`,
            },
            {
              k: "math",
              t: String.raw`\left(x+t,\ f(x)+t\right)\qquad\left(0\leqq t\leqq1\right)`,
            },
            { k: "p", t: String.raw`と書ける。ここで` },
            {
              k: "math",
              t: String.raw`\left(\text{点の}\ y\ \text{座標}\right)-\left(\text{点の}\ x\ \text{座標}\right)=f(x)-x`,
            },
            {
              k: "p",
              t: String.raw`で、これは $t$ によらない。そこで $g(x)=f(x)-x$ とおき、各点を $\left(X,c\right)=\left(x\ \text{座標},\ y\ \text{座標}-x\ \text{座標}\right)$ で表すことにする。この対応は平面を $x$ 方向にずらさず $y$ 方向にだけずらす変換なので、面積を変えない。`,
            },
            {
              k: "p",
              t: String.raw`この座標では、パラメータ $x$ の線分は「高さ $c=g(x)$ の、$X$ が $x$ から $x+1$ までの水平線分」になる。したがって通過領域の面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\int\left(\text{高さ}\ c\ \text{での}\ \bigcup_{g(x)=c}\left[x,\ x+1\right]\ \text{の長さ}\right)dc`,
            },
            { k: "p", t: String.raw`で計算できる。` },
            { k: "p", t: String.raw`**$g$ を調べる。** $f(x)=-2\left|x-1\right|+2$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$0\leqq x\leqq1$：$f(x)=2x$ で $g(x)=2x-x=x$。$c$ は $0$ から $1$ まで増える`,
                String.raw`$1\leqq x\leqq2$：$f(x)=4-2x$ で $g(x)=4-3x$。$c$ は $1$ から $-2$ まで減る`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。よって $c$ の動く範囲は $-2\leqq c\leqq1$ で、$c\geqq0$ の高さには $x=c$ と $x=\dfrac{4-c}{3}$ の2本、$c<0$ の高さには $x=\dfrac{4-c}{3}$ の1本だけが対応する。`,
            },
            { k: "p", t: String.raw`**高さごとの長さ。** $c\geqq0$ のとき2つの区間は` },
            {
              k: "math",
              t: String.raw`\left[c,\ c+1\right]\quad\text{と}\quad\left[\frac{4-c}{3},\ \frac{7-c}{3}\right]`,
            },
            { k: "p", t: String.raw`である。重なるのは $c+1\geqq\dfrac{4-c}{3}$、すなわち $4c\geqq1$、$c\geqq\dfrac14$ のときである。` },
            {
              k: "steps",
              items: [
                String.raw`$-2\leqq c<0$：区間は1つで長さ $1$`,
                String.raw`$0\leqq c<\dfrac14$：離れた2つで長さの和は $2$`,
                String.raw`$\dfrac14\leqq c\leqq1$：つながって $\left[c,\ \dfrac{7-c}{3}\right]$、長さ $\dfrac{7-c}{3}-c=\dfrac{7-4c}{3}$`,
              ],
            },
            { k: "p", t: String.raw`である。足し合わせると` },
            {
              k: "math",
              t: String.raw`S=\int_{-2}^{0}1\,dc+\int_{0}^{\frac14}2\,dc+\int_{\frac14}^{1}\frac{7-4c}{3}\,dc`,
            },
            { k: "p", t: String.raw`である。第3項は` },
            {
              k: "math",
              t: String.raw`\frac13\Bigl[7c-2c^{2}\Bigr]_{\frac14}^{1}=\frac13\left\{\left(7-2\right)-\left(\frac74-\frac18\right)\right\}=\frac13\left(5-\frac{13}{8}\right)=\frac13\cdot\frac{27}{8}=\frac98`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`S=2+\frac12+\frac98=\frac{16+4+9}{8}=\frac{29}{8}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが通過領域。太い実線が y = f(x)（0 ≦ x ≦ 2 の折れ線）、破線はそれを (1, 1) だけずらしたもの。細い線は x = 0, 0.5, 1, 1.5, 2 での線分 PQ。右下に食い込んだくぼみがあるぶん、面積は 4 ではなく 29/8 になる。",
                view: [-0.8, 3.9, -0.4, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: SWEEP1 },
                  { k: "seg", a: [0, 0], b: [0.5, 1], faint: true },
                  { k: "seg", a: [0.5, 1], b: [1.5, 2], faint: true },
                  { k: "seg", a: [1, 2], b: [2, 3], faint: true },
                  { k: "seg", a: [1.5, 1], b: [2.5, 2], faint: true },
                  { k: "seg", a: [2, 0], b: [3, 1], faint: true },
                  { k: "seg", a: [0, 0], b: [1, 2] },
                  { k: "seg", a: [1, 2], b: [2, 0] },
                  { k: "seg", a: [1, 1], b: [2, 3], dash: true },
                  { k: "seg", a: [2, 3], b: [3, 1], dash: true },
                  { k: "dot", at: [0, 0], label: "P (x = 0)", place: "below-left" },
                  { k: "dot", at: [1, 2] },
                  { k: "dot", at: [2, 0], label: "P (x = 2)", place: "below" },
                  { k: "dot", at: [3, 1], label: "Q (x = 2)", place: "right" },
                  { k: "dot", at: [5 / 4, 3 / 2] },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`重なりを無視して「線分が掃く量」を足すと $\displaystyle\int_{0}^{2}\left|f'(x)-1\right|dx=\int_{0}^{1}1\,dx+\int_{1}^{2}3\,dx=4$ になる。重なっている部分が $\dfrac38$ あるので、実際の面積は $4-\dfrac38=\dfrac{29}{8}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`線分どうしが重なる。重なりを数えないように、高さ $c$ ごとに「区間の和集合」の長さを測る。`,
            String.raw`$c<0$ の高さには折れ線の右半分からしか線分が来ない。$c\geqq0$ と分けて考える。`,
          ],
          check: String.raw`数値計算では $3.624750$ で、$\dfrac{29}{8}=3.625$ と合った。モンテカルロ法でも $3.59$ 程度だった。`,
        },
        {
          label: "(2)",
          task: String.raw`関数 $f(x)=\dfrac12\left(x-1\right)^{2}$ に対して、曲線 $y=f(x)$ の接線で傾きが $1$ のものの方程式を求める`,
          answer: String.raw`$y=x-\dfrac32$`,
          approach: String.raw`$f'(x)=1$ となる $x$ を求めて接線を書くだけ。ただしこの $x$ が $2$（区間の右端）になることが (3) の鍵になる。`,
          blocks: [
            { k: "p", t: String.raw`$f'(x)=x-1$ なので、$f'(x)=1$ より $x=2$ である。このとき` },
            {
              k: "math",
              t: String.raw`f(2)=\frac12\left(2-1\right)^{2}=\frac12`,
            },
            { k: "p", t: String.raw`なので、接線は` },
            {
              k: "math",
              t: String.raw`y=1\cdot\left(x-2\right)+\frac12=x-\frac32`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`接点の $x$ 座標がちょうど $2$、つまり (3) で $x$ が動く範囲の右端にあたる。これが (3) で効いてくる。`,
            },
          ],
          check: String.raw`$f'(2)=1$、$f(2)=0.5$ で、接線 $y=x-\tfrac32$ は $x=2$ で $0.5$ を通る。`,
        },
        {
          label: "(3)",
          task: String.raw`設問 (2) の関数 $f(x)=\dfrac12\left(x-1\right)^{2}$ に対して、$S$ の値を求める`,
          answer: String.raw`$S=2$`,
          approach: String.raw`(1) と同じ $g(x)=f(x)-x$ を使う。今度は $g$ が単調なので、どの高さにも線分は1本しか来ず、重なりが起こらない。`,
          blocks: [
            { k: "p", t: String.raw`$g(x)=f(x)-x=\dfrac12\left(x-1\right)^{2}-x$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(x)=\left(x-1\right)-1=x-2`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq x\leqq2$ では $g'(x)\leqq0$ なので $g$ は減少する（$x=2$ でだけ $g'=0$）。したがって $g$ は $\left[0,2\right]$ から値域への1対1の対応になり、**どの高さ $c$ にも線分はちょうど1本**しか来ない。重なりは起こらない。`,
            },
            {
              k: "p",
              t: String.raw`$g'(x)=0$ になるのが $x=2$ であることは、(2) で求めた「傾き $1$ の接線の接点が $x=2$」ということと同じである。接点が区間の右端にあるおかげで、$0\leqq x<2$ では $g$ が狭義に減少する。`,
            },
            { k: "p", t: String.raw`値域は` },
            {
              k: "math",
              t: String.raw`g(0)=\frac12,\qquad g(2)=\frac12-2=-\frac32`,
            },
            { k: "p", t: String.raw`より $-\dfrac32\leqq c\leqq\dfrac12$ である。各高さでの区間はただ1つで長さ $1$ だから` },
            {
              k: "math",
              t: String.raw`S=\int_{-\frac32}^{\frac12}1\,dc=\frac12-\left(-\frac32\right)=2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが通過領域。左下の太い曲線が y = f(x)（0 ≦ x ≦ 2）、右上はそれを (1, 1) だけずらしたもの。左右のふちは x = 0 と x = 2 での線分 PQ で、右のふちは (2) で求めた接線 y = x - 3/2 の一部にあたる。重なりがないので、面積は幅 1 × 高さの変化 2 になる。",
                view: [-1.2, 3.4, -0.3, 2.0],
                step: { x: 1, y: 0.5 },
                items: [
                  { k: "fill", pts: SWEEP3 },
                  { k: "curve", f: F43, from: 0, to: 2 },
                  { k: "curve", f: (x: number) => F43(x - 1) + 1, from: 1, to: 3 },
                  { k: "seg", a: [0, 0.5], b: [1, 1.5] },
                  { k: "seg", a: [2, 0.5], b: [3, 1.5] },
                  { k: "dot", at: [0, 0.5], label: "P (x = 0)", place: "left" },
                  { k: "dot", at: [2, 0.5], label: "P (x = 2)", place: "right" },
                  { k: "dot", at: [3, 1.5], label: "Q (x = 2)", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`重なりがないので、(1) の注で書いた「掃いた量」の計算と一致する。実際 $\displaystyle\int_{0}^{2}\left|f'(x)-1\right|dx=\int_{0}^{2}\left|x-2\right|dx=2$ である。`,
            },
          ],
          pitfalls: [
            String.raw`(1) と違って重なりがないことを、$g$ の単調性で確かめてから面積を出す。確かめずに $\displaystyle\int\left|f'-1\right|$ と書くと、(1) のような場合に間違える。`,
          ],
          check: String.raw`数値計算でも $2.000000$、モンテカルロ法でも $2.01$ 程度だった。`,
        },
      ],
    },
  ],
};
