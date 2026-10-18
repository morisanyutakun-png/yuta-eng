import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2019年度（平成31年度）一般入試 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 *
 * 第3問は同じ年度の理系 第5問とまったく同じ問題で、答えも一致する。
 */

/** 第1問。領域 $D$ の帯の両端 $x+y=\tfrac{5\pi}{12},\tfrac{13\pi}{12}$。 */
const LO19 = (5 * Math.PI) / 12;
const HI19 = (13 * Math.PI) / 12;
const TOP19 = (x: number): number => Math.min(Math.PI, HI19 - x);
const BOT19 = (x: number): number => Math.max(0, LO19 - x);

/** 第3問。断面図の円。 */
const CIR19B = (cx: number, r: number) => (t: number): [number, number] =>
  [cx + r * Math.cos(t), r * Math.sin(t)];

export const handaiBunkei2019: SolutionSet = {
  slug: "handai-bunkei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数・領域",
      topics: ["三角関数の合成", "領域の図示", "線形計画法", "多角形の頂点"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$0\\le x,y\\le\\pi$ を $1200\\times1200$ の格子にとり、元の不等式による判定と $\\tfrac{5\\pi}{12}\\le x+y\\le\\tfrac{13\\pi}{12}$ による判定を比べると、境界の丸め誤差を除いて $1$ 点も食い違わなかった",
          "同じ格子で $2x+y$ を直接求めると、最大 $6.5449847$（$\\left(\\pi,\\tfrac{\\pi}{12}\\right)$）、最小 $1.3089969$（$\\left(0,\\tfrac{5\\pi}{12}\\right)$）で、$\\tfrac{25\\pi}{12}=6.5449847$、$\\tfrac{5\\pi}{12}=1.3089969$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面において、連立不等式 $0\le x\le\pi$、$0\le y\le\pi$、$2\sin\left(x+y\right)-2\cos\left(x+y\right)\ge\sqrt2$ の表す領域を $D$ とする。$D$ を図示する`,
          answer: String.raw`正方形 $0\le x\le\pi$、$0\le y\le\pi$ のうち $\dfrac{5\pi}{12}\le x+y\le\dfrac{13\pi}{12}$ をみたす部分（六角形）`,
          approach: String.raw`$u=x+y$ とおいて合成する。$2\sqrt2\sin\left(u-\dfrac{\pi}{4}\right)\ge\sqrt2$。`,
          blocks: [
            { k: "p", t: String.raw`$u=x+y$ とおく。$0\le x\le\pi$、$0\le y\le\pi$ より $0\le u\le2\pi$ である。` },
            { k: "p", t: String.raw`左辺を合成すると` },
            {
              k: "math",
              t: String.raw`2\sin u-2\cos u=2\sqrt2\sin\left(u-\frac{\pi}{4}\right)`,
            },
            { k: "p", t: String.raw`なので、条件は` },
            {
              k: "math",
              t: String.raw`2\sqrt2\sin\left(u-\frac{\pi}{4}\right)\ge\sqrt2,\qquad\sin\left(u-\frac{\pi}{4}\right)\ge\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。$v=u-\dfrac{\pi}{4}$ とおくと $-\dfrac{\pi}{4}\le v\le\dfrac{7\pi}{4}$ で、この範囲で $\sin v\ge\dfrac12$ となるのは`,
            },
            {
              k: "math",
              t: String.raw`\frac{\pi}{6}\le v\le\frac{5\pi}{6}`,
            },
            {
              k: "p",
              t: String.raw`のときだけである（次の周期 $\dfrac{\pi}{6}+2\pi$ は範囲の外）。$u=v+\dfrac{\pi}{4}$ に戻すと`,
            },
            {
              k: "math",
              t: String.raw`\frac{\pi}{6}+\frac{\pi}{4}\le u\le\frac{5\pi}{6}+\frac{\pi}{4},\qquad\frac{5\pi}{12}\le x+y\le\frac{13\pi}{12}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`D=\left\{\left(x,y\right)\ \middle|\ 0\le x\le\pi,\ 0\le y\le\pi,\ \frac{5\pi}{12}\le x+y\le\frac{13\pi}{12}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。これは正方形を2本の平行な直線で切り取った**六角形**で、頂点は`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac{5\pi}{12},0\right),\ \left(\pi,0\right),\ \left(\pi,\frac{\pi}{12}\right),\ \left(\frac{\pi}{12},\pi\right),\ \left(0,\pi\right),\ \left(0,\frac{5\pi}{12}\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{5\pi}{12}<\pi$ なので下の直線は正方形の左下角を切り、$\pi<\dfrac{13\pi}{12}<2\pi$ なので上の直線は右上角を切る。切り口の座標は $\dfrac{13\pi}{12}-\pi=\dfrac{\pi}{12}$）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "網をかけた六角形が D（境界を含む）。正方形 0 ≦ x ≦ π、0 ≦ y ≦ π から、左下の角（x + y < 5π/12）と右上の角（x + y > 13π/12）を切り落とした形。点線が 2 本の境界の直線。",
                view: [-0.55, 3.65, -0.5, 3.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: TOP19, bottom: BOT19, from: 0, to: Math.PI },
                  { k: "seg", a: [0, 0], b: [Math.PI, 0] },
                  { k: "seg", a: [Math.PI, 0], b: [Math.PI, Math.PI] },
                  { k: "seg", a: [Math.PI, Math.PI], b: [0, Math.PI] },
                  { k: "seg", a: [0, Math.PI], b: [0, 0] },
                  { k: "seg", a: [0, LO19], b: [LO19, 0], dash: true },
                  { k: "seg", a: [HI19 - Math.PI, Math.PI], b: [Math.PI, HI19 - Math.PI], dash: true },
                  { k: "dot", at: [LO19, 0], label: "(5π/12, 0)", place: "below-right" },
                  { k: "dot", at: [0, LO19], label: "(0, 5π/12)", place: "left" },
                  { k: "dot", at: [Math.PI, HI19 - Math.PI], label: "(π, π/12)", place: "right" },
                  { k: "dot", at: [HI19 - Math.PI, Math.PI], label: "(π/12, π)", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$u$ の動く範囲は $0\le u\le2\pi$。$\sin v\ge\dfrac12$ の解をこの範囲に収まるぶんだけ拾う。周期を忘れて2つ書くと余分が出る。`,
            String.raw`$x+y=\dfrac{13\pi}{12}$ は正方形の**右上の角**を切る。$\dfrac{13\pi}{12}>\pi$ なので、$x$ 軸・$y$ 軸ではなく上辺・右辺と交わる。`,
          ],
          check: String.raw`$1200\times1200$ の格子で、元の不等式と帯の不等式の判定が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\left(x,y\right)$ が領域 $D$ を動くとき、$2x+y$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac{25\pi}{12}$（$\left(\pi,\dfrac{\pi}{12}\right)$）、最小値 $\dfrac{5\pi}{12}$（$\left(0,\dfrac{5\pi}{12}\right)$）`,
          approach: String.raw`$D$ は凸多角形で $2x+y$ は1次式なので、最大最小は頂点で起きる。6つの頂点を調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ は (1) の六角形で、**凸**である（正方形と2本の直線の決める半平面の共通部分だから）。$2x+y$ は1次式なので、最大値・最小値は頂点のどれかでとる。6つの頂点で値を計算すると`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}\left(\tfrac{5\pi}{12},0\right)&:\ \tfrac{5\pi}{6}, & \left(\pi,0\right)&:\ 2\pi=\tfrac{24\pi}{12}, & \left(\pi,\tfrac{\pi}{12}\right)&:\ \tfrac{25\pi}{12},\\ \left(\tfrac{\pi}{12},\pi\right)&:\ \tfrac{7\pi}{6}, & \left(0,\pi\right)&:\ \pi, & \left(0,\tfrac{5\pi}{12}\right)&:\ \tfrac{5\pi}{12}\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{\pi}{12}$ を単位にそろえると $10,24,25,14,12,5$ なので、最大は $\dfrac{25\pi}{12}$、最小は $\dfrac{5\pi}{12}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}2x+y\ \text{の最大値}&=\frac{25\pi}{12}\quad\left(\left(x,y\right)=\left(\pi,\tfrac{\pi}{12}\right)\right)\\ 2x+y\ \text{の最小値}&=\frac{5\pi}{12}\quad\left(\left(x,y\right)=\left(0,\tfrac{5\pi}{12}\right)\right)\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$2x+y=k$ は傾き $-2$ の直線である。帯の境界 $x+y=$ 一定（傾き $-1$）より急なので、$k$ を大きくしていくと右辺 $x=\pi$ の上の点で最後に触れ、小さくしていくと左辺 $x=0$ の上の点で最後に触れる。だから最大・最小の場所は帯の端ではなく、正方形の縦の辺の上に来る。`,
            },
          ],
          alts: [
            {
              title: "$x$ を固定して $y$ を動かす",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$x$ を固定すると、$y$ の動く範囲は $\max\left(0,\dfrac{5\pi}{12}-x\right)\le y\le\min\left(\pi,\dfrac{13\pi}{12}-x\right)$ である。$2x+y$ は $y$ について増加なので、最大は上端、最小は下端でとる。`,
                },
                {
                  k: "p",
                  t: String.raw`最大は $2x+\min\left(\pi,\dfrac{13\pi}{12}-x\right)$ で、$x\le\dfrac{\pi}{12}$ では $2x+\pi$（増加）、$x\ge\dfrac{\pi}{12}$ では $x+\dfrac{13\pi}{12}$（増加）。どちらも増加なので $x=\pi$ で最大、値は $\dfrac{25\pi}{12}$ である。`,
                },
                {
                  k: "p",
                  t: String.raw`最小は $2x+\max\left(0,\dfrac{5\pi}{12}-x\right)$ で、$x\le\dfrac{5\pi}{12}$ では $x+\dfrac{5\pi}{12}$（増加）、$x\ge\dfrac{5\pi}{12}$ では $2x$（増加）。$x=0$ で最小、値は $\dfrac{5\pi}{12}$ である。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`頂点を1つでも落とすと答えが変わる。とくに $\left(\pi,\dfrac{\pi}{12}\right)$ は $\left(\pi,0\right)$ より値が大きい。「正方形の角だから」と $\left(\pi,0\right)$ で止めない。`,
            String.raw`$2x+y$ は傾き $-2$ の直線の族。帯の傾き $-1$ と違うので、帯の境界上で最大になるとは限らない。`,
          ],
          check: String.raw`$1200\times1200$ の格子でも最大 $6.5449847$（$\left(\pi,\dfrac{\pi}{12}\right)$）、最小 $1.3089969$（$\left(0,\dfrac{5\pi}{12}\right)$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "2次方程式",
      topics: ["絶対値の場合分け", "判別式", "解と係数の関係", "範囲の決定"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$p$ を $-4$ から $4$ まで $0.00001$ 刻みに動かし、$S,P,D$ を元の式から計算すると、$3$ つの場合分けの式と $1$ 点も食い違わず、$D<0$ になる $p$ は $1$ つもなかった",
          "同じ刻みで「異なる2実数解かつ $\\alpha^{2}+\\beta^{2}\\le1$」を直接判定した結果と、求めた範囲（$-\\tfrac32\\le p\\le-\\tfrac12$ かつ $p\\ne-1$、または $p=\\tfrac12$）が、境界を除いて食い違わなかった。$p=-1$ は条件をみたさないことも確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p$ を実数の定数とする。$x$ の2次方程式 $x^{2}-\left(2p+\left|p\right|-\left|p+1\right|+1\right)x+\dfrac12\left(2p+3\left|p\right|-\left|p+1\right|-1\right)=0$ が実数解をもつことを示す`,
          answer: String.raw`$p\ge0$ では $D=4\left(p-1\right)^{2}$、$-1\le p<0$ では $D=4\left(p+1\right)$、$p<-1$ では $D=4\left(p+1\right)^{2}$。どれも $0$ 以上`,
          approach: String.raw`$\left|p\right|$ と $\left|p+1\right|$ の符号が変わる $p=0,-1$ で3つに分ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`解の和を $S$、積を $P$ とおく。判別式は $D=S^{2}-4P$ である。$\left|p\right|$ は $p=0$ で、$\left|p+1\right|$ は $p=-1$ で式が変わるので、$p\ge0$、$-1\le p<0$、$p<-1$ の3つに分ける。`,
            },
            {
              k: "p",
              t: String.raw`**$p\ge0$ のとき**。$\left|p\right|=p$、$\left|p+1\right|=p+1$ なので`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}S&=2p+p-\left(p+1\right)+1=2p\\ P&=\tfrac12\left\{2p+3p-\left(p+1\right)-1\right\}=\tfrac12\left(4p-2\right)=2p-1\end{aligned}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`D=4p^{2}-4\left(2p-1\right)=4\left(p^{2}-2p+1\right)=4\left(p-1\right)^{2}\ge0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$-1\le p<0$ のとき**。$\left|p\right|=-p$、$\left|p+1\right|=p+1$ なので`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}S&=2p-p-\left(p+1\right)+1=0\\ P&=\tfrac12\left\{2p-3p-\left(p+1\right)-1\right\}=\tfrac12\left(-2p-2\right)=-p-1\end{aligned}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`D=0-4\left(-p-1\right)=4\left(p+1\right)\ge0`,
            },
            { k: "p", t: String.raw`である（$p\ge-1$ だから）。` },
            {
              k: "p",
              t: String.raw`**$p<-1$ のとき**。$\left|p\right|=-p$、$\left|p+1\right|=-\left(p+1\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}S&=2p-p+\left(p+1\right)+1=2p+2\\ P&=\tfrac12\left\{2p-3p+\left(p+1\right)-1\right\}=\tfrac12\cdot0=0\end{aligned}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`D=\left(2p+2\right)^{2}-0=4\left(p+1\right)^{2}\ge0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`どの場合も $D\ge0$ なので、この2次方程式はつねに実数解をもつ。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$p<-1$ では $P=0$、つまり $x=0$ が必ず解になる。実際このとき方程式は $x\left\{x-\left(2p+2\right)\right\}=0$ で、解は $0$ と $2p+2$ である。`,
            },
          ],
          pitfalls: [
            String.raw`場合分けの境目は $p=0$ と $p=-1$ の2つ。どちらか片方だけにしない。`,
            String.raw`$-1\le p<0$ では $S=0$ になる。和が $0$ なので2解は $\pm\sqrt{-P}$ の形で、ここが (2) で効く。`,
          ],
          check: String.raw`$p$ を $0.00001$ 刻みで動かして、$D<0$ になる $p$ は $1$ つもなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`この2次方程式が異なる2つの実数解 $\alpha,\beta$ をもち、かつ $\alpha^{2}+\beta^{2}\le1$ となるような定数 $p$ の値の範囲を求める`,
          answer: String.raw`$-\dfrac32\le p\le-\dfrac12$ かつ $p\ne-1$、または $p=\dfrac12$`,
          approach: String.raw`$\alpha^{2}+\beta^{2}=S^{2}-2P$。(1) の3つの場合ごとに「$D>0$」と「$S^{2}-2P\le1$」を解く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`異なる2つの実数解をもつ条件は $D>0$ である。また`,
            },
            {
              k: "math",
              t: String.raw`\alpha^{2}+\beta^{2}=\left(\alpha+\beta\right)^{2}-2\alpha\beta=S^{2}-2P`,
            },
            { k: "p", t: String.raw`である。(1) の3つの場合で調べる。` },
            {
              k: "p",
              t: String.raw`**$p\ge0$ のとき**。$D=4\left(p-1\right)^{2}>0\iff p\ne1$ である。また`,
            },
            {
              k: "math",
              t: String.raw`S^{2}-2P=4p^{2}-2\left(2p-1\right)=4p^{2}-4p+2`,
            },
            { k: "p", t: String.raw`なので、$\alpha^{2}+\beta^{2}\le1$ は` },
            {
              k: "math",
              t: String.raw`4p^{2}-4p+1\le0,\qquad\left(2p-1\right)^{2}\le0`,
            },
            {
              k: "p",
              t: String.raw`すなわち $p=\dfrac12$ である。これは $p\ge0$ と $p\ne1$ をみたすので、**$p=\dfrac12$** が解である。`,
            },
            {
              k: "p",
              t: String.raw`**$-1\le p<0$ のとき**。$D=4\left(p+1\right)>0\iff p>-1$ である。また $S=0$ なので`,
            },
            {
              k: "math",
              t: String.raw`S^{2}-2P=-2\left(-p-1\right)=2p+2`,
            },
            { k: "p", t: String.raw`であり、$\alpha^{2}+\beta^{2}\le1$ は` },
            {
              k: "math",
              t: String.raw`2p+2\le1,\qquad p\le-\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。$-1<p<0$ と合わせて **$-1<p\le-\dfrac12$** が解である。`,
            },
            {
              k: "p",
              t: String.raw`**$p<-1$ のとき**。$D=4\left(p+1\right)^{2}>0\iff p\ne-1$ で、$p<-1$ なのでつねに成り立つ。また $P=0$ なので`,
            },
            {
              k: "math",
              t: String.raw`S^{2}-2P=\left(2p+2\right)^{2}=4\left(p+1\right)^{2}`,
            },
            { k: "p", t: String.raw`であり、$\alpha^{2}+\beta^{2}\le1$ は` },
            {
              k: "math",
              t: String.raw`4\left(p+1\right)^{2}\le1,\qquad\left|p+1\right|\le\frac12,\qquad-\frac32\le p\le-\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。$p<-1$ と合わせて **$-\dfrac32\le p<-1$** が解である。`,
            },
            { k: "p", t: String.raw`3つを合わせると、求める範囲は` },
            {
              k: "math",
              t: String.raw`-\frac32\le p\le-\frac12\ \ \left(\text{ただし}\ p\ne-1\right),\qquad\text{または}\qquad p=\frac12`,
            },
            {
              k: "p",
              t: String.raw`である。$p=-1$ が抜けるのは、そこで $D=0$ になり2解が一致してしまうからである。`,
            },
            {
              k: "note",
              t: String.raw`$p=\dfrac12$ では $S=1$、$P=0$ で解は $0$ と $1$、$\alpha^{2}+\beta^{2}=1$ でぎりぎり等号。$p=-\dfrac12$ では $S=0$、$P=-\dfrac12$ で解は $\pm\dfrac{1}{\sqrt2}$、やはり $\alpha^{2}+\beta^{2}=1$ である。$p=-\dfrac32$ では解が $0$ と $-1$ で、これも $1$ になる。等号が3か所で起きるのがこの問題の作り方である。`,
            },
          ],
          pitfalls: [
            String.raw`$p\ge0$ の場合は $\left(2p-1\right)^{2}\le0$ となり、**1点** $p=\dfrac12$ だけが残る。「範囲」と思い込んで区間で答えない。`,
            String.raw`$p=-1$ を除くのを忘れない。$D=0$（重解）なので「異なる2つの実数解」をみたさない。`,
            String.raw`$p<-1$ の場合に $p\ne-1$ はもともと成り立つ。場合分けの条件と $D>0$ の条件を重ねて確かめる。`,
          ],
          check: String.raw`$0.00001$ 刻みの走査で、直接判定と求めた範囲が境界を除いて食い違わなかった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間図形",
      topics: ["球面の方程式", "2球面の共通部分", "球面と平面", "三平方の定理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-19",
      review: {
        sourceChecked: true,
        verified: [
          "$C$ は平面 $2x+4y+4z=25$ 上の円で、中心 $\\left(\\tfrac{11}6,\\tfrac83,\\tfrac83\\right)$・半径 $\\tfrac{\\sqrt3}{2}=0.8660254$ と求まった",
          "その円周上の $2000$ 点はすべて $S_{1}$、$S_{2}$、および求めた3つの球面の上にあった（違反 $0$ 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`座標空間内の2つの球面 $S_{1}:\left(x-1\right)^{2}+\left(y-1\right)^{2}+\left(z-1\right)^{2}=7$ と $S_{2}:\left(x-2\right)^{2}+\left(y-3\right)^{2}+\left(z-3\right)^{2}=1$ の共通部分を $C$ とする`,
          answer: String.raw`$C$ は平面 $2x+4y+4z=25$ 上の、中心 $\left(\dfrac{11}{6},\dfrac83,\dfrac83\right)$、半径 $\dfrac{\sqrt3}{2}$ の円`,
          approach: String.raw`2式を引くと2次の項が消えて平面の式になる。`,
          blocks: [
            { k: "p", t: String.raw`2つの式を展開すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}S_{1}&:\ x^{2}+y^{2}+z^{2}-2x-2y-2z-4=0\\ S_{2}&:\ x^{2}+y^{2}+z^{2}-4x-6y-6z+21=0\end{aligned}`,
            },
            { k: "p", t: String.raw`である。辺々引くと2次の項が消えて` },
            {
              k: "math",
              t: String.raw`2x+4y+4z-25=0\quad\cdots\ \pi`,
            },
            {
              k: "p",
              t: String.raw`を得る。$C$ 上の点は $\pi$ 上にあり、逆に $S_{1}$ と $\pi$ の共通部分の点は（引き算を戻して）$S_{2}$ 上にもあるので $C=S_{1}\cap\pi$ である。`,
            },
            {
              k: "p",
              t: String.raw`$S_{1}$ の中心 $\mathrm{A}\left(1,1,1\right)$ と $\pi$ の距離は、$\vec n=\left(2,4,4\right)$、$\left|\vec n\right|=6$ より`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left|2+4+4-25\right|}{6}=\frac{15}{6}=\frac52`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt7>\dfrac52$（$7>\dfrac{25}{4}$）なので $C$ は円で、三平方の定理より半径は`,
            },
            {
              k: "math",
              t: String.raw`\rho=\sqrt{7-\frac{25}{4}}=\frac{\sqrt3}{2}`,
            },
            { k: "p", t: String.raw`である。$C$ の中心 $\mathrm{M}$ は $\mathrm{A}$ から $\pi$ に下ろした垂線の足で` },
            {
              k: "math",
              t: String.raw`\mathrm{M}=\mathrm{A}+\frac{25-\left(2+4+4\right)}{36}\vec n=\left(1,1,1\right)+\frac{5}{12}\left(2,4,4\right)=\left(\frac{11}{6},\frac83,\frac83\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$S_{1}$ との共通部分が $C$ になる球面の形**。そのような球面 $S$ は $C$ を含むので、中心は $\mathrm{M}$ を通り $\pi$ に垂直な直線`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}=\mathrm{M}+s\cdot\frac{\vec n}{6}=\left(\frac{11}{6}+\frac s3,\ \frac83+\frac{2s}{3},\ \frac83+\frac{2s}{3}\right)`,
            },
            { k: "p", t: String.raw`の上にあり、半径は三平方の定理より` },
            {
              k: "math",
              t: String.raw`r\left(s\right)=\sqrt{\rho^{2}+s^{2}}=\sqrt{\frac34+s^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。逆に、この形の球面はどれも $C$ を含み、$S_{1}$ とは異なる球面なので、$S_{1}$ との共通部分はちょうど $C$ になる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "平面 π に垂直で S₁ の中心 A を通る平面で切った断面（S₂ は省いた）。C はこの断面では 2 点に見え、どの円もその 2 点を通る。C を通る球面の中心はすべて横軸（A を通り π に垂直な直線）の上にあり、いちばん小さいのは中心が C の中点 M にくるとき（半径 √3/2）。半径 √3 のものは M の左右に 1 つずつある。",
                view: [-3.3, 6.4, -3.1, 3.1],
                step: { x: 1, y: 1 },
                items: [
                  { k: "param", f: CIR19B(0, Math.sqrt(7)), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19B(2.5, Math.sqrt(3) / 2), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19B(1, Math.sqrt(3)), from: 0, to: 2 * Math.PI },
                  { k: "param", f: CIR19B(4, Math.sqrt(3)), from: 0, to: 2 * Math.PI },
                  { k: "seg", a: [2.5, -3.1], b: [2.5, 3.1], dash: true },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [2.5, 0], label: "M", place: "below-right" },
                  { k: "dot", at: [2.5, Math.sqrt(3) / 2], label: "C", place: "above-right" },
                  { k: "dot", at: [2.5, -Math.sqrt(3) / 2] },
                  { k: "text", at: [-1.9, 1.9], label: "S₁", place: "above-left" },
                  { k: "text", at: [2.5, 3.0], label: "π", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`この問題は同じ年度の理系 第5問とまったく同じで、答えも一致する。文系では空間ベクトルの範囲で解ける題材なので、そのまま共通に出せる形になっている。`,
            },
          ],
          pitfalls: [
            String.raw`「$S_{1}$ との共通部分が $C$ となる球面」には $S_{2}$ 以外にも無数にある。中心が1本の直線上を動く1径数の族になる。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点がすべて $S_{1}$ と $S_{2}$ の上にあった。`,
        },
        {
          label: "(1)",
          task: String.raw`$S_{1}$ との共通部分が $C$ となるような球面のうち、半径が最小となる球面の方程式を求める`,
          answer: String.raw`$\left(x-\dfrac{11}{6}\right)^{2}+\left(y-\dfrac83\right)^{2}+\left(z-\dfrac83\right)^{2}=\dfrac34$`,
          approach: String.raw`$r\left(s\right)=\sqrt{\dfrac34+s^{2}}$ は $s=0$ で最小。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$r\left(s\right)=\sqrt{\dfrac34+s^{2}}$ は $s=0$ のとき最小値 $\dfrac{\sqrt3}{2}$ をとる。このとき中心は $\mathrm{M}=\left(\dfrac{11}{6},\dfrac83,\dfrac83\right)$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{\sqrt3}{2}\ne\sqrt7$ なので、この球面は $S_{1}$ とは異なり、$S_{1}$ との共通部分はちょうど $C$ になる。よって求める方程式は`,
            },
            {
              k: "math",
              t: String.raw`\left(x-\frac{11}{6}\right)^{2}+\left(y-\frac83\right)^{2}+\left(z-\frac83\right)^{2}=\frac34`,
            },
            {
              k: "p",
              t: String.raw`である。これは $C$ を大円とする球面、つまり「$C$ をちょうど赤道にもつ球面」である。`,
            },
          ],
          pitfalls: [
            String.raw`半径の最小は $C$ の半径そのもの。$C$ より小さい球面は $C$ を含めない。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点がこの球面上にあり、中心からの距離はすべて $0.8660254$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$S_{1}$ との共通部分が $C$ となるような球面のうち、半径が $\sqrt3$ となる球面の方程式を求める`,
          answer: String.raw`$\left(x-\dfrac73\right)^{2}+\left(y-\dfrac{11}{3}\right)^{2}+\left(z-\dfrac{11}{3}\right)^{2}=3$ と $\left(x-\dfrac43\right)^{2}+\left(y-\dfrac53\right)^{2}+\left(z-\dfrac53\right)^{2}=3$ の2つ`,
          approach: String.raw`$\sqrt{\dfrac34+s^{2}}=\sqrt3$ から $s=\pm\dfrac32$。`,
          blocks: [
            { k: "p", t: String.raw`$r\left(s\right)=\sqrt3$ より` },
            {
              k: "math",
              t: String.raw`\frac34+s^{2}=3,\qquad s^{2}=\frac94,\qquad s=\pm\frac32`,
            },
            { k: "p", t: String.raw`である。$\dfrac{\vec n}{6}=\left(\dfrac13,\dfrac23,\dfrac23\right)$ なので` },
            {
              k: "math",
              t: String.raw`s\cdot\frac{\vec n}{6}=\pm\frac32\left(\frac13,\frac23,\frac23\right)=\pm\left(\frac12,1,1\right)`,
            },
            { k: "p", t: String.raw`であり、中心は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}s=\frac32&:\ \left(\frac{11}{6}+\frac12,\ \frac83+1,\ \frac83+1\right)=\left(\frac73,\frac{11}{3},\frac{11}{3}\right)\\ s=-\frac32&:\ \left(\frac{11}{6}-\frac12,\ \frac83-1,\ \frac83-1\right)=\left(\frac43,\frac53,\frac53\right)\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt3\ne\sqrt7$ なのでどちらも $S_{1}$ とは異なり、条件をみたす。よって`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\left(x-\frac73\right)^{2}+\left(y-\frac{11}{3}\right)^{2}+\left(z-\frac{11}{3}\right)^{2}=3\\ &\left(x-\frac43\right)^{2}+\left(y-\frac53\right)^{2}+\left(z-\frac53\right)^{2}=3\end{aligned}`,
            },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "note",
              t: String.raw`$s$ の符号は「$C$ の中心 $\mathrm{M}$ から見てどちら側にふくらむか」に対応する。$S_{2}$ 自身は $s=\dfrac12$、$r=1$ に対応し、$S_{1}$ は $s=-\dfrac52$、$r=\sqrt7$ に対応する。`,
            },
          ],
          pitfalls: [
            String.raw`$s^{2}=\dfrac94$ から $s$ は2つ。片方だけ書くと半分しか答えていないことになる。`,
            String.raw`$\dfrac{\vec n}{6}$ は単位ベクトル（$\left|\vec n\right|=6$）。正規化を忘れると中心がずれる。`,
          ],
          check: String.raw`$C$ 上の $2000$ 点が2つの球面のどちらにも乗り、中心からの距離は $\sqrt3$ だった。`,
        },
      ],
    },
  ],
};
