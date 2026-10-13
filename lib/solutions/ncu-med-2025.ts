import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2025年度（令和7年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$\left|\vec a\right|=2$、$\left|\vec b\right|=6$、$\vec a\cdot\vec b=10$ を満たす置き方のひとつ。 */
const BY25 = Math.sqrt(11);
const A25: [number, number] = [2, 0];
const B25: [number, number] = [5, BY25];
const H25: [number, number] = [(13 * 2 - 3 * 5) / 10, (-3 * BY25) / 10];
const M25: [number, number] = [2.5, BY25 / 2];
const N25: [number, number] = [(13 * 2 - 3 * 5) / 7, (-3 * BY25) / 7];

/** 第4問の図。$C\colon y=\sqrt3\log x$ と、$x=1,3$ での接線で囲まれた部分。 */
const R3 = Math.sqrt(3);
const CURVE25 = (x: number): number => R3 * Math.log(x);
/** 2本の接線の交点の $x$ 座標。 */
const CX25 = 1.5 * Math.log(3);
const AREA25: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const n = 60;
  for (let i = 0; i <= n; i++) {
    const x = 1 + (2 * i) / n;
    pts.push([x, CURVE25(x)]);
  }
  pts.push([CX25, R3 * (CX25 - 1)]);
  return pts;
})();

