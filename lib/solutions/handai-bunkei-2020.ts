import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2020年度（令和2年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 *
 * この年度も理系と重なる。第2問は理系 第2問と同じ「3 で割った余りのランダムウォーク」で
 * 答えの式も同じ。第3問は理系 第3問（∠ACB=n∠ABC で c<nb）の n=3 の場合にあたる。
 */

/** 第1問の図。$\sin a=-\tfrac12$（$M$ が最小のとき）。 */
const S20B = -0.5;
const F20B = (x: number): number =>
  2 * x ** 3 - (6 + 3 * S20B) * x * x + 12 * S20B * x + S20B ** 3 + 6 * S20B + 5;
/** 第1問(2)。$M\left(a\right)=6s^{2}+6s+5$（$s=\sin a$）。 */
const M20B = (s: number): number => 6 * s * s + 6 * s + 5;

/** 第3問の図。$\angle\mathrm{ABC}=30^{\circ}$、$\angle\mathrm{ACB}=90^{\circ}$ の場合。 */
const H20B = Math.tan(Math.PI / 6);

export const handaiBunkei2020: SolutionSet = {
  slug: "handai-bunkei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・三角関数",
      topics: ["3次関数の極値", "因数分解", "2次関数の最大最小", "三角方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$s=\\sin a$ を $-1$ から $1$ まで $0.001$ 刻みに動かし、$6$ 点で数値微分と $6\\left(x-2\\right)\\left(x-s\\right)$ を比べると差は $10^{-3}$ 未満、$f\\left(s\\right)$ と $6s^{2}+6s+5$ は完全に一致した（違反 $0$ 件）",
          "$M=6s^{2}+6s+5$ を $-1\\le s\\le1$ で $40$ 万等分すると、最大 $17.0000000$（$s=1$）、最小 $3.5000000$（$s=-0.5$）で、$\\sin\\tfrac{7\\pi}{6}=\\sin\\tfrac{11\\pi}{6}=-0.5$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を $0\le a<2\pi$ をみたす実数とし、$f\left(x\right)=2x^{3}-\left(6+3\sin a\right)x^{2}+\left(12\sin a\right)x+\sin^{3}a+6\sin a+5$ とする。$f\left(x\right)$ がただ1つの極大値をもつことを示し、その極大値 $M\left(a\right)$ を求める`,
          answer: String.raw`$f'\left(x\right)=6\left(x-2\right)\left(x-\sin a\right)$ で $\sin a\le1<2$ だから極大は $x=\sin a$ の1つだけ。$M\left(a\right)=6\sin^{2}a+6\sin a+5$`,
          approach: String.raw`$s=\sin a$ とおく。$f'$ が $6\left(x-2\right)\left(x-s\right)$ と因数分解でき、$s<2$ が効く。`,
          blocks: [
            { k: "p", t: String.raw`$s=\sin a$ とおくと $-1\le s\le1$ である。微分すると` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=6x^{2}-2\left(6+3s\right)x+12s=6\left\{x^{2}-\left(2+s\right)x+2s\right\}`,
            },
            { k: "p", t: String.raw`であり、中括弧は因数分解できて` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=6\left(x-2\right)\left(x-s\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$s\le1<2$ なので $s<2$ であり、$f'$ の符号は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x<s$：$\left(x-2\right)<0$、$\left(x-s\right)<0$ より $f'>0$（増加）`,
                String.raw`$s<x<2$：$\left(x-2\right)<0$、$\left(x-s\right)>0$ より $f'<0$（減少）`,
                String.raw`$x>2$：どちらも正で $f'>0$（増加）`,
              ],
            },
            {
              k: "p",
              t: String.raw`と変わる。よって $f$ は $x=s$ で極大、$x=2$ で極小になり、**極大値はただ1つ**である。`,
            },
            { k: "p", t: String.raw`極大値は $x=s$ を代入して` },
            {
              k: "math",
              t: String.raw`\begin{aligned}f\left(s\right)&=2s^{3}-\left(6+3s\right)s^{2}+12s\cdot s+s^{3}+6s+5\\ &=2s^{3}-6s^{2}-3s^{3}+12s^{2}+s^{3}+6s+5\\ &=\left(2-3+1\right)s^{3}+\left(-6+12\right)s^{2}+6s+5\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$s^{3}$ の係数が $0$ になって3次の項が消え`,
            },
            {
              k: "math",
              t: String.raw`M\left(a\right)=6\sin^{2}a+6\sin a+5`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "sin a = −1/2（M が最小になるとき）のグラフ。極大は x = sin a、極小は x = 2 の 1 つずつ。sin a は 1 以下なのでいつも極大が左、極小が右にくる。",
                view: [-1.4, 3.4, -14.5, 6.5],
                step: { x: 1, y: 5 },
                items: [
                  { k: "curve", f: F20B, from: -1.3, to: 3.3 },
                  { k: "dot", at: [S20B, F20B(S20B)], label: "極大（x = sin a）", place: "above-right" },
                  { k: "dot", at: [2, F20B(2)], label: "極小（x = 2）", place: "below-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\sin^{3}a$ の項が定数項に置いてあるのは、$x=s$ を代入したときに $2s^{3}-3s^{3}+s^{3}=0$ とちょうど打ち消すためである。おかげで $M$ は $s$ の**2次式**になり、(2) が2次関数の最大最小に落ちる。`,
            },
          ],
          pitfalls: [
            String.raw`$f'$ の因数分解で $x^{2}-\left(2+s\right)x+2s=\left(x-2\right)\left(x-s\right)$。和が $2+s$、積が $2s$ と確かめる。`,
            String.raw`$s<2$（$\sin a\le1$）を言わないと、どちらが極大か決まらない。`,
          ],
          check: String.raw`$s$ を $0.001$ 刻みで動かして、$f'$ と $6\left(x-2\right)\left(x-s\right)$、$f\left(s\right)$ と $6s^{2}+6s+5$ が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$0\le a<2\pi$ における $M\left(a\right)$ の最大値とそのときの $a$ の値、最小値とそのときの $a$ の値をそれぞれ求める`,
          answer: String.raw`最大値 $17$（$a=\dfrac{\pi}{2}$）、最小値 $\dfrac72$（$a=\dfrac{7\pi}{6},\dfrac{11\pi}{6}$）`,
          approach: String.raw`$s=\sin a$ は $-1\le s\le1$ をくまなく動く。$6s^{2}+6s+5$ の $\left[-1,1\right]$ での最大最小。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0\le a<2\pi$ のとき $s=\sin a$ は $-1\le s\le1$ の値を**くまなく**とる。$M=6s^{2}+6s+5$ を平方完成すると`,
            },
            {
              k: "math",
              t: String.raw`M=6\left(s+\frac12\right)^{2}+5-\frac32=6\left(s+\frac12\right)^{2}+\frac72`,
            },
            {
              k: "p",
              t: String.raw`である。下に凸で軸は $s=-\dfrac12$、これは $-1\le s\le1$ の中にある。`,
            },
            {
              k: "p",
              t: String.raw`**最小**。軸で最小になり`,
            },
            {
              k: "math",
              t: String.raw`M_{\min}=\frac72\qquad\left(s=-\frac12\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0\le a<2\pi$ で $\sin a=-\dfrac12$ となるのは`,
            },
            {
              k: "math",
              t: String.raw`a=\frac{7\pi}{6},\ \frac{11\pi}{6}`,
            },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "p",
              t: String.raw`**最大**。軸から遠いほうの端で最大になる。軸 $-\dfrac12$ から $s=1$ までは $\dfrac32$、$s=-1$ までは $\dfrac12$ なので、$s=1$ のほうが遠い。`,
            },
            {
              k: "math",
              t: String.raw`M_{\max}=6+6+5=17\qquad\left(s=1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0\le a<2\pi$ で $\sin a=1$ となるのは $a=\dfrac{\pi}{2}$ のみである。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "M = 6s² + 6s + 5（s = sin a）のグラフ。s は −1 から 1 までをくまなく動く。軸 s = −1/2 で最小 7/2、軸から遠い端 s = 1 で最大 17。s = −1 では 5 で、最大にはならない。",
                view: [-1.6, 1.6, -1.0, 19.0],
                step: { x: 0.5, y: 5 },
                items: [
                  { k: "curve", f: M20B, from: -1, to: 1 },
                  { k: "curve", f: M20B, from: -1.6, to: -1, faint: true },
                  { k: "curve", f: M20B, from: 1, to: 1.35, faint: true },
                  { k: "dot", at: [1, 17], label: "最大 17", place: "left" },
                  { k: "dot", at: [-0.5, 3.5], label: "最小 7/2", place: "below-right" },
                  { k: "dot", at: [-1, 5], label: "(−1, 5)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$s=\sin a$ の動く範囲は $\left[-1,1\right]$。$a$ のまま微分しようとすると遠回りになる。`,
            String.raw`最大は軸から遠い端。$s=-1$ で $M=5$ だが、$s=1$ の $17$ のほうが大きい。`,
            String.raw`$\sin a=-\dfrac12$ をみたす $a$ は $0\le a<2\pi$ に2つある。片方だけにしない。`,
          ],
          check: String.raw`$40$ 万等分の走査で最大 $17.0000000$（$s=1$）、最小 $3.5000000$（$s=-0.5$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率・数列",
      topics: ["確率漸化式", "剰余による分類", "等比数列", "対称性"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,\\ldots,6$ でさいころの目の出方を全列挙すると $p_{n}=\\tfrac23,\\tfrac12,\\tfrac5{12},\\tfrac38,\\tfrac{17}{48},\\tfrac{11}{32}$ で、$\\tfrac13+\\tfrac23\\left(\\tfrac12\\right)^{n}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円周を3等分する点を時計回りに $\mathrm{A},\mathrm{B},\mathrm{C}$ とおく。点 $\mathrm{Q}$ は $\mathrm{A}$ から出発し、さいころを投げて $1$ の目なら時計回りに隣へ、$2$ の目なら反時計回りに隣へ移り、その他の目では移らない。$n$ 回投げたあとに $\mathrm{Q}$ が $\mathrm{A}$ にある確率を $p_{n}$ とする。$p_{2}$ を求める`,
          answer: String.raw`$p_{2}=\dfrac12$`,
          approach: String.raw`2回で $\mathrm{A}$ に戻るのは「2回とも動かない」か「1回ずつ逆向きに動く」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回の移動は、確率 $\dfrac16$ で時計回りに1つ、確率 $\dfrac16$ で反時計回りに1つ、確率 $\dfrac46=\dfrac23$ で動かない。`,
            },
            {
              k: "p",
              t: String.raw`2回投げて $\mathrm{A}$ に戻るのは次の2通りである（3点しかないので、同じ向きに2回動くと $\mathrm{A}$ には戻らない）。`,
            },
            {
              k: "steps",
              items: [
                String.raw`2回とも動かない：$\left(\dfrac23\right)^{2}=\dfrac49$`,
                String.raw`一方が時計回り、他方が反時計回り：$2\cdot\dfrac16\cdot\dfrac16=\dfrac1{18}$`,
              ],
            },
            { k: "p", t: String.raw`足すと` },
            {
              k: "math",
              t: String.raw`p_{2}=\frac49+\frac1{18}=\frac{8+1}{18}=\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`「時計回りに2回」だと $\mathrm{A}\to\mathrm{B}\to\mathrm{C}$ で $\mathrm{A}$ に戻らない。3点の円周なので、同じ向きに**3回**動いて初めて戻る。`,
            },
          ],
          pitfalls: [
            String.raw`「同じ向きに2回」で戻ると勘違いしない。戻るのは3回動いたときである。`,
          ],
          check: String.raw`$n=2$ の全 $36$ 通りの列挙でも $\dfrac12$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$p_{n+1}$ を $p_{n}$ を用いて表す`,
          answer: String.raw`$p_{n+1}=\dfrac12p_{n}+\dfrac16$`,
          approach: String.raw`$\mathrm{A}$ 以外の2点にいる確率は対称性から等しい。それを $\dfrac{1-p_{n}}{2}$ と書く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 回後に $\mathrm{B}$ にいる確率を $q_{n}$、$\mathrm{C}$ にいる確率を $r_{n}$ とする。時計回りと反時計回りが同じ確率で、出発点が $\mathrm{A}$ なので、$\mathrm{A}$ を軸にした左右の対称性から`,
            },
            {
              k: "math",
              t: String.raw`q_{n}=r_{n}=\frac{1-p_{n}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$n+1$ 回後に $\mathrm{A}$ にいるのは、次の3つの場合である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n$ 回後に $\mathrm{A}$ にいて、動かない：$\dfrac23p_{n}$`,
                String.raw`$n$ 回後に $\mathrm{B}$ にいて、反時計回りに動く：$\dfrac16q_{n}$`,
                String.raw`$n$ 回後に $\mathrm{C}$ にいて、時計回りに動く：$\dfrac16r_{n}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`（$\mathrm{A},\mathrm{B},\mathrm{C}$ が時計回りに並んでいるので、$\mathrm{B}$ から $\mathrm{A}$ へは反時計回り、$\mathrm{C}$ から $\mathrm{A}$ へは時計回りである。）足すと`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac23p_{n}+\frac16\left(q_{n}+r_{n}\right)=\frac23p_{n}+\frac16\left(1-p_{n}\right)`,
            },
            { k: "p", t: String.raw`であり、整理すると` },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac12p_{n}+\frac16`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$q_{n}+r_{n}=1-p_{n}$ さえ分かれば $q_{n}=r_{n}$ を示す必要はない（$q_{n},r_{n}$ が同じ係数 $\dfrac16$ で入るので和だけで足りる）。ただし一言ふれておくと見通しがよい。`,
          ],
          check: String.raw`全列挙した $p_{1},\ldots,p_{6}$ がこの漸化式をみたした。`,
        },
        {
          label: "(3)",
          task: String.raw`$p_{n}$ を求める`,
          answer: String.raw`$p_{n}=\dfrac13+\dfrac23\left(\dfrac12\right)^{n}=\dfrac{2^{n-1}+1}{3\cdot2^{n-1}}$`,
          approach: String.raw`特性方程式 $\alpha=\dfrac12\alpha+\dfrac16$ の解 $\alpha=\dfrac13$ を引く。`,
          blocks: [
            { k: "p", t: String.raw`$\alpha=\dfrac12\alpha+\dfrac16$ を解くと $\alpha=\dfrac13$ である。(2) の両辺から引くと` },
            {
              k: "math",
              t: String.raw`p_{n+1}-\frac13=\frac12\left(p_{n}-\frac13\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$\left\{p_{n}-\dfrac13\right\}$ は公比 $\dfrac12$ の等比数列である。$\mathrm{Q}$ は $\mathrm{A}$ から出発するので $p_{0}=1$ とおけて`,
            },
            {
              k: "math",
              t: String.raw`p_{n}-\frac13=\left(1-\frac13\right)\left(\frac12\right)^{n}=\frac23\left(\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`p_{n}=\frac13+\frac23\left(\frac12\right)^{n}=\frac{2^{n-1}+1}{3\cdot2^{n-1}}`,
            },
            {
              k: "p",
              t: String.raw`である。$p_{1}=\dfrac13+\dfrac13=\dfrac23$（1回目に動かない確率）、$p_{2}=\dfrac13+\dfrac16=\dfrac12$ で (1) と合う。`,
            },
            {
              k: "note",
              t: String.raw`$n\to\infty$ で $p_{n}\to\dfrac13$ である。3点のどこにいるかが平等に近づく、ということで、同じ年度の理系 第2問（複素数の偏角を $3$ で割った余りで追う問題）と同じ式になる。`,
            },
          ],
          alts: [
            {
              title: "$p_{1}$ から始める",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$p_{0}=1$ を使わずに、$p_{1}=\dfrac23$（1回目に $\mathrm{A}$ にいるのは動かないとき）から始めてもよい。$n\ge1$ で`,
                },
                {
                  k: "math",
                  t: String.raw`p_{n}-\frac13=\left(p_{1}-\frac13\right)\left(\frac12\right)^{n-1}=\frac13\left(\frac12\right)^{n-1}=\frac23\left(\frac12\right)^{n}`,
                },
                {
                  k: "p",
                  t: String.raw`となり同じ式になる。$p_{0}=1$ と置くほうが初項の扱いが素直だが、「$0$ 回投げたあと」を定義に含めるか迷うなら $p_{1}$ から始めるのが安全である。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$\left(\dfrac12\right)^{n}$ の指数を $n-1$ にしない。$p_{0}=1$ から始めるなら $n$ 乗である。`,
          ],
          check: String.raw`$n=1,\ldots,6$ の全列挙で $\dfrac23,\dfrac12,\dfrac5{12},\dfrac38,\dfrac{17}{48},\dfrac{11}{32}$ となり、式と完全に一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "三角比",
      topics: ["正弦定理", "3倍角の公式", "不等式の証明", "角の和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$0<\\beta<\\tfrac{\\pi}{4}$ の無作為な $30$ 万点で $\\tfrac{\\sin3\\beta}{\\sin\\beta}=3-4\\sin^{2}\\beta<3$ を確かめると、違反は $0$ 件だった（比の上限は $\\beta\\to0$ での $3$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`三角形 $\mathrm{ABC}$ において、辺 $\mathrm{AB}$ の長さを $c$、辺 $\mathrm{CA}$ の長さを $b$ で表す。$\angle\mathrm{ACB}=3\angle\mathrm{ABC}$ であるとき $c<3b$ を示す`,
          answer: String.raw`正弦定理より $\dfrac cb=\dfrac{\sin3\beta}{\sin\beta}$（$\beta=\angle\mathrm{ABC}$）。3倍角の公式で $\dfrac cb=3-4\sin^{2}\beta<3$`,
          approach: String.raw`正弦定理で辺の比を角の比に直し、3倍角の公式で $\sin\beta$ を約分する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta=\angle\mathrm{ABC}$ とおくと $\angle\mathrm{ACB}=3\beta$ である。三角形の内角の和より`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{BAC}=\pi-4\beta>0,\qquad0<\beta<\frac{\pi}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。とくに $\sin\beta>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`正弦定理より、外接円の直径を $2R$ として`,
            },
            {
              k: "math",
              t: String.raw`b=\mathrm{CA}=2R\sin\left(\angle\mathrm{ABC}\right)=2R\sin\beta,\qquad c=\mathrm{AB}=2R\sin\left(\angle\mathrm{ACB}\right)=2R\sin3\beta`,
            },
            {
              k: "p",
              t: String.raw`である（辺の対角をとる）。よって`,
            },
            {
              k: "math",
              t: String.raw`\frac cb=\frac{\sin3\beta}{\sin\beta}`,
            },
            { k: "p", t: String.raw`である。3倍角の公式 $\sin3\beta=3\sin\beta-4\sin^{3}\beta$ を使うと` },
            {
              k: "math",
              t: String.raw`\frac cb=\frac{3\sin\beta-4\sin^{3}\beta}{\sin\beta}=3-4\sin^{2}\beta`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin\beta>0$ なので割ってよい）。$0<\beta<\dfrac{\pi}{4}$ では $\sin\beta>0$、したがって $4\sin^{2}\beta>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac cb=3-4\sin^{2}\beta<3`,
            },
            { k: "p", t: String.raw`である。$b>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`c<3b`,
            },
            { k: "p", t: String.raw`を得る。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "∠ABC = 30°、∠ACB = 90° の場合（β = π/6）。a = BC = 1 とすると b = CA ≒ 0.577、c = AB ≒ 1.155 で、3 − 4sin²β = 3 − 1 = 2 より c = 2b。たしかに c < 3b になっている。",
                view: [-0.3, 1.75, -0.3, 0.95],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, H20B] },
                  { k: "seg", a: [1, H20B], b: [0, 0] },
                  { k: "dot", at: [0, 0], label: "B", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "C", place: "below-right" },
                  { k: "dot", at: [1, H20B], label: "A", place: "above-right" },
                  { k: "text", at: [1, H20B / 2], label: "b", place: "right" },
                  { k: "text", at: [0.5, H20B / 2], label: "c", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\dfrac cb=3-4\sin^{2}\beta$ は $\beta\to0$ で $3$ に近づくが、$\beta>0$ なので $3$ には届かない。つまり $c<3b$ は**最良の評価**で、$3$ を $2.999$ に下げることはできない。この問題は同じ年度の理系 第3問（$\angle\mathrm{ACB}=n\angle\mathrm{ABC}$ で $c<nb$）の $n=3$ の場合で、理系では一般の $n$ を帰納法で扱う。`,
            },
          ],
          alts: [
            {
              title: "差をとって微分する",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$F\left(\beta\right)=3\sin\beta-\sin3\beta$ とおくと $F\left(0\right)=0$ で`,
                },
                {
                  k: "math",
                  t: String.raw`F'\left(\beta\right)=3\cos\beta-3\cos3\beta=3\left(\cos\beta-\cos3\beta\right)`,
                },
                {
                  k: "p",
                  t: String.raw`である。$0<\beta<\dfrac{\pi}{4}$ では $0<\beta<3\beta<\dfrac{3\pi}{4}<\pi$ で、$\cos$ は $\left[0,\pi\right]$ で減少するので $\cos\beta>\cos3\beta$、つまり $F'>0$ である。よって $F\left(\beta\right)>F\left(0\right)=0$、すなわち $\sin3\beta<3\sin\beta$ である。`,
                },
                {
                  k: "p",
                  t: String.raw`3倍角の公式を覚えていなくても進めるが、この問題では公式を使うほうが2行で終わる。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`正弦定理で対応する角を取り違えやすい。辺 $\mathrm{CA}$ の対角は $\angle\mathrm{ABC}$、辺 $\mathrm{AB}$ の対角は $\angle\mathrm{ACB}$ である。`,
            String.raw`$\sin\beta>0$ を確かめてから約分する。$0<\beta<\dfrac{\pi}{4}$ は内角の和から出る。`,
            String.raw`$3-4\sin^{2}\beta$ は負になることもある（$\beta>\dfrac{\pi}{6}$）。「$c<3b$」は言えるが「$c>0$ だから $0<\dfrac cb$」まで含めて考えると、$\beta<\dfrac{\pi}{3}$ が要る。もっとも内角の和から $\beta<\dfrac{\pi}{4}$ なので心配はいらない。`,
          ],
          check: String.raw`$30$ 万点の走査で $\dfrac{\sin3\beta}{\sin\beta}<3$ の違反は $0$ 件だった。`,
        },
      ],
    },
  ],
};
