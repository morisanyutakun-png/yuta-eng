import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2021年度（令和3年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問。内接円の半径 (3-√5)/2 と、PQ が最大になる円の半径 3/2。 */
const R21 = (3 - Math.sqrt(5)) / 2;

/** 第2問の境界。条件 A は y = x²/8、条件 B は |x| ≦ 4 で x²/8、それ以外で |x|-2。 */
const BA21 = (x: number): number => (x * x) / 8;
const BB21 = (x: number): number => (Math.abs(x) <= 4 ? (x * x) / 8 : Math.abs(x) - 2);

/** 第3問（a=5）の放物線と直線。 */
const C21 = (x: number): number => -x * x - 10 * x - 75;
const L21 = (x: number): number => 8 * x + 6;

export const kyudaiBunkei2021: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式",
      topics: ["内接円", "点と直線の距離", "弦の長さ", "2次関数の最大"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$r=\\frac{3-\\sqrt5}2=0.381966011$ とすると、点 $(r,r)$ から直線 $\\mathrm{AB}$ までの距離も $0.381966011$ になった",
          "$r$ を $40$ 万点に刻んで $\\mathrm{PQ}$ を計算すると、最大は $r=1.5$ での $2.0$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角形 $\mathrm{OAB}$ に内接する円の中心の座標を求める`,
          answer: String.raw`$\left(\dfrac{3-\sqrt5}2,\;\dfrac{3-\sqrt5}2\right)$`,
          approach: String.raw`$\mathrm{OA}$ は $x$ 軸上、$\mathrm{OB}$ は $y$ 軸上にあるので、内接円は両軸に接する。中心は $(r,r)$（$r$ は半径）で、面積と周の長さから $r$ が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O}(0,0)$、$\mathrm{A}(1,0)$、$\mathrm{B}(0,2)$ は直角三角形をなし、辺 $\mathrm{OA}$ は $x$ 軸上、辺 $\mathrm{OB}$ は $y$ 軸上にある。内接円はこの2辺に接するので、中心は第1象限の $(r,r)$（$r$ は内接円の半径）である。`,
            },
            {
              k: "p",
              t: String.raw`**$r$ を出す。** 三角形の面積 $S$ と周の長さの半分 $s$ について $S=rs$ である。`,
            },
            {
              k: "math",
              t: String.raw`S=\frac12\cdot1\cdot2=1,\qquad
s=\frac{\mathrm{OA}+\mathrm{OB}+\mathrm{AB}}2=\frac{1+2+\sqrt5}2=\frac{3+\sqrt5}2`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`r=\frac Ss=\frac2{3+\sqrt5}=\frac{2\left(3-\sqrt5\right)}{9-5}=\frac{3-\sqrt5}2`,
            },
            { k: "p", t: String.raw`である（$0.382$ ほど）。よって中心は` },
            {
              k: "math",
              t: String.raw`\left(\frac{3-\sqrt5}2,\;\frac{3-\sqrt5}2\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$S=rs$ を使わず、直線 $\mathrm{AB}:2x+y=2$ までの距離が $r$ に等しいとしてもよい。$\dfrac{\left|2r+r-2\right|}{\sqrt5}=r$ で、内部では $3r<2$ だから $2-3r=\sqrt5\,r$、$r=\dfrac2{3+\sqrt5}$ と同じ式になる。`,
            },
          ],
          pitfalls: [
            String.raw`内接円が2つの座標軸に接することに気づけば、中心が $(r,r)$ の形に決まる。一般の三角形のように3本の角の二等分線を連立しなくてよい。`,
            String.raw`$\frac2{3+\sqrt5}$ は有理化する。分母の $9-5=4$ で約分が効く。`,
          ],
          check: String.raw`$r=0.381966011$ として $(r,r)$ から直線 $\mathrm{AB}$ までの距離を計算すると $0.381966011$ で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`中心が第1象限にあり $x$ 軸と $y$ 軸の両方に接し、直線 $\mathrm{AB}$ と異なる2点 $\mathrm{P},\mathrm{Q}$ で交わる円について、$\mathrm{PQ}$ の最大値を求める`,
          answer: String.raw`$\mathrm{PQ}$ の最大値は $2$（半径 $\dfrac32$ のとき）`,
          approach: String.raw`両軸に接し中心が第1象限にある円は、中心 $(r,r)$・半径 $r$ である。弦の長さは $2\sqrt{r^{2}-d^{2}}$（$d$ は中心と直線の距離）なので、$r^{2}-d^{2}$ を $r$ の2次関数として最大にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`円の中心は $(r,r)$、半径は $r>0$ である。直線 $\mathrm{AB}$ は $\dfrac x1+\dfrac y2=1$、すなわち $2x+y-2=0$ なので、中心からの距離は`,
            },
            {
              k: "math",
              t: String.raw`d=\frac{\left|2r+r-2\right|}{\sqrt5}=\frac{\left|3r-2\right|}{\sqrt5}`,
            },
            {
              k: "p",
              t: String.raw`である。異なる2点で交わる条件は $d<r$ で、そのとき`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}=2\sqrt{r^{2}-d^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**中身を最大にする。** ` },
            {
              k: "math",
              t: String.raw`r^{2}-d^{2}=r^{2}-\frac{(3r-2)^{2}}5=\frac{5r^{2}-9r^{2}+12r-4}5=\frac{-4r^{2}+12r-4}5`,
            },
            {
              k: "p",
              t: String.raw`で、$-4r^{2}+12r-4$ は上に凸、$r=\dfrac{12}8=\dfrac32$ で最大になる。そのとき`,
            },
            {
              k: "math",
              t: String.raw`-4\cdot\frac94+18-4=-9+18-4=5,\qquad r^{2}-d^{2}=\frac55=1`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{PQ}=2\sqrt1=2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**交わっているか。** $r=\dfrac32$ のとき $d=\dfrac{\left|\frac92-2\right|}{\sqrt5}=\dfrac{5/2}{\sqrt5}=\dfrac{\sqrt5}2=1.118<1.5=r$ なので、確かに異なる2点で交わる。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\mathrm{PQ}$ が最大になるのは半径 $\frac32$ の円（大きい円）。$\mathrm{P},\mathrm{Q}$ はその円と直線 $\mathrm{AB}$ の交点で、どちらも線分 $\mathrm{AB}$ の内部にある。中心 $\left(\frac32,\frac32\right)$ から直線 $\mathrm{AB}:2x+y=2$ までの距離は $\frac{\sqrt5}2=1.118$ で、弦 $\mathrm{PQ}$ の長さは $2$。小さいほうは (1) の内接円（半径 $\frac{3-\sqrt5}2=0.382$）で、$\mathrm{AB}$ に接している。`,
                view: [-0.7, 3.5, -0.75, 3.05],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (u: number): [number, number] => [1.5 + 1.5 * Math.cos(u), 1.5 + 1.5 * Math.sin(u)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (u: number): [number, number] => [R21 + R21 * Math.cos(u), R21 + R21 * Math.sin(u)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [0, 2], b: [1, 0] },
                  { k: "dot", at: [1, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [0, 2], label: "B", place: "above-left" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1.5, 1.5], label: "(3/2, 3/2)", place: "above-right" },
                  { k: "dot", at: [R21, R21], label: "", place: "right" },
                  { k: "dot", at: [0.5 + 1 / Math.sqrt(5), 1 - 2 / Math.sqrt(5)], label: "P", place: "below-right" },
                  { k: "dot", at: [0.5 - 1 / Math.sqrt(5), 1 + 2 / Math.sqrt(5)], label: "Q", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「両軸に接し中心が第1象限」から中心 $(r,r)$・半径 $r$ と1変数になる。ここが出発点である。`,
            String.raw`$\mathrm{PQ}$ のまま微分せず、$r^{2}-d^{2}$ を最大にする。$\sqrt{\;}$ は単調なので最大の位置は変わらない。`,
            String.raw`最大を与える $r$ が「交わる」条件 $d<r$ をみたすか確かめる。みたさなければ端で考え直すことになる。`,
          ],
          check: String.raw`$r$ を $40$ 万点に刻んで $\mathrm{PQ}$ を計算すると、最大は $r=1.5$ での $2.000000000$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "2次関数",
      topics: ["すべての t で成り立つ条件", "最大値", "定義域つきの最大", "領域の図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ を $-10$ から $10$ まで $0.05$ 刻みにとり、$t$ を細かく動かして $xt-2t^{2}$ の最大を数値で求めると $\\frac{x^{2}}8$ と一致した",
          "$\\left|t\\right|\\le1$ に制限すると、$\\left|x\\right|\\le4$ では $\\frac{x^{2}}8$、$\\left|x\\right|>4$ では $\\left|x\\right|-2$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件 A（すべての実数 $t$ に対して $y\ge xt-2t^{2}$）をみたす点 $(x,y)$ 全体の集合を図示する`,
          answer: String.raw`$y\ge\dfrac{x^{2}}8$（放物線 $y=\frac{x^{2}}8$ の上側、境界を含む）`,
          approach: String.raw`「すべての $t$ で $y\ge h(t)$」は「$y\ge\displaystyle\max_t h(t)$」と同じである。$h(t)=-2t^{2}+xt$ は上に凸の2次関数なので、頂点の値が最大値になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h(t)=xt-2t^{2}=-2t^{2}+xt$ とおく。$t^{2}$ の係数が $-2<0$ なので上に凸で、平方完成すると`,
            },
            {
              k: "math",
              t: String.raw`h(t)=-2\left(t-\frac x4\right)^{2}+\frac{x^{2}}8`,
            },
            {
              k: "p",
              t: String.raw`である。$t$ は実数全体を動けるので $t=\dfrac x4$ をとれて、最大値は $\dfrac{x^{2}}8$ である。`,
            },
            { k: "p", t: String.raw`したがって条件 A は` },
            { k: "math", t: String.raw`y\ge\frac{x^{2}}8` },
            {
              k: "p",
              t: String.raw`と同値である。求める集合は放物線 $y=\dfrac{x^{2}}8$ とその上側（境界を含む）である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`条件 A をみたす点の集合（放物線 $y=\frac{x^{2}}8$ の上側、境界を含む）。$y=xt-2t^{2}$ は傾き $t$・切片 $-2t^{2}$ の直線の族で、この放物線はそれらすべての包絡線になっている。`,
                view: [-8.4, 8.4, -2.6, 10.4],
                step: { x: 2, y: 2 },
                items: [
                  { k: "curve", f: BA21, from: -8.2, to: 8.2 },
                  { k: "curve", f: (x: number) => 1 * x - 2, from: -8.4, to: 8.4, dash: true, faint: true },
                  { k: "curve", f: (x: number) => 2 * x - 8, from: -8.4, to: 8.4, dash: true, faint: true },
                  { k: "curve", f: (x: number) => -2 * x - 8, from: -8.4, to: 8.4, dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [4, 2], label: "(4, 2)", place: "right" },
                  { k: "dot", at: [-4, 2], label: "(-4, 2)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「すべての $t$ で成り立つ」は「最大値以下」ではなく「最大値**以上**」。$y\ge h(t)$ の向きに注意する。`,
            String.raw`$t$ について平方完成する。$x$ は定数扱いである。`,
            String.raw`境界（放物線そのもの）は含む。不等号が $\ge$ だからである。`,
          ],
          check: String.raw`$x$ を $-10$ から $10$ まで $0.05$ 刻みにとり、$t$ を細かく動かして $xt-2t^{2}$ の最大を数値で求めると、$\frac{x^{2}}8$ と $10^{-5}$ 以内で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`条件 B（$\left|t\right|\le1$ をみたすすべての実数 $t$ に対して $y\ge xt-2t^{2}$）をみたす点 $(x,y)$ 全体の集合を図示する`,
          answer: String.raw`$\left|x\right|\le4$ のとき $y\ge\dfrac{x^{2}}8$、$\left|x\right|>4$ のとき $y\ge\left|x\right|-2$`,
          approach: String.raw`今度は $t$ の範囲が $[-1,1]$ に限られるので、頂点 $t=\dfrac x4$ がこの区間に入るかで場合分けする。入らなければ端点で最大になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) と同じく $h(t)=-2\left(t-\dfrac x4\right)^{2}+\dfrac{x^{2}}8$ である。$-1\le t\le1$ での最大値を考える。頂点は $t=\dfrac x4$ なので、`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-1\le\dfrac x4\le1$（すなわち $\left|x\right|\le4$）：頂点が区間内にあり、最大値は $\dfrac{x^{2}}8$`,
                String.raw`$\dfrac x4>1$（すなわち $x>4$）：区間で増加なので $t=1$ で最大、$h(1)=x-2$`,
                String.raw`$\dfrac x4<-1$（すなわち $x<-4$）：区間で減少なので $t=-1$ で最大、$h(-1)=-x-2$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって条件 B は` },
            {
              k: "math",
              t: String.raw`y\ge\begin{cases}\dfrac{x^{2}}8&\left(\left|x\right|\le4\right)\\[2mm]\left|x\right|-2&\left(\left|x\right|>4\right)\end{cases}`,
            },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`**境界はつながる。** $x=4$ では $\dfrac{16}8=2$、$4-2=2$ で一致する。さらに $y=\dfrac{x^{2}}8$ の $x=4$ での接線は $y'=\dfrac x4=1$ より $y=x-2$ なので、放物線と直線はここで**接して**いる。$x=-4$ でも同様である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`条件 B をみたす点の集合（境界の上側、境界を含む）。境界は $\left|x\right|\le4$ では放物線 $y=\frac{x^{2}}8$、$\left|x\right|>4$ ではそれに $(\pm4,2)$ で接する2本の直線 $y=\left|x\right|-2$。条件 A の領域（放物線の上側）より広い。`,
                view: [-8.4, 8.4, -2.6, 10.4],
                step: { x: 2, y: 2 },
                items: [
                  { k: "curve", f: BB21, from: -8.2, to: 8.2 },
                  { k: "curve", f: BA21, from: -8.2, to: 8.2, dash: true, faint: true },
                  { k: "dot", at: [4, 2], label: "(4, 2)", place: "below-right" },
                  { k: "dot", at: [-4, 2], label: "(-4, 2)", place: "below-left" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`頂点が区間 $[-1,1]$ に入るかで3通りに分ける。$x$ の範囲に直すと $\left|x\right|\le4$ が境目になる。`,
            String.raw`$x>4$ では最大値が $x-2$（$t=1$）、$x<-4$ では $-x-2$（$t=-1$）。まとめて $\left|x\right|-2$ と書ける。`,
            String.raw`条件 B の領域は条件 A の領域を含む。$t$ の範囲が狭いぶん条件が弱くなるからで、図でも外側が広がっている。`,
          ],
          check: String.raw`$\left|t\right|\le1$ に制限して数値で最大を求めると、$\left|x\right|\le4$ では $\frac{x^{2}}8$、$\left|x\right|>4$ では $\left|x\right|-2$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分法",
      topics: ["接する条件", "3次方程式", "因数分解", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $0$ から $20$ まで $0.0001$ 刻みで動かして判別式が $0$ になる値を探すと $a=5$ だけだった",
          "$a^{3}-a^{2}-18a-10=(a-5)\\left(a^{2}+4a+2\\right)$ で、$a^{2}+4a+2=0$ の根 $-2\\pm\\sqrt2$ はどちらも負であることを確かめた",
          "$a=5$ のとき接点は $(-9,-66)$ で、面積を数値積分すると $243.000000$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`放物線 $C$ と直線 $\ell:y=8x+6$ が接するような $a$ の値を求める`,
          answer: String.raw`$a=5$`,
          approach: String.raw`連立して2次方程式にし、判別式 $=0$ とおく。$a$ の3次方程式になるが、$a=5$ が見つかれば因数分解できる。`,
          blocks: [
            { k: "p", t: String.raw`$C$ と $\ell$ を連立すると` },
            {
              k: "math",
              t: String.raw`-x^{2}-2ax-a^{3}+10a=8x+6`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`x^{2}+(2a+8)x+a^{3}-10a+6=0`,
            },
            { k: "p", t: String.raw`である。接する条件は判別式 $=0$ で` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
D&=(2a+8)^{2}-4\left(a^{3}-10a+6\right)\\[1mm]
&=4a^{2}+32a+64-4a^{3}+40a-24\\[1mm]
&=-4\left(a^{3}-a^{2}-18a-10\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`a^{3}-a^{2}-18a-10=0`,
            },
            {
              k: "p",
              t: String.raw`である。$a=5$ を代入すると $125-25-90-10=0$ で成り立つので、$a-5$ でくくれて`,
            },
            {
              k: "math",
              t: String.raw`(a-5)\left(a^{2}+4a+2\right)=0`,
            },
            {
              k: "p",
              t: String.raw`となる。$a^{2}+4a+2=0$ の解は $a=-2\pm\sqrt2$ で、$-2+\sqrt2=-0.586$、$-2-\sqrt2=-3.414$ とどちらも負である。$a>0$ より`,
            },
            { k: "math", t: String.raw`a=5` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$-x^{2}$ のまま判別式を使わず、$x^{2}$ の係数を $+1$ にそろえてから立てる。`,
            String.raw`$a^{3}-a^{2}-18a-10=0$ の整数解は $\pm1,\pm2,\pm5,\pm10$ の中にある。$a=5$ を先に試す。`,
            String.raw`$a>0$ の条件で残り2つの解を切る。$-2+\sqrt2$ は $0$ に近いが負である。`,
          ],
          check: String.raw`$a$ を $0$ から $20$ まで $0.0001$ 刻みで動かして $D=0$ となる値を探すと $a=5$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a$ が (1) の値のとき、放物線 $C$、直線 $\ell$、$y$ 軸で囲まれた図形の面積を求める`,
          answer: String.raw`$243$`,
          approach: String.raw`$a=5$ のとき $C:y=-x^{2}-10x-75$ で、$\ell$ と $x=-9$ で接する。$\ell-C$ が完全平方になるので、$-9$ から $0$ まで積分すればよい。`,
          blocks: [
            { k: "p", t: String.raw`$a=5$ より` },
            {
              k: "math",
              t: String.raw`C:y=-x^{2}-10x-125+50=-x^{2}-10x-75`,
            },
            { k: "p", t: String.raw`である。(1) の2次方程式は` },
            {
              k: "math",
              t: String.raw`x^{2}+18x+81=(x+9)^{2}=0`,
            },
            {
              k: "p",
              t: String.raw`なので接点は $x=-9$、$y=8(-9)+6=-66$、すなわち $(-9,-66)$ である。`,
            },
            { k: "p", t: String.raw`**差。** ` },
            {
              k: "math",
              t: String.raw`(8x+6)-\left(-x^{2}-10x-75\right)=x^{2}+18x+81=(x+9)^{2}\ge0`,
            },
            {
              k: "p",
              t: String.raw`なので、$\ell$ はつねに $C$ の上（または接点で一致）にある。囲まれる図形は、左端が接点 $x=-9$、右端が $y$ 軸（$x=0$）で、上が $\ell$、下が $C$ である。`,
            },
            { k: "p", t: String.raw`**面積。** ` },
            {
              k: "math",
              t: String.raw`S=\int_{-9}^{0}(x+9)^{2}dx=\left[\frac{(x+9)^{3}}3\right]_{-9}^{0}=\frac{729}3=243`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=5$ のときの $C:y=-x^{2}-10x-75$ と $\ell:y=8x+6$。$(-9,-66)$ で接し、$y$ 軸上では $C$ が $-75$、$\ell$ が $6$。この3つで囲まれる部分（塗った部分）の面積が $243$。`,
                view: [-11.5, 2.5, -95, 20],
                step: { x: 2, y: 20 },
                items: [
                  { k: "curve", f: C21, from: -11.3, to: 2.3 },
                  { k: "curve", f: L21, from: -11.5, to: 2.5, dash: true },
                  { k: "fillBetween", top: L21, bottom: C21, from: -9, to: 0 },
                  { k: "dot", at: [-9, -66], label: "(-9, -66)", place: "below-left" },
                  { k: "dot", at: [0, 6], label: "(0, 6)", place: "right" },
                  { k: "dot", at: [0, -75], label: "(0, -75)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「$y$ 軸で囲まれた」なので右端は $x=0$ である。$C$ と $\ell$ は1点で接するだけなので、$y$ 軸がないと図形が閉じない。`,
            String.raw`接しているから $\ell-C$ が完全平方 $(x+9)^{2}$ になる。展開して積分するより速い。`,
            String.raw`$(0+9)^{3}-(-9+9)^{3}=729$ である。$9^{3}=729$。`,
          ],
          check: String.raw`接点は $C(-9)=\ell(-9)=-66$ で一致し、面積を数値積分すると $243.000000$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["等差×等比の和", "階差をとる", "和の形の漸化式", "一般項"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,2,3,5,8$ で $\\sum_{k=1}^{n}k\\,2^{k-1}$ を直接足すと $1,5,17,129,1793$ となり、$(n-1)2^{n}+1$ と一致した",
          "漸化式から $a_1$ から $a_{12}$ まで分数のまま計算すると $2,2,4,8,16,32,\\dots$ となり、$a_1=2$、$n\\ge2$ で $a_n=2^{n-1}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を自然数とするとき $\displaystyle\sum_{k=1}^{n}k\,2^{k-1}$ を求める`,
          answer: String.raw`$(n-1)2^{n}+1$`,
          approach: String.raw`（等差）×（等比）の和なので、$2$ 倍してずらして引く。`,
          blocks: [
            { k: "p", t: String.raw`$S=\displaystyle\sum_{k=1}^{n}k\,2^{k-1}$ とおく。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=1\cdot2^{0}+2\cdot2^{1}+3\cdot2^{2}+\cdots+n\cdot2^{n-1}\\[1mm]
2S&=\phantom{1\cdot2^{0}+{}}1\cdot2^{1}+2\cdot2^{2}+\cdots+(n-1)2^{n-1}+n\cdot2^{n}
\end{aligned}`,
            },
            { k: "p", t: String.raw`辺々引くと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
-S&=2^{0}+2^{1}+\cdots+2^{n-1}-n\cdot2^{n}\\[1mm]
&=\left(2^{n}-1\right)-n\cdot2^{n}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`S=n\cdot2^{n}-2^{n}+1=(n-1)2^{n}+1`,
            },
            {
              k: "p",
              t: String.raw`である（$n=1$ で $1$、$n=2$ で $5$、$n=3$ で $17$）。`,
            },
          ],
          pitfalls: [
            String.raw`$2S$ を書くときは1つ右にずらす。足し引きする項の対応を取り違えない。`,
            String.raw`残る等比の和は $2^{0}+\cdots+2^{n-1}=2^{n}-1$ である。項数は $n$。`,
          ],
          check: String.raw`$n=1,2,3,5,8$ で直接足すと $1,5,17,129,1793$ で、$(n-1)2^{n}+1$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_1=2$、$a_{n+1}=1+\dfrac12\displaystyle\sum_{k=1}^{n}(n+1-k)a_k$ で定まる数列 $\{a_n\}$ の一般項を求める`,
          answer: String.raw`$a_1=2$、$n\ge2$ のとき $a_n=2^{n-1}$`,
          approach: String.raw`小さい $n$ で値を出すと $2,2,4,8,16,\dots$ と見えるので、$a_1=2$、$n\ge2$ で $a_n=2^{n-1}$ を予想し、(1) を使って数学的帰納法で確かめる。`,
          blocks: [
            { k: "p", t: String.raw`**小さい $n$ で試す。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_2&=1+\frac12\cdot1\cdot a_1=1+1=2\\[1mm]
a_3&=1+\frac12\left(2a_1+1\cdot a_2\right)=1+\frac12(4+2)=4\\[1mm]
a_4&=1+\frac12\left(3a_1+2a_2+1\cdot a_3\right)=1+\frac12(6+4+4)=8
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`なので、$a_1=2$、$n\ge2$ で $a_n=2^{n-1}$ と予想できる。`,
            },
            {
              k: "p",
              t: String.raw`**帰納法。** $a_1=2$、$a_2=2,\dots,a_n=2^{n-1}$（$2\le k\le n$）が成り立つとして、$a_{n+1}=2^{n}$ を示す。和を計算する。`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{n}(n+1-k)a_k=n\cdot a_1+\sum_{k=2}^{n}(n+1-k)2^{k-1}`,
            },
            { k: "p", t: String.raw`で、$i=k-1$（$1\le i\le n-1$）とおくと $n+1-k=n-i$ だから` },
            {
              k: "math",
              t: String.raw`\sum_{k=2}^{n}(n+1-k)2^{k-1}=\sum_{i=1}^{n-1}(n-i)2^{i}
=n\sum_{i=1}^{n-1}2^{i}-\sum_{i=1}^{n-1}i\,2^{i}`,
            },
            { k: "p", t: String.raw`である。$\displaystyle\sum_{i=1}^{n-1}2^{i}=2^{n}-2$、また (1) より` },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{n-1}i\,2^{i}=2\sum_{i=1}^{n-1}i\,2^{i-1}=2\left\{(n-2)2^{n-1}+1\right\}=(n-2)2^{n}+2`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\sum_{k=1}^{n}(n+1-k)a_k&=2n+n\left(2^{n}-2\right)-\left\{(n-2)2^{n}+2\right\}\\[1mm]
&=2n+n2^{n}-2n-n2^{n}+2\cdot2^{n}-2=2^{n+1}-2
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`a_{n+1}=1+\frac{2^{n+1}-2}2=1+2^{n}-1=2^{n}`,
            },
            {
              k: "p",
              t: String.raw`となり、予想どおりである。$n=1$ のときも $a_2=2^{1}=2$ で合う。よって`,
            },
            {
              k: "math",
              t: String.raw`a_1=2,\qquad a_n=2^{\,n-1}\quad(n\ge2)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a_1$ だけが式からはみ出す。$2^{1-1}=1$ ではなく $a_1=2$ である。$n=2$ 以降は $2,4,8,\dots$ ときれいに倍々になる。`,
            },
          ],
          pitfalls: [
            String.raw`$a_1=2$ は $2^{n-1}$ の式に乗らない。答えを「$a_n=2^{n-1}$」とだけ書くと $n=1$ で誤りになる。`,
            String.raw`和の中で $k=1$ の項（$a_1=2$）だけ別に扱う。残りが (1) の形になる。`,
            String.raw`$\sum_{i=1}^{n-1}i\,2^{i}$ は (1) の式に $n-1$ を入れて $2$ 倍する。$n$ をそのまま入れない。`,
            String.raw`$n2^{n}$ の項がきれいに消える。残るのが $2^{n+1}-2$ で、$2$ で割ると $2^{n}-1$ になるのが仕掛けである。`,
          ],
          check: String.raw`漸化式から $a_1$ から $a_{12}$ まで分数のまま計算すると $2,2,4,8,16,32,64,128,256,512,1024,2048$ となり、$a_1=2$、$n\ge2$ で $a_n=2^{n-1}$ と一致した。`,
        },
      ],
    },
  ],
};
