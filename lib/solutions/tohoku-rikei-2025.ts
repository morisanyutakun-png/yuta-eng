import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2025年度（令和7年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第3問の図。$a=-2.2$ の例（$a<-2$ なので $g(0)<0$）。 */
const A3T = -2.2;
const G3T = (x: number): number => 2 * x * x + 2 * A3T * x + (A3T + 2);
const RT3T = Math.sqrt(A3T * A3T - 2 * (A3T + 2));

/** 第4問の図。$n=2$ の例。接点は $t=e^{1/n}$。 */
const N4T = 2;
const F4T = (x: number): number => N4T * Math.log(x);
const G4T = (x: number): number => Math.pow(x, N4T) / Math.E;
const T4T = Math.exp(1 / N4T);

/** 第5問の図。断面（$\mathrm{N},\mathrm{P},\mathrm{Q}$ を含む平面）で見たところ。 */
const P5T: [number, number] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];
const Q5T: [number, number] = [P5T[0] / (1 - P5T[1]), 0];

/** 第6問の図。1辺1の正五角形と、それを $\theta=24^{\circ}$ 回したもの、および共通部分の十角形。 */
const TH6T = 24;
const R6T = 1 / (2 * Math.sin(Math.PI / 5));
const AP6T = 1 / (2 * Math.tan(Math.PI / 5));
const PENT6T = (rot: number): [number, number][] =>
  [0, 1, 2, 3, 4].map((k): [number, number] => {
    const t = ((90 + 72 * k + rot) * Math.PI) / 180;
    return [R6T * Math.cos(t), R6T * Math.sin(t)];
  });
/** 共通部分（十角形）の頂点。法線の方向を並べ、隣り合う2本の交点をとる。 */
const DECA6T: [number, number][] = (() => {
  const ns: number[] = [];
  for (let k = 0; k < 5; k += 1) {
    ns.push((126 + 72 * k) % 360);
    ns.push((126 + 72 * k + TH6T) % 360);
  }
  ns.sort((p, q) => p - q);
  return ns.map((v, i): [number, number] => {
    const w = i === ns.length - 1 ? ns[0] + 360 : ns[i + 1];
    const mid = (((v + w) / 2) * Math.PI) / 180;
    const d = AP6T / Math.cos((((w - v) / 2) * Math.PI) / 180);
    return [d * Math.cos(mid), d * Math.sin(mid)];
  });
})();

