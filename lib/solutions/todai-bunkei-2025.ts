import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2025年度（令和7年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問の図。最小を与える $a=\frac{1}{\sqrt2}$ と、そのときの Q, R。 */
const A1 = 1 / Math.SQRT2;
const XQ = -A1 - 1 / (2 * A1);
const XR = -XQ - 1 / (2 * XQ);

/** 第2問の図。$\theta=\frac{2\pi}{3}$ のときの頂点と半径。 */
const H2 = Math.cos(Math.PI / 3);
const M2 = Math.sin(Math.PI / 3);
const R2 = 1 / (2 * M2);

export const todaiBunkei2025: SolutionSet = {
  slug: "todai-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式",
      topics: ["接線と法線", "放物線と直線の交点", "相加相乗平均", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $40$ 万等分して $\\mathrm{Q}$、$\\mathrm{R}$ の $x$ 座標を法線から順に計算し、$\\mathrm{R}$ の $x$ 座標の最小が $1.767766953$ を $a=0.70711$ でとること、$\\frac{5\\sqrt2}{4}=1.767766953$、$\\frac{1}{\\sqrt2}=0.707107$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{Q}$ の $x$ 座標を求める`,
          answer: String.raw`$-a-\dfrac{1}{2a}$`,
          approach: String.raw`放物線と直線の交点は、連立して2次方程式を解けばよい。ただし $x=a$ が解であることは分かっているので、因数 $x-a$ でくくれる。くくった残りがそのまま答えになる。`,
          blocks: [
            { k: "p", t: String.raw`$y=x^{2}$ より $y'=2x$ なので、$\mathrm{P}\left(a,a^{2}\right)$ における接線の傾きは $2a$ である。$a>0$ だから、これと直交する直線 $\ell$ の傾きは $-\dfrac{1}{2a}$ で` },
            { k: "math", t: String.raw`\ell:\ y-a^{2}=-\frac{1}{2a}(x-a)` },
            { k: "p", t: String.raw`である。$y=x^{2}$ と連立すると` },
            {
              k: "math",
              t: String.raw`x^{2}-a^{2}=-\frac{1}{2a}(x-a)\iff (x-a)\left(x+a+\frac{1}{2a}\right)=0`,
            },
            {
              k: "p",
              t: String.raw`となる。$x=a$ は $\mathrm{P}$ だから、$\mathrm{Q}$ の $x$ 座標は $-a-\dfrac{1}{2a}$ である。`,
            },
          ],
          check: String.raw`$a=1$ なら $\mathrm{Q}$ の $x$ 座標は $-\dfrac32$。$\mathrm{P}(1,1)$ での法線は $y-1=-\dfrac12(x-1)$ で、$x=-\dfrac32$ を入れると $y=1-\dfrac12\left(-\dfrac52\right)=\dfrac94=\left(-\dfrac32\right)^{2}$ となり、確かに放物線上にある。`,
        },
        {
          label: "(2)",
          task: String.raw`$a$ が正の実数全体を動くとき、$\mathrm{R}$ の $x$ 座標の最小値を求める`,
          answer: String.raw`$\dfrac{5\sqrt2}{4}$（$a=\dfrac{1}{\sqrt2}$ のとき）`,
          approach: String.raw`(1) で作った「点の $x$ 座標 $\to$ 法線のもう一方の交点の $x$ 座標」という対応は、$a$ の符号によらず $b\mapsto-b-\dfrac{1}{2b}$ の形で同じように使える。だから $\mathrm{R}$ の $x$ 座標はこの対応を2回繰り返したものになる。$u=a+\dfrac{1}{2a}$ とまとめると、相加相乗平均で $u$ の範囲が決まり、あとは $u$ の増加関数になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{Q}$ の $x$ 座標を $b$ とすると、(1) と同じ計算（$a$ を $b$ に置きかえるだけで、$b\ne0$ なら途中の式はそのまま通る）で、$\mathrm{R}$ の $x$ 座標は $-b-\dfrac{1}{2b}$ である。`,
            },
            { k: "p", t: String.raw`$u=a+\dfrac{1}{2a}$ とおくと $b=-u$ で、$u>0$ だから` },
            {
              k: "math",
              t: String.raw`\left(\mathrm{R}\ \text{の}\ x\ \text{座標}\right)=-(-u)-\frac{1}{2(-u)}=u+\frac{1}{2u}`,
            },
            { k: "p", t: String.raw`となる。$a>0$ での相加相乗平均より` },
            {
              k: "math",
              t: String.raw`u=a+\frac{1}{2a}\ge2\sqrt{a\cdot\frac{1}{2a}}=\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`で、等号は $a=\dfrac{1}{2a}$、すなわち $a=\dfrac{1}{\sqrt2}$ のときに成り立つ。また $a$ が正の実数全体を動くとき $u$ は $\sqrt2$ 以上のすべての値をとる。`,
            },
            {
              k: "p",
              t: String.raw`次に $v\mapsto v+\dfrac{1}{2v}$ の増減を見る。$\left(v+\dfrac{1}{2v}\right)'=1-\dfrac{1}{2v^{2}}$ で、$v\ge\sqrt2$ では $2v^{2}\ge4>1$ だから正である。よってこの関数は $v\ge\sqrt2$ で増加し、$u=\sqrt2$ のときに最小になる。`,
            },
            {
              k: "math",
              t: String.raw`\sqrt2+\frac{1}{2\sqrt2}=\sqrt2+\frac{\sqrt2}{4}=\frac{5\sqrt2}{4}`,
            },
            { k: "p", t: String.raw`したがって $\mathrm{R}$ の $x$ 座標の最小値は $\dfrac{5\sqrt2}{4}$ である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`最小になるとき（$a=\frac{1}{\sqrt2}$）の様子。$\mathrm{P}$ での法線が $\mathrm{Q}$ を、$\mathrm{Q}$ での法線が $\mathrm{R}$ を決める。$\mathrm{R}$ の $x$ 座標は $\frac{5\sqrt2}{4}=1.7678$。`,
                view: [-2.3, 2.6, -0.4, 3.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: (x: number) => x * x, from: -1.9, to: 1.92 },
                  { k: "seg", a: [A1, A1 * A1], b: [XQ, XQ * XQ] },
                  { k: "seg", a: [XQ, XQ * XQ], b: [XR, XR * XR] },
                  { k: "dot", at: [A1, A1 * A1], label: "P", place: "below-right" },
                  { k: "dot", at: [XQ, XQ * XQ], label: "Q", place: "above-left" },
                  { k: "dot", at: [XR, XR * XR], label: "R", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`(1) の公式を使い回すとき、$\mathrm{Q}$ の $x$ 座標は負である。$a>0$ を仮定して導いた式でも、途中で $a>0$ を使っているのは「接線の傾きが $0$ でない」ところだけなので、$b\ne0$ ならそのまま成り立つ。`,
            String.raw`$u+\dfrac{1}{2u}$ に相加相乗平均をもう一度使うと最小が $u=\dfrac{1}{\sqrt2}$ のときになるが、$u\ge\sqrt2$ なのでその値はとれない。範囲の端で最小になることを、増加であることから言う。`,
          ],
          check: String.raw`$a=\dfrac{1}{\sqrt2}=0.7071$ のとき $u=0.7071+0.7071=\sqrt2$、$\mathrm{Q}$ の $x$ 座標は $-\sqrt2$、$\mathrm{R}$ の $x$ 座標は $\sqrt2+\dfrac{1}{2\sqrt2}=1.7678$。$a=0.9$ では $u=1.4556$、$\mathrm{R}$ の $x$ 座標は $1.7991$ でわずかに大きい。$a$ を $40$ 万等分した全探索でも最小は $1.767766953$（$a=0.70711$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と計量",
      topics: ["円による被覆", "垂直二等分線", "外接円の半径", "場合分け"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "3辺を $20000$ 等分して各点から3頂点までの距離の最小を調べ、その最大が $s$ の式と小数4桁まで一致することを $\\theta=\\frac\\pi6,\\frac\\pi3,0.9,\\frac\\pi2,2.0,\\frac{2\\pi}3,2.8,3.0$ で確かめた",
          "三角形の内部を $700\\times700$ の格子で走査して同じ量の最大を求め、$t$ の式と小数3桁まで一致することを同じ $\\theta$ で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(3)",
          task: String.raw`$\angle\mathrm{BAC}=\theta$（$0<\theta<\pi$）のとき、$s$ と $t$ を $\theta$ で表す（(1)(2) はその特別な場合）`,
          answer: String.raw`$s=\begin{cases}\dfrac12&\left(0<\theta\le\dfrac\pi3\right)\\[2mm]\sin\dfrac\theta2&\left(\dfrac\pi3\le\theta\le\dfrac\pi2\right)\\[2mm]\dfrac{1}{2\sin\frac\theta2}&\left(\dfrac\pi2\le\theta<\pi\right)\end{cases}$、$t=\begin{cases}\dfrac{1}{2\cos\frac\theta2}&\left(0<\theta\le\dfrac\pi2\right)\\[2mm]\dfrac{1}{2\sin\frac\theta2}&\left(\dfrac\pi2\le\theta<\pi\right)\end{cases}$。とくに (1) $\theta=\dfrac\pi3$ では $s=\dfrac12$、$t=\dfrac{\sqrt3}{3}$、(2) $\theta=\dfrac{2\pi}{3}$ では $s=t=\dfrac{\sqrt3}{3}$`,
          approach: String.raw`「$D_r$ に含まれる」は「どの点も3頂点のどれかから距離 $r$ 以内」ということなので、$\displaystyle\max_{\mathrm{X}}\min\left(\mathrm{XA},\mathrm{XB},\mathrm{XC}\right)$ を求めればよい。$s$ は $\mathrm{X}$ を3辺の上で、$t$ は三角形全体で動かしたときの値である。$t$ のほうは、垂直二等分線で分けて「どの頂点がいちばん近いか」ごとに考えると、各部分は凸多角形になり、頂点だけ調べれば最大が分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ を原点、$\angle\mathrm{BAC}$ の二等分線を $x$ 軸にとり、$h=\cos\dfrac\theta2$、$m=\sin\dfrac\theta2$ とおいて`,
            },
            { k: "math", t: String.raw`\mathrm{A}(0,0),\qquad \mathrm{B}(h,-m),\qquad \mathrm{C}(h,m)` },
            {
              k: "p",
              t: String.raw`とする。$\mathrm{AB}=\mathrm{AC}=1$ ✓、$\mathrm{BC}=2m$ で、$\mathrm{A}$ から $\mathrm{BC}$ までの距離は $h$ である。$\mathrm{BC}$ の中点を $\mathrm{N}(h,0)$ とする。`,
            },
            {
              k: "p",
              t: String.raw`「図形が $D_r$ に含まれる」とは、その図形のどの点 $\mathrm{X}$ についても $\min\left(\mathrm{XA},\mathrm{XB},\mathrm{XC}\right)\le r$ ということである。したがって $s$ は3辺の上での、$t$ は三角形全体での、この最小値の**最大**である。`,
            },
            { k: "p", t: String.raw`**$s$ を求める。** 辺 $\mathrm{AB}$ の中点を $\mathrm{M}$ とすると $\mathrm{AM}=\mathrm{BM}=\dfrac12$ で、中線の長さの公式から` },
            {
              k: "math",
              t: String.raw`\mathrm{CM}^{2}=\frac{2\mathrm{CA}^{2}+2\mathrm{CB}^{2}-\mathrm{AB}^{2}}{4}=\frac{1+8m^{2}}{4}\ge\frac14`,
            },
            {
              k: "p",
              t: String.raw`なので $\mathrm{CM}\ge\dfrac12$ である。よって $\mathrm{M}$ については3つの距離がすべて $\dfrac12$ 以上で、$s\ge\dfrac12$ が必要である。逆に $r\ge\dfrac12$ なら、辺 $\mathrm{AB}$、$\mathrm{AC}$ は長さ $1$ なので両端の円だけで覆える。`,
            },
            {
              k: "p",
              t: String.raw`残るのは辺 $\mathrm{BC}$（長さ $2m$）である。$\mathrm{B},\mathrm{C}$ の円だけで覆えるのは $r\ge m$ のとき。そうでないときは真ん中が $\mathrm{A}$ の円で覆われなければならない。$\mathrm{A}$ の円は直線 $\mathrm{BC}$ を、$\mathrm{N}$ を中心とする長さ $2\sqrt{r^{2}-h^{2}}$ の部分で切るので、条件は`,
            },
            {
              k: "math",
              t: String.raw`m-r\le\sqrt{r^{2}-h^{2}}\iff m^{2}-2mr+r^{2}\le r^{2}-h^{2}\iff r\ge\frac{m^{2}+h^{2}}{2m}=\frac{1}{2m}`,
            },
            { k: "p", t: String.raw`となる。つまり辺 $\mathrm{BC}$ が覆われる条件は $r\ge\min\left(m,\ \dfrac{1}{2m}\right)$ である。合わせて` },
            {
              k: "math",
              t: String.raw`s=\max\left\{\frac12,\ \min\left(m,\ \frac{1}{2m}\right)\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$m\le\dfrac{1}{2m}$ は $m\le\dfrac{1}{\sqrt2}$、すなわち $\theta\le\dfrac\pi2$ と同値、$m\ge\dfrac12$ は $\theta\ge\dfrac\pi3$ と同値なので、$s$ は答えの3段の式になる（$\dfrac{1}{2m}\ge\dfrac12$ はつねに成り立つ）。`,
            },
            {
              k: "p",
              t: String.raw`**$t$ を求める。** $x$ 軸について対称なので、$y\ge0$ の側だけ考えればよい。$y\ge0$ では`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{XB}^{2}-\mathrm{XC}^{2}=(y+m)^{2}-(y-m)^{2}=4my\ge0`,
            },
            {
              k: "p",
              t: String.raw`なので $\mathrm{XB}\ge\mathrm{XC}$ となり、$\mathrm{B}$ が最も近い頂点になることはない。つまり $\min\left(\mathrm{XA},\mathrm{XB},\mathrm{XC}\right)=\min\left(\mathrm{XA},\mathrm{XC}\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`そこで、三角形の上半分（$\mathrm{A}$、$\mathrm{N}$、$\mathrm{C}$ を頂点とする直角三角形）を、$\mathrm{AC}$ の垂直二等分線 $hx+my=\dfrac12$ で2つに分ける。定点からの距離は凸関数なので、凸多角形の上での最大は頂点で起きる。各部分の頂点を調べればよい。`,
            },
            {
              k: "p",
              t: String.raw`この垂直二等分線は、辺 $\mathrm{AN}$（$y=0$）とは $x=\dfrac{1}{2h}$ で、辺 $\mathrm{NC}$（$x=h$）とは $y=\dfrac{\frac12-h^{2}}{m}$ で交わる。$\dfrac{1}{2h}\le h$ は $2h^{2}\ge1$、すなわち $\theta\le\dfrac\pi2$ と同値である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\theta\le\dfrac\pi2$ のとき：二等分線は $\mathrm{AN}$ 上の点 $\mathrm{O}\left(\dfrac{1}{2h},0\right)$ と $\mathrm{AC}$ の中点を結ぶ。$\mathrm{A}$ 側の部分の頂点は $\mathrm{A}$、$\mathrm{O}$、$\mathrm{AC}$ の中点で、$\mathrm{A}$ からの距離はそれぞれ $0$、$\dfrac{1}{2h}$、$\dfrac12$。$\mathrm{C}$ 側の部分の頂点は $\mathrm{O}$、$\mathrm{N}$、$\mathrm{C}$、$\mathrm{AC}$ の中点で、$\mathrm{C}$ からの距離は $\dfrac{1}{2h}$（$\mathrm{O}$ は二等分線上なので $\mathrm{OA}=\mathrm{OC}$）、$m$、$0$、$\dfrac12$。$\dfrac{1}{2h}\ge m$ は $\sin\theta\le1$ と同じでつねに成り立つので、最大は $\dfrac{1}{2h}=\dfrac{1}{2\cos\frac\theta2}$。これは外接円の半径である。`,
                String.raw`$\theta\ge\dfrac\pi2$ のとき：二等分線は $\mathrm{NC}$ 上の点 $\mathrm{T}\left(h,\dfrac{\frac12-h^{2}}{m}\right)$ と $\mathrm{AC}$ の中点を結ぶ。$\mathrm{T}$ は二等分線上なので $\mathrm{TA}=\mathrm{TC}$ で、$\mathrm{TC}=m-\dfrac{\frac12-h^{2}}{m}=\dfrac{m^{2}+h^{2}-\frac12}{m}=\dfrac{1}{2m}$ である。$\mathrm{A}$ 側の部分の頂点は $\mathrm{A}$、$\mathrm{N}$、$\mathrm{T}$、$\mathrm{AC}$ の中点で、$\mathrm{A}$ からの距離は $0$、$h$、$\dfrac{1}{2m}$、$\dfrac12$。$\mathrm{C}$ 側の頂点は $\mathrm{T}$、$\mathrm{C}$、$\mathrm{AC}$ の中点で、$\mathrm{C}$ からの距離は $\dfrac{1}{2m}$、$0$、$\dfrac12$。$h\le\dfrac{1}{2m}$ は $\sin\theta\le1$ と同じなので、最大は $\dfrac{1}{2m}=\dfrac{1}{2\sin\frac\theta2}$。`,
              ],
            },
            { k: "p", t: String.raw`以上から $t$ は答えの2段の式になる。` },
            {
              k: "p",
              t: String.raw`**(1)(2) の値。** $\theta=\dfrac\pi3$ のとき $m=\dfrac12$ なので $s=\dfrac12$、$h=\dfrac{\sqrt3}{2}$ より $t=\dfrac{1}{\sqrt3}=\dfrac{\sqrt3}{3}$（正三角形の外接円の半径）。$\theta=\dfrac{2\pi}{3}$ のとき $m=\dfrac{\sqrt3}{2}$ なので $s=t=\dfrac{1}{\sqrt3}=\dfrac{\sqrt3}{3}$ である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$\theta=\frac{2\pi}{3}$ のとき（(2)）。半径 $\frac{\sqrt3}{3}$ の3つの円で、三角形がちょうど覆われる。$\bullet$ は最後まで覆われずに残る点で、$\mathrm{A}$ からも $\mathrm{C}$ からも距離が $\frac{\sqrt3}{3}$ になる。`,
                view: [-0.75, 1.35, -1.05, 1.05],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [H2, -M2], [H2, M2]] },
                  { k: "seg", a: [0, 0], b: [H2, -M2] },
                  { k: "seg", a: [H2, -M2], b: [H2, M2] },
                  { k: "seg", a: [H2, M2], b: [0, 0] },
                  ...[[0, 0], [H2, -M2], [H2, M2]].map((p) => ({
                    k: "param" as const,
                    f: (u: number) => [p[0] + R2 * Math.cos(u), p[1] + R2 * Math.sin(u)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  })),
                  { k: "dot", at: [0, 0], label: "A", place: "left" },
                  { k: "dot", at: [H2, -M2], label: "B", place: "below-right" },
                  { k: "dot", at: [H2, M2], label: "C", place: "above-right" },
                  { k: "dot", at: [H2, 0.5 / M2 - M2 + (M2 - 0.5 / M2)] },
                  { k: "dot", at: [H2, M2 - 1 / (2 * M2)] },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$s$ と $t$ は $\theta\ge\dfrac\pi2$ では一致する。最後まで覆われずに残る点が辺 $\mathrm{BC}$ の上にあるためで、「三角形のほうが辺より広いから $t$ が大きいはず」とは限らない。`,
            String.raw`$t$ を「外接円の半径」と答えてしまうのは $\theta\le\dfrac\pi2$（鋭角三角形）のときだけである。鈍角になると外心が三角形の外に出て、最も覆いにくい点は辺 $\mathrm{BC}$ の上に移る。`,
            String.raw`$s$ の場合分けは $\theta=\dfrac\pi3$ と $\theta=\dfrac\pi2$ の2か所で起きる。前者は「辺 $\mathrm{AB}$ と辺 $\mathrm{BC}$ のどちらが厳しいか」、後者は「辺 $\mathrm{BC}$ を両端の円で覆うか $\mathrm{A}$ の円も使うか」の切り替わりである。`,
          ],
          check: String.raw`3辺を $20000$ 等分して「3頂点までの距離の最小」の最大を数値で求めると、$\theta=\dfrac\pi3$ で $0.50000$、$\theta=\dfrac{2\pi}3$ で $0.57734$ となり、式の $0.5$、$\dfrac{\sqrt3}{3}=0.57735$ と合う。三角形の内部も $700\times700$ の格子で調べると、$\theta=\dfrac\pi3$ で $0.57653$、$\theta=\dfrac{2\pi}{3}$ で $0.57653$ となり、どちらも $\dfrac{\sqrt3}{3}$ に（格子の刻みぶんの誤差で）一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["確率漸化式", "状態の分類", "等比数列", "対称性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "右から2個の色を状態として分数のまま $n=7$ まで推移させ、「右から2番目が白」が $\\frac12+\\frac1{2^{n}}$、「右から1番目と2番目がともに白」が $\\frac13+\\frac{1}{2^{n+1}}+\\frac{(-1)^{n}}{3\\cdot2^{n+1}}$ と分数として完全に一致することを確かめた",
          "手順をそのまま実装した $40$ 万回のシミュレーションでも、$n=3$ で $0.62495,\\,0.37467$、$n=6$ で $0.51480,\\,0.34402$ となり、式の値 $0.625,\\,0.375$、$0.515625,\\,0.34375$ と合うことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n=3$ のとき、右から2番目の玉が白玉である確率を求める`,
          answer: String.raw`$\dfrac58$`,
          approach: String.raw`手順が見るのは右端の2個だけなので、「右から2番目と1番目の色の組」を状態として追えばよい。4通りの状態の間の推移を書き出せば、あとは順に計算するだけである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`手順 $(*)$ で参照されるのは、新しくおく玉の1つ左と2つ左の色だけである。そこで「右から2番目の色、右から1番目の色」の組を状態とする。状態を $(x,y)$、新しい玉の色を $z$ と書く。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$z=y$ のとき：とりかえは起きない。新しい状態は $(y,z)=(y,y)$。`,
                String.raw`$z\ne y$ かつ $z\ne x$ のとき（このとき $x=y$）：とりかえは起きない。新しい状態は $(y,z)$ で、2色が異なる。`,
                String.raw`$z\ne y$ かつ $z=x$ のとき（このとき $x\ne y$）：1つ左の玉が $z$ にとりかえられるので、右端3個が $x,z,z$ となり、新しい状態は $(z,z)$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`色を白 $\mathrm{W}$、黒 $\mathrm{B}$ と書くと、推移は次のようになる（どの枝も確率 $\dfrac12$）。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$(\mathrm{W},\mathrm{W})\to(\mathrm{W},\mathrm{W})$ または $(\mathrm{W},\mathrm{B})$`,
                String.raw`$(\mathrm{B},\mathrm{B})\to(\mathrm{B},\mathrm{B})$ または $(\mathrm{B},\mathrm{W})$`,
                String.raw`$(\mathrm{W},\mathrm{B})\to(\mathrm{B},\mathrm{B})$（$z=\mathrm{B}$）または $(\mathrm{W},\mathrm{W})$（$z=\mathrm{W}$、とりかえ）`,
                String.raw`$(\mathrm{B},\mathrm{W})\to(\mathrm{W},\mathrm{W})$（$z=\mathrm{W}$）または $(\mathrm{B},\mathrm{B})$（$z=\mathrm{B}$、とりかえ）`,
              ],
            },
            {
              k: "p",
              t: String.raw`$n$ 回後の各状態の確率を $p_n,q_n,r_n,u_n$（順に $\mathrm{WW},\mathrm{WB},\mathrm{BW},\mathrm{BB}$）とすると`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac12\left(p_n+q_n+r_n\right),\quad q_{n+1}=\frac12p_n,\quad r_{n+1}=\frac12u_n,\quad u_{n+1}=\frac12\left(u_n+q_n+r_n\right)`,
            },
            { k: "p", t: String.raw`である。初めは $\left(p_0,q_0,r_0,u_0\right)=(1,0,0,0)$ だから、順に` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
n=1:&\ \left(\tfrac12,\tfrac12,0,0\right)\\
n=2:&\ \left(\tfrac12,\tfrac14,0,\tfrac14\right)\\
n=3:&\ \left(\tfrac38,\tfrac14,\tfrac18,\tfrac14\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。右から2番目が白であるのは $\mathrm{WW}$ か $\mathrm{WB}$ のときだから、求める確率は $\dfrac38+\dfrac14=\dfrac58$ である。`,
            },
          ],
          check: String.raw`手順をそのまま実装して $40$ 万回試すと、$n=3$ で右から2番目が白になる割合は $0.62495$ となり、$\dfrac58=0.625$ と合う。`,
        },
        {
          label: "(2)",
          task: String.raw`$n$ を正の整数とするとき、右から2番目の玉が白玉である確率を求める`,
          answer: String.raw`$\dfrac12+\dfrac{1}{2^{n}}$`,
          approach: String.raw`4つの状態を別々に追うより、「右から2番目の色がどう変わるか」だけを見るほうが速い。手順を見ると、右から2番目の色は「変わらない」か「元の右端の色になる」かのどちらかで、しかも変わるのは限られた場合だけである。あわせて $p_n-u_n$ が等比数列になることを使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の3つの場合を、「新しい右から2番目の色 $x'$」の目線でまとめ直す。とりかえが起きないときは $x'=y$（元の右端）、とりかえが起きるときは左の玉が $z=x$ に変わるので $x'=x$ である。つまり`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x=y$ のとき：とりかえは起きず $x'=y=x$。色は変わらない。`,
                String.raw`$x\ne y$ のとき：$z=x$（確率 $\dfrac12$）ならとりかえが起きて $x'=x$、$z=y$（確率 $\dfrac12$）なら $x'=y$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`つまり右から2番目の色が変わるのは「$x\ne y$ かつ $z=y$」のときだけで、そのとき白と黒が入れかわる。$A_n$ を「右から2番目が白」の確率とすると`,
            },
            { k: "math", t: String.raw`A_{n+1}=A_n-\frac12q_n+\frac12r_n` },
            {
              k: "p",
              t: String.raw`である（$\mathrm{WB}$ から白が減り、$\mathrm{BW}$ から白が増える）。そこで $q_n-r_n$ を求める。漸化式から`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}-u_{n+1}=\frac12\left(p_n-u_n\right),\qquad q_{n+1}-r_{n+1}=\frac12\left(p_n-u_n\right)`,
            },
            { k: "p", t: String.raw`であり、$p_0-u_0=1$ だから $p_n-u_n=\dfrac{1}{2^{n}}$、したがって` },
            { k: "math", t: String.raw`q_n-r_n=\frac{1}{2^{n}}\qquad(n\ge1)` },
            { k: "p", t: String.raw`となる。よって $n\ge1$ で` },
            { k: "math", t: String.raw`A_{n+1}=A_n-\frac{1}{2^{n+1}}` },
            { k: "p", t: String.raw`である。$A_1=p_1+q_1=\dfrac12+\dfrac12=1$ なので、$n\ge1$ では` },
            {
              k: "math",
              t: String.raw`A_n=1-\sum_{k=2}^{n}\frac{1}{2^{k}}=1-\left(\frac12-\frac{1}{2^{n}}\right)=\frac12+\frac{1}{2^{n}}`,
            },
            { k: "p", t: String.raw`となる（$n=1$ でも $\dfrac12+\dfrac12=1$ で合う）。` },
          ],
          pitfalls: [
            String.raw`「右から1番目が白」の確率は $n\ge1$ でつねに $\dfrac12$ である。新しくおいた玉はとりかえの対象にならないので、右端の色はコインの表裏そのものだからである。問われているのは2番目なので、こちらとは別に扱う。`,
          ],
          check: String.raw`$n=3$ なら $\dfrac12+\dfrac18=\dfrac58$ で (1) と一致する。状態の確率を分数のまま $n=7$ まで追っても、$1,\ \dfrac34,\ \dfrac58,\ \dfrac9{16},\ \dfrac{17}{32},\ \dfrac{33}{64},\ \dfrac{65}{128}$ となり、すべて $\dfrac12+\dfrac1{2^{n}}$ に一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ を正の整数とするとき、右から1番目と2番目の玉がともに白玉である確率を求める`,
          answer: String.raw`$\dfrac13+\dfrac{1}{2^{n+1}}+\dfrac{(-1)^{n}}{3\cdot2^{n+1}}$、すなわち $n$ が偶数なら $\dfrac13\left(1+\dfrac{2}{2^{n}}\right)$、奇数なら $\dfrac13\left(1+\dfrac{1}{2^{n}}\right)$`,
          approach: String.raw`求めるのは $p_n$ である。$p_n+u_n$（2個が同色）と $p_n-u_n$ の2つが分かれば $p_n$ が出る。後者は (2) で求めた。前者は「同色か異色か」だけを見る2状態の漸化式になり、(1) の推移表から「異色からは必ず同色へ移る」ことが読み取れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の推移表を「2個が同色か異色か」だけで見ると、`,
            },
            {
              k: "steps",
              items: [
                String.raw`同色からは、確率 $\dfrac12$ で同色、$\dfrac12$ で異色へ。`,
                String.raw`異色からは、$z=y$ でも $z=x$（とりかえ）でも新しい2個は同色になる。つまり確率 $1$ で同色へ。`,
              ],
            },
            {
              k: "p",
              t: String.raw`となる。異色である確率を $d_n=q_n+r_n$ とすると $d_0=0$ で`,
            },
            { k: "math", t: String.raw`d_{n+1}=\frac12\left(1-d_n\right)` },
            { k: "p", t: String.raw`である。$d_{n+1}-\dfrac13=-\dfrac12\left(d_n-\dfrac13\right)$ と変形できて $d_0-\dfrac13=-\dfrac13$ だから` },
            {
              k: "math",
              t: String.raw`d_n=\frac13-\frac13\left(-\frac12\right)^{n}=\frac13\left\{1-\left(-\frac12\right)^{n}\right\}`,
            },
            { k: "p", t: String.raw`となる。したがって同色である確率は` },
            {
              k: "math",
              t: String.raw`p_n+u_n=1-d_n=\frac23+\frac13\left(-\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`である。(2) で $p_n-u_n=\dfrac{1}{2^{n}}$ を得ているので、辺々足して2で割ると` },
            {
              k: "math",
              t: String.raw`p_n=\frac12\left\{\frac23+\frac13\left(-\frac12\right)^{n}+\frac{1}{2^{n}}\right\}=\frac13+\frac{(-1)^{n}}{3\cdot2^{n+1}}+\frac{1}{2^{n+1}}`,
            },
            { k: "p", t: String.raw`となる。$(-1)^{n}$ をほどくと` },
            {
              k: "math",
              t: String.raw`p_n=\begin{cases}\dfrac13\left(1+\dfrac{2}{2^{n}}\right)&(n\ \text{が偶数})\\[3mm]\dfrac13\left(1+\dfrac{1}{2^{n}}\right)&(n\ \text{が奇数})\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「異色からは必ず同色へ移る」が効いている。とりかえが起きる場合も起きない場合も結果が同色になるので、確率 $1$ である。`,
            String.raw`$n\to\infty$ では $p_n\to\dfrac13$ で、$\dfrac14$ ではない。右端2個が同色になりやすい仕掛けがあるので、4状態が等確率にはならない。`,
          ],
          check: String.raw`$n=1$：$\dfrac13\left(1+\dfrac12\right)=\dfrac12$。$n=2$：$\dfrac13\left(1+\dfrac12\right)=\dfrac12$。$n=3$：$\dfrac13\left(1+\dfrac18\right)=\dfrac38$ で、(1) の計算と一致する。分数のまま $n=7$ まで追っても $\dfrac12,\dfrac12,\dfrac38,\dfrac38,\dfrac{11}{32},\dfrac{11}{32},\dfrac{43}{128}$ となり、式と完全に一致した。$40$ 万回のシミュレーションでも $n=6$ で $0.34402$（式は $0.34375$）だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["絶対値を含む不等式", "放物線で囲まれた面積", "3次関数の最大", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$S(a)$ を $x$ の数値積分で作り、$a$ を $-2$ から $2$ まで $4$ 万等分して全探索すると最大 $3.166667$ を $a=-0.25$ でとること、$\\frac{19}{6}=3.166667$ と一致することを確かめた",
          "$S(0)=3$、$S(-1)=\\frac73=2.3333$、$S(-2)=\\frac13$ が式と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$-2\le a<2$ で $S(a)$ の最大値を求める`,
          answer: String.raw`$\dfrac{19}{6}$（$a=-\dfrac14$ のとき）`,
          approach: String.raw`上の境界 $-\frac12x^{2}+2$ と下の境界 $\left|x^{2}+a\right|$ の差を積分する。絶対値は $x^{2}+a$ の符号で割れるので、$a\ge0$ か $a<0$ かで形が変わる。$a<0$ のときは $\alpha=\sqrt{-a}$ を変数にとると、面積が $\alpha$ の3次式になって扱いやすい。`,
          blocks: [
            { k: "p", t: String.raw`$-1\le x\le1$ とする。上の境界を $f(x)=-\dfrac12x^{2}+2$、下の境界を $g(x)=\left|x^{2}+a\right|$ と書く。` },
            { k: "p", t: String.raw`**$a\ge0$ のとき。** $x^{2}+a\ge0$ なので $g(x)=x^{2}+a$ で` },
            { k: "math", t: String.raw`f(x)-g(x)=2-a-\frac32x^{2}` },
            {
              k: "p",
              t: String.raw`である。これが $-1\le x\le1$ 全体で $0$ 以上になるのは $2-a-\dfrac32\ge0$、すなわち $a\le\dfrac12$ のときで、そのとき`,
            },
            {
              k: "math",
              t: String.raw`S(a)=\int_{-1}^{1}\left(2-a-\frac32x^{2}\right)dx=2(2-a)-1=3-2a`,
            },
            {
              k: "p",
              t: String.raw`となり、$a$ について減少する。$a>\dfrac12$ では区間が狭まるのでさらに小さくなる（$X=\sqrt{\dfrac{2(2-a)}{3}}<1$ として $S(a)=2X^{3}$ となり、やはり減少）。よって $a\ge0$ では $a=0$ の $S(0)=3$ が最大である。`,
            },
            {
              k: "p",
              t: String.raw`**$a<0$ のとき。** $\alpha=\sqrt{-a}$ とおくと、$|x|<\alpha$ で $x^{2}+a<0$、$|x|>\alpha$ で $x^{2}+a>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\alpha\ge1$（$a\le-1$）のときは $-1\le x\le1$ 全体で $g(x)=-x^{2}-a$ となり`,
            },
            {
              k: "math",
              t: String.raw`S(a)=\int_{-1}^{1}\left(\frac12x^{2}+2+a\right)dx=\frac13+2(2+a)=\frac{13}{3}+2a`,
            },
            {
              k: "p",
              t: String.raw`である（$2+a\ge0$ なので被積分関数は正）。これは増加するので、この範囲では $a=-1$ の $\dfrac73$ が最大である。`,
            },
            {
              k: "p",
              t: String.raw`$-1<a<0$（$0<\alpha<1$）のときは2つに分ける。$|x|\le\alpha$ では $f-g=\dfrac12x^{2}+2+a$、$\alpha\le|x|\le1$ では $f-g=2-a-\dfrac32x^{2}$ で、どちらもこの範囲で正である。$a=-\alpha^{2}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`\int_{-\alpha}^{\alpha}\left(\frac12x^{2}+2+a\right)dx=\frac{\alpha^{3}}{3}+2\left(2-\alpha^{2}\right)\alpha=4\alpha-\frac53\alpha^{3}`,
            },
            { k: "p", t: String.raw`であり、` },
            {
              k: "math",
              t: String.raw`2\int_{\alpha}^{1}\left(2+\alpha^{2}-\frac32x^{2}\right)dx=2\left[\left(2+\alpha^{2}\right)x-\frac{x^{3}}{2}\right]_{\alpha}^{1}=3-4\alpha+2\alpha^{2}-\alpha^{3}`,
            },
            { k: "p", t: String.raw`である。足すと` },
            { k: "math", t: String.raw`S=3+2\alpha^{2}-\frac83\alpha^{3}\qquad(0\le\alpha\le1)` },
            { k: "p", t: String.raw`となる。微分すると` },
            { k: "math", t: String.raw`\frac{dS}{d\alpha}=4\alpha-8\alpha^{2}=4\alpha\left(1-2\alpha\right)` },
            {
              k: "p",
              t: String.raw`で、$0<\alpha<\dfrac12$ で正、$\dfrac12<\alpha<1$ で負。よって $\alpha=\dfrac12$、すなわち $a=-\dfrac14$ で最大になり`,
            },
            {
              k: "math",
              t: String.raw`S=3+2\cdot\frac14-\frac83\cdot\frac18=3+\frac12-\frac13=\frac{19}{6}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{19}{6}=3.166\ldots$ は、ほかの範囲での最大 $3$（$a=0$）や $\dfrac73$（$a=-1$）より大きい。よって求める最大値は $\dfrac{19}{6}$ である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$a=-\frac14$ のときの領域（網かけ）。上の境界は $y=-\frac12x^{2}+2$、下の境界は $y=\left|x^{2}-\frac14\right|$ で、$x=\pm\frac12$ で折れている。面積は $\frac{19}{6}$。`,
                view: [-1.4, 1.4, -0.35, 2.35],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "fillBetween",
                    top: (x: number) => -0.5 * x * x + 2,
                    bottom: (x: number) => Math.abs(x * x - 0.25),
                    from: -1,
                    to: 1,
                  },
                  { k: "curve", f: (x: number) => -0.5 * x * x + 2, from: -1.3, to: 1.3 },
                  { k: "curve", f: (x: number) => Math.abs(x * x - 0.25), from: -1.3, to: 1.3 },
                  { k: "seg", a: [-1, 0.75], b: [-1, 1.5], dash: true, faint: true },
                  { k: "seg", a: [1, 0.75], b: [1, 1.5], dash: true, faint: true },
                  { k: "dot", at: [0.5, 0], label: "x = 1/2", place: "below-right" },
                  { k: "dot", at: [-0.5, 0], label: "x = −1/2", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$a<0$ では下の境界が $x=\pm\sqrt{-a}$ で折れる。$\left|x^{2}+a\right|$ をそのまま $x^{2}+a$ として積分すると、折れた部分のぶんだけ面積を取り違える。`,
            String.raw`$a$ そのものではなく $\alpha=\sqrt{-a}$ を変数にとると、面積が $\alpha$ の3次式になって微分しやすい。$\alpha$ の範囲 $0\le\alpha\le1$（$-1\le a\le0$）を忘れない。`,
            String.raw`$a\ge\dfrac12$ では上下の境界が交わって区間が狭くなる。この範囲でも $S$ は減少し続けるので最大には関わらないが、場合分けとしては触れておく。`,
          ],
          check: String.raw`$S(0)=3$、$S(-1)=\dfrac{13}{3}-2=\dfrac73=2.333$、$S(-2)=\dfrac{13}{3}-4=\dfrac13$ で、数値積分の値 $3.000000$、$2.333333$、$0.333333$ と一致する。$a$ を $-2$ から $2$ まで $4$ 万等分した全探索でも、最大は $3.166667$（$a=-0.25$）で $\dfrac{19}{6}=3.166667$ と合う。`,
        },
      ],
    },
  ],
};
