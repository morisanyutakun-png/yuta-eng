import { tohokuRikei2020 } from "@/lib/solutions/tohoku-rikei-2020";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2020年度（令和2年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第2問は理系の第3問、文系の第3問は理系の第2問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理系の側から借りる。第1問・第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2020.questions.find((q) => q.no === no)!;

/** 理系 第3問（整数）。文系の第2問とまったく同じ問題。 */
const sharedSeisu: Question = { ...rikei(3), no: 2 };

/** 理系 第2問（図形と方程式）。文系の第3問とまったく同じ問題。 */
const sharedCircle: Question = { ...rikei(2), no: 3 };

/** 第1問の図。$a=1$ の例。 */
const F20A = (x: number): number => (x - 1) * (x + 2);
const F20B = (x: number): number => 2 * (x - 1) * (x - 3);
const ZERO20 = (): number => 0;

/** 第4問の図。$\vec q=(3,1)$ のまわりの $30^{\circ}$ の範囲。 */
const QA20 = Math.atan2(1, 3);
const A1_20 = QA20 + Math.PI / 6;
const A2_20 = QA20 - Math.PI / 6;
const CONE20: [number, number][] = [
  [0, 0],
  ...Array.from({ length: 25 }, (_, i): [number, number] => {
    const th = A2_20 + ((A1_20 - A2_20) * i) / 24;
    return [15 * Math.cos(th), 15 * Math.sin(th)];
  }),
];

