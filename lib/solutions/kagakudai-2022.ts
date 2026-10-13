import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2022年度（令和4年度）一般選抜 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$\varphi=\dfrac{1+\sqrt5}{2}$。 */
const PHI = (1 + Math.sqrt(5)) / 2;
/** 単位円と帯 $\left|\operatorname{Re}z\right|\leqq\tfrac12$ の共通部分（レンズ形）。 */
const TH1 = Math.acos(0.5);
const LENS22: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const th = TH1 + ((Math.PI - 2 * TH1) * i) / 40;
    return [Math.cos(th), Math.sin(th)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const th = Math.PI + TH1 + ((Math.PI - 2 * TH1) * i) / 40;
    return [Math.cos(th), Math.sin(th)];
  }),
];

/** 第4問の図。双曲線 $\left(x-\tfrac34\right)^{2}-y^{2}=\tfrac{25}{16}$。 */
const HYP = (x: number): number => Math.sqrt(Math.max(0, (x - 0.75) ** 2 - 25 / 16));
const HYP_R: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = 2 + (2.2 * i) / 40;
    return [x, HYP(x)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = 4.2 - (2.2 * i) / 40;
    return [x, -HYP(x)];
  }),
];
const HYP_L: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = -0.5 - (2.2 * i) / 40;
    return [x, HYP(x)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const x = -2.7 + (2.2 * i) / 40;
    return [x, -HYP(x)];
  }),
];