export const ncuMed2025: SolutionSet = {
  slug: "ncu-med",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "平面ベクトル",
      topics: ["垂線の足", "2直線の交点をベクトルで表す", "内積の計算"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{OH}}=\\tfrac{13\\vec a-3\\vec b}{10}$ が $\\overrightarrow{\\mathrm{AB}}$ と直交することを、内積を分数のまま計算して確かめた（値は $0$）",
          "$\\overrightarrow{\\mathrm{OH}}$ の係数の和が $1$ なので $\\mathrm{H}$ は直線 $\\mathrm{AB}$ 上にある",
          "$\\overrightarrow{\\mathrm{ON}}=\\tfrac{13\\vec a-3\\vec b}{7}$ が直線 $\\mathrm{OH}$ 上にあり、かつ $s=-\\tfrac67$ として $\\left(1-s\\right)\\vec a+\\tfrac s2\\vec b$ に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角形 $\mathrm{OAB}$ で、$\mathrm{O}$ から直線 $\mathrm{AB}$ に下ろした垂線を $\mathrm{OH}$ とする。$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\vec a$ と $\vec b$ のなす角 $\theta$ について $\left|\vec a\right|=2$、$\left|\vec b\right|=6$、$\cos\theta=\dfrac56$ のとき、$\overrightarrow{\mathrm{OH}}$ を $\vec a,\vec b$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac{13\vec a-3\vec b}{10}$`,
          approach: String.raw`$\mathrm{H}$ は直線 $\mathrm{AB}$ 上だから $\overrightarrow{\mathrm{OH}}=\vec a+t\left(\vec b-\vec a\right)$ とおき、$\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AB}}=0$ で $t$ を決める。`,
          blocks: [
            { k: "p", t: String.raw`まず内積と $\left|\vec b-\vec a\right|^{2}$ を出しておく。` },
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec b=\left|\vec a\right|\left|\vec b\right|\cos\theta=2\cdot6\cdot\frac56=10`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec b-\vec a\right|^{2}=\left|\vec b\right|^{2}-2\vec a\cdot\vec b+\left|\vec a\right|^{2}=36-20+4=20`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ は直線 $\mathrm{AB}$ 上にあるので $\overrightarrow{\mathrm{OH}}=\vec a+t\left(\vec b-\vec a\right)$ とおける。$\mathrm{OH}\perp\mathrm{AB}$ より`,
            },
            {
              k: "math",
              t: String.raw`\left\{\vec a+t\left(\vec b-\vec a\right)\right\}\cdot\left(\vec b-\vec a\right)=0`,
            },
            { k: "p", t: String.raw`である。$\vec a\cdot\left(\vec b-\vec a\right)=10-4=6$ なので` },
            { k: "math", t: String.raw`6+20t=0,\qquad t=-\frac{3}{10}` },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\vec a-\frac{3}{10}\left(\vec b-\vec a\right)=\frac{13}{10}\vec a-\frac{3}{10}\vec b=\frac{13\vec a-3\vec b}{10}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t=-\dfrac3{10}<0$ なので、$\mathrm{H}$ は線分 $\mathrm{AB}$ の外、$\mathrm{A}$ の側にある。実際 $\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AB}}=-6<0$ で、角 $\mathrm{A}$ は鈍角である。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{H}$ が線分 $\mathrm{AB}$ の内部にあるとは限らない。ここでは $\mathrm{A}$ の外側に出る。`,
          ],
          check: String.raw`$\dfrac{13\vec a-3\vec b}{10}$ と $\vec b-\vec a$ の内積を分数のまま計算すると、ちょうど $0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`線分 $\mathrm{OB}$ の中点を $\mathrm{M}$、直線 $\mathrm{OH}$ と直線 $\mathrm{AM}$ の交点を $\mathrm{N}$ とするとき、$\overrightarrow{\mathrm{ON}}$ を $\vec a,\vec b$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{ON}}=\dfrac{13\vec a-3\vec b}{7}$`,
          approach: String.raw`$\mathrm{N}$ を2通りに表して、$\vec a,\vec b$ が1次独立であることから係数を比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{N}$ は直線 $\mathrm{OH}$ 上なので、実数 $u$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{ON}}=u\cdot\frac{13\vec a-3\vec b}{10}=\frac{13u}{10}\vec a-\frac{3u}{10}\vec b`,
            },
            {
              k: "p",
              t: String.raw`と書ける。また $\overrightarrow{\mathrm{OM}}=\dfrac12\vec b$ で、$\mathrm{N}$ は直線 $\mathrm{AM}$ 上なので、実数 $s$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{ON}}=\vec a+s\left(\frac12\vec b-\vec a\right)=\left(1-s\right)\vec a+\frac s2\vec b`,
            },
            {
              k: "p",
              t: String.raw`とも書ける。三角形 $\mathrm{OAB}$ ができているので $\vec a,\vec b$ は1次独立であり、係数を比べて`,
            },
            {
              k: "math",
              t: String.raw`1-s=\frac{13u}{10},\qquad\frac s2=-\frac{3u}{10}`,
            },
            { k: "p", t: String.raw`である。第2式から $s=-\dfrac{3u}{5}$ で、これを第1式に入れると` },
            {
              k: "math",
              t: String.raw`1+\frac{3u}{5}=\frac{13u}{10},\qquad1=\frac{13u-6u}{10}=\frac{7u}{10},\qquad u=\frac{10}{7}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{ON}}=\frac{10}{7}\cdot\frac{13\vec a-3\vec b}{10}=\frac{13\vec a-3\vec b}{7}=\frac{13}{7}\vec a-\frac37\vec b`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "三角形 OAB と、O から直線 AB に下ろした垂線の足 H、OB の中点 M、直線 OH と直線 AM の交点 N の位置関係。H と N はどちらも線分 AB の外、A の側にある。",
                view: [-0.8, 5.8, -1.9, 3.9],
                items: [
                  { k: "seg", a: [0, 0], b: A25 },
                  { k: "seg", a: [0, 0], b: B25 },
                  { k: "seg", a: A25, b: B25 },
                  { k: "seg", a: A25, b: H25, dash: true },
                  { k: "seg", a: [0, 0], b: H25 },
                  { k: "seg", a: H25, b: N25, dash: true },
                  { k: "seg", a: M25, b: A25 },
                  { k: "seg", a: A25, b: N25, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "left" },
                  { k: "dot", at: A25, label: "A", place: "above-right" },
                  { k: "dot", at: B25, label: "B", place: "above-right" },
                  { k: "dot", at: M25, label: "M", place: "right" },
                  { k: "dot", at: H25, label: "H", place: "left" },
                  { k: "dot", at: N25, label: "N", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$u=\dfrac{10}{7}>1$ なので、$\mathrm{N}$ は $\mathrm{H}$ よりさらに遠い。線分 $\mathrm{OH}$ の内部とは限らない。`,
          ],
          check: String.raw`$\dfrac{13\vec a-3\vec b}{7}$ は $\overrightarrow{\mathrm{OH}}$ の $\dfrac{10}{7}$ 倍で直線 $\mathrm{OH}$ 上にあり、$s=-\dfrac67$ として $\left(1-s\right)\vec a+\dfrac s2\vec b$ とも一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["交互に取る試行と部分集合", "総和の偶奇", "勝ちが確定する条件", "場合分けによる数え上げ"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$m=2,3,4$ の引き分けの確率を全探索すると $\\tfrac26,\\ 0,\\ \\tfrac8{70}$ で、$\\tfrac13,\\ 0,\\ \\tfrac4{35}$ と一致した",
          "$m=4$ で和が $14$ になる4個の組は8通りで、補集合どうしが4組のペアになっていた",
          "$m=3,4$ の「A の勝ちが確定」の確率を最初の3回の取り方すべて（$120$ 通り・$336$ 通り）で数えると $\\tfrac{22}{120},\\ \\tfrac6{336}$ で、$\\tfrac{11}{60},\\ \\tfrac1{56}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`箱に $0$ から $2m-1$ までの数字が1つずつ書かれた $2m$ 個の玉が入っている（$m\geqq2$）。$\mathrm{A},\mathrm{B}$ が $\mathrm{A},\mathrm{B},\mathrm{A},\mathrm{B},\ldots$ の順に1個ずつ戻さずに取り、最後に持っている玉の数の総和が大きいほうを勝ち、等しければ引き分けとする。$m=2,3,4$ のとき引き分けとなる確率を求める`,
          answer: String.raw`$m=2$ のとき $\dfrac13$、$m=3$ のとき $0$、$m=4$ のとき $\dfrac4{35}$`,
          approach: String.raw`取る順番を $2m$ 個の並べ方と見ると、$\mathrm{A}$ が持つ $m$ 個の組は、$m$ 個の部分集合のどれも同様に確からしい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`玉を取る順番は $2m$ 個の玉の並べ方 $\left(2m\right)!$ 通りが同様に確からしく、$\mathrm{A}$ が持つのは $1,3,5,\ldots$ 番目の玉である。したがって **$\mathrm{A}$ の持つ $m$ 個の組は、$\left\{0,1,\ldots,2m-1\right\}$ の $m$ 個の部分集合のどれも同様に確からしい**（全部で $ {}_{2m}\mathrm{C}_{m}$ 通り）。`,
            },
            { k: "p", t: String.raw`全部の玉の数の総和は` },
            {
              k: "math",
              t: String.raw`0+1+\cdots+\left(2m-1\right)=\frac{\left(2m-1\right)2m}{2}=m\left(2m-1\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、引き分けは $\mathrm{A}$ の持つ玉の和が $\dfrac{m\left(2m-1\right)}{2}$ になることである。`,
            },
            {
              k: "p",
              t: String.raw`**$m=3$ のとき**　総和は $3\cdot5=15$ で奇数だから、2人の和が等しくなることはない。よって確率は $0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$m=2$ のとき**　玉は $0,1,2,3$ で総和 $6$、$\mathrm{A}$ の2個の和が $3$ になればよい。$ {}_{4}\mathrm{C}_{2}=6$ 通りのうち $\left\{0,3\right\},\left\{1,2\right\}$ の2通りだから`,
            },
            { k: "math", t: String.raw`\frac26=\frac13` },
            {
              k: "p",
              t: String.raw`である。`,
            },
            {
              k: "p",
              t: String.raw`**$m=4$ のとき**　玉は $0,\ldots,7$ で総和 $28$、$\mathrm{A}$ の4個の和が $14$ になればよい。$\left\{w,x,y,z\right\}$（$w<x<y<z$）として $w$ で場合分けすると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$w=0$ … $x+y+z=14$ で $\left\{0,1,6,7\right\},\left\{0,2,5,7\right\},\left\{0,3,4,7\right\},\left\{0,3,5,6\right\}$ の4通り`,
                String.raw`$w=1$ … $x+y+z=13$ で $\left\{1,2,4,7\right\},\left\{1,2,5,6\right\},\left\{1,3,4,6\right\}$ の3通り`,
                String.raw`$w=2$ … $x+y+z=12$ で $\left\{2,3,4,5\right\}$ の1通り`,
                String.raw`$w\geqq3$ … 最小でも $3+4+5+6=18>14$ なので0通り`,
              ],
            },
            { k: "p", t: String.raw`で合計8通りである。$ {}_{8}\mathrm{C}_{4}=70$ だから、求める確率は` },
            { k: "math", t: String.raw`\frac8{70}=\frac4{35}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`和が $14$ の4個組は、補集合も和が $14$ になるので4組のペアに分かれる。実際 $\left\{0,1,6,7\right\}$ と $\left\{2,3,4,5\right\}$、$\left\{0,2,5,7\right\}$ と $\left\{1,3,4,6\right\}$、$\left\{0,3,4,7\right\}$ と $\left\{1,2,5,6\right\}$、$\left\{0,3,5,6\right\}$ と $\left\{1,2,4,7\right\}$ である。数え落としの確認に使える。`,
            },
          ],
          pitfalls: [
            String.raw`取る順番は関係なく、$\mathrm{A}$ が最終的に持つ「組」だけで決まる。順列で数えると分母も分子も同じ倍率になるので、組合せで数えてよい。`,
            String.raw`$m$ が奇数のときは総和 $m\left(2m-1\right)$ が奇数なので、引き分けは起こらない。`,
          ],
          check: String.raw`全探索すると $m=2,3,4$ でそれぞれ $\dfrac26,\ 0,\ \dfrac8{70}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$m=3,4$ のとき、$\mathrm{A}$ が2個目の玉を取り終えた時点で $\mathrm{A}$ の勝ちがすでに確定している確率を求める`,
          answer: String.raw`$m=3$ のとき $\dfrac{11}{60}$、$m=4$ のとき $\dfrac1{56}$`,
          approach: String.raw`残りの取り方のうち $\mathrm{A}$ にとって最悪の場合（$\mathrm{A}$ が残りの小さいほうを取る場合）でも勝てるか、で判定する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ が2個目を取り終えた時点で、$\mathrm{A}$ は2個（和を $S$ とする）、$\mathrm{B}$ は1個を持ち、箱には $2m-3$ 個が残っている。以後 $\mathrm{B},\mathrm{A},\mathrm{B},\ldots$ と続くので、$\mathrm{A}$ はあと $m-2$ 個、$\mathrm{B}$ はあと $m-1$ 個を取る。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ の最終的な和が最も小さくなるのは、残りのうち**小さいほうから $m-2$ 個**を $\mathrm{A}$ が取る場合である。その場合でも $\mathrm{A}$ が勝つことが「勝ちが確定している」ことと同じである。`,
            },
            {
              k: "p",
              t: String.raw`残りのうち小さいほうから並べた玉を $r_{1}<r_{2}<\cdots$ とする。$\mathrm{A}$ の最終的な和を $X$ とすると $\mathrm{B}$ の和は $m\left(2m-1\right)-X$ なので、$\mathrm{A}$ が勝つ条件は $2X>m\left(2m-1\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`また、最初の3回の取り方は「$\mathrm{A}$ の2個の組」と「$\mathrm{B}$ の1個」の組合せ $ {}_{2m}\mathrm{C}_{2}\times\left(2m-2\right)$ 通りがどれも同様に確からしい。取り除かれた3個の集合を $T$ と書く。`,
            },
            {
              k: "p",
              t: String.raw`**$m=3$ のとき**　玉は $0,\ldots,5$、総和 $15$、$\mathrm{A}$ はあと1個、$\mathrm{B}$ はあと2個取る。最悪の場合 $X=S+r_{1}$ だから、条件は $2\left(S+r_{1}\right)>15$、整数なので`,
            },
            { k: "math", t: String.raw`S+r_{1}\geqq8` },
            {
              k: "p",
              t: String.raw`である。$r_{1}$ は $T$ に入らない最小の数なので、$0$ と $1$ が $T$ に入るかで分ける。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\notin T$ … $r_{1}=0$ で $S\geqq8$ が必要。$\mathrm{A}$ の組は $\left\{3,5\right\}$（和 $8$）か $\left\{4,5\right\}$（和 $9$）で、$\mathrm{B}$ の玉は $0$ 以外の残り3通り。計 $3+3=6$ 通り。`,
                String.raw`$0\in T$ かつ $1\notin T$ … $r_{1}=1$ で $S\geqq7$ が必要。$\mathrm{B}$ の玉が $0$ でなければ $\mathrm{A}$ の組に $0$ が入って $S\leqq5$ となり不可なので、$\mathrm{B}$ の玉は $0$。$\mathrm{A}$ の組は $\left\{2,3,4,5\right\}$ から和 $7$ 以上の $\left\{2,5\right\},\left\{3,4\right\},\left\{3,5\right\},\left\{4,5\right\}$ の4通り。`,
                String.raw`$0,1\in T$ … $T=\left\{0,1,t\right\}$ で $\mathrm{A}$ の組はこの3個のうち2個だから $S\leqq1+t\leqq6$。$t\geqq3$ なら $r_{1}=2$ で $S\geqq6$、つまり $S=1+t=6$、$t=5$、$\mathrm{A}$ の組は $\left\{1,5\right\}$、$\mathrm{B}$ の玉は $0$ の1通り。$t=2$ なら $S\leqq3$、$r_{1}=3$ で合計 $6<8$ となり不可。`,
              ],
            },
            { k: "p", t: String.raw`合計 $6+4+1=11$ 通りで、全体は $ {}_{6}\mathrm{C}_{2}\times4=60$ 通りだから` },
            { k: "math", t: String.raw`\frac{11}{60}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$m=4$ のとき**　玉は $0,\ldots,7$、総和 $28$、$\mathrm{A}$ はあと2個、$\mathrm{B}$ はあと3個取る。最悪の場合 $X=S+r_{1}+r_{2}$ だから、条件は $2\left(S+r_{1}+r_{2}\right)>28$、つまり`,
            },
            { k: "math", t: String.raw`S+r_{1}+r_{2}\geqq15` },
            {
              k: "p",
              t: String.raw`である。$T=\left\{t_{1},t_{2},t_{3}\right\}$（$t_{1}<t_{2}<t_{3}$）とすると $S\leqq t_{2}+t_{3}\leqq6+7=13$ である。$0,1$ が $T$ に入るかで分ける。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0,1$ とも $T$ にない … $r_{1}+r_{2}=1$ で $S\geqq14$ が必要だが $S\leqq13$ なので不可。`,
                String.raw`$0\notin T$、$1\in T$ … $r_{1}=0$。$2\notin T$ なら $r_{2}=2$ で $S\geqq13$、つまり $\mathrm{A}$ の組は $\left\{6,7\right\}$、$T=\left\{1,6,7\right\}$、$\mathrm{B}$ の玉は $1$。これは条件を満たす。$2\in T$ なら $T=\left\{1,2,t\right\}$ で $S\leqq2+t\leqq9$、$r_{2}\leqq4$ なので合計 $\leqq13$ で不可。`,
                String.raw`$0\in T$、$1\notin T$ … $r_{1}=1$。$2\notin T$ なら $r_{2}=2$ で $S\geqq12$、つまり $\mathrm{A}$ の組は $\left\{5,7\right\}$ か $\left\{6,7\right\}$ で、$\mathrm{B}$ の玉は $0$。$T=\left\{0,5,7\right\},\left\{0,6,7\right\}$ はどちらも $1,2\notin T$ を満たす。2通り。$2\in T$ なら $T=\left\{0,2,t\right\}$ で $S\leqq2+t\leqq9$、$r_{2}\leqq4$ なので合計 $\leqq14$ で不可。`,
                String.raw`$0,1\in T$ … $T=\left\{0,1,t\right\}$ で $S\leqq1+t\leqq8$。$t\geqq4$ なら $r_{1}+r_{2}=2+3=5$ で合計 $\leqq13$、$t=2$ なら $S\leqq3$・$r_{1}+r_{2}=3+4=7$ で合計 $\leqq10$、$t=3$ なら $S\leqq4$・$r_{1}+r_{2}=2+4=6$ で合計 $\leqq10$。いずれも不可。`,
              ],
            },
            {
              k: "p",
              t: String.raw`合計3通りで、全体は $ {}_{8}\mathrm{C}_{2}\times6=168$ 通りだから`,
            },
            { k: "math", t: String.raw`\frac3{168}=\frac1{56}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「勝ちが確定」は、残りの取り方が**どうなっても**勝つということ。最悪の場合だけ調べればよい。`,
            String.raw`$\mathrm{A}$ が2個目を取り終えた時点では $\mathrm{B}$ はまだ1個しか取っていない。以後は $\mathrm{B}$ のほうが1個多く取る。`,
          ],
          check: String.raw`最初の3回の取り方をすべて調べると、$m=3$ で $\dfrac{22}{120}=\dfrac{11}{60}$、$m=4$ で $\dfrac6{336}=\dfrac1{56}$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数・数列",
      topics: ["条件を満たす格子点の数え上げ", "偶奇で分けて一般項", "和の計算"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{k}$ を定義どおり全探索すると $k=1,\\ldots,12$ で $0,0,0,1,2,4,6,9,12,16,20,25$ となり、$a_{7}=6$、$a_{8}=9$",
          "$a_{2m-1}=\\left(m-1\\right)\\left(m-2\\right)$、$a_{2m}=\\left(m-1\\right)^{2}$ が $m=1,\\ldots,14$ で一致した",
          "$\\sum_{k=1}^{2n}a_{k}$ は $n=1,\\ldots,5$ で $0,1,7,22,50$ となり、$\\tfrac{n\\left(n-1\\right)\\left(4n-5\\right)}{6}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`自然数 $k$ に対して $x<y<k<x+y$ を満たす自然数の組 $\left(x,y\right)$ の個数を $a_{k}$ とするとき、$a_{7},a_{8}$ を求める`,
          answer: String.raw`$a_{7}=6$、$a_{8}=9$`,
          approach: String.raw`$y$ を固定すると $x$ の動く範囲が $k-y<x<y$ と決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`条件 $x<y<k<x+y$ は、$y$ を固定すると`,
            },
            { k: "math", t: String.raw`1\leqq y\leqq k-1,\qquad k-y<x<y` },
            {
              k: "p",
              t: String.raw`と書ける。$x$ は整数なので $k-y+1\leqq x\leqq y-1$ で、個数は $y-1-\left(k-y+1\right)+1=2y-k-1$（これが $0$ 以下なら $0$ 個）である。また $k-y+1\geqq2>1$ なので $x\geqq1$ は自動的に満たされる。`,
            },
            { k: "p", t: String.raw`$k=7$ のとき $2y-8\geqq1$ より $y\geqq5$ で、$y\leqq6$ だから` },
            {
              k: "steps",
              items: [String.raw`$y=5$ … $2$ 個`, String.raw`$y=6$ … $4$ 個`],
            },
            { k: "p", t: String.raw`で $a_{7}=6$ である。$k=8$ のとき $2y-9\geqq1$ より $y\geqq5$ で、$y\leqq7$ だから` },
            {
              k: "steps",
              items: [String.raw`$y=5$ … $1$ 個`, String.raw`$y=6$ … $3$ 個`, String.raw`$y=7$ … $5$ 個`],
            },
            { k: "p", t: String.raw`で $a_{8}=9$ である。` },
          ],
          check: String.raw`定義どおり全探索すると $a_{7}=6$、$a_{8}=9$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`自然数 $m$ に対して $a_{2m-1},a_{2m}$ を $m$ の式で表す`,
          answer: String.raw`$a_{2m-1}=\left(m-1\right)\left(m-2\right)$、$a_{2m}=\left(m-1\right)^{2}$`,
          approach: String.raw`(1) で出した $2y-k-1$ を $y$ について足す。$k$ の偶奇で $y$ の下限が変わる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`a_{k}=\sum_{y}\left(2y-k-1\right)\qquad\left(2y-k-1\geqq1\ \text{となる}\ y\leqq k-1\ \text{について}\right)`,
            },
            { k: "p", t: String.raw`である。条件は $y\geqq\dfrac{k+2}{2}$ である。` },
            {
              k: "p",
              t: String.raw`**$k=2m$ のとき**　$y\geqq m+1$ で、$y$ は $m+1$ から $2m-1$ まで動く。$2y-k-1=2y-2m-1$ は $y=m+1,m+2,\ldots,2m-1$ に対して`,
            },
            { k: "math", t: String.raw`1,\ 3,\ 5,\ \ldots,\ 2m-3` },
            { k: "p", t: String.raw`という $m-1$ 個の奇数になるので` },
            { k: "math", t: String.raw`a_{2m}=1+3+\cdots+\left(2m-3\right)=\left(m-1\right)^{2}` },
            {
              k: "p",
              t: String.raw`である（$m=1$ のときは動く $y$ がなく $a_{2}=0$ で、式とも合う）。`,
            },
            {
              k: "p",
              t: String.raw`**$k=2m-1$ のとき**　$y\geqq\dfrac{2m+1}{2}$、つまり $y\geqq m+1$ で、$y$ は $m+1$ から $2m-2$ まで動く。$2y-k-1=2y-2m$ は`,
            },
            { k: "math", t: String.raw`2,\ 4,\ 6,\ \ldots,\ 2m-4` },
            { k: "p", t: String.raw`という $m-2$ 個の偶数になるので` },
            {
              k: "math",
              t: String.raw`a_{2m-1}=2\left\{1+2+\cdots+\left(m-2\right)\right\}=\left(m-2\right)\left(m-1\right)`,
            },
            { k: "p", t: String.raw`である（$m=1,2$ のときは $0$ で、式とも合う）。` },
          ],
          pitfalls: [
            String.raw`$k$ が奇数のときは $\dfrac{k+2}{2}$ が整数でないので、$y$ の下限は切り上げて $m+1$ になる。`,
          ],
          check: String.raw`$m=1,\ldots,14$ で、全探索した $a_{2m-1},a_{2m}$ が式と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`自然数 $n$ に対して $\displaystyle\sum_{k=1}^{2n}a_{k}$ を $n$ の式で表す`,
          answer: String.raw`$\dfrac{n\left(n-1\right)\left(4n-5\right)}{6}$`,
          approach: String.raw`奇数番目と偶数番目をペアにして $m=1$ から $n$ まで足す。`,
          blocks: [
            { k: "p", t: String.raw`(2) より、$m=1,2,\ldots,n$ についてペアにして足すと` },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{2n}a_{k}=\sum_{m=1}^{n}\left(a_{2m-1}+a_{2m}\right)=\sum_{m=1}^{n}\left\{\left(m-1\right)\left(m-2\right)+\left(m-1\right)^{2}\right\}`,
            },
            { k: "p", t: String.raw`である。$j=m-1$ とおくと中身は $j\left(j-1\right)+j^{2}=2j^{2}-j$ で、$j$ は $0$ から $n-1$ まで動くから` },
            {
              k: "math",
              t: String.raw`\sum_{j=0}^{n-1}\left(2j^{2}-j\right)=2\cdot\frac{\left(n-1\right)n\left(2n-1\right)}{6}-\frac{\left(n-1\right)n}{2}`,
            },
            { k: "p", t: String.raw`である。$n\left(n-1\right)$ でくくると` },
            {
              k: "math",
              t: String.raw`n\left(n-1\right)\left\{\frac{2n-1}{3}-\frac12\right\}=n\left(n-1\right)\cdot\frac{2\left(2n-1\right)-3}{6}=\frac{n\left(n-1\right)\left(4n-5\right)}{6}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,2,3,4,5$ で $0,1,7,22,50$ となる。`,
            },
          ],
          check: String.raw`$n=1,\ldots,11$ で、全探索した和が $\dfrac{n\left(n-1\right)\left(4n-5\right)}{6}$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・積分法",
      topics: ["接線の傾きと2直線のなす角", "正接の加法定理", "上に凸な曲線と接線", "面積の計算"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.5,1,2,2.9$ で $b=\\tfrac{3\\left(a+1\\right)}{3-a}$ とすると、2接線のなす鋭角はどれも $0.523598776=\\tfrac\\pi6$ だった",
          "$a=1$ のとき $b=3$、2接線の交点の $x$ 座標は $\\tfrac32\\log3=1.6479184$",
          "面積を数値積分すると $0.164178116$ で、$\\sqrt3-\\tfrac{3\\sqrt3}{4}\\left(\\log3\\right)^{2}=0.164178116$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`曲線 $C\colon y=\sqrt3\log x$ 上の2点 $\mathrm{P},\mathrm{Q}$ の $x$ 座標を $a,b$（$0<a<3$、$a<b$）とする。$\mathrm{P},\mathrm{Q}$ における $C$ の接線が交わってできる鋭角が $\dfrac\pi6$ のとき、$b$ を $a$ で表す`,
          answer: String.raw`$b=\dfrac{3\left(a+1\right)}{3-a}$`,
          approach: String.raw`接線の傾きをそれぞれ $\tan\alpha,\tan\beta$ と見て、$\tan\left(\alpha-\beta\right)$ の加法定理を使う。`,
          blocks: [
            { k: "p", t: String.raw`$y'=\dfrac{\sqrt3}{x}$ なので、$\mathrm{P},\mathrm{Q}$ での接線の傾きは` },
            { k: "math", t: String.raw`m_{1}=\frac{\sqrt3}{a},\qquad m_{2}=\frac{\sqrt3}{b}` },
            {
              k: "p",
              t: String.raw`である。$0<a<b$ より $m_{1}>m_{2}>0$ である。それぞれの接線が $x$ 軸の正の向きとなす角を $\alpha,\beta$（$0<\beta<\alpha<\dfrac\pi2$）とすると $\tan\alpha=m_{1}$、$\tan\beta=m_{2}$ で、2直線のなす鋭角は $\alpha-\beta$ である。加法定理より`,
            },
            {
              k: "math",
              t: String.raw`\tan\left(\alpha-\beta\right)=\frac{m_{1}-m_{2}}{1+m_{1}m_{2}}=\frac{\frac{\sqrt3}{a}-\frac{\sqrt3}{b}}{1+\frac3{ab}}=\frac{\sqrt3\left(b-a\right)}{ab+3}`,
            },
            { k: "p", t: String.raw`である。これが $\tan\dfrac\pi6=\dfrac1{\sqrt3}$ に等しいので` },
            {
              k: "math",
              t: String.raw`\frac{\sqrt3\left(b-a\right)}{ab+3}=\frac{1}{\sqrt3},\qquad3\left(b-a\right)=ab+3`,
            },
            { k: "p", t: String.raw`である。$b$ について整理すると $b\left(3-a\right)=3a+3$ で、$0<a<3$ より $3-a>0$ だから` },
            { k: "math", t: String.raw`b=\frac{3\left(a+1\right)}{3-a}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`このとき $b-a=\dfrac{3\left(a+1\right)-a\left(3-a\right)}{3-a}=\dfrac{a^{2}+3}{3-a}>0$ なので、$a<b$ も自動的に満たされる。`,
            },
          ],
          pitfalls: [
            String.raw`$1+m_{1}m_{2}=1+\dfrac3{ab}>0$、$m_{1}-m_{2}>0$ なので、$\tan$ は正のままで絶対値をつける必要はない。`,
          ],
          check: String.raw`$a=0.5,1,2,2.9$ でこの $b$ をとると、2接線のなす鋭角はどれも $\dfrac\pi6$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a=1$ のとき、2本の接線と曲線 $C$ とで囲まれる部分の面積を求める`,
          answer: String.raw`$\sqrt3-\dfrac{3\sqrt3}{4}\left(\log3\right)^{2}=\dfrac{\sqrt3}{4}\left\{4-3\left(\log3\right)^{2}\right\}$`,
          approach: String.raw`$y''<0$ なので $C$ は上に凸で、接線は接点以外で $C$ の上側にある。接線の交点で分けて積分する。`,
          blocks: [
            { k: "p", t: String.raw`(1) に $a=1$ を入れると $b=\dfrac{3\cdot2}{2}=3$ である。$\mathrm{P}\left(1,0\right)$、$\mathrm{Q}\left(3,\sqrt3\log3\right)$ で、接線は` },
            {
              k: "math",
              t: String.raw`\ell_{1}\colon y=\sqrt3\left(x-1\right),\qquad\ell_{2}\colon y=\sqrt3\log3+\frac{1}{\sqrt3}\left(x-3\right)`,
            },
            { k: "p", t: String.raw`である。$\ell_{1}$ と $\ell_{2}$ の交点の $x$ 座標は、両辺を $\sqrt3$ 倍して整理すると` },
            {
              k: "math",
              t: String.raw`3\left(x-1\right)=3\log3+\left(x-3\right),\qquad2x=3\log3,\qquad x=\frac32\log3`,
            },
            {
              k: "p",
              t: String.raw`である。これを $c$ とおく。$\dfrac23<\log3<2$（$e^{\frac23}<3<e^{2}$）より $1<c<3$ である。`,
            },
            {
              k: "p",
              t: String.raw`$y''=-\dfrac{\sqrt3}{x^{2}}<0$ なので $C$ は上に凸で、接線は接点以外では $C$ の上側にある。したがって囲まれる部分は、$1\leqq x\leqq c$ では $\ell_{1}$ と $C$ の間、$c\leqq x\leqq3$ では $\ell_{2}$ と $C$ の間である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 y = √3 log x と、x = 1 と x = 3 での接線。2本の接線と曲線で囲まれた部分を塗ってある。接線の交点の x 座標は 1.5 log 3 で、およそ 1.65。",
                view: [0.2, 3.9, -0.8, 2.3],
                items: [
                  { k: "fill", pts: AREA25 },
                  { k: "curve", f: CURVE25, from: 0.25, to: 3.85 },
                  { k: "seg", a: [0.5, R3 * -0.5], b: [2.0, R3] },
                  { k: "seg", a: [1.3, R3 * Math.log(3) - 1.7 / R3], b: [3.6, R3 * Math.log(3) + 0.6 / R3] },
                  { k: "dot", at: [1, 0], label: "P", place: "below-right" },
                  { k: "dot", at: [3, R3 * Math.log(3)], label: "Q", place: "below-right" },
                  { k: "dot", at: [CX25, R3 * (CX25 - 1)] },
                ],
              },
            },
            { k: "p", t: String.raw`求める面積を $S$ とすると` },
            {
              k: "math",
              t: String.raw`S=\int_{1}^{c}\sqrt3\left(x-1\right)dx+\int_{c}^{3}\left\{\sqrt3\log3+\frac{x-3}{\sqrt3}\right\}dx-\int_{1}^{3}\sqrt3\log x\,dx`,
            },
            { k: "p", t: String.raw`である（曲線の下側を引く部分は $1$ から $3$ までまとめられる）。3つを順に計算する。` },
            {
              k: "math",
              t: String.raw`\int_{1}^{c}\sqrt3\left(x-1\right)dx=\sqrt3\left[\frac{\left(x-1\right)^{2}}{2}\right]_{1}^{c}=\frac{\sqrt3}{2}\left(c-1\right)^{2}`,
            },
            {
              k: "math",
              t: String.raw`\int_{c}^{3}\left\{\sqrt3\log3+\frac{x-3}{\sqrt3}\right\}dx=\sqrt3\left(\log3\right)\left(3-c\right)-\frac{\left(3-c\right)^{2}}{2\sqrt3}`,
            },
            {
              k: "math",
              t: String.raw`\int_{1}^{3}\sqrt3\log x\,dx=\sqrt3\Bigl[x\log x-x\Bigr]_{1}^{3}=\sqrt3\left(3\log3-2\right)`,
            },
            { k: "p", t: String.raw`である。$L=\log3$ とおくと $c=\dfrac32L$、$c-1=\dfrac{3L-2}{2}$、$3-c=\dfrac{3\left(2-L\right)}{2}$ なので` },
            {
              k: "math",
              t: String.raw`\frac{\sqrt3}{2}\left(c-1\right)^{2}=\frac{\sqrt3}{8}\left(3L-2\right)^{2}=\sqrt3\left(\frac98L^{2}-\frac32L+\frac12\right)`,
            },
            {
              k: "math",
              t: String.raw`\sqrt3L\left(3-c\right)=\sqrt3\cdot\frac{3L\left(2-L\right)}{2}=\sqrt3\left(3L-\frac32L^{2}\right)`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(3-c\right)^{2}}{2\sqrt3}=\frac{\sqrt3}{6}\cdot\frac{9\left(2-L\right)^{2}}{4}=\sqrt3\left(\frac38L^{2}-\frac32L+\frac32\right)`,
            },
            { k: "p", t: String.raw`である。これらを足し引きすると、$L$ の1次の項は` },
            {
              k: "math",
              t: String.raw`-\frac32+3+\frac32-3=0`,
            },
            { k: "p", t: String.raw`で消え、$L^{2}$ の係数は $\dfrac98-\dfrac32-\dfrac38=-\dfrac34$、定数項は $\dfrac12-\dfrac32+2=1$ となる。よって` },
            {
              k: "math",
              t: String.raw`S=\sqrt3\left\{1-\frac34\left(\log3\right)^{2}\right\}=\sqrt3-\frac{3\sqrt3}{4}\left(\log3\right)^{2}`,
            },
            { k: "p", t: String.raw`である（$0.1641\ldots$）。` },
            {
              k: "note",
              t: String.raw`$c\log c$ の形の項は、$\ell_{1}$ 側と $\ell_{2}$ 側で打ち消し合う。曲線の積分を $1$ から $3$ までまとめてしまえば、$c$ の対数は最初から現れない。`,
            },
          ],
          pitfalls: [
            String.raw`接線の交点 $c=\dfrac32\log3$ が $1$ と $3$ の間にあることを確かめておく。`,
            String.raw`$\displaystyle\int\log x\,dx=x\log x-x$ を使う。`,
          ],
          check: String.raw`面積を数値積分すると $0.164178116$ で、$\sqrt3-\dfrac{3\sqrt3}{4}\left(\log3\right)^{2}=0.164178116$ と一致した。`,
        },
      ],
    },
  ],
};
