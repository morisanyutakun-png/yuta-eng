import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2022年度（令和4年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第3問は問題に正方形の図が添えられているが、言葉で足りるので当サイトでは図を置いていない。
 */

/** 第1問の $f\left(x\right)=\dfrac{\log x}{x}$。 */
const F22 = (x: number): number => Math.log(x) / x;
/** 第1問の直線 $y=\dfrac{\log2}{2}$。 */
const LINE22 = Math.log(2) / 2;

/** 第2問の図。$\mathrm{O}\left(0,0\right)$、$\mathrm{A}\left(4,0\right)$、$\mathrm{B}\left(1,3\right)$ の場合。 */
const OA22: [number, number] = [4, 0];
const OB22: [number, number] = [1, 3];
const A22 = 4;
const B22 = Math.sqrt(10);
const C22 = Math.sqrt(18);
const K22 = A22 + B22 + C22;
const I22: [number, number] = [
  (B22 * OA22[0] + A22 * OB22[0]) / K22,
  (B22 * OA22[1] + A22 * OB22[1]) / K22,
];
/** 内接円の半径（$\mathrm{I}$ から $\mathrm{OA}$（$x$ 軸）までの距離）。 */
const R22 = I22[1];
const L22: [number, number] = [OA22[0] / 2, OA22[1] / 2];
const M22: [number, number] = [OB22[0] / 2, OB22[1] / 2];
const N22: [number, number] = [(OA22[0] + OB22[0]) / 2, (OA22[1] + OB22[1]) / 2];
const Q22: [number, number] = [
  ((C22 + B22 - A22) * OA22[0] + (C22 + A22 - B22) * OB22[0]) / (2 * C22),
  ((C22 + B22 - A22) * OA22[1] + (C22 + A22 - B22) * OB22[1]) / (2 * C22),
];
const P22: [number, number] = [Q22[0] / 2, Q22[1] / 2];