export const tohokuRikei2025: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "確率",
      topics: ["反復試行", "移動量の言い換え", "二項分布", "起こりえない事象"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "1回の試行で $+1$ が $\\tfrac34$、$-2$ が $\\tfrac14$ であることを確かめ、位置の分布を分数のまま $n=1$ から $9$ まで計算した",
          "$n=3$ で $\\tfrac{27}{64}$、$n=6$ で $\\tfrac{1215}{4096}$、$n=9$ で $\\tfrac{15309}{65536}$ となり、$ {}_n\\mathrm{C}_{n/3}\\cdot3^{2n/3}/4^{n}$ と一致した",
          "$n=1,2,4,5,7$ では原点にもどる確率がちょうど $0$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`原点を出発点として数直線上を動く点 $\mathrm{P}$ について、試行 $(*)$「硬貨を1回投げ、表なら $\mathrm{P}$ を正の向きに $1$ 進め、裏ならさいころを1回投げて奇数なら正の向きに $1$、偶数なら負の向きに $2$ 進める」を3回繰り返したとき、$\mathrm{P}$ が原点にもどっている確率を求める`,
          answer: String.raw`$\dfrac{27}{64}$`,
          approach: String.raw`1回の試行で実際に起こることは「$+1$ 進む」か「$-2$ 進む」かの2通りしかない。まずその確率を出してしまえば、あとはふつうの反復試行である。`,
          blocks: [
            { k: "p", t: String.raw`**1回の試行。** 移動量は $+1$ か $-2$ のどちらかである。` },
            {
              k: "steps",
              items: [
                String.raw`$-2$ 進むのは「裏」かつ「偶数の目」のときで、確率は $\dfrac12\cdot\dfrac12=\dfrac14$`,
                String.raw`$+1$ 進むのはそれ以外で、確率は $1-\dfrac14=\dfrac34$`,
              ],
            },
            {
              k: "p",
              t: String.raw`（$+1$ は「表」の $\tfrac12$ と「裏かつ奇数」の $\tfrac12\cdot\tfrac12=\tfrac14$ を足して $\tfrac34$ でもよい。さいころの目が $1$ から $6$ まで等確率なので、奇数・偶数はそれぞれ $\tfrac12$ である。）`,
            },
            {
              k: "p",
              t: String.raw`**位置。** $n$ 回のうち $-2$ 進んだ回数を $k$ とすると、位置は`,
            },
            {
              k: "math",
              t: String.raw`\left(n-k\right)\cdot1+k\cdot\left(-2\right)=n-3k`,
            },
            { k: "p", t: String.raw`である。原点にもどっているのは $n-3k=0$、つまり $k=\dfrac n3$ のときである。` },
            { k: "p", t: String.raw`**$n=3$ のとき。** $k=1$ なので` },
            {
              k: "math",
              t: String.raw`{}_3\mathrm{C}_1\left(\frac{3}{4}\right)^{2}\left(\frac{1}{4}\right)=3\cdot\frac{9}{16}\cdot\frac{1}{4}=\frac{27}{64}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`硬貨とさいころを別々に数えない。$+1$ と $-2$ の2通りにまとめてしまうのが早い。`,
            String.raw`$+1$ の確率は $\tfrac12$ ではなく $\tfrac34$。「裏かつ奇数」も $+1$ である。`,
          ],
          check: String.raw`位置の分布を分数のまま3回ぶん計算すると、原点の確率はちょうど $\tfrac{27}{64}=0.421875$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`試行 $(*)$ を6回繰り返したとき、$\mathrm{P}$ が原点にもどっている確率を求める`,
          answer: String.raw`$\dfrac{1215}{4096}$`,
          approach: String.raw`(1) と同じで $k=\dfrac n3$ を使う。$n=6$ なら $k=2$ である。`,
          blocks: [
            { k: "p", t: String.raw`$n=6$ のとき原点にもどるのは $k=2$ のときなので` },
            {
              k: "math",
              t: String.raw`{}_6\mathrm{C}_2\left(\frac{3}{4}\right)^{4}\left(\frac{1}{4}\right)^{2}=15\cdot\frac{81}{256}\cdot\frac{1}{16}=\frac{1215}{4096}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{1215}{4096}=0.2966\cdots$ で、(1) の $0.4219$ より小さい。回数が増えるほど「ちょうど原点」にいる確率は下がっていく。`,
            },
          ],
          check: String.raw`分布を6回ぶん計算すると $\tfrac{1215}{4096}=0.29663086$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ を $3$ で割り切れない正の整数とするとき、試行 $(*)$ を $n$ 回繰り返して $\mathrm{P}$ が原点にもどっている確率を求める`,
          answer: String.raw`$0$`,
          approach: String.raw`(1) で出した「位置 $=n-3k$」がそのまま効く。$n-3k=0$ には $n$ が $3$ の倍数であることが必要なので、そうでなければ起こりえない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より、$n$ 回のうち $-2$ 進んだ回数を $k$（$0\leqq k\leqq n$ の整数）とすると、$n$ 回後の位置は $n-3k$ である。原点にもどっているのは`,
            },
            { k: "math", t: String.raw`n-3k=0,\qquad\text{すなわち}\quad n=3k` },
            {
              k: "p",
              t: String.raw`のときに限る。$k$ は整数なので、これは $n$ が $3$ の倍数であることを意味する。$n$ が $3$ で割り切れないとき、そのような $k$ は存在しないので、$\mathrm{P}$ が原点にもどることはない。よって求める確率は`,
            },
            { k: "math", t: String.raw`0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n$ 回後の位置はつねに $n-3k$、つまり $n$ と $3$ を法として合同な整数しかとれない。$3$ で割った余りが保存されるので、$n\not\equiv0\pmod 3$ なら位置も $0$ にならない、と見てもよい。`,
            },
          ],
          pitfalls: [
            String.raw`計算せずに「起こりえない」と言い切る問題である。$k$ が整数であることを根拠に書く。`,
          ],
          check: String.raw`$n=1,2,4,5,7$ で分布を計算すると、原点の確率はいずれもちょうど $0$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列",
      topics: ["対数をとる", "連立漸化式", "等比数列になる条件", "一般項"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n}+2b_{n}$ は $-1,-7,-49,-343,\\dots$（公比 $7$）、$a_{n}-b_{n}$ は $2,8,32,128,\\dots$（公比 $4$）になった",
          "$k=0,1,3$ では比が一定にならないことも確かめた",
          "漸化式を分数のまま回した $x_{1}\\sim x_{5}$ が $2^{(4^{n}-7^{n-1})/3}$（指数は順に $1,3,5,-29,-459$）と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x_{1}=2$、$y_{1}=\tfrac12$、$x_{n+1}=x_{n}^{5}y_{n}^{2}$、$y_{n+1}=x_{n}y_{n}^{6}$ で定まる正の数列について、$a_{n}=\log_{2}x_{n}$、$b_{n}=\log_{2}y_{n}$ とするとき、$\left\{a_{n}+kb_{n}\right\}$ が等比数列になる実数 $k$ をすべて求める`,
          answer: String.raw`$k=2,\ -1$`,
          approach: String.raw`積と累乗の漸化式なので、底 $2$ の対数をとれば和と定数倍の漸化式になる。$a_{n+1}+kb_{n+1}$ を $a_{n},b_{n}$ で表し、「$a_{n}+kb_{n}$ の定数倍になる」という条件を係数で比べる。`,
          blocks: [
            { k: "p", t: String.raw`両辺の底 $2$ の対数をとると、$\log_{2}\left(x^{5}y^{2}\right)=5\log_{2}x+2\log_{2}y$ などから` },
            {
              k: "math",
              t: String.raw`a_{n+1}=5a_{n}+2b_{n},\qquad b_{n+1}=a_{n}+6b_{n}\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。初項は $a_{1}=\log_{2}2=1$、$b_{1}=\log_{2}\tfrac12=-1$ である。` },
            { k: "p", t: String.raw`$c_{n}=a_{n}+kb_{n}$ とおくと ① より` },
            {
              k: "math",
              t: String.raw`c_{n+1}=\left(5a_{n}+2b_{n}\right)+k\left(a_{n}+6b_{n}\right)=\left(5+k\right)a_{n}+\left(2+6k\right)b_{n}`,
            },
            {
              k: "p",
              t: String.raw`である。$\left\{c_{n}\right\}$ が公比 $\lambda$ の等比数列になるには $c_{n+1}=\lambda c_{n}=\lambda a_{n}+\lambda k b_{n}$ であればよい。$a_{n},b_{n}$ の係数を比べて`,
            },
            { k: "math", t: String.raw`5+k=\lambda,\qquad2+6k=\lambda k` },
            { k: "p", t: String.raw`である。第1式を第2式に入れると` },
            {
              k: "math",
              t: String.raw`2+6k=\left(5+k\right)k=k^{2}+5k,\qquad k^{2}-k-2=0,\qquad\left(k-2\right)\left(k+1\right)=0`,
            },
            { k: "p", t: String.raw`なので $k=2$ または $k=-1$ である。それぞれ公比は $\lambda=5+k$ で` },
            {
              k: "steps",
              items: [
                String.raw`$k=2$：$\lambda=7$、$c_{1}=a_{1}+2b_{1}=1-2=-1\neq0$`,
                String.raw`$k=-1$：$\lambda=4$、$c_{1}=a_{1}-b_{1}=1+1=2\neq0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`で、どちらも初項が $0$ でないので確かに等比数列になる。よって`,
            },
            { k: "math", t: String.raw`k=2,\qquad k=-1` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`初項が $0$ だと「等比数列」にならない（公比が定まらない）。$c_{1}\neq0$ の確認を入れる。`,
            String.raw`$a_{n},b_{n}$ の係数を比べてよいのは、$a_{n}$ と $b_{n}$ が独立に動くからである。実際に $(a_{1},b_{1})=(1,-1)$ から ① で生成される列は $a_{n}$ と $b_{n}$ が比例しないので問題ない。`,
          ],
          check: String.raw`数値で回すと $a_{n}+2b_{n}=-1,-7,-49,-343,\dots$（公比 $7$）、$a_{n}-b_{n}=2,8,32,128,\dots$（公比 $4$）になった。$k=0,1,3$ では比が一定にならなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`数列 $\left\{x_{n}\right\}$ の一般項を求める`,
          answer: String.raw`$x_{n}=2^{\frac{4^{n}-7^{n-1}}{3}}$`,
          approach: String.raw`(1) で2本の等比数列が手に入ったので、連立して $a_{n}$ を取り出す。最後に $x_{n}=2^{a_{n}}$ に戻す。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`a_{n}+2b_{n}=-1\cdot7^{n-1},\qquad a_{n}-b_{n}=2\cdot4^{n-1}`,
            },
            { k: "p", t: String.raw`である。第1式から第2式を引くと $3b_{n}=-7^{n-1}-2\cdot4^{n-1}$ なので` },
            {
              k: "math",
              t: String.raw`b_{n}=-\frac{7^{n-1}+2\cdot4^{n-1}}{3}`,
            },
            { k: "p", t: String.raw`である。これを第2式に入れて` },
            {
              k: "math",
              t: String.raw`a_{n}=2\cdot4^{n-1}+b_{n}=\frac{6\cdot4^{n-1}-7^{n-1}-2\cdot4^{n-1}}{3}=\frac{4\cdot4^{n-1}-7^{n-1}}{3}=\frac{4^{n}-7^{n-1}}{3}`,
            },
            { k: "p", t: String.raw`である。$x_{n}=2^{a_{n}}$ だから` },
            {
              k: "math",
              t: String.raw`x_{n}=2^{\frac{4^{n}-7^{n-1}}{3}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1,2,3,4$ で指数は $1,3,5,-29$ となり、$x_{1}=2,\ x_{2}=8,\ x_{3}=32,\ x_{4}=2^{-29}$ である。$4^{n}$ より $7^{n-1}$ のほうが速く増えるので、$n\geqq4$ では指数が負、つまり $x_{n}$ は急速に $0$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`指数が整数になることは、$4^{n}-7^{n-1}\equiv1-1=0\pmod3$ から分かる（$4\equiv1$、$7\equiv1$）。`,
          ],
          check: String.raw`漸化式を分数のまま回した $x_{1}\sim x_{5}$ と、この式の値が完全に一致した（$x_{5}=2^{-459}$）。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分法",
      topics: ["4次関数の極値", "導関数の因数分解", "解の配置", "判別式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-6$ から $6$ まで $0.001$ 刻みの12001点でとり、$f'$ の実数解から極大値の有無を数値で判定すると「$a^{2}-2a-4>0$ かつ $a\\neq-2$」と完全に一致した（差異 0 件）",
          "同じ点で「$x=0$ で極大」が $a<-2$ と完全に一致した（差異 0 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=x^{4}+\dfrac{4a}{3}x^{3}+\left(a+2\right)x^{2}$ が極大値をもつような実数 $a$ の範囲を求める`,
          answer: String.raw`$a<1-\sqrt{5}$ かつ $a\neq-2$、または $a>1+\sqrt{5}$`,
          approach: String.raw`$x^{4}$ の係数が正なので、$f$ が極大値をもつのは $f'$ が異なる3つの実数解をもつとき（そのまん中が極大）である。$f'$ は $x$ でくくれて「$x\times$ 2次式」になるので、2次式が $0$ でない異なる2実数解をもつ条件を書けばよい。`,
          blocks: [
            { k: "p", t: String.raw`微分すると` },
            {
              k: "math",
              t: String.raw`f'(x)=4x^{3}+4ax^{2}+2\left(a+2\right)x=2x\left\{2x^{2}+2ax+\left(a+2\right)\right\}`,
            },
            { k: "p", t: String.raw`である。$g(x)=2x^{2}+2ax+\left(a+2\right)$ とおく。` },
            {
              k: "p",
              t: String.raw`**極大値をもつ条件。** $f$ の最高次の係数は正なので、$x\to\pm\infty$ で $f\to+\infty$ である。$f'$ は3次で最高次の係数が正だから、$f'$ が異なる3つの実数解 $r_{1}<r_{2}<r_{3}$ をもてば $f'$ の符号は $-,+,-,+$ と変わり、$r_{2}$ で極大になる。逆に $f'$ の異なる実数解が1つか2つのときは、$f'$ の符号変化が「負から正」へ1回だけになり、極大値をもたない。`,
            },
            { k: "p", t: String.raw`よって条件は「$f'$ が異なる3つの実数解をもつ」、すなわち` },
            {
              k: "math",
              t: String.raw`g(x)=0\ \text{が異なる2つの実数解をもち、そのどちらも}\ 0\ \text{でない}`,
            },
            { k: "p", t: String.raw`である。判別式を4で割ったものは` },
            {
              k: "math",
              t: String.raw`\frac{D}{4}=a^{2}-2\left(a+2\right)=a^{2}-2a-4`,
            },
            { k: "p", t: String.raw`で、$a^{2}-2a-4>0$ は $a^{2}-2a-4=0$ の解 $a=1\pm\sqrt{5}$ を使って` },
            { k: "math", t: String.raw`a<1-\sqrt{5}\quad\text{または}\quad a>1+\sqrt{5}` },
            { k: "p", t: String.raw`である。また $g(0)=a+2\neq0$、すなわち $a\neq-2$ である。` },
            {
              k: "p",
              t: String.raw`$1-\sqrt5=-1.236\cdots$ なので $-2<1-\sqrt5$ であり、$a=-2$ は前者の範囲の中にある。したがって求める範囲は`,
            },
            {
              k: "math",
              t: String.raw`a<1-\sqrt{5}\ \text{かつ}\ a\neq-2,\qquad\text{または}\qquad a>1+\sqrt{5}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$a=-2$ のときは $g(x)=2x^{2}-4x=2x\left(x-2\right)$ となり $f'(x)=4x^{2}\left(x-2\right)$ である。$x=0$ は重解で符号が変わらず、$f$ は $x=2$ で極小になるだけである。`,
            },
          ],
          pitfalls: [
            String.raw`$g$ の解が $0$ と一致する場合（$a=-2$）を落とさない。$f'$ の相異なる解が2つになり、極大が消える。`,
            String.raw`判別式 $>0$ だけでは足りない。「$0$ を解にもたない」も要る。`,
          ],
          check: String.raw`$a$ を $-6$ から $6$ まで $0.001$ 刻みでとって極大値の有無を数値で判定すると、この条件と完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(x)$ が $x=0$ で極大値をもつような $a$ の範囲を求める`,
          answer: String.raw`$a<-2$`,
          approach: String.raw`$f'(x)=2x\,g(x)$ なので、$x=0$ の前後で $f'$ が正から負に変わる条件を見る。$2x$ の符号は $x=0$ で変わるので、$g(0)$ の符号だけで決まる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "g(x) = 2x² + 2ax + (a+2) のグラフ（図は a = -2.2）。g(0) = a + 2 < 0 なら、g の2つの解は 0 をはさむ。",
                view: [-0.9, 3.1, -3.0, 0.9],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: G3T, from: -0.227, to: 2.427 },
                  { k: "dot", at: [0, A3T + 2], label: "g(0) = a + 2 < 0", place: "below-right" },
                  { k: "dot", at: [(-2 * A3T - 2 * RT3T) / 4, 0], label: "負の解", place: "above-left" },
                  { k: "dot", at: [(-2 * A3T + 2 * RT3T) / 4, 0], label: "正の解", place: "above-right" },
                  { k: "text", at: [2.4, 0.8], label: "y = g(x)", place: "right" },
                ],
              },
            },
            { k: "p", t: String.raw`$f'(x)=2x\,g(x)$ である。$x=0$ の近くで $f'$ の符号を見る。` },
            {
              k: "p",
              t: String.raw`$g$ は連続なので、$g(0)\neq0$ なら $x=0$ の十分近くで $g$ の符号は $g(0)$ と同じである。$2x$ は $x<0$ で負、$x>0$ で正だから`,
            },
            {
              k: "steps",
              items: [
                String.raw`$g(0)<0$ のとき：$x<0$ で $f'>0$、$x>0$ で $f'<0$。つまり $x=0$ で**極大**`,
                String.raw`$g(0)>0$ のとき：$x<0$ で $f'<0$、$x>0$ で $f'>0$。つまり $x=0$ で極小`,
                String.raw`$g(0)=0$（$a=-2$）のとき：(1) の注のとおり $f'(x)=4x^{2}\left(x-2\right)$ で、$x=0$ の前後で $f'$ の符号は変わらず、極値にならない`,
              ],
            },
            { k: "p", t: String.raw`よって $x=0$ で極大になる条件は $g(0)=a+2<0$、すなわち` },
            { k: "math", t: String.raw`a<-2` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`なおこのとき、$g$ は下に凸で $g(0)<0$ だから $g=0$ は $0$ をはさむ異なる2実数解をもち、(1) の条件も自動的に満たされている（$a<-2<1-\sqrt5$ でもある）。`,
            },
          ],
          pitfalls: [
            String.raw`「$x=0$ が $f'$ の解だから極値」ではない。重解だと符号が変わらない。符号の変わり方まで見る。`,
            String.raw`(1) の範囲との関係を一言つけておくと、答えが (1) の中に入っていることがはっきりする。`,
          ],
          check: String.raw`$a$ を $-6$ から $6$ まで $0.001$ 刻みでとり、$x=0$ が極大点かどうかを数値で判定すると、$a<-2$ と完全に一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["共通接線", "対数関数と冪関数", "面積", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,2,3,5,10$ で $t=e^{1/n}$ のとき $f(t)=g(t)=1$、$f'(t)=g'(t)$ が小数9桁まで一致した（$a=\\tfrac1e$）",
          "同じ $n$ で面積をシンプソン法で数値積分すると $\\dfrac{n^{2}e^{1/n}}{n+1}-n$ と小数9桁まで一致した",
          "$n=1000$ で $S_{n}=0.000499667$、$n=100000$ で $0.000005000$ となり、$0$ に近づいた（$S_{n}\\approx\\tfrac1{2n}$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を正の整数、$a$ を正の実数とし $f(x)=n\log x$、$g(x)=ax^{n}$ とする。$y=f(x)$ と $y=g(x)$ が共有点をもち、その点での接線が一致するとき $a$ を求める`,
          answer: String.raw`$a=\dfrac{1}{e}$`,
          approach: String.raw`接点を $x=t$ として「値が等しい」「微分係数が等しい」の2本を立てる。微分係数の式から $at^{n}=1$ が出て、これを値の式に入れると $t$ が一発で決まる。`,
          blocks: [
            { k: "p", t: String.raw`接点の $x$ 座標を $t\ (>0)$ とする。条件は` },
            {
              k: "math",
              t: String.raw`n\log t=at^{n}\qquad\cdots\text{①},\qquad\frac{n}{t}=ant^{n-1}\qquad\cdots\text{②}`,
            },
            { k: "p", t: String.raw`である（$f'(x)=\dfrac nx$、$g'(x)=anx^{n-1}$）。② の両辺を $n$ で割って $t$ を掛けると` },
            { k: "math", t: String.raw`1=at^{n}` },
            { k: "p", t: String.raw`である。これを ① に入れると $n\log t=1$、つまり` },
            { k: "math", t: String.raw`\log t=\frac{1}{n},\qquad t=e^{\frac{1}{n}}` },
            { k: "p", t: String.raw`である。$at^{n}=1$ から $t^{n}=e$ なので` },
            { k: "math", t: String.raw`a=\frac{1}{t^{n}}=\frac{1}{e}` },
            { k: "p", t: String.raw`である。$a=\tfrac1e>0$ で条件に合う。` },
            {
              k: "note",
              t: String.raw`接点では $f(t)=g(t)=at^{n}=1$ なので、共有点の座標は $\left(e^{1/n},\,1\right)$ である。$n$ によらず $y$ 座標が $1$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`②（微分係数が等しい）から先に $at^{n}=1$ を取り出すのが早い。①②を連立して $t$ を消そうとすると回り道になる。`,
          ],
          check: String.raw`$n=3$ で $t=1.395612425$、$f(t)=g(t)=1.000000000$、$f'(t)=g'(t)=2.149593932$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`この2つの曲線と $x$ 軸で囲まれた部分の面積 $S_{n}$ を求める`,
          answer: String.raw`$S_{n}=\dfrac{n^{2}e^{\frac{1}{n}}}{n+1}-n$`,
          approach: String.raw`$y=g(x)$ は $x>0$ でつねに正、$y=f(x)$ は $x=1$ で $x$ 軸を横切る。囲まれた部分は $0\leqq x\leqq1$ では $x$ 軸と $g$ のあいだ、$1\leqq x\leqq t$ では $f$ と $g$ のあいだになる。2つに分けて積分する。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "n = 2 のときの y = n log x と y = ax^n（a = 1/e）。2曲線は (e^{1/n}, 1) で接する。網かけが囲まれた部分で、x 軸・2曲線が境界。",
                view: [-0.6, 3.2, -2.3, 1.5],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: G4T, bottom: () => 0, from: 0, to: 1 },
                  { k: "fillBetween", top: G4T, bottom: F4T, from: 1, to: T4T },
                  { k: "curve", f: G4T, from: 0, to: 2.02 },
                  { k: "curve", f: F4T, from: 0.33, to: 2.12 },
                  { k: "dot", at: [1, 0], label: "(1, 0)", place: "below-right" },
                  { k: "dot", at: [T4T, 1], label: "接点", place: "above-left" },
                  { k: "text", at: [1.6, 1.35], label: "y = ax\u207f", place: "left" },
                  { k: "text", at: [0.45, 2 * Math.log(0.45)], label: "y = n log x", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`$t=e^{1/n}$ とおく。$g(x)=\dfrac{x^{n}}{e}$ は $x>0$ で正、$f(x)=n\log x$ は $x=1$ で $0$ になる。また`,
            },
            {
              k: "math",
              t: String.raw`g(x)-f(x)\geqq0\quad\left(x>0\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$x=t$ で接するので差は $0$ 以上で、等号は $x=t$ のみ）。したがって囲まれた部分は、$0\leqq x\leqq1$ では $x$ 軸と $y=g(x)$ のあいだ、$1\leqq x\leqq t$ では $y=f(x)$ と $y=g(x)$ のあいだである。`,
            },
            {
              k: "math",
              t: String.raw`S_{n}=\int_{0}^{1}g\,dx+\int_{1}^{t}\left(g-f\right)dx=\int_{0}^{t}g\,dx-\int_{1}^{t}f\,dx`,
            },
            { k: "p", t: String.raw`**第1項。** $t^{n}=e$ に注意して` },
            {
              k: "math",
              t: String.raw`\int_{0}^{t}\frac{x^{n}}{e}\,dx=\frac{t^{n+1}}{e\left(n+1\right)}=\frac{t^{n}\cdot t}{e\left(n+1\right)}=\frac{t}{n+1}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**第2項。** $\displaystyle\int\log x\,dx=x\log x-x$ なので` },
            {
              k: "math",
              t: String.raw`\int_{1}^{t}n\log x\,dx=n\Bigl[x\log x-x\Bigr]_{1}^{t}=n\left\{\left(t\cdot\frac{1}{n}-t\right)-\left(0-1\right)\right\}=t-nt+n`,
            },
            { k: "p", t: String.raw`である（$\log t=\tfrac1n$）。よって` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac{t}{n+1}-\left(t-nt+n\right)=t\left(\frac{1}{n+1}+n-1\right)-n`,
            },
            { k: "p", t: String.raw`で、括弧の中は` },
            {
              k: "math",
              t: String.raw`\frac{1}{n+1}+n-1=\frac{1+\left(n-1\right)\left(n+1\right)}{n+1}=\frac{n^{2}}{n+1}`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac{n^{2}}{n+1}e^{\frac{1}{n}}-n`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ なら $S_{1}=\dfrac{e}{2}-1=0.3591\cdots$ である。$g$ が直線 $y=\tfrac xe$ になる場合で、手計算でも確かめやすい。`,
            },
          ],
          pitfalls: [
            String.raw`$x\to0^{+}$ で $f\to-\infty$ だが、囲まれた部分の下側の境界は $x$ 軸なので、$f$ の積分は $x=1$ からでよい。`,
            String.raw`$t^{n}=e$ を使うと $t^{n+1}=et$ となって $e$ が約分される。$t=e^{1/n}$ を代入し続けるより式が軽い。`,
          ],
          check: String.raw`$n=5$ で数値積分すると $0.089178159$、式の値も $0.089178159$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}S_{n}$ を求める`,
          answer: String.raw`$0$`,
          approach: String.raw`$S_{n}=\dfrac{n^{2}}{n+1}e^{1/n}-n$ は $\infty-\infty$ の形なので、通分して1つの分数にまとめる。$h=\tfrac1n$ とおいて $\dfrac{e^{h}-1}{h}\to1$ を使う。`,
          blocks: [
            { k: "p", t: String.raw`通分すると` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac{n^{2}e^{\frac{1}{n}}-n\left(n+1\right)}{n+1}=\frac{n^{2}\left(e^{\frac{1}{n}}-1\right)-n}{n+1}`,
            },
            { k: "p", t: String.raw`である。$h=\dfrac1n\ (\to0)$ とおくと $n^{2}\left(e^{h}-1\right)=\dfrac{e^{h}-1}{h}\cdot n$ なので` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac{n\left(\dfrac{e^{h}-1}{h}-1\right)}{n+1}=\frac{n}{n+1}\cdot\frac{\dfrac{e^{h}-1}{h}-1}{1}`,
            },
            {
              k: "p",
              t: String.raw`である。ここで $\dfrac{n}{n+1}\to1$ であり、$\dfrac{e^{h}-1}{h}\to1$（$h\to0$）だから $\dfrac{e^{h}-1}{h}-1\to0$ である。よって`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}S_{n}=1\cdot0=0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`もう少し細かく見ると $e^{h}=1+h+\dfrac{h^{2}}{2}+\cdots$ から $\dfrac{e^{h}-1}{h}-1=\dfrac{h}{2}+\cdots=\dfrac{1}{2n}+\cdots$ なので $S_{n}\approx\dfrac{1}{2n}$ である。$n=1000$ で $0.0004997$、$n=100000$ で $0.000005$ と、確かに $\tfrac{1}{2n}$ のペースで $0$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{n^{2}}{n+1}e^{1/n}\to\infty$ と $n\to\infty$ の差なので、そのままでは不定形。1つの分数にまとめてから $\dfrac{e^{h}-1}{h}\to1$ を使う。`,
            String.raw`$e^{1/n}\to1$ だけでは足りない。$e^{1/n}-1$ が $\tfrac1n$ と同じ速さで $0$ に行くことを使う。`,
          ],
          check: String.raw`$n=1000$ で $S_{n}=0.000499667$、$n=100000$ で $0.000005000$ となり、$\tfrac{1}{2n}$ とよく合った。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["球面と直線の交点", "立体射影", "逆写像", "軌跡が円であることの証明"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "球面上の点を2万個ランダムにとり、$\\mathrm{Q}=\\left(\\tfrac{a}{1-c},\\tfrac{b}{1-c},0\\right)$ が直線 $\\mathrm{NP}$ 上にあること、および (2) の逆写像で元の点に戻ることを確かめた（反例 0 件）",
          "平面 $3x+4y+5z=\\tfrac52$ の近くにある球面上の点58個について、対応する $\\mathrm{Q}$ の $\\left(-\\tfrac65,-\\tfrac85\\right)$ からの距離は $2.6445$〜$2.6485$ で、$\\sqrt7=2.645751$ と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$S$ を原点中心・半径 $1$ の球面、$\mathrm{P}(a,b,c)$ を $\mathrm{N}(0,0,1)$ と異なる $S$ 上の点とする。直線 $\mathrm{PN}$ と $xy$ 平面の交点 $\mathrm{Q}$ の座標を $a,b,c$ で表す`,
          answer: String.raw`$\mathrm{Q}\left(\dfrac{a}{1-c},\ \dfrac{b}{1-c},\ 0\right)$`,
          approach: String.raw`直線を $\mathrm{N}$ を基点に媒介変数で書き、$z=0$ となる値を求めるだけ。$\mathrm{P}\neq\mathrm{N}$ から $c\neq1$ が言えるので割れる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "N, P, Q を含む平面での断面。N(0,0,1) から球面上の点 P を通る直線を延ばすと、xy 平面と Q で交わる（立体射影）。",
                view: [-1.6, 2.4, -1.35, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI, faint: true },
                  { k: "seg", a: [0, 1], b: Q5T },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [0, 1], label: "N", place: "above-left" },
                  { k: "dot", at: P5T, label: "P", place: "above-right" },
                  { k: "dot", at: Q5T, label: "Q", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $S$ 上にあり $\mathrm{N}$ と異なるので $c\neq1$ である（$c=1$ なら $a^{2}+b^{2}=0$ で $\mathrm{P}=\mathrm{N}$）。`,
            },
            { k: "p", t: String.raw`直線 $\mathrm{PN}$ 上の点は、実数 $s$ を使って` },
            {
              k: "math",
              t: String.raw`\mathrm{N}+s\left(\mathrm{P}-\mathrm{N}\right)=\left(sa,\ sb,\ 1+s\left(c-1\right)\right)`,
            },
            { k: "p", t: String.raw`と書ける。$z$ 座標が $0$ になるのは` },
            {
              k: "math",
              t: String.raw`1+s\left(c-1\right)=0,\qquad s=\frac{1}{1-c}`,
            },
            { k: "p", t: String.raw`のときである。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{Q}\left(\frac{a}{1-c},\ \frac{b}{1-c},\ 0\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$c\neq1$ の根拠を書く。$\mathrm{P}\neq\mathrm{N}$ と「$S$ 上」の両方を使う。`,
          ],
          check: String.raw`球面上の点を2万個ランダムにとると、この $\mathrm{Q}$ はつねに直線 $\mathrm{NP}$ 上にあった。`,
        },
        {
          label: "(2)",
          task: String.raw`$xy$ 平面上の点 $(p,q,0)$ と $\mathrm{N}$ を通る直線 $m$ について、$m$ と $S$ の交点のうち $\mathrm{N}$ 以外のものの座標を $p,q$ で表す`,
          answer: String.raw`$\left(\dfrac{2p}{p^{2}+q^{2}+1},\ \dfrac{2q}{p^{2}+q^{2}+1},\ \dfrac{p^{2}+q^{2}-1}{p^{2}+q^{2}+1}\right)$`,
          approach: String.raw`(1) の逆向き。$m$ を $\mathrm{N}$ 基点で媒介変数表示し、球面の式に代入する。$u=0$（$\mathrm{N}$ そのもの）が必ず解になるので、2次方程式は $u$ でくくれて一瞬で解ける。`,
          blocks: [
            { k: "p", t: String.raw`$m$ 上の点は実数 $u$ を使って` },
            {
              k: "math",
              t: String.raw`\mathrm{N}+u\left(\left(p,q,0\right)-\mathrm{N}\right)=\left(up,\ uq,\ 1-u\right)`,
            },
            { k: "p", t: String.raw`と書ける。$S$ の式 $x^{2}+y^{2}+z^{2}=1$ に代入すると` },
            {
              k: "math",
              t: String.raw`u^{2}p^{2}+u^{2}q^{2}+\left(1-u\right)^{2}=1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`u^{2}\left(p^{2}+q^{2}+1\right)-2u=0,\qquad u\left\{u\left(p^{2}+q^{2}+1\right)-2\right\}=0`,
            },
            {
              k: "p",
              t: String.raw`である。$u=0$ は $\mathrm{N}$ に対応するので、求める交点は $u=\dfrac{2}{p^{2}+q^{2}+1}$ のほうである。$D=p^{2}+q^{2}+1\ (>0)$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac{2p}{D},\ \frac{2q}{D},\ 1-\frac{2}{D}\right)=\left(\frac{2p}{D},\ \frac{2q}{D},\ \frac{p^{2}+q^{2}-1}{p^{2}+q^{2}+1}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`(1) と (2) は互いに逆の対応になっている。実際 $a=\tfrac{2p}{D},\ b=\tfrac{2q}{D},\ c=\tfrac{p^{2}+q^{2}-1}{D}$ とすると $1-c=\tfrac{2}{D}$ なので $\tfrac{a}{1-c}=p$、$\tfrac{b}{1-c}=q$ になる。つまり $S\setminus\left\{\mathrm{N}\right\}$ と $xy$ 平面は1対1に対応する。`,
            },
          ],
          pitfalls: [
            String.raw`$u=0$ が必ず解になる。因数分解して「もう一方」をとる。解の公式を使うと根号が出て手間になる。`,
          ],
          check: String.raw`(1) で得た $\mathrm{Q}$ をこの式に入れると、2万点すべてで元の $\mathrm{P}$ に戻った。`,
        },
        {
          label: "(3)",
          task: String.raw`点 $\left(0,0,\tfrac12\right)$ を通りベクトル $(3,4,5)$ に直交する平面を $\alpha$ とする。$\mathrm{P}$ が $\alpha$ と $S$ の交わりを動くとき、$\mathrm{Q}$ が $xy$ 平面上の円周上を動くことを示す`,
          answer: String.raw`$\mathrm{Q}$ は中心 $\left(-\dfrac65,-\dfrac85,0\right)$、半径 $\sqrt{7}$ の円周上を動く`,
          approach: String.raw`$\mathrm{Q}=(p,q,0)$ とおき、(2) の式で $\mathrm{P}$ を $p,q$ で表して $\alpha$ の方程式に代入する。分母 $p^{2}+q^{2}+1$ を払うと $p,q$ の2次式になり、$p^{2}$ と $q^{2}$ の係数がそろうので円の方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`$\alpha$ の方程式は、点 $\left(0,0,\tfrac12\right)$ を通り法線ベクトルが $(3,4,5)$ だから` },
            {
              k: "math",
              t: String.raw`3x+4y+5\left(z-\frac{1}{2}\right)=0,\qquad\text{すなわち}\quad3x+4y+5z=\frac{5}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{N}(0,0,1)$ は $3\cdot0+4\cdot0+5\cdot1=5\neq\tfrac52$ なので $\alpha$ 上にない。また原点と $\alpha$ の距離は $\dfrac{5/2}{\sqrt{3^{2}+4^{2}+5^{2}}}=\dfrac{5/2}{5\sqrt{2}}=\dfrac{1}{2\sqrt{2}}<1$ なので、$\alpha$ と $S$ は交わる。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{Q}=(p,q,0)$ とおく。(2) より $\mathrm{P}$ の座標は $D=p^{2}+q^{2}+1$ として`,
            },
            {
              k: "math",
              t: String.raw`a=\frac{2p}{D},\qquad b=\frac{2q}{D},\qquad c=\frac{p^{2}+q^{2}-1}{D}`,
            },
            { k: "p", t: String.raw`である。$\mathrm{P}\in\alpha$ の条件 $3a+4b+5c=\tfrac52$ に代入して両辺に $D$ を掛けると` },
            {
              k: "math",
              t: String.raw`6p+8q+5\left(p^{2}+q^{2}-1\right)=\frac{5}{2}\left(p^{2}+q^{2}+1\right)`,
            },
            { k: "p", t: String.raw`である。$p^{2}+q^{2}$ の項を左辺にまとめると` },
            {
              k: "math",
              t: String.raw`\frac{5}{2}\left(p^{2}+q^{2}\right)+6p+8q-\frac{15}{2}=0`,
            },
            { k: "p", t: String.raw`で、両辺に $\dfrac25$ を掛けて` },
            {
              k: "math",
              t: String.raw`p^{2}+q^{2}+\frac{12}{5}p+\frac{16}{5}q-3=0`,
            },
            { k: "p", t: String.raw`となる。平方完成すると` },
            {
              k: "math",
              t: String.raw`\left(p+\frac{6}{5}\right)^{2}+\left(q+\frac{8}{5}\right)^{2}=3+\frac{36}{25}+\frac{64}{25}=3+4=7`,
            },
            {
              k: "p",
              t: String.raw`である。よって $\mathrm{Q}$ は中心 $\left(-\dfrac65,-\dfrac85,0\right)$、半径 $\sqrt7$ の円周上にある。`,
            },
            {
              k: "p",
              t: String.raw`逆に、この円周上の任意の点 $(p,q,0)$ に対し、(2) で定まる $S$ 上の点は上の計算を逆にたどって $\alpha$ 上にあり、しかも (1) でその点から戻る先が $(p,q,0)$ である。したがって $\mathrm{P}$ が $\alpha\cap S$ 全体を動くとき $\mathrm{Q}$ はこの円周全体を動く。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$\mathrm{N}\notin\alpha$ であることが効いている。もし $\mathrm{N}$ が $\alpha$ 上にあると、$\alpha\cap S$ は $\mathrm{N}$ を通る円になり、その像は円ではなく直線になる。`,
            },
          ],
          pitfalls: [
            String.raw`$p^{2}$ と $q^{2}$ の係数がそろうことを確認する。そろわなければ円にならない。`,
            String.raw`「円周上にある」だけでなく「円周全体を動く」ことまで言うには、(1)(2) が互いに逆であること（1対1対応）を使う。`,
            String.raw`$\mathrm{N}$ が $\alpha$ 上にないことを確かめておく。これが円になるための鍵である。`,
          ],
          check: String.raw`平面の近くにある球面上の点58個について $\mathrm{Q}$ を計算すると、$\left(-\tfrac65,-\tfrac85\right)$ からの距離は $2.6445$〜$2.6485$ で、$\sqrt7=2.645751$ とよく合った。`,
        },
      ],
    },
    {
      no: 6,
      field: "図形と計量",
      topics: ["正五角形", "黄金比", "回転と共通部分", "三角関数の最大最小"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$2R\\sin72^{\\circ}=1.618033989$ で $\\tfrac{1+\\sqrt5}{2}$ と一致した（$R$ は1辺1の正五角形の外接円の半径）",
          "$\\theta$ を $0.001^{\\circ}$ 刻みで動かすと $\\ell_{\\theta}$ の最小は $\\theta=36.000^{\\circ}$ での $4.472135955$ で、$2\\sqrt5=4.472135955$ と一致した",
          "$\\theta=10,24,36,50,70$ 度について多角形のクリッピングで共通部分を直接求めると、いずれも十角形になり、周の長さが式 $10r\\left\\{\\tan\\tfrac\\theta2+\\tan\\left(36^{\\circ}-\\tfrac\\theta2\\right)\\right\\}$ と小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`1辺の長さが $1$ の正五角形 $K$ の対角線の長さを求める`,
          answer: String.raw`$\dfrac{1+\sqrt{5}}{2}$`,
          approach: String.raw`正五角形の外接円を使うと、辺は中心角 $72^{\circ}$、対角線は中心角 $144^{\circ}$ に対する弦なので、比が $\dfrac{\sin72^{\circ}}{\sin36^{\circ}}=2\cos36^{\circ}$ になる。$\cos36^{\circ}$ を2倍角・3倍角から出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`外接円の半径を $R$ とすると、辺は中心角 $\dfrac{360^{\circ}}{5}=72^{\circ}$ に対する弦、対角線は中心角 $144^{\circ}$ に対する弦なので`,
            },
            {
              k: "math",
              t: String.raw`1=2R\sin36^{\circ},\qquad d=2R\sin72^{\circ}`,
            },
            { k: "p", t: String.raw`である。割り算して2倍角の公式を使うと` },
            {
              k: "math",
              t: String.raw`d=\frac{\sin72^{\circ}}{\sin36^{\circ}}=\frac{2\sin36^{\circ}\cos36^{\circ}}{\sin36^{\circ}}=2\cos36^{\circ}`,
            },
            { k: "p", t: String.raw`である。$\cos36^{\circ}$ を求める。$\theta=36^{\circ}$ とすると $2\theta=72^{\circ}$、$3\theta=108^{\circ}=180^{\circ}-72^{\circ}$ なので` },
            { k: "math", t: String.raw`\cos3\theta=-\cos2\theta` },
            { k: "p", t: String.raw`である。$c=\cos\theta$ とおいて3倍角・2倍角の公式を入れると` },
            {
              k: "math",
              t: String.raw`4c^{3}-3c=-\left(2c^{2}-1\right),\qquad4c^{3}+2c^{2}-3c-1=0`,
            },
            { k: "p", t: String.raw`である。$c=-1$ が解なので因数分解して` },
            {
              k: "math",
              t: String.raw`\left(c+1\right)\left(4c^{2}-2c-1\right)=0`,
            },
            { k: "p", t: String.raw`となる。$c=\cos36^{\circ}>0$ だから $4c^{2}-2c-1=0$ で` },
            {
              k: "math",
              t: String.raw`c=\frac{2+\sqrt{4+16}}{8}=\frac{1+\sqrt{5}}{4}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`d=2\cos36^{\circ}=\frac{1+\sqrt{5}}{2}`,
            },
            { k: "p", t: String.raw`である（黄金比 $1.618\cdots$）。` },
            {
              k: "note",
              t: String.raw`相似を使う手もある。対角線2本の交点が対角線を $1:d-1$ に分けることから $d^{2}=d+1$ が出て、$d>0$ より $d=\dfrac{1+\sqrt5}{2}$ である。`,
            },
          ],
          check: String.raw`数値で $2R\sin72^{\circ}=1.618033989$、$\dfrac{1+\sqrt5}{2}=1.618033989$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$K$ の周で囲まれた図形を $P$、$P$ を $K$ の外接円の中心のまわりに角 $\theta$ 回した図形を $P_{\theta}$、$P$ と $P_{\theta}$ の共通部分の周の長さを $\ell_{\theta}$ とするとき、$0^{\circ}<\theta<72^{\circ}$ での $\ell_{\theta}$ の最小値が $2\sqrt{5}$ であることを示す`,
          answer: String.raw`$\ell_{\theta}=10r\left\{\tan\dfrac{\theta}{2}+\tan\left(36^{\circ}-\dfrac{\theta}{2}\right)\right\}$（$r$ は内接円の半径）で、$\theta=36^{\circ}$ のとき最小値 $2\sqrt{5}$`,
          approach: String.raw`$P$ も $P_{\theta}$ も「中心からの距離が $r$ の5本の直線で切り取られた領域」なので、共通部分は10本の直線で切り取られた十角形である。中心から各辺に下ろした垂線の足で辺を2つに割ると、それぞれの長さが $r\tan\left(\text{半分の中心角}\right)$ になり、周の長さが $\tan$ の和にまとまる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "正五角形 P（実線）と、中心のまわりに θ = 24° 回した P_θ（破線）。網かけが共通部分で、中心から各辺までの距離はどれも r（内接円の半径）の十角形になる。",
                view: [-1.15, 1.15, -1.02, 1.02],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: DECA6T },
                  ...[0, 1, 2, 3, 4].map((i) => ({
                    k: "seg" as const,
                    a: PENT6T(0)[i],
                    b: PENT6T(0)[(i + 1) % 5],
                  })),
                  ...[0, 1, 2, 3, 4].map((i) => ({
                    k: "seg" as const,
                    a: PENT6T(TH6T)[i],
                    b: PENT6T(TH6T)[(i + 1) % 5],
                    dash: true,
                  })),
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`外接円の中心を $\mathrm{O}$、内接円の半径（中心から辺までの距離）を $r$ とする。1辺が $1$ なので`,
            },
            {
              k: "math",
              t: String.raw`r=\frac{1}{2\tan36^{\circ}}`,
            },
            { k: "p", t: String.raw`である（辺の中点までの距離。辺の半分 $\tfrac12$ と中心角の半分 $36^{\circ}$ から）。` },
            {
              k: "p",
              t: String.raw`**共通部分は十角形。** $P$ は「$\mathrm{O}$ からの距離が $r$ の5本の直線」の内側として表せる。各直線の法線方向（$\mathrm{O}$ から辺に下ろした垂線の向き）は $72^{\circ}$ ずつ違う。$P_{\theta}$ も同じで、法線方向が全体に $\theta$ だけずれている。よって $P\cap P_{\theta}$ は、法線方向が`,
            },
            {
              k: "math",
              t: String.raw`\psi,\ \psi+\theta,\ \psi+72^{\circ},\ \psi+72^{\circ}+\theta,\ \dots`,
            },
            {
              k: "p",
              t: String.raw`と並ぶ10本の直線の内側である。$0^{\circ}<\theta<72^{\circ}$ なので隣り合う方向の差は $\theta$ と $72^{\circ}-\theta$ が交互に現れ、どちらも $0^{\circ}$ と $72^{\circ}$ のあいだにある。したがってどの直線も辺を1つずつ提供し、$P\cap P_{\theta}$ は十角形になる。`,
            },
            {
              k: "p",
              t: String.raw`**周の長さ。** 1本の直線について、$\mathrm{O}$ から下ろした垂線の足を $\mathrm{H}$ とする。隣の直線との交点を $\mathrm{V}$ とし、2本の法線のなす角を $\delta$ とすると、$\mathrm{V}$ は2つの法線方向のちょうど真ん中の向きにあるので $\angle\mathrm{HOV}=\dfrac{\delta}{2}$ であり、直角三角形 $\mathrm{OHV}$ から`,
            },
            { k: "math", t: String.raw`\mathrm{HV}=r\tan\frac{\delta}{2}` },
            {
              k: "p",
              t: String.raw`である。各辺は $\mathrm{H}$ によって左右に分かれ、それぞれの長さが隣の法線との角の半分の $\tan$ の $r$ 倍になる。10本ぶん足し合わせると、どの「隣との角 $\delta$」もちょうど2回ずつ数えられるので`,
            },
            {
              k: "math",
              t: String.raw`\ell_{\theta}=2r\sum\tan\frac{\delta}{2}=2r\left\{5\tan\frac{\theta}{2}+5\tan\frac{72^{\circ}-\theta}{2}\right\}`,
            },
            { k: "p", t: String.raw`すなわち、$u=\dfrac{\theta}{2}\in\left(0^{\circ},36^{\circ}\right)$ とおいて` },
            {
              k: "math",
              t: String.raw`\ell_{\theta}=10r\left\{\tan u+\tan\left(36^{\circ}-u\right)\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**最小値。** $\tan A+\tan B=\dfrac{\sin\left(A+B\right)}{\cos A\cos B}$ を使うと` },
            {
              k: "math",
              t: String.raw`\tan u+\tan\left(36^{\circ}-u\right)=\frac{\sin36^{\circ}}{\cos u\cos\left(36^{\circ}-u\right)}`,
            },
            { k: "p", t: String.raw`である。分母を積和の公式で直すと` },
            {
              k: "math",
              t: String.raw`\cos u\cos\left(36^{\circ}-u\right)=\frac{1}{2}\left\{\cos\left(2u-36^{\circ}\right)+\cos36^{\circ}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$0^{\circ}<u<36^{\circ}$ では $-36^{\circ}<2u-36^{\circ}<36^{\circ}$ なので $\cos\left(2u-36^{\circ}\right)$ は $2u=36^{\circ}$、つまり $u=18^{\circ}$ のとき最大値 $1$ をとる。分母が最大のとき全体は最小だから、$\ell_{\theta}$ は $u=18^{\circ}$、すなわち`,
            },
            { k: "math", t: String.raw`\theta=36^{\circ}` },
            { k: "p", t: String.raw`で最小になる。そのときの値は` },
            {
              k: "math",
              t: String.raw`\ell_{36^{\circ}}=10r\cdot2\tan18^{\circ}=\frac{10}{2\tan36^{\circ}}\cdot2\tan18^{\circ}=\frac{10\tan18^{\circ}}{\tan36^{\circ}}`,
            },
            { k: "p", t: String.raw`である。2倍角の公式 $\tan36^{\circ}=\dfrac{2\tan18^{\circ}}{1-\tan^{2}18^{\circ}}$ から` },
            {
              k: "math",
              t: String.raw`\frac{\tan18^{\circ}}{\tan36^{\circ}}=\frac{1-\tan^{2}18^{\circ}}{2}`,
            },
            { k: "p", t: String.raw`である。$\sin18^{\circ}=\dfrac{\sqrt5-1}{4}$ より` },
            {
              k: "math",
              t: String.raw`\sin^{2}18^{\circ}=\frac{3-\sqrt{5}}{8},\qquad\cos^{2}18^{\circ}=\frac{5+\sqrt{5}}{8}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\tan^{2}18^{\circ}=\frac{3-\sqrt{5}}{5+\sqrt{5}}=\frac{\left(3-\sqrt{5}\right)\left(5-\sqrt{5}\right)}{20}=\frac{20-8\sqrt{5}}{20}=1-\frac{2}{\sqrt{5}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{\tan18^{\circ}}{\tan36^{\circ}}=\frac{1}{2}\cdot\frac{2}{\sqrt{5}}=\frac{1}{\sqrt{5}}`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`\ell_{36^{\circ}}=\frac{10}{\sqrt{5}}=2\sqrt{5}`,
            },
            { k: "p", t: String.raw`である。よって $\ell_{\theta}$ の最小値は $2\sqrt5$ である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\sin18^{\circ}=\dfrac{\sqrt5-1}{4}$ は (1) の $\cos36^{\circ}=\dfrac{1+\sqrt5}{4}$ から $\cos36^{\circ}=1-2\sin^{2}18^{\circ}$ で出せる。$\theta=36^{\circ}$ のときは10本の法線が $36^{\circ}$ ずつ等間隔に並ぶので、共通部分は**正十角形**になる。`,
            },
          ],
          pitfalls: [
            String.raw`共通部分を「五角形どうしの重なり」と見るより、「中心から距離 $r$ の10本の直線で切り取った図形」と見るほうが扱いやすい。2つの五角形は内接円を共有している。`,
            String.raw`周の長さは $\tan$ の和にまとまる。各辺を垂線の足で2つに割ってから足すと、どの角も2回ずつ現れる。`,
            String.raw`$\tan u+\tan\left(36^{\circ}-u\right)$ は $u$ について下に凸で $u=18^{\circ}$ が最小。積和に直すと微分せずに示せる。`,
          ],
          check: String.raw`$\theta$ を $0.001^{\circ}$ 刻みで動かすと最小は $\theta=36.000^{\circ}$ での $4.472135955$ で、$2\sqrt5=4.472135955$ と一致した。$\theta=10,24,36,50,70$ 度について五角形どうしの共通部分を直接クリッピングで求めると、いずれも十角形で、周の長さがこの式と小数9桁まで一致した。`,
        },
      ],
    },
  ],
};
