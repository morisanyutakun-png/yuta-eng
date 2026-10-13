import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 三重大学 2025年度（令和7年度）一般選抜 前期日程 数学②（医学部医学科）。
 *
 * 三重大の前期日程は学部によって3つの区分に分かれ、問題はそれぞれ別。
 * 2025年度は ①教育・生物資源、②医学部医学科、③工学部 で、ここで扱うのは②。
 * （2026年度の②は医学科・工学部の共通問題だった。年度によって組み合わせが変わる。）
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 他社の解答解説は見ていない。大学が公開している出題意図も読んでいないし引用もしない。
 * 問題文・図・表は1つも載せていない。
 */

/** 第1問(4) の図。単位円から2つの弓形を取り除いた領域の輪郭。 */
const REGION25: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const arc = (from: number, to: number): void => {
    const n = 60;
    for (let i = 0; i <= n; i++) {
      const t = from + ((to - from) * i) / n;
      pts.push([Math.cos(t), Math.sin(t)]);
    }
  };
  arc(Math.PI / 6, Math.PI);
  arc((4 * Math.PI) / 3, 2 * Math.PI);
  return pts;
})();

/** 第3問の $f$。$-1\leqq x<0$ の側。 */
const LEFT25 = (x: number): number => 1 - Math.sqrt(Math.max(0, 1 - (x + 1) ** 2));
/** 第3問の $f$。$0\leqq x\leqq1$ の側。 */
const RIGHT25 = (x: number): number => 1 - Math.sqrt(Math.max(0, 1 - (x - 1) ** 2));

