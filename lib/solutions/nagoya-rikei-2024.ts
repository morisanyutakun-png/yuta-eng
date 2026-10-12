import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2024年度（令和6年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の曲線 y = √x + 2/√x。 */
const CV24 = (x: number): number => Math.sqrt(x) + 2 / Math.sqrt(x);
/** 第1問の t = g(a) = -a(a+6)/(a-2)。接点 a に対する x 切片。 */
const G24 = (a: number): number => (-a * (a + 6)) / (a - 2);

export const nagoyaRikei2024: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["極値", "接線の本数", "2次方程式の解の配置", "整数解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f'(2)=0$、$f(2)=2.8284271247=2\\sqrt2$ を確かめた",
          "$t=g(a)$ を $a^{2}+(6+t)a-2t=0$ に直し、判別式 $t^{2}+20t+36$ の根が $-2,-18$ であること、正の解がちょうど2個になるのが $t<-18$ であることを確かめた",
          "$\\alpha=3,4,5,6$ について接点の組を求めると $(3,18),(4,10),\\left(5,\\frac{22}3\\right),(6)$ となり、両方整数なのは前2つだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=\sqrt x+\dfrac2{\sqrt x}$（$x>0$）の極値を求める`,
          answer: String.raw`$x=2$ で極小値 $2\sqrt2$（極大値はない）`,
          approach: String.raw`$x^{1/2}$、$x^{-1/2}$ の形で微分する。$x^{-3/2}$ でくくると符号が一目で分かる。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x^{\frac12}+2x^{-\frac12}$ なので` },
            {
              k: "math",
              t: String.raw`f'(x)=\frac12x^{-\frac12}-x^{-\frac32}=\frac{x^{-\frac32}}2\left(x-2\right)=\frac{x-2}{2x^{\frac32}}`,
            },
            {
              k: "p",
              t: String.raw`である。$x>0$ では $2x^{\frac32}>0$ なので、$f'$ の符号は $x-2$ の符号に等しい。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<x<2$：$f'(x)<0$（減少）`,
                String.raw`$x=2$：$f'(x)=0$`,
                String.raw`$x>2$：$f'(x)>0$（増加）`,
              ],
            },
            { k: "p", t: String.raw`よって $x=2$ で極小で` },
            {
              k: "math",
              t: String.raw`f(2)=\sqrt2+\frac2{\sqrt2}=\sqrt2+\sqrt2=2\sqrt2`,
            },
            { k: "p", t: String.raw`である。極大値はない。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=\sqrt x+\frac2{\sqrt x}$（$x>0$）。$x=2$ で極小値 $2\sqrt2=2.83$ をとり、$x\to+0$ でも $x\to\infty$ でも $+\infty$ に発散する。下に凸の形をしていて、極大値はない。`,
                view: [-0.7, 12.5, -0.3, 8.7],
                step: { x: 2, y: 2 },
                items: [
                  { k: "curve", f: CV24, from: 0.055, to: 12.4 },
                  { k: "dot", at: [2, 2 * Math.SQRT2], label: "(2, 2√2)", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\frac2{\sqrt x}=2x^{-\frac12}$ として微分する。$\left(x^{-\frac12}\right)'=-\frac12x^{-\frac32}$ なので $2$ 倍して $-x^{-\frac32}$。`,
            String.raw`$f(2)=2\sqrt2$ は $\sqrt2+\sqrt2$ である。相加相乗平均で $\sqrt x\cdot\frac2{\sqrt x}=2$ から最小値 $2\sqrt2$ と見てもよい。`,
            String.raw`定義域が $x>0$ なので端点はない。極大値は存在しない。`,
          ],
          check: String.raw`$f'(2)=0$、$f(2)=2.8284271247$ で $2\sqrt2$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$x$ 軸上の点 $\mathrm{P}(t,0)$ から $C$ にちょうど2本の接線を引くことができるような $t$ の範囲を求める`,
          answer: String.raw`$t<-18$`,
          approach: String.raw`接点の $x$ 座標を $a$ として、接線が $(t,0)$ を通る条件を書くと $t$ が $a$ の式になる。それを $a$ の2次方程式に直し、正の解がちょうど2個になる条件を調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`接点を $\left(a,f(a)\right)$（$a>0$）とする。接線は $y=f(a)+f'(a)(x-a)$ で、$(t,0)$ を通る条件は`,
            },
            {
              k: "math",
              t: String.raw`0=f(a)+f'(a)(t-a)`,
            },
            { k: "p", t: String.raw`である。$f(a)=\dfrac{a+2}{\sqrt a}$、$f'(a)=\dfrac{a-2}{2a^{\frac32}}$ を入れると` },
            {
              k: "math",
              t: String.raw`\frac{a+2}{\sqrt a}+\frac{a-2}{2a^{\frac32}}(t-a)=0`,
            },
            { k: "p", t: String.raw`で、両辺に $2a^{\frac32}>0$ を掛けて` },
            {
              k: "math",
              t: String.raw`2a(a+2)+(a-2)(t-a)=0`,
            },
            { k: "p", t: String.raw`となる。展開して整理すると` },
            {
              k: "math",
              t: String.raw`2a^{2}+4a+at-a^{2}-2t+2a=0\quad\Longleftrightarrow\quad a^{2}+(6+t)a-2t=0\quad\cdots\text{①}`,
            },
            {
              k: "p",
              t: String.raw`である。接線の本数は、① の**正の解の個数**に等しい。`,
            },
            {
              k: "p",
              t: String.raw`**$a=2$ は解でない。** ① に $a=2$ を入れると $4+2(6+t)-2t=16\ne0$。だから $f'(a)=0$（水平な接線）になることはなく、① と接線が1対1に対応する。`,
            },
            {
              k: "p",
              t: String.raw`**正の解が2個になる条件。** ① の判別式は`,
            },
            {
              k: "math",
              t: String.raw`\Delta=(6+t)^{2}+8t=t^{2}+20t+36=(t+2)(t+18)`,
            },
            {
              k: "p",
              t: String.raw`である。2解の和は $-(6+t)$、積は $-2t$ なので、異なる2つの正の解をもつ条件は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\Delta>0$：$t<-18$ または $t>-2$`,
                String.raw`（和）$-(6+t)>0$：$t<-6$`,
                String.raw`（積）$-2t>0$：$t<0$`,
              ],
            },
            { k: "p", t: String.raw`をすべてみたすことである。$t<-6$ と合わせると` },
            { k: "math", t: String.raw`t<-18` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`接点 $a$ に対する $x$ 切片 $t=g(a)=-\frac{a(a+6)}{a-2}$。$a=2$ が漸近線で、左側（$0<a<2$）では $t>0$、右側では $a=6$ で極大 $-18$ をとる。水平線 $y=t$ との交点の個数が接線の本数で、$t<-18$ のときだけ2個になる。`,
                view: [-0.6, 24.6, -60, 25],
                step: { x: 4, y: 10 },
                items: [
                  { k: "curve", f: G24, from: 0.01, to: 1.93 },
                  { k: "curve", f: G24, from: 2.07, to: 24.4 },
                  { k: "seg", a: [2, -60], b: [2, 25], dash: true, faint: true },
                  { k: "seg", a: [-0.6, -18], b: [24.6, -18], dash: true },
                  { k: "dot", at: [6, -18], label: "(6, -18)", place: "above-right" },
                  { k: "dot", at: [3, -27], label: "(3, -27)", place: "left" },
                  { k: "dot", at: [18, -27], label: "(18, -27)", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$t=-18$ のときは $\Delta=0$ で重解 $a=6$、接線は1本だけ。$-18<t<-2$ では実数解がなく $0$ 本、$t>0$ では正の解が1つで1本である。`,
            },
          ],
          pitfalls: [
            String.raw`$2a^{\frac32}$ を掛けて分母を払う。$a>0$ なので符号は変わらない。`,
            String.raw`「接線の本数」は「接点の個数」である。別々の接点が同じ直線を与えないことは、①と接線が1対1に対応することから分かる。`,
            String.raw`解の配置は「判別式・和・積」の3つをそろえる。$t<-6$ が和と積をまとめた条件になる。`,
          ],
          check: String.raw`① の正の解の個数を $t$ ごとに数えると、$t=5,1$ で1個、$t=0,-1,-6,-10$ で0個、$t=-18$ で1個（重解 $a=6$）、$t=-18.0001,-19,-20,-27,-50$ で2個だった。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) において2つの接点の $x$ 座標を $\alpha,\beta$（$\alpha<\beta$）とするとき、$\alpha,\beta$ がともに整数である組をすべて求める`,
          answer: String.raw`$(\alpha,\beta)=(3,\,18),\;(4,\,10)$`,
          approach: String.raw`① の2解が $\alpha,\beta$ である。解と係数の関係から $\alpha\beta=-2t$、$\alpha+\beta=-(6+t)$。$t$ を消すと $\alpha,\beta$ の関係式が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha,\beta$ は ① $a^{2}+(6+t)a-2t=0$ の2解だから`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta=-(6+t),\qquad\alpha\beta=-2t`,
            },
            { k: "p", t: String.raw`である。1本目から $t=-(\alpha+\beta)-6$、これを2本目に入れて` },
            {
              k: "math",
              t: String.raw`\alpha\beta=2(\alpha+\beta)+12`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\alpha\beta-2\alpha-2\beta-12=0\quad\Longleftrightarrow\quad(\alpha-2)(\beta-2)=16`,
            },
            {
              k: "p",
              t: String.raw`である（$(\alpha-2)(\beta-2)=\alpha\beta-2\alpha-2\beta+4=12+4=16$）。`,
            },
            {
              k: "p",
              t: String.raw`**範囲。** (2) の増減から、$t<-18$ のとき2つの解は $2<\alpha<6<\beta$ をみたす（$a=6$ が $t=-18$ の重解だった）。よって $\alpha-2$ は $1$ 以上 $3$ 以下の整数、$\beta-2$ は $4$ より大きい整数である。`,
            },
            {
              k: "p",
              t: String.raw`$(\alpha-2)(\beta-2)=16$ で $1\le\alpha-2\le3$ となる約数は $1$ と $2$ である（$3$ は $16$ を割らない）。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\alpha-2=1$：$\beta-2=16$ より $(\alpha,\beta)=(3,18)$。このとき $t=-27$`,
                String.raw`$\alpha-2=2$：$\beta-2=8$ より $(\alpha,\beta)=(4,10)$。このとき $t=-20$`,
              ],
            },
            { k: "p", t: String.raw`どちらも $t<-18$ をみたす。よって` },
            {
              k: "math",
              t: String.raw`(\alpha,\beta)=(3,\,18),\;(4,\,10)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\alpha=5$ だと $(\alpha-2)(\beta-2)=3(\beta-2)=16$ となり $\beta=\frac{22}3$ で整数にならない。$\alpha=6$ は重解の場合（$t=-18$）で、接線が1本しかないので除かれる。`,
            },
          ],
          pitfalls: [
            String.raw`$t$ を消して $(\alpha-2)(\beta-2)=16$ という積の形に持ち込む。これで約数を調べるだけになる。`,
            String.raw`$2<\alpha<6<\beta$ という範囲を使う。これがないと $(\alpha-2)(\beta-2)=16$ の分解が $16$ 通りに増える。`,
            String.raw`$\alpha<\beta$ なので $(\alpha,\beta)=(18,3)$ などは数えない。`,
          ],
          check: String.raw`$\alpha=3,4,5,6$ について ① の解を求めると $(3,18)$、$(4,10)$、$\left(5,\frac{22}3\right)$、$(6)$（重解）で、両方整数になるのは前の2つだけだった。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["3次方程式の因数分解", "1 の8乗根", "変数の置き換え", "共通解"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha^{8}=1$ を確かめ、$c=2,3.5,4-2\\sqrt2$ の3通りで $Q(z)=P(\\alpha z)$ が複数の $z$ で成り立つことを確かめた",
          "$c=4-2\\sqrt2$、$\\beta=1+\\left(\\sqrt2-1\\right)i$ のとき $\\left|P(\\beta)\\right|=0$、$\\left|Q(\\beta)\\right|<10^{-15}$ になることを確かめた",
          "$Q(z)=0$ の3解の実部を計算すると $0.707107,\;0.414214,\;1$ で、最大は $\\frac{1+\\sqrt{c-1}}{\\sqrt2}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`方程式 $P(z)=0$ をみたす複素数 $z$ をすべて求め、複素数平面上に図示する`,
          answer: String.raw`$z=1,\;1\pm\sqrt{c-1}\,i$（実部がすべて $1$ の3点）`,
          approach: String.raw`$z=1$ を代入すると $0$ になるので、$z-1$ で割れる。残りは2次方程式で、$c>1$ だから虚数解になる。`,
          blocks: [
            { k: "p", t: String.raw`$z=1$ を代入すると` },
            {
              k: "math",
              t: String.raw`P(1)=1-3+(c+2)-c=0`,
            },
            { k: "p", t: String.raw`なので $z-1$ で割り切れる。実際に割ると` },
            {
              k: "math",
              t: String.raw`P(z)=(z-1)\left(z^{2}-2z+c\right)`,
            },
            { k: "p", t: String.raw`である。$z^{2}-2z+c=0$ は` },
            {
              k: "math",
              t: String.raw`z=1\pm\sqrt{1-c}`,
            },
            { k: "p", t: String.raw`で、$c>1$ より $1-c<0$ だから` },
            {
              k: "math",
              t: String.raw`z=1\pm\sqrt{c-1}\,i`,
            },
            { k: "p", t: String.raw`である。よって3つの解は` },
            {
              k: "math",
              t: String.raw`z=1,\qquad z=1+\sqrt{c-1}\,i,\qquad z=1-\sqrt{c-1}\,i`,
            },
            {
              k: "p",
              t: String.raw`である。**図示。** 3点はいずれも実部が $1$ なので、直線 $\mathrm{Re}\,z=1$ の上に、実軸上の $1$ を中心として上下に $\sqrt{c-1}$ ずつ離れて並ぶ。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$P(z)=0$ の3解（$c=3$ のとき、$\sqrt{c-1}=\sqrt2=1.414$）。どれも実部が $1$ で、直線 $\mathrm{Re}\,z=1$（点線）の上に等間隔で並ぶ。$c$ を大きくすると上下の2点が遠ざかる。`,
                view: [-1.3, 2.9, -2.1, 2.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [1, -2.1], b: [1, 2.1], dash: true, faint: true },
                  { k: "dot", at: [1, 0], label: "1", place: "right" },
                  { k: "dot", at: [1, Math.SQRT2], label: "1 + √(c-1) i", place: "right" },
                  { k: "dot", at: [1, -Math.SQRT2], label: "1 - √(c-1) i", place: "right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$z=1$ が解であることは係数の和 $1-3+(c+2)-c=0$ から分かる。$c$ が消えるのが仕掛けである。`,
            String.raw`$c>1$ という条件があるので、2次方程式の解は必ず虚数である。実数解になる場合を考えなくてよい。`,
          ],
          check: String.raw`$c=2,3.5,4-2\sqrt2$ で3つの解を代入すると、いずれも $P$ の値が $0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`方程式 $Q(z)=0$ をみたす複素数 $z$ のうち実部が最大のものを求める`,
          answer: String.raw`$z=\dfrac{\left(1+\sqrt{c-1}\right)+\left(1-\sqrt{c-1}\right)i}{\sqrt2}$`,
          approach: String.raw`$\alpha=\dfrac{1-i}{\sqrt2}$ は $1$ の原始8乗根である。係数を見比べると $Q(z)=P(\alpha z)$ になっていることに気づく。そうすれば (1) の解を $\alpha$ で割るだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha=\dfrac{1-i}{\sqrt2}=\cos\left(-\dfrac\pi4\right)+i\sin\left(-\dfrac\pi4\right)$ なので、$\alpha$ は $1$ の原始8乗根（$\alpha^{8}=1$）である。とくに`,
            },
            {
              k: "math",
              t: String.raw`\alpha^{2}=-i,\qquad\alpha^{6}=i,\qquad\alpha^{7}=\frac1\alpha=\frac{1+i}{\sqrt2},\qquad\alpha^{3}=-\alpha^{7}`,
            },
            { k: "p", t: String.raw`である（$\alpha^{3}=\cos\left(-\frac{3\pi}4\right)+i\sin\left(-\frac{3\pi}4\right)=-\frac{1+i}{\sqrt2}$）。` },
            { k: "p", t: String.raw`**$Q(z)=P(\alpha z)$ を見抜く。** ` },
            {
              k: "math",
              t: String.raw`P(\alpha z)=\alpha^{3}z^{3}-3\alpha^{2}z^{2}+(c+2)\alpha z-c`,
            },
            {
              k: "p",
              t: String.raw`である。$\alpha^{3}=-\alpha^{7}$、$-3\alpha^{2}=-3(-i)=3i=3\alpha^{6}$ だから`,
            },
            {
              k: "math",
              t: String.raw`P(\alpha z)=-\alpha^{7}z^{3}+3\alpha^{6}z^{2}+(c+2)\alpha z-c=Q(z)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解。** したがって $Q(z)=0\iff P(\alpha z)=0$ で、(1) より $\alpha z\in\left\{1,\,1\pm\sqrt{c-1}\,i\right\}$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`z=\frac w\alpha=\alpha^{7}w=\frac{1+i}{\sqrt2}\,w\qquad\left(w=1,\,1\pm\sqrt{c-1}\,i\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{1+i}{\sqrt2}$ を掛けるのは「偏角を $45^\circ$ 回す」ことである。$k=\sqrt{c-1}>0$ とおいて実部を計算すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
w=1&:\;z=\frac{1+i}{\sqrt2},&&\mathrm{Re}\,z=\frac1{\sqrt2}\\[1mm]
w=1+ki&:\;z=\frac{(1-k)+(1+k)i}{\sqrt2},&&\mathrm{Re}\,z=\frac{1-k}{\sqrt2}\\[1mm]
w=1-ki&:\;z=\frac{(1+k)+(1-k)i}{\sqrt2},&&\mathrm{Re}\,z=\frac{1+k}{\sqrt2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$k>0$ なので $\dfrac{1+k}{\sqrt2}$ が最大で、求める解は`,
            },
            {
              k: "math",
              t: String.raw`z=\frac{\left(1+\sqrt{c-1}\right)+\left(1-\sqrt{c-1}\right)i}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$Q(z)=P(\alpha z)$ に気づけるかがすべてである。$\alpha^{8}=1$ を使って $\alpha^{3}=-\alpha^{7}$、$\alpha^{2}=-\alpha^{6}$ と書き換えると見える。`,
            String.raw`$\dfrac1\alpha=\alpha^{7}=\dfrac{1+i}{\sqrt2}$ である。$\alpha$ の共役でもある（$\left|\alpha\right|=1$ だから）。`,
            String.raw`実部の比較では $k=\sqrt{c-1}>0$ を使う。$1-k$ と $1+k$ のどちらが大きいかは $k$ の符号で決まる。`,
          ],
          check: String.raw`$c=4-2\sqrt2$ のとき $Q$ の3解の実部は $0.707107,\;0.414214,\;1$ で、最大 $1$ は $\frac{1+\sqrt{c-1}}{\sqrt2}=1.000000$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$P(z)=0$ と $Q(z)=0$ が共通解 $\beta$ をもつとき、$c$ の値と $\beta$ を求める`,
          answer: String.raw`$c=4-2\sqrt2$、$\beta=1+\left(\sqrt2-1\right)i$`,
          approach: String.raw`$P$ の3解はすべて実部が $1$ である。$Q$ の3解の実部は $\dfrac1{\sqrt2}$、$\dfrac{1\mp k}{\sqrt2}$ なので、どれが $1$ になりうるかを見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k=\sqrt{c-1}>0$ とおく。(1) より $P(z)=0$ の解はすべて実部が $1$ である。一方 (2) より $Q(z)=0$ の解の実部は`,
            },
            {
              k: "math",
              t: String.raw`\frac1{\sqrt2},\qquad\frac{1-k}{\sqrt2},\qquad\frac{1+k}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である。共通解があるなら、このどれかが $1$ に等しい。` },
            {
              k: "steps",
              items: [
                String.raw`$\dfrac1{\sqrt2}=1$：$\sqrt2=1$ となり不可`,
                String.raw`$\dfrac{1-k}{\sqrt2}=1$：$k=1-\sqrt2<0$ となり $k>0$ に反する`,
                String.raw`$\dfrac{1+k}{\sqrt2}=1$：$k=\sqrt2-1>0$。◯`,
              ],
            },
            { k: "p", t: String.raw`よって $k=\sqrt2-1$、すなわち` },
            {
              k: "math",
              t: String.raw`c=k^{2}+1=\left(\sqrt2-1\right)^{2}+1=3-2\sqrt2+1=4-2\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`である（$1.172$ ほどで、確かに $c>1$）。`,
            },
            { k: "p", t: String.raw`**$\beta$。** このときの $Q$ の解は` },
            {
              k: "math",
              t: String.raw`\beta=\frac{(1+k)+(1-k)i}{\sqrt2}=\frac{\sqrt2+\left(2-\sqrt2\right)i}{\sqrt2}=1+\left(\sqrt2-1\right)i`,
            },
            {
              k: "p",
              t: String.raw`である。これは $P$ の解 $1+ki=1+\left(\sqrt2-1\right)i$ と一致しているので、確かに共通解である。`,
            },
            {
              k: "math",
              t: String.raw`c=4-2\sqrt2,\qquad\beta=1+\left(\sqrt2-1\right)i`,
            },
          ],
          pitfalls: [
            String.raw`「$P$ の解はすべて実部が $1$」という (1) の形を使うと、比べるのが実部だけで済む。3×3 の組み合わせを総当たりしなくてよい。`,
            String.raw`$\frac{2-\sqrt2}{\sqrt2}=\frac2{\sqrt2}-1=\sqrt2-1$ である。有理化を丁寧に。`,
            String.raw`得られた $\beta$ が本当に $P$ の解でもあることを最後に確かめる。`,
          ],
          check: String.raw`$c=4-2\sqrt2=1.171572875$、$\beta=1+0.414213562\,i$ で $\left|P(\beta)\right|=0$、$\left|Q(\beta)\right|<10^{-15}$ になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["内積", "垂線の足", "領域の最短距離", "境界での最小"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{AB}}=(1,1,-1)$、$\\overrightarrow{\\mathrm{AC}}=(1,-1,-2)$ から内積 $3,6,2$ を確かめた",
          "$\\overrightarrow{\\mathrm{AQ}}=-\\overrightarrow{\\mathrm{AB}}+\\overrightarrow{\\mathrm{AC}}$ のとき $\\mathrm{Q}(3,-1,2)$ で、$\\overrightarrow{\\mathrm{OQ}}$ が $\\overrightarrow{\\mathrm{AB}},\\overrightarrow{\\mathrm{AC}}$ の両方と直交することを確かめた",
          "$(s,t)$ を $2001\\times2001$ 通りに刻んで $\\left|\\overrightarrow{\\mathrm{OP}}\\right|^{2}$ の最小を探すと $16.33335$（$s=0,\;t=0.665$）で、$\\frac{49}3=16.3333$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`内積 $\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AB}}$、$\overrightarrow{\mathrm{AC}}\cdot\overrightarrow{\mathrm{AC}}$、$\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}$ を求める`,
          answer: String.raw`$3$、$6$、$2$`,
          approach: String.raw`成分を出して計算するだけ。以降ずっと使う値なので、ここで押さえておく。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}=(1,1,-1),\qquad\overrightarrow{\mathrm{AC}}=(1,-1,-2)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AB}}&=1+1+1=3\\[1mm]
\overrightarrow{\mathrm{AC}}\cdot\overrightarrow{\mathrm{AC}}&=1+1+4=6\\[1mm]
\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}&=1-1+2=2
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}=2\ne0$ なので2つは垂直でない。また $3\cdot6-2^{2}=14\ne0$ なので平行でもなく、平面 $H$ がきちんと定まる。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{AB}}$ は $\mathrm{B}-\mathrm{A}$ である。原点からのベクトルと取り違えない。`,
          ],
          check: String.raw`成分から直接計算して $3,6,2$ を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`原点 $\mathrm{O}$ から平面 $H$ に下ろした垂線の足を $\mathrm{Q}$ とするとき、$\overrightarrow{\mathrm{AQ}}$ を $\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{AQ}}=-\overrightarrow{\mathrm{AB}}+\overrightarrow{\mathrm{AC}}$`,
          approach: String.raw`$\overrightarrow{\mathrm{AQ}}=x\overrightarrow{\mathrm{AB}}+y\overrightarrow{\mathrm{AC}}$ とおく。$\overrightarrow{\mathrm{OQ}}$ が $H$ に垂直、つまり $\overrightarrow{\mathrm{AB}}$ とも $\overrightarrow{\mathrm{AC}}$ とも直交する、という2本の式を立てる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{AQ}}=x\overrightarrow{\mathrm{AB}}+y\overrightarrow{\mathrm{AC}}$ とおくと $\overrightarrow{\mathrm{OQ}}=\overrightarrow{\mathrm{OA}}+x\overrightarrow{\mathrm{AB}}+y\overrightarrow{\mathrm{AC}}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OA}}=(3,1,3)$ なので $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{AB}}=3+1-3=1$、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{AC}}=3-1-6=-4$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OQ}}\perp H$ の条件は $\overrightarrow{\mathrm{OQ}}\cdot\overrightarrow{\mathrm{AB}}=0$ かつ $\overrightarrow{\mathrm{OQ}}\cdot\overrightarrow{\mathrm{AC}}=0$ で、(1) の値を使うと`,
            },
            {
              k: "math",
              t: String.raw`\begin{cases}1+3x+2y=0\\[1mm]-4+2x+6y=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。2本目を $2$ で割って $x+3y=2$、$x=2-3y$ を1本目に入れると`,
            },
            {
              k: "math",
              t: String.raw`1+3(2-3y)+2y=0\quad\Longleftrightarrow\quad7-7y=0\quad\Longleftrightarrow\quad y=1`,
            },
            { k: "p", t: String.raw`で、$x=2-3=-1$。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AQ}}=-\overrightarrow{\mathrm{AB}}+\overrightarrow{\mathrm{AC}}`,
            },
            {
              k: "p",
              t: String.raw`である（座標では $\mathrm{Q}(3,-1,2)$）。`,
            },
            {
              k: "note",
              t: String.raw`$x=-1<0$ なので、$\mathrm{Q}$ は領域 $K$（$s,t\ge0$）には入っていない。(4) で $K$ 上の最短を別に考える必要があるのはこのためである。`,
            },
          ],
          pitfalls: [
            String.raw`「$\overrightarrow{\mathrm{OQ}}$ が平面に垂直」であって「$\overrightarrow{\mathrm{AQ}}$ が垂直」ではない。基準点 $\mathrm{A}$ を足し忘れない。`,
            String.raw`(1) で求めた3つの内積をそのまま使うと連立方程式が立つ。成分に戻さなくてよい。`,
          ],
          check: String.raw`$\mathrm{Q}(3,-1,2)$ について $\overrightarrow{\mathrm{OQ}}\cdot\overrightarrow{\mathrm{AB}}=0$、$\overrightarrow{\mathrm{OQ}}\cdot\overrightarrow{\mathrm{AC}}=0$ を確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`領域 $K$ 上の点 $\mathrm{P}$ に対して、線分 $\mathrm{QP}$ 上に $\overrightarrow{\mathrm{AR}}=r\overrightarrow{\mathrm{AC}}$（$r$ は非負の実数）をみたす点 $\mathrm{R}$ が存在することを示す`,
          answer: String.raw`$u=\dfrac1{1+s}$ とすると $\mathrm{R}=(1-u)\mathrm{Q}+u\mathrm{P}$ が $\overrightarrow{\mathrm{AR}}=\dfrac{s+t}{1+s}\overrightarrow{\mathrm{AC}}$ をみたす`,
          approach: String.raw`線分 $\mathrm{QP}$ 上の点を $\overrightarrow{\mathrm{AX}}=(1-u)\overrightarrow{\mathrm{AQ}}+u\overrightarrow{\mathrm{AP}}$（$0\le u\le1$）と書き、$\overrightarrow{\mathrm{AB}}$ の係数を $0$ にする $u$ を探す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{AP}}=s\overrightarrow{\mathrm{AB}}+t\overrightarrow{\mathrm{AC}}$（$s,t\ge0$）とする。線分 $\mathrm{QP}$ 上の点 $\mathrm{X}$ は $0\le u\le1$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\overrightarrow{\mathrm{AX}}&=(1-u)\overrightarrow{\mathrm{AQ}}+u\overrightarrow{\mathrm{AP}}\\[1mm]
&=(1-u)\left(-\overrightarrow{\mathrm{AB}}+\overrightarrow{\mathrm{AC}}\right)+u\left(s\overrightarrow{\mathrm{AB}}+t\overrightarrow{\mathrm{AC}}\right)\\[1mm]
&=\left\{-(1-u)+us\right\}\overrightarrow{\mathrm{AB}}+\left\{(1-u)+ut\right\}\overrightarrow{\mathrm{AC}}
\end{aligned}`,
            },
            { k: "p", t: String.raw`と書ける。` },
            {
              k: "p",
              t: String.raw`**$\overrightarrow{\mathrm{AB}}$ の係数を $0$ に。** $-(1-u)+us=0$ を解くと $u(1+s)=1$、すなわち`,
            },
            { k: "math", t: String.raw`u=\frac1{1+s}` },
            {
              k: "p",
              t: String.raw`である。$s\ge0$ より $0<u\le1$ で、確かに線分上にある。この $u$ に対して`,
            },
            {
              k: "math",
              t: String.raw`r=(1-u)+ut=1-\frac{1-t}{1+s}=\frac{(1+s)-(1-t)}{1+s}=\frac{s+t}{1+s}`,
            },
            {
              k: "p",
              t: String.raw`で、$s,t\ge0$ より $r\ge0$ である。よって $\mathrm{R}$ を $u=\dfrac1{1+s}$ に対応する点にとれば`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AR}}=\frac{s+t}{1+s}\,\overrightarrow{\mathrm{AC}}\qquad\left(\frac{s+t}{1+s}\ge0\right)`,
            },
            { k: "p", t: String.raw`となり、題意の $\mathrm{R}$ が存在する。` },
            {
              k: "note",
              t: String.raw`$\mathrm{R}$ は「$\mathrm{A}$ から $\overrightarrow{\mathrm{AC}}$ 方向に伸ばした半直線」の上の点で、これは $K$ の境界（$s=0$ の側）そのものである。つまり「$K$ の任意の点から $\mathrm{Q}$ に向かうと、途中で必ず境界を横切る」と言っている。`,
            },
          ],
          pitfalls: [
            String.raw`$u$ が $0\le u\le1$ に入ることを確かめる。$s\ge0$ だから $\frac1{1+s}\le1$ である。`,
            String.raw`$r\ge0$ も示す。$s+t\ge0$、$1+s>0$ から出る。`,
            String.raw`$\mathrm{Q}$ は $K$ の外にあるが、線分 $\mathrm{QP}$ の $\mathrm{P}$ 側の部分は $K$ の中にある。境界を1回だけ横切る、という形になっている。`,
          ],
          check: String.raw`$(s,t)=(0,0),(1,0),(0,3),(2,5),(0.5,0.2)$ で $u=\frac1{1+s}$ として線分上の点を計算すると、いずれも $\mathrm{A}+r\overrightarrow{\mathrm{AC}}$ と一致し、$\left|\overrightarrow{\mathrm{OR}}\right|\le\left|\overrightarrow{\mathrm{OP}}\right|$ も成り立った。`,
        },
        {
          label: "(4)",
          task: String.raw`領域 $K$ において原点 $\mathrm{O}$ からの距離が最小となる点 $\mathrm{S}$ の座標を求める`,
          answer: String.raw`$\mathrm{S}\left(\dfrac{11}3,\;\dfrac13,\;\dfrac53\right)$（最小距離は $\dfrac7{\sqrt3}$）`,
          approach: String.raw`$\overrightarrow{\mathrm{OQ}}$ は $H$ に垂直なので、$H$ 上の点 $\mathrm{X}$ について $\left|\overrightarrow{\mathrm{OX}}\right|^{2}=\left|\overrightarrow{\mathrm{OQ}}\right|^{2}+\left|\overrightarrow{\mathrm{QX}}\right|^{2}$ である。だから $\mathrm{Q}$ に近いほど $\mathrm{O}$ に近い。(3) の $\mathrm{R}$ は線分 $\mathrm{QP}$ 上なので $\mathrm{P}$ より $\mathrm{Q}$ に近く、最小は半直線 $\overrightarrow{\mathrm{AR}}=r\overrightarrow{\mathrm{AC}}$ 上で起きる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**最小は $\overrightarrow{\mathrm{AC}}$ 方向の半直線上にある。** $\overrightarrow{\mathrm{OQ}}\perp H$ なので、$H$ 上の点 $\mathrm{X}$ について三平方の定理から`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{OX}}\right|^{2}=\left|\overrightarrow{\mathrm{OQ}}\right|^{2}+\left|\overrightarrow{\mathrm{QX}}\right|^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $\mathrm{OX}$ は $\mathrm{QX}$ の増加関数である。(3) の $\mathrm{R}$ は線分 $\mathrm{QP}$ 上にあるので $\mathrm{QR}\le\mathrm{QP}$、よって`,
            },
            { k: "math", t: String.raw`\mathrm{OR}\le\mathrm{OP}` },
            {
              k: "p",
              t: String.raw`である。つまり $K$ のどの点 $\mathrm{P}$ をとっても、$\overrightarrow{\mathrm{AR}}=r\overrightarrow{\mathrm{AC}}$（$r\ge0$）の形の点でそれ以下の距離が実現できる。したがって最小を探すのは半直線`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}}=\overrightarrow{\mathrm{OA}}+r\overrightarrow{\mathrm{AC}}\qquad(r\ge0)`,
            },
            { k: "p", t: String.raw`の上だけでよい。` },
            { k: "p", t: String.raw`**1変数の最小。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left|\overrightarrow{\mathrm{OX}}\right|^{2}&=\left|\overrightarrow{\mathrm{OA}}\right|^{2}+2r\left(\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{AC}}\right)+r^{2}\left|\overrightarrow{\mathrm{AC}}\right|^{2}\\[1mm]
