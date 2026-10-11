import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2023年度（令和5年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第2問は文系の第2問とまったく同じ問題なので、解説もそちらと同じ内容を置いている。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第4問の図。f(x)=g(x)+1/g(x)、g(x)=e^{-x²}+x²/4+1。 */
const G4 = (x: number) => Math.exp(-x * x) + (x * x) / 4 + 1;
const F4 = (x: number) => G4(x) + 1 / G4(x);
const M4 = 1.25 + 1 / Math.E;

/** 第5問の図。断面の輪郭 r = (1-√|x|)²。 */
const PROF = (x: number) => (1 - Math.sqrt(Math.abs(x))) ** 2;
const NPROF = (x: number) => -((1 - Math.sqrt(Math.abs(x))) ** 2);

export const kyodaiRikei2023: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法／整式",
      topics: ["部分積分", "対数の性質", "多項式の割り算", "x⁵=1"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\int_1^4\\sqrt x\\log\\left(x^{2}\\right)dx$ を $400$ 万点で数値積分すると $8.564917630$ となり、$\\frac{64}{3}\\log2-\\frac{56}{9}=8.564917630$ と一致した",
          "$x^{2023}-1$ を $x^{4}+x^{3}+x^{2}+x+1$ で整数係数のまま多項式除算すると、余りの係数が $(-1,0,0,1)$、つまり $x^{3}-1$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$\displaystyle\int_{1}^{4}\sqrt x\,\log\left(x^{2}\right)dx$ を求める`,
          answer: String.raw`$\dfrac{64}{3}\log2-\dfrac{56}{9}$`,
          approach: String.raw`$\log\left(x^{2}\right)=2\log x$ と外に出してから部分積分する。$\sqrt x$ の原始関数が $\frac23x^{3/2}$ なので、$\log x$ を微分する側に回すときれいに片づく。`,
          blocks: [
            { k: "p", t: String.raw`$1\le x\le4$ では $x>0$ なので $\log\left(x^{2}\right)=2\log x$ である。よって` },
            {
              k: "math",
              t: String.raw`I=\int_{1}^{4}\sqrt x\,\log\left(x^{2}\right)dx=2\int_{1}^{4}x^{\frac12}\log x\,dx`,
            },
            { k: "p", t: String.raw`である。部分積分すると` },
            {
              k: "math",
              t: String.raw`\int x^{\frac12}\log x\,dx=\frac23x^{\frac32}\log x-\int\frac23x^{\frac32}\cdot\frac1x\,dx=\frac23x^{\frac32}\log x-\frac49x^{\frac32}`,
            },
            { k: "p", t: String.raw`である。$x=4$ では $x^{3/2}=8$、$\log4=2\log2$ なので` },
            {
              k: "math",
              t: String.raw`\left[\frac23x^{\frac32}\log x-\frac49x^{\frac32}\right]_{1}^{4}=\left(\frac{16}{3}\cdot2\log2-\frac{32}{9}\right)-\left(0-\frac49\right)=\frac{32}{3}\log2-\frac{28}{9}`,
            },
            { k: "p", t: String.raw`である。$2$ 倍して` },
            {
              k: "math",
              t: String.raw`I=\frac{64}{3}\log2-\frac{56}{9}`,
            },
            { k: "p", t: String.raw`である（$8.5649$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$\log\left(x^{2}\right)=2\log x$ が使えるのは $x>0$ のときである。積分区間が $1\le x\le4$ なので問題ない。`,
            String.raw`$\log4=2\log2$ に直してから計算する。$\log4$ のまま残すと答えの形が揃わない。`,
            String.raw`$x^{3/2}$ の値を $x=4$ で $8$、$x=1$ で $1$ と押さえる。$4^{3/2}=\left(4^{1/2}\right)^{3}=2^{3}$ である。`,
          ],
          check: String.raw`$\frac{64}{3}\log2=14.787135$、$\frac{56}{9}=6.222222$ で、差は $8.564913$。$400$ 万点の数値積分でも $8.564918$ になり一致する。`,
        },
        {
          label: "問2",
          task: String.raw`$x^{2023}-1$ を $x^{4}+x^{3}+x^{2}+x+1$ で割った余りを求める`,
          answer: String.raw`$x^{3}-1$`,
          approach: String.raw`$x^{5}-1=(x-1)\left(x^{4}+x^{3}+x^{2}+x+1\right)$ なので、割る式を法として $x^{5}\equiv1$ が使える。あとは $2023$ を $5$ で割った余りを見るだけである。`,
          blocks: [
            { k: "p", t: String.raw`$D(x)=x^{4}+x^{3}+x^{2}+x+1$ とおく。` },
            {
              k: "math",
              t: String.raw`x^{5}-1=(x-1)D(x)`,
            },
            {
              k: "p",
              t: String.raw`なので、$D(x)$ を法として $x^{5}\equiv1$ である。$2023=5\cdot404+3$ だから`,
            },
            {
              k: "math",
              t: String.raw`x^{2023}=\left(x^{5}\right)^{404}\cdot x^{3}\equiv1^{404}\cdot x^{3}=x^{3}\pmod{D(x)}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`x^{2023}-1\equiv x^{3}-1\pmod{D(x)}` },
            {
              k: "p",
              t: String.raw`で、$x^{3}-1$ の次数 $3$ は $D$ の次数 $4$ より小さいから、これがそのまま余りである。`,
            },
            {
              k: "note",
              t: String.raw`きちんと書くなら、$x^{2023}-x^{3}=x^{3}\left(x^{2020}-1\right)$ で、$x^{2020}-1=\left(x^{5}\right)^{404}-1$ は $x^{5}-1$ で割り切れ、$x^{5}-1$ は $D(x)$ で割り切れる、という形になる。`,
            },
          ],
          pitfalls: [
            String.raw`$D(x)$ は $x^{5}-1$ の因数であって $x^{5}-1$ そのものではない。$x^{5}\equiv1$ が使えるのは、$x^{5}-1$ が $D$ で割り切れるからである。`,
            String.raw`$2023$ を $5$ で割った余りは $3$ である。$2023=2020+3$ と見れば速い。`,
            String.raw`余りの次数が $3$ 以下であることを確かめる。$x^{3}-1$ はそのまま答えになる。`,
          ],
          check: String.raw`$x^{2023}-1$ を $x^{4}+x^{3}+x^{2}+x+1$ で整数係数のまま多項式除算すると、余りの係数は $x^{0}$ から順に $(-1,0,0,1)$、すなわち $x^{3}-1$ になる。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["1次独立", "共線条件", "係数比較", "内分点"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{OR}}=\\frac1{10}\\overrightarrow{\\mathrm{OD}}$、$s=\\frac53$、$u=\\frac12$ のとき、直線 $\\mathrm{QR}$ 上の点と直線 $\\mathrm{PC}$ 上の点がどちらも $\\left(\\frac16,0,\\frac12\\right)$（$\\overrightarrow{\\mathrm{OA}},\\overrightarrow{\\mathrm{OB}},\\overrightarrow{\\mathrm{OC}}$ を基本ベクトルにとった座標）になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`直線 $\mathrm{QR}$ と直線 $\mathrm{PC}$ が交点をもつように $\mathrm{R}$ を直線 $\mathrm{OD}$ 上にとるとき、$\mathrm{OR}:\mathrm{RD}$ を求める`,
          answer: String.raw`$\mathrm{OR}:\mathrm{RD}=1:9$`,
          approach: String.raw`$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}},\overrightarrow{\mathrm{OC}}$ は1次独立なので、これを「座標軸」だと思って係数を比べればよい。$\overrightarrow{\mathrm{OR}}=k\overrightarrow{\mathrm{OD}}$ とおき、2直線上の点を媒介変数で書いて一致させると、3本の式から $k$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ は同一平面上にないので、$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ は1次独立である。条件より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=\vec a+2\vec b+3\vec c,\qquad\overrightarrow{\mathrm{OP}}=\frac13\vec a,\qquad\overrightarrow{\mathrm{OQ}}=\frac12\vec b`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{P}$ は $\mathrm{OA}$ を $1:2$ に内分、$\mathrm{Q}$ は $\mathrm{OB}$ の中点）。$\mathrm{R}$ は直線 $\mathrm{OD}$ 上なので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=k\overrightarrow{\mathrm{OD}}=k\vec a+2k\vec b+3k\vec c`,
            },
            { k: "p", t: String.raw`とおける。` },
            {
              k: "p",
              t: String.raw`**2直線上の点を書く。** 直線 $\mathrm{QR}$ 上の点は、実数 $s$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}+s\left(\overrightarrow{\mathrm{OR}}-\overrightarrow{\mathrm{OQ}}\right)=sk\,\vec a+\left\{\frac12+s\left(2k-\frac12\right)\right\}\vec b+3sk\,\vec c`,
            },
            { k: "p", t: String.raw`である。直線 $\mathrm{PC}$ 上の点は、実数 $u$ を使って` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}+u\left(\vec c-\overrightarrow{\mathrm{OP}}\right)=\frac{1-u}{3}\vec a+0\cdot\vec b+u\,\vec c`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**係数を比べる。** 1次独立だから、交点をもつことは次の3式が同時に成り立つ $s,u,k$ があることと同値である。`,
            },
            {
              k: "math",
              t: String.raw`\begin{cases}sk=\dfrac{1-u}{3}&\cdots\;\vec a\\[2mm]\dfrac12+s\left(2k-\dfrac12\right)=0&\cdots\;\vec b\\[2mm]3sk=u&\cdots\;\vec c\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`$\vec c$ の式を $\vec a$ の式に入れると $sk=\dfrac{1-3sk}{3}$、つまり $3sk=1-3sk$ より`,
            },
            { k: "math", t: String.raw`sk=\frac16,\qquad u=\frac12` },
            { k: "p", t: String.raw`である。$\vec b$ の式に $sk=\dfrac16$ を入れると` },
            {
              k: "math",
              t: String.raw`\frac12+2\cdot\frac16-\frac s2=0\quad\Longrightarrow\quad\frac s2=\frac56\quad\Longrightarrow\quad s=\frac53`,
            },
            { k: "p", t: String.raw`となり、$k=\dfrac{1/6}{5/3}=\dfrac1{10}$ である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=\frac1{10}\overrightarrow{\mathrm{OD}},\qquad\mathrm{OR}:\mathrm{RD}=1:9`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`交点は $\dfrac16\vec a+\dfrac12\vec c$ にあたる点である。$\vec b$ の係数が $0$ になっているので、この点は平面 $\mathrm{OAC}$ 上にある。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec b$ の式に $s\left(2k-\frac12\right)$ と $k$ がかかった形で現れるので、$sk$ をひとかたまりとして扱うと見通しがよい。$s$ と $k$ を別々に解こうとすると式が混み合う。`,
            String.raw`$\mathrm{P}$ は $\mathrm{OA}$ を $1:2$ に内分するので $\overrightarrow{\mathrm{OP}}=\frac13\vec a$ である。$\frac12$ や $\frac23$ と取り違えない。`,
            String.raw`$\mathrm{OR}:\mathrm{RD}$ は $k:(1-k)$ である。$k=\frac1{10}$ から $1:9$ となる。$1:10$ としない。`,
          ],
          check: String.raw`$\vec a,\vec b,\vec c$ を基本ベクトルにとった座標で計算すると、$s=\frac53$、$k=\frac1{10}$ のとき直線 $\mathrm{QR}$ 上の点は $\left(\frac16,0,\frac12\right)$、$u=\frac12$ のとき直線 $\mathrm{PC}$ 上の点も $\left(\frac16,0,\frac12\right)$ で一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["余事象", "包除原理", "倍数判定", "反復試行"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $7$ まで $6^{n}$ 通りの出目をすべて列挙して確率を分数のまま求めると、$1-\\left(\\frac56\\right)^{n}$ および $1-\\left(\\frac56\\right)^{n}-\\left(\\frac23\\right)^{n}+\\left(\\frac12\\right)^{n}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$Y=X_1X_2\cdots X_n$ が $5$ で割り切れる確率を求める`,
          answer: String.raw`$1-\left(\dfrac56\right)^{n}$`,
          approach: String.raw`$5$ は素数で、$1$ から $6$ のうち $5$ の倍数は $5$ だけである。積が $5$ で割り切れるのは「少なくとも1回 $5$ が出る」ときなので、余事象が速い。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$5$ は素数なので、$Y$ が $5$ で割り切れるのは $X_1,\dots,X_n$ のどれかが $5$ の倍数のときである。$1$ から $6$ のうち $5$ の倍数は $5$ だけだから、条件は「少なくとも1回 $5$ が出る」である。`,
            },
            { k: "p", t: String.raw`余事象「1回も $5$ が出ない」の確率は $\left(\dfrac56\right)^{n}$ なので` },
            { k: "math", t: String.raw`P=1-\left(\frac56\right)^{n}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$5$ が素数であることが効いている。「$4$ で割り切れる」なら $2$ が2回出る場合なども要るので、余事象だけでは済まない。`,
          ],
          check: String.raw`$n=2$ なら $1-\frac{25}{36}=\frac{11}{36}$ で、$36$ 通りの全探索でも $\frac{11}{36}$ である。$n=1,\dots,7$ のすべてで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$Y$ が $15$ で割り切れる確率を求める`,
          answer: String.raw`$1-\left(\dfrac56\right)^{n}-\left(\dfrac23\right)^{n}+\left(\dfrac12\right)^{n}$`,
          approach: String.raw`$15=3\times5$ なので「$5$ の倍数が1回は出る」かつ「$3$ の倍数が1回は出る」である。2つの条件の**どちらも**成り立つ確率なので、余事象（どちらかが成り立たない）に包除原理を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$15=3\cdot5$ で $3,5$ は相異なる素数だから、$Y$ が $15$ で割り切れるのは`,
            },
            {
              k: "steps",
              items: [
                String.raw`事象 $A$：$5$ が少なくとも1回出る（$Y$ が $5$ の倍数）`,
                String.raw`事象 $B$：$3$ または $6$ が少なくとも1回出る（$Y$ が $3$ の倍数）`,
              ],
            },
            { k: "p", t: String.raw`がともに起こるときである。余事象をとって包除原理を使うと` },
            {
              k: "math",
              t: String.raw`P(A\cap B)=1-P\left(\overline A\cup\overline B\right)=1-P\left(\overline A\right)-P\left(\overline B\right)+P\left(\overline A\cap\overline B\right)`,
            },
            { k: "p", t: String.raw`である。それぞれ` },
            {
              k: "steps",
              items: [
                String.raw`$\overline A$：毎回 $5$ 以外（$5$ 通り）。$P\left(\overline A\right)=\left(\dfrac56\right)^{n}$。`,
                String.raw`$\overline B$：毎回 $3,6$ 以外（$1,2,4,5$ の $4$ 通り）。$P\left(\overline B\right)=\left(\dfrac46\right)^{n}=\left(\dfrac23\right)^{n}$。`,
                String.raw`$\overline A\cap\overline B$：毎回 $3,5,6$ 以外（$1,2,4$ の $3$ 通り）。$P=\left(\dfrac36\right)^{n}=\left(\dfrac12\right)^{n}$。`,
              ],
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`P=1-\left(\frac56\right)^{n}-\left(\frac23\right)^{n}+\left(\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ では $1-\frac56-\frac23+\frac12=0$ で、1回では $15$ の倍数になりえないことと合う。$n=2$ では $\frac19$ で、$(5,3),(5,6),(3,5),(6,5)$ の $4$ 通り$/36$ と一致する。`,
            },
          ],
          pitfalls: [
            String.raw`$A$ と $B$ は独立ではない（同じ出目の列を見ている）。$P(A)P(B)$ としない。余事象の和に包除原理を使うのが定石である。`,
            String.raw`$3$ の倍数は $3$ と $6$ の2つである。$6$ を忘れると $\left(\frac56\right)^{n}$ になってしまう。`,
            String.raw`$\overline A\cap\overline B$ は「$3,5,6$ のどれも出ない」で、残りは $1,2,4$ の $3$ 通りである。`,
          ],
          check: String.raw`$n=3$ なら $1-\frac{125}{216}-\frac8{27}+\frac18=\frac14$ で、$216$ 通りの全探索でも $\frac14$ である。$n=1,\dots,7$ のすべてで式と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法",
      topics: ["合成の最大最小", "t+1/t の単調性", "偶関数", "置き換え"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$-1\\le x\\le1$ を $200$ 万等分して $f$ を直接計算すると、最大 $2.500000000$（$x=0$）、最小 $2.235972467$（$x=\\pm1$）となり、$\\frac52$ および $m+\\frac1m\;\\left(m=\\frac54+\\frac1e=1.617879441\\right)$ と一致した",
          "$g(x)=e^{-x^{2}}+\\frac{x^{2}}{4}+1$ の値域が $\\left[1.617879441,\;2\\right]$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$f(x)=g(x)+\dfrac{1}{g(x)}$（$g(x)=e^{-x^{2}}+\dfrac{x^{2}}{4}+1$、$-1\le x\le1$）の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac52$（$x=0$）、最小値 $m+\dfrac1m$（$m=\dfrac54+\dfrac1e$、$x=\pm1$）`,
          approach: String.raw`$f$ は $g$ の値だけで決まる形 $t+\frac1t$ である。$g>1$ がすぐ分かるので、$t>1$ では $t+\frac1t$ が増加することを使えば、「$g$ の最大・最小を求める」だけの問題になる。$g$ は $x^{2}$ の関数なので、$u=x^{2}$ とおくと1変数の単調性の話になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=g(x)=e^{-x^{2}}+\dfrac{x^{2}}{4}+1$ とおくと $f(x)=t+\dfrac1t$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$t>1$ である。** $e^{-x^{2}}>0$、$\dfrac{x^{2}}{4}\ge0$ なので $t>1$ である。$\left(t+\dfrac1t\right)'=1-\dfrac1{t^{2}}>0$（$t>1$）だから、$t+\dfrac1t$ は $t>1$ で増加する。したがって`,
            },
            {
              k: "math",
              t: String.raw`f\text{ の最大}\iff g\text{ の最大},\qquad f\text{ の最小}\iff g\text{ の最小}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$g$ の値域。** $u=x^{2}$ とおくと $-1\le x\le1$ は $0\le u\le1$ に対応し`,
            },
            { k: "math", t: String.raw`h(u)=e^{-u}+\frac u4+1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "math",
              t: String.raw`h'(u)=-e^{-u}+\frac14`,
            },
            {
              k: "p",
              t: String.raw`で、$0\le u\le1$ では $e^{-u}\ge e^{-1}=0.367\cdots>\dfrac14$ だから $h'(u)<0$、つまり $h$ は減少する。よって`,
            },
            {
              k: "math",
              t: String.raw`h(1)=\frac1e+\frac54\le g\le h(0)=2`,
            },
            {
              k: "p",
              t: String.raw`である。最大 $2$ は $u=0$、すなわち $x=0$ のとき、最小 $m=\dfrac54+\dfrac1e$ は $u=1$、すなわち $x=\pm1$ のときである。`,
            },
            { k: "p", t: String.raw`**答え。** ` },
            {
              k: "math",
              t: String.raw`\text{最大値}=2+\frac12=\frac52\quad(x=0)`,
            },
            {
              k: "math",
              t: String.raw`\text{最小値}=m+\frac1m=\frac{5e+4}{4e}+\frac{4e}{5e+4}\quad(x=\pm1)`,
            },
            { k: "p", t: String.raw`である（最小値は $2.2360$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=f(x)$ のグラフ（$-1\le x\le1$）。偶関数で、$x=0$ で最大 $\frac52$、$x=\pm1$ で最小 $m+\frac1m=2.236$（$m=\frac54+\frac1e$）をとる。`,
                view: [-1.35, 1.35, 2.16, 2.60],
                step: { x: 1, y: 0.1 },
                items: [
                  { k: "curve", f: F4, from: -1, to: 1 },
                  { k: "dot", at: [0, 2.5], label: "最大 5/2", place: "above" },
                  { k: "dot", at: [-1, M4 + 1 / M4], label: "最小", place: "above-left" },
                  { k: "dot", at: [1, M4 + 1 / M4], label: "最小", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t+\frac1t$ は $t>0$ 全体では $t=1$ で最小の谷をもつ。$t>1$ に限れば増加なので、まず $g>1$ を押さえるのが要点である。$g$ の最小が $1$ より小さければ話がまるで変わる。`,
            String.raw`$u=x^{2}$ と置き換えると、$-1\le x\le1$ が $0\le u\le1$ になる。$x$ のまま微分して $f'$ を作ると式が重い。`,
            String.raw`$h'(u)=0$ となるのは $u=\log4=1.386$ で、区間 $[0,1]$ の外である。区間内では単調なので端で最大最小をとる。`,
            String.raw`最小値は二重分数のままでよい。$m+\frac1m$ を1つの分数にすると $\frac{41e^{2}+40e+16}{20e^{2}+16e}$ となり、かえって見にくい。`,
          ],
          check: String.raw`$-1\le x\le1$ を $200$ 万等分して $f$ を直接計算すると、最大 $2.500000000$（$x=0$）、最小 $2.235972467$（$x=\pm1$）である。$m=1.617879441$、$\frac1m=0.618093026$ で和は $2.235972467$ と一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形・積分法",
      topics: ["線分の通過範囲", "包絡線", "回転体の体積", "断面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "条件をみたす $\\mathrm{P},\\mathrm{Q}$ と $t$ を $20$ 万組ランダムにとって線分上の点を作ると、すべて $\\sqrt{|x|}+\\sqrt r\\le1$（$r=\\sqrt{y^{2}+z^{2}}$）をみたした",
          "$\\sqrt{|x|}+\\sqrt r\\le1$ の体積を $400$ 万点のモンテカルロ法で求めると $0.41824$ となり、$\\frac{2\\pi}{15}=0.41888$ とよく合っている",
          "$2\\pi\\int_0^1\\left(1-\\sqrt x\\right)^{4}dx=\\frac{2\\pi}{15}$ を数値積分でも確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{P}$ が $x$ 軸上、$\mathrm{Q}$ が $yz$ 平面上、$\mathrm{OP}+\mathrm{OQ}=1$ を保って動くとき、線分 $\mathrm{PQ}$ が通過してできる立体の体積を求める`,
          answer: String.raw`$\dfrac{2\pi}{15}$`,
          approach: String.raw`$\mathrm{Q}$ は $yz$ 平面上を自由に回せるので、立体は $x$ 軸まわりの回転体である。だから $x$ 軸からの距離 $r=\sqrt{y^{2}+z^{2}}$ だけを見ればよく、問題は「$(x,r)$ 平面で、両軸の切片の和が $1$ の線分の族が覆う範囲」という平面の問題に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OP}=a$、$\mathrm{OQ}=b$ とすると $a,b\ge0$、$a+b=1$ である。$\mathrm{P}=(\pm a,0,0)$、$\mathrm{Q}=\left(0,b\cos\varphi,b\sin\varphi\right)$ と書ける。`,
            },
            {
              k: "p",
              t: String.raw`$\varphi$ は自由に動くので、立体は $x$ 軸のまわりの回転体である。また $\mathrm{P}$ の符号も自由なので $x\to-x$ について対称である。そこで $x\ge0$、$r=\sqrt{y^{2}+z^{2}}\ge0$ の $(x,r)$ 平面で考える。`,
            },
            {
              k: "p",
              t: String.raw`**線分の族。** $\mathrm{P}=(a,0)$、$\mathrm{Q}=(0,b)=(0,1-a)$ を結ぶ線分は`,
            },
            {
              k: "math",
              t: String.raw`\frac xa+\frac r{1-a}=1\qquad(0\le x\le a)`,
            },
            {
              k: "p",
              t: String.raw`である（$0<a<1$）。$a$ を $0$ から $1$ まで動かしたときの線分の和集合を求める。`,
            },
            {
              k: "p",
              t: String.raw`**覆う範囲。** $x,r>0$ を固定し $\varphi(a)=\dfrac xa+\dfrac r{1-a}$（$0<a<1$）を考える。$\varphi$ は両端で $+\infty$ に発散し、`,
            },
            {
              k: "math",
              t: String.raw`\varphi'(a)=-\frac x{a^{2}}+\frac r{(1-a)^{2}}=0\quad\Longleftrightarrow\quad\frac{a}{1-a}=\sqrt{\frac xr}`,
            },
            {
              k: "p",
              t: String.raw`で最小になる。このとき $a=\dfrac{\sqrt x}{\sqrt x+\sqrt r}$ で、最小値は`,
            },
            {
              k: "math",
              t: String.raw`\varphi_{\min}=\sqrt x\left(\sqrt x+\sqrt r\right)+\sqrt r\left(\sqrt x+\sqrt r\right)=\left(\sqrt x+\sqrt r\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $\varphi(a)=1$ をみたす $a$ が存在することは $\varphi_{\min}\le1$、すなわち`,
            },
            { k: "math", t: String.raw`\sqrt x+\sqrt r\le1` },
            {
              k: "p",
              t: String.raw`と同値である。境界 $\sqrt x+\sqrt r=1$ はこの線分族の包絡線である。`,
            },
            {
              k: "p",
              t: String.raw`**体積。** $x\ge0$ の断面は半径 $r(x)=\left(1-\sqrt x\right)^{2}$ の円で、$0\le x\le1$ である。$x\to-x$ の対称性から`,
            },
            {
              k: "math",
              t: String.raw`V=2\int_{0}^{1}\pi\left\{\left(1-\sqrt x\right)^{2}\right\}^{2}dx=2\pi\int_{0}^{1}\left(1-\sqrt x\right)^{4}dx`,
            },
            { k: "p", t: String.raw`である。$u=\sqrt x$（$x=u^{2}$、$dx=2u\,du$）とおくと` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left(1-\sqrt x\right)^{4}dx=\int_{0}^{1}(1-u)^{4}\cdot2u\,du`,
            },
            { k: "p", t: String.raw`で、さらに $v=1-u$ とすると` },
            {
              k: "math",
              t: String.raw`2\int_{0}^{1}v^{4}(1-v)\,dv=2\left(\frac15-\frac16\right)=\frac1{15}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`V=2\pi\cdot\frac1{15}=\frac{2\pi}{15}`,
            },
            { k: "p", t: String.raw`である（$0.4189$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$x$ 軸を含む平面での断面。輪郭は $\sqrt{|x|}+\sqrt{|r|}=1$ で、細い線は $a=0.1,0.3,0.5,0.7,0.9$ に対する線分 $\mathrm{PQ}$。これらの線分が包絡線としてこの輪郭を作る。立体はこれを $x$ 軸のまわりに回したもの。`,
                view: [-1.35, 1.35, -1.1, 1.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: PROF, bottom: NPROF, from: -1, to: 1 },
                  { k: "curve", f: PROF, from: -1, to: 1 },
                  { k: "curve", f: NPROF, from: -1, to: 1 },
                  ...[0.1, 0.3, 0.5, 0.7, 0.9].map((a) => ({
                    k: "seg" as const,
                    a: [a, 0] as [number, number],
                    b: [0, 1 - a] as [number, number],
                    faint: true,
                  })),
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{Q}$ が $yz$ 平面上を自由に動くので、立体は回転体になる。$\mathrm{Q}$ を1方向に固定して考えると、体積が出せない。`,
            String.raw`$\mathrm{P}$ は $x$ 軸上の**負の側**にも行ける。$x\to-x$ の対称性から、$x\ge0$ の体積を $2$ 倍する。`,
            String.raw`線分の族が覆う範囲は、包絡線の内側**全部**である。$\varphi_{\min}\le1$ という形で言いかえるのがいちばん確実で、包絡線を微分で求めるだけだと「内側が全部覆われる」ことの説明が要る。`,
            String.raw`断面の半径は $\left(1-\sqrt x\right)^{2}$ で、面積は $\pi\left(1-\sqrt x\right)^{4}$ である。$4$ 乗になるところを落とさない。`,
          ],
          check: String.raw`条件をみたす $\mathrm{P},\mathrm{Q}$ と $t$ を $20$ 万組ランダムにとって線分上の点を作ると、すべて $\sqrt{|x|}+\sqrt r\le1$ をみたした。$\sqrt{|x|}+\sqrt r\le1$ の体積を $400$ 万点のモンテカルロ法で求めると $0.41824$ で、$\frac{2\pi}{15}=0.41888$ とよく合う。`,
        },
      ],
    },
    {
      no: 6,
      field: "三角関数・整数",
      topics: ["3倍角・4倍角", "漸化式", "合同式", "背理法"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$p=3,5,7,11,13$ について $c_0=c_1=1$、$c_{k+1}=2c_k-p^{2}c_{k-1}$ で定めた整数が $p^{k}\\cos k\\theta$（$\\cos\\theta=\\frac1p$）に一致することを $k\\le8$ で数値的に確かめた",
          "同じ $p$ について $c_k\\bmod p$ が $2^{k-1}\\bmod p$ と一致することを $k=1,\\dots,8$ で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\cos3\theta$ と $\cos4\theta$ を $\cos\theta$ の式で表す`,
          answer: String.raw`$\cos3\theta=4\cos^{3}\theta-3\cos\theta$、$\cos4\theta=8\cos^{4}\theta-8\cos^{2}\theta+1$`,
          approach: String.raw`$\cos2\theta=2\cos^{2}\theta-1$ から順に積み上げる。$\cos4\theta$ は $\cos2(2\theta)$ と見るのがいちばん速い。`,
          blocks: [
            { k: "p", t: String.raw`$c=\cos\theta$ とおく。まず $\cos2\theta=2c^{2}-1$ である。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\cos3\theta&=\cos(2\theta+\theta)=\cos2\theta\cos\theta-\sin2\theta\sin\theta\\[1mm]
&=\left(2c^{2}-1\right)c-2\left(1-c^{2}\right)c=4c^{3}-3c
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。$\cos4\theta$ は $2\theta$ の2倍角と見て` },
            {
              k: "math",
              t: String.raw`\cos4\theta=2\cos^{2}2\theta-1=2\left(2c^{2}-1\right)^{2}-1=8c^{4}-8c^{2}+1`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\cos4\theta$ を $\cos(3\theta+\theta)$ として出すと $\sin3\theta\sin\theta$ が現れて手間が増える。$2\theta$ の2倍角と見る。`,
          ],
          check: String.raw`$\theta=60^\circ$（$c=\frac12$）なら $4c^{3}-3c=-1=\cos180^\circ$、$8c^{4}-8c^{2}+1=\frac12-2+1=-\frac12=\cos240^\circ$ で合っている。`,
        },
        {
          label: "(2)",
          task: String.raw`$\cos\theta=\dfrac1p$（$p$ は $3$ 以上の素数）のとき、$\theta=\dfrac mn\pi$ となる正の整数 $m,n$ が存在するか判定する`,
          answer: String.raw`存在しない`,
          approach: String.raw`(1) の形を一般化する。$\cos\theta=\frac1p$ のとき $p^{k}\cos k\theta$ が整数になり、しかも $p$ で割り切れないことを漸化式で示す。もし $\theta=\frac mn\pi$ なら $\cos2n\theta=1$ となり、$p^{2n}\cos2n\theta=p^{2n}$ は $p$ で割り切れるので矛盾する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$c_k=p^{k}\cos k\theta$ とおく。積和の公式 $\cos(k+1)\theta+\cos(k-1)\theta=2\cos\theta\cos k\theta$ から`,
            },
            {
              k: "math",
              t: String.raw`\cos(k+1)\theta=\frac2p\cos k\theta-\cos(k-1)\theta`,
            },
            { k: "p", t: String.raw`で、両辺を $p^{k+1}$ 倍すると` },
            { k: "math", t: String.raw`c_{k+1}=2c_k-p^{2}c_{k-1}\qquad(k\ge1)` },
            {
              k: "p",
              t: String.raw`となる。$c_0=1$、$c_1=p\cdot\dfrac1p=1$ だから、帰納的に $c_k$ はすべて整数である。`,
            },
            {
              k: "note",
              t: String.raw`実際に書き下すと $c_2=2-p^{2}$、$c_3=4-3p^{2}$、$c_4=8-8p^{2}+p^{4}$ で、これは (1) の式 $p^{3}\left(4c^{3}-3c\right)$、$p^{4}\left(8c^{4}-8c^{2}+1\right)$ に $c=\frac1p$ を入れたものと一致する。`,
            },
            {
              k: "p",
              t: String.raw`**$p$ で割り切れない。** 漸化式を $p$ を法として見ると $c_{k+1}\equiv2c_k\pmod p$ なので、$k\ge1$ で`,
            },
            { k: "math", t: String.raw`c_k\equiv2^{k-1}c_1=2^{k-1}\pmod p` },
            {
              k: "p",
              t: String.raw`である。$p$ は $3$ 以上の素数だから奇数で、$p\nmid2^{k-1}$ である。したがって`,
            },
            { k: "math", t: String.raw`p\nmid c_k\qquad(k\ge1)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**背理法。** $\theta=\dfrac mn\pi$（$m,n$ は正の整数）とする。$2n\theta=2m\pi$ なので $\cos2n\theta=1$、したがって`,
            },
            { k: "math", t: String.raw`c_{2n}=p^{2n}\cos2n\theta=p^{2n}` },
            {
              k: "p",
              t: String.raw`である。$2n\ge2\ge1$ なので上の結果より $p\nmid c_{2n}$ のはずだが、$p^{2n}$ は $p$ で割り切れる。矛盾である。`,
            },
            { k: "p", t: String.raw`よって、そのような正の整数 $m,n$ は` },
            { k: "math", t: String.raw`\text{存在しない}` },
            { k: "p", t: String.raw`。` },
          ],
          pitfalls: [
            String.raw`$c_k$ が整数であることと、$p$ で割り切れないことの**両方**が要る。整数であるだけでは矛盾が出ない。`,
            String.raw`$p$ が奇素数であることは $p\nmid2^{k-1}$ のところで効く。$p=2$ だと議論が崩れる（実際 $\cos\theta=\frac12$ なら $\theta=\frac\pi3$ で、$m,n$ は存在する）。`,
            String.raw`$\theta=\frac mn\pi$ から $\cos(2n\theta)=1$ を作る。$\cos(n\theta)=\pm1$ でもよいが、$2n$ にしておけば符号を気にしなくてよい。`,
            String.raw`(1) はこの漸化式の $k=3,4$ の場合を具体的に見せる誘導である。$c_3=4-3p^{2}$、$c_4=8-8p^{2}+p^{4}$ が $p$ で割ると $4,8$ 余ることを確かめておくと、一般の形が見える。`,
          ],
          check: String.raw`$p=3,5,7,11,13$ について $c_0=c_1=1$、$c_{k+1}=2c_k-p^{2}c_{k-1}$ で定めた整数は、$p^{k}\cos k\theta$（$\cos\theta=\frac1p$）と $k\le8$ で小数6桁まで一致した。また $c_k\bmod p$ は $2^{k-1}\bmod p$ と完全に一致し、どれも $0$ にならなかった。`,
        },
      ],
    },
  ],
};
