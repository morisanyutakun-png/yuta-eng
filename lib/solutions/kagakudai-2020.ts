import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2020年度（令和2年度）一般選抜 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第3問の図。双曲線 $2ab+3a+3b=8$、すなわち $\left(a+\tfrac32\right)\left(b+\tfrac32\right)=\tfrac{25}4$。 */
const HYP20 = (a: number): number => (8 - 3 * a) / (2 * a + 3);

/** 第4問の図。$n=1$ の例。$\mathrm{P}$ は $x_{0}=2$ のとき。 */
const X0 = 2;
const PY20 = Math.sin(X0);
const QX20 = X0 - PY20;
/** $\mathrm{P}$ から $\ell\colon x+y=0$ に下ろした垂線の足。 */
const FX20 = X0 - (X0 + PY20) / 2;
const FY20 = PY20 - (X0 + PY20) / 2;

export const kagakudai2020: SolutionSet = {
  slug: "kagakudai",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "整数",
      topics: ["合同式", "絶対値で符号が変わる範囲", "連続する整数と余り", "素数になる条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\leqq x\\leqq499$ で $\\left|x^{2}-x-23\\right|$ を $3$ で割った余りが $2$ になるのは $x=1,3,4$ だけだった",
          "$1\\leqq x_{1}\\leqq4999$ で連続して素数になる長さが4以上なのは $x_{1}=3$（長さ5）と $x_{1}=4$（長さ4）だけで、最大は $5$ だった",
          "$x=3,4,5,6,7$ での値は $17,11,3,7,19$ ですべて素数だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\left|x^{2}-x-23\right|$ の値が $3$ を法として $2$ に合同である正の整数 $x$ をすべて求める`,
          answer: String.raw`$x=1,\ 3,\ 4$`,
          approach: String.raw`まず絶対値を外す。$x^{2}-x-23$ の符号が変わるのは $x=5$ と $x=6$ のあいだなので、$x\leqq5$ と $x\geqq6$ で分ける。あとは $x$ を $3$ で割った余りで調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**符号。** $x^{2}-x-23=0$ の解は $x=\dfrac{1\pm\sqrt{93}}{2}$ で、$\sqrt{93}=9.64\cdots$ なので正の解は $5.32\cdots$ である。したがって正の整数 $x$ については`,
            },
            {
              k: "steps",
              items: [
                String.raw`$1\leqq x\leqq5$：$x^{2}-x-23<0$ なので $\left|x^{2}-x-23\right|=23+x-x^{2}$`,
                String.raw`$x\geqq6$：$x^{2}-x-23>0$ なので $\left|x^{2}-x-23\right|=x^{2}-x-23$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$3$ で割った余り。** $x^{2}-x=x\left(x-1\right)$ と $23\equiv2$ から`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x\equiv0$：$x^{2}-x\equiv0$ なので $x^{2}-x-23\equiv-2\equiv1$`,
                String.raw`$x\equiv1$：$x^{2}-x\equiv0$ なので $\equiv1$`,
                String.raw`$x\equiv2$：$x^{2}-x\equiv4-2=2$ なので $\equiv0$`,
              ],
            },
            { k: "p", t: String.raw`である（いずれも $\bmod3$）。` },
            {
              k: "p",
              t: String.raw`**$x\geqq6$ のとき。** $\left|x^{2}-x-23\right|=x^{2}-x-23\equiv1$ または $0$ で、$2$ にはならない。解なし。`,
            },
            {
              k: "p",
              t: String.raw`**$1\leqq x\leqq5$ のとき。** $\left|x^{2}-x-23\right|=-\left(x^{2}-x-23\right)\equiv-1\equiv2$ または $-0\equiv0$ なので、$x\not\equiv2\pmod3$ のときに $2$ になる。$x=1,2,3,4,5$ のうち $x\equiv2\pmod3$ なのは $x=2,5$ なので、残る`,
            },
            { k: "math", t: String.raw`x=1,\ 3,\ 4` },
            {
              k: "p",
              t: String.raw`が答えである。実際 $\left|1-1-23\right|=23$、$\left|9-3-23\right|=17$、$\left|16-4-23\right|=11$ で、どれも $3$ で割ると $2$ 余る ✓。`,
            },
          ],
          pitfalls: [
            String.raw`絶対値を外す場所を先に決める。$x\leqq5$ では符号が反転するので、余りも $1\to2$、$0\to0$ と変わる。`,
          ],
          check: String.raw`$1\leqq x\leqq499$ の全探索でも $x=1,3,4$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$k$ 個の連続した正の整数 $x_{1},\ldots,x_{k}$ に対して $\left|x_{j}^{2}-x_{j}-23\right|$（$1\leqq j\leqq k$）の値がすべて素数になる $k$ の最大値と、その $k$ に対する連続した正の整数 $x_{1},\ldots,x_{k}$ をすべて求める`,
          answer: String.raw`$k$ の最大値は $5$。そのときの数列は $3,4,5,6,7$ の1つだけ`,
          approach: String.raw`(1) の余りの表から、$x\equiv2\pmod3$ のときだけ $\left|x^{2}-x-23\right|$ が $3$ の倍数になる。$3$ の倍数が素数なのは $3$ のときだけなので、そこから $x$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$3$ の倍数になるのはいつか。** (1) の計算より、$x\equiv2\pmod3$ のとき（そしてそのときだけ）$\left|x^{2}-x-23\right|$ は $3$ の倍数である。`,
            },
            {
              k: "p",
              t: String.raw`$3$ の倍数が素数になるのは、その値が $3$ のときだけである。`,
            },
            {
              k: "math",
              t: String.raw`\left|x^{2}-x-23\right|=3\iff x^{2}-x-23=\pm3`,
            },
            {
              k: "p",
              t: String.raw`である。$x^{2}-x-26=0$ は判別式 $1+104=105$ が平方数でないので整数解をもたない。$x^{2}-x-20=0$ は $\left(x-5\right)\left(x+4\right)=0$ で、正の整数解は $x=5$ である。`,
            },
            {
              k: "p",
              t: String.raw`したがって **$x\equiv2\pmod3$ で $\left|x^{2}-x-23\right|$ が素数になるのは $x=5$ だけ**である。`,
            },
            {
              k: "p",
              t: String.raw`**$k$ の上限。** 連続する $6$ 個の整数には $3$ で割って $2$ 余るものがちょうど $2$ 個ある。どちらも $5$ にはなれないので、$k\geqq6$ は不可能である。よって $k\leqq5$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$k=5$ の場合。** 連続する $5$ 個の整数のうち $3$ で割って $2$ 余るものの個数は、先頭 $x_{1}$ の余りによって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x_{1}\equiv0$：余りは $0,1,2,0,1$ で **1個**`,
                String.raw`$x_{1}\equiv1$：余りは $1,2,0,1,2$ で 2個`,
                String.raw`$x_{1}\equiv2$：余りは $2,0,1,2,0$ で 2個`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので、$x_{1}\equiv0\pmod3$ でなければならない。そのとき $3$ で割って $2$ 余るのは $x_{1}+2$ で、これが $5$ である必要があるから $x_{1}=3$ である。`,
            },
            { k: "p", t: String.raw`**確かめる。**` },
            {
              k: "steps",
              items: [
                String.raw`$x=3$：$\left|9-3-23\right|=17$（素数）`,
                String.raw`$x=4$：$\left|16-4-23\right|=11$（素数）`,
                String.raw`$x=5$：$\left|25-5-23\right|=3$（素数）`,
                String.raw`$x=6$：$\left|36-6-23\right|=7$（素数）`,
                String.raw`$x=7$：$\left|49-7-23\right|=19$（素数）`,
              ],
            },
            { k: "p", t: String.raw`すべて素数なので $k=5$ が実現する。よって` },
            {
              k: "math",
              t: String.raw`k\ \text{の最大値}=5,\qquad x_{1},\ldots,x_{5}=3,4,5,6,7`,
            },
            { k: "p", t: String.raw`である（この1組だけ）。` },
            {
              k: "note",
              t: String.raw`$\left|x^{2}-x-23\right|$ は $x=1$ から $17,21,17,11,3,7,19,33,\ldots$ となる。$x=2$（$21=3\cdot7$）と $x=8$（$33=3\cdot11$）で $3$ の倍数になって素数でなくなるので、そのあいだの長さ $5$ が最長である。`,
            },
          ],
          pitfalls: [
            String.raw`「$3$ の倍数かつ素数なら値は $3$」という一点に絞るのが要点。値が $3$ になる $x$ を求める。`,
            String.raw`連続 $5$ 個のうち $3$ で割って $2$ 余るものが1個だけになるのは、先頭が $3$ の倍数のときだけ。ここで数列が決まる。`,
          ],
          check: String.raw`$1\leqq x_{1}\leqq4999$ の全探索で、長さ4以上になるのは $x_{1}=3$（長さ5）と $x_{1}=4$（長さ4）だけだった。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["正三角形の条件", "回転と2次方程式", "外接円上の点", "対称式の和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "乱数で2万個の正三角形を作ると、$\\alpha^{2}+\\beta^{2}+\\gamma^{2}-\\alpha\\beta-\\beta\\gamma-\\gamma\\alpha$ はつねに $0$ だった",
          "逆に $\\alpha,\\beta$ を乱数でとり条件から $\\gamma$ を解くと、どの解でも3辺の長さが一致した",
          "$R=2.3$ の正三角形で $\\mathrm{P}$ を4通りとると、$\\mathrm{AP}^{2}+\\mathrm{BP}^{2}+\\mathrm{CP}^{2}=31.74=6R^{2}$、$\\mathrm{AP}^{4}+\\mathrm{BP}^{4}+\\mathrm{CP}^{4}=503.7138=18R^{4}$ で一定だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`複素数平面上の異なる3点 $\mathrm{A},\mathrm{B},\mathrm{C}$ を複素数 $\alpha,\beta,\gamma$ で表す（同一直線上にはないとする）。$\triangle\mathrm{ABC}$ が正三角形となる必要十分条件は $\alpha^{2}+\beta^{2}+\gamma^{2}=\alpha\beta+\beta\gamma+\gamma\alpha$ であることを示す`,
          answer: String.raw`$z=\dfrac{\gamma-\alpha}{\beta-\alpha}$ とおくと、正三角形 $\iff z^{2}-z+1=0$ で、それを払うと与式になる`,
          approach: String.raw`$\mathrm{A}$ を中心に $\mathrm{B}$ を $\pm60^{\circ}$ 回すと $\mathrm{C}$ になる、というのが正三角形の条件。回転は複素数の掛け算なので、比 $z$ の2次方程式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha\neq\beta$ なので $z=\dfrac{\gamma-\alpha}{\beta-\alpha}$ とおける。`,
            },
            {
              k: "p",
              t: String.raw`$\triangle\mathrm{ABC}$ が正三角形であることは、$\mathrm{C}$ が $\mathrm{B}$ を $\mathrm{A}$ のまわりに $60^{\circ}$ または $-60^{\circ}$ 回した点であること、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\gamma-\alpha=\left(\cos\left(\pm\frac{\pi}{3}\right)+i\sin\left(\pm\frac{\pi}{3}\right)\right)\left(\beta-\alpha\right)`,
            },
            { k: "p", t: String.raw`と同値である。つまり` },
            {
              k: "math",
              t: String.raw`z=\frac12\pm\frac{\sqrt3}{2}i`,
            },
            {
              k: "p",
              t: String.raw`である。この2数は2次方程式 $z^{2}-z+1=0$ の2解である（和 $1$、積 $\dfrac14+\dfrac34=1$）。逆にこの方程式の解はこの2数しかない。したがって`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ABC}\ \text{が正三角形}\iff z^{2}-z+1=0`,
            },
            { k: "p", t: String.raw`である。両辺に $\left(\beta-\alpha\right)^{2}\neq0$ を掛けると` },
            {
              k: "math",
              t: String.raw`\left(\gamma-\alpha\right)^{2}-\left(\gamma-\alpha\right)\left(\beta-\alpha\right)+\left(\beta-\alpha\right)^{2}=0`,
            },
            { k: "p", t: String.raw`である。展開して整理すると` },
            {
              k: "math",
              t: String.raw`\alpha^{2}+\beta^{2}+\gamma^{2}-\alpha\beta-\beta\gamma-\gamma\alpha=0`,
            },
            { k: "p", t: String.raw`となる。よって求める必要十分条件が示された。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\omega=\dfrac{-1+\sqrt3i}{2}$（1の原始3乗根）を使うと`,
            },
            {
              k: "math",
              t: String.raw`\alpha^{2}+\beta^{2}+\gamma^{2}-\alpha\beta-\beta\gamma-\gamma\alpha=\left(\alpha+\omega\beta+\omega^{2}\gamma\right)\left(\alpha+\omega^{2}\beta+\omega\gamma\right)`,
            },
            {
              k: "p",
              t: String.raw`と因数分解できる。2つの因数はそれぞれ「反時計回りの正三角形」「時計回りの正三角形」に対応する。`,
            },
          ],
          pitfalls: [
            String.raw`$\pm60^{\circ}$ の両方を拾う。片方だけだと「必要十分」にならない。`,
            String.raw`$z^{2}-z+1=0$ の2解がちょうど $\cos\left(\pm\dfrac\pi3\right)+i\sin\left(\pm\dfrac\pi3\right)$ であることを言っておく。`,
          ],
          check: String.raw`乱数で2万個の正三角形を作ると、左辺から右辺を引いた値はつねに $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\triangle\mathrm{ABC}$ が正三角形のとき、外接円上の点 $\mathrm{P}$ を任意にとる。$\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}$ および $\mathrm{AP}^{4}+\mathrm{BP}^{4}+\mathrm{CP}^{4}$ を外接円の半径 $R$ を用いて表す`,
          answer: String.raw`$\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}=6R^{2}$、$\mathrm{AP}^{4}+\mathrm{BP}^{4}+\mathrm{CP}^{4}=18R^{4}$`,
          approach: String.raw`外接円の中心を原点にとると $\alpha+\beta+\gamma=0$ になる。$\mathrm{AP}^{2}$ は $\cos$ の1次式で書けるので、3つ足すと $\cos$ の和が消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`外接円の中心を原点にとる。正三角形なので、$\omega=\cos\dfrac{2\pi}{3}+i\sin\dfrac{2\pi}{3}$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\alpha=R,\qquad\beta=R\omega,\qquad\gamma=R\omega^{2}`,
            },
            {
              k: "p",
              t: String.raw`としてよい（必要なら全体を回す）。$\mathrm{P}$ は $p=R\left(\cos\theta+i\sin\theta\right)$ と書ける。`,
            },
            { k: "p", t: String.raw`**2乗の和。** 頂点を $v_{k}=R\omega^{k}$（$k=0,1,2$）とすると` },
            {
              k: "math",
              t: String.raw`\left|p-v_{k}\right|^{2}=\left|p\right|^{2}+\left|v_{k}\right|^{2}-2\operatorname{Re}\left(p\overline{v_{k}}\right)=2R^{2}-2\operatorname{Re}\left(p\overline{v_{k}}\right)`,
            },
            { k: "p", t: String.raw`である。$v_{0}+v_{1}+v_{2}=R\left(1+\omega+\omega^{2}\right)=0$ なので、3つ足すと` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}=6R^{2}-2\operatorname{Re}\left(p\overline{\left(v_{0}+v_{1}+v_{2}\right)}\right)=6R^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**4乗の和。** $v_{k}=R\left(\cos\varphi_{k}+i\sin\varphi_{k}\right)$（$\varphi_{k}=\dfrac{2k\pi}{3}$）とすると`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}_{k}^{2}=2R^{2}\left\{1-\cos\left(\theta-\varphi_{k}\right)\right\}`,
            },
            { k: "p", t: String.raw`である。$\psi_{k}=\theta-\varphi_{k}$ とおいて2乗して足すと` },
            {
              k: "math",
              t: String.raw`\sum_{k}\mathrm{AP}_{k}^{4}=4R^{4}\sum_{k}\left(1-2\cos\psi_{k}+\cos^{2}\psi_{k}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\psi_{0},\psi_{1},\psi_{2}$ は $120^{\circ}$ ずつ違うので $\displaystyle\sum_{k}\cos\psi_{k}=0$ である。また $\cos^{2}\psi=\dfrac{1+\cos2\psi}{2}$ で、$2\psi_{k}$ も $240^{\circ}$ ずつ違う（つまり $120^{\circ}$ ずつ違う）ので $\displaystyle\sum_{k}\cos2\psi_{k}=0$、したがって $\displaystyle\sum_{k}\cos^{2}\psi_{k}=\dfrac32$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k}\mathrm{AP}_{k}^{4}=4R^{4}\left(3-0+\frac32\right)=18R^{4}`,
            },
            { k: "p", t: String.raw`である。まとめると` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}+\mathrm{BP}^{2}+\mathrm{CP}^{2}=6R^{2},\qquad\mathrm{AP}^{4}+\mathrm{BP}^{4}+\mathrm{CP}^{4}=18R^{4}`,
            },
            { k: "p", t: String.raw`で、どちらも $\mathrm{P}$ の位置によらない。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}=\mathrm{A}$ で確かめると、$\mathrm{AP}=0$、$\mathrm{BP}=\mathrm{CP}=\sqrt3R$（正三角形の1辺）なので $0+3R^{2}+3R^{2}=6R^{2}$ ✓、$0+9R^{4}+9R^{4}=18R^{4}$ ✓。`,
            },
          ],
          pitfalls: [
            String.raw`中心を原点にとると $\alpha+\beta+\gamma=0$ が使えて一気に片づく。`,
            String.raw`$120^{\circ}$ ずつ違う3つの角の $\cos$ の和も、$\cos$ の2倍角の和も $0$ になる。この2つを使う。`,
          ],
          check: String.raw`$R=2.3$ で $\mathrm{P}$ を4通りとると、どちらの和も一定で $6R^{2}$、$18R^{4}$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間図形",
      topics: ["平面の方程式", "線分との交点", "方べきの定理の逆", "領域の図示"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(a,b\\right)=\\left(1,2\\right),\\left(0.5,2.5\\right)$ で求めた $\\mathrm{T},\\mathrm{S}$ が平面 $\\tfrac xa+\\tfrac yb-\\tfrac z2=1$ 上にあり、$\\mathrm{T}$ は線分 $\\mathrm{AC}$ 上、$\\mathrm{S}$ は線分 $\\mathrm{BC}$ 上にあった",
          "$\\mathrm{PQ}\\cdot\\mathrm{PT}-\\mathrm{PR}\\cdot\\mathrm{PS}$ が $0$ になるのは $\\left(a-b\\right)\\left(3\\left(a+b\\right)+2ab-8\\right)=0$ のときと一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`座標空間に5点 $\mathrm{O}(0,0,0)$、$\mathrm{A}(3,0,0)$、$\mathrm{B}(0,3,0)$、$\mathrm{C}(0,0,4)$、$\mathrm{P}(0,0,-2)$ をとり、$0<a<3$、$0<b<3$ に対して $\mathrm{Q}(a,0,0)$、$\mathrm{R}(0,b,0)$ を考える。$\mathrm{P},\mathrm{Q},\mathrm{R}$ を通る平面を $H$ とするとき、$H$ と線分 $\mathrm{AC}$ の交点 $\mathrm{T}$、$H$ と線分 $\mathrm{BC}$ の交点 $\mathrm{S}$ の座標を求める`,
          answer: String.raw`$\mathrm{T}\left(\dfrac{9a}{3+2a},\ 0,\ \dfrac{4\left(3-a\right)}{3+2a}\right)$、$\mathrm{S}\left(0,\ \dfrac{9b}{3+2b},\ \dfrac{4\left(3-b\right)}{3+2b}\right)$`,
          approach: String.raw`$H$ は3つの座標軸を $\left(a,0,0\right)$、$\left(0,b,0\right)$、$\left(0,0,-2\right)$ で切るので、切片形で一発で書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$H$ は $x$ 軸、$y$ 軸、$z$ 軸をそれぞれ $a$、$b$、$-2$ で切るので、切片形で`,
            },
            {
              k: "math",
              t: String.raw`H\colon\frac xa+\frac yb+\frac{z}{-2}=1,\qquad\text{すなわち}\qquad\frac xa+\frac yb-\frac z2=1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{T}$。** 線分 $\mathrm{AC}$ は $\left(3-3t,\ 0,\ 4t\right)$（$0\leqq t\leqq1$）と書ける。代入すると`,
            },
            {
              k: "math",
              t: String.raw`\frac{3-3t}{a}-2t=1,\qquad3-3t=a\left(1+2t\right),\qquad t=\frac{3-a}{3+2a}`,
            },
            {
              k: "p",
              t: String.raw`である（$0<a<3$ より $0<t<1$ ✓）。これを代入して`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{T}\left(\frac{9a}{3+2a},\ 0,\ \frac{4\left(3-a\right)}{3+2a}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{S}$。** 線分 $\mathrm{BC}$ は $\left(0,\ 3-3s,\ 4s\right)$ で、まったく同じ計算により $s=\dfrac{3-b}{3+2b}$、`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{S}\left(0,\ \frac{9b}{3+2b},\ \frac{4\left(3-b\right)}{3+2b}\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`平面の切片形を使うと計算が最短になる。法線ベクトルを求めてから…とすると遠回り。`,
          ],
          check: String.raw`$\left(a,b\right)=\left(1,2\right)$ では $\mathrm{T}\left(1.8,0,1.6\right)$、$\mathrm{S}\left(0,\tfrac{18}7,\tfrac47\right)$ で、どちらも $H$ 上かつ線分上にあった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{Q},\mathrm{R},\mathrm{S},\mathrm{T}$ が同一円周上にあるための必要十分条件を $a,b$ を用いて表し、それを満たす点 $\left(a,b\right)$ の範囲を座標平面上に図示する`,
          answer: String.raw`$a=b$ または $2ab+3a+3b=8$（すなわち $\left(a+\dfrac32\right)\left(b+\dfrac32\right)=\dfrac{25}{4}$）。ただし $0<a<3$、$0<b<3$`,
          approach: String.raw`$\mathrm{Q},\mathrm{T}$ は平面 $y=0$ 上、$\mathrm{R},\mathrm{S}$ は平面 $x=0$ 上にあり、直線 $\mathrm{QT}$ と $\mathrm{RS}$ はどちらも $\mathrm{P}$ を通る。方べきの定理の逆が使える形である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**2直線は $\mathrm{P}$ で交わる。** $\mathrm{Q},\mathrm{T}$ はどちらも $y=0$ を満たし、$\mathrm{R},\mathrm{S}$ はどちらも $x=0$ を満たす。直線 $\mathrm{QT}$ と $\mathrm{RS}$ はともに平面 $H$ 上にあるので交わり、その交点は $x=y=0$、つまり $z$ 軸上で $H$ 上の点である。$H$ の式で $x=y=0$ とすると $-\dfrac z2=1$、$z=-2$ なので、交点は $\mathrm{P}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**方べきの定理。** $\mathrm{Q},\mathrm{T}$ は直線 $\mathrm{QT}$ 上、$\mathrm{R},\mathrm{S}$ は直線 $\mathrm{RS}$ 上にあり、2直線は $\mathrm{P}$ で交わる。$z$ 座標を見ると $\mathrm{P}$ は $-2$、$\mathrm{Q},\mathrm{R}$ は $0$、$\mathrm{S},\mathrm{T}$ は正なので、$\mathrm{P}$ は線分 $\mathrm{QT}$ の外側、線分 $\mathrm{RS}$ の外側にある。したがって4点が同一円周上にある必要十分条件は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}\cdot\mathrm{PT}=\mathrm{PR}\cdot\mathrm{PS}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**計算する。**` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}=\left|\left(a,0,2\right)\right|=\sqrt{a^{2}+4}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{T}$ の $z$ 座標に $2$ を足すと $\dfrac{4\left(3-a\right)+2\left(3+2a\right)}{3+2a}=\dfrac{18}{3+2a}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{PT}=\frac{1}{3+2a}\sqrt{\left(9a\right)^{2}+18^{2}}=\frac{9}{3+2a}\sqrt{a^{2}+4}`,
            },
            { k: "p", t: String.raw`である（$81a^{2}+324=81\left(a^{2}+4\right)$）。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}\cdot\mathrm{PT}=\frac{9\left(a^{2}+4\right)}{3+2a}`,
            },
            { k: "p", t: String.raw`であり、同様に $\mathrm{PR}\cdot\mathrm{PS}=\dfrac{9\left(b^{2}+4\right)}{3+2b}$ である。条件は` },
            {
              k: "math",
              t: String.raw`\frac{a^{2}+4}{3+2a}=\frac{b^{2}+4}{3+2b}`,
            },
            { k: "p", t: String.raw`すなわち $\left(a^{2}+4\right)\left(3+2b\right)=\left(b^{2}+4\right)\left(3+2a\right)$ である。展開して整理すると` },
            {
              k: "math",
              t: String.raw`3\left(a^{2}-b^{2}\right)+2ab\left(a-b\right)-8\left(a-b\right)=0,\qquad\left(a-b\right)\left\{3\left(a+b\right)+2ab-8\right\}=0`,
            },
            { k: "p", t: String.raw`である。したがって求める条件は` },
            {
              k: "math",
              t: String.raw`a=b\qquad\text{または}\qquad2ab+3a+3b=8`,
            },
            { k: "p", t: String.raw`である。後者は` },
            {
              k: "math",
              t: String.raw`2\left(a+\frac32\right)\left(b+\frac32\right)=2ab+3a+3b+\frac92=\frac{25}{2},\qquad\left(a+\frac32\right)\left(b+\frac32\right)=\frac{25}{4}`,
            },
            {
              k: "p",
              t: String.raw`と書ける。漸近線が $a=-\dfrac32$、$b=-\dfrac32$ の双曲線で、$b=\dfrac{8-3a}{2a+3}$ である。$0<b<3$ となるのは $0<a<\dfrac83$ のときである。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "太い線が条件を満たす (a, b) の集合。正方形 0 < a < 3、0 < b < 3 の中で、対角線 a = b と、双曲線 (a + 3/2)(b + 3/2) = 25/4 の一部（(0, 8/3) から (8/3, 0) まで、両端は除く）。2つは (1, 1) で交わる。",
                view: [-0.8, 3.8, -0.4, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [3, 0], dash: true, faint: true },
                  { k: "seg", a: [3, 0], b: [3, 3], dash: true, faint: true },
                  { k: "seg", a: [3, 3], b: [0, 3], dash: true, faint: true },
                  { k: "seg", a: [0, 3], b: [0, 0], dash: true, faint: true },
                  { k: "seg", a: [0, 0], b: [3, 3] },
                  { k: "curve", f: HYP20, from: 0, to: 8 / 3 },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "above-left" },
                  { k: "dot", at: [0, 8 / 3], label: "8/3", place: "left" },
                  { k: "dot", at: [8 / 3, 0], label: "8/3", place: "below" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`2つの曲線は $\left(1,1\right)$ で交わる。$a=b=1$ は $2+3+3=8$ を満たすからである。`,
            },
          ],
          pitfalls: [
            String.raw`4点が2つの直線に2個ずつ乗っていて、その2直線が1点で交わる、という構図に気づくこと。そこから方べきの定理（の逆）が使える。`,
            String.raw`$\mathrm{P}$ が両方の線分の外側にあることを確かめる。内側だと符号つきの扱いが変わる。`,
            String.raw`$\left(a-b\right)$ でくくれる。$a=b$ のほうを落とさない。`,
          ],
          check: String.raw`数値で $\mathrm{PQ}\cdot\mathrm{PT}-\mathrm{PR}\cdot\mathrm{PS}$ を計算すると、$a=b$ のときと $2ab+3a+3b=8$ のときにちょうど $0$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["斜めの直線のまわりの回転", "垂線の足", "断面積の積分", "パップス・ギュルダンでの確認"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,3,5$ で $\\displaystyle\\int 2\\pi x\\sin x\\cdot\\frac{1-\\cos x}{\\sqrt2}dx$ を数値積分すると $17.447160499,73.278074096,129.108987693$ で、$\\tfrac{\\sqrt2(8n-3)\\pi^{2}}4$ と小数9桁まで一致した",
          "パップス・ギュルダンの定理（重心までの距離 $\\tfrac{(8n-3)\\pi}{8\\sqrt2}$、面積 $2$）でも同じ値になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を正の奇数とし、曲線 $y=\sin x$（$\left(n-1\right)\pi\leqq x\leqq n\pi$）と $x$ 軸で囲まれた部分を $D_{n}$、直線 $x+y=0$ を $\ell$、$\ell$ のまわりに $D_{n}$ を1回転させてできる回転体を $V_{n}$ とする。$\left(n-1\right)\pi\leqq x\leqq n\pi$ に対して点 $\left(x,\sin x\right)$ を $\mathrm{P}$、$\mathrm{P}$ から $\ell$ に下ろした垂線と $x$ 軸の交点を $\mathrm{Q}$ とするとき、線分 $\mathrm{PQ}$ を $\ell$ のまわりに1回転させてできる図形の面積を $x$ の式で表す`,
          answer: String.raw`$2\pi x\sin x$`,
          approach: String.raw`$\mathrm{PQ}$ は $\ell$ に垂直なので、回すと円環になる。外側と内側の半径は、$\mathrm{P}$ と $\mathrm{Q}$ から $\ell$ までの距離である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell\colon x+y=0$ に垂直な方向は $\left(1,1\right)$ である。$\mathrm{P}\left(x,\sin x\right)$ を通りこの向きの直線は $\left(x+t,\ \sin x+t\right)$ で、$x$ 軸との交点は $t=-\sin x$ のときだから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{Q}\left(x-\sin x,\ 0\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`点 $\left(u,v\right)$ と $\ell$ の距離は $\dfrac{\left|u+v\right|}{\sqrt2}$ なので` },
            {
              k: "math",
              t: String.raw`d\left(\mathrm{P}\right)=\frac{x+\sin x}{\sqrt2},\qquad d\left(\mathrm{Q}\right)=\frac{x-\sin x}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`である（$n$ は奇数なので $\left(n-1\right)\pi\leqq x\leqq n\pi$ では $\sin x\geqq0$、また $x\geqq0$ かつ $x\geqq\sin x$ なのでどちらも $0$ 以上）。`,
            },
            {
              k: "p",
              t: String.raw`線分 $\mathrm{PQ}$ は $\ell$ に垂直なので、回すと外半径 $d\left(\mathrm{P}\right)$、内半径 $d\left(\mathrm{Q}\right)$ の円環になる。面積は`,
            },
            {
              k: "math",
              t: String.raw`\pi\left\{d\left(\mathrm{P}\right)^{2}-d\left(\mathrm{Q}\right)^{2}\right\}=\frac{\pi}{2}\left\{\left(x+\sin x\right)^{2}-\left(x-\sin x\right)^{2}\right\}=\frac{\pi}{2}\cdot4x\sin x`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`2\pi x\sin x` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "n = 1 のとき。網かけが D₁、右下がりの直線が ℓ : x + y = 0。P から ℓ に下ろした垂線（破線）が x 軸と交わる点が Q。線分 PQ は ℓ に垂直なので、回すと円環になる。",
                view: [-1.8, 3.6, -1.8, 1.8],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: Math.sin, bottom: () => 0, from: 0, to: Math.PI },
                  { k: "curve", f: Math.sin, from: 0, to: Math.PI },
                  { k: "curve", f: (x: number) => -x, from: -1.8, to: 1.8 },
                  { k: "seg", a: [FX20, FY20], b: [X0, PY20], dash: true },
                  { k: "dot", at: [X0, PY20], label: "P", place: "above-right" },
                  { k: "dot", at: [QX20, 0], label: "Q", place: "above-left" },
                  { k: "dot", at: [FX20, FY20] },
                  { k: "text", at: [-1.5, 1.5], label: "ℓ", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{PQ}$ が $\ell$ に垂直であることが効く。斜めの線分だと円環にならない。`,
            String.raw`$d\left(\mathrm{P}\right)^{2}-d\left(\mathrm{Q}\right)^{2}$ は和と差の積で一気に簡単になる。`,
          ],
          check: String.raw`この面積を使った積分が、パップス・ギュルダンの定理と一致した（(2) 参照）。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の結果を用いて、回転体 $V_{n}$ の体積を $n$ の式で表す`,
          answer: String.raw`$V_{n}=\dfrac{\sqrt2\left(8n-3\right)\pi^{2}}{4}$`,
          approach: String.raw`$\ell$ に沿った位置を $s$ とすると、断面積は (1) の円環の面積。$s$ と $x$ の関係を微分して $ds$ に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell$ 上の位置を測る。$\ell$ の方向ベクトルは $\dfrac{1}{\sqrt2}\left(1,-1\right)$ なので、点 $\left(u,v\right)$ の $\ell$ 方向の座標は $\dfrac{u-v}{\sqrt2}$ である。$\mathrm{P}$ と $\mathrm{Q}$ はどちらも`,
            },
            {
              k: "math",
              t: String.raw`s=\frac{x-\sin x}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である（同じ垂線の上にあるので当然）。微分すると` },
            {
              k: "math",
              t: String.raw`\frac{ds}{dx}=\frac{1-\cos x}{\sqrt2}\geqq0`,
            },
            {
              k: "p",
              t: String.raw`で、$s$ は $x$ とともに（広い意味で）増加する。$s$ の位置での断面積が (1) の $2\pi x\sin x$ なので`,
            },
            {
              k: "math",
              t: String.raw`V_{n}=\int2\pi x\sin x\,ds=\int_{\left(n-1\right)\pi}^{n\pi}2\pi x\sin x\cdot\frac{1-\cos x}{\sqrt2}dx`,
            },
            { k: "p", t: String.raw`である。$\sqrt2$ を整理して` },
            {
              k: "math",
              t: String.raw`V_{n}=\sqrt2\,\pi\int_{\left(n-1\right)\pi}^{n\pi}x\sin x\left(1-\cos x\right)dx`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**積分する。** $\sin x\cos x=\dfrac{\sin2x}{2}$ なので` },
            {
              k: "math",
              t: String.raw`\int x\sin x\left(1-\cos x\right)dx=\int x\sin x\,dx-\frac12\int x\sin2x\,dx`,
            },
            { k: "p", t: String.raw`で、部分積分により` },
            {
              k: "math",
              t: String.raw`\int x\sin x\,dx=-x\cos x+\sin x,\qquad\int x\sin2x\,dx=-\frac x2\cos2x+\frac14\sin2x`,
            },
            { k: "p", t: String.raw`である。したがって原始関数は` },
            {
              k: "math",
              t: String.raw`F(x)=-x\cos x+\sin x+\frac x4\cos2x-\frac18\sin2x`,
            },
            {
              k: "p",
              t: String.raw`である。$n$ は奇数なので $\cos n\pi=-1$、$\cos\left(n-1\right)\pi=1$、$\sin$ はどちらも $0$、$\cos2n\pi=\cos2\left(n-1\right)\pi=1$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`F\left(n\pi\right)=n\pi+\frac{n\pi}{4}=\frac{5n\pi}{4},\qquad F\left(\left(n-1\right)\pi\right)=-\left(n-1\right)\pi+\frac{\left(n-1\right)\pi}{4}=-\frac{3\left(n-1\right)\pi}{4}`,
            },
            { k: "p", t: String.raw`である。差をとると` },
            {
              k: "math",
              t: String.raw`\int_{\left(n-1\right)\pi}^{n\pi}x\sin x\left(1-\cos x\right)dx=\frac{5n\pi+3\left(n-1\right)\pi}{4}=\frac{\left(8n-3\right)\pi}{4}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`V_{n}=\sqrt2\,\pi\cdot\frac{\left(8n-3\right)\pi}{4}=\frac{\sqrt2\left(8n-3\right)\pi^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`パップス・ギュルダンの定理でも確かめられる。$D_{n}$ の面積は $2$、重心は $\left(\dfrac{\left(2n-1\right)\pi}{2},\ \dfrac{\pi}{8}\right)$ なので $\ell$ までの距離は $\dfrac{\left(8n-3\right)\pi}{8\sqrt2}$ で、$V=2\pi\cdot\dfrac{\left(8n-3\right)\pi}{8\sqrt2}\cdot2=\dfrac{\sqrt2\left(8n-3\right)\pi^{2}}{4}$ ✓。`,
            },
          ],
          pitfalls: [
            String.raw`$ds$ と $dx$ の関係を忘れない。$\ell$ に沿った長さで積分する。`,
            String.raw`$n$ が奇数であることを使って三角関数の値を確定させる。偶数だと符号が変わる。`,
          ],
          check: String.raw`$n=1,3,5$ で数値積分すると $17.447160499$、$73.278074096$、$129.108987693$ で、式の値と小数9桁まで一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法・極限",
      topics: ["部分積分による漸化式", "はさみうちと極限", "次の項までの展開", "漸近展開"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$k=1,2,3,5$ で $a_{k+2}$ を $\\sin$ の級数から分数で出したものと $\\tfrac{4(k+1)}{\\pi^{2}}\\left(1-ka_{k}\\right)$ が小数30桁まで一致した",
          "$k\\,a_{k}$ は $k=10,100,1000,10000$ で $0.98156,0.99976,0.9999975,0.99999998$ と $1$ に近づいた",
          "$k^{3}a_{k}-k^{2}$ は $k=10000$ で $-2.466661$ で、$-\\tfrac{\\pi^{2}}4=-2.467401$ に近づいた",
          "$k^{4}a_{k}-k^{3}-kB$ は $k=10000$ で $7.401085$ で、$\\tfrac{3\\pi^{2}}4=7.402203$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$k$ を正の整数とし $a_{k}=\displaystyle\int_{0}^{1}x^{k-1}\sin\left(\frac{\pi x}{2}\right)dx$ とおく。$a_{k+2}$ を $a_{k}$ と $k$ を用いて表す`,
          answer: String.raw`$a_{k+2}=\dfrac{4\left(k+1\right)}{\pi^{2}}\left(1-k\,a_{k}\right)$`,
          approach: String.raw`部分積分を2回。$\cos\dfrac{\pi}{2}=0$、$\sin\dfrac{\pi}{2}=1$ なので境界項がきれいになる。`,
          blocks: [
            { k: "p", t: String.raw`$c=\dfrac{\pi}{2}$ とおく。` },
            {
              k: "math",
              t: String.raw`a_{k+2}=\int_{0}^{1}x^{k+1}\sin\left(cx\right)dx=\left[-\frac{x^{k+1}\cos\left(cx\right)}{c}\right]_{0}^{1}+\frac{k+1}{c}\int_{0}^{1}x^{k}\cos\left(cx\right)dx`,
            },
            {
              k: "p",
              t: String.raw`である。$\cos c=\cos\dfrac{\pi}{2}=0$ なので境界項は $0$ である。もう一度部分積分すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}x^{k}\cos\left(cx\right)dx=\left[\frac{x^{k}\sin\left(cx\right)}{c}\right]_{0}^{1}-\frac kc\int_{0}^{1}x^{k-1}\sin\left(cx\right)dx=\frac1c-\frac kc a_{k}`,
            },
            { k: "p", t: String.raw`である（$\sin c=1$）。したがって` },
            {
              k: "math",
              t: String.raw`a_{k+2}=\frac{k+1}{c}\left(\frac1c-\frac kc a_{k}\right)=\frac{k+1}{c^{2}}\left(1-k\,a_{k}\right)`,
            },
            { k: "p", t: String.raw`で、$c^{2}=\dfrac{\pi^{2}}{4}$ なので` },
            {
              k: "math",
              t: String.raw`a_{k+2}=\frac{4\left(k+1\right)}{\pi^{2}}\left(1-k\,a_{k}\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$k=1,2,3,5$ で $\sin$ の級数から分数で出した値と比べると、小数30桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$k$ を限りなく大きくするとき、数列 $\left\{k\,a_{k}\right\}$ の極限値 $A$ を求める`,
          answer: String.raw`$A=1$`,
          approach: String.raw`$k\,a_{k}=\displaystyle\int_{0}^{1}kx^{k-1}\sin\left(cx\right)dx$ を部分積分すると、残る積分が $\dfrac{1}{k+1}$ で押さえられる。`,
          blocks: [
            { k: "p", t: String.raw`$c=\dfrac{\pi}{2}$ とする。$\left(x^{k}\right)'=kx^{k-1}$ なので部分積分して` },
            {
              k: "math",
              t: String.raw`k\,a_{k}=\int_{0}^{1}kx^{k-1}\sin\left(cx\right)dx=\Bigl[x^{k}\sin\left(cx\right)\Bigr]_{0}^{1}-c\int_{0}^{1}x^{k}\cos\left(cx\right)dx=1-c\int_{0}^{1}x^{k}\cos\left(cx\right)dx`,
            },
            { k: "p", t: String.raw`である（$\sin c=1$）。残った積分は $\left|\cos\left(cx\right)\right|\leqq1$ より` },
            {
              k: "math",
              t: String.raw`\left|\int_{0}^{1}x^{k}\cos\left(cx\right)dx\right|\leqq\int_{0}^{1}x^{k}dx=\frac{1}{k+1}\xrightarrow[k\to\infty]{}0`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`A=\lim_{k\to\infty}k\,a_{k}=1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$kx^{k-1}$ は $x=1$ に集中していく重み（$\displaystyle\int_{0}^{1}kx^{k-1}dx=1$）なので、$k\,a_{k}$ は $\sin\left(\dfrac{\pi\cdot1}{2}\right)=1$ に近づく、と見ることもできる。`,
            },
          ],
          check: String.raw`$k=10000$ で $k\,a_{k}=0.999999975$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) の極限値 $A$ に対し、$k$ を限りなく大きくするとき数列 $\left\{k^{m}a_{k}-k^{n}A\right\}$ が $0$ ではない値に収束する整数 $m,n$（$m>n\geqq1$）を求め、そのときの極限値 $B$ を求める`,
          answer: String.raw`$m=3$、$n=2$、$B=-\dfrac{\pi^{2}}{4}$`,
          approach: String.raw`(2) の計算に出た「残りの積分」をもう一段評価する。(1) を使うと、その積分が $a_{k+2}$ で書ける。`,
          blocks: [
            { k: "p", t: String.raw`$J_{k}=\displaystyle\int_{0}^{1}x^{k}\cos\left(cx\right)dx$ とおくと、(2) より` },
            {
              k: "math",
              t: String.raw`k\,a_{k}-1=-c\,J_{k}`,
            },
            { k: "p", t: String.raw`である。$J_{k}$ を部分積分すると` },
            {
              k: "math",
              t: String.raw`J_{k}=\left[\frac{x^{k+1}\cos\left(cx\right)}{k+1}\right]_{0}^{1}+\frac{c}{k+1}\int_{0}^{1}x^{k+1}\sin\left(cx\right)dx=\frac{c\,a_{k+2}}{k+1}`,
            },
            { k: "p", t: String.raw`である（$\cos c=0$）。したがって` },
            {
              k: "math",
              t: String.raw`k\,a_{k}-1=-\frac{c^{2}a_{k+2}}{k+1}`,
            },
            { k: "p", t: String.raw`である。$A=1$ なので` },
            {
              k: "math",
              t: String.raw`k^{m}a_{k}-k^{n}=k^{m-1}\left(k\,a_{k}\right)-k^{n}=k^{m-1}\left(1-\frac{c^{2}a_{k+2}}{k+1}\right)-k^{n}`,
            },
            {
              k: "p",
              t: String.raw`である。(2) を $k+2$ に使うと $\left(k+2\right)a_{k+2}\to1$、つまり $a_{k+2}\sim\dfrac{1}{k+2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{c^{2}a_{k+2}}{k+1}=\frac{c^{2}}{\left(k+1\right)\left(k+2\right)}\left\{\left(k+2\right)a_{k+2}\right\}\sim\frac{c^{2}}{k^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$k^{m-1}-k^{n}$ が残らないためには $m-1=n$ でなければならず、そのとき`,
            },
            {
              k: "math",
              t: String.raw`k^{m}a_{k}-k^{n}=-k^{m-1}\cdot\frac{c^{2}a_{k+2}}{k+1}=-c^{2}\cdot\frac{k^{m-1}}{\left(k+1\right)\left(k+2\right)}\left\{\left(k+2\right)a_{k+2}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{k^{m-1}}{\left(k+1\right)\left(k+2\right)}$ が $0$ でない値に収束するのは $m-1=2$、つまり $m=3$ のときで、そのとき極限は $1$ である。よって $n=m-1=2$ で`,
            },
            {
              k: "math",
              t: String.raw`B=\lim_{k\to\infty}\left(k^{3}a_{k}-k^{2}\right)=-c^{2}=-\frac{\pi^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$J_{k}$ を $a_{k+2}$ で書き直すのが鍵。(1) の部分積分がそのまま使える。`,
            String.raw`$m-1=n$ でないと $k^{m-1}-k^{n}$ が発散する（または $0$ に収束してしまう）。`,
          ],
          check: String.raw`$k=1000$ で $k^{3}a_{k}-k^{2}=-2.460007$ で、$-\dfrac{\pi^{2}}{4}=-2.467401$ に近づいた。`,
        },
        {
          label: "(4)",
          task: String.raw`(2) と (3) の極限値 $A,B$ に対し、$k$ を限りなく大きくするとき数列 $\left\{k^{p}a_{k}-k^{q}A-k^{r}B\right\}$ が $0$ ではない値に収束する整数 $p,q,r$（$p>q>r\geqq1$）を求め、そのときの極限値を求める`,
          answer: String.raw`$p=4$、$q=3$、$r=1$、極限値は $\dfrac{3\pi^{2}}{4}$`,
          approach: String.raw`(3) で得た $k\,a_{k}=1-\dfrac{c^{2}a_{k+2}}{k+1}$ をもう一段展開する。$\dfrac{k^{3}}{\left(k+1\right)\left(k+2\right)}=k-3+O\left(\dfrac1k\right)$ という展開が効く。`,
          blocks: [
            { k: "p", t: String.raw`(3) の式を $k^{p}$ 倍の形に直すと、$A=1$、$B=-c^{2}$ より` },
            {
              k: "math",
              t: String.raw`k^{p}a_{k}-k^{q}-k^{r}B=k^{p-1}\left(k\,a_{k}\right)-k^{q}+c^{2}k^{r}`,
            },
            { k: "p", t: String.raw`である。$k\,a_{k}=1-\dfrac{c^{2}a_{k+2}}{k+1}$ を入れて $q=p-1$ とすると、$k^{p-1}$ が消えて` },
            {
              k: "math",
              t: String.raw`=c^{2}\left\{k^{r}-\frac{k^{p-1}a_{k+2}}{k+1}\right\}`,
            },
            { k: "p", t: String.raw`である。ここで $\left(k+2\right)a_{k+2}=1+\varepsilon_{k}$（$\varepsilon_{k}\to0$）とおくと` },
            {
              k: "math",
              t: String.raw`\frac{k^{p-1}a_{k+2}}{k+1}=k^{p-3}\cdot\frac{k^{2}}{\left(k+1\right)\left(k+2\right)}\left(1+\varepsilon_{k}\right)`,
            },
            { k: "p", t: String.raw`である。(3) より $\varepsilon_{k}=O\!\left(\dfrac{1}{k^{2}}\right)$ であり、また` },
            {
              k: "math",
              t: String.raw`\frac{k^{2}}{\left(k+1\right)\left(k+2\right)}=\frac{1}{1+\frac3k+\frac{2}{k^{2}}}=1-\frac3k+O\!\left(\frac{1}{k^{2}}\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{k^{p-1}a_{k+2}}{k+1}=k^{p-3}-3k^{p-4}+O\!\left(k^{p-5}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$k^{r}$ とこの第1項が打ち消すには $r=p-3$ でなければならず、そのとき`,
            },
            {
              k: "math",
              t: String.raw`k^{p}a_{k}-k^{p-1}-k^{p-3}B=c^{2}\left\{3k^{p-4}+O\!\left(k^{p-5}\right)\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。これが $0$ でない値に収束するのは $p-4=0$、つまり $p=4$ のときで、そのとき`,
            },
            {
              k: "math",
              t: String.raw`q=p-1=3,\qquad r=p-3=1`,
            },
            { k: "p", t: String.raw`であり（$4>3>1\geqq1$ ✓）、極限値は` },
            {
              k: "math",
              t: String.raw`3c^{2}=\frac{3\pi^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`まとめると $a_{k}=\dfrac1k-\dfrac{\pi^{2}}{4k^{3}}+\dfrac{3\pi^{2}}{4k^{4}}+\cdots$ という展開が得られたことになる。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{k^{2}}{\left(k+1\right)\left(k+2\right)}$ を $1-\dfrac3k+\cdots$ と展開する。$1$ と見てしまうと次の項が出ない。`,
            String.raw`$r=p-3$ なので $q$ と $r$ は連続しない（$q=3$、$r=1$）。`,
          ],
          check: String.raw`$k=10000$ で $k^{4}a_{k}-k^{3}-kB=7.401085$ で、$\dfrac{3\pi^{2}}{4}=7.402203$ に近づいた。`,
        },
      ],
    },
  ],
};