export const mie2025: SolutionSet = {
  slug: "mie",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "数学②（医学部医学科）",
  university: "三重大学",
  short: "三重大",
  source: null,
  questions: [
    {
      no: 1,
      field: "小問集合",
      topics: ["単位ベクトルの和と内積", "余角の関係", "和から一般項", "領域と1次式の最大最小", "複素数の極形式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "(1) $\\vec a\\cdot\\vec c=-\\tfrac{\\sqrt3}{3}$ から $\\vec b$ を作ると大きさがちょうど $1$ になった",
          "(2) $\\tan\\tfrac\\pi{10}\\tan\\tfrac25\\pi$ を数値で計算すると $1.000000000$ だった",
          "(3) $a_{n}=3\\cdot2^{n-1}-2\\cdot3^{n}$ の和が $n=1,\\ldots,14$ で $3^{n}+2a_{n}$ と一致した",
          "(4) $1201\\times1201$ の格子で領域内の $x+y$ を調べ、最大 $1.41333$・最小 $-1.36500$ となり $\\sqrt2=1.41421$、$-\\tfrac{1+\\sqrt3}{2}=-1.36603$ に迫った",
          "(5) $\\theta_{1}$ を $72000$ 等分して全探索し、解が $\\left(\\tfrac\\pi6,\\tfrac{11}6\\pi\\right)$ と $\\left(\\tfrac56\\pi,\\tfrac76\\pi\\right)$ の2組だけであることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の点 $\mathrm{O}$ を中心とする半径 $1$ の円周上に3点 $\mathrm{A},\mathrm{B},\mathrm{C}$ があり、$\overrightarrow{\mathrm{OA}}+\sqrt2\,\overrightarrow{\mathrm{OB}}+\sqrt3\,\overrightarrow{\mathrm{OC}}=\vec0$ を満たすとき、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OC}}$ を求める`,
          answer: String.raw`$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OC}}=-\dfrac{\sqrt3}{3}$`,
          approach: String.raw`$\vec b$ だけを移項してから大きさの2乗をとると、$\left|\vec b\right|=1$ を使って内積が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおくと $\left|\vec a\right|=\left|\vec b\right|=\left|\vec c\right|=1$ である。条件から`,
            },
            { k: "math", t: String.raw`\sqrt2\,\vec b=-\left(\vec a+\sqrt3\,\vec c\right)` },
            { k: "p", t: String.raw`なので、両辺の大きさの2乗をとると` },
            {
              k: "math",
              t: String.raw`2\left|\vec b\right|^{2}=\left|\vec a\right|^{2}+2\sqrt3\,\vec a\cdot\vec c+3\left|\vec c\right|^{2}`,
            },
            { k: "p", t: String.raw`すなわち $2=1+2\sqrt3\,\vec a\cdot\vec c+3$ である。よって` },
            { k: "math", t: String.raw`\vec a\cdot\vec c=-\frac{1}{\sqrt3}=-\frac{\sqrt3}{3}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\vec a\cdot\vec c=-\dfrac{\sqrt3}{3}$ のとき $\cos\angle\mathrm{AOC}=-\dfrac{\sqrt3}{3}$ で、このとき $\left|\vec a+\sqrt3\,\vec c\right|=\sqrt2$ だから $\vec b=-\dfrac{\vec a+\sqrt3\,\vec c}{\sqrt2}$ はちょうど単位ベクトルになる。つまりそのような $\mathrm{A},\mathrm{B},\mathrm{C}$ は実際に存在する。`,
            },
          ],
          check: String.raw`$\vec a\cdot\vec c=-\dfrac{\sqrt3}{3}$ となるように $\vec a,\vec c$ をとって $\vec b$ を作ると、$\left|\vec b\right|=1.000000000$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\tan\dfrac{\pi}{10}\tan\dfrac25\pi=1$ を示す`,
          answer: String.raw`$\dfrac{\pi}{10}+\dfrac25\pi=\dfrac{\pi}{2}$ なので $\tan\dfrac25\pi=\dfrac{1}{\tan\frac{\pi}{10}}$`,
          approach: String.raw`2つの角の和が $\dfrac\pi2$ であることに気づけばよい。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{\pi}{10}+\dfrac25\pi=\dfrac{\pi}{10}+\dfrac{4\pi}{10}=\dfrac{\pi}{2}$ なので` },
            {
              k: "math",
              t: String.raw`\tan\frac25\pi=\tan\left(\frac\pi2-\frac{\pi}{10}\right)=\frac{1}{\tan\frac{\pi}{10}}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<\dfrac{\pi}{10}<\dfrac\pi2$ より $\tan\dfrac{\pi}{10}>0$ で、とくに $0$ ではないから`,
            },
            {
              k: "math",
              t: String.raw`\tan\frac{\pi}{10}\tan\frac25\pi=\tan\frac{\pi}{10}\cdot\frac{1}{\tan\frac{\pi}{10}}=1`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値で計算すると $\tan\dfrac{\pi}{10}\tan\dfrac25\pi=1.000000000$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`数列 $\left\{a_{n}\right\}$ の初項から第 $n$ 項までの和 $S_{n}$ が $S_{n}=3^{n}+2a_{n}$ であるとき、一般項を求める`,
          answer: String.raw`$a_{n}=3\cdot2^{n-1}-2\cdot3^{n}$`,
          approach: String.raw`$a_{n}=S_{n}-S_{n-1}$ から $a_{n}$ の漸化式を作る。$a_{n}+2\cdot3^{n}$ が等比数列になる。`,
          blocks: [
            { k: "p", t: String.raw`$n=1$ のとき $a_{1}=S_{1}=3+2a_{1}$ なので $a_{1}=-3$ である。` },
            { k: "p", t: String.raw`$n\geqq2$ のとき $a_{n}=S_{n}-S_{n-1}$ より` },
            {
              k: "math",
              t: String.raw`a_{n}=\left(3^{n}+2a_{n}\right)-\left(3^{n-1}+2a_{n-1}\right)`,
            },
            { k: "p", t: String.raw`すなわち $-a_{n}=2\cdot3^{n-1}-2a_{n-1}$、つまり` },
            { k: "math", t: String.raw`a_{n}=2a_{n-1}-2\cdot3^{n-1}\qquad\left(n\geqq2\right)` },
            {
              k: "p",
              t: String.raw`である。$a_{n}+\alpha\cdot3^{n}=2\left(a_{n-1}+\alpha\cdot3^{n-1}\right)$ と変形できるように $\alpha$ を決める。右辺を展開すると $a_{n}=2a_{n-1}+\alpha\cdot3^{n-1}\left(2-3\right)=2a_{n-1}-\alpha\cdot3^{n-1}$ なので $\alpha=2$ である。よって`,
            },
            { k: "math", t: String.raw`a_{n}+2\cdot3^{n}=2\left(a_{n-1}+2\cdot3^{n-1}\right)\qquad\left(n\geqq2\right)` },
            {
              k: "p",
              t: String.raw`である。$b_{n}=a_{n}+2\cdot3^{n}$ とおくと $b_{1}=-3+6=3$、$b_{n}=2b_{n-1}$ なので $b_{n}=3\cdot2^{n-1}$ である。したがって`,
            },
            { k: "math", t: String.raw`a_{n}=3\cdot2^{n-1}-2\cdot3^{n}` },
            { k: "p", t: String.raw`である（$n=1$ でも $3-6=-3$ で合う）。` },
          ],
          pitfalls: [
            String.raw`$S_{n}$ の式に $a_{n}$ が入っているので、$a_{n}=S_{n}-S_{n-1}$ を作ると $a_{n}$ が両辺に出る。移項してから漸化式にする。`,
          ],
          check: String.raw`$a_{n}=3\cdot2^{n-1}-2\cdot3^{n}$ の和を $n=1$ から $14$ まで計算したところ、どれも $3^{n}+2a_{n}$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$y=a_{1}x+b_{1}$ を2点 $\left(1,0\right)$、$\left(\dfrac{\sqrt3}{2},\dfrac12\right)$ を通る直線、$y=a_{2}x+b_{2}$ を2点 $\left(-1,0\right)$、$\left(-\dfrac12,-\dfrac{\sqrt3}{2}\right)$ を通る直線とする。$x^{2}+y^{2}\leqq1$、$y\leqq a_{1}x+b_{1}$、$y\geqq a_{2}x+b_{2}$ の表す領域を図示し、$x+y$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\sqrt2$（点 $\left(\dfrac{\sqrt2}{2},\dfrac{\sqrt2}{2}\right)$）、最小値 $-\dfrac{1+\sqrt3}{2}$（点 $\left(-\dfrac12,-\dfrac{\sqrt3}{2}\right)$）`,
          approach: String.raw`4点はすべて単位円周上にあり、2本の直線は弦である。領域は単位円から2つの弓形を取り除いた形になる。`,
          blocks: [
            { k: "p", t: String.raw`2点 $\left(1,0\right)$、$\left(\dfrac{\sqrt3}{2},\dfrac12\right)$ を通る直線の傾きは` },
            {
              k: "math",
              t: String.raw`a_{1}=\frac{\frac12-0}{\frac{\sqrt3}{2}-1}=\frac{1}{\sqrt3-2}=\frac{\sqrt3+2}{3-4}=-\left(2+\sqrt3\right)`,
            },
            { k: "p", t: String.raw`で、$\left(1,0\right)$ を通るから $b_{1}=-a_{1}=2+\sqrt3$ である。同様に` },
            {
              k: "math",
              t: String.raw`a_{2}=\frac{-\frac{\sqrt3}{2}-0}{-\frac12-\left(-1\right)}=-\sqrt3,\qquad b_{2}=-\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`である。4点 $\left(1,0\right)$、$\left(\dfrac{\sqrt3}{2},\dfrac12\right)$、$\left(-1,0\right)$、$\left(-\dfrac12,-\dfrac{\sqrt3}{2}\right)$ はどれも単位円 $x^{2}+y^{2}=1$ の上にあり、$\left(\cos\theta,\sin\theta\right)$ と書くと順に $\theta=0,\dfrac\pi6,\pi,\dfrac43\pi$ に対応する。つまり2本の直線はどちらも単位円の弦である。`,
            },
            {
              k: "p",
              t: String.raw`原点では $0\leqq b_{1}=2+\sqrt3$、$0\geqq b_{2}=-\sqrt3$ がどちらも成り立つので、原点は領域に入る。よって領域は`,
            },
            {
              k: "p",
              t: String.raw`**単位円の周および内部から、$\theta=0$ と $\theta=\dfrac\pi6$ を結ぶ弦で切り取られる弓形、および $\theta=\pi$ と $\theta=\dfrac43\pi$ を結ぶ弦で切り取られる弓形を、それぞれ弦より外側だけ取り除いたもの**`,
            },
            { k: "p", t: String.raw`である（弦の上も境界として含む）。図示すると次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "単位円の内部から、角 0 と 30 度を結ぶ弦の外側、および角 180 度と 240 度を結ぶ弦の外側を取り除いた領域。x + y は角 45 度の円周上の点で最大、角 240 度の点で最小になる。",
                view: [-1.5, 1.6, -1.25, 1.25],
                items: [
                  { k: "fill", pts: REGION25 },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [1, 0], b: [Math.sqrt(3) / 2, 0.5] },
                  { k: "seg", a: [-1, 0], b: [-0.5, -Math.sqrt(3) / 2] },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [Math.sqrt(3) / 2, 0.5], label: "(√3/2, 1/2)", place: "above-right" },
                  { k: "dot", at: [-1, 0], label: "(−1, 0)", place: "above-left" },
                  { k: "dot", at: [-0.5, -Math.sqrt(3) / 2], label: "(−1/2, −√3/2)", place: "below-left" },
                  { k: "dot", at: [Math.SQRT1_2, Math.SQRT1_2], label: "最大", place: "above-right" },
                  { k: "text", at: [-0.5, -Math.sqrt(3) / 2], label: "最小", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`次に $x+y$ の最大・最小を調べる。領域は円板と2つの半平面の共通部分なので凸である。したがって1次式 $x+y$ の最大・最小は境界上でとる（内部の点 $\mathrm{P}$ を通る直線が境界と交わる2点を $\mathrm{Q},\mathrm{R}$ とすると、$\mathrm{P}$ は線分 $\mathrm{QR}$ の内分点なので、$x+y$ の値は2点での値の間にある）。`,
            },
            { k: "p", t: String.raw`境界の円弧の上では` },
            {
              k: "math",
              t: String.raw`x+y=\cos\theta+\sin\theta=\sqrt2\sin\left(\theta+\frac\pi4\right)`,
            },
            {
              k: "p",
              t: String.raw`である。残っている円弧は $\dfrac\pi6\leqq\theta\leqq\pi$ と $\dfrac43\pi\leqq\theta\leqq2\pi$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\theta=\dfrac\pi4$ は $\dfrac\pi6\leqq\theta\leqq\pi$ に入るので、$\sqrt2\sin\left(\theta+\dfrac\pi4\right)$ はそこで最大値 $\sqrt2$ をとる。`,
                String.raw`$\dfrac\pi6\leqq\theta\leqq\pi$ での最小は $\theta=\pi$ のときで $-1$。`,
                String.raw`$\dfrac43\pi\leqq\theta\leqq2\pi$ では $\theta+\dfrac\pi4$ が $\dfrac{19}{12}\pi$ から $\dfrac94\pi$ まで動き、$\sin$ は増加するので最小は $\theta=\dfrac43\pi$ のときで $-\dfrac12-\dfrac{\sqrt3}{2}=-\dfrac{1+\sqrt3}{2}$。`,
              ],
            },
            { k: "p", t: String.raw`境界の弦の上では、$y=-\sqrt3\left(x+1\right)$（$-1\leqq x\leqq-\dfrac12$）のとき` },
            { k: "math", t: String.raw`x+y=\left(1-\sqrt3\right)x-\sqrt3` },
            {
              k: "p",
              t: String.raw`で、$1-\sqrt3<0$ だから $x=-\dfrac12$ で最小値 $-\dfrac{1+\sqrt3}{2}$、$x=-1$ で最大値 $-1$ をとる。もう1本の弦 $y=-\left(2+\sqrt3\right)\left(x-1\right)$（$\dfrac{\sqrt3}{2}\leqq x\leqq1$）の上では $x+y=-\left(1+\sqrt3\right)x+2+\sqrt3$ で、値は $1$ と $\dfrac{1+\sqrt3}{2}$ の間にあり、最大 $\sqrt2$・最小 $-\dfrac{1+\sqrt3}{2}$ には届かない。`,
            },
            { k: "p", t: String.raw`以上より` },
            {
              k: "math",
              t: String.raw`\text{最大値}\ \sqrt2\ \left(\text{点}\ \left(\tfrac{\sqrt2}{2},\tfrac{\sqrt2}{2}\right)\right),\qquad\text{最小値}\ -\frac{1+\sqrt3}{2}\ \left(\text{点}\ \left(-\tfrac12,-\tfrac{\sqrt3}{2}\right)\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`円周上の最小 $-\sqrt2$ は $\theta=\dfrac54\pi$ のときだが、そこは取り除いた弓形の中なので使えない。`,
            String.raw`$\dfrac{1+\sqrt3}{2}=1.366\ldots<\sqrt2=1.414\ldots$ なので、最大は円弧の側でとる。`,
          ],
          check: String.raw`$1201\times1201$ の格子で領域内の $x+y$ を調べたところ、最大 $1.41333$・最小 $-1.36500$ となり、$\sqrt2=1.41421$、$-\dfrac{1+\sqrt3}{2}=-1.36603$ に迫った。`,
        },
        {
          label: "(5)",
          task: String.raw`$\cos\theta_{1}-\cos\theta_{2}=0$ かつ $\sin\theta_{1}-\sin\theta_{2}=1$（$0\leqq\theta_{1}\leqq\theta_{2}<2\pi$）を満たす組をすべて求め、さらに $\left|z_{1}\right|+\left|z_{2}\right|=5$、$\left|z_{1}z_{2}\right|=6$、$z_{1}\left|z_{2}\right|-\left|z_{1}\right|z_{2}=\left|z_{1}z_{2}\right|i$（$\left|z_{1}\right|\leqq\left|z_{2}\right|$、$0\leqq\arg z_{1}\leqq\arg z_{2}<2\pi$）を満たす組をすべて求める`,
          answer: String.raw`$\left(\theta_{1},\theta_{2}\right)=\left(\dfrac\pi6,\dfrac{11}{6}\pi\right),\left(\dfrac56\pi,\dfrac76\pi\right)$。$\left(z_{1},z_{2}\right)=\left(\sqrt3+i,\dfrac{3\sqrt3-3i}{2}\right),\left(-\sqrt3+i,\dfrac{-3\sqrt3-3i}{2}\right)$`,
          approach: String.raw`後半は $\left|z_{1}\right|=2$、$\left|z_{2}\right|=3$ を出してから極形式にすると、前半とまったく同じ連立になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**前半**　$\cos\theta_{1}=\cos\theta_{2}$ かつ $0\leqq\theta_{1}\leqq\theta_{2}<2\pi$ より、$\theta_{2}=\theta_{1}$ または $\theta_{2}=2\pi-\theta_{1}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\theta_{2}=\theta_{1}$ なら $\sin\theta_{1}-\sin\theta_{2}=0\neq1$ なので不適。よって $\theta_{2}=2\pi-\theta_{1}$ で、$\theta_{1}\leqq\theta_{2}$ より $\theta_{1}\leqq\pi$ である。このとき $\sin\theta_{2}=-\sin\theta_{1}$ だから`,
            },
            { k: "math", t: String.raw`\sin\theta_{1}-\left(-\sin\theta_{1}\right)=2\sin\theta_{1}=1,\qquad\sin\theta_{1}=\frac12` },
            { k: "p", t: String.raw`である。$0\leqq\theta_{1}\leqq\pi$ での解は $\theta_{1}=\dfrac\pi6,\dfrac56\pi$ で、対応する $\theta_{2}$ は $\dfrac{11}{6}\pi,\dfrac76\pi$ である。よって` },
            {
              k: "math",
              t: String.raw`\left(\theta_{1},\theta_{2}\right)=\left(\frac\pi6,\frac{11}{6}\pi\right),\ \left(\frac56\pi,\frac76\pi\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**後半**　$r_{1}=\left|z_{1}\right|$、$r_{2}=\left|z_{2}\right|$ とおくと $r_{1}+r_{2}=5$、$r_{1}r_{2}=6$ なので、$r_{1},r_{2}$ は $t^{2}-5t+6=0$ の解、つまり $2$ と $3$ である。$r_{1}\leqq r_{2}$ より`,
            },
            { k: "math", t: String.raw`r_{1}=2,\qquad r_{2}=3` },
            {
              k: "p",
              t: String.raw`である。$\theta_{1}=\arg z_{1}$、$\theta_{2}=\arg z_{2}$ とおいて $z_{1}=2\left(\cos\theta_{1}+i\sin\theta_{1}\right)$、$z_{2}=3\left(\cos\theta_{2}+i\sin\theta_{2}\right)$ と書くと`,
            },
            {
              k: "math",
              t: String.raw`z_{1}\left|z_{2}\right|-\left|z_{1}\right|z_{2}=3z_{1}-2z_{2}=6\left\{\left(\cos\theta_{1}-\cos\theta_{2}\right)+i\left(\sin\theta_{1}-\sin\theta_{2}\right)\right\}`,
            },
            { k: "p", t: String.raw`であり、右辺は $\left|z_{1}z_{2}\right|i=6i$ である。したがって` },
            { k: "math", t: String.raw`\cos\theta_{1}-\cos\theta_{2}=0,\qquad\sin\theta_{1}-\sin\theta_{2}=1` },
            {
              k: "p",
              t: String.raw`となり、$0\leqq\theta_{1}\leqq\theta_{2}<2\pi$ のもとで前半とまったく同じ連立になる。よって $\left(\theta_{1},\theta_{2}\right)=\left(\dfrac\pi6,\dfrac{11}{6}\pi\right),\left(\dfrac56\pi,\dfrac76\pi\right)$ である。`,
            },
            { k: "p", t: String.raw`それぞれ $z_{1},z_{2}$ に直すと` },
            {
              k: "math",
              t: String.raw`\left(z_{1},z_{2}\right)=\left(\sqrt3+i,\ \frac{3\sqrt3}{2}-\frac32i\right),\qquad\left(z_{1},z_{2}\right)=\left(-\sqrt3+i,\ -\frac{3\sqrt3}{2}-\frac32i\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\cos\theta_{1}=\cos\theta_{2}$ から $\theta_{2}=\theta_{1}$ の場合を落とさない。ここは $\sin$ の条件で消える。`,
            String.raw`$z_{1}\left|z_{2}\right|-\left|z_{1}\right|z_{2}$ は $3z_{1}-2z_{2}$ であって $z_{1}z_{2}$ ではない。大きさだけが係数になる。`,
          ],
          check: String.raw`$\theta_{1}$ を $72000$ 等分して全探索したところ、解は $\left(\dfrac\pi6,\dfrac{11}{6}\pi\right)$ と $\left(\dfrac56\pi,\dfrac76\pi\right)$ の2組だけで、対応する $z_{1},z_{2}$ は3つの条件をすべて満たした。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率・対数",
      topics: ["余事象", "指数不等式を対数で解く", "底の変換", "最小の整数を求める"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$k=3$、$n=2$ で当たりを1回以上引く確率は $\\tfrac59=0.555556$ で、$a=\\tfrac59$ と一致した",
          "$\\log_{5}2=0.43$ として $\\tfrac{2+2\\log_{5}2}{1-2\\log_{5}2}=20.428571$ となり、最小の整数は $21$",
          "$0.8^{20}=0.011529>0.01$、$0.8^{21}=0.009223<0.01$ で、$n=21$ が最小だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$k$ 本中 $1$ 本が当たりで残りがはずれの公平なくじを、引いて戻しながら $n$ 回引く。「$n$ 回中当たりを1回以上引く確率が $a$ 以上である」を $k,n,a$ の不等式で表し、$k=3$、$n=2$、$a=\dfrac59$ のとき成り立つことを示す`,
          answer: String.raw`$1-\left(\dfrac{k-1}{k}\right)^{n}\geqq a$`,
          approach: String.raw`「1回以上当たる」の余事象は「$n$ 回ともはずれ」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回の試行ではずれる確率は $\dfrac{k-1}{k}$ である。引いて戻すので各回は独立で、$n$ 回ともはずれる確率は $\left(\dfrac{k-1}{k}\right)^{n}$ である。よって当たりを1回以上引く確率は`,
            },
            { k: "math", t: String.raw`1-\left(\frac{k-1}{k}\right)^{n}` },
            { k: "p", t: String.raw`であり、求める条件は` },
            { k: "math", t: String.raw`1-\left(\frac{k-1}{k}\right)^{n}\geqq a` },
            { k: "p", t: String.raw`である。$k=3$、$n=2$、$a=\dfrac59$ のとき左辺は` },
            { k: "math", t: String.raw`1-\left(\frac23\right)^{2}=1-\frac49=\frac59` },
            { k: "p", t: String.raw`で、右辺の $\dfrac59$ と等しいから不等式が成り立つ。` },
          ],
          check: String.raw`$k=3$、$n=2$ の確率を計算すると $0.555556$ で、$\dfrac59=0.555556$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の不等式を $n$ について解く（$k>1$、$0\leqq a<1$）`,
          answer: String.raw`$n\geqq\dfrac{\log\left(1-a\right)}{\log\left(k-1\right)-\log k}$`,
          approach: String.raw`底 $\dfrac{k-1}{k}$ が $1$ より小さいので、対数をとると不等号の向きが変わる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の不等式を変形すると` },
            { k: "math", t: String.raw`\left(\frac{k-1}{k}\right)^{n}\leqq1-a` },
            {
              k: "p",
              t: String.raw`である。$k>1$ より $0<\dfrac{k-1}{k}<1$ で、$0\leqq a<1$ より $0<1-a\leqq1$ である。両辺とも正なので自然対数をとると`,
            },
            { k: "math", t: String.raw`n\log\frac{k-1}{k}\leqq\log\left(1-a\right)` },
            {
              k: "p",
              t: String.raw`である。$\log\dfrac{k-1}{k}<0$ なので、これで割ると不等号の向きが変わって`,
            },
            {
              k: "math",
              t: String.raw`n\geqq\frac{\log\left(1-a\right)}{\log\frac{k-1}{k}}=\frac{\log\left(1-a\right)}{\log\left(k-1\right)-\log k}`,
            },
            {
              k: "p",
              t: String.raw`である。右辺は（分子 $\leqq0$、分母 $<0$ なので）$0$ 以上である。`,
            },
          ],
          pitfalls: [
            String.raw`底が $1$ より小さいので、対数をとって割るところで不等号が反転する。`,
            String.raw`$a=0$ のときは右辺が $0$ になり、どんな $n$ でも成り立つ。`,
          ],
          check: String.raw`$k=5$、$a=0.99$ を入れると右辺は $20.43$ で、(3) の結果と合う。`,
        },
        {
          label: "(3)",
          task: String.raw`$k=5$、$a=0.99$ のとき、(1) の不等式を満たす $n$ の最小値を求める（$\log_{5}2$ の近似値として $0.43$ を使ってよい）`,
          answer: String.raw`$n=21$`,
          approach: String.raw`底を $5$ にそろえると $\log_{5}2$ だけで書ける。`,
          blocks: [
            { k: "p", t: String.raw`(2) の不等式に $k=5$、$a=0.99$ を入れると` },
            {
              k: "math",
              t: String.raw`n\geqq\frac{\log\frac1{100}}{\log\frac45}=\frac{\log100}{\log\frac54}`,
            },
            { k: "p", t: String.raw`である。底を $5$ にそろえると、$100=4\cdot5^{2}$ より` },
            {
              k: "math",
              t: String.raw`\log_{5}100=\log_{5}4+2=2\log_{5}2+2,\qquad\log_{5}\frac54=1-\log_{5}4=1-2\log_{5}2`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`n\geqq\frac{2\log_{5}2+2}{1-2\log_{5}2}`,
            },
            { k: "p", t: String.raw`である。$\log_{5}2=0.43$ とすると` },
            {
              k: "math",
              t: String.raw`\frac{2\cdot0.43+2}{1-2\cdot0.43}=\frac{2.86}{0.14}=\frac{143}{7}=20.42\ldots`,
            },
            { k: "p", t: String.raw`なので、$n$ の最小値は` },
            { k: "math", t: String.raw`n=21` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{143}{7}=20.4\ldots$ は整数ではないので、最小の整数は切り上げて $21$ である。`,
          ],
          check: String.raw`$0.8^{20}=0.011529>0.01$、$0.8^{21}=0.009223<0.01$ なので、確かに $n=21$ が最小だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分法・積分法",
      topics: ["第2次導関数と凹凸", "円の一部としてのグラフ", "立体の包含関係の証明", "回転体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$x^{2}+\\left\\{f\\left(x\\right)\\right\\}^{2}$ を $-1\\leqq x\\leqq1$ で $20$ 万点調べたところ、最大値はちょうど $1$ だった",
          "$D$ の体積を数値積分すると $0.6023711$ で、$\\tfrac{10\\pi}3-\\pi^{2}=0.6023711$ と一致した",
          "答えの体積は数値で $3.5864191$、$\\pi^{2}-2\\pi=3.5864191$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=1-\sqrt{1-\left(x+1\right)^{2}}$（$-1\leqq x<0$）、$f\left(x\right)=1-\sqrt{1-\left(x-1\right)^{2}}$（$0\leqq x\leqq1$）とする。曲線 $y=f\left(x\right)$（$-1\leqq x<0$）の凹凸を調べ、グラフの概形をかく`,
          answer: String.raw`$f''\left(x\right)=\left\{1-\left(x+1\right)^{2}\right\}^{-\frac32}>0$ なので下に凸。グラフは円 $\left(x+1\right)^{2}+\left(y-1\right)^{2}=1$ の左下の4分の1`,
          approach: String.raw`$u=x+1$ とおくと $y=1-\sqrt{1-u^{2}}$、つまり $u^{2}+\left(y-1\right)^{2}=1$ の下半分である。`,
          blocks: [
            { k: "p", t: String.raw`$-1\leqq x<0$ では $u=x+1$ とおくと $0\leqq u<1$ で` },
            { k: "math", t: String.raw`f\left(x\right)=1-\sqrt{1-u^{2}}` },
            { k: "p", t: String.raw`である。$\dfrac{du}{dx}=1$ なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{u}{\sqrt{1-u^{2}}}=\frac{x+1}{\sqrt{1-\left(x+1\right)^{2}}}\geqq0`,
            },
            { k: "p", t: String.raw`であり、さらに` },
            {
              k: "math",
              t: String.raw`f''\left(x\right)=\frac{1}{\sqrt{1-u^{2}}}+\frac{u^{2}}{\left(1-u^{2}\right)^{\frac32}}=\frac{\left(1-u^{2}\right)+u^{2}}{\left(1-u^{2}\right)^{\frac32}}=\frac{1}{\left\{1-\left(x+1\right)^{2}\right\}^{\frac32}}>0`,
            },
            {
              k: "p",
              t: String.raw`である。よって $-1<x<0$ で $f''\left(x\right)>0$ となり、曲線は**下に凸**である（変曲点はない）。`,
            },
            {
              k: "p",
              t: String.raw`また $y=1-\sqrt{1-\left(x+1\right)^{2}}$ は $\left(x+1\right)^{2}+\left(y-1\right)^{2}=1$ かつ $y\leqq1$ と同値なので、グラフは中心 $\left(-1,1\right)$・半径 $1$ の円の下半分、すなわち $\left(-1,0\right)$ から $\left(0,1\right)$ へ向かう4分の1の円弧である。$x=-1$ で $f=0$、$f'=0$（接線が $x$ 軸）、$x\to-0$ で $f\to1$、$f'\to+\infty$（接線が縦）になる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ。-1 以上 0 未満の部分は中心 (-1, 1)・半径 1 の円の下半分で、(-1, 0) から (0, 1) へ向かって下に凸に増加する。薄い線は 0 以上 1 以下の部分。",
                view: [-1.35, 1.35, -0.3, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: LEFT25, from: -1, to: -0.0004 },
                  { k: "curve", f: RIGHT25, from: 0.0004, to: 1, faint: true },
                  { k: "dot", at: [-1, 0], label: "(−1, 0)", place: "below-left" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x\to-0$ で $f'\to+\infty$ なので、$\left(0,1\right)$ のところでグラフは縦に立ち上がる。なだらかにつないではいけない。`,
          ],
          check: String.raw`$f''$ を数値微分で確かめると、$-1<x<0$ でつねに正だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$x^{2}+y^{2}+z^{2}\leqq1$ の表す球を $B$、$y^{2}+z^{2}\leqq\left\{f\left(x\right)\right\}^{2}$ かつ $-1\leqq x\leqq1$ の表す立体を $D$ とするとき、$D$ の点は $B$ の点でもあることを示す`,
          answer: String.raw`$-1\leqq x\leqq1$ で $x^{2}+\left\{f\left(x\right)\right\}^{2}\leqq1$ を示せばよい`,
          approach: String.raw`$t=1-\left|x\right|$ とおくと、どちらの区間でも $x^{2}+\left\{f\left(x\right)\right\}^{2}=3-2t-2\sqrt{1-t^{2}}$ という同じ式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(x,y,z\right)$ が $D$ の点なら $y^{2}+z^{2}\leqq\left\{f\left(x\right)\right\}^{2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}+z^{2}\leqq x^{2}+\left\{f\left(x\right)\right\}^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $-1\leqq x\leqq1$ でつねに $x^{2}+\left\{f\left(x\right)\right\}^{2}\leqq1$ であることを示せばよい。`,
            },
            {
              k: "p",
              t: String.raw`$0\leqq x\leqq1$ のとき $t=1-x$ とおくと $0\leqq t\leqq1$、$\left(x-1\right)^{2}=t^{2}$ で、$x=1-t$、$f\left(x\right)=1-\sqrt{1-t^{2}}$ である。$-1\leqq x<0$ のときは $t=x+1$ とおくと $0\leqq t<1$、$x=t-1$ なので $x^{2}=\left(1-t\right)^{2}$、$f\left(x\right)=1-\sqrt{1-t^{2}}$ となり、やはり同じ形になる。`,
            },
            { k: "p", t: String.raw`そこで $s=\sqrt{1-t^{2}}$（$0\leqq s\leqq1$、$t^{2}+s^{2}=1$）とおくと` },
            {
              k: "math",
              t: String.raw`x^{2}+\left\{f\left(x\right)\right\}^{2}=\left(1-t\right)^{2}+\left(1-s\right)^{2}=1-2t+t^{2}+1-2s+s^{2}=3-2\left(t+s\right)`,
            },
            { k: "p", t: String.raw`である（$t^{2}+s^{2}=1$ を使った）。ここで $t,s\geqq0$ より` },
            {
              k: "math",
              t: String.raw`\left(t+s\right)^{2}=t^{2}+s^{2}+2ts=1+2ts\geqq1`,
            },
            { k: "p", t: String.raw`なので $t+s\geqq1$ である。よって` },
            {
              k: "math",
              t: String.raw`x^{2}+\left\{f\left(x\right)\right\}^{2}=3-2\left(t+s\right)\leqq3-2=1`,
            },
            {
              k: "p",
              t: String.raw`となり、$D$ の点は $x^{2}+y^{2}+z^{2}\leqq1$ を満たす、つまり $B$ の点でもある。`,
            },
            {
              k: "note",
              t: String.raw`等号が成り立つのは $ts=0$、すなわち $t=0$（$x=\pm1$）か $s=0$（$t=1$、$x=0$）のときである。このとき $D$ の境界が球面に接する。`,
            },
          ],
          check: String.raw`$x^{2}+\left\{f\left(x\right)\right\}^{2}$ を $-1\leqq x\leqq1$ で $20$ 万点調べたところ、最大値はちょうど $1$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$B$ から $D$ の内部を取り除いてできる立体の体積を求める`,
          answer: String.raw`$\pi^{2}-2\pi$`,
          approach: String.raw`(2) より $D\subset B$ なので、求める体積は $\dfrac43\pi-\left(D\ \text{の体積}\right)$。$D$ は $x$ 軸のまわりの回転体。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ は、$x$ を固定するごとに半径 $f\left(x\right)$ の円板になる立体なので、$x$ 軸のまわりの回転体で`,
            },
            {
              k: "math",
              t: String.raw`\left(D\ \text{の体積}\right)=\int_{-1}^{1}\pi\left\{f\left(x\right)\right\}^{2}dx`,
            },
            {
              k: "p",
              t: String.raw`である。(2) で見たように、$x\in\left[-1,0\right)$ では $t=x+1$、$x\in\left[0,1\right]$ では $t=1-x$ とおくとどちらも $f=1-\sqrt{1-t^{2}}$ になる。つまり $f$ は偶関数で`,
            },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\left\{f\left(x\right)\right\}^{2}dx=2\int_{0}^{1}\left\{f\left(x\right)\right\}^{2}dx=2\int_{0}^{1}\left(1-\sqrt{1-t^{2}}\right)^{2}dt`,
            },
            { k: "p", t: String.raw`である（$t=1-x$ と置換した）。被積分関数を展開すると` },
            {
              k: "math",
              t: String.raw`\left(1-\sqrt{1-t^{2}}\right)^{2}=1-2\sqrt{1-t^{2}}+\left(1-t^{2}\right)=2-t^{2}-2\sqrt{1-t^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$\displaystyle\int_{0}^{1}\sqrt{1-t^{2}}\,dt$ は半径 $1$ の4分の1円の面積で $\dfrac\pi4$ だから`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left(1-\sqrt{1-t^{2}}\right)^{2}dt=2-\frac13-2\cdot\frac\pi4=\frac53-\frac\pi2`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\left(D\ \text{の体積}\right)=\pi\cdot2\left(\frac53-\frac\pi2\right)=\frac{10}{3}\pi-\pi^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。(2) より $D$ は $B$ に含まれるので、$B$ から $D$ の内部を取り除いた立体の体積は`,
            },
            {
              k: "math",
              t: String.raw`\frac43\pi-\left(\frac{10}{3}\pi-\pi^{2}\right)=\pi^{2}-2\pi`,
            },
            { k: "p", t: String.raw`である（$\pi^{2}-2\pi=3.586\ldots$）。` },
          ],
          pitfalls: [
            String.raw`$D$ は $x$ 軸のまわりの回転体なので、断面積は $\pi\left\{f\left(x\right)\right\}^{2}$ である。$f$ そのものではない。`,
            String.raw`$\left(1-\sqrt{1-t^{2}}\right)^{2}$ を展開するとき、$\left(\sqrt{1-t^{2}}\right)^{2}=1-t^{2}$ を忘れない。`,
          ],
          check: String.raw`$D$ の体積を数値積分すると $0.6023711$ で $\dfrac{10}{3}\pi-\pi^{2}$ と一致し、答えは $3.5864191=\pi^{2}-2\pi$ だった。`,
        },
      ],
    },
  ],
};
