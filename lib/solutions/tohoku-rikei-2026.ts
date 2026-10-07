import { tohokuBunkei2026 } from "@/lib/solutions/tohoku-bunkei-2026";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2026年度（令和8年度）一般選抜 前期日程 数学（理系）。
 * 経済学部（理系）・理学部・医学部・歯学部・薬学部・工学部・農学部。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **理系の第1問・第2問は、文系の第1問・第2問と同じ問題**だった。
 * 同じ問題に別々の解説を置くと食い違いが生まれるので、解説は文系の側から借りる。
 *
 * 問題文・図・表は1つも載せていない。
 */

const bunkei = (no: number) => tohokuBunkei2026.questions.find((q) => q.no === no)!;

/** 文系 第1問（放物線の接線と垂直二等分線）。理系でも第1問。 */
const sharedSessen: Question = { ...bunkei(1), no: 1 };
/** 文系 第2問（$a^2+2b^2=c^2$）。理系でも第2問。 */
const sharedSeisu: Question = { ...bunkei(2), no: 2 };

export const tohokuRikei2026: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    sharedSessen,
    sharedSeisu,
    {
      no: 3,
      field: "微分法",
      topics: ["つなぎ目での微分可能性", "連立方程式", "4次関数の増減", "最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$a=8,b=-12,c=0,d=5$ で $x=\\pm1$ の両側から値と微分係数が一致することを確かめた",
          "最小値 $-39-24\\sqrt3$ を、$x$ を細かく動かした全探索と突き合わせた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b,c,d$ の値を求める`,
          answer: String.raw`$a=8,\quad b=-12,\quad c=0,\quad d=5$`,
          approach: String.raw`つなぎ目は $x=1$ と $x=-1$ の2か所。それぞれで**値と微分係数の両方**がそろう必要があるので、条件は4本。未知数も4つなので過不足なく決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$g(x)=8x^{3}-6x^{2}+2$、$h(x)=3x^{4}+ax^{3}+bx^{2}+cx+d$ とおく。$g'(x)=24x^{2}-12x$ より`,
            },
            {
              k: "math",
              t: String.raw`g(1)=4,\quad g'(1)=12,\quad g(-1)=-12,\quad g'(-1)=36`,
            },
            { k: "p", t: String.raw`$h$ の側をそろえると、$h'(x)=12x^{3}+3ax^{2}+2bx+c$ から` },
            {
              k: "steps",
              items: [
                String.raw`$a+b+c+d=1$`,
                String.raw`$-a+b-c+d=-15$`,
                String.raw`$3a+2b+c=0$`,
                String.raw`$3a-2b+c=48$`,
              ],
            },
            {
              k: "p",
              t: String.raw`下2本の差から $b=-12$、和から $3a+c=24$。上2本の差から $a+c=8$。よって $a=8,\ c=0$、最後に $d=5$。`,
            },
          ],
          check: String.raw`$h(x)=3x^{4}+8x^{3}-12x^{2}+5$ とすると $h(1)=4,\ h(-1)=-12$、$h'(1)=12,\ h'(-1)=36$。4本ともそろう。`,
          pitfalls: [
            String.raw`つなぎ目が $x=1$ と $x=-1$ の**2か所**ある。片方だけだと条件が2本しか立たず決まらない。`,
            String.raw`微分可能なら連続。値の一致も条件に入れる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ の最小値と、それを与える $x$ を求める`,
          answer: String.raw`$x=-1-\sqrt3$ で最小値 $-39-24\sqrt3$`,
          approach: String.raw`$|x|\le1$ の側と $|x|>1$ の側で別々に増減を調べ、低いほうを採る。$|x|>1$ 側の $h'$ が因数分解できるのが鍵。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$|x|\le1$ のとき。** $g'(x)=12x(2x-1)$ より $x=-1$ から増加、$x=0$ で極大 $2$、$x=\frac12$ で極小 $\frac32$、そこから増加。端の $g(-1)=-12$ がこの範囲の最小。`,
            },
            { k: "p", t: String.raw`**$|x|>1$ のとき。**` },
            { k: "math", t: String.raw`h'(x)=12x^{3}+24x^{2}-24x=12x\left(x^{2}+2x-2\right)` },
            {
              k: "p",
              t: String.raw`$x^{2}+2x-2=0$ の解は $x=-1\pm\sqrt3$。$|x|>1$ に入るのは $x=-1-\sqrt3=-2.732\ldots$ だけ。$x<-1-\sqrt3$ で $h'<0$、$-1-\sqrt3<x<-1$ で $h'>0$ なので、ここで極小。$x>1$ では $h'>0$ で増加。`,
            },
            { k: "p", t: String.raw`$r=-1-\sqrt3$ とすると $r^{2}=4+2\sqrt3$、$r^{3}=-(10+6\sqrt3)$、$r^{4}=28+16\sqrt3$ なので` },
            {
              k: "math",
              t: String.raw`h(r)=3(28+16\sqrt3)-8(10+6\sqrt3)-12(4+2\sqrt3)+5=-39-24\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`$-39-24\sqrt3=-80.56\ldots<-12$ なので、これが全体の最小値。`,
            },
          ],
          check: String.raw`$r^{2}+2r-2=(4+2\sqrt3)+2(-1-\sqrt3)-2=0$ で、確かに $h'(r)=0$。$|r|=1+\sqrt3>1$ なので $h$ の側で考えてよい。`,
          pitfalls: [
            String.raw`$h'$ の零点のうち $x=0,\ -1+\sqrt3$ は $|x|\le1$ の側にあり、$h$ の定義域に入らない。範囲を確かめてから使う。`,
            String.raw`$|x|\le1$ の端の値 $g(-1)=-12$ と比べるのを忘れない。両側を比べて初めて最小値が決まる。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["2次元ランダムウォーク", "45度の回転で独立化", "二項分布", "条件つき確率"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(1)(2)(3) すべてを $4^{8}=65536$ 通りの移動列の全探索と突き合わせた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`時刻 $8$ に点 $(4,0)$ にある確率を求める`,
          answer: String.raw`$\dfrac{49}{4096}$`,
          approach: String.raw`$u=x+y,\ v=x-y$ とおく（$45^{\circ}$ 回転）。4通りの移動が $(u,v)$ の $(\pm1,\pm1)$ の**4通りの組み合わせ**にちょうど対応し、$u$ と $v$ が独立な1次元の歩きになる。`,
          blocks: [
            {
              k: "steps",
              items: [
                String.raw`$(m+1,n)$ … $u$ は $+1$、$v$ は $+1$`,
                String.raw`$(m-1,n)$ … $u$ は $-1$、$v$ は $-1$`,
                String.raw`$(m,n+1)$ … $u$ は $+1$、$v$ は $-1$`,
                String.raw`$(m,n-1)$ … $u$ は $-1$、$v$ は $+1$`,
              ],
            },
            {
              k: "p",
              t: String.raw`4通りが等確率なので、$u$ と $v$ はそれぞれ独立に $\pm1$ を等確率で足していく。$(4,0)$ は $u=4,\ v=4$。`,
            },
            {
              k: "math",
              t: String.raw`P(u_8=4)=\frac{ {}_8\mathrm{C}_6}{2^{8}}=\frac{28}{256}=\frac{7}{64}`,
            },
            { k: "p", t: String.raw`$v$ も同じなので、掛けて $\left(\dfrac{7}{64}\right)^{2}=\dfrac{49}{4096}$。` },
          ],
          pitfalls: [
            String.raw`$u,v$ が独立になるのは、4通りが**等確率**だから。偏りがあると独立にならない。`,
            String.raw`$u$ と $v$ の偶奇は時刻と一致する。時刻 $8$ なら $u,v$ はどちらも偶数。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`時刻 $8$ に双曲線 $x^{2}-y^{2}=16$ 上にある確率を求める`,
          answer: String.raw`$\dfrac{7}{256}$`,
          approach: String.raw`$x^{2}-y^{2}=(x+y)(x-y)=uv$。つまり条件はそのまま **$uv=16$**。(1) の独立性で、$u,v$ の組を数え上げるだけになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`時刻 $8$ では $u,v$ はともに $-8$ 以上 $8$ 以下の偶数。$uv=16$ をみたす組は`,
            },
            {
              k: "math",
              t: String.raw`(u,v)=(2,8),(4,4),(8,2),(-2,-8),(-4,-4),(-8,-2)`,
            },
            {
              k: "p",
              t: String.raw`$P(u=2)=\dfrac{56}{256},\ P(u=4)=\dfrac{28}{256},\ P(u=8)=\dfrac{1}{256}$（負も同じ）なので`,
            },
            {
              k: "math",
              t: String.raw`2\left(2\cdot\frac{56}{256}\cdot\frac{1}{256}+\left(\frac{28}{256}\right)^{2}\right)=\frac{1792}{65536}=\frac{7}{256}`,
            },
          ],
          check: String.raw`$4^{8}=65536$ 通りを全部調べても $1792$ 通りで一致する。`,
          pitfalls: [
            String.raw`$u,v$ がともに偶数なので、$uv=16$ の分解で $(16,1)$ や $(1,16)$ は起こらない。範囲 $|u|,|v|\le8$ も効く。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`双曲線上にあるという条件のもとで、途中で点 $(4,2)$ にいた条件つき確率を求める`,
          answer: String.raw`$\dfrac{45}{1792}$`,
          approach: String.raw`$(4,2)$ は $u=6,\ v=2$。$|u|\le t$ と偶奇から、**そこにいられる時刻は $t=6$ しかない**。ここに気づけば場合が1つに絞れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$u=6$ には時刻 $6$ 以上でないと届かず、$u$ の偶奇は時刻と同じなので $t$ は偶数。$1\le t\le7$ と合わせて $t=6$ のみ。`,
            },
            {
              k: "math",
              t: String.raw`P(u_6=6)=\frac{1}{2^{6}},\qquad P(v_6=2)=\frac{ {}_6\mathrm{C}_4}{2^{6}}=\frac{15}{64}`,
            },
            { k: "p", t: String.raw`よって時刻 $6$ に $(4,2)$ にいる確率は $\dfrac{15}{4096}$。そこから残り2歩で` },
            {
              k: "steps",
              items: [
                String.raw`$u_8\in\{4,6,8\}$ が確率 $\frac14,\frac12,\frac14$、$v_8\in\{0,2,4\}$ が確率 $\frac14,\frac12,\frac14$`,
                String.raw`$u_8v_8=16$ となるのは $(4,4)$ と $(8,2)$ で、確率は $\frac1{16}+\frac18=\frac3{16}$`,
              ],
            },
            {
              k: "math",
              t: String.raw`\frac{15}{4096}\cdot\frac{3}{16}\ \div\ \frac{7}{256}=\frac{45}{65536}\cdot\frac{256}{7}=\frac{45}{1792}`,
            },
          ],
          check: String.raw`$65536$ 通りの移動列を全部作って数えても同じ値になる。$\dfrac{45}{1792}=0.0251\ldots$。`,
          pitfalls: [
            String.raw`「時刻 $1$ から $7$ のいずれかで」とあるが、実際に可能なのは $t=6$ だけ。ここを絞らずに場合分けすると手に負えなくなる。`,
            String.raw`条件つき確率なので、分母は (2) の $\dfrac{7}{256}$。分母を $1$ にしない。`,
          ],
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["媒介変数表示の接線", "指数関数と三角関数の積の積分", "積和の公式", "回転体の体積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(2) の2式を微分し直して元の被積分関数に戻ることを確かめた",
          "(3) の $V=\\frac{\\pi}{60}\\left(\\sqrt2\\,e^{3\\pi/4}-4\\right)$ を数値積分と突き合わせた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`直線 $\ell$ の方程式を求める`,
          answer: String.raw`$x=\dfrac{e^{\pi/4}}{\sqrt2}$`,
          approach: String.raw`$y$ 軸に平行な接線は $\dfrac{dx}{dt}=0$ のところ。$\dfrac{dy}{dt}\ne0$ も確かめる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=e^{t}(\cos t-\sin t)=0\ \Longleftrightarrow\ \tan t=1\ \Longleftrightarrow\ t=\frac{\pi}{4}`,
            },
            {
              k: "p",
              t: String.raw`このとき $\dfrac{dy}{dt}=e^{t}(\sin t+\cos t)=\sqrt2\,e^{\pi/4}\ne0$ なので、確かに $y$ 軸に平行な接線をもつ。接点の $x$ 座標は $e^{\pi/4}\cos\dfrac{\pi}{4}=\dfrac{e^{\pi/4}}{\sqrt2}$。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{dx}{dt}=0$ だけでは不十分。$\dfrac{dy}{dt}=0$ も同時だと接線の向きが決まらない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$I=\displaystyle\int e^{\alpha t}\cos\beta t\,dt$ と $J=\displaystyle\int e^{\alpha t}\sin\beta t\,dt$ を求める`,
          answer: String.raw`$I=\dfrac{e^{\alpha t}\left(\alpha\cos\beta t+\beta\sin\beta t\right)}{\alpha^{2}+\beta^{2}}+C,\qquad J=\dfrac{e^{\alpha t}\left(\alpha\sin\beta t-\beta\cos\beta t\right)}{\alpha^{2}+\beta^{2}}+C$`,
          approach: String.raw`部分積分を2回すると元の形に戻るので、**$I$ と $J$ の連立方程式**として解く。`,
          blocks: [
            { k: "p", t: String.raw`$e^{\alpha t}$ を積分する向きで部分積分すると` },
            {
              k: "math",
              t: String.raw`I=\frac{e^{\alpha t}\cos\beta t}{\alpha}+\frac{\beta}{\alpha}J,\qquad J=\frac{e^{\alpha t}\sin\beta t}{\alpha}-\frac{\beta}{\alpha}I`,
            },
            { k: "p", t: String.raw`$J$ を消すと $\left(1+\dfrac{\beta^{2}}{\alpha^{2}}\right)I=\dfrac{e^{\alpha t}}{\alpha}\left(\cos\beta t+\dfrac{\beta}{\alpha}\sin\beta t\right)$ となり、整理して上の形になる。$J$ も同様。` },
          ],
          check: String.raw`$I$ を微分すると $\dfrac{e^{\alpha t}\left\{\alpha(\alpha\cos\beta t+\beta\sin\beta t)+(-\alpha\beta\sin\beta t+\beta^{2}\cos\beta t)\right\}}{\alpha^{2}+\beta^{2}}=e^{\alpha t}\cos\beta t$。確かに戻る。`,
        },
        {
          label: "(3)",
          task: String.raw`$D$ を $x$ 軸のまわりに1回転させた立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{\pi}{60}\left(\sqrt2\,e^{3\pi/4}-4\right)$`,
          approach: String.raw`$0\le t\le\dfrac{\pi}{4}$ では $x$ は増加するので、この部分の曲線は $x$ の関数のグラフになる。$V=\pi\displaystyle\int y^{2}dx$ を $t$ の積分に直し、**積和の公式**で (2) が使える形にほぐす。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D$ は、$t=0$ の点 $(1,0)$ から接点までの弧、直線 $\ell$、および $x$ 軸で囲まれた部分。$x$ は $t$ について増加だから`,
            },
            {
              k: "math",
              t: String.raw`V=\pi\int y^{2}\,dx=\pi\int_{0}^{\pi/4}e^{2t}\sin^{2}t\cdot e^{t}(\cos t-\sin t)\,dt`,
            },
            { k: "p", t: String.raw`$\sin^{2}t\cos t=\dfrac{\cos t-\cos3t}{4}$、$\sin^{3}t=\dfrac{3\sin t-\sin3t}{4}$ を使うと` },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{4}\int_{0}^{\pi/4}e^{3t}\left(\cos t-\cos3t-3\sin t+\sin3t\right)dt`,
            },
            { k: "p", t: String.raw`(2) を $\alpha=3$、$\beta=1,3$ で使い、まとめると原始関数は` },
            {
              k: "math",
              t: String.raw`G(t)=e^{3t}\left(\frac{3\cos t-4\sin t}{5}-\frac{\cos3t}{3}\right)`,
            },
            {
              k: "p",
              t: String.raw`$G(0)=\dfrac35-\dfrac13=\dfrac4{15}$、$G\!\left(\dfrac{\pi}{4}\right)=\dfrac{\sqrt2}{15}e^{3\pi/4}$ なので`,
            },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{4}\left(\frac{\sqrt2}{15}e^{3\pi/4}-\frac{4}{15}\right)=\frac{\pi}{60}\left(\sqrt2\,e^{3\pi/4}-4\right)`,
            },
          ],
          check: String.raw`$e^{3\pi/4}=10.5507\ldots$ なので $V=0.5718\ldots$。数値積分でも同じ値になる。`,
          pitfalls: [
            String.raw`回転させるのは $0\le t\le\frac\pi4$ の弧の下側。$t>\frac\pi4$ では $x$ が減るので、同じ式で積分すると重なった部分を引いてしまう。`,
            String.raw`$\sin^{2}t(\cos t-\sin t)$ を積和でほぐす。展開せずに $e^{3t}$ と掛けると (2) が使えない。`,
          ],
        },
      ],
    },
    {
      no: 6,
      field: "空間図形・ベクトル",
      topics: ["方べきの定理", "球面の方程式", "平面上にあることの示し方", "直線と球面の交点"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "条件をみたす配置を乱数で多数作り、$\\mathrm{Q}$ がつねに球面 $S$ 上に来ることを確かめた",
          "そのとき $\\mathrm{Q}$ が $\\mathrm{C}$ か $\\mathrm{D}$ に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{Q}$ が平面 $\alpha$ 上にあることを示す`,
          answer: String.raw`$\mathrm{P}$ が直線 $\mathrm{OA}$ 上にあることから $\alpha$ は $\mathrm{O}$ を通り、$\mathrm{Q}$ は直線 $\mathrm{OB}$ 上にあるので $\alpha$ 上`,
          approach: String.raw`$\vec{\mathrm{OP}}=a\vec{\mathrm{OA}}$ は「$\mathrm{P}$ が直線 $\mathrm{OA}$ 上」という意味。$\mathrm{A}$ と $\mathrm{P}$ が相異なる2点なので、**直線 $\mathrm{AP}$ は直線 $\mathrm{OA}$ そのもの**になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}\ne\mathrm{P}$ より $a\ne1$。$\mathrm{A}$ と $\mathrm{P}$ はどちらも直線 $\mathrm{OA}$ 上の点なので、直線 $\mathrm{AP}$ は直線 $\mathrm{OA}$ に一致する。`,
            },
            {
              k: "p",
              t: String.raw`平面 $\alpha$ は $\mathrm{A},\mathrm{P}$ を含むので直線 $\mathrm{OA}$ を含み、したがって $\mathrm{O}$ を通る。$\mathrm{B}$ も $\alpha$ 上なので、$\alpha$ は $\mathrm{O},\mathrm{A},\mathrm{B}$ の定める平面。`,
            },
            {
              k: "p",
              t: String.raw`$\vec{\mathrm{OQ}}=b\vec{\mathrm{OB}}$ より $\mathrm{Q}$ は直線 $\mathrm{OB}$ 上にあり、この直線は $\alpha$ に含まれる。よって $\mathrm{Q}$ は $\alpha$ 上。`,
            },
          ],
          pitfalls: [
            String.raw`$a\ne1$（$\mathrm{A}\ne\mathrm{P}$）が効く。$a=1$ だと $\mathrm{A}=\mathrm{P}$ で、3点が平面を定めない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{Q}$ が点 $\mathrm{C}$ または点 $\mathrm{D}$ に等しいことを示す`,
          answer: String.raw`条件 $a\left|\vec{\mathrm{OA}}\right|^{2}=b\left|\vec{\mathrm{OB}}\right|^{2}$ から $\mathrm{Q}$ が球面 $S$ 上に来る。$S$ と直線 $\mathrm{CD}$ の共有点は $\mathrm{C},\mathrm{D}$ だけ`,
          approach: String.raw`球面の中心を $\mathrm{M}$、半径を $r$ として $f(\mathrm{X})=\left|\vec{\mathrm{MX}}\right|^{2}-r^{2}$ とおく。$f(\mathrm{X})=0$ が「$\mathrm{X}$ が $S$ 上」。$f(\mathrm{P})=0$ から条件の意味が読める（**方べきの定理**そのもの）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O}$ を原点とみて $\vec m=\vec{\mathrm{OM}}$ とおくと、$\vec{\mathrm{OX}}=\vec x$ に対し $f(\mathrm{X})=|\vec x|^{2}-2\vec x\cdot\vec m+|\vec m|^{2}-r^{2}$。$\mathrm{B}\in S$ より $2\vec b\cdot\vec m=|\vec b|^{2}+|\vec m|^{2}-r^{2}$ で、$\vec{\mathrm{OQ}}=b\vec b$ を入れると`,
            },
            {
              k: "math",
              t: String.raw`f(\mathrm{Q})=(b-1)\left\{b\left|\vec b\right|^{2}-f(\mathrm{O})\right\}`,
            },
            {
              k: "p",
              t: String.raw`同じ計算を $\mathrm{A},\mathrm{P}$ について行うと $f(\mathrm{P})=(a-1)\left\{a\left|\vec a\right|^{2}-f(\mathrm{O})\right\}$。$\mathrm{P}\in S$ かつ $a\ne1$ なので`,
            },
            { k: "math", t: String.raw`a\left|\vec{\mathrm{OA}}\right|^{2}=f(\mathrm{O})` },
            {
              k: "p",
              t: String.raw`与えられた条件 $a\left|\vec{\mathrm{OA}}\right|^{2}=b\left|\vec{\mathrm{OB}}\right|^{2}$ と合わせると $b\left|\vec b\right|^{2}=f(\mathrm{O})$、したがって $f(\mathrm{Q})=0$。つまり $\mathrm{Q}$ は球面 $S$ 上にある。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{Q}$ は直線 $\mathrm{CD}$ 上にもある。直線と球面の共有点は多くとも2個で、$\mathrm{C},\mathrm{D}$ は相異なる共有点だから、$S$ と直線 $\mathrm{CD}$ の共有点はちょうど $\mathrm{C},\mathrm{D}$ の2点。よって $\mathrm{Q}=\mathrm{C}$ または $\mathrm{Q}=\mathrm{D}$。`,
            },
            {
              k: "note",
              t: String.raw`この条件の正体は方べきの定理である。$f(\mathrm{O})$ は $\mathrm{O}$ の球面 $S$ に関する方べきで、直線 $\mathrm{OA}$ は $S$ と $\mathrm{A},\mathrm{P}$ で交わるので $\vec{\mathrm{OA}}\cdot\vec{\mathrm{OP}}=a\left|\vec{\mathrm{OA}}\right|^{2}$ がその方べきに等しい。与えられた等式は、直線 $\mathrm{OB}$ 上でも方べきが同じ値になると言っており、それが $\mathrm{Q}\in S$ を意味する。`,
            },
          ],
          check: String.raw`球面と点を乱数でたくさん作り、条件をみたすように $a,b$ を取ると、$\mathrm{Q}$ はつねに球面上に乗り、直線 $\mathrm{CD}$ 上に取れば $\mathrm{C}$ か $\mathrm{D}$ に一致する。`,
          pitfalls: [
            String.raw`$f(\mathrm{X})$ を導入して「$S$ 上か」を1つの式で扱うのが要。座標を置いて成分計算に入ると長くなる。`,
            String.raw`$\mathrm{C}\ne\mathrm{D}$ だから直線 $\mathrm{CD}$ が決まり、共有点がちょうど2個と言える。`,
          ],
        },
      ],
    },
  ],
};
