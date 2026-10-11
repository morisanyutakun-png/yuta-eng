import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2020年度（令和2年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問の図。a = 0.7（範囲の中ほど）のときの C: y=(x+a)(x-2a)^2。 */
const A1 = 0.7;
const C1 = (x: number) => (x + A1) * (x - 2 * A1) ** 2;

/** 第3問の図。C は y=x^2-2x+4 の x≧0 の部分。半直線の傾きの最小は t=2 での 2。 */
const C3 = (x: number) => x * x - 2 * x + 4;
/** 正三角形の例。A は C 上の傾き最小の点 (2, 4)、B はそれを -60° 回したもの。 */
const AX3 = 2;
const AY3 = 4;
const BX3 = AX3 * Math.cos(-Math.PI / 3) - AY3 * Math.sin(-Math.PI / 3);
const BY3 = AX3 * Math.sin(-Math.PI / 3) + AY3 * Math.cos(-Math.PI / 3);

export const todaiBunkei2020: SolutionSet = {
  slug: "todai-bunkei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["3次関数", "重解と接する条件", "格子点", "領域"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$b=4a^{3}$ のもとで領域内の格子点を直接数えると、$a=0.629960$ の直前で $0$ 個、直後で $1$ 個、$a=0.793700$ ちょうどで $2$ 個になり、境目が $\\sqrt[3]{\\frac14}=0.629961$ と $\\sqrt[3]{\\frac12}=0.793701$ であることを確かめた",
          "$a=0.4,0.6$ では格子点 $0$ 個、$a=0.9$ では $3$ 個、$a=1.2$ では $12$ 個で、範囲の外では条件をみたさないことを確かめた",
          "$x^{3}-3ax^{2}+4a^{3}$ と $(x+a)(x-2a)^{2}$ が $a=0.7$ の複数の $x$ で一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$C:y=x^{3}-3ax^{2}+b$ が $x$ 軸に接し、$x$ 軸と $C$ で囲まれた領域（境界を除く）の格子点がちょうど $1$ 個になるように、$b$ を $a$ で表し $a$ の範囲を求める`,
          answer: String.raw`$b=4a^{3}$ で、$\sqrt[3]{\dfrac14}<a\le\sqrt[3]{\dfrac12}$（$\dfrac{\sqrt[3]{2}}{2}<a\le\dfrac{\sqrt[3]{4}}{2}$ とも書ける）`,
          approach: String.raw`3次関数が $x$ 軸に接するのは、接点が極値を与える点のときに限る。極大値は $b>0$ なので、接するのは極小のほうである。そこから $b=4a^{3}$ が出て、$C$ は $(x+a)(x-2a)^{2}$ と因数分解できる。あとは囲まれた領域の中にある格子点を、$x$ が整数の列ごとに数える。`,
          blocks: [
            { k: "p", t: String.raw`$y'=3x^{2}-6ax=3x(x-2a)$ で、$a>0$ だから $C$ は $x=0$ で極大、$x=2a$ で極小になる。値は` },
            {
              k: "math",
              t: String.raw`(\text{極大})=b,\qquad(\text{極小})=8a^{3}-12a^{3}+b=b-4a^{3}`,
            },
            {
              k: "p",
              t: String.raw`である。**条件1。** 3次関数が $x$ 軸に接するのは、$x$ 軸との共有点が重解になるとき、つまり極値が $0$ のときに限る。極大値は $b>0$ なので接するのは極小のほうで`,
            },
            { k: "math", t: String.raw`b-4a^{3}=0\quad\Longleftrightarrow\quad b=4a^{3}` },
            { k: "p", t: String.raw`である（これは $a>0$ のもとで $b>0$ をみたす）。このとき` },
            { k: "math", t: String.raw`y=x^{3}-3ax^{2}+4a^{3}=(x+a)(x-2a)^{2}` },
            {
              k: "p",
              t: String.raw`と因数分解できる。$C$ は $x=-a$ で $x$ 軸を横切り、$x=2a$ で接する。`,
            },
            {
              k: "p",
              t: String.raw`**囲まれた領域。** $-a<x<2a$ では $(x+a)>0$、$(x-2a)^{2}>0$ だから $y>0$ である。よって $x$ 軸と $C$ で囲まれた領域（境界を除く）は`,
            },
            {
              k: "math",
              t: String.raw`D=\left\{(x,y)\;\middle|\;-a<x<2a,\;0<y<(x+a)(x-2a)^{2}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**格子点を数える。** $f(x)=(x+a)(x-2a)^{2}$ とおく。整数 $x$ が $-a<x<2a$ にあるとき、$D$ に属する格子点の個数は $0<y<f(x)$ をみたす整数 $y$ の個数である。$f(x)>0$ なので、その個数は $f(x)\le1$ なら $0$ 個、$1<f(x)\le2$ なら $1$ 個、$f(x)>2$ なら $2$ 個以上である。`,
            },
            {
              k: "p",
              t: String.raw`$x=0$ はつねに $-a<x<2a$ に入り、$f(0)=4a^{3}=b$ である。格子点が全部で $1$ 個なら、まず $x=0$ の列だけで $2$ 個以上になってはいけないから`,
            },
            { k: "math", t: String.raw`4a^{3}\le2\quad\Longleftrightarrow\quad a\le\sqrt[3]{\frac12}=0.7937\cdots` },
            {
              k: "p",
              t: String.raw`が必要である。このとき $2a\le1.5875$、$-a\ge-0.7937$ なので、$-a<x<2a$ にある整数は $x=0$ と、$2a>1$ のときの $x=1$ だけである（$x=-1$ は $-a>-1$ より入らない）。`,
            },
            { k: "p", t: String.raw`$x=1$ の列を調べる。$f(1)=(1+a)(1-2a)^{2}$ で、$\dfrac12<a\le\sqrt[3]{\dfrac12}$ のとき` },
            {
              k: "math",
              t: String.raw`f(1)\le\left(1+\sqrt[3]{\tfrac12}\right)\left(2\sqrt[3]{\tfrac12}-1\right)^{2}=1.7937\times0.5874^{2}=0.619<1`,
            },
            {
              k: "p",
              t: String.raw`なので、$x=1$ の列に格子点はない（$(1+a)$ も $(2a-1)^{2}$ も $a$ について増加なので、右端での値を見れば足りる）。`,
            },
            { k: "p", t: String.raw`したがって格子点の個数は $x=0$ の列だけで決まり、ちょうど $1$ 個になる条件は` },
            { k: "math", t: String.raw`1<4a^{3}\le2` },
            { k: "p", t: String.raw`である。$a>0$ だからこれは` },
            {
              k: "math",
              t: String.raw`\sqrt[3]{\frac14}<a\le\sqrt[3]{\frac12},\qquad\text{すなわち}\qquad\frac{\sqrt[3]{2}}{2}<a\le\frac{\sqrt[3]{4}}{2}`,
            },
            {
              k: "p",
              t: String.raw`と同値である。このとき唯一の格子点は $(0,1)$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=0.7$（$b=4a^{3}=1.372$）のときの $C:y=(x+a)(x-2a)^{2}$。$x=-a=-0.7$ で $x$ 軸を横切り、$x=2a=1.4$ で接する。囲まれた部分にある格子点は $(0,1)$ ただ1つ。`,
                view: [-1.15, 1.85, -0.55, 1.75],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: C1, bottom: () => 0, from: -A1, to: 2 * A1 },
                  { k: "curve", f: C1, from: -1.05, to: 1.75 },
                  { k: "dot", at: [-A1, 0], label: "x = -a", place: "below-left" },
                  { k: "dot", at: [2 * A1, 0], label: "x = 2a", place: "below-right" },
                  { k: "dot", at: [0, 4 * A1 ** 3], label: "極大値 b", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「$x$ 軸に接する」を「$x$ 軸と共有点をもつ」と読み違えない。接するのは重解をもつときで、3次関数では極値が $0$ になるときに限る。極大値 $b$ は $b>0$ より $0$ にならないので、極小値の側だけを考えればよい。`,
            String.raw`格子点は $y$ の個数を数えるので、$f(x)$ が整数のときに注意がいる。$0<y<f(x)$ の整数 $y$ は $f(x)=2$ のとき $y=1$ の $1$ 個で、$2$ 個ではない。境界を含まないという条件が右端 $a=\sqrt[3]{\frac12}$ を範囲に入れている。`,
            String.raw`$x=1$ の列を忘れない。$a>\frac12$ では $x=1$ も区間に入るので、そこに格子点がないことを確かめてはじめて「$x=0$ の列だけ」と言える。`,
          ],
          check: String.raw`$\sqrt[3]{\frac14}=0.6299605$、$\sqrt[3]{\frac12}=0.7937005$。$b=4a^{3}$ として領域内の格子点を直接数えると、$a=0.629960$ では $0$ 個、$a=0.629962$ では $1$ 個、$a=0.793700$ では $1$ 個、$a=0.793701$ では $2$ 個になる。$a=0.9$ なら $3$ 個、$a=1.2$ なら $12$ 個で、範囲を外れると条件は崩れる。`,
        },
      ],
    },
    {
      no: 2,
      field: "場合の数",
      topics: ["格子点の選び方", "包除原理", "場合分け", "行と列"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$ {}_{16}\\mathrm{C}_{5}=4368$ 通りをすべて列挙し、点を含まない直線がちょうど2本になるものが $1824$ 通り、1本もないものが $432$ 通りであることを確かめた",
          "(1) の内訳が（使う行数, 使う列数）$=(4,2),(2,4),(3,3)$ でそれぞれ $192,192,1440$ 通りであることを確かめた",
          "(2) を包除原理 $\\sum(-1)^{i+j}{}_{4}\\mathrm{C}_{i}{}_{4}\\mathrm{C}_{j}{}_{(4-i)(4-j)}\\mathrm{C}_{5}$ で計算しても $432$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`選んだ点を1個も含まない直線がちょうど $2$ 本になる選び方の数を求める`,
          answer: String.raw`$1824$ 通り`,
          approach: String.raw`$8$ 本の直線は、縦 $4$ 本（$x=a$）と横 $4$ 本（$y=b$）に分かれる。選んだ $5$ 点が使う $x$ 座標の種類を $p$、$y$ 座標の種類を $q$ とすれば、点を含まない直線の数は $(4-p)+(4-q)=8-p-q$ である。つまり条件は $p+q=6$ だけで、あとは $(p,q)$ ごとに数えればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`選んだ $5$ 点の $x$ 座標の種類を $p$、$y$ 座標の種類を $q$ とする。直線 $x=a$ が点を含まないのは $a$ が使われていないときだから、点を含まない直線は`,
            },
            { k: "math", t: String.raw`(4-p)+(4-q)=8-p-q\ \text{本}` },
            {
              k: "p",
              t: String.raw`である。$5$ 点なので $1\le p\le4$、$1\le q\le4$、さらに $pq\ge5$ である。条件は $8-p-q=2$、つまり $p+q=6$ なので`,
            },
            { k: "math", t: String.raw`(p,q)=(4,2),\;(3,3),\;(2,4)` },
            { k: "p", t: String.raw`の3通りを数える。` },
            {
              k: "p",
              t: String.raw`**(i) $(p,q)=(4,2)$ のとき。** $x$ 座標は $4$ 種類すべて、$y$ 座標はちょうど $2$ 種類を使う。$x$ 座標が $4$ 種類で点が $5$ 個だから、ある $x$ 座標だけ $2$ 点、残りの $3$ つは $1$ 点ずつである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`使う $y$ 座標 $2$ つを選ぶ：$ {}_{4}\mathrm{C}_{2}=6$ 通り。`,
                String.raw`$2$ 点をもつ $x$ 座標を選ぶ：$4$ 通り。その $x$ では $2$ つの $y$ を両方使う（$1$ 通り）。`,
                String.raw`残り $3$ つの $x$ 座標は、それぞれ $2$ つの $y$ のどちらかを選ぶ：$2^{3}=8$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$2$ 点をもつ列が $y$ を両方使っているので、$y$ が $2$ 種類ちょうどになることは自動的にみたされる。よって $6\times4\times8=192$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) $(p,q)=(2,4)$ のとき。** $x$ と $y$ を入れ替えただけなので、同じく $192$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`**(iii) $(p,q)=(3,3)$ のとき。** 使う $x$ 座標 $3$ つを $ {}_{4}\mathrm{C}_{3}=4$ 通り、$y$ 座標 $3$ つを $4$ 通りで選ぶ。その $3\times3$ の $9$ 点から $5$ 点を、$3$ 行も $3$ 列もすべて使うように選ぶ。包除原理で`,
            },
            {
              k: "math",
              t: String.raw`{}_{9}\mathrm{C}_{5}-\left(3\cdot{}_{6}\mathrm{C}_{5}+3\cdot{}_{6}\mathrm{C}_{5}\right)=126-(18+18)=90`,
            },
            {
              k: "p",
              t: String.raw`通りである（$2$ 行以上空ける、あるいは $1$ 行と $1$ 列を空けると残りが $4$ 点以下になり、$5$ 点は選べないので、以降の項は $0$）。よって $4\times4\times90=1440$ 通りである。`,
            },
            { k: "p", t: String.raw`**合計。** 3つは互いに排反なので` },
            { k: "math", t: String.raw`192+192+1440=1824` },
            { k: "p", t: String.raw`通りである。` },
          ],
          pitfalls: [
            String.raw`「点を含まない直線がちょうど2本」は、縦2本・横0本、縦1本・横1本、縦0本・横2本の3つの形を含む。どれか1つだけを数えて終わらないこと。`,
            String.raw`$(4,2)$ のとき「$2$ 点をもつ $x$ が $y$ を両方使う」ことを見落とすと、$y$ がちょうど $2$ 種類という条件の確認を別に書く羽目になる。ここは自動でみたされる。`,
            String.raw`$(3,3)$ では $9$ 点から $5$ 点なので、空になる行と列を同時に作ることはできない。包除原理の第3項以降が $0$ になるのはそのためで、書いておくと安全である。`,
          ],
          check: String.raw`$ {}_{16}\mathrm{C}_{5}=4368$ 通りをすべて列挙して「点を含まない直線がちょうど $2$ 本」を数えると $1824$ 通りで、内訳は $(p,q)=(4,2)$ が $192$、$(2,4)$ が $192$、$(3,3)$ が $1440$ であった。`,
        },
        {
          label: "(2)",
          task: String.raw`$8$ 本の直線がいずれも選んだ点を少なくとも $1$ 個含む選び方の数を求める`,
          answer: String.raw`$432$ 通り`,
          approach: String.raw`条件は $p=q=4$、つまり $4$ 行 $4$ 列すべてを使うことである。$5$ 点で $4$ 行を埋めるので、$1$ つの行だけ $2$ 点、列も同様に $1$ つだけ $2$ 点になる。その「二重の行」と「二重の列」が交わるところに点があるかどうかで、形が2通りに分かれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) と同じ記号で、条件は $8-p-q=0$、すなわち $p=q=4$ である。$5$ 点を $4$ 行に各行 $1$ 個以上で配ると、ちょうど $1$ つの行が $2$ 点、残り $3$ 行が $1$ 点ずつになる。列についても同様である。この行を $r$、列を $c$ とする。`,
            },
            {
              k: "p",
              t: String.raw`**(i) 点 $(r,c)$ が選ばれている場合。** このとき、$(r,c)$ を取り除くと行 $r$ も列 $c$ も $1$ 点になり、残り $4$ 点は各行各列ちょうど $1$ 点ずつ、つまり置換の形になる。逆に、置換の形の $4$ 点に残り $12$ 点のどれか $1$ 点を加えると、必ずこの形になる。置換は $4!=24$ 通り、足す点は $16-4=12$ 通りなので`,
            },
            { k: "math", t: String.raw`24\times12=288` },
            {
              k: "p",
              t: String.raw`通りである。この数え方で重複が起きないのは、$(r,c)$ が選ばれている $5$ 点の集合からは、取り除いて置換になる点が $(r,c)$ ただ1つだからである（行 $r$ の他方の点を除くと、その列が空になる）。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) 点 $(r,c)$ が選ばれていない場合。** 列 $c$ の $2$ 点は $r$ 以外の $2$ 行にあり、その $2$ 行はこれで $1$ 点ずつ埋まる。残る $1$ 行を $r'$ とする。列 $c$ 以外の $3$ 列は $1$ 点ずつで、その $3$ 点は行 $r$ の $2$ 点と行 $r'$ の $1$ 点である。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`行 $r$ を選ぶ：$4$ 通り。列 $c$ を選ぶ：$4$ 通り。`,
                String.raw`列 $c$ の $2$ 点が入る行を、$r$ 以外の $3$ 行から選ぶ：$ {}_{3}\mathrm{C}_{2}=3$ 通り（残りが $r'$）。`,
                String.raw`行 $r$ の $2$ 点が入る列を、$c$ 以外の $3$ 列から選ぶ：$ {}_{3}\mathrm{C}_{2}=3$ 通り（残りが $r'$ の列）。`,
              ],
            },
            { k: "p", t: String.raw`で $4\times4\times3\times3=144$ 通りである。` },
            { k: "p", t: String.raw`**合計。** ` },
            { k: "math", t: String.raw`288+144=432` },
            { k: "p", t: String.raw`通りである。` },
            {
              k: "note",
              t: String.raw`包除原理でも出せる。$i$ 行と $j$ 列を空ける選び方を足し引きして`,
            },
            {
              k: "math",
              t: String.raw`\sum_{i=0}^{4}\sum_{j=0}^{4}(-1)^{i+j}\,{}_{4}\mathrm{C}_{i}\,{}_{4}\mathrm{C}_{j}\,{}_{(4-i)(4-j)}\mathrm{C}_{5}=4368-2\cdot3168+2\cdot336+2016-2\cdot144=432`,
            },
            { k: "p", t: String.raw`となり、同じ答えになる。` },
          ],
          pitfalls: [
            String.raw`(i) で「置換 $\times$ 残りの点」と数えると、(ii) の形がまったく出てこない。$(r,c)$ が選ばれていない形は、どの $1$ 点を取り除いても置換にならないからである。この取りこぼしに気づかないと $288$ で終わってしまう。`,
            String.raw`$p=q=4$ から「行も列も $(2,1,1,1)$ の形」はすぐ出るが、行の $2$ 点と列の $2$ 点の位置関係までは決まらない。そこで場合分けが必要になる。`,
          ],
          check: String.raw`$ {}_{16}\mathrm{C}_{5}=4368$ 通りをすべて列挙して「$8$ 本すべてが点を含む」を数えると $432$ 通りで、包除原理の計算結果とも一致する。$288+144=432$ の内訳も、列挙で $(r,c)$ が選ばれているものが $288$、いないものが $144$ であった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["通過領域", "半直線", "回転", "正三角形"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$m(t)=t+\\frac4t-2$ を $t$ について $20$ 万点で調べると最小値はちょうど $2$（$t=2$）で、$t\\to0^{+}$、$t\\to\\infty$ でいくらでも大きくなることを確かめた",
          "$a$ を $-2$ から $1$ まで動かし、$C$ 上の点を $40$ 万点とって $\\pm60^{\\circ}$ 回した向きが $\\ell$ に一致するかを調べると、$a=-1.5,-1.0,-0.6,0.07,0.3,0.57$ で可能、$a=-2,-1.6,-0.5,0,0.03,0.6,1$ で不可能となり、予想した2区間と完全に一致した",
          "区間の端 $\\frac{5\\sqrt3-8}{11}=0.060023$、$\\frac{1}{\\sqrt3}=0.577350$、$-\\frac{8+5\\sqrt3}{11}=-1.514569$、$-\\frac{1}{\\sqrt3}=-0.577350$ を、$\\tan\\left(\\arctan2\\pm60^{\\circ}\\right)$ と $\\tan\\left(90^{\\circ}\\pm60^{\\circ}\\right)$ から確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}$ が $C$ 上を動くとき、半直線 $\mathrm{OP}$ が通過する領域を図示する`,
          answer: String.raw`$x\ge0$ かつ $y\ge2x$（境界を含む）`,
          approach: String.raw`半直線 $\mathrm{OP}$ は「向き」だけで決まる。だから $\mathrm{P}$ の座標そのものではなく、$\mathrm{OP}$ の傾きがどこまで動くかを調べればよい。$\mathrm{P}=(t,\,t^{2}-2t+4)$ の傾きは $t+\dfrac4t-2$ で、相加相乗平均ですぐ最小値が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}=\left(t,\;t^{2}-2t+4\right)$（$t\ge0$）とおく。$x^{2}-2x+4=(x-1)^{2}+3>0$ なので、$C$ は第1象限と $y$ 軸上（$t=0$ のとき $\mathrm{P}=(0,4)$）にある。`,
            },
            {
              k: "p",
              t: String.raw`**$t>0$ のとき。** 半直線 $\mathrm{OP}$ は原点から右上に伸びる半直線で、その傾きは`,
            },
            {
              k: "math",
              t: String.raw`m(t)=\frac{t^{2}-2t+4}{t}=t+\frac4t-2`,
            },
            { k: "p", t: String.raw`である。相加相乗平均より $t+\dfrac4t\ge2\sqrt{4}=4$ で、等号は $t=2$ のときだから` },
            { k: "math", t: String.raw`m(t)\ge2` },
            {
              k: "p",
              t: String.raw`である。また $t\to0^{+}$ でも $t\to\infty$ でも $m(t)\to\infty$ なので、$m(t)$ は $2$ 以上のすべての実数をとる。`,
            },
            {
              k: "p",
              t: String.raw`**$t=0$ のとき。** $\mathrm{P}=(0,4)$ なので、半直線 $\mathrm{OP}$ は $y$ 軸の $y\ge0$ の部分である。`,
            },
            {
              k: "p",
              t: String.raw`**まとめる。** 傾き $m\ge2$ の半直線 $\{(x,mx)\mid x\ge0\}$ をすべて集めると、$x>0$ の部分では $\dfrac yx\ge2$、つまり $y\ge2x$ をみたす点がちょうど全部現れる。$x=0$ の部分は $t=0$ の半直線が $y\ge0$ を埋める。よって通過領域は`,
            },
            { k: "math", t: String.raw`x\ge0\quad\text{かつ}\quad y\ge2x` },
            {
              k: "p",
              t: String.raw`である（境界の半直線 $y=2x\ (x\ge0)$ と $y$ 軸の $y\ge0$ の部分も含む）。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$C$（$y=x^{2}-2x+4$ の $x\ge0$ の部分）と、半直線 $\mathrm{OP}$ の通過領域。領域は $y$ 軸の $y\ge0$ の部分と半直線 $y=2x\ (x\ge0)$ ではさまれた部分で、境界を含む。傾きが最小になるのは $\mathrm{P}=(2,4)$ のとき。`,
                view: [-1.6, 5.2, -1.1, 9.6],
                step: { x: 1, y: 2 },
                items: [
                  { k: "fill", pts: [[0, 0], [4.8, 9.6], [0, 9.6]] },
                  { k: "curve", f: C3, from: 0, to: 2.95 },
                  { k: "seg", a: [0, 0], b: [4.8, 9.6] },
                  { k: "seg", a: [0, 0], b: [0, 9.6] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [2, 4], label: "(2, 4)", place: "below-right" },
                  { k: "dot", at: [0, 4], label: "(0, 4)", place: "left" },
                  { k: "text", at: [2.95, C3(2.95)], label: "C", place: "right" },
                  { k: "text", at: [4.8, 9.6], label: "y = 2x", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$t=0$ を忘れない。$t>0$ だけだと $x=0$ の部分（$y$ 軸）が抜けてしまい、領域が開いているのか閉じているのか答えられなくなる。`,
            String.raw`$m(t)$ は $t=2$ で最小になるが、$t$ が $0$ に近いところと大きいところの両方で $\infty$ に発散する。つまり同じ傾きの半直線が $2$ つの $t$ から出ることがある。領域を求めるだけなら重複は問題にならない。`,
            String.raw`半直線は原点を端点に含むので、$\mathrm{O}$ 自身も領域に入る。`,
          ],
          check: String.raw`$m(t)=t+\frac4t-2$ を $t$ について $20$ 万点で調べると最小値はちょうど $2.000000$（$t=2$）である。$t=1$ なら $m=3$、$t=4$ なら $m=3$ で、同じ傾きが $2$ か所から出ることも確かめられる。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ 上の点 $\mathrm{A}$ と $\ell:y=ax$ 上の点 $\mathrm{B}$ で、$\mathrm{O},\mathrm{A},\mathrm{B}$ が正三角形の3頂点となるものが存在する $a$ の範囲を求める`,
          answer: String.raw`$\dfrac{5\sqrt3-8}{11}\le a\le\dfrac{1}{\sqrt3}$ または $-\dfrac{8+5\sqrt3}{11}\le a\le-\dfrac{1}{\sqrt3}$`,
          approach: String.raw`$\mathrm{O}$ が正三角形の頂点の1つなので、$\mathrm{B}$ は $\mathrm{A}$ を $\mathrm{O}$ のまわりに $\pm60^{\circ}$ 回した点に限る。すると問題は「$\mathrm{OA}$ の向きを $\pm60^{\circ}$ 回したものが $\ell$ の向きになるか」だけになり、(1) で調べた $\mathrm{OA}$ の向きの範囲がそのまま効く。長さは回転で変わらないので、条件に一切関わらない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B}$ が正三角形なら $\mathrm{OA}=\mathrm{OB}$ かつ $\angle\mathrm{AOB}=60^{\circ}$ なので、$\mathrm{B}$ は $\mathrm{A}$ を原点のまわりに $+60^{\circ}$ または $-60^{\circ}$ 回した点である。逆にそう回せば必ず正三角形になる。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{OA}$ が $x$ 軸の正の向きとなす角を $\theta$ とする。(1) より $\mathrm{OA}$ の傾きは $2$ 以上のすべての値をとり、$t=0$ のときは $y$ 軸正の向き（$\theta=90^{\circ}$）だから`,
            },
            {
              k: "math",
              t: String.raw`\beta\le\theta\le90^{\circ}\qquad\left(\beta=\arctan2=63.43\cdots^{\circ}\right)`,
            },
            {
              k: "p",
              t: String.raw`であり、この範囲の $\theta$ はすべて実現する。$\mathrm{B}$ の向きは $\theta\pm60^{\circ}$ で、長さ $\mathrm{OB}=\mathrm{OA}>0$ は自由だから、$\mathrm{B}$ が $\ell$ 上にある条件は「向き $\theta\pm60^{\circ}$ の直線が $\ell$ に一致する」こと、すなわち`,
            },
            { k: "math", t: String.raw`a=\tan\left(\theta\pm60^{\circ}\right)` },
            { k: "p", t: String.raw`である（$\ell$ は原点を通る直線なので、向きが $180^{\circ}$ ずれても同じ直線である）。` },
            {
              k: "p",
              t: String.raw`**$-60^{\circ}$ の側。** $\theta-60^{\circ}$ は $\beta-60^{\circ}=3.43\cdots^{\circ}$ から $30^{\circ}$ まで動く。この範囲で $\tan$ は連続な増加関数なので`,
            },
            {
              k: "math",
              t: String.raw`\tan\left(\beta-60^{\circ}\right)\le a\le\tan30^{\circ}`,
            },
            { k: "p", t: String.raw`である。加法定理より（$\tan\beta=2$、$\tan60^{\circ}=\sqrt3$）` },
            {
              k: "math",
              t: String.raw`\tan\left(\beta-60^{\circ}\right)=\frac{2-\sqrt3}{1+2\sqrt3}=\frac{\left(2-\sqrt3\right)\left(2\sqrt3-1\right)}{\left(2\sqrt3+1\right)\left(2\sqrt3-1\right)}=\frac{5\sqrt3-8}{11}`,
            },
            { k: "p", t: String.raw`なので、この側の範囲は $\dfrac{5\sqrt3-8}{11}\le a\le\dfrac{1}{\sqrt3}$ である。` },
            {
              k: "p",
              t: String.raw`**$+60^{\circ}$ の側。** $\theta+60^{\circ}$ は $\beta+60^{\circ}=123.43\cdots^{\circ}$ から $150^{\circ}$ まで動く。$90^{\circ}$ と $180^{\circ}$ のあいだなので $\tan$ は負で、やはり連続な増加関数だから`,
            },
            {
              k: "math",
              t: String.raw`\tan\left(\beta+60^{\circ}\right)\le a\le\tan150^{\circ}`,
            },
            { k: "p", t: String.raw`である。同じく加法定理で` },
            {
              k: "math",
              t: String.raw`\tan\left(\beta+60^{\circ}\right)=\frac{2+\sqrt3}{1-2\sqrt3}=\frac{\left(2+\sqrt3\right)\left(1+2\sqrt3\right)}{\left(1-2\sqrt3\right)\left(1+2\sqrt3\right)}=\frac{8+5\sqrt3}{-11}=-\frac{8+5\sqrt3}{11}`,
            },
            { k: "p", t: String.raw`なので、この側の範囲は $-\dfrac{8+5\sqrt3}{11}\le a\le-\dfrac{1}{\sqrt3}$ である。` },
            { k: "p", t: String.raw`**まとめ。** 求める範囲は` },
            {
              k: "math",
              t: String.raw`\frac{5\sqrt3-8}{11}\le a\le\frac{1}{\sqrt3}\qquad\text{または}\qquad-\frac{8+5\sqrt3}{11}\le a\le-\frac{1}{\sqrt3}`,
            },
            {
              k: "p",
              t: String.raw`である。小数で書くと $0.0600\le a\le0.5774$ と $-1.5146\le a\le-0.5774$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\mathrm{A}=(2,4)$（$\mathrm{OA}$ の傾きが最小の点）を $-60^{\circ}$ 回して $\mathrm{B}$ をとった例。$\mathrm{OA}=\mathrm{OB}$、$\angle\mathrm{AOB}=60^{\circ}$ で正三角形になり、このとき $\ell$ の傾きは $\frac{5\sqrt3-8}{11}=0.060$ である。`,
                view: [-1.0, 5.6, -0.9, 4.7],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: C3, from: 0, to: 2.2 },
                  { k: "seg", a: [0, 0], b: [AX3, AY3] },
                  { k: "seg", a: [0, 0], b: [BX3, BY3] },
                  { k: "seg", a: [AX3, AY3], b: [BX3, BY3] },
                  { k: "seg", a: [-1.0, -1.0 * 0.0600231], b: [5.6, 5.6 * 0.0600231], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [AX3, AY3], label: "A", place: "above-left" },
                  { k: "dot", at: [BX3, BY3], label: "B", place: "above-right" },
                  { k: "text", at: [5.6, 5.6 * 0.0600231], label: "l", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{O}$ も正三角形の頂点であることを使う。$\mathrm{B}$ は $\mathrm{A}$ を原点のまわりに回した点に限られるので、$\mathrm{OB}$ の長さは条件に関係しない。$\mathrm{A}$ の位置ではなく $\mathrm{OA}$ の**向き**だけを追えばよい。`,
            String.raw`$\ell$ は直線であって半直線ではない。向きが $180^{\circ}$ 違っても同じ直線なので、$\theta+60^{\circ}$ が $90^{\circ}$ を超えても $\tan$ の値で扱える。ここを半直線と取り違えると範囲が半分になる。`,
            String.raw`$\theta$ の範囲 $\left[\beta,\;90^{\circ}\right]$ は両端を含む。$\theta=\beta$ は $\mathrm{A}=(2,4)$、$\theta=90^{\circ}$ は $\mathrm{A}=(0,4)$ で実現するので、$a$ の範囲も両端を含む。`,
            String.raw`$a=0$ は範囲に入らない。$\ell$ が $x$ 軸だと $\theta$ が $60^{\circ}$ か $120^{\circ}$ でなければならず、どちらも $\left[\beta,\;90^{\circ}\right]$ の外だからである。`,
          ],
          check: String.raw`$C$ 上の点を $40$ 万点とって $\pm60^{\circ}$ 回した向きが $\ell$ と一致するかを調べると、$a=-1.5,-1.0,-0.6,0.07,0.3,0.57$ では存在し、$a=-2,-1.6,-0.5,0,0.03,0.6,1$ では存在しない。これは $\left[0.060023,\;0.577350\right]$ と $\left[-1.514569,\;-0.577350\right]$ という2区間とぴったり合う。`,
        },
      ],
    },
    {
      no: 4,
      field: "整式・数列",
      topics: ["基本対称式", "多項式の積", "係数比較", "漸化式"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n,k}$ を定義どおり全組合せの和として計算し、$a_{4,3}=120$（問題文の例）と一致することを確かめた",
          "$2\\le n\\le12$ で $a_{n,2}=\\frac{(2^{n}-1)(2^{n}-2)}{3}$ を確かめた",
          "$1\\le n\\le9$ で $f_{n+1}(x)$ を $f_n(x)$、$f_n(2x)$ で多項式として割り切り、商がそれぞれ $1+2^{n}x$、$1+x$（余り $0$）になることを確かめた",
          "$1\\le n\\le10$、$1\\le k\\le n$ のすべてで $\\frac{a_{n+1,k+1}}{a_{n,k}}=\\frac{2^{k}\\left(2^{n+1}-1\\right)}{2^{k+1}-1}$ を分数のまま確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n\ge2$ に対して $a_{n,2}$ を求める`,
          answer: String.raw`$a_{n,2}=\dfrac{\left(2^{n}-1\right)\left(2^{n}-2\right)}{3}$`,
          approach: String.raw`$a_{n,2}$ は「相異なる2つの積の総和」なので、$\left(\text{全部の和}\right)^{2}$ を展開したものから、同じもの同士の積を引いて $2$ で割ればよい。どちらの和も等比数列なので、すぐに closed form になる。`,
          blocks: [
            { k: "p", t: String.raw`$S=\displaystyle\sum_{m=0}^{n-1}2^{m}=2^{n}-1$、$T=\displaystyle\sum_{m=0}^{n-1}4^{m}=\frac{4^{n}-1}{3}$ とおく。` },
            {
              k: "math",
              t: String.raw`S^{2}=\sum_{m}\left(2^{m}\right)^{2}+2\sum_{m<m'}2^{m}2^{m'}=T+2a_{n,2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`a_{n,2}=\frac{S^{2}-T}{2}=\frac12\left\{\left(2^{n}-1\right)^{2}-\frac{4^{n}-1}{3}\right\}`,
            },
            { k: "p", t: String.raw`である。中身を通分すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
3\left(2^{n}-1\right)^{2}-\left(4^{n}-1\right)&=3\cdot4^{n}-6\cdot2^{n}+3-4^{n}+1\\[1mm]
&=2\cdot4^{n}-6\cdot2^{n}+4=2\left(2^{n}-1\right)\left(2^{n}-2\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`a_{n,2}=\frac{\left(2^{n}-1\right)\left(2^{n}-2\right)}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=4$ なら $\dfrac{15\cdot14}{3}=70$ で、$1\cdot2+1\cdot4+1\cdot8+2\cdot4+2\cdot8+4\cdot8=70$ と合う。$\left(2^{n}-1\right)\left(2^{n}-2\right)$ は連続する2整数の積ではないが、$2^{n}-1$ と $2^{n}-2$ のどちらかが $3$ の倍数になるので、商は必ず整数である。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n,2}$ は「相異なる2つ」の積の和なので、$2$ で割るのを忘れない。$S^{2}$ では同じ組が2回ずつ現れる。`,
            String.raw`$\sum\left(2^{m}\right)^{2}=\sum4^{m}$ であって $\left(\sum2^{m}\right)^{2}$ ではない。公比が $4$ の等比数列になる。`,
          ],
          check: String.raw`定義どおりに全組合せの積を足して $a_{n,2}$ を計算すると、$2\le n\le12$ のすべてで $\frac{(2^{n}-1)(2^{n}-2)}{3}$ と一致した。$n=4$ では $70$、$n=5$ では $\frac{31\cdot30}{3}=310$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$\dfrac{f_{n+1}(x)}{f_n(x)}$ と $\dfrac{f_{n+1}(x)}{f_n(2x)}$ を $x$ の整式で表す`,
          answer: String.raw`$\dfrac{f_{n+1}(x)}{f_n(x)}=1+2^{n}x$、$\dfrac{f_{n+1}(x)}{f_n(2x)}=1+x$`,
          approach: String.raw`$a_{n,k}$ は $2^{0},2^{1},\dots,2^{n-1}$ の基本対称式なので、$f_n(x)$ はそれらを根にもつ式の形、つまり $\prod\left(1+2^{m}x\right)$ そのものである。この積の形にしてしまえば、$n$ を $1$ 増やす操作も $x$ を $2x$ に替える操作も、因数が1つずれるだけになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_{n,k}$ は $2^{0},2^{1},\dots,2^{n-1}$ から $k$ 個選んだ積の総和、つまり基本対称式である。$\left(1+2^{0}x\right)\left(1+2^{1}x\right)\cdots\left(1+2^{n-1}x\right)$ を展開すると、$x^{k}$ の係数はちょうど「$k$ 個の $2^{m}$ を選んだ積の総和」になるので`,
            },
            {
              k: "math",
              t: String.raw`f_n(x)=\prod_{m=0}^{n-1}\left(1+2^{m}x\right)`,
            },
            { k: "p", t: String.raw`である（$a_{n,0}=1$ も合っている）。` },
            { k: "p", t: String.raw`**1つめ。** 積の形から、$n$ を $1$ 増やすと因数が1つ増えるだけで` },
            {
              k: "math",
              t: String.raw`f_{n+1}(x)=f_n(x)\left(1+2^{n}x\right)\quad\Longrightarrow\quad\frac{f_{n+1}(x)}{f_n(x)}=1+2^{n}x`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**2つめ。** $x$ を $2x$ に替えると、各因数の指数が1つずつ上がって` },
            {
              k: "math",
              t: String.raw`f_n(2x)=\prod_{m=0}^{n-1}\left(1+2^{m+1}x\right)=\prod_{m=1}^{n}\left(1+2^{m}x\right)=\frac{f_{n+1}(x)}{1+x}`,
            },
            { k: "p", t: String.raw`となる（$f_{n+1}$ の積から $m=0$ の因数 $1+x$ を取り除いた形）。よって` },
            {
              k: "math",
              t: String.raw`\frac{f_{n+1}(x)}{f_n(2x)}=1+x`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$f_n(x)=\prod\left(1+2^{m}x\right)$ であることは、$n$ についての帰納法でも示せる。$f_{n+1}$ の $x^{k}$ の係数 $a_{n+1,k}$ を「$2^{n}$ を選ぶか選ばないか」で分けると $a_{n+1,k}=a_{n,k}+2^{n}a_{n,k-1}$ となり、これは $f_{n+1}(x)=f_n(x)\left(1+2^{n}x\right)$ の係数比較そのものである。`,
            },
          ],
          pitfalls: [
            String.raw`$f_n(2x)$ は $f_n(x)$ の各項に $2^{k}$ を掛けたもの（$\sum a_{n,k}2^{k}x^{k}$）である。積の形で見ると「指数が1つずれる」と分かるが、係数の形のままだと見通しが悪い。`,
            String.raw`$f_{n+1}(x)$ は $f_n(x)$ の因数を1つ**後ろ**に足したもの、$f_n(2x)$ は因数を1つ**前**から外したものである。どちらも $f_{n+1}$ との差が1因数なので、商が1次式になる。`,
          ],
          check: String.raw`$1\le n\le9$ について $f_n(x)$ の係数を定義から計算し、$f_{n+1}(x)$ を $f_n(x)$ と $f_n(2x)$ で多項式として割ると、商はそれぞれ $1+2^{n}x$ と $1+x$、余りはどちらも $0$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\dfrac{a_{n+1,k+1}}{a_{n,k}}$ を $n,k$ で表す`,
          answer: String.raw`$\dfrac{a_{n+1,k+1}}{a_{n,k}}=\dfrac{2^{k}\left(2^{n+1}-1\right)}{2^{k+1}-1}$`,
          approach: String.raw`(2) で $f_{n+1}$ の表し方が2通り得られた。同じ $x^{k+1}$ の係数を2通りに書けば、$a_{n+1,k+1}$ を含む等式が2本できる。$a_{n,k+1}$ を消去すれば、$a_{n+1,k+1}$ と $a_{n,k}$ だけの関係が残る。`,
          blocks: [
            { k: "p", t: String.raw`(2) の2つの式を使う。まず $f_{n+1}(x)=f_n(x)\left(1+2^{n}x\right)$ の $x^{k+1}$ の係数を比べて` },
            {
              k: "math",
              t: String.raw`a_{n+1,k+1}=a_{n,k+1}+2^{n}a_{n,k}\qquad\cdots\;①`,
            },
            {
              k: "p",
              t: String.raw`である。次に $f_{n+1}(x)=f_n(2x)\left(1+x\right)$ を使う。$f_n(2x)=\displaystyle\sum_{j}a_{n,j}2^{j}x^{j}$ なので、$x^{k+1}$ の係数は`,
            },
            {
              k: "math",
              t: String.raw`a_{n+1,k+1}=2^{k+1}a_{n,k+1}+2^{k}a_{n,k}\qquad\cdots\;②`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$a_{n,k+1}$ を消す。** ①$\times2^{k+1}$ から ② を引くと` },
            {
              k: "math",
              t: String.raw`\left(2^{k+1}-1\right)a_{n+1,k+1}=\left(2^{n+k+1}-2^{k}\right)a_{n,k}=2^{k}\left(2^{n+1}-1\right)a_{n,k}`,
            },
            {
              k: "p",
              t: String.raw`となる。$a_{n,k}>0$、$2^{k+1}-1>0$ なので割ってよく`,
            },
            {
              k: "math",
              t: String.raw`\frac{a_{n+1,k+1}}{a_{n,k}}=\frac{2^{k}\left(2^{n+1}-1\right)}{2^{k+1}-1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$①\times2^{k+1}-②$ の左辺は $\left(2^{k+1}-1\right)a_{n+1,k+1}$、右辺の $a_{n,k+1}$ の項は $2^{k+1}a_{n,k+1}-2^{k+1}a_{n,k+1}=0$ で消える。残るのは $2^{k+1}\cdot2^{n}a_{n,k}-2^{k}a_{n,k}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`②を作るとき、$f_n(2x)$ の $x^{j}$ の係数が $a_{n,j}2^{j}$ であることを使う。$a_{n,j}$ のままにすると ① と同じ式になってしまい、消去ができない。`,
            String.raw`消去する相手は $a_{n,k+1}$ である。$a_{n+1,k+1}$ を消してしまうと目的の比が出ない。①の両辺を $2^{k+1}$ 倍してから引く、という順番が要点である。`,
            String.raw`$k=n$ のときも成り立つ（$a_{n,n}=2^{0+1+\dots+(n-1)}$）。式の上では $k\le n$ の範囲すべてで使える。`,
          ],
          check: String.raw`$n=3$、$k=2$ では $\frac{a_{4,3}}{a_{3,2}}=\frac{120}{14}=\frac{60}{7}$ で、$\frac{2^{2}\left(2^{4}-1\right)}{2^{3}-1}=\frac{4\cdot15}{7}=\frac{60}{7}$ と一致する。$1\le n\le10$、$1\le k\le n$ のすべての組で、分数のまま計算して一致することを確かめた。`,
        },
      ],
    },
  ],
};
