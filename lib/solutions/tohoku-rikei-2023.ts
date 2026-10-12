import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2023年度（令和5年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第2問の図。$f(x)=\sin3x+\sin x=2\sin2x\cos x$。 */
const F2W = (x: number): number => Math.sin(3 * x) + Math.sin(x);

/** 第4問の図。1の5乗根。 */
const RT5W = (k: number): [number, number] => [
  Math.cos((2 * Math.PI * k) / 5),
  Math.sin((2 * Math.PI * k) / 5),
];

/** 第6問の図。$f(x)=-\tfrac x2-\tfrac{4}{6x+1}$ と、線分 PQ の通過領域 S。 */
const F6W = (x: number): number => -x / 2 - 4 / (6 * x + 1);
/** $g(x)=f(x)-x$。$x=\tfrac12$ で最大、$g(0)=-4$、$g\left(\tfrac12\right)=-\tfrac74$、$g(2)=-\tfrac{43}{13}$。 */
const G6W = (x: number): number => F6W(x) - x;
/** $S$ の下の境界と上の境界（$0\leqq X\leqq3$）。 */
const LOW6W = (X: number): number => {
  if (X <= 1) return X - 4;
  if (X <= 7 / 6) return F6W(X - 1) + 1;
  if (X <= 2) return F6W(X);
  return X - 43 / 13;
};
const UP6W = (X: number): number => {
  if (X <= 0.5) return F6W(X);
  if (X <= 1.5) return X - 7 / 4;
  return F6W(X - 1) + 1;
};
const S6W: [number, number][] = [
  ...Array.from({ length: 121 }, (_, i): [number, number] => {
    const X = (3 * i) / 120;
    return [X, LOW6W(X)];
  }),
  ...Array.from({ length: 121 }, (_, i): [number, number] => {
    const X = 3 - (3 * i) / 120;
    return [X, UP6W(X)];
  }),
];