&=19+2r(-4)+6r^{2}=6r^{2}-8r+19
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\left|\overrightarrow{\mathrm{OA}}\right|^{2}=9+1+9=19$）。平方完成すると`,
            },
            {
              k: "math",
              t: String.raw`6\left(r-\frac23\right)^{2}+19-\frac83=6\left(r-\frac23\right)^{2}+\frac{49}3`,
            },
            {
              k: "p",
              t: String.raw`なので、$r=\dfrac23$（$\ge0$ なので条件内）で最小 $\dfrac{49}3$ をとる。`,
            },
            { k: "p", t: String.raw`**座標。** ` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OS}}=(3,1,3)+\frac23(1,-1,-2)=\left(\frac{11}3,\;\frac13,\;\frac53\right)`,
            },
            {
              k: "p",
              t: String.raw`である。最小距離は $\sqrt{\dfrac{49}3}=\dfrac7{\sqrt3}=\dfrac{7\sqrt3}3$（$4.041$ ほど）。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{Q}$ は $K$ の外（$s=-1<0$）なので、$\mathrm{Q}$ が答えではない。(3) が「境界まで下げられる」ことを保証している。`,
            String.raw`$s=0$ の境界（$\overrightarrow{\mathrm{AC}}$ 方向）だけ調べればよい。$t=0$ の境界は (3) の議論でカバーされる（$t=0$ の点も $K$ の点なので、そこからさらに $s=0$ の半直線へ下げられる）。`,
            String.raw`$r=\frac23\ge0$ なので端点ではなく内部の最小である。もし負になれば $r=0$（つまり $\mathrm{A}$）が答えになる。`,
          ],
          check: String.raw`$(s,t)$ を $2001\times2001$ 通りに刻んで $\left|\overrightarrow{\mathrm{OP}}\right|^{2}$ の最小を探すと $16.33335$（$s=0$、$t=0.665$）で、$\frac{49}3=16.333333$ と一致した。$\mathrm{S}\left(\frac{11}3,\frac13,\frac53\right)$ で $\left|\overrightarrow{\mathrm{OS}}\right|^{2}=\frac{49}3$ である。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["反復試行", "二項分布", "微分して積分で表す", "対称性"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3,5,7$、$k=1,\\dots,n$、$p=0.2,0.5,0.73$ のすべてで、$f(k)$ の二項分布による和と右辺の積分が $10^{-7}$ 以内で一致した",
          "$k=1,2,3,4$ で $\\int_0^{1/2}x^{k}(1-x)^{k}dx$ を数値積分すると $\\frac{(k!)^{2}}{2(2k+1)!}$ と小数12桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n\ge2$ に対して $f(1)$ と $f(2)$ を求める`,
          answer: String.raw`$f(1)=1-(1-p)^{n}$、$f(2)=1-(1-p)^{n}-np(1-p)^{n-1}$`,
          approach: String.raw`「$k$ 回以上」は余事象を使うのが速い。$f(1)$ は「1回も赤が出ない」の余事象、$f(2)$ はそこから「ちょうど1回」も引く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 回のうち赤玉がちょうど $j$ 回出る確率は $ {}_n\mathrm{C}_j\,p^{j}(1-p)^{n-j}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$f(1)$。** 「1回以上」の余事象は「0回」だから`,
            },
            {
              k: "math",
              t: String.raw`f(1)=1-(1-p)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$f(2)$。** 「2回以上」の余事象は「0回または1回」だから`,
            },
            {
              k: "math",
              t: String.raw`f(2)=1-(1-p)^{n}-{}_n\mathrm{C}_1\,p(1-p)^{n-1}=1-(1-p)^{n}-np(1-p)^{n-1}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$k$ 回以上」であって「ちょうど $k$ 回」ではない。余事象のほうが項数が少ない。`,
            String.raw`$p=0$ や $p=1$ でも式は正しい（$f(1)=0$、$f(1)=1$）。`,
          ],
          check: String.raw`$n=5$、$p=0.3$ で $f(1)=0.83193$、$f(2)=0.47178$ となり、二項分布の和と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$k=1,2,\dots,n$ に対して $f(k)=\dfrac{n!}{(k-1)!\,(n-k)!}\displaystyle\int_0^p x^{k-1}(1-x)^{n-k}\,dx$ を示す`,
          answer: String.raw`両辺を $p$ で微分すると一致し、$p=0$ でともに $0$`,
          approach: String.raw`$f(k)$ を $p$ の関数と見て微分する。和が望遠鏡のように打ち消し合って1項だけ残り、それが右辺の被積分関数に一致する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$F(p)=f(k)=\displaystyle\sum_{j=k}^{n}{}_n\mathrm{C}_j\,p^{j}(1-p)^{n-j}$ とおく。右辺を $G(p)$ とする。`,
            },
            { k: "p", t: String.raw`**$F$ を微分する。** 積の微分で` },
            {
              k: "math",
              t: String.raw`F'(p)=\sum_{j=k}^{n}{}_n\mathrm{C}_j\left\{j\,p^{j-1}(1-p)^{n-j}-(n-j)\,p^{j}(1-p)^{n-j-1}\right\}`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`j\,{}_n\mathrm{C}_j=n\,{}_{n-1}\mathrm{C}_{j-1},\qquad(n-j)\,{}_n\mathrm{C}_j=n\,{}_{n-1}\mathrm{C}_{j}`,
            },
            { k: "p", t: String.raw`を使う（どちらも階乗に戻せば確かめられる）。$a_j={}_{n-1}\mathrm{C}_{j-1}\,p^{j-1}(1-p)^{n-j}$ とおくと` },
            {
              k: "math",
              t: String.raw`{}_n\mathrm{C}_j\,(n-j)\,p^{j}(1-p)^{n-j-1}=n\,{}_{n-1}\mathrm{C}_{j}\,p^{j}(1-p)^{n-j-1}=n\,a_{j+1}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`F'(p)=n\sum_{j=k}^{n}\left(a_j-a_{j+1}\right)=n\left(a_k-a_{n+1}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$a_{n+1}={}_{n-1}\mathrm{C}_{n}\,(\cdots)=0$（$ {}_{n-1}\mathrm{C}_n=0$）だから`,
            },
            {
              k: "math",
              t: String.raw`F'(p)=n\,{}_{n-1}\mathrm{C}_{k-1}\,p^{k-1}(1-p)^{n-k}=\frac{n!}{(k-1)!\,(n-k)!}\,p^{k-1}(1-p)^{n-k}`,
            },
            {
              k: "p",
              t: String.raw`である（$n\cdot\dfrac{(n-1)!}{(k-1)!\,(n-k)!}=\dfrac{n!}{(k-1)!\,(n-k)!}$）。`,
            },
            {
              k: "p",
              t: String.raw`**$G$ を微分する。** 微分と積分の関係から`,
            },
            {
              k: "math",
              t: String.raw`G'(p)=\frac{n!}{(k-1)!\,(n-k)!}\,p^{k-1}(1-p)^{n-k}`,
            },
            { k: "p", t: String.raw`で、$F'=G'$ である。` },
            {
              k: "p",
              t: String.raw`**初期値。** $p=0$ のとき、赤玉は1回も出ないので $k\ge1$ より $F(0)=0$。また $G(0)=0$（積分区間の幅が $0$）。$F-G$ は導関数が $0$ で $p=0$ の値も $0$ だから、恒等的に $0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`f(k)=\frac{n!}{(k-1)!\,(n-k)!}\int_0^p x^{k-1}(1-x)^{n-k}\,dx`,
            },
            { k: "p", t: String.raw`が成り立つ。` },
          ],
          pitfalls: [
            String.raw`$j\,{}_n\mathrm{C}_j=n\,{}_{n-1}\mathrm{C}_{j-1}$ と $(n-j)\,{}_n\mathrm{C}_j=n\,{}_{n-1}\mathrm{C}_{j}$ の2つが鍵。階乗で書いて確かめる。`,
            String.raw`和が望遠鏡（$a_k-a_{n+1}$）になる。並べ方を揃えると見える。`,
            String.raw`$p=0$ での値を合わせる。導関数が等しいだけでは定数だけずれる可能性がある。`,
          ],
          check: String.raw`$n=3,5,7$、$k=1,\dots,n$、$p=0.2,0.5,0.73$ のすべてで、左辺（二項分布の和）と右辺（数値積分）が $10^{-7}$ 以内で一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`自然数 $k$ に対して $I=\displaystyle\int_0^{\frac12}x^{k}(1-x)^{k}\,dx$ を求める`,
          answer: String.raw`$I=\dfrac{(k!)^{2}}{2\,(2k+1)!}$`,
          approach: String.raw`(2) の式で $k-1=k$、$n-k=k$ となるように、すなわち「(2) の $k$」を $k+1$、$n$ を $2k+1$、$p=\dfrac12$ にとる。すると左辺が「$2k+1$ 回中 $k+1$ 回以上」の確率になり、対称性から $\dfrac12$ だと分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) の式で $n=2k+1$、（(2) の添字を $k'$ と書いて）$k'=k+1$、$p=\dfrac12$ とする。すると $k'-1=k$、$n-k'=k$ なので`,
            },
            {
              k: "math",
              t: String.raw`f(k+1)=\frac{(2k+1)!}{k!\;k!}\int_0^{\frac12}x^{k}(1-x)^{k}\,dx=\frac{(2k+1)!}{(k!)^{2}}\,I`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**左辺は $\dfrac12$。** $p=\dfrac12$、$n=2k+1$ のとき、$f(k+1)$ は「$2k+1$ 回中、赤玉が $k+1$ 回以上出る確率」である。赤玉と白玉が同じ確率なので、赤と白を入れ替えても確率は変わらない。`,
            },
            {
              k: "p",
              t: String.raw`$2k+1$ は奇数だから「赤が $k+1$ 回以上」と「白が $k+1$ 回以上」はちょうど排反で、どちらかが必ず起こる。2つの確率は等しいので`,
            },
            {
              k: "math",
              t: String.raw`f(k+1)=\frac12`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{(2k+1)!}{(k!)^{2}}\,I=\frac12\quad\Longrightarrow\quad I=\frac{(k!)^{2}}{2\,(2k+1)!}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k=1$ なら $I=\dfrac1{2\cdot6}=\dfrac1{12}$。実際 $\int_0^{1/2}x(1-x)dx=\dfrac18-\dfrac1{24}=\dfrac1{12}$ で合う。$k=2$ なら $\dfrac4{2\cdot120}=\dfrac1{60}$。`,
            },
          ],
          pitfalls: [
            String.raw`$x^{k}(1-x)^{k}$ の指数をそろえるには $k'-1=n-k'$、つまり $n=2k'-1$ が必要である。$k'=k+1$ なら $n=2k+1$。`,
            String.raw`$n$ が**奇数**だから「$k+1$ 回以上」と「$k$ 回以下」がちょうど半々になる。偶数だと真ん中の場合が残って使えない。`,
            String.raw`$ {}_{2k+1}\mathrm{C}_{k+1}$ などを計算する必要はない。対称性だけで $\frac12$ が出る。`,
          ],
          check: String.raw`$k=1,2,3,4$ で $\int_0^{1/2}x^{k}(1-x)^{k}dx$ を数値積分すると $0.083333333333,\;0.016666666667,\;0.003571428571,\;0.000793650794$ で、$\frac{(k!)^{2}}{2(2k+1)!}$ と小数12桁まで一致した。`,
        },
      ],
    },
  ],
};
