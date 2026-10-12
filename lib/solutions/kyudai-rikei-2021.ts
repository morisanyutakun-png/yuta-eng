import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2021年度（令和3年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第3問の境界曲線 y = x - x log x。x = 0 では極限値 0 とする。 */
const BD21 = (x: number): number => (x <= 0 ? 0 : x - x * Math.log(x));

/** 第1問(2)の、交わりの円の面積 (π/9)(-16r² + 20r - 4)。 */
const AR21 = (r: number): number => (Math.PI / 9) * (-16 * r * r + 20 * r - 4);

export const kyudaiRikei2021: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間図形",
      topics: ["内接球", "点と平面の距離", "球と平面の交わり", "2次関数の最大"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(\\frac14,\\frac14,\\frac14\\right)$ から4つの面（3つの座標平面と平面 $\\mathrm{ABC}$）までの距離がすべて $\\frac14$ になることを確かめた",
          "$r$ を $2$ 万点に刻んで交わりの円の面積を計算すると、最大は $r=0.625$ での $0.785398$ となり、$\\frac\\pi4=0.785398$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四面体 $\mathrm{OABC}$ に内接する球の中心の座標を求める`,
          answer: String.raw`$\left(\dfrac14,\;\dfrac14,\;\dfrac14\right)$`,
          approach: String.raw`3つの面が座標平面なので、中心は $(r,r,r)$ の形になる（$r$ は半径）。残る面 $\mathrm{ABC}$ までの距離も $r$ になるように $r$ を決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`四面体の4つの面は、$xy$ 平面（$\mathrm{O},\mathrm{A},\mathrm{B}$）、$yz$ 平面（$\mathrm{O},\mathrm{B},\mathrm{C}$）、$zx$ 平面（$\mathrm{O},\mathrm{A},\mathrm{C}$）、そして平面 $\mathrm{ABC}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**中心の形。** 内接球の中心は四面体の内部にあり、3つの座標平面からの距離がどれも半径 $r$ に等しい。内部では $x,y,z>0$ だから、中心は $(r,r,r)$ である。`,
            },
            {
              k: "p",
              t: String.raw`**平面 $\mathrm{ABC}$。** $\mathrm{A}(1,0,0)$、$\mathrm{B}(0,1,0)$、$\mathrm{C}(0,0,2)$ を通るので、切片形で`,
            },
            {
              k: "math",
              t: String.raw`\frac x1+\frac y1+\frac z2=1\quad\Longleftrightarrow\quad2x+2y+z=2`,
            },
            { k: "p", t: String.raw`である。点 $(r,r,r)$ との距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|2r+2r+r-2\right|}{\sqrt{2^{2}+2^{2}+1^{2}}}=\frac{\left|5r-2\right|}3`,
            },
            {
              k: "p",
              t: String.raw`である。内部の点では $2r+2r+r<2$（原点側）なので $5r-2<0$ であり、これが $r$ に等しいとおくと`,
            },
            {
              k: "math",
              t: String.raw`\frac{2-5r}3=r\quad\Longrightarrow\quad2-5r=3r\quad\Longrightarrow\quad r=\frac14`,
            },
            {
              k: "p",
              t: String.raw`である。よって中心は $\left(\dfrac14,\dfrac14,\dfrac14\right)$（半径 $\dfrac14$）である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|5r-2\right|$ の絶対値を外すとき、中心が原点と同じ側にあることを使う。$\frac{5r-2}3=r$ と外すと $r=-1$ となって不適。`,
            String.raw`平面 $\mathrm{ABC}$ は $x+y+z=1$ ではない。$\mathrm{C}$ の $z$ 座標が $2$ なので切片が $2$ になる。`,
          ],
          check: String.raw`$\left(\frac14,\frac14,\frac14\right)$ から4面までの距離はどれも $0.25$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`中心の座標がすべて正で3つの座標平面すべてに接する球が平面 $\mathrm{ABC}$ と交わるとき、その交わりの円の面積の最大値を求める`,
          answer: String.raw`$\dfrac\pi4$（半径 $r=\dfrac58$ のとき）`,
          approach: String.raw`条件から球は中心 $(r,r,r)$、半径 $r$ である。平面との距離を $d$ とすると、交わりの円の半径 $\rho$ は $\rho^{2}=r^{2}-d^{2}$。これを $r$ の2次関数として最大にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3つの座標平面に接し中心の座標がすべて正だから、中心は $(r,r,r)$、半径は $r>0$ である。(1) と同じく、平面 $\mathrm{ABC}$ までの距離は`,
            },
            { k: "math", t: String.raw`d=\frac{\left|5r-2\right|}3` },
            {
              k: "p",
              t: String.raw`である。球が平面と交わる条件は $d<r$ で、そのとき交わりは半径 $\rho=\sqrt{r^{2}-d^{2}}$ の円になる。面積は`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\pi\rho^{2}=\pi\left(r^{2}-\frac{(5r-2)^{2}}9\right)=\frac\pi9\left(9r^{2}-25r^{2}+20r-4\right)\\[1mm]
&=\frac\pi9\left(-16r^{2}+20r-4\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最大。** $-16r^{2}+20r-4$ は上に凸で、$r=\dfrac{20}{32}=\dfrac58$ のとき最大になる。このとき`,
            },
            {
              k: "math",
              t: String.raw`-16\cdot\frac{25}{64}+20\cdot\frac58-4=-\frac{25}4+\frac{25}2-4=\frac{-25+50-16}4=\frac94`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S=\frac\pi9\cdot\frac94=\frac\pi4` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**交わっているか。** $r=\dfrac58$ のとき $d=\dfrac{\left|\frac{25}8-2\right|}3=\dfrac{9/8}3=\dfrac38<\dfrac58=r$ なので、確かに交わっている。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`半径 $r$ に対する交わりの円の面積 $S=\frac\pi9\left(-16r^{2}+20r-4\right)$。$S>0$ となるのは $\frac14<r<1$ で、$r=\frac58$ で最大 $\frac\pi4=0.785$ をとる。両端 $r=\frac14,1$ では球が平面に接し、円が1点につぶれる。`,
                view: [0.05, 1.25, -0.12, 0.95],
                step: { x: 0.25, y: 0.25 },
                items: [
                  { k: "curve", f: AR21, from: 0.25, to: 1 },
                  { k: "dot", at: [0.625, Math.PI / 4], label: "(5/8, π/4)", place: "above" },
                  { k: "dot", at: [0.25, 0], label: "1/4", place: "below" },
                  { k: "dot", at: [1, 0], label: "1", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「交わる」条件 $d<r$ を確かめる。最大を与える $r$ がこの範囲に入っていないと答えにならない。`,
            String.raw`$S$ は $\rho$ ではなく $\rho^{2}$ に比例する。$\rho$ を最大にする $r$ と同じだが、計算は $\rho^{2}$ のほうが楽である。`,
            String.raw`(1) の球（$r=\frac14$）は平面に接していて、交わりは1点である。$r=\frac14$ は $S=0$ で、最大ではない。`,
          ],
          check: String.raw`$r$ を $2$ 万点に刻んで $S$ を計算すると、最大は $r=0.625$ での $0.785398$ で、$\frac\pi4=0.785398$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["判別式", "共役な虚数解", "外心", "直角三角形"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\theta=\\frac\\pi{24},\\frac\\pi{12}\\pm10^{-9},\\frac\\pi8$ で判別式の符号を調べ、$\\theta<\\frac\\pi{12}$ でだけ負になることを確かめた",
          "$\\theta=0.05,0.1,0.2$ で $\\gamma=\\frac1{4\\sin\\theta}$ から $\\mathrm{O},\\mathrm{A},\\mathrm{B}$ までの距離が小数6桁まで一致することを確かめた",
          "$\\sin2\\theta=\\frac14$ のとき $\\overrightarrow{\\mathrm{CO}}\\cdot\\overrightarrow{\\mathrm{CA}}=0$ となり、$\\tan\\theta=0.127016654=4-\\sqrt{15}$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$(*)$ が実数解をもたないような $\theta$ の範囲を求める`,
          answer: String.raw`$0<\theta<\dfrac\pi{12}$`,
          approach: String.raw`判別式が負になる条件を書き、$\sin\theta\cos\theta$ をまとめて $\sin2\theta$ にする。`,
          blocks: [
            { k: "p", t: String.raw`$(*)$ の判別式を $D$ とすると` },
            {
              k: "math",
              t: String.raw`\frac D4=4\cos^{2}\theta-\frac1{\tan\theta}=4\cos^{2}\theta-\frac{\cos\theta}{\sin\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。実数解をもたない条件は $\dfrac D4<0$ である。$0<\theta<\dfrac\pi4$ では $\cos\theta>0$、$\sin\theta>0$ なので、両辺を $\cos\theta>0$ で割って`,
            },
            {
              k: "math",
              t: String.raw`4\cos\theta<\frac1{\sin\theta}\quad\Longleftrightarrow\quad4\sin\theta\cos\theta<1\quad\Longleftrightarrow\quad2\sin2\theta<1`,
            },
            {
              k: "p",
              t: String.raw`すなわち $\sin2\theta<\dfrac12$ である。$0<\theta<\dfrac\pi4$ より $0<2\theta<\dfrac\pi2$ で、この範囲で $\sin$ は増加だから`,
            },
            {
              k: "math",
              t: String.raw`2\theta<\frac\pi6\quad\Longleftrightarrow\quad\theta<\frac\pi{12}`,
            },
            { k: "p", t: String.raw`である。よって求める範囲は $0<\theta<\dfrac\pi{12}$ である。` },
          ],
          pitfalls: [
            String.raw`$\sin\theta>0$ を掛けるので不等号の向きは変わらない。$0<\theta<\frac\pi4$ という前提があるおかげである。`,
            String.raw`$2\sin2\theta<1$ であって $\sin2\theta<1$ ではない。$4\sin\theta\cos\theta=2\sin2\theta$ の係数に注意。`,
          ],
          check: String.raw`$\theta=\frac\pi{24}$ では $\frac D4=-3.66<0$、$\theta=\frac\pi{12}$ でちょうど $0$、$\theta=\frac\pi8$ では $1>0$ となった。`,
        },
        {
          label: "(2)",
          task: String.raw`$(*)$ の2つの虚数解を $\alpha,\beta$（$\alpha$ の虚部が大きい）とし、$\mathrm{A}(\alpha),\mathrm{B}(\beta),\mathrm{O}(0)$ を通る円の中心を $\mathrm{C}(\gamma)$ とするとき、$\gamma$ を $\theta$ で表す`,
          answer: String.raw`$\gamma=\dfrac1{4\sin\theta}$`,
          approach: String.raw`$\alpha,\beta$ は互いに共役で、実部は $2\cos\theta$ である。$\mathrm{O}$ も実軸上にあるので、3点は実軸に関して対称に並び、外心も実軸上にある。あとは $\left|\gamma\right|=\left|\gamma-\alpha\right|$ を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$(*)$ は実数係数なので、虚数解は互いに共役である。解と係数の関係から和は $4\cos\theta$、積は $\dfrac1{\tan\theta}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\alpha=2\cos\theta+si,\qquad\beta=2\cos\theta-si,\qquad s=\sqrt{\frac1{\tan\theta}-4\cos^{2}\theta}>0`,
            },
            { k: "p", t: String.raw`である（$\alpha$ の虚部のほうが大きい）。` },
            {
              k: "p",
              t: String.raw`**外心は実軸上。** $\mathrm{A},\mathrm{B}$ は実軸に関して対称、$\mathrm{O}$ は実軸上なので、3点のなす図形は実軸対称である。よって外心も実軸上にあり、$\gamma$ は実数である。`,
            },
            {
              k: "p",
              t: String.raw`**$\left|\gamma\right|=\left|\gamma-\alpha\right|$。** 両辺を2乗して`,
            },
            {
              k: "math",
              t: String.raw`\gamma^{2}=\left(\gamma-2\cos\theta\right)^{2}+s^{2}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`0=-4\gamma\cos\theta+4\cos^{2}\theta+s^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$s^{2}=\dfrac1{\tan\theta}-4\cos^{2}\theta$ を入れると $4\cos^{2}\theta$ が消えて`,
            },
            {
              k: "math",
              t: String.raw`4\gamma\cos\theta=\frac1{\tan\theta}=\frac{\cos\theta}{\sin\theta}`,
            },
            { k: "p", t: String.raw`となり、$\cos\theta\ne0$ で割って` },
            { k: "math", t: String.raw`\gamma=\frac1{4\sin\theta}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left|\gamma-\beta\right|$ も同じ値になる（$\beta$ は $\alpha$ の共役で $\gamma$ は実数だから）。だから1本の式だけで決まる。`,
            },
          ],
          pitfalls: [
            String.raw`$\gamma$ が実数であることを、対称性から先に言っておく。言わずに $\gamma=u+vi$ とおくと計算が倍になる。`,
            String.raw`$s^{2}$ を代入すると $4\cos^{2}\theta$ がきれいに消える。ここを展開したままにしないこと。`,
            String.raw`(1) の範囲では $s>0$ なので、$\mathrm{O},\mathrm{A},\mathrm{B}$ は一直線上になく、外心がただ1つ定まる。`,
          ],
          check: String.raw`$\theta=0.05,0.1,0.2$ で $\gamma=\frac1{4\sin\theta}$ から $\mathrm{O},\mathrm{A},\mathrm{B}$ までの距離を計算すると、どれも小数6桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`三角形 $\mathrm{OAC}$ が直角三角形になるような $\theta$ に対する $\tan\theta$ の値を求める`,
          answer: String.raw`$\tan\theta=4-\sqrt{15}$`,
          approach: String.raw`$\mathrm{C}$ は外心なので $\mathrm{CO}=\mathrm{CA}$、つまり $\triangle\mathrm{OAC}$ は $\mathrm{C}$ を頂点とする二等辺三角形である。だから直角になれるのは頂角 $\mathrm{C}$ だけ。$\overrightarrow{\mathrm{CO}}\perp\overrightarrow{\mathrm{CA}}$ を書き下す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**直角の位置。** $\mathrm{C}$ は $\mathrm{O},\mathrm{A},\mathrm{B}$ を通る円の中心だから $\mathrm{CO}=\mathrm{CA}$（ともに半径）である。よって $\triangle\mathrm{OAC}$ は二等辺三角形で、底角 $\angle\mathrm{COA}$ と $\angle\mathrm{CAO}$ は等しい。`,
            },
            {
              k: "p",
              t: String.raw`この2つが直角だと内角の和が $180^\circ$ を超えてしまうので、直角になりうるのは頂角 $\angle\mathrm{OCA}$ だけである。`,
            },
            {
              k: "p",
              t: String.raw`**垂直条件。** $\gamma$ は実数、$\alpha=2\cos\theta+si$ だから`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{CO}}=(-\gamma,\;0),\qquad\overrightarrow{\mathrm{CA}}=\left(2\cos\theta-\gamma,\;s\right)`,
            },
            { k: "p", t: String.raw`で、内積が $0$ となる条件は` },
            {
              k: "math",
              t: String.raw`-\gamma\left(2\cos\theta-\gamma\right)=0`,
            },
            { k: "p", t: String.raw`である。$\gamma=\dfrac1{4\sin\theta}\ne0$ なので` },
            {
              k: "math",
              t: String.raw`\gamma=2\cos\theta\quad\Longleftrightarrow\quad\frac1{4\sin\theta}=2\cos\theta`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`8\sin\theta\cos\theta=1\quad\Longleftrightarrow\quad4\sin2\theta=1\quad\Longleftrightarrow\quad\sin2\theta=\frac14`,
            },
            { k: "p", t: String.raw`である（(1) の範囲 $\sin2\theta<\frac12$ をみたしている）。` },
            { k: "p", t: String.raw`**$\tan\theta$ を出す。** $t=\tan\theta$ とおくと $\sin2\theta=\dfrac{2t}{1+t^{2}}$ だから` },
            {
              k: "math",
              t: String.raw`\frac{2t}{1+t^{2}}=\frac14\quad\Longleftrightarrow\quad t^{2}-8t+1=0\quad\Longleftrightarrow\quad t=4\pm\sqrt{15}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<\theta<\dfrac\pi{12}$ より $0<t<\tan\dfrac\pi{12}=2-\sqrt3=0.268$ なので、$4+\sqrt{15}=7.87$ は不適。よって`,
            },
            { k: "math", t: String.raw`\tan\theta=4-\sqrt{15}` },
            { k: "p", t: String.raw`である（$0.127$ ほど）。` },
          ],
          pitfalls: [
            String.raw`「$\mathrm{C}$ が外心だから $\mathrm{CO}=\mathrm{CA}$」に気づくと、直角の場所が1つに決まる。3通りの場合分けをしなくてよい。`,
            String.raw`$t=4+\sqrt{15}$ を切るのに (1) の範囲を使う。$\tan\frac\pi{12}=2-\sqrt3$ である。`,
            String.raw`$\sin2\theta=\frac14$ から $\theta$ を求める必要はない。$\tan\theta$ だけが問われている。`,
          ],
          check: String.raw`$\sin2\theta=\frac14$ となる $\theta=0.12634$ で $\overrightarrow{\mathrm{CO}}\cdot\overrightarrow{\mathrm{CA}}=0$、$\gamma-2\cos\theta=0$ となり、$\tan\theta=0.127016654$、$4-\sqrt{15}=0.127016654$ で一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分法",
      topics: ["すべての t で成り立つ条件", "最小値", "領域の図示", "回転体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ を $2$ 万通りランダムにとって $\\min_t\\left(e^{t}-xt\\right)$ を数値的に求めると $x-x\\log x$ と一致した",
          "$x<0$ では $e^{t}-xt$ が下に有界でないことを確かめた",
          "回転体の体積を $40$ 万点で数値積分すると $2.69607687$ となり、$\\frac{\\pi\\left(2e^{3}-17\\right)}{27}=2.69607687$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件 $(*)$ をみたす点 $(x,y)$ 全体の集合を座標平面上に図示する`,
          answer: String.raw`$x\ge0$ かつ $y\le x-x\log x$（$x=0$ では $y\le0$）の部分`,
          approach: String.raw`「すべての $t$ で $y\le e^{t}-xt$」は「$y\le\min_t\left(e^{t}-xt\right)$」と同じである。$x$ の符号で場合を分けて最小値を調べる。`,
          blocks: [
            { k: "p", t: String.raw`$g(t)=e^{t}-xt$ とおく。条件 $(*)$ は「すべての $t$ で $y\le g(t)$」、つまり $y\le\displaystyle\inf_{t}g(t)$ である。` },
            { k: "math", t: String.raw`g'(t)=e^{t}-x` },
            { k: "p", t: String.raw`で場合を分ける。` },
            {
              k: "p",
              t: String.raw`**$x<0$ のとき。** $g'(t)=e^{t}-x>0$ なので $g$ は増加である。$t\to-\infty$ とすると $e^{t}\to0$、$-xt\to-\infty$（$-x>0$ で $t\to-\infty$）だから $g(t)\to-\infty$ である。下に有界でないので、どんな $y$ をとっても条件をみたさない。`,
            },
            {
              k: "p",
              t: String.raw`**$x=0$ のとき。** $g(t)=e^{t}>0$ で、$t\to-\infty$ のとき $g\to0$ である。下限は $0$（到達しない）なので、条件は $y\le0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$x>0$ のとき。** $g'(t)=0$ は $t=\log x$ で、$g'$ はここで負から正に変わるから $t=\log x$ で最小になる。最小値は`,
            },
            {
              k: "math",
              t: String.raw`g(\log x)=e^{\log x}-x\log x=x-x\log x`,
            },
            { k: "p", t: String.raw`である。条件は $y\le x-x\log x$。` },
            {
              k: "p",
              t: String.raw`**まとめ。** $\displaystyle\lim_{x\to+0}\left(x-x\log x\right)=0$（与えられた $\lim_{x\to+0}x\log x=0$ による）なので、$x=0$ の場合も同じ式で書ける。よって求める集合は`,
            },
            {
              k: "math",
              t: String.raw`\left\{(x,y)\;\middle|\;x\ge0,\;\;y\le x-x\log x\right\}`,
            },
            { k: "p", t: String.raw`である（境界を含む）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`境界の曲線 $y=x-x\log x=x\left(1-\log x\right)$。$x=1$ で最大値 $1$、$x=e$ で $0$ になり、それより右では負。条件 $(*)$ をみたすのは、$x\ge0$ でこの曲線以下の部分（曲線を含む）である。$x<0$ には1点もない。`,
                view: [-1.2, 4.6, -1.6, 2.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: BD21, from: 0.0001, to: 4.5 },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "above-right" },
                  { k: "dot", at: [Math.E, 0], label: "e", place: "above-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「すべての $t$ で成り立つ」は「最小値以下」と読み替える。$t$ を固定して考えない。`,
            String.raw`$x<0$ では下に有界でないので、$x<0$ の点は1つも入らない。ここを落とすと領域が左に広がってしまう。`,
            String.raw`$x=0$ は最小値が存在せず下限が $0$（到達しない）。それでも $y\le0$ が条件になる。`,
          ],
          check: String.raw`$x$ を $2$ 万通りランダムにとって $\min_t\left(e^{t}-xt\right)$ を数値で求めると、$x-x\log x$ と $10^{-6}$ 以内で一致した。$x=-1$ では $t=-59$ で $-59$ まで下がり、下に有界でないことが見てとれる。`,
        },
        {
          label: "(2)",
          task: String.raw`$(*)$ をみたす点のうち $x\ge1$ かつ $y\ge0$ のもの全体を $S$ とし、$S$ を $x$ 軸の周りに1回転させてできる立体の体積を求める`,
          answer: String.raw`$\dfrac{\pi\left(2e^{3}-17\right)}{27}$`,
          approach: String.raw`$S$ は $1\le x\le e$、$0\le y\le x\left(1-\log x\right)$ の領域である。体積は $\pi\int_1^e\left\{x(1-\log x)\right\}^{2}dx$ で、$u=1-\log x$ と置換すると $e^{3}\int_0^1u^{2}e^{-3u}du$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$S$ の形。** (1) より条件は $y\le x(1-\log x)$ である。これと $y\ge0$ が両立するには $x(1-\log x)\ge0$、$x\ge1>0$ より $\log x\le1$、すなわち $x\le e$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\left\{(x,y)\;\middle|\;1\le x\le e,\;\;0\le y\le x\left(1-\log x\right)\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**体積。** ` },
            {
              k: "math",
              t: String.raw`V=\pi\int_1^e\left\{x\left(1-\log x\right)\right\}^{2}dx=\pi\int_1^ex^{2}\left(1-\log x\right)^{2}dx`,
            },
            {
              k: "p",
              t: String.raw`である。$u=1-\log x$ とおくと $x=e^{1-u}$、$dx=-e^{1-u}du$ で、$x:1\to e$ のとき $u:1\to0$。よって`,
            },
            {
              k: "math",
              t: String.raw`\int_1^ex^{2}\left(1-\log x\right)^{2}dx=\int_1^0e^{2(1-u)}u^{2}\left(-e^{1-u}\right)du=\int_0^1e^{3(1-u)}u^{2}\,du=e^{3}\int_0^1u^{2}e^{-3u}du`,
            },
            { k: "p", t: String.raw`となる。` },
            { k: "p", t: String.raw`**部分積分2回。** ` },
            {
              k: "math",
              t: String.raw`\int u^{2}e^{-3u}du=-\frac13u^{2}e^{-3u}-\frac29ue^{-3u}-\frac2{27}e^{-3u}+\text{const.}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_0^1u^{2}e^{-3u}du&=\left(-\frac13-\frac29-\frac2{27}\right)e^{-3}-\left(-\frac2{27}\right)\\[1mm]
&=-\frac{17}{27}e^{-3}+\frac2{27}=\frac{2-17e^{-3}}{27}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`V=\pi\cdot e^{3}\cdot\frac{2-17e^{-3}}{27}=\frac{\pi\left(2e^{3}-17\right)}{27}`,
            },
            { k: "p", t: String.raw`である（$2.696$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$x$ の上端が $e$ であることを、$y\ge0$ から導く。$x\ge1$ だけでは領域が決まらない。`,
            String.raw`$u=1-\log x$ の置換で $x^{2}dx$ が $e^{3(1-u)}du$ にまとまる。$x^{2}=e^{2(1-u)}$ と $dx=-e^{1-u}du$ の両方を使う。`,
            String.raw`$-\frac13-\frac29-\frac2{27}=-\frac{9+6+2}{27}=-\frac{17}{27}$ である。通分を間違えない。`,
          ],
          check: String.raw`$\pi\int_1^e\left\{x(1-\log x)\right\}^{2}dx$ を $40$ 万点のシンプソン法で計算すると $2.69607687$ となり、$\frac{\pi\left(2e^{3}-17\right)}{27}=2.69607687$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面",
      topics: ["平均値の定理の類似", "整式の微分", "偏角", "反例"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2$ で $\\gamma$ が中点になることを、$\\alpha=1+2i$、$\\beta=-3+i$ で確かめた",
          "$\\alpha=1-i$、$\\beta=1+i$、$f(x)=x^{3}+ax^{2}+2x+1$ について、線分上の $\\gamma$ で $\\left|f'(\\gamma)-\\frac{f(\\beta)-f(\\alpha)}{\\beta-\\alpha}\\right|$ の最小を調べると、$a=-3$ のときだけ $0$ に落ち（$s=\\pm\\frac1{\\sqrt3}$）、$a=-2,0,1$ では $0.94,1.00,1.00$ だった",
          "$f(x)=x^{7}$ では線分上で最小が $0.848$ までしか下がらず、$0$ にならないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n=2$ のとき、どのような $\alpha,\beta,f(x)$ も平均値の性質をもつことを示す`,
          answer: String.raw`$\gamma=\dfrac{\alpha+\beta}2$（線分の中点）がとれる`,
          approach: String.raw`2次式なら左辺も右辺も $\gamma$ の1次式になるので、$\gamma$ について解くだけである。出てきた点が線分上にあることを確かめる。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=a_2x^{2}+a_1x+a_0$（$a_2\ne0$）とする。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\frac{f(\beta)-f(\alpha)}{\beta-\alpha}
&=\frac{a_2\left(\beta^{2}-\alpha^{2}\right)+a_1(\beta-\alpha)}{\beta-\alpha}\\[1mm]
&=a_2(\alpha+\beta)+a_1
\end{aligned}`,
            },
            { k: "p", t: String.raw`である（$\alpha\ne\beta$ なので割ってよい）。一方 $f'(x)=2a_2x+a_1$ だから` },
            {
              k: "math",
              t: String.raw`f'(\gamma)=2a_2\gamma+a_1`,
            },
            { k: "p", t: String.raw`である。2つを等しいとおくと $2a_2\gamma=a_2(\alpha+\beta)$、$a_2\ne0$ より` },
            {
              k: "math",
              t: String.raw`\gamma=\frac{\alpha+\beta}2`,
            },
            {
              k: "p",
              t: String.raw`である。これは線分 $\alpha\beta$ の中点なので、確かに線分上にある。よって $n=2$ なら、$\alpha,\beta,f$ が何であっても平均値の性質をもつ。`,
            },
          ],
          pitfalls: [
            String.raw`「線分上にある」ことまで言う。$\gamma$ が存在するだけでは条件をみたさない。中点ならこれは明らかである。`,
            String.raw`$a_2\ne0$（$n=2$ だから最高次係数は $0$ でない）を使って割る。`,
          ],
          check: String.raw`$f(x)=3x^{2}-2x+5$、$\alpha=1+2i$、$\beta=-3+i$ で探すと $\gamma=-1+1.5i$ となり、中点 $\frac{\alpha+\beta}2=-1+1.5i$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\alpha=1-i$、$\beta=1+i$、$f(x)=x^{3}+ax^{2}+bx+c$ が平均値の性質をもつための、実数 $a,b,c$ に関する必要十分条件を求める`,
          answer: String.raw`$a=-3$（$b,c$ は任意の実数）`,
          approach: String.raw`線分は $\gamma=1+si$（$-1\le s\le1$）と書ける。左辺を計算すると実数になるので、$f'(\gamma)$ の虚部が $0$、実部が一致、という2本の式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**左辺。** $\beta-\alpha=2i$、$\beta^{2}-\alpha^{2}=2i-(-2i)=4i$、$\beta^{3}-\alpha^{3}=(-2+2i)-(-2-2i)=4i$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{f(\beta)-f(\alpha)}{\beta-\alpha}=\frac{4i+4ai+2bi}{2i}=2+2a+b`,
            },
            { k: "p", t: String.raw`である（実数）。` },
            {
              k: "p",
              t: String.raw`**右辺。** 線分 $\alpha\beta$ は $\gamma=1+si$（$-1\le s\le1$）と書ける。$\gamma^{2}=1-s^{2}+2si$ だから`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f'(\gamma)&=3\gamma^{2}+2a\gamma+b\\[1mm]
&=3\left(1-s^{2}\right)+2a+b+i\left(6s+2as\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**2つを等しいとおく。** ` },
            {
              k: "steps",
              items: [
                String.raw`虚部：$s\left(6+2a\right)=0$`,
                String.raw`実部：$3-3s^{2}+2a+b=2+2a+b$、すなわち $s^{2}=\dfrac13$`,
              ],
            },
            {
              k: "p",
              t: String.raw`実部の式から $s=\pm\dfrac1{\sqrt3}\ne0$ である。すると虚部の式から $6+2a=0$、つまり`,
            },
            { k: "math", t: String.raw`a=-3` },
            {
              k: "p",
              t: String.raw`でなければならない。逆に $a=-3$ なら $s=\pm\dfrac1{\sqrt3}$ が両方の式をみたし、$\left|s\right|=\dfrac1{\sqrt3}=0.577\le1$ だから $\gamma=1\pm\dfrac i{\sqrt3}$ は線分上にある。`,
            },
            {
              k: "p",
              t: String.raw`よって求める必要十分条件は $a=-3$（$b,c$ は何でもよい）である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|s\right|\le1$ の確認を忘れない。$\gamma$ が線分の外に出ていたら条件をみたさない。`,
            String.raw`$c$ は $f(\beta)-f(\alpha)$ でも $f'$ でも消えるので、まったく効かない。`,
            String.raw`実部の式から先に $s^{2}=\frac13$ が決まり、$s\ne0$ が分かる。だから虚部の式は $a=-3$ を強制する。順序を逆にすると場合分けが増える。`,
          ],
          check: String.raw`$b=2$、$c=1$ として線分上で $\left|f'(\gamma)-\text{左辺}\right|$ の最小を $40$ 万点で調べると、$a=-3$ では $s=\pm0.577350$ で $9\times10^{-7}$ まで落ち、$a=-2,0,1$ ではそれぞれ $0.94,1.00,1.00$ までしか下がらなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\alpha=\dfrac{1-i}{\sqrt2}$、$\beta=\dfrac{1+i}{\sqrt2}$、$f(x)=x^{7}$ が平均値の性質をもたないことを示す`,
          answer: String.raw`左辺は $-1$ だが、線分上で $7\gamma^{6}=-1$ となる $\gamma$ は偏角から $\pm\dfrac\pi6$ 方向に限られ、そのとき $\gamma^{6}=\dfrac8{27}\ne-\dfrac17$`,
          approach: String.raw`$\alpha,\beta$ は $e^{\mp i\pi/4}$ なので、左辺が簡単に $-1$ と出る。$7\gamma^{6}=-1$ は「$\gamma^{6}$ が負の実数」を要求するので、$\gamma$ の偏角が $\dfrac\pi6$ の奇数倍に限られる。線分上ではこの条件と大きさが両立しない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**左辺。** $\alpha=\cos\left(-\dfrac\pi4\right)+i\sin\left(-\dfrac\pi4\right)$、$\beta=\cos\dfrac\pi4+i\sin\dfrac\pi4$ である。ド・モアブルより`,
            },
            {
              k: "math",
              t: String.raw`\beta^{7}=\cos\frac{7\pi}4+i\sin\frac{7\pi}4=\frac{1-i}{\sqrt2}=\alpha,\qquad\alpha^{7}=\beta`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{\beta^{7}-\alpha^{7}}{\beta-\alpha}=\frac{\alpha-\beta}{\beta-\alpha}=-1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**右辺。** $f'(x)=7x^{6}$ なので、平均値の性質をもつには線分上に`,
            },
            { k: "math", t: String.raw`7\gamma^{6}=-1,\qquad\text{すなわち}\quad\gamma^{6}=-\frac17` },
            { k: "p", t: String.raw`をみたす $\gamma$ が必要である。` },
            {
              k: "p",
              t: String.raw`**偏角で絞る。** $\gamma=r\left(\cos\varphi+i\sin\varphi\right)$（$r>0$）とすると $\gamma^{6}=r^{6}\left(\cos6\varphi+i\sin6\varphi\right)$ である。これが負の実数 $-\dfrac17$ になるには`,
            },
            {
              k: "math",
              t: String.raw`\cos6\varphi=-1\quad\Longleftrightarrow\quad6\varphi=\pi+2k\pi\quad\Longleftrightarrow\quad\varphi=\frac\pi6+\frac{k\pi}3`,
            },
            { k: "p", t: String.raw`が必要である。` },
            {
              k: "p",
              t: String.raw`一方、線分 $\alpha\beta$ は実部が $\dfrac1{\sqrt2}$ の縦線分で、$\gamma=\dfrac1{\sqrt2}+si$（$\left|s\right|\le\dfrac1{\sqrt2}$）と書ける。このとき $\left|\varphi\right|\le\dfrac\pi4$ である。上の候補でこの範囲に入るのは $\varphi=\pm\dfrac\pi6$ だけである。`,
            },
            {
              k: "p",
              t: String.raw`**大きさが合わない。** $\varphi=\pm\dfrac\pi6$ のとき $r\cos\dfrac\pi6=\dfrac1{\sqrt2}$ より`,
            },
            {
              k: "math",
              t: String.raw`r=\frac{1/\sqrt2}{\sqrt3/2}=\frac2{\sqrt6},\qquad r^{2}=\frac46=\frac23,\qquad r^{6}=\left(\frac23\right)^{3}=\frac8{27}`,
            },
            { k: "p", t: String.raw`である。よってこの $\gamma$ では` },
            {
              k: "math",
              t: String.raw`\gamma^{6}=-\frac8{27}\ne-\frac17`,
            },
            {
              k: "p",
              t: String.raw`である（$8\cdot7=56\ne27$）。したがって線分上に $\gamma^{6}=-\dfrac17$ をみたす点はなく、$\alpha,\beta,f$ は平均値の性質をもたない。`,
            },
          ],
          pitfalls: [
            String.raw`$\beta^{7}=\alpha$、$\alpha^{7}=\beta$ に気づくと左辺が一気に $-1$ になる。$\frac{7\pi}4$ と $-\frac\pi4$ が同じ偏角である。`,
            String.raw`「偏角で候補を絞ってから大きさを見る」の順にする。大きさだけ見ると $7^{-1/6}=0.723$ が $\left|\gamma\right|$ のとりうる範囲 $\left[\frac1{\sqrt2},1\right]=[0.707,1]$ に入ってしまい、矛盾が出ない。`,
            String.raw`線分上では実部が $\frac1{\sqrt2}$ に固定される。これが $r$ と $\varphi$ を結びつける式になる。`,
          ],
          check: String.raw`線分上を $40$ 万点に刻んで $\left|7\gamma^{6}-(-1)\right|$ を計算すると、最小でも $0.848$ で $0$ に届かなかった。`,
        },
      ],
    },
    {
      no: 5,
      field: "整数",
      topics: ["二項係数", "単調性", "素数", "階乗の素因数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$4\\le n\\le59$、$2\\le k\\le n-2$ のすべてで $ {}_n\\mathrm{C}_k>n$ であることを確かめた",
          "$1\\le n\\le299$、$1\\le k\\le n$ を全探索して $ {}_n\\mathrm{C}_k$ が素数 $p$ になる組を集めると、$p=2$ では $(2,1)$ のみ、$p\\ge3$ では $(p,1)$ と $(p,p-1)$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`自然数 $n,k$ が $2\le k\le n-2$ をみたすとき $ {}_n\mathrm{C}_k>n$ であることを示す`,
          answer: String.raw`$ {}_n\mathrm{C}_k\ge{}_n\mathrm{C}_2=\dfrac{n(n-1)}2>n$（$n\ge4$ だから）`,
          approach: String.raw`$2\le k\le n-2$ の範囲では $ {}_n\mathrm{C}_k$ が両端の $ {}_n\mathrm{C}_2={}_n\mathrm{C}_{n-2}$ で最小になる。これは隣り合う二項係数の比を見れば分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $2\le k\le n-2$ となるには $n\ge4$ が必要である。`,
            },
            {
              k: "p",
              t: String.raw`**真ん中へ行くほど大きい。** $1\le k\le n$ で`,
            },
            {
              k: "math",
              t: String.raw`\frac{{}_n\mathrm{C}_k}{{}_n\mathrm{C}_{k-1}}=\frac{n-k+1}k`,
            },
            {
              k: "p",
              t: String.raw`であり、これが $1$ より大きいのは $n-k+1>k$、すなわち $k<\dfrac{n+1}2$ のときである。よって $ {}_n\mathrm{C}_k$ は $k$ が $\dfrac{n+1}2$ に達するまで増え続ける。とくに $2\le k\le\dfrac n2$ では`,
            },
            { k: "math", t: String.raw`{}_n\mathrm{C}_k\ge{}_n\mathrm{C}_2` },
            {
              k: "p",
              t: String.raw`である。$\dfrac n2<k\le n-2$ のときは $ {}_n\mathrm{C}_k={}_n\mathrm{C}_{n-k}$ で、$2\le n-k<\dfrac n2$ だから同じ評価が使える。`,
            },
            { k: "p", t: String.raw`**評価。** ` },
            {
              k: "math",
              t: String.raw`{}_n\mathrm{C}_2=\frac{n(n-1)}2`,
            },
            { k: "p", t: String.raw`で、$n\ge4$ より $n-1\ge3>2$ だから` },
            {
              k: "math",
              t: String.raw`{}_n\mathrm{C}_2=n\cdot\frac{n-1}2>n`,
            },
            { k: "p", t: String.raw`である。合わせて $ {}_n\mathrm{C}_k\ge{}_n\mathrm{C}_2>n$ が示された。` },
          ],
          pitfalls: [
            String.raw`$2\le k\le n-2$ から $n\ge4$ が出る。これがないと $\frac{n-1}2>1$ が言えない。`,
            String.raw`$ {}_n\mathrm{C}_k={}_n\mathrm{C}_{n-k}$ の対称性を使って、$k$ が後半にある場合も前半に帰着させる。`,
          ],
          check: String.raw`$4\le n\le59$、$2\le k\le n-2$ のすべてで $ {}_n\mathrm{C}_k>n$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$p$ を素数とするとき、$k\le n$ をみたす自然数の組 $(n,k)$ で $ {}_n\mathrm{C}_k=p$ となるものをすべて求める`,
          answer: String.raw`$(n,k)=(p,\,1)$ と $(p,\,p-1)$（$p=2$ のときは一致して $(2,1)$ のみ）`,
          approach: String.raw`$k=1$、$k=n$、$k=n-1$ を直接調べ、残る $2\le k\le n-2$ は (1) を使って潰す。$ {}_n\mathrm{C}_k>n$ なら $p>n$ で、$p$ は $n!$ を割り切れない。`,
          blocks: [
            { k: "p", t: String.raw`$k$ の位置で場合を分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$k=n$：$ {}_n\mathrm{C}_n=1$ で素数でない。×`,
                String.raw`$k=1$：$ {}_n\mathrm{C}_1=n$ なので $n=p$。$(n,k)=(p,1)$。◯`,
                String.raw`$k=n-1$：$ {}_n\mathrm{C}_{n-1}=n$ なので $n=p$。$k=p-1\ge1$ だから $(n,k)=(p,p-1)$。◯`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$2\le k\le n-2$ は不可能。** このとき (1) より`,
            },
            { k: "math", t: String.raw`p={}_n\mathrm{C}_k>n` },
            {
              k: "p",
              t: String.raw`である。一方、$ {}_n\mathrm{C}_k=\dfrac{n!}{k!\,(n-k)!}=p$ より`,
            },
            { k: "math", t: String.raw`n!=p\cdot k!\,(n-k)!` },
            {
              k: "p",
              t: String.raw`なので、$p$ は $n!$ を割り切る。しかし $n!=1\cdot2\cdots n$ の因数はどれも $n$ 以下であり、$p$ は $n$ より大きい素数だから、どの因数も割り切れない。素数の性質より $p$ は $n!$ を割り切れず、矛盾する。`,
            },
            { k: "p", t: String.raw`**まとめ。** 求める組は` },
            {
              k: "math",
              t: String.raw`(n,k)=(p,\,1),\qquad(n,k)=(p,\,p-1)`,
            },
            {
              k: "p",
              t: String.raw`である。ただし $p=2$ のときは $p-1=1$ なので2つは同じ組 $(2,1)$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`「$p>n$ なら $p\nmid n!$」が決め手である。素数が積を割るならどれかの因数を割る、という性質を使う。`,
            String.raw`$k=n-1$ の場合を忘れない。$p\ge3$ では $(p,1)$ と $(p,p-1)$ は別の組である。`,
            String.raw`$p=2$ では2つが一致する。答えに「ただし」を添えておくと丁寧である。`,
          ],
          check: String.raw`$1\le n\le299$、$1\le k\le n$ を全探索すると、$ {}_n\mathrm{C}_k$ が素数になるのは $p=2$ で $(2,1)$、$p=3$ で $(3,1),(3,2)$、$p=5$ で $(5,1),(5,4)$、… と、どれも予想どおりだった。`,
        },
      ],
    },
  ],
};
