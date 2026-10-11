import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2022年度（令和4年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第2問には問題冊子に三角柱の図が付いているが、こちらでは一切再現していない。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第3問の図。放物線と2本の接線。 */
const PAR3 = (x: number) => (x * x) / 4;
const TL1 = (x: number) => -x / 2 - 0.25;
const TL2 = (x: number) => 2 * x - 4;
const LOW3 = (x: number) => (x < 1.5 ? TL1(x) : TL2(x));

/** 第4問の図。a=b=1/2（ab=1/4）のときの配置。 */
const HYP4 = (x: number) => -1 / x;
const LOC4 = (x: number) => 1 / x;
const RT2 = Math.SQRT2;

export const kyodaiBunkei2022: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "指数・対数",
      topics: ["底の変換", "常用対数", "不等式の評価", "2のべき"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\log_4 2022=5.490783641$ を直接計算し、$5.4$ と $5.5$ のあいだにあることを確かめた",
          "下からの評価 $\\frac{3.301}{2\\times0.3011}=5.481568>5.4$ と、$5.4\\times0.6022=3.25188<3.301$ を確かめた",
          "$2022<2048=2^{11}$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$5.4<\log_{4}2022<5.5$ を示す（$0.301<\log_{10}2<0.3011$ を用いてよい）`,
          answer: String.raw`上は $2022<2^{11}$ から、下は $\log_{4}2022=\dfrac{\log_{10}2022}{2\log_{10}2}>\dfrac{3.301}{0.6022}>5.4$ から`,
          approach: String.raw`上限は $2$ のべきと比べるだけで済む。$2048=2^{11}$ がちょうど $4^{5.5}$ だからである。下限は $\log_{10}$ に直し、$2022>2000=2\times10^{3}$ を使って $\log_{10}2022$ を下から押さえる。`,
          blocks: [
            { k: "p", t: String.raw`$\log_{4}2022=\dfrac{\log_{10}2022}{\log_{10}4}=\dfrac{\log_{10}2022}{2\log_{10}2}$ である。` },
            {
              k: "p",
              t: String.raw`**上からの評価。** $2022<2048=2^{11}$ で、$2^{11}=\left(2^{2}\right)^{5.5}=4^{5.5}$ だから`,
            },
            { k: "math", t: String.raw`\log_{4}2022<\log_{4}4^{5.5}=5.5` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**下からの評価。** $2022>2000=2\times10^{3}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\log_{10}2022>\log_{10}2+3>0.301+3=3.301`,
            },
            { k: "p", t: String.raw`である。また $\log_{10}2<0.3011$ より $2\log_{10}2<0.6022$ だから` },
            {
              k: "math",
              t: String.raw`\log_{4}2022=\frac{\log_{10}2022}{2\log_{10}2}>\frac{3.301}{0.6022}`,
            },
            { k: "p", t: String.raw`である。ここで` },
            { k: "math", t: String.raw`5.4\times0.6022=3.25188<3.301` },
            { k: "p", t: String.raw`なので $\dfrac{3.301}{0.6022}>5.4$、したがって` },
            { k: "math", t: String.raw`5.4<\log_{4}2022<5.5` },
            { k: "p", t: String.raw`が示された。` },
            {
              k: "note",
              t: String.raw`実際の値は $\log_{4}2022=5.4908$ である。上限 $5.5$ はかなりぎりぎりで、$2022$ と $2048$ の近さがそのまま効いている。`,
            },
          ],
          pitfalls: [
            String.raw`分数の下からの評価では、分子を小さく・分母を大きく見積もる。$\log_{10}2022$ には $0.301$（下から）、$\log_{10}2$ には $0.3011$（上から）と、同じ $\log_{10}2$ でも使う向きが違う。`,
            String.raw`$\frac{3.301}{0.6022}>5.4$ は割り算せず、$5.4\times0.6022$ を計算して比べる。筆算が軽く、誤差の心配もない。`,
            String.raw`上限は常用対数を使わなくても出る。$4^{5.5}=2^{11}$ に気づけるかどうかだけである。`,
          ],
          check: String.raw`$\log_{4}2022=5.490784$ で、確かに $5.4$ と $5.5$ のあいだにある。下からの評価の値は $\frac{3.301}{0.6022}=5.481568$ で、$5.4$ より大きい。`,
        },
      ],
    },
    {
      no: 2,
      field: "場合の数",
      topics: ["漸化式", "グラフ上の経路", "対称性", "上下2状態"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "三角柱の辺のつながりを隣接表にして $n=1$ から $9$ まで経路数を数え上げると $2,5,14,41,122,365,1094,3281,9842$ となり、$\\frac{3^{n}+1}{2}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{A}$ を始点として辺に沿って $n$ 回移動したとき、終点が $\mathrm{A},\mathrm{B},\mathrm{C}$ のいずれかとなる経路の総数 $a_n$ を求める`,
          answer: String.raw`$a_n=\dfrac{3^{n}+1}{2}$`,
          approach: String.raw`どの頂点からも辺は3本出ていて、そのうち2本は同じ三角形（同じ面）の中、1本だけが反対側の面へ向かう。だから「いま上の面にいるか下の面にいるか」だけを追えばよく、6頂点を2状態にまとめられる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A},\mathrm{B},\mathrm{C}$ を「上の面」、$\mathrm{D},\mathrm{E},\mathrm{F}$ を「下の面」と呼ぶ。どの頂点からも辺は3本出ていて、その内訳は`,
            },
            {
              k: "steps",
              items: [
                String.raw`同じ面の他の2頂点へ：$2$ 本`,
                String.raw`向かい合う面の頂点へ：$1$ 本`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。そこで、$n$ 回移動したあと上の面にいる経路の数を $t_n$、下の面にいる数を $u_n$ とする。$\mathrm{P}_0=\mathrm{A}$ なので $t_0=1$、$u_0=0$ である。`,
            },
            { k: "p", t: String.raw`**漸化式。** 上の内訳から` },
            {
              k: "math",
              t: String.raw`t_n=2t_{n-1}+u_{n-1},\qquad u_n=t_{n-1}+2u_{n-1}`,
            },
            { k: "p", t: String.raw`である。和と差をとると` },
            {
              k: "math",
              t: String.raw`t_n+u_n=3\left(t_{n-1}+u_{n-1}\right),\qquad t_n-u_n=t_{n-1}-u_{n-1}`,
            },
            {
              k: "p",
              t: String.raw`となる。したがって $t_n+u_n=3^{n}$（全経路数で、当然である）、$t_n-u_n=t_0-u_0=1$ である。2式を足して $2$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`a_n=t_n=\frac{3^{n}+1}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`最初の数項は $2,\,5,\,14,\,41,\,122,\dots$ である。$3^{n}$ が奇数なので $3^{n}+1$ は偶数で、$a_n$ は必ず整数になる。`,
            },
          ],
          pitfalls: [
            String.raw`「上の面にいる」だけを状態にできるのは、上の面のどの頂点から見ても内訳が $2:1$ で同じだからである。頂点ごとに数えようとすると6本の漸化式になる。`,
            String.raw`$t_n-u_n$ が変わらないことに気づくと、$t_n$ の2項間漸化式を解かずに済む。$t_n=2t_{n-1}+\left(3^{n-1}-t_{n-1}\right)=t_{n-1}+3^{n-1}$ として階差で解いてもよい。`,
            String.raw`$\mathrm{P}_0=\mathrm{A}$ なので $n=0$ では終点が $\mathrm{A}$ である。$t_0=1$ から始める。`,
          ],
          check: String.raw`三角柱の辺のつながりを隣接表にして経路数を数え上げると、$n=1,\dots,9$ で $2,5,14,41,122,365,1094,3281,9842$ となり、$\frac{3^{n}+1}{2}$ の値と完全に一致する。たとえば $n=2$ では、$\mathrm{A}$ から2回で上の面に戻る経路が $5$ 通りある。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分法",
      topics: ["放物線の接線", "直交条件", "解と係数の関係", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "接点 $t=-1,4$ での接線 $y=-\\frac x2-\\frac14$、$y=2x-4$ が直交し（傾きの積 $-1$）、どちらも $x=\\frac32$ で $y=-1$ をとることを確かめた",
          "$-1\\le x\\le4$ で放物線と2本の接線にはさまれた部分の面積を $200$ 万点の数値積分で求めると $2.604166667$ となり、$\\frac{125}{48}=2.604166667$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$C:y=\dfrac{x^{2}}{4}$ に接する直交2直線 $L_1,L_2$ の交点の $x$ 座標が $\dfrac32$ のとき、$L_1,L_2,C$ で囲まれる図形の面積を求める`,
          answer: String.raw`$\dfrac{125}{48}$`,
          approach: String.raw`接点の $x$ 座標を $t$ とおくと、接線は $y=\frac t2x-\frac{t^{2}}{4}$ である。2本の交点の $x$ 座標が $\frac{t_1+t_2}{2}$、直交条件が $t_1t_2=-4$ と、どちらも $t_1,t_2$ の基本対称式で書けるので、2次方程式1本で接点が決まる。面積は、接しているおかげで被積分関数が完全平方になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y'=\dfrac x2$ なので、$C$ の点 $\left(t,\dfrac{t^{2}}{4}\right)$ での接線は`,
            },
            {
              k: "math",
              t: String.raw`y=\frac t2(x-t)+\frac{t^{2}}{4}=\frac t2x-\frac{t^{2}}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。$L_1,L_2$ の接点を $t_1,t_2$（$t_1\ne t_2$）とする。`,
            },
            { k: "p", t: String.raw`**2つの条件。** 傾きは $\dfrac{t_1}{2},\dfrac{t_2}{2}$ で、直交するから` },
            {
              k: "math",
              t: String.raw`\frac{t_1}{2}\cdot\frac{t_2}{2}=-1\quad\Longleftrightarrow\quad t_1t_2=-4`,
            },
            { k: "p", t: String.raw`である。交点の $x$ 座標は、2本の式を等しいとおいて` },
            {
              k: "math",
              t: String.raw`\frac{t_1}{2}x-\frac{t_1^{2}}{4}=\frac{t_2}{2}x-\frac{t_2^{2}}{4}\;\Longrightarrow\;x=\frac{t_1+t_2}{2}`,
            },
            { k: "p", t: String.raw`なので、$\dfrac{t_1+t_2}{2}=\dfrac32$ より $t_1+t_2=3$ である。` },
            {
              k: "p",
              t: String.raw`**接点を求める。** $t_1,t_2$ は $t^{2}-3t-4=0$ の2解だから $(t-4)(t+1)=0$、すなわち`,
            },
            { k: "math", t: String.raw`t=-1,\;4` },
            { k: "p", t: String.raw`である。接線は` },
            {
              k: "math",
              t: String.raw`L_1:\;y=-\frac x2-\frac14\qquad L_2:\;y=2x-4`,
            },
            {
              k: "p",
              t: String.raw`で、交点は $\left(\dfrac32,\,-1\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`**面積。** $-1\le x\le\dfrac32$ では $L_1$ が、$\dfrac32\le x\le4$ では $L_2$ が下側の境界になる。接しているので差は完全平方になり`,
            },
            {
              k: "math",
              t: String.raw`\frac{x^{2}}{4}-\left(-\frac x2-\frac14\right)=\frac{(x+1)^{2}}{4},\qquad\frac{x^{2}}{4}-(2x-4)=\frac{(x-4)^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\int_{-1}^{\frac32}\frac{(x+1)^{2}}{4}dx+\int_{\frac32}^{4}\frac{(x-4)^{2}}{4}dx\\[1mm]
&=\left[\frac{(x+1)^{3}}{12}\right]_{-1}^{\frac32}+\left[\frac{(x-4)^{3}}{12}\right]_{\frac32}^{4}\\[1mm]
&=\frac{1}{12}\left(\frac52\right)^{3}+\frac{1}{12}\left(\frac52\right)^{3}=\frac{125}{96}+\frac{125}{96}=\frac{125}{48}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である（$2.604$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$C:y=\frac{x^{2}}{4}$ と直交する2接線。接点は $\left(-1,\frac14\right)$ と $(4,4)$、交点は $\left(\frac32,-1\right)$。囲まれた部分の面積は $\frac{125}{48}=2.604$。`,
                view: [-2.2, 5.2, -1.6, 4.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: PAR3, bottom: LOW3, from: -1, to: 4 },
                  { k: "curve", f: PAR3, from: -2.1, to: 4.4 },
                  { k: "seg", a: [-2.1, TL1(-2.1)], b: [2.2, TL1(2.2)], dash: true },
                  { k: "seg", a: [1.2, TL2(1.2)], b: [4.3, TL2(4.3)], dash: true },
                  { k: "dot", at: [-1, 0.25], label: "(-1, 1/4)", place: "below-left" },
                  { k: "dot", at: [4, 4], label: "(4, 4)", place: "above-left" },
                  { k: "dot", at: [1.5, -1], label: "(3/2, -1)", place: "below-left" },
                  { k: "text", at: [-2.1, TL1(-2.1)], label: "L1", place: "above-left" },
                  { k: "text", at: [4.3, TL2(4.3)], label: "L2", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`交点の $x$ 座標が $\frac{t_1+t_2}{2}$（2つの接点の中点の $x$ 座標）になるのは放物線の性質である。覚えておくと計算が1行で済む。`,
            String.raw`接線の式の切片は $-\frac{t^{2}}{4}$ で、符号を落としやすい。接点の $y$ 座標 $\frac{t^{2}}{4}$ と混同しない。`,
            String.raw`積分区間を交点 $x=\frac32$ で分ける。$L_1$ と $L_2$ のどちらが下かは、交点の左右で入れ替わる。`,
            String.raw`$\frac{x^{2}}{4}-(\text{接線})$ は必ず $\frac{(x-t)^{2}}{4}$ になる。これを使えば展開せずに積分できる。`,
          ],
          check: String.raw`$L_1,L_2$ の傾きは $-\frac12$ と $2$ で積は $-1$、どちらも $x=\frac32$ で $y=-1$ をとる。面積を $-1\le x\le4$ で $200$ 万点の数値積分で求めると $2.604166667$ となり、$\frac{125}{48}=2.604166667$ と一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形と方程式",
      topics: ["解と係数の関係", "軌跡", "線分の長さの比", "双曲線"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$ab=\\frac14$ をみたす $(a,b)$ を $20$ 万組とり、$\\mathrm{P},\\mathrm{Q},\\mathrm{R},\\mathrm{S}$ を座標から直接求めると、$\\frac{\\mathrm{PQ}}{\\mathrm{RS}}=\\sqrt2$ が誤差 $10^{-9}$ 未満で成り立ち、$\\mathrm{PQ}$ の中点がつねに $\\left(\\frac1{2a},\\frac1{2b}\\right)$ で $xy=1$ をみたすことを確かめた",
          "中点の $x$ 座標が $0.0625$ から $9.9756$ まで広く動くことを確かめた（第1象限の枝を埋める）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac{\mathrm{PQ}}{\mathrm{RS}}=\sqrt2$ を保ちながら $a,b>0$ が動くとき、線分 $\mathrm{PQ}$ の中点の軌跡を求める`,
          answer: String.raw`双曲線 $xy=1$ の $x>0$ の部分（第1象限の枝）全体`,
          approach: String.raw`$L$ と $y=-\frac1x$ を連立すると $x$ の2次方程式になるので、$\mathrm{P},\mathrm{Q}$ の座標を解かずに解と係数の関係だけで中点が書ける。$\mathrm{PQ}$ と $\mathrm{RS}$ はどちらも同じ直線 $L$ 上の線分なので、比をとると傾きの部分が約分され、$x$ 座標の差の比だけが残る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=-\dfrac1x$ を $ax+by=1$ に入れて $x$ 倍すると（$x\ne0$）`,
            },
            { k: "math", t: String.raw`ax^{2}-x-b=0` },
            {
              k: "p",
              t: String.raw`となる。2解を $\alpha,\beta$ とすると、解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta=\frac1a,\qquad\alpha\beta=-\frac ba<0`,
            },
            {
              k: "p",
              t: String.raw`である。積が負なので1つは負、1つは正で、判別式は $1+4ab>0$ だから確かに2交点をもつ。$y=-\dfrac1x$ より、$x<0$ の側が $y>0$（点 $\mathrm{P}$）、$x>0$ の側が $y<0$（点 $\mathrm{Q}$）である。`,
            },
            { k: "p", t: String.raw`**中点。** 中点を $\mathrm{M}(X,Y)$ とすると` },
            {
              k: "math",
              t: String.raw`X=\frac{\alpha+\beta}{2}=\frac{1}{2a}`,
            },
            { k: "p", t: String.raw`であり、$y=-\dfrac1x$ だから` },
            {
              k: "math",
              t: String.raw`Y=\frac12\left(-\frac1\alpha-\frac1\beta\right)=-\frac{\alpha+\beta}{2\alpha\beta}=-\frac{\frac1a}{2\left(-\frac ba\right)}=\frac{1}{2b}`,
            },
            { k: "p", t: String.raw`である。$a,b>0$ なので $X>0$、$Y>0$ である。` },
            {
              k: "p",
              t: String.raw`**$\dfrac{\mathrm{PQ}}{\mathrm{RS}}$ を計算する。** $\mathrm{R}\left(\dfrac1a,0\right)$、$\mathrm{S}\left(0,\dfrac1b\right)$ である。$\mathrm{P},\mathrm{Q},\mathrm{R},\mathrm{S}$ はすべて直線 $L$ の上にあるので、線分の長さは「$x$ 座標の差」に同じ比例定数 $\sqrt{1+(\text{傾き})^{2}}$ を掛けたものになる。したがって`,
            },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{PQ}}{\mathrm{RS}}=\frac{\left|\alpha-\beta\right|}{\left|\frac1a-0\right|}=a\left|\alpha-\beta\right|`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`(\alpha-\beta)^{2}=(\alpha+\beta)^{2}-4\alpha\beta=\frac{1}{a^{2}}+\frac{4b}{a}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{PQ}}{\mathrm{RS}}=\sqrt{a^{2}\left(\frac{1}{a^{2}}+\frac{4b}{a}\right)}=\sqrt{1+4ab}`,
            },
            { k: "p", t: String.raw`である。これが $\sqrt2$ になる条件は` },
            { k: "math", t: String.raw`1+4ab=2\quad\Longleftrightarrow\quad ab=\frac14` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**軌跡。** $X=\dfrac1{2a}$、$Y=\dfrac1{2b}$ より` },
            {
              k: "math",
              t: String.raw`XY=\frac{1}{4ab}=\frac{1}{4\cdot\frac14}=1`,
            },
            {
              k: "p",
              t: String.raw`である。逆に $X>0$、$Y>0$、$XY=1$ をみたす点に対して $a=\dfrac1{2X}>0$、$b=\dfrac1{2Y}>0$ とおけば $ab=\dfrac1{4XY}=\dfrac14$ となり条件をみたすので、この点は実際に中点として現れる。よって求める軌跡は`,
            },
            { k: "math", t: String.raw`\text{双曲線 }xy=1\text{ の }x>0\text{ の部分}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=b=\frac12$（$ab=\frac14$）のときの配置。$\mathrm{P},\mathrm{Q}$ は $L$ と $y=-\frac1x$ の交点、$\mathrm{R},\mathrm{S}$ は $L$ と座標軸の交点。中点 $\mathrm{M}(1,1)$ は破線の双曲線 $xy=1$（$x>0$）の上にある。`,
                view: [-1.9, 3.6, -1.5, 3.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: HYP4, from: -1.8, to: -0.32 },
                  { k: "curve", f: HYP4, from: 0.67, to: 3.5 },
                  { k: "curve", f: LOC4, from: 0.32, to: 3.5, dash: true, faint: true },
                  { k: "seg", a: [-1, 3], b: [3.1, -1.1] },
                  { k: "dot", at: [1 - RT2, RT2 + 1], label: "P", place: "above-right" },
                  { k: "dot", at: [1 + RT2, 1 - RT2], label: "Q", place: "below-left" },
                  { k: "dot", at: [2, 0], label: "R", place: "above-right" },
                  { k: "dot", at: [0, 2], label: "S", place: "above-right" },
                  { k: "dot", at: [1, 1], label: "M(1, 1)", place: "above-right" },
                  { k: "text", at: [3.5, LOC4(3.5)], label: "xy = 1", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ は $y$ 座標が正のほうなので、$x$ 座標は**負**のほうである。$y=-\frac1x$ の符号の入れ替わりを押さえる。`,
            String.raw`$\mathrm{PQ}$ と $\mathrm{RS}$ が同じ直線上にあることを使うと、$\sqrt{1+(\text{傾き})^{2}}$ が約分されて $x$ 座標の差の比だけになる。長さを両方とも根号のまま計算すると煩雑になる。`,
            String.raw`$Y=\frac{1}{2b}$ を出すとき、$-\frac1\alpha-\frac1\beta=-\frac{\alpha+\beta}{\alpha\beta}$ と通分する。$\alpha,\beta$ を具体的に解く必要はない。`,
            String.raw`「軌跡を求めよ」なので、逆向き（その点が実際に現れること）も確かめる。$x>0$ の枝が**すべて**現れることまで言う。`,
          ],
          check: String.raw`$a=b=\frac12$ なら $L:x+y=2$ で、交点は $\mathrm{P}\left(1-\sqrt2,\,1+\sqrt2\right)$、$\mathrm{Q}\left(1+\sqrt2,\,1-\sqrt2\right)$、$\mathrm{R}(2,0)$、$\mathrm{S}(0,2)$ である。$\mathrm{PQ}=4$、$\mathrm{RS}=2\sqrt2$ で比は $\sqrt2$、中点は $(1,1)$ で $xy=1$ をみたす。$ab=\frac14$ をみたす $20$ 万組で調べても、比はつねに $\sqrt2$、中点はつねに $xy=1$ の上にあった。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["内積の計算", "重心", "垂直条件", "2次関数の最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "内積の表（$\\vec a\\cdot\\vec a=16$、$\\vec a\\cdot\\vec b=\\vec a\\cdot\\vec c=8$、$\\vec b\\cdot\\vec b=9$、$\\vec b\\cdot\\vec c=6$、$\\vec c\\cdot\\vec c=12$）から座標を作ると、$\\mathrm{OA}=4$、$\\mathrm{OB}=\\mathrm{AB}=\\mathrm{BC}=3$、$\\mathrm{OC}=\\mathrm{AC}=2\\sqrt3$ がすべて再現され、四面体の体積は $4$（つぶれていない）であることを確かめた",
          "$\\mathrm{P}$ を辺 $\\mathrm{BC}$ 上で $40$ 万等分して動かすと、$\\overrightarrow{\\mathrm{PG}}\\cdot\\overrightarrow{\\mathrm{OA}}$ はつねに $0$（誤差 $10^{-9}$ 未満）で、$\\mathrm{PG}$ の最小は $1.333333333$（$s=\\frac13$）となり $\\frac43$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\overrightarrow{\mathrm{PG}}\perp\overrightarrow{\mathrm{OA}}$ を示す`,
          answer: String.raw`$\vec a\cdot\vec b=\vec a\cdot\vec c=8$ なので $\overrightarrow{\mathrm{OP}}\cdot\vec a=8$ が $\mathrm{P}$ の位置によらず一定で、$\overrightarrow{\mathrm{PG}}\cdot\vec a=\dfrac{16-2\cdot8}{3}=0$`,
          approach: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$ などとおいて、6本の辺の長さから内積をすべて出してしまう。重心なので $\overrightarrow{\mathrm{OG}}=\frac{\vec a+\overrightarrow{\mathrm{OP}}}{3}$ と書け、$\overrightarrow{\mathrm{PG}}$ は $\vec a$ と $\overrightarrow{\mathrm{OP}}$ だけの式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ とおく。辺の長さから内積を出す。`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec a\right|^{2}=16,\qquad\left|\vec b\right|^{2}=9,\qquad\left|\vec c\right|^{2}=12`,
            },
            { k: "p", t: String.raw`であり、$\mathrm{AB}=3$ から` },
            {
              k: "math",
              t: String.raw`\left|\vec b-\vec a\right|^{2}=9\;\Longrightarrow\;9-2\vec a\cdot\vec b+16=9\;\Longrightarrow\;\vec a\cdot\vec b=8`,
            },
            { k: "p", t: String.raw`である。$\mathrm{AC}=2\sqrt3$ から` },
            {
              k: "math",
              t: String.raw`12-2\vec a\cdot\vec c+16=12\;\Longrightarrow\;\vec a\cdot\vec c=8`,
            },
            { k: "p", t: String.raw`であり、$\mathrm{BC}=3$ から` },
            {
              k: "math",
              t: String.raw`12-2\vec b\cdot\vec c+9=9\;\Longrightarrow\;\vec b\cdot\vec c=6`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\overrightarrow{\mathrm{PG}}$ を書く。** $\mathrm{P}$ は辺 $\mathrm{BC}$ 上なので、$0\le s\le1$ として`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=(1-s)\vec b+s\vec c`,
            },
            { k: "p", t: String.raw`とおける。$\mathrm{G}$ は $\triangle\mathrm{OAP}$ の重心だから` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OG}}=\frac{\vec 0+\vec a+\overrightarrow{\mathrm{OP}}}{3},\qquad\overrightarrow{\mathrm{PG}}=\overrightarrow{\mathrm{OG}}-\overrightarrow{\mathrm{OP}}=\frac{\vec a-2\overrightarrow{\mathrm{OP}}}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**内積を計算する。** $\vec a\cdot\vec b=\vec a\cdot\vec c=8$ なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}\cdot\vec a=(1-s)\cdot8+s\cdot8=8`,
            },
            { k: "p", t: String.raw`となり、$s$ によらず一定である。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PG}}\cdot\overrightarrow{\mathrm{OA}}=\frac{\left|\vec a\right|^{2}-2\,\overrightarrow{\mathrm{OP}}\cdot\vec a}{3}=\frac{16-16}{3}=0`,
            },
            {
              k: "p",
              t: String.raw`である。$\overrightarrow{\mathrm{PG}}\ne\vec0$、$\overrightarrow{\mathrm{OA}}\ne\vec0$ なので $\overrightarrow{\mathrm{PG}}\perp\overrightarrow{\mathrm{OA}}$ である。`,
            },
            {
              k: "note",
              t: String.raw`$\vec a\cdot\vec b=\vec a\cdot\vec c=8$ は、$\mathrm{B}$ と $\mathrm{C}$ から直線 $\mathrm{OA}$ に下ろした垂線の足が同じ点（$\mathrm{OA}$ を $8:8$ に、つまり $\mathrm{OA}$ の長さ $4$ の上で $\mathrm{O}$ から $2$ の点）だということである。だから辺 $\mathrm{BC}$ 全体が $\mathrm{OA}$ に垂直な平面に乗っている。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{OG}}$ は $\triangle\mathrm{OAP}$ の重心なので、$\mathrm{O}$ も頂点に数えて $3$ で割る。$\frac{\vec a+\overrightarrow{\mathrm{OP}}}{2}$ としない。`,
            String.raw`$\vec a\cdot\vec b$ と $\vec a\cdot\vec c$ が**等しい**ことが効いている。等しくなければ $s$ が残って垂直にならない。`,
          ],
          check: String.raw`内積の表から座標を作ると、$\mathrm{OA}=4$、$\mathrm{OB}=\mathrm{AB}=\mathrm{BC}=3$、$\mathrm{OC}=\mathrm{AC}=2\sqrt3=3.4641$ がすべて再現され、四面体の体積は $4$ である。$\mathrm{P}$ を辺 $\mathrm{BC}$ 上で $40$ 万等分して動かしても、$\overrightarrow{\mathrm{PG}}\cdot\overrightarrow{\mathrm{OA}}$ は誤差 $10^{-9}$ 未満でつねに $0$ であった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}$ が辺 $\mathrm{BC}$ 上を動くときの $\mathrm{PG}$ の最小値を求める`,
          answer: String.raw`$\dfrac43$`,
          approach: String.raw`(1) の式 $\overrightarrow{\mathrm{PG}}=\frac{\vec a-2\overrightarrow{\mathrm{OP}}}{3}$ の長さを2乗すると、$\overrightarrow{\mathrm{OP}}\cdot\vec a=8$ が一定なので $\left|\overrightarrow{\mathrm{OP}}\right|^{2}$ だけの式になる。あとは $\mathrm{OP}$ を最小にする $s$ を探すだけである。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $\overrightarrow{\mathrm{PG}}=\dfrac{\vec a-2\overrightarrow{\mathrm{OP}}}{3}$ なので` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{PG}}\right|^{2}=\frac{\left|\vec a\right|^{2}-4\,\overrightarrow{\mathrm{OP}}\cdot\vec a+4\left|\overrightarrow{\mathrm{OP}}\right|^{2}}{9}=\frac{16-32+4\left|\overrightarrow{\mathrm{OP}}\right|^{2}}{9}=\frac{4\left|\overrightarrow{\mathrm{OP}}\right|^{2}-16}{9}`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $\mathrm{PG}$ が最小になるのは $\mathrm{OP}$ が最小のときである。`,
            },
            { k: "p", t: String.raw`**$\left|\overrightarrow{\mathrm{OP}}\right|^{2}$ を計算する。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left|\overrightarrow{\mathrm{OP}}\right|^{2}&=\left|(1-s)\vec b+s\vec c\right|^{2}\\[1mm]
