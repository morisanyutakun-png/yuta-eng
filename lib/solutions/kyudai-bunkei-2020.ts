import { kyudaiRikei2020 } from "@/lib/solutions/kyudai-rikei-2020";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2020年度（令和2年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 *
 * 文科系の第4問は理科系の第4問とまったく同じ問題だった。
 * 同じ解説を2通り書くと必ず食い違うので、理科系の側を1つの正本として持ち、
 * ここでは番号だけ差し替えて使い回す。
 */

/** 理科系 第4問と共通の出題（サイコロ4個の積）。 */
const sharedSaikoro: Question = { ...kyudaiRikei2020.questions.find((q) => q.no === 4)! };

/** 第1問（a=1 のとき）の2つの放物線。 */
const P1_20 = (x: number): number => x * x;
const P2_20 = (x: number): number => 3 * (x - 1) ** 2 + 1 - 40;
/** 第1問の S = (-2a³+3a²+80)^{3/2}/3。 */
const S20 = (a: number): number => Math.pow(-2 * a ** 3 + 3 * a * a + 80, 1.5) / 3;
/** 第2問の断面積 2t(1-t)。 */
const A20 = (t: number): number => 2 * t * (1 - t);

export const kyudaiBunkei2020: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2020,
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
      topics: ["2曲線の交点", "判別式", "1/6 公式", "3次関数の最大"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$2a^{3}-3a^{2}-80=(a-4)\\left(2a^{2}+5a+20\\right)$ で、$2a^{2}+5a+20$ の判別式が $-135<0$ であることを確かめた",
          "$a$ を $0$ から $4$ まで $40$ 万点に刻んで $S$ を計算すると、最大は $a=1$ での $243.0$ だった",
          "$a=1$ のとき交点は $x=-3,6$ で、面積を数値積分すると $243.0$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C_1$ と $C_2$ が異なる2点で交わるような定数 $a$ の値の範囲を求める`,
          answer: String.raw`$0\le a<4$`,
          approach: String.raw`連立して2次方程式にし、判別式が正になる条件を書く。$a$ の3次不等式になるが、$a=4$ が根なので因数分解できる。`,
          blocks: [
            { k: "p", t: String.raw`$x^{2}=3(x-a)^{2}+a^{3}-40$ を整理すると` },
            {
              k: "math",
              t: String.raw`2x^{2}-6ax+\left(3a^{2}+a^{3}-40\right)=0`,
            },
            { k: "p", t: String.raw`である。異なる2点で交わる条件は判別式が正で` },
            {
              k: "math",
              t: String.raw`\frac D4=9a^{2}-2\left(3a^{2}+a^{3}-40\right)=-2a^{3}+3a^{2}+80>0`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`2a^{3}-3a^{2}-80<0`,
            },
            {
              k: "p",
              t: String.raw`である。$a=4$ を代入すると $128-48-80=0$ なので $a-4$ でくくれて`,
            },
            {
              k: "math",
              t: String.raw`2a^{3}-3a^{2}-80=(a-4)\left(2a^{2}+5a+20\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。$2a^{2}+5a+20$ の判別式は $25-160=-135<0$ で、$a^{2}$ の係数が正だから、この2次式はつねに正である。よって`,
            },
            {
              k: "math",
              t: String.raw`2a^{3}-3a^{2}-80<0\quad\Longleftrightarrow\quad a-4<0\quad\Longleftrightarrow\quad a<4`,
            },
            { k: "p", t: String.raw`である。$a\ge0$ と合わせて` },
            { k: "math", t: String.raw`0\le a<4` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\frac D4$ を使うなら、$x$ の係数 $-6a$ の半分 $-3a$ を2乗する。$2x^{2}$ の係数 $2$ を掛け忘れない（$\frac D4=(3a)^{2}-2\cdot(\cdots)$）。`,
            String.raw`3次不等式は因数分解してから符号を見る。$2a^{2}+5a+20>0$ がつねに成り立つことを判別式で確かめる。`,
            String.raw`$a\ge0$ という前提を最後に合わせる。`,
          ],
          check: String.raw`$a$ を $0$ から $4$ まで $0.001$ 刻みで動かすと $\frac D4>0$ がすべて成り立ち、$a=4$ でちょうど $0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a$ が (1) の範囲を動くとき、$C_1$ と $C_2$ で囲まれた図形の面積 $S$ の最大値を求める`,
          answer: String.raw`$243$（$a=1$ のとき）`,
          approach: String.raw`2次の係数が $2$ の差の積分なので、$\frac16$ 公式より $S=\dfrac{2(\beta-\alpha)^{3}}6=\dfrac{(\beta-\alpha)^{3}}3$ である。$(\beta-\alpha)^{2}=\dfrac D4$ なので、$\dfrac D4$ を最大にすればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`交点の $x$ 座標を $\alpha<\beta$ とすると`,
            },
            {
              k: "math",
              t: String.raw`3(x-a)^{2}+a^{3}-40-x^{2}=2(x-\alpha)(x-\beta)`,
            },
            { k: "p", t: String.raw`である。$\alpha\le x\le\beta$ では $C_1$ が上なので` },
            {
              k: "math",
              t: String.raw`S=\int_\alpha^\beta 2(x-\alpha)(\beta-x)\,dx=2\cdot\frac{(\beta-\alpha)^{3}}6=\frac{(\beta-\alpha)^{3}}3`,
            },
            { k: "p", t: String.raw`である（$\frac16$ 公式）。` },
            { k: "p", t: String.raw`**$(\beta-\alpha)^{2}$。** 解と係数の関係より` },
            {
              k: "math",
              t: String.raw`(\beta-\alpha)^{2}=(\alpha+\beta)^{2}-4\alpha\beta=(3a)^{2}-4\cdot\frac{3a^{2}+a^{3}-40}2=-2a^{3}+3a^{2}+80`,
            },
            {
              k: "p",
              t: String.raw`である（(1) の $\frac D4$ と同じ）。これを $g(a)$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`S=\frac{g(a)^{3/2}}3`,
            },
            {
              k: "p",
              t: String.raw`なので、$S$ が最大になるのは $g(a)$ が最大になるときである。`,
            },
            { k: "p", t: String.raw`**$g$ の最大。** ` },
            {
              k: "math",
              t: String.raw`g'(a)=-6a^{2}+6a=6a(1-a)`,
            },
            {
              k: "p",
              t: String.raw`なので、$0<a<1$ で増加、$1<a<4$ で減少。$a=1$ で最大で`,
            },
            {
              k: "math",
              t: String.raw`g(1)=-2+3+80=81`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`S=\frac{81^{3/2}}3=\frac{729}3=243`,
            },
            { k: "p", t: String.raw`が最大値である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a$ に対する面積 $S=\frac{\left(-2a^{3}+3a^{2}+80\right)^{3/2}}3$。$a=1$ で最大 $243$ をとり、$a\to4$ で $0$ に近づく（そこで2曲線が接する）。$a=0$ でも $S=\frac{80^{3/2}}3=238.4$ とすでに大きい。`,
                view: [-0.45, 4.45, -40, 300],
                step: { x: 1, y: 50 },
                items: [
                  { k: "curve", f: S20, from: 0, to: 4 },
                  { k: "dot", at: [1, 243], label: "(1, 243)", place: "above-right" },
                  { k: "dot", at: [4, 0], label: "4", place: "below" },
                  { k: "dot", at: [0, Math.pow(80, 1.5) / 3], label: "", place: "left" },
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=1$ のときの $C_1:y=x^{2}$ と $C_2:y=3(x-1)^{2}-39$。交点は $x=-3$ と $x=6$ で、囲まれる部分（塗った部分）の面積が $243$。`,
                view: [-6.5, 9.5, -45, 45],
                step: { x: 2, y: 10 },
                items: [
                  { k: "curve", f: P1_20, from: -6.3, to: 6.6 },
                  { k: "curve", f: P2_20, from: -2.7, to: 6.6 },
                  { k: "fillBetween", top: P1_20, bottom: P2_20, from: -3, to: 6 },
                  { k: "dot", at: [-3, 9], label: "(-3, 9)", place: "above-left" },
                  { k: "dot", at: [6, 36], label: "(6, 36)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\frac16$ 公式は「$x^{2}$ の係数 $\times\frac{(\beta-\alpha)^{3}}6$」である。ここでは係数が $2$ なので $\frac{(\beta-\alpha)^{3}}3$ になる。`,
            String.raw`$S$ を $a$ で直接微分すると根号が残って面倒である。$g(a)=(\beta-\alpha)^{2}$ を最大にすればよい、と言い換える。`,
            String.raw`$a=1$ は (1) の範囲 $0\le a<4$ の内部にある。端ではないので、増減表で最大と言い切れる。`,
          ],
          check: String.raw`$a$ を $40$ 万点に刻んで $S$ を計算すると、最大は $a=1$ での $243.0$ だった。$a=1$ のとき交点は $x=-3,6$ で、面積を数値積分しても $243.0$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間図形",
      topics: ["正四面体", "距離の条件", "対辺に平行な断面", "長方形の面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{O}(0,0,0)$、$\\mathrm{A}(1,1,0)$、$\\mathrm{B}(1,0,1)$、$\\mathrm{C}(0,1,1)$ の6辺がすべて $1.414213562=\\sqrt2$ であることを確かめた",
          "$z=t$ での断面の4頂点を線形補間で求めると、$t=0.25,0.5,0.75$ のいずれでも隣り合う辺の内積が $0$（長方形）で、面積が $2t(1-t)$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p,q,r,s$ の値を求める`,
          answer: String.raw`$p=1$、$q=0$、$r=1$、$s=1$`,
          approach: String.raw`$\mathrm{OA}=\sqrt2$ なので全部の辺が $\sqrt2$ である。$\left|\mathrm{OB}\right|$ から $p$ が、$\left|\mathrm{OC}\right|,\left|\mathrm{AC}\right|,\left|\mathrm{BC}\right|$ から $q,r,s$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OA}=\left|(1,1,0)\right|=\sqrt2$ なので、正四面体の1辺は $\sqrt2$ である。`,
            },
            { k: "p", t: String.raw`**$p$。** $\mathrm{OB}^{2}=1+0+p^{2}=2$ より $p^{2}=1$、$p>0$ だから` },
            { k: "math", t: String.raw`p=1,\qquad\mathrm{B}(1,0,1)` },
            {
              k: "p",
              t: String.raw`である（$\mathrm{AB}=\left|(0,-1,1)\right|=\sqrt2$ も確かに成り立つ）。`,
            },
            { k: "p", t: String.raw`**$q,r,s$。** $\mathrm{C}(q,r,s)$ について3本の式を立てる。` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\mathrm{OC}^{2}&=q^{2}+r^{2}+s^{2}=2&&\cdots\text{①}\\[1mm]
\mathrm{AC}^{2}&=(q-1)^{2}+(r-1)^{2}+s^{2}=2&&\cdots\text{②}\\[1mm]
\mathrm{BC}^{2}&=(q-1)^{2}+r^{2}+(s-1)^{2}=2&&\cdots\text{③}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`①$-$② を計算すると、$q^{2}-(q-1)^{2}=2q-1$、$r^{2}-(r-1)^{2}=2r-1$ より`,
            },
            {
              k: "math",
              t: String.raw`2q-1+2r-1=0\quad\Longleftrightarrow\quad q+r=1`,
            },
            { k: "p", t: String.raw`である。①$-$③ も同様に` },
            {
              k: "math",
              t: String.raw`2q-1+2s-1=0\quad\Longleftrightarrow\quad q+s=1`,
            },
            { k: "p", t: String.raw`となる。よって $r=s=1-q$ で、① に入れると` },
            {
              k: "math",
              t: String.raw`q^{2}+2(1-q)^{2}=2\quad\Longleftrightarrow\quad3q^{2}-4q=0\quad\Longleftrightarrow\quad q(3q-4)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$q=\dfrac43$ だと $s=1-\dfrac43=-\dfrac13<0$ となり $s>0$ に反する。よって $q=0$、$r=s=1$ で`,
            },
            { k: "math", t: String.raw`p=1,\quad q=0,\quad r=1,\quad s=1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{O}(0,0,0)$、$\mathrm{A}(1,1,0)$、$\mathrm{B}(1,0,1)$、$\mathrm{C}(0,1,1)$ は、1辺 $1$ の立方体の8頂点から1つおきに選んだ4点である。正四面体がこう書けるのは有名な事実で、辺は立方体の面の対角線 $\sqrt2$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{OA}$ の長さから1辺が決まる。残りの辺も全部これに等しいとおく。`,
            String.raw`①$-$②、①$-$③ をとると2乗が消えて1次式になる。3本をまともに連立しない。`,
            String.raw`$s>0$ の条件で $q=\frac43$ を切る。$p>0$ も同じ役目である。`,
          ],
          check: String.raw`この4点の6辺をすべて計算すると、どれも $1.414213562=\sqrt2$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$z$ 軸に垂直な平面で正四面体 $\mathrm{OABC}$ を切ったときの断面積の最大値を求める`,
          answer: String.raw`$\dfrac12$`,
          approach: String.raw`$\mathrm{O},\mathrm{A}$ は $z=0$、$\mathrm{B},\mathrm{C}$ は $z=1$ にある。つまり辺 $\mathrm{OA}$ と辺 $\mathrm{BC}$（向かい合う2辺）がそれぞれ $z=0,1$ の平面に乗っている。この2辺に平行な平面で切るので、断面は長方形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O}(0,0,0)$、$\mathrm{A}(1,1,0)$ は $z=0$ に、$\mathrm{B}(1,0,1)$、$\mathrm{C}(0,1,1)$ は $z=1$ にある。つまり向かい合う2辺 $\mathrm{OA}$、$\mathrm{BC}$ がそれぞれ底と天井にある。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}=(1,1,0),\qquad\overrightarrow{\mathrm{BC}}=(-1,1,0)`,
            },
            {
              k: "p",
              t: String.raw`で、内積は $-1+1+0=0$ だから $\mathrm{OA}\perp\mathrm{BC}$ である。`,
            },
            {
              k: "p",
              t: String.raw`**断面の形。** $z=t$（$0<t<1$）で切ると、断面の4頂点は辺 $\mathrm{OB},\mathrm{OC},\mathrm{AC},\mathrm{AB}$ 上の点で、たとえば $\mathrm{OB}$ 上の点は $t\,\overrightarrow{\mathrm{OB}}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{OB}$ 上と $\mathrm{AB}$ 上を結ぶ辺は $\overrightarrow{\mathrm{OA}}$ に平行で、長さは $(1-t)\left|\overrightarrow{\mathrm{OA}}\right|=(1-t)\sqrt2$`,
                String.raw`$\mathrm{OB}$ 上と $\mathrm{OC}$ 上を結ぶ辺は $\overrightarrow{\mathrm{BC}}$ に平行で、長さは $t\left|\overrightarrow{\mathrm{BC}}\right|=t\sqrt2$`,
              ],
            },
            {
              k: "p",
              t: String.raw`隣り合う2辺が $\overrightarrow{\mathrm{OA}}$ と $\overrightarrow{\mathrm{BC}}$ に平行で、この2つは垂直だから、断面は**長方形**である。面積は`,
            },
            {
              k: "math",
              t: String.raw`S(t)=(1-t)\sqrt2\cdot t\sqrt2=2t(1-t)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**最大。** $2t(1-t)=-2\left(t-\dfrac12\right)^{2}+\dfrac12$ なので、$t=\dfrac12$ で最大値`,
            },
            { k: "math", t: String.raw`S\!\left(\frac12\right)=\frac12` },
            {
              k: "p",
              t: String.raw`をとる。このとき断面は1辺 $\dfrac{\sqrt2}2$ の正方形である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`高さ $t$ での断面積 $S(t)=2t(1-t)$。$t=\frac12$（2本の対辺のちょうど中間）で最大 $\frac12$ をとり、そこでは断面が1辺 $\frac{\sqrt2}2$ の正方形になる。`,
                view: [-0.15, 1.15, -0.08, 0.62],
                step: { x: 0.25, y: 0.1 },
                items: [
                  { k: "curve", f: A20, from: 0, to: 1 },
                  { k: "dot", at: [0.5, 0.5], label: "(1/2, 1/2)", place: "above" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "1", place: "below" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`1辺 $a$ の正四面体では、向かい合う2辺に平行な断面の最大は1辺 $\dfrac a2$ の正方形で、面積 $\dfrac{a^{2}}4$ である。ここでは $a=\sqrt2$ なので $\dfrac24=\dfrac12$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{OA}$ と $\mathrm{BC}$ が向かい合う辺で、しかも $z$ 軸に垂直な平面に乗っていることに気づく。これで断面が長方形だと分かる。`,
            String.raw`断面の辺の長さは $t$ と $1-t$ の両方が出る。片方だけにしない。`,
            String.raw`$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{BC}}=0$ を確かめる。垂直でなければ平行四辺形で、面積に $\sin$ が入る。`,
          ],
          check: String.raw`$t=0.25,0.5,0.75$ で断面の4頂点を線形補間して求めると、隣り合う辺の内積はいずれも $0$（長方形）で、面積は $0.375,0.5,0.375$ と $2t(1-t)$ に一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "整式",
      topics: ["1 の原始6乗根", "因数分解", "合同式", "中国剰余定理"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=c-1$、$b=1-c$ とすると $f\\!\\left(\\frac{1+\\sqrt3\\,i}2\\right)=0$ になることを確かめた",
          "$\\left|c\\right|\\le40$ の整数で $f(1)\\equiv4\\pmod7$ かつ $f(-1)\\equiv2\\pmod{11}$ をみたすのは $c=31$ だけだった",
          "$c=31$ のとき $f(1)=32$（$7$ で割って $4$）、$f(-1)=90$（$11$ で割って $2$）、$f(-31)=0$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b$ を $c$ を用いて表す`,
          answer: String.raw`$a=c-1$、$b=1-c$`,
          approach: String.raw`$\dfrac{1+\sqrt3\,i}2$ は $x^{2}-x+1=0$ の解である。係数が実数なので $f(x)$ は $x^{2}-x+1$ で割り切れ、商は1次式 $x+m$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\omega=\dfrac{1+\sqrt3\,i}2$ は $x^{2}-x+1=0$ の解である（和 $1$、積 $1$ の2解の一方）。$f$ の係数は実数なので共役 $\bar\omega$ も解であり、$f(x)$ は $x^{2}-x+1$ で割り切れる。$f$ は3次だから商は1次で`,
            },
            {
              k: "math",
              t: String.raw`f(x)=\left(x^{2}-x+1\right)(x+m)`,
            },
            { k: "p", t: String.raw`と書ける。展開すると` },
            {
              k: "math",
              t: String.raw`x^{3}+(m-1)x^{2}+(1-m)x+m`,
            },
            { k: "p", t: String.raw`なので、係数を比べて` },
            {
              k: "math",
              t: String.raw`a=m-1,\qquad b=1-m,\qquad c=m`,
            },
            { k: "p", t: String.raw`である。$m=c$ を入れて` },
            { k: "math", t: String.raw`a=c-1,\qquad b=1-c` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a+b=0$ になっている。$f(x)=\left(x^{2}-x+1\right)(x+c)$ という形からすぐ読み取れる。`,
            },
          ],
          pitfalls: [
            String.raw`$\omega$ の最小多項式は $x^{2}-x+1$（1の原始**6**乗根）である。$x^{2}+x+1$（原始3乗根）と取り違えない。`,
            String.raw`商は1次式。最高次の係数が $1$ なので $x+m$ とおける。`,
          ],
          check: String.raw`$a=c-1$、$b=1-c$ とすると、$c$ を何にとっても $f(\omega)=0$ になることを数値で確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(1)$ を $7$ で割ると $4$、$f(-1)$ を $11$ で割ると $2$ 余るとする。$\left|c\right|\le40$ のとき $f(x)=0$ の解をすべて求める`,
          answer: String.raw`$x=\dfrac{1\pm\sqrt3\,i}2,\qquad x=-31$`,
          approach: String.raw`(1) を使うと $f(1)$ も $f(-1)$ も $c$ だけの式になる。2つの合同式を中国剰余定理でまとめれば、$c$ は法 $77$ で1つに決まる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $a=c-1$、$b=1-c$ なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(1)&=1+a+b+c=1+(c-1)+(1-c)+c=c+1\\[1mm]
f(-1)&=-1+a-b+c=-1+(c-1)-(1-c)+c=3c-3
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**条件を書く。** ` },
            {
              k: "math",
              t: String.raw`c+1\equiv4\pmod7,\qquad3c-3\equiv2\pmod{11}`,
            },
            {
              k: "p",
              t: String.raw`1本目から $c\equiv3\pmod7$。2本目は $3c\equiv5\pmod{11}$ で、$3\cdot4=12\equiv1$ より両辺を $4$ 倍して $c\equiv20\equiv9\pmod{11}$。`,
            },
            {
              k: "p",
              t: String.raw`$c=3+7k$ とおくと $3+7k\equiv9\pmod{11}$、$7k\equiv6$。$7\cdot8=56\equiv1\pmod{11}$ より $k\equiv48\equiv4\pmod{11}$。$k=4$ で $c=31$ だから`,
            },
            { k: "math", t: String.raw`c\equiv31\pmod{77}` },
            {
              k: "p",
              t: String.raw`である。$\left|c\right|\le40$ をみたすのは $c=31$ だけ（次は $31-77=-46$ で範囲外）。`,
            },
            { k: "p", t: String.raw`**解を求める。** $c=31$ なら` },
            {
              k: "math",
              t: String.raw`f(x)=\left(x^{2}-x+1\right)(x+31)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`x=\frac{1\pm\sqrt3\,i}2,\qquad x=-31`,
            },
            {
              k: "p",
              t: String.raw`の3つが解である（$a=30$、$b=-30$）。`,
            },
          ],
          pitfalls: [
            String.raw`$f(1)$ は法 $7$、$f(-1)$ は法 $11$ と、法が違う。片方ずつ解いてから中国剰余定理でまとめる。`,
            String.raw`$3c\equiv5\pmod{11}$ は「$3$ で割る」のではなく「逆元 $4$ を掛ける」。`,
            String.raw`実数解 $x=-31$ も忘れずに書く。虚数解だけでは答えにならない。`,
          ],
          check: String.raw`$\left|c\right|\le40$ を全探索すると条件をみたすのは $c=31$ だけで、$f(1)=32=7\cdot4+4$、$f(-1)=90=11\cdot8+2$、$f(-31)=0$ と条件どおりだった。`,
        },
      ],
    },
    sharedSaikoro,
  ],
};
