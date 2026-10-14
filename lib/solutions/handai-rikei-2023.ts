import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2023年度（令和5年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。$\tfrac{x^{n}}{1+x}$ とその上下の評価（図は $n=4$）。 */
const N1J = 2;
const MID1 = (x: number): number => x ** N1J / (1 + x);
const LO1 = (x: number): number => x ** N1J / 2;
const HI1 = (x: number): number => x ** N1J - x ** (N1J + 1) / 2;

/** 第2問。$\vec u=\left(1,0\right)$、$\vec v=\left(0,1\right)$ とすると $\vec a+\vec b=\left(\tfrac13,\tfrac13\right)$。 */
const C2J: [number, number] = [1 / 3, 1 / 3];

/** 第3問。$N\left(\mathrm{P}\right)=4$ の範囲の上下の境界。 */
const UP3 = (a: number): number => (a < Math.PI / 2 ? Math.PI / 2 - a : Math.cos(a));
const LO3 = (a: number): number =>
  a < Math.PI / 2 ? Math.cos(a) : Math.max(-1, Math.PI / 2 - a);

export const handaiRikei2023: SolutionSet = {
  slug: "handai-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "極限",
      topics: ["等比数列の和", "不等式ではさむ", "交代級数", "はさみうちの原理"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3,5,8$ と $0\\leqq x\\leqq1$ の $1001$ 点で、真ん中の式が $\\tfrac{x^{n}}{1+x}$ に一致し、両側の不等式も成り立った",
          "$\\left(-1\\right)^{n}n\\left(a_n-\\log2\\right)$ は $n=10,100,1000,10000$ で $-0.4751,-0.4975,-0.49975,-0.499975$ となった",
          "$-\\tfrac12$ に近づいている",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n\geqq2$ の自然数とする。$0\leqq x\leqq1$ のとき $\dfrac12x^{n}\leqq\left(-1\right)^{n}\left\{\dfrac1{x+1}-1-\displaystyle\sum_{k=2}^{n}\left(-x\right)^{k-1}\right\}\leqq x^{n}-\dfrac12x^{n+1}$ を示す`,
          answer: String.raw`真ん中は $\dfrac{x^{n}}{1+x}$ に等しく、$0\leqq x\leqq1$ では $\dfrac12\leqq\dfrac1{1+x}\leqq\dfrac{2-x}{2}$`,
          approach: String.raw`$1+\displaystyle\sum_{k=2}^{n}\left(-x\right)^{k-1}=\sum_{k=1}^{n}\left(-x\right)^{k-1}$ は公比 $-x$ の等比数列の和。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1+\displaystyle\sum_{k=2}^{n}\left(-x\right)^{k-1}=\sum_{k=1}^{n}\left(-x\right)^{k-1}$ は初項 $1$、公比 $-x$ の等比数列の和である。$x=1$ でも $-x=-1\ne1$ なので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{n}\left(-x\right)^{k-1}=\frac{1-\left(-x\right)^{n}}{1+x}`,
            },
            { k: "p", t: String.raw`である。したがって真ん中の中かっこは` },
            {
              k: "math",
              t: String.raw`\frac{1}{x+1}-\frac{1-\left(-x\right)^{n}}{1+x}=\frac{\left(-x\right)^{n}}{1+x}`,
            },
            { k: "p", t: String.raw`となり、$\left(-1\right)^{n}$ を掛けると $\left(-1\right)^{2n}=1$ なので` },
            {
              k: "math",
              t: String.raw`\left(-1\right)^{n}\left\{\frac1{x+1}-1-\sum_{k=2}^{n}\left(-x\right)^{k-1}\right\}=\frac{x^{n}}{1+x}`,
            },
            { k: "p", t: String.raw`である。あとは $0\leqq x\leqq1$ で` },
            {
              k: "math",
              t: String.raw`\frac12x^{n}\leqq\frac{x^{n}}{1+x}\leqq x^{n}-\frac12x^{n+1}=x^{n}\cdot\frac{2-x}{2}`,
            },
            {
              k: "p",
              t: String.raw`を示せばよい。$x^{n}\geqq0$ なので、$x=0$ なら3つとも $0$ で等号。$0<x\leqq1$ なら $x^{n}>0$ で割って`,
            },
            {
              k: "math",
              t: String.raw`\frac12\leqq\frac{1}{1+x}\leqq\frac{2-x}{2}`,
            },
            { k: "p", t: String.raw`を示せばよい。左は $1+x\leqq2$、つまり $x\leqq1$ から従う。右は` },
            {
              k: "math",
              t: String.raw`\frac{2-x}{2}-\frac{1}{1+x}=\frac{\left(2-x\right)\left(1+x\right)-2}{2\left(1+x\right)}=\frac{x-x^{2}}{2\left(1+x\right)}=\frac{x\left(1-x\right)}{2\left(1+x\right)}\geqq0`,
            },
            { k: "p", t: String.raw`から従う。（証明終わり）` },
            {
              k: "figure",
              fig: {
                caption:
                  "図は n = 2 のとき。真ん中の曲線が xⁿ/(1+x) で、うすい2本は下の線 xⁿ/2 と上の線 xⁿ − x^(n+1)/2。塗った帯のなかに収まっていて、x = 0 と x = 1 では3本とも重なる。",
                view: [-0.12, 1.22, -0.07, 0.63],
                items: [
                  { k: "fillBetween", top: HI1, bottom: LO1, from: 0, to: 1 },
                  { k: "curve", f: HI1, from: 0, to: 1, faint: true },
                  { k: "curve", f: LO1, from: 0, to: 1, faint: true },
                  { k: "curve", f: MID1, from: 0, to: 1 },
                  { k: "dot", at: [1, 0.5], label: "x = 1", place: "right" },
                  { k: "text", at: [0.5, HI1(0.5)], label: "上の線", place: "above-left" },
                  { k: "text", at: [0.86, LO1(0.86)], label: "下の線", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$n=2,3,5,8$ と $0\leqq x\leqq1$ の $1001$ 点で、不等式も $\dfrac{x^{n}}{1+x}$ との一致も成り立った。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_n=\displaystyle\sum_{k=1}^{n}\frac{\left(-1\right)^{k-1}}{k}$ とするとき $\displaystyle\lim_{n\to\infty}\left(-1\right)^{n}n\left(a_n-\log2\right)$ を求める`,
          answer: String.raw`$-\dfrac12$`,
          approach: String.raw`(1) の等式を $0$ から $1$ まで積分すると、左辺が $\log2-a_n$ に化ける。`,
          blocks: [
            { k: "p", t: String.raw`(1) の途中で示した` },
            {
              k: "math",
              t: String.raw`\frac{x^{n}}{1+x}=\left(-1\right)^{n}\left\{\frac{1}{1+x}-\sum_{k=1}^{n}\left(-x\right)^{k-1}\right\}`,
            },
            { k: "p", t: String.raw`を $0$ から $1$ まで積分する。$\displaystyle\int_0^1\frac{dx}{1+x}=\log2$、$\displaystyle\int_0^1x^{k-1}dx=\frac1k$ なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\frac{x^{n}}{1+x}dx=\left(-1\right)^{n}\left\{\log2-\sum_{k=1}^{n}\frac{\left(-1\right)^{k-1}}{k}\right\}=\left(-1\right)^{n}\left(\log2-a_n\right)`,
            },
            { k: "p", t: String.raw`である。つまり` },
            {
              k: "math",
              t: String.raw`\left(-1\right)^{n}n\left(a_n-\log2\right)=-n\int_{0}^{1}\frac{x^{n}}{1+x}dx`,
            },
            { k: "p", t: String.raw`である。(1) の不等式を $0$ から $1$ まで積分すると` },
            {
              k: "math",
              t: String.raw`\frac{1}{2\left(n+1\right)}\leqq\int_{0}^{1}\frac{x^{n}}{1+x}dx\leqq\frac{1}{n+1}-\frac{1}{2\left(n+2\right)}`,
            },
            { k: "p", t: String.raw`である。$n$ を掛けると` },
            {
              k: "math",
              t: String.raw`\frac{n}{2\left(n+1\right)}\leqq n\int_{0}^{1}\frac{x^{n}}{1+x}dx\leqq\frac{n}{n+1}-\frac{n}{2\left(n+2\right)}`,
            },
            {
              k: "p",
              t: String.raw`で、$n\to\infty$ のとき左辺は $\dfrac12$、右辺は $1-\dfrac12=\dfrac12$ に収束する。はさみうちの原理より`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}n\int_{0}^{1}\frac{x^{n}}{1+x}dx=\frac12`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\left(-1\right)^{n}n\left(a_n-\log2\right)=-\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a_n$ は $\log2$ に「交互に近づく」級数。差はおよそ $\dfrac{\left(-1\right)^{n-1}}{2n}$ で、符号を打ち消すと $-\dfrac12$ が残る、というのがこの問題の言っていること。`,
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\int_0^1\frac{x^{n}}{1+x}dx$ をそのまま計算しようとしない。(1) の不等式ではさむのが筋。`,
          ],
          check: String.raw`$n=10,100,1000,10000$ で $-0.4751,-0.4975,-0.49975,-0.499975$ となり、$-\dfrac12$ に近づいた。`,
        },
      ],
    },
    {
      no: 2,
      field: "ベクトル",
      topics: ["内積の計算", "正規直交な組をつくる", "円板と半平面", "距離の最大最小"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec u=\\left(1,0\\right)$、$\\vec v=\\left(0,1\\right)$ から $\\vec a,\\vec b$ を作ると、$\\left|2\\vec a+\\vec b\\right|=\\left|\\vec a+2\\vec b\\right|=1$ と $\\left(2\\vec a+\\vec b\\right)\\cdot\\left(\\vec a+\\vec b\\right)=\\tfrac13$ が成り立った",
          "そのとき $\\left(2\\vec a+\\vec b\\right)\\cdot\\left(\\vec a+2\\vec b\\right)=0$ だった",
          "領域を $1201\\times1201$ の格子で走査すると $\\left|\\overrightarrow{\\mathrm{OP}}\\right|$ の最大は $0.7453560$（$\\tfrac{\\sqrt5}3$）、最小は $0.1382787$（$\\tfrac{\\sqrt2-1}3=0.1380712$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ が $\left|2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}\right|=1$ かつ $\left(2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\cdot\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)=\dfrac13$ をみたすとき、$\left(2\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)\cdot\left(\overrightarrow{\mathrm{OA}}+2\overrightarrow{\mathrm{OB}}\right)$ を求める`,
          answer: String.raw`$0$`,
          approach: String.raw`$\vec u=2\vec a+\vec b$、$\vec v=\vec a+2\vec b$ とおくと $\vec a+\vec b=\dfrac{\vec u+\vec v}{3}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$ とし、$\vec u=2\vec a+\vec b$、$\vec v=\vec a+2\vec b$ とおく。$\vec u+\vec v=3\left(\vec a+\vec b\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\vec a+\vec b=\frac{\vec u+\vec v}{3}`,
            },
            { k: "p", t: String.raw`である。与えられた条件は $\left|\vec u\right|=\left|\vec v\right|=1$ と` },
            {
              k: "math",
              t: String.raw`\vec u\cdot\frac{\vec u+\vec v}{3}=\frac13,\qquad\left|\vec u\right|^{2}+\vec u\cdot\vec v=1`,
            },
            { k: "p", t: String.raw`である。$\left|\vec u\right|^{2}=1$ なので` },
            { k: "math", t: String.raw`\vec u\cdot\vec v=0` },
            {
              k: "p",
              t: String.raw`である。求めるものはこの $\vec u\cdot\vec v$ そのものなので、答えは $0$ である。`,
            },
            {
              k: "note",
              t: String.raw`$\left|\vec u\right|=\left|\vec v\right|=1$ で $\vec u\perp\vec v$。つまり $\vec u,\vec v$ は正規直交な組で、これを座標軸にとると (2) が見やすくなる。`,
            },
          ],
          check: String.raw`$\vec u=\left(1,0\right)$、$\vec v=\left(0,1\right)$ から $\vec a,\vec b$ を作ると条件がすべて成り立ち、内積は $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`平面上の点 $\mathrm{P}$ が $\left|\overrightarrow{\mathrm{OP}}-\left(\vec a+\vec b\right)\right|\leqq\dfrac13$ かつ $\overrightarrow{\mathrm{OP}}\cdot\left(2\vec a+\vec b\right)\leqq\dfrac13$ をみたすように動くとき、$\left|\overrightarrow{\mathrm{OP}}\right|$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{\sqrt5}{3}$、最小値 $\dfrac{\sqrt2-1}{3}$`,
          approach: String.raw`$\vec u,\vec v$ を座標軸にとる。条件は「中心 $\left(\tfrac13,\tfrac13\right)$ 半径 $\tfrac13$ の円板」と「$x\leqq\tfrac13$」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $\vec u,\vec v$ は正規直交なので、これを座標軸にとって $\vec u=\left(1,0\right)$、$\vec v=\left(0,1\right)$ とする。このとき`,
            },
            {
              k: "math",
              t: String.raw`\vec a+\vec b=\frac{\vec u+\vec v}{3}=\left(\frac13,\frac13\right)`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OP}}=\left(x,y\right)$ とおくと、条件は` },
            {
              k: "math",
              t: String.raw`\left(x-\frac13\right)^{2}+\left(y-\frac13\right)^{2}\leqq\frac19\quad\text{かつ}\quad x\leqq\frac13`,
            },
            {
              k: "p",
              t: String.raw`である。中心 $\mathrm{C}\left(\tfrac13,\tfrac13\right)$ の $x$ 座標がちょうど $\tfrac13$ なので、この領域は円板をちょうど半分に切った**左半分**（直径を含む）である。`,
            },
            { k: "p", t: String.raw`$\mathrm{OC}=\sqrt{\dfrac19+\dfrac19}=\dfrac{\sqrt2}{3}>\dfrac13$ なので、原点 $\mathrm{O}$ は円の外にある。` },
            { k: "p", t: String.raw`**最小**。円板全体で $\mathrm{O}$ に最も近いのは、線分 $\mathrm{OC}$ を $\mathrm{C}$ の側に延ばして円と交わる手前の点` },
            {
              k: "math",
              t: String.raw`\mathrm{P}_0=\mathrm{C}-\frac13\cdot\frac{\overrightarrow{\mathrm{OC}}}{\left|\overrightarrow{\mathrm{OC}}\right|}=\left(\frac13\left(1-\frac{1}{\sqrt2}\right),\ \frac13\left(1-\frac{1}{\sqrt2}\right)\right)`,
            },
            {
              k: "p",
              t: String.raw`で、その $x$ 座標は $\dfrac13\left(1-\dfrac1{\sqrt2}\right)<\dfrac13$ なので半平面の条件もみたす。よって最小値は`,
            },
            {
              k: "math",
              t: String.raw`\left|\mathrm{OC}\right|-\frac13=\frac{\sqrt2}{3}-\frac13=\frac{\sqrt2-1}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最大**。円板全体での最遠点は $\mathrm{C}$ の向こう側 $\left(\tfrac13\left(1+\tfrac1{\sqrt2}\right),\ \tfrac13\left(1+\tfrac1{\sqrt2}\right)\right)$ だが、$x$ 座標が $\tfrac13$ を超えるので使えない。そこで境界 $x=\dfrac13$（直径）の上で考えると、$\left|\overrightarrow{\mathrm{OP}}\right|^{2}=\dfrac19+y^{2}$ で $0\leqq y\leqq\dfrac23$ だから、$y=\dfrac23$ のとき最大で`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|=\sqrt{\frac19+\frac49}=\frac{\sqrt5}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。円弧（$x\leqq\tfrac13$ の側）の上では、$\mathrm{P}=\mathrm{C}+\dfrac13\left(\cos\theta,\sin\theta\right)$（$\cos\theta\leqq0$）として`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OP}}\right|^{2}=\frac13+\frac29\left(\cos\theta+\sin\theta\right)\leqq\frac13+\frac29=\frac59`,
            },
            {
              k: "p",
              t: String.raw`（$\dfrac{\pi}{2}\leqq\theta\leqq\dfrac{3\pi}{2}$ で $\cos\theta+\sin\theta=\sqrt2\sin\left(\theta+\tfrac{\pi}{4}\right)\leqq1$、等号は $\theta=\dfrac{\pi}{2}$）なので、やはり $\dfrac{\sqrt5}{3}$ を超えない。したがって最大値は $\dfrac{\sqrt5}{3}$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "u, v を座標軸にとったときの領域（塗った左半分の円板）。中心は (1/3, 1/3)、半径は 1/3。原点から最も遠いのは上の端 (1/3, 2/3)、最も近いのは中心へ向かう向きの点。",
                view: [-0.45, 0.95, -0.22, 0.85],
                items: [
                  {
                    k: "fill",
                    pts: [
                      [1 / 3, 0],
                      ...Array.from({ length: 41 }, (_, i): [number, number] => {
                        const th = Math.PI / 2 + (Math.PI * i) / 40;
                        return [C2J[0] + Math.cos(th) / 3, C2J[1] + Math.sin(th) / 3];
                      }),
                    ],
                  },
                  {
                    k: "param",
                    f: (th: number): [number, number] => [
                      C2J[0] + Math.cos(th) / 3,
                      C2J[1] + Math.sin(th) / 3,
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0, 0], b: [1 / 3, 2 / 3], dash: true, faint: true },
                  { k: "seg", a: [0, 0], b: [C2J[0] * 1.9, C2J[1] * 1.9], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: C2J, label: "C", place: "right" },
                  { k: "dot", at: [1 / 3, 2 / 3], label: "最大", place: "above-right" },
                  {
                    k: "dot",
                    at: [(1 - 1 / Math.SQRT2) / 3, (1 - 1 / Math.SQRT2) / 3],
                    label: "最小",
                    place: "below-right",
                  },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`半平面で切られるので、円板だけで考えた最遠点は使えない。切り口（直径）の端も候補に入れる。`,
          ],
          check: String.raw`$1201\times1201$ の格子で走査すると最大 $0.7453560$（$\dfrac{\sqrt5}3$）、最小 $0.1382787$（$\dfrac{\sqrt2-1}3=0.1380712$）だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分（接線の本数）",
      topics: ["接線が通る条件", "解の個数と増減", "端点も数える", "領域の図示"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$h\\left(t\\right)=\\cos t+\\left(t-a\\right)\\sin t$ の解の個数を $40$ 万点走査で数え、$a=0.5,1,2.2$ などで $\\cos a<b<\\tfrac{\\pi}2-a$（または $\\tfrac{\\pi}2-a<b<\\cos a$）のときだけ $4$ になった",
          "$a=2.5707$（$<\\tfrac{\\pi}2+1$）では $b=\\tfrac{\\pi}2-a$ で $3$、$a=2.5709$（$>\\tfrac{\\pi}2+1$）では $b=-1$ で $4$ になった",
          "$a=2.8,3.0,3.1$ でも $b=-1$ で $4$、$b<-1$ では $2$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{P}\left(a,b\right)$ とする。$-\pi\leqq t\leqq\pi$ の実数 $t$ のうち、曲線 $y=\cos x$ 上の点 $\left(t,\cos t\right)$ における接線が $\mathrm{P}$ を通るものの個数を $N\left(\mathrm{P}\right)$ とする。$N\left(\mathrm{P}\right)=4$ かつ $0<a<\pi$ をみたす $\mathrm{P}$ の存在範囲を求める`,
          answer: String.raw`$0<a<\dfrac{\pi}{2}$ では $\cos a<b<\dfrac{\pi}{2}-a$、$\dfrac{\pi}{2}<a\leqq\dfrac{\pi}{2}+1$ では $\dfrac{\pi}{2}-a<b<\cos a$、$\dfrac{\pi}{2}+1<a<\pi$ では $-1\leqq b<\cos a$（$a=\dfrac{\pi}{2}$ のときはない）`,
          approach: String.raw`接線が通る条件を $b=h\left(t\right)$ の形にし、$h'\left(t\right)=\left(t-a\right)\cos t$ の符号で増減を調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(t,\cos t\right)$ における接線は $y=\cos t-\sin t\left(x-t\right)$ である。$\mathrm{P}\left(a,b\right)$ を通る条件は`,
            },
            {
              k: "math",
              t: String.raw`b=\cos t+\left(t-a\right)\sin t\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。$h\left(t\right)=\cos t+\left(t-a\right)\sin t$ とおくと` },
            {
              k: "math",
              t: String.raw`h'\left(t\right)=-\sin t+\sin t+\left(t-a\right)\cos t=\left(t-a\right)\cos t`,
            },
            {
              k: "p",
              t: String.raw`である。$N\left(\mathrm{P}\right)$ は $-\pi\leqq t\leqq\pi$ における $h\left(t\right)=b$ の解の個数である。端の値は`,
            },
            {
              k: "math",
              t: String.raw`h\left(-\pi\right)=h\left(\pi\right)=-1,\quad h\left(-\frac{\pi}{2}\right)=\frac{\pi}{2}+a,\quad h\left(\frac{\pi}{2}\right)=\frac{\pi}{2}-a,\quad h\left(a\right)=\cos a`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$0<a<\dfrac{\pi}{2}$ のとき**。$h'=\left(t-a\right)\cos t$ の符号は $\left(-\pi,-\tfrac{\pi}{2}\right)$ で正、$\left(-\tfrac{\pi}{2},a\right)$ で負、$\left(a,\tfrac{\pi}{2}\right)$ で正、$\left(\tfrac{\pi}{2},\pi\right)$ で負である。つまり`,
            },
            {
              k: "math",
              t: String.raw`-1\nearrow\frac{\pi}{2}+a\searrow\cos a\nearrow\frac{\pi}{2}-a\searrow-1`,
            },
            {
              k: "p",
              t: String.raw`と動く。$\cos a<\dfrac{\pi}{2}-a$（$\varphi\left(a\right)=\dfrac{\pi}{2}-a-\cos a$ は $\varphi'=\sin a-1\leqq0$ で減少、$\varphi\left(\tfrac{\pi}{2}\right)=0$ なので $0<a<\tfrac{\pi}{2}$ で $\varphi>0$）だから、4本の単調な区間すべてで解をもつのは`,
            },
            {
              k: "math",
              t: String.raw`\cos a<b<\frac{\pi}{2}-a`,
            },
            { k: "p", t: String.raw`のときである（等号では2本が1点で重なり $3$ 個になる）。` },
            {
              k: "p",
              t: String.raw`**$a=\dfrac{\pi}{2}$ のとき**。$h'=\left(t-\tfrac{\pi}{2}\right)\cos t$ は $\left(-\pi,-\tfrac{\pi}{2}\right)$ で正、$\left(-\tfrac{\pi}{2},\pi\right)$ で負なので、単調な区間が2つしかなく $N\leqq2$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\dfrac{\pi}{2}<a<\pi$ のとき**。符号は $\left(-\pi,-\tfrac{\pi}{2}\right)$ で正、$\left(-\tfrac{\pi}{2},\tfrac{\pi}{2}\right)$ で負、$\left(\tfrac{\pi}{2},a\right)$ で正、$\left(a,\pi\right)$ で負なので`,
            },
            {
              k: "math",
              t: String.raw`-1\nearrow\frac{\pi}{2}+a\searrow\frac{\pi}{2}-a\nearrow\cos a\searrow-1`,
            },
            {
              k: "p",
              t: String.raw`と動く。今度は $\dfrac{\pi}{2}-a<\cos a$（$\psi\left(a\right)=\cos a+a-\dfrac{\pi}{2}$ は $\psi'=1-\sin a\geqq0$ で増加、$\psi\left(\tfrac{\pi}{2}\right)=0$）である。4つの単調な区間の値域はそれぞれ`,
            },
            {
              k: "math",
              t: String.raw`\left[-1,\tfrac{\pi}{2}+a\right],\ \left[\tfrac{\pi}{2}-a,\tfrac{\pi}{2}+a\right],\ \left[\tfrac{\pi}{2}-a,\cos a\right],\ \left[-1,\cos a\right]`,
            },
            { k: "p", t: String.raw`なので、4つすべてに $b$ が入るのは` },
            {
              k: "math",
              t: String.raw`\max\left(-1,\ \frac{\pi}{2}-a\right)\leqq b\leqq\cos a`,
            },
            {
              k: "p",
              t: String.raw`のときである。ただし端では重なりが起きる。$b=\cos a$ では $t=a$ で2区間が重なって $3$ 個、$b=\dfrac{\pi}{2}-a$（これが $-1$ より大きいとき）では $t=\dfrac{\pi}{2}$ で重なって $3$ 個である。一方 $b=-1$ は $t=-\pi$ と $t=\pi$ という**異なる2つの $t$** を与えるので重なりではない。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\dfrac{\pi}{2}<a\leqq\dfrac{\pi}{2}+1$（このとき $\dfrac{\pi}{2}-a\geqq-1$）：$\dfrac{\pi}{2}-a<b<\cos a$`,
                String.raw`$\dfrac{\pi}{2}+1<a<\pi$（このとき $\dfrac{\pi}{2}-a<-1$）：$-1\leqq b<\cos a$`,
              ],
            },
            { k: "p", t: String.raw`である。まとめると求める範囲は` },
            {
              k: "steps",
              items: [
                String.raw`$0<a<\dfrac{\pi}{2}$：$\cos a<b<\dfrac{\pi}{2}-a$`,
                String.raw`$a=\dfrac{\pi}{2}$：なし`,
                String.raw`$\dfrac{\pi}{2}<a\leqq\dfrac{\pi}{2}+1$：$\dfrac{\pi}{2}-a<b<\cos a$`,
                String.raw`$\dfrac{\pi}{2}+1<a<\pi$：$-1\leqq b<\cos a$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "N(P) = 4 となる範囲（塗った部分）。左の山は 0 < a < π/2 で曲線 b = cos a と直線 b = π/2 − a のあいだ、右の部分は π/2 < a < π で直線 b = π/2 − a（または b = −1）と曲線 b = cos a のあいだ。a = π/2 では range がつぶれる。",
                view: [-0.3, 3.5, -1.5, 1.78],
                items: [
                  {
                    k: "fillBetween",
                    top: UP3,
                    bottom: LO3,
                    from: 0.001,
                    to: Math.PI / 2 - 0.001,
                  },
                  {
                    k: "fillBetween",
                    top: UP3,
                    bottom: LO3,
                    from: Math.PI / 2 + 0.001,
                    to: Math.PI - 0.001,
                  },
                  { k: "curve", f: (a: number) => Math.cos(a), from: 0, to: Math.PI },
                  { k: "seg", a: [0, Math.PI / 2], b: [3.2, Math.PI / 2 - 3.2] },
                  { k: "seg", a: [-0.3, -1], b: [3.5, -1], dash: true, faint: true },
                  { k: "dot", at: [Math.PI / 2, 0] },
                  { k: "text", at: [0.42, Math.cos(0.42)], label: "b = cos a", place: "below-left" },
                  { k: "text", at: [2.6, Math.PI / 2 - 2.6], label: "b = π/2 − a", place: "below-left" },
                  { k: "text", at: [3.4, -1], label: "b = −1", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$t=-\pi$ と $t=\pi$ はどちらも同じ直線 $y=-1$ を与えるが、$t$ としては別物なので $2$ 個と数える。$a$ が $\dfrac{\pi}{2}+1$ を超えると $b=-1$ が範囲に入るのは、このためである。`,
            },
          ],
          pitfalls: [
            String.raw`数えるのは「接線の本数」ではなく「条件をみたす $t$ の個数」。$t=\pm\pi$ を1つにまとめない。`,
            String.raw`$b$ が極大・極小の値に一致すると2つの区間が1点で重なって $3$ 個になる。端の扱いがこの問題の山。`,
          ],
          check: String.raw`$40$ 万点走査で解の個数を数えると、上の範囲の内部でだけ $4$ になり、$a=2.5709$ では $b=-1$ でも $4$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["垂線の足", "射影の長さ", "外積の大きさ", "2次曲線"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,x,y$ をランダムに2万組とり、$\\mathrm{Q}$ を垂線の足として計算すると $\\left(\\overrightarrow{\\mathrm{AP}}\\cdot\\overrightarrow{\\mathrm{AO}}\\right)^{2}=\\left|\\overrightarrow{\\mathrm{AP}}\\right|^{2}\\left|\\overrightarrow{\\mathrm{AQ}}\\right|^{2}$ が成り立った",
          "$\\left(a,b\\right)=\\left(0,2\\right),\\left(1,1\\right),\\left(1,0.5\\right),\\left(-1.5,1.2\\right)$ について、求めた曲線上の点ではつねに $\\left|\\overrightarrow{\\mathrm{OQ}}\\right|=1$ になった",
          "$b^{2}>1$ で楕円、$b^{2}=1$ で放物線、$b^{2}<1$ で双曲線という分類も数値と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a^{2}+b^{2}>1$、$b\ne0$ とし、$\mathrm{A}\left(a,0,b\right)$、$\mathrm{P}\left(x,y,0\right)$ とする。$\mathrm{O}$ を通り直線 $\mathrm{AP}$ に垂直な平面を $\alpha$、$\alpha$ と直線 $\mathrm{AP}$ の交点を $\mathrm{Q}$ とするとき、$\left(\overrightarrow{\mathrm{AP}}\cdot\overrightarrow{\mathrm{AO}}\right)^{2}=\left|\overrightarrow{\mathrm{AP}}\right|^{2}\left|\overrightarrow{\mathrm{AQ}}\right|^{2}$ を示す`,
          answer: String.raw`$\mathrm{Q}$ は $\mathrm{O}$ から直線 $\mathrm{AP}$ に下ろした垂線の足なので、$\overrightarrow{\mathrm{AQ}}$ は $\overrightarrow{\mathrm{AO}}$ の $\overrightarrow{\mathrm{AP}}$ 方向への正射影`,
          approach: String.raw`$\overrightarrow{\mathrm{OQ}}\perp\overrightarrow{\mathrm{AP}}$ から $\overrightarrow{\mathrm{AQ}}=\dfrac{\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}}{\left|\overrightarrow{\mathrm{AP}}\right|^{2}}\overrightarrow{\mathrm{AP}}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $z=0$ の平面上、$\mathrm{A}$ は $z=b\ne0$ なので $\mathrm{A}\ne\mathrm{P}$、つまり $\overrightarrow{\mathrm{AP}}\ne\vec0$ である。$\alpha$ は $\overrightarrow{\mathrm{AP}}$ を法線とする平面で $\mathrm{O}$ を通るから、$\mathrm{Q}\in\alpha$ より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}\cdot\overrightarrow{\mathrm{AP}}=0`,
            },
            {
              k: "p",
              t: String.raw`である。つまり $\mathrm{Q}$ は $\mathrm{O}$ から直線 $\mathrm{AP}$ に下ろした垂線の足である。$\mathrm{Q}$ は直線 $\mathrm{AP}$ 上なので $\overrightarrow{\mathrm{AQ}}=k\overrightarrow{\mathrm{AP}}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}=\overrightarrow{\mathrm{AQ}}-\overrightarrow{\mathrm{AO}}=k\overrightarrow{\mathrm{AP}}-\overrightarrow{\mathrm{AO}}`,
            },
            { k: "p", t: String.raw`で、これと $\overrightarrow{\mathrm{AP}}$ の内積が $0$ だから` },
            {
              k: "math",
              t: String.raw`k=\frac{\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}}{\left|\overrightarrow{\mathrm{AP}}\right|^{2}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{AQ}}\right|^{2}=k^{2}\left|\overrightarrow{\mathrm{AP}}\right|^{2}=\frac{\left(\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}\right)^{2}}{\left|\overrightarrow{\mathrm{AP}}\right|^{2}}`,
            },
            {
              k: "p",
              t: String.raw`となり、両辺に $\left|\overrightarrow{\mathrm{AP}}\right|^{2}$ を掛ければ求める等式になる。（証明終わり）`,
            },
          ],
          check: String.raw`ランダムに2万組とって確かめると、両辺の差は相対誤差 $10^{-6}$ 以下だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\left|\overrightarrow{\mathrm{OQ}}\right|=1$ をみたすように $\mathrm{P}\left(x,y,0\right)$ が $xy$ 平面上を動くときの $\mathrm{P}$ の軌跡を求める`,
          answer: String.raw`$\left(b^{2}-1\right)x^{2}+\left(a^{2}+b^{2}-1\right)y^{2}+2ax-\left(a^{2}+b^{2}\right)=0$。$b^{2}>1$ なら楕円、$b^{2}=1$ なら放物線、$b^{2}<1$ なら双曲線`,
          approach: String.raw`$\left|\overrightarrow{\mathrm{OQ}}\right|^{2}=\left|\overrightarrow{\mathrm{AO}}\right|^{2}-\left|\overrightarrow{\mathrm{AQ}}\right|^{2}$。(1) を使うと外積の形にまとまる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OQ}\perp\mathrm{AQ}$ なので三平方の定理から`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OQ}}\right|^{2}=\left|\overrightarrow{\mathrm{AO}}\right|^{2}-\left|\overrightarrow{\mathrm{AQ}}\right|^{2}`,
            },
            { k: "p", t: String.raw`である。(1) より $\left|\overrightarrow{\mathrm{AQ}}\right|^{2}=\dfrac{\left(\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}\right)^{2}}{\left|\overrightarrow{\mathrm{AP}}\right|^{2}}$ だから、$\left|\overrightarrow{\mathrm{OQ}}\right|=1$ は` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{AO}}\right|^{2}\left|\overrightarrow{\mathrm{AP}}\right|^{2}-\left(\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}\right)^{2}=\left|\overrightarrow{\mathrm{AP}}\right|^{2}`,
            },
            {
              k: "p",
              t: String.raw`と同値である。左辺は $\left|\overrightarrow{\mathrm{AO}}\times\overrightarrow{\mathrm{AP}}\right|^{2}$ である。$\overrightarrow{\mathrm{AO}}=\left(-a,0,-b\right)$、$\overrightarrow{\mathrm{AP}}=\left(x-a,y,-b\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AO}}\times\overrightarrow{\mathrm{AP}}=\left(by,\ -bx,\ -ay\right)`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`b^{2}y^{2}+b^{2}x^{2}+a^{2}y^{2}=\left(x-a\right)^{2}+y^{2}+b^{2}`,
            },
            { k: "p", t: String.raw`となる。展開して整理すると` },
            {
              k: "math",
              t: String.raw`\left(b^{2}-1\right)x^{2}+\left(a^{2}+b^{2}-1\right)y^{2}+2ax-\left(a^{2}+b^{2}\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$a^{2}+b^{2}-1>0$ なので $y^{2}$ の係数は正であり、形は $x^{2}$ の係数 $b^{2}-1$ で決まる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$b^{2}>1$：$x^{2},y^{2}$ の係数がともに正なので**楕円**`,
                String.raw`$b^{2}=1$（このとき $a\ne0$）：$x$ の1次と $y^{2}$ だけが残り $a^{2}y^{2}+2ax-\left(a^{2}+1\right)=0$、すなわち**放物線**`,
                String.raw`$b^{2}<1$：係数の符号が逆なので**双曲線**`,
              ],
            },
            {
              k: "p",
              t: String.raw`である（$b^{2}=1$ で $a=0$ だと $a^{2}+b^{2}=1$ となり条件 $a^{2}+b^{2}>1$ に反するので、$b^{2}=1$ のときは必ず $a\ne0$）。$b^{2}\ne1$ のときは平方完成して`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(x+\frac{a}{b^{2}-1}\right)^{2}}{\frac{b^{2}\left(a^{2}+b^{2}-1\right)}{\left(b^{2}-1\right)^{2}}}+\frac{y^{2}}{\frac{b^{2}}{b^{2}-1}}=1`,
            },
            { k: "p", t: String.raw`と書ける。` },
            {
              k: "note",
              t: String.raw`$a=0$、$b=2$ なら $3x^{2}+3y^{2}-4=0$、つまり原点中心・半径 $\dfrac{2}{\sqrt3}$ の円になる。対称性からも納得できる。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\overrightarrow{\mathrm{AO}}\right|^{2}\left|\overrightarrow{\mathrm{AP}}\right|^{2}-\left(\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}\right)^{2}$ は外積の大きさの2乗。これに気づくと成分計算がぐっと短くなる。`,
          ],
          check: String.raw`4組の $\left(a,b\right)$ について、求めた曲線上の点ではつねに $\left|\overrightarrow{\mathrm{OQ}}\right|=1$ になった。`,
        },
      ],
    },
    {
      no: 5,
      field: "確率",
      topics: ["漸化式でつなぐ", "合同式", "逆元", "確率の漸化式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,\\ldots,5$ を全探索すると $p_n=0,\\tfrac16,\\tfrac5{36},\\tfrac{31}{216},\\tfrac{185}{1296}$ だった",
          "これは $\\tfrac17\\left\\{1-\\left(-\\tfrac16\\right)^{n-1}\\right\\}$ と分数のまま一致した",
          "$b_{n+1}=a_1b_n+a_{n+1}$ も全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`さいころを $n$ 回投げ、$k$ 回目の目を $a_k$ とする。$b_n=\displaystyle\sum_{k=1}^{n}a_1^{\,n-k}a_k$ が $7$ の倍数となる確率を $p_n$ とするとき、$p_1,p_2$ を求める`,
          answer: String.raw`$p_1=0$、$p_2=\dfrac16$`,
          approach: String.raw`$b_1=a_1$ は $1$ から $6$ なので $7$ の倍数にならない。$b_2=a_1^{2}+a_2$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$b_1=a_1$ で、$a_1$ は $1$ から $6$ のどれかだから $7$ の倍数にならない。よって $p_1=0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$b_2=a_1a_1+a_2=a_1^{2}+a_2$ である。$a_1$ を固定すると $a_1^{2}$ を $7$ で割った余りは決まる。$a_1=1,\ldots,6$ に対して $a_1^{2}\equiv1,4,2,2,4,1\pmod7$ で、どれも $0$ でない。したがって $a_2\equiv-a_1^{2}\pmod7$ をみたす $a_2$ の余りは $1$ から $6$ のどれかであり、$a_2\in\left\{1,\ldots,6\right\}$ のなかにちょうど1つある。`,
            },
            { k: "p", t: String.raw`よって $a_1$ がどれであっても確率 $\dfrac16$ で、` },
            { k: "math", t: String.raw`p_2=\frac16` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`全探索すると $p_1=0$、$p_2=\dfrac16$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`数列 $\left\{p_n\right\}$ の一般項を求める`,
          answer: String.raw`$p_n=\dfrac17\left\{1-\left(-\dfrac16\right)^{n-1}\right\}$`,
          approach: String.raw`$b_{n+1}=a_1b_n+a_{n+1}$。$a_1$ は $7$ と互いに素なので、$b_n\not\equiv0$ のときだけ次が $7$ の倍数になりうる。`,
          blocks: [
            { k: "p", t: String.raw`定義から` },
            {
              k: "math",
              t: String.raw`b_{n+1}=\sum_{k=1}^{n+1}a_1^{\,n+1-k}a_k=a_1\sum_{k=1}^{n}a_1^{\,n-k}a_k+a_{n+1}=a_1b_n+a_{n+1}`,
            },
            {
              k: "p",
              t: String.raw`である。$a_1\in\left\{1,\ldots,6\right\}$ なので $a_1$ は $7$ の倍数でなく、$7$ を法として逆元をもつ。`,
            },
            {
              k: "p",
              t: String.raw`$b_{n+1}\equiv0\pmod7$ は $a_{n+1}\equiv-a_1b_n\pmod7$ と同じである。$a_{n+1}$ は $1$ から $6$ までを等しい確率でとるので`,
            },
            {
              k: "steps",
              items: [
                String.raw`$b_n\equiv0$ のとき：$-a_1b_n\equiv0$ なので $a_{n+1}\equiv0$ が要るが、そんな目はない。確率 $0$`,
                String.raw`$b_n\not\equiv0$ のとき：$a_1$ が逆元をもつので $-a_1b_n\not\equiv0$、つまり $1$ から $6$ のなかにちょうど1つ。確率 $\dfrac16$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`p_{n+1}=0\cdot p_n+\frac16\left(1-p_n\right)=-\frac16p_n+\frac16`,
            },
            { k: "p", t: String.raw`である。$p=-\dfrac16p+\dfrac16$ を解くと $p=\dfrac17$ なので` },
            {
              k: "math",
              t: String.raw`p_{n+1}-\frac17=-\frac16\left(p_n-\frac17\right)`,
            },
            { k: "p", t: String.raw`である。$p_1-\dfrac17=-\dfrac17$ だから` },
            {
              k: "math",
              t: String.raw`p_n-\frac17=-\frac17\left(-\frac16\right)^{n-1},\qquad p_n=\frac17\left\{1-\left(-\frac16\right)^{n-1}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n\to\infty$ で $p_n\to\dfrac17$。$7$ で割った余りが結局は一様にならされる、という当たり前の結論に落ち着く。$a_1$ の値によらないのがきれいなところ。`,
            },
          ],
          pitfalls: [
            String.raw`$a_1$ は最初の1回だけでなく、$b_n$ の式にずっと出てくる。$a_1$ を固定して条件つき確率を考えるのが安全。`,
          ],
          check: String.raw`$n=1,\ldots,5$ の全探索で $0,\dfrac16,\dfrac5{36},\dfrac{31}{216},\dfrac{185}{1296}$ となり、式と分数のまま一致した。`,
        },
      ],
    },
  ],
};