export const kagakudai2022: SolutionSet = {
  slug: "kagakudai",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面",
      topics: ["2次方程式の解", "実数解と虚数解で分ける", "共役な解", "領域の図示"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$-2.5\\leqq x,y\\leqq2.5$ を $0.01$ 刻みで走査し、「$\\left|a\\right|\\leqq1,\\left|b\\right|\\leqq1$ の実数 $a,b$ がとれるか」と「実軸上なら $\\left|z\\right|\\leqq\\varphi$、虚部があるなら $\\left|\\operatorname{Re}z\\right|\\leqq\\tfrac12$ かつ $\\left|z\\right|\\leqq1$」が完全に一致した",
          "実軸上では $x=\\varphi=1.618033989$ まで可能で、$x=1.62$ では不可能だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a,b$ を実数とし $f(z)=z^{2}+az+b$ とする。$a,b$ が $\left|a\right|\leqq1$、$\left|b\right|\leqq1$ を満たしながら動くとき、$f(z)=0$ を満たす複素数 $z$ がとりうる値の範囲を複素数平面上に図示する`,
          answer: String.raw`実軸上の線分 $-\dfrac{1+\sqrt5}{2}\leqq z\leqq\dfrac{1+\sqrt5}{2}$ と、$\left|\operatorname{Re}z\right|\leqq\dfrac12$ かつ $\left|z\right|\leqq1$ の部分（単位円板を幅 $1$ の帯で切り取ったレンズ形）との和集合`,
          approach: String.raw`$z$ が実数か虚数かで話が変わる。虚数なら共役も解なので $a,b$ が $z$ から決まってしまい、実数なら $a$ を自由に選べるぶん広がる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$z$ が虚数のとき。** $f$ の係数は実数なので、$z$ が解なら $\overline{z}$ も解である。解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`a=-\left(z+\overline{z}\right)=-2\operatorname{Re}z,\qquad b=z\overline{z}=\left|z\right|^{2}`,
            },
            { k: "p", t: String.raw`である。条件は` },
            {
              k: "math",
              t: String.raw`\left|2\operatorname{Re}z\right|\leqq1\ \text{かつ}\ \left|z\right|^{2}\leqq1,\qquad\text{すなわち}\qquad\left|\operatorname{Re}z\right|\leqq\frac12\ \text{かつ}\ \left|z\right|\leqq1`,
            },
            { k: "p", t: String.raw`である。逆にこれを満たす虚数 $z$ に対して、この $a,b$ をとれば $z$ は解になる。` },
            {
              k: "p",
              t: String.raw`**$z$ が実数のとき。** $z=x$ とすると $x^{2}+ax+b=0$、すなわち $b=-x^{2}-ax$ である。$a$ が $\left[-1,1\right]$ を動くとき $b$ は`,
            },
            {
              k: "math",
              t: String.raw`-x^{2}-\left|x\right|\leqq b\leqq-x^{2}+\left|x\right|`,
            },
            {
              k: "p",
              t: String.raw`の範囲をすべてとる。この区間が $\left[-1,1\right]$ と交わればよい。左端については $-x^{2}-\left|x\right|\leqq1$ がつねに成り立つ。右端については`,
            },
            {
              k: "math",
              t: String.raw`-x^{2}+\left|x\right|\geqq-1\iff x^{2}-\left|x\right|-1\leqq0\iff\left|x\right|\leqq\frac{1+\sqrt5}{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$\left|x\right|$ の2次不等式を解いた）。よって実数の解としてとりうるのは $\left|x\right|\leqq\dfrac{1+\sqrt5}{2}$ である。`,
            },
            { k: "p", t: String.raw`**まとめ。** 求める範囲は` },
            {
              k: "math",
              t: String.raw`\left\{z\ \text{実数}\ \middle|\ \left|z\right|\leqq\frac{1+\sqrt5}{2}\right\}\cup\left\{z\ \middle|\ \left|\operatorname{Re}z\right|\leqq\frac12,\ \left|z\right|\leqq1\right\}`,
            },
            { k: "p", t: String.raw`である。図示すると次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけのレンズ形は、単位円板のうち実部が -1/2 以上 1/2 以下の部分。そこから実軸に沿って ±(1+√5)/2 ≒ ±1.618 まで太い線分が伸びる。境界はすべて含む。",
                view: [-2.2, 2.2, -1.4, 1.4],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: LENS22 },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: [-0.5, -1.4], b: [-0.5, 1.4], dash: true, faint: true },
                  { k: "seg", a: [0.5, -1.4], b: [0.5, 1.4], dash: true, faint: true },
                  { k: "seg", a: [-PHI, 0], b: [PHI, 0] },
                  { k: "dot", at: [PHI, 0], label: "(1+√5)/2", place: "above-right" },
                  { k: "dot", at: [-PHI, 0], label: "-(1+√5)/2", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\dfrac{1+\sqrt5}{2}$ は $x^{2}=x+1$ の正の解（黄金比）である。$x=\dfrac{1+\sqrt5}{2}$、$a=-1$、$b=-1$ とすると $x^{2}-x-1=0$ でちょうど解になる。`,
            },
          ],
          pitfalls: [
            String.raw`実数解のときは $a$ を自由に選べるので、虚数解のときより広い範囲になる。両方を合わせるのを忘れない。`,
            String.raw`虚数解のときは $a,b$ が $z$ から一意に決まってしまう。「$a,b$ を選ぶ自由」がない。`,
          ],
          check: String.raw`$0.01$ 刻みの格子で、実際に $\left|a\right|\leqq1$、$\left|b\right|\leqq1$ がとれるかどうかと、この答えが完全に一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["最大公約数", "基本対称式", "素数で考える", "mod による絞り込み"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\leqq a,b,c\\leqq24$ で $\\gcd(a,b,c)=1$ となるすべての組について、$a+b+c$、$ab+bc+ca$、$abc$ の最大公約数が $1$ になった",
          "$1\\leqq a,b,c\\leqq39$ で $\\gcd(a,b,c)=1$ となるすべての組について、$a+b+c$、$a^{2}+b^{2}+c^{2}$、$a^{3}+b^{3}+c^{3}$ の最大公約数として現れる値は $1,2,3,6$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`3つの正の整数 $a,b,c$ の最大公約数が $1$ であるとき、$a+b+c$、$bc+ca+ab$、$abc$ の最大公約数は $1$ であることを示す`,
          answer: String.raw`共通の素因数 $p$ があると仮定すると、$p$ が $a,b,c$ をすべて割ることになって矛盾する`,
          approach: String.raw`「最大公約数が $1$」は「共通の素因数がない」と同じ。素数 $p$ が3つすべてを割ると仮定して矛盾を導く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3つの数の最大公約数が $1$ でないとすると、共通の素因数 $p$ が存在する。以下それで矛盾を導く。`,
            },
            {
              k: "p",
              t: String.raw`$p\mid abc$ より、$p$ は $a,b,c$ のいずれかを割る。$a,b,c$ は対称なので $p\mid a$ としてよい。`,
            },
            { k: "p", t: String.raw`次に` },
            {
              k: "math",
              t: String.raw`bc+ca+ab=a\left(b+c\right)+bc`,
            },
            {
              k: "p",
              t: String.raw`で、$p\mid a\left(b+c\right)$ かつ $p\mid bc+ca+ab$ だから $p\mid bc$ である。よって $p$ は $b$ か $c$ を割る。$b,c$ も対称なので $p\mid b$ としてよい。`,
            },
            {
              k: "p",
              t: String.raw`さらに $p\mid a+b+c$ かつ $p\mid a$、$p\mid b$ より $p\mid c$ である。`,
            },
            {
              k: "p",
              t: String.raw`これで $p$ は $a,b,c$ をすべて割るので、$a,b,c$ の最大公約数が $p$ 以上になり、$1$ であることに反する。したがって共通の素因数はなく、3つの最大公約数は $1$ である。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`「素数 $p$ が積 $abc$ を割るならどれかを割る」という性質を使う。合成数では成り立たないので、素数で考えるのが要点。`,
          ],
          check: String.raw`$1\leqq a,b,c\leqq24$ の全探索でも、$\gcd$ はつねに $1$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a+b+c$、$a^{2}+b^{2}+c^{2}$、$a^{3}+b^{3}+c^{3}$ の最大公約数となるような正の整数をすべて求める`,
          answer: String.raw`$1,\ 2,\ 3,\ 6$`,
          approach: String.raw`基本対称式 $e_{1}=a+b+c$、$e_{2}=ab+bc+ca$、$e_{3}=abc$ で書き直すと、(1) が使える形になる。$5$ 以上の素数は入れないことがまず分かり、あとは $4$ と $9$ が入れないことを $\bmod$ で示す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p_{1}=a+b+c$、$p_{2}=a^{2}+b^{2}+c^{2}$、$p_{3}=a^{3}+b^{3}+c^{3}$ とし、$g=\gcd\left(p_{1},p_{2},p_{3}\right)$ とおく。基本対称式で書くと`,
            },
            {
              k: "math",
              t: String.raw`p_{1}=e_{1},\qquad p_{2}=e_{1}^{2}-2e_{2},\qquad p_{3}=e_{1}^{3}-3e_{1}e_{2}+3e_{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$5$ 以上の素因数はない。** 素数 $p\geqq5$ が $g$ を割るとする。$p\mid p_{1}=e_{1}$ である。$p\mid p_{2}=e_{1}^{2}-2e_{2}$ より $p\mid2e_{2}$、$p\neq2$ だから $p\mid e_{2}$。$p\mid p_{3}=e_{1}^{3}-3e_{1}e_{2}+3e_{3}$ より $p\mid3e_{3}$、$p\neq3$ だから $p\mid e_{3}$。すると $p$ は $e_{1},e_{2},e_{3}$ をすべて割り、(1) に反する。よって $g=2^{\alpha}3^{\beta}$ の形である。`,
            },
            {
              k: "p",
              t: String.raw`**$4$ では割り切れない。** $\gcd(a,b,c)=1$ なので $a,b,c$ がすべて偶数ということはない。$2\mid p_{1}$ なら、奇数の個数は $0$ 個か $2$ 個で、$0$ 個は除かれるのでちょうど $2$ 個である。奇数の2乗は $4$ で割ると $1$ 余り、偶数の2乗は $4$ の倍数なので`,
            },
            {
              k: "math",
              t: String.raw`p_{2}\equiv1+1+0=2\pmod4`,
            },
            { k: "p", t: String.raw`となり、$4\nmid p_{2}$ である。よって $\alpha\leqq1$。` },
            {
              k: "p",
              t: String.raw`**$9$ では割り切れない。** $3\mid p_{2}$ を考える。平方数を $3$ で割った余りは $0$ か $1$ なので、$a^{2}+b^{2}+c^{2}\equiv0\pmod3$ となるのは「3つとも $\equiv0$」か「3つとも $\equiv1$」である。前者は $3\mid a,b,c$ となり $\gcd=1$ に反する。したがって $a,b,c$ はどれも $3$ の倍数でなく、$3\mid p_{1}$ とあわせると $a\equiv b\equiv c\pmod3$（ともに $1$、またはともに $2$）である。`,
            },
            {
              k: "p",
              t: String.raw`$a\equiv b\equiv c\equiv1\pmod3$ のとき $a=3x+1$ などと書くと`,
            },
            {
              k: "math",
              t: String.raw`p_{1}=3\left(x+y+z+1\right),\qquad p_{2}=9\left(x^{2}+y^{2}+z^{2}\right)+6\left(x+y+z\right)+3`,
            },
            {
              k: "p",
              t: String.raw`である。$9\mid p_{1}$ より $x+y+z\equiv2\pmod3$、$9\mid p_{2}$ より $3\mid2\left(x+y+z\right)+1$、すなわち $x+y+z\equiv1\pmod3$ となって矛盾する。$a\equiv b\equiv c\equiv2\pmod3$ のときも同様に矛盾する。よって $\beta\leqq1$。`,
            },
            { k: "p", t: String.raw`**候補と実例。** 以上より $g\in\left\{1,2,3,6\right\}$ である。どれも実際に起こる。` },
            {
              k: "steps",
              items: [
                String.raw`$\left(a,b,c\right)=\left(1,1,3\right)$：$p_{1}=5$、$p_{2}=11$、$p_{3}=29$ で $g=1$`,
                String.raw`$\left(1,1,2\right)$：$p_{1}=4$、$p_{2}=6$、$p_{3}=10$ で $g=2$`,
                String.raw`$\left(1,1,1\right)$：$p_{1}=p_{2}=p_{3}=3$ で $g=3$`,
                String.raw`$\left(1,1,4\right)$：$p_{1}=6$、$p_{2}=18$、$p_{3}=66$ で $g=6$`,
              ],
            },
            { k: "p", t: String.raw`よって求める正の整数は` },
            { k: "math", t: String.raw`1,\ 2,\ 3,\ 6` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$p_{k}$ を基本対称式で書き直すのが出発点。そうすれば (1) がそのまま効く。`,
            String.raw`$4$ と $9$ を除くには $\bmod4$、$\bmod9$ での議論が要る。候補を出しただけでは答えにならない。`,
            String.raw`4つの値すべてに実例を挙げる。`,
          ],
          check: String.raw`$1\leqq a,b,c\leqq39$ の全探索で、現れた最大公約数は $1,2,3,6$ だけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["直角三角形の頂点の軌跡", "三角関数の合成", "道のり", "領域に入らないことの証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{P}=\\cos(t-\\alpha)\\left(\\sin\\alpha,\\cos\\alpha\\right)$ とおくと、$\\alpha=0.3,0.7,1.2$ と $t=0,0.4,1,\\tfrac\\pi2$ のすべてで $\\angle\\mathrm{P}=90^{\\circ}$、$\\angle\\mathrm{A}=\\alpha$ になった",
          "道のり $\\displaystyle\\int_{0}^{\\pi/2}\\left|\\sin(t-\\alpha)\\right|dt$ が $2-\\sin\\alpha-\\cos\\alpha$ と小数9桁まで一致した",
          "$t$ を2万分割して調べても、$\\mathrm{P}$ が領域 $D$ に入ることは一度もなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha$ は $0<\alpha<\dfrac{\pi}{2}$ を満たす実数とする。$\angle\mathrm{A}=\alpha$ および $\angle\mathrm{P}=\dfrac{\pi}{2}$ を満たす直角三角形 $\mathrm{APB}$ が、$\mathrm{A}\left(\sin t,0\right)$、$\mathrm{B}\left(0,\cos t\right)$、$\mathrm{P}$ は第一象限内、という条件のもとで $t=0$ から $t=\dfrac{\pi}{2}$ まで動くとき、$\mathrm{P}$ はある直線上を動くことを示し、その直線の方程式を $\alpha$ で表す`,
          answer: String.raw`$\mathrm{P}$ は直線 $x\cos\alpha-y\sin\alpha=0$（すなわち $y=\dfrac{x}{\tan\alpha}$）の上を動く`,
          approach: String.raw`$\mathrm{AB}=1$ がつねに成り立つことに気づくのが出発点。すると $\mathrm{AP}=\cos\alpha$ と決まり、$\mathrm{A}$ から $\mathrm{B}$ の向きを $\alpha$ だけ回した向きに進めば $\mathrm{P}$ が得られる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{AB}=\sqrt{\sin^{2}t+\cos^{2}t}=1$ である。$t$ によらず $1$ なのがこの問題の仕掛けである。` },
            {
              k: "p",
              t: String.raw`$\angle\mathrm{P}=\dfrac{\pi}{2}$、$\angle\mathrm{A}=\alpha$ の直角三角形なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}=\mathrm{AB}\cos\alpha=\cos\alpha`,
            },
            {
              k: "p",
              t: String.raw`である。$\overrightarrow{\mathrm{AB}}=\left(-\sin t,\ \cos t\right)$ は単位ベクトルなので、これを $\alpha$ だけ時計回りに回した単位ベクトルは`,
            },
            {
              k: "math",
              t: String.raw`\left(-\sin t\cos\alpha+\cos t\sin\alpha,\ \sin t\sin\alpha+\cos t\cos\alpha\right)=\left(-\sin\left(t-\alpha\right),\ \cos\left(t-\alpha\right)\right)`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\mathrm{P}=\left(\sin t-\cos\alpha\sin\left(t-\alpha\right),\ \cos\alpha\cos\left(t-\alpha\right)\right)`,
            },
            {
              k: "p",
              t: String.raw`である（反時計回りに回すと $\mathrm{P}$ が第一象限に入らない）。$x$ 座標を積和の公式で整理すると`,
            },
            {
              k: "math",
              t: String.raw`\sin t-\cos\alpha\sin\left(t-\alpha\right)=\sin t-\frac{\sin t+\sin\left(t-2\alpha\right)}{2}=\frac{\sin t-\sin\left(t-2\alpha\right)}{2}=\sin\alpha\cos\left(t-\alpha\right)`,
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{P}=\cos\left(t-\alpha\right)\left(\sin\alpha,\ \cos\alpha\right)`,
            },
            {
              k: "p",
              t: String.raw`である。これは原点から向き $\left(\sin\alpha,\cos\alpha\right)$ に進んだ点なので、$\mathrm{P}$ は原点を通る直線`,
            },
            {
              k: "math",
              t: String.raw`x\cos\alpha-y\sin\alpha=0\qquad\left(\text{すなわち}\ y=\frac{x}{\tan\alpha}\right)`,
            },
            {
              k: "p",
              t: String.raw`の上を動く。$0\leqq t\leqq\dfrac{\pi}{2}$ では $t-\alpha\in\left(-\dfrac{\pi}{2},\dfrac{\pi}{2}\right)$ なので $\cos\left(t-\alpha\right)>0$ であり、$\mathrm{P}$ は確かに第一象限にある。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AB}=1$（$t$ によらない）が効く。これがないと $\mathrm{AP}$ が $t$ に依存してしまう。`,
            String.raw`回す向きは2通りあるが、第一象限という条件で一方に決まる。`,
          ],
          check: String.raw`$\alpha$ と $t$ を4通りずつとって $\angle\mathrm{P}$ と $\angle\mathrm{A}$ を計算すると、$90^{\circ}$ と $\alpha$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$t=0$ から $t=\dfrac{\pi}{2}$ までの間に点 $\mathrm{P}$ が動く道のりを $\alpha$ で表す`,
          answer: String.raw`$2-\sin\alpha-\cos\alpha$`,
          approach: String.raw`$\mathrm{P}$ は直線上を往復するので、速さは $\left|\dfrac{d}{dt}\cos\left(t-\alpha\right)\right|$。絶対値を外すために $t=\alpha$ で区切る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $\mathrm{OP}=\cos\left(t-\alpha\right)$（$\left(\sin\alpha,\cos\alpha\right)$ が単位ベクトルなので）である。$\mathrm{P}$ は一直線上を動くので、道のりは`,
            },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{\frac{\pi}{2}}\left|\frac{d}{dt}\cos\left(t-\alpha\right)\right|dt=\int_{0}^{\frac{\pi}{2}}\left|\sin\left(t-\alpha\right)\right|dt`,
            },
            { k: "p", t: String.raw`である。$0<\alpha<\dfrac{\pi}{2}$ なので $t=\alpha$ で符号が変わる。` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\alpha}\sin\left(\alpha-t\right)dt=\Bigl[\cos\left(\alpha-t\right)\Bigr]_{0}^{\alpha}=1-\cos\alpha`,
            },
            {
              k: "math",
              t: String.raw`\int_{\alpha}^{\frac{\pi}{2}}\sin\left(t-\alpha\right)dt=\Bigl[-\cos\left(t-\alpha\right)\Bigr]_{\alpha}^{\frac{\pi}{2}}=1-\sin\alpha`,
            },
            { k: "p", t: String.raw`である（$\cos\left(\dfrac{\pi}{2}-\alpha\right)=\sin\alpha$）。合わせて` },
            {
              k: "math",
              t: String.raw`L=2-\cos\alpha-\sin\alpha`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ は $t=\alpha$ のとき原点から最も遠い（$\mathrm{OP}=1$）。そこまで進んでから引き返すので、「行き $1-\cos\alpha$ ＋ 帰り $1-\sin\alpha$」という形になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ は往復するので、始点と終点の距離ではなく道のり（絶対値の積分）を求める。`,
          ],
          check: String.raw`$\alpha=0.3,0.7,1.2$ で数値積分すると、$2-\sin\alpha-\cos\alpha$ と小数9桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$xy$ 平面内において連立不等式 $x^{2}-x+y^{2}<0$、$x^{2}+y^{2}-y<0$ により定まる領域を $D$ とするとき、点 $\mathrm{P}$ は領域 $D$ には入らないことを示す`,
          answer: String.raw`$\mathrm{P}\in D\iff\cos\left(t-\alpha\right)<\min\left(\sin\alpha,\cos\alpha\right)$ だが、$\cos\left(t-\alpha\right)$ の最小値がちょうど $\min\left(\sin\alpha,\cos\alpha\right)$`,
          approach: String.raw`$D$ の2つの不等式を $x^{2}+y^{2}<x$、$x^{2}+y^{2}<y$ と読みかえ、(1) の $\mathrm{P}$ を代入する。両辺が $\cos\left(t-\alpha\right)$ でそろう。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$s=\cos\left(t-\alpha\right)$ とおくと、(1) より $\mathrm{P}\left(s\sin\alpha,\ s\cos\alpha\right)$ で $x^{2}+y^{2}=s^{2}$ である。$s>0$ に注意して、$D$ の条件は`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x^{2}+y^{2}<x$：$s^{2}<s\sin\alpha$、すなわち $s<\sin\alpha$`,
                String.raw`$x^{2}+y^{2}<y$：$s^{2}<s\cos\alpha$、すなわち $s<\cos\alpha$`,
              ],
            },
            { k: "p", t: String.raw`となる。つまり` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\in D\iff s<\min\left(\sin\alpha,\ \cos\alpha\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`一方、$0\leqq t\leqq\dfrac{\pi}{2}$ のとき $t-\alpha$ は $-\alpha$ から $\dfrac{\pi}{2}-\alpha$ まで動く。$\cos$ はこの範囲で両端が最小になるので`,
            },
            {
              k: "math",
              t: String.raw`s=\cos\left(t-\alpha\right)\geqq\min\left\{\cos\alpha,\ \cos\left(\frac{\pi}{2}-\alpha\right)\right\}=\min\left(\cos\alpha,\ \sin\alpha\right)`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $s<\min\left(\sin\alpha,\cos\alpha\right)$ となることはなく、$\mathrm{P}$ は $D$ に入らない。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$D$ は2つの円（直径が $\mathrm{O}$ と $\left(1,0\right)$、$\mathrm{O}$ と $\left(0,1\right)$）の内部の共通部分である。$\mathrm{P}$ はその「ぎりぎり外側」を通り、$t=0$ と $t=\dfrac\pi2$ では $D$ の境界上に来る。`,
            },
          ],
          pitfalls: [
            String.raw`$s>0$ で割れるので、2乗の不等式が1次の不等式に落ちる。ここを丁寧に。`,
            String.raw`$\cos\left(t-\alpha\right)$ の最小値を取るのは区間の端。中央の $t=\alpha$ では最大になる。`,
          ],
          check: String.raw`$t$ を2万分割して調べても、$\mathrm{P}$ が $D$ に入ることは一度もなかった。`,
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面",
      topics: ["1次分数変換", "アポロニウスの円", "円か直線かの判定", "通過領域と双曲線"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.2,0.8,1.5$ で $\\left|z-1\\right|=a$ 上の2000点を $w$ に移すと、中心 $\\tfrac{2(1+a^{2})}{1-4a^{2}}$、半径 $\\tfrac{5a}{\\left|1-4a^{2}\\right|}$ の円からのずれは $10^{-15}$ 以下だった",
          "$a=0.5$ では $\\operatorname{Re}w$ がつねに $0.75$ になり、直線になった",
          "中心を $x$ とすると $r^{2}=\\tfrac{(x-2)(2x+1)}{2}$ が3通りの $a$ で成り立った",
          "$a\\to0^{+}$ で中心 $\\to2$、$a\\to\\tfrac12^{-}$ で $+\\infty$、$a\\to\\tfrac12^{+}$ で $-\\infty$、$a\\to\\infty$ で $\\to-\\tfrac12$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ は正の実数とする。複素数 $z$ が $\left|z-1\right|=a$ かつ $z\neq\dfrac12$ を満たしながら動くとき、複素数平面上の点 $w=\dfrac{z-3}{1-2z}$ が描く図形を $K$ とする。$K$ が円となるための $a$ の条件を求め、そのときの $K$ の中心が表す複素数と半径を $a$ で表す`,
          answer: String.raw`$a\neq\dfrac12$。中心 $\dfrac{2\left(1+a^{2}\right)}{1-4a^{2}}$、半径 $\dfrac{5a}{\left|1-4a^{2}\right|}$`,
          approach: String.raw`$w$ の式を $z$ について解き、$\left|z-1\right|=a$ に代入する。$\left|w-2\right|=2a\left|w+\dfrac12\right|$ という「2定点からの距離の比が一定」の形になる。`,
          blocks: [
            { k: "p", t: String.raw`$w=\dfrac{z-3}{1-2z}$ を $z$ について解く。` },
            {
              k: "math",
              t: String.raw`w\left(1-2z\right)=z-3,\qquad w+3=z\left(1+2w\right),\qquad z=\frac{w+3}{2w+1}`,
            },
            {
              k: "p",
              t: String.raw`である（$2w+1=0$ なら左辺 $w+3=\dfrac52\neq0$ で矛盾するので $w\neq-\dfrac12$）。このとき`,
            },
            {
              k: "math",
              t: String.raw`z-1=\frac{w+3}{2w+1}-1=\frac{2-w}{2w+1}`,
            },
            { k: "p", t: String.raw`なので、$\left|z-1\right|=a$ は` },
            {
              k: "math",
              t: String.raw`\left|w-2\right|=a\left|2w+1\right|=2a\left|w+\frac12\right|`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "p",
              t: String.raw`**円か直線か。** これは「$2$ と $-\dfrac12$ からの距離の比が $2a:1$」という条件である。比が $1$、つまり $2a=1$（$a=\dfrac12$）のときは線分の垂直二等分線（直線 $\operatorname{Re}w=\dfrac34$）になり、円にならない。それ以外ではアポロニウスの円になる。よって`,
            },
            { k: "math", t: String.raw`a>0\ \text{かつ}\ a\neq\frac12` },
            { k: "p", t: String.raw`が条件である。` },
            { k: "p", t: String.raw`**中心と半径。** $w=u+vi$（$u,v$ 実数）とおいて2乗すると` },
            {
              k: "math",
              t: String.raw`\left(u-2\right)^{2}+v^{2}=4a^{2}\left\{\left(u+\frac12\right)^{2}+v^{2}\right\}`,
            },
            { k: "p", t: String.raw`で、整理すると` },
            {
              k: "math",
              t: String.raw`\left(1-4a^{2}\right)\left(u^{2}+v^{2}\right)-4\left(1+a^{2}\right)u+\left(4-a^{2}\right)=0`,
            },
            { k: "p", t: String.raw`である。$1-4a^{2}\neq0$ で割って平方完成すると、中心は` },
            {
              k: "math",
              t: String.raw`u_{0}=\frac{2\left(1+a^{2}\right)}{1-4a^{2}},\qquad v_{0}=0`,
            },
            { k: "p", t: String.raw`で、半径の2乗は` },
            {
              k: "math",
              t: String.raw`r^{2}=u_{0}^{2}-\frac{4-a^{2}}{1-4a^{2}}=\frac{4\left(1+a^{2}\right)^{2}-\left(4-a^{2}\right)\left(1-4a^{2}\right)}{\left(1-4a^{2}\right)^{2}}=\frac{25a^{2}}{\left(1-4a^{2}\right)^{2}}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\text{中心}\ \frac{2\left(1+a^{2}\right)}{1-4a^{2}},\qquad\text{半径}\ \frac{5a}{\left|1-4a^{2}\right|}`,
            },
            {
              k: "p",
              t: String.raw`である（中心は実数なので、実軸上の点を表す）。なお $a\neq\dfrac12$ のとき $z=\dfrac12$ は $\left|z-1\right|=a$ を満たさないので、$K$ は円全体になる。`,
            },
          ],
          pitfalls: [
            String.raw`比が $1$ のときだけ直線になる。$a=\dfrac12$ を見落とさない。`,
            String.raw`$\left|2w+1\right|=2\left|w+\dfrac12\right|$ と factor を出しておくと、アポロニウスの形だと見やすい。`,
          ],
          check: String.raw`$a=0.2,0.8,1.5$ で $2000$ 点を移すと、この中心・半径の円からのずれは $10^{-15}$ 以下だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a$ が (1) の条件を満たしながら動くとき、虚軸に平行で円 $K$ の直径となる線分が通過する領域を複素数平面上に図示する`,
          answer: String.raw`双曲線 $\left(x-\dfrac34\right)^{2}-y^{2}=\dfrac{25}{16}$ の2つの枝で囲まれた部分（境界を含む）。ただし頂点 $\left(2,0\right)$ と $\left(-\dfrac12,0\right)$ は除く`,
          approach: String.raw`中心を $x$ とおくと、半径 $r$ が $x$ だけで書ける。$a$ を消去すれば、$\left(x,y\right)$ の関係式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中心を $x=\dfrac{2\left(1+a^{2}\right)}{1-4a^{2}}$、半径を $r=\dfrac{5a}{\left|1-4a^{2}\right|}$ とする。問題の線分は`,
            },
            {
              k: "math",
              t: String.raw`\left\{x+yi\ \middle|\ \left|y\right|\leqq r\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$a$ を消去する。** 中心の式を $a^{2}$ について解くと` },
            {
              k: "math",
              t: String.raw`x-4xa^{2}=2+2a^{2},\qquad a^{2}=\frac{x-2}{4x+2}`,
            },
            { k: "p", t: String.raw`である。また $1-4a^{2}=\dfrac{2\left(1+a^{2}\right)}{x}$ で、$1+a^{2}=\dfrac{5x}{4x+2}$ だから` },
            {
              k: "math",
              t: String.raw`r^{2}=\frac{25a^{2}}{\left(1-4a^{2}\right)^{2}}=\frac{25a^{2}x^{2}}{4\left(1+a^{2}\right)^{2}}=\frac{25x^{2}\cdot\frac{x-2}{4x+2}}{4\cdot\frac{25x^{2}}{\left(4x+2\right)^{2}}}=\frac{\left(x-2\right)\left(4x+2\right)}{4}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`r^{2}=\frac{\left(x-2\right)\left(2x+1\right)}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**中心の動く範囲。** $\dfrac{dx}{da}=\dfrac{20a}{\left(1-4a^{2}\right)^{2}}>0$ なので $x$ は $a$ について増加する。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<a<\dfrac12$：$a\to0^{+}$ で $x\to2$、$a\to\dfrac12^{-}$ で $x\to+\infty$。よって $x>2$ のすべてをとる`,
                String.raw`$a>\dfrac12$：$a\to\dfrac12^{+}$ で $x\to-\infty$、$a\to\infty$ で $x\to-\dfrac12$。よって $x<-\dfrac12$ のすべてをとる`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**領域。** 条件は $y^{2}\leqq r^{2}$ なので` },
            {
              k: "math",
              t: String.raw`2y^{2}\leqq\left(x-2\right)\left(2x+1\right)=2x^{2}-3x-2`,
            },
            { k: "p", t: String.raw`すなわち $2x^{2}-2y^{2}-3x-2\geqq0$ である。平方完成すると` },
            {
              k: "math",
              t: String.raw`\left(x-\frac34\right)^{2}-y^{2}\geqq\frac{25}{16}`,
            },
            {
              k: "p",
              t: String.raw`である。これは中心 $\left(\dfrac34,0\right)$、頂点 $\left(2,0\right)$ と $\left(-\dfrac12,0\right)$ の直角双曲線の「内側」（2つの枝のそれぞれが囲む側）である。$x>2$ または $x<-\dfrac12$ という条件は、頂点の2点を除くことに対応する。よって求める領域は`,
            },
            {
              k: "math",
              t: String.raw`\left(x-\frac34\right)^{2}-y^{2}\geqq\frac{25}{16}\quad\text{かつ}\quad\left(x,y\right)\neq\left(2,0\right),\left(-\frac12,0\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが求める領域（境界を含む）。双曲線 (x - 3/4)² - y² = 25/16 の2つの枝の内側で、頂点 (2, 0) と (-1/2, 0) の2点だけは含まない。中心 3/4、漸近線は傾き ±1。",
                view: [-3.4, 4.9, -2.6, 2.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: HYP_R },
                  { k: "fill", pts: HYP_L },
                  { k: "curve", f: HYP, from: 2, to: 4.2 },
                  { k: "curve", f: (x: number) => -HYP(x), from: 2, to: 4.2 },
                  { k: "curve", f: HYP, from: -2.7, to: -0.5 },
                  { k: "curve", f: (x: number) => -HYP(x), from: -2.7, to: -0.5 },
                  { k: "curve", f: (x: number) => x - 0.75, from: -1.8, to: 3.3, dash: true, faint: true },
                  { k: "curve", f: (x: number) => 0.75 - x, from: -1.8, to: 3.3, dash: true, faint: true },
                  { k: "dot", at: [2, 0], label: "2", place: "above-right" },
                  { k: "dot", at: [-0.5, 0], label: "-1/2", place: "above-left" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$a\to0^{+}$ では円が点 $2$ に縮み、$a\to\infty$ では点 $-\dfrac12$ に縮む。どちらも「円」にはならないので、頂点の2点が抜ける。`,
            },
          ],
          pitfalls: [
            String.raw`中心と半径の両方に $a$ が入っているので、$a$ を消去して $\left(x,y\right)$ の関係に直す。`,
            String.raw`中心のとりうる範囲（$x>2$ または $x<-\dfrac12$）を調べて、端の2点を除く。`,
          ],
          check: String.raw`$a$ を変えて中心と半径を計算すると、$r^{2}=\dfrac{\left(x-2\right)\left(2x+1\right)}{2}$ が小数9桁まで成り立った。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法・極限",
      topics: ["積和の公式", "中間値の定理", "単調性と区分求積", "期待値の極限"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=\\tfrac23\\left(1+\\sin2ax\\right)$ と直せ、$\\displaystyle\\int_{0}^{1}f\\,dx=1$ は $1-\\cos2a=a$ と同値だった",
          "$g(a)=1-\\cos2a-a$ は $g\\left(\\tfrac\\pi{12}\\right)=-0.127825$、$g\\left(\\tfrac\\pi4\\right)=0.214602$ で、解は $a=0.554572091$ ただ1つだった",
          "$n=10,50,200,1000$ で $\\tfrac{A_{n}}{n}$ は $0.600293,0.560771,0.553289,0.551290$ と $0.550790532$ に近づき、$\\displaystyle\\int_{0}^{1}xf(x)dx=0.550790532$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a$ は $0<a\leqq\dfrac{\pi}{4}$ を満たす実数とし、$f(x)=\dfrac43\sin\left(\dfrac{\pi}{4}+ax\right)\cos\left(\dfrac{\pi}{4}-ax\right)$ とする。$\displaystyle\int_{0}^{1}f(x)\,dx=1$ を満たす $a$ がただ1つ存在することを示す`,
          answer: String.raw`$f(x)=\dfrac23\left(1+\sin2ax\right)$ で、条件は $1-\cos2a=a$。$g(a)=1-\cos2a-a$ の増減から解はただ1つ`,
          approach: String.raw`まず積和の公式で $f$ を簡単にする。積分して整理すると $a$ の方程式になり、あとは増減と中間値の定理。`,
          blocks: [
            { k: "p", t: String.raw`**$f$ を簡単にする。** 積和の公式 $\sin A\cos B=\dfrac{\sin\left(A+B\right)+\sin\left(A-B\right)}{2}$ を使う。` },
            {
              k: "math",
              t: String.raw`\sin\left(\frac{\pi}{4}+ax\right)\cos\left(\frac{\pi}{4}-ax\right)=\frac{\sin\frac{\pi}{2}+\sin2ax}{2}=\frac{1+\sin2ax}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f(x)=\frac43\cdot\frac{1+\sin2ax}{2}=\frac23\left(1+\sin2ax\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**積分する。**` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}f(x)\,dx=\frac23\left[x-\frac{\cos2ax}{2a}\right]_{0}^{1}=\frac23\left(1+\frac{1-\cos2a}{2a}\right)`,
            },
            { k: "p", t: String.raw`である。これが $1$ になる条件は` },
            {
              k: "math",
              t: String.raw`1+\frac{1-\cos2a}{2a}=\frac32,\qquad\frac{1-\cos2a}{2a}=\frac12,\qquad1-\cos2a=a`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**解の個数。** $g(a)=1-\cos2a-a$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(a)=2\sin2a-1`,
            },
            {
              k: "p",
              t: String.raw`である。$0<a\leqq\dfrac{\pi}{4}$ では $2a\in\left(0,\dfrac{\pi}{2}\right]$ で $\sin2a$ は増加するので、$g'(a)=0$ となるのは $\sin2a=\dfrac12$、すなわち $a=\dfrac{\pi}{12}$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0<a<\dfrac{\pi}{12}$：$g'<0$ で減少`,
                String.raw`$\dfrac{\pi}{12}<a\leqq\dfrac{\pi}{4}$：$g'>0$ で増加`,
              ],
            },
            { k: "p", t: String.raw`である。端の値は` },
            {
              k: "math",
              t: String.raw`g(0)=0,\qquad g\left(\frac{\pi}{12}\right)=1-\frac{\sqrt3}{2}-\frac{\pi}{12}=-0.127\cdots<0,\qquad g\left(\frac{\pi}{4}\right)=1-\frac{\pi}{4}=0.214\cdots>0`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "steps",
              items: [
                String.raw`$0<a\leqq\dfrac{\pi}{12}$ では $g$ は $g(0)=0$ から減って負のままなので、$g(a)=0$ の解はない`,
                String.raw`$\dfrac{\pi}{12}\leqq a\leqq\dfrac{\pi}{4}$ では $g$ は連続で狭義増加し、負から正に変わるので、中間値の定理より解がちょうど1つある`,
              ],
            },
            { k: "p", t: String.raw`である。よって条件を満たす $a$ はただ1つ存在する。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`数値で解くと $a=0.5545\cdots$ である（$\dfrac{\pi}{4}=0.7853\cdots$ の内側）。`,
            },
          ],
          pitfalls: [
            String.raw`$g(0)=0$ だが $a=0$ は範囲に入らない。$a>0$ ではすぐ負になるので、左側に解はない。`,
          ],
          check: String.raw`数値的に解くと $a=0.554572091$ で、$\displaystyle\int_{0}^{1}f\,dx=1.000000000$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$0\leqq b<c\leqq1$ を満たす実数 $b,c$ について $f(b)\left(c-b\right)\leqq\displaystyle\int_{b}^{c}f(x)\,dx\leqq f(c)\left(c-b\right)$ が成り立つことを示す`,
          answer: String.raw`$f'(x)=\dfrac{4a}{3}\cos2ax\geqq0$（$0\leqq x\leqq1$）なので $f$ は増加。あとは $f(b)\leqq f(x)\leqq f(c)$ を積分するだけ`,
          approach: String.raw`$f$ が $\left[0,1\right]$ で増加することを微分で示す。$0<a\leqq\dfrac\pi4$ のおかげで $2ax$ が $\dfrac\pi2$ を超えない。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $f(x)=\dfrac23\left(1+\sin2ax\right)$ なので` },
            {
              k: "math",
              t: String.raw`f'(x)=\frac23\cdot2a\cos2ax=\frac{4a}{3}\cos2ax`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq x\leqq1$、$0<a\leqq\dfrac{\pi}{4}$ のとき $0\leqq2ax\leqq2a\leqq\dfrac{\pi}{2}$ なので $\cos2ax\geqq0$、したがって $f'(x)\geqq0$ である。つまり $f$ は $\left[0,1\right]$ で（広い意味で）増加する。`,
            },
            { k: "p", t: String.raw`よって $b\leqq x\leqq c$ では` },
            {
              k: "math",
              t: String.raw`f(b)\leqq f(x)\leqq f(c)`,
            },
            { k: "p", t: String.raw`である。これを $b$ から $c$ まで積分すると（$c-b>0$）` },
            {
              k: "math",
              t: String.raw`f(b)\left(c-b\right)\leqq\int_{b}^{c}f(x)\,dx\leqq f(c)\left(c-b\right)`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$a\leqq\dfrac{\pi}{4}$ という条件が「$f$ が増加」を保証している。これがないと途中で減り始める。`,
          ],
          check: String.raw`$f$ の増減を数値で確かめると、$\left[0,1\right]$ で単調に増えていた。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ 個の数 $1,2,\ldots,n$ を出目とするルーレットを $k$ 回まわす試行において、各 $i$ について $i$ が出た回数を $S_{n,k,i}$ とし、$\displaystyle\lim_{k\to\infty}\frac{S_{n,k,i}}{k}=\int_{\frac{i-1}{n}}^{\frac in}f(x)\,dx$ が成り立つとする。このとき (1) の等式 $\displaystyle\int_{0}^{1}f(x)dx=1$ が成り立つことを示す`,
          answer: String.raw`$\displaystyle\sum_{i=1}^{n}S_{n,k,i}=k$ の両辺を $k$ で割って $k\to\infty$ とする`,
          approach: String.raw`「全部で $k$ 回まわした」という当たり前の式を書き、極限をとるだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k$ 回まわすのだから、出た回数の合計は $k$ である。`,
            },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{n}S_{n,k,i}=k,\qquad\text{すなわち}\qquad\sum_{i=1}^{n}\frac{S_{n,k,i}}{k}=1`,
            },
            {
              k: "p",
              t: String.raw`である。これは $k$ によらず成り立つので、$k\to\infty$ としてよい。和は有限個なので極限は各項の極限の和になり、仮定 $(**)$ より`,
            },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{n}\int_{\frac{i-1}{n}}^{\frac in}f(x)\,dx=1`,
            },
            { k: "p", t: String.raw`である。左辺は区間をつなぐと $\displaystyle\int_{0}^{1}f(x)\,dx$ なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}f(x)\,dx=1`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`有限個の和なので極限と和を入れかえてよい。ここを言っておくと丁寧である。`,
          ],
          check: String.raw`$n$ を変えても、小区間の積分の和はつねに $\displaystyle\int_{0}^{1}f\,dx$ になった。`,
        },
        {
          label: "(4)",
          task: String.raw`(3) の試行において出た数の平均値を $A_{n,k}$ とし、$A_{n}=\displaystyle\lim_{k\to\infty}A_{n,k}$ とする。$(**)$ が成り立つとき、極限 $\displaystyle\lim_{n\to\infty}\frac{A_{n}}{n}$ を $a$ を用いて表す`,
          answer: String.raw`$\dfrac13-\dfrac{\cos2a}{3a}+\dfrac{\sin2a}{6a^{2}}$（$\cos2a=1-a$ を使うと $\dfrac23-\dfrac{1}{3a}+\dfrac{\sqrt{2a-a^{2}}}{6a^{2}}$）`,
          approach: String.raw`$\dfrac{A_{n}}{n}=\displaystyle\sum_{i=1}^{n}\frac in\int_{\frac{i-1}{n}}^{\frac in}f\,dx$ を、(2) の不等式で区分求積ではさむ。極限は $\displaystyle\int_{0}^{1}xf(x)dx$ になる。`,
          blocks: [
            { k: "p", t: String.raw`平均値は $A_{n,k}=\dfrac1k\displaystyle\sum_{i=1}^{n}i\,S_{n,k,i}$ なので、$k\to\infty$ として` },
            {
              k: "math",
              t: String.raw`A_{n}=\sum_{i=1}^{n}i\int_{\frac{i-1}{n}}^{\frac in}f(x)\,dx,\qquad\frac{A_{n}}{n}=\sum_{i=1}^{n}\frac in\int_{\frac{i-1}{n}}^{\frac in}f(x)\,dx`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**はさむ。** (2) を $b=\dfrac{i-1}{n}$、$c=\dfrac in$ で使うと`,
            },
            {
              k: "math",
              t: String.raw`\frac1nf\left(\frac{i-1}{n}\right)\leqq\int_{\frac{i-1}{n}}^{\frac in}f(x)\,dx\leqq\frac1nf\left(\frac in\right)`,
            },
            { k: "p", t: String.raw`なので、$\dfrac in>0$ を掛けて足し合わせると` },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{n}\frac in f\left(\frac{i-1}{n}\right)\frac1n\leqq\frac{A_{n}}{n}\leqq\sum_{i=1}^{n}\frac in f\left(\frac in\right)\frac1n`,
            },
            {
              k: "p",
              t: String.raw`である。両端はどちらも $xf(x)$ の区分求積なので、$n\to\infty$ で $\displaystyle\int_{0}^{1}xf(x)\,dx$ に収束する。はさみうちの原理より`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{A_{n}}{n}=\int_{0}^{1}xf(x)\,dx`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**計算する。** $f(x)=\dfrac23\left(1+\sin2ax\right)$ なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}xf(x)\,dx=\frac23\left(\int_{0}^{1}x\,dx+\int_{0}^{1}x\sin2ax\,dx\right)=\frac23\left(\frac12+I\right)`,
            },
            { k: "p", t: String.raw`である。部分積分で` },
            {
              k: "math",
              t: String.raw`I=\left[-\frac{x\cos2ax}{2a}\right]_{0}^{1}+\frac{1}{2a}\int_{0}^{1}\cos2ax\,dx=-\frac{\cos2a}{2a}+\frac{\sin2a}{4a^{2}}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{A_{n}}{n}=\frac13-\frac{\cos2a}{3a}+\frac{\sin2a}{6a^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(1) より $\cos2a=1-a$ なので、$\sin2a=\sqrt{1-\left(1-a\right)^{2}}=\sqrt{2a-a^{2}}$（$0<2a\leqq\dfrac\pi2$ なので正）である。これを入れると`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{A_{n}}{n}=\frac23-\frac{1}{3a}+\frac{\sqrt{2a-a^{2}}}{6a^{2}}`,
            },
            { k: "p", t: String.raw`とも書ける。どちらも数値では $0.5507\cdots$ である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{A_{n}}{n}$ はそのままでは区分求積の形ではない。(2) で小区間の積分を長方形ではさんでから区分求積に持ちこむ。`,
            String.raw`$\dfrac in$ を掛けるとき、不等式の向きが変わらないこと（正の数を掛けている）を確かめる。`,
          ],
          check: String.raw`$n=1000$ で $\dfrac{A_{n}}{n}=0.551290$ となり、$\displaystyle\int_{0}^{1}xf(x)dx=0.550790532$ に近づいた。`,
        },
      ],
    },
  ],
};