export const tohokuBunkei2020: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["区分けされた関数", "6分の1公式", "3次関数の増減", "端点での最大"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=-2,-1,0,1,2,3,8-5\\sqrt2$ の7通りで、数値積分と $\\tfrac{(a+2)^{3}}6+\\tfrac{(3-a)^{3}}3$ が小数9桁まで一致した",
          "どの $a$ でも $-2\\leqq x\\leqq3$ で $f(x)\\leqq0$ になっていることを2001点で確かめた",
          "$a$ を $5\\times10^{-5}$ 刻みで動かすと、最小は $a=0.928950$ での $7.148869803$（$8-5\\sqrt2=0.928932$、$\\tfrac{125(3-2\\sqrt2)}3=7.148869802$）、最大は $a=-2$ での $41.666666667$（$\\tfrac{125}3$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を $-2\leqq a\leqq3$ を満たす実数とし、$f(x)$ を「$x<-2$ では $0$、$-2\leqq x\leqq a$ では $\left(x-a\right)\left(x+2\right)$、$a\leqq x\leqq3$ では $2\left(x-a\right)\left(x-3\right)$、$x>3$ では $0$」で定める。曲線 $y=f(x)$ と $x$ 軸で囲まれる図形の面積を $S(a)$ とするとき、$S(a)$ を求める`,
          answer: String.raw`$S(a)=\dfrac{\left(a+2\right)^{3}}{6}+\dfrac{\left(3-a\right)^{3}}{3}$`,
          approach: String.raw`どちらの区間でも $f(x)\leqq0$ なので、面積は $-f$ の積分。$\displaystyle\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=-\dfrac{\left(\beta-\alpha\right)^{3}}{6}$（6分の1公式）がそのまま使える形になっている。`,
          blocks: [
            { k: "p", t: String.raw`**符号。** $-2\leqq x\leqq a$ では $x+2\geqq0$、$x-a\leqq0$ なので $f(x)\leqq0$。$a\leqq x\leqq3$ では $x-a\geqq0$、$x-3\leqq0$ なので $f(x)\leqq0$。どちらも $x$ 軸より下にある。` },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`S(a)=-\int_{-2}^{a}\left(x-a\right)\left(x+2\right)dx-\int_{a}^{3}2\left(x-a\right)\left(x-3\right)dx`,
            },
            { k: "p", t: String.raw`である。6分の1公式 $\displaystyle\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=-\frac{\left(\beta-\alpha\right)^{3}}{6}$ を使うと` },
            {
              k: "math",
              t: String.raw`\int_{-2}^{a}\left(x+2\right)\left(x-a\right)dx=-\frac{\left(a+2\right)^{3}}{6},\qquad\int_{a}^{3}\left(x-a\right)\left(x-3\right)dx=-\frac{\left(3-a\right)^{3}}{6}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`S(a)=\frac{\left(a+2\right)^{3}}{6}+2\cdot\frac{\left(3-a\right)^{3}}{6}=\frac{\left(a+2\right)^{3}}{6}+\frac{\left(3-a\right)^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1 のときの y = f(x)。x < -2 と x > 3 では 0、そのあいだは2つの放物線の一部でどちらも x 軸より下にある。網かけの合計が S(a)。a が動くと2つの山のつなぎ目が左右に動く。",
                view: [-3, 4, -3, 1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: ZERO20, bottom: F20A, from: -2, to: 1 },
                  { k: "fillBetween", top: ZERO20, bottom: F20B, from: 1, to: 3 },
                  { k: "seg", a: [-3, 0], b: [-2, 0] },
                  { k: "curve", f: F20A, from: -2, to: 1 },
                  { k: "curve", f: F20B, from: 1, to: 3 },
                  { k: "seg", a: [3, 0], b: [4, 0] },
                  { k: "dot", at: [-2, 0], label: "-2", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "a", place: "above" },
                  { k: "dot", at: [3, 0], label: "3", place: "above-right" },
                  { k: "text", at: [-1.5, F20A(-1.5)], label: "y = f(x)", place: "left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$a=-2$ のときは左側の山がつぶれて $S=\dfrac{125}{3}$、$a=3$ のときは右側がつぶれて $S=\dfrac{125}{6}$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$f$ は $x$ 軸より下にあるので、面積は積分の値そのものではなく符号を反転したもの。`,
            String.raw`右側の係数 $2$ を忘れない。6分の1公式の結果を $2$ 倍する。`,
          ],
          check: String.raw`$a$ を7通りとって数値積分すると、この式とすべて小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$S(a)$ が最大となる $a$ の値を求め、また $S(a)$ が最小となる $a$ の値を求める`,
          answer: String.raw`最大は $a=-2$、最小は $a=8-5\sqrt2$`,
          approach: String.raw`$S$ を微分する。$S'(a)=0$ は $\left(a+2\right)^{2}=2\left(3-a\right)^{2}$ という形で、平方根をとれば1次方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の $S(a)$ を微分すると` },
            {
              k: "math",
              t: String.raw`S'(a)=\frac{3\left(a+2\right)^{2}}{6}-\frac{3\left(3-a\right)^{2}}{3}=\frac{\left(a+2\right)^{2}}{2}-\left(3-a\right)^{2}`,
            },
            { k: "p", t: String.raw`である（$\left(3-a\right)^{3}$ の微分は $-3\left(3-a\right)^{2}$ なので、$\dfrac13$ 倍して $-\left(3-a\right)^{2}$）。$S'(a)=0$ は` },
            {
              k: "math",
              t: String.raw`\left(a+2\right)^{2}=2\left(3-a\right)^{2}`,
            },
            { k: "p", t: String.raw`である。$-2\leqq a\leqq3$ では $a+2\geqq0$、$3-a\geqq0$ なので、両辺の平方根をとって` },
            {
              k: "math",
              t: String.raw`a+2=\sqrt2\left(3-a\right),\qquad\left(1+\sqrt2\right)a=3\sqrt2-2`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`a=\frac{3\sqrt2-2}{1+\sqrt2}=\frac{\left(3\sqrt2-2\right)\left(\sqrt2-1\right)}{\left(\sqrt2+1\right)\left(\sqrt2-1\right)}=6-3\sqrt2-2\sqrt2+2=8-5\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`である。$8-5\sqrt2=0.928\cdots$ で、確かに $-2\leqq a\leqq3$ の内部にある。`,
            },
            { k: "p", t: String.raw`**増減。** $S'(-2)=0-25=-25<0$、$S'(3)=\dfrac{25}{2}-0>0$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$-2\leqq a<8-5\sqrt2$：$S'(a)<0$ で減少`,
                String.raw`$8-5\sqrt2<a\leqq3$：$S'(a)>0$ で増加`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。したがって最小は $a=8-5\sqrt2$ でとる。最大は両端のどちらかで、`,
            },
            {
              k: "math",
              t: String.raw`S(-2)=\frac{0}{6}+\frac{5^{3}}{3}=\frac{125}{3},\qquad S(3)=\frac{5^{3}}{6}+0=\frac{125}{6}`,
            },
            { k: "p", t: String.raw`を比べると $\dfrac{125}{3}>\dfrac{125}{6}$ なので、最大は $a=-2$ である。よって` },
            {
              k: "math",
              t: String.raw`\text{最大となる}\ a=-2,\qquad\text{最小となる}\ a=8-5\sqrt2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`最小値は $S\left(8-5\sqrt2\right)=\dfrac{125\left(3-2\sqrt2\right)}{3}=7.148\cdots$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$S'(a)=0$ の2乗を外すとき、$a+2\geqq0$ と $3-a\geqq0$ を使って正の平方根だけをとる。`,
            String.raw`最大は内部の極値ではなく端点。両端の値を比べることを忘れない。`,
          ],
          check: String.raw`$a$ を $5\times10^{-5}$ 刻みで走査すると、最小は $a=0.92895$（$8-5\sqrt2=0.928932$）、最大は $a=-2$ だった。`,
        },
      ],
    },
    sharedSeisu,
    sharedCircle,
    {
      no: 4,
      field: "確率・ベクトル",
      topics: ["反復試行", "ベクトルの成分", "内積となす角", "二項係数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$2^{6}=64$ 通りの表裏をすべて列挙すると、$x+y$ の値は $6$ だけだった",
          "$\\vec p=(0,6)$ になるのは $15$ 通りで $\\tfrac{15}{64}$ だった",
          "$\\vec q=(3,1)$ とのなす角が $30^{\\circ}$ 以下になるのは $s=3,4$ のときだけで、合わせて $35$ 通り、$\\tfrac{35}{64}$ だった（角度は順に $98.13^{\\circ},90^{\\circ},71.57^{\\circ},26.57^{\\circ},18.43^{\\circ},36.87^{\\circ},45^{\\circ}$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$6$ 枚の硬貨を同時に投げて、表がでた硬貨が $s$ 枚、裏がでた硬貨が $t$ 枚であったとき、ベクトル $\vec p=\left(x,y\right)$ を $\vec p=s\left(2,-1\right)+t\left(-1,2\right)$ で定める。$x+y$ の値を求める`,
          answer: String.raw`$x+y=6$`,
          approach: String.raw`成分を足すと、$\left(2,-1\right)$ も $\left(-1,2\right)$ も成分の和が $1$ であることが効く。`,
          blocks: [
            { k: "p", t: String.raw`成分で書くと` },
            {
              k: "math",
              t: String.raw`x=2s-t,\qquad y=-s+2t`,
            },
            { k: "p", t: String.raw`である。足すと` },
            {
              k: "math",
              t: String.raw`x+y=\left(2s-t\right)+\left(-s+2t\right)=s+t`,
            },
            { k: "p", t: String.raw`で、硬貨は6枚なので $s+t=6$ である。よって` },
            { k: "math", t: String.raw`x+y=6` },
            { k: "p", t: String.raw`で、表裏の出かたによらず一定である。` },
            {
              k: "note",
              t: String.raw`つまり $\vec p$ の終点は、いつも直線 $x+y=6$ の上にある。(3) ではこの事実が効いてくる。`,
            },
          ],
          check: String.raw`$64$ 通りをすべて計算すると、$x+y$ はつねに $6$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\vec p=\left(0,6\right)$ となる確率を求める`,
          answer: String.raw`$\dfrac{15}{64}$`,
          approach: String.raw`成分を連立して $s$ を決めれば、あとはふつうの反復試行の確率。`,
          blocks: [
            { k: "p", t: String.raw`$2s-t=0$ かつ $-s+2t=6$ とする。1本目より $t=2s$ で、2本目に入れると` },
            {
              k: "math",
              t: String.raw`-s+4s=6,\qquad s=2,\qquad t=4`,
            },
            { k: "p", t: String.raw`である（$s+t=6$ も満たす ✓）。表が2枚出る確率は` },
            {
              k: "math",
              t: String.raw`{}_{6}\mathrm{C}_{2}\left(\frac12\right)^{2}\left(\frac12\right)^{4}=\frac{15}{2^{6}}=\frac{15}{64}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$64$ 通りのうち $15$ 通りで $\vec p=(0,6)$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\vec p$ と $\vec q=\left(3,1\right)$ のなす角が $\dfrac{\pi}{6}$ 以下となる確率を求める`,
          answer: String.raw`$\dfrac{35}{64}$`,
          approach: String.raw`$t=6-s$ を入れると $\vec p=3\left(s-2,\ 4-s\right)$ となり、$s=0,1,\ldots,6$ の7通りしかない。あとは1つずつ $\cos$ を計算して $\dfrac{\sqrt3}{2}$ と比べるだけ。`,
          blocks: [
            { k: "p", t: String.raw`$t=6-s$ を代入すると` },
            {
              k: "math",
              t: String.raw`\vec p=\left(2s-\left(6-s\right),\ -s+2\left(6-s\right)\right)=\left(3s-6,\ 12-3s\right)=3\left(s-2,\ 4-s\right)`,
            },
            {
              k: "p",
              t: String.raw`である。向きは $\left(s-2,\ 4-s\right)$ で決まるので、$s=0,1,\ldots,6$ の7通りを調べればよい。なす角 $\theta$ が $\dfrac{\pi}{6}$ 以下という条件は`,
            },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac{\vec p\cdot\vec q}{\left|\vec p\right|\left|\vec q\right|}\geqq\cos\frac{\pi}{6}=\frac{\sqrt3}{2}=0.866\cdots`,
            },
            { k: "p", t: String.raw`である。$\left|\vec q\right|=\sqrt{10}$ に注意して、向きベクトル $\vec u=\left(s-2,\ 4-s\right)$ ごとに計算する。` },
            {
              k: "steps",
              items: [
                String.raw`$s=0$：$\vec u=\left(-2,4\right)$、$\vec u\cdot\vec q=-2$ で負。不適`,
                String.raw`$s=1$：$\vec u=\left(-1,3\right)$、$\vec u\cdot\vec q=0$ で $\theta=\dfrac\pi2$。不適`,
                String.raw`$s=2$：$\vec u=\left(0,2\right)$、$\cos\theta=\dfrac{2}{2\sqrt{10}}=\dfrac{1}{\sqrt{10}}=0.316$。不適`,
                String.raw`$s=3$：$\vec u=\left(1,1\right)$、$\cos\theta=\dfrac{4}{\sqrt2\sqrt{10}}=\dfrac{4}{2\sqrt5}=\dfrac{2}{\sqrt5}=0.894$。**適する**`,
                String.raw`$s=4$：$\vec u=\left(2,0\right)$、$\cos\theta=\dfrac{6}{2\sqrt{10}}=\dfrac{3}{\sqrt{10}}=0.949$。**適する**`,
                String.raw`$s=5$：$\vec u=\left(3,-1\right)$、$\cos\theta=\dfrac{8}{\sqrt{10}\sqrt{10}}=\dfrac{8}{10}=0.8$。不適`,
                String.raw`$s=6$：$\vec u=\left(4,-2\right)$、$\cos\theta=\dfrac{10}{\sqrt{20}\sqrt{10}}=\dfrac{10}{10\sqrt2}=\dfrac{1}{\sqrt2}=0.707$。不適`,
              ],
            },
            {
              k: "p",
              t: String.raw`（$\dfrac{2}{\sqrt5}=0.8944$、$\dfrac{\sqrt3}{2}=0.8660$ なので $s=3$ は適する。$0.8<0.866$ なので $s=5$ は不適。）適するのは $s=3,4$ である。よって確率は`,
            },
            {
              k: "math",
              t: String.raw`\frac{ {}_{6}\mathrm{C}_{3}+{}_{6}\mathrm{C}_{4}}{2^{6}}=\frac{20+15}{64}=\frac{35}{64}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "s = 0 から 6 までの7通りの p は、すべて直線 x + y = 6 の上に等間隔に並ぶ。網かけは q = (3, 1) の向きから 30° 以内の範囲で、その中に入るのは s = 3 と s = 4 の2つ。",
                view: [-9, 16, -8, 14],
                step: { x: 5, y: 5 },
                items: [
                  { k: "fill", pts: CONE20 },
                  { k: "seg", a: [0, 0], b: [15 * Math.cos(A1_20), 15 * Math.sin(A1_20)], dash: true },
                  { k: "seg", a: [0, 0], b: [15 * Math.cos(A2_20), 15 * Math.sin(A2_20)], dash: true },
                  { k: "seg", a: [-6, 12], b: [12, -6], faint: true },
                  { k: "seg", a: [0, 0], b: [3, 1] },
                  { k: "dot", at: [3, 1], label: "q", place: "below-right" },
                  { k: "dot", at: [-6, 12], label: "s = 0", place: "above-right" },
                  { k: "dot", at: [-3, 9], label: "s = 1", place: "above-right" },
                  { k: "dot", at: [0, 6], label: "s = 2", place: "above-right" },
                  { k: "dot", at: [3, 3], label: "s = 3", place: "right" },
                  { k: "dot", at: [6, 0], label: "s = 4", place: "above-right" },
                  { k: "dot", at: [9, -3], label: "s = 5", place: "right" },
                  { k: "dot", at: [12, -6], label: "s = 6", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$s=5$ のときの $0.8$ と $\dfrac{\sqrt3}{2}=0.866\cdots$ の比較は、$0.8^{2}=0.64$ と $\left(\dfrac{\sqrt3}{2}\right)^{2}=0.75$ を比べれば確実である。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec p$ は7通りしかない。$64$ 通りを1つずつ調べる必要はなく、$s$ で分類する。`,
            String.raw`$\cos$ の値を $\dfrac{\sqrt3}{2}$ と比べるときは、どちらも正であることを確かめてから2乗して比べると間違えにくい。`,
          ],
          check: String.raw`$64$ 通りをすべて調べると、なす角が $30^{\circ}$ 以下になるのは $35$ 通りだった。`,
        },
      ],
    },
  ],
};
