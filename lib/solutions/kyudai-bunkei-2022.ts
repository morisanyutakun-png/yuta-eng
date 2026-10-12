import { kyudaiRikei2022 } from "@/lib/solutions/kyudai-rikei-2022";
import type { SolutionSet, SubQuestion } from "@/lib/solutions/types";

/**
 * 九州大学 2022年度（令和4年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 *
 * 文科系の第2問・第4問は理科系の第1問・第4問と重なる小問が多い。
 * 同じ解説を2通り書くと必ず食い違うので、重なる小問は理科系の側を正本として
 * 参照し、番号だけ付け替える。文科系だけの小問はここに書く。
 */

const rikei1 = kyudaiRikei2022.questions.find((q) => q.no === 1)!;
const rikei4 = kyudaiRikei2022.questions.find((q) => q.no === 4)!;

/** 理科系 第1問(1) と共通（単位法線ベクトル）。 */
const sharedN: SubQuestion = rikei1.subs[0];
/** 理科系 第1問(2) と共通（平面に関する対称点）。文科系では (3)。 */
const sharedSym: SubQuestion = { ...rikei1.subs[1], label: "(3)" };
/** 理科系 第4問の (1)(3)(4) と共通。文科系では (2) だけが別。 */
const sharedAdd: SubQuestion = rikei4.subs[0];
const sharedAra: SubQuestion = rikei4.subs[2];
const sharedAri: SubQuestion = rikei4.subs[3];

/** 第1問の曲線 C（a = 4 のとき）と直線 ℓ。 */
const CB22 = (x: number): number => Math.abs(x * x - x - 12);
const LB22 = (x: number): number => -x + 13;

