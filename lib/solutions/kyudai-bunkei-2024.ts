import { kyudaiRikei2024 } from "@/lib/solutions/kyudai-rikei-2024";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2024年度（令和6年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 *
 * 文科系の第3問・第4問は理科系の第3問・第4問とまったく同じ問題だった。
 * 同じ解説を2通り書くと必ず食い違うので、理科系の側を1つの正本として持ち、
 * ここでは番号だけ差し替えて使い回す。
 */

const rikei = (no: number) => kyudaiRikei2024.questions.find((q) => q.no === no)!;

/** 理科系 第3問と共通の出題（階乗の不定方程式）。 */
const sharedKaijo: Question = { ...rikei(3) };
/** 理科系 第4問と共通の出題（格子点と直線）。 */
const sharedKoushi: Question = { ...rikei(4) };

/** 第1問の2つの放物線。 */
const P1_24 = (x: number): number => 2 * x * x;
const P2_24 = (x: number): number => 2 * x * x - 8 * x + 16;

export const kyudaiBunkei2024: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2024,
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
      topics: ["共通接線", "平行移動", "放物線で囲む面積", "1/3 公式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$s$ を $-4$ から $4$ まで $80$ 万点に刻んで、$C_1$ の接線が $C_2$ にも接する条件（判別式 $=0$）をみたす $s$ を探すと $s=1$ だけだった",
          "面積を数値積分すると $1.333333333$ で、$\\frac43$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`直線 $\ell$ の方程式を求める`,
          answer: String.raw`$y=4x-2$`,
          approach: String.raw`$C_1$ の接線を $x=s$ での接線として書き、それが $C_2$ にも接する（連立して重解）条件を立てる。$C_2$ は $C_1$ を平行移動したものなので、接点どうしも同じだけずれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C_2:y=2x^{2}-8x+16=2(x-2)^{2}+8$ なので、$C_2$ は $C_1$ を $x$ 方向に $2$、$y$ 方向に $8$ だけ平行移動したものである。`,
            },
            {
              k: "p",
              t: String.raw`**$C_1$ の接線。** $y'=4x$ なので $x=s$ での接線は`,
            },
            { k: "math", t: String.raw`y=4s\left(x-s\right)+2s^{2}=4sx-2s^{2}` },
            { k: "p", t: String.raw`である。$m=4s$、$b=-2s^{2}$ とおく。` },
            {
              k: "p",
              t: String.raw`**$C_2$ に接する条件。** $2x^{2}-8x+16=mx+b$ すなわち`,
            },
            {
              k: "math",
              t: String.raw`2x^{2}-(8+m)x+(16-b)=0`,
            },
            { k: "p", t: String.raw`が重解をもつ条件は、判別式 $=0$ より` },
            {
              k: "math",
              t: String.raw`(8+m)^{2}-8(16-b)=0`,
            },
            { k: "p", t: String.raw`である。$m=4s$、$b=-2s^{2}$ を入れると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
(8+4s)^{2}-8\left(16+2s^{2}\right)&=64+64s+16s^{2}-128-16s^{2}\\[1mm]
&=64s-64=0
\end{aligned}`,
            },
            { k: "p", t: String.raw`すなわち $s=1$ である。よって` },
            { k: "math", t: String.raw`\ell:\;y=4x-2` },
            {
              k: "p",
              t: String.raw`である。接点は $C_1$ 側が $(1,2)$、$C_2$ 側が $x=\dfrac{8+m}4=3$ で $(3,10)$ である。`,
            },
            {
              k: "note",
              t: String.raw`$C_2$ が $C_1$ の平行移動なので、$C_2$ 側の接点は $C_1$ 側の接点を $(2,8)$ ずらした点になっている。実際 $(1,2)+(2,8)=(3,10)$ である。共通接線が1本しかないのも、2つが合同な放物線だからである。`,
            },
          ],
          pitfalls: [
            String.raw`$s^{2}$ の項がきれいに消える。合同な放物線どうしなので、$s$ の1次方程式に落ちて接線は1本だけになる。`,
            String.raw`判別式を使うかわりに「$C_2$ の $x=u$ での接線と係数比較」でもよい。どちらでも $s=1$、$u=3$ が出る。`,
          ],
          check: String.raw`$s$ を $80$ 万点に刻んで判別式 $=0$ をみたす $s$ を探すと $s=1$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`2つの放物線 $C_1,C_2$ と直線 $\ell$ で囲まれた図形の面積を求める`,
          answer: String.raw`$\dfrac43$`,
          approach: String.raw`$C_1$ と $C_2$ の交点が $x=2$ で、$\ell$ との接点が $x=1$ と $x=3$ である。$1\le x\le2$ では上が $C_1$、$2\le x\le3$ では上が $C_2$ になる。どちらの差も完全平方になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**交点。** $2x^{2}=2x^{2}-8x+16$ より $x=2$、$y=8$。$C_1$ と $C_2$ は $(2,8)$ でただ1点交わる。`,
            },
            {
              k: "p",
              t: String.raw`接点は $x=1$（$C_1$ 側）と $x=3$（$C_2$ 側）なので、囲まれた図形は $1\le x\le3$ にあり、下側は $\ell$、上側は $x\le2$ で $C_1$、$x\ge2$ で $C_2$ である。`,
            },
            { k: "p", t: String.raw`**差を作る。** ` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
2x^{2}-(4x-2)&=2x^{2}-4x+2=2(x-1)^{2}\\[1mm]
\left(2x^{2}-8x+16\right)-(4x-2)&=2x^{2}-12x+18=2(x-3)^{2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（接しているので、どちらも完全平方になる）。したがって`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\int_1^2 2(x-1)^{2}dx+\int_2^3 2(x-3)^{2}dx\\[1mm]
&=\left[\frac23(x-1)^{3}\right]_1^2+\left[\frac23(x-3)^{3}\right]_2^3\\[1mm]
&=\frac23+\left(0-\left(-\frac23\right)\right)=\frac23+\frac23=\frac43
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`2つの放物線 $C_1:y=2x^{2}$、$C_2:y=2(x-2)^{2}+8$ と共通接線 $y=4x-2$。$C_1$ とは $(1,2)$ で、$C_2$ とは $(3,10)$ で接し、$C_1$ と $C_2$ は $(2,8)$ で交わる。囲まれるのはこの3点を角とする細長い図形で、面積は $\frac43$。`,
                view: [-0.6, 4.2, -1.6, 14.4],
                step: { x: 1, y: 2 },
                items: [
                  { k: "curve", f: P1_24, from: -0.5, to: 2.6 },
                  { k: "curve", f: P2_24, from: 0.6, to: 3.6 },
                  { k: "seg", a: [0.2, 4 * 0.2 - 2], b: [3.9, 4 * 3.9 - 2], dash: true },
                  { k: "fillBetween", top: P1_24, bottom: (x: number) => 4 * x - 2, from: 1, to: 2 },
                  { k: "fillBetween", top: P2_24, bottom: (x: number) => 4 * x - 2, from: 2, to: 3 },
                  { k: "dot", at: [1, 2], label: "(1, 2)", place: "below-right" },
                  { k: "dot", at: [2, 8], label: "(2, 8)", place: "above-left" },
                  { k: "dot", at: [3, 10], label: "(3, 10)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=2$ で上側の曲線が入れ替わる。1本の積分で済ませない。`,
            String.raw`接しているので差が $2(x-1)^{2}$、$2(x-3)^{2}$ と完全平方になる。ここに気づくと積分が一瞬で終わる。`,
            String.raw`$\int_2^3 2(x-3)^{2}dx$ の下端で $(2-3)^{3}=-1$ になる。符号に注意。`,
          ],
          check: String.raw`数値積分すると $1.333333333$ で、$\frac43=1.333333333$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "ベクトル",
      topics: ["垂直条件", "連立方程式", "三角形の面積比", "大きさ"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$2p+q=5$ と $p^{2}+q^{2}=10$ を $p$ について $0.001$ 刻みで解くと、第1象限の解は $(1,3)$ だけだった",
          "$s=t=\\frac45$ のとき $\\left|\\overrightarrow{\\mathrm{OC}}\\right|=4.000000000$、$\\triangle\\mathrm{OAC}=\\triangle\\mathrm{OBC}=2.000000000$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{B}$ の座標を求める`,
          answer: String.raw`$\mathrm{B}(1,\,3)$`,
          approach: String.raw`$\mathrm{B}(p,q)$ とおくと、$\overrightarrow{\mathrm{OA}}\perp\overrightarrow{\mathrm{AB}}$ が1次式、$\left|\overrightarrow{\mathrm{OB}}\right|=\sqrt{10}$ が2次式になる。1次式を代入して解く。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{B}(p,q)$ とおく（第1象限なので $p>0$、$q>0$）。` },
            {
              k: "p",
              t: String.raw`**垂直条件。** $\overrightarrow{\mathrm{OA}}=(2,1)$、$\overrightarrow{\mathrm{AB}}=(p-2,\,q-1)$ なので`,
            },
            {
              k: "math",
              t: String.raw`2(p-2)+1\cdot(q-1)=0\quad\Longleftrightarrow\quad2p+q=5`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**大きさ。** $p^{2}+q^{2}=10$ に $q=5-2p$ を入れると` },
            {
              k: "math",
              t: String.raw`p^{2}+(5-2p)^{2}=10\;\Longleftrightarrow\;5p^{2}-20p+15=0\;\Longleftrightarrow\;p^{2}-4p+3=0`,
            },
            { k: "p", t: String.raw`すなわち $p=1$ または $p=3$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$p=1$：$q=3>0$。第1象限にある。◯`,
                String.raw`$p=3$：$q=5-6=-1<0$。第1象限にない。×`,
              ],
            },
            { k: "p", t: String.raw`よって $\mathrm{B}(1,3)$ である。` },
          ],
          pitfalls: [
            String.raw`「第1象限にあり」という条件で $p=3$ が切れる。これがないと答えが2つになる。`,
            String.raw`$\overrightarrow{\mathrm{AB}}=\overrightarrow{\mathrm{OB}}-\overrightarrow{\mathrm{OA}}$ である。$\overrightarrow{\mathrm{BA}}$ と取り違えない（内積 $=0$ なので結果は同じだが）。`,
          ],
          check: String.raw`$\left|\overrightarrow{\mathrm{OB}}\right|=3.16227766=\sqrt{10}$、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{AB}}=0$ を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$s,t$ を正の実数とし $\overrightarrow{\mathrm{OC}}=s\overrightarrow{\mathrm{OA}}+t\overrightarrow{\mathrm{OB}}$ とする。$\triangle\mathrm{OAC}=\triangle\mathrm{OBC}$ かつ $\left|\overrightarrow{\mathrm{OC}}\right|=4$ のとき $s,t$ を求める`,
          answer: String.raw`$s=t=\dfrac45$`,
          approach: String.raw`$\triangle\mathrm{OAC}$ は $\overrightarrow{\mathrm{OA}}$ と $\overrightarrow{\mathrm{OC}}$ で張られる平行四辺形の半分なので、$\overrightarrow{\mathrm{OC}}$ を代入すると $t$ に比例する。同様に $\triangle\mathrm{OBC}$ は $s$ に比例する。だから面積が等しい $\Longleftrightarrow$ $s=t$ である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OA}}=(2,1)$、$\overrightarrow{\mathrm{OB}}=(1,3)$ である。2つのベクトル $\vec u=(u_1,u_2)$、$\vec v=(v_1,v_2)$ が張る三角形の面積は $\dfrac12\left|u_1v_2-u_2v_1\right|$ である。$\overrightarrow{\mathrm{OA}}$ と $\overrightarrow{\mathrm{OB}}$ については`,
            },
            { k: "math", t: String.raw`2\cdot3-1\cdot1=5\;(\ne0)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**2つの三角形。** $\overrightarrow{\mathrm{OC}}=s\overrightarrow{\mathrm{OA}}+t\overrightarrow{\mathrm{OB}}$ を入れると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\triangle\mathrm{OAC}&=\frac12\left|\overrightarrow{\mathrm{OA}}\text{ と }\overrightarrow{\mathrm{OC}}\text{ の外積}\right|=\frac12\left|t\right|\cdot5=\frac{5t}2\\[1mm]
