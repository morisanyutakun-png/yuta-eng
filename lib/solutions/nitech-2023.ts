import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2023年度（令和5年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の曲線（トロコイド）。 */
const CUR23 = (t: number): [number, number] => [t - 2 * Math.sin(t), 2 - 2 * Math.cos(t)];
/** 第1問の図で、曲線と $x$ 軸で囲む閉じた領域の輪郭。 */
const LOOP23: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const n = 200;
  for (let i = 0; i <= n; i++) pts.push(CUR23((2 * Math.PI * i) / n));
  return pts;
})();

/** 第4問の $f\left(x\right)=\dfrac{2x^{3}+x^{2}-4x-3}{x^{2}-3}$。 */
const F23 = (x: number): number => (2 * x ** 3 + x ** 2 - 4 * x - 3) / (x ** 2 - 3);

export const nitech2023: SolutionSet = {
  slug: "nitech",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "媒介変数表示・積分法",
      topics: ["媒介変数で表された曲線の増減", "閉曲線が囲む面積", "回転体の体積", "置換して積分する"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ の最小は $\\theta=\\tfrac\\pi3$ で $-0.6848533$、最大は $\\theta=\\tfrac53\\pi$ で $6.9680386$ で、$\\tfrac\\pi3-\\sqrt3$、$\\tfrac53\\pi+\\sqrt3$ と一致した",
          "$\\cos\\theta_{1}=\\cos\\theta_{2}$ となる組を $2000$ 点調べても自己交差はなく、曲線は単純だった",
          "折れ線で面積を出すと $25.1327412$ で $8\\pi=25.1327412$、体積は $276.3489232$ で $28\\pi^{2}=276.3489232$。円板と円環に分けて直接足しても $276.3489273$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C\colon x=\theta-2\sin\theta$、$y=2-2\cos\theta$（$0\leqq\theta\leqq2\pi$）について、$C$ 上の点の $x$ 座標の値の範囲を求める`,
          answer: String.raw`$\dfrac\pi3-\sqrt3\leqq x\leqq\dfrac53\pi+\sqrt3$`,
          approach: String.raw`$\dfrac{dx}{d\theta}=1-2\cos\theta$ の符号で増減を調べる。端点と極値の4つを比べる。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{dx}{d\theta}=1-2\cos\theta$ で、$0\leqq\theta\leqq2\pi$ のとき` },
            {
              k: "math",
              t: String.raw`\frac{dx}{d\theta}=0\iff\cos\theta=\frac12\iff\theta=\frac\pi3,\ \frac53\pi`,
            },
            {
              k: "p",
              t: String.raw`である。$\cos\theta>\dfrac12$ のとき $\dfrac{dx}{d\theta}<0$ なので、$x$ は $\left[0,\dfrac\pi3\right]$ で減少、$\left[\dfrac\pi3,\dfrac53\pi\right]$ で増加、$\left[\dfrac53\pi,2\pi\right]$ で減少する。候補の値は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\theta=0$ … $x=0$`,
                String.raw`$\theta=\dfrac\pi3$ … $x=\dfrac\pi3-2\sin\dfrac\pi3=\dfrac\pi3-\sqrt3=-0.684\ldots$`,
                String.raw`$\theta=\dfrac53\pi$ … $x=\dfrac53\pi-2\sin\dfrac53\pi=\dfrac53\pi+\sqrt3=6.968\ldots$`,
                String.raw`$\theta=2\pi$ … $x=2\pi=6.283\ldots$`,
              ],
            },
            { k: "p", t: String.raw`である。最小は $\dfrac\pi3-\sqrt3$、最大は $\dfrac53\pi+\sqrt3$ なので` },
            { k: "math", t: String.raw`\frac\pi3-\sqrt3\leqq x\leqq\frac53\pi+\sqrt3` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x$ は単調ではない。端点 $\theta=0,2\pi$ の値だけで判断しない。`,
          ],
          check: String.raw`数値で $x\left(\dfrac\pi3\right)=-0.6848533$、$x\left(\dfrac53\pi\right)=6.9680386$ となり、式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`曲線 $C$ と $x$ 軸で囲まれた図形の面積 $S$ を求める`,
          answer: String.raw`$S=8\pi$`,
          approach: String.raw`$y=0$ になるのは $\theta=0,2\pi$ だけ。$C$ と $x$ 軸上の線分で閉曲線になるので、$\displaystyle\int y\,dx$ を $\theta$ で計算する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=2-2\cos\theta\geqq0$ で、$y=0$ になるのは $\theta=0$（点 $\left(0,0\right)$）と $\theta=2\pi$（点 $\left(2\pi,0\right)$）だけである。`,
            },
            {
              k: "p",
              t: String.raw`また $\cos\theta_{1}=\cos\theta_{2}$（$0\leqq\theta_{1}<\theta_{2}\leqq2\pi$）なら $\theta_{2}=2\pi-\theta_{1}$ で、このとき $x$ も等しいとすると`,
            },
            {
              k: "math",
              t: String.raw`\theta_{1}-2\sin\theta_{1}=2\pi-\theta_{1}+2\sin\theta_{1}\iff\theta_{1}-2\sin\theta_{1}=\pi`,
            },
            {
              k: "p",
              t: String.raw`となる。左辺は (1) の増減から $\left[\dfrac\pi3,\dfrac53\pi\right]$ で増加し、$\theta_{1}=\pi$ でちょうど $\pi$ になる。$\left[0,\dfrac\pi3\right]$ では $\pi$ 未満、$\left[\dfrac53\pi,2\pi\right]$ では $\pi$ より大きいままなので、解は $\theta_{1}=\pi$ だけである。これは $\theta_{2}=\pi$ と同じ点なので、**$C$ は自分自身と交わらない**。`,
            },
            {
              k: "p",
              t: String.raw`したがって $C$ と線分（$x$ 軸上の $\left(0,0\right)$ から $\left(2\pi,0\right)$ まで）を合わせたものは単純な閉曲線で、その囲む面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\left|\int_{0}^{2\pi}y\frac{dx}{d\theta}d\theta\right|=\left|\int_{0}^{2\pi}\left(2-2\cos\theta\right)\left(1-2\cos\theta\right)d\theta\right|`,
            },
            { k: "p", t: String.raw`で求められる（$x$ 軸上の線分では $y=0$ なので寄与しない）。被積分関数を展開すると` },
            {
              k: "math",
              t: String.raw`2-6\cos\theta+4\cos^{2}\theta`,
            },
            {
              k: "p",
              t: String.raw`で、$\displaystyle\int_{0}^{2\pi}\cos\theta\,d\theta=0$、$\displaystyle\int_{0}^{2\pi}\cos^{2}\theta\,d\theta=\pi$ だから`,
            },
            { k: "math", t: String.raw`S=\left|2\cdot2\pi-0+4\pi\right|=8\pi` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 C と x 軸で囲まれた部分。曲線は (0, 0) から出て左にふくらみ、θ = π で高さ 4 に達し、(2π, 0) に戻る。終わり際には x = 2π より右にはみ出す。",
                view: [-1.4, 7.9, -0.9, 4.6],
                items: [
                  { k: "fill", pts: LOOP23 },
                  { k: "param", f: CUR23, from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [0, 0], label: "(0, 0)", place: "below-left" },
                  { k: "dot", at: [2 * Math.PI, 0], label: "(2π, 0)", place: "below-right" },
                  { k: "dot", at: [Math.PI, 4], label: "θ = π", place: "above" },
                  {
                    k: "dot",
                    at: [Math.PI / 3 - Math.sqrt(3), 1],
                    label: "x が最小",
                    place: "left",
                  },
                  {
                    k: "dot",
                    at: [(5 * Math.PI) / 3 + Math.sqrt(3), 1],
                    label: "x が最大",
                    place: "right",
                  },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`曲線が自分と交わらないことを言っておかないと、$\displaystyle\int y\,dx$ が囲む面積になる保証がない。`,
          ],
          check: String.raw`曲線を $40$ 万点の折れ線にして面積を計算すると $25.1327412$ で、$8\pi=25.1327412$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) の図形を $x$ 軸のまわりに1回転させてできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=28\pi^{2}$`,
          approach: String.raw`図形は $y\geqq0$ にあるので、$V=\displaystyle\iint2\pi y\,dA$。これは $\pi\displaystyle\int y^{2}dx$ を閉曲線に沿って計算したものになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`図形 $D$ は $y\geqq0$ にあり、$x$ 軸とは線分で接しているだけなので、回転体の体積は`,
            },
            {
              k: "math",
              t: String.raw`V=\iint_{D}2\pi y\,dA`,
            },
            {
              k: "p",
              t: String.raw`である（$x$ を固定した断面が、円板なら半径 $y_{\text{上}}$、円環なら外半径 $y_{\text{上}}$・内半径 $y_{\text{下}}$ になるが、どちらの場合も $\displaystyle\int_{y_{\text{下}}}^{y_{\text{上}}}2\pi y\,dy=\pi\left(y_{\text{上}}^{2}-y_{\text{下}}^{2}\right)$ と一致する）。`,
            },
            {
              k: "p",
              t: String.raw`グリーンの定理（または (2) と同じ「周に沿った積分」の考え方）から、$\displaystyle\iint_{D}2y\,dA$ は閉曲線に沿った $\displaystyle\int y^{2}dx$ に等しい。$x$ 軸上の線分では $y=0$ なので`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int_{0}^{2\pi}\left(2-2\cos\theta\right)^{2}\left(1-2\cos\theta\right)d\theta`,
            },
            { k: "p", t: String.raw`である。展開すると` },
            {
              k: "math",
              t: String.raw`\left(2-2\cos\theta\right)^{2}\left(1-2\cos\theta\right)=4\left(1-4\cos\theta+5\cos^{2}\theta-2\cos^{3}\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$\displaystyle\int_{0}^{2\pi}\cos\theta\,d\theta=\int_{0}^{2\pi}\cos^{3}\theta\,d\theta=0$、$\displaystyle\int_{0}^{2\pi}\cos^{2}\theta\,d\theta=\pi$ だから`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\cdot4\left(2\pi+5\pi\right)=28\pi^{2}`,
            },
            { k: "p", t: String.raw`である（$276.3\ldots$）。` },
            {
              k: "note",
              t: String.raw`$\displaystyle\int_{0}^{2\pi}\cos^{3}\theta\,d\theta=0$ は、$\cos^{3}\theta=\dfrac{3\cos\theta+\cos3\theta}{4}$ からも、$\theta\mapsto2\pi-\theta$ ではなく $\theta\mapsto\theta+\pi$ で符号が変わることからも分かる。`,
            },
          ],
          pitfalls: [
            String.raw`$x$ が単調でないので、$\pi\displaystyle\int y^{2}dx$ を「$x$ の区間で1本の積分」と思ってはいけない。$\theta$ で一周させると、円環になる部分の引き算まで自動的に処理される。`,
          ],
          check: String.raw`$\theta$ の積分で $276.3489232$、円板と円環に分けて $x$ について直接足して $276.3489273$ となり、$28\pi^{2}=276.3489232$ と合った。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列・対数",
      topics: ["偶数番と奇数番に分かれた漸化式", "差をとって1次の漸化式", "階差から一般項", "桁数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式どおりに作ると $a_{1},\\ldots,a_{5}=1,2,3,7,8$ で $a_{5}=8$",
          "$b_{n}=\\tfrac{3^{n}+1}2$ と $a_{2n+1}=\\tfrac{3^{n+1}+2n+1}4$ が $n$ を大きく取っても一致した",
          "$a_{199}$ は48桁で、$\\log_{10}a_{199}=47.1100655$（概算 $47.108$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{1}=1$、$a_{2n}=3a_{2n-1}-n$、$a_{2n+1}=a_{2n}+1$（$n=1,2,3,\ldots$）で定まる数列について、$a_{5}$ を求める`,
          answer: String.raw`$a_{5}=8$`,
          approach: String.raw`順に計算するだけ。`,
          blocks: [
            {
              k: "steps",
              items: [
                String.raw`$n=1$ … $a_{2}=3\cdot1-1=2$、$a_{3}=2+1=3$`,
                String.raw`$n=2$ … $a_{4}=3\cdot3-2=7$、$a_{5}=7+1=8$`,
              ],
            },
            { k: "math", t: String.raw`a_{5}=8` },
          ],
          check: String.raw`漸化式どおりに計算すると $1,2,3,7,8$ となった。`,
        },
        {
          label: "(2)",
          task: String.raw`$b_{n}=a_{2n+1}-a_{2n-1}$ とおくとき、$\left\{b_{n}\right\}$ の一般項を求める`,
          answer: String.raw`$b_{n}=\dfrac{3^{n}+1}{2}$`,
          approach: String.raw`$a_{2n+1}$ を $a_{2n-1}$ で表すと $a_{2n+1}=3a_{2n-1}-n+1$。ここから $b$ の漸化式を作る。`,
          blocks: [
            { k: "p", t: String.raw`2本の式をつなぐと` },
            {
              k: "math",
              t: String.raw`a_{2n+1}=a_{2n}+1=3a_{2n-1}-n+1`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`b_{n}=a_{2n+1}-a_{2n-1}=2a_{2n-1}-n+1`,
            },
            { k: "p", t: String.raw`で、$n$ を $n+1$ に変えると` },
            {
              k: "math",
              t: String.raw`b_{n+1}=2a_{2n+1}-n=2\left(a_{2n-1}+b_{n}\right)-n=2a_{2n-1}+2b_{n}-n`,
            },
            { k: "p", t: String.raw`である。$2a_{2n-1}=b_{n}+n-1$ を入れると` },
            {
              k: "math",
              t: String.raw`b_{n+1}=\left(b_{n}+n-1\right)+2b_{n}-n=3b_{n}-1`,
            },
            {
              k: "p",
              t: String.raw`となり、$n$ が消えて1次の漸化式になる。$b_{1}=a_{3}-a_{1}=3-1=2$ である。$\alpha=3\alpha-1$ の解 $\alpha=\dfrac12$ を使って`,
            },
            {
              k: "math",
              t: String.raw`b_{n}-\frac12=3\left(b_{n-1}-\frac12\right),\qquad b_{n}-\frac12=3^{n-1}\left(2-\frac12\right)=\frac{3^{n}}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`b_{n}=\frac{3^{n}+1}{2}` },
            {
              k: "p",
              t: String.raw`である（$b_{1}=2$、$b_{2}=5=a_{5}-a_{3}=8-3$ で合う）。`,
            },
          ],
          pitfalls: [
            String.raw`$b_{n}=2a_{2n-1}-n+1$ のままだと $a$ が残る。$b_{n+1}$ との差を取って $a$ を消すのが要。`,
          ],
          check: String.raw`漸化式から作った $a$ の値と $\dfrac{3^{n}+1}2$ が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{2n+1}$ を求める`,
          answer: String.raw`$a_{2n+1}=\dfrac{3^{n+1}+2n+1}{4}$`,
          approach: String.raw`$b$ は $a_{2n+1}$ の階差なので、$a_{1}$ から順に足す。`,
          blocks: [
            { k: "p", t: String.raw`$n\geqq1$ のとき` },
            {
              k: "math",
              t: String.raw`a_{2n+1}=a_{1}+\sum_{k=1}^{n}b_{k}=1+\sum_{k=1}^{n}\frac{3^{k}+1}{2}=1+\frac12\left(\frac{3^{n+1}-3}{2}+n\right)`,
            },
            { k: "p", t: String.raw`である。整理すると` },
            {
              k: "math",
              t: String.raw`a_{2n+1}=\frac{4+3^{n+1}-3+2n}{4}=\frac{3^{n+1}+2n+1}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（$n=0$ でも $\dfrac{3+0+1}{4}=1=a_{1}$、$n=1$ で $\dfrac{9+3}{4}=3=a_{3}$、$n=2$ で $\dfrac{27+5}{4}=8=a_{5}$ と合う）。`,
            },
          ],
          check: String.raw`漸化式から作った $a_{2n+1}$ と式が、$n$ を大きく取っても一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$a_{199}$ の桁数を求める（$\log_{10}2=0.3010$、$\log_{10}3=0.4771$）`,
          answer: String.raw`$48$ 桁`,
          approach: String.raw`$199=2\cdot99+1$ なので $a_{199}=\dfrac{3^{100}+199}{4}$。$199$ は $3^{100}$ に比べてごく小さい。`,
          blocks: [
            { k: "p", t: String.raw`(3) に $n=99$ を入れると` },
            {
              k: "math",
              t: String.raw`a_{199}=\frac{3^{100}+199}{4}`,
            },
            { k: "p", t: String.raw`である。$199<3^{100}$ なので` },
            {
              k: "math",
              t: String.raw`\frac{3^{100}}{4}<a_{199}<\frac{2\cdot3^{100}}{4}=\frac{3^{100}}{2}`,
            },
            { k: "p", t: String.raw`である。常用対数をとると、$\log_{10}3^{100}=100\cdot0.4771=47.71$ より` },
            {
              k: "math",
              t: String.raw`47.71-2\log_{10}2<\log_{10}a_{199}<47.71-\log_{10}2`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`47.71-0.6020=47.108<\log_{10}a_{199}<47.71-0.3010=47.409`,
            },
            {
              k: "p",
              t: String.raw`である。整数部分が $47$ なので $10^{47}<a_{199}<10^{48}$、つまり $a_{199}$ は**48桁**である。`,
            },
          ],
          pitfalls: [
            String.raw`$+199$ を無視してよいことを、不等式ではさんで示しておく。`,
          ],
          check: String.raw`$a_{199}$ を直接計算すると48桁で、$\log_{10}a_{199}=47.1100655$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["向かい合う辺が等しい四面体", "内積", "垂線の足", "平面上での反射と交点"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec a\\cdot\\vec b=5$、$\\vec b\\cdot\\vec c=44$、$\\vec c\\cdot\\vec a=20$ で座標を作ると、6辺の長さが $5,7,8,8,5,7$ と条件どおりになった",
          "$\\overrightarrow{\\mathrm{OH}}=\\tfrac{19}{30}\\vec a+\\tfrac56\\vec b$ に対し $\\left(\\vec c-\\overrightarrow{\\mathrm{OH}}\\right)\\cdot\\vec a$、$\\left(\\vec c-\\overrightarrow{\\mathrm{OH}}\\right)\\cdot\\vec b$ がどちらも $0$",
          "平面 $\\mathrm{OAB}$ で $\\ell$ と直線 $\\mathrm{OH}$ の交点を連立で求めると $\\overrightarrow{\\mathrm{OD}}=7.5\\,\\overrightarrow{\\mathrm{OH}}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角錐 $\mathrm{OABC}$ が $\mathrm{OA}=\mathrm{BC}=5$、$\mathrm{OB}=\mathrm{AC}=7$、$\mathrm{OC}=\mathrm{AB}=8$ を満たす。$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ として、内積 $\vec a\cdot\vec b$、$\vec b\cdot\vec c$、$\vec c\cdot\vec a$ を求める`,
          answer: String.raw`$\vec a\cdot\vec b=5$、$\vec b\cdot\vec c=44$、$\vec c\cdot\vec a=20$`,
          approach: String.raw`向かい合う辺が等しいので、$\mathrm{AB}=8$、$\mathrm{BC}=5$、$\mathrm{AC}=7$ をそれぞれ使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|\vec a\right|=5$、$\left|\vec b\right|=7$、$\left|\vec c\right|=8$ である。`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=\left|\vec b-\vec a\right|^{2}=25+49-2\vec a\cdot\vec b=64\ \Longrightarrow\ \vec a\cdot\vec b=5`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BC}^{2}=\left|\vec c-\vec b\right|^{2}=49+64-2\vec b\cdot\vec c=25\ \Longrightarrow\ \vec b\cdot\vec c=44`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AC}^{2}=\left|\vec c-\vec a\right|^{2}=25+64-2\vec c\cdot\vec a=49\ \Longrightarrow\ \vec c\cdot\vec a=20`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`この内積から座標を作ると、6辺の長さが $5,7,8,8,5,7$ と条件どおりになった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{C}$ から平面 $\mathrm{OAB}$ に下ろした垂線を $\mathrm{CH}$ とするとき、$\overrightarrow{\mathrm{OH}}$ を $\vec a,\vec b,\vec c$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac{19}{30}\vec a+\dfrac56\vec b$`,
          approach: String.raw`$\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおき、$\overrightarrow{\mathrm{CH}}$ が $\vec a,\vec b$ のどちらとも垂直という2本の式を立てる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ は平面 $\mathrm{OAB}$ 上なので $\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおける。$\overrightarrow{\mathrm{CH}}=\overrightarrow{\mathrm{OH}}-\vec c$ が $\vec a,\vec b$ と垂直だから`,
            },
            {
              k: "math",
              t: String.raw`\left(s\vec a+t\vec b\right)\cdot\vec a=\vec c\cdot\vec a,\qquad\left(s\vec a+t\vec b\right)\cdot\vec b=\vec c\cdot\vec b`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`25s+5t=20,\qquad5s+49t=44`,
            },
            {
              k: "p",
              t: String.raw`である。第1式から $t=4-5s$ で、これを第2式に入れると $5s+196-245s=44$、$-240s=-152$ より $s=\dfrac{19}{30}$、$t=4-\dfrac{19}{6}=\dfrac56$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\frac{19}{30}\vec a+\frac56\vec b`,
            },
            { k: "p", t: String.raw`である（$\vec c$ の係数は $0$ になる）。` },
          ],
          check: String.raw`この $\mathrm{H}$ に対して $\left(\vec c-\overrightarrow{\mathrm{OH}}\right)\cdot\vec a$、$\left(\vec c-\overrightarrow{\mathrm{OH}}\right)\cdot\vec b$ がどちらも $0$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`平面 $\mathrm{OAB}$ において、点 $\mathrm{B}$ から直線 $\mathrm{OA}$ に垂線 $\mathrm{BK}$ を下ろすとき、$\dfrac{\mathrm{OK}}{\mathrm{OA}}$ を求める`,
          answer: String.raw`$\dfrac{\mathrm{OK}}{\mathrm{OA}}=\dfrac15$`,
          approach: String.raw`$\overrightarrow{\mathrm{OK}}$ は $\vec b$ の $\vec a$ 方向への正射影。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{OK}}=k\vec a$ とおくと、$\left(\vec b-k\vec a\right)\cdot\vec a=0$ より` },
            {
              k: "math",
              t: String.raw`k=\frac{\vec a\cdot\vec b}{\left|\vec a\right|^{2}}=\frac{5}{25}=\frac15`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OK}}=\dfrac15\vec a$ で $k>0$ だから` },
            { k: "math", t: String.raw`\frac{\mathrm{OK}}{\mathrm{OA}}=\frac15` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`座標で $\mathrm{B}$ から直線 $\mathrm{OA}$ に垂線を下ろすと、$\dfrac{\mathrm{OK}}{\mathrm{OA}}=0.2$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`平面 $\mathrm{OAB}$ 上の直線 $\ell$ は、点 $\mathrm{A}$ を通り、直線 $\mathrm{OA}$ とのなす角が $\angle\mathrm{OAB}$ と等しく、直線 $\mathrm{AB}$ とは異なる。$\ell$ と直線 $\mathrm{OH}$ の交点を $\mathrm{D}$ とするとき、$\dfrac{\mathrm{OD}}{\mathrm{OH}}$ を求める`,
          answer: String.raw`$\dfrac{\mathrm{OD}}{\mathrm{OH}}=\dfrac{15}{2}$`,
          approach: String.raw`$\ell$ は直線 $\mathrm{AB}$ を直線 $\mathrm{OA}$ について折り返したもの。平面 $\mathrm{OAB}$ に座標を入れると見通しがよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線 $\mathrm{AB}$ は点 $\mathrm{A}$ で直線 $\mathrm{OA}$ と $\angle\mathrm{OAB}$ をなす。同じ角をなす $\mathrm{A}$ 通りの直線は、$\mathrm{AB}$ とそれを直線 $\mathrm{OA}$ について折り返したものの2本だけである。$\ell\neq\mathrm{AB}$ なので、**$\ell$ は直線 $\mathrm{AB}$ の直線 $\mathrm{OA}$ に関する鏡映**である。`,
            },
            {
              k: "p",
              t: String.raw`平面 $\mathrm{OAB}$ に座標を入れる。$\mathrm{O}=\left(0,0\right)$、$\vec a$ を $x$ 軸方向にとって $\mathrm{A}=\left(5,0\right)$ とする。$\vec a\cdot\vec b=5$ より $\mathrm{B}$ の $x$ 座標は $\dfrac{5}{5}=1$ で、$\left|\vec b\right|=7$ から`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{B}=\left(1,\ \sqrt{49-1}\right)=\left(1,\ 4\sqrt3\right)`,
            },
            {
              k: "p",
              t: String.raw`である。(2) より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{H}=\frac{19}{30}\left(5,0\right)+\frac56\left(1,4\sqrt3\right)=\left(\frac{19}{6}+\frac56,\ \frac{10\sqrt3}{3}\right)=\left(4,\ \frac{10\sqrt3}{3}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\ell$ は $\mathrm{B}$ を $x$ 軸について折り返した $\mathrm{B}'=\left(1,-4\sqrt3\right)$ と $\mathrm{A}$ を通る直線で、方向ベクトルは $\mathrm{B}'-\mathrm{A}=\left(-4,-4\sqrt3\right)$、つまり $\left(1,\sqrt3\right)$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\ell\colon\left(x,y\right)=\left(5,0\right)+v\left(1,\sqrt3\right)`,
            },
            { k: "p", t: String.raw`である。直線 $\mathrm{OH}$ 上の点は $u\left(4,\dfrac{10\sqrt3}{3}\right)$ なので、交点では` },
            {
              k: "math",
              t: String.raw`4u=5+v,\qquad\frac{10\sqrt3}{3}u=\sqrt3\,v`,
            },
            { k: "p", t: String.raw`である。第2式から $v=\dfrac{10}{3}u$ で、第1式に入れると` },
            {
              k: "math",
              t: String.raw`4u=5+\frac{10}{3}u,\qquad\frac23u=5,\qquad u=\frac{15}{2}`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OD}}=u\,\overrightarrow{\mathrm{OH}}$ なので` },
            { k: "math", t: String.raw`\frac{\mathrm{OD}}{\mathrm{OH}}=\frac{15}{2}` },
            {
              k: "p",
              t: String.raw`である（$u>1$ なので $\mathrm{D}$ は $\mathrm{H}$ より遠い側にある）。`,
            },
            {
              k: "note",
              t: String.raw`$\cos\angle\mathrm{OAB}=\dfrac{\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AB}}}{\mathrm{AO}\cdot\mathrm{AB}}=\dfrac{20}{5\cdot8}=\dfrac12$ なので $\angle\mathrm{OAB}=60^{\circ}$ である。$\ell$ の傾きが $\sqrt3$、直線 $\mathrm{AB}$ の傾きが $-\sqrt3$ で、どちらも $x$ 軸と $60^{\circ}$ をなす。`,
            },
          ],
          pitfalls: [
            String.raw`「直線 $\mathrm{OA}$ とのなす角」なので、$\mathrm{AB}$ ともう1本（鏡映）の2本が候補になる。問題文の「$\mathrm{AB}$ とは異なる」でもう1本に決まる。`,
            String.raw`$\mathrm{D}$ は線分 $\mathrm{OH}$ の外にある。比が $1$ を超えてもよい。`,
          ],
          check: String.raw`座標で $\ell$ と直線 $\mathrm{OH}$ の交点を連立で求めると $\overrightarrow{\mathrm{OD}}=7.5\,\overrightarrow{\mathrm{OH}}$ で、$\dfrac{15}2$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分積分",
      topics: ["分数関数の極値", "帯分数の形に直す", "面積", "共有点の個数の場合分け"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "極値は $f\\left(-\\sqrt6\\right)=-5.5319726$、$f\\left(-1\\right)=0$、$f\\left(1\\right)=2$、$f\\left(\\sqrt6\\right)=7.5319726$ で、$1\\mp\\tfrac{8\\sqrt6}3$ と一致した",
          "面積を数値積分すると $2.7691707$ で、$\\tfrac{15}4+\\log\\tfrac38=2.7691707$ と一致した",
          "$m=-3,0,1,\\tfrac43,1.5,2,2.5,5$ で共有点の個数を数えると $3,3,3,1,1,1,3,3$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\dfrac{2x^{3}+x^{2}-4x-3}{x^{2}-3}$ の極値を求める`,
          answer: String.raw`極大値 $1-\dfrac{8\sqrt6}{3}$（$x=-\sqrt6$）と $2$（$x=1$）、極小値 $0$（$x=-1$）と $1+\dfrac{8\sqrt6}{3}$（$x=\sqrt6$）`,
          approach: String.raw`分子を分母で割って $f\left(x\right)=2x+1+\dfrac{2x}{x^{2}-3}$ にすると微分が楽。`,
          blocks: [
            { k: "p", t: String.raw`分子を分母で割ると $2x^{3}+x^{2}-4x-3=\left(x^{2}-3\right)\left(2x+1\right)+2x$ なので` },
            {
              k: "math",
              t: String.raw`f\left(x\right)=2x+1+\frac{2x}{x^{2}-3}\qquad\left(x\neq\pm\sqrt3\right)`,
            },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`\left\{\frac{2x}{x^{2}-3}\right\}'=\frac{2\left(x^{2}-3\right)-2x\cdot2x}{\left(x^{2}-3\right)^{2}}=\frac{-2\left(x^{2}+3\right)}{\left(x^{2}-3\right)^{2}}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=2-\frac{2\left(x^{2}+3\right)}{\left(x^{2}-3\right)^{2}}=\frac{2\left\{\left(x^{2}-3\right)^{2}-\left(x^{2}+3\right)\right\}}{\left(x^{2}-3\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。$u=x^{2}$ とおくと分子の中身は` },
            {
              k: "math",
              t: String.raw`\left(u-3\right)^{2}-\left(u+3\right)=u^{2}-7u+6=\left(u-1\right)\left(u-6\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{2\left(x^{2}-1\right)\left(x^{2}-6\right)}{\left(x^{2}-3\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$f'=0$ となるのは $x=\pm1,\pm\sqrt6$ で、符号は $x^{2}<1$ で正、$1<x^{2}<6$ で負、$x^{2}>6$ で正である。漸近線 $x=\pm\sqrt3$（$3$ は $1$ と $6$ の間）で切れることに注意して増減を追うと`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x=-\sqrt6$ … 正から負へ変わるので**極大**`,
                String.raw`$x=-1$ … 負から正へ変わるので**極小**`,
                String.raw`$x=1$ … 正から負へ変わるので**極大**`,
                String.raw`$x=\sqrt6$ … 負から正へ変わるので**極小**`,
              ],
            },
            { k: "p", t: String.raw`である。値は $f\left(x\right)=2x+1+\dfrac{2x}{x^{2}-3}$ から` },
            {
              k: "math",
              t: String.raw`f\left(\pm\sqrt6\right)=\pm2\sqrt6+1\pm\frac{2\sqrt6}{3}=1\pm\frac{8\sqrt6}{3}`,
            },
            {
              k: "math",
              t: String.raw`f\left(-1\right)=-2+1+\frac{-2}{-2}=0,\qquad f\left(1\right)=2+1+\frac{2}{-2}=2`,
            },
            { k: "p", t: String.raw`である。まとめると` },
            {
              k: "math",
              t: String.raw`\text{極大値}\ 1-\frac{8\sqrt6}{3}\ \left(x=-\sqrt6\right),\quad2\ \left(x=1\right)`,
            },
            {
              k: "math",
              t: String.raw`\text{極小値}\ 0\ \left(x=-1\right),\quad1+\frac{8\sqrt6}{3}\ \left(x=\sqrt6\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$x=-\sqrt6$ での極大値 $-5.53\ldots$ は $x=-1$ での極小値 $0$ より小さい。$x=\pm\sqrt3$ で曲線が切れているので、これで矛盾しない。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ。x = ±√3 が漸近線で、曲線は3つの枝に分かれる。極大は x = −√6 と x = 1、極小は x = −1 と x = √6。縦方向は縮めて描いてある。塗った部分は x 軸との間の面積で、x = −1 から x = 3/2 まで。",
                view: [-4.5, 4.5, -10, 12],
                items: [
                  { k: "fillBetween", top: F23, bottom: () => 0, from: -1, to: 1.5 },
                  { k: "curve", f: F23, from: -4.4, to: -1.9 },
                  { k: "curve", f: F23, from: -1.63, to: 1.63 },
                  { k: "curve", f: F23, from: 1.9, to: 4.4 },
                  { k: "seg", a: [-Math.sqrt(3), -10], b: [-Math.sqrt(3), 12], dash: true },
                  { k: "seg", a: [Math.sqrt(3), -10], b: [Math.sqrt(3), 12], dash: true },
                  { k: "dot", at: [-Math.sqrt(6), 1 - (8 * Math.sqrt(6)) / 3], label: "極大", place: "below" },
                  { k: "dot", at: [-1, 0], label: "極小", place: "below-left" },
                  { k: "dot", at: [1, 2], label: "極大", place: "above-right" },
                  { k: "dot", at: [Math.sqrt(6), 1 + (8 * Math.sqrt(6)) / 3], label: "極小", place: "above" },
                  { k: "text", at: [-Math.sqrt(3), 11], label: "x = −√3", place: "left" },
                  { k: "text", at: [Math.sqrt(3), -9], label: "x = √3", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=\pm\sqrt3$ は定義域から外れる。増減表はそこで切る。`,
          ],
          check: String.raw`数値で $f\left(-\sqrt6\right)=-5.5319726$、$f\left(\sqrt6\right)=7.5319726$ となり、$1\mp\dfrac{8\sqrt6}3$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`曲線 $y=f\left(x\right)$ と $x$ 軸で囲まれた図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{15}{4}+\log\dfrac38$`,
          approach: String.raw`分子を因数分解すると $\left(x+1\right)^{2}\left(2x-3\right)$。$x$ 軸との交点は $-1$ と $\dfrac32$ で、その間に漸近線はない。`,
          blocks: [
            { k: "p", t: String.raw`分子は` },
            {
              k: "math",
              t: String.raw`2x^{3}+x^{2}-4x-3=\left(x+1\right)\left(2x^{2}-x-3\right)=\left(x+1\right)^{2}\left(2x-3\right)`,
            },
            {
              k: "p",
              t: String.raw`と因数分解できるので、$f\left(x\right)=0$ となるのは $x=-1$ と $x=\dfrac32$ である。$-\sqrt3<-1$、$\dfrac32<\sqrt3$ なので、区間 $\left[-1,\dfrac32\right]$ に漸近線は入らない。`,
            },
            {
              k: "p",
              t: String.raw`この区間では $\left(x+1\right)^{2}\geqq0$、$2x-3<0$、$x^{2}-3<0$ なので $f\left(x\right)\geqq0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{-1}^{\frac32}\left(2x+1+\frac{2x}{x^{2}-3}\right)dx=\left[x^{2}+x+\log\left|x^{2}-3\right|\right]_{-1}^{\frac32}`,
            },
            { k: "p", t: String.raw`である。$x=\dfrac32$ では $\dfrac94+\dfrac32+\log\dfrac34=\dfrac{15}{4}+\log\dfrac34$、$x=-1$ では $1-1+\log2=\log2$ なので` },
            {
              k: "math",
              t: String.raw`S=\frac{15}{4}+\log\frac34-\log2=\frac{15}{4}+\log\frac38`,
            },
            { k: "p", t: String.raw`である（$2.769\ldots$）。` },
          ],
          pitfalls: [
            String.raw`$\dfrac32<\sqrt3=1.732\ldots$ なので、積分区間に漸近線は入らない。ここを確かめずに積分しない。`,
          ],
          check: String.raw`数値積分すると $2.7691707$ で、$\dfrac{15}4+\log\dfrac38=2.7691707$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$m$ を定数とするとき、曲線 $y=f\left(x\right)$ と直線 $y=mx+1$ の共有点の個数を求める`,
          answer: String.raw`$m<\dfrac43$ または $m>2$ のとき3個、$\dfrac43\leqq m\leqq2$ のとき1個`,
          approach: String.raw`分母を払うと3次式が $x$ でくくれて、$x=0$ と2次方程式に分かれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x\neq\pm\sqrt3$ のもとで $f\left(x\right)=mx+1$ は`,
            },
            {
              k: "math",
              t: String.raw`2x^{3}+x^{2}-4x-3=\left(mx+1\right)\left(x^{2}-3\right)=mx^{3}+x^{2}-3mx-3`,
            },
            { k: "p", t: String.raw`と同値である。整理すると` },
            {
              k: "math",
              t: String.raw`\left(2-m\right)x^{3}+\left(3m-4\right)x=0,\qquad x\left\{\left(2-m\right)x^{2}+3m-4\right\}=0`,
            },
            {
              k: "p",
              t: String.raw`である。$x=0$ はつねに解で、$f\left(0\right)=1$、直線も $y=1$ を通るので、点 $\left(0,1\right)$ はつねに共有点である。残りは`,
            },
            { k: "math", t: String.raw`\left(2-m\right)x^{2}=4-3m` },
            { k: "p", t: String.raw`の実数解である。` },
            {
              k: "steps",
              items: [
                String.raw`$m=2$ … $0=-2$ となり解なし。共有点は $x=0$ の**1個**。`,
                String.raw`$m\neq2$ … $x^{2}=\dfrac{4-3m}{2-m}$。右辺を $r$ とおく。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$r<0$ なら実数解なし、$r=0$ なら $x=0$ に重なる、$r>0$ なら $x=\pm\sqrt r$ の2個が加わる。なお $r=3$ とすると $4-3m=6-3m$ となり成り立たないので、$\pm\sqrt r$ が $\pm\sqrt3$ に一致することはない（定義域から外れる心配はない）。`,
            },
            { k: "p", t: String.raw`$r=\dfrac{4-3m}{2-m}$ の符号は` },
            {
              k: "steps",
              items: [
                String.raw`$m<\dfrac43$ … 分子も分母も正で $r>0$`,
                String.raw`$m=\dfrac43$ … $r=0$`,
                String.raw`$\dfrac43<m<2$ … 分子が負、分母が正で $r<0$`,
                String.raw`$m>2$ … 分子も分母も負で $r>0$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\text{共有点の個数}=\begin{cases}3&\left(m<\dfrac43\ \text{または}\ m>2\right)\\[4pt]1&\left(\dfrac43\leqq m\leqq2\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$y=mx+1$ はつねに $\left(0,1\right)$ を通り、そこは曲線上の点でもある。共有点は必ず1個以上ある。`,
            String.raw`$r=0$（$m=\dfrac43$）のときは $x=0$ が3重解になるだけで、共有点は増えない。`,
          ],
          check: String.raw`$m=-3,0,1,\dfrac43,1.5,2,2.5,5$ で解を数えると $3,3,3,1,1,1,3,3$ 個となり、場合分けと合った。`,
        },
      ],
    },
  ],
};
