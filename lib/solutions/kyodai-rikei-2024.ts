import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2024年度（令和6年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第1問は文系の第2問とまったく同じ設定で、問われているところだけが違う。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第2問の図。中心 (4,3)、半径 1/2 と 5/2 の円環。 */
const CX = 4;
const CY = 3;
const RO = 2.5;
const RI = 0.5;
const outU = (x: number) => CY + Math.sqrt(Math.max(0, RO * RO - (x - CX) ** 2));
const outL = (x: number) => CY - Math.sqrt(Math.max(0, RO * RO - (x - CX) ** 2));
const innU = (x: number) => CY + Math.sqrt(Math.max(0, RI * RI - (x - CX) ** 2));
const innL = (x: number) => CY - Math.sqrt(Math.max(0, RI * RI - (x - CX) ** 2));
const circ = (r: number) => (t: number): [number, number] =>
  [CX + r * Math.cos(t), CY + r * Math.sin(t)];

/** 第5問の図。a = 2 のときの領域。 */
const SH = (x: number) => (Math.exp(x) - Math.exp(-x)) / 2;
const CH = (x: number) => (Math.exp(x) + Math.exp(-x)) / 2;
const A5 = 2;
const AL5 = Math.log(A5 + Math.sqrt(A5 * A5 - 1));
const BE5 = Math.log(A5 + Math.sqrt(A5 * A5 + 1));
const TOP5 = (x: number) => Math.min(CH(x), A5);

