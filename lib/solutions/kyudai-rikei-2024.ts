import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2024年度（令和6年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。面積 |a^2-1|√(a^2+2) を -1 < a < 1 で描く。 */
const AREA24 = (a: number): number => Math.abs(a * a - 1) * Math.sqrt(a * a + 2);

/** 第4問(3)の図。5×5 の格子点 25 個。 */
const GRID5 = Array.from({ length: 25 }, (_, i) => ({
  k: "dot" as const,
  at: [1 + (i % 5), 1 + Math.floor(i / 5)] as [number, number],
}));

/** 第2問の図。1 の8乗根のうち ±1 を除いた6個。 */
const ROOT24 = (k: number): [number, number] => [
  Math.cos((Math.PI * k) / 4),
  Math.sin((Math.PI * k) / 4),
];

export const kyudaiRikei2024: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル",
      topics: ["外積", "三角形の面積", "共線条件", "3次関数の最大"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-3$ から $3$ まで $0.01$ 刻みに動かして、三角形の面積が $\\left|a^{2}-1\\right|\\sqrt{a^{2}+2}$ と小数9桁まで一致することを確かめた",
          "$-1<a<1$ を $40$ 万点に刻んで面積の最大を探すと $a=0$ で $1.4142135624=\\sqrt2$ となった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a\ne-1$、$a\ne1$ のとき、3点 $\mathrm{P},\mathrm{Q},\mathrm{R}$ が一直線上にないことを示す`,
          answer: String.raw`$\overrightarrow{\mathrm{PQ}}\times\overrightarrow{\mathrm{PR}}=2\left(a^{2}-1\right)(-1,\,-a,\,1)\ne\vec0$`,
          approach: String.raw`一直線上にある $\Longleftrightarrow$ $\overrightarrow{\mathrm{PQ}}$ と $\overrightarrow{\mathrm{PR}}$ が平行。外積を計算して $\vec0$ でないことを言えばよい。$a^{2}-1$ がきれいにくくり出せる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PQ}}=(2,\,0,\,2),\qquad\overrightarrow{\mathrm{PR}}=\left(a+1,\;a^{2}-1,\;a^{3}+1\right)`,
            },
            { k: "p", t: String.raw`である。外積を計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\overrightarrow{\mathrm{PQ}}\times\overrightarrow{\mathrm{PR}}
&=\left(0\cdot\left(a^{3}+1\right)-2\left(a^{2}-1\right),\;\;2(a+1)-2\left(a^{3}+1\right),\;\;2\left(a^{2}-1\right)-0\right)\\[1mm]
&=\left(-2\left(a^{2}-1\right),\;-2a\left(a^{2}-1\right),\;2\left(a^{2}-1\right)\right)\\[1mm]
&=2\left(a^{2}-1\right)(-1,\,-a,\,1)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（第2成分は $2(a+1)-2\left(a^{3}+1\right)=-2a\left(a^{2}-1\right)$）。$(-1,-a,1)$ は第1成分が $-1\ne0$ なので、どんな $a$ でも $\vec0$ ではない。`,
            },
            {
              k: "p",
              t: String.raw`よって $a\ne\pm1$ のとき $a^{2}-1\ne0$ だから $\overrightarrow{\mathrm{PQ}}\times\overrightarrow{\mathrm{PR}}\ne\vec0$、すなわち $\overrightarrow{\mathrm{PQ}}$ と $\overrightarrow{\mathrm{PR}}$ は平行でない。したがって3点 $\mathrm{P},\mathrm{Q},\mathrm{R}$ は一直線上にない。`,
            },
            {
              k: "note",
              t: String.raw`外積を使わないなら、$\overrightarrow{\mathrm{PR}}=k\overrightarrow{\mathrm{PQ}}$ とおいて成分を比べる。第2成分から $a^{2}-1=0$ が出てしまうので、$a\ne\pm1$ では不可能、という議論になる。`,
            },
          ],
          pitfalls: [
            String.raw`$a^{3}+1=(a+1)\left(a^{2}-a+1\right)$、$a^{2}-1=(a+1)(a-1)$ なので $a=-1$ では $\overrightarrow{\mathrm{PR}}=\vec0$（$\mathrm{R}=\mathrm{P}$）になる。$a=1$ では $\mathrm{R}=\mathrm{Q}$ である。除外されている理由はここにある。`,
            String.raw`外積の第2成分は符号が逆になる。$\left(u_3v_1-u_1v_3\right)$ の順で書く。`,
          ],
          check: String.raw`$a=0$ で外積は $(2,0,-2)$、$a=2$ で $(-6,-12,6)=2\cdot3\cdot(-1,-2,1)$ となり、どちらも公式と合う。`,
        },
        {
          label: "(2)",
          task: String.raw`$-1<a<1$ のとき三角形 $\mathrm{PQR}$ の面積の最大値を求める`,
          answer: String.raw`$\sqrt2$（$a=0$ のとき）`,
          approach: String.raw`面積は外積の大きさの半分なので、(1) の結果から $\left|a^{2}-1\right|\sqrt{a^{2}+2}$ になる。$t=a^{2}$ とおいて、面積の2乗を $t$ の3次関数として調べる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
S&=\frac12\left|\overrightarrow{\mathrm{PQ}}\times\overrightarrow{\mathrm{PR}}\right|
=\frac12\cdot2\left|a^{2}-1\right|\sqrt{1+a^{2}+1}\\[1mm]
&=\left|a^{2}-1\right|\sqrt{a^{2}+2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$-1<a<1$ では $a^{2}-1<0$ だから $\left|a^{2}-1\right|=1-a^{2}$ で、$t=a^{2}$ とおくと $0\le t<1$ で`,
            },
            { k: "math", t: String.raw`S=(1-t)\sqrt{t+2}` },
            { k: "p", t: String.raw`である。$S>0$ なので $S^{2}$ の最大を調べればよい。` },
            {
              k: "math",
              t: String.raw`g(t)=S^{2}=(1-t)^{2}(t+2)`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
g'(t)&=-2(1-t)(t+2)+(1-t)^{2}=(1-t)\bigl\{-2(t+2)+(1-t)\bigr\}\\[1mm]
&=(1-t)(-3t-3)=-3(1-t)(t+1)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$0\le t<1$ では $1-t>0$、$t+1>0$ なので $g'(t)<0$、すなわち $g$ は**つねに減少**する。よって $t=0$ で最大で`,
            },
            { k: "math", t: String.raw`g(0)=1^{2}\cdot2=2,\qquad S=\sqrt2` },
            { k: "p", t: String.raw`である。$t=a^{2}=0$ すなわち $a=0$ のときで、求める最大値は $\sqrt2$ である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$-1<a<1$ における面積 $S=\left(1-a^{2}\right)\sqrt{a^{2}+2}$。$a=0$ で最大 $\sqrt2=1.414$ をとり、$a\to\pm1$ で $0$ に近づく。`,
                view: [-1.25, 1.25, -0.25, 1.75],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: AREA24, from: -1, to: 1 },
                  { k: "dot", at: [0, Math.SQRT2], label: "(0, √2)", place: "above-right" },
                  { k: "dot", at: [-1, 0], label: "", place: "below" },
                  { k: "dot", at: [1, 0], label: "", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$-1<a<1$ は**開区間**なので $a=\pm1$ は入らない。そこでは3点が一直線上に並び、三角形にならない。`,
            String.raw`$\sqrt{\;}$ のまま微分せず、$S^{2}$ を調べる。$S>0$ なので $S^{2}$ の最大と $S$ の最大は同じところで起きる。`,
            String.raw`$g'(t)=-3(1-t)(t+1)$ は $0\le t<1$ で符号が変わらない。端点 $t=0$ が最大になる形で、「$g'=0$ を解く」型の問題ではない。`,
          ],
          check: String.raw`$a$ を $-1$ から $1$ まで $40$ 万点に刻んで直接面積を計算すると、最大は $a=0$ での $1.4142135624$ で、$\sqrt2$ と一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["因数分解", "1 の n 乗根", "絶対値", "集合として一致する条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$1$ の8乗根8個を $f(z)=z^{6}+z^{4}+z^{2}+1$ に代入すると、$\\pm1$ 以外の6個だけが $0$ になり、どれも絶対値が $1$ であることを確かめた",
          "$1$ の8乗根すべてを $w$ の候補として試すと、条件をみたすのは $w=1,-1$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(z)=0$ をみたすすべての複素数 $z$ に対して $\left|z\right|=1$ が成り立つことを示す`,
          answer: String.raw`$f(z)=\left(z^{2}+1\right)\left(z^{4}+1\right)$ で、$z^{2}=-1$ または $z^{4}=-1$ だから $\left|z\right|^{2}=1$ または $\left|z\right|^{4}=1$`,
          approach: String.raw`$z^{4}$ でくくると $z^{2}+1$ が共通因数として見える。因数分解してしまえば、絶対値をとるだけで済む。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f(z)=z^{4}\left(z^{2}+1\right)+\left(z^{2}+1\right)=\left(z^{2}+1\right)\left(z^{4}+1\right)`,
            },
            { k: "p", t: String.raw`なので、$f(z)=0$ は $z^{2}=-1$ または $z^{4}=-1$ と同値である。` },
            {
              k: "p",
              t: String.raw`**絶対値をとる。** $\left|z^{n}\right|=\left|z\right|^{n}$ なので`,
            },
            {
              k: "steps",
              items: [
                String.raw`$z^{2}=-1$ のとき $\left|z\right|^{2}=\left|-1\right|=1$`,
                String.raw`$z^{4}=-1$ のとき $\left|z\right|^{4}=\left|-1\right|=1$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$\left|z\right|$ は $0$ 以上の実数だから、どちらの場合も $\left|z\right|=1$ である。`,
            },
            {
              k: "note",
              t: String.raw`$\left(z^{2}-1\right)f(z)=z^{8}-1$ なので、$f(z)=0$ の解は「$1$ の $8$ 乗根のうち $\pm1$ でないもの」6個である。この見方は (2) で効いてくる。`,
            },
          ],
          pitfalls: [
            String.raw`$z^{4}+1=0$ の解を具体的に求める必要はない。絶対値だけなら $\left|z\right|^{4}=1$ から直ちに出る。`,
            String.raw`$\left|z\right|^{4}=1$ から $\left|z\right|=1$ と言えるのは $\left|z\right|\ge0$ の実数だからである。複素数の4乗根は4つあるが、ここは実数の話。`,
          ],
          check: String.raw`$1$ の8乗根8個を代入すると、$f$ が $0$ になるのは $\pm1$ 以外の6個で、どれも絶対値が $1$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$f(z)=0$ をみたすすべての $z$ に対して $f(wz)=0$ が成り立つような複素数 $w$ をすべて求める`,
          answer: String.raw`$w=1,\;-1$`,
          approach: String.raw`$f(z)=0$ の解全体を $S$ とおくと、条件は $wS\subset S$ である。$S$ は有限集合で、$w\ne0$ なら $z\mapsto wz$ は単射だから、じつは $wS=S$ になる。$S$ が「$1$ の8乗根から $\pm1$ を除いたもの」だと分かれば、$w$ も $1$ の8乗根に限られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left(z^{2}-1\right)f(z)=z^{8}-1$ だから、$f(z)=0$ の解全体は`,
            },
            {
              k: "math",
              t: String.raw`S=\left\{\,z\;\middle|\;z^{8}=1\,\right\}\setminus\{1,\,-1\}`,
            },
            {
              k: "p",
              t: String.raw`である。$z^{8}=1$ の解は $\zeta_k=\cos\dfrac{k\pi}{4}+i\sin\dfrac{k\pi}{4}$（$k=0,1,\dots,7$）の8個なので、$S$ は $k=1,2,3,5,6,7$ に当たる6個である。`,
            },
            {
              k: "p",
              t: String.raw`**$w$ は $1$ の8乗根に限られる。** 条件は「すべての $z\in S$ に対して $wz\in S$」である。$z=i\in S$ をとると $wi\in S$ なので $w=\dfrac{wi}{i}$ は $1$ の8乗根どうしの商、つまり`,
            },
            { k: "math", t: String.raw`w^{8}=\frac{(wi)^{8}}{i^{8}}=\frac11=1` },
            { k: "p", t: String.raw`をみたす。よって $w=\zeta_k$ のいずれかである。` },
            {
              k: "p",
              t: String.raw`**$8$ 通りを調べる。** $\zeta_k$ を掛けるのは「偏角を $45^\circ\times k$ 回す」ことである。$S$ は $45^\circ$ 刻みの8方向から $0^\circ$ と $180^\circ$ を抜いたものなので、回したあとに $0^\circ$ や $180^\circ$ が現れてはいけない。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k=0$（$w=1$）：$S$ はそのまま。◯`,
                String.raw`$k=4$（$w=-1$）：$45^\circ\to225^\circ$、$90^\circ\to270^\circ$、$135^\circ\to315^\circ$ で $S$ に戻る。◯`,
                String.raw`$k=1,3,5,7$（$45^\circ$ の奇数倍）：$135^\circ$ が $180^\circ$ に、または $45^\circ$ が $0^\circ$ に移る。×`,
                String.raw`$k=2,6$（$\pm90^\circ$）：$90^\circ$ が $180^\circ$ か $0^\circ$ に移る。×`,
              ],
            },
            { k: "p", t: String.raw`したがって` },
            { k: "math", t: String.raw`w=1,\qquad w=-1` },
            { k: "p", t: String.raw`の2つである。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$f(z)=0$ の解 $S$（黒丸、6個）と、$S$ に入らない $1$ の8乗根 $\pm1$（$\circ$ 印の位置）。$w$ を掛けると全体が回転する。$0^\circ$ と $180^\circ$ の穴の位置が変わらない回転は $0^\circ$ と $180^\circ$ だけである。`,
                view: [-1.95, 1.95, -1.35, 1.35],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [Math.cos(t), Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "dot", at: ROOT24(1), label: "", place: "above-right" },
                  { k: "dot", at: ROOT24(2), label: "i", place: "above" },
                  { k: "dot", at: ROOT24(3), label: "", place: "above-left" },
                  { k: "dot", at: ROOT24(5), label: "", place: "below-left" },
                  { k: "dot", at: ROOT24(6), label: "-i", place: "below" },
                  { k: "dot", at: ROOT24(7), label: "", place: "below-right" },
                  { k: "text", at: [1.0, -0.12], label: "1 は解でない", place: "below" },
                  { k: "text", at: [-1.0, -0.12], label: "-1 も解でない", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`条件は「すべての $z$ について」である。1つの $z$ でうまくいく $w$ を見つけただけでは足りない。`,
            String.raw`$\left|w\right|=1$ だけでは絞り切れない。$wz$ が $S$ の元という「位置」の条件まで使う。`,
            String.raw`$w$ を $1$ の8乗根に限ってよい理由（$z$ と $wz$ がどちらも $1$ の8乗根だから商も $1$ の8乗根）を書いておく。これを飛ばすと、候補が無限にあるまま場合分けすることになる。`,
          ],
          check: String.raw`$1$ の8乗根8個すべてを $w$ の候補として、$S$ の6個に掛けて $f$ の値を見ると、条件をみたすのは $w=1$ と $w=-1$ だけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["階乗", "不等式による絞り込み", "大小の評価", "不定方程式"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\le a<b\\le60$ で $2\\cdot a!=b!$ をみたす組を全探索すると $(a,b)=(1,2)$ だけだった",
          "$1\\le a,b,c\\le39$ で $a!+b!=2\\cdot c!$ をみたす組を全探索すると、$39$ 組すべてが $a=b=c$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`自然数 $a,b$ が $a<b$ をみたすとき $\dfrac{b!}{a!}\ge b$ を示す`,
          answer: String.raw`$\dfrac{b!}{a!}=(a+1)(a+2)\cdots b$ は $b$ を因数にもち、他の因数はすべて $1$ 以上`,
          approach: String.raw`約分すると連続する整数の積になる。そこに $b$ が入っていて、残りはすべて $1$ 以上だから、積は $b$ 以上である。`,
          blocks: [
            { k: "p", t: String.raw`$a<b$ なので $b!$ は $a!$ で割り切れて` },
            {
              k: "math",
              t: String.raw`\frac{b!}{a!}=(a+1)(a+2)\cdots(b-1)\,b`,
            },
            {
              k: "p",
              t: String.raw`である（$b-a$ 個の整数の積）。$a\ge1$ より因数はすべて $2$ 以上、とくに $1$ 以上で、しかも最後の因数が $b$ である。`,
            },
            {
              k: "p",
              t: String.raw`$b$ 以外の因数の積を $K$ とおくと $K\ge1$（因数が1つもないとき、つまり $b=a+1$ のときは $K=1$）だから`,
            },
            { k: "math", t: String.raw`\frac{b!}{a!}=K\,b\ge b` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`等号が成り立つのは $K=1$、すなわち $b=a+1$ のときである。このことは (2) で使う。`,
            },
          ],
          pitfalls: [
            String.raw`$\frac{b!}{a!}$ は「$b$ から下へ $b-a$ 個」の積である。$b$ が因数に入っていることが要点で、ここを言わないと $\ge b$ が出ない。`,
            String.raw`$b=a+1$ のときは積が $b$ 1個だけになる。この端の場合も込みで成り立つ。`,
          ],
          check: String.raw`$a=2,b=5$ で $\frac{120}{2}=60\ge5$、$a=4,b=5$ で $\frac{120}{24}=5\ge5$（等号）となり、どちらも正しい。`,
        },
        {
          label: "(2)",
          task: String.raw`$2\cdot a!=b!$ をみたす自然数の組 $(a,b)$ をすべて求める`,
          answer: String.raw`$(a,b)=(1,2)$`,
          approach: String.raw`$b!=2\,a!>a!$ だから $b>a$ である。すると (1) が使えて $\dfrac{b!}{a!}=2\ge b$、つまり $b$ が $2$ 以下に押さえ込まれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$b!=2\cdot a!>a!$ である。階乗は $1!\le2!\le3!\le\cdots$ と（広義）増加なので、$b!>a!$ から $b>a$ がしたがう。`,
            },
            { k: "p", t: String.raw`そこで (1) が使えて` },
            { k: "math", t: String.raw`2=\frac{b!}{a!}\ge b` },
            {
              k: "p",
              t: String.raw`すなわち $b\le2$ である。一方 $b>a\ge1$ より $b\ge2$ だから $b=2$ で、$2\cdot a!=2$ より $a!=1$、$a=1$ である。`,
            },
            { k: "math", t: String.raw`(a,b)=(1,2)` },
            { k: "p", t: String.raw`は実際 $2\cdot1!=2=2!$ をみたす。` },
          ],
          pitfalls: [
            String.raw`まず $b>a$ を言う。これがないと (1) が使えない。`,
            String.raw`$a!=1$ の解は自然数の範囲では $a=1$ だけである（$0!=1$ だが $0$ は自然数に入れない）。`,
          ],
          check: String.raw`$1\le a<b\le60$ を全探索すると $(1,2)$ だけだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$a!+b!=2\cdot c!$ をみたす自然数の組 $(a,b,c)$ をすべて求める`,
          answer: String.raw`$(a,b,c)=(n,n,n)$（$n$ は任意の自然数）`,
          approach: String.raw`$a=b$ なら $a!=c!$ となって $c=a$。$a\ne b$ のときは、大きいほうを $b$ として「$c<b$」を示し、$2\cdot c!\le2(b-1)!$ と $a!+b!>b!=b\,(b-1)!$ を突き合わせると $b<2$ となって矛盾する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$a=b$ のとき。** $2\cdot a!=2\cdot c!$ より $a!=c!$ である。階乗は自然数の範囲で単射（$1!=1,2!=2,3!=6,\dots$ とすべて異なる）だから $c=a$。よって $(n,n,n)$ はすべて解である。`,
            },
            {
              k: "p",
              t: String.raw`**$a\ne b$ のとき。** $a,b$ は入れ替えても式が変わらないので $a<b$ としてよい。`,
            },
            { k: "p", t: String.raw`$a!<b!$ だから` },
            {
              k: "math",
              t: String.raw`b!<a!+b!<2\cdot b!`,
            },
            {
              k: "p",
              t: String.raw`である。真ん中が $2\cdot c!$ だから $2\cdot c!<2\cdot b!$、すなわち $c!<b!$ で $c<b$、つまり $c\le b-1$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`2\cdot c!\le2\,(b-1)!`,
            },
            { k: "p", t: String.raw`である。一方` },
            {
              k: "math",
              t: String.raw`2\cdot c!=a!+b!>b!=b\,(b-1)!`,
            },
            { k: "p", t: String.raw`なので、2つを合わせて` },
            {
              k: "math",
              t: String.raw`b\,(b-1)!<2\,(b-1)!\quad\Longrightarrow\quad b<2`,
            },
            {
              k: "p",
              t: String.raw`となる。しかし $b>a\ge1$ より $b\ge2$ であり、矛盾する。よって $a\ne b$ の解はない。`,
            },
            { k: "p", t: String.raw`以上より求める組は` },
            { k: "math", t: String.raw`(a,b,c)=(n,n,n)\quad(n=1,2,3,\dots)` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「すべて求めよ」なので、$a=b=c$ という**無限個**の解を答えとして書く。1組だけ挙げて終わりにしない。`,
            String.raw`$a\ne b$ のとき「$a<b$ としてよい」と断る。式が $a,b$ について対称だから許される。`,
            String.raw`$2\cdot c!\le2(b-1)!$ と $2\cdot c!>b\,(b-1)!$ という2つの評価を挟み撃ちにする。$(b-1)!>0$ で割れるのがきれいなところである。`,
          ],
          check: String.raw`$1\le a,b,c\le39$ を全探索すると解は $39$ 組あり、すべて $a=b=c$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "場合の数",
      topics: ["格子点", "傾きによる分類", "直線の本数", "数え上げ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3,4,5$ について、格子点の2点組からできる直線をすべて作って重複を除き、通る点が3個以上のものを数えると $8,\;14,\;32$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$L(3)$ を求める`,
          answer: String.raw`$L(3)=8$`,
          approach: String.raw`$3\times3$ では、3点以上を通る直線は「3点ちょうどを通る直線」である。横・縦・斜めを数え上げればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$3\times3$ の格子点は9個で、横の並びが3本、縦の並びが3本ある。斜めは傾き $1$ と $-1$ の対角線が1本ずつである。`,
            },
            {
              k: "p",
              t: String.raw`傾きが $\pm2$、$\pm\dfrac12$ などの直線はどうか。たとえば傾き $2$ で3点並ぶには $y$ が $4$ だけ増える必要があるが、$y$ の幅は $3-1=2$ しかない。よって不可能である。`,
            },
            { k: "math", t: String.raw`L(3)=3+3+2=8` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$3\times3$ の格子点と、3点を通る8本の直線（横3・縦3・対角線2）。`,
                view: [0.1, 3.9, 0.55, 3.45],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [1, 1], b: [3, 1] },
                  { k: "seg", a: [1, 2], b: [3, 2] },
                  { k: "seg", a: [1, 3], b: [3, 3] },
                  { k: "seg", a: [1, 1], b: [1, 3] },
                  { k: "seg", a: [2, 1], b: [2, 3] },
                  { k: "seg", a: [3, 1], b: [3, 3] },
                  { k: "seg", a: [1, 1], b: [3, 3] },
                  { k: "seg", a: [1, 3], b: [3, 1] },
                  { k: "dot", at: [1, 1], label: "", place: "below-left" },
                  { k: "dot", at: [2, 1], label: "", place: "below" },
                  { k: "dot", at: [3, 1], label: "", place: "below-right" },
                  { k: "dot", at: [1, 2], label: "", place: "left" },
                  { k: "dot", at: [2, 2], label: "", place: "right" },
                  { k: "dot", at: [3, 2], label: "", place: "right" },
                  { k: "dot", at: [1, 3], label: "", place: "above-left" },
                  { k: "dot", at: [2, 3], label: "", place: "above" },
                  { k: "dot", at: [3, 3], label: "", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`中央の点を通る斜めの直線は対角線2本だけである。「縦横斜めで8本」は三目並べと同じ数え方になる。`,
          ],
          check: String.raw`9点から2点を選ぶ36通りの直線をすべて作って重複を除き、3点以上通るものを数えると8本だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$L(4)$ を求める`,
          answer: String.raw`$L(4)=14$`,
          approach: String.raw`横・縦に加えて、傾き $\pm1$ の斜めが何本あるかを数える。傾きが $\pm2$ 以上や $\pm\frac12$ の直線はまだ3点を乗せられない。`,
          blocks: [
            { k: "p", t: String.raw`横4本、縦4本である。` },
            {
              k: "p",
              t: String.raw`**傾き $1$。** 直線 $y=x+k$ 上の格子点の個数は、$k=-3,-2,\dots,3$ に対して $1,2,3,4,3,2,1$ である。3個以上なのは $k=-1,0,1$ の**3本**。傾き $-1$ も対称に**3本**。`,
            },
            {
              k: "p",
              t: String.raw`**その他の傾き。** 傾きが $\dfrac qp$（$p,q$ は互いに素、$p,q\ge1$）の直線に3点が乗るには、$x$ が $2p$、$y$ が $2q$ だけ増える必要がある。$4\times4$ では幅も高さも $3$ なので $2p\le3$ かつ $2q\le3$、つまり $p=q=1$ しかない。これは傾き $\pm1$ の場合である。`,
            },
            { k: "math", t: String.raw`L(4)=4+4+3+3=14` },
          ],
          pitfalls: [
            String.raw`傾き $\pm1$ の「3点だけ通る」短い対角線を忘れない。長い対角線2本だけでは足りない。`,
            String.raw`「3点乗せるには $x$ が $2p$ 増える」という評価が効く。$4\times4$ で傾き $2$ が入らない理由がこれである。`,
          ],
          check: String.raw`16点から作れる直線をすべて列挙すると、3点以上通るものは14本だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$L(5)$ を求める`,
          answer: String.raw`$L(5)=32$`,
          approach: String.raw`$5\times5$ になると幅・高さが $4$ になり、傾き $\pm2$、$\pm\dfrac12$ の直線にも3点が乗るようになる。傾きごとに本数を数える。`,
          blocks: [
            { k: "p", t: String.raw`横5本、縦5本である。` },
            {
              k: "p",
              t: String.raw`**傾き $\pm1$。** $y=x+k$ 上の点の個数は $k=-4,\dots,4$ に対して $1,2,3,4,5,4,3,2,1$ なので、3個以上は **5本**。傾き $-1$ も **5本**。`,
            },
            {
              k: "p",
              t: String.raw`**傾き $2$。** 方向ベクトルを $(1,2)$ とすると、3点は $(x,y),(x+1,y+2),(x+2,y+4)$ である。$y+4\le5$ より $y=1$、$x+2\le5$ より $x=1,2,3$ の **3本**。4点だと $y$ が $6$ 増えて範囲外なので、これ以上は乗らない。`,
            },
            {
              k: "p",
              t: String.raw`**傾き $-2$、$\dfrac12$、$-\dfrac12$。** 対称性から、それぞれ **3本** ずつ。合わせて $3\times4=12$ 本。`,
            },
            {
              k: "p",
              t: String.raw`**それ以外の傾き。** 傾き $\dfrac qp$（$p,q$ 互いに素）で3点乗せるには $2p\le4$ かつ $2q\le4$、つまり $p\le2$、$q\le2$ が必要である。互いに素な組は $(p,q)=(1,1),(1,2),(2,1)$ で、すでに数えた傾き $\pm1,\pm2,\pm\dfrac12$ に尽きる。`,
            },
            { k: "math", t: String.raw`L(5)=5+5+5+5+12=32` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$5\times5$ で傾き $2$ の直線は3本。$(1,1),(2,3),(3,5)$ のように3点ずつ乗る。$4\times4$ までは高さが足りず、この型が現れない。`,
                view: [0.2, 5.8, 0.75, 5.25],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [1, 1], b: [3, 5] },
                  { k: "seg", a: [2, 1], b: [4, 5] },
                  { k: "seg", a: [3, 1], b: [5, 5] },
                  ...GRID5,
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$n=5$ で初めて傾き $\pm2$、$\pm\frac12$ が登場する。(1)(2) と同じ数え方のままだと $20$ になってしまう。`,
            String.raw`傾き $2$ の直線を「$4$ 本」と数えないこと。$y=1$ からしか始められないので3本である。`,
            String.raw`同じ直線を2回数えないよう、傾きで分類してから本数を数える。`,
          ],
          check: String.raw`25点から作れる直線をすべて列挙して重複を除くと、3点以上通るものは32本だった（同じ方法で $L(3)=8$、$L(4)=14$ も再現した）。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["部分積分", "漸化式", "はさみうちの原理", "極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$m,n=1,2,3$ について $I(m+1,n+1)$ を数値積分し、$e^{m+e+1}-(m+1)I(m,n+1)-(n+1)I(m,n)$ と相対誤差 $10^{-6}$ 以内で一致することを確かめた",
          "$I(2,n)$ を $n=1,5,20,80$ で数値積分すると $46.10,\;27.58,\;11.52,\;3.51$ と減っていき、評価 $\\frac{e^{m+e+1}}{n+1}$ の下にあった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$I(m+1,n+1)$ を $I(m,n+1)$、$I(m,n)$、$m$、$n$ で表す`,
          answer: String.raw`$I(m+1,n+1)=e^{m+e+1}-(m+1)I(m,n+1)-(n+1)I(m,n)$`,
          approach: String.raw`$e^{x}$ を積分する側、$x^{m+1}(\log x)^{n+1}$ を微分する側にして部分積分する。微分すると $x^{m}(\log x)^{n+1}$ と $x^{m}(\log x)^{n}$ の2つが出て、ちょうど $I(m,n+1)$ と $I(m,n)$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$u=x^{m+1}(\log x)^{n+1}$、$v'=e^{x}$ として部分積分する。`,
            },
            {
              k: "math",
              t: String.raw`I(m+1,n+1)=\Bigl[x^{m+1}e^{x}(\log x)^{n+1}\Bigr]_{1}^{e}-\int_{1}^{e}e^{x}\left\{x^{m+1}(\log x)^{n+1}\right\}'dx`,
            },
            {
              k: "p",
              t: String.raw`**境界の値。** $x=1$ では $\log1=0$ で、$n+1\ge1$ だから $(\log1)^{n+1}=0$。$x=e$ では $\log e=1$ なので`,
            },
            {
              k: "math",
              t: String.raw`\Bigl[\;\cdots\Bigr]_{1}^{e}=e^{m+1}\cdot e^{e}\cdot1-0=e^{m+e+1}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**微分する側。** 積の微分で` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left\{x^{m+1}(\log x)^{n+1}\right\}'
&=(m+1)x^{m}(\log x)^{n+1}+x^{m+1}(n+1)(\log x)^{n}\cdot\frac1x\\[1mm]
&=(m+1)x^{m}(\log x)^{n+1}+(n+1)x^{m}(\log x)^{n}
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。これに $e^{x}$ を掛けて $1$ から $e$ まで積分すると、定義より` },
            {
              k: "math",
              t: String.raw`(m+1)I(m,n+1)+(n+1)I(m,n)`,
            },
            { k: "p", t: String.raw`になる。したがって` },
            {
              k: "math",
              t: String.raw`I(m+1,n+1)=e^{m+e+1}-(m+1)I(m,n+1)-(n+1)I(m,n)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$e^{m+1}\cdot e^{e}=e^{m+e+1}$ である。$e^{m+1}$ と $e^{e}$ を掛け忘れない。`,
            String.raw`$(\log x)^{n+1}$ の微分は $(n+1)(\log x)^{n}\cdot\frac1x$ で、$\frac1x$ が付く。これが $x^{m+1}$ の次数を1つ下げて $x^{m}$ にする。`,
            String.raw`$x=1$ での値が $0$ になるのは $n+1\ge1$ だから。$n$ は自然数なのでつねに成り立つ。`,
          ],
          check: String.raw`$m,n=1,2,3$ の9通りで両辺を数値積分すると、相対誤差 $10^{-6}$ 以内で一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`すべての自然数 $m$ に対して $\displaystyle\lim_{n\to\infty}I(m,n)=0$ を示す`,
          answer: String.raw`$0<I(m,n)\le\dfrac{e^{m+e+1}}{n+1}\to0$ ではさみうち`,
          approach: String.raw`$t=\log x$ と置換すると区間が $[0,1]$ になり、$(\log x)^{n}$ が $t^{n}$ になる。残りの因子を定数で上から押さえれば $\int_{0}^{1}t^{n}dt=\frac1{n+1}$ に帰着する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=\log x$ とおくと $x=e^{t}$、$dx=e^{t}dt$ で、$x:1\to e$ のとき $t:0\to1$ である。`,
            },
            {
              k: "math",
              t: String.raw`I(m,n)=\int_{0}^{1}e^{mt}\cdot e^{e^{t}}\cdot t^{n}\cdot e^{t}\,dt=\int_{0}^{1}e^{(m+1)t}e^{e^{t}}t^{n}\,dt`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**上から押さえる。** $0\le t\le1$ では $e^{(m+1)t}\le e^{m+1}$、$e^{t}\le e$ より $e^{e^{t}}\le e^{e}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`0<I(m,n)\le e^{m+1}e^{e}\int_{0}^{1}t^{n}dt=\frac{e^{m+e+1}}{n+1}`,
            },
            {
              k: "p",
              t: String.raw`である（左の不等号は、被積分関数が $0<t\le1$ で正だから）。`,
            },
            {
              k: "p",
              t: String.raw`$m$ を固定すると $e^{m+e+1}$ は定数なので、$n\to\infty$ で右辺は $0$ に収束する。はさみうちの原理より`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}I(m,n)=0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`置換を使わずに、$1\le x\le e$ で $x^{m}e^{x}\le e^{m}e^{e}$、$0\le\log x\le1$ と押さえて $I(m,n)\le e^{m+e}\int_{1}^{e}(\log x)^{n}dx$ としてもよいが、結局 $\int_{1}^{e}(\log x)^{n}dx\to0$ を示すのに同じ置換が要る。はじめから置換したほうが早い。`,
            },
          ],
          pitfalls: [
            String.raw`$(\log x)^{n}\to0$ だから積分も $0$、とは言えない。$x=e$ では $(\log x)^{n}=1$ のままである。積分全体を定数 $\times\frac1{n+1}$ で押さえるのが要点。`,
            String.raw`$e^{e^{t}}$ を $e^{e}$ で押さえるとき、$e^{t}\le e^{1}=e$（$0\le t\le1$）を使う。$e^{e^{t}}\le e^{t}$ などとしない。`,
            String.raw`$m$ は固定して $n$ だけを動かす。$e^{m+e+1}$ は $n$ によらない定数である。`,
          ],
          check: String.raw`$m=2$ で $I(2,n)$ を数値積分すると $n=1,5,20,80$ に対し $46.10,\;27.58,\;11.52,\;3.51$ と減っていき、評価式 $\frac{e^{m+e+1}}{n+1}$ の下にあった。`,
        },
      ],
    },
  ],
};
