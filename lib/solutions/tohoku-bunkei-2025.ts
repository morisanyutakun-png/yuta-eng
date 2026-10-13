import { tohokuRikei2025 } from "@/lib/solutions/tohoku-rikei-2025";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2025年度（令和7年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第1問・第2問は、理系の第1問・第2問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理系の側から借りる。第3問・第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2025.questions.find((q) => q.no === no)!;

/** 理系 第1問（確率）。文系の第1問とまったく同じ問題。 */
const sharedKakuritsu: Question = { ...rikei(1), no: 1 };

/** 理系 第2問（数列）。文系の第2問とまったく同じ問題。 */
const sharedSuretsu: Question = { ...rikei(2), no: 2 };

/** 第3問の図。平面 ABC を、AB と AC を基準にとって真上から見たところ。 */
const PT_A: [number, number] = [0, 0];
const PT_B: [number, number] = [1, 0];
const PT_C: [number, number] = [0, 1];
const PT_D: [number, number] = [3, 2];
const PT_P: [number, number] = [0.6, 0.4];

/** 第4問の図。$k=3\sqrt2-4$ のとき。 */
const K25 = 3 * Math.SQRT2 - 4;
const F4 = (x: number): number => x * (x - 2) ** 2;
const G4 = (x: number): number => K25 * x * x;

