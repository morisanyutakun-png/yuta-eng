import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2024年度（令和6年度）一般選抜 前期日程 数学（理系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 6問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。第6問の図は、問題に付いている図ではなく、
 * 解くために自分で描いた円錐の展開図である。
 * 東北大学はこの年度の数学の問題を公開していないので、リンクも張らない。
 */

/** 第1問の図。$a=\tfrac12$ の例。 */
const A1T = 0.5;
const F1T = (x: number): number => x * x - 2 * A1T * x + 4 * A1T * A1T;

/** 第5問の図。$f(x)=\dfrac{\log(2x-3)}{x}$ と、$g(\alpha)=0$ をみたす $\alpha$。 */
const F5T = (x: number): number => Math.log(2 * x - 3) / x;
const AL5T = (() => {
  let lo = 2;
  let hi = 20;
  for (let i = 0; i < 200; i += 1) {
    const mid = (lo + hi) / 2;
    if (2 * mid - (2 * mid - 3) * Math.log(2 * mid - 3) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
})();

/** 第6問の展開図。母線 $\sqrt2$ の扇形に、$\mathrm{PR}=r(\theta)$ を極座標で描く。 */
const R6T = (th: number): number => Math.SQRT2 / (1 + Math.cos(th));
/** 底面の角 $\theta$ は、展開図では $\psi=\dfrac{\theta+\pi/2}{\sqrt2}$ に対応する。 */
const PSI6T = (th: number): number => (th + Math.PI / 2) / Math.SQRT2;
const ON6T = (th: number): [number, number] => [R6T(th) * Math.cos(PSI6T(th)), R6T(th) * Math.sin(PSI6T(th))];
const ARC6T = (th: number): [number, number] => [
  Math.SQRT2 * Math.cos(PSI6T(th)),
  Math.SQRT2 * Math.sin(PSI6T(th)),
];
const BAND6T: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i) => ON6T(-Math.PI / 2 + (Math.PI * i) / 40)),
  ...Array.from({ length: 41 }, (_, i) => ARC6T(Math.PI / 2 - (Math.PI * i) / 40)),
];

