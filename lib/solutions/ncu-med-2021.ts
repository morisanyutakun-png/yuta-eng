import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2021年度（令和3年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$\left|\log x\right|+\left|\log y\right|=1$ の表す図形の輪郭。 */
const E21 = Math.E;
const REGION21: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const n = 40;
  // (1/e, 1) → (1, e)：y = e x
  for (let i = 0; i <= n; i++) {
    const x = 1 / E21 + (1 - 1 / E21) * (i / n);
    pts.push([x, E21 * x]);
  }
  // (1, e) → (e, 1)：xy = e
  for (let i = 1; i <= n; i++) {
    const x = 1 + (E21 - 1) * (i / n);
    pts.push([x, E21 / x]);
  }
  // (e, 1) → (1, 1/e)：y = x/e
  for (let i = 1; i <= n; i++) {
    const x = E21 - (E21 - 1) * (i / n);
    pts.push([x, x / E21]);
  }
  // (1, 1/e) → (1/e, 1)：xy = 1/e
  for (let i = 1; i < n; i++) {
    const x = 1 - (1 - 1 / E21) * (i / n);
    pts.push([x, 1 / (E21 * x)]);
  }
  return pts;
})();

/** 第2問の図。$n=3$（$\mathrm{OA}=7$、$\mathrm{OB}=5$、$\mathrm{AB}=6$）の場合。 */
const A21: [number, number] = [7, 0];
const B21: [number, number] = [19 / 7, Math.sqrt(864) / 7];
/** $t=\dfrac{n+2}{2n}$ に $n=3$ を入れた $\dfrac56$。 */
const T21 = 5 / 6;
const P21: [number, number] = [
  A21[0] + T21 * (B21[0] - A21[0]),
  A21[1] + T21 * (B21[1] - A21[1]),
];

