import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2024年度（令和6年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\sqrt x\log x$。 */
const F24 = (x: number): number => Math.sqrt(x) * Math.log(x);
/** 第3問の曲線（トラクトリックス）。 */
const TRACT24 = (t: number): [number, number] => [
  Math.cos(t) + Math.log(Math.tan(t / 2)),
  Math.sin(t),
];
/** 第3問の図で接線を引く $\theta$。 */
const TH24 = 0.9;
const P24: [number, number] = TRACT24(TH24);
const Q24: [number, number] = [P24[0] - Math.cos(TH24), 0];

export const nitech2024: SolutionSet = {
  slug: "nitech",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["部分積分", "増減と最小値", "変曲点", "直交する接線の本数", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\tfrac29x^{\\frac32}\\left(3\\log x-2\\right)$ を数値微分すると $\\sqrt x\\log x$ と一致した",
          "最小値は $f\\left(e^{-2}\\right)=-0.7357589=-\\tfrac2e$",
          "$\\log t+2\\sqrt t+2=0$ の解は $t=0.0775425$ の1つだけで、そこでの $f'$ は $-1$",
          "面積を数値積分すると $18.2982550$ で、$\\tfrac{8e^{3}+4}9=18.2982550$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\sqrt x\log x$（$x>0$）について、不定積分 $\displaystyle\int f\left(x\right)dx$ を求める`,
          answer: String.raw`$\dfrac29x^{\frac32}\left(3\log x-2\right)+C$`,
          approach: String.raw`$\log x$ を微分する側にして部分積分。`,
          blocks: [
            { k: "p", t: String.raw`$\left(\dfrac23x^{\frac32}\right)'=x^{\frac12}$ なので、部分積分して` },
            {
              k: "math",
              t: String.raw`\int x^{\frac12}\log x\,dx=\frac23x^{\frac32}\log x-\int\frac23x^{\frac32}\cdot\frac1x\,dx=\frac23x^{\frac32}\log x-\frac23\int x^{\frac12}dx`,
            },
            { k: "p", t: String.raw`である。$\displaystyle\int x^{\frac12}dx=\dfrac23x^{\frac32}$ だから` },
            {
              k: "math",
              t: String.raw`\int f\left(x\right)dx=\frac23x^{\frac32}\log x-\frac49x^{\frac32}+C=\frac29x^{\frac32}\left(3\log x-2\right)+C`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\dfrac29x^{\frac32}\left(3\log x-2\right)$ を数値微分すると $\sqrt x\log x$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$f\left(x\right)$ の最小値を求める`,
          answer: String.raw`$x=e^{-2}$ のとき最小値 $-\dfrac2e$`,
          approach: String.raw`$f'\left(x\right)=\dfrac{\log x+2}{2\sqrt x}$。符号は分子だけで決まる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\frac{1}{2\sqrt x}\log x+\sqrt x\cdot\frac1x=\frac{\log x+2}{2\sqrt x}`,
            },
            {
              k: "p",
              t: String.raw`である。$2\sqrt x>0$ なので符号は $\log x+2$ で決まり、$0<x<e^{-2}$ で負、$x>e^{-2}$ で正である。よって $x=e^{-2}$ で最小になり`,
            },
            {
              k: "math",
              t: String.raw`f\left(e^{-2}\right)=e^{-1}\cdot\left(-2\right)=-\frac2e`,
            },
            { k: "p", t: String.raw`が最小値である。` },
          ],
          check: String.raw`$f\left(e^{-2}\right)=-0.7357589$ で、$-\dfrac2e=-0.7357589$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`曲線 $C\colon y=f\left(x\right)$ の変曲点の座標を求める`,
          answer: String.raw`$\left(1,0\right)$`,
          approach: String.raw`$f''$ の符号が変わるところを探す。`,
          blocks: [
            { k: "p", t: String.raw`$f'\left(x\right)=\dfrac12\left(\log x+2\right)x^{-\frac12}$ をもう一度微分すると` },
            {
              k: "math",
              t: String.raw`f''\left(x\right)=\frac12\left\{\frac1x\cdot x^{-\frac12}-\frac12\left(\log x+2\right)x^{-\frac32}\right\}=\frac{x^{-\frac32}}{4}\left\{2-\left(\log x+2\right)\right\}=-\frac{\log x}{4x^{\frac32}}`,
            },
            {
              k: "p",
              t: String.raw`である。$4x^{\frac32}>0$ なので符号は $-\log x$ で決まり、$0<x<1$ で正（下に凸）、$x>1$ で負（上に凸）である。$x=1$ の前後で凹凸が変わるので変曲点は`,
            },
            { k: "math", t: String.raw`\left(1,\ f\left(1\right)\right)=\left(1,0\right)` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$f''\left(0.5\right)=0.4901>0$、$f''\left(2\right)=-0.0613<0$ で、$x=1$ の前後で符号が変わった。`,
        },
        {
          label: "(4)",
          task: String.raw`点 $\left(1,0\right)$ における $C$ の接線を $\ell$ とする。$C$ の接線で $\ell$ と直交するものが何本あるか答える`,
          answer: String.raw`$1$ 本`,
          approach: String.raw`$\ell$ の傾きは $1$ なので、傾き $-1$ の接線を探す。接点の方程式の解の個数を数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f'\left(1\right)=\dfrac{0+2}{2}=1$ なので $\ell$ の傾きは $1$ である。これと直交する接線の傾きは $-1$ だから、接点 $t$ は`,
            },
            {
              k: "math",
              t: String.raw`\frac{\log t+2}{2\sqrt t}=-1,\qquad\log t+2\sqrt t+2=0`,
            },
            { k: "p", t: String.raw`を満たす。$g\left(t\right)=\log t+2\sqrt t+2$（$t>0$）とおくと` },
            { k: "math", t: String.raw`g'\left(t\right)=\frac1t+\frac1{\sqrt t}>0` },
            {
              k: "p",
              t: String.raw`なので $g$ は $t>0$ で単調に増加する。$t\to+0$ で $g\to-\infty$、$t\to\infty$ で $g\to\infty$ だから、$g\left(t\right)=0$ の解はただ1つである。接点が1つなら接線も1本なので、答えは**1本**である。`,
            },
            {
              k: "note",
              t: String.raw`$g\left(e^{-2}\right)=-2+2e^{-1}+2=\dfrac2e>0$、$g\left(e^{-4}\right)=-4+2e^{-2}+2=-2+\dfrac2{e^{2}}<0$ なので、解は $e^{-4}<t<e^{-2}$ の間にある（数値では $t=0.0775$）。`,
            },
          ],
          pitfalls: [
            String.raw`解を具体的に求める必要はない。単調性と極限から「ちょうど1つ」と言えればよい。`,
          ],
          check: String.raw`$\log t+2\sqrt t+2=0$ を二分法で解くと $t=0.0775425$ の1つだけで、そこでの $f'$ は $-1$ だった。`,
        },
        {
          label: "(5)",
          task: String.raw`曲線 $C$、$x$ 軸の $x\geqq1$ の部分、および直線 $x=e^{2}$ で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{8e^{3}+4}{9}$`,
          approach: String.raw`$x\geqq1$ では $f\geqq0$ なので、そのまま積分すればよい。(1) の原始関数を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(x\right)=\sqrt x\log x$ は $x\geqq1$ で $0$ 以上（$x=1$ でのみ $0$）なので`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{1}^{e^{2}}\sqrt x\log x\,dx=\left[\frac29x^{\frac32}\left(3\log x-2\right)\right]_{1}^{e^{2}}`,
            },
            { k: "p", t: String.raw`である。$x=e^{2}$ では $x^{\frac32}=e^{3}$、$\log x=2$ なので` },
            {
              k: "math",
              t: String.raw`\frac29e^{3}\left(6-2\right)=\frac89e^{3}`,
            },
            { k: "p", t: String.raw`で、$x=1$ では $\dfrac29\left(0-2\right)=-\dfrac49$ である。よって` },
            { k: "math", t: String.raw`S=\frac89e^{3}+\frac49=\frac{8e^{3}+4}{9}` },
            { k: "p", t: String.raw`である（$18.29\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = √x log x のグラフ。x = e の −2 乗で最小値 −2/e、x = 1 で x 軸と交わり同時に変曲点になる。塗った部分が x = 1 から x = e² までの面積。",
                view: [-0.35, 7.9, -1.1, 5.9],
                items: [
                  { k: "fillBetween", top: F24, bottom: () => 0, from: 1, to: Math.E ** 2 },
                  { k: "curve", f: F24, from: 0.02, to: 7.6 },
                  { k: "seg", a: [Math.E ** 2, 0], b: [Math.E ** 2, 2 * Math.E] },
                  { k: "dot", at: [Math.exp(-2), -2 / Math.E], label: "最小", place: "below" },
                  { k: "dot", at: [1, 0], label: "変曲点", place: "below-right" },
                  { k: "dot", at: [Math.E ** 2, 0], label: "x = e²", place: "below" },
                ],
              },
            },
          ],
          check: String.raw`数値積分すると $18.2982550$ で、$\dfrac{8e^{3}+4}9=18.2982550$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列",
      topics: ["群数列", "累積項数が平方数", "等比数列の和", "等差×等比の和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "実際に並べると $1\\mid2,4,8\\mid3,6,12,24,48\\mid4,\\ldots$ で、$a_{70}=288$",
          "$a_{n}=24$ となる $n$ は $8,28,123,530$ の4つ",
          "$T_{m}=m\\left(2^{2m-1}-1\\right)$ と $S_{m}=\\tfrac29\\left\\{\\left(3m-1\\right)4^{m}+1\\right\\}-\\tfrac{m\\left(m+1\\right)}2$ が $m=1,\\ldots,11$ で一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`第 $m$ 群に $2m-1$ 個の自然数が入り、第 $m$ 群の $k$ 番目が $m\cdot2^{k-1}$ である数列 $\left\{a_{n}\right\}$ について、$a_{70}$ を求める`,
          answer: String.raw`$a_{70}=288$`,
          approach: String.raw`第 $m$ 群までの項数の合計は $\displaystyle\sum_{i=1}^{m}\left(2i-1\right)=m^{2}$。`,
          blocks: [
            { k: "p", t: String.raw`第 $m$ 群までの項数は` },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{m}\left(2i-1\right)=m^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$8^{2}=64<70\leqq81=9^{2}$ なので、$a_{70}$ は第9群にあり、群の中では`,
            },
            { k: "math", t: String.raw`k=70-64=6` },
            { k: "p", t: String.raw`番目である。よって` },
            { k: "math", t: String.raw`a_{70}=9\cdot2^{6-1}=9\cdot32=288` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`実際に並べて70番目を取り出すと $288$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_{n}=24$ となる $n$ をすべて求める`,
          answer: String.raw`$n=8,\ 28,\ 123,\ 530$`,
          approach: String.raw`$m\cdot2^{k-1}=24$ となる自然数の組を並べ、各組が $k\leqq2m-1$ を満たすか確かめる。`,
          blocks: [
            { k: "p", t: String.raw`$m\cdot2^{k-1}=24$ となる自然数の組は` },
            {
              k: "steps",
              items: [
                String.raw`$k=1$ … $m=24$。$k\leqq2m-1=47$ ✓。$n=23^{2}+1=530$`,
                String.raw`$k=2$ … $m=12$。$k\leqq23$ ✓。$n=11^{2}+2=123$`,
                String.raw`$k=3$ … $m=6$。$k\leqq11$ ✓。$n=5^{2}+3=28$`,
                String.raw`$k=4$ … $m=3$。$k\leqq5$ ✓。$n=2^{2}+4=8$`,
                String.raw`$k=5$ … $m=\dfrac{24}{16}$ は自然数でない`,
                String.raw`$k\geqq6$ … $2^{k-1}\geqq32>24$ で不適`,
              ],
            },
            {
              k: "p",
              t: String.raw`である（$n$ は第 $m$ 群の手前までの項数 $\left(m-1\right)^{2}$ に $k$ を足したもの）。よって`,
            },
            { k: "math", t: String.raw`n=8,\ 28,\ 123,\ 530` },
            { k: "p", t: String.raw`の4つである。` },
          ],
          pitfalls: [
            String.raw`第 $m$ 群の項数は $2m-1$ なので、$k\leqq2m-1$ を必ず確かめる。$m$ が小さいと $k$ が入りきらないことがある。`,
          ],
          check: String.raw`実際に並べて $24$ の出る位置を調べると $8,28,123,530$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`第 $m$ 群のすべての自然数の和 $T_{m}$ を $m$ で表す`,
          answer: String.raw`$T_{m}=m\left(2^{2m-1}-1\right)$`,
          approach: String.raw`第 $m$ 群は初項 $m$、公比 $2$、項数 $2m-1$ の等比数列。`,
          blocks: [
            {
              k: "math",
              t: String.raw`T_{m}=\sum_{k=1}^{2m-1}m\cdot2^{k-1}=m\cdot\frac{2^{2m-1}-1}{2-1}=m\left(2^{2m-1}-1\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$m=1,2,3$ で $1,14,93$ となり、$1$、$2+4+8$、$3+6+12+24+48$ と合う）。`,
            },
          ],
          check: String.raw`$m=1,\ldots,11$ で、直接の和と式が一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$S_{m}=\displaystyle\sum_{i=1}^{m}T_{i}$ を $m$ で表す`,
          answer: String.raw`$S_{m}=\dfrac29\left\{\left(3m-1\right)4^{m}+1\right\}-\dfrac{m\left(m+1\right)}{2}$`,
          approach: String.raw`$T_{i}=i\cdot2^{2i-1}-i=\dfrac12i\cdot4^{i}-i$。$\sum i\cdot4^{i}$ は4倍してずらす。`,
          blocks: [
            { k: "p", t: String.raw`$2^{2i-1}=\dfrac{4^{i}}{2}$ なので $T_{i}=\dfrac12i\cdot4^{i}-i$ である。$U=\displaystyle\sum_{i=1}^{m}i\cdot4^{i}$ とおくと` },
            {
              k: "math",
              t: String.raw`U=1\cdot4+2\cdot4^{2}+\cdots+m\cdot4^{m}`,
            },
            {
              k: "math",
              t: String.raw`4U=\phantom{1\cdot4+{}}1\cdot4^{2}+\cdots+\left(m-1\right)4^{m}+m\cdot4^{m+1}`,
            },
            { k: "p", t: String.raw`で、辺々引くと` },
            {
              k: "math",
              t: String.raw`-3U=4+4^{2}+\cdots+4^{m}-m\cdot4^{m+1}=\frac{4\left(4^{m}-1\right)}{3}-m\cdot4^{m+1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`U=\frac{m\cdot4^{m+1}}{3}-\frac{4\left(4^{m}-1\right)}{9}=\frac{12m\cdot4^{m}-4\cdot4^{m}+4}{9}=\frac{4\left\{\left(3m-1\right)4^{m}+1\right\}}{9}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`S_{m}=\frac12U-\sum_{i=1}^{m}i=\frac29\left\{\left(3m-1\right)4^{m}+1\right\}-\frac{m\left(m+1\right)}{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$m=1,2,3$ で $1,15,108$ となり、$T_{1}=1$、$T_{1}+T_{2}=15$、$+93=108$ と合う）。`,
            },
          ],
          check: String.raw`$m=1,\ldots,11$ で、直接の和と式が一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "媒介変数表示・積分法",
      topics: ["媒介変数の微分", "接線が切り取る長さが一定", "曲線の長さ", "y で積分する面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\tfrac{dx}{d\\theta}=\\tfrac{\\cos^{2}\\theta}{\\sin\\theta}$ を数値微分と突き合わせた（$\\theta=0.2,0.8,1.5$ で一致）",
          "$\\theta=0.3,0.9,1.4$ で接線の傾きが $\\tan\\theta$ になり、$\\mathrm{PQ}=1.000000000000$ だった",
          "長さを数値積分すると $0.6931472=\\log2$、面積は $0.0025927$ で $\\tfrac\\pi{12}+\\tfrac{\\sqrt3}8-\\tfrac{\\sqrt3}4\\log3=0.0025927$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x\left(\theta\right)=\cos\theta+\log\left(\tan\dfrac\theta2\right)$、$y\left(\theta\right)=\sin\theta$（$0<\theta\leqq\dfrac\pi2$）で定まる曲線 $C$ について、$0<\theta<\dfrac\pi2$ で $\dfrac{dx}{d\theta}>0$ を示す`,
          answer: String.raw`$\dfrac{dx}{d\theta}=\dfrac{\cos^{2}\theta}{\sin\theta}>0$`,
          approach: String.raw`$\left\{\log\tan\dfrac\theta2\right\}'=\dfrac1{\sin\theta}$ が効く。2倍角でまとめる。`,
          blocks: [
            { k: "p", t: String.raw`$\left(\tan\dfrac\theta2\right)'=\dfrac12\cdot\dfrac1{\cos^{2}\frac\theta2}$ なので` },
            {
              k: "math",
              t: String.raw`\left\{\log\tan\frac\theta2\right\}'=\frac{1}{\tan\frac\theta2}\cdot\frac{1}{2\cos^{2}\frac\theta2}=\frac{1}{2\sin\frac\theta2\cos\frac\theta2}=\frac1{\sin\theta}`,
            },
            { k: "p", t: String.raw`である（2倍角 $\sin\theta=2\sin\dfrac\theta2\cos\dfrac\theta2$）。よって` },
            {
              k: "math",
              t: String.raw`\frac{dx}{d\theta}=-\sin\theta+\frac1{\sin\theta}=\frac{1-\sin^{2}\theta}{\sin\theta}=\frac{\cos^{2}\theta}{\sin\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<\theta<\dfrac\pi2$ では $\cos\theta\neq0$ より $\cos^{2}\theta>0$、$\sin\theta>0$ なので $\dfrac{dx}{d\theta}>0$ である。`,
            },
          ],
          check: String.raw`$\theta=0.2,0.8,1.5$ で数値微分すると、$\dfrac{\cos^{2}\theta}{\sin\theta}$ と小数7桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ 上の点 $\mathrm{P}$ における接線と $x$ 軸との交点を $\mathrm{Q}$ とするとき、線分 $\mathrm{PQ}$ の長さが $\theta$ によらず一定であることを示す（$\mathrm{P}$ は $\left(0,1\right)$ とは異なるとする）`,
          answer: String.raw`$\mathrm{PQ}=1$（一定）`,
          approach: String.raw`$\dfrac{dy}{dx}=\tan\theta$ になる。$\mathrm{Q}$ の座標を出せば、$\mathrm{PQ}$ の成分がちょうど $\left(\cos\theta,\sin\theta\right)$ の大きさになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\dfrac{dy}{d\theta}=\cos\theta$ と (1) より、$0<\theta<\dfrac\pi2$ で`,
            },
            {
              k: "math",
              t: String.raw`\frac{dy}{dx}=\frac{\cos\theta}{\frac{\cos^{2}\theta}{\sin\theta}}=\frac{\sin\theta}{\cos\theta}=\tan\theta`,
            },
            {
              k: "p",
              t: String.raw`である（$\theta=\dfrac\pi2$ のとき $\mathrm{P}=\left(0,1\right)$ で接線は縦になり、$x$ 軸と交わらない。だから除いてある）。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}=\left(x\left(\theta\right),\sin\theta\right)$ での接線は $y-\sin\theta=\tan\theta\left(X-x\left(\theta\right)\right)$ で、$y=0$ とすると`,
            },
            {
              k: "math",
              t: String.raw`X-x\left(\theta\right)=-\frac{\sin\theta}{\tan\theta}=-\cos\theta`,
            },
            { k: "p", t: String.raw`なので $\mathrm{Q}=\left(x\left(\theta\right)-\cos\theta,\ 0\right)$ である。したがって` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}=\sqrt{\cos^{2}\theta+\sin^{2}\theta}=1`,
            },
            { k: "p", t: String.raw`で、$\theta$ によらず一定である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 C と、その上の点 P における接線。接線が x 軸と交わる点を Q とすると、PQ の長さはどの P でも 1 になる。曲線は左へ伸びて x 軸に近づき、θ = π/2 では点 (0, 1) に達する。",
                view: [-3.0, 0.65, -0.18, 1.28],
                items: [
                  { k: "param", f: TRACT24, from: 0.045, to: Math.PI / 2 },
                  { k: "seg", a: P24, b: Q24 },
                  { k: "dot", at: P24, label: "P", place: "right" },
                  { k: "dot", at: Q24, label: "Q", place: "below" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "above-right" },
                  { k: "text", at: [(P24[0] + Q24[0]) / 2, P24[1] / 2], label: "PQ = 1", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`「引いた接線が $x$ 軸から切り取る長さが一定」という性質をもつ曲線で、トラクトリックス（追跡線）と呼ばれる。長さ $1$ のひもの一端を $x$ 軸に沿って引いたときに、もう一端が描く線である。`,
            },
          ],
          check: String.raw`$\theta=0.3,0.9,1.4$ で接線の傾きが $\tan\theta$ になり、$\mathrm{PQ}=1.000000000000$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`曲線 $C$ の $\dfrac\pi6\leqq\theta\leqq\dfrac\pi2$ の部分の長さ $L$ を求める`,
          answer: String.raw`$L=\log2$`,
          approach: String.raw`$\left(\dfrac{dx}{d\theta}\right)^{2}+\left(\dfrac{dy}{d\theta}\right)^{2}$ がきれいに $\dfrac{\cos^{2}\theta}{\sin^{2}\theta}$ になる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\left(\frac{dx}{d\theta}\right)^{2}+\left(\frac{dy}{d\theta}\right)^{2}=\frac{\cos^{4}\theta}{\sin^{2}\theta}+\cos^{2}\theta=\cos^{2}\theta\cdot\frac{\cos^{2}\theta+\sin^{2}\theta}{\sin^{2}\theta}=\frac{\cos^{2}\theta}{\sin^{2}\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac\pi6\leqq\theta\leqq\dfrac\pi2$ では $\cos\theta\geqq0$、$\sin\theta>0$ なので、根号をはずすと $\dfrac{\cos\theta}{\sin\theta}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`L=\int_{\frac\pi6}^{\frac\pi2}\frac{\cos\theta}{\sin\theta}d\theta=\Bigl[\log\sin\theta\Bigr]_{\frac\pi6}^{\frac\pi2}=\log1-\log\frac12=\log2`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値積分すると $0.6931472$ で、$\log2=0.6931472$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`曲線 $C$、直線 $y=\dfrac{\sqrt3}{2}$、および $y$ 軸で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac\pi{12}+\dfrac{\sqrt3}{8}-\dfrac{\sqrt3}{4}\log3$`,
          approach: String.raw`この部分では $x\leqq0$ なので、$y$ について $-x$ を積分する。$y=\sin\theta$ で置換する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=\dfrac{\sqrt3}{2}$ となるのは $\sin\theta=\dfrac{\sqrt3}{2}$、$0<\theta\leqq\dfrac\pi2$ より $\theta=\dfrac\pi3$ である。$\theta=\dfrac\pi2$ では $x=0+\log\tan\dfrac\pi4=0$、$y=1$ なので、曲線は $y$ 軸上の点 $\left(0,1\right)$ に達する。`,
            },
            {
              k: "p",
              t: String.raw`(1) より $x$ は $\theta$ について増加するので、$\dfrac\pi3\leqq\theta\leqq\dfrac\pi2$ では $x\leqq0$ である。したがって求める図形は、$\dfrac{\sqrt3}{2}\leqq y\leqq1$ で曲線と $y$ 軸にはさまれた部分で`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{\frac{\sqrt3}{2}}^{1}\left(0-x\right)dy=-\int_{\frac\pi3}^{\frac\pi2}x\left(\theta\right)\cos\theta\,d\theta`,
            },
            { k: "p", t: String.raw`である（$y=\sin\theta$、$dy=\cos\theta\,d\theta$）。2つに分ける。` },
            {
              k: "math",
              t: String.raw`\int_{\frac\pi3}^{\frac\pi2}\cos^{2}\theta\,d\theta=\left[\frac\theta2+\frac{\sin2\theta}{4}\right]_{\frac\pi3}^{\frac\pi2}=\frac\pi4-\left(\frac\pi6+\frac{\sqrt3}{8}\right)=\frac\pi{12}-\frac{\sqrt3}{8}`,
            },
            {
              k: "p",
              t: String.raw`もう一方は部分積分する。$\left\{\log\tan\dfrac\theta2\right\}'=\dfrac1{\sin\theta}$（(1) で示した）なので`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac\pi3}^{\frac\pi2}\cos\theta\log\tan\frac\theta2\,d\theta=\Bigl[\sin\theta\log\tan\frac\theta2\Bigr]_{\frac\pi3}^{\frac\pi2}-\int_{\frac\pi3}^{\frac\pi2}\sin\theta\cdot\frac1{\sin\theta}d\theta`,
            },
            {
              k: "p",
              t: String.raw`である。$\theta=\dfrac\pi2$ では $\log\tan\dfrac\pi4=0$、$\theta=\dfrac\pi3$ では $\sin\dfrac\pi3\log\tan\dfrac\pi6=\dfrac{\sqrt3}{2}\log\dfrac1{\sqrt3}=-\dfrac{\sqrt3}{4}\log3$ なので`,
            },
            {
              k: "math",
              t: String.raw`=\frac{\sqrt3}{4}\log3-\left(\frac\pi2-\frac\pi3\right)=\frac{\sqrt3}{4}\log3-\frac\pi6`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`S=-\left(\frac\pi{12}-\frac{\sqrt3}{8}\right)-\left(\frac{\sqrt3}{4}\log3-\frac\pi6\right)=\frac\pi{12}+\frac{\sqrt3}{8}-\frac{\sqrt3}{4}\log3`,
            },
            { k: "p", t: String.raw`である（$0.00259\ldots$ とごく小さい）。` },
          ],
          pitfalls: [
            String.raw`この区間で $x$ は負なので、$y$ 軸までの横幅は $-x$ である。符号を落とすと答えが負になる。`,
            String.raw`$\log\tan\dfrac\pi6=\log\dfrac1{\sqrt3}=-\dfrac12\log3$ である。`,
          ],
          check: String.raw`数値積分すると $0.0025927$ で、$\dfrac\pi{12}+\dfrac{\sqrt3}8-\dfrac{\sqrt3}4\log3=0.0025927$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["内分点と重心", "辺の長さから内積", "展開図と円に内接する四角形", "2次関数の最小"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec a\\cdot\\vec b=3$、$\\vec b\\cdot\\vec c=\\tfrac52$、$\\vec c\\cdot\\vec a=-\\tfrac75$ のグラム行列は正定値（行列式 $314.36$）で、四面体は実在する",
          "その内積で座標を作り、平面 $\\mathrm{ABC}$ 上に $\\mathrm{OAC}$ を折り出すと、$\\mathrm{O}'$ は $\\triangle\\mathrm{ABC}$ の外接円上にちょうど乗った（距離と半径がどちらも $2.3213360$）",
          "$\\mathrm{DG}$ を $t$ について $0.00001$ 刻みで走査すると最小は $t=0.15714$ で、$\\tfrac{11}{70}=0.1571429$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四面体 $\mathrm{OABC}$ で $\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ とする。辺 $\mathrm{AB}$ を $1:2$ に内分する点を $\mathrm{D}$、辺 $\mathrm{OA}$ を $1-t:t$ に内分する点を $\mathrm{P}$、辺 $\mathrm{OB}$ を $t:1-t$ に内分する点を $\mathrm{Q}$、三角形 $\mathrm{CPQ}$ の重心を $\mathrm{G}$ とするとき、$\overrightarrow{\mathrm{OD}},\overrightarrow{\mathrm{OG}}$ を表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OD}}=\dfrac{2\vec a+\vec b}{3}$、$\overrightarrow{\mathrm{OG}}=\dfrac{\left(1-t\right)\vec a+t\vec b+\vec c}{3}$`,
          approach: String.raw`内分点と重心の公式をそのまま使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{AD}:\mathrm{DB}=1:2$ なので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=\frac{2\vec a+1\cdot\vec b}{1+2}=\frac{2\vec a+\vec b}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{OP}:\mathrm{PA}=1-t:t$ より $\overrightarrow{\mathrm{OP}}=\left(1-t\right)\vec a$、$\mathrm{OQ}:\mathrm{QB}=t:1-t$ より $\overrightarrow{\mathrm{OQ}}=t\vec b$ である。三角形 $\mathrm{CPQ}$ の重心だから`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OG}}=\frac{\vec c+\left(1-t\right)\vec a+t\vec b}{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=0$ で $\mathrm{P}=\mathrm{A}$、$\mathrm{Q}=\mathrm{O}$、$t=1$ で $\mathrm{P}=\mathrm{O}$、$\mathrm{Q}=\mathrm{B}$ になり、内分の向きと合っている。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{OA}=2$、$\mathrm{OB}=3$、$\mathrm{OC}=\sqrt{14}$、$\mathrm{AB}=\sqrt7$、$\mathrm{BC}=3\sqrt2$ のとき、$\vec a\cdot\vec b$ および $\vec b\cdot\vec c$ を求める`,
          answer: String.raw`$\vec a\cdot\vec b=3$、$\vec b\cdot\vec c=\dfrac52$`,
          approach: String.raw`$\left|\vec b-\vec a\right|^{2}=\left|\vec a\right|^{2}-2\vec a\cdot\vec b+\left|\vec b\right|^{2}$ を使うだけ。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=\left|\vec b-\vec a\right|^{2}=4-2\vec a\cdot\vec b+9=7\ \Longrightarrow\ \vec a\cdot\vec b=3`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BC}^{2}=\left|\vec c-\vec b\right|^{2}=9-2\vec b\cdot\vec c+14=18\ \Longrightarrow\ \vec b\cdot\vec c=\frac52`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`この値で $\mathrm{AB}=\sqrt7$、$\mathrm{BC}=3\sqrt2$ が再現した。`,
        },
        {
          label: "(3)",
          task: String.raw`四面体を辺 $\mathrm{OA},\mathrm{OB},\mathrm{OC}$ で切り開いた展開図を平面 $\mathrm{ABC}$ 上に描き、三角形 $\mathrm{OAC}$ に対応する三角形を $\mathrm{O}'\mathrm{AC}$ とすると、四角形 $\mathrm{O}'\mathrm{ABC}$ は円に内接する。このとき $\vec c\cdot\vec a$ を求める`,
          answer: String.raw`$\vec c\cdot\vec a=-\dfrac75$`,
          approach: String.raw`$\triangle\mathrm{O}'\mathrm{AC}$ は $\triangle\mathrm{OAC}$ と合同なので $\angle\mathrm{AO}'\mathrm{C}=\angle\mathrm{AOC}$。円に内接する四角形では向かい合う角の和が $\pi$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`四角形 $\mathrm{O}'\mathrm{ABC}$ で $\mathrm{O}'$ と $\mathrm{B}$ は向かい合う頂点なので、円に内接する条件は`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{AO}'\mathrm{C}+\angle\mathrm{ABC}=\pi`,
            },
            {
              k: "p",
              t: String.raw`である。$\triangle\mathrm{O}'\mathrm{AC}$ は折り出す前の $\triangle\mathrm{OAC}$ と合同だから $\angle\mathrm{AO}'\mathrm{C}=\angle\mathrm{AOC}$ で、条件は`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{AOC}=-\cos\angle\mathrm{ABC}`,
            },
            { k: "p", t: String.raw`と書ける。$k=\vec c\cdot\vec a$ とおく。左辺は` },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{AOC}=\frac{\vec a\cdot\vec c}{\left|\vec a\right|\left|\vec c\right|}=\frac{k}{2\sqrt{14}}`,
            },
            { k: "p", t: String.raw`である。右辺は、$\overrightarrow{\mathrm{BA}}=\vec a-\vec b$、$\overrightarrow{\mathrm{BC}}=\vec c-\vec b$ として` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{BA}}\cdot\overrightarrow{\mathrm{BC}}=\vec a\cdot\vec c-\vec a\cdot\vec b-\vec b\cdot\vec c+\left|\vec b\right|^{2}=k-3-\frac52+9=k+\frac72`,
            },
            { k: "p", t: String.raw`で、$\mathrm{BA}=\sqrt7$、$\mathrm{BC}=3\sqrt2$ だから` },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{ABC}=\frac{k+\frac72}{\sqrt7\cdot3\sqrt2}=\frac{k+\frac72}{3\sqrt{14}}`,
            },
            { k: "p", t: String.raw`である。条件に入れて両辺を $\sqrt{14}$ 倍すると` },
            {
              k: "math",
              t: String.raw`\frac k2=-\frac{k+\frac72}{3},\qquad3k=-2k-7,\qquad k=-\frac75`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{AC}^{2}=\left|\vec c-\vec a\right|^{2}=4+14-2\left(-\dfrac75\right)=\dfrac{104}{5}$ で、$\mathrm{AC}=\dfrac{2\sqrt{130}}{5}=4.56\ldots$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「$\mathrm{O}'$ と $\mathrm{B}$ が向かい合う」ことを押さえる。四角形 $\mathrm{O}'\mathrm{ABC}$ の並びから決まる。`,
            String.raw`折り出しても三角形は合同なので、$\angle\mathrm{AO}'\mathrm{C}$ は四面体の $\angle\mathrm{AOC}$ と同じ。ここが展開図を使う意味である。`,
          ],
          check: String.raw`この内積で座標を作り、平面 $\mathrm{ABC}$ 上に $\triangle\mathrm{OAC}$ を折り出すと、$\mathrm{O}'$ は $\triangle\mathrm{ABC}$ の外接円上にちょうど乗った（中心からの距離と半径がどちらも $2.3213360$）。`,
        },
        {
          label: "(4)",
          task: String.raw`$\mathrm{DG}$ を最小にする $t$ の値を求める`,
          answer: String.raw`$t=\dfrac{11}{70}$`,
          approach: String.raw`$\overrightarrow{\mathrm{DG}}$ を $\vec a,\vec b,\vec c$ で表し、$\left|\overrightarrow{\mathrm{DG}}\right|^{2}$ を $t$ の2次関数にする。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{DG}}=\overrightarrow{\mathrm{OG}}-\overrightarrow{\mathrm{OD}}=\frac{\left(1-t\right)\vec a+t\vec b+\vec c-2\vec a-\vec b}{3}=\frac{-\left(1+t\right)\vec a+\left(t-1\right)\vec b+\vec c}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\vec a\right|^{2}=4$、$\left|\vec b\right|^{2}=9$、$\left|\vec c\right|^{2}=14$、$\vec a\cdot\vec b=3$、$\vec b\cdot\vec c=\dfrac52$、$\vec c\cdot\vec a=-\dfrac75$ を使って、分子の大きさの2乗を計算する。`,
            },
            {
              k: "math",
              t: String.raw`4\left(1+t\right)^{2}+9\left(t-1\right)^{2}+14-6\left(1+t\right)\left(t-1\right)+5\left(t-1\right)+\frac{14}{5}\left(1+t\right)`,
            },
            {
              k: "p",
              t: String.raw`である（交差項の符号は、$\vec a$ の係数が $-\left(1+t\right)$、$\vec b$ の係数が $t-1$、$\vec c$ の係数が $1$ であることから決まる）。展開すると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t^{2}$ の係数 … $4+9-6=7$`,
                String.raw`$t$ の係数 … $8-18+5+\dfrac{14}{5}=-\dfrac{11}{5}$`,
                String.raw`定数項 … $4+9+14+6-5+\dfrac{14}{5}=\dfrac{154}{5}$`,
              ],
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`9\,\mathrm{DG}^{2}=7t^{2}-\frac{11}{5}t+\frac{154}{5}`,
            },
            {
              k: "p",
              t: String.raw`である。$t^{2}$ の係数が正なので、これを最小にする $t$ は`,
            },
            {
              k: "math",
              t: String.raw`t=\frac{\frac{11}{5}}{2\cdot7}=\frac{11}{70}`,
            },
            {
              k: "p",
              t: String.raw`である（$0<\dfrac{11}{70}<1$ なので、$\mathrm{P},\mathrm{Q}$ は辺の内部にあり条件を満たす）。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{DG}$ そのものではなく $\mathrm{DG}^{2}$ を最小にすればよい（$\mathrm{DG}\geqq0$ だから同じ $t$ で最小になる）。`,
          ],
          check: String.raw`$t$ を $0.00001$ 刻みで走査して $\mathrm{DG}$ を計算すると、最小は $t=0.15714$ で $\dfrac{11}{70}=0.1571429$ と一致した。`,
        },
      ],
    },
  ],
};
