import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2019年度（平成31年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第3問の図。$p$ の代表値（$3<p<4$ のうちの1つ）。 */
const P3 = 3.5;

export const todaiRikei2019: SolutionSet = {
  slug: "todai-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["置換積分", "部分積分", "分数関数の積分", "展開して分ける"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "被積分関数をそのままシンプソン法で数値積分して $1.0115663210$ を得て、$\\frac{5\\sqrt2}{2}+\\frac\\pi8-\\frac{35}{12}=1.0115663210$ と小数10桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\displaystyle\int_0^{1}\left(x^{2}+\frac{x}{\sqrt{1+x^{2}}}\right)\left(1+\frac{x}{\left(1+x^{2}\right)\sqrt{1+x^{2}}}\right)dx$ を求める`,
          answer: String.raw`$\dfrac{5\sqrt2}{2}+\dfrac\pi8-\dfrac{35}{12}$`,
          approach: String.raw`$t=\dfrac{x}{\sqrt{1+x^{2}}}$ とおくと $t'=\dfrac{1}{\left(1+x^{2}\right)^{\frac32}}$ となり、2つめの括弧はちょうど $1+xt'$ と書ける。そこで展開して4つの積分に分ければ、どれも基本の形（多項式、$\frac{x}{\sqrt{1+x^{2}}}$ 型、$\frac{x^{3}}{\left(1+x^{2}\right)^{3/2}}$ 型、$\frac{x^{2}}{1+x^{2}}$ 型）に落ちる。`,
          blocks: [
            { k: "p", t: String.raw`$t=\dfrac{x}{\sqrt{1+x^{2}}}$ とおく。商の微分で` },
            {
              k: "math",
              t: String.raw`t'=\frac{\sqrt{1+x^{2}}-x\cdot\frac{x}{\sqrt{1+x^{2}}}}{1+x^{2}}=\frac{1}{\left(1+x^{2}\right)^{\frac32}}`,
            },
            { k: "p", t: String.raw`となるので、被積分関数は $\left(x^{2}+t\right)\left(1+xt'\right)$ である。展開して` },
            { k: "math", t: String.raw`\left(x^{2}+t\right)\left(1+xt'\right)=x^{2}+t+x^{3}t'+xtt'` },
            { k: "p", t: String.raw`の4つを順に積分する。` },
            { k: "math", t: String.raw`\int_0^{1}x^{2}dx=\frac13` },
            { k: "p", t: String.raw`であり、` },
            {
              k: "math",
              t: String.raw`\int_0^{1}t\,dx=\int_0^{1}\frac{x}{\sqrt{1+x^{2}}}dx=\left[\sqrt{1+x^{2}}\right]_0^{1}=\sqrt2-1`,
            },
            { k: "p", t: String.raw`である。3つめは $s=1+x^{2}$（$ds=2x\,dx$）と置換して` },
            {
              k: "math",
              t: String.raw`\int_0^{1}\frac{x^{3}}{\left(1+x^{2}\right)^{\frac32}}dx=\frac12\int_1^{2}\frac{s-1}{s^{\frac32}}ds=\left[\sqrt s+\frac{1}{\sqrt s}\right]_1^{2}=\frac{3\sqrt2}{2}-2`,
            },
            {
              k: "p",
              t: String.raw`となる（$\sqrt2+\dfrac{1}{\sqrt2}=\dfrac{3}{\sqrt2}=\dfrac{3\sqrt2}{2}$）。4つめは $tt'=\left(\dfrac{t^{2}}{2}\right)'$ を使って部分積分する。$t^{2}=\dfrac{x^{2}}{1+x^{2}}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\int_0^{1}x\left(\frac{t^{2}}{2}\right)'dx=\left[\frac{xt^{2}}{2}\right]_0^{1}-\frac12\int_0^{1}t^{2}dx=\frac14-\frac12\int_0^{1}\frac{x^{2}}{1+x^{2}}dx`,
            },
            { k: "p", t: String.raw`である。$\dfrac{x^{2}}{1+x^{2}}=1-\dfrac{1}{1+x^{2}}$ と直すと、$x=\tan\theta$ の置換で` },
            {
              k: "math",
              t: String.raw`\int_0^{1}\frac{x^{2}}{1+x^{2}}dx=1-\int_0^{1}\frac{dx}{1+x^{2}}=1-\frac\pi4`,
            },
            { k: "p", t: String.raw`なので、4つめは $\dfrac14-\dfrac12\left(1-\dfrac\pi4\right)=-\dfrac14+\dfrac\pi8$ である。以上を足すと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
&\frac13+\left(\sqrt2-1\right)+\left(\frac{3\sqrt2}{2}-2\right)+\left(-\frac14+\frac\pi8\right)\\[1mm]
&=\left(\frac13-1-2-\frac14\right)+\left(1+\frac32\right)\sqrt2+\frac\pi8=-\frac{35}{12}+\frac{5\sqrt2}{2}+\frac\pi8
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{x}{\left(1+x^{2}\right)\sqrt{1+x^{2}}}=\dfrac{x}{\left(1+x^{2}\right)^{\frac32}}$ と書き直すところから始める。$\left(\dfrac{x}{\sqrt{1+x^{2}}}\right)'=\dfrac{1}{\left(1+x^{2}\right)^{\frac32}}$ に気づけば、2つめの括弧の正体が見える。`,
            String.raw`展開して4つに分けると、どれも定石どおりの積分になる。まとめたまま原始関数を探そうとすると行き詰まる。`,
          ],
          check: String.raw`$\dfrac{5\sqrt2}{2}=3.53553$、$\dfrac\pi8=0.39270$、$\dfrac{35}{12}=2.91667$ で、合わせて $1.01157$。被積分関数をそのままシンプソン法で $0$ から $1$ まで数値積分すると $1.0115663210$ となり、小数10桁まで一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式・微分法",
      topics: ["三角形の面積", "条件つきの最大最小", "3次関数の増減", "定義域の確認"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$q$ を $40$ 万等分して $p,r$ を条件から決め、2つの三角形の面積がどちらも $\\frac13$ になることを毎回確かめたうえで $\\frac{\\mathrm{DR}}{\\mathrm{AQ}}$ を全探索し、最大 $0.790123457$（$q=0.75$）、最小 $0.666666667$（$q=1$）を得て $\\frac{64}{81}$、$\\frac23$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac{\mathrm{DR}}{\mathrm{AQ}}$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{64}{81}$、最小値 $\dfrac23$`,
          approach: String.raw`$\mathrm{A}$ を原点にとって座標を入れると、$\mathrm{P},\mathrm{Q},\mathrm{R}$ は1つずつの変数で書ける。2つの面積条件から変数が1つに減り、$\dfrac{\mathrm{DR}}{\mathrm{AQ}}$ は1変数の式になる。$\dfrac1{\mathrm{AQ}}$ を変数にとると3次式になって扱いやすい。定義域（各点が辺の上にあること）を落とさないことが要点。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}(0,0)$、$\mathrm{B}(1,0)$、$\mathrm{C}(1,1)$、$\mathrm{D}(0,1)$ とおく。$\mathrm{P}(p,0)$、$\mathrm{Q}(0,q)$、$\mathrm{R}(r,1)$（$0\le p,q,r\le1$）と書くと $\mathrm{AQ}=q$、$\mathrm{DR}=r$ である。`,
            },
            { k: "p", t: String.raw`**2つの面積条件。** $\triangle\mathrm{APQ}=\dfrac12pq=\dfrac13$ より` },
            { k: "math", t: String.raw`pq=\frac23` },
            { k: "p", t: String.raw`である。$\triangle\mathrm{PQR}$ は $\overrightarrow{\mathrm{PQ}}=(-p,q)$、$\overrightarrow{\mathrm{PR}}=(r-p,1)$ から` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{PQR}=\frac12\left|(-p)\cdot1-q(r-p)\right|=\frac12\left|p+qr-pq\right|`,
            },
            {
              k: "p",
              t: String.raw`となる。$q\le1$ より $p\ge pq=\dfrac23$ で、$p+qr-pq\ge qr\ge0$ だから絶対値は外れる。$pq=\dfrac23$ とあわせて $\dfrac12\left(p+qr-\dfrac23\right)=\dfrac13$、すなわち`,
            },
            { k: "math", t: String.raw`p+qr=\frac43` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**1変数にする。** $p=\dfrac{2}{3q}$ を代入して` },
            { k: "math", t: String.raw`qr=\frac43-\frac{2}{3q},\qquad r=\frac{4}{3q}-\frac{2}{3q^{2}}` },
            { k: "p", t: String.raw`となる。$u=\dfrac1q$ とおくと` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{DR}}{\mathrm{AQ}}=\frac rq=\frac{4}{3q^{2}}-\frac{2}{3q^{3}}=\frac43u^{2}-\frac23u^{3}=\frac23u^{2}(2-u)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$u$ の範囲。** $0\le p\le1$ から $\dfrac{2}{3q}\le1$、すなわち $q\ge\dfrac23$。$q\le1$ とあわせて $\dfrac23\le q\le1$、つまり $1\le u\le\dfrac32$ である。このとき $r=\dfrac23u(2-u)$ は $u=1$ で $\dfrac23$、$u=\dfrac32$ で $\dfrac12$ となり、間でも $\dfrac12\le r\le\dfrac23$ なので $0\le r\le1$ は自動的にみたされる。`,
            },
            { k: "p", t: String.raw`**増減。** $g(u)=\dfrac43u^{2}-\dfrac23u^{3}$ とおくと` },
            { k: "math", t: String.raw`g'(u)=\frac83u-2u^{2}=2u\left(\frac43-u\right)` },
            {
              k: "p",
              t: String.raw`で、$1\le u\le\dfrac32$ では $u>0$ だから符号は $\dfrac43-u$ で決まり、$u<\dfrac43$ で正、$u>\dfrac43$ で負である。よって $g$ は $u=\dfrac43$ で最大になり`,
            },
            {
              k: "math",
              t: String.raw`g\!\left(\frac43\right)=\frac23\cdot\frac{16}{9}\cdot\left(2-\frac43\right)=\frac23\cdot\frac{16}{9}\cdot\frac23=\frac{64}{81}`,
            },
            { k: "p", t: String.raw`である。両端は` },
            {
              k: "math",
              t: String.raw`g(1)=\frac23,\qquad g\!\left(\frac32\right)=\frac23\cdot\frac94\cdot\frac12=\frac34`,
            },
            {
              k: "p",
              t: String.raw`で、小さいほうは $g(1)=\dfrac23$ である。したがって最大値 $\dfrac{64}{81}$（$q=\dfrac34$ のとき）、最小値 $\dfrac23$（$q=1$ のとき）となる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`最大になるとき（$\mathrm{AQ}=\frac34$）の配置。$\mathrm{P}\left(\frac89,0\right)$、$\mathrm{Q}\left(0,\frac34\right)$、$\mathrm{R}\left(\frac{16}{27},1\right)$ で、$\triangle\mathrm{APQ}$ と $\triangle\mathrm{PQR}$ の面積はどちらも $\frac13$。`,
                view: [-0.35, 1.45, -0.3, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [8 / 9, 0], [0, 0.75]] },
                  { k: "fill", pts: [[8 / 9, 0], [0, 0.75], [16 / 27, 1]] },
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, 1] },
                  { k: "seg", a: [1, 1], b: [0, 1] },
                  { k: "seg", a: [0, 1], b: [0, 0] },
                  { k: "seg", a: [8 / 9, 0], b: [0, 0.75] },
                  { k: "seg", a: [8 / 9, 0], b: [16 / 27, 1] },
                  { k: "seg", a: [0, 0.75], b: [16 / 27, 1] },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "B", place: "below-right" },
                  { k: "dot", at: [1, 1], label: "C", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "D", place: "above-left" },
                  { k: "dot", at: [8 / 9, 0], label: "P", place: "below" },
                  { k: "dot", at: [0, 0.75], label: "Q", place: "left" },
                  { k: "dot", at: [16 / 27, 1], label: "R", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\triangle\mathrm{PQR}$ の絶対値を外すとき、$p\ge pq=\dfrac23$ から中身が正であることを確かめておく。符号を決めずに外すと式が変わる。`,
            String.raw`$u=\dfrac1q$ の範囲は $1\le u\le\dfrac32$ である。$g$ の極大を与える $u=\dfrac43$ がこの範囲に入っていることが効いている。`,
            String.raw`$r$ が $0$ から $1$ の中にあることも確かめる。この問題では自動的にみたされるが、確かめずに進むと定義域を見落としたことになる。`,
          ],
          check: String.raw`$q=\dfrac34$ のとき $p=\dfrac{2}{3\cdot\frac34}=\dfrac89$、$r=\dfrac{16}{27}$ で、$\triangle\mathrm{APQ}=\dfrac12\cdot\dfrac89\cdot\dfrac34=\dfrac13$、$\triangle\mathrm{PQR}=\dfrac12\left(\dfrac89+\dfrac34\cdot\dfrac{16}{27}-\dfrac23\right)=\dfrac12\cdot\dfrac23=\dfrac13$ となる。$\dfrac{r}{q}=\dfrac{16/27}{3/4}=\dfrac{64}{81}$ である。$q$ を $40$ 万等分した全探索でも、最大 $0.7901235$、最小 $0.6666667$ が得られた。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間図形",
      topics: ["平面の方程式", "立体の切り口", "錐の断面", "領域の面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "八面体を「上の角錐 $\\left|x-\\frac{pz}{2}\\right|+|y|\\le2-z$」と「下の角錐 $|x|+|y|\\le2+z$」として実装し、各面の $x-z-1$ の符号から切られる面の数を数えて、$p>3$ でちょうど $8$、$p\\le3$ で $6$ になることを確かめた",
          "(3) の面積を $(y,z)$ 平面の $3000\\times3000$ の格子で数え、$p=3.2,\\,3.5,\\,3.9$ で $1.14583,\\,1.23824,\\,1.25509$ を得て $\\frac{7p-18}{p(p-2)}=1.14583,\\,1.23810,\\,1.25506$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`八面体 $\mathrm{PABCDE}$ の平面 $y=0$ による切り口と、平面 $\alpha$ の平面 $y=0$ による切り口を図示する`,
          answer: String.raw`八面体の切り口は4点 $\mathrm{P}(p,2)$、$\mathrm{A}(2,0)$、$\mathrm{E}(0,-2)$、$\mathrm{C}(-2,0)$ を頂点とする四角形（$xz$ 平面で見たもの）、$\alpha$ の切り口は直線 $z=x-1$`,
          approach: String.raw`$\alpha$ は $\mathrm{M},\mathrm{N}$ を通り $\mathrm{AE}$ に平行なので、法線は $\overrightarrow{\mathrm{MN}}$ と $\overrightarrow{\mathrm{AE}}$ の両方に垂直なベクトルとして求まる。八面体のほうは、正方形 $\mathrm{ABCD}$ を底面として $\mathrm{P}$ を頂点とする角錐と $\mathrm{E}$ を頂点とする角錐の和だから、$y=0$ で切ると $\mathrm{AC}$ を共通の底辺とする2つの三角形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{M}$ は $\mathrm{AB}$ の中点で $(1,1,0)$、$\mathrm{N}$ は $\mathrm{AD}$ の中点で $(1,-1,0)$ である。$\overrightarrow{\mathrm{MN}}=(0,-2,0)$、$\overrightarrow{\mathrm{AE}}=(-2,0,-2)$ だから、両方に垂直なベクトルとして $(1,0,-1)$ がとれる。$\mathrm{M}(1,1,0)$ を通るので`,
            },
            { k: "math", t: String.raw`\alpha:\quad (x-1)-z=0,\qquad\text{すなわち}\qquad x-z=1` },
            { k: "p", t: String.raw`である。$\mathrm{N}$ も $1-0=1$ をみたす。$y=0$ で切ると直線 $z=x-1$ になる。` },
            {
              k: "p",
              t: String.raw`八面体 $\mathrm{PABCDE}$ は、正方形 $\mathrm{ABCD}$（$z=0$ 上の $|x|+|y|\le2$）を底面として、$\mathrm{P}$ を頂点とする角錐と $\mathrm{E}$ を頂点とする角錐を貼り合わせたものである。$y=0$ で切ると、底面の切り口は線分 $\mathrm{AC}$（$-2\le x\le2$、$z=0$）で、$\mathrm{P}$ も $\mathrm{E}$ も $y=0$ 上にあるから、切り口は三角形 $\mathrm{PAC}$ と三角形 $\mathrm{EAC}$ を合わせた四角形になる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$p=3.5$ のときの平面 $y=0$ による切り口。四角形が八面体の切り口（横軸 $x$、縦軸 $z$）、斜めの直線が平面 $\alpha$ の切り口 $z=x-1$。$\alpha$ は辺 $\mathrm{AE}$ と平行なので、この直線も $\mathrm{AE}$ と平行になる。`,
                view: [-3.3, 4.6, -3.1, 3.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[P3, 2], [2, 0], [0, -2], [-2, 0]] },
                  { k: "seg", a: [P3, 2], b: [2, 0] },
                  { k: "seg", a: [2, 0], b: [0, -2] },
                  { k: "seg", a: [0, -2], b: [-2, 0] },
                  { k: "seg", a: [-2, 0], b: [P3, 2] },
                  { k: "seg", a: [-2.2, -3.2], b: [4.4, 3.4], dash: true },
                  { k: "dot", at: [P3, 2], label: "P", place: "above-right" },
                  { k: "dot", at: [2, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [0, -2], label: "E", place: "below" },
                  { k: "dot", at: [-2, 0], label: "C", place: "left" },
                  { k: "text", at: [3.6, 2.6], label: "z = x − 1", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ は $z$ 軸の上にはない（$x$ 座標が $p>2$）。四角形が左右対称にならないので、図は $\mathrm{P}$ を右に寄せて描く。`,
          ],
          check: String.raw`$\alpha$ の法線 $(1,0,-1)$ は $\overrightarrow{\mathrm{AE}}=(-2,0,-2)$ との内積が $-2+2=0$ で、たしかに $\mathrm{AE}$ と平行である。$\mathrm{M}(1,1,0)$、$\mathrm{N}(1,-1,0)$ はどちらも $x-z=1$ をみたす。`,
        },
        {
          label: "(2)",
          task: String.raw`八面体の平面 $\alpha$ による切り口が八角形となる $p$ の範囲を求める`,
          answer: String.raw`$3<p<4$`,
          approach: String.raw`切り口が八角形になるのは、8つの面がすべて切られるときである。面が切られるかどうかは、その3頂点が $\alpha$ の両側に分かれるかどうかで決まる。各頂点で $x-z-1$ の符号を調べれば、$\mathrm{P}$ だけが $p$ によって符号を変えることが分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2<p<4$ では八面体は凸である（頂点 $\mathrm{P}$ を含む4面について $\mathrm{E}$ が内側、$\mathrm{E}$ を含む4面について $\mathrm{P}$ が内側にあることが、それぞれの面の方程式に代入して確かめられる）。凸な立体を平面で切ると、切られた面1つにつき切り口の辺が1本できるので、八角形になることと8面すべてが切られることは同じである。`,
            },
            { k: "p", t: String.raw`$g(x,y,z)=x-z-1$ とおくと、$\alpha$ は $g=0$ である。6頂点での値は` },
            {
              k: "math",
              t: String.raw`g(\mathrm{A})=1,\quad g(\mathrm{B})=-1,\quad g(\mathrm{C})=-3,\quad g(\mathrm{D})=-1,\quad g(\mathrm{E})=1,\quad g(\mathrm{P})=p-3`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{A}$ と $\mathrm{E}$ は正、$\mathrm{B},\mathrm{C},\mathrm{D}$ は負で、$\mathrm{P}$ の符号だけが $p$ で変わる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$p>3$ のとき：正の頂点は $\mathrm{A},\mathrm{E},\mathrm{P}$、負は $\mathrm{B},\mathrm{C},\mathrm{D}$。8面 $\mathrm{PAB},\mathrm{PBC},\mathrm{PCD},\mathrm{PDA},\mathrm{EAB},\mathrm{EBC},\mathrm{ECD},\mathrm{EDA}$ はどれも正と負の頂点をもつので、すべて切られる。`,
                String.raw`$p<3$ のとき：正は $\mathrm{A},\mathrm{E}$ だけ。面 $\mathrm{PBC}$ と $\mathrm{PCD}$ は3頂点とも負なので切られず、切り口は六角形にしかならない。`,
                String.raw`$p=3$ のとき：$\mathrm{P}$ が $\alpha$ 上にあり、$\mathrm{PBC}$、$\mathrm{PCD}$ との交わりは点 $\mathrm{P}$ だけになる。切り口は $\mathrm{P}$ を頂点とする六角形で、八角形ではない。`,
              ],
            },
            { k: "p", t: String.raw`よって求める範囲は $3<p<4$ である。` },
          ],
          pitfalls: [
            String.raw`「切り口の辺の本数＝切られる面の数」が使えるのは立体が凸なときである。$2<p<4$ で凸であることを確かめておく（$p\ge4$ では $\mathrm{P}$ が面 $\mathrm{EAB}$ の外側に出てしまう）。`,
          ],
          check: String.raw`八面体を「上の角錐 $\left|x-\dfrac{pz}{2}\right|+|y|\le2-z$」と「下の角錐 $|x|+|y|\le2+z$」として実装し、8面それぞれで $x-z-1$ の符号を調べると、$p=2.2,\,2.5,\,2.9,\,3.0$ では切られる面が $6$、$p=3.001,\,3.2,\,3.6,\,3.9$ では $8$ になる。境目が $p=3$ であることと合う。`,
        },
        {
          label: "(3)",
          task: String.raw`切り口のうち $y\ge0$、$z\ge0$ の部分を点 $(x,y,z)$ が動くとき、点 $(y,z)$ が動く範囲の面積を求める`,
          answer: String.raw`$\dfrac{7p-18}{p(p-2)}$`,
          approach: String.raw`$\alpha$ の上では $x=z+1$ なので、$(y,z)$ を決めれば点が1つに決まる。つまり $(y,z)$ 平面に写す対応は1対1で、面積はそのまま $(y,z)$ の条件から出る。$z\ge0$ の部分は上の角錐だけなので、角錐を不等式で書き下して $x=z+1$ を代入すればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**上の角錐を不等式で書く。** 頂点 $\mathrm{P}(p,0,2)$ と底面の正方形 $|x|+|y|\le2$（$z=0$）を結ぶ角錐の点は、底面の点 $(s,w,0)$ と $\mathrm{P}$ を $t:(1-t)$ に内分して`,
            },
            {
              k: "math",
              t: String.raw`(x,y,z)=\left((1-t)s+tp,\ (1-t)w,\ 2t\right)\qquad(0\le t\le1)`,
            },
            { k: "p", t: String.raw`と書ける。$t=\dfrac z2$ で、$s=\dfrac{x-tp}{1-t}$、$w=\dfrac{y}{1-t}$ だから、$|s|+|w|\le2$ は` },
            {
              k: "math",
              t: String.raw`\left|x-\frac{pz}{2}\right|+|y|\le2-z\qquad(0\le z\le2)`,
            },
            {
              k: "p",
              t: String.raw`となる。$z\ge0$ の部分では下の角錐（$-2\le z\le0$）は面積に効かないので、これだけを考えればよい。`,
            },
            { k: "p", t: String.raw`**$\alpha$ を代入する。** $x=z+1$ を入れ、$k=\dfrac p2-1$ とおくと` },
            {
              k: "math",
              t: String.raw`x-\frac{pz}{2}=z+1-\frac{pz}{2}=1-kz`,
            },
            { k: "p", t: String.raw`なので、求める範囲は $(y,z)$ 平面上で` },
            { k: "math", t: String.raw`\left|1-kz\right|+y\le2-z,\qquad y\ge0,\quad z\ge0` },
            {
              k: "p",
              t: String.raw`である。$3<p<4$ より $\dfrac12<k<1$ である。$G(z)=2-z-\left|1-kz\right|$ とおくと、面積は $\displaystyle\int G(z)\,dz$（$G>0$ の範囲）になる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\le z\le\dfrac1k$：$G(z)=2-z-(1-kz)=1+(k-1)z$。$k<1$ なので減少し、$z=\dfrac1k$ での値は $\dfrac{2k-1}{k}>0$。`,
                String.raw`$\dfrac1k\le z$：$G(z)=2-z-(kz-1)=3-(1+k)z$。$z=\dfrac{3}{1+k}$ で $0$ になる。$\dfrac12<k$ より $\dfrac1k<\dfrac{3}{1+k}$。`,
              ],
            },
            { k: "p", t: String.raw`よって面積は` },
            {
              k: "math",
              t: String.raw`\int_0^{\frac1k}\left\{1+(k-1)z\right\}dz+\int_{\frac1k}^{\frac{3}{1+k}}\left\{3-(1+k)z\right\}dz`,
            },
            { k: "p", t: String.raw`である。前半は` },
            {
              k: "math",
              t: String.raw`\left[z+\frac{(k-1)z^{2}}{2}\right]_0^{\frac1k}=\frac1k+\frac{k-1}{2k^{2}}=\frac{3k-1}{2k^{2}}`,
            },
            {
              k: "p",
              t: String.raw`で、後半は高さ $\dfrac{2k-1}{k}$、底辺 $\dfrac{3}{1+k}-\dfrac1k=\dfrac{2k-1}{k(1+k)}$ の三角形だから`,
            },
            {
              k: "math",
              t: String.raw`\frac12\cdot\frac{2k-1}{k(1+k)}\cdot\frac{2k-1}{k}=\frac{(2k-1)^{2}}{2k^{2}(1+k)}`,
            },
            { k: "p", t: String.raw`である。足すと` },
            {
              k: "math",
              t: String.raw`\frac{(3k-1)(1+k)+(2k-1)^{2}}{2k^{2}(1+k)}=\frac{\left(3k^{2}+2k-1\right)+\left(4k^{2}-4k+1\right)}{2k^{2}(1+k)}=\frac{7k^{2}-2k}{2k^{2}(1+k)}=\frac{7k-2}{2k(1+k)}`,
            },
            { k: "p", t: String.raw`となる。$k=\dfrac{p-2}{2}$ を戻すと` },
            {
              k: "math",
              t: String.raw`7k-2=\frac{7p-18}{2},\qquad 2k(1+k)=(p-2)\cdot\frac p2=\frac{p(p-2)}{2}`,
            },
            { k: "p", t: String.raw`なので、求める面積は` },
            { k: "math", t: String.raw`\frac{7p-18}{p(p-2)}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\alpha$ の上では $x$ が $z$ で決まるので、$(y,z)$ への写像は面積を変えない1対1の対応である。射影で面積が縮むのでは、と悩む必要はない（ただし「$(y,z)$ の動く範囲」を問われているので、そもそも $\alpha$ 上の面積ではない）。`,
            String.raw`$z\ge0$ の条件から上の角錐だけを考えればよい。下の角錐は $z\le0$ なので、$(y,z)$ 平面では面積に寄与しない。`,
            String.raw`$\left|1-kz\right|$ の場合分けの境目 $z=\dfrac1k$ が、$G$ が $0$ になる $z=\dfrac{3}{1+k}$ より左にあることを確かめる。$k>\dfrac12$、つまり $p>3$ が効いている。`,
          ],
          check: String.raw`$p=4$ の極限では $k=1$ で $\dfrac{7-2}{2\cdot1\cdot2}=\dfrac54$、$p=3$ では $k=\dfrac12$ で $\dfrac{3.5-2}{2\cdot\frac12\cdot\frac32}=1$ となる。$(y,z)$ 平面を $3000\times3000$ の格子で数えると $p=3.2$ で $1.14583$、$p=3.5$ で $1.23824$、$p=3.9$ で $1.25509$ となり、式の値 $1.14583$、$1.23810$、$1.25506$ と一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数",
      topics: ["ユークリッドの互除法", "平方数", "4で割った余り", "背理法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\le n\\le8$ で最大公約数を直接計算し、$n$ が奇数のとき $2$、偶数のとき $1$ になることを確かめた",
          "$1\\le n\\le200000$ について $\\left(n^{2}+1\\right)\\left(5n^{2}+9\\right)$ が平方数にならないことを多倍長整数で確かめた",
          "$n$ が奇数のとき $\\frac{5n^{2}+9}{2}$ を $4$ で割った余りがつねに $3$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n^{2}+1$ と $5n^{2}+9$ の最大公約数 $d_n$ を求める`,
          answer: String.raw`$n$ が偶数のとき $d_n=1$、$n$ が奇数のとき $d_n=2$`,
          approach: String.raw`互除法の要領で、$5\left(n^{2}+1\right)$ を引いて差を小さくする。残るのは定数 $4$ なので、$d_n$ は $4$ の約数に限られる。あとは $n^{2}+1$ が $2$ や $4$ で割り切れるかを $n$ の偶奇で見る。`,
          blocks: [
            { k: "p", t: String.raw`$\left(5n^{2}+9\right)-5\left(n^{2}+1\right)=4$ である。$d_n$ は $n^{2}+1$ と $5n^{2}+9$ の公約数だから、この差 $4$ の約数でもある。よって $d_n$ は $1,2,4$ のいずれかである。` },
            {
              k: "steps",
              items: [
                String.raw`$n$ が偶数のとき：$n^{2}+1$ は奇数なので、$d_n$ は奇数。よって $d_n=1$。`,
                String.raw`$n$ が奇数のとき：$n^{2}$ を $8$ で割った余りは $1$ なので $n^{2}+1$ を $4$ で割った余りは $2$。したがって $n^{2}+1$ は $2$ で割り切れるが $4$ では割り切れない。$5n^{2}+9$ も $5+9=14$ より偶数なので、$d_n=2$。`,
              ],
            },
            { k: "p", t: String.raw`以上より、$d_n$ は $n$ が偶数のとき $1$、奇数のとき $2$ である。` },
          ],
          check: String.raw`$n=1$：$2$ と $14$ の最大公約数は $2$。$n=2$：$5$ と $29$ で $1$。$n=3$：$10$ と $54$ で $2$。$n=4$：$17$ と $89$ で $1$。たしかに偶奇で分かれる。`,
        },
        {
          label: "(2)",
          task: String.raw`$\left(n^{2}+1\right)\left(5n^{2}+9\right)$ が整数の2乗にならないことを示す`,
          answer: String.raw`$n$ が偶数なら $n^{2}+1$ が平方数でないことから、奇数なら $\dfrac{5n^{2}+9}{2}$ を $4$ で割った余りが $3$ であることから従う`,
          approach: String.raw`互いに素な2数の積が平方数なら、それぞれが平方数になる。(1) で最大公約数が分かっているので、偶数のときはそのまま使える。奇数のときは共通因数 $2$ をくくり出してから同じ理屈を使い、残った因子が $4$ で割って $3$ 余ることを示す。平方数を $4$ で割った余りは $0$ か $1$ しかない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$n$ が偶数のとき。** (1) より $n^{2}+1$ と $5n^{2}+9$ は互いに素である。互いに素な正の整数の積が平方数なら、それぞれが平方数でなければならない。ところが $n\ge1$ のとき`,
            },
            { k: "math", t: String.raw`n^{2}<n^{2}+1<(n+1)^{2}` },
            {
              k: "p",
              t: String.raw`なので $n^{2}+1$ は連続する2つの平方数の間にあり、平方数ではない。よって積も平方数ではない。`,
            },
            {
              k: "p",
              t: String.raw`**$n$ が奇数のとき。** $A=\dfrac{n^{2}+1}{2}$、$B=\dfrac{5n^{2}+9}{2}$ とおく。(1) の議論から $n^{2}+1$ も $5n^{2}+9$ も $2$ で割り切れるので $A,B$ は整数で、最大公約数が $2$ だったから $A$ と $B$ は互いに素である。積は`,
            },
            { k: "math", t: String.raw`\left(n^{2}+1\right)\left(5n^{2}+9\right)=4AB` },
            {
              k: "p",
              t: String.raw`なので、これが平方数であることと $AB$ が平方数であることは同じである。$A,B$ は互いに素だから、$AB$ が平方数なら $B$ も平方数になる。`,
            },
            {
              k: "p",
              t: String.raw`ところが $n$ は奇数なので $n^{2}$ を $8$ で割った余りは $1$ で、$5n^{2}+9$ を $8$ で割った余りは $5+9=14$ すなわち $6$ である。したがって`,
            },
            { k: "math", t: String.raw`B=\frac{5n^{2}+9}{2}\ \text{を}\ 4\ \text{で割った余りは}\ 3` },
            {
              k: "p",
              t: String.raw`である。整数の2乗を $4$ で割った余りは $0$ か $1$ しかないので、$B$ は平方数ではない。よって $AB$ も平方数でなく、もとの積も平方数ではない。`,
            },
            { k: "p", t: String.raw`以上より、どの $n$ についても $\left(n^{2}+1\right)\left(5n^{2}+9\right)$ は整数の2乗にならない。` },
          ],
          pitfalls: [
            String.raw`$n$ が奇数のとき、$A=\dfrac{n^{2}+1}{2}$ のほうは平方数になりうる（$n=1$ で $A=1$、$n=7$ で $A=25$）。$A$ で矛盾を出そうとすると行き詰まるので、$B$ を見る。`,
            String.raw`「互いに素な2数の積が平方数ならそれぞれ平方数」は、素因数分解を考えれば分かる。共通の素因数がないので、各素数の指数が片方に固まり、それが偶数でなければならない。`,
          ],
          check: String.raw`$n=1$ なら $2\cdot14=28$ で、$5^{2}=25<28<36=6^{2}$。$n=7$ なら $50\cdot254=12700$ で、$112^{2}=12544<12700<12769=113^{2}$。$1\le n\le200000$ を多倍長整数で全部調べても、平方数になるものは1つもなかった。`,
        },
      ],
    },
    {
      no: 5,
      field: "極限・微分法",
      topics: ["中間値の定理", "単調性", "数列の極限", "微分係数の定義"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a_n$ を二分法で求め、$n=1,2,5,20,100,2000$ のすべてで $a_n^{\\,n}$ と $\\sqrt{a_n\\cos a_n}$ が小数10桁まで一致することを確かめた",
          "$a_n$ が $1$ に近づき、$a_n^{\\,n}$ が $\\sqrt{\\cos1}=0.7350525871$ に近づくことを確かめた",
          "$\\frac{a_n^{\\,n}-b}{a_n-1}$ を $n=1000,5000,20000$ で計算して $-0.20462,\\,-0.20481,\\,-0.20485$ を得て、$\\frac{\\cos1-\\sin1}{2\\sqrt{\\cos1}}=-0.204861995$（$\\sqrt{x\\cos x}$ の $x=1$ での数値微分とも一致）に近づくことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x^{2n-1}=\cos x$ がただ1つの実数解 $a_n$ をもつことを示す`,
          answer: String.raw`解は $0<x<1$ にあり、そこで $x^{2n-1}-\cos x$ は狭義増加`,
          approach: String.raw`まず解の居場所を絞る。$|x|>1$ では左辺の絶対値が $1$ を超えるので右辺と釣り合わない。$-1\le x\le1$ では $\cos x>0$ なので左辺も正、つまり $x>0$ である。残った $0<x\le1$ では、差の導関数が明らかに正になる。`,
          blocks: [
            { k: "p", t: String.raw`$h(x)=x^{2n-1}-\cos x$ とおく。` },
            {
              k: "steps",
              items: [
                String.raw`$x>1$ のとき：$x^{2n-1}>1\ge\cos x$ なので $h(x)>0$、解はない。`,
                String.raw`$x<-1$ のとき：$x^{2n-1}<-1\le\cos x$ なので $h(x)<0$、解はない。`,
                String.raw`$-1\le x\le0$ のとき：$|x|\le1<\dfrac\pi2$ より $\cos x>0$、いっぽう $x^{2n-1}\le0$ なので $h(x)<0$、解はない。`,
              ],
            },
            { k: "p", t: String.raw`よって解は $0<x\le1$ にしかない。この範囲で` },
            { k: "math", t: String.raw`h'(x)=(2n-1)x^{2n-2}+\sin x>0` },
            {
              k: "p",
              t: String.raw`である（$x>0$ かつ $x\le1<\pi$ なので $\sin x>0$）。したがって $h$ は $0\le x\le1$ で狭義増加である。$h(0)=-1<0$、$h(1)=1-\cos1>0$ なので、中間値の定理と狭義増加性から、$h(x)=0$ をみたす $x$ は $0<x<1$ にただ1つである。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=x^{2n-1}$（$n=1,2,5$）と $y=\cos x$。交点は $0<x<1$ にそれぞれ1つで、$n$ が大きいほど右へ寄っていく。`,
                view: [-0.15, 1.45, -0.2, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: (x: number) => x, from: 0, to: 1.25 },
                  { k: "curve", f: (x: number) => x ** 3, from: 0, to: 1.25 },
                  { k: "curve", f: (x: number) => x ** 9, from: 0, to: 1.25 },
                  { k: "curve", f: (x: number) => Math.cos(x), from: 0, to: 1.4, dash: true },
                  { k: "dot", at: [0.7390851332, Math.cos(0.7390851332)], label: "n = 1", place: "left" },
                  { k: "dot", at: [0.9426418819, Math.cos(0.9426418819)], label: "n = 5", place: "below-right" },
                  { k: "text", at: [1.3, Math.cos(1.3)], label: "y = cos x", place: "right" },
                ],
              },
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\cos a_n>\cos1$ を示す`,
          answer: String.raw`$0<a_n<1$ と $\cos$ の単調減少から直ちに従う`,
          approach: String.raw`(1) の議論で $a_n$ が $0$ と $1$ のあいだにあることがすでに出ている。$\cos$ は $0\le x\le\pi$ で減少するので、それだけで終わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $h$ は狭義増加で $h(1)=1-\cos1>0$、$h(a_n)=0$ だから $a_n<1$ である。また $a_n>0$ であった。`,
            },
            {
              k: "p",
              t: String.raw`$\cos x$ は $0\le x\le\pi$ で狭義減少なので、$0<a_n<1<\pi$ から $\cos a_n>\cos1$ が従う。`,
            },
          ],
        },
        {
          label: "(3)",
          task: String.raw`$a=\displaystyle\lim_{n\to\infty}a_n$、$b=\displaystyle\lim_{n\to\infty}a_n^{\,n}$、$c=\displaystyle\lim_{n\to\infty}\frac{a_n^{\,n}-b}{a_n-a}$ を求める`,
          answer: String.raw`$a=1$、$b=\sqrt{\cos1}$、$c=\dfrac{\cos1-\sin1}{2\sqrt{\cos1}}$`,
          approach: String.raw`$a_n^{2n-1}=\cos a_n$ の両辺に $a_n$ を掛けると $a_n^{2n}=a_n\cos a_n$、つまり $a_n^{\,n}=\sqrt{a_n\cos a_n}$ となる。これで $b$ も $c$ も、$x$ の関数 $\sqrt{x\cos x}$ を $x=1$ の近くで見るだけの話になる。$c$ はそのまま微分係数の定義の形である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$a=1$。** (2) より $a_n^{2n-1}=\cos a_n>\cos1>0$ で、$0<a_n<1$ だから`,
            },
            { k: "math", t: String.raw`\left(\cos1\right)^{\frac{1}{2n-1}}<a_n<1` },
            {
              k: "p",
              t: String.raw`である。$0<\cos1<1$ なので $\left(\cos1\right)^{\frac{1}{2n-1}}\to1$（$n\to\infty$）であり、はさみうちの原理から $a_n\to1$、すなわち $a=1$ である。`,
            },
            { k: "p", t: String.raw`**$a_n^{\,n}$ を書き直す。** $a_n^{2n-1}=\cos a_n$ の両辺に $a_n$ を掛けて` },
            { k: "math", t: String.raw`a_n^{2n}=a_n\cos a_n,\qquad\text{すなわち}\qquad a_n^{\,n}=\sqrt{a_n\cos a_n}` },
            {
              k: "p",
              t: String.raw`となる（$a_n>0$、$\cos a_n>0$ なので両辺とも正で、2乗の関係からこう書ける）。`,
            },
            { k: "p", t: String.raw`**$b$。** $a_n\to1$ と連続性から` },
            { k: "math", t: String.raw`b=\lim_{n\to\infty}\sqrt{a_n\cos a_n}=\sqrt{1\cdot\cos1}=\sqrt{\cos1}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$c$。** $g(x)=\sqrt{x\cos x}$ とおくと $b=g(1)$、$a_n^{\,n}=g(a_n)$、$a=1$ なので`,
            },
            { k: "math", t: String.raw`\frac{a_n^{\,n}-b}{a_n-a}=\frac{g(a_n)-g(1)}{a_n-1}` },
            {
              k: "p",
              t: String.raw`である。$a_n\to1$ かつ $a_n\ne1$ だから、これは $g$ の $x=1$ における微分係数に収束する。$g(x)=\sqrt{x\cos x}$ を微分すると`,
            },
            {
              k: "math",
              t: String.raw`g'(x)=\frac{\left(x\cos x\right)'}{2\sqrt{x\cos x}}=\frac{\cos x-x\sin x}{2\sqrt{x\cos x}}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`c=g'(1)=\frac{\cos1-\sin1}{2\sqrt{\cos1}}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a_n^{\,n}=\sqrt{a_n\cos a_n}$ に気づくかどうかがすべてである。指数が $2n-1$ なので、$a_n$ を1つ掛けて $2n$ にそろえる、という発想になる。`,
            String.raw`$c$ は微分係数の定義そのものだが、使うには $a_n\to1$（$a=1$）と $a_n\ne1$ の両方が要る。$a_n<1$ なのでどちらもみたされる。`,
          ],
          check: String.raw`$n=1$ では $a_1=0.7390851332$ で $a_1^{\,1}=\sqrt{a_1\cos a_1}=0.7390851332$、$n=100$ では $a_{100}=0.9969350$、$a_{100}^{100}=0.7356731=\sqrt{a_{100}\cos a_{100}}$ と、どの $n$ でも小数10桁まで一致する。$\sqrt{\cos1}=0.7350526$ へ近づき、$\dfrac{a_n^{\,n}-b}{a_n-1}$ は $n=20000$ で $-0.20485$ となって $\dfrac{\cos1-\sin1}{2\sqrt{\cos1}}=-0.2048620$ に近づく。`,
        },
      ],
    },
    {
      no: 6,
      field: "複素数・方程式",
      topics: ["解と係数の関係", "共役複素数", "4次方程式", "双曲線"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "条件をみたす根の組を2種類の形で $4000$ 通り作り、$e_1=2$、$e_2=0$、$\\alpha\\beta+\\gamma\\delta$ が純虚数（$0$ でない）になることを毎回確かめた",
          "同じ $4000$ 通りで $b=-a^{2}$ が成り立つこと、$\\alpha+\\beta$ が $(x-1)^{2}-y^{2}=1$ をみたすことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha,\beta,\gamma,\delta$ のうちちょうど2つが実数で、残りの2つが互いに共役であることを示す`,
          answer: String.raw`4つとも実数、または共役な2組、のどちらでも $\alpha\beta+\gamma\delta$ が実数になってしまう`,
          approach: String.raw`係数が実数の方程式なので、解の集合は共役をとる操作で閉じている。4つの解の実数・非実数の内訳は「4つとも実数」「2つ実数＋共役な1組」「共役な2組」の3通りしかない。条件3は $\alpha\beta+\gamma\delta$ が実数でないことを言っているので、残り2つを潰せばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z^{4}-2z^{3}-2az+b=0$ の係数は実数なので、解の集合は共役をとっても変わらない。解は相異なる4つだから、内訳は次の3通りしかない。`,
            },
            {
              k: "steps",
              items: [
                String.raw`4つとも実数：このとき $\alpha\beta+\gamma\delta$ は実数で、虚部が $0$ になり条件3に反する。`,
                String.raw`非実数が2つ（互いに共役）で実数が2つ：これが残る場合。`,
                String.raw`非実数が4つ（共役な2組 $u,\bar u,v,\bar v$）：$\{\alpha,\beta\}$ の組み方は $\{u,\bar u\}$、$\{u,v\}$、$\{u,\bar v\}$ の3通り（残りが $\{\gamma,\delta\}$）で、それぞれ $\alpha\beta+\gamma\delta$ は $|u|^{2}+|v|^{2}$、$uv+\overline{uv}$、$u\bar v+\overline{u\bar v}$ となり、どれも実数。やはり条件3に反する。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって、ちょうど2つが実数で、残りの2つは互いに共役な非実数である。`,
            },
          ],
          pitfalls: [
            String.raw`「非実数が4つ」の場合、$\{\alpha,\beta\}$ の選び方によって $\alpha\beta+\gamma\delta$ の形が変わるので、3通り全部を見る必要がある。どれも「ある複素数とその共役の和」の形になり実数になる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$b$ を $a$ で表す`,
          answer: String.raw`$b=-a^{2}$`,
          approach: String.raw`$z^{2}$ の係数が $0$ であることから、解と係数の関係で $\alpha\beta+\gamma\delta=-(\alpha+\beta)(\gamma+\delta)$ が出る。これと条件3を合わせると、実数の組と非実数の組の配り方が2通りに絞られ、どちらでも $b=-a^{2}$ になる。`,
          blocks: [
            { k: "p", t: String.raw`解と係数の関係より` },
            {
              k: "math",
              t: String.raw`\alpha+\beta+\gamma+\delta=2,\qquad \sum_{\text{2つの積}}=0,\qquad \sum_{\text{3つの積}}=2a,\qquad \alpha\beta\gamma\delta=b`,
            },
            { k: "p", t: String.raw`である。2つの積の和は` },
            {
              k: "math",
              t: String.raw`\alpha\beta+\gamma\delta+(\alpha+\beta)(\gamma+\delta)=0`,
            },
            {
              k: "p",
              t: String.raw`と分けられるので、$\alpha\beta+\gamma\delta=-(\alpha+\beta)(\gamma+\delta)$ である。`,
            },
            {
              k: "p",
              t: String.raw`(1) より実数解を $r_1,r_2$、非実数解を $u=x+yi$、$\bar u$（$y\ne0$）とする。$\{\alpha,\beta\}$ が $\{r_1,r_2\}$ だと $\alpha\beta+\gamma\delta=r_1r_2+|u|^{2}$ が実数で不適なので、$\{\alpha,\beta\}$ は実数1つと非実数1つの組である。$\{\alpha,\beta\}=\{r_1,u\}$ としてよく、このとき`,
            },
            { k: "math", t: String.raw`\alpha\beta+\gamma\delta=r_1u+r_2\bar u=\left(r_1+r_2\right)x+\left(r_1-r_2\right)yi` },
            {
              k: "p",
              t: String.raw`である。条件3の「実部が $0$」は $\left(r_1+r_2\right)x=0$、「虚部が $0$ でない」は $r_1\ne r_2$（これは条件1から成り立つ）である。よって $r_1+r_2=0$ または $x=0$ である。`,
            },
            { k: "p", t: String.raw`**$r_1+r_2=0$ のとき。** 4解の和が $2$ なので $2x=2$、$x=1$。2つの積の和から` },
            {
              k: "math",
              t: String.raw`r_1r_2+\left(r_1+r_2\right)\cdot2x+\left|u\right|^{2}=r_1r_2+\left(1+y^{2}\right)=0`,
            },
            { k: "p", t: String.raw`となり $r_1r_2=-\left(1+y^{2}\right)$。3つの積の和は` },
            {
              k: "math",
              t: String.raw`r_1r_2\cdot2x+\left(r_1+r_2\right)\left|u\right|^{2}=-2\left(1+y^{2}\right)=2a`,
            },
            { k: "p", t: String.raw`より $a=-\left(1+y^{2}\right)$、4つの積は` },
            {
              k: "math",
              t: String.raw`b=r_1r_2\left|u\right|^{2}=-\left(1+y^{2}\right)^{2}=-a^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$x=0$ のとき。** $u=yi$ で、和から $r_1+r_2=2$。2つの積の和は` },
            { k: "math", t: String.raw`r_1r_2+\left(r_1+r_2\right)\cdot0+y^{2}=0` },
            { k: "p", t: String.raw`より $r_1r_2=-y^{2}$。3つの積の和は` },
            {
              k: "math",
              t: String.raw`r_1r_2\cdot0+\left(r_1+r_2\right)y^{2}=2y^{2}=2a`,
            },
            { k: "p", t: String.raw`より $a=y^{2}$、4つの積は $b=r_1r_2\cdot y^{2}=-y^{4}=-a^{2}$ である。` },
            { k: "p", t: String.raw`どちらの場合も $b=-a^{2}$ である。` },
          ],
          pitfalls: [
            String.raw`$\{\alpha,\beta\}$ の組み方は問題文の文字の付き方で決まっている。実数どうし・非実数どうしの組だと $\alpha\beta+\gamma\delta$ が実数になるので、実数と非実数を1つずつ組むしかない。`,
          ],
          check: String.raw`$r_1=1+\sqrt2$、$r_2=1-\sqrt2$、$u=i$ とすると、和は $2$、2つの積の和は $(1-2)+1=0$ となり条件2の形に合う。$a=1$、$b=-1=-a^{2}$ で、$\alpha\beta+\gamma\delta=\left(1+\sqrt2\right)i+\left(1-\sqrt2\right)(-i)=2\sqrt2\,i$ となり条件3もみたす。`,
        },
        {
          label: "(3)",
          task: String.raw`$\alpha+\beta$ のとりうる範囲を複素数平面上に図示する`,
          answer: String.raw`双曲線 $(x-1)^{2}-y^{2}=1$ から2点 $0$、$2$（頂点）を除いたもの`,
          approach: String.raw`(2) の2つの場合それぞれで $\alpha+\beta=r+u$ を書き下す。どちらも $r$ が $\pm\sqrt{1+y^{2}}$ という形で出てくるので、実部と虚部のあいだに同じ関係式が現れる。`,
          blocks: [
            { k: "p", t: String.raw`$\alpha+\beta=r_1+u$ である。$\alpha+\beta=X+Yi$ とおく。` },
            {
              k: "p",
              t: String.raw`**$r_1+r_2=0$ のとき。** $x=1$、$r_1r_2=-r_1^{2}=-\left(1+y^{2}\right)$ より $r_1=\pm\sqrt{1+y^{2}}$ である。よって`,
            },
            { k: "math", t: String.raw`X=r_1+1=1\pm\sqrt{1+y^{2}},\qquad Y=y` },
            { k: "p", t: String.raw`となり、$(X-1)^{2}=1+y^{2}=1+Y^{2}$、すなわち` },
            { k: "math", t: String.raw`(X-1)^{2}-Y^{2}=1` },
            { k: "p", t: String.raw`が成り立つ。$y\ne0$ だから $Y\ne0$ である。` },
            {
              k: "p",
              t: String.raw`**$x=0$ のとき。** $r_1,r_2$ は $r_1+r_2=2$、$r_1r_2=-y^{2}$ をみたすので $T^{2}-2T-y^{2}=0$ の解、つまり $r_1=1\pm\sqrt{1+y^{2}}$ である。$u=yi$ なので`,
            },
            { k: "math", t: String.raw`X=r_1=1\pm\sqrt{1+y^{2}},\qquad Y=y` },
            { k: "p", t: String.raw`となり、やはり $(X-1)^{2}-Y^{2}=1$、$Y\ne0$ である。` },
            {
              k: "p",
              t: String.raw`逆に $(X-1)^{2}-Y^{2}=1$、$Y\ne0$ をみたす任意の点に対して、$y=Y$、$r_1=1+\sqrt{1+y^{2}}$、$r_2=1-\sqrt{1+y^{2}}$、$u=yi$（$x=0$ の場合）とすれば、4解は相異なり条件1〜3をすべてみたし、$\alpha+\beta=X+Yi$ となる。`,
            },
            {
              k: "p",
              t: String.raw`したがって $\alpha+\beta$ のとりうる範囲は、双曲線 $(x-1)^{2}-y^{2}=1$ から頂点 $(0,0)$ と $(2,0)$（複素数でいえば $0$ と $2$）を除いたものである。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$\alpha+\beta$ のとりうる範囲。双曲線 $(x-1)^{2}-y^{2}=1$（中心 $(1,0)$、漸近線 $y=\pm(x-1)$）から2つの頂点 $0$ と $2$ を除いたもの。`,
                view: [-3.2, 5.2, -3.2, 3.2],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [1 + Math.cosh(t), Math.sinh(t)] as [number, number],
                    from: -1.9,
                    to: 1.9,
                  },
                  {
                    k: "param",
                    f: (t: number) => [1 - Math.cosh(t), Math.sinh(t)] as [number, number],
                    from: -1.9,
                    to: 1.9,
                  },
                  { k: "seg", a: [-2.2, -3.2], b: [4.2, 3.2], faint: true, dash: true },
                  { k: "seg", a: [-2.2, 3.2], b: [4.2, -3.2], faint: true, dash: true },
                  { k: "text", at: [0, 0], label: "0 は除く", place: "below-left" },
                  { k: "text", at: [2, 0], label: "2 は除く", place: "below-right" },
                  { k: "dot", at: [1, 0], label: "中心 (1, 0)", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`頂点 $0$ と $2$ は $Y=0$、つまり $y=0$ にあたるが、$y=0$ だと $u$ が実数になって (1) に反する。したがってこの2点は除く。`,
            String.raw`2つの場合（$r_1+r_2=0$ と $x=0$）で $\alpha+\beta$ が同じ双曲線に乗る。別々の曲線になると思って場合分けを残さない。`,
          ],
          check: String.raw`$r_1=1+\sqrt2$、$u=i$ の例では $\alpha+\beta=1+\sqrt2+i$ で、$\left(\sqrt2\right)^{2}-1^{2}=1$ をみたす。条件をみたす根の組を2種類の形で $4000$ 通り作って確かめても、$\alpha+\beta$ はすべて $(x-1)^{2}-y^{2}=1$ の上にあった。`,
        },
      ],
    },
  ],
};