export const ncuMed2022: SolutionSet = {
  slug: "ncu-med",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法・積分法",
      topics: ["増減と凹凸", "グラフの形から解の個数", "m の n 乗 = n の m 乗 の整数解", "面積の計算"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$f\\left(e\\right)=\\tfrac1e=0.3678794$、変曲点は $x=e^{\\frac32}=4.4816891$ で $y=0.3346952=\\tfrac{3}{2e^{3/2}}$",
          "$m<n\\leqq199$ の全探索で $m^{n}=n^{m}$ を満たすのは $\\left(2,4\\right)$ だけだった",
          "面積を数値積分すると $0.0275323$ で、$\\tfrac32\\left(\\log2\\right)^{2}-\\log2=0.0275323$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x>0$ で定義された $f\left(x\right)=\dfrac{\log x}{x}$ の増減と極値、$y=f\left(x\right)$ の凹凸と変曲点を調べ、グラフの概形をかく（$\displaystyle\lim_{x\to\infty}f\left(x\right)=0$ は使ってよい）`,
          answer: String.raw`$x=e$ で極大値 $\dfrac1e$、変曲点は $\left(e^{\frac32},\dfrac{3}{2e^{\frac32}}\right)$`,
          approach: String.raw`商の微分を2回。$f'$ と $f''$ の分子の符号だけ見ればよい。`,
          blocks: [
            { k: "math", t: String.raw`f'\left(x\right)=\frac{\frac1x\cdot x-\log x}{x^{2}}=\frac{1-\log x}{x^{2}}` },
            {
              k: "p",
              t: String.raw`である。$x^{2}>0$ なので符号は $1-\log x$ で決まり、$0<x<e$ で $f'>0$、$x>e$ で $f'<0$ である。よって $x=e$ で**極大値 $\dfrac1e$** をとる。`,
            },
            {
              k: "math",
              t: String.raw`f''\left(x\right)=\frac{-\frac1x\cdot x^{2}-\left(1-\log x\right)\cdot2x}{x^{4}}=\frac{-1-2\left(1-\log x\right)}{x^{3}}=\frac{2\log x-3}{x^{3}}`,
            },
            {
              k: "p",
              t: String.raw`である。$x^{3}>0$ なので符号は $2\log x-3$ で決まり、$0<x<e^{\frac32}$ で上に凸、$x>e^{\frac32}$ で下に凸である。よって変曲点は`,
            },
            {
              k: "math",
              t: String.raw`\left(e^{\frac32},\ \frac{3}{2e^{\frac32}}\right)=\left(e\sqrt e,\ \frac{3}{2e\sqrt e}\right)`,
            },
            {
              k: "p",
              t: String.raw`である。また $x\to+0$ では $\log x\to-\infty$、$\dfrac1x\to+\infty$ なので $f\left(x\right)\to-\infty$、$x\to\infty$ では $f\left(x\right)\to0$ である。$f\left(1\right)=0$ で、$0<x<1$ では $f<0$、$x>1$ では $f>0$ である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "y = (log x)/x のグラフ。x が 0 に近づくと下に落ち、x = 1 で x 軸と交わり、x = e で極大値 1/e、x = e の 1.5 乗で変曲点をもち、そのあとは 0 に近づく。",
                view: [-0.3, 6.3, -1.5, 0.6],
                items: [
                  { k: "curve", f: F22, from: 0.5, to: 6.3 },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [Math.E, 1 / Math.E], label: "極大", place: "above" },
                  {
                    k: "dot",
                    at: [Math.exp(1.5), 1.5 / Math.exp(1.5)],
                    label: "変曲点",
                    place: "above-right",
                  },
                ],
              },
            },
          ],
          check: String.raw`数値で $f\left(e\right)=0.3678794=\dfrac1e$、変曲点の $y$ 座標 $0.3346952=\dfrac{3}{2e^{3/2}}$ を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`$m<n$ である自然数の組で $m^{n}=n^{m}$ を満たすものをすべて求める`,
          answer: String.raw`$\left(m,n\right)=\left(2,4\right)$`,
          approach: String.raw`両辺の対数をとると $\dfrac{\log m}{m}=\dfrac{\log n}{n}$、つまり $f\left(m\right)=f\left(n\right)$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$m,n$ は自然数なので正で、$m^{n}=n^{m}$ の両辺の自然対数をとると` },
            {
              k: "math",
              t: String.raw`n\log m=m\log n,\qquad\frac{\log m}{m}=\frac{\log n}{n},\qquad f\left(m\right)=f\left(n\right)`,
            },
            {
              k: "p",
              t: String.raw`である。(1) より $f$ は $0<x\leqq e$ で増加、$x\geqq e$ で減少する。$m<n$ で $f\left(m\right)=f\left(n\right)$ となるには、$m$ と $n$ が $e$ をはさんでいなければならない。すなわち $m<e<n$ で、自然数 $m$ は $1$ か $2$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$m=1$ … $f\left(1\right)=0$ なので $\log n=0$、$n=1$ となり $m<n$ に反する。`,
                String.raw`$m=2$ … $f\left(2\right)=\dfrac{\log2}{2}=\dfrac{2\log2}{4}=\dfrac{\log4}{4}=f\left(4\right)$ なので $n=4$。$f$ は $x>e$ で狭義単調減少だから、$f\left(n\right)=f\left(2\right)$ を満たす $n>e$ はこれだけである。`,
              ],
            },
            { k: "p", t: String.raw`実際 $2^{4}=16=4^{2}$ で成り立つ。よって` },
            { k: "math", t: String.raw`\left(m,n\right)=\left(2,4\right)` },
            { k: "p", t: String.raw`だけである。` },
          ],
          pitfalls: [
            String.raw`$f$ が $e$ の前後で増加・減少に分かれるので、$f\left(m\right)=f\left(n\right)$ となる組は「$e$ をはさむ2つ」しかありえない。`,
          ],
          check: String.raw`$m<n\leqq199$ を全探索すると、$m^{n}=n^{m}$ を満たすのは $\left(2,4\right)$ だけだった。`,
        },
        {
          label: "(3)",
          task: String.raw`曲線 $y=f\left(x\right)$ と直線 $y=\dfrac{\log2}{2}$ で囲まれた図形の面積を求める`,
          answer: String.raw`$\dfrac32\left(\log2\right)^{2}-\log2$`,
          approach: String.raw`(2) で見たとおり、交点は $x=2$ と $x=4$ の2つだけ。$\displaystyle\int\frac{\log x}{x}dx=\frac{\left(\log x\right)^{2}}{2}$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\dfrac{\log2}{2}=f\left(2\right)=f\left(4\right)$ なので、交点の $x$ 座標は $2$ と $4$ である。(1) の増減より、$f\left(x\right)=f\left(2\right)$ を満たす $x$ はこの2つだけである。`,
            },
            {
              k: "p",
              t: String.raw`$2<e<4$ で、$f$ は $x=e$ で最大値 $\dfrac1e=0.367\ldots$ をとり、これは $\dfrac{\log2}{2}=0.346\ldots$ より大きい。よって $2<x<4$ では曲線が直線の上にある。したがって`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{2}^{4}\left(\frac{\log x}{x}-\frac{\log2}{2}\right)dx`,
            },
            { k: "p", t: String.raw`である。$\left\{\dfrac{\left(\log x\right)^{2}}{2}\right\}'=\dfrac{\log x}{x}$ なので` },
            {
              k: "math",
              t: String.raw`\int_{2}^{4}\frac{\log x}{x}dx=\left[\frac{\left(\log x\right)^{2}}{2}\right]_{2}^{4}=\frac{\left(\log4\right)^{2}-\left(\log2\right)^{2}}{2}`,
            },
            { k: "p", t: String.raw`で、$\log4=2\log2$ だから` },
            {
              k: "math",
              t: String.raw`=\frac{4\left(\log2\right)^{2}-\left(\log2\right)^{2}}{2}=\frac32\left(\log2\right)^{2}`,
            },
            { k: "p", t: String.raw`である。また $\displaystyle\int_{2}^{4}\frac{\log2}{2}dx=\frac{\log2}{2}\cdot2=\log2$ なので` },
            {
              k: "math",
              t: String.raw`S=\frac32\left(\log2\right)^{2}-\log2=\log2\left(\frac32\log2-1\right)`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "拡大図。縦だけを大きく引き伸ばしてある。曲線 y = (log x)/x と直線 y = (log 2)/2 は x = 2 と x = 4 で交わり、その間で曲線が上にある。塗った部分の面積はおよそ 0.0275 しかない。",
                view: [1.7, 4.4, 0.325, 0.381],
                items: [
                  { k: "fillBetween", top: F22, bottom: () => LINE22, from: 2, to: 4 },
                  { k: "curve", f: F22, from: 1.75, to: 4.35 },
                  { k: "seg", a: [1.75, LINE22], b: [4.35, LINE22] },
                  { k: "dot", at: [2, LINE22], label: "x = 2", place: "below-right" },
                  { k: "dot", at: [4, LINE22], label: "x = 4", place: "below-left" },
                  { k: "dot", at: [Math.E, 1 / Math.E], label: "極大", place: "above" },
                  { k: "text", at: [3.0, LINE22], label: "y = (log 2)/2", place: "below" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac32\log2=1.039\ldots>1$ なので正。値は $0.0275\ldots$）。`,
            },
          ],
          check: String.raw`数値積分すると $0.0275323$ で、$\dfrac32\left(\log2\right)^{2}-\log2=0.0275323$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "平面ベクトル",
      topics: ["内心の位置ベクトル", "2直線の交点", "接点までの長さ", "3点が一直線上にある"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "乱数で5通りの三角形をとり、$\\overrightarrow{\\mathrm{OI}}=\\tfrac{b\\overrightarrow{\\mathrm{OA}}+a\\overrightarrow{\\mathrm{OB}}}{a+b+c}$ から3辺までの距離が等しいことを確かめた（差は $10^{-16}$ 台）",
          "直線 $\\mathrm{IN}$ と直線 $\\mathrm{LM}$ の交点を連立で求めると、$\\tfrac{\\left(c+b-a\\right)\\overrightarrow{\\mathrm{OA}}+\\left(c+a-b\\right)\\overrightarrow{\\mathrm{OB}}}{4c}$ と一致した",
          "接点 $\\mathrm{Q}$ は $\\overrightarrow{\\mathrm{OQ}}=2\\overrightarrow{\\mathrm{OP}}$ を満たした",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`三角形 $\mathrm{OAB}$ で辺 $\mathrm{OA},\mathrm{OB},\mathrm{AB}$ の長さを $a,b,c$ とし、内接円 $C$ の中心を $\mathrm{I}$ とする。$\overrightarrow{\mathrm{OI}}$ を $a,b,c,\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OI}}=\dfrac{b\,\overrightarrow{\mathrm{OA}}+a\,\overrightarrow{\mathrm{OB}}}{a+b+c}$`,
          approach: String.raw`$\mathrm{O}$ からの角の二等分線が $\mathrm{AB}$ を $a:b$ に内分し、$\mathrm{I}$ がその線分を $\left(a+b\right):c$ に内分する、と2段階で進む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\angle\mathrm{O}$ の二等分線と辺 $\mathrm{AB}$ の交点を $\mathrm{D}$ とすると、角の二等分線の性質から $\mathrm{AD}:\mathrm{DB}=\mathrm{OA}:\mathrm{OB}=a:b$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=\frac{b\,\overrightarrow{\mathrm{OA}}+a\,\overrightarrow{\mathrm{OB}}}{a+b}`,
            },
            {
              k: "p",
              t: String.raw`である。また $\mathrm{AD}=\dfrac{a}{a+b}c$ なので、三角形 $\mathrm{OAD}$ で $\angle\mathrm{A}$ の二等分線を考えると、$\mathrm{I}$ は線分 $\mathrm{OD}$ を`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{OI}:\mathrm{ID}=\mathrm{AO}:\mathrm{AD}=a:\frac{a}{a+b}c=\left(a+b\right):c`,
            },
            { k: "p", t: String.raw`に内分する。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OI}}=\frac{a+b}{a+b+c}\overrightarrow{\mathrm{OD}}=\frac{b\,\overrightarrow{\mathrm{OA}}+a\,\overrightarrow{\mathrm{OB}}}{a+b+c}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{OA}}$ の係数が $b$、$\overrightarrow{\mathrm{OB}}$ の係数が $a$ と「たすきがけ」になる。頂点 $\mathrm{O}$ の係数は向かい合う辺の長さ $c$ で、3つの係数の和が分母になっている。`,
            },
          ],
          check: String.raw`乱数で5通りの三角形をとり、この点から3辺までの距離を計算すると、どれも等しかった（差は $10^{-16}$ 台）。`,
        },
        {
          label: "(2)",
          task: String.raw`辺 $\mathrm{OA},\mathrm{OB},\mathrm{AB}$ の中点を $\mathrm{L},\mathrm{M},\mathrm{N}$、直線 $\mathrm{IN}$ と直線 $\mathrm{LM}$ の交点を $\mathrm{P}$、円 $C$ と辺 $\mathrm{AB}$ の接点を $\mathrm{Q}$ とする。$\overrightarrow{\mathrm{OP}}$ を $a,b,c,\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ で表し、$\mathrm{O},\mathrm{P},\mathrm{Q}$ が一直線上にあることを示す`,
          answer: String.raw`$\overrightarrow{\mathrm{OP}}=\dfrac{\left(b+c-a\right)\overrightarrow{\mathrm{OA}}+\left(a+c-b\right)\overrightarrow{\mathrm{OB}}}{4c}$ で、$\overrightarrow{\mathrm{OQ}}=2\overrightarrow{\mathrm{OP}}$`,
          approach: String.raw`直線 $\mathrm{LM}$ は「$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ の係数の和が $\dfrac12$」という直線。これを使うと交点が一気に出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OL}}=\dfrac12\overrightarrow{\mathrm{OA}}$、$\overrightarrow{\mathrm{OM}}=\dfrac12\overrightarrow{\mathrm{OB}}$ なので、直線 $\mathrm{LM}$ 上の点は`,
            },
            {
              k: "math",
              t: String.raw`\left(1-s\right)\overrightarrow{\mathrm{OL}}+s\,\overrightarrow{\mathrm{OM}}=\frac{1-s}{2}\overrightarrow{\mathrm{OA}}+\frac s2\overrightarrow{\mathrm{OB}}`,
            },
            {
              k: "p",
              t: String.raw`と書ける。つまり**直線 $\mathrm{LM}$ は、$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ の係数の和が $\dfrac12$ になる点の集合**である。`,
            },
            {
              k: "p",
              t: String.raw`$k=a+b+c$ とおく。(1) より $\overrightarrow{\mathrm{OI}}=\dfrac bk\overrightarrow{\mathrm{OA}}+\dfrac ak\overrightarrow{\mathrm{OB}}$ で、係数の和は $\dfrac{a+b}{k}$ である。また $\overrightarrow{\mathrm{ON}}=\dfrac12\left(\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}\right)$ で係数の和は $1$ である。直線 $\mathrm{IN}$ 上の点を`,
            },
            {
              k: "math",
              t: String.raw`\left(1-t\right)\overrightarrow{\mathrm{OI}}+t\,\overrightarrow{\mathrm{ON}}`,
            },
            { k: "p", t: String.raw`とおくと、係数の和は $\left(1-t\right)\dfrac{a+b}{k}+t$ である。これが $\dfrac12$ になる $t$ を求める。$w=\dfrac{a+b}{k}$ とおくと $1-w=\dfrac ck$ で` },
            {
              k: "math",
              t: String.raw`w+t\left(1-w\right)=\frac12,\qquad t=\frac{\frac12-w}{1-w}=\frac{\frac{c-a-b}{2k}}{\frac ck}=\frac{c-a-b}{2c}`,
            },
            { k: "p", t: String.raw`である。このとき $1-t=\dfrac{a+b+c}{2c}=\dfrac k{2c}$ なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac k{2c}\cdot\frac{b\,\overrightarrow{\mathrm{OA}}+a\,\overrightarrow{\mathrm{OB}}}{k}+\frac{c-a-b}{2c}\cdot\frac{\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}}{2}`,
            },
            { k: "p", t: String.raw`となり、$\overrightarrow{\mathrm{OA}}$ の係数は` },
            {
              k: "math",
              t: String.raw`\frac b{2c}+\frac{c-a-b}{4c}=\frac{2b+c-a-b}{4c}=\frac{b+c-a}{4c}`,
            },
            { k: "p", t: String.raw`で、$\overrightarrow{\mathrm{OB}}$ の係数は同様に $\dfrac{a+c-b}{4c}$ である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac{\left(b+c-a\right)\overrightarrow{\mathrm{OA}}+\left(a+c-b\right)\overrightarrow{\mathrm{OB}}}{4c}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`次に $\mathrm{Q}$ を求める。頂点 $\mathrm{A}$ から内接円への2本の接線の長さは等しいので、辺 $\mathrm{OA}$ 上の接点までの長さと $\mathrm{AQ}$ は等しい。3頂点からの接線の長さを $x,y,z$（$\mathrm{O},\mathrm{A},\mathrm{B}$ の順）とおくと`,
            },
            {
              k: "math",
              t: String.raw`x+y=a,\qquad x+z=b,\qquad y+z=c`,
            },
            { k: "p", t: String.raw`で、辺々足して $2\left(x+y+z\right)=a+b+c$ だから` },
            {
              k: "math",
              t: String.raw`\mathrm{AQ}=y=\frac{a+b+c}{2}-b=\frac{a+c-b}{2}`,
            },
            { k: "p", t: String.raw`である。$\mathrm{Q}$ は線分 $\mathrm{AB}$ を $\mathrm{AQ}:\mathrm{QB}$ に内分するので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}=\overrightarrow{\mathrm{OA}}+\frac{\mathrm{AQ}}{c}\left(\overrightarrow{\mathrm{OB}}-\overrightarrow{\mathrm{OA}}\right)=\left(1-\frac{a+c-b}{2c}\right)\overrightarrow{\mathrm{OA}}+\frac{a+c-b}{2c}\overrightarrow{\mathrm{OB}}`,
            },
            { k: "p", t: String.raw`であり、$1-\dfrac{a+c-b}{2c}=\dfrac{b+c-a}{2c}$ だから` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}=\frac{\left(b+c-a\right)\overrightarrow{\mathrm{OA}}+\left(a+c-b\right)\overrightarrow{\mathrm{OB}}}{2c}=2\,\overrightarrow{\mathrm{OP}}`,
            },
            {
              k: "p",
              t: String.raw`である。$\overrightarrow{\mathrm{OQ}}$ が $\overrightarrow{\mathrm{OP}}$ の実数倍（$2$ 倍）なので、$\mathrm{O},\mathrm{P},\mathrm{Q}$ は一直線上にある。しかも $\mathrm{P}$ は線分 $\mathrm{OQ}$ の中点である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "三角形 OAB と内接円、内心 I、辺の中点 L, M, N、直線 IN と直線 LM の交点 P、内接円と辺 AB の接点 Q。P は線分 OQ の中点になる。",
                view: [-0.6, 4.8, -0.7, 3.5],
                items: [
                  { k: "seg", a: [0, 0], b: OA22 },
                  { k: "seg", a: [0, 0], b: OB22 },
                  { k: "seg", a: OA22, b: OB22 },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [
                      I22[0] + R22 * Math.cos(t),
                      I22[1] + R22 * Math.sin(t),
                    ],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "seg", a: L22, b: M22 },
                  { k: "seg", a: N22, b: I22 },
                  { k: "seg", a: I22, b: P22, dash: true },
                  { k: "seg", a: [0, 0], b: Q22, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: OA22, label: "A", place: "below-right" },
                  { k: "dot", at: OB22, label: "B", place: "above" },
                  { k: "dot", at: I22, label: "I", place: "right" },
                  { k: "dot", at: L22, label: "L", place: "below" },
                  { k: "dot", at: M22, label: "M", place: "left" },
                  { k: "dot", at: N22, label: "N", place: "right" },
                  { k: "dot", at: P22, label: "P", place: "left" },
                  { k: "dot", at: Q22, label: "Q", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ は線分 $\mathrm{IN}$ の内部にあるとは限らない。実際 $t=\dfrac{c-a-b}{2c}<0$（三角不等式より $c<a+b$）なので、$\mathrm{P}$ は $\mathrm{I}$ から見て $\mathrm{N}$ と反対側にある。`,
            String.raw`接点までの長さは $\mathrm{AQ}=\dfrac{a+c-b}{2}$。$\dfrac{b+c-a}{2}$ と取り違えない（$\mathrm{B}$ 側がそちら）。`,
          ],
          check: String.raw`乱数の三角形で $\mathrm{IN}$ と $\mathrm{LM}$ の交点を連立で求めると式と一致し、$\overrightarrow{\mathrm{OQ}}=2\overrightarrow{\mathrm{OP}}$ も成り立った。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["表裏の回数で場所が決まる", "4で割った余り", "二項係数の和", "余事象"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "表の回数 $h=0,\\ldots,10$ ごとに位置を分数のまま集計すると、$\\mathrm{P}$ は $\\mathrm{A}\\tfrac14$、$\\mathrm{B}\\tfrac{17}{64}$、$\\mathrm{C}\\tfrac14$、$\\mathrm{D}\\tfrac{15}{64}$",
          "$\\mathrm{Q}$ は $\\mathrm{A}\\tfrac{17}{64}$、$\\mathrm{B}\\tfrac14$、$\\mathrm{C}\\tfrac{15}{64}$、$\\mathrm{D}\\tfrac14$",
          "同じ頂点にある確率は $\\tfrac14$、異なる頂点にある確率は $\\tfrac34$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`1辺 $1$ の正方形 $\mathrm{ABCD}$ の辺上を、硬貨が表なら $2$、裏なら $1$ だけ動く点 $\mathrm{P},\mathrm{Q}$ を考える。$\mathrm{P}$ は $\mathrm{A}$ を出発点として時計回り、$\mathrm{Q}$ は $\mathrm{B}$ を出発点として反時計回りに動く。硬貨を10回投げて $\mathrm{P}$ のみを動かしたあと、$\mathrm{P}$ が頂点 $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ にある確率をそれぞれ求める`,
          answer: String.raw`$\mathrm{A}$ … $\dfrac14$、$\mathrm{B}$ … $\dfrac{17}{64}$、$\mathrm{C}$ … $\dfrac14$、$\mathrm{D}$ … $\dfrac{15}{64}$`,
          approach: String.raw`10回で進む距離は「$10+$（表の回数）」。$4$ で割った余りだけで頂点が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`表が $h$ 回（$h=0,1,\ldots,10$）出たとすると、進む距離は $2h+\left(10-h\right)=10+h$ である。1周が $4$ なので、$\mathrm{P}$ の位置は $10+h$ を $4$ で割った余りで決まる。時計回りに $\mathrm{A}\to\mathrm{D}\to\mathrm{C}\to\mathrm{B}\to\mathrm{A}$ と進むので、余りが $0,1,2,3$ のときそれぞれ $\mathrm{A},\mathrm{D},\mathrm{C},\mathrm{B}$ である。`,
            },
            { k: "p", t: String.raw`$10+h\equiv2+h\pmod4$ なので` },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{A}$（余り $0$）… $h\equiv2\pmod4$、つまり $h=2,6,10$`,
                String.raw`$\mathrm{D}$（余り $1$）… $h\equiv3\pmod4$、つまり $h=3,7$`,
                String.raw`$\mathrm{C}$（余り $2$）… $h\equiv0\pmod4$、つまり $h=0,4,8$`,
                String.raw`$\mathrm{B}$（余り $3$）… $h\equiv1\pmod4$、つまり $h=1,5,9$`,
              ],
            },
            { k: "p", t: String.raw`である。表が $h$ 回出る確率は $\dfrac{ {}_{10}\mathrm{C}_{h}}{2^{10}}=\dfrac{ {}_{10}\mathrm{C}_{h}}{1024}$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{A}\colon\frac{45+210+1}{1024}=\frac{256}{1024}=\frac14,\qquad\mathrm{D}\colon\frac{120+120}{1024}=\frac{240}{1024}=\frac{15}{64}`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{C}\colon\frac{1+210+45}{1024}=\frac14,\qquad\mathrm{B}\colon\frac{10+252+10}{1024}=\frac{272}{1024}=\frac{17}{64}`,
            },
            { k: "p", t: String.raw`である（合計 $\dfrac{256+240+256+272}{1024}=1$ で合う）。` },
          ],
          pitfalls: [
            String.raw`「表なら $2$」なので、10回で進む距離は $10$ から $20$ までの値をとる。$0$ から始まらない。`,
          ],
          check: String.raw`$h=0,\ldots,10$ ごとに分数のまま集計すると、$\dfrac14,\dfrac{17}{64},\dfrac14,\dfrac{15}{64}$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`さらに硬貨を10回投げて $\mathrm{Q}$ のみを動かしたあと、$\mathrm{P}$ と $\mathrm{Q}$ が異なる頂点にある確率を求める`,
          answer: String.raw`$\dfrac34$`,
          approach: String.raw`$\mathrm{Q}$ の分布も同じように出し、「同じ頂点にある」の余事象をとる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{Q}$ も表が $h$ 回なら $10+h$ だけ進む。反時計回りに $\mathrm{B}\to\mathrm{C}\to\mathrm{D}\to\mathrm{A}\to\mathrm{B}$ と進むので、余りが $0,1,2,3$ のときそれぞれ $\mathrm{B},\mathrm{C},\mathrm{D},\mathrm{A}$ である。(1) と同じ計算で`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{B}\colon\frac14,\qquad\mathrm{C}\colon\frac{15}{64},\qquad\mathrm{D}\colon\frac14,\qquad\mathrm{A}\colon\frac{17}{64}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{P}$ と $\mathrm{Q}$ の動きは独立なので、同じ頂点にある確率は`,
            },
            {
              k: "math",
              t: String.raw`\frac14\cdot\frac{17}{64}+\frac{17}{64}\cdot\frac14+\frac14\cdot\frac{15}{64}+\frac{15}{64}\cdot\frac14=\frac{17+17+15+15}{256}=\frac{64}{256}=\frac14`,
            },
            { k: "p", t: String.raw`である（順に $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ で一致する場合）。よって異なる頂点にある確率は` },
            { k: "math", t: String.raw`1-\frac14=\frac34` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ と $\mathrm{Q}$ は回る向きが逆なので、$\mathrm{P}$ が $\dfrac{17}{64}$ をとる頂点では $\mathrm{Q}$ は $\dfrac14$、というように入れ替わる。そのおかげで和がちょうど $\dfrac{64}{256}$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{Q}$ は $\mathrm{B}$ 出発で反時計回りなので、頂点の並びが $\mathrm{P}$ とは違う。$\mathrm{P}$ の表をそのまま使わない。`,
          ],
          check: String.raw`分数のまま掛けて足すと、同じ頂点にある確率は $\dfrac14$、異なる頂点は $\dfrac34$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["群数列", "累積項数", "等差×等比の和", "途中で切った和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "第13群まで実際に並べて $a_{500}=\\tfrac1{256}$ を確かめた",
          "$S_{k}=1+\\tfrac k{2^{k-1}}$ と $\\sum_{i=1}^{k}S_{i}=k+4-\\tfrac{k+2}{2^{k-1}}$ が $k=1,\\ldots,11$ で一致した",
          "$a_{1}$ から $a_{2022}$ までの和は $\\tfrac{1907}{128}=14.8984375$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`群に分けられた数列 $\left\{a_{n}\right\}$ で、第 $k$ 群の各項は $2^{-k+1}$、項数は $k+2^{k-1}$ である。$a_{500}$ を求める`,
          answer: String.raw`$a_{500}=\dfrac1{256}$`,
          approach: String.raw`第 $k$ 群までの項数の累計 $N_{k}$ を求め、$500$ がどの群に入るかを見る。`,
          blocks: [
            { k: "p", t: String.raw`第 $k$ 群までの項数の合計は` },
            {
              k: "math",
              t: String.raw`N_{k}=\sum_{i=1}^{k}\left(i+2^{i-1}\right)=\frac{k\left(k+1\right)}{2}+2^{k}-1`,
            },
            { k: "p", t: String.raw`である。具体的に計算すると` },
            {
              k: "steps",
              items: [
                String.raw`$N_{7}=28+127=155$`,
                String.raw`$N_{8}=36+255=291$`,
                String.raw`$N_{9}=45+511=556$`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので $N_{8}=291<500\leqq556=N_{9}$ である。よって $a_{500}$ は第9群の項で`,
            },
            { k: "math", t: String.raw`a_{500}=2^{-9+1}=2^{-8}=\frac1{256}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`第13群まで実際に並べて500番目を取り出すと $\dfrac1{256}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`第 $k$ 群の項の総和を $S_{k}$ とする。$S_{k}$ を $k$ で表し、$\displaystyle\sum_{i=1}^{k}S_{i}$ を求める`,
          answer: String.raw`$S_{k}=1+\dfrac k{2^{k-1}}$、$\displaystyle\sum_{i=1}^{k}S_{i}=k+4-\dfrac{k+2}{2^{k-1}}$`,
          approach: String.raw`$S_{k}$ は（項数）×（各項）。和のほうは $\displaystyle\sum\frac i{2^{i-1}}$ で、$\dfrac12$ 倍してずらす。`,
          blocks: [
            { k: "p", t: String.raw`第 $k$ 群は $2^{-k+1}$ が $k+2^{k-1}$ 個並ぶので` },
            {
              k: "math",
              t: String.raw`S_{k}=\left(k+2^{k-1}\right)\cdot2^{-k+1}=\frac{k}{2^{k-1}}+1`,
            },
            {
              k: "p",
              t: String.raw`である（$k=1,2,3,4$ で $2,2,\dfrac74,\dfrac32$ となり、$1+1$、$4\times\dfrac12$、$7\times\dfrac14$、$12\times\dfrac18$ と合う）。`,
            },
            { k: "p", t: String.raw`次に $T=\displaystyle\sum_{i=1}^{k}\frac i{2^{i-1}}$ を求める。` },
            {
              k: "math",
              t: String.raw`T=1+\frac2{2}+\frac3{2^{2}}+\cdots+\frac k{2^{k-1}}`,
            },
            {
              k: "math",
              t: String.raw`\frac T2=\phantom{1+{}}\frac1{2}+\frac2{2^{2}}+\cdots+\frac{k-1}{2^{k-1}}+\frac k{2^{k}}`,
            },
            { k: "p", t: String.raw`辺々引くと` },
            {
              k: "math",
              t: String.raw`\frac T2=1+\frac12+\frac1{2^{2}}+\cdots+\frac1{2^{k-1}}-\frac k{2^{k}}=2-\frac1{2^{k-1}}-\frac k{2^{k}}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`T=4-\frac2{2^{k-1}}-\frac k{2^{k-1}}=4-\frac{k+2}{2^{k-1}}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{k}S_{i}=\sum_{i=1}^{k}\left(1+\frac i{2^{i-1}}\right)=k+4-\frac{k+2}{2^{k-1}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$k=1,\ldots,11$ で、直接の和と式が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{1}$ から $a_{2022}$ までの和を求める`,
          answer: String.raw`$\dfrac{1907}{128}$`,
          approach: String.raw`$2022$ が第何群かを調べ、「手前の群までの総和」＋「その群の途中までの分」に分ける。`,
          blocks: [
            { k: "p", t: String.raw`(1) の $N_{k}$ に $k=10,11$ を入れると` },
            {
              k: "math",
              t: String.raw`N_{10}=55+1023=1078,\qquad N_{11}=66+2047=2113`,
            },
            {
              k: "p",
              t: String.raw`なので $N_{10}=1078<2022\leqq2113=N_{11}$ で、$a_{2022}$ は第11群の項である。第11群の中では $2022-1078=944$ 番目で、各項は $2^{-10}=\dfrac1{1024}$ である。`,
            },
            { k: "p", t: String.raw`よって求める和は` },
            {
              k: "math",
              t: String.raw`\sum_{i=1}^{10}S_{i}+944\cdot\frac1{1024}=\left(10+4-\frac{12}{2^{9}}\right)+\frac{944}{1024}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{12}{512}=\dfrac3{128}$、$\dfrac{944}{1024}=\dfrac{59}{64}=\dfrac{118}{128}$ なので` },
            {
              k: "math",
              t: String.raw`14-\frac3{128}+\frac{118}{128}=14+\frac{115}{128}=\frac{1907}{128}`,
            },
            { k: "p", t: String.raw`である（$14.898\ldots$）。` },
          ],
          pitfalls: [
            String.raw`第11群の項数は $11+2^{10}=1035$ で、$944$ はその範囲に収まる。群をまたいでいないか確かめる。`,
          ],
          check: String.raw`実際に第13群まで並べて先頭 $2022$ 項を足すと $\dfrac{1907}{128}=14.8984375$ だった。`,
        },
      ],
    },
  ],
};
