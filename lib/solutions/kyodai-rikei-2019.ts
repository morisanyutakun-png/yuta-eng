import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2019年度（平成31年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第4問は文系の第4問、第5問は文系の第5問とまったく同じ問題なので、
 * 解説もそちらと同じ内容を置いている。
 * 問題冊子には常用対数表が付いているが、こちらでは再現せず、
 * 0.3010 < log10(2) < 0.3011 だけを使う道筋で解いている。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第3問の図。A(1,2)、B(0,0)、C(3,0) での曲線 P(t)。 */
const PT3 = (t: number): [number, number] => [t + 2 * t * t, 2 * t * (1 - t)];
/** 曲線と線分 CB で囲む多角形（塗り用）。 */
const POLY3: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i) => PT3(i / 40)),
  [0, 0],
];

/** 第5問の図。底面までの距離 d に対する体積（文系第5問と同じ）。 */
const V5 = (d: number) => (2 / 3) * (1 - d * d) * (1 + d);

export const kyodaiRikei2019: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "三角関数／積分法",
      topics: ["有理数と無理数", "2倍角・3倍角", "部分積分", "1/cos の積分"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\theta=\\frac\\pi6$ で $\\cos\\theta=\\frac{\\sqrt3}2$（無理数）、$\\cos2\\theta=\\frac12$、$\\cos3\\theta=0$ がどちらも有理数になることを確かめた",
          "$\\int_0^{\\pi/4}\\frac{x}{\\cos^{2}x}dx$ を $400$ 万点で数値積分すると $0.438824573$ となり、$\\frac\\pi4-\\frac12\\log2=0.438824573$ と一致した",
          "$\\int_0^{\\pi/4}\\frac{dx}{\\cos x}$ は $0.881373587$ で、$\\log\\left(1+\\sqrt2\\right)=0.881373587$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$0<\theta<\dfrac\pi2$ で、$\cos\theta$ は有理数でないが $\cos2\theta$ と $\cos3\theta$ がともに有理数になる $\theta$ を求める`,
          answer: String.raw`$\theta=\dfrac\pi6$`,
          approach: String.raw`$c=\cos\theta$ とおくと $\cos2\theta=2c^{2}-1$ から $c^{2}$ が有理数、$\cos3\theta=c\left(4c^{2}-3\right)$ から「$c\times$（有理数）」が有理数と分かる。$c$ が無理数なのだから、その有理数の因子が $0$ でなければならない。`,
          blocks: [
            { k: "p", t: String.raw`$c=\cos\theta$ とおく。` },
            {
              k: "math",
              t: String.raw`\cos2\theta=2c^{2}-1,\qquad\cos3\theta=4c^{3}-3c=c\left(4c^{2}-3\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$c^{2}$ は有理数。** $\cos2\theta$ が有理数なので $c^{2}=\dfrac{\cos2\theta+1}{2}$ も有理数である。これを $q$ とおく。`,
            },
            {
              k: "p",
              t: String.raw`**$4q-3=0$。** $\cos3\theta=c(4q-3)$ が有理数である。もし $4q-3\ne0$ なら`,
            },
            {
              k: "math",
              t: String.raw`c=\frac{\cos3\theta}{4q-3}`,
            },
            {
              k: "p",
              t: String.raw`は有理数どうしの商なので有理数となり、「$c$ は有理数でない」に反する。よって $4q-3=0$、すなわち`,
            },
            { k: "math", t: String.raw`c^{2}=q=\frac34` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\theta$ を決める。** $0<\theta<\dfrac\pi2$ では $c>0$ なので $c=\dfrac{\sqrt3}{2}$、したがって`,
            },
            { k: "math", t: String.raw`\theta=\frac\pi6` },
            {
              k: "p",
              t: String.raw`である。逆にこのとき $\cos\theta=\dfrac{\sqrt3}{2}$ は無理数（$3$ は素数なので $\sqrt3$ は無理数で、$\dfrac{\sqrt3}{2}$ も無理数）、$\cos2\theta=\cos\dfrac\pi3=\dfrac12$、$\cos3\theta=\cos\dfrac\pi2=0$ でともに有理数だから、条件をみたす。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos3\theta$ を $c$ の3次式のまま扱わず、$c\left(4c^{2}-3\right)$ と**くくる**。$c^{2}$ が有理数だと分かっているので、くくれば「有理数 $\times c$」の形になる。`,
            String.raw`$4q-3\ne0$ を仮定して矛盾を導く、という背理法の形にする。$4q-3=0$ を直接示すことはできない。`,
            String.raw`最後に逆（その $\theta$ が条件をみたすこと）を確かめる。$\frac{\sqrt3}{2}$ が無理数であることも書いておく。`,
          ],
          check: String.raw`$\theta=\frac\pi6$ で $\cos\theta=0.866025404$、$\cos2\theta=0.5$、$\cos3\theta=0$ となり、条件をすべてみたす。`,
        },
        {
          label: "問2",
          task: String.raw`$\displaystyle\int_{0}^{\frac\pi4}\frac{x}{\cos^{2}x}dx$ と $\displaystyle\int_{0}^{\frac\pi4}\frac{dx}{\cos x}$ を求める`,
          answer: String.raw`(1) $\dfrac\pi4-\dfrac12\log2$、(2) $\log\left(1+\sqrt2\right)$`,
          approach: String.raw`(1) は $\dfrac1{\cos^{2}x}$ が $\tan x$ の導関数なので部分積分。(2) は分母分子に $\cos x$ を掛けて $s=\sin x$ で置換する。`,
          blocks: [
            { k: "p", t: String.raw`**(1)** $\left(\tan x\right)'=\dfrac1{\cos^{2}x}$ なので部分積分して` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac\pi4}\frac{x}{\cos^{2}x}dx=\Bigl[x\tan x\Bigr]_{0}^{\frac\pi4}-\int_{0}^{\frac\pi4}\tan x\,dx`,
            },
            { k: "p", t: String.raw`である。$\tan\dfrac\pi4=1$ で、$\displaystyle\int\tan x\,dx=-\log\left|\cos x\right|$ だから` },
            {
              k: "math",
              t: String.raw`=\frac\pi4+\Bigl[\log\cos x\Bigr]_{0}^{\frac\pi4}=\frac\pi4+\log\frac1{\sqrt2}=\frac\pi4-\frac12\log2`,
            },
            { k: "p", t: String.raw`である（$0.4388$ ほど）。` },
            {
              k: "p",
              t: String.raw`**(2)** 分母分子に $\cos x$ を掛けて $s=\sin x$（$ds=\cos x\,dx$）とおくと`,
            },
            {
              k: "math",
              t: String.raw`\int\frac{dx}{\cos x}=\int\frac{\cos x\,dx}{1-\sin^{2}x}=\int\frac{ds}{1-s^{2}}=\frac12\log\left|\frac{1+s}{1-s}\right|`,
            },
            { k: "p", t: String.raw`である。$x:0\to\dfrac\pi4$ で $s:0\to\dfrac1{\sqrt2}$ だから` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac\pi4}\frac{dx}{\cos x}=\frac12\log\frac{1+\frac1{\sqrt2}}{1-\frac1{\sqrt2}}=\frac12\log\frac{\sqrt2+1}{\sqrt2-1}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{\sqrt2+1}{\sqrt2-1}=\left(\sqrt2+1\right)^{2}$ なので`,
            },
            {
              k: "math",
              t: String.raw`=\frac12\log\left(1+\sqrt2\right)^{2}=\log\left(1+\sqrt2\right)`,
            },
            { k: "p", t: String.raw`である（$0.8814$ ほど）。` },
          ],
          pitfalls: [
            String.raw`(1) で部分積分する向きを間違えない。$x$ を微分する側、$\frac1{\cos^{2}x}$ を積分する側にする。`,
            String.raw`$\int\tan x\,dx=-\log\left|\cos x\right|$ の符号に注意する。ここでは $\cos x>0$ なので絶対値は外せる。`,
            String.raw`(2) は $\frac1{1-s^{2}}=\frac12\left(\frac1{1+s}+\frac1{1-s}\right)$ と部分分数に分けてから積分してもよい。`,
          ],
          check: String.raw`$400$ 万点の数値積分で (1) は $0.438824573$（$\frac\pi4-\frac12\log2=0.438824573$）、(2) は $0.881373587$（$\log\left(1+\sqrt2\right)=0.881373587$）となり、どちらも一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["偶奇", "素数", "因数分解", "整数解の絞り込み"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$-2000\\le n\\le2000$ で $\\left|f(n)\\right|$ と $\\left|f(n+1)\\right|$ がともに素数になる $n$ を全探索すると、$n=-3,-2,-1,0$ の4つだけだった",
          "$n^{2}(n+2)=0$ の整数解が $0,-2$、$n^{2}(n+2)=-4$ の整数解が存在しないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$f(x)=x^{3}+2x^{2}+2$ について、$\left|f(n)\right|$ と $\left|f(n+1)\right|$ がともに素数となる整数 $n$ をすべて求める`,
          answer: String.raw`$n=-3,\;-2,\;-1,\;0$`,
          approach: String.raw`$f(n)=n^{3}+2n^{2}+2$ の偶奇は $n$ の偶奇で決まる。$n$ と $n+1$ の一方は必ず偶数なので、そちら側の $\left|f\right|$ は偶数、つまり素数なら $2$ しかない。これで候補が数個に絞れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(n)=n^{3}+2n^{2}+2\equiv n^{3}\equiv n\pmod2$ なので、$f(n)$ の偶奇は $n$ の偶奇に一致する。`,
            },
            {
              k: "p",
              t: String.raw`$n$ と $n+1$ の一方は偶数である。偶数のほう（$m$ とする）については $\left|f(m)\right|$ が偶数で、素数ならば`,
            },
            { k: "math", t: String.raw`\left|f(m)\right|=2\quad\Longleftrightarrow\quad m^{3}+2m^{2}+2=\pm2` },
            { k: "p", t: String.raw`である。すなわち` },
            {
              k: "math",
              t: String.raw`m^{2}(m+2)=0\qquad\text{または}\qquad m^{2}(m+2)=-4`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "steps",
              items: [
                String.raw`$m^{2}(m+2)=0$：$m=0$ または $m=-2$。`,
                String.raw`$m^{2}(m+2)=-4$：$m\le-3$ でないと左辺が $-4$ より小さくならない。$m=-3$ で $-9$、$m=-4$ で $-32$ と、$m$ が小さくなるほど左辺は小さくなる一方である（$m\le-3$ で $m^{2}\ge9$、$m+2\le-1$）。$m=-1,0,1,\dots$ では左辺が $\ge0$。よって整数解なし。`,
              ],
            },
            { k: "p", t: String.raw`したがって偶数のほうは $m=0$ か $m=-2$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$n=0$（$n$ が偶数側）：$\left|f(0)\right|=2$、$\left|f(1)\right|=5$。ともに素数 ◯`,
                String.raw`$n=-2$（$n$ が偶数側）：$\left|f(-2)\right|=2$、$\left|f(-1)\right|=3$。ともに素数 ◯`,
                String.raw`$n=-1$（$n+1=0$ が偶数側）：$\left|f(-1)\right|=3$、$\left|f(0)\right|=2$。ともに素数 ◯`,
                String.raw`$n=-3$（$n+1=-2$ が偶数側）：$\left|f(-3)\right|=7$、$\left|f(-2)\right|=2$。ともに素数 ◯`,
              ],
            },
            { k: "p", t: String.raw`よって求める $n$ は` },
            { k: "math", t: String.raw`n=-3,\;-2,\;-1,\;0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$f(-3)=-27+18+2=-7$、$f(-2)=-8+8+2=2$、$f(-1)=-1+2+2=3$、$f(0)=2$、$f(1)=5$ である。絶対値をとるので $f(-3)=-7$ でもよい。`,
            },
          ],
          pitfalls: [
            String.raw`「$\left|f\right|$ が素数」なので $f$ は負でもよい。$f(-3)=-7$ は $\left|f(-3)\right|=7$ で素数である。`,
            String.raw`偶数の素数は $2$ だけである。$\left|f(m)\right|=2$ から $f(m)=\pm2$ の2通りを立てる。`,
            String.raw`$m^{2}(m+2)=-4$ に解がないことは、$m\le-3$ で左辺が $-9$ 以下、$m\ge-1$ で左辺が $0$ 以上、$m=-2$ で $0$、と範囲を押さえれば言える。`,
          ],
          check: String.raw`$-2000\le n\le2000$ で全探索すると、条件をみたす $n$ は $-3,-2,-1,0$ の4つだけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "積分法",
      topics: ["媒介変数表示の曲線", "面積", "グリーンの定理", "ベクトルによる座標"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "三角形をランダムに3つとり、曲線 $\\mathrm{P}(t)$ と線分 $\\mathrm{BC}$ で囲む面積を $20$ 万点の数値積分で求めると、いずれも $\\frac S3$ と小数6桁まで一致した（$S=1.991312\\to0.663771$ など）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{Q}$ が $\mathrm{AC}$ を $t:1-t$ に、$\mathrm{P}$ が $\mathrm{BQ}$ を $t:1-t$ に内分するとき、$t$ が $0<t<1$ を動いて $\mathrm{P}$ が描く曲線と線分 $\mathrm{BC}$ で囲まれる部分の面積を $S$ で表す`,
          answer: String.raw`$\dfrac S3$`,
          approach: String.raw`$\mathrm{B}$ を原点、$\vec u=\overrightarrow{\mathrm{BA}}$、$\vec v=\overrightarrow{\mathrm{BC}}$ を基本ベクトルにとると、$\mathrm{P}$ の位置が $\left(t(1-t),\,t^{2}\right)$ という簡単な媒介変数表示になる。この「斜交座標」での面積を求めてから、$\left|\vec u\times\vec v\right|=2S$ を掛ければよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{Q}=(1-t)\mathrm{A}+t\mathrm{C}$、$\mathrm{P}=(1-t)\mathrm{B}+t\mathrm{Q}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P}=t(1-t)\mathrm{A}+(1-t)\mathrm{B}+t^{2}\mathrm{C}`,
            },
            { k: "p", t: String.raw`である（係数の和は $t-t^{2}+1-t+t^{2}=1$）。$\mathrm{B}$ を基点にすると` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{BP}}=t(1-t)\,\vec u+t^{2}\,\vec v\qquad\left(\vec u=\overrightarrow{\mathrm{BA}},\;\vec v=\overrightarrow{\mathrm{BC}}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$t=0$ で $\mathrm{P}=\mathrm{B}$、$t=1$ で $\mathrm{P}=\mathrm{C}$ なので、曲線は $\mathrm{B}$ から $\mathrm{C}$ まで伸びている。`,
            },
            {
              k: "p",
              t: String.raw`**斜交座標での面積。** $\vec u,\vec v$ を座標軸だと思い、$\mathrm{P}$ の座標を $\left(x(t),y(t)\right)=\left(t-t^{2},\;t^{2}\right)$ とする。線分 $\mathrm{BC}$ はこの座標で $x=0$（$0\le y\le1$）にあたる。囲まれた部分の面積は、グリーンの定理（$\frac12\oint\left(x\,dy-y\,dx\right)$）で求まる。$\mathrm{BC}$ の上では $x=0$、$dx=0$ なので寄与は $0$ で`,
            },
            {
              k: "math",
              t: String.raw`\frac12\int_{0}^{1}\left(xy'-yx'\right)dt`,
            },
            { k: "p", t: String.raw`だけが残る。$x'=1-2t$、$y'=2t$ なので` },
            {
              k: "math",
              t: String.raw`xy'-yx'=\left(t-t^{2}\right)\cdot2t-t^{2}(1-2t)=2t^{2}-2t^{3}-t^{2}+2t^{3}=t^{2}`,
            },
            { k: "p", t: String.raw`となり、斜交座標での面積は` },
            {
              k: "math",
              t: String.raw`\frac12\int_{0}^{1}t^{2}\,dt=\frac16`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**実際の面積に直す。** 斜交座標で面積 $\sigma$ の図形は、実際には $\sigma\left|\vec u\times\vec v\right|$ の面積をもつ。$\triangle\mathrm{ABC}$ の面積が $S$ なので $\left|\vec u\times\vec v\right|=2S$ であり`,
            },
            {
              k: "math",
              t: String.raw`（求める面積）=\frac16\cdot2S=\frac S3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`答えが三角形の形によらないのは、$\mathrm{P}$ の位置が $\mathrm{A},\mathrm{B},\mathrm{C}$ の「重み」だけで書けていて、その重みが $t$ だけで決まるからである。「鋭角三角形」という条件は図の形を決めるためのもので、答えには効かない。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\mathrm{A}(1,2)$、$\mathrm{B}(0,0)$、$\mathrm{C}(3,0)$（$S=3$）での例。$\mathrm{P}(t)$ は $\mathrm{B}$ から $\mathrm{C}$ まで $\mathrm{A}$ 側にふくらむ曲線を描き、線分 $\mathrm{BC}$ との間の面積は $\frac S3=1$ になる。`,
                view: [-0.5, 3.7, -0.55, 2.45],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: POLY3 },
                  { k: "seg", a: [0, 0], b: [1, 2], faint: true },
                  { k: "seg", a: [1, 2], b: [3, 0], faint: true },
                  { k: "seg", a: [0, 0], b: [3, 0] },
                  { k: "param", f: PT3, from: 0, to: 1 },
                  { k: "dot", at: [0, 0], label: "B", place: "below-left" },
                  { k: "dot", at: [3, 0], label: "C", place: "below-right" },
                  { k: "dot", at: [1, 2], label: "A", place: "above" },
                  { k: "dot", at: PT3(0.5), label: "P(1/2)", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{BP}}$ の係数は $\left(t(1-t),\,t^{2}\right)$ で、和は $1$ にならない（これは $\mathrm{B}$ を基点にした成分であって、重心座標ではない）。$\mathrm{A},\mathrm{B},\mathrm{C}$ の重みの和が $1$ なのとは別の話である。`,
            String.raw`斜交座標で計算した面積は、最後に $\left|\vec u\times\vec v\right|=2S$ を掛けて実際の面積に直す。$S$ を掛けるのではない。`,
            String.raw`グリーンの定理を使わないなら、$x=t-t^{2}$ が $0\le t\le\frac12$ で増加、$\frac12\le t\le1$ で減少することに注意して $\int y\,dx$ を2つに分けてもよい。計算量は増える。`,
          ],
          check: String.raw`三角形をランダムに3つとり、曲線と線分 $\mathrm{BC}$ で囲む面積を $20$ 万点の数値積分で求めると、$S=1.991312$ で $0.663771$、$S=1.329358$ で $0.443119$、$S=1.429231$ で $0.476410$ となり、いずれも $\frac S3$ と小数6桁まで一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["反復試行", "上がり下がりの回数", "等比数列の和", "場合の数"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $12$ まで $2^{n}$ 通りの「$4$ 以下／$5$ 以上」の並びをすべて列挙して確率を分数のまま計算すると、$\\frac{(n-1)2^{n}+1}{3^{n}}$ と完全に一致した（$\\frac13,\\frac59,\\frac{17}{27},\\frac{49}{81},\\frac{43}{81},\\dots$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$X_{k-1}\le4$ かつ $X_k\ge5$ となる $k$（$1\le k\le n$）がただ1つである確率を求める`,
          answer: String.raw`$\dfrac{(n-1)2^{n}+1}{3^{n}}$`,
          approach: String.raw`出た目そのものではなく「$4$ 以下か $5$ 以上か」だけが効く。$4$ 以下を「低」、$5$ 以上を「高」と書くと、条件は「低から高へ切り替わる場所がちょうど1か所」である。$X_0=0$ は低なので、これは「高が続く固まりがちょうど1つ」と同じことになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`各回の目が $4$ 以下である確率は $\dfrac46=\dfrac23$、$5$ 以上である確率は $\dfrac26=\dfrac13$ である。$4$ 以下を「低」、$5$ 以上を「高」と呼ぶ。$X_0=0$ は低である。`,
            },
            {
              k: "p",
              t: String.raw`条件の $k$ は「低のすぐ後に高が来る場所」で、$X_0$ が低だから、その個数は $X_1,\dots,X_n$ の中の**高が連続する固まりの個数**に等しい。したがって条件は「高の固まりがちょうど1つ」である。`,
            },
            {
              k: "p",
              t: String.raw`**数え上げる。** 高の固まりが $1$ つだけで長さ $L$（$1\le L\le n$）のとき、その固まりの置き場所は $n-L+1$ 通りある。残り $n-L$ 回は低だから、確率は`,
            },
            {
              k: "math",
              t: String.raw`P=\sum_{L=1}^{n}(n-L+1)\left(\frac13\right)^{L}\left(\frac23\right)^{n-L}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**和を計算する。** $\left(\dfrac23\right)^{n}$ をくくり出すと、$\dfrac{1/3}{2/3}=\dfrac12$ なので`,
            },
            {
              k: "math",
              t: String.raw`P=\left(\frac23\right)^{n}\sum_{L=1}^{n}(n+1-L)\left(\frac12\right)^{L}`,
            },
            { k: "p", t: String.raw`である。よく知られた2つの和` },
            {
              k: "math",
              t: String.raw`\sum_{L=1}^{n}\left(\frac12\right)^{L}=1-\frac1{2^{n}},\qquad\sum_{L=1}^{n}L\left(\frac12\right)^{L}=2-\frac{n+2}{2^{n}}`,
            },
            { k: "p", t: String.raw`を使うと、中かっこの中は` },
            {
              k: "math",
              t: String.raw`(n+1)\left(1-\frac1{2^{n}}\right)-\left(2-\frac{n+2}{2^{n}}\right)=n-1+\frac1{2^{n}}`,
            },
            { k: "p", t: String.raw`となる。したがって` },
            {
              k: "math",
              t: String.raw`P=\left(\frac23\right)^{n}\left(n-1+\frac1{2^{n}}\right)=(n-1)\left(\frac23\right)^{n}+\left(\frac13\right)^{n}=\frac{(n-1)2^{n}+1}{3^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ では $\dfrac13$、$n=2$ では $\dfrac59$、$n=3$ では $\dfrac{17}{27}$ である。$n=4$ の $\dfrac{49}{81}=0.605$ あたりが最大で、その後は $0$ に近づく（高の固まりが2つ以上になりやすくなるため）。`,
            },
          ],
          pitfalls: [
            String.raw`$X_0=0$ は低に数える。これがあるおかげで「切り替わりの回数＝高の固まりの個数」になる。$X_0$ を忘れると、先頭が高の場合を取りこぼす。`,
            String.raw`$\sum L r^{L}$ の公式は、$\sum r^{L}$ を微分するか、$S-rS$ を作って導く。$r=\frac12$ での値 $2-\frac{n+2}{2^{n}}$ を覚えていなくても、その場で出せる。`,
            String.raw`「ちょうど1つ」なので、高が1回も出ない場合（固まり $0$ 個）は除く。$L\ge1$ から和を始めているのはそのためである。`,
          ],
          check: String.raw`$n=1$ から $12$ まで $2^{n}$ 通りの「低・高」の並びをすべて列挙し、切り替わりがちょうど1回のものの確率を分数のまま足すと、$\frac13,\frac59,\frac{17}{27},\frac{49}{81},\frac{43}{81},\frac{107}{243},\dots$ となり、$\frac{(n-1)2^{n}+1}{3^{n}}$ と完全に一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形",
      topics: ["球に内接する立体", "正方形の面積", "3次関数の最大", "高さの最大化"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$d$ を $0$ から $1$ まで $100$ 万等分して $V=\\frac23\\left(1-d^{2}\\right)(1+d)$ を計算すると、最大は $0.790123457$（$d=0.333333$）で、$\\frac{64}{81}=0.790123457$、$d=\\frac13$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`半径 $1$ の球面上の5点が正方形 $\mathrm{B_1B_2B_3B_4}$ を底面とする四角錐をなすとき、体積の最大値を求める`,
          answer: String.raw`$\dfrac{64}{81}$`,
          approach: String.raw`底面の正方形は、球を平面で切った円に内接する。その円の半径を決めれば底面積が決まり、頂点 $\mathrm{A}$ は反対側のいちばん遠い点にとるのが最大である。だから変数は「中心から底面までの距離 $d$」1つだけになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`球の中心を $\mathrm{O}$ とする。底面の正方形 $\mathrm{B_1B_2B_3B_4}$ は1つの平面上にあり、その4頂点は球面上にあるから、この平面と球面の交わり（半径 $r$ の円）に内接する。中心 $\mathrm{O}$ からこの平面までの距離を $d$ とすると`,
            },
            { k: "math", t: String.raw`r^{2}+d^{2}=1\qquad(0\le d<1)` },
            {
              k: "p",
              t: String.raw`である。半径 $r$ の円に内接する正方形は、対角線が直径だから1辺が $\sqrt2\,r$ で、面積は`,
            },
            { k: "math", t: String.raw`S=\left(\sqrt2\,r\right)^{2}=2r^{2}=2\left(1-d^{2}\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**高さ。** 頂点 $\mathrm{A}$ も球面上にあり、底面の平面までの距離が高さである。球面上の点で、この平面からいちばん遠いのは、平面に下ろした垂線と球面の交点のうち中心から見て反対側のもので、その距離は`,
            },
            { k: "math", t: String.raw`h=1+d` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**体積。** ` },
            {
              k: "math",
              t: String.raw`V=\frac13Sh=\frac23\left(1-d^{2}\right)(1+d)=\frac23(1-d)(1+d)^{2}`,
            },
            { k: "p", t: String.raw`である。$g(d)=(1-d)(1+d)^{2}$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(d)=-(1+d)^{2}+2(1-d)(1+d)=(1+d)\left(1-3d\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$0\le d<1$ では $d=\dfrac13$ で最大になる。値は`,
            },
            {
              k: "math",
              t: String.raw`g\left(\frac13\right)=\frac23\cdot\left(\frac43\right)^{2}=\frac{32}{27}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`V_{\max}=\frac23\cdot\frac{32}{27}=\frac{64}{81}`,
            },
            {
              k: "p",
              t: String.raw`である（$0.790$ ほど）。このとき底面の円の半径は $r=\dfrac{2\sqrt2}{3}$、高さは $\dfrac43$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`中心から底面までの距離 $d$ に対する体積 $V=\frac23\left(1-d^{2}\right)(1+d)$。$d=\frac13$ で最大 $\frac{64}{81}=0.790$ をとる。$d=0$（底面が中心を通る）では $\frac23$、$d\to1$ では $0$ に近づく。`,
                view: [-0.12, 1.12, -0.08, 0.95],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: V5, from: 0, to: 1 },
                  { k: "dot", at: [1 / 3, 64 / 81], label: "最大 64/81", place: "above-right" },
                  { k: "dot", at: [0, 2 / 3], label: "2/3", place: "left" },
                  { k: "dot", at: [1, 0], label: "d = 1", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`頂点 $\mathrm{A}$ を「底面の真上」ととるのは、高さを最大にするためである。$\mathrm{A}$ がどこにあっても底面積は変わらないので、高さだけを最大にすればよい。`,
            String.raw`高さは $1+d$ であって $1-d$ ではない。$\mathrm{A}$ は底面から見て中心の向こう側にとる。`,
            String.raw`半径 $r$ の円に内接する正方形の面積は $2r^{2}$ である（対角線が $2r$ なので $\frac12\cdot2r\cdot2r=2r^{2}$）。$r^{2}$ や $4r^{2}$ としない。`,
            String.raw`$d=0$（底面が中心を通る大円）は最大ではない。そのとき $V=\frac23=0.667<\frac{64}{81}=0.790$ である。底面を少し小さくして高さを稼ぐほうが得になる。`,
          ],
          check: String.raw`$d$ を $0$ から $1$ まで $100$ 万等分して $V=\frac23\left(1-d^{2}\right)(1+d)$ を計算すると、最大は $0.790123457$（$d=0.333333$）で、$\frac{64}{81}=0.790123457$ と一致する。$d=\frac13$ では底面積 $\frac{16}{9}$、高さ $\frac43$ で $V=\frac13\cdot\frac{16}{9}\cdot\frac43=\frac{64}{81}$ である。`,
        },
      ],
    },
    {
      no: 6,
      field: "複素数平面",
      topics: ["極形式", "ド・モアブル", "周期", "常用対数による評価"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=60$ から $79$ まで $(1+i)^{n}+(1-i)^{n}$ を直接計算すると、$10^{10}$ を初めて超えるのは $n=71$（値 $68719476736=2^{36}$）であることを確かめた",
          "$n=63,64,65$ の値が $2^{32},2^{33},2^{33}$ で $10^{10}$ に届かないことを確かめた",
          "$33\\times0.3011=9.9363<10$、$36\\times0.3010=10.836>10$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$(1+i)^{n}+(1-i)^{n}>10^{10}$ をみたす最小の正の整数 $n$ を求める`,
          answer: String.raw`$n=71$`,
          approach: String.raw`$1\pm i$ を極形式で書くと $\sqrt2\left(\cos\frac\pi4\pm i\sin\frac\pi4\right)$ なので、$n$ 乗して足すと $2^{\frac n2+1}\cos\frac{n\pi}{4}$ という実数になる。$\cos\frac{n\pi}{4}$ は $n$ を $8$ で割った余りだけで決まるので、値のとりうる形は数通りしかない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1+i=\sqrt2\left(\cos\dfrac\pi4+i\sin\dfrac\pi4\right)$、$1-i$ はその共役である。ド・モアブルの定理より`,
            },
            {
              k: "math",
              t: String.raw`(1+i)^{n}+(1-i)^{n}=2^{\frac n2}\cdot2\cos\frac{n\pi}{4}=2^{\frac n2+1}\cos\frac{n\pi}{4}`,
            },
            { k: "p", t: String.raw`である。$\cos\dfrac{n\pi}{4}$ は $n$ を $8$ で割った余りで決まり` },
            {
              k: "math",
              t: String.raw`\cos\frac{n\pi}{4}=\begin{cases}1&(n\equiv0)\\[1mm]\frac{1}{\sqrt2}&(n\equiv1,7)\\[1mm]0&(n\equiv2,6)\\[1mm]-\frac{1}{\sqrt2}&(n\equiv3,5)\\[1mm]-1&(n\equiv4)\end{cases}\pmod8`,
            },
            {
              k: "p",
              t: String.raw`である。正の値になるのは $n\equiv0,1,7\pmod8$ のときだけで、そのとき`,
            },
            {
              k: "math",
              t: String.raw`(1+i)^{n}+(1-i)^{n}=\begin{cases}2^{\frac n2+1}=2^{\frac{n+2}{2}}&(n\equiv0\pmod8)\\[1mm]2^{\frac n2+\frac12}=2^{\frac{n+1}{2}}&(n\equiv1,7\pmod8)\end{cases}`,
            },
            { k: "p", t: String.raw`である（どちらも $2$ の整数乗になる）。` },
            {
              k: "p",
              t: String.raw`**$2^{k}>10^{10}$ となる $k$。** $0.3010<\log_{10}2<0.3011$ を使う。`,
            },
            {
              k: "math",
              t: String.raw`\log_{10}2^{33}=33\log_{10}2<33\times0.3011=9.9363<10`,
            },
            {
              k: "math",
              t: String.raw`\log_{10}2^{34}=34\log_{10}2>34\times0.3010=10.234>10`,
            },
            {
              k: "p",
              t: String.raw`なので、$2^{k}>10^{10}$ となるのは $k\ge34$ のときである。`,
            },
            {
              k: "p",
              t: String.raw`**$n$ を探す。** $n\equiv0,1,7\pmod8$ を小さい順に並べ、対応する指数 $k$ を見る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=63$（$\equiv7$）：$k=\dfrac{64}{2}=32$。$32<34$ で不足。`,
                String.raw`$n=64$（$\equiv0$）：$k=\dfrac{66}{2}=33$。まだ不足。`,
                String.raw`$n=65$（$\equiv1$）：$k=\dfrac{66}{2}=33$。まだ不足。`,
                String.raw`$n=71$（$\equiv7$）：$k=\dfrac{72}{2}=36\ge34$。これをみたす。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$66\le n\le70$ は $n\equiv2,3,4,5,6\pmod8$ なので値が $0$ 以下であり、条件をみたさない。したがって最小の $n$ は`,
            },
            { k: "math", t: String.raw`n=71` },
            {
              k: "p",
              t: String.raw`である（このとき値は $2^{36}=68719476736\approx6.87\times10^{10}$）。`,
            },
            {
              k: "note",
              t: String.raw`$k=34,35$ を与える $n$ は存在しない。$k=\frac{n+1}{2}=34$ なら $n=67\equiv3$、$k=\frac{n+2}{2}=34$ なら $n=66\equiv2$ で、どちらも $\cos\frac{n\pi}{4}>0$ の条件を外れる。だから $2^{33}$ の次に現れる値が $2^{36}$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos\frac{n\pi}{4}$ が負や $0$ になる $n$ を落とさない。値が $10^{10}$ より大きくなるには、まず正でなければならない。`,
            String.raw`$n\equiv0$ と $n\equiv1,7$ で指数の式が違う（$\frac{n+2}{2}$ と $\frac{n+1}{2}$）。$n=64$ と $n=65$ がどちらも $2^{33}$ になるのはそのためである。`,
            String.raw`$2^{33}$ と $2^{34}$ のどちらが $10^{10}$ を超えるかは、$\log_{10}2$ の上側・下側の評価を使い分けて決める。`,
          ],
          check: String.raw`$n=60$ から $79$ まで $(1+i)^{n}+(1-i)^{n}$ を直接計算すると、$10^{10}$ を初めて超えるのは $n=71$（値 $68719476736=2^{36}$）である。$n=63,64,65$ では $2^{32}=4294967296$、$2^{33}=8589934592$、$2^{33}$ で、いずれも $10^{10}=10000000000$ に届かない。`,
        },
      ],
    },
  ],
};
