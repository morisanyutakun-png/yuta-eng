import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2022年度（令和4年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第1問は文系の第1問、第4問は文系の第5問とまったく同じ問題なので、
 * 解説もそちらと同じ内容を置いている。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第5問の図。y=cos³x と、最大の長方形（t=α）。 */
const C5 = (x: number) => Math.cos(x) ** 3;
/** cos t = 3t sin t の解。二分法で出す。 */
const ALPHA = (() => {
  let lo = 0.1;
  let hi = 1.5;
  const g = (t: number) => Math.cos(t) - 3 * t * Math.sin(t);
  for (let i = 0; i < 80; i += 1) {
    const m = (lo + hi) / 2;
    if (g(lo) * g(m) <= 0) hi = m;
    else lo = m;
  }
  return (lo + hi) / 2;
})();
const CA = C5(ALPHA);

export const kyodaiRikei2022: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
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
      field: "確率",
      topics: ["組合せ", "間隔の条件", "詰め直し", "約分"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=5$ から $12$ まで $ {}_{n}\\mathrm{C}_{3}$ 通りの組をすべて列挙して条件をみたす割合を分数のまま求めると、$\\frac{(n-3)(n-4)}{n(n-1)}$ と完全に一致した（$\\frac1{10},\\frac15,\\frac27,\\frac5{14},\\dots$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$1$ から $n$ までの札から $3$ 枚引き、小さい順に $X,Y,Z$ とするとき、$Y-X\ge2$ かつ $Z-Y\ge2$ となる確率を求める`,
          answer: String.raw`$\dfrac{(n-3)(n-4)}{n(n-1)}$`,
          approach: String.raw`「どの2つも隣り合わない」選び方を数える。選んだ数から順に $0,1,2$ を引いて詰め直すと、ふつうの3個の選び方と1対1に対応する。全体は $ {}_{n}\mathrm{C}_{3}$ なので、割り算は大半が約分で消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`条件は $X<Y<Z$ で $Y-X\ge2$、$Z-Y\ge2$、つまり「どの2つも隣り合わない」である。`,
            },
            { k: "p", t: String.raw`**詰め直す。** ` },
            {
              k: "math",
              t: String.raw`X'=X,\qquad Y'=Y-1,\qquad Z'=Z-2`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`Y'-X'=Y-X-1\ge1,\qquad Z'-Y'=Z-Y-1\ge1`,
            },
            {
              k: "p",
              t: String.raw`なので $1\le X'<Y'<Z'\le n-2$ である。逆に $1\le X'<Y'<Z'\le n-2$ を与えれば $X=X'$、$Y=Y'+1$、$Z=Z'+2$ がもとの条件をみたすので、両者は1対1に対応する。`,
            },
            {
              k: "p",
              t: String.raw`よって条件をみたす組は $ {}_{n-2}\mathrm{C}_{3}$ 通りで、全体は $ {}_{n}\mathrm{C}_{3}$ 通りだから`,
            },
            {
              k: "math",
              t: String.raw`P=\frac{{}_{n-2}\mathrm{C}_{3}}{{}_{n}\mathrm{C}_{3}}=\frac{\frac{(n-2)(n-3)(n-4)}{6}}{\frac{n(n-1)(n-2)}{6}}=\frac{(n-3)(n-4)}{n(n-1)}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n\ge5$ という条件は、$ {}_{n-2}\mathrm{C}_{3}$ が意味をもつ（$n-2\ge3$）ためのものである。$n=5$ では $\frac{2\cdot1}{5\cdot4}=\frac1{10}$ で、$\{1,3,5\}$ の1通りだけが条件をみたす。`,
            },
          ],
          pitfalls: [
            String.raw`$Y-X\ge2$ は「$1$ つ以上あいだを空ける」ということである。詰め直すときに引くのは $0,1,2$ で、$0,2,4$ ではない。`,
            String.raw`対応が1対1であること（逆向きも作れること）を書いておく。片側だけだと「数えすぎていない」ことが言えない。`,
            String.raw`約分で $(n-2)$ が消える。最後の形は $\frac{(n-3)(n-4)}{n(n-1)}$ である。`,
          ],
          check: String.raw`$n=5,\dots,12$ について $ {}_{n}\mathrm{C}_{3}$ 通りを全探索すると、条件をみたす割合は $\frac1{10},\frac15,\frac27,\frac5{14},\frac5{12},\frac7{15},\frac{28}{55},\frac6{11}$ で、$\frac{(n-3)(n-4)}{n(n-1)}$ と完全に一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["最大公約数", "多項式の割り算", "mod 6", "場合分け"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $1999$ まで $\\gcd\\left(n^{2}+2,\;n^{4}+2,\;n^{6}+2\\right)$ を直接計算すると、すべて $\\gcd\\left(n^{2}+2,6\\right)$ に等しく、$n$ を $6$ で割った余りが $0,1,2,3,4,5$ のとき順に $2,3,6,1,6,3$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$A_n=\gcd\left(n^{2}+2,\;n^{4}+2,\;n^{6}+2\right)$ を求める`,
          answer: String.raw`$A_n=\begin{cases}1&(n\equiv3)\\2&(n\equiv0)\\3&(n\equiv1,5)\\6&(n\equiv2,4)\end{cases}\pmod6$`,
          approach: String.raw`$n^{4}+2$ も $n^{6}+2$ も $n^{2}+2$ で割ってみると、余りがどちらも定数 $\pm6$ になる。だから $A_n$ は $6$ の約数で、しかも「$n^{2}+2$ と $6$ の最大公約数」そのものになる。あとは $n$ の偶奇と $3$ で割った余りで決まる。`,
          blocks: [
            { k: "p", t: String.raw`$m=n^{2}$ とおくと、多項式として` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
n^{4}+2&=\left(n^{2}+2\right)\left(n^{2}-2\right)+6\\[1mm]
n^{6}+2&=\left(n^{2}+2\right)\left(n^{4}-2n^{2}+4\right)-6
\end{aligned}`,
            },
            { k: "p", t: String.raw`である（$\left(n^{2}+2\right)\left(n^{4}-2n^{2}+4\right)=n^{6}+8$）。` },
            {
              k: "p",
              t: String.raw`**$A_n$ は $6$ の約数。** $d$ を $n^{2}+2$ と $n^{4}+2$ の公約数とすると、1本目より $d\mid6$ である。`,
            },
            {
              k: "p",
              t: String.raw`**逆も言える。** $d$ が $n^{2}+2$ と $6$ の公約数なら、上の2式より $d$ は $n^{4}+2$ も $n^{6}+2$ も割り切る。したがって`,
            },
            {
              k: "math",
              t: String.raw`A_n=\gcd\left(n^{2}+2,\;6\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$2$ と $3$ で割って調べる。** ` },
            {
              k: "steps",
              items: [
                String.raw`$2$：$n^{2}+2\equiv n^{2}\equiv n\pmod2$ なので、$2\mid n^{2}+2$ となるのは $n$ が偶数のとき。`,
                String.raw`$3$：$n^{2}\equiv0$ または $1\pmod3$ なので $n^{2}+2\equiv2$ または $0$。$3\mid n^{2}+2$ となるのは $n$ が $3$ の倍数**でない**とき。`,
              ],
            },
            { k: "p", t: String.raw`これを $n$ を $6$ で割った余りでまとめると` },
            {
              k: "math",
              t: String.raw`A_n=\begin{cases}2&(n\equiv0\pmod6)\\[1mm]3&(n\equiv1,5\pmod6)\\[1mm]6&(n\equiv2,4\pmod6)\\[1mm]1&(n\equiv3\pmod6)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,\dots,6$ では $A_n=3,6,1,6,3,2$ である。「$n$ が偶数なら $2$ が、$3$ の倍数でなければ $3$ が入る」と覚えておけばよい。`,
            },
          ],
          pitfalls: [
            String.raw`$A_n\mid6$ を示しただけでは終わらない。逆向き（$n^{2}+2$ と $6$ の公約数が3つすべてを割り切ること）を言って、はじめて $A_n=\gcd\left(n^{2}+2,6\right)$ になる。`,
            String.raw`$n^{6}+2$ のほうの余りは $-6$ である。符号が違っても「$6$ の約数」という結論は同じだが、割り算の式はきちんと書く。`,
            String.raw`$3\mid n^{2}+2$ になるのは $n$ が $3$ の倍数**でない**ときである。向きを取り違えやすい。`,
          ],
          check: String.raw`$n=1$ から $1999$ まで $\gcd\left(n^{2}+2,n^{4}+2,n^{6}+2\right)$ を直接計算すると、すべて $\gcd\left(n^{2}+2,6\right)$ に一致し、$n\bmod6=0,1,2,3,4,5$ でそれぞれ $2,3,6,1,6,3$ になった。`,
        },
      ],
    },
    {
      no: 4,
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
    {
      no: 5,
      field: "積分法・微分法",
      topics: ["cos³x の積分", "最大値の一意性", "不等式の証明", "因数分解"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$S=\\int_0^{\\pi/2}\\cos^{3}x\\,dx$ を $400$ 万点で数値積分すると $0.666666667$ となり、$\\frac23$ と一致した",
          "$f(t)=t\\cos^{3}t$ の最大を $200$ 万点で探すと $0.340797$（$t=0.547161$）で、そこで $\\cos t-3t\\sin t=0$、$\\frac{\\cos^{4}t}{3\\sin t}=0.340797$ となることを確かめた",
          "$\\frac{f(\\alpha)}{S}=0.511196<\\frac9{16}=0.5625$、$\\sin\\alpha=0.520265>\\frac12$、$\\alpha=0.547161>\\frac\\pi6=0.523599$、$\\frac{\\sqrt3}{2}-\\frac\\pi4=0.080627>0$ を確かめた",
          "$8u^{4}-16u^{2}-9u+8=(2u-1)\\left(4u^{3}+2u^{2}-7u-8\\right)$ を $u=0$ から $1$ まで $101$ 点で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$S$（$C:y=\cos^{3}x$、$x$ 軸、$y$ 軸で囲まれた図形の面積）を求める`,
          answer: String.raw`$S=\dfrac23$`,
          approach: String.raw`$\cos^{3}x=\cos x\left(1-\sin^{2}x\right)$ として $\sin x$ で置換するのが定石である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0\le x\le\dfrac\pi2$ で $\cos^{3}x\ge0$ だから`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{\frac\pi2}\cos^{3}x\,dx=\int_{0}^{\frac\pi2}\left(1-\sin^{2}x\right)\cos x\,dx`,
            },
            { k: "p", t: String.raw`である。$u=\sin x$ とおくと $du=\cos x\,dx$、$x:0\to\frac\pi2$ で $u:0\to1$ なので` },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{1}\left(1-u^{2}\right)du=\left[u-\frac{u^{3}}{3}\right]_{0}^{1}=\frac23`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\cos^{3}x$ は3倍角（$\cos3x=4\cos^{3}x-3\cos x$）を使って $\cos^{3}x=\frac{\cos3x+3\cos x}{4}$ としてもよい。どちらでも $\frac23$ になる。`,
          ],
          check: String.raw`$400$ 万点の数値積分で $0.666666667$ となり、$\frac23$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(t)=t\cos^{3}t$ が最大値をただ1つの $t=\alpha$ でとることを示し、$f(\alpha)=\dfrac{\cos^{4}\alpha}{3\sin\alpha}$ を示す`,
          answer: String.raw`$f'(t)=\cos^{2}t\left(\cos t-3t\sin t\right)$ で、$g(t)=\cos t-3t\sin t$ は狭義減少かつ符号が変わるので零点はただ1つ。そこで $\cos\alpha=3\alpha\sin\alpha$ を使う`,
          approach: String.raw`長方形 $\mathrm{OPQR}$ は縦 $\cos^{3}t$、横 $t$ なので $f(t)=t\cos^{3}t$ である。微分すると $\cos^{2}t$ がくくり出せて、残りの因子 $g(t)=\cos t-3t\sin t$ の符号だけを見ればよい。$g$ が狭義減少であることを示せば、零点の一意性が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}(t,0)$、$\mathrm{Q}\left(t,\cos^{3}t\right)$、$\mathrm{R}\left(0,\cos^{3}t\right)$ なので、長方形 $\mathrm{OPQR}$ の面積は`,
            },
            { k: "math", t: String.raw`f(t)=t\cos^{3}t\qquad\left(0<t<\frac\pi2\right)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**微分する。** ` },
            {
              k: "math",
              t: String.raw`f'(t)=\cos^{3}t+t\cdot3\cos^{2}t\left(-\sin t\right)=\cos^{2}t\left(\cos t-3t\sin t\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0<t<\dfrac\pi2$ では $\cos^{2}t>0$ なので、$f'$ の符号は $g(t)=\cos t-3t\sin t$ の符号で決まる。`,
            },
            { k: "p", t: String.raw`**$g$ は狭義減少。** ` },
            {
              k: "math",
              t: String.raw`g'(t)=-\sin t-3\sin t-3t\cos t=-4\sin t-3t\cos t<0\qquad\left(0<t<\frac\pi2\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\sin t>0$、$t>0$、$\cos t>0$）。また`,
            },
            {
              k: "math",
              t: String.raw`\lim_{t\to+0}g(t)=1>0,\qquad g\left(\frac\pi2\right)=-\frac{3\pi}{2}<0`,
            },
            {
              k: "p",
              t: String.raw`なので、中間値の定理と狭義単調性より $g(\alpha)=0$ となる $\alpha\in\left(0,\frac\pi2\right)$ がただ1つ存在する。$t<\alpha$ で $g>0$（$f$ は増加）、$t>\alpha$ で $g<0$（$f$ は減少）だから、$f$ は $t=\alpha$ でただ1つの最大値をとる。`,
            },
            { k: "p", t: String.raw`**値を書き直す。** $g(\alpha)=0$ より $\cos\alpha=3\alpha\sin\alpha$、すなわち` },
            {
              k: "math",
              t: String.raw`\alpha=\frac{\cos\alpha}{3\sin\alpha}`,
            },
            { k: "p", t: String.raw`である（$0<\alpha<\frac\pi2$ で $\sin\alpha>0$）。これを代入して` },
            {
              k: "math",
              t: String.raw`f(\alpha)=\alpha\cos^{3}\alpha=\frac{\cos\alpha}{3\sin\alpha}\cdot\cos^{3}\alpha=\frac{\cos^{4}\alpha}{3\sin\alpha}`,
            },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$C:y=\cos^{3}x$ と、面積が最大になる長方形 $\mathrm{OPQR}$（$t=\alpha=0.547$）。網かけが $S=\frac23$、長方形の面積が $f(\alpha)=0.341$。`,
                view: [-0.17, 1.75, -0.13, 1.15],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fillBetween", top: C5, bottom: () => 0, from: 0, to: Math.PI / 2 },
                  { k: "curve", f: C5, from: 0, to: Math.PI / 2 },
                  { k: "seg", a: [0, 0], b: [ALPHA, 0] },
                  { k: "seg", a: [ALPHA, 0], b: [ALPHA, CA] },
                  { k: "seg", a: [ALPHA, CA], b: [0, CA] },
                  { k: "seg", a: [0, CA], b: [0, 0] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [ALPHA, 0], label: "P", place: "below" },
                  { k: "dot", at: [ALPHA, CA], label: "Q", place: "above-right" },
                  { k: "dot", at: [0, CA], label: "R", place: "left" },
                  { k: "dot", at: [Math.PI / 2, 0], label: "π/2", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$f'$ から $\cos^{2}t$ をくくり出す。$\cos^{2}t>0$ なので符号には効かないが、くくり出さないと零点が見えにくい。`,
            String.raw`$g$ が**狭義**減少であることまで言えば、零点が1つしかないことが出る。中間値の定理だけでは「少なくとも1つ」しか言えない。`,
            String.raw`$t\to+0$ では $f(t)\to0$、$t\to\frac\pi2$ でも $f(t)\to0$ なので、最大は内部でとる。開区間なので端の値は比べなくてよい。`,
          ],
          check: String.raw`$f(t)=t\cos^{3}t$ の最大を $200$ 万点で探すと $0.340797$（$t=0.547161$）で、そこでの $\cos t-3t\sin t$ は $-7.8\times10^{-7}$（ほぼ $0$）、$\frac{\cos^{4}t}{3\sin t}=0.340797$ となり一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$\dfrac{f(\alpha)}{S}<\dfrac9{16}$ を示す`,
          answer: String.raw`$\sin\alpha>\dfrac12$（すなわち $\alpha>\dfrac\pi6$）を示せばよく、それは $g\left(\dfrac\pi6\right)=\dfrac{\sqrt3}{2}-\dfrac\pi4>0$（$2\sqrt3>\pi$）から従う`,
          approach: String.raw`$\dfrac{f(\alpha)}{S}<\dfrac9{16}$ を $\sin\alpha$ だけの不等式に直す。$\cos^{4}\alpha=\left(1-\sin^{2}\alpha\right)^{2}$ とすれば $u=\sin\alpha$ の4次不等式になり、$u=\dfrac12$ が境目だと分かる。あとは $\alpha>\dfrac\pi6$ を $g$ の単調性で示せばよい。`,
          blocks: [
            { k: "p", t: String.raw`(1)(2) より` },
            {
              k: "math",
              t: String.raw`\frac{f(\alpha)}{S}=\frac{\cos^{4}\alpha}{3\sin\alpha}\cdot\frac32=\frac{\cos^{4}\alpha}{2\sin\alpha}`,
            },
            { k: "p", t: String.raw`である。$\sin\alpha>0$ だから、示すべき不等式は` },
            {
              k: "math",
              t: String.raw`\frac{\cos^{4}\alpha}{2\sin\alpha}<\frac9{16}\quad\Longleftrightarrow\quad8\cos^{4}\alpha<9\sin\alpha`,
            },
            { k: "p", t: String.raw`である。$u=\sin\alpha\in(0,1)$ とおくと $\cos^{4}\alpha=\left(1-u^{2}\right)^{2}$ なので` },
            {
              k: "math",
              t: String.raw`h(u)=8\left(1-u^{2}\right)^{2}-9u=8u^{4}-16u^{2}-9u+8<0`,
            },
            { k: "p", t: String.raw`を示せばよい。$h\left(\dfrac12\right)=\dfrac12-4-\dfrac92+8=0$ なので $2u-1$ で割り切れて` },
            {
              k: "math",
              t: String.raw`h(u)=(2u-1)\left(4u^{3}+2u^{2}-7u-8\right)`,
            },
            { k: "p", t: String.raw`である。$0<u<1$ では` },
            {
              k: "math",
              t: String.raw`4u^{3}+2u^{2}-7u-8<4+2-0-8=-2<0`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`h(u)<0\quad\Longleftrightarrow\quad2u-1>0\quad\Longleftrightarrow\quad\sin\alpha>\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。$0<\alpha<\dfrac\pi2$ だから、これは $\alpha>\dfrac\pi6$ と同値である。`,
            },
            {
              k: "p",
              t: String.raw`**$\alpha>\dfrac\pi6$ を示す。** (2) の $g(t)=\cos t-3t\sin t$ は狭義減少で $g(\alpha)=0$ だから、$g\left(\dfrac\pi6\right)>0$ を言えばよい。`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac\pi6\right)=\cos\frac\pi6-3\cdot\frac\pi6\cdot\sin\frac\pi6=\frac{\sqrt3}{2}-\frac\pi4`,
            },
            {
              k: "p",
              t: String.raw`で、$\dfrac{\sqrt3}{2}>\dfrac\pi4$ は $2\sqrt3>\pi$ と同値である。$\left(2\sqrt3\right)^{2}=12$、$\pi<3.15$ より $\pi^{2}<9.93<12$ なので $2\sqrt3>\pi$ である。よって $g\left(\dfrac\pi6\right)>0$、したがって $\alpha>\dfrac\pi6$ である。`,
            },
            { k: "p", t: String.raw`以上より` },
            { k: "math", t: String.raw`\frac{f(\alpha)}{S}<\frac9{16}` },
            { k: "p", t: String.raw`が示された。` },
            {
              k: "note",
              t: String.raw`実際には $\alpha=0.5472$、$\frac{f(\alpha)}{S}=0.5112$ で、$\frac9{16}=0.5625$ よりかなり小さい。$u=\frac12$（$\alpha=\frac\pi6$）がちょうど等号になるように $\frac9{16}$ が選ばれている。`,
            },
          ],
          pitfalls: [
            String.raw`$\frac9{16}$ という数は $u=\frac12$ で $h(u)=0$ になるように作られている。$h\left(\frac12\right)=0$ に気づけば因数分解の方針が立つ。`,
            String.raw`$\alpha$ の値そのものは求まらない。$g$ の単調性を使って「$\frac\pi6$ より大きい」とだけ言うのが要点である。`,
            String.raw`$2\sqrt3>\pi$ は平方して比べる。$\pi<3.15$ などの粗い評価で十分である。`,
          ],
          check: String.raw`$\alpha=0.547161$、$\sin\alpha=0.520265>\frac12$、$\frac\pi6=0.523599<\alpha$ である。$\frac{f(\alpha)}{S}=0.511196<0.5625$。$\frac{\sqrt3}{2}-\frac\pi4=0.080627>0$ も確かめた。`,
        },
      ],
    },
    {
      no: 6,
      field: "数列",
      topics: ["漸化式", "周期性", "階差", "数学的帰納法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式から $x_n$ を数値計算すると $0,3,7,9,15,22,27,36,46,54,66,79,\\dots$ となり、$x_n-y_n$ が $0,1,3,6,10,15,21,28,36,45,55,66$、すなわち $\\frac{n(n-1)}{2}$ と $n\\le14$ まで一致することを確かめた",
          "$x_n$ を $3$ で割った余りが $0,0,1,0,0,1,\\dots$（$3\\mid n$ のときだけ $1$）になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$x_1=0$、$x_{n+1}=x_n+n+2\cos\dfrac{2\pi x_n}{3}$ と、$y_{3m+1}=3m$、$y_{3m+2}=3m+2$、$y_{3m+3}=3m+4$ で定まる数列について、$\{x_n-y_n\}$ の一般項を求める`,
          answer: String.raw`$x_n-y_n=\dfrac{n(n-1)}{2}$`,
          approach: String.raw`$\cos\dfrac{2\pi x_n}{3}$ は $x_n$ を $3$ で割った余りだけで決まる。そこで「$x_n-y_n=\frac{n(n-1)}{2}$」を帰納法の仮定にすると、$x_n$ の余りが $n$ の余りから決まり、漸化式の形が確定する。$y$ の側の階差も $n$ の余りで決まるので、差の階差がきれいに $n$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z_n=x_n-y_n$ とおき、$z_n=\dfrac{n(n-1)}{2}$ を $n$ についての帰納法で示す。`,
            },
            { k: "p", t: String.raw`**$n=1$。** $x_1=0$、$y_1=0$（$m=0$）なので $z_1=0=\dfrac{1\cdot0}{2}$ ✓。` },
            {
              k: "p",
              t: String.raw`**$x_n$ を $3$ で割った余り。** $z_n=\dfrac{n(n-1)}{2}$ を仮定すると $x_n=y_n+\dfrac{n(n-1)}{2}$ である。$n=3m+1,3m+2,3m+3$ の場合に分けて $3$ を法として計算すると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=3m+1$：$y_n=3m\equiv0$、$\dfrac{n(n-1)}{2}=\dfrac{3m(3m+1)}{2}=3\cdot\dfrac{m(3m+1)}{2}\equiv0$。よって $x_n\equiv0$。`,
                String.raw`$n=3m+2$：$y_n=3m+2\equiv2$、$\dfrac{(3m+2)(3m+1)}{2}=\dfrac{9m(m+1)}{2}+1\equiv1$。よって $x_n\equiv0$。`,
                String.raw`$n=3m+3$：$y_n=3m+4\equiv1$、$\dfrac{3(m+1)(3m+2)}{2}=3\cdot\dfrac{(m+1)(3m+2)}{2}\equiv0$。よって $x_n\equiv1$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`（いずれも $m(3m+1)$、$m(m+1)$、$(m+1)(3m+2)$ が偶数なので、割り算のあとも整数で $3$ の因子が残る。）つまり`,
            },
            {
              k: "math",
              t: String.raw`x_n\equiv\begin{cases}0\pmod3&(3\nmid n)\\[1mm]1\pmod3&(3\mid n)\end{cases}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`2\cos\frac{2\pi x_n}{3}=\begin{cases}2\cdot1=2&(3\nmid n)\\[1mm]2\cdot\left(-\dfrac12\right)=-1&(3\mid n)\end{cases}`,
            },
            { k: "p", t: String.raw`で、$x$ の階差は` },
            {
              k: "math",
              t: String.raw`x_{n+1}-x_n=\begin{cases}n+2&(3\nmid n)\\[1mm]n-1&(3\mid n)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$y$ の階差。** 定義から $y_{3m+1}=3m$、$y_{3m+2}=3m+2$、$y_{3m+3}=3m+4$、$y_{3m+4}=3(m+1)=3m+3$ なので`,
            },
            {
              k: "math",
              t: String.raw`y_{n+1}-y_n=\begin{cases}2&(n\equiv1,2\pmod3)\\[1mm]-1&(n\equiv0\pmod3)\end{cases}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**差の階差。** 2つを引くと、どちらの場合も` },
            {
              k: "math",
              t: String.raw`z_{n+1}-z_n=\begin{cases}(n+2)-2=n&(3\nmid n)\\[1mm](n-1)-(-1)=n&(3\mid n)\end{cases}`,
            },
            { k: "p", t: String.raw`となり、場合によらず $z_{n+1}-z_n=n$ である。よって` },
            {
              k: "math",
              t: String.raw`z_{n+1}=\frac{n(n-1)}{2}+n=\frac{n(n+1)}{2}`,
            },
            { k: "p", t: String.raw`で、$n+1$ のときも成り立つ。帰納法により、すべての $n\ge1$ で` },
            { k: "math", t: String.raw`x_n-y_n=\frac{n(n-1)}{2}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`実際に並べると $x_n$ は $0,3,7,9,15,22,27,36,46,54,66,\dots$、$y_n$ は $0,2,4,3,5,7,6,8,10,9,11,\dots$ で、差は $0,1,3,6,10,15,21,28,36,45,55,\dots$ と三角数になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos\frac{2\pi x_n}{3}$ は $x_n$ が整数のとき、$x_n$ を $3$ で割った余りだけで決まる（余り $0$ で $1$、$1$ と $2$ で $-\frac12$）。まず $x_n$ が整数であることを押さえる。`,
            String.raw`$x_n$ の余りを「$n$ の余り」から出すには、$z_n$ の形を仮定するのがいちばん早い。余りの規則を別に帰納法で示してもよいが、二度手間になる。`,
            String.raw`$y$ の階差は $n\equiv0\pmod3$ のところだけ $-1$ と**減る**。$y$ は単調増加ではない。`,
            String.raw`$z_{n+1}-z_n=n$ が場合によらないことが、この問題の仕掛けである。$x$ と $y$ の「ずれ方」がちょうど打ち消し合う。`,
          ],
          check: String.raw`漸化式から $x_n$ を数値計算すると $0,3,7,9,15,22,27,36,46,54,66,79$ となり、$x_n-y_n$ は $0,1,3,6,10,15,21,28,36,45,55,66$ で $\frac{n(n-1)}{2}$ と一致する（$n\le14$ まで確認）。$x_n$ を $3$ で割った余りも $0,0,1,0,0,1,\dots$ と、$3\mid n$ のときだけ $1$ になっている。`,
        },
      ],
    },
  ],
};
