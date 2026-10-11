import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2024年度（令和6年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */

/** 第1問の図。真上（z 軸方向）から見た図で使う値。 */
const COS1 = 1 - Math.SQRT2 / 2;

/** 第3問の図。a = 0.8 のときの2つの放物線。 */
const A3 = 0.8;
const UP3 = (x: number) => x * x;
const DN3 = (x: number) => 2.5 * A3 * A3 - (x - A3) ** 2;

/** 第5問の図。領域の上下の境界。 */
const TOP5 = (a: number) => 2 - a;
const BOT5 = (a: number) => Math.max(0, 5 - (a + 4) ** 2 / 4);
/** 判別式が 0 になる a。ここで下の境界が b 軸から離れる。 */
const AC5 = 2 * Math.sqrt(5) - 4;

export const kyodaiBunkei2024: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間図形",
      topics: ["余弦定理", "二等辺三角形", "座標の設定", "四面体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\cos\\theta=1-\\frac{\\sqrt2}{2}$ として座標 $\\mathrm{A}(1,0,0)$、$\\mathrm{B}(0,1,0)$、$\\mathrm{C}(\\cos\\theta,\\cos\\theta,z)$ をとると、$\\mathrm{OA}=\\mathrm{OB}=\\mathrm{OC}=1$、$\\angle\\mathrm{AOB}=90.0000^\\circ$、$\\angle\\mathrm{COA}=\\angle\\mathrm{COB}=\\angle\\mathrm{ACB}=72.9688^\\circ$ となり、条件をすべてみたすことを確かめた",
          "この座標での体積 $\\frac z6=0.151696620$ が $\\frac{\\sqrt{2\\sqrt2-2}}{6}=0.151696620$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{OA}=\mathrm{OB}=\mathrm{OC}=1$、$\angle\mathrm{COA}=\angle\mathrm{COB}=\angle\mathrm{ACB}$、$\angle\mathrm{AOB}=90^\circ$ をみたす四面体 $\mathrm{OABC}$ の体積を求める`,
          answer: String.raw`$\dfrac{\sqrt{2\sqrt2-2}}{6}$`,
          approach: String.raw`等しい3つの角を $\theta$ とおくと、$\triangle\mathrm{OCA}$ と $\triangle\mathrm{OCB}$ は合同な二等辺三角形なので $\mathrm{AC}=\mathrm{BC}$ がすぐ出る。$\triangle\mathrm{ACB}$ でも余弦定理を使うと、$\mathrm{AC}$ を消去して $\cos\theta$ の方程式が1本できる。$\theta$ が決まれば、$\mathrm{OA}\perp\mathrm{OB}$ を活かして座標を置くのがいちばん早い。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\theta=\angle\mathrm{COA}=\angle\mathrm{COB}=\angle\mathrm{ACB}$ とおく（$0<\theta<\pi$）。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{AC}=\mathrm{BC}$。** $\triangle\mathrm{OCA}$ で $\mathrm{OA}=\mathrm{OC}=1$、$\angle\mathrm{COA}=\theta$ だから余弦定理より`,
            },
            { k: "math", t: String.raw`\mathrm{AC}^{2}=1+1-2\cos\theta=2(1-\cos\theta)` },
            {
              k: "p",
              t: String.raw`である。$\triangle\mathrm{OCB}$ も同じ条件なので $\mathrm{BC}^{2}=2(1-\cos\theta)$、つまり $\mathrm{AC}=\mathrm{BC}$ である。これを $c$ とおく。`,
            },
            {
              k: "p",
              t: String.raw`**$\theta$ を決める。** $\angle\mathrm{AOB}=90^\circ$、$\mathrm{OA}=\mathrm{OB}=1$ より $\mathrm{AB}=\sqrt2$ である。$\triangle\mathrm{ACB}$ で余弦定理を使うと`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=c^{2}+c^{2}-2c^{2}\cos\theta\quad\Longrightarrow\quad 2=2c^{2}(1-\cos\theta)`,
            },
            { k: "p", t: String.raw`である。$c^{2}=2(1-\cos\theta)$ を入れると` },
            {
              k: "math",
              t: String.raw`2\cdot2(1-\cos\theta)\cdot(1-\cos\theta)=2\quad\Longleftrightarrow\quad(1-\cos\theta)^{2}=\frac12`,
            },
            {
              k: "p",
              t: String.raw`となる。$1-\cos\theta>0$ なので $1-\cos\theta=\dfrac{1}{\sqrt2}$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\cos\theta=1-\frac{\sqrt2}{2}`,
            },
            { k: "p", t: String.raw`である（$0.2929$、$\theta=72.97^\circ$ ほど）。` },
            {
              k: "p",
              t: String.raw`**座標を置く。** $\mathrm{OA}\perp\mathrm{OB}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{O}(0,0,0),\quad\mathrm{A}(1,0,0),\quad\mathrm{B}(0,1,0)`,
            },
            {
              k: "p",
              t: String.raw`ととれる。$\mathrm{C}(x,y,z)$ は $\overrightarrow{\mathrm{OC}}\cdot\overrightarrow{\mathrm{OA}}=\cos\theta$ より $x=\cos\theta$、同様に $y=\cos\theta$ で、$\mathrm{OC}=1$ より`,
            },
            {
              k: "math",
              t: String.raw`z^{2}=1-2\cos^{2}\theta=1-2\left(1-\frac{\sqrt2}{2}\right)^{2}=1-2\left(\frac32-\sqrt2\right)=2\sqrt2-2`,
            },
            {
              k: "p",
              t: String.raw`である（$2\sqrt2-2=0.828>0$）。$z>0$ ととってよい。`,
            },
            {
              k: "p",
              t: String.raw`**体積。** 底面 $\triangle\mathrm{OAB}$ は $xy$ 平面上の直角二等辺三角形で面積 $\dfrac12$、高さは $\mathrm{C}$ の $z$ 座標そのものだから`,
            },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot\frac12\cdot z=\frac{\sqrt{2\sqrt2-2}}{6}`,
            },
            { k: "p", t: String.raw`である（$0.1517$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`真上（$z$ 軸方向）から見た図。$\mathrm{C}$ の影 $\mathrm{H}$ は $(\cos\theta,\cos\theta)$ で、$\angle\mathrm{AOB}=90^\circ$ の二等分線の上にある。$\mathrm{C}$ の高さが $z=\sqrt{2\sqrt2-2}=0.910$。`,
                view: [-0.42, 1.4, -0.3, 1.25],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [0, 0], b: [0, 1] },
                  { k: "seg", a: [1, 0], b: [0, 1] },
                  { k: "seg", a: [0, 0], b: [COS1, COS1], dash: true },
                  { k: "seg", a: [1, 0], b: [COS1, COS1], dash: true },
                  { k: "seg", a: [0, 1], b: [COS1, COS1], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [0, 1], label: "B", place: "above-left" },
                  { k: "dot", at: [COS1, COS1], label: "H", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\angle\mathrm{ACB}$ は四面体の**面 $\mathrm{ACB}$ の中の角**で、$\mathrm{O}$ とは関係しない。$\triangle\mathrm{ACB}$ を取り出して余弦定理を使う。`,
            String.raw`$(1-\cos\theta)^{2}=\frac12$ から $1-\cos\theta=\pm\frac{1}{\sqrt2}$ の2つが出るが、$\cos\theta<1$ より $1-\cos\theta>0$ なので正のほうだけが残る。`,
            String.raw`$z^{2}=1-2\cos^{2}\theta$ が正であることを確かめておく。$\cos\theta$ が大きすぎると $\mathrm{C}$ が平面 $\mathrm{OAB}$ 上に乗ってしまい、四面体にならない。`,
            String.raw`$\sqrt{2\sqrt2-2}$ は二重根号だが、$2\sqrt2-2=2\left(\sqrt2-1\right)$ の形では外せない。無理に外そうとしない。`,
          ],
          check: String.raw`$\cos\theta=1-\frac{\sqrt2}{2}=0.292893$ として $\mathrm{A}(1,0,0)$、$\mathrm{B}(0,1,0)$、$\mathrm{C}(0.292893,0.292893,0.910180)$ をとると、$\mathrm{OA}=\mathrm{OB}=\mathrm{OC}=1$、$\angle\mathrm{AOB}=90.0000^\circ$、$\angle\mathrm{COA}=\angle\mathrm{COB}=\angle\mathrm{ACB}=72.9688^\circ$ となり条件をすべてみたす。体積は $\frac{0.910180}{6}=0.151697$ である。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["立方体の塗り分け", "対面", "順列", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3,4,5,6$ について $n^{6}$ 通りの塗り方をすべて列挙し、辺を共有する面の色がすべて異なるものを数えると $0,\\,6,\\,96,\\,780,\\,4080$ 通りで、$ {}_{n}\\mathrm{P}_{3}+3\\,{}_{n}\\mathrm{P}_{4}+3\\,{}_{n}\\mathrm{P}_{5}+{}_{n}\\mathrm{P}_{6}$ と完全に一致した",
          "$p_3=\\frac{6}{729}=\\frac{2}{243}$、$p_4=\\frac{96}{4096}=\\frac{3}{128}$ を分数のまま確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p_3$ を求める`,
          answer: String.raw`$p_3=\dfrac{2}{243}$`,
          approach: String.raw`立方体では「辺を共有する」と「向かい合っていない」が同じことである。だから条件は「向かい合う3組のあいだで色が重ならない」こと、つまり3組の使う色の集合が互いに素であることになる。色が $3$ 個しかないなら、各組が1色ずつを使い切るしかない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`立方体の面は、向かい合う2面どうしは辺を共有せず、それ以外の2面はかならず辺を共有する。向かい合う3組を $\mathrm{P},\mathrm{Q},\mathrm{R}$ とすると、条件は`,
            },
            {
              k: "math",
              t: String.raw`\text{異なる組に属する2面は、つねに違う色}`,
            },
            {
              k: "p",
              t: String.raw`ということである。言いかえると、3組がそれぞれ使う色の集合は互いに共通部分をもたない。同じ組の2面は、同じ色でも違う色でもよい。`,
            },
            {
              k: "p",
              t: String.raw`**$n=3$ のとき。** 3組はそれぞれ少なくとも1色を使い、しかも互いに素だから、使う色の総数は $3$ 以上である。色は $3$ 個しかないので、どの組もちょうど1色、しかも3組で3色を使い切る。`,
            },
            {
              k: "p",
              t: String.raw`したがって、3組に3色を割り当てる方法は $3!=6$ 通りで、各組の2面は同じ色だから、面の塗り方としても $6$ 通りである。全体は $3^{6}=729$ 通りなので`,
            },
            {
              k: "math",
              t: String.raw`p_3=\frac{6}{729}=\frac{2}{243}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`「辺を共有する2面」は各面に $4$ つあり、共有しないのは向かいの $1$ 面だけである。この言いかえができれば、以降は組どうしの色の重なりだけを見ればよくなる。`,
            },
          ],
          pitfalls: [
            String.raw`立方体の回転で移り合う塗り方を同じと数えない。問題は「各面にどの色を塗るか」が同様に確からしいとしているので、面には区別がある。`,
            String.raw`同じ組の2面は辺を共有しないので、同じ色でもよい。$n=3$ では結果的に同じ色になるが、理由は「色が足りないから」である。`,
          ],
          check: String.raw`$3^{6}=729$ 通りをすべて列挙して条件をみたすものを数えると、ちょうど $6$ 通りだった。$\frac{6}{729}=\frac{2}{243}=0.00823$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$p_4$ を求める`,
          answer: String.raw`$p_4=\dfrac{3}{128}$`,
          approach: String.raw`(1) と同じく、3組の色の集合が互いに素であればよい。各組が使う色の個数は $1$ か $2$ で、その合計が $4$ 以下でなければならない。合計 $3$ と合計 $4$ の2通りを数える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3組が使う色の個数を $k_1,k_2,k_3$（それぞれ $1$ か $2$）とすると、互いに素だから $k_1+k_2+k_3\le4$ である。$n=4$ では`,
            },
            {
              k: "steps",
              items: [
                String.raw`$(k_1,k_2,k_3)=(1,1,1)$：3組それぞれが1色で、3色は相異なる。$4$ 色から順に選んで $4\cdot3\cdot2=24$ 通り。`,
                String.raw`$(2,1,1)$ とその並べ替え：2色を使う組の選び方が $3$ 通り。その組の2面には相異なる2色を**順番込みで**塗るので $4\cdot3=12$ 通り。残り2組には、残った $2$ 色を1つずつ割り当てて $2\cdot1=2$ 通り。合わせて $3\cdot12\cdot2=72$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$k_1+k_2+k_3=5$ 以上は色が足りないので起こらない。よって条件をみたす塗り方は`,
            },
            { k: "math", t: String.raw`24+72=96` },
            { k: "p", t: String.raw`通りで、全体は $4^{6}=4096$ 通りだから` },
            {
              k: "math",
              t: String.raw`p_4=\frac{96}{4096}=\frac{3}{128}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`一般には、$k_1+k_2+k_3=K$ となる組が $K=3,4,5,6$ でそれぞれ $1,3,3,1$ 通りあり、色の割り当ては $ {}_{n}\mathrm{P}_{K}$ 通りなので`,
            },
            {
              k: "math",
              t: String.raw`n^{6}p_n={}_{n}\mathrm{P}_{3}+3\,{}_{n}\mathrm{P}_{4}+3\,{}_{n}\mathrm{P}_{5}+{}_{n}\mathrm{P}_{6}`,
            },
            {
              k: "p",
              t: String.raw`となる。$n=3$ で $6$、$n=4$ で $24+72=96$ と、上の計算に一致する。`,
            },
          ],
          pitfalls: [
            String.raw`2色を使う組では、どちらの面にどちらの色を塗るかで $2$ 通りある。面に区別があるので、色の組だけ数えて終わらない。`,
            String.raw`$(2,2,1)$ は色を $5$ 個使うので $n=4$ では不可能である。合計の上限を先に押さえておくと場合分けが短くなる。`,
            String.raw`$96$ と $4096$ の約分を忘れない。$\frac{96}{4096}=\frac{3}{128}$ である。`,
          ],
          check: String.raw`$4^{6}=4096$ 通りをすべて列挙すると、条件をみたすのはちょうど $96$ 通りだった。$n=5,6$ でも全探索の結果 $780,\,4080$ 通りで、$ {}_{n}\mathrm{P}_{3}+3\,{}_{n}\mathrm{P}_{4}+3\,{}_{n}\mathrm{P}_{5}+{}_{n}\mathrm{P}_{6}$ の値と一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "2次関数",
      topics: ["絶対値のはずし方", "最大値", "場合分け", "放物線の頂点"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.3,0.6,0.632356,0.632456,0.8,1.0,1.5,2.5$ について $-1\\le x\\le1$ を $40$ 万等分して $f(x)$ の最大値を直接求めると、$1,\\,1,\\,1,\\,1,\\,1.6,\\,2.5,\\,5.375,\\,13.375$ となり、場合分けした式の値と小数9桁まで一致した",
          "境目 $\\sqrt{\\frac25}=\\frac{\\sqrt{10}}{5}=0.632456$ と $a=1$ の前後で式が切り替わり、どちらの境目でも値が連続することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a>0$ のとき $f(x)=\left|x^{2}-\left(ax+\frac34a^{2}\right)\right|+ax+\frac34a^{2}$ の $-1\le x\le1$ での最大値を求める`,
          answer: String.raw`$0<a<\dfrac{\sqrt{10}}{5}$ のとき $1$、$\dfrac{\sqrt{10}}{5}\le a\le1$ のとき $\dfrac52a^{2}$、$a>1$ のとき $\dfrac32a^{2}+2a-1$`,
          approach: String.raw`$|A|+B$ の形は $\left|A\right|+B=\max\left(A+B,\;B-A\right)$ と書ける。ここで $A+B=x^{2}$、$B-A=2\left(ax+\frac34a^{2}\right)-x^{2}$ なので、$f$ は2つの放物線の**上側**をとった関数になる。最大値は「2つの放物線それぞれの最大値のうち大きいほう」なので、場合分けが一気に軽くなる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$g(x)=ax+\dfrac34a^{2}$ とおく。実数 $A$ について $|A|=\max(A,-A)$ だから`,
            },
            {
              k: "math",
              t: String.raw`f(x)=\left|x^{2}-g(x)\right|+g(x)=\max\left(x^{2},\;2g(x)-x^{2}\right)`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`h(x)=2g(x)-x^{2}=-x^{2}+2ax+\frac32a^{2}=-(x-a)^{2}+\frac52a^{2}`,
            },
            {
              k: "p",
              t: String.raw`とおく。$f=\max\left(x^{2},h(x)\right)$ なので、$-1\le x\le1$ での最大値は`,
            },
            {
              k: "math",
              t: String.raw`\max_{-1\le x\le1}f=\max\left(\max_{-1\le x\le1}x^{2},\;\;\max_{-1\le x\le1}h(x)\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**それぞれの最大値。** $x^{2}$ は $x=\pm1$ で最大値 $1$ をとる。$h$ は上に凸で頂点が $x=a$ だから` },
            {
              k: "steps",
              items: [
                String.raw`$0<a\le1$：頂点が区間の中にあるので $\displaystyle\max h=\frac52a^{2}$（$x=a$）。`,
                String.raw`$a>1$：区間 $[-1,1]$ では $h$ は増加なので $\displaystyle\max h=h(1)=\frac32a^{2}+2a-1$。`,
              ],
            },
            { k: "p", t: String.raw`**比べる。** ` },
            {
              k: "steps",
              items: [
                String.raw`$0<a\le1$：$\dfrac52a^{2}\ge1\iff a^{2}\ge\dfrac25\iff a\ge\sqrt{\dfrac25}=\dfrac{\sqrt{10}}{5}$。$\dfrac{\sqrt{10}}{5}=0.632\dots<1$ なので、$0<a<\dfrac{\sqrt{10}}{5}$ では最大値 $1$、$\dfrac{\sqrt{10}}{5}\le a\le1$ では最大値 $\dfrac52a^{2}$。`,
                String.raw`$a>1$：$\dfrac32a^{2}+2a-1-1=\dfrac32a^{2}+2a-2>\dfrac32+2-2>0$ なので、最大値は $\dfrac32a^{2}+2a-1$。`,
              ],
            },
            { k: "p", t: String.raw`まとめると` },
            {
              k: "math",
              t: String.raw`\max f=\begin{cases}1&\left(0<a<\dfrac{\sqrt{10}}{5}\right)\\[2mm]\dfrac52a^{2}&\left(\dfrac{\sqrt{10}}{5}\le a\le1\right)\\[2mm]\dfrac32a^{2}+2a-1&\left(a>1\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=0.8$ のときの $y=x^{2}$ と $y=h(x)=-(x-a)^{2}+\frac52a^{2}$。$f$ はこの2つの上側をなぞった関数で、最大値は $h$ の頂点の値 $\frac52a^{2}=1.6$（$x=a=0.8$）。`,
                view: [-1.3, 1.45, -0.3, 2.05],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: UP3, from: -1.2, to: 1.2 },
                  { k: "curve", f: DN3, from: -0.57, to: 1.2, dash: true },
                  { k: "dot", at: [A3, 2.5 * A3 * A3], label: "頂点 5a^2/2", place: "above-right" },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "below-right" },
                  { k: "dot", at: [-1, 1], label: "(-1, 1)", place: "below-left" },
                  { k: "text", at: [-1.2, UP3(-1.2)], label: "y = x^2", place: "above-left" },
                  { k: "text", at: [-0.57, DN3(-0.57)], label: "y = h(x)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\left|A\right|+B=\max(A+B,\,B-A)$ の言いかえが要点である。$x^{2}-g(x)$ の符号で場合分けして区間を細かく切ると、場合分けが倍に増えて見通しが悪くなる。`,
            String.raw`$h$ の頂点は $x=a$ である。$a>1$ では頂点が区間の外に出るので、端 $x=1$ の値に切り替わる。`,
            String.raw`境目 $a=\frac{\sqrt{10}}{5}$ と $a=1$ の両方で値が連続している（$1$ と $\frac52\cdot\frac25=1$、$\frac52=\frac32+2-1$）。等号をどちらに付けても答えは同じだが、連続性の確認は検算になる。`,
          ],
          check: String.raw`$-1\le x\le1$ を $40$ 万等分して $f$ の最大値を直接求めると、$a=0.3,0.6$ で $1.000000000$、$a=0.8$ で $1.600000000$（$\frac52a^{2}=1.6$）、$a=1$ で $2.500000000$、$a=1.5$ で $5.375000000$（$\frac32\cdot2.25+3-1=5.375$）、$a=2.5$ で $13.375000000$ となり、すべて式の値と一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "指数・対数",
      topics: ["n進法", "桁数", "常用対数", "不等式の評価"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$10^{9}$ から $2^{30}$ まですべての自然数について八進法・九進法・十進法の桁数を直接数え、すべて等しくなる最大の数が $1073741823=2^{30}-1$ であることを確かめた",
          "$8^{11}=8589934592<10^{10}$ なので $11$ 桁はありえないこと、$8^{10}=2^{30}=1073741824>10^{9}$ なので $10$ 桁は存在することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`八進法・九進法・十進法で表したときの桁数がすべて同じになる自然数のうち最大のものを求める`,
          answer: String.raw`$2^{30}-1=1073741823$`,
          approach: String.raw`$b$ 進法で $d$ 桁というのは $b^{d-1}\le N<b^{d}$ ということである。3つの条件を重ねると、下からは一番大きい $10^{d-1}$、上からは一番小さい $8^{d}$ が効く。だから「$10^{d-1}<8^{d}$ となる $d$ はどこまでか」を常用対数で押さえれば、あとは上限 $8^{d}-1$ をとるだけでよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`自然数 $N$ が $b$ 進法で $d$ 桁であることは $b^{d-1}\le N<b^{d}$ と同値である。八進法・九進法・十進法でともに $d$ 桁なら`,
            },
            {
              k: "math",
              t: String.raw`\max\left(8^{d-1},9^{d-1},10^{d-1}\right)\le N<\min\left(8^{d},9^{d},10^{d}\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`10^{d-1}\le N<8^{d}` },
            {
              k: "p",
              t: String.raw`である。したがって、そのような $N$ が存在するのは $10^{d-1}<8^{d}$ のときに限る。`,
            },
            {
              k: "p",
              t: String.raw`**$d$ の上限。** $8^{d}=2^{3d}$ なので、常用対数をとると条件は`,
            },
            {
              k: "math",
              t: String.raw`d-1<3d\log_{10}2`,
            },
            { k: "p", t: String.raw`である。$\log_{10}2<0.3011$ より` },
            {
              k: "math",
              t: String.raw`3d\log_{10}2<0.9033d`,
            },
            {
              k: "p",
              t: String.raw`なので、$d-1\ge0.9033d$ であれば条件は成り立たない。これは $0.0967d\ge1$、つまり $d\ge10.34\cdots$ のときだから、$d\ge11$ では $N$ は存在しない。`,
            },
            {
              k: "note",
              t: String.raw`$d=11$ を直接見てもよい。$\log_{10}8^{11}=33\log_{10}2<33\times0.3011=9.9363<10$ なので $8^{11}<10^{10}$ であり、$10^{10}\le N<8^{11}$ をみたす $N$ はない。`,
            },
            {
              k: "p",
              t: String.raw`**$d=10$ では存在する。** $\log_{10}8^{10}=30\log_{10}2>30\times0.3010=9.03>9$ なので $8^{10}>10^{9}$ であり、`,
            },
            {
              k: "math",
              t: String.raw`10^{9}\le N<8^{10}=2^{30}=1073741824`,
            },
            {
              k: "p",
              t: String.raw`をみたす $N$ がある。このうち最大のものは $N=2^{30}-1$ である。$d$ が大きいほど $N$ も大きいので、これが全体の最大である。よって`,
            },
            { k: "math", t: String.raw`N=2^{30}-1=1073741823` },
            { k: "p", t: String.raw`が答えである。` },
            {
              k: "note",
              t: String.raw`この道筋では $\log_{10}3$ は使わない。九進法の条件（$9^{9}\le N<9^{10}$）は、$9^{9}=387420489<10^{9}$ と $9^{10}=3486784401>2^{30}$ から自動的にみたされるからである。`,
            },
          ],
          pitfalls: [
            String.raw`「桁数が同じ」という条件は、下限は底が大きいほうが、上限は底が小さいほうが効く。$8$ と $10$ だけが効いて $9$ は効かない、という構造を押さえる。`,
            String.raw`$d\ge11$ を消すときは、与えられた $\log_{10}2<0.3011$（上からの評価）を使う。下からの評価 $0.3010<\log_{10}2$ は $d=10$ の存在を言うのに使う。どちらを使うかを取り違えない。`,
            String.raw`最大値は $8^{10}-1$ であって $8^{10}$ ではない。$N<8^{10}$ は等号を含まない。`,
          ],
          check: String.raw`$10^{9}$ から $2^{30}$ までのすべての自然数について3つの桁数を直接数えると、すべて等しくなる最大の数は $1073741823$ だった。これは $2^{30}-1$ である。$8^{9}=134217728$、$9^{9}=387420489$、$10^{9}=1000000000$ はすべて $N$ 以下、$8^{10}=1073741824$、$9^{10}=3486784401$、$10^{10}$ はすべて $N$ より大きい。`,
        },
      ],
    },
    {
      no: 5,
      field: "図形と方程式",
      topics: ["解の配置", "領域の面積", "判別式", "積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,b)$ を $0<a,b<2.2$ に $400$ 万点とり、$x^{2}-(4+a)x+(5-b)=0$ の解を実際に求めて「異なる2解がともに $1$ より大きい」かを判定すると、面積は $1.75943$ となり、$\\frac{50-20\\sqrt5}{3}=1.75955$ と一致した",
          "同じ判定と不等式「$a+b<2$ かつ $(a+4)^{2}+4b>20$」が $30$ 万点で1点も食い違わないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$C$（$y=x^{2}-4x+5$ の $x>1$ の部分）と直線 $y=ax+b$ が異なる2つの共有点をもつような正の実数 $a,b$ の動く領域の面積を求める`,
          answer: String.raw`$\dfrac{50-20\sqrt5}{3}$`,
          approach: String.raw`連立して得られる2次方程式が「異なる2つの解をもち、どちらも $1$ より大きい」という解の配置の問題になる。下に凸の2次関数では、判別式・軸の位置・$x=1$ での値の3つを見ればよい。軸の条件は $a>0$ から自動でみたされるので、残る2本が $(a,b)$ 平面の境界を与える。`,
          blocks: [
            { k: "p", t: String.raw`$x^{2}-4x+5=ax+b$ を整理すると` },
            {
              k: "math",
              t: String.raw`\varphi(x)=x^{2}-(4+a)x+(5-b)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$C$ は $x>1$ の部分なので、条件は「$\varphi(x)=0$ が異なる2つの実数解をもち、どちらも $1$ より大きい」ことである。$\varphi$ は下に凸だから、これは次の3つと同値である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`判別式：$(4+a)^{2}-4(5-b)>0$、すなわち $(a+4)^{2}+4b>20$。`,
                String.raw`軸：$\dfrac{4+a}{2}>1$、すなわち $a>-2$。$a>0$ なのでつねに成り立つ。`,
                String.raw`$x=1$ での値：$\varphi(1)=1-(4+a)+(5-b)=2-a-b>0$、すなわち $a+b<2$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって求める領域 $D$ は`,
            },
            {
              k: "math",
              t: String.raw`D:\;a>0,\;b>0,\;a+b<2,\;b>5-\frac{(a+4)^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**境界の形。** $L(a)=5-\dfrac{(a+4)^{2}}{4}$ は上に凸の放物線で、$L(0)=1$、$L(a)=0$ となるのは $(a+4)^{2}=20$、つまり`,
            },
            {
              k: "math",
              t: String.raw`a=2\sqrt5-4=0.4721\cdots`,
            },
            {
              k: "p",
              t: String.raw`のときである。これを $\alpha$ とおく。また $L(a)<2-a$ はつねに成り立つ。実際`,
            },
            {
              k: "math",
              t: String.raw`(2-a)-L(a)=\frac{(a+4)^{2}}{4}-a-3=\frac{a^{2}+4a+4}{4}=\frac{(a+2)^{2}}{4}>0`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $D$ は「$0<a<\alpha$ では $L(a)<b<2-a$」「$\alpha\le a<2$ では $0<b<2-a$」という形になる。`,
            },
            { k: "p", t: String.raw`**面積。** ` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\alpha}\left\{(2-a)-L(a)\right\}da=\int_{0}^{\alpha}\frac{(a+2)^{2}}{4}da=\left[\frac{(a+2)^{3}}{12}\right]_{0}^{\alpha}`,
            },
            {
              k: "p",
              t: String.raw`で、$\alpha+2=2\sqrt5-2=2\left(\sqrt5-1\right)$、$\left(\sqrt5-1\right)^{3}=8\sqrt5-16$ だから $(\alpha+2)^{3}=8\left(8\sqrt5-16\right)=64\sqrt5-128$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\alpha}\frac{(a+2)^{2}}{4}da=\frac{64\sqrt5-128-8}{12}=\frac{16\sqrt5-34}{3}`,
            },
            { k: "p", t: String.raw`である。残りは` },
            {
              k: "math",
              t: String.raw`\int_{\alpha}^{2}(2-a)\,da=\frac{(2-\alpha)^{2}}{2}=\frac{\left(6-2\sqrt5\right)^{2}}{2}=\frac{56-24\sqrt5}{2}=28-12\sqrt5`,
            },
            { k: "p", t: String.raw`である。合わせて` },
            {
              k: "math",
              t: String.raw`\frac{16\sqrt5-34}{3}+28-12\sqrt5=\frac{16\sqrt5-34+84-36\sqrt5}{3}=\frac{50-20\sqrt5}{3}`,
            },
            { k: "p", t: String.raw`が求める面積である（$1.7595$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`領域 $D$。横軸が $a$、縦軸が $b$。上の境界は直線 $b=2-a$、下の境界は $0<a<2\sqrt5-4$ では放物線 $b=5-\frac{(a+4)^{2}}{4}$、それ以降は $a$ 軸。面積は $\frac{50-20\sqrt5}{3}=1.760$。`,
                view: [-0.4, 2.6, -0.3, 2.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: TOP5, bottom: BOT5, from: 0, to: 2 },
                  { k: "seg", a: [0, 2], b: [2, 0], dash: true },
                  { k: "curve", f: (a: number) => 5 - (a + 4) ** 2 / 4, from: 0, to: AC5, dash: true },
                  { k: "dot", at: [0, 2], label: "(0, 2)", place: "above-right" },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "below-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                  { k: "dot", at: [AC5, 0], label: "2√5 - 4", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$C$ は $x>1$ の部分なので、2つの解がともに $1$ **より大きい**ことが条件である。$x=1$ を含めると条件が変わる。`,
            String.raw`軸の条件 $\frac{4+a}{2}>1$ は $a>0$ から自動的にみたされる。「自動でみたされる」ことを一言書いておくと、条件を落としていないことが示せる。`,
            String.raw`$(2-a)-L(a)=\frac{(a+2)^{2}}{4}$ ときれいな形になる。ここが整理できると積分が一瞬で終わる。`,
            String.raw`$a\ge2$ では $2-a\le0$ なので $b>0$ と両立しない。積分区間の右端が $2$ になる理由である。`,
          ],
          check: String.raw`$0<a<2.2$、$0<b<2.2$ に $400$ 万点とり、$x^{2}-(4+a)x+(5-b)=0$ の解を実際に求めて「異なる2解がともに $1$ より大きい」を判定すると、面積は $1.75943$ になる。$\frac{50-20\sqrt5}{3}=1.75955$ と一致する。判定と不等式「$a+b<2$ かつ $(a+4)^{2}+4b>20$」も $30$ 万点で完全に一致した。`,
        },
      ],
    },
  ],
};
