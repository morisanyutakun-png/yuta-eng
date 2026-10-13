import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2021年度（令和3年度）一般選抜 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第2問の図。楕円 $E\colon\tfrac{x^{2}}4+y^{2}=1$ と内接する正方形。 */
const S5 = 2 / Math.sqrt(5);

/** 第5問の図。$a=\tfrac25$ の例。 */
const A5K = 0.4;
const Q5K = (x: number): number => x * x - x ** 4;
const PAR5K = (x: number): number => x * x;

export const kagakudai2021: SolutionSet = {
  slug: "kagakudai",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "場合の数・数列",
      topics: ["桁ごとの数え上げ", "等比数列の和", "項を上から押さえる", "不等式の証明"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$k=1,\\ldots,5$ で $10^{k-1}$ 以上 $10^{k}$ 未満の「$9$ を含まない正の整数」を数えると $8,72,648,5832,52488$ で、$8\\cdot9^{k-1}$ と一致した",
          "$k=1,\\ldots,5$ での $\\sum b_{n}$ は $2.72,4.77,6.59,8.22,9.69$ で、評価 $80\\left(1-\\left(\\tfrac9{10}\\right)^{k}\\right)$ の $8.0,15.2,21.7,27.5,32.8$ より小さかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の整数に関する条件 $(*)$「10進法で表したときに、どの位にも数字 $9$ が現れない」を考える。$k$ を正の整数とするとき、$10^{k-1}$ 以上かつ $10^{k}$ 未満であって $(*)$ を満たす正の整数の個数 $a_{k}$ を $k$ の式で表す`,
          answer: String.raw`$a_{k}=8\cdot9^{k-1}$`,
          approach: String.raw`$10^{k-1}$ 以上 $10^{k}$ 未満の整数は $k$ 桁の数。各位を上から順に決めていく。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$10^{k-1}\leqq n<10^{k}$ の整数 $n$ は、ちょうど $k$ 桁の数である。各位の数字の選び方を数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`最上位：$0$ は使えず $9$ も使えないので $1,2,\ldots,8$ の **8通り**`,
                String.raw`残りの $k-1$ 桁：$9$ 以外の $0,1,\ldots,8$ で **9通りずつ**`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            { k: "math", t: String.raw`a_{k}=8\cdot9^{k-1}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$k=1,\ldots,5$ で数え上げると $8,72,648,5832,52488$ で、この式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`正の整数 $n$ に対して、$n$ が $(*)$ を満たすとき $b_{n}=\dfrac1n$、満たさないとき $b_{n}=0$ とおく。すべての正の整数 $k$ に対して $\displaystyle\sum_{n=1}^{10^{k}-1}b_{n}<80$ が成り立つことを示す`,
          answer: String.raw`桁数ごとにまとめ、$j$ 桁の項を $\dfrac{1}{10^{j-1}}$ で上から押さえると、等比級数の和 $80\left(1-\left(\tfrac9{10}\right)^{k}\right)$ になる`,
          approach: String.raw`$\dfrac1n$ は $n$ が大きいほど小さい。$j$ 桁の数は $10^{j-1}$ 以上なので、どの項も $\dfrac{1}{10^{j-1}}$ 以下である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$b_{n}\neq0$ になるのは $n$ が $(*)$ を満たすときだけなので、和は「$10^{k}$ 未満で $(*)$ を満たす $n$ についての $\dfrac1n$ の和」である。これを桁数 $j$ で分ける。`,
            },
            {
              k: "p",
              t: String.raw`$j$ 桁の数は $n\geqq10^{j-1}$ なので $\dfrac1n\leqq\dfrac{1}{10^{j-1}}$ である。$j$ 桁で $(*)$ を満たすものは (1) より $a_{j}=8\cdot9^{j-1}$ 個だから`,
            },
            {
              k: "math",
              t: String.raw`\sum_{j\ \text{桁}}\frac1n\leqq\frac{a_{j}}{10^{j-1}}=\frac{8\cdot9^{j-1}}{10^{j-1}}=8\left(\frac{9}{10}\right)^{j-1}`,
            },
            { k: "p", t: String.raw`である。$j=1$ から $k$ まで足すと、公比 $\dfrac9{10}$ の等比数列の和になり` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{10^{k}-1}b_{n}\leqq\sum_{j=1}^{k}8\left(\frac{9}{10}\right)^{j-1}=8\cdot\frac{1-\left(\frac9{10}\right)^{k}}{1-\frac9{10}}=80\left\{1-\left(\frac{9}{10}\right)^{k}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left(\dfrac9{10}\right)^{k}>0$ なので右辺は $80$ より小さい。したがって`,
            },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{10^{k}-1}b_{n}<80`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`これは「ケンプナー級数」と呼ばれる有名な級数で、実際の和は $k\to\infty$ で $22.92\cdots$ に収束する。$80$ はかなりゆるい評価だが、それでも $9$ を含む数を除くだけで調和級数が収束に変わる、というのが面白いところである。`,
            },
          ],
          pitfalls: [
            String.raw`桁数ごとに「個数 × いちばん大きい項」で押さえる。1つずつ足そうとすると終わらない。`,
            String.raw`$j$ 桁の数の最小は $10^{j-1}$。ここで $\dfrac1n$ が最大になる。`,
          ],
          check: String.raw`$k=5$ では実際の和が $9.69$ で、評価値 $32.76$ よりも小さかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "図形と方程式",
      topics: ["楕円と直線", "判別式", "平行な2弦", "内接する正方形"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b$ を細かく動かして判別式の符号を調べると、2点で交わる条件は $b^{2}<4a^{2}+1$ と一致した",
          "弦の長さの2乗 $\\dfrac{4a^{2}+1-b^{2}}{\\left(\\frac14+a^{2}\\right)^{2}}$ が $b$ と $-b$ で同じ値になった",
          "$\\left(\\pm\\tfrac{2}{\\sqrt5},\\pm\\tfrac{2}{\\sqrt5}\\right)$ は4点とも楕円上にあり、4辺が $1.788854382$、2本の対角線が $2.529822128$ の正方形だった",
          "$\\vec u=\\left(2\\cos\\theta,\\sin\\theta\\right)$ を $90^{\\circ}$ 回した $\\vec v$ も楕円上にある $\\theta$ を全部探すと4つで、どれも $\\cos^{2}\\theta=\\tfrac15$、同じ正方形になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面上の楕円 $E\colon\dfrac{x^{2}}{4}+y^{2}=1$ について、$a,b$ を実数とするとき、直線 $\ell\colon y=ax+b$ と $E$ が異なる2点を共有するための $a,b$ の条件を求める`,
          answer: String.raw`$b^{2}<4a^{2}+1$`,
          approach: String.raw`代入して $x$ の2次方程式にし、判別式が正であることを書くだけ。$x^{2}$ の係数は必ず正なので、2次方程式になることは保証されている。`,
          blocks: [
            { k: "p", t: String.raw`$y=ax+b$ を $E$ の式に代入すると` },
            {
              k: "math",
              t: String.raw`\frac{x^{2}}{4}+\left(ax+b\right)^{2}=1,\qquad\left(\frac14+a^{2}\right)x^{2}+2abx+\left(b^{2}-1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac14+a^{2}>0$ なので必ず $x$ の2次方程式で、異なる2つの実数解をもつ条件は判別式が正であることである。`,
            },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=\left(ab\right)^{2}-\left(\frac14+a^{2}\right)\left(b^{2}-1\right)=a^{2}+\frac14-\frac{b^{2}}{4}`,
            },
            { k: "p", t: String.raw`である。$>0$ を4倍して` },
            {
              k: "math",
              t: String.raw`4a^{2}+1-b^{2}>0,\qquad\text{すなわち}\qquad b^{2}<4a^{2}+1`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$a,b$ を $0.1$ 刻みで動かして判別式の符号を調べると、この条件と完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`実数 $a,b,c$ に対して直線 $\ell\colon y=ax+b$ と $m\colon y=ax+c$ が、それぞれ $E$ と異なる2点を共有しているとする（$b>c$）。$\ell$ と $E$ の2つの共有点のうち $x$ 座標の小さい方を $\mathrm{P}$、大きい方を $\mathrm{Q}$、$m$ と $E$ の2つの共有点のうち $x$ 座標の小さい方を $\mathrm{S}$、大きい方を $\mathrm{R}$ とするとき、$\overrightarrow{\mathrm{PQ}}=\overrightarrow{\mathrm{SR}}$ が成り立つための $a,b,c$ の条件を求める`,
          answer: String.raw`$c=-b$ かつ $0<b<\sqrt{4a^{2}+1}$`,
          approach: String.raw`2つの弦は同じ向きなので、$\overrightarrow{\mathrm{PQ}}=\overrightarrow{\mathrm{SR}}$ は「長さが等しい」と同じこと。弦の長さの2乗を $b$ で表すと、$b^{2}$ にしかよらないことが分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\ell$ も $m$ も傾き $a$ なので、$\overrightarrow{\mathrm{PQ}}$ と $\overrightarrow{\mathrm{SR}}$ はどちらも $\left(1,a\right)$ の正の定数倍である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=\overrightarrow{\mathrm{SR}}\iff x_{\mathrm{Q}}-x_{\mathrm{P}}=x_{\mathrm{R}}-x_{\mathrm{S}}`,
            },
            { k: "p", t: String.raw`である（つまり2つの弦の長さが等しい）。` },
            {
              k: "p",
              t: String.raw`(1) の2次方程式の2解を $x_{\mathrm{P}},x_{\mathrm{Q}}$ とすると、$A=\dfrac14+a^{2}$ とおいて`,
            },
            {
              k: "math",
              t: String.raw`\left(x_{\mathrm{Q}}-x_{\mathrm{P}}\right)^{2}=\left(x_{\mathrm{P}}+x_{\mathrm{Q}}\right)^{2}-4x_{\mathrm{P}}x_{\mathrm{Q}}=\frac{4a^{2}b^{2}}{A^{2}}-\frac{4\left(b^{2}-1\right)}{A}=\frac{4a^{2}+1-b^{2}}{A^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である（最後は (1) の判別式の計算をそのまま使った）。$A$ は $a$ だけで決まるので、弦の長さは $b^{2}$ にしかよらない。したがって`,
            },
            {
              k: "math",
              t: String.raw`x_{\mathrm{Q}}-x_{\mathrm{P}}=x_{\mathrm{R}}-x_{\mathrm{S}}\iff b^{2}=c^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$b>c$ より $b=c$ はありえないので $c=-b$ であり、$b>c=-b$ から $b>0$ である。さらに2直線がどちらも $E$ と2点で交わる条件は (1) より $b^{2}<4a^{2}+1$（$c^{2}=b^{2}$ なので $m$ の条件も同じ）である。よって`,
            },
            {
              k: "math",
              t: String.raw`c=-b\quad\text{かつ}\quad0<b<\sqrt{4a^{2}+1}`,
            },
            { k: "p", t: String.raw`である（$a$ は任意の実数）。` },
            {
              k: "note",
              t: String.raw`$c=-b$ は、2本の直線が原点について対称であることを意味する。このとき四角形 $\mathrm{PQRS}$ は原点を中心とする平行四辺形になる。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{PQ}}=\overrightarrow{\mathrm{SR}}$ の向きはどちらも「$x$ 座標が小さい方から大きい方へ」なので、長さだけ比べればよい。`,
            String.raw`$b>c$ があるので $b=c$ は除かれる。$b^{2}=c^{2}$ から $c=-b$ に絞る。`,
          ],
          check: String.raw`弦の長さの2乗を $b$ と $-b$ で計算すると、同じ値になった。`,
        },
        {
          label: "(3)",
          task: String.raw`楕円 $E$ 上の4点の組で、それらを4頂点とする四角形が正方形であるものをすべて求める`,
          answer: String.raw`$\left(\dfrac{2\sqrt5}{5},\dfrac{2\sqrt5}{5}\right)$、$\left(-\dfrac{2\sqrt5}{5},\dfrac{2\sqrt5}{5}\right)$、$\left(-\dfrac{2\sqrt5}{5},-\dfrac{2\sqrt5}{5}\right)$、$\left(\dfrac{2\sqrt5}{5},-\dfrac{2\sqrt5}{5}\right)$ の1組だけ`,
          approach: String.raw`正方形は平行四辺形なので、(2) の形から中心は原点である。すると対角線は原点を通る直交する2本で、長さも等しい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**中心は原点。** 正方形は平行四辺形である。対辺は $E$ の平行な2弦で、(2) より平行な2弦の長さが等しいのは2本が原点について対称なときだけだった。したがって正方形の中心は原点である。`,
            },
            {
              k: "p",
              t: String.raw`（$x\mapsto\dfrac x2$ で $E$ を単位円に写すと、平行四辺形は平行四辺形に移り、円に内接する平行四辺形は長方形なのでその中心は円の中心である、と考えてもよい。）`,
            },
            {
              k: "p",
              t: String.raw`**対角線。** 中心が原点なので、4頂点は $\pm\vec u$、$\pm\vec v$ の形である。正方形の2本の対角線は長さが等しく直交するので`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec u\right|=\left|\vec v\right|,\qquad\vec u\perp\vec v`,
            },
            {
              k: "p",
              t: String.raw`である。したがって $\vec v$ は $\vec u$ を $90^{\circ}$ 回したものである。$\vec u=\left(2\cos\theta,\ \sin\theta\right)$（$E$ 上の点）とすると`,
            },
            {
              k: "math",
              t: String.raw`\vec v=\left(-\sin\theta,\ 2\cos\theta\right)`,
            },
            { k: "p", t: String.raw`で、これも $E$ 上にある条件は` },
            {
              k: "math",
              t: String.raw`\frac{\sin^{2}\theta}{4}+4\cos^{2}\theta=1`,
            },
            { k: "p", t: String.raw`である。$4$ 倍して $\sin^{2}\theta=1-\cos^{2}\theta$ を使うと` },
            {
              k: "math",
              t: String.raw`1-\cos^{2}\theta+16\cos^{2}\theta=4,\qquad15\cos^{2}\theta=3,\qquad\cos^{2}\theta=\frac15`,
            },
            { k: "p", t: String.raw`である。このとき $\sin^{2}\theta=\dfrac45$ なので` },
            {
              k: "math",
              t: String.raw`\vec u=\left(2\cos\theta,\ \sin\theta\right)=\left(\pm\frac{2}{\sqrt5},\ \pm\frac{2}{\sqrt5}\right)`,
            },
            {
              k: "p",
              t: String.raw`（複号は独立）である。符号の組み合わせをどう選んでも、$\pm\vec u$ と $\pm\vec v$ の4点は同じ集合`,
            },
            {
              k: "math",
              t: String.raw`\left(\pm\frac{2\sqrt5}{5},\ \pm\frac{2\sqrt5}{5}\right)\quad\left(\text{複号は独立、4点}\right)`,
            },
            {
              k: "p",
              t: String.raw`になる。実際この4点は $E$ 上にあり（$\dfrac{4/5}{4}+\dfrac45=1$ ✓）、1辺 $\dfrac{4\sqrt5}{5}$、対角線 $\dfrac{4\sqrt{10}}{5}$ の正方形（軸に平行な正方形）である。よって求める組はこの1組だけである。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "楕円 E に内接する正方形はこの1つだけ。4頂点は (±2√5/5, ±2√5/5) ≒ (±0.894, ±0.894) で、各辺は座標軸に平行になる。",
                view: [-2.6, 2.6, -1.6, 1.6],
                step: { x: 1, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [2 * Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [S5, S5], b: [-S5, S5] },
                  { k: "seg", a: [-S5, S5], b: [-S5, -S5] },
                  { k: "seg", a: [-S5, -S5], b: [S5, -S5] },
                  { k: "seg", a: [S5, -S5], b: [S5, S5] },
                  { k: "seg", a: [S5, S5], b: [-S5, -S5], dash: true, faint: true },
                  { k: "seg", a: [-S5, S5], b: [S5, -S5], dash: true, faint: true },
                  { k: "dot", at: [S5, S5], label: "(2√5/5, 2√5/5)", place: "above-right" },
                  { k: "dot", at: [-S5, S5] },
                  { k: "dot", at: [-S5, -S5] },
                  { k: "dot", at: [S5, -S5] },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「中心が原点」をきちんと言う。(2) の結果か、単位円に写す変換で説明する。`,
            String.raw`$\vec v$ は $\vec u$ を $90^{\circ}$ 回したもの。「$\vec u$ と垂直で同じ長さ」という条件から決まる。`,
          ],
          check: String.raw`$\theta$ を細かく走査して $\vec v$ も $E$ 上にあるものを探すと、解は4つでどれも $\cos^{2}\theta=\tfrac15$、同じ正方形になった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数・数列",
      topics: ["二項係数の等式", "カタラン数", "増加の評価", "素数になる条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$n\\,{}_{2n}\\mathrm{C}_{n}=\\left(n+1\\right){}_{2n}\\mathrm{C}_{n-1}$ が $n=1$ から $29$ まで整数のまま一致した",
          "$a_{n}$ は $1,2,5,14,42,132,429,1430,\\ldots$（カタラン数）で、$n\\geqq4$ で $a_{n}>n+2$ も $a_{n}>2n-1$ も成り立った",
          "$1\\leqq n\\leqq200$ で $a_{n}$ が素数になるのは $n=2,3$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の整数 $n$ に対して $n\,{}_{2n}\mathrm{C}_{n}=\left(n+1\right){}_{2n}\mathrm{C}_{n-1}$ を示し、これを用いて $ {}_{2n}\mathrm{C}_{n}$ が $n+1$ の倍数であることを示す`,
          answer: String.raw`どちらも $\dfrac{\left(2n\right)!}{\left(n-1\right)!\,n!}$ に等しい。$n$ と $n+1$ が互いに素であることから倍数が従う`,
          approach: String.raw`両辺を階乗で書き下せば一瞬で一致する。倍数のほうは「互いに素」を使うのがポイント。`,
          blocks: [
            { k: "p", t: String.raw`**等式。** 階乗で書くと` },
            {
              k: "math",
              t: String.raw`n\,{}_{2n}\mathrm{C}_{n}=n\cdot\frac{\left(2n\right)!}{n!\,n!}=\frac{\left(2n\right)!}{\left(n-1\right)!\,n!}`,
            },
            {
              k: "math",
              t: String.raw`\left(n+1\right){}_{2n}\mathrm{C}_{n-1}=\left(n+1\right)\cdot\frac{\left(2n\right)!}{\left(n-1\right)!\left(n+1\right)!}=\frac{\left(2n\right)!}{\left(n-1\right)!\,n!}`,
            },
            { k: "p", t: String.raw`で、両辺は等しい ✓。` },
            {
              k: "p",
              t: String.raw`**倍数。** この等式より $n+1$ は $n\,{}_{2n}\mathrm{C}_{n}$ を割り切る。$n$ と $n+1$ の最大公約数は $1$（連続する整数）なので、$n+1$ は $ {}_{2n}\mathrm{C}_{n}$ を割り切る。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$n+1$ が $n\cdot{}_{2n}\mathrm{C}_{n}$ を割るだけでは足りない。$\gcd\left(n,n+1\right)=1$ を使って $n$ の側を外す。`,
          ],
          check: String.raw`$n=1$ から $29$ まで整数のまま計算して一致を確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`正の整数 $n$ に対して $a_{n}=\dfrac{ {}_{2n}\mathrm{C}_{n}}{n+1}$ とおくとき、$n\geqq4$ ならば $a_{n}>n+2$ であることを示す`,
          answer: String.raw`$\dfrac{a_{n+1}}{a_{n}}=\dfrac{2\left(2n+1\right)}{n+2}\geqq2$（$n\geqq1$）なので、$a_{4}=14>6$ から帰納法`,
          approach: String.raw`比を計算すると $2$ 以上になることが分かる。あとは出発点 $a_{4}=14$ からの帰納法。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $a_{n}$ は正の整数である。まず比を求める。` },
            {
              k: "math",
              t: String.raw`\frac{ {}_{2n+2}\mathrm{C}_{n+1}}{ {}_{2n}\mathrm{C}_{n}}=\frac{\left(2n+2\right)!}{\left\{\left(n+1\right)!\right\}^{2}}\cdot\frac{\left(n!\right)^{2}}{\left(2n\right)!}=\frac{\left(2n+1\right)\left(2n+2\right)}{\left(n+1\right)^{2}}=\frac{2\left(2n+1\right)}{n+1}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{a_{n+1}}{a_{n}}=\frac{2\left(2n+1\right)}{n+1}\cdot\frac{n+1}{n+2}=\frac{2\left(2n+1\right)}{n+2}`,
            },
            { k: "p", t: String.raw`である。$n\geqq1$ のとき` },
            {
              k: "math",
              t: String.raw`\frac{2\left(2n+1\right)}{n+2}\geqq2\iff4n+2\geqq2n+4\iff n\geqq1`,
            },
            { k: "p", t: String.raw`なので、$a_{n+1}\geqq2a_{n}$ である。` },
            {
              k: "p",
              t: String.raw`**帰納法。** $a_{4}=\dfrac{ {}_{8}\mathrm{C}_{4}}{5}=\dfrac{70}{5}=14>6=4+2$ ✓。`,
            },
            {
              k: "p",
              t: String.raw`$n\geqq4$ で $a_{n}>n+2$ と仮定すると`,
            },
            {
              k: "math",
              t: String.raw`a_{n+1}\geqq2a_{n}>2\left(n+2\right)=2n+4\geqq n+3=\left(n+1\right)+2`,
            },
            {
              k: "p",
              t: String.raw`である（$2n+4\geqq n+3\iff n\geqq-1$）。よって数学的帰納法より $n\geqq4$ のすべてで $a_{n}>n+2$ である。$\blacksquare$`,
            },
          ],
          check: String.raw`$a_{n}$ は $1,2,5,14,42,132,429,\ldots$ で、$n\geqq4$ ではつねに $n+2$ を上回った。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{n}$ が素数となる正の整数 $n$ をすべて求める`,
          answer: String.raw`$n=2,\ 3$`,
          approach: String.raw`$\left(n+1\right)a_{n}=2\left(2n-1\right)a_{n-1}$ という漸化式を使う。$a_{n}$ が素数 $p$ なら $p$ は $2\left(2n-1\right)$ を割るしかなく、大きさの評価と矛盾する。`,
          blocks: [
            { k: "p", t: String.raw`$a_{1}=1$（素数でない）、$a_{2}=2$、$a_{3}=5$、$a_{4}=14=2\cdot7$ である。` },
            {
              k: "p",
              t: String.raw`**漸化式。** (2) の比を $n$ を $n-1$ にずらして書くと（$n\geqq2$）`,
            },
            {
              k: "math",
              t: String.raw`\frac{a_{n}}{a_{n-1}}=\frac{2\left(2n-1\right)}{n+1},\qquad\text{すなわち}\qquad\left(n+1\right)a_{n}=2\left(2n-1\right)a_{n-1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**大きさの評価。** $a_{4}=14>7=2\cdot4-1$ である。$n\geqq4$ で $a_{n}>2n-1$ と仮定すると、$a_{n+1}\geqq2a_{n}>4n-2>2n+1=2\left(n+1\right)-1$（$4n-2>2n+1\iff2n>3$）なので、帰納法より`,
            },
            { k: "math", t: String.raw`n\geqq4\ \Longrightarrow\ a_{n}>2n-1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$n\geqq4$ では素数にならない。** $n\geqq4$ で $a_{n}=p$（素数）と仮定する。$a_{n}\geqq2a_{n-1}>a_{n-1}\geqq1$ なので $0<a_{n-1}<p$、よって $p\nmid a_{n-1}$ である。漸化式`,
            },
            {
              k: "math",
              t: String.raw`\left(n+1\right)p=2\left(2n-1\right)a_{n-1}`,
            },
            {
              k: "p",
              t: String.raw`の右辺は $p$ の倍数なので、$p$ は $2\left(2n-1\right)$ を割り切る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$p=2$ のとき：(2) より $a_{n}>n+2\geqq6$ なので $a_{n}=2$ はありえない`,
                String.raw`$p$ が奇数のとき：$p\mid2\left(2n-1\right)$ と $p$ が奇数より $p\mid2n-1$、よって $p\leqq2n-1$。しかし $a_{n}>2n-1$ なので矛盾`,
              ],
            },
            {
              k: "p",
              t: String.raw`いずれも矛盾するので、$n\geqq4$ では $a_{n}$ は素数にならない。`,
            },
            { k: "p", t: String.raw`**小さい $n$。** $a_{1}=1$（素数でない）、$a_{2}=2$（素数）、$a_{3}=5$（素数）である。よって` },
            { k: "math", t: String.raw`n=2,\ 3` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a_{n}$ はカタラン数である。$1,2,5,14,42,132,429,1430,\ldots$ と続き、素数になるのは $2$ と $5$ だけであることがこれで分かる。`,
            },
          ],
          pitfalls: [
            String.raw`$a_{n}>n+2$（(2) の結果）だけでは $p\leqq2n-1$ との矛盾が出ない。$a_{n}>2n-1$ をもう一段示す。`,
            String.raw`$p=2$ の場合を別に処理する。`,
          ],
          check: String.raw`$1\leqq n\leqq200$ で $a_{n}$ が素数になるのは $n=2,3$ だけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["内積による変形", "2乗の和を1つのベクトルにまとめる", "最大値", "等号成立の条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "単位球面上の乱数20万組で $F$ と $-2\\left(\\vec a+\\vec b+\\vec c\\right)\\cdot\\left(\\vec a+\\vec b+\\vec c-3\\vec d\\right)$ が一致した",
          "同じ乱択で $F$ の最大は $4.497553$ で、$M=\\tfrac92=4.5$ に迫った",
          "$\\mathrm{A}=\\mathrm{B}=\\left(\\tfrac78,-\\tfrac{\\sqrt{15}}8,0\\right)$ は球面上にあり、$F=4.500000000$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$S$ を原点 $\mathrm{O}$ を中心とする半径 $1$ の球面とし、$S$ 上を動く点 $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ に対して $F=2\left(\mathrm{AB}^{2}+\mathrm{BC}^{2}+\mathrm{CA}^{2}\right)-3\left(\mathrm{AD}^{2}+\mathrm{BD}^{2}+\mathrm{CD}^{2}\right)$ とおく。$\overrightarrow{\mathrm{OA}}=\vec a$ などとするとき、$F=k\left(\vec a+\vec b+\vec c\right)\cdot\left(\vec a+\vec b+\vec c-3\vec d\right)$ と書けることを示し、定数 $k$ を求める`,
          answer: String.raw`$k=-2$`,
          approach: String.raw`$\left|\vec a\right|=\cdots=1$ なので $\mathrm{AB}^{2}=2-2\vec a\cdot\vec b$ のように内積だけで書ける。$\vec s=\vec a+\vec b+\vec c$ とおくとまとまる。`,
          blocks: [
            { k: "p", t: String.raw`$\left|\vec a\right|=\left|\vec b\right|=\left|\vec c\right|=\left|\vec d\right|=1$ である。` },
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=\left|\vec a-\vec b\right|^{2}=2-2\vec a\cdot\vec b`,
            },
            { k: "p", t: String.raw`などなので、$\vec s=\vec a+\vec b+\vec c$ とおくと` },
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}+\mathrm{BC}^{2}+\mathrm{CA}^{2}=6-2\left(\vec a\cdot\vec b+\vec b\cdot\vec c+\vec c\cdot\vec a\right)=6-\left(\left|\vec s\right|^{2}-3\right)=9-\left|\vec s\right|^{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$\left|\vec s\right|^{2}=3+2\left(\vec a\cdot\vec b+\vec b\cdot\vec c+\vec c\cdot\vec a\right)$ を使った）。また`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AD}^{2}+\mathrm{BD}^{2}+\mathrm{CD}^{2}=6-2\vec s\cdot\vec d`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`F=2\left(9-\left|\vec s\right|^{2}\right)-3\left(6-2\vec s\cdot\vec d\right)=-2\left|\vec s\right|^{2}+6\vec s\cdot\vec d=-2\,\vec s\cdot\left(\vec s-3\vec d\right)`,
            },
            { k: "p", t: String.raw`となる。よって` },
            { k: "math", t: String.raw`k=-2` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          check: String.raw`単位球面上の乱数20万組で、$F$ と $-2\vec s\cdot\left(\vec s-3\vec d\right)$ が一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$ が球面 $S$ 上を動くときの $F$ の最大値 $M$ を求める`,
          answer: String.raw`$M=\dfrac92$`,
          approach: String.raw`(1) より $F=-2\left|\vec s\right|^{2}+6\vec s\cdot\vec d$。$\vec d$ は単位ベクトルなので $\vec s\cdot\vec d\leqq\left|\vec s\right|$。あとは $\left|\vec s\right|$ の2次関数になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $F=-2\left|\vec s\right|^{2}+6\vec s\cdot\vec d$ である。$\left|\vec d\right|=1$ なので` },
            {
              k: "math",
              t: String.raw`\vec s\cdot\vec d\leqq\left|\vec s\right|\left|\vec d\right|=\left|\vec s\right|`,
            },
            {
              k: "p",
              t: String.raw`で、等号は $\vec s\neq\vec0$ のとき $\vec d=\dfrac{\vec s}{\left|\vec s\right|}$ でとれる。よって $t=\left|\vec s\right|$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`F\leqq-2t^{2}+6t=-2\left(t-\frac32\right)^{2}+\frac92`,
            },
            {
              k: "p",
              t: String.raw`である。$t=\left|\vec a+\vec b+\vec c\right|$ は $0$ から $3$ までのすべての値をとれる（たとえば $\vec a=\vec b=\vec c$ なら $t=3$、適当に回せば連続的に $0$ まで動く）ので、$t=\dfrac32$ が実現できる。したがって`,
            },
            { k: "math", t: String.raw`M=\frac92` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`等号が成り立つのは「$\left|\vec a+\vec b+\vec c\right|=\dfrac32$ かつ $\vec d$ が $\vec a+\vec b+\vec c$ と同じ向き」のときである。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec d$ を自由に選べることを使って、先に $\vec s\cdot\vec d$ を最大にする。そのあと $\left|\vec s\right|$ の2次関数を考える。`,
            String.raw`$\left|\vec s\right|=\dfrac32$ が実際にとれることを確かめる。`,
          ],
          check: String.raw`乱択20万組での最大は $4.497553$ で、$\dfrac92=4.5$ に迫った。`,
        },
        {
          label: "(3)",
          task: String.raw`点 $\mathrm{C}$ の座標が $\left(-\dfrac14,\dfrac{\sqrt{15}}{4},0\right)$、点 $\mathrm{D}$ の座標が $\left(1,0,0\right)$ であるとき、$F=M$ となる $S$ 上の点 $\mathrm{A},\mathrm{B}$ の組をすべて求める`,
          answer: String.raw`$\mathrm{A}=\mathrm{B}=\left(\dfrac78,\ -\dfrac{\sqrt{15}}{8},\ 0\right)$ の1組だけ`,
          approach: String.raw`(2) の等号条件から $\vec s=\dfrac32\vec d$ が決まる。すると $\vec a+\vec b$ が決まり、その長さが $2$ になることから $\vec a=\vec b$ が従う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) の等号条件より $\left|\vec s\right|=\dfrac32$ かつ $\vec d=\dfrac{\vec s}{\left|\vec s\right|}$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\vec s=\frac32\vec d=\left(\frac32,\ 0,\ 0\right)`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\vec a+\vec b=\vec s-\vec c=\left(\frac32+\frac14,\ -\frac{\sqrt{15}}{4},\ 0\right)=\left(\frac74,\ -\frac{\sqrt{15}}{4},\ 0\right)`,
            },
            { k: "p", t: String.raw`である。この長さは` },
            {
              k: "math",
              t: String.raw`\left|\vec a+\vec b\right|=\sqrt{\frac{49}{16}+\frac{15}{16}}=\sqrt{4}=2`,
            },
            { k: "p", t: String.raw`である。一方、三角不等式より` },
            {
              k: "math",
              t: String.raw`\left|\vec a+\vec b\right|\leqq\left|\vec a\right|+\left|\vec b\right|=2`,
            },
            {
              k: "p",
              t: String.raw`で、等号が成り立つのは $\vec a$ と $\vec b$ が同じ向きのとき、すなわち（どちらも単位ベクトルなので）$\vec a=\vec b$ のときである。よって`,
            },
            {
              k: "math",
              t: String.raw`\vec a=\vec b=\frac12\left(\frac74,\ -\frac{\sqrt{15}}{4},\ 0\right)=\left(\frac78,\ -\frac{\sqrt{15}}{8},\ 0\right)`,
            },
            {
              k: "p",
              t: String.raw`である。実際 $\left(\dfrac78\right)^{2}+\left(\dfrac{\sqrt{15}}{8}\right)^{2}=\dfrac{49+15}{64}=1$ なので $S$ 上にある ✓。よって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{A}=\mathrm{B}=\left(\frac78,\ -\frac{\sqrt{15}}{8},\ 0\right)`,
            },
            { k: "p", t: String.raw`の1組だけである。` },
            {
              k: "note",
              t: String.raw`$\mathrm{A}$ と $\mathrm{B}$ が重なってしまうが、問題は「$S$ 上を動く点」としか言っていないのでこれでよい。このとき $\mathrm{AB}=0$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|\vec a+\vec b\right|=2$ は三角不等式の等号なので、$\vec a=\vec b$ に決まる。ここを見落とすと「無数にある」と誤答しかねない。`,
          ],
          check: String.raw`この点で $F$ を計算すると $4.500000000$ になった。`,
        },
      ],
    },
    {
      no: 5,
      field: "図形と方程式・積分法",
      topics: ["円が領域に含まれる条件", "媒介変数の消去", "回転体の体積", "バウムクーヘンでない断面法"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.3,0.49,0.5$ では円が $y\\geqq x^{2}$ にも $y\\geqq x^{2}-x^{4}$ にも含まれ、$a=0.501,0.52,0.6,0.8$ ではどちらにも含まれなかった",
          "$a=0.1,0.3,0.5$ で断面積の数値積分を行うと $0.127627201,0.088357293,0.049087385$ となり、$\\tfrac{(3-4a)\\pi}{64}$ と小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面上の円 $C\colon x^{2}+\left(y-a\right)^{2}=a^{2}$（$a>0$）が $y\geqq x^{2}$ で表される領域に含まれるための $a$ の範囲を求める`,
          answer: String.raw`$0<a\leqq\dfrac12$`,
          approach: String.raw`円の式から $x^{2}=2ay-y^{2}$ と $x^{2}$ を $y$ で表してしまえば、条件は $y$ だけの不等式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ は中心 $\left(0,a\right)$、半径 $a$ の円で、原点で $x$ 軸に接する。$C$ 上の点では`,
            },
            {
              k: "math",
              t: String.raw`x^{2}=a^{2}-\left(y-a\right)^{2}=2ay-y^{2},\qquad0\leqq y\leqq2a`,
            },
            { k: "p", t: String.raw`である。条件 $y\geqq x^{2}$ は` },
            {
              k: "math",
              t: String.raw`y\geqq2ay-y^{2}\iff y^{2}+y-2ay\geqq0\iff y\left(y+1-2a\right)\geqq0`,
            },
            {
              k: "p",
              t: String.raw`である。$0\leqq y\leqq2a$ で $y\geqq0$ なので、$y>0$ の部分では $y+1-2a\geqq0$、すなわち $y\geqq2a-1$ が必要十分である。これが $0<y\leqq2a$ のすべてで成り立つ条件は`,
            },
            { k: "math", t: String.raw`2a-1\leqq0,\qquad\text{すなわち}\qquad a\leqq\frac12` },
            { k: "p", t: String.raw`である。$a>0$ とあわせて` },
            { k: "math", t: String.raw`0<a\leqq\frac12` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=\dfrac12$ のとき $x^{2}=y-y^{2}$ で、$y-x^{2}=y^{2}\geqq0$ となり原点でだけ接する。`,
            },
          ],
          pitfalls: [
            String.raw`$x$ を消して $y$ の不等式にするのが近道。$y=\pm\sqrt{\cdots}$ と場合分けすると煩雑になる。`,
          ],
          check: String.raw`$a=0.49,0.5$ では円が領域に入り、$a=0.501$ では入らなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`円 $C$ が $y\geqq x^{2}-x^{4}$ で表される領域に含まれるための $a$ の範囲を求める`,
          answer: String.raw`$0<a\leqq\dfrac12$（(1) と同じ）`,
          approach: String.raw`同じく $x^{2}=2ay-y^{2}$ を代入する。$x^{4}$ の項が増えるが、$y$ で割ると $1-2a$ という定数項が決め手になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x^{2}-x^{4}\leqq x^{2}$ なので $\left\{y\geqq x^{2}\right\}\subset\left\{y\geqq x^{2}-x^{4}\right\}$ である。つまり (1) の範囲では必ず成り立つ。問題はそれより広くできるかどうかである。`,
            },
            { k: "p", t: String.raw`$C$ 上で $u=x^{2}=2ay-y^{2}$ とおくと、条件 $y\geqq x^{2}-x^{4}=u-u^{2}$ は` },
            {
              k: "math",
              t: String.raw`y-u+u^{2}\geqq0`,
            },
            { k: "p", t: String.raw`である。$y-u=y-2ay+y^{2}=y\left(1-2a+y\right)$、$u^{2}=y^{2}\left(2a-y\right)^{2}$ なので` },
            {
              k: "math",
              t: String.raw`y\left\{\left(1-2a\right)+y+y\left(2a-y\right)^{2}\right\}\geqq0`,
            },
            { k: "p", t: String.raw`である。$0<y\leqq2a$ では $y>0$ なので、条件は` },
            {
              k: "math",
              t: String.raw`g(y)=\left(1-2a\right)+y\left\{1+\left(2a-y\right)^{2}\right\}\geqq0\qquad\left(0<y\leqq2a\right)`,
            },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`**$a\leqq\dfrac12$ のとき。** $1-2a\geqq0$ で、$y\left\{1+\left(2a-y\right)^{2}\right\}>0$ なので $g(y)>0$ ✓。`,
            },
            {
              k: "p",
              t: String.raw`**$a>\dfrac12$ のとき。** $g$ は連続で $g(0)=1-2a<0$ なので、十分小さい $y>0$ で $g(y)<0$ となる。つまり原点のすぐ近くで円が曲線より下に出てしまう ✗。`,
            },
            { k: "p", t: String.raw`したがって求める範囲は` },
            { k: "math", t: String.raw`0<a\leqq\frac12` },
            { k: "p", t: String.raw`で、(1) と同じである。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 2/5 のとき。円 C（原点で x 軸に接する）は、放物線 y = x²（細い線）にも、4次曲線 y = x² - x⁴（太い線）にも下から触れない。きき目になるのは原点のすぐ近くで、そこでは x² - x⁴ も x² とほとんど同じ形をしている。",
                view: [-1.3, 1.3, -0.35, 1.15],
                step: { x: 0.5, y: 0.25 },
                items: [
                  { k: "curve", f: PAR5K, from: -1.07, to: 1.07, faint: true },
                  { k: "curve", f: Q5K, from: -1.3, to: 1.3 },
                  {
                    k: "param",
                    f: (t: number) => [A5K * Math.cos(t), A5K + A5K * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [0, 2 * A5K] },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`原点付近で円は $y\fallingdotseq\dfrac{x^{2}}{2a}$ のようにふるまう。$y=x^{2}$ も $y=x^{2}-x^{4}$ も原点付近では $y\fallingdotseq x^{2}$ なので、$\dfrac{1}{2a}\geqq1$、つまり $a\leqq\dfrac12$ が決め手になる。$x^{4}$ の項は原点では効かない。`,
            },
          ],
          pitfalls: [
            String.raw`$x^{4}$ があるぶん条件がゆるくなりそうに見えるが、きき目になるのは原点のすぐ近くで、そこでは $x^{4}$ は効かない。結果として範囲は変わらない。`,
          ],
          check: String.raw`$a=0.5$ では円が領域に入り、$a=0.501$ では入らなかった（(1) と同じ境目）。`,
        },
        {
          label: "(3)",
          task: String.raw`$a$ が (2) の範囲にあるとする。$xy$ 平面において連立不等式 $\left|x\right|\leqq\dfrac{1}{\sqrt2}$、$0\leqq y\leqq\dfrac14$、$y\geqq x^{2}-x^{4}$、$x^{2}+\left(y-a\right)^{2}\geqq a^{2}$ で表される領域 $D$ を、$y$ 軸の周りに1回転させてできる立体の体積を求める`,
          answer: String.raw`$\dfrac{\left(3-4a\right)\pi}{64}$`,
          approach: String.raw`$y$ 軸のまわりの回転なので、高さ $y$ で切った断面を考える。各条件を $r^{2}=x^{2}$ の不等式に直すと、断面はきれいな円環になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`高さ $y$（$0\leqq y\leqq\dfrac14$）で切る。回転後の断面は、$\left(x,y\right)\in D$ となる $\left|x\right|$ の値を半径とする円の集まりである。$u=x^{2}$ とおいて条件を書き直す。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left|x\right|\leqq\dfrac{1}{\sqrt2}$：$u\leqq\dfrac12$`,
                String.raw`$y\geqq x^{2}-x^{4}$：$u^{2}-u+y\geqq0$。$0\leqq y\leqq\dfrac14$ なので解は $u\leqq\dfrac{1-\sqrt{1-4y}}{2}$ または $u\geqq\dfrac{1+\sqrt{1-4y}}{2}$`,
                String.raw`$x^{2}+\left(y-a\right)^{2}\geqq a^{2}$：$u\geqq2ay-y^{2}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`2つめの後者 $u\geqq\dfrac{1+\sqrt{1-4y}}{2}\geqq\dfrac12$ は、1つめの $u\leqq\dfrac12$ と $y<\dfrac14$ では両立しない。したがって`,
            },
            {
              k: "math",
              t: String.raw`u_{2}(y)=2ay-y^{2}\ \leqq\ u\ \leqq\ \frac{1-\sqrt{1-4y}}{2}=u_{1}(y)`,
            },
            {
              k: "p",
              t: String.raw`である（$u_{1}\leqq\dfrac12$ なので1つめの条件は自動的に満たされる）。(2) より円 $C$ は $y\geqq x^{2}-x^{4}$ の領域に含まれるので、$C$ 上の点では $u_{2}\leqq u_{1}$ が成り立つ。つまり区間は空にならない。`,
            },
            { k: "p", t: String.raw`断面は半径の2乗が $u_{2}$ から $u_{1}$ までの円環なので、面積は` },
            {
              k: "math",
              t: String.raw`S(y)=\pi u_{1}(y)-\pi u_{2}(y)`,
            },
            { k: "p", t: String.raw`である。体積は` },
            {
              k: "math",
              t: String.raw`V=\int_{0}^{\frac14}\pi\left\{u_{1}(y)-u_{2}(y)\right\}dy`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**それぞれ積分する。**` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac14}\sqrt{1-4y}\,dy=\left[-\frac16\left(1-4y\right)^{\frac32}\right]_{0}^{\frac14}=\frac16`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac14}u_{1}\,dy=\frac12\left(\frac14-\frac16\right)=\frac{1}{24}`,
            },
            { k: "p", t: String.raw`である。また` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac14}u_{2}\,dy=\left[ay^{2}-\frac{y^{3}}{3}\right]_{0}^{\frac14}=\frac{a}{16}-\frac{1}{192}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`V=\pi\left(\frac{1}{24}-\frac{a}{16}+\frac{1}{192}\right)=\pi\cdot\frac{8+1-12a}{192}=\frac{\left(3-4a\right)\pi}{64}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$0<a\leqq\dfrac12$ では $3-4a\geqq1>0$ なので体積は正である。$a=\dfrac12$ のとき $V=\dfrac{\pi}{64}$、$a\to0$ で $V\to\dfrac{3\pi}{64}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$y$ 軸のまわりの回転なので、$x$ ではなく $y$ で切る。各条件を $x^{2}$ の不等式に直すと断面が円環だと分かる。`,
            String.raw`$u^{2}-u+y\geqq0$ の解のうち $u\geqq\dfrac{1+\sqrt{1-4y}}{2}$ の側は $\left|x\right|\leqq\dfrac{1}{\sqrt2}$ と両立しない。ここを落とさない。`,
          ],
          check: String.raw`$a=0.1,0.3,0.5$ で断面積を数値積分すると、$\dfrac{\left(3-4a\right)\pi}{64}$ と小数9桁まで一致した。`,
        },
      ],
    },
  ],
};
