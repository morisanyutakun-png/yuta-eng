import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2023年度（令和5年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第4問は問題に図が添えられているが、当サイトでは問題の図は載せず、
 * 解答で必要になる「巻きつけ」の様子だけを自分で描き直している。
 */

/** 第4問の図。糸の全長 $\ell=\tfrac{3\pi}4+1$。巻きついている部分の接点の角を $\theta$ とする。 */
const L23 = (3 * Math.PI) / 4 + 1;
/** 接点の角が $\theta$ のときの $\mathrm{P}$。 */
const PCURVE23 = (th: number): [number, number] => {
  const f = th + 1 - Math.PI / 4;
  return [Math.cos(th) + f * Math.sin(th), Math.sin(th) - f * Math.cos(th)];
};
/** 糸がほどけきったあと、$\mathrm{A}\left(-1,0\right)$ を中心に半径 $\ell$ で回る部分。 */
const ARC23 = (t: number): [number, number] => [-1 + L23 * Math.cos(t), L23 * Math.sin(t)];

export const ncuMed2023: SolutionSet = {
  slug: "ncu-med",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "数列・対数",
      topics: ["和から一般項", "桁数と常用対数", "等差×等比の和"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n}=2\\cdot3^{n-1}$ の和が $n=1,\\ldots,14$ で $3^{n}-1$ と一致した",
          "$b_{15}=430467210$ で $9$ 桁。$\\log_{10}b_{15}=8.6336$ と合う",
          "$T_{n}=\\tfrac{3\\left\\{\\left(2n-1\\right)3^{n}+1\\right\\}}{2}$ が $n=1,\\ldots,14$ で直接の和と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`数列 $\left\{a_{n}\right\}$ の初項から第 $n$ 項までの和 $S_{n}$ が $S_{n}=3^{n}-1$ であるとき、$\left\{a_{n}\right\}$ の一般項を求める`,
          answer: String.raw`$a_{n}=2\cdot3^{n-1}$`,
          approach: String.raw`$a_{1}=S_{1}$、$n\geqq2$ では $a_{n}=S_{n}-S_{n-1}$。最後に $n=1$ でも合うか確かめる。`,
          blocks: [
            { k: "p", t: String.raw`$a_{1}=S_{1}=3-1=2$ である。$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`a_{n}=S_{n}-S_{n-1}=\left(3^{n}-1\right)-\left(3^{n-1}-1\right)=3^{n-1}\left(3-1\right)=2\cdot3^{n-1}`,
            },
            { k: "p", t: String.raw`である。これは $n=1$ のときも $2\cdot3^{0}=2$ で合う。よって` },
            { k: "math", t: String.raw`a_{n}=2\cdot3^{n-1}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=1$ から $14$ まで和を取ると、どれも $3^{n}-1$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$b_{n}=3n\cdot a_{n}$ とするとき、$b_{15}$ は何桁の数かを求める（$\log_{10}3=0.4771$）`,
          answer: String.raw`$9$ 桁`,
          approach: String.raw`$\log_{10}b_{15}$ を求めて、整数部分 $+1$ が桁数。`,
          blocks: [
            { k: "p", t: String.raw`$b_{n}=3n\cdot2\cdot3^{n-1}=2n\cdot3^{n}$ なので` },
            { k: "math", t: String.raw`b_{15}=2\cdot15\cdot3^{15}=30\cdot3^{15}` },
            { k: "p", t: String.raw`である。常用対数をとると` },
            {
              k: "math",
              t: String.raw`\log_{10}b_{15}=\log_{10}30+15\log_{10}3=1+\log_{10}3+15\log_{10}3=1+16\log_{10}3`,
            },
            { k: "p", t: String.raw`で、$\log_{10}3=0.4771$ を入れると` },
            {
              k: "math",
              t: String.raw`\log_{10}b_{15}=1+16\cdot0.4771=1+7.6336=8.6336`,
            },
            {
              k: "p",
              t: String.raw`である。$8<\log_{10}b_{15}<9$ なので $10^{8}<b_{15}<10^{9}$ で、$b_{15}$ は**9桁**である。`,
            },
            {
              k: "note",
              t: String.raw`実際 $b_{15}=430467210$ で、確かに9桁である。`,
            },
          ],
          pitfalls: [
            String.raw`桁数は $\log_{10}$ の整数部分に $1$ を足した値。$8.6336$ から「8桁」としない。`,
          ],
          check: String.raw`$b_{15}=430467210$ を直接計算すると $9$ 桁だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$T_{n}=\displaystyle\sum_{k=1}^{n}b_{k}$ を求める`,
          answer: String.raw`$T_{n}=\dfrac{3\left\{\left(2n-1\right)3^{n}+1\right\}}{2}$`,
          approach: String.raw`$\left(\text{等差}\right)\times\left(\text{等比}\right)$ の和なので、$3$ 倍してずらして引く。`,
          blocks: [
            { k: "p", t: String.raw`$b_{k}=2k\cdot3^{k}$ なので $T_{n}=2\displaystyle\sum_{k=1}^{n}k\cdot3^{k}$ である。$U=\displaystyle\sum_{k=1}^{n}k\cdot3^{k}$ とおくと` },
            {
              k: "math",
              t: String.raw`U=1\cdot3+2\cdot3^{2}+\cdots+n\cdot3^{n}`,
            },
            {
              k: "math",
              t: String.raw`3U=\phantom{1\cdot3+{}}1\cdot3^{2}+\cdots+\left(n-1\right)3^{n}+n\cdot3^{n+1}`,
            },
            { k: "p", t: String.raw`で、辺々引くと` },
            {
              k: "math",
              t: String.raw`-2U=3+3^{2}+\cdots+3^{n}-n\cdot3^{n+1}=\frac{3\left(3^{n}-1\right)}{2}-n\cdot3^{n+1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`U=\frac{n\cdot3^{n+1}}{2}-\frac{3\left(3^{n}-1\right)}{4}=\frac{2n\cdot3^{n+1}-3^{n+1}+3}{4}=\frac{\left(2n-1\right)3^{n+1}+3}{4}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`T_{n}=2U=\frac{\left(2n-1\right)3^{n+1}+3}{2}=\frac{3\left\{\left(2n-1\right)3^{n}+1\right\}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,2,3$ で $6,42,204$ となり、$b_{1}=6$、$b_{1}+b_{2}=6+36=42$、$+162=204$ と合う。`,
            },
          ],
          check: String.raw`$n=1$ から $14$ まで、直接の和と式が一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["じゃんけんの手の数え上げ", "あいこの余事象", "残り人数で場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,\\ldots,6$ で手の出し方 $3^{n}$ 通りを全列挙し、$p_{n}=\\tfrac{n}{3^{n-1}}$、$q_{n}=\\tfrac{3^{n}-3\\cdot2^{n}+6}{3^{n}}$ と一致した",
          "$n=5$ では $p_{5}=\\tfrac5{81}$、$q_{5}=\\tfrac{17}{27}$",
          "2回目に勝者が1人に決まる確率を分数のまま足すと $\\tfrac{125}{729}=0.1714678$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ 人でじゃんけんをするとき、1回目で勝者が1人に決まる確率 $p_{n}$ を求める`,
          answer: String.raw`$p_{n}=\dfrac{n}{3^{n-1}}$`,
          approach: String.raw`勝つ1人を選び、その人の手を決めれば、残り全員の手は自動的に決まる。`,
          blocks: [
            { k: "p", t: String.raw`$n$ 人の手の出し方は全部で $3^{n}$ 通りで、どれも同様に確からしい。` },
            {
              k: "p",
              t: String.raw`勝者が1人に決まるのは、1人だけがある手を出し、残りの $n-1$ 人がその手に負ける手を出す場合である。勝者の選び方が $n$ 通り、その人の手が $3$ 通りで、残りの人の手はこれで決まるから、場合の数は $3n$ 通りである。よって`,
            },
            {
              k: "math",
              t: String.raw`p_{n}=\frac{3n}{3^{n}}=\frac{n}{3^{n-1}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$n=2,\ldots,6$ で全列挙すると $\dfrac23,\dfrac13,\dfrac4{27},\dfrac5{81},\dfrac2{81}$ となり、式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`1回目であいこになる確率 $q_{n}$ を求める`,
          answer: String.raw`$q_{n}=\dfrac{3^{n}-3\cdot2^{n}+6}{3^{n}}=1-\dfrac{2^{n}-2}{3^{n-1}}$`,
          approach: String.raw`あいこでないのは「出た手がちょうど2種類」のとき。そちらを数えて引く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`あいこになるのは「全員が同じ手」か「3種類の手がすべて出る」ときで、まとめると**出た手の種類が2種類でない**ときである。`,
            },
            {
              k: "p",
              t: String.raw`出た手がちょうど2種類になる場合を数える。使う2種類の選び方が $ {}_{3}\mathrm{C}_{2}=3$ 通りで、$n$ 人がその2種類のどちらかを出す出し方が $2^{n}$ 通り、そのうち全員同じになる $2$ 通りを除くと $2^{n}-2$ 通りである。よって`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{あいこでない場合の数}\right)=3\left(2^{n}-2\right)`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`q_{n}=\frac{3^{n}-3\left(2^{n}-2\right)}{3^{n}}=\frac{3^{n}-3\cdot2^{n}+6}{3^{n}}=1-\frac{2^{n}-2}{3^{n-1}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`「出た手が2種類」のときは必ず勝負がつく（片方が勝ち、もう片方が負ける）。勝者が何人かは問わないので、あいこの余事象がちょうどこれになる。`,
            },
          ],
          pitfalls: [
            String.raw`「全員同じ手」もあいこである。2種類の選び方 $3$ 通りに $2^{n}$ を掛けたままだと、全員同じ手の場合を二重に数えてしまう。`,
          ],
          check: String.raw`$n=2,\ldots,6$ で全列挙すると $\dfrac13,\dfrac13,\dfrac{13}{27},\dfrac{17}{27},\dfrac{181}{243}$ となり、式と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`5人でじゃんけんを行い、2回目に勝者が1人に決まる確率を求める`,
          answer: String.raw`$\dfrac{125}{729}$`,
          approach: String.raw`1回目の結果を「勝者 $k$ 人（$k=2,3,4$）」と「あいこ」に分け、2回目の人数ごとに $p$ を掛ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回目に5人のうちちょうど $k$ 人が勝ち残る確率は、勝者の選び方 $ {}_{5}\mathrm{C}_{k}$ 通りと勝者の手 $3$ 通りから`,
            },
            {
              k: "math",
              t: String.raw`\frac{3\cdot{}_{5}\mathrm{C}_{k}}{3^{5}}=\frac{{}_{5}\mathrm{C}_{k}}{81}\qquad\left(k=1,2,3,4\right)`,
            },
            { k: "p", t: String.raw`である。具体的には` },
            {
              k: "steps",
              items: [
                String.raw`$k=1$（1回目で決着）… $\dfrac5{81}$`,
                String.raw`$k=2$ … $\dfrac{10}{81}$`,
                String.raw`$k=3$ … $\dfrac{10}{81}$`,
                String.raw`$k=4$ … $\dfrac5{81}$`,
                String.raw`あいこ … $q_{5}=\dfrac{17}{27}=\dfrac{51}{81}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である（$5+10+10+5+51=81$ で合う）。あいこのときは敗者がいないので、2回目も5人で行う。よって求める確率は`,
            },
            {
              k: "math",
              t: String.raw`\frac{51}{81}p_{5}+\frac{10}{81}p_{2}+\frac{10}{81}p_{3}+\frac5{81}p_{4}`,
            },
            { k: "p", t: String.raw`である。(1) より $p_{2}=\dfrac23$、$p_{3}=\dfrac13$、$p_{4}=\dfrac4{27}$、$p_{5}=\dfrac5{81}$ なので` },
            {
              k: "math",
              t: String.raw`\frac{51}{81}\cdot\frac5{81}+\frac{10}{81}\cdot\frac23+\frac{10}{81}\cdot\frac13+\frac5{81}\cdot\frac4{27}=\frac{255+540+270+60}{6561}=\frac{1125}{6561}`,
            },
            { k: "p", t: String.raw`であり、約分して` },
            { k: "math", t: String.raw`\frac{1125}{6561}=\frac{125}{729}` },
            { k: "p", t: String.raw`である（$0.1714\ldots$）。` },
          ],
          pitfalls: [
            String.raw`「あいこも1回と数える」ので、あいこのときも2回目は5人のままである。人数が減ると思わない。`,
            String.raw`1回目で勝者が1人に決まってしまう場合（$\dfrac5{81}$）は、2回目がないので除く。`,
          ],
          check: String.raw`分数のまま足すと $\dfrac{125}{729}=0.1714678$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["平面の法線ベクトル", "垂線の足", "四面体の体積", "4点が同一平面上にある"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec n=\\left(2,1,2\\right)$ は $\\overrightarrow{\\mathrm{AB}},\\overrightarrow{\\mathrm{AC}}$ のどちらとも内積 $0$",
          "平面は $2x+y+2z=5$ で、$\\mathrm{D}\\left(5,1,-3\\right)$ もこの上にある",
          "$\\mathrm{H}\\left(1,1,1\\right)$ は平面上にあり、$\\overrightarrow{\\mathrm{PH}}$ は $\\vec n$ と平行（外積が $\\vec0$）",
          "$\\left(t,u\\right)=\\left(1,1\\right),\\left(2,3\\right),\\left(0.7,1.9\\right)$ で体積比を直接計算すると $\\tfrac t{2u}$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`座標空間の点 $\mathrm{A}\left(-1,1,3\right)$、$\mathrm{B}\left(2,1,0\right)$、$\mathrm{C}\left(0,3,1\right)$ を含む平面 $\alpha$ に対してベクトル $\vec n=\left(a,1,c\right)$ が垂直であるとき、$a,c$ を求める`,
          answer: String.raw`$a=2$、$c=2$`,
          approach: String.raw`$\vec n$ が $\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ の両方と垂直、という連立をつくる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}=\left(3,0,-3\right),\qquad\overrightarrow{\mathrm{AC}}=\left(1,2,-2\right)`,
            },
            { k: "p", t: String.raw`である。$\vec n\cdot\overrightarrow{\mathrm{AB}}=0$ より` },
            { k: "math", t: String.raw`3a+0-3c=0,\qquad a=c` },
            { k: "p", t: String.raw`である。$\vec n\cdot\overrightarrow{\mathrm{AC}}=0$ より` },
            { k: "math", t: String.raw`a+2-2c=0` },
            { k: "p", t: String.raw`で、$a=c$ を入れると $-c+2=0$、すなわち $c=2$、$a=2$ である。よって` },
            { k: "math", t: String.raw`a=2,\qquad c=2,\qquad\vec n=\left(2,1,2\right)` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\left(2,1,2\right)$ と $\overrightarrow{\mathrm{AB}},\overrightarrow{\mathrm{AC}}$ の内積はどちらも $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{P}\left(5,3,5\right)$ から平面 $\alpha$ に下ろした垂線を $\mathrm{PH}$ とするとき、点 $\mathrm{H}$ の座標を求める`,
          answer: String.raw`$\mathrm{H}\left(1,1,1\right)$`,
          approach: String.raw`$\mathrm{H}=\mathrm{P}+k\vec n$ とおいて、平面の方程式に入れる。`,
          blocks: [
            { k: "p", t: String.raw`平面 $\alpha$ は $\vec n=\left(2,1,2\right)$ を法線にもち $\mathrm{A}\left(-1,1,3\right)$ を通るので` },
            {
              k: "math",
              t: String.raw`2x+y+2z=2\left(-1\right)+1+2\cdot3=5`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{B},\mathrm{C}$ を入れても $4+1+0=5$、$0+3+2=5$ で合う）。`,
            },
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{PH}}$ は $\vec n$ と平行だから $\mathrm{H}=\left(5+2k,\,3+k,\,5+2k\right)$ とおける。これを平面の式に入れると`,
            },
            {
              k: "math",
              t: String.raw`2\left(5+2k\right)+\left(3+k\right)+2\left(5+2k\right)=23+9k=5`,
            },
            { k: "p", t: String.raw`より $k=-2$ である。よって` },
            { k: "math", t: String.raw`\mathrm{H}\left(1,1,1\right)` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$\mathrm{H}\left(1,1,1\right)$ は $2+1+2=5$ で平面上にあり、$\overrightarrow{\mathrm{PH}}=\left(-4,-2,-4\right)=-2\vec n$ で $\vec n$ と平行だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{D}\left(5,1,-3\right)$ と、2点 $\mathrm{Q}\left(2t+5,t+3,2t-4\right)$（$t>0$）、$\mathrm{R}\left(2u+3,u-1,2u\right)$（$u>0$）について、四面体 $\mathrm{QABC}$ と四面体 $\mathrm{RACD}$ の体積比を $t,u$ で表す`,
          answer: String.raw`$\mathrm{QABC}:\mathrm{RACD}=t:2u$`,
          approach: String.raw`$\mathrm{D}$ も平面 $\alpha$ 上にあり、$\mathrm{Q},\mathrm{R}$ はどちらも $\vec n$ 方向に動く。底面積と高さが別々に出せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $\mathrm{D}\left(5,1,-3\right)$ について $2\cdot5+1+2\left(-3\right)=5$ なので、**$\mathrm{D}$ も平面 $\alpha$ 上にある**。つまり $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ は同一平面上にあり、$\triangle\mathrm{ABC}$ も $\triangle\mathrm{ACD}$ も $\alpha$ 上の三角形である。`,
            },
            { k: "p", t: String.raw`また` },
            {
              k: "math",
              t: String.raw`\mathrm{Q}=\left(5,3,-4\right)+t\left(2,1,2\right),\qquad\mathrm{R}=\left(3,-1,0\right)+u\left(2,1,2\right)`,
            },
            { k: "p", t: String.raw`と書けるので、$\mathrm{Q},\mathrm{R}$ はどちらも $\vec n$ 方向に動く点である。$\left|\vec n\right|=3$ で` },
            {
              k: "math",
              t: String.raw`\left(\mathrm{Q}\ \text{と}\ \alpha\ \text{の距離}\right)=\frac{\left|2\left(2t+5\right)+\left(t+3\right)+2\left(2t-4\right)-5\right|}{3}=\frac{\left|9t\right|}{3}=3t`,
            },
            {
              k: "math",
              t: String.raw`\left(\mathrm{R}\ \text{と}\ \alpha\ \text{の距離}\right)=\frac{\left|2\left(2u+3\right)+\left(u-1\right)+2\cdot2u-5\right|}{3}=\frac{\left|9u\right|}{3}=3u`,
            },
            { k: "p", t: String.raw`である（$t>0$、$u>0$）。底面積は外積の大きさから` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\times\overrightarrow{\mathrm{AC}}=\left(6,3,6\right),\qquad\triangle\mathrm{ABC}=\frac{\left|\left(6,3,6\right)\right|}{2}=\frac92`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AC}}\times\overrightarrow{\mathrm{AD}}=\left(-12,-6,-12\right),\qquad\triangle\mathrm{ACD}=\frac{\left|\left(-12,-6,-12\right)\right|}{2}=9`,
            },
            { k: "p", t: String.raw`である（$\overrightarrow{\mathrm{AD}}=\left(6,0,-6\right)$）。よって` },
            {
              k: "math",
              t: String.raw`\left(\mathrm{QABC}\right)=\frac13\cdot\frac92\cdot3t=\frac92t,\qquad\left(\mathrm{RACD}\right)=\frac13\cdot9\cdot3u=9u`,
            },
            { k: "p", t: String.raw`であり` },
            { k: "math", t: String.raw`\mathrm{QABC}:\mathrm{RACD}=\frac92t:9u=t:2u` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{AD}}=\left(6,0,-6\right)=2\overrightarrow{\mathrm{AB}}$ なので、実は $\mathrm{A},\mathrm{B},\mathrm{D}$ は一直線上にあり、$\mathrm{AD}=2\mathrm{AB}$ である。だから $\triangle\mathrm{ACD}=2\triangle\mathrm{ABC}$ で、面積比のほうは外積を計算しなくても分かる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{D}$ が平面 $\alpha$ 上にあることに気づかないと、$\triangle\mathrm{ACD}$ を底面とする高さが別物になってしまう。`,
          ],
          check: String.raw`$\left(t,u\right)=\left(1,1\right),\left(2,3\right),\left(0.7,1.9\right)$ で体積を直接計算して比を取ると、どれも $\dfrac t{2u}$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["伸開線（インボリュート）", "曲線の長さ", "媒介変数表示", "ほどけきったあとの円弧"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "糸の全長は $\\ell=\\tfrac{3\\pi}4+1=3.3561945$",
          "媒介変数表示 $\\mathrm{P}\\left(\\theta\\right)$ は $\\theta=\\tfrac\\pi4$ で $\\left(\\sqrt2,0\\right)$、$\\theta=\\pi$ で $\\left(-1,\\ell\\right)$",
          "$\\tfrac\\pi4<\\theta\\leqq\\pi$ で $y$ 座標はつねに正（$20000$ 点の最小が $8.3\\times10^{-5}$）",
          "伸開線の部分の長さを折れ線で測ると $5.1320207$ で、$\\tfrac{\\ell^{2}-1}2=5.1320207$ と一致した",
          "全体は $10.4039187$ で、$\\tfrac{21\\pi^{2}}{32}+\\tfrac{5\\pi}4=10.4039187$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`原点 $\mathrm{O}$ を中心とし $y\geqq0$ にある半径 $1$ の半円に巻きつけられた糸を、ひっぱりながら動かす。糸の一端は $\mathrm{A}\left(-1,0\right)$ に固定され、動かす端 $\mathrm{P}$ ははじめ $\mathrm{B}\left(\sqrt2,0\right)$ にある。$\mathrm{P}$ が反時計回りに動くとき、次に $x$ 軸に重なるまでに $\mathrm{P}$ が描く曲線 $C$ の長さを求める`,
          answer: String.raw`$\dfrac{21\pi^{2}}{32}+\dfrac{5\pi}{4}$`,
          approach: String.raw`接点の角を $\theta$ として $\mathrm{P}$ を媒介変数表示する。糸がほどけきったあとは $\mathrm{A}$ を中心とする円弧になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**糸の全長**　はじめの状態で、糸は $\mathrm{A}$ から半円に沿って接点 $\mathrm{T}$ まで巻きつき、$\mathrm{T}$ から $\mathrm{B}$ までまっすぐ張られている。$\mathrm{OB}=\sqrt2$、$\mathrm{OT}=1$、$\mathrm{OT}\perp\mathrm{TB}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{TB}=\sqrt{2-1}=1,\qquad\cos\angle\mathrm{TOB}=\frac{\mathrm{OT}}{\mathrm{OB}}=\frac1{\sqrt2},\qquad\angle\mathrm{TOB}=\frac\pi4`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{A}$ は角 $\pi$、$\mathrm{T}$ は角 $\dfrac\pi4$ の位置なので、巻きついている弧の長さは $\pi-\dfrac\pi4=\dfrac{3\pi}4$ である。よって糸の全長は`,
            },
            { k: "math", t: String.raw`\ell=\frac{3\pi}4+1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**媒介変数表示**　接点の角を $\theta$（$\dfrac\pi4\leqq\theta\leqq\pi$）とすると、巻きついている弧の長さは $\pi-\theta$ なので、まっすぐな部分の長さは`,
            },
            {
              k: "math",
              t: String.raw`f\left(\theta\right)=\ell-\left(\pi-\theta\right)=\theta+1-\frac\pi4`,
            },
            {
              k: "p",
              t: String.raw`である。接点は $\left(\cos\theta,\sin\theta\right)$ で、まっすぐな部分は半径に垂直にほどける向きへ出るから、その単位ベクトルは $\left(\sin\theta,-\cos\theta\right)$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(\theta\right)=\left(\cos\theta+f\left(\theta\right)\sin\theta,\ \sin\theta-f\left(\theta\right)\cos\theta\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\theta=\dfrac\pi4$ で $\left(\sqrt2,0\right)$ になり、$\mathrm{B}$ と合う）。$f'\left(\theta\right)=1$ に注意して微分すると`,
            },
            {
              k: "math",
              t: String.raw`\frac{d\mathrm{P}}{d\theta}=\left(-\sin\theta+\sin\theta+f\cos\theta,\ \cos\theta-\cos\theta+f\sin\theta\right)=f\left(\theta\right)\left(\cos\theta,\sin\theta\right)`,
            },
            { k: "p", t: String.raw`となり、速さは $\left|\dfrac{d\mathrm{P}}{d\theta}\right|=f\left(\theta\right)>0$ である。` },
            {
              k: "p",
              t: String.raw`**$x$ 軸に戻らないこと**　$y$ 座標の微分は $f\left(\theta\right)\sin\theta$ で、$\dfrac\pi4<\theta<\pi$ では正である。$\theta=\dfrac\pi4$ で $y=0$ だから、$\dfrac\pi4<\theta\leqq\pi$ では $y>0$ である。つまり巻きついている間は $x$ 軸に戻らない。`,
            },
            {
              k: "p",
              t: String.raw`**巻きついている部分の長さ**　$\theta$ が $\dfrac\pi4$ から $\pi$ まで動く間の長さは`,
            },
            {
              k: "math",
              t: String.raw`\int_{\frac\pi4}^{\pi}f\left(\theta\right)d\theta=\left[\frac{f\left(\theta\right)^{2}}{2}\right]_{\frac\pi4}^{\pi}=\frac{\ell^{2}-1}{2}`,
            },
            { k: "p", t: String.raw`である（$f\left(\dfrac\pi4\right)=1$、$f\left(\pi\right)=\ell$）。` },
            {
              k: "p",
              t: String.raw`**ほどけきったあと**　$\theta=\pi$ で接点は $\mathrm{A}$ に達し、糸は全部ほどけて $\mathrm{A}$ から出るまっすぐな線分になる。このとき $\mathrm{P}=\left(-1,\ell\right)$、つまり $\mathrm{A}$ の真上である。以後 $\mathrm{P}$ は $\mathrm{A}$ を中心とする半径 $\ell$ の円を反時計回りに回り、$x$ 軸に重なるのは4分の1周した点 $\left(-1-\ell,0\right)$ である。その長さは $\dfrac\pi2\ell$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "半径1の上半円と、はじめの糸（A から半円に沿って接点 T まで、T から B まで直線）。P の描く曲線は、B から半円に巻きついた糸がほどけていく伸開線と、ほどけきったあと A を中心に回る4分の1円弧からなる。",
                view: [-4.9, 2.7, -0.7, 3.95],
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: Math.PI,
                  },
                  { k: "param", f: PCURVE23, from: Math.PI / 4, to: Math.PI },
                  { k: "param", f: ARC23, from: Math.PI / 2, to: Math.PI },
                  { k: "seg", a: [Math.SQRT1_2, Math.SQRT1_2], b: [Math.SQRT2, 0], dash: true },
                  { k: "dot", at: [-1, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [Math.SQRT2, 0], label: "B", place: "below-right" },
                  { k: "dot", at: [Math.SQRT1_2, Math.SQRT1_2], label: "T", place: "above-right" },
                  { k: "dot", at: [-1, L23] },
                  { k: "dot", at: [-1 - L23, 0], label: "終点", place: "below" },
                ],
              },
            },
            { k: "p", t: String.raw`**合計**　$\ell=\dfrac{3\pi}4+1$ なので` },
            {
              k: "math",
              t: String.raw`\ell^{2}-1=\frac{9\pi^{2}}{16}+\frac{3\pi}{2},\qquad\frac{\ell^{2}-1}{2}=\frac{9\pi^{2}}{32}+\frac{3\pi}{4}`,
            },
            {
              k: "math",
              t: String.raw`\frac\pi2\ell=\frac{3\pi^{2}}{8}+\frac\pi2=\frac{12\pi^{2}}{32}+\frac\pi2`,
            },
            { k: "p", t: String.raw`である。足して` },
            {
              k: "math",
              t: String.raw`\left(C\ \text{の長さ}\right)=\frac{21\pi^{2}}{32}+\frac{3\pi}{4}+\frac\pi2=\frac{21\pi^{2}}{32}+\frac{5\pi}{4}`,
            },
            { k: "p", t: String.raw`である（$10.40\ldots$）。` },
          ],
          pitfalls: [
            String.raw`糸がほどけきったあとも $\mathrm{P}$ は動き続ける。伸開線の部分だけで止めると $x$ 軸に戻らない。`,
            String.raw`速さが $f\left(\theta\right)$ になるので、長さは $\displaystyle\int f\,d\theta$ であり、根号の計算はいらない。`,
          ],
          check: String.raw`折れ線で測ると伸開線の部分は $5.1320207$、全体は $10.4039187$ で、$\dfrac{21\pi^{2}}{32}+\dfrac{5\pi}{4}=10.4039187$ と一致した。`,
        },
      ],
    },
  ],
};
