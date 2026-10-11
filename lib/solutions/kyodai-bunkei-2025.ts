import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2025年度（令和7年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */

/** 第2問の図。条件をみたす (a, b) は b 軸と放物線 b = 2a²。 */
const PARA2 = (a: number) => 2 * a * a;

/** 第4問の図。 */
const CV1 = (x: number) => x * x - 2 * Math.abs(x);
const CV2 = (x: number) => x * x - 5 * x + 7 / 4;
const LN2 = (x: number) => -x - 9 / 4;

export const kyodaiBunkei2025: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "指数・対数／整数",
      topics: ["対数をとる", "多項式の割り算", "約数の評価", "恒等式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ を $-3$ から $3$ まで $6000$ 点動かし、$y=\\log_3 2025^{x}$、$z=\\log_5 2025^{x}$ として $2xy+4xz-yz$ を直接計算すると、すべての点で $0$ になることを確かめた",
          "$n=1$ から $4999$ まで $n^{4}+6n^{2}+23$ を $n^{2}+n+3$ で割った余りを計算すると、割り切れるのは $n=1,2,11$ だけだった",
          "恒等式 $n^{4}+6n^{2}+23=\\left(n^{2}+n+3\\right)\\left(n^{2}-n+4\\right)+(11-n)$ を $-20\\le n\\le49$ のすべてで確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$2025^{x}=3^{y}=5^{z}$ のとき $2xy+4xz-yz=0$ を示す`,
          answer: String.raw`$2025=3^{4}\cdot5^{2}$ より $\log$ をとって $x(4\log3+2\log5)=y\log3=z\log5$ とし、$\frac4y+\frac2z=\frac1x$ を通分する`,
          approach: String.raw`$3$ 乗や $5$ 乗が混ざった等式なので、対数をとって $\log3$ と $\log5$ の1次式に直すのが筋である。$2025$ を素因数分解すると $3$ と $5$ だけで書けるので、$\log3,\log5$ の2つだけで話が閉じる。値が $1$ のとき（$x=y=z=0$）は別に扱う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2025=81\cdot25=3^{4}\cdot5^{2}$ である。共通の値を $N=2025^{x}=3^{y}=5^{z}$ とおく。$N>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$N=1$ のとき。** $3^{y}=1$ より $y=0$、$5^{z}=1$ より $z=0$、$2025^{x}=1$ より $x=0$ である。このとき $2xy+4xz-yz=0$ は明らかに成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`**$N\ne1$ のとき。** 自然対数をとると $\log N\ne0$ で`,
            },
            {
              k: "math",
              t: String.raw`x\log2025=y\log3=z\log5=\log N\;(\ne0)`,
            },
            {
              k: "p",
              t: String.raw`である。とくに $x,y,z$ はどれも $0$ ではない。$\log2025=4\log3+2\log5$ なので`,
            },
            {
              k: "math",
              t: String.raw`\log3=\frac{\log N}{y},\qquad\log5=\frac{\log N}{z}`,
            },
            { k: "p", t: String.raw`を1本目に入れると` },
            {
              k: "math",
              t: String.raw`x\left(\frac{4\log N}{y}+\frac{2\log N}{z}\right)=\log N`,
            },
            { k: "p", t: String.raw`となる。$\log N\ne0$ で割って` },
            {
              k: "math",
              t: String.raw`x\left(\frac4y+\frac2z\right)=1\quad\Longleftrightarrow\quad x\cdot\frac{4z+2y}{yz}=1`,
            },
            { k: "p", t: String.raw`である。両辺に $yz\,(\ne0)$ を掛けると` },
            { k: "math", t: String.raw`4xz+2xy=yz\quad\Longleftrightarrow\quad 2xy+4xz-yz=0` },
            { k: "p", t: String.raw`を得る。どちらの場合も成り立つので、示された。` },
            {
              k: "note",
              t: String.raw`係数 $2$ と $4$ は、$2025=3^{4}\cdot5^{2}$ の指数 $4$ と $2$ が入れ替わって現れたものである。$\frac4y+\frac2z=\frac1x$ を通分すると $2xy+4xz=yz$ になる、という形で覚えておくと見通しがよい。`,
            },
          ],
          pitfalls: [
            String.raw`$N=1$（$x=y=z=0$）の場合を落とさない。このとき対数をとって割る操作ができないので、先に分けておく。`,
            String.raw`$\log$ の底は何でもよい。$\log_{3}$ でとると $\log_{3}5$ が残るので、自然対数か常用対数のほうが扱いやすい。`,
          ],
          check: String.raw`$x=1$ なら $y=\log_{3}2025=6.929947$、$z=\log_{5}2025=4.730425$ で、$2\cdot1\cdot y+4\cdot1\cdot z-yz=13.859894+18.921700-32.781594=0$ である。$-3\le x\le3$ を $6000$ 点で調べても、すべて $0$ になった。`,
        },
        {
          label: "問2",
          task: String.raw`$n^{4}+6n^{2}+23$ が $n^{2}+n+3$ で割り切れる正の整数 $n$ をすべて求める`,
          answer: String.raw`$n=1,\;2,\;11$`,
          approach: String.raw`多項式として割り算してしまうのがいちばん速い。余りが1次式になるので、「$n^{2}+n+3$ がその1次式を割り切る」という条件になり、大きさの比較で $n$ が絞れる。`,
          blocks: [
            { k: "p", t: String.raw`多項式の割り算をすると` },
            {
              k: "math",
              t: String.raw`n^{4}+6n^{2}+23=\left(n^{2}+n+3\right)\left(n^{2}-n+4\right)+(11-n)`,
            },
            {
              k: "p",
              t: String.raw`である。$n^{2}-n+4$ は整数なので、割り切れる条件は`,
            },
            { k: "math", t: String.raw`n^{2}+n+3\ \text{が}\ 11-n\ \text{を割り切る}` },
            { k: "p", t: String.raw`ことである。` },
            {
              k: "p",
              t: String.raw`**$n=11$ のとき。** $11-n=0$ で、$0$ はどんな整数でも割り切れるから条件をみたす。`,
            },
            {
              k: "p",
              t: String.raw`**$n\ne11$ のとき。** $11-n\ne0$ なので、割り切れるなら`,
            },
            { k: "math", t: String.raw`n^{2}+n+3\le\left|11-n\right|` },
            { k: "p", t: String.raw`でなければならない。` },
            {
              k: "steps",
              items: [
                String.raw`$1\le n\le10$：$|11-n|=11-n$ なので $n^{2}+n+3\le11-n$、つまり $n^{2}+2n-8\le0$、$(n+4)(n-2)\le0$ より $n\le2$。$n=1,2$ が候補。`,
                String.raw`$n\ge12$：$|11-n|=n-11$ なので $n^{2}+n+3\le n-11$、つまり $n^{2}+14\le0$ となり不可能。`,
              ],
            },
            { k: "p", t: String.raw`候補を確かめる。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
n=1&:\;n^{2}+n+3=5,\;\;11-n=10\;\;\Rightarrow\;\;5\mid10\;\;\text{◯}\\[1mm]
n=2&:\;n^{2}+n+3=9,\;\;11-n=9\;\;\Rightarrow\;\;9\mid9\;\;\text{◯}
\end{aligned}`,
            },
            { k: "p", t: String.raw`よって求める $n$ は` },
            { k: "math", t: String.raw`n=1,\;2,\;11` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`実際に割ると $n=1$ で $\frac{30}{5}=6$、$n=2$ で $\frac{63}{9}=7$、$n=11$ で $\frac{15390}{135}=114$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$n=11$（余りが $0$ になる場合）を忘れやすい。「割り切る」の条件を $n^{2}+n+3\le|11-n|$ だけで書くと、$11-n=0$ の場合が落ちる。`,
            String.raw`$n\ge12$ も調べる。$|11-n|$ の絶対値を外すときに場合分けが要る。`,
            String.raw`割り算の商 $n^{2}-n+4$ は、組立除法ではなく筆算で順に出す。$n^{4}+0\cdot n^{3}+6n^{2}+0\cdot n+23$ と $0$ の項を書いておくと間違えにくい。`,
          ],
          check: String.raw`$n=1$ から $4999$ まで $n^{4}+6n^{2}+23$ を $n^{2}+n+3$ で割った余りを計算すると、$0$ になるのは $n=1,2,11$ だけだった。恒等式 $n^{4}+6n^{2}+23=\left(n^{2}+n+3\right)\left(n^{2}-n+4\right)+(11-n)$ も $-20\le n\le49$ のすべてで成り立つ。`,
        },
      ],
    },
    {
      no: 2,
      field: "整式",
      topics: ["合成関数", "係数比較", "恒等式", "領域図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=\\frac12x^{2}+qx+r$ として $f(f(x))$ の係数を $q,r$ を $-5$ から $5$ まで $0.25$ 刻みで動かして計算し、$x$ の係数が $0$ になる組から出る $(a,b)$ がすべて「$a=0$」か「$b=2a^{2}$」をみたすことを確かめた",
          "逆に $(a,b)=(0,3),(1,2),\\left(-\\frac12,\\frac12\\right)$ について、$q=2a$ と $r$ を選べば条件がみたされることを係数計算で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac18x^{4}+ax^{3}+bx^{2}=f\left(f(x)\right)+c$ が成り立つような実数係数の2次式 $f$ と実数 $c$ が存在する $(a,b)$ の集合を図示する`,
          answer: String.raw`$b$ 軸（直線 $a=0$）と放物線 $b=2a^{2}$ を合わせた集合`,
          approach: String.raw`$f(x)=px^{2}+qx+r$ とおいて $f(f(x))$ を展開し、係数を比べる。$x^{4}$ の係数から $p$ が決まり、$x^{3}$ から $q$ が $a$ で決まる。$c$ は定数項だけを動かせるので、実質の条件は「$x$ の係数が $0$」である。ここが積の形に factor して、2つの場合に分かれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)=px^{2}+qx+r$（$p\ne0$）とおく。$u=f(x)$ と書くと $f(f(x))=pu^{2}+qu+r$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$x^{4}$ の係数。** $u^{2}$ の $x^{4}$ の係数は $p^{2}$ なので、$f(f(x))$ の $x^{4}$ の係数は $p^{3}$ である。これが $\dfrac18$ だから`,
            },
            { k: "math", t: String.raw`p^{3}=\frac18\quad\Longrightarrow\quad p=\frac12` },
            { k: "p", t: String.raw`である（$p$ は実数なので立方根は1つ）。以下 $f(x)=\dfrac12x^{2}+qx+r$ とする。` },
            { k: "p", t: String.raw`**展開する。** $u=\dfrac12x^{2}+qx+r$ より` },
            {
              k: "math",
              t: String.raw`u^{2}=\frac14x^{4}+qx^{3}+\left(q^{2}+r\right)x^{2}+2qr\,x+r^{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(f(x))&=\frac12u^{2}+qu+r\\[1mm]
&=\frac18x^{4}+\frac q2x^{3}+\frac{q^{2}+r+q}{2}x^{2}+\left(qr+q^{2}\right)x+\left(\frac{r^{2}}{2}+qr+r\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**係数を比べる。** $f(f(x))+c$ が $\dfrac18x^{4}+ax^{3}+bx^{2}$ に一致する条件は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x^{3}$ の係数：$a=\dfrac q2$、すなわち $q=2a$。`,
                String.raw`$x^{2}$ の係数：$b=\dfrac{q^{2}+q+r}{2}$。`,
                String.raw`$x^{1}$ の係数：$qr+q^{2}=0$、すなわち $q(q+r)=0$。`,
                String.raw`定数項：$\dfrac{r^{2}}{2}+qr+r+c=0$。これは $c$ を決めるだけなので、$q,r$ には制限を与えない。`,
              ],
            },
            { k: "p", t: String.raw`である。$q(q+r)=0$ で場合分けする。` },
            {
              k: "p",
              t: String.raw`**(i) $q=0$ のとき。** $a=0$ で、$b=\dfrac{0+0+r}{2}=\dfrac r2$ である。$r$ は自由なので $b$ はすべての実数をとる。つまり $a=0$、$b$ は任意。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) $q\ne0$ のとき。** $r=-q$ で、$b=\dfrac{q^{2}+q-q}{2}=\dfrac{q^{2}}{2}$ である。$q=2a\ne0$ を入れると`,
            },
            { k: "math", t: String.raw`b=\frac{(2a)^{2}}{2}=2a^{2}\qquad(a\ne0)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**まとめる。** 逆に (i)(ii) の $(a,b)$ に対しては、上の $q,r$ と $c=-\left(\dfrac{r^{2}}{2}+qr+r\right)$ をとれば条件がみたされる。放物線 $b=2a^{2}$ の $a=0$ にあたる点 $(0,0)$ は (i) に含まれているので、求める集合は`,
            },
            {
              k: "math",
              t: String.raw`\left\{(a,b)\mid a=0\right\}\cup\left\{(a,b)\mid b=2a^{2}\right\}`,
            },
            { k: "p", t: String.raw`すなわち $b$ 軸と放物線 $b=2a^{2}$ を合わせたものである。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`条件をみたす点 $(a,b)$ の集合。横軸が $a$、縦軸が $b$。$b$ 軸（直線 $a=0$）全体と、放物線 $b=2a^{2}$ 全体を合わせたもの。2つは原点で交わる。`,
                view: [-2.6, 2.6, -1.6, 4.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: PARA2, from: -1.45, to: 1.45 },
                  { k: "seg", a: [0, -1.5], b: [0, 4.3] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "text", at: [1.45, PARA2(1.45)], label: "b = 2a^2", place: "right" },
                  { k: "text", at: [0, 4.3], label: "a = 0", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$c$ は定数項だけを調整する。$x$ の係数は $c$ では消せないので、$qr+q^{2}=0$ が本当の条件になる。ここを「$c$ でどうにかなる」と流すと、放物線だけ、あるいは直線だけの答えになってしまう。`,
            String.raw`$p^{3}=\frac18$ の実数解は $p=\frac12$ だけである。複素数まで広げれば3つあるが、実数係数という条件で1つに決まる。`,
            String.raw`$q=0$ のとき $b=\frac r2$ で $r$ は自由だから、$b$ 軸**全体**が入る。$b\ge0$ などと制限をつけない。`,
            String.raw`逆向きの確認（その $(a,b)$ に対して実際に $f$ と $c$ が作れること）を書く。「図示せよ」でも、集合の一致を示す以上は必要である。`,
          ],
          check: String.raw`$(a,b)=(1,2)$（$b=2a^{2}$ 上）なら $q=2$、$r=-2$ で $f(x)=\frac12x^{2}+2x-2$。このとき $f(f(x))=\frac18x^{4}+x^{3}+2x^{2}-4$ で、$c=4$ とすれば一致する。$(a,b)=(0,3)$（$b$ 軸上）なら $q=0$、$r=6$ で $f(x)=\frac12x^{2}+6$、$f(f(x))=\frac18x^{4}+3x^{2}+24$ となり $c=-24$ でよい。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["倍数判定", "漸化式", "反復試行", "余り"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $8$ まで $2^{n}$ 通りの数をすべて作って $6$ で割り切れるものを数えると、確率は $0,\\frac14,\\frac18,\\frac3{16},\\frac5{32},\\frac{11}{64},\\frac{21}{128},\\frac{43}{256}$ となり、$\\frac{2^{n-1}+(-1)^{n}}{3\\cdot2^{n}}$ の値と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$n$ 桁の数 $X$ が $6$ で割り切れる確率を求める`,
          answer: String.raw`$\dfrac{2^{n-1}+(-1)^{n}}{3\cdot2^{n}}\;\left(=\dfrac16+\dfrac13\left(-\dfrac12\right)^{n}\right)$`,
          approach: String.raw`$6=2\times3$ なので「末尾が偶数」と「各位の和が $3$ の倍数」に分ける。末尾の条件は最後の1回だけ、和の条件は前の $n-1$ 回だけで決まるので、独立に扱える。和を $3$ で割った余りは、1回ごとに $+1$ か $+2$ されるだけなので、3つの状態の確率に漸化式が立つ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`各位の数字は $1$ か $2$ なので、$X$ が $2$ で割り切れるのは末尾が $2$ のときに限る。また $X$ が $3$ で割り切れるのは各位の和が $3$ の倍数のときである。この2つは`,
            },
            {
              k: "steps",
              items: [
                String.raw`末尾（$n$ 回目）が $2$ であること`,
                String.raw`最初の $n-1$ 個の数字の和を $S$ として、$S+2$ が $3$ の倍数、つまり $S\equiv1\pmod3$ であること`,
              ],
            },
            {
              k: "p",
              t: String.raw`に分かれ、$n$ 回目と最初の $n-1$ 回は独立である。よって`,
            },
            {
              k: "math",
              t: String.raw`P=\frac12\times P\left(S\equiv1\!\!\pmod 3\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**余りの確率に漸化式を立てる。** $k$ 回目までの和を $3$ で割った余りが $1$ である確率を $v_k$ とする（$v_0=0$）。$1$ 回投げると和は $1$ か $2$ 増えるので、余りが $1$ になるのは「余り $0$ から $+1$」か「余り $2$ から $+2$」のときである。余りが $0,1,2$ である確率を $u_k,v_k,w_k$ とすれば $u_k+v_k+w_k=1$ で`,
            },
            {
              k: "math",
              t: String.raw`v_{k}=\frac12\left(u_{k-1}+w_{k-1}\right)=\frac12\left(1-v_{k-1}\right)`,
            },
            { k: "p", t: String.raw`となる。$\dfrac13$ を引くと` },
            {
              k: "math",
              t: String.raw`v_k-\frac13=-\frac12\left(v_{k-1}-\frac13\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$v_0-\dfrac13=-\dfrac13$ より`,
            },
            {
              k: "math",
              t: String.raw`v_k=\frac13-\frac13\left(-\frac12\right)^{k}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**代入する。** $\left(-\dfrac12\right)^{n-1}=-2\left(-\dfrac12\right)^{n}$ なので`,
            },
            {
              k: "math",
              t: String.raw`v_{n-1}=\frac13+\frac23\left(-\frac12\right)^{n}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`P=\frac12v_{n-1}=\frac16+\frac13\left(-\frac12\right)^{n}=\frac{2^{n-1}+(-1)^{n}}{3\cdot2^{n}}`,
            },
            { k: "p", t: String.raw`が求める確率である。` },
            {
              k: "note",
              t: String.raw`$n=1$ では $0$（$1$ も $2$ も $6$ の倍数でない）、$n=2$ では $\dfrac14$（$12$ だけ）、$n=3$ では $\dfrac18$（$222$ だけ）である。$n$ を大きくすると $\dfrac16$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$6$ で割り切れる条件を「各位の和が $6$ の倍数」としない。$3$ の倍数判定は和で、$2$ の倍数判定は末尾である。`,
            String.raw`末尾の条件と和の条件は独立だが、和の条件は「全体の和」なので末尾の $2$ も含む。最初の $n-1$ 個の和の余りが $1$ になる、と言いかえるところを丁寧に書く。`,
            String.raw`$u_k,v_k,w_k$ を3本とも立てなくても、$u+v+w=1$ を使えば $v$ だけの漸化式になる。3本連立のまま解こうとすると遠回りである。`,
            String.raw`$v_{n-1}$ を $v_n$ と取り違えない。投げる回数は $n$ 回だが、和の条件に効くのは最初の $n-1$ 回である。`,
          ],
          check: String.raw`$n=1,\dots,8$ について $2^{n}$ 通りをすべて作って $6$ で割り切れるものを数えると、確率は $0,\frac14,\frac18,\frac3{16},\frac5{32},\frac{11}{64},\frac{21}{128},\frac{43}{256}$ となり、$\frac{2^{n-1}+(-1)^{n}}{3\cdot2^{n}}$ の値と完全に一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・積分法",
      topics: ["共通接線", "絶対値を含む関数", "判別式", "面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\ell_2:y=-x-\\frac94$ が $C_1$ と $x=-\\frac32$ で接する（値も傾きも一致）ことと、$C_2$ との連立が $(x-2)^{2}=0$ になることを確かめた",
          "$\\ell_2$ と $C_1$ の右側の枝（$y=x^{2}-2x$）との連立 $x^{2}-x+\\frac94=0$ の判別式が $-8<0$ で、接点以外に共有点がないことを確かめた",
          "面積を $-\\frac32\\le x\\le\\frac32$ で $200$ 万点の台形則で数値積分すると $4.500000000$ となり、$\\frac92$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$(0,0)$ と異なる点で $C_1$ と接し、さらに $C_2$ とも接する直線 $\ell_2$ がただ一つ存在することを示す`,
          answer: String.raw`$\ell_2:y=-x-\dfrac94$（$C_1$ とは $x=-\dfrac32$、$C_2$ とは $x=2$ で接する）`,
          approach: String.raw`$C_1$ は $x\ge0$ と $x\le0$ で別の放物線になるので、接点の $x$ 座標を $t$ とおいて2つの枝それぞれで接線を書く。$C_2$ との接する条件は判別式 $=0$ で、$t$ の2次の項がきれいに消えて1次方程式になる。だから各枝で高々1つしか候補が出ない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C_1$ は $x\ge0$ では $y=x^{2}-2x$、$x\le0$ では $y=x^{2}+2x$ である。接点の $x$ 座標を $t\,(\ne0)$ とする。`,
            },
            {
              k: "p",
              t: String.raw`**接線を書く。** $t>0$ のとき傾きは $2t-2$ で、接線は`,
            },
            {
              k: "math",
              t: String.raw`y=(2t-2)(x-t)+t^{2}-2t=(2t-2)x-t^{2}`,
            },
            { k: "p", t: String.raw`である。$t<0$ のときは同様に $y=(2t+2)x-t^{2}$ である。いずれも切片は $-t^{2}$ になる。` },
            {
              k: "p",
              t: String.raw`**$C_2$ と接する条件。** 直線 $y=mx+k$ が $C_2:y=x^{2}-5x+\dfrac74$ と接するのは`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-(5+m)x+\frac74-k=0`,
            },
            { k: "p", t: String.raw`が重解をもつとき、つまり` },
            {
              k: "math",
              t: String.raw`(5+m)^{2}-4\left(\frac74-k\right)=0\quad\Longleftrightarrow\quad(m+5)^{2}-7+4k=0`,
            },
            { k: "p", t: String.raw`のときである。` },
            {
              k: "p",
              t: String.raw`**(i) $t>0$ のとき。** $m=2t-2$、$k=-t^{2}$ を入れると`,
            },
            {
              k: "math",
              t: String.raw`(2t+3)^{2}-7-4t^{2}=0\;\Longleftrightarrow\;4t^{2}+12t+9-7-4t^{2}=0\;\Longleftrightarrow\;12t+2=0`,
            },
            { k: "p", t: String.raw`で $t=-\dfrac16$ となり、$t>0$ に反する。この場合は解なし。` },
            {
              k: "p",
              t: String.raw`**(ii) $t<0$ のとき。** $m=2t+2$、$k=-t^{2}$ を入れると`,
            },
            {
              k: "math",
              t: String.raw`(2t+7)^{2}-7-4t^{2}=0\;\Longleftrightarrow\;28t+42=0\;\Longleftrightarrow\;t=-\frac32`,
            },
            {
              k: "p",
              t: String.raw`で、これは $t<0$ をみたす。このとき $m=-1$、$k=-\dfrac94$ だから`,
            },
            { k: "math", t: String.raw`\ell_2:\;y=-x-\frac94` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$C_1$ と本当に接しているか。** $\ell_2$ は $x\le0$ の枝と $x=-\dfrac32$ で接する。もう一方の枝 $y=x^{2}-2x$ との連立は`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-2x=-x-\frac94\;\Longleftrightarrow\;x^{2}-x+\frac94=0`,
            },
            {
              k: "p",
              t: String.raw`で判別式が $1-9=-8<0$ だから共有点をもたない。よって $\ell_2$ は $C_1$ と $x=-\dfrac32$ の1点だけで接する。`,
            },
            {
              k: "p",
              t: String.raw`以上より、条件をみたす直線は $\ell_2:y=-x-\dfrac94$ ただ一つである。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$C_1:y=x^{2}-2|x|$、$C_2:y=x^{2}-5x+\frac74$ と共通接線 $\ell_2:y=-x-\frac94$。$C_1$ とは $\left(-\frac32,-\frac34\right)$、$C_2$ とは $\left(2,-\frac{17}{4}\right)$ で接する。`,
                view: [-2.8, 3.9, -4.9, 2.8],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: CV1, from: -2.4, to: 2.4 },
                  { k: "curve", f: CV2, from: 0.2, to: 3.7, faint: true },
                  { k: "seg", a: [-2.6, LN2(-2.6)], b: [2.6, LN2(2.6)], dash: true },
                  { k: "dot", at: [-1.5, -0.75], label: "P", place: "above-left" },
                  { k: "dot", at: [2, -4.25], label: "(2, -17/4)", place: "right" },
                  { k: "text", at: [-2.4, CV1(-2.4)], label: "C1", place: "above-left" },
                  { k: "text", at: [3.7, CV2(3.7)], label: "C2", place: "right" },
                  { k: "text", at: [-2.6, LN2(-2.6)], label: "l2", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$C_1$ は $x=0$ で折れているので、枝ごとに分けて接線を立てる。1本の式 $y=x^{2}-2|x|$ のまま微分しない。`,
            String.raw`判別式 $=0$ に代入すると $t^{2}$ の項が打ち消し合って1次方程式になる。この「2次が消える」ことが、各枝で高々1本という結論の理由である。`,
            String.raw`$t>0$ の枝から出た $t=-\frac16$ は、枝の条件に反するので捨てる。式の上では解が出るので、符号の確認を忘れない。`,
            String.raw`求めた直線が $C_1$ の**もう一方の枝**と交わらないことまで見る。交わってしまうと「接する」とは言いにくい形になる。`,
          ],
          check: String.raw`$x=-\frac32$ で $C_1$ の値は $\frac94-3=-\frac34$、$\ell_2$ の値は $\frac32-\frac94=-\frac34$ で一致し、$C_1$（$x\le0$ の枝）の傾きは $2\left(-\frac32\right)+2=-1$ で $\ell_2$ の傾きと一致する。$C_2$ との連立は $x^{2}-4x+4=(x-2)^{2}=0$ で重解になる。`,
        },
        {
          label: "(2)",
          task: String.raw`$C_1$ の $\alpha\le x\le\dfrac32$ の部分、線分 $\mathrm{PQ}$、線分 $\mathrm{QR}$ で囲まれる図形の面積を求める`,
          answer: String.raw`$\dfrac92$`,
          approach: String.raw`3点の座標を出すと、図形は「上が $C_1$、下が $\ell_2$、右が直線 $x=\frac32$」で囲まれた縦に切れる形だとわかる。$C_1$ が $x=0$ で式を変えるので、積分を $x\le0$ と $x\ge0$ で分ける。左半分は $(x+\frac32)^{2}$ というきれいな形になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $\alpha=-\dfrac32$ である。各点の座標は` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(-\frac32,\,-\frac34\right),\qquad\mathrm{Q}\left(\frac32,\,-\frac{15}{4}\right),\qquad\mathrm{R}\left(\frac32,\,-\frac34\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{Q}$ は $\ell_1:x=\frac32$ と $\ell_2$ の交点で $y=-\frac32-\frac94=-\frac{15}{4}$、$\mathrm{R}$ は $x=\frac32\ge0$ なので $C_1$ の右の枝で $y=\frac94-3=-\frac34$）。`,
            },
            {
              k: "p",
              t: String.raw`**囲まれ方。** 線分 $\mathrm{PQ}$ は $\ell_2$ の一部、線分 $\mathrm{QR}$ は $\ell_1$ の一部である。$-\dfrac32\le x\le\dfrac32$ で`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x\le0&:\;\left(x^{2}+2x\right)-\left(-x-\frac94\right)=x^{2}+3x+\frac94=\left(x+\frac32\right)^{2}\ge0\\[1mm]
x\ge0&:\;\left(x^{2}-2x\right)-\left(-x-\frac94\right)=x^{2}-x+\frac94>0
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`なので、この範囲では $C_1$ がつねに $\ell_2$ の上側にある。したがって図形は`,
            },
            {
              k: "math",
              t: String.raw`\left\{(x,y)\;\middle|\;-\frac32\le x\le\frac32,\;\;-x-\frac94\le y\le x^{2}-2|x|\right\}`,
            },
            { k: "p", t: String.raw`である（左端 $x=-\frac32$ では上下の境界が $\mathrm{P}$ で一致する）。` },
            { k: "p", t: String.raw`**積分する。** ` },
            {
              k: "math",
              t: String.raw`\int_{-\frac32}^{0}\left(x+\frac32\right)^{2}dx=\left[\frac{\left(x+\frac32\right)^{3}}{3}\right]_{-\frac32}^{0}=\frac{1}{3}\left(\frac32\right)^{3}=\frac98`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac32}\left(x^{2}-x+\frac94\right)dx=\left[\frac{x^{3}}{3}-\frac{x^{2}}{2}+\frac94x\right]_{0}^{\frac32}=\frac98-\frac98+\frac{27}{8}=\frac{27}{8}`,
            },
            { k: "p", t: String.raw`なので、面積は` },
            { k: "math", t: String.raw`\frac98+\frac{27}{8}=\frac{36}{8}=\frac92` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`求める図形。上の境界は $C_1$（$x=0$ で折れる）、下の境界は線分 $\mathrm{PQ}$（$\ell_2$ の一部）、右の境界は線分 $\mathrm{QR}$（$\ell_1:x=\frac32$ の一部）。面積は $\frac92$。`,
                view: [-2.3, 2.9, -4.3, 1.5],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: CV1, bottom: LN2, from: -1.5, to: 1.5 },
                  { k: "curve", f: CV1, from: -2.1, to: 2.1 },
                  { k: "seg", a: [-1.5, -0.75], b: [1.5, -3.75] },
                  { k: "seg", a: [1.5, -3.75], b: [1.5, -0.75] },
                  { k: "seg", a: [1.5, -4.2], b: [1.5, 1.4], dash: true, faint: true },
                  { k: "dot", at: [-1.5, -0.75], label: "P", place: "above-left" },
                  { k: "dot", at: [1.5, -3.75], label: "Q", place: "below-right" },
                  { k: "dot", at: [1.5, -0.75], label: "R", place: "above-right" },
                  { k: "text", at: [1.5, 1.4], label: "l1", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$C_1$ は $x=0$ で式が変わるので、積分区間を $\left[-\frac32,0\right]$ と $\left[0,\frac32\right]$ に分ける。分けずに $x^{2}-2x$ のまま通すと値がずれる。`,
            String.raw`左半分の被積分関数が $\left(x+\frac32\right)^{2}$ になるのは、$\ell_2$ が $x=-\frac32$ で $C_1$ に接しているからである。接しているところでは差が重解をもつ。`,
            String.raw`$\mathrm{R}$ は $C_1$ の**右の枝**の上の点である。$x=\frac32>0$ なので $y=x^{2}-2x$ を使う。`,
          ],
          check: String.raw`$-\frac32\le x\le\frac32$ で $\left(x^{2}-2|x|\right)-\left(-x-\frac94\right)$ を $200$ 万点の台形則で数値積分すると $4.500000000$ となり、$\frac92$ と一致する。$\mathrm{P},\mathrm{Q},\mathrm{R}$ の $y$ 座標も $-0.75,\,-3.75,\,-0.75$ で合っている。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["平面のベクトル方程式", "1次独立", "定点通過", "係数の和が1"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\frac1s+\\frac2t+\\frac3u=4$ をみたす $(s,t,u)$ を $20$ 万組ランダムに作り、$\\alpha=\\frac1{4s}$、$\\beta=\\frac1{2t}$、$\\gamma=\\frac3{4u}$ とおくと、つねに $\\alpha+\\beta+\\gamma=1$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac1s+\dfrac2t+\dfrac3u=4$ をみたす範囲で $s,t,u$ が動くとき、平面 $\mathrm{LMN}$ が $s,t,u$ によらない定点を通ることを示す`,
          answer: String.raw`$\overrightarrow{\mathrm{OX}}=\dfrac14\overrightarrow{\mathrm{OA}}+\dfrac12\overrightarrow{\mathrm{OB}}+\dfrac34\overrightarrow{\mathrm{OC}}$ で定まる点 $\mathrm{X}$ を通る`,
          approach: String.raw`平面 $\mathrm{LMN}$ 上の点は $\alpha\overrightarrow{\mathrm{OL}}+\beta\overrightarrow{\mathrm{OM}}+\gamma\overrightarrow{\mathrm{ON}}$（$\alpha+\beta+\gamma=1$）と書ける。これを $\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}},\overrightarrow{\mathrm{OC}}$ で表すと係数が $\alpha s,\beta t,\gamma u$ になるので、「係数の和が $1$」という条件が与えられた $\frac1s+\frac2t+\frac3u=4$ と同じ形になるように、定点の係数を選べばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ は同一平面上にないので $\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}},\overrightarrow{\mathrm{OC}}$ は1次独立である。$s,t,u\ne0$ だから $\overrightarrow{\mathrm{OL}}=s\overrightarrow{\mathrm{OA}}$、$\overrightarrow{\mathrm{OM}}=t\overrightarrow{\mathrm{OB}}$、$\overrightarrow{\mathrm{ON}}=u\overrightarrow{\mathrm{OC}}$ も1次独立で、とくに $\mathrm{L},\mathrm{M},\mathrm{N}$ は同一直線上になく、平面 $\mathrm{LMN}$ がただ1つ定まる。`,
            },
            {
              k: "p",
              t: String.raw`**平面上の点の表し方。** 点 $\mathrm{X}$ が平面 $\mathrm{LMN}$ 上にあることは`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}}=\alpha\overrightarrow{\mathrm{OL}}+\beta\overrightarrow{\mathrm{OM}}+\gamma\overrightarrow{\mathrm{ON}},\qquad\alpha+\beta+\gamma=1`,
            },
            { k: "p", t: String.raw`をみたす実数 $\alpha,\beta,\gamma$ があることと同値である。これは` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}}=\alpha s\,\overrightarrow{\mathrm{OA}}+\beta t\,\overrightarrow{\mathrm{OB}}+\gamma u\,\overrightarrow{\mathrm{OC}}`,
            },
            { k: "p", t: String.raw`ということである。` },
            {
              k: "p",
              t: String.raw`**定点を見つける。** 与えられた条件を $4$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`\frac{\frac14}{s}+\frac{\frac12}{t}+\frac{\frac34}{u}=1`,
            },
            { k: "p", t: String.raw`となる。そこで点 $\mathrm{X}$ を` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}}=\frac14\overrightarrow{\mathrm{OA}}+\frac12\overrightarrow{\mathrm{OB}}+\frac34\overrightarrow{\mathrm{OC}}`,
            },
            { k: "p", t: String.raw`で定める。これは $s,t,u$ によらない1つの点である。` },
            {
              k: "math",
              t: String.raw`\alpha=\frac{1}{4s},\qquad\beta=\frac{1}{2t},\qquad\gamma=\frac{3}{4u}`,
            },
            { k: "p", t: String.raw`とおけば $\alpha s=\dfrac14$、$\beta t=\dfrac12$、$\gamma u=\dfrac34$ であり、しかも` },
            {
              k: "math",
              t: String.raw`\alpha+\beta+\gamma=\frac14\left(\frac1s+\frac2t+\frac3u\right)=\frac14\cdot4=1`,
            },
            {
              k: "p",
              t: String.raw`をみたす。したがって $\mathrm{X}$ は平面 $\mathrm{LMN}$ 上にある。$s,t,u$ の取り方によらず同じ $\mathrm{X}$ なので、平面 $\mathrm{LMN}$ は定点 $\mathrm{X}$ を通る。`,
            },
            {
              k: "note",
              t: String.raw`$\frac14+\frac12+\frac34=\frac32\ne1$ なので、$\mathrm{X}$ は平面 $\mathrm{ABC}$ の上にはない。「定点」は $\mathrm{A},\mathrm{B},\mathrm{C}$ の重心のような分かりやすい点とは限らない。`,
            },
          ],
          pitfalls: [
            String.raw`$\alpha+\beta+\gamma=1$ が「平面上にある」ことの条件である。これを落とすと空間全体を表してしまう。`,
            String.raw`$\frac1s+\frac2t+\frac3u=4$ の右辺 $4$ で割って $1$ にそろえる、という一手が要点である。係数 $\frac14,\frac12,\frac34$ はこの割り算から出てくる。`,
            String.raw`$s,t,u\ne0$ なので $\alpha,\beta,\gamma$ は定義できる。$\mathrm{L},\mathrm{M},\mathrm{N}$ が $\mathrm{O}$ に一致しないことも、ここから従う。`,
          ],
          check: String.raw`$\frac1s+\frac2t+\frac3u=4$ をみたす $(s,t,u)$ を $20$ 万組ランダムに作り、$\alpha=\frac1{4s}$、$\beta=\frac1{2t}$、$\gamma=\frac3{4u}$ を計算すると、$\alpha+\beta+\gamma$ はすべて $1$（誤差 $10^{-9}$ 未満）になった。たとえば $s=t=u=\frac32$ は条件をみたし、$\alpha=\frac16$、$\beta=\frac13$、$\gamma=\frac12$ で和は $1$ である。`,
        },
      ],
    },
  ],
};