\triangle\mathrm{OBC}&=\frac12\left|s\right|\cdot5=\frac{5s}2
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\overrightarrow{\mathrm{OA}}$ と $s\overrightarrow{\mathrm{OA}}$ の部分は消えるから）。$s,t>0$ なので、面積が等しい条件は`,
            },
            { k: "math", t: String.raw`s=t` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**大きさから決める。** $s=t$ のとき` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OC}}=s\left\{(2,1)+(1,3)\right\}=s(3,4)`,
            },
            { k: "p", t: String.raw`で、$\left|\overrightarrow{\mathrm{OC}}\right|=5s=4$ より` },
            { k: "math", t: String.raw`s=t=\frac45` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\triangle\mathrm{OAC}$ と $\triangle\mathrm{OBC}$ はどちらも底辺を $\mathrm{OC}$ と見ると、高さが $\mathrm{A}$、$\mathrm{B}$ から直線 $\mathrm{OC}$ までの距離になる。面積が等しいとは「$\mathrm{A}$ と $\mathrm{B}$ が直線 $\mathrm{OC}$ から等距離」ということで、$\mathrm{C}$ が $\angle\mathrm{AOB}$ の「平行四辺形の対角線」方向にある、と読める。`,
            },
          ],
          pitfalls: [
            String.raw`$\triangle\mathrm{OAC}$ に $s$ は効かない。$\overrightarrow{\mathrm{OA}}$ の成分ぶんは $\overrightarrow{\mathrm{OA}}$ と平行で面積に寄与しないからである。`,
            String.raw`$s,t>0$ という条件があるので $\left|s\right|=s$、$\left|t\right|=t$ としてよい。負も許すと $s=-t$ も出る。`,
            String.raw`$(2,1)+(1,3)=(3,4)$ で大きさ $5$。$3,4,5$ の直角三角形になっていて計算が楽である。`,
          ],
          check: String.raw`$s=t=\frac45$ のとき $\overrightarrow{\mathrm{OC}}=(2.4,\,3.2)$、$\left|\overrightarrow{\mathrm{OC}}\right|=4.000000000$、$\triangle\mathrm{OAC}=\triangle\mathrm{OBC}=2.000000000$ だった。`,
        },
      ],
    },
    sharedKaijo,
    sharedKoushi,
  ],
};