export const tohokuRikei2024: SolutionSet = {
  slug: "tohoku-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東北大学",
  short: "東北大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数・積分法",
      topics: ["放物線の頂点", "接線", "解と係数の関係", "面積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.25,0.5,1,2$ で頂点 $\\mathrm{A}(a,3a^{2})$、$p=4a$、$q=2a$ を確かめ、$\\mathrm{OP}$ の傾きが $3a$、$\\mathrm{OQ}$ の傾きが $f'(2a)=2a$ になることを確認した",
          "同じ $a$ で面積をシンプソン法で数値積分すると $\\dfrac{16a^{3}}{3}$ と小数10桁まで一致した",
          "$\\dfrac{16a^{3}}{3}=\\dfrac23$ を解くと $a=0.5$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a>0$、$f(x)=x^{2}-2ax+4a^{2}$ とし、$C\colon y=f(x)$ の頂点を $\mathrm{A}$、直線 $\mathrm{OA}$ と $C$ の交点のうち $\mathrm{A}$ と異なるものを $\mathrm{P}(p,f(p))$、原点 $\mathrm{O}$ から $C$ へ引いた接線の接点を $\mathrm{Q}(q,f(q))$（$q>0$）とするとき、$p,q$ を $a$ で表し、$p>q$ を示す`,
          answer: String.raw`$p=4a$、$q=2a$。$a>0$ より $4a>2a$`,
          approach: String.raw`頂点は平方完成で出る。$\mathrm{P}$ は「直線 $\mathrm{OA}$ と $C$ の連立」で、$x=a$（$\mathrm{A}$）が必ず解になるので因数分解できる。$\mathrm{Q}$ は「接線が原点を通る」を $q$ の方程式にする。`,
          blocks: [
            { k: "p", t: String.raw`**頂点。** 平方完成すると` },
            {
              k: "math",
              t: String.raw`f(x)=\left(x-a\right)^{2}+3a^{2}`,
            },
            { k: "p", t: String.raw`なので $\mathrm{A}\left(a,\ 3a^{2}\right)$ である。$a>0$ より直線 $\mathrm{OA}$ は` },
            { k: "math", t: String.raw`y=\frac{3a^{2}}{a}x=3ax` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$p$。** $C$ と連立して` },
            {
              k: "math",
              t: String.raw`x^{2}-2ax+4a^{2}=3ax,\qquad x^{2}-5ax+4a^{2}=0,\qquad\left(x-a\right)\left(x-4a\right)=0`,
            },
            { k: "p", t: String.raw`である。$x=a$ は $\mathrm{A}$ なので、$\mathrm{P}$ の $x$ 座標は` },
            { k: "math", t: String.raw`p=4a` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$q$。** $f'(x)=2x-2a$ なので、$x=q$ における接線は` },
            {
              k: "math",
              t: String.raw`y=\left(2q-2a\right)\left(x-q\right)+f(q)`,
            },
            { k: "p", t: String.raw`である。これが原点を通るから、$x=y=0$ を入れて` },
            {
              k: "math",
              t: String.raw`0=-q\left(2q-2a\right)+q^{2}-2aq+4a^{2}=-q^{2}+4a^{2}`,
            },
            { k: "p", t: String.raw`すなわち $q^{2}=4a^{2}$ である。$q>0$、$a>0$ だから` },
            { k: "math", t: String.raw`q=2a` },
            { k: "p", t: String.raw`である。$a>0$ より $p-q=4a-2a=2a>0$ なので $p>q$ である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\mathrm{Q}\left(2a,\ 4a^{2}\right)$、$\mathrm{P}\left(4a,\ 12a^{2}\right)$ である。$\mathrm{OQ}$ の傾きは $\dfrac{4a^{2}}{2a}=2a=f'(2a)$ で、確かに接している。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{A}$ は $C$ 上の点なので、直線 $\mathrm{OA}$ と $C$ の連立では $x=a$ が必ず解になる。これを使えば因数分解が見える。`,
            String.raw`接点を文字でおいて「接線が原点を通る」と立てる。原点から接線を引く問題の定石である。`,
          ],
          check: String.raw`$a=2$ では $\mathrm{A}(2,12)$、$\mathrm{P}(8,48)$、$\mathrm{Q}(4,16)$ で、$\mathrm{OP}$ の傾き $6=3a$、$\mathrm{OQ}$ の傾き $4=f'(4)$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$C$ の $q\leqq x\leqq p$ の部分、線分 $\mathrm{OP}$、線分 $\mathrm{OQ}$ で囲まれた図形の面積 $S$ を $a$ で表す`,
          answer: String.raw`$S=\dfrac{16a^{3}}{3}$`,
          approach: String.raw`$0\leqq x\leqq2a$ では上が $\mathrm{OP}$・下が $\mathrm{OQ}$、$2a\leqq x\leqq4a$ では上が $\mathrm{OP}$・下が $C$ になる。2つに分けて積分するだけ。後半は $\tfrac16$ 公式が使える形である。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1/2 のときの様子。放物線 C の頂点が A、直線 OA と C のもう1つの交点が P、原点から引いた接線の接点が Q。網かけが求める面積 S。",
                view: [-0.5, 2.8, -0.5, 3.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: (x: number) => 3 * A1T * x, bottom: (x: number) => 2 * A1T * x, from: 0, to: 2 * A1T },
                  { k: "fillBetween", top: (x: number) => 3 * A1T * x, bottom: F1T, from: 2 * A1T, to: 4 * A1T },
                  { k: "curve", f: F1T, from: -0.5, to: 2.188 },
                  { k: "seg", a: [0, 0], b: [4 * A1T, F1T(4 * A1T)] },
                  { k: "seg", a: [0, 0], b: [2 * A1T, F1T(2 * A1T)] },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [A1T, 3 * A1T * A1T], label: "A", place: "below-right" },
                  { k: "dot", at: [2 * A1T, F1T(2 * A1T)], label: "Q", place: "below-right" },
                  { k: "dot", at: [4 * A1T, F1T(4 * A1T)], label: "P", place: "above-left" },
                  { k: "text", at: [2.15, 3.4], label: "C", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`$\mathrm{OP}$ は $y=3ax$、$\mathrm{OQ}$ は $y=2ax$ である。まず上下を確かめる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$f(x)-2ax=x^{2}-4ax+4a^{2}=\left(x-2a\right)^{2}\geqq0$：$C$ は接線 $\mathrm{OQ}$ の上側（接点 $x=2a$ でのみ一致）`,
                String.raw`$f(x)-3ax=\left(x-a\right)\left(x-4a\right)$：$a\leqq x\leqq4a$ で $\leqq0$、つまり $C$ は直線 $\mathrm{OP}$ の下側`,
                String.raw`$3ax-2ax=ax\geqq0$（$x\geqq0$）：$\mathrm{OP}$ は $\mathrm{OQ}$ の上側`,
              ],
            },
            {
              k: "p",
              t: String.raw`したがって、求める図形は上の境界が $\mathrm{OP}$、下の境界が「$0\leqq x\leqq2a$ では $\mathrm{OQ}$、$2a\leqq x\leqq4a$ では $C$」である。`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{0}^{2a}\left(3ax-2ax\right)dx+\int_{2a}^{4a}\left\{3ax-f(x)\right\}dx`,
            },
            { k: "p", t: String.raw`**第1項。**` },
            {
              k: "math",
              t: String.raw`\int_{0}^{2a}ax\,dx=\frac{a\left(2a\right)^{2}}{2}=2a^{3}`,
            },
            { k: "p", t: String.raw`**第2項。** $3ax-f(x)=-\left(x-a\right)\left(x-4a\right)$ なので` },
            {
              k: "math",
              t: String.raw`\int_{2a}^{4a}\left(-x^{2}+5ax-4a^{2}\right)dx=\left[-\frac{x^{3}}{3}+\frac{5a}{2}x^{2}-4a^{2}x\right]_{2a}^{4a}`,
            },
            { k: "p", t: String.raw`である。$x=4a$ で $-\dfrac{64a^{3}}{3}+40a^{3}-16a^{3}=\dfrac{8a^{3}}{3}$、$x=2a$ で $-\dfrac{8a^{3}}{3}+10a^{3}-8a^{3}=-\dfrac{2a^{3}}{3}$ なので、差は $\dfrac{10a^{3}}{3}$ である。よって` },
            {
              k: "math",
              t: String.raw`S=2a^{3}+\frac{10a^{3}}{3}=\frac{16a^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`境界が $x=2a$ で切り替わる。$\mathrm{OQ}$ は接線なので $x>2a$ では $C$ より下に行き、下側の境界にならない。`,
            String.raw`$S$ が $a^{3}$ に比例するのは、図形が $a$ 倍の相似拡大で移り合うから。次元を見る検算になる。`,
          ],
          check: String.raw`$a=1$ で数値積分すると $5.3333333333$、$\dfrac{16}{3}=5.3333333333$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$S=\dfrac23$ となるときの $a$ の値を求める`,
          answer: String.raw`$a=\dfrac12$`,
          approach: String.raw`(2) の式に代入するだけ。$a>0$ なので3乗根は1つに決まる。`,
          blocks: [
            { k: "p", t: String.raw`(2) より` },
            {
              k: "math",
              t: String.raw`\frac{16a^{3}}{3}=\frac{2}{3},\qquad16a^{3}=2,\qquad a^{3}=\frac{1}{8}`,
            },
            { k: "p", t: String.raw`である。$a$ は実数なので $a=\dfrac12$ であり、これは $a>0$ を満たす。よって` },
            { k: "math", t: String.raw`a=\frac{1}{2}` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`$a=0.5$ で数値積分すると面積は $0.6666666667=\tfrac23$ だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "対数・不等式",
      topics: ["対数不等式", "差をとる", "底の変換", "整数解の絞り込み"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$t$ と $x$ を20万組ランダムにとり、条件 (a)(b) を満たすものすべてで $x+1>2\\log_{t}(x+1)$ が成り立った（反例 0 件）",
          "$n\\leqq2\\log_{2}n$ をみたす正の整数は $n=2,3,4$ だけだった（$n\\leqq199$ を全探索）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$t>1$ とし、正の実数 $x$ が (a) $x>\dfrac{1}{\sqrt{t}-1}$ と (b) $x\geqq2\log_{t}x$ をともに満たすとき、$x+1>2\log_{t}\left(x+1\right)$ を示す`,
          answer: String.raw`(a) は $t>\left(1+\tfrac1x\right)^{2}$ と同値で、これから $2\log_{t}\dfrac{x+1}{x}<1$。あとは (b) に足す`,
          approach: String.raw`示したい式と (b) の差をとると $1-2\log_{t}\dfrac{x+1}{x}$ になる。これが正であることが (a) そのものだ、と見抜くのがこの小問の芯である。`,
          blocks: [
            { k: "p", t: String.raw`**(a) の言い換え。** $t>1$ より $\sqrt{t}>1$ なので $\sqrt{t}-1>0$ である。(a) の両辺に $\sqrt{t}-1\ (>0)$ を掛けると` },
            {
              k: "math",
              t: String.raw`x\left(\sqrt{t}-1\right)>1,\qquad x\sqrt{t}>x+1,\qquad\sqrt{t}>\frac{x+1}{x}`,
            },
            {
              k: "p",
              t: String.raw`である（$x>0$）。両辺とも正なので2乗して`,
            },
            {
              k: "math",
              t: String.raw`t>\left(\frac{x+1}{x}\right)^{2}`,
            },
            { k: "p", t: String.raw`である。$t>1$ だから底 $t$ の対数をとると（$\log_{t}$ は増加関数）` },
            {
              k: "math",
              t: String.raw`1>2\log_{t}\frac{x+1}{x},\qquad\text{すなわち}\quad1-2\log_{t}\frac{x+1}{x}>0\qquad\cdots\text{①}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**仕上げ。** (b) は $x-2\log_{t}x\geqq0$ である。これに ① を足すと` },
            {
              k: "math",
              t: String.raw`\left(x-2\log_{t}x\right)+\left(1-2\log_{t}\frac{x+1}{x}\right)>0`,
            },
            { k: "p", t: String.raw`で、左辺の対数の部分は` },
            {
              k: "math",
              t: String.raw`2\log_{t}x+2\log_{t}\frac{x+1}{x}=2\log_{t}\left(x\cdot\frac{x+1}{x}\right)=2\log_{t}\left(x+1\right)`,
            },
            { k: "p", t: String.raw`とまとまるので` },
            {
              k: "math",
              t: String.raw`\left(x+1\right)-2\log_{t}\left(x+1\right)>0`,
            },
            { k: "p", t: String.raw`すなわち $x+1>2\log_{t}\left(x+1\right)$ である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$h(u)=u-2\log_{t}u$ とおくと、示したのは「$h(x)\geqq0$ かつ (a) ならば $h(x+1)>0$」である。差 $h(x+1)-h(x)=1-2\log_{t}\dfrac{x+1}{x}$ が (a) から正になる、という構図になっている。`,
            },
          ],
          pitfalls: [
            String.raw`(a) の分母は $\sqrt{t}-1$（$\sqrt{t-1}$ ではない）。$x\sqrt t>x+1$ と変形できる形になっている。`,
            String.raw`$\log_{t}$ が増加関数なのは $t>1$ だから。底が $1$ より小さければ不等号が逆になる。`,
          ],
          check: String.raw`$t$ と $x$ を20万組ランダムにとると、(a)(b) を満たすものすべてで結論が成り立った（反例 0 件）。`,
        },
        {
          label: "(2)",
          task: String.raw`$n\leqq2\log_{2}n$ を満たす正の整数 $n$ をすべて求める`,
          answer: String.raw`$n=2,\ 3,\ 4$`,
          approach: String.raw`小さい $n$ を直接調べ、$n\geqq5$ では成り立たないことを (1) の帰納法で示す。(1) を $t=2$ で使うと $\dfrac{1}{\sqrt2-1}=\sqrt2+1$ なので、$x\geqq3$ なら (a) が満たされる。`,
          blocks: [
            { k: "p", t: String.raw`**小さい $n$。** $\log_{2}1=0$、$\log_{2}2=1$、$\log_{2}4=2$ と、$1<\log_{2}3<2$ を使う。` },
            {
              k: "steps",
              items: [
                String.raw`$n=1$：$1\leqq0$ は偽`,
                String.raw`$n=2$：$2\leqq2$ は真`,
                String.raw`$n=3$：$2\log_{2}3=\log_{2}9>\log_{2}8=3$ なので真`,
                String.raw`$n=4$：$4\leqq4$ は真`,
                String.raw`$n=5$：$2\log_{2}5=\log_{2}25<\log_{2}32=5$ なので偽`,
              ],
            },
            { k: "p", t: String.raw`**$n\geqq5$ では成り立たない。** $t=2$ として (1) を使う。このとき` },
            {
              k: "math",
              t: String.raw`\frac{1}{\sqrt{2}-1}=\sqrt{2}+1=2.414\cdots`,
            },
            {
              k: "p",
              t: String.raw`なので、$x\geqq3$ ならば (a) $x>\sqrt2+1$ は満たされる。そこで「$n\geqq5$ のとき $n>2\log_{2}n$」を数学的帰納法で示す。`,
            },
            {
              k: "p",
              t: String.raw`$n=5$ のときは上で見たとおり $5>2\log_{2}5$ である。$n=k\ (\geqq5)$ で $k>2\log_{2}k$ が成り立つとすると、とくに $k\geqq2\log_{2}k$ であり、$k\geqq5>\sqrt2+1$ だから (1) の仮定 (a)(b) がともに成り立つ。よって`,
            },
            { k: "math", t: String.raw`k+1>2\log_{2}\left(k+1\right)` },
            {
              k: "p",
              t: String.raw`となり、$n=k+1$ でも成り立つ。したがって $n\geqq5$ のすべてで $n>2\log_{2}n$、つまり $n\leqq2\log_{2}n$ は成り立たない。`,
            },
            { k: "p", t: String.raw`以上より、求める $n$ は` },
            { k: "math", t: String.raw`n=2,\ 3,\ 4` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$n=3$ の判定は $2\log_{2}3$ と $3$ の比較。$\log_{2}9$ と $\log_{2}8$ を比べれば暗算でできる。`,
            String.raw`帰納法の出発点は $n=5$。$n=4$ では等号が成り立つので、そこから始めると「$>$」が言えない。`,
          ],
          check: String.raw`$n\leqq199$ を全探索すると、$n\leqq2\log_{2}n$ をみたすのは $2,3,4$ だけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率・数列",
      topics: ["状態を分ける漸化式", "うまい1次結合", "複素数の利用", "偏角と周期"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2$ から $8$ まで $2^{n}$ 通りの文字列を全列挙して $p_{n},q_{n},r_{n}$ を分数で求め、漸化式 $p_{n+1}=\\tfrac23q_{n}$、$q_{n+1}=\\tfrac23r_{n}$、$r_{n+1}=\\tfrac13(p_{n}+q_{n})$ と一致することを確かめた",
          "$p_{n}+2q_{n}+2r_{n}$ が $\\dfrac{2^{n}}{3^{n-1}}$ と完全に一致した（$n=2$〜$8$）",
          "$p_{n}+iq_{n}-(1+i)r_{n}$ が $\\dfrac{2}{3^{n}}\\left\\{-(1+i)\\right\\}^{n-2}$ と一致した（誤差 $10^{-17}$ 以下）",
          "$p_{n}=r_{n}$ となるのは $n=4,8,12,16,20$ だった（$n\\leqq20$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`A,A,B の3枚から1枚引いて戻す試行を $n$ 回行って文字列を作り、AAA か BB を含むものを不可、それ以外を可とする。可かつ右端2文字が AA である確率を $p_{n}$、可かつ右端2文字が BA である確率を $q_{n}$、可かつ右端の文字が B である確率を $r_{n}$ とするとき、$p_{2},q_{2},r_{2}$ と、$p_{n+1},q_{n+1},r_{n+1}$ を $p_{n},q_{n},r_{n}$ で表す`,
          answer: String.raw`$p_{2}=\dfrac49,\ q_{2}=\dfrac29,\ r_{2}=\dfrac29$。$p_{n+1}=\dfrac23q_{n},\ q_{n+1}=\dfrac23r_{n},\ r_{n+1}=\dfrac13\left(p_{n}+q_{n}\right)$`,
          approach: String.raw`1回の試行で A が出る確率は $\tfrac23$、B は $\tfrac13$。可な文字列の右端は「AA」「BA」「（最後が）B」の3通りに必ず分かれるので、この3つを状態と見て、1文字足したときどこへ移るかを調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**確率と状態。** A は2枚、B は1枚なので、1回の試行で A が出る確率は $\dfrac23$、B は $\dfrac13$ である。`,
            },
            {
              k: "p",
              t: String.raw`長さ $n\ (\geqq2)$ の可な文字列は、右端の様子で「AA で終わる」「BA で終わる」「B で終わる」の3つにちょうど分かれる（右端が A なら右から2文字目は A か B のどちらかで、AA か BA になる）。それぞれの確率が $p_{n},q_{n},r_{n}$ である。`,
            },
            { k: "p", t: String.raw`**$n=2$。** 長さ2の文字列は AA, AB, BA, BB で、確率は順に $\tfrac49,\tfrac29,\tfrac29,\tfrac19$ である。BB は不可、他は可なので` },
            {
              k: "math",
              t: String.raw`p_{2}=\frac{4}{9},\qquad q_{2}=\frac{2}{9},\qquad r_{2}=\frac{2}{9}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**1文字足す。** 可な文字列の右に1文字足すとき、新たに不可になるのは次の場合だけである。` },
            {
              k: "steps",
              items: [
                String.raw`AA で終わる文字列に A を足す：AAA ができるので不可`,
                String.raw`B で終わる文字列に B を足す：BB ができるので不可`,
              ],
            },
            { k: "p", t: String.raw`それ以外は可のままである。行き先を整理すると` },
            {
              k: "steps",
              items: [
                String.raw`AA に B を足す → 右端は B（確率 $\tfrac13$）`,
                String.raw`BA に A を足す → 右端2文字は AA（確率 $\tfrac23$）`,
                String.raw`BA に B を足す → 右端は B（確率 $\tfrac13$）`,
                String.raw`B に A を足す → 右端2文字は BA（確率 $\tfrac23$）`,
              ],
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac{2}{3}q_{n},\qquad q_{n+1}=\frac{2}{3}r_{n},\qquad r_{n+1}=\frac{1}{3}\left(p_{n}+q_{n}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=3$ では $p_{3}=\tfrac4{27}$、$q_{3}=\tfrac4{27}$、$r_{3}=\tfrac29$ になる。$p_{n}+q_{n}+r_{n}$ が「可である確率」である。`,
            },
          ],
          pitfalls: [
            String.raw`「B で終わる」は右から2文字目を問わない。AA, BA の2状態と合わせてちょうど場合が尽きる。`,
            String.raw`$p_{n+1}$ に「B で終わる文字列に A を足す」は入らない。それは BA で終わるので $q_{n+1}$ に入る。`,
          ],
          check: String.raw`$n=2$ から $8$ まで全列挙して求めた $p_{n},q_{n},r_{n}$ が、この漸化式から計算した値と完全に一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$p_{n}+2q_{n}+2r_{n}$ を $n$ で表す`,
          answer: String.raw`$p_{n}+2q_{n}+2r_{n}=\dfrac{2^{n}}{3^{n-1}}$`,
          approach: String.raw`$p_{n}+2q_{n}+2r_{n}$ を漸化式に通すと、同じ $1:2:2$ の組み合わせがそのまま $\tfrac23$ 倍で出てくる。等比数列になる。`,
          blocks: [
            { k: "p", t: String.raw`$u_{n}=p_{n}+2q_{n}+2r_{n}$ とおく。(1) の漸化式を代入すると` },
            {
              k: "math",
              t: String.raw`u_{n+1}=\frac{2}{3}q_{n}+2\cdot\frac{2}{3}r_{n}+2\cdot\frac{1}{3}\left(p_{n}+q_{n}\right)=\frac{2}{3}p_{n}+\frac{4}{3}q_{n}+\frac{4}{3}r_{n}`,
            },
            { k: "p", t: String.raw`である。これは` },
            {
              k: "math",
              t: String.raw`\frac{2}{3}\left(p_{n}+2q_{n}+2r_{n}\right)=\frac{2}{3}u_{n}`,
            },
            { k: "p", t: String.raw`にほかならない。よって $\left\{u_{n}\right\}$ は公比 $\dfrac23$ の等比数列である。初項は` },
            {
              k: "math",
              t: String.raw`u_{2}=\frac{4}{9}+2\cdot\frac{2}{9}+2\cdot\frac{2}{9}=\frac{12}{9}=\frac{4}{3}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`u_{n}=\frac{4}{3}\left(\frac{2}{3}\right)^{n-2}=\frac{2^{n}}{3^{n-1}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{4}{3}\left(\dfrac23\right)^{n-2}=\dfrac{2^{2}}{3}\cdot\dfrac{2^{n-2}}{3^{n-2}}=\dfrac{2^{n}}{3^{n-1}}$ である。$n=2$ で $\tfrac43$、$n=3$ で $\tfrac89$ となり、(1) の値と合う。`,
            },
          ],
          pitfalls: [
            String.raw`$1:2:2$ という係数は偶然ではなく、漸化式の行列の固有ベクトルにあたる。問題文が与えてくれているので、代入して確かめるだけでよい。`,
          ],
          check: String.raw`全列挙で求めた $p_{n}+2q_{n}+2r_{n}$ が $n=2$〜$8$ で $\dfrac{2^{n}}{3^{n-1}}$ と完全に一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$p_{n}+iq_{n}-\left(1+i\right)r_{n}$ を $n$ で表す（$i$ は虚数単位）`,
          answer: String.raw`$p_{n}+iq_{n}-\left(1+i\right)r_{n}=\dfrac{2}{3^{n}}\left\{-\left(1+i\right)\right\}^{n-2}$`,
          approach: String.raw`(2) と同じことを複素係数でやる。代入すると全体が $-\dfrac{1+i}{3}$ 倍になるので、やはり等比数列である。`,
          blocks: [
            { k: "p", t: String.raw`$v_{n}=p_{n}+iq_{n}-\left(1+i\right)r_{n}$ とおく。(1) の漸化式を代入すると` },
            {
              k: "math",
              t: String.raw`v_{n+1}=\frac{2}{3}q_{n}+i\cdot\frac{2}{3}r_{n}-\left(1+i\right)\cdot\frac{1}{3}\left(p_{n}+q_{n}\right)`,
            },
            { k: "p", t: String.raw`で、$p_{n},q_{n},r_{n}$ について整理すると` },
            {
              k: "math",
              t: String.raw`v_{n+1}=-\frac{1+i}{3}p_{n}+\frac{1-i}{3}q_{n}+\frac{2i}{3}r_{n}`,
            },
            { k: "p", t: String.raw`である（$q_{n}$ の係数は $\dfrac23-\dfrac{1+i}{3}=\dfrac{1-i}{3}$）。ここで $\lambda=-\dfrac{1+i}{3}$ とおくと` },
            {
              k: "math",
              t: String.raw`\lambda i=-\frac{\left(1+i\right)i}{3}=-\frac{i-1}{3}=\frac{1-i}{3},\qquad-\lambda\left(1+i\right)=\frac{\left(1+i\right)^{2}}{3}=\frac{2i}{3}`,
            },
            { k: "p", t: String.raw`なので、上の式は` },
            {
              k: "math",
              t: String.raw`v_{n+1}=\lambda\left\{p_{n}+iq_{n}-\left(1+i\right)r_{n}\right\}=\lambda v_{n}`,
            },
            { k: "p", t: String.raw`と書ける。すなわち $\left\{v_{n}\right\}$ は公比 $-\dfrac{1+i}{3}$ の等比数列である。初項は` },
            {
              k: "math",
              t: String.raw`v_{2}=\frac{4}{9}+i\cdot\frac{2}{9}-\left(1+i\right)\frac{2}{9}=\frac{4-2}{9}+\frac{2-2}{9}i=\frac{2}{9}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`v_{n}=\frac{2}{9}\left(-\frac{1+i}{3}\right)^{n-2}=\frac{2}{3^{n}}\left\{-\left(1+i\right)\right\}^{n-2}`,
            },
            { k: "p", t: String.raw`である（$\dfrac{2}{9}\cdot\dfrac{1}{3^{n-2}}=\dfrac{2}{3^{n}}$）。` },
            {
              k: "note",
              t: String.raw`$n=3$ では $-\dfrac{2\left(1+i\right)}{27}$ となり、$p_{3}+iq_{3}-\left(1+i\right)r_{3}=\dfrac{4+4i-6-6i}{27}=\dfrac{-2-2i}{27}$ と合う。`,
            },
          ],
          pitfalls: [
            String.raw`係数 $1,\ i,\ -\left(1+i\right)$ も問題が与えてくれている。代入して $\lambda$ を見つけるだけでよく、自分で固有値を探す必要はない。`,
            String.raw`$\left(1+i\right)^{2}=2i$ を使うと $r_{n}$ の係数が合う。複素数の計算をていねいに。`,
          ],
          check: String.raw`全列挙で求めた $v_{n}$ とこの式の差は $n=2$〜$9$ で $10^{-17}$ 以下だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$p_{n}=r_{n}$ を満たすための $n$ の必要十分条件を求める`,
          answer: String.raw`$n$ が $4$ の倍数であること`,
          approach: String.raw`(3) の $v_{n}$ の実部がちょうど $p_{n}-r_{n}$ である。$-\left(1+i\right)$ を極形式にすると偏角が $\tfrac{5\pi}{4}$ なので、実部が $0$ になる $n$ は偏角の条件で決まる。`,
          blocks: [
            { k: "p", t: String.raw`$p_{n},q_{n},r_{n}$ は実数なので、(3) の $v_{n}$ を実部と虚部に分けると` },
            {
              k: "math",
              t: String.raw`v_{n}=\left(p_{n}-r_{n}\right)+\left(q_{n}-r_{n}\right)i`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`p_{n}=r_{n}\quad\Longleftrightarrow\quad\operatorname{Re}v_{n}=0`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**極形式。** $-\left(1+i\right)=-1-i$ は、大きさが $\sqrt2$、偏角が $\dfrac{5\pi}{4}$（第3象限）なので` },
            {
              k: "math",
              t: String.raw`-\left(1+i\right)=\sqrt{2}\left(\cos\frac{5\pi}{4}+i\sin\frac{5\pi}{4}\right)`,
            },
            { k: "p", t: String.raw`である。ド・モアブルの定理から` },
            {
              k: "math",
              t: String.raw`\left\{-\left(1+i\right)\right\}^{n-2}=\left(\sqrt{2}\right)^{n-2}\left\{\cos\frac{5\left(n-2\right)\pi}{4}+i\sin\frac{5\left(n-2\right)\pi}{4}\right\}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\operatorname{Re}v_{n}=\frac{2\left(\sqrt{2}\right)^{n-2}}{3^{n}}\cos\frac{5\left(n-2\right)\pi}{4}`,
            },
            { k: "p", t: String.raw`である。係数は $0$ でないから` },
            {
              k: "math",
              t: String.raw`p_{n}=r_{n}\quad\Longleftrightarrow\quad\cos\frac{5\left(n-2\right)\pi}{4}=0`,
            },
            { k: "p", t: String.raw`である。$\cos\theta=0$ は $\theta=\dfrac{\pi}{2}+k\pi$（$k$ は整数）なので` },
            {
              k: "math",
              t: String.raw`\frac{5\left(n-2\right)}{4}=\frac{1}{2}+k,\qquad5\left(n-2\right)=2+4k`,
            },
            {
              k: "p",
              t: String.raw`すなわち $5\left(n-2\right)\equiv2\pmod4$ である。$5\equiv1\pmod4$ だから、これは $n-2\equiv2\pmod4$、つまり`,
            },
            { k: "math", t: String.raw`n\equiv0\pmod4` },
            { k: "p", t: String.raw`と同値である。よって求める必要十分条件は` },
            { k: "math", t: String.raw`n\ \text{が}\ 4\ \text{の倍数であること}` },
            {
              k: "p",
              t: String.raw`である（$n\geqq2$ という条件のもとで、$n=4,8,12,\dots$）。`,
            },
            {
              k: "note",
              t: String.raw`実際 $p_{4}=r_{4}=\dfrac{8}{81}$、$p_{8}=r_{8}=\dfrac{160}{6561}$ である。(2) の実数の等比数列だけでは $p_{n}$ と $r_{n}$ を分離できず、(3) の複素数の等比数列が「差 $p_{n}-r_{n}$」を取り出す道具になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(\sqrt2\right)^{n-2}$ などの係数は決して $0$ にならないので、条件は $\cos$ の部分だけで決まる。`,
            String.raw`$5\left(n-2\right)\equiv2\pmod4$ を解くとき、$5\equiv1$ を使って $n-2\equiv2$ にする。`,
          ],
          check: String.raw`漸化式を $n=20$ まで分数で回すと、$p_{n}=r_{n}$ になったのは $n=4,8,12,16,20$ だけだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間図形",
      topics: ["2球面の交わり", "交円の中心と半径", "平面に平行な単位ベクトル", "座標の最大最小"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left|\\mathrm{P}_{1}\\mathrm{P}_{2}\\right|=3$、$\\left|\\sqrt5-\\sqrt2\\right|=0.8219<3<\\sqrt5+\\sqrt2=3.6503$ で2球面は交わる",
          "$\\mathrm{P}_{1}$ から交円の平面までの距離が $2$、交円の半径が $1$、$\\mathrm{P}_{3}=\\left(\\tfrac{13}{3},-\\tfrac13,-\\tfrac13\\right)$ になった",
          "$\\mathrm{Q}=\\left(\\tfrac{65-4\\sqrt5}{15},\\ \\tfrac{-5-2\\sqrt5}{15},\\ -\\tfrac{1+\\sqrt5}{3}\\right)$ は $S_{1},S_{2}$ の両方の上にあり（誤差 $10^{-16}$）、$\\left|z\\right|=1.078689326=\\tfrac{1+\\sqrt5}{3}$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}_{1}(3,-1,1)$ を中心とする半径 $\sqrt5$ の球面 $S_{1}$、$\mathrm{P}_{2}(5,0,-1)$ を中心とする半径 $\sqrt2$ の球面 $S_{2}$ について、線分 $\mathrm{P}_{1}\mathrm{P}_{2}$ の長さを求める`,
          answer: String.raw`$3$`,
          approach: String.raw`座標の差をとって2乗和の平方根をとるだけ。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{P}_{1}\mathrm{P}_{2}}=\left(2,1,-2\right)$ なので` },
            {
              k: "math",
              t: String.raw`\left|\mathrm{P}_{1}\mathrm{P}_{2}\right|=\sqrt{2^{2}+1^{2}+\left(-2\right)^{2}}=\sqrt{9}=3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(2,1,-2\right)$ は長さ $3$ のきれいなベクトルで、以降この方向が交円の平面の法線になる。`,
            },
          ],
          check: String.raw`数値でも $3.0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$S_{1}$ と $S_{2}$ が交わりをもつことを示し、交わりの円 $C$ の半径と中心 $\mathrm{P}_{3}$ の座標を求める`,
          answer: String.raw`半径 $1$、$\mathrm{P}_{3}\left(\dfrac{13}{3},\ -\dfrac13,\ -\dfrac13\right)$`,
          approach: String.raw`中心間距離 $d$ と2つの半径で「$\left|r_{1}-r_{2}\right|<d<r_{1}+r_{2}$」を確かめれば交わる。交円の平面は2式の差をとれば出るので、$\mathrm{P}_{1}$ からの距離を測って半径が決まる。`,
          blocks: [
            { k: "p", t: String.raw`**交わること。** $r_{1}=\sqrt5$、$r_{2}=\sqrt2$、$d=3$ である。` },
            {
              k: "math",
              t: String.raw`\left|r_{1}-r_{2}\right|=\sqrt{5}-\sqrt{2}=0.82\cdots,\qquad r_{1}+r_{2}=\sqrt{5}+\sqrt{2}=3.65\cdots`,
            },
            {
              k: "p",
              t: String.raw`で $\left|r_{1}-r_{2}\right|<3<r_{1}+r_{2}$ だから、2球面は交わる（根号のまま示すなら、$\sqrt5-\sqrt2<3$ は明らか、$3<\sqrt5+\sqrt2$ は両辺2乗して $9<7+2\sqrt{10}$、すなわち $1<\sqrt{10}$ から従う）。$\blacksquare$`,
            },
            { k: "p", t: String.raw`**交円の平面。** 2球面の方程式は` },
            {
              k: "math",
              t: String.raw`\left(x-3\right)^{2}+\left(y+1\right)^{2}+\left(z-1\right)^{2}=5,\qquad\left(x-5\right)^{2}+y^{2}+\left(z+1\right)^{2}=2`,
            },
            { k: "p", t: String.raw`である。辺々引くと2次の項が消えて` },
            {
              k: "math",
              t: String.raw`4x+2y-4z-\left(11-26\right)=3,\qquad\text{整理して}\quad4x+2y-4z=18`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`2x+y-2z=9\qquad\cdots\text{①}` },
            {
              k: "p",
              t: String.raw`である。これが $C$ を含む平面 $H$ で、法線ベクトルは $\overrightarrow{\mathrm{P}_{1}\mathrm{P}_{2}}=\left(2,1,-2\right)$ である。`,
            },
            { k: "p", t: String.raw`**中心と半径。** $\mathrm{P}_{1}$ から $H$ までの距離は` },
            {
              k: "math",
              t: String.raw`\frac{\left|2\cdot3+\left(-1\right)-2\cdot1-9\right|}{\sqrt{2^{2}+1^{2}+\left(-2\right)^{2}}}=\frac{\left|-6\right|}{3}=2`,
            },
            { k: "p", t: String.raw`である。$\mathrm{P}_{3}$ は $\mathrm{P}_{1}$ から $H$ に下ろした垂線の足なので、単位法線 $\dfrac13\left(2,1,-2\right)$ を使って` },
            {
              k: "math",
              t: String.raw`\mathrm{P}_{3}=\mathrm{P}_{1}+2\cdot\frac{1}{3}\left(2,1,-2\right)=\left(3+\frac43,\ -1+\frac23,\ 1-\frac43\right)=\left(\frac{13}{3},\ -\frac13,\ -\frac13\right)`,
            },
            { k: "p", t: String.raw`である（向きは $\mathrm{P}_{2}$ 側。実際 ① に代入すると $\tfrac{26}3-\tfrac13+\tfrac23=9$ で平面上にある）。半径は三平方の定理から` },
            {
              k: "math",
              t: String.raw`\sqrt{r_{1}^{2}-2^{2}}=\sqrt{5-4}=1`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`2つの球面の方程式を引き算すると平面の式になる（根軸の3次元版）。これが交円を含む平面である。`,
            String.raw`$\mathrm{P}_{3}$ は $\mathrm{P}_{1}$ と $\mathrm{P}_{2}$ を結ぶ線分上にある。$\mathrm{P}_{1}$ からの距離 $2$ を単位法線にかけて足す。`,
          ],
          check: String.raw`$\mathrm{P}_{3}=\left(4.3333,-0.3333,-0.3333\right)$ で、$\mathrm{P}_{1}$ からの距離は $2$、$\sqrt{5-4}=1$ が半径だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$C$ を含む平面を $H$ とするとき、$xy$ 平面と $H$ の両方に平行で大きさが $1$ のベクトルをすべて求める`,
          answer: String.raw`$\pm\left(\dfrac{\sqrt5}{5},\ -\dfrac{2\sqrt5}{5},\ 0\right)$`,
          approach: String.raw`「$xy$ 平面に平行」は $z$ 成分が $0$、「$H$ に平行」は法線と垂直。2本の条件で方向が決まり、大きさ $1$ で符号ちがいの2つになる。`,
          blocks: [
            { k: "p", t: String.raw`求めるベクトルを $\vec{v}=\left(a,b,c\right)$ とする。` },
            {
              k: "steps",
              items: [
                String.raw`$xy$ 平面に平行：$c=0$`,
                String.raw`$H$ に平行：法線 $\left(2,1,-2\right)$ と垂直なので $2a+b-2c=0$`,
                String.raw`大きさ $1$：$a^{2}+b^{2}+c^{2}=1$`,
              ],
            },
            { k: "p", t: String.raw`である。$c=0$ を2番目に入れて $b=-2a$、3番目に入れて` },
            {
              k: "math",
              t: String.raw`a^{2}+4a^{2}=1,\qquad a=\pm\frac{1}{\sqrt{5}}=\pm\frac{\sqrt{5}}{5}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\vec{v}=\pm\left(\frac{\sqrt{5}}{5},\ -\frac{2\sqrt{5}}{5},\ 0\right)`,
            },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "note",
              t: String.raw`この方向は $H$ と $xy$ 平面の交線の方向でもある。(4) では、これと垂直な「$H$ 内でいちばん $z$ が変わる方向」が主役になる。`,
            },
          ],
          pitfalls: [
            String.raw`「平面に平行」は「法線と垂直」。法線と平行ではない。`,
            String.raw`答えは2つ（向きが逆）。「すべて求めよ」なので $\pm$ を落とさない。`,
          ],
          check: String.raw`$\vec{v}=\left(0.4472,-0.8944,0\right)$ は大きさ $1$ で、$\left(2,1,-2\right)$ との内積が $0$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`点 $\mathrm{Q}$ が $C$ 上を動くとき、$\mathrm{Q}$ と $xy$ 平面の距離 $d$ の最大値と、それを与える $\mathrm{Q}$ の座標を求める`,
          answer: String.raw`最大値 $\dfrac{1+\sqrt{5}}{3}$、$\mathrm{Q}\left(\dfrac{65-4\sqrt{5}}{15},\ \dfrac{-5-2\sqrt{5}}{15},\ -\dfrac{1+\sqrt{5}}{3}\right)$`,
          approach: String.raw`$d=\left|z\right|$ なので、$C$ 上で $z$ 座標がどこまで動くかを調べる。$C$ の中心 $\mathrm{P}_{3}$ から見て、$z$ がいちばん変わるのは「$\vec{e}_{z}$ を平面 $H$ に正射影した向き」である。その向きの単位ベクトルを作れば、両端の $z$ がすぐ出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{Q}$ と $xy$ 平面の距離は $\left|z\right|$（$z$ は $\mathrm{Q}$ の $z$ 座標）である。$C$ は中心 $\mathrm{P}_{3}\left(\tfrac{13}3,-\tfrac13,-\tfrac13\right)$、半径 $1$、法線 $\vec{n}=\tfrac13\left(2,1,-2\right)$（単位ベクトル）の円である。`,
            },
            {
              k: "p",
              t: String.raw`**$z$ がいちばん変わる向き。** $\vec{e}_{z}=\left(0,0,1\right)$ を平面 $H$ に正射影すると`,
            },
            {
              k: "math",
              t: String.raw`\vec{w}=\vec{e}_{z}-\left(\vec{e}_{z}\cdot\vec{n}\right)\vec{n}=\left(0,0,1\right)-\left(-\frac23\right)\cdot\frac13\left(2,1,-2\right)=\left(\frac49,\ \frac29,\ \frac59\right)`,
            },
            { k: "p", t: String.raw`で、その大きさは` },
            {
              k: "math",
              t: String.raw`\left|\vec{w}\right|=\frac{\sqrt{16+4+25}}{9}=\frac{\sqrt{45}}{9}=\frac{\sqrt{5}}{3}`,
            },
            { k: "p", t: String.raw`である。$C$ 上の点は、$\vec{w}$ 方向の単位ベクトル $\vec{u}=\dfrac{\vec{w}}{\left|\vec{w}\right|}$ とそれに垂直な単位ベクトル $\vec{u}'$（ともに $H$ 内）を使って` },
            {
              k: "math",
              t: String.raw`\mathrm{Q}=\mathrm{P}_{3}+\cos\varphi\,\vec{u}+\sin\varphi\,\vec{u}'`,
            },
            {
              k: "p",
              t: String.raw`と書ける。$\vec{u}'$ は $\vec{w}$ と垂直で $H$ 内にあるから $\vec{u}'\cdot\vec{e}_{z}=0$、つまり $z$ 成分は $0$ である。一方 $\vec{u}$ の $z$ 成分は $\dfrac{\vec{w}\cdot\vec{e}_{z}}{\left|\vec{w}\right|}=\left|\vec{w}\right|=\dfrac{\sqrt5}{3}$ である。よって $\mathrm{Q}$ の $z$ 座標は`,
            },
            {
              k: "math",
              t: String.raw`z=-\frac13+\frac{\sqrt{5}}{3}\cos\varphi`,
            },
            { k: "p", t: String.raw`となり、$-\dfrac{1+\sqrt5}{3}\leqq z\leqq\dfrac{-1+\sqrt5}{3}$ の範囲を動く。両端の絶対値は` },
            {
              k: "math",
              t: String.raw`\frac{1+\sqrt{5}}{3}=1.078\cdots,\qquad\frac{\sqrt{5}-1}{3}=0.412\cdots`,
            },
            { k: "p", t: String.raw`なので、$d=\left|z\right|$ の最大値は` },
            { k: "math", t: String.raw`\frac{1+\sqrt{5}}{3}` },
            { k: "p", t: String.raw`である。これは $\cos\varphi=-1$、すなわち $\mathrm{Q}=\mathrm{P}_{3}-\vec{u}$ のときで` },
            {
              k: "math",
              t: String.raw`\vec{u}=\frac{3}{\sqrt{5}}\left(\frac49,\frac29,\frac59\right)=\frac{1}{3\sqrt{5}}\left(4,2,5\right)=\left(\frac{4\sqrt{5}}{15},\ \frac{2\sqrt{5}}{15},\ \frac{\sqrt{5}}{3}\right)`,
            },
            { k: "p", t: String.raw`だから` },
            {
              k: "math",
              t: String.raw`\mathrm{Q}=\left(\frac{13}{3}-\frac{4\sqrt{5}}{15},\ -\frac13-\frac{2\sqrt{5}}{15},\ -\frac13-\frac{\sqrt{5}}{3}\right)=\left(\frac{65-4\sqrt{5}}{15},\ \frac{-5-2\sqrt{5}}{15},\ -\frac{1+\sqrt{5}}{3}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\vec{u}$ の $z$ 成分が $\left|\vec{w}\right|$ に等しいのは、正射影の作り方からの一般的な事実である。$\left|\vec{w}\right|^{2}=1-\left(\vec{e}_{z}\cdot\vec{n}\right)^{2}=1-\dfrac49=\dfrac59$ と計算してもよい。`,
            },
          ],
          pitfalls: [
            String.raw`$d$ は $z$ ではなく $\left|z\right|$。$z$ の動く範囲が $0$ をまたぐので、両端の絶対値を比べる。`,
            String.raw`$z$ の振れ幅は半径 $1$ そのものではなく、$\left|\vec{w}\right|=\dfrac{\sqrt5}{3}$ 倍になる。平面が $xy$ 平面に対して傾いているぶんだけ縮む。`,
          ],
          check: String.raw`求めた $\mathrm{Q}$ は $\mathrm{P}_{1}$ からの距離が $\sqrt5$、$\mathrm{P}_{2}$ からの距離が $\sqrt2$ で、$\left|z\right|=1.078689326=\dfrac{1+\sqrt5}{3}$ だった。`,
        },
      ],
    },
    {
      no: 5,
      field: "微分法",
      topics: ["商の微分", "中間値の定理", "グラフの概形", "指数の等式の整数解"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$g(x)=2x-(2x-3)\\log(2x-3)$ の零点を2分法で求めると $\\alpha=3.985312880$ で、$f(\\alpha)=0.402363826=\\dfrac{2}{2\\alpha-3}$ だった",
          "$g(2)=4>0$、$g'(x)=-2\\log(2x-3)$ なので $x>2$ で減少することを確認した",
          "$2\\leqq m<n\\leqq59$ を全探索すると $(2m-3)^{n}=(2n-3)^{m}$ をみたすのは $(m,n)=(3,6)$ だけだった",
          "$f(3)=f(6)=0.366204096$、$f(4)=0.402359478$、$f(5)=0.389182030$、$f(7)=0.342556468$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x\geqq2$ で $f(x)=\dfrac{\log\left(2x-3\right)}{x}$ とするとき、$f'(x)=\dfrac{g(x)}{x^{2}\left(2x-3\right)}$ となる $g(x)$ を求める`,
          answer: String.raw`$g(x)=2x-\left(2x-3\right)\log\left(2x-3\right)$`,
          approach: String.raw`商の微分をして、分母を $x^{2}\left(2x-3\right)$ の形にそろえる。`,
          blocks: [
            { k: "p", t: String.raw`商の微分法から` },
            {
              k: "math",
              t: String.raw`f'(x)=\frac{\dfrac{2}{2x-3}\cdot x-\log\left(2x-3\right)}{x^{2}}`,
            },
            { k: "p", t: String.raw`である。分子・分母に $2x-3$ を掛けて` },
            {
              k: "math",
              t: String.raw`f'(x)=\frac{2x-\left(2x-3\right)\log\left(2x-3\right)}{x^{2}\left(2x-3\right)}`,
            },
            { k: "p", t: String.raw`となるので` },
            {
              k: "math",
              t: String.raw`g(x)=2x-\left(2x-3\right)\log\left(2x-3\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$x\geqq2$ では $2x-3\geqq1>0$ なので、$\log\left(2x-3\right)$ も分母 $x^{2}\left(2x-3\right)$ も問題なく定義される。`,
          ],
          check: String.raw`$x=3$ で $f'(3)$ を数値微分すると $g(3)/\left(9\cdot3\right)$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$g(\alpha)=0$ を満たす $2$ 以上の実数 $\alpha$ がただ1つ存在することを示す`,
          answer: String.raw`$g'(x)=-2\log\left(2x-3\right)$ より $g$ は $x\geqq2$ で減少、$g(2)=4>0$、$x$ を大きくすると $g<0$`,
          approach: String.raw`$g$ を微分すると $\log$ だけが残り、符号がすぐ分かる。あとは両端の符号を押さえて中間値の定理を使う。`,
          blocks: [
            { k: "p", t: String.raw`**単調性。** 積の微分から` },
            {
              k: "math",
              t: String.raw`g'(x)=2-\left\{2\log\left(2x-3\right)+\left(2x-3\right)\cdot\frac{2}{2x-3}\right\}=-2\log\left(2x-3\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$x>2$ では $2x-3>1$ なので $\log\left(2x-3\right)>0$、よって $g'(x)<0$ である。つまり $g$ は $x\geqq2$ で狭義単調減少である。`,
            },
            { k: "p", t: String.raw`**両端の符号。** $g(2)=4-1\cdot\log1=4>0$ である。一方、$2x-3\geqq e^{2}$ となる $x$（たとえば $x=\dfrac{e^{2}+3}{2}$ 以上）では $\log\left(2x-3\right)\geqq2$ なので` },
            {
              k: "math",
              t: String.raw`g(x)\leqq2x-2\left(2x-3\right)=-2x+6`,
            },
            {
              k: "p",
              t: String.raw`である。$e<3$ より $\dfrac{e^{2}+3}{2}<6$ なので、たとえば $x=6$ をとれば $2x-3=9>e^{2}$（$e<3$ より $e^{2}<9$）で、$g(6)\leqq-6<0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**結論。** $g$ は $\left[2,6\right]$ で連続、$g(2)>0>g(6)$ なので中間値の定理よりこの区間に零点がある。また $g$ は $x\geqq2$ で狭義単調減少なので零点は高々1つである。よって $g(\alpha)=0$ となる $2$ 以上の実数 $\alpha$ はただ1つ存在する。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$y=2x-3$ とおくと $g=0$ は $\log y=1+\dfrac3y$ と書ける。数値では $y=4.9706\cdots$、$\alpha=3.9853\cdots$ で、$\alpha$ は $4$ のすぐ下にある。(4) で $4$ と $\alpha$ の大小が効く。`,
            },
          ],
          pitfalls: [
            String.raw`$g'$ の計算で $\left(2x-3\right)\cdot\dfrac{2}{2x-3}=2$ がちょうど $+2$ を打ち消す。ここがきれいに決まる。`,
            String.raw`「ただ1つ」には存在（中間値の定理）と一意性（単調性）の両方が要る。`,
          ],
          check: String.raw`2分法で解くと $\alpha=3.985312880$、$g(\alpha)=-8.9\times10^{-16}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$f(x)$（$x\geqq2$）の増減と $\displaystyle\lim_{x\to\infty}f(x)$ を調べ、$y=f(x)$ のグラフの概形を描く`,
          answer: String.raw`$2\leqq x<\alpha$ で増加、$x>\alpha$ で減少。最大値 $f(\alpha)=\dfrac{2}{2\alpha-3}$、$\displaystyle\lim_{x\to\infty}f(x)=0$`,
          approach: String.raw`(1)(2) から $f'$ の符号は $g$ の符号と同じで、$\alpha$ の前後で正から負に変わる。極大値は $g(\alpha)=0$ を使うと根号も $\log$ も残らない形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**増減。** $x\geqq2$ では $x^{2}\left(2x-3\right)>0$ なので、$f'$ の符号は $g$ の符号と一致する。(2) より $g$ は減少して $\alpha$ で $0$ になるから`,
            },
            {
              k: "steps",
              items: [
                String.raw`$2\leqq x<\alpha$：$g>0$ なので $f'>0$、$f$ は増加`,
                String.raw`$x=\alpha$：$f'=0$`,
                String.raw`$x>\alpha$：$g<0$ なので $f'<0$、$f$ は減少`,
              ],
            },
            { k: "p", t: String.raw`である。よって $f$ は $x=\alpha$ で最大になる。` },
            { k: "p", t: String.raw`**最大値。** $g(\alpha)=0$ は $2\alpha=\left(2\alpha-3\right)\log\left(2\alpha-3\right)$、すなわち` },
            {
              k: "math",
              t: String.raw`\log\left(2\alpha-3\right)=\frac{2\alpha}{2\alpha-3}`,
            },
            { k: "p", t: String.raw`である。これを $f$ に入れると` },
            {
              k: "math",
              t: String.raw`f(\alpha)=\frac{1}{\alpha}\cdot\frac{2\alpha}{2\alpha-3}=\frac{2}{2\alpha-3}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**極限と端点。** $f(2)=\dfrac{\log1}{2}=0$ である。また $t=2x-3\to\infty$ とすると` },
            {
              k: "math",
              t: String.raw`f(x)=\frac{\log t}{\frac{t+3}{2}}=\frac{2}{t+3}\log t=\frac{2t}{t+3}\cdot\frac{\log t}{t}\longrightarrow2\cdot0=0`,
            },
            { k: "p", t: String.raw`なので $\displaystyle\lim_{x\to\infty}f(x)=0$ である。$x>2$ では $\log\left(2x-3\right)>0$ だから $f>0$ である。概形は次のようになる。` },
            {
              k: "figure",
              fig: {
                caption:
                  "y = f(x) = log(2x-3)/x （x ≧ 2）の概形。(2, 0) から増加して x = α（≒3.985）で最大値 2/(2α-3) をとり、その後は減少して 0 に近づく。縦方向は横方向より大きく拡大してある。",
                view: [1.6, 14, -0.05, 0.55],
                step: { x: 2, y: 0.1 },
                items: [
                  { k: "curve", f: F5T, from: 2, to: 14 },
                  { k: "dot", at: [2, 0], label: "(2, 0)", place: "below-right" },
                  { k: "dot", at: [AL5T, F5T(AL5T)], label: "最大 (α, 2/(2α-3))", place: "above-right" },
                  { k: "text", at: [13.5, 0.23], label: "y = f(x)", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`最大値は $\dfrac{\log\left(2\alpha-3\right)}{\alpha}$ のままにせず、$g(\alpha)=0$ を使って $\dfrac{2}{2\alpha-3}$ に直す。`,
            String.raw`$x\to\infty$ の極限は、問題が与えている $\dfrac{\log t}{t}\to0$ の形に持ち込む。`,
          ],
          check: String.raw`$f(\alpha)=0.402363826$ と $\dfrac{2}{2\alpha-3}=0.402363826$ が一致した。$f(100)=\dfrac{\log197}{100}=0.0528$ と、確かに $0$ へ近づいた。`,
        },
        {
          label: "(4)",
          task: String.raw`$2\leqq m<n$ を満たす整数の組 $(m,n)$ で $\left(2m-3\right)^{n}=\left(2n-3\right)^{m}$ が成り立つものをすべて求める`,
          answer: String.raw`$(m,n)=(3,6)$`,
          approach: String.raw`両辺の対数をとると $f(m)=f(n)$ になる。(3) のグラフから、$f$ が同じ値を2回とるのは「増加部分に1つ、減少部分に1つ」のときだけ。$\alpha<4$ なので増加部分の整数は $2,3$ しかなく、$m$ の候補がすぐ絞れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$m\geqq2$ より $2m-3\geqq1>0$、$2n-3>0$ なので両辺の自然対数をとれて`,
            },
            {
              k: "math",
              t: String.raw`n\log\left(2m-3\right)=m\log\left(2n-3\right),\qquad\frac{\log\left(2m-3\right)}{m}=\frac{\log\left(2n-3\right)}{n}`,
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`f(m)=f(n)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\alpha$ をはさむ。** (3) より $f$ は $\left[2,\alpha\right]$ で狭義増加、$\left[\alpha,\infty\right)$ で狭義減少である。まず $\alpha$ の位置を整数のべきの比較だけで押さえる。`,
            },
            {
              k: "math",
              t: String.raw`f(3)=\frac{\log3}{3},\qquad f(4)=\frac{\log5}{4},\qquad f(5)=\frac{\log7}{5}`,
            },
            {
              k: "steps",
              items: [
                String.raw`$f(3)<f(4)\iff4\log3<3\log5\iff3^{4}<5^{3}\iff81<125$（真）`,
                String.raw`$f(4)>f(5)\iff5\log5>4\log7\iff5^{5}>7^{4}\iff3125>2401$（真）`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\alpha\leqq3$ なら $f$ は $\left[3,4\right]$ で減少して $f(3)>f(4)$ となり1つめに反する。$\alpha\geqq5$ なら $f$ は $\left[4,5\right]$ で増加して $f(4)<f(5)$ となり2つめに反する。よって`,
            },
            { k: "math", t: String.raw`3<\alpha<5` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$m$ の絞り込み。** $m<n$ で $f(m)=f(n)$ となるには、$m$ と $n$ が同じ単調区間にあってはいけない（狭義単調なので値が一致しない）。とくに $m<\alpha<5$ だから $m$ は $2,3,4$ のいずれかで、$n>\alpha>3$ だから $n\geqq4$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$m=2$ は不適。** $f(2)=\dfrac{\log1}{2}=0$ で、$f(n)=0$ となるのは $\log\left(2n-3\right)=0$、つまり $n=2$ のときだけである。$n>m=2$ に反する。`,
            },
            {
              k: "p",
              t: String.raw`**$m=4$ も不適。** $n>4$ より $n\geqq5$ である。$\alpha<5$ なので $f$ は $\left[5,\infty\right)$ で減少し、$f(n)\leqq f(5)$ である。上で見たとおり $f(5)<f(4)$ だから $f(n)<f(4)$ となり、$f(m)=f(n)$ は成り立たない。`,
            },
            {
              k: "p",
              t: String.raw`**$m=3$。** $\log9=2\log3$ より`,
            },
            {
              k: "math",
              t: String.raw`f(6)=\frac{\log9}{6}=\frac{2\log3}{6}=\frac{\log3}{3}=f(3)`,
            },
            {
              k: "p",
              t: String.raw`なので $n=6$ は条件を満たす。$n$ は $\alpha$ より大きい側にあり、そこで $f$ は狭義減少だから、$f(n)=f(3)$ をみたす $n\ (>\alpha)$ はこの1つしかない。したがって`,
            },
            { k: "math", t: String.raw`(m,n)=(3,6)` },
            { k: "p", t: String.raw`だけが答えである。実際 $\left(2\cdot3-3\right)^{6}=3^{6}=729$、$\left(2\cdot6-3\right)^{3}=9^{3}=729$ で成り立つ。` },
            {
              k: "note",
              t: String.raw`$3^{6}=9^{3}$ は $\left(3^{2}\right)^{3}=3^{6}$ という当たり前の等式で、$2m-3$ と $2n-3$ がちょうど $3$ と $9$ になる $m,n$ を拾ったものである。$x^{y}=y^{x}$ の整数解が $(2,4)$ だけ、という有名な問題と同じ構図になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$f(m)=f(n)$ に直してグラフで考える。指数のまま扱うと手がかりがない。`,
            String.raw`$f(3)$ と $f(4)$、$f(4)$ と $f(5)$ の比較は、対数を払って整数のべき（$81<125$、$3125>2401$）にすれば暗算でできる。`,
            String.raw`$m=2$ と $m=4$ を落とさずに潰す。とくに $m=2$ は $f(2)=0$ で、$f(n)=0$ が $n=2$ しかないことから除かれる。`,
          ],
          check: String.raw`$2\leqq m<n\leqq59$ を全探索すると $(3,6)$ だけだった。$f(3)=f(6)=0.366204096$ で一致している。`,
        },
      ],
    },
    {
      no: 6,
      field: "積分法・空間図形",
      topics: ["円錐の展開図", "極方程式", "はさみうちと面積", "半角の置換"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\theta=0,\\ 0.5,\\ 1,\\ \\pm\\tfrac\\pi2$ で $\\mathrm{R}$ を求めると、いずれも $z=x$ を満たし $\\mathrm{PR}=\\dfrac{\\sqrt2}{1+\\cos\\theta}$ と小数9桁まで一致した",
          "$\\displaystyle\\int_{-\\pi/2}^{\\pi/2}r(\\theta)^{2}d\\theta$ を数値積分すると $2.6666666667=\\dfrac83$ になった",
          "$T=1.2786324275$ で、$\\dfrac{\\sqrt2\\left(3\\pi-4\\right)}{6}=1.2786324275$ と一致した",
          "(2) の不等式を5通りの $(\\theta,h)$ で数値的に確かめ、すべて成り立った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面上の円 $C\colon x^{2}+y^{2}=1$、円板 $D$ を底面、$\mathrm{P}(0,0,1)$ を頂点とする円錐を $K$ とし、平面 $H\colon z=x$ と $K$ の側面の交わりを $E$ とする。$\mathrm{Q}\left(\cos\theta,\sin\theta,0\right)$（$-\tfrac\pi2\leqq\theta\leqq\tfrac\pi2$）に対し、線分 $\mathrm{PQ}$ と $E$ の共有点を $\mathrm{R}$ とするとき、$\mathrm{PR}$ の長さ $r(\theta)$ を $\theta$ で表す`,
          answer: String.raw`$r(\theta)=\dfrac{\sqrt{2}}{1+\cos\theta}$`,
          approach: String.raw`線分 $\mathrm{PQ}$ を媒介変数で書き、$z=x$ を代入して媒介変数を決めるだけ。$\left|\mathrm{PQ}\right|$ は母線の長さ $\sqrt2$ で $\theta$ によらない。`,
          blocks: [
            { k: "p", t: String.raw`線分 $\mathrm{PQ}$ 上の点は $0\leqq s\leqq1$ を使って` },
            {
              k: "math",
              t: String.raw`\mathrm{P}+s\left(\mathrm{Q}-\mathrm{P}\right)=\left(s\cos\theta,\ s\sin\theta,\ 1-s\right)`,
            },
            { k: "p", t: String.raw`と書ける。$H\colon z=x$ に入れると` },
            {
              k: "math",
              t: String.raw`1-s=s\cos\theta,\qquad s\left(1+\cos\theta\right)=1,\qquad s=\frac{1}{1+\cos\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。$-\tfrac\pi2\leqq\theta\leqq\tfrac\pi2$ では $\cos\theta\geqq0$ なので $1\leqq1+\cos\theta\leqq2$、したがって $\tfrac12\leqq s\leqq1$ で確かに線分上にある。`,
            },
            { k: "p", t: String.raw`母線の長さは` },
            {
              k: "math",
              t: String.raw`\left|\mathrm{PQ}\right|=\sqrt{\cos^{2}\theta+\sin^{2}\theta+1}=\sqrt{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`r(\theta)=\mathrm{PR}=s\left|\mathrm{PQ}\right|=\frac{\sqrt{2}}{1+\cos\theta}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\theta=\pm\tfrac\pi2$ では $s=1$ で $\mathrm{R}=\mathrm{Q}$、つまり $\mathrm{R}$ は $\mathrm{A}(0,-1,0)$ と $\mathrm{B}(0,1,0)$ になる。$\theta=0$ では $r=\dfrac{\sqrt2}{2}$ で母線のちょうど半分である。`,
            },
          ],
          pitfalls: [
            String.raw`$r(\theta)$ は $\mathrm{PR}$ の長さ（母線に沿った距離）であって、$\mathrm{R}$ の $z$ 座標や $xy$ 平面への射影ではない。`,
          ],
          check: String.raw`$\theta=1$ で $\mathrm{R}=(0.350777,0.546302,0.350777)$、$z=x$ を満たし $\mathrm{PR}=0.918140262=\dfrac{\sqrt2}{1+\cos1}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$K$ の側面のうち、$E$ の $\mathrm{A}$ から $\mathrm{R}$ までの部分、線分 $\mathrm{PA}$、線分 $\mathrm{PR}$ で囲まれた部分の面積を $S(\theta)$ とするとき、$0\leqq\theta<\theta+h\leqq\tfrac\pi2$ で $\dfrac{h\left\{r(\theta)\right\}^{2}}{2\sqrt{2}}\leqq S(\theta+h)-S(\theta)\leqq\dfrac{h\left\{r(\theta+h)\right\}^{2}}{2\sqrt{2}}$ を示す`,
          answer: String.raw`側面を展開すると、増分は中心角 $\dfrac{h}{\sqrt2}$ の2つの扇形にはさまれる`,
          approach: String.raw`円錐の側面は、母線で切って平らに広げれば半径 $\sqrt2$ の扇形になる。側面上の長さと面積は展開してもそのまま。展開図では $\mathrm{PR}$ が極座標の動径、$\theta$ が偏角に比例するので、増分が扇形ではさめる。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "円錐 K の側面の展開図（x ≧ 0 の側だけ）。頂点 P を中心とする半径 √2 の扇形で、底面の角 θ は展開図では偏角 ψ = (θ + π/2)/√2 に対応する。内側の曲線が E、外側の弧が円 C。網かけが (3) の T。",
                view: [-1.1, 1.65, -0.25, 1.6],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: BAND6T },
                  { k: "param", f: ARC6T, from: -Math.PI / 2, to: Math.PI / 2 },
                  { k: "param", f: ON6T, from: -Math.PI / 2, to: Math.PI / 2 },
                  { k: "seg", a: [0, 0], b: ARC6T(-Math.PI / 2) },
                  { k: "seg", a: [0, 0], b: ARC6T(Math.PI / 2) },
                  { k: "seg", a: [0, 0], b: ARC6T(0.5), faint: true },
                  { k: "dot", at: [0, 0], label: "P", place: "below-left" },
                  { k: "dot", at: ARC6T(-Math.PI / 2), label: "A", place: "below-right" },
                  { k: "dot", at: ARC6T(Math.PI / 2), label: "B", place: "left" },
                  { k: "dot", at: ON6T(0.5), label: "R", place: "left" },
                  { k: "dot", at: ARC6T(0.5), label: "Q", place: "above-right" },
                  { k: "text", at: [0.52, 0.42], label: "E", place: "below-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**展開図。** $K$ の母線の長さは $\sqrt2$、底面の円周は $2\pi$ である。側面を母線 $\mathrm{PA}$ で切って平面に広げると、半径 $\sqrt2$ の扇形になる。側面上の長さも面積も展開で変わらない。`,
            },
            {
              k: "p",
              t: String.raw`底面の弧の長さは保たれるので、底面で $\mathrm{A}$ から角 $\theta+\tfrac\pi2$ だけ回った位置の母線は、展開図では偏角`,
            },
            {
              k: "math",
              t: String.raw`\psi=\frac{\theta+\frac{\pi}{2}}{\sqrt{2}}`,
            },
            {
              k: "p",
              t: String.raw`の向きに来る（底面の弧 $1\cdot\left(\theta+\tfrac\pi2\right)$ と展開図の弧 $\sqrt2\,\psi$ が等しい）。$\mathrm{R}$ は $\mathrm{P}$ から母線に沿って $r(\theta)$ の位置にあるから、展開図では極座標 $\left(r(\theta),\ \psi\right)$ の点である。$\theta$ が $h$ 増えると $\psi$ は $\dfrac{h}{\sqrt2}$ 増える。`,
            },
            {
              k: "p",
              t: String.raw`**はさみうち。** $S(\theta+h)-S(\theta)$ は、展開図で偏角が $\psi(\theta)$ から $\psi(\theta)+\dfrac{h}{\sqrt2}$ までの、$\mathrm{P}$ を頂点として曲線 $E$ までの部分の面積である。`,
            },
            {
              k: "p",
              t: String.raw`$0\leqq\theta\leqq\tfrac\pi2$ で $\cos\theta$ は減少するので $r(\theta)=\dfrac{\sqrt2}{1+\cos\theta}$ は増加する。よってこの偏角の範囲では`,
            },
            { k: "math", t: String.raw`r(\theta)\leqq r(\tau)\leqq r(\theta+h)\qquad\left(\theta\leqq\tau\leqq\theta+h\right)` },
            {
              k: "p",
              t: String.raw`である。したがって、この部分は「中心 $\mathrm{P}$、半径 $r(\theta)$、中心角 $\dfrac{h}{\sqrt2}$ の扇形」を含み、「中心 $\mathrm{P}$、半径 $r(\theta+h)$、中心角 $\dfrac{h}{\sqrt2}$ の扇形」に含まれる。扇形の面積は $\dfrac12\left(\text{半径}\right)^{2}\left(\text{中心角}\right)$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{1}{2}\left\{r(\theta)\right\}^{2}\cdot\frac{h}{\sqrt{2}}\leqq S(\theta+h)-S(\theta)\leqq\frac{1}{2}\left\{r(\theta+h)\right\}^{2}\cdot\frac{h}{\sqrt{2}}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{h\left\{r(\theta)\right\}^{2}}{2\sqrt{2}}\leqq S(\theta+h)-S(\theta)\leqq\frac{h\left\{r(\theta+h)\right\}^{2}}{2\sqrt{2}}`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`この不等式を $h$ で割って $h\to0$ とすると $S'(\theta)=\dfrac{\left\{r(\theta)\right\}^{2}}{2\sqrt2}$ になる。極座標の面積公式 $\dfrac12\int\rho^{2}d\psi$ を、偏角の取り替え $d\psi=\dfrac{d\theta}{\sqrt2}$ で書き直したものである。`,
            },
          ],
          pitfalls: [
            String.raw`展開すると偏角は $\theta$ ではなく $\dfrac{\theta+\pi/2}{\sqrt2}$ になる。母線が $\sqrt2$ なので、弧長をそろえるために $\sqrt2$ で割る。`,
            String.raw`$r$ が $\left[0,\tfrac\pi2\right]$ で増加であることを使って上下からはさむ。増減を確かめずに不等号の向きを決めない。`,
          ],
          check: String.raw`$\left(\theta,h\right)=\left(0.5,1.0\right)$ では $0.20057967\leqq0.33241348\leqq0.61676429$ となり、5通りの組すべてで成り立った。`,
        },
        {
          label: "(3)",
          task: String.raw`$K$ の側面のうち、円 $C$ の $x\geqq0$ の部分と曲線 $E$ により囲まれた部分の面積 $T$ を求める`,
          answer: String.raw`$T=\dfrac{\sqrt{2}\left(3\pi-4\right)}{6}$`,
          approach: String.raw`(2) の展開図でそのまま考える。$T$ は「半径 $\sqrt2$・中心角 $\dfrac{\pi}{\sqrt2}$ の扇形」から「$E$ の内側の部分」を引いたもの。後者は $\dfrac{1}{2\sqrt2}\displaystyle\int r^{2}d\theta$ で、半角の公式で $\sec^{4}$ の積分になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`円 $C$ の $x\geqq0$ の部分は $-\tfrac\pi2\leqq\theta\leqq\tfrac\pi2$ に対応する。展開図では、偏角 $\psi$ が $0$ から`,
            },
            {
              k: "math",
              t: String.raw`\psi\left(\frac{\pi}{2}\right)=\frac{\frac\pi2+\frac\pi2}{\sqrt{2}}=\frac{\pi}{\sqrt{2}}`,
            },
            { k: "p", t: String.raw`まで動く部分である。$T$ は、この範囲での「半径 $\sqrt2$ の扇形」から「$E$ より内側の部分」を引いたものだから` },
            {
              k: "math",
              t: String.raw`T=\frac{1}{2}\left(\sqrt{2}\right)^{2}\cdot\frac{\pi}{\sqrt{2}}-\left\{S\left(\frac{\pi}{2}\right)-S\left(-\frac{\pi}{2}\right)\right\}=\frac{\pi}{\sqrt{2}}-\frac{1}{2\sqrt{2}}\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\left\{r(\theta)\right\}^{2}d\theta`,
            },
            {
              k: "p",
              t: String.raw`である（(2) の注より $S'(\theta)=\dfrac{\left\{r(\theta)\right\}^{2}}{2\sqrt2}$、かつ $S\left(-\tfrac\pi2\right)=0$）。`,
            },
            { k: "p", t: String.raw`**積分。** $1+\cos\theta=2\cos^{2}\dfrac\theta2$ を使うと` },
            {
              k: "math",
              t: String.raw`\left\{r(\theta)\right\}^{2}=\frac{2}{\left(1+\cos\theta\right)^{2}}=\frac{2}{4\cos^{4}\frac\theta2}=\frac{1}{2\cos^{4}\frac\theta2}`,
            },
            { k: "p", t: String.raw`である。偶関数なので` },
            {
              k: "math",
              t: String.raw`I=\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\left\{r(\theta)\right\}^{2}d\theta=2\int_{0}^{\frac{\pi}{2}}\frac{d\theta}{2\cos^{4}\frac\theta2}=\int_{0}^{\frac{\pi}{2}}\frac{d\theta}{\cos^{4}\frac\theta2}`,
            },
            { k: "p", t: String.raw`である。$u=\dfrac\theta2$（$d\theta=2\,du$、$u$ は $0$ から $\tfrac\pi4$）とおくと` },
            {
              k: "math",
              t: String.raw`I=2\int_{0}^{\frac{\pi}{4}}\frac{du}{\cos^{4}u}`,
            },
            { k: "p", t: String.raw`である。$\dfrac{1}{\cos^{4}u}=\dfrac{1}{\cos^{2}u}\cdot\dfrac{1}{\cos^{2}u}=\left(1+\tan^{2}u\right)\cdot\dfrac{1}{\cos^{2}u}$ なので、$w=\tan u$ とおくと $dw=\dfrac{du}{\cos^{2}u}$ で` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{4}}\frac{du}{\cos^{4}u}=\int_{0}^{1}\left(1+w^{2}\right)dw=\left[w+\frac{w^{3}}{3}\right]_{0}^{1}=\frac{4}{3}`,
            },
            { k: "p", t: String.raw`である。よって $I=2\cdot\dfrac43=\dfrac83$ である。` },
            { k: "p", t: String.raw`**仕上げ。**` },
            {
              k: "math",
              t: String.raw`T=\frac{\pi}{\sqrt{2}}-\frac{1}{2\sqrt{2}}\cdot\frac{8}{3}=\frac{1}{\sqrt{2}}\left(\pi-\frac{4}{3}\right)=\frac{3\pi-4}{3\sqrt{2}}=\frac{\sqrt{2}\left(3\pi-4\right)}{6}`,
            },
            { k: "p", t: String.raw`である（数値では $1.2786\cdots$）。` },
            {
              k: "note",
              t: String.raw`側面全体の面積は $\pi\cdot1\cdot\sqrt2=\sqrt2\pi=4.443$ で、その半分（$x\geqq0$ 側）が $\dfrac{\pi}{\sqrt2}=2.221$。そこから $E$ の内側 $0.943$ を引いて $1.279$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`展開図の扇形の中心角は $\dfrac{\pi}{\sqrt2}$（$\pi$ ではない）。母線 $\sqrt2$ で割る。`,
            String.raw`$\dfrac{1}{\left(1+\cos\theta\right)^{2}}$ は半角で $\dfrac{1}{4\cos^{4}(\theta/2)}$ に直すのが早い。問題の $\tan\dfrac\theta2=u$ の置換もここを指している。`,
          ],
          check: String.raw`$\displaystyle\int_{-\pi/2}^{\pi/2}r^{2}d\theta$ を数値積分すると $2.6666666667=\tfrac83$、$T=1.2786324275$ で $\dfrac{\sqrt2\left(3\pi-4\right)}{6}=1.2786324275$ と一致した。`,
        },
      ],
    },
  ],
};
