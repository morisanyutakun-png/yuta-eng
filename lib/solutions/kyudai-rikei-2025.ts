import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2025年度（令和7年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 九州大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */

/** 第1問の図。(a,b)=(2,1) のときの Q の軌跡（xy 平面内の直線）。 */
const QA = 2;
const QB = 1;
/** O から直線に下ろした垂線の足。 */
const FT = (QA + 2 * QB) / 10;
const FX = QA - 2 * FT;
const FY = QB - 4 * FT;

/** 第4問の図。半径1の円周上の4点と交点 E。 */
const PA: [number, number] = [1, 0];
const PB: [number, number] = [Math.SQRT1_2, Math.SQRT1_2];
const PC: [number, number] = [0, 1];
const PD: [number, number] = [-1, 0];
const PE: [number, number] = [Math.SQRT2 - 1, 2 - Math.SQRT2];

export const kyudaiRikei2025: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル",
      topics: ["法線ベクトル", "直線と平面の交点", "点と直線の距離", "2次関数の最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{AB}}\\times\\overrightarrow{\\mathrm{AC}}=(8,16,4)=4(2,4,1)$ を計算し、法線が $(2,4,1)$ であることを確かめた",
          "$(a,b,t)$ を $20$ 万組ランダムにとって、$\\mathrm{P}$ から法線方向に進んで $z=0$ になる点が $(a-2t,\;b-4t,\;0)$ に一致することを確かめた",
          "$(a,b)=(1,0),(0,1),(1,2),(2,1),(3,1)$ について $t$ を $80$ 万点動かして $\\mathrm{OQ}$ の最小値を直接求めると、$\\frac{|2a-b|}{\\sqrt5}$ と小数6桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}(a,b,t)$ を通り平面 $\alpha$ に垂直な直線と $xy$ 平面との交点 $\mathrm{Q}$ の座標を求める`,
          answer: String.raw`$\mathrm{Q}\left(a-2t,\;b-4t,\;0\right)$`,
          approach: String.raw`平面の法線ベクトルは $\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ の外積で出る。あとは $\mathrm{P}$ から法線方向に進んで $z=0$ になるところを探すだけである。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{AB}}=(-2,-2,12)$、$\overrightarrow{\mathrm{AC}}=(0,-2,8)$ である。法線ベクトル $\vec n=(p,q,r)$ は` },
            {
              k: "math",
              t: String.raw`\begin{cases}-2p-2q+12r=0\\[1mm]-2q+8r=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`をみたす。2本目から $q=4r$、1本目に入れて $-2p-8r+12r=0$ より $p=2r$。$r=1$ ととって`,
            },
            { k: "math", t: String.raw`\vec n=(2,4,1)` },
            {
              k: "p",
              t: String.raw`である（外積 $\overrightarrow{\mathrm{AB}}\times\overrightarrow{\mathrm{AC}}=(8,16,4)=4(2,4,1)$ でもよい）。`,
            },
            {
              k: "p",
              t: String.raw`**交点。** $\mathrm{P}(a,b,t)$ を通り $\vec n$ に平行な直線は`,
            },
            { k: "math", t: String.raw`(x,y,z)=(a+2s,\;b+4s,\;t+s)` },
            { k: "p", t: String.raw`である。$xy$ 平面との交点は $z=0$、すなわち $s=-t$ のときだから` },
            { k: "math", t: String.raw`\mathrm{Q}\left(a-2t,\;b-4t,\;0\right)` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`法線ベクトルは向きと大きさの自由度があるが、$(2,4,1)$ の定数倍ならどれでもよい。ここでは $z$ 成分を $1$ にそろえると、$s=-t$ がすぐ出る。`,
            String.raw`$\mathrm{A},\mathrm{B},\mathrm{C}$ が本当に三角形をなす（$\overrightarrow{\mathrm{AB}},\overrightarrow{\mathrm{AC}}$ が平行でない）ことは、外積が $\vec0$ でないことで確かめられる。`,
          ],
          check: String.raw`$\overrightarrow{\mathrm{AB}}\times\overrightarrow{\mathrm{AC}}=(8,16,4)$ で、$(2,4,1)$ の $4$ 倍である。$(a,b,t)$ を $20$ 万組ランダムにとって計算しても、交点は $(a-2t,\,b-4t,\,0)$ に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$t$ がすべての実数値を動くときの $\mathrm{OQ}$ の最小値が $1$ 以下となる $a,b$ の条件を求める`,
          answer: String.raw`$\left|2a-b\right|\le\sqrt5$`,
          approach: String.raw`$\mathrm{OQ}^{2}$ は $t$ の2次関数なので平方完成すればよい。幾何的には「原点から、点 $(a,b)$ を通り方向 $(2,4)$ の直線までの距離」なので、点と直線の距離の公式でも出る。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $\mathrm{Q}(a-2t,\;b-4t,\;0)$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{OQ}^{2}=(a-2t)^{2}+(b-4t)^{2}=20t^{2}-4(a+2b)t+a^{2}+b^{2}`,
            },
            { k: "p", t: String.raw`である。$t$ の2次関数（$t^{2}$ の係数 $20>0$）なので、$t=\dfrac{a+2b}{10}$ で最小になり` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\min\mathrm{OQ}^{2}&=a^{2}+b^{2}-\frac{\left\{4(a+2b)\right\}^{2}}{4\cdot20}=a^{2}+b^{2}-\frac{(a+2b)^{2}}{5}\\[1mm]
&=\frac{5a^{2}+5b^{2}-a^{2}-4ab-4b^{2}}{5}=\frac{(2a-b)^{2}}{5}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\min\mathrm{OQ}=\frac{\left|2a-b\right|}{\sqrt5}`,
            },
            { k: "p", t: String.raw`で、これが $1$ 以下という条件は` },
            {
              k: "math",
              t: String.raw`\frac{\left|2a-b\right|}{\sqrt5}\le1\quad\Longleftrightarrow\quad\left|2a-b\right|\le\sqrt5`,
            },
            {
              k: "p",
              t: String.raw`すなわち $-\sqrt5\le2a-b\le\sqrt5$ である。`,
            },
            {
              k: "note",
              t: String.raw`$t$ が動くと $\mathrm{Q}$ は $xy$ 平面内で、点 $(a,b)$ を通り方向ベクトル $(2,4)$ の直線を描く。$\min\mathrm{OQ}$ はこの直線と原点の距離で、直線の式 $2x-y=2a-b$ に点と直線の距離の公式を使っても $\frac{|2a-b|}{\sqrt5}$ が出る。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$(a,b)=(2,1)$ のときの $\mathrm{Q}$ の軌跡（$xy$ 平面内の直線 $2x-y=3$）。原点からの距離の最小は垂線の足までの長さ $\frac{3}{\sqrt5}=1.342$ で、公式 $\frac{|2a-b|}{\sqrt5}$ と一致する。`,
                view: [-2.0, 4.0, -1.6, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [QA - 2 * 1.0, QB - 4 * 1.0], b: [QA + 2 * 0.65, QB + 4 * 0.65] },
                  { k: "seg", a: [0, 0], b: [FX, FY], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [QA, QB], label: "(a, b)", place: "left" },
                  { k: "dot", at: [FX, FY], label: "垂線の足", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{OQ}$ ではなく $\mathrm{OQ}^{2}$ を最小にする。平方根のまま平方完成しない。`,
            String.raw`$\min\mathrm{OQ}^{2}=\frac{(2a-b)^{2}}{5}$ まで整理できると、条件が絶対値ひとつで書ける。`,
            String.raw`$t$ は「すべての実数値」をとるので、頂点がかならず定義域に入る。端の場合分けは要らない。`,
          ],
          check: String.raw`$(a,b)=(2,1)$ では $\frac{|2\cdot2-1|}{\sqrt5}=\frac3{\sqrt5}=1.341641$ で、$t$ を $80$ 万点動かした直接計算でも $1.341641$ になる。$(a,b)=(1,2)$ では $2a-b=0$ で最小は $0$、実際 $t=\frac12$ で $\mathrm{Q}$ が原点に一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["tan の微分", "置換積分", "部分分数分解", "次数下げ"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\int_0^{\\pi/4}\\frac{\\tan^{4}x-\\tan^{2}x-2}{\\tan^{2}x-4}dx$ を $400$ 万点で数値積分すると $0.450693856$ となり、$1-\\frac12\\log3=0.450693856$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$y=\tan x$ のとき $\dfrac{dy}{dx}$ を $y$ の整式で表す`,
          answer: String.raw`$\dfrac{dy}{dx}=1+y^{2}$`,
          approach: String.raw`$\tan x=\dfrac{\sin x}{\cos x}$ を商の微分で計算すると $\dfrac1{\cos^{2}x}$ になり、これは $1+\tan^{2}x$ に等しい。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{dy}{dx}=\left(\frac{\sin x}{\cos x}\right)'=\frac{\cos^{2}x+\sin^{2}x}{\cos^{2}x}=\frac1{\cos^{2}x}`,
            },
            { k: "p", t: String.raw`であり、$\dfrac1{\cos^{2}x}=\dfrac{\cos^{2}x+\sin^{2}x}{\cos^{2}x}=1+\tan^{2}x$ だから` },
            { k: "math", t: String.raw`\frac{dy}{dx}=1+y^{2}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$y$ の整式で表せ」なので、$\frac1{\cos^{2}x}$ のままでは答えにならない。$1+\tan^{2}x$ に直す。`,
          ],
          check: String.raw`$x=\frac\pi4$ で $y=1$、$\frac{dy}{dx}=\frac1{\cos^{2}(\pi/4)}=2$ で、$1+y^{2}=2$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\int_{0}^{\frac\pi4}\frac{\tan^{4}x-\tan^{2}x-2}{\tan^{2}x-4}dx$ を求める`,
          answer: String.raw`$1-\dfrac12\log3$`,
          approach: String.raw`(1) から $dy=\left(1+y^{2}\right)dx$ なので、$y=\tan x$ で置換すると $dx=\dfrac{dy}{1+y^{2}}$ である。分子が $\left(\tan^{2}x-2\right)\left(\tan^{2}x+1\right)$ と因数分解でき、$1+y^{2}$ がちょうど約分される。`,
          blocks: [
            { k: "p", t: String.raw`分子を因数分解すると` },
            {
              k: "math",
              t: String.raw`\tan^{4}x-\tan^{2}x-2=\left(\tan^{2}x-2\right)\left(\tan^{2}x+1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$y=\tan x$ とおくと (1) より $dx=\dfrac{dy}{1+y^{2}}$ で、$x:0\to\dfrac\pi4$ のとき $y:0\to1$ だから`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac\pi4}\frac{\left(y^{2}-2\right)\left(y^{2}+1\right)}{y^{2}-4}\cdot\frac{dy}{1+y^{2}}=\int_{0}^{1}\frac{y^{2}-2}{y^{2}-4}\,dy`,
            },
            { k: "p", t: String.raw`となる（$0\le y\le1$ では $y^{2}-4<0$ で、分母は $0$ にならない）。` },
            { k: "p", t: String.raw`**部分分数に分ける。** ` },
            {
              k: "math",
              t: String.raw`\frac{y^{2}-2}{y^{2}-4}=1+\frac{2}{y^{2}-4}=1+\frac12\left(\frac1{y-2}-\frac1{y+2}\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\frac{y^{2}-2}{y^{2}-4}dy=\Bigl[y\Bigr]_{0}^{1}+\frac12\Bigl[\log\left|\frac{y-2}{y+2}\right|\Bigr]_{0}^{1}`,
            },
            { k: "p", t: String.raw`である。$y=1$ で $\left|\dfrac{-1}{3}\right|=\dfrac13$、$y=0$ で $\left|\dfrac{-2}{2}\right|=1$ だから` },
            {
              k: "math",
              t: String.raw`=1+\frac12\left(\log\frac13-\log1\right)=1-\frac12\log3`,
            },
            { k: "p", t: String.raw`である（$0.4507$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$\tan^{4}x-\tan^{2}x-2$ を $t^{2}-t-2=(t-2)(t+1)$（$t=\tan^{2}x$）と見て因数分解する。分母の $\tan^{2}x-4$ とは約分できないが、$\tan^{2}x+1$ が置換で出る $\frac1{1+y^{2}}$ と約分される。`,
            String.raw`$\frac{2}{y^{2}-4}=\frac12\left(\frac1{y-2}-\frac1{y+2}\right)$ の係数 $\frac12$ を落とさない。$\frac1{(y-2)(y+2)}=\frac14\left(\frac1{y-2}-\frac1{y+2}\right)$ なので、$2$ 倍して $\frac12$ になる。`,
            String.raw`$\log$ の中は絶対値をつける。$0\le y\le1$ では $y-2<0$ である。`,
          ],
          check: String.raw`$400$ 万点の数値積分で $0.450693856$ となり、$1-\frac12\log3=0.450693856$ と一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["平方数の余り", "mod 8", "指数方程式", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$-20\\le n\\le20$ で $n^{2}$ を $8$ で割った余りを計算すると、現れるのは $0,1,4$ だけだった",
          "$0\\le m\\le39$、$0\\le n\\le9999$ で $2^{m}=n^{2}+3$ をみたす組を全探索すると $(m,n)=(2,1)$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`整数 $n$ について $n^{2}$ を $8$ で割った余りが $0,1,4$ のいずれかであることを示す`,
          answer: String.raw`$n=4k+r$（$r=0,1,2,3$）とすると $n^{2}\equiv r^{2}\equiv0,1,4,1\pmod8$`,
          approach: String.raw`$n$ を $4$ で割った余りで分ければよい。$n^{2}$ の $8$ を法とする値は、$n$ の $4$ を法とする値だけで決まる（$n$ を $8k$ 増やす必要はない）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ を $4$ で割った余りを $r\in\{0,1,2,3\}$ とし、$n=4k+r$ と書く。`,
            },
            {
              k: "math",
              t: String.raw`n^{2}=16k^{2}+8kr+r^{2}\equiv r^{2}\pmod8`,
            },
            { k: "p", t: String.raw`である（$16k^{2}$ も $8kr$ も $8$ の倍数）。あとは $r^{2}$ を計算して` },
            {
              k: "math",
              t: String.raw`r=0:\;0,\qquad r=1:\;1,\qquad r=2:\;4,\qquad r=3:\;9\equiv1`,
            },
            { k: "p", t: String.raw`となるので、$n^{2}$ を $8$ で割った余りは $0,1,4$ のいずれかである。` },
            {
              k: "note",
              t: String.raw`別の見方をすると、$n$ が奇数なら $n^{2}\equiv1\pmod8$（連続2整数の積が偶数であることから $n^{2}-1=(n-1)(n+1)$ が $8$ の倍数）、$n$ が偶数なら $n=2k$ で $n^{2}=4k^{2}\equiv0$ または $4$、となる。`,
            },
          ],
          pitfalls: [
            String.raw`$8$ で割った余りを調べるのに $n$ を $8$ 通りに分ける必要はない。$4$ 通りで足りる（$n$ と $n+4$ の平方は $8$ を法として等しい）。`,
            String.raw`$r=3$ のとき $r^{2}=9\equiv1$ である。$9$ のまま答えに書かない。`,
          ],
          check: String.raw`$-20\le n\le20$ で $n^{2}\bmod8$ を計算すると、現れるのは $0,1,4$ の3つだけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$2^{m}=n^{2}+3$ をみたす $0$ 以上の整数の組 $(m,n)$ をすべて求める`,
          answer: String.raw`$(m,n)=(2,1)$`,
          approach: String.raw`$m\ge3$ なら左辺は $8$ の倍数なので、$n^{2}\equiv-3\equiv5\pmod8$ が必要になる。(1) よりこれは不可能なので、$m\le2$ に絞られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$m\ge3$ は不可能。** このとき $2^{m}$ は $8$ の倍数なので`,
            },
            {
              k: "math",
              t: String.raw`n^{2}+3\equiv0\pmod8\quad\Longleftrightarrow\quad n^{2}\equiv-3\equiv5\pmod8`,
            },
            {
              k: "p",
              t: String.raw`となる。しかし (1) より $n^{2}$ を $8$ で割った余りは $0,1,4$ のいずれかで、$5$ にはならない。よって $m\ge3$ では解がない。`,
            },
            { k: "p", t: String.raw`**$m\le2$ を調べる。** ` },
            {
              k: "steps",
              items: [
                String.raw`$m=0$：$1=n^{2}+3$ より $n^{2}=-2$。不可。`,
                String.raw`$m=1$：$2=n^{2}+3$ より $n^{2}=-1$。不可。`,
                String.raw`$m=2$：$4=n^{2}+3$ より $n^{2}=1$、$n\ge0$ より $n=1$。◯`,
              ],
            },
            { k: "p", t: String.raw`したがって求める組は` },
            { k: "math", t: String.raw`(m,n)=(2,1)` },
            { k: "p", t: String.raw`だけである。` },
          ],
          pitfalls: [
            String.raw`$m$ も $n$ も「$0$ 以上の整数」なので、$m=0,1$ も調べる。$n=0$ も候補だが $2^{m}=3$ となり不可。`,
            String.raw`$-3\equiv5\pmod8$ である。符号を直してから (1) と突き合わせる。`,
          ],
          check: String.raw`$0\le m\le39$、$0\le n\le9999$ で全探索すると、$2^{m}=n^{2}+3$ をみたすのは $(m,n)=(2,1)$ だけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形",
      topics: ["円周角", "直径と直角", "弦の長さ", "三角形の面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{A}(1,0)$、$\\mathrm{B}\\left(\\frac{\\sqrt2}2,\\frac{\\sqrt2}2\\right)$、$\\mathrm{C}(0,1)$、$\\mathrm{D}(-1,0)$ が条件（$\\mathrm{AD}$ が直径、$\\mathrm{AC}=\\mathrm{CD}=\\sqrt2$、$\\mathrm{AB}=\\mathrm{BC}=0.765367$）をすべてみたすことを確かめた",
          "$\\angle\\mathrm{ACB}=22.500000^\\circ$、$\\mathrm{BC}=0.765366865=\\sqrt{2-\\sqrt2}$ を確かめた",
          "$\\mathrm{E}\\left(\\sqrt2-1,\;2-\\sqrt2\\right)$ が線分 $\\mathrm{AC}$ 上にも $\\mathrm{BD}$ 上にもあり、$\\triangle\\mathrm{BCE}=0.085786438=\\frac{3-2\\sqrt2}{2}$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\angle\mathrm{ACB}$ を求める`,
          answer: String.raw`$\angle\mathrm{ACB}=\dfrac\pi8\;(=22.5^\circ)$`,
          approach: String.raw`円周上の点は中心から見た角度（中心角）で位置が決まる。$\mathrm{AD}$ が直径なので $\mathrm{A}$ と $\mathrm{D}$ は $180^\circ$ 離れ、$\mathrm{AC}=\mathrm{CD}$ から $\mathrm{C}$ はその中点、$\mathrm{AB}=\mathrm{BC}$ から $\mathrm{B}$ は弧 $\mathrm{AC}$ の中点になる。あとは円周角の定理である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中心を $\mathrm{O}$ とする。弧の中心角で位置を測る。$\mathrm{AD}$ が直径なので、$\mathrm{A}$ から反時計回りに $\mathrm{D}$ までの中心角は $180^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{C}$ の位置。** 弦の長さは中心角で決まる（中心角 $\theta$ の弦は $2\sin\frac\theta2$）ので、$\mathrm{AC}=\mathrm{CD}$ は弧 $\mathrm{AC}$ と弧 $\mathrm{CD}$ の中心角が等しいことを意味する。和が $180^\circ$ だから、どちらも $90^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{B}$ の位置。** 同じく $\mathrm{AB}=\mathrm{BC}$ より、弧 $\mathrm{AB}$ と弧 $\mathrm{BC}$ の中心角は等しく、和が $90^\circ$ だからどちらも $45^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`**円周角。** $\angle\mathrm{ACB}$ は弦 $\mathrm{AB}$ に対する円周角（$\mathrm{C}$ は弧 $\mathrm{AB}$ の反対側にある）なので、中心角 $45^\circ$ の半分で`,
            },
            { k: "math", t: String.raw`\angle\mathrm{ACB}=\frac{45^\circ}{2}=22.5^\circ=\frac\pi8` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`半径 $1$ の円周上に $\mathrm{A}(1,0)$、$\mathrm{B}\left(\frac{\sqrt2}{2},\frac{\sqrt2}{2}\right)$、$\mathrm{C}(0,1)$、$\mathrm{D}(-1,0)$。$\mathrm{AD}$ が直径で、弧 $\mathrm{AB}$ と $\mathrm{BC}$ が $45^\circ$、弧 $\mathrm{CD}$ が $90^\circ$。$\mathrm{E}$ は $\mathrm{AC}$ と $\mathrm{BD}$ の交点。`,
                view: [-1.4, 1.4, -1.15, 1.25],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: PA, b: PD, faint: true },
                  { k: "seg", a: PA, b: PC },
                  { k: "seg", a: PB, b: PD },
                  { k: "seg", a: PA, b: PB },
                  { k: "seg", a: PB, b: PC },
                  { k: "seg", a: PC, b: PD },
                  { k: "dot", at: PA, label: "A", place: "right" },
                  { k: "dot", at: PB, label: "B", place: "above-right" },
                  { k: "dot", at: PC, label: "C", place: "above" },
                  { k: "dot", at: PD, label: "D", place: "left" },
                  { k: "dot", at: PE, label: "E", place: "below-right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「弦が等しい ⟺ 中心角（弧）が等しい」を使う。$\mathrm{AC}=\mathrm{CD}$ から直接 $\mathrm{C}$ が弧の中点だと言える。`,
            String.raw`$\angle\mathrm{ACB}$ は弦 $\mathrm{AB}$ に対する円周角である。弦 $\mathrm{BC}$ ではない。`,
          ],
          check: String.raw`$\mathrm{A}(1,0)$、$\mathrm{B}\left(\frac{\sqrt2}2,\frac{\sqrt2}2\right)$、$\mathrm{C}(0,1)$、$\mathrm{D}(-1,0)$ とすると $\mathrm{AC}=\mathrm{CD}=1.414214=\sqrt2$、$\mathrm{AB}=\mathrm{BC}=0.765367$ で条件をみたし、$\angle\mathrm{ACB}=22.500000^\circ$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{BC}$ を求める`,
          answer: String.raw`$\mathrm{BC}=\sqrt{2-\sqrt2}$`,
          approach: String.raw`弧 $\mathrm{BC}$ の中心角が $45^\circ$ なので、弦の長さの公式 $2\sin\frac\theta2$（半径 $1$）で出る。半角の公式で $\sin22.5^\circ$ を根号で書く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より弧 $\mathrm{BC}$ の中心角は $45^\circ$ である。半径 $1$ の円で中心角 $\theta$ の弦の長さは $2\sin\dfrac\theta2$ だから`,
            },
            { k: "math", t: String.raw`\mathrm{BC}=2\sin22.5^\circ` },
            { k: "p", t: String.raw`である。半角の公式より` },
            {
              k: "math",
              t: String.raw`\sin^{2}22.5^\circ=\frac{1-\cos45^\circ}{2}=\frac{1-\frac{\sqrt2}2}{2}=\frac{2-\sqrt2}{4}`,
            },
            { k: "p", t: String.raw`なので $\sin22.5^\circ=\dfrac{\sqrt{2-\sqrt2}}{2}$、したがって` },
            { k: "math", t: String.raw`\mathrm{BC}=\sqrt{2-\sqrt2}` },
            { k: "p", t: String.raw`である（$0.7654$ ほど）。` },
            {
              k: "note",
              t: String.raw`$\triangle\mathrm{OBC}$ で余弦定理を使っても同じで、$\mathrm{BC}^{2}=1+1-2\cos45^\circ=2-\sqrt2$ となる。`,
            },
          ],
          pitfalls: [
            String.raw`$2-\sqrt2$ の二重根号は外せない（$\sqrt{2-\sqrt2}$ のままが答え）。無理に変形しない。`,
            String.raw`半径が $1$ なので弦は $2\sin\frac\theta2$ である。直径 $2$ を掛け忘れない。`,
          ],
          check: String.raw`$\mathrm{B}$ と $\mathrm{C}$ の距離を座標から計算すると $0.765366865$ で、$\sqrt{2-\sqrt2}=0.765366865$ と一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{AC}$ と $\mathrm{BD}$ の交点を $\mathrm{E}$ とするとき、$\triangle\mathrm{BCE}$ の面積を求める`,
          answer: String.raw`$\dfrac{3-2\sqrt2}{2}$`,
          approach: String.raw`位置が完全に決まっているので、座標を入れてしまうのがいちばん速い。$\mathrm{A}(1,0)$、$\mathrm{C}(0,1)$、$\mathrm{D}(-1,0)$、$\mathrm{B}\left(\frac{\sqrt2}2,\frac{\sqrt2}2\right)$ として、2直線の交点を出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中心を原点にとり、$\mathrm{A}(1,0)$、$\mathrm{D}(-1,0)$ とする。(1) より $\mathrm{C}$ は $\mathrm{A}$ から反時計回りに $90^\circ$、$\mathrm{B}$ は $45^\circ$ の位置だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{B}\left(\frac{\sqrt2}2,\;\frac{\sqrt2}2\right),\qquad\mathrm{C}(0,1)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**交点 $\mathrm{E}$。** 直線 $\mathrm{AC}$ は $x+y=1$ である。直線 $\mathrm{BD}$ は $\mathrm{D}(-1,0)$ を通り方向` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{DB}}=\left(\frac{\sqrt2}2+1,\;\frac{\sqrt2}2\right)`,
            },
            { k: "p", t: String.raw`なので、$(x,y)=(-1,0)+s\overrightarrow{\mathrm{DB}}$ と書ける。$x+y=1$ に代入すると` },
            {
              k: "math",
              t: String.raw`-1+s\left(\sqrt2+1\right)=1\quad\Longrightarrow\quad s=\frac{2}{\sqrt2+1}=2\left(\sqrt2-1\right)`,
            },
            { k: "p", t: String.raw`である。$\left(\sqrt2-1\right)\left(\frac{\sqrt2}2+1\right)=\frac{\sqrt2}{2}$ に注意すると` },
            {
              k: "math",
              t: String.raw`\mathrm{E}\left(\sqrt2-1,\;2-\sqrt2\right)`,
            },
            { k: "p", t: String.raw`である（$x+y=1$ をみたしている）。` },
            { k: "p", t: String.raw`**面積。** ` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{BC}}=\left(-\frac{\sqrt2}2,\;1-\frac{\sqrt2}2\right),\qquad\overrightarrow{\mathrm{BE}}=\left(\frac{\sqrt2}2-1,\;2-\frac{3\sqrt2}2\right)`,
            },
            { k: "p", t: String.raw`なので、外積の大きさの半分として` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\triangle\mathrm{BCE}&=\frac12\left|\left(-\frac{\sqrt2}2\right)\left(2-\frac{3\sqrt2}2\right)-\left(1-\frac{\sqrt2}2\right)\left(\frac{\sqrt2}2-1\right)\right|\\[1mm]
&=\frac12\left|\left(-\sqrt2+\frac32\right)+\left(1-\frac{\sqrt2}2\right)^{2}\right|=\frac12\left|\frac32-\sqrt2+\frac32-\sqrt2\right|\\[1mm]
&=\frac{3-2\sqrt2}{2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$0.0858$ ほど）。$3-2\sqrt2=\left(\sqrt2-1\right)^{2}$ なので $\dfrac{\left(\sqrt2-1\right)^{2}}{2}$ とも書ける。`,
            },
          ],
          pitfalls: [
            String.raw`座標を入れるときは $\mathrm{A},\mathrm{D}$ を $x$ 軸上にとる。$\mathrm{AD}$ が直径なので、中心が原点、$\mathrm{A}(1,0)$、$\mathrm{D}(-1,0)$ が自然である。`,
            String.raw`$\mathrm{E}$ は線分 $\mathrm{AC}$ と $\mathrm{BD}$ の交点で、どちらの線分の内部にもある。$s=2\left(\sqrt2-1\right)=0.83$ で $0<s<1$ だから、確かに線分 $\mathrm{DB}$ の内部である。`,
            String.raw`$\frac{2}{\sqrt2+1}$ は有理化して $2\left(\sqrt2-1\right)$ にする。`,
          ],
          check: String.raw`$\mathrm{E}\left(\sqrt2-1,\,2-\sqrt2\right)=(0.414214,\,0.585786)$ は $x+y=1$ をみたし、$\mathrm{D},\mathrm{B}$ と同一直線上にある。$\triangle\mathrm{BCE}$ を座標から計算すると $0.085786438$ で、$\frac{3-2\sqrt2}{2}=0.085786438$ と一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "確率",
      topics: ["判別式", "解の個数", "自然数解", "場合の数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$6^{3}=216$ 通りの $(a,b,c)$ をすべて列挙して解の個数を数えると、実数解がちょうど1個になるのが $104$ 通り（$\\frac{13}{27}$）、自然数解がちょうど3個になるのが $20$ 通り（$\\frac5{54}$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=0$ をみたす実数 $x$ の個数が $1$ 個である確率を求める`,
          answer: String.raw`$\dfrac{13}{27}$`,
          approach: String.raw`$f(x)=\left(x^{2}-ax+b\right)(x-c)$ なので、解は $x=c$ と2次方程式の解である。$x=c$ はつねに解なので、実数解がちょうど1個になるのは「2次方程式が実数解をもたない」か「重解をもってそれが $c$ に一致する」かのどちらかである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)=0$ の解は $x=c$ と $x^{2}-ax+b=0$ の解である。判別式を $D=a^{2}-4b$ とする。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$D<0$：2次方程式は実数解をもたないので、実数解は $x=c$ の1個。◯`,
                String.raw`$D=0$：重解 $x=\dfrac a2$ をもつ。実数解が1個になるのは $\dfrac a2=c$ のとき。`,
                String.raw`$D>0$：異なる2つの実数解があるので、$c$ と合わせて2個以上になる。×`,
              ],
            },
            { k: "p", t: String.raw`**$D<0$ の場合を数える。** $a^{2}<4b$ をみたす $(a,b)$ は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a=1&:\;1<4b\;\Rightarrow\;b=1,\dots,6&&6\text{ 通り}\\
a=2&:\;4<4b\;\Rightarrow\;b=2,\dots,6&&5\text{ 通り}\\
a=3&:\;9<4b\;\Rightarrow\;b=3,\dots,6&&4\text{ 通り}\\
a=4&:\;16<4b\;\Rightarrow\;b=5,6&&2\text{ 通り}\\
a=5,6&:\;\text{なし}&&0\text{ 通り}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で合計 $17$ 通り。$c$ は何でもよいので $17\times6=102$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`**$D=0$ の場合。** $a^{2}=4b$ をみたすのは $(a,b)=(2,1),(4,4)$ の2通り（$a=6$ だと $b=9>6$）。それぞれ $c=\dfrac a2$、つまり $c=1$、$c=2$ の1通りずつなので $2$ 通りである。`,
            },
            { k: "p", t: String.raw`合わせて $102+2=104$ 通りだから` },
            {
              k: "math",
              t: String.raw`P=\frac{104}{216}=\frac{13}{27}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x=c$ はつねに解なので、実数解が $0$ 個になることはない。$1$ 個になる条件だけを考えればよい。`,
            String.raw`$D=0$ のときに重解が $c$ と一致するかで場合が分かれる。一致しなければ解は2個である。`,
            String.raw`$a=4$ では $4b>16$ すなわち $b>4$ なので $b=5,6$ の2通り。$b=4$（$D=0$）を入れない。`,
          ],
          check: String.raw`$216$ 通りをすべて列挙して解の個数を数えると、実数解がちょうど1個になるのは $104$ 通りで、$\frac{104}{216}=\frac{13}{27}=0.4815$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)=0$ をみたす自然数 $x$ の個数が $3$ 個である確率を求める`,
          answer: String.raw`$\dfrac{5}{54}$`,
          approach: String.raw`解は高々3個なので、3個とも自然数で互いに異なる必要がある。つまり「2次方程式が相異なる2つの自然数解をもち、しかも $c$ がそのどちらとも違う」である。2次方程式の2解を $p,q$ とすると $p+q=a\le6$、$pq=b\le6$ という強い制約がつく。`,
          blocks: [
            {
              k: "p",
              t: String.raw`解は $x=c$ と2次方程式の2解の最大3個である。自然数解がちょうど3個になるには、この3つがすべて自然数で互いに異なればよい。$c$ は $1$ 以上 $6$ 以下なので自然数である。したがって条件は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x^{2}-ax+b=0$ が相異なる2つの自然数解 $p<q$ をもつ`,
                String.raw`$c\ne p$ かつ $c\ne q$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$(p,q)$ を数える。** 解と係数の関係より $p+q=a$、$pq=b$ で、$1\le a\le6$、$1\le b\le6$ だから`,
            },
            {
              k: "math",
              t: String.raw`p+q\le6,\qquad pq\le6,\qquad 1\le p<q`,
            },
            { k: "p", t: String.raw`をみたす組を探すと` },
            {
              k: "math",
              t: String.raw`(p,q)=(1,2),\;(1,3),\;(1,4),\;(1,5),\;(2,3)`,
            },
            {
              k: "p",
              t: String.raw`の5通りである（$(1,6)$ は $a=7$、$(2,4)$ は $b=8$ で範囲外）。それぞれ $(a,b)=(3,2),(4,3),(5,4),(6,5),(5,6)$ と1対1に対応する。`,
            },
            {
              k: "p",
              t: String.raw`**$c$ の選び方。** $c$ は $1,\dots,6$ のうち $p,q$ 以外だから $6-2=4$ 通りである。よって`,
            },
            { k: "math", t: String.raw`5\times4=20\ \text{通り}` },
            { k: "p", t: String.raw`で` },
            {
              k: "math",
              t: String.raw`P=\frac{20}{216}=\frac5{54}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「自然数 $x$ の個数が3個」なので、3つの解が**相異なる**必要がある。$c$ が $p$ か $q$ と一致すると2個になってしまう。`,
            String.raw`$p=q$（重解）だと解は2個以下になる。$p<q$ に限る。`,
            String.raw`$p+q\le6$ と $pq\le6$ の**両方**で絞る。$(1,6)$ や $(2,4)$ は片方だけ見ると見落とす。`,
          ],
          check: String.raw`$216$ 通りを全探索すると、自然数解がちょうど3個になるのは $20$ 通りで、$\frac{20}{216}=\frac5{54}=0.0926$ である。`,
        },
      ],
    },
  ],
};
