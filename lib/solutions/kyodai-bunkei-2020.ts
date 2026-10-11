import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2020年度（令和2年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第5問には問題冊子にマス目の例の図が付いているが、こちらでは一切再現していない。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第1問の図。 */
const CV = (x: number) => Math.abs(x) * x - 3 * x + 1;
const LN = (x: number) => x - 3;
/** もう一方の交点。 */
const XB = -2 - 2 * Math.SQRT2;

/** 第2問の図。p = -1/4 のときの直交する放物線。 */
const SQ = (x: number) => x * x;
const GP = (x: number) => -0.25 * x * x + 1.25;

/** 第4問の図。a-b に垂直な平面で切った断面に現れる点。 */
const KK = (3 * Math.SQRT2 - Math.sqrt(6)) / 8;
const CY = -1 / Math.SQRT2;
const CZ = 1 / Math.SQRT2;
const DY = (2 * KK) / Math.sqrt(3);
const DZ = 1 / Math.SQRT2 + (2 * KK) / Math.sqrt(3);
const MY = Math.sqrt(3) / 2;

export const kyodaiBunkei2020: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["絶対値を含む関数", "接する条件", "判別式", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=-3$ のとき $x=2$ で $C$ と $\\ell$ の値がどちらも $-1$ になり接することを確かめた",
          "もう一方の交点が $x=-2-2\\sqrt2=-4.828427$ で、値がどちらも $-7.828427$ になることを確かめた",
          "囲まれた部分の面積を $400$ 万点の数値積分で求めると $31.084944665$ となり、$\\frac{48+32\\sqrt2}{3}=31.084944665$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$C:y=|x|x-3x+1$ と $\ell:y=x+a$（$a<0$）が接する $a$ を求め、$C$ と $\ell$ で囲まれた部分の面積を求める`,
          answer: String.raw`$a=-3$、面積は $\dfrac{48+32\sqrt2}{3}$`,
          approach: String.raw`$|x|x$ は $x\ge0$ で $x^{2}$、$x<0$ で $-x^{2}$ なので、$C$ は2つの放物線をつないだ曲線である。枝ごとに「接する」＝判別式 $0$ で $a$ の候補を出し、接点がその枝にあるかを確かめる。面積は、接しているほうの差が完全平方になるので軽く計算できる。`,
          blocks: [
            { k: "p", t: String.raw`$C$ は` },
            {
              k: "math",
              t: String.raw`y=\begin{cases}x^{2}-3x+1&(x\ge0)\\[1mm]-x^{2}-3x+1&(x<0)\end{cases}`,
            },
            { k: "p", t: String.raw`である（$x=0$ でつながり、傾きも $-3$ で一致する）。` },
            {
              k: "p",
              t: String.raw`**接する $a$ を探す。** $x\ge0$ の枝で $x^{2}-3x+1=x+a$ とすると`,
            },
            { k: "math", t: String.raw`x^{2}-4x+(1-a)=0` },
            {
              k: "p",
              t: String.raw`で、判別式 $16-4(1-a)=0$ より $a=-3$。このとき $x=2\ (\ge0)$ で、確かにこの枝の上である。$a=-3<0$ も条件をみたす。`,
            },
            {
              k: "p",
              t: String.raw`$x<0$ の枝で $-x^{2}-3x+1=x+a$ とすると $x^{2}+4x+(a-1)=0$ で、判別式 $16-4(a-1)=0$ より $a=5$。これは $a<0$ に反するので不適である。よって`,
            },
            { k: "math", t: String.raw`a=-3` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**交点をすべて求める。** $a=-3$、$\ell:y=x-3$ とする。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x\ge0$：$x^{2}-4x+4=(x-2)^{2}=0$ より $x=2$（接点）。`,
                String.raw`$x<0$：$x^{2}+4x-4=0$ より $x=-2\pm2\sqrt2$。$-2+2\sqrt2=0.83>0$ は枝の外なので不適、$x=-2-2\sqrt2$ だけが交点。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\beta=-2-2\sqrt2$ とおく。$\beta\le x\le2$ では $C$ が $\ell$ の上側にある。実際`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x\ge0&:\;\left(x^{2}-3x+1\right)-(x-3)=(x-2)^{2}\ge0\\[1mm]
x<0&:\;\left(-x^{2}-3x+1\right)-(x-3)=-\left(x^{2}+4x-4\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、後者は $\beta<x<-2+2\sqrt2$ で正である。`,
            },
            { k: "p", t: String.raw`**面積。** ` },
            {
              k: "math",
              t: String.raw`S=\int_{\beta}^{0}\left(-x^{2}-4x+4\right)dx+\int_{0}^{2}(x-2)^{2}dx`,
            },
            { k: "p", t: String.raw`である。後ろは` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2}(x-2)^{2}dx=\left[\frac{(x-2)^{3}}{3}\right]_{0}^{2}=\frac83`,
            },
            {
              k: "p",
              t: String.raw`である。前は、$\beta^{2}=12+8\sqrt2$、$\beta^{3}=-56-40\sqrt2$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_{\beta}^{0}\left(-x^{2}-4x+4\right)dx&=\left[-\frac{x^{3}}{3}-2x^{2}+4x\right]_{\beta}^{0}=\frac{\beta^{3}}{3}+2\beta^{2}-4\beta\\[1mm]
&=\frac{-56-40\sqrt2}{3}+\left(24+16\sqrt2\right)+\left(8+8\sqrt2\right)\\[1mm]
&=\frac{-56-40\sqrt2+96+72\sqrt2}{3}=\frac{40+32\sqrt2}{3}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。合わせて` },
            {
              k: "math",
              t: String.raw`S=\frac{40+32\sqrt2}{3}+\frac83=\frac{48+32\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`である（$31.08$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$C:y=|x|x-3x+1$ と $\ell:y=x-3$。$x=2$ で接し、$x=-2-2\sqrt2=-4.83$ で交わる。囲まれた部分の面積は $\frac{48+32\sqrt2}{3}=31.08$。`,
                view: [-5.7, 3.7, -9.2, 4.6],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fillBetween", top: CV, bottom: LN, from: XB, to: 2 },
                  { k: "curve", f: CV, from: -5.4, to: 3.4 },
                  { k: "seg", a: [-5.6, LN(-5.6)], b: [3.6, LN(3.6)], dash: true },
                  { k: "dot", at: [2, -1], label: "接点 (2, -1)", place: "right" },
                  { k: "dot", at: [XB, LN(XB)], label: "x = -2-2√2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$|x|x$ は $x^{2}$ ではない。$x<0$ では $-x^{2}$ になるので、枝ごとに分けて考える。`,
            String.raw`判別式から出た $a$ について、接点がその枝の範囲にあるかを必ず確かめる。$a=5$ は $a<0$ でも弾けるが、範囲外の接点が出る場合もある。`,
            String.raw`$x<0$ の枝との交点は2つ出るが、片方は $x>0$ なので枝の外である。式の上の解をすべて採用しない。`,
            String.raw`$\beta=-2-2\sqrt2$ の3乗を使うので、$\beta^{2}=12+8\sqrt2$ を先に出しておくと計算が整理される。`,
          ],
          check: String.raw`$a=-3$ のとき $x=2$ で $C$ も $\ell$ も $-1$、$x=-2-2\sqrt2=-4.828427$ でどちらも $-7.828427$ になる。囲まれた部分の面積を $400$ 万点の数値積分で求めると $31.084944665$ で、$\frac{48+32\sqrt2}{3}=31.084944665$ と一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["接線の傾き", "直交条件", "2次方程式の係数比較", "すべて求める"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "族1（$q=0$、$p<0$、$r=\\frac{p-1}{4p}$）について $p=-\\frac14,-\\frac12,-1,-2,-5$ で、2つの共有点の両方で接線の傾きの積が $-1$ になることを確かめた",
          "族2（$p=-1$、$r=\\frac12$、$q$ 任意）について $q=0,\\frac12,2,-3$ で同じことを確かめた",
          "条件を外した $(p,q,r)=(-1,2,0.4),(0.5,0,-0.25),(-2,1,0.375),(2,0,0.125)$ ではいずれも成り立たないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`グラフが $y=x^{2}$ のグラフと2点で直交する2次関数をすべて求める`,
          answer: String.raw`$y=px^{2}+\dfrac{p-1}{4p}$（$p<0$）、および $y=-x^{2}+qx+\dfrac12$（$q$ は任意の実数）`,
          approach: String.raw`$y=px^{2}+qx+r$ とおく。共有点の $x$ 座標は「2つの式を等しいとおいた2次方程式」の解、直交条件は「傾きの積が $-1$」というもう1本の2次方程式の解である。2点とも直交するということは、この2本の2次方程式が同じ2解をもつ、つまり係数が比例するということになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`求める2次関数を $g(x)=px^{2}+qx+r$（$p\ne0$）とする。共有点の $x$ 座標を $t$ とすると`,
            },
            {
              k: "math",
              t: String.raw`t^{2}=pt^{2}+qt+r\quad\Longleftrightarrow\quad(1-p)t^{2}-qt-r=0\qquad\cdots\;①`,
            },
            {
              k: "p",
              t: String.raw`である。また $y=x^{2}$ の $t$ での接線の傾きは $2t$、$g$ のほうは $2pt+q$ で、直交条件は`,
            },
            {
              k: "math",
              t: String.raw`2t\left(2pt+q\right)=-1\quad\Longleftrightarrow\quad4pt^{2}+2qt+1=0\qquad\cdots\;②`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**2本が同じ2解をもつ条件。** ② は $4p\ne0$ より2次式で、解は高々2個である。「2点で直交する」とは、① の解がちょうど2個あり、そのどちらも ② をみたすということである。`,
            },
            {
              k: "p",
              t: String.raw`$1-p=0$ だと ① は1次以下になり解が2個にならない（$q=r=0$ なら同じ放物線になって共有点が無数）。よって $p\ne1$ で、① も2次式である。2次式どうしが同じ2解をもつので、係数が比例する。比例定数を $\lambda$ として`,
            },
            {
              k: "math",
              t: String.raw`(1-p,\;-q,\;-r)=\lambda\left(4p,\;2q,\;1\right)`,
            },
            { k: "p", t: String.raw`である。第3成分から $\lambda=-r$ で、残り2本は` },
            {
              k: "math",
              t: String.raw`1-p=-4pr,\qquad -q=-2qr`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`r=\frac{p-1}{4p},\qquad q\left(2r-1\right)=0`,
            },
            { k: "p", t: String.raw`となる。ここで` },
            {
              k: "math",
              t: String.raw`2r-1=\frac{p-1}{2p}-1=\frac{-p-1}{2p}`,
            },
            { k: "p", t: String.raw`なので、$2r-1=0$ は $p=-1$ と同値である。よって条件は` },
            {
              k: "math",
              t: String.raw`r=\frac{p-1}{4p}\quad\text{かつ}\quad\left(q=0\ \text{または}\ p=-1\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解が2個あるための条件。** ① の判別式は、$r=\dfrac{p-1}{4p}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`q^{2}+4(1-p)r=q^{2}-\frac{(1-p)^{2}}{p}`,
            },
            {
              k: "p",
              t: String.raw`である。$p>0$ の場合、$q=0$ か $p=-1$ のうち使えるのは $q=0$ だけで、そのとき判別式は $-\dfrac{(1-p)^{2}}{p}<0$（$p\ne1$）となり不適。$p<0$ なら $-\dfrac{(1-p)^{2}}{p}>0$ なので、$q$ が何であれ判別式は正である。したがって $p<0$ が必要十分である。`,
            },
            { k: "p", t: String.raw`**まとめ。** 求める2次関数は` },
            {
              k: "math",
              t: String.raw`y=px^{2}+\frac{p-1}{4p}\quad(p<0)\qquad\text{および}\qquad y=-x^{2}+qx+\frac12\quad(q\in\mathbb{R})`,
            },
            {
              k: "p",
              t: String.raw`である（$p=-1$、$q=0$ のときは両方に現れる同じ関数 $y=-x^{2}+\dfrac12$ である）。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$p=-\frac14$ の例。$y=x^{2}$ と $y=-\frac14x^{2}+\frac54$ は $(\pm1,1)$ で交わり、そこでの接線の傾きは $2$ と $-\frac12$（破線）で積が $-1$ になる。`,
                view: [-2.3, 2.3, -0.5, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: SQ, from: -1.5, to: 1.5 },
                  { k: "curve", f: GP, from: -2.2, to: 2.2 },
                  { k: "seg", a: [0.3, -0.4], b: [1.5, 2.0], dash: true },
                  { k: "seg", a: [0.0, 1.5], b: [2.1, 0.45], dash: true },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "right" },
                  { k: "dot", at: [-1, 1], label: "(-1, 1)", place: "left" },
                  { k: "text", at: [1.5, SQ(1.5)], label: "y = x^2", place: "right" },
                  { k: "text", at: [-2.2, GP(-2.2)], label: "y = g(x)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「2点で直交する」は、共有点が2個あって**そのどちらでも**接線が直交する、ということである。1点だけ直交すればよいと読むと答えが大きく変わる。`,
            String.raw`② から $t=0$ は解になりえない（$1=0$ になる）。つまり共有点は原点ではない。`,
            String.raw`$p=1$（$x^{2}$ の係数が同じ）だと共有点は高々1個で、条件をみたさない。$p=1$ を除く理由を書いておく。`,
            String.raw`答えが2つの族に分かれる。$q=0$ の族だけ、あるいは $p=-1$ の族だけで終わらないよう、$q(2r-1)=0$ の2通りを両方たどる。`,
          ],
          check: String.raw`$p=-\frac14$ なら $r=\frac{-\frac54}{-1}=\frac54$ で $g(x)=-\frac14x^{2}+\frac54$。共有点は $x=\pm1$ で、$x=1$ では傾きが $2$ と $-\frac12$、$x=-1$ では $-2$ と $\frac12$ となり、どちらも積が $-1$ である。$p=-1$、$q=2$、$r=\frac12$ でも、共有点 $x=\frac{1\pm\sqrt2}{2}$ の両方で積が $-1.0000$ になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["合同式", "16を法とする", "平方数の余り", "場合分け"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1,3,5,\\dots,31$ のそれぞれについて $0\\le m,n\\le31$ を全探索すると、$f(m,n)$ が $16$ で割り切れる $(m,n)$ が存在するのは $a\\equiv3\\pmod4$ のときだけで、そのとき $(m,n)=(2,2)$ が実際に解になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a$ を奇数とし $f(m,n)=mn^{2}+am^{2}+n^{2}+8$ とするとき、$f(m,n)$ が $16$ で割り切れる整数の組 $(m,n)$ が存在する $a$ の条件を求める`,
          answer: String.raw`$a\equiv3\pmod4$（$a$ は $4$ で割ると $3$ 余る奇数）`,
          approach: String.raw`$f(m,n)=n^{2}(m+1)+am^{2}+8$ とまとめる。まず $m$ の偶奇で絞り、さらに $m$ を $4$ で割った余りで絞ると、残るのは「$n^{2}(m+1)$ が $16$ を法としてどんな値をとれるか」という問題になる。平方数が $16$ を法として $0,1,4,9$ しかとらないことが効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(m,n)=n^{2}(m+1)+am^{2}+8$ とまとめる。以下 $16$ を法として考える。`,
            },
            {
              k: "p",
              t: String.raw`**$m$ は偶数でなければならない。** $m$ が奇数なら $m+1$ は偶数なので $n^{2}(m+1)$ は偶数、$am^{2}$ は（$a$ も $m$ も奇数なので）奇数である。よって $f$ は奇数となり、$16$ の倍数にはなりえない。`,
            },
            {
              k: "p",
              t: String.raw`**$m\equiv2\pmod4$ でなければならない。** $m=2k$ とすると $am^{2}=4ak^{2}$ で、$m+1=2k+1$ は奇数である。`,
            },
            {
              k: "p",
              t: String.raw`$k$ が偶数なら $k^{2}$ は $4$ の倍数だから $4ak^{2}\equiv0\pmod{16}$ で`,
            },
            { k: "math", t: String.raw`f\equiv n^{2}(m+1)+8\pmod{16}` },
            {
              k: "p",
              t: String.raw`となる。$m+1$ は奇数なので $16$ を法として逆数をもち、$f\equiv0$ は $n^{2}\equiv-8\cdot(m+1)^{-1}\equiv8\pmod{16}$（奇数倍しても $8$ は $8$ のまま）を意味する。ところが平方数を $16$ で割った余りは $0,1,4,9$ のいずれかで $8$ にならない。よって $k$ は奇数、すなわち $m\equiv2\pmod4$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$a$ の条件を出す。** $k$ が奇数なら $k^{2}\equiv1\pmod8$ なので $4ak^{2}\equiv4a\pmod{16}$ である。したがって条件は`,
            },
            {
              k: "math",
              t: String.raw`n^{2}(m+1)\equiv-4a-8\pmod{16}`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $u=m+1$ は $m\equiv2\pmod4$ より $u\equiv3\pmod4$ である。$n^{2}\in\{0,1,4,9\}$ として $n^{2}u$ を $16$ で割った余りを調べると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n^{2}\equiv0$：$n^{2}u\equiv0$。`,
                String.raw`$n^{2}\equiv1$：$n^{2}u\equiv u\in\{3,7,11,15\}$。`,
                String.raw`$n^{2}\equiv4$：$4u$ は $u\equiv3\pmod4$ より $4u\equiv12$（$u=3,7,11,15$ のいずれでも $12$）。`,
                String.raw`$n^{2}\equiv9$：$9u\in\{11,15,3,7\}$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので、$n^{2}u$ のとりうる値は $\{0,3,7,11,12,15\}$ である。いっぽう右辺は、$a$ が奇数なので`,
            },
            {
              k: "math",
              t: String.raw`-4a-8\equiv\begin{cases}4&\left(a\equiv1\pmod4\right)\\[1mm]12&\left(a\equiv3\pmod4\right)\end{cases}\pmod{16}`,
            },
            {
              k: "p",
              t: String.raw`である。$4$ は $\{0,3,7,11,12,15\}$ に入っていないので $a\equiv1\pmod4$ では解がなく、$12$ は入っているので $a\equiv3\pmod4$ では解がある。よって求める条件は`,
            },
            { k: "math", t: String.raw`a\equiv3\pmod4` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a\equiv3\pmod4$ のとき、たとえば $(m,n)=(2,2)$ が解になる。実際 $f(2,2)=2\cdot4+4a+4+8=4a+20$ で、$a=4j+3$ なら $4a+20=16j+32$ となり $16$ の倍数である。`,
            },
          ],
          pitfalls: [
            String.raw`平方数を $16$ で割った余りが $0,1,4,9$ だけであることが2回効く。$n^{2}\equiv8$ が不可能、というのが最初の絞り込みである。`,
            String.raw`$m$ が偶数というだけでは足りない。$m\equiv0\pmod4$ だと $am^{2}$ の項が消えてしまい、やはり $n^{2}\equiv8$ が必要になって詰む。`,
            String.raw`奇数 $k$ について $k^{2}\equiv1\pmod8$ を使う。$\pmod{16}$ では $k^{2}\equiv1$ または $9$ だが、$4$ を掛けると差が $32$ の倍数になって消えるので $4ak^{2}\equiv4a$ でよい。`,
            String.raw`「存在するための条件」なので、$a\equiv3\pmod4$ のときに実際に $(m,n)$ を1つ挙げておくと答案が完結する。`,
          ],
          check: String.raw`$a=1,3,5,\dots,31$ のそれぞれで $0\le m,n\le31$ を全探索すると、$f(m,n)$ が $16$ の倍数になる $(m,n)$ が存在するのは $a=3,7,11,15,19,23,27,31$、つまり $a\equiv3\pmod4$ のときだけで、いずれも $(m,n)=(2,2)$ が解になった。$a=3$ なら $f(2,2)=32$ である。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["内積", "対称性", "単位球面", "2次方程式"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$k=\\frac{3\\sqrt2-\\sqrt6}{8}=0.224143868$ として座標を作ると、$|\\vec a|=|\\vec b|=|\\vec c|=|\\vec d|=1$、$\\vec a\\cdot\\vec b=\\vec c\\cdot\\vec d=0.5$、$\\vec a\\cdot\\vec c=\\vec b\\cdot\\vec c=-0.612372436=-\\frac{\\sqrt6}{4}$、$\\vec a\\cdot\\vec d=\\vec b\\cdot\\vec d=0.224143868=k$ となり、条件をすべてみたすことを確かめた",
          "$16k^{2}+4\\sqrt6\\,k-3=0$ が成り立つことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`単位球面上の4点が与えられた内積の関係をみたすとき、$k=\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OD}}=\overrightarrow{\mathrm{OB}}\cdot\overrightarrow{\mathrm{OD}}$ を求める`,
          answer: String.raw`$k=\dfrac{3\sqrt2-\sqrt6}{8}$`,
          approach: String.raw`$\vec c$ も $\vec d$ も $\vec a,\vec b$ と**同じ**内積をもつので、どちらも $\vec a-\vec b$ と直交する。つまり $\vec c,\vec d$ は $\vec a-\vec b$ に垂直な平面の中にある。この平面を座標平面にとってしまえば、あとは平面上の単位ベクトル2本の話になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a,\vec b,\vec c,\vec d$ を $\overrightarrow{\mathrm{OA}},\dots,\overrightarrow{\mathrm{OD}}$ とする。すべて単位ベクトルである。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec c,\vec d$ は $\vec a-\vec b$ に垂直。** 条件より $\vec a\cdot\vec c=\vec b\cdot\vec c$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left(\vec a-\vec b\right)\cdot\vec c=0,\qquad\text{同様に}\quad\left(\vec a-\vec b\right)\cdot\vec d=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**座標を置く。** $\left|\vec a-\vec b\right|^{2}=1+1-2\cdot\dfrac12=1$ なので $\vec f=\vec a-\vec b$ は単位ベクトルである。また $\vec e=\dfrac{\vec a+\vec b}{\left|\vec a+\vec b\right|}$ とおくと $\left|\vec a+\vec b\right|^{2}=3$ より $\vec e=\dfrac{\vec a+\vec b}{\sqrt3}$ で、$\vec e\cdot\vec f=0$ である。$\vec f,\vec e$ と、両方に垂直な単位ベクトル $\vec g$ を座標軸にとると`,
            },
            {
              k: "math",
              t: String.raw`\vec a=\left(\frac12,\;\frac{\sqrt3}{2},\;0\right),\qquad\vec b=\left(-\frac12,\;\frac{\sqrt3}{2},\;0\right)`,
            },
            {
              k: "p",
              t: String.raw`であり、$\vec c,\vec d$ は第1成分が $0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec c$ を決める。** $\vec c=(0,c_2,c_3)$、$c_2^{2}+c_3^{2}=1$ である。$\vec a\cdot\vec c=\dfrac{\sqrt3}{2}c_2=-\dfrac{\sqrt6}{4}$ より`,
            },
            {
              k: "math",
              t: String.raw`c_2=-\frac{\sqrt6}{4}\cdot\frac{2}{\sqrt3}=-\frac{1}{\sqrt2},\qquad c_3=\pm\frac{1}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`である。$\vec g$ の向きを選んで $c_3=\dfrac{1}{\sqrt2}$ としてよい。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec d$ を決める。** $\vec d=(0,d_2,d_3)$ で、$\vec a\cdot\vec d=\dfrac{\sqrt3}{2}d_2=k$ より $d_2=\dfrac{2k}{\sqrt3}$ である。$\vec c\cdot\vec d=\dfrac12$ より`,
            },
            {
              k: "math",
              t: String.raw`-\frac{1}{\sqrt2}\cdot\frac{2k}{\sqrt3}+\frac{1}{\sqrt2}d_3=\frac12\quad\Longrightarrow\quad d_3=\frac{1}{\sqrt2}+\frac{2k}{\sqrt3}`,
            },
            { k: "p", t: String.raw`である。$\left|\vec d\right|=1$ に入れると` },
            {
              k: "math",
              t: String.raw`\frac{4k^{2}}{3}+\left(\frac{1}{\sqrt2}+\frac{2k}{\sqrt3}\right)^{2}=1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{8k^{2}}{3}+\frac{4k}{\sqrt6}-\frac12=0\quad\Longleftrightarrow\quad16k^{2}+4\sqrt6\,k-3=0`,
            },
            { k: "p", t: String.raw`である。解くと` },
            {
              k: "math",
              t: String.raw`k=\frac{-4\sqrt6\pm\sqrt{96+192}}{32}=\frac{-4\sqrt6\pm12\sqrt2}{32}=\frac{-\sqrt6\pm3\sqrt2}{8}`,
            },
            { k: "p", t: String.raw`で、$k>0$ より` },
            { k: "math", t: String.raw`k=\frac{3\sqrt2-\sqrt6}{8}` },
            { k: "p", t: String.raw`である（$0.2241$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\vec a-\vec b$ に垂直な平面で切った断面。横軸が $\vec e=\frac{\vec a+\vec b}{\sqrt3}$ の向き。$\vec c,\vec d$ はこの平面内の単位ベクトルで、$\vec a,\vec b$ はどちらも点 $\mathrm{M}\left(\frac{\sqrt3}{2},0\right)$ に射影される。$\vec c$ と $\vec d$ のなす角は $60^\circ$。`,
                view: [-1.45, 1.45, -1.25, 1.2],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (th: number): [number, number] => [Math.cos(th), Math.sin(th)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0, 0], b: [CY, CZ] },
                  { k: "seg", a: [0, 0], b: [DY, DZ] },
                  { k: "seg", a: [0, 0], b: [MY, 0], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [CY, CZ], label: "c", place: "above-left" },
                  { k: "dot", at: [DY, DZ], label: "d", place: "above-right" },
                  { k: "dot", at: [MY, 0], label: "M", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\vec a\cdot\vec c=\vec b\cdot\vec c$ を「$\vec c$ が $\vec a,\vec b$ と同じ角をなす」で止めず、$\left(\vec a-\vec b\right)\cdot\vec c=0$ という**垂直**の形にすると、座標を置く方針がはっきりする。`,
            String.raw`$c_3$ の符号は、座標軸の向きの選び方で決まる自由度である。どちらにとっても $k$ の方程式は同じになる。`,
            String.raw`$16k^{2}+4\sqrt6k-3=0$ の2解のうち負のほうは $k>0$ で捨てる。$\sqrt{288}=12\sqrt2$ の計算に注意する。`,
            String.raw`4点が実際にこの条件で存在することは、$k$ を代入して $\left|\vec d\right|=1$ を確かめれば分かる。問題は $k$ を求めよなので必須ではないが、検算になる。`,
          ],
          check: String.raw`$k=\frac{3\sqrt2-\sqrt6}{8}=0.224143868$ として座標を作ると、4本とも長さ $1$ で、$\vec a\cdot\vec b=\vec c\cdot\vec d=0.500000000$、$\vec a\cdot\vec c=\vec b\cdot\vec c=-0.612372436=-\frac{\sqrt6}{4}$、$\vec a\cdot\vec d=\vec b\cdot\vec d=0.224143868=k$ となり、条件をすべてみたす。`,
        },
      ],
    },
    {
      no: 5,
      field: "場合の数",
      topics: ["ラテン方陣", "完全順列", "置換の型", "場合分け"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$4$ 行すべてを全探索して数えると、条件をみたす入れ方は $576$ 通りだった",
          "1行目を固定したときの内訳が「2行目が $(2,2)$ 型の $3$ 通り×各 $4$ 通り」と「$4$ 項環状型の $6$ 通り×各 $2$ 通り」で合計 $24$ 通りになることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$4\times4$ のマス目に $1,2,3,4$ を入れ、どの行にもどの列にも同じ数字が1回しか現れないようにする入れ方の総数を求める`,
          answer: String.raw`$576$ 通り`,
          approach: String.raw`各行は $1,2,3,4$ の並べ替えになる。1行目は $4!$ 通り、2行目は1行目と同じ列に同じ数字が来てはいけないので「完全順列」になる。3行目以降の数は、2行目の「ずれ方」の型（2つの入れ替えか、4つの巡回か）で変わるので、そこで場合分けする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`どの行にも $1,2,3,4$ が1回ずつ現れるので、各行は $1,2,3,4$ の並べ替えである。`,
            },
            { k: "p", t: String.raw`**1行目。** $4!=24$ 通り。以下、1行目を固定して数え、最後に $24$ を掛ける。` },
            {
              k: "p",
              t: String.raw`**2行目。** どの列でも1行目と違う数字が来るので、2行目は1行目に対する完全順列（どの位置も動く並べ替え）である。$4$ 個の完全順列は $9$ 通りで、その内訳は`,
            },
            {
              k: "steps",
              items: [
                String.raw`2つずつ入れ替える型（たとえば $1234\to2143$）：$4$ 個を2組のペアに分ける分け方で $3$ 通り。`,
                String.raw`$4$ つが順に回る型（たとえば $1234\to2341$）：$3!=6$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`である（$3+6=9$）。` },
            {
              k: "p",
              t: String.raw`**3・4行目。** 各列には、1行目と2行目で使った数字以外の2つが残る。3行目はその残り2つから1つずつ選んで並べ替えになるようにし、4行目は自動的に決まる。`,
            },
            {
              k: "p",
              t: String.raw`1行目を $1,2,3,4$ として型ごとに数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`**2つずつ入れ替える型**（例：2行目が $2,1,4,3$）。各列の残りは左から $\{3,4\},\{3,4\},\{1,2\},\{1,2\}$ である。3行目は左2列に $3,4$ を並べ（$2$ 通り）、右2列に $1,2$ を並べる（$2$ 通り）ので $4$ 通り。4行目は残りで決まる。よって $3\times4=12$ 通り。`,
                String.raw`**$4$ つが順に回る型**（例：2行目が $2,3,4,1$）。各列の残りは $\{3,4\},\{1,4\},\{1,2\},\{2,3\}$ である。1列目に $3$ を置くと4列目は $2$、3列目は $1$、2列目は $4$ と順に決まり $3,4,1,2$。$4$ を置くと $4,1,2,3$。よって $2$ 通りで、$6\times2=12$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`1行目を固定したときの総数は $12+12=24$ 通りである。したがって全体は`,
            },
            { k: "math", t: String.raw`24\times24=576` },
            { k: "p", t: String.raw`通りである。` },
            {
              k: "note",
              t: String.raw`$n\times n$ でこのような入れ方の総数は「ラテン方陣の個数」と呼ばれ、$n=4$ では $576$ である。$n=5$ では $161280$ と急に増え、一般の公式は知られていない。`,
            },
          ],
          pitfalls: [
            String.raw`2行目が1行目の完全順列になることは「列ごとに違う」から従う。$9$ という数は $4$ 個の完全順列の個数で、$3!=6$ ではない。`,
            String.raw`完全順列の型で3・4行目の数が変わる（$4$ 通りと $2$ 通り）。型を分けずに一律に掛けると答えがずれる。`,
            String.raw`4行目は3行目まで決めれば自動的に決まる。ここでさらに掛けないこと。`,
            String.raw`問題は「マス目に数字を入れる」ことを数えているので、回転や裏返しで移り合うものも別に数える。`,
          ],
          check: String.raw`$4$ 行すべてを全探索して数えると $576$ 通りだった。1行目を固定したときの内訳も、$(2,2)$ 型の $3$ 通りが合計 $12$、$4$ 項環状型の $6$ 通りが合計 $12$ で、$24$ 通りと一致する。`,
        },
      ],
    },
  ],
};
