import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2024年度（令和6年度）一般選抜 前期日程 数学（文科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 3問とも自分で解き直した。理科系の同年度とは別問題で、共通の大問はなかった。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第2問の図。$t=-3$ の例（(3) の条件 $-4<t<0,\ t\neq-2$ を満たす）。 */
const T24 = -3;
const C24 = (x: number): number => -x * x + T24 * x + T24;
const M24 = (T24 + 4) / 2;
const P24: [number, number] = [T24 / 2, (T24 * T24) / 4 + T24];
const Q24: [number, number] = [-2, -T24 - 4];

export const nagoyaBunkei2024: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "整式",
      topics: ["3次方程式の因数分解", "対称式", "解と係数の関係"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x^{3}-3x^{2}-50=(x-5)(x^{2}+2x+10)$ で、2次因子の判別式は $-36<0$ なので実数解は $x=5$ だけ",
          "$(p,q)=\\left(\\tfrac{5-\\sqrt5}{2},\\ \\tfrac{5+\\sqrt5}{2}\\right)$ を数値で入れると $p+q=pq=5.000000000$、$p^{3}+q^{3}=50.000000000$、$\\tfrac1p+\\tfrac1q=1.000000000$、$p<q$ がすべて成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`方程式 $x^{3}-3x^{2}-50=0$ の実数解をすべて求める`,
          answer: String.raw`$x=5$`,
          approach: String.raw`整数係数の3次方程式なので、有理数解があるなら定数項 $-50$ の約数。$\pm1,\pm2,\pm5,\dots$ を順に入れて1つ見つけ、因数分解してから残りの2次式の判別式を見る。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x^{3}-3x^{2}-50$ とおく。$x=5$ を入れると` },
            { k: "math", t: String.raw`f(5)=125-75-50=0` },
            { k: "p", t: String.raw`なので $x-5$ で割り切れる。実際に割ると` },
            { k: "math", t: String.raw`x^{3}-3x^{2}-50=\left(x-5\right)\left(x^{2}+2x+10\right)` },
            { k: "p", t: String.raw`である。2次因子の判別式は` },
            { k: "math", t: String.raw`2^{2}-4\cdot1\cdot10=4-40=-36<0` },
            { k: "p", t: String.raw`なので、$x^{2}+2x+10=0$ は実数解をもたない。よって実数解は` },
            { k: "math", t: String.raw`x=5` },
            { k: "p", t: String.raw`だけである。` },
            {
              k: "note",
              t: String.raw`$x^{2}+2x+10=\left(x+1\right)^{2}+9>0$ と平方完成で言ってもよい。`,
            },
          ],
          pitfalls: [
            String.raw`「実数解をすべて」と言われているので、2次因子が実数解をもたないことを判別式か平方完成で示す。`,
          ],
          check: String.raw`$\left(x-5\right)\left(x^{2}+2x+10\right)$ を展開すると $x^{3}+2x^{2}+10x-5x^{2}-10x-50=x^{3}-3x^{2}-50$ で戻る。`,
        },
        {
          label: "(2)",
          task: String.raw`実数 $p,q$ が $p+q=pq$ を満たすとき、$X=pq$ として $p^{3}+q^{3}$ を $X$ で表す`,
          answer: String.raw`$p^{3}+q^{3}=X^{3}-3X^{2}$`,
          approach: String.raw`$p^{3}+q^{3}=\left(p+q\right)^{3}-3pq\left(p+q\right)$ という基本対称式での表し方を使う。条件 $p+q=pq=X$ から、両方とも $X$ に置き換わる。`,
          blocks: [
            { k: "p", t: String.raw`恒等式` },
            {
              k: "math",
              t: String.raw`p^{3}+q^{3}=\left(p+q\right)^{3}-3pq\left(p+q\right)`,
            },
            { k: "p", t: String.raw`を使う。条件 $p+q=pq$ と $X=pq$ から $p+q=X$ でもあるので` },
            { k: "math", t: String.raw`p^{3}+q^{3}=X^{3}-3X\cdot X=X^{3}-3X^{2}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$p^{3}+q^{3}=\left(p+q\right)\left(p^{2}-pq+q^{2}\right)$ から始めてもよいが、$\left(p+q\right)^{3}$ の展開を使うほうが対称式の形に直しやすい。`,
          ],
          check: String.raw`$X=5$ なら $125-75=50$。(3) の $p^{3}+q^{3}=50$ と合う。`,
        },
        {
          label: "(3)",
          task: String.raw`$p^{3}+q^{3}=50$、$\dfrac1p+\dfrac1q=1$、$p<q$ を満たす $0$ でない実数の組 $(p,q)$ をすべて求める`,
          answer: String.raw`$(p,q)=\left(\dfrac{5-\sqrt{5}}{2},\ \dfrac{5+\sqrt{5}}{2}\right)$`,
          approach: String.raw`$\dfrac1p+\dfrac1q=\dfrac{p+q}{pq}$ なので、2つめの条件はちょうど $p+q=pq$ である。これで (2) が使えて、$X$ の3次方程式が (1) そのものになる。`,
          blocks: [
            { k: "p", t: String.raw`$p,q$ はどちらも $0$ でないので` },
            { k: "math", t: String.raw`\frac{1}{p}+\frac{1}{q}=\frac{p+q}{pq}=1,\qquad\text{すなわち}\quad p+q=pq` },
            { k: "p", t: String.raw`である。$X=pq$ とおくと (2) より $p^{3}+q^{3}=X^{3}-3X^{2}$ なので、条件 $p^{3}+q^{3}=50$ は` },
            { k: "math", t: String.raw`X^{3}-3X^{2}-50=0` },
            { k: "p", t: String.raw`となる。$X$ は実数なので、(1) より` },
            { k: "math", t: String.raw`X=5` },
            { k: "p", t: String.raw`である。つまり $p+q=5$、$pq=5$ で、$p,q$ は2次方程式` },
            { k: "math", t: String.raw`z^{2}-5z+5=0` },
            { k: "p", t: String.raw`の2解である。判別式は $25-20=5>0$ なので実数解が2つあり` },
            { k: "math", t: String.raw`z=\frac{5\pm\sqrt{5}}{2}` },
            { k: "p", t: String.raw`である。どちらも $0$ ではない（積が $5\neq0$）。$p<q$ だから` },
            {
              k: "math",
              t: String.raw`(p,q)=\left(\frac{5-\sqrt{5}}{2},\ \frac{5+\sqrt{5}}{2}\right)`,
            },
            { k: "p", t: String.raw`が答えである。` },
          ],
          pitfalls: [
            String.raw`$\tfrac1p+\tfrac1q=1$ を通分して $p+q=pq$ に直すところが出発点。ここで (2) の条件とつながる。`,
            String.raw`$X$ は実数なので (1) の実数解だけを使えばよい。虚数解まで拾わない。`,
            String.raw`最後に $p<q$ で順序を決める。$\sqrt5\approx2.236$ なので $p\approx1.382,\ q\approx3.618$ である。`,
          ],
          check: String.raw`$p=1.381966011,\ q=3.618033989$ で $p+q=pq=5.000000000$、$p^{3}+q^{3}=50.000000000$、$\tfrac1p+\tfrac1q=1.000000000$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "2次関数",
      topics: ["平方完成", "解と係数の関係", "2点間の距離", "2次不等式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$t=-3,1,2,-1,-5,3.5$ で $\\ell$ と $C$ の共有点を数値で求めると、つねに $x=\\tfrac t2$ と $x=-2$ の2つだった",
          "同じ $t$ で $\\mathrm{AP}^{2}=X^{2}+5X+5$、$\\mathrm{AQ}^{2}=4X+5$、$\\mathrm{AP}^{2}-\\mathrm{AQ}^{2}=X^{2}+X$ がすべて小数9桁まで一致した",
          "$t$ を $0.001$ 刻みで $-6$ から $6$ まで動かすと、$\\mathrm{AP}<\\mathrm{AQ}$ になるのは $-3.999\\leqq t\\leqq-0.001$ の範囲で、$t=-2$ は含まれなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$t\neq0$ に対し $y=-x^{2}+tx+t$ のグラフを $C$ とするとき、$C$ 上で $y$ 座標が最大となる点 $\mathrm{P}$ の座標を求める`,
          answer: String.raw`$\mathrm{P}\left(\dfrac{t}{2},\ \dfrac{t^{2}}{4}+t\right)$`,
          approach: String.raw`$x^{2}$ の係数が $-1<0$ なので上に凸。頂点が最大点なので、平方完成するだけである。`,
          blocks: [
            { k: "p", t: String.raw`平方完成すると` },
            {
              k: "math",
              t: String.raw`y=-\left(x^{2}-tx\right)+t=-\left(x-\frac{t}{2}\right)^{2}+\frac{t^{2}}{4}+t`,
            },
            { k: "p", t: String.raw`である。$x^{2}$ の係数が負なので上に凸で、$x=\dfrac t2$ のとき最大値 $\dfrac{t^{2}}{4}+t$ をとる。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(\frac{t}{2},\ \frac{t^{2}}{4}+t\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`この $\dfrac{t^{2}}{4}+t$ が (3) の $X$ である。先に名前を付けておくと後が楽になる。`,
            },
          ],
          check: String.raw`$t=-3$ なら $\mathrm{P}\left(-1.5,\ -0.75\right)$ で、$y=-x^{2}-3x-3$ に $x=-1.5$ を入れると $-2.25+4.5-3=-0.75$ になる。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}$ と $\mathrm{O}(0,0)$ を通る直線を $\ell$ とするとき、$\ell$ と $C$ が $\mathrm{P}$ 以外の共有点 $\mathrm{Q}$ をもつための $t$ の条件と、そのときの $\mathrm{Q}$ の座標を求める`,
          answer: String.raw`条件は $t\neq-4$。このとき $\mathrm{Q}\left(-2,\ -t-4\right)$`,
          approach: String.raw`$\ell$ と $C$ の共有点の $x$ 座標は2次方程式の解で、一方が $x=\dfrac t2$ だと分かっている。解と係数の関係（積）を使うともう一方が即座に出る。実際に計算すると $t$ によらず $x=-2$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$t\neq0$ より $\mathrm{P}$ の $x$ 座標 $\dfrac t2$ は $0$ でないので、$\ell$ は $y$ 軸に平行でなく、傾きは` },
            {
              k: "math",
              t: String.raw`m=\frac{\frac{t^{2}}{4}+t}{\frac{t}{2}}=\frac{t}{2}+2=\frac{t+4}{2}`,
            },
            { k: "p", t: String.raw`である。$\ell\colon y=mx$ と $C\colon y=-x^{2}+tx+t$ を連立すると` },
            { k: "math", t: String.raw`-x^{2}+tx+t=mx,\qquad\text{すなわち}\quad x^{2}+\left(m-t\right)x-t=0\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`である。① の2解を $\alpha,\beta$ とすると、一方は $\mathrm{P}$ の $x$ 座標 $\dfrac t2$ である。解と係数の関係から` },
            { k: "math", t: String.raw`\alpha\beta=-t` },
            { k: "p", t: String.raw`なので、もう一方は` },
            { k: "math", t: String.raw`\frac{-t}{\frac{t}{2}}=-2` },
            {
              k: "p",
              t: String.raw`である（$t\neq0$ なので割れる）。つまり $\ell$ と $C$ のもう1つの共有点の $x$ 座標は、$t$ によらず $-2$ である。`,
            },
            { k: "p", t: String.raw`これが $\mathrm{P}$ と異なるのは` },
            { k: "math", t: String.raw`-2\neq\frac{t}{2},\qquad\text{すなわち}\quad t\neq-4` },
            { k: "p", t: String.raw`のときである。このとき $y$ 座標は $\ell$ の式から` },
            {
              k: "math",
              t: String.raw`y=m\cdot\left(-2\right)=-\left(t+4\right)`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`\mathrm{Q}\left(-2,\ -t-4\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$C$ は $t$ の値によらず $x=-2$ では $y=-4-2t+t=-t-4$ を通る。$\ell$ のほうも $x=-2$ で $y=-t-4$ になるので、$\mathrm{Q}$ はいつでも共有点になっている。`,
            },
          ],
          pitfalls: [
            String.raw`① を解の公式で解くと根号が出て見通しが悪い。「片方の解が分かっている」状況なので、解と係数の関係（積）を使う。`,
            String.raw`$t=-4$ では $\mathrm{P}$ と $\mathrm{Q}$ が一致してしまう（$\ell$ が $C$ に接する）。「$\mathrm{P}$ 以外の」という条件がこれを除く。`,
          ],
          check: String.raw`$t=3.5$ で ① を数値で解くと解は $-2$ と $1.75=\tfrac t2$ の2つで、$\mathrm{Q}=(-2,-7.5)$ は $C$ と $\ell$ の両方にのっていた。`,
        },
        {
          label: "(3)",
          task: String.raw`$t$ が (2) の条件を満たすとし、$\mathrm{A}(-1,-2)$、$X=\dfrac14t^{2}+t$ とするとき、$\mathrm{AP}^{2}-\mathrm{AQ}^{2}$ を $X$ で表し、$\mathrm{AP}<\mathrm{AQ}$ となる $t$ の条件を求める`,
          answer: String.raw`$\mathrm{AP}^{2}-\mathrm{AQ}^{2}=X^{2}+X$。$\mathrm{AP}<\mathrm{AQ}$ となるのは $-4<t<0$ かつ $t\neq-2$`,
          approach: String.raw`$\mathrm{P}$ の $y$ 座標がちょうど $X$ で、$\dfrac{t^{2}}{4}+t=X$ という関係が $\mathrm{AP}^{2}$ の $x$ 成分にもそのまま現れる。$\mathrm{AQ}^{2}$ も $t^{2}+4t=4X$ で書けるので、両方 $X$ だけの式になる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "t = -3 のときの様子。C は上に凸の放物線で、頂点が P。原点 O と P を通る直線 ℓ は C ともう1点 Q(-2, -t-4) で交わる。A(-1, -2) からの距離は AP < AQ。",
                view: [-4.2, 2.2, -4, 1.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: C24, from: -3.3, to: 0.3 },
                  { k: "curve", f: (x: number) => M24 * x, from: -4.2, to: 2.2 },
                  { k: "seg", a: [-1, -2], b: P24, dash: true },
                  { k: "seg", a: [-1, -2], b: Q24, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: P24, label: "P", place: "above-right" },
                  { k: "dot", at: Q24, label: "Q", place: "left" },
                  { k: "dot", at: [-1, -2], label: "A(-1, -2)", place: "below-right" },
                  { k: "text", at: [-3.2, -3.6], label: "C", place: "left" },
                  { k: "text", at: [1.8, 0.9], label: "ℓ", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`**$\mathrm{AP}^{2}$。** (1) より $\mathrm{P}\left(\dfrac t2,\ X\right)$ である。$\mathrm{A}(-1,-2)$ だから` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}=\left(\frac{t}{2}+1\right)^{2}+\left(X+2\right)^{2}`,
            },
            { k: "p", t: String.raw`で、最初の括弧を展開すると` },
            {
              k: "math",
              t: String.raw`\left(\frac{t}{2}+1\right)^{2}=\frac{t^{2}}{4}+t+1=X+1`,
            },
            { k: "p", t: String.raw`である（$X=\tfrac{t^{2}}{4}+t$ そのもの）。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}=\left(X+1\right)+\left(X+2\right)^{2}=X^{2}+5X+5`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$\mathrm{AQ}^{2}$。** (2) より $\mathrm{Q}\left(-2,\ -t-4\right)$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{AQ}^{2}=\left(-2+1\right)^{2}+\left(-t-4+2\right)^{2}=1+\left(t+2\right)^{2}=t^{2}+4t+5`,
            },
            { k: "p", t: String.raw`である。$t^{2}+4t=4\left(\dfrac{t^{2}}{4}+t\right)=4X$ だから` },
            { k: "math", t: String.raw`\mathrm{AQ}^{2}=4X+5` },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}^{2}-\mathrm{AQ}^{2}=\left(X^{2}+5X+5\right)-\left(4X+5\right)=X^{2}+X`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{AP}<\mathrm{AQ}$ の条件。** $\mathrm{AP},\mathrm{AQ}$ はどちらも $0$ 以上なので、$\mathrm{AP}<\mathrm{AQ}$ は $\mathrm{AP}^{2}<\mathrm{AQ}^{2}$ と同値である。すなわち`,
            },
            { k: "math", t: String.raw`X^{2}+X<0\quad\Longleftrightarrow\quad X\left(X+1\right)<0\quad\Longleftrightarrow\quad-1<X<0` },
            { k: "p", t: String.raw`である。$X=\dfrac{t^{2}+4t}{4}=\dfrac{t\left(t+4\right)}{4}$ だから、2つの不等式に分けて` },
            {
              k: "steps",
              items: [
                String.raw`$X<0$：$t\left(t+4\right)<0$ より $-4<t<0$`,
                String.raw`$X>-1$：$t^{2}+4t>-4$ より $\left(t+2\right)^{2}>0$、すなわち $t\neq-2$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。この2つを合わせた $-4<t<0$ かつ $t\neq-2$ は、$t\neq0$ も $t\neq-4$ も満たしているので、(2) の条件と矛盾しない。よって求める条件は`,
            },
            { k: "math", t: String.raw`-4<t<0\quad\text{かつ}\quad t\neq-2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t=-2$ では $X=-1$ となり $\mathrm{AP}=\mathrm{AQ}$（$\mathrm{AP}^{2}-\mathrm{AQ}^{2}=0$）である。等号を除く点がこの小問のポイントになっている。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(\tfrac t2+1\right)^{2}=X+1$ に気づくかどうかで式の重さが変わる。$X$ の定義をそのまま使う。`,
            String.raw`$\left(t+2\right)^{2}>0$ は「$t\neq-2$」であって「つねに成り立つ」ではない。等号の除外を忘れない。`,
          ],
          check: String.raw`$t=-3$ では $X=-0.75$、$\mathrm{AP}^{2}=1.8125$、$\mathrm{AQ}^{2}=2$ で $\mathrm{AP}<\mathrm{AQ}$、$\mathrm{AP}^{2}-\mathrm{AQ}^{2}=-0.1875=X^{2}+X$ だった。$t$ を細かく走査しても $\mathrm{AP}<\mathrm{AQ}$ は $-4<t<0$、$t\neq-2$ のときだけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["反復試行", "和の言い換え", "組合せの数え上げ", "偶奇"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n\\leqq8$ の全パターンで $a_{n}=2n+r$（$r$ は裏の回数）を確かめ、反例 0 件だった",
          "$n=4$ の $16$ 通りを全列挙すると、得点が $0$ でないのは $6$ 通り（$\\tfrac38$）、得点が $25$ なのは $2$ 通り（$\\tfrac18$）だった",
          "$n=9$ の $512$ 通りを全列挙すると、得点 $100$ は $4$ 通り（$\\tfrac1{128}$）、得点が奇数は $20$ 通り（$\\tfrac5{128}$）だった",
          "$n=9$ で $0$ 以外の得点は $93$ から $107$ までの連続する整数になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`表・裏が確率 $\tfrac12$ ずつのコインを $n$ 回投げ、表なら $+2$、裏なら $+3$ だけ原点から正の向きに石を動かす。$k$ 回後の位置を $a_{k}$ とするとき、$n$ 回のうち裏の出る回数を $r$ として $a_{n}$ を求める`,
          answer: String.raw`$a_{n}=2n+r$`,
          approach: String.raw`$n$ 回すべてが表なら $2n$ 進む。裏が1回あるたびに $3-2=1$ だけ余分に進む、と考えるのがいちばん速い。`,
          blocks: [
            { k: "p", t: String.raw`表が $n-r$ 回、裏が $r$ 回出るので` },
            { k: "math", t: String.raw`a_{n}=2\left(n-r\right)+3r=2n+r` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$0\leqq r\leqq n$ なので $2n\leqq a_{n}\leqq3n$ である。得点が $0$ にならない条件 $a_{n}=2n+2$ は $r=2$ と同じことで、$n\geqq2$ でないと起こらない。`,
            },
          ],
          check: String.raw`$n\leqq8$ の全パターンで位置を直接計算し、$2n+r$ と一致することを確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_{n}\neq2n+2$ のとき得点 $0$、$a_{n}=2n+2$ のとき得点 $a_{1}+a_{2}+\cdots+a_{n}$ とする。$n=4$ のとき、得点が $0$ でない確率と得点が $25$ である確率を求める`,
          answer: String.raw`得点が $0$ でない確率は $\dfrac38$、得点が $25$ である確率は $\dfrac18$`,
          approach: String.raw`(1) より $a_{n}=2n+2$ は「裏がちょうど2回」と同じ。得点のほうは、$a_{k}=2k+(\text{最初の }k\text{ 回の裏の数})$ と書いて和を取り替えると、裏が出た回の番号だけで決まる式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**得点が $0$ でない確率。** (1) の考え方を $k$ 回目までに使うと、最初の $k$ 回に裏が $c_{k}$ 回あるとして`,
            },
            { k: "math", t: String.raw`a_{k}=2k+c_{k}` },
            { k: "p", t: String.raw`である。得点が $0$ でないのは $a_{4}=2\cdot4+2=10$、つまり $c_{4}=r=2$ のときで、その確率は` },
            {
              k: "math",
              t: String.raw`\frac{ {}_4\mathrm{C}_2}{2^{4}}=\frac{6}{16}=\frac{3}{8}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**得点の式。** 裏が出た回の番号の集合を $T$ とすると` },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{4}a_{k}=\sum_{k=1}^{4}\left(2k+c_{k}\right)=2\left(1+2+3+4\right)+\sum_{k=1}^{4}c_{k}=20+\sum_{k=1}^{4}c_{k}`,
            },
            {
              k: "p",
              t: String.raw`である。$\displaystyle\sum_{k=1}^{4}c_{k}$ は「$j$ 回目の裏が $c_{k}$ に数えられる回数」を $j$ ごとに足したものだから、$j$ 回目の裏は $k=j,j+1,\dots,4$ の $5-j$ 個に効いて`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{4}c_{k}=\sum_{j\in T}\left(5-j\right)`,
            },
            { k: "p", t: String.raw`である。$T=\left\{j_{1},j_{2}\right\}$（$j_{1}<j_{2}$）のとき、得点は` },
            {
              k: "math",
              t: String.raw`20+\left(5-j_{1}\right)+\left(5-j_{2}\right)=30-\left(j_{1}+j_{2}\right)`,
            },
            { k: "p", t: String.raw`となる。` },
            { k: "p", t: String.raw`**得点 $25$。** $30-\left(j_{1}+j_{2}\right)=25$ より $j_{1}+j_{2}=5$ で、$1\leqq j_{1}<j_{2}\leqq4$ を満たすのは` },
            { k: "math", t: String.raw`\left(j_{1},j_{2}\right)=\left(1,4\right),\ \left(2,3\right)` },
            { k: "p", t: String.raw`の2通りである。よって確率は` },
            { k: "math", t: String.raw`\frac{2}{2^{4}}=\frac{2}{16}=\frac{1}{8}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`得点は「裏が何回出たか」だけでなく「何回目に出たか」で変わる。$a_{1}$ から $a_{n}$ までの和なので、早く裏が出るほど得点が高い。`,
            String.raw`$\sum_{k}c_{k}$ を $\sum_{j\in T}$ に取り替える（数える順番を入れ替える）のがこの問題のかなめである。`,
          ],
          check: String.raw`$n=4$ の $16$ 通りを全列挙すると、得点が $0$ でないのは $6$ 通り、得点が $25$ なのは $2$ 通りだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$n=9$ のとき、得点が $100$ である確率と得点が奇数である確率を求める`,
          answer: String.raw`得点が $100$ である確率は $\dfrac{1}{128}$、得点が奇数である確率は $\dfrac{5}{128}$`,
          approach: String.raw`(2) と同じ式変形を $n=9$ でやる。得点は $110-\left(j_{1}+j_{2}\right)$ になるので、$100$ になるのも奇数になるのも「2つの番号の和」の条件に翻訳できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_{9}=2\cdot9+2=20$、つまり裏がちょうど2回のときだけ得点が $0$ でない。裏の出た回の番号を $j_{1}<j_{2}$ とすると、(2) と同じ計算で`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{9}a_{k}=2\left(1+2+\cdots+9\right)+\sum_{j\in T}\left(10-j\right)=90+20-\left(j_{1}+j_{2}\right)`,
            },
            { k: "p", t: String.raw`すなわち得点は` },
            { k: "math", t: String.raw`110-\left(j_{1}+j_{2}\right)\qquad\left(1\leqq j_{1}<j_{2}\leqq9\right)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**得点 $100$。** $j_{1}+j_{2}=10$ となる組は` },
            {
              k: "math",
              t: String.raw`\left(1,9\right),\ \left(2,8\right),\ \left(3,7\right),\ \left(4,6\right)`,
            },
            { k: "p", t: String.raw`の4通りである（$\left(5,5\right)$ は $j_{1}<j_{2}$ を満たさない）。よって確率は` },
            { k: "math", t: String.raw`\frac{4}{2^{9}}=\frac{4}{512}=\frac{1}{128}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**得点が奇数。** 得点が $0$ のときは偶数なので、奇数になるのは裏がちょうど2回で、かつ $110-\left(j_{1}+j_{2}\right)$ が奇数、つまり $j_{1}+j_{2}$ が奇数のときである。これは $j_{1},j_{2}$ の一方が奇数、他方が偶数ということである。`,
            },
            {
              k: "p",
              t: String.raw`$1$ から $9$ までの奇数は $1,3,5,7,9$ の5個、偶数は $2,4,6,8$ の4個なので、そのような組は`,
            },
            { k: "math", t: String.raw`5\times4=20\ \text{通り}` },
            { k: "p", t: String.raw`である。よって確率は` },
            { k: "math", t: String.raw`\frac{20}{2^{9}}=\frac{20}{512}=\frac{5}{128}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$j_{1}+j_{2}$ は $1+2=3$ から $8+9=17$ まで動くので、$0$ 以外の得点は $93$ から $107$ までのすべての整数をとる。`,
            },
          ],
          pitfalls: [
            String.raw`「得点が奇数」に得点 $0$ の場合を混ぜない。$0$ は偶数なので、裏がちょうど2回の場合だけを数える。`,
            String.raw`$j_{1}+j_{2}=10$ で $\left(5,5\right)$ を数えない。裏が出るのは異なる2回である。`,
          ],
          check: String.raw`$n=9$ の $512$ 通りを全列挙すると、得点 $100$ は $4$ 通り、得点が奇数は $20$ 通りだった。`,
        },
      ],
    },
  ],
};
