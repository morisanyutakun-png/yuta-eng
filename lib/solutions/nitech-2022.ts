import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2022年度（令和4年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の動点の軌跡。 */
const PATH22 = (t: number): [number, number] => [Math.cos(2 * t), Math.cos(3 * t) / 3];
/** 第1問の速さ。$\left|\vec v\right|=\sin t\left(4\cos^{2}t+1\right)$（$0\leqq t\leqq\pi$）。 */
const SPD22 = (t: number): number => Math.sin(t) * (4 * Math.cos(t) ** 2 + 1);
/** 速さが最大になる $t$。$\cos^{2}t=\tfrac7{12}$ の2解。 */
const TMAX22 = Math.acos(Math.sqrt(7 / 12));

/** 第2問の $f,g$。 */
const F22 = (x: number): number => x ** 3 - 3 * x ** 2 - 6 * x + 8;
const G22 = (x: number): number => -x * (x + 2);

export const nitech2022: SolutionSet = {
  slug: "nitech",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "媒介変数表示・微分積分",
      topics: ["3倍角と半角", "速度ベクトルの大きさ", "置きかえて2次関数の最大", "道のり"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\sin^{2}2t=4X\\left(1-X\\right)$、$\\sin^{2}3t=\\left(1-X\\right)\\left(4X-1\\right)^{2}$ が $t=0.3,0.9,2.0$ で小数12桁まで成り立った",
          "速さを $0\\leqq t\\leqq\\pi$ で $20$ 万点走査すると最大 $2.1516574$ で、$\\tfrac{5\\sqrt{15}}9=2.1516574$ と一致した",
          "道のりを数値積分すると $4.6666667$ で、$\\tfrac{14}3=4.6666667$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`動点 $\mathrm{P}$ の時刻 $t$ における位置が $x=\cos2t$、$y=\dfrac13\cos3t$ で表されている。$X=\cos^{2}t$ とおくとき、$\sin^{2}2t$ と $\sin^{2}3t$ を $X$ で表す`,
          answer: String.raw`$\sin^{2}2t=4X\left(1-X\right)$、$\sin^{2}3t=\left(1-X\right)\left(4X-1\right)^{2}$`,
          approach: String.raw`$\sin^{2}t=1-X$。$\sin3t$ は3倍角で $\sin t$ の式にする。`,
          blocks: [
            { k: "p", t: String.raw`$\sin^{2}t=1-X$ である。2倍角から` },
            {
              k: "math",
              t: String.raw`\sin^{2}2t=\left(2\sin t\cos t\right)^{2}=4\sin^{2}t\cos^{2}t=4X\left(1-X\right)`,
            },
            { k: "p", t: String.raw`である。3倍角 $\sin3t=3\sin t-4\sin^{3}t=\sin t\left(3-4\sin^{2}t\right)$ で、$3-4\sin^{2}t=3-4\left(1-X\right)=4X-1$ だから` },
            {
              k: "math",
              t: String.raw`\sin^{2}3t=\sin^{2}t\left(4X-1\right)^{2}=\left(1-X\right)\left(4X-1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$t=0.3,0.9,2.0$ で数値を比べると、どちらも小数12桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$t=0$ から $t=\pi$ までの範囲で、$\mathrm{P}$ の速さ $\left|\vec v\right|$ の最大値を求める`,
          answer: String.raw`$\dfrac{5\sqrt{15}}{9}$`,
          approach: String.raw`$\left|\vec v\right|^{2}$ が (1) を使うと $X$ だけの3次式 $\left(1-X\right)\left(4X+1\right)^{2}$ になる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=-2\sin2t,\qquad\frac{dy}{dt}=-\sin3t`,
            },
            { k: "p", t: String.raw`なので、(1) より` },
            {
              k: "math",
              t: String.raw`\left|\vec v\right|^{2}=4\sin^{2}2t+\sin^{2}3t=16X\left(1-X\right)+\left(1-X\right)\left(4X-1\right)^{2}`,
            },
            { k: "p", t: String.raw`である。$\left(1-X\right)$ でくくると` },
            {
              k: "math",
              t: String.raw`\left|\vec v\right|^{2}=\left(1-X\right)\left\{16X+16X^{2}-8X+1\right\}=\left(1-X\right)\left(4X+1\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$t$ が $0$ から $\pi$ まで動くと $X=\cos^{2}t$ は $0\leqq X\leqq1$ のすべての値をとる。$h\left(X\right)=\left(1-X\right)\left(4X+1\right)^{2}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`h'\left(X\right)=-\left(4X+1\right)^{2}+8\left(1-X\right)\left(4X+1\right)=\left(4X+1\right)\left(7-12X\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq X\leqq1$ では $4X+1>0$ なので、$h$ は $X<\dfrac7{12}$ で増加、$X>\dfrac7{12}$ で減少する。よって $X=\dfrac7{12}$ で最大になり`,
            },
            {
              k: "math",
              t: String.raw`h\left(\frac7{12}\right)=\frac5{12}\left(\frac73+1\right)^{2}=\frac5{12}\cdot\frac{100}{9}=\frac{125}{27}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\left|\vec v\right|_{\max}=\sqrt{\frac{125}{27}}=\frac{5\sqrt5}{3\sqrt3}=\frac{5\sqrt{15}}{9}`,
            },
            { k: "p", t: String.raw`である（$2.151\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "時刻 t に対する速さ。t = 0 と t = π では 0、t = π/2 では 1 で、cos² t = 7/12 となる2つの時刻で最大 5√15/9 になる。",
                view: [-0.25, 3.45, -0.28, 2.5],
                items: [
                  { k: "curve", f: SPD22, from: 0, to: Math.PI },
                  { k: "dot", at: [TMAX22, SPD22(TMAX22)], label: "最大", place: "above-left" },
                  {
                    k: "dot",
                    at: [Math.PI - TMAX22, SPD22(Math.PI - TMAX22)],
                    label: "最大",
                    place: "above-right",
                  },
                  { k: "dot", at: [Math.PI / 2, 1], label: "t = π/2", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$X=\cos^{2}t$ の動く範囲は $\left[0,1\right]$ 全体。$t$ の範囲が $\left[0,\pi\right]$ なのでちょうど全部をとる。`,
          ],
          check: String.raw`$0\leqq t\leqq\pi$ を $20$ 万点走査すると最大 $2.1516574$ で、$\dfrac{5\sqrt{15}}9=2.1516574$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$t=0$ から $t=\pi$ までに $\mathrm{P}$ が通過する道のり $L$ を求める`,
          answer: String.raw`$L=\dfrac{14}{3}$`,
          approach: String.raw`$\left|\vec v\right|=\sin t\left(4\cos^{2}t+1\right)$ と根号がはずれる。$u=\cos t$ で置換する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $\left|\vec v\right|^{2}=\left(1-X\right)\left(4X+1\right)^{2}$ で、$1-X=\sin^{2}t$、$4X+1=4\cos^{2}t+1>0$ である。$0\leqq t\leqq\pi$ では $\sin t\geqq0$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec v\right|=\sin t\left(4\cos^{2}t+1\right)`,
            },
            { k: "p", t: String.raw`である。$u=\cos t$ とおくと $du=-\sin t\,dt$ で、$t:0\to\pi$ のとき $u:1\to-1$ だから` },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{\pi}\sin t\left(4\cos^{2}t+1\right)dt=\int_{-1}^{1}\left(4u^{2}+1\right)du=\left[\frac43u^{3}+u\right]_{-1}^{1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`L=2\left(\frac43+1\right)=\frac{14}{3}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "動点 P の軌跡。t = 0 では (1, 1/3)、t = π では (1, −1/3) にあり、途中で左へ出てから戻る。道のりは行き帰りの重なりも含めて数える。",
                view: [-1.4, 1.4, -0.62, 0.62],
                items: [
                  { k: "param", f: PATH22, from: 0, to: Math.PI },
                  { k: "dot", at: PATH22(0), label: "t = 0", place: "above-right" },
                  { k: "dot", at: PATH22(Math.PI), label: "t = π", place: "below-right" },
                  { k: "dot", at: PATH22(Math.PI / 2), label: "t = π/2", place: "left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$x=\cos2t=2X-1$、$y=\dfrac13\cos3t$ なので、軌跡は $-1\leqq x\leqq1$ の帯の中にある。道のりは「軌跡の長さ」ではなく「進んだ距離」なので、重なって戻る部分も数える。`,
            },
          ],
          check: String.raw`数値積分すると $4.6666667$ で、$\dfrac{14}3=4.6666667$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分積分",
      topics: ["条件から関数を決める", "重解をもつ3次式", "2曲線で囲む面積", "部分分数分解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$g\\left(x\\right)=-x\\left(x+2\\right)$ は $g\\left(-2\\right)=g\\left(0\\right)=0$、$g\\left(-1\\right)=1$ を満たす",
          "$f\\left(x\\right)=x^{3}-3x^{2}-6x+8$ とすると $f-g=\\left(x+2\\right)\\left(x-2\\right)^{2}$ になり、面積を数値積分すると $21.3333333=\\tfrac{64}3$",
          "$\\int_{2}^{3}\\tfrac{g}{f}dx$ を数値積分すると $1.1552453$ で、$\\tfrac53\\log2=1.1552453$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)$ は $x^{3}$ の係数が $1$ の3次関数、$g\left(x\right)$ は $x^{2}$ の係数が $-1$ の2次関数で、$y=f\left(x\right)$ と $y=g\left(x\right)$ の共有点は2点のみ、その $x$ 座標を $a,b$（$a<b$）とする。$g\left(a\right)=g\left(a+2\right)=0$、$g\left(-1\right)=1$ のとき、$a$ と $g\left(x\right)$ を求める`,
          answer: String.raw`$a=-2$、$g\left(x\right)=-x\left(x+2\right)$`,
          approach: String.raw`$g$ の $x^{2}$ の係数が $-1$ で、根が $a$ と $a+2$ だから $g\left(x\right)=-\left(x-a\right)\left(x-a-2\right)$。`,
          blocks: [
            { k: "math", t: String.raw`g\left(x\right)=-\left(x-a\right)\left(x-a-2\right)` },
            { k: "p", t: String.raw`である。$g\left(-1\right)=1$ より` },
            {
              k: "math",
              t: String.raw`-\left(-1-a\right)\left(-3-a\right)=-\left(1+a\right)\left(3+a\right)=1`,
            },
            { k: "p", t: String.raw`すなわち $a^{2}+4a+4=0$、$\left(a+2\right)^{2}=0$ なので $a=-2$ である。したがって` },
            {
              k: "math",
              t: String.raw`g\left(x\right)=-\left(x+2\right)x=-x\left(x+2\right)`,
            },
            { k: "p", t: String.raw`である（$g\left(-2\right)=g\left(0\right)=0$、$g\left(-1\right)=1$ で合う）。` },
          ],
          check: String.raw`$g\left(x\right)=-x\left(x+2\right)$ は3つの条件をすべて満たした。`,
        },
        {
          label: "(2)",
          task: String.raw`$f\left(x\right)-g\left(x\right)$ を $x$ と $b$ で表す`,
          answer: String.raw`$f\left(x\right)-g\left(x\right)=\left(x+2\right)\left(x-b\right)^{2}$`,
          approach: String.raw`$f-g$ は $x^{3}$ の係数 $1$ の3次式で、根は $-2$ と $b$ の2つだけ。どちらかが2重根になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h\left(x\right)=f\left(x\right)-g\left(x\right)$ は $x^{3}$ の係数が $1$ の3次式である。$h\left(x\right)=0$ の解は共有点の $x$ 座標だけ、つまり $-2$ と $b$ の2つなので、どちらかが2重解で`,
            },
            {
              k: "math",
              t: String.raw`h\left(x\right)=\left(x+2\right)^{2}\left(x-b\right)\quad\text{または}\quad h\left(x\right)=\left(x+2\right)\left(x-b\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$m=\dfrac{a+b}{2}=\dfrac{-2+b}{2}$ は $-2$ と $b$ の中点なので $-2<m<b$ である。条件 $f\left(m\right)>g\left(m\right)$ は $h\left(m\right)>0$ ということで`,
            },
            {
              k: "steps",
              items: [
                String.raw`$h=\left(x+2\right)^{2}\left(x-b\right)$ なら $h\left(m\right)=\left(\text{正}\right)\times\left(\text{負}\right)<0$ で不適`,
                String.raw`$h=\left(x+2\right)\left(x-b\right)^{2}$ なら $h\left(m\right)=\left(\text{正}\right)\times\left(\text{正}\right)>0$ で適する`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`f\left(x\right)-g\left(x\right)=\left(x+2\right)\left(x-b\right)^{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「共有点が2点のみ」から3次式が2重解をもつことが決まる。どちらが2重解かは $f\left(\tfrac{a+b}2\right)>g\left(\tfrac{a+b}2\right)$ で決まる。`,
          ],
          check: String.raw`(3) で求めた $f$ で $f-g$ を計算すると $\left(x+2\right)\left(x-2\right)^{2}$ になった。`,
        },
        {
          label: "(3)",
          task: String.raw`2つの曲線で囲まれる図形の面積が $\dfrac{64}{3}$ であるとき、$b$ と $f\left(x\right)$ を求める`,
          answer: String.raw`$b=2$、$f\left(x\right)=x^{3}-3x^{2}-6x+8$`,
          approach: String.raw`$u=x+2$、$c=b+2$ と置換すると積分が $\dfrac{c^{4}}{12}$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$-2<x<b$ では $\left(x+2\right)>0$、$\left(x-b\right)^{2}>0$ なので $h>0$、つまり曲線 $y=f$ が上である。面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{-2}^{b}\left(x+2\right)\left(x-b\right)^{2}dx`,
            },
            { k: "p", t: String.raw`である。$u=x+2$、$c=b+2$（$c>0$）とおくと $x-b=u-c$ で` },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{c}u\left(u-c\right)^{2}du=\left[\frac{u^{4}}{4}-\frac{2cu^{3}}{3}+\frac{c^{2}u^{2}}{2}\right]_{0}^{c}=c^{4}\left(\frac14-\frac23+\frac12\right)=\frac{c^{4}}{12}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{c^{4}}{12}=\dfrac{64}{3}$ より $c^{4}=256$、$c>0$ だから $c=4$、すなわち` },
            { k: "math", t: String.raw`b=c-2=2` },
            { k: "p", t: String.raw`である。したがって $f\left(x\right)=g\left(x\right)+\left(x+2\right)\left(x-2\right)^{2}$ で` },
            {
              k: "math",
              t: String.raw`\left(x+2\right)\left(x-2\right)^{2}=x^{3}-2x^{2}-4x+8`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`f\left(x\right)=x^{3}-2x^{2}-4x+8-x^{2}-2x=x^{3}-3x^{2}-6x+8`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) と y = g(x)。共有点は x = −2 と x = 2 の2点で、x = 2 では接している。2曲線が囲む部分（塗った部分）の面積が 64/3。",
                view: [-3.4, 3.4, -11, 13],
                items: [
                  { k: "fillBetween", top: F22, bottom: G22, from: -2, to: 2 },
                  { k: "curve", f: F22, from: -3.3, to: 3.3 },
                  { k: "curve", f: G22, from: -3.3, to: 3.3 },
                  { k: "dot", at: [-2, 0], label: "x = −2", place: "above-left" },
                  { k: "dot", at: [2, -8], label: "x = 2", place: "below-right" },
                ],
              },
            },
          ],
          check: String.raw`この $f,g$ で面積を数値積分すると $21.3333333$ で、$\dfrac{64}3=21.3333333$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$\displaystyle\int_{2}^{3}\frac{g\left(x\right)}{f\left(x\right)}dx$ を求める`,
          answer: String.raw`$\dfrac53\log2$`,
          approach: String.raw`$f$ を因数分解すると $\left(x+2\right)$ が約分できて、残りを部分分数に分ける。`,
          blocks: [
            { k: "p", t: String.raw`$f\left(1\right)=1-3-6+8=0$ なので $x-1$ で割り切れて` },
            {
              k: "math",
              t: String.raw`f\left(x\right)=\left(x-1\right)\left(x^{2}-2x-8\right)=\left(x-1\right)\left(x-4\right)\left(x+2\right)`,
            },
            { k: "p", t: String.raw`である。$g\left(x\right)=-x\left(x+2\right)$ だから、$x\neq-2$ のとき` },
            {
              k: "math",
              t: String.raw`\frac{g\left(x\right)}{f\left(x\right)}=\frac{-x}{\left(x-1\right)\left(x-4\right)}`,
            },
            { k: "p", t: String.raw`である。部分分数に分けると、$-x=A\left(x-4\right)+B\left(x-1\right)$ から $A=\dfrac13$、$B=-\dfrac43$ で` },
            {
              k: "math",
              t: String.raw`\frac{g\left(x\right)}{f\left(x\right)}=\frac{1}{3\left(x-1\right)}-\frac{4}{3\left(x-4\right)}`,
            },
            { k: "p", t: String.raw`である。$2\leqq x\leqq3$ では $x-1>0$、$x-4<0$ なので` },
            {
              k: "math",
              t: String.raw`\int_{2}^{3}\frac{g}{f}dx=\left[\frac13\log\left|x-1\right|-\frac43\log\left|x-4\right|\right]_{2}^{3}`,
            },
            { k: "p", t: String.raw`である。$x=3$ では $\dfrac13\log2-\dfrac43\log1=\dfrac13\log2$、$x=2$ では $\dfrac13\log1-\dfrac43\log2=-\dfrac43\log2$ なので` },
            {
              k: "math",
              t: String.raw`\int_{2}^{3}\frac{g}{f}dx=\frac13\log2+\frac43\log2=\frac53\log2`,
            },
            { k: "p", t: String.raw`である（$1.155\ldots$）。` },
          ],
          pitfalls: [
            String.raw`$f$ の因数 $\left(x+2\right)$ が $g$ と約分できる。先に因数分解しておくと部分分数が2項で済む。`,
          ],
          check: String.raw`数値積分すると $1.1552453$ で、$\dfrac53\log2=1.1552453$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["平行四辺形と正三角形", "内積", "平面への垂線の足", "3点が一直線上にある条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec a\\cdot\\vec c=-3$、$\\vec a\\cdot\\vec d=\\tfrac92$、$\\vec c\\cdot\\vec d=0$ で座標を作ると $\\left|\\vec d\\right|=\\left|\\vec d-\\vec a\\right|=3$ となり、三角形 $\\mathrm{OAD}$ は正三角形だった",
          "$\\cos\\angle\\mathrm{BAD}=0.5$ で $60^{\\circ}$",
          "$\\overrightarrow{\\mathrm{OP}}=\\tfrac23\\vec a+\\tfrac12\\vec c+\\tfrac13\\vec d$ は $\\overrightarrow{\\mathrm{AB}},\\overrightarrow{\\mathrm{AD}}$ と直交し、$\\overrightarrow{\\mathrm{OQ}}=\\tfrac23\\overrightarrow{\\mathrm{OP}}$、$\\overrightarrow{\\mathrm{OR}}=\\tfrac35\\vec c+\\tfrac25\\vec d$ で $\\mathrm{A},\\mathrm{Q},\\mathrm{R}$ が一直線に並んだ",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四角形 $\mathrm{OABC}$ が平行四辺形、三角形 $\mathrm{OAD}$ が正三角形で、$\mathrm{OA}=3$、$\mathrm{OC}=2$、$\angle\mathrm{AOC}=120^{\circ}$、$\angle\mathrm{COD}=90^{\circ}$ とする。$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OC}}=\vec c$、$\overrightarrow{\mathrm{OD}}=\vec d$ として、内積 $\vec a\cdot\vec c$ と $\vec a\cdot\vec d$ を求める`,
          answer: String.raw`$\vec a\cdot\vec c=-3$、$\vec a\cdot\vec d=\dfrac92$`,
          approach: String.raw`正三角形なので $\left|\vec d\right|=3$ かつ $\angle\mathrm{AOD}=60^{\circ}$。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec c=\left|\vec a\right|\left|\vec c\right|\cos120^{\circ}=3\cdot2\cdot\left(-\frac12\right)=-3`,
            },
            {
              k: "p",
              t: String.raw`である。三角形 $\mathrm{OAD}$ は正三角形なので $\left|\vec d\right|=\mathrm{OA}=3$、$\angle\mathrm{AOD}=60^{\circ}$ で`,
            },
            {
              k: "math",
              t: String.raw`\vec a\cdot\vec d=3\cdot3\cdot\cos60^{\circ}=\frac92`,
            },
            {
              k: "p",
              t: String.raw`である。なお $\angle\mathrm{COD}=90^{\circ}$ から $\vec c\cdot\vec d=0$ も分かる（以下で使う）。`,
            },
          ],
          check: String.raw`この内積で座標を作ると $\left|\vec d\right|=\left|\vec d-\vec a\right|=3$ となり、三角形 $\mathrm{OAD}$ は正三角形だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\angle\mathrm{BAD}$ の大きさを求める`,
          answer: String.raw`$60^{\circ}$`,
          approach: String.raw`平行四辺形なので $\overrightarrow{\mathrm{AB}}=\vec c$。$\overrightarrow{\mathrm{AD}}=\vec d-\vec a$ との内積を取る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`四角形 $\mathrm{OABC}$ は平行四辺形なので $\overrightarrow{\mathrm{OB}}=\vec a+\vec c$、したがって $\overrightarrow{\mathrm{AB}}=\vec c$ である。また $\overrightarrow{\mathrm{AD}}=\vec d-\vec a$ で、正三角形だから $\left|\overrightarrow{\mathrm{AD}}\right|=3$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AD}}=\vec c\cdot\left(\vec d-\vec a\right)=\vec c\cdot\vec d-\vec c\cdot\vec a=0-\left(-3\right)=3`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{BAD}=\frac{3}{\left|\vec c\right|\cdot3}=\frac{3}{2\cdot3}=\frac12`,
            },
            { k: "p", t: String.raw`であり、$\angle\mathrm{BAD}=60^{\circ}$ である。` },
          ],
          check: String.raw`座標で計算すると $\cos\angle\mathrm{BAD}=0.5$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`点 $\mathrm{O}$ から平面 $\mathrm{ABD}$ に下ろした垂線を $\mathrm{OP}$ とするとき、$\overrightarrow{\mathrm{OP}}$ を $\vec a,\vec c,\vec d$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OP}}=\dfrac23\vec a+\dfrac12\vec c+\dfrac13\vec d$`,
          approach: String.raw`$\overrightarrow{\mathrm{OP}}=\alpha\vec a+\beta\vec c+\gamma\vec d$ とおくと、平面 $\mathrm{ABD}$ 上という条件は $\alpha+\gamma=1$（$\vec c$ の係数は自由）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A},\mathrm{B},\mathrm{D}$ の位置ベクトルは $\vec a$、$\vec a+\vec c$、$\vec d$ である。平面 $\mathrm{ABD}$ 上の点は`,
            },
            {
              k: "math",
              t: String.raw`\vec a+s\,\overrightarrow{\mathrm{AB}}+t\,\overrightarrow{\mathrm{AD}}=\vec a+s\vec c+t\left(\vec d-\vec a\right)=\left(1-t\right)\vec a+s\vec c+t\vec d`,
            },
            {
              k: "p",
              t: String.raw`と書ける。そこで $\overrightarrow{\mathrm{OP}}=\alpha\vec a+\beta\vec c+\gamma\vec d$（$\alpha+\gamma=1$）とおく。使う内積は`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec a\right|^{2}=9,\quad\left|\vec c\right|^{2}=4,\quad\left|\vec d\right|^{2}=9,\quad\vec a\cdot\vec c=-3,\quad\vec a\cdot\vec d=\frac92,\quad\vec c\cdot\vec d=0`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OP}}\perp\overrightarrow{\mathrm{AB}}=\vec c$ より` },
            {
              k: "math",
              t: String.raw`-3\alpha+4\beta=0,\qquad\beta=\frac34\alpha`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OP}}\perp\overrightarrow{\mathrm{AD}}=\vec d-\vec a$ より $\overrightarrow{\mathrm{OP}}\cdot\vec d=\overrightarrow{\mathrm{OP}}\cdot\vec a$ で` },
            {
              k: "math",
              t: String.raw`\frac92\alpha+9\gamma=9\alpha-3\beta+\frac92\gamma`,
            },
            { k: "p", t: String.raw`である。$\beta=\dfrac34\alpha$ を入れて整理すると $-\dfrac92\alpha+\dfrac92\gamma+\dfrac94\alpha=0$、つまり $\gamma=\dfrac\alpha2$ である。$\alpha+\gamma=1$ とあわせて` },
            {
              k: "math",
              t: String.raw`\alpha=\frac23,\qquad\gamma=\frac13,\qquad\beta=\frac12`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac23\vec a+\frac12\vec c+\frac13\vec d`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`平面 $\mathrm{ABD}$ 上という条件は「$\vec a$ と $\vec d$ の係数の和が $1$」。$\vec c$ の係数には制限がつかない。`,
          ],
          check: String.raw`この $\overrightarrow{\mathrm{OP}}$ は $\overrightarrow{\mathrm{AB}}$ とも $\overrightarrow{\mathrm{AD}}$ とも内積が $0$ になった。`,
        },
        {
          label: "(4)",
          task: String.raw`点 $\mathrm{Q}$ は線分 $\mathrm{OP}$ 上にあり、直線 $\mathrm{AQ}$ と線分 $\mathrm{CD}$ が点 $\mathrm{R}$ で交わる。$\overrightarrow{\mathrm{OQ}}$ と $\overrightarrow{\mathrm{OR}}$ を $\vec a,\vec c,\vec d$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OQ}}=\dfrac49\vec a+\dfrac13\vec c+\dfrac29\vec d$、$\overrightarrow{\mathrm{OR}}=\dfrac35\vec c+\dfrac25\vec d$`,
          approach: String.raw`$\mathrm{R}$ を「線分 $\mathrm{CD}$ 上」と「直線 $\mathrm{AQ}$ 上」の2通りに表し、$\vec a,\vec c,\vec d$ の係数を比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a,\vec c,\vec d$ は1次独立である（内積から作ったグラム行列の行列式は $162>0$）。`,
            },
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OQ}}=k\,\overrightarrow{\mathrm{OP}}$（$0\leqq k\leqq1$）、$\mathrm{R}$ は線分 $\mathrm{CD}$ 上なので $\overrightarrow{\mathrm{OR}}=\left(1-u\right)\vec c+u\vec d$（$0\leqq u\leqq1$）とおく。$\mathrm{R}$ は直線 $\mathrm{AQ}$ 上でもあるから、実数 $v$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=\left(1-v\right)\vec a+vk\,\overrightarrow{\mathrm{OP}}=\left\{\left(1-v\right)+\frac23vk\right\}\vec a+\frac12vk\,\vec c+\frac13vk\,\vec d`,
            },
            { k: "p", t: String.raw`と書ける。係数を比べると` },
            {
              k: "math",
              t: String.raw`\left(1-v\right)+\frac23vk=0,\qquad\frac12vk=1-u,\qquad\frac13vk=u`,
            },
            { k: "p", t: String.raw`である。下の2本を足すと $\dfrac12vk+\dfrac13vk=1$、つまり $\dfrac56vk=1$ なので` },
            { k: "math", t: String.raw`vk=\frac65,\qquad u=\frac13\cdot\frac65=\frac25` },
            { k: "p", t: String.raw`である。これを1本目に入れると $1-v+\dfrac23\cdot\dfrac65=0$、$1-v+\dfrac45=0$ より $v=\dfrac95$ で` },
            { k: "math", t: String.raw`k=\frac{\frac65}{\frac95}=\frac23` },
            { k: "p", t: String.raw`である（$0\leqq\dfrac23\leqq1$ なので $\mathrm{Q}$ は線分 $\mathrm{OP}$ 上にある）。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}=\frac23\left(\frac23\vec a+\frac12\vec c+\frac13\vec d\right)=\frac49\vec a+\frac13\vec c+\frac29\vec d`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=\frac35\vec c+\frac25\vec d`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\mathrm{R}$ が線分 $\mathrm{CD}$ 上なので、$\vec a$ の係数は $0$。ここから $v$ が決まる。`,
          ],
          check: String.raw`座標で $\mathrm{A},\mathrm{Q},\mathrm{R}$ が一直線に並び、$\mathrm{Q}$ が直線 $\mathrm{OP}$ 上、$\mathrm{R}$ が直線 $\mathrm{CD}$ 上にあることを外積で確かめた。`,
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面・数列",
      topics: ["等比数列", "交代的な漸化式", "1 の n 乗根", "実数解の条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n}=z\\left(z-1\\right)^{n}$、$b_{n}=\\left(z-1\\right)\\left\\{\\left(z-1\\right)^{n}-\\left(-1\\right)^{n}\\right\\}$ が $z=0.3+0.7i,\\ 2,\\ -1.5+0.2i$ で $n=1,\\ldots,5$ まで一致した",
          "$b_{3}=0$ の解 $0,1,\\tfrac{3\\pm\\sqrt3i}2$ を入れると $\\left|b_{3}\\right|$ は $10^{-16}$ 以下だった",
          "$b_{k}=0$ の解をすべて並べると、実数だけになるのは $k=1,2$ のときだけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$z$ を複素数とし、$a_{1}=z\left(z-1\right)$、$a_{n+1}=\left(z-1\right)a_{n}$ で定めるとき、$a_{n}$ を求める`,
          answer: String.raw`$a_{n}=z\left(z-1\right)^{n}$`,
          approach: String.raw`公比 $z-1$ の等比数列。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left\{a_{n}\right\}$ は初項 $z\left(z-1\right)$、公比 $z-1$ の等比数列なので`,
            },
            {
              k: "math",
              t: String.raw`a_{n}=z\left(z-1\right)\cdot\left(z-1\right)^{n-1}=z\left(z-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$z=0.3+0.7i$ などで漸化式から作った値と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$b_{1}=z\left(z-1\right)$、$b_{n+1}=a_{n+1}-b_{n}$ で定めるとき、$b_{n}$ を求める`,
          answer: String.raw`$b_{n}=\left(z-1\right)\left\{\left(z-1\right)^{n}-\left(-1\right)^{n}\right\}$`,
          approach: String.raw`$b_{n+1}+b_{n}=z\left(z-1\right)^{n+1}$。$\left(-1\right)^{n}$ で割ると階差の形になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`b_{n+1}+b_{n}=a_{n+1}=z\left(z-1\right)^{n+1}`,
            },
            {
              k: "p",
              t: String.raw`である。両辺を $\left(-1\right)^{n+1}$ で割って $c_{n}=\dfrac{b_{n}}{\left(-1\right)^{n}}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`c_{n+1}-c_{n}=\frac{z\left(z-1\right)^{n+1}}{\left(-1\right)^{n+1}}=z\left(1-z\right)^{n+1}\cdot\left(-1\right)^{2n+2}\cdot\frac{1}{1}`,
            },
            {
              k: "p",
              t: String.raw`…と書くより、**解を直接あてる**ほうが早い。$b_{n}=\left(z-1\right)^{n+1}$ は $\left(z-1\right)^{n+2}+\left(z-1\right)^{n+1}=\left(z-1\right)^{n+1}z$ を満たすので、漸化式 $b_{n+1}+b_{n}=z\left(z-1\right)^{n+1}$ の1つの解である。一般解はこれに $b_{n+1}+b_{n}=0$ の解（$C\left(-1\right)^{n}$）を足したもので`,
            },
            {
              k: "math",
              t: String.raw`b_{n}=\left(z-1\right)^{n+1}+C\left(-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。$b_{1}=z\left(z-1\right)$ より` },
            {
              k: "math",
              t: String.raw`\left(z-1\right)^{2}-C=z\left(z-1\right),\qquad C=\left(z-1\right)\left\{\left(z-1\right)-z\right\}=-\left(z-1\right)`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`b_{n}=\left(z-1\right)^{n+1}-\left(-1\right)^{n}\left(z-1\right)=\left(z-1\right)\left\{\left(z-1\right)^{n}-\left(-1\right)^{n}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である（$n=1$ で $\left(z-1\right)\left\{\left(z-1\right)+1\right\}=z\left(z-1\right)$、$n=2$ で $\left(z-1\right)\left\{\left(z-1\right)^{2}-1\right\}=z\left(z-1\right)\left(z-2\right)$ となり、$b_{2}=a_{2}-b_{1}$ と合う）。`,
            },
          ],
          check: String.raw`$z=0.3+0.7i,\ 2,\ -1.5+0.2i$ で $n=1,\ldots,5$ まで漸化式の値と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$b_{3}=0$ が成り立つような $z$ をすべて求める`,
          answer: String.raw`$z=0,\ 1,\ \dfrac{3+\sqrt3\,i}{2},\ \dfrac{3-\sqrt3\,i}{2}$`,
          approach: String.raw`$b_{3}=\left(z-1\right)\left\{\left(z-1\right)^{3}+1\right\}$。$\left(z-1\right)^{3}=-1$ は $-1$ の3乗根。`,
          blocks: [
            { k: "p", t: String.raw`(2) で $n=3$ とすると $\left(-1\right)^{3}=-1$ だから` },
            {
              k: "math",
              t: String.raw`b_{3}=\left(z-1\right)\left\{\left(z-1\right)^{3}+1\right\}`,
            },
            { k: "p", t: String.raw`である。$b_{3}=0$ は $z=1$ または $\left(z-1\right)^{3}=-1$ である。$w=z-1$ とおくと $w^{3}=-1$、つまり` },
            {
              k: "math",
              t: String.raw`w^{3}+1=\left(w+1\right)\left(w^{2}-w+1\right)=0`,
            },
            { k: "p", t: String.raw`なので $w=-1$ または $w=\dfrac{1\pm\sqrt3\,i}{2}$ である。$z=w+1$ に戻すと` },
            {
              k: "math",
              t: String.raw`z=0,\qquad z=\frac{3\pm\sqrt3\,i}{2}`,
            },
            { k: "p", t: String.raw`である。$z=1$ とあわせて、答えは` },
            {
              k: "math",
              t: String.raw`z=0,\ 1,\ \frac{3+\sqrt3\,i}{2},\ \frac{3-\sqrt3\,i}{2}`,
            },
            { k: "p", t: String.raw`の4つである。` },
          ],
          check: String.raw`この4つを漸化式に入れると、$\left|b_{3}\right|$ はどれも $10^{-16}$ 以下だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$b_{k}=0$ を満たす $z$ が実数のみであるような自然数 $k$ をすべて求める`,
          answer: String.raw`$k=1,\ 2$`,
          approach: String.raw`$b_{k}=0$ は $z=1$ または $\left(-\left(z-1\right)\right)^{k}=1$。後者は「$1$ の $k$ 乗根」。`,
          blocks: [
            { k: "p", t: String.raw`(2) より` },
            {
              k: "math",
              t: String.raw`b_{k}=\left(z-1\right)\left\{\left(z-1\right)^{k}-\left(-1\right)^{k}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left(z-1\right)^{k}=\left(-1\right)^{k}$ は、両辺を $\left(-1\right)^{k}$ で割って`,
            },
            {
              k: "math",
              t: String.raw`\left\{-\left(z-1\right)\right\}^{k}=1`,
            },
            {
              k: "p",
              t: String.raw`と同値である。$\zeta=-\left(z-1\right)$ とおくと $\zeta$ は $1$ の $k$ 乗根で、$z=1-\zeta$ である。よって $b_{k}=0$ の解は`,
            },
            {
              k: "math",
              t: String.raw`z=1\quad\text{と}\quad z=1-\zeta\ \left(\zeta^{k}=1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$z=1-\zeta$ が実数であることと $\zeta$ が実数であることは同じなので、**解がすべて実数**になるのは「$1$ の $k$ 乗根がすべて実数」のときである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k=1$ … $\zeta=1$ だけ。解は $z=0$ と $z=1$ で実数のみ ✓`,
                String.raw`$k=2$ … $\zeta=\pm1$。解は $z=0,2$ と $z=1$ で実数のみ ✓`,
                String.raw`$k\geqq3$ … $\zeta=\cos\dfrac{2\pi}{k}+i\sin\dfrac{2\pi}{k}$ は虚部が $\sin\dfrac{2\pi}{k}\neq0$ で実数でない ✗`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`k=1,\ 2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k\geqq3$ のとき $0<\dfrac{2\pi}{k}<\pi$ なので $\sin\dfrac{2\pi}{k}>0$ である。つまり必ず虚数解が現れる。`,
            },
          ],
          pitfalls: [
            String.raw`$z=1$ はつねに解。これは実数なので判定には影響しない。`,
          ],
          check: String.raw`$k=1,\ldots,6$ で $b_{k}=0$ の解を並べると、実数だけになるのは $k=1,2$ のときだけだった。`,
        },
      ],
    },
  ],
};
