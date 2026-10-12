import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2021年度（令和3年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問の図に使う $a=\tfrac12$ のときの値。接点の $t$ は $t^{2}-2at+2a^{4}=0$ の解。 */
const A21 = 0.5;
const D21 = Math.sqrt(A21 * A21 - 2 * A21 ** 4);
const T1_21 = A21 - D21;
const T2_21 = A21 + D21;
/** $C_{1}$ の接線 $y=2tx-t^{2}$。 */
const TAN21 = (t: number) => (x: number): number => 2 * t * x - t * t;
/** $C_{2}\colon y=-(x-2a)^{2}+4a^{4}$。 */
const C2_21 = (x: number): number => -((x - 2 * A21) ** 2) + 4 * A21 ** 4;

/** 第2問(3) の $f(x)=(x+\alpha)(x+\beta)(x+\gamma)$。 */
const AL21 = Math.log(3) / Math.log(2);
const BE21 = Math.log(5) / Math.log(3);
const GA21 = Math.log(2) / Math.log(5);
const F21 = (x: number): number => (x + AL21) * (x + BE21) * (x + GA21);

export const nagoyaRikei2021: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法・積分法",
      topics: ["放物線の接線", "共通接線", "判別式", "面積", "最大値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.3,0.5$ で2つの接点 $t$ を求め、どちらの接線も $C_{2}$ と重解で交わる（接する）ことを確かめた",
          "2接線の交点を数値で出すと $a=0.2,0.4,0.5$ のいずれでも $(a,\\,2a^{4})$ と小数9桁まで一致した",
          "$S(a)$ をシンプソン法で数値積分すると $a=0.2,0.35,0.5,0.6$ で $\\tfrac{1}{3}a^{3}(1-2a^{2})^{3/2}$ と小数10桁まで一致し、最大は $a=0.5$ の $0.0147313913=\\tfrac{\\sqrt{2}}{96}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$C_{1}\colon y=x^{2}$ の点 $(t,\,t^{2})$ における接線の方程式を求める`,
          answer: String.raw`$y=2tx-t^{2}$`,
          approach: String.raw`微分して傾きを出し、点傾き形に入れるだけ。以降の小問はすべてこの形を使うので、$-t^{2}$ という定数項まで覚えておく。`,
          blocks: [
            { k: "p", t: String.raw`$y=x^{2}$ より $y'=2x$ なので、$x=t$ での接線の傾きは $2t$ である。点 $(t,\,t^{2})$ を通るから` },
            { k: "math", t: String.raw`y-t^{2}=2t\left(x-t\right)` },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`y=2tx-t^{2}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$C_{1}$ は上に開いた放物線なので、鉛直な接線はない。つまり $C_{1}$ の接線はすべて $y=2tx-t^{2}$ の形で書ける。(2) で「共通接線を全部数える」ときに効いてくる事実である。`,
            },
          ],
          check: String.raw`$x^{2}-\left(2tx-t^{2}\right)=(x-t)^{2}\geqq0$ で、等号は $x=t$ だけ。確かに接している。`,
        },
        {
          label: "(2)",
          task: String.raw`$C_{1}\colon y=x^{2}$ と $C_{2}\colon y=-x^{2}+4ax-4a^{2}+4a^{4}$（$a>0$）が異なる2本の共通接線をもつような $a$ の範囲を求める`,
          answer: String.raw`$0<a<\dfrac{\sqrt{2}}{2}$`,
          approach: String.raw`(1) で $C_{1}$ の接線は $y=2tx-t^{2}$ と尽くされている。あとは「この直線が $C_{2}$ にも接する」を判別式 $=0$ で書き、$t$ の2次方程式が異なる2解をもつ条件を、もう一度判別式で出す。判別式を2回使う形である。`,
          blocks: [
            { k: "p", t: String.raw`$C_{1}$ の接線 $y=2tx-t^{2}$ が $C_{2}$ にも接する条件を書く。$C_{2}$ の式と連立して` },
            { k: "math", t: String.raw`-x^{2}+4ax-4a^{2}+4a^{4}=2tx-t^{2}` },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`x^{2}-\left(4a-2t\right)x+\left(4a^{2}-4a^{4}-t^{2}\right)=0` },
            { k: "p", t: String.raw`である。接するのはこれが重解をもつとき、つまり` },
            {
              k: "math",
              t: String.raw`\left(4a-2t\right)^{2}-4\left(4a^{2}-4a^{4}-t^{2}\right)=0`,
            },
            { k: "p", t: String.raw`のときである。展開すると` },
            {
              k: "math",
              t: String.raw`16a^{2}-16at+4t^{2}-16a^{2}+16a^{4}+4t^{2}=8t^{2}-16at+16a^{4}=0`,
            },
            { k: "p", t: String.raw`で、$8$ で割って` },
            { k: "math", t: String.raw`t^{2}-2at+2a^{4}=0\qquad\cdots\text{①}` },
            {
              k: "p",
              t: String.raw`となる。共通接線は ① の実数解 $t$ と1対1に対応する（$t$ が違えば接線も違う）。よって共通接線が異なる2本あるのは、① が異なる2つの実数解をもつときである。`,
            },
            { k: "p", t: String.raw`① の判別式を $4$ で割ったものは` },
            { k: "math", t: String.raw`\frac{D}{4}=a^{2}-2a^{4}=a^{2}\left(1-2a^{2}\right)` },
            { k: "p", t: String.raw`で、$a>0$ だから $a^{2}>0$、したがって` },
            { k: "math", t: String.raw`1-2a^{2}>0\quad\Longleftrightarrow\quad a^{2}<\frac{1}{2}` },
            { k: "p", t: String.raw`である。$a>0$ とあわせて` },
            { k: "math", t: String.raw`0<a<\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2}` },
            { k: "p", t: String.raw`が答えである。` },
          ],
          pitfalls: [
            String.raw`「共通接線」は $C_{1}$ の接線でもあり $C_{2}$ の接線でもある直線。$C_{1}$ の接線をパラメータ $t$ で全部書き出してから $C_{2}$ の条件を課す、という順番にすると漏れがない。`,
            String.raw`判別式を2回使う。1回目は「$C_{2}$ に接する」、2回目は「そういう $t$ が2つある」。役割が違うので混ぜない。`,
          ],
          check: String.raw`$a=0.3$ では ① の解が $t=0.028338,\,0.571662$ の2つで、どちらの接線も $C_{2}$ と重解で交わった。$a=0.72\,(>\tfrac{\sqrt2}{2})$ では実数解がなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`$0<a<\tfrac{\sqrt{2}}{2}$ のとき、2本の共通接線 $\ell,\,\ell'$ の交点の座標を求める`,
          answer: String.raw`$\left(a,\ 2a^{4}\right)$`,
          approach: String.raw`$y=x^{2}$ の2接線の交点は、接点の $x$ 座標を $t_{1},t_{2}$ として $\left(\tfrac{t_{1}+t_{2}}{2},\,t_{1}t_{2}\right)$ になる。解と係数の関係をそのまま使えるので、$t_{1},t_{2}$ を根号で書き下す必要がない。`,
          blocks: [
            { k: "p", t: String.raw`① $t^{2}-2at+2a^{4}=0$ の2解を $t_{1},t_{2}$（$t_{1}<t_{2}$）とすると、解と係数の関係から` },
            { k: "math", t: String.raw`t_{1}+t_{2}=2a,\qquad t_{1}t_{2}=2a^{4}\qquad\cdots\text{②}` },
            { k: "p", t: String.raw`である。2本の接線` },
            { k: "math", t: String.raw`\ell\colon y=2t_{1}x-t_{1}^{2},\qquad\ell'\colon y=2t_{2}x-t_{2}^{2}` },
            { k: "p", t: String.raw`を連立すると` },
            {
              k: "math",
              t: String.raw`2\left(t_{1}-t_{2}\right)x=t_{1}^{2}-t_{2}^{2}=\left(t_{1}+t_{2}\right)\left(t_{1}-t_{2}\right)`,
            },
            { k: "p", t: String.raw`で、$t_{1}\neq t_{2}$ だから両辺を $t_{1}-t_{2}$ で割って` },
            { k: "math", t: String.raw`x=\frac{t_{1}+t_{2}}{2}=a` },
            { k: "p", t: String.raw`となる。これを $\ell$ に代入すると、② を使って` },
            {
              k: "math",
              t: String.raw`y=2t_{1}\cdot\frac{t_{1}+t_{2}}{2}-t_{1}^{2}=t_{1}^{2}+t_{1}t_{2}-t_{1}^{2}=t_{1}t_{2}=2a^{4}`,
            },
            { k: "p", t: String.raw`である。よって交点は` },
            { k: "math", t: String.raw`\left(a,\ 2a^{4}\right)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`交点の $x$ 座標が2接点の中点 $\tfrac{t_{1}+t_{2}}{2}$ になるのは放物線 $y=x^{2}$ に共通の性質で、(4) で「$x\leqq a$」がちょうど左半分を切り取ることに直結する。問題が $D_{2}$ を $x\leqq a$ で与えているのはこのためである。`,
            },
          ],
          check: String.raw`$a=0.4$ で数値計算すると交点は $(0.400000000,\,0.051200000)$ で、$2a^{4}=2\cdot0.0256=0.0512$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$C_{1}$ と $\ell,\,\ell'$ で囲まれた領域 $D_{1}$ と、$x\leqq a$ の表す領域 $D_{2}$ の共通部分の面積 $S(a)$ を求める`,
          answer: String.raw`$S(a)=\dfrac{1}{3}a^{3}\left(1-2a^{2}\right)^{\frac{3}{2}}$`,
          approach: String.raw`(3) より2接線の交点の $x$ 座標はちょうど $a$ なので、$D_{1}\cap D_{2}$ は「左半分」、つまり $t_{1}\leqq x\leqq a$ で $C_{1}$ と $\ell$ に挟まれた部分である。被積分関数が $(x-t_{1})^{2}$ になるので積分は一瞬で終わる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1/2 のときの C1、C2 と2本の共通接線。2接線の交点の x 座標は a で、網かけが x ≦ a の側に残る面積 S(a)。",
                view: [-0.3, 1.8, -0.35, 0.85],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fillBetween", top: (x: number) => x * x, bottom: TAN21(T1_21), from: T1_21, to: A21 },
                  { k: "curve", f: (x: number) => x * x, from: -0.3, to: 0.92 },
                  { k: "curve", f: C2_21, from: 0.23, to: 1.77 },
                  { k: "curve", f: TAN21(T1_21), from: -0.3, to: 1.8 },
                  { k: "curve", f: TAN21(T2_21), from: 0.222, to: 0.92 },
                  { k: "seg", a: [A21, -0.35], b: [A21, 0.85], dash: true },
                  { k: "dot", at: [T1_21, T1_21 * T1_21], label: "接点", place: "above-left" },
                  { k: "dot", at: [T2_21, T2_21 * T2_21], label: "接点", place: "left" },
                  { k: "dot", at: [A21, 2 * A21 ** 4], label: "(a, 2a⁴)", place: "below-right" },
                  { k: "text", at: [-0.27, 0.0729], label: "C₁", place: "above-left" },
                  { k: "text", at: [1.6, -0.11], label: "C₂", place: "right" },
                  { k: "text", at: [1.75, 0.49], label: "ℓ", place: "above-left" },
                  { k: "text", at: [0.9, 0.81], label: "ℓ′", place: "right" },
                  { k: "text", at: [A21, 0.85], label: "x = a", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`$C_{1}$ は下に凸なので、接線 $\ell,\ell'$ はどちらも $C_{1}$ の下側にある。よって $D_{1}$ は、上を $C_{1}$、下を2本の接線で囲まれた領域で、$t_{1}\leqq x\leqq t_{2}$ の範囲にある。`,
            },
            {
              k: "p",
              t: String.raw`(3) より $\ell$ と $\ell'$ の交点の $x$ 座標は $a=\tfrac{t_{1}+t_{2}}{2}$ なので、$x\leqq a$ の部分では下側の境界は $\ell$ だけである。したがって`,
            },
            {
              k: "math",
              t: String.raw`S(a)=\int_{t_{1}}^{a}\left\{x^{2}-\left(2t_{1}x-t_{1}^{2}\right)\right\}dx=\int_{t_{1}}^{a}\left(x-t_{1}\right)^{2}dx`,
            },
            { k: "p", t: String.raw`である。これは` },
            {
              k: "math",
              t: String.raw`S(a)=\left[\frac{\left(x-t_{1}\right)^{3}}{3}\right]_{t_{1}}^{a}=\frac{\left(a-t_{1}\right)^{3}}{3}`,
            },
            { k: "p", t: String.raw`となる。あとは $a-t_{1}$ を求めればよい。① の解は` },
            {
              k: "math",
              t: String.raw`t=a\pm\sqrt{a^{2}-2a^{4}}=a\pm a\sqrt{1-2a^{2}}`,
            },
            {
              k: "p",
              t: String.raw`（$a>0$ なので $\sqrt{a^{2}-2a^{4}}=\sqrt{a^{2}}\sqrt{1-2a^{2}}=a\sqrt{1-2a^{2}}$）だから、小さいほうが $t_{1}=a-a\sqrt{1-2a^{2}}$ で`,
            },
            { k: "math", t: String.raw`a-t_{1}=a\sqrt{1-2a^{2}}` },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`S(a)=\frac{1}{3}\left(a\sqrt{1-2a^{2}}\right)^{3}=\frac{1}{3}a^{3}\left(1-2a^{2}\right)^{\frac{3}{2}}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$C_{1}$ と2接線で囲まれた図形」の面積を $x\leqq a$ で切ると、下側の境界が $\ell$ だけになる。$\ell'$ は $x>a$ の側の境界なので、この積分には出てこない。`,
            String.raw`$\sqrt{a^{2}}=a$ と書けるのは $a>0$ だからで、ここを $|a|$ のまま引きずると最後の形が合わない。`,
          ],
          check: String.raw`$a=0.35$ でシンプソン法で数値積分すると $0.0093756914$、$\tfrac13 a^{3}(1-2a^{2})^{3/2}=0.0093756914$ で一致した。`,
        },
        {
          label: "(5)",
          task: String.raw`$a$ が (2) の範囲 $0<a<\tfrac{\sqrt{2}}{2}$ を動くときの $S(a)$ の最大値を求める`,
          answer: String.raw`$\dfrac{\sqrt{2}}{96}$（$a=\dfrac{1}{2}$ のとき）`,
          approach: String.raw`$S(a)=\tfrac13\left\{a^{2}\left(1-2a^{2}\right)\right\}^{\frac32}$ と $\tfrac32$ 乗の形にまとめてしまえば、中身の $a^{2}(1-2a^{2})$ を最大にすればよい。$u=a^{2}$ とおけば2次関数で、微分すら要らない。`,
          blocks: [
            { k: "p", t: String.raw`$a>0$ と $1-2a^{2}>0$ に注意して、$S(a)$ を $\tfrac32$ 乗の形に直す。` },
            {
              k: "math",
              t: String.raw`S(a)=\frac{1}{3}a^{3}\left(1-2a^{2}\right)^{\frac{3}{2}}=\frac{1}{3}\left\{a^{2}\left(1-2a^{2}\right)\right\}^{\frac{3}{2}}`,
            },
            {
              k: "p",
              t: String.raw`$u^{\frac32}$ は $u\geqq0$ で増加するので、$S(a)$ が最大になるのは $a^{2}\left(1-2a^{2}\right)$ が最大になるときである。`,
            },
            { k: "p", t: String.raw`$u=a^{2}$ とおくと、$0<a<\tfrac{1}{\sqrt{2}}$ は $0<u<\tfrac12$ にあたる。このとき` },
            {
              k: "math",
              t: String.raw`u\left(1-2u\right)=-2\left(u^{2}-\frac{u}{2}\right)=-2\left(u-\frac{1}{4}\right)^{2}+\frac{1}{8}`,
            },
            {
              k: "p",
              t: String.raw`なので、$u=\tfrac14$ のとき最大値 $\tfrac18$ をとる。$u=\tfrac14$ は $0<u<\tfrac12$ の内部にあり、$a=\tfrac12$ に対応する。`,
            },
            { k: "p", t: String.raw`よって $S(a)$ の最大値は` },
            {
              k: "math",
              t: String.raw`\frac{1}{3}\left(\frac{1}{8}\right)^{\frac{3}{2}}=\frac{1}{3}\cdot\frac{1}{16\sqrt{2}}=\frac{1}{48\sqrt{2}}=\frac{\sqrt{2}}{96}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$a^{3}\left(1-2a^{2}\right)^{3/2}$ をそのまま微分してもできるが、$\tfrac32$ 乗の形にまとめると2次関数の平方完成で済む。$u=a^{2}$ の範囲が $0<u<\tfrac12$ になることだけ確認する。`,
            String.raw`$\left(\tfrac18\right)^{3/2}=\tfrac{1}{8\sqrt{8}}=\tfrac{1}{16\sqrt2}$。$\tfrac18$ を3乗しない。`,
          ],
          check: String.raw`$a$ を $10^{-6}$ 刻みで動かして $S(a)$ を数えると、最大は $a=0.500000$ での $0.0147313913$ だった。$\tfrac{\sqrt2}{96}=0.0147313913$ と一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "指数・対数",
      topics: ["底の変換", "大小比較", "解と係数の関係", "3次関数の符号"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha\\beta\\gamma$ を数値で計算すると $1.000000000000$ になった",
          "$\\alpha=1.584963,\\ \\beta=1.464974,\\ \\gamma=0.430677,\\ \\delta=1.5$ で、小さい順は $\\gamma,\\beta,\\delta,\\alpha$ だった",
          "$q=\\tfrac1\\alpha+\\tfrac1\\beta+\\tfrac1\\gamma=3.635464$ が $\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha=3.635464$ と一致し、$f(x)$ と $(x+\\alpha)(x+\\beta)(x+\\gamma)$ が $x=-\\tfrac12,-1,-\\tfrac32$ で小数9桁まで同じ値になった",
          "$f(-\\tfrac12)=-0.072578877,\\ f(-1)=-0.154851463,\\ f(-\\tfrac32)=+0.003182239$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha=\log_{2}3,\ \beta=\log_{3}5,\ \gamma=\log_{5}2$ について $\alpha\beta\gamma=1$ を示す`,
          answer: String.raw`底の変換で $\alpha\beta\gamma=\dfrac{\log3}{\log2}\cdot\dfrac{\log5}{\log3}\cdot\dfrac{\log2}{\log5}=1$`,
          approach: String.raw`底がばらばらなので、まず全部を同じ底にそろえる。そろえれば分子と分母が順に打ち消し合う。`,
          blocks: [
            { k: "p", t: String.raw`底を $10$（何でもよい）にそろえると、底の変換公式から` },
            {
              k: "math",
              t: String.raw`\alpha=\frac{\log3}{\log2},\qquad\beta=\frac{\log5}{\log3},\qquad\gamma=\frac{\log2}{\log5}`,
            },
            { k: "p", t: String.raw`である（$\log2,\log3,\log5$ はいずれも $0$ でない）。よって` },
            {
              k: "math",
              t: String.raw`\alpha\beta\gamma=\frac{\log3}{\log2}\cdot\frac{\log5}{\log3}\cdot\frac{\log2}{\log5}=1`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`この $\alpha\beta\gamma=1$ が (3) で効く。$\tfrac1\alpha=\beta\gamma$ のように、逆数が残り2つの積に化けるからである。`,
            },
          ],
          check: String.raw`数値で $\alpha\beta\gamma=1.000000000000$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\alpha=\log_{2}3,\ \beta=\log_{3}5,\ \gamma=\log_{5}2,\ \delta=\tfrac32$ を小さい順に並べる`,
          answer: String.raw`$\gamma<\beta<\delta<\alpha$`,
          approach: String.raw`対数の大小は、$\log_{a}b$ と有理数 $\tfrac{q}{p}$ の比較を $b^{p}$ と $a^{q}$ の比較に直すのが基本。$\gamma$ だけは $1$ より小さいことがすぐ分かるので先に外し、残り3つを $\tfrac32$ との比較に帰着させる。`,
          blocks: [
            { k: "p", t: String.raw`**$\gamma$ が最小。** $2<5$ より $\log_{5}2<\log_{5}5=1$ なので` },
            { k: "math", t: String.raw`\gamma<1` },
            { k: "p", t: String.raw`である。一方 $\beta=\log_{3}5>\log_{3}3=1$、$\alpha=\log_{2}3>\log_{2}2=1$、$\delta=\tfrac32>1$ なので、$\gamma$ がいちばん小さい。` },
            { k: "p", t: String.raw`**$\beta$ と $\delta$。** $\beta<\tfrac32$ は $3^{\beta}<3^{\frac32}$ と同値で、$3^{\beta}=5$ だから` },
            { k: "math", t: String.raw`5<3^{\frac{3}{2}}\quad\Longleftrightarrow\quad 5^{2}<3^{3}\quad\Longleftrightarrow\quad 25<27` },
            { k: "p", t: String.raw`である。これは正しいので $\beta<\delta$ である。` },
            { k: "p", t: String.raw`**$\delta$ と $\alpha$。** $\tfrac32<\alpha$ は $2^{\frac32}<2^{\alpha}=3$ と同値で` },
            { k: "math", t: String.raw`2^{\frac{3}{2}}<3\quad\Longleftrightarrow\quad 2^{3}<3^{2}\quad\Longleftrightarrow\quad 8<9` },
            { k: "p", t: String.raw`である。これも正しいので $\delta<\alpha$ である。` },
            { k: "p", t: String.raw`以上をあわせて` },
            { k: "math", t: String.raw`\gamma<\beta<\delta<\alpha` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$y=a^{x}$（$a>1$）が増加関数であることを使って、対数の不等式を整数の不等式に落としている。$25<27$ と $8<9$ という、暗算でできる形まで持っていけるのがこの問題の狙いである。`,
            },
          ],
          pitfalls: [
            String.raw`$\beta$ と $\alpha$ を直接比べようとすると $5^{2}$ と $3^{3}$ のような形にならず苦しい。$\delta=\tfrac32$ を仲立ちにする。`,
            String.raw`両辺を $p$ 乗するときは、両辺が正で $y=x^{p}$ が増加であることを前提にしている。`,
          ],
          check: String.raw`数値では $\gamma=0.430677<\beta=1.464974<\delta=1.5<\alpha=1.584963$ で、並び順が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$p=\alpha+\beta+\gamma$、$q=\tfrac1\alpha+\tfrac1\beta+\tfrac1\gamma$、$f(x)=x^{3}+px^{2}+qx+1$ とするとき、$f\!\left(-\tfrac12\right),\ f(-1),\ f\!\left(-\tfrac32\right)$ の正負を判定する`,
          answer: String.raw`$f\!\left(-\dfrac12\right)<0$、$f(-1)<0$、$f\!\left(-\dfrac32\right)>0$`,
          approach: String.raw`(1) の $\alpha\beta\gamma=1$ を使うと $q=\alpha\beta+\beta\gamma+\gamma\alpha$ に直る。すると $f(x)$ は $(x+\alpha)(x+\beta)(x+\gamma)$ と因数分解でき、あとは3つの因数の符号を (2) の大小から読むだけになる。値を計算する必要はない。`,
          blocks: [
            { k: "p", t: String.raw`**$q$ を書き直す。** (1) の $\alpha\beta\gamma=1$ から` },
            {
              k: "math",
              t: String.raw`\frac{1}{\alpha}=\beta\gamma,\qquad\frac{1}{\beta}=\gamma\alpha,\qquad\frac{1}{\gamma}=\alpha\beta`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`q=\alpha\beta+\beta\gamma+\gamma\alpha` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$f$ を因数分解する。** 基本対称式がそろったので` },
            {
              k: "math",
              t: String.raw`\left(x+\alpha\right)\left(x+\beta\right)\left(x+\gamma\right)=x^{3}+\left(\alpha+\beta+\gamma\right)x^{2}+\left(\alpha\beta+\beta\gamma+\gamma\alpha\right)x+\alpha\beta\gamma`,
            },
            { k: "p", t: String.raw`の右辺は、$\alpha\beta\gamma=1$ とあわせてちょうど $x^{3}+px^{2}+qx+1$ である。したがって` },
            { k: "math", t: String.raw`f(x)=\left(x+\alpha\right)\left(x+\beta\right)\left(x+\gamma\right)` },
            { k: "p", t: String.raw`と因数分解できる。$f$ の実数解は $x=-\alpha,\,-\beta,\,-\gamma$ の3つで、(2) の $\gamma<\beta<\delta<\alpha$ を $-1$ 倍して` },
            { k: "math", t: String.raw`-\alpha<-\delta<-\beta<-\gamma` },
            { k: "p", t: String.raw`すなわち $-\alpha<-\dfrac32<-\beta<-\gamma$ である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) = (x+α)(x+β)(x+γ) のグラフ。3つの零点は -α, -β, -γ。x = -1 と x = -1/2 は -β と -γ のあいだにあり、グラフは x 軸の下にある。-α と -β のあいだではグラフは x 軸の上にあるが、この縮尺では持ち上がりが見えないので、次の図で拡大する。",
                view: [-1.75, -0.2, -0.21, 0.09],
                step: { x: 0.5, y: 0.1 },
                items: [
                  { k: "curve", f: F21, from: -1.74, to: -0.37 },
                  { k: "dot", at: [-AL21, 0], label: "-α", place: "below-left" },
                  { k: "dot", at: [-BE21, 0], label: "-β", place: "below-right" },
                  { k: "dot", at: [-GA21, 0], label: "-γ", place: "below-right" },
                  { k: "dot", at: [-1, F21(-1)], label: "f(-1) < 0", place: "below" },
                  { k: "dot", at: [-0.5, F21(-0.5)], label: "f(-1/2) < 0", place: "below-right" },
                ],
              },
            },
            {
              k: "figure",
              fig: {
                caption:
                  "-α と -β のあいだを拡大したもの（縦が横の約40倍の縮尺）。x = -3/2 はこの区間にあり、グラフは x 軸より上にある。f(-3/2) の値は 0.0032 ほどしかない。",
                view: [-1.69, -1.33, -0.027, 0.009],
                step: { x: 0.1, y: 0.01 },
                items: [
                  { k: "curve", f: F21, from: -1.685, to: -1.35 },
                  { k: "seg", a: [-AL21, -0.011], b: [-AL21, 0], dash: true },
                  { k: "seg", a: [-BE21, -0.011], b: [-BE21, 0], dash: true },
                  { k: "seg", a: [-1.5, -0.011], b: [-1.5, F21(-1.5)], dash: true },
                  { k: "dot", at: [-AL21, 0] },
                  { k: "dot", at: [-BE21, 0] },
                  { k: "dot", at: [-1.5, F21(-1.5)], label: "f(-3/2) > 0", place: "above" },
                  { k: "text", at: [-AL21, -0.011], label: "-α", place: "below" },
                  { k: "text", at: [-BE21, -0.011], label: "-β", place: "below" },
                  { k: "text", at: [-1.5, -0.011], label: "-3/2", place: "below" },
                ],
              },
            },
            { k: "p", t: String.raw`**符号を読む。** 3つの因数 $x+\alpha,\ x+\beta,\ x+\gamma$ の符号を調べる。` },
            {
              k: "p",
              t: String.raw`$x=-\tfrac32$ のとき。$-\alpha<-\tfrac32<-\beta<-\gamma$ だから $x+\alpha>0$、$x+\beta<0$、$x+\gamma<0$ で、負が2つなので積は正である。よって $f\!\left(-\tfrac32\right)>0$。`,
            },
            {
              k: "p",
              t: String.raw`$x=-1$ と $x=-\tfrac12$ のとき。まず $\gamma=\log_{5}2<\tfrac12$ である（$2<\sqrt{5}$、すなわち $4<5$ だから）。また $\beta=\log_{3}5>1$ である。したがって`,
            },
            { k: "math", t: String.raw`\gamma<\frac{1}{2}<1<\beta<\alpha` },
            {
              k: "p",
              t: String.raw`で、$-1$ も $-\tfrac12$ も $-\beta$ と $-\gamma$ のあいだにある。このとき $x+\alpha>0$、$x+\beta>0$、$x+\gamma<0$ で、負が1つだから積は負である。よって`,
            },
            { k: "math", t: String.raw`f\left(-\frac{1}{2}\right)<0,\qquad f(-1)<0,\qquad f\left(-\frac{3}{2}\right)>0` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$q$ をそのまま $\tfrac1\alpha+\tfrac1\beta+\tfrac1\gamma$ で扱うと因数分解に気づけない。$\alpha\beta\gamma=1$ を使って基本対称式の形に直すのが (1) の意味である。`,
            String.raw`定数項が $+1=\alpha\beta\gamma$ なので、因数は $(x-\alpha)$ ではなく $(x+\alpha)$ になる。符号を取り違えると零点が逆になる。`,
            String.raw`$-\tfrac12$ と $-1$ については (2) の並びだけでは足りず、$\gamma<\tfrac12$ と $1<\beta$ を別に言う必要がある。`,
          ],
          check: String.raw`$p=3.480613,\ q=3.635464$ として直接計算すると $f(-\tfrac12)=-0.072578877$、$f(-1)=-0.154851463$、$f(-\tfrac32)=+0.003182239$ で、符号が一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["推移のある試行", "到達確率", "漸化的な計算", "全事象の確認"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$1$〜$12$ の各数字から動ける先を書き出し、行き先がつねに自分より大きい数字であることを確かめた（だから番号順に1回なぞるだけで確率が確定する）",
          "分数（Fraction）で $p_{1}$ から $p_{12}$ まで順に計算すると $p_{5}+p_{9}+p_{11}+p_{12}=1$ になった",
          "40万回のモンテカルロで $p_{2}=0.09610,\\ p_{5}=0.22837,\\ p_{9}=0.40055,\\ p_{11}=0.19997,\\ p_{12}=0.17111$（理論値 $0.095238,\\ 0.228571,\\ 0.4,\\ 0.2,\\ 0.171429$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$1$ から $12$ までを4段（上から順に5個・4個・2個・1個）に左詰めで並べた配置で、石を右隣以降・真下以降の数字へ等確率に移すゲームを行うとき、終了時に $2$ が丸で囲まれている確率 $p_{2}$ を求める`,
          answer: String.raw`$p_{2}=\dfrac{2}{21}$`,
          approach: String.raw`「終了時に $j$ が丸で囲まれている」＝「ゲーム中に石が一度でも $j$ に乗る」である（丸は消えない）。移動先はつねに自分より大きい数字なので、同じ数字を2度通ることはなく、$p_{j}$ は「$j$ に入ってくる道」をすべて足せば求まる。$2$ に入れるのは最初に選ぶ場合と $1$ から来る場合だけなので、2項で終わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**まず移動先を整理する。** 配置は、第1段が $1,2,3,4,5$、第2段が $6,7,8,9$、第3段が $10,11$、第4段が $12$ を左詰めにしたものである。「同じ段で右にあるもの」と「同じ列で下にあるもの」をすべて書き出すと、次のようになる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$1\to\{2,3,4,5,6,10,12\}$（7通り）`,
                String.raw`$2\to\{3,4,5,7,11\}$（5通り）`,
                String.raw`$3\to\{4,5,8\}$（3通り）`,
                String.raw`$4\to\{5,9\}$（2通り）`,
                String.raw`$6\to\{7,8,9,10,12\}$（5通り）`,
                String.raw`$7\to\{8,9,11\}$（3通り）`,
                String.raw`$8\to\{9\}$（1通り）`,
                String.raw`$10\to\{11,12\}$（2通り）`,
                String.raw`$5,\,9,\,11,\,12$ は行き先がない`,
              ],
            },
            {
              k: "p",
              t: String.raw`行き先がないのは $5,9,11,12$ の4つだけで、これはちょうど終了条件の4つと一致する。つまり**ゲームは「動けなくなるまで動く」のと同じ**であり、必ず $5,9,11,12$ のどれか1つで終わる。`,
            },
            {
              k: "p",
              t: String.raw`また、どの移動も数字を**真に大きく**する。したがって石は同じ数字を2度通らず、$j$ が丸で囲まれるのは「石が $j$ をちょうど1回通る」ことと同じである。そこで`,
            },
            { k: "math", t: String.raw`p_{j}=\left(\text{石が}\ j\ \text{を通る確率}\right)` },
            { k: "p", t: String.raw`を、$j$ に入ってくる道で場合分けして足す。` },
            { k: "p", t: String.raw`**$p_{2}$ を求める。** $2$ に石が乗るのは次の2通りで、互いに排反である。` },
            {
              k: "steps",
              items: [
                String.raw`最初の (a) で $2$ を選ぶ：確率 $\dfrac{1}{12}$`,
                String.raw`最初に $1$ を選び、次に $2$ へ移る：$1$ からの行き先は7通りなので $\dfrac{1}{12}\cdot\dfrac{1}{7}=\dfrac{1}{84}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$2$ に入ってこられるのは「同じ段で左にある」$1$ だけ（$2$ は最上段なので真上の数字はない）なので、これで尽きている。よって`,
            },
            {
              k: "math",
              t: String.raw`p_{2}=\frac{1}{12}+\frac{1}{84}=\frac{7}{84}+\frac{1}{84}=\frac{8}{84}=\frac{2}{21}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`丸は消えないので、$p_{j}$ は「最後に石がある場所」ではなく「一度でも通ったか」の確率である。終了条件の $5,9,11,12$ 以外についても $p_{j}$ は定義されている。`,
            String.raw`移動先の個数は数字ごとに違う（$1$ なら7通り、$4$ なら2通り）。分母を $12$ のまま使い回さない。`,
          ],
          check: String.raw`40万回のモンテカルロで $0.09610$、$\tfrac{2}{21}=0.095238$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`確率 $p_{5}$ と $p_{11}$ を求める`,
          answer: String.raw`$p_{5}=\dfrac{8}{35}$、$p_{11}=\dfrac{1}{5}$`,
          approach: String.raw`移動はつねに数字を大きくするので、$p_{1},p_{2},\dots$ と番号の小さいほうから順に確定していく。$j$ に入ってくる矢印を全部拾って $p_{i}\times\tfrac{1}{(i\ \text{の行き先の個数})}$ を足すだけで、連立方程式を解く必要はない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`番号の小さい順に計算する。$i$ から $j$ へ移る確率は $\dfrac{1}{n_{i}}$（$n_{i}$ は $i$ の行き先の個数）で、(1) の表から $n_{1}=7,\ n_{2}=5,\ n_{3}=3,\ n_{4}=2,\ n_{6}=5,\ n_{7}=3,\ n_{8}=1,\ n_{10}=2$ である。`,
            },
            { k: "p", t: String.raw`以下、分母を $420$ にそろえて書く（$\tfrac{1}{12}=\tfrac{35}{420}$）。` },
            { k: "math", t: String.raw`p_{1}=\frac{1}{12}=\frac{35}{420}` },
            {
              k: "p",
              t: String.raw`$3$ に入れるのは $1,2$ から。$4$ に入れるのは $1,2,3$ から。いずれも最上段なので真上はない。`,
            },
            {
              k: "math",
              t: String.raw`p_{2}=\frac{35}{420}+\frac{p_{1}}{7}=\frac{35+5}{420}=\frac{40}{420}`,
            },
            {
              k: "math",
              t: String.raw`p_{3}=\frac{35}{420}+\frac{p_{1}}{7}+\frac{p_{2}}{5}=\frac{35+5+8}{420}=\frac{48}{420}`,
            },
            {
              k: "math",
              t: String.raw`p_{4}=\frac{35}{420}+\frac{p_{1}}{7}+\frac{p_{2}}{5}+\frac{p_{3}}{3}=\frac{35+5+8+16}{420}=\frac{64}{420}`,
            },
            { k: "p", t: String.raw`$5$ に入れるのは $1,2,3,4$ から（$5$ の列には $5$ しかないので真上はない）。` },
            {
              k: "math",
              t: String.raw`p_{5}=\frac{35}{420}+\frac{p_{1}}{7}+\frac{p_{2}}{5}+\frac{p_{3}}{3}+\frac{p_{4}}{2}=\frac{35+5+8+16+32}{420}=\frac{96}{420}=\frac{8}{35}`,
            },
            { k: "p", t: String.raw`**$p_{11}$ のほう。** $11$ に入れるのは、同じ段の左の $10$ と、同じ列の上の $2,7$ である。順に用意する。` },
            {
              k: "math",
              t: String.raw`p_{6}=\frac{35}{420}+\frac{p_{1}}{7}=\frac{40}{420}`,
            },
            {
              k: "math",
              t: String.raw`p_{7}=\frac{35}{420}+\frac{p_{2}}{5}+\frac{p_{6}}{5}=\frac{35+8+8}{420}=\frac{51}{420}`,
            },
            {
              k: "math",
              t: String.raw`p_{10}=\frac{35}{420}+\frac{p_{1}}{7}+\frac{p_{6}}{5}=\frac{35+5+8}{420}=\frac{48}{420}`,
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`p_{11}=\frac{35}{420}+\frac{p_{2}}{5}+\frac{p_{7}}{3}+\frac{p_{10}}{2}=\frac{35+8+17+24}{420}=\frac{84}{420}=\frac{1}{5}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$j$ に入ってくる矢印を数え落としやすい。$j$ の「同じ段で左にあるもの全部」と「同じ列で上にあるもの全部」の2方向を機械的に拾う。`,
            String.raw`$7$ には $1$ から直接は行けない（$1$ と $7$ は段も列も違う）。図の位置関係をそのつど確認する。`,
          ],
          check: String.raw`モンテカルロで $p_{5}=0.22837$（$\tfrac{8}{35}=0.228571$）、$p_{11}=0.19997$（$\tfrac15=0.2$）だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$p_{5},\,p_{9},\,p_{11},\,p_{12}$ のうち最も大きいものの値を求める`,
          answer: String.raw`$p_{9}=\dfrac{2}{5}$`,
          approach: String.raw`残りの $p_{9},p_{12}$ も同じ手順で出す。4つの和が $1$ になるはずなので、それを検算に使えば計算ミスがそのまま見つかる。`,
          blocks: [
            { k: "p", t: String.raw`$8$ に入れるのは同じ段の左の $6,7$ と、同じ列の上の $3$ である。` },
            {
              k: "math",
              t: String.raw`p_{8}=\frac{35}{420}+\frac{p_{3}}{3}+\frac{p_{6}}{5}+\frac{p_{7}}{3}=\frac{35+16+8+17}{420}=\frac{76}{420}`,
            },
            { k: "p", t: String.raw`$9$ に入れるのは同じ段の左の $6,7,8$ と、同じ列の上の $4$ である。$n_{8}=1$ なので $8$ からは必ず $9$ へ行く。` },
            {
              k: "math",
              t: String.raw`p_{9}=\frac{35}{420}+\frac{p_{4}}{2}+\frac{p_{6}}{5}+\frac{p_{7}}{3}+p_{8}=\frac{35+32+8+17+76}{420}=\frac{168}{420}=\frac{2}{5}`,
            },
            { k: "p", t: String.raw`$12$ に入れるのは同じ列の上の $1,6,10$ である（第4段には $12$ しかないので左はない）。` },
            {
              k: "math",
              t: String.raw`p_{12}=\frac{35}{420}+\frac{p_{1}}{7}+\frac{p_{6}}{5}+\frac{p_{10}}{2}=\frac{35+5+8+24}{420}=\frac{72}{420}=\frac{6}{35}`,
            },
            { k: "p", t: String.raw`4つを並べると` },
            {
              k: "math",
              t: String.raw`p_{5}=\frac{96}{420},\quad p_{9}=\frac{168}{420},\quad p_{11}=\frac{84}{420},\quad p_{12}=\frac{72}{420}`,
            },
            { k: "p", t: String.raw`で、和は` },
            {
              k: "math",
              t: String.raw`\frac{96+168+84+72}{420}=\frac{420}{420}=1`,
            },
            {
              k: "p",
              t: String.raw`となる。ゲームは必ずこの4つのどれか1つで終わるので、和が $1$ になるのは当然であり、よい検算になっている。最大は`,
            },
            { k: "math", t: String.raw`p_{9}=\frac{168}{420}=\frac{2}{5}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$9$ が大きくなるのは、$9$ に入ってくる矢印が4本あるうえ、$8$ からは確率 $1$ で $9$ に来るからである。行き止まりの直前にある数字は確率が集まりやすい。`,
            },
          ],
          pitfalls: [
            String.raw`$p_{8}$ で $6$ からの寄与を忘れやすい。$6\to\{7,8,9,10,12\}$ に $8$ が入っている。`,
            String.raw`$p_{5}+p_{9}+p_{11}+p_{12}=1$ を必ず確かめる。合わなければどこかの矢印を数え落としている。`,
          ],
          check: String.raw`モンテカルロ40万回で $p_{9}=0.40055$ となり、$\tfrac25=0.4$ と一致した。4つの和も分数計算でちょうど $1$ になった。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["ガウス記号", "漸化式", "軌跡の図示", "2項間漸化式の一般項"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$x$ を $-50$ から $50$ まで20万点とって、小数部分が $\\tfrac12$ 以上なら必ず $3\\left[x+\\tfrac12\\right]-2x>x$ になることを確かめた（反例 0 件）",
          "同じ20万点で、$3\\left[x+\\tfrac12\\right]-2x<x$ のときは必ず $3\\left[x+\\tfrac12\\right]-2x=3\\left[x\\right]-2x$ かつ $\\left[3\\left[x\\right]-2x\\right]=\\left[x\\right]-1$ になった（反例 0 件）",
          "$a=\\tfrac{1}{1000},\\dots,\\tfrac{999}{1000}$ について漸化式を分数のまま回し、減少が続くあいだの $a_{k}$ が $\\tfrac43-k+\\tfrac{(-2)^{k}}{6}(1-3a)$ と完全に一致した（反例 0 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0\leqq a<1$、$a_{1}=a$、$a_{n+1}=3\left[a_{n}+\tfrac12\right]-2a_{n}$ とするとき、$a$ が $0\leqq a<1$ を動いてできる点 $(x,y)=(a_{1},a_{2})$ の軌跡を図示する`,
          answer: String.raw`$0\leqq x<\tfrac12$ の部分が $y=-2x$、$\tfrac12\leqq x<1$ の部分が $y=-2x+3$ の、2本の線分（右端は除く）`,
          approach: String.raw`$\left[a+\tfrac12\right]$ の値が変わるところで場合分けする。$0\leqq a<1$ なら $a+\tfrac12$ は $\tfrac12$ 以上 $\tfrac32$ 未満なので、ガウス記号の値は $0$ か $1$ の2通りしかない。`,
          blocks: [
            { k: "p", t: String.raw`$x=a_{1}=a$ なので $0\leqq x<1$ である。$a+\tfrac12$ は $\tfrac12\leqq a+\tfrac12<\tfrac32$ を動くから、` },
            {
              k: "steps",
              items: [
                String.raw`$0\leqq a<\tfrac12$ のとき $\tfrac12\leqq a+\tfrac12<1$ なので $\left[a+\tfrac12\right]=0$`,
                String.raw`$\tfrac12\leqq a<1$ のとき $1\leqq a+\tfrac12<\tfrac32$ なので $\left[a+\tfrac12\right]=1$`,
              ],
            },
            { k: "p", t: String.raw`の2通りである。それぞれ $y=a_{2}=3\left[a+\tfrac12\right]-2a$ に入れると` },
            {
              k: "math",
              t: String.raw`y=\begin{cases}-2x & \left(0\leqq x<\dfrac{1}{2}\right)\\[4pt] -2x+3 & \left(\dfrac{1}{2}\leqq x<1\right)\end{cases}`,
            },
            { k: "p", t: String.raw`である。端点は $x=0$ で $(0,0)$、$x\to\tfrac12$ で $\left(\tfrac12,-1\right)$ に近づく（含まない）、$x=\tfrac12$ で $\left(\tfrac12,2\right)$、$x\to1$ で $(1,1)$ に近づく（含まない）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "点 (a1, a2) の軌跡。傾き -2 の線分が2本で、左の線分は (0, 0) から (1/2, -1) の手前まで、右の線分は (1/2, 2) から (1, 1) の手前まで。白丸にあたる右端は含まない。",
                view: [-1.3, 2.3, -1.4, 2.4],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "seg", a: [0, 0], b: [0.5, -1] },
                  { k: "seg", a: [0.5, 2], b: [1, 1] },
                  { k: "dot", at: [0, 0], label: "(0, 0)", place: "above-left" },
                  { k: "text", at: [0.5, -1], label: "(1/2, -1) は除く", place: "below-right" },
                  { k: "dot", at: [0.5, 2], label: "(1/2, 2)", place: "above-left" },
                  { k: "text", at: [1, 1], label: "(1, 1) は除く", place: "right" },
                ],
              },
            },
            { k: "p", t: String.raw`求める軌跡はこの2本の線分（それぞれ右端を除く）である。` },
          ],
          pitfalls: [
            String.raw`$\left[a+\tfrac12\right]$ であって $\left[a\right]+\tfrac12$ ではない。切り替わるのは $a=\tfrac12$ である。`,
            String.raw`$a<1$ は等号なしなので、右端の $\left(\tfrac12,-1\right)$ と $(1,1)$ は含まない。$x=\tfrac12$ 自体は右側の線分に入るので、$\left(\tfrac12,2\right)$ は含む。`,
          ],
          check: String.raw`$a=0.3$ なら $a_{2}=-0.6=-2\cdot0.3$、$a=0.8$ なら $a_{2}=3-1.6=1.4=-2\cdot0.8+3$ で、式のとおりだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_{n}-\left[a_{n}\right]\geqq\tfrac12$ ならば $a_{n}<a_{n+1}$ であることを示す`,
          answer: String.raw`$a_{n+1}-a_{n}=3\left(1-f\right)>0$（$f=a_{n}-\left[a_{n}\right]$ は小数部分で $f<1$）`,
          approach: String.raw`$m=\left[a_{n}\right]$、$f=a_{n}-m$ とおいて、$\left[a_{n}+\tfrac12\right]$ を $m$ で表す。$f\geqq\tfrac12$ なら $f+\tfrac12\geqq1$ なので、ガウス記号の中身が1つ繰り上がる。`,
          blocks: [
            { k: "p", t: String.raw`$m=\left[a_{n}\right]$、$f=a_{n}-m$ とおく。$m$ は整数で $0\leqq f<1$ である。仮定は $f\geqq\tfrac12$ である。` },
            { k: "p", t: String.raw`このとき` },
            { k: "math", t: String.raw`a_{n}+\frac{1}{2}=m+\left(f+\frac{1}{2}\right),\qquad 1\leqq f+\frac{1}{2}<\frac{3}{2}` },
            { k: "p", t: String.raw`なので $f+\tfrac12$ の整数部分は $1$ であり` },
            { k: "math", t: String.raw`\left[a_{n}+\frac{1}{2}\right]=m+1` },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`a_{n+1}=3\left(m+1\right)-2a_{n}=3m+3-2\left(m+f\right)=m+3-2f`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`a_{n+1}-a_{n}=\left(m+3-2f\right)-\left(m+f\right)=3-3f=3\left(1-f\right)`,
            },
            { k: "p", t: String.raw`である。$f<1$ だから $3(1-f)>0$、すなわち $a_{n}<a_{n+1}$ である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`ガウス記号は「整数部分 $m$ をくくり出す」と扱いやすい。$\left[m+t\right]=m+\left[t\right]$（$m$ は整数）を使う。`,
            String.raw`$f<1$ は小数部分の定義そのもので、ここだけが不等号を強くする根拠である。`,
          ],
          check: String.raw`$-50\leqq x\leqq50$ の20万点で、小数部分が $\tfrac12$ 以上のときに $a_{n+1}>a_{n}$ が破れる例はなかった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a_{n}>a_{n+1}$ ならば $a_{n+1}=3\left[a_{n}\right]-2a_{n}$ かつ $\left[a_{n+1}\right]=\left[a_{n}\right]-1$ であることを示す`,
          answer: String.raw`(2) の対偶から $f<\tfrac12$、よって $\left[a_{n}+\tfrac12\right]=\left[a_{n}\right]$ となり $a_{n+1}=m-2f$（$0<2f<1$）`,
          approach: String.raw`(2) の対偶を使って小数部分を $\tfrac12$ 未満に絞るのが第一歩。そのあとは $a_{n+1}=m-2f$ を $m-1<a_{n+1}<m$ の形に読み替えればガウス記号が確定する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) の対偶より、$a_{n}>a_{n+1}$ ならば $f=a_{n}-\left[a_{n}\right]<\tfrac12$ である。$m=\left[a_{n}\right]$ とおく。`,
            },
            { k: "p", t: String.raw`**前半。** $f<\tfrac12$ より` },
            { k: "math", t: String.raw`\frac{1}{2}\leqq f+\frac{1}{2}<1` },
            { k: "p", t: String.raw`なので $\left[a_{n}+\tfrac12\right]=m=\left[a_{n}\right]$ である。したがって` },
            {
              k: "math",
              t: String.raw`a_{n+1}=3\left[a_{n}+\frac{1}{2}\right]-2a_{n}=3\left[a_{n}\right]-2a_{n}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**後半。** これを $m,f$ で書くと` },
            { k: "math", t: String.raw`a_{n+1}=3m-2\left(m+f\right)=m-2f` },
            { k: "p", t: String.raw`である。ここで $f=0$ だと $a_{n+1}=m=a_{n}$ となって $a_{n}>a_{n+1}$ に反するので $f>0$、つまり` },
            { k: "math", t: String.raw`0<2f<1` },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`m-1<a_{n+1}<m` },
            { k: "p", t: String.raw`となり` },
            { k: "math", t: String.raw`\left[a_{n+1}\right]=m-1=\left[a_{n}\right]-1` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$f=0$ の場合を落とすと $a_{n+1}=m$ となり $\left[a_{n+1}\right]=m$ で結論が崩れる。仮定 $a_{n}>a_{n+1}$ から $f>0$ を言っておく。`,
            String.raw`$\left[a_{n+1}\right]$ は $a_{n+1}$ を整数で挟んで決める。$m-1<a_{n+1}<m$ まで持っていけば自動的に決まる。`,
          ],
          check: String.raw`$-50\leqq x\leqq50$ の20万点のうち $a_{n+1}<a_{n}$ となったものすべてで、$a_{n+1}=3\left[a_{n}\right]-2a_{n}$ と $\left[a_{n+1}\right]=\left[a_{n}\right]-1$ が成り立った。`,
        },
        {
          label: "(4)",
          task: String.raw`ある $2$ 以上の自然数 $k$ について $a_{1}>a_{2}>\cdots>a_{k}$ が成り立つとき、$a_{k}$ を $a$ の式で表す`,
          answer: String.raw`$a_{k}=\dfrac{4}{3}-k+\dfrac{\left(-2\right)^{k}}{6}\left(1-3a\right)$`,
          approach: String.raw`(3) を $n=1,\dots,k-1$ に順に使うと $\left[a_{n}\right]$ が $0,-1,-2,\dots$ と $1$ ずつ下がることが分かる。すると漸化式のガウス記号が消えて $a_{n+1}=3(1-n)-2a_{n}$ という普通の2項間漸化式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$0\leqq a<1$ より $\left[a_{1}\right]=\left[a\right]=0$ である。仮定より $n=1,2,\dots,k-1$ で $a_{n}>a_{n+1}$ なので、(3) の後半を繰り返し使って`,
            },
            { k: "math", t: String.raw`\left[a_{n}\right]=\left[a_{1}\right]-\left(n-1\right)=1-n\qquad\left(1\leqq n\leqq k\right)` },
            { k: "p", t: String.raw`である。また (3) の前半より、$1\leqq n\leqq k-1$ で` },
            { k: "math", t: String.raw`a_{n+1}=3\left[a_{n}\right]-2a_{n}=3\left(1-n\right)-2a_{n}` },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`a_{n+1}+2a_{n}=3-3n\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`である。ガウス記号が消えたので、ふつうの漸化式として解ける。` },
            {
              k: "p",
              t: String.raw`**特殊解を探す。** 右辺が $n$ の1次式なので、$b_{n}=\lambda n+\mu$ が ① を満たすとしてみる。代入すると`,
            },
            {
              k: "math",
              t: String.raw`\lambda\left(n+1\right)+\mu+2\left(\lambda n+\mu\right)=3\lambda n+\lambda+3\mu`,
            },
            { k: "p", t: String.raw`で、これが $-3n+3$ に一致するには $3\lambda=-3$ と $\lambda+3\mu=3$、つまり` },
            { k: "math", t: String.raw`\lambda=-1,\qquad\mu=\frac{4}{3}` },
            { k: "p", t: String.raw`である。そこで $c_{n}=a_{n}-\left(-n+\tfrac43\right)$ とおくと、① から` },
            { k: "math", t: String.raw`c_{n+1}+2c_{n}=0,\qquad\text{すなわち}\quad c_{n+1}=-2c_{n}` },
            { k: "p", t: String.raw`となる。よって $c_{n}=c_{1}\left(-2\right)^{n-1}$ である。` },
            { k: "p", t: String.raw`**初期値。** $a_{1}=a$ より` },
            {
              k: "math",
              t: String.raw`c_{1}=a-\left(-1+\frac{4}{3}\right)=a-\frac{1}{3}=-\frac{1-3a}{3}`,
            },
            { k: "p", t: String.raw`である。したがって $1\leqq n\leqq k$ で` },
            {
              k: "math",
              t: String.raw`a_{n}=\frac{4}{3}-n-\frac{1-3a}{3}\left(-2\right)^{n-1}=\frac{4}{3}-n+\frac{\left(-2\right)^{n}}{6}\left(1-3a\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$-\tfrac13\left(-2\right)^{n-1}=\tfrac{\left(-2\right)^{n}}{6}$ を使った）。$n=k$ として`,
            },
            {
              k: "math",
              t: String.raw`a_{k}=\frac{4}{3}-k+\frac{\left(-2\right)^{k}}{6}\left(1-3a\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k=1$ を入れると $\tfrac43-1-\tfrac13\left(1-3a\right)=a$ で $a_{1}$ に戻り、$k=2$ では $\tfrac43-2+\tfrac23\left(1-3a\right)=-2a$ となって (1) の左側の線分 $y=-2x$ と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$\left[a_{n}\right]=1-n$ が言えるのは「減少が続いている $n$ の範囲」だけである。$a_{k}$ より先では (2) が働いて増加に転じうる。`,
            String.raw`$c_{n+1}=-2c_{n}$ の公比は $-2$ で、符号が交互に変わる。$(-2)^{n}$ を $2^{n}$ と書かない。`,
          ],
          check: String.raw`$a=\tfrac{3}{10}$ では減少が $\tfrac{3}{10}>-\tfrac35>-\tfrac95>-\tfrac{12}{5}$ と4項続き、式に $k=1,2,3,4$ を入れた値がこの4つと分数のまま完全に一致した。$a$ を $\tfrac{1}{1000}$ 刻みで動かしても反例はなかった。`,
        },
      ],
    },
  ],
};
