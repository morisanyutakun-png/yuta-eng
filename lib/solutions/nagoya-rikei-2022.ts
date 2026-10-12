import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2022年度（令和4年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問(2) の g(α) = α³ - 3α。b の値ごとの実数解の個数を見る。 */
const G22 = (a: number): number => a ** 3 - 3 * a;

/** 第3問の正六角形 OABCDE（A = p）。頂点を p の定数倍で表す。 */
const HEX22 = (px: number, py: number): [number, number][] => {
  const p: [number, number] = [px, py];
  const mul = (u: [number, number], c: [number, number]): [number, number] => [
    u[0] * c[0] - u[1] * c[1],
    u[0] * c[1] + u[1] * c[0],
  ];
  const s3 = Math.sqrt(3);
  return [
    [0, 0],
    p,
    mul(p, [3 / 2, s3 / 2]),
    mul(p, [1, s3]),
    mul(p, [0, s3]),
    mul(p, [-1 / 2, s3 / 2]),
  ];
};

export const nagoyaRikei2022: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "整式",
      topics: ["剰余の定理", "重解と微分", "3次関数の増減", "解の個数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.7,-1.3,2,0$ と $x=0.3,1.1,-2,5$ で $x^{3}=(x-a)^{2}(x+2a)+3a^{2}x-2a^{3}$ を確かめた",
          "$\\alpha^{3}-3\\alpha=b$ の実数解の個数を判別式 $108-27b^{2}$ で数えると、$\\left|b\\right|>2$ で1個、$\\left|b\\right|=2$ で2個、$\\left|b\\right|<2$ で3個になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`整式 $x^{3}$ を2次式 $(x-a)^{2}$ で割ったときの余りを求める`,
          answer: String.raw`$3a^{2}x-2a^{3}$`,
          approach: String.raw`余りを $px+q$ とおき、$x=a$ の代入と、両辺を微分してからの $x=a$ の代入の2本で決める。重解で割るときの定石である。`,
          blocks: [
            { k: "p", t: String.raw`商を $Q(x)$、余りを $px+q$ とすると` },
            { k: "math", t: String.raw`x^{3}=(x-a)^{2}Q(x)+px+q` },
            { k: "p", t: String.raw`である。$x=a$ を代入すると` },
            { k: "math", t: String.raw`a^{3}=pa+q\qquad\cdots\text{①}` },
            {
              k: "p",
              t: String.raw`である。次に両辺を $x$ で微分する。右辺の第1項の導関数は`,
            },
            {
              k: "math",
              t: String.raw`2(x-a)Q(x)+(x-a)^{2}Q'(x)`,
            },
            { k: "p", t: String.raw`で、どちらの項も $x-a$ を因数にもつので $x=a$ で $0$ になる。よって` },
            { k: "math", t: String.raw`3a^{2}=p\qquad\cdots\text{②}` },
            { k: "p", t: String.raw`である。② を ① に入れて` },
            { k: "math", t: String.raw`q=a^{3}-3a^{3}=-2a^{3}` },
            { k: "p", t: String.raw`だから、求める余りは` },
            { k: "math", t: String.raw`3a^{2}x-2a^{3}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$x=(x-a)+a$ として $x^{3}=\left\{(x-a)+a\right\}^{3}$ を二項展開してもよい。$(x-a)^{2}$ を含まない項は $3a^{2}(x-a)+a^{3}=3a^{2}x-2a^{3}$ で同じになる。商は $x+2a$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$(x-a)^{2}$ は2次式なので余りは1次以下。$px+q$ とおく。`,
            String.raw`重解で割るときは「代入」だけでは式が1本しか出ない。微分してもう1本作る。`,
          ],
          check: String.raw`$x^{3}-\left(3a^{2}x-2a^{3}\right)$ を $(x-a)^{2}$ で割ると、いつも商が $x+2a$ でちょうど割り切れた。`,
        },
        {
          label: "(2)",
          task: String.raw`実数係数の2次式 $f(x)=x^{2}+\alpha x+\beta$ で $x^{3}$ を割ったときの余りが $3x+b$ であるとき、$b$ の値に応じてこのような $f(x)$ が何個あるかを求める`,
          answer: String.raw`$\left|b\right|<2$ のとき3個、$\left|b\right|=2$ のとき2個、$\left|b\right|>2$ のとき1個`,
          approach: String.raw`$x^{3}$ を $x^{2}+\alpha x+\beta$ で割った余りを $\alpha,\beta$ で表し、$3x+b$ と係数比較する。$\beta$ を消すと $\alpha$ の3次方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`実際に割り算をすると` },
            {
              k: "math",
              t: String.raw`x^{3}=\left(x^{2}+\alpha x+\beta\right)\left(x-\alpha\right)+\left(\alpha^{2}-\beta\right)x+\alpha\beta`,
            },
            {
              k: "p",
              t: String.raw`である（右辺を展開すると $x^{3}+(\beta-\alpha^{2})x-\alpha\beta+(\alpha^{2}-\beta)x+\alpha\beta=x^{3}$）。よって余りは $\left(\alpha^{2}-\beta\right)x+\alpha\beta$ である。`,
            },
            { k: "p", t: String.raw`これが $3x+b$ に等しいので` },
            {
              k: "math",
              t: String.raw`\alpha^{2}-\beta=3\qquad\cdots\text{①},\qquad\alpha\beta=b\qquad\cdots\text{②}`,
            },
            { k: "p", t: String.raw`である。① より $\beta=\alpha^{2}-3$、これを ② に入れて` },
            {
              k: "math",
              t: String.raw`\alpha\left(\alpha^{2}-3\right)=b,\qquad\text{すなわち}\quad\alpha^{3}-3\alpha=b`,
            },
            {
              k: "p",
              t: String.raw`である。$f$ は $\alpha$ で決まる（$\beta=\alpha^{2}-3$）ので、求める個数は $\alpha^{3}-3\alpha=b$ の実数解の個数である。`,
            },
            { k: "p", t: String.raw`**増減。** $g(\alpha)=\alpha^{3}-3\alpha$ とおくと` },
            {
              k: "math",
              t: String.raw`g'(\alpha)=3\alpha^{2}-3=3\left(\alpha+1\right)\left(\alpha-1\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$\alpha=-1$ で極大値 $g(-1)=-1+3=2$、$\alpha=1$ で極小値 $g(1)=1-3=-2$ をとる。`,
            },
            { k: "p", t: String.raw`水平線 $y=b$ との交点の個数を数えると` },
            {
              k: "steps",
              items: [
                String.raw`$b<-2$ または $b>2$：**1個**`,
                String.raw`$b=-2$ または $b=2$：**2個**（極値のところで接する）`,
                String.raw`$-2<b<2$：**3個**`,
              ],
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=\alpha^{3}-3\alpha$。極大値 $2$（$\alpha=-1$）と極小値 $-2$（$\alpha=1$）をもつ。水平線 $y=b$ との交点の個数がそのまま $f(x)$ の個数で、$-2<b<2$ で3個、$b=\pm2$ で2個、それ以外で1個になる。`,
                view: [-2.9, 2.9, -4.4, 4.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: G22, from: -2.7, to: 2.7 },
                  { k: "seg", a: [-2.9, 2], b: [2.9, 2], dash: true },
                  { k: "seg", a: [-2.9, -2], b: [2.9, -2], dash: true },
                  { k: "dot", at: [-1, 2], label: "(-1, 2)", place: "above-right" },
                  { k: "dot", at: [1, -2], label: "(1, -2)", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$f$ は $(\alpha,\beta)$ の組で決まるが、$\beta=\alpha^{2}-3$ と $\alpha$ から定まるので、数えるのは $\alpha$ の個数でよい。`,
            String.raw`$b=\pm2$ のときは重解が1つと別の解が1つで**2個**。3個でも1個でもない。`,
            String.raw`「余りが $3x+b$」なので $x$ の係数が $3$ に固定される。ここから $\beta=\alpha^{2}-3$ が出る。`,
          ],
          check: String.raw`$\alpha^{3}-3\alpha-b=0$ の判別式 $108-27b^{2}$ の符号で数えると、$b=\pm2.5,\pm5$ で1個、$b=\pm2$ で2個、$b=0,\pm1,\pm1.9999$ で3個となり、予想と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["不等式の場合分け", "積の大小", "互いに素", "数え上げ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$6^{3}=216$ 通りを全列挙すると、$ab+2c\\ge abc$ が $58$ 通り（$\\frac{29}{108}$）、$\\gcd\\left(ab+2c,\;2abc\\right)=1$ が $39$ 通り（$\\frac{13}{72}$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$ab+2c\ge abc$ となる確率を求める`,
          answer: String.raw`$\dfrac{29}{108}$`,
          approach: String.raw`$c$ で場合を分ける。$c=1$ なら恒等的に成り立ち、$c\ge2$ なら $ab\le\dfrac{2c}{c-1}$ という $ab$ の上限になる。`,
          blocks: [
            { k: "p", t: String.raw`$ab+2c\ge abc$ を $ab(1-c)+2c\ge0$ と書き直す。` },
            {
              k: "p",
              t: String.raw`**$c=1$ のとき。** 左辺は $0+2=2\ge0$ でつねに成り立つ。$(a,b)$ は自由なので $6\times6=36$ 通り。`,
            },
            {
              k: "p",
              t: String.raw`**$c\ge2$ のとき。** $c-1>0$ で割って`,
            },
            {
              k: "math",
              t: String.raw`ab\le\frac{2c}{c-1}`,
            },
            { k: "p", t: String.raw`である。右辺を計算すると` },
            {
              k: "math",
              t: String.raw`c=2:\;4,\qquad c=3:\;3,\qquad c=4:\;\frac83,\qquad c=5:\;\frac52,\qquad c=6:\;\frac{12}5`,
            },
            {
              k: "p",
              t: String.raw`なので、$ab$（整数）の条件はそれぞれ $ab\le4$、$ab\le3$、$ab\le2$、$ab\le2$、$ab\le2$ である。`,
            },
            { k: "p", t: String.raw`**$(a,b)$ を数える。** ` },
            {
              k: "steps",
              items: [
                String.raw`$ab\le2$：$(1,1),(1,2),(2,1)$ の**3**通り`,
                String.raw`$ab\le3$：上に $(1,3),(3,1)$ を加えて**5**通り`,
                String.raw`$ab\le4$：さらに $(1,4),(4,1),(2,2)$ を加えて**8**通り`,
              ],
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`36+8+5+3+3+3=58\ \text{通り}`,
            },
            { k: "p", t: String.raw`で` },
            {
              k: "math",
              t: String.raw`P=\frac{58}{216}=\frac{29}{108}`,
            },
            { k: "p", t: String.raw`である（$0.269$ ほど）。` },
          ],
          pitfalls: [
            String.raw`$c=1$ を別扱いにする。$c-1=0$ で割れないし、このとき全部成り立つ。`,
            String.raw`$\frac{2c}{c-1}$ は $c$ が大きいほど小さくなり、$c\ge4$ では $3$ を下回る。$ab\le2$ に落ち着く。`,
            String.raw`$ab\le4$ に $(1,4),(4,1),(2,2)$ を数え落とさない。$(2,2)$ を忘れやすい。`,
          ],
          check: String.raw`$216$ 通りを全列挙すると $58$ 通りで、$\frac{58}{216}=\frac{29}{108}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$ab+2c$ と $2abc$ が互いに素となる確率を求める`,
          answer: String.raw`$\dfrac{13}{72}$`,
          approach: String.raw`$2abc$ は偶数なので、まず $ab+2c$ が奇数、つまり $ab$ が奇数（$a,b$ がともに奇数）でなければならない。あとは $ab+2c$ と $a$、$b$、$c$ それぞれの共通因数を見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$a,b$ は奇数。** $2abc$ は偶数なので、互いに素であるためには $ab+2c$ が奇数、すなわち $ab$ が奇数、つまり $a$ も $b$ も奇数（$1,3,5$）でなければならない。`,
            },
            {
              k: "p",
              t: String.raw`このとき $ab+2c$ は奇数なので $2$ とは互いに素であり、条件は`,
            },
            {
              k: "math",
              t: String.raw`\gcd\left(ab+2c,\;abc\right)=1`,
            },
            { k: "p", t: String.raw`と同じになる。素数 $p$ が両方を割るとすると` },
            {
              k: "steps",
              items: [
                String.raw`$p\mid a$ のとき：$p\mid ab+2c$ と $p\mid ab$ から $p\mid2c$。$p$ は奇数（$a$ が奇数）なので $p\mid c$`,
                String.raw`$p\mid b$ のとき：同様に $p\mid c$`,
                String.raw`$p\mid c$ のとき：$p\mid ab+2c$ と $p\mid 2c$ から $p\mid ab$、よって $p\mid a$ または $p\mid b$`,
              ],
            },
            {
              k: "p",
              t: String.raw`つまり条件は「$a$ と $c$ が互いに素、かつ $b$ と $c$ が互いに素」、まとめると $\gcd(ab,\,c)=1$ である。`,
            },
            { k: "p", t: String.raw`**数える。** $a,b\in\{1,3,5\}$、$c\in\{1,\dots,6\}$ で $\gcd(ab,c)=1$ を数える。` },
            {
              k: "math",
              t: String.raw`\begin{array}{c|c|c}
(a,b)&ab&\gcd(ab,c)=1\ \text{となる}\ c\\\hline
(1,1)&1&1,2,3,4,5,6\;(6)\\
(1,3),(3,1)&3&1,2,4,5\;(4)\\
(1,5),(5,1)&5&1,2,3,4,6\;(5)\\
(3,3)&9&1,2,4,5\;(4)\\
(3,5),(5,3)&15&1,2,4\;(3)\\
(5,5)&25&1,2,3,4,6\;(5)
\end{array}`,
            },
            { k: "p", t: String.raw`合計すると` },
            {
              k: "math",
              t: String.raw`6+2\cdot4+2\cdot5+4+2\cdot3+5=6+8+10+4+6+5=39\ \text{通り}`,
            },
            { k: "p", t: String.raw`で` },
            {
              k: "math",
              t: String.raw`P=\frac{39}{216}=\frac{13}{72}`,
            },
            { k: "p", t: String.raw`である（$0.181$ ほど）。` },
            {
              k: "note",
              t: String.raw`$\gcd(ab,c)=1$ は「$ab$ の素因数（$3$ か $5$ だけ）が $c$ を割らない」ということ。$ab$ が $3$ の倍数なら $c\ne3,6$、$5$ の倍数なら $c\ne5$、と読める。`,
            },
          ],
          pitfalls: [
            String.raw`$2abc$ の $2$ が効いて、まず $ab$ が奇数に絞られる。ここを落とすと数が合わない。`,
            String.raw`$ab+2c$ と $abc$ の共通素因数は $a,b,c$ のどれかを割る。$p\mid c$ と $p\mid ab$ が同値になることを押さえる。`,
            String.raw`$a,b$ が奇数なので、$p\mid a$ なら $p$ は奇数。$p\mid2c$ から $p\mid c$ が言える。`,
          ],
          check: String.raw`$216$ 通りを全列挙して $\gcd\left(ab+2c,\,2abc\right)=1$ を直接判定すると $39$ 通りで、$\frac{39}{216}=\frac{13}{72}$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "複素数平面",
      topics: ["2次方程式の解", "偏角と絶対値", "正六角形の頂点", "因数分解"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$w=1+\\sqrt3\\,i$ が $w^{2}-2w+4=0$ をみたし、$\\left|w\\right|=2$、$\\arg w=60^\\circ$ であることを確かめた",
          "$\\mathrm{A}=p$ とした正六角形の6辺の長さがすべて等しいことを確かめ、$p=\\frac{1-\\sqrt3 i}2,\;\\frac{-1-\\sqrt3 i}4,\;\\frac{-3-\\sqrt3 i}6$ のそれぞれで $\\gamma=\\alpha+1$ が頂点 $\\mathrm{B},\\mathrm{D},\\mathrm{E}$ に一致し、第3式の値が $0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\dfrac\beta\alpha$ を求め、$\alpha,\beta$ がそれぞれどの頂点か答える`,
          answer: String.raw`$\dfrac\beta\alpha=1+\sqrt3\,i$、$\alpha$ は $\mathrm{A}$、$\beta$ は $\mathrm{C}$`,
          approach: String.raw`$4\alpha^{2}-2\alpha\beta+\beta^{2}=0$ を $\alpha^{2}$ で割れば $\dfrac\beta\alpha$ の2次方程式になる。偏角の条件でどちらかに決まる。あとは「$\left|\beta\right|=2\left|\alpha\right|$ かつ偏角が $60^\circ$ 違い」をみたす頂点の組を探す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha\ne0$ なので $4\alpha^{2}-2\alpha\beta+\beta^{2}=0$ の両辺を $\alpha^{2}$ で割る。$w=\dfrac\beta\alpha$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`w^{2}-2w+4=0\quad\Longrightarrow\quad w=1\pm\sqrt3\,i`,
            },
            {
              k: "p",
              t: String.raw`である。$1+\sqrt3\,i=2\left(\cos60^\circ+i\sin60^\circ\right)$、$1-\sqrt3\,i=2\left(\cos(-60^\circ)+i\sin(-60^\circ)\right)$ なので、$0\le\arg w\le\pi$ をみたすのは`,
            },
            { k: "math", t: String.raw`\frac\beta\alpha=1+\sqrt3\,i` },
            {
              k: "p",
              t: String.raw`である。つまり $\left|\beta\right|=2\left|\alpha\right|$ で、$\beta$ の偏角は $\alpha$ の偏角より $60^\circ$ 大きい。`,
            },
            {
              k: "p",
              t: String.raw`**頂点を調べる。** 正六角形 $\mathrm{OABCDE}$ で $\mathrm{A}=p$（$p\ne0$）とすると、反時計回りに並ぶ頂点は`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{O}=0,\;\mathrm{A}=p,\;\mathrm{B}=\frac{3+\sqrt3 i}2p,\;\mathrm{C}=\left(1+\sqrt3 i\right)p,\;\mathrm{D}=\sqrt3\,i\,p,\;\mathrm{E}=\frac{-1+\sqrt3 i}2p`,
            },
            {
              k: "p",
              t: String.raw`である。原点からの距離と偏角のずれ（$\mathrm{A}$ を基準）は`,
            },
            {
              k: "math",
              t: String.raw`\begin{array}{c|c|c}
\text{頂点}&\text{距離}&\text{偏角のずれ}\\\hline
\mathrm{A}&\left|p\right|&0^\circ\\
\mathrm{B}&\sqrt3\left|p\right|&30^\circ\\
\mathrm{C}&2\left|p\right|&60^\circ\\
\mathrm{D}&\sqrt3\left|p\right|&90^\circ\\
\mathrm{E}&\left|p\right|&120^\circ
\end{array}`,
            },
            {
              k: "p",
              t: String.raw`である。距離が2倍になる組は $\left(\mathrm{A},\mathrm{C}\right)$ と $\left(\mathrm{E},\mathrm{C}\right)$ しかなく（$\sqrt3$ や $2$ の2倍に当たる頂点はない）、偏角のずれが $60^\circ$ なのは $\left(\mathrm{A},\mathrm{C}\right)$ のほうだけである（$\mathrm{E}\to\mathrm{C}$ は $-60^\circ$）。したがって`,
            },
            {
              k: "math",
              t: String.raw`\alpha=\mathrm{A},\qquad\beta=\mathrm{C}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`正六角形 $\mathrm{OABCDE}$（反時計回り）。原点 $\mathrm{O}$ からの距離は $\mathrm{A},\mathrm{E}$ が $\left|p\right|$、$\mathrm{B},\mathrm{D}$ が $\sqrt3\left|p\right|$、$\mathrm{C}$ が $2\left|p\right|$。$\mathrm{A}$ を基準とした偏角は $\mathrm{B}$ が $+30^\circ$、$\mathrm{C}$ が $+60^\circ$、$\mathrm{D}$ が $+90^\circ$、$\mathrm{E}$ が $+120^\circ$。`,
                view: [-1.6, 2.4, -0.9, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1.5, Math.sqrt(3) / 2] },
                  { k: "seg", a: [1.5, Math.sqrt(3) / 2], b: [1, Math.sqrt(3)] },
                  { k: "seg", a: [1, Math.sqrt(3)], b: [0, Math.sqrt(3)] },
                  { k: "seg", a: [0, Math.sqrt(3)], b: [-0.5, Math.sqrt(3) / 2] },
                  { k: "seg", a: [-0.5, Math.sqrt(3) / 2], b: [0, 0] },
                  { k: "seg", a: [0, 0], b: [1, Math.sqrt(3)], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "A (= α)", place: "below-right" },
                  { k: "dot", at: [1.5, Math.sqrt(3) / 2], label: "B", place: "right" },
                  { k: "dot", at: [1, Math.sqrt(3)], label: "C (= β)", place: "above-right" },
                  { k: "dot", at: [0, Math.sqrt(3)], label: "D", place: "above-left" },
                  { k: "dot", at: [-0.5, Math.sqrt(3) / 2], label: "E", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$w^{2}-2w+4=0$ の2解は共役で、偏角が $\pm60^\circ$。$0\le\arg w\le\pi$ で $+60^\circ$ のほうに決まる。`,
            String.raw`$\left|\beta\right|=2\left|\alpha\right|$ を先に使って候補を絞る。頂点の距離は $\left|p\right|,\sqrt3\left|p\right|,2\left|p\right|$ の3種類しかない。`,
            String.raw`$\mathrm{E}\to\mathrm{C}$ も距離は2倍だが偏角が $-60^\circ$ なので不適。偏角の向きを確かめる。`,
          ],
          check: String.raw`$w=1+\sqrt3 i$ が $4-2w+w^{2}=0$ をみたし、$\left|w\right|=2$、$\arg w=60^\circ$ であることを数値で確かめた。`,
        },
        {
          label: "(2)",
          task: String.raw`組 $(\alpha,\beta,\gamma)$ をすべて求め、それぞれの組について正六角形 $\mathrm{OABCDE}$ を複素数平面上に図示する`,
          answer: String.raw`$\gamma$ が $\mathrm{B},\mathrm{D},\mathrm{E}$ になる3組。$\alpha=\dfrac{1-\sqrt3 i}2,\;\dfrac{-1-\sqrt3 i}4,\;\dfrac{-3-\sqrt3 i}6$ で、いずれも $\beta=\left(1+\sqrt3 i\right)\alpha$、$\gamma=\alpha+1$`,
          approach: String.raw`第3式を $\gamma$ の2次方程式として解く。$\beta=(1+\sqrt3 i)\alpha$ を入れると因数分解でき、$\gamma=\dfrac{\alpha+\beta}2$ か $\gamma=\alpha+1$ になる。前者は頂点になりえないので、後者が頂点になる $\alpha$ を探す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta=\left(1+\sqrt3 i\right)\alpha$ なので $\alpha+\beta=\left(2+\sqrt3 i\right)\alpha$、$3\alpha+\beta=\left(4+\sqrt3 i\right)\alpha$ である。第3式は`,
            },
            {
              k: "math",
              t: String.raw`2\gamma^{2}-\left\{\left(4+\sqrt3 i\right)\alpha+2\right\}\gamma+\left(\alpha+1\right)\left(2+\sqrt3 i\right)\alpha=0`,
            },
            { k: "p", t: String.raw`である。2解の和と積を見ると` },
            {
              k: "math",
              t: String.raw`\frac{\left(4+\sqrt3 i\right)\alpha+2}2=\frac{\alpha+\beta}2+\left(\alpha+1\right),\qquad
\frac{\left(\alpha+1\right)\left(2+\sqrt3 i\right)\alpha}2=\frac{\alpha+\beta}2\cdot\left(\alpha+1\right)`,
            },
            { k: "p", t: String.raw`となっているので、この2次方程式は` },
            {
              k: "math",
              t: String.raw`2\left(\gamma-\frac{\alpha+\beta}2\right)\left(\gamma-\left(\alpha+1\right)\right)=0`,
            },
            { k: "p", t: String.raw`と因数分解でき` },
            {
              k: "math",
              t: String.raw`\gamma=\frac{\alpha+\beta}2\qquad\text{または}\qquad\gamma=\alpha+1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\gamma=\dfrac{\alpha+\beta}2$ は不適。** $\alpha=p$、$\beta=\left(1+\sqrt3 i\right)p$ なので $\dfrac{\alpha+\beta}2=\dfrac{2+\sqrt3 i}2p$ である。頂点はすべて $p$ の定数倍で、その定数は`,
            },
            {
              k: "math",
              t: String.raw`0,\quad1,\quad\frac{3+\sqrt3 i}2,\quad1+\sqrt3 i,\quad\sqrt3 i,\quad\frac{-1+\sqrt3 i}2`,
            },
            {
              k: "p",
              t: String.raw`のどれかだが、$\dfrac{2+\sqrt3 i}2$ はこのどれとも異なる。よってこの $\gamma$ は頂点になれない。`,
            },
            {
              k: "p",
              t: String.raw`**$\gamma=\alpha+1$ が頂点になる場合。** $\gamma\ne0$、$\gamma\ne\alpha$（$1\ne0$）、$\gamma\ne\beta$（互いに異なるから）なので、$\gamma$ は $\mathrm{B}$、$\mathrm{D}$、$\mathrm{E}$ のいずれかである。$\alpha=p$ として1つずつ解く。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\gamma=\mathrm{B}$：$p+1=\dfrac{3+\sqrt3 i}2p$ より $1=\dfrac{1+\sqrt3 i}2p$、$p=\dfrac2{1+\sqrt3 i}=\dfrac{1-\sqrt3 i}2$`,
                String.raw`$\gamma=\mathrm{D}$：$p+1=\sqrt3\,i\,p$ より $1=\left(\sqrt3 i-1\right)p$、$p=\dfrac1{\sqrt3 i-1}=\dfrac{-1-\sqrt3 i}4$`,
                String.raw`$\gamma=\mathrm{E}$：$p+1=\dfrac{-1+\sqrt3 i}2p$ より $1=\dfrac{-3+\sqrt3 i}2p$、$p=\dfrac2{-3+\sqrt3 i}=\dfrac{-3-\sqrt3 i}6$`,
              ],
            },
            { k: "p", t: String.raw`それぞれ $\beta=\left(1+\sqrt3 i\right)\alpha$、$\gamma=\alpha+1$ を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{array}{c|c|c|c}
\gamma\ \text{の頂点}&\alpha&\beta&\gamma\\\hline
\mathrm{B}&\dfrac{1-\sqrt3 i}2&2&\dfrac{3-\sqrt3 i}2\\[2mm]
\mathrm{D}&\dfrac{-1-\sqrt3 i}4&\dfrac{1-\sqrt3 i}2&\dfrac{3-\sqrt3 i}4\\[2mm]
\mathrm{E}&\dfrac{-3-\sqrt3 i}6&-\dfrac{2\sqrt3}3i&\dfrac{3-\sqrt3 i}6
\end{array}`,
            },
            {
              k: "p",
              t: String.raw`の3組である。どの組も $\alpha,\beta,\gamma$ は互いに異なり、$0$ でない。`,
            },
            {
              k: "p",
              t: String.raw`**図示。** 正六角形は $\mathrm{A}=\alpha$ を決めれば1つに定まる。3つの場合は、$\mathrm{A}$ がそれぞれ`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\left|\alpha\right|=1$、$\arg\alpha=-60^\circ$（$\gamma=\mathrm{B}$）`,
                String.raw`$\left|\alpha\right|=\dfrac12$、$\arg\alpha=-120^\circ$（$\gamma=\mathrm{D}$）`,
                String.raw`$\left|\alpha\right|=\dfrac1{\sqrt3}$、$\arg\alpha=-150^\circ$（$\gamma=\mathrm{E}$）`,
              ],
            },
            {
              k: "p",
              t: String.raw`の位置にあり、そこから反時計回りに $\mathrm{B},\mathrm{C},\mathrm{D},\mathrm{E}$ が並ぶ。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`3つの場合の正六角形。実線が $\gamma=\mathrm{B}$（$\alpha=\frac{1-\sqrt3 i}2$、1辺 $1$）、点線が $\gamma=\mathrm{D}$（$\alpha=\frac{-1-\sqrt3 i}4$、1辺 $\frac12$）、薄い線が $\gamma=\mathrm{E}$（$\alpha=\frac{-3-\sqrt3 i}6$、1辺 $\frac1{\sqrt3}$）。どれも原点を頂点にもち、$\gamma=\alpha+1$ が実軸方向に $1$ ずれた頂点になっている。`,
                view: [-1.3, 2.6, -1.3, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  ...[0, 1, 2, 3, 4, 5].map((i) => ({
                    k: "seg" as const,
                    a: HEX22(0.5, -Math.sqrt(3) / 2)[i],
                    b: HEX22(0.5, -Math.sqrt(3) / 2)[(i + 1) % 6],
                  })),
                  ...[0, 1, 2, 3, 4, 5].map((i) => ({
                    k: "seg" as const,
                    a: HEX22(-0.25, -Math.sqrt(3) / 4)[i],
                    b: HEX22(-0.25, -Math.sqrt(3) / 4)[(i + 1) % 6],
                    dash: true,
                  })),
                  ...[0, 1, 2, 3, 4, 5].map((i) => ({
                    k: "seg" as const,
                    a: HEX22(-0.5, -Math.sqrt(3) / 6)[i],
                    b: HEX22(-0.5, -Math.sqrt(3) / 6)[(i + 1) % 6],
                    faint: true,
                  })),
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [1.5, -Math.sqrt(3) / 2], label: "γ = B", place: "right" },
                  { k: "dot", at: [0.75, -Math.sqrt(3) / 4], label: "γ = D", place: "below-right" },
                  { k: "dot", at: [0.5, -Math.sqrt(3) / 6], label: "γ = E", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`第3式は $\gamma$ の2次方程式。和と積を見ると $\dfrac{\alpha+\beta}2$ と $\alpha+1$ に分かれる。解の公式を使うより因数分解を狙う。`,
            String.raw`$\dfrac{\alpha+\beta}2$（線分 $\alpha\beta$ の中点）は頂点にならない。$p$ の係数が頂点の係数のどれとも違うことを言えばよい。`,
            String.raw`$\gamma=\alpha+1$ は「$\alpha$ から実軸方向に $1$ 動いた点」。これが頂点になるように六角形の大きさと向きが決まる。`,
            String.raw`$\gamma=\mathrm{A}$（$=\alpha$）や $\gamma=\mathrm{C}$（$=\beta$）は「互いに異なる」に反する。$\gamma=\mathrm{O}$ も $\gamma\ne0$ に反する。`,
          ],
          check: String.raw`3つの $p$ について、$\gamma=\alpha+1$ が確かに頂点 $\mathrm{B},\mathrm{D},\mathrm{E}$ に一致し、第3式の値が $10^{-15}$ 以下になることを確かめた。6辺の長さがすべて等しいことも確かめた。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["広義積分の発散", "不等式による評価", "中間値の定理", "置換積分"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=1+x,\;e^{x},\;1+\\sqrt x$（どれも $x\\ge0$ で増加、$f(0)=1$）と $n=2,5,20,100$ について、$I_n=\\int_0^{2-1/n}\\frac{f}{2-x}dx$ と $F_n(4)$ を数値積分し、つねに $F_n(4)>I_n$ となることを確かめた",
          "同じ組で $F_n(a)=I_n$ を二分法で解くと、$a_n$ はいずれも $4$ より小さかった（$2.37$〜$3.35$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}\int_0^{2-\frac1n}\frac{f(x)}{2-x}\,dx=\infty$ を示す`,
          answer: String.raw`$f(x)\ge1$ なので $\displaystyle\int_0^{2-\frac1n}\frac{dx}{2-x}=\log2n\to\infty$ で下から押さえられる`,
          approach: String.raw`$f$ は増加で $f(0)=1$ だから $x\ge0$ で $f(x)\ge1$ である。被積分関数を下から $\dfrac1{2-x}$ で押さえれば、残りは $\log$ の計算だけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f$ は $x\ge0$ で増加し $f(0)=1$ なので、$x\ge0$ では $f(x)\ge f(0)=1$ である。また $0\le x\le2-\dfrac1n$ では $2-x\ge\dfrac1n>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{f(x)}{2-x}\ge\frac1{2-x}>0`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\int_0^{2-\frac1n}\frac{f(x)}{2-x}\,dx\ge\int_0^{2-\frac1n}\frac{dx}{2-x}
=\Bigl[-\log(2-x)\Bigr]_0^{2-\frac1n}=-\log\frac1n+\log2=\log2n`,
            },
            {
              k: "p",
              t: String.raw`である。$n\to\infty$ で $\log2n\to\infty$ だから、はさみうち（下から発散）により`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\int_0^{2-\frac1n}\frac{f(x)}{2-x}\,dx=\infty`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$f(x)\ge1$ を言うのに「増加かつ $f(0)=1$」を使う。$f$ の具体形は与えられていない。`,
            String.raw`$\int\frac{dx}{2-x}=-\log\left|2-x\right|$ である。符号を落とさない。`,
            String.raw`上端は $2$ ではなく $2-\frac1n$。$2$ では被積分関数が発散して積分が定義されない。`,
          ],
          check: String.raw`$f=1+x$、$n=100$ で $I_n=13.90$。下からの評価 $\log200=5.30$ より確かに大きく、$n$ とともに増えた。`,
        },
        {
          label: "(2)",
          task: String.raw`$F_n(y)=\displaystyle\int_{2+\frac1n}^{y}\frac{f(x)}{x-2}\,dx$（$y>2$）について $\displaystyle\lim_{y\to\infty}F_n(y)=\infty$ を示し、$2+\dfrac1n$ より大きい実数 $a_n$ で $\displaystyle\int_0^{2-\frac1n}\frac{f(x)}{2-x}dx+\int_{2+\frac1n}^{a_n}\frac{f(x)}{2-x}dx=0$ をみたすものがただ1つ存在することを示す`,
          answer: String.raw`$F_n$ は $0$ から $\infty$ まで狭義増加なので、$F_n\left(a_n\right)=I_n>0$ をみたす $a_n$ がただ1つある`,
          approach: String.raw`前半は (1) と同じく $f\ge1$ で下から押さえる。後半は、$x>2$ では $\dfrac1{2-x}<0$ なので2つ目の積分が $-F_n(a)$ に等しいことに気づけば、$F_n(a)=I_n$ という1本の方程式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**前半。** $x\ge2+\dfrac1n$ では $f(x)\ge1$、$x-2>0$ なので`,
            },
            {
              k: "math",
              t: String.raw`F_n(y)\ge\int_{2+\frac1n}^{y}\frac{dx}{x-2}=\Bigl[\log(x-2)\Bigr]_{2+\frac1n}^{y}=\log\left(n(y-2)\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$y\to\infty$ で右辺は $\infty$ に発散するので $\displaystyle\lim_{y\to\infty}F_n(y)=\infty$ である。`,
            },
            {
              k: "p",
              t: String.raw`**後半。** $I_n=\displaystyle\int_0^{2-\frac1n}\frac{f(x)}{2-x}dx$ とおく。(1) より $I_n>0$ である。また $x>2$ では $2-x=-(x-2)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\int_{2+\frac1n}^{a}\frac{f(x)}{2-x}\,dx=-\int_{2+\frac1n}^{a}\frac{f(x)}{x-2}\,dx=-F_n(a)`,
            },
            { k: "p", t: String.raw`である。したがって求める条件は` },
            { k: "math", t: String.raw`I_n-F_n(a)=0,\qquad\text{すなわち}\quad F_n(a)=I_n` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`$F_n$ は $y>2+\dfrac1n$ で微分可能で`,
            },
            {
              k: "math",
              t: String.raw`F_n'(y)=\frac{f(y)}{y-2}\ge\frac1{y-2}>0`,
            },
            {
              k: "p",
              t: String.raw`なので**狭義増加**である。さらに $F_n\left(2+\dfrac1n\right)=0$、$\displaystyle\lim_{y\to\infty}F_n(y)=\infty$ である。`,
            },
            {
              k: "p",
              t: String.raw`$I_n>0$ なので、中間値の定理より $F_n(a)=I_n$ をみたす $a>2+\dfrac1n$ が存在し、狭義増加だからただ1つである。これを $a_n$ とすればよい。`,
            },
          ],
          pitfalls: [
            String.raw`2つ目の積分は $\dfrac{f}{2-x}$（分母が $2-x$）で、$x>2$ では負である。$F_n$ の定義（分母が $x-2$）と符号が逆になる。`,
            String.raw`$F_n\left(2+\frac1n\right)=0$（積分区間の幅が $0$）から出発して増加する。だから $I_n>0$ をちょうど1回横切る。`,
            String.raw`「ただ1つ」は狭義増加から出る。存在だけなら中間値の定理で足りる。`,
          ],
          check: String.raw`$f=e^{x}$、$n=5$ で $I_n=8.673$、$F_n(y)$ を二分法で解くと $a_n=2.469$ がただ1つ見つかった。`,
        },
        {
          label: "(3)",
          task: String.raw`(2) の $a_n$ について、不等式 $a_n<4$ がすべての $n$ に対して成り立つことを示す`,
          answer: String.raw`$x\mapsto4-x$ の置換で $F_n(4)=\displaystyle\int_0^{2-\frac1n}\frac{f(4-u)}{2-u}du>I_n$、$F_n$ は増加だから $a_n<4$`,
          approach: String.raw`$F_n(4)>I_n$ さえ言えれば、$F_n$ が増加だから $F_n\left(a_n\right)=I_n<F_n(4)$ より $a_n<4$ である。$F_n(4)$ を $x=4-u$ で置換すると $I_n$ と同じ形になり、$f$ の中身だけが違う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$F_n(4)$ を置換する。** $F_n(4)=\displaystyle\int_{2+\frac1n}^{4}\frac{f(x)}{x-2}dx$ で $x=4-u$ とおく。$dx=-du$、$x-2=2-u$ で、$x:2+\dfrac1n\to4$ のとき $u:2-\dfrac1n\to0$ だから`,
            },
            {
              k: "math",
              t: String.raw`F_n(4)=\int_{2-\frac1n}^{0}\frac{f(4-u)}{2-u}\left(-du\right)=\int_0^{2-\frac1n}\frac{f(4-u)}{2-u}\,du`,
            },
            { k: "p", t: String.raw`である。一方` },
            {
              k: "math",
              t: String.raw`I_n=\int_0^{2-\frac1n}\frac{f(u)}{2-u}\,du`,
            },
            { k: "p", t: String.raw`なので、2つは「分子が $f(4-u)$ か $f(u)$ か」だけが違う。` },
            {
              k: "p",
              t: String.raw`**大小を比べる。** $0\le u\le2-\dfrac1n$ では`,
            },
            {
              k: "math",
              t: String.raw`4-u\ge4-\left(2-\frac1n\right)=2+\frac1n>2-\frac1n\ge u`,
            },
            {
              k: "p",
              t: String.raw`なので $4-u>u\ge0$ である。$f$ は増加関数だから $f(4-u)>f(u)$ で、$2-u>0$ より`,
            },
            {
              k: "math",
              t: String.raw`\frac{f(4-u)}{2-u}>\frac{f(u)}{2-u}`,
            },
            { k: "p", t: String.raw`が区間全体で成り立つ。したがって` },
            { k: "math", t: String.raw`F_n(4)>I_n` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**結論。** (2) より $F_n\left(a_n\right)=I_n<F_n(4)$ で、$F_n$ は狭義増加だから`,
            },
            { k: "math", t: String.raw`a_n<4` },
            { k: "p", t: String.raw`である。これはすべての $n$ について成り立つ。` },
            {
              k: "note",
              t: String.raw`$x=4-u$ は「$x=2$ を中心とした折り返し」である。$2+\frac1n\le x\le4$ を $0\le u\le2-\frac1n$ に移すと、分母 $x-2$ がちょうど $2-u$ になり、$I_n$ とそろう。`,
            },
          ],
          pitfalls: [
            String.raw`$a_n<4$ を直接示すのではなく、「$F_n(4)>I_n$ かつ $F_n$ が増加」から言う。$a_n$ の値を求める必要はない。`,
            String.raw`置換 $x=4-u$ で区間の向きが逆になり、$-du$ と合わせて符号が戻る。`,
            String.raw`$f(4-u)>f(u)$ は $f$ が**狭義**増加だから言える。$4-u>u$ が区間全体で成り立つことを確かめる。`,
          ],
          check: String.raw`$f=1+x,\;e^{x},\;1+\sqrt x$ と $n=2,5,20,100$ の全12通りで $F_n(4)>I_n$ が成り立ち、二分法で求めた $a_n$ はすべて $4$ 未満（$2.37$〜$3.35$）だった。`,
        },
      ],
    },
  ],
};
