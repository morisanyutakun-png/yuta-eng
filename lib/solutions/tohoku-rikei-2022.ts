import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2022年度（令和4年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第2問の図。$a=0$ の例（$a<2$ なので極小値が2つ）。 */
const F2V = (x: number): number => (x * x + 3 * x) * (x + 1) ** 2;
const AL2V = (-11 - Math.sqrt(73)) / 8;
const AL2W = (-11 + Math.sqrt(73)) / 8;

/** 第4問の図。$m=1$ の例。$t=\sqrt2-1$、$a=1$、$b=\left(\sqrt{1+t^2}+t\right)^2$。 */
const T4V = Math.sqrt(2) - 1;
const A4V = 1;
const B4V = (Math.sqrt(1 + T4V * T4V) + T4V) ** 2;

/** 第6問の図。回転軸を含む断面。$r=1.3$（$1<r<\sqrt3$）の例。 */
const R6V = 1.3;
const H6V = Math.sqrt(R6V * R6V - 1);
const SEC6V: [number, number][] = [
  [0, 0],
  [1, 0],
  [1, H6V],
  ...Array.from({ length: 33 }, (_, i): [number, number] => {
    const th = Math.asin(H6V / R6V) + ((Math.PI / 2 - Math.asin(H6V / R6V)) * i) / 32;
    return [R6V * Math.cos(th), R6V * Math.sin(th)];
  }),
];

