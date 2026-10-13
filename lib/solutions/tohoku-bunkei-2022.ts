import { tohokuRikei2022 } from "@/lib/solutions/tohoku-rikei-2022";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2022年度（令和4年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第1問は理系の第1問とまったく同じ問題**だった（小問の並びも同じ）。
 * 同じ問題に別々の解説を書くと食い違いが生まれるので、解説は理系の側から借りる。
 * 第2問から第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2022.questions.find((q) => q.no === no)!;

/** 理系 第1問（整数・場合の数）。文系の第1問とまったく同じ問題。 */
const sharedOdd: Question = { ...rikei(1), no: 1 };

/** 第2問の図。$F(t)$ のグラフ。 */
const FA22 = (t: number): number => (4 * t ** 3) / 3 - t * t + 1 / 3;
const FB22 = (t: number): number => t * t - 1 / 3;

/** 第3問の図。領域 $D$ と直線 $3a+2b=\sqrt{13}$。 */
const R13 = Math.sqrt(13);
const TANG = (a: number): number => (R13 - 3 * a) / 2;
const TH22 = Math.atan2(0.6, 0.8);
const AREA_D: [number, number][] = [
  [0, 0],
  [1, 0],
  ...Array.from({ length: 25 }, (_, i): [number, number] => {
    const th = (TH22 * i) / 24;
    return [Math.cos(th), Math.sin(th)];
  }),
  [0, 1],
];

