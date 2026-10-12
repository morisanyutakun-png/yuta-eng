import { kyudaiRikei2023 } from "@/lib/solutions/kyudai-rikei-2023";
import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2023年度（令和5年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 *
 * 文科系の第3問は理科系の第3問と似ているが同じではない。小問 (2) だけが完全に
 * 同じ出題だったので、そこは理科系の側を正本として参照し、(1)(3) は別に書いた。
 */

/** 理科系 第3問の (2)（v, w を求める小問）。文科系でもそのまま出ている。 */
const sharedVW = kyudaiRikei2023.questions.find((q) => q.no === 3)!.subs[1];

/** 第1問の曲線 y = |x²-9|。 */
const AB23 = (x: number): number => Math.abs(x * x - 9);
/** 第1問の答え a = 9(∛4 - 1)。 */
const A23 = 9 * (Math.cbrt(4) - 1);

/** 第2問の曲線 y = x³ - x と、最小を与える t = √6/3。 */
const CU23 = (x: number): number => x ** 3 - x;
const T23 = Math.sqrt(6) / 3;

export const kyudaiBunkei2023: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["絶対値のついた放物線", "面積の等分", "1/6 公式", "3乗根"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=9\\left(\\sqrt[3]4-1\\right)=5.286609468$ のとき $S_1=S_2=9.5410171$ になることを数値積分で確かめた",
          "$a=3,5$ では $S_1>S_2$、$a=6,7$ では $S_1<S_2$ となり、途中で入れ替わることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$C:y=\left|(x-3)(x+3)\right|$ と $\ell:y=a$（$0<a<9$）で囲まれる図形のうち、$y\ge a$ にある部分の面積を $S_1$、$y\le a$ にある部分の面積を $S_2$ とするとき、$S_1=S_2$ となる $a$ を求める`,
          answer: String.raw`$a=9\left(\sqrt[3]4-1\right)$`,
          approach: String.raw`$C$ は $\left|x\right|\le3$ では上に凸の山、$\left|x\right|\ge3$ では下に凸の谷である。$\ell$ との交点は $x=\pm\sqrt{9-a}$（山の側）と $x=\pm\sqrt{9+a}$（谷の側）の4つ。それぞれの面積を $p=\sqrt{9-a}$、$q=\sqrt{9+a}$ で表す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C:y=\left|x^{2}-9\right|$ である。$p=\sqrt{9-a}$、$q=\sqrt{9+a}$ とおくと、$0<a<9$ より $0<p<3<q$ で、$\ell$ との交点の $x$ 座標は $\pm p$、$\pm q$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$S_1$。** $-p\le x\le p$ では $C$（$=9-x^{2}$）が $\ell$ の上にある。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S_1&=\int_{-p}^{p}\left\{\left(9-x^{2}\right)-a\right\}dx=\int_{-p}^{p}\left(p^{2}-x^{2}\right)dx\\[1mm]
&=2\left[p^{2}x-\frac{x^{3}}3\right]_0^{p}=2\left(p^{3}-\frac{p^{3}}3\right)=\frac43p^{3}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である（$9-a=p^{2}$ を使った）。` },
            {
              k: "p",
              t: String.raw`**$S_2$。** 左右対称なので、右半分（$p\le x\le q$）を2倍する。$p\le x\le3$ では $C=9-x^{2}$、$3\le x\le q$ では $C=x^{2}-9$ である。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\frac{S_2}2&=\int_p^3\left\{a-\left(9-x^{2}\right)\right\}dx+\int_3^q\left\{a-\left(x^{2}-9\right)\right\}dx\\[1mm]
&=\int_p^3\left(x^{2}-p^{2}\right)dx+\int_3^q\left(q^{2}-x^{2}\right)dx
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。それぞれ計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_p^3\left(x^{2}-p^{2}\right)dx&=\left[\frac{x^{3}}3-p^{2}x\right]_p^3=9-3p^{2}+\frac23p^{3}\\[1mm]
\int_3^q\left(q^{2}-x^{2}\right)dx&=\left[q^{2}x-\frac{x^{3}}3\right]_3^q=\frac23q^{3}-3q^{2}+9
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、$p^{2}+q^{2}=(9-a)+(9+a)=18$ だから`,
            },
            {
              k: "math",
              t: String.raw`\frac{S_2}2=18-3\cdot18+\frac23\left(p^{3}+q^{3}\right)=-36+\frac23\left(p^{3}+q^{3}\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`S_2=-72+\frac43\left(p^{3}+q^{3}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$S_1=S_2$。** ` },
            {
              k: "math",
              t: String.raw`\frac43p^{3}=-72+\frac43p^{3}+\frac43q^{3}\quad\Longleftrightarrow\quad\frac43q^{3}=72\quad\Longleftrightarrow\quad q^{3}=54`,
            },
            {
              k: "p",
              t: String.raw`である。$p^{3}$ が両辺から消えるのが気持ちよいところである。$q=\sqrt[3]{54}=3\sqrt[3]2$ なので`,
            },
            {
              k: "math",
              t: String.raw`a=q^{2}-9=\left(3\sqrt[3]2\right)^{2}-9=9\sqrt[3]4-9=9\left(\sqrt[3]4-1\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$5.287$ ほど）。$\sqrt[3]4=1.587$ なので $0<a<9$ をみたしている。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$C:y=\left|x^{2}-9\right|$ と $\ell:y=a$（$a=9\left(\sqrt[3]4-1\right)=5.287$）。山の頂上を切り取った部分が $S_1$、左右2つの谷の部分が $S_2$ で、この $a$ でちょうど等しくなる。交点は $x=\pm\sqrt{9-a}=\pm1.927$ と $x=\pm\sqrt{9+a}=\pm3.780$。`,
                view: [-5.2, 5.2, -1.6, 10.4],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: AB23, from: -5, to: 5 },
                  { k: "seg", a: [-5.2, A23], b: [5.2, A23], dash: true },
                  {
                    k: "fillBetween",
                    top: AB23,
                    bottom: () => A23,
                    from: -Math.sqrt(9 - A23),
                    to: Math.sqrt(9 - A23),
                  },
                  {
                    k: "fillBetween",
                    top: () => A23,
                    bottom: AB23,
                    from: Math.sqrt(9 - A23),
                    to: Math.sqrt(9 + A23),
                  },
                  {
                    k: "fillBetween",
                    top: () => A23,
                    bottom: AB23,
                    from: -Math.sqrt(9 + A23),
                    to: -Math.sqrt(9 - A23),
                  },
                  { k: "dot", at: [0, 9], label: "(0, 9)", place: "above" },
                  { k: "dot", at: [3, 0], label: "3", place: "below" },
                  { k: "dot", at: [-3, 0], label: "-3", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$C$ は $x=\pm3$ で折れている。$S_2$ の積分はそこで分ける。`,
            String.raw`$p=\sqrt{9-a}$、$q=\sqrt{9+a}$ とおくと $p^{2}+q^{2}=18$ が使えて、$S_2$ の定数部分がまとまる。`,
            String.raw`$S_1=S_2$ で $p^{3}$ が消え、$q$ だけの式になる。$a$ のまま押し通すと3乗根が見えにくい。`,
            String.raw`$\left(3\sqrt[3]2\right)^{2}=9\sqrt[3]4$ である。$\sqrt[3]2$ の2乗は $\sqrt[3]4$。`,
          ],
          check: String.raw`$a=5.286609468$ で数値積分すると $S_1=S_2=9.5410171$ になった。$a=3$ では $S_1-S_2=+16.57$、$a=7$ では $-13.33$ と符号が変わり、この $a$ で入れ替わることも確かめた。$q^{3}=54.0$ も一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["接線", "外心", "正弦定理", "最大最小"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$t$ を $0.002$ から $8$ まで $4000$ 点とって、$\\mathrm{B}=\\left(\\frac{2t}3,-\\frac{2t}3\\right)$ が接線 $\\ell$ 上にあることを確かめた",
          "$\\sin^{2}\\theta$ を外積から直接計算すると $\\frac{9t^{4}}{2\\left(9t^{4}-6t^{2}+2\\right)}$ と一致した",
          "外心を3点から連立で求めて $\\frac{\\mathrm{OP}}{\\mathrm{OA}}$ を $40$ 万点で調べると、最小は $t=0.8165$ での $0.5$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{B}$ の座標を $t$ を用いて表す`,
          answer: String.raw`$\mathrm{B}\left(\dfrac{2t}3,\;-\dfrac{2t}3\right)$`,
          approach: String.raw`接線 $\ell$ の方程式を書き、$y=-x$ と連立する。$t^{3}$ の項がうまく打ち消し合う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y'=3x^{2}-1$ なので、$\mathrm{A}\left(t,t^{3}-t\right)$ での接線は`,
            },
            {
              k: "math",
              t: String.raw`\ell:\;y=\left(3t^{2}-1\right)(x-t)+t^{3}-t`,
            },
            { k: "p", t: String.raw`である。$y=-x$ を代入すると` },
            {
              k: "math",
              t: String.raw`-x=\left(3t^{2}-1\right)x-\left(3t^{2}-1\right)t+t^{3}-t`,
            },
            { k: "p", t: String.raw`で、右辺の定数部分は` },
            {
              k: "math",
              t: String.raw`-3t^{3}+t+t^{3}-t=-2t^{3}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`-x-\left(3t^{2}-1\right)x=-2t^{3}\quad\Longleftrightarrow\quad-3t^{2}x=-2t^{3}`,
            },
            { k: "p", t: String.raw`である。$t>0$ より $x=\dfrac{2t}3$、よって` },
            {
              k: "math",
              t: String.raw`\mathrm{B}\left(\frac{2t}3,\;-\frac{2t}3\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x$ の係数が $-1-\left(3t^{2}-1\right)=-3t^{2}$ になる。$-1$ どうしが打ち消して $t^{2}$ だけ残るのが要点。`,
            String.raw`$t>0$ なので $3t^{2}\ne0$、割ってよい。`,
          ],
          check: String.raw`$t=0.3,0.7,1,1.5,2$ で接線と $y=-x$ の交点を計算すると、どれも $\left(\frac{2t}3,-\frac{2t}3\right)$ に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\theta=\angle\mathrm{OBA}$ とするとき $\sin^{2}\theta$ を $t$ を用いて表す`,
          answer: String.raw`$\sin^{2}\theta=\dfrac{9t^{4}}{2\left(9t^{4}-6t^{2}+2\right)}$`,
          approach: String.raw`$\overrightarrow{\mathrm{BO}}$ と $\overrightarrow{\mathrm{BA}}$ の「たすきがけ」（外積の大きさ）が $\left|\overrightarrow{\mathrm{BO}}\right|\left|\overrightarrow{\mathrm{BA}}\right|\sin\theta$ に等しい。これを2乗して割ればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{B}\left(\dfrac{2t}3,-\dfrac{2t}3\right)$、$\mathrm{O}(0,0)$、$\mathrm{A}\left(t,t^{3}-t\right)$ より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{BO}}=\left(-\frac{2t}3,\;\frac{2t}3\right),\qquad
\overrightarrow{\mathrm{BA}}=\left(\frac t3,\;t^{3}-\frac t3\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**たすきがけ。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left(-\frac{2t}3\right)\left(t^{3}-\frac t3\right)-\frac{2t}3\cdot\frac t3
&=-\frac{2t^{4}}3+\frac{2t^{2}}9-\frac{2t^{2}}9=-\frac{2t^{4}}3
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`なので $\left|\overrightarrow{\mathrm{BO}}\right|\left|\overrightarrow{\mathrm{BA}}\right|\sin\theta=\dfrac{2t^{4}}3$ である（$t>0$）。`,
            },
            { k: "p", t: String.raw`**大きさ。** ` },
            {
              k: "math",
              t: String.raw`\left|\overrightarrow{\mathrm{BO}}\right|^{2}=\frac{8t^{2}}9,\qquad
\left|\overrightarrow{\mathrm{BA}}\right|^{2}=\frac{t^{2}}9+t^{2}\left(t^{2}-\frac13\right)^{2}
=t^{2}\cdot\frac{9t^{4}-6t^{2}+2}9`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac19+\left(t^{2}-\dfrac13\right)^{2}=t^{4}-\dfrac23t^{2}+\dfrac29=\dfrac{9t^{4}-6t^{2}+2}9$）。`,
            },
            { k: "p", t: String.raw`**まとめる。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\sin^{2}\theta&=\frac{\left(\frac{2t^{4}}3\right)^{2}}{\left|\overrightarrow{\mathrm{BO}}\right|^{2}\left|\overrightarrow{\mathrm{BA}}\right|^{2}}
=\frac{\frac49t^{8}}{\frac{8t^{2}}9\cdot\frac{t^{2}\left(9t^{4}-6t^{2}+2\right)}9}\\[1mm]
&=\frac{\frac49t^{8}\cdot81}{8t^{4}\left(9t^{4}-6t^{2}+2\right)}
=\frac{9t^{4}}{2\left(9t^{4}-6t^{2}+2\right)}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`分母の $9t^{4}-6t^{2}+2=\left(3t^{2}-1\right)^{2}+1>0$ なので、どんな $t>0$ でも定義される。`,
            },
          ],
          pitfalls: [
            String.raw`$\cos\theta$ から $\sin^{2}\theta=1-\cos^{2}\theta$ と回ると計算が重い。たすきがけで直接 $\sin$ を出すほうが早い。`,
            String.raw`$\overrightarrow{\mathrm{BO}}$ であって $\overrightarrow{\mathrm{OB}}$ ではない。角の頂点が $\mathrm{B}$ である。`,
            String.raw`$\left|\overrightarrow{\mathrm{BA}}\right|^{2}$ から $t^{2}$ がくくり出せる。これが約分されて式が軽くなる。`,
          ],
          check: String.raw`$t$ を $4000$ 点とって外積から $\sin^{2}\theta$ を直接計算すると、この式と $10^{-9}$ 以内で一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$f(t)=\dfrac{\mathrm{OP}}{\mathrm{OA}}$ とするとき、$t>0$ で $f(t)$ を最小にする $t$ と最小値を求める`,
          answer: String.raw`$t=\dfrac{\sqrt6}3$ のとき最小値 $\dfrac12$`,
          approach: String.raw`$\mathrm{P}$ は $\triangle\mathrm{OAB}$ の外心なので $\mathrm{OP}$ は外接円の半径 $R$ である。正弦定理 $\dfrac{\mathrm{OA}}{\sin\theta}=2R$ から $f(t)=\dfrac1{2\sin\theta}$ となり、$\sin^{2}\theta$ を最大にすればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $\triangle\mathrm{OAB}$ の外心だから、$\mathrm{OP}$ は外接円の半径 $R$ である。辺 $\mathrm{OA}$ の対角が $\theta=\angle\mathrm{OBA}$ なので、正弦定理より`,
            },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{OA}}{\sin\theta}=2R=2\,\mathrm{OP}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`f(t)=\frac{\mathrm{OP}}{\mathrm{OA}}=\frac1{2\sin\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<\theta<\pi$ で $\sin\theta>0$ だから、$f$ を最小にするのは $\sin\theta$ を最大にすることと同じで、(2) の $\sin^{2}\theta$ を最大にすればよい。`,
            },
            { k: "p", t: String.raw`**最大を探す。** $u=t^{2}>0$ とおくと` },
            {
              k: "math",
              t: String.raw`\sin^{2}\theta=\frac92\cdot\frac{u^{2}}{9u^{2}-6u+2}`,
            },
            { k: "p", t: String.raw`である。$h(u)=\dfrac{u^{2}}{9u^{2}-6u+2}$ を微分すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
h'(u)&=\frac{2u\left(9u^{2}-6u+2\right)-u^{2}\left(18u-6\right)}{\left(9u^{2}-6u+2\right)^{2}}\\[1mm]
&=\frac{-6u^{2}+4u}{\left(9u^{2}-6u+2\right)^{2}}=\frac{2u\left(2-3u\right)}{\left(9u^{2}-6u+2\right)^{2}}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$u>0$ なので符号は $2-3u$ で決まり、$u=\dfrac23$ で $h$ は最大になる。`,
            },
            {
              k: "math",
              t: String.raw`h\!\left(\frac23\right)=\frac{\frac49}{9\cdot\frac49-4+2}=\frac{\frac49}{2}=\frac29`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\sin^{2}\theta=\frac92\cdot\frac29=1,\qquad\sin\theta=1`,
            },
            {
              k: "p",
              t: String.raw`すなわち $\theta=\dfrac\pi2$ である。このとき`,
            },
            {
              k: "math",
              t: String.raw`f(t)=\frac1{2\cdot1}=\frac12,\qquad t=\sqrt{\frac23}=\frac{\sqrt6}3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$t=\frac{\sqrt6}3=0.816$ のとき。$\mathrm{A}$ での接線（細い点線）と $y=-x$（薄い点線）の交点が $\mathrm{B}$ で、このとき $\angle\mathrm{OBA}=90^\circ$ になる。$\mathrm{OA}$ が外接円（薄い円）の直径になるので、外心 $\mathrm{P}$ は $\mathrm{OA}$ の中点にあり、$\frac{\mathrm{OP}}{\mathrm{OA}}=\frac12$ が最小値である。`,
                view: [-1.45, 1.75, -1.05, 1.05],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (u: number): [number, number] => [
                      T23 / 2 + (Math.hypot(T23, CU23(T23)) / 2) * Math.cos(u),
                      CU23(T23) / 2 + (Math.hypot(T23, CU23(T23)) / 2) * Math.sin(u),
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "curve", f: CU23, from: -1.25, to: 1.25 },
                  { k: "seg", a: [-1.0, 1.0], b: [1.0, -1.0], dash: true, faint: true },
                  {
                    k: "seg",
                    a: [0.3, (3 * T23 * T23 - 1) * (0.3 - T23) + CU23(T23)],
                    b: [1.15, (3 * T23 * T23 - 1) * (1.15 - T23) + CU23(T23)],
                    dash: true,
                  },
                  { k: "seg", a: [0, 0], b: [T23, CU23(T23)] },
                  { k: "seg", a: [0, 0], b: [(2 * T23) / 3, (-2 * T23) / 3] },
                  { k: "seg", a: [(2 * T23) / 3, (-2 * T23) / 3], b: [T23, CU23(T23)] },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [T23, CU23(T23)], label: "A", place: "below-right" },
                  { k: "dot", at: [(2 * T23) / 3, (-2 * T23) / 3], label: "B", place: "below-left" },
                  { k: "dot", at: [T23 / 2, CU23(T23) / 2], label: "P", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\sin\theta\le1$ なので $f(t)=\dfrac1{2\sin\theta}\ge\dfrac12$ は最初から分かる。$\mathrm{OA}$ が外接円の直径になるとき（$\theta=90^\circ$）に等号で、そのときだけ $\mathrm{OP}=\dfrac{\mathrm{OA}}2$ になる。要は「$\theta=90^\circ$ を実現する $t$ があるか」が問題だった、と読める。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{OP}$ が外接円の半径であることに気づくのが第一歩。$\mathrm{P}$ の座標を求める必要はない。`,
            String.raw`正弦定理で対応する辺と角を取り違えない。$\theta=\angle\mathrm{OBA}$ の対辺は $\mathrm{OA}$ である。`,
            String.raw`$u=t^{2}$ とおいて1変数の分数関数にする。$t$ のまま微分すると次数が上がる。`,
            String.raw`$t>0$ なので $t=-\frac{\sqrt6}3$ は答えにしない。`,
          ],
          check: String.raw`外心を3点から連立で求めて $\frac{\mathrm{OP}}{\mathrm{OA}}$ を $40$ 万点で調べると、最小は $t=0.8165$ での $0.500000000$ だった（$\frac{\sqrt6}3=0.816497$）。その $t$ で $\sin^{2}\theta=1.0$ になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "ベクトル",
      topics: ["平行条件", "連立1次方程式", "双対基底", "成分の取り出し"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,c,d$ をランダムに $2$ 万組とって、$\\vec v=\\left(\\frac dD,-\\frac bD\\right)$、$\\vec w=\\left(-\\frac cD,\\frac aD\\right)$ が4つの条件をみたすことを確かめた（理科系2023第3問と共通の確認）",
          "同じ $2$ 万組で $\\vec q$ もランダムにとり、$r=\\vec q\\cdot\\vec v$、$s=\\vec q\\cdot\\vec w$ が $r\\vec m+s\\vec n=\\vec q$ をみたすことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\vec m$ と $\vec n$ が平行であるための必要十分条件は $D=0$ であることを示す`,
          answer: String.raw`平行 $\Rightarrow$ $D=0$ は代入で、$D=0$ $\Rightarrow$ 平行は $a\ne0$ と $c\ne0$ で場合分けして示す`,
          approach: String.raw`両向きを別々に示す。$\Leftarrow$ の向きでは $\vec m\ne\vec0$ を使って、$a\ne0$ か $c\ne0$ かで割る相手を選ぶ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**平行 $\Rightarrow$ $D=0$。** $\vec m,\vec n$ はどちらも $\vec0$ でないので、平行なら $\vec n=k\vec m$（$k\ne0$）と書ける。$b=ka$、$d=kc$ だから`,
            },
            {
              k: "math",
              t: String.raw`D=ad-bc=a(kc)-(ka)c=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$D=0$ $\Rightarrow$ 平行。** $ad=bc$ とする。$\vec m=(a,c)\ne\vec0$ なので $a\ne0$ または $c\ne0$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a\ne0$ のとき：$d=\dfrac{bc}a$ なので $\vec n=\left(b,\dfrac{bc}a\right)=\dfrac ba\,(a,c)=\dfrac ba\vec m$`,
                String.raw`$c\ne0$ のとき：$b=\dfrac{ad}c$ なので $\vec n=\left(\dfrac{ad}c,d\right)=\dfrac dc\,(a,c)=\dfrac dc\vec m$`,
              ],
            },
            {
              k: "p",
              t: String.raw`どちらでも $\vec n$ は $\vec m$ の実数倍である。$\vec n\ne\vec0$ なので倍率は $0$ でなく、2つは平行である。`,
            },
            { k: "p", t: String.raw`以上より、平行であることと $D=0$ は同値である。` },
          ],
          pitfalls: [
            String.raw`「必要十分条件」なので両向きを示す。片方だけでは足りない。`,
            String.raw`$D=0$ から $\vec n=k\vec m$ を出すとき、いきなり $a$ で割らない。$a=0$ の場合は $c\ne0$ を使う。`,
            String.raw`$\vec m\ne\vec0$、$\vec n\ne\vec0$ が仮定にある。$\vec0$ は「どのベクトルとも平行」とも「平行でない」とも扱えるので、はじめから除かれている。`,
          ],
          check: String.raw`$\vec m=(1,2)$、$\vec n=(2,4)$ では $D=0$ で $\vec n=2\vec m$、$\vec m=(1,2)$、$\vec n=(2,3)$ では $D=-1\ne0$ で平行でない。`,
        },
        {
          ...sharedVW,
        },
        {
          label: "(3)",
          task: String.raw`座標平面上のベクトル $\vec q$ に対して $r\vec m+s\vec n=\vec q$ をみたす実数 $r,s$ を $\vec q,\vec v,\vec w$ を用いて表す`,
          answer: String.raw`$r=\vec q\cdot\vec v$、$s=\vec q\cdot\vec w$`,
          approach: String.raw`$\vec q=r\vec m+s\vec n$ の両辺と $\vec v$ の内積をとる。(2) の4つの条件から、$r$ だけが残る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D\ne0$ なので (1) より $\vec m$ と $\vec n$ は平行でなく、どんな $\vec q$ も $r\vec m+s\vec n$ の形に（ただ1通りに）書ける。`,
            },
            { k: "p", t: String.raw`**$\vec v$ との内積。** ` },
            {
              k: "math",
              t: String.raw`\vec q\cdot\vec v=\left(r\vec m+s\vec n\right)\cdot\vec v=r\left(\vec m\cdot\vec v\right)+s\left(\vec n\cdot\vec v\right)=r\cdot1+s\cdot0=r`,
            },
            { k: "p", t: String.raw`**$\vec w$ との内積。** ` },
            {
              k: "math",
              t: String.raw`\vec q\cdot\vec w=r\left(\vec m\cdot\vec w\right)+s\left(\vec n\cdot\vec w\right)=r\cdot0+s\cdot1=s`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`r=\vec q\cdot\vec v,\qquad s=\vec q\cdot\vec w`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(2) の4つの条件は「$\vec v,\vec w$ が $\vec m,\vec n$ の成分を取り出す道具である」という意味だった。$\vec m$ 方向の成分を知りたければ $\vec v$ と内積をとればよい。$\vec m,\vec n$ が直交しているときは $\vec v=\dfrac{\vec m}{\left|\vec m\right|^{2}}$、$\vec w=\dfrac{\vec n}{\left|\vec n\right|^{2}}$ になり、ふつうの正射影の話と重なる。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec q\cdot\vec v$ で $r$ が出る。$\vec m$ との内積ではない。`,
            String.raw`$\vec n\cdot\vec v=0$、$\vec m\cdot\vec w=0$ が効いて、もう一方が消える。(2) の条件をそのまま使う。`,
            String.raw`成分で書くと $r=\frac{q_1d-q_2b}D$、$s=\frac{-q_1c+q_2a}D$ である。これは連立1次方程式を解いた答えと一致する。`,
          ],
          check: String.raw`$a,b,c,d,\vec q$ をランダムに $2$ 万組とって $r=\vec q\cdot\vec v$、$s=\vec q\cdot\vec w$ とすると、つねに $r\vec m+s\vec n=\vec q$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["1 の3乗根", "共役複素数", "確率漸化式", "対称性"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n\\le8$ まで分数のまま遷移を計算すると、$P(z_n=0)=\\frac14+\\frac34\\left(-\\frac13\\right)^{n-1}$、$P(z_n=1)=\\frac14\\left\\{1-\\left(-\\frac13\\right)^{n-1}\\right\\}$ と完全に一致した",
          "同じ計算で $P(z_n=1)=P(z_n=\\omega)=P(z_n=\\omega^{2})$ がすべての $n$ で成り立つことを確かめた",
          "$n=3$ では3つとも $\\frac29$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\omega^{2}=\overline\omega$ となることを示す`,
          answer: String.raw`$\omega^{3}=1$ と $\left|\omega\right|=1$ から $\overline\omega=\dfrac1\omega=\omega^{2}$`,
          approach: String.raw`$\omega$ は $x^{3}=1$ の解なので $\left|\omega\right|^{3}=1$、よって $\left|\omega\right|=1$ である。$\omega\overline\omega=\left|\omega\right|^{2}=1$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\omega^{3}=1$ の両辺の絶対値をとると $\left|\omega\right|^{3}=1$ で、$\left|\omega\right|>0$ の実数だから $\left|\omega\right|=1$ である。したがって`,
            },
            { k: "math", t: String.raw`\omega\,\overline\omega=\left|\omega\right|^{2}=1` },
            { k: "p", t: String.raw`すなわち $\overline\omega=\dfrac1\omega$ である。一方 $\omega^{3}=1$ より $\dfrac1\omega=\omega^{2}$ なので` },
            { k: "math", t: String.raw`\omega^{2}=\overline\omega` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`具体的に $\omega=\dfrac{-1+\sqrt3\,i}2$ なので $\omega^{2}=\dfrac{1-2\sqrt3\,i-3}4=\dfrac{-1-\sqrt3\,i}2=\overline\omega$ と直接計算してもよい。`,
            },
          ],
          pitfalls: [
            String.raw`$\omega\ne0$ なので $\dfrac1\omega$ と書いてよい。`,
            String.raw`$\omega^{2}=\overline\omega$ は後の小問でずっと使う。$\overline{\omega z}=\overline\omega\,\overline z=\omega^{2}\overline z$ のように書き換えられる。`,
          ],
          check: String.raw`$\omega=-0.5+0.866025i$ で $\omega^{2}$ と $\overline\omega$ が小数15桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$z_n=0$ となる確率を $n$ の式で表す`,
          answer: String.raw`$P\left(z_n=0\right)=\dfrac14+\dfrac34\left(-\dfrac13\right)^{n-1}$`,
          approach: String.raw`$z_k=0$ なら次は必ず $0$ でない（$\omega^{t}$ は絶対値 $1$）。$z_k\ne0$ なら、次が $0$ になるのは $t=1,2$ のときだけ。これで $p_n$ の漸化式が1本で書ける。`,
          blocks: [
            { k: "p", t: String.raw`$p_n=P\left(z_n=0\right)$ とおく。$z_1=0$ より $p_1=1$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$z_k=0$ のとき：$z_{k+1}=\omega^{t}$ で $\left|\omega^{t}\right|=1\ne0$。$z_{k+1}=0$ にはならない（確率 $0$）`,
                String.raw`$z_k\ne0$ のとき：$z_{k+1}=0$ となるのは $t=1,2$ のときだけで、確率 $\dfrac26=\dfrac13$`,
              ],
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`p_{n+1}=0\cdot p_n+\frac13\left(1-p_n\right)=\frac{1-p_n}3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解く。** 不動点は $p=\dfrac{1-p}3$、すなわち $p=\dfrac14$ である。両辺から引くと`,
            },
            {
              k: "math",
              t: String.raw`p_{n+1}-\frac14=\frac{1-p_n}3-\frac14=\frac{4-4p_n-3}{12}=-\frac13\left(p_n-\frac14\right)`,
            },
            {
              k: "p",
              t: String.raw`なので $\left\{p_n-\dfrac14\right\}$ は公比 $-\dfrac13$ の等比数列である。初項は $p_1-\dfrac14=\dfrac34$ だから`,
            },
            {
              k: "math",
              t: String.raw`p_n=\frac14+\frac34\left(-\frac13\right)^{n-1}`,
            },
            {
              k: "p",
              t: String.raw`である（$p_1=1$、$p_2=0$、$p_3=\dfrac13$、$p_4=\dfrac29$、…）。`,
            },
          ],
          pitfalls: [
            String.raw`$z_k=0$ から $z_{k+1}=0$ には決して行かない。ここを $\frac13$ にしてしまうと別の数列になる。`,
            String.raw`$t=1,2$ の2通りなので確率は $\frac26=\frac13$ である。`,
            String.raw`$p_2=0$ になる。$z_2$ は必ず $\omega^{t}$（$0$ でない）だからで、式でも $\frac14-\frac14=0$ と合う。`,
          ],
          check: String.raw`$n\le8$ まで分数のまま遷移を計算すると $1,0,\frac13,\frac29,\frac7{27},\frac{20}{81},\frac{61}{243},\frac{182}{729}$ となり、式と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$z_3=1$、$z_3=\omega$、$z_3=\omega^{2}$ となる確率をそれぞれ求める`,
          answer: String.raw`どれも $\dfrac29$`,
          approach: String.raw`$z_2$ は $1,\omega,\omega^{2}$ のどれかで、それぞれ確率 $\dfrac13$ である。あとは $z_2$ の値ごとに $t=3,4,5,6$ の行き先を書き出す。(1) の $\overline\omega=\omega^{2}$ を使うと、すべて $\omega$ のべきで書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$z_2$ の分布。** $z_1=0$ なので $z_2=\omega^{t}$ である。$\omega^{3}=1$ より`,
            },
            {
              k: "math",
              t: String.raw`t=1,4\to\omega,\qquad t=2,5\to\omega^{2},\qquad t=3,6\to1`,
            },
            {
              k: "p",
              t: String.raw`なので、$z_2$ は $1,\omega,\omega^{2}$ のそれぞれを確率 $\dfrac26=\dfrac13$ でとる。`,
            },
            {
              k: "p",
              t: String.raw`**$z_2$ から $z_3$ へ。** $z_2\ne0$ なので、$t=1,2$ なら $0$、$t=3,4,5,6$ ならそれぞれ $\omega z_2$、$\overline{\omega z_2}$、$z_2$、$\overline{z_2}$ である。(1) より $\overline{\omega^{j}}=\omega^{-j}$ なので`,
            },
            {
              k: "steps",
              items: [
                String.raw`$z_2=1$：$t=3\to\omega$、$t=4\to\overline\omega=\omega^{2}$、$t=5\to1$、$t=6\to1$`,
                String.raw`$z_2=\omega$：$t=3\to\omega^{2}$、$t=4\to\overline{\omega^{2}}=\omega$、$t=5\to\omega$、$t=6\to\omega^{2}$`,
                String.raw`$z_2=\omega^{2}$：$t=3\to\omega^{3}=1$、$t=4\to\overline{1}=1$、$t=5\to\omega^{2}$、$t=6\to\omega$`,
              ],
            },
            { k: "p", t: String.raw`それぞれ $\dfrac16$ ずつである。足し合わせると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
P\left(z_3=1\right)&=\frac13\cdot\frac26+\frac13\cdot0+\frac13\cdot\frac26=\frac29\\[1mm]
P\left(z_3=\omega\right)&=\frac13\cdot\frac16+\frac13\cdot\frac26+\frac13\cdot\frac16=\frac29\\[1mm]
P\left(z_3=\omega^{2}\right)&=\frac13\cdot\frac16+\frac13\cdot\frac26+\frac13\cdot\frac16=\frac29
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。確かに $\dfrac29\times3+P\left(z_3=0\right)=\dfrac23+\dfrac13=1$ になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$\overline{\omega z_k}$ は「$\omega z_k$ の共役」である。$\overline\omega\cdot z_k$ ではない。`,
            String.raw`$\omega^{j}$ の共役は $\omega^{-j}=\omega^{3-j}$ である。$\overline{\omega^{2}}=\omega$、$\overline1=1$。`,
            String.raw`$z_2=\omega$ からは $1$ に行けない。行き先が $\omega$ と $\omega^{2}$ だけなのは、$\omega$ を掛けたり共役をとったりしても $1$ にならないからである。`,
          ],
          check: String.raw`分数のまま遷移を計算すると、$n=3$ で $P(1)=P(\omega)=P(\omega^{2})=\frac29$、$P(0)=\frac13$ になった。`,
        },
        {
          label: "(4)",
          task: String.raw`$z_n=1$ となる確率を $n$ の式で表す`,
          answer: String.raw`$P\left(z_n=1\right)=\dfrac14\left\{1-\left(-\dfrac13\right)^{n-1}\right\}$`,
          approach: String.raw`$1,\omega,\omega^{2}$ の3つが**つねに同じ確率**であることを帰納法で示す。そうすれば $P\left(z_n=1\right)=\dfrac{1-p_n}3$ で済む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a_n=P\left(z_n=1\right)$、$b_n=P\left(z_n=\omega\right)$、$c_n=P\left(z_n=\omega^{2}\right)$ とおく。`,
            },
            {
              k: "p",
              t: String.raw`**遷移をまとめる。** (3) の表から、$z_k$ の値ごとの行き先（各 $\dfrac16$）は`,
            },
            {
              k: "math",
              t: String.raw`\begin{array}{c|ccc}
z_k&\to1&\to\omega&\to\omega^{2}\\\hline
0&\frac26&\frac26&\frac26\\
1&\frac26&\frac16&\frac16\\
\omega&0&\frac26&\frac26\\
\omega^{2}&\frac26&\frac16&\frac16
\end{array}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_{n+1}&=\frac13a_n+0\cdot b_n+\frac13c_n+\frac13p_n\\[1mm]
b_{n+1}&=\frac16a_n+\frac13b_n+\frac16c_n+\frac13p_n\\[1mm]
c_{n+1}&=\frac16a_n+\frac13b_n+\frac16c_n+\frac13p_n
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**3つは等しい。** $n=1$ では $a_1=b_1=c_1=0$ である。$a_n=b_n=c_n$ と仮定すると、上の3式はいずれも`,
            },
            {
              k: "math",
              t: String.raw`\frac13a_n+\frac13a_n+\frac13p_n\quad\text{と}\quad\frac16a_n+\frac13a_n+\frac16a_n+\frac13p_n`,
            },
            {
              k: "p",
              t: String.raw`すなわちどちらも $\dfrac23a_n+\dfrac13p_n$ になり、$a_{n+1}=b_{n+1}=c_{n+1}$ である。よって帰納法によりすべての $n$ で3つは等しい。`,
            },
            {
              k: "p",
              t: String.raw`**答え。** $a_n+b_n+c_n+p_n=1$ と $a_n=b_n=c_n$ から`,
            },
            {
              k: "math",
              t: String.raw`a_n=\frac{1-p_n}3=\frac13\left\{1-\frac14-\frac34\left(-\frac13\right)^{n-1}\right\}
=\frac14\left\{1-\left(-\frac13\right)^{n-1}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である（$a_1=0$、$a_2=\dfrac13$、$a_3=\dfrac29$、$a_4=\dfrac7{27}$、…）。`,
            },
            {
              k: "note",
              t: String.raw`$p_n=\dfrac14+\dfrac34\left(-\dfrac13\right)^{n-1}$ と見比べると $p_{n+1}=a_n$ になっている。「1手前に $1$ だった確率」と「いま $0$ である確率」が一致する、という形で、$z_k\ne0$ からは一律 $\dfrac13$ で $0$ に落ちることの裏返しである。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n+1}$ の式に $b_n$ が現れない。$z_k=\omega$ からは $1$ に行けないからである。それでも3つが等しくなるのは、$a_n=c_n$ が効いているからで、表を作って確かめる。`,
            String.raw`「3つが等しい」を証明なしに使わない。帰納法で1行書いておく。`,
            String.raw`$\dfrac13\left(1-\dfrac14\right)=\dfrac14$、$\dfrac13\cdot\dfrac34=\dfrac14$ である。最後の整理で係数がそろう。`,
          ],
          check: String.raw`$n\le8$ まで分数のまま計算すると $0,\frac13,\frac29,\frac7{27},\frac{20}{81},\frac{61}{243},\frac{182}{729},\frac{547}{2187}$ で、式と完全に一致した。3つの値の確率がつねに等しいことも確かめた。`,
        },
      ],
    },
  ],
};
