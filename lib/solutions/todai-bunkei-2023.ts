import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2023年度（令和5年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 *
 * 第3問は理科の第2問とまったく同じ問題なので、解説もそちらと同じ内容を置いている。
 */

/** 第2問の図。$g(a)-f(a)$ の中身。 */
const H2 = (a: number) => (-a * a * a + 6 * a * a - 6 * a + 4) / Math.sqrt(5);

/** 第4問の図。$yz$ 平面での断面に出てくる値。 */
const HH = Math.sqrt(11 / 12);
const YC = 2 / Math.sqrt(3);

export const todaiBunkei2023: SolutionSet = {
  slug: "todai-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次方程式",
      topics: ["解と係数の関係", "対称式", "相加相乗平均", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$k$ を $2$ から $32$ まで $150$ 万等分して $\\frac{\\alpha^{3}}{1-\\beta}+\\frac{\\beta^{3}}{1-\\alpha}$ を解から直接計算すると、最小 $28.856406461$ を $k=5.464100$ でとり、$15+8\\sqrt3=28.856406461$、$2+2\\sqrt3=5.464102$ と一致することを確かめた",
          "$k=2.5,3,4,6$ で、解から直接計算した値と $2u+15+\\frac{24}{u}$（$u=k-2$）が小数8桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$k>2$ で $\dfrac{\alpha^{3}}{1-\beta}+\dfrac{\beta^{3}}{1-\alpha}$ の最小値を求める`,
          answer: String.raw`$15+8\sqrt3$（$k=2+2\sqrt3$ のとき）`,
          approach: String.raw`$\alpha,\beta$ は対称に現れるので、通分すれば分母も分子も対称式になり、解と係数の関係だけで $k$ の式に直せる。出てきた分数式は $u=k-2$ とおくと $2u+\dfrac{24}{u}+15$ の形になり、相加相乗平均で最小が出る。`,
          blocks: [
            { k: "p", t: String.raw`解と係数の関係より $\alpha+\beta=-1$、$\alpha\beta=-k$ である。$k>0$ なので判別式 $1+4k>0$ で、2つの実数解をもつ。` },
            { k: "p", t: String.raw`**通分する。** 分母は` },
            {
              k: "math",
              t: String.raw`(1-\beta)(1-\alpha)=1-(\alpha+\beta)+\alpha\beta=1+1-k=2-k`,
            },
            { k: "p", t: String.raw`で、$k>2$ より $0$ ではない。分子は` },
            {
              k: "math",
              t: String.raw`\alpha^{3}(1-\alpha)+\beta^{3}(1-\beta)=\left(\alpha^{3}+\beta^{3}\right)-\left(\alpha^{4}+\beta^{4}\right)`,
            },
            { k: "p", t: String.raw`である。基本対称式から順に計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\alpha^{2}+\beta^{2}&=(\alpha+\beta)^{2}-2\alpha\beta=1+2k\\[1mm]
\alpha^{3}+\beta^{3}&=(\alpha+\beta)^{3}-3\alpha\beta(\alpha+\beta)=-1-3k\\[1mm]
\alpha^{4}+\beta^{4}&=\left(\alpha^{2}+\beta^{2}\right)^{2}-2(\alpha\beta)^{2}=(1+2k)^{2}-2k^{2}=2k^{2}+4k+1
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、分子は $(-1-3k)-\left(2k^{2}+4k+1\right)=-2k^{2}-7k-2$ である。よって` },
            {
              k: "math",
              t: String.raw`\frac{\alpha^{3}}{1-\beta}+\frac{\beta^{3}}{1-\alpha}=\frac{-2k^{2}-7k-2}{2-k}=\frac{2k^{2}+7k+2}{k-2}`,
            },
            { k: "p", t: String.raw`となる。` },
            { k: "p", t: String.raw`**最小を出す。** $u=k-2>0$ とおくと $k=u+2$ で` },
            {
              k: "math",
              t: String.raw`2k^{2}+7k+2=2(u+2)^{2}+7(u+2)+2=2u^{2}+15u+24`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`\frac{2u^{2}+15u+24}{u}=2u+15+\frac{24}{u}`,
            },
            { k: "p", t: String.raw`である。$u>0$ なので相加相乗平均より` },
            {
              k: "math",
              t: String.raw`2u+\frac{24}{u}\ge2\sqrt{2u\cdot\frac{24}{u}}=2\sqrt{48}=8\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`で、等号は $2u=\dfrac{24}{u}$、すなわち $u^{2}=12$、$u=2\sqrt3$ のときに成り立つ。このとき $k=2+2\sqrt3>2$ で範囲に入っている。よって最小値は`,
            },
            { k: "math", t: String.raw`15+8\sqrt3` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`分母 $2-k$ は $k>2$ では負である。分子も負なので全体は正になるが、符号を見ずに約分すると間違えやすい。$\dfrac{2k^{2}+7k+2}{k-2}$ と書き直してから進める。`,
            String.raw`$u=k-2$ と置きかえるのが要点である。$k$ のままでは相加相乗平均の形にならない。`,
          ],
          check: String.raw`$k=4$（$u=2$）なら $2\cdot2+15+12=31$。解 $\alpha=\dfrac{-1+\sqrt{17}}{2}$、$\beta=\dfrac{-1-\sqrt{17}}{2}$ から直接計算しても $31.00000000$ になる。$k=2+2\sqrt3=5.4641$ では $28.8564065$ で、$15+8\sqrt3=28.8564065$ と一致する。$k$ を $150$ 万等分した全探索でも最小は同じ値・同じ $k$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["点と直線の距離", "絶対値を含む積分", "3次関数の増減", "最大最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f(t)=\\frac{3\\left|t(2-t)\\right|}{\\sqrt5}$ をシンプソン法で $-1$ から $a$ まで数値積分し、$a=-1,-0.5,0,0.7,1.5,2$ のすべてで $g(a)$ の式と小数9桁まで一致することを確かめた",
          "$0\\le a\\le2$ を $4$ 万等分して $g(a)-f(a)$ を全探索し、最大 $3.57770876$（$a=2$）、最小 $1.04788664$（$a=0.58580$）を得て、$\\frac{8}{\\sqrt5}$、$\\frac{8-4\\sqrt2}{\\sqrt5}$、$2-\\sqrt2=0.58579$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$-1\le a\le2$ に対し $g(a)=\displaystyle\int_{-1}^{a}f(t)\,dt$ を求める`,
          answer: String.raw`$g(a)=\begin{cases}\dfrac{a^{3}-3a^{2}+4}{\sqrt5}&(-1\le a\le0)\\[2mm]\dfrac{-a^{3}+3a^{2}+4}{\sqrt5}&(0\le a\le2)\end{cases}$`,
          approach: String.raw`点と直線の距離の公式で $f(t)$ を書くと絶対値がつく。中身 $t(2-t)$ の符号が $t=0$ で変わるので、積分の上端が $0$ より左か右かで式が分かれる。`,
          blocks: [
            { k: "p", t: String.raw`直線 $\ell$ は $2x-y=0$ だから、点 $\mathrm{P}\left(t,3t^{2}-4t\right)$ との距離は` },
            {
              k: "math",
              t: String.raw`f(t)=\frac{\left|2t-\left(3t^{2}-4t\right)\right|}{\sqrt{2^{2}+(-1)^{2}}}=\frac{\left|6t-3t^{2}\right|}{\sqrt5}=\frac{3\left|t(2-t)\right|}{\sqrt5}`,
            },
            { k: "p", t: String.raw`である。$t(2-t)$ は $0\le t\le2$ で $0$ 以上、それ以外で $0$ 以下なので` },
            {
              k: "math",
              t: String.raw`f(t)=\begin{cases}\dfrac{3\left(t^{2}-2t\right)}{\sqrt5}&(t\le0)\\[2mm]\dfrac{3\left(2t-t^{2}\right)}{\sqrt5}&(0\le t\le2)\end{cases}`,
            },
            { k: "p", t: String.raw`となる。$-1\le a\le0$ のときは` },
            {
              k: "math",
              t: String.raw`g(a)=\frac{3}{\sqrt5}\left[\frac{t^{3}}{3}-t^{2}\right]_{-1}^{a}=\frac{3}{\sqrt5}\left(\frac{a^{3}}{3}-a^{2}+\frac43\right)=\frac{a^{3}-3a^{2}+4}{\sqrt5}`,
            },
            { k: "p", t: String.raw`である。とくに $g(0)=\dfrac{4}{\sqrt5}$ で、$0\le a\le2$ のときは` },
            {
              k: "math",
              t: String.raw`g(a)=\frac{4}{\sqrt5}+\frac{3}{\sqrt5}\left[t^{2}-\frac{t^{3}}{3}\right]_{0}^{a}=\frac{4+3a^{2}-a^{3}}{\sqrt5}`,
            },
            { k: "p", t: String.raw`となる。$a=0$ ではどちらの式も $\dfrac{4}{\sqrt5}$ でつながっている。` },
          ],
          pitfalls: [
            String.raw`$f$ は距離なので $0$ 以上である。絶対値を外すときの符号を間違えると、$-1\le t\le0$ の部分で負になってしまう。`,
          ],
          check: String.raw`$a=2$ なら $g(2)=\dfrac{4+12-8}{\sqrt5}=\dfrac{8}{\sqrt5}=3.5777$。$f$ を数値積分しても $3.577708764$ で一致する。$a=-0.5$ では式が $1.397542486$、数値積分も同じ値になる。`,
        },
        {
          label: "(2)",
          task: String.raw`$0\le a\le2$ で $g(a)-f(a)$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{8}{\sqrt5}=\dfrac{8\sqrt5}{5}$（$a=2$）、最小値 $\dfrac{8-4\sqrt2}{\sqrt5}=\dfrac{\left(8-4\sqrt2\right)\sqrt5}{5}$（$a=2-\sqrt2$）`,
          approach: String.raw`$0\le a\le2$ では絶対値が外れているので、$g-f$ はただの3次式になる。微分して増減を調べればよい。`,
          blocks: [
            { k: "p", t: String.raw`$0\le a\le2$ では $f(a)=\dfrac{3\left(2a-a^{2}\right)}{\sqrt5}$ なので` },
            {
              k: "math",
              t: String.raw`g(a)-f(a)=\frac{\left(4+3a^{2}-a^{3}\right)-3\left(2a-a^{2}\right)}{\sqrt5}=\frac{-a^{3}+6a^{2}-6a+4}{\sqrt5}`,
            },
            { k: "p", t: String.raw`である。$h(a)=-a^{3}+6a^{2}-6a+4$ とおくと` },
            {
              k: "math",
              t: String.raw`h'(a)=-3a^{2}+12a-6=-3\left(a^{2}-4a+2\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$a^{2}-4a+2=0$ の解は $a=2\pm\sqrt2$ である。$2+\sqrt2>2$ なので区間に入るのは $a=2-\sqrt2$ だけで、$0\le a<2-\sqrt2$ では $a^{2}-4a+2>0$ すなわち $h'<0$、$2-\sqrt2<a\le2$ では $h'>0$ である。`,
            },
            { k: "p", t: String.raw`よって $h$ は $a=2-\sqrt2$ で最小になる。$a=2-\sqrt2$ では $a^{2}=6-4\sqrt2$、$a^{3}=20-14\sqrt2$ だから` },
            {
              k: "math",
              t: String.raw`h\!\left(2-\sqrt2\right)=-\left(20-14\sqrt2\right)+6\left(6-4\sqrt2\right)-6\left(2-\sqrt2\right)+4=8-4\sqrt2`,
            },
            { k: "p", t: String.raw`である。両端は $h(0)=4$、$h(2)=-8+24-12+4=8$ で、大きいのは $h(2)=8$ である。したがって` },
            {
              k: "math",
              t: String.raw`\text{最大値}=\frac{8}{\sqrt5}=\frac{8\sqrt5}{5},\qquad \text{最小値}=\frac{8-4\sqrt2}{\sqrt5}=\frac{\left(8-4\sqrt2\right)\sqrt5}{5}`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=g(a)-f(a)$ のグラフ（$0\le a\le2$）。$a=2-\sqrt2=0.586$ で最小 $\frac{8-4\sqrt2}{\sqrt5}=1.048$、右端 $a=2$ で最大 $\frac{8}{\sqrt5}=3.578$ になる。`,
                view: [-0.2, 2.3, -0.3, 4.0],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: H2, from: 0, to: 2 },
                  { k: "dot", at: [0, H2(0)], label: "a = 0", place: "above-right" },
                  { k: "dot", at: [2 - Math.SQRT2, H2(2 - Math.SQRT2)], label: "最小", place: "below" },
                  { k: "dot", at: [2, H2(2)], label: "最大", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`最小は区間の内部（$a=2-\sqrt2$）、最大は端（$a=2$）で起きる。$h(0)=4$ と $h(2)=8$ を両方計算して比べないと、最大を取り違える。`,
            String.raw`$a=2-\sqrt2$ での値は、$a^{2}=6-4\sqrt2$、$a^{3}=\left(2-\sqrt2\right)\left(6-4\sqrt2\right)=20-14\sqrt2$ を先に用意しておくと計算が早い。`,
          ],
          check: String.raw`$\dfrac{8}{\sqrt5}=3.5777$、$\dfrac{8-4\sqrt2}{\sqrt5}=1.0479$。$0\le a\le2$ を $4$ 万等分して $g(a)-f(a)$ を直接計算すると、最大 $3.57770876$（$a=2$）、最小 $1.04788664$（$a=0.58580$）となり、$2-\sqrt2=0.58579$ と合う。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["同じものを含む順列", "間に入れる数え方", "条件つき確率"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$12$ か所への赤4個・黒3個の置き方 $27720$ 通りを全探索し、赤が隣り合わないものが $7056$ 通り、赤も黒も隣り合わないものが $4326$ 通りであることを数え上げた（理科の第2問と同じ問題なので、同じ確認をそのまま使っている）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`どの赤玉も隣り合わない確率 $p$ を求める`,
          answer: String.raw`$p=\dfrac{14}{55}$`,
          approach: String.raw`色だけが問題なので、$12$ か所のうちどこに赤が来るかだけを見ればよい。「隣り合わない $4$ か所」の選び方は、赤でない $8$ 個を並べてできる $9$ つのすき間から $4$ つ選ぶ、と読み替えれば数えられる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`取り出す順番は $12!$ 通りあり、どれも同じ確率で起きる。色の並びだけを見ると、赤玉4個がどの位置に来るかで決まり、その選び方 $ {}_{12}\mathrm{C}_{4}=495$ 通りはどれも同じ確率である。`,
            },
            {
              k: "p",
              t: String.raw`赤以外の8個を横一列に並べると、その両端と間に9つのすき間ができる。どの赤玉も隣り合わないように置くことは、この9つのすき間から4つを選んで1個ずつ入れることと同じである。よって`,
            },
            {
              k: "math",
              t: String.raw`p=\frac{{}_{9}\mathrm{C}_{4}}{{}_{12}\mathrm{C}_{4}}=\frac{126}{495}=\frac{14}{55}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\dfrac{14}{55}=0.2545\ldots$。黒3・赤4・白5の色の並び全 $\dfrac{12!}{3!\,4!\,5!}=27720$ 通りを機械で全部調べると、赤が隣り合わないものは $7056$ 通りで、$\dfrac{7056}{27720}=\dfrac{14}{55}$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`どの赤玉も隣り合わないとき、どの黒玉も隣り合わない条件つき確率 $q$ を求める`,
          answer: String.raw`$q=\dfrac{103}{168}$`,
          approach: String.raw`分子を数えるとき、(1) と同じ「赤でない8個を先に並べる」見方をそのまま使う。先に並べた8個（黒3・白5）の中で黒がくっついている場所があれば、そこには必ず赤を入れなければならない。くっついている箇所の個数で場合分けすれば数え切れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`色の並びは全部で $\dfrac{12!}{3!\,4!\,5!}=27720$ 通りあり、どれも同じ確率で起きる。`,
            },
            {
              k: "p",
              t: String.raw`**分母。** 赤でない8個（黒3・白5）の並べ方が $ {}_{8}\mathrm{C}_{3}=56$ 通り、その9つのすき間から4つ選んで赤を入れる方法が $ {}_{9}\mathrm{C}_{4}=126$ 通りだから、赤が隣り合わない並びは $56\times126=7056$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`**分子。** 赤でない8個の並びを1つ固定し、その中で黒どうしが隣り合っている箇所の個数を $m$ とする。$m$ 箇所のすき間には必ず赤を入れなければ、最終的な並びで黒が隣り合ってしまう。逆にその $m$ 箇所に赤を入れさえすれば、残りの赤をどこに入れても黒は隣り合わない。よって赤の入れ方は $ {}_{9-m}\mathrm{C}_{4-m}$ 通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$m=0$（黒がどこも隣り合わない）：白5個の間と両端の6つのすき間から3つ選べばよく、$ {}_{6}\mathrm{C}_{3}=20$ 通り。`,
                String.raw`$m=2$（黒3個が1かたまり）：8か所のうち連続3か所をかたまりの位置にすればよく、$6$ 通り。`,
                String.raw`$m=1$：全体 $ {}_{8}\mathrm{C}_{3}=56$ 通りから上の2つを引いて $56-20-6=30$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`したがって、赤も黒も隣り合わない並びは` },
            {
              k: "math",
              t: String.raw`20\times{}_{9}\mathrm{C}_{4}+30\times{}_{8}\mathrm{C}_{3}+6\times{}_{7}\mathrm{C}_{2}=2520+1680+126=4326`,
            },
            { k: "p", t: String.raw`通りである。よって` },
            { k: "math", t: String.raw`q=\frac{4326}{7056}=\frac{103}{168}` },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`「黒が隣り合わない並びを先に作る」と始めると、白と黒だけの並びでは隣り合っていた黒が、あとから赤を入れることで離れる場合を取りこぼす。赤でない8個を先に並べ、くっついた黒の箇所に赤を強制的に入れる、という順番にすると漏れなく数えられる。`,
            String.raw`$q$ は条件つき確率なので、分母は $27720$ ではなく $7056$ である。`,
          ],
          check: String.raw`$\dfrac{103}{168}=0.6131\ldots$。全 $27720$ 通りを機械で調べると、赤も黒も隣り合わないものは $4326$ 通りで、$\dfrac{4326}{7056}$ は約分して $\dfrac{103}{168}$ になる（$4326=2\cdot3\cdot7\cdot103$、$7056=2^{4}\cdot3^{2}\cdot7^{2}$ で共通因数は $42$）。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間図形",
      topics: ["余弦定理", "球面上の4点", "二等辺三角形", "四面体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "条件から出した座標 $\\mathrm{A}\\left(-\\frac12,0,0\\right)$、$\\mathrm{B}\\left(\\frac12,0,0\\right)$、$\\mathrm{C}\\left(0,\\frac{2}{\\sqrt3},\\sqrt{\\frac{11}{12}}\\right)$、$\\mathrm{D}\\left(0,\\frac{2}{\\sqrt3},-\\sqrt{\\frac{11}{12}}\\right)$ について、4点が中心 $\\left(0,\\frac{\\sqrt3}{2},0\\right)$ の単位球面上にあり、$\\mathrm{AB}=1$、$\\mathrm{AC}=\\mathrm{BC}=\\mathrm{AD}=\\mathrm{BD}=\\sqrt{\\frac52}$、$\\cos\\angle\\mathrm{ACB}=\\cos\\angle\\mathrm{ADB}=0.8$ をすべてみたすことを確かめた",
          "同じ座標から行列式で体積を計算して $0.368513866$ を得て、$\\frac{\\sqrt{11}}{9}=0.368513866$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角形 $\mathrm{ABC}$ の面積を求める`,
          answer: String.raw`$\dfrac34$`,
          approach: String.raw`$\mathrm{AC}=\mathrm{BC}$ で $\mathrm{AB}=1$、頂角の $\cos$ が分かっているので、余弦定理で等辺の長さが決まる。あとは $\frac12\cdot\mathrm{CA}\cdot\mathrm{CB}\cdot\sin$ で面積が出る。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{AC}=\mathrm{BC}=c$ とおく。$\cos\angle\mathrm{ACB}=\dfrac45$ なので余弦定理より` },
            {
              k: "math",
              t: String.raw`1=\mathrm{AB}^{2}=c^{2}+c^{2}-2c^{2}\cdot\frac45=2c^{2}\left(1-\frac45\right)=\frac{2c^{2}}{5}`,
            },
            { k: "p", t: String.raw`すなわち $c^{2}=\dfrac52$ である。$0<\angle\mathrm{ACB}<\pi$ で $\cos=\dfrac45$ だから $\sin\angle\mathrm{ACB}=\dfrac35$ で` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ABC}=\frac12\cdot\mathrm{CA}\cdot\mathrm{CB}\cdot\sin\angle\mathrm{ACB}=\frac12\cdot\frac52\cdot\frac35=\frac34`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{D}$ についても条件がまったく同じなので、$\mathrm{AD}=\mathrm{BD}=\sqrt{\dfrac52}$、$\triangle\mathrm{ABD}=\dfrac34$ である。`,
            },
          ],
          check: String.raw`$c=\sqrt{2.5}=1.5811$。余弦定理で戻すと $2\times2.5\times\left(1-0.8\right)=1=\mathrm{AB}^{2}$ ✓。面積は $\dfrac12\times2.5\times0.6=0.75$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`四面体 $\mathrm{ABCD}$ の体積を求める`,
          answer: String.raw`$\dfrac{\sqrt{11}}{9}$`,
          approach: String.raw`$\mathrm{AC}=\mathrm{BC}$、$\mathrm{AD}=\mathrm{BD}$ なので、$\mathrm{C}$ も $\mathrm{D}$ も線分 $\mathrm{AB}$ の垂直二等分面の上にある。球の中心も同じ面の上にあるので、その面に座標を入れると $\mathrm{C}$ と $\mathrm{D}$ の位置が2つの円の交点として決まる。条件が $\mathrm{C}$ と $\mathrm{D}$ で同じなので、2つの交点がそのまま $\mathrm{C}$ と $\mathrm{D}$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{AB}$ の中点を $\mathrm{M}$ とし、$\mathrm{M}$ を原点、直線 $\mathrm{AB}$ を $x$ 軸にとって`,
            },
            { k: "math", t: String.raw`\mathrm{A}\left(-\frac12,0,0\right),\qquad \mathrm{B}\left(\frac12,0,0\right)` },
            {
              k: "p",
              t: String.raw`とする。$\mathrm{AC}=\mathrm{BC}$、$\mathrm{AD}=\mathrm{BD}$ より $\mathrm{C}$、$\mathrm{D}$ は平面 $x=0$ の上にある。球の中心 $\mathrm{O}$ も $\mathrm{OA}=\mathrm{OB}=1$ より同じ平面の上にあり、$\mathrm{OM}=\sqrt{1-\left(\frac12\right)^{2}}=\dfrac{\sqrt3}{2}$ である。$x$ 軸のまわりに回して $\mathrm{O}\left(0,\dfrac{\sqrt3}{2},0\right)$ としてよい。`,
            },
            {
              k: "p",
              t: String.raw`平面 $x=0$ の上で $\mathrm{C}(0,y,z)$ とおく。(1) より $\mathrm{AC}^{2}=\dfrac52$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac14+y^{2}+z^{2}=\frac52,\qquad y^{2}+z^{2}=\frac94`,
            },
            { k: "p", t: String.raw`であり、球面上にあることから` },
            {
              k: "math",
              t: String.raw`\left(y-\frac{\sqrt3}{2}\right)^{2}+z^{2}=1,\qquad y^{2}+z^{2}-\sqrt3\,y+\frac34=1`,
            },
            { k: "p", t: String.raw`である。前者を代入すると $\dfrac94-\sqrt3\,y+\dfrac34=1$、すなわち` },
            { k: "math", t: String.raw`y=\frac{2}{\sqrt3},\qquad z^{2}=\frac94-\frac43=\frac{11}{12}` },
            {
              k: "p",
              t: String.raw`となる。$\mathrm{D}$ についてもまったく同じ2式が成り立つので、$\mathrm{C}$ と $\mathrm{D}$ はこの連立の2つの解、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{C}\left(0,\ \frac{2}{\sqrt3},\ \sqrt{\frac{11}{12}}\right),\qquad \mathrm{D}\left(0,\ \frac{2}{\sqrt3},\ -\sqrt{\frac{11}{12}}\right)`,
            },
            { k: "p", t: String.raw`である（$\mathrm{C}\ne\mathrm{D}$ なので $z$ の符号が逆になる）。` },
            {
              k: "p",
              t: String.raw`**体積。** 直線 $\mathrm{AB}$ は $x$ 軸、直線 $\mathrm{CD}$ は $x=0$、$y=\dfrac{2}{\sqrt3}$ の直線（$z$ 方向）で、互いに垂直である。2直線の距離は $y$ 方向のずれ $\dfrac{2}{\sqrt3}$ で、`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AB}=1,\qquad \mathrm{CD}=2\sqrt{\frac{11}{12}}=\frac{\sqrt{11}}{\sqrt3}`,
            },
            {
              k: "p",
              t: String.raw`である。向かい合う2辺が垂直で距離 $d$ のとき、四面体の体積は $\dfrac16\cdot\mathrm{AB}\cdot\mathrm{CD}\cdot d$ なので`,
            },
            {
              k: "math",
              t: String.raw`V=\frac16\cdot1\cdot\frac{\sqrt{11}}{\sqrt3}\cdot\frac{2}{\sqrt3}=\frac16\cdot\frac{2\sqrt{11}}{3}=\frac{\sqrt{11}}{9}`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`平面 $x=0$（線分 $\mathrm{AB}$ の垂直二等分面）で切った図。横軸が $y$、縦軸が $z$。$\mathrm{C}$、$\mathrm{D}$ は「$\mathrm{M}$ から $\frac32$ の円」と「球の中心 $\mathrm{O}$ から $1$ の円」の2つの交点として決まる。`,
                view: [-1.9, 2.5, -1.75, 1.75],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [1.5 * Math.cos(t), 1.5 * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) =>
                      [Math.sqrt(3) / 2 + Math.cos(t), Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [YC, HH], b: [YC, -HH] },
                  { k: "dot", at: [0, 0], label: "M", place: "below-left" },
                  { k: "dot", at: [Math.sqrt(3) / 2, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [YC, HH], label: "C", place: "above-right" },
                  { k: "dot", at: [YC, -HH], label: "D", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{C}$ と $\mathrm{D}$ が同じ条件をみたすことから、2つの交点がそのまま $\mathrm{C}$、$\mathrm{D}$ になる。別々に場合分けする必要はない。`,
            String.raw`「向かい合う2辺が垂直で距離 $d$」の形に持ち込めるのは、$\mathrm{AB}$ が $x$ 軸、$\mathrm{CD}$ が $z$ 方向になるようにとれるからである。気づかなければ、$\triangle\mathrm{ABC}$ を底面として $\mathrm{D}$ の高さを出してもよい。`,
          ],
          check: String.raw`この座標で $\mathrm{AB}=1$、$\mathrm{AC}=\mathrm{BC}=\mathrm{AD}=\mathrm{BD}=1.581139=\sqrt{\dfrac52}$、$\cos\angle\mathrm{ACB}=\cos\angle\mathrm{ADB}=0.8$ となり、4点とも中心 $\left(0,\dfrac{\sqrt3}{2},0\right)$ から距離 $1$ である。行列式で体積を計算すると $0.368513866$ で、$\dfrac{\sqrt{11}}{9}=0.368513866$ と一致する。`,
        },
      ],
    },
  ],
};
