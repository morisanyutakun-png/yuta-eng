import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2024年度（令和6年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。面積が等しくなる $a=\sqrt[3]{2}-1$ のとき。 */
const A24B = Math.cbrt(2) - 1;
const CUR24 = (x: number): number => Math.abs(x * x - 1);
const LIN24 = (x: number): number => 2 * A24B * (x + 1);
const UPP24 = (x: number): number => 1 - x * x;

export const handaiBunkei2024: SolutionSet = {
  slug: "handai-bunkei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分・積分",
      topics: ["絶対値のついた関数", "共有点", "放物線と直線の面積", "3次方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $0.001$ 刻みで $0$ から $1$ まで動かし、$x=-1,1-2a,1+2a$ が $C$ と $\\ell$ の共有点になることを確かめた（違反 $0$ 件）",
          "2つの面積を数値積分すると $S_{1}=\\tfrac43\\left(1-a\\right)^{3}$、$S_{2}=8a^{2}$ と小数第7位まで一致し、$a=\\sqrt[3]{2}-1=0.2599210$ では $S_{1}=S_{2}=0.5404716$（差 $-4.4\\times10^{-16}$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`曲線 $y=\left|x^{2}-1\right|$ を $C$、直線 $y=2a\left(x+1\right)$ を $\ell$ とする（$0<a<1$）。$C$ と $\ell$ の共有点の座標をすべて求める`,
          answer: String.raw`$\left(-1,0\right)$、$\left(1-2a,\ 4a\left(1-a\right)\right)$、$\left(1+2a,\ 4a\left(1+a\right)\right)$ の3つ`,
          approach: String.raw`$\left|x\right|\ge1$ と $\left|x\right|<1$ に分け、どちらも $x+1$ でくくる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell$ は点 $\left(-1,0\right)$ を通り、$\left|\left(-1\right)^{2}-1\right|=0$ なのでこの点は $C$ 上にもある。つまり $\left(-1,0\right)$ はつねに共有点である。$C$ は $x=\pm1$ で折れ曲がるので、場合分けして残りを探す。`,
            },
            {
              k: "p",
              t: String.raw`**$\left|x\right|\ge1$ のとき**。$\left|x^{2}-1\right|=x^{2}-1$ なので`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-1=2a\left(x+1\right),\qquad\left(x+1\right)\left(x-1\right)=2a\left(x+1\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(x+1\right)\left(x-1-2a\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$x=-1$（これは $\left|x\right|\ge1$ をみたす）と $x=1+2a$ である。$a>0$ より $1+2a>1$ なので、こちらも条件に合う。`,
            },
            {
              k: "p",
              t: String.raw`**$\left|x\right|<1$ のとき**。$\left|x^{2}-1\right|=1-x^{2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`1-x^{2}=2a\left(x+1\right),\qquad\left(1+x\right)\left(1-x\right)=2a\left(1+x\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(1+x\right)\left(1-x-2a\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$x=-1$ は $\left|x\right|<1$ をみたさないので除く。$x=1-2a$ は、$0<a<1$ より $-1<1-2a<1$ をみたすので条件に合う。`,
            },
            { k: "p", t: String.raw`$y$ の値を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}x=1-2a&:\ y=2a\left(2-2a\right)=4a\left(1-a\right)\\ x=1+2a&:\ y=2a\left(2+2a\right)=4a\left(1+a\right)\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<a<1$ のとき $1-2a<1<1+2a$ なので3点は相異なる。よって共有点は`,
            },
            {
              k: "math",
              t: String.raw`\left(-1,0\right),\quad\left(1-2a,\ 4a\left(1-a\right)\right),\quad\left(1+2a,\ 4a\left(1+a\right)\right)`,
            },
            { k: "p", t: String.raw`の3つである。` },
            {
              k: "note",
              t: String.raw`$\left(-1,0\right)$ は $C$ の「とがった点」で、ここでは $\ell$ は $C$ を**またがない**（左右どちらでも $C$ が $\ell$ の上側にある）。実際、$x<-1$ では $x^{2}-1-2a\left(x+1\right)=\left(x+1\right)\left(x-1-2a\right)>0$、$-1<x<1-2a$ では $1-x^{2}-2a\left(x+1\right)=\left(1+x\right)\left(1-2a-x\right)>0$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|x\right|<1$ の場合に出る $x=-1$ は範囲外。ここで重複して数えない。`,
            String.raw`$x=1-2a$ が $\left|x\right|<1$ に入るのは $0<a<1$ のおかげ。$a\ge1$ なら話が変わる。`,
          ],
          check: String.raw`$a$ を $0.001$ 刻みで動かして3点がすべて共有点になることを確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ と $\ell$ で囲まれた2つの部分の面積が等しくなる $a$ の値を求める`,
          answer: String.raw`$a=\sqrt[3]{2}-1$`,
          approach: String.raw`左の部分は $\dfrac43\left(1-a\right)^{3}$、右の部分は $8a^{2}$。等号から $\left(a+1\right)^{3}=2$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の注で見たとおり、$-1<x<1-2a$ では $C$ が $\ell$ の上にある。この区間が囲む部分を $S_{1}$ とする。一方 $1-2a<x<1+2a$ では $\ell$ が $C$ の上にある（下で確かめる）。この部分を $S_{2}$ とする。`,
            },
            {
              k: "p",
              t: String.raw`**$S_{1}$**。$-1\le x\le1-2a$ では $C:y=1-x^{2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`S_{1}=\int_{-1}^{1-2a}\left\{\left(1-x^{2}\right)-2a\left(x+1\right)\right\}dx=\int_{-1}^{1-2a}\left(x+1\right)\left\{\left(1-2a\right)-x\right\}dx`,
            },
            {
              k: "p",
              t: String.raw`である。これは2次の因数分解された形なので、公式 $\displaystyle\int_{\alpha}^{\beta}\left(x-\alpha\right)\left(\beta-x\right)dx=\dfrac{\left(\beta-\alpha\right)^{3}}{6}$ が使える。$\alpha=-1$、$\beta=1-2a$、$\beta-\alpha=2-2a$ なので`,
            },
            {
              k: "math",
              t: String.raw`S_{1}=\frac{\left(2-2a\right)^{3}}{6}=\frac{8\left(1-a\right)^{3}}{6}=\frac43\left(1-a\right)^{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$S_{2}$**。$x=1$ で $C$ の式が変わるので2つに分ける。まず $1-2a\le x\le1$ では`,
            },
            {
              k: "math",
              t: String.raw`2a\left(x+1\right)-\left(1-x^{2}\right)=\left(x+1\right)\left\{x-\left(1-2a\right)\right\}\ge0`,
            },
            { k: "p", t: String.raw`であり、$x=1-2a+s$（$0\le s\le2a$）とおくと` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2a}s\left(2-2a+s\right)ds=\left(2-2a\right)\cdot\frac{\left(2a\right)^{2}}{2}+\frac{\left(2a\right)^{3}}{3}=4a^{2}-\frac43a^{3}`,
            },
            { k: "p", t: String.raw`である。次に $1\le x\le1+2a$ では` },
            {
              k: "math",
              t: String.raw`2a\left(x+1\right)-\left(x^{2}-1\right)=\left(x+1\right)\left\{\left(1+2a\right)-x\right\}\ge0`,
            },
            { k: "p", t: String.raw`であり、$x=1+s$（$0\le s\le2a$）とおくと` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2a}\left(2+s\right)\left(2a-s\right)ds=4a^{2}+\frac43a^{3}`,
            },
            { k: "p", t: String.raw`である。足すと3次の項が消えて` },
            {
              k: "math",
              t: String.raw`S_{2}=\left(4a^{2}-\frac43a^{3}\right)+\left(4a^{2}+\frac43a^{3}\right)=8a^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**等号**。$S_{1}=S_{2}$ より` },
            {
              k: "math",
              t: String.raw`\frac43\left(1-a\right)^{3}=8a^{2},\qquad\left(1-a\right)^{3}=6a^{2}`,
            },
            { k: "p", t: String.raw`である。展開すると` },
            {
              k: "math",
              t: String.raw`1-3a+3a^{2}-a^{3}=6a^{2},\qquad a^{3}+3a^{2}+3a-1=0`,
            },
            { k: "p", t: String.raw`であり、左辺に $2$ を足して引くと` },
            {
              k: "math",
              t: String.raw`\left(a^{3}+3a^{2}+3a+1\right)-2=0,\qquad\left(a+1\right)^{3}=2`,
            },
            { k: "p", t: String.raw`となる。$a+1$ は実数なので` },
            {
              k: "math",
              t: String.raw`a+1=\sqrt[3]{2},\qquad a=\sqrt[3]{2}-1`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt[3]{2}\doteqdot1.2599$ なので $a\doteqdot0.2599$ で、たしかに $0<a<1$ をみたす。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "a = ∛2 − 1（面積が等しくなる値）のとき。ℓ は C のとがった点 (−1, 0) を通り、ほかに x = 1 − 2a と x = 1 + 2a で交わる。左の網が S₁、右の網が S₂ で、この a ではこの 2 つの面積が等しい。",
                view: [-2.4, 2.5, -0.6, 3.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: UPP24, bottom: LIN24, from: -1, to: 1 - 2 * A24B },
                  {
                    k: "fillBetween",
                    top: LIN24,
                    bottom: CUR24,
                    from: 1 - 2 * A24B,
                    to: 1 + 2 * A24B,
                  },
                  { k: "curve", f: CUR24, from: -2.05, to: 2.05 },
                  { k: "seg", a: [-1.7, LIN24(-1.7)], b: [2.5, LIN24(2.5)] },
                  { k: "dot", at: [-1, 0] },
                  { k: "dot", at: [1 - 2 * A24B, LIN24(1 - 2 * A24B)] },
                  { k: "dot", at: [1 + 2 * A24B, LIN24(1 + 2 * A24B)] },
                  { k: "text", at: [-1, -0.08], label: "x = −1", place: "below" },
                  { k: "text", at: [1 - 2 * A24B, -0.08], label: "x = 1 − 2a", place: "below" },
                  { k: "text", at: [1 + 2 * A24B, -0.08], label: "x = 1 + 2a", place: "below" },
                  { k: "text", at: [2.4, LIN24(2.4)], label: "ℓ", place: "above" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$S_{2}=8a^{2}$ がきれいな形になるのは、$x=1$ をまたぐところで3次の項 $\pm\dfrac43a^{3}$ がちょうど打ち消し合うからである。$S_{1}$ のほうは $\dfrac{\left(\beta-\alpha\right)^{3}}{6}$ の公式がそのまま使える。`,
            },
          ],
          pitfalls: [
            String.raw`$S_{2}$ は $x=1$ で $C$ の式が変わるので、1本の積分で書くと誤る。必ず2つに分ける。`,
            String.raw`$a^{3}+3a^{2}+3a-1=0$ を解の公式で解こうとしない。$\left(a+1\right)^{3}$ の形に気づくのが要点で、定数項が $-1$（$+1$ ではない）ことがヒント。`,
            String.raw`$\left(a+1\right)^{3}=2$ の実数解は1つだけ。$a=\sqrt[3]{2}-1$ 以外に答えはない。`,
          ],
          check: String.raw`$a=\sqrt[3]{2}-1$ で数値積分すると $S_{1}=S_{2}=0.5404716$（差 $-4.4\times10^{-16}$）だった。`,
        },
      ],
    },
