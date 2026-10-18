import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2022年度（令和4年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$\mathrm{A}\left(0,0\right)$、$\mathrm{B}\left(4,0\right)$、$\mathrm{C}\left(1,3\right)$ の場合。 */
const A22B: [number, number] = [0, 0];
const B22B: [number, number] = [4, 0];
const C22B: [number, number] = [1, 3];
const M22B: [number, number] = [(2 / 3) * 4, 0];
const N22B: [number, number] = [1 / 3, 1];
const P22B: [number, number] = [(4 / 7) * 4 + 1 / 7, 3 / 7];

/** 第3問の図。$a=1$、$b=2$ の場合。 */
const PAR22 = (x: number): number => x * x;
const OPT22 = (x: number): number => 2 * x;

export const handaiBunkei2022: SolutionSet = {
  slug: "handai-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "ベクトル",
      topics: ["内分点", "交点の位置ベクトル", "係数比較", "余弦定理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "三角形を $2$ 万個無作為に作り、$\\mathrm{BN}$ と $\\mathrm{CM}$ の交点を座標で直接求めると、つねに $\\overrightarrow{\\mathrm{AP}}=\\tfrac47\\overrightarrow{\\mathrm{AB}}+\\tfrac17\\overrightarrow{\\mathrm{AC}}$ で、$\\left|\\mathrm{AP}\\right|=\\tfrac{\\sqrt{5b^{2}+20c^{2}-4a^{2}}}{7}$ だった（違反 $0$ 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角形 $\mathrm{ABC}$ において、辺 $\mathrm{AB}$ を $2:1$ に内分する点を $\mathrm{M}$、辺 $\mathrm{AC}$ を $1:2$ に内分する点を $\mathrm{N}$ とし、線分 $\mathrm{BN}$ と線分 $\mathrm{CM}$ の交点を $\mathrm{P}$ とする。$\overrightarrow{\mathrm{AP}}$ を $\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{AP}}=\dfrac47\overrightarrow{\mathrm{AB}}+\dfrac17\overrightarrow{\mathrm{AC}}$`,
          approach: String.raw`$\mathrm{P}$ を $\mathrm{BN}$ 上・$\mathrm{CM}$ 上の2通りで表し、$\overrightarrow{\mathrm{AB}},\overrightarrow{\mathrm{AC}}$ の係数を比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec b=\overrightarrow{\mathrm{AB}}$、$\vec c=\overrightarrow{\mathrm{AC}}$ とおく。三角形なので $\vec b,\vec c$ は1次独立である。内分点は`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AM}}=\frac23\vec b,\qquad\overrightarrow{\mathrm{AN}}=\frac13\vec c`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{AM}:\mathrm{MB}=2:1$、$\mathrm{AN}:\mathrm{NC}=1:2$）。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は線分 $\mathrm{BN}$ 上にあるので、実数 $s$（$0\le s\le1$）を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AP}}=\left(1-s\right)\vec b+s\cdot\frac13\vec c=\left(1-s\right)\vec b+\frac s3\vec c`,
            },
            {
              k: "p",
              t: String.raw`と書ける。同時に $\mathrm{P}$ は線分 $\mathrm{CM}$ 上にもあるので、実数 $t$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AP}}=t\cdot\frac23\vec b+\left(1-t\right)\vec c=\frac{2t}{3}\vec b+\left(1-t\right)\vec c`,
            },
            { k: "p", t: String.raw`と書ける。1次独立性から係数を比べて` },
            {
              k: "math",
              t: String.raw`\begin{cases}1-s=\dfrac{2t}{3}\\[4pt] \dfrac s3=1-t\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。第2式から $s=3\left(1-t\right)$、これを第1式に入れると`,
            },
            {
              k: "math",
              t: String.raw`1-3+3t=\frac{2t}{3},\qquad9t-6=2t,\qquad t=\frac67`,
            },
            { k: "p", t: String.raw`であり、$s=3\left(1-\dfrac67\right)=\dfrac37$ である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AP}}=\left(1-\frac37\right)\vec b+\frac{3/7}{3}\vec c=\frac47\overrightarrow{\mathrm{AB}}+\frac17\overrightarrow{\mathrm{AC}}`,
            },
            {
              k: "p",
              t: String.raw`である（$s=\dfrac37$、$t=\dfrac67$ はどちらも $0$ と $1$ のあいだなので、$\mathrm{P}$ はたしかに線分の上にある）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "A(0, 0)、B(4, 0)、C(1, 3) の場合。M は AB を 2 : 1 に、N は AC を 1 : 2 に内分する点で、BN と CM の交点が P。AP = (4AB + AC)/7 なので、P は AB 寄りに来る。",
                view: [-0.6, 4.6, -0.6, 3.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: A22B, b: B22B },
                  { k: "seg", a: B22B, b: C22B },
                  { k: "seg", a: C22B, b: A22B },
                  { k: "seg", a: B22B, b: N22B },
                  { k: "seg", a: C22B, b: M22B },
                  { k: "dot", at: A22B, label: "A", place: "below-left" },
                  { k: "dot", at: B22B, label: "B", place: "below-right" },
                  { k: "dot", at: C22B, label: "C", place: "above" },
                  { k: "dot", at: M22B, label: "M", place: "below" },
                  { k: "dot", at: N22B, label: "N", place: "left" },
                  { k: "dot", at: P22B, label: "P", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$2:1$ に内分する点は $\dfrac23$ の位置、$1:2$ に内分する点は $\dfrac13$ の位置。片方だけ取り違えると答えが $\dfrac17\vec b+\dfrac47\vec c$ のように入れかわる。`,
            String.raw`「三角形」という条件から $\vec b,\vec c$ の1次独立が言える。これがないと係数比較ができない。`,
          ],
          check: String.raw`$2$ 万個の三角形で座標から求めた $\mathrm{P}$ と式が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`辺 $\mathrm{BC},\mathrm{CA},\mathrm{AB}$ の長さをそれぞれ $a,b,c$ とするとき、線分 $\mathrm{AP}$ の長さを $a,b,c$ で表す`,
          answer: String.raw`$\mathrm{AP}=\dfrac{\sqrt{5b^{2}+20c^{2}-4a^{2}}}{7}$`,
          approach: String.raw`$\left|\overrightarrow{\mathrm{AP}}\right|^{2}$ を展開し、$\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}$ を余弦定理で $a,b,c$ に直す。`,
          blocks: [
            { k: "p", t: String.raw`(1) の式を2乗すると` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{AP}}\right|^{2}=\frac{1}{49}\left(16\left|\vec b\right|^{2}+8\,\vec b\cdot\vec c+\left|\vec c\right|^{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\vec b\right|=\mathrm{AB}=c$、$\left|\vec c\right|=\mathrm{AC}=b$ である（文字の対応がねじれているので注意）。また $\left|\vec c-\vec b\right|=\mathrm{BC}=a$ から`,
            },
            {
              k: "math",
              t: String.raw`a^{2}=\left|\vec c\right|^{2}-2\,\vec b\cdot\vec c+\left|\vec b\right|^{2}=b^{2}+c^{2}-2\,\vec b\cdot\vec c`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\vec b\cdot\vec c=\frac{b^{2}+c^{2}-a^{2}}{2}`,
            },
            { k: "p", t: String.raw`である（これは余弦定理そのもの）。代入すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}49\left|\overrightarrow{\mathrm{AP}}\right|^{2}&=16c^{2}+4\left(b^{2}+c^{2}-a^{2}\right)+b^{2}\\ &=5b^{2}+20c^{2}-4a^{2}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}=\frac{\sqrt{5b^{2}+20c^{2}-4a^{2}}}{7}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`中身が正であることは、三角形の成立条件から出る。実際 $5b^{2}+20c^{2}-4a^{2}$ は $49\left|\overrightarrow{\mathrm{AP}}\right|^{2}$ そのものなので、$\mathrm{P}$ が存在する以上つねに正である。たとえば正三角形（$a=b=c$）なら $\sqrt{21}\,a/7=\dfrac{\sqrt{21}}{7}a$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AB}=c$、$\mathrm{AC}=b$ である。$\left|\vec b\right|=b$ と書きたくなるが逆。文字のねじれで係数 $5$ と $20$ が入れかわりやすい。`,
            String.raw`$\vec b\cdot\vec c$ を $bc\cos A$ のまま残さず、余弦定理で $a,b,c$ だけの式に直す。`,
          ],
          check: String.raw`$2$ 万個の三角形で、座標から測った $\mathrm{AP}$ と式が一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率・整数",
      topics: ["最小公倍数と最大公約数", "余事象", "素数", "確率の計算"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3,4,5$ でさいころの目の出方を全列挙すると、$L_{n}$ が素数でない確率は $\\tfrac34,\\tfrac{65}{72},\\tfrac{139}{144},\\tfrac{2561}{2592}$、$G_{n}$ が素数でない確率は $\\tfrac{25}{36},\\tfrac{61}{72},\\tfrac{1201}{1296},\\tfrac{2501}{2592}$ で、どちらも求めた式と完全に一致した",
          "$n=2$ の全列挙で $P\\left(L_{2}=5\\right)=\\tfrac1{12}$、$P\\left(G_{2}=5\\right)=\\tfrac1{36}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を $2$ 以上の自然数とし、1個のさいころを $n$ 回投げて出る目の数を順に $X_{1},\ldots,X_{n}$ とする。最小公倍数を $L_{n}$、最大公約数を $G_{n}$ とする。$L_{2}=5$ となる確率および $G_{2}=5$ となる確率を求める`,
          answer: String.raw`$P\left(L_{2}=5\right)=\dfrac1{12}$、$P\left(G_{2}=5\right)=\dfrac1{36}$`,
          approach: String.raw`$L=5$ は「2つとも $5$ の約数で、少なくとも一方が $5$」、$G=5$ は「2つとも $5$ の倍数」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1$ から $6$ までの目のうち、$5$ の約数は $1$ と $5$、$5$ の倍数は $5$ だけである。`,
            },
            {
              k: "p",
              t: String.raw`**$L_{2}=5$**。最小公倍数が $5$ になるのは、$X_{1},X_{2}$ がともに $5$ の約数（$1$ または $5$）で、かつ少なくとも一方が $5$ のときである（両方 $1$ なら $L_{2}=1$）。あてはまる組は`,
            },
            {
              k: "math",
              t: String.raw`\left(1,5\right),\ \left(5,1\right),\ \left(5,5\right)`,
            },
            { k: "p", t: String.raw`の3通りなので` },
            {
              k: "math",
              t: String.raw`P\left(L_{2}=5\right)=\frac{3}{36}=\frac1{12}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$G_{2}=5$**。最大公約数が $5$ になるには $X_{1},X_{2}$ がともに $5$ の倍数でなければならず、$1$ から $6$ では $5$ しかない。$\left(5,5\right)$ の1通りで、実際 $G_{2}=5$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`P\left(G_{2}=5\right)=\frac1{36}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$L_{2}=5$ で「両方 $1$」を除くのを忘れない。$\left(1,1\right)$ は $L_{2}=1$ である。`,
          ],
          check: String.raw`$n=2$ の全 $36$ 通りの列挙でも $\dfrac1{12}$ と $\dfrac1{36}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$L_{n}$ が素数でない確率を求める`,
          answer: String.raw`$1-\dfrac{3\left(2^{n}-1\right)}{6^{n}}=1-\dfrac{1}{3^{n-1}}+\dfrac{3}{6^{n}}$`,
          approach: String.raw`余事象。$L_{n}=p$（素数）は「すべての目が $1$ か $p$、かつ少なくとも1つが $p$」。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$L_{n}$ が素数 $p$ になる場合を数える。$L_{n}=p$ なら、すべての $X_{i}$ は $p$ の約数なので $X_{i}\in\left\{1,p\right\}$ である。逆に全部が $1$ だと $L_{n}=1$ なので、少なくとも1つが $p$ でなければならない。`,
            },
            {
              k: "p",
              t: String.raw`$1$ から $6$ までの素数は $2,3,5$ の3つである。素数 $p$ を1つ決めると、$X_{i}\in\left\{1,p\right\}$ の選び方は $2^{n}$ 通り、そのうち全部 $1$ の $1$ 通りを除いて`,
            },
            {
              k: "math",
              t: String.raw`2^{n}-1\ \text{通り}`,
            },
            {
              k: "p",
              t: String.raw`である。異なる素数どうしで重なりはない（$L_{n}$ の値が違う）ので、$L_{n}$ が素数になる場合の数は`,
            },
            {
              k: "math",
              t: String.raw`3\left(2^{n}-1\right)`,
            },
            { k: "p", t: String.raw`である。全体は $6^{n}$ 通りなので` },
            {
              k: "math",
              t: String.raw`P\left(L_{n}\ \text{が素数}\right)=\frac{3\left(2^{n}-1\right)}{6^{n}}=\frac{3\cdot2^{n}}{6^{n}}-\frac{3}{6^{n}}=\frac{1}{3^{n-1}}-\frac{3}{6^{n}}`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{3\cdot2^{n}}{6^{n}}=\dfrac{3}{3^{n}}=\dfrac{1}{3^{n-1}}$）。よって求める確率は`,
            },
            {
              k: "math",
              t: String.raw`1-\frac{3\left(2^{n}-1\right)}{6^{n}}=1-\frac{1}{3^{n-1}}+\frac{3}{6^{n}}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=2$ なら $1-\dfrac13+\dfrac1{12}=\dfrac34$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$L_{n}$ は $1$ になることもある（全部 $1$）。$1$ は素数でないので、これは「素数でない」側に入る。`,
            String.raw`$4$ は素数でないので $p$ の候補から外す。$6$ も同様。`,
          ],
          check: String.raw`$n=2,3,4,5$ の全列挙で $\dfrac34,\dfrac{65}{72},\dfrac{139}{144},\dfrac{2561}{2592}$ となり、式と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$G_{n}$ が素数でない確率を求める`,
          answer: String.raw`$1-\dfrac{3^{n}+2^{n}-2}{6^{n}}=1-\dfrac{1}{2^{n}}-\dfrac{1}{3^{n}}+\dfrac{2}{6^{n}}$`,
          approach: String.raw`$G_{n}=p$ は「すべての目が $p$ の倍数で、公約数がちょうど $p$」。$p=2,3,5$ で数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$G_{n}$ が素数 $p$ になるのは、すべての $X_{i}$ が $p$ の倍数で、かつ最大公約数が $p$ より大きくならないときである。`,
            },
            {
              k: "p",
              t: String.raw`**$p=2$**。$X_{i}\in\left\{2,4,6\right\}$ で $3^{n}$ 通り。このうち $G_{n}>2$ になるのは、全部が $4$（$G_{n}=4$）か全部が $6$（$G_{n}=6$）のときだけである。実際、$2$ が1つでも出れば $G_{n}=2$、$4$ と $6$ が混ざれば $\gcd\left(4,6\right)=2$ なのでやはり $G_{n}=2$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`3^{n}-2\ \text{通り}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$p=3$**。$X_{i}\in\left\{3,6\right\}$ で $2^{n}$ 通り。$G_{n}>3$ になるのは全部が $6$（$G_{n}=6$）のときだけなので`,
            },
            {
              k: "math",
              t: String.raw`2^{n}-1\ \text{通り}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$p=5$**。$X_{i}=5$ しかないので $1$ 通りで、$G_{n}=5$ である。`,
            },
            {
              k: "p",
              t: String.raw`$G_{n}$ の値が違うので3つの場合に重なりはない。合わせて`,
            },
            {
              k: "math",
              t: String.raw`\left(3^{n}-2\right)+\left(2^{n}-1\right)+1=3^{n}+2^{n}-2`,
            },
            { k: "p", t: String.raw`通りである。したがって` },
            {
              k: "math",
              t: String.raw`P\left(G_{n}\ \text{が素数}\right)=\frac{3^{n}+2^{n}-2}{6^{n}}=\frac{1}{2^{n}}+\frac{1}{3^{n}}-\frac{2}{6^{n}}`,
            },
            { k: "p", t: String.raw`であり、求める確率は` },
            {
              k: "math",
              t: String.raw`1-\frac{3^{n}+2^{n}-2}{6^{n}}=1-\frac{1}{2^{n}}-\frac{1}{3^{n}}+\frac{2}{6^{n}}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=2$ なら $1-\dfrac14-\dfrac19+\dfrac1{18}=\dfrac{25}{36}$ である。`,
            },
            {
              k: "note",
              t: String.raw`$P\left(G_{n}\ \text{が素数}\right)=\dfrac{1}{2^{n}}+\dfrac{1}{3^{n}}-\dfrac{2}{6^{n}}$ は「全部偶数」$\dfrac{1}{2^{n}}$ と「全部 $3$ の倍数」$\dfrac{1}{3^{n}}$ を足して、重なりと例外を引いた形になっている。包除原理で組み立てても同じ式が出る。`,
            },
          ],
          pitfalls: [
            String.raw`$p=2$ のとき「全部 $4$」「全部 $6$」を除く。$G_{n}$ が $4$ や $6$ になると素数でなくなるので、ここを落とすと $2$ 通りぶん多く数えてしまう。`,
            String.raw`$G_{n}=1$（たとえば $2$ と $3$ が混ざる）も素数でない側である。余事象で処理するほうが安全。`,
          ],
          check: String.raw`$n=2,3,4,5$ の全列挙で $\dfrac{25}{36},\dfrac{61}{72},\dfrac{1201}{1296},\dfrac{2501}{2592}$ となり、式と完全に一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分",
      topics: ["定積分の公式", "放物線と直線の面積", "判別式", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha,\\beta$ を無作為に $300$ 組とって数値積分すると、$\\int_{\\alpha}^{\\beta}\\left(x-\\alpha\\right)\\left(x-\\beta\\right)dx$ と $\\tfrac{\\left(\\alpha-\\beta\\right)^{3}}{6}$ の差はつねに $10^{-6}$ 未満だった",
          "$\\left(a,b\\right)=\\left(0,1\\right),\\left(1,2\\right),\\left(-2,5\\right),\\left(0.5,0.3\\right)$ で $S\\left(k\\right)$ を $40$ 万点走査すると、最小はそれぞれ $1.3333333,1.3333333,1.3333333,0.0149071$ で $k=2a$ のとき。$\\tfrac43\\left(b-a^{2}\\right)^{3/2}$ と小数第7位まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数 $\alpha,\beta$ に対し $\displaystyle\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=\dfrac{\left(\alpha-\beta\right)^{3}}{6}$ が成り立つことを示す`,
          answer: String.raw`$x-\alpha=u$ と置換すると $\displaystyle\int_{0}^{\beta-\alpha}u\left\{u-\left(\beta-\alpha\right)\right\}du=-\dfrac{\left(\beta-\alpha\right)^{3}}{6}=\dfrac{\left(\alpha-\beta\right)^{3}}{6}$`,
          approach: String.raw`$u=x-\alpha$ と置換し、$k=\beta-\alpha$ とおいて計算する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$u=x-\alpha$、$k=\beta-\alpha$ とおくと $x-\beta=u-k$、$dx=du$ で、$x:\alpha\to\beta$ は $u:0\to k$ に対応する。よって`,
            },
            {
              k: "math",
              t: String.raw`\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=\int_{0}^{k}u\left(u-k\right)du=\int_{0}^{k}\left(u^{2}-ku\right)du`,
            },
            { k: "p", t: String.raw`である。計算すると` },
            {
              k: "math",
              t: String.raw`\left[\frac{u^{3}}{3}-\frac{k}{2}u^{2}\right]_{0}^{k}=\frac{k^{3}}{3}-\frac{k^{3}}{2}=-\frac{k^{3}}{6}`,
            },
            { k: "p", t: String.raw`である。$-k^{3}=-\left(\beta-\alpha\right)^{3}=\left(\alpha-\beta\right)^{3}$ なので` },
            {
              k: "math",
              t: String.raw`\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx=\frac{\left(\alpha-\beta\right)^{3}}{6}`,
            },
            {
              k: "p",
              t: String.raw`である。$\alpha>\beta$ でも $\alpha=\beta$ でも、途中で大小を使っていないのでそのまま成り立つ。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$\alpha<\beta$ のときは $\left(\alpha-\beta\right)^{3}<0$ で、区間の内部では $\left(x-\alpha\right)\left(x-\beta\right)<0$ だから符号が合う。囲む面積として使うときは $\dfrac{\left(\beta-\alpha\right)^{3}}{6}$ の形（絶対値）で覚えておくとよい。`,
            },
          ],
          pitfalls: [
            String.raw`右辺は $\left(\alpha-\beta\right)^{3}$ であって $\left(\beta-\alpha\right)^{3}$ ではない。符号が逆。`,
          ],
          check: String.raw`無作為な $300$ 組で数値積分と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$a,b$ を $b>a^{2}$ をみたす定数とし、点 $\mathrm{A}\left(a,b\right)$ をとる。$\mathrm{A}$ を通り傾き $k$ の直線を $\ell$ とし、$\ell$ と放物線 $y=x^{2}$ で囲まれた部分の面積を $S\left(k\right)$ とする。$k$ が実数全体を動くとき $S\left(k\right)$ の最小値を求める`,
          answer: String.raw`$\dfrac43\left(b-a^{2}\right)^{\frac32}$（$k=2a$ のとき）`,
          approach: String.raw`交点の差が $\sqrt D$（$D$ は判別式）なので $S\left(k\right)=\dfrac{D^{3/2}}{6}$。$D$ を $k$ の2次式として最小化する。`,
          blocks: [
            { k: "p", t: String.raw`$\ell:y=k\left(x-a\right)+b$ と $y=x^{2}$ の交点の $x$ 座標は` },
            {
              k: "math",
              t: String.raw`x^{2}=k\left(x-a\right)+b,\qquad x^{2}-kx+\left(ka-b\right)=0`,
            },
            { k: "p", t: String.raw`の解である。判別式は` },
            {
              k: "math",
              t: String.raw`D=k^{2}-4\left(ka-b\right)=k^{2}-4ak+4b=\left(k-2a\right)^{2}+4\left(b-a^{2}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$b>a^{2}$ より $4\left(b-a^{2}\right)>0$ なので、$D>0$ がすべての $k$ で成り立つ。つまり $\ell$ はどんな傾きでも放物線と2点で交わる（点 $\mathrm{A}$ が放物線の上側にあるから当然である）。`,
            },
            {
              k: "p",
              t: String.raw`2解を $\alpha<\beta$ とすると $\beta-\alpha=\sqrt D$ である。$\alpha<x<\beta$ では直線が放物線の上にあるので`,
            },
            {
              k: "math",
              t: String.raw`S\left(k\right)=\int_{\alpha}^{\beta}\left\{k\left(x-a\right)+b-x^{2}\right\}dx=-\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(x-\beta\right)dx`,
            },
            { k: "p", t: String.raw`であり、(1) より` },
            {
              k: "math",
              t: String.raw`S\left(k\right)=-\frac{\left(\alpha-\beta\right)^{3}}{6}=\frac{\left(\beta-\alpha\right)^{3}}{6}=\frac{D^{\frac32}}{6}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$u\mapsto u^{3/2}$ は $u>0$ で増加なので、$S\left(k\right)$ が最小になるのは $D$ が最小になるときである。$D=\left(k-2a\right)^{2}+4\left(b-a^{2}\right)$ は $k=2a$ で最小値 $4\left(b-a^{2}\right)$ をとる。したがって`,
            },
            {
              k: "math",
              t: String.raw`S_{\min}=\frac{\left\{4\left(b-a^{2}\right)\right\}^{\frac32}}{6}=\frac{8\left(b-a^{2}\right)^{\frac32}}{6}=\frac43\left(b-a^{2}\right)^{\frac32}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1、b = 2 の場合。面積を最小にするのは傾き k = 2a = 2 の直線（放物線の x = a における接線と同じ傾き）で、このとき交点は x = 0 と x = 2、面積は 4/3。点線は k = 0 の場合で、囲む部分はもっと広くなる。",
                view: [-2.3, 3.3, -0.6, 4.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: OPT22, bottom: PAR22, from: 0, to: 2 },
                  { k: "curve", f: PAR22, from: -2.0, to: 2.05 },
                  { k: "seg", a: [-0.3, OPT22(-0.3)], b: [3.0, OPT22(3.0)] },
                  { k: "seg", a: [-2.3, 2], b: [3.3, 2], dash: true, faint: true },
                  { k: "dot", at: [1, 2], label: "A(a, b)", place: "above-left" },
                  { k: "dot", at: [0, 0], label: "(0, 0)", place: "below-left" },
                  { k: "dot", at: [2, 4], label: "(2, 4)", place: "left" },
                  { k: "text", at: [1.3, OPT22(1.3)], label: "k = 2a", place: "above-left" },
                  { k: "text", at: [-2.2, 2], label: "k = 0", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`最小を与える $k=2a$ は、放物線 $y=x^{2}$ の $x=a$ における接線の傾き $2a$ と同じである。つまり「$\mathrm{A}$ の真下の接点での接線と平行に引く」のが最善で、$a$ の位置だけで決まり $b$ にはよらない。$b$ は最小値の大きさ $\dfrac43\left(b-a^{2}\right)^{3/2}$（$\mathrm{A}$ が放物線から離れるほど大きい）にだけ効く。`,
            },
          ],
          pitfalls: [
            String.raw`$S\left(k\right)=\dfrac{D^{3/2}}{6}$ の $\dfrac32$ 乗は単調増加なので、$D$ の最小を探せばよい。$D$ を求めずに $S$ を直接微分すると面倒。`,
            String.raw`$b>a^{2}$（$\mathrm{A}$ が放物線の上側）がないと $D>0$ が保証されず、交わらない $k$ が出てしまう。`,
            String.raw`$\left(b-a^{2}\right)^{3/2}$ は $\left(b-a^{2}\right)\sqrt{b-a^{2}}$ と書いてもよい。指数の形に慣れていなければこちらで。`,
          ],
          check: String.raw`$4$ 通りの $\left(a,b\right)$ で $40$ 万点の走査と式が小数第7位まで一致し、最小は毎回 $k=2a$ だった。`,
        },
      ],
    },
  ],
};
