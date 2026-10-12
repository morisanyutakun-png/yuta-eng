import { nagoyaRikei2025 } from "@/lib/solutions/nagoya-rikei-2025";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2025年度（令和7年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子を理科系・文科系の両方で突き合わせたところ、
 * **文科系の第2問・第3問は、理科系の第2問・第4問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理科系の側から借りる。
 *
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => nagoyaRikei2025.questions.find((q) => q.no === no)!;

/** 理科系 第2問（整数）。文科系の第2問とまったく同じ問題。 */
const sharedSeisu: Question = { ...rikei(2), no: 2 };

/** 理科系 第4問（確率）。文科系の第3問とまったく同じ問題。 */
const sharedCoin: Question = { ...rikei(4), no: 3 };

/** 第1問の図。$p=-1,\ q=2,\ t=0.4$ の例。 */
const P25 = -1;
const Q25 = 2;
const T25 = 0.4;
const F25 = (x: number): number => (x - P25) * (x - Q25);
const R25 = ((1 + T25) / 2) * P25 + ((1 - T25) / 2) * Q25;
const S25 = ((1 - T25) / 2) * P25 + ((1 + T25) / 2) * Q25;

export const nagoyaBunkei2025: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数・積分法",
      topics: ["解と係数の関係", "内分点", "対称式", "1/6公式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$(p,q,t)$ を4通り（$(-2,3,0.4),(1,5,1),(-4,-1,0.75),(0,7,0.1)$）とって $q-s,\\ r-p,\\ s+r,\\ s-r$ を数値で出し、$\\dfrac{(1-t)\\sqrt{b^{2}-4c}}{2},\\ -b,\\ t\\sqrt{b^{2}-4c}$ と一致することを確かめた",
          "同じ4通りで $sr$ と $s^{2}+r^{2}$ が $\\dfrac{b^{2}-t^{2}(b^{2}-4c)}{4}$、$\\dfrac{b^{2}+t^{2}(b^{2}-4c)}{2}$ と一致した",
          "面積をシンプソン法で数値積分すると、4通りとも $\\dfrac{t\\left(3-t^{2}\\right)\\left(b^{2}-4c\\right)^{3/2}}{12}$ と小数10桁まで一致した（$t=1$ では $\\dfrac{(q-p)^{3}}{6}$ に戻る）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`放物線 $y=f(x)=x^{2}+bx+c$ が2点 $(p,0),(q,0)$（$p<q$）を通り、$0<t\leqq1$ に対し $r=\dfrac{1+t}{2}p+\dfrac{1-t}{2}q$、$s=\dfrac{1-t}{2}p+\dfrac{1+t}{2}q$ とするとき、$q-s,\ r-p,\ s+r,\ s-r$ を $b,c,t$ で表す`,
          answer: String.raw`$q-s=r-p=\dfrac{\left(1-t\right)\sqrt{b^{2}-4c}}{2}$、$s+r=-b$、$s-r=t\sqrt{b^{2}-4c}$`,
          approach: String.raw`$r,s$ は $p,q$ の重み付き平均なので、差や和はすべて $q-p$ と $p+q$ だけで書ける。そして解と係数の関係から $p+q=-b$、$q-p=\sqrt{b^{2}-4c}$ である。この2つを用意してから代入する。`,
          blocks: [
            { k: "p", t: String.raw`**準備。** $p,q$ は $x^{2}+bx+c=0$ の2解なので、解と係数の関係から` },
            { k: "math", t: String.raw`p+q=-b,\qquad pq=c` },
            { k: "p", t: String.raw`である。$p<q$ より $q-p>0$ で` },
            {
              k: "math",
              t: String.raw`\left(q-p\right)^{2}=\left(p+q\right)^{2}-4pq=b^{2}-4c,\qquad q-p=\sqrt{b^{2}-4c}`,
            },
            { k: "p", t: String.raw`である（2点で交わるので $b^{2}-4c>0$）。` },
            { k: "p", t: String.raw`**$q-s$ と $r-p$。** 係数の和が $1$ であることに注意して計算すると` },
            {
              k: "math",
              t: String.raw`q-s=q-\frac{1-t}{2}p-\frac{1+t}{2}q=\frac{1-t}{2}q-\frac{1-t}{2}p=\frac{1-t}{2}\left(q-p\right)`,
            },
            {
              k: "math",
              t: String.raw`r-p=\frac{1+t}{2}p+\frac{1-t}{2}q-p=\frac{1-t}{2}q-\frac{1-t}{2}p=\frac{1-t}{2}\left(q-p\right)`,
            },
            { k: "p", t: String.raw`で、どちらも同じ値になる。よって` },
            {
              k: "math",
              t: String.raw`q-s=r-p=\frac{\left(1-t\right)\sqrt{b^{2}-4c}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$s+r$ と $s-r$。** 足すと $t$ の項が消え、引くと $p+q$ の項が消える。` },
            {
              k: "math",
              t: String.raw`s+r=\left(\frac{1-t}{2}+\frac{1+t}{2}\right)p+\left(\frac{1+t}{2}+\frac{1-t}{2}\right)q=p+q=-b`,
            },
            {
              k: "math",
              t: String.raw`s-r=\left(\frac{1-t}{2}-\frac{1+t}{2}\right)p+\left(\frac{1+t}{2}-\frac{1-t}{2}\right)q=t\left(q-p\right)=t\sqrt{b^{2}-4c}`,
            },
            {
              k: "note",
              t: String.raw`$q-s=r-p$ は「$r$ と $s$ が区間 $\left[p,q\right]$ の中点について対称」という意味である。$0<t\leqq1$ なので $p\leqq r<s\leqq q$ で、$t=1$ のとき $r=p,\ s=q$、$t$ を $0$ に近づけると $r,s$ はどちらも中点に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$q-p$ は $\pm\sqrt{b^{2}-4c}$ のどちらかだが、$p<q$ なので正のほう。符号を決めておく。`,
            String.raw`$r$ と $s$ は $p$ と $q$ の係数が入れ替わっているだけ。片方を計算したらもう片方は $p\leftrightarrow q$ の入れ替えで書ける。`,
          ],
          check: String.raw`$p=-2,q=3,t=0.4$ では $q-s=r-p=1.5$、$s+r=1=-b$、$s-r=2=t\sqrt{25}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$sr$ および $s^{2}+r^{2}$ を $b,c,t$ で表す`,
          answer: String.raw`$sr=\dfrac{b^{2}-t^{2}\left(b^{2}-4c\right)}{4}$、$s^{2}+r^{2}=\dfrac{b^{2}+t^{2}\left(b^{2}-4c\right)}{2}$`,
          approach: String.raw`(1) で $s+r$ と $s-r$ が出ている。$4sr=\left(s+r\right)^{2}-\left(s-r\right)^{2}$、$2\left(s^{2}+r^{2}\right)=\left(s+r\right)^{2}+\left(s-r\right)^{2}$ を使えば、$r,s$ を個別に書く必要がない。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\left(s+r\right)^{2}=b^{2},\qquad\left(s-r\right)^{2}=t^{2}\left(b^{2}-4c\right)`,
            },
            { k: "p", t: String.raw`である。恒等式 $\left(s+r\right)^{2}-\left(s-r\right)^{2}=4sr$ から` },
            {
              k: "math",
              t: String.raw`sr=\frac{b^{2}-t^{2}\left(b^{2}-4c\right)}{4}`,
            },
            { k: "p", t: String.raw`であり、$\left(s+r\right)^{2}+\left(s-r\right)^{2}=2\left(s^{2}+r^{2}\right)$ から` },
            {
              k: "math",
              t: String.raw`s^{2}+r^{2}=\frac{b^{2}+t^{2}\left(b^{2}-4c\right)}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t=1$ を入れると $sr=\dfrac{b^{2}-b^{2}+4c}{4}=c=pq$、$s^{2}+r^{2}=\dfrac{b^{2}+b^{2}-4c}{2}=b^{2}-2c=p^{2}+q^{2}$ となり、$r=p,\ s=q$ と整合する。`,
            },
          ],
          pitfalls: [
            String.raw`$r,s$ を根号で書き下してから掛け算しない。和と差の2乗を使うほうがはるかに短い。`,
          ],
          check: String.raw`$p=-4,q=-1,t=0.75$ では $sr=4.984375$、式の値も $4.984375$、$s^{2}+r^{2}=15.03125$ で一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`放物線 $y=f(x)$、直線 $x=r$、$x=s$、および $x$ 軸が囲む領域の面積を $b,c,t$ で表す`,
          answer: String.raw`$\dfrac{t\left(3-t^{2}\right)\left(b^{2}-4c\right)^{\frac{3}{2}}}{12}$`,
          approach: String.raw`$p\leqq r<s\leqq q$ なので、この区間では $f\leqq0$ である。したがって面積は $-\displaystyle\int_{r}^{s}f(x)\,dx$ で、$(2)$ で用意した対称式 $s+r,\ sr$ をそのまま代入すれば $r,s$ を個別に書かずに済む。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "p = -1, q = 2, t = 0.4 のときの様子。r と s は区間 [p, q] の中点について対称な位置にあり、網かけが求める面積。",
                view: [-2.2, 3.2, -2.9, 1.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: () => 0, bottom: F25, from: R25, to: S25 },
                  { k: "curve", f: F25, from: -1.46, to: 2.46 },
                  { k: "seg", a: [R25, F25(R25)], b: [R25, 0], dash: true },
                  { k: "seg", a: [S25, F25(S25)], b: [S25, 0], dash: true },
                  { k: "dot", at: [P25, 0], label: "p", place: "above-left" },
                  { k: "dot", at: [Q25, 0], label: "q", place: "above-right" },
                  { k: "dot", at: [R25, 0], label: "r", place: "above-right" },
                  { k: "dot", at: [S25, 0], label: "s", place: "above-left" },
                  { k: "text", at: [2.3, 1.05], label: "y = f(x)", place: "right" },
                  { k: "text", at: [0.5, -2.55], label: "網かけが求める面積", place: "below" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**位置関係。** (1) より $r-p=q-s=\dfrac{1-t}{2}\left(q-p\right)\geqq0$ で、$s-r=t\left(q-p\right)>0$ である。よって`,
            },
            { k: "math", t: String.raw`p\leqq r<s\leqq q` },
            {
              k: "p",
              t: String.raw`である。$f(x)=\left(x-p\right)\left(x-q\right)$ は $p\leqq x\leqq q$ で $f(x)\leqq0$ だから、$r\leqq x\leqq s$ でも $f(x)\leqq0$ である。したがって求める面積は`,
            },
            { k: "math", t: String.raw`S=-\int_{r}^{s}f(x)\,dx` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**積分する。** 原始関数を使って` },
            {
              k: "math",
              t: String.raw`\int_{r}^{s}\left(x^{2}+bx+c\right)dx=\frac{s^{3}-r^{3}}{3}+\frac{b\left(s^{2}-r^{2}\right)}{2}+c\left(s-r\right)`,
            },
            { k: "p", t: String.raw`である。$s^{3}-r^{3}=\left(s-r\right)\left(s^{2}+sr+r^{2}\right)$、$s^{2}-r^{2}=\left(s-r\right)\left(s+r\right)$ なので、$s-r$ でくくると` },
            {
              k: "math",
              t: String.raw`\int_{r}^{s}f(x)\,dx=\left(s-r\right)\left\{\frac{s^{2}+sr+r^{2}}{3}+\frac{b\left(s+r\right)}{2}+c\right\}`,
            },
            { k: "p", t: String.raw`である。$D=b^{2}-4c$ とおく。$s+r=-b$ と (2) から` },
            {
              k: "math",
              t: String.raw`s^{2}+sr+r^{2}=\left(s+r\right)^{2}-sr=b^{2}-\frac{b^{2}-t^{2}D}{4}=\frac{3b^{2}+t^{2}D}{4}`,
            },
            { k: "p", t: String.raw`なので、$\left\{\ \right\}$ の中身は` },
            {
              k: "math",
              t: String.raw`\frac{3b^{2}+t^{2}D}{12}+\frac{b\left(-b\right)}{2}+c=\frac{3b^{2}+t^{2}D-6b^{2}+12c}{12}=\frac{t^{2}D-3\left(b^{2}-4c\right)}{12}=\frac{\left(t^{2}-3\right)D}{12}`,
            },
            { k: "p", t: String.raw`となる。$s-r=t\sqrt{D}$ だったから` },
            {
              k: "math",
              t: String.raw`\int_{r}^{s}f(x)\,dx=t\sqrt{D}\cdot\frac{\left(t^{2}-3\right)D}{12}=\frac{t\left(t^{2}-3\right)D^{\frac{3}{2}}}{12}`,
            },
            { k: "p", t: String.raw`である。$0<t\leqq1$ より $t^{2}-3<0$ でこれは負、符号を変えて` },
            {
              k: "math",
              t: String.raw`S=\frac{t\left(3-t^{2}\right)\left(b^{2}-4c\right)^{\frac{3}{2}}}{12}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t=1$ とすると $S=\dfrac{2\left(b^{2}-4c\right)^{3/2}}{12}=\dfrac{\left(q-p\right)^{3}}{6}$ で、放物線と $x$ 軸が囲む面積のいわゆる $\tfrac16$ 公式に一致する。逆に $t\to0$ では $S\to0$ で、$r,s$ が中点に集まることと合う。`,
            },
          ],
          pitfalls: [
            String.raw`$r,s$ が $p,q$ の間にあることを言ってから「$f\leqq0$ だから面積は $-\int f$」と進む。ここを飛ばすと符号の根拠がない。`,
            String.raw`$\left(b^{2}-4c\right)^{3/2}$ は $\left(q-p\right)^{3}$ のこと。$b^{2}-4c>0$ なので根号のまま書いてよい。`,
          ],
          check: String.raw`$p=0,q=7,t=0.1$ で数値積分すると $8.5464166667$、式の値も $8.5464166667$ だった。$t=1$ の場合は $\tfrac16$ 公式の値と一致した。`,
        },
      ],
    },
    sharedSeisu,
    sharedCoin,
  ],
};
