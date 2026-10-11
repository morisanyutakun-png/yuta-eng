import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2019年度（平成31年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問の図。CR/OQ が最大になる p = 8/9 のときの P, Q, R。 */
const P1 = 8 / 9;
const Q1 = 2 / (3 * P1);
const R1 = 2 * P1 - 1.5 * P1 * P1;

/** 第2問の図。D の下の境界（放物線）と上の境界（直線）。 */
const LOW2 = (p: number) => (p * p - 4 * p + 9) / 2;
const UP2 = (p: number) => 8.5 - p;

/** 第3問の図。正八角形の頂点（反時計回りに A から H）。 */
const OCT = Array.from({ length: 8 }, (_, k): [number, number] => [
  Math.cos((2 * Math.PI * k) / 8),
  Math.sin((2 * Math.PI * k) / 8),
]);
const OCT_NAME = ["A", "B", "C", "D", "E", "F", "G", "H"];
const OCT_PLACE = [
  "right",
  "above-right",
  "above",
  "above-left",
  "left",
  "below-left",
  "below",
  "below-right",
] as const;

export const todaiBunkei2019: SolutionSet = {
  slug: "todai-bunkei",
  year: 2019,
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
      topics: ["三角形の面積", "分数関数", "3次関数の最大最小", "変域"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$p=\\frac23,\\frac34,\\frac89,1$ について $q=\\frac{2}{3p}$、$r=2p-\\frac32p^{2}$ とおき、$\\triangle\\mathrm{OPQ}$ と $\\triangle\\mathrm{PQR}$ の面積を座標から直接計算すると、どちらもちょうど $\\frac13$ になることを確かめた",
          "$p$ を $\\frac23$ から $1$ まで $100$ 万等分して $\\frac{\\mathrm{CR}}{\\mathrm{OQ}}=\\frac rq$ を計算すると、最大 $0.790123457$（$p=0.888889$）、最小 $0.666666667$（$p=\\frac23$）となり、$\\frac{64}{81}=0.790123457$、$\\frac23$ と一致した",
          "同じ範囲で $q$ の値域が $\\left[\\frac23,1\\right]$、$r$ の値域が $\\left[\\frac12,\\frac23\\right]$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$q,r$ を $p$ で表し、$p,q,r$ それぞれのとりうる値の範囲を求める`,
          answer: String.raw`$q=\dfrac{2}{3p}$、$r=2p-\dfrac32p^{2}$。$\dfrac23\le p\le1$、$\dfrac23\le q\le1$、$\dfrac12\le r\le\dfrac23$`,
          approach: String.raw`$\triangle\mathrm{OPQ}$ は直角をはさむ2辺が $p,q$ なので面積はすぐ出る。$\triangle\mathrm{PQR}$ は3点とも動くので、ベクトルの外積（$\frac12\left|x_1y_2-x_2y_1\right|$）で面積を書くのが早い。範囲は「$p,q,r$ がすべて辺の上にある」、つまり $0$ 以上 $1$ 以下という条件から出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}(p,0)$、$\mathrm{Q}(0,q)$、$\mathrm{R}(r,1)$ で、$0\le p,q,r\le1$ である。`,
            },
            { k: "p", t: String.raw`**$\triangle\mathrm{OPQ}$。** 直角をはさむ2辺が $p,q$ だから` },
            {
              k: "math",
              t: String.raw`\frac12pq=\frac13\quad\Longleftrightarrow\quad pq=\frac23\quad\Longleftrightarrow\quad q=\frac{2}{3p}`,
            },
            { k: "p", t: String.raw`である（$pq=\frac23\ne0$ なので $p>0$）。` },
            {
              k: "p",
              t: String.raw`**$\triangle\mathrm{PQR}$。** $\overrightarrow{\mathrm{PQ}}=(-p,\,q)$、$\overrightarrow{\mathrm{PR}}=(r-p,\,1)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{PQR}=\frac12\left|(-p)\cdot1-q(r-p)\right|=\frac12\left|pq-p-qr\right|=\frac12\left|\frac23-p-qr\right|`,
            },
            { k: "p", t: String.raw`である。これが $\dfrac13$ だから $\left|\dfrac23-p-qr\right|=\dfrac23$、つまり` },
            { k: "math", t: String.raw`p+qr=0\quad\text{または}\quad p+qr=\frac43` },
            {
              k: "p",
              t: String.raw`である。$p>0$、$q,r\ge0$ より $p+qr>0$ なので前者は起こらない。よって $qr=\dfrac43-p$ で、$\dfrac1q=\dfrac{3p}{2}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`r=\left(\frac43-p\right)\cdot\frac{3p}{2}=2p-\frac32p^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**範囲。** $q=\dfrac{2}{3p}\le1$ より $p\ge\dfrac23$、また $p\le1$ だから` },
            { k: "math", t: String.raw`\frac23\le p\le1` },
            {
              k: "p",
              t: String.raw`である。この範囲で $q=\dfrac{2}{3p}$ は減少し、$p=\dfrac23$ で $q=1$、$p=1$ で $q=\dfrac23$ だから $\dfrac23\le q\le1$ である。`,
            },
            {
              k: "p",
              t: String.raw`$r=-\dfrac32p^{2}+2p$ は上に凸で、頂点は $p=\dfrac23$（$r=\dfrac23$）である。$\dfrac23\le p\le1$ では減少し、$p=1$ で $r=\dfrac12$ だから`,
            },
            { k: "math", t: String.raw`\frac12\le r\le\frac23` },
            {
              k: "p",
              t: String.raw`である。いずれも $0$ 以上 $1$ 以下に収まっているので、逆にこの範囲の $p$ はすべて条件をみたす。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$p=\frac89$ のときの正方形と3点。$\mathrm{P}\left(\frac89,0\right)$、$\mathrm{Q}\left(0,\frac34\right)$、$\mathrm{R}\left(\frac{16}{27},1\right)$ で、$\triangle\mathrm{OPQ}$ と $\triangle\mathrm{PQR}$ の面積はどちらも $\frac13$。`,
                view: [-0.35, 1.5, -0.25, 1.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [P1, 0], [0, Q1]] },
                  { k: "fill", pts: [[P1, 0], [0, Q1], [R1, 1]] },
                  { k: "seg", a: [0, 0], b: [1, 0], dash: true },
                  { k: "seg", a: [1, 0], b: [1, 1], dash: true },
                  { k: "seg", a: [1, 1], b: [0, 1], dash: true },
                  { k: "seg", a: [0, 1], b: [0, 0], dash: true },
                  { k: "seg", a: [0, 0], b: [P1, 0] },
                  { k: "seg", a: [0, 0], b: [0, Q1] },
                  { k: "seg", a: [P1, 0], b: [0, Q1] },
                  { k: "seg", a: [P1, 0], b: [R1, 1] },
                  { k: "seg", a: [0, Q1], b: [R1, 1] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "A", place: "right" },
                  { k: "dot", at: [1, 1], label: "B", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "C", place: "above-left" },
                  { k: "dot", at: [P1, 0], label: "P", place: "below" },
                  { k: "dot", at: [0, Q1], label: "Q", place: "left" },
                  { k: "dot", at: [R1, 1], label: "R", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\left|\frac23-p-qr\right|=\frac23$ を解くと2通り出るが、$p>0$ から片方は消える。絶対値を外すときに片方だけ書いて済ませない。`,
            String.raw`$p$ の範囲は $q\le1$ から出る。$p\le1$ だけでは足りず、$\frac23\le p$ が効いている。$r$ の範囲を先に使おうとすると遠回りになる。`,
            String.raw`$r=-\frac32p^{2}+2p$ の頂点がちょうど区間の左端 $p=\frac23$ にある。区間の内部に頂点がないので、端の値を比べるだけで値域が決まる。`,
          ],
          check: String.raw`$p=\frac89$ なら $q=\frac34$、$r=\frac{16}{27}=0.5926$ で、$\triangle\mathrm{OPQ}=\frac12\cdot\frac89\cdot\frac34=\frac13$、$\triangle\mathrm{PQR}$ も座標から計算すると $0.333333333$ になる。$p=\frac23,\frac34,1$ でも同じく両方とも $\frac13$ であった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\dfrac{\mathrm{CR}}{\mathrm{OQ}}$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{64}{81}$（$p=\dfrac89$）、最小値 $\dfrac23$（$p=\dfrac23$）`,
          approach: String.raw`$\mathrm{C}(0,1)$、$\mathrm{R}(r,1)$ なので $\mathrm{CR}=r$、$\mathrm{OQ}=q$ である。(1) の結果を入れると $\dfrac rq$ は $p$ だけの3次関数になるので、あとは $\dfrac23\le p\le1$ での増減を調べるだけでよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{C}(0,1)$ と $\mathrm{R}(r,1)$ は同じ高さにあるので $\mathrm{CR}=r$、また $\mathrm{OQ}=q$ である。(1) より $\dfrac1q=\dfrac{3p}{2}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{CR}}{\mathrm{OQ}}=\frac rq=\left(2p-\frac32p^{2}\right)\cdot\frac{3p}{2}=3p^{2}-\frac94p^{3}`,
            },
            { k: "p", t: String.raw`である。$g(p)=3p^{2}-\dfrac94p^{3}$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(p)=6p-\frac{27}{4}p^{2}=\frac{3p}{4}\left(8-9p\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$\dfrac23\le p\le1$ では $p>0$ だから、符号は $8-9p$ で決まる。$p=\dfrac89$ の前で正、後ろで負なので、$g$ は $p=\dfrac89$ で極大かつ最大である。値は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac89\right)=3\cdot\frac{64}{81}-\frac94\cdot\frac{512}{729}=\frac{192}{81}-\frac{128}{81}=\frac{64}{81}`,
            },
            { k: "p", t: String.raw`である。最小は両端を比べて` },
            {
              k: "math",
              t: String.raw`g\left(\frac23\right)=\frac43-\frac94\cdot\frac8{27}=\frac43-\frac23=\frac23,\qquad g(1)=3-\frac94=\frac34`,
            },
            { k: "p", t: String.raw`なので、$\dfrac23<\dfrac34$ より $p=\dfrac23$ のときの $\dfrac23$ が最小である。よって` },
            {
              k: "math",
              t: String.raw`\text{最大値 }\frac{64}{81}\;\left(p=\frac89\right),\qquad\text{最小値 }\frac23\;\left(p=\frac23\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{64}{81}=0.7901$、$\dfrac34=0.75$、$\dfrac23=0.6667$ である。最大は区間の内部、最小は左端で起きる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{CR}$ は $\mathrm{C}$ と $\mathrm{R}$ の距離で、$\mathrm{R}$ の $x$ 座標 $r$ にそのまま等しい。$\mathrm{R}$ が辺 $\mathrm{BC}$ 上にあることを使っている。`,
            String.raw`最小値は $p=\frac23$（左端）で、$p=1$（右端）ではない。両端を両方計算して比べる。`,
            String.raw`$\frac rq$ を $p$ の式に直さずに $q,r$ のまま扱うと、$q$ と $r$ が連動していることを見落として「$r$ 最大・$q$ 最小」を別々に取りにいってしまう。$q$ が最小 $\frac23$ になるのは $p=1$、$r$ が最大 $\frac23$ になるのは $p=\frac23$ で、同時には起こらない。`,
          ],
          check: String.raw`$p$ を $\frac23$ から $1$ まで $100$ 万等分して $\frac rq$ を直接計算すると、最大 $0.790123457$（$p=0.888889$）、最小 $0.666666667$（$p=\frac23$）となり、$\frac{64}{81}=0.790123457$、$\frac23$ と一致する。$p=1$ では $0.75$ で、最小ではない。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式",
      topics: ["内積", "点と直線の距離", "領域の面積", "なす角"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$D$ の面積を $400$ 万点のモンテカルロ法で求めると $17.9988$ となり、$18$ と一致した",
          "$D$ の境界を $40$ 万点でたどって $\\cos\\theta=\\frac{p}{\\sqrt{p^{2}+q^{2}}}$ を直接計算すると、最大 $0.707106781$（点 $(3,3)$）、最小 $-0.187112108$（点 $\\left(-2,\\frac{21}{2}\\right)$）となり、$\\frac{1}{\\sqrt2}=0.707106781$、$-\\frac{4}{\\sqrt{457}}=-0.187112108$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$D$ を図示し、その面積を求める`,
          answer: String.raw`$\dfrac{(p-1)^{2}}{2}+4\le q+p\le\dfrac{17}{2}$、つまり放物線 $q=\dfrac{p^{2}-4p+9}{2}$ と直線 $q=\dfrac{17}{2}-p$ ではさまれた部分。面積は $18$`,
          approach: String.raw`どちらの条件も $p+q$ の式に化ける。$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OP}}=2(p+q)$ で、$c$ は定数、$d$ も $|p+q-4|$ の定数倍だからである。$p+q=s$ とおけば、条件1が $s$ の範囲、条件2が $s$ と $p$ の関係になり、放物線と直線ではさまれた領域の面積に帰着する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}(2,2)$ なので $\overrightarrow{\mathrm{OA}}=(2,2)$、$\ell$ は $\mathrm{A}$ を通り $\overrightarrow{\mathrm{OA}}$ に垂直な直線だから`,
            },
            { k: "math", t: String.raw`\ell:\;2(x-2)+2(y-2)=0\quad\Longleftrightarrow\quad x+y=4` },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`c=\frac{|0+0-4|}{\sqrt2}=2\sqrt2,\qquad d=\frac{|p+q-4|}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**条件を書き直す。** $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OP}}=2p+2q$ なので条件1は` },
            { k: "math", t: String.raw`8\le2(p+q)\le17\quad\Longleftrightarrow\quad 4\le p+q\le\frac{17}{2}` },
            { k: "p", t: String.raw`である。条件2は $cd=2\sqrt2\cdot\dfrac{|p+q-4|}{\sqrt2}=2|p+q-4|$ だから` },
            { k: "math", t: String.raw`2\left|p+q-4\right|\ge(p-1)^{2}` },
            {
              k: "p",
              t: String.raw`である。条件1より $p+q\ge4$ なので絶対値が外れて $2(p+q-4)\ge(p-1)^{2}$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`q\ge\frac{(p-1)^{2}}{2}-p+4=\frac{p^{2}-4p+9}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。この不等式は $p+q\ge4$ を含む（右辺から $p$ を引いて $4$ を足した形なので、$p+q-4\ge\frac{(p-1)^{2}}{2}\ge0$）。したがって`,
            },
            {
              k: "math",
              t: String.raw`D:\quad\frac{p^{2}-4p+9}{2}\le q\le\frac{17}{2}-p`,
            },
            {
              k: "p",
              t: String.raw`である。下の境界は下に凸の放物線（頂点 $\left(2,\dfrac52\right)$）、上の境界は直線である。`,
            },
            { k: "p", t: String.raw`**交点と面積。** 2つの境界が交わるのは` },
            {
              k: "math",
              t: String.raw`\frac{p^{2}-4p+9}{2}=\frac{17}{2}-p\;\Longleftrightarrow\;p^{2}-2p-8=0\;\Longleftrightarrow\;(p+2)(p-4)=0`,
            },
            {
              k: "p",
              t: String.raw`なので $p=-2,\,4$、交点は $\left(-2,\dfrac{21}{2}\right)$ と $\left(4,\dfrac92\right)$ である。面積は`,
            },
            {
              k: "math",
              t: String.raw`\int_{-2}^{4}\left\{\left(\frac{17}{2}-p\right)-\frac{p^{2}-4p+9}{2}\right\}dp=\int_{-2}^{4}\frac{-p^{2}+2p+8}{2}\,dp`,
            },
            {
              k: "p",
              t: String.raw`である。$-p^{2}+2p+8=-(p+2)(p-4)$ なので、$\frac16$ 公式（$\int_{\alpha}^{\beta}(x-\alpha)(\beta-x)dx=\frac{(\beta-\alpha)^{3}}{6}$）を使って`,
            },
            {
              k: "math",
              t: String.raw`\frac12\cdot\frac{\left(4-(-2)\right)^{3}}{6}=\frac12\cdot\frac{216}{6}=18`,
            },
            { k: "p", t: String.raw`である。面積は $18$ である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`領域 $D$。下の境界は放物線 $q=\frac{p^{2}-4p+9}{2}$（頂点 $\left(2,\frac52\right)$）、上の境界は直線 $q=\frac{17}{2}-p$ で、$\left(-2,\frac{21}{2}\right)$ と $\left(4,\frac92\right)$ で交わる。面積は $18$。`,
                view: [-3.0, 6.0, 1.8, 11.2],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fillBetween", top: UP2, bottom: LOW2, from: -2, to: 4 },
                  { k: "curve", f: LOW2, from: -2.6, to: 4.8 },
                  { k: "curve", f: UP2, from: -2.6, to: 4.8 },
                  { k: "dot", at: [-2, 10.5], label: "(-2, 21/2)", place: "right" },
                  { k: "dot", at: [4, 4.5], label: "(4, 9/2)", place: "above-right" },
                  { k: "dot", at: [2, 2.5], label: "(2, 5/2)", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$c$ は定数 $2\sqrt2$ である（$\ell$ が $\mathrm{A}$ を通り $\mathrm{OA}$ に垂直なので $c=\mathrm{OA}$）。変数と思って $p,q$ の式にしようとしない。`,
            String.raw`$cd$ の計算で $\sqrt2$ が約分されて、条件2がきれいな $2(p+q-4)\ge(p-1)^{2}$ になる。ここで条件1の $p+q\ge4$ を使って絶対値を外す順番が大事である。`,
            String.raw`条件2が条件1の下半分（$p+q\ge4$）を含んでいるので、残る条件は $p+q\le\frac{17}{2}$ だけになる。条件1の左側を二重に書く必要はない。`,
          ],
          check: String.raw`面積を $-3\le p\le5$、$0\le q\le12$ の長方形で $400$ 万点のモンテカルロ法で求めると $17.9988$ となり、$18$ と一致する。交点 $\left(-2,\frac{21}{2}\right)$、$\left(4,\frac92\right)$ はどちらも放物線と直線の両方の式をみたす。`,
        },
        {
          label: "(2)",
          task: String.raw`$\cos\theta$ のとりうる値の範囲を求める`,
          answer: String.raw`$-\dfrac{4}{\sqrt{457}}\le\cos\theta\le\dfrac{1}{\sqrt2}$（$-\dfrac{4\sqrt{457}}{457}\le\cos\theta\le\dfrac{\sqrt2}{2}$）`,
          approach: String.raw`$\cos\theta=\dfrac{p}{\sqrt{p^{2}+q^{2}}}$ は $\mathrm{OP}$ の**向き**だけで決まる。$D$ の中では $q>0$ なので、$u=\dfrac pq$ とおくと $\cos\theta=\dfrac{u}{\sqrt{u^{2}+1}}$ で、これは $u$ の増加関数である。だから $u$ の最大・最小を求めればよい。$p$ を固定すると $\dfrac pq$ の端は $q$ が最小のとき、つまり下の境界の上で起きる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ の下の境界 $q=\dfrac{p^{2}-4p+9}{2}$ は頂点 $\left(2,\dfrac52\right)$ で最小なので、$D$ の中ではつねに $q\ge\dfrac52>0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac{p}{\sqrt{p^{2}+q^{2}}}=\frac{u}{\sqrt{u^{2}+1}}\qquad\left(u=\frac pq\right)`,
            },
            {
              k: "p",
              t: String.raw`と書ける。$\dfrac{d}{du}\dfrac{u}{\sqrt{u^{2}+1}}=\dfrac{1}{\left(u^{2}+1\right)^{3/2}}>0$ なので、$\cos\theta$ は $u$ の増加関数である。したがって $u=\dfrac pq$ の最大・最小を求めればよい。`,
            },
            {
              k: "p",
              t: String.raw`**$u$ の端は下の境界で起きる。** $p$ を固定して $q$ を動かすと、$p>0$ なら $\dfrac pq$ は $q$ の減少関数、$p<0$ なら増加関数である。どちらの場合も $\dfrac pq$ が端（$p>0$ では最大、$p<0$ では最小）になるのは $q$ が最小のとき、つまり下の境界の上である。$p=0$ では $u=0$ で、これは下で見る範囲に入る。`,
            },
            { k: "p", t: String.raw`そこで下の境界上で` },
            {
              k: "math",
              t: String.raw`h(p)=\frac{p}{\frac{p^{2}-4p+9}{2}}=\frac{2p}{p^{2}-4p+9}\qquad(-2\le p\le4)`,
            },
            { k: "p", t: String.raw`の最大・最小を調べる。分母は $(p-2)^{2}+5>0$ である。` },
            {
              k: "math",
              t: String.raw`h'(p)=\frac{2\left(p^{2}-4p+9\right)-2p(2p-4)}{\left(p^{2}-4p+9\right)^{2}}=\frac{18-2p^{2}}{\left(p^{2}-4p+9\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`なので、$-2\le p\le4$ では $h'$ の符号は $9-p^{2}$ の符号、つまり $p=3$ の前で正、後ろで負である。よって $h$ は $p=3$ で最大、区間の端 $p=-2$ か $p=4$ で最小になる。`,
            },
            {
              k: "math",
              t: String.raw`h(3)=\frac{6}{9-12+9}=1,\qquad h(-2)=\frac{-4}{4+8+9}=-\frac4{21},\qquad h(4)=\frac8{16-16+9}=\frac89`,
            },
            {
              k: "p",
              t: String.raw`なので、$u$ の最大は $1$（点 $(3,3)$）、最小は $-\dfrac4{21}$（点 $\left(-2,\dfrac{21}{2}\right)$）である。`,
            },
            { k: "p", t: String.raw`**$\cos\theta$ に戻す。** $u=1$ のとき` },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac{1}{\sqrt{1+1}}=\frac{1}{\sqrt2}`,
            },
            { k: "p", t: String.raw`で、$u=-\dfrac4{21}$ のとき` },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac{-\frac4{21}}{\sqrt{\frac{16}{441}+1}}=\frac{-\frac4{21}}{\frac{\sqrt{457}}{21}}=-\frac{4}{\sqrt{457}}`,
            },
            {
              k: "p",
              t: String.raw`である。$D$ は連結なので $u$ は $-\dfrac4{21}$ から $1$ までのすべての値をとり、したがって`,
            },
            {
              k: "math",
              t: String.raw`-\frac{4}{\sqrt{457}}\le\cos\theta\le\frac{1}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`である。小数で書くと $-0.1871\le\cos\theta\le0.7071$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\mathrm{OP}$ の向きが端になるのは、原点から引いた2本の直線が $D$ に接する（または角で触れる）ときである。右端は放物線に接する点 $(3,3)$（傾き $1$）、左端は角 $\left(-2,\frac{21}{2}\right)$。`,
                view: [-3.4, 5.6, -0.9, 11.4],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fillBetween", top: UP2, bottom: LOW2, from: -2, to: 4 },
                  { k: "curve", f: LOW2, from: -2.6, to: 4.6, faint: true },
                  { k: "curve", f: UP2, from: -2.6, to: 4.6, faint: true },
                  { k: "seg", a: [0, 0], b: [4.6, 4.6], dash: true },
                  { k: "seg", a: [0, 0], b: [-2.1, 11.025], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [3, 3], label: "(3, 3)", place: "below-right" },
                  { k: "dot", at: [-2, 10.5], label: "(-2, 21/2)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\cos\theta$ は $\mathrm{OP}$ の長さによらない。$D$ の点を全部調べる必要はなく、原点から見た向きの幅だけを見ればよい。`,
            String.raw`$u=\frac pq$ の端が下の境界で起きるのは、$p$ の符号によらず「$q$ を小さくするほど端に寄る」からである。$p<0$ のときに向きが逆になる点に注意する。`,
            String.raw`$h$ の導関数の零点は $p=\pm3$ だが、$p=-3$ は $D$ の外（$-2\le p\le4$）である。区間の外の極値を使わない。`,
            String.raw`最小値は角 $\left(-2,\frac{21}{2}\right)$ で、接点ではない。$p=-3$ での接線は $D$ に触れないので、左端は角で決まる。`,
          ],
          check: String.raw`$D$ の境界を $40$ 万点たどって $\cos\theta=\frac{p}{\sqrt{p^{2}+q^{2}}}$ を直接計算すると、最大 $0.707106781$（点 $(3,3)$）、最小 $-0.187112108$（点 $\left(-2,10.5\right)$）になる。$\frac{1}{\sqrt2}=0.707106781$、$-\frac{4}{\sqrt{457}}=-0.187112108$ と一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["ランダムウォーク", "反復試行", "反射の原理", "余事象"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$2^{10}=1024$ 通りの表裏をすべて列挙して点 $\\mathrm{P}$ の動きを追うと、$10$ 回後に $\\mathrm{A}$ にあるのが $272$ 通り（$\\frac{17}{64}$）、そのうち途中で $\\mathrm{F}$ に移動するものが $66$ 通り（$\\frac{33}{512}$）であることを確かめた",
          "内訳が「正味 $+8$：$10$ 通り」「正味 $-8$：$10$ 通り」「正味 $0$ で $+5$ に達する：$1$ 通り」「正味 $0$ で $-3$ に達する：$45$ 通り」であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$10$ 回の操作のあと $\mathrm{P}$ が $\mathrm{A}$ にある確率を求める`,
          answer: String.raw`$\dfrac{17}{64}$`,
          approach: String.raw`頂点を $0$ から $7$ の番号で表し、表を $+1$、裏を $-1$ とする。$10$ 回後の位置は「表の回数 $-$ 裏の回数」を $8$ で割った余りで決まるので、表の回数についての合同式に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`頂点 $\mathrm{A},\mathrm{B},\dots,\mathrm{H}$ に反時計回りに $0,1,\dots,7$ の番号をつける。表なら番号が $+1$、裏なら $-1$ され、$8$ を法として考えればよい。`,
            },
            {
              k: "p",
              t: String.raw`$10$ 回のうち表が $h$ 回出たとすると、番号の変化は $h-(10-h)=2h-10$ である。$\mathrm{P}$ が $\mathrm{A}$（番号 $0$）にある条件は`,
            },
            {
              k: "math",
              t: String.raw`2h-10\equiv0\pmod 8\quad\Longleftrightarrow\quad 2h\equiv2\pmod 8\quad\Longleftrightarrow\quad h\equiv1\pmod 4`,
            },
            { k: "p", t: String.raw`である。$0\le h\le10$ だから $h=1,5,9$ で、場合の数は` },
            {
              k: "math",
              t: String.raw`{}_{10}\mathrm{C}_{1}+{}_{10}\mathrm{C}_{5}+{}_{10}\mathrm{C}_{9}=10+252+10=272`,
            },
            { k: "p", t: String.raw`通りである。全体は $2^{10}=1024$ 通りなので` },
            { k: "math", t: String.raw`P(S)=\frac{272}{1024}=\frac{17}{64}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`正八角形の頂点。反時計回りに $\mathrm{A}$ から $\mathrm{H}$ で、表が出ると反時計回りに、裏が出ると時計回りに1つ進む。$\mathrm{A}$ から $\mathrm{F}$ へは反時計回りに $5$、時計回りに $3$ である。`,
                view: [-1.6, 1.6, -1.35, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  ...OCT.map((v, k) => ({
                    k: "seg" as const,
                    a: v,
                    b: OCT[(k + 1) % 8],
                    faint: true,
                  })),
                  ...OCT.map((v, k) => ({
                    k: "dot" as const,
                    at: v,
                    label: OCT_NAME[k],
                    place: OCT_PLACE[k],
                  })),
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$2h-10$ は必ず偶数なので、$8$ を法として $0$ になるには $2h-10\in\{-8,0,8\}$、つまり $h\in\{1,5,9\}$ しかない。$10$ 回では一周ぶん（$8$）までしかずれないので、この3つで尽きている。`,
            },
          ],
          pitfalls: [
            String.raw`$2h\equiv2\pmod8$ を $h\equiv1\pmod8$ としない。両辺を $2$ で割るときは法も $2$ で割って $h\equiv1\pmod4$ になる。`,
            String.raw`$h=1$ と $h=9$ はどちらも $10$ 通りで、忘れやすい。$h=5$ だけだと $\frac{252}{1024}$ になってしまう。`,
          ],
          check: String.raw`$2^{10}=1024$ 通りをすべて列挙して $10$ 回後の位置を調べると、$\mathrm{A}$ にあるのはちょうど $272$ 通りで、$\frac{272}{1024}=\frac{17}{64}=0.265625$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`事象 $S$（$10$ 回後に $\mathrm{A}$）と事象 $T$（途中で少なくとも1回 $\mathrm{F}$ に移動）がともに起こる確率を求める`,
          answer: String.raw`$\dfrac{33}{512}$`,
          approach: String.raw`番号を $8$ で割らずに、整数の上の動き $X_t$（表 $+1$、裏 $-1$ の累計）として追う。$10$ 回では $|X_t|\le10$ なので、$\mathrm{F}$ にいる（$X_t\equiv5\pmod8$）のは $X_t=5$ か $X_t=-3$ のときだけ、と候補が絞れる。あとは「ある高さに到達する経路の数」を反射の原理で数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`表を $+1$、裏を $-1$ として、$t$ 回目までの累計を $X_t$ とする（$X_0=0$）。$\mathrm{P}$ の番号は $X_t$ を $8$ で割った余りである。`,
            },
            {
              k: "p",
              t: String.raw`**候補を絞る。** $|X_t|\le t\le10$ なので、$X_t\equiv5\pmod 8$ となるのは`,
            },
            { k: "math", t: String.raw`X_t=5\quad\text{または}\quad X_t=-3` },
            {
              k: "p",
              t: String.raw`のときだけである（$13$ や $-11$ は $10$ を超える）。また $X_{10}\equiv0\pmod8$ かつ $|X_{10}|\le10$、$X_{10}$ は偶数だから`,
            },
            { k: "math", t: String.raw`X_{10}\in\{-8,\;0,\;8\}` },
            { k: "p", t: String.raw`で、これは (1) の $h=1,5,9$ に対応する。$X_{10}$ で場合分けする。` },
            {
              k: "p",
              t: String.raw`**(i) $X_{10}=8$ のとき（$h=9$、$ {}_{10}\mathrm{C}_{9}=10$ 通り）。** $X$ は $1$ ずつしか動かないので、$0$ から $8$ へ行くには途中で必ず $5$ を通る。よって $10$ 通りすべてが $T$ をみたす。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) $X_{10}=-8$ のとき（$h=1$、$10$ 通り）。** 同様に、$0$ から $-8$ へ行くには必ず $-3$ を通る。$10$ 通りすべてが $T$ をみたす。`,
            },
            {
              k: "p",
              t: String.raw`**(iii) $X_{10}=0$ のとき（$h=5$、$ {}_{10}\mathrm{C}_{5}=252$ 通り）。** $5$ に達するか $-3$ に達するかを数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$5$ に達する経路：反射の原理より、$0$ から $0$ へ行き途中で $5$ に達する経路の数は、$0$ から $2\cdot5=10$ へ行く経路の数に等しく $ {}_{10}\mathrm{C}_{10}=1$ 通り。実際、$10$ 回で $5$ まで上がって戻るには「表5回のあと裏5回」しかない。`,
                String.raw`$-3$ に達する経路：同様に、$0$ から $-6$ へ行く経路の数に等しい。$2h-10=-6$ より $h=2$ で $ {}_{10}\mathrm{C}_{2}=45$ 通り。`,
                String.raw`両方に達する経路：$5$ に達する唯一の経路は $X$ の最小値が $0$ なので、$-3$ には達しない。$0$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`よって (iii) では $1+45=46$ 通りである。` },
            { k: "p", t: String.raw`**合計。** ` },
            {
              k: "math",
              t: String.raw`10+10+46=66\quad\Longrightarrow\quad P(S\cap T)=\frac{66}{1024}=\frac{33}{512}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`反射の原理とは、はじめて高さ $a$ に達したところから後ろを $a$ について折り返す操作である。$0$ から $0$ へ行き途中で $a$ に達する経路と、$0$ から $2a$ へ行く経路が1対1に対応する。$2a$ へ行く経路は必ず $a$ を通るので、対応は全単射になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{F}$ にいることを $X_t=5$ だけで判定しない。時計回りに $3$ 進んだ $X_t=-3$ も $\mathrm{F}$ である。$10$ 回という制限から候補がこの $2$ つに絞れる、という順番で考える。`,
            String.raw`$X_{10}=\pm8$ の場合は「必ず通る」ので数え直しがいらない。ここで反射の原理を使おうとすると手間が増える。`,
            String.raw`$5$ に達する経路と $-3$ に達する経路を足すときは、両方に達するものを引く。ここでは $0$ だが、確かめずに足すと危うい。`,
          ],
          check: String.raw`$1024$ 通りをすべて列挙すると、$S$ が起こる $272$ 通りのうち途中で $\mathrm{F}$ に移動するものはちょうど $66$ 通りで、$\frac{66}{1024}=\frac{33}{512}=0.064453$ である。内訳も $10+10+1+45=66$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形と方程式",
      topics: ["絶対値の不等式", "ベクトルの差", "領域", "平行移動"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$D$ から $30$ 万組の $(\\mathrm{P},\\mathrm{Q})$ をとって $\\overrightarrow{\\mathrm{OP}}-\\overrightarrow{\\mathrm{OQ}}$ を計算すると、$|x|+|y|\\le2$ を外れたものは $0$ 件だった",
          "逆に $|x|+|y|\\le2$ をみたす点については $\\left(\\frac x2,\\frac y2\\right)$ が $|x|+|y|\\le1$ をみたすことを式で確かめた（$\\left|\\frac x2\\right|+\\left|\\frac y2\\right|=\\frac{|x|+|y|}{2}\\le1$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$D$ と $E$ をそれぞれ図示する`,
          answer: String.raw`$D$ は $4$ 点 $(\pm1,0)$、$(0,\pm1)$ を頂点とする正方形の周と内部。$E$ は $|x|+|y|\le2$、すなわち $4$ 点 $(\pm2,0)$、$(0,\pm2)$ を頂点とする正方形の周と内部`,
          approach: String.raw`$E$ を求めるには、「$E$ に入ること」と「$|x|+|y|\le2$」が同値であることを両向きに示す。入ることは三角不等式で、逆は $\mathrm{P}$ と $\mathrm{Q}$ を具体的に作ればよい。$D$ が原点について対称なので、$-\overrightarrow{\mathrm{OQ}}$ もまた $D$ の点を指す、という点が効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ は $|x|+|y|\le1$ で、$4$ 点 $(1,0)$、$(0,1)$、$(-1,0)$、$(0,-1)$ を頂点とする正方形（傾いた正方形）の周と内部である。`,
            },
            {
              k: "p",
              t: String.raw`**$E\subset\{|x|+|y|\le2\}$。** $\mathrm{P}(x_1,y_1)$、$\mathrm{Q}(x_2,y_2)$ をともに $D$ の点とすると、$\mathrm{R}=(x_1-x_2,\;y_1-y_2)$ で`,
            },
            {
              k: "math",
              t: String.raw`\left|x_1-x_2\right|+\left|y_1-y_2\right|\le\left(\left|x_1\right|+\left|y_1\right|\right)+\left(\left|x_2\right|+\left|y_2\right|\right)\le1+1=2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**逆向き。** $|x|+|y|\le2$ をみたす $(x,y)$ に対して`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(\frac x2,\frac y2\right),\qquad\mathrm{Q}\left(-\frac x2,-\frac y2\right)`,
            },
            {
              k: "p",
              t: String.raw`をとると、どちらも $\left|\dfrac x2\right|+\left|\dfrac y2\right|=\dfrac{|x|+|y|}{2}\le1$ より $D$ の点である。そして $\overrightarrow{\mathrm{OP}}-\overrightarrow{\mathrm{OQ}}=(x,y)$ だから、$(x,y)$ は $E$ に属する。`,
            },
            { k: "p", t: String.raw`以上より` },
            { k: "math", t: String.raw`E=\left\{(x,y)\;\middle|\;|x|+|y|\le2\right\}` },
            {
              k: "p",
              t: String.raw`で、$4$ 点 $(\pm2,0)$、$(0,\pm2)$ を頂点とする正方形の周と内部である（$D$ を原点中心に $2$ 倍に拡大したもの）。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$D:|x|+|y|\le1$（濃い正方形）と $E:|x|+|y|\le2$（破線の正方形の内側）。$E$ は $D$ を原点中心に $2$ 倍したものになる。`,
                view: [-2.7, 2.7, -2.3, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[1, 0], [0, 1], [-1, 0], [0, -1]] },
                  { k: "seg", a: [1, 0], b: [0, 1] },
                  { k: "seg", a: [0, 1], b: [-1, 0] },
                  { k: "seg", a: [-1, 0], b: [0, -1] },
                  { k: "seg", a: [0, -1], b: [1, 0] },
                  { k: "seg", a: [2, 0], b: [0, 2], dash: true },
                  { k: "seg", a: [0, 2], b: [-2, 0], dash: true },
                  { k: "seg", a: [-2, 0], b: [0, -2], dash: true },
                  { k: "seg", a: [0, -2], b: [2, 0], dash: true },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "above-right" },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "below-right" },
                  { k: "dot", at: [0, 2], label: "(0, 2)", place: "above-right" },
                  { k: "text", at: [-0.55, -0.55], label: "D", place: "left" },
                  { k: "text", at: [-1.2, -1.2], label: "E", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「$\subset$」だけでは図示にならない。$|x|+|y|\le2$ の点が**すべて**作れることを、$\mathrm{P},\mathrm{Q}$ を具体的に書いて示す。`,
            String.raw`$\mathrm{Q}\left(-\frac x2,-\frac y2\right)$ がとれるのは $D$ が原点対称だからである。原点対称でない領域では、この作り方は使えない。`,
            String.raw`$E$ は $D$ を $2$ 倍したものだが、これは $D$ が原点対称な凸集合だから起きることで、一般には $\{\mathrm{P}-\mathrm{Q}\}$ が元の $2$ 倍になるとは限らない。`,
          ],
          check: String.raw`$D$ から $30$ 万組の $(\mathrm{P},\mathrm{Q})$ をランダムにとって差を計算すると、$|x|+|y|\le2$ を外れたものは $0$ 件だった。また $|x|+|y|=2$ の点（たとえば $(2,0)$、$(1,1)$）は、それぞれ $\mathrm{P}(1,0),\mathrm{Q}(-1,0)$、$\mathrm{P}\left(\frac12,\frac12\right),\mathrm{Q}\left(-\frac12,-\frac12\right)$ で作れる。`,
        },
        {
          label: "(2)",
          task: String.raw`$F:|x-a|+|y-b|\le1$ から同じように作った $G$ が $E$ と一致することを示す`,
          answer: String.raw`$\mathrm{S},\mathrm{T}$ から $(a,b)$ を引くと $D$ の点になり、差では $(a,b)$ が打ち消し合うので $G=E$`,
          approach: String.raw`$F$ は $D$ を $(a,b)$ だけ平行移動したものである。差をとると平行移動ぶんが相殺するので、$G$ は $(a,b)$ によらない。これを「$\mathrm{S}-(a,b)$ が $D$ を動く」という形に書き直して示す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{S}(s_1,s_2)$ について`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{S}\in F\iff\left|s_1-a\right|+\left|s_2-b\right|\le1\iff\left(s_1-a,\;s_2-b\right)\in D`,
            },
            {
              k: "p",
              t: String.raw`である。そこで $\mathrm{P}=\left(s_1-a,\;s_2-b\right)$、$\mathrm{Q}=\left(t_1-a,\;t_2-b\right)$ とおくと、$\mathrm{S},\mathrm{T}$ が $F$ 全体を独立に動くことと、$\mathrm{P},\mathrm{Q}$ が $D$ 全体を独立に動くことは同じである（$\mathrm{S}=\mathrm{P}+(a,b)$ で戻せる）。`,
            },
            { k: "p", t: String.raw`このとき` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OU}}=\overrightarrow{\mathrm{OS}}-\overrightarrow{\mathrm{OT}}=\left(s_1-t_1,\;s_2-t_2\right)=\left(\left(s_1-a\right)-\left(t_1-a\right),\;\left(s_2-b\right)-\left(t_2-b\right)\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OU}}=\overrightarrow{\mathrm{OP}}-\overrightarrow{\mathrm{OQ}}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $\mathrm{U}$ の動く範囲 $G$ は、$\mathrm{P},\mathrm{Q}$ が $D$ を動くときの $\overrightarrow{\mathrm{OP}}-\overrightarrow{\mathrm{OQ}}$ の動く範囲、つまり $E$ そのものである。よって`,
            },
            { k: "math", t: String.raw`G=E` },
            { k: "p", t: String.raw`が示された。` },
            {
              k: "note",
              t: String.raw`(1) の計算をもう一度やってもよい。$\left|\left(s_1-t_1\right)\right|+\left|\left(s_2-t_2\right)\right|\le2$ は三角不等式から出るし、逆向きは $\mathrm{S}=\left(a+\frac x2,\;b+\frac y2\right)$、$\mathrm{T}=\left(a-\frac x2,\;b-\frac y2\right)$ をとればよい。ただし「平行移動ぶんが差で消える」と見るほうが、$(a,b)$ が何であっても同じという理由がはっきりする。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{S}$ と $\mathrm{T}$ は独立に動く。同じ点を動く2つの変数なので、$\mathrm{S}=\mathrm{T}$ のような結びつきを勝手に入れない。`,
            String.raw`$G=E$ は「$(a,b)$ によらない」ということである。$a,b$ を含む答えが出たら、どこかで平行移動を相殺し損ねている。`,
          ],
          check: String.raw`たとえば $(a,b)=(3,-5)$ としても、$\mathrm{S}\left(3+\frac x2,\,-5+\frac y2\right)$、$\mathrm{T}\left(3-\frac x2,\,-5-\frac y2\right)$ はどちらも $F$ の点で、差は $(x,y)$ である。$|x|+|y|\le2$ の任意の点が作れ、逆に差が $|x|+|y|\le2$ を超えないことも三角不等式から言える。`,
        },
      ],
    },
  ],
};
