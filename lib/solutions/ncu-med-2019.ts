import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2019年度（平成31年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第3問は問題に点の配置の図が添えられているが、当サイトでは問題の図は載せず、
 * 座標から読み取れることを言葉で書いている。
 */

/** 第2問(3) で条件を満たす $\vec q$ の座標。$q_{1}=m$、$q_{2}^{2}=\tfrac{4m}{n}-m^{2}$。 */
const Q19: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let m = -4; m <= 4; m++) {
    if (m === 0) continue;
    for (let n = -4; n <= 4; n++) {
      if (n === 0 || m * n < 1 || m * n > 4) continue;
      const sq = (4 * m) / n - m * m;
      if (sq < -1e-12) continue;
      pts.push([m, Math.sqrt(Math.max(0, sq))]);
    }
  }
  return pts;
})();

export const ncuMed2019: SolutionSet = {
  slug: "ncu-med",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["符号の変わる関数の面積", "場合分け", "置き換えて2次関数の最小", "対数の計算"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.3,0.6,\\tfrac1{\\sqrt2},0.9,1.5$ で $\\int_{a}^{2a}\\left|f\\right|dx$ を数値積分し、場合分けした式と小数9桁まで一致した",
          "$a$ を $0.001$ 刻みで走査すると最小は $a=0.707$ で $S=0.2402266$、$\\tfrac{\\left(\\log2\\right)^{2}}2=0.2402265$ と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\dfrac2x\log x$（$x>0$）とする。$a>0$ に対し、曲線 $y=f\left(x\right)$ と $x$ 軸および直線 $x=a$、$x=2a$ で囲まれた部分の面積 $S\left(a\right)$ を求める`,
          answer: String.raw`$0<a\leqq\dfrac12$ で $\left(\log a\right)^{2}-\left(\log2a\right)^{2}$、$\dfrac12<a<1$ で $\left(\log a\right)^{2}+\left(\log2a\right)^{2}$、$a\geqq1$ で $\left(\log2a\right)^{2}-\left(\log a\right)^{2}$`,
          approach: String.raw`$\left\{\left(\log x\right)^{2}\right\}'=\dfrac{2\log x}{x}=f\left(x\right)$。$f$ の符号は $x$ と $1$ の大小で変わるので、$1$ が区間 $\left[a,2a\right]$ に入るかで分ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left\{\left(\log x\right)^{2}\right\}'=2\log x\cdot\dfrac1x=f\left(x\right)$ なので、$F\left(x\right)=\left(\log x\right)^{2}$ が $f$ の原始関数である。`,
            },
            {
              k: "p",
              t: String.raw`$f\left(x\right)$ の符号は $\log x$ の符号と同じで、$0<x<1$ で負、$x=1$ で $0$、$x>1$ で正である。$1$ が $\left[a,2a\right]$ のどこに来るかで3つに分ける。`,
            },
            {
              k: "p",
              t: String.raw`**$a\geqq1$ のとき**　区間全体で $f\geqq0$ なので`,
            },
            {
              k: "math",
              t: String.raw`S\left(a\right)=\int_{a}^{2a}f\left(x\right)dx=\left(\log2a\right)^{2}-\left(\log a\right)^{2}`,
            },
            { k: "p", t: String.raw`**$2a\leqq1$、つまり $0<a\leqq\dfrac12$ のとき**　区間全体で $f\leqq0$ なので` },
            {
              k: "math",
              t: String.raw`S\left(a\right)=-\int_{a}^{2a}f\left(x\right)dx=\left(\log a\right)^{2}-\left(\log2a\right)^{2}`,
            },
            { k: "p", t: String.raw`**$\dfrac12<a<1$ のとき**　$a<1<2a$ で、$\left[a,1\right]$ では負、$\left[1,2a\right]$ では正だから` },
            {
              k: "math",
              t: String.raw`S\left(a\right)=-\int_{a}^{1}f\,dx+\int_{1}^{2a}f\,dx=\left(\log a\right)^{2}+\left(\log2a\right)^{2}`,
            },
            { k: "p", t: String.raw`である（$\log1=0$ を使った）。` },
            {
              k: "note",
              t: String.raw`$\left(\log2a\right)^{2}-\left(\log a\right)^{2}=\left(\log2a+\log a\right)\left(\log2a-\log a\right)=\log2\left(\log2+2\log a\right)$ と因数分解できる。$a\geqq1$ でも $a\leqq\dfrac12$ でも、$S$ は $\log a$ の1次式になる。`,
            },
          ],
          pitfalls: [
            String.raw`「$x$ 軸および $x=a,x=2a$ で囲まれた部分」なので、$f$ が負の区間では $-f$ を積分する。符号をそのままにしない。`,
          ],
          check: String.raw`$a=0.3,0.6,\dfrac1{\sqrt2},0.9,1.5$ で数値積分すると、場合分けした式と小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$S\left(a\right)$ が最小となるときの $a$ と、そのときの $S\left(a\right)$ を求める`,
          answer: String.raw`$a=\dfrac1{\sqrt2}=\dfrac{\sqrt2}{2}$ のとき最小値 $\dfrac{\left(\log2\right)^{2}}{2}$`,
          approach: String.raw`$u=\log a$ とおくと、どの場合も $u$ の1次式か2次式になる。真ん中の場合が下に凸の2次関数。`,
          blocks: [
            { k: "p", t: String.raw`$u=\log a$、$L=\log2>0$ とおく。$\log2a=u+L$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$a\geqq1$（$u\geqq0$）… $S=\left(u+L\right)^{2}-u^{2}=L^{2}+2Lu$。$u$ について増加なので最小は $u=0$、つまり $a=1$ で $S=L^{2}$。`,
                String.raw`$0<a\leqq\dfrac12$（$u\leqq-L$）… $S=u^{2}-\left(u+L\right)^{2}=-L^{2}-2Lu$。$u$ について減少なので最小は $u=-L$、つまり $a=\dfrac12$ で $S=-L^{2}+2L^{2}=L^{2}$。`,
                String.raw`$\dfrac12<a<1$（$-L<u<0$）… $S=u^{2}+\left(u+L\right)^{2}=2u^{2}+2Lu+L^{2}$。`,
              ],
            },
            { k: "p", t: String.raw`である。3つ目を平方完成すると` },
            {
              k: "math",
              t: String.raw`S=2\left(u+\frac L2\right)^{2}+\frac{L^{2}}{2}`,
            },
            {
              k: "p",
              t: String.raw`で、頂点 $u=-\dfrac L2$ は $-L<u<0$ の範囲に入っている。そこでの値 $\dfrac{L^{2}}{2}$ は、他の2つの場合の最小値 $L^{2}$ より小さい。よって全体の最小は`,
            },
            {
              k: "math",
              t: String.raw`\log a=-\frac{\log2}{2},\qquad a=2^{-\frac12}=\frac1{\sqrt2}=\frac{\sqrt2}{2}`,
            },
            { k: "p", t: String.raw`のときで、最小値は` },
            { k: "math", t: String.raw`S=\frac{\left(\log2\right)^{2}}{2}` },
            {
              k: "p",
              t: String.raw`である（$0.2402\ldots$）。このとき $\log a=-\dfrac{\log2}{2}$、$\log2a=\dfrac{\log2}{2}$ で、2つの部分の面積がちょうど等しくなっている。`,
            },
          ],
          pitfalls: [
            String.raw`3つの場合の最小値を比べる。真ん中の場合の頂点が範囲に入っているかどうかも確かめる。`,
          ],
          check: String.raw`$a$ を $0.001$ 刻みで走査すると最小は $a=0.707$ で $S=0.2402266$、$\dfrac{\left(\log2\right)^{2}}2=0.2402265$ と合った。`,
        },
      ],
    },
    {
      no: 2,
      field: "ベクトル・整数",
      topics: ["内積と整数条件", "2つの整数の積が4以下", "大きさの比", "条件を満たす点の図示"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\leqq mn\\leqq4$ を満たす整数の組 $\\left(m,n\\right)$ は16組で、$\\cos\\theta=\\pm\\tfrac{\\sqrt{mn}}2$ から $\\theta$ は $0,30^{\\circ},45^{\\circ},60^{\\circ},120^{\\circ},135^{\\circ},150^{\\circ},180^{\\circ}$ の8通り",
          "$\\vec p=\\left(1,0\\right)$ のときの $\\vec q$ は16点で、$q_{1}=m$、$q_{2}^{2}=\\tfrac{4m}n-m^{2}$ から出した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`ベクトル $\vec p,\vec q$ が ① $\dfrac{\vec p\cdot\vec q}{\vec p\cdot\vec p}$ が整数、② $\dfrac{\left(2\vec p\right)\cdot\left(2\vec q\right)}{\vec q\cdot\vec q}$ が整数、③ $\vec p\cdot\vec q\neq0$、④ $\left|\vec p\right|\neq0,\left|\vec q\right|\neq0$ を同時に満たすとき、$\vec p,\vec q$ のなす角 $\theta$（$0\leqq\theta\leqq\pi$）の値をすべて求める`,
          answer: String.raw`$\theta=0,\dfrac\pi6,\dfrac\pi4,\dfrac\pi3,\dfrac{2\pi}3,\dfrac{3\pi}4,\dfrac{5\pi}6,\pi$`,
          approach: String.raw`①の値を $m$、②の値を $n$ とおくと $mn=4\cos^{2}\theta$ になる。$0<mn\leqq4$ から $mn$ は $1,2,3,4$ に限られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|\vec p\right|=P$、$\left|\vec q\right|=Q$ とおくと $P>0$、$Q>0$ で、$\vec p\cdot\vec q=PQ\cos\theta$、$\vec p\cdot\vec p=P^{2}$、$\vec q\cdot\vec q=Q^{2}$ である。①、②の値をそれぞれ $m,n$ とすると`,
            },
            {
              k: "math",
              t: String.raw`m=\frac{PQ\cos\theta}{P^{2}}=\frac QP\cos\theta,\qquad n=\frac{4PQ\cos\theta}{Q^{2}}=\frac{4P}{Q}\cos\theta`,
            },
            { k: "p", t: String.raw`である。掛け合わせると $P,Q$ が消えて` },
            { k: "math", t: String.raw`mn=4\cos^{2}\theta` },
            {
              k: "p",
              t: String.raw`となる。③より $\cos\theta\neq0$ なので $0<\cos^{2}\theta\leqq1$、したがって $0<mn\leqq4$ である。$m,n$ は整数だから`,
            },
            { k: "math", t: String.raw`mn=1,\ 2,\ 3,\ 4` },
            { k: "p", t: String.raw`のいずれかで、$\cos^{2}\theta=\dfrac{mn}{4}$ より` },
            {
              k: "steps",
              items: [
                String.raw`$mn=1$ … $\cos\theta=\pm\dfrac12$、$\theta=\dfrac\pi3,\dfrac{2\pi}3$`,
                String.raw`$mn=2$ … $\cos\theta=\pm\dfrac1{\sqrt2}$、$\theta=\dfrac\pi4,\dfrac{3\pi}4$`,
                String.raw`$mn=3$ … $\cos\theta=\pm\dfrac{\sqrt3}{2}$、$\theta=\dfrac\pi6,\dfrac{5\pi}6$`,
                String.raw`$mn=4$ … $\cos\theta=\pm1$、$\theta=0,\pi$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。逆にこれらはどれも実現する。$m$ と $\cos\theta$ は同符号で、$\dfrac QP=\dfrac m{\cos\theta}$ と決めればよい（$mn=4\cos^{2}\theta$ から $n$ も自動的に整数になる）。たとえば $mn=3$ なら $\left(m,n\right)=\left(1,3\right),\left(3,1\right)$ と、符号を変えた $\left(-1,-3\right),\left(-3,-1\right)$ がとれる。`,
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`\theta=0,\ \frac\pi6,\ \frac\pi4,\ \frac\pi3,\ \frac{2\pi}3,\ \frac{3\pi}4,\ \frac{5\pi}6,\ \pi`,
            },
            { k: "p", t: String.raw`の8通りである。` },
          ],
          pitfalls: [
            String.raw`②の分子は $\left(2\vec p\right)\cdot\left(2\vec q\right)=4\vec p\cdot\vec q$ である。$4$ を落とすと $mn=\cos^{2}\theta\leqq1$ になり、$\theta$ が足りなくなる。`,
            String.raw`$mn>0$ なので $m,n$ は同符号。片方だけ負という組はない。`,
          ],
          check: String.raw`$1\leqq mn\leqq4$ を満たす整数の組を全探索すると16組あり、$\cos\theta$ の値から $\theta$ は上の8通りになった。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の各 $\theta$ に対して、$\left|\vec p\right|$ と $\left|\vec q\right|$ の比をすべて求める`,
          answer: String.raw`$\theta=0,\pi$ で $1:1,\ 1:2,\ 1:4$。$\theta=\dfrac\pi6,\dfrac{5\pi}6$ で $\sqrt3:2,\ 1:2\sqrt3$。$\theta=\dfrac\pi4,\dfrac{3\pi}4$ で $1:\sqrt2,\ 1:2\sqrt2$。$\theta=\dfrac\pi3,\dfrac{2\pi}3$ で $1:2$`,
          approach: String.raw`$\dfrac QP=\dfrac m{\cos\theta}$。$mn$ の値ごとに $m$ のとりうる値を並べる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $\dfrac QP=\dfrac m{\cos\theta}$ である。$mn$ の値ごとに、$m$ のとりうる値は` },
            {
              k: "steps",
              items: [
                String.raw`$mn=4$（$\cos\theta=\pm1$）… $m=\pm1,\pm2,\pm4$（符号は $\cos\theta$ と同じ）。$\dfrac QP=\left|m\right|=1,2,4$`,
                String.raw`$mn=3$（$\left|\cos\theta\right|=\dfrac{\sqrt3}2$）… $\left|m\right|=1,3$。$\dfrac QP=\dfrac{\left|m\right|}{\frac{\sqrt3}2}=\dfrac{2\left|m\right|}{\sqrt3}=\dfrac2{\sqrt3},\ 2\sqrt3$`,
                String.raw`$mn=2$（$\left|\cos\theta\right|=\dfrac1{\sqrt2}$）… $\left|m\right|=1,2$。$\dfrac QP=\sqrt2\left|m\right|=\sqrt2,\ 2\sqrt2$`,
                String.raw`$mn=1$（$\left|\cos\theta\right|=\dfrac12$）… $\left|m\right|=1$ のみ。$\dfrac QP=2$`,
              ],
            },
            { k: "p", t: String.raw`である。$P:Q=1:\dfrac QP$ として書き直すと` },
            {
              k: "steps",
              items: [
                String.raw`$\theta=0,\pi$ … $\left|\vec p\right|:\left|\vec q\right|=1:1,\ 1:2,\ 1:4$`,
                String.raw`$\theta=\dfrac\pi6,\dfrac{5\pi}6$ … $1:\dfrac2{\sqrt3}=\sqrt3:2$、および $1:2\sqrt3$`,
                String.raw`$\theta=\dfrac\pi4,\dfrac{3\pi}4$ … $1:\sqrt2$、および $1:2\sqrt2$`,
                String.raw`$\theta=\dfrac\pi3,\dfrac{2\pi}3$ … $1:2$`,
              ],
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$mn=4$ では $\left(m,n\right)=\left(1,4\right),\left(2,2\right),\left(4,1\right)$ の3通りがあるので、比も3つある。`,
          ],
          check: String.raw`16組の $\left(m,n\right)$ から $\dfrac QP$ を計算すると、上の比がすべて現れた。`,
        },
        {
          label: "(3)",
          task: String.raw`$xy$ 平面上で $\vec p=\left(1,0\right)$、$\vec q=\left(q_{1},q_{2}\right)$（$q_{2}\geqq0$）とする。①〜④を満たす $\vec q$ をすべて図示する`,
          answer: String.raw`$q_{1}=\pm1$ のとき $q_{2}=0,\dfrac1{\sqrt3},1,\sqrt3$、$q_{1}=\pm2$ のとき $q_{2}=0,2$、$q_{1}=\pm3$ のとき $q_{2}=\sqrt3$、$q_{1}=\pm4$ のとき $q_{2}=0$ の16点`,
          approach: String.raw`$\vec p=\left(1,0\right)$ だと ① は「$q_{1}$ が整数」、② は「$\dfrac{4q_{1}}{q_{1}^{2}+q_{2}^{2}}$ が整数」になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec p\cdot\vec p=1$、$\vec p\cdot\vec q=q_{1}$、$\vec q\cdot\vec q=q_{1}^{2}+q_{2}^{2}$ なので、①は $m=q_{1}$ が整数、②は`,
            },
            {
              k: "math",
              t: String.raw`n=\frac{4q_{1}}{q_{1}^{2}+q_{2}^{2}}`,
            },
            {
              k: "p",
              t: String.raw`が整数、③は $q_{1}\neq0$、④は $\vec q\neq\vec0$ ということである。(1) と同じく $mn=4\cos^{2}\theta$ なので $1\leqq mn\leqq4$、つまり $m,n$ は同符号で $\left|mn\right|\leqq4$ である。`,
            },
            { k: "p", t: String.raw`$n=\dfrac{4m}{q_{1}^{2}+q_{2}^{2}}$ から $q_{1}^{2}+q_{2}^{2}=\dfrac{4m}{n}$ なので` },
            {
              k: "math",
              t: String.raw`q_{2}^{2}=\frac{4m}{n}-m^{2}`,
            },
            { k: "p", t: String.raw`である。$mn=1,2,3,4$ となる組を並べて $q_{2}\geqq0$ を計算すると` },
            {
              k: "steps",
              items: [
                String.raw`$\left(m,n\right)=\left(1,1\right)$ … $q_{2}^{2}=4-1=3$、$\vec q=\left(1,\sqrt3\right)$`,
                String.raw`$\left(1,2\right)$ … $q_{2}^{2}=2-1=1$、$\vec q=\left(1,1\right)$`,
                String.raw`$\left(1,3\right)$ … $q_{2}^{2}=\dfrac43-1=\dfrac13$、$\vec q=\left(1,\dfrac1{\sqrt3}\right)$`,
                String.raw`$\left(1,4\right)$ … $q_{2}^{2}=1-1=0$、$\vec q=\left(1,0\right)$`,
                String.raw`$\left(2,1\right)$ … $q_{2}^{2}=8-4=4$、$\vec q=\left(2,2\right)$`,
                String.raw`$\left(2,2\right)$ … $q_{2}^{2}=4-4=0$、$\vec q=\left(2,0\right)$`,
                String.raw`$\left(3,1\right)$ … $q_{2}^{2}=12-9=3$、$\vec q=\left(3,\sqrt3\right)$`,
                String.raw`$\left(4,1\right)$ … $q_{2}^{2}=16-16=0$、$\vec q=\left(4,0\right)$`,
              ],
            },
            {
              k: "p",
              t: String.raw`の8個が得られる。$m,n$ をともに符号反転した組からは、$q_{2}$ はそのままで $q_{1}$ の符号だけが変わった8個が出る。よって全部で**16点**である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "条件を満たすベクトル q の終点16個。x 座標は ±1, ±2, ±3, ±4 で、y 座標は 0、1/√3、1、√3、2 のいずれか。y 軸について左右対称に並ぶ。",
                view: [-4.7, 4.7, -0.65, 2.65],
                items: [
                  ...Q19.map((at): { k: "dot"; at: [number, number] } => ({ k: "dot", at })),
                  { k: "dot", at: [4, 0], label: "(4, 0)", place: "below" },
                  { k: "dot", at: [3, Math.sqrt(3)], label: "(3, √3)", place: "above-right" },
                  { k: "dot", at: [2, 2], label: "(2, 2)", place: "above-right" },
                  { k: "dot", at: [1, Math.sqrt(3)], label: "(1, √3)", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\left(1,\sqrt3\right)$ は $\theta=\dfrac\pi3$、$\left(1,1\right)$ は $\dfrac\pi4$、$\left(1,\dfrac1{\sqrt3}\right)$ と $\left(3,\sqrt3\right)$ は $\dfrac\pi6$、$x$ 軸上の点は $\theta=0$ に対応する。(2) で出した比ともきちんと合う。`,
            },
          ],
          pitfalls: [
            String.raw`$q_{2}=0$ の点（$\theta=0$）も条件を満たす。$\vec p$ と平行なものを除いてはいけない（除くのは $\vec p\cdot\vec q=0$ のとき）。`,
            String.raw`$\left(m,n\right)=\left(1,1\right)$ などで $q_{2}^{2}$ が負にならないかを毎回確かめる。実際 $mn\leqq4$ がその条件になっている。`,
          ],
          check: String.raw`$-4\leqq m,n\leqq4$ を全探索して $q_{2}^{2}\geqq0$ となる組を拾うと、ちょうど16点になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率・図形",
      topics: ["繰り返しが出るまでの試行", "円周上の点と直角三角形", "図形が閉じる条件", "三角形を含む条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "6点はすべて単位円周上にあり、偏角は $0^{\\circ},30^{\\circ},75^{\\circ},135^{\\circ},210^{\\circ},300^{\\circ}$。向かい合う（$180^{\\circ}$ 違う）組は $\\mathrm{A}_{2},\\mathrm{A}_{5}$ だけ",
          "直角三角形になる3点組は $\\left(1,2,5\\right),\\left(2,3,5\\right),\\left(2,4,5\\right),\\left(2,5,6\\right)$ の4組",
          "サイコロの出方をすべて分数のまま数え上げると $\\tfrac5{54},\\tfrac1{54},\\tfrac{61}{1944}$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`サイコロを、一度出た数字がもう一度出るまで投げて数字の列 $\left[i_{1},\ldots,i_{n}\right]$ をつくる。$n\geqq3$ のとき $\mathrm{A}_{i_{1}},\ldots,\mathrm{A}_{i_{n-1}}$ を順に線分で結び、$i_{n}$ が $i_{n-1}$ とも $i_{n-2}$ とも違うときはさらに $\mathrm{A}_{i_{n-1}}$ と $\mathrm{A}_{i_{n}}$ を結ぶ。作図終了後、図形が3点を頂点とする三角形となる確率を求める`,
          answer: String.raw`$\dfrac5{54}$`,
          approach: String.raw`$i_{1},\ldots,i_{n-1}$ は相異なるので、図形が閉じるのは最後の線分で $\mathrm{A}_{i_{1}}$ に戻るときだけ。三角形になるのは $n=4$ かつ $i_{4}=i_{1}$ のときに限る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`作り方から $i_{1},\ldots,i_{n-1}$ は相異なり、$i_{n}$ はそのどれかと一致する。折れ線 $\mathrm{A}_{i_{1}}\cdots\mathrm{A}_{i_{n-1}}$ は $n-1$ 個の相異なる点を結んだもので、そこに最後の線分 $\mathrm{A}_{i_{n-1}}\mathrm{A}_{i_{n}}$ が付くことがある。`,
            },
            {
              k: "p",
              t: String.raw`図形が三角形（3頂点・3辺の閉じた図形）になるには、折れ線がちょうど3点で、最後の線分が出発点に戻る必要がある。つまり`,
            },
            {
              k: "math",
              t: String.raw`n-1=3\quad\text{かつ}\quad i_{4}=i_{1}`,
            },
            {
              k: "p",
              t: String.raw`である。$i_{4}$ は $i_{1},i_{2},i_{3}$ のどれかと一致し、$i_{4}=i_{3}$ や $i_{4}=i_{2}$ なら線分は足されないので、残るのは $i_{4}=i_{1}$ の場合だけである。逆にそのときは三角形 $\mathrm{A}_{i_{1}}\mathrm{A}_{i_{2}}\mathrm{A}_{i_{3}}$ になる。`,
            },
            {
              k: "p",
              t: String.raw`$n-1\geqq4$ のときは折れ線の頂点が4個以上あるので、線分を1本足しても三角形にはならない。`,
            },
            {
              k: "p",
              t: String.raw`確率を数える。4回の出方は $6^{4}$ 通りで同様に確からしい。$i_{1},i_{2},i_{3}$ が相異なり $i_{4}=i_{1}$ となる出方は $6\cdot5\cdot4\cdot1=120$ 通りだから`,
            },
            {
              k: "math",
              t: String.raw`\frac{120}{6^{4}}=\frac{120}{1296}=\frac5{54}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$i_{4}=i_{2}$（直前の1つ前）でも作図は終わるが、線分は足されないので折れ線のままで三角形にならない。`,
          ],
          check: String.raw`サイコロの出方をすべて分数のまま数え上げると $\dfrac5{54}$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`作図終了後、図形が3点を頂点とする直角三角形となる確率を求める`,
          answer: String.raw`$\dfrac1{54}$`,
          approach: String.raw`6点はすべて単位円周上にある。円に内接する三角形が直角になるのは1辺が直径のときだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`与えられた座標を極形式で見ると、6点はすべて原点からの距離が $1$ で、偏角は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{A}_{1}\colon0^{\circ},\quad\mathrm{A}_{2}\colon30^{\circ},\quad\mathrm{A}_{3}\colon75^{\circ},\quad\mathrm{A}_{4}\colon135^{\circ},\quad\mathrm{A}_{5}\colon210^{\circ},\quad\mathrm{A}_{6}\colon300^{\circ}`,
            },
            {
              k: "p",
              t: String.raw`である（たとえば $\dfrac{\sqrt3-1}{2\sqrt2}=\cos75^{\circ}$、$\dfrac{\sqrt3+1}{2\sqrt2}=\sin75^{\circ}$）。つまり6点は単位円周上にある。`,
            },
            {
              k: "p",
              t: String.raw`円に内接する三角形が直角三角形になるのは、1辺が直径のとき、すなわち2頂点の偏角が $180^{\circ}$ 違うときに限る（円周角の定理）。上の6つの偏角で差が $180^{\circ}$ になる組は`,
            },
            {
              k: "math",
              t: String.raw`210^{\circ}-30^{\circ}=180^{\circ}`,
            },
            {
              k: "p",
              t: String.raw`すなわち $\mathrm{A}_{2}$ と $\mathrm{A}_{5}$ の1組だけである。したがって**直角三角形になるのは $\mathrm{A}_{2}$ と $\mathrm{A}_{5}$ を両方含む3点組**で、残りの1点は4通り、つまり4組ある。`,
            },
            {
              k: "p",
              t: String.raw`(1) の $120$ 通りのうち、$\left\{i_{1},i_{2},i_{3}\right\}$ が $2$ と $5$ を含むものを数える。残り1つの数字が4通り、3つの数字の並べ方が $3!=6$ 通りなので $4\cdot6=24$ 通りである。よって`,
            },
            {
              k: "math",
              t: String.raw`\frac{24}{6^{4}}=\frac{24}{1296}=\frac1{54}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`偏角が $75^{\circ}$ と $135^{\circ}$ の点があるので、見た目だけでは直角かどうか分からない。$180^{\circ}$ 差の組を数え上げて確かめる。`,
          ],
          check: String.raw`4点ずつの組で内積を計算すると、直角三角形になる3点組は $\left(1,2,5\right),\left(2,3,5\right),\left(2,4,5\right),\left(2,5,6\right)$ の4組だった。`,
        },
        {
          label: "(3)",
          task: String.raw`作図終了後、図形の中に3点を頂点とする直角三角形が含まれる確率を求める`,
          answer: String.raw`$\dfrac{61}{1944}$`,
          approach: String.raw`最後の線分が作る閉路がちょうど3辺になるのは $i_{n}=i_{n-3}$ のとき。その3点が $\mathrm{A}_{2},\mathrm{A}_{5}$ を含めばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`折れ線 $\mathrm{A}_{i_{1}}\cdots\mathrm{A}_{i_{n-1}}$ は閉路をもたない。閉路ができるのは最後の線分 $\mathrm{A}_{i_{n-1}}\mathrm{A}_{i_{n}}$ が付くときだけで、$i_{n}=i_{k}$ とすると閉路は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{A}_{i_{k}}\to\mathrm{A}_{i_{k+1}}\to\cdots\to\mathrm{A}_{i_{n-1}}\to\mathrm{A}_{i_{k}}`,
            },
            {
              k: "p",
              t: String.raw`で、辺の数は $n-k$ である。これが三角形（3辺）になるのは $k=n-3$、つまり`,
            },
            { k: "math", t: String.raw`i_{n}=i_{n-3}` },
            {
              k: "p",
              t: String.raw`のときである（$i_{n}=i_{n-1},i_{n-2}$ のときは線分が足されないので閉路はできない）。このとき三角形の頂点は $\mathrm{A}_{i_{n-3}},\mathrm{A}_{i_{n-2}},\mathrm{A}_{i_{n-1}}$ である。閉路が4辺以上のときは、その中に三角形は含まれない。`,
            },
            {
              k: "p",
              t: String.raw`よって求める確率は「$i_{n}=i_{n-3}$ かつ $\left\{i_{n-3},i_{n-2},i_{n-1}\right\}$ が $2$ と $5$ を含む」確率である。$i_{1},\ldots,i_{n-1}$ は相異なるので $n-1\leqq6$、つまり $n=4,5,6,7$ である。`,
            },
            {
              k: "p",
              t: String.raw`$n$ ごとに数える。相異なる $n-1$ 個の並べ方のうち、$2$ と $5$ が後ろの3つに入るものを数えればよい。後ろ3つのうち2か所に $2,5$ を入れる並べ方が $3\cdot2=6$ 通り、残り1か所に他の4つから1つで $4$ 通り、前の $n-4$ か所には残りから順に入れる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=4$ … $6\cdot4=24$ 通り、確率 $\dfrac{24}{6^{4}}$`,
                String.raw`$n=5$ … $6\cdot4\cdot3=72$ 通り、確率 $\dfrac{72}{6^{5}}$`,
                String.raw`$n=6$ … $6\cdot4\cdot3\cdot2=144$ 通り、確率 $\dfrac{144}{6^{6}}$`,
                String.raw`$n=7$ … $6\cdot4\cdot3\cdot2\cdot1=144$ 通り、確率 $\dfrac{144}{6^{7}}$`,
              ],
            },
            { k: "p", t: String.raw`である（$i_{n}$ は $i_{n-3}$ と決まるので、そのぶんの $6$ が分母に残る）。$6^{7}=279936$ で通分すると` },
            {
              k: "math",
              t: String.raw`\frac{24\cdot216+72\cdot36+144\cdot6+144}{279936}=\frac{5184+2592+864+144}{279936}=\frac{8784}{279936}`,
            },
            { k: "p", t: String.raw`である。約分して` },
            { k: "math", t: String.raw`\frac{8784}{279936}=\frac{61}{1944}` },
            { k: "p", t: String.raw`である（$0.0314\ldots$）。` },
            {
              k: "note",
              t: String.raw`(2) は $n=4$ の場合だけを取り出したもので、確率 $\dfrac{24}{1296}=\dfrac1{54}$ はこの和の第1項にあたる。`,
            },
          ],
          pitfalls: [
            String.raw`「図形が直角三角形」(2) と「図形の中に直角三角形が含まれる」(3) は別物。(3) では折れ線のしっぽが付いていてもよい。`,
            String.raw`$n$ は $7$ までしかない。$i_{1},\ldots,i_{n-1}$ が相異なるので $n-1\leqq6$ である。`,
          ],
          check: String.raw`サイコロの出方をすべて分数のまま数え上げると $\dfrac{61}{1944}=0.0313786$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["場合分けのある漸化式", "0に戻る番号の列", "ブロックごとの和", "不等式を満たす最小の番号"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式どおりに $3$ 万項まで作ると、$a_{n}=10000$ となる最小の $n$ は $14575$",
          "$S_{n}\\geqq10000$ となる最小の $n$ は $213$ で、$S_{213}=10020$、$S_{212}=9850$",
          "$a_{n}=0$ となる $n$ は $2,5,11,23,47,95,191,383,\\ldots$（$3\\cdot2^{k-1}-1$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{1}=1$、$a_{n+1}=a_{n}-1$（$a_{n}>0$ のとき）、$a_{n+1}=n$（$a_{n}\leqq0$ のとき）で定める。$a_{n}=10000$ となる最小の $n$ を求める`,
          answer: String.raw`$n=14575$`,
          approach: String.raw`$a_{n}=0$ になる番号を $r_{k}$ とすると $r_{k+1}=2r_{k}+1$。$a$ は $r_{k}$ から $0$ まで1ずつ下がる「かたまり」を繰り返す。`,
          blocks: [
            { k: "p", t: String.raw`はじめのほうを書き出すと` },
            {
              k: "math",
              t: String.raw`a_{1},a_{2},\ldots=1,\ 0,\ 2,\ 1,\ 0,\ 5,\ 4,\ 3,\ 2,\ 1,\ 0,\ 11,\ \ldots`,
            },
            {
              k: "p",
              t: String.raw`である。$a_{n}=0$ となる番号を小さい順に $r_{1},r_{2},\ldots$ とすると $r_{1}=2,r_{2}=5,r_{3}=11,r_{4}=23$ である。`,
            },
            {
              k: "p",
              t: String.raw`一般に $a_{r_{k}}=0$ なら $a_{r_{k}+1}=r_{k}$ で、そこから1ずつ減って $0$ になるのは $r_{k}$ 歩あとだから`,
            },
            {
              k: "math",
              t: String.raw`r_{k+1}=\left(r_{k}+1\right)+r_{k}=2r_{k}+1`,
            },
            { k: "p", t: String.raw`である。$r_{k}+1=2\left(r_{k-1}+1\right)$ と書けるので、$r_{1}+1=3$ より` },
            { k: "math", t: String.raw`r_{k}+1=3\cdot2^{k-1},\qquad r_{k}=3\cdot2^{k-1}-1` },
            {
              k: "p",
              t: String.raw`である。また $r_{k}+1\leqq n\leqq r_{k+1}$ の範囲では $a_{n}$ は $r_{k}$ から $0$ まで1ずつ減るので`,
            },
            { k: "math", t: String.raw`a_{n}=r_{k+1}-n` },
            {
              k: "p",
              t: String.raw`である。$a_{n}=10000$ となるには、そのかたまりの最大値 $r_{k}$ が $10000$ 以上でなければならない。$r_{12}=3\cdot2^{11}-1=6143$、$r_{13}=3\cdot2^{12}-1=12287$ なので、最初に $10000$ が現れるのは $k=13$ のかたまりである。`,
            },
            { k: "p", t: String.raw`$r_{14}=3\cdot2^{13}-1=24575$ だから` },
            {
              k: "math",
              t: String.raw`n=r_{14}-10000=24575-10000=14575`,
            },
            {
              k: "p",
              t: String.raw`である（$r_{13}+1=12288\leqq14575\leqq24575=r_{14}$ で範囲に入っている）。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n+1}=n$ の $n$ は「そのときの番号」なので、$0$ になった位置によって次のかたまりの高さが変わる。`,
          ],
          check: String.raw`漸化式どおりに $3$ 万項まで作ると、$a_{n}=10000$ となる最小の $n$ は $14575$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$S_{n}=\displaystyle\sum_{k=1}^{n}a_{k}$ とするとき、$S_{n}\geqq10000$ となる最小の $n$ を求める`,
          answer: String.raw`$n=213$`,
          approach: String.raw`かたまりごとの和は $\dfrac{r_{k}\left(r_{k}+1\right)}{2}$。どのかたまりで $10000$ を超えるかを押さえてから、その中で何項ぶん足すかを求める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$r_{k}+1\leqq n\leqq r_{k+1}$ のかたまりには $r_{k},r_{k}-1,\ldots,1,0$ が並ぶので、その和は $\dfrac{r_{k}\left(r_{k}+1\right)}{2}$ である。$a_{1}=1,a_{2}=0$ の最初の2項の和は $1$ である。順に足すと`,
            },
            {
              k: "steps",
              items: [
                String.raw`$S_{2}=1$`,
                String.raw`$S_{5}=1+3=4$（$r_{1}=2$ のかたまり $2+1+0=3$）`,
                String.raw`$S_{11}=4+15=19$（$r_{2}=5$）`,
                String.raw`$S_{23}=19+66=85$（$r_{3}=11$）`,
                String.raw`$S_{47}=85+276=361$（$r_{4}=23$）`,
                String.raw`$S_{95}=361+1128=1489$（$r_{5}=47$）`,
                String.raw`$S_{191}=1489+4560=6049$（$r_{6}=95$）`,
                String.raw`$S_{383}=6049+18336=24385$（$r_{7}=191$）`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$6049<10000<24385$ なので、$S_{n}$ が $10000$ に届くのは $r_{7}=191$ のかたまり（$n=192$ から $383$）の途中である。`,
            },
            {
              k: "p",
              t: String.raw`このかたまりの先頭から $j$ 項ぶん足すと、足される値は $191,190,\ldots,192-j$ で`,
            },
            {
              k: "math",
              t: String.raw`\sum_{t=1}^{j}\left(192-t\right)=192j-\frac{j\left(j+1\right)}{2}`,
            },
            { k: "p", t: String.raw`である。$10000-6049=3951$ 以上になる最小の $j$ を求める。` },
            {
              k: "math",
              t: String.raw`192j-\frac{j\left(j+1\right)}{2}\geqq3951\iff j^{2}-383j+7902\leqq0`,
            },
            { k: "p", t: String.raw`で、左辺の値を調べると` },
            {
              k: "steps",
              items: [
                String.raw`$j=21$ … $192\cdot21-\dfrac{21\cdot22}{2}=4032-231=3801<3951$`,
                String.raw`$j=22$ … $192\cdot22-\dfrac{22\cdot23}{2}=4224-253=3971\geqq3951$`,
              ],
            },
            { k: "p", t: String.raw`なので $j=22$ である。したがって` },
            { k: "math", t: String.raw`n=191+22=213` },
            {
              k: "p",
              t: String.raw`である（$S_{213}=6049+3971=10020$、$S_{212}=6049+3801=9850$）。`,
            },
          ],
          pitfalls: [
            String.raw`かたまりの和は $0$ も含めて $r_{k}+1$ 項ある。項数を $r_{k}$ と数え違えない。`,
          ],
          check: String.raw`$S_{n}$ を直接計算すると、$S_{212}=9850$、$S_{213}=10020$ で、最小の $n$ は $213$ だった。`,
        },
      ],
    },
  ],
};
