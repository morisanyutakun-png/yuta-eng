import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2021年度（令和3年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 *
 * 第4問は理科の第4問とまったく同じ問題なので、解説もそちらと同じ内容を置いている。
 */

/** 第1問の図。a = 1.9（50/27 < a < 2 の中ほど）での曲線と単位円。 */
const A1 = 1.9;
const CURVE1 = (x: number) => A1 * x * x * x - 2 * x;
/** $g(t)=t\left\{1+(at-2)^2\right\}$。共有点の個数はこの $g(t)=1$ の正の解の個数で決まる。 */
const G1 = (t: number) => A1 * A1 * t ** 3 - 4 * A1 * t * t + 5 * t;
/** g(t)=1 の3解。増減の切れ目 1/a と 5/(3a) で区間を分けてから二分法で拾う。 */
const root1 = (lo: number, hi: number) => {
  let a = lo;
  let b = hi;
  for (let i = 0; i < 90; i += 1) {
    const m = (a + b) / 2;
    if ((G1(a) - 1) * (G1(m) - 1) <= 0) b = m;
    else a = m;
  }
  return (a + b) / 2;
};
const T1 = [root1(0, 1 / A1), root1(1 / A1, 5 / (3 * A1)), root1(5 / (3 * A1), 3)];
const X1 = T1.map(Math.sqrt);

/** 第3問の図。(a, b) の範囲は3頂点 (0,-2)、(2,0)、(-2,0) の三角形の内部。 */
const TOP3 = (x: number) => x * x + 2 * Math.abs(x);
const BOT3 = (x: number) => x * x - 2 * Math.max(1, Math.abs(x));

