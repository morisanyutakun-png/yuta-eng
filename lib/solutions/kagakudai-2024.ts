import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2024年度（令和6年度）一般選抜 前期日程 数学。
 * この年度は「東京工業大学」として実施されたもの。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$y=\tfrac12x^{2}$ に $\left(a,\tfrac12a^{2}\right)$ で接し $y$ 軸にも接する円の中心。 */
const CEN24 = (a: number): [number, number] => {
  const s = a / (a + Math.sqrt(a * a + 1));
  return [a * (1 - s), (a * a) / 2 + s];
};
const PX24 = 2 - Math.SQRT2;
const PY24 = Math.SQRT2 - 0.5;
const PARA24 = (x: number): number => (x * x) / 2;

/** 第3問の図。$a=1$、$b=2$ の例。 */
const AA = 1;
const BB = 2;
const ELL24 = (x: number): number => BB - (BB / AA) * x;
const KK24 = (x: number): number => -(AA / BB) * (x + AA);
/** 階段の折れ線。$\mathrm{A}\to\mathrm{C}_{1}\to\mathrm{A}_{1}\to\mathrm{C}_{2}\to\cdots$ */
const STEP24: [number, number][] = (() => {
  const pts: [number, number][] = [[AA, 0]];
  let x = AA;
  for (let i = 0; i < 4; i += 1) {
    const y = KK24(x);
    pts.push([x, y]);
    x = AA + ((AA * AA) / (BB * BB)) * (x + AA);
    pts.push([x, y]);
  }
  return pts;
})();