export const ncuMed2021: SolutionSet = {
  slug: "ncu-med",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "対数・積分法",
      topics: ["絶対値の場合分け", "双曲線と直線", "領域の図示", "面積の計算"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "4つの枝の上の点で $\\left|\\log x\\right|+\\left|\\log y\\right|$ を計算すると、どれもちょうど $1$ になった",
          "面積を2つに分けて数値積分すると $0.8073218+1.5430806=2.3504024$ で、$e-\\tfrac1e=2.3504024$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\log x,\log y$ を自然対数とするとき、方程式 $\left|\log x\right|+\left|\log y\right|=1$ の表す図形をかく`,
          answer: String.raw`4点 $\left(\dfrac1e,1\right),\left(1,e\right),\left(e,1\right),\left(1,\dfrac1e\right)$ を結ぶ、2本の直線と2本の双曲線の一部からなる閉じた曲線`,
          approach: String.raw`$x$ と $1$、$y$ と $1$ の大小で4つに場合分けすると、どれも見慣れた曲線になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x>0$、$y>0$ である。$\log x$ の符号は $x$ と $1$ の大小で、$\log y$ の符号は $y$ と $1$ の大小で決まるので、4つに分ける。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x\geqq1$ かつ $y\geqq1$ … $\log x+\log y=1$、つまり $\log\left(xy\right)=1$ より $xy=e$。$y\geqq1$ から $x\leqq e$ なので $1\leqq x\leqq e$。`,
                String.raw`$x\geqq1$ かつ $y\leqq1$ … $\log x-\log y=1$、つまり $\log\dfrac xy=1$ より $y=\dfrac xe$。$y\leqq1$ から $x\leqq e$ なので $1\leqq x\leqq e$。`,
                String.raw`$x\leqq1$ かつ $y\geqq1$ … $-\log x+\log y=1$ より $y=ex$。$y\geqq1$ から $x\geqq\dfrac1e$ なので $\dfrac1e\leqq x\leqq1$。`,
                String.raw`$x\leqq1$ かつ $y\leqq1$ … $-\log x-\log y=1$ より $xy=\dfrac1e$。$\dfrac1e\leqq x\leqq1$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。4つの枝は $\left(1,e\right)$、$\left(e,1\right)$、$\left(1,\dfrac1e\right)$、$\left(\dfrac1e,1\right)$ でつながり、閉じた曲線になる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "|log x| + |log y| = 1 の表す図形。右上は双曲線 xy = e、右下は直線 y = x/e、左上は直線 y = ex、左下は双曲線 xy = 1/e。4つの頂点は (1/e, 1)、(1, e)、(e, 1)、(1, 1/e)。塗った部分が |log x| + |log y| ≦ 1 の領域。",
                view: [-0.35, 3.4, -0.2, 3.1],
                items: [
                  { k: "fill", pts: REGION21 },
                  { k: "curve", f: (x: number): number => E21 * x, from: 1 / E21, to: 1 },
                  { k: "curve", f: (x: number): number => E21 / x, from: 1, to: E21 },
                  { k: "curve", f: (x: number): number => x / E21, from: 1, to: E21 },
                  { k: "curve", f: (x: number): number => 1 / (E21 * x), from: 1 / E21, to: 1 },
                  { k: "dot", at: [1, E21], label: "(1, e)", place: "above-right" },
                  { k: "dot", at: [E21, 1], label: "(e, 1)", place: "right" },
                  { k: "dot", at: [1, 1 / E21], label: "(1, 1/e)", place: "below-right" },
                  { k: "dot", at: [1 / E21, 1], label: "(1/e, 1)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$u=\log x$、$v=\log y$ とおくと $\left|u\right|+\left|v\right|=1$ は正方形（ひし形）だが、$x=e^{u}$、$y=e^{v}$ に戻すと辺がゆがんで、直線2本と双曲線2本になる。`,
          ],
          check: String.raw`4つの枝の上の点で $\left|\log x\right|+\left|\log y\right|$ を計算すると、どれもちょうど $1$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`不等式 $\left|\log x\right|+\left|\log y\right|\leqq1$ の表す領域の面積を求める`,
          answer: String.raw`$e-\dfrac1e$`,
          approach: String.raw`$x=1$ で左右に分け、それぞれ「上の曲線－下の曲線」を積分する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の図形の内部が求める領域である。$\dfrac1e\leqq x\leqq1$ では上が $y=ex$、下が $y=\dfrac1{ex}$、$1\leqq x\leqq e$ では上が $y=\dfrac ex$、下が $y=\dfrac xe$ である。`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac1e}^{1}\left(ex-\frac1{ex}\right)dx+\int_{1}^{e}\left(\frac ex-\frac xe\right)dx`,
            },
            { k: "p", t: String.raw`である。前半は` },
            {
              k: "math",
              t: String.raw`\left[\frac{ex^{2}}{2}-\frac{\log x}{e}\right]_{\frac1e}^{1}=\frac e2-\left(\frac{1}{2e}+\frac1e\right)=\frac e2-\frac{3}{2e}`,
            },
            { k: "p", t: String.raw`（$\log\dfrac1e=-1$ に注意）、後半は` },
            {
              k: "math",
              t: String.raw`\left[e\log x-\frac{x^{2}}{2e}\right]_{1}^{e}=\left(e-\frac e2\right)-\left(0-\frac1{2e}\right)=\frac e2+\frac1{2e}`,
            },
            { k: "p", t: String.raw`である。足すと` },
            { k: "math", t: String.raw`S=\frac e2-\frac{3}{2e}+\frac e2+\frac1{2e}=e-\frac1e` },
            { k: "p", t: String.raw`である（$2.3504\ldots$）。` },
            {
              k: "note",
              t: String.raw`$x=e^{u}$、$y=e^{v}$ と置き換えると、面積は $\displaystyle\iint_{\left|u\right|+\left|v\right|\leqq1}e^{u+v}du\,dv$ になり、$s=u+v$ で見ると $\displaystyle\int_{-1}^{1}e^{s}ds=e-\dfrac1e$ と一気に出る。答えがきれいなのはこのためである。`,
            },
          ],
          check: String.raw`2つに分けて数値積分すると $0.8073218+1.5430806=2.3504024$ で、$e-\dfrac1e=2.3504024$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "平面ベクトル・整数",
      topics: ["余弦定理と鋭角", "垂線の足", "三平方の定理", "平方数になる条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3,\\ldots,8$ で3つの角の $\\cos$ を計算するとどれも正で、最小は $\\cos\\angle\\mathrm{B}=\\tfrac{n-2}{2n-1}$",
          "$t=\\tfrac{n+2}{2n}$ と $\\left|\\overrightarrow{\\mathrm{OP}}\\right|^{2}=3\\left(n^{2}-1\\right)$ を $n=3,\\ldots,8$ で確認した",
          "$3\\left(n^{2}-1\\right)$ が平方数になる $n$ は $7,26,97,\\ldots$ で、$3$ 以上で最小は $7$（$\\left|\\overrightarrow{\\mathrm{OP}}\\right|=12$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$ とし、$3$ 以上の自然数 $n$ に対して $\left|\vec a\right|=2n+1$、$\left|\vec b\right|=2n-1$、$\left|\vec b-\vec a\right|=2n$ とする。三角形 $\mathrm{OAB}$ が鋭角三角形になることを示す`,
          answer: String.raw`最大辺 $\mathrm{OA}$ に向かい合う角について $\cos\angle\mathrm{B}=\dfrac{n-2}{2n-1}>0$`,
          approach: String.raw`最大の角が鋭角なら全部鋭角。最大の角は最大の辺に向かい合う角である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OA}=2n+1$、$\mathrm{OB}=2n-1$、$\mathrm{AB}=2n$ である。$n\geqq3$ より $\left(2n-1\right)+2n=4n-1>2n+1$（$n>1$ と同値）なので三角形はできる。`,
            },
            {
              k: "p",
              t: String.raw`3辺のうち最大は $\mathrm{OA}=2n+1$ で、向かい合う角は $\angle\mathrm{B}$（頂点 $\mathrm{B}$ の角）である。余弦定理より`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{B}=\frac{\mathrm{OB}^{2}+\mathrm{AB}^{2}-\mathrm{OA}^{2}}{2\cdot\mathrm{OB}\cdot\mathrm{AB}}=\frac{\left(2n-1\right)^{2}+\left(2n\right)^{2}-\left(2n+1\right)^{2}}{2\left(2n-1\right)\left(2n\right)}`,
            },
            { k: "p", t: String.raw`である。$\left(2n-1\right)^{2}-\left(2n+1\right)^{2}=-8n$ なので分子は $4n^{2}-8n=4n\left(n-2\right)$ で` },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{B}=\frac{4n\left(n-2\right)}{4n\left(2n-1\right)}=\frac{n-2}{2n-1}`,
            },
            {
              k: "p",
              t: String.raw`である。$n\geqq3$ より $n-2\geqq1>0$、$2n-1>0$ なので $\cos\angle\mathrm{B}>0$、つまり $\angle\mathrm{B}$ は鋭角である。`,
            },
            {
              k: "p",
              t: String.raw`三角形の3つの角のうち最大のものは最大の辺に向かい合う角だから、$\angle\mathrm{B}$ が最大である。それが鋭角なら他の2つはさらに小さく、やはり鋭角である。よって三角形 $\mathrm{OAB}$ は鋭角三角形である。`,
            },
          ],
          pitfalls: [
            String.raw`$n=2$ だと $\cos\angle\mathrm{B}=0$ で直角になる。$n\geqq3$ という条件が効いている。`,
          ],
          check: String.raw`$n=3,\ldots,8$ で3つの角の $\cos$ を計算すると、どれも正だった（最小が $\dfrac{n-2}{2n-1}$）。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{O}$ から直線 $\mathrm{AB}$ に下ろした垂線の足を $\mathrm{P}$ とし、$\overrightarrow{\mathrm{OP}}=\vec a+t\,\overrightarrow{\mathrm{AB}}$ とするとき、$t$ を $n$ で表す`,
          answer: String.raw`$t=\dfrac{n+2}{2n}$`,
          approach: String.raw`$\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{AB}}=0$。内積 $\vec a\cdot\vec b$ は3辺の長さから出る。`,
          blocks: [
            { k: "p", t: String.raw`$\left|\vec b-\vec a\right|^{2}=\left|\vec a\right|^{2}-2\vec a\cdot\vec b+\left|\vec b\right|^{2}$ より` },
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec b=\frac{\left(2n+1\right)^{2}+\left(2n-1\right)^{2}-\left(2n\right)^{2}}{2}=\frac{4n^{2}+2}{2}=2n^{2}+1`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{AB}}=\vec b-\vec a$ なので` },
            {
              k: "math",
              t: String.raw`\vec a\cdot\left(\vec b-\vec a\right)=2n^{2}+1-\left(2n+1\right)^{2}=-2n^{2}-4n=-2n\left(n+2\right)`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OP}}\perp\overrightarrow{\mathrm{AB}}$ より` },
            {
              k: "math",
              t: String.raw`\left\{\vec a+t\left(\vec b-\vec a\right)\right\}\cdot\left(\vec b-\vec a\right)=-2n\left(n+2\right)+t\cdot4n^{2}=0`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`t=\frac{2n\left(n+2\right)}{4n^{2}}=\frac{n+2}{2n}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t>0$ かつ $t<1$（$n+2<2n$ は $n>2$ と同値）なので、$\mathrm{P}$ は線分 $\mathrm{AB}$ の内部にある。(1) で鋭角三角形だと示したことと合う。`,
            },
          ],
          check: String.raw`$n=3,\ldots,8$ で $t$ を数値で確かめると $\dfrac{n+2}{2n}$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\left|\overrightarrow{\mathrm{OP}}\right|$ が整数となるような自然数 $n$ で最小のものを求める`,
          answer: String.raw`$n=7$（このとき $\left|\overrightarrow{\mathrm{OP}}\right|=12$）`,
          approach: String.raw`$\mathrm{AP}=t\cdot\mathrm{AB}=n+2$ なので、直角三角形 $\mathrm{OPA}$ に三平方の定理を使うだけでよい。`,
          blocks: [
            { k: "p", t: String.raw`(2) より` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}=t\cdot\mathrm{AB}=\frac{n+2}{2n}\cdot2n=n+2`,
            },
            {
              k: "p",
              t: String.raw`である。$\angle\mathrm{OPA}=90^{\circ}$ だから、直角三角形 $\mathrm{OPA}$ に三平方の定理を使って`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|^{2}=\mathrm{OA}^{2}-\mathrm{AP}^{2}=\left(2n+1\right)^{2}-\left(n+2\right)^{2}`,
            },
            { k: "p", t: String.raw`である。因数分解すると` },
            {
              k: "math",
              t: String.raw`=\left(2n+1+n+2\right)\left(2n+1-n-2\right)=3\left(n+1\right)\left(n-1\right)=3\left(n^{2}-1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\overrightarrow{\mathrm{OP}}\right|=\sqrt{3\left(n^{2}-1\right)}$ が整数になるのは $3\left(n^{2}-1\right)$ が平方数のときである。$n\geqq3$ で小さいほうから調べると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=3$ … $3\cdot8=24$（$4^{2}=16$、$5^{2}=25$ の間）`,
                String.raw`$n=4$ … $3\cdot15=45$（$6^{2}=36$、$7^{2}=49$ の間）`,
                String.raw`$n=5$ … $3\cdot24=72$（$8^{2}=64$、$9^{2}=81$ の間）`,
                String.raw`$n=6$ … $3\cdot35=105$（$10^{2}=100$、$11^{2}=121$ の間）`,
                String.raw`$n=7$ … $3\cdot48=144=12^{2}$ ✓`,
              ],
            },
            { k: "p", t: String.raw`である。よって最小の $n$ は` },
            { k: "math", t: String.raw`n=7\qquad\left(\left|\overrightarrow{\mathrm{OP}}\right|=12\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "n = 3 の場合（OA = 7、OB = 5、AB = 6）。O から直線 AB に下ろした垂線の足 P は線分 AB の内部にあり、AP = n + 2 = 5 になる。",
                view: [-0.7, 7.9, -0.9, 5.1],
                items: [
                  { k: "seg", a: [0, 0], b: A21 },
                  { k: "seg", a: [0, 0], b: B21 },
                  { k: "seg", a: A21, b: B21 },
                  { k: "seg", a: [0, 0], b: P21, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: A21, label: "A", place: "below-right" },
                  { k: "dot", at: B21, label: "B", place: "above-left" },
                  { k: "dot", at: P21, label: "P", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$3\left(n^{2}-1\right)=m^{2}$ は $n^{2}-3\left(\tfrac m3\right)^{2}=1$ という形で、解は $n=1,2,7,26,97,\ldots$ と続く。$3$ 以上では $7$ が最小である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\overrightarrow{\mathrm{OP}}\right|^{2}$ を $\left|\vec a+t\left(\vec b-\vec a\right)\right|^{2}$ から展開してもよいが、$\mathrm{AP}=n+2$ に気づけば三平方の定理だけで済む。`,
          ],
          check: String.raw`$3\left(n^{2}-1\right)$ が平方数になる $n$ を $200$ まで探すと $7,26,97$ で、$3$ 以上で最小は $7$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列・極限",
      topics: ["比の形の漸化式", "階乗の積を約分する", "部分分数分解", "無限級数の和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式から順に出した $a_{n}$ は $2,\\tfrac23,\\tfrac13,\\tfrac15,\\tfrac2{15}$ で、$\\tfrac4{n\\left(n+1\\right)}$ と一致した",
          "部分和は $n=5,20,39$ で $3.3333,3.8095,3.9000$ と $4$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`数列 $\left\{a_{n}\right\}$ が $\dfrac{a_{n+1}}{a_{n}}=\dfrac{n}{n+2}$、$a_{1}=2$ を満たすとき、$\displaystyle\sum_{n=1}^{\infty}a_{n}$ を求める`,
          answer: String.raw`$4$`,
          approach: String.raw`比を1から $n-1$ まで掛け合わせると、分子と分母が大きく約分できる。`,
          blocks: [
            { k: "p", t: String.raw`$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`a_{n}=a_{1}\cdot\frac{a_{2}}{a_{1}}\cdot\frac{a_{3}}{a_{2}}\cdots\frac{a_{n}}{a_{n-1}}=2\cdot\frac12\cdot\frac23\cdots\frac{n-1}{n+1}`,
            },
            { k: "p", t: String.raw`である。分子は $1\cdot2\cdots\left(n-1\right)=\left(n-1\right)!$、分母は $3\cdot4\cdots\left(n+1\right)=\dfrac{\left(n+1\right)!}{2}$ なので` },
            {
              k: "math",
              t: String.raw`a_{n}=2\cdot\frac{\left(n-1\right)!}{\frac{\left(n+1\right)!}{2}}=\frac{4\left(n-1\right)!}{\left(n+1\right)!}=\frac{4}{n\left(n+1\right)}`,
            },
            { k: "p", t: String.raw`である（$n=1$ でも $\dfrac4{1\cdot2}=2$ で合う）。部分分数に分けると` },
            {
              k: "math",
              t: String.raw`a_{n}=4\left(\frac1n-\frac1{n+1}\right)`,
            },
            { k: "p", t: String.raw`なので、第 $N$ 項までの和は途中が打ち消し合って` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{N}a_{n}=4\left(1-\frac1{N+1}\right)`,
            },
            { k: "p", t: String.raw`である。$N\to\infty$ として` },
            { k: "math", t: String.raw`\sum_{n=1}^{\infty}a_{n}=4` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac12\cdot\dfrac23\cdot\dfrac34\cdots$ のように書き並べると、分母が $3$ から始まることを見落としやすい。$\dfrac{a_{2}}{a_{1}}=\dfrac13$ である。`,
          ],
          check: String.raw`漸化式から順に計算した $a_{n}$ は $\dfrac4{n\left(n+1\right)}$ と一致し、部分和は $4$ に近づいた。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["状態を2つの数で表す", "手番が移る場合を見分ける", "後ろから順に確率を出す", "引き分けの確率"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3$ はカードの出る順（$4!=24$ 通り、$6!=720$ 通り）を全列挙して $P\\left(2\\right)=\\tfrac23$、$P\\left(3\\right)=\\tfrac{14}{15}$ を確かめた",
          "$n=4$ は40万回のモンテカルロで $P\\left(4\\right)=0.70399$、引き分け $0.05734$ となり、$\\tfrac{74}{105}=0.70476$、$\\tfrac2{35}=0.05714$ と合った",
          "状態 $\\left(d,s\\right)$ の漸化式でも分数のまま計算し、$\\tfrac{74}{105}$ と $\\tfrac2{35}$ を得た",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$1$ から $n$ までの番号が付いたカードが2枚ずつ、全部で $2n$ 枚箱に入っている。$\mathrm{A}$ から始めて交互に、箱から無作為に2枚取り出して机に置き、机の上に同じ番号の組があればそれをすべて自分のものにして続け、1組もなければ机に残して手番を渡す。箱が空になったとき枚数の多いほうが勝ち。$n=2$ のとき $\mathrm{B}$ が勝つ確率 $P\left(2\right)$ を求める`,
          answer: String.raw`$P\left(2\right)=\dfrac23$`,
          approach: String.raw`机に残るカードは番号がすべて違い、その相方は必ず箱の中にある。そこで状態を「箱に2枚ある番号の個数 $d$」と「箱に1枚・机に1枚の番号の個数 $s$」で表す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**状態の表し方**　同じ番号が2枚そろうと必ず取り去られるので、机の上のカードは番号がすべて違う。しかも机の上のカードの相方は必ず箱の中にある。そこで`,
            },
            {
              k: "steps",
              items: [
                String.raw`$d$ … 2枚とも箱にある番号の個数`,
                String.raw`$s$ … 1枚が箱、1枚が机の上にある番号の個数`,
              ],
            },
            {
              k: "p",
              t: String.raw`とおく。箱には $2d+s$ 枚、机には $s$ 枚あり、まだ取られていないカードは $2d+2s$ 枚である。はじめは $\left(d,s\right)=\left(n,0\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`箱の $2d+s$ 枚から2枚を選ぶ $ {}_{2d+s}\mathrm{C}_{2}$ 通りはすべて同様に確からしい。引いた2枚の種類で分けると`,
            },
            {
              k: "steps",
              items: [
                String.raw`**(ア)** 同じ $d$ 番号の2枚（$d$ 通り）… 1組そろうので2枚取り、状態は $\left(d-1,s\right)$。手番は続く。`,
                String.raw`**(イ)** 異なる2つの $d$ 番号から1枚ずつ（$2d\left(d-1\right)$ 通り）… そろわず2枚とも机に残る。状態は $\left(d-2,s+2\right)$。**手番が移る**。`,
                String.raw`**(ウ)** $d$ 番号から1枚と $s$ 番号から1枚（$2ds$ 通り）… $s$ のほうが机の相方とそろって2枚取り、$d$ のほうは机に残る。状態は $\left(d-1,s\right)$。手番は続く。`,
                String.raw`**(エ)** 異なる2つの $s$ 番号から1枚ずつ（$\dfrac{s\left(s-1\right)}{2}$ 通り）… 2組そろって4枚取る。状態は $\left(d,s-2\right)$。手番は続く。`,
              ],
            },
            {
              k: "p",
              t: String.raw`である（$d+2d\left(d-1\right)+2ds+\dfrac{s\left(s-1\right)}{2}= {}_{2d+s}\mathrm{C}_{2}$ になる）。**手番が移るのは (イ) だけ**である。また $s$ は $0$ から始まって $0,\pm2$ しか変わらないので、つねに偶数で、箱の枚数 $2d+s$ も偶数である。`,
            },
            {
              k: "p",
              t: String.raw`**よく使う状態**　次の3つでは、手番の人が残りを全部取る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left(1,0\right)$ … 箱は2枚で (ア) しかない。2枚取って終わり。`,
                String.raw`$\left(0,2\right)$ … 箱は2枚で (エ) しかない。4枚取って終わり。`,
                String.raw`$\left(1,2\right)$ … 箱は4枚。(ア) 1通りは $2+4=6$ 枚、(ウ) 4通りも $2+4=6$ 枚、(エ) 1通りは $4+2=6$ 枚。どの $ {}_{4}\mathrm{C}_{2}=6$ 通りでも全部（6枚）取る。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$n=2$ のとき**　はじめは $\left(2,0\right)$ で箱は4枚、$ {}_{4}\mathrm{C}_{2}=6$ 通り。`,
            },
            {
              k: "steps",
              items: [
                String.raw`(ア) $2$ 通り（$\dfrac13$）… $\mathrm{A}$ が2枚取って $\left(1,0\right)$、$\mathrm{A}$ 続行。さらに2枚取って $\mathrm{A}$ が4枚、$\mathrm{B}$ が0枚。`,
                String.raw`(イ) $4$ 通り（$\dfrac23$）… $\left(0,2\right)$ で $\mathrm{B}$ の手番。$\mathrm{B}$ が4枚取る。$\mathrm{A}$ が0枚、$\mathrm{B}$ が4枚。`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`P\left(2\right)=\frac23` },
            { k: "p", t: String.raw`である（引き分けは起こらない）。` },
          ],
          pitfalls: [
            String.raw`「そろったら手番が続く」ので、1回の手番で何度も引けることがある。手番が移るのは (イ) のときだけ。`,
          ],
          check: String.raw`カードの出る順 $4!=24$ 通りを全列挙すると、$\mathrm{B}$ の勝ちが $16$ 通りで $\dfrac{16}{24}=\dfrac23$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$n=3$ のとき、$\mathrm{B}$ が勝つ確率 $P\left(3\right)$ を求める`,
          answer: String.raw`$P\left(3\right)=\dfrac{14}{15}$`,
          approach: String.raw`(1) の状態の言葉で、$\left(3,0\right)$ から順に追う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $\left(2,0\right)$ から手番の人が取る枚数を押さえておく。(1) の計算から、手番の人は**確率 $\dfrac13$ で4枚すべて**、**確率 $\dfrac23$ で0枚**（相手が4枚）である。`,
            },
            {
              k: "p",
              t: String.raw`$n=3$ のはじめは $\left(3,0\right)$ で箱は6枚、$ {}_{6}\mathrm{C}_{2}=15$ 通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`(ア) $3$ 通り（$\dfrac15$）… $\mathrm{A}$ が2枚取って $\left(2,0\right)$、$\mathrm{A}$ 続行。残り4枚のうち $\mathrm{A}$ は確率 $\dfrac13$ で4枚、$\dfrac23$ で0枚。`,
                String.raw`(イ) $2\cdot3\cdot2=12$ 通り（$\dfrac45$）… $\left(1,2\right)$ で $\mathrm{B}$ の手番。上で見たとおり $\mathrm{B}$ が残り6枚を全部取る。`,
              ],
            },
            { k: "p", t: String.raw`である。$\mathrm{A}$ の最終的な枚数で整理すると` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{A}=6$（$\mathrm{B}=0$）… $\dfrac15\cdot\dfrac13=\dfrac1{15}$`,
                String.raw`$\mathrm{A}=2$（$\mathrm{B}=4$）… $\dfrac15\cdot\dfrac23=\dfrac2{15}$`,
                String.raw`$\mathrm{A}=0$（$\mathrm{B}=6$）… $\dfrac45=\dfrac{12}{15}$`,
              ],
            },
            { k: "p", t: String.raw`である。$\mathrm{B}$ が勝つのは下の2つなので` },
            { k: "math", t: String.raw`P\left(3\right)=\frac2{15}+\frac{12}{15}=\frac{14}{15}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(1,2\right)$ でどう引いても全部取れてしまうのが効いて、$\mathrm{B}$ の勝ちが $\dfrac{14}{15}$ と大きくなる。先手が有利とは限らない。`,
            },
          ],
          check: String.raw`カードの出る順 $6!=720$ 通りを全列挙すると、$\mathrm{B}$ の勝ちは $672$ 通りで $\dfrac{672}{720}=\dfrac{14}{15}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$n=4$ のとき、$\mathrm{B}$ が勝つ確率 $P\left(4\right)$ と引き分ける確率 $Q\left(4\right)$ を求める`,
          answer: String.raw`$P\left(4\right)=\dfrac{74}{105}$、$Q\left(4\right)=\dfrac2{35}$`,
          approach: String.raw`状態 $\left(2,2\right)$、$\left(0,4\right)$、$\left(3,0\right)$ での「手番の人が取る枚数」を先に出しておく。`,
          blocks: [
            {
              k: "p",
              t: String.raw`はじめは $\left(4,0\right)$ で、残り $8$ 枚である。必要な状態での「手番の人が取る枚数」を順に出す。`,
            },
            {
              k: "p",
              t: String.raw`**$\left(0,4\right)$**　箱は4枚で、どの2枚も異なる $s$ 番号だから (エ) しかない。4枚取って $\left(0,2\right)$ になり、さらに4枚。手番の人が**8枚すべて**取る。`,
            },
            {
              k: "p",
              t: String.raw`**$\left(3,0\right)$**　(2) で見たとおり、手番の人の取る枚数は $6$ 枚が $\dfrac1{15}$、$2$ 枚が $\dfrac2{15}$、$0$ 枚が $\dfrac{12}{15}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\left(2,2\right)$**　箱は $2\cdot2+2=6$ 枚で $ {}_{6}\mathrm{C}_{2}=15$ 通り、残りは8枚である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`(ア) $d=2$ 通り … 2枚取って $\left(1,2\right)$、手番続行で残り6枚も全部。計 $8$ 枚。`,
                String.raw`(イ) $2\cdot2\cdot1=4$ 通り … $\left(0,4\right)$ で相手の手番。相手が8枚すべて。手番の人は $0$ 枚。`,
                String.raw`(ウ) $2\cdot2\cdot2=8$ 通り … 2枚取って $\left(1,2\right)$、手番続行で残り6枚も全部。計 $8$ 枚。`,
                String.raw`(エ) $\dfrac{2\cdot1}{2}=1$ 通り … 4枚取って $\left(2,0\right)$、手番続行。そこからは $\dfrac13$ で4枚、$\dfrac23$ で0枚。計 $8$ 枚が $\dfrac13$、$4$ 枚が $\dfrac23$。`,
              ],
            },
            { k: "p", t: String.raw`である。まとめると、$\left(2,2\right)$ で手番の人が取る枚数は` },
            {
              k: "math",
              t: String.raw`8\ \text{枚}\colon\frac{2+8}{15}+\frac1{15}\cdot\frac13=\frac{31}{45},\qquad4\ \text{枚}\colon\frac1{15}\cdot\frac23=\frac2{45},\qquad0\ \text{枚}\colon\frac4{15}=\frac{12}{45}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\left(4,0\right)$**　箱は8枚で $ {}_{8}\mathrm{C}_{2}=28$ 通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`(ア) $4$ 通り（$\dfrac17$）… $\mathrm{A}$ が2枚取って $\left(3,0\right)$、$\mathrm{A}$ 続行。$\mathrm{A}$ の合計は $2+6=8$ が $\dfrac1{15}$、$2+2=4$ が $\dfrac2{15}$、$2+0=2$ が $\dfrac{12}{15}$。`,
                String.raw`(イ) $2\cdot4\cdot3=24$ 通り（$\dfrac67$）… $\left(2,2\right)$ で $\mathrm{B}$ の手番。$\mathrm{B}$ が $8,4,0$ 枚を $\dfrac{31}{45},\dfrac2{45},\dfrac{12}{45}$ でとるので、$\mathrm{A}$ は $0,4,8$ 枚。`,
              ],
            },
            { k: "p", t: String.raw`である。$\mathrm{A}$ の枚数ごとに確率をまとめると` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{A}=8$ … $\dfrac17\cdot\dfrac1{15}+\dfrac67\cdot\dfrac{12}{45}=\dfrac1{105}+\dfrac{24}{105}=\dfrac{25}{105}$`,
                String.raw`$\mathrm{A}=4$ … $\dfrac17\cdot\dfrac2{15}+\dfrac67\cdot\dfrac2{45}=\dfrac2{105}+\dfrac4{105}=\dfrac6{105}$`,
                String.raw`$\mathrm{A}=2$ … $\dfrac17\cdot\dfrac{12}{15}=\dfrac{12}{105}$`,
                String.raw`$\mathrm{A}=0$ … $\dfrac67\cdot\dfrac{31}{45}=\dfrac{62}{105}$`,
              ],
            },
            { k: "p", t: String.raw`である（合計 $\dfrac{25+6+12+62}{105}=1$）。$\mathrm{B}$ の枚数は $8-\mathrm{A}$ だから` },
            {
              k: "math",
              t: String.raw`P\left(4\right)=\frac{12}{105}+\frac{62}{105}=\frac{74}{105},\qquad Q\left(4\right)=\frac6{105}=\frac2{35}`,
            },
            { k: "p", t: String.raw`である（$\mathrm{A}$ が勝つ確率は $\dfrac{25}{105}=\dfrac5{21}$）。` },
          ],
          pitfalls: [
            String.raw`$n=4$ では全部で8枚なので、$4$ 対 $4$ の引き分けが起こりうる。$n=2,3$ では枚数の分かれ方から引き分けにならない。`,
            String.raw`(イ) で手番が移ったあとは、相手の取る枚数を出してから $8$ から引く。自分の取る枚数をそのまま使わない。`,
          ],
          check: String.raw`40万回のモンテカルロで $\mathrm{B}$ の勝ちが $0.70399$、引き分けが $0.05734$ となり、$\dfrac{74}{105}=0.70476$、$\dfrac2{35}=0.05714$ と合った。`,
        },
      ],
    },
  ],
};
