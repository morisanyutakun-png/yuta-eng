import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2021年度（令和3年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の $f\left(x\right)=\left(x-1\right)\sqrt{\left|x-2\right|}$。 */
const F21 = (x: number): number => (x - 1) * Math.sqrt(Math.abs(x - 2));
/** 第1問(3) の接点。$t^{2}+t-4=0$ の正の解。 */
const T21 = (-1 + Math.sqrt(17)) / 2;

/** 第4問(4) の $\theta=\tfrac{7}{12}\pi$。 */
const TH21 = (7 * Math.PI) / 12;
/** 第4問(3) の $r=\tfrac7{3+\sqrt2\cos\left(\theta+\pi/6\right)}$ が描く点。 */
const ELL21 = (t: number): [number, number] => {
  const r = 7 / (3 + Math.SQRT2 * Math.cos(t + Math.PI / 6));
  return [r * Math.cos(t), r * Math.sin(t)];
};

/** 第2問の曲線。 */
const C21 = (t: number): [number, number] => [2 * Math.SQRT2 * t * t, (t - 1) ** 2];

export const nitech2021: SolutionSet = {
  slug: "nitech",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["絶対値のついた関数", "尖点での増減", "置換積分", "原点を通る接線"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "極大値は $f\\left(\\tfrac53\\right)=0.3849002$ で $\\tfrac{2\\sqrt3}9=0.3849002$ と一致し、$f\\left(2\\right)=0$",
          "数値微分すると $x=1,1.6$ で正、$x=1.8$ で負、$x=2.5$ で正になり、増減表と合った",
          "面積を数値積分すると $0.2666667$ で $\\tfrac4{15}=0.2666667$、接点 $t=\\tfrac{-1+\\sqrt{17}}2=1.5615528$ で $\\tfrac{f\\left(t\\right)}t$ と $f'\\left(t\\right)$ がどちらも $0.2381182$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\left(x-1\right)\sqrt{\left|x-2\right|}$ の増減を調べて極値を求める`,
          answer: String.raw`$x=\dfrac53$ で極大値 $\dfrac{2\sqrt3}{9}$、$x=2$ で極小値 $0$`,
          approach: String.raw`$x<2$ と $x>2$ で分けて微分する。$x=2$ では微分できないが、前後の符号で極小と分かる。`,
          blocks: [
            { k: "p", t: String.raw`**$x>2$ のとき** $f\left(x\right)=\left(x-1\right)\sqrt{x-2}$ で` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\sqrt{x-2}+\frac{x-1}{2\sqrt{x-2}}=\frac{2\left(x-2\right)+\left(x-1\right)}{2\sqrt{x-2}}=\frac{3x-5}{2\sqrt{x-2}}`,
            },
            { k: "p", t: String.raw`である。$x>2$ では $3x-5>1>0$ なので $f'>0$、つまり増加する。` },
            { k: "p", t: String.raw`**$x<2$ のとき** $f\left(x\right)=\left(x-1\right)\sqrt{2-x}$ で` },
            {
              k: "math",
              t: String.raw`f'\left(x\right)=\sqrt{2-x}-\frac{x-1}{2\sqrt{2-x}}=\frac{2\left(2-x\right)-\left(x-1\right)}{2\sqrt{2-x}}=\frac{5-3x}{2\sqrt{2-x}}`,
            },
            {
              k: "p",
              t: String.raw`である。$f'=0$ は $x=\dfrac53$ で、$x<\dfrac53$ で正、$\dfrac53<x<2$ で負である。`,
            },
            { k: "p", t: String.raw`まとめると、$f$ は $x\leqq\dfrac53$ で増加、$\dfrac53\leqq x\leqq2$ で減少、$x\geqq2$ で増加する。よって` },
            {
              k: "math",
              t: String.raw`\text{極大値}\ f\left(\frac53\right)=\frac23\sqrt{\frac13}=\frac{2}{3\sqrt3}=\frac{2\sqrt3}{9},\qquad\text{極小値}\ f\left(2\right)=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$x\to2-0$ で $f'\to-\infty$、$x\to2+0$ で $f'\to+\infty$ なので、$x=2$ では微分できない（尖点）。それでも前後で減少から増加に変わるので極小値である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) のグラフ。x = 5/3 で極大、x = 2 は尖った形の極小で値は 0。x = 1 でも x 軸と交わる。塗った部分が (2) の面積で、点線は (3) の原点を通る接線。接点は極大になる点のすぐ左。",
                view: [-1.0, 3.6, -1.6, 2.4],
                items: [
                  { k: "fillBetween", top: F21, bottom: () => 0, from: 1, to: 2 },
                  { k: "curve", f: F21, from: 0, to: 3.1 },
                  { k: "seg", a: [0, 0], b: [3.1, (F21(T21) / T21) * 3.1], dash: true },
                  { k: "dot", at: [T21, F21(T21)] },
                  { k: "dot", at: [5 / 3, F21(5 / 3)], label: "極大", place: "above" },
                  { k: "dot", at: [2, 0], label: "極小", place: "below-right" },
                  { k: "dot", at: [1, 0] },
                  { k: "text", at: [2.6, (F21(T21) / T21) * 2.6], label: "接線", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=2$ の前後で式が変わる。まとめて微分しようとしない。`,
          ],
          check: String.raw`数値微分すると $x=1,1.6$ で正、$x=1.8$ で負、$x=2.5$ で正になり、増減表と合った。`,
        },
        {
          label: "(2)",
          task: String.raw`曲線 $C\colon y=f\left(x\right)$ と $x$ 軸で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac4{15}$`,
          approach: String.raw`$f=0$ は $x=1,2$。その間で $f>0$。$u=2-x$ で置換する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f\left(x\right)=0$ となるのは $x=1$ と $x=2$ である。$1<x<2$ では $x-1>0$、$\sqrt{2-x}>0$ なので $f>0$ で、ここが囲まれた部分である（$x<1$ では $f<0$ だが $x$ 軸と交わるのは $x=1$ だけなので、囲まれた図形はできない）。`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{1}^{2}\left(x-1\right)\sqrt{2-x}\,dx`,
            },
            { k: "p", t: String.raw`である。$u=2-x$ とおくと $x-1=1-u$、$dx=-du$ で、$x:1\to2$ のとき $u:1\to0$ だから` },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{1}\left(1-u\right)\sqrt u\,du=\int_{0}^{1}\left(u^{\frac12}-u^{\frac32}\right)du=\frac23-\frac25=\frac4{15}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値積分すると $0.2666667$ で、$\dfrac4{15}=0.2666667$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`原点を通る直線 $\ell$ が $C$ 上の点 $\left(t,f\left(t\right)\right)$ で $C$ に接している。このような $t$ のうち $1<t<2$ を満たすものをすべて求める`,
          answer: String.raw`$t=\dfrac{-1+\sqrt{17}}{2}$`,
          approach: String.raw`原点を通る接線なので、接線の式 $y=f\left(t\right)+f'\left(t\right)\left(x-t\right)$ に $x=0,y=0$ を入れて $f\left(t\right)=t\,f'\left(t\right)$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`接線は $y=f\left(t\right)+f'\left(t\right)\left(x-t\right)$ で、これが原点を通るから`,
            },
            { k: "math", t: String.raw`f\left(t\right)=t\,f'\left(t\right)` },
            { k: "p", t: String.raw`である。$1<t<2$ では (1) より` },
            {
              k: "math",
              t: String.raw`\left(t-1\right)\sqrt{2-t}=t\cdot\frac{5-3t}{2\sqrt{2-t}}`,
            },
            { k: "p", t: String.raw`である。両辺に $2\sqrt{2-t}>0$ を掛けると` },
            {
              k: "math",
              t: String.raw`2\left(t-1\right)\left(2-t\right)=t\left(5-3t\right)`,
            },
            { k: "p", t: String.raw`で、展開して整理すると` },
            {
              k: "math",
              t: String.raw`-2t^{2}+6t-4=5t-3t^{2},\qquad t^{2}+t-4=0`,
            },
            { k: "p", t: String.raw`である。よって $t=\dfrac{-1\pm\sqrt{17}}{2}$ で、$1<t<2$ を満たすのは` },
            {
              k: "math",
              t: String.raw`t=\frac{-1+\sqrt{17}}{2}=1.561\ldots`,
            },
            { k: "p", t: String.raw`だけである（もう一方は負）。` },
          ],
          pitfalls: [
            String.raw`$\sqrt{17}=4.12\ldots$ なので $\dfrac{-1+\sqrt{17}}2=1.56\ldots$ が確かに $1<t<2$ に入る。範囲の確認を忘れない。`,
          ],
          check: String.raw`$t=1.5615528$ で $\dfrac{f\left(t\right)}t$ と $f'\left(t\right)$ がどちらも $0.2381182$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "媒介変数表示・積分法",
      topics: ["距離の2乗の最小", "媒介変数のままの面積", "軸をずらした回転体", "断面が円板になる場合"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{OP}^{2}=8t^{4}+\\left(t-1\\right)^{4}$ を $0.000001$ 刻みで走査すると最小は $t=0.333333$ で、距離は $0.5443311$、$\\tfrac{2\\sqrt6}9=0.5443311$ と一致した",
          "面積を数値積分すると $0.4714045$ で $\\tfrac{\\sqrt2}3=0.4714045$",
          "体積を数値積分すると $34.9506791$ で $\\tfrac{118\\sqrt2\\pi}{15}=34.9506791$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C\colon x=2\sqrt2\,t^{2}$、$y=\left(t-1\right)^{2}$（$-1\leqq t\leqq1$）上の点 $\mathrm{P}$ と原点 $\mathrm{O}$ との距離の最小値 $d$ を求める`,
          answer: String.raw`$d=\dfrac{2\sqrt6}{9}$`,
          approach: String.raw`$\mathrm{OP}^{2}$ を $t$ の関数にして微分。$3$ 乗の式が $\left(2t\right)^{3}=\left(1-t\right)^{3}$ の形にまとまる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\mathrm{OP}^{2}=\left(2\sqrt2\,t^{2}\right)^{2}+\left(t-1\right)^{4}=8t^{4}+\left(t-1\right)^{4}`,
            },
            { k: "p", t: String.raw`である。$g\left(t\right)=8t^{4}+\left(t-1\right)^{4}$ とおくと` },
            {
              k: "math",
              t: String.raw`g'\left(t\right)=32t^{3}+4\left(t-1\right)^{3}`,
            },
            { k: "p", t: String.raw`で、$g'=0$ は $8t^{3}=-\left(t-1\right)^{3}$、つまり` },
            {
              k: "math",
              t: String.raw`\left(2t\right)^{3}=\left(1-t\right)^{3}`,
            },
            {
              k: "p",
              t: String.raw`である。実数の3乗は1対1なので $2t=1-t$、$t=\dfrac13$ だけが解である。$g'$ は $t<\dfrac13$ で負、$t>\dfrac13$ で正なので、$t=\dfrac13$ で最小になる。`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac13\right)=8\cdot\frac1{81}+\left(-\frac23\right)^{4}=\frac8{81}+\frac{16}{81}=\frac{24}{81}=\frac8{27}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`d=\sqrt{\frac8{27}}=\frac{2\sqrt2}{3\sqrt3}=\frac{2\sqrt6}{9}`,
            },
            { k: "p", t: String.raw`である（端点では $g\left(-1\right)=24$、$g\left(1\right)=8$ で、どちらも大きい）。` },
          ],
          pitfalls: [
            String.raw`$32t^{3}+4\left(t-1\right)^{3}=0$ を展開して3次方程式にすると大変。$\left(2t\right)^{3}=\left(1-t\right)^{3}$ の形にまとめる。`,
          ],
          check: String.raw`$0.000001$ 刻みで走査すると最小は $t=0.333333$ で、距離は $0.5443311$、$\dfrac{2\sqrt6}9=0.5443311$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`曲線 $C$ と $x$ 軸および $y$ 軸で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{\sqrt2}{3}$`,
          approach: String.raw`$t$ が $0$ から $1$ まで動く枝が $\left(0,1\right)$ から $\left(2\sqrt2,0\right)$ へ下りてくる。その下の部分を $\displaystyle\int y\,dx$ で出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=-1,0,1$ での点は順に $\left(2\sqrt2,4\right)$、$\left(0,1\right)$、$\left(2\sqrt2,0\right)$ である。$x$ 軸と $y$ 軸に囲まれる部分を作るのは、$y$ 軸上の点 $\left(0,1\right)$ から $x$ 軸上の点 $\left(2\sqrt2,0\right)$ へ向かう枝、つまり $0\leqq t\leqq1$ の部分である。`,
            },
            {
              k: "p",
              t: String.raw`この枝では $x=2\sqrt2\,t^{2}$ が増加するので、$y$ を $x$ の関数と見て`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{2\sqrt2}y\,dx=\int_{0}^{1}\left(t-1\right)^{2}\cdot4\sqrt2\,t\,dt`,
            },
            { k: "p", t: String.raw`である（$dx=4\sqrt2\,t\,dt$）。展開すると` },
            {
              k: "math",
              t: String.raw`S=4\sqrt2\int_{0}^{1}\left(t^{3}-2t^{2}+t\right)dt=4\sqrt2\left(\frac14-\frac23+\frac12\right)=4\sqrt2\cdot\frac1{12}=\frac{\sqrt2}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 C。t = −1 で (2√2, 4)、t = 0 で (0, 1)、t = 1 で (2√2, 0) を通る。下の枝と2つの軸で囲む部分を塗ってある。点線の直線 y = 1 は (3) の回転軸。",
                view: [-1.6, 4.6, -0.75, 4.55],
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0, 0],
                      ...Array.from({ length: 41 }, (_, i): [number, number] => C21(i / 40)),
                      [2 * Math.SQRT2, 0],
                    ],
                  },
                  { k: "param", f: C21, from: -1, to: 1 },
                  { k: "seg", a: [-1.5, 1], b: [4.5, 1], dash: true },
                  { k: "dot", at: [0, 1], label: "t = 0", place: "above-left" },
                  { k: "dot", at: [2 * Math.SQRT2, 0], label: "t = 1", place: "below-right" },
                  { k: "dot", at: [2 * Math.SQRT2, 4], label: "t = −1", place: "above-right" },
                  { k: "text", at: [3.7, 1], label: "y = 1", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$C$ は $x$ について1価でない（上下2つの枝がある）。軸と囲むのは下の枝だけ。`,
          ],
          check: String.raw`数値積分すると $0.4714045$ で、$\dfrac{\sqrt2}3=0.4714045$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`曲線 $C$ と直線 $x=2\sqrt2$ で囲まれる図形を直線 $y=1$ のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{118\sqrt2}{15}\pi$`,
          approach: String.raw`$x$ を決めると $t=\pm s$ の2点が対応する。断面は $y=1$ をまたぐので円板になり、半径は遠いほうの枝で決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=2\sqrt2\,t^{2}$ なので、$0\leqq x\leqq2\sqrt2$ に対して $s=\sqrt{\dfrac{x}{2\sqrt2}}$（$0\leqq s\leqq1$）とおくと $t=\pm s$ の2点が対応し、$y$ の値は`,
            },
            {
              k: "math",
              t: String.raw`t=-s\colon\ y=\left(s+1\right)^{2},\qquad t=s\colon\ y=\left(1-s\right)^{2}`,
            },
            { k: "p", t: String.raw`である。回転軸 $y=1$ からの距離は` },
            {
              k: "math",
              t: String.raw`\left(s+1\right)^{2}-1=s^{2}+2s,\qquad1-\left(1-s\right)^{2}=2s-s^{2}`,
            },
            {
              k: "p",
              t: String.raw`で、どちらも $0\leqq s\leqq1$ で $0$ 以上である。つまり図形の断面は $y=1$ をまたいでいるので、回すと**円板**になり、その半径は遠いほうの距離である。差は`,
            },
            {
              k: "math",
              t: String.raw`\left(s^{2}+2s\right)-\left(2s-s^{2}\right)=2s^{2}\geqq0`,
            },
            { k: "p", t: String.raw`なので、半径は $s^{2}+2s$ である。したがって` },
            {
              k: "math",
              t: String.raw`V=\int_{0}^{2\sqrt2}\pi\left(s^{2}+2s\right)^{2}dx=\pi\int_{0}^{1}\left(s^{2}+2s\right)^{2}\cdot4\sqrt2\,s\,ds`,
            },
            { k: "p", t: String.raw`である。$\left(s^{2}+2s\right)^{2}s=s^{5}+4s^{4}+4s^{3}$ なので` },
            {
              k: "math",
              t: String.raw`V=4\sqrt2\,\pi\left(\frac16+\frac45+1\right)=4\sqrt2\,\pi\cdot\frac{59}{30}=\frac{118\sqrt2}{15}\pi`,
            },
            { k: "p", t: String.raw`である（$34.95\ldots$）。` },
          ],
          pitfalls: [
            String.raw`断面が回転軸をまたぐので、円環ではなく円板になる。内側を引かない。`,
            String.raw`半径は「2つの枝のうち $y=1$ から遠いほう」。$s^{2}+2s$ と $2s-s^{2}$ を比べて決める。`,
          ],
          check: String.raw`数値積分すると $34.9506791$ で、$\dfrac{118\sqrt2\pi}{15}=34.9506791$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列",
      topics: ["1次式の係数の漸化式", "階乗で表される一般項", "部分分数分解", "差の形にして和を求める"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式どおりに $P_n$ を計算すると $P_4=120x+120$ で、$a_n$ は $n=1$ から $12$ まで $\\tfrac{\\left(n+2\\right)!}6$ と一致した",
          "$b_n$ も $n=1$ から $12$ まで $\\tfrac{\\left(n-1\\right)\\left(n+1\\right)!}3$ と一致し、差 $\\tfrac{b_{n+1}}{a_{n+1}}-\\tfrac{b_n}{a_n}$ は $\\tfrac6{\\left(n+2\\right)\\left(n+3\\right)}$ と一致した",
          "$S_n$ を定義どおり足した値は $n=1$ から $12$ まで $\\tfrac{\\left(n+2\\right)!}{3^{n+1}}-\\tfrac23$ と分数のまま一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$P_1=x$、$P_{n+1}=\left(n+3\right)P_n+\left(n+1\right)!$ のとき $P_4$ を求める`,
          answer: String.raw`$P_4=120x+120$`,
          approach: String.raw`$n=1,2,3$ と順に代入するだけ。`,
          blocks: [
            {
              k: "math",
              t: String.raw`P_2=4P_1+2!=4x+2`,
            },
            {
              k: "math",
              t: String.raw`P_3=5P_2+3!=5\left(4x+2\right)+6=20x+16`,
            },
            {
              k: "math",
              t: String.raw`P_4=6P_3+4!=6\left(20x+16\right)+24=120x+120`,
            },
          ],
          check: String.raw`漸化式どおりに計算して $P_4=120x+120$ を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$P_n$ の1次の項の係数 $a_n$ の一般項を求める`,
          answer: String.raw`$a_n=\dfrac{\left(n+2\right)!}{6}$`,
          approach: String.raw`$P_n=a_nx+b_n$ を漸化式に入れて、$x$ の係数だけを見る。`,
          blocks: [
            { k: "p", t: String.raw`$P_n=a_nx+b_n$ とおくと、漸化式は` },
            {
              k: "math",
              t: String.raw`a_{n+1}x+b_{n+1}=\left(n+3\right)\left(a_nx+b_n\right)+\left(n+1\right)!`,
            },
            { k: "p", t: String.raw`である。両辺は $x$ の1次式として等しいので、係数を比べて` },
            {
              k: "math",
              t: String.raw`a_{n+1}=\left(n+3\right)a_n,\qquad b_{n+1}=\left(n+3\right)b_n+\left(n+1\right)!\quad\cdots\left(\ast\right)`,
            },
            { k: "p", t: String.raw`が成り立つ。$a_1=1$ なので、$n\geqq2$ のとき` },
            {
              k: "math",
              t: String.raw`a_n=a_1\cdot4\cdot5\cdot6\cdots\left(n+2\right)=\frac{\left(n+2\right)!}{3!}=\frac{\left(n+2\right)!}{6}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=1$ でも $\dfrac{3!}{6}=1=a_1$ なので、$a_n=\dfrac{\left(n+2\right)!}{6}$ はすべての自然数 $n$ で成り立つ。`,
            },
          ],
          check: String.raw`漸化式から出した $a_n$ は $n=1$ から $12$ まで $\dfrac{\left(n+2\right)!}6$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\dfrac{b_{n+1}}{a_{n+1}}-\dfrac{b_n}{a_n}$ を $n$ で表す`,
          answer: String.raw`$\dfrac{b_{n+1}}{a_{n+1}}-\dfrac{b_n}{a_n}=\dfrac{6}{\left(n+2\right)\left(n+3\right)}$`,
          approach: String.raw`$\left(\ast\right)$ の2式を割る。$a_{n+1}=\left(n+3\right)a_n$ なので $\dfrac{b_n}{a_n}$ の項がそのまま残る。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{b_{n+1}}{a_{n+1}}=\frac{\left(n+3\right)b_n+\left(n+1\right)!}{\left(n+3\right)a_n}=\frac{b_n}{a_n}+\frac{\left(n+1\right)!}{\left(n+3\right)a_n}`,
            },
            { k: "p", t: String.raw`である。(2) の $a_n=\dfrac{\left(n+2\right)!}{6}$ を入れると` },
            {
              k: "math",
              t: String.raw`\frac{\left(n+1\right)!}{\left(n+3\right)a_n}=\frac{6\left(n+1\right)!}{\left(n+3\right)\left(n+2\right)!}=\frac{6}{\left(n+2\right)\left(n+3\right)}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{b_{n+1}}{a_{n+1}}-\frac{b_n}{a_n}=\frac{6}{\left(n+2\right)\left(n+3\right)}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(n+2\right)!=\left(n+2\right)\left(n+1\right)!$ を使った。階乗どうしの割り算は、小さいほうを残す形に書き直すのが基本。`,
            },
          ],
          check: String.raw`差を $n=1$ から $12$ まで数値で計算して $\dfrac6{\left(n+2\right)\left(n+3\right)}$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`数列 $\left\{\dfrac{b_n}{a_n}\right\}$ の一般項を求める`,
          answer: String.raw`$\dfrac{b_n}{a_n}=\dfrac{2\left(n-1\right)}{n+2}$`,
          approach: String.raw`(3) は階差。部分分数に分けて途中が消える形にする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P_1=x$ より $b_1=0$ で $\dfrac{b_1}{a_1}=0$ である。(3) は階差なので、$n\geqq2$ のとき`,
            },
            {
              k: "math",
              t: String.raw`\frac{b_n}{a_n}=\frac{b_1}{a_1}+\sum_{k=1}^{n-1}\frac{6}{\left(k+2\right)\left(k+3\right)}=6\sum_{k=1}^{n-1}\left(\frac{1}{k+2}-\frac{1}{k+3}\right)`,
            },
            { k: "p", t: String.raw`である。中間が消えて` },
            {
              k: "math",
              t: String.raw`\frac{b_n}{a_n}=6\left(\frac13-\frac{1}{n+2}\right)=\frac{2\left(n+2\right)-6}{n+2}=\frac{2\left(n-1\right)}{n+2}`,
            },
            {
              k: "p",
              t: String.raw`となる。$n=1$ でも値は $0$ で合うので、すべての自然数 $n$ で $\dfrac{b_n}{a_n}=\dfrac{2\left(n-1\right)}{n+2}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`階差から一般項を出すときは $n\geqq2$ でしか使えない。$n=1$ を別に確かめる。`,
          ],
          check: String.raw`$n=1$ から $12$ まで $\dfrac{b_n}{a_n}$ と $\dfrac{2\left(n-1\right)}{n+2}$ が一致した。`,
        },
        {
          label: "(5)",
          task: String.raw`数列 $\left\{b_n\right\}$ の一般項を求めて、$S_n=\displaystyle\sum_{k=1}^{n}\frac{b_k}{3^k}$ を求める`,
          answer: String.raw`$b_n=\dfrac{\left(n-1\right)\left(n+1\right)!}{3}$、$S_n=\dfrac{\left(n+2\right)!}{3^{n+1}}-\dfrac23$`,
          approach: String.raw`$A_k=\dfrac{\left(k+1\right)!}{3^k}$ とおくと $\dfrac{b_k}{3^k}=A_{k+1}-A_k$ になる。`,
          blocks: [
            { k: "p", t: String.raw`(2)(4) より` },
            {
              k: "math",
              t: String.raw`b_n=a_n\cdot\frac{2\left(n-1\right)}{n+2}=\frac{\left(n+2\right)!}{6}\cdot\frac{2\left(n-1\right)}{n+2}=\frac{\left(n-1\right)\left(n+1\right)!}{3}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{b_k}{3^k}=\frac{\left(k-1\right)\left(k+1\right)!}{3^{k+1}}`,
            },
            {
              k: "p",
              t: String.raw`である。ここで $A_k=\dfrac{\left(k+1\right)!}{3^k}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`A_{k+1}-A_k=\frac{\left(k+2\right)!}{3^{k+1}}-\frac{\left(k+1\right)!}{3^k}=\frac{\left(k+1\right)!}{3^{k+1}}\left\{\left(k+2\right)-3\right\}=\frac{\left(k-1\right)\left(k+1\right)!}{3^{k+1}}`,
            },
            { k: "p", t: String.raw`となり、これはちょうど $\dfrac{b_k}{3^k}$ である。よって` },
            {
              k: "math",
              t: String.raw`S_n=\sum_{k=1}^{n}\left(A_{k+1}-A_k\right)=A_{n+1}-A_1=\frac{\left(n+2\right)!}{3^{n+1}}-\frac{2!}{3}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`S_n=\frac{\left(n+2\right)!}{3^{n+1}}-\frac23`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(k+1\right)!$ を $3^{k+1}$ で割った形を1つ用意して、差をとると係数 $\left(k+2\right)-3=k-1$ が出てくる。$\left(k-1\right)$ という形を見たら、この作り方を疑うとよい。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{k!}{3^k}$ のような形は等比数列でも等差数列でもない。差の形 $A_{k+1}-A_k$ に書き直すのが正攻法。`,
          ],
          check: String.raw`$S_n$ を定義どおり足した分数が $n=1$ から $12$ まで $\dfrac{\left(n+2\right)!}{3^{n+1}}-\dfrac23$ と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形と方程式・三角関数",
      topics: ["直線に関する対称点", "三角関数の合成", "垂直二等分線と等距離", "2定点からの距離の和が一定な点"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{B}=\\left(-\\sqrt6,\\sqrt2\\right)$ は $\\mathrm{OB}=2\\sqrt2$ で、中点が直線 $y=\\left(2+\\sqrt3\\right)x$ 上にあり $\\mathrm{AB}$ がその直線と垂直になった。$\\angle\\mathrm{AOB}=150^{\\circ}$",
          "$\\theta$ を $0$ から $\\pi$ まで $0.0001$ 刻みで動かし、$r=\\tfrac7{3+\\sqrt2\\cos\\left(\\theta+\\pi/6\\right)}$ の点 $\\mathrm{P}$ で $\\mathrm{BP}$ と $\\mathrm{PQ}$ の差を見たところ最大 $2.9\\times10^{-15}$ だった",
          "$r=\\tfrac72$ になるのは $\\theta=1.8325947$ のときで、$\\tfrac{7\\pi}{12}=1.8325957$ とほぼ一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`直線 $y=\left(2+\sqrt3\right)x$ に関して $\mathrm{A}\left(2\sqrt2,0\right)$ と対称な点を $\mathrm{B}$ とするとき、$\angle\mathrm{AOB}$ を求める`,
          answer: String.raw`$\angle\mathrm{AOB}=\dfrac{5}{6}\pi$（$150^{\circ}$）`,
          approach: String.raw`$2+\sqrt3=\tan75^{\circ}$ に気づけば、折り返しで角が2倍になる。`,
          blocks: [
            { k: "p", t: String.raw`加法定理から` },
            {
              k: "math",
              t: String.raw`\tan75^{\circ}=\tan\left(45^{\circ}+30^{\circ}\right)=\frac{1+\frac{1}{\sqrt3}}{1-\frac{1}{\sqrt3}}=\frac{\sqrt3+1}{\sqrt3-1}=\frac{\left(\sqrt3+1\right)^{2}}{2}=2+\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`なので、直線 $y=\left(2+\sqrt3\right)x$ は原点を通り、$x$ 軸の正の向きと $75^{\circ}$ をなす。`,
            },
            {
              k: "p",
              t: String.raw`直線に関する対称移動は原点を動かさないので、$\mathrm{B}$ は原点を中心とする半径 $\mathrm{OA}=2\sqrt2$ の円周上にあり、動径の角は $\mathrm{A}$ の角 $0^{\circ}$ を $75^{\circ}$ の向きに折り返した $2\times75^{\circ}=150^{\circ}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{AOB}=150^{\circ}=\frac{5}{6}\pi`,
            },
            {
              k: "p",
              t: String.raw`である。ついでに $\mathrm{B}$ の座標は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{B}=\left(2\sqrt2\cos150^{\circ},\,2\sqrt2\sin150^{\circ}\right)=\left(-\sqrt6,\,\sqrt2\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`対称点の座標は、$\mathrm{AB}$ の中点が直線上にあることと $\mathrm{AB}\perp$ 直線 の2式を解いても出る。ただし $\tan75^{\circ}$ に気づけば計算はいらない。`,
            },
          ],
          check: String.raw`$\left(-\sqrt6,\sqrt2\right)$ は $\mathrm{OB}=2\sqrt2$ で、$\mathrm{AB}$ の中点が直線上にあり $\mathrm{AB}$ が直線と垂直になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}\left(r\cos\theta,\,r\sin\theta\right)$ に対して $\mathrm{BP}^{2}$ を $r$ と $\theta$ で表す`,
          answer: String.raw`$\mathrm{BP}^{2}=r^{2}+4\sqrt2\,r\cos\left(\theta+\dfrac{\pi}{6}\right)+8$`,
          approach: String.raw`展開してから $\sqrt3\cos\theta-\sin\theta$ を合成する。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\mathrm{BP}^{2}=\left(r\cos\theta+\sqrt6\right)^{2}+\left(r\sin\theta-\sqrt2\right)^{2}`,
            },
            { k: "p", t: String.raw`を展開すると` },
            {
              k: "math",
              t: String.raw`\mathrm{BP}^{2}=r^{2}+2\sqrt6\,r\cos\theta-2\sqrt2\,r\sin\theta+8=r^{2}+2\sqrt2\,r\left(\sqrt3\cos\theta-\sin\theta\right)+8`,
            },
            { k: "p", t: String.raw`である。合成すると` },
            {
              k: "math",
              t: String.raw`\sqrt3\cos\theta-\sin\theta=2\cos\left(\theta+\frac{\pi}{6}\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\mathrm{BP}^{2}=r^{2}+4\sqrt2\,r\cos\left(\theta+\frac{\pi}{6}\right)+8`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\sqrt3\cos\theta-\sin\theta$ は $\cos$ で合成する。$2\sin\left(\dfrac{\pi}{3}-\theta\right)$ と書いても同じだが、あとで扱いやすいのは $\cos$ の形。`,
          ],
          check: String.raw`$\left(r,\theta\right)$ をいくつか選んで、座標から直接求めた $\mathrm{BP}^{2}$ とこの式が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`原点 $\mathrm{O}$ を中心とする半径 $6$ の円と半直線 $\mathrm{OP}$ との交点を $\mathrm{Q}$ とする。線分 $\mathrm{BQ}$ の垂直二等分線が $\mathrm{P}$ を通るとき、$r$ を $\theta$ で表す`,
          answer: String.raw`$r=\dfrac{7}{3+\sqrt2\cos\left(\theta+\dfrac{\pi}{6}\right)}$`,
          approach: String.raw`垂直二等分線上の点は2端から等距離。$\mathrm{PB}=\mathrm{PQ}$ で、$\mathrm{Q}$ は半直線 $\mathrm{OP}$ 上なので $\mathrm{PQ}=\left|6-r\right|$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`線分 $\mathrm{BQ}$ の垂直二等分線が $\mathrm{P}$ を通ることは $\mathrm{PB}=\mathrm{PQ}$ と同じである。$\mathrm{Q}$ は半直線 $\mathrm{OP}$ 上の $\mathrm{OQ}=6$ の点なので $\mathrm{PQ}=\left|6-r\right|$ で、`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BP}^{2}=\mathrm{PQ}^{2}=\left(6-r\right)^{2}=r^{2}-12r+36`,
            },
            { k: "p", t: String.raw`である。(2) と等しいとおくと $r^{2}$ が消えて` },
            {
              k: "math",
              t: String.raw`4\sqrt2\,r\cos\left(\theta+\frac{\pi}{6}\right)+8=-12r+36`,
            },
            { k: "p", t: String.raw`となり、$r$ でまとめると` },
            {
              k: "math",
              t: String.raw`r\left\{4\sqrt2\cos\left(\theta+\frac{\pi}{6}\right)+12\right\}=28,\qquad r=\frac{7}{3+\sqrt2\cos\left(\theta+\dfrac{\pi}{6}\right)}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left|\sqrt2\cos\left(\theta+\dfrac{\pi}{6}\right)\right|\leqq\sqrt2<3$ なので分母は正で、$r>0$ も満たされている。`,
            },
            {
              k: "note",
              t: String.raw`$\mathrm{PB}=\mathrm{PQ}=6-\mathrm{OP}$ は $\mathrm{OP}+\mathrm{PB}=6$ と書き直せる。つまり $\mathrm{P}$ は $\mathrm{O}$ と $\mathrm{B}$ を焦点とし、長軸の長さが $6$ の楕円の上にある。$\mathrm{OB}=2\sqrt2<6$ なので、確かに楕円ができる。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "点 P が描く曲線（太線は 0 ≦ θ ≦ π の部分）。うすい円は中心 O 半径 6 の円で、点線は半直線 OP と線分 PB。OP + PB = 6 なので、O と B を焦点とする楕円の一部になる。図の P, Q は (4) の θ = 7π/12 のとき。",
                view: [-7.5, 7.5, -7.0, 6.2],
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [6 * Math.cos(t), 6 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "param", f: ELL21, from: 0, to: Math.PI },
                  { k: "seg", a: [0, 0], b: [6 * Math.cos(TH21), 6 * Math.sin(TH21)], dash: true },
                  {
                    k: "seg",
                    a: [3.5 * Math.cos(TH21), 3.5 * Math.sin(TH21)],
                    b: [-Math.sqrt(6), Math.SQRT2],
                    dash: true,
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [2 * Math.SQRT2, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [-Math.sqrt(6), Math.SQRT2], label: "B", place: "left" },
                  { k: "dot", at: [3.5 * Math.cos(TH21), 3.5 * Math.sin(TH21)], label: "P", place: "right" },
                  {
                    k: "dot",
                    at: [6 * Math.cos(TH21), 6 * Math.sin(TH21)],
                    label: "Q",
                    place: "above-right",
                  },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「垂直二等分線が通る」を式にするとき、垂直二等分線の方程式を立てる必要はない。$\mathrm{PB}=\mathrm{PQ}$ とすればよい。`,
          ],
          check: String.raw`$\theta$ を $0$ から $\pi$ まで $0.0001$ 刻みで動かし、この $r$ の点 $\mathrm{P}$ で $\mathrm{BP}$ と $\mathrm{PQ}$ の差を見たところ最大 $2.9\times10^{-15}$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`線分 $\mathrm{BQ}$ の垂直二等分線が $\mathrm{P}$ を通り $r=\dfrac72$ であるとき、$\theta$ を求める`,
          answer: String.raw`$\theta=\dfrac{7}{12}\pi$`,
          approach: String.raw`(3) の式に $r=\dfrac72$ を入れて $\cos$ の方程式にする。$0\leqq\theta\leqq\pi$ の制限を忘れない。`,
          blocks: [
            { k: "p", t: String.raw`(3) より` },
            {
              k: "math",
              t: String.raw`\frac72=\frac{7}{3+\sqrt2\cos\left(\theta+\frac{\pi}{6}\right)}`,
            },
            { k: "p", t: String.raw`なので $3+\sqrt2\cos\left(\theta+\dfrac{\pi}{6}\right)=2$、すなわち` },
            {
              k: "math",
              t: String.raw`\cos\left(\theta+\frac{\pi}{6}\right)=-\frac{1}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq\theta\leqq\pi$ より $\dfrac{\pi}{6}\leqq\theta+\dfrac{\pi}{6}\leqq\dfrac{7}{6}\pi$ で、この範囲で $\cos$ が $-\dfrac{1}{\sqrt2}$ になるのは`,
            },
            {
              k: "math",
              t: String.raw`\theta+\frac{\pi}{6}=\frac{3}{4}\pi`,
            },
            {
              k: "p",
              t: String.raw`だけである（$\dfrac54\pi$ は範囲の外）。よって`,
            },
            {
              k: "math",
              t: String.raw`\theta=\frac34\pi-\frac{\pi}{6}=\frac{9\pi-2\pi}{12}=\frac{7}{12}\pi`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\cos\alpha=-\dfrac1{\sqrt2}$ の解は $\alpha=\dfrac34\pi,\dfrac54\pi$ の2つ。$\alpha=\theta+\dfrac{\pi}{6}$ の動く範囲 $\left[\dfrac{\pi}{6},\dfrac76\pi\right]$ で絞る。`,
          ],
          check: String.raw`$r=\dfrac72$ になるのは $\theta=1.8325947$ のときで、$\dfrac{7\pi}{12}=1.8325957$ とほぼ一致した（刻み幅ぶんの差）。`,
        },
      ],
    },
  ],
};
