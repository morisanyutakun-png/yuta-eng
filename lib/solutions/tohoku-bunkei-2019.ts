import { tohokuRikei2019 } from "@/lib/solutions/tohoku-rikei-2019";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2019年度（平成31年度）一般入試 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第2問は理系の第2問とまったく同じ問題**だった（小問の並びも同じ）。
 * 同じ問題に別々の解説を書くと食い違いが生まれるので、解説は理系の側から借りる。
 * 第1問・第3問・第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2019.questions.find((q) => q.no === no)!;

/** 理系 第2問（対数関数）。文系の第2問とまったく同じ問題。 */
const sharedLog: Question = { ...rikei(2), no: 2 };

/** 第1問の図。$a=2-\sqrt5$、$b=\tfrac{1-\sqrt5}2$、$c=b^{2}$。 */
const A19 = 2 - Math.sqrt(5);
const B19 = (1 - Math.sqrt(5)) / 2;
const C19 = B19 * B19;
const PAR19 = (x: number): number => x * x + A19;
const LIN19 = (x: number): number => A19 * x;

export const tohokuBunkei2019: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式",
      topics: ["解と係数の関係", "2次方程式", "黄金比", "条件からの絞り込み"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=2-\\sqrt5$、$b=\\tfrac{1-\\sqrt5}2$ のとき $b+c=bc=a=-0.236067977$ になった（$c=b^{2}$）",
          "$\\mathrm{P},\\mathrm{Q}$ がどちらも放物線 $y=x^{2}+a$ 上にあることを $10^{-16}$ の精度で確かめた",
          "判別式 $a^{2}-4a=1.000000000>0$ で、2点は相異なる",
          "$b$ を $10^{-5}$ 刻みで走査して $b+b^{2}=b^{3}$ に最も近いものを探すと $b=-0.61803$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a,b,c$ を実数とし、$a$ は $0$ でないとする。$xy$ 平面上の直線 $y=ax$ と放物線 $y=x^{2}+a$ が相異なる2点 $\mathrm{P}(b,ab)$、$\mathrm{Q}(c,ac)$ で交わっているとする。$c=b^{2}$、$b<0$ のとき、$a$ と $b$ を求める`,
          answer: String.raw`$a=2-\sqrt5$、$b=\dfrac{1-\sqrt5}{2}$`,
          approach: String.raw`$b,c$ は交点の $x$ 座標なので、$x^{2}-ax+a=0$ の2解である。解と係数の関係で $b+c$ と $bc$ を $a$ で書き、$c=b^{2}$ を代入する。`,
          blocks: [
            { k: "p", t: String.raw`交点の $x$ 座標は $x^{2}+a=ax$、すなわち` },
            { k: "math", t: String.raw`x^{2}-ax+a=0` },
            { k: "p", t: String.raw`の解である。相異なる2点で交わるので、$b,c$ はこの2次方程式の異なる2解である。解と係数の関係より` },
            {
              k: "math",
              t: String.raw`b+c=a,\qquad bc=a`,
            },
            { k: "p", t: String.raw`である。ここに $c=b^{2}$ を代入すると` },
            {
              k: "math",
              t: String.raw`b+b^{2}=a,\qquad b\cdot b^{2}=b^{3}=a`,
            },
            { k: "p", t: String.raw`となる。この2つから $a$ を消去して` },
            {
              k: "math",
              t: String.raw`b^{3}=b^{2}+b,\qquad b\left(b^{2}-b-1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$b=0$ とすると $a=b^{3}=0$ となり $a\neq0$ に反するので、$b\neq0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`b^{2}-b-1=0,\qquad b=\frac{1\pm\sqrt5}{2}`,
            },
            { k: "p", t: String.raw`で、$b<0$ より` },
            {
              k: "math",
              t: String.raw`b=\frac{1-\sqrt5}{2}`,
            },
            { k: "p", t: String.raw`である。$a$ は $a=b^{2}+b$ で、$b^{2}=b+1$ だから` },
            {
              k: "math",
              t: String.raw`a=\left(b+1\right)+b=2b+1=\left(1-\sqrt5\right)+1=2-\sqrt5`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**条件の確認。** $a=2-\sqrt5=-0.236\cdots\neq0$ ✓。判別式は`,
            },
            {
              k: "math",
              t: String.raw`a^{2}-4a=\left(2-\sqrt5\right)^{2}-4\left(2-\sqrt5\right)=\left(9-4\sqrt5\right)-\left(8-4\sqrt5\right)=1>0`,
            },
            {
              k: "p",
              t: String.raw`なので2解は相異なる ✓。また $c=b^{2}=b+1=\dfrac{3-\sqrt5}{2}=0.382\cdots\neq b$ ✓。よって`,
            },
            {
              k: "math",
              t: String.raw`a=2-\sqrt5,\qquad b=\frac{1-\sqrt5}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "求めた a = 2 - √5 ≒ -0.236 のとき。直線 y = ax と放物線 y = x² + a は2点で交わり、左の交点 P の x 座標 b ≒ -0.618 を2乗すると、右の交点 Q の x 座標 c ≒ 0.382 になる。",
                view: [-1.3, 1.3, -0.5, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: PAR19, from: -1.239, to: 1.239 },
                  { k: "curve", f: LIN19, from: -1.3, to: 1.3 },
                  { k: "dot", at: [B19, A19 * B19], label: "P", place: "above-right" },
                  { k: "dot", at: [C19, A19 * C19], label: "Q", place: "below" },
                  { k: "text", at: [1.0, PAR19(1.0)], label: "y = x² + a", place: "above-left" },
                  { k: "text", at: [-1.1, LIN19(-1.1)], label: "y = ax", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$b^{2}-b-1=0$ の解は黄金比にあたる数である。$b=\dfrac{1-\sqrt5}{2}$ は $-\dfrac{1}{\varphi}$（$\varphi=\dfrac{1+\sqrt5}{2}$）で、$b^{2}=b+1$ という関係がそのまま使える。`,
            },
          ],
          pitfalls: [
            String.raw`$b,c$ が2次方程式の2解であることに気づけば、解と係数の関係で一気に進む。$\mathrm{P},\mathrm{Q}$ の座標を直接連立すると遠回りになる。`,
            String.raw`$b=0$ を除く理由（$a\neq0$）を書く。`,
            String.raw`最後に判別式が正であること（相異なる2点であること）を確かめる。`,
          ],
          check: String.raw`$b+c=bc=a=-0.236067977$ で、$\mathrm{P},\mathrm{Q}$ はどちらも放物線上にあった。判別式は $1$ だった。`,
        },
      ],
    },
    sharedLog,
    {
      no: 3,
      field: "数列",
      topics: ["積の形の漸化式", "比の数列", "数学的帰納法", "等比数列"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "分数のまま $a_{1}$ から $a_{10}$ まで計算すると $1,3,18,216,5184,248832,23887872,4586471424,\\ldots$ になった",
          "$3^{n-1}\\cdot2^{\\frac{(n-1)(n-2)}2}$ がこれと $n=10$ まで完全に一致した",
          "比 $\\tfrac{a_{n+1}}{a_{n}}$ は $3,6,12,24,48,96,192$ と、公比 $2$ の等比数列になっていた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`数列 $\left\{a_{n}\right\}$ を $a_{1}=1$、$a_{2}=3$、$a_{n+2}a_{n}=2a_{n+1}^{2}$（$n=1,2,3,\ldots$）で定めるとき、すべての正の整数 $n$ について $a_{n}$ が正であることを示す`,
          answer: String.raw`$a_{n},a_{n+1}>0$ ならば $a_{n+2}=\dfrac{2a_{n+1}^{2}}{a_{n}}>0$。2つ前までを仮定する帰納法`,
          approach: String.raw`漸化式は $a_{n+2}$ について解くと $a_{n+2}=\dfrac{2a_{n+1}^{2}}{a_{n}}$ である。割り算をするので $a_{n}\neq0$ が要る。「連続する2項がともに正」を仮定する形の帰納法にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`「$a_{n}>0$ かつ $a_{n+1}>0$」という命題を $n$ について数学的帰納法で示す。`,
            },
            { k: "p", t: String.raw`**$n=1$。** $a_{1}=1>0$、$a_{2}=3>0$ ✓。` },
            {
              k: "p",
              t: String.raw`**$n\to n+1$。** $a_{n}>0$ かつ $a_{n+1}>0$ と仮定する。$a_{n}\neq0$ なので漸化式を $a_{n+2}$ について解けて`,
            },
            {
              k: "math",
              t: String.raw`a_{n+2}=\frac{2a_{n+1}^{2}}{a_{n}}`,
            },
            {
              k: "p",
              t: String.raw`である。分子は $2a_{n+1}^{2}>0$（$a_{n+1}\neq0$ だから）、分母は $a_{n}>0$ なので $a_{n+2}>0$ である。よって「$a_{n+1}>0$ かつ $a_{n+2}>0$」が成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`数学的帰納法より、すべての正の整数 $n$ で $a_{n}>0$ である。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n+2}$ を求めるのに $a_{n}$ で割るので、$a_{n}\neq0$ が要る。「正である」を仮定に入れておけばそこも同時に片づく。`,
            String.raw`仮定は1項ではなく連続する2項。$a_{n+2}$ は $a_{n}$ と $a_{n+1}$ の両方から決まるためである。`,
          ],
          check: String.raw`分数のまま $a_{10}$ まで計算すると、すべて正の整数だった。`,
        },
        {
          label: "(2)",
          task: String.raw`一般項 $a_{n}$ を求める`,
          answer: String.raw`$a_{n}=3^{n-1}\cdot2^{\frac{\left(n-1\right)\left(n-2\right)}{2}}$`,
          approach: String.raw`漸化式を $\dfrac{a_{n+2}}{a_{n+1}}=2\cdot\dfrac{a_{n+1}}{a_{n}}$ の形に直すと、「比の数列」が等比数列になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) よりすべての $a_{n}$ は正なので、割り算ができる。漸化式 $a_{n+2}a_{n}=2a_{n+1}^{2}$ の両辺を $a_{n+1}a_{n}$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`\frac{a_{n+2}}{a_{n+1}}=2\cdot\frac{a_{n+1}}{a_{n}}`,
            },
            { k: "p", t: String.raw`である。$b_{n}=\dfrac{a_{n+1}}{a_{n}}$ とおくと` },
            {
              k: "math",
              t: String.raw`b_{n+1}=2b_{n},\qquad b_{1}=\frac{a_{2}}{a_{1}}=3`,
            },
            { k: "p", t: String.raw`なので、$\left\{b_{n}\right\}$ は初項 $3$、公比 $2$ の等比数列である。よって` },
            {
              k: "math",
              t: String.raw`b_{n}=3\cdot2^{n-1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$a_{n}$ に戻す。** $n\geqq2$ のとき、$a_{n}=a_{1}b_{1}b_{2}\cdots b_{n-1}$ である。それぞれ $b_{k}=3\cdot2^{k-1}$ なので`,
            },
            {
              k: "math",
              t: String.raw`a_{n}=1\cdot\left(3\cdot2^{0}\right)\left(3\cdot2^{1}\right)\cdots\left(3\cdot2^{n-2}\right)=3^{n-1}\cdot2^{0+1+\cdots+\left(n-2\right)}`,
            },
            { k: "p", t: String.raw`である。指数の和は` },
            {
              k: "math",
              t: String.raw`0+1+\cdots+\left(n-2\right)=\frac{\left(n-2\right)\left(n-1\right)}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`a_{n}=3^{n-1}\cdot2^{\frac{\left(n-1\right)\left(n-2\right)}{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=1$ のときもこの式は $3^{0}\cdot2^{0}=1=a_{1}$ となり、正しい。`,
            },
            {
              k: "note",
              t: String.raw`$n=1,2,3,4$ で $1,3,18,216$ となる。$\dfrac{a_{n+1}}{a_{n}}$ が $3,6,12,24,\ldots$ と2倍ずつになっているのが確かめられる。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n+2}a_{n}=2a_{n+1}^{2}$ は「積の形」なので、比をとるか対数をとるかで線形にする。そのまま展開しても進まない。`,
            String.raw`$a_{n}=a_{1}b_{1}\cdots b_{n-1}$ と書けるのは $n\geqq2$ のとき。$n=1$ でも式が合うことを最後に確かめる。`,
          ],
          check: String.raw`この式は分数のまま計算した $a_{1},\ldots,a_{10}$ と完全に一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["独立な試行の繰り返し", "二項分布", "余事象", "差で数える"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3$ で $P_{1}(j)=\\tfrac18,\\tfrac38,\\tfrac38,\\tfrac18$、$P_{2}(j)=\\tfrac{27}{64},\\tfrac{27}{64},\\tfrac9{64},\\tfrac1{64}$、$P_{3}(j)=\\tfrac{343}{512},\\tfrac{147}{512},\\tfrac{21}{512},\\tfrac1{512}$ となり、$ {}_{n}\\mathrm{C}_{j}\\left(2^{k}-1\\right)^{n-j}/2^{kn}$ と一致した",
          "$P_{3}(0)-P_{2}(0)=\\tfrac{343}{512}-\\tfrac{27}{64}=\\tfrac{127}{512}$ だった",
          "40万回のシミュレーションで $0.247573$（$\\tfrac{127}{512}=0.248047$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を $2$ 以上の整数とする。金貨と銀貨を含む $n$ 枚の硬貨を同時に投げ、裏が出た金貨は取り去り、取り去った金貨と同じ枚数の銀貨を加えるという試行の繰り返しを考える。初めは $n$ 枚すべてが金貨であり、$n$ 枚すべてが銀貨になった後も試行を繰り返す。$k$ 回目の試行の直後に $n$ 枚の硬貨のなかに金貨が $j$ 枚だけ残る確率を $P_{k}(j)$（$0\leqq j\leqq n$）で表すとき、$P_{1}(j)$ を求める`,
          answer: String.raw`$P_{1}(j)=\dfrac{ {}_{n}\mathrm{C}_{j}}{2^{n}}$`,
          approach: String.raw`初めは全部が金貨。1回投げて表が出た金貨だけが残るので、「$n$ 枚のうち表が $j$ 枚」という反復試行そのものである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回目の試行では $n$ 枚すべてが金貨である。裏が出た金貨が取り去られるので、残る金貨は表が出たものだけである。`,
            },
            {
              k: "p",
              t: String.raw`$n$ 枚の硬貨それぞれが独立に確率 $\dfrac12$ で表になるから、表がちょうど $j$ 枚になる確率は`,
            },
            {
              k: "math",
              t: String.raw`P_{1}(j)={}_{n}\mathrm{C}_{j}\left(\frac12\right)^{j}\left(\frac12\right)^{n-j}=\frac{ {}_{n}\mathrm{C}_{j}}{2^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=3$ では $\tfrac18,\tfrac38,\tfrac38,\tfrac18$ で、$\tfrac{ {}_{3}\mathrm{C}_{j}}{8}$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$P_{k}(j)$（$k\geqq2$）を求める`,
          answer: String.raw`$P_{k}(j)={}_{n}\mathrm{C}_{j}\dfrac{\left(2^{k}-1\right)^{n-j}}{2^{kn}}$`,
          approach: String.raw`金貨は増えない。はじめの $n$ 枚の金貨それぞれについて「$k$ 回とも表が出たか」を見ればよく、$k$ 回の試行をまとめて1つの反復試行として扱える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**1枚ずつ追う。** 銀貨は何度投げてもそのままなので、金貨が増えることはない。はじめの $n$ 枚の金貨それぞれについて、$k$ 回の試行のあいだ金貨のまま残っているのは「$k$ 回とも表が出た」ときだけである。その確率は`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac12\right)^{k}=\frac{1}{2^{k}}`,
            },
            {
              k: "p",
              t: String.raw`である。逆に、途中で一度でも裏が出れば銀貨に変わり、以後もどらない。その確率は $1-\dfrac{1}{2^{k}}=\dfrac{2^{k}-1}{2^{k}}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**独立性。** $n$ 枚の硬貨の表裏は毎回独立なので、「どの金貨が残るか」は $n$ 枚それぞれについて独立である。したがって、$k$ 回後に金貨が $j$ 枚残る確率は`,
            },
            {
              k: "math",
              t: String.raw`P_{k}(j)={}_{n}\mathrm{C}_{j}\left(\frac{1}{2^{k}}\right)^{j}\left(\frac{2^{k}-1}{2^{k}}\right)^{n-j}={}_{n}\mathrm{C}_{j}\frac{\left(2^{k}-1\right)^{n-j}}{2^{kn}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k=1$ を代入すると $ {}_{n}\mathrm{C}_{j}\dfrac{1^{n-j}}{2^{n}}=\dfrac{ {}_{n}\mathrm{C}_{j}}{2^{n}}$ で、(1) と一致する。つまりこの式は $k\geqq1$ のすべてで使える。`,
            },
          ],
          pitfalls: [
            String.raw`毎回の漸化式を立てて解こうとすると大変になる。「1枚の金貨が $k$ 回生き残る確率」に注目すると一気に片づく。`,
            String.raw`銀貨になった硬貨は金貨にもどらない。この一方通行が、$k$ 回をまとめて扱える理由である。`,
          ],
          check: String.raw`$n=3$、$k=1,2,3,4$ のすべての $j$ で、この式と直接計算した値が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$n=3$ とする。2回目の試行の直後では金貨が少なくとも1枚残るが、3回目の試行の直後には3枚すべてが銀貨になる確率を求める`,
          answer: String.raw`$\dfrac{127}{512}$`,
          approach: String.raw`「2回後に $\geqq1$ 枚、かつ3回後に $0$ 枚」は、「3回後に $0$ 枚」から「2回後に $0$ 枚」を引いたもの。2回後に $0$ 枚なら3回後も必ず $0$ 枚だからである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k$ 回後の金貨の枚数を $X_{k}$ とする。求める確率は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(X_{2}\geqq1\ \text{かつ}\ X_{3}=0\right)`,
            },
            {
              k: "p",
              t: String.raw`である。金貨は増えないので、$X_{2}=0$ ならば必ず $X_{3}=0$ である。つまり「$X_{3}=0$」という事象は「$X_{2}=0$」を含んでいる。したがって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(X_{2}\geqq1\ \text{かつ}\ X_{3}=0\right)=\mathrm{P}\left(X_{3}=0\right)-\mathrm{P}\left(X_{2}=0\right)=P_{3}(0)-P_{2}(0)`,
            },
            { k: "p", t: String.raw`である。(2) の式で $n=3$、$j=0$ とすると` },
            {
              k: "math",
              t: String.raw`P_{k}(0)=\frac{\left(2^{k}-1\right)^{3}}{2^{3k}}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`P_{3}(0)=\frac{7^{3}}{2^{9}}=\frac{343}{512},\qquad P_{2}(0)=\frac{3^{3}}{2^{6}}=\frac{27}{64}=\frac{216}{512}`,
            },
            { k: "p", t: String.raw`である。引き算して` },
            {
              k: "math",
              t: String.raw`\frac{343}{512}-\frac{216}{512}=\frac{127}{512}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$P_{k}(0)=\left(1-\dfrac{1}{2^{k}}\right)^{3}$ は「3枚とも $k$ 回のうちに1回以上裏を出す確率」である。$\dfrac{127}{512}=0.248\cdots$ で、だいたい4回に1回起こる。`,
            },
          ],
          pitfalls: [
            String.raw`「2回後に $\geqq1$」と「3回後に $0$」を別々に掛け合わせてはいけない。独立ではない。`,
            String.raw`$\left\{X_{2}=0\right\}\subset\left\{X_{3}=0\right\}$ という包含関係に気づけば、引き算だけで済む。`,
          ],
          check: String.raw`40万回のシミュレーションで $0.247573$ となり、$\dfrac{127}{512}=0.248047$ に近かった。`,
        },
      ],
    },
  ],
};