&=(1-s)^{2}\cdot9+2s(1-s)\cdot6+s^{2}\cdot12\\[1mm]
&=9-18s+9s^{2}+12s-12s^{2}+12s^{2}\\[1mm]
&=9s^{2}-6s+9=9\left(s-\frac13\right)^{2}+8
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$s=\dfrac13$ は $0\le s\le1$ の中にあるので、最小値は $\left|\overrightarrow{\mathrm{OP}}\right|^{2}=8$ である。このとき`,
            },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{PG}}\right|^{2}=\frac{4\cdot8-16}{9}=\frac{16}{9}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{PG}_{\min}=\frac43` },
            {
              k: "p",
              t: String.raw`である（$\mathrm{P}$ が $\mathrm{BC}$ を $1:2$ に内分する点のとき）。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\overrightarrow{\mathrm{PG}}\right|$ を最小にすることと $\mathrm{OP}$ を最小にすることが同値なのは、$\overrightarrow{\mathrm{OP}}\cdot\vec a$ が一定だからである。(1) の結果がそのまま効いている。`,
            String.raw`$s=\frac13$ が区間 $[0,1]$ の内部にあることを確かめる。外に出ていれば端の値を比べることになる。`,
            String.raw`$2s(1-s)\vec b\cdot\vec c$ の係数 $2$ を落とさない。展開は $\left|\vec u+\vec v\right|^{2}=\left|\vec u\right|^{2}+2\vec u\cdot\vec v+\left|\vec v\right|^{2}$ である。`,
          ],
          check: String.raw`座標で $\mathrm{P}$ を辺 $\mathrm{BC}$ 上に $40$ 万等分して動かすと、$\mathrm{PG}$ の最小は $1.333333333$（$s=0.333332$）で、$\frac43=1.333333333$、$s=\frac13$ と一致する。このとき $\mathrm{OP}=\sqrt8=2\sqrt2$ である。`,
        },
      ],
    },
  ],
};
