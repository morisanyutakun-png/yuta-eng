import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2019年度（平成31年度）一般入試 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 * 第4問は問題冊子に樹形図が付いているが、当サイトでは載せず、言葉と式だけで説明している。
 */

/** 第1問。$\mathrm{e}^{-t^{2}/2}$。 */
const G19 = (t: number): number => Math.exp(-(t * t) / 2);
const A19 = 0.6;
const B19 = 1.8;

/** 第2問。$a=4$、$b=3$ のときの $z_{1},\ldots,z_{6}$。$z_{n}=\sum_{k<n}v^{k}$、$v=\mathrm{e}^{-i\pi/3}$。 */
const Z19: [number, number][] = (() => {
  const out: [number, number][] = [];
  let sx = 0;
  let sy = 0;
  let qx = 1;
  let qy = 0;
  const c = Math.cos(-Math.PI / 3);
  const s = Math.sin(-Math.PI / 3);
  for (let k = 0; k < 6; k += 1) {
    sx += qx;
    sy += qy;
    out.push([sx, sy]);
    const nx = qx * c - qy * s;
    const ny = qx * s + qy * c;
    qx = nx;
    qy = ny;
  }
  return out;
})();

/** 第3問。領域 $A$ の上下の境界。 */
const UPA19 = (x: number): number => (x * x) / 4;
const LOA19 = (x: number): number => (x * x - 6) / 2;
const XA19 = 2 * Math.sqrt(3);

/** 第5問。断面図の円。 */
const CIR19 = (cx: number, r: number) => (t: number): [number, number] =>
  [cx + r * Math.cos(t), r * Math.sin(t)];