export const todaiBunkei2021: SolutionSet = {
  slug: "todai-bunkei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["3次関数", "共有点の個数", "極大・極小", "対称性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "単位円を角度で $40$ 万等分して $\\sin\\theta-\\left(a\\cos^{3}\\theta-2\\cos\\theta\\right)$ の符号変化を数えると、共有点は $a=1.8419$ で $2$ 個、$a=1.8529$ と $a=1.9$ で $6$ 個、$a=2$ で $2$ 個になり、$\\frac{50}{27}=1.85185$ と $2$ が境目であることを確かめた",
          "$g(t)=a^{2}t^{3}-4at^{2}+5t$ の極大・極小の値を $a=1.8,1.9,2.1$ で直接計算すると、それぞれ $\\frac2a$、$\\frac{50}{27a}$ と小数6桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`原点中心の半径 $1$ の円と $C:y=ax^{3}-2x$ の共有点が $6$ 個になる $a>0$ の範囲を求める`,
          answer: String.raw`$\dfrac{50}{27}<a<2$`,
          approach: String.raw`$C$ も円も原点について対称なので、共有点は原点対称な組でしか現れない。$6$ 個というのは「$x>0$ の側に $3$ 個」ということである。そこで $t=x^{2}$ とおくと、連立式が $t$ の3次方程式になり、$t>0$ の解の個数を調べる問題に化ける。$x$ のまま6次式を相手にするより、はるかに軽い。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=ax^{3}-2x$ は奇関数で、円 $x^{2}+y^{2}=1$ も原点対称だから、$(x,y)$ が共有点なら $(-x,-y)$ も共有点である。また $x=0$ のとき $y=0$ で、これは円上にないから、共有点の $x$ 座標は $0$ ではない。よって共有点は原点対称な2点ずつで現れ、`,
            },
            { k: "math", t: String.raw`\text{共有点が }6\text{ 個}\iff x>0\text{ の共有点が }3\text{ 個}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$t=x^{2}$ に直す。** 連立すると` },
            {
              k: "math",
              t: String.raw`x^{2}+\left(ax^{3}-2x\right)^{2}=1,\qquad\text{すなわち}\qquad x^{2}\left\{1+\left(ax^{2}-2\right)^{2}\right\}=1`,
            },
            { k: "p", t: String.raw`である。$t=x^{2}$ とおくと、$x>0$ と $t>0$ は1対1に対応し` },
            {
              k: "math",
              t: String.raw`g(t)=t\left\{1+(at-2)^{2}\right\}=a^{2}t^{3}-4at^{2}+5t`,
            },
            { k: "p", t: String.raw`として $g(t)=1$ の $t>0$ の解が $3$ 個あることが条件になる。` },
            { k: "p", t: String.raw`**増減を調べる。** ` },
            {
              k: "math",
              t: String.raw`g'(t)=3a^{2}t^{2}-8at+5=(3at-5)(at-1)`,
            },
            {
              k: "p",
              t: String.raw`なので、$a>0$ より $t=\dfrac1a$ と $t=\dfrac{5}{3a}$ が極値を与え、$0<\dfrac1a<\dfrac{5}{3a}$ である。$g$ は $t=\dfrac1a$ で極大、$t=\dfrac{5}{3a}$ で極小になる。値は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac1a\right)=\frac1a-\frac4a+\frac5a=\frac2a,\qquad g\left(\frac{5}{3a}\right)=\frac{125}{27a}-\frac{100}{9a}+\frac{25}{3a}=\frac{50}{27a}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解の個数。** $g(0)=0$ で、$g$ は $0<t<\dfrac1a$ で増加、$\dfrac1a<t<\dfrac{5}{3a}$ で減少、$t>\dfrac{5}{3a}$ で増加し、$t\to\infty$ で $\infty$ に発散する。したがって $g(t)=1$ が $t>0$ に $3$ 個の解をもつ条件は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac{5}{3a}\right)<1<g\left(\frac1a\right)\quad\Longleftrightarrow\quad\frac{50}{27a}<1<\frac2a`,
            },
            { k: "p", t: String.raw`である。$a>0$ なので、これは` },
            {
              k: "math",
              t: String.raw`a>\frac{50}{27}\quad\text{かつ}\quad a<2`,
            },
            { k: "p", t: String.raw`と同値である。$\dfrac{50}{27}=1.851\dots<2$ なので、求める範囲は` },
            { k: "math", t: String.raw`\frac{50}{27}<a<2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=1.9$ のときの $C:y=1.9x^{3}-2x$ と単位円。共有点は原点対称に $6$ 個あり、$x>0$ 側の $3$ 個が $t=x^{2}$ の3つの正の解に対応する。`,
                view: [-1.45, 1.45, -1.28, 1.28],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (th: number): [number, number] => [Math.cos(th), Math.sin(th)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "curve", f: CURVE1, from: -1.26, to: 1.26 },
                  ...X1.flatMap((x) => [
                    { k: "dot" as const, at: [x, CURVE1(x)] as [number, number] },
                    { k: "dot" as const, at: [-x, CURVE1(-x)] as [number, number] },
                  ]),
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=1.9$ のときの $y=g(t)$ と直線 $y=1$（$y$ が $1$ に近いところを拡大した図）。極大値 $\frac2a=1.053$ が $1$ より大きく、極小値 $\frac{50}{27a}=0.975$ が $1$ より小さいので、正の解がちょうど $3$ 個になる。`,
                view: [0.24, 1.18, 0.895, 1.125],
                step: { x: 0.25, y: 0.05 },
                items: [
                  { k: "curve", f: G1, from: 0.29, to: 1.1 },
                  { k: "seg", a: [0.24, 1], b: [1.18, 1], dash: true, faint: true },
                  { k: "dot", at: [1 / A1, 2 / A1], label: "極大 2/a", place: "above" },
                  {
                    k: "dot",
                    at: [5 / (3 * A1), 50 / (27 * A1)],
                    label: "極小 50/(27a)",
                    place: "below",
                  },
                  ...T1.map((t) => ({ k: "dot" as const, at: [t, 1] as [number, number] })),
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t=x^{2}$ とおくと、$t>0$ の解1つが $x>0$ の解1つに対応する（$x<0$ 側は対称性で自動的に決まる）。「$t$ の解1つが $x$ の解2つ」と数えて $3$ 個を $6$ 個と取り違えないこと。ここでは $x>0$ 側だけを見るのがいちばん安全である。`,
            String.raw`$a=2$ ちょうどだと極大値が $1$ に等しくなり、そこは接するだけなので共有点は $x>0$ 側で $2$ 個（全体で $4$ 個）に減る。同様に $a=\frac{50}{27}$ でも $6$ 個にならない。両端は入らない。`,
            String.raw`$g(0)=0<1$ なので、$0<t<\frac1a$ の区間には必ず解が1つある。3個になるかどうかは極大・極小の値だけで決まる。`,
          ],
          check: String.raw`$\frac{50}{27}=1.851852$。単位円を角度で $40$ 万等分して $C$ との符号変化を数えると、$a=1.8419$ では $2$ 個、$a=1.8529$ では $6$ 個、$a=1.9$ では $6$ 個、$a=2$ では $2$ 個になる。$a=1.9$ での極大値は $1.052632=\frac2a$、極小値は $0.974659=\frac{50}{27a}$ で、どちらも $1$ をまたいでいる。`,
        },
      ],
    },
    {
      no: 2,
      field: "場合の数",
      topics: ["連続しない選び方", "連続する組", "場合分け", "一般の N"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$N=5,6,7,8,9$ について $1$ を含む $N$ 個の選び方をすべて列挙し、条件1をみたすものがちょうど $N$ 通りであることを確かめた",
          "同じ列挙で条件2をみたすものが $51,70,92,117,145$ 通りとなり、$\\frac{(N+1)(3N+2)}{2}$ の値と完全に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件1（連続する2整数を含まない）をみたす選び方の数を求める`,
          answer: String.raw`$N$ 通り`,
          approach: String.raw`$1$ を選ぶと決まっているので $2$ は選べない。残りは $3$ 以上 $2N$ 以下から $N-1$ 個を、隣り合わないように選ぶ問題になる。隣り合わない選び方は、選んだ数から順に $0,1,2,\dots$ を引いて詰める（重なりを消す）と、ふつうの選び方に1対1で対応する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1\in S$ だから、条件1より $2\notin S$ である。よって残りの $N-1$ 個は $3$ 以上 $2N$ 以下の $2N-2$ 個の整数から、どの2つも隣り合わないように選ぶことになる。`,
            },
            {
              k: "p",
              t: String.raw`**詰めて数える。** 選んだ数を $3\le x_1<x_2<\dots<x_{N-1}\le2N$ とすると、隣り合わない条件は $x_{i+1}-x_i\ge2$ である。ここで`,
            },
            { k: "math", t: String.raw`y_i=x_i-(i-1)\qquad(i=1,2,\dots,N-1)` },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`y_{i+1}-y_i=x_{i+1}-x_i-1\ge1`,
            },
            {
              k: "p",
              t: String.raw`なので $y_1<y_2<\dots<y_{N-1}$ は相異なり、$y_1=x_1\ge3$、$y_{N-1}=x_{N-1}-(N-2)\le2N-(N-2)=N+2$ である。逆に $3\le y_1<\dots<y_{N-1}\le N+2$ を与えれば $x_i=y_i+(i-1)$ がもとの条件をみたす並びを与えるので、両者は1対1に対応する。`,
            },
            {
              k: "p",
              t: String.raw`$3$ 以上 $N+2$ 以下の整数は $N$ 個あるから、そこから $N-1$ 個を選ぶ方法は`,
            },
            {
              k: "math",
              t: String.raw`{}_{N}\mathrm{C}_{N-1}=N`,
            },
            { k: "p", t: String.raw`通りである。よって条件1をみたす選び方は $N$ 通りである。` },
            {
              k: "note",
              t: String.raw`具体的には、$1,3,5,\dots$ と $2$ とびに並べていき、どこか1か所だけ $3$ とびにする、という形になる。$N=5$ なら $\{1,3,5,7,9\}$、$\{1,3,5,7,10\}$、$\{1,3,5,8,10\}$、$\{1,3,6,8,10\}$、$\{1,4,6,8,10\}$ の $5$ 通りである。`,
            },
          ],
          pitfalls: [
            String.raw`$1$ を選ぶことが決まっているので、$2N$ 個から選ぶ問題ではなく「$3$ 以上から $N-1$ 個」の問題になる。ここを $2N$ 個のままにすると答えが $N+1$ 通りになってしまう。`,
            String.raw`「隣り合わないように $k$ 個を $m$ 個から選ぶのは $ {}_{m-k+1}\mathrm{C}_{k}$ 通り」という公式を使ってもよいが、答案では詰め直す対応を書いておく方が安全である。`,
          ],
          check: String.raw`$N=5$（$1$ から $10$）では、$1$ を含む $5$ 個の選び方 $ {}_{9}\mathrm{C}_{4}=126$ 通りをすべて調べると、条件1をみたすのはちょうど $5$ 通りだった。$N=6,7,8,9$ でも順に $6,7,8,9$ 通りで、$N$ 通りと一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`条件2（連続する $N-2$ 個の整数からなる集合を少なくとも1つ含む）をみたす選び方の数を求める`,
          answer: String.raw`$\dfrac{(N+1)(3N+2)}{2}$ 通り`,
          approach: String.raw`$S$ は $N$ 個しかないので、長さ $N-2$ 以上の「連続のかたまり」は高々1つしか持てない（2つあれば $2(N-2)\le N$ となり $N\le4$）。だから、そのかたまりの長さ $L$（$N-2$、$N-1$、$N$ のどれか）で場合分けすれば、重複なく数え上げられる。残りの $N-L$ 個は、かたまりの両隣を避けて置く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2$ 以上の整数 $k$ に対し、$S$ に含まれる「連続する $k$ 個」を長さ $k$ のかたまりと呼ぶ。もし長さ $N-2$ 以上のかたまりが2つあれば、それらは共通部分をもたないか、もつなら合わせてさらに長いひとつのかたまりになる。前者なら $|S|\ge2(N-2)$ で $N\ge2N-4$、つまり $N\le4$ となり仮定 $N\ge5$ に反する。よって`,
            },
            {
              k: "math",
              t: String.raw`S\text{ に含まれる最長のかたまりはただ1つで、その長さを }L\text{ とすると }L=N-2,\;N-1,\;N`,
            },
            {
              k: "p",
              t: String.raw`のいずれかである（$L\ge N-2$ が条件2、$L\le|S|=N$ は明らか）。この $L$ で場合分けする。最長のかたまりを $R=\{l,l+1,\dots,l+L-1\}$ とすると、$l-1$ と $l+L$ は $S$ に入らない。`,
            },
            { k: "p", t: String.raw`**(i) $L=N$ のとき。** $S$ 自身がひとつながりで、$1\in S$ より $l=1$、つまり` },
            { k: "math", t: String.raw`S=\{1,2,\dots,N\}` },
            { k: "p", t: String.raw`の $1$ 通りである。` },
            {
              k: "p",
              t: String.raw`**(ii) $L=N-1$ のとき。** $R=\{l,\dots,l+N-2\}$ のほかに $1$ 個だけ残り、それを $x$ とする。$x$ は $l-1$ でも $l+N-1$ でもない（そうなると $L=N$ になる）。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$1\in R$ のとき：$l=1$、$R=\{1,\dots,N-1\}$。$x$ は $N$（$=l+N-1$）を避けるので $N+1\le x\le2N$ の $N$ 通り。`,
                String.raw`$1\notin R$ のとき：$x=1$ である。$1\ne l-1$ より $l\ge3$、また $l+N-2\le2N$ より $l\le N+2$。$l$ は $N$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`合わせて $2N$ 通りである。` },
            {
              k: "p",
              t: String.raw`**(iii) $L=N-2$ のとき。** $R=\{l,\dots,l+N-3\}$ のほかに $2$ 個残る。その $2$ 個は、$R$ とその両隣を合わせた`,
            },
            { k: "math", t: String.raw`\{l-1,\;l,\;\dots,\;l+N-2\}` },
            {
              k: "p",
              t: String.raw`（$N$ 個）を避けて $1$ 以上 $2N$ 以下から選ぶ。この $2$ 個どうしが隣り合うのはかまわない（長さ $2$ のかたまりは $N-2\ge3$ より短い）。$l$ の動く範囲は $1\le l\le N+3$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$l=1$：避ける範囲は $1\le x\le N-1$ の $N-1$ 個なので、残り $N+1$ 個（$N$ 以上 $2N$ 以下）から $2$ 個。$1\in R$ なので条件は自動的にみたされ、$ {}_{N+1}\mathrm{C}_{2}=\dfrac{N(N+1)}{2}$ 通り。`,
                String.raw`$l=2$：避ける範囲が $1$ を含むので $1\notin S$ となり不適。$0$ 通り。`,
                String.raw`$3\le l\le N+2$：避ける範囲はちょうど $N$ 個で、残りは $N$ 個（$1$ を含む）。$1$ は必ず選ぶので、もう $1$ 個を残り $N-1$ 個から選んで $N-1$ 通り。$l$ が $N$ 通りあるので $N(N-1)$ 通り。`,
                String.raw`$l=N+3$：$R=\{N+3,\dots,2N\}$ で、避ける範囲は $N+2$ 以上 $2N$ 以下の $N-1$ 個。残りは $1$ 以上 $N+1$ 以下の $N+1$ 個で $1$ を含むから、もう $1$ 個を $N$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`合わせて` },
            {
              k: "math",
              t: String.raw`\frac{N(N+1)}{2}+N(N-1)+N=\frac{N(N+1)}{2}+N^{2}`,
            },
            { k: "p", t: String.raw`通りである。` },
            { k: "p", t: String.raw`**合計。** (i)(ii)(iii) は互いに排反なので` },
            {
              k: "math",
              t: String.raw`1+2N+\frac{N(N+1)}{2}+N^{2}=\frac{2+4N+N^{2}+N+2N^{2}}{2}=\frac{3N^{2}+5N+2}{2}=\frac{(N+1)(3N+2)}{2}`,
            },
            { k: "p", t: String.raw`通りである。` },
            {
              k: "note",
              t: String.raw`$N=5$ なら $\dfrac{6\cdot17}{2}=51$ 通り、$N=6$ なら $\dfrac{7\cdot20}{2}=70$ 通りである。`,
            },
          ],
          pitfalls: [
            String.raw`「長さ $N-2$ のかたまりを含む」を「ちょうど長さ $N-2$ のかたまりがある」と読み替えてはいけない。長さ $N-1$ や $N$ のかたまりも、その中に長さ $N-2$ のかたまりを含んでいるので条件2をみたす。最長の長さで場合分けするのは、この重複を避けるためである。`,
            String.raw`$L=N-2$ の場合に $l-1$ と $l+N-2$ を除くのを忘れると、長さ $N-1$ 以上のものを二重に数えてしまう。`,
            String.raw`$l=2$ が不適になるのは、$1$ が「かたまりの左隣」に当たって $S$ に入れられなくなるからである。$1\in S$ という条件がここだけ効く。`,
            String.raw`$N\ge5$ という前提は、長さ $N-2$ 以上のかたまりが1つしかないこと、および残り $2$ 個が隣り合っても $N-2$ に届かないことの両方で使っている。`,
          ],
          check: String.raw`$N=5,6,7,8,9$ について、$1$ を含む $N$ 個の選び方をすべて列挙して条件2を直接判定すると $51,70,92,117,145$ 通りとなり、$\frac{(N+1)(3N+2)}{2}$ の値 $51,70,92,117,145$ と完全に一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["2次方程式の解の配置", "領域図示", "通過領域", "線形計画法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)$ を $20$ 万点ランダムに取り、$2x^{2}+ax+b=0$ の解を直接求めて配置を調べた結果と、$|a|-2<b<0$ という不等式表現が完全に一致することを確かめた",
          "$(x,y)$ を $6$ 万点ランダムに取り、$a$ を $4000$ 等分して $(a,b)$ が三角形の内部に入るかを総当たりした結果と、$x^{2}-2\\max(1,|x|)<y<x^{2}+2|x|$ が（境界から $0.01$ 以上離れた点で）完全に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $(a,b)$ のとりうる範囲を図示する`,
          answer: String.raw`$3$ 点 $(0,-2)$、$(2,0)$、$(-2,0)$ を頂点とする三角形の内部（境界を含まない）。不等式で書けば $|a|-2<b<0$`,
          approach: String.raw`2つの放物線の共有点の $x$ 座標は $2x^{2}+ax+b=0$ の解である。解の配置を調べるときは、解そのものを書くより $f(x)=2x^{2}+ax+b$ の符号を見る方が早い。下に凸なので、$f(-1)>0$、$f(0)<0$、$f(1)>0$ がそのまま条件になる。`,
          blocks: [
            { k: "p", t: String.raw`$y=x^{2}+ax+b$ と $y=-x^{2}$ を連立すると` },
            { k: "math", t: String.raw`x^{2}+ax+b=-x^{2}\quad\Longleftrightarrow\quad 2x^{2}+ax+b=0` },
            {
              k: "p",
              t: String.raw`である。$f(x)=2x^{2}+ax+b$ とおくと、条件は「$f(x)=0$ が $-1<x<0$ と $0<x<1$ にそれぞれ1つずつ解をもつ」である。`,
            },
            {
              k: "p",
              t: String.raw`**符号で読む。** $f$ は下に凸の2次関数だから、この条件は`,
            },
            {
              k: "math",
              t: String.raw`f(-1)>0,\qquad f(0)<0,\qquad f(1)>0`,
            },
            {
              k: "p",
              t: String.raw`と同値である。実際、$f(0)<0$ なら $f$ は $x<0$ 側と $x>0$ 側に1つずつ解をもち、$f(-1)>0$、$f(1)>0$ がその解を $(-1,0)$、$(0,1)$ に閉じ込める。逆も明らかである。書き下すと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(-1)&=2-a+b>0 &&\Longleftrightarrow\quad b>a-2\\[1mm]
f(0)&=b<0\\[1mm]
f(1)&=2+a+b>0 &&\Longleftrightarrow\quad b>-a-2
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。$b>a-2$ と $b>-a-2$ をまとめると $b>|a|-2$ なので、求める範囲は` },
            { k: "math", t: String.raw`|a|-2<b<0` },
            {
              k: "p",
              t: String.raw`である。これは $3$ 直線 $b=a-2$、$b=-a-2$、$b=0$ で囲まれた三角形の内部で、頂点は $(0,-2)$、$(2,0)$、$(-2,0)$ である。境界は含まない。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`点 $(a,b)$ のとりうる範囲。横軸が $a$、縦軸が $b$。$3$ 点 $(0,-2)$、$(2,0)$、$(-2,0)$ を頂点とする三角形の内部で、破線の境界は含まない。`,
                view: [-3.1, 3.1, -2.75, 1.15],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, -2], [2, 0], [-2, 0]] },
                  { k: "seg", a: [0, -2], b: [2, 0], dash: true },
                  { k: "seg", a: [0, -2], b: [-2, 0], dash: true },
                  { k: "seg", a: [-2, 0], b: [2, 0], dash: true },
                  { k: "dot", at: [0, -2], label: "(0, -2)", place: "below" },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "above-right" },
                  { k: "dot", at: [-2, 0], label: "(-2, 0)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`判別式 $a^{2}-8b>0$ は書かなくてよい。$f(0)=b<0$ から、$f$ は $x$ 軸と必ず2点で交わることが従うからである。書いても誤りではないが、余計な条件を足して範囲を狭めないよう注意する。`,
            String.raw`$f(-1)$、$f(1)$ は $>0$ で、$=0$ は含まない。$x=\pm1$ が共有点になってしまうと $-1<x<0$、$0<x<1$ の条件から外れる。`,
          ],
          check: String.raw`$(a,b)$ を $-4\le a\le4$、$-4\le b\le1$ の範囲に $20$ 万点ランダムに取り、$2x^{2}+ax+b=0$ の解を実際に計算して配置を判定した結果と、$|a|-2<b<0$ の判定は1点も食い違わなかった。たとえば $(a,b)=(0,-1)$ は範囲内で、解は $x=\pm\frac{1}{\sqrt2}=\pm0.707$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`放物線 $C$ の通りうる範囲を図示する`,
          answer: String.raw`$x^{2}-2<y<x^{2}+2|x|$（$|x|\le1$）、$x^{2}-2|x|<y<x^{2}+2|x|$（$|x|\ge1$）。境界は含まない`,
          approach: String.raw`点 $(x,y)$ が通過範囲に入るのは、$y=x^{2}+ax+b$ をみたす $(a,b)$ が (1) の三角形の内部にあるときである。$x$ を固定すると $ax+b$ は $(a,b)$ の**1次式**なので、その値域は三角形の3頂点での値だけで決まる。領域が開いているので、値域も端を含まない開区間になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x$ を固定する。点 $(x,y)$ が $C$ 上にあるのは $y=x^{2}+(ax+b)$ のときだから、$y-x^{2}$ が $ax+b$ のとりうる値であればよい。`,
            },
            {
              k: "p",
              t: String.raw`**1次式の値域は頂点で決まる。** $ax+b$ は $(a,b)$ についての1次式で、$b$ の係数が $1\ne0$ だから定数ではない。(1) の三角形 $T$（内部、境界を除く）は凸なので、$ax+b$ の $T$ 上での値域は、$T$ の閉包での最小値と最大値のあいだの**開区間**になる。最小・最大は頂点でとるから、$3$ 頂点での値`,
            },
            {
              k: "math",
              t: String.raw`(0,-2)\mapsto-2,\qquad(2,0)\mapsto2x,\qquad(-2,0)\mapsto-2x`,
            },
            { k: "p", t: String.raw`を比べればよい。$\max(2x,-2x)=2|x|\ge0>-2$ なので` },
            {
              k: "math",
              t: String.raw`\max=2|x|,\qquad \min=\min\left(-2,\;-2|x|\right)=\begin{cases}-2&(|x|\le1)\\[1mm]-2|x|&(|x|\ge1)\end{cases}`,
            },
            { k: "p", t: String.raw`である。よって $ax+b$ のとりうる値は` },
            {
              k: "math",
              t: String.raw`\min<ax+b<2|x|`,
            },
            { k: "p", t: String.raw`で、$y=x^{2}+(ax+b)$ だから、求める範囲は` },
            {
              k: "math",
              t: String.raw`\begin{cases}x^{2}-2<y<x^{2}+2|x|&(|x|\le1)\\[2mm]x^{2}-2|x|<y<x^{2}+2|x|&(|x|\ge1)\end{cases}`,
            },
            { k: "p", t: String.raw`である（境界は含まない）。` },
            {
              k: "p",
              t: String.raw`**境界の正体。** $y=x^{2}+2|x|$ は $x\ge0$ では $y=x^{2}+2x=(x+1)^{2}-1$、$x\le0$ では $y=(x-1)^{2}-1$ である。$y=x^{2}-2|x|$ は $x\ge1$ では $y=(x-1)^{2}-1$、$x\le-1$ では $y=(x+1)^{2}-1$ である。つまり外側も内側も、もとの放物線を $\pm1$ だけ左右にずらして $1$ 下げたものである。$|x|\le1$ の部分だけが $y=x^{2}-2$ という別の放物線になる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`放物線 $C$ の通りうる範囲。上側の境界は $y=x^{2}+2|x|$、下側は $|x|\le1$ で $y=x^{2}-2$、$|x|\ge1$ で $y=x^{2}-2|x|$。いずれも境界は含まない。$(\pm1,-1)$ で下側の境界が折れる。`,
                view: [-2.15, 2.15, -2.5, 8.9],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fillBetween", top: TOP3, bottom: BOT3, from: -2.13, to: 2.13 },
                  { k: "curve", f: TOP3, from: -2.13, to: 2.13, dash: true },
                  { k: "curve", f: BOT3, from: -2.13, to: 2.13, dash: true },
                  { k: "dot", at: [0, 0], label: "(0, 0)", place: "below-right" },
                  { k: "dot", at: [0, -2], label: "(0, -2)", place: "below" },
                  { k: "dot", at: [1, -1], label: "(1, -1)", place: "below-right" },
                  { k: "dot", at: [-1, -1], label: "(-1, -1)", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x$ を固定して $(a,b)$ を動かす、という順番を守る。$a$ と $b$ を別々に動かすと、$b>|a|-2$ という結びつきが消えて範囲が広がりすぎる。`,
            String.raw`$|x|\le1$ と $|x|\ge1$ で下側の境界が入れ替わるのは、$-2$ と $-2|x|$ の大小が $|x|=1$ で逆転するからである。$x=\pm1$ では両者が一致して $y=-1$ になり、図では折れ目になる。`,
            String.raw`三角形の内部（境界を除く）なので、値域も開区間である。$y=x^{2}+2|x|$ などの境界線上の点は通らない。`,
          ],
          check: String.raw`$(x,y)$ を $-3\le x\le3$、$-6\le y\le14$ に $6$ 万点ランダムに取り、$a$ を $-2$ から $2$ まで $4000$ 等分して $(a,y-x^{2}-ax)$ が三角形の内部に入るかを総当たりで調べると、上の不等式による判定と（境界から $0.01$ 以上離れた点では）1点も食い違わなかった。たとえば $x=2$ では $0<y<8$ で、$a\to\pm2$ の極限がちょうど両端にあたる。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数",
      topics: ["合同式", "二項係数", "階乗の2の指数", "組合せの整除"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$2\\le a\\le13$、$1\\le b<a$ のすべてで $ {}_{4a+1}\\mathrm{C}_{4b+1}$ と $ {}_{a}\\mathrm{C}_{b}$ の2の指数が一致する（奇数 $K,L$ が取れる）ことを確かめた",
          "$2\\le a\\le15$ で $a-b$ が偶数のすべての組について、$ {}_{4a+1}\\mathrm{C}_{4b+1}$ と $ {}_{a}\\mathrm{C}_{b}$ を $4$ で割った余りが一致することを多倍長整数で確かめた",
          "$ {}_{2021}\\mathrm{C}_{37}$ を多倍長整数で直接計算して $4$ で割った余りが $3$ であることを確かめ、$ {}_{505}\\mathrm{C}_{9}$、$ {}_{126}\\mathrm{C}_{2}$ の余りもどちらも $3$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$K,L$ が正の奇数、$A,B$ が正の整数で $KA=LB$ のとき、$K\equiv L\pmod4$ ならば $A\equiv B\pmod4$ であることを示す`,
          answer: String.raw`$K(A-B)=(L-K)B$ が $4$ の倍数で、$K$ が奇数だから $A-B$ が $4$ の倍数`,
          approach: String.raw`$A-B$ が $4$ の倍数であることを示したい。$KA=LB$ から $K(A-B)$ を作ると、残りが $(L-K)B$ になり、仮定からこれは $4$ の倍数である。あとは $K$ が奇数、つまり $4$ と互いに素であることを使う。`,
          blocks: [
            { k: "p", t: String.raw`$KA=LB$ より` },
            { k: "math", t: String.raw`K(A-B)=KA-KB=LB-KB=(L-K)B` },
            {
              k: "p",
              t: String.raw`である。仮定より $L-K$ は $4$ の倍数なので、右辺は $4$ の倍数である。よって $K(A-B)$ は $4$ の倍数である。`,
            },
            {
              k: "p",
              t: String.raw`$K$ は奇数なので $K$ と $4$ は互いに素である。したがって $A-B$ が $4$ の倍数でなければならない。すなわち $A$ を $4$ で割った余りと $B$ を $4$ で割った余りは等しい。`,
            },
          ],
          pitfalls: [
            String.raw`$KA=LB$ の両辺を $K$ で割ってはいけない。$A-B$ を作ってから「奇数と $4$ が互いに素」を使う。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$a>b>0$ のとき、$A={}_{4a+1}\mathrm{C}_{4b+1}$、$B={}_{a}\mathrm{C}_{b}$ に対して $KA=LB$ となる正の奇数 $K,L$ が存在することを示す`,
          answer: String.raw`$(4n)!=2^{3n}\,n!\,c_n$（$c_n$ は奇数）と書けて、$K=(4b+1)c_bc_{a-b}$、$L=(4a+1)c_a$ とすればよい`,
          approach: String.raw`$\dfrac AB$ を階乗で書き下して、$2$ のべきだけを取り出す。$(4n)!$ の中の偶数をまとめて $2$ をくくり出すと、$(4n)!=2^{3n}\,n!\times(\text{奇数})$ という形になる。この「奇数」の部分が、そのまま $K,L$ の材料になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$2$ のべきをくくり出す。** $1$ から $2n$ までの積で、偶数だけを集めると $2\cdot4\cdots2n=2^{n}n!$ だから`,
            },
            { k: "math", t: String.raw`(2n)!=\left(\text{$2n$ 以下の奇数の積}\right)\times2^{n}n!` },
            { k: "p", t: String.raw`である。これを2回使うと` },
            {
              k: "math",
              t: String.raw`(4n)!=\left(\text{$4n$ 以下の奇数の積}\right)\times2^{2n}(2n)!=\left(\text{奇数}\right)\times2^{3n}\,n!`,
            },
            {
              k: "p",
              t: String.raw`となる。そこで正の奇数 $c_n$ を $(4n)!=2^{3n}\,n!\,c_n$ で定める（$c_0=1$）。`,
            },
            { k: "p", t: String.raw`**$\dfrac AB$ を書く。** $m=a-b\ (\ge1)$ とおく。` },
            {
              k: "math",
              t: String.raw`\frac AB=\frac{(4a+1)!}{(4b+1)!\,(4m)!}\cdot\frac{b!\,m!}{a!}=\frac{(4a+1)!}{a!}\cdot\frac{b!}{(4b+1)!}\cdot\frac{m!}{(4m)!}`,
            },
            { k: "p", t: String.raw`であり、$\dfrac{(4n+1)!}{n!}=(4n+1)\cdot\dfrac{(4n)!}{n!}=(4n+1)2^{3n}c_n$ だから` },
            {
              k: "math",
              t: String.raw`\frac AB=\frac{(4a+1)2^{3a}c_a}{(4b+1)2^{3b}c_b\cdot2^{3m}c_m}=\frac{(4a+1)c_a}{(4b+1)c_bc_m}`,
            },
            { k: "p", t: String.raw`となる（$a=b+m$ なので $2$ のべきはすべて打ち消し合う）。したがって` },
            {
              k: "math",
              t: String.raw`K=(4b+1)c_bc_m,\qquad L=(4a+1)c_a`,
            },
            {
              k: "p",
              t: String.raw`とおけば $KA=LB$ が成り立つ。$4b+1$、$4a+1$ は奇数、$c_b,c_m,c_a$ も奇数なので、$K,L$ はともに正の奇数である。`,
            },
          ],
          pitfalls: [
            String.raw`$2$ のべきが打ち消し合うのは $3a=3b+3m$、つまり $a=b+m$ だからである。$4a+1$、$4b+1$ という「$4$ で割ると $1$ 余る形」が効いていて、$1$ がずれると成り立たない。`,
          ],
          check: String.raw`$a=4$、$b=1$ なら $A={}_{17}\mathrm{C}_{5}=6188=2^{2}\cdot7\cdot13\cdot17$、$B={}_{4}\mathrm{C}_{1}=4$ で、$2$ の指数はどちらも $2$ である。$2\le a\le13$ の範囲のすべての $(a,b)$ で $2$ の指数が一致することを確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`さらに $a-b$ が $2$ で割り切れるとき、$ {}_{4a+1}\mathrm{C}_{4b+1}$ と $ {}_{a}\mathrm{C}_{b}$ を $4$ で割った余りが等しいことを示す`,
          answer: String.raw`(2) の $K,L$ が $K\equiv L\pmod4$ をみたすので、(1) が使える`,
          approach: String.raw`(1) を使うには $K\equiv L\pmod4$ を言えばよい。$4a+1\equiv4b+1\equiv1\pmod4$ なので、残るのは $c_bc_m\equiv c_a\pmod4$ である。$c_n$ の漸化式を $4$ を法として見ると、$c_n$ の余りは $n$ を $4$ で割った余りだけで決まることが分かる。`,
          blocks: [
            { k: "p", t: String.raw`**$c_n$ を $4$ で割った余り。** 定義から` },
            {
              k: "math",
              t: String.raw`\frac{c_{n+1}}{c_n}=\frac{(4n+4)!}{(4n)!}\cdot\frac{n!}{(n+1)!}\cdot\frac{1}{2^{3}}=\frac{(4n+1)(4n+2)(4n+3)(4n+4)}{8(n+1)}`,
            },
            { k: "p", t: String.raw`で、$(4n+2)(4n+4)=8(2n+1)(n+1)$ だから` },
            { k: "math", t: String.raw`c_{n+1}=c_n(4n+1)(4n+3)(2n+1)` },
            {
              k: "p",
              t: String.raw`となる。$4$ を法とすると $4n+1\equiv1$、$4n+3\equiv3$ なので $c_{n+1}\equiv3(2n+1)c_n$ であり、$n$ が偶数なら $2n+1\equiv1$ で $c_{n+1}\equiv3c_n$、$n$ が奇数なら $2n+1\equiv3$ で $c_{n+1}\equiv9c_n\equiv c_n$ となる。$c_0=1$ から順に`,
            },
            {
              k: "math",
              t: String.raw`c_0\equiv1,\quad c_1\equiv3,\quad c_2\equiv3,\quad c_3\equiv1,\quad c_4\equiv1,\quad c_5\equiv3,\ \dots\pmod4`,
            },
            {
              k: "p",
              t: String.raw`となり、$c_n$ を $4$ で割った余りは $n$ を $4$ で割った余りだけで決まって`,
            },
            {
              k: "math",
              t: String.raw`c_n\equiv\begin{cases}1&\left(n\equiv0,3\pmod4\right)\\[1mm]3&\left(n\equiv1,2\pmod4\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$K\equiv L$ を示す。** $4a+1\equiv4b+1\equiv1\pmod4$ なので、(2) の $K,L$ について $K\equiv c_bc_m$、$L\equiv c_a=c_{b+m}\pmod4$ である。$m=a-b$ が偶数のとき $c_bc_m\equiv c_{b+m}$ を示す。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$m\equiv0\pmod4$ のとき：$c_m\equiv1$、また $b+m\equiv b$ なので $c_{b+m}\equiv c_b$。両辺とも $c_b$ になり成り立つ。`,
                String.raw`$m\equiv2\pmod4$ のとき：$c_m\equiv3$、また $b+m\equiv b+2$ である。$b$ を $4$ で割った余りで4通り調べると、$b\equiv0$ では $3\cdot1=3$ と $c_2\equiv3$、$b\equiv1$ では $3\cdot3\equiv1$ と $c_3\equiv1$、$b\equiv2$ では $3\cdot3\equiv1$ と $c_4\equiv1$、$b\equiv3$ では $3\cdot1=3$ と $c_5\equiv3$ で、いずれも一致する。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $K\equiv L\pmod4$ であり、(1) より $A$ と $B$ を $4$ で割った余りは等しい。すなわち $ {}_{4a+1}\mathrm{C}_{4b+1}$ と $ {}_{a}\mathrm{C}_{b}$ を $4$ で割った余りは等しい。`,
            },
          ],
          pitfalls: [
            String.raw`$m$ が奇数だと $c_bc_m\equiv c_{b+m}$ は崩れる。たとえば $b=1$、$m=1$ なら左辺 $3\cdot3\equiv1$、右辺 $c_2\equiv3$ で一致しない。「$a-b$ が偶数」という条件はここで効いている。`,
          ],
          check: String.raw`$a=4$、$b=2$（$a-b=2$）では $ {}_{17}\mathrm{C}_{9}=24310$ で $4$ で割ると $2$ 余り、$ {}_{4}\mathrm{C}_{2}=6$ も $2$ 余る。$2\le a\le15$ で $a-b$ が偶数のすべての組を多倍長整数で調べても例外はなかった。`,
        },
        {
          label: "(4)",
          task: String.raw`$ {}_{2021}\mathrm{C}_{37}$ を $4$ で割った余りを求める`,
          answer: String.raw`$3$`,
          approach: String.raw`$2021=4\cdot505+1$、$37=4\cdot9+1$ なので (3) がそのまま使える。$505$ と $9$ もまた「$4$ で割ると $1$ 余る形」なので、もう一度使えて一気に小さくなる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2021=4\cdot505+1$、$37=4\cdot9+1$ で、$505-9=496$ は偶数だから (3) より`,
            },
            { k: "math", t: String.raw`{}_{2021}\mathrm{C}_{37}\equiv{}_{505}\mathrm{C}_{9}\pmod4` },
            {
              k: "p",
              t: String.raw`である。さらに $505=4\cdot126+1$、$9=4\cdot2+1$ で $126-2=124$ は偶数だから、もう一度 (3) を使って`,
            },
            { k: "math", t: String.raw`{}_{505}\mathrm{C}_{9}\equiv{}_{126}\mathrm{C}_{2}\pmod4` },
            { k: "p", t: String.raw`となる。最後は直接計算して` },
            {
              k: "math",
              t: String.raw`{}_{126}\mathrm{C}_{2}=\frac{126\cdot125}{2}=7875=4\cdot1968+3`,
            },
            { k: "p", t: String.raw`なので、求める余りは $3$ である。` },
          ],
          pitfalls: [
            String.raw`(3) を使うには「上も下も $4$ で割ると $1$ 余る」ことと「$a-b$ が偶数」の両方が要る。$2021$ と $37$、$505$ と $9$ はどちらもみたしているので2回続けて使える。`,
          ],
          check: String.raw`多倍長整数で $ {}_{2021}\mathrm{C}_{37}$ をそのまま計算して $4$ で割ると、余りは $3$ になる。$ {}_{505}\mathrm{C}_{9}$、$ {}_{126}\mathrm{C}_{2}$ の余りもどちらも $3$ で、2段階の言いかえが正しいことも確かめられる。`,
        },
      ],
    },
  ],
};
