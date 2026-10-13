import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2023年度（令和5年度）一般選抜 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。被積分関数と、上下からの評価。 */
const F1T = (x: number): number => 2 / (x + Math.exp(x));
const UP1T = (x: number): number => 2 * Math.exp(-x);
const LO1T = (x: number): number => Math.exp(-x) + Math.exp(-2 * x) / 2;

/** 第4問の図。断面の円と、取り除く正方形・ひし形。 */
const R2 = 2;
const SQ2 = Math.SQRT2;

export const kagakudai2023: SolutionSet = {
  slug: "kagakudai",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["定積分の評価", "不等式ではさむ", "整数部分", "指数関数の比較"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\displaystyle\\int_{0}^{40}\\frac{2}{x+e^{x}}dx=1.612791232$（$x>40$ の寄与は $10^{-17}$ 未満）だった",
          "$x\\geqq0$ のすべての格子点で $e^{-x}+\\tfrac12e^{-2x}\\leqq\\dfrac{2}{x+e^{x}}$、$x>0$ で $\\dfrac{2}{x+e^{x}}\\leqq2e^{-x}$ が成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`実数 $\displaystyle\int_{0}^{2023}\frac{2}{x+e^{x}}dx$ の整数部分を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`積分を計算することはできないので、上と下からはさむ。上は $x>0$ を捨てて $2e^{-x}$、下は $x\leqq e^{x}-1$ を使って $e^{-x}+\dfrac12e^{-2x}$ で押さえる。`,
          blocks: [
            { k: "p", t: String.raw`$I=\displaystyle\int_{0}^{2023}\frac{2}{x+e^{x}}dx$ とおく。` },
            {
              k: "p",
              t: String.raw`**上からの評価。** $0<x\leqq2023$ では $x+e^{x}>e^{x}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{2}{x+e^{x}}<2e^{-x}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`I<\int_{0}^{2023}2e^{-x}dx=2\left(1-e^{-2023}\right)<2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**下からの評価。** $e^{x}\geqq1+x$（$x\geqq0$）より $x\leqq e^{x}-1$ なので`,
            },
            {
              k: "math",
              t: String.raw`x+e^{x}\leqq2e^{x}-1,\qquad\frac{2}{x+e^{x}}\geqq\frac{2}{2e^{x}-1}`,
            },
            { k: "p", t: String.raw`である。ここで $u=e^{-x}$（$0<u\leqq1$）とおくと` },
            {
              k: "math",
              t: String.raw`\frac{2}{2e^{x}-1}=\frac{2u}{2-u}`,
            },
            { k: "p", t: String.raw`であり、$2-u>0$ に注意して` },
            {
              k: "math",
              t: String.raw`\frac{2u}{2-u}-\left(u+\frac{u^{2}}{2}\right)=\frac{2u-u\left(2-u\right)-\frac{u^{2}}{2}\left(2-u\right)}{2-u}=\frac{\frac{u^{3}}{2}}{2-u}>0`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\frac{2}{x+e^{x}}>e^{-x}+\frac12e^{-2x}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`I>\int_{0}^{2023}\left(e^{-x}+\frac12e^{-2x}\right)dx=\left(1-e^{-2023}\right)+\frac14\left(1-e^{-4046}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。右辺は $\dfrac54-\left(e^{-2023}+\dfrac14e^{-4046}\right)$ である。$e>2$ より $e^{2023}>2^{2023}>16$ なので`,
            },
            {
              k: "math",
              t: String.raw`e^{-2023}<\frac{1}{16},\qquad e^{-4046}<\frac{1}{16}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`e^{-2023}+\frac14e^{-4046}<\frac{1}{16}+\frac{1}{64}=\frac{5}{64}<\frac14`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`I>\frac54-\frac14=1`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`以上より` },
            { k: "math", t: String.raw`1<I<2` },
            { k: "p", t: String.raw`なので、$I$ の整数部分は $1$ である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "太い実線が 2/(x + eˣ)、上の破線が 2e⁻ˣ、下の細い破線が e⁻ˣ + e⁻²ˣ/2。太い線は上下の破線にはさまれていて、上の破線の面積は 2、下の破線の面積は 5/4 になる。",
                view: [-0.2, 5.2, -0.2, 2.3],
                step: { x: 1, y: 0.5 },
                items: [
                  { k: "curve", f: UP1T, from: 0, to: 5.2, dash: true },
                  { k: "curve", f: LO1T, from: 0, to: 5.2, dash: true, faint: true },
                  { k: "curve", f: F1T, from: 0, to: 5.2 },
                  { k: "dot", at: [0, 2] },
                  { k: "dot", at: [0, 1.5] },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`実際に数値計算すると $I=1.6127\cdots$ である。上の評価 $2$ と下の評価 $\dfrac54$ のあいだにきちんと入っている。`,
            },
          ],
          pitfalls: [
            String.raw`上からの評価だけでは $I<2$ しか言えず、整数部分が $0$ か $1$ か決まらない。下からも $1$ を超えることを示す必要がある。`,
            String.raw`$x\leqq e^{x}-1$ から $x+e^{x}\leqq2e^{x}-1$。この「$-1$」を残すのが効く（$2e^{x}$ だけで押さえると $I>1-e^{-2023}$ にしかならず、$1$ に届かない）。`,
          ],
          check: String.raw`数値積分すると $I=1.612791232$ で、$\dfrac54<I<2$ を満たしていた。`,
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["連続3整数の積", "約数の絞り込み", "3次方程式の整数解", "すべて求める"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$-200\\leqq x\\leqq200$ で $\\left(x^{3}-x\\right)^{2}$ が $86400$ を割り切るものを探し、商が $y^{3}-y$ になる $y$ を調べたところ、解は $\\left(-5,2\\right),\\left(-4,3\\right),\\left(4,3\\right),\\left(5,2\\right)$ の4組だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`方程式 $\left(x^{3}-x\right)^{2}\left(y^{3}-y\right)=86400$ を満たす整数の組 $\left(x,y\right)$ をすべて求める`,
          answer: String.raw`$\left(x,y\right)=\left(4,3\right),\left(-4,3\right),\left(5,2\right),\left(-5,2\right)$ の4組`,
          approach: String.raw`$A=x^{3}-x$ とおくと $A^{2}$ は $86400$ の約数である。$A^{2}$ が平方数であることから $\left|A\right|$ の候補が一気に絞られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$A=x^{3}-x=\left(x-1\right)x\left(x+1\right)$、$B=y^{3}-y$ とおくと $A^{2}B=86400$ である。`,
            },
            { k: "p", t: String.raw`**素因数分解。**` },
            {
              k: "math",
              t: String.raw`86400=2^{7}\cdot3^{3}\cdot5^{2}`,
            },
            { k: "p", t: String.raw`である（$128\cdot27\cdot25=86400$）。` },
            {
              k: "p",
              t: String.raw`**$\left|A\right|$ を絞る。** $A^{2}$ は $86400$ の約数で、しかも平方数である。$A^{2}=2^{2\alpha}3^{2\beta}5^{2\gamma}$ と書くと $2\alpha\leqq7$、$2\beta\leqq3$、$2\gamma\leqq2$ より $\alpha\leqq3$、$\beta\leqq1$、$\gamma\leqq1$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\left|A\right|\ \text{は}\ 2^{3}\cdot3\cdot5=120\ \text{の約数}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`一方、$A$ は連続3整数の積なので、$x=0,\pm1$ のとき $A=0$（このとき左辺が $0$ になり不適）、それ以外では`,
            },
            {
              k: "math",
              t: String.raw`\left|A\right|=6,\ 24,\ 60,\ 120,\ 210,\ 336,\ \ldots\qquad\left(x=\pm2,\pm3,\pm4,\pm5,\pm6,\pm7,\ldots\right)`,
            },
            {
              k: "p",
              t: String.raw`であり、$\left|A\right|$ は $x$ の絶対値とともに増える。$120$ の約数になるのは $6,24,60,120$ の4つだけである（$210$ 以降は $120$ より大きい）。`,
            },
            { k: "p", t: String.raw`**それぞれ調べる。** $B=\dfrac{86400}{A^{2}}$ が $y^{3}-y$ の形になるかを見る。` },
            {
              k: "steps",
              items: [
                String.raw`$\left|A\right|=6$（$x=\pm2$）：$B=\dfrac{86400}{36}=2400$。$13^{3}-13=2184$、$14^{3}-14=2730$ で $2400$ にはならない。不適`,
                String.raw`$\left|A\right|=24$（$x=\pm3$）：$B=\dfrac{86400}{576}=150$。$5^{3}-5=120$、$6^{3}-6=210$ で $150$ にはならない。不適`,
                String.raw`$\left|A\right|=60$（$x=\pm4$）：$B=\dfrac{86400}{3600}=24$。$y^{3}-y=24$ は $\left(y-3\right)\left(y^{2}+3y+8\right)=0$ で、$y^{2}+3y+8$ の判別式は $9-32<0$ だから $y=3$ のみ。**適する**`,
                String.raw`$\left|A\right|=120$（$x=\pm5$）：$B=\dfrac{86400}{14400}=6$。$y^{3}-y=6$ は $\left(y-2\right)\left(y^{2}+2y+3\right)=0$ で、$y^{2}+2y+3$ の判別式は $4-12<0$ だから $y=2$ のみ。**適する**`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$A$ は2乗されているので符号は関係なく、$x$ は $\pm$ の両方が使える。よって`,
            },
            {
              k: "math",
              t: String.raw`\left(x,y\right)=\left(4,3\right),\ \left(-4,3\right),\ \left(5,2\right),\ \left(-5,2\right)`,
            },
            { k: "p", t: String.raw`の4組である。` },
            {
              k: "note",
              t: String.raw`$x^{3}-x$ も $y^{3}-y$ も連続3整数の積なので $6$ の倍数である。$A=6a$、$B=6b$ とおくと $216a^{2}b=86400$、すなわち $a^{2}b=400$ となり、ここから攻めてもよい。`,
            },
          ],
          pitfalls: [
            String.raw`「$A^{2}$ が $86400$ の約数」から $\left|A\right|\leqq\sqrt{86400}=293\cdots$ とだけ絞ると候補が多い。平方数であることを使って指数を半分にするのが近道。`,
            String.raw`$y^{3}-y=B$ の解がただ1つであることは、因数分解して残りの2次式の判別式を見れば分かる。`,
          ],
          check: String.raw`$-200\leqq x\leqq200$ の全探索でも、この4組だけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "複素数平面・確率",
      topics: ["偏角と絶対値", "多項分布の数え上げ", "余りで分類する漸化式", "対称性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "6通りの複素数は $i,\\sqrt3i,1,1+\\sqrt3i,\\sqrt3,\\sqrt3+i$ で、絶対値は $1,\\sqrt3,1,2,\\sqrt3,2$、偏角は $90^{\\circ},90^{\\circ},0^{\\circ},60^{\\circ},0^{\\circ},30^{\\circ}$ だった",
          "$n=1,\\ldots,5$ で $6^{n}$ 通りを全列挙すると $P_{n}=1,1,\\tfrac{19}{27},\\tfrac{11}{27},\\tfrac{17}{81}$ で $\\dfrac{2n^{2}+1}{3^{n}}$ と一致した",
          "同じ全列挙で $Q_{n}=\\tfrac23,\\tfrac12,\\tfrac5{12},\\tfrac38,\\tfrac{17}{48}$ で $\\dfrac13\\left(1+\\dfrac1{2^{n-1}}\\right)$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数が書かれた3枚のカード $0$、$1$、$\sqrt3$ から無作為に2枚のカードを順に選び、出た実数を順に実部と虚部にもつ複素数を得る操作を考える。正の整数 $n$ に対して、この操作を $n$ 回繰り返して得られる $n$ 個の複素数の積を $z_{n}$ とするとき、$\left|z_{n}\right|<5$ となる確率 $P_{n}$ を求める`,
          answer: String.raw`$P_{n}=\dfrac{2n^{2}+1}{3^{n}}$`,
          approach: String.raw`6通りの複素数の絶対値は $1,\sqrt3,2$ が2通りずつ。$\left|z_{n}\right|$ は積なので、$\sqrt3$ と $2$ が何回出たかだけで決まる。条件を満たす回数の組は少ない。`,
          blocks: [
            { k: "p", t: String.raw`**6通りを書き出す。** 実部と虚部の順で選ぶので、得られる複素数と絶対値・偏角は` },
            {
              k: "steps",
              items: [
                String.raw`$0+1i=i$：$\left|\cdot\right|=1$、偏角 $90^{\circ}$`,
                String.raw`$0+\sqrt3i$：$\left|\cdot\right|=\sqrt3$、偏角 $90^{\circ}$`,
                String.raw`$1+0i=1$：$\left|\cdot\right|=1$、偏角 $0^{\circ}$`,
                String.raw`$1+\sqrt3i$：$\left|\cdot\right|=2$、偏角 $60^{\circ}$`,
                String.raw`$\sqrt3+0i=\sqrt3$：$\left|\cdot\right|=\sqrt3$、偏角 $0^{\circ}$`,
                String.raw`$\sqrt3+i$：$\left|\cdot\right|=2$、偏角 $30^{\circ}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`の6通りで、どれも確率 $\dfrac16$ である。絶対値は $1,\sqrt3,2$ がそれぞれ2通りずつなので、1回の操作で絶対値が $1,\sqrt3,2$ になる確率はどれも $\dfrac13$ である。`,
            },
            {
              k: "p",
              t: String.raw`**条件を言いかえる。** $n$ 回のうち絶対値が $\sqrt3$ だった回数を $b$、$2$ だった回数を $c$ とすると`,
            },
            {
              k: "math",
              t: String.raw`\left|z_{n}\right|=\left(\sqrt3\right)^{b}\cdot2^{c}`,
            },
            { k: "p", t: String.raw`である。$\left|z_{n}\right|<5$ となる $\left(b,c\right)$ を調べると` },
            {
              k: "steps",
              items: [
                String.raw`$\left(0,0\right)$：$1$、$\left(1,0\right)$：$\sqrt3=1.73$、$\left(2,0\right)$：$3$ ✓`,
                String.raw`$\left(0,1\right)$：$2$、$\left(1,1\right)$：$2\sqrt3=3.46$、$\left(0,2\right)$：$4$ ✓`,
                String.raw`$\left(3,0\right)$：$3\sqrt3=5.19$、$\left(2,1\right)$：$6$、$\left(1,2\right)$：$4\sqrt3=6.93$、$\left(0,3\right)$：$8$ ✗`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$b,c$ をこれ以上増やすと $\left|z_{n}\right|$ はさらに大きくなるので、条件を満たすのは上の6通りの $\left(b,c\right)$ だけである。`,
            },
            {
              k: "p",
              t: String.raw`**数える。** 絶対値が $1,\sqrt3,2$ になる回がどの順で現れるかを考える。$n$ 回のうち「$\sqrt3$ の回」を $b$ 個、「$2$ の回」を $c$ 個選ぶ場合の数を足し合わせればよい。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left(0,0\right)$：$1$ 通り`,
                String.raw`$\left(1,0\right)$、$\left(0,1\right)$：それぞれ $n$ 通り`,
                String.raw`$\left(2,0\right)$、$\left(0,2\right)$：それぞれ $ {}_{n}\mathrm{C}_{2}=\dfrac{n\left(n-1\right)}{2}$ 通り`,
                String.raw`$\left(1,1\right)$：$\sqrt3$ の回と $2$ の回を別々に選ぶので $n\left(n-1\right)$ 通り`,
              ],
            },
            { k: "p", t: String.raw`である。合計すると` },
            {
              k: "math",
              t: String.raw`1+2n+2\cdot\frac{n\left(n-1\right)}{2}+n\left(n-1\right)=1+2n+2n\left(n-1\right)=2n^{2}+1`,
            },
            {
              k: "p",
              t: String.raw`通りである。どの場合も確率は $\left(\dfrac13\right)^{n}$ なので`,
            },
            {
              k: "math",
              t: String.raw`P_{n}=\frac{2n^{2}+1}{3^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,2$ では $2n^{2}+1=3,9$ で $P_{1}=P_{2}=1$ になる。実際 $n=2$ までは $\left|z_{n}\right|\leqq4<5$ なので、必ず条件を満たす。`,
            },
          ],
          pitfalls: [
            String.raw`絶対値だけを見ればよい。どの複素数が出たかまで区別すると数え方が複雑になるが、絶対値ごとにまとめれば確率は $\dfrac13$ ずつになる。`,
            String.raw`$\left(b,c\right)=\left(1,1\right)$ は「2か所を選んでどちらが $\sqrt3$ か決める」ので $n\left(n-1\right)$ 通り。$ {}_{n}\mathrm{C}_{2}$ ではない。`,
          ],
          check: String.raw`$n=1,\ldots,5$ で $6^{n}$ 通りを全列挙すると、$1,1,\tfrac{19}{27},\tfrac{11}{27},\tfrac{17}{81}$ でこの式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$z_{n}^{2}$ が実数となる確率 $Q_{n}$ を求める`,
          answer: String.raw`$Q_{n}=\dfrac13\left(1+\dfrac{1}{2^{n-1}}\right)$`,
          approach: String.raw`$z^{2}$ が実数 $\iff$ $z$ の偏角が $90^{\circ}$ の倍数。偏角は $30^{\circ}$ の倍数なので、$30^{\circ}$ を単位にして「$3$ で割った余り」を追えばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z_{n}\neq0$ である（6通りのどれも $0$ ではない）。$z_{n}^{2}$ が実数になるのは $z_{n}^{2}$ の偏角が $180^{\circ}$ の倍数のとき、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\arg z_{n}\ \text{が}\ 90^{\circ}\ \text{の倍数}`,
            },
            {
              k: "p",
              t: String.raw`のときである。(1) の表より、1回の操作で得られる偏角は $30^{\circ}$ の倍数で、$30^{\circ}$ を単位にすると`,
            },
            {
              k: "math",
              t: String.raw`3,\ 3,\ 0,\ 2,\ 0,\ 1\qquad\left(\text{それぞれ確率}\ \tfrac16\right)`,
            },
            {
              k: "p",
              t: String.raw`である。積の偏角は和になるので、$n$ 回ぶんの合計 $S$（$30^{\circ}$ 単位）が $3$ の倍数であればよい。`,
            },
            { k: "p", t: String.raw`**$3$ で割った余り。** 上の6つを $3$ で割った余りで分けると` },
            {
              k: "steps",
              items: [
                String.raw`余り $0$：$3,3,0,0$ の4通り、確率 $\dfrac46=\dfrac23$`,
                String.raw`余り $1$：$1$ の1通り、確率 $\dfrac16$`,
                String.raw`余り $2$：$2$ の1通り、確率 $\dfrac16$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$n$ 回後に $S$ を $3$ で割った余りが $0,1,2$ である確率を $q_{n},r_{n},s_{n}$ とする。余り $1$ と余り $2$ が出る確率が等しいので、対称性から $r_{n}=s_{n}$ であり`,
            },
            {
              k: "math",
              t: String.raw`q_{n}+2r_{n}=1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**漸化式。** 余りが $0$ になるのは「$0$ から $0$ を足す」「$1$ から $2$ を足す」「$2$ から $1$ を足す」の3通りなので`,
            },
            {
              k: "math",
              t: String.raw`q_{n+1}=\frac23q_{n}+\frac16 r_{n}+\frac16 s_{n}=\frac23q_{n}+\frac16\left(1-q_{n}\right)=\frac12q_{n}+\frac16`,
            },
            { k: "p", t: String.raw`である。$q=\dfrac12q+\dfrac16$ を解くと $q=\dfrac13$ なので` },
            {
              k: "math",
              t: String.raw`q_{n+1}-\frac13=\frac12\left(q_{n}-\frac13\right)`,
            },
            { k: "p", t: String.raw`である。$q_{1}=\dfrac23$（余り $0$ になるのは4通り）なので $q_{1}-\dfrac13=\dfrac13$ で` },
            {
              k: "math",
              t: String.raw`q_{n}-\frac13=\frac13\left(\frac12\right)^{n-1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`Q_{n}=q_{n}=\frac13\left(1+\frac{1}{2^{n-1}}\right)=\frac{2^{n-1}+1}{3\cdot2^{n-1}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n\to\infty$ で $Q_{n}\to\dfrac13$ である。偏角の余りが $0,1,2$ のどれになるかが、だんだん均等に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$z^{2}$ が実数なのは「$z$ が実数」だけでなく「$z$ が純虚数」でもよい。偏角が $90^{\circ}$ の倍数、とまとめる。`,
            String.raw`$30^{\circ}$ を単位にすると、$90^{\circ}$ の倍数は「$3$ の倍数」になる。余りで分類する定石に持ちこめる。`,
          ],
          check: String.raw`$n=1,\ldots,5$ の全列挙で $\tfrac23,\tfrac12,\tfrac5{12},\tfrac38,\tfrac{17}{48}$ となり、この式と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["立体の共通部分", "断面積の積分", "回転による変換", "円と正方形"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$A=\\left\\{y^{2}+z^{2}\\leqq4\\right\\}\\setminus\\left\\{\\left|y\\right|<1,\\left|z\\right|<1\\right\\}$、$B=\\left\\{x^{2}+z^{2}\\leqq4\\right\\}\\setminus\\left\\{\\left|x\\right|+\\left|z\\right|<\\sqrt2\\right\\}$ として、$\\left[-2,2\\right]^{3}$ で300万点のモンテカルロを打つと体積は $19.3615$ だった",
          "断面積 $L_{A}(t)L_{B}(t)$ を数値積分すると $19.380247$ で、求めた式 $60-\\tfrac{16\\sqrt2}3-4\\sqrt3-\\tfrac{8\\pi}3-4\\sqrt2\\pi=19.380212$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$xyz$ 空間において、$x$ 軸を軸とする半径 $2$ の円柱から $\left|y\right|<1$ かつ $\left|z\right|<1$ で表される角柱の内部を取り除いたものを $A$ とする。$A$ を $x$ 軸のまわりに $45^{\circ}$ 回転してから $z$ 軸のまわりに $90^{\circ}$ 回転したものを $B$ とする。$A$ と $B$ の共通部分の体積を求める`,
          answer: String.raw`$60-4\sqrt3-\dfrac{16\sqrt2}{3}-\dfrac{8\pi}{3}-4\sqrt2\,\pi$`,
          approach: String.raw`$A$ は $x$ 方向に無限に伸びた柱で、断面（$yz$ 平面）は「円から正方形を抜いたもの」。$B$ も同様に $y$ 方向の柱になる。$z=t$ で切ると、$A$ は $y$ だけ、$B$ は $x$ だけを制限するので、断面積は2つの長さの積になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$A$ と $B$ を式で書く。** $A$ は $x$ によらないので`,
            },
            {
              k: "math",
              t: String.raw`A=\left\{\left(x,y,z\right)\ \middle|\ y^{2}+z^{2}\leqq4,\ \left|y\right|\geqq1\ \text{または}\ \left|z\right|\geqq1\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "A の断面（yz 平面）。半径 2 の円から、1辺 2 の正方形の内部を取り除いたもの。x 方向にはどこまでも同じ形が続く。",
                view: [-2.8, 2.8, -2.4, 2.4],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [R2 * Math.cos(t), R2 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [-1, -1], b: [1, -1], dash: true },
                  { k: "seg", a: [1, -1], b: [1, 1], dash: true },
                  { k: "seg", a: [1, 1], b: [-1, 1], dash: true },
                  { k: "seg", a: [-1, 1], b: [-1, -1], dash: true },
                  { k: "text", at: [0, 0], label: "取り除く", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**$x$ 軸まわりに $45^{\circ}$ 回す。** 円は回しても変わらず、正方形 $\left|y\right|<1$ かつ $\left|z\right|<1$ は、頂点が $\left(\pm\sqrt2,0\right),\left(0,\pm\sqrt2\right)$ のひし形 $\left|y\right|+\left|z\right|<\sqrt2$ に移る。つまり`,
            },
            {
              k: "math",
              t: String.raw`A'=\left\{y^{2}+z^{2}\leqq4,\ \left|y\right|+\left|z\right|\geqq\sqrt2\right\}`,
            },
            { k: "p", t: String.raw`である（やはり $x$ 方向に無限に伸びた柱）。` },
            {
              k: "p",
              t: String.raw`**$z$ 軸まわりに $90^{\circ}$ 回す。** この回転は $\left(x,y,z\right)\mapsto\left(-y,x,z\right)$ である。$A'$ の点 $\left(x,y,z\right)$ が移った先を $\left(X,Y,Z\right)$ とすると $y=-X$、$x=Y$、$z=Z$ なので、$A'$ の条件は`,
            },
            {
              k: "math",
              t: String.raw`B=\left\{\left(X,Y,Z\right)\ \middle|\ X^{2}+Z^{2}\leqq4,\ \left|X\right|+\left|Z\right|\geqq\sqrt2\right\}`,
            },
            { k: "p", t: String.raw`となる。今度は $Y$ 方向に無限に伸びた柱である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "B の断面（xz 平面）。半径 2 の円から、対角線の長さが 2√2 のひし形の内部を取り除いたもの。y 方向にはどこまでも同じ形が続く。",
                view: [-2.8, 2.8, -2.4, 2.4],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [R2 * Math.cos(t), R2 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [SQ2, 0], b: [0, SQ2], dash: true },
                  { k: "seg", a: [0, SQ2], b: [-SQ2, 0], dash: true },
                  { k: "seg", a: [-SQ2, 0], b: [0, -SQ2], dash: true },
                  { k: "seg", a: [0, -SQ2], b: [SQ2, 0], dash: true },
                  { k: "text", at: [0, 0], label: "取り除く", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**$z=t$ で切る。** $r=\sqrt{4-t^{2}}$ とおく（$\left|t\right|\leqq2$）。この平面で$A$ は $y$ だけを、$B$ は $x$ だけを制限するので、共通部分の断面は長方形の集まりになり、その面積は`,
            },
            {
              k: "math",
              t: String.raw`S(t)=L_{A}(t)\cdot L_{B}(t)`,
            },
            {
              k: "p",
              t: String.raw`である。ここで $L_{A}(t)$ は許される $y$ の長さ、$L_{B}(t)$ は許される $x$ の長さである。どちらも $t$ の偶関数なので、$0\leqq t\leqq2$ で考える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$L_{A}(t)$：$t\geqq1$ なら制限なしで $2r$。$0\leqq t<1$ なら $1\leqq\left|y\right|\leqq r$ で $2\left(r-1\right)$`,
                String.raw`$L_{B}(t)$：$t\geqq\sqrt2$ なら $2r$。$0\leqq t<\sqrt2$ なら $\sqrt2-t\leqq\left|x\right|\leqq r$ で $2\left(r-\sqrt2+t\right)$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって体積は` },
            {
              k: "math",
              t: String.raw`V=2\int_{0}^{2}L_{A}L_{B}\,dt=8\left\{\int_{0}^{1}\left(r-1\right)\left(r-\sqrt2+t\right)dt+\int_{1}^{\sqrt2}r\left(r-\sqrt2+t\right)dt+\int_{\sqrt2}^{2}r^{2}dt\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**必要な積分。** $F(t)=\dfrac t2\sqrt{4-t^{2}}+2\arcsin\dfrac t2$ とおくと $F'(t)=\sqrt{4-t^{2}}$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$\displaystyle\int_{0}^{1}r\,dt=F(1)=\frac{\sqrt3}{2}+\frac{\pi}{3}$、$\displaystyle\int_{1}^{\sqrt2}r\,dt=F\left(\sqrt2\right)-F(1)=1+\frac{\pi}{2}-\frac{\sqrt3}{2}-\frac{\pi}{3}$`,
                String.raw`$\displaystyle\int t\,r\,dt=-\frac13\left(4-t^{2}\right)^{\frac32}$ より $\displaystyle\int_{0}^{1}tr\,dt=\frac{8-3\sqrt3}{3}$、$\displaystyle\int_{1}^{\sqrt2}tr\,dt=\frac{3\sqrt3-2\sqrt2}{3}$`,
                String.raw`$\displaystyle\int r^{2}dt=\int\left(4-t^{2}\right)dt=4t-\frac{t^{3}}{3}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。これらを使って3つの積分を計算し、$\sqrt2$、$\sqrt3$、$\sqrt6$、$\pi$、$\sqrt2\pi$、有理数の各項を整理すると、$\sqrt6$ の項は打ち消し合って`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}+\int_{1}^{\sqrt2}+\int_{\sqrt2}^{2}=\frac{15}{2}-\frac{2\sqrt2}{3}-\frac{\sqrt3}{2}-\frac{\pi}{3}-\frac{\sqrt2\,\pi}{2}`,
            },
            { k: "p", t: String.raw`となる。$8$ 倍して` },
            {
              k: "math",
              t: String.raw`V=60-4\sqrt3-\frac{16\sqrt2}{3}-\frac{8\pi}{3}-4\sqrt2\,\pi`,
            },
            { k: "p", t: String.raw`である。数値では $19.3802\cdots$ である。` },
            {
              k: "note",
              t: String.raw`$A$ は $x$ 方向、$B$ は $y$ 方向に伸びた柱なので、$z$ で切ると「$y$ の条件」と「$x$ の条件」に完全に分かれる。これがこの問題のいちばんの急所である。`,
            },
          ],
          pitfalls: [
            String.raw`$z$ 軸まわりの $90^{\circ}$ 回転で、柱の向きが $x$ 方向から $y$ 方向に変わる。回転前と同じ向きだと思うと共通部分がまったく違ってしまう。`,
            String.raw`$45^{\circ}$ 回転で正方形がひし形に変わる。円は変わらない。`,
            String.raw`$z=t$ の断面は「$x$ の区間」×「$y$ の区間」という長方形の集まり。面積は2つの長さの積になる。`,
          ],
          check: String.raw`モンテカルロ法で $19.3615$、断面積の数値積分で $19.380247$ となり、式の値 $19.380212$ と合った。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["点と直線の距離", "等距離の点の集合", "2平面に分かれる", "連立して解く"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "乱数で2000点をとり、$\\mathrm{AB}$ と $\\mathrm{BC}$ への距離が等しいことと $\\left(x-y\\right)\\left(x+y+2z-4\\right)=0$ が完全に一致した",
          "求めた8つの中心について、4直線への距離を計算するといずれも4つとも同じ値（$\\sqrt2$、$3\\sqrt2$、$\\sqrt6$）になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xyz$ 空間の4点 $\mathrm{A}(1,0,0)$、$\mathrm{B}(1,1,1)$、$\mathrm{C}(-1,1,-1)$、$\mathrm{D}(-1,0,0)$ を考える。2直線 $\mathrm{AB}$、$\mathrm{BC}$ から等距離にある点全体のなす図形を求める`,
          answer: String.raw`2平面 $x-y=0$ と $x+y+2z-4=0$ の和集合`,
          approach: String.raw`点と直線の距離は外積で書ける。2つの距離の2乗を比べ、差を因数分解する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}(x,y,z)$ とする。直線 $\mathrm{AB}$ は $\mathrm{A}(1,0,0)$ を通り方向ベクトルは $\overrightarrow{\mathrm{AB}}=\left(0,1,1\right)$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AP}}\times\overrightarrow{\mathrm{AB}}=\left(y-z,\ -\left(x-1\right),\ x-1\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\left(\text{距離}\right)^{2}=\frac{\left(y-z\right)^{2}+2\left(x-1\right)^{2}}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。直線 $\mathrm{BC}$ は $\mathrm{B}(1,1,1)$ を通り $\overrightarrow{\mathrm{BC}}=\left(-2,0,-2\right)$、向きとしては $\left(1,0,1\right)$ である。同様に`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{距離}\right)^{2}=\frac{2\left(y-1\right)^{2}+\left(x-z\right)^{2}}{2}`,
            },
            { k: "p", t: String.raw`である。2つが等しい条件は` },
            {
              k: "math",
              t: String.raw`\left(y-z\right)^{2}+2\left(x-1\right)^{2}=2\left(y-1\right)^{2}+\left(x-z\right)^{2}`,
            },
            { k: "p", t: String.raw`である。展開して整理すると` },
            {
              k: "math",
              t: String.raw`x^{2}-y^{2}+2z\left(x-y\right)-4\left(x-y\right)=0`,
            },
            { k: "p", t: String.raw`で、$x-y$ でくくれて` },
            {
              k: "math",
              t: String.raw`\left(x-y\right)\left(x+y+2z-4\right)=0`,
            },
            { k: "p", t: String.raw`となる。したがって求める図形は` },
            {
              k: "math",
              t: String.raw`\text{平面}\ x-y=0\ \text{と平面}\ x+y+2z-4=0\ \text{の和集合}`,
            },
            {
              k: "p",
              t: String.raw`である。どちらの平面も $\mathrm{B}(1,1,1)$（2直線の交点）を含んでいる。`,
            },
            {
              k: "note",
              t: String.raw`交わる2直線から等距離にある点は、2直線が作る角の二等分線を含む2枚の平面の上にある。ここではそれが $x=y$ と $x+y+2z=4$ である。`,
            },
          ],
          pitfalls: [
            String.raw`「2直線から等距離」は1枚の平面ではなく2枚の平面になる。因数分解して両方を書く。`,
          ],
          check: String.raw`乱数で2000点をとると、距離が等しいことと $\left(x-y\right)\left(x+y+2z-4\right)=0$ が完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`4直線 $\mathrm{AB}$、$\mathrm{BC}$、$\mathrm{CD}$、$\mathrm{DA}$ に共に接する球面の中心と半径の組をすべて求める`,
          answer: String.raw`中心 $\left(0,0,\pm\sqrt2\right)$ で $r=\sqrt2$、中心 $\left(2\sqrt2,4,-\sqrt2\right),\left(-2\sqrt2,4,\sqrt2\right)$ で $r=3\sqrt2$、中心 $\left(\pm\sqrt2,-\sqrt2,\pm2\right),\left(\pm\sqrt2,\sqrt2,\mp2\right)$（複号同順の4点）で $r=\sqrt6$。合わせて8組`,
          approach: String.raw`4直線すべてへの距離の2乗を書き下して連立する。$\mathrm{DA}$（$x$ 軸）への距離がいちばん簡単なので、それを基準にすると式が軽くなる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{P}(x,y,z)$、半径 $r$ とする。4直線への距離の2乗は、(1) と同じ計算で` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{AB}$：$\dfrac{\left(y-z\right)^{2}+2\left(x-1\right)^{2}}{2}$`,
                String.raw`$\mathrm{BC}$：$\dfrac{2\left(y-1\right)^{2}+\left(x-z\right)^{2}}{2}$`,
                String.raw`$\mathrm{CD}$：$\dfrac{\left(y+z\right)^{2}+2\left(x+1\right)^{2}}{2}$（$\mathrm{C}(-1,1,-1)$ を通り方向 $\left(0,1,-1\right)$）`,
                String.raw`$\mathrm{DA}$：$y^{2}+z^{2}$（$x$ 軸そのもの）`,
              ],
            },
            { k: "p", t: String.raw`である。$r^{2}=y^{2}+z^{2}$ を基準にして、残りの3本と等しいとおく。` },
            { k: "p", t: String.raw`**$\mathrm{AB}=\mathrm{DA}$。**` },
            {
              k: "math",
              t: String.raw`2\left(y^{2}+z^{2}\right)=\left(y-z\right)^{2}+2\left(x-1\right)^{2}\iff\left(y+z\right)^{2}=2\left(x-1\right)^{2}`,
            },
            { k: "p", t: String.raw`**$\mathrm{CD}=\mathrm{DA}$。**` },
            {
              k: "math",
              t: String.raw`2\left(y^{2}+z^{2}\right)=\left(y+z\right)^{2}+2\left(x+1\right)^{2}\iff\left(y-z\right)^{2}=2\left(x+1\right)^{2}`,
            },
            { k: "p", t: String.raw`**$\mathrm{BC}=\mathrm{DA}$。**` },
            {
              k: "math",
              t: String.raw`2\left(y^{2}+z^{2}\right)=2\left(y-1\right)^{2}+\left(x-z\right)^{2}\iff z^{2}+2xz-x^{2}+4y-2=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**はじめの2本を解く。** $y+z=\varepsilon_{1}\sqrt2\left(x-1\right)$、$y-z=\varepsilon_{2}\sqrt2\left(x+1\right)$（$\varepsilon_{1},\varepsilon_{2}$ は $\pm1$）と書ける。足し引きして`,
            },
            {
              k: "math",
              t: String.raw`y=\frac{\sqrt2}{2}\left\{\varepsilon_{1}\left(x-1\right)+\varepsilon_{2}\left(x+1\right)\right\},\qquad z=\frac{\sqrt2}{2}\left\{\varepsilon_{1}\left(x-1\right)-\varepsilon_{2}\left(x+1\right)\right\}`,
            },
            { k: "p", t: String.raw`である。符号の組ごとに書くと` },
            {
              k: "steps",
              items: [
                String.raw`$\left(+,+\right)$：$y=\sqrt2\,x$、$z=-\sqrt2$`,
                String.raw`$\left(+,-\right)$：$y=-\sqrt2$、$z=\sqrt2\,x$`,
                String.raw`$\left(-,+\right)$：$y=\sqrt2$、$z=-\sqrt2\,x$`,
                String.raw`$\left(-,-\right)$：$y=-\sqrt2\,x$、$z=\sqrt2$`,
              ],
            },
            { k: "p", t: String.raw`である。これを3本目に代入する。` },
            {
              k: "steps",
              items: [
                String.raw`$\left(+,+\right)$：$2-2\sqrt2x-x^{2}+4\sqrt2x-2=0$ より $x\left(x-2\sqrt2\right)=0$、$x=0$ または $2\sqrt2$`,
                String.raw`$\left(+,-\right)$：$\left(1+2\sqrt2\right)x^{2}=2+4\sqrt2$ より $x^{2}=2$、$x=\pm\sqrt2$`,
                String.raw`$\left(-,+\right)$：$\left(1-2\sqrt2\right)x^{2}=2-4\sqrt2$ より $x^{2}=2$、$x=\pm\sqrt2$`,
                String.raw`$\left(-,-\right)$：$x\left(x+2\sqrt2\right)=0$、$x=0$ または $-2\sqrt2$`,
              ],
            },
            { k: "p", t: String.raw`である。それぞれ中心と $r=\sqrt{y^{2}+z^{2}}$ を求めると` },
            {
              k: "steps",
              items: [
                String.raw`$\left(0,0,-\sqrt2\right)$、$r=\sqrt2$`,
                String.raw`$\left(0,0,\sqrt2\right)$、$r=\sqrt2$`,
                String.raw`$\left(2\sqrt2,4,-\sqrt2\right)$、$r=3\sqrt2$`,
                String.raw`$\left(-2\sqrt2,4,\sqrt2\right)$、$r=3\sqrt2$`,
                String.raw`$\left(\sqrt2,-\sqrt2,2\right)$、$r=\sqrt6$`,
                String.raw`$\left(-\sqrt2,-\sqrt2,-2\right)$、$r=\sqrt6$`,
                String.raw`$\left(\sqrt2,\sqrt2,-2\right)$、$r=\sqrt6$`,
                String.raw`$\left(-\sqrt2,\sqrt2,2\right)$、$r=\sqrt6$`,
              ],
            },
            {
              k: "p",
              t: String.raw`の8組である。どれも $r>0$ で、実際に4直線すべてから等距離になっている。`,
            },
            {
              k: "note",
              t: String.raw`4直線のうち $\mathrm{AB}$ と $\mathrm{CD}$ はねじれの位置、$\mathrm{BC}$ と $\mathrm{DA}$ もねじれの位置にある。4本すべてに接する球が8個もあるのは、(1) で見たように「等距離の条件」が毎回2枚の平面に分かれ、$2^{3}=8$ 通りの組み合わせが生じるためである。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{DA}$ は $x$ 軸なので距離が $\sqrt{y^{2}+z^{2}}$ と最も簡単。これを基準にすると式がそろう。`,
            String.raw`平方根を外すとき $\pm$ の両方を残す。符号の組ごとに場合分けが必要である。`,
          ],
          check: String.raw`8つの中心それぞれで4直線への距離を計算すると、どれも4つとも同じ値（$\sqrt2=1.414213562$、$3\sqrt2=4.242640687$、$\sqrt6=2.449489743$）になった。`,
        },
      ],
    },
  ],
};
