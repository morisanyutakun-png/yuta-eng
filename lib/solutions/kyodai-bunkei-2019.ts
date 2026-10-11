import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2019年度（平成31年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 問題冊子には常用対数表が付いているが、こちらでは再現せず、表を使わない道筋で解いている。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第2問の図。b=1 のときの m(a)。 */
const B2 = 1;
const M2 = (a: number) =>
  a <= -B2 ? -((a + B2) ** 2) : a >= B2 ? -((a - B2) ** 2) : 0;

/** 第5問の図。底面までの距離 d に対する体積。 */
const V5 = (d: number) => (2 / 3) * (1 - d * d) * (1 + d);

export const kyodaiBunkei2019: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "整式／指数・対数",
      topics: ["多項式の割り算", "係数比較", "桁数", "累乗の評価"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=3$ として $\\left(x^{3}+x^{2}+x+1\\right)\\left(x^{2}+x+1\\right)+(x+1)$ を展開すると、係数が $x^{5}+2x^{4}+3x^{3}+3x^{2}+3x+2$ と完全に一致することを確かめた",
          "$8.94^{18}$ を50桁の多倍長小数で計算すると $133068523579410927.2257\\cdots$ で、整数部分は $18$ 桁、最高位からの2桁は $13$ であることを確かめた",
          "$80^{9}=1.34217728\\times10^{17}$ と、下からの評価 $0.98875\\times1.34217728\\times10^{17}=1.3270\\times10^{17}$ がどちらも $1.3\\times10^{17}$ 台であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$x^{5}+2x^{4}+ax^{3}+3x^{2}+3x+2$ を $x^{3}+x^{2}+x+1$ で割った余り $R(x)$ の1次の係数が $1$ のとき、$a$ と $Q(x)$、$R(x)$ を求める`,
          answer: String.raw`$a=3$、$Q(x)=x^{2}+x+1$、$R(x)=x+1$`,
          approach: String.raw`$a$ を文字のまま置いて素直に筆算すればよい。$3$ 次式で割るので余りは2次以下で、その1次の係数が $a$ の1次式になる。そこに条件を入れるだけである。`,
          blocks: [
            { k: "p", t: String.raw`$a$ を文字のまま、$x^{3}+x^{2}+x+1$ で割る。` },
            {
              k: "steps",
              items: [
                String.raw`$x^{2}$ を立てて引くと、$x^{4}+(a-1)x^{3}+2x^{2}+3x+2$ が残る。`,
                String.raw`$x$ を立てて引くと、$(a-2)x^{3}+x^{2}+2x+2$ が残る。`,
                String.raw`$a-2$ を立てて引くと、$(3-a)x^{2}+(4-a)x+(4-a)$ が残る。`,
              ],
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`Q(x)=x^{2}+x+(a-2),\qquad R(x)=(3-a)x^{2}+(4-a)x+(4-a)`,
            },
            { k: "p", t: String.raw`である。$R(x)$ の1次の係数が $1$ という条件は` },
            { k: "math", t: String.raw`4-a=1\quad\Longleftrightarrow\quad a=3` },
            { k: "p", t: String.raw`である。このとき` },
            {
              k: "math",
              t: String.raw`Q(x)=x^{2}+x+1,\qquad R(x)=0\cdot x^{2}+x+1=x+1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=3$ のとき $R$ の2次の係数も $0$ になり、余りがちょうど1次式 $x+1$ になる。これは偶然ではなく、$3-a$ と $4-a$ がどちらも $a$ の同じ1次式だからである。`,
            },
          ],
          pitfalls: [
            String.raw`$3$ 次式で割った余りは2次以下である。$R(x)$ を1次式と決めつけてから係数を比べない（結果的に1次になるだけ）。`,
            String.raw`筆算では $x^{5}+2x^{4}+ax^{3}+3x^{2}+3x+2$ のように係数をすべて書き出しておく。$a$ を含む項をまたいで引き算するので、$0$ の項があると間違えやすい。`,
          ],
          check: String.raw`$\left(x^{3}+x^{2}+x+1\right)\left(x^{2}+x+1\right)+(x+1)$ を展開すると $x^{5}+2x^{4}+3x^{3}+3x^{2}+3x+2$ で、$a=3$ のもとの式と一致する。`,
        },
        {
          label: "問2",
          task: String.raw`$8.94^{18}$ の整数部分の桁数と、最高位からの2桁を求める`,
          answer: String.raw`$18$ 桁で、最高位からの2桁は $13$`,
          approach: String.raw`$8.94^{2}=79.9236$ が $80$ にとても近いことを使う。$8.94^{18}=\left(8.94^{2}\right)^{9}$ なので $80^{9}=8^{9}\times10^{9}$ と比べればよく、ずれは $\left(1-\varepsilon\right)^{9}\ge1-9\varepsilon$ で押さえられる。`,
          blocks: [
            { k: "p", t: String.raw`$8.94^{2}=79.9236$ なので` },
            {
              k: "math",
              t: String.raw`8.94^{18}=\left(8.94^{2}\right)^{9}=79.9236^{9}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**上から。** $79.9236<80$ より` },
            {
              k: "math",
              t: String.raw`8.94^{18}<80^{9}=8^{9}\times10^{9}=134217728\times10^{9}=1.34217728\times10^{17}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**下から。** $79.9236>79.9=80\left(1-0.00125\right)$ で、$0\le\varepsilon\le1$ のとき $\left(1-\varepsilon\right)^{9}\ge1-9\varepsilon$（展開すれば分かる）だから`,
            },
            {
              k: "math",
              t: String.raw`79.9236^{9}>80^{9}\left(1-0.00125\right)^{9}\ge80^{9}\left(1-0.01125\right)=0.98875\times1.34217728\times10^{17}`,
            },
            { k: "p", t: String.raw`であり、右辺は $1.3270\cdots\times10^{17}$ である。よって` },
            {
              k: "math",
              t: String.raw`1.327\times10^{17}<8.94^{18}<1.343\times10^{17}`,
            },
            {
              k: "p",
              t: String.raw`である。$10^{17}\le8.94^{18}<10^{18}$ なので整数部分は $18$ 桁、また $1.30\times10^{17}\le8.94^{18}<1.40\times10^{17}$ なので最高位からの2桁は`,
            },
            { k: "math", t: String.raw`13` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`常用対数表を使うなら、$\log_{10}8.94=0.9513$ から $18\times0.9513=17.1234$、$10^{0.1234}=1.328\cdots$ として同じ結論が出る。上の道筋は表を使わずに済ませたものである。`,
            },
          ],
          pitfalls: [
            String.raw`「整数部分の桁数」は $10^{17}\le N<10^{18}$ で $18$ 桁である。指数 $17$ と桁数 $18$ を取り違えない。`,
            String.raw`最高位からの2桁を決めるには、$1.30\times10^{17}$ と $1.40\times10^{17}$ のあいだに入ることまで示す必要がある。上下の評価を両方書く。`,
            String.raw`$\left(1-\varepsilon\right)^{9}\ge1-9\varepsilon$ は、二項展開の2項目までで打ち切った不等式である。$\varepsilon$ が小さいときに効く。`,
          ],
          check: String.raw`$8.94^{18}$ を多倍長で計算すると $133068523579410927.2257\cdots$ で、整数部分は $18$ 桁、最高位からの2桁は $13$ である。$\log_{10}8.94\times18=17.12408$ とも合っている。`,
        },
      ],
    },
    {
      no: 2,
      field: "2次関数",
      topics: ["絶対値のはずし方", "平方完成", "場合分け", "グラフをかく"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$b=1,2.5$ のそれぞれについて $a$ を $-5$ から $5$ まで動かし、$-20\\le x\\le20$ を $40$ 万等分して $f$ の最小値を直接求めると、場合分けした式の値と小数6桁まで一致した",
          "境目 $a=\\pm b$ の前後（$a=\\pm(b+0.3)$ で $-0.09$、$a=\\pm b$ で $0$）でも一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$f(x)=x^{2}+2\left(ax+b|x|\right)$（$b>0$）の最小値 $m$ を求め、$a$ を横軸、$m$ を縦軸にとってグラフをかく`,
          answer: String.raw`$m=\begin{cases}-(a+b)^{2}&(a\le-b)\\0&(-b\le a\le b)\\-(a-b)^{2}&(a\ge b)\end{cases}$`,
          approach: String.raw`$|x|$ があるので $x\ge0$ と $x\le0$ に分け、それぞれ平方完成する。どちらも頂点が原点より外（$x$ の符号が合わない側）に出ることがあるので、頂点が定義域に入るかどうかで場合分けになる。$b>0$ が符号の判定を決めている。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x^{2}+2ax+2b|x|$ である。符号で分けると` },
            {
              k: "math",
              t: String.raw`f(x)=\begin{cases}x^{2}+2(a+b)x=\left(x+a+b\right)^{2}-(a+b)^{2}&(x\ge0)\\[1mm]x^{2}+2(a-b)x=\left(x+a-b\right)^{2}-(a-b)^{2}&(x\le0)\end{cases}`,
            },
            { k: "p", t: String.raw`である（$x=0$ ではどちらも $0$ で一致する）。` },
            {
              k: "p",
              t: String.raw`**右半分（$x\ge0$）の最小。** 頂点は $x=-(a+b)$ である。$-(a+b)\ge0$、つまり $a\le-b$ のとき頂点が定義域に入り最小値は $-(a+b)^{2}$、$a>-b$ のときは $x=0$ で最小値 $0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**左半分（$x\le0$）の最小。** 頂点は $x=-(a-b)=b-a$ である。$b-a\le0$、つまり $a\ge b$ のとき頂点が入り最小値は $-(a-b)^{2}$、$a<b$ のときは $x=0$ で最小値 $0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**合わせる。** $b>0$ なので $-b<b$ であり、$a\le-b$ と $a\ge b$ が同時に起こることはない。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a\le-b$：右半分が $-(a+b)^{2}$、左半分は（$a<b$ なので）$0$。よって $m=-(a+b)^{2}$。`,
                String.raw`$-b\le a\le b$：どちらも $0$。よって $m=0$。`,
                String.raw`$a\ge b$：右半分は（$a>-b$ なので）$0$、左半分が $-(a-b)^{2}$。よって $m=-(a-b)^{2}$。`,
              ],
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`m=\begin{cases}-(a+b)^{2}&\left(a\le-b\right)\\[1mm]0&\left(-b\le a\le b\right)\\[1mm]-(a-b)^{2}&\left(a\ge b\right)\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。グラフは、$-b\le a\le b$ では $a$ 軸に重なる線分、その外側では上に凸の放物線を $a=\mp b$ を頂点として下向きに描いたものになる。$a=\pm b$ で値も傾きも $0$ でつながるので、なめらかにつながる。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$b=1$ のときの $m$ のグラフ。横軸が $a$、縦軸が $m$。$-b\le a\le b$ では $m=0$（$a$ 軸上の線分）、その外では $m=-(a\pm b)^{2}$ の放物線。$a=\pm b$ でなめらかにつながる。`,
                view: [-3.6, 3.6, -4.4, 1.0],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: M2, from: -3.4, to: 3.4 },
                  { k: "dot", at: [-B2, 0], label: "a = -b", place: "above-left" },
                  { k: "dot", at: [B2, 0], label: "a = b", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x\ge0$ の枝の頂点は $x=-(a+b)$ である。これが**定義域に入るか**で最小の場所が変わる。頂点の値をいつでも最小値にしない。`,
            String.raw`$b>0$ が効いていて、$-b<b$ だから真ん中に $m=0$ の区間ができる。$b=0$ ならこの区間がつぶれて $m=-a^{2}$ になる。`,
            String.raw`$a=\pm b$ では両側の式が $0$ で一致する。等号をどちらに付けても同じである。`,
          ],
          check: String.raw`$b=1$、$a=-1.3$ では $-(a+b)^{2}=-0.09$ で、$-20\le x\le20$ を $40$ 万等分した全探索でも $-0.090000$ であった。$b=2.5$、$a=5$ では $-(a-b)^{2}=-6.25$ で、全探索も $-6.250000$ である。$|a|\le b$ では全探索でも $0$ になる。`,
        },
      ],
    },
    {
      no: 3,
      field: "命題と論証",
      topics: ["全称と存在", "2次不等式", "必要十分条件", "領域図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(a,c)$ を $15$ 通り（符号・$0$・極端に小さい値を含む）とり、$b$ を $-20$ から $20$ まで $0.05$ 刻みで動かして「$ax^{2}+bx+c<0$ をみたす $x$ があるか」を頂点と巨大な $|x|$ で判定すると、「$a<0$ または $c<0$」と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`「すべての実数 $b$ に対して、ある実数 $x$ が $ax^{2}+bx+c<0$ をみたす」ための $a,c$ の必要十分条件を求め、$(a,c)$ の範囲を図示する`,
          answer: String.raw`$a<0$ または $c<0$。$(a,c)$ の範囲は、座標平面から「$a\ge0$ かつ $c\ge0$」の部分（第1象限と正の軸・原点）を除いた残り`,
          approach: String.raw`$a$ の符号で3つに分けるのが素直だが、先に「$c<0$ なら $x=0$ で終わり」「$a<0$ ならグラフが下に開くので終わり」と**十分性**を押さえてしまうと早い。残るのは $a\ge0$ かつ $c\ge0$ の場合で、そこでは $b=0$ を取れば不成立が示せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**十分性。** 次の2つの場合は、どんな $b$ に対しても $x$ がとれる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$c<0$ のとき：$x=0$ とすれば $ax^{2}+bx+c=c<0$。$b$ に関係なく成り立つ。`,
                String.raw`$a<0$ のとき：$ax^{2}+bx+c$ は $x\to\infty$ で $-\infty$ に発散するので、十分大きい $x$ をとれば負になる。これも $b,c$ に関係ない。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**必要性。** 逆に $a\ge0$ かつ $c\ge0$ とする。$b=0$ ととると`,
            },
            { k: "math", t: String.raw`ax^{2}+c\ge0\qquad(\text{すべての }x)` },
            {
              k: "p",
              t: String.raw`なので、$ax^{2}+bx+c<0$ をみたす $x$ は存在しない。つまり命題は成り立たない。`,
            },
            {
              k: "p",
              t: String.raw`以上より、命題が成立するための必要十分条件は`,
            },
            { k: "math", t: String.raw`a<0\quad\text{または}\quad c<0` },
            {
              k: "p",
              t: String.raw`である。$(a,c)$ の範囲は、座標平面全体から「$a\ge0$ かつ $c\ge0$」の部分（$a$ 軸の正の部分と $c$ 軸の正の部分、原点を含む第1象限）を取り除いた残りである。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`条件をみたす $(a,c)$ の範囲（塗った部分）。横軸が $a$、縦軸が $c$。第1象限（境界の正の半軸と原点を含む）だけが除かれ、残りはすべて条件をみたす。除かれる部分の境界（太い半直線）は範囲に入らない。`,
                view: [-3.4, 3.4, -2.6, 2.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[-3.3, -2.5], [0, -2.5], [0, 0], [3.3, 0], [3.3, -2.5], [-3.3, -2.5]] },
                  { k: "fill", pts: [[-3.3, -2.5], [-3.3, 2.5], [0, 2.5], [0, -2.5]] },
                  { k: "seg", a: [0, 0], b: [3.3, 0] },
                  { k: "seg", a: [0, 0], b: [0, 2.5] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "text", at: [1.7, 1.3], label: "除かれる部分", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「すべての $b$ に対して、ある $x$ が…」という入れ子の順番を読み違えない。$b$ を先に与えられてから $x$ を選ぶので、$x$ は $b$ に応じて変えてよい。`,
            String.raw`$a>0$ の場合に「判別式 $b^{2}-4ac>0$」と考えると、$b$ が自由に動くのでほとんどの $b$ で成り立つが、$b=0$ だけが問題になる。そこで $c\ge0$ だと破れる、という形で必要性が出る。`,
            String.raw`$a=0$（1次または定数）の場合を忘れない。$b\ne0$ なら $x$ はとれるが、$b=0$ では $c<0$ が必要になる。上の「$b=0$ をとる」議論はこの場合も同時に片づけている。`,
            String.raw`境界の扱いに注意する。$a=0,c=0$（原点）は条件をみたさない。除く側に入る。`,
          ],
          check: String.raw`$(a,c)$ を $15$ 通り（$(1,1),(1,-1),(-1,1),(0,0),(2,0),(0.5,0.0001),(-0.0001,5)$ など）とり、$b$ を $-20$ から $20$ まで $0.05$ 刻みで動かして「$ax^{2}+bx+c<0$ をみたす $x$ があるか」を頂点と $|x|=10^{12}$ まで含めて判定すると、結果は「$a<0$ または $c<0$」と1件も食い違わなかった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["反復試行", "上がり下がりの回数", "等比数列の和", "場合の数"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $12$ まで $2^{n}$ 通りの「$4$ 以下／$5$ 以上」の並びをすべて列挙して確率を分数のまま計算すると、$\\frac{(n-1)2^{n}+1}{3^{n}}$ と完全に一致した（$\\frac13,\\frac59,\\frac{17}{27},\\frac{49}{81},\\frac{43}{81},\\dots$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$X_{k-1}\le4$ かつ $X_k\ge5$ となる $k$（$1\le k\le n$）がただ1つである確率を求める`,
          answer: String.raw`$\dfrac{(n-1)2^{n}+1}{3^{n}}$`,
          approach: String.raw`出た目そのものではなく「$4$ 以下か $5$ 以上か」だけが効く。$4$ 以下を「低」、$5$ 以上を「高」と書くと、条件は「低から高へ切り替わる場所がちょうど1か所」である。$X_0=0$ は低なので、これは「高が続く固まりがちょうど1つ」と同じことになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`各回の目が $4$ 以下である確率は $\dfrac46=\dfrac23$、$5$ 以上である確率は $\dfrac26=\dfrac13$ である。$4$ 以下を「低」、$5$ 以上を「高」と呼ぶ。$X_0=0$ は低である。`,
            },
            {
              k: "p",
              t: String.raw`条件の $k$ は「低のすぐ後に高が来る場所」で、$X_0$ が低だから、その個数は $X_1,\dots,X_n$ の中の**高が連続する固まりの個数**に等しい。したがって条件は「高の固まりがちょうど1つ」である。`,
            },
            {
              k: "p",
              t: String.raw`**数え上げる。** 高の固まりが $1$ つだけで長さ $L$（$1\le L\le n$）のとき、その固まりの置き場所は $n-L+1$ 通りある。残り $n-L$ 回は低だから、確率は`,
            },
            {
              k: "math",
              t: String.raw`P=\sum_{L=1}^{n}(n-L+1)\left(\frac13\right)^{L}\left(\frac23\right)^{n-L}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**和を計算する。** $\left(\dfrac23\right)^{n}$ をくくり出すと、$\dfrac{1/3}{2/3}=\dfrac12$ なので`,
            },
            {
              k: "math",
              t: String.raw`P=\left(\frac23\right)^{n}\sum_{L=1}^{n}(n+1-L)\left(\frac12\right)^{L}`,
            },
            { k: "p", t: String.raw`である。よく知られた2つの和` },
            {
              k: "math",
              t: String.raw`\sum_{L=1}^{n}\left(\frac12\right)^{L}=1-\frac1{2^{n}},\qquad\sum_{L=1}^{n}L\left(\frac12\right)^{L}=2-\frac{n+2}{2^{n}}`,
            },
            { k: "p", t: String.raw`を使うと、中かっこの中は` },
            {
              k: "math",
              t: String.raw`(n+1)\left(1-\frac1{2^{n}}\right)-\left(2-\frac{n+2}{2^{n}}\right)=n-1+\frac1{2^{n}}`,
            },
            { k: "p", t: String.raw`となる。したがって` },
            {
              k: "math",
              t: String.raw`P=\left(\frac23\right)^{n}\left(n-1+\frac1{2^{n}}\right)=(n-1)\left(\frac23\right)^{n}+\left(\frac13\right)^{n}=\frac{(n-1)2^{n}+1}{3^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ では $\dfrac13$、$n=2$ では $\dfrac59$、$n=3$ では $\dfrac{17}{27}$ である。$n=4$ の $\dfrac{49}{81}=0.605$ あたりが最大で、その後は $0$ に近づく（高の固まりが2つ以上になりやすくなるため）。`,
            },
          ],
          pitfalls: [
            String.raw`$X_0=0$ は低に数える。これがあるおかげで「切り替わりの回数＝高の固まりの個数」になる。$X_0$ を忘れると、先頭が高の場合を取りこぼす。`,
            String.raw`$\sum L r^{L}$ の公式は、$\sum r^{L}$ を微分するか、$S-rS$ を作って導く。$r=\frac12$ での値 $2-\frac{n+2}{2^{n}}$ を覚えていなくても、その場で出せる。`,
            String.raw`「ちょうど1つ」なので、高が1回も出ない場合（固まり $0$ 個）は除く。$L\ge1$ から和を始めているのはそのためである。`,
          ],
          check: String.raw`$n=1$ から $12$ まで $2^{n}$ 通りの「低・高」の並びをすべて列挙し、切り替わりがちょうど1回のものの確率を分数のまま足すと、$\frac13,\frac59,\frac{17}{27},\frac{49}{81},\frac{43}{81},\frac{107}{243},\dots$ となり、$\frac{(n-1)2^{n}+1}{3^{n}}$ と完全に一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形",
      topics: ["球に内接する立体", "正方形の面積", "3次関数の最大", "高さの最大化"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$d$ を $0$ から $1$ まで $100$ 万等分して $V=\\frac23\\left(1-d^{2}\\right)(1+d)$ を計算すると、最大は $0.790123457$（$d=0.333333$）で、$\\frac{64}{81}=0.790123457$、$d=\\frac13$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`半径 $1$ の球面上の5点が正方形 $\mathrm{B_1B_2B_3B_4}$ を底面とする四角錐をなすとき、体積の最大値を求める`,
          answer: String.raw`$\dfrac{64}{81}$`,
          approach: String.raw`底面の正方形は、球を平面で切った円に内接する。その円の半径を決めれば底面積が決まり、頂点 $\mathrm{A}$ は反対側のいちばん遠い点にとるのが最大である。だから変数は「中心から底面までの距離 $d$」1つだけになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`球の中心を $\mathrm{O}$ とする。底面の正方形 $\mathrm{B_1B_2B_3B_4}$ は1つの平面上にあり、その4頂点は球面上にあるから、この平面と球面の交わり（半径 $r$ の円）に内接する。中心 $\mathrm{O}$ からこの平面までの距離を $d$ とすると`,
            },
            { k: "math", t: String.raw`r^{2}+d^{2}=1\qquad(0\le d<1)` },
            {
              k: "p",
              t: String.raw`である。半径 $r$ の円に内接する正方形は、対角線が直径だから1辺が $\sqrt2\,r$ で、面積は`,
            },
            { k: "math", t: String.raw`S=\left(\sqrt2\,r\right)^{2}=2r^{2}=2\left(1-d^{2}\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**高さ。** 頂点 $\mathrm{A}$ も球面上にあり、底面の平面までの距離が高さである。球面上の点で、この平面からいちばん遠いのは、平面に下ろした垂線と球面の交点のうち中心から見て反対側のもので、その距離は`,
            },
            { k: "math", t: String.raw`h=1+d` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**体積。** ` },
            {
              k: "math",
              t: String.raw`V=\frac13Sh=\frac23\left(1-d^{2}\right)(1+d)=\frac23(1-d)(1+d)^{2}`,
            },
            { k: "p", t: String.raw`である。$g(d)=(1-d)(1+d)^{2}$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(d)=-(1+d)^{2}+2(1-d)(1+d)=(1+d)\left(1-3d\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$0\le d<1$ では $d=\dfrac13$ で最大になる。値は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac13\right)=\frac23\cdot\left(\frac43\right)^{2}=\frac{32}{27}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`V_{\max}=\frac23\cdot\frac{32}{27}=\frac{64}{81}`,
            },
            {
              k: "p",
              t: String.raw`である（$0.790$ ほど）。このとき底面の円の半径は $r=\dfrac{2\sqrt2}{3}$、高さは $\dfrac43$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`中心から底面までの距離 $d$ に対する体積 $V=\frac23\left(1-d^{2}\right)(1+d)$。$d=\frac13$ で最大 $\frac{64}{81}=0.790$ をとる。$d=0$（底面が中心を通る）では $\frac23$、$d\to1$ では $0$ に近づく。`,
                view: [-0.12, 1.12, -0.08, 0.95],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: V5, from: 0, to: 1 },
                  { k: "dot", at: [1 / 3, 64 / 81], label: "最大 64/81", place: "above-right" },
                  { k: "dot", at: [0, 2 / 3], label: "2/3", place: "left" },
                  { k: "dot", at: [1, 0], label: "d = 1", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`頂点 $\mathrm{A}$ を「底面の真上」ととるのは、高さを最大にするためである。$\mathrm{A}$ がどこにあっても底面積は変わらないので、高さだけを最大にすればよい。`,
            String.raw`高さは $1+d$ であって $1-d$ ではない。$\mathrm{A}$ は底面から見て中心の向こう側にとる。`,
            String.raw`半径 $r$ の円に内接する正方形の面積は $2r^{2}$ である（対角線が $2r$ なので $\frac12\cdot2r\cdot2r=2r^{2}$）。$r^{2}$ や $4r^{2}$ としない。`,
            String.raw`$d=0$（底面が中心を通る大円）は最大ではない。そのとき $V=\frac23=0.667<\frac{64}{81}=0.790$ である。底面を少し小さくして高さを稼ぐほうが得になる。`,
          ],
          check: String.raw`$d$ を $0$ から $1$ まで $100$ 万等分して $V=\frac23\left(1-d^{2}\right)(1+d)$ を計算すると、最大は $0.790123457$（$d=0.333333$）で、$\frac{64}{81}=0.790123457$ と一致する。$d=\frac13$ では底面積 $\frac{16}{9}$、高さ $\frac43$ で $V=\frac13\cdot\frac{16}{9}\cdot\frac43=\frac{64}{81}$ である。`,
        },
      ],
    },
  ],
};