export const tohokuRikei2022: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "場合の数",
      topics: ["奇数の置き換え", "重複組合せ", "余事象", "2次不等式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$K=5,7,9,11,99$ で $(l,m,n)$ を全列挙すると $N=3,6,10,15,1225$ となり、$\\dfrac{K^{2}-1}{8}$ と一致した",
          "$K=99$ で「同じ奇数を2つ以上含む」組を数えると $73$ 通りだった",
          "$N>K$ となる最小の奇数 $K$ は $9$（$4+\\sqrt{17}=8.1231$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$K$ を $3$ より大きな奇数とし、$l+m+n=K$ を満たす正の奇数の組 $(l,m,n)$（順序を区別する）の個数を $N$ とするとき、$K=99$ での $N$ を求める`,
          answer: String.raw`$N=1225$`,
          approach: String.raw`正の奇数は $2a-1$（$a$ は正の整数）と書ける。3つとも置き換えると、条件は「正の整数 $a,b,c$ の和が一定」という重複組合せの標準形になる。`,
          blocks: [
            { k: "p", t: String.raw`$l=2a-1$、$m=2b-1$、$n=2c-1$（$a,b,c$ は正の整数）とおくと` },
            {
              k: "math",
              t: String.raw`l+m+n=2\left(a+b+c\right)-3=K,\qquad a+b+c=\frac{K+3}{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$K$ は奇数なので $\tfrac{K+3}{2}$ は整数）。$(l,m,n)$ と $(a,b,c)$ は1対1に対応するので、$N$ は「和が $\tfrac{K+3}{2}$ である正の整数の組 $(a,b,c)$ の個数」である。`,
            },
            { k: "p", t: String.raw`和が $M$ の正の整数3つの組の個数は、$M-1$ 個の仕切りの位置から2つ選ぶと考えて $ {}_{M-1}\mathrm{C}_{2}$ である。$K=99$ なら $M=51$ なので` },
            {
              k: "math",
              t: String.raw`N={}_{50}\mathrm{C}_{2}=\frac{50\cdot49}{2}=1225`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`一般には $M=\tfrac{K+3}{2}$ より $N={}_{\frac{K+1}{2}}\mathrm{C}_{2}=\dfrac{\frac{K+1}{2}\cdot\frac{K-1}{2}}{2}=\dfrac{K^{2}-1}{8}$ である。(3) で使う。`,
            },
          ],
          pitfalls: [
            String.raw`順序を区別するので、$(1,1,3)$ と $(1,3,1)$ を別に数える。重複組合せの公式がそのまま使える。`,
          ],
          check: String.raw`$K=99$ で $(l,m)$ を全探索すると $1225$ 通りだった。$K=5$ なら $\tfrac{25-1}{8}=3$ で、$(1,1,3),(1,3,1),(3,1,1)$ の3通りと合う。`,
        },
        {
          label: "(2)",
          task: String.raw`$K=99$ のとき、$l,m,n$ の中に同じ奇数を2つ以上含む組 $(l,m,n)$ の個数を求める`,
          answer: String.raw`$73$ 個`,
          approach: String.raw`「3つとも同じ」と「ちょうど2つが同じ」に分けて数える。(1) の置き換えで $a+b+c=51$ に直してから数えるほうが式が軽い。`,
          blocks: [
            { k: "p", t: String.raw`(1) の置き換えで $a+b+c=51$（$a,b,c$ は正の整数）として数える。$l,m,n$ が等しいことと $a,b,c$ が等しいことは同じである。` },
            { k: "p", t: String.raw`**3つとも同じ。** $3a=51$ より $a=b=c=17$ の1通り（$l=m=n=33$）。` },
            {
              k: "p",
              t: String.raw`**ちょうど2つが同じ。** 等しい2つの値を $a$、残りを $c$ とすると $2a+c=51$、$c\neq a$ である。$a\geqq1$、$c=51-2a\geqq1$ より $1\leqq a\leqq25$ の $25$ 通りあり、このうち $c=a$ となるのは $51-2a=a$、つまり $a=17$ の1通りだから、$a$ の選び方は $24$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`どの位置に「ちがう値」が来るかで3通りあるので、$3\times24=72$ 通りである。`,
            },
            { k: "p", t: String.raw`以上より、求める個数は` },
            { k: "math", t: String.raw`1+72=73\ \text{個}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`3つとも相異なるのは $1225-73=1152$ 個で、$1152=6\times192$ だから、順序を無視した相異なる3数の組は $192$ 通りである。`,
            },
          ],
          pitfalls: [
            String.raw`「2つ以上」なので、3つとも同じ場合も含む。「ちょうど2つ」で数えてから足す。`,
            String.raw`$2a+c=51$ で $c=a$ になる $a=17$ を除く。除かないと「3つとも同じ」を二重に数える。`,
          ],
          check: String.raw`$K=99$ の全列挙で $73$ 通りだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$N>K$ を満たす最小の $K$ を求める`,
          answer: String.raw`$K=9$`,
          approach: String.raw`(1) の注で得た $N=\dfrac{K^{2}-1}{8}$ を使う。$N>K$ は2次不等式になり、$K$ が $3$ より大きい奇数であることから候補が決まる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より一般に` },
            {
              k: "math",
              t: String.raw`N={}_{\frac{K+1}{2}}\mathrm{C}_{2}=\frac{1}{2}\cdot\frac{K+1}{2}\cdot\frac{K-1}{2}=\frac{K^{2}-1}{8}`,
            },
            { k: "p", t: String.raw`である。$N>K$ は` },
            {
              k: "math",
              t: String.raw`K^{2}-1>8K,\qquad K^{2}-8K-1>0`,
            },
            { k: "p", t: String.raw`と同値である。$K^{2}-8K-1=0$ の解は $K=4\pm\sqrt{17}$ で、$K>0$ だから条件は` },
            {
              k: "math",
              t: String.raw`K>4+\sqrt{17}=8.12\cdots`,
            },
            {
              k: "p",
              t: String.raw`である（$4<\sqrt{17}<4.2$ は $16<17<17.64$ から）。$K$ は $3$ より大きい奇数なので、これを満たす最小の $K$ は`,
            },
            { k: "math", t: String.raw`K=9` },
            { k: "p", t: String.raw`である。実際 $K=9$ では $N=\dfrac{80}{8}=10>9$、$K=7$ では $N=\dfrac{48}{8}=6<7$ である。` },
          ],
          pitfalls: [
            String.raw`$K$ は奇数なので $8.12\cdots$ の次は $9$。整数というだけなら $9$ だが、偶数が候補に入らないことも確認する。`,
          ],
          check: String.raw`$K=5,7$ では $N<K$、$K=9,11$ では $N>K$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["4次関数の最小値", "導関数の因数分解", "解と係数の関係", "単調減少の条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=2.2,\\ 2.25,\\ 2.3$ で $f$ の最小値を数値で調べると、負になるのは $a=2.2$ だけだった（境界は $a=\\tfrac94$）",
          "$a=-5,0,1,1.5,1.99$ で2つの極小点 $\\alpha_{1}<\\alpha_{2}$ を求めると、つねに $f(\\alpha_{1})<f(\\alpha_{2})$ だった",
          "$a$ を13通りとって「$x<\\beta$ で単調減少かつ $x=\\beta$ で最小」を数値で判定すると、$a\\leqq\\tfrac94$ または $a\\geqq\\tfrac{73}{32}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=\left(x^{2}+3x+a\right)\left(x+1\right)^{2}$ の最小値が負となるような $a$ の範囲を求める`,
          answer: String.raw`$a<\dfrac94$`,
          approach: String.raw`$\left(x+1\right)^{2}\geqq0$ なので、$f$ が負になるのは $x^{2}+3x+a<0$ かつ $x\neq-1$ となる $x$ があるとき。これは $x^{2}+3x+a=0$ が異なる2実数解をもつことと同値である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f$ は4次で $x^{4}$ の係数が正なので最小値をもつ。最小値が負であることは、$f(x)<0$ となる $x$ が存在することと同じである。`,
            },
            {
              k: "p",
              t: String.raw`$\left(x+1\right)^{2}\geqq0$ で、$x=-1$ では $f(-1)=0$ だから、$f(x)<0$ となるのは`,
            },
            {
              k: "math",
              t: String.raw`x\neq-1\ \text{かつ}\ x^{2}+3x+a<0`,
            },
            {
              k: "p",
              t: String.raw`となる $x$ があるときである。$x^{2}+3x+a<0$ の解が存在するのは判別式が正のとき、すなわち`,
            },
            {
              k: "math",
              t: String.raw`9-4a>0,\qquad a<\frac94`,
            },
            {
              k: "p",
              t: String.raw`のときである。このとき解の集合は長さが正の開区間だから、$x=-1$ 以外の点を必ず含む。逆に $a\geqq\tfrac94$ なら $x^{2}+3x+a\geqq0$ がつねに成り立ち $f\geqq0$ である。よって求める範囲は`,
            },
            { k: "math", t: String.raw`a<\frac94` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x=-1$ では $\left(x+1\right)^{2}=0$ で $f=0$ になる。「$x^{2}+3x+a<0$ となる $x$ がある」だけでなく、それが $-1$ 以外にとれることまで見る（開区間なので自動的に成り立つ）。`,
          ],
          check: String.raw`$a=2.2$ では最小値 $-0.0147<0$、$a=2.25$ では $0$、$a=2.3$ では $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a<2$ のとき $f$ は2つの極小値をもつ。極小となる $x$ を $\alpha_{1}<\alpha_{2}$ とするとき、$f(\alpha_{1})<f(\alpha_{2})$ を示す`,
          answer: String.raw`$P=\alpha_{1}+1,\ Q=\alpha_{2}+1$ とおくと $f(\alpha_{1})-f(\alpha_{2})=-\dfrac{\left(P-Q\right)\left(2PQ-\tfrac9{32}\right)}{2}<0$`,
          approach: String.raw`$f'$ は $x+1$ でくくれて「$\left(x+1\right)\times$ 2次式」になる。極小点は2次式の2解なので、そこでの $f$ の値を解と係数の関係だけで比べられる。$w=x+1$ と平行移動すると式がさらに軽くなる。`,
          blocks: [
            { k: "p", t: String.raw`**$f'$ の因数分解。** 積の微分から` },
            {
              k: "math",
              t: String.raw`f'(x)=\left(2x+3\right)\left(x+1\right)^{2}+\left(x^{2}+3x+a\right)\cdot2\left(x+1\right)=\left(x+1\right)\left(4x^{2}+11x+3+2a\right)`,
            },
            {
              k: "p",
              t: String.raw`である。2次式 $4x^{2}+11x+3+2a$ の判別式は $121-16\left(3+2a\right)=73-32a$ で、$a<2$ なら $73-32a>9>0$ だから異なる2実数解 $\alpha_{1}<\alpha_{2}$ をもつ。$x=-1$ を代入すると $4-11+3+2a=2a-4<0$ なので $-1$ は2解の間にあり`,
            },
            { k: "math", t: String.raw`\alpha_{1}<-1<\alpha_{2}` },
            {
              k: "p",
              t: String.raw`である。$f'=4\left(x+1\right)\left(x-\alpha_{1}\right)\left(x-\alpha_{2}\right)$ の符号は $-,+,-,+$ と変わるので、$\alpha_{1},\alpha_{2}$ が極小、$-1$ が極大を与える。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 0 のときの y = f(x)。x = α₁ と x = α₂ で極小、x = -1 で極大（値 0）。左側の極小値のほうが小さい。",
                view: [-3.6, 1.1, -3.4, 1.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: F2V, from: -3.12, to: 0.27 },
                  { k: "dot", at: [AL2V, F2V(AL2V)], label: "α₁", place: "below-right" },
                  { k: "dot", at: [-1, 0], label: "x = -1（極大）", place: "above-right" },
                  { k: "dot", at: [AL2W, F2V(AL2W)], label: "α₂", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**極小値の表し方。** $\alpha$ が $4x^{2}+11x+3+2a=0$ の解なら $2a=-4\alpha^{2}-11\alpha-3$ なので`,
            },
            {
              k: "math",
              t: String.raw`\alpha^{2}+3\alpha+a=\alpha^{2}+3\alpha+\frac{-4\alpha^{2}-11\alpha-3}{2}=-\frac{2\alpha^{2}+5\alpha+3}{2}=-\frac{\left(2\alpha+3\right)\left(\alpha+1\right)}{2}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`f(\alpha)=-\frac{\left(2\alpha+3\right)\left(\alpha+1\right)^{3}}{2}`,
            },
            { k: "p", t: String.raw`である。$w=\alpha+1$ とおくと $2\alpha+3=2w+1$ だから` },
            {
              k: "math",
              t: String.raw`f(\alpha)=-\frac{\left(2w+1\right)w^{3}}{2}=-\frac{2w^{4}+w^{3}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$P,Q$ の対称式。** $P=\alpha_{1}+1$、$Q=\alpha_{2}+1$ とおく。$x=w-1$ を $4x^{2}+11x+3+2a=0$ に入れると`,
            },
            {
              k: "math",
              t: String.raw`4w^{2}+3w+2a-4=0`,
            },
            { k: "p", t: String.raw`なので、解と係数の関係から` },
            {
              k: "math",
              t: String.raw`s=P+Q=-\frac34,\qquad t=PQ=\frac{2a-4}{4}=\frac{a-2}{2}`,
            },
            { k: "p", t: String.raw`である。$a<2$ より $t<0$ である。` },
            { k: "p", t: String.raw`**差をとる。**` },
            {
              k: "math",
              t: String.raw`f(\alpha_{1})-f(\alpha_{2})=-\frac{\left(2P^{4}+P^{3}\right)-\left(2Q^{4}+Q^{3}\right)}{2}`,
            },
            { k: "p", t: String.raw`で、因数分解すると` },
            {
              k: "math",
              t: String.raw`2\left(P^{4}-Q^{4}\right)+\left(P^{3}-Q^{3}\right)=\left(P-Q\right)\left\{2\left(P+Q\right)\left(P^{2}+Q^{2}\right)+P^{2}+PQ+Q^{2}\right\}`,
            },
            { k: "p", t: String.raw`である。$P^{2}+Q^{2}=s^{2}-2t$、$P^{2}+PQ+Q^{2}=s^{2}-t$ を入れると、$\left\{\ \right\}$ の中は` },
            {
              k: "math",
              t: String.raw`2s\left(s^{2}-2t\right)+s^{2}-t=2\left(-\frac34\right)\left(\frac{9}{16}-2t\right)+\frac{9}{16}-t=-\frac{27}{32}+3t+\frac{9}{16}-t=2t-\frac{9}{32}`,
            },
            { k: "p", t: String.raw`である。$t<0$ だから $2t-\dfrac{9}{32}<0$ であり、また $P<Q$ より $P-Q<0$ なので` },
            {
              k: "math",
              t: String.raw`\left(P-Q\right)\left(2t-\frac{9}{32}\right)>0`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`f(\alpha_{1})-f(\alpha_{2})=-\frac{\left(P-Q\right)\left(2t-\frac{9}{32}\right)}{2}<0`,
            },
            { k: "p", t: String.raw`となり、$f(\alpha_{1})<f(\alpha_{2})$ である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$\alpha_{1},\alpha_{2}$ を根号で書き下すと比較が重い。$f(\alpha)$ を $\left(2\alpha+3\right)\left(\alpha+1\right)^{3}$ の形に直してから対称式で処理する。`,
            String.raw`$w=x+1$ と平行移動すると $P+Q$ が定数 $-\tfrac34$ になり、$a$ は $PQ$ にだけ残る。符号の議論がこれで一本化できる。`,
          ],
          check: String.raw`$a=0$ では $\alpha_{1}=-2.4430$、$\alpha_{2}=-0.3070$ で $f(\alpha_{1})=-2.8334<f(\alpha_{2})=-0.3970$ だった。$a=-5,1,1.5,1.99$ でも同じ向きだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$f(x)$ が $x<\beta$ において単調減少し、かつ $x=\beta$ において最小値をとるとき、$a$ の範囲を求める`,
          answer: String.raw`$a\leqq\dfrac94$ または $a\geqq\dfrac{73}{32}$`,
          approach: String.raw`$f'=\left(x+1\right)\left(4x^{2}+11x+3+2a\right)$ の符号を $a$ で場合分けする。いちばん左の極小点が最小値を与えれば条件が成り立ち、そうでなければ途中に増加区間が入って成り立たない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$Q(x)=4x^{2}+11x+3+2a$ とおくと $f'(x)=\left(x+1\right)Q(x)$ である。判別式は $73-32a$、$Q(-1)=2a-4$、$Q$ の軸は $x=-\dfrac{11}{8}<-1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**(i) $a\geqq\dfrac{73}{32}$。** 判別式が $0$ 以下で $Q\geqq0$ だから、$f'$ の符号は $x+1$ の符号と同じである。$f$ は $x<-1$ で減少、$x>-1$ で増加し、$x=-1$ で最小になる。$\beta=-1$ として条件が成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`**(ii) $a<2$。** (2) より $\alpha_{1}<-1<\alpha_{2}$ で、$f$ は $x<\alpha_{1}$ で減少、$\left(\alpha_{1},-1\right)$ で増加、$\left(-1,\alpha_{2}\right)$ で減少、$x>\alpha_{2}$ で増加する。極小値は $f(\alpha_{1}),f(\alpha_{2})$ で、(2) より $f(\alpha_{1})<f(\alpha_{2})$ だから最小値は $f(\alpha_{1})$ である。$\beta=\alpha_{1}$ として条件が成り立つ。`,
            },
            {
              k: "p",
              t: String.raw`**(iii) $2\leqq a<\dfrac{73}{32}$。** 判別式は正なので $Q$ は異なる2実数解 $\alpha_{1}<\alpha_{2}$ をもつ。$Q(-1)=2a-4\geqq0$ で、軸が $-\dfrac{11}{8}<-1$ だから $-1$ は2解の右側、つまり`,
            },
            { k: "math", t: String.raw`\alpha_{1}\leqq\alpha_{2}\leqq-1` },
            {
              k: "p",
              t: String.raw`である（$a=2$ のときは $\alpha_{2}=-1$）。このとき $f'=4\left(x+1\right)\left(x-\alpha_{1}\right)\left(x-\alpha_{2}\right)$ の符号は $x<\alpha_{1}$ で負、$\left(\alpha_{1},\alpha_{2}\right)$ で正、$\left(\alpha_{2},-1\right)$ で負、$x>-1$ で正である。極小値は $f(\alpha_{1})$ と $f(-1)=0$ の2つで、極大が $f(\alpha_{2})$ である。`,
            },
            {
              k: "p",
              t: String.raw`$f$ が $x<\beta$ で単調減少して $x=\beta$ で最小になるには、$\beta=\alpha_{1}$ でなければならない（$\beta=-1$ だと、その手前の $\left(\alpha_{1},\alpha_{2}\right)$ で増加してしまう）。したがって条件は`,
            },
            {
              k: "math",
              t: String.raw`f(\alpha_{1})\leqq f(-1)=0`,
            },
            {
              k: "p",
              t: String.raw`すなわち「$f$ の最小値が $0$ 以下」である。(1) より最小値が負なのは $a<\tfrac94$、最小値が $0$ になるのは $a=\tfrac94$ のときで、$a>\tfrac94$ では $f$ は $x=-1$ 以外で正である。よってこの場合の条件は $2\leqq a\leqq\dfrac94$ である。`,
            },
            { k: "p", t: String.raw`**まとめ。** (i)(ii)(iii) を合わせると、求める範囲は` },
            {
              k: "math",
              t: String.raw`a\leqq\frac94\quad\text{または}\quad a\geqq\frac{73}{32}`,
            },
            {
              k: "p",
              t: String.raw`である（$\tfrac94=2.25$、$\tfrac{73}{32}=2.28125$）。間の $\dfrac94<a<\dfrac{73}{32}$ では、最小値 $0$ をとるのが $x=-1$ だけなのに、その手前に増加区間があるので条件を満たさない。`,
            },
            {
              k: "note",
              t: String.raw`$a=\tfrac94$ では $f(x)=\left(x+\tfrac32\right)^{2}\left(x+1\right)^{2}$ で、最小値 $0$ を $x=-\tfrac32$ と $x=-1$ の2か所でとる。$\beta=-\tfrac32$ にとれば条件を満たす。`,
            },
          ],
          pitfalls: [
            String.raw`$a$ の場合分けの境目は $2$（$-1$ が $Q$ の解になる）と $\tfrac{73}{32}$（判別式 $0$）の2つ。$\tfrac94$ は最小値の符号の境目で、別の由来である。`,
            String.raw`$\dfrac94<a<\dfrac{73}{32}$ というごく狭い区間だけが除かれる。数値で確かめておくと安心できる。`,
          ],
          check: String.raw`$a$ を $-10$ から $3$ まで13通りとって数値で判定すると、条件を満たさなかったのは $a=2.26,\ 2.28$ だけで、$\tfrac94<a<\tfrac{73}{32}$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "極限",
      topics: ["有理化", "不等式の評価", "はさみうち", "区分求積の変形"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ を $0.001$ から $200$ まで $0.001$ 刻みでとって $\\dfrac{x}{2+x}\\leqq\\sqrt{1+x}-1\\leqq\\dfrac x2$ を確かめた（反例 0 件）",
          "$S_{n}$ を直接計算すると $n=10,10^{2},10^{3},10^{5}$ で $0.2704,\\ 0.2521,\\ 0.2502,\\ 0.250002$ となり $\\tfrac14$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の実数 $x$ に対して $\dfrac{x}{2+x}\leqq\sqrt{1+x}-1\leqq\dfrac{x}{2}$ を示す`,
          answer: String.raw`右は2乗して比較、左は $\sqrt{1+x}-1=\dfrac{x}{\sqrt{1+x}+1}$ と有理化して分母を比べる`,
          approach: String.raw`$\sqrt{\ }$ を含む不等式は「2乗する」か「有理化する」。右側は2乗、左側は有理化してから分母の大小を見るのがいちばん短い。`,
          blocks: [
            { k: "p", t: String.raw`**右側。** $x>0$ より $1+\dfrac x2>0$ なので、2乗して比べればよい。` },
            {
              k: "math",
              t: String.raw`\left(1+\frac{x}{2}\right)^{2}-\left(\sqrt{1+x}\right)^{2}=1+x+\frac{x^{2}}{4}-\left(1+x\right)=\frac{x^{2}}{4}\geqq0`,
            },
            { k: "p", t: String.raw`なので $\sqrt{1+x}\leqq1+\dfrac x2$、つまり $\sqrt{1+x}-1\leqq\dfrac x2$ である。` },
            { k: "p", t: String.raw`**左側。** 有理化すると` },
            {
              k: "math",
              t: String.raw`\sqrt{1+x}-1=\frac{\left(1+x\right)-1}{\sqrt{1+x}+1}=\frac{x}{\sqrt{1+x}+1}`,
            },
            { k: "p", t: String.raw`である。$x>0$ では $1+x>1$ より $\sqrt{1+x}\leqq1+x$（$u\geqq1$ で $\sqrt u\leqq u$）なので` },
            {
              k: "math",
              t: String.raw`\sqrt{1+x}+1\leqq2+x`,
            },
            { k: "p", t: String.raw`である。分母が大きいほど分数は小さいから` },
            {
              k: "math",
              t: String.raw`\frac{x}{\sqrt{1+x}+1}\geqq\frac{x}{2+x}`,
            },
            { k: "p", t: String.raw`である。以上で両側が示された。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`左側を2乗で示そうとすると分母を払う操作が増える。有理化して「分母の比較」に持ち込むほうが短い。`,
            String.raw`$\sqrt{u}\leqq u$ が成り立つのは $u\geqq1$ のとき。$x>0$ から $1+x>1$ を言っておく。`,
          ],
          check: String.raw`$x$ を $0.001$ 刻みで $200$ まで動かして確かめ、反例は $0$ 件だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$S_{n}=\displaystyle\sum_{k=1}^{n}\left(\sqrt{1+\frac{k}{n^{2}}}-1\right)$ の極限 $\displaystyle\lim_{n\to\infty}S_{n}$ を求める`,
          answer: String.raw`$\dfrac14$`,
          approach: String.raw`(1) を $x=\dfrac{k}{n^{2}}$ で使って $S_{n}$ を上下からはさむ。上側はそのまま $\sum k$ で、下側は分母を $k$ の最大値で置き換えればさらに簡単になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) に $x=\dfrac{k}{n^{2}}\ (>0)$ を代入して $k=1,\dots,n$ で足すと` },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{n}\frac{\frac{k}{n^{2}}}{2+\frac{k}{n^{2}}}\leqq S_{n}\leqq\sum_{k=1}^{n}\frac{k}{2n^{2}}`,
            },
            { k: "p", t: String.raw`である。**右側**は` },
            {
              k: "math",
              t: String.raw`\frac{1}{2n^{2}}\cdot\frac{n\left(n+1\right)}{2}=\frac{n+1}{4n}`,
            },
            { k: "p", t: String.raw`である。**左側**は、分母・分子に $n^{2}$ を掛けて` },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{n}\frac{k}{2n^{2}+k}\geqq\sum_{k=1}^{n}\frac{k}{2n^{2}+n}=\frac{1}{2n^{2}+n}\cdot\frac{n\left(n+1\right)}{2}=\frac{n+1}{2\left(2n+1\right)}`,
            },
            { k: "p", t: String.raw`である（$k\leqq n$ より分母を $2n^{2}+n$ に置き換えると小さくなる）。したがって` },
            {
              k: "math",
              t: String.raw`\frac{n+1}{2\left(2n+1\right)}\leqq S_{n}\leqq\frac{n+1}{4n}`,
            },
            { k: "p", t: String.raw`である。$n\to\infty$ で両端とも` },
            {
              k: "math",
              t: String.raw`\frac{n+1}{2\left(2n+1\right)}\to\frac14,\qquad\frac{n+1}{4n}\to\frac14`,
            },
            { k: "p", t: String.raw`となるので、はさみうちの原理より` },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}S_{n}=\frac14`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\sqrt{1+u}\approx1+\tfrac u2$ なので $S_{n}\approx\sum\dfrac{k}{2n^{2}}\to\dfrac14$ という見通しが立つ。(1) の不等式は、この近似の誤差を上下から押さえるために用意されている。`,
            },
          ],
          pitfalls: [
            String.raw`区分求積の形（$\tfrac1n\sum g(\tfrac kn)$）にはならない。$\tfrac{k}{n^{2}}$ は $n\to\infty$ で $0$ に近づくので、はさみうちで処理する。`,
            String.raw`左側は分母を $k$ によらない形に置き換えてから和をとる。そのまま $\sum\dfrac{k}{2n^{2}+k}$ を計算しようとしない。`,
          ],
          check: String.raw`$n=10^{5}$ で $S_{n}=0.250002083$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形と方程式",
      topics: ["角の二等分線", "2倍角の公式", "2円の外接", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$m=0.3,1,2,5$ で $t=\\dfrac{\\sqrt{1+m^{2}}-1}{m}$ が $\\tan\\dfrac{\\theta}{2}$（$\\tan\\theta=m$）と小数9桁まで一致した",
          "同じ $m$ で中心間距離を計算すると、つねに $a+b$ に等しく（外接）、$\\dfrac ba=\\left(\\sqrt{1+t^{2}}+t\\right)^{2}$ と一致した",
          "$m=0.1,0.01,0.001,0.0001$ で $\\dfrac1m\\left(\\dfrac ba-1\\right)=1.0485,\\ 1.00499,\\ 1.0005,\\ 1.00005$ と $1$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`第1象限内で直線 $\ell\colon y=mx$（$m>0$）と $x$ 軸の両方に接する半径 $a$ の円を $C$ とし、$C$ の中心を通る直線 $y=tx$（$t>0$）を考えるとき、$t$ を $m$ で表す`,
          answer: String.raw`$t=\dfrac{\sqrt{1+m^{2}}-1}{m}$`,
          approach: String.raw`2直線に接する円の中心は、その2直線のなす角の二等分線上にある。$\ell$ が $x$ 軸となす角を $\theta$ とすると $t=\tan\dfrac\theta2$ で、2倍角の公式から $t$ の2次方程式が立つ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ は $x$ 軸と $\ell$ の両方に接し、第1象限内にあるので、その中心は2直線のなす角の二等分線上にある。$\ell$ が $x$ 軸の正の向きとなす角を $\theta$（$0<\theta<\dfrac\pi2$、$\tan\theta=m$）とすると、二等分線は $y=\left(\tan\dfrac\theta2\right)x$ である。よって`,
            },
            { k: "math", t: String.raw`t=\tan\frac{\theta}{2}` },
            { k: "p", t: String.raw`である。2倍角の公式 $\tan\theta=\dfrac{2t}{1-t^{2}}$ から` },
            {
              k: "math",
              t: String.raw`m=\frac{2t}{1-t^{2}},\qquad mt^{2}+2t-m=0`,
            },
            { k: "p", t: String.raw`である（$0<\theta<\tfrac\pi2$ より $0<\tfrac\theta2<\tfrac\pi4$ で $0<t<1$ だから $1-t^{2}\neq0$）。$m>0$ だから解の公式で` },
            {
              k: "math",
              t: String.raw`t=\frac{-2\pm\sqrt{4+4m^{2}}}{2m}=\frac{-1\pm\sqrt{1+m^{2}}}{m}`,
            },
            { k: "p", t: String.raw`で、$t>0$ より` },
            {
              k: "math",
              t: String.raw`t=\frac{\sqrt{1+m^{2}}-1}{m}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$x$ 軸と $\ell$ の両方に接する」から中心は角の二等分線上。半径 $a$ の値は $t$ には関係しない。`,
          ],
          check: String.raw`$m=2$ では $t=0.618033989$ で、$\tan\left(\tfrac12\arctan2\right)=0.618033989$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\ell$ と $x$ 軸、および円 $C$ のすべてにそれぞれ1点で接する円の半径を $b$（$b>a$）とするとき、$\dfrac ba$ を $t$ で表す`,
          answer: String.raw`$\dfrac{b}{a}=\left(\sqrt{1+t^{2}}+t\right)^{2}=1+2t^{2}+2t\sqrt{1+t^{2}}$`,
          approach: String.raw`半径 $b$ の円も2直線に接するので、中心は同じ二等分線 $y=tx$ 上にある。$x$ 軸に接するから中心の $y$ 座標が半径に等しく、原点からの距離が半径に比例する。2円が外接する条件を書けば $\dfrac ba$ の方程式になる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "m = 1 のときの様子。半径 a の円 C と半径 b の円は、どちらも x 軸と直線 ℓ に接するので、中心は同じ二等分線 y = tx 上にある。2円は外接する。",
                view: [-0.6, 8.5, -0.8, 4.8],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: (x: number) => x, from: 0, to: 4.8 },
                  { k: "curve", f: (x: number) => T4V * x, from: 0, to: 8.5, dash: true },
                  {
                    k: "param",
                    f: (u: number) => [A4V / T4V + A4V * Math.cos(u), A4V + A4V * Math.sin(u)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (u: number) => [B4V / T4V + B4V * Math.cos(u), B4V + B4V * Math.sin(u)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [A4V / T4V, A4V] },
                  { k: "dot", at: [B4V / T4V, B4V] },
                  { k: "text", at: [A4V / T4V, 2 * A4V], label: "C", place: "above" },
                  { k: "text", at: [B4V / T4V, 2 * B4V], label: "半径 b の円", place: "above" },
                  { k: "text", at: [4.7, 4.7], label: "ℓ: y = mx", place: "right" },
                  { k: "text", at: [8.4, T4V * 8.4], label: "y = tx", place: "above-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`半径 $b$ の円も $x$ 軸と $\ell$ に接するので、中心は二等分線 $y=tx$ 上にある。$x$ 軸に接することから中心の $y$ 座標は半径に等しいので、中心は`,
            },
            {
              k: "math",
              t: String.raw`\left(\frac at,\ a\right),\qquad\left(\frac bt,\ b\right)`,
            },
            { k: "p", t: String.raw`である。原点からの距離はそれぞれ` },
            {
              k: "math",
              t: String.raw`\frac{a}{t}\sqrt{1+t^{2}},\qquad\frac{b}{t}\sqrt{1+t^{2}}`,
            },
            {
              k: "p",
              t: String.raw`で、$b>a$ だから中心間の距離は $\dfrac{\left(b-a\right)\sqrt{1+t^{2}}}{t}$ である。2円は外接するので、これが $a+b$ に等しい。`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(b-a\right)\sqrt{1+t^{2}}}{t}=a+b`,
            },
            { k: "p", t: String.raw`$k=\dfrac{\sqrt{1+t^{2}}}{t}$ とおくと $\left(b-a\right)k=a+b$、すなわち $b\left(k-1\right)=a\left(k+1\right)$ だから` },
            {
              k: "math",
              t: String.raw`\frac{b}{a}=\frac{k+1}{k-1}=\frac{\sqrt{1+t^{2}}+t}{\sqrt{1+t^{2}}-t}`,
            },
            { k: "p", t: String.raw`である（$0<t<1$ より $\sqrt{1+t^{2}}>t$ で分母は正）。分母を有理化すると、$\left(1+t^{2}\right)-t^{2}=1$ だから` },
            {
              k: "math",
              t: String.raw`\frac{b}{a}=\left(\sqrt{1+t^{2}}+t\right)^{2}=1+2t^{2}+2t\sqrt{1+t^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$t=1$（$\ell$ が $y$ 軸、つまり直角のとき）なら $\dfrac ba=\left(\sqrt2+1\right)^{2}=3+2\sqrt2$ で、座標軸に接する2円の有名な比になる。`,
            },
          ],
          pitfalls: [
            String.raw`2円は外接する（内接ではない）。$b>a$ で、小さいほうが角の奥にあるからである。`,
            String.raw`$\left(\sqrt{1+t^{2}}+t\right)\left(\sqrt{1+t^{2}}-t\right)=1$ を使うと、有理化が一気に進む。`,
          ],
          check: String.raw`$m=1$（$t=\sqrt2-1$）で中心間距離を計算すると $3.2398=a+b$ で外接しており、$\dfrac ba=2.2398=\left(\sqrt{1+t^{2}}+t\right)^{2}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`極限 $\displaystyle\lim_{m\to+0}\frac1m\left(\frac ba-1\right)$ を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`(2) より $\dfrac ba-1=2t^{2}+2t\sqrt{1+t^{2}}$ である。(1) の $t$ を有理化すると $\dfrac tm\to\dfrac12$ が見えるので、各項の極限がそのまま計算できる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の $t$ を有理化すると` },
            {
              k: "math",
              t: String.raw`t=\frac{\sqrt{1+m^{2}}-1}{m}=\frac{m}{\sqrt{1+m^{2}}+1}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\frac{t}{m}=\frac{1}{\sqrt{1+m^{2}}+1}\longrightarrow\frac12\qquad\left(m\to+0\right)`,
            },
            { k: "p", t: String.raw`であり、とくに $t\to+0$ である。(2) より` },
            {
              k: "math",
              t: String.raw`\frac1m\left(\frac ba-1\right)=\frac{2t^{2}+2t\sqrt{1+t^{2}}}{m}=2t\cdot\frac{t}{m}+2\cdot\frac{t}{m}\cdot\sqrt{1+t^{2}}`,
            },
            { k: "p", t: String.raw`である。$t\to0$、$\dfrac tm\to\dfrac12$、$\sqrt{1+t^{2}}\to1$ だから` },
            {
              k: "math",
              t: String.raw`\lim_{m\to+0}\frac1m\left(\frac ba-1\right)=2\cdot0\cdot\frac12+2\cdot\frac12\cdot1=1`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`角が狭くなると2円の大きさの比は $1$ に近づくが、その近づき方が $\dfrac ba\approx1+m$ であることを意味している。`,
            },
          ],
          pitfalls: [
            String.raw`$t$ をそのまま $\dfrac{\sqrt{1+m^{2}}-1}{m}$ で $m\to0$ とすると $\tfrac00$ の形。有理化して $\dfrac{m}{\sqrt{1+m^{2}}+1}$ にしてから割る。`,
          ],
          check: String.raw`$m=10^{-4}$ で $\dfrac1m\left(\dfrac ba-1\right)=1.000049995$ だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間ベクトル",
      topics: ["垂線の足", "漸化式", "極限", "共通垂線"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$s_{1}=0$ から漸化式を回すと $s_{2}=\\tfrac5{18}$ などとなり、$s_{n+1}=\\dfrac{4s_{n}+5}{18}$ と一致した",
          "$s_{n}\\to0.357142857143=\\tfrac5{14}$、$t_{n}\\to0.571428571429=\\tfrac47$",
          "$\\overrightarrow{\\mathrm{AB}}=\\tfrac1{14}(3,-2,1)$ で、$\\vec a$ とも $\\vec b$ とも内積が $10^{-16}$ 以下だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\vec a=(1,2,1)$、$\vec b=(1,1,-1)$、$\vec c=(0,0,1)$ が定める2直線 $\ell\colon s\vec a$、$\ell'\colon t\vec b+\vec c$ について、$\mathrm{A}_{1}$ を原点とし、$\mathrm{A}_{k}\left(s_{k}\vec a\right)$ から $\ell'$ への垂線の足を $\mathrm{B}_{k}\left(t_{k}\vec b+\vec c\right)$、$\mathrm{B}_{k}$ から $\ell$ への垂線の足を $\mathrm{A}_{k+1}$ とするとき、$s_{n+1}$ を $s_{n}$ で表す`,
          answer: String.raw`$s_{n+1}=\dfrac{4s_{n}+5}{18}$`,
          approach: String.raw`「垂線の足」は、引いたベクトルが直線の方向ベクトルと直交する、という式1本で決まる。2回分を順に書いて $t_{n}$ を消す。`,
          blocks: [
            { k: "p", t: String.raw`内積を先に計算しておく。` },
            {
              k: "math",
              t: String.raw`\left|\vec a\right|^{2}=6,\quad\left|\vec b\right|^{2}=3,\quad\vec a\cdot\vec b=2,\quad\vec a\cdot\vec c=1,\quad\vec b\cdot\vec c=-1`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{A}_{n}\to\mathrm{B}_{n}$。** $\overrightarrow{\mathrm{A}_{n}\mathrm{B}_{n}}=t_{n}\vec b+\vec c-s_{n}\vec a$ が $\ell'$ の方向 $\vec b$ と直交するので`,
            },
            {
              k: "math",
              t: String.raw`t_{n}\left|\vec b\right|^{2}+\vec b\cdot\vec c-s_{n}\vec a\cdot\vec b=0,\qquad3t_{n}-1-2s_{n}=0`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`t_{n}=\frac{1+2s_{n}}{3}\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\mathrm{B}_{n}\to\mathrm{A}_{n+1}$。** $\overrightarrow{\mathrm{B}_{n}\mathrm{A}_{n+1}}=s_{n+1}\vec a-t_{n}\vec b-\vec c$ が $\vec a$ と直交するので`,
            },
            {
              k: "math",
              t: String.raw`s_{n+1}\left|\vec a\right|^{2}-t_{n}\vec a\cdot\vec b-\vec a\cdot\vec c=0,\qquad6s_{n+1}-2t_{n}-1=0`,
            },
            { k: "p", t: String.raw`すなわち $s_{n+1}=\dfrac{2t_{n}+1}{6}$ である。① を代入して` },
            {
              k: "math",
              t: String.raw`s_{n+1}=\frac{1}{6}\left(\frac{2\left(1+2s_{n}\right)}{3}+1\right)=\frac{2+4s_{n}+3}{18}=\frac{4s_{n}+5}{18}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{A}_{1}$ は原点なので $s_{1}=0$、よって $t_{1}=\tfrac13$、$s_{2}=\tfrac5{18}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`垂線の足の条件は「結んだベクトル $\perp$ 直線の方向」。点が直線上にあることは媒介変数で自動的に満たされている。`,
          ],
          check: String.raw`数値で $s_{1}=0,\ s_{2}=0.2778,\ s_{3}=0.3395,\dots$ となり、漸化式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`極限 $S=\displaystyle\lim_{n\to\infty}s_{n}$、$T=\displaystyle\lim_{n\to\infty}t_{n}$ を求める`,
          answer: String.raw`$S=\dfrac{5}{14}$、$T=\dfrac47$`,
          approach: String.raw`$s_{n+1}=\dfrac29s_{n}+\dfrac5{18}$ は公比 $\dfrac29$ の等比型なので収束し、極限は不動点である。$T$ は ① に入れるだけ。`,
          blocks: [
            { k: "p", t: String.raw`(1) の漸化式は` },
            {
              k: "math",
              t: String.raw`s_{n+1}=\frac29s_{n}+\frac5{18}`,
            },
            { k: "p", t: String.raw`と書ける。不動点 $\sigma$ は $\sigma=\dfrac29\sigma+\dfrac5{18}$ より` },
            {
              k: "math",
              t: String.raw`\frac79\sigma=\frac5{18},\qquad\sigma=\frac5{18}\cdot\frac97=\frac{5}{14}`,
            },
            { k: "p", t: String.raw`である。$s_{n+1}-\sigma=\dfrac29\left(s_{n}-\sigma\right)$ だから` },
            {
              k: "math",
              t: String.raw`s_{n}-\frac{5}{14}=\left(\frac29\right)^{n-1}\left(s_{1}-\frac5{14}\right)`,
            },
            { k: "p", t: String.raw`で、$\left|\dfrac29\right|<1$ より $s_{n}\to\dfrac5{14}$ である。すなわち` },
            { k: "math", t: String.raw`S=\frac{5}{14}` },
            { k: "p", t: String.raw`である。① より $t_{n}=\dfrac{1+2s_{n}}{3}$ だから` },
            {
              k: "math",
              t: String.raw`T=\frac{1+2\cdot\frac5{14}}{3}=\frac{1+\frac57}{3}=\frac{\frac{12}{7}}{3}=\frac47`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`数値で $s_{30}=0.357142857143$、$t_{30}=0.571428571429$ となり、$\tfrac5{14}$、$\tfrac47$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{A}\left(S\vec a\right)$、$\mathrm{B}\left(T\vec b+\vec c\right)$ とおくとき、直線 $\mathrm{AB}$ が2直線 $\ell,\ell'$ の両方と直交することを示す`,
          answer: String.raw`$\overrightarrow{\mathrm{AB}}=\dfrac1{14}\left(3,-2,1\right)$ で、$\vec a$ とも $\vec b$ とも内積が $0$`,
          approach: String.raw`$\overrightarrow{\mathrm{AB}}\cdot\vec a=0$ と $\overrightarrow{\mathrm{AB}}\cdot\vec b=0$ を直接確かめる。(1) で作った2本の式に $S,T$ を入れるだけで出る。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{AB}}=T\vec b+\vec c-S\vec a$ である。まず $\vec a$ との内積は` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\cdot\vec a=T\,\vec a\cdot\vec b+\vec a\cdot\vec c-S\left|\vec a\right|^{2}=2T+1-6S`,
            },
            { k: "p", t: String.raw`で、$S=\dfrac5{14}$、$T=\dfrac47$ を入れると` },
            {
              k: "math",
              t: String.raw`2\cdot\frac47+1-6\cdot\frac5{14}=\frac87+1-\frac{15}{7}=-1+1=0`,
            },
            { k: "p", t: String.raw`である。次に $\vec b$ との内積は` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\cdot\vec b=T\left|\vec b\right|^{2}+\vec b\cdot\vec c-S\,\vec a\cdot\vec b=3T-1-2S=\frac{12}{7}-1-\frac57=1-1=0`,
            },
            { k: "p", t: String.raw`である。また` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}=\frac47\left(1,1,-1\right)+\left(0,0,1\right)-\frac5{14}\left(1,2,1\right)=\frac1{14}\left(3,-2,1\right)\neq\vec0`,
            },
            {
              k: "p",
              t: String.raw`なので直線 $\mathrm{AB}$ が定まり、その方向ベクトルが $\ell$ の方向 $\vec a$ とも $\ell'$ の方向 $\vec b$ とも直交する。よって直線 $\mathrm{AB}$ は2直線 $\ell,\ell'$ の両方と直交する。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$\overrightarrow{\mathrm{AB}}\cdot\vec a=2T+1-6S$、$\overrightarrow{\mathrm{AB}}\cdot\vec b=3T-1-2S$ は、(1) で作った2本の式で $s_{n},s_{n+1},t_{n}$ をすべて極限に置き換えたものである。極限では「垂線の足をとる操作」が止まるので、両方の直交条件が同時に成り立つ。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{AB}}\neq\vec0$ を確かめてから「直線 $\mathrm{AB}$」と言う。`,
            String.raw`$(3,-2,1)$ は $\vec a$ と $\vec b$ の両方に直交するベクトル（外積の定数倍）。検算に使える。`,
          ],
          check: String.raw`数値で $\overrightarrow{\mathrm{AB}}=\left(0.2143,-0.1429,0.0714\right)=\tfrac1{14}(3,-2,1)$ で、$\vec a,\vec b$ との内積はいずれも $10^{-16}$ 以下だった。`,
        },
      ],
    },
    {
      no: 6,
      field: "積分法",
      topics: ["立体の共通部分", "断面積の積分", "場合分け", "球冠の体積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$r=0.5,1,1.3,\\sqrt3,1.8,2,2.5$ で断面積 $\\pi\\min\\left(1,r^{2}-z^{2}\\right)$ をシンプソン法で積分し、場合分けした式と小数9桁まで一致した",
          "$r\\geqq2$ では円柱の体積 $\\sqrt3\\pi=5.441398093$ になった",
          "$r=1$ と $r=\\sqrt3$ と $r=2$ の境目で、両側の式の値が一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`半径 $1$ の円を底面とする高さ $\sqrt3$ の直円柱と、半径 $r$ の球を考える。直円柱の底面の円の中心と球の中心が一致するとき、直円柱の内部と球の内部の共通部分の体積 $V(r)$ を求める`,
          answer: String.raw`$0<r\leqq1$ で $\dfrac23\pi r^{3}$、$1\leqq r\leqq\sqrt3$ で $\dfrac{2\pi}{3}\left\{r^{3}-\left(r^{2}-1\right)^{\frac32}\right\}$、$\sqrt3\leqq r\leqq2$ で $\sqrt3\pi\left(r^{2}-1\right)-\dfrac{2\pi}{3}\left(r^{2}-1\right)^{\frac32}$、$r\geqq2$ で $\sqrt3\pi$`,
          approach: String.raw`底面に平行な平面で切る。高さ $z$ での切り口は、球からは半径 $\sqrt{r^{2}-z^{2}}$ の円板、円柱からは半径 $1$ の円板で、共通部分は小さいほうの円板になる。どちらが小さいかの切り替わり位置と、積分の上端（$\sqrt3$ か $r$ か）で場合分けする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`底面の円の中心を原点、円柱の軸を $z$ 軸にとる。円柱は $x^{2}+y^{2}\leqq1$、$0\leqq z\leqq\sqrt3$、球は $x^{2}+y^{2}+z^{2}\leqq r^{2}$ である。`,
            },
            {
              k: "p",
              t: String.raw`高さ $z\ (\geqq0)$ での切り口は、円柱が半径 $1$ の円板、球が半径 $\sqrt{r^{2}-z^{2}}$ の円板（$z\leqq r$ のとき）なので、共通部分の面積は`,
            },
            {
              k: "math",
              t: String.raw`\pi\min\left(1,\ r^{2}-z^{2}\right)\qquad\left(0\leqq z\leqq\min\left(\sqrt3,\ r\right)\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$r^{2}-z^{2}\leqq1$ となるのは $z\geqq\sqrt{r^{2}-1}$（$r>1$ のとき）である。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "回転軸を含む平面での断面（軸からの距離を横軸、高さを縦軸にとった右半分）。網かけが共通部分。図は 1 < r < √3 のときで、高さ √(r²-1) より下では円柱の側面が、上では球面が境界になる。",
                view: [-0.55, 2.2, -0.3, 2.1],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: SEC6V },
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [1, 0], b: [1, Math.sqrt(3)] },
                  { k: "seg", a: [1, Math.sqrt(3)], b: [0, Math.sqrt(3)] },
                  { k: "seg", a: [0, 0], b: [0, Math.sqrt(3)] },
                  { k: "param", f: (u: number) => [R6V * Math.cos(u), R6V * Math.sin(u)], from: 0, to: Math.PI / 2 },
                  { k: "seg", a: [0, H6V], b: [1, H6V], dash: true },
                  { k: "dot", at: [1, 0], label: "1", place: "below" },
                  { k: "dot", at: [0, Math.sqrt(3)], label: "√3", place: "left" },
                  { k: "dot", at: [0, H6V], label: "√(r²-1)", place: "left" },
                  { k: "dot", at: [0, R6V], label: "r", place: "above-left" },
                ],
              },
            },
            { k: "p", t: String.raw`**(i) $0<r\leqq1$。** つねに $r^{2}-z^{2}\leqq1$ で、積分の上端は $r$（$r\leqq1<\sqrt3$）である。` },
            {
              k: "math",
              t: String.raw`V(r)=\int_{0}^{r}\pi\left(r^{2}-z^{2}\right)dz=\pi\left[r^{2}z-\frac{z^{3}}{3}\right]_{0}^{r}=\frac23\pi r^{3}`,
            },
            { k: "p", t: String.raw`（球が丸ごと円柱に入っているので、半球の体積である。）` },
            {
              k: "p",
              t: String.raw`**(ii) $1\leqq r\leqq\sqrt3$。** $u=\sqrt{r^{2}-1}$ とおくと $0\leqq u\leqq\sqrt2<\sqrt3$ で、積分の上端は $r$ である。`,
            },
            {
              k: "math",
              t: String.raw`V(r)=\int_{0}^{u}\pi\,dz+\int_{u}^{r}\pi\left(r^{2}-z^{2}\right)dz=\pi u+\pi\left\{\frac23r^{3}-\left(r^{2}u-\frac{u^{3}}{3}\right)\right\}`,
            },
            { k: "p", t: String.raw`である。$r^{2}=u^{2}+1$ だから $u-r^{2}u=u\left(1-r^{2}\right)=-u^{3}$ で` },
            {
              k: "math",
              t: String.raw`V(r)=\pi\left(\frac23r^{3}-u^{3}+\frac{u^{3}}{3}\right)=\frac{2\pi}{3}\left\{r^{3}-\left(r^{2}-1\right)^{\frac32}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**(iii) $\sqrt3\leqq r\leqq2$。** $u=\sqrt{r^{2}-1}$ は $\sqrt2\leqq u\leqq\sqrt3$ なので、$u\leqq\sqrt3$ で、積分の上端は $\sqrt3$ である。`,
            },
            {
              k: "math",
              t: String.raw`V(r)=\pi u+\int_{u}^{\sqrt3}\pi\left(r^{2}-z^{2}\right)dz=\pi\left\{u+\sqrt3r^{2}-\sqrt3-r^{2}u+\frac{u^{3}}{3}\right\}`,
            },
            { k: "p", t: String.raw`で、$r^{2}-1=u^{2}$、$u-r^{2}u=-u^{3}$ を使うと` },
            {
              k: "math",
              t: String.raw`V(r)=\pi\left(\sqrt3u^{2}-u^{3}+\frac{u^{3}}{3}\right)=\sqrt3\pi\left(r^{2}-1\right)-\frac{2\pi}{3}\left(r^{2}-1\right)^{\frac32}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**(iv) $r\geqq2$。** $\sqrt{r^{2}-1}\geqq\sqrt3$ なので $0\leqq z\leqq\sqrt3$ のすべてで $r^{2}-z^{2}\geqq1$ となり、切り口はつねに円柱の円板である。`,
            },
            {
              k: "math",
              t: String.raw`V(r)=\pi\cdot1^{2}\cdot\sqrt3=\sqrt3\pi`,
            },
            { k: "p", t: String.raw`（円柱がまるごと球に含まれる。）` },
            {
              k: "note",
              t: String.raw`境目では値がつながる。$r=1$ では (i)(ii) とも $\dfrac{2\pi}{3}$、$r=\sqrt3$ では (ii)(iii) とも $2\sqrt3\pi-\dfrac{4\sqrt2}{3}\pi$、$r=2$ では (iii)(iv) とも $\sqrt3\pi$ である。`,
            },
          ],
          pitfalls: [
            String.raw`場合分けの境目は $r=1$（球が円柱の側面に届く）、$r=\sqrt3$（球が円柱の上面に届く）、$r=2$（球が円柱の上面の縁に届く）の3つ。$r=2$ は $\sqrt{1^{2}+\left(\sqrt3\right)^{2}}=2$ から来る。`,
            String.raw`積分の上端は $\min\left(\sqrt3,r\right)$。球のほうが小さいうちは $r$、大きくなったら $\sqrt3$ である。`,
            String.raw`$r^{2}-1=u^{2}$ とおくと $u-r^{2}u=-u^{3}$ ときれいに消える。代入のタイミングを間違えないように。`,
          ],
          check: String.raw`$r=1.3$ では数値積分が $3.400968729$、式の値も $3.400968729$。$r=1.8$ では $5.167219748$ で一致し、$r=2.5$ では円柱の体積 $\sqrt3\pi=5.441398093$ になった。`,
        },
      ],
    },
  ],
};