export const kyudaiBunkei2022: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["絶対値のついた放物線", "接する条件", "判別式", "面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-3$ から $13$ まで $0.0001$ 刻みで動かして判別式が $0$ になる値を探すと $a=4$ だけだった",
          "$a=4$ のとき $C$ と $\\ell$ が交わる（接する）$x$ は $-5,\;1,\;5$ の3つで、$(4,0)$ を含む側の面積を数値積分すると $13.666667=\\frac{41}3$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ の値を求める`,
          answer: String.raw`$a=4$`,
          approach: String.raw`$x^{2}+(3-a)x-3a=(x+3)(x-a)$ と因数分解できる。$-3<a$ なので、$-3<x<a$ では $C$ は放物線を折り返した形（上に凸）、それ以外では下に凸である。傾きが負の $\ell$ が接するのは折り返した側で、判別式 $=0$ を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x^{2}+(3-a)x-3a=(x+3)(x-a)$ なので $C:y=\left|(x+3)(x-a)\right|$ である。$-3<a<13$ より、$-3<x<a$ では中身が負で`,
            },
            {
              k: "math",
              t: String.raw`y=-(x+3)(x-a)=-x^{2}+(a-3)x+3a`,
            },
            { k: "p", t: String.raw`（上に凸）、それ以外では` },
            {
              k: "math",
              t: String.raw`y=(x+3)(x-a)=x^{2}-(a-3)x-3a`,
            },
            { k: "p", t: String.raw`（下に凸）である。` },
            {
              k: "p",
              t: String.raw`**折り返した側との交わり。** $-x^{2}+(a-3)x+3a=-x+13$ を整理すると`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-(a-2)x-(3a-13)=0`,
            },
            { k: "p", t: String.raw`で、判別式は` },
            {
              k: "math",
              t: String.raw`D_1=(a-2)^{2}+4(3a-13)=a^{2}+8a-48=(a+12)(a-4)`,
            },
            {
              k: "p",
              t: String.raw`である。$D_1=0$ となるのは $a=-12$ か $a=4$ で、$-3<a<13$ をみたすのは $a=4$ である。`,
            },
            {
              k: "p",
              t: String.raw`**もとの側との交わり。** $x^{2}-(a-3)x-3a=-x+13$ を整理すると`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-(a-4)x-(3a+13)=0`,
            },
            { k: "p", t: String.raw`で、判別式は` },
            {
              k: "math",
              t: String.raw`D_2=(a-4)^{2}+4(3a+13)=a^{2}+4a+68=(a+2)^{2}+64>0`,
            },
            {
              k: "p",
              t: String.raw`なので、こちらでは必ず異なる2点で交わり、接することはない。`,
            },
            {
              k: "p",
              t: String.raw`よって $a=4$ である。このとき接点は $x^{2}-2x+1=0$ より $x=1$ で、$1$ は $-3<x<4$ にあるから確かに折り返した側の点である。接点は $(1,12)$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$x^{2}+(3-a)x-3a$ は $(x+3)(x-a)$ と因数分解できる。これに気づくと折れ目が $x=-3,a$ だと一目で分かる。`,
            String.raw`接する可能性は折り返した側だけではない、と最初に疑ってかかる。実際に $D_2>0$ を確かめておく。`,
            String.raw`$a=-12$ は範囲外なので捨てる。`,
          ],
          check: String.raw`$a$ を $0.0001$ 刻みで動かして $D_1=0$ となる値を探すと $a=4$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ と $\ell$ で囲まれた2つの図形のうち、点 $(a,0)$ が境界線上にある図形の面積を求める`,
          answer: String.raw`$\dfrac{41}3$`,
          approach: String.raw`$a=4$ なので $C:y=\left|x^{2}-x-12\right|$、$(a,0)=(4,0)$ である。$C$ と $\ell$ は $x=-5,\,1,\,5$ で出会う（$x=1$ は接点）。$(4,0)$ は $x=4$ の折れ目にあるので、$1\le x\le5$ の側の図形を求める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a=4$ より $C:y=\left|(x+3)(x-4)\right|=\left|x^{2}-x-12\right|$ である。`,
            },
            {
              k: "p",
              t: String.raw`**交点。** 折り返した側（$-3<x<4$）では $x^{2}-2x+1=0$ より $x=1$（接点）。もとの側では`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-x-12=-x+13\quad\Longleftrightarrow\quad x^{2}=25\quad\Longleftrightarrow\quad x=\pm5`,
            },
            {
              k: "p",
              t: String.raw`で、$x=-5\le-3$、$x=5\ge4$ とどちらももとの側にある。よって $C$ と $\ell$ は $x=-5,\,1,\,5$ で出会い、囲まれる図形は $-5\le x\le1$ と $1\le x\le5$ の2つである。`,
            },
            {
              k: "p",
              t: String.raw`**どちらを求めるか。** $(4,0)$ は $x=4$ で $C$ 上の点（$y=\left|4^{2}-4-12\right|=0$）であり、$1\le x\le5$ の側の境界にある。こちらを求める。`,
            },
            {
              k: "p",
              t: String.raw`**積分。** $1\le x\le4$ では $C=-x^{2}+x+12$、$4\le x\le5$ では $C=x^{2}-x-12$ である。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\int_1^4\left\{(-x+13)-\left(-x^{2}+x+12\right)\right\}dx+\int_4^5\left\{(-x+13)-\left(x^{2}-x-12\right)\right\}dx\\[1mm]
&=\int_1^4\left(x^{2}-2x+1\right)dx+\int_4^5\left(25-x^{2}\right)dx\\[1mm]
&=\int_1^4(x-1)^{2}dx+\int_4^5\left(25-x^{2}\right)dx
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。それぞれ計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_1^4(x-1)^{2}dx&=\left[\frac{(x-1)^{3}}3\right]_1^4=\frac{27}3=9\\[1mm]
\int_4^5\left(25-x^{2}\right)dx&=\left[25x-\frac{x^{3}}3\right]_4^5=\frac{250}3-\frac{236}3=\frac{14}3
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S=9+\frac{14}3=\frac{41}3` },
            { k: "p", t: String.raw`である（$13.67$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=4$ のときの $C:y=\left|x^{2}-x-12\right|$ と $\ell:y=-x+13$。$x=1$ で接し、$x=-5$ と $x=5$ で交わる。点 $(4,0)$（折れ目）を境界にもつのは右側の図形で、その面積が $\frac{41}3$。左側（$-5\le x\le1$）は $\frac{116}3$ である。`,
                view: [-7.4, 7.4, -2.6, 22.4],
                step: { x: 2, y: 5 },
                items: [
                  { k: "curve", f: CB22, from: -7.2, to: 7.2 },
                  { k: "seg", a: [-7.4, LB22(-7.4)], b: [7.4, LB22(7.4)], dash: true },
                  { k: "fillBetween", top: LB22, bottom: CB22, from: 1, to: 4 },
                  { k: "fillBetween", top: LB22, bottom: CB22, from: 4, to: 5 },
                  { k: "dot", at: [1, 12], label: "接点 (1, 12)", place: "above-left" },
                  { k: "dot", at: [4, 0], label: "(4, 0)", place: "below-right" },
                  { k: "dot", at: [-3, 0], label: "-3", place: "below-left" },
                  { k: "dot", at: [5, 8], label: "(5, 8)", place: "right" },
                  { k: "dot", at: [-5, 18], label: "(-5, 18)", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=4$ で $C$ が折れるので、積分を2つに分ける。`,
            String.raw`$(a,0)=(4,0)$ がどちらの図形の境界にあるかを確かめる。左側（$-5\le x\le1$）には含まれない。`,
            String.raw`$\int_1^4\left(x^{2}-2x+1\right)dx$ は $(x-1)^{2}$ の積分である。接しているので完全平方になる。`,
          ],
          check: String.raw`数値積分すると右側が $13.666667=\frac{41}3$、左側が $38.666667=\frac{116}3$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["外積", "単位法線ベクトル", "点と平面の距離", "対称点"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec n=\\frac13(2,-2,-1)$、$\\mathrm{PQ}=3$、$\\mathrm{Q}(2,2,0)$、$\\mathrm{P}'(0,4,1)$ を座標から確かめた（理科系2022第1問と共通の確認）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        sharedN,
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{P}$ から平面 $\alpha$ に垂線を下ろし、その交点を $\mathrm{Q}$ とするとき、線分 $\mathrm{PQ}$ の長さを求める`,
          answer: String.raw`$\mathrm{PQ}=3$`,
          approach: String.raw`$\alpha$ は原点を通り $\vec n$ を法線とする平面なので、$\mathrm{P}$ から $\alpha$ までの距離は $\left|\overrightarrow{\mathrm{OP}}\cdot\vec n\right|$ である。$\vec n$ の大きさが $1$ なので割り算も要らない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha$ は $\mathrm{O},\mathrm{A},\mathrm{B}$ を通る平面、すなわち原点を通り $\vec n$ を法線にもつ平面である。$\mathrm{P}(4,0,-1)$ から $\alpha$ に下ろした垂線の足 $\mathrm{Q}$ について`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}=\overrightarrow{\mathrm{OP}}-\left(\overrightarrow{\mathrm{OP}}\cdot\vec n\right)\vec n`,
            },
            {
              k: "p",
              t: String.raw`であり、$\mathrm{PQ}=\left|\overrightarrow{\mathrm{OP}}\cdot\vec n\right|$ である（$\left|\vec n\right|=1$ だから）。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}\cdot\vec n=\frac{4\cdot2+0\cdot(-2)+(-1)\cdot(-1)}3=\frac{8+1}3=3`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{PQ}=3` },
            {
              k: "p",
              t: String.raw`である。ついでに $\overrightarrow{\mathrm{OQ}}=(4,0,-1)-3\cdot\dfrac13(2,-2,-1)=(2,2,0)$ で、$\mathrm{Q}(2,2,0)$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\vec n\right|=1$ なので「点と平面の距離」が内積そのものになる。(1) で大きさを $1$ にしておいた効果である。`,
            String.raw`平面が原点を通るので定数項がない。通らない平面なら $\left|\overrightarrow{\mathrm{AP}}\cdot\vec n\right|$ のように基準点をとる。`,
          ],
          check: String.raw`$\mathrm{Q}=(2,2,0)$ は $\overrightarrow{\mathrm{OQ}}\cdot\vec n=\frac{4-4-0}3=0$ で平面上にあり、$\mathrm{PQ}=\left|(2,2,1)\right|=3$ である。`,
        },
        sharedSym,
      ],
    },
    {
      no: 3,
      field: "整式",
      topics: ["因数定理", "虚数解と共役", "解と係数の関係", "整数解の絞り込み"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(2)=16+48-4k+4k-64=0$ が $k$ によらず成り立つことを確かめた",
          "$m\\left(p^{2}+q^{2}\\right)=32$、$m=8+2p$ をみたす正の整数 $m$ と整数 $p,q$（$q\\ne0$）を全探索すると $(m,p,q,k)=(4,-2,2,-8),(8,0,2,12)$ の2通りだった",
          "$k=-8$ では根が $2,-4,-2\\pm2i$、$k=12$ では $2,-8,\\pm2i$ で、どちらも $f$ の値が $0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)$ が $x-2$ で割り切れることを示す`,
          answer: String.raw`$f(2)=16+48-4k+4k-64=0$`,
          approach: String.raw`因数定理そのもの。$k$ を含む2つの項がちょうど打ち消し合う。`,
          blocks: [
            { k: "p", t: String.raw`$x=2$ を代入すると` },
            {
              k: "math",
              t: String.raw`f(2)=2^{4}+6\cdot2^{3}-k\cdot2^{2}+2k\cdot2-64=16+48-4k+4k-64=0`,
            },
            {
              k: "p",
              t: String.raw`である。$-4k$ と $+4k$ が打ち消すので、$k$ によらず $f(2)=0$ になる。因数定理より $f(x)$ は $x-2$ で割り切れる。`,
            },
            {
              k: "note",
              t: String.raw`実際に割ると`,
            },
            {
              k: "math",
              t: String.raw`f(x)=(x-2)\left\{x^{3}+8x^{2}+(16-k)x+32\right\}`,
            },
            { k: "p", t: String.raw`となる。この3次式を $g(x)$ とおく。` },
          ],
          pitfalls: [
            String.raw`$-kx^{2}$ と $+2kx$ に $x=2$ を入れると $-4k$ と $+4k$ になる。ここが仕掛けである。`,
          ],
          check: String.raw`$k$ をいくつか変えても $f(2)=0$ になり、商が $x^{3}+8x^{2}+(16-k)x+32$ であることを確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`方程式 $f(x)=0$ は負の実数解をもつことを示す`,
          answer: String.raw`$g$ の3解の積が $-32$ で、虚数解の積は正だから残る実数解は負`,
          approach: String.raw`$f(x)=0$ が虚数解をもち、係数が実数なので、虚数解は共役の対で現れる。$2$ はすでに実数解なので、残る3解（$g$ の解）のうち2つが共役な虚数、1つが実数である。その実数解の符号を解と係数の関係で決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f$ の係数は実数なので、虚数解は共役の対で現れる。(1) より $x=2$ は実数解だから、残る3つ（$g(x)=x^{3}+8x^{2}+(16-k)x+32=0$ の解）のうち2つが共役な虚数 $z,\overline z$、1つが実数 $r$ である。`,
            },
            {
              k: "p",
              t: String.raw`**解と係数の関係。** $g$ の3解の積は $-\dfrac{32}1=-32$ なので`,
            },
            {
              k: "math",
              t: String.raw`r\cdot z\overline z=-32,\qquad\text{すなわち}\quad r\left|z\right|^{2}=-32`,
            },
            {
              k: "p",
              t: String.raw`である。$z$ は虚数なので $z\ne0$、よって $\left|z\right|^{2}>0$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`r=-\frac{32}{\left|z\right|^{2}}<0`,
            },
            {
              k: "p",
              t: String.raw`となり、$f(x)=0$ は負の実数解 $r$ をもつ。`,
            },
          ],
          pitfalls: [
            String.raw`「虚数解をもつ」という条件から、$g$ の3解が「実数1つ＋共役な虚数2つ」に決まる。3つとも実数の場合は起こらない。`,
            String.raw`$z\overline z=\left|z\right|^{2}>0$ である。ここが符号を決める。`,
            String.raw`$g$ の定数項は $32$、最高次係数は $1$ なので、3解の積は $-32$ である（$(-1)^{3}\cdot\frac{32}1$）。`,
          ],
          check: String.raw`$k=-8$ では $r=-4$、$k=12$ では $r=-8$ で、どちらも負だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$f(x)=0$ のすべての実数解が整数、すべての虚数解の実部と虚部がともに整数であるとき、$k$ をすべて求める`,
          answer: String.raw`$k=-8,\;12$`,
          approach: String.raw`$g$ の3解を $r$（負の整数）と $p\pm qi$（$p,q$ 整数、$q\ne0$）として、係数比較（解と係数の関係）で3本の式を立てる。$x^{2}$ の係数の式と定数項の式を組み合わせると、候補が有限個に絞れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$g(x)=x^{3}+8x^{2}+(16-k)x+32$ の3解を $r$ と $p\pm qi$（$q\ne0$）とする。条件より $r,p,q$ は整数で、(2) より $r<0$ である。$m=-r>0$ とおく。`,
            },
            { k: "p", t: String.raw`解と係数の関係より` },
            {
              k: "steps",
              items: [
                String.raw`和：$r+2p=-8$、すなわち $m=8+2p$`,
                String.raw`積：$r\left(p^{2}+q^{2}\right)=-32$、すなわち $m\left(p^{2}+q^{2}\right)=32$`,
                String.raw`2つずつの積の和：$2pr+\left(p^{2}+q^{2}\right)=16-k$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**候補を絞る。** $m=8+2p$ より $m$ は偶数で、$m\left(p^{2}+q^{2}\right)=32$ より $m$ は $32$ の約数である。よって $m\in\{2,4,8,16,32\}$。それぞれ $p=\dfrac{m-8}2$、$p^{2}+q^{2}=\dfrac{32}m$ を調べる。`,
            },
            {
              k: "math",
              t: String.raw`\begin{array}{c|c|c|c}
m&p&p^{2}+q^{2}&q^{2}\\\hline
2&-3&16&7\;(\times)\\
4&-2&8&4\;(\bigcirc,\;q=\pm2)\\
8&0&4&4\;(\bigcirc,\;q=\pm2)\\
16&4&2&-14\;(\times)\\
32&12&1&-143\;(\times)
\end{array}`,
            },
            { k: "p", t: String.raw`**$k$ を出す。** ` },
            {
              k: "steps",
              items: [
                String.raw`$m=4$（$r=-4$、$p=-2$、$q=\pm2$）：$2pr+\left(p^{2}+q^{2}\right)=2(-2)(-4)+8=24=16-k$ より $k=-8$`,
                String.raw`$m=8$（$r=-8$、$p=0$、$q=\pm2$）：$0+4=4=16-k$ より $k=12$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**確かめ。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
k=-8&:\;f(x)=(x-2)(x+4)\left(x^{2}+4x+8\right)\;\Rightarrow\;x=2,\,-4,\,-2\pm2i\\[1mm]
k=12&:\;f(x)=(x-2)(x+8)\left(x^{2}+4\right)\;\Rightarrow\;x=2,\,-8,\,\pm2i
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、どちらも虚数解をもち、実数解も虚数解の実部・虚部もすべて整数である。したがって`,
            },
            { k: "math", t: String.raw`k=-8,\;12` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$m=8+2p$ から $m$ が偶数と分かる。$m\mid32$ と合わせて候補が5つに減る。`,
            String.raw`$q\ne0$（虚数解）なので $q^{2}\ge1$ が必要である。$q^{2}=0$ の場合は除く。`,
            String.raw`$q^{2}$ が平方数になるかも確かめる。$m=2$ では $q^{2}=7$ で整数にならない。`,
            String.raw`最後に $f$ を実際に因数分解して、条件をすべてみたすことを確かめておく。`,
          ],
          check: String.raw`$m\left(p^{2}+q^{2}\right)=32$、$m=8+2p$ を全探索すると $(m,p,q,k)=(4,-2,2,-8),(8,0,2,12)$ の2通りで、$k=-8$ の根 $2,-4,-2\pm2i$、$k=12$ の根 $2,-8,\pm2i$ はいずれも $f$ を $0$ にした。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["定積分の定義", "導関数の定義", "関数の増減", "区分求積法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "増加する整式 $f(x)=x^{3}+x$、$f(x)=x^{5}+2x$ について、$n=10,100,1000$ で $0\\le\\int_0^1f-S_n\\le\\frac{f(1)-f(0)}n$ が成り立つことを確かめた（理科系2022第4問と共通の確認）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        sharedAdd,
        {
          label: "(2)",
          task: String.raw`定積分の定義 ① と、関数の増減と導関数の関係を用いて、$a<b$ かつ区間 $a\le x\le b$ で $g(x)>0$ ならば $\displaystyle\int_a^bg(x)\,dx>0$ であることを示す`,
          answer: String.raw`原始関数 $G$ は $G'=g>0$ より増加するので $G(b)>G(a)$`,
          approach: String.raw`「導関数が正なら増加」をそのまま使う。$\int_a^bg=G(b)-G(a)$ なので、$G$ が増加すれば正だと分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$G'(x)=g(x)$ となる $G$ をとる。定義 ① より`,
            },
            { k: "math", t: String.raw`\int_a^bg(x)\,dx=G(b)-G(a)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$G$ は増加する。** 区間 $a\le x\le b$ で $G'(x)=g(x)>0$ なので、関数の増減と導関数の関係より $G$ はこの区間で（狭義）増加する。`,
            },
            { k: "p", t: String.raw`$a<b$ だから` },
            {
              k: "math",
              t: String.raw`G(b)>G(a),\qquad\text{すなわち}\quad\int_a^bg(x)\,dx=G(b)-G(a)>0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この (2) は、性質 (C) を「差 $g-h$ に使う」ときの土台になる。$g\ge h$ なら $\int(g-h)\ge0$、つまり $\int g\ge\int h$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「$g>0$ だから積分も正」は見た目には当たり前だが、ここでは定義 ① から導くことが求められている。`,
            String.raw`増減を調べる相手は $g$ ではなく**原始関数 $G$** である。`,
            String.raw`$a<b$ を使う。$a=b$ なら積分は $0$ になってしまう。`,
          ],
          check: String.raw`$g(x)=x^{2}+1>0$、$[a,b]=[0,2]$ で $\int=\frac83+2>0$ となり、確かに正である。`,
        },
        sharedAra,
        sharedAri,
      ],
    },
  ],
};
