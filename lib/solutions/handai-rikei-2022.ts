import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2022年度（令和4年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。$z$ の円（中心 $\tfrac32$、半径 $r$）とその像。図は $r=1$ と $r=\tfrac12$。 */
const ZC1 = (r: number) => (t: number): [number, number] =>
  [1.5 + r * Math.cos(t), r * Math.sin(t)];
const WC1 = (r: number) => (t: number): [number, number] => {
  const c = (3 - 4 * r * r) / (1 - 4 * r * r);
  const R = (4 * r) / Math.abs(1 - 4 * r * r);
  return [c + R * Math.cos(t), R * Math.sin(t)];
};

/** 第3問。線分 $\mathrm{PQ}$ が通過する部分の上下の境界。 */
const UP22 = (x: number): number =>
  x <= 0.5 ? (x < 0.25 ? 2 - 4 * x : 1 / (4 * x)) : 1 - x;
const LO22 = (x: number): number =>
  x <= 0.5 ? (x <= 1 / 3 ? 1 - x : 2 - 4 * x) : 0;

/** 第4問。$f\left(x\right)=\log\left(x+1\right)+1$ と不動点。 */
const F22H = (x: number): number => Math.log(x + 1) + 1;
const AL22 = 2.1461932206205825;

/** 第5問の曲線 $C$。 */
const C22 = (t: number): [number, number] => [
  Math.exp(t) * Math.cos(t) + Math.exp(Math.PI),
  Math.exp(t) * Math.sin(t),
];