export const tohokuBunkei2025: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    sharedKakuritsu,
    sharedSuretsu,
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["体積の比", "ベクトルの分解", "交点の決定", "正四面体の内積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "平面 $\\mathrm{ABC}$ の中で $\\mathrm{A}(0,0)$、$\\mathrm{B}(1,0)$、$\\mathrm{C}(0,1)$、$\\mathrm{D}(3,2)$ として面積を出すと、四角形 $\\mathrm{ABDC}$ は $\\tfrac52$、三角形 $\\mathrm{ABC}$ は $\\tfrac12$ で比は $5$ だった",
          "1辺 $1$ の正四面体の座標で四面体 $\\mathrm{OABC}$ と四角錐 $\\mathrm{OABDC}$ の体積を計算しても比は $5.000000000$ だった",
          "乱数で200通りの $\\vec a,\\vec b,\\vec c$ をとり、$\\overrightarrow{\\mathrm{OD}}=-4\\vec a+3\\vec b+2\\vec c$ と、$t=\\tfrac15$・$s=\\tfrac25$ での交点が $\\tfrac35\\vec b+\\tfrac25\\vec c$ に等しいことを確かめた",
          "1辺 $1$ の正四面体の座標で $\\left|\\overrightarrow{\\mathrm{OD}}\\right|=3.872983346$ となり、$\\sqrt{15}=3.872983346$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四面体 $\mathrm{OABC}$ において $\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ とし、点 $\mathrm{D}$ は $\overrightarrow{\mathrm{AD}}=3\overrightarrow{\mathrm{AB}}+2\overrightarrow{\mathrm{AC}}$ を満たすとする。四面体 $\mathrm{OABC}$ の体積を $V$ とするとき、四角錐 $\mathrm{OABDC}$ の体積を $V$ を用いて表す`,
          answer: String.raw`$5V$`,
          approach: String.raw`$\mathrm{D}$ は平面 $\mathrm{ABC}$ 上にある。頂点 $\mathrm{O}$ は共通で高さも同じなので、体積の比は底面積の比に等しい。底面の比は平面 $\mathrm{ABC}$ の中だけで計算できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{AD}}=3\overrightarrow{\mathrm{AB}}+2\overrightarrow{\mathrm{AC}}$ なので、$\mathrm{D}$ は平面 $\mathrm{ABC}$ 上にある。そこで平面 $\mathrm{ABC}$ の中で、$\mathrm{A}$ を原点、$\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ を座標軸の向きにとって考える。この座標では`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{A}\left(0,0\right),\quad\mathrm{B}\left(1,0\right),\quad\mathrm{C}\left(0,1\right),\quad\mathrm{D}\left(3,2\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "平面 ABC を、AB と AC を基準にとって描いたところ（実際の角度や長さとは違うが、面積の比はこの図のとおりになる）。四角形 ABDC は三角形 ABC の 5 倍の広さをもつ。点 P は (3) で使う線分 AD と線分 BC の交点。",
                view: [-0.4, 3.4, -0.4, 2.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [PT_A, PT_B, PT_D, PT_C] },
                  { k: "seg", a: PT_A, b: PT_B },
                  { k: "seg", a: PT_B, b: PT_D },
                  { k: "seg", a: PT_D, b: PT_C },
                  { k: "seg", a: PT_C, b: PT_A },
                  { k: "seg", a: PT_A, b: PT_D, dash: true },
                  { k: "seg", a: PT_B, b: PT_C, dash: true },
                  { k: "dot", at: PT_A, label: "A", place: "below-left" },
                  { k: "dot", at: PT_B, label: "B", place: "below" },
                  { k: "dot", at: PT_C, label: "C", place: "left" },
                  { k: "dot", at: PT_D, label: "D", place: "above-right" },
                  { k: "dot", at: PT_P, label: "P", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`四角形 $\mathrm{ABDC}$ の面積を求める。対角線 $\mathrm{AD}$ で2つの三角形に分けると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\triangle\mathrm{ABD}$：$\overrightarrow{\mathrm{AB}}=\left(1,0\right)$、$\overrightarrow{\mathrm{AD}}=\left(3,2\right)$ で面積は $\dfrac12\left|1\cdot2-0\cdot3\right|=1$`,
                String.raw`$\triangle\mathrm{ADC}$：$\overrightarrow{\mathrm{AD}}=\left(3,2\right)$、$\overrightarrow{\mathrm{AC}}=\left(0,1\right)$ で面積は $\dfrac12\left|3\cdot1-2\cdot0\right|=\dfrac32$`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので、四角形 $\mathrm{ABDC}$ の面積は $1+\dfrac32=\dfrac52$ である。一方、$\triangle\mathrm{ABC}$ の面積は $\dfrac12\left|1\cdot1-0\cdot0\right|=\dfrac12$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(\text{四角形}\ \mathrm{ABDC}\right)}{\left(\triangle\mathrm{ABC}\right)}=\frac{5/2}{1/2}=5`,
            },
            {
              k: "p",
              t: String.raw`である。四面体 $\mathrm{OABC}$ と四角錐 $\mathrm{OABDC}$ は、どちらも頂点が $\mathrm{O}$ で底面が同じ平面 $\mathrm{ABC}$ 上にあるから、高さは共通である。したがって体積の比も $5$ で`,
            },
            { k: "math", t: String.raw`\left(\text{四角錐}\ \mathrm{OABDC}\right)=5V` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この「$\overrightarrow{\mathrm{AB}}$、$\overrightarrow{\mathrm{AC}}$ を軸にとる」やり方では長さや角度は変わってしまうが、面積の比だけは変わらない。比を聞かれている問題では、こうして計算しやすい座標に取りかえてよい。`,
            },
          ],
          pitfalls: [
            String.raw`四角形 $\mathrm{ABDC}$ の頂点の順に注意する。$\mathrm{A}\to\mathrm{B}\to\mathrm{D}\to\mathrm{C}$ の順で、$\mathrm{A}\to\mathrm{B}\to\mathrm{C}\to\mathrm{D}$ ではない。`,
            String.raw`$\mathrm{D}$ が平面 $\mathrm{ABC}$ 上にあることを押さえてから、高さが共通だと言う。`,
          ],
          check: String.raw`1辺 $1$ の正四面体の座標で両方の体積を計算すると、比はちょうど $5.000000000$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\overrightarrow{\mathrm{OD}}$ を $\vec a,\vec b,\vec c$ を用いて表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OD}}=-4\vec a+3\vec b+2\vec c$`,
          approach: String.raw`$\overrightarrow{\mathrm{AB}}=\vec b-\vec a$ のように始点を $\mathrm{O}$ にそろえて代入するだけ。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{AD}}=\overrightarrow{\mathrm{OD}}-\vec a$、$\overrightarrow{\mathrm{AB}}=\vec b-\vec a$、$\overrightarrow{\mathrm{AC}}=\vec c-\vec a$ なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}-\vec a=3\left(\vec b-\vec a\right)+2\left(\vec c-\vec a\right)=-5\vec a+3\vec b+2\vec c`,
            },
            { k: "p", t: String.raw`である。両辺に $\vec a$ を足して` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=-4\vec a+3\vec b+2\vec c`,
            },
            {
              k: "p",
              t: String.raw`である。係数の和が $-4+3+2=1$ になっているのは、$\mathrm{D}$ が平面 $\mathrm{ABC}$ 上にあることの表れである。`,
            },
          ],
          check: String.raw`乱数で200通りの $\vec a,\vec b,\vec c$ をとって両辺を比べると、すべて一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`線分 $\mathrm{AD}$ と線分 $\mathrm{BC}$ の交点を $\mathrm{P}$ とするとき、$\overrightarrow{\mathrm{OP}}$ を $\vec b,\vec c$ を用いて表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OP}}=\dfrac35\vec b+\dfrac25\vec c$`,
          approach: String.raw`$\mathrm{P}$ を2通りに表して係数を比べる。$\vec a,\vec b,\vec c$ は1次独立（四面体の3辺なので）だから、係数は一意に決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は線分 $\mathrm{AD}$ 上にあるので、$0\leqq t\leqq1$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\vec a+t\overrightarrow{\mathrm{AD}}=\vec a+t\left(-5\vec a+3\vec b+2\vec c\right)=\left(1-5t\right)\vec a+3t\vec b+2t\vec c`,
            },
            {
              k: "p",
              t: String.raw`と書ける。また $\mathrm{P}$ は線分 $\mathrm{BC}$ 上にあるので、$0\leqq s\leqq1$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\left(1-s\right)\vec b+s\vec c`,
            },
            {
              k: "p",
              t: String.raw`とも書ける。$\vec a,\vec b,\vec c$ は1次独立なので、両方の表しかたで係数が一致する。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\vec a$ の係数：$1-5t=0$ より $t=\dfrac15$`,
                String.raw`$\vec b$ の係数：$3t=1-s$`,
                String.raw`$\vec c$ の係数：$2t=s$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$t=\dfrac15$ より $s=\dfrac25$ で、$3t=\dfrac35=1-\dfrac25$ も満たしている。$0\leqq t\leqq1$、$0\leqq s\leqq1$ なのでどちらも線分の内部にある。よって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac35\vec b+\frac25\vec c`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ は線分 $\mathrm{BC}$ を $2:3$ に内分する点である。$\overrightarrow{\mathrm{AD}}$ の係数 $3,2$ が、そのまま逆の順で内分比に現れている。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec a$ の係数が $0$ になることが「$\mathrm{P}$ が平面 $\mathrm{OBC}$ 上にある」、つまり直線 $\mathrm{BC}$ 上にあることの条件になっている。ここから $t$ が決まる。`,
          ],
          check: String.raw`乱数で200通りの $\vec a,\vec b,\vec c$ をとると、$t=\tfrac15$、$s=\tfrac25$ の点が一致し、それが $\tfrac35\vec b+\tfrac25\vec c$ とも一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`四面体 $\mathrm{OABC}$ が1辺の長さ $1$ の正四面体のとき、線分 $\mathrm{OD}$ の長さを求める`,
          answer: String.raw`$\mathrm{OD}=\sqrt{15}$`,
          approach: String.raw`(2) の式を2乗する。正四面体なので $\left|\vec a\right|=\left|\vec b\right|=\left|\vec c\right|=1$、どの2つの内積も $\dfrac12$ である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正四面体なので $\left|\vec a\right|=\left|\vec b\right|=\left|\vec c\right|=1$ で、どの2つのなす角も $60^{\circ}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec b=\vec b\cdot\vec c=\vec c\cdot\vec a=1\cdot1\cdot\cos60^{\circ}=\frac12`,
            },
            { k: "p", t: String.raw`である。(2) より $\overrightarrow{\mathrm{OD}}=-4\vec a+3\vec b+2\vec c$ なので` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OD}}\right|^{2}=16\left|\vec a\right|^{2}+9\left|\vec b\right|^{2}+4\left|\vec c\right|^{2}+2\left\{\left(-4\right)\cdot3\,\vec a\cdot\vec b+3\cdot2\,\vec b\cdot\vec c+2\cdot\left(-4\right)\,\vec c\cdot\vec a\right\}`,
            },
            { k: "p", t: String.raw`である。代入すると` },
            {
              k: "math",
              t: String.raw`=16+9+4+2\left\{-12\cdot\frac12+6\cdot\frac12-8\cdot\frac12\right\}=29+2\left(-6+3-4\right)=29-14=15`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{OD}=\sqrt{15}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`展開するとき、交差項は $2\times\left(\text{係数の積}\right)\times\left(\text{内積}\right)$。符号つきの係数をそのまま掛ける。`,
          ],
          check: String.raw`1辺 $1$ の正四面体の座標で計算すると $3.872983346$ で、$\sqrt{15}=3.872983346$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["3次曲線と放物線の交点", "面積が等しい条件", "定積分が0になる言いかえ", "解と係数の関係"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$k=3\\sqrt2-4=0.242640687$ のとき交点は $x=0,\\ \\sqrt2,\\ 2\\sqrt2$ で、2つの部分の面積はどちらも $1.000000000$（差は $10^{-15}$ 台）だった",
          "$k$ を細かく走査して $\\displaystyle\\int_{0}^{\\beta}\\left\\{x(x-2)^{2}-kx^{2}\\right\\}dx$ が $0$ になる点を探すと $k=0.242640$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$k$ を正の実数とする。曲線 $y=x\left(x-2\right)^{2}$ と放物線 $y=kx^{2}$ で囲まれた2つの部分の面積が等しくなるような $k$ の値を求める`,
          answer: String.raw`$k=3\sqrt2-4$`,
          approach: String.raw`面積を2つとも計算して引き算するのは大変である。差 $h(x)$ の定積分で考えると、「2つの面積が等しい」は「$0$ から大きいほうの交点まで積分して $0$」と言いかえられる。`,
          blocks: [
            { k: "p", t: String.raw`**交点。** $x\left(x-2\right)^{2}=kx^{2}$ を整理すると` },
            {
              k: "math",
              t: String.raw`x\left\{\left(x-2\right)^{2}-kx\right\}=0,\qquad x\left\{x^{2}-\left(4+k\right)x+4\right\}=0`,
            },
            {
              k: "p",
              t: String.raw`である。$x^{2}-\left(4+k\right)x+4=0$ の判別式は $\left(4+k\right)^{2}-16=k^{2}+8k>0$（$k>0$）なので、異なる2つの実数解 $\alpha,\beta$（$\alpha<\beta$）をもつ。解と係数の関係から`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta=4+k>0,\qquad\alpha\beta=4>0`,
            },
            {
              k: "p",
              t: String.raw`なので $0<\alpha<\beta$ である。交点の $x$ 座標は $0,\alpha,\beta$ の3つである。`,
            },
            { k: "p", t: String.raw`**差の関数。** $h(x)=x\left(x-2\right)^{2}-kx^{2}$ とおくと` },
            {
              k: "math",
              t: String.raw`h(x)=x\left(x-\alpha\right)\left(x-\beta\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0<x<\alpha$ では $x>0$、$x-\alpha<0$、$x-\beta<0$ なので $h(x)>0$、$\alpha<x<\beta$ では $h(x)<0$ である。したがって2つの部分の面積は`,
            },
            {
              k: "math",
              t: String.raw`S_{1}=\int_{0}^{\alpha}h(x)\,dx,\qquad S_{2}=-\int_{\alpha}^{\beta}h(x)\,dx`,
            },
            { k: "p", t: String.raw`である。$S_{1}=S_{2}$ は` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\alpha}h(x)\,dx+\int_{\alpha}^{\beta}h(x)\,dx=0,\qquad\int_{0}^{\beta}h(x)\,dx=0`,
            },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "k = 3√2 - 4 のとき。交点は x = 0, √2, 2√2 の3つで、網かけの2つの部分の面積は等しくなる（どちらも 1）。左の部分は3次曲線が上、右の部分は放物線が上。",
                view: [-0.3, 3.0, -0.35, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: F4, bottom: G4, from: 0, to: Math.SQRT2 },
                  { k: "fillBetween", top: G4, bottom: F4, from: Math.SQRT2, to: 2 * Math.SQRT2 },
                  { k: "curve", f: F4, from: -0.07, to: 2.89 },
                  { k: "curve", f: G4, from: -0.3, to: 3.0 },
                  { k: "seg", a: [Math.SQRT2, 0], b: [Math.SQRT2, G4(Math.SQRT2)], dash: true, faint: true },
                  { k: "seg", a: [2 * Math.SQRT2, 0], b: [2 * Math.SQRT2, G4(2 * Math.SQRT2)], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [Math.SQRT2, G4(Math.SQRT2)] },
                  { k: "dot", at: [2 * Math.SQRT2, G4(2 * Math.SQRT2)] },
                  { k: "text", at: [Math.SQRT2, 0], label: "√2", place: "below" },
                  { k: "text", at: [2 * Math.SQRT2, 0], label: "2√2", place: "below" },
                  { k: "text", at: [2 / 3, F4(2 / 3)], label: "y = x(x-2)²", place: "above" },
                  { k: "text", at: [2.2, G4(2.2)], label: "y = kx²", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`**計算。** $h(x)=x^{3}-\left(4+k\right)x^{2}+4x$ なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\beta}h(x)\,dx=\frac{\beta^{4}}{4}-\frac{\left(4+k\right)\beta^{3}}{3}+2\beta^{2}`,
            },
            { k: "p", t: String.raw`である。$\beta>0$ なので $\beta^{2}$ で割って $12$ 倍すると、条件は` },
            {
              k: "math",
              t: String.raw`3\beta^{2}-4\left(4+k\right)\beta+24=0`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $\beta$ は $x^{2}-\left(4+k\right)x+4=0$ の解だから $\left(4+k\right)\beta=\beta^{2}+4$ である。これを代入すると`,
            },
            {
              k: "math",
              t: String.raw`3\beta^{2}-4\left(\beta^{2}+4\right)+24=0,\qquad-\beta^{2}+8=0,\qquad\beta=2\sqrt2`,
            },
            { k: "p", t: String.raw`である（$\beta>0$）。$\left(4+k\right)\beta=\beta^{2}+4=12$ より` },
            {
              k: "math",
              t: String.raw`4+k=\frac{12}{2\sqrt2}=\frac{6}{\sqrt2}=3\sqrt2,\qquad k=3\sqrt2-4`,
            },
            {
              k: "p",
              t: String.raw`である。$3\sqrt2=4.242\cdots>4$ なので $k>0$ を満たしている。よって`,
            },
            { k: "math", t: String.raw`k=3\sqrt2-4` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`このとき $\alpha=\dfrac{4}{\beta}=\dfrac{4}{2\sqrt2}=\sqrt2$ で、交点は $x=0,\sqrt2,2\sqrt2$ と等比数列になる。2つの部分の面積はどちらも $1$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\int_{0}^{\beta}h=0$ に言いかえるのが要点。$S_{1},S_{2}$ を別々に $\alpha,\beta$ で書き下すと式が膨れ上がる。`,
            String.raw`$\beta$ は2次方程式の解なので $\beta^{2}=\left(4+k\right)\beta-4$ と次数を下げられる。これを使うと一気に $\beta$ が決まる。`,
            String.raw`最後に $k>0$ を満たしているか確かめる。`,
          ],
          check: String.raw`$k=3\sqrt2-4=0.242640687$ で数値積分すると、2つの部分の面積はどちらも $1.000000000$ だった。`,
        },
      ],
    },
  ],
};
