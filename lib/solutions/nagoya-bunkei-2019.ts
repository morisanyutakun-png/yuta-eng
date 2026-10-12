import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2019年度（平成31年度）一般入試 前期日程 数学（文科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 3問とも自分で解き直した。理科系の同年度とは別問題で、共通の大問はなかった。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の図。$a=1$ の例（$a>0$ なので3点で交わる）。 */
const A19 = 1;
const G19 = (x: number): number => x ** 3 / 3 + (A19 / 2 - 1) * x * x - 2 * A19 * x + A19;

/** 第2問の図。$\alpha=\tfrac{2\pi}{7}$ の例。$\mathrm{P}_n$ は単位円を $\alpha$ ずつ回った点。 */
const AL19 = (2 * Math.PI) / 7;
const PT19 = (n: number): [number, number] => [Math.cos(n * AL19), Math.sin(n * AL19)];

export const nagoyaBunkei2019: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法・積分法",
      topics: ["定積分で定まる関数", "3次関数の極値", "極値の積の符号", "4次不等式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-9$ から $6$ まで $0.001$ 刻みの15001点でとり、3次方程式の相異なる実数解の個数を数値で数えると、$a<-3-\\sqrt3$ または $-\\tfrac43<a<-3+\\sqrt3$ または $a>0$ と完全に一致した（差異 0 件）",
          "$a=0$ と $a=-\\tfrac43$ と $a=-3+\\sqrt3$ では解が2個（重解）、$a=-2$ では1個だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a$ を実数、$f(x)=x^{2}+ax-a$、$F(x)=\displaystyle\int_{0}^{x}f(t)\,dt$ とするとき、$y=F(x)-f(x)$ のグラフが $x$ 軸と異なる3点で交わるための $a$ の条件を求める`,
          answer: String.raw`$a<-3-\sqrt{3}$、$-\dfrac{4}{3}<a<-3+\sqrt{3}$、$a>0$ のいずれか`,
          approach: String.raw`$g(x)=F(x)-f(x)$ は3次関数なので、「異なる3点で $x$ 軸と交わる」$\iff$「極大値と極小値をもち、その積が負」である。$g'$ がきれいに因数分解できるので、極値を与える $x$ は $a$ の式としてすぐ出る。最後は $a$ の4次不等式になるが、これも因数分解できる。`,
          blocks: [
            { k: "p", t: String.raw`**$g$ を求める。** $f(t)=t^{2}+at-a$ を $0$ から $x$ まで積分して` },
            {
              k: "math",
              t: String.raw`F(x)=\frac{x^{3}}{3}+\frac{a}{2}x^{2}-ax`,
            },
            { k: "p", t: String.raw`である。$g(x)=F(x)-f(x)$ とおくと` },
            {
              k: "math",
              t: String.raw`g(x)=\frac{x^{3}}{3}+\frac{a}{2}x^{2}-ax-\left(x^{2}+ax-a\right)=\frac{x^{3}}{3}+\left(\frac{a}{2}-1\right)x^{2}-2ax+a`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**極値。** 微分すると` },
            {
              k: "math",
              t: String.raw`g'(x)=x^{2}+\left(a-2\right)x-2a=\left(x+a\right)\left(x-2\right)`,
            },
            {
              k: "p",
              t: String.raw`である。3次関数が $x$ 軸と異なる3点で交わるのは、極大値と極小値をもち（$g'=0$ が異なる2実数解をもち）、かつ`,
            },
            { k: "math", t: String.raw`\left(\text{極大値}\right)\times\left(\text{極小値}\right)<0` },
            {
              k: "p",
              t: String.raw`のときである。$g'=0$ の解は $x=-a$ と $x=2$ で、異なるのは $a\neq-2$ のときである。この2つでの値を計算すると`,
            },
            {
              k: "math",
              t: String.raw`g(2)=\frac{8}{3}+4\left(\frac{a}{2}-1\right)-4a+a=\frac{8}{3}-4-a=-\frac{3a+4}{3}`,
            },
            {
              k: "math",
              t: String.raw`g(-a)=-\frac{a^{3}}{3}+a^{2}\left(\frac{a}{2}-1\right)+2a^{2}+a=\frac{a^{3}}{6}+a^{2}+a=\frac{a}{6}\left(a^{2}+6a+6\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1 のときの y = g(x)。x = -a と x = 2 で極値をとり、極大値が正・極小値が負なので x 軸と3点で交わる。",
                view: [-3.4, 4.4, -3.4, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: G19, from: -2.65, to: 3.65 },
                  { k: "dot", at: [-A19, G19(-A19)], label: "x = -a（極大）", place: "above-right" },
                  { k: "dot", at: [2, G19(2)], label: "x = 2（極小）", place: "below-right" },
                  { k: "text", at: [3.6, 3.3], label: "y = g(x)", place: "left" },
                ],
              },
            },
            { k: "p", t: String.raw`**条件を整理する。** 積が負という条件は` },
            {
              k: "math",
              t: String.raw`-\frac{3a+4}{3}\cdot\frac{a}{6}\left(a^{2}+6a+6\right)<0`,
            },
            { k: "p", t: String.raw`すなわち、両辺に $-18$ を掛けて（不等号の向きが変わる）` },
            {
              k: "math",
              t: String.raw`a\left(3a+4\right)\left(a^{2}+6a+6\right)>0\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。$a^{2}+6a+6=0$ の解は $a=-3\pm\sqrt{3}$ なので、① の左辺は` },
            {
              k: "math",
              t: String.raw`3a\left(a+\frac{4}{3}\right)\left(a+3+\sqrt{3}\right)\left(a+3-\sqrt{3}\right)>0`,
            },
            { k: "p", t: String.raw`と4つの1次式の積に分解できる。4つの解を小さい順に並べると` },
            {
              k: "math",
              t: String.raw`-3-\sqrt{3}<-\frac{4}{3}<-3+\sqrt{3}<0`,
            },
            {
              k: "p",
              t: String.raw`である（$-3-\sqrt3=-4.732\cdots$、$-\tfrac43=-1.333\cdots$、$-3+\sqrt3=-1.268\cdots$）。最高次の係数が正の4次式なので、符号は外側から $+,-,+,-,+$ と交互に変わり、① が成り立つのは`,
            },
            {
              k: "math",
              t: String.raw`a<-3-\sqrt{3},\qquad-\frac{4}{3}<a<-3+\sqrt{3},\qquad a>0`,
            },
            {
              k: "p",
              t: String.raw`のいずれかのときである。なお $a=-2$ はこのどの区間にも入っていないので（$-2$ は $-3-\sqrt3$ と $-\tfrac43$ のあいだ）、$a\neq-2$ の条件は自動的に満たされている。`,
            },
          ],
          pitfalls: [
            String.raw`$-\tfrac43$ と $-3+\sqrt3$ はどちらも $-1.3$ 前後で、大小が紛らわしい。$-\tfrac43=-1.3333$、$-3+\sqrt3=-1.2679$ なので $-\tfrac43<-3+\sqrt3$ である。`,
            String.raw`$g'=0$ が重解になる $a=-2$ を忘れずに外す（ただし結果的にすでに除外されている）。`,
            String.raw`「極値の積が負」で片づける。3つの解を具体的に求めようとしない。`,
          ],
          check: String.raw`$a$ を $-9$ から $6$ まで $0.001$ 刻みでとって実数解の個数を数値で数えると、上の3つの区間と完全に一致した。$a=-1.3$（$-\tfrac43<a<-3+\sqrt3$）では3個、$a=-1.28$ でも3個、$a=-3$ では1個だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列・図形と方程式",
      topics: ["連立漸化式", "回転", "加法定理", "三角形の面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha=0.3,1,2,3$ について漸化式を数値で5回まわすと、$\\mathrm{P}_{n}$ と $\\left(\\cos n\\alpha,\\ \\sin n\\alpha\\right)$ の差は最大 $5.6\\times10^{-16}$ だった",
          "同じ $\\alpha$ で $\\triangle\\mathrm{P}_{1}\\mathrm{OP}_{2}$ を外積で計算すると $\\dfrac{k}{1+k^{2}}$（$=\\dfrac{\\sin\\alpha}{2}$）と小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}_{0}(1,0)$ とし、$x_{n+1}=x_{n}-k\left(y_{n}+y_{n+1}\right)$、$y_{n+1}=y_{n}+k\left(x_{n}+x_{n+1}\right)$（$k>0$）で $\mathrm{P}_{n}\left(x_{n},y_{n}\right)$ を定める。$k=\tan\dfrac{\alpha}{2}$（$0<\alpha<\pi$）のとき $\mathrm{P}_{1},\mathrm{P}_{2}$ の座標を $\alpha$ で表す`,
          answer: String.raw`$\mathrm{P}_{1}\left(\cos\alpha,\ \sin\alpha\right)$、$\mathrm{P}_{2}\left(\cos2\alpha,\ \sin2\alpha\right)$`,
          approach: String.raw`$x_{n+1},y_{n+1}$ が両辺に出ているので、まず $x_{n+1},y_{n+1}$ について解く。$2\times2$ の連立1次方程式になり、解くと「回転」の形が見える。$k=\tan\tfrac{\alpha}{2}$ を入れると半角の公式で $\cos\alpha,\sin\alpha$ がそのまま出る。`,
          blocks: [
            { k: "p", t: String.raw`与えられた2式を $x_{n+1},y_{n+1}$ について整理すると` },
            {
              k: "math",
              t: String.raw`x_{n+1}+ky_{n+1}=x_{n}-ky_{n},\qquad-kx_{n+1}+y_{n+1}=kx_{n}+y_{n}`,
            },
            { k: "p", t: String.raw`である。これを ㋐、㋑ と呼ぶ。㋐ $-\,k\times$㋑ を作ると $y_{n+1}$ が消えて` },
            {
              k: "math",
              t: String.raw`\left(1+k^{2}\right)x_{n+1}=\left(x_{n}-ky_{n}\right)-k\left(kx_{n}+y_{n}\right)=\left(1-k^{2}\right)x_{n}-2ky_{n}`,
            },
            { k: "p", t: String.raw`となる。$k\times$㋐ $+$ ㋑ を作ると $x_{n+1}$ が消えて` },
            {
              k: "math",
              t: String.raw`\left(1+k^{2}\right)y_{n+1}=k\left(x_{n}-ky_{n}\right)+\left(kx_{n}+y_{n}\right)=2kx_{n}+\left(1-k^{2}\right)y_{n}`,
            },
            { k: "p", t: String.raw`である。まとめると` },
            {
              k: "math",
              t: String.raw`\begin{cases}x_{n+1}=\dfrac{1-k^{2}}{1+k^{2}}x_{n}-\dfrac{2k}{1+k^{2}}y_{n}\\[6pt]y_{n+1}=\dfrac{2k}{1+k^{2}}x_{n}+\dfrac{1-k^{2}}{1+k^{2}}y_{n}\end{cases}\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。ここで $k=\tan\dfrac{\alpha}{2}$ とすると、半角の公式（$t=\tan\tfrac\alpha2$ 置換）から` },
            {
              k: "math",
              t: String.raw`\frac{1-k^{2}}{1+k^{2}}=\cos\alpha,\qquad\frac{2k}{1+k^{2}}=\sin\alpha`,
            },
            { k: "p", t: String.raw`なので、① は` },
            {
              k: "math",
              t: String.raw`\begin{cases}x_{n+1}=x_{n}\cos\alpha-y_{n}\sin\alpha\\y_{n+1}=x_{n}\sin\alpha+y_{n}\cos\alpha\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`すなわち「原点のまわりに角 $\alpha$ だけ回す」という式である。$\mathrm{P}_{0}(1,0)$ から始めるので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}_{1}\left(\cos\alpha,\ \sin\alpha\right),\qquad\mathrm{P}_{2}\left(\cos2\alpha,\ \sin2\alpha\right)`,
            },
            { k: "p", t: String.raw`である（$\mathrm{P}_{2}$ は $\mathrm{P}_{1}$ をもう一度 $\alpha$ 回したもので、加法定理から $\cos\alpha\cos\alpha-\sin\alpha\sin\alpha=\cos2\alpha$、$\sin\alpha\cos\alpha+\cos\alpha\sin\alpha=\sin2\alpha$）。` },
            {
              k: "note",
              t: String.raw`$\dfrac{1-t^{2}}{1+t^{2}}=\cos\alpha$、$\dfrac{2t}{1+t^{2}}=\sin\alpha$（$t=\tan\tfrac\alpha2$）は、$\cos\alpha=2\cos^{2}\tfrac\alpha2-1$、$\sin\alpha=2\sin\tfrac\alpha2\cos\tfrac\alpha2$ を $\cos^{2}\tfrac\alpha2=\dfrac{1}{1+t^{2}}$ で書き直したものである。`,
            },
          ],
          pitfalls: [
            String.raw`漸化式の右辺に $x_{n+1},y_{n+1}$ が入っている。まず「次の項」について解くのが第一歩である。`,
            String.raw`$0<\alpha<\pi$ なので $\tfrac\alpha2\in\left(0,\tfrac\pi2\right)$ で $k=\tan\tfrac\alpha2>0$。問題の「$k$ は正の実数」と整合している。`,
          ],
          check: String.raw`$\alpha=1$（$k=0.546302$）で漸化式を数値で回すと $\mathrm{P}_{1}=(0.540302,0.841471)=(\cos1,\sin1)$、$\mathrm{P}_{2}=(\cos2,\sin2)$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}_{n}$ の座標 $\left(x_{n},y_{n}\right)$ を $\alpha$ と $n$ で表す`,
          answer: String.raw`$\left(x_{n},y_{n}\right)=\left(\cos n\alpha,\ \sin n\alpha\right)$`,
          approach: String.raw`(1) で「1回の操作は角 $\alpha$ の回転」と分かったので、$n$ 回で角 $n\alpha$ の回転になる。数学的帰納法で書けばよい。`,
          blocks: [
            { k: "p", t: String.raw`$\left(x_{n},y_{n}\right)=\left(\cos n\alpha,\ \sin n\alpha\right)$ を数学的帰納法で示す。` },
            { k: "p", t: String.raw`$n=0$ のとき $\left(\cos0,\sin0\right)=(1,0)=\mathrm{P}_{0}$ で成り立つ。` },
            { k: "p", t: String.raw`$n$ で成り立つとすると、(1) の回転の式から` },
            {
              k: "math",
              t: String.raw`x_{n+1}=\cos n\alpha\cos\alpha-\sin n\alpha\sin\alpha=\cos\left(n+1\right)\alpha`,
            },
            {
              k: "math",
              t: String.raw`y_{n+1}=\cos n\alpha\sin\alpha+\sin n\alpha\cos\alpha=\sin\left(n+1\right)\alpha`,
            },
            { k: "p", t: String.raw`（加法定理）なので $n+1$ でも成り立つ。よってすべての非負整数 $n$ について` },
            { k: "math", t: String.raw`\left(x_{n},y_{n}\right)=\left(\cos n\alpha,\ \sin n\alpha\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "P_n は単位円上を角 α ずつ回っていく（図は α = 2π/7 の場合）。網かけは三角形 P_1 O P_2。",
                view: [-1.45, 1.45, -1.28, 1.28],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: [[0, 0], PT19(1), PT19(2)] },
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI, faint: true },
                  { k: "seg", a: [0, 0], b: PT19(0) },
                  { k: "seg", a: [0, 0], b: PT19(1) },
                  { k: "seg", a: [0, 0], b: PT19(2) },
                  { k: "seg", a: [0, 0], b: PT19(3) },
                  { k: "seg", a: PT19(1), b: PT19(2) },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: PT19(0), label: "P₀", place: "right" },
                  { k: "dot", at: PT19(1), label: "P₁", place: "above-right" },
                  { k: "dot", at: PT19(2), label: "P₂", place: "above" },
                  { k: "dot", at: PT19(3), label: "P₃", place: "left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\left|\mathrm{OP}_{n}\right|=1$ がすべての $n$ で成り立つ。回転なので長さが変わらない、という当たり前のことだが、(3) で効く。`,
            },
          ],
          check: String.raw`$\alpha=2$ で5回まわした結果と $\left(\cos n\alpha,\sin n\alpha\right)$ の差は最大 $5.6\times10^{-16}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{O}$ を原点とするとき、三角形 $\mathrm{P}_{n}\mathrm{OP}_{n+1}$ の面積を $k$ で表す`,
          answer: String.raw`$\dfrac{k}{1+k^{2}}$`,
          approach: String.raw`$\left|\mathrm{OP}_{n}\right|=\left|\mathrm{OP}_{n+1}\right|=1$ で、なす角は $\alpha$ である。面積は $\tfrac12\sin\alpha$ で、これを $k$ で書き直せばよい。$\sin\alpha=\dfrac{2k}{1+k^{2}}$ は (1) ですでに出ている。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $\left|\mathrm{OP}_{n}\right|=\left|\mathrm{OP}_{n+1}\right|=1$ で、$\overrightarrow{\mathrm{OP}_{n}}$ と $\overrightarrow{\mathrm{OP}_{n+1}}$ のなす角は $\alpha$（$0<\alpha<\pi$）である。よって`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{P}_{n}\mathrm{OP}_{n+1}=\frac{1}{2}\cdot1\cdot1\cdot\sin\alpha=\frac{\sin\alpha}{2}`,
            },
            { k: "p", t: String.raw`である。(1) で見たように $\sin\alpha=\dfrac{2k}{1+k^{2}}$ なので` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{P}_{n}\mathrm{OP}_{n+1}=\frac{1}{2}\cdot\frac{2k}{1+k^{2}}=\frac{k}{1+k^{2}}`,
            },
            { k: "p", t: String.raw`である。$n$ によらない。` },
            {
              k: "note",
              t: String.raw`任意の正の実数 $k$ は $k=\tan\tfrac\alpha2$（$0<\alpha<\pi$）の形に書けるので、この式は $k>0$ のすべてで成り立つ。$k=1$（$\alpha=\tfrac\pi2$）のとき面積は $\tfrac12$ で最大になり、$k\to0$ でも $k\to\infty$ でも $0$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`面積公式 $\tfrac12ab\sin\theta$ の $\sin\alpha$ を、そのまま $k$ の式に直す。$\alpha$ を残さない。`,
            String.raw`答えが $n$ によらないことを述べておくと、問題文の「$k$ を用いて表せ」に正面から答えたことになる。`,
          ],
          check: String.raw`$\alpha=2$（$k=1.557408$）で $\triangle\mathrm{P}_{1}\mathrm{OP}_{2}$ を外積で計算すると $0.454648713$、$\dfrac{k}{1+k^{2}}=0.454648713$ で一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率・整数",
      topics: ["2次方程式の整数解", "判別式と平方数", "解と係数の関係", "数え上げ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$36$ 通りを全列挙すると $x^{2}-bx+c=0$ が整数解をもつのは $(b,c)=(2,1),(3,2),(4,3),(4,4),(5,4),(5,6),(6,5)$ の7通りで $\\tfrac7{36}$",
          "$216$ 通りを全列挙すると、解がすべて整数なのは10通りで $\\tfrac{10}{216}=\\tfrac5{108}$（$a=1$ が7通り、$a=2$ が2通り、$a=3$ が1通り）",
          "少なくとも1つ整数解をもつのは18通りで $\\tfrac{18}{216}=\\tfrac1{12}$（$a=1,2,3,4,5$ でそれぞれ $7,5,3,2,1$ 通り、$a=6$ は0）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`サイコロを3回投げて出た目を順に $a,b,c$ とするとき、2次方程式 $x^{2}-bx+c=0$ が少なくとも1つ整数解をもつ確率を求める`,
          answer: String.raw`$\dfrac{7}{36}$`,
          approach: String.raw`$x^{2}-bx+c$ は**モニック**（最高次の係数が1）の整数係数なので、整数解が1つあれば解と係数の関係からもう一方も整数になる。だから「2つの正の整数 $m,m'$ で $m+m'=b\leqq6$、$mm'=c\leqq6$」を数えればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`この事象は $b,c$ だけで決まるので、$36$ 通りの $(b,c)$ で数えればよい。`,
            },
            {
              k: "p",
              t: String.raw`**両方の解が整数になる。** 整数解を $m$ とすると、もう一方の解は解と係数の関係から $b-m$ で、これも整数である。2解を $m,m'$ とすると`,
            },
            { k: "math", t: String.raw`m+m'=b,\qquad mm'=c` },
            {
              k: "p",
              t: String.raw`である。$b\geqq1$、$c\geqq1$ より和も積も正なので、$m,m'$ はどちらも正の整数である。`,
            },
            { k: "p", t: String.raw`**数える。** $m\leqq m'$ として $m+m'\leqq6$、$mm'\leqq6$ を満たす組を書き出す。` },
            {
              k: "steps",
              items: [
                String.raw`$m=1$：$m'=1,2,3,4,5$（$m'=6$ は和が $7$ で不可）。$(b,c)=(2,1),(3,2),(4,3),(5,4),(6,5)$`,
                String.raw`$m=2$：$m'=2$ で $(b,c)=(4,4)$、$m'=3$ で $(b,c)=(5,6)$。$m'=4$ は積が $8$ で不可`,
                String.raw`$m=3$：$m'=3$ は和が $6$ だが積が $9$ で不可`,
              ],
            },
            { k: "p", t: String.raw`これで7組である。$(b,c)$ はすべて相異なるので、求める確率は` },
            { k: "math", t: String.raw`\frac{7}{36}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`モニックだから「片方が整数なら両方整数」。$a$ が $1$ でない (2)(3) ではこれが使えない。`,
            String.raw`$b,c$ はどちらも $6$ 以下。和の条件と積の条件の両方で絞る。`,
          ],
          check: String.raw`$36$ 通りを全列挙すると $(b,c)=(2,1),(3,2),(4,3),(4,4),(5,4),(5,6),(6,5)$ の7通りだった。`,
        },
        {
          label: "(2)",
          task: String.raw`2次方程式 $ax^{2}-bx+c=0$ のすべての解が整数である確率を求める`,
          answer: String.raw`$\dfrac{5}{108}$`,
          approach: String.raw`2解をともに整数 $p,q$ とすると $ax^{2}-bx+c=a\left(x-p\right)\left(x-q\right)$ なので $b=a\left(p+q\right)$、$c=apq$ である。$b,c\leqq6$ から $a$ と $p+q$、$pq$ が強く縛られ、$a\leqq3$ しかありえない。`,
          blocks: [
            { k: "p", t: String.raw`2解を $p,q$（整数）とすると、因数分解して` },
            {
              k: "math",
              t: String.raw`ax^{2}-bx+c=a\left(x-p\right)\left(x-q\right)=ax^{2}-a\left(p+q\right)x+apq`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`b=a\left(p+q\right),\qquad c=apq` },
            {
              k: "p",
              t: String.raw`である。$a,b,c\geqq1$ より $p+q>0$、$pq>0$ なので $p,q$ はどちらも正の整数である。条件は`,
            },
            {
              k: "math",
              t: String.raw`a\left(p+q\right)\leqq6,\qquad apq\leqq6`,
            },
            { k: "p", t: String.raw`である。$p+q\geqq2$ なので $2a\leqq6$、つまり $a\leqq3$ である。$a$ ごとに書き出す。` },
            {
              k: "steps",
              items: [
                String.raw`$a=1$：(1) と同じ条件で7通り。$(b,c)=(2,1),(3,2),(4,3),(5,4),(6,5),(4,4),(5,6)$`,
                String.raw`$a=2$：$p+q\leqq3$ かつ $pq\leqq3$。$(p,q)=(1,1)$ で $(b,c)=(4,2)$、$(1,2)$ で $(6,4)$ の2通り`,
                String.raw`$a=3$：$p+q\leqq2$ より $(p,q)=(1,1)$ だけで $(b,c)=(6,3)$ の1通り`,
              ],
            },
            { k: "p", t: String.raw`合わせて $7+2+1=10$ 通りである。全体は $6^{3}=216$ 通りなので、求める確率は` },
            {
              k: "math",
              t: String.raw`\frac{10}{216}=\frac{5}{108}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a\neq1$ のときは「解が整数」と「$x^{2}$ の係数で割った式が整数係数」は別の話。$b=a(p+q)$、$c=apq$ という形から入るのが安全である。`,
            String.raw`$p+q\geqq2$（$p,q\geqq1$）から $a\leqq3$ が出る。$a=4,5,6$ を調べなくてよい。`,
          ],
          check: String.raw`$216$ 通りを全列挙すると、解がすべて整数なのは $(1,2,1),(1,3,2),(1,4,3),(1,4,4),(1,5,4),(1,5,6),(1,6,5),(2,4,2),(2,6,4),(3,6,3)$ の10通りだった。`,
        },
        {
          label: "(3)",
          task: String.raw`2次方程式 $ax^{2}-bx+c=0$ が少なくとも1つ整数解をもつ確率を求める`,
          answer: String.raw`$\dfrac{1}{12}$`,
          approach: String.raw`整数解を $m$ とおいて $c=m\left(b-am\right)$ と書くと、$m$ と $a$ を決めるごとに $b$ の範囲が決まる。$a$ の小さいほうから、$m=1,2,\dots$ と順に書き出して重複を取り除く。`,
          blocks: [
            { k: "p", t: String.raw`整数解を $m$ とすると $am^{2}-bm+c=0$ から` },
            { k: "math", t: String.raw`c=m\left(b-am\right)` },
            {
              k: "p",
              t: String.raw`である。$c\geqq1>0$ で、$m\leqq0$ だと $b-am\geqq b>0$ となり $m\left(b-am\right)\leqq0$ なので不適。よって $m\geqq1$ で、かつ $b>am$ である。条件は`,
            },
            {
              k: "math",
              t: String.raw`m\geqq1,\qquad am<b\leqq6,\qquad1\leqq m\left(b-am\right)\leqq6`,
            },
            { k: "p", t: String.raw`である。$a$ ごとに、$m=1,2,\dots$ と動かして $(a,b,c)$ を書き出す。` },
            {
              k: "p",
              t: String.raw`**$a=1$。** $m=1$ で $c=b-1$、$b=2,\dots,6$ から $(1,2,1),(1,3,2),(1,4,3),(1,5,4),(1,6,5)$。$m=2$ で $c=2\left(b-2\right)\leqq6$ より $b=3,4,5$ から $(1,3,2),(1,4,4),(1,5,6)$。$m=3$ で $b=4,5$ から $(1,4,3),(1,5,6)$。$m=4$ で $b=5$ から $(1,5,4)$。$m=5$ で $b=6$ から $(1,6,5)$。重複を除くと`,
            },
            {
              k: "math",
              t: String.raw`\left(1,2,1\right),\left(1,3,2\right),\left(1,4,3\right),\left(1,4,4\right),\left(1,5,4\right),\left(1,5,6\right),\left(1,6,5\right)`,
            },
            { k: "p", t: String.raw`の**7通り**である（(1) の結果と同じになる）。` },
            {
              k: "p",
              t: String.raw`**$a=2$。** $m=1$ で $c=b-2$、$b=3,\dots,6$ から $(2,3,1),(2,4,2),(2,5,3),(2,6,4)$。$m=2$ で $c=2\left(b-4\right)\leqq6$ より $b=5,6$ から $(2,5,2),(2,6,4)$。$m=3$ は $b>6$ で不可。重複を除くと`,
            },
            {
              k: "math",
              t: String.raw`\left(2,3,1\right),\left(2,4,2\right),\left(2,5,2\right),\left(2,5,3\right),\left(2,6,4\right)`,
            },
            { k: "p", t: String.raw`の**5通り**である。` },
            {
              k: "p",
              t: String.raw`**$a=3$。** $m=1$ で $b=4,5,6$ から $\left(3,4,1\right),\left(3,5,2\right),\left(3,6,3\right)$ の**3通り**（$m\geqq2$ は $b>6$ で不可）。`,
            },
            {
              k: "p",
              t: String.raw`**$a=4$。** $m=1$ で $b=5,6$ から $\left(4,5,1\right),\left(4,6,2\right)$ の**2通り**。`,
            },
            {
              k: "p",
              t: String.raw`**$a=5$。** $m=1$ で $b=6$ から $\left(5,6,1\right)$ の**1通り**。`,
            },
            {
              k: "p",
              t: String.raw`**$a=6$。** $am<b\leqq6$ より $6m<b\leqq6$ となる $b$ はない。**0通り**。`,
            },
            { k: "p", t: String.raw`合計すると` },
            { k: "math", t: String.raw`7+5+3+2+1+0=18\ \text{通り}` },
            { k: "p", t: String.raw`なので、求める確率は` },
            {
              k: "math",
              t: String.raw`\frac{18}{216}=\frac{1}{12}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(2) の10通りはこの18通りに含まれている。差の8通りは「整数解が1つだけで、もう一方は整数でない」場合で、たとえば $(a,b,c)=(2,3,1)$ では $2x^{2}-3x+1=\left(2x-1\right)\left(x-1\right)$ となり、解は $1$ と $\tfrac12$ である。`,
            },
          ],
          pitfalls: [
            String.raw`同じ $(a,b,c)$ が複数の $m$ から出てくる（たとえば $(1,5,6)$ は $m=2$ と $m=3$ の両方）。重複を必ず取り除く。`,
            String.raw`$m\geqq1$ であること（負の整数解はない）を最初に示しておくと、探索範囲が有限で済む。`,
            String.raw`$a=1$ の場合だけは (1) の答えと一致する。モニックなら「片方整数 $\Rightarrow$ 両方整数」だからである。`,
          ],
          check: String.raw`$216$ 通りを全列挙すると18通りで、$a=1,2,3,4,5,6$ ごとの内訳は $7,5,3,2,1,0$ だった。`,
        },
      ],
    },
  ],
};
