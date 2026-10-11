import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2025年度（令和7年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 *
 * 第5問は、成立条件までは突き止めたが（1回目の操作のあとの列 B が
 * B_i ≦ i+1 をすべての i でみたすこと。n=8 まで全探索で照合済み）、
 * (2) の総数 c_n を数え上げる筋道が固まっていないため、まだ公開しない。
 * 確かめられていないものは書かない。
 */
export const todaiRikei2025: SolutionSet = {
  slug: "todai-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "平面曲線・積分法",
      topics: ["内分点", "媒介変数表示", "面積", "曲線の長さ"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "内分を定義どおり3段階たどって $\\mathrm{U}_t$ を作り、$\\left(3t^{2}-2t^{3},\\,3t-3t^{2}\\right)$ と $t$ を1000点きざみで一致することを確かめた",
          "面積を $\\int y\\,dx$ の数値積分で出し、$\\frac35$ に小数10桁まで一致することを確かめた",
          "弧長を速さの数値積分で出し、$2a^{3}-3a^{2}+3a$ と $a=0.1,0.3,0.5,0.7,0.9,1$ で一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{U}_t$ の座標を求める`,
          answer: String.raw`$\mathrm{U}_t=\left(3t^{2}-2t^{3},\ 3t-3t^{2}\right)$`,
          approach: String.raw`内分を3段階くり返すだけなので、1段ずつ座標を書いていけば必ず出る。途中で $t$ の次数が1つずつ上がり、最後は3次式になる。式を整理しながら進めると、各段の形が次の段の材料になっていることが見える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$2$ 点 $\mathrm{X}\left(x_1,y_1\right)$、$\mathrm{Y}\left(x_2,y_2\right)$ を $t:(1-t)$ に内分する点は $\left((1-t)x_1+tx_2,\ (1-t)y_1+ty_2\right)$ である。これを順に使う。`,
            },
            { k: "p", t: String.raw`$\mathrm{A}(0,0)$、$\mathrm{B}(0,1)$、$\mathrm{C}(1,1)$、$\mathrm{D}(1,0)$ だから、1段目は` },
            {
              k: "math",
              t: String.raw`\mathrm{P}_t=\left(0,\ t\right),\qquad \mathrm{Q}_t=\left(t,\ 1\right),\qquad \mathrm{R}_t=\left(1,\ 1-t\right)`,
            },
            { k: "p", t: String.raw`である。2段目は` },
            {
              k: "math",
              t: String.raw`\mathrm{S}_t=\left(t^{2},\ (1-t)t+t\right)=\left(t^{2},\ 2t-t^{2}\right)`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{T}_t=\left((1-t)t+t,\ (1-t)+t(1-t)\right)=\left(2t-t^{2},\ 1-t^{2}\right)`,
            },
            { k: "p", t: String.raw`となる。3段目は $\mathrm{S}_t$ と $\mathrm{T}_t$ を $t:(1-t)$ に内分して` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x&=(1-t)t^{2}+t\left(2t-t^{2}\right)=t^{2}-t^{3}+2t^{2}-t^{3}=3t^{2}-2t^{3}\\[1mm]
y&=(1-t)\left(2t-t^{2}\right)+t\left(1-t^{2}\right)=2t-3t^{2}+t^{3}+t-t^{3}=3t-3t^{2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。よって $\mathrm{U}_t=\left(3t^{2}-2t^{3},\ 3t-3t^{2}\right)$ となる。$t=0$ で $(0,0)=\mathrm{A}$、$t=1$ で $(1,0)=\mathrm{D}$ となり、問題文が $\mathrm{U}_0=\mathrm{A}$、$\mathrm{U}_1=\mathrm{D}$ と定めていることとも合う。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$t$ を $0$ から $1$ まで動かしたときの $\mathrm{U}_t$ の軌跡と、$4$ 点 $\mathrm{A},\mathrm{B},\mathrm{C},\mathrm{D}$。薄い線は $\mathrm{A}\to\mathrm{B}\to\mathrm{C}\to\mathrm{D}$ の折れ線。`,
                view: [-0.25, 1.3, -0.25, 1.25],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [3 * t * t - 2 * t ** 3, 3 * t - 3 * t * t] as [number, number],
                    from: 0,
                    to: 1,
                  },
                  { k: "seg", a: [0, 0], b: [0, 1], faint: true },
                  { k: "seg", a: [0, 1], b: [1, 1], faint: true },
                  { k: "seg", a: [1, 1], b: [1, 0], faint: true },
                  { k: "seg", a: [0, 0], b: [1, 0], dash: true },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [0, 1], label: "B", place: "above-left" },
                  { k: "dot", at: [1, 1], label: "C", place: "above-right" },
                  { k: "dot", at: [1, 0], label: "D", place: "below-right" },
                  { k: "text", at: [0.5, 0.82], label: "軌跡", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`内分の比は $t:(1-t)$ なので、係数は $\mathrm{X}$ 側が $1-t$、$\mathrm{Y}$ 側が $t$ である。比の書き方と係数の付き方が逆になりやすい。`,
            String.raw`$y$ 座標は $3t-3t^{2}=3t(1-t)$ と因数分解しておくと、このあとの面積と弧長の計算が軽くなる。`,
          ],
          check: String.raw`$t=\dfrac12$ では $\mathrm{S}_t=\left(\dfrac14,\dfrac34\right)$、$\mathrm{T}_t=\left(\dfrac34,\dfrac34\right)$ で、その中点は $\left(\dfrac12,\dfrac34\right)$。式でも $3\cdot\dfrac14-2\cdot\dfrac18=\dfrac12$、$3\cdot\dfrac12-3\cdot\dfrac14=\dfrac34$ となる。`,
        },
        {
          label: "(2)",
          task: String.raw`$0\le t\le1$ で $\mathrm{U}_t$ が描く曲線と線分 $\mathrm{AD}$ で囲まれた部分の面積を求める`,
          answer: String.raw`$\dfrac35$`,
          approach: String.raw`曲線が媒介変数で書けているので、$\displaystyle\int y\,dx$ を $t$ の積分に書き換える。$x$ が $t$ の増加とともに $0$ から $1$ まで単調に増えることを先に確かめておけば、置き換えがそのまま使える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=3t^{2}-2t^{3}$ より $\dfrac{dx}{dt}=6t-6t^{2}=6t(1-t)$ である。$0<t<1$ では $\dfrac{dx}{dt}>0$ だから、$t$ が $0$ から $1$ まで増えるとき $x$ は $0$ から $1$ まで単調に増える。また $y=3t(1-t)\ge0$ である。`,
            },
            {
              k: "p",
              t: String.raw`線分 $\mathrm{AD}$ は $x$ 軸上の $0\le x\le1$ の部分だから、囲まれた部分の面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{1}y\,dx=\int_{0}^{1}3t(1-t)\cdot6t(1-t)\,dt=18\int_{0}^{1}t^{2}(1-t)^{2}\,dt`,
            },
            { k: "p", t: String.raw`である。中身を展開して積分すると` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left(t^{2}-2t^{3}+t^{4}\right)dt=\frac13-\frac12+\frac15=\frac{10-15+6}{30}=\frac{1}{30}`,
            },
            { k: "p", t: String.raw`となるので $S=18\cdot\dfrac{1}{30}=\dfrac35$ である。` },
          ],
          pitfalls: [
            String.raw`媒介変数のまま $\int y\,dx$ を使うには、$x$ が単調であることを断っておく必要がある。単調でないと同じ $x$ を2回なぞって面積が重なる。`,
            String.raw`$\dfrac{dx}{dt}$ を掛け忘れて $\int y\,dt$ にしてしまうと、値が $\dfrac12$ になって合わない。`,
          ],
          check: String.raw`$\displaystyle\int_{0}^{1}y\,\frac{dx}{dt}\,dt$ を数値積分すると $0.6000000000$ になる。`,
        },
        {
          label: "(3)",
          task: String.raw`$0<a<1$ のとき、$0\le t\le a$ で $\mathrm{U}_t$ が描く曲線の長さを $a$ の多項式で求める`,
          answer: String.raw`$2a^{3}-3a^{2}+3a$`,
          approach: String.raw`速さ $\sqrt{\left(\frac{dx}{dt}\right)^{2}+\left(\frac{dy}{dt}\right)^{2}}$ の中身が完全平方になる。「多項式の形で求めよ」という指示が、根号が外れることを教えてくれている。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{dx}{dt}=6t-6t^{2}$、$\dfrac{dy}{dt}=3-6t$ である。2乗して足すと` },
            {
              k: "math",
              t: String.raw`\left(\frac{dx}{dt}\right)^{2}+\left(\frac{dy}{dt}\right)^{2}=36t^{2}(1-t)^{2}+9(1-2t)^{2}=9\left(4t^{4}-8t^{3}+8t^{2}-4t+1\right)`,
            },
            { k: "p", t: String.raw`となる。括弧の中は完全平方で` },
            {
              k: "math",
              t: String.raw`4t^{4}-8t^{3}+8t^{2}-4t+1=\left(2t^{2}-2t+1\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`と書ける。実際に右辺を展開すれば一致する。$2t^{2}-2t+1=2\left(t-\dfrac12\right)^{2}+\dfrac12>0$ だから、速さは`,
            },
            {
              k: "math",
              t: String.raw`\sqrt{9\left(2t^{2}-2t+1\right)^{2}}=3\left(2t^{2}-2t+1\right)`,
            },
            { k: "p", t: String.raw`となり、根号が外れる。よって求める長さは` },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{a}3\left(2t^{2}-2t+1\right)dt=3\left[\frac{2t^{3}}{3}-t^{2}+t\right]_{0}^{a}=2a^{3}-3a^{2}+3a`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\sqrt{\left(2t^{2}-2t+1\right)^{2}}=\left|2t^{2}-2t+1\right|$ である。判別式が負で常に正であることを確かめてから絶対値を外す。`,
            String.raw`完全平方に気づかないまま根号のまま積分しようとすると、高校の範囲では手が止まる。「多項式の形で」という指示を手がかりにする。`,
          ],
          check: String.raw`$a=1$ なら $L=2-3+3=2$。$a=0.7$ では速さの数値積分が $1.3160000000$、式も $2(0.343)-3(0.49)+2.1=1.316$ で一致する。`,
        },
      ],
    },

    {
      no: 2,
      field: "極限",
      topics: ["対数不等式", "はさみうち", "定積分と極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$n=50,200,1000,4000$ で積分を数値計算し、$n$ を増やすほど $\\log2-\\frac12$ に近づくことを確かめた（$n=4000$ で $0.1931531$ / 式 $0.1931472$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x>0$ のとき $\log x\le x-1$ を示す`,
          answer: String.raw`$f(x)=x-1-\log x$ は $x=1$ で最小値 $0$ を取るので、$x>0$ で $\log x\le x-1$`,
          approach: String.raw`差を1つの関数にまとめて微分する。等号がどこで成り立つかまで出るので、あとの小問で使うときに扱いやすい。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x-1-\log x$（$x>0$）とおくと` },
            { k: "math", t: String.raw`f'(x)=1-\frac1x=\frac{x-1}{x}` },
            {
              k: "p",
              t: String.raw`である。$0<x<1$ では $f'(x)<0$、$x>1$ では $f'(x)>0$ だから、$f$ は $x=1$ で最小になる。その最小値は $f(1)=1-1-\log1=0$ である。`,
            },
            {
              k: "p",
              t: String.raw`よって $x>0$ のとき $f(x)\ge0$、すなわち $\log x\le x-1$ が成り立つ。等号は $x=1$ のときに限る。`,
            },
          ],
          pitfalls: [
            String.raw`最小値が $0$ であることまで書く。$f'$ の符号だけで「よって $f\ge0$」とすると、最小値が負でないことの根拠が抜ける。`,
          ],
          check: String.raw`$x=2$ では $\log2=0.693\ldots\le1$、$x=\dfrac12$ では $\log\dfrac12=-0.693\ldots\le-\dfrac12$ でどちらも成り立つ。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}n\int_{1}^{2}\log\left(\frac{1+x^{\frac1n}}{2}\right)dx$ を求める`,
          answer: String.raw`$\log2-\dfrac12$`,
          approach: String.raw`$n\to\infty$ で $x^{1/n}\to1$ なので $\log$ の中は $1$ に近づき、積分は $0$ に近づく。そこへ $n$ を掛けるので、$0$ に近づく速さを押さえる必要がある。(1) の不等式を上下から当てて、はさみうちに持ち込む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$1\le x\le2$ とし、$u=x^{\frac1n}$ とおく。$u>0$ である。$\log\dfrac{1+u}{2}$ を上下から挟む。`,
            },
            { k: "p", t: String.raw`**上から。** (1) の $\log s\le s-1$ に $s=\dfrac{1+u}{2}$ を入れると` },
            { k: "math", t: String.raw`\log\frac{1+u}{2}\le\frac{1+u}{2}-1=\frac{u-1}{2}` },
            {
              k: "p",
              t: String.raw`**下から。** (1) の不等式に $s=\dfrac{2}{1+u}$ を入れると $\log\dfrac{2}{1+u}\le\dfrac{2}{1+u}-1=\dfrac{1-u}{1+u}$ であり、左辺の符号を変えて`,
            },
            { k: "math", t: String.raw`\log\frac{1+u}{2}\ge\frac{u-1}{1+u}` },
            { k: "p", t: String.raw`を得る。以上を $n$ 倍して $x$ で積分すると` },
            {
              k: "math",
              t: String.raw`n\int_{1}^{2}\frac{x^{\frac1n}-1}{1+x^{\frac1n}}\,dx\ \le\ n\int_{1}^{2}\log\left(\frac{1+x^{\frac1n}}{2}\right)dx\ \le\ \frac{n}{2}\int_{1}^{2}\left(x^{\frac1n}-1\right)dx`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $n\left(x^{\frac1n}-1\right)$ の振る舞いを押さえる。$x^{\frac1n}=e^{\frac{\log x}{n}}$ であり、$h=\dfrac{\log x}{n}$ とおくと $n\left(x^{\frac1n}-1\right)=\log x\cdot\dfrac{e^{h}-1}{h}$ である。$1\le x\le2$ なら $0\le h\le\dfrac{\log2}{n}$ で、$n\to\infty$ のとき $h\to0$ だから $\dfrac{e^{h}-1}{h}\to1$ となり、これは $x$ の取り方によらず一様に成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`したがって右端は $\dfrac12\displaystyle\int_{1}^{2}\log x\,dx$ に、左端は $x^{\frac1n}\to1$ より分母が $2$ に近づくので同じ $\dfrac12\displaystyle\int_{1}^{2}\log x\,dx$ に収束する。はさみうちの原理より、求める極限も同じ値である。`,
            },
            {
              k: "math",
              t: String.raw`\frac12\int_{1}^{2}\log x\,dx=\frac12\Bigl[x\log x-x\Bigr]_{1}^{2}=\frac12\left\{\left(2\log2-2\right)-\left(-1\right)\right\}=\log2-\frac12`,
            },
            { k: "p", t: String.raw`よって極限は $\log2-\dfrac12$ である。` },
          ],
          pitfalls: [
            String.raw`$\log$ の中が $1$ に近づくからといって、積分を先に $0$ にしてはいけない。$n$ を掛けているので、$0$ に近づく速さ（$\dfrac{\log x}{2n}$ の程度）まで押さえないと値が出ない。`,
            String.raw`下からの評価は、(1) の不等式を $\dfrac{2}{1+u}$ に当てて向きを変えると作れる。同じ不等式を2通りに使うのがこの問題の仕掛け。`,
            String.raw`$\displaystyle\int\log x\,dx=x\log x-x$ は部分積分で出す。暗記していても、答案では1行で導いておくと安全。`,
          ],
          check: String.raw`$\log2-\dfrac12=0.1931472\ldots$。$n=50,200,1000,4000$ で数値計算すると $0.19362,\ 0.19326,\ 0.19317,\ 0.19315$ と、$n$ を増やすほど近づく。`,
        },
      ],
    },

    {
      no: 3,
      field: "図形と三角関数",
      topics: ["三角関数の合成", "長方形に内接する平行四辺形", "最大値"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "長方形を座標で組み立てて $S$ を直接計算し、$\\frac{a^{2}}{2}\\sin\\left(2\\theta+\\frac{2\\pi}{3}\\right)+\\frac{b^{2}}{2}\\sin2\\theta+\\frac{ab}{2}$ と一致することを確かめた",
          "$(a,b)$ を7通り取り、$\\theta$ を20万点きざみで全探索した最大値が、場合分けした式と小数8桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\angle\mathrm{BCG}=\theta$ のとき、長方形 $\mathrm{EFGH}$ の面積 $S$ を $a,b,\theta$ で表す`,
          answer: String.raw`$S=\dfrac{a^{2}}{2}\sin\left(2\theta+\dfrac{2\pi}{3}\right)+\dfrac{b^{2}}{2}\sin2\theta+\dfrac{ab}{2}$`,
          approach: String.raw`長方形の2辺の長さを、$\theta$ を使って直角三角形から拾う。$\mathrm{B}$ のまわりの角の和から、もう一方の直角三角形の角も $\theta$ で書ける。縦と横を出して掛ければ終わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{F}$ を原点、辺 $\mathrm{FG}$ を $x$ 軸の正の向き、辺 $\mathrm{FE}$ を $y$ 軸の正の向きに取る。$\mathrm{A}$ は辺 $\mathrm{EF}$ 上、$\mathrm{B}$ は辺 $\mathrm{FG}$ 上、$\mathrm{C}$ は辺 $\mathrm{GH}$ 上、$\mathrm{D}$ は辺 $\mathrm{HE}$ 上にある。`,
            },
            {
              k: "p",
              t: String.raw`三角形 $\mathrm{BCG}$ は $\mathrm{G}$ が直角で、斜辺が $\mathrm{BC}=b$、$\angle\mathrm{BCG}=\theta$ だから`,
            },
            { k: "math", t: String.raw`\mathrm{CG}=b\cos\theta,\qquad \mathrm{BG}=b\sin\theta,\qquad \angle\mathrm{CBG}=\frac{\pi}{2}-\theta` },
            {
              k: "p",
              t: String.raw`である。点 $\mathrm{B}$ は直線 $\mathrm{FG}$ 上にあるので、$\mathrm{B}$ のまわりで $\angle\mathrm{ABF}+\angle\mathrm{ABC}+\angle\mathrm{CBG}=\pi$ が成り立つ。$\angle\mathrm{ABC}=\dfrac{\pi}{6}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{ABF}=\pi-\frac{\pi}{6}-\left(\frac{\pi}{2}-\theta\right)=\frac{\pi}{3}+\theta`,
            },
            {
              k: "p",
              t: String.raw`となる。三角形 $\mathrm{ABF}$ は $\mathrm{F}$ が直角で斜辺が $\mathrm{AB}=a$ だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BF}=a\cos\left(\frac{\pi}{3}+\theta\right),\qquad \mathrm{AF}=a\sin\left(\frac{\pi}{3}+\theta\right)`,
            },
            { k: "p", t: String.raw`である。したがって長方形の2辺は` },
            {
              k: "math",
              t: String.raw`\mathrm{FG}=\mathrm{BF}+\mathrm{BG}=a\cos\left(\frac{\pi}{3}+\theta\right)+b\sin\theta`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{FE}=\mathrm{AF}+\mathrm{CG}=a\sin\left(\frac{\pi}{3}+\theta\right)+b\cos\theta`,
            },
            {
              k: "p",
              t: String.raw`となる（$\mathrm{FE}$ は、$\mathrm{D}$ が辺 $\mathrm{HE}$ 上にあることから $\mathrm{D}=\mathrm{A}+\vec{\mathrm{BC}}$ の $y$ 座標として確かめられる）。掛け合わせて`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\left\{a\cos\left(\tfrac{\pi}{3}+\theta\right)+b\sin\theta\right\}\left\{a\sin\left(\tfrac{\pi}{3}+\theta\right)+b\cos\theta\right\}\\[1mm]
&=\frac{a^{2}}{2}\sin\left(2\theta+\frac{2\pi}{3}\right)+ab\cos\left(\frac{\pi}{3}+\theta-\theta\right)\cdot 1+\frac{b^{2}}{2}\sin2\theta
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`を得る。真ん中の項は、$\cos\left(\frac{\pi}{3}+\theta\right)\cos\theta+\sin\left(\frac{\pi}{3}+\theta\right)\sin\theta=\cos\dfrac{\pi}{3}=\dfrac12$ という加法定理からきている。よって`,
            },
            {
              k: "math",
              t: String.raw`S=\frac{a^{2}}{2}\sin\left(2\theta+\frac{2\pi}{3}\right)+\frac{b^{2}}{2}\sin2\theta+\frac{ab}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。なお $\mathrm{BF}\ge0$ と $\mathrm{BG}\ge0$ から $0\le\theta\le\dfrac{\pi}{6}$ であり、両端では $\mathrm{B}$ が長方形の頂点と重なる。問題文が「辺はその両端の点も含む」と断っているので、この2つも許される。`,
            },
          ],
          pitfalls: [
            String.raw`$\angle\mathrm{ABF}$ を $\dfrac{\pi}{3}-\theta$ としてしまう間違いが多い。$\mathrm{B}$ のまわりの3つの角の和が $\pi$ であることから丁寧に出す。`,
            String.raw`$\theta$ の動く範囲 $0\le\theta\le\dfrac{\pi}{6}$ を (1) のうちに出しておく。(2) で最大値を取る位置が範囲の内か端かを分けるのに要る。`,
          ],
          check: String.raw`$a=b=1$、$\theta=\dfrac{\pi}{6}$ のとき、式は $\dfrac12\sin\pi+\dfrac12\sin\dfrac{\pi}{3}+\dfrac12=\dfrac{\sqrt3}{4}+\dfrac12=0.9330\ldots$。座標から直接組み立てた長方形の面積も同じ値になる。`,
        },
        {
          label: "(2)",
          task: String.raw`$S$ のとりうる値の最大値を $a,b$ で表す`,
          answer: String.raw`$a\le b\le\sqrt2\,a$ のとき $\dfrac{ab}{2}+\dfrac12\sqrt{a^{4}-a^{2}b^{2}+b^{4}}$、$b>\sqrt2\,a$ のとき $\dfrac{\sqrt3}{4}b^{2}+\dfrac{ab}{2}$`,
          approach: String.raw`$\sin$ の2つの項を合成して1つの $\sin$ にまとめる。合成した角が範囲 $0\le\theta\le\dfrac{\pi}{6}$ の中で $\dfrac{\pi}{2}$ に届くかどうかで、最大値が内部で取れるか端で取れるかが分かれる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の式の $\sin$ の部分を展開してまとめる。$\sin\left(2\theta+\dfrac{2\pi}{3}\right)=-\dfrac12\sin2\theta+\dfrac{\sqrt3}{2}\cos2\theta$ だから` },
            {
              k: "math",
              t: String.raw`S-\frac{ab}{2}=\frac{2b^{2}-a^{2}}{4}\sin2\theta+\frac{\sqrt3\,a^{2}}{4}\cos2\theta`,
            },
            { k: "p", t: String.raw`となる。これを合成する。振幅は` },
            {
              k: "math",
              t: String.raw`R=\frac14\sqrt{\left(2b^{2}-a^{2}\right)^{2}+3a^{4}}=\frac14\sqrt{4\left(a^{4}-a^{2}b^{2}+b^{4}\right)}=\frac12\sqrt{a^{4}-a^{2}b^{2}+b^{4}}`,
            },
            {
              k: "p",
              t: String.raw`であり、$S=\dfrac{ab}{2}+R\sin\left(2\theta+\varphi\right)$ と書ける。ここで $\varphi$ は`,
            },
            {
              k: "math",
              t: String.raw`\cos\varphi=\frac{2b^{2}-a^{2}}{4R},\qquad \sin\varphi=\frac{\sqrt3\,a^{2}}{4R}`,
            },
            {
              k: "p",
              t: String.raw`で定まる角である。$a\le b$ より $2b^{2}-a^{2}\ge a^{2}>0$ なので $0<\varphi<\dfrac{\pi}{2}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\theta$ が $0$ から $\dfrac{\pi}{6}$ まで動くとき $2\theta+\varphi$ は $\varphi$ から $\varphi+\dfrac{\pi}{3}$ まで動く。$S$ が最大になるのは $\sin$ が $1$ になるとき、つまり $2\theta+\varphi=\dfrac{\pi}{2}$ のときで、これが範囲に入る条件は`,
            },
            {
              k: "math",
              t: String.raw`\varphi\le\frac{\pi}{2}\le\varphi+\frac{\pi}{3}\quad\Longleftrightarrow\quad \varphi\ge\frac{\pi}{6}`,
            },
            { k: "p", t: String.raw`である。$0<\varphi<\dfrac{\pi}{2}$ だから、これは $\tan\varphi\ge\tan\dfrac{\pi}{6}=\dfrac{1}{\sqrt3}$ と同じで` },
            {
              k: "math",
              t: String.raw`\frac{\sqrt3\,a^{2}}{2b^{2}-a^{2}}\ge\frac{1}{\sqrt3}\quad\Longleftrightarrow\quad 3a^{2}\ge2b^{2}-a^{2}\quad\Longleftrightarrow\quad b^{2}\le2a^{2}`,
            },
            { k: "p", t: String.raw`すなわち $b\le\sqrt2\,a$ となる。` },
            {
              k: "p",
              t: String.raw`**$a\le b\le\sqrt2\,a$ のとき。** 最大値は $\sin$ が $1$ を取る $\theta$ で実現し`,
            },
            {
              k: "math",
              t: String.raw`S_{\max}=\frac{ab}{2}+\frac12\sqrt{a^{4}-a^{2}b^{2}+b^{4}}`,
            },
            {
              k: "p",
              t: String.raw`**$b>\sqrt2\,a$ のとき。** $\varphi<\dfrac{\pi}{6}$ だから $2\theta+\varphi$ は $\dfrac{\pi}{2}$ に届かず、範囲の全体で $\cos\left(2\theta+\varphi\right)>0$、つまり $S$ は $\theta$ について増加する。よって最大は右端 $\theta=\dfrac{\pi}{6}$ で取り`,
            },
            {
              k: "math",
              t: String.raw`S_{\max}=\frac{a^{2}}{2}\sin\pi+\frac{b^{2}}{2}\sin\frac{\pi}{3}+\frac{ab}{2}=\frac{\sqrt3}{4}b^{2}+\frac{ab}{2}`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`合成したあと、$\sin$ が $1$ を取る角が範囲の中にあるかどうかを必ず調べる。調べずに振幅を足すと、$b$ が大きいときに実現しない値を答えてしまう。`,
            String.raw`$\left(2b^{2}-a^{2}\right)^{2}+3a^{4}=4\left(a^{4}-a^{2}b^{2}+b^{4}\right)$ の変形を1行で済ませない。展開して確かめておくと、根号の中の形に自信が持てる。`,
            String.raw`$a\le b$ という条件は $2b^{2}-a^{2}>0$、つまり $\varphi$ が第1象限にあることに使っている。`,
          ],
          check: String.raw`$a=b=1$ なら $b\le\sqrt2a$ の側で $\dfrac12+\dfrac12\sqrt{1-1+1}=1$。$a=1,b=2$ なら $b>\sqrt2a$ の側で $\dfrac{\sqrt3}{4}\cdot4+1=\sqrt3+1=2.7320508\ldots$。どちらも $\theta$ を20万点きざみで全探索した最大値と一致する。`,
        },
      ],
    },

    {
      no: 4,
      field: "整数",
      topics: ["平方数", "因数分解", "約数の個数", "素数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a=1$ から $299$、$n=1$ から $399$ まで全探索し、$f_a(n)$ が平方数なら必ず $n\\le a$ であることを確かめた",
          "$a=1$ から $599$ まで $N_a$ を全探索で数え、$N_a=1$ と「$4a+1$ が素数」が完全に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の整数 $n$ について、$f_a(n)$ が平方数ならば $n\le a$ であることを示す`,
          answer: String.raw`$n>a$ と仮定すると $a<0$ が導かれ、$a$ が正の整数であることに反する`,
          approach: String.raw`背理法が速い。$n>a$ なら $f_a(n)=n^{2}+n-a$ は $n^{2}$ より大きくなり、平方数なら $(n+1)^{2}$ 以上になってしまう。そこから $a$ の符号で矛盾を出す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f_a(n)=n^{2}+n-a$ が平方数であるとし、$f_a(n)=m^{2}$（$m$ は $0$ 以上の整数）とおく。$n>a$ と仮定して矛盾を導く。`,
            },
            {
              k: "p",
              t: String.raw`$n>a$ なら $n-a\ge1$ だから $m^{2}=n^{2}+(n-a)\ge n^{2}+1>n^{2}$ であり、$m>n$ すなわち $m\ge n+1$ となる。よって`,
            },
            { k: "math", t: String.raw`n^{2}+n-a=m^{2}\ge(n+1)^{2}=n^{2}+2n+1` },
            {
              k: "p",
              t: String.raw`である。両辺から $n^{2}$ を引いて整理すると $n-a\ge2n+1$、すなわち $a\le-n-1$ となる。$n\ge1$ だから $a\le-2$ で、$a$ が正の整数であることに反する。`,
            },
            { k: "p", t: String.raw`したがって $n\le a$ である。` },
          ],
          pitfalls: [
            String.raw`$m$ は $0$ 以上の整数である。$m>n\ge1$ から $m\ge n+1$ とするところで、$m$ が整数であることを使っている。`,
            String.raw`「平方数」の定義が問題文で $0$ 以上の整数の2乗と定められている。$f_a(n)=0$ の場合も平方数に含まれることに注意する。`,
          ],
          check: String.raw`$a=6$ のとき $f_6(n)=n^{2}+n-6$ が平方数になるのは $n=2$（$0=0^{2}$）と $n=6$（$36=6^{2}$）で、どちらも $n\le6$。`,
        },
        {
          label: "(2)",
          task: String.raw`$N_a=1$ と「$4a+1$ が素数」が同値であることを示す`,
          answer: String.raw`$f_a(n)=m^{2}$ は $\left(2n+1-2m\right)\left(2n+1+2m\right)=4a+1$ と同値で、$N_a$ は $4a+1$ の約数の組の個数に等しい`,
          approach: String.raw`$n^{2}+n$ は平方完成しても $\dfrac12$ が出て扱いにくいので、4倍して $\left(2n+1\right)^{2}$ を作る。すると平方数の差の形になり、因数分解で $4a+1$ の約数の問題に変わる。`,
          blocks: [
            { k: "p", t: String.raw`$f_a(n)=m^{2}$ の両辺を4倍して整理すると` },
            {
              k: "math",
              t: String.raw`4n^{2}+4n-4a=4m^{2}\ \Longleftrightarrow\ \left(2n+1\right)^{2}-\left(2m\right)^{2}=4a+1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(2n+1-2m\right)\left(2n+1+2m\right)=4a+1`,
            },
            {
              k: "p",
              t: String.raw`となる。以下 $N=4a+1$ とおく。$N$ は $5$ 以上の奇数である。`,
            },
            {
              k: "p",
              t: String.raw`**組と解の対応。** $d=2n+1-2m$、$e=2n+1+2m$ とおくと $de=N>0$ で、$e=2n+1+2m>0$ だから $d>0$ であり、$m\ge0$ より $d\le e$ である。逆に $N=de$（$0<d\le e$）が与えられたとき`,
            },
            {
              k: "math",
              t: String.raw`2n+1=\frac{d+e}{2},\qquad 2m=\frac{e-d}{2}`,
            },
            {
              k: "p",
              t: String.raw`で $n,m$ を定める。$N$ が奇数だから $d,e$ はともに奇数で、$d+e$ も $e-d$ も偶数である。さらに $\dfrac{d+e}{2}$ と $\dfrac{e-d}{2}$ の和は $e$（奇数）なので、一方が奇数で他方が偶数になる。`,
            },
            {
              k: "p",
              t: String.raw`どちらが奇数かは $d,e$ を $4$ で割った余りで決まる。$N\equiv1\pmod4$ だから、$d\equiv e\equiv1$ か $d\equiv e\equiv3$ のどちらかで、いずれの場合も $d+e\equiv2\pmod4$、$e-d\equiv0\pmod4$ となる。つまり $\dfrac{d+e}{2}$ が奇数、$\dfrac{e-d}{2}$ が偶数で、$n,m$ はともに整数として定まる。`,
            },
            {
              k: "p",
              t: String.raw`$n$ が正であることも確かめる。$2n+1=\dfrac{d+e}{2}$ で、$d\ge1$、$e\ge\dfrac{N}{d}\ge1$ だから $d+e\ge1+N\ge6$、よって $2n+1\ge3$ すなわち $n\ge1$ である。`,
            },
            {
              k: "p",
              t: String.raw`以上より、$f_a(n)$ が平方数となる正の整数 $n$ と、$N$ の約数の組 $(d,e)$（$de=N$、$0<d\le e$）とが1対1に対応する。したがって $N_a$ はこの組の個数に等しい。`,
            },
            {
              k: "p",
              t: String.raw`**同値性。** 約数の組の個数が $1$ になるのは、$N$ の正の約数が $1$ と $N$ だけで、かつ $d=e$ の組がない場合、すなわち $N$ が素数のときである。実際、$N$ が素数なら組は $(1,N)$ の1つだけ。$N$ が素数でないとき、$N=1$ は $N\ge5$ に反するので $N$ は合成数で、$1<d_0\le\sqrt N$ をみたす約数 $d_0$ が存在し、組 $(1,N)$ と $\left(d_0,\dfrac{N}{d_0}\right)$ の2つ以上が取れる。`,
            },
            {
              k: "p",
              t: String.raw`よって $N_a=1$ であることと $N=4a+1$ が素数であることは同値である。`,
            },
          ],
          pitfalls: [
            String.raw`$4$ 倍して $\left(2n+1\right)^{2}$ を作るのがこの問題の要。平方完成で $\left(n+\dfrac12\right)^{2}$ のまま進めると、整数の議論に持ち込めない。`,
            String.raw`$d,e$ から $n,m$ が整数として戻ることを確かめる。$N\equiv1\pmod4$ がここで効いていて、確認を飛ばすと対応が1対1だと言えない。`,
            String.raw`$n$ が**正**であることまで示す。$n=0$ を数えてしまうと個数が1つずれる。`,
          ],
          check: String.raw`$a=1$ なら $N=5$（素数）で、組は $(1,5)$ のみ。$n=1$、$m=1$ で $f_1(1)=1=1^{2}$ となり $N_1=1$。$a=6$ なら $N=25$（素数でない）で、組は $(1,25)$ と $(5,5)$ の2つ。実際 $f_6(2)=0=0^{2}$、$f_6(6)=36=6^{2}$ で $N_6=2$ である。$a=1$ から $599$ まで全探索しても、$N_a=1$ と「$4a+1$ が素数」は完全に一致した。`,
        },
      ],
    },

    {
      no: 6,
      field: "複素数平面",
      topics: ["反転", "軌跡", "放物線", "最大最小"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "円周上の2000点で $\\mathrm{Re}\\left(\\frac1z\\right)=1$ を確かめた",
          "$s,t$ を20万組ランダムに取って $\\frac{1}{\\alpha^{2}}+\\frac{1}{\\beta^{2}}$ を作り、すべて $\\mathrm{Re}\\,w<2-\\frac{(\\mathrm{Im}\\,w)^{2}}{8}$ をみたすこと、逆に領域の点がすべて実現することを確かめた",
          "$\\gamma$ の範囲を格子で全探索し、$\\mathrm{Re}\\left(\\frac1\\gamma\\right)$ の最大が $\\frac12$（$\\gamma=2$）、最小が $-\\frac1{16}$（$\\gamma=-4\\pm4\\sqrt3\\,i$）に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C$ 上の $z$ に対し $\dfrac1z$ の実部が $1$ であることを示す`,
          answer: String.raw`$C$ 上では $|z|^{2}=\mathrm{Re}\,z$ となり、$\mathrm{Re}\dfrac1z=\dfrac{\mathrm{Re}\,z}{|z|^{2}}=1$`,
          approach: String.raw`円の方程式を共役で書き直すと、$z\overline z$ と $z+\overline z$ の関係になる。そこから $\dfrac1z=\dfrac{\overline z}{|z|^{2}}$ の実部がすぐ出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ は $\left|z-\dfrac12\right|=\dfrac12$ から原点を除いたものである。両辺を2乗して共役で書くと`,
            },
            {
              k: "math",
              t: String.raw`\left(z-\frac12\right)\overline{\left(z-\frac12\right)}=\frac14\ \Longleftrightarrow\ z\overline z-\frac{z+\overline z}{2}=0`,
            },
            {
              k: "p",
              t: String.raw`となる。$z\overline z=|z|^{2}$、$\dfrac{z+\overline z}{2}=\mathrm{Re}\,z$ だから $|z|^{2}=\mathrm{Re}\,z$ である。`,
            },
            {
              k: "p",
              t: String.raw`$C$ 上では $z\ne0$ なので $\dfrac1z=\dfrac{\overline z}{|z|^{2}}$ と書けて`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{Re}\frac1z=\frac{\mathrm{Re}\,\overline z}{|z|^{2}}=\frac{\mathrm{Re}\,z}{|z|^{2}}=\frac{|z|^{2}}{|z|^{2}}=1`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`原点を除いてあるのは $\dfrac1z$ を考えるため。除外の理由を1行書いておく。`,
            String.raw`$\mathrm{Re}\,\overline z=\mathrm{Re}\,z$ である。共役を取っても実部は変わらない。`,
          ],
          check: String.raw`$z=1$ は $C$ 上にあり $\dfrac1z=1$ で実部 $1$。$z=\dfrac12+\dfrac12i$ も $C$ 上で、$\dfrac1z=1-i$ の実部は $1$。`,
        },
        {
          label: "(2)",
          task: String.raw`$\alpha,\beta$ が $C$ 上の相異なる複素数のとき、$\dfrac{1}{\alpha^{2}}+\dfrac{1}{\beta^{2}}$ のとりうる範囲を図示する`,
          answer: String.raw`放物線 $x=2-\dfrac{y^{2}}{8}$ の左側の開いた領域、すなわち $\mathrm{Re}\,w<2-\dfrac{\left(\mathrm{Im}\,w\right)^{2}}{8}$`,
          approach: String.raw`(1) より $\dfrac1\alpha$、$\dfrac1\beta$ は直線 $\mathrm{Re}=1$ 上を動く。そこで $\dfrac1\alpha=1+si$、$\dfrac1\beta=1+ti$ と置けば、2乗の和は $s,t$ の対称式で書ける。対称式なので、和と平方和を変数に取り替えると条件が見やすくなる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) より $\dfrac1\alpha$、$\dfrac1\beta$ の実部はどちらも $1$ だから、実数 $s,t$ を用いて $\dfrac1\alpha=1+si$、$\dfrac1\beta=1+ti$ と書ける。`,
            },
            {
              k: "p",
              t: String.raw`逆に、任意の実数 $s$ に対し $1+si\ne0$ なので $\alpha=\dfrac{1}{1+si}$ が定まり、これは $C$ 上にある（$\left|\alpha-\dfrac12\right|=\left|\dfrac{1}{1+si}-\dfrac12\right|=\left|\dfrac{1-si}{2(1+si)}\right|=\dfrac12$）。つまり $s$ は実数全体を動く。また $\alpha\ne\beta$ は $s\ne t$ と同値である。`,
            },
            { k: "p", t: String.raw`このとき` },
            {
              k: "math",
              t: String.raw`w=\frac{1}{\alpha^{2}}+\frac{1}{\beta^{2}}=\left(1+si\right)^{2}+\left(1+ti\right)^{2}=\left(2-s^{2}-t^{2}\right)+2\left(s+t\right)i`,
            },
            {
              k: "p",
              t: String.raw`となる。$w=x+yi$ とおくと $x=2-\left(s^{2}+t^{2}\right)$、$y=2(s+t)$ である。`,
            },
            {
              k: "p",
              t: String.raw`$p=s+t$、$q=s^{2}+t^{2}$ とおくと $p=\dfrac{y}{2}$、$q=2-x$ である。$s,t$ は2次方程式 $X^{2}-pX+\dfrac{p^{2}-q}{2}=0$ の2解だから、$s,t$ が相異なる実数であることは判別式が正であること、すなわち`,
            },
            {
              k: "math",
              t: String.raw`p^{2}-4\cdot\frac{p^{2}-q}{2}>0\ \Longleftrightarrow\ 2q-p^{2}>0\ \Longleftrightarrow\ q>\frac{p^{2}}{2}`,
            },
            { k: "p", t: String.raw`と同値である。$p,q$ を $x,y$ に戻すと` },
            {
              k: "math",
              t: String.raw`2-x>\frac{1}{2}\left(\frac{y}{2}\right)^{2}=\frac{y^{2}}{8}\ \Longleftrightarrow\ x<2-\frac{y^{2}}{8}`,
            },
            {
              k: "p",
              t: String.raw`となる。逆にこの不等式をみたす $(x,y)$ に対しては $q>\dfrac{p^{2}}{2}$ となる $p,q$ が定まり、相異なる実数 $s,t$ が取れる。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\dfrac{1}{\alpha^{2}}+\dfrac{1}{\beta^{2}}$ のとりうる範囲。放物線 $x=2-\dfrac{y^{2}}{8}$ の左側で、境界は含まない（破線）。頂点は $(2,0)$。`,
                view: [-7, 4, -7.5, 7.5],
                step: { x: 2, y: 2 },
                items: [
                  {
                    k: "param",
                    f: (u: number) => [2 - (u * u) / 8, u] as [number, number],
                    from: -7.2,
                    to: 7.2,
                    dash: true,
                  },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "right" },
                  { k: "text", at: [-3.6, 3.4], label: "この側（境界は含まない）", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`以上より、求める範囲は放物線 $x=2-\dfrac{y^{2}}{8}$ の左側の領域（境界を含まない）である。`,
            },
          ],
          pitfalls: [
            String.raw`$s,t$ が**相異なる**という条件が判別式の正の不等号になる。等号を許すと境界まで入ってしまい、(3) の答えが変わる。`,
            String.raw`$s$ が実数全体を動くことを、逆向きの確認（$\alpha=\dfrac{1}{1+si}$ が $C$ 上にある）まで書く。書かないと「範囲」ではなく「必要条件」で終わる。`,
          ],
          check: String.raw`$s=1,t=-1$ なら $w=\left(1+i\right)^{2}+\left(1-i\right)^{2}=2i-2i=0$ で、$0<2-0$ をみたす。$s=0,t\to0$ は $s\ne t$ に反するが、$s=0,t=0.01$ なら $w$ は $2$ のすぐ左に来る。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) の範囲に属さない $\gamma$ について、$\mathrm{Re}\dfrac1\gamma$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac12$（$\gamma=2$ のとき）、最小値 $-\dfrac{1}{16}$（$\gamma=-4\pm4\sqrt3\,i$ のとき）`,
          approach: String.raw`$\gamma=x+yi$ とおくと条件は $y^{2}\ge16-8x$ で、求めるものは $\dfrac{x}{x^{2}+y^{2}}$。$x$ を固定すると分母は $y^{2}$ が小さいほど小さいので、境界に乗せたときが端になる。そこから1変数の最大最小に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\gamma=x+yi$（$x,y$ は実数）とおく。(2) の範囲に属さないことは $x\ge2-\dfrac{y^{2}}{8}$、すなわち`,
            },
            { k: "math", t: String.raw`y^{2}\ge16-8x` },
            {
              k: "p",
              t: String.raw`と書ける。なお原点は $0<2$ をみたして (2) の範囲に入るので、$\gamma\ne0$ である。このとき`,
            },
            { k: "math", t: String.raw`\mathrm{Re}\frac1\gamma=\frac{x}{x^{2}+y^{2}}` },
            {
              k: "p",
              t: String.raw`である。$x$ を固定して考える。分子 $x$ は $y$ によらないので、$x>0$ のときは分母が小さいほど値が大きく、$x<0$ のときは分母が小さいほど値が小さい。どちらの場合も $y^{2}$ を許される範囲で最小にしたときが端になる。`,
            },
            {
              k: "p",
              t: String.raw`$x\ge2$ なら $y^{2}\ge16-8x$ は $y=0$ でもみたされ、そのとき $\mathrm{Re}\dfrac1\gamma=\dfrac1x\le\dfrac12$ で、$x=2$ のとき $\dfrac12$ を取る。`,
            },
            {
              k: "p",
              t: String.raw`$x<2$ なら $y^{2}$ の最小は $16-8x$ で、そのとき`,
            },
            {
              k: "math",
              t: String.raw`\frac{x}{x^{2}+16-8x}=\frac{x}{\left(x-4\right)^{2}}`,
            },
            { k: "p", t: String.raw`となる。そこで $x<2$ で $g(x)=\dfrac{x}{\left(x-4\right)^{2}}$ の増減を調べる。` },
            {
              k: "math",
              t: String.raw`g'(x)=\frac{\left(x-4\right)^{2}-x\cdot2\left(x-4\right)}{\left(x-4\right)^{4}}=\frac{-\left(x+4\right)}{\left(x-4\right)^{3}}`,
            },
            {
              k: "p",
              t: String.raw`$x<2$ では $\left(x-4\right)^{3}<0$ だから、$g'(x)$ の符号は $x+4$ の符号と同じである。よって $x<-4$ で減少、$-4<x<2$ で増加し、$x=-4$ で最小になる。`,
            },
            {
              k: "math",
              t: String.raw`g(-4)=\frac{-4}{\left(-8\right)^{2}}=-\frac{1}{16}`,
            },
            {
              k: "p",
              t: String.raw`$x\to-\infty$ では $g(x)\to0^{-}$ なので、下に有界で最小値は $-\dfrac{1}{16}$ である。また $x\to2^{-}$ では $g(x)\to\dfrac12$ に近づくが、$x=2$ の場合は上で見たとおり $\dfrac12$ をちょうど取る。`,
            },
            {
              k: "p",
              t: String.raw`以上をまとめると、最大値は $\dfrac12$ で $x=2,\ y=0$、つまり $\gamma=2$ のとき。最小値は $-\dfrac{1}{16}$ で $x=-4$、$y^{2}=16+32=48$、つまり $\gamma=-4\pm4\sqrt3\,i$ のときである。`,
            },
            {
              k: "p",
              t: String.raw`どちらも条件をみたすことを確かめておく。$\gamma=2$ では $y^{2}=0$、$16-8x=0$ で等号が成り立ち、範囲に属さない。$\gamma=-4+4\sqrt3\,i$ では $y^{2}=48$、$16-8(-4)=48$ でこれも等号である。`,
            },
          ],
          pitfalls: [
            String.raw`(2) の範囲が境界を含まないので、その**外側**は境界を含む。最大も最小も境界上で取るため、ここを取り違えると「最大値なし」としてしまう。`,
            String.raw`$x$ を固定して $y^{2}$ を動かす、という2段階の押さえ方をする。2変数のまま微分しようとすると手間が増える。`,
            String.raw`$x<2$ の側で $g$ は $x=-4$ に極小を持つ。端の値だけを比べると最小値を取り逃がす。`,
          ],
          check: String.raw`$\gamma=2$ では $\dfrac1\gamma=\dfrac12$ で実部 $\dfrac12$。$\gamma=-4+4\sqrt3\,i$ では $|\gamma|^{2}=16+48=64$ で $\mathrm{Re}\dfrac1\gamma=\dfrac{-4}{64}=-\dfrac{1}{16}$。格子による全探索でも、最大 $0.4951$（$x=2.02$ の格子点）、最小 $-0.06244$（$x=-4.155$ の格子点）と、刻み幅のぶんだけずれた値に収まった。`,
        },
      ],
    },
  ],
};
