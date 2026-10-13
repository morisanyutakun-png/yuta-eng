import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2019年度（平成31年度）一般入試 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第3問の図。$g(x)=x+x^{2}$。 */
const G19 = (x: number): number => x + x * x;

/** 第5問の図。$g(x)=\dfrac{\sin^{2}(\pi x)}{1+e^{x}}$ と、$x$ を $-x$ に置きかえたもの。 */
const S19 = (x: number): number => Math.sin(Math.PI * x) ** 2;
const G5A = (x: number): number => S19(x) / (1 + Math.exp(x));
const G5B = (x: number): number => S19(x) - G5A(x);

export const tohokuRikei2019: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["接線", "直交条件", "三角関数の値の範囲", "すべて求める"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\cos a\\cos b=-1$ となる組をすべて取り出し、2つの接線の交点が本当に両方の接線上にあることを確かめた",
          "$m,n$ を $-2$ から $2$ まで動かすと交点の $y$ 座標は $\\dfrac{y}{\\pi}=-3.5,-2.5,\\ldots,4.5$ となり、すべて「奇数の半分」だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$xy$ 平面における曲線 $y=\sin x$ の2つの接線が直交するとき、その交点の $y$ 座標の値をすべて求める`,
          answer: String.raw`$y=\dfrac{\pi}{2}+k\pi$（$k$ は整数）`,
          approach: String.raw`接点を $a,b$ とすると傾きは $\cos a,\cos b$。直交条件 $\cos a\cos b=-1$ は、$\left|\cos\right|\leqq1$ とあわせると片方が $1$、もう片方が $-1$ に決まってしまう。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=\sin x$ の $x=a$ における接線は、$y'=\cos x$ より`,
            },
            {
              k: "math",
              t: String.raw`y=\cos a\left(x-a\right)+\sin a`,
            },
            {
              k: "p",
              t: String.raw`である。接点を $a,b$（$a\neq b$）とすると、2つの接線が直交する条件は`,
            },
            { k: "math", t: String.raw`\cos a\cos b=-1` },
            { k: "p", t: String.raw`である。ここで $\left|\cos a\right|\leqq1$、$\left|\cos b\right|\leqq1$ なので` },
            {
              k: "math",
              t: String.raw`1=\left|\cos a\cos b\right|=\left|\cos a\right|\left|\cos b\right|\leqq1`
            },
            {
              k: "p",
              t: String.raw`で、等号が成り立つには $\left|\cos a\right|=\left|\cos b\right|=1$ が必要である。積が $-1$ なので、符号は逆になる。入れかえても同じなので`,
            },
            { k: "math", t: String.raw`\cos a=1,\qquad\cos b=-1` },
            { k: "p", t: String.raw`としてよい。このとき` },
            {
              k: "math",
              t: String.raw`a=2m\pi,\qquad b=\left(2n+1\right)\pi\qquad\left(m,n\ \text{は整数}\right)`,
            },
            { k: "p", t: String.raw`で、$\sin a=\sin b=0$ だから、2つの接線は` },
            {
              k: "math",
              t: String.raw`\ell_{1}\colon y=x-2m\pi,\qquad\ell_{2}\colon y=-x+\left(2n+1\right)\pi`,
            },
            { k: "p", t: String.raw`である。連立して $x-2m\pi=-x+\left(2n+1\right)\pi$ より` },
            {
              k: "math",
              t: String.raw`x=\frac{\left(2m+2n+1\right)\pi}{2}`,
            },
            { k: "p", t: String.raw`で、$y=x-2m\pi$ に代入すると` },
            {
              k: "math",
              t: String.raw`y=\frac{\left(2m+2n+1\right)\pi}{2}-2m\pi=\frac{\left(2n-2m+1\right)\pi}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$2n-2m+1$ は $m,n$ を動かすとすべての奇数をとり、逆にどの奇数も $m=0$ と適当な $n$ で作れる。したがって求める $y$ の値は、奇数 $2k+1$ を使って`,
            },
            {
              k: "math",
              t: String.raw`y=\frac{\left(2k+1\right)\pi}{2}=\frac{\pi}{2}+k\pi\qquad\left(k\ \text{は整数}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "k = 0 の場合。y = sin x の (0, 0) での接線 y = x と、(π, 0) での接線 y = -x + π は直交し、交点の y 座標は π/2 になる。接線が引けるのは傾きが ±1 になる点、つまり曲線が x 軸と交わる点に限られる。",
                view: [-1.3, 4.6, -1.6, 3.0],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: Math.sin, from: -1.3, to: 4.6 },
                  { k: "curve", f: (x: number) => x, from: -1.3, to: 3.0 },
                  { k: "curve", f: (x: number) => -x + Math.PI, from: 0.14, to: 4.6 },
                  { k: "dot", at: [0, 0], label: "接点", place: "above-left" },
                  { k: "dot", at: [Math.PI, 0], label: "接点", place: "above-right" },
                  { k: "dot", at: [Math.PI / 2, Math.PI / 2] },
                  { k: "text", at: [Math.PI / 2, 2.5], label: "交点 (π/2, π/2)", place: "above" },
                  { k: "text", at: [-1.0, -1.0], label: "接線 y = x", place: "below-right" },
                  { k: "text", at: [4.3, -4.3 + Math.PI], label: "接線 y = -x + π", place: "below-left" },
                  { k: "text", at: [2.6, Math.sin(2.6)], label: "y = sin x", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`接線が直交するには傾きの積が $-1$ だが、$\sin$ の導関数の値は $-1$ 以上 $1$ 以下しかとれない。だから「どちらも絶対値 $1$」という極端な場合しか起こらず、接点が $x$ 軸上に限られてしまう。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos a\cos b=-1$ を解く段階で、$\left|\cos\right|\leqq1$ による絞り込みを使う。ここが山場である。`,
            String.raw`接点の $m,n$ を動かすと交点は無数にあるが、$y$ 座標は $\dfrac\pi2+k\pi$ の形だけになる。`,
          ],
          check: String.raw`$m,n$ を $-2$ から $2$ まで動かして交点を計算すると、$\dfrac{y}{\pi}$ は $-3.5,-2.5,\ldots,4.5$ だけだった。`,
        },
      ],
    },
    {
      no: 2,
      field: "対数関数",
      topics: ["底による不等号の向き", "真数条件", "2次不等式", "必要十分条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=2,10,1.5$ では $n=6$ の整数解は $x=9,10,11$、$a=0.5,0.1,0.9$ では $x=7$ だけだった",
          "$a=2$ でも $a=0.5$ でも、整数解が存在する $n$ は $3$ 以上すべてで、$n=1,2$ では存在しなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を $1$ ではない正の実数、$n$ を正の整数とし、不等式 $\log_{a}\left(x-n\right)>\dfrac12\log_{a}\left(2n-x\right)$ を考える。$n=6$ のとき、この不等式を満たす整数 $x$ をすべて求める`,
          answer: String.raw`$a>1$ のとき $x=9,\ 10,\ 11$。$0<a<1$ のとき $x=7$`,
          approach: String.raw`右辺を $\log_{a}\sqrt{2n-x}$ とまとめる。底が $1$ より大きいか小さいかで不等号の向きが変わるので、そこで場合分けする。`,
          blocks: [
            { k: "p", t: String.raw`**真数条件。** $x-n>0$ かつ $2n-x>0$ なので` },
            { k: "math", t: String.raw`n<x<2n` },
            { k: "p", t: String.raw`である。$n=6$ なら $6<x<12$ で、整数は $x=7,8,9,10,11$ である。` },
            { k: "p", t: String.raw`**不等式の書きかえ。** 右辺は $\dfrac12\log_{a}\left(2n-x\right)=\log_{a}\sqrt{2n-x}$ なので、もとの不等式は` },
            {
              k: "math",
              t: String.raw`\log_{a}\left(x-n\right)>\log_{a}\sqrt{2n-x}`,
            },
            { k: "p", t: String.raw`である。$u=x-n>0$ とおくと $2n-x=n-u$ だから、底で分けて` },
            {
              k: "steps",
              items: [
                String.raw`$a>1$：$u>\sqrt{n-u}$`,
                String.raw`$0<a<1$：$u<\sqrt{n-u}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`となる。$u>0$、$n-u>0$ なので両辺を2乗してよく、$u^{2}$ と $n-u$ の大小、すなわち $u^{2}+u-n$ の符号で決まる。`,
            },
            { k: "p", t: String.raw`**$n=6$ のとき。** $u=x-6$ で $u=1,2,3,4,5$ であり` },
            {
              k: "math",
              t: String.raw`u^{2}+u-6=\left(u+3\right)\left(u-2\right)`,
            },
            { k: "p", t: String.raw`である。$u>0$ では $u+3>0$ なので、符号は $u-2$ で決まる。` },
            {
              k: "steps",
              items: [
                String.raw`$a>1$ のとき $u^{2}+u-6>0$、つまり $u>2$ なので $u=3,4,5$、すなわち $x=9,10,11$`,
                String.raw`$0<a<1$ のとき $u^{2}+u-6<0$、つまり $u<2$ なので $u=1$、すなわち $x=7$`,
              ],
            },
            { k: "p", t: String.raw`である（$u=2$、すなわち $x=8$ は両辺が等しくなるので除く）。` },
          ],
          pitfalls: [
            String.raw`底が $1$ より小さいと不等号が逆になる。$a$ の値が決まっていないので、両方の場合を答える。`,
            String.raw`真数条件 $n<x<2n$ を先に出しておかないと、$x\leqq n$ の値を拾ってしまう。`,
          ],
          check: String.raw`$a=2,10,1.5$ では整数解が $9,10,11$、$a=0.5,0.1,0.9$ では $7$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`この不等式を満たす整数 $x$ が存在するための $n$ についての必要十分条件を求める`,
          answer: String.raw`$n\geqq3$（$a$ が $1$ より大きいか小さいかによらない）`,
          approach: String.raw`(1) と同じく $u=x-n$（$1\leqq u\leqq n-1$ の整数）に直し、$u^{2}+u$ と $n$ の大小を見る。$u$ は $1$ から $n-1$ まで動かせるので、$u^{2}+u$ の最小値と最大値を見れば存在するかどうかが決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`真数条件 $n<x<2n$ より、整数 $x$ は $u=x-n$ とおいて $1\leqq u\leqq n-1$ の整数に対応する。(1) と同じ計算で、不等式は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a>1$：$u^{2}+u>n$`,
                String.raw`$0<a<1$：$u^{2}+u<n$`,
              ],
            },
            { k: "p", t: String.raw`となる。$u\mapsto u^{2}+u$ は $u\geqq1$ で増加するので、$1\leqq u\leqq n-1$ では` },
            {
              k: "math",
              t: String.raw`2=1^{2}+1\leqq u^{2}+u\leqq\left(n-1\right)^{2}+\left(n-1\right)=n\left(n-1\right)`,
            },
            { k: "p", t: String.raw`である（$n\geqq2$ のとき）。` },
            {
              k: "p",
              t: String.raw`**$n=1$ のとき。** $1<x<2$ に整数はないので、どちらの場合も解なし。`,
            },
            {
              k: "p",
              t: String.raw`**$n=2$ のとき。** $u=1$ だけで $u^{2}+u=2=n$ である。$>n$ も $<n$ も成り立たないので解なし。`,
            },
            {
              k: "p",
              t: String.raw`**$n\geqq3$ のとき。** $a>1$ なら $u=n-1$ をとると`,
            },
            {
              k: "math",
              t: String.raw`u^{2}+u=n\left(n-1\right)>n\iff n-1>1\iff n>2`,
            },
            {
              k: "p",
              t: String.raw`なので成り立つ。$0<a<1$ なら $u=1$ をとると $u^{2}+u=2<n$ が成り立つ。いずれの場合も整数解が存在する。`,
            },
            { k: "p", t: String.raw`以上より、求める必要十分条件は` },
            { k: "math", t: String.raw`n\geqq3` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`答えが $a$ によらないのが面白いところである。$a>1$ では「$u$ を大きくとればよい」、$0<a<1$ では「$u=1$ ととればよい」と、使う $x$ はまったく違うのに、存在する条件だけは一致する。`,
            },
          ],
          pitfalls: [
            String.raw`$n=2$ が等号の場合で落ちる。$u^{2}+u=n$ ちょうどは不等式を満たさないので、ここを $n\geqq2$ と答えてしまわない。`,
            String.raw`「存在するか」なので、$u$ を1つうまくとれればよい。すべての $u$ で成り立つ必要はない。`,
          ],
          check: String.raw`$a=2$ でも $a=0.5$ でも、整数解が存在する $n$ は $3,4,5,\ldots$ で、$n=1,2$ では存在しなかった。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列と極限",
      topics: ["漸化式と単調性", "発散の証明", "数学的帰納法", "有界単調数列の収束"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.1,0.5,2$ では60回で桁あふれするほど大きくなった",
          "$a=-0.9,-0.5,-0.1,-0.999$ のいずれでも20万回まで $-1<x_{n}<0$ と単調増加が保たれ、20万回後の値は $-5\\times10^{-6}$ 程度だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数とし、$x_{1}=a$、$x_{n+1}=x_{n}+x_{n}^{2}$（$n=1,2,3,\ldots$）で数列 $\left\{x_{n}\right\}$ を定める。$a>0$ のとき $\left\{x_{n}\right\}$ が発散することを示す`,
          answer: String.raw`$x_{n}\geqq a$ より $x_{n+1}-x_{n}=x_{n}^{2}\geqq a^{2}$ となり、$x_{n}\geqq a+\left(n-1\right)a^{2}\to\infty$`,
          approach: String.raw`「増え方が毎回 $a^{2}$ 以上」を示せば、1次式で下から押さえられる。極限を求める必要はなく、いくらでも大きくなることが言えればよい。`,
          blocks: [
            { k: "p", t: String.raw`まず、すべての $n$ で $x_{n}\geqq a$ を示す。$x_{1}=a$ であり、$x_{n}\geqq a>0$ とすると` },
            {
              k: "math",
              t: String.raw`x_{n+1}=x_{n}+x_{n}^{2}>x_{n}\geqq a`,
            },
            {
              k: "p",
              t: String.raw`なので、数学的帰納法によりすべての $n$ で $x_{n}\geqq a>0$ である。`,
            },
            { k: "p", t: String.raw`このとき` },
            {
              k: "math",
              t: String.raw`x_{n+1}-x_{n}=x_{n}^{2}\geqq a^{2}`,
            },
            { k: "p", t: String.raw`なので、これを $n=1$ から $n-1$ まで足し合わせると` },
            {
              k: "math",
              t: String.raw`x_{n}-x_{1}\geqq\left(n-1\right)a^{2},\qquad x_{n}\geqq a+\left(n-1\right)a^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$a^{2}>0$ だから右辺は $n\to\infty$ で $\infty$ に発散する。よって $x_{n}\to\infty$ となり、$\left\{x_{n}\right\}$ は発散する。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`「増加するから発散」とは言えない。増加しても上に有界なら収束してしまう。増え方が $0$ に潰れないことを示す必要がある。`,
          ],
          check: String.raw`$a=0.1$ でも60回で $10^{308}$ を超えた。`,
        },
        {
          label: "(2)",
          task: String.raw`$-1<a<0$ のとき、すべての正の整数 $n$ に対して $-1<x_{n}<0$ が成り立つことを示す`,
          answer: String.raw`$x_{n+1}=x_{n}\left(1+x_{n}\right)$ と因数分解すると、$-1<x_{n}<0$ から符号と大きさが決まる`,
          approach: String.raw`$x+x^{2}=x\left(1+x\right)$ と見る。$-1<x<0$ では $x<0$、$1+x>0$ なので積は負。下からは平方完成で $-\dfrac14$ 以上と分かる。`,
          blocks: [
            { k: "p", t: String.raw`数学的帰納法で示す。$n=1$ のとき $x_{1}=a$ で、仮定より $-1<a<0$ ✓。` },
            { k: "p", t: String.raw`$-1<x_{n}<0$ と仮定する。$g(x)=x+x^{2}$ とおくと` },
            {
              k: "math",
              t: String.raw`x_{n+1}=g\left(x_{n}\right)=x_{n}\left(1+x_{n}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。仮定より $x_{n}<0$ かつ $1+x_{n}>0$ なので、積は負である。つまり $x_{n+1}<0$ ✓。`,
            },
            { k: "p", t: String.raw`一方、平方完成すると` },
            {
              k: "math",
              t: String.raw`g(x)=\left(x+\frac12\right)^{2}-\frac14\geqq-\frac14`,
            },
            {
              k: "p",
              t: String.raw`なので $x_{n+1}\geqq-\dfrac14>-1$ ✓。よって $-1<x_{n+1}<0$ となり、数学的帰納法によりすべての $n$ で成り立つ。$\blacksquare$`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = x + x² のグラフ。-1 < x < 0 では値は負で、いちばん下がっても -1/4 までしかいかない。つまり区間 (-1, 0) はこの写像で自分自身の中に移る。",
                view: [-1.15, 0.15, -0.35, 0.2],
                step: { x: 0.5, y: 0.25 },
                items: [
                  { k: "curve", f: G19, from: -1.15, to: 0.15 },
                  { k: "dot", at: [-1, 0], label: "-1", place: "below-left" },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [-0.5, -0.25], label: "最小値 -1/4", place: "below" },
                  { k: "text", at: [-1.13, G19(-1.13)], label: "y = x + x²", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x+x^{2}$ を $x\left(1+x\right)$ と因数分解すると符号が一目で分かる。展開したままだと見通しが悪い。`,
          ],
          check: String.raw`$a=-0.999$ でも20万回まで $-1<x_{n}<0$ が保たれた。`,
        },
        {
          label: "(3)",
          task: String.raw`$-1<a<0$ のとき、数列 $\left\{x_{n}\right\}$ の極限を調べる`,
          answer: String.raw`$\displaystyle\lim_{n\to\infty}x_{n}=0$`,
          approach: String.raw`(2) で上に有界が分かっている。増加であることを足せば収束が言え、極限の値は漸化式に極限を代入して決まる。`,
          blocks: [
            { k: "p", t: String.raw`(2) よりすべての $n$ で $-1<x_{n}<0$ である。このとき` },
            {
              k: "math",
              t: String.raw`x_{n+1}-x_{n}=x_{n}^{2}\geqq0`,
            },
            {
              k: "p",
              t: String.raw`なので $\left\{x_{n}\right\}$ は（広い意味で）増加する。また (2) より上に $0$ で押さえられている。上に有界な増加数列は収束するので、極限 $\alpha=\displaystyle\lim_{n\to\infty}x_{n}$ が存在し、$-1\leqq\alpha\leqq0$ である。`,
            },
            { k: "p", t: String.raw`漸化式 $x_{n+1}=x_{n}+x_{n}^{2}$ で $n\to\infty$ とすると` },
            {
              k: "math",
              t: String.raw`\alpha=\alpha+\alpha^{2},\qquad\alpha^{2}=0,\qquad\alpha=0`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}x_{n}=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$x_{n}$ は負のまま $0$ に近づく。(1) の $a>0$ の場合と比べると、$x=0$ は「右から来ると離れていき、左から来ると吸い寄せられる」境目になっている。`,
            },
          ],
          pitfalls: [
            String.raw`「$\alpha=\alpha+\alpha^{2}$ だから $\alpha=0$」とだけ書くと、極限の存在を示していないことになる。有界性と単調性から収束を先に言う。`,
            String.raw`$x_{n+1}-x_{n}=x_{n}^{2}$ は $0$ 以上であって、正とは限らない（$x_{n}=0$ なら $0$）。ここでは $x_{n}<0$ なので実際は正である。`,
          ],
          check: String.raw`$a=-0.9,-0.5,-0.1$ のいずれでも20万回後は $-5\times10^{-6}$ 程度で、$0$ に近づいていた。`,
        },
      ],
    },
    {
      no: 4,
      field: "式と証明",
      topics: ["多項式の剰余", "剰余の積の法則", "2倍角の公式", "すべて求める"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "係数を整数で持つ割り算を実装して $[2x^{2}+x+3]=x+1$、$[x^{5}-1]=x-1$、$\\left[[2x^{2}+x+3][x^{5}-1]\\right]=-2$ を確認した",
          "乱数で作った200組の $A,B$ で $[AB]=\\left[[A][B]\\right]$ が成り立った",
          "$\\theta$ を20通りとって $\\left[\\left(x\\sin\\theta+\\cos\\theta\\right)^{2}\\right]=x\\sin2\\theta+\\cos2\\theta$ を確認した",
          "$\\left(a,b\\right)=\\left(\\pm\\tfrac{1}{\\sqrt2},\\pm\\tfrac{1}{\\sqrt2}\\right)$ の4組すべてで $\\left[\\left(ax+b\\right)^{4}\\right]=-1$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数を係数にもつ整式 $A(x)$ を $x^{2}+1$ で割った余りを $\left[A(x)\right]$ と表すとき、$\left[2x^{2}+x+3\right]$、$\left[x^{5}-1\right]$、$\left[\left[2x^{2}+x+3\right]\left[x^{5}-1\right]\right]$ をそれぞれ求める`,
          answer: String.raw`$x+1$、$x-1$、$-2$`,
          approach: String.raw`$x^{2}+1$ で割るので、$x^{2}$ を $-1$ に置きかえていくのが速い。$x^{4}=\left(x^{2}\right)^{2}$ は $1$ に化ける。`,
          blocks: [
            { k: "p", t: String.raw`余りを求めるときは、$x^{2}$ を $-1$ に置きかえてよい（$x^{2}=\left(x^{2}+1\right)-1$ だから）。` },
            { k: "p", t: String.raw`**$\left[2x^{2}+x+3\right]$。**` },
            {
              k: "math",
              t: String.raw`2x^{2}+x+3=2\left(x^{2}+1\right)+x+1`,
            },
            { k: "p", t: String.raw`なので $\left[2x^{2}+x+3\right]=x+1$ である。` },
            { k: "p", t: String.raw`**$\left[x^{5}-1\right]$。** $x^{2}\to-1$ より $x^{4}\to1$、$x^{5}=x\cdot x^{4}\to x$ なので` },
            {
              k: "math",
              t: String.raw`\left[x^{5}-1\right]=x-1`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**3つめ。** 上の2つを掛けて、また余りをとる。` },
            {
              k: "math",
              t: String.raw`\left[\left(x+1\right)\left(x-1\right)\right]=\left[x^{2}-1\right]=\left[\left(x^{2}+1\right)-2\right]=-2`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`多項式の割り算をそのまま実装して計算させたところ、$x+1$、$x-1$、$-2$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`整式 $A(x),B(x)$ に対して $\left[A(x)B(x)\right]=\left[\left[A(x)\right]\left[B(x)\right]\right]$ が成り立つことを示す`,
          answer: String.raw`$A=\left(x^{2}+1\right)Q_{A}+\left[A\right]$、$B=\left(x^{2}+1\right)Q_{B}+\left[B\right]$ を掛けると、差が $x^{2}+1$ で割り切れる`,
          approach: String.raw`「余りが等しい」は「差が $x^{2}+1$ で割り切れる」と同じこと。掛け算を展開して、$\left[A\right]\left[B\right]$ 以外の項がすべて $x^{2}+1$ を因数にもつことを見る。`,
          blocks: [
            { k: "p", t: String.raw`商を $Q_{A}(x),Q_{B}(x)$ とすると、割り算の原理から` },
            {
              k: "math",
              t: String.raw`A(x)=\left(x^{2}+1\right)Q_{A}(x)+\left[A(x)\right],\qquad B(x)=\left(x^{2}+1\right)Q_{B}(x)+\left[B(x)\right]`,
            },
            { k: "p", t: String.raw`である。掛け合わせると` },
            {
              k: "math",
              t: String.raw`A(x)B(x)=\left(x^{2}+1\right)\Bigl\{\left(x^{2}+1\right)Q_{A}Q_{B}+Q_{A}\left[B\right]+Q_{B}\left[A\right]\Bigr\}+\left[A(x)\right]\left[B(x)\right]`,
            },
            { k: "p", t: String.raw`となるので` },
            {
              k: "math",
              t: String.raw`A(x)B(x)-\left[A(x)\right]\left[B(x)\right]\ \text{は}\ x^{2}+1\ \text{で割り切れる}`,
            },
            {
              k: "p",
              t: String.raw`である。2つの整式の差が $x^{2}+1$ で割り切れるなら、それらを $x^{2}+1$ で割った余りは等しい。よって`,
            },
            {
              k: "math",
              t: String.raw`\left[A(x)B(x)\right]=\left[\left[A(x)\right]\left[B(x)\right]\right]`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`整数を $m$ で割った余りについて成り立つ「積の余りは、余りの積の余り」とまったく同じ仕組みである。`,
            },
          ],
          check: String.raw`乱数で作った200組の $A,B$ で両辺を計算すると、すべて一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`実数 $\theta$ に対して $\left[\left(x\sin\theta+\cos\theta\right)^{2}\right]=x\sin2\theta+\cos2\theta$ が成り立つことを示す`,
          answer: String.raw`展開して $x^{2}\sin^{2}\theta=\sin^{2}\theta\left(x^{2}+1\right)-\sin^{2}\theta$ と直すと、残りがちょうど2倍角になる`,
          approach: String.raw`$x^{2}$ の項だけを $x^{2}+1$ の倍数に吸わせればよい。残った定数項が $\cos^{2}\theta-\sin^{2}\theta$ になるところが要点。`,
          blocks: [
            { k: "p", t: String.raw`展開すると` },
            {
              k: "math",
              t: String.raw`\left(x\sin\theta+\cos\theta\right)^{2}=x^{2}\sin^{2}\theta+2x\sin\theta\cos\theta+\cos^{2}\theta`,
            },
            { k: "p", t: String.raw`である。$x^{2}\sin^{2}\theta=\sin^{2}\theta\left(x^{2}+1\right)-\sin^{2}\theta$ と書きかえると` },
            {
              k: "math",
              t: String.raw`=\sin^{2}\theta\left(x^{2}+1\right)+x\cdot2\sin\theta\cos\theta+\left(\cos^{2}\theta-\sin^{2}\theta\right)`,
            },
            { k: "p", t: String.raw`となる。2倍角の公式 $2\sin\theta\cos\theta=\sin2\theta$、$\cos^{2}\theta-\sin^{2}\theta=\cos2\theta$ より` },
            {
              k: "math",
              t: String.raw`=\sin^{2}\theta\left(x^{2}+1\right)+\left(x\sin2\theta+\cos2\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$x\sin2\theta+\cos2\theta$ は1次以下なので、これが余りである。よって`,
            },
            {
              k: "math",
              t: String.raw`\left[\left(x\sin\theta+\cos\theta\right)^{2}\right]=x\sin2\theta+\cos2\theta`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$x\sin\theta+\cos\theta$ を2乗すると角が $2\theta$ になる、という形は $\left(\cos\theta+i\sin\theta\right)^{2}=\cos2\theta+i\sin2\theta$ とそっくりである。$x^{2}+1$ で割ることが「$x$ を虚数単位だと思う」ことに対応している。`,
            },
          ],
          check: String.raw`$\theta$ を $0$ から $7.0$ まで20通りとって両辺を比べると、すべて小数12桁まで一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$\left[\left(ax+b\right)^{4}\right]=-1$ を満たす実数 $a,b$ の組 $\left(a,b\right)$ をすべて求める`,
          answer: String.raw`$\left(a,b\right)=\left(\dfrac{1}{\sqrt2},\dfrac{1}{\sqrt2}\right),\left(\dfrac{1}{\sqrt2},-\dfrac{1}{\sqrt2}\right),\left(-\dfrac{1}{\sqrt2},\dfrac{1}{\sqrt2}\right),\left(-\dfrac{1}{\sqrt2},-\dfrac{1}{\sqrt2}\right)$ の4組`,
          approach: String.raw`$ax+b$ を $r\left(x\sin\theta+\cos\theta\right)$ の形に直すと、(2)(3) がそのまま効いて4乗の余りが一気に出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(a,b\right)=\left(0,0\right)$ なら左辺は $0$ で不適である。以下 $\left(a,b\right)\neq\left(0,0\right)$ とし`,
            },
            {
              k: "math",
              t: String.raw`r=\sqrt{a^{2}+b^{2}}>0,\qquad\sin\theta=\frac{a}{r},\qquad\cos\theta=\frac{b}{r}`,
            },
            { k: "p", t: String.raw`となる $\theta$ をとる（$\sin^{2}\theta+\cos^{2}\theta=1$ なので必ずとれる）。このとき` },
            {
              k: "math",
              t: String.raw`ax+b=r\left(x\sin\theta+\cos\theta\right)`,
            },
            { k: "p", t: String.raw`である。$P(x)=x\sin\theta+\cos\theta$ とおくと、(2) と (3) から` },
            {
              k: "math",
              t: String.raw`\left[P(x)^{4}\right]=\left[\left[P(x)^{2}\right]\left[P(x)^{2}\right]\right]=\left[\left(x\sin2\theta+\cos2\theta\right)^{2}\right]=x\sin4\theta+\cos4\theta`,
            },
            {
              k: "p",
              t: String.raw`である（最後はもう一度 (3) を $\theta$ の代わりに $2\theta$ で使った）。定数倍は余りの計算をそのまま通るので`,
            },
            {
              k: "math",
              t: String.raw`\left[\left(ax+b\right)^{4}\right]=r^{4}\left(x\sin4\theta+\cos4\theta\right)`,
            },
            { k: "p", t: String.raw`である。これが $-1$ に等しいとは、$x$ の係数と定数項を比べて` },
            {
              k: "math",
              t: String.raw`r^{4}\sin4\theta=0,\qquad r^{4}\cos4\theta=-1`,
            },
            {
              k: "p",
              t: String.raw`ということである。$r>0$ より $\sin4\theta=0$ で、このとき $\cos4\theta=\pm1$ である。2つめの式の右辺が負だから $\cos4\theta=-1$、したがって $r^{4}=1$、つまり $r=1$ である。`,
            },
            { k: "p", t: String.raw`$\cos4\theta=-1$ より $4\theta=\pi+2k\pi$、すなわち` },
            {
              k: "math",
              t: String.raw`\theta=\frac{\pi}{4}+\frac{k\pi}{2}\qquad\left(k\ \text{は整数}\right)`,
            },
            { k: "p", t: String.raw`である。$r=1$ なので $\left(a,b\right)=\left(\sin\theta,\cos\theta\right)$ で、$k=0,1,2,3$ に対応して` },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(\frac{1}{\sqrt2},\frac{1}{\sqrt2}\right),\ \left(\frac{1}{\sqrt2},-\frac{1}{\sqrt2}\right),\ \left(-\frac{1}{\sqrt2},-\frac{1}{\sqrt2}\right),\ \left(-\frac{1}{\sqrt2},\frac{1}{\sqrt2}\right)`,
            },
            { k: "p", t: String.raw`の4組である。` },
            {
              k: "note",
              t: String.raw`直接計算しても確かめられる。$\left[\left(ax+b\right)^{2}\right]=2abx+\left(b^{2}-a^{2}\right)$ で、もう一度2乗して余りをとると $4ab\left(b^{2}-a^{2}\right)x+\left(b^{2}-a^{2}\right)^{2}-4a^{2}b^{2}$ になる。$=-1$ から $ab\left(b^{2}-a^{2}\right)=0$ と $\left(b^{2}-a^{2}\right)^{2}-4a^{2}b^{2}=-1$ が出て、$a=0$ も $b=0$ も不適なので $b^{2}=a^{2}$、したがって $-4a^{4}=-1$ となり同じ答えになる。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(a,b\right)=\left(0,0\right)$ を先に外しておく。$r$ で割る操作がそこだけできない。`,
            String.raw`$r^{4}\cos4\theta=-1$ の右辺が負であることから $\cos4\theta=-1$ に決まる。$+1$ のほうを拾わない。`,
          ],
          check: String.raw`4組すべてで $\left[\left(ax+b\right)^{4}\right]$ を計算すると $-1$（$x$ の係数は $0$）になった。$0.01$ 刻みの格子では解が見つからなかったが、これは $\tfrac{1}{\sqrt2}=0.7071\ldots$ が刻みに乗らないためである。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["x を -x に置きかえる置換", "偶関数・奇関数", "定積分を定数とおく", "関数の決定"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\displaystyle\\int_{-1}^{1}\\frac{\\sin^{2}(\\pi x)}{1+e^{x}}dx$ を数値積分すると $0.500000000$ で、$\\displaystyle\\int_{0}^{1}\\sin^{2}(\\pi x)dx=0.500000000$ と一致した",
          "求めた $f$ について $A=\\int_{-1}^{1}f=1.426930918$、$B=\\int_{-1}^{1}e^{t}f(t)dt=1.926930918$ が、立てた式の値と小数9桁まで一致した",
          "$x=-0.8,-0.3,0,0.4,0.9$ で、もとの等式の左辺と右辺が小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\displaystyle\int_{-1}^{1}\frac{\sin^{2}(\pi x)}{1+e^{x}}dx=\int_{0}^{1}\sin^{2}(\pi x)\,dx=\frac12$ が成り立つことを示す`,
          answer: String.raw`$x\to-x$ の置換で同じ積分の「相棒」を作り、足して $\dfrac{1}{1+e^{x}}+\dfrac{e^{x}}{1+e^{x}}=1$ を使う`,
          approach: String.raw`$\dfrac{1}{1+e^{x}}$ は偶関数でも奇関数でもないが、$x\to-x$ で $\dfrac{e^{x}}{1+e^{x}}$ に変わり、もとと足すと $1$ になる。被積分関数の残り $\sin^{2}(\pi x)$ が偶関数なのでうまくいく。`,
          blocks: [
            { k: "p", t: String.raw`$I=\displaystyle\int_{-1}^{1}\frac{\sin^{2}(\pi x)}{1+e^{x}}dx$ とおく。$x=-u$ と置換すると $dx=-du$ で、積分区間は $u$ が $1\to-1$ になるから` },
            {
              k: "math",
              t: String.raw`I=\int_{1}^{-1}\frac{\sin^{2}(-\pi u)}{1+e^{-u}}\left(-du\right)=\int_{-1}^{1}\frac{\sin^{2}(\pi u)}{1+e^{-u}}du`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin^{2}$ は偶関数なので $\sin^{2}(-\pi u)=\sin^{2}(\pi u)$）。ここで分母・分子に $e^{u}$ を掛けると`,
            },
            {
              k: "math",
              t: String.raw`I=\int_{-1}^{1}\frac{e^{u}\sin^{2}(\pi u)}{1+e^{u}}du`,
            },
            { k: "p", t: String.raw`である。もとの式と足し合わせると` },
            {
              k: "math",
              t: String.raw`2I=\int_{-1}^{1}\sin^{2}(\pi x)\left(\frac{1}{1+e^{x}}+\frac{e^{x}}{1+e^{x}}\right)dx=\int_{-1}^{1}\sin^{2}(\pi x)\,dx`,
            },
            { k: "p", t: String.raw`となる。$\sin^{2}(\pi x)$ は偶関数なので` },
            {
              k: "math",
              t: String.raw`2I=2\int_{0}^{1}\sin^{2}(\pi x)\,dx,\qquad I=\int_{0}^{1}\sin^{2}(\pi x)\,dx`,
            },
            { k: "p", t: String.raw`である。最後に半角の公式で` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\sin^{2}(\pi x)\,dx=\int_{0}^{1}\frac{1-\cos2\pi x}{2}dx=\left[\frac{x}{2}-\frac{\sin2\pi x}{4\pi}\right]_{0}^{1}=\frac12`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "太い実線が sin²(πx)/(1+eˣ)、破線は x を -x に置きかえたもの（= eˣsin²(πx)/(1+eˣ)）。2つは y 軸について対称で、足すと細い線の sin²(πx) になる。だから太い線の面積は細い線の面積のちょうど半分。",
                view: [-1.15, 1.15, -0.1, 1.15],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: S19, from: -1, to: 1, faint: true },
                  { k: "curve", f: G5B, from: -1, to: 1, dash: true },
                  { k: "curve", f: G5A, from: -1, to: 1 },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`一般に、$f$ が偶関数なら $\displaystyle\int_{-c}^{c}\frac{f(x)}{1+e^{x}}dx=\int_{0}^{c}f(x)\,dx$ が成り立つ。この問題はその特別な場合である。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{1}{1+e^{x}}$ そのものは偶関数でも奇関数でもない。置換して足す、という手順が必要である。`,
          ],
          check: String.raw`数値積分すると左の積分も真ん中の積分も $0.500000000$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\left(1+e^{x}\right)f(x)=\sin^{2}(\pi x)+\displaystyle\int_{-1}^{1}\left(e^{x}-e^{t}+1\right)f(t)\,dt$ を満たす関数 $f(x)$ を求める`,
          answer: String.raw`$f(x)=\dfrac{1}{1+e^{x}}\left(\sin^{2}(\pi x)-\dfrac12+\dfrac{e^{x}}{2\left(e-e^{-1}-2\right)}\right)$`,
          approach: String.raw`積分の中は $t$ だけの関数なので、$\displaystyle\int_{-1}^{1}f(t)dt$ と $\displaystyle\int_{-1}^{1}e^{t}f(t)dt$ を定数 $A,B$ とおく。$f$ を $A,B$ で書いてから、その $f$ を使って $A,B$ を計算し直すと連立方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`$A=\displaystyle\int_{-1}^{1}f(t)\,dt$、$B=\displaystyle\int_{-1}^{1}e^{t}f(t)\,dt$ とおく。右辺の積分は` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\left(e^{x}-e^{t}+1\right)f(t)\,dt=e^{x}A-B+A`,
            },
            { k: "p", t: String.raw`なので（$e^{x}$ は $t$ について定数）、もとの等式は` },
            {
              k: "math",
              t: String.raw`\left(1+e^{x}\right)f(x)=\sin^{2}(\pi x)+Ae^{x}+\left(A-B\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`f(x)=\frac{\sin^{2}(\pi x)+Ae^{x}+\left(A-B\right)}{1+e^{x}}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**準備。** よく使う積分を先に求めておく。(1) の結果と同じ置換の議論から` },
            {
              k: "steps",
              items: [
                String.raw`$\displaystyle\int_{-1}^{1}\frac{\sin^{2}(\pi x)}{1+e^{x}}dx=\frac12$、よって $\displaystyle\int_{-1}^{1}\frac{e^{x}\sin^{2}(\pi x)}{1+e^{x}}dx=\int_{-1}^{1}\sin^{2}(\pi x)dx-\frac12=1-\frac12=\frac12$`,
                String.raw`$\displaystyle\int_{-1}^{1}\frac{e^{x}}{1+e^{x}}dx=\Bigl[\log\left(1+e^{x}\right)\Bigr]_{-1}^{1}=\log\frac{1+e}{1+e^{-1}}=\log e=1$`,
                String.raw`$\displaystyle\int_{-1}^{1}\frac{dx}{1+e^{x}}=\int_{-1}^{1}dx-1=2-1=1$`,
                String.raw`$\displaystyle\int_{-1}^{1}\frac{e^{2x}}{1+e^{x}}dx=\int_{-1}^{1}\left(e^{x}-\frac{e^{x}}{1+e^{x}}\right)dx=\left(e-e^{-1}\right)-1$`,
              ],
            },
            { k: "p", t: String.raw`**$A$ の式。** $f$ を代入して項ごとに積分すると` },
            {
              k: "math",
              t: String.raw`A=\frac12+A\cdot1+\left(A-B\right)\cdot1`,
            },
            { k: "p", t: String.raw`である。整理すると $0=\dfrac12+A-B$、つまり` },
            {
              k: "math",
              t: String.raw`A-B=-\frac12`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$B$ の式。** 同じように $e^{x}f(x)$ を積分すると` },
            {
              k: "math",
              t: String.raw`B=\frac12+A\left\{\left(e-e^{-1}\right)-1\right\}+\left(A-B\right)\cdot1=\frac12+A\left(e-e^{-1}-1\right)-\frac12`,
            },
            { k: "p", t: String.raw`すなわち $B=A\left(e-e^{-1}-1\right)$ である。$B=A+\dfrac12$ と合わせて` },
            {
              k: "math",
              t: String.raw`A+\frac12=A\left(e-e^{-1}-1\right),\qquad\frac12=A\left(e-e^{-1}-2\right)`,
            },
            { k: "p", t: String.raw`である。$e-e^{-1}-2=0.3504\cdots\neq0$ なので` },
            {
              k: "math",
              t: String.raw`A=\frac{1}{2\left(e-e^{-1}-2\right)}=\frac{e}{2\left(e^{2}-2e-1\right)}`,
            },
            { k: "p", t: String.raw`である。$A-B=-\dfrac12$ を使って、求める関数は` },
            {
              k: "math",
              t: String.raw`f(x)=\frac{1}{1+e^{x}}\left\{\sin^{2}(\pi x)-\frac12+\frac{e^{x}}{2\left(e-e^{-1}-2\right)}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$A$ と $B$ は $A-B=-\dfrac12$ という関係で結ばれるので、$f$ の式に現れる未知数は実質 $A$ だけになる。$B$ の式がもう1本の条件になって $A$ が決まる、という流れである。`,
            },
          ],
          pitfalls: [
            String.raw`$e^{x}-e^{t}+1$ の $e^{x}$ は $t$ の積分では定数。$\displaystyle\int_{-1}^{1}e^{x}f(t)dt=e^{x}A$ であって $B$ ではない。`,
            String.raw`$\displaystyle\int_{-1}^{1}\frac{dx}{1+e^{x}}$ も (1) と同じ仕組み（被積分関数の分子が偶関数 $1$）で $1$ になる。地道に原始関数を求めてもよい。`,
            String.raw`$A$ の式だけでは $A$ が決まらない（$A$ が消えて $A-B$ の関係になる）。$B$ の式も立てる。`,
          ],
          check: String.raw`求めた $f$ を数値積分すると $A=1.426930918$、$B=1.926930918$ で、$\dfrac{e}{2\left(e^{2}-2e-1\right)}=1.426930918$ と一致した。$x$ を5点とってもとの等式の両辺を比べると、すべて小数9桁まで一致した。`,
        },
      ],
    },
    {
      no: 6,
      field: "確率",
      topics: ["状態の推移", "確率漸化式", "等比型への帰着", "2段階の漸化式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "袋の状態を分数のまま推移させて $p(m,k)$ を求め、$n=2$ から $11$ まで $p(n+1,2)=\\tfrac7{10}p(n,2)+\\tfrac25p(n,1)$ を確認した",
          "$p(n,1)=5\\left(\\tfrac35\\right)^{n}-5\\left(\\tfrac12\\right)^{n}$、$p(n,2)=10\\left(\\tfrac7{10}\\right)^{n}-20\\left(\\tfrac35\\right)^{n}+10\\left(\\tfrac12\\right)^{n}$ が $n=1$ から $12$ まで分数で完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$10$ 個の玉が入っている袋から $1$ 個の玉を無作為に取り出し、新たに白玉 $1$ 個を袋に入れるという試行を繰り返す。初めに袋には赤玉 $5$ 個と白玉 $5$ 個が入っているとし、この試行を $m$ 回繰り返したとき、取り出した赤玉が全部で $k$ 個である確率を $p(m,k)$ とする。$2$ 以上の整数 $n$ に対して、$p(n+1,2)$ を $p(n,2)$ と $p(n,1)$ を用いて表す`,
          answer: String.raw`$p(n+1,2)=\dfrac{7}{10}p(n,2)+\dfrac25p(n,1)$`,
          approach: String.raw`取り出した赤玉の累計が $j$ 個なら、袋の中は赤 $5-j$ 個・白 $5+j$ 個（合計はいつも $10$ 個のまま）。この1つの数で状態が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1個取り出して白を1個入れるので、袋の中の玉は常に $10$ 個である。これまでに赤玉を $j$ 個取り出しているなら、袋の中は`,
            },
            {
              k: "math",
              t: String.raw`\text{赤}\ 5-j\ \text{個},\qquad\text{白}\ 5+j\ \text{個}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって次の1回で赤玉を取り出す確率は $\dfrac{5-j}{10}$、赤玉でない（白玉）確率は $\dfrac{5+j}{10}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$n+1$ 回終わって赤玉が2個になるのは、次の2つの場合である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n$ 回で既に2個（$j=2$：袋は赤3・白7）で、$n+1$ 回目は白を取り出す：確率 $\dfrac{7}{10}$`,
                String.raw`$n$ 回で1個（$j=1$：袋は赤4・白6）で、$n+1$ 回目は赤を取り出す：確率 $\dfrac{4}{10}$`,
              ],
            },
            { k: "p", t: String.raw`この2つは互いに排反なので` },
            {
              k: "math",
              t: String.raw`p(n+1,2)=\frac{7}{10}p(n,2)+\frac{4}{10}p(n,1)=\frac{7}{10}p(n,2)+\frac25p(n,1)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`袋の中身は「取り出した赤玉の累計」だけで決まる。どの順で取り出したかは関係ない。`,
            String.raw`取り出すたびに白を1個補充するので、袋の玉の総数は $10$ のまま変わらない。`,
          ],
          check: String.raw`袋の状態を分数のまま推移させて計算した $p(m,k)$ について、$n=2$ から $11$ までこの関係が成り立った。`,
        },
        {
          label: "(2)",
          task: String.raw`$p(n,1)$ を求める`,
          answer: String.raw`$p(n,1)=5\left(\dfrac35\right)^{n}-5\left(\dfrac12\right)^{n}$`,
          approach: String.raw`まず $p(m,0)$ を求める。赤を1個も取り出していなければ袋は赤5・白5のままなので、毎回 $\dfrac12$ で白。そのあと (1) と同じ考えで $p(m,1)$ の漸化式を立てる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$p(m,0)$。** 赤玉を1個も取り出していない間、袋は赤5・白5のままである（白を取り出して白を入れるので変わらない）。毎回白を取り出す確率は $\dfrac{5}{10}=\dfrac12$ だから`,
            },
            {
              k: "math",
              t: String.raw`p(m,0)=\left(\frac12\right)^{m}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$p(m,1)$ の漸化式。** $m+1$ 回で赤が1個になるのは、$m$ 回で1個（袋は赤4・白6）でその後白を取り出すか、$m$ 回で0個（袋は赤5・白5）でその後赤を取り出すかである。`,
            },
            {
              k: "math",
              t: String.raw`p(m+1,1)=\frac{6}{10}p(m,1)+\frac{5}{10}p(m,0)=\frac35p(m,1)+\frac12\left(\frac12\right)^{m}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`p(m+1,1)=\frac35p(m,1)+\left(\frac12\right)^{m+1}`,
            },
            { k: "p", t: String.raw`である。また $p(1,1)=\dfrac12$ である。` },
            {
              k: "p",
              t: String.raw`**解く。** $p(m,1)=\alpha\left(\dfrac35\right)^{m}+\beta\left(\dfrac12\right)^{m}$ の形を探す。漸化式に入れて $\left(\dfrac12\right)^{m}$ の係数を比べると`,
            },
            {
              k: "math",
              t: String.raw`\frac{\beta}{2}=\frac35\beta+\frac12,\qquad-\frac{\beta}{10}=\frac12,\qquad\beta=-5`,
            },
            { k: "p", t: String.raw`である（$\left(\dfrac35\right)^{m}$ の係数は自動的に合う）。$p(1,1)=\dfrac12$ から` },
            {
              k: "math",
              t: String.raw`\frac35\alpha-\frac52=\frac12,\qquad\frac35\alpha=3,\qquad\alpha=5`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`p(n,1)=5\left(\frac35\right)^{n}-5\left(\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ では $3-\dfrac52=\dfrac12$、$n=2$ では $\dfrac95-\dfrac54=\dfrac{11}{20}$ で、直接数え上げた値と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$p(m,0)=\left(\dfrac12\right)^{m}$ は「赤を取り出さない限り袋が変わらない」から。ここを取り違えると全部ずれる。`,
            String.raw`$\dfrac35$ と $\dfrac12$ という2つの比が出てくる。$\left(\dfrac12\right)^{m}$ を特殊解、$\left(\dfrac35\right)^{m}$ を同次解と見て足し合わせる。`,
          ],
          check: String.raw`分数のまま計算した $p(n,1)$ は $n=1,\ldots,6$ で $\tfrac12,\tfrac{11}{20},\tfrac{91}{200},\tfrac{671}{2000},\tfrac{4651}{20000},\tfrac{31031}{200000}$ で、この式と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$p(n,2)$ を求める`,
          answer: String.raw`$p(n,2)=10\left(\dfrac{7}{10}\right)^{n}-20\left(\dfrac35\right)^{n}+10\left(\dfrac12\right)^{n}$`,
          approach: String.raw`(1) の漸化式に (2) の結果を入れると、$\left(\dfrac35\right)^{m}$ と $\left(\dfrac12\right)^{m}$ が外から入ってくる形になる。(2) と同じく、3つの等比数列の重ね合わせで解ける。`,
          blocks: [
            { k: "p", t: String.raw`(1) の漸化式に (2) を代入すると` },
            {
              k: "math",
              t: String.raw`p(m+1,2)=\frac{7}{10}p(m,2)+\frac25\left\{5\left(\frac35\right)^{m}-5\left(\frac12\right)^{m}\right\}=\frac{7}{10}p(m,2)+2\left(\frac35\right)^{m}-2\left(\frac12\right)^{m}`,
            },
            { k: "p", t: String.raw`である。$p(1,2)=0$（1回では赤を2個取り出せない）である。` },
            {
              k: "p",
              t: String.raw`$p(m,2)=A\left(\dfrac{7}{10}\right)^{m}+B\left(\dfrac35\right)^{m}+C\left(\dfrac12\right)^{m}$ とおいて係数を比べる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left(\dfrac35\right)^{m}$：$\dfrac35B=\dfrac{7}{10}B+2$ より $-\dfrac{B}{10}=2$、$B=-20$`,
                String.raw`$\left(\dfrac12\right)^{m}$：$\dfrac{C}{2}=\dfrac{7}{10}C-2$ より $-\dfrac{C}{5}=-2$、$C=10$`,
              ],
            },
            { k: "p", t: String.raw`である。$p(1,2)=0$ から` },
            {
              k: "math",
              t: String.raw`\frac{7}{10}A-20\cdot\frac35+10\cdot\frac12=0,\qquad\frac{7}{10}A-12+5=0,\qquad A=10`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`p(n,2)=10\left(\frac{7}{10}\right)^{n}-20\left(\frac35\right)^{n}+10\left(\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{7}{10},\dfrac{6}{10},\dfrac{5}{10}$ という3つの「白を取り出す確率」が、そのまま3つの等比の比として現れている。赤を $k$ 個取り出す確率は、この形が $k+1$ 項に伸びていく。`,
            },
          ],
          pitfalls: [
            String.raw`初期条件は $p(1,2)=0$。$p(0,2)=0$ から始めてもよいが、(1) の漸化式は $n\geqq2$ 向けなので $m=1$ から使うときは直接確かめておく。`,
            String.raw`$B,C$ を決めるとき、漸化式の「外から入る項」の符号に注意する。$-2\left(\dfrac12\right)^{m}$ の側は $C$ が正になる。`,
          ],
          check: String.raw`分数のまま計算した $p(n,2)$ は $n=1,\ldots,6$ で $0,\tfrac15,\tfrac9{25},\tfrac{217}{500},\tfrac{219}{500},\tfrac{19981}{50000}$ で、この式と完全に一致した。`,
        },
      ],
    },
  ],
};
