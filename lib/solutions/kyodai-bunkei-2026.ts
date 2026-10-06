import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2026年度（令和8年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */
export const kyodaiBunkei2026: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["円の接線", "6分の1公式", "解と係数の関係", "平方完成による最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$t$ を細かく動かして面積を数値積分し、$S=\\frac{(7t^{2}-4t+1)^{3/2}}{6t^{3}}$ と一致することを確かめた",
          "$t=\\frac12$ で最小値 $\\frac{\\sqrt3}{2}$ になることを全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$S$ の最小値を求める`,
          answer: String.raw`$S$ の最小値は $\dfrac{\sqrt3}{2}$（$t=\dfrac12$ のとき）`,
          approach: String.raw`放物線と直線で囲む面積なので**6分の1公式**が使える。交点を求めずに、解と係数の関係から $(x_2-x_1)^{2}$ だけを出せばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は第1象限にあるので $\mathrm{P}\left(\sqrt{1-t^{2}},\,t\right)$。$a=\sqrt{1-t^{2}}$ とおくと、$\mathrm{P}$ における $C$ の接線は $ax+ty=1$、すなわち $y=\dfrac{1-ax}{t}$。`,
            },
            { k: "p", t: String.raw`放物線との交点の $x$ 座標は` },
            { k: "math", t: String.raw`2-x^{2}=\frac{1-ax}{t}\ \Longleftrightarrow\ tx^{2}-ax+(1-2t)=0` },
            {
              k: "p",
              t: String.raw`解を $x_1<x_2$ とすると、$t>0$ だから $2-x^{2}-\dfrac{1-ax}{t}=(x-x_1)(x_2-x)$ と書ける。よって6分の1公式から`,
            },
            { k: "math", t: String.raw`S=\int_{x_1}^{x_2}(x-x_1)(x_2-x)\,dx=\frac{(x_2-x_1)^{3}}{6}` },
            { k: "p", t: String.raw`解と係数の関係で $x_1+x_2=\dfrac{a}{t},\ x_1x_2=\dfrac{1-2t}{t}$ だから` },
            {
              k: "math",
              t: String.raw`(x_2-x_1)^{2}=\frac{a^{2}}{t^{2}}-\frac{4(1-2t)}{t}=\frac{(1-t^{2})-4t(1-2t)}{t^{2}}=\frac{7t^{2}-4t+1}{t^{2}}`,
            },
            {
              k: "p",
              t: String.raw`$7t^{2}-4t+1$ の判別式は $16-28<0$ なので、どんな $t$ でも正。つまり交点はつねに2つある。ここで`,
            },
            {
              k: "math",
              t: String.raw`u=\frac{7t^{2}-4t+1}{t^{2}}=7-\frac4t+\frac{1}{t^{2}},\qquad v=\frac1t\ (>1)`,
            },
            { k: "p", t: String.raw`とおくと $u=v^{2}-4v+7=(v-2)^{2}+3$。$0<t<1$ より $v>1$ で、$v=2$ すなわち $t=\dfrac12$ は範囲に入るから $u$ の最小値は $3$。` },
            { k: "p", t: String.raw`$S=\dfrac{u^{3/2}}{6}$ は $u$ の増加関数なので` },
            { k: "math", t: String.raw`S_{\min}=\frac{3^{3/2}}{6}=\frac{3\sqrt3}{6}=\frac{\sqrt3}{2}` },
          ],
          check: String.raw`$t=\dfrac12$ のとき $a=\dfrac{\sqrt3}{2}$ で、接線は $y=2-\sqrt3\,x$。$2-x^{2}=2-\sqrt3 x$ から交点は $x=0,\ \sqrt3$ となり、$S=\dfrac{(\sqrt3)^{3}}{6}=\dfrac{\sqrt3}{2}$。確かに一致する。`,
          pitfalls: [
            String.raw`交点の $x$ 座標を根号で書き下す必要はない。6分の1公式に要るのは $(x_2-x_1)^{2}$ だけ。`,
            String.raw`$\dfrac1t$ を変数に取り替えると、分数のままの式が2次関数になって平方完成できる。$t$ のまま微分すると手間が増える。`,
            String.raw`$v>1$ の範囲に頂点 $v=2$ が入っていることを確かめる。入っていなければ端点で最小になる。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "空間図形",
      topics: ["正四面体", "対辺の距離", "球面と線分", "最大・最小の両側"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "正四面体を座標に取り、$\\mathrm{P}$ と辺 $\\mathrm{BC}$ 上の点の距離の2乗が $(s-\\frac12)^{2}+(w-\\frac12)^{2}+\\frac12$ になることを数値で確かめた",
          "$r=\\frac{\\sqrt2}{2}$ と $r=1$ の前後で、共有点をもつ $\\mathrm{P}$ の有無が切り替わることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`条件をみたす $r$ の範囲を求める`,
          answer: String.raw`$0<r<\dfrac{\sqrt2}{2}$ または $r>1$`,
          approach: String.raw`**「球」ではなく「球面」**なので、小さすぎても大きすぎても共有点をもたない。$\mathrm{P}$ から辺 $\mathrm{BC}$ 上の点までの距離の**最小と最大**を両方押さえる必要がある。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O}(0,0,0),\ \mathrm{A}(1,0,0),\ \mathrm{B}\left(\frac12,\frac{\sqrt3}{2},0\right),\ \mathrm{C}\left(\frac12,\frac{\sqrt3}{6},\frac{\sqrt6}{3}\right)$ と座標をとる（すべての辺の長さが $1$ になる）。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}(s,0,0)\ (0\le s\le1)$、辺 $\mathrm{BC}$ 上の点を $\mathrm{Q}=\mathrm{B}+w(\mathrm{C}-\mathrm{B})\ (0\le w\le1)$ とすると、整理して`,
            },
            {
              k: "math",
              t: String.raw`|\mathrm{PQ}|^{2}=\left(s-\frac12\right)^{2}+\left(w-\frac12\right)^{2}+\frac12`,
            },
            {
              k: "note",
              title: "この形が見通しを与える",
              t: String.raw`$s$ と $w$ が完全に分離する。だから $\mathrm{P}$ を固定したときの最小・最大は $w=\frac12$ と $w=0,1$ で決まり、さらに $s$ を動かしたときの範囲もすぐ出る。`,
            },
            { k: "p", t: String.raw`$\mathrm{P}$ を固定したときの最小距離 $d(s)$ と最大距離 $D(s)$ は` },
            {
              k: "math",
              t: String.raw`d(s)^{2}=\left(s-\frac12\right)^{2}+\frac12,\qquad D(s)^{2}=\left(s-\frac12\right)^{2}+\frac34`,
            },
            {
              k: "p",
              t: String.raw`球面が辺 $\mathrm{BC}$ と共有点をもつのは $d(s)\le r\le D(s)$ のとき。$z=\left(s-\frac12\right)^{2}$ は $0\le z\le\frac14$ を動くので、「ある $\mathrm{P}$ で共有点をもつ」は`,
            },
            {
              k: "math",
              t: String.raw`\exists z\in\left[0,\tfrac14\right]:\ z+\frac12\le r^{2}\le z+\frac34\ \Longleftrightarrow\ \frac12\le r^{2}\le1`,
            },
            {
              k: "p",
              t: String.raw`求めるのはその否定だから $r^{2}<\dfrac12$ または $r^{2}>1$、すなわち $0<r<\dfrac{\sqrt2}{2}$ または $r>1$。`,
            },
          ],
          check: String.raw`$\dfrac{\sqrt2}{2}$ は正四面体の対辺の距離（$\mathrm{OA}$ と $\mathrm{BC}$ の最短距離）で、$1$ は辺の長さ。$r=1$ のときは $\mathrm{P}=\mathrm{O}$ とすると球面が $\mathrm{B}$ を通ってしまう。境界の意味がはっきりしている。`,
          pitfalls: [
            String.raw`「球面」と「球」を取り違えない。球（中身入り）なら答えは $0<r<\dfrac{\sqrt2}{2}$ だけになる。$r>1$ が出てくるのは、球面が辺をまたいで外側に出てしまう場合があるから。`,
            String.raw`$\mathrm{P}$ が端（$\mathrm{O}$ または $\mathrm{A}$）にあるときに最大距離が $1$ になる。「どこにあっても」なので、いちばん厳しい $\mathrm{P}$ で押さえる。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["1次不定方程式", "剰余類", "表せない数の個数", "フロベニウス数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$p=5,7,11,13,17,19,23$ について、$3m+pk$ で表せない $0$ 以上の整数を全探索し、個数が $p-1$ になることを確かめた",
          "$2p$ 以上の整数がすべて表せることも、同じ全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$2p$ 以上の整数が $N=3m+pk$ と表せることを示す`,
          answer: String.raw`$k\in\{0,1,2\}$ の中に $pk\equiv N\pmod 3$ をみたすものがあり、そのとき $N-pk\ge N-2p\ge0$ が $3$ の倍数になる`,
          approach: String.raw`$k$ を $0,1,2$ に限って探す。$p$ は $3$ の倍数でないので、$0,\ p,\ 2p$ は $\bmod 3$ で**すべて異なる**値をとり、3つの剰余類を覆う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p$ は $3$ より大きい素数なので $3\nmid p$。よって $0,\ p,\ 2p$ を $3$ で割った余りはすべて異なり、$\{0,1,2\}$ を覆う。`,
            },
            {
              k: "p",
              t: String.raw`したがって、どんな $N$ に対しても $pk\equiv N\pmod3$ をみたす $k\in\{0,1,2\}$ がただ1つある。この $k$ について $N-pk$ は $3$ の倍数。`,
            },
            {
              k: "p",
              t: String.raw`さらに $N\ge2p$ かつ $k\le2$ だから $N-pk\ge N-2p\ge0$。よって $m=\dfrac{N-pk}{3}$ は $0$ 以上の整数で、$N=3m+pk$ と表せる。`,
            },
          ],
          pitfalls: [
            String.raw`$k$ を $0,1,2$ に絞るのが要点。$k$ を大きくしてもよいが、$N-pk\ge0$ が崩れる。`,
            String.raw`$p>3$ が効くのは「$p$ が $3$ の倍数でない」という一点。$p=3$ だと $0,p,2p$ がすべて $\bmod 3$ で $0$ になり、覆えない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$N=3m+pk$ と表せない $0$ 以上の整数の個数を求める`,
          answer: String.raw`$p-1$ 個`,
          approach: String.raw`$3$ で割った余りごとに分けて数える。各剰余類の中で、表せる最小の数は $pk$（$k\in\{0,1,2\}$）で、**それ未満がすべて表せない**。`,
          blocks: [
            {
              k: "p",
              t: String.raw`余り $r\in\{0,1,2\}$ の類を考える。(1) より $pk_r\equiv r\pmod3$ となる $k_r\in\{0,1,2\}$ がただ1つある。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$N\ge pk_r$ かつ $N\equiv r$ なら、$N-pk_r$ が $0$ 以上の $3$ の倍数なので表せる`,
                String.raw`$N<pk_r$ かつ $N\equiv r$ なら、$k\le k_r$ でないと $N-pk<0$。しかも $k\equiv k_r\pmod 3$ が要るので $k=k_r$ しかなく、表せない`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって余り $r$ の類で表せないのは $r,\ r+3,\ \dots,\ pk_r-3$ の $\dfrac{pk_r-r}{3}$ 個。$k_r=0$ の類は $0$ 個。残り2つの類を足すと`,
            },
            {
              k: "math",
              t: String.raw`\frac{p-(p\bmod3)}{3}+\frac{2p-(2p\bmod3)}{3}=\frac{3p-3}{3}=p-1`,
            },
            {
              k: "note",
              title: "$p\\equiv1$ でも $p\\equiv2$ でも同じ",
              t: String.raw`$p\equiv1\pmod3$ なら余りは $1$ と $2$、$p\equiv2$ なら $2$ と $1$。足せばどちらも $3$ になるので、合計は $p-1$ で変わらない。`,
            },
          ],
          check: String.raw`$p=5$ なら表せないのは $1,2,4,7$ の $4=p-1$ 個。$p=7$ なら $1,2,4,5,8,11$ の $6$ 個。全探索の結果と一致する。`,
          pitfalls: [
            String.raw`$0$ は $m=k=0$ で表せる。$0$ 以上の整数を数えるので、ここを落とさない。`,
            String.raw`表せない最大の数は $2p-3$（$p=5$ なら $7$）。すべての類で $pk_r$ より下だけが表せないことを押さえると、個数が一気に出る。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "数列・対数",
      topics: ["ガウス記号", "区間ごとに同じ値", "等比数列の和", "シグマの計算"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{26}=42$ を定義どおりの和で確かめた",
          "$N=1,\\dots,8$ について $a_{3^{N}-1}$ を直接計算し、式 $\\frac{(2N-3)3^{N}+3}{2}$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{26}$ を求める`,
          answer: String.raw`$a_{26}=42$`,
          approach: String.raw`$[\log_3 k]$ は $k$ が $3$ のべきをまたぐところでしか変わらない。**値が同じ区間ごと**にまとめて数える。`,
          blocks: [
            { k: "p", t: String.raw`$[\log_3k]=j\iff3^{j}\le k<3^{j+1}$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$k=1,2$ … 値は $0$（$2$ 個）`,
                String.raw`$k=3,\dots,8$ … 値は $1$（$6$ 個）`,
                String.raw`$k=9,\dots,26$ … 値は $2$（$18$ 個）`,
              ],
            },
            { k: "math", t: String.raw`a_{26}=0\cdot2+1\cdot6+2\cdot18=42` },
          ],
          pitfalls: [
            String.raw`$26=3^{3}-1$ なので、ちょうど値 $2$ の区間の右端で切れている。$k=27$ まで入れると値 $3$ が1つ加わってしまう。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$m=3^{N}-1$ のとき $a_m$ を $N$ で表す`,
          answer: String.raw`$a_m=\dfrac{(2N-3)\cdot3^{N}+3}{2}$`,
          approach: String.raw`(1) と同じ区切り方がそのまま使える。$m=3^{N}-1$ は区間の右端なので、$j=0$ から $N-1$ までがちょうど過不足なく入る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$[\log_3k]=j$ となる $k$ は $3^{j}$ 個から $3^{j+1}-1$ 個までの $3^{j+1}-3^{j}=2\cdot3^{j}$ 個。$k$ は $1$ から $3^{N}-1$ までなので $j=0,1,\dots,N-1$ がちょうど収まり`,
            },
            { k: "math", t: String.raw`a_m=\sum_{j=0}^{N-1}j\cdot2\cdot3^{j}=2\sum_{j=0}^{N-1}j\cdot3^{j}` },
            { k: "p", t: String.raw`$T=\displaystyle\sum_{j=0}^{N-1}j\cdot3^{j}$ とおき、$3T-T$ を作ると（等比数列の和に帰着する）` },
            {
              k: "math",
              t: String.raw`2T=(N-1)3^{N}-\sum_{j=1}^{N-1}3^{j}=(N-1)3^{N}-\frac{3^{N}-3}{2}`,
            },
            { k: "p", t: String.raw`よって $4T=(2N-3)3^{N}+3$ となり、$a_m=2T=\dfrac{(2N-3)3^{N}+3}{2}$。` },
          ],
          check: String.raw`$N=3$ とすると $m=26$ で、$\dfrac{3\cdot27+3}{2}=42$。(1) と一致する。$N=1$ なら $m=2$、$\dfrac{(-1)\cdot3+3}{2}=0$ で、$a_2=0$ とも合う。`,
          pitfalls: [
            String.raw`$\sum j x^{j}$ は $3T-T$ のずらし算で出す。公式を覚えていなくても作れる。`,
            String.raw`$j$ の範囲が $0$ から $N-1$ であることを確かめる。$m$ が区間の右端だから、ここがぴったり揃う。`,
          ],
        },
      ],
    },
    {
      no: 5,
      field: "確率",
      topics: ["最大値の分布", "期待値", "二項係数の恒等式", "ホッケースティック和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3,\\dots,40$ について $X$ の期待値を全組合せの列挙で計算し、$\\frac{3(n+1)}{4}$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$X$ の期待値を求める`,
          answer: String.raw`$E[X]=\dfrac{3(n+1)}{4}$`,
          approach: String.raw`$X=x$ となるのは「$x$ を引き、残り2枚を $x$ 未満から引く」とき。期待値の和に $x{}_{x-1}\mathrm{C}_2=3{}_x\mathrm{C}_3$ という**二項係数の書き換え**を使うと、和が一気にたたまれる。`,
          blocks: [
            { k: "p", t: String.raw`最大が $x$ になるのは、$x$ を含み、残り2枚が $1,\dots,x-1$ から選ばれるとき。よって` },
            { k: "math", t: String.raw`P(X=x)=\frac{\dbinom{x-1}{2}}{\dbinom{n}{3}}\qquad(x=3,4,\dots,n)` },
            { k: "p", t: String.raw`期待値の分子に現れる $x\dbinom{x-1}{2}$ は` },
            {
              k: "math",
              t: String.raw`x{}_{x-1}\mathrm{C}_2=x\cdot\frac{(x-1)(x-2)}{2}=3\cdot\frac{x(x-1)(x-2)}{6}=3{}_x\mathrm{C}_3`,
            },
            { k: "p", t: String.raw`$\displaystyle\sum_{x=3}^{n}{}_x\mathrm{C}_3={}_{n+1}\mathrm{C}_4$（二項係数の和の公式）だから` },
            {
              k: "math",
              t: String.raw`E[X]=\frac{3\dbinom{n+1}{4}}{\dbinom{n}{3}}=3\cdot\frac{\frac{(n+1)n(n-1)(n-2)}{24}}{\frac{n(n-1)(n-2)}{6}}=\frac{3(n+1)}{4}`,
            },
            {
              k: "note",
              title: "答えの形が自然なこと",
              t: String.raw`$n+1$ を $4$ 等分した $3$ 番目、という形。$n$ 枚から $3$ 枚引いたとき、引いた札は $1$ から $n+1$ までを $4$ つに均す位置に散らばる、と読める。`,
            },
          ],
          check: String.raw`$n=3$ なら引き方は1通りで $X=3$、式も $\dfrac{3\cdot4}{4}=3$。$n=4$ なら4通りで $\dfrac{3+4+4+4}{4}=\dfrac{15}{4}$、式も $\dfrac{3\cdot5}{4}=\dfrac{15}{4}$。`,
          pitfalls: [
            String.raw`$x$ の動く範囲は $3$ から $n$。$X$ は3枚の最大なので $2$ 以下にはならない。`,
            String.raw`$x\dbinom{x-1}{2}=3\dbinom{x}{3}$ に気づかないと、$\sum x^{3}$ などを展開することになって計算が重くなる。`,
          ],
        },
      ],
    },
  ],
};
