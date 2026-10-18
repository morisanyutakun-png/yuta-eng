import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2021年度（令和3年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 *
 * この年度は理系と重なりが大きい。第2問は理系 第2問とまったく同じ設定で、
 * 第3問は理系 第4問と同じ条件 (*) を、文系向けの小問に組み替えたものである。
 */

/** 第1問の図。$a=\tfrac{\sqrt2}{2}$（距離が最小になるとき）。 */
const A21B = Math.SQRT2 / 2;
const PAR21 = (x: number): number => x * x;
const PQ21 = (x: number): number => 2 * A21B * x + 1;
/** $t^{2}-2at-1=0$ の2解が接点の $x$ 座標 */
const T1_21 = A21B - Math.sqrt(A21B * A21B + 1);
const T2_21 = A21B + Math.sqrt(A21B * A21B + 1);
const TAN21 = (t: number) => (x: number): number => 2 * t * x - t * t;

export const handaiBunkei2021: SolutionSet = {
  slug: "handai-bunkei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・図形と方程式",
      topics: ["放物線の接線", "2次方程式の判別式", "解と係数の関係", "点と直線の距離"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $2$ 万通り無作為にとり、$t^{2}-2at-1=0$ の2解から接線を作ると、どちらも $\\mathrm{A}\\left(a,-1\\right)$ を通り、2接点はつねに相異なり、$\\mathrm{PQ}$ の傾きが $2a$・$\\mathrm{P},\\mathrm{Q}$ が $y=2ax+1$ 上にあった（違反 $0$ 件）",
          "$L=\\tfrac{2a^{2}+2}{\\sqrt{4a^{2}+1}}$ を $-6\\le a\\le6$ で $60$ 万等分して最小を探すと $1.7320508$（$a=-0.707100$）で、$\\sqrt3=1.7320508$、$\\tfrac{\\sqrt2}{2}=0.707107$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ を実数、$C$ を放物線 $y=x^{2}$ とする。点 $\mathrm{A}\left(a,-1\right)$ を通るような $C$ の接線が、ちょうど2本存在することを示す`,
          answer: String.raw`接点の $x$ 座標 $t$ は $t^{2}-2at-1=0$ をみたす。判別式は $4\left(a^{2}+1\right)>0$ なので $t$ は相異なる2つ。接点が違えば接線も違うので、接線はちょうど2本`,
          approach: String.raw`接点を $\left(t,t^{2}\right)$ とおき、接線が $\mathrm{A}$ を通る条件を $t$ の方程式にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=x^{2}$ のとき $y'=2x$ なので、$C$ 上の点 $\left(t,t^{2}\right)$ における接線は`,
            },
            {
              k: "math",
              t: String.raw`y=t^{2}+2t\left(x-t\right)=2tx-t^{2}`,
            },
            { k: "p", t: String.raw`である。これが $\mathrm{A}\left(a,-1\right)$ を通る条件は` },
            {
              k: "math",
              t: String.raw`-1=2ta-t^{2},\qquad t^{2}-2at-1=0\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`である。$\left(\ast\right)$ は $t$ の2次方程式で、判別式は` },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=a^{2}+1>0`,
            },
            {
              k: "p",
              t: String.raw`である（$a$ がどんな実数でも正）。よって $\left(\ast\right)$ は相異なる2つの実数解をもつ。`,
            },
            {
              k: "p",
              t: String.raw`接点が異なれば接線も異なる。実際、接線 $y=2tx-t^{2}$ の傾きは $2t$ なので、$t$ が違えば傾きが違う。したがって $\mathrm{A}$ を通る $C$ の接線はちょうど2本である。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$\mathrm{A}$ の $y$ 座標が $-1$（放物線より下）なので、$a$ がどこにあっても接線が2本引ける。もし $\mathrm{A}$ が放物線の上側にあれば $0$ 本になる。$\left(\ast\right)$ の定数項が $-1$ であること（$<0$）が「いつでも2本」の正体である。`,
            },
          ],
          pitfalls: [
            String.raw`「接点が2つ」から「接線が2本」を言うには、接点が違えば接線も違うことを一言添える。傾き $2t$ で区別できる。`,
          ],
          check: String.raw`$2$ 万通りの $a$ で、2解から作った接線がどちらも $\mathrm{A}$ を通り、2接点は相異なった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{A}\left(a,-1\right)$ から $C$ に2本の接線を引き、接点を $\mathrm{P},\mathrm{Q}$ とする。直線 $\mathrm{PQ}$ の方程式が $y=2ax+1$ であることを示す`,
          answer: String.raw`接点の $x$ 座標を $p,q$ とすると解と係数の関係から $p+q=2a$、$pq=-1$。傾きは $\dfrac{p^{2}-q^{2}}{p-q}=p+q=2a$、切片は $p^{2}-2ap=-pq=1$`,
          approach: String.raw`$\left(\ast\right)$ の解と係数の関係を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の $\left(\ast\right)$ の2解を $p,q$（$p\ne q$）とすると、$\mathrm{P}\left(p,p^{2}\right)$、$\mathrm{Q}\left(q,q^{2}\right)$ である。解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`p+q=2a,\qquad pq=-1`,
            },
            { k: "p", t: String.raw`である。直線 $\mathrm{PQ}$ の傾きは` },
            {
              k: "math",
              t: String.raw`\frac{p^{2}-q^{2}}{p-q}=\frac{\left(p+q\right)\left(p-q\right)}{p-q}=p+q=2a`,
            },
            {
              k: "p",
              t: String.raw`である（$p\ne q$ なので割ってよい）。$\mathrm{P}$ を通るので、$\mathrm{PQ}$ の式は`,
            },
            {
              k: "math",
              t: String.raw`y=2a\left(x-p\right)+p^{2}=2ax+\left(p^{2}-2ap\right)`,
            },
            { k: "p", t: String.raw`である。定数項は $2a=p+q$ を使って` },
            {
              k: "math",
              t: String.raw`p^{2}-2ap=p^{2}-\left(p+q\right)p=-pq=1`,
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{PQ}:\ y=2ax+1`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = √2/2（距離が最小になるとき）。A から引いた 2 本の接線の接点 P、Q を結ぶと、直線 PQ は y = 2ax + 1 になる。a がどこでも PQ は点 (0, 1) を通る。",
                view: [-3.0, 3.0, -1.8, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: PAR21, from: -1.85, to: 1.85 },
                  { k: "curve", f: TAN21(T1_21), from: -3.0, to: 1.2 },
                  { k: "curve", f: TAN21(T2_21), from: -1.2, to: 3.0 },
                  { k: "curve", f: PQ21, from: -3.0, to: 1.6 },
                  { k: "dot", at: [A21B, -1], label: "A(a, −1)", place: "below-right" },
                  { k: "dot", at: [T1_21, T1_21 * T1_21], label: "P", place: "above-left" },
                  { k: "dot", at: [T2_21, T2_21 * T2_21], label: "Q", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$y=2ax+1$ は $a$ によらず点 $\left(0,1\right)$ を通る。$\mathrm{A}$ が直線 $y=-1$ の上を動くとき、2接点を結ぶ直線はつねに $\left(0,1\right)$ を通る、ということである（$y=-1$ を準線とみたときの焦点にあたる）。`,
            },
          ],
          pitfalls: [
            String.raw`$p,q$ を具体的に $a\pm\sqrt{a^{2}+1}$ と書き下しても解けるが、根号が残って計算が重い。解と係数の関係だけで足りる。`,
          ],
          check: String.raw`$2$ 万通りの $a$ で $\mathrm{P},\mathrm{Q}$ がともに $y=2ax+1$ の上にあった。`,
        },
        {
          label: "(3)",
          task: String.raw`点 $\mathrm{A}\left(a,-1\right)$ と直線 $y=2ax+1$ の距離を $L$ とする。$a$ が実数全体を動くとき、$L$ の最小値とそのときの $a$ の値を求める`,
          answer: String.raw`最小値 $\sqrt3$、$a=\pm\dfrac{\sqrt2}{2}$`,
          approach: String.raw`$L=\dfrac{2a^{2}+2}{\sqrt{4a^{2}+1}}$。$u=4a^{2}+1$ とおくと $L=\dfrac12\left(\sqrt u+\dfrac{3}{\sqrt u}\right)$ で相加相乗平均。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線を $2ax-y+1=0$ と書くと、点と直線の距離の公式より`,
            },
            {
              k: "math",
              t: String.raw`L=\frac{\left|2a\cdot a-\left(-1\right)+1\right|}{\sqrt{\left(2a\right)^{2}+\left(-1\right)^{2}}}=\frac{2a^{2}+2}{\sqrt{4a^{2}+1}}`,
            },
            {
              k: "p",
              t: String.raw`である（分子は $2\left(a^{2}+1\right)>0$ なので絶対値は外せる）。`,
            },
            {
              k: "p",
              t: String.raw`$u=4a^{2}+1$ とおくと $u\ge1$ で、$a^{2}=\dfrac{u-1}{4}$ である。分子は`,
            },
            {
              k: "math",
              t: String.raw`2a^{2}+2=\frac{u-1}{2}+2=\frac{u+3}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`L=\frac{u+3}{2\sqrt u}=\frac12\left(\sqrt u+\frac{3}{\sqrt u}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt u>0$ なので相加平均と相乗平均の関係から`,
            },
            {
              k: "math",
              t: String.raw`\sqrt u+\frac{3}{\sqrt u}\ge2\sqrt{\sqrt u\cdot\frac{3}{\sqrt u}}=2\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`であり、等号は $\sqrt u=\dfrac{3}{\sqrt u}$、すなわち $u=3$ のときに成り立つ。$u=3$ は $4a^{2}+1=3$、つまり`,
            },
            {
              k: "math",
              t: String.raw`a^{2}=\frac12,\qquad a=\pm\frac{\sqrt2}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。これは $u\ge1$ をみたすので実現できる。したがって`,
            },
            {
              k: "math",
              t: String.raw`L\ \text{の最小値は}\ \frac{2\sqrt3}{2}=\sqrt3\qquad\left(a=\pm\frac{\sqrt2}{2}\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          alts: [
            {
              title: "そのまま微分する",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$L$ は偶関数なので $a\ge0$ で考えてよい。$L^{2}=\dfrac{\left(2a^{2}+2\right)^{2}}{4a^{2}+1}$ を $a$ で微分すると`,
                },
                {
                  k: "math",
                  t: String.raw`\left(L^{2}\right)'=\frac{8a\left(2a^{2}+2\right)\left(4a^{2}+1\right)-8a\left(2a^{2}+2\right)^{2}}{\left(4a^{2}+1\right)^{2}}=\frac{8a\left(2a^{2}+2\right)\left(2a^{2}-1\right)}{\left(4a^{2}+1\right)^{2}}`,
                },
                {
                  k: "p",
                  t: String.raw`である。$a>0$ では符号は $2a^{2}-1$ と同じなので、$a=\dfrac{1}{\sqrt2}=\dfrac{\sqrt2}{2}$ で最小。同じ答えになるが、置きかえのほうが式が軽い。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`相加相乗平均を使うときは、等号が実際に成り立つ（$u=3$ が $u\ge1$ の範囲にある）ことを確かめる。`,
            String.raw`$a=\pm\dfrac{\sqrt2}{2}$ の2つとも答え。$L$ が偶関数なので片方だけにしない。`,
          ],
          check: String.raw`$60$ 万等分の走査でも最小 $1.7320508$（$a=-0.7071$）で、$\sqrt3$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["空間ベクトル", "共面条件", "内分点", "内積と角"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "同一平面上にない $\\mathrm{O},\\mathrm{A},\\mathrm{B},\\mathrm{C}$ を $2$ 万組無作為にとり、$t=\\tfrac{2s}{s+1}$ とすると、$\\mathrm{A}_{0},\\mathrm{B}_{0},\\mathrm{P},\\mathrm{Q}$ の張る行列式がつねに $0$ になった（違反 $0$ 件）",
          "(2) の条件をみたす座標を作って $\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OQ}}=0$ を $0<s<1$ で数値的に解くと、解は $s=0.200001$ の1つだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`空間内に同一平面上にない4点 $\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ がある。$0<s<1$、$0<t<1$ とし、$\mathrm{OA}$ を $1:1$ に内分する点を $\mathrm{A}_{0}$、$\mathrm{OB}$ を $1:2$ に内分する点を $\mathrm{B}_{0}$、$\mathrm{AC}$ を $s:\left(1-s\right)$ に内分する点を $\mathrm{P}$、$\mathrm{BC}$ を $t:\left(1-t\right)$ に内分する点を $\mathrm{Q}$ とする。$\mathrm{A}_{0},\mathrm{B}_{0},\mathrm{P},\mathrm{Q}$ が同一平面上にあるとき、$t$ を $s$ で表す`,
          answer: String.raw`$t=\dfrac{2s}{s+1}$`,
          approach: String.raw`$\vec a,\vec b,\vec c$ を基底にとり、$\overrightarrow{\mathrm{A}_{0}\mathrm{Q}}=\alpha\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}+\beta\overrightarrow{\mathrm{A}_{0}\mathrm{P}}$ の係数を比較する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおく。4点が同一平面上にないので、$\vec a,\vec b,\vec c$ は1次独立である。内分点を書くと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{OA}_{0}}&=\frac12\vec a, & \overrightarrow{\mathrm{OB}_{0}}&=\frac13\vec b,\\ \overrightarrow{\mathrm{OP}}&=\left(1-s\right)\vec a+s\vec c, & \overrightarrow{\mathrm{OQ}}&=\left(1-t\right)\vec b+t\vec c\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{B}_{0}$ は $\mathrm{OB}_{0}:\mathrm{B}_{0}\mathrm{B}=1:2$ なので $\dfrac13\vec b$）。`,
            },
            {
              k: "p",
              t: String.raw`4点が同一平面上にある条件は、実数 $\alpha,\beta$ を用いて $\overrightarrow{\mathrm{A}_{0}\mathrm{Q}}=\alpha\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}+\beta\overrightarrow{\mathrm{A}_{0}\mathrm{P}}$ と書けることである。各ベクトルは`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{A}_{0}\mathrm{B}_{0}}&=-\frac12\vec a+\frac13\vec b\\ \overrightarrow{\mathrm{A}_{0}\mathrm{P}}&=\left(\frac12-s\right)\vec a+s\vec c\\ \overrightarrow{\mathrm{A}_{0}\mathrm{Q}}&=-\frac12\vec a+\left(1-t\right)\vec b+t\vec c\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、1次独立性から係数を比べて` },
            {
              k: "math",
              t: String.raw`\begin{cases}-\dfrac12=-\dfrac{\alpha}{2}+\beta\left(\dfrac12-s\right)\\[2pt] 1-t=\dfrac{\alpha}{3}\\[2pt] t=\beta s\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。第2式から $\alpha=3\left(1-t\right)$、第3式から $\beta=\dfrac ts$（$s>0$）。これを第1式に入れると`,
            },
            {
              k: "math",
              t: String.raw`-\frac12=-\frac32\left(1-t\right)+\frac ts\left(\frac12-s\right)=-\frac32+\frac32t+\frac{t}{2s}-t`,
            },
            { k: "p", t: String.raw`であり、整理すると` },
            {
              k: "math",
              t: String.raw`1=\frac t2+\frac{t}{2s}=\frac{t\left(s+1\right)}{2s},\qquad t=\frac{2s}{s+1}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<s<1$ のとき $2s<s+1$ なので $0<t<1$ をみたしており、条件に合う。`,
            },
            {
              k: "note",
              t: String.raw`この問題は同じ年度の理系 第2問とまったく同じ設定で、答えも同じである。空間ベクトルの基本（基底・1次独立・係数比較）だけで解けるので、文理共通で出せる形になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$1:2$ の内分を $\dfrac23\vec b$ と取り違えやすい。$\mathrm{OB}_{0}:\mathrm{B}_{0}\mathrm{B}=1:2$ なので $\mathrm{OB}_{0}$ は $\mathrm{OB}$ の $\dfrac13$ である。`,
            String.raw`「同一平面上にない4点」は $\vec a,\vec b,\vec c$ の1次独立を保証するための条件。これを明示しないと係数比較ができない。`,
          ],
          check: String.raw`$2$ 万組の無作為な配置で、$t=\dfrac{2s}{s+1}$ のとき4点が同一平面上にあった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\left|\overrightarrow{\mathrm{OA}}\right|=1$、$\left|\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OC}}\right|=2$、$\angle\mathrm{AOB}=120^{\circ}$、$\angle\mathrm{BOC}=90^{\circ}$、$\angle\mathrm{COA}=60^{\circ}$、$\angle\mathrm{POQ}=90^{\circ}$ のとき、$s$ の値を求める`,
          answer: String.raw`$s=\dfrac15$`,
          approach: String.raw`内積をすべて数値にし、$\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ を $s,t$ の式にしてから (1) を代入。`,
          blocks: [
            { k: "p", t: String.raw`与えられた長さと角から` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\vec a\cdot\vec b&=1\cdot2\cos120^{\circ}=-1\\ \vec b\cdot\vec c&=2\cdot2\cos90^{\circ}=0\\ \vec c\cdot\vec a&=2\cdot1\cos60^{\circ}=1\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`であり、$\left|\vec a\right|^{2}=1$、$\left|\vec b\right|^{2}=\left|\vec c\right|^{2}=4$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\angle\mathrm{POQ}=90^{\circ}$ は $\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ である。展開すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}&=\left\{\left(1-s\right)\vec a+s\vec c\right\}\cdot\left\{\left(1-t\right)\vec b+t\vec c\right\}\\ &=-\left(1-s\right)\left(1-t\right)+\left(1-s\right)t+0+4st\\ &=-1+s+2t+2st\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、条件は` },
            {
              k: "math",
              t: String.raw`s+2t+2st=1`,
            },
            { k: "p", t: String.raw`である。(1) の $t=\dfrac{2s}{s+1}$ を代入し、両辺に $s+1$ を掛けると` },
            {
              k: "math",
              t: String.raw`s\left(s+1\right)+4s+4s^{2}=s+1,\qquad5s^{2}+4s-1=0`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(5s-1\right)\left(s+1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$0<s<1$ より $s=\dfrac15$ である。このとき $t=\dfrac{2/5}{6/5}=\dfrac13$ で、たしかに $0<t<1$ をみたす。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\vec c\right|^{2}=4$ を $1$ と間違えると $st$ の係数がずれて別の答えになる。長さが $\mathrm{A}$ だけ $1$ であることに注意。`,
            String.raw`出てくる $s=-1$ は $0<s<1$ の外なので捨てる。`,
          ],
          check: String.raw`座標を作って $\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}=0$ を数値的に解くと $s=0.200001$ の1つだけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分・整数",
      topics: ["定積分の計算", "因数分解", "約数の列挙", "整数の合同"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left|a\\right|,\\left|b\\right|\\le40$ で条件 $\\left(\\ast\\right)$ をみたす整数の組をすべて拾うと、どれも $c^{2}=-\\tfrac{\\left(2a+b\\right)\\left(a+2b\\right)}{3}$ をみたし、現れた $c$ はすべて $3$ の倍数だった",
          "$\\left|a\\right|,\\left|b\\right|\\le200$ を全数調査すると、$c=3$ かつ $a<b$ をみたす組は $\\left(-7,5\\right)$ と $\\left(-5,7\\right)$ の2つだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`整数 $a,b,c$ に関する条件 $\displaystyle\int_{a}^{c}\left(x^{2}+bx\right)dx=\int_{b}^{c}\left(x^{2}+ax\right)dx\ \cdots\left(\ast\right)$ を考える。$a,b,c$ が $\left(\ast\right)$ および $a\ne b$ をみたすとき、$c^{2}$ を $a,b$ で表す`,
          answer: String.raw`$c^{2}=-\dfrac{\left(2a+b\right)\left(a+2b\right)}{3}=-\dfrac{2a^{2}+5ab+2b^{2}}{3}$`,
          approach: String.raw`両辺を計算して差をとると $b-a$ でくくれる。`,
          blocks: [
            { k: "p", t: String.raw`両辺を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}\int_{a}^{c}\left(x^{2}+bx\right)dx&=\frac{c^{3}-a^{3}}{3}+\frac b2\left(c^{2}-a^{2}\right)\\ \int_{b}^{c}\left(x^{2}+ax\right)dx&=\frac{c^{3}-b^{3}}{3}+\frac a2\left(c^{2}-b^{2}\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`なので、差をとると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\frac{b^{3}-a^{3}}{3}+\frac{c^{2}}{2}\left(b-a\right)+\frac{ab}{2}\left(b-a\right)\\ &=\left(b-a\right)\left\{\frac{a^{2}+ab+b^{2}}{3}+\frac{c^{2}}{2}+\frac{ab}{2}\right\}\end{aligned}`,
            },
            { k: "p", t: String.raw`である。$6$ 倍して整理すると` },
            {
              k: "math",
              t: String.raw`\left(b-a\right)\left(2a^{2}+5ab+2b^{2}+3c^{2}\right)=0`,
            },
            { k: "p", t: String.raw`であり、$2a^{2}+5ab+2b^{2}=\left(2a+b\right)\left(a+2b\right)$ だから` },
            {
              k: "math",
              t: String.raw`\left(b-a\right)\left\{\left(2a+b\right)\left(a+2b\right)+3c^{2}\right\}=0`,
            },
            { k: "p", t: String.raw`となる。$a\ne b$ なので` },
            {
              k: "math",
              t: String.raw`c^{2}=-\frac{\left(2a+b\right)\left(a+2b\right)}{3}\quad\cdots\left(\ast\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`である。展開した形で書けば $c^{2}=-\dfrac{2a^{2}+5ab+2b^{2}}{3}$ である。`,
            },
            {
              k: "note",
              t: String.raw`左辺は平方数なので $0$ 以上。つまり $\left(2a+b\right)\left(a+2b\right)\le0$ が必要で、$\left(\ast\right)$ をみたす $a,b$ はかなり限られる。(2) はこれを使って探す。`,
            },
          ],
          pitfalls: [
            String.raw`$a\ne b$ を使わないと、$b-a=0$（このとき $c$ は何でもよい）が混ざる。`,
            String.raw`$2a^{2}+5ab+2b^{2}$ の因数分解 $\left(2a+b\right)\left(a+2b\right)$ は (2)(3) でそのまま効く。展開形のままにしない。`,
          ],
          check: String.raw`$\left|a\right|,\left|b\right|\le40$ の全数調査で、条件をみたす組はすべてこの式をみたした。`,
        },
        {
          label: "(2)",
          task: String.raw`$c=3$ のとき、$\left(\ast\right)$ および $a<b$ をみたす整数の組 $\left(a,b\right)$ をすべて求める`,
          answer: String.raw`$\left(a,b\right)=\left(-7,5\right),\left(-5,7\right)$`,
          approach: String.raw`$u=2a+b$、$v=a+2b$ とおくと $uv=-27$。$a,b$ が整数になる条件は $3\mid\left(u+v\right)$。`,
          blocks: [
            { k: "p", t: String.raw`$c=3$ を $\left(\ast\ast\right)$ に入れると` },
            {
              k: "math",
              t: String.raw`\left(2a+b\right)\left(a+2b\right)=-3c^{2}=-27`,
            },
            { k: "p", t: String.raw`である。$u=2a+b$、$v=a+2b$ とおくと $uv=-27$ で、逆に` },
            {
              k: "math",
              t: String.raw`a=\frac{2u-v}{3},\qquad b=\frac{2v-u}{3}`,
            },
            {
              k: "p",
              t: String.raw`と戻せる。$2u-v\equiv-\left(u+v\right)$、$2v-u\equiv-\left(u+v\right)\pmod3$ なので、$a,b$ がともに整数になる条件は $3\mid\left(u+v\right)$ の1つだけである。また $v-u=b-a$ なので $a<b\iff u<v$ である。`,
            },
            {
              k: "p",
              t: String.raw`$uv=-27<0$ なので $u,v$ は異符号で、$u<v$ と合わせて $u<0<v$ である。$u=-d$（$d$ は $27$ の正の約数）とおくと $v=\dfrac{27}{d}$ で、$d\in\left\{1,3,9,27\right\}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$d=1$：$u+v=-1+27=26$ は $3$ の倍数でない。`,
                String.raw`$d=3$：$u+v=-3+9=6$ は $3$ の倍数。$a=\dfrac{-6-9}{3}=-5$、$b=\dfrac{18+3}{3}=7$。`,
                String.raw`$d=9$：$u+v=-9+3=-6$ は $3$ の倍数。$a=\dfrac{-18-3}{3}=-7$、$b=\dfrac{6+9}{3}=5$。`,
                String.raw`$d=27$：$u+v=-27+1=-26$ は $3$ の倍数でない。`,
              ],
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(-5,7\right),\ \left(-7,5\right)`,
            },
            {
              k: "p",
              t: String.raw`の2組である。確かめると $\left(-5,7\right)$ では $\left(2a+b\right)\left(a+2b\right)=\left(-3\right)\cdot9=-27$、$\left(-7,5\right)$ では $\left(-9\right)\cdot3=-27$ で、どちらも合う。また $a<b$ もみたしている。`,
            },
          ],
          pitfalls: [
            String.raw`$u,v$ から $a,b$ に戻すとき、整数になる条件は2つあるように見えて、法 $3$ では同じ1つの条件に帰着する。`,
            String.raw`$d=1,27$ を落とさずに全部調べる。約数は $4$ 個しかないので、素直に並べるのが速い。`,
          ],
          check: String.raw`$\left|a\right|,\left|b\right|\le200$ の全数調査でも、この2組だけだった。`,
        },
        {
          label: "(3)",
          task: String.raw`整数 $a,b,c$ が $\left(\ast\right)$ および $a\ne b$ をみたすとき、$c$ が $3$ の倍数であることを示す`,
          answer: String.raw`法 $3$ で $\left(2a+b\right)\left(a+2b\right)\equiv-\left(a-b\right)^{2}$ なので $3\mid\left(a-b\right)$。$b-a=3m$ を戻すと $9\left(a+m\right)\left(a+2m\right)=-3c^{2}$ から $3\mid c^{2}$、よって $3\mid c$`,
          approach: String.raw`合同式を2段階で使う。1段目で $a-b$、2段目で $c$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(\ast\ast\right)$ を分母を払った形で書くと`,
            },
            {
              k: "math",
              t: String.raw`\left(2a+b\right)\left(a+2b\right)=-3c^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**第1段**。右辺は $3$ の倍数である。法 $3$ で $2a+b\equiv b-a$、$a+2b\equiv a-b$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left(2a+b\right)\left(a+2b\right)\equiv-\left(a-b\right)^{2}\pmod3`,
            },
            {
              k: "p",
              t: String.raw`である。よって $3\mid\left(a-b\right)^{2}$ であり、$3$ は素数なので $3\mid\left(a-b\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`**第2段**。$b-a=3m$（$m$ は $0$ でない整数）とおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}2a+b&=3a+\left(b-a\right)=3\left(a+m\right)\\ a+2b&=3a+2\left(b-a\right)=3\left(a+2m\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`9\left(a+m\right)\left(a+2m\right)=-3c^{2},\qquad c^{2}=-3\left(a+m\right)\left(a+2m\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。右辺は $3$ の倍数なので $3\mid c^{2}$、$3$ は素数だから $3\mid c$ である。すなわち $c$ は $3$ の倍数である。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`(2) の答えでも確かめられる。$\left(a,b\right)=\left(-5,7\right)$ では $a-b=-12$ でたしかに $3$ の倍数、$c=3$ もそうである。(2) で $c=3$ という「$3$ の倍数」が与えられていたのは偶然ではなく、(3) が言うとおり $c$ は $3$ の倍数しかありえない。`,
            },
          ],
          pitfalls: [
            String.raw`第1段だけでは「$a-b$ が $3$ の倍数」しか出ず、$c$ については何も言えない。もう一度代入して $9$ が現れるところまで進める。`,
            String.raw`$a\ne b$ があるので $m\ne0$。ここは (1) から引き継ぐ。`,
          ],
          check: String.raw`$\left|a\right|,\left|b\right|\le40$ の全数調査で、現れた $c$ はすべて $3$ の倍数だった。`,
        },
      ],
    },
  ],
};
