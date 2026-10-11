import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2020年度（令和2年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第2問の図。$A(0,0)$、$B(1,0)$、$C(0,2)$ とおくと三角形の面積が $1$ になる。 */
const HEX3: [number, number][] = [
  [-1, 0],
  [0, -2],
  [2, -2],
  [2, 0],
  [0, 4],
  [-1, 4],
];
const HEX2: [number, number][] = [
  [-0.5, 0],
  [0, -1],
  [1.5, -1],
  [1.5, 0],
  [0, 3],
  [-0.5, 3],
];

/** 第3問の曲線 $C$。 */
const X3 = (t: number) => (1 + t) * Math.sqrt(1 + t);
const Y3 = (t: number) => 3 * (1 + t) * Math.sqrt(1 - t);

export const todaiRikei2020: SolutionSet = {
  slug: "todai-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次不等式",
      topics: ["2次関数の符号", "不等式の解集合", "背理法", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,c$ をすべて正にとった $500$ 組で $x=-1000$ が3つの不等式をすべてみたす（解集合が下に有界でない）ことを確かめた",
          "$a,b,c\\ge0$ で少なくとも1つが $0$ の $3000$ 組について、解集合を細かい格子で求め、下限がつねに $0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b,c$ がすべて $0$ 以上であることを示す`,
          answer: String.raw`どれか1つが負なら、その式は $x$ を大きくすると負になり、解集合が $x>p$ を含まなくなる`,
          approach: String.raw`解集合が $x>p$ と一致する以上、いくらでも大きい $x$ が解になっていなければならない。2次式は、2次の係数が負なら $x\to\infty$ で必ず負になる。この一点だけで決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`仮に $a<0$ とする。$ax^{2}+bx+c=x^{2}\left(a+\dfrac bx+\dfrac{c}{x^{2}}\right)$ で、$x\to\infty$ のとき括弧の中は $a<0$ に近づくから、十分大きい $x$ に対して $ax^{2}+bx+c<0$ となる。`,
            },
            {
              k: "p",
              t: String.raw`ところが解集合は $x>p$ をみたす $x$ の全体なので、いくらでも大きい $x$ が含まれる。そのような $x$ は3つの不等式をすべてみたすはずで、矛盾する。よって $a\ge0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$b$ は2つめの式 $bx^{2}+cx+a>0$ の、$c$ は3つめの式 $cx^{2}+ax+b>0$ の2次の係数なので、まったく同じ議論で $b\ge0$、$c\ge0$ が言える。`,
            },
          ],
          pitfalls: [
            String.raw`3つの式は $a,b,c$ を1つずつずらした形になっていて、$a,b,c$ がそれぞれちょうど1回だけ2次の係数になる。だから同じ議論を3回くり返せば足りる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$a,b,c$ のうち少なくとも1個は $0$ であることを示す`,
          answer: String.raw`すべて正なら $x\to-\infty$ でも3式がすべて正になり、解集合が下に有界でなくなる`,
          approach: String.raw`(1) で $a,b,c\ge0$ は分かっている。全部が正だと仮定して矛盾を出す。2次の係数が正なら $x\to-\infty$ でも式は正になるので、どんなに小さい $x$ も解になってしまう。解集合 $x>p$ は下に有界なので、これは矛盾である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $a,b,c\ge0$ である。仮に $a,b,c$ がすべて正であるとする。`,
            },
            {
              k: "p",
              t: String.raw`$a>0$ なので、(1) と同じ理由で $|x|$ が十分大きければ $ax^{2}+bx+c>0$ となる。とくに $x$ が十分小さい（絶対値の大きい負の数）ときにも正である。$b>0$、$c>0$ についても同様だから、十分小さい $x$ に対して3つの不等式がすべて成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`しかし解集合は $x>p$ をみたす $x$ の全体で、$p$ より小さい $x$ は含まない。十分小さい $x$ は $p$ より小さいので矛盾する。よって $a,b,c$ のうち少なくとも1個は $0$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「3つの2次式がすべて下に凸」であることから、$x\to-\infty$ でも $x\to+\infty$ でも正になる、というのがこの小問の急所である。解集合が両側に伸びてしまうのが矛盾の正体である。`,
          ],
          check: String.raw`$a=b=c=1$ なら3式はどれも $x^{2}+x+1>0$ で、すべての実数 $x$ で成り立つ。解集合は実数全体となり、$x>p$ の形ではない。$a,b,c$ を正にとった $500$ 組で $x=-1000$ を入れると、すべてで3式が成り立った。`,
        },
        {
          label: "(3)",
          task: String.raw`$p=0$ であることを示す`,
          answer: String.raw`$p=0$`,
          approach: String.raw`3つの不等式は $(a,b,c)\to(b,c,a)$ という入れかえで全体として同じものに戻るので、$0$ になるのが $c$ だとしてよい。あとは $c=0$ として3式を書き直し、$a$ が正かどうかで2つに分けて解集合を直接求める。どちらも $x>0$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3つの不等式は $(a,b,c)$ を $(b,c,a)$ に置きかえると互いに入れかわるだけで、全体としては同じ条件になる。よって (2) で $0$ になるものを $c$ としてよい。$c=0$ とすると3式は`,
            },
            {
              k: "math",
              t: String.raw`ax^{2}+bx>0,\qquad bx^{2}+a>0,\qquad ax+b>0`,
            },
            { k: "p", t: String.raw`となる。$a\ge0$、$b\ge0$ である。` },
            { k: "p", t: String.raw`**$a>0$ のとき。** 3つめから $ax+b>0$ である。1つめは $x(ax+b)>0$ だから、$ax+b>0$ とあわせて $x>0$ を得る。逆に $x>0$ なら、$b\ge0$ より $ax+b>0$、$x(ax+b)>0$ が成り立ち、2つめも $bx^{2}+a\ge a>0$ で成り立つ。よって解集合は $x>0$ をみたす $x$ の全体で、$p=0$ である。` },
            {
              k: "p",
              t: String.raw`**$a=0$ のとき。** 3式は $bx>0$、$bx^{2}>0$、$b>0$ となる。$b=0$ なら3つめが成り立たず解集合は空になり、$x>p$ の形にならないので不適である。$b>0$ なら1つめから $x>0$、2つめは $x\ne0$、3つめはつねに成り立つので、解集合は $x>0$ をみたす $x$ の全体となり、やはり $p=0$ である。`,
            },
            { k: "p", t: String.raw`いずれの場合も $p=0$ である。` },
          ],
          pitfalls: [
            String.raw`「巡回させても同じ条件になる」ことを一言書いておけば、$a=0$、$b=0$、$c=0$ の3通りを別々に調べる必要はなくなる。書かずに $c=0$ だけ扱うと、議論に穴が残る。`,
            String.raw`$a=0$ かつ $b=0$（$c=0$ と合わせて3つとも $0$）の場合は解集合が空になる。$x>p$ の形の集合は空ではないので、この場合は仮定に反する。`,
          ],
          check: String.raw`$(a,b,c)=(1,1,0)$ とすると3式は $x^{2}+x>0$、$x^{2}+1>0$、$x+1>0$ で、解集合は $x>0$。$(a,b,c)=(0,1,0)$ なら $x>0$、$x^{2}>0$、$1>0$ でやはり $x>0$。$a,b,c\ge0$ で少なくとも1つが $0$ の $3000$ 組を機械で調べても、解集合の下限はつねに $0$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式",
      topics: ["面積比と座標", "絶対値の和", "領域の面積", "六角形"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{A}(0,0)$、$\\mathrm{B}(1,0)$、$\\mathrm{C}(0,2)$（面積 $1$）で、$2\\le S\\le3$ をみたす点の面積を $1400\\times1400$ の格子で数えて $7.479$ を得て、$\\frac{15}{2}=7.5$ と刻み幅の範囲で一致することを確かめた",
          "$S\\le k$ の面積を $k=1,2,3$ で同じ格子から求め、$1.006$、$5.506$、$12.984$ となって $\\frac{3k^{2}-1}{2}=1,\\,5.5,\\,13$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$2\le\triangle\mathrm{ABX}+\triangle\mathrm{BCX}+\triangle\mathrm{CAX}\le3$ をみたす点 $\mathrm{X}$ の動きうる範囲の面積を求める`,
          answer: String.raw`$\dfrac{15}{2}$`,
          approach: String.raw`$\mathrm{X}$ を $\mathrm{A},\mathrm{B},\mathrm{C}$ の重みつき平均として $\mathrm{X}=\alpha\mathrm{A}+\beta\mathrm{B}+\gamma\mathrm{C}$（$\alpha+\beta+\gamma=1$）と書くと、3つの三角形の面積はちょうど $|\alpha|,|\beta|,|\gamma|$ になる。すると条件は $|\alpha|+|\beta|+|\gamma|$ の大小だけの話になり、絶対値を外すと3本ずつの帯で囲まれた六角形が見えてくる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`平面上の点 $\mathrm{X}$ は、実数 $\alpha,\beta,\gamma$（$\alpha+\beta+\gamma=1$）を使って`,
            },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OX}}=\alpha\overrightarrow{\mathrm{OA}}+\beta\overrightarrow{\mathrm{OB}}+\gamma\overrightarrow{\mathrm{OC}}` },
            {
              k: "p",
              t: String.raw`と一意に書ける。このとき $\triangle\mathrm{BCX}=|\alpha|\cdot\triangle\mathrm{ABC}=|\alpha|$ である。実際、$\mathrm{X}$ と $\mathrm{A}$ の、直線 $\mathrm{BC}$ からの距離の比が $|\alpha|:1$ になるからである。同様に $\triangle\mathrm{CAX}=|\beta|$、$\triangle\mathrm{ABX}=|\gamma|$ だから`,
            },
            { k: "math", t: String.raw`\triangle\mathrm{ABX}+\triangle\mathrm{BCX}+\triangle\mathrm{CAX}=|\alpha|+|\beta|+|\gamma|` },
            { k: "p", t: String.raw`である。これを $S$ と書く。` },
            {
              k: "p",
              t: String.raw`**$S\le k$ を不等式に直す。** 絶対値は、符号で場合分けする代わりに「$\pm\alpha\pm\beta\pm\gamma\le k$ が符号の組み合わせ8通りすべてで成り立つこと」と言いかえられる。$\alpha+\beta+\gamma=1$ を使って整理すると、`,
            },
            {
              k: "steps",
              items: [
                String.raw`$+++$ は $1\le k$、$---$ は $-1\le k$ で、$k\ge1$ ならどちらも自動的に成り立つ。`,
                String.raw`$\alpha+\beta-\gamma\le k$ は $(1-\gamma)-\gamma\le k$、すなわち $\gamma\ge\dfrac{1-k}{2}$。`,
                String.raw`$-\alpha-\beta+\gamma\le k$ は $2\gamma-1\le k$、すなわち $\gamma\le\dfrac{k+1}{2}$。`,
              ],
            },
            { k: "p", t: String.raw`$\alpha$、$\beta$ についても同じなので、$k\ge1$ のとき` },
            {
              k: "math",
              t: String.raw`S\le k\iff \frac{1-k}{2}\le\alpha,\ \beta,\ \gamma\le\frac{k+1}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**面積を出す。** $u=\alpha-\dfrac{1-k}{2}$、$v=\beta-\dfrac{1-k}{2}$、$w=\gamma-\dfrac{1-k}{2}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`u,v,w\ge0,\qquad u+v+w=1-3\cdot\frac{1-k}{2}=\frac{3k-1}{2},\qquad u,v,w\le k`,
            },
            {
              k: "p",
              t: String.raw`となる。$M=\dfrac{3k-1}{2}$ とおく。上限を無視すれば $u,v,w\ge0$、$u+v+w=M$ は三角形で、これは $\triangle\mathrm{ABC}$ を $M$ 倍に拡大した形だから面積は $M^{2}$ である。そこから $u>k$、$v>k$、$w>k$ の3つの角を切り落とす。たとえば $u\ge k$ の部分は $u+v+w=M$ のもとで $M-k=\dfrac{k-1}{2}$ 倍の相似な三角形なので、面積は $(M-k)^{2}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$2(M-k)=k-1\le M$ なので（$k\le3$ の範囲で確かめられる）切り落とす3つは重ならない。よって`,
            },
            {
              k: "math",
              t: String.raw`\left(S\le k\ \text{の面積}\right)=M^{2}-3(M-k)^{2}=\left(\frac{3k-1}{2}\right)^{2}-3\left(\frac{k-1}{2}\right)^{2}=\frac{3k^{2}-1}{2}`,
            },
            { k: "p", t: String.raw`となる。$k=1$ のとき $\dfrac{3-1}{2}=1$ で、三角形 $\mathrm{ABC}$ 自身の面積と合う。` },
            { k: "p", t: String.raw`したがって求める面積は` },
            {
              k: "math",
              t: String.raw`\frac{3\cdot3^{2}-1}{2}-\frac{3\cdot2^{2}-1}{2}=13-\frac{11}{2}=\frac{15}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$\mathrm{A}(0,0)$、$\mathrm{B}(1,0)$、$\mathrm{C}(0,2)$（面積 $1$）のときの様子。内側の六角形が $S=2$、外側の六角形が $S=3$ の境界で、求める範囲はこの2つのあいだ。中央の三角形が $\mathrm{ABC}$ で、その内部では $S=1$。縦方向は縮めて描いてある。`,
                view: [-1.7, 2.7, -2.7, 4.7],
                step: { x: 1, y: 2 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0], faint: true },
                  { k: "seg", a: [1, 0], b: [0, 2], faint: true },
                  { k: "seg", a: [0, 2], b: [0, 0], faint: true },
                  ...HEX3.map((p, i) => ({ k: "seg" as const, a: p, b: HEX3[(i + 1) % 6] })),
                  ...HEX2.map((p, i) => ({ k: "seg" as const, a: p, b: HEX2[(i + 1) % 6], dash: true })),
                  { k: "dot", at: [0, 0], label: "A", place: "left" },
                  { k: "dot", at: [1, 0], label: "B", place: "below-right" },
                  { k: "dot", at: [0, 2], label: "C", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\triangle\mathrm{BCX}=|\alpha|$ となるのは $\triangle\mathrm{ABC}=1$ のときである。一般には $|\alpha|\cdot\triangle\mathrm{ABC}$ で、この問題では $\triangle\mathrm{ABC}=1$ と与えられているので係数が消える。`,
            String.raw`絶対値を場合分けで外すと $2^{3}=8$ 通りになるが、$\pm\alpha\pm\beta\pm\gamma\le k$ がすべて成り立つこと、と言いかえると見通しがよい。符号の組み合わせのうち $+++$ と $---$ は $k\ge1$ なら自動的にみたされる。`,
            String.raw`切り落とす3つの角が重ならないことを確かめておく。$k$ が大きいと重なり始めるが、この問題の $k\le3$ では重ならない。`,
          ],
          check: String.raw`$\mathrm{A}(0,0)$、$\mathrm{B}(1,0)$、$\mathrm{C}(0,2)$ とすると $\triangle\mathrm{ABC}=1$ になる。$1400\times1400$ の格子で $2\le S\le3$ をみたす点の面積を数えると $7.479$ で、$\dfrac{15}{2}=7.5$ と刻み幅の範囲で一致する。$S\le k$ の面積も $k=1,2,3$ でそれぞれ $1.006$、$5.506$、$12.984$ となり、$\dfrac{3k^{2}-1}{2}=1,\ 5.5,\ 13$ に合う。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分法・積分法",
      topics: ["媒介変数表示", "極座標と面積", "回転で掃く領域", "定積分"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\frac{y}{x}$ を $t$ の細かい刻みで追い、$-1<t\\le1$ で単調に減少することを確かめた",
          "$f(t)$ を $200000$ 等分の全探索で調べ、最大値 $3.674234614$ を $t=0.5$ でとること、$\\frac{3\\sqrt6}{2}=3.674234614$ と一致することを確かめた",
          "$D$ の面積を数値積分して $7.06858344$ を得て $\\frac{9\\pi}{4}=7.06858347$ と一致、掃過領域の面積を極座標の数値積分で $17.6722$ と求めて $\\frac{45\\pi}{8}=17.6715$ と刻み幅の範囲で一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$-1<t\le1$ で $\dfrac{y(t)}{x(t)}$ が単調に減少することを示す`,
          answer: String.raw`$\dfrac{y}{x}=3\sqrt{\dfrac{1-t}{1+t}}$ で、根号の中が減少する`,
          approach: String.raw`$x$ も $y$ も $(1+t)$ を因数に持つので、割るとそこが消える。残った形は根号1つだけになり、中身の単調性を見れば終わる。`,
          blocks: [
            { k: "p", t: String.raw`$x(t)=(1+t)\sqrt{1+t}$、$y(t)=3(1+t)\sqrt{1-t}$ で、$-1<t\le1$ では $x(t)>0$ だから` },
            {
              k: "math",
              t: String.raw`\frac{y(t)}{x(t)}=\frac{3(1+t)\sqrt{1-t}}{(1+t)\sqrt{1+t}}=3\sqrt{\frac{1-t}{1+t}}`,
            },
            { k: "p", t: String.raw`である。ここで` },
            { k: "math", t: String.raw`\frac{1-t}{1+t}=\frac{2-(1+t)}{1+t}=\frac{2}{1+t}-1` },
            {
              k: "p",
              t: String.raw`で、$1+t$ は増加し正だから $\dfrac{2}{1+t}$ は減少する。よって根号の中は $-1<t\le1$ で単調に減少し、$\sqrt{\ }$ は増加関数だから $\dfrac{y}{x}$ も単調に減少する。`,
            },
            {
              k: "note",
              t: String.raw`$\dfrac{y}{x}$ は原点から見た $\mathrm{P}$ の方向（偏角の正接）である。これが単調に減少するということは、$t$ が増えるにつれて $\mathrm{P}$ の偏角が単調に減ることを意味し、(3) で「どの向きにも $C$ の点がちょうど1つある」ことの根拠になる。$t\to-1$ で $\dfrac yx\to+\infty$（偏角 $\to\dfrac\pi2$）、$t=1$ で $\dfrac yx=0$（偏角 $0$）である。`,
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`$f(t)=\mathrm{OP}$ の増減を調べ、最大値を求める`,
          answer: String.raw`$-1\le t\le\dfrac12$ で増加、$\dfrac12\le t\le1$ で減少。最大値は $\dfrac{3\sqrt6}{2}$（$t=\dfrac12$）`,
          approach: String.raw`根号のままでは微分が重い。$f$ は $0$ 以上なので、$f^{2}$ の増減を調べれば $f$ の増減がそのまま分かる。$f^{2}$ は $t$ の3次式になり、微分すると因数分解できる。`,
          blocks: [
            { k: "p", t: String.raw`$f(t)\ge0$ なので $f(t)^{2}$ の増減を調べればよい。` },
            {
              k: "math",
              t: String.raw`f(t)^{2}=x^{2}+y^{2}=(1+t)^{3}+9(1+t)^{2}(1-t)=(1+t)^{2}\left\{(1+t)+9(1-t)\right\}=(1+t)^{2}(10-8t)`,
            },
            { k: "p", t: String.raw`である。微分すると` },
            {
              k: "math",
              t: String.raw`\left\{f(t)^{2}\right\}'=2(1+t)(10-8t)-8(1+t)^{2}=(1+t)\left\{20-16t-8-8t\right\}=12(1+t)(1-2t)`,
            },
            {
              k: "p",
              t: String.raw`となる。$-1\le t\le1$ では $1+t\ge0$ なので、符号は $1-2t$ で決まり、$t<\dfrac12$ で正、$t>\dfrac12$ で負である。したがって $f$ は $-1\le t\le\dfrac12$ で増加し、$\dfrac12\le t\le1$ で減少する。最大は $t=\dfrac12$ で`,
            },
            {
              k: "math",
              t: String.raw`f\!\left(\frac12\right)^{2}=\left(\frac32\right)^{2}\left(10-4\right)=\frac94\cdot6=\frac{27}{2},\qquad f\!\left(\frac12\right)=\sqrt{\frac{27}{2}}=\frac{3\sqrt6}{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\dfrac{3\sqrt6}{2}=3.6742$。$-1\le t\le1$ を $200000$ 等分して $f$ を全探索すると、最大値 $3.674234614$ を $t=0.50000$ でとる。両端は $f(-1)=0$、$f(1)=\sqrt{4\cdot2}=2\sqrt2=2.828$ で、どちらも最大値より小さい。`,
        },
        {
          label: "(3)",
          task: String.raw`$D$ を原点のまわりに時計回りに $90^\circ$ 回転させるとき、$D$ が通過する領域の面積を求める`,
          answer: String.raw`$\dfrac{45}{8}\pi$`,
          approach: String.raw`(1) より $\mathrm{P}$ の偏角は $t$ とともに $\dfrac\pi2$ から $0$ まで単調に減るので、$D$ は原点について「星形」、つまり偏角 $\theta$ ごとに $0\le\rho\le r(\theta)$ と書ける。回転で掃く領域も偏角ごとに半径の最大を取るだけで決まる。$r$ は (2) から1回だけ山を作る形なので、最大の取り方が場所によって3通りに分かれ、そのうち2つを足すとちょうど $D$ の面積に戻る、というのが仕掛けである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $t$ が $-1$ から $1$ まで増えるとき $\mathrm{P}$ の偏角 $\theta$ は $\dfrac\pi2$ から $0$ まで単調に減る。よって $0\le\theta\le\dfrac\pi2$ の各方向に $C$ の点がちょうど1つあり、その原点からの距離を $r(\theta)$ とすると`,
            },
            { k: "math", t: String.raw`D=\left\{(\rho,\theta)\ \middle|\ 0\le\theta\le\frac\pi2,\ 0\le\rho\le r(\theta)\right\}` },
            { k: "p", t: String.raw`と書ける（$\rho$ は原点からの距離）。` },
            {
              k: "p",
              t: String.raw`**$r$ の形。** (2) より $f$ は $t=\dfrac12$ で最大 $\dfrac{3\sqrt6}{2}$ をとる。$t=\dfrac12$ のとき $\dfrac yx=3\sqrt{\dfrac{1/2}{3/2}}=\sqrt3$ なので、対応する偏角は $\dfrac\pi3$ である。$\theta$ と $t$ は逆向きに動くから`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\le\theta\le\dfrac\pi3$（$\dfrac12\le t\le1$）では $r$ は増加。$r(0)=f(1)=2\sqrt2$。`,
                String.raw`$\dfrac\pi3\le\theta\le\dfrac\pi2$（$-1\le t\le\dfrac12$）では $r$ は減少。$r\!\left(\dfrac\pi2\right)=f(-1)=0$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`つまり $r$ は $\theta=\dfrac\pi3$ でただ1つの山を作る。`,
            },
            {
              k: "p",
              t: String.raw`**掃いた領域。** 時計回りに $\varphi$（$0\le\varphi\le\dfrac\pi2$）だけ回した $D$ は、偏角 $\theta$ のところで半径 $r(\theta+\varphi)$（ただし $0\le\theta+\varphi\le\dfrac\pi2$ のとき）まで届く。$\varphi$ を全部動かしたときの半径を $R(\theta)$ とすると、掃いた領域の偏角の範囲は $-\dfrac\pi2\le\theta\le\dfrac\pi2$ で`,
            },
            {
              k: "math",
              t: String.raw`R(\theta)=\begin{cases}\displaystyle\max_{0\le s\le\frac\pi2+\theta}r(s)&\left(-\frac\pi2\le\theta\le0\right)\\[3mm]\displaystyle\max_{\theta\le s\le\frac\pi2}r(s)&\left(0\le\theta\le\frac\pi2\right)\end{cases}`,
            },
            { k: "p", t: String.raw`となる。$r$ の山が $\dfrac\pi3$ にあることから、3つに分かれる。` },
            {
              k: "steps",
              items: [
                String.raw`$-\dfrac\pi2\le\theta\le-\dfrac\pi6$：$\dfrac\pi2+\theta\le\dfrac\pi3$ なので $[0,\frac\pi2+\theta]$ で $r$ は増加。$R(\theta)=r\!\left(\dfrac\pi2+\theta\right)$。`,
                String.raw`$-\dfrac\pi6\le\theta\le\dfrac\pi3$：どちらの範囲にも $s=\dfrac\pi3$ が入るので $R(\theta)=\dfrac{3\sqrt6}{2}$（一定）。`,
                String.raw`$\dfrac\pi3\le\theta\le\dfrac\pi2$：$[\theta,\frac\pi2]$ で $r$ は減少。$R(\theta)=r(\theta)$。`,
              ],
            },
            { k: "p", t: String.raw`面積は $\dfrac12\displaystyle\int R^{2}d\theta$ で求まる。1つめは $s=\dfrac\pi2+\theta$ と置換すると` },
            {
              k: "math",
              t: String.raw`\frac12\int_{-\frac\pi2}^{-\frac\pi6}r\!\left(\frac\pi2+\theta\right)^{2}d\theta=\frac12\int_{0}^{\frac\pi3}r(s)^{2}ds`,
            },
            { k: "p", t: String.raw`となり、3つめの $\dfrac12\displaystyle\int_{\frac\pi3}^{\frac\pi2}r(\theta)^{2}d\theta$ と足すと` },
            {
              k: "math",
              t: String.raw`\frac12\int_{0}^{\frac\pi2}r(\theta)^{2}d\theta=\left(D\ \text{の面積}\right)`,
            },
            { k: "p", t: String.raw`に戻る。2つめは半径一定なので扇形で、中心角は $\dfrac\pi3+\dfrac\pi6=\dfrac\pi2$、面積は` },
            {
              k: "math",
              t: String.raw`\frac12\cdot\frac{27}{2}\cdot\frac\pi2=\frac{27}{8}\pi`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$D$ の面積。** $x$ は $t$ とともに増加するので $\displaystyle\int y\,dx$ で求まる。$x'(t)=\dfrac32\sqrt{1+t}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\left(D\ \text{の面積}\right)=\int_{-1}^{1}y(t)x'(t)\,dt=\frac92\int_{-1}^{1}(1+t)^{\frac32}(1-t)^{\frac12}dt`,
            },
            {
              k: "p",
              t: String.raw`である。$1+t=2\sin^{2}\varphi$（$0\le\varphi\le\dfrac\pi2$）と置くと $1-t=2\cos^{2}\varphi$、$dt=4\sin\varphi\cos\varphi\,d\varphi$ で`,
            },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}(1+t)^{\frac32}(1-t)^{\frac12}dt=\int_{0}^{\frac\pi2}2\sqrt2\sin^{3}\varphi\cdot\sqrt2\cos\varphi\cdot4\sin\varphi\cos\varphi\,d\varphi=16\int_{0}^{\frac\pi2}\sin^{4}\varphi\cos^{2}\varphi\,d\varphi`,
            },
            {
              k: "p",
              t: String.raw`となる。$\sin^{4}\varphi\cos^{2}\varphi=\dfrac{1}{32}\left(2-\cos2\varphi-2\cos4\varphi+\cos6\varphi\right)$ と2倍角・3倍角で開いて積分すると $\displaystyle\int_{0}^{\frac\pi2}\sin^{4}\varphi\cos^{2}\varphi\,d\varphi=\frac{\pi}{32}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left(D\ \text{の面積}\right)=\frac92\cdot16\cdot\frac{\pi}{32}=\frac{9}{4}\pi`,
            },
            { k: "p", t: String.raw`である。したがって求める面積は` },
            { k: "math", t: String.raw`\frac94\pi+\frac{27}{8}\pi=\frac{18+27}{8}\pi=\frac{45}{8}\pi` },
            { k: "p", t: String.raw`となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`曲線 $C$ と領域 $D$（網かけ）。$t=-1$ で原点、$t=1$ で $\left(2\sqrt2,0\right)$ に戻る。$\bullet$ は原点からいちばん遠い点（$t=\frac12$、距離 $\frac{3\sqrt6}{2}$、偏角 $\frac\pi3$）。`,
                view: [-0.45, 3.3, -0.5, 3.7],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0, 0] as [number, number],
                      ...Array.from({ length: 81 }, (_, i) => {
                        const t = -1 + (2 * i) / 80;
                        return [X3(t), Y3(t)] as [number, number];
                      }),
                    ],
                  },
                  {
                    k: "param",
                    f: (t: number) => [X3(t), Y3(t)] as [number, number],
                    from: -1,
                    to: 1,
                  },
                  { k: "seg", a: [0, 0], b: [X3(0.5), Y3(0.5)], dash: true, faint: true },
                  { k: "dot", at: [X3(0.5), Y3(0.5)], label: "t = 1/2", place: "above-right" },
                  { k: "dot", at: [2 * Math.SQRT2, 0], label: "(2√2, 0)", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`(1) が効くのは「各方向に $C$ の点がちょうど1つ」を保証する点である。これがないと $D$ を極座標で書けず、回転で掃いた形も分からない。`,
            String.raw`掃いた領域の3つの部分のうち、両端の2つを足すとちょうど $D$ の面積に戻る。別々に計算しようとすると $r(\theta)$ を陽に求める羽目になるが、その必要はない。`,
            String.raw`$D$ の面積は $\displaystyle\int y\,dx$ で、$\displaystyle\int x\,dy$ ではない。$x$ が単調であることを確かめてから使う。`,
          ],
          check: String.raw`$\dfrac{9}{4}\pi=7.0686$、$\dfrac{45}{8}\pi=17.6715$。$D$ の面積を数値積分すると $7.06858344$ で $\dfrac{9\pi}{4}=7.06858347$ と一致する。掃過領域の面積を極座標で数値積分すると $17.6722$ となり、刻み幅の範囲で $\dfrac{45\pi}{8}$ と一致する。扇形のぶん $\dfrac{27}{8}\pi=10.603$ を足した $7.069+10.603=17.672$ とも合う。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列・式と証明",
      topics: ["基本対称式", "母関数", "等比数列", "係数比較"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n,k}$ を定義どおり全部の組合せについて積をとって足し上げ、$a_{4,3}=120$ が問題文の例と一致することを確かめた",
          "$2\\le n\\le11$ で $a_{n,2}=\\frac{(2^{n}-1)(2^{n}-2)}{3}$ が成り立つことを確かめた",
          "$1\\le n\\le9$、$1\\le k\\le n$ のすべてで $\\frac{a_{n+1,k+1}}{a_{n,k}}=\\frac{2^{k}\\left(2^{n+1}-1\\right)}{2^{k+1}-1}$ が分数として一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$2$ 以上の整数 $n$ に対し $a_{n,2}$ を求める`,
          answer: String.raw`$a_{n,2}=\dfrac{\left(2^{n}-1\right)\left(2^{n}-2\right)}{3}$`,
          approach: String.raw`2つずつの積の総和は、「全部の和の2乗」から「2乗の和」を引いて2で割れば出る。どちらも等比数列の和なので簡単に書ける。`,
          blocks: [
            { k: "p", t: String.raw`$s=2^{0}+2^{1}+\cdots+2^{n-1}=2^{n}-1$、$q=\left(2^{0}\right)^{2}+\cdots+\left(2^{n-1}\right)^{2}=\dfrac{4^{n}-1}{3}$ とおく。` },
            { k: "math", t: String.raw`s^{2}=q+2a_{n,2}` },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`a_{n,2}=\frac{s^{2}-q}{2}=\frac{3\left(2^{n}-1\right)^{2}-\left(4^{n}-1\right)}{6}=\frac{2\cdot4^{n}-6\cdot2^{n}+4}{6}=\frac{4^{n}-3\cdot2^{n}+2}{3}`,
            },
            { k: "p", t: String.raw`となる。$4^{n}-3\cdot2^{n}+2=\left(2^{n}-1\right)\left(2^{n}-2\right)$ だから` },
            { k: "math", t: String.raw`a_{n,2}=\frac{\left(2^{n}-1\right)\left(2^{n}-2\right)}{3}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=3$ なら $\dfrac{7\cdot6}{3}=14$。直接数えると $1\cdot2+1\cdot4+2\cdot4=2+4+8=14$ で合う。$n=4$ なら $\dfrac{15\cdot14}{3}=70$ で、$\{1,2,4,8\}$ から2つ選ぶ6通りの積の和 $2+4+8+8+16+32=70$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$\dfrac{f_{n+1}(x)}{f_n(x)}$ と $\dfrac{f_{n+1}(x)}{f_n(2x)}$ を $x$ の整式で表す`,
          answer: String.raw`$\dfrac{f_{n+1}(x)}{f_n(x)}=1+2^{n}x$、$\dfrac{f_{n+1}(x)}{f_n(2x)}=1+x$`,
          approach: String.raw`$a_{n,k}$ は「$2^{0},\dots,2^{n-1}$ から $k$ 個選んだ積の和」なので、$f_n(x)$ はこれらを1つずつ「使う・使わない」で展開したもの、つまり $\left(1+2^{0}x\right)\left(1+2^{1}x\right)\cdots$ という積になる。積の形にしてしまえば2つの比はどちらも1個の因数の差になる。`,
          blocks: [
            { k: "p", t: String.raw`$\left(1+2^{0}x\right)\left(1+2^{1}x\right)\cdots\left(1+2^{n-1}x\right)$ を展開すると、各因数から $1$ か $2^{m}x$ のどちらかを選んで掛け合わせたものの総和になる。$x^{k}$ の係数は「$2^{m}$ を $k$ 個選んだ積の和」、すなわち $a_{n,k}$ である。よって` },
            { k: "math", t: String.raw`f_n(x)=\prod_{m=0}^{n-1}\left(1+2^{m}x\right)` },
            { k: "p", t: String.raw`と書ける。1つめの比は、因数が1つ増えるだけだから` },
            { k: "math", t: String.raw`\frac{f_{n+1}(x)}{f_n(x)}=1+2^{n}x` },
            { k: "p", t: String.raw`である。2つめは、$x$ を $2x$ に置きかえると指数が1つずつずれて` },
            {
              k: "math",
              t: String.raw`f_n(2x)=\prod_{m=0}^{n-1}\left(1+2^{m+1}x\right)=\prod_{m=1}^{n}\left(1+2^{m}x\right)=\frac{f_{n+1}(x)}{1+x}`,
            },
            { k: "p", t: String.raw`となるから` },
            { k: "math", t: String.raw`\frac{f_{n+1}(x)}{f_n(2x)}=1+x` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$f_n$ を積の形に書き直すところがこの問題の中心である。$a_{n,k}$ の定義をそのまま使って比を計算しようとすると行き詰まる。`,
          ],
          check: String.raw`$n=2$ なら $f_2(x)=(1+x)(1+2x)=1+3x+2x^{2}$ で、$a_{2,1}=3$、$a_{2,2}=2$ と合う。$f_3(x)=(1+x)(1+2x)(1+4x)$ で、$\dfrac{f_3}{f_2}=1+4x=1+2^{2}x$、$f_2(2x)=(1+2x)(1+4x)$ より $\dfrac{f_3}{f_2(2x)}=1+x$ となる。`,
        },
        {
          label: "(3)",
          task: String.raw`$\dfrac{a_{n+1,k+1}}{a_{n,k}}$ を $n,k$ で表す`,
          answer: String.raw`$\dfrac{a_{n+1,k+1}}{a_{n,k}}=\dfrac{2^{k}\left(2^{n+1}-1\right)}{2^{k+1}-1}$`,
          approach: String.raw`(2) の2つの等式はどちらも $f_{n+1}$ を $f_n$ で表している。両方の $x^{k+1}$ の係数を書き出すと、$a_{n+1,k+1}$ を $a_{n,k}$ と $a_{n,k+1}$ で表す式が2本できる。2本から $a_{n,k+1}$ を消せば答えが出る。`,
          blocks: [
            { k: "p", t: String.raw`(2) の2つの等式を、分母を払った形で書くと` },
            {
              k: "math",
              t: String.raw`f_{n+1}(x)=\left(1+2^{n}x\right)f_n(x),\qquad f_{n+1}(x)=(1+x)f_n(2x)`,
            },
            { k: "p", t: String.raw`である。$f_n(x)=\displaystyle\sum_{j=0}^{n}a_{n,j}x^{j}$（$a_{n,0}=1$）として、両方で $x^{k+1}$ の係数を比べる。1つめから` },
            { k: "math", t: String.raw`a_{n+1,k+1}=a_{n,k+1}+2^{n}a_{n,k}` },
            { k: "p", t: String.raw`であり、$f_n(2x)=\displaystyle\sum_j a_{n,j}2^{j}x^{j}$ なので2つめからは` },
            { k: "math", t: String.raw`a_{n+1,k+1}=2^{k+1}a_{n,k+1}+2^{k}a_{n,k}` },
            { k: "p", t: String.raw`となる。2式の右辺を等しいとおくと` },
            {
              k: "math",
              t: String.raw`a_{n,k+1}+2^{n}a_{n,k}=2^{k+1}a_{n,k+1}+2^{k}a_{n,k}\iff \left(2^{k+1}-1\right)a_{n,k+1}=\left(2^{n}-2^{k}\right)a_{n,k}`,
            },
            { k: "p", t: String.raw`である。$2^{k+1}-1\ne0$ だから $a_{n,k+1}=\dfrac{2^{n}-2^{k}}{2^{k+1}-1}a_{n,k}$ となり、これを1つめに入れて` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_{n+1,k+1}&=\left\{\frac{2^{n}-2^{k}}{2^{k+1}-1}+2^{n}\right\}a_{n,k}=\frac{2^{n}-2^{k}+2^{n}\left(2^{k+1}-1\right)}{2^{k+1}-1}a_{n,k}\\[1mm]
&=\frac{2^{n+k+1}-2^{k}}{2^{k+1}-1}a_{n,k}=\frac{2^{k}\left(2^{n+1}-1\right)}{2^{k+1}-1}a_{n,k}
\end{aligned}`,
            },
            { k: "p", t: String.raw`を得る。$a_{n,k}>0$ なので割ってよく` },
            { k: "math", t: String.raw`\frac{a_{n+1,k+1}}{a_{n,k}}=\frac{2^{k}\left(2^{n+1}-1\right)}{2^{k+1}-1}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$k=n$ のときは $a_{n,k+1}=a_{n,n+1}$ という「存在しない項」が出るが、$0$ とみなせば式はそのまま成り立つ（$2^{n}-2^{n}=0$ なので左辺も $0$）。`,
          ],
          check: String.raw`$n=3$、$k=2$ なら $\dfrac{2^{2}\left(2^{4}-1\right)}{2^{3}-1}=\dfrac{4\cdot15}{7}=\dfrac{60}{7}$。実際 $a_{4,3}=120$、$a_{3,2}=14$ で $\dfrac{120}{14}=\dfrac{60}{7}$ と一致する。$1\le n\le9$、$1\le k\le n$ のすべてで分数として一致することを確かめた。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形・体積",
      topics: ["円錐", "凸包", "断面積", "ミンコフスキー和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$150$ 万点のモンテカルロで体積 $2.76105$ を得て、$\\frac{2(\\pi+1)}{3}=2.76106$ と一致することを確かめた",
          "断面の式で「入る」と判定した点 $2$ 万個すべてについて、$\\mathrm{A}$ から出る半直線上に円錐 $S$ の点が実際にあることを確かめた（線分 $\\mathrm{AP}$ の和集合と一致する）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面 $z=1$ による $S$ の切り口と $T$ の切り口を同一平面上に図示する`,
          answer: String.raw`$S$ の切り口は原点を中心とする半径 $\dfrac12$ の円板、$T$ の切り口は $\left(\dfrac12,0\right)$ を中心とする半径 $\dfrac12$ の円板`,
          approach: String.raw`$S$ は高さ $z$ で半径が $\dfrac{2-z}{2}$ の円板になる。$T$ のほうは、$\mathrm{A}$ の高さが $2$、$\mathrm{P}$ の高さが $0$ なので、$z=1$ はちょうど線分 $\mathrm{AP}$ の中点である。中点は「$\mathrm{A}$ と $\mathrm{P}$ の平均」だから、$\mathrm{P}$ が底面の円板を動くときの中点の全体は、その円板を半分に縮めて平行移動したものになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S$ は底面が $x^{2}+y^{2}\le1$（$z=0$）、頂点が $(0,0,2)$ の円錐だから、高さ $z$ での切り口は原点を中心とする半径 $\dfrac{2-z}{2}$ の円板である。$z=1$ では半径 $\dfrac12$ の円板になる。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}(1,0,2)$ と $\mathrm{P}(p,q,0)$（$p^{2}+q^{2}\le1$）を結ぶ線分のうち $z=1$ にあるのは中点で、`,
            },
            { k: "math", t: String.raw`\left(\frac{1+p}{2},\ \frac{q}{2},\ 1\right)` },
            {
              k: "p",
              t: String.raw`である。$(p,q)$ が単位円板を動くとき $\left(\dfrac{1+p}{2},\dfrac q2\right)$ は、中心 $\left(\dfrac12,0\right)$、半径 $\dfrac12$ の円板を描く。よって $T$ の切り口はこの円板である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`平面 $z=1$ での切り口。実線の円が $S$ の切り口（中心 $\mathrm{O}$、半径 $\frac12$）、破線の円が $T$ の切り口（中心 $\left(\frac12,0\right)$、半径 $\frac12$）。2つは重なり合う。`,
                view: [-0.85, 1.35, -0.75, 0.75],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [0.5 * Math.cos(t), 0.5 * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (t: number) => [0.5 + 0.5 * Math.cos(t), 0.5 * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [0.5, 0], label: "(1/2, 0)", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`$\mathrm{P}$ が底面の円周の点 $(1,0,0)$ のとき、中点は $(1,0,1)$ で、中心 $\left(\dfrac12,0\right)$ からの距離はちょうど $\dfrac12$。$\mathrm{P}=(-1,0,0)$ なら中点は $(0,0,1)$ で、これも距離 $\dfrac12$。2つの円は中心間の距離が $\dfrac12$、半径がともに $\dfrac12$ なので、互いに相手の中心を通る形で重なる。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}$ が $S$ を動くとき、線分 $\mathrm{AP}$ が通過する部分の体積を求める`,
          answer: String.raw`$\dfrac{2(\pi+1)}{3}$`,
          approach: String.raw`$S$ は凸なので、$\mathrm{A}$ から $S$ の各点へ引いた線分の和集合は、$\mathrm{A}$ と $S$ を合わせた凸包になる。さらに $S$ は「頂点 $(0,0,2)$ と底面の円板の凸包」だから、求める立体は「$\mathrm{A}$、頂点、底面の円板」の凸包である。高さ $z$ で切ると、上の2点から来る線分と底面から来る円板の重みつき和になり、断面は「線分と円板を足した形」、つまり角の丸い長方形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S$ は凸なので、$\mathrm{A}$ から $S$ の各点へ引いた線分すべての和集合は、$\mathrm{A}$ と $S$ の凸包に等しい。$S$ 自体は頂点 $\mathrm{V}(0,0,2)$ と底面の円板 $B$ の凸包だから、求める立体 $U$ は`,
            },
            { k: "math", t: String.raw`U=\left(\mathrm{A},\ \mathrm{V},\ B\ \text{の凸包}\right)` },
            {
              k: "p",
              t: String.raw`である。$\mathrm{A}$ と $\mathrm{V}$ はどちらも高さ $2$、$B$ は高さ $0$ にある。$U$ の点は $\mathrm{A},\mathrm{V},B$ の点の重みつき平均で、高さが $z$ になるのは「高さ $2$ の2点の重みの合計」が $\lambda=\dfrac z2$ のときである。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ と $\mathrm{V}$ の $xy$ 座標は $(1,0)$ と $(0,0)$ だから、重み $\lambda$ の範囲で作れるのは原点から $(\lambda,0)$ までの線分である。残りの重み $1-\lambda$ を円板 $B$ に配ると、半径 $1-\lambda$ の円板が作れる。よって高さ $z$ の断面は`,
            },
            {
              k: "math",
              t: String.raw`\left\{\text{線分}\ (0,0)\text{--}(\lambda,0)\right\}\ \oplus\ \left\{\text{半径}\ 1-\lambda\ \text{の円板}\right\}`,
            },
            {
              k: "p",
              t: String.raw`すなわち、線分の各点を中心に半径 $1-\lambda$ の円板を描いて重ねた形になる。これは縦 $2(1-\lambda)$・横 $\lambda$ の長方形の左右に半径 $1-\lambda$ の半円をつけた形で、面積は`,
            },
            {
              k: "math",
              t: String.raw`S(\lambda)=2\lambda(1-\lambda)+\pi(1-\lambda)^{2}`,
            },
            { k: "p", t: String.raw`である。$z=2\lambda$ より $dz=2\,d\lambda$ なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
V&=\int_{0}^{2}S\!\left(\frac z2\right)dz=2\int_{0}^{1}\left\{2\lambda(1-\lambda)+\pi(1-\lambda)^{2}\right\}d\lambda\\[1mm]
&=2\left\{2\left(\frac12-\frac13\right)+\pi\cdot\frac13\right\}=2\left(\frac13+\frac\pi3\right)=\frac{2(\pi+1)}{3}
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "note",
              t: String.raw`$\lambda=\dfrac12$（$z=1$）のとき断面は、線分 $(0,0)$–$\left(\dfrac12,0\right)$ と半径 $\dfrac12$ の円板の和で、(1) で描いた2つの円板をちょうど包む形になっている。(1) の図が (2) の断面の特別な場合になっていることが確かめられる。`,
            },
          ],
          pitfalls: [
            String.raw`$T$（底面だけを動かしたとき）の体積ではなく、$S$ 全体を動かしたときの体積である。$S$ が凸であることを使って凸包に言いかえると、断面が素直な形になる。`,
            String.raw`断面は円板でも長方形でもなく、両端が半円の「角丸長方形」である。面積を長方形だけ、あるいは円だけで出さない。`,
            String.raw`$\lambda=0$ では半径 $1$ の円板（面積 $\pi$）、$\lambda=1$ では1点（面積 $0$）になる。式 $S(\lambda)$ がこの両端で正しい値を返すことを確かめておくとよい。`,
          ],
          check: String.raw`$\dfrac{2(\pi+1)}{3}=2.7611$。円錐 $S$ だけの体積は $\dfrac13\pi\cdot1^{2}\cdot2=\dfrac{2\pi}{3}=2.0944$ で、差の $\dfrac23=0.667$ が $\mathrm{A}$ 側にはみ出したぶんにあたる。$150$ 万点のモンテカルロでも $2.76105$ となり一致した。`,
        },
      ],
    },
    {
      no: 6,
      field: "三角関数・図形と方程式",
      topics: ["中間値の定理", "三角方程式の解の個数", "楕円の法線", "合成"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\sqrt{2}p=s$、$q$ とおいた方程式 $\\sin\\theta\\cos\\theta-s\\sin\\theta+q\\cos\\theta=0$ の解の個数を $[0,2\\pi)$ の $20$ 万等分で数え、$\\sqrt{s^{2}+q^{2}}<\\frac12$ の $60$ 点すべてで $4$ 個以上になることを確かめた",
          "$\\sqrt{s^{2}+q^{2}}>\\frac12$ の $60$ 点のうち $36$ 点で解が $4$ 個未満になること、とくに $s=q=\\frac{1}{2\\sqrt2}$（距離ちょうど $\\frac12$）で $w=\\cos\\theta-\\sin\\theta$ の2次方程式の解の一方が $\\sqrt2$ に一致し、解が $3$ 個に落ちることを確かめた",
          "楕円の縮閉線（アステロイド）上で $\\sqrt{2x^{2}+y^{2}}$ の最小が $\\frac12$ になることを数値で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$A>1$ のとき $A\sin2\theta-\sin(\theta+\alpha)=0$ が $0\le\theta<2\pi$ に少なくとも $4$ 個の解をもつことを示す`,
          answer: String.raw`$\sin2\theta=\pm1$ となる $4$ 点で符号が交互に変わるので、中間値の定理から $4$ 個`,
          approach: String.raw`$\sin2\theta$ が $\pm1$ をとる点を選ぶと、第1項の絶対値は $A$ になる。第2項は絶対値が $1$ 以下なので、$A>1$ なら第1項の符号がそのまま全体の符号を決める。$\sin2\theta$ は $1,-1,1,-1$ と交互にとるので、符号も交互に変わる。`,
          blocks: [
            { k: "p", t: String.raw`$F(\theta)=A\sin2\theta-\sin(\theta+\alpha)$ とおく。$\theta=\dfrac\pi4,\ \dfrac{3\pi}4,\ \dfrac{5\pi}4,\ \dfrac{7\pi}4$ では $\sin2\theta$ がそれぞれ $1,-1,1,-1$ になるから、$\left|\sin(\theta+\alpha)\right|\le1$ とあわせて` },
            {
              k: "math",
              t: String.raw`F\!\left(\frac\pi4\right)\ge A-1>0,\quad F\!\left(\frac{3\pi}4\right)\le-A+1<0,\quad F\!\left(\frac{5\pi}4\right)>0,\quad F\!\left(\frac{7\pi}4\right)<0`,
            },
            {
              k: "p",
              t: String.raw`となる。$F$ は連続だから、中間値の定理により $\left(\dfrac\pi4,\dfrac{3\pi}4\right)$、$\left(\dfrac{3\pi}4,\dfrac{5\pi}4\right)$、$\left(\dfrac{5\pi}4,\dfrac{7\pi}4\right)$ のそれぞれに解が少なくとも1つある。`,
            },
            {
              k: "p",
              t: String.raw`さらに $F$ は周期 $2\pi$ をもち $F\!\left(\dfrac\pi4+2\pi\right)=F\!\left(\dfrac\pi4\right)>0$ なので、$\left(\dfrac{7\pi}4,\ \dfrac\pi4+2\pi\right)$ にも解がある。この区間の解は $2\pi$ を引けば $0\le\theta<2\pi$ の中の、上の3つとは別の位置に来る。よって $0\le\theta<2\pi$ に少なくとも $4$ 個の解がある。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac\pi4$ から $\dfrac{7\pi}4$ までだと符号の変化は3回しかない。周期性を使って $\dfrac{7\pi}4$ から $\dfrac\pi4+2\pi$ までをもう1区間として数えると4個になる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$D$ 内のすべての点 $\mathrm{P}$ が条件をみたすような $r$ が存在することを示し、その最大値を求める`,
          answer: String.raw`最大値は $r=\dfrac12$`,
          approach: String.raw`「$\mathrm{Q}$ での接線と $\mathrm{PQ}$ が直交する」を式にすると、$\mathrm{Q}$ の媒介変数 $\theta$ についての方程式になり、整理すると (1) とまったく同じ形 $A\sin2\theta-\sin(\theta+\alpha)=0$ になる。$A$ は $\mathrm{P}$ の位置だけで決まり、$A>1$ が $2x^{2}+y^{2}<\dfrac14$ と同値になる。最大値のほうは、$\mathrm{P}$ を特別な向きにとって解の個数を直接数えればよい。`,
          blocks: [
            { k: "p", t: String.raw`$C$ 上の点を $\mathrm{Q}\left(\sqrt2\cos\theta,\ \sin\theta\right)$ とおく。$\theta$ を動かすと $\mathrm{Q}$ は $C$ を1周し、$0\le\theta<2\pi$ の範囲では $\theta$ と $\mathrm{Q}$ が1対1に対応する。接線の方向ベクトルは` },
            { k: "math", t: String.raw`\left(-\sqrt2\sin\theta,\ \cos\theta\right)` },
            { k: "p", t: String.raw`である。$\mathrm{P}(p,q)$ として、$\overrightarrow{\mathrm{PQ}}$ と接線が直交する条件は` },
            {
              k: "math",
              t: String.raw`-\sqrt2\sin\theta\left(\sqrt2\cos\theta-p\right)+\cos\theta\left(\sin\theta-q\right)=0`,
            },
            { k: "p", t: String.raw`すなわち、$s=\sqrt2\,p$ とおくと` },
            {
              k: "math",
              t: String.raw`\sin\theta\cos\theta-s\sin\theta+q\cos\theta=0,\qquad\text{つまり}\qquad \frac12\sin2\theta=s\sin\theta-q\cos\theta`,
            },
            { k: "p", t: String.raw`である。なお $2p^{2}+q^{2}=s^{2}+q^{2}$ なので、$D$ は $s^{2}+q^{2}<r^{2}$ と書き直せる。` },
            {
              k: "p",
              t: String.raw`**$r\le\dfrac12$ なら条件がみたされる。** $\mathrm{P}$ が原点なら $s=q=0$ で、方程式は $\sin2\theta=0$ となり $\theta=0,\dfrac\pi2,\pi,\dfrac{3\pi}2$ の $4$ 個の解をもつ。$\mathrm{P}$ が原点でないときは、合成して`,
            },
            {
              k: "math",
              t: String.raw`s\sin\theta-q\cos\theta=\sqrt{s^{2}+q^{2}}\,\sin(\theta+\alpha)`,
            },
            { k: "p", t: String.raw`となる $\alpha$ がとれるので、両辺を $\sqrt{s^{2}+q^{2}}$ で割って` },
            {
              k: "math",
              t: String.raw`A\sin2\theta-\sin(\theta+\alpha)=0,\qquad A=\frac{1}{2\sqrt{s^{2}+q^{2}}}`,
            },
            {
              k: "p",
              t: String.raw`の形になる。$\sqrt{s^{2}+q^{2}}<\dfrac12$ なら $A>1$ なので、(1) より解は少なくとも $4$ 個ある。異なる $\theta$ には異なる $\mathrm{Q}$ が対応するから、条件をみたす $\mathrm{Q}$ も少なくとも $4$ 個ある。`,
            },
            {
              k: "p",
              t: String.raw`よって $r=\dfrac12$ とすれば、$D$ のすべての点 $\mathrm{P}$（$s^{2}+q^{2}<\dfrac14$）で条件がみたされる。とくにそのような $r$ は存在する。`,
            },
            {
              k: "p",
              t: String.raw`**$r>\dfrac12$ では成り立たない。** $s=q=c>0$ の点を考える。方程式は`,
            },
            { k: "math", t: String.raw`\sin\theta\cos\theta-c\sin\theta+c\cos\theta=0` },
            { k: "p", t: String.raw`である。$w=\cos\theta-\sin\theta$ とおくと $w^{2}=1-2\sin\theta\cos\theta$ より $\sin\theta\cos\theta=\dfrac{1-w^{2}}{2}$ で` },
            { k: "math", t: String.raw`\frac{1-w^{2}}{2}+cw=0\iff w^{2}-2cw-1=0\iff w=c\pm\sqrt{c^{2}+1}` },
            {
              k: "p",
              t: String.raw`となる。$w=\sqrt2\cos\left(\theta+\dfrac\pi4\right)$ なので、$|w|<\sqrt2$ なら $\theta$ は $2$ 個、$|w|=\sqrt2$ なら $1$ 個、$|w|>\sqrt2$ なら $0$ 個である。$c+\sqrt{c^{2}+1}\le\sqrt2$ を整理すると`,
            },
            {
              k: "math",
              t: String.raw`\sqrt{c^{2}+1}\le\sqrt2-c\iff c^{2}+1\le2-2\sqrt2c+c^{2}\iff c\le\frac{1}{2\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`となる（もう一方の $c-\sqrt{c^{2}+1}$ は $c\ge0$ ならつねに $-\sqrt2$ 以上）。したがって $c>\dfrac{1}{2\sqrt2}$ では $w=c+\sqrt{c^{2}+1}$ に対応する $\theta$ がなく、解は $2$ 個しかない。$c=\dfrac{1}{2\sqrt2}$ でも $3$ 個である。`,
            },
            {
              k: "p",
              t: String.raw`この点の原点からの「$D$ での距離」は $\sqrt{s^{2}+q^{2}}=\sqrt2\,c$ で、$c\ge\dfrac{1}{2\sqrt2}$ は $\sqrt2c\ge\dfrac12$ にあたる。$r>\dfrac12$ なら $\dfrac12\le\sqrt2c<r$ となる $c$ がとれて、その $\mathrm{P}$ は $D$ の中にありながら条件をみたさない。よって $r>\dfrac12$ は不適である。`,
            },
            { k: "p", t: String.raw`以上より求める最大値は $r=\dfrac12$ である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`楕円 $C$（外側）と、$2x^{2}+y^{2}=\frac14$ が表す楕円（内側の実線）、および「ちょうど $4$ 個あるかどうか」の境目になる星形の曲線（破線）。内側の楕円は星形にぴったり内接し、接する点が $4$ つある。`,
                view: [-1.65, 1.65, -1.25, 1.25],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [Math.SQRT2 * Math.cos(t), Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (u: number) =>
                      [Math.cos(u) ** 3 / Math.SQRT2, Math.sin(u) ** 3] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                  },
                  {
                    k: "param",
                    f: (t: number) =>
                      [Math.cos(t) / (2 * Math.SQRT2), Math.sin(t) / 2] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "dot", at: [0.25, 1 / (2 * Math.SQRT2)], label: "接点", place: "above-right" },
                  { k: "text", at: [Math.SQRT2, 0], label: "C", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$s=\sqrt2\,p$ と置きかえると、$D$ の条件 $2p^{2}+q^{2}<r^{2}$ がそのまま $s^{2}+q^{2}<r^{2}$ になり、(1) の $A$ も $\dfrac{1}{2\sqrt{s^{2}+q^{2}}}$ ときれいに書ける。この置きかえをしないと式が見通せない。`,
            String.raw`$\mathrm{P}$ が原点の場合は合成ができないので、別に扱う。このときはちょうど $4$ 個になる。`,
            String.raw`最大値を出すには「$r>\dfrac12$ だと壊れる」具体例が要る。$s=q$ の向き（楕円の縮閉線が原点にいちばん近づく向き）をとるのがよく、そこでは $w=\cos\theta-\sin\theta$ の置きかえで解の個数が正確に数えられる。`,
          ],
          check: String.raw`$\sqrt{s^{2}+q^{2}}<\dfrac12$ をみたす $60$ 点を無作為にとって解の個数を数値で数えると、すべて $4$ 個以上だった。$\sqrt{s^{2}+q^{2}}>\dfrac12$ の $60$ 点では $36$ 点で $4$ 個未満になる。$c=\dfrac{1}{2\sqrt2}=0.3535534$ では $c+\sqrt{c^{2}+1}=\dfrac{1}{2\sqrt2}+\dfrac{3}{2\sqrt2}=\sqrt2$ となってちょうど境目になり、この点の距離は $\sqrt2c=\dfrac12$ である。`,
        },
      ],
    },
  ],
};