export const handaiRikei2022: SolutionSet = {
  slug: "handai-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面",
      topics: ["分数変換", "円の像", "反転", "場合分け"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$r=0.25,1,2$ で $z$ を円周上の $2000$ 点にとって $w=\\tfrac{z}{z-1}$ を計算すると、どれも中心 $\\tfrac{3-4r^{2}}{1-4r^{2}}$ からの距離が $\\tfrac{4r}{\\left|1-4r^{2}\\right|}$ で一定だった",
          "$r=\\tfrac12$ では $w$ の実部がつねに $2$ になった",
          "$r=1$ なら中心 $\\tfrac13$・半径 $\\tfrac43$、$r=2$ なら中心 $\\tfrac{13}{15}$・半径 $\\tfrac8{15}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$r>0$ とする。複素数平面上で $z$ が点 $\dfrac32$ を中心とする半径 $r$ の円周上を動くとき、$z+w=zw$ をみたす点 $w$ が描く図形を求める`,
          answer: String.raw`$r\ne\dfrac12$ のとき、中心 $\dfrac{3-4r^{2}}{1-4r^{2}}$、半径 $\dfrac{4r}{\left|1-4r^{2}\right|}$ の円。$r=\dfrac12$ のとき、実部が $2$ の直線`,
          approach: String.raw`$w=\dfrac{z}{z-1}=1+\dfrac1{z-1}$。$u=z-1$ とおくと $u$ は中心 $\dfrac12$ の円を動き、$\dfrac1u$ は反転。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z+w=zw$ を $w$ について解くと $w\left(z-1\right)=z$ である。$z=1$ だと左辺が $0$、右辺が $1$ で成り立たないので $z\ne1$ であり`,
            },
            {
              k: "math",
              t: String.raw`w=\frac{z}{z-1}=1+\frac{1}{z-1}`,
            },
            {
              k: "p",
              t: String.raw`である。$u=z-1$ とおくと、$z$ の条件 $\left|z-\dfrac32\right|=r$ は`,
            },
            { k: "math", t: String.raw`\left|u-\frac12\right|=r` },
            { k: "p", t: String.raw`であり、$w=1+\dfrac1u$ である。` },
            {
              k: "p",
              t: String.raw`$\left|u-\dfrac12\right|=r$ の両辺を2乗して展開すると、$\dfrac12$ が実数であることから`,
            },
            {
              k: "math",
              t: String.raw`\left|u\right|^{2}-\frac{u+\bar u}{2}+\frac14-r^{2}=0`,
            },
            { k: "p", t: String.raw`である。$s=\dfrac1u$ とおくと $\left|u\right|^{2}=\dfrac1{\left|s\right|^{2}}$、$u+\bar u=\dfrac{s+\bar s}{\left|s\right|^{2}}$ なので、両辺に $\left|s\right|^{2}$ を掛けて` },
            {
              k: "math",
              t: String.raw`1-\frac{s+\bar s}{2}+\left(\frac14-r^{2}\right)\left|s\right|^{2}=0\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$r=\dfrac12$ のとき**。$\dfrac14-r^{2}=0$ なので $\left(\ast\right)$ は` },
            {
              k: "math",
              t: String.raw`1-\frac{s+\bar s}{2}=0,\qquad\mathrm{Re}\left(s\right)=1`,
            },
            {
              k: "p",
              t: String.raw`である。$w=1+s$ だから $\mathrm{Re}\left(w\right)=2$、すなわち**実部が $2$ の直線**である。（このとき $z=1$ は円周上にあるが、$u=0$ に対応する $s$ はないので、ちょうどその1点ぶんだけ $s$ が「無限遠」に抜け、直線全体が得られる。）`,
            },
            { k: "p", t: String.raw`**$r\ne\dfrac12$ のとき**。$k=\dfrac14-r^{2}\ne0$ とおいて $\left(\ast\right)$ を $k$ で割ると` },
            {
              k: "math",
              t: String.raw`\left|s\right|^{2}-\frac{s+\bar s}{2k}+\frac1k=0,\qquad\left|s-\frac{1}{2k}\right|^{2}=\frac{1}{4k^{2}}-\frac1k=\frac{1-4k}{4k^{2}}`,
            },
            { k: "p", t: String.raw`である。$1-4k=4r^{2}$ なので` },
            {
              k: "math",
              t: String.raw`\left|s-\frac{1}{2k}\right|=\frac{r}{\left|k\right|}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{1}{2k}=\dfrac{2}{1-4r^{2}}$、$\dfrac{r}{\left|k\right|}=\dfrac{4r}{\left|1-4r^{2}\right|}$ だから、$w=1+s$ は`,
            },
            {
              k: "math",
              t: String.raw`\left|w-\left(1+\frac{2}{1-4r^{2}}\right)\right|=\frac{4r}{\left|1-4r^{2}\right|}`,
            },
            { k: "p", t: String.raw`をみたす。中心をまとめると` },
            {
              k: "math",
              t: String.raw`1+\frac{2}{1-4r^{2}}=\frac{3-4r^{2}}{1-4r^{2}}`,
            },
            {
              k: "p",
              t: String.raw`なので、**中心 $\dfrac{3-4r^{2}}{1-4r^{2}}$、半径 $\dfrac{4r}{\left|1-4r^{2}\right|}$ の円**である。$u\mapsto\dfrac1u$ は円周と像の円周の1対1の対応なので、円全体が得られる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "r = 1 のとき。うすい円が z の動く円（中心 3/2、半径 1）、太い円が w の描く円（中心 1/3、半径 4/3）。点 1 は z の円の内側にあり、w の円は点 1 を通らない。",
                view: [-1.9, 3.3, -1.6, 1.6],
                items: [
                  { k: "param", f: ZC1(1), from: 0, to: 2 * Math.PI, faint: true },
                  { k: "param", f: WC1(1), from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [1.5, 0], label: "3/2", place: "above-right" },
                  { k: "dot", at: [1 / 3, 0], label: "1/3", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "1", place: "below" },
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption:
                  "r = 1/2 のとき。うすい円（中心 3/2、半径 1/2）は点 1 を通る。このときだけ w は円ではなく、実部が 2 の直線（点線）になる。",
                view: [-0.6, 3.6, -1.6, 1.6],
                items: [
                  { k: "param", f: ZC1(0.5), from: 0, to: 2 * Math.PI, faint: true },
                  { k: "seg", a: [2, -1.6], b: [2, 1.6], dash: true },
                  { k: "dot", at: [1.5, 0], label: "3/2", place: "above" },
                  { k: "dot", at: [1, 0], label: "1", place: "below-left" },
                  { k: "text", at: [2, 1.3], label: "実部が 2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$z=1$ は $w$ を与えない。$r=\dfrac12$ のときだけ円周上に $z=1$ があり、そこで像が直線になる。場合分けの理由はここ。`,
          ],
          check: String.raw`$r=0.25,1,2$ では中心からの距離が一定、$r=\dfrac12$ では実部がつねに $2$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "三角関数・整数",
      topics: ["3倍角と4倍角", "角の和が2π", "有理数解の候補", "背理法"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha=\\tfrac{2\\pi}{7}$ で $\\cos4\\alpha-\\cos3\\alpha=-1.1\\times10^{-16}$、$8c^{4}-4c^{3}-8c^{2}+3c+1$ も $-2.2\\times10^{-16}$ で、ともに $0$ とみなせる",
          "$8x^{3}+4x^{2}-4x-1$ に $\\pm1,\\pm\\tfrac12,\\pm\\tfrac14,\\pm\\tfrac18$ を入れた値は $7,-1,-1,1,-\\tfrac{13}8,\\tfrac18,-\\tfrac{91}{64},-\\tfrac{29}{64}$ で、どれも $0$ でない",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha=\dfrac{2\pi}{7}$ のとき $\cos4\alpha=\cos3\alpha$ を示す`,
          answer: String.raw`$4\alpha+3\alpha=2\pi$ より $4\alpha=2\pi-3\alpha$ なので $\cos4\alpha=\cos\left(2\pi-3\alpha\right)=\cos3\alpha$`,
          approach: String.raw`$7\alpha=2\pi$ を $4\alpha$ と $3\alpha$ に割る。`,
          blocks: [
            { k: "p", t: String.raw`$\alpha=\dfrac{2\pi}{7}$ より $7\alpha=2\pi$ であり` },
            { k: "math", t: String.raw`4\alpha=2\pi-3\alpha` },
            { k: "p", t: String.raw`である。余弦は $2\pi$ の平行移動と符号の反転で変わらないので` },
            {
              k: "math",
              t: String.raw`\cos4\alpha=\cos\left(2\pi-3\alpha\right)=\cos\left(-3\alpha\right)=\cos3\alpha`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "単位円。3α と 4α は和が 2π なので x 軸について対称の位置にあり、x 座標（余弦）が等しい。α 自身の位置も示した。",
                view: [-1.5, 1.5, -1.3, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "seg",
                    a: [0, 0],
                    b: [Math.cos((6 * Math.PI) / 7), Math.sin((6 * Math.PI) / 7)],
                    dash: true,
                  },
                  {
                    k: "seg",
                    a: [0, 0],
                    b: [Math.cos((8 * Math.PI) / 7), Math.sin((8 * Math.PI) / 7)],
                    dash: true,
                  },
                  {
                    k: "seg",
                    a: [Math.cos((6 * Math.PI) / 7), Math.sin((6 * Math.PI) / 7)],
                    b: [Math.cos((8 * Math.PI) / 7), Math.sin((8 * Math.PI) / 7)],
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "dot",
                    at: [Math.cos((6 * Math.PI) / 7), Math.sin((6 * Math.PI) / 7)],
                    label: "3α",
                    place: "above-right",
                  },
                  {
                    k: "dot",
                    at: [Math.cos((8 * Math.PI) / 7), Math.sin((8 * Math.PI) / 7)],
                    label: "4α",
                    place: "below-right",
                  },
                  {
                    k: "dot",
                    at: [Math.cos((2 * Math.PI) / 7), Math.sin((2 * Math.PI) / 7)],
                    label: "α",
                    place: "above-right",
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [],
          check: String.raw`数値では $\cos4\alpha-\cos3\alpha=-1.1\times10^{-16}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$c=\cos\alpha$ とおく。$8c^{3}+4c^{2}-4c-1=0$ を示す`,
          answer: String.raw`$\cos4\alpha=\cos3\alpha$ を $c$ の式に直すと $\left(c-1\right)\left(8c^{3}+4c^{2}-4c-1\right)=0$ となり、$c\ne1$ だから後ろの因数が $0$`,
          approach: String.raw`4倍角と3倍角を $c$ の多項式で書き、差を因数分解する。`,
          blocks: [
            { k: "p", t: String.raw`2倍角を2回使うと` },
            {
              k: "math",
              t: String.raw`\cos4\alpha=2\cos^{2}2\alpha-1=2\left(2c^{2}-1\right)^{2}-1=8c^{4}-8c^{2}+1`,
            },
            { k: "p", t: String.raw`であり、3倍角より` },
            { k: "math", t: String.raw`\cos3\alpha=4c^{3}-3c` },
            { k: "p", t: String.raw`である。(1) より $\cos4\alpha-\cos3\alpha=0$ なので` },
            {
              k: "math",
              t: String.raw`8c^{4}-4c^{3}-8c^{2}+3c+1=0\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\left(\ast\right)$ の左辺に $c=1$ を入れると $8-4-8+3+1=0$ なので、$c-1$ で割り切れて`,
            },
            {
              k: "math",
              t: String.raw`\left(c-1\right)\left(8c^{3}+4c^{2}-4c-1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`と因数分解できる（右の括弧を展開すれば $\left(\ast\right)$ の左辺に戻ることで確かめられる）。ここで $0<\alpha=\dfrac{2\pi}{7}<\dfrac{\pi}{2}$ より $0<c<1$、とくに $c\ne1$ である。よって`,
            },
            { k: "math", t: String.raw`8c^{3}+4c^{2}-4c-1=0` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$c\ne1$ をことわらないと因数 $c-1$ を落とせない。$\left(\ast\right)$ は $\cos\dfrac{2k\pi}{7}$（$k=0,1,2,3$）の4つを根にもつ4次式で、$c=1$ は $k=0$ のぶんである。`,
          ],
          check: String.raw`$c=\cos\dfrac{2\pi}{7}$ で $8c^{4}-4c^{3}-8c^{2}+3c+1=-2.2\times10^{-16}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\cos\dfrac{2\pi}{7}$ が有理数でないことを示す`,
          answer: String.raw`有理数 $\dfrac{p}{q}$（既約）が $8x^{3}+4x^{2}-4x-1=0$ の解なら $p\mid1$、$q\mid8$ で候補は $\pm1,\pm\dfrac12,\pm\dfrac14,\pm\dfrac18$ の8個。どれも解でないので、(2) の解 $\cos\dfrac{2\pi}{7}$ は有理数でない`,
          approach: String.raw`整数係数3次方程式の有理数解を、最高次と定数項の約数にしぼる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\cos\dfrac{2\pi}{7}$ が有理数だと仮定する。(2) より、それは`,
            },
            { k: "math", t: String.raw`f\left(x\right)=8x^{3}+4x^{2}-4x-1` },
            {
              k: "p",
              t: String.raw`の解である。そこで $f\left(\dfrac{p}{q}\right)=0$（$p,q$ は整数、$q\ge1$、$p$ と $q$ は互いに素）とおく。両辺に $q^{3}$ を掛けると`,
            },
            {
              k: "math",
              t: String.raw`8p^{3}+4p^{2}q-4pq^{2}-q^{3}=0\quad\cdots\left(\ast\ast\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$\left(\ast\ast\right)$ を $q^{3}=p\left(8p^{2}+4pq-4q^{2}\right)$ と読むと、$p$ は $q^{3}$ を割り切る。$p$ と $q$ は互いに素なので $p$ と $q^{3}$ も互いに素であり、よって $p=\pm1$ である。`,
            },
            {
              k: "p",
              t: String.raw`同じ $\left(\ast\ast\right)$ を $8p^{3}=q\left(-4p^{2}+4pq+q^{2}\right)$ と読むと、$q$ は $8p^{3}=\pm8$ を割り切る。$q\ge1$ だから $q\in\left\{1,2,4,8\right\}$ である。`,
            },
            {
              k: "p",
              t: String.raw`したがって候補は $\pm1,\pm\dfrac12,\pm\dfrac14,\pm\dfrac18$ の8個しかない。実際に代入すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}f\left(1\right)&=7, & f\left(-1\right)&=-1,\\ f\left(\tfrac12\right)&=-1, & f\left(-\tfrac12\right)&=1,\\ f\left(\tfrac14\right)&=-\tfrac{13}{8}, & f\left(-\tfrac14\right)&=\tfrac18,\\ f\left(\tfrac18\right)&=-\tfrac{91}{64}, & f\left(-\tfrac18\right)&=-\tfrac{29}{64}\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、どれも $0$ にならない。これは矛盾である。よって $\cos\dfrac{2\pi}{7}$ は有理数でない。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$f$ の3つの解は $\cos\dfrac{2\pi}{7},\cos\dfrac{4\pi}{7},\cos\dfrac{6\pi}{7}$（およそ $0.6235,-0.2225,-0.9010$）である。3つとも有理数でないことが同じ議論でわかる。`,
            },
          ],
          alts: [
            {
              title: "候補を4個にしぼる",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$0<\dfrac{2\pi}{7}<\dfrac{\pi}{3}$ なので、余弦が減少であることから $\cos\dfrac{2\pi}{7}>\cos\dfrac{\pi}{3}=\dfrac12$ である。また $\cos\dfrac{2\pi}{7}<1$ である。つまり $\dfrac12<\cos\dfrac{2\pi}{7}<1$ である。`,
                },
                {
                  k: "p",
                  t: String.raw`ところが候補 $\pm1,\pm\dfrac12,\pm\dfrac14,\pm\dfrac18$ のうち、この範囲に入るものは**1つもない**（$1$ は $1$ より小さくなく、残りは $\dfrac12$ 以下である）。したがって代入を1回もせずに矛盾が出る。本解の8個の代入を書くより短いが、不等式 $\dfrac12<\cos\dfrac{2\pi}{7}$ を用意する手間はかかる。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`「3次方程式に有理数解がないから」だけでは理由になっていない。$p\mid$ 定数項、$q\mid$ 最高次係数、を $\left(\ast\ast\right)$ から導くところまで書く。`,
            String.raw`$\left(\ast\right)$ の4次式のままで候補を考えると、定数項も最高次係数も同じなので候補は変わらないが、$c=1$ が解になってしまい矛盾が出ない。(2) で $c-1$ を外しておくのが要点。`,
          ],
          check: String.raw`8個の候補の値はどれも $0$ でなかった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["線分の通過範囲", "包絡線", "2次関数の最大最小", "領域の図示"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$0\\le x\\le1$ を $2000$ 等分し、各 $x$ で $t$ を $4000$ 等分して $y=t-t^{2}x$ の値域を実測したところ、求めた4つの区間の上下端と $1$ 点も食い違わなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$1\le t\le2$ とし、点 $\mathrm{P}\left(0,t\right)$ と点 $\mathrm{Q}\left(\dfrac1t,0\right)$ を結ぶ線分を考える。$t$ がこの範囲を動くとき、線分 $\mathrm{PQ}$ が通過する部分を図示する`,
          answer: String.raw`$0\le x<\dfrac14$ では $1-x\le y\le2-4x$、$\dfrac14\le x\le\dfrac13$ では $1-x\le y\le\dfrac1{4x}$、$\dfrac13\le x\le\dfrac12$ では $2-4x\le y\le\dfrac1{4x}$、$\dfrac12\le x\le1$ では $0\le y\le1-x$`,
          approach: String.raw`$x$ を固定し、$y=t-t^{2}x$ を $t$ の2次関数と見て値域を求める。軸 $t=\dfrac1{2x}$ が区間に入るかで場合分け。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}\left(0,t\right)$、$\mathrm{Q}\left(\dfrac1t,0\right)$ を通る直線は、切片の形から $\dfrac{x}{1/t}+\dfrac yt=1$、すなわち`,
            },
            { k: "math", t: String.raw`y=t-t^{2}x` },
            {
              k: "p",
              t: String.raw`である。線分なので $x$ の範囲は $0\le x\le\dfrac1t$ に限る。`,
            },
            {
              k: "p",
              t: String.raw`そこで $x$ を固定し、$t$ を動かしたときに $y$ がとる値の集合を求める。$x$ が線分に乗る条件は $x\le\dfrac1t$、つまり $t\le\dfrac1x$（$x>0$ のとき）である。したがって $t$ の動く範囲は`,
            },
            {
              k: "math",
              t: String.raw`1\le t\le\min\left(2,\tfrac1x\right)=\begin{cases}2 & \left(0<x\le\tfrac12\right)\\ \tfrac1x & \left(\tfrac12\le x\le1\right)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。$x>1$ では $\dfrac1x<1$ となり $t$ が存在しないので、通過する部分は $0\le x\le1$ にある。`,
            },
            { k: "p", t: String.raw`$g\left(t\right)=t-t^{2}x=-x\left(t-\dfrac1{2x}\right)^{2}+\dfrac1{4x}$ とおく。$x>0$ なので上に凸で、軸は $t=\dfrac1{2x}$、頂点の値は $\dfrac1{4x}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**(i) $\dfrac12\le x\le1$ のとき**。$\dfrac1{2x}\le1$ なので $g$ は $1\le t\le\dfrac1x$ で減少し`,
            },
            {
              k: "math",
              t: String.raw`g\left(\tfrac1x\right)=\tfrac1x-\tfrac1x=0\ \le\ y\ \le\ g\left(1\right)=1-x`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**(ii) $0<x\le\dfrac12$ のとき**。$t$ は $1\le t\le2$ を動く。両端の値は $g\left(1\right)=1-x$、$g\left(2\right)=2-4x$ である。軸が区間に入る条件は $1\le\dfrac1{2x}\le2$、すなわち $\dfrac14\le x\le\dfrac12$ である。`,
            },
            {
              k: "p",
              t: String.raw`$0<x<\dfrac14$ では軸が $2$ より右なので $g$ は区間で増加し、$1-x\le y\le2-4x$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac14\le x\le\dfrac12$ では最大が $\dfrac1{4x}$、最小が両端の小さいほうである。$\left(1-x\right)-\left(2-4x\right)=3x-1$ なので`,
            },
            {
              k: "math",
              t: String.raw`\min\left(1-x,2-4x\right)=\begin{cases}1-x & \left(x\le\tfrac13\right)\\ 2-4x & \left(x\ge\tfrac13\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`まとめると、通過する部分は` },
            {
              k: "math",
              t: String.raw`\begin{cases}1-x\le y\le2-4x & \left(0\le x<\tfrac14\right)\\ 1-x\le y\le\dfrac1{4x} & \left(\tfrac14\le x\le\tfrac13\right)\\ 2-4x\le y\le\dfrac1{4x} & \left(\tfrac13\le x\le\tfrac12\right)\\ 0\le y\le1-x & \left(\tfrac12\le x\le1\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である（境界を含む）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網をかけた部分が通過する部分（境界を含む）。上側の境界は x < 1/4 では t = 2 の線分 y = 2 - 4x、1/4 ≦ x ≦ 1/2 では双曲線 xy = 1/4、x > 1/2 では t = 1 の線分 y = 1 - x。下側の境界は x ≦ 1/3 で y = 1 - x、1/3 ≦ x ≦ 1/2 で y = 2 - 4x、x ≧ 1/2 で x 軸。",
                view: [-0.28, 1.45, -0.32, 2.3],
                step: { x: 0.25, y: 0.25 },
                items: [
                  { k: "fillBetween", top: UP22, bottom: LO22, from: 0, to: 0.5 },
                  { k: "fillBetween", top: UP22, bottom: LO22, from: 0.5, to: 1 },
                  { k: "seg", a: [0, 1], b: [1, 0] },
                  { k: "seg", a: [0, 2], b: [0.5, 0] },
                  {
                    k: "curve",
                    f: (x: number): number => 1 / (4 * x),
                    from: 0.2,
                    to: 1.4,
                    dash: true,
                  },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                  { k: "dot", at: [0, 2], label: "(0, 2)", place: "left" },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below" },
                  { k: "dot", at: [0.5, 0], label: "(1/2, 0)", place: "below-left" },
                  { k: "dot", at: [0.25, 1], label: "(1/4, 1)", place: "above-right" },
                  { k: "dot", at: [1 / 3, 2 / 3], label: "(1/3, 2/3)", place: "below-left" },
                  { k: "text", at: [1.12, 0.3], label: "xy = 1/4", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\dfrac14\le x\le\dfrac12$ での上側の境界 $y=\dfrac1{4x}$ は、直線の族 $y=t-t^{2}x$ の包絡線である。$t$ について $y=-xt^{2}+t$ が解をもつ条件 $1-4xy\ge0$ を考えても同じ式が出る。線分（$t$ の範囲が有限）なので、包絡線が境界になるのは軸が区間に入る $\dfrac14\le x\le\dfrac12$ だけで、その外では端の $t=1,2$ の線分が境界になる。`,
            },
          ],
          pitfalls: [
            String.raw`直線ではなく**線分**なので、$x\le\dfrac1t$ の制約を忘れると $x>\dfrac12$ の部分が広くなりすぎる。`,
            String.raw`最小値を $g\left(1\right)$ だけ、あるいは $g\left(2\right)$ だけで済ませると $x=\dfrac13$ の前後で誤る。`,
          ],
          check: String.raw`$x$ を $2000$ 等分し、各 $x$ で $t$ を $4000$ 等分して測った $y$ の値域が、上の上下端と1点も食い違わなかった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列・微分",
      topics: ["中間値の定理", "平均値の定理", "漸化式の評価", "はさみうちの原理"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$g\\left(x\\right)=f\\left(x\\right)-x$ は $x\\ge0$ で減少し、$g\\left(0\\right)=1>0$、$g\\left(3\\right)<0$。解は $\\alpha=2.1461932$ の1つだけだった",
          "$x_{1}=1$ から漸化式を回すと $\\left|x_{n+1}-\\alpha\\right|/\\left|x_{n}-\\alpha\\right|$ は $0.395,0.343,0.326,0.320$ で、どれも $\\tfrac12$ より小さかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\log\left(x+1\right)+1$ とする。$x>0$ の範囲に $f\left(x\right)=x$ の解がただ1つあることを示す（それを $\alpha$ とする）`,
          answer: String.raw`$g\left(x\right)=f\left(x\right)-x$ は $x>0$ で $g'\left(x\right)=\dfrac1{x+1}-1<0$ より減少、$g\left(0\right)=1>0$、$g\left(3\right)=\log4-2<0$。中間値の定理より解はただ1つ（$\alpha\approx2.146$）`,
          approach: String.raw`差をとって単調性と符号変化。`,
          blocks: [
            { k: "p", t: String.raw`$g\left(x\right)=f\left(x\right)-x=\log\left(x+1\right)+1-x$ とおく。$x>-1$ で` },
            {
              k: "math",
              t: String.raw`g'\left(x\right)=\frac{1}{x+1}-1=\frac{-x}{x+1}`,
            },
            {
              k: "p",
              t: String.raw`なので、$x>0$ では $g'\left(x\right)<0$ であり $g$ は**狭義単調減少**である。よって $x>0$ での解は多くても1つである。`,
            },
            { k: "p", t: String.raw`存在を見る。$g$ は $x\ge0$ で連続で` },
            {
              k: "math",
              t: String.raw`g\left(0\right)=\log1+1-0=1>0`,
            },
            { k: "p", t: String.raw`であり、$\log4<\log\mathrm{e}^{2}=2$ より` },
            {
              k: "math",
              t: String.raw`g\left(3\right)=\log4+1-3=\log4-2<0`,
            },
            {
              k: "p",
              t: String.raw`である。中間値の定理より $0<\alpha<3$ に $g\left(\alpha\right)=0$ をみたす $\alpha$ が存在する。単調性と合わせて、$x>0$ での解はこの $\alpha$ ただ1つである。$\blacksquare$`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 y = log(x+1) + 1 と直線 y = x。交点の x 座標が α（およそ 2.146）。x₁ = 1 から出発して縦・横に折れながら α に近づく様子を点線で示した。",
                view: [-0.55, 3.6, -0.3, 3.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: F22H, from: -0.45, to: 3.6 },
                  { k: "seg", a: [-0.3, -0.3], b: [3.3, 3.3], faint: true },
                  { k: "seg", a: [1, 1], b: [1, F22H(1)], dash: true },
                  { k: "seg", a: [1, F22H(1)], b: [F22H(1), F22H(1)], dash: true },
                  {
                    k: "seg",
                    a: [F22H(1), F22H(1)],
                    b: [F22H(1), F22H(F22H(1))],
                    dash: true,
                  },
                  {
                    k: "seg",
                    a: [F22H(1), F22H(F22H(1))],
                    b: [F22H(F22H(1)), F22H(F22H(1))],
                    dash: true,
                  },
                  {
                    k: "seg",
                    a: [F22H(F22H(1)), F22H(F22H(1))],
                    b: [F22H(F22H(1)), F22H(F22H(F22H(1)))],
                    dash: true,
                  },
                  { k: "dot", at: [AL22, AL22], label: "α", place: "below-right" },
                  { k: "dot", at: [1, 1], label: "x₁ = 1", place: "below-right" },
                  { k: "text", at: [3.15, 2.42], label: "y = f(x)", place: "above" },
                  { k: "text", at: [0.3, 0.3], label: "y = x", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$g\left(3\right)<0$ を示すには $\log4<2$、つまり $4<\mathrm{e}^{2}$ が必要。$\mathrm{e}>2$ より $\mathrm{e}^{2}>4$ でよい。`,
          ],
          check: String.raw`数値では $\alpha=2.1461932$ で、$0<x<10$ に他の解はなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`$x_{1}=1$、$x_{n+1}=f\left(x_{n}\right)$ で定める。すべての $n$ で $x_{n}\ge1$ を示す`,
          answer: String.raw`帰納法。$x_{1}=1\ge1$ で、$x_{n}\ge1$ なら $x_{n+1}=\log\left(x_{n}+1\right)+1\ge\log2+1>1$`,
          approach: String.raw`$f$ が増加であることと $f\left(1\right)>1$ を使う。`,
          blocks: [
            { k: "p", t: String.raw`$f'\left(x\right)=\dfrac1{x+1}>0$（$x>-1$）なので $f$ は増加関数である。` },
            { k: "p", t: String.raw`$n$ についての帰納法で示す。$n=1$ のとき $x_{1}=1\ge1$ でよい。` },
            {
              k: "p",
              t: String.raw`$x_{n}\ge1$ を仮定する。$f$ は増加だから`,
            },
            {
              k: "math",
              t: String.raw`x_{n+1}=f\left(x_{n}\right)\ge f\left(1\right)=\log2+1>1`,
            },
            {
              k: "p",
              t: String.raw`である（$\log2>0$）。よって $x_{n+1}\ge1$ である。以上より、すべての $n$ で $x_{n}\ge1$ である。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`同じ議論で $x_{n}<3$ もわかる。$x_{n}<3$ なら $x_{n+1}<\log4+1<3$ だからである。つまり $\left\{x_{n}\right\}$ は $\left[1,3\right)$ に留まり、$\alpha$ もこの区間にある。`,
            },
          ],
          pitfalls: [
            String.raw`$x_{n}\ge1$ だけでなく「$f$ が増加」を言わないと $f\left(x_{n}\right)\ge f\left(1\right)$ が出ない。`,
          ],
          check: String.raw`$x_{1}\ldots x_{6}=1,1.6931,1.9907,2.0955,2.1300,2.1410$ はすべて $1$ 以上だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\left|x_{n+1}-\alpha\right|\le\dfrac12\left|x_{n}-\alpha\right|$ を示す`,
          answer: String.raw`平均値の定理より $x_{n+1}-\alpha=f\left(x_{n}\right)-f\left(\alpha\right)=f'\left(c\right)\left(x_{n}-\alpha\right)$ となる $c$ が $x_{n}$ と $\alpha$ の間にある。$x_{n}\ge1$、$\alpha>1$ より $c>1$ で $0<f'\left(c\right)=\dfrac1{c+1}<\dfrac12$`,
          approach: String.raw`平均値の定理と $f'$ の評価。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $\alpha>1$ である。実際 $g\left(1\right)=\log2>0$ で $g$ は減少、$g\left(\alpha\right)=0$ だから $\alpha>1$ である。`,
            },
            {
              k: "p",
              t: String.raw`$x_{n}=\alpha$ なら $x_{n+1}=f\left(\alpha\right)=\alpha$ で不等式は成り立つ。$x_{n}\ne\alpha$ とする。$f$ は $x_{n}$ と $\alpha$ を含む閉区間で連続・微分可能なので、平均値の定理より、その区間の内部に`,
            },
            {
              k: "math",
              t: String.raw`f\left(x_{n}\right)-f\left(\alpha\right)=f'\left(c\right)\left(x_{n}-\alpha\right)`,
            },
            {
              k: "p",
              t: String.raw`をみたす $c$ がある。左辺は $x_{n+1}-\alpha$ である。(2) より $x_{n}\ge1$、また $\alpha>1$ なので、その間にある $c$ は $c>1$ をみたす。よって`,
            },
            {
              k: "math",
              t: String.raw`0<f'\left(c\right)=\frac{1}{c+1}<\frac{1}{2}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`\left|x_{n+1}-\alpha\right|=f'\left(c\right)\left|x_{n}-\alpha\right|\le\frac12\left|x_{n}-\alpha\right|`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$c>1$ を出すのに $\alpha>1$ が要る。$\alpha>0$ しか示していないと $c$ が $0$ に近い場合を排除できず、$f'\left(c\right)<\dfrac12$ が言えない。`,
            String.raw`$x_{n}=\alpha$ の場合を平均値の定理で扱おうとすると区間がつぶれる。先に分けておく。`,
          ],
          check: String.raw`実際の比 $\left|x_{n+1}-\alpha\right|/\left|x_{n}-\alpha\right|$ は $0.395,0.343,0.326,0.320$ で、すべて $\dfrac12$ 未満だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}x_{n}=\alpha$ を示す`,
          answer: String.raw`(3) を繰り返すと $\left|x_{n}-\alpha\right|\le\left(\dfrac12\right)^{n-1}\left|x_{1}-\alpha\right|\to0$。はさみうちより $x_{n}\to\alpha$`,
          approach: String.raw`(3) の不等式を $n-1$ 回使う。`,
          blocks: [
            { k: "p", t: String.raw`(3) の不等式を繰り返し使うと` },
            {
              k: "math",
              t: String.raw`0\le\left|x_{n}-\alpha\right|\le\frac12\left|x_{n-1}-\alpha\right|\le\cdots\le\left(\frac12\right)^{n-1}\left|x_{1}-\alpha\right|`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\dfrac12\right|<1$ なので $\left(\dfrac12\right)^{n-1}\to0$ であり、右辺は $0$ に収束する。はさみうちの原理より`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\left|x_{n}-\alpha\right|=0,\qquad\lim_{n\to\infty}x_{n}=\alpha`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\left|x_{1}-\alpha\right|=\left|1-\alpha\right|<2$ なので $\left|x_{n}-\alpha\right|<2^{2-n}$ である。$n=20$ でも誤差は $10^{-5}$ 程度までしか保証されないが、実際の比は $0.32$ 前後なので収束はもっと速い。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|x_{1}-\alpha\right|$ は $\alpha$ を含むが**定数**なので、$n\to\infty$ で $0$ に行く部分は $\left(\dfrac12\right)^{n-1}$ だけ。ここをあいまいにしない。`,
          ],
          check: String.raw`$x_{26}=2.1461932$ で $\alpha$ と小数第7位まで一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分",
      topics: ["媒介変数表示", "面積の公式", "部分積分", "指数関数と三角関数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "曲線上の $200001$ 点を結ぶ多角形にシューレースの公式を当てると面積 $133.62291387$ となり、$\\tfrac{\\mathrm{e}^{2\\pi}-1}{4}=133.62291388$ と小数第7位まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$0\le t\le\pi$ で $x=\mathrm{e}^{t}\cos t+\mathrm{e}^{\pi}$、$y=\mathrm{e}^{t}\sin t$ と表される曲線 $C$ と $x$ 軸で囲まれた部分の面積を求める`,
          answer: String.raw`$\dfrac{\mathrm{e}^{2\pi}-1}{4}$`,
          approach: String.raw`$\dfrac12\displaystyle\int\left(xy'-yx'\right)dt$ を使う。$xy'-yx'=\mathrm{e}^{2t}+\mathrm{e}^{\pi+t}\left(\sin t+\cos t\right)$ で、第2項の積分は $0$。`,
          blocks: [
            { k: "p", t: String.raw`まず曲線の形をつかむ。$0\le t\le\pi$ で $\sin t\ge0$ なので $y\ge0$ であり、$C$ は $x$ 軸より上にある。両端は`,
            },
            {
              k: "math",
              t: String.raw`t=0:\ \left(1+\mathrm{e}^{\pi},0\right),\qquad t=\pi:\ \left(-\mathrm{e}^{\pi}+\mathrm{e}^{\pi},0\right)=\left(0,0\right)`,
            },
            {
              k: "p",
              t: String.raw`で、どちらも $x$ 軸上にある。よって $C$ と $x$ 軸上の線分（$0\le x\le1+\mathrm{e}^{\pi}$）が閉じた曲線をなす。`,
            },
            { k: "p", t: String.raw`微分すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}x'&=\mathrm{e}^{t}\left(\cos t-\sin t\right)\\ y'&=\mathrm{e}^{t}\left(\sin t+\cos t\right)\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$x'=0$ となるのは $t=\dfrac{\pi}{4}$ のみで、$x$ はそこまで増加し、そのあと減少する。つまり $x$ は単調でないので、$\displaystyle\int y\,dx$ をそのまま使うと場合分けが必要になる。そこで、閉曲線で囲まれた面積の公式`,
            },
            {
              k: "math",
              t: String.raw`S=\frac12\left|\oint\left(x\,dy-y\,dx\right)\right|`,
            },
            {
              k: "p",
              t: String.raw`を使う。$x$ 軸上の線分では $y=0$、$dy=0$ なので $x\,dy-y\,dx=0$ であり、寄与しない。したがって $C$ のぶんだけを計算すればよい。`,
            },
            { k: "p", t: String.raw`被積分関数を作ると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}xy'-yx'&=\left(\mathrm{e}^{t}\cos t+\mathrm{e}^{\pi}\right)\mathrm{e}^{t}\left(\sin t+\cos t\right)-\mathrm{e}^{t}\sin t\cdot\mathrm{e}^{t}\left(\cos t-\sin t\right)\\ &=\mathrm{e}^{2t}\left(\cos t\sin t+\cos^{2}t-\sin t\cos t+\sin^{2}t\right)+\mathrm{e}^{\pi+t}\left(\sin t+\cos t\right)\\ &=\mathrm{e}^{2t}+\mathrm{e}^{\pi+t}\left(\sin t+\cos t\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`である。第2項の積分は` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\pi}\mathrm{e}^{t}\left(\sin t+\cos t\right)dt=\Bigl[\mathrm{e}^{t}\sin t\Bigr]_{0}^{\pi}=0-0=0`,
            },
            {
              k: "p",
              t: String.raw`である（$\left(\mathrm{e}^{t}\sin t\right)'=\mathrm{e}^{t}\left(\sin t+\cos t\right)$ だから、原始関数がそのまま見える）。第1項は`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\pi}\mathrm{e}^{2t}\,dt=\left[\frac{\mathrm{e}^{2t}}{2}\right]_{0}^{\pi}=\frac{\mathrm{e}^{2\pi}-1}{2}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`S=\frac12\cdot\frac{\mathrm{e}^{2\pi}-1}{2}=\frac{\mathrm{e}^{2\pi}-1}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（$t$ が増える向きに回ると内部が左手にあるので、絶対値をつけなくても正になる）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網をかけた部分の面積を求めた。t = 0 のとき x 軸上の右端にあり、t = π で原点に戻る。x は t = π/4 までわずかに増えてから減るので、右側が t = 0 の点より少しだけ外へふくらむ。",
                view: [-2.5, 27.5, -1.6, 9.3],
                step: { x: 5, y: 2 },
                items: [
                  {
                    k: "fill",
                    pts: Array.from({ length: 241 }, (_, i) => C22((Math.PI * i) / 240)),
                  },
                  { k: "param", f: C22, from: 0, to: Math.PI },
                  { k: "dot", at: [0, 0], label: "t = π", place: "below-right" },
                  {
                    k: "dot",
                    at: [1 + Math.exp(Math.PI), 0],
                    label: "t = 0",
                    place: "below-left",
                  },
                  {
                    k: "dot",
                    at: C22((3 * Math.PI) / 4),
                    label: "y が最大",
                    place: "above",
                  },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\mathrm{e}^{\pi}$ の平行移動が面積に効かないのは、$\displaystyle\int_{0}^{\pi}\mathrm{e}^{t}\left(\sin t+\cos t\right)dt=\Bigl[\mathrm{e}^{t}\sin t\Bigr]_{0}^{\pi}=0$ と、両端で $\sin t=0$ になることが原因である。$\mathrm{e}^{\pi}$ の値そのものは答えに現れない。`,
            },
          ],
          alts: [
            {
              title: "平行移動してから極方程式として見る",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$X=x-\mathrm{e}^{\pi}$、$Y=y$ とおくと $X=\mathrm{e}^{t}\cos t$、$Y=\mathrm{e}^{t}\sin t$ なので、原点からの距離が $r=\mathrm{e}^{t}$、偏角が $\theta=t$ の**対数螺旋** $r=\mathrm{e}^{\theta}$ である。`,
                },
                {
                  k: "p",
                  t: String.raw`$X$-$Y$ 平面では、$\theta$ が $0$ から $\pi$ まで動くときに動径が掃く部分の面積が`,
                },
                {
                  k: "math",
                  t: String.raw`\frac12\int_{0}^{\pi}r^{2}\,d\theta=\frac12\int_{0}^{\pi}\mathrm{e}^{2\theta}\,d\theta=\frac{\mathrm{e}^{2\pi}-1}{4}`,
                },
                {
                  k: "p",
                  t: String.raw`である。螺旋の両端 $\left(1,0\right)$ と $\left(-\mathrm{e}^{\pi},0\right)$ はどちらも $X$ 軸上にあるので、「動径が掃く部分」は「螺旋と $X$ 軸で囲まれた部分」とちょうど一致する。平行移動は面積を変えないので、求める面積も $\dfrac{\mathrm{e}^{2\pi}-1}{4}$ である。`,
                },
                {
                  k: "p",
                  t: String.raw`$\mathrm{e}^{\pi}$ だけずらしてあるのは、$x\ge0$ の側に図形を置くための見かけの操作にすぎなかったとわかる。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$x$ が単調でないので $\displaystyle\int_{0}^{1+\mathrm{e}^{\pi}}y\,dx$ と書くのは危ない。$t=\dfrac{\pi}{4}$ で折り返す。媒介変数のままの公式を使うか、$\displaystyle\int_{0}^{\pi}y\,x'\,dt$ と書いて向きまで含めて素直に計算する。`,
            String.raw`$\left(\mathrm{e}^{t}\sin t\right)'=\mathrm{e}^{t}\left(\sin t+\cos t\right)$ に気づかないと部分積分を2回回すことになる。$\mathrm{e}^{t}\cos t$ の微分も合わせて覚えておく。`,
          ],
          check: String.raw`曲線上 $200001$ 点のシューレースで $133.62291387$、$\dfrac{\mathrm{e}^{2\pi}-1}{4}=133.62291388$。`,
        },
      ],
    },
  ],
};