export const kyodaiRikei2024: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "確率・極限",
      topics: ["立方体の塗り分け", "対面", "順列", "極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=4,5,6,7$ について $n^{6}$ 通りの塗り方をすべて列挙すると、条件をみたすのは $96,780,4080,15330$ 通りで、$ {}_{n}\\mathrm{P}_{3}+3\\,{}_{n}\\mathrm{P}_{4}+3\\,{}_{n}\\mathrm{P}_{5}+{}_{n}\\mathrm{P}_{6}$ と完全に一致した",
          "$p_4=\\frac{96}{4096}=\\frac{3}{128}$ を分数のまま確かめた",
          "$n=10,100,1000,10^{5}$ で $p_n=0.2578,\\,0.8857,\\,0.9881,\\,0.99988$ となり、$1$ に近づくことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p_4$ を求める`,
          answer: String.raw`$p_4=\dfrac{3}{128}$`,
          approach: String.raw`立方体では「辺を共有する」と「向かい合っていない」が同じことである。だから条件は「向かい合う3組が使う色の集合が互いに素」であり、各組が使う色の個数（$1$ か $2$）で場合分けすればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`立方体の面は、向かい合う2面どうしだけが辺を共有しない。向かい合う3組を $\mathrm{P},\mathrm{Q},\mathrm{R}$ とすると、条件は「異なる組に属する2面はつねに違う色」、すなわち`,
            },
            { k: "math", t: String.raw`\text{3組が使う色の集合が互いに素}` },
            {
              k: "p",
              t: String.raw`である。同じ組の2面は、同じ色でも違う色でもよい。各組が使う色の個数を $k_1,k_2,k_3\in\{1,2\}$ とすると $k_1+k_2+k_3\le n$ が必要である。`,
            },
            { k: "p", t: String.raw`**$n=4$ のとき。** $k_1+k_2+k_3\le4$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$(1,1,1)$：3組に相異なる3色を割り当てて $4\cdot3\cdot2=24$ 通り。`,
                String.raw`$(2,1,1)$ とその並べ替え：2色を使う組を選んで $3$ 通り、その組の2面に相異なる2色を順番込みで塗って $4\cdot3=12$ 通り、残り2組に残りの $2$ 色を割り当てて $2$ 通り。合わせて $3\cdot12\cdot2=72$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`合計 $24+72=96$ 通りで、全体は $4^{6}=4096$ 通りだから` },
            { k: "math", t: String.raw`p_4=\frac{96}{4096}=\frac{3}{128}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`一般に、$k_1+k_2+k_3=K$ となる組は $K=3,4,5,6$ でそれぞれ $1,3,3,1$ 通りあり、色の割り当ては $ {}_{n}\mathrm{P}_{K}$ 通りなので`,
            },
            {
              k: "math",
              t: String.raw`n^{6}p_n={}_{n}\mathrm{P}_{3}+3\,{}_{n}\mathrm{P}_{4}+3\,{}_{n}\mathrm{P}_{5}+{}_{n}\mathrm{P}_{6}`,
            },
            { k: "p", t: String.raw`となる。(2) ではこの式を使う。` },
          ],
          pitfalls: [
            String.raw`2色を使う組では、どちらの面にどちらの色を塗るかで $2$ 通りある。面に区別があるので、色の組だけ数えない。`,
            String.raw`$(2,2,1)$ は色を $5$ 個使うので $n=4$ では不可能。先に $k_1+k_2+k_3\le n$ で絞る。`,
          ],
          check: String.raw`$4^{6}=4096$ 通りを全探索すると、条件をみたすのはちょうど $96$ 通りだった。$n=5,6,7$ でも $780,4080,15330$ 通りで、上の一般式と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}p_n$ を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`(1) の一般式を $n^{6}$ で割る。$ {}_{n}\mathrm{P}_{K}$ は $n$ の $K$ 次式なので、$n^{6}$ で割ったとき残るのは $K=6$ の項だけである。`,
          blocks: [
            { k: "p", t: String.raw`(1) の式から` },
            {
              k: "math",
              t: String.raw`p_n=\frac{{}_{n}\mathrm{P}_{3}+3\,{}_{n}\mathrm{P}_{4}+3\,{}_{n}\mathrm{P}_{5}+{}_{n}\mathrm{P}_{6}}{n^{6}}`,
            },
            { k: "p", t: String.raw`である。$K\le6$ のとき $ {}_{n}\mathrm{P}_{K}\le n^{K}$ なので、$K\le5$ の項は` },
            {
              k: "math",
              t: String.raw`0\le\frac{{}_{n}\mathrm{P}_{K}}{n^{6}}\le\frac{n^{K}}{n^{6}}=\frac1{n^{6-K}}\xrightarrow[n\to\infty]{}0`,
            },
            { k: "p", t: String.raw`である。残る $K=6$ の項は` },
            {
              k: "math",
              t: String.raw`\frac{{}_{n}\mathrm{P}_{6}}{n^{6}}=\frac{n(n-1)(n-2)(n-3)(n-4)(n-5)}{n^{6}}=\prod_{j=0}^{5}\left(1-\frac jn\right)\xrightarrow[n\to\infty]{}1`,
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`\lim_{n\to\infty}p_n=1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`意味を考えれば当たり前で、色数が多ければ6面がすべて違う色になる確率が $1$ に近づき、そのときは条件が自動的にみたされる。実際 $ {}_{n}\mathrm{P}_{6}/n^{6}$ が「6面すべて違う色」の確率である。`,
            },
          ],
          pitfalls: [
            String.raw`$ {}_{n}\mathrm{P}_{5}/n^{6}$ などは $\frac1n$ の程度で $0$ に行く。$0$ でない極限をもつのは最高次の項だけ、という見方をする。`,
            String.raw`$\prod\left(1-\frac jn\right)$ は有限個（6個）の積なので、各因子の極限を掛けてよい。`,
          ],
          check: String.raw`$n=10$ で $p_n=0.2578$、$n=100$ で $0.8857$、$n=1000$ で $0.9881$、$n=10^{5}$ で $0.99988$ と、$1$ に近づいていく。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["円板と円", "和の動く範囲", "円環", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$|x|\\le2$ と $|y-(8+6i)|=3$ をみたす $(x,y)$ を $30$ 万組とり、$z=\\frac{x+y}{2}$ の中心 $4+3i$ からの距離を計算すると、すべて $\\frac12$ 以上 $\\frac52$ 以下だった",
          "面積 $\\pi\\left(\\frac52\\right)^{2}-\\pi\\left(\\frac12\\right)^{2}=6\\pi=18.8496$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$|x|\le2$、$\left|y-(8+6i)\right|=3$ のとき $z=\dfrac{x+y}{2}$ の動く領域を図示し、面積を求める`,
          answer: String.raw`中心 $4+3i$、内半径 $\dfrac12$、外半径 $\dfrac52$ の円環（境界を含む）。面積は $6\pi$`,
          approach: String.raw`$z=\dfrac x2+\dfrac y2$ と分けると、$\dfrac x2$ は原点中心・半径 $1$ の円板を、$\dfrac y2$ は中心 $4+3i$・半径 $\dfrac32$ の円周を動く。円周上の点に「半径 $1$ 以内のずれ」を足すのだから、中心からの距離は $\dfrac32-1$ から $\dfrac32+1$ までを動く。`,
          blocks: [
            { k: "p", t: String.raw`$z=\dfrac x2+\dfrac y2$ と分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$\left|\dfrac x2\right|\le1$：$\dfrac x2$ は原点中心・半径 $1$ の**円板**（内部と周）を動く。`,
                String.raw`$\left|\dfrac y2-(4+3i)\right|=\dfrac32$：$\dfrac y2$ は中心 $4+3i$・半径 $\dfrac32$ の**円周**を動く。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**距離を押さえる。** $w=\dfrac y2$、$u=\dfrac x2$、$\gamma=4+3i$ とおくと $z=w+u$ で`,
            },
            {
              k: "math",
              t: String.raw`\left|z-\gamma\right|=\left|(w-\gamma)+u\right|`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|w-\gamma\right|=\dfrac32$、$|u|\le1$ なので、三角不等式より`,
            },
            {
              k: "math",
              t: String.raw`\frac32-1\le\left|z-\gamma\right|\le\frac32+1,\qquad\text{すなわち}\qquad\frac12\le\left|z-\gamma\right|\le\frac52`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**逆に、この円環のすべての点がとれる。** $\dfrac12\le r\le\dfrac52$、$\theta$ を任意として $z=\gamma+re^{i\theta}$ とする。$w=\gamma+\dfrac32e^{i\theta}$ ととれば $\left|w-\gamma\right|=\dfrac32$ をみたし、`,
            },
            {
              k: "math",
              t: String.raw`u=z-w=\left(r-\frac32\right)e^{i\theta},\qquad|u|=\left|r-\frac32\right|\le1`,
            },
            {
              k: "p",
              t: String.raw`なので $u$ は半径 $1$ の円板に入る。つまり $x=2u$、$y=2w$ が条件をみたし、この $z$ は実現する。`,
            },
            { k: "p", t: String.raw`よって $z$ の動く領域は` },
            {
              k: "math",
              t: String.raw`\frac12\le\left|z-(4+3i)\right|\le\frac52`,
            },
            { k: "p", t: String.raw`という円環（境界を含む）で、面積は` },
            {
              k: "math",
              t: String.raw`\pi\left(\frac52\right)^{2}-\pi\left(\frac12\right)^{2}=\frac{25\pi}{4}-\frac{\pi}{4}=6\pi`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$z$ の動く領域。中心 $4+3i$ の円環で、内半径 $\frac12$、外半径 $\frac52$。境界も含む。面積は $6\pi=18.85$。`,
                view: [0.6, 7.6, -0.1, 6.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: outU, bottom: outL, from: CX - RO, to: CX - RI },
                  { k: "fillBetween", top: outU, bottom: outL, from: CX + RI, to: CX + RO },
                  { k: "fillBetween", top: outU, bottom: innU, from: CX - RI, to: CX + RI },
                  { k: "fillBetween", top: innL, bottom: outL, from: CX - RI, to: CX + RI },
                  { k: "param", f: circ(RO), from: 0, to: 2 * Math.PI },
                  { k: "param", f: circ(RI), from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [CX, CY] },
                  { k: "text", at: [CX + RI + 0.12, CY], label: "中心 4 + 3i", place: "right" },
                  { k: "text", at: [CX, CY + RO], label: "半径 5/2", place: "above" },
                  { k: "text", at: [CX, CY - RI], label: "半径 1/2", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$y$ は円**周**（$=3$）であって円板ではない。だから内側に穴が開く。$|y-(8+6i)|\le3$ だったら穴のない半径 $\frac52$ の円板になる。`,
            String.raw`$z=\frac{x+y}{2}$ なので、$x$ も $y$ も $\frac12$ 倍してから足す。半径も $\frac12$ 倍になる。`,
            String.raw`「領域を図示せよ」なので、三角不等式による「入る」だけでなく、円環のすべての点が実際にとれることも示す。向きをそろえて $w$ を選ぶのがこつである。`,
          ],
          check: String.raw`$|x|\le2$、$\left|y-(8+6i)\right|=3$ をみたす $(x,y)$ を $30$ 万組ランダムにとって $z=\frac{x+y}{2}$ を計算すると、$\left|z-(4+3i)\right|$ はすべて $\frac12$ 以上 $\frac52$ 以下に収まった。面積は $6\pi=18.8496$ である。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["ねじれの位置", "1次独立", "行列式", "共面条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{OA}},\\overrightarrow{\\mathrm{OB}},\\overrightarrow{\\mathrm{OC}}$ を基本ベクトルにとり、$x,y$ を $-5$ から $5$ まで $0.25$ 刻みの $1681$ 組で $\\overrightarrow{\\mathrm{PX}},\\overrightarrow{\\mathrm{QY}},\\overrightarrow{\\mathrm{PQ}}$ の行列式が $0$ かどうかを調べると、「$x\\ne y$」と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`直線 $\mathrm{QY}$ と直線 $\mathrm{PX}$ がねじれの位置にあるための $x,y$ の必要十分条件を求める`,
          answer: String.raw`$x\ne y$`,
          approach: String.raw`2直線がねじれの位置にあるとは「同一平面上にない」ことである。$\overrightarrow{\mathrm{PX}}$、$\overrightarrow{\mathrm{QY}}$、$\overrightarrow{\mathrm{PQ}}$ の3本が1次独立かどうかを見ればよく、$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}},\overrightarrow{\mathrm{OC}}$ を座標軸だと思って成分を並べれば、行列式1本の計算になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおく。4点が同一平面上にないので $\vec a,\vec b,\vec c$ は1次独立である。条件より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac{\vec a}{2},\quad\overrightarrow{\mathrm{OQ}}=\frac{\vec a+\vec b}{2},\quad\overrightarrow{\mathrm{OX}}=x\vec c,\quad\overrightarrow{\mathrm{OY}}=(1-y)\vec b+y\vec c`,
            },
            {
              k: "p",
              t: String.raw`である（$\overrightarrow{\mathrm{BY}}=y\overrightarrow{\mathrm{BC}}$ より $\overrightarrow{\mathrm{OY}}=\vec b+y\left(\vec c-\vec b\right)$）。`,
            },
            { k: "p", t: String.raw`**3本のベクトル。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\overrightarrow{\mathrm{PX}}&=x\vec c-\frac{\vec a}{2}&&=\left(-\tfrac12,\;0,\;x\right)\\[1mm]
\overrightarrow{\mathrm{QY}}&=-\frac{\vec a}{2}+\left(\tfrac12-y\right)\vec b+y\vec c&&=\left(-\tfrac12,\;\tfrac12-y,\;y\right)\\[1mm]
\overrightarrow{\mathrm{PQ}}&=\frac{\vec b}{2}&&=\left(0,\;\tfrac12,\;0\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`（成分は $\vec a,\vec b,\vec c$ の係数）。なお $\overrightarrow{\mathrm{PX}}$ も $\overrightarrow{\mathrm{QY}}$ も $\vec a$ の係数が $-\dfrac12\ne0$ なので $\vec0$ ではなく、2本とも直線として定まる。`,
            },
            {
              k: "p",
              t: String.raw`**ねじれの位置の言いかえ。** 2直線がねじれの位置にあるのは、同一平面上にないとき、すなわち上の3本が1次独立なときである。行列式を計算すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{vmatrix}-\frac12&0&x\\-\frac12&\frac12-y&y\\0&\frac12&0\end{vmatrix}=-\frac12\cdot\left(-\frac y2\right)+\frac12\cdot\left(-\frac x2\right)=\frac{y-x}{4}`,
            },
            { k: "p", t: String.raw`である。よって1次独立であることは $y-x\ne0$、すなわち` },
            { k: "math", t: String.raw`x\ne y` },
            { k: "p", t: String.raw`と同値である。これが求める必要十分条件である。` },
            {
              k: "note",
              t: String.raw`行列式を使わないなら、$\overrightarrow{\mathrm{PQ}}=s\overrightarrow{\mathrm{PX}}+t\overrightarrow{\mathrm{QY}}$ とおいて成分を比べればよい。$\vec a$ の成分から $s+t=0$、$\vec c$ の成分から $sx+ty=0$ となり、$t=-s$ を入れて $s(x-y)=0$。$\vec b$ の成分 $\frac12=t\left(\frac12-y\right)$ より $t\ne0$ なので $s\ne0$ で、$x=y$ が必要十分になる。`,
            },
          ],
          pitfalls: [
            String.raw`「ねじれの位置」は「平行でなく、交わらない」ことで、まとめると「同一平面上にない」である。平行の場合と交わる場合を別々に調べると長くなる。`,
            String.raw`$\overrightarrow{\mathrm{PQ}}$ は2直線上の点を結ぶベクトルなら何でもよい。ここでは $\mathrm{P}$ と $\mathrm{Q}$ を結ぶのがいちばん簡単で、$\frac{\vec b}{2}$ になる。`,
            String.raw`$x=y$ のときは実際に交わるか平行になる。たとえば $x=y=0$ なら $\mathrm{X}=\mathrm{O}$、$\mathrm{Y}=\mathrm{B}$ で、直線 $\mathrm{PX}$（$=$ 直線 $\mathrm{OA}$）と直線 $\mathrm{QB}$ は点 $\mathrm{A}$ で交わる。`,
          ],
          check: String.raw`$\vec a,\vec b,\vec c$ を基本ベクトルにとり、$x,y$ を $-5$ から $5$ まで $0.25$ 刻みの $1681$ 組で行列式を計算すると、$0$ になるのはちょうど $x=y$ の組だけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数・数列",
      topics: ["偶奇", "合同式", "帰納法", "2のべき"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a_0$ を $1$ から $10^{6}$ まで動かして「先頭から何項が奇数か」を直接数えると、$4$ 項以上奇数になる最小は $15$、$11$ 項以上奇数になる最小は $2047$ であることを確かめた",
          "$a_0=15$ の列が $15,23,35,53,80,\\dots$（$a_4$ で偶数）、$a_0=2047$ の列が $2047,3071,\\dots,118097,177146$（$a_{11}$ で偶数）になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_0,a_1,a_2,a_3$ がすべて奇数となる最小の自然数 $a_0$ を求める`,
          answer: String.raw`$a_0=15$`,
          approach: String.raw`$a_n$ が奇数のときの次の項は $\frac{3a_n+1}{2}$ で、これが奇数になる条件を $a_n$ の $4$ を法とする余りで書くと $a_n\equiv3\pmod4$ となる。これを繰り返すと、法が $8,16,\dots$ と倍々になっていく。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_n$ が奇数のとき $a_{n+1}=\dfrac{3a_n+1}{2}$ である。これが奇数になる条件は $3a_n+1\equiv2\pmod4$、すなわち $3a_n\equiv1\pmod4$ で、$3\cdot3=9\equiv1$ だから`,
            },
            { k: "math", t: String.raw`a_n\equiv3\pmod4` },
            { k: "p", t: String.raw`である。これを順に使う。` },
            {
              k: "steps",
              items: [
                String.raw`$a_0,a_1$ が奇数：$a_0\equiv3\pmod4$。$a_0=4t+3$ と書ける。`,
                String.raw`$a_1=\dfrac{3(4t+3)+1}{2}=6t+5$。$a_2$ も奇数には $a_1\equiv3\pmod4$、つまり $6t+5\equiv3$、$2t\equiv2\pmod4$ より $t$ は奇数。$t=2s+1$ として $a_0=8s+7$。`,
                String.raw`$a_1=12s+11$、$a_2=\dfrac{3(12s+11)+1}{2}=18s+17$。$a_3$ も奇数には $18s+17\equiv3\pmod4$、つまり $2s\equiv2\pmod4$ より $s$ は奇数。$s=2u+1$ として $a_0=16u+15$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $a_0\equiv15\pmod{16}$ が必要十分で、最小の自然数は`,
            },
            { k: "math", t: String.raw`a_0=15` },
            {
              k: "p",
              t: String.raw`である。実際 $15\to23\to35\to53$ はすべて奇数である（次の $a_4=80$ は偶数）。`,
            },
          ],
          pitfalls: [
            String.raw`「$a_n$ が奇数」だけでは次が奇数とは限らない。$a_n\equiv3\pmod4$ が次の項の奇数条件である。`,
            String.raw`毎回「$2t\equiv2\pmod4$」の形が出て $t$ の偶奇が決まり、法が $2$ 倍になる。この構造に気づけば (2) も同じ手で進む。`,
          ],
          check: String.raw`$a_0$ を $1$ から $10^{6}$ まで動かして先頭から何項が奇数かを直接数えると、$4$ 項以上が奇数になる最小の $a_0$ は $15$ だった。$15\to23\to35\to53\to80$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_0,a_1,\dots,a_{10}$ がすべて奇数となる最小の自然数 $a_0$ を求める`,
          answer: String.raw`$a_0=2^{11}-1=2047$`,
          approach: String.raw`(1) の計算を続けてもよいが、$a_0=2^{k+1}-1$ とおいて一般項を求めてしまうほうが早い。実際 $a_j=3^{j}\cdot2^{k+1-j}-1$ となり、偶奇が指数で読める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の繰り返しから、$a_0,\dots,a_k$ がすべて奇数になる条件は $a_0\equiv2^{k+1}-1\pmod{2^{k+1}}$ だと予想できる。これを確かめる。`,
            },
            {
              k: "p",
              t: String.raw`**$a_0=2^{k+1}-1$ のとき。** $j=0,1,\dots,k+1$ に対して`,
            },
            { k: "math", t: String.raw`a_j=3^{j}\cdot2^{k+1-j}-1` },
            { k: "p", t: String.raw`であることを帰納法で示す。$j=0$ は定義どおり。$a_j$ が奇数なら` },
            {
              k: "math",
              t: String.raw`a_{j+1}=\frac{3a_j+1}{2}=\frac{3^{j+1}2^{k+1-j}-3+1}{2}=3^{j+1}2^{k-j}-1`,
            },
            {
              k: "p",
              t: String.raw`となり、形が保たれる。$a_j$ の偶奇は $3^{j}2^{k+1-j}$ の偶奇で決まるので、$j\le k$ なら $2$ のべきが残って偶数、したがって $a_j$ は奇数である。$j=k+1$ では $a_{k+1}=3^{k+1}-1$ で偶数になる。`,
            },
            {
              k: "p",
              t: String.raw`**最小性。** (1) と同じ議論を $k$ 回繰り返すと、$a_0,\dots,a_k$ がすべて奇数である条件は $a_0\equiv2^{k+1}-1\pmod{2^{k+1}}$ であり、自然数の最小は $2^{k+1}-1$ である。`,
            },
            {
              k: "p",
              t: String.raw`$a_0,\dots,a_{10}$ がすべて奇数なので $k=10$、したがって`,
            },
            { k: "math", t: String.raw`a_0=2^{11}-1=2047` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a_0=2047$ の列は $2047,3071,4607,6911,10367,15551,23327,34991,52487,78731,118097$ と $11$ 項が奇数で、$a_{11}=177146$ で偶数になる。$a_j=3^{j}2^{11-j}-1$ に $j=10$ を入れると $3^{10}\cdot2-1=118097$ で合っている。`,
            },
          ],
          pitfalls: [
            String.raw`$a_j=3^{j}2^{k+1-j}-1$ の形を見つけると、偶奇が $2$ の指数だけで決まるので議論が一気に短くなる。`,
            String.raw`「$a_0,\dots,a_{10}$ がすべて奇数」は $11$ 項なので $k=10$ である。$2^{10}-1=1023$ としない。`,
            String.raw`最小性は、各ステップで法が $2$ 倍になる (1) の議論から従う。「$2^{k+1}-1$ でうまくいく」だけでは最小だと言えない。`,
          ],
          check: String.raw`$a_0$ を $1$ から $10^{6}$ まで動かすと、$11$ 項以上が奇数になる最小の $a_0$ は $2047$ だった。$2047=2^{11}-1$ である。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["指数関数で囲まれた領域", "面積", "極限", "逆関数の値"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1,1.5,2,5,20$ について領域の面積を $200$ 万点の数値積分で求めると $0.467160025,\\,0.663767702,\\,0.749337987,\\,0.899993331,\\,0.974999993$ となり、導いた式の値と小数9桁まで一致した",
          "$a=10,100,10^{4},10^{8}$ で $S_a=0.94999979,\\,0.99500000,\\,0.99995000,\\,1.00000000$ となり、$1$ に近づくことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$D_a$ の面積 $S_a$ を求める`,
          answer: String.raw`$S_a=1+\sqrt{a^{2}-1}-\sqrt{a^{2}+1}+a\log\dfrac{a+\sqrt{a^{2}+1}}{a+\sqrt{a^{2}-1}}$`,
          approach: String.raw`$\frac{e^{x}-e^{-x}}{2}$ と $\frac{e^{x}+e^{-x}}{2}$ の差は $e^{-x}$ でとても簡単である。上の境界が $\frac{e^{x}+e^{-x}}{2}$ から $y=a$ に切り替わる $x$ で区間を2つに分ければ、どちらも素直に積分できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$s(x)=\dfrac{e^{x}-e^{-x}}{2}$、$c(x)=\dfrac{e^{x}+e^{-x}}{2}$ とおく。$c(x)-s(x)=e^{-x}$、$c(x)^{2}-s(x)^{2}=1$、$c'=s$、$s'=c$ である。`,
            },
            {
              k: "p",
              t: String.raw`$x\ge0$ では $s,c$ とも増加で、$c(x)=a$ となる $x$ を $\alpha$、$s(x)=a$ となる $x$ を $\beta$ とすると、$c>s$ より $\alpha<\beta$ である。$e^{\alpha}=a+\sqrt{a^{2}-1}$、$e^{\beta}=a+\sqrt{a^{2}+1}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\alpha=\log\left(a+\sqrt{a^{2}-1}\right),\qquad\beta=\log\left(a+\sqrt{a^{2}+1}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**領域の形。** $D_a$ は $x\ge0$ で $s(x)\le y\le\min\left(c(x),a\right)$ の部分である。$x>\beta$ では $s(x)>a$ となり空になるので、$0\le x\le\beta$ だけを考えればよい。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\le x\le\alpha$：上は $c(x)$。高さは $c(x)-s(x)=e^{-x}$。`,
                String.raw`$\alpha\le x\le\beta$：上は $a$。高さは $a-s(x)$。`,
              ],
            },
            { k: "p", t: String.raw`**積分する。** ` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\alpha}e^{-x}dx=1-e^{-\alpha}=1-\left(a-\sqrt{a^{2}-1}\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$e^{-\alpha}=\dfrac{1}{a+\sqrt{a^{2}-1}}=a-\sqrt{a^{2}-1}$）。また $\displaystyle\int s=c$ なので`,
            },
            {
              k: "math",
              t: String.raw`\int_{\alpha}^{\beta}\left(a-s(x)\right)dx=a(\beta-\alpha)-\left(c(\beta)-c(\alpha)\right)=a(\beta-\alpha)-\sqrt{a^{2}+1}+a`,
            },
            {
              k: "p",
              t: String.raw`である（$c(\beta)=\sqrt{1+s(\beta)^{2}}=\sqrt{1+a^{2}}$、$c(\alpha)=a$）。合わせると`,
            },
            {
              k: "math",
              t: String.raw`S_a=1+\sqrt{a^{2}-1}-\sqrt{a^{2}+1}+a\log\frac{a+\sqrt{a^{2}+1}}{a+\sqrt{a^{2}-1}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=2$ のときの $D_a$。下の境界は $y=\frac{e^{x}-e^{-x}}{2}$、上の境界は $x\le\alpha$ で $y=\frac{e^{x}+e^{-x}}{2}$、$\alpha\le x\le\beta$ で $y=a$。$\alpha=1.317$、$\beta=1.444$。`,
                view: [-0.4, 3.0, -0.25, 2.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: TOP5, bottom: SH, from: 0, to: BE5 },
                  { k: "curve", f: SH, from: 0, to: 1.6 },
                  { k: "curve", f: CH, from: 0, to: 1.6 },
                  { k: "seg", a: [0, A5], b: [2.9, A5], dash: true, faint: true },
                  { k: "dot", at: [AL5, A5], label: "α", place: "above-left" },
                  { k: "dot", at: [BE5, A5], label: "β", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                  { k: "text", at: [1.6, CH(1.6)], label: "cosh", place: "right" },
                  { k: "text", at: [1.6, SH(1.6)], label: "sinh", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$y\le a$ が効き始めるのは $x=\alpha$ からで、領域が消えるのは $x=\beta$ である。$\alpha$ と $\beta$ を取り違えない（$c>s$ なので $\alpha<\beta$）。`,
            String.raw`$c(x)-s(x)=e^{-x}$ はこの問題のいちばんおいしいところである。差を展開してから積分しない。`,
            String.raw`$e^{-\alpha}=a-\sqrt{a^{2}-1}$ は $\left(a+\sqrt{a^{2}-1}\right)\left(a-\sqrt{a^{2}-1}\right)=1$ から出る。有理化の形で覚えておくと速い。`,
            String.raw`$a=1$ のときは $\alpha=0$ で、最初の積分が消える。式はそのまま使える。`,
          ],
          check: String.raw`$a=2$ のとき $\alpha=1.316958$、$\beta=1.443635$ で、式の値は $0.749337987$。$200$ 万点の数値積分でも $0.749337987$ になる。$a=1,1.5,5,20$ でも小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{a\to\infty}S_a$ を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`(1) の式を3つの部分に分けて、それぞれの極限を見る。根号の差は有理化、$\log$ の項は $\log(1+t)\approx t$ の形に持ち込む。意味を考えると、$a\to\infty$ では領域が「$y=\frac{e^{x}+e^{-x}}{2}$ と $y=\frac{e^{x}-e^{-x}}{2}$ ではさまれた帯」全体に近づき、その面積は $\int_0^\infty e^{-x}dx=1$ である。`,
          blocks: [
            { k: "p", t: String.raw`(1) の式を項ごとに見る。` },
            { k: "p", t: String.raw`**根号の差。** 有理化すると` },
            {
              k: "math",
              t: String.raw`\sqrt{a^{2}-1}-\sqrt{a^{2}+1}=\frac{-2}{\sqrt{a^{2}-1}+\sqrt{a^{2}+1}}\xrightarrow[a\to\infty]{}0`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$\log$ の項。** 分母分子を $a$ で割ると` },
            {
              k: "math",
              t: String.raw`\frac{a+\sqrt{a^{2}+1}}{a+\sqrt{a^{2}-1}}=\frac{1+\sqrt{1+\frac1{a^{2}}}}{1+\sqrt{1-\frac1{a^{2}}}}`,
            },
            {
              k: "p",
              t: String.raw`で、$t=\dfrac1{a^{2}}$ とおくと $\sqrt{1\pm t}=1\pm\dfrac t2+O\!\left(t^{2}\right)$ だから、この比は $1+\dfrac t2+O\!\left(t^{2}\right)$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`a\log\frac{a+\sqrt{a^{2}+1}}{a+\sqrt{a^{2}-1}}=a\left(\frac{1}{2a^{2}}+O\!\left(\frac1{a^{4}}\right)\right)=\frac1{2a}+O\!\left(\frac1{a^{3}}\right)\xrightarrow[a\to\infty]{}0`,
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`\lim_{a\to\infty}S_a=1+0+0=1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`はさみうちで示すこともできる。$D_a\subset\left\{x\ge0,\;s(x)\le y\le c(x)\right\}$ なので $S_a\le\int_{0}^{\infty}e^{-x}dx=1$ であり、いっぽう $D_a\supset\left\{0\le x\le\alpha,\;s(x)\le y\le c(x)\right\}$ なので $S_a\ge1-e^{-\alpha}\to1$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$a\log(\cdots)$ は $\infty\times0$ の形である。$\log$ の中身を $1+\frac{1}{2a^{2}}+\cdots$ と展開してから掛ける。`,
            String.raw`$\sqrt{a^{2}-1}-\sqrt{a^{2}+1}$ をそのまま $\infty-\infty$ と見ない。有理化すれば $0$ に行くことがすぐ分かる。`,
            String.raw`上の note のはさみうちなら (1) の式を使わずに済む。(2) だけなら、こちらのほうが短い。`,
          ],
          check: String.raw`$a=10$ で $S_a=0.9499998$、$a=100$ で $0.9950000$、$a=10^{4}$ で $0.9999500$、$a=10^{8}$ で $1.0000000$ となり、$1$ に近づく。$S_a\approx1-\frac{1}{2a}$ の形になっているのも、上の展開と合っている。`,
        },
      ],
    },
    {
      no: 6,
      field: "極限・対数",
      topics: ["桁数と常用対数", "最高位の数字", "個数の評価", "はさみうち"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$c=\\log_{2}10$ として $N_n,L_n$ を区間 $\\left[((n-1)c)^{2},(nc)^{2}\\right)$ の整数の個数として数えると、$n=10,50,200,1000,5000$ で $\\frac{L_n}{N_n}=0.29048,\\,0.29918,\\,0.30048,\\,0.30095,\\,0.30101$ となり $\\log_{10}2=0.30103$ に近づいた",
          "$n=3,4,5,6$ については $2^{\\sqrt k}$ を直接計算して桁数と最高位を調べ、同じ $N_n,L_n$ が得られることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a_k=2^{\sqrt k}$ について、整数部分が $n$ 桁である $k$ の個数 $N_n$ と、そのうち最高位が $1$ である $k$ の個数 $L_n$ の比の極限を求める`,
          answer: String.raw`$\displaystyle\lim_{n\to\infty}\frac{L_n}{N_n}=\log_{10}2$`,
          approach: String.raw`桁数の条件も最高位の条件も、$\log_{10}a_k=\sqrt k\log_{10}2$ の範囲の条件になる。$\sqrt k$ の範囲は区間なので、$k$ の範囲はその2乗の区間であり、整数の個数は区間の長さ $\pm1$ で押さえられる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$c=\log_{2}10=\dfrac{1}{\log_{10}2}$ とおく（$c=3.3219\cdots$）。$a_k=2^{\sqrt k}$ の整数部分が $n$ 桁であることは`,
            },
            {
              k: "math",
              t: String.raw`10^{n-1}\le2^{\sqrt k}<10^{n}\quad\Longleftrightarrow\quad(n-1)c\le\sqrt k<nc`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left((n-1)c\right)^{2}\le k<\left(nc\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`と同値である。最高位の数字が $1$ であることは $10^{n-1}\le2^{\sqrt k}<2\cdot10^{n-1}$、つまり`,
            },
            {
              k: "math",
              t: String.raw`(n-1)c\le\sqrt k<(n-1)c+1\quad\Longleftrightarrow\quad\left((n-1)c\right)^{2}\le k<\left((n-1)c+1\right)^{2}`,
            },
            { k: "p", t: String.raw`と同値である（$\log_{2}\left(2\cdot10^{n-1}\right)=1+(n-1)c$）。` },
            {
              k: "p",
              t: String.raw`**個数を押さえる。** 長さ $\ell$ の区間に入る整数の個数は $\ell-1$ より大きく $\ell+1$ より小さい。区間の長さはそれぞれ`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
(nc)^{2}-\left((n-1)c\right)^{2}&=c^{2}(2n-1)\\[1mm]
\left((n-1)c+1\right)^{2}-\left((n-1)c\right)^{2}&=2(n-1)c+1
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\left|N_n-c^{2}(2n-1)\right|<1,\qquad\left|L_n-\left(2(n-1)c+1\right)\right|<1`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{L_n}{N_n}=\frac{2(n-1)c+1+O(1)}{c^{2}(2n-1)+O(1)}`,
            },
            { k: "p", t: String.raw`で、分母分子を $n$ で割って $n\to\infty$ とすると` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{L_n}{N_n}=\frac{2c}{2c^{2}}=\frac1c=\log_{10}2`,
            },
            { k: "p", t: String.raw`である（$0.3010\cdots$）。` },
            {
              k: "note",
              t: String.raw`$\sqrt k$ が等間隔に近く分布するので、$\log_{10}a_k$ の小数部分が一様に散らばり、最高位が $1$ になる割合が $\log_{10}2$ になる。いわゆるベンフォードの法則と同じ理屈である。`,
            },
          ],
          pitfalls: [
            String.raw`$k$ の区間は $\sqrt k$ の区間を2乗したもので、長さは $2$ 倍ではなく $\left(nc\right)^{2}-\left((n-1)c\right)^{2}=c^{2}(2n-1)$ である。$n$ に比例して伸びる。`,
            String.raw`整数の個数は区間の長さ $\pm1$ で押さえる。端の扱いを厳密に書こうとすると床関数だらけになるので、誤差 $1$ 以内であることだけ言えばよい（極限では消える）。`,
            String.raw`最高位が $1$ の区間は $\sqrt k$ の側で長さ $1$（$\log_{2}2=1$）である。ここが $\log_{10}2$ の正体で、$k$ の側では長さ $2(n-1)c+1$ になる。`,
            String.raw`$c=\log_{2}10$ と $\log_{10}2=\frac1c$ を取り違えない。答えは $\frac1c$ のほうである。`,
          ],
          check: String.raw`$N_n,L_n$ を区間の整数の個数として数えると、$n=10$ で $\frac{61}{210}=0.29048$、$n=200$ で $\frac{1323}{4403}=0.30048$、$n=5000$ で $\frac{33214}{110341}=0.30101$ となり、$\log_{10}2=0.30103$ に近づく。$n=3,4,5,6$ では $2^{\sqrt k}$ を直接計算しても同じ $N_n,L_n$ が得られた。`,
        },
      ],
    },
  ],
};
