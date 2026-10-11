import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2022年度（令和4年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問。積分を実行して得た $f$ の閉じた形。図を描くためだけに使う。 */
const f1 = (x: number) =>
  (Math.cos(x) + Math.sin(x)) * Math.log(Math.cos(x)) -
  Math.cos(x) -
  Math.sin(x) +
  0.5 * Math.log((1 + Math.sin(x)) / (1 - Math.sin(x)));

/** 第5問。$z=\frac34$ での断面に出てくる3つの半径。 */
const Z5 = 0.75;
const R1 = 2 - 2 * Z5;
const R2 = Math.sqrt(1 - Z5 * Z5);

export const todaiRikei2022: SolutionSet = {
  slug: "todai-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法・積分法",
      topics: ["積分で定義された関数の微分", "増減表", "部分積分", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f$ を数値積分で作り、その数値微分が $\\log(\\cos x)(\\cos x-\\sin x)$ と小数8桁まで一致することを確かめた",
          "$0\\le x<\\frac\\pi2$ を $2000$ 等分した全探索で最小値 $-1.022969046$ を $x=0.78535$ 付近に見つけ、$\\frac\\pi4=0.785398$ と $\\log\\left(1+\\sqrt2\\right)-\\frac{\\sqrt2}{2}\\log2-\\sqrt2=-1.022969047$ に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)$ が $0\le x<\dfrac\pi2$ で最小値を持つことを示す`,
          answer: String.raw`$f'(x)=\log(\cos x)\left(\cos x-\sin x\right)$ となり、$x=\dfrac\pi4$ で最小になる`,
          approach: String.raw`$f$ は「積のかたまり」と「積分」の和だが、微分してしまえば積分の項は中身がそのまま出てくる。積の微分で出る項とちょうど打ち消し合うので、$f'$ はきれいな積の形になる。あとは2つの因子の符号を別々に見るだけでよい。区間の右端が開いているので、そこで下がり続けていないことも確かめる必要がある。`,
          blocks: [
            { k: "p", t: String.raw`$0\le x<\dfrac\pi2$ では $0<\cos x\le1$ なので、$\log(\cos x)$ はきちんと定まる。積の微分で` },
            {
              k: "math",
              t: String.raw`\frac{d}{dx}\Bigl\{(\cos x)\log(\cos x)\Bigr\}=-\sin x\log(\cos x)+\cos x\cdot\frac{-\sin x}{\cos x}=-\sin x\log(\cos x)-\sin x`,
            },
            { k: "p", t: String.raw`であり、積分の項は微分すると中身がそのまま出るから` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f'(x)&=\Bigl\{-\sin x\log(\cos x)-\sin x\Bigr\}+\sin x+(\cos x)\log(\cos x)\\[1mm]
&=\log(\cos x)\left(\cos x-\sin x\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。$-\sin x$ と $+\sin x$ が打ち消し合うのがこの問題の仕掛けである。2つの因子の符号を見る。` },
            {
              k: "steps",
              items: [
                String.raw`$\log(\cos x)$：$0<\cos x\le1$ なので $\log(\cos x)\le0$ で、$=0$ となるのは $x=0$ のときだけ。`,
                String.raw`$\cos x-\sin x=\sqrt2\cos\left(x+\dfrac\pi4\right)$：$0\le x<\dfrac\pi2$ では $\dfrac\pi4\le x+\dfrac\pi4<\dfrac{3\pi}{4}$ なので、$x<\dfrac\pi4$ で正、$x=\dfrac\pi4$ で $0$、$x>\dfrac\pi4$ で負。`,
              ],
            },
            { k: "p", t: String.raw`よって $f'$ の符号は次のようになる。` },
            {
              k: "steps",
              items: [
                String.raw`$0<x<\dfrac\pi4$：（負）$\times$（正）で $f'<0$、$f$ は減少。`,
                String.raw`$x=\dfrac\pi4$：$f'=0$。`,
                String.raw`$\dfrac\pi4<x<\dfrac\pi2$：（負）$\times$（負）で $f'>0$、$f$ は増加。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$f$ は $\left[0,\dfrac\pi4\right]$ で減少し、$\left[\dfrac\pi4,\dfrac\pi2\right)$ で増加する。したがって区間の右端が開いていても、$x=\dfrac\pi4$ の値より小さくなることはない。すなわち $f$ は $x=\dfrac\pi4$ で最小値をとる。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=f(x)$ のグラフ。$x=\frac\pi4$ でいちばん低くなり、そこから右端 $\frac\pi2$ に向かっては増加する（$x\to\frac\pi2$ では $\log2-1$ に近づく）。`,
                view: [-0.15, 1.72, -1.25, 0.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: f1, from: 0, to: 1.5605 },
                  { k: "seg", a: [Math.PI / 2, -1.25], b: [Math.PI / 2, 0.1], dash: true, faint: true },
                  { k: "dot", at: [0, -1], label: "f(0) = −1", place: "above-right" },
                  { k: "dot", at: [Math.PI / 4, f1(Math.PI / 4)], label: "最小", place: "below" },
                  { k: "text", at: [Math.PI / 2, -1.1], label: "x = π/2", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`区間の右端 $\dfrac\pi2$ は含まれない。「増減表を書いて端点と比べる」では済まず、右半分で増加していることを根拠に、最小が内部の $\dfrac\pi4$ で実現すると言い切る必要がある。`,
            String.raw`$\cos x-\sin x$ の符号は、合成して $\sqrt2\cos\left(x+\dfrac\pi4\right)$ と書くと一度で片づく。`,
          ],
          check: String.raw`$f$ を数値積分で作り、その数値微分と $\log(\cos x)(\cos x-\sin x)$ を比べると、$x=0.3,\,0.7,\,1.2$ のどれでも小数8桁まで一致する。符号も $x=0.7<\dfrac\pi4$ で負、$x=1.2>\dfrac\pi4$ で正になっている。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ の $0\le x<\dfrac\pi2$ における最小値を求める`,
          answer: String.raw`$\log\left(1+\sqrt2\right)-\dfrac{\sqrt2}{2}\log2-\sqrt2$`,
          approach: String.raw`(1) より最小値は $f\!\left(\dfrac\pi4\right)$ である。残るのは $\displaystyle\int_0^{\pi/4}(\cos t)\log(\cos t)\,dt$ を実際に計算することだけ。$\log$ を微分する側にまわす部分積分で $\dfrac{\sin^{2}t}{\cos t}$ が出てくるので、$1-\cos^{2}t$ に直して $\dfrac{1}{\cos t}$ の積分に落とす。これは $\sin t$ で置換すれば部分分数に分かれる。`,
          blocks: [
            { k: "p", t: String.raw`$I=\displaystyle\int_0^{\pi/4}(\cos t)\log(\cos t)\,dt$ を求める。$\log(\cos t)$ を微分する側にして部分積分すると` },
            {
              k: "math",
              t: String.raw`\int(\cos t)\log(\cos t)\,dt=\sin t\log(\cos t)-\int \sin t\cdot\frac{-\sin t}{\cos t}\,dt=\sin t\log(\cos t)+\int\frac{\sin^{2}t}{\cos t}\,dt`,
            },
            { k: "p", t: String.raw`である。$\sin^{2}t=1-\cos^{2}t$ と直すと` },
            {
              k: "math",
              t: String.raw`\int\frac{\sin^{2}t}{\cos t}\,dt=\int\frac{dt}{\cos t}-\int\cos t\,dt=\int\frac{dt}{\cos t}-\sin t`,
            },
            { k: "p", t: String.raw`となる。$\displaystyle\int\frac{dt}{\cos t}$ は分母分子に $\cos t$ をかけて $s=\sin t$ と置換すれば` },
            {
              k: "math",
              t: String.raw`\int\frac{\cos t}{1-\sin^{2}t}\,dt=\int\frac{ds}{(1-s)(1+s)}=\frac12\int\left(\frac{1}{1+s}+\frac{1}{1-s}\right)ds=\frac12\log\frac{1+\sin t}{1-\sin t}`,
            },
            { k: "p", t: String.raw`（$0\le t\le\dfrac\pi4$ では $1\pm\sin t>0$）となる。まとめると` },
            {
              k: "math",
              t: String.raw`I=\left[\sin t\log(\cos t)+\frac12\log\frac{1+\sin t}{1-\sin t}-\sin t\right]_0^{\pi/4}`,
            },
            { k: "p", t: String.raw`である。$t=\dfrac\pi4$ では $\sin t=\cos t=\dfrac{1}{\sqrt2}$、$\log(\cos t)=-\dfrac12\log2$ で` },
            {
              k: "math",
              t: String.raw`\frac{1+\frac{1}{\sqrt2}}{1-\frac{1}{\sqrt2}}=\frac{\sqrt2+1}{\sqrt2-1}=\left(\sqrt2+1\right)^{2}`,
            },
            { k: "p", t: String.raw`だから $\dfrac12\log\left(\sqrt2+1\right)^{2}=\log\left(1+\sqrt2\right)$ となる。$t=0$ では3項とも $0$ なので` },
            {
              k: "math",
              t: String.raw`I=-\frac{\log2}{2\sqrt2}+\log\left(1+\sqrt2\right)-\frac{1}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である。いっぽう $f$ の前半は` },
            {
              k: "math",
              t: String.raw`\cos\frac\pi4\log\left(\cos\frac\pi4\right)-\cos\frac\pi4=-\frac{\log2}{2\sqrt2}-\frac{1}{\sqrt2}`,
            },
            { k: "p", t: String.raw`なので、足して` },
            {
              k: "math",
              t: String.raw`f\!\left(\frac\pi4\right)=-\frac{\log2}{\sqrt2}-\frac{2}{\sqrt2}+\log\left(1+\sqrt2\right)=\log\left(1+\sqrt2\right)-\frac{\sqrt2}{2}\log2-\sqrt2`,
            },
            { k: "p", t: String.raw`を得る。これが求める最小値である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{1}{\cos t}$ の積分は、分母分子に $\cos t$ をかけて $s=\sin t$ と置くのが定石である。いきなり部分分数にしようとすると手が止まる。`,
            String.raw`$\dfrac{\log2}{2\sqrt2}$ は $f$ の前半と積分の両方から1つずつ出てきて、合わせて $\dfrac{\log2}{\sqrt2}=\dfrac{\sqrt2}{2}\log2$ になる。片方だけ数えないように注意する。`,
          ],
          check: String.raw`$\log\left(1+\sqrt2\right)-\dfrac{\sqrt2}{2}\log2-\sqrt2=0.881374-0.490129-1.414214=-1.022969$。$f$ を数値積分して $0\le x<\dfrac\pi2$ を $2000$ 等分で全探索すると、最小値 $-1.022969$ を $x=0.78535$ 付近でとる。$\dfrac\pi4=0.785398$ と合う。`,
        },
      ],
    },
    {
      no: 2,
      field: "整数・数列",
      topics: ["漸化式と整除", "合同式", "最大公約数", "ユークリッドの互除法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a_1$ から $a_{16}$ までを多倍長整数で計算し、$1\\le m,n\\le12$ の全組で「$a_m$ と $a_n$ の最大公約数が $a_{(m,n)}$ に等しい」ことを確かめた",
          "$a_n$ を $25$ で割った余りが $1,2,5$ の繰り返しになり、$3$ の倍数番目でちょうど $5$ になる（$25$ では割り切れない）ことを確かめた",
          "$(m,n)=(6,9),(9,6),(6,15)$ など最大公約数が $3$ になる組で、$a_m$ と $a_n^{2}$ の最大公約数が $5$ になることを多倍長整数で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ が $3$ の倍数のとき $a_n$ が $5$ の倍数であることを示す`,
          answer: String.raw`$5$ で割った余りが $1,\,2,\,0$ の繰り返しになる`,
          approach: String.raw`$a_{n+1}$ は $a_n$ だけから決まるので、$5$ で割った余りも「余り $\to$ 余り」で決まる。最初の数項の余りを書き出すと周期3で繰り返すことが見え、あとはそれを数学的帰納法で固めるだけでよい。`,
          blocks: [
            { k: "p", t: String.raw`$a_1=1$、$a_2=2$、$a_3=5$、$a_4=26$、$a_5=677$、… である。$5$ で割った余りを順に書くと` },
            { k: "math", t: String.raw`1,\ 2,\ 0,\ 1,\ 2,\ 0,\ \dots` },
            {
              k: "p",
              t: String.raw`となる。これを証明する。$m$ を $0$ 以上の整数として、次の主張を $m$ についての数学的帰納法で示す。`,
            },
            {
              k: "math",
              t: String.raw`a_{3m+1}\equiv1,\qquad a_{3m+2}\equiv2,\qquad a_{3m+3}\equiv0\pmod5`,
            },
            {
              k: "p",
              t: String.raw`$m=0$ のときは $a_1=1$、$a_2=2$、$a_3=5$ で成り立つ。$m$ で成り立つとすると、$a_{3m+3}\equiv0$ だから`,
            },
            {
              k: "math",
              t: String.raw`a_{3m+4}=a_{3m+3}^{2}+1\equiv0+1=1,\quad a_{3m+5}\equiv1^{2}+1=2,\quad a_{3m+6}\equiv2^{2}+1=5\equiv0\pmod 5`,
            },
            {
              k: "p",
              t: String.raw`となり $m+1$ でも成り立つ。よってすべての $m$ で成り立ち、とくに $n$ が $3$ の倍数のとき $a_n$ は $5$ の倍数である。`,
            },
            {
              k: "note",
              t: String.raw`同じ計算を $25$ を法として行うと、余りは $1,2,5$ の繰り返しになる（$a_4=26\equiv1\pmod{25}$ がきっかけ）。つまり $3$ の倍数番目の項は $5$ では割り切れるが $25$ では割り切れない。これは (3) で効く。`,
            },
          ],
          check: String.raw`$a_6=458330=5\times91666$ で、$91666$ は $5$ の倍数でない。$a_9$ まで多倍長整数で計算しても、$3$ の倍数番目はすべて $5$ でちょうど1回だけ割り切れる。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_n$ が $a_k$ の倍数となるための必要十分条件を $k,n$ で表す`,
          answer: String.raw`$n$ が $k$ の倍数であること`,
          approach: String.raw`$a_{k+1}=a_k^{2}+1$ は $a_k$ で割ると $1$ 余る。つまり $a_k$ を法として見ると、数列は $k$ 項目からまた $a_1,a_2,\dots$ をなぞり直す。この「周期 $k$」が分かれば、$a_n$ の余りは $n$ を $k$ で割った余りだけで決まる。あとは $a_1<a_2<\cdots$ であることから、余りが $0$ になるのは割り切れるときだけだと分かる。`,
          blocks: [
            { k: "p", t: String.raw`まず $\{a_n\}$ は $a_1=1$ で $a_{n+1}-a_n=a_n^{2}-a_n+1=\left(a_n-\dfrac12\right)^{2}+\dfrac34>0$ だから狭義の増加列で、すべて正の整数である。` },
            { k: "p", t: String.raw`**$a_k$ を法とした周期。** 次を $j$ についての数学的帰納法で示す。` },
            { k: "math", t: String.raw`a_{k+j}\equiv a_j\pmod{a_k}\qquad(j=1,2,3,\dots)` },
            {
              k: "p",
              t: String.raw`$j=1$ のときは $a_{k+1}=a_k^{2}+1\equiv1=a_1$ で成り立つ。$j$ で成り立つとすると`,
            },
            { k: "math", t: String.raw`a_{k+j+1}=a_{k+j}^{2}+1\equiv a_j^{2}+1=a_{j+1}\pmod{a_k}` },
            { k: "p", t: String.raw`となり $j+1$ でも成り立つ。これを繰り返し使えば、$q$ を正の整数として $a_{qk+j}\equiv a_j\pmod{a_k}$ が言える。` },
            {
              k: "p",
              t: String.raw`**余りが $0$ になるとき。** $n$ を $k$ で割って $n=qk+r$（$1\le r\le k$、$q\ge0$）と書く。上より $a_n\equiv a_r\pmod{a_k}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$r=k$（つまり $n$ が $k$ の倍数）のとき：$a_n\equiv a_k\equiv0$ なので $a_n$ は $a_k$ の倍数。`,
                String.raw`$1\le r<k$ のとき：$k\ge2$ であり、増加列だから $0<a_r<a_k$。よって $a_r$ は $a_k$ の倍数ではなく、$a_n$ も $a_k$ の倍数ではない。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$k=1$ のときは $a_1=1$ ですべての $a_n$ が $a_1$ の倍数であり、「$n$ が $1$ の倍数」も常に正しいので、この場合も合っている。よって求める必要十分条件は`,
            },
            { k: "math", t: String.raw`n\ \text{が}\ k\ \text{の倍数であること}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$n=qk+r$ の余りを $0\le r<k$ ではなく $1\le r\le k$ ととると、「ちょうど割り切れる」場合が $r=k$ としてきれいに扱える。$a_0$ を定義せずに済む。`,
            String.raw`「$a_r$ が $a_k$ の倍数でない」の根拠は $0<a_r<a_k$ である。増加列であることを先に言っておく。`,
          ],
          check: String.raw`$a_6=458330$ は $a_3=5$ の倍数で、$a_2=2$ の倍数でもある（$6$ は $3$ と $2$ の倍数）。$a_4=26$ は $a_2=2$ の倍数だが $a_3=5$ の倍数ではない（$4$ は $2$ の倍数だが $3$ の倍数でない）。多倍長整数で $1\le k,n\le12$ を全部調べても例外はなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{2022}$ と $\left(a_{8091}\right)^{2}$ の最大公約数を求める`,
          answer: String.raw`$5$`,
          approach: String.raw`(2) で得た「$a_k$ を法とすると周期 $k$」をそのまま使う。$8091$ を $2022$ で割った余りは $3$ なので、$a_{8091}$ は $a_{2022}$ で割ると $a_3=5$ 余る。すると $\left(a_{8091}\right)^{2}$ は $25$ 余るので、互除法で「$a_{2022}$ と $25$ の最大公約数」に化ける。あとは $a_{2022}$ が $5$ で割り切れて $25$ で割り切れないことを言えばよい。`,
          blocks: [
            { k: "p", t: String.raw`$8091=4\cdot2022+3$ である。(2) の証明で示した $a_{k+j}\equiv a_j\pmod{a_k}$ を $k=2022$ として4回使うと` },
            { k: "math", t: String.raw`a_{8091}\equiv a_{6069}\equiv a_{4047}\equiv a_{2025}\equiv a_3=5\pmod{a_{2022}}` },
            { k: "p", t: String.raw`となる。したがって` },
            { k: "math", t: String.raw`\left(a_{8091}\right)^{2}\equiv5^{2}=25\pmod{a_{2022}}` },
            {
              k: "p",
              t: String.raw`である。ユークリッドの互除法より、$a_{2022}$ と $\left(a_{8091}\right)^{2}$ の最大公約数は、$a_{2022}$ と $25$ の最大公約数に等しい（$a_{2022}>25$ なので、$\left(a_{8091}\right)^{2}$ を $a_{2022}$ で割った余りはちょうど $25$ である）。`,
            },
            { k: "p", t: String.raw`**$a_{2022}$ を $25$ で割った余り。** (1) と同じ要領で、$25$ を法として` },
            { k: "math", t: String.raw`a_{3m+1}\equiv1,\qquad a_{3m+2}\equiv2,\qquad a_{3m+3}\equiv5\pmod{25}` },
            {
              k: "p",
              t: String.raw`を数学的帰納法で示す。$m=0$ では $a_1=1$、$a_2=2$、$a_3=5$ で正しい。$m$ で正しいとすると $a_{3m+3}\equiv5$ より`,
            },
            {
              k: "math",
              t: String.raw`a_{3m+4}\equiv5^{2}+1=26\equiv1,\quad a_{3m+5}\equiv1+1=2,\quad a_{3m+6}\equiv2^{2}+1=5\pmod{25}`,
            },
            {
              k: "p",
              t: String.raw`となるので $m+1$ でも正しい。$2022=3\cdot674$ は $3$ の倍数だから $a_{2022}\equiv5\pmod{25}$、つまり $a_{2022}$ は $5$ で割り切れるが $25$ では割り切れない。`,
            },
            {
              k: "p",
              t: String.raw`よって $a_{2022}$ と $25$ の最大公約数は $5$ であり、求める最大公約数は $5$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(a_{8091}\right)^{2}$ を $a_{8091}$ と同じに扱わない。$a_{2022}$ と $a_{8091}$ の最大公約数は $5$ だが、2乗したぶん $5$ の指数が増える可能性があるので、$a_{2022}$ が $25$ で割り切れないことまで確かめて初めて答えが $5$ と決まる。`,
            String.raw`$8091$ と $2022$ の最大公約数が $3$ であること（$8091=3^{2}\cdot29\cdot31$、$2022=2\cdot3\cdot337$）と、$a_3=5$ が対応しているのは偶然ではない。一般に $a_m$ と $a_n$ の最大公約数は $a_{(m,n)}$ になる。`,
          ],
          check: String.raw`小さい番号で同じ状況を作って確かめられる。$m=6$、$n=9$ は最大公約数が $3$ で、多倍長整数で計算すると $a_6$ と $\left(a_9\right)^{2}$ の最大公約数は $5$ になる。$m=6$、$n=15$ でも、$m=9$、$n=6$ でも $5$ である。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式・微分法",
      topics: ["領域の面積", "包除原理", "場合分け", "3次関数の増減"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "正方形 $D$ を $1500\\times1500$ の格子で走査し、4点から「十分離れている」点の面積を直接数えて、$a=1.0,1.1,1.3,\\sqrt2,1.5,1.6,\\sqrt3$ のすべてで $f(a)$ の式と小数3桁以上一致することを確かめた",
          "$f(a)$ を $1\\le a\\le\\sqrt3$ で $20000$ 等分した全探索で最小値 $2.414226$ を $a=1.414194$ に見つけ、$\\sqrt2+1=2.414214$、$\\sqrt2=1.414214$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}$ の $x$ 座標 $a$ のとりうる値の範囲を求める`,
          answer: String.raw`$1\le a\le\sqrt3$`,
          approach: String.raw`「十分離れていない」のほうが扱いやすい。点 $\mathrm{T}$ から十分離れていない点の全体は、$\mathrm{T}$ を中心とする1辺 $2$ の正方形の内部である。$\mathrm{P}$ は放物線上にあるので $\mathrm{P}(a,a^{2})$ と書け、$\mathrm{O},\mathrm{A},\mathrm{B}$ それぞれについて条件を書き下すだけでよい。$\mathrm{A}$ と $\mathrm{B}$ の条件は、$a$ の動ける範囲ではもともと自動的にみたされる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{S}$ が $\mathrm{T}$ から十分離れて**いない**とは、$\left|x_1-x_2\right|<1$ かつ $\left|y_1-y_2\right|<1$ のこと、すなわち $\mathrm{S}$ が $\mathrm{T}$ を中心とする1辺 $2$ の正方形の内部（周を含まない）にあることである。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $D$ の点かつ $y=x^{2}$ 上なので $\mathrm{P}\left(a,a^{2}\right)$ と書け、$0\le a\le3$ かつ $0\le a^{2}\le3$ から $0\le a\le\sqrt3$ である。`,
            },
            { k: "p", t: String.raw`3点それぞれからの条件を見る。` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{O}(0,0)$ から十分離れている：$|a|\ge1$ または $\left|a^{2}\right|\ge1$。$a\ge0$ ではどちらも $a\ge1$ と同値なので、条件は $a\ge1$。`,
                String.raw`$\mathrm{A}(3,0)$ から十分離れている：$|a-3|\ge1$ または $\left|a^{2}\right|\ge1$。$a\le\sqrt3<2$ より $3-a>1$ なので、つねに成り立つ。`,
                String.raw`$\mathrm{B}(3,3)$ から十分離れている：$|a-3|\ge1$ または $\left|a^{2}-3\right|\ge1$。同じく $3-a>1$ なので、つねに成り立つ。`,
              ],
            },
            { k: "p", t: String.raw`したがって効く条件は $a\ge1$ だけで、求める範囲は $1\le a\le\sqrt3$ である。` },
          ],
          pitfalls: [
            String.raw`「十分離れている」の定義は **または** である。否定をとると **かつ** になる。この入れかわりを取り違えると、$\mathrm{A}$、$\mathrm{B}$ の条件まで効いてしまう。`,
          ],
          check: String.raw`$a=1$ のとき $\mathrm{P}(1,1)$ で、$\mathrm{O}$ との差は $x$ も $y$ も $1$ だからちょうど「十分離れている」。$a$ をわずかに小さくすると両方の差が $1$ 未満になり条件を外れる。右端 $a=\sqrt3$ では $\mathrm{P}\left(\sqrt3,3\right)$ で、$y=3$ はまだ $D$ の中にある。`,
        },
        {
          label: "(2)",
          task: String.raw`条件 (iii)(iv) をともにみたす点 $\mathrm{Q}$ が存在しうる範囲の面積 $f(a)$ を求める`,
          answer: String.raw`$f(a)=\begin{cases}a^{3}-2a^{2}-a+5&\left(1\le a\le\sqrt2\right)\\[1mm]2a^{2}+a-3&\left(\sqrt2\le a\le\sqrt3\right)\end{cases}$`,
          approach: String.raw`$D$ から「$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{P}$ のどれかに近すぎる部分」を取り除けばよい。取り除く4つは、それぞれの点を中心とする1辺 $2$ の正方形と $D$ の共通部分である。$\mathrm{O},\mathrm{A},\mathrm{B}$ のぶんは角にある1辺 $1$ の正方形で固定、$\mathrm{P}$ のぶんだけが $a$ とともに動く。重なりを引く（包除原理）のがこの問題の作業で、$\mathrm{P}$ の正方形が上にはみ出すかどうかで $a=\sqrt2$ を境に式が変わる。`,
          blocks: [
            { k: "p", t: String.raw`$D$ の面積は $9$ である。取り除く部分を順に見る。` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{O}$ に近すぎる部分：$0\le x<1$、$0\le y<1$。面積 $1$。`,
                String.raw`$\mathrm{A}$ に近すぎる部分：$2<x\le3$、$0\le y<1$。面積 $1$。`,
                String.raw`$\mathrm{B}$ に近すぎる部分：$2<x\le3$、$2<y\le3$。面積 $1$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`この3つはどの2つも重ならない。$\mathrm{P}\left(a,a^{2}\right)$ に近すぎる部分は $a-1<x<a+1$、$a^{2}-1<y<a^{2}+1$ で、$1\le a\le\sqrt3$ のもとでは`,
            },
            {
              k: "math",
              t: String.raw`0\le a-1,\qquad a+1\le\sqrt3+1<3,\qquad 0\le a^{2}-1`,
            },
            {
              k: "p",
              t: String.raw`だから、左右と下は $D$ からはみ出さない。上は $a^{2}+1>3$、すなわち $a>\sqrt2$ のときだけはみ出す。$D$ との共通部分の面積を $S_\mathrm{P}$ とすると`,
            },
            {
              k: "math",
              t: String.raw`S_\mathrm{P}=\begin{cases}2\cdot2=4&\left(1\le a\le\sqrt2\right)\\[1mm]2\left\{3-\left(a^{2}-1\right)\right\}=2\left(4-a^{2}\right)&\left(\sqrt2\le a\le\sqrt3\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。次に $\mathrm{P}$ のぶんと他の3つとの重なりを求める。横幅と縦幅を別々に見ればよい。` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{O}$ との重なり：横は $a-1\le x<1$ で幅 $2-a$、縦は $a^{2}-1\le y<1$ で幅 $2-a^{2}$（$a>\sqrt2$ では縦が重ならず $0$）。面積は $\left(2-a\right)\left(2-a^{2}\right)$。`,
                String.raw`$\mathrm{A}$ との重なり：横は $2<x<a+1$ で幅 $a-1$、縦は $\mathrm{O}$ と同じで $2-a^{2}$。面積は $\left(a-1\right)\left(2-a^{2}\right)$。`,
                String.raw`$\mathrm{B}$ との重なり：横は幅 $a-1$、縦は $2<y<\min\left\{3,\,a^{2}+1\right\}$ で幅は $a\le\sqrt2$ のとき $a^{2}-1$、$a\ge\sqrt2$ のとき $1$。`,
              ],
            },
            { k: "p", t: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B}$ の3つは互いに重ならないので、3つ以上が重なることはない。` },
            { k: "p", t: String.raw`**$1\le a\le\sqrt2$ のとき。** 重なりの合計は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
&\left(2-a\right)\left(2-a^{2}\right)+\left(a-1\right)\left(2-a^{2}\right)+\left(a-1\right)\left(a^{2}-1\right)\\[1mm]
&=\left(2-a^{2}\right)\bigl\{(2-a)+(a-1)\bigr\}+\left(a-1\right)^{2}(a+1)\\[1mm]
&=\left(2-a^{2}\right)+\left(a^{3}-a^{2}-a+1\right)=a^{3}-2a^{2}-a+3
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f(a)=9-\left(1+1+1+4\right)+\left(a^{3}-2a^{2}-a+3\right)=a^{3}-2a^{2}-a+5`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\sqrt2\le a\le\sqrt3$ のとき。** $a^{2}-1\ge1$ なので $\mathrm{O}$、$\mathrm{A}$ とは縦が重ならず、重なりは $\mathrm{B}$ とのぶん $\left(a-1\right)\cdot1=a-1$ だけである。よって`,
            },
            {
              k: "math",
              t: String.raw`f(a)=9-\left\{3+2\left(4-a^{2}\right)\right\}+\left(a-1\right)=2a^{2}+a-3`,
            },
            { k: "p", t: String.raw`となる。$a=\sqrt2$ ではどちらの式も $\sqrt2+1$ を与え、つながっている。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$a=1.3$ のときの様子。大きい正方形が $D$、網かけの4つが「$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{P}$ のどれかに近すぎて $\mathrm{Q}$ が置けない部分」。$f(a)$ は $D$ から網かけを除いた面積。`,
                view: [-0.55, 3.75, -0.55, 3.55],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [1, 0], [1, 1], [0, 1]] },
                  { k: "fill", pts: [[2, 0], [3, 0], [3, 1], [2, 1]] },
                  { k: "fill", pts: [[2, 2], [3, 2], [3, 3], [2, 3]] },
                  { k: "fill", pts: [[0.3, 0.69], [2.3, 0.69], [2.3, 2.69], [0.3, 2.69]] },
                  { k: "seg", a: [0, 0], b: [3, 0] },
                  { k: "seg", a: [3, 0], b: [3, 3] },
                  { k: "seg", a: [3, 3], b: [0, 3] },
                  { k: "seg", a: [0, 3], b: [0, 0] },
                  { k: "curve", f: (x: number) => x * x, from: 0, to: 1.7321, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [3, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [3, 3], label: "B", place: "above-right" },
                  { k: "dot", at: [1.3, 1.69], label: "P", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ の正方形は $\mathrm{O},\mathrm{A},\mathrm{B}$ の3つすべてと重なりうる。1つだけ見て済ませない。いっぽう $\mathrm{O},\mathrm{A},\mathrm{B}$ どうしは重ならないので、3つ以上が重なる項は考えなくてよい。`,
            String.raw`場合の境目は $a=\sqrt2$（$\mathrm{P}$ の正方形が $D$ の上辺を越える）1か所だけである。$a=\sqrt3$ で $a^{2}-1=2$ になり $\mathrm{B}$ の正方形の下辺と一致するが、これは範囲の端なので新たな場合分けは起きない。`,
          ],
          check: String.raw`$D$ を $1500\times1500$ の格子で走査し、4点から十分離れている点の面積を直接数えると、$a=1.0$ で $3.000$、$a=1.3$ で $2.517$、$a=1.5$ で $3.000$、$a=\sqrt3$ で $4.732$ となる。式はそれぞれ $3$、$2.517$、$3$、$3+\sqrt3=4.732$ で一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$f(a)$ を最小にする $a$ の値を求める`,
          answer: String.raw`$a=\sqrt2$`,
          approach: String.raw`2つの区間それぞれで微分する。前半の3次式の導関数の零点が $\sqrt2$ より右にあることが分かれば、前半はずっと減少、後半はずっと増加となり、境目の $a=\sqrt2$ が最小だと決まる。`,
          blocks: [
            { k: "p", t: String.raw`**$1\le a\le\sqrt2$ のとき。** $f(a)=a^{3}-2a^{2}-a+5$ より` },
            { k: "math", t: String.raw`f'(a)=3a^{2}-4a-1` },
            {
              k: "p",
              t: String.raw`である。$3a^{2}-4a-1=0$ の正の解は $a=\dfrac{2+\sqrt7}{3}$ で、$\sqrt7>2.6$ より $\dfrac{2+\sqrt7}{3}>1.53>\sqrt2$ である。よって $1\le a\le\sqrt2$ では $f'(a)<0$（実際 $f'(1)=-2$）で、$f$ は減少する。`,
            },
            {
              k: "p",
              t: String.raw`**$\sqrt2\le a\le\sqrt3$ のとき。** $f(a)=2a^{2}+a-3$ より $f'(a)=4a+1>0$ で、$f$ は増加する。`,
            },
            {
              k: "p",
              t: String.raw`したがって $f$ は $a=\sqrt2$ で最小になる。最小値は $f\!\left(\sqrt2\right)=\sqrt2+1$ である。`,
            },
          ],
          pitfalls: [
            String.raw`前半の区間に $f'$ の零点が入っていないことを、$\dfrac{2+\sqrt7}{3}$ と $\sqrt2$ の大小で押さえる。$\sqrt7>2.6$ と $\sqrt2<1.42$ を使えば十分である。`,
          ],
          check: String.raw`$f(a)$ を $1\le a\le\sqrt3$ で $20000$ 等分して全探索すると、最小値 $2.414226$ を $a=1.414194$ でとる。$\sqrt2=1.414214$、$\sqrt2+1=2.414214$ と合う。両端の値は $f(1)=3$、$f\!\left(\sqrt3\right)=3+\sqrt3=4.732$ で、どちらも $\sqrt2+1$ より大きい。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・積分法",
      topics: ["3次関数と直線", "面積", "変曲点", "領域の図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "直線 $y=mx+n$ と $C$ で囲まれる2つの部分の面積を数値積分で求め、$n=0$（原点を通る）のときだけ一致し、$n\\ne0$ では一致しないことを確かめた",
          "点 $(X,Y)$ について、傾きを細かく動かして「原点を通り $C$ と3点で交わる直線に乗っているか」を直接探す判定と、$x(x+y)>0$ という答えの判定が一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`座標平面上のすべての点 $\mathrm{P}$ が条件 (i) をみたすことを示す`,
          answer: String.raw`$\mathrm{P}(X,Y)$ に対し、傾き $m$ を十分大きくとればよい（$m>\dfrac{27}{4}\left(|X|+|Y|\right)^{2}$ かつ $m\ge1$ で足りる）`,
          approach: String.raw`$\mathrm{P}$ を通る傾き $m$ の直線を引き、交点の方程式を作る。3次方程式が相異なる3実解をもつ条件は「極大値と極小値が異符号」である。極値を与える $x$ は $m$ で決まるので、極大値・極小値を $m$ で書き下してしまえば、$m$ を大きくすると条件がみたされることが見える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}(X,Y)$ とし、$\mathrm{P}$ を通る傾き $m$ の直線 $y=m(x-X)+Y$ を考える。$C$ との交点の $x$ 座標は`,
            },
            {
              k: "math",
              t: String.raw`h(x)=x^{3}-x-m(x-X)-Y=x^{3}-(1+m)x+(mX-Y)=0`,
            },
            { k: "p", t: String.raw`の解である。以下 $m\ge1$ とし、$c=1+m\ge2>0$、$k=mX-Y$ とおく。$h'(x)=3x^{2}-c$ より、$h$ は` },
            {
              k: "math",
              t: String.raw`x=-\sqrt{\frac c3}\ \text{で極大},\qquad x=\sqrt{\frac c3}\ \text{で極小}`,
            },
            { k: "p", t: String.raw`となる。$x=\pm\sqrt{\dfrac c3}$ では $x^{3}=\pm\dfrac c3\sqrt{\dfrac c3}$ だから` },
            {
              k: "math",
              t: String.raw`h\!\left(-\sqrt{\frac c3}\right)=\frac{2c}{3}\sqrt{\frac c3}+k,\qquad h\!\left(\sqrt{\frac c3}\right)=-\frac{2c}{3}\sqrt{\frac c3}+k`,
            },
            {
              k: "p",
              t: String.raw`である。3次方程式 $h(x)=0$ が相異なる3実解をもつのは（極大値）$>0>$（極小値）のとき、すなわち`,
            },
            { k: "math", t: String.raw`|k|<\frac{2c}{3}\sqrt{\frac c3}=\frac{2}{3\sqrt3}c^{\frac32}` },
            { k: "p", t: String.raw`のときである。ここで $m\ge1$ より` },
            {
              k: "math",
              t: String.raw`|k|=|mX-Y|\le m|X|+|Y|\le m\left(|X|+|Y|\right),\qquad \frac{2}{3\sqrt3}c^{\frac32}>\frac{2}{3\sqrt3}m^{\frac32}`,
            },
            { k: "p", t: String.raw`だから、` },
            {
              k: "math",
              t: String.raw`m\left(|X|+|Y|\right)\le\frac{2}{3\sqrt3}m^{\frac32}\iff |X|+|Y|\le\frac{2}{3\sqrt3}\sqrt m\iff m\ge\frac{27}{4}\left(|X|+|Y|\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`が成り立てばよい。よって $m=\max\left\{1,\ \dfrac{27}{4}\left(|X|+|Y|\right)^{2}\right\}+1$ などととれば、その傾きの直線は $C$ と相異なる3点で交わる。どんな $\mathrm{P}$ についてもこのような $m$ がとれるので、条件 (i) はすべての点でみたされる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ が $C$ の上にあっても問題ない。交点が3つあればよく、そのうちの1つが $\mathrm{P}$ 自身でもかまわない。`,
            String.raw`「十分大きい $m$ をとればよい」で終わらせず、$|k|$ が $m$ の1次、右辺が $m$ の $\frac32$ 乗であることを示して、具体的な $m$ の目安まで書く。`,
          ],
          check: String.raw`$\mathrm{P}(0,10)$ なら $\dfrac{27}{4}\cdot100=675$ で、$m=676$ とすると直線は $y=676x+10$。$x^{3}-677x-10=0$ の極小値は $-\dfrac{2\cdot677}{3}\sqrt{\dfrac{677}{3}}-10=-6782$、極大値は $+6762$ で異符号になり、確かに3実解をもつ。`,
        },
        {
          label: "(2)",
          task: String.raw`条件 (ii) をみたす点 $\mathrm{P}$ のとりうる範囲を図示する`,
          answer: String.raw`$x(x+y)>0$ の表す領域（2直線 $x=0$、$y=-x$ で分けられる4つの部分のうち、左右の2つ。境界は含まない）と、原点`,
          approach: String.raw`まず「2つの面積が等しい」を言いかえる。交点の $x$ 座標を $\alpha<\beta<\gamma$ とすると、2つの面積が等しいことは $\displaystyle\int_\alpha^\gamma\left\{(x^{3}-x)-(mx+n)\right\}dx=0$ と同じで、これを計算すると「$\beta$ が $\alpha$ と $\gamma$ の中点」に行き着く。$C$ には $x^{2}$ の項がないので解と係数の関係から $\alpha+\beta+\gamma=0$ であり、合わせると $\beta=0$、つまり直線は原点を通る。あとは「原点を通り3点で交わる直線」がどこを覆うかを見ればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線 $\ell:y=mx+n$ が $C$ と相異なる3点で交わるとし、その $x$ 座標を $\alpha<\beta<\gamma$ とする。`,
            },
            { k: "math", t: String.raw`g(x)=\left(x^{3}-x\right)-\left(mx+n\right)=(x-\alpha)(x-\beta)(x-\gamma)` },
            {
              k: "p",
              t: String.raw`とおくと、$\alpha<x<\beta$ では $g>0$、$\beta<x<\gamma$ では $g<0$ である。2つの部分の面積は $\displaystyle\int_\alpha^\beta g\,dx$ と $-\displaystyle\int_\beta^\gamma g\,dx$ だから、これらが等しいことは`,
            },
            { k: "math", t: String.raw`\int_\alpha^\gamma g(x)\,dx=0` },
            {
              k: "p",
              t: String.raw`と同じである。$p=\beta-\alpha>0$、$q=\gamma-\beta>0$ とおき、$x=\beta+u$ と置換すると`,
            },
            {
              k: "math",
              t: String.raw`\int_{-p}^{q}(u+p)u(u-q)\,du=\int_{-p}^{q}\left\{u^{3}+(p-q)u^{2}-pqu\right\}du`,
            },
            { k: "p", t: String.raw`となる。これを計算して整理すると` },
            { k: "math", t: String.raw`\int_{-p}^{q}(u+p)u(u-q)\,du=-\frac{(q-p)(p+q)^{3}}{12}` },
            {
              k: "p",
              t: String.raw`となる。$p+q>0$ だから、これが $0$ になるのは $p=q$、すなわち $\beta$ が $\alpha$ と $\gamma$ の中点のときに限る。`,
            },
            {
              k: "p",
              t: String.raw`いっぽう $g(x)=x^{3}-(1+m)x-n$ には $x^{2}$ の項がないので、解と係数の関係から $\alpha+\beta+\gamma=0$ である。$\alpha+\gamma=2\beta$ と合わせると $3\beta=0$、つまり $\beta=0$ となり、$\ell$ は $C$ 上の点 $(0,0)$、すなわち原点を通る。`,
            },
            {
              k: "p",
              t: String.raw`逆に $\ell$ が原点を通るとする。$\ell$ が $y$ 軸なら共有点は原点だけなので、$\ell:y=mx$ としてよい。交点は $x^{3}-x=mx$、つまり $x\left(x^{2}-1-m\right)=0$ の解で、相異なる3つになるのは $1+m>0$、すなわち $m>-1$ のときである。このとき $\beta=0$ が中点になるので、2つの面積は等しい。`,
            },
            {
              k: "p",
              t: String.raw`以上より、条件 (ii) は「$\mathrm{P}$ がある $m>-1$ について直線 $y=mx$ の上にある」と同値である。$\mathrm{P}(X,Y)$ について調べる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$X>0$ のとき：$m=\dfrac YX$ とすればよく、条件は $\dfrac YX>-1$、すなわち $X+Y>0$。`,
                String.raw`$X<0$ のとき：同じく $m=\dfrac YX$ で、$\dfrac YX>-1$ の両辺に負の数 $X$ をかけて $Y<-X$、すなわち $X+Y<0$。`,
                String.raw`$X=0$ のとき：$\mathrm{P}$ を通る原点を通る直線は $y$ 軸しかない（$Y\ne0$ のとき）ので不適。$Y=0$、つまり $\mathrm{P}$ が原点のときは、たとえば $m=0$ の直線が条件をみたすので適する。`,
              ],
            },
            { k: "p", t: String.raw`まとめると、求める範囲は` },
            { k: "math", t: String.raw`x(x+y)>0\quad\text{の表す領域}\ \cup\ \{\,\text{原点}\,\}` },
            {
              k: "p",
              t: String.raw`である。これは2直線 $x=0$ と $y=-x$ が平面を分けてできる4つの部分のうち、$x$ 軸を含む左右の2つで、境界の2直線は（原点を除いて）含まない。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`求める範囲（網かけ）。2直線 $x=0$ と $y=-x$（破線）が境界で、境界は原点を除いて含まない。原点だけは範囲に入る。`,
                view: [-3.2, 3.2, -3.2, 3.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [0, 3], [3, 3], [3, -3]] },
                  { k: "fill", pts: [[0, 0], [0, -3], [-3, -3], [-3, 3]] },
                  { k: "seg", a: [0, -3.1], b: [0, 3.1], dash: true },
                  { k: "seg", a: [-3.1, 3.1], b: [3.1, -3.1], dash: true },
                  { k: "dot", at: [0, 0], label: "原点は含む", place: "below-right" },
                  { k: "text", at: [2.2, 1.6], label: "y = −x", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\int_\alpha^\gamma g\,dx=0$ は「2つの面積が等しい」の言いかえであって、「面積が $0$」ではない。符号が逆の2つを足して $0$ になる、という意味である。`,
            String.raw`$\alpha+\beta+\gamma=0$ が使えるのは、$C$ が $y=x^{3}-x$ で $x^{2}$ の項を持たないからである。直線を引いても $x^{2}$ の項は生まれない。`,
            String.raw`$y$ 軸上の点（原点を除く）は範囲に入らない。原点を通る直線のうち $y$ 軸だけは $C$ と1点でしか交わらないためで、この1点を落としやすい。`,
          ],
          check: String.raw`$\mathrm{P}(1,0)$ は $x(x+y)=1>0$ で範囲内。実際 $y=0$ は $C$ と $x=0,\pm1$ の3点で交わり、$C$ が奇関数なので2つの面積は等しい。$\mathrm{P}(1,-2)$ は $x(x+y)=-1<0$ で範囲外。原点を通ってこの点を通る直線は $y=-2x$ だけで、$x^{3}-x=-2x$ は $x\left(x^{2}+1\right)=0$ となり実数解が $x=0$ の1つしかない。傾きを $-10000$ から $10000$ まで細かく動かして直接探す判定と、$x(x+y)>0$ による判定は、調べた点すべてで一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形・積分法",
      topics: ["回転面", "中点の軌跡", "円環の面積", "体積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "各高さでの断面積 $\\pi\\left\\{\\left(r_1+r_2\\right)^{2}-\\left(r_1-r_2\\right)^{2}\\right\\}$ をシンプソン法で積分し、$2.276676349$ を得て $\\frac{4\\pi^{2}}{3}-2\\sqrt3\\pi=2.276676349$ と小数9桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$K$ の体積を求める`,
          answer: String.raw`$\dfrac{4\pi^{2}}{3}-2\sqrt3\,\pi$`,
          approach: String.raw`$\mathrm{M}$ の高さは $\mathrm{P}$ の高さの半分だから、$\mathrm{M}$ の $z$ 座標を決めると $\mathrm{P}$ の $z$ 座標も決まる。その高さでは $\mathrm{P}$ は $z$ 軸を中心とする1つの円の上を自由に動き、$\mathrm{Q}$ は $\mathrm{P}$ の真下を中心とする1つの円の上を自由に動く。$\mathrm{M}$ の水平位置は「長さ $r_1$ のベクトル」と「長さ $r_2$ のベクトル」の和になるので、断面は円環になる。あとは $z$ で積分するだけである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`線分 $\mathrm{AB}$ は $\left(t,\,0,\,2-t\right)$（$0\le t\le1$）と書けるので、$z$ 軸のまわりに回してできる曲面 $S$ は`,
            },
            { k: "math", t: String.raw`S:\ \sqrt{x^{2}+y^{2}}=2-z\qquad(1\le z\le2)` },
            {
              k: "p",
              t: String.raw`である。すなわち高さ $z$ での $S$ の断面は、$z$ 軸を中心とする半径 $2-z$ の円である。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ の $z$ 座標を $h$（$1\le h\le2$）とする。$\mathrm{Q}$ は $xy$ 平面上にあり $\mathrm{PQ}=2$ だから、$\mathrm{Q}$ は $\mathrm{P}$ の真下の点を中心とする半径 $\sqrt{4-h^{2}}$ の円の上を動く。$\mathrm{M}$ は $\mathrm{PQ}$ の中点なので`,
            },
            {
              k: "math",
              t: String.raw`\left(\mathrm{M}\ \text{の}\ z\ \text{座標}\right)=\frac h2,\qquad \overrightarrow{\mathrm{M}}_{xy}=\overrightarrow{\mathrm{P}}_{xy}+\frac{\overrightarrow{\mathrm{PQ}}_{xy}}{2}`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $\overrightarrow{\mathrm{P}}_{xy}$ は長さ $2-h$ の、$\dfrac{\overrightarrow{\mathrm{PQ}}_{xy}}{2}$ は長さ $\dfrac{\sqrt{4-h^{2}}}{2}$ のベクトルで、向きはそれぞれ独立に自由である。`,
            },
            {
              k: "p",
              t: String.raw`$z=\dfrac h2$ とおくと $h=2z$、$\dfrac12\le z\le1$ で`,
            },
            {
              k: "math",
              t: String.raw`r_1=2-2z,\qquad r_2=\frac{\sqrt{4-4z^{2}}}{2}=\sqrt{1-z^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。長さ $r_1$ のベクトルと長さ $r_2$ のベクトルを向き自由に足してできる点の全体は、$z$ 軸からの距離が $\left|r_1-r_2\right|$ 以上 $r_1+r_2$ 以下の円環である。よって高さ $z$ での $K$ の断面積は`,
            },
            {
              k: "math",
              t: String.raw`S(z)=\pi\left\{\left(r_1+r_2\right)^{2}-\left(r_1-r_2\right)^{2}\right\}=4\pi r_1r_2=8\pi(1-z)\sqrt{1-z^{2}}`,
            },
            { k: "p", t: String.raw`である。これを $\dfrac12\le z\le1$ で積分する。2つに分けて` },
            {
              k: "math",
              t: String.raw`\int_{\frac12}^{1}\sqrt{1-z^{2}}\,dz,\qquad \int_{\frac12}^{1}z\sqrt{1-z^{2}}\,dz`,
            },
            { k: "p", t: String.raw`を計算する。前者は $z=\sin\theta$ と置換すると $\theta$ は $\dfrac\pi6$ から $\dfrac\pi2$ まで動いて` },
            {
              k: "math",
              t: String.raw`\int_{\frac\pi6}^{\frac\pi2}\cos^{2}\theta\,d\theta=\left[\frac\theta2+\frac{\sin2\theta}{4}\right]_{\frac\pi6}^{\frac\pi2}=\frac\pi4-\left(\frac{\pi}{12}+\frac{\sqrt3}{8}\right)=\frac\pi6-\frac{\sqrt3}{8}`,
            },
            { k: "p", t: String.raw`となる。後者は` },
            {
              k: "math",
              t: String.raw`\left[-\frac13\left(1-z^{2}\right)^{\frac32}\right]_{\frac12}^{1}=\frac13\left(\frac34\right)^{\frac32}=\frac13\cdot\frac{3\sqrt3}{8}=\frac{\sqrt3}{8}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`V=8\pi\left\{\left(\frac\pi6-\frac{\sqrt3}{8}\right)-\frac{\sqrt3}{8}\right\}=8\pi\left(\frac\pi6-\frac{\sqrt3}{4}\right)=\frac{4\pi^{2}}{3}-2\sqrt3\,\pi`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$z=\frac34$ での断面を真上から見たもの。$\mathrm{P}$ の真下は半径 $r_1=\frac12$ の円（破線）の上を動き、そこから半径 $r_2=\frac{\sqrt7}{4}$ の円（細線）だけ離れたところに $\mathrm{M}$ が来る。$\mathrm{M}$ の全体は、$r_2-r_1$ から $r_1+r_2$ までの円環になる。`,
                view: [-1.45, 1.45, -1.35, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [(R1 + R2) * Math.cos(t), (R1 + R2) * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (t: number) =>
                      [Math.abs(R1 - R2) * Math.cos(t), Math.abs(R1 - R2) * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (t: number) => [R1 * Math.cos(t), R1 * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [R1 + R2 * Math.cos(t), R2 * Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "dot", at: [R1, 0], label: "P の真下", place: "below-right" },
                  { k: "text", at: [0, R1 + R2], label: "外半径 r1+r2", place: "above" },
                  { k: "text", at: [0, -Math.abs(R1 - R2)], label: "内半径", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ と $\mathrm{Q}$ の向きは独立に自由である。$\mathrm{Q}$ が $\mathrm{P}$ と同じ方向にあるとは限らないので、断面は円板ではなく円環になる。`,
            String.raw`$z=\dfrac35$ のところで $r_1=r_2$ となり、内半径が $0$ になる。そこだけ断面が円板になるが、面積の式 $4\pi r_1r_2$ はそのまま使える。`,
            String.raw`$\mathrm{M}$ の高さは $\dfrac h2$ なので、積分区間は $\dfrac12\le z\le1$ である。$\mathrm{P}$ の高さ $1\le h\le2$ のまま積分しないこと。`,
          ],
          check: String.raw`断面積 $8\pi(1-z)\sqrt{1-z^{2}}$ をシンプソン法で $\dfrac12$ から $1$ まで積分すると $2.276676349$ となり、$\dfrac{4\pi^{2}}{3}-2\sqrt3\,\pi=13.159472-10.882796=2.276676$ と小数9桁まで一致する。$z=1$（$\mathrm{P}$ が頂点 $\mathrm{A}$、$\mathrm{Q}$ が原点）で断面が1点につぶれることとも合う。`,
        },
      ],
    },
    {
      no: 6,
      field: "確率・ベクトル",
      topics: ["1次独立", "場合の数", "重複組合せ", "二項係数の最大"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$N=8,11,14$ について $2^{N}$ 通りの表裏をすべて並べて $\\mathrm{X}_N$ を直接計算し、原点に戻る場合の数が $10,\\,56,\\,346$、表の回数別の内訳が $\\left({}_{(N+1)/3-1}\\mathrm{C}_s\\right)^{3}$ と完全に一致することを確かめた",
          "$N=8$ の確率が $\\frac{10}{256}=\\frac{5}{128}$ になることを分数のまま確かめた",
          "$ {}_{66}\\mathrm{C}_s$ が $s=33$ で最大になることを直接計算で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$N=8$ のとき $\mathrm{X}_8$ が $\mathrm{O}$ にある確率を求める`,
          answer: String.raw`$\dfrac{5}{128}$`,
          approach: String.raw`$\vec{v_k}$ は $k$ を $3$ で割った余りだけで決まり、$\vec{v_0}+\vec{v_1}+\vec{v_2}=\vec0$ である。だから「どの向きのベクトルを何本足したか」だけが問題で、原点に戻るのは3方向の本数が等しいときに限る。表の回数を、その直前までに出た裏の回数で分類すれば、本数の内訳が組合せの問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec{v_k}$ は $\dfrac{2k\pi}{3}$ で決まるので、$k$ を $3$ で割った余りだけで決まり、$\vec{v_0},\vec{v_1},\vec{v_2}$ の3通りしかない。この3つは正三角形の頂点の向きで`,
            },
            { k: "math", t: String.raw`\vec{v_0}+\vec{v_1}+\vec{v_2}=\vec0` },
            { k: "p", t: String.raw`をみたし、$\vec{v_0}$ と $\vec{v_1}$ は1次独立である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`3つのベクトル $\vec{v_0},\vec{v_1},\vec{v_2}$。互いに $120^\circ$ ずつずれた単位ベクトルで、3つ足すと $\vec0$ になる。`,
                view: [-1.6, 1.6, -1.4, 1.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [0, 0], b: [-0.5, Math.sqrt(3) / 2] },
                  { k: "seg", a: [0, 0], b: [-0.5, -Math.sqrt(3) / 2] },
                  { k: "dot", at: [1, 0], label: "v0", place: "right" },
                  { k: "dot", at: [-0.5, Math.sqrt(3) / 2], label: "v1", place: "above-left" },
                  { k: "dot", at: [-0.5, -Math.sqrt(3) / 2], label: "v2", place: "below-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`表が出るたびに、そのときまでに出た裏の回数 $k$ に応じて $\vec{v_k}$ が足される。そこで、各回の表を「その表より前に出た裏の回数」で分類し、裏がちょうど $j$ 回出たあとに出た表の回数を $m_j$ とする。裏が全部で $t$ 回なら $j=0,1,\dots,t$ である。すると`,
            },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OX}_N}=\sum_{j=0}^{t}m_j\vec{v_j}=A\vec{v_0}+B\vec{v_1}+C\vec{v_2}` },
            {
              k: "p",
              t: String.raw`となる。ここで $A,B,C$ は $j$ を $3$ で割った余りが $0,1,2$ である $m_j$ の総和である。$\vec{v_2}=-\vec{v_0}-\vec{v_1}$ を代入すると`,
            },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OX}_N}=(A-C)\vec{v_0}+(B-C)\vec{v_1}` },
            {
              k: "p",
              t: String.raw`で、$\vec{v_0},\vec{v_1}$ が1次独立だから、$\mathrm{X}_N$ が $\mathrm{O}$ にあることは $A=B=C$ と同値である。`,
            },
            {
              k: "p",
              t: String.raw`**$N=8$ の場合。** 表の回数を $r$ とすると $r=A+B+C=3A$ なので $r$ は $3$ の倍数で、$r\le8$ より $r=0,3,6$ である。$t=8-r$ で、$m_j$ の番号 $j$ は $0$ から $t$ までの $9-r$ 個ある。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$r=0$：すべて裏。$A=B=C=0$ で条件をみたす。$1$ 通り。`,
                String.raw`$r=3$：$j=0,1,\dots,5$ の $6$ 個で、余り $0,1,2$ の組にそれぞれ $2$ 個ずつ（$\{0,3\}$、$\{1,4\}$、$\{2,5\}$）。各組の合計を $1$ にするには、$2$ 個のうちどちらを $1$ にするかで $2$ 通り。合わせて $2^{3}=8$ 通り。`,
                String.raw`$r=6$：$j=0,1,2$ の $3$ 個で、各組が $1$ 個ずつ。合計を $2$ にする方法は $m_0=m_1=m_2=2$ の $1$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$m_0,m_1,\dots,m_t$ の組を決めることと表裏の並びを決めることは1対1に対応するので、求める場合の数は $1+8+1=10$ である。全体は $2^{8}=256$ 通りなので`,
            },
            { k: "math", t: String.raw`\frac{10}{256}=\frac{5}{128}` },
            { k: "p", t: String.raw`が答えである。` },
          ],
          pitfalls: [
            String.raw`$k$ は「それまでに出た裏の回数」であって、何回目かではない。裏が出た回では点は動かず、$k$ が1つ増えるだけである。`,
            String.raw`$\vec{v_0},\vec{v_1},\vec{v_2}$ の3本は1次従属（足すと $\vec0$）なので、$A\vec{v_0}+B\vec{v_1}+C\vec{v_2}=\vec0$ から直ちに $A=B=C=0$ とは言えない。$\vec{v_2}$ を消して2本の1次独立なベクトルにしてから係数を比べる。`,
          ],
          check: String.raw`$2^{8}=256$ 通りの表裏をすべて並べて $\mathrm{X}_8$ を直接計算すると、原点に戻るのはちょうど $10$ 通りで、表の回数別の内訳は $r=0$ が $1$、$r=3$ が $8$、$r=6$ が $1$ となり、上の数え方と完全に一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$N=200$ のとき、$\mathrm{X}_{200}$ が $\mathrm{O}$ にあり表がちょうど $r$ 回出る確率 $p_r$ と、$p_r$ を最大にする $r$ を求める`,
          answer: String.raw`$r$ が $3$ の倍数で $0\le r\le198$ のとき $p_r=\dfrac{1}{2^{200}}\left({}_{66}\mathrm{C}_{\frac r3}\right)^{3}$、それ以外では $p_r=0$。最大になるのは $r=99$`,
          approach: String.raw`(1) の数え方をそのまま一般化する。$N=200$ のときに都合がよいのは、$r$ が $3$ の倍数なら $m_j$ の番号の個数 $201-r$ も $3$ の倍数になり、余り $0,1,2$ の3組に同じ個数ずつきれいに分かれることである。各組で「決まった個数の箱に決まった合計を配る」のは重複組合せで、3組とも同じ数になるので3乗の形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) と同様、$A=B=C$ が条件で、表の回数 $r$ は $3$ の倍数でなければならない。$r=3s$ とおく。$3$ の倍数でない $r$ では $p_r=0$ である。`,
            },
            {
              k: "p",
              t: String.raw`裏の回数は $t=200-3s$ で、$m_j$ の番号 $j$ は $0$ から $t$ までの`,
            },
            { k: "math", t: String.raw`t+1=201-3s=3\left(67-s\right)` },
            {
              k: "p",
              t: String.raw`個ある。これは $3$ の倍数なので、$j$ を $3$ で割った余りが $0,1,2$ の3つの組は、どれもちょうど $n=67-s$ 個ずつになる。`,
            },
            {
              k: "p",
              t: String.raw`条件 $A=B=C$ は $A=B=C=s$ ということだから、各組について「$n$ 個の $m_j$ の合計を $s$ にする」組み合わせを数えればよい。これは $s$ 個のものを $n$ 個の箱に分ける重複組合せで`,
            },
            {
              k: "math",
              t: String.raw`{}_{s+n-1}\mathrm{C}_{n-1}={}_{66}\mathrm{C}_{66-s}={}_{66}\mathrm{C}_{s}`,
            },
            {
              k: "p",
              t: String.raw`通りである（$s+n-1=s+66-s=66$ となるのがこの問題の仕掛けで、$200$ という回数がそのために選ばれている）。3つの組は独立に決められるので、表の回数が $r=3s$ で $\mathrm{X}_{200}$ が $\mathrm{O}$ にある並びは $\left({}_{66}\mathrm{C}_{s}\right)^{3}$ 通りある。`,
            },
            { k: "p", t: String.raw`全体は $2^{200}$ 通りで、どれも同じ確率だから` },
            {
              k: "math",
              t: String.raw`p_r=\frac{1}{2^{200}}\left({}_{66}\mathrm{C}_{\frac r3}\right)^{3}\qquad\left(r=0,3,6,\dots,198\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$n=67-s\ge1$ から $s\le66$、すなわち $r\le198$ で、$r=200$ などは $3$ の倍数でないので $p_r=0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**最大。** $p_r$ は $ {}_{66}\mathrm{C}_{s}$ の増減に従う。隣どうしの比をとると`,
            },
            {
              k: "math",
              t: String.raw`\frac{{}_{66}\mathrm{C}_{s+1}}{{}_{66}\mathrm{C}_{s}}=\frac{66-s}{s+1}`,
            },
            {
              k: "p",
              t: String.raw`で、これが $1$ より大きいのは $66-s>s+1$、つまり $s<32.5$ のとき、$1$ より小さいのは $s>32.5$ のときである。よって $ {}_{66}\mathrm{C}_{s}$ は $s=33$ で最大になる。したがって $p_r$ が最大になるのは`,
            },
            { k: "math", t: String.raw`r=3\cdot33=99` },
            { k: "p", t: String.raw`のときである。` },
          ],
          pitfalls: [
            String.raw`$m_j$ の番号は $j=0$ から始まるので、個数は $t$ ではなく $t+1$ である。ここを1つ間違えると3組に均等に分かれなくなり、式の形が崩れる。`,
            String.raw`$N=200$ だから $201-r$ が $3$ の倍数になる、という事情が効いている。$N$ が別の値だと3組の個数がそろわず、答えはこれほどきれいにならない。`,
            String.raw`$ {}_{66}\mathrm{C}_{s}$ の最大は $s=33$ だが、$66$ が偶数なので最大を与える $s$ は1つだけである。奇数なら2つ並ぶ。`,
          ],
          check: String.raw`同じ数え方を $N=8,11,14$（どれも $N+1$ が $3$ の倍数）に当てはめると、場合の数はそれぞれ $\left({}_{2}\mathrm{C}_{s}\right)^{3}$、$\left({}_{3}\mathrm{C}_{s}\right)^{3}$、$\left({}_{4}\mathrm{C}_{s}\right)^{3}$ の和になる。$2^{N}$ 通りを全部並べて直接数えると $10$、$56$、$346$ で、表の回数別の内訳まで完全に一致した。`,
        },
      ],
    },
  ],
};