export const handaiRikei2019: SolutionSet = {
  slug: "handai-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・積分・極限",
      topics: ["微分と単調性", "定積分の不等式", "はさみうち", "指数関数の評価"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$f'\\left(x\\right)=-\\dfrac{2\\mathrm{e}^{-x^{2}/2}}{\\left(x^{2}+1\\right)^{2}}$ と数値微分の差は最大 $2.2\\times10^{-9}$ だった",
          "$0<a\\le b$ の無作為な $2000$ 組で (2) の不等式の違反は $0$ 件だった",
          "$\\dfrac1n\\log I_{n}$ は $n=1,2,5,20,100,400,2000,20000$ で $-1.0769,-1.0003,-0.8509,-0.6520,-0.5461,-0.5150,-0.5038,-0.5005$ となり $-\\tfrac12$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$b$ を実数とする。$f\left(x\right)=\displaystyle\int_{x}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt-\dfrac{x}{x^{2}+1}\mathrm{e}^{-\frac{x^{2}}{2}}$ が単調に減少することを示す`,
          answer: String.raw`$f'\left(x\right)=-\dfrac{2\mathrm{e}^{-\frac{x^{2}}{2}}}{\left(x^{2}+1\right)^{2}}<0$`,
          approach: String.raw`積の微分で $f'$ を作り、通分すると分子が定数 $2$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`微分積分学の基本定理より $\dfrac{d}{dx}\displaystyle\int_{x}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt=-\mathrm{e}^{-\frac{x^{2}}{2}}$ である。また`,
            },
            {
              k: "math",
              t: String.raw`\frac{d}{dx}\left(\frac{x}{x^{2}+1}\right)=\frac{\left(x^{2}+1\right)-x\cdot2x}{\left(x^{2}+1\right)^{2}}=\frac{1-x^{2}}{\left(x^{2}+1\right)^{2}}`,
            },
            { k: "p", t: String.raw`で、$\dfrac{d}{dx}\mathrm{e}^{-\frac{x^{2}}{2}}=-x\mathrm{e}^{-\frac{x^{2}}{2}}$ なので、積の微分より` },
            {
              k: "math",
              t: String.raw`\frac{d}{dx}\left(\frac{x}{x^{2}+1}\mathrm{e}^{-\frac{x^{2}}{2}}\right)=\mathrm{e}^{-\frac{x^{2}}{2}}\left\{\frac{1-x^{2}}{\left(x^{2}+1\right)^{2}}-\frac{x^{2}}{x^{2}+1}\right\}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=-\mathrm{e}^{-\frac{x^{2}}{2}}\left\{1+\frac{1-x^{2}}{\left(x^{2}+1\right)^{2}}-\frac{x^{2}}{x^{2}+1}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。中括弧の中を $\left(x^{2}+1\right)^{2}$ で通分すると、分子は`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\left(x^{2}+1\right)^{2}+\left(1-x^{2}\right)-x^{2}\left(x^{2}+1\right)\\ &=\left(x^{4}+2x^{2}+1\right)+\left(1-x^{2}\right)-\left(x^{4}+x^{2}\right)=2\end{aligned}`,
            },
            { k: "p", t: String.raw`となり、$x$ が消えて定数 $2$ になる。したがって` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=-\frac{2\mathrm{e}^{-\frac{x^{2}}{2}}}{\left(x^{2}+1\right)^{2}}<0`,
            },
            {
              k: "p",
              t: String.raw`がすべての実数 $x$ で成り立つ。よって $f$ は（$b$ の値によらず）単調に減少する。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`積分の下端が $x$ なので、基本定理を使うと符号が $-$ になる。$\displaystyle\int_{x}^{b}=-\int_{b}^{x}$ と書き直しておくと間違いにくい。`,
            String.raw`分子が定数 $2$ になるところまで計算しないと符号が確定しない。途中でやめない。`,
          ],
          check: String.raw`数値微分との差は最大 $2.2\times10^{-9}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a\le b$ をみたす正の実数 $a,b$ に対し $\dfrac{a}{a^{2}+1}\mathrm{e}^{-\frac{a^{2}}{2}}-\dfrac{b}{b^{2}+1}\mathrm{e}^{-\frac{b^{2}}{2}}\le\displaystyle\int_{a}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt\le\mathrm{e}^{-\frac{a^{2}}{2}}\left(b-a\right)$ を示す`,
          answer: String.raw`左は (1) の $f$ に $f\left(a\right)\ge f\left(b\right)$ を使う。右は $a\le t\le b$ で $\mathrm{e}^{-t^{2}/2}\le\mathrm{e}^{-a^{2}/2}$ を積分する`,
          approach: String.raw`左は (1) の単調減少そのもの。右は被積分関数の単調減少。`,
          blocks: [
            { k: "p", t: String.raw`**左側**。(1) の $f$（この $b$ を使う）で` },
            {
              k: "math",
              t: String.raw`\begin{aligned}f\left(a\right)&=\int_{a}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt-\frac{a}{a^{2}+1}\mathrm{e}^{-\frac{a^{2}}{2}}\\ f\left(b\right)&=0-\frac{b}{b^{2}+1}\mathrm{e}^{-\frac{b^{2}}{2}}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。$f$ は減少で $a\le b$ だから $f\left(a\right)\ge f\left(b\right)$、すなわち` },
            {
              k: "math",
              t: String.raw`\int_{a}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt-\frac{a}{a^{2}+1}\mathrm{e}^{-\frac{a^{2}}{2}}\ge-\frac{b}{b^{2}+1}\mathrm{e}^{-\frac{b^{2}}{2}}`,
            },
            { k: "p", t: String.raw`である。移項すると左側の不等式になる。` },
            {
              k: "p",
              t: String.raw`**右側**。$t>0$ では $\mathrm{e}^{-\frac{t^{2}}{2}}$ は減少するので、$a\le t\le b$ のとき`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{e}^{-\frac{t^{2}}{2}}\le\mathrm{e}^{-\frac{a^{2}}{2}}`,
            },
            { k: "p", t: String.raw`である。$a\le b$ なので、この不等式を $a$ から $b$ まで積分して` },
            {
              k: "math",
              t: String.raw`\int_{a}^{b}\mathrm{e}^{-\frac{t^{2}}{2}}dt\le\mathrm{e}^{-\frac{a^{2}}{2}}\left(b-a\right)`,
            },
            { k: "p", t: String.raw`を得る。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "右側の不等式のようす。網をかけた部分の面積が積分で、点線でかこんだ長方形の面積が e^(−a²/2)(b − a)。a > 0 では e^(−t²/2) が減っていくので、積分は長方形におさまる。",
                view: [-0.3, 3.3, -0.15, 1.25],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fillBetween", top: G19, bottom: () => 0, from: A19, to: B19 },
                  { k: "curve", f: G19, from: -0.3, to: 3.3 },
                  { k: "seg", a: [A19, G19(A19)], b: [B19, G19(A19)], dash: true },
                  { k: "seg", a: [B19, G19(A19)], b: [B19, 0], dash: true },
                  { k: "seg", a: [A19, G19(A19)], b: [A19, 0], dash: true },
                  { k: "dot", at: [A19, 0], label: "a", place: "below" },
                  { k: "dot", at: [B19, 0], label: "b", place: "below" },
                  { k: "text", at: [3.2, G19(3.2)], label: "y = e^(−t²/2)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`左側は「積分の下からの評価」で、$\mathrm{e}^{-t^{2}/2}$ の原始関数が初等関数で書けないため、(1) を経由しないと作れない。(1) と (2) は一続きの誘導。`,
            String.raw`右側で $a>0$（正の実数）が効いている。$a<0$ だと $\mathrm{e}^{-t^{2}/2}$ は増加する区間を含み、最大値が端にこない。`,
          ],
          check: String.raw`無作為な $2000$ 組で違反 $0$ 件だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$I_{n}=\displaystyle\int_{1}^{2}\mathrm{e}^{-\frac{nt^{2}}{2}}dt$ とするとき $\displaystyle\lim_{n\to\infty}\dfrac1n\log I_{n}$ を求める（$\displaystyle\lim_{n\to\infty}\dfrac1n\log\left(n+1\right)=0$ を用いてよい）`,
          answer: String.raw`$-\dfrac12$`,
          approach: String.raw`$s=\sqrt n\,t$ と置換して (2) を $a=\sqrt n$、$b=2\sqrt n$ に使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$s=\sqrt n\,t$ とおくと $\dfrac{nt^{2}}{2}=\dfrac{s^{2}}{2}$、$dt=\dfrac{ds}{\sqrt n}$ で、$t:1\to2$ のとき $s:\sqrt n\to2\sqrt n$ なので`,
            },
            {
              k: "math",
              t: String.raw`I_{n}=\frac{1}{\sqrt n}\int_{\sqrt n}^{2\sqrt n}\mathrm{e}^{-\frac{s^{2}}{2}}ds`,
            },
            { k: "p", t: String.raw`である。(2) を $a=\sqrt n$、$b=2\sqrt n$（ともに正で $a\le b$）に使うと` },
            {
              k: "math",
              t: String.raw`\frac{\sqrt n}{n+1}\mathrm{e}^{-\frac n2}-\frac{2\sqrt n}{4n+1}\mathrm{e}^{-2n}\le\int_{\sqrt n}^{2\sqrt n}\mathrm{e}^{-\frac{s^{2}}{2}}ds\le\mathrm{e}^{-\frac n2}\sqrt n`,
            },
            { k: "p", t: String.raw`である。$\sqrt n$ で割ると` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{e}^{-\frac n2}}{n+1}-\frac{2\mathrm{e}^{-2n}}{4n+1}\le I_{n}\le\mathrm{e}^{-\frac n2}\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**上から**。$\left(\ast\right)$ の右より $\log I_{n}\le-\dfrac n2$、よって`,
            },
            {
              k: "math",
              t: String.raw`\frac1n\log I_{n}\le-\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**下から**。$\left(\ast\right)$ の左を $\dfrac{\mathrm{e}^{-n/2}}{n+1}$ でくくると`,
            },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{e}^{-\frac n2}}{n+1}-\frac{2\mathrm{e}^{-2n}}{4n+1}\ge\frac{\mathrm{e}^{-\frac n2}}{n+1}\left(1-\frac{2\left(n+1\right)\mathrm{e}^{-\frac{3n}{2}}}{4n+1}\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{2\mathrm{e}^{-2n}}{4n+1}=\dfrac{\mathrm{e}^{-n/2}}{n+1}\cdot\dfrac{2\left(n+1\right)\mathrm{e}^{-3n/2}}{4n+1}$ による）。括弧の中は $n\to\infty$ で $1$ に収束するので、ある $N$ から先はつねに $\dfrac12$ 以上である。よって $n\ge N$ で`,
            },
            {
              k: "math",
              t: String.raw`I_{n}\ge\frac{\mathrm{e}^{-\frac n2}}{2\left(n+1\right)}`,
            },
            { k: "p", t: String.raw`であり、対数をとって $n$ で割ると` },
            {
              k: "math",
              t: String.raw`\frac1n\log I_{n}\ge-\frac12-\frac{\log2}{n}-\frac{\log\left(n+1\right)}{n}`,
            },
            {
              k: "p",
              t: String.raw`である。与えられた $\dfrac1n\log\left(n+1\right)\to0$ と $\dfrac{\log2}{n}\to0$ より、右辺は $-\dfrac12$ に収束する。`,
            },
            { k: "p", t: String.raw`はさみうちの原理より` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac1n\log I_{n}=-\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`答えが $-\dfrac12$ になるのは、$\mathrm{e}^{-nt^{2}/2}$ が $1\le t\le2$ のうち**左端 $t=1$ のごく近く**にだけ集中するからである。$I_{n}\doteqdot\dfrac{\mathrm{e}^{-n/2}}{n}$ くらいの大きさで、$\dfrac1n\log$ をとると $n$ の多項式ぶんは消え、$\mathrm{e}^{-n/2}$ の肩だけが残る。`,
            },
          ],
          pitfalls: [
            String.raw`(2) の左辺の2項のうち $\mathrm{e}^{-2n}$ の項は、$\mathrm{e}^{-n/2}$ に比べてはるかに小さい。ここを「だいたい無視できる」で済ませず、比が $0$ に行くことを書く。`,
            String.raw`$\dfrac1n\log I_{n}$ の収束はとても遅い（$n=100$ でも $-0.546$）。数値で $-\dfrac12$ を推測するのは難しい。`,
          ],
          check: String.raw`$n=20000$ で $-0.5004952$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面・確率",
      topics: ["複素数列の漸化式", "等比数列の和", "1 の n 乗根", "確率"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a=4,b=3$ で漸化式から $z_{1},\\ldots,z_{7}$ を計算すると、隣り合う 2 点の距離はすべて $1.000000$、$z_{7}=z_{1}$、$6$ 点はどれも $\\left(\\tfrac12,-\\tfrac{\\sqrt3}{2}\\right)$ から距離 $1.000000$ にあった",
          "$a=2,b=1$ で漸化式を $63$ 回まわすと $z_{63}=-1.0000000i$ だった",
          "$a,b$ を $1$ から $6$ まで全通り試すと、$z_{63}=0$ になるのは $\\left(a,b\\right)=\\left(1,4\\right),\\left(1,6\\right),\\left(2,3\\right),\\left(3,4\\right),\\left(3,6\\right),\\left(5,4\\right),\\left(5,6\\right)$ の $7$ 通りだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`自然数 $a,b$ に対し $w=\cos\dfrac{a\pi}{3+b}+i\sin\dfrac{a\pi}{3+b}$ とおき、$z_{1}=1$、$z_{2}=1-w$、$z_{n}=\left(1-w\right)z_{n-1}+wz_{n-2}$（$n\ge3$）で複素数 $z_{n}$ を定める。小問 (1)〜(3) に答える`,
          answer: String.raw`$z_{n}=1+\left(-w\right)+\cdots+\left(-w\right)^{n-1}$`,
          approach: String.raw`階差 $z_{n}-z_{n-1}$ が公比 $-w$ の等比数列になる。`,
          blocks: [
            { k: "p", t: String.raw`漸化式を移項すると` },
            {
              k: "math",
              t: String.raw`z_{n}-z_{n-1}=-w\left(z_{n-1}-z_{n-2}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。よって階差 $d_{n}=z_{n}-z_{n-1}$ は公比 $-w$ の等比数列で、$d_{2}=z_{2}-z_{1}=-w$ だから`,
            },
            {
              k: "math",
              t: String.raw`d_{n}=\left(-w\right)^{n-2}\cdot\left(-w\right)=\left(-w\right)^{n-1}`,
            },
            { k: "p", t: String.raw`である。$z_{1}=1=\left(-w\right)^{0}$ と合わせて` },
            {
              k: "math",
              t: String.raw`z_{n}=\sum_{k=0}^{n-1}\left(-w\right)^{k}\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。とくに $-w\ne1$ のとき` },
            {
              k: "math",
              t: String.raw`z_{n}=\frac{1-\left(-w\right)^{n}}{1+w}`,
            },
            {
              k: "p",
              t: String.raw`であり、$-w=1$（つまり $w=-1$）のときは $z_{n}=n$ である。以下、$\theta=\dfrac{a\pi}{3+b}$、$v=-w=\mathrm{e}^{i\left(\theta+\pi\right)}$ とおく。$\left|v\right|=1$ である。`,
            },
          ],
          pitfalls: [
            String.raw`特性方程式 $x^{2}=\left(1-w\right)x+w$ は $\left(x-1\right)\left(x+w\right)=0$ と因数分解でき、解は $1$ と $-w$。階差を使うほうが式の見通しがよい。`,
          ],
          check: String.raw`$a=4,b=3$ でも $a=2,b=1$ でも、漸化式を直接まわした値と $\left(\ast\right)$ の値が一致した。`,
        },
        {
          label: "(1)",
          task: String.raw`$a=4$、$b=3$ のとき、複素数平面上の点 $z_{1},\ldots,z_{7}$ をこの順に線分で結んでできる図形を図示する`,
          answer: String.raw`1辺の長さ $1$ の正六角形（中心 $\dfrac12-\dfrac{\sqrt3}{2}i$、$z_{7}=z_{1}=1$ で閉じる）`,
          approach: String.raw`$-w$ が $1$ の原始6乗根になることを見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a=4$、$b=3$ のとき $\theta=\dfrac{4\pi}{6}=\dfrac{2\pi}{3}$ なので`,
            },
            {
              k: "math",
              t: String.raw`v=-w=\mathrm{e}^{i\left(\frac{2\pi}{3}+\pi\right)}=\mathrm{e}^{i\frac{5\pi}{3}}=\mathrm{e}^{-i\frac{\pi}{3}}`,
            },
            {
              k: "p",
              t: String.raw`である。$v^{6}=\mathrm{e}^{-2\pi i}=1$ で、$v,v^{2},\ldots,v^{5}$ はどれも $1$ でないから、$v$ は $1$ の**原始6乗根**である。`,
            },
            {
              k: "p",
              t: String.raw`$\left(\ast\right)$ より $z_{n}-z_{n-1}=v^{n-1}$ なので、点を順に結んだときの各辺のベクトルは`,
            },
            {
              k: "math",
              t: String.raw`v^{0},v^{1},v^{2},v^{3},v^{4},v^{5}`,
            },
            {
              k: "p",
              t: String.raw`の6つである。どれも絶対値 $1$、偏角は $-\dfrac{\pi}{3}$ ずつ減っていく。つまり「長さ $1$ 進んでは $60^{\circ}$ ずつ右に曲がる」動きを6回くり返す。さらに`,
            },
            {
              k: "math",
              t: String.raw`z_{7}-z_{1}=v^{0}+v^{1}+\cdots+v^{5}=\frac{1-v^{6}}{1-v}=0`,
            },
            { k: "p", t: String.raw`なので $z_{7}=z_{1}$ で閉じる。したがってできる図形は**1辺の長さ $1$ の正六角形**である。` },
            { k: "p", t: String.raw`実際に計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}z_{1}&=1, & z_{2}&=\frac32-\frac{\sqrt3}{2}i, & z_{3}&=1-\sqrt3i,\\ z_{4}&=-\sqrt3i, & z_{5}&=-\frac12-\frac{\sqrt3}{2}i, & z_{6}&=0\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、$z_{7}=1=z_{1}$ である。6点の重心は $\dfrac12-\dfrac{\sqrt3}{2}i$ で、ここから各点までの距離はどれも $1$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "z₁ から z₇ をこの順に結んだ図形。1 辺の長さが 1 の正六角形で、z₇ は z₁ に戻る。z₆ はちょうど原点。",
                view: [-1.6, 2.6, -2.5, 0.8],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: Z19[0], b: Z19[1] },
                  { k: "seg", a: Z19[1], b: Z19[2] },
                  { k: "seg", a: Z19[2], b: Z19[3] },
                  { k: "seg", a: Z19[3], b: Z19[4] },
                  { k: "seg", a: Z19[4], b: Z19[5] },
                  { k: "seg", a: Z19[5], b: Z19[0] },
                  { k: "dot", at: Z19[0], label: "z₁ = z₇", place: "above-right" },
                  { k: "dot", at: Z19[1], label: "z₂", place: "right" },
                  { k: "dot", at: Z19[2], label: "z₃", place: "below-right" },
                  { k: "dot", at: Z19[3], label: "z₄", place: "below-left" },
                  { k: "dot", at: Z19[4], label: "z₅", place: "left" },
                  { k: "dot", at: Z19[5], label: "z₆ = 0", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\theta=\dfrac{4\pi}{6}$ をそのまま $w$ の偏角と見ると6乗根が見えにくい。$-1$ を掛けた $v=-w$ のほうが扱いやすい。`,
          ],
          check: String.raw`辺の長さはすべて $1.000000$、$z_{7}=z_{1}$、$6$ 点はどれも中心から距離 $1.000000$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a=2$、$b=1$ のとき $z_{63}$ を求める`,
          answer: String.raw`$-i$`,
          approach: String.raw`$v=-w=-i$ は $1$ の原始4乗根。$63=4\cdot15+3$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a=2$、$b=1$ のとき $\theta=\dfrac{2\pi}{4}=\dfrac{\pi}{2}$ なので $w=i$、$v=-w=-i$ である。$v^{4}=1$ で、$v,v^{2},v^{3}$ は $1$ でないから $v$ は $1$ の原始4乗根である。`,
            },
            { k: "p", t: String.raw`$\left(\ast\right)$ より` },
            {
              k: "math",
              t: String.raw`z_{63}=\sum_{k=0}^{62}v^{k}`,
            },
            {
              k: "p",
              t: String.raw`である。$v^{0}+v^{1}+v^{2}+v^{3}=1-i-1+i=0$ なので、$4$ つずつまとめると消える。$63=4\cdot15+3$ だから、残るのは最後の3項で`,
            },
            {
              k: "math",
              t: String.raw`z_{63}=v^{0}+v^{1}+v^{2}=1+\left(-i\right)+\left(-1\right)=-i`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`公式で確かめると、$v^{63}=v^{60}\cdot v^{3}=1\cdot i=i$ なので`,
            },
            {
              k: "math",
              t: String.raw`z_{63}=\frac{1-v^{63}}{1-v}=\frac{1-i}{1+i}=\frac{\left(1-i\right)^{2}}{2}=\frac{-2i}{2}=-i`,
            },
            { k: "p", t: String.raw`で一致する。` },
          ],
          pitfalls: [
            String.raw`$\left(\ast\right)$ の和は $k=0$ から $n-1$ まで、つまり $z_{63}$ は $63$ 項。$62$ 項と数え違えない。`,
          ],
          check: String.raw`漸化式を $63$ 回まわした値も $-1.0000000i$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`さいころを2回投げ、1回目の目を $a$、2回目の目を $b$ とする。$z_{63}=0$ である確率を求める`,
          answer: String.raw`$\dfrac{7}{36}$`,
          approach: String.raw`$z_{63}=0\iff v^{63}=1$ かつ $v\ne1$。$v=\mathrm{e}^{i\pi\left(\frac{a}{3+b}+1\right)}$ なので、$\dfrac{63a}{3+b}$ が奇数の整数になる条件に直る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$m=3+b$ とおく。$b$ は $1$ から $6$ なので $m\in\left\{4,5,6,7,8,9\right\}$、$a\in\left\{1,\ldots,6\right\}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$v=1$ のときは $z_{63}=63\ne0$ である。$v\ne1$ のときは`,
            },
            {
              k: "math",
              t: String.raw`z_{63}=\frac{1-v^{63}}{1-v}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`z_{63}=0\iff v^{63}=1\ \text{かつ}\ v\ne1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$v=\mathrm{e}^{i\pi\left(\frac am+1\right)}$ なので $v^{63}=\mathrm{e}^{i\cdot63\pi\left(\frac am+1\right)}$ であり`,
            },
            {
              k: "math",
              t: String.raw`v^{63}=1\iff63\left(\frac am+1\right)\ \text{が偶数の整数}`,
            },
            {
              k: "p",
              t: String.raw`である。$63$ は奇数なので $63\cdot1=63$ は奇数、したがって`,
            },
            {
              k: "math",
              t: String.raw`63\left(\frac am+1\right)\in2\mathbb{Z}\iff\frac{63a}{m}\ \text{が奇数の整数}`,
            },
            {
              k: "p",
              t: String.raw`である。また $v=1\iff\dfrac am+1$ が偶数の整数 $\iff\dfrac am$ が奇数の整数であり、$a\le6<m+m$ かつ $m\ge4$ から $\dfrac am\le\dfrac64<2$ なので、これは $\dfrac am=1$、つまり $a=m$ のときだけである。`,
            },
            { k: "p", t: String.raw`以上より、求める条件は` },
            {
              k: "math",
              t: String.raw`\frac{63a}{m}\ \text{が奇数の整数}\quad\text{かつ}\quad a\ne m`,
            },
            { k: "p", t: String.raw`である。$63=3^{2}\cdot7$ に注意して $m$ ごとに調べる。` },
            {
              k: "steps",
              items: [
                String.raw`$m=4$（$b=1$）：$\dfrac{63a}{4}$ が整数 $\iff4\mid a$ より $a=4$。このとき $\dfrac{63\cdot4}{4}=63$ は奇数だが $a=m$ なので不適。`,
                String.raw`$m=5$（$b=2$）：$5\mid a$ より $a=5$。$\dfrac{63\cdot5}{5}=63$ は奇数だが $a=m$ なので不適。`,
                String.raw`$m=6$（$b=3$）：$\dfrac{63a}{6}=\dfrac{21a}{2}$ が整数 $\iff a$ が偶数。$a=2$ なら $21$（奇数）で適、$a=4$ なら $42$（偶数）で不適、$a=6$ は $63$ だが $a=m$ で不適。よって $a=2$ のみ。`,
                String.raw`$m=7$（$b=4$）：$\dfrac{63a}{7}=9a$ はつねに整数で、奇数 $\iff a$ が奇数。$a=1,3,5$ の3通り（$a=m$ は起こらない）。`,
                String.raw`$m=8$（$b=5$）：$8\mid63a\iff8\mid a$ だが $a\le6$ なのでなし。`,
                String.raw`$m=9$（$b=6$）：$\dfrac{63a}{9}=7a$ はつねに整数で、奇数 $\iff a$ が奇数。$a=1,3,5$ の3通り。`,
              ],
            },
            { k: "p", t: String.raw`当てはまる $\left(a,b\right)$ は` },
            {
              k: "math",
              t: String.raw`\left(2,3\right),\left(1,4\right),\left(3,4\right),\left(5,4\right),\left(1,6\right),\left(3,6\right),\left(5,6\right)`,
            },
            { k: "p", t: String.raw`の7通りである。全部で $6\times6=36$ 通りなので、求める確率は` },
            {
              k: "math",
              t: String.raw`\frac{7}{36}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$m=4,5$ では「$\dfrac{63a}{m}$ が奇数の整数」はみたすのに $a=m$ で落ちる、という引っかけになっている。$v=1$ のときは等比数列の和の公式が使えず $z_{63}=63$ なので、必ず別扱いが要る。`,
            },
          ],
          pitfalls: [
            String.raw`$v=1$ の場合を分けないと、$\left(a,b\right)=\left(4,1\right),\left(5,2\right),\left(6,3\right)$ を数え込んで $\dfrac{10}{36}$ になってしまう。`,
            String.raw`$v^{63}=1$ の条件は「偏角の $63$ 倍が $2\pi$ の整数倍」。$\pi$ の整数倍で止めると符号 $-1$ の場合を拾ってしまう。`,
          ],
          check: String.raw`$36$ 通りを全部まわして $z_{63}=0$ になったのは $7$ 通りだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式・積分",
      topics: ["2次方程式の実数解条件", "領域の図示", "回転体の体積", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$s^{2}+t^{2}\\le6$ をみたす $\\left(s,t\\right)$ を $20$ 万組とって $\\left(s+t,st\\right)$ を求めると、すべて $\\tfrac{x^{2}-6}{2}\\le y\\le\\tfrac{x^{2}}{4}$ に入った（違反 $0$ 件）",
          "逆に $\\tfrac{x^{2}-6}{2}\\le y\\le\\tfrac{x^{2}}{4}$ の点を $20$ 万個とって $u^{2}-xu+y=0$ を解くと、どれも実数解の組で $s^{2}+t^{2}\\le6$ をみたした（違反 $0$ 件）",
          "断面積分で体積は $92.0091240$、$\\tfrac{2\\pi}{5}\\left(56+24\\sqrt6-24\\sqrt3\\right)=92.0091240$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数 $s,t$ が $s^{2}+t^{2}\le6$ をみたしながら変わるとき、$xy$ 平面上で点 $\left(s+t,st\right)$ が動く領域を $A$ とする。$\left(2,\sqrt2\right)$ が $A$ の点かどうか判定する`,
          answer: String.raw`$A$ の点ではない`,
          approach: String.raw`$x=s+t$、$y=st$ なら $s,t$ は $u^{2}-xu+y=0$ の2解。実数解をもつ条件 $x^{2}-4y\ge0$ を見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=s+t$、$y=st$ のとき、$s,t$ は $u$ の2次方程式`,
            },
            {
              k: "math",
              t: String.raw`u^{2}-xu+y=0`,
            },
            {
              k: "p",
              t: String.raw`の2解である。$s,t$ が実数であるためには判別式が $0$ 以上、つまり`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-4y\ge0`,
            },
            { k: "p", t: String.raw`が必要である。$\left(x,y\right)=\left(2,\sqrt2\right)$ を入れると` },
            {
              k: "math",
              t: String.raw`x^{2}-4y=4-4\sqrt2=4\left(1-\sqrt2\right)<0`,
            },
            {
              k: "p",
              t: String.raw`である（$\sqrt2>1$）。よって $s+t=2$、$st=\sqrt2$ をみたす**実数** $s,t$ は存在しない。したがって $\left(2,\sqrt2\right)$ は $A$ の点ではない。`,
            },
          ],
          pitfalls: [
            String.raw`$s^{2}+t^{2}=x^{2}-2y=4-2\sqrt2\doteqdot1.17\le6$ はみたしている。条件を1つだけ見ると「$A$ の点」と誤答する。実数であることの条件が先に効く。`,
          ],
          check: String.raw`$x^{2}-4y=-1.657<0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$A$ を図示する`,
          answer: String.raw`$\dfrac{x^{2}-6}{2}\le y\le\dfrac{x^{2}}{4}$（したがって $-2\sqrt3\le x\le2\sqrt3$）。2つの放物線にはさまれた部分`,
          approach: String.raw`実数条件 $x^{2}-4y\ge0$ と $s^{2}+t^{2}=x^{2}-2y\le6$ を $y$ について解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(x,y\right)$ が $A$ の点である必要十分条件は、$u^{2}-xu+y=0$ が実数解 $s,t$（重解も可）をもち、かつ $s^{2}+t^{2}\le6$ となることである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`実数解をもつ：$x^{2}-4y\ge0$、すなわち $y\le\dfrac{x^{2}}{4}$`,
                String.raw`$s^{2}+t^{2}=\left(s+t\right)^{2}-2st=x^{2}-2y\le6$、すなわち $y\ge\dfrac{x^{2}-6}{2}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`逆に、この2つをみたす $\left(x,y\right)$ に対しては $u^{2}-xu+y=0$ の2解 $s,t$ が実数で、$s+t=x$、$st=y$、$s^{2}+t^{2}=x^{2}-2y\le6$ となる。よって`,
            },
            {
              k: "math",
              t: String.raw`A=\left\{\left(x,y\right)\ \middle|\ \frac{x^{2}-6}{2}\le y\le\frac{x^{2}}{4}\right\}`,
            },
            { k: "p", t: String.raw`である。中身が空でない条件は` },
            {
              k: "math",
              t: String.raw`\frac{x^{2}-6}{2}\le\frac{x^{2}}{4}\iff2x^{2}-12\le x^{2}\iff x^{2}\le12`,
            },
            {
              k: "p",
              t: String.raw`すなわち $-2\sqrt3\le x\le2\sqrt3$ である。両端 $x=\pm2\sqrt3$ では上下が一致して $y=3$ の1点になる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網をかけた部分が A（境界を含む）。上の境界は放物線 y = x²/4、下の境界は放物線 y = (x²−6)/2 で、2 つは (±2√3, 3) で接するように出会う。(2, √2) は上の放物線より上にあるので A の外。",
                view: [-4.4, 4.4, -3.7, 3.9],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: UPA19, bottom: LOA19, from: -XA19, to: XA19 },
                  { k: "curve", f: UPA19, from: -4.0, to: 4.0 },
                  { k: "curve", f: LOA19, from: -3.9, to: 3.9 },
                  { k: "dot", at: [XA19, 3], label: "(2√3, 3)", place: "right" },
                  { k: "dot", at: [-XA19, 3], label: "(−2√3, 3)", place: "left" },
                  { k: "dot", at: [2, Math.SQRT2], label: "(2, √2)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「$s,t$ が実数」を落とすと下の放物線だけの条件になり、領域が上に広がりすぎる。(1) はそこを確かめさせる小問。`,
            String.raw`逆の確認（条件をみたす $\left(x,y\right)$ が実際に作れること）を書いておく。必要条件だけでは図示の根拠にならない。`,
          ],
          check: String.raw`$20$ 万組ずつ両向きに調べて、違反はどちらも $0$ 件だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$A$ を $x$ 軸のまわりに1回転してできる回転体の体積を求める`,
          answer: String.raw`$\dfrac{2\pi}{5}\left(56+24\sqrt6-24\sqrt3\right)$（$\doteqdot92.009$）`,
          approach: String.raw`$x$ を固定した断面が円板か円環かで3つに分ける。境目は $x^{2}=4$ と $x^{2}=6$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$U\left(x\right)=\dfrac{x^{2}}{4}$、$L\left(x\right)=\dfrac{x^{2}-6}{2}$ とおく。$A$ は $y$ 軸について対称ではないが $x\mapsto-x$ で不変なので、$x\ge0$ の部分を考えて2倍すればよい。`,
            },
            {
              k: "p",
              t: String.raw`$x$ を固定すると、$A$ の切り口は線分 $L\left(x\right)\le y\le U\left(x\right)$ である。これを $x$ 軸のまわりに回すと`,
            },
            {
              k: "steps",
              items: [
                String.raw`$L\left(x\right)\le0\le U\left(x\right)$ のとき（$x^{2}\le6$）：線分が $x$ 軸をまたぐので**円板**。半径は $\max\left(U,\left|L\right|\right)$。`,
                String.raw`$0\le L\left(x\right)$ のとき（$x^{2}\ge6$）：**円環**。外半径 $U$、内半径 $L$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$U\left(x\right)\ge0$ はつねに正しい。$\left|L\left(x\right)\right|=\dfrac{6-x^{2}}{2}$ と $U\left(x\right)=\dfrac{x^{2}}{4}$ の大小は`,
            },
            {
              k: "math",
              t: String.raw`\frac{6-x^{2}}{2}\ge\frac{x^{2}}{4}\iff12-2x^{2}\ge x^{2}\iff x^{2}\le4`,
            },
            { k: "p", t: String.raw`で決まる。まとめると、$0\le x\le2\sqrt3$ では` },
            {
              k: "steps",
              items: [
                String.raw`$0\le x\le2$：円板、半径 $\dfrac{6-x^{2}}{2}$`,
                String.raw`$2\le x\le\sqrt6$：円板、半径 $\dfrac{x^{2}}{4}$`,
                String.raw`$\sqrt6\le x\le2\sqrt3$：円環、外半径 $\dfrac{x^{2}}{4}$、内半径 $\dfrac{x^{2}-6}{2}$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{V}{2\pi}=\int_{0}^{2}\frac{\left(6-x^{2}\right)^{2}}{4}dx+\int_{2}^{\sqrt6}\frac{x^{4}}{16}dx+\int_{\sqrt6}^{2\sqrt3}\left\{\frac{x^{4}}{16}-\frac{\left(x^{2}-6\right)^{2}}{4}\right\}dx`,
            },
            { k: "p", t: String.raw`である。1つめは` },
            {
              k: "math",
              t: String.raw`\frac14\int_{0}^{2}\left(x^{4}-12x^{2}+36\right)dx=\frac14\left[\frac{x^{5}}{5}-4x^{3}+36x\right]_{0}^{2}=\frac14\cdot\frac{232}{5}=\frac{58}{5}`,
            },
            { k: "p", t: String.raw`である。2つめは` },
            {
              k: "math",
              t: String.raw`\frac{1}{16}\left[\frac{x^{5}}{5}\right]_{2}^{\sqrt6}=\frac{36\sqrt6-32}{80}=\frac{9\sqrt6}{20}-\frac25`,
            },
            { k: "p", t: String.raw`である。3つめは、被積分関数を整理すると` },
            {
              k: "math",
              t: String.raw`\frac{x^{4}}{16}-\frac{x^{4}-12x^{2}+36}{4}=-\frac{3x^{4}}{16}+3x^{2}-9`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\left[-\frac{3x^{5}}{80}+x^{3}-9x\right]_{\sqrt6}^{2\sqrt3}=\left(-\frac{24\sqrt3}{5}\right)-\left(-\frac{87\sqrt6}{20}\right)=-\frac{24\sqrt3}{5}+\frac{87\sqrt6}{20}`,
            },
            { k: "p", t: String.raw`である。3つを足すと` },
            {
              k: "math",
              t: String.raw`\frac{V}{2\pi}=\frac{56}{5}+\frac{96\sqrt6}{20}-\frac{24\sqrt3}{5}=\frac{56+24\sqrt6-24\sqrt3}{5}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`V=\frac{2\pi}{5}\left(56+24\sqrt6-24\sqrt3\right)=\frac{8\pi}{5}\left(14+6\sqrt6-6\sqrt3\right)`,
            },
            { k: "p", t: String.raw`である（$\doteqdot92.009$）。` },
          ],
          pitfalls: [
            String.raw`$x$ 軸をまたぐ断面では、回転させると下側も上側もつぶれて**円板**になる。「外 $U$・内 $L$ の円環」と機械的に書くと $L<0$ の区間で誤る。`,
            String.raw`$x^{2}=4$ の境目を落とすと、$0\le x\le\sqrt6$ をひとまとめにしてしまい、半径の取り違えが起きる。`,
            String.raw`$\sqrt6$ と $2\sqrt3=\sqrt{12}$ の大小（$\sqrt6<\sqrt{12}$）を確かめてから区間を並べる。`,
          ],
          check: String.raw`断面積分で $92.0091240$、式の値も $92.0091240$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数・数列",
      topics: ["ユークリッドの互除法", "数学的帰納法", "2進法と位置", "既約分数"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "樹形図を $12$ 段まで実際に作ると、現れた分数はすべて既約で、互いに相異なっていた",
          "$\\tfrac{19}{44}$ を樹形図の中から探すと、$11$ 段目の左から $29$ 番目にあった（親をたどって得た $11$ 段目・$29$ 番目と一致）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac11$ から始めて、分数 $\dfrac pq$ の左下に $\dfrac{p}{p+q}$、右下に $\dfrac{p+q}{q}$ を配置するという規則でできる樹形図を考える（問題冊子には図が付いているが、ここでは言葉だけで述べる）。小問 (1)〜(4) に答える`,
          answer: String.raw`$1$ 段目は $\dfrac11$、$2$ 段目は $\dfrac12,\dfrac21$、$3$ 段目は $\dfrac13,\dfrac32,\dfrac23,\dfrac31$`,
          approach: String.raw`「左下へ進む」を $\mathrm{L}$、「右下へ進む」を $\mathrm{R}$ と呼ぶことにする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`規則を記号で書く。分数 $\dfrac pq$ から`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{L}:\ \frac pq\mapsto\frac{p}{p+q},\qquad\mathrm{R}:\ \frac pq\mapsto\frac{p+q}{q}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{L}$ では分母だけが増え、$\mathrm{R}$ では分子だけが増える。$n$ 段目には $2^{n-1}$ 個の分数が並ぶ。`,
            },
            {
              k: "p",
              t: String.raw`逆向きも用意しておく。$\dfrac pq$ が $1$ 段目以外にあるとき、その真上（親）は`,
            },
            {
              k: "math",
              t: String.raw`p<q\ \text{なら}\ \frac{p}{q-p},\qquad p>q\ \text{なら}\ \frac{p-q}{q}`,
            },
            {
              k: "p",
              t: String.raw`である。実際、$\dfrac{p}{q-p}$ に $\mathrm{L}$ を施すと $\dfrac{p}{p+\left(q-p\right)}=\dfrac pq$、$\dfrac{p-q}{q}$ に $\mathrm{R}$ を施すと $\dfrac{\left(p-q\right)+q}{q}=\dfrac pq$ になる。これは**ユークリッドの互除法の1ステップ**（大きいほうから小さいほうを引く）そのものである。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{L}$ で作られた分数は $p<q$、$\mathrm{R}$ で作られた分数は $p>q$ になる（$p,q$ は正）。だから「分子と分母のどちらが大きいか」を見れば、その分数が左下・右下のどちらから来たかが決まる。これが (3) と (4) の鍵。`,
          ],
          check: String.raw`$12$ 段まで作って、各段の個数が $2^{n-1}$ になることを確かめた。`,
        },
        {
          label: "(1)",
          task: String.raw`この樹形図に現れる分数はすべて既約分数であることを示す（整数 $\dfrac n1$ は既約とみなす）`,
          answer: String.raw`$\gcd\left(p,p+q\right)=\gcd\left(p,q\right)$、$\gcd\left(p+q,q\right)=\gcd\left(p,q\right)$ なので、段数についての帰納法で示せる`,
          approach: String.raw`互除法の基本性質を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`段数 $n$ についての帰納法で「$n$ 段目のどの分数 $\dfrac pq$ も $p$ と $q$ が互いに素」を示す。`,
            },
            {
              k: "p",
              t: String.raw`$n=1$ のとき、$\dfrac11$ で $1$ と $1$ は互いに素である。`,
            },
            {
              k: "p",
              t: String.raw`$n$ 段目の $\dfrac pq$ で $p,q$ が互いに素だとする。$d$ を $p$ と $p+q$ の公約数とすると、$d$ は $\left(p+q\right)-p=q$ も割り切るので $d$ は $p$ と $q$ の公約数、よって $d=1$ である。したがって $\dfrac{p}{p+q}$ は既約である。同様に、$p+q$ と $q$ の公約数は $\left(p+q\right)-q=p$ も割り切るので $1$ だけで、$\dfrac{p+q}{q}$ も既約である。`,
            },
            {
              k: "p",
              t: String.raw`よって $n+1$ 段目の分数もすべて既約である。帰納法よりすべての段で成り立つ。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$p,q$ が正であることは規則から保たれる（和は正）。負や $0$ が出ないことを一言ことわっておくと丁寧。`,
          ],
          check: String.raw`$12$ 段ぶんの $4095$ 個の分数はすべて既約だった。`,
        },
        {
          label: "(2)",
          task: String.raw`すべての正の有理数がこの樹形図に現れることを示す`,
          answer: String.raw`既約分数 $\dfrac pq$ から親をたどると $p+q$ が真に減るので、有限回で $\dfrac11$ に着く。その道を逆にたどればよい`,
          approach: String.raw`無限降下法。親をとる操作で $p+q$ が減ることを使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正の有理数は既約分数 $\dfrac pq$（$p,q$ は互いに素な正の整数）としてただ一通りに書ける。この $\dfrac pq$ が樹形図に現れることを、$p+q$ についての帰納法で示す。`,
            },
            {
              k: "p",
              t: String.raw`$p+q=2$ のときは $p=q=1$ で、$\dfrac11$ は $1$ 段目にある。`,
            },
            {
              k: "p",
              t: String.raw`$p+q\ge3$ とする。$p,q$ は互いに素なので $p=q$ なら $p=q=1$ となり $p+q=2$、よって $p\ne q$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$p<q$ のとき。$\dfrac{p}{q-p}$ を考える。$q-p$ は正の整数で、$\gcd\left(p,q-p\right)=\gcd\left(p,q\right)=1$ だから既約。和は $p+\left(q-p\right)=q<p+q$ なので、帰納法の仮定より樹形図に現れる。その左下が $\dfrac{p}{p+\left(q-p\right)}=\dfrac pq$ である。`,
                String.raw`$p>q$ のとき。同様に $\dfrac{p-q}{q}$ は既約で和は $p<p+q$、その右下が $\dfrac pq$ である。`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらの場合も $\dfrac pq$ は樹形図に現れる。帰納法よりすべての正の有理数が現れる。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`「正の有理数」は既約表示で考える。$\dfrac24$ のような約分できる形のまま降下させると、(1) で示した「現れるのは既約だけ」と噛み合わなくなる。`,
          ],
          check: String.raw`$p+q\le12$ の既約分数はすべて $12$ 段以内に現れた。`,
        },
        {
          label: "(3)",
          task: String.raw`この樹形図に現れる有理数はすべて異なることを示す`,
          answer: String.raw`既約分数の値からその親が一意に決まるので、値を見れば $\dfrac11$ までの道が完全に復元できる。同じ値の場所は1つしかない`,
          approach: String.raw`親をとる操作が値だけで決まることを使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より、樹形図に現れる分数はすべて既約である。$\mathrm{L}$ で作った分数は $p<q$、$\mathrm{R}$ で作った分数は $p>q$ をみたし、$p=q$ となるのは $\dfrac11$ だけである（既約で $p=q$ なら $p=q=1$）。`,
            },
            {
              k: "p",
              t: String.raw`したがって、$\dfrac11$ 以外の分数については、その**値だけ**から`,
            },
            {
              k: "steps",
              items: [
                String.raw`左下・右下のどちらから来たか（$p$ と $q$ の大小）`,
                String.raw`親が何か（$p<q$ なら $\dfrac{p}{q-p}$、$p>q$ なら $\dfrac{p-q}{q}$）`,
              ],
            },
            { k: "p", t: String.raw`が一意に決まる。` },
            {
              k: "p",
              t: String.raw`いま、樹形図の2つの場所に同じ値 $\dfrac pq$ が現れたとする。(2) の降下と同じ理由で、親をとる操作を繰り返せば有限回（$p+q$ が毎回減るので）で $\dfrac11$ に着く。その途中に現れる値の列も、どちらの場所から出発しても**同じ**である。したがって2つの場所は同じ段数にあり、$\dfrac11$ からの道筋（$\mathrm{L}$ と $\mathrm{R}$ の並び）も同じである。道筋が同じなら場所も同じなので、2つの場所は一致する。`,
            },
            {
              k: "p",
              t: String.raw`よって同じ値が2か所に現れることはなく、現れる有理数はすべて異なる。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`(1)(2)(3) を合わせると、「正の有理数全体」と「樹形図の場所全体」が1対1に対応する。樹形図を上から順に、各段は左から右に読めば、正の有理数を重複なく並べ上げる列ができる。`,
            },
          ],
          pitfalls: [
            String.raw`「値が同じ $\Rightarrow$ 親も同じ」を言うには、値から親が決まること（$p$ と $q$ の大小で分かれること）が要る。ここで (1) の既約性を使っている。`,
          ],
          check: String.raw`$12$ 段ぶんの $4095$ 個の分数に重複はなかった。`,
        },
        {
          label: "(4)",
          task: String.raw`$\dfrac{19}{44}$ はこの樹形図の上から何段目の左から何番目に配置されるか答える（例：$\dfrac31$ は上から3段目の左から4番目）`,
          answer: String.raw`$11$ 段目の左から $29$ 番目`,
          approach: String.raw`親を順にたどって $\dfrac11$ まで戻し、道筋を $\mathrm{L}=0$、$\mathrm{R}=1$ の2進法で読む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\dfrac{19}{44}$ から親を順にたどる。$p<q$ なら $\dfrac{p}{q-p}$、$p>q$ なら $\dfrac{p-q}{q}$ である。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\frac{19}{44}&\to\frac{19}{25}\to\frac{19}{6}\to\frac{13}{6}\to\frac76\to\frac16\\ &\to\frac15\to\frac14\to\frac13\to\frac12\to\frac11\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`ステップ数は $10$ である。$\dfrac11$ が $1$ 段目なので、$\dfrac{19}{44}$ は`,
            },
            {
              k: "math",
              t: String.raw`1+10=11\ \text{段目}`,
            },
            { k: "p", t: String.raw`にある。` },
            {
              k: "p",
              t: String.raw`次に左から何番目かを求める。上の列を逆向きに読むと、$\dfrac11$ から $\dfrac{19}{44}$ までの道は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{L},\mathrm{L},\mathrm{L},\mathrm{L},\mathrm{L},\mathrm{R},\mathrm{R},\mathrm{R},\mathrm{L},\mathrm{L}`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac12,\dfrac13,\dfrac14,\dfrac15,\dfrac16$ は分母が増えているので $\mathrm{L}$、$\dfrac76,\dfrac{13}{6},\dfrac{19}{6}$ は分子が増えているので $\mathrm{R}$、$\dfrac{19}{25},\dfrac{19}{44}$ はまた $\mathrm{L}$）。`,
            },
            {
              k: "p",
              t: String.raw`各段では左の子が左半分、右の子が右半分に入るので、$\mathrm{L}=0$、$\mathrm{R}=1$ と読んで、最初の1歩を最上位の桁とする2進数が「左から数えた番号 $-1$」になる。実際`,
            },
            {
              k: "math",
              t: String.raw`0000011100_{\left(2\right)}=2^{4}+2^{3}+2^{2}=16+8+4=28`,
            },
            { k: "p", t: String.raw`なので、左から $28+1=29$ 番目である。よって` },
            {
              k: "math",
              t: String.raw`\frac{19}{44}\ \text{は}\ 11\ \text{段目の左から}\ 29\ \text{番目}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`この読み方が正しいことは、与えられた例で確かめられる。$\dfrac31$ は $\dfrac31\to\dfrac21\to\dfrac11$ でステップ数 $2$、よって $3$ 段目。道は $\mathrm{R},\mathrm{R}$ なので $11_{\left(2\right)}=3$、左から $4$ 番目である。`,
            },
          ],
          pitfalls: [
            String.raw`番号は「$2$ 進数 $+1$」。$2$ 進数そのものを答えにすると $1$ ずれる。例で検算するのが確実。`,
            String.raw`最初の1歩が最上位の桁。逆順に並べると別の場所になってしまう。`,
            String.raw`$\dfrac{19}{44}\to\dfrac{19}{25}$ は $44-19=25$。引き算の向きを間違えない。`,
          ],
          check: String.raw`樹形図を $12$ 段まで実際に作って探すと、$\dfrac{19}{44}$ は $11$ 段目の $29$ 番目にあった。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形",
      topics: ["球面の方程式", "2球面の共通部分", "球面と平面", "三平方の定理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$C$ は平面 $2x+4y+4z=25$ 上の円で、中心 $\\left(\\tfrac{11}6,\\tfrac83,\\tfrac83\\right)$・半径 $\\tfrac{\\sqrt3}{2}=0.8660254$ と求まった",
          "その円周上の $2000$ 点はすべて $S_{1}$、$S_{2}$、および求めた3つの球面の上にあった（違反 $0$ 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`座標空間内の2つの球面 $S_{1}:\left(x-1\right)^{2}+\left(y-1\right)^{2}+\left(z-1\right)^{2}=7$ と $S_{2}:\left(x-2\right)^{2}+\left(y-3\right)^{2}+\left(z-3\right)^{2}=1$ の共通部分を $C$ とする`,
          answer: String.raw`$C$ は平面 $2x+4y+4z=25$ 上の、中心 $\left(\dfrac{11}{6},\dfrac83,\dfrac83\right)$、半径 $\dfrac{\sqrt3}{2}$ の円`,
          approach: String.raw`2式を引くと2次の項が消えて平面の式になる。`,
          blocks: [
            { k: "p", t: String.raw`2つの式を展開すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}S_{1}&:\ x^{2}+y^{2}+z^{2}-2x-2y-2z-4=0\\ S_{2}&:\ x^{2}+y^{2}+z^{2}-4x-6y-6z+21=0\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。辺々引くと2次の項が消えて`,
            },
            {
              k: "math",
              t: String.raw`2x+4y+4z-25=0\quad\cdots\ \pi`,
            },
            {
              k: "p",
              t: String.raw`を得る。$C$ 上の点は $\pi$ 上にあり、逆に $S_{1}$ と $\pi$ の共通部分の点は（引き算を戻して）$S_{2}$ 上にもあるので`,
            },
            {
              k: "math",
              t: String.raw`C=S_{1}\cap\pi`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$S_{1}$ の中心 $\mathrm{A}\left(1,1,1\right)$ と $\pi$ の距離は、$\vec n=\left(2,4,4\right)$、$\left|\vec n\right|=6$ より`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left|2+4+4-25\right|}{6}=\frac{15}{6}=\frac52`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt7>\dfrac52$（$7>\dfrac{25}{4}$）なので $C$ は円で、三平方の定理より半径は`,
            },
            {
              k: "math",
              t: String.raw`\rho=\sqrt{7-\frac{25}{4}}=\sqrt{\frac34}=\frac{\sqrt3}{2}`,
            },
            { k: "p", t: String.raw`である。$C$ の中心 $\mathrm{M}$ は $\mathrm{A}$ から $\pi$ に下ろした垂線の足で` },
            {
              k: "math",
              t: String.raw`\mathrm{M}=\mathrm{A}+\frac{25-\left(2+4+4\right)}{36}\vec n=\left(1,1,1\right)+\frac{5}{12}\left(2,4,4\right)=\left(\frac{11}{6},\frac83,\frac83\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$S_{1}$ との共通部分が $C$ になる球面の形**。そのような球面 $S$ は $C$ を含むので、中心は $C$ の「軸」、すなわち $\mathrm{M}$ を通り $\pi$ に垂直な直線`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}=\mathrm{M}+s\cdot\frac{\vec n}{6}=\left(\frac{11}{6}+\frac s3,\ \frac83+\frac{2s}{3},\ \frac83+\frac{2s}{3}\right)\quad\left(s\ \text{は実数}\right)`,
            },
            {
              k: "p",
              t: String.raw`の上にあり、半径は三平方の定理より`,
            },
            {
              k: "math",
              t: String.raw`r\left(s\right)=\sqrt{\rho^{2}+s^{2}}=\sqrt{\frac34+s^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。逆に、この形の球面はどれも $C$ を含み、$S_{1}$ とは異なる球面なので、$S_{1}$ との共通部分はちょうど $C$ になる（相異なる2球面の共通部分は、$C$ を含む以上 $C$ そのもの）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "平面 π に垂直で S₁ の中心 A を通る平面で切った断面（S₂ は省いた）。C はこの断面では 2 点に見え、どの円もその 2 点を通る。C を通る球面の中心はすべて横軸（A を通り π に垂直な直線）の上にあり、いちばん小さいのは中心が C の中点 M にくるとき（半径 √3/2）。半径 √3 のものは M の左右に 1 つずつある。",
                view: [-3.3, 6.4, -3.1, 3.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "param", f: CIR19(0, Math.sqrt(7)), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19(2.5, Math.sqrt(3) / 2), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19(1, Math.sqrt(3)), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19(4, Math.sqrt(3)), from: 0, to: 2 * Math.PI },
                  { k: "seg", a: [2.5, -3.1], b: [2.5, 3.1], dash: true },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [2.5, 0], label: "M", place: "below-right" },
                  { k: "dot", at: [2.5, Math.sqrt(3) / 2], label: "C", place: "above-right" },
                  { k: "dot", at: [2.5, -Math.sqrt(3) / 2] },
                  { k: "text", at: [-1.9, 1.9], label: "S₁", place: "above-left" },
                  { k: "text", at: [2.5, 3.0], label: "π", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「$S_{1}$ との共通部分が $C$ となる球面」には $S_{2}$ 以外にも無数にある。中心が1本の直線上を動く1径数の族になる。`,
            String.raw`$S$ が $S_{1}$ 自身になってしまう $s$ はない（$\mathrm{A}$ は $s=-\dfrac52$ に対応するが、そのとき $r=\sqrt{\tfrac34+\tfrac{25}{4}}=\sqrt7$ でちょうど $S_{1}$ になる）。半径を指定する (1)(2) では $\sqrt7$ 以外なので問題にならないが、一般には除いておく。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点がすべて $S_{1}$ と $S_{2}$ の上にあった。`,
        },
        {
          label: "(1)",
          task: String.raw`$S_{1}$ との共通部分が $C$ となるような球面のうち、半径が最小となる球面の方程式を求める`,
          answer: String.raw`$\left(x-\dfrac{11}{6}\right)^{2}+\left(y-\dfrac83\right)^{2}+\left(z-\dfrac83\right)^{2}=\dfrac34$`,
          approach: String.raw`$r\left(s\right)=\sqrt{\dfrac34+s^{2}}$ は $s=0$ で最小。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$r\left(s\right)=\sqrt{\dfrac34+s^{2}}$ は $s=0$ のとき最小値 $\dfrac{\sqrt3}{2}$ をとる。このとき中心は $\mathrm{M}=\left(\dfrac{11}{6},\dfrac83,\dfrac83\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{\sqrt3}{2}\ne\sqrt7$ なので、この球面は $S_{1}$ とは異なり、$S_{1}$ との共通部分はちょうど $C$ になる。よって求める方程式は`,
            },
            {
              k: "math",
              t: String.raw`\left(x-\frac{11}{6}\right)^{2}+\left(y-\frac83\right)^{2}+\left(z-\frac83\right)^{2}=\frac34`,
            },
            {
              k: "p",
              t: String.raw`である。これは $C$ を大円とする球面、つまり「$C$ をちょうど赤道にもつ球面」である。`,
            },
          ],
          pitfalls: [
            String.raw`半径の最小は $C$ の半径そのもの。$C$ より小さい球面は $C$ を含めない。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点がこの球面上にあり、中心からの距離はすべて $0.8660254$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$S_{1}$ との共通部分が $C$ となるような球面のうち、半径が $\sqrt3$ となる球面の方程式を求める`,
          answer: String.raw`$\left(x-\dfrac73\right)^{2}+\left(y-\dfrac{11}{3}\right)^{2}+\left(z-\dfrac{11}{3}\right)^{2}=3$ と $\left(x-\dfrac43\right)^{2}+\left(y-\dfrac53\right)^{2}+\left(z-\dfrac53\right)^{2}=3$ の2つ`,
          approach: String.raw`$\sqrt{\dfrac34+s^{2}}=\sqrt3$ から $s=\pm\dfrac32$。`,
          blocks: [
            { k: "p", t: String.raw`$r\left(s\right)=\sqrt3$ より` },
            {
              k: "math",
              t: String.raw`\frac34+s^{2}=3,\qquad s^{2}=\frac94,\qquad s=\pm\frac32`,
            },
            { k: "p", t: String.raw`である。$\dfrac{\vec n}{6}=\left(\dfrac13,\dfrac23,\dfrac23\right)$ なので` },
            {
              k: "math",
              t: String.raw`s\cdot\frac{\vec n}{6}=\pm\frac32\left(\frac13,\frac23,\frac23\right)=\pm\left(\frac12,1,1\right)`,
            },
            { k: "p", t: String.raw`であり、中心は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}s=\frac32&:\ \left(\frac{11}{6}+\frac12,\ \frac83+1,\ \frac83+1\right)=\left(\frac73,\frac{11}{3},\frac{11}{3}\right)\\ s=-\frac32&:\ \left(\frac{11}{6}-\frac12,\ \frac83-1,\ \frac83-1\right)=\left(\frac43,\frac53,\frac53\right)\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt3\ne\sqrt7$ なのでどちらも $S_{1}$ とは異なり、条件をみたす。よって`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\left(x-\frac73\right)^{2}+\left(y-\frac{11}{3}\right)^{2}+\left(z-\frac{11}{3}\right)^{2}=3\\ &\left(x-\frac43\right)^{2}+\left(y-\frac53\right)^{2}+\left(z-\frac53\right)^{2}=3\end{aligned}`,
            },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "note",
              t: String.raw`$s$ の符号は「$C$ の中心 $\mathrm{M}$ から見てどちら側にふくらむか」に対応する。$S_{2}$ 自身は $s=\dfrac12$、$r=1$ に対応し、$S_{1}$ は $s=-\dfrac52$、$r=\sqrt7$ に対応する。`,
            },
          ],
          pitfalls: [
            String.raw`$s^{2}=\dfrac94$ から $s$ は2つ。片方だけ書くと半分しか答えていないことになる。`,
            String.raw`$\dfrac{\vec n}{6}$ は単位ベクトル（$\left|\vec n\right|=6$）。正規化を忘れると中心がずれる。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点が2つの球面のどちらにも乗り、中心からの距離は $\sqrt3$ だった。`,
        },
      ],
    },
  ],
};