export const kagakudai2024: SolutionSet = {
  slug: "kagakudai",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式・微分法",
      topics: ["放物線に接する円", "法線", "軌跡", "媒介変数と接線の傾き"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.5,1,2$ で求めた中心について、$x$ 座標（$y$ 軸までの距離）と接点までの距離が一致し、法線条件も $10^{-16}$ の精度で成り立った",
          "$a=1$ での中心は $\\left(0.585786438,0.914213562\\right)$ で、$\\left(2-\\sqrt2,\\sqrt2-\\tfrac12\\right)=\\left(0.585786438,0.914213562\\right)$ と一致した",
          "媒介変数のまま数値微分すると $\\dfrac{dY}{dX}=2.414213562$ で、$1+\\sqrt2=2.414213562$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面上の曲線 $y=\dfrac12x^{2}$ に点 $\left(a,\dfrac12a^{2}\right)$（$a>0$）で接する円のうち、$y$ 軸の正の部分にも接するものを $S_{a}$ とおく。$a$ が正の実数を動くときの $S_{a}$ の中心の軌跡を $C$、とくに $S_{1}$ の中心を $\mathrm{P}$ とするとき、$\mathrm{P}$ の座標を求める`,
          answer: String.raw`$\mathrm{P}\left(2-\sqrt2,\ \sqrt2-\dfrac12\right)$`,
          approach: String.raw`曲線に接する円の中心は、接点における法線の上にある。法線上を媒介変数で進み、「$y$ 軸までの距離 $=$ 接点までの距離」で止まる位置を求める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=\dfrac12x^{2}$ の $x=a$ における接線の傾きは $y'=a$ なので、接線の方向ベクトルは $\left(1,a\right)$、法線の方向ベクトルは $\left(-a,1\right)$ である。中心は接点 $\mathrm{T}\left(a,\dfrac12a^{2}\right)$ から法線方向に進んだ点なので、$s>0$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\left(a-sa,\ \frac12a^{2}+s\right)`,
            },
            {
              k: "p",
              t: String.raw`と書ける（曲線の内側、つまり上側に向かう向きにとった）。このとき半径は接点までの距離で`,
            },
            {
              k: "math",
              t: String.raw`r=s\sqrt{a^{2}+1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$y$ 軸に接する条件。** 中心の $x$ 座標 $a\left(1-s\right)$ が正で、それが半径に等しければよい。`,
            },
            {
              k: "math",
              t: String.raw`a\left(1-s\right)=s\sqrt{a^{2}+1},\qquad a=s\left(a+\sqrt{a^{2}+1}\right)`,
            },
            { k: "p", t: String.raw`より` },
            {
              k: "math",
              t: String.raw`s=\frac{a}{a+\sqrt{a^{2}+1}}=a\left(\sqrt{a^{2}+1}-a\right)`,
            },
            {
              k: "p",
              t: String.raw`である（分母を有理化した。$\left(a+\sqrt{a^{2}+1}\right)\left(\sqrt{a^{2}+1}-a\right)=1$）。$0<s<1$ なので $x$ 座標は正になっている。`,
            },
            { k: "p", t: String.raw`**$a=1$ のとき。** $s=1\cdot\left(\sqrt2-1\right)=\sqrt2-1$ なので、中心は` },
            {
              k: "math",
              t: String.raw`\left(1-\left(\sqrt2-1\right),\ \frac12+\left(\sqrt2-1\right)\right)=\left(2-\sqrt2,\ \sqrt2-\frac12\right)`,
            },
            { k: "p", t: String.raw`である。半径は $2-\sqrt2=0.585\cdots$ で、$y$ 軸との接点 $\left(0,\sqrt2-\tfrac12\right)$ は正の部分にある ✓。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(2-\sqrt2,\ \sqrt2-\frac12\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1 のとき。円 S₁ は放物線に (1, 1/2) で接し、y 軸にも接する。中心 P は接点での法線の上にある。破線が、a を動かしたときの中心の軌跡 C。",
                view: [-0.6, 2.6, -0.3, 2.3],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (a: number) => CEN24(a),
                    from: 0.05,
                    to: 1.9,
                    dash: true,
                  },
                  { k: "curve", f: PARA24, from: -0.6, to: 2.1 },
                  {
                    k: "param",
                    f: (t: number) => [PX24 + PX24 * Math.cos(t), PY24 + PX24 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [PX24, PY24], b: [1, 0.5], dash: true, faint: true },
                  { k: "dot", at: [PX24, PY24], label: "P", place: "left" },
                  { k: "dot", at: [1, 0.5], label: "接点 (1, 1/2)", place: "below-right" },
                  { k: "dot", at: [0, PY24] },
                  { k: "text", at: [0.865, 1.739], label: "C", place: "right" },
                  { k: "text", at: [2.0, 2.0], label: "y = x²/2", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`中心は法線上にある。接点を通る「どこか」ではなく、法線という向きが決まっている。`,
            String.raw`$y$ 軸に接する条件は「中心の $x$ 座標 $=$ 半径」。中心が右側にあることも確かめる。`,
          ],
          check: String.raw`数値でも中心の $x$ 座標と接点までの距離が一致し、$\left(0.585786438,0.914213562\right)$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{P}$ における曲線 $C$ の接線の傾きを求める`,
          answer: String.raw`$1+\sqrt2$`,
          approach: String.raw`$C$ は $a$ を媒介変数とする曲線である。中心の座標を $a$ の式に整理してから $\dfrac{dY/da}{dX/da}$ を計算する。`,
          blocks: [
            { k: "p", t: String.raw`(1) の $s=a\left(\sqrt{a^{2}+1}-a\right)$ を代入して、中心の座標を $a$ で表す。` },
            {
              k: "math",
              t: String.raw`X(a)=a-sa=a-a^{2}\left(\sqrt{a^{2}+1}-a\right)=a^{3}+a-a^{2}\sqrt{a^{2}+1}`,
            },
            {
              k: "math",
              t: String.raw`Y(a)=\frac12a^{2}+s=\frac12a^{2}+a\sqrt{a^{2}+1}-a^{2}=a\sqrt{a^{2}+1}-\frac12a^{2}`,
            },
            { k: "p", t: String.raw`である。それぞれ $a$ で微分する。$\left(\sqrt{a^{2}+1}\right)'=\dfrac{a}{\sqrt{a^{2}+1}}$ を使うと` },
            {
              k: "math",
              t: String.raw`X'(a)=3a^{2}+1-2a\sqrt{a^{2}+1}-\frac{a^{3}}{\sqrt{a^{2}+1}}`,
            },
            {
              k: "math",
              t: String.raw`Y'(a)=\sqrt{a^{2}+1}+\frac{a^{2}}{\sqrt{a^{2}+1}}-a`,
            },
            { k: "p", t: String.raw`である。$a=1$ では $\sqrt{a^{2}+1}=\sqrt2$ なので` },
            {
              k: "math",
              t: String.raw`X'(1)=4-2\sqrt2-\frac{1}{\sqrt2}=4-\frac{5\sqrt2}{2},\qquad Y'(1)=\sqrt2+\frac{1}{\sqrt2}-1=\frac{3\sqrt2}{2}-1`,
            },
            { k: "p", t: String.raw`である（$\dfrac{1}{\sqrt2}=\dfrac{\sqrt2}{2}$）。求める傾きは` },
            {
              k: "math",
              t: String.raw`\frac{Y'(1)}{X'(1)}=\frac{\frac{3\sqrt2}{2}-1}{4-\frac{5\sqrt2}{2}}=\frac{3\sqrt2-2}{8-5\sqrt2}`,
            },
            { k: "p", t: String.raw`である。分母を有理化すると、分母は $64-50=14$ で、分子は` },
            {
              k: "math",
              t: String.raw`\left(3\sqrt2-2\right)\left(8+5\sqrt2\right)=24\sqrt2+30-16-10\sqrt2=14\sqrt2+14`,
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`\frac{Y'(1)}{X'(1)}=\frac{14\left(\sqrt2+1\right)}{14}=1+\sqrt2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$X'(1)=4-\dfrac{5\sqrt2}{2}=0.464\cdots\neq0$ なので、$C$ はこの点で縦に立ってはいない。割り算してよい。`,
            },
          ],
          pitfalls: [
            String.raw`媒介変数表示の接線の傾きは $\dfrac{dy}{dx}=\dfrac{dy/da}{dx/da}$。分母が $0$ でないことを確かめる。`,
            String.raw`$\sqrt{a^{2}+1}$ の微分を忘れない。合成関数の微分である。`,
          ],
          check: String.raw`数値微分でも $2.414213562$ で、$1+\sqrt2=2.414213562$ と一致した。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法・積分法",
      topics: ["連立微分方程式", "保存量", "対数の微分", "曲線の長さ"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$f=\\dfrac1{\\cosh t}$、$g=\\tanh t$ が6つの条件をすべて満たすことを $t=-1,0,0.7,2$ で数値微分により確かめた",
          "$p(t)$ は $1.0$ で一定、$q'(t)$ は $2.0$ で一定だった",
          "$f(T)=g(T)$ となる $T=0.881373587$ で $f(T)=g(T)=0.707106781$、曲線の長さは $0.785398163$（$\\tfrac\\pi4=0.785398163$）だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`実数全体を定義域にもつ微分可能な関数 $f(t),g(t)$ が $f'=-fg$、$g'=f^{2}$、$f>0$、$\left|g\right|<1$、$f(0)=1$、$g(0)=0$ を満たすとする。$p(t)=\left\{f(t)\right\}^{2}+\left\{g(t)\right\}^{2}$ とするとき、$p'(t)$ を求める`,
          answer: String.raw`$p'(t)=0$`,
          approach: String.raw`そのまま微分して条件を代入するだけ。2つの項がちょうど打ち消す。`,
          blocks: [
            { k: "p", t: String.raw`合成関数の微分より` },
            {
              k: "math",
              t: String.raw`p'(t)=2f(t)f'(t)+2g(t)g'(t)`,
            },
            { k: "p", t: String.raw`である。$f'=-fg$、$g'=f^{2}$ を代入すると` },
            {
              k: "math",
              t: String.raw`p'(t)=2f\left(-fg\right)+2g\cdot f^{2}=-2f^{2}g+2f^{2}g=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$p'=0$ なので $p$ は定数で、$p(0)=f(0)^{2}+g(0)^{2}=1$ より、つねに $f^{2}+g^{2}=1$ である。つまり点 $\left(f(t),g(t)\right)$ は単位円の上を動く。これが以下の鍵になる。`,
            },
          ],
          check: String.raw`$f=\dfrac{1}{\cosh t}$、$g=\tanh t$ で確かめると $p(t)=1.0$ で一定だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$q(t)=\log\dfrac{1+g(t)}{1-g(t)}$ とするとき、$q'(t)$ が定数関数であることを示す`,
          answer: String.raw`$q'(t)=2$`,
          approach: String.raw`$\log$ の中を差に分けて微分する。(1) で得た $f^{2}=1-g^{2}$ を使うと、分母と分子がきれいに消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|g\right|<1$ なので $1+g>0$、$1-g>0$ であり、$q(t)=\log\left(1+g\right)-\log\left(1-g\right)$ と書ける。微分すると`,
            },
            {
              k: "math",
              t: String.raw`q'(t)=\frac{g'}{1+g}+\frac{g'}{1-g}=g'\cdot\frac{\left(1-g\right)+\left(1+g\right)}{\left(1+g\right)\left(1-g\right)}=\frac{2g'}{1-g^{2}}`,
            },
            { k: "p", t: String.raw`である。(1) より $f^{2}+g^{2}=1$、すなわち $f^{2}=1-g^{2}$ であり、$g'=f^{2}$ だから` },
            {
              k: "math",
              t: String.raw`q'(t)=\frac{2f^{2}}{f^{2}}=2`,
            },
            {
              k: "p",
              t: String.raw`である（$f>0$ なので $f^{2}\neq0$、割ってよい）。よって $q'$ は定数関数 $2$ である。$\blacksquare$`,
            },
          ],
          pitfalls: [
            String.raw`$\log$ の微分で $1-g$ の側は符号が2回変わる（中身の微分が $-g'$、$\log$ の前にマイナス）。結果は足し算になる。`,
          ],
          check: String.raw`数値微分でも $q'(t)=2.0$ で一定だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\lim_{t\to\infty}g(t)$ を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`(2) より $q(t)=2t+q(0)$ である。$q$ の定義式を $g$ について解けばよい。`,
          blocks: [
            { k: "p", t: String.raw`(2) より $q'(t)=2$ なので $q(t)=2t+q(0)$ である。$g(0)=0$ だから` },
            {
              k: "math",
              t: String.raw`q(0)=\log\frac{1+0}{1-0}=\log1=0,\qquad q(t)=2t`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\frac{1+g(t)}{1-g(t)}=e^{2t}`,
            },
            { k: "p", t: String.raw`であり、$g$ について解くと` },
            {
              k: "math",
              t: String.raw`1+g=e^{2t}-e^{2t}g,\qquad g\left(1+e^{2t}\right)=e^{2t}-1,\qquad g(t)=\frac{e^{2t}-1}{e^{2t}+1}`,
            },
            { k: "p", t: String.raw`である。分母・分子を $e^{2t}$ で割ると` },
            {
              k: "math",
              t: String.raw`g(t)=\frac{1-e^{-2t}}{1+e^{-2t}}\xrightarrow[t\to\infty]{}\frac{1-0}{1+0}=1`,
            },
            { k: "p", t: String.raw`である。よって $\displaystyle\lim_{t\to\infty}g(t)=1$ である。` },
            {
              k: "note",
              t: String.raw`$g(t)=\tanh t$、そして $f=\sqrt{1-g^{2}}=\dfrac{1}{\cosh t}$ である（$f>0$）。確かに $f(0)=1$、$g(0)=0$ で、$f'=-fg$、$g'=f^{2}$ も成り立つ。`,
            },
          ],
          check: String.raw`$g(30)=1.000000000000$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$f(T)=g(T)$ となる正の実数 $T$ に対して、媒介変数表示された平面曲線 $\left(x,y\right)=\left(f(t),g(t)\right)$（$0\leqq t\leqq T$）の長さを求める`,
          answer: String.raw`$\dfrac{\pi}{4}$`,
          approach: String.raw`長さの式 $\displaystyle\int\sqrt{\left(x'\right)^{2}+\left(y'\right)^{2}}dt$ に代入すると、(1) のおかげで根号がきれいに外れる。そのあとは $g$ を変数にとって置換する。`,
          blocks: [
            { k: "p", t: String.raw`$x'=f'=-fg$、$y'=g'=f^{2}$ なので` },
            {
              k: "math",
              t: String.raw`\left(x'\right)^{2}+\left(y'\right)^{2}=f^{2}g^{2}+f^{4}=f^{2}\left(g^{2}+f^{2}\right)=f^{2}`,
            },
            { k: "p", t: String.raw`である（(1) で $f^{2}+g^{2}=1$）。$f>0$ だから $\sqrt{\left(x'\right)^{2}+\left(y'\right)^{2}}=f$ で、長さは` },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{T}f(t)\,dt`
            },
            { k: "p", t: String.raw`である。$g'=f^{2}$ より $dt=\dfrac{dg}{f^{2}}$ と置換できて` },
            {
              k: "math",
              t: String.raw`L=\int_{g(0)}^{g(T)}\frac{f}{f^{2}}dg=\int_{0}^{g(T)}\frac{dg}{\sqrt{1-g^{2}}}=\Bigl[\arcsin g\Bigr]_{0}^{g(T)}=\arcsin\left(g(T)\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$f=\sqrt{1-g^{2}}$）。あとは $g(T)$ を求める。$f(T)=g(T)$ かつ $f(T)^{2}+g(T)^{2}=1$、$f>0$ より`,
            },
            {
              k: "math",
              t: String.raw`2g(T)^{2}=1,\qquad g(T)=f(T)=\frac{1}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である（$g(T)=f(T)>0$）。したがって` },
            {
              k: "math",
              t: String.raw`L=\arcsin\frac{1}{\sqrt2}=\frac{\pi}{4}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "(1) より点 (f(t), g(t)) は単位円の上を動く。t = 0 では (1, 0)、t = T では (1/√2, 1/√2)。太い弧がその道のりで、中心角 45°、半径 1 なので長さは π/4。",
                view: [-0.5, 1.5, -0.3, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: Math.PI / 4,
                  },
                  { k: "seg", a: [0, 0], b: [1, 0], dash: true, faint: true },
                  { k: "seg", a: [0, 0], b: [Math.SQRT1_2, Math.SQRT1_2], dash: true, faint: true },
                  { k: "dot", at: [1, 0], label: "t = 0", place: "below-right" },
                  { k: "dot", at: [Math.SQRT1_2, Math.SQRT1_2], label: "t = T", place: "above-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`答えが「単位円の $45^{\circ}$ ぶんの弧」になっているのは偶然ではない。(1) から点は単位円上を動き、速さ $\sqrt{\left(x'\right)^{2}+\left(y'\right)^{2}}=f$ で進むので、長さは中心角そのものになる。`,
            },
          ],
          pitfalls: [
            String.raw`根号の中を $f^{2}\left(f^{2}+g^{2}\right)$ とまとめるのが要点。(1) がここで効く。`,
            String.raw`$g(T)=f(T)$ の符号は $f>0$ から決まる。$-\dfrac{1}{\sqrt2}$ は不適。`,
          ],
          check: String.raw`$T=0.881373587$ で数値的に長さを求めると $0.785398163$ で、$\dfrac{\pi}{4}=0.785398163$ と一致した。`,
        },
      ],
    },
    {
      no: 3,
      field: "数列・図形と方程式",
      topics: ["折れ線の漸化式", "等比型漸化式", "三角形の面積", "極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\left(a,b\\right)=\\left(1,2\\right),\\left(2,3\\right),\\left(1,5\\right)$ で漸化式から作った $x_{n}$ と、求めた一般項が小数9桁まで一致した",
          "同じ3通りで、座標から直接計算した $\\triangle\\mathrm{CBA}_{n}$ の面積と求めた $S_{n}$ が一致した",
          "$n=30$ での $\\dfrac{\\mathrm{BA}_{n}}{\\mathrm{BC}}$ が $\\dfrac{a^{2}+b^{2}}{b^{2}-a^{2}}$ と小数9桁まで一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$xy$ 平面上に点 $\mathrm{A}(a,0)$、$\mathrm{B}(0,b)$、$\mathrm{C}(-a,0)$（$0<a<b$）をとる。$\mathrm{A},\mathrm{B}$ を通る直線を $\ell$、$\mathrm{C}$ を通り線分 $\mathrm{BC}$ に垂直な直線を $k$ とする。$\mathrm{A}$ を通り $y$ 軸に平行な直線と $k$ の交点を $\mathrm{C}_{1}$、$\mathrm{C}_{1}$ を通り $x$ 軸に平行な直線と $\ell$ の交点を $\mathrm{A}_{1}$ とし、以下 $\mathrm{A}_{n}$ を通り $y$ 軸に平行な直線と $k$ の交点を $\mathrm{C}_{n+1}$、$\mathrm{C}_{n+1}$ を通り $x$ 軸に平行な直線と $\ell$ の交点を $\mathrm{A}_{n+1}$ とする。点 $\mathrm{A}_{n},\mathrm{C}_{n}$ の座標を求める`,
          answer: String.raw`$\mathrm{A}_{n}\left(x_{n},\ y_{n}\right)$、$\mathrm{C}_{n}\left(x_{n-1},\ y_{n}\right)$。ただし $x_{n}=\dfrac{a\left\{a^{2}+b^{2}-2a^{2}\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}$、$y_{n}=\dfrac{-2a^{2}b\left\{1-\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}$`,
          approach: String.raw`$\mathrm{A}_{n}$ の $x$ 座標 $x_{n}$ だけ追えばよい。$\mathrm{A}_{n}\to\mathrm{C}_{n+1}\to\mathrm{A}_{n+1}$ の2段で $x_{n+1}$ が $x_{n}$ の1次式になり、等比型の漸化式になる。`,
          blocks: [
            { k: "p", t: String.raw`**2本の直線。** $\ell$ は $\mathrm{A}(a,0)$、$\mathrm{B}(0,b)$ を通るので` },
            {
              k: "math",
              t: String.raw`\ell\colon y=b-\frac ba x`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{BC}$ の傾きは $\dfrac{0-b}{-a-0}=\dfrac ba$ なので、これに垂直で $\mathrm{C}(-a,0)$ を通る $k$ は`,
            },
            {
              k: "math",
              t: String.raw`k\colon y=-\frac ab\left(x+a\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**漸化式。** $\mathrm{A}_{0}=\mathrm{A}(a,0)$ とおく（これで $\mathrm{C}_{1}$ の作り方も $n\geqq1$ と同じ形になる）。$\mathrm{A}_{n}=\left(x_{n},y_{n}\right)$ とすると、$\mathrm{C}_{n+1}$ は $x$ 座標が $x_{n}$ で $k$ 上の点だから`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{C}_{n+1}=\left(x_{n},\ -\frac ab\left(x_{n}+a\right)\right)`,
            },
            { k: "p", t: String.raw`である。$\mathrm{A}_{n+1}$ は $y$ 座標が同じで $\ell$ 上の点なので` },
            {
              k: "math",
              t: String.raw`b-\frac ba x_{n+1}=-\frac ab\left(x_{n}+a\right),\qquad x_{n+1}=a+\frac{a^{2}}{b^{2}}\left(x_{n}+a\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解く。** $u_{n}=x_{n}+a$、$r=\dfrac{a^{2}}{b^{2}}$ とおくと $u_{n+1}=2a+ru_{n}$ である。$0<a<b$ より $0<r<1$ で、不動点は $\alpha=\dfrac{2a}{1-r}$ である。$u_{n+1}-\alpha=r\left(u_{n}-\alpha\right)$ だから`,
            },
            {
              k: "math",
              t: String.raw`u_{n}=\alpha+r^{n}\left(u_{0}-\alpha\right)`,
            },
            { k: "p", t: String.raw`である。$u_{0}=x_{0}+a=2a$ なので $u_{0}-\alpha=2a-\dfrac{2a}{1-r}=-\dfrac{2ar}{1-r}$ で` },
            {
              k: "math",
              t: String.raw`u_{n}=\frac{2a}{1-r}\left(1-r^{n+1}\right)=\frac{2ab^{2}}{b^{2}-a^{2}}\left\{1-\left(\frac ab\right)^{2n+2}\right\}`,
            },
            { k: "p", t: String.raw`である。$x_{n}=u_{n}-a$ を整理すると` },
            {
              k: "math",
              t: String.raw`x_{n}=\frac{a\left\{a^{2}+b^{2}-2a^{2}\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}`,
            },
            { k: "p", t: String.raw`となり、$y_{n}=b-\dfrac ba x_{n}$ から` },
            {
              k: "math",
              t: String.raw`y_{n}=\frac{-2a^{2}b\left\{1-\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である（$n=0$ で $x_{0}=a$、$y_{0}=0$ となり、$\mathrm{A}$ に一致する ✓）。$\mathrm{C}_{n}$ は $\mathrm{A}_{n-1}$ と同じ $x$ 座標、$\mathrm{A}_{n}$ と同じ $y$ 座標なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{A}_{n}=\left(x_{n},\ y_{n}\right),\qquad\mathrm{C}_{n}=\left(x_{n-1},\ y_{n}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "a = 1、b = 2 のとき。直線 ℓ は A, B を通り、直線 k は C を通って BC に垂直。A から縦・横と交互に進むと A → C₁ → A₁ → C₂ → A₂ → … と階段状に右下へ進み、ℓ と k の交点に近づいていく。",
                view: [-2.2, 2.8, -1.8, 2.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: ELL24, from: -0.2, to: 1.9 },
                  { k: "curve", f: KK24, from: -2.2, to: 2.6 },
                  ...STEP24.slice(0, -1).map((p, i) => ({
                    k: "seg" as const,
                    a: p,
                    b: STEP24[i + 1],
                    faint: true,
                  })),
                  { k: "dot", at: [-AA, 0], label: "C", place: "below-left" },
                  { k: "dot", at: [0, BB], label: "B", place: "above-right" },
                  { k: "dot", at: [AA, 0], label: "A", place: "above-right" },
                  { k: "dot", at: STEP24[1], label: "C₁", place: "left" },
                  { k: "dot", at: STEP24[2], label: "A₁", place: "above-right" },
                  { k: "dot", at: STEP24[3] },
                  { k: "dot", at: STEP24[4] },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{A}_{0}=\mathrm{A}$ とおくと添字がそろって見通しがよくなる。`,
            String.raw`$u_{n}=x_{n}+a$ とずらすのは、漸化式の定数項を消すため。不動点を引く定石である。`,
          ],
          check: String.raw`$\left(a,b\right)$ を3通りとり、漸化式から作った $x_{n}$ とこの式が小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\triangle\mathrm{CBA}_{n}$ の面積 $S_{n}$ を求める`,
          answer: String.raw`$S_{n}=\dfrac{ab\left\{a^{2}+b^{2}-2a^{2}\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}$（$=b\,x_{n}$）`,
          approach: String.raw`$\mathrm{C}$ を基準にして $\overrightarrow{\mathrm{CB}}$ と $\overrightarrow{\mathrm{CA}_{n}}$ の外積（の絶対値の半分）で面積を出す。$y_{n}$ を $x_{n}$ で書き直すと、ほとんどの項が消えて $b\,x_{n}$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{C}(-a,0)$ を基準にすると $\overrightarrow{\mathrm{CB}}=\left(a,b\right)$、$\overrightarrow{\mathrm{CA}_{n}}=\left(x_{n}+a,\ y_{n}\right)$ なので` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac12\left|a\,y_{n}-b\left(x_{n}+a\right)\right|`,
            },
            { k: "p", t: String.raw`である。$\mathrm{A}_{n}$ は $\ell$ 上にあるので $y_{n}=b-\dfrac ba x_{n}$ で、これを代入すると` },
            {
              k: "math",
              t: String.raw`a\,y_{n}-b\left(x_{n}+a\right)=ab-b\,x_{n}-b\,x_{n}-ab=-2b\,x_{n}`,
            },
            { k: "p", t: String.raw`である。$x_{n}>0$ なので` },
            {
              k: "math",
              t: String.raw`S_{n}=\frac12\cdot2b\,x_{n}=b\,x_{n}=\frac{ab\left\{a^{2}+b^{2}-2a^{2}\left(\frac ab\right)^{2n}\right\}}{b^{2}-a^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$S_{n}=b\,x_{n}$ は図でも見える。底辺を $\mathrm{CA}_{n}$ ではなく $\mathrm{C}$ と $\mathrm{A}_{n}$ を通る直線（$\ell$）側で見るより、$\mathrm{B}$ から $x$ 軸に下ろした高さ $b$ と、$\mathrm{C}$ から $\mathrm{A}_{n}$ の $x$ 座標までの「横の広がり」で決まる、という形である。$n=0$ なら $S_{0}=ab$ で $\triangle\mathrm{CBA}$ の面積に一致する。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{A}_{n}$ が $\ell$ 上にあることを使うと、$y_{n}$ を消せて式が一気に短くなる。`,
          ],
          check: String.raw`座標から直接計算した面積と、この式が3通りの $\left(a,b\right)$ で一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}\dfrac{\mathrm{BA}_{n}}{\mathrm{BC}}$ を求める`,
          answer: String.raw`$\dfrac{a^{2}+b^{2}}{b^{2}-a^{2}}$`,
          approach: String.raw`$\mathrm{A}_{n}$ は直線 $\ell$ 上にあるので、$\mathrm{BA}_{n}$ は $x_{n}$ の定数倍になる。$\mathrm{BC}=\sqrt{a^{2}+b^{2}}$ と割ると、ちょうど $\dfrac{x_{n}}{a}$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}_{n}=\left(x_{n},y_{n}\right)$ は $\ell$ 上にあり、$y_{n}-b=-\dfrac ba x_{n}$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BA}_{n}=\sqrt{x_{n}^{2}+\left(y_{n}-b\right)^{2}}=\left|x_{n}\right|\sqrt{1+\frac{b^{2}}{a^{2}}}=\frac{x_{n}\sqrt{a^{2}+b^{2}}}{a}`,
            },
            { k: "p", t: String.raw`である（$x_{n}>0$）。また $\mathrm{BC}=\sqrt{a^{2}+b^{2}}$ なので` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{BA}_{n}}{\mathrm{BC}}=\frac{x_{n}}{a}=\frac{a^{2}+b^{2}-2a^{2}\left(\frac ab\right)^{2n}}{b^{2}-a^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$0<a<b$ より $0<\dfrac ab<1$ なので $\left(\dfrac ab\right)^{2n}\to0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\lim_{n\to\infty}\frac{\mathrm{BA}_{n}}{\mathrm{BC}}=\frac{a^{2}+b^{2}}{b^{2}-a^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`極限の点は $\ell$ と $k$ の交点である。階段は毎回 $\left(\dfrac ab\right)^{2}$ 倍ずつ縮みながらそこへ近づく。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{BA}_{n}$ を $x_{n}$ だけで書けることに気づけば、根号が約分されて一気に片づく。`,
          ],
          check: String.raw`$n=30$ での比が $\dfrac{a^{2}+b^{2}}{b^{2}-a^{2}}$ と小数9桁まで一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["偶奇の確率", "母関数のアイデア", "積の形の確率", "e の定義"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "表の枚数の偶奇を直接たどる計算で、$p_{k}=\\tfrac13$ のとき $X_{n}=\\tfrac12\\left(1-\\tfrac1{3^{n}}\\right)$ が $n=1,2,3,5,8$ で一致した",
          "$p_{k}=\\tfrac1{2(k+1)}$ のとき $Y_{n}=\\tfrac n{2(n+1)}$ が同じ $n$ で一致した",
          "$n=3m$ の場合は $m=1,2,5,20,200,2000$ で $Z_{3m}$ が $0.444,0.500,0.4960,0.4922,0.49098,0.490856$ と変化し、$\\tfrac{1-e^{-4}}2=0.490842181$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を正の整数とし、$C_{1},\ldots,C_{n}$ を $n$ 枚の硬貨とする。各 $k$ に対し $C_{k}$ を投げて表が出る確率を $p_{k}$、裏が出る確率を $1-p_{k}$ とする。この $n$ 枚を同時に投げ、表が出た枚数が奇数であれば成功、というゲームを考える。$p_{k}=\dfrac13$ のとき、成功する確率 $X_{n}$ を求める`,
          answer: String.raw`$X_{n}=\dfrac12\left(1-\dfrac{1}{3^{n}}\right)$`,
          approach: String.raw`「表の枚数が偶数の確率 $E$」と「奇数の確率 $O$」について、$E+O=1$ と $E-O$ の2本を立てる。$E-O$ は積の形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 枚のうち表の枚数が偶数である確率を $E_{n}$、奇数である確率を $O_{n}$ とする。$E_{n}+O_{n}=1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$E_{n}-O_{n}$ を追う。** 1枚増やすとき、表（確率 $p$）なら偶奇が入れかわり、裏（確率 $1-p$）ならそのままである。したがって`,
            },
            {
              k: "math",
              t: String.raw`E_{\text{新}}-O_{\text{新}}=\left(1-p\right)\left(E-O\right)+p\left(O-E\right)=\left(1-2p\right)\left(E-O\right)`,
            },
            {
              k: "p",
              t: String.raw`である。硬貨 $0$ 枚のときは表 $0$ 枚（偶数）なので $E-O=1$ である。よって $n$ 枚では`,
            },
            {
              k: "math",
              t: String.raw`E_{n}-O_{n}=\left(1-2p_{1}\right)\left(1-2p_{2}\right)\cdots\left(1-2p_{n}\right)`,
            },
            { k: "p", t: String.raw`となり、$E_{n}+O_{n}=1$ と合わせて` },
            {
              k: "math",
              t: String.raw`O_{n}=\frac{1-\left(1-2p_{1}\right)\left(1-2p_{2}\right)\cdots\left(1-2p_{n}\right)}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**代入する。** $p_{k}=\dfrac13$ では $1-2p_{k}=\dfrac13$ なので、積は $\left(\dfrac13\right)^{n}$ で` },
            {
              k: "math",
              t: String.raw`X_{n}=\frac{1-\left(\frac13\right)^{n}}{2}=\frac12\left(1-\frac{1}{3^{n}}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\left(1-p_{k}\right)+p_{k}x$ を全部掛けた式に $x=1$ と $x=-1$ を入れた、と見ることもできる。$x=1$ で $1$、$x=-1$ で $E-O$ である。`,
            },
          ],
          check: String.raw`$n=1,2,3,5,8$ で直接計算した確率と一致した（$n=8$ で $0.499923792$）。`,
        },
        {
          label: "(2)",
          task: String.raw`$p_{k}=\dfrac{1}{2\left(k+1\right)}$（$k=1,\ldots,n$）のとき、成功する確率 $Y_{n}$ を求める`,
          answer: String.raw`$Y_{n}=\dfrac{n}{2\left(n+1\right)}$`,
          approach: String.raw`(1) で得た式に代入する。$1-2p_{k}=\dfrac{k}{k+1}$ となり、積が次々に約分される。`,
          blocks: [
            { k: "p", t: String.raw`$1-2p_{k}=1-\dfrac{1}{k+1}=\dfrac{k}{k+1}$ なので` },
            {
              k: "math",
              t: String.raw`\left(1-2p_{1}\right)\cdots\left(1-2p_{n}\right)=\frac12\cdot\frac23\cdot\frac34\cdots\frac{n}{n+1}=\frac{1}{n+1}`,
            },
            { k: "p", t: String.raw`である（隣どうしが約分されて両端だけ残る）。よって` },
            {
              k: "math",
              t: String.raw`Y_{n}=\frac{1-\frac{1}{n+1}}{2}=\frac{n}{2\left(n+1\right)}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$p_{k}\leqq\dfrac14<1$ なので確率として正しい。$1-2p_{k}>0$ である。`,
          ],
          check: String.raw`$n=1,\ldots,8$ で直接計算した確率と一致した（$n=8$ で $0.444444444$）。`,
        },
        {
          label: "(3)",
          task: String.raw`$n=3m$（$m$ は正の整数）で、$k=1,\ldots,m$ では $p_{k}=\dfrac{1}{3m}$、$k=m+1,\ldots,2m$ では $p_{k}=\dfrac{2}{3m}$、$k=2m+1,\ldots,3m$ では $p_{k}=\dfrac1m$ とする。成功する確率を $Z_{3m}$ とするとき、$\displaystyle\lim_{m\to\infty}Z_{3m}$ を求める`,
          answer: String.raw`$\dfrac{1-e^{-4}}{2}$`,
          approach: String.raw`(1) の積は3つのかたまりに分かれ、それぞれ $\left(1-\dfrac cm\right)^{m}$ の形になる。これは $e^{-c}$ に収束する。`,
          blocks: [
            { k: "p", t: String.raw`$1-2p_{k}$ は3つのかたまりでそれぞれ` },
            {
              k: "steps",
              items: [
                String.raw`$k=1,\ldots,m$：$1-\dfrac{2}{3m}$ が $m$ 個`,
                String.raw`$k=m+1,\ldots,2m$：$1-\dfrac{4}{3m}$ が $m$ 個`,
                String.raw`$k=2m+1,\ldots,3m$：$1-\dfrac{2}{m}$ が $m$ 個`,
              ],
            },
            { k: "p", t: String.raw`である。したがって (1) の式より` },
            {
              k: "math",
              t: String.raw`Z_{3m}=\frac12\left\{1-\left(1-\frac{2}{3m}\right)^{m}\left(1-\frac{4}{3m}\right)^{m}\left(1-\frac{2}{m}\right)^{m}\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**極限。** 一般に $\displaystyle\lim_{m\to\infty}\left(1-\frac cm\right)^{m}=e^{-c}$ である（$\left(1+\dfrac{1}{t}\right)^{t}\to e$ の形に直せばよい）。これを3つに使うと`,
            },
            {
              k: "math",
              t: String.raw`\left(1-\frac{2}{3m}\right)^{m}\to e^{-\frac23},\qquad\left(1-\frac{4}{3m}\right)^{m}\to e^{-\frac43},\qquad\left(1-\frac{2}{m}\right)^{m}\to e^{-2}`,
            },
            { k: "p", t: String.raw`なので、積は` },
            {
              k: "math",
              t: String.raw`e^{-\frac23-\frac43-2}=e^{-4}`,
            },
            { k: "p", t: String.raw`に収束する。したがって` },
            {
              k: "math",
              t: String.raw`\lim_{m\to\infty}Z_{3m}=\frac{1-e^{-4}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\dfrac{1-e^{-4}}{2}=0.4908\cdots$ で、$\dfrac12$ よりわずかに小さい。表の総期待枚数が $\dfrac{m}{3m}+\dfrac{2m}{3m}+\dfrac{m}{m}=2$ と有限にとどまるので、偶奇がきれいに半々にはならない。`,
            },
          ],
          pitfalls: [
            String.raw`$\left(1-\dfrac cm\right)^{m}\to e^{-c}$ を3つのかたまりに別々に使う。指数の和が $-4$ になる。`,
            String.raw`$m=1$ では $p_{k}=1$ となる硬貨があるが、極限を考えるので $m$ が大きいところだけ見ればよい。`,
          ],
          check: String.raw`$m=2000$ で $Z_{3m}=0.490856423$ となり、$\dfrac{1-e^{-4}}{2}=0.490842181$ に近づいた。`,
        },
      ],
    },
    {
      no: 5,
      field: "複素数平面・整数",
      topics: ["1の累乗根", "絶対値による絞り込み", "解と係数の関係", "すべて求める"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$-10\\leqq a,b\\leqq10$ を全探索し、2解がともに $\\alpha^{n}=1$ となる $n$（$n\\leqq399$）をもつ組を集めると、$\\left(-2,1\\right),\\left(-1,1\\right),\\left(0,-1\\right),\\left(0,1\\right),\\left(1,1\\right),\\left(2,1\\right)$ の6組だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`整数の組 $\left(a,b\right)$ に対して2次式 $f(x)=x^{2}+ax+b$ を考える。方程式 $f(x)=0$ の複素数の範囲のすべての解 $\alpha$ に対して $\alpha^{n}=1$ となる正の整数 $n$ が存在するような組 $\left(a,b\right)$ をすべて求める`,
          answer: String.raw`$\left(a,b\right)=\left(-2,1\right),\left(-1,1\right),\left(0,1\right),\left(1,1\right),\left(2,1\right),\left(0,-1\right)$ の6組`,
          approach: String.raw`$\alpha^{n}=1$ なら $\left|\alpha\right|=1$ である。解と係数の関係から $b$ と $a$ がごく狭い範囲に閉じこめられるので、あとは1つずつ確かめればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**絶対値で絞る。** $\alpha^{n}=1$ ならば $\left|\alpha\right|^{n}=1$ で、$\left|\alpha\right|>0$ だから $\left|\alpha\right|=1$ である。2つの解を $\alpha,\beta$ とすると、どちらも絶対値 $1$ である。解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta=-a,\qquad\alpha\beta=b`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\left|b\right|=\left|\alpha\right|\left|\beta\right|=1,\qquad\left|a\right|=\left|\alpha+\beta\right|\leqq\left|\alpha\right|+\left|\beta\right|=2`,
            },
            {
              k: "p",
              t: String.raw`である。$a,b$ は整数だから $b=\pm1$、$a\in\left\{-2,-1,0,1,2\right\}$ の高々10組しかない。`,
            },
            { k: "p", t: String.raw`**$b=1$ のとき。** 判別式は $a^{2}-4$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$a=-2$：$f=\left(x-1\right)^{2}$、解は $1$（重解）。$1^{1}=1$ ✓`,
                String.raw`$a=2$：$f=\left(x+1\right)^{2}$、解は $-1$。$\left(-1\right)^{2}=1$ ✓`,
                String.raw`$a=-1$：$f=x^{2}-x+1$、解は $\cos\dfrac\pi3\pm i\sin\dfrac\pi3$。6乗して $1$ ✓`,
                String.raw`$a=0$：$f=x^{2}+1$、解は $\pm i$。4乗して $1$ ✓`,
                String.raw`$a=1$：$f=x^{2}+x+1$、解は $\cos\dfrac{2\pi}3\pm i\sin\dfrac{2\pi}3$。3乗して $1$ ✓`,
              ],
            },
            {
              k: "p",
              t: String.raw`なので、$b=1$ では $a=-2,-1,0,1,2$ のすべてが条件を満たす。`,
            },
            {
              k: "p",
              t: String.raw`**$b=-1$ のとき。** $\alpha\beta=-1<0$ である。もし解が虚数なら、実数係数なので $\beta=\overline{\alpha}$ となり $\alpha\beta=\left|\alpha\right|^{2}=1$ となって矛盾する。したがって2解はともに実数で、絶対値が $1$ だから $\left\{\alpha,\beta\right\}\subset\left\{1,-1\right\}$ である。積が $-1$ なので $\left\{\alpha,\beta\right\}=\left\{1,-1\right\}$ で`,
            },
            {
              k: "math",
              t: String.raw`a=-\left(1+\left(-1\right)\right)=0,\qquad f(x)=x^{2}-1`,
            },
            {
              k: "p",
              t: String.raw`である。解 $1,-1$ はどちらも条件を満たす ✓。$a\neq0$ のときは $x^{2}+ax-1$ の解が $\dfrac{-a\pm\sqrt{a^{2}+4}}{2}$ で、積が $-1$ かつ和が $-a\neq0$ だから $\pm1$ にはならず、絶対値 $1$ にもならない。`,
            },
            { k: "p", t: String.raw`以上より、求める組は` },
            {
              k: "math",
              t: String.raw`\left(a,b\right)=\left(-2,1\right),\left(-1,1\right),\left(0,1\right),\left(1,1\right),\left(2,1\right),\left(0,-1\right)`,
            },
            { k: "p", t: String.raw`の6組である。` },
            {
              k: "note",
              t: String.raw`$b=1$ の5つは、$x^{2}+ax+1$ が $1,-1,i,\omega$ などの「1の累乗根」を解にもつ場合をすべて並べたものである。虚数解のときは $\alpha+\overline{\alpha}=2\cos\theta=-a$ で、$\cos\theta$ が $0,\pm\dfrac12$ の場合にあたる。`,
            },
          ],
          pitfalls: [
            String.raw`$\left|b\right|=1$ と $\left|a\right|\leqq2$ まで絞ってから、10組を1つずつ確かめる。絞らずに考え始めると終わらない。`,
            String.raw`$b=-1$ で虚数解が起こり得ないことを、実数係数の共役性から示す。`,
            String.raw`$\alpha=0$ は $\alpha^{n}=1$ を満たさない。$b=0$ は除かれる（$\left|b\right|=1$ から自動的に除かれている）。`,
          ],
          check: String.raw`$-10\leqq a,b\leqq10$ を全探索すると、条件を満たすのはこの6組だけだった。`,
        },
      ],
    },
  ],
};