export const tohokuBunkei2022: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    sharedOdd,
    {
      no: 2,
      field: "積分法",
      topics: ["絶対値のついた定積分", "場合分け", "3次関数の増減", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$t=0,0.2,0.5,0.8,1$ で数値積分と $\\tfrac43t^{3}-t^{2}+\\tfrac13$ が小数9桁まで一致した",
          "$t=1,1.5,2$ では数値積分が $t^{2}-\\tfrac13$ と一致した",
          "$t$ を $0$ から $3$ まで $10^{-5}$ 刻みで動かすと、最小は $t=0.5$ での $0.250000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数 $t$ の関数 $F(t)=\displaystyle\int_{0}^{1}\left|x^{2}-t^{2}\right|dx$ について、$0\leqq t\leqq1$ のとき $F(t)$ を $t$ の整式として表す`,
          answer: String.raw`$F(t)=\dfrac43t^{3}-t^{2}+\dfrac13$`,
          approach: String.raw`$0\leqq t\leqq1$ では、積分区間 $\left[0,1\right]$ の中に $x=t$ が入る。そこで絶対値が外れる符号が変わるので、$x=t$ で分けて積分する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x^{2}-t^{2}=\left(x-t\right)\left(x+t\right)$ で、$0\leqq x\leqq1$、$0\leqq t\leqq1$ のとき $x+t\geqq0$ だから、符号は $x-t$ で決まる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\leqq x\leqq t$：$\left|x^{2}-t^{2}\right|=t^{2}-x^{2}$`,
                String.raw`$t\leqq x\leqq1$：$\left|x^{2}-t^{2}\right|=x^{2}-t^{2}$`,
              ],
            },
            { k: "p", t: String.raw`である。それぞれ積分すると` },
            {
              k: "math",
              t: String.raw`\int_{0}^{t}\left(t^{2}-x^{2}\right)dx=\left[t^{2}x-\frac{x^{3}}{3}\right]_{0}^{t}=t^{3}-\frac{t^{3}}{3}=\frac{2t^{3}}{3}`,
            },
            { k: "p", t: String.raw`と` },
            {
              k: "math",
              t: String.raw`\int_{t}^{1}\left(x^{2}-t^{2}\right)dx=\left[\frac{x^{3}}{3}-t^{2}x\right]_{t}^{1}=\left(\frac13-t^{2}\right)-\left(\frac{t^{3}}{3}-t^{3}\right)=\frac13-t^{2}+\frac{2t^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。足し合わせて` },
            {
              k: "math",
              t: String.raw`F(t)=\frac{2t^{3}}{3}+\frac13-t^{2}+\frac{2t^{3}}{3}=\frac43t^{3}-t^{2}+\frac13`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x+t\geqq0$ を確認してから、符号を $x-t$ だけで判断する。`,
          ],
          check: String.raw`$t=0.2$ では数値積分が $0.304000000$ で、式の値も $0.304000000$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$t\geqq0$ のとき、$F(t)$ を最小にする $t$ の値 $T$ と $F(T)$ の値を求める`,
          answer: String.raw`$T=\dfrac12$、$F(T)=\dfrac14$`,
          approach: String.raw`$t>1$ では $x=t$ が積分区間の外に出るので、絶対値がそのまま外れて別の式になる。$0\leqq t\leqq1$ と $t\geqq1$ に分けて増減を調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$t\geqq1$ のとき。** $0\leqq x\leqq1\leqq t$ なので $\left|x^{2}-t^{2}\right|=t^{2}-x^{2}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`F(t)=\int_{0}^{1}\left(t^{2}-x^{2}\right)dx=t^{2}-\frac13`,
            },
            {
              k: "p",
              t: String.raw`である。これは $t\geqq1$ で増加するので、この範囲での最小は $t=1$ での $\dfrac23$ である。`,
            },
            { k: "p", t: String.raw`**$0\leqq t\leqq1$ のとき。** (1) より $F(t)=\dfrac43t^{3}-t^{2}+\dfrac13$ で` },
            {
              k: "math",
              t: String.raw`F'(t)=4t^{2}-2t=2t\left(2t-1\right)`,
            },
            { k: "p", t: String.raw`である。増減は` },
            {
              k: "steps",
              items: [
                String.raw`$0<t<\dfrac12$：$F'(t)<0$ で減少`,
                String.raw`$\dfrac12<t<1$：$F'(t)>0$ で増加`,
              ],
            },
            { k: "p", t: String.raw`なので、$t=\dfrac12$ で最小になる。値は` },
            {
              k: "math",
              t: String.raw`F\left(\frac12\right)=\frac43\cdot\frac18-\frac14+\frac13=\frac16-\frac14+\frac13=\frac{2-3+4}{12}=\frac14`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac14<\dfrac23$ なので、$t\geqq0$ 全体での最小もここである。よって`,
            },
            {
              k: "math",
              t: String.raw`T=\frac12,\qquad F(T)=\frac14`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "F(t) のグラフ（t ≧ 0）。0 ≦ t ≦ 1 では 3次式、t ≧ 1 では t² - 1/3 になる。t = 1/2 でいちばん低くなり、そのときの値は 1/4。",
                view: [-0.2, 1.6, -0.1, 1.4],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: FA22, from: 0, to: 1 },
                  { k: "curve", f: FB22, from: 1, to: Math.sqrt(1.4 + 1 / 3) },
                  { k: "dot", at: [0, 1 / 3] },
                  { k: "dot", at: [1, 2 / 3] },
                  { k: "dot", at: [0.5, 0.25], label: "T = 1/2 で最小 1/4", place: "below" },
                  { k: "text", at: [1.2, FB22(1.2)], label: "y = F(t)", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$F(t)$ は「$y=x^{2}$ と $y=t^{2}$ のあいだの面積（$0\leqq x\leqq1$）」である。$t$ を大きくしていくと、はじめは水平線が曲線に近づくので面積は減るが、$t$ が大きすぎると今度は離れていく。その折り返しが $t=\dfrac12$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$t>1$ の場合を忘れない。(1) の式は $0\leqq t\leqq1$ でしか使えない。`,
            String.raw`$t=0$ は $F'(0)=0$ だが極小ではない（$t\geqq0$ の端点）。$t=\dfrac12$ と比べて小さいほうを選ぶ。`,
          ],
          check: String.raw`$t$ を $0$ から $3$ まで $10^{-5}$ 刻みで動かすと、最小は $t=0.5$ での $0.250000000$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["点と直線の距離", "領域の図示", "線形計画法", "円に接する直線"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b$ を $0.005$ 刻みで走査し、「原点との距離 $\\geqq2$ かつ $x=1$ との交点の $y$ 座標 $\\geqq2$」が「$a^{2}+b^{2}\\leqq1$ かつ $a+2b\\leqq2$」と完全に一致することを確かめた",
          "格子探索での $3a+2b$ の最大は $3.605500$（$a=0.8295$、$b=0.5585$）で、$\\sqrt{13}=3.605551$、$\\left(\\tfrac{3}{\\sqrt{13}},\\tfrac{2}{\\sqrt{13}}\\right)=(0.832050,0.554700)$ と合った",
          "$\\left(\\tfrac{3}{\\sqrt{13}},\\tfrac{2}{\\sqrt{13}}\\right)$ では $a+2b=1.941451\\leqq2$ で、確かに $D$ の中にある",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b$ を正の実数とし、$xy$ 平面上の直線 $\ell\colon ax+by-2=0$ を考える。直線 $\ell$ と原点の距離が $2$ 以上であり、直線 $\ell$ と直線 $x=1$ の交点の $y$ 座標が $2$ 以上であるような点 $\left(a,b\right)$ のとりうる範囲 $D$ を求め、$ab$ 平面上に図示する`,
          answer: String.raw`$D\colon a>0,\ b>0,\ a^{2}+b^{2}\leqq1,\ a+2b\leqq2$`,
          approach: String.raw`2つの条件をそれぞれ $a,b$ の式に直す。点と直線の距離の公式と、$x=1$ を代入するだけ。分母を払うときに $b>0$ が効く。`,
          blocks: [
            { k: "p", t: String.raw`**条件1。** 原点と $\ell$ の距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|a\cdot0+b\cdot0-2\right|}{\sqrt{a^{2}+b^{2}}}=\frac{2}{\sqrt{a^{2}+b^{2}}}`,
            },
            { k: "p", t: String.raw`である。これが $2$ 以上という条件は` },
            {
              k: "math",
              t: String.raw`\frac{2}{\sqrt{a^{2}+b^{2}}}\geqq2\iff\sqrt{a^{2}+b^{2}}\leqq1\iff a^{2}+b^{2}\leqq1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**条件2。** $\ell$ に $x=1$ を代入すると $a+by-2=0$、すなわち $y=\dfrac{2-a}{b}$ である（$b>0$ なので割れる）。これが $2$ 以上という条件は`,
            },
            {
              k: "math",
              t: String.raw`\frac{2-a}{b}\geqq2\iff2-a\geqq2b\iff a+2b\leqq2`,
            },
            { k: "p", t: String.raw`である（$b>0$ なので不等号の向きは変わらない）。` },
            { k: "p", t: String.raw`以上より` },
            {
              k: "math",
              t: String.raw`D=\left\{\left(a,b\right)\ \middle|\ a>0,\ b>0,\ a^{2}+b^{2}\leqq1,\ a+2b\leqq2\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。円 $a^{2}+b^{2}=1$ と直線 $a+2b=2$ の交点を求めると、$a=2-2b$ を代入して`,
            },
            {
              k: "math",
              t: String.raw`\left(2-2b\right)^{2}+b^{2}=1,\qquad5b^{2}-8b+3=0,\qquad\left(5b-3\right)\left(b-1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`より $b=\dfrac35$（このとき $a=\dfrac45$）または $b=1$（このとき $a=0$ で $a>0$ に反する）である。したがって $D$ の境界は、$\left(0,1\right)$ から $\left(\dfrac45,\dfrac35\right)$ までは直線 $a+2b=2$、そこから $\left(1,0\right)$ までは円 $a^{2}+b^{2}=1$ になる（$a$ 軸・$b$ 軸上は含まない）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが D（a 軸・b 軸上は含まない）。左上のまっすぐな境界が直線 a + 2b = 2、右下のふくらんだ境界が円 a² + b² = 1 で、(4/5, 3/5) でつながる。破線は (2) で最大になるときの直線 3a + 2b = √13 で、円に接している。",
                view: [-0.35, 1.75, -0.25, 1.4],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: AREA_D },
                  { k: "seg", a: [0, 1], b: [0.8, 0.6] },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: TH22,
                  },
                  { k: "curve", f: TANG, from: 0.3, to: (R13 + 0.5) / 3, dash: true },
                  { k: "dot", at: [1, 0] },
                  { k: "dot", at: [0, 1] },
                  {
                    k: "dot",
                    at: [3 / R13, 2 / R13],
                    label: "最大 √13",
                    place: "above-right",
                  },
                  { k: "text", at: [0.3, 0.3], label: "D", place: "right" },
                  { k: "text", at: [1.0, TANG(1.0)], label: "3a + 2b = √13", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{2-a}{b}\geqq2$ の両辺に $b$ を掛けるとき、$b>0$ が効いている。符号が分からなければ掛けられない。`,
            String.raw`$a^{2}+b^{2}\leqq1$ だけでは $a+2b\leqq2$ は出ない（コーシー・シュワルツから $a+2b\leqq\sqrt5$ までしか言えない）。両方必要である。`,
          ],
          check: String.raw`$a,b$ を $0.005$ 刻みで走査すると、もとの2条件と $\left(a^{2}+b^{2}\leqq1\ \text{かつ}\ a+2b\leqq2\right)$ が完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\left(a,b\right)$ が (1) で求めた範囲 $D$ を動くとき、$3a+2b$ を最大にする $a,b$ の値と、$3a+2b$ の最大値を求める`,
          answer: String.raw`$a=\dfrac{3\sqrt{13}}{13}$、$b=\dfrac{2\sqrt{13}}{13}$ のとき最大値 $\sqrt{13}$`,
          approach: String.raw`$3a+2b=k$ は傾き $-\dfrac32$ の直線の束。$k$ を大きくすると直線は右上に動くので、$D$ と接する（最後に触れる）ところが最大。円のほうに接するか、角 $\left(\dfrac45,\dfrac35\right)$ でとまるかを見分ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$3a+2b=k$ とおく。これは傾き $-\dfrac32$ の直線で、$k$ が大きいほど右上にある。$D$ と共有点をもつ範囲で $k$ を最大にしたい。`,
            },
            {
              k: "p",
              t: String.raw`**まず円に接する場合を調べる。** 円 $a^{2}+b^{2}=1$ と直線 $3a+2b=k$ が接する条件は、中心 $\left(0,0\right)$ との距離が $1$ になることなので`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left|k\right|}{\sqrt{3^{2}+2^{2}}}=1,\qquad k=\pm\sqrt{13}`,
            },
            {
              k: "p",
              t: String.raw`である。$k=\sqrt{13}$ のときの接点は、中心から法線ベクトル $\left(3,2\right)$ の向きに半径 $1$ だけ進んだ点`,
            },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(\frac{3}{\sqrt{13}},\ \frac{2}{\sqrt{13}}\right)=\left(\frac{3\sqrt{13}}{13},\ \frac{2\sqrt{13}}{13}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**この接点が $D$ に入っているかを確かめる。** $a>0$、$b>0$ は明らかである。$a+2b\leqq2$ については`,
            },
            {
              k: "math",
              t: String.raw`a+2b=\frac{3}{\sqrt{13}}+\frac{4}{\sqrt{13}}=\frac{7}{\sqrt{13}}=\frac{7\sqrt{13}}{13}`,
            },
            {
              k: "p",
              t: String.raw`で、$\dfrac{7}{\sqrt{13}}\leqq2\iff7\leqq2\sqrt{13}=\sqrt{52}$、$49\leqq52$ ✓ なので満たしている。`,
            },
            {
              k: "p",
              t: String.raw`接点が $D$ に含まれているので、$k=\sqrt{13}$ は実現できる。また $D$ は円 $a^{2}+b^{2}\leqq1$ に含まれているので、$D$ 上では`,
            },
            {
              k: "math",
              t: String.raw`3a+2b\leqq\sqrt{3^{2}+2^{2}}\sqrt{a^{2}+b^{2}}\leqq\sqrt{13}`,
            },
            {
              k: "p",
              t: String.raw`（コーシー・シュワルツの不等式）であり、$\sqrt{13}$ を超えることはない。よって最大値は $\sqrt{13}$ で、そのときの $a,b$ は上の接点である。`,
            },
            {
              k: "math",
              t: String.raw`a=\frac{3\sqrt{13}}{13},\qquad b=\frac{2\sqrt{13}}{13},\qquad\left(3a+2b\right)_{\max}=\sqrt{13}`,
            },
            {
              k: "note",
              t: String.raw`もし接点が $a+2b\leqq2$ を外れていたら、最大は角 $\left(\dfrac45,\dfrac35\right)$ でとり、$3\cdot\dfrac45+2\cdot\dfrac35=\dfrac{18}{5}=3.6$ になるところだった。実際 $\sqrt{13}=3.6055\cdots$ とわずかに大きい。接点が領域に入っているかの確認が欠かせない。`,
            },
          ],
          pitfalls: [
            String.raw`円に接する点が、もう1つの条件 $a+2b\leqq2$ を満たしているかを必ず確かめる。満たしていなければ答えは角の点になる。`,
            String.raw`$k=-\sqrt{13}$ のほうは第3象限側の接点なので、$a,b>0$ では関係ない。`,
          ],
          check: String.raw`格子探索での最大は $3.605500$（$a=0.8295$、$b=0.5585$）で、$\sqrt{13}=3.605551$ とほぼ一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["平面の法線ベクトル", "外積にあたる計算", "点と平面の距離", "四面体の体積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "法線ベクトルを $\\vec a\\times\\vec b$ として計算すると $\\left(\\sqrt2,-4,\\sqrt6\\right)$、長さは $2\\sqrt6=4.898979486$ だった",
          "$\\mathrm{H}=\\left(\\tfrac{\\sqrt3}{6},-\\tfrac{\\sqrt6}{3},\\tfrac12\\right)$ は $\\left|\\overrightarrow{\\mathrm{OH}}\\right|=1.000000000$、平面からの距離も $1.000000000$ だった",
          "平面 $\\mathrm{OAB}$ と $\\mathrm{C}$ の距離は $2.828427125$ で $2\\sqrt2$、体積は $2.309401077$ で $\\tfrac{4\\sqrt3}{3}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xyz$ 空間内の点 $\mathrm{O}(0,0,0)$、$\mathrm{A}(1,\sqrt2,\sqrt3)$、$\mathrm{B}(-\sqrt3,0,1)$、$\mathrm{C}(\sqrt6,-\sqrt3,\sqrt2)$ を頂点とする四面体 $\mathrm{OABC}$ を考える。3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ を含む平面からの距離が $1$ の点のうち、点 $\mathrm{O}$ に最も近く、$x$ 座標が正のものを $\mathrm{H}$ とするとき、$\mathrm{H}$ の座標を求める`,
          answer: String.raw`$\mathrm{H}\left(\dfrac{\sqrt3}{6},\ -\dfrac{\sqrt6}{3},\ \dfrac12\right)$`,
          approach: String.raw`平面 $\mathrm{OAB}$ の法線ベクトル $\vec n$ を、$\vec n\cdot\overrightarrow{\mathrm{OA}}=\vec n\cdot\overrightarrow{\mathrm{OB}}=0$ から求める。平面は $\mathrm{O}$ を通るので、距離 $1$ の点のうち $\mathrm{O}$ に最も近いのは $\mathrm{O}$ から法線方向に $1$ 進んだ点である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`平面 $\mathrm{OAB}$ の法線ベクトルを $\vec n=\left(p,q,r\right)$ とすると`,
            },
            {
              k: "math",
              t: String.raw`\vec n\cdot\overrightarrow{\mathrm{OA}}=p+\sqrt2\,q+\sqrt3\,r=0,\qquad\vec n\cdot\overrightarrow{\mathrm{OB}}=-\sqrt3\,p+r=0`,
            },
            {
              k: "p",
              t: String.raw`である。2つめより $r=\sqrt3\,p$。1つめに代入して $p+\sqrt2\,q+3p=0$、すなわち $q=-\dfrac{4p}{\sqrt2}=-2\sqrt2\,p$ である。$p=\sqrt2$ ととると`,
            },
            {
              k: "math",
              t: String.raw`\vec n=\left(\sqrt2,\ -4,\ \sqrt6\right),\qquad\left|\vec n\right|=\sqrt{2+16+6}=\sqrt{24}=2\sqrt6`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`平面 $\mathrm{OAB}$ は $\mathrm{O}$ を通る。平面からの距離が $1$ の点全体は、平面の両側にある2枚の平行な平面である。そのうち $\mathrm{O}$ に最も近い点は、$\mathrm{O}$ から法線方向に長さ $1$ だけ進んだ2点`,
            },
            {
              k: "math",
              t: String.raw`\pm\frac{\vec n}{\left|\vec n\right|}=\pm\frac{1}{2\sqrt6}\left(\sqrt2,\ -4,\ \sqrt6\right)=\pm\left(\frac{\sqrt3}{6},\ -\frac{\sqrt6}{3},\ \frac12\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{\sqrt2}{2\sqrt6}=\dfrac{1}{2\sqrt3}=\dfrac{\sqrt3}{6}$、$\dfrac{-4}{2\sqrt6}=\dfrac{-2}{\sqrt6}=-\dfrac{\sqrt6}{3}$、$\dfrac{\sqrt6}{2\sqrt6}=\dfrac12$）。どちらも $\mathrm{O}$ からの距離は $1$ で等しいので、$x$ 座標が正という条件で`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{H}\left(\frac{\sqrt3}{6},\ -\frac{\sqrt6}{3},\ \frac12\right)`,
            },
            { k: "p", t: String.raw`に決まる。` },
          ],
          pitfalls: [
            String.raw`平面が原点を通るので、「平面からの距離 $1$」の点のうち $\mathrm{O}$ に最も近いものは $\mathrm{O}$ からの距離も $1$ になる。法線方向の単位ベクトルそのものである。`,
            String.raw`$\pm$ の2つとも $\mathrm{O}$ から等距離なので、$x$ 座標の符号で選ぶ。`,
          ],
          check: String.raw`$\left|\overrightarrow{\mathrm{OH}}\right|=1.000000000$、平面からの距離も $1.000000000$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ を含む平面と点 $\mathrm{C}$ の距離を求める`,
          answer: String.raw`$2\sqrt2$`,
          approach: String.raw`(1) の $\vec n$ を使う。$\mathrm{O}$ を通る平面なので、距離は $\dfrac{\left|\vec n\cdot\overrightarrow{\mathrm{OC}}\right|}{\left|\vec n\right|}$ でよい。`,
          blocks: [
            { k: "p", t: String.raw`$\vec n=\left(\sqrt2,-4,\sqrt6\right)$、$\overrightarrow{\mathrm{OC}}=\left(\sqrt6,-\sqrt3,\sqrt2\right)$ なので` },
            {
              k: "math",
              t: String.raw`\vec n\cdot\overrightarrow{\mathrm{OC}}=\sqrt2\cdot\sqrt6+\left(-4\right)\left(-\sqrt3\right)+\sqrt6\cdot\sqrt2=2\sqrt3+4\sqrt3+2\sqrt3=8\sqrt3`,
            },
            { k: "p", t: String.raw`である（$\sqrt2\cdot\sqrt6=\sqrt{12}=2\sqrt3$）。よって距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|\vec n\cdot\overrightarrow{\mathrm{OC}}\right|}{\left|\vec n\right|}=\frac{8\sqrt3}{2\sqrt6}=\frac{4\sqrt3}{\sqrt6}=\frac{4}{\sqrt2}=2\sqrt2`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値では $2.828427125$ で、$2\sqrt2=2.828427125$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`四面体 $\mathrm{OABC}$ の体積を求める`,
          answer: String.raw`$\dfrac{4\sqrt3}{3}$`,
          approach: String.raw`$\triangle\mathrm{OAB}$ を底面、(2) の距離を高さとする。$\triangle\mathrm{OAB}$ の面積は $\dfrac{\left|\vec n\right|}{2}$ である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|\overrightarrow{\mathrm{OA}}\right|^{2}=1+2+3=6$、$\left|\overrightarrow{\mathrm{OB}}\right|^{2}=3+0+1=4$、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=-\sqrt3+0+\sqrt3=0$ なので、$\triangle\mathrm{OAB}$ は $\mathrm{O}$ が直角の直角三角形である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{OAB}=\frac12\left|\overrightarrow{\mathrm{OA}}\right|\left|\overrightarrow{\mathrm{OB}}\right|=\frac12\cdot\sqrt6\cdot2=\sqrt6`,
            },
            {
              k: "p",
              t: String.raw`である（これは $\dfrac{\left|\vec n\right|}{2}=\dfrac{2\sqrt6}{2}=\sqrt6$ とも一致する）。(2) より高さは $2\sqrt2$ なので`,
            },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot\sqrt6\cdot2\sqrt2=\frac{2\sqrt{12}}{3}=\frac{4\sqrt3}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{OA}}\perp\overrightarrow{\mathrm{OB}}$ になっているのは問題の仕掛けで、底面積が一瞬で出る。気づかなくても $\dfrac{\left|\vec n\right|}{2}$ で同じ値になる。`,
            },
          ],
          pitfalls: [
            String.raw`角錐の体積は $\dfrac13\times\left(\text{底面積}\right)\times\left(\text{高さ}\right)$。$\dfrac12$ と間違えない。`,
          ],
          check: String.raw`数値では $2.309401077$ で、$\dfrac{4\sqrt3}{3}=2.309401077$ と一致した。`,
        },
      ],
    },
  ],
};
