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
          "2つの面積を数値積分すると $S_{1}=\\tfrac43\\left(1-a\\right)^{3}$、$S_{2}=8a^{2}$ と小数第7位まで一致し、$a=\\sqrt[3]{2}-1=0.2599210$ では $S_{1}=S_{2}=0.5404716$（差 $3.3\\times10^{-16}$）だった",
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
          check: String.raw`$a=\sqrt[3]{2}-1$ で数値積分すると $S_{1}=S_{2}=0.5404716$（差 $3.3\times10^{-16}$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["空間の直線", "ねじれの位置", "垂直条件", "存在と一意性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$z$ 軸とねじれの位置にある直線を $2$ 万本無作為に作り、求めた $t,s$ から $\\mathrm{P},\\mathrm{Q}$ を計算すると、$\\overrightarrow{\\mathrm{QP}}$ はつねに $z$ 軸の方向とも $\\ell$ の方向とも直交し、$\\mathrm{P}\\ne\\mathrm{Q}$ だった（違反 $0$ 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`座標空間内の直線 $\ell$ と $z$ 軸はねじれの位置にあるとする。$\ell$ と $z$ 軸の両方に直交する直線がただ1つ存在することを示す`,
          answer: String.raw`$\ell$ 上の点 $\mathrm{P}$ と $z$ 軸上の点 $\mathrm{Q}$ で $\overrightarrow{\mathrm{QP}}$ が両方向に垂直になるものを探すと、$\left(d_{1},d_{2}\right)\ne\left(0,0\right)$ から $t,s$ がそれぞれただ1通りに定まる`,
          approach: String.raw`求める直線は両方と交わるので、交点の組 $\left(\mathrm{P},\mathrm{Q}\right)$ を決める問題に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z$ 軸の方向ベクトルを $\vec e=\left(0,0,1\right)$ とし、$z$ 軸上の点を $\mathrm{Q}\left(0,0,s\right)$ と書く。$\ell$ 上の1点を $\mathrm{A}\left(a_{1},a_{2},a_{3}\right)$、方向ベクトルを $\vec d=\left(d_{1},d_{2},d_{3}\right)$（$\vec d\ne\vec0$）として、$\ell$ 上の点を`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(a_{1}+td_{1},\ a_{2}+td_{2},\ a_{3}+td_{3}\right)`,
            },
            { k: "p", t: String.raw`と書く。` },
            {
              k: "p",
              t: String.raw`**ねじれの位置から出る条件**。$\ell$ と $z$ 軸は平行でないので $\vec d$ は $\vec e$ の実数倍ではなく`,
            },
            {
              k: "math",
              t: String.raw`\left(d_{1},d_{2}\right)\ne\left(0,0\right),\qquad\text{つまり}\ d_{1}^{2}+d_{2}^{2}>0`,
            },
            {
              k: "p",
              t: String.raw`である。また $\ell$ と $z$ 軸は交わらないので、どの $t,s$ でも $\mathrm{P}\ne\mathrm{Q}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**求める直線の言いかえ**。2直線が「直交する」とは垂直に交わることなので、求める直線 $m$ は $z$ 軸とある点 $\mathrm{Q}$ で、$\ell$ とある点 $\mathrm{P}$ で交わる。$\mathrm{P}\ne\mathrm{Q}$ なので $m$ は直線 $\mathrm{PQ}$ であり、その方向は $\overrightarrow{\mathrm{QP}}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{QP}}\cdot\vec e=0\quad\text{かつ}\quad\overrightarrow{\mathrm{QP}}\cdot\vec d=0\quad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`をみたす $\left(t,s\right)$ をすべて求めればよい。逆に $\left(\ast\right)$ をみたす $\left(t,s\right)$ があれば、直線 $\mathrm{PQ}$ は条件をみたす直線である。`,
            },
            { k: "p", t: String.raw`**$\left(\ast\right)$ を解く**。` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{QP}}=\left(a_{1}+td_{1},\ a_{2}+td_{2},\ a_{3}+td_{3}-s\right)`,
            },
            { k: "p", t: String.raw`なので、1つめの条件は` },
            {
              k: "math",
              t: String.raw`a_{3}+td_{3}-s=0,\qquad s=a_{3}+td_{3}`,
            },
            {
              k: "p",
              t: String.raw`である。つまり $t$ が決まれば $s$ はただ1通りに決まる。2つめの条件は、第3成分が $0$ であることを使って`,
            },
            {
              k: "math",
              t: String.raw`d_{1}\left(a_{1}+td_{1}\right)+d_{2}\left(a_{2}+td_{2}\right)=0`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`t\left(d_{1}^{2}+d_{2}^{2}\right)=-\left(a_{1}d_{1}+a_{2}d_{2}\right)`,
            },
            { k: "p", t: String.raw`である。$d_{1}^{2}+d_{2}^{2}>0$ なので` },
            {
              k: "math",
              t: String.raw`t=-\frac{a_{1}d_{1}+a_{2}d_{2}}{d_{1}^{2}+d_{2}^{2}}`,
            },
            {
              k: "p",
              t: String.raw`とただ1通りに定まり、続けて $s=a_{3}+td_{3}$ もただ1通りに定まる。`,
            },
            {
              k: "p",
              t: String.raw`**まとめ**。$\left(\ast\right)$ をみたす $\left(t,s\right)$ はちょうど1組である。この $t,s$ に対して $\mathrm{P}\ne\mathrm{Q}$（ねじれの位置だから）なので直線 $\mathrm{PQ}$ が定まり、これは $z$ 軸とも $\ell$ とも垂直に交わる。逆に条件をみたす直線は必ずこの $\left(t,s\right)$ から来るので、そのような直線はこの1本だけである。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{QP}}$ の第3成分を $0$ にする、という1つめの条件が「$z$ 軸と直交する」をそのまま座標で書いたもので、ここで $s$ が消費される。残った2つめの条件が $t$ だけの1次方程式になり、係数 $d_{1}^{2}+d_{2}^{2}$ が $0$ でないことが「平行でない」から出る。ねじれの位置という条件の2つの中身（平行でない・交わらない）が、それぞれ一意性と $\mathrm{P}\ne\mathrm{Q}$ に効いている。`,
            },
          ],
          pitfalls: [
            String.raw`「直交する」を「垂直なだけ（交わらなくてよい）」と読むと、答えは無数になる。日本語の「2直線が直交する」は垂直に交わること。`,
            String.raw`$d_{1}^{2}+d_{2}^{2}>0$ を言わないと $t$ について割れない。ここが「平行でない」の使いどころ。`,
            String.raw`$\mathrm{P}=\mathrm{Q}$ だと直線 $\mathrm{PQ}$ が定まらない。交わらないことを使って排除する。`,
          ],
          check: String.raw`無作為な $2$ 万本で、求めた $\mathrm{P},\mathrm{Q}$ がつねに条件をみたした。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数・数列",
      topics: ["素数", "数学的帰納法", "不等式の証明", "3の倍数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "小さい順に素数を並べると $2,3,5,7,11,13,17,19,23,29,31,37,41,43,47$ で $p_{15}=47$ だった",
          "$n=12$ から $3000$ まで $p_{n}>3n$ を直接確かめると、破れる $n$ は $1$ つもなかった。逆に $n=1,\\ldots,11$ では $1$ つも成り立たなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`素数を小さい順に並べて得られる数列を $p_{1},p_{2},\ldots,p_{n},\ldots$ とする。$p_{15}$ の値を求める`,
          answer: String.raw`$p_{15}=47$`,
          approach: String.raw`$50$ までの素数を順に書き出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`素数を小さい順に書くと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}&p_{1},\ldots,p_{5}=2,\ 3,\ 5,\ 7,\ 11\\ &p_{6},\ldots,p_{10}=13,\ 17,\ 19,\ 23,\ 29\\ &p_{11},\ldots,p_{15}=31,\ 37,\ 41,\ 43,\ 47\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$2$ から $47$ までで、$4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,\ldots$ は合成数として除く）。よって`,
            },
            {
              k: "math",
              t: String.raw`p_{15}=47`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$50$ 以下の素数は $15$ 個（$2,3,5,7,11,13,17,19,23,29,31,37,41,43,47$）である。$p_{16}=53$ なので「$50$ 以下に $15$ 個」と覚えておくと速い。`,
            },
          ],
          pitfalls: [
            String.raw`$1$ は素数ではない。$p_{1}=2$ から数え始める。`,
            String.raw`$49=7^{2}$ は素数ではない。$45,49$ あたりで取り違えやすい。`,
          ],
          check: String.raw`計算機で素数を並べても $15$ 番目は $47$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$n\ge12$ のとき、不等式 $p_{n}>3n$ が成り立つことを示す`,
          answer: String.raw`$n=12$ で $p_{12}=37>36$。$p_{n}>3n$ を仮定すると、$p_{n}\ge3n+2$ なら $p_{n+1}\ge p_{n}+2\ge3n+4$、$p_{n}=3n+1$ なら $p_{n+1}\ge3n+3$ だが $3n+3$ は $3$ の倍数で素数でないので $p_{n+1}\ge3n+4$。どちらも $p_{n+1}>3\left(n+1\right)$`,
          approach: String.raw`数学的帰納法。$p_{n}=3n+1$ のときだけ「$3n+3$ は素数でない」を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n\ge12$ についての数学的帰納法で示す。`,
            },
            {
              k: "p",
              t: String.raw`**出発点**。(1) の並びより $p_{12}=37$ で、$3\cdot12=36$ だから`,
            },
            {
              k: "math",
              t: String.raw`p_{12}=37>36=3\cdot12`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**引き継ぎ**。$n\ge12$ で $p_{n}>3n$ が成り立つとする。$p_{n}$ は整数なので`,
            },
            {
              k: "math",
              t: String.raw`p_{n}\ge3n+1`,
            },
            {
              k: "p",
              t: String.raw`である。また $n\ge12$ より $p_{n}\ge p_{12}=37>2$ なので $p_{n}$ は奇数であり、$p_{n+1}$ も奇数で $p_{n+1}>p_{n}$ だから`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}\ge p_{n}+2`,
            },
            { k: "p", t: String.raw`である。ここで $p_{n}$ の大きさで2つに分ける。` },
            {
              k: "steps",
              items: [
                String.raw`**$p_{n}\ge3n+2$ のとき**。$p_{n+1}\ge p_{n}+2\ge3n+4>3n+3=3\left(n+1\right)$ である。`,
                String.raw`**$p_{n}=3n+1$ のとき**。$p_{n+1}\ge p_{n}+2=3n+3$ である。ところが $3n+3=3\left(n+1\right)$ は $3$ の倍数で、$n\ge12$ より $3n+3\ge39>3$ だから素数ではない。よって $p_{n+1}\ne3n+3$ であり $p_{n+1}\ge3n+4>3\left(n+1\right)$ である。`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらの場合も $p_{n+1}>3\left(n+1\right)$ である。したがって帰納法により、$n\ge12$ のすべてで $p_{n}>3n$ が成り立つ。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$n=12$ はちょうど $p_{12}=37=3\cdot12+1$ で、2つめの場合にあたる。実際 $p_{13}=41=3\cdot13+2$ で、$3\cdot13=39$ は素数でないからひとつ飛ばされている。$n\le11$ では $p_{n}>3n$ は1つも成り立たない（$p_{11}=31<33$）ので、$12$ という境目は動かせない。`,
            },
          ],
          alts: [
            {
              title: "$6$ で割った余りで押す",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$5$ 以上の素数は $6$ で割ると $1$ か $5$ 余る。$n\ge12$ では $p_{n}\ge37$ なので、$p_{n}$ と $p_{n+1}$ はこの形である。`,
                },
                {
                  k: "p",
                  t: String.raw`$p_{n}\ge3n+1$ とすると、$p_{n+1}$ は $p_{n}$ より大きい $6k\pm1$ の形の数なので、$3n+1$ と $3n+3$ のあいだに「$6$ で割って $1$ か $5$ 余る数」がどれだけあるかを数えればよい。$3n+2$ と $3n+3$ のうち少なくとも一方は $6$ の倍数か $3$ の倍数になるため、結局 $p_{n+1}\ge3n+4$ が出る。`,
                },
                {
                  k: "p",
                  t: String.raw`筋は同じだが、場合分けが $n$ の偶奇にも依存して増える。本解の「$3$ の倍数は素数でない」1点押しのほうが短い。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$p_{n+1}\ge p_{n}+1$ では足りない。$p_{n}$ が奇数であることから $+2$ を取るのが鍵。`,
            String.raw`$p_{n}\ge3n+1$ だけから $p_{n+1}\ge3n+3$ しか出ず、$>3n+3$ には届かない。$3n+3$ が素数でないことを使ってもう $1$ 押す。`,
            String.raw`$3n+3>3$ であることをことわる。$n$ が小さければ $3n+3$ が $3$ そのもので素数になりうるからで、$n\ge12$ がここで効く。`,
          ],
          check: String.raw`$n=12$ から $3000$ まで直接確かめて、破れる $n$ は $1$ つもなかった。`,
        },
      ],
    },
  ],
};