export const tohokuRikei2023: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "確率",
      topics: ["非復元抽出", "色の並びで数える", "順番に依存する勝敗", "余事象"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "赤4・白5の並び $ {}_9\\mathrm{C}_4=126$ 通りを全列挙して勝敗を判定すると、引き分け1通り、A の勝ち76通り、B の勝ち49通りだった",
          "$\\dfrac{1}{126}+\\dfrac{76}{126}+\\dfrac{49}{126}=1$ で、$\\dfrac{76}{126}=\\dfrac{38}{63}$、$\\dfrac{49}{126}=\\dfrac{7}{18}$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`赤玉4個と白玉5個の袋から、$\mathrm{A}$ と $\mathrm{B}$ が $\mathrm{A}$ から交互に1個ずつ取り出す（戻さない）。$\mathrm{A}$ が赤を取り出したら $\mathrm{A}$ の勝ち、$\mathrm{B}$ が白を取り出したら $\mathrm{B}$ の勝ちでそこで終了し、玉がなくなったら引き分けとするとき、引き分けとなる確率を求める`,
          answer: String.raw`$\dfrac{1}{126}$`,
          approach: String.raw`9個を全部取り出す順番を「色の並び」と見る。同じ色の玉は区別しないことにすると、並びは $ {}_9\mathrm{C}_4=126$ 通りで、どれも同様に確からしい。引き分けになる並びはたった1つしかない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**色の並びで考える。** 9個すべてを取り出す順番を考え、赤がどの位置に来るかで色の並びを決める。赤の位置の選び方は`,
            },
            { k: "math", t: String.raw`{}_9\mathrm{C}_4=126\ \text{通り}` },
            {
              k: "p",
              t: String.raw`で、どれも同様に確からしい（玉を区別して $9!$ 通りと数えても、同じ色の並びを与えるものは $4!\,5!$ 通りずつで等しい）。ゲームは途中で終わることもあるが、「その先も全部取り出したとしたらどういう並びか」で数えれば、各並びがちょうど1つの結果に対応する。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ は1,3,5,7,9番目、$\mathrm{B}$ は2,4,6,8番目を引く。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{A}$ の手番で赤が出たらそこで $\mathrm{A}$ の勝ち`,
                String.raw`$\mathrm{B}$ の手番で白が出たらそこで $\mathrm{B}$ の勝ち`,
              ],
            },
            {
              k: "p",
              t: String.raw`**引き分け。** 最後まで誰も勝たないのは、奇数番目がすべて白、偶数番目がすべて赤のときである。奇数番目は5か所、偶数番目は4か所で、白が5個・赤が4個だからちょうど過不足なく配れる。そのような並びは`,
            },
            { k: "math", t: String.raw`\text{白赤白赤白赤白赤白}` },
            { k: "p", t: String.raw`の1通りだけである。よって引き分けの確率は` },
            { k: "math", t: String.raw`\frac{1}{126}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`途中で終わるゲームでも「9個全部の並び」で数えてよい。終わったあとの並びを勝手に決めても、結果は変わらないからである。`,
            String.raw`白が5個・赤が4個と、奇数番目5か所・偶数番目4か所がぴったり合う。ここが「1通りだけ」になる理由である。`,
          ],
          check: String.raw`126通りを全列挙して勝敗を判定すると、引き分けはちょうど1通りだった。`,
        },
        {
          label: "(2)",
          task: String.raw`このゲームに $\mathrm{A}$ が勝つ確率を求める`,
          answer: String.raw`$\dfrac{38}{63}$`,
          approach: String.raw`$\mathrm{A}$ が $j$ 回目の手番で勝つ並びを数える。それまでの $2j-2$ 個の色は「奇数番目は白・偶数番目は赤」と完全に決まり、$2j-1$ 番目が赤、残りは自由なので、組合せ1つで数えられる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ が $j$ 回目の手番（$2j-1$ 番目）で勝つのは、次のときである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$1,3,\dots,2j-3$ 番目（$j-1$ か所）がすべて白`,
                String.raw`$2,4,\dots,2j-2$ 番目（$j-1$ か所）がすべて赤`,
                String.raw`$2j-1$ 番目が赤`,
                String.raw`それ以降は何でもよい`,
              ],
            },
            {
              k: "p",
              t: String.raw`このとき赤は $j$ 個、白は $j-1$ 個が使われ、残り $9-(2j-1)=10-2j$ か所に赤 $4-j$ 個と白 $5-(j-1)=6-j$ 個を並べる。並べ方は $ {}_{10-2j}\mathrm{C}_{4-j}$ 通りである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$j=1$：$ {}_{8}\mathrm{C}_{3}=56$`,
                String.raw`$j=2$：$ {}_{6}\mathrm{C}_{2}=15$`,
                String.raw`$j=3$：$ {}_{4}\mathrm{C}_{1}=4$`,
                String.raw`$j=4$：$ {}_{2}\mathrm{C}_{0}=1$`,
                String.raw`$j=5$：赤は4個しかなく、$2,4,6,8$ 番目で使い切るので $9$ 番目を赤にできない。$0$ 通り`,
              ],
            },
            { k: "p", t: String.raw`合計すると $56+15+4+1=76$ 通りなので、求める確率は` },
            {
              k: "math",
              t: String.raw`\frac{76}{126}=\frac{38}{63}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`同じ数え方で $\mathrm{B}$ が勝つのは $35+10+3+1=49$ 通りである。$76+49+1=126$ でちょうど尽きるので、よい検算になる。確率で書くと $\mathrm{A}$ が $\tfrac{38}{63}$、$\mathrm{B}$ が $\tfrac{7}{18}$、引き分けが $\tfrac1{126}$ で、先手の $\mathrm{A}$ が有利である。`,
            },
          ],
          pitfalls: [
            String.raw`$j=5$（$\mathrm{A}$ が9番目で勝つ）は赤の個数が足りず起こらない。機械的に $j=1,\dots,5$ と書き下すときに見落とさない。`,
            String.raw`「それ以降は何でもよい」の部分も数に入れる。勝敗が決まった時点で止まるが、並びとしては最後まで決めて数えている。`,
          ],
          check: String.raw`126通りの全列挙で $\mathrm{A}$ の勝ちは76通り、$\tfrac{76}{126}=\tfrac{38}{63}$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "三角関数・極限",
      topics: ["和積の公式", "方程式の解の集合", "ガウス記号", "はさみうち"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f\\left(\\tfrac{k\\pi}{2}\\right)=0$ が $k=1,\\dots,40$ で成り立ち、それ以外に零点がないことを $0<x\\leqq20$ の符号変化と $2\\sin2x\\cos x$ の因数分解で確かめた",
          "$p(m)=\\left[\\tfrac{2m}{\\pi}\\right]$ として $m=10,10^{2},10^{3},10^{5}$ で $\\tfrac{p(m)}{m}=0.600,\\ 0.630,\\ 0.636,\\ 0.63661$ となり $\\tfrac2\\pi=0.6366198$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=\sin3x+\sin x$ について、$f(x)=0$ を満たす正の実数 $x$ のうち最小のものを求める`,
          answer: String.raw`$x=\dfrac{\pi}{2}$`,
          approach: String.raw`和積の公式で積の形にする。$\sin A+\sin B=2\sin\dfrac{A+B}{2}\cos\dfrac{A-B}{2}$ を使えば $2\sin2x\cos x$ になり、零点がすぐ読める。`,
          blocks: [
            { k: "p", t: String.raw`和積の公式から` },
            {
              k: "math",
              t: String.raw`f(x)=\sin3x+\sin x=2\sin\frac{3x+x}{2}\cos\frac{3x-x}{2}=2\sin2x\cos x`,
            },
            { k: "p", t: String.raw`である。よって $f(x)=0$ は` },
            { k: "math", t: String.raw`\sin2x=0\quad\text{または}\quad\cos x=0` },
            { k: "p", t: String.raw`と同値である。それぞれの解は、整数 $k$ を使って` },
            {
              k: "steps",
              items: [
                String.raw`$\sin2x=0$：$2x=k\pi$、つまり $x=\dfrac{k\pi}{2}$`,
                String.raw`$\cos x=0$：$x=\dfrac{\pi}{2}+k\pi=\dfrac{\left(2k+1\right)\pi}{2}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。後者は前者（$k$ が奇数の場合）に含まれるので、$f(x)=0$ の解全体は`,
            },
            { k: "math", t: String.raw`x=\frac{k\pi}{2}\qquad\left(k\ \text{は整数}\right)` },
            { k: "p", t: String.raw`である。正で最小のものは $k=1$ のときの` },
            { k: "math", t: String.raw`x=\frac{\pi}{2}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) = sin3x + sin x = 2 sin2x cos x。零点は x = kπ/2 で、π/2, 3π/2 などでは接するように 0 になる（符号が変わらない）。",
                view: [-0.4, 7.1, -2.3, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: F2W, from: -0.4, to: 7.1 },
                  { k: "dot", at: [Math.PI / 2, 0], label: "π/2", place: "below" },
                  { k: "dot", at: [Math.PI, 0], label: "π", place: "above-right" },
                  { k: "dot", at: [(3 * Math.PI) / 2, 0], label: "3π/2", place: "above" },
                  { k: "dot", at: [2 * Math.PI, 0], label: "2π", place: "below-right" },
                  { k: "text", at: [7.0, 1.9], label: "y = f(x)", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\cos x=0$ の解は $\sin2x=0$ の解に含まれる。2つの解集合を足して重複を残さない。`,
            String.raw`$x=\tfrac\pi2$ は $\sin2x$ と $\cos x$ が同時に $0$ になる点で、グラフは $x$ 軸に接する。符号変化だけで零点を探すと見落とす。`,
          ],
          check: String.raw`$f\left(\tfrac\pi2\right)=\sin\tfrac{3\pi}{2}+\sin\tfrac\pi2=-1+1=0$ である。$0<x<\tfrac\pi2$ では $\sin2x>0$、$\cos x>0$ なので $f>0$ で、零点はない。`,
        },
        {
          label: "(2)",
          task: String.raw`正の整数 $m$ に対し、$f(x)=0$ を満たす正の実数 $x$ のうち $m$ 以下のものの個数を $p(m)$ とするとき、$\displaystyle\lim_{m\to\infty}\frac{p(m)}{m}$ を求める`,
          answer: String.raw`$\dfrac{2}{\pi}$`,
          approach: String.raw`(1) より解は $\tfrac\pi2$ 間隔で等間隔に並ぶ。個数はガウス記号で書けるので、$\left[t\right]\leqq t<\left[t\right]+1$ ではさめば極限が出る。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $f(x)=0$ の正の解は` },
            {
              k: "math",
              t: String.raw`\frac{\pi}{2},\ \pi,\ \frac{3\pi}{2},\ 2\pi,\ \dots`,
            },
            { k: "p", t: String.raw`と $\tfrac\pi2$ 間隔で並ぶ。$\dfrac{k\pi}{2}\leqq m$ は $k\leqq\dfrac{2m}{\pi}$ と同値なので` },
            {
              k: "math",
              t: String.raw`p(m)=\left[\frac{2m}{\pi}\right]`,
            },
            { k: "p", t: String.raw`である（$\left[\ \right]$ はガウス記号）。ガウス記号の定義から` },
            {
              k: "math",
              t: String.raw`\frac{2m}{\pi}-1<p(m)\leqq\frac{2m}{\pi}`,
            },
            { k: "p", t: String.raw`であり、$m>0$ で割って` },
            {
              k: "math",
              t: String.raw`\frac{2}{\pi}-\frac{1}{m}<\frac{p(m)}{m}\leqq\frac{2}{\pi}`,
            },
            { k: "p", t: String.raw`となる。$m\to\infty$ で両端とも $\dfrac2\pi$ に収束するから、はさみうちの原理より` },
            {
              k: "math",
              t: String.raw`\lim_{m\to\infty}\frac{p(m)}{m}=\frac{2}{\pi}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac2\pi=0.6366\cdots$ である。$m=10^{5}$ では $p(m)=63661$ で $\dfrac{p(m)}{m}=0.63661$ と、確かに近づいている。`,
            },
          ],
          pitfalls: [
            String.raw`「解が等間隔に並ぶ」ことを (1) で確定させておく。$\cos x=0$ の解が別にあると思うと間隔を取り違える。`,
            String.raw`$\left[t\right]>t-1$ の側の不等号は強い不等号。はさみうちには $\leqq$ と $<$ が混ざっていてよい。`,
          ],
          check: String.raw`$m=1000$ で $p(m)=636$、$\tfrac{p(m)}{m}=0.636$ で、$\tfrac2\pi=0.63662$ に近い。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列",
      topics: ["係数が n の漸化式", "階差への帰着", "部分分数分解", "和が 0 になる条件"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$s=3,-\\tfrac12,0,\\tfrac73$ で漸化式を分数のまま8項まで回し、$a_{n}=1+\\dfrac{2(s-1)}{n(n+1)}$ と完全に一致した",
          "$m=1$ から $7$ まで $s=\\dfrac{1-m}{2}$ とすると $\\sum_{n=1}^{m}a_{n}$ がちょうど $0$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{1}=s$、$\left(n+2\right)a_{n+1}=na_{n}+2$ で定まる数列について、$a_{n}$ を $n$ と $s$ で表す`,
          answer: String.raw`$a_{n}=1+\dfrac{2\left(s-1\right)}{n\left(n+1\right)}$`,
          approach: String.raw`係数に $n$ が入っているので、両辺に $n+1$ を掛けて $b_{n}=n\left(n+1\right)a_{n}$ とおくと、階差型 $b_{n+1}=b_{n}+2\left(n+1\right)$ になる。`,
          blocks: [
            { k: "p", t: String.raw`与式の両辺に $n+1$ を掛けると` },
            {
              k: "math",
              t: String.raw`\left(n+1\right)\left(n+2\right)a_{n+1}=n\left(n+1\right)a_{n}+2\left(n+1\right)`,
            },
            { k: "p", t: String.raw`である。$b_{n}=n\left(n+1\right)a_{n}$ とおくと左辺は $b_{n+1}$ だから` },
            { k: "math", t: String.raw`b_{n+1}=b_{n}+2\left(n+1\right)` },
            { k: "p", t: String.raw`となる。$b_{1}=1\cdot2\cdot a_{1}=2s$ なので、$n\geqq2$ では` },
            {
              k: "math",
              t: String.raw`b_{n}=b_{1}+\sum_{k=1}^{n-1}2\left(k+1\right)=2s+2\left\{\frac{n\left(n+1\right)}{2}-1\right\}=2s-2+n\left(n+1\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\sum_{k=1}^{n-1}\left(k+1\right)=2+3+\cdots+n=\tfrac{n(n+1)}{2}-1$）。これは $n=1$ でも $b_{1}=2s$ と合う。よって`,
            },
            {
              k: "math",
              t: String.raw`a_{n}=\frac{b_{n}}{n\left(n+1\right)}=1+\frac{2\left(s-1\right)}{n\left(n+1\right)}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$s=1$ なら $a_{n}=1$（定数列）になる。実際 $a_{n}=1$ は $\left(n+2\right)\cdot1=n\cdot1+2$ をみたす。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(n+2\right)a_{n+1}=na_{n}+2$ のままでは等比にも階差にもならない。$n+1$ を掛けて $n\left(n+1\right)a_{n}$ の形を作る。`,
            String.raw`$\sum_{k=1}^{n-1}2\left(k+1\right)$ の添字をていねいに。$k+1$ は $2$ から $n$ まで動く。`,
          ],
          check: String.raw`$s=\tfrac73$ では $a_{1},\dots,a_{4}=\tfrac73,\tfrac{13}{9},\tfrac{11}{9},\tfrac{17}{15}$ で、式の値と完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`ある正の整数 $m$ に対して $\displaystyle\sum_{n=1}^{m}a_{n}=0$ が成り立つとき、$s$ を $m$ で表す`,
          answer: String.raw`$s=\dfrac{1-m}{2}$`,
          approach: String.raw`(1) の式の $\dfrac{1}{n(n+1)}$ を部分分数に分けると和が望遠鏡のように縮む。あとは $s$ について解くだけ。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{m}a_{n}=m+2\left(s-1\right)\sum_{n=1}^{m}\frac{1}{n\left(n+1\right)}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{1}{n\left(n+1\right)}=\dfrac1n-\dfrac1{n+1}$ なので` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{m}\frac{1}{n\left(n+1\right)}=1-\frac{1}{m+1}=\frac{m}{m+1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{m}a_{n}=m+\frac{2\left(s-1\right)m}{m+1}=m\left\{1+\frac{2\left(s-1\right)}{m+1}\right\}`,
            },
            { k: "p", t: String.raw`である。これが $0$ になるのは、$m\geqq1$ より` },
            {
              k: "math",
              t: String.raw`1+\frac{2\left(s-1\right)}{m+1}=0,\qquad2\left(s-1\right)=-\left(m+1\right)`,
            },
            { k: "p", t: String.raw`のときである。$s$ について解いて` },
            {
              k: "math",
              t: String.raw`s=1-\frac{m+1}{2}=\frac{1-m}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$m=1$ なら $s=0$ で、$a_{1}=0$ だから確かに和は $0$。$m=2$ なら $s=-\tfrac12$ で $a_{1}=-\tfrac12$、$a_{2}=\tfrac12$ と打ち消し合う。`,
            },
          ],
          pitfalls: [
            String.raw`$m$ でくくってから $m\neq0$ を使う。$m$ は正の整数なので割ってよい。`,
          ],
          check: String.raw`$m=1$ から $7$ まで $s=\tfrac{1-m}{2}$ として漸化式を回すと、和はいずれもちょうど $0$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面",
      topics: ["1の5乗根", "因数分解", "極形式", "周期性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x^{4}+x^{3}+x^{2}+x+1$ を $x^{2}-ax+1$（$a=\\tfrac{\\sqrt5-1}{2}$）で割ると商が $x^{2}+1.618033989x+1$、余りが $0$ になった",
          "$\\alpha=\\cos72^{\\circ}+i\\sin72^{\\circ}$ が $\\alpha^{2}-a\\alpha+1=0$ をみたした",
          "$\\alpha^{2023}+\\alpha^{-2023}=-1.6180339888$ で、$-\\dfrac{1+\\sqrt5}{2}=-1.618033989$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a=\dfrac{\sqrt{5}-1}{2}$、$f(x)=x^{2}-ax+1$ とするとき、$x^{4}+x^{3}+x^{2}+x+1$ が $f(x)$ で割り切れることを示す`,
          answer: String.raw`$x^{4}+x^{3}+x^{2}+x+1=\left(x^{2}-ax+1\right)\left(x^{2}-bx+1\right)$、$b=-\dfrac{1+\sqrt5}{2}$`,
          approach: String.raw`$x^{4}+x^{3}+x^{2}+x+1$ は係数が左右対称（相反式）なので、$x^{2}-px+1$ の形2つの積に分かれる。係数比較で $p$ の2次方程式を作ると、その解の一方が $a$ になる。`,
          blocks: [
            { k: "p", t: String.raw`実数 $b$ を使って $\left(x^{2}-ax+1\right)\left(x^{2}-bx+1\right)$ と書けないか調べる。展開すると` },
            {
              k: "math",
              t: String.raw`\left(x^{2}-ax+1\right)\left(x^{2}-bx+1\right)=x^{4}-\left(a+b\right)x^{3}+\left(2+ab\right)x^{2}-\left(a+b\right)x+1`,
            },
            { k: "p", t: String.raw`である。これが $x^{4}+x^{3}+x^{2}+x+1$ に一致する条件は` },
            {
              k: "math",
              t: String.raw`a+b=-1,\qquad2+ab=1\ \left(\text{すなわち}\ ab=-1\right)`,
            },
            { k: "p", t: String.raw`である。したがって $a,b$ は2次方程式` },
            { k: "math", t: String.raw`t^{2}+t-1=0` },
            { k: "p", t: String.raw`の2解である。この解は` },
            {
              k: "math",
              t: String.raw`t=\frac{-1\pm\sqrt{5}}{2}`,
            },
            {
              k: "p",
              t: String.raw`で、一方が $\dfrac{\sqrt5-1}{2}=a$ である。$b=\dfrac{-1-\sqrt5}{2}$ とおけば $a+b=-1$、$ab=\dfrac{\left(\sqrt5-1\right)\left(-1-\sqrt5\right)}{4}=\dfrac{-\sqrt5-5+1+\sqrt5}{4}=-1$ が確かに成り立つ。よって`,
            },
            {
              k: "math",
              t: String.raw`x^{4}+x^{3}+x^{2}+x+1=\left(x^{2}-ax+1\right)\left(x^{2}-bx+1\right)`,
            },
            { k: "p", t: String.raw`と因数分解でき、$f(x)=x^{2}-ax+1$ で割り切れる。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`実際に筆算で割ってもよい。商は $x^{2}+\dfrac{1+\sqrt5}{2}x+1$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`定数項が $1$、$x^{3}$ と $x$ の係数が等しい（相反式）なので、$x^{2}-px+1$ の形の積を試すのが自然である。`,
          ],
          check: String.raw`数値で割り算すると、商が $x^{2}+1.618033989x+1$、余りが $0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)=0$ の虚数解で虚部が正のものを $\alpha$ とするとき、$\alpha$ を極形式で表す`,
          answer: String.raw`$\alpha=\cos\dfrac{2\pi}{5}+i\sin\dfrac{2\pi}{5}$`,
          approach: String.raw`(1) より $\alpha$ は $x^{4}+x^{3}+x^{2}+x+1=0$ の解なので $\alpha^{5}=1$ である。極形式 $\alpha=r\left(\cos\theta+i\sin\theta\right)$ とおき、ド・モアブルの定理で $r$ と $\theta$ を決める。実部の符号で $\theta$ が1つに決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$\alpha^{5}=1$。** (1) より $\alpha^{4}+\alpha^{3}+\alpha^{2}+\alpha+1=0$ である。両辺に $\alpha-1$ を掛けると`,
            },
            { k: "math", t: String.raw`\alpha^{5}-1=0,\qquad\alpha^{5}=1` },
            { k: "p", t: String.raw`である。また $\alpha$ は虚数なので $\alpha\neq1$ である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "α は 1 の5乗根のうち、虚部が正で実部も正のもの。複素数平面の単位円を5等分した点のうち偏角 72° の点である。",
                view: [-1.45, 1.45, -1.28, 1.28],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI, faint: true },
                  { k: "seg", a: [0, 0], b: RT5W(1) },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: RT5W(0), label: "1", place: "right" },
                  { k: "dot", at: RT5W(1), label: "α", place: "above-right" },
                  { k: "dot", at: RT5W(2), label: "α²", place: "above-left" },
                  { k: "dot", at: RT5W(3), label: "α³", place: "below-left" },
                  { k: "dot", at: RT5W(4), label: "α⁴", place: "below-right" },
                ],
              },
            },
            { k: "p", t: String.raw`**極形式。** $\alpha=r\left(\cos\theta+i\sin\theta\right)$（$r>0$、$0\leqq\theta<2\pi$）とおく。ド・モアブルの定理から` },
            {
              k: "math",
              t: String.raw`\alpha^{5}=r^{5}\left(\cos5\theta+i\sin5\theta\right)=1`,
            },
            {
              k: "p",
              t: String.raw`なので $r^{5}=1$ かつ $5\theta=2k\pi$（$k$ は整数）である。$r$ は正の実数で $r^{5}=1$ をみたすから、与えられた事実より $r=1$ である。また`,
            },
            {
              k: "math",
              t: String.raw`\theta=\frac{2k\pi}{5}\qquad\left(k=0,1,2,3,4\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\alpha\neq1$ より $k\neq0$、虚部が正より $0<\theta<\pi$ だから $k=1$ または $k=2$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$k$ を決める。** $f(x)=x^{2}-ax+1$ の2解の和は $a=\dfrac{\sqrt5-1}{2}>0$ で、2解は互いに共役だから、$\alpha$ の実部は $\dfrac a2>0$ である。$\cos\dfrac{4\pi}{5}<0$ なので $k=2$ は不適で`,
            },
            {
              k: "math",
              t: String.raw`\alpha=\cos\frac{2\pi}{5}+i\sin\frac{2\pi}{5}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left|\alpha\right|=1$ は、$f$ の2解の積が $1$ で2解が共役（$\alpha\bar\alpha=\left|\alpha\right|^{2}=1$）であることからも分かる。ついでに $2\cos\dfrac{2\pi}{5}=a$、つまり $\cos72^{\circ}=\dfrac{\sqrt5-1}{4}$ が得られる。`,
            },
          ],
          pitfalls: [
            String.raw`$\alpha^{5}=1$ と「虚部が正」だけでは $k=1,2$ の2つが残る。実部の符号で絞る。`,
            String.raw`$r^{5}=1$ から $r=1$ を言うのに、問題が与えている「$r^{5}=1$ をみたす実数 $r$ は $r=1$ のみ」を使う。`,
          ],
          check: String.raw`$\alpha=\cos72^{\circ}+i\sin72^{\circ}=0.309017+0.951057i$ で $\alpha^{2}-a\alpha+1=0$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) の $\alpha$ に対して $\alpha^{2023}+\alpha^{-2023}$ の値を求める`,
          answer: String.raw`$-\dfrac{1+\sqrt{5}}{2}$`,
          approach: String.raw`$\alpha^{5}=1$ なので指数は $5$ で割った余りだけで決まる。$2023=5\cdot404+3$ だから $\alpha^{3}+\alpha^{-3}$ になり、$t=\alpha+\alpha^{-1}=a$ を使って $t^{3}-3t$ と書ける。`,
          blocks: [
            { k: "p", t: String.raw`$2023=5\cdot404+3$ で $\alpha^{5}=1$ なので` },
            {
              k: "math",
              t: String.raw`\alpha^{2023}=\left(\alpha^{5}\right)^{404}\alpha^{3}=\alpha^{3},\qquad\alpha^{-2023}=\alpha^{-3}`,
            },
            { k: "p", t: String.raw`である。よって求める値は $\alpha^{3}+\alpha^{-3}$ である。` },
            {
              k: "p",
              t: String.raw`$f(\alpha)=0$ すなわち $\alpha^{2}-a\alpha+1=0$ の両辺を $\alpha\ (\neq0)$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\frac{1}{\alpha}=a`,
            },
            { k: "p", t: String.raw`である。$t=\alpha+\alpha^{-1}$ とおくと` },
            {
              k: "math",
              t: String.raw`t^{3}=\alpha^{3}+3\alpha+\frac{3}{\alpha}+\frac{1}{\alpha^{3}}=\left(\alpha^{3}+\alpha^{-3}\right)+3t`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\alpha^{3}+\alpha^{-3}=t^{3}-3t=a^{3}-3a` },
            { k: "p", t: String.raw`である。$a=\dfrac{\sqrt5-1}{2}$ だから` },
            {
              k: "math",
              t: String.raw`a^{2}=\frac{6-2\sqrt{5}}{4}=\frac{3-\sqrt{5}}{2},\qquad a^{3}=a\cdot a^{2}=\frac{\left(\sqrt{5}-1\right)\left(3-\sqrt{5}\right)}{4}=\frac{4\sqrt{5}-8}{4}=\sqrt{5}-2`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`a^{3}-3a=\sqrt{5}-2-\frac{3\left(\sqrt{5}-1\right)}{2}=\frac{2\sqrt{5}-4-3\sqrt{5}+3}{2}=-\frac{1+\sqrt{5}}{2}`,
            },
            { k: "p", t: String.raw`である。すなわち` },
            {
              k: "math",
              t: String.raw`\alpha^{2023}+\alpha^{-2023}=-\frac{1+\sqrt{5}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\alpha^{-3}=\alpha^{2}$ なので、求める値は $\alpha^{3}+\alpha^{2}=2\cos\dfrac{6\pi}{5}=2\cos216^{\circ}=-1.618\cdots$ でもある。(1) の $b=-\dfrac{1+\sqrt5}{2}$ とちょうど同じ値になっているのは偶然ではなく、$\alpha^{2},\alpha^{3}$ が $x^{2}-bx+1=0$ の2解だからである。`,
            },
          ],
          pitfalls: [
            String.raw`$2023$ を $5$ で割った余りを使う。$\alpha^{5}=1$ が (2) で手に入っている。`,
            String.raw`$\left(\alpha+\alpha^{-1}\right)^{3}$ の展開で中央の $3\left(\alpha+\alpha^{-1}\right)$ を落とさない。`,
          ],
          check: String.raw`数値では $\alpha^{2023}+\alpha^{-2023}=-1.6180339888$ で、$-\dfrac{1+\sqrt5}{2}=-1.618033989$ と一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["内積の計算", "平面への垂線の足", "係数の和が1", "平行の証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "条件をみたす座標を作ると $\\vec a\\cdot\\vec b=3$、$\\vec c\\cdot\\vec a=3$、$\\vec c\\cdot(\\vec b-\\vec a)=0$ が成り立った",
          "$\\overrightarrow{\\mathrm{OH}}=\\tfrac23\\vec a+\\tfrac19\\vec b$ について $\\left(\\vec c-\\overrightarrow{\\mathrm{OH}}\\right)\\cdot\\vec a=\\left(\\vec c-\\overrightarrow{\\mathrm{OH}}\\right)\\cdot\\vec b=0$ を確認した",
          "$\\overrightarrow{\\mathrm{OK}}=\\tfrac23\\vec a+\\tfrac19\\vec b+\\tfrac29\\vec c$ は係数の和が $1$ で、$\\overrightarrow{\\mathrm{AB}},\\overrightarrow{\\mathrm{AC}}$ の両方と直交した",
          "$\\overrightarrow{\\mathrm{HK}}=\\tfrac29\\vec c$（3成分とも比が $0.2222\\cdots$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四面体 $\mathrm{OABC}$ で $\vec a=\overrightarrow{\mathrm{OA}}$ 等とおき、$\angle\mathrm{AOB}=60^{\circ}$、$\left|\vec a\right|=2$、$\left|\vec b\right|=3$、$\left|\vec c\right|=\sqrt6$、$\vec b\cdot\vec c=3$、$\mathrm{OC}\perp\mathrm{AB}$ とするとき、$\vec a\cdot\vec b$ と $\vec c\cdot\vec a$ を求める`,
          answer: String.raw`$\vec a\cdot\vec b=3$、$\vec c\cdot\vec a=3$`,
          approach: String.raw`$\vec a\cdot\vec b$ は定義そのもの。$\vec c\cdot\vec a$ は「$\mathrm{OC}\perp\mathrm{AB}$」を $\vec c\cdot\left(\vec b-\vec a\right)=0$ と書けばすぐ出る。`,
          blocks: [
            { k: "p", t: String.raw`内積の定義から` },
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec b=\left|\vec a\right|\left|\vec b\right|\cos60^{\circ}=2\cdot3\cdot\frac12=3`,
            },
            { k: "p", t: String.raw`である。また $\overrightarrow{\mathrm{AB}}=\vec b-\vec a$ で、$\mathrm{OC}\perp\mathrm{AB}$ だから` },
            {
              k: "math",
              t: String.raw`\vec c\cdot\left(\vec b-\vec a\right)=0,\qquad\vec c\cdot\vec a=\vec c\cdot\vec b=3`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`条件をみたす座標を作ると、どちらの内積も $3.000000000$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{C}$ から3点 $\mathrm{O},\mathrm{A},\mathrm{B}$ を含む平面に下ろした垂線の足を $\mathrm{H}$ とするとき、$\overrightarrow{\mathrm{OH}}$ を $\vec a$ と $\vec b$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac23\vec a+\dfrac19\vec b$`,
          approach: String.raw`$\mathrm{H}$ は平面 $\mathrm{OAB}$ 上なので $\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおける。$\overrightarrow{\mathrm{CH}}$ が平面に垂直、つまり $\vec a$ とも $\vec b$ とも垂直であることから連立1次方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおく。$\overrightarrow{\mathrm{CH}}=\overrightarrow{\mathrm{OH}}-\vec c$ が平面 $\mathrm{OAB}$ に垂直だから` },
            {
              k: "math",
              t: String.raw`\left(s\vec a+t\vec b-\vec c\right)\cdot\vec a=0,\qquad\left(s\vec a+t\vec b-\vec c\right)\cdot\vec b=0`,
            },
            { k: "p", t: String.raw`である。$\left|\vec a\right|^{2}=4$、$\left|\vec b\right|^{2}=9$、$\vec a\cdot\vec b=3$、$\vec c\cdot\vec a=\vec c\cdot\vec b=3$ を代入すると` },
            {
              k: "math",
              t: String.raw`4s+3t=3,\qquad3s+9t=3`,
            },
            { k: "p", t: String.raw`である。第1式を3倍して第2式を引くと $9s=6$、すなわち $s=\dfrac23$ である。これを第1式に入れて` },
            {
              k: "math",
              t: String.raw`\frac83+3t=3,\qquad t=\frac19`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\frac23\vec a+\frac19\vec b`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「平面に垂直」は「平面を張る2つのベクトルの両方と垂直」。$\vec a$ と $\vec b$ の2本で条件を書く。`,
          ],
          check: String.raw`座標で計算すると $\left(\vec c-\overrightarrow{\mathrm{OH}}\right)\cdot\vec a$ も $\cdot\,\vec b$ も $0$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`点 $\mathrm{O}$ から3点 $\mathrm{A},\mathrm{B},\mathrm{C}$ を含む平面に下ろした垂線の足を $\mathrm{K}$ とするとき、$\vec c$ と $\overrightarrow{\mathrm{HK}}$ が平行であることを示す`,
          answer: String.raw`$\overrightarrow{\mathrm{OK}}=\overrightarrow{\mathrm{OH}}+\dfrac29\vec c$ なので $\overrightarrow{\mathrm{HK}}=\dfrac29\vec c$`,
          approach: String.raw`「$\overrightarrow{\mathrm{OH}}+k\vec c$ が $\mathrm{K}$ になるような $k$ がある」ことを示せばよい。そのためには、$\overrightarrow{\mathrm{OH}}+k\vec c$ が (i) 平面 $\mathrm{ABC}$ 上にあり、(ii) $\overrightarrow{\mathrm{AB}},\overrightarrow{\mathrm{AC}}$ と直交する、の2つを確かめる。`,
          blocks: [
            { k: "p", t: String.raw`実数 $k$ に対し` },
            {
              k: "math",
              t: String.raw`\vec p=\overrightarrow{\mathrm{OH}}+k\vec c=\frac23\vec a+\frac19\vec b+k\vec c`,
            },
            { k: "p", t: String.raw`とおく。` },
            {
              k: "p",
              t: String.raw`**$\overrightarrow{\mathrm{AB}}$ とは自動的に直交する。** $\overrightarrow{\mathrm{AB}}=\vec b-\vec a$ との内積は`,
            },
            {
              k: "math",
              t: String.raw`\vec p\cdot\left(\vec b-\vec a\right)=\frac23\left(\vec a\cdot\vec b-\left|\vec a\right|^{2}\right)+\frac19\left(\left|\vec b\right|^{2}-\vec a\cdot\vec b\right)+k\left(\vec c\cdot\vec b-\vec c\cdot\vec a\right)`,
            },
            { k: "p", t: String.raw`で、値を入れると` },
            {
              k: "math",
              t: String.raw`=\frac23\left(3-4\right)+\frac19\left(9-3\right)+k\left(3-3\right)=-\frac23+\frac23+0=0`,
            },
            {
              k: "p",
              t: String.raw`である（$k$ の項が消えるのは $\mathrm{OC}\perp\mathrm{AB}$ のおかげ）。つまり $k$ によらず $\vec p\perp\overrightarrow{\mathrm{AB}}$ である。`,
            },
            { k: "p", t: String.raw`**$\overrightarrow{\mathrm{AC}}$ と直交する $k$。** $\overrightarrow{\mathrm{AC}}=\vec c-\vec a$ との内積は` },
            {
              k: "math",
              t: String.raw`\vec p\cdot\left(\vec c-\vec a\right)=\frac23\left(\vec a\cdot\vec c-\left|\vec a\right|^{2}\right)+\frac19\left(\vec b\cdot\vec c-\vec a\cdot\vec b\right)+k\left(\left|\vec c\right|^{2}-\vec c\cdot\vec a\right)`,
            },
            {
              k: "math",
              t: String.raw`=\frac23\left(3-4\right)+\frac19\left(3-3\right)+k\left(6-3\right)=-\frac23+3k`,
            },
            { k: "p", t: String.raw`なので、$k=\dfrac29$ のときに $0$ になる。` },
            {
              k: "p",
              t: String.raw`**平面 $\mathrm{ABC}$ 上にあること。** $k=\dfrac29$ のとき`,
            },
            {
              k: "math",
              t: String.raw`\vec p=\frac23\vec a+\frac19\vec b+\frac29\vec c`,
            },
            { k: "p", t: String.raw`で、係数の和は` },
            {
              k: "math",
              t: String.raw`\frac23+\frac19+\frac29=\frac{6+1+2}{9}=1`,
            },
            {
              k: "p",
              t: String.raw`である。$\vec a,\vec b,\vec c$ の係数の和が $1$ だから、$\vec p$ の終点は平面 $\mathrm{ABC}$ 上にある。`,
            },
            {
              k: "p",
              t: String.raw`**結論。** $\vec p$ の終点は平面 $\mathrm{ABC}$ 上にあり、$\vec p$ は $\overrightarrow{\mathrm{AB}}$ とも $\overrightarrow{\mathrm{AC}}$ とも直交するので平面 $\mathrm{ABC}$ に垂直である。これは $\mathrm{O}$ から平面 $\mathrm{ABC}$ に下ろした垂線の足の条件そのものだから $\vec p=\overrightarrow{\mathrm{OK}}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{HK}}=\overrightarrow{\mathrm{OK}}-\overrightarrow{\mathrm{OH}}=\frac29\vec c`,
            },
            {
              k: "p",
              t: String.raw`となり、$\vec c\neq\vec0$ だから $\overrightarrow{\mathrm{HK}}$ は $\vec c$ に平行である。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`「$\vec p\perp\overrightarrow{\mathrm{AB}}$ が $k$ によらず成り立つ」が効いている。もとの四面体で $\mathrm{OC}\perp\mathrm{AB}$ と $\mathrm{CH}\perp$（平面 $\mathrm{OAB}$）の2つがあるので、$\mathrm{AB}$ は平面 $\mathrm{OCH}$ に垂直になる。$\mathrm{H}$ と $\mathrm{K}$ がともにその平面上にあることが、平行性の正体である。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{OK}}$ を未知数3つでおくより、「$\overrightarrow{\mathrm{OH}}+k\vec c$ が条件をみたす」と当てて確かめるほうが短い。これで示すべき平行性も同時に出る。`,
            String.raw`平面 $\mathrm{ABC}$ 上にあることは「係数の和が $1$」で言える。垂直条件だけでは足りない。`,
          ],
          check: String.raw`座標で $\overrightarrow{\mathrm{HK}}$ を計算すると、3成分とも $\vec c$ の $0.2222\cdots=\tfrac29$ 倍だった。`,
        },
      ],
    },
    {
      no: 6,
      field: "微分法・積分法",
      topics: ["接線", "線分の通過領域", "最大最小で境界を決める", "対数を含む面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f'(x)=1$ の解は $x=\\tfrac12,\\ -\\tfrac56$ で、$x=\\tfrac12$ での接線は $y=x-\\tfrac74$（$f\\left(\\tfrac12\\right)=-\\tfrac54$）",
          "$g(x)=f(x)-x$ は $g(0)=-4$、$g\\left(\\tfrac16\\right)=g\\left(\\tfrac76\\right)=-\\tfrac94$、$g\\left(\\tfrac12\\right)=-\\tfrac74$、$g(2)=-\\tfrac{43}{13}$",
          "上下の境界から区分求積で面積を求めると $3.633496067$、$\\dfrac{237}{52}-\\dfrac43\\log2=3.633496067$ と一致した",
          "400万点のモンテカルロでも $3.6343$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=-\dfrac12x-\dfrac{4}{6x+1}$ の曲線 $y=f(x)$ の接線で、傾きが $1$ かつ接点の $x$ 座標が正であるものの方程式を求める`,
          answer: String.raw`$y=x-\dfrac{7}{4}$`,
          approach: String.raw`$f'(x)=1$ を解くだけ。分母の2乗が $16$ になるので、きれいな値が出る。`,
          blocks: [
            { k: "p", t: String.raw`微分すると` },
            {
              k: "math",
              t: String.raw`f'(x)=-\frac12+\frac{24}{\left(6x+1\right)^{2}}`,
            },
            { k: "p", t: String.raw`である（$\dfrac{d}{dx}\left(-4\left(6x+1\right)^{-1}\right)=24\left(6x+1\right)^{-2}$）。$f'(x)=1$ とすると` },
            {
              k: "math",
              t: String.raw`\frac{24}{\left(6x+1\right)^{2}}=\frac32,\qquad\left(6x+1\right)^{2}=16,\qquad6x+1=\pm4`,
            },
            { k: "p", t: String.raw`なので $x=\dfrac12$ または $x=-\dfrac56$ である。接点の $x$ 座標が正だから $x=\dfrac12$ で` },
            {
              k: "math",
              t: String.raw`f\left(\frac12\right)=-\frac14-\frac{4}{4}=-\frac54`,
            },
            { k: "p", t: String.raw`である。求める接線は` },
            {
              k: "math",
              t: String.raw`y=1\cdot\left(x-\frac12\right)-\frac54=x-\frac74`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$f(0.5)=-1.25$ で、$0.5-1.75=-1.25$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}\left(x,f(x)\right)$、$\mathrm{Q}\left(x+1,f(x)+1\right)$ とし、$x$ が $0\leqq x\leqq2$ を動くとき、線分 $\mathrm{PQ}$ が通過してできる図形 $S$ の概形を描き、$S$ の面積を求める`,
          answer: String.raw`面積は $\dfrac{237}{52}-\dfrac43\log2$（$=3.6334\cdots$）`,
          approach: String.raw`$\mathrm{PQ}$ の傾きはつねに $1$ である。そこで $y-x$ に注目し、$g(x)=f(x)-x$ とおくと、$S$ の各縦断面が $g$ の最大・最小で書ける。$g$ の増減を調べれば上下の境界が決まり、面積は積分で出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**傾きは $1$。** $\mathrm{P},\mathrm{Q}$ の $x$ 座標の差は $1$、$y$ 座標の差も $1$ なので、$\mathrm{PQ}$ の傾きはつねに $1$ である。線分 $\mathrm{PQ}$ 上の点は $0\leqq u\leqq1$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\left(x+u,\ f(x)+u\right)`,
            },
            { k: "p", t: String.raw`と書ける。$g(x)=f(x)-x$ とおくと、この点 $(X,Y)$ について` },
            {
              k: "math",
              t: String.raw`Y-X=f(x)-x=g(x),\qquad x=X-u`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq u\leqq1$ と $0\leqq x\leqq2$ から、$x$ の動ける範囲は`,
            },
            {
              k: "math",
              t: String.raw`I(X)=\left[\max\left(0,X-1\right),\ \min\left(2,X\right)\right]`,
            },
            {
              k: "p",
              t: String.raw`である（$0\leqq X\leqq3$ のとき空でない）。逆に $x\in I(X)$ なら $u=X-x\in\left[0,1\right]$ がとれるので、点 $\left(X,\ X+g(x)\right)$ は $S$ に属する。$g$ は連続だから、$S$ の $X$ における縦の切り口は`,
            },
            {
              k: "math",
              t: String.raw`X+m(X)\leqq Y\leqq X+M(X)`,
            },
            {
              k: "p",
              t: String.raw`という区間になる。ここで $M(X),m(X)$ は $I(X)$ 上での $g$ の最大・最小である。`,
            },
            { k: "p", t: String.raw`**$g$ の増減。** (1) の計算から` },
            {
              k: "math",
              t: String.raw`g'(x)=f'(x)-1=-\frac32+\frac{24}{\left(6x+1\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`で、$g'(x)=0$ は $\left(6x+1\right)^{2}=16$、$0\leqq x\leqq2$ では $x=\dfrac12$ だけである。$0\leqq x<\tfrac12$ で $g'>0$、$\tfrac12<x\leqq2$ で $g'<0$ だから、$g$ は $\left[0,\tfrac12\right]$ で増加、$\left[\tfrac12,2\right]$ で減少する。値は`,
            },
            {
              k: "math",
              t: String.raw`g(0)=-4,\qquad g\left(\frac12\right)=-\frac74,\qquad g(2)=-3-\frac{4}{13}=-\frac{43}{13}`,
            },
            { k: "p", t: String.raw`である。また $g(x)=g(x+1)$ となる $x$ は` },
            {
              k: "math",
              t: String.raw`-\frac{4}{6x+1}=-\frac32-\frac{4}{6x+7},\qquad\left(6x+7\right)\left(6x+1\right)=16`,
            },
            {
              k: "p",
              t: String.raw`すなわち $12x^{2}+16x-3=0$ から $x=\dfrac16$（もう一方は負）である。このとき $g\left(\tfrac16\right)=g\left(\tfrac76\right)=-\dfrac94$ である。`,
            },
            { k: "p", t: String.raw`**上下の境界。** $I(X)$ が $\tfrac12$ を含むのは $\tfrac12\leqq X\leqq\tfrac32$ のときなので` },
            {
              k: "steps",
              items: [
                String.raw`$0\leqq X\leqq\tfrac12$：$I=\left[0,X\right]$ で $g$ は増加。$M=g(X)$、$m=g(0)=-4$`,
                String.raw`$\tfrac12\leqq X\leqq1$：$M=g\left(\tfrac12\right)=-\tfrac74$、$m=g(0)=-4$`,
                String.raw`$1\leqq X\leqq\tfrac76$：$M=-\tfrac74$、$m=g(X-1)$`,
                String.raw`$\tfrac76\leqq X\leqq\tfrac32$：$M=-\tfrac74$、$m=g(X)$`,
                String.raw`$\tfrac32\leqq X\leqq2$：$I\subset\left[\tfrac12,2\right]$ で $g$ は減少。$M=g(X-1)$、$m=g(X)$`,
                String.raw`$2\leqq X\leqq3$：$I=\left[X-1,2\right]$。$M=g(X-1)$、$m=g(2)=-\tfrac{43}{13}$`,
              ],
            },
            {
              k: "figure",
              fig: {
                caption:
                  "g(x) = f(x) - x のグラフ（0 ≦ x ≦ 2）。x = 1/2 で最大 -7/4 をとり、g(1/6) = g(7/6) = -9/4 で同じ値になる。",
                view: [-0.6, 2.7, -4.3, -1.4],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: G6W, from: 0, to: 2 },
                  { k: "dot", at: [0, -4], label: "(0, -4)", place: "right" },
                  { k: "dot", at: [1 / 6, -9 / 4], label: "(1/6, -9/4)", place: "above-left" },
                  { k: "dot", at: [0.5, -7 / 4], label: "最大 (1/2, -7/4)", place: "above-right" },
                  { k: "dot", at: [7 / 6, -9 / 4], label: "(7/6, -9/4)", place: "above-right" },
                  { k: "dot", at: [2, -43 / 13], label: "(2, -43/13)", place: "below-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`である。$Y=X+g(X)=f(X)$、$Y=X+g(X-1)=f(X-1)+1$ に注意すると、境界は次のようになる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`上の境界：$y=f(x)$（$0\leqq x\leqq\tfrac12$）→ 接線 $y=x-\tfrac74$（$\tfrac12\leqq x\leqq\tfrac32$）→ $y=f(x-1)+1$（$\tfrac32\leqq x\leqq3$）`,
                String.raw`下の境界：$y=x-4$（$0\leqq x\leqq1$、$x=0$ のときの線分）→ $y=f(x-1)+1$（$1\leqq x\leqq\tfrac76$）→ $y=f(x)$（$\tfrac76\leqq x\leqq2$）→ $y=x-\tfrac{43}{13}$（$2\leqq x\leqq3$、$x=2$ のときの線分）`,
              ],
            },
            {
              k: "figure",
              fig: {
                caption:
                  "線分 PQ の通過領域 S。上の境界は y = f(x)、傾き1の接線 y = x - 7/4、y = f(x-1)+1 の3つ、下の境界は x = 0 のときの線分、y = f(x-1)+1、y = f(x)、x = 2 のときの線分の4つからできている。",
                view: [-1.1, 4.3, -4.4, 0.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: S6W },
                  { k: "curve", f: F6W, from: 0, to: 2 },
                  { k: "curve", f: (x: number) => F6W(x - 1) + 1, from: 1, to: 3 },
                  { k: "seg", a: [0, -4], b: [1, -3] },
                  { k: "seg", a: [2, F6W(2)], b: [3, F6W(2) + 1] },
                  { k: "curve", f: (x: number) => x - 7 / 4, from: 0.5, to: 1.5, dash: true },
                  { k: "dot", at: [0, -4], label: "(0, -4)", place: "below-right" },
                  { k: "dot", at: [0.5, -1.25], label: "(1/2, -5/4)", place: "above-left" },
                  { k: "dot", at: [1.5, -0.25], label: "(3/2, -1/4)", place: "above-left" },
                  { k: "dot", at: [3, F6W(2) + 1], label: "(3, -4/13)", place: "right" },
                  { k: "dot", at: [7 / 6, F6W(7 / 6)], label: "(7/6, -13/12)", place: "below-right" },
                ],
              },
            },
            { k: "p", t: String.raw`**面積。** $F(x)=\displaystyle\int f(x)\,dx=-\frac{x^{2}}{4}-\frac23\log\left(6x+1\right)$ とおく。上の境界の積分は` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac12}f+\int_{\frac12}^{\frac32}\left(x-\frac74\right)dx+\int_{\frac32}^{3}\left\{f(x-1)+1\right\}dx`,
            },
            { k: "p", t: String.raw`で、順に $-\dfrac1{16}-\dfrac43\log2$、$-\dfrac34$、$\dfrac9{16}+\dfrac43\log2-\dfrac23\log13$ だから、合計は` },
            {
              k: "math",
              t: String.raw`-\frac14-\frac23\log13`,
            },
            { k: "p", t: String.raw`である。下の境界の積分は` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left(x-4\right)dx+\int_{1}^{\frac76}\left\{f(x-1)+1\right\}dx+\int_{\frac76}^{2}f+\int_{2}^{3}\left(x-\frac{43}{13}\right)dx`,
            },
            {
              k: "p",
              t: String.raw`で、順に $-\dfrac72$、$\dfrac{23}{144}-\dfrac23\log2$、$-\dfrac{95}{144}-\dfrac23\log13+2\log2$、$-\dfrac{21}{26}$ だから、合計は`,
            },
            {
              k: "math",
              t: String.raw`-4-\frac{21}{26}+\frac43\log2-\frac23\log13`,
            },
            { k: "p", t: String.raw`である。差をとると $\log13$ が消えて` },
            {
              k: "math",
              t: String.raw`S\ \text{の面積}=\left(-\frac14\right)-\left(-4-\frac{21}{26}\right)-\frac43\log2=\frac{15}{4}+\frac{21}{26}-\frac43\log2`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{237}{52}-\frac43\log2=3.6334\cdots`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`上の境界に接線 $y=x-\tfrac74$ がそのまま現れるのは、$g$ の最大値 $g\left(\tfrac12\right)=-\tfrac74$ が「$y-x$ の最大値」だからである。(1) の接線は、傾き $1$ の直線のうち曲線の上から押さえるいちばん下のものにあたる。`,
            },
          ],
          pitfalls: [
            String.raw`「傾き $1$ の線分が動く」ので、$y-x$ を見るのが決定打。$y$ そのものを見ると場合分けが複雑になる。`,
            String.raw`下の境界で $y=f(x-1)+1$ と $y=f(x)$ が $x=\tfrac76$ で入れ替わる。$g(x)=g(x+1)$ を解いて交点を出す。`,
            String.raw`$0\leqq X\leqq3$ の全体で切り口が1つの区間になる（$g$ が連続だから）。領域が2つに分かれたりはしない。`,
          ],
          check: String.raw`上下の境界から区分求積すると $3.633496067$、$\dfrac{237}{52}-\dfrac43\log2=3.633496067$ で一致した。400万点のモンテカルロでも $3.6343$ になった。`,
        },
      ],
    },
  ],
};
