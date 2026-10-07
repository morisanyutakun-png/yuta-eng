import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 電気通信大学 2026年度（令和8年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 冊子は「問題用紙は4ページ、問題は4問」と明記しており、手元のPDFにはそのあとに
 * 他社の解答解説と思われるページが続いていたが、**問題の4ページだけを読んでいる**。
 * 大学が公開している解答例も読んでいない。問題文・図・表は1つも載せていない。
 */
export const uec2026: SolutionSet = {
  slug: "uec",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "情報理工学域",
  university: "電気通信大学",
  short: "電通大",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数・積分",
      topics: ["和積の公式", "因数分解して解く", "定積分", "回転体の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-07",
      review: {
        sourceChecked: true,
        verified: [
          "極大・極小の位置を $0<x<\\pi$ の200万点全探索で確かめ、$\\frac\\pi5,\\ \\frac{3\\pi}5$ と一致した",
          "$f'(x)=12\\cos\\frac{5x}{2}\\cos\\frac{x}{2}$ を数値微分と突き合わせた",
          "$I=\\frac{3\\sqrt3}{10}$、$V=\\frac{18\\sqrt3}{5}\\pi+\\frac{2\\pi^{2}}{3}$ を数値積分で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$0<x<\pi$ で $f(x)=3\sin2x+2\sin3x$ が極大・極小をとる $x_1,\ x_2$ を求める`,
          answer: String.raw`$x_1=\dfrac{\pi}{5}$（極大）、$x_2=\dfrac{3\pi}{5}$（極小）`,
          approach: String.raw`微分すると $\cos$ の和が出る。**和積の公式**で1つの積に直すと、符号が因数ごとに読めて増減表がすぐ書ける。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=6\cos2x+6\cos3x=6(\cos2x+\cos3x)` },
            {
              k: "p",
              t: String.raw`$\cos A+\cos B=2\cos\dfrac{A+B}{2}\cos\dfrac{A-B}{2}$ に $A=3x$、$B=2x$ を入れると`,
            },
            { k: "math", t: String.raw`f'(x)=12\cos\frac{5x}{2}\cos\frac{x}{2}` },
            {
              k: "p",
              t: String.raw`$0<x<\pi$ では $0<\dfrac{x}{2}<\dfrac{\pi}{2}$ だから $\cos\dfrac{x}{2}>0$。符号は $\cos\dfrac{5x}{2}$ だけで決まる。`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{5x}{2}$ は $0$ から $\dfrac{5\pi}{2}$ まで動く。$\cos\dfrac{5x}{2}=0$ となるのは $\dfrac{5x}{2}=\dfrac{\pi}{2},\ \dfrac{3\pi}{2},\ \dfrac{5\pi}{2}$、つまり $x=\dfrac{\pi}{5},\ \dfrac{3\pi}{5},\ \pi$。$x=\pi$ は範囲に入らない。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<x<\dfrac\pi5$ … $\cos\dfrac{5x}{2}>0$ で増加`,
                String.raw`$\dfrac\pi5<x<\dfrac{3\pi}5$ … $\cos\dfrac{5x}{2}<0$ で減少`,
                String.raw`$\dfrac{3\pi}5<x<\pi$ … $\cos\dfrac{5x}{2}>0$ で増加`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $x_1=\dfrac\pi5$ で極大、$x_2=\dfrac{3\pi}5$ で極小。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "$y=f(x)$ と $y=3\\sin2x$ の概形（$0\\le x\\le\\pi$）。2つの曲線は $x=0,\\ \\frac\\pi3,\\ \\frac{2\\pi}3$ で交わり、差がちょうど $2\\sin3x$ になる。",
                view: [-0.15, 3.3, -5.2, 5.2],
                step: { x: 1, y: 2 },
                items: [
                  {
                    k: "fillBetween",
                    top: (x) => 3 * Math.sin(2 * x) + 2 * Math.sin(3 * x),
                    bottom: (x) => 3 * Math.sin(2 * x),
                    from: 0,
                    to: Math.PI / 3,
                  },
                  { k: "curve", f: (x) => 3 * Math.sin(2 * x), from: 0, to: Math.PI, faint: true, dash: true },
                  { k: "curve", f: (x) => 3 * Math.sin(2 * x) + 2 * Math.sin(3 * x), from: 0, to: Math.PI },
                  { k: "dot", at: [Math.PI / 5, 3 * Math.sin(2 * Math.PI / 5) + 2 * Math.sin(3 * Math.PI / 5)], label: "極大 x₁=π/5", place: "above-right" },
                  { k: "dot", at: [3 * Math.PI / 5, 3 * Math.sin(6 * Math.PI / 5) + 2 * Math.sin(9 * Math.PI / 5)], label: "極小 x₂=3π/5", place: "below-left" },
                  { k: "dot", at: [Math.PI / 3, 3 * Math.sin(2 * Math.PI / 3)], label: "β=π/3", place: "below-right" },
                  { k: "text", at: [2.55, -3.1], label: "破線 y=3sin2x", place: "right" },
                  { k: "text", at: [0.55, 1.1], label: "D", place: "below" },
                ],
              },
            },
          ],
          check: String.raw`$f\!\left(\dfrac\pi5\right)=4.6\ldots$、$f\!\left(\dfrac{3\pi}5\right)=-4.6\ldots$ で、$f(\pi-x)=-f(x)$ をみたす。$3\sin2x$ も $2\sin3x$ もこの対称性をもつので、極大値と極小値が符号違いで同じ大きさになるのは自然。`,
          pitfalls: [
            String.raw`$\cos\dfrac{x}{2}>0$ を確かめたうえで割り落とす。この確認がないと符号の議論が成り立たない。`,
            String.raw`$x=\pi$ は $\cos\dfrac{5x}{2}=0$ をみたすが、範囲 $0<x<\pi$ に入らない。端を落とす。`,
          ],
        },
        {
          label: "(ii)",
          task: String.raw`$0<x<\pi$ で $f(x)=0$ をみたす $x$ を $\alpha$ とするとき $\cos\alpha$ を求める`,
          answer: String.raw`$\cos\alpha=\dfrac14$`,
          approach: String.raw`$\sin2x$ も $\sin3x$ も $\sin x$ でくくれる。**$\sin x$ を外に出す**と、残りは $\cos x$ の2次式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\sin2x=2\sin x\cos x$、$\sin3x=3\sin x-4\sin^{3}x=\sin x\left(4\cos^{2}x-1\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`f(x)=2\sin x\left(4\cos^{2}x+3\cos x-1\right)`,
            },
            {
              k: "p",
              t: String.raw`$0<x<\pi$ では $\sin x>0$ だから、$f(x)=0$ は $4\cos^{2}x+3\cos x-1=0$ と同じ。$c=\cos x$ と置くと`,
            },
            { k: "math", t: String.raw`4c^{2}+3c-1=(4c-1)(c+1)=0\ \Longrightarrow\ c=\frac14,\ -1` },
            {
              k: "p",
              t: String.raw`$c=-1$ は $x=\pi$ にあたり範囲外。よって $\cos\alpha=\dfrac14$。`,
            },
          ],
          check: String.raw`$\cos\alpha=\dfrac14$ なら $\alpha=1.3181\ldots$ で、数値で $f(\alpha)=0$ になる。$0<x<\pi$ で $f=0$ となるのはこの1点だけであることも数値の全探索で確かめた。`,
          pitfalls: [
            String.raw`$\sin x$ で割る前に、範囲内で $\sin x\ne0$ であることを言う。`,
            String.raw`$c=-1$ を答えに含めない。$\alpha$ は $0<x<\pi$ の中の値。`,
          ],
        },
        {
          label: "(iii)",
          task: String.raw`$0<x<\pi$ で $y=f(x)$ と $y=3\sin2x$ の交点のうち $x$ 座標が最小のものを $(\beta,f(\beta))$ とするとき $\beta$ を求める`,
          answer: String.raw`$\beta=\dfrac{\pi}{3}$`,
          approach: String.raw`2式の差を作ると $3\sin2x$ が消える。残るのは $2\sin3x$ だけなので、ほとんど計算せずに解が出る。`,
          blocks: [
            { k: "math", t: String.raw`f(x)-3\sin2x=2\sin3x` },
            {
              k: "p",
              t: String.raw`$\sin3x=0$ より $3x=k\pi$、つまり $x=\dfrac{k\pi}{3}$。$0<x<\pi$ に入るのは $\dfrac{\pi}{3}$ と $\dfrac{2\pi}{3}$ で、小さいほうが $\beta$。`,
            },
          ],
          check: String.raw`$\beta=\dfrac\pi3$ では $f(\beta)=3\sin\dfrac{2\pi}{3}=\dfrac{3\sqrt3}{2}$。上の図でも、2つの曲線が $x=\dfrac\pi3$ で交わっている。`,
          pitfalls: [
            String.raw`「$x$ 座標が最小」なので $\dfrac{2\pi}{3}$ ではない。交点を全部出してから小さいほうを選ぶ。`,
          ],
        },
        {
          label: "(iv)",
          task: String.raw`$I=\displaystyle\int_{0}^{\beta}\sin2x\sin3x\,dx$ を求める`,
          answer: String.raw`$I=\dfrac{3\sqrt3}{10}$`,
          approach: String.raw`$\sin$ どうしの積は、**積和の公式**で差に直すと項ごとに積分できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\sin A\sin B=\dfrac12\left\{\cos(A-B)-\cos(A+B)\right\}$ に $A=2x$、$B=3x$ を入れると $\sin2x\sin3x=\dfrac12(\cos x-\cos5x)$。`,
            },
            {
              k: "math",
              t: String.raw`I=\frac12\left[\sin x-\frac{\sin5x}{5}\right]_{0}^{\pi/3}=\frac12\left(\frac{\sqrt3}{2}-\frac{1}{5}\cdot\left(-\frac{\sqrt3}{2}\right)\right)`,
            },
            { k: "math", t: String.raw`I=\frac12\cdot\frac{6\sqrt3}{10}=\frac{3\sqrt3}{10}` },
          ],
          check: String.raw`$\dfrac{3\sqrt3}{10}=0.5196152\ldots$ で、数値積分の値と一致する。$\sin\dfrac{5\pi}{3}=-\dfrac{\sqrt3}{2}$ の符号を落とすと $\dfrac{\sqrt3}{5}$ だけずれる。`,
          pitfalls: [
            String.raw`$\cos(A-B)$ は $\cos(-x)=\cos x$ なので $\cos x$。引く順を気にしなくてよい。`,
          ],
        },
        {
          label: "(v)",
          task: String.raw`$0\le x\le\beta$ で $y=f(x)$ と $y=3\sin2x$ に囲まれた領域 $D$ を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{18\sqrt3}{5}\pi+\dfrac{2\pi^{2}}{3}$`,
          approach: String.raw`2つの曲線はどちらも $0\le x\le\beta$ で $0$ 以上なので、**外側の2乗から内側の2乗を引く**だけでよい。その差を因数分解すると、(iv) の $I$ がそのまま現れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)-3\sin2x=2\sin3x$ は $0<x<\dfrac\pi3$ で正なので、$f$ が外側。$3\sin2x\ge0$ も $0\le x\le\dfrac\pi3$ で成り立つ（$2x\le\dfrac{2\pi}{3}$）。`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int_{0}^{\beta}\Big\{f(x)^{2}-(3\sin2x)^{2}\Big\}dx`,
            },
            { k: "p", t: String.raw`和と差の積に直すと` },
            {
              k: "math",
              t: String.raw`f^{2}-(3\sin2x)^{2}=2\sin3x\left(6\sin2x+2\sin3x\right)=12\sin2x\sin3x+4\sin^{2}3x`,
            },
            {
              k: "p",
              t: String.raw`第1項の積分は $12I$。第2項は半角で $\sin^{2}3x=\dfrac{1-\cos6x}{2}$ とすると`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\pi/3}\sin^{2}3x\,dx=\frac12\left[x-\frac{\sin6x}{6}\right]_{0}^{\pi/3}=\frac{\pi}{6}`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\left(12\cdot\frac{3\sqrt3}{10}+4\cdot\frac{\pi}{6}\right)=\frac{18\sqrt3}{5}\pi+\frac{2\pi^{2}}{3}`,
            },
          ],
          check: String.raw`$\dfrac{18\sqrt3}{5}\pi=19.589\ldots$、$\dfrac{2\pi^{2}}{3}=6.579\ldots$ で合計 $26.1687\ldots$。数値積分の値と一致する。`,
          pitfalls: [
            String.raw`回転体では $\left(f-g\right)^{2}$ ではなく $f^{2}-g^{2}$ を積分する。差を2乗すると別の立体の体積になる。`,
            String.raw`$\sin6x$ の原始関数は $-\dfrac{\cos6x}{6}$ ではない。$\displaystyle\int\cos6x\,dx=\dfrac{\sin6x}{6}$ で、$x=\dfrac\pi3$ では $\sin2\pi=0$。`,
            String.raw`2つの曲線がともに $x$ 軸より上にあることを確認する。片方が負になる区間があると、この式のままでは使えない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["指数の置きかえ", "値域", "部分分数分解", "広義積分の極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-07",
      review: {
        sourceChecked: true,
        verified: [
          "極大 $\\frac9{16}$ と値域 $-1<y\\le\\frac9{16}$ を、$-30\\le x\\le30$ の200万点走査で確かめた",
          "$I,\\ J$ の原始関数を数値微分して被積分関数に戻ることを確かめた",
          "$S(0)=1-\\log2$、$\\lim S(M)=3-2\\log2$ を数値積分で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$f(x)=\dfrac{3e^{x}-1}{\left(e^{x}+1\right)^{2}}$ の極値を求める`,
          answer: String.raw`$x=\log\dfrac53$ で極大値 $\dfrac9{16}$。極小値はない`,
          approach: String.raw`$t=e^{x}$ と置くと $t$ の分数関数になる。$t$ は $x$ について増加なので、**$t$ についての増減がそのまま $x$ の増減になる**。`,
          blocks: [
            { k: "p", t: String.raw`$t=e^{x}>0$ と置くと $f=\dfrac{3t-1}{(t+1)^{2}}$。$t$ で微分して` },
            {
              k: "math",
              t: String.raw`\frac{df}{dt}=\frac{3(t+1)^{2}-(3t-1)\cdot2(t+1)}{(t+1)^{4}}=\frac{5-3t}{(t+1)^{3}}`,
            },
            {
              k: "p",
              t: String.raw`$t>0$ より分母は正。$t<\dfrac53$ で増加、$t>\dfrac53$ で減少。$\dfrac{dt}{dx}=t>0$ なので、$x$ についても同じ向き。`,
            },
            {
              k: "math",
              t: String.raw`t=\frac53\ \Longleftrightarrow\ x=\log\frac53,\qquad f=\frac{5-1}{\left(\frac83\right)^{2}}=\frac{4\cdot9}{64}=\frac9{16}`,
            },
            { k: "p", t: String.raw`増加から減少へ変わる1か所だけなので、極大値 $\dfrac9{16}$ のみ。` },
          ],
          check: String.raw`$\log\dfrac53=0.5108\ldots$ で、数値探索でも同じ位置に最大が出る。値は $0.5625=\dfrac9{16}$ ちょうど。`,
          pitfalls: [
            String.raw`$t$ で微分したあと $x$ に戻すとき、$\dfrac{dt}{dx}=e^{x}>0$ だから符号が変わらない、と一言書く。`,
          ],
        },
        {
          label: "(ii)",
          task: String.raw`$y=f(x)$ の値域を求める`,
          answer: String.raw`$-1<y\le\dfrac9{16}$`,
          approach: String.raw`(i) の増減に、**両端での極限**を足せば値域が決まる。端の値はとれないので不等号の向きに注意する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x\to-\infty$ では $t\to+0$ で $f\to\dfrac{-1}{1}=-1$。$x\to\infty$ では $t\to\infty$ で $f\approx\dfrac{3t}{t^{2}}\to0$。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t$ が $0$ から $\dfrac53$ まで … $f$ は $-1$ から $\dfrac9{16}$ まで増える（$-1$ はとらない）`,
                String.raw`$t$ が $\dfrac53$ から $\infty$ まで … $f$ は $\dfrac9{16}$ から $0$ まで減る（$0$ はとらない）`,
              ],
            },
            {
              k: "p",
              t: String.raw`$f$ は連続なので、2つの区間で $\left(-1,\dfrac9{16}\right]$ と $\left(0,\dfrac9{16}\right]$ をとる。合わせて $-1<y\le\dfrac9{16}$。`,
            },
          ],
          check: String.raw`$x=-30$ で $f=-1.0000\ldots$（$-1$ にごく近い）、$x=30$ で $f=2.6\times10^{-26}$。どちらも端に届かない。`,
          pitfalls: [
            String.raw`$-1$ と $0$ は極限であって値ではない。$\le$ と $<$ を取り違えない。`,
            String.raw`$0$ は $\left(-1,\dfrac9{16}\right]$ に含まれるので、2区間を合わせると穴は空かない。`,
          ],
        },
        {
          label: "(iii)",
          task: String.raw`$I=\displaystyle\int\frac{dt}{t(t+1)}$、$J=\displaystyle\int\frac{dt}{t(t+1)^{2}}$ を求める`,
          answer: String.raw`$I=\log\left|\dfrac{t}{t+1}\right|$、$J=\log\left|\dfrac{t}{t+1}\right|+\dfrac1{t+1}$（積分定数は省略）`,
          approach: String.raw`どちらも**部分分数に分ける**。$J$ は $(t+1)^{2}$ があるので、$\dfrac{A}{t}+\dfrac{B}{t+1}+\dfrac{C}{(t+1)^{2}}$ の形を置く。`,
          blocks: [
            { k: "math", t: String.raw`\frac{1}{t(t+1)}=\frac1t-\frac1{t+1}\ \Longrightarrow\ I=\log|t|-\log|t+1|` },
            {
              k: "p",
              t: String.raw`$J$ は $\dfrac{1}{t(t+1)^{2}}=\dfrac{A}{t}+\dfrac{B}{t+1}+\dfrac{C}{(t+1)^{2}}$ と置いて分母を払うと $1=A(t+1)^{2}+Bt(t+1)+Ct$。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t=0$ を入れて $A=1$`,
                String.raw`$t=-1$ を入れて $C=-1$`,
                String.raw`$t^{2}$ の係数を比べて $A+B=0$、すなわち $B=-1$`,
              ],
            },
            {
              k: "math",
              t: String.raw`J=\int\left(\frac1t-\frac1{t+1}-\frac1{(t+1)^{2}}\right)dt=\log\left|\frac{t}{t+1}\right|+\frac1{t+1}`,
            },
          ],
          check: String.raw`$J$ を微分すると $\dfrac1t-\dfrac1{t+1}-\dfrac1{(t+1)^{2}}$。通分すると $\dfrac{(t+1)-t}{t(t+1)}-\dfrac1{(t+1)^{2}}=\dfrac{1}{t(t+1)}-\dfrac{1}{(t+1)^{2}}=\dfrac{1}{t(t+1)^{2}}$ に戻る。`,
          pitfalls: [
            String.raw`$\dfrac{1}{(t+1)^{2}}$ の積分は $-\dfrac{1}{t+1}$。符号を落とすと $J$ の最後の項が逆になる。`,
          ],
        },
        {
          label: "(iv)",
          task: String.raw`$x\le M$ の範囲で $y=f(x)$、$x$ 軸、直線 $x=M$ が囲む面積を $S(M)$ とするとき、$S(0)$ と $\displaystyle\lim_{M\to\infty}S(M)$ を求める`,
          answer: String.raw`$S(0)=1-\log2$、$\displaystyle\lim_{M\to\infty}S(M)=3-2\log2$`,
          approach: String.raw`$f$ が $x$ 軸と交わるのは $3e^{x}=1$ の1点だけ。そこから $x=M$ までが囲まれる部分で、(iii) の $J$ がそのまま使える形に直せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(x)=0$ は $3e^{x}=1$、つまり $x=-\log3$。$x>-\log3$ で $f>0$ なので、囲まれるのは $-\log3\le x\le M$ の部分。`,
            },
            { k: "p", t: String.raw`$t=e^{x}$ と置くと $dx=\dfrac{dt}{t}$ で` },
            {
              k: "math",
              t: String.raw`\int f\,dx=\int\frac{3t-1}{t(t+1)^{2}}\,dt=\int\frac{3}{(t+1)^{2}}\,dt-J`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{3t-1}{t(t+1)^{2}}=\dfrac{3}{(t+1)^{2}}-\dfrac{1}{t(t+1)^{2}}$ と分けただけ。$\displaystyle\int\frac{3}{(t+1)^{2}}dt=-\frac{3}{t+1}$ だから`,
            },
            {
              k: "math",
              t: String.raw`F(t)=-\frac{4}{t+1}+\log\frac{t+1}{t}`,
            },
            {
              k: "p",
              t: String.raw`$x=-\log3$ は $t=\dfrac13$ にあたり $F\!\left(\dfrac13\right)=-3+\log4$。$x=0$ は $t=1$ で $F(1)=-2+\log2$。`,
            },
            {
              k: "math",
              t: String.raw`S(0)=(-2+\log2)-(-3+\log4)=1+\log\frac24=1-\log2`,
            },
            {
              k: "p",
              t: String.raw`$M\to\infty$ では $t\to\infty$ で $-\dfrac{4}{t+1}\to0$、$\log\dfrac{t+1}{t}\to\log1=0$ なので $F(t)\to0$。`,
            },
            { k: "math", t: String.raw`\lim_{M\to\infty}S(M)=0-(-3+\log4)=3-2\log2` },
          ],
          check: String.raw`$1-\log2=0.30685\ldots$、$3-2\log2=1.61370\ldots$。数値積分（$-\log3$ から $0$、および $40$ まで）と一致する。`,
          pitfalls: [
            String.raw`下端は $0$ ではなく $x=-\log3$。$f$ が $x$ 軸と交わる点から数える。`,
            String.raw`$x\to-\infty$ では $f\to-1$ なので、$x$ 軸との間の面積は無限になる。囲まれた領域は交点から右側だけ。`,
            String.raw`$\log\dfrac{t+1}{t}$ は $\log\dfrac{t}{t+1}$ の符号違い。$F$ を作るときに向きを揃える。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["円上の点と距離", "直線が円と交わる条件", "正方形と90度回転", "三角関数の合成"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-07",
      review: {
        sourceChecked: true,
        verified: [
          "$L(\\alpha)$ を、$C_2$ の円周を2万点に刻んだ最小距離と突き合わせた",
          "$m$ の最大 $\\frac1{\\sqrt3}$、$m'$ の最大 $2+\\sqrt3$、$S$ の $y$ 座標の最大 $5+\\sqrt2$ を、$\\alpha,\\beta$ を3000×3000に刻んだ全探索で確かめた",
          "求めた $\\alpha=\\frac{3\\pi}4,\\ \\beta=0$ で $\\mathrm{PQRS}$ の4辺が等しく対角線も等しいことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$\mathrm{P}_\alpha(-2+\cos\alpha,\ \sin\alpha)$ に対し、$\mathrm{Q}$ が $C_2$ 上を動くときの $\mathrm{P}_\alpha\mathrm{Q}$ の最小値 $L(\alpha)$ と、その最大値を求める`,
          answer: String.raw`$L(\alpha)=\sqrt{17-8\cos\alpha}-1$、最大値は $\alpha=\pi$ のとき $4$`,
          approach: String.raw`円の外の点から円周までの最短距離は、**中心までの距離から半径を引いたもの**。$\mathrm{Q}$ を動かす代わりに、$\mathrm{P}_\alpha$ と中心 $\mathrm{B}(2,0)$ の距離だけ見ればよい。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\mathrm{P}_\alpha\mathrm{B}^{2}=(\cos\alpha-4)^{2}+\sin^{2}\alpha=17-8\cos\alpha`,
            },
            {
              k: "p",
              t: String.raw`$-1\le\cos\alpha\le1$ より $9\le\mathrm{P}_\alpha\mathrm{B}^{2}\le25$、つまり $3\le\mathrm{P}_\alpha\mathrm{B}\le5$。半径 $1$ より大きいので $\mathrm{P}_\alpha$ はつねに $C_2$ の外にあり`,
            },
            { k: "math", t: String.raw`L(\alpha)=\mathrm{P}_\alpha\mathrm{B}-1=\sqrt{17-8\cos\alpha}-1` },
            {
              k: "p",
              t: String.raw`$17-8\cos\alpha$ が最大になるのは $\cos\alpha=-1$、すなわち $\alpha=\pi$。このとき $L=\sqrt{25}-1=4$。`,
            },
          ],
          check: String.raw`$\alpha=\pi$ のとき $\mathrm{P}=(-3,0)$ で、$C_2$ の最も近い点は $(1,0)$。距離は $4$ で合う。$C_2$ の円周を2万点に刻んで実際に最小距離を測っても同じ値になる。`,
          pitfalls: [
            String.raw`最小値を聞かれているので、中心までの距離に半径を**足す**のではなく引く。`,
            String.raw`$\mathrm{P}_\alpha$ が $C_2$ の外にあることを確かめてから引く。内部にあると式が変わる。`,
          ],
        },
        {
          label: "(ii)",
          task: String.raw`直線 $\mathrm{PQ}$ の傾き $m$ の最大値を求める`,
          answer: String.raw`$m$ の最大値は $\dfrac{1}{\sqrt3}=\dfrac{\sqrt3}{3}$`,
          approach: String.raw`$\mathrm{P},\mathrm{Q}$ を動かす代わりに、**「傾き $m$ の直線が2つの円の両方と交わるか」**を考える。交わる条件は中心から直線までの距離が半径以下、という形で書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線を $y=mx+c$ とする。$\mathrm{A}(-2,0)$ との距離が $1$ 以下、$\mathrm{B}(2,0)$ との距離が $1$ 以下であればよい。$s=\sqrt{m^{2}+1}$ と置くと`,
            },
            {
              k: "math",
              t: String.raw`|c-2m|\le s\quad\text{かつ}\quad|c+2m|\le s`,
            },
            {
              k: "p",
              t: String.raw`$c$ は $\left[2m-s,\ 2m+s\right]$ と $\left[-2m-s,\ -2m+s\right]$ の両方に入る必要がある。2つの区間が重なる条件は、中心どうしの距離が幅の和以下、すなわち`,
            },
            {
              k: "math",
              t: String.raw`|4m|\le2s\ \Longleftrightarrow\ 4m^{2}\le m^{2}+1\ \Longleftrightarrow\ m^{2}\le\frac13`,
            },
            { k: "p", t: String.raw`よって $-\dfrac1{\sqrt3}\le m\le\dfrac1{\sqrt3}$ で、最大値は $\dfrac{1}{\sqrt3}$。` },
          ],
          check: String.raw`$\alpha,\beta$ をそれぞれ4000等分して $\mathrm{PQ}$ の傾きを全部作ると、最大は $0.5774$ で $\dfrac1{\sqrt3}=0.57735\ldots$ と一致する。`,
          pitfalls: [
            String.raw`$x_\mathrm{Q}-x_\mathrm{P}$ は $\mathrm{P}$ が左の円、$\mathrm{Q}$ が右の円にあるのでつねに正。傾きが定義できないことはない。`,
            String.raw`「直線が円と交わる」条件に言い換えると、$\mathrm{P},\mathrm{Q}$ を別々に動かす2変数の問題が1変数に落ちる。`,
          ],
        },
        {
          label: "(iii)",
          task: String.raw`四角形 $\mathrm{PQRS}$ が正方形（$\mathrm{R}$ の $y$ 座標は正）のとき、直線 $\mathrm{PR}$ の傾き $m'$ の最大値を $a+b\sqrt N$ の形で表す`,
          answer: String.raw`$m'$ の最大値は $2+\sqrt3$（$a=2,\ b=1,\ N=3$）`,
          approach: String.raw`$\mathrm{PR}$ は正方形の**対角線**なので、辺 $\mathrm{PQ}$ と $45^\circ$ をなす。傾きの関係は正接の加法定理で書ける。あとは (ii) で出した $m$ の範囲を入れるだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{PQ}$ の傾きを $m=\tan\theta$ とする。$\mathrm{PR}$ は $\mathrm{PQ}$ を $45^\circ$ 回した向きなので`,
            },
            {
              k: "math",
              t: String.raw`m'=\tan\left(\theta+45^\circ\right)=\frac{m+1}{1-m}`,
            },
            {
              k: "p",
              t: String.raw`$-\dfrac1{\sqrt3}\le m\le\dfrac1{\sqrt3}$ で、$\dfrac{m+1}{1-m}=-1+\dfrac{2}{1-m}$ は $m<1$ の範囲で増加。したがって $m=\dfrac1{\sqrt3}$ のとき最大。`,
            },
            {
              k: "math",
              t: String.raw`m'=\frac{\frac1{\sqrt3}+1}{1-\frac1{\sqrt3}}=\frac{1+\sqrt3}{\sqrt3-1}=\frac{(1+\sqrt3)^{2}}{2}=2+\sqrt3`,
            },
          ],
          check: String.raw`$2+\sqrt3=3.7320\ldots$。$\alpha,\beta$ を3000等分した全探索でも最大 $3.7321$ が出る。なお $2+\sqrt3=\tan75^\circ$ で、$\theta=30^\circ$ に $45^\circ$ を足した角と合う。`,
          pitfalls: [
            String.raw`$\mathrm{PR}$ は辺ではなく対角線。$\mathrm{P}\to\mathrm{Q}\to\mathrm{R}\to\mathrm{S}$ の順に頂点が並ぶことを使う。`,
            String.raw`$\dfrac{m+1}{1-m}$ は $m<1$ で増加。$m$ の範囲が $1$ より小さいので、端で最大になる。`,
          ],
        },
        {
          label: "(iv)",
          task: String.raw`点 $\mathrm{S}$ の $y$ 座標の最大値と、そのときの $\mathrm{P},\mathrm{Q}$ の座標を求める`,
          answer: String.raw`最大値 $5+\sqrt2$。このとき $\mathrm{P}\left(-2-\dfrac{\sqrt2}{2},\ \dfrac{\sqrt2}{2}\right)$、$\mathrm{Q}(3,\ 0)$`,
          approach: String.raw`$\vec{\mathrm{PQ}}$ を $90^\circ$ 回すと $\vec{\mathrm{PS}}$ になる。成分で書くと $\mathrm{S}$ の $y$ 座標が $\alpha$ だけの式と $\beta$ だけの式に分かれるので、**別々に最大化できる**。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}(-2+\cos\alpha,\sin\alpha)$、$\mathrm{Q}(2+\cos\beta,\sin\beta)$ とし、$\vec v=\vec{\mathrm{PQ}}=(4+\cos\beta-\cos\alpha,\ \sin\beta-\sin\alpha)$ と置く。`,
            },
            {
              k: "p",
              t: String.raw`正方形 $\mathrm{PQRS}$ では $\vec{\mathrm{PS}}=\vec{\mathrm{QR}}$ で、これは $\vec v$ を $90^\circ$ 回したもの。$(x,y)$ を $90^\circ$ 回すと $(-y,x)$ だから`,
            },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{PS}}=\left(\sin\alpha-\sin\beta,\ 4+\cos\beta-\cos\alpha\right)`,
            },
            {
              k: "note",
              t: String.raw`回す向きは一通りに決まる。逆向きに回すと $\vec{\mathrm{PS}}$ の $y$ 成分は $-(4+\cos\beta-\cos\alpha)$ となり、$\mathrm{R}$ の $y$ 座標が $\sin\beta-4-\cos\beta+\cos\alpha\le-1<0$ となって、$\mathrm{R}$ の $y$ 座標が正であることに反する。だから向きは上の1通りしかない。`,
            },
            { k: "p", t: String.raw`$\mathrm{S}$ の $y$ 座標は` },
            {
              k: "math",
              t: String.raw`\sin\alpha+\left(4+\cos\beta-\cos\alpha\right)=\left(\sin\alpha-\cos\alpha\right)+\cos\beta+4`,
            },
            {
              k: "p",
              t: String.raw`$\alpha$ と $\beta$ は独立に動かせる。$\cos\beta$ の最大は $\beta=0$ のとき $1$。$\sin\alpha-\cos\alpha=\sqrt2\sin\left(\alpha-\dfrac\pi4\right)$ の最大は $\alpha-\dfrac\pi4=\dfrac\pi2$、すなわち $\alpha=\dfrac{3\pi}4$ のとき $\sqrt2$。`,
            },
            { k: "math", t: String.raw`\text{最大値}=\sqrt2+1+4=5+\sqrt2` },
            {
              k: "p",
              t: String.raw`そのとき $\cos\alpha=-\dfrac{\sqrt2}{2}$、$\sin\alpha=\dfrac{\sqrt2}{2}$ なので $\mathrm{P}\left(-2-\dfrac{\sqrt2}{2},\ \dfrac{\sqrt2}{2}\right)$、$\mathrm{Q}(2+1,\ 0)=(3,0)$。`,
            },
          ],
          check: String.raw`$5+\sqrt2=6.41421\ldots$。$\alpha,\beta$ を3000等分した全探索でも同じ値・同じ位置が出る。このとき4辺の長さはすべて $5.7507\ldots$、2本の対角線も等しく、確かに正方形になっている。`,
          pitfalls: [
            String.raw`$\mathrm{S}$ の $y$ 座標が $\alpha$ の項と $\beta$ の項に分かれる。分かれるからこそ別々に最大化できる。分かれない形のまま2変数で動かすと行き詰まる。`,
            String.raw`$\sin\alpha-\cos\alpha$ の合成は $\sqrt2\sin\left(\alpha-\dfrac\pi4\right)$。$\sqrt2\sin\left(\alpha+\dfrac\pi4\right)$ ではない。`,
            String.raw`「$\mathrm{R}$ の $y$ 座標は正」という条件が、回す向きを1つに決めている。両方調べて片方を捨てる。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "数列・極限",
      topics: ["3項間漸化式", "階差をとる置きかえ", "等差数列に直す", "区分求積法"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-07",
      review: {
        sourceChecked: true,
        verified: [
          "$a_n=n\\cdot2^{n-1}$ が漸化式と $a_2=4,\\ a_4=32$ に合うことを $n\\le30$ で確かめた",
          "$T_n=2^{n+1}-2$、$S_n=(n-1)2^{n}+1$ を $n\\le25$ で直接の総和と突き合わせた",
          "(v) の式が $\\frac1n\\sum\\frac{k}{n+k}$ に簡約できることを分数のまま $n\\le25$ で確かめ、$n=5000$ で $1-\\log2$ に近づくことを見た",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(i)",
          task: String.raw`$a_1,\ a_3$ を求める`,
          answer: String.raw`$a_1=1,\qquad a_3=12$`,
          approach: String.raw`漸化式に $n=2$ を入れると、既知の $a_2,a_4$ だけで $a_3$ が決まる。$a_3$ が出れば $n=1$ の式から $a_1$ が出る。**既知の値に近いほうから攻める**。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n=2$ のとき $a_4=4\left(a_3-a_2\right)$。$a_2=4$、$a_4=32$ を入れて $32=4(a_3-4)$、$a_3=12$。`,
            },
            {
              k: "p",
              t: String.raw`$n=1$ のとき $a_3=4\left(a_2-a_1\right)$。$12=4(4-a_1)$ より $a_1=1$。`,
            },
          ],
          check: String.raw`$a_1=1,\ a_2=4,\ a_3=12,\ a_4=32$。$a_5=4(32-12)=80$ で、あとで出す $a_n=n\cdot2^{n-1}$ に $n=5$ を入れた $5\cdot16=80$ と合う。`,
          pitfalls: [
            String.raw`$n=1$ から順に攻めると $a_1$ が未知のまま残る。$a_4$ が与えられているので $n=2$ から入る。`,
          ],
        },
        {
          label: "(ii)",
          task: String.raw`$b_n=a_{n+1}-2a_n$ とおくとき、$b_{n+1}$ を $b_n$ で表し、一般項を求める`,
          answer: String.raw`$b_{n+1}=2b_n$、$b_n=2^{n}$`,
          approach: String.raw`$b_{n+1}$ を定義どおり書き、漸化式で $a_{n+2}$ を消す。**$2$ でくくれる形**が出る。`,
          blocks: [
            {
              k: "math",
              t: String.raw`b_{n+1}=a_{n+2}-2a_{n+1}=4\left(a_{n+1}-a_n\right)-2a_{n+1}=2a_{n+1}-4a_n`,
            },
            { k: "math", t: String.raw`=2\left(a_{n+1}-2a_n\right)=2b_n` },
            {
              k: "p",
              t: String.raw`公比 $2$ の等比数列で、$b_1=a_2-2a_1=4-2=2$。よって $b_n=2\cdot2^{n-1}=2^{n}$。`,
            },
          ],
          check: String.raw`$b_2=a_3-2a_2=12-8=4=2^{2}$、$b_3=a_4-2a_3=32-24=8=2^{3}$。合う。`,
          pitfalls: [
            String.raw`$b_1$ を $1$ と早合点しない。$b_1=a_2-2a_1$ を計算する。`,
          ],
        },
        {
          label: "(iii)",
          task: String.raw`$c_n=\dfrac{a_n}{2^{n}}$ とおくとき、$c_{n+1}$ を $c_n$ で表し、$\{c_n\}$ と $\{a_n\}$ の一般項を求める`,
          answer: String.raw`$c_{n+1}=c_n+\dfrac12$、$c_n=\dfrac n2$、$a_n=n\cdot2^{n-1}$`,
          approach: String.raw`(ii) から $a_{n+1}=2a_n+2^{n}$。両辺を $2^{n+1}$ で割ると、**等差数列の形**になる。これが $2^{n}$ で割る置きかえの狙い。`,
          blocks: [
            { k: "math", t: String.raw`a_{n+1}=b_n+2a_n=2^{n}+2a_n` },
            {
              k: "math",
              t: String.raw`\frac{a_{n+1}}{2^{n+1}}=\frac{2^{n}}{2^{n+1}}+\frac{2a_n}{2^{n+1}}\ \Longrightarrow\ c_{n+1}=c_n+\frac12`,
            },
            {
              k: "p",
              t: String.raw`公差 $\dfrac12$ の等差数列で $c_1=\dfrac{a_1}{2}=\dfrac12$。よって $c_n=\dfrac12+(n-1)\cdot\dfrac12=\dfrac n2$。`,
            },
            { k: "math", t: String.raw`a_n=2^{n}c_n=2^{n}\cdot\frac n2=n\cdot2^{n-1}` },
          ],
          check: String.raw`$n=1,2,3,4$ で $1,\ 4,\ 12,\ 32$。与えられた $a_2=4$、$a_4=32$ と合う。漸化式 $a_{n+2}=4(a_{n+1}-a_n)$ も $n\le30$ で成り立つことを確かめた。`,
          pitfalls: [
            String.raw`$2^{n}$ で割るのは、$a_{n+1}=2a_n+(\text{等比})$ の形を等差に落とすため。$2^{n+1}$ で割る点に注意（$c_{n+1}$ の添字に合わせる）。`,
          ],
        },
        {
          label: "(iv)",
          task: String.raw`$S_n=\displaystyle\sum_{k=1}^{n}a_k$、$T_n=\displaystyle\sum_{k=1}^{n}b_k$ の一般項を求める`,
          answer: String.raw`$T_n=2^{n+1}-2$、$S_n=(n-1)2^{n}+1$`,
          approach: String.raw`$T_n$ は等比の和。$S_n$ は $\sum k\cdot2^{k-1}$ だが、**$b_k=a_{k+1}-2a_k$ を足す**と $S$ と $T$ の関係式が出て、$\sum k x^{k}$ の計算をせずに済む。`,
          blocks: [
            { k: "math", t: String.raw`T_n=\sum_{k=1}^{n}2^{k}=\frac{2\left(2^{n}-1\right)}{2-1}=2^{n+1}-2` },
            {
              k: "p",
              t: String.raw`次に $b_k=a_{k+1}-2a_k$ を $k=1$ から $n$ まで足す。$\displaystyle\sum_{k=1}^{n}a_{k+1}=S_{n+1}-a_1=S_n+a_{n+1}-a_1$ なので`,
            },
            {
              k: "math",
              t: String.raw`T_n=\left(S_n+a_{n+1}-a_1\right)-2S_n=a_{n+1}-S_n-1`,
            },
            { k: "p", t: String.raw`$a_{n+1}=(n+1)2^{n}$ を入れて $S_n$ について解くと` },
            {
              k: "math",
              t: String.raw`S_n=(n+1)2^{n}-1-\left(2^{n+1}-2\right)=(n-1)2^{n}+1`,
            },
          ],
          check: String.raw`$n=1,2,3,4$ で $S_n=1,\ 5,\ 17,\ 49$。直接足した $1,\ 1+4,\ 1+4+12,\ 1+4+12+32$ と一致する。$T_n$ も $2,6,14,30$ で $2^{n+1}-2$ と合う。`,
          pitfalls: [
            String.raw`$\displaystyle\sum_{k=1}^{n}a_{k+1}$ は $S_n$ ではない。$a_2$ から $a_{n+1}$ までなので、$S_n$ に $a_{n+1}$ を足して $a_1$ を引く。`,
            String.raw`$\sum k\cdot2^{k-1}$ をずらし算で出してもよいが、$b_k$ を足すほうが短い。`,
          ],
        },
        {
          label: "(v)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}\frac{2^{n}}{n}\sum_{k=1}^{n}\frac{a_k}{a_{n+k}}$ を求める`,
          answer: String.raw`$1-\log2$`,
          approach: String.raw`$a_n=n\cdot2^{n-1}$ を入れると、$2$ の累乗が**きれいに約分される**。残るのは $\dfrac kn$ だけの式になるので、区分求積法で積分に直せる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{a_k}{a_{n+k}}=\frac{k\cdot2^{k-1}}{(n+k)\cdot2^{n+k-1}}=\frac{1}{2^{n}}\cdot\frac{k}{n+k}`,
            },
            { k: "p", t: String.raw`したがって $\dfrac{2^{n}}{n}$ を掛けると $2^{n}$ が消えて` },
            {
              k: "math",
              t: String.raw`\frac{2^{n}}{n}\sum_{k=1}^{n}\frac{a_k}{a_{n+k}}=\frac1n\sum_{k=1}^{n}\frac{k}{n+k}=\frac1n\sum_{k=1}^{n}\frac{\frac kn}{1+\frac kn}`,
            },
            {
              k: "p",
              t: String.raw`これは $g(x)=\dfrac{x}{1+x}$ の $[0,1]$ での区分求積。よって`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac1n\sum_{k=1}^{n}g\!\left(\frac kn\right)=\int_{0}^{1}\frac{x}{1+x}\,dx=\int_{0}^{1}\left(1-\frac1{1+x}\right)dx`,
            },
            { k: "math", t: String.raw`=\Big[x-\log(1+x)\Big]_{0}^{1}=1-\log2` },
          ],
          check: String.raw`$1-\log2=0.30685\ldots$。$n=10,100,1000,5000$ で $0.3312,\ 0.3093,\ 0.3071,\ 0.3069$ と近づく。$\dfrac{2^{n}}{n}\sum\dfrac{a_k}{a_{n+k}}$ と $\dfrac1n\sum\dfrac{k}{n+k}$ が厳密に等しいことも、分数のまま $n\le25$ で確かめた。`,
          pitfalls: [
            String.raw`$\dfrac{x}{1+x}$ はそのままでは積分できない。$1-\dfrac{1}{1+x}$ に分ける。`,
            String.raw`区分求積に持ち込むには $\dfrac1n\sum f\!\left(\dfrac kn\right)$ の形にそろえる。$\dfrac{k}{n+k}$ を分母分子ともに $n$ で割るのがその操作。`,
            String.raw`$2^{n}$ は約分で完全に消える。残ると発散する式に見えてしまう。`,
          ],
        },
      ],
    },
  ],
};
