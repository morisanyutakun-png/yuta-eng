import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2020年度（令和2年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。$f\left(x\right)=\left(x+1\right)^{\frac{1}{x+1}}$。 */
const F20 = (x: number): number => (x + 1) ** (1 / (x + 1));
const XM20 = Math.E - 1;
const YM20 = Math.E ** (1 / Math.E);

/** 第4問。$t=3$ のときの領域の上側の境界 $\min\left(\tfrac1x,3-x\right)$。 */
const TOP20 = (x: number): number => Math.min(1 / x, 3 - x);
const ZERO20 = (): number => 0;
const AL20 = (3 - Math.sqrt(5)) / 2;
const BE20 = (3 + Math.sqrt(5)) / 2;

export const handaiRikei2020: SolutionSet = {
  slug: "handai-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "大阪大学",
  short: "阪大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・極限",
      topics: ["対数微分法", "増減表", "極限", "グラフの概形"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$0\\le x\\le10$ を $20$ 万等分して $f$ の最大を探すと $1.444667861$（$x=1.7183$）で、$\\mathrm{e}^{1/\\mathrm{e}}=1.444667861$、$\\mathrm{e}-1=1.718282$ と一致した",
          "$f\\left(10\\right),f\\left(10^{3}\\right),f\\left(10^{6}\\right),f\\left(10^{9}\\right)=1.2436,1.00693,1.0000138,1.0000000$ で $1$ に近づき、$f'$ は $-1.4\\times10^{-2},-5.9\\times10^{-6},-1.0\\times10^{-9}$ と $0$ に近づいた",
          "$f'\\left(x\\right)=f\\left(x\\right)\\dfrac{1-\\log\\left(x+1\\right)}{\\left(x+1\\right)^{2}}$ と数値微分の差は最大 $1.2\\times10^{-10}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\left(x+1\right)^{\frac{1}{x+1}}$（$x\ge0$）の最大値を求める`,
          answer: String.raw`$\mathrm{e}^{\frac1{\mathrm{e}}}$（$x=\mathrm{e}-1$ のとき）`,
          approach: String.raw`$\log f=\dfrac{\log\left(x+1\right)}{x+1}$ を微分する。`,
          blocks: [
            { k: "p", t: String.raw`$x\ge0$ では $x+1\ge1>0$ なので $f\left(x\right)>0$ であり、対数がとれる。` },
            {
              k: "math",
              t: String.raw`\log f\left(x\right)=\frac{\log\left(x+1\right)}{x+1}`,
            },
            { k: "p", t: String.raw`である。両辺を $x$ で微分すると` },
            {
              k: "math",
              t: String.raw`\frac{f'\left(x\right)}{f\left(x\right)}=\frac{\frac{1}{x+1}\left(x+1\right)-\log\left(x+1\right)}{\left(x+1\right)^{2}}=\frac{1-\log\left(x+1\right)}{\left(x+1\right)^{2}}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=f\left(x\right)\cdot\frac{1-\log\left(x+1\right)}{\left(x+1\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$f\left(x\right)>0$、$\left(x+1\right)^{2}>0$ なので、$f'$ の符号は $1-\log\left(x+1\right)$ の符号と同じである。`,
            },
            {
              k: "math",
              t: String.raw`1-\log\left(x+1\right)=0\iff x+1=\mathrm{e}\iff x=\mathrm{e}-1`,
            },
            {
              k: "p",
              t: String.raw`であり、$\log$ は増加関数なので、$0\le x<\mathrm{e}-1$ では $f'>0$、$x>\mathrm{e}-1$ では $f'<0$ である。よって $f$ は $x=\mathrm{e}-1$ で最大になり、最大値は`,
            },
            {
              k: "math",
              t: String.raw`f\left(\mathrm{e}-1\right)=\mathrm{e}^{\frac1{\mathrm{e}}}`,
            },
            { k: "p", t: String.raw`である（$\mathrm{e}^{1/\mathrm{e}}\doteqdot1.4447$）。` },
          ],
          pitfalls: [
            String.raw`$\left(x+1\right)^{\frac{1}{x+1}}$ は底も指数も動くので、そのままでは微分の公式が使えない。対数をとるか $\mathrm{e}^{\frac{\log\left(x+1\right)}{x+1}}$ と書き直す。`,
            String.raw`$x\ge0$ という定義域の左端 $x=0$ でも $f\left(0\right)=1$ が定まる。端点も増減表に入れておく。`,
          ],
          check: String.raw`$20$ 万等分の走査で最大 $1.444667861$（$x=1.7183$）、$\mathrm{e}^{1/\mathrm{e}}=1.444667861$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{x\to\infty}f\left(x\right)$ と $\displaystyle\lim_{x\to\infty}f'\left(x\right)$ を求める（$\displaystyle\lim_{x\to\infty}\dfrac{\log x}{x}=0$ を用いてよい）`,
          answer: String.raw`$\displaystyle\lim_{x\to\infty}f\left(x\right)=1$、$\displaystyle\lim_{x\to\infty}f'\left(x\right)=0$`,
          approach: String.raw`$\log f=\dfrac{\log\left(x+1\right)}{x+1}\to0$ から $f\to1$。$f'$ は $f$ と $\dfrac{1-\log\left(x+1\right)}{\left(x+1\right)^{2}}$ の積。`,
          blocks: [
            { k: "p", t: String.raw`$u=x+1$ とおくと $x\to\infty$ のとき $u\to\infty$ で` },
            {
              k: "math",
              t: String.raw`\log f\left(x\right)=\frac{\log u}{u}\longrightarrow0`,
            },
            { k: "p", t: String.raw`である。$\mathrm{e}^{v}$ は連続なので` },
            {
              k: "math",
              t: String.raw`\lim_{x\to\infty}f\left(x\right)=\mathrm{e}^{0}=1`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`次に $f'$ を見る。(1) より` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=f\left(x\right)\cdot\frac{1-\log u}{u^{2}}=f\left(x\right)\cdot\left(\frac{1}{u^{2}}-\frac1u\cdot\frac{\log u}{u}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$u\to\infty$ のとき $\dfrac{1}{u^{2}}\to0$、$\dfrac1u\to0$、$\dfrac{\log u}{u}\to0$ なので、括弧の中は $0$ に収束する。$f\left(x\right)\to1$ だから`,
            },
            {
              k: "math",
              t: String.raw`\lim_{x\to\infty}f'\left(x\right)=1\cdot0=0`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{\log u}{u^{2}}$ を直接 $0$ と言うのではなく、与えられた $\dfrac{\log u}{u}\to0$ に $\dfrac1u\to0$ を掛ける形に直して使うと、根拠がはっきりする。`,
          ],
          check: String.raw`$f\left(10^{9}\right)=1.0000000$、$f'\left(10^{5}\right)=-1.0\times10^{-9}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$y=f\left(x\right)$ のグラフの概形をかく（凹凸は調べなくてよい）`,
          answer: String.raw`$\left(0,1\right)$ から出て増加し、$x=\mathrm{e}-1$ で最大値 $\mathrm{e}^{1/\mathrm{e}}$ をとったあと減少し、直線 $y=1$ に上から近づく`,
          approach: String.raw`(1) の増減と (2) の漸近線をつなぐ。`,
          blocks: [
            { k: "p", t: String.raw`(1)(2) をまとめると、$x\ge0$ での $f$ の様子は` },
            {
              k: "steps",
              items: [
                String.raw`$f\left(0\right)=1^{1}=1$ から始まる。`,
                String.raw`$0\le x<\mathrm{e}-1$ で増加し、$x=\mathrm{e}-1\doteqdot1.718$ で最大値 $\mathrm{e}^{1/\mathrm{e}}\doteqdot1.445$ をとる。`,
                String.raw`$x>\mathrm{e}-1$ で減少する。`,
                String.raw`$x\to\infty$ で $f\left(x\right)\to1$、かつ $f'\left(x\right)\to0$ なので、直線 $y=1$ が漸近線で、グラフはそこへ水平に寝ていく。`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。なお $x>0$ では $\log\left(x+1\right)>0$ より $\log f\left(x\right)>0$、つまり $f\left(x\right)>1$ なので、グラフは漸近線 $y=1$ の**上側**から近づく。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) の概形。x = 0 で 1、x = e − 1 ≒ 1.718 で最大値 e^(1/e) ≒ 1.445、そのあとは減少して点線 y = 1 に上から近づく。",
                view: [-0.45, 4.55, -0.15, 1.65],
                step: { x: 1, y: 0.5 },
                items: [
                  { k: "curve", f: F20, from: 0, to: 4.55 },
                  { k: "seg", a: [-0.45, 1], b: [4.55, 1], dash: true },
                  { k: "dot", at: [XM20, YM20], label: "最大 e^(1/e)", place: "above" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "below-right" },
                  { k: "text", at: [4.45, 1], label: "y = 1", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$y=1$ に**上から**近づくこと、$x=0$ でも値が $1$ であることを図に反映させる。左端と漸近線が同じ高さなのがこのグラフの特徴。`,
          ],
          check: String.raw`数値でも $f$ は $x=1.7183$ で最大 $1.4447$、$x=10^{9}$ で $1.0000000$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率・複素数平面",
      topics: ["複素数の積と偏角", "剰余による分類", "確率漸化式", "極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,\\ldots,6$ でさいころの目の出方を全列挙すると、$Z_{1},\\ldots,Z_{n}$ がいずれも実数でない確率は $\\tfrac13,\\tfrac5{18},\\tfrac{25}{108},\\tfrac{125}{648},\\tfrac{625}{3888},\\tfrac{3125}{23328}$ で、$\\tfrac13\\left(\\tfrac56\\right)^{n-1}$ と完全に一致した",
          "同じ全列挙で $Z_{n}$ が実数になる確率は $\\tfrac23,\\tfrac12,\\tfrac5{12},\\tfrac38,\\tfrac{17}{48},\\tfrac{11}{32}$ で、$\\tfrac13+\\tfrac23\\left(\\tfrac12\\right)^{n}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`1個のさいころを $n$ 回投げ、$k$ 回目の目が $1$ なら $X_{k}=1$、$2$ なら $X_{k}=-1$、その他なら $X_{k}=0$ とする。$Y_{k}=\cos\dfrac{\pi}{3}X_{k}+i\sin\dfrac{\pi}{3}X_{k}$、$Z_{n}=Y_{1}Y_{2}\cdots Y_{n}$ とおく。$Z_{2}$ が実数でない確率を求める`,
          answer: String.raw`$\dfrac12$`,
          approach: String.raw`$Z_{n}$ の偏角は $\dfrac{\pi}{3}S_{n}$（$S_{n}=X_{1}+\cdots+X_{n}$）。実数 $\iff$ $S_{n}$ が $3$ の倍数。`,
          blocks: [
            { k: "p", t: String.raw`ド・モアブルの定理より $Y_{k}=\mathrm{e}^{i\frac{\pi}{3}X_{k}}$ と書けるので` },
            {
              k: "math",
              t: String.raw`Z_{n}=\mathrm{e}^{i\frac{\pi}{3}S_{n}},\qquad S_{n}=X_{1}+X_{2}+\cdots+X_{n}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|Z_{n}\right|=1$ なので、$Z_{n}$ が実数であることは $\sin\dfrac{\pi}{3}S_{n}=0$、すなわち $\dfrac{\pi}{3}S_{n}$ が $\pi$ の整数倍であること、つまり`,
            },
            {
              k: "math",
              t: String.raw`S_{n}\ \text{が}\ 3\ \text{の倍数}`,
            },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`各回の $X_{k}$ は $1,-1,0$ をそれぞれ確率 $\dfrac16,\dfrac16,\dfrac46=\dfrac23$ でとる。$n=2$ のとき $\left|S_{2}\right|\le2$ なので、$S_{2}$ が $3$ の倍数になるのは $S_{2}=0$ のときだけである。これは`,
            },
            {
              k: "steps",
              items: [
                String.raw`2回とも $X=0$：確率 $\left(\dfrac23\right)^{2}=\dfrac49$`,
                String.raw`一方が $1$、他方が $-1$：確率 $2\cdot\dfrac16\cdot\dfrac16=\dfrac1{18}$`,
              ],
            },
            { k: "p", t: String.raw`の2通りで、合わせて` },
            {
              k: "math",
              t: String.raw`P\left(S_{2}=0\right)=\frac49+\frac1{18}=\frac{8+1}{18}=\frac12`,
            },
            { k: "p", t: String.raw`である。よって $Z_{2}$ が実数でない確率は` },
            {
              k: "math",
              t: String.raw`1-\frac12=\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "Yₖ は単位円上の 3 点のどれか（角 0、π/3、−π/3）。Zₙ は角 (π/3)Sₙ の点なので、Zₙ が実数になるのは点が 1 か −1 にあるとき、つまり Sₙ が 3 の倍数のときだけ。",
                view: [-2.6, 2.6, -1.4, 1.4],
                step: { x: 1, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "dot", at: [1, 0], label: "Xₖ = 0 なら Yₖ = 1", place: "below-right" },
                  { k: "dot", at: [0.5, Math.sqrt(3) / 2], label: "Xₖ = 1", place: "above-right" },
                  { k: "dot", at: [0.5, -Math.sqrt(3) / 2], label: "Xₖ = −1", place: "below-right" },
                  { k: "dot", at: [-1, 0], label: "−1（実数）", place: "below-left" },
                  { k: "dot", at: [-0.5, Math.sqrt(3) / 2] },
                  { k: "dot", at: [-0.5, -Math.sqrt(3) / 2] },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$Z_{n}$ の絶対値は $1$ なので、「実数」とは $\pm1$ のこと。$0$ になることはない。`,
          ],
          check: String.raw`$n=2$ の全列挙でも $Z_{2}$ が実数になる確率は $\dfrac12$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$Z_{1},Z_{2},\ldots,Z_{n}$ がいずれも実数でない確率を求める`,
          answer: String.raw`$\dfrac13\left(\dfrac56\right)^{n-1}$`,
          approach: String.raw`$S_{k}$ を $3$ で割った余りの動きを見る。$0$ から出て、一度も $0$ に戻らない確率。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S_{k}$ を $3$ で割った余り $r_{k}\in\left\{0,1,2\right\}$ を追う。$r_{0}=0$ で、各回 $r$ は確率 $\dfrac16$ ずつ $\pm1$ 動き、確率 $\dfrac23$ で動かない（法 $3$ で考える）。条件は`,
            },
            {
              k: "math",
              t: String.raw`r_{1}\ne0,\ r_{2}\ne0,\ \ldots,\ r_{n}\ne0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**1回目**。$r_{0}=0$ から $r_{1}\ne0$ になるのは $X_{1}=\pm1$ のときで、確率は $\dfrac16+\dfrac16=\dfrac13$ である。`,
            },
            {
              k: "p",
              t: String.raw`**2回目以降**。いま $r_{k}\ne0$（$r_{k}=1$ または $2$）だとする。$r_{k}=1$ のとき $r_{k+1}=0$ になるのは $X_{k+1}=-1$ のときだけ、$r_{k}=2$ のとき $r_{k+1}=0$ になるのは $X_{k+1}=1$ のときだけである。どちらの場合も確率 $\dfrac16$ なので、$0$ にならない確率は`,
            },
            {
              k: "math",
              t: String.raw`1-\frac16=\frac56`,
            },
            {
              k: "p",
              t: String.raw`である。これは $r_{k}$ が $1$ でも $2$ でも同じ値であり、しかも各回の $X$ は独立なので、そのまま掛け算してよい。`,
            },
            { k: "p", t: String.raw`したがって求める確率は` },
            {
              k: "math",
              t: String.raw`\frac13\left(\frac56\right)^{n-1}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$0$ に戻らない確率」が $r_{k}=1$ か $2$ かによらず $\dfrac56$ で一定なのが鍵。ここが場合によって違うと単純な積にはできない。`,
            String.raw`$n=1$ のとき答えは $\dfrac13$ で、$\left(\dfrac56\right)^{0}=1$ と整合する。`,
          ],
          check: String.raw`$n=1,\ldots,6$ の全列挙で $\dfrac13,\dfrac5{18},\dfrac{25}{108},\dfrac{125}{648},\dfrac{625}{3888},\dfrac{3125}{23328}$ となり、式と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$Z_{n}$ が実数となる確率を $p_{n}$ とする。$p_{n}$ を $n$ で表し、$\displaystyle\lim_{n\to\infty}p_{n}$ を求める`,
          answer: String.raw`$p_{n}=\dfrac13+\dfrac23\left(\dfrac12\right)^{n}=\dfrac{2^{n-1}+1}{3\cdot2^{n-1}}$、極限は $\dfrac13$`,
          approach: String.raw`$p_{n}=P\left(r_{n}=0\right)$ の漸化式を作る。対称性から $P\left(r_{n}=1\right)=P\left(r_{n}=2\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p_{n}=P\left(r_{n}=0\right)$、$q_{n}=P\left(r_{n}=1\right)$、$s_{n}=P\left(r_{n}=2\right)$ とおく。$X$ は $+1$ と $-1$ を同じ確率でとり、出発点が $0$ なので、$S_{n}$ と $-S_{n}$ は同じ分布をもつ。よって`,
            },
            {
              k: "math",
              t: String.raw`q_{n}=s_{n}=\frac{1-p_{n}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$r_{n+1}=0$ になるのは、$r_{n}=0$ で $X_{n+1}=0$、$r_{n}=1$ で $X_{n+1}=-1$、$r_{n}=2$ で $X_{n+1}=1$ の3通りなので`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac23p_{n}+\frac16q_{n}+\frac16s_{n}=\frac23p_{n}+\frac16\left(1-p_{n}\right)=\frac12p_{n}+\frac16`,
            },
            { k: "p", t: String.raw`である。特性方程式 $\alpha=\dfrac12\alpha+\dfrac16$ の解は $\alpha=\dfrac13$ なので` },
            {
              k: "math",
              t: String.raw`p_{n+1}-\frac13=\frac12\left(p_{n}-\frac13\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$p_{0}=1$（$S_{0}=0$ は $3$ の倍数）なので $p_{0}-\dfrac13=\dfrac23$ であり`,
            },
            {
              k: "math",
              t: String.raw`p_{n}=\frac13+\frac23\left(\frac12\right)^{n}=\frac{2^{n-1}+1}{3\cdot2^{n-1}}`,
            },
            {
              k: "p",
              t: String.raw`である。実際 $p_{1}=\dfrac13+\dfrac13=\dfrac23$（$X_{1}=0$ のとき）、$p_{2}=\dfrac13+\dfrac16=\dfrac12$ で (1) と合う。`,
            },
            { k: "p", t: String.raw`$\left|\dfrac12\right|<1$ なので` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}p_{n}=\frac13`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`極限 $\dfrac13$ は、余り $0,1,2$ が平等に近づくことを意味している。(2) の確率が $\left(\dfrac56\right)^{n-1}$ で $0$ に落ちるのとは対照的に、$p_{n}$ は $\dfrac13$ に落ち着く。`,
            },
          ],
          alts: [
            {
              title: "1の3乗根を使う",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$\omega=\mathrm{e}^{\frac{2\pi i}{3}}$ とおく。$\dfrac{1+\omega^{m}+\omega^{2m}}{3}$ は $m$ が $3$ の倍数なら $1$、そうでなければ $0$ なので`,
                },
                {
                  k: "math",
                  t: String.raw`p_{n}=E\left[\frac{1+\omega^{S_{n}}+\omega^{2S_{n}}}{3}\right]=\frac{1+E\left[\omega^{S_{n}}\right]+E\left[\omega^{2S_{n}}\right]}{3}`,
                },
                {
                  k: "p",
                  t: String.raw`である。独立性から $E\left[\omega^{S_{n}}\right]=\left(E\left[\omega^{X}\right]\right)^{n}$ で`,
                },
                {
                  k: "math",
                  t: String.raw`E\left[\omega^{X}\right]=\frac16\omega+\frac16\omega^{-1}+\frac23=\frac13\cos\frac{2\pi}{3}+\frac23=-\frac16+\frac23=\frac12`,
                },
                {
                  k: "p",
                  t: String.raw`である。$\omega^{2}$ についても同じく $\dfrac12$ なので`,
                },
                {
                  k: "math",
                  t: String.raw`p_{n}=\frac{1+2\left(\frac12\right)^{n}}{3}=\frac13+\frac23\left(\frac12\right)^{n}`,
                },
                { k: "p", t: String.raw`となり、同じ式が得られる。` },
              ],
            },
          ],
          pitfalls: [
            String.raw`$p_{0}=1$ から始めると式がきれいになる。$p_{1}=\dfrac23$ から始めても同じ式になるが、初項の扱いを間違えやすい。`,
          ],
          check: String.raw`$n=1,\ldots,6$ の全列挙で $\dfrac23,\dfrac12,\dfrac5{12},\dfrac38,\dfrac{17}{48},\dfrac{11}{32}$ となり、式と完全に一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "三角比・数列",
      topics: ["正弦定理", "数学的帰納法", "三角関数の不等式", "角の和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,\\ldots,8$、$0<\\beta<\\tfrac{\\pi}{n+1}$ の無作為な $30$ 万組で $\\dfrac{\\sin n\\beta}{\\sin\\beta}<n$ を確かめると、違反は $0$ 件だった（比の上限は $\\beta\\to0$ での $1$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$n$ を $2$ 以上の自然数とする。三角形 $\mathrm{ABC}$ において辺 $\mathrm{AB}$ の長さを $c$、辺 $\mathrm{CA}$ の長さを $b$ で表す。$\angle\mathrm{ACB}=n\angle\mathrm{ABC}$ であるとき $c<nb$ を示す`,
          answer: String.raw`正弦定理より $c=b\dfrac{\sin n\beta}{\sin\beta}$（$\beta=\angle\mathrm{ABC}$）。$n\ge2$、$0<\beta<\pi$ のとき $\left|\sin n\beta\right|<n\sin\beta$ が帰納法で示せるので $c<nb$`,
          approach: String.raw`正弦定理で $\dfrac cb$ を角だけの式にし、$\left|\sin n\theta\right|<n\sin\theta$ を加法定理と帰納法で示す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta=\angle\mathrm{ABC}$ とおくと $\angle\mathrm{ACB}=n\beta$ である。三角形の内角の和より`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{BAC}=\pi-\left(n+1\right)\beta>0,\qquad 0<\beta<\frac{\pi}{n+1}`,
            },
            {
              k: "p",
              t: String.raw`である。とくに $0<\beta<\pi$ かつ $0<n\beta<\pi$ なので $\sin\beta>0$、$\sin n\beta>0$ である。`,
            },
            { k: "p", t: String.raw`正弦定理より、外接円の直径を $2R$ として` },
            {
              k: "math",
              t: String.raw`b=\mathrm{CA}=2R\sin\left(\angle\mathrm{ABC}\right)=2R\sin\beta,\qquad c=\mathrm{AB}=2R\sin\left(\angle\mathrm{ACB}\right)=2R\sin n\beta`,
            },
            { k: "p", t: String.raw`である（辺の対角をとる）。よって` },
            {
              k: "math",
              t: String.raw`\frac cb=\frac{\sin n\beta}{\sin\beta}`,
            },
            {
              k: "p",
              t: String.raw`であり、示すべきことは $\sin n\beta<n\sin\beta$ である。より強く、次を示す。`,
            },
            {
              k: "p",
              t: String.raw`**補題**。$0<\theta<\pi$ と $2$ 以上の自然数 $m$ に対し $\left|\sin m\theta\right|<m\sin\theta$ である。`,
            },
            {
              k: "p",
              t: String.raw`**証明**。$0<\theta<\pi$ では $\sin\theta>0$ である。$m=2$ のとき`,
            },
            {
              k: "math",
              t: String.raw`\left|\sin2\theta\right|=2\sin\theta\left|\cos\theta\right|<2\sin\theta`,
            },
            {
              k: "p",
              t: String.raw`である（$0<\theta<\pi$ より $\left|\cos\theta\right|<1$）。$m=k$（$k\ge2$）で成り立つとすると、加法定理より`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\left|\sin\left(k+1\right)\theta\right|&=\left|\sin k\theta\cos\theta+\cos k\theta\sin\theta\right|\\ &\le\left|\sin k\theta\right|\left|\cos\theta\right|+\left|\cos k\theta\right|\sin\theta\\ &\le\left|\sin k\theta\right|+\sin\theta\\ &<k\sin\theta+\sin\theta=\left(k+1\right)\sin\theta\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（最後の不等号で帰納法の仮定を使った）。よってすべての $m\ge2$ で成り立つ。$\blacksquare$`,
            },
            {
              k: "p",
              t: String.raw`補題を $\theta=\beta$、$m=n$ に使うと $\sin n\beta\le\left|\sin n\beta\right|<n\sin\beta$ である。$b>0$、$\sin\beta>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`c=b\cdot\frac{\sin n\beta}{\sin\beta}<b\cdot n=nb`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "n = 3、∠ABC = 30°、∠ACB = 90° の場合。a = BC = 1 とすると b = CA ≒ 0.577、c = AB ≒ 1.155 で、たしかに c < 3b ≒ 1.732 になっている。",
                view: [-0.3, 1.75, -0.3, 0.95],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, Math.tan(Math.PI / 6)] },
                  { k: "seg", a: [1, Math.tan(Math.PI / 6)], b: [0, 0] },
                  { k: "dot", at: [0, 0], label: "B", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "C", place: "below-right" },
                  { k: "dot", at: [1, Math.tan(Math.PI / 6)], label: "A", place: "above-right" },
                  { k: "text", at: [0.5, 0], label: "a", place: "below" },
                  { k: "text", at: [1, Math.tan(Math.PI / 6) / 2], label: "b", place: "right" },
                  { k: "text", at: [0.5, Math.tan(Math.PI / 6) / 2], label: "c", place: "above-left" },
                ],
              },
            },
          ],
          alts: [
            {
              title: "微分で一気に（こちらのほうが短い）",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$F\left(\theta\right)=n\sin\theta-\sin n\theta$ とおく。$F\left(0\right)=0$ で`,
                },
                {
                  k: "math",
                  t: String.raw`F'\left(\theta\right)=n\cos\theta-n\cos n\theta=n\left(\cos\theta-\cos n\theta\right)`,
                },
                {
                  k: "p",
                  t: String.raw`である。いま $0<\theta<\dfrac{\pi}{n+1}$ を考える。このとき $0<\theta<n\theta<\dfrac{n\pi}{n+1}<\pi$ であり（$n\ge2$ と $\theta>0$ より $\theta<n\theta$）、$\cos$ は $\left[0,\pi\right]$ で狭義単調減少なので`,
                },
                {
                  k: "math",
                  t: String.raw`\cos\theta>\cos n\theta,\qquad F'\left(\theta\right)>0`,
                },
                {
                  k: "p",
                  t: String.raw`である。よって $F$ は $0\le\theta<\dfrac{\pi}{n+1}$ で増加し、$F\left(\theta\right)>F\left(0\right)=0$、すなわち $\sin n\theta<n\sin\theta$ である。$\theta=\beta$ として $c<nb$ を得る。`,
                },
                {
                  k: "p",
                  t: String.raw`補題の形（$0<\theta<\pi$ すべてで $\left|\sin m\theta\right|<m\sin\theta$）までは出ないが、この問題で必要な範囲 $0<\beta<\dfrac{\pi}{n+1}$ ではこれで十分で、帰納法より手数が少ない。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`正弦定理で対応する角を取り違えやすい。辺 $\mathrm{CA}$ の対角は $\angle\mathrm{ABC}$、辺 $\mathrm{AB}$ の対角は $\angle\mathrm{ACB}$ である。`,
            String.raw`帰納法を回すには $\left|\sin k\theta\right|$（絶対値つき）で仮定しておく必要がある。$\sin k\theta<k\sin\theta$ だけだと $\cos\theta<0$ のときに掛け算の向きが崩れる。`,
            String.raw`$n\ge2$ が効いているのは $\left|\cos\theta\right|<1$ を1回使えるところ。$n=1$ なら等号になる。`,
          ],
          check: String.raw`$n=2,\ldots,8$ の $30$ 万組で $\dfrac{\sin n\beta}{\sin\beta}<n$ の違反は $0$ 件だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分・極限",
      topics: ["領域の面積", "双曲線と直線の交点", "対数を含む極限", "有理化"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$t=1.5,2,3,8$ で $S\\left(t\\right)$ の式とモンテカルロ法（$40$ 万点）の値が $1.125/1.127$、$2.000/2.001$、$3.071/3.082$、$5.143/5.144$ と合った",
          "$S\\left(t\\right)-2\\log t$ は $t=10,10^{2},10^{4},10^{6},10^{9},10^{12}$ で $0.98990,0.99990,0.99999999,1.0000000,1.0000000,1.0000000$ となり、$1$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$t$ を正の実数とする。$xy$ 平面において連立不等式 $x\ge0$、$y\ge0$、$xy\le1$、$x+y\le t$ の表す領域の面積を $S\left(t\right)$ とおく。$\displaystyle\lim_{t\to\infty}\left(S\left(t\right)-2\log t\right)$ を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`$t>2$ では三角形から「$xy>1$ のはみ出し」を引く。$\beta=\dfrac{t+\sqrt{t^{2}-4}}{2}$ を使って $S\left(t\right)=\dfrac{t^{2}}{2}-\dfrac t2\sqrt{t^{2}-4}+2\log\beta$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t\to\infty$ を考えるので $t>2$ としてよい。双曲線 $xy=1$ と直線 $x+y=t$ の交点の $x$ 座標は`,
            },
            {
              k: "math",
              t: String.raw`x\left(t-x\right)=1,\qquad x^{2}-tx+1=0`,
            },
            { k: "p", t: String.raw`の解である。判別式は $t^{2}-4>0$ なので2つあり` },
            {
              k: "math",
              t: String.raw`\alpha=\frac{t-\sqrt{t^{2}-4}}{2},\qquad\beta=\frac{t+\sqrt{t^{2}-4}}{2}`,
            },
            {
              k: "p",
              t: String.raw`とおく。解と係数の関係から $\alpha\beta=1$、$\alpha+\beta=t$ である。`,
            },
            {
              k: "p",
              t: String.raw`領域は、三角形 $x\ge0$、$y\ge0$、$x+y\le t$（面積 $\dfrac{t^{2}}{2}$）から、$xy>1$ の部分を除いたものである。除く部分は $\alpha\le x\le\beta$ で双曲線 $y=\dfrac1x$ と直線 $y=t-x$ にはさまれた部分なので、その面積 $A$ は`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}A&=\int_{\alpha}^{\beta}\left\{\left(t-x\right)-\frac1x\right\}dx=\left[tx-\frac{x^{2}}{2}-\log x\right]_{\alpha}^{\beta}\\ &=t\left(\beta-\alpha\right)-\frac{\beta^{2}-\alpha^{2}}{2}-\log\frac{\beta}{\alpha}\\ &=\left(\beta-\alpha\right)\left(t-\frac{\alpha+\beta}{2}\right)-\log\frac{\beta}{\alpha}=\frac t2\left(\beta-\alpha\right)-\log\frac{\beta}{\alpha}\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\beta-\alpha=\sqrt{t^{2}-4}$、$\alpha=\dfrac1\beta$ より $\dfrac{\beta}{\alpha}=\beta^{2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`S\left(t\right)=\frac{t^{2}}{2}-\frac t2\sqrt{t^{2}-4}+2\log\beta`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`S\left(t\right)-2\log t=\underbrace{\frac t2\left(t-\sqrt{t^{2}-4}\right)}_{P\left(t\right)}+\underbrace{2\log\frac{\beta}{t}}_{Q\left(t\right)}`,
            },
            { k: "p", t: String.raw`と分けられる。` },
            { k: "p", t: String.raw`**$P\left(t\right)$**。分子を有理化すると` },
            {
              k: "math",
              t: String.raw`P\left(t\right)=\frac t2\cdot\frac{t^{2}-\left(t^{2}-4\right)}{t+\sqrt{t^{2}-4}}=\frac{2t}{t+\sqrt{t^{2}-4}}=\frac{2}{1+\sqrt{1-\frac4{t^{2}}}}`,
            },
            { k: "p", t: String.raw`なので $t\to\infty$ で $P\left(t\right)\to\dfrac{2}{1+1}=1$ である。` },
            { k: "p", t: String.raw`**$Q\left(t\right)$**。` },
            {
              k: "math",
              t: String.raw`\frac{\beta}{t}=\frac{1+\sqrt{1-\frac4{t^{2}}}}{2}\longrightarrow1`,
            },
            { k: "p", t: String.raw`なので $Q\left(t\right)\to2\log1=0$ である。` },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`\lim_{t\to\infty}\left(S\left(t\right)-2\log t\right)=1+0=1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "t = 3 のとき。網をかけた部分が領域で、上側の境界は x が小さいところと大きいところでは直線 x + y = 3、真ん中では双曲線 xy = 1（点線はその延長）。2 つの交点の x 座標が α ≒ 0.382 と β ≒ 2.618。",
                view: [-0.4, 4.3, -0.35, 3.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: TOP20, bottom: ZERO20, from: 0, to: 3 },
                  { k: "seg", a: [0, 3], b: [3, 0] },
                  {
                    k: "curve",
                    f: (x: number): number => 1 / x,
                    from: 0.29,
                    to: 4.3,
                    dash: true,
                  },
                  { k: "dot", at: [AL20, 3 - AL20], label: "α", place: "above-right" },
                  { k: "dot", at: [BE20, 3 - BE20], label: "β", place: "above-right" },
                  { k: "text", at: [4.2, 1 / 4.2], label: "xy = 1", place: "above" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$2\log t$ が出てくる理由は、領域が $x$ 軸・$y$ 軸に沿って2本の細長い「ひげ」を伸ばすからである。$x$ 軸側のひげの面積は $\displaystyle\int^{t}\dfrac{dx}{x}\sim\log t$、$y$ 軸側も同じで、合わせて $2\log t$ になる。残る $1$ はひげの付け根（原点近く）の寄与である。`,
            },
          ],
          pitfalls: [
            String.raw`$t\le2$ では双曲線と直線が交わらず、領域はそのまま三角形で $S\left(t\right)=\dfrac{t^{2}}{2}$ になる。極限には関係しないが、場合分けの存在は意識しておく。`,
            String.raw`$\dfrac{t^{2}}{2}-\dfrac t2\sqrt{t^{2}-4}$ をそのまま $t\to\infty$ とすると $\infty-\infty$ になる。有理化が要点。`,
          ],
          check: String.raw`$S\left(t\right)-2\log t$ は $t=10^{4}$ で $0.99999999$、$t=10^{6}$ 以降は $1.0000000$ だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分・図形",
      topics: ["回転体の体積", "ヘロンの公式", "2次関数の最大", "対称性"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$V=\\tfrac{\\pi}{3}ah^{2}$ を断面積分（$40$ 万分割）と比べると、鋭角三角形でも $\\mathrm{A}$ から下ろした垂線の足が $\\mathrm{BC}$ の外に出る場合（$a=0.4,b=0.9$ など）でも小数第9位まで一致した",
          "$a$ を $0.1$ 刻みで固定して $b$ を $2$ 万等分して動かすと、$V$ が最大になる $b$ はつねに $1-\\tfrac a2$ だった（ずれ $0$ 件）",
          "$a,b$ をともに $1500\\times1500$ の格子で動かすと $V$ の最大は $0.261798904$（$a=0.50067$、$b=0.74960$）で、$\\tfrac{\\pi}{12}=0.261799388$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`3辺の長さの和が $2$ である三角形 $\mathrm{ABC}$ において、辺 $\mathrm{BC}$ の長さを $a$、辺 $\mathrm{CA}$ の長さを $b$ とする。$\mathrm{BC}$ を軸として1回転させてできる回転体の体積を $V$ とする。$a$ を固定して $b$ を変化させるとき、$V$ が最大になるのは $\mathrm{BC}$ を底辺とする二等辺三角形のときであることを示す`,
          answer: String.raw`$V=\dfrac{4\pi}{3}\cdot\dfrac{\left(1-a\right)\left(1-b\right)\left(a+b-1\right)}{a}$。$b$ の2次関数 $\left(1-b\right)\left(a+b-1\right)$ は $b=1-\dfrac a2$ で最大になり、このとき $c=2-a-b=1-\dfrac a2=b$`,
          approach: String.raw`$V=\dfrac{\pi}{3}ah^{2}$（$h$ は $\mathrm{A}$ から $\mathrm{BC}$ への距離）とヘロンの公式を組み合わせる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$c=\mathrm{AB}=2-a-b$ とおく。$\mathrm{A}$ から直線 $\mathrm{BC}$ に下ろした垂線の足を $\mathrm{H}$、$\mathrm{AH}=h$ とする。`,
            },
            {
              k: "p",
              t: String.raw`回転体は、$\mathrm{H}$ が線分 $\mathrm{BC}$ の内部にあるときは「底面の半径 $h$ の2つの円錐を底面どうしで貼り合わせたもの」、$\mathrm{H}$ が外にあるときは「大きい円錐から小さい円錐を取り除いたもの」である。どちらの場合も、$\mathrm{H}$ から $\mathrm{B}$、$\mathrm{C}$ までの距離を $d_{1},d_{2}$ とすると高さの和（または差）が $a$ になるので`,
            },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{3}h^{2}d_{1}\pm\frac{\pi}{3}h^{2}d_{2}=\frac{\pi}{3}ah^{2}`,
            },
            { k: "p", t: String.raw`と、同じ式になる。` },
            {
              k: "p",
              t: String.raw`三角形の面積を $T$ とすると $T=\dfrac12ah$ なので $h=\dfrac{2T}{a}$ であり`,
            },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{3}a\cdot\frac{4T^{2}}{a^{2}}=\frac{4\pi}{3}\cdot\frac{T^{2}}{a}`,
            },
            {
              k: "p",
              t: String.raw`である。周の長さが $2$ なので、ヘロンの公式の $s=\dfrac{a+b+c}{2}=1$ であり`,
            },
            {
              k: "math",
              t: String.raw`T^{2}=s\left(s-a\right)\left(s-b\right)\left(s-c\right)=\left(1-a\right)\left(1-b\right)\left(1-c\right)`,
            },
            { k: "p", t: String.raw`である。$1-c=1-\left(2-a-b\right)=a+b-1$ なので` },
            {
              k: "math",
              t: String.raw`V=\frac{4\pi}{3}\cdot\frac{\left(1-a\right)\left(1-b\right)\left(a+b-1\right)}{a}\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$a$ を固定する。$\dfrac{4\pi}{3}\cdot\dfrac{1-a}{a}$ は正の定数なので、$V$ の最大は`,
            },
            {
              k: "math",
              t: String.raw`g\left(b\right)=\left(1-b\right)\left(a+b-1\right)`,
            },
            {
              k: "p",
              t: String.raw`の最大で決まる。$g$ は $b$ の2次関数で $b^{2}$ の係数が $-1<0$、2つの零点が $b=1$ と $b=1-a$ なので、頂点は`,
            },
            {
              k: "math",
              t: String.raw`b=\frac{1+\left(1-a\right)}{2}=1-\frac a2`,
            },
            {
              k: "p",
              t: String.raw`である。三角形になるための $b$ の範囲は $1-a<b<1$（$T^{2}>0$ すなわち $\left(1-b\right)\left(a+b-1\right)>0$）で、頂点 $b=1-\dfrac a2$ はこの区間のちょうど真ん中にあるから、ここで最大をとる。`,
            },
            { k: "p", t: String.raw`このとき` },
            {
              k: "math",
              t: String.raw`c=2-a-b=2-a-\left(1-\frac a2\right)=1-\frac a2=b`,
            },
            {
              k: "p",
              t: String.raw`なので $b=c$、すなわち三角形 $\mathrm{ABC}$ は $\mathrm{BC}$ を底辺とする二等辺三角形である。$\blacksquare$`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "辺 BC を軸に 1 回転させたときの断面。A から BC に下ろした垂線 AH の長さ h が回転体の半径で、体積は V = (π/3)ah²。H が BC の外に出ても、2 つの円錐の差として同じ式になる。",
                view: [-0.7, 3.0, -1.55, 1.55],
                step: { x: 1, y: 0.5 },
                items: [
                  { k: "seg", a: [0, 0], b: [2, 0] },
                  { k: "seg", a: [2, 0], b: [0.7, 1] },
                  { k: "seg", a: [0.7, 1], b: [0, 0] },
                  { k: "seg", a: [2, 0], b: [0.7, -1], dash: true, faint: true },
                  { k: "seg", a: [0.7, -1], b: [0, 0], dash: true, faint: true },
                  { k: "seg", a: [0.7, -1], b: [0.7, 1], dash: true },
                  { k: "dot", at: [0, 0], label: "B", place: "below-left" },
                  { k: "dot", at: [2, 0], label: "C", place: "below-right" },
                  { k: "dot", at: [0.7, 1], label: "A", place: "above" },
                  { k: "dot", at: [0.7, 0], label: "H", place: "below-right" },
                  { k: "text", at: [0.7, 0.5], label: "h", place: "left" },
                  { k: "text", at: [1.4, 0], label: "a", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{H}$ が $\mathrm{BC}$ の外に出る（$\mathrm{B}$ または $\mathrm{C}$ が鈍角）場合も $V=\dfrac{\pi}{3}ah^{2}$ でよい。差をとると高さが $a$ に戻るからで、ここをことわらずに「2つの円錐」とだけ書くと場合分け漏れになる。`,
            String.raw`$b$ の動く範囲を書かないと「頂点が範囲内にある」ことが言えない。$1-a<b<1$ を出しておく。`,
          ],
          check: String.raw`$a$ を $0.1$ 刻みで固定して $b$ を $2$ 万等分して走査すると、最大を与える $b$ はつねに $1-\dfrac a2$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a,b$ をともに変化させるとき、$V$ の最大値と、最大値を与える $a,b$ の値を求める`,
          answer: String.raw`最大値 $\dfrac{\pi}{12}$、$a=\dfrac12$、$b=\dfrac34$`,
          approach: String.raw`(1) より $b=1-\dfrac a2$ に限ってよい。代入すると $V=\dfrac{\pi}{3}a\left(1-a\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より、$a$ を決めるごとに最大を与える $b$ は $b=1-\dfrac a2$ である。このとき`,
            },
            {
              k: "math",
              t: String.raw`1-b=\frac a2,\qquad a+b-1=a+1-\frac a2-1=\frac a2`,
            },
            { k: "p", t: String.raw`なので、$\left(\ast\right)$ に代入して` },
            {
              k: "math",
              t: String.raw`V=\frac{4\pi}{3}\cdot\frac{\left(1-a\right)\cdot\frac a2\cdot\frac a2}{a}=\frac{\pi}{3}a\left(1-a\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$a$ の範囲を確かめる。$b=c=1-\dfrac a2$ が三角形をなす条件は $b+c>a$、すなわち $2-a>a$ より $a<1$ で、長さが正であることから $a>0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`0<a<1`,
            },
            { k: "p", t: String.raw`である。$a\left(1-a\right)$ は上に凸の2次関数で` },
            {
              k: "math",
              t: String.raw`a\left(1-a\right)=-\left(a-\frac12\right)^{2}+\frac14`,
            },
            { k: "p", t: String.raw`なので、$a=\dfrac12$ で最大値 $\dfrac14$ をとる。したがって` },
            {
              k: "math",
              t: String.raw`V_{\max}=\frac{\pi}{3}\cdot\frac14=\frac{\pi}{12}`,
            },
            { k: "p", t: String.raw`であり、そのとき` },
            {
              k: "math",
              t: String.raw`a=\frac12,\qquad b=1-\frac14=\frac34\quad\left(=c\right)`,
            },
            {
              k: "p",
              t: String.raw`である。3辺は $\dfrac12,\dfrac34,\dfrac34$ で、和はたしかに $2$ である。`,
            },
            {
              k: "note",
              t: String.raw`最大を与えるのは正三角形（3辺 $\dfrac23$ ずつ）ではない。軸にする辺 $\mathrm{BC}$ は短めのほうが得で、$a:b:c=2:3:3$ になる。$V=\dfrac{\pi}{3}a\left(1-a\right)$ の形から、$a$ が小さいと半径は稼げても高さが足りず、$a$ が大きいと逆になることがわかる。`,
            },
          ],
          pitfalls: [
            String.raw`(1) で $b$ を最適化したあと、$a$ についても範囲 $0<a<1$ を確かめる。これを飛ばすと頂点が範囲外の可能性を潰せない。`,
            String.raw`「対称性があるから正三角形が最大」と即断しない。回転軸にする辺だけ役割が違うので、対称性は $b$ と $c$ の間にしかない。`,
          ],
          check: String.raw`$1500\times1500$ の格子走査で最大 $0.261798904$（$a=0.50067$、$b=0.74960$）、$\dfrac{\pi}{12}=0.261799388$ と一致した。`,
        },
      ],
    },
  ],
};
