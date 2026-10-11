import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2021年度（令和3年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第1問 問2 の図。OA=3、OB=2、∠AOB=60° の三角形と垂心。 */
const BX = 1;
const BY = Math.sqrt(3);
const HX = 1;
const HY = 2 * BY / 3;
/** A から直線 OB に下ろした垂線の足。 */
const FX = 0.75;
const FY = (3 * Math.sqrt(3)) / 4;

/** 第2問の図。 */
const F2 = (x: number) => x * x - x / 2 - 0.5;

/** 第4問の図。四角形 OPFQ の面積 S(p)。 */
const S4 = (p: number) => Math.sqrt(5 * p * p - 6 * p + 13);

export const kyodaiBunkei2021: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "n進法／平面ベクトル",
      topics: ["2進法・4進法", "小数の変換", "垂心", "内積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$6.75=110.11_{(2)}$、$101.0101_{(2)}=5.3125$、積 $=\\frac{2295}{64}=35.859375$ を分数のまま確かめた",
          "$100011.110111_{(2)}$ と $203.313_{(4)}$ がどちらも $35.859375$ になることを確かめた",
          "$\\overrightarrow{\\mathrm{OH}}=\\frac19\\overrightarrow{\\mathrm{OA}}+\\frac23\\overrightarrow{\\mathrm{OB}}$ として座標で $\\left(\\overrightarrow{\\mathrm{OH}}-\\overrightarrow{\\mathrm{OA}}\\right)\\cdot\\overrightarrow{\\mathrm{OB}}=0$、$\\left(\\overrightarrow{\\mathrm{OH}}-\\overrightarrow{\\mathrm{OB}}\\right)\\cdot\\overrightarrow{\\mathrm{OA}}=0$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$6.75$ を2進法で表し、$101.0101_{(2)}$ との積を2進法と4進法で表す`,
          answer: String.raw`$6.75=110.11_{(2)}$、積は $100011.110111_{(2)}=203.313_{(4)}$`,
          approach: String.raw`小数の2進法は「整数部は2で割った余り、小数部は2倍して整数部を拾う」で出る。積は10進法で計算してしまうのがいちばん確実で、$6.75\times5.3125$ は分数にすれば $\frac{27}{4}\cdot\frac{85}{16}$ ときれいに扱える。4進法は、2進法の桁を小数点から2桁ずつ区切るだけでよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$6.75$ を2進法に。** 整数部は $6=110_{(2)}$、小数部は $0.75=\dfrac12+\dfrac14=0.11_{(2)}$ なので`,
            },
            { k: "math", t: String.raw`6.75=110.11_{(2)}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**積を出す。** ` },
            {
              k: "math",
              t: String.raw`101.0101_{(2)}=4+1+\frac14+\frac1{16}=\frac{85}{16}=5.3125`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`6.75\times5.3125=\frac{27}{4}\cdot\frac{85}{16}=\frac{2295}{64}=35.859375`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**2進法に直す。** 整数部 $35=32+2+1=100011_{(2)}$。小数部は $\dfrac{2295}{64}-35=\dfrac{2295-2240}{64}=\dfrac{55}{64}$ で`,
            },
            {
              k: "math",
              t: String.raw`\frac{55}{64}=\frac{32+16+4+2+1}{64}=\frac12+\frac14+\frac1{16}+\frac1{32}+\frac1{64}`,
            },
            { k: "p", t: String.raw`だから $0.110111_{(2)}$ である。よって` },
            { k: "math", t: String.raw`35.859375=100011.110111_{(2)}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**4進法に直す。** $4=2^{2}$ なので、2進法の桁を小数点から左右に2桁ずつ区切り、それぞれを4進法の1桁にすればよい。`,
            },
            {
              k: "math",
              t: String.raw`\underbrace{10}_{2}\,\underbrace{00}_{0}\,\underbrace{11}_{3}\;.\;\underbrace{11}_{3}\,\underbrace{01}_{1}\,\underbrace{11}_{3}`,
            },
            { k: "p", t: String.raw`より` },
            { k: "math", t: String.raw`35.859375=203.313_{(4)}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`検算すると $2\cdot16+0\cdot4+3=35$、$\dfrac34+\dfrac1{16}+\dfrac3{64}=\dfrac{48+4+3}{64}=\dfrac{55}{64}$ で合っている。`,
            },
          ],
          pitfalls: [
            String.raw`4進法への区切りは**小数点から外側へ**2桁ずつである。整数部を左から区切ると桁がずれる（$100011$ は $10|00|11$ であって $10|00|11$ の順を逆にしない）。`,
            String.raw`積は2進法のまま筆算してもよいが、桁上がりが多く間違えやすい。分数に直して計算し、最後に変換するほうが安全である。`,
            String.raw`$\frac{55}{64}$ は分母が $2^{6}$ なので、分子を2のべきの和に分ければ小数部がそのまま読める。`,
          ],
          check: String.raw`$\frac{27}{4}\times\frac{85}{16}=\frac{2295}{64}=35.859375$。$100011.110111_{(2)}=35+\frac{55}{64}=35.859375$、$203.313_{(4)}=35+\frac{55}{64}=35.859375$ で、3つとも一致する。`,
        },
        {
          label: "問2",
          task: String.raw`$\mathrm{OA}=3$、$\mathrm{OB}=2$、$\angle\mathrm{AOB}=60^\circ$ の $\triangle\mathrm{OAB}$ の垂心 $\mathrm{H}$ について、$\overrightarrow{\mathrm{OH}}$ を $\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac19\overrightarrow{\mathrm{OA}}+\dfrac23\overrightarrow{\mathrm{OB}}$`,
          approach: String.raw`垂心は「各頂点から対辺に下ろした垂線の交点」なので、$\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおいて $\overrightarrow{\mathrm{AH}}\perp\overrightarrow{\mathrm{OB}}$ と $\overrightarrow{\mathrm{BH}}\perp\overrightarrow{\mathrm{OA}}$ の2本を内積で書けばよい。内積は3つとも先に計算しておく。`,
          blocks: [
            { k: "p", t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$ とおくと` },
            {
              k: "math",
              t: String.raw`\left|\vec a\right|^{2}=9,\qquad\left|\vec b\right|^{2}=4,\qquad\vec a\cdot\vec b=3\cdot2\cos60^\circ=3`,
            },
            { k: "p", t: String.raw`である。$\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b$ とおく。` },
            {
              k: "p",
              t: String.raw`**2本の垂直条件。** $\mathrm{H}$ は $\mathrm{A}$ から $\mathrm{OB}$ への垂線上にあるので $\overrightarrow{\mathrm{AH}}\cdot\vec b=0$、$\mathrm{B}$ から $\mathrm{OA}$ への垂線上にあるので $\overrightarrow{\mathrm{BH}}\cdot\vec a=0$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AH}}=(s-1)\vec a+t\vec b,\qquad\overrightarrow{\mathrm{BH}}=s\vec a+(t-1)\vec b`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\begin{cases}3(s-1)+4t=0\\[1mm]9s+3(t-1)=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。2本目から $3s+t=1$、すなわち $t=1-3s$。1本目に入れると`,
            },
            {
              k: "math",
              t: String.raw`3s-3+4(1-3s)=-9s+1=0\quad\Longrightarrow\quad s=\frac19`,
            },
            { k: "p", t: String.raw`で、$t=1-\dfrac13=\dfrac23$ である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\frac19\overrightarrow{\mathrm{OA}}+\frac23\overrightarrow{\mathrm{OB}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\mathrm{OA}=3$、$\mathrm{OB}=2$、$\angle\mathrm{AOB}=60^\circ$ の三角形と垂心 $\mathrm{H}$。破線は $\mathrm{B}$ から $\mathrm{OA}$ への垂線と $\mathrm{A}$ から $\mathrm{OB}$ への垂線。$\overrightarrow{\mathrm{OH}}=\frac19\overrightarrow{\mathrm{OA}}+\frac23\overrightarrow{\mathrm{OB}}$。`,
                view: [-0.45, 3.45, -0.55, 2.15],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [3, 0] },
                  { k: "seg", a: [0, 0], b: [BX, BY] },
                  { k: "seg", a: [3, 0], b: [BX, BY] },
                  { k: "seg", a: [BX, BY], b: [BX, 0], dash: true, faint: true },
                  { k: "seg", a: [3, 0], b: [FX, FY], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [3, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [BX, BY], label: "B", place: "above" },
                  { k: "dot", at: [HX, HY], label: "H", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`垂心の条件は2本で足りる。3本目（$\mathrm{O}$ から $\mathrm{AB}$ への垂線）は自動的にみたされるので、連立に加える必要はない。`,
            String.raw`$\overrightarrow{\mathrm{AH}}=\overrightarrow{\mathrm{OH}}-\overrightarrow{\mathrm{OA}}$ である。$\vec a$ の係数が $s-1$ になるところを間違えない。`,
            String.raw`この三角形では $\mathrm{B}$ から $\mathrm{OA}$ への垂線が $\mathrm{OA}$ に垂直なので、$\mathrm{H}$ の「$\mathrm{OA}$ 方向の成分」は $\mathrm{B}$ と同じになる。図を描くと検算になる。`,
          ],
          check: String.raw`$\mathrm{O}(0,0)$、$\mathrm{A}(3,0)$、$\mathrm{B}(1,\sqrt3)$ とすると $\mathrm{OA}=3$、$\mathrm{OB}=2$、$\angle\mathrm{AOB}=60^\circ$ である。$\overrightarrow{\mathrm{OH}}=\frac19(3,0)+\frac23(1,\sqrt3)=\left(1,\frac{2\sqrt3}{3}\right)$ で、$\left(\overrightarrow{\mathrm{OH}}-\overrightarrow{\mathrm{OA}}\right)\cdot\overrightarrow{\mathrm{OB}}=0$、$\left(\overrightarrow{\mathrm{OH}}-\overrightarrow{\mathrm{OB}}\right)\cdot\overrightarrow{\mathrm{OA}}=0$ がどちらも成り立つ。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["絶対値のついた定積分", "符号の切れ目", "区間の分割"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$-1\\le x\\le1$ を $400$ 万等分して $\\left|x^{2}-\\frac x2-\\frac12\\right|$ を数値積分すると $0.791666667$ となり、$\\frac{19}{24}=0.791666667$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\displaystyle\int_{-1}^{1}\left|x^{2}-\frac12x-\frac12\right|dx$ を求める`,
          answer: String.raw`$\dfrac{19}{24}$`,
          approach: String.raw`絶対値の中身の符号が変わるところで区間を分ける。$2$ 倍して $2x^{2}-x-1=(2x+1)(x-1)$ と因数分解できるので、切れ目は $x=-\frac12$ と $x=1$ である。$x=1$ は区間の右端なので、分けるのは1か所だけで済む。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x^{2}-\dfrac x2-\dfrac12=\dfrac{2x^{2}-x-1}{2}=\dfrac{(2x+1)(x-1)}{2}$ である。` },
            {
              k: "p",
              t: String.raw`$f(x)=0$ の解は $x=-\dfrac12,\;1$ で、下に凸だから`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-1\le x\le-\dfrac12$：$f(x)\ge0$`,
                String.raw`$-\dfrac12\le x\le1$：$f(x)\le0$`,
              ],
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\left|f(x)\right|dx=\int_{-1}^{-\frac12}f(x)\,dx-\int_{-\frac12}^{1}f(x)\,dx`,
            },
            { k: "p", t: String.raw`である。原始関数を` },
            {
              k: "math",
              t: String.raw`F(x)=\frac{x^{3}}{3}-\frac{x^{2}}{4}-\frac x2`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`F(-1)=-\frac13-\frac14+\frac12=-\frac1{12},\quad F\left(-\frac12\right)=-\frac1{24}-\frac1{16}+\frac14=\frac7{48},\quad F(1)=-\frac5{12}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_{-1}^{-\frac12}f&=F\left(-\frac12\right)-F(-1)=\frac7{48}+\frac1{12}=\frac{11}{48}\\[1mm]
\int_{-\frac12}^{1}f&=F(1)-F\left(-\frac12\right)=-\frac5{12}-\frac7{48}=-\frac{27}{48}
\end{aligned}`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\left|f(x)\right|dx=\frac{11}{48}+\frac{27}{48}=\frac{38}{48}=\frac{19}{24}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=x^{2}-\frac x2-\frac12$ のグラフ。$x=-\frac12$ と $x=1$ で $x$ 軸を横切り、$-1\le x\le-\frac12$ では上、$-\frac12\le x\le1$ では下にある。求めるのは塗った2つの部分の面積の和 $\frac{19}{24}$。`,
                view: [-1.35, 1.35, -0.85, 1.25],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: F2, bottom: () => 0, from: -1, to: -0.5 },
                  { k: "fillBetween", top: () => 0, bottom: F2, from: -0.5, to: 1 },
                  { k: "curve", f: F2, from: -1.3, to: 1.3 },
                  { k: "dot", at: [-0.5, 0], label: "-1/2", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "1", place: "above-right" },
                  { k: "dot", at: [-1, 1], label: "(-1, 1)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$x=1$ は積分区間の右端とちょうど一致するので、分割は $x=-\frac12$ の1か所だけでよい。$x=1$ でも分けようとすると幅 $0$ の区間が出る。`,
            String.raw`$\int_{-\frac12}^{1}f$ は負の値なので、絶対値を外すときは**符号を反転**して足す。引き算のまま続けない。`,
            String.raw`$\frac{38}{48}$ を約分して $\frac{19}{24}$ にする。`,
          ],
          check: String.raw`$-1\le x\le1$ を $400$ 万等分して $\left|x^{2}-\frac x2-\frac12\right|$ を数値積分すると $0.791666667$ で、$\frac{19}{24}=0.791666667$ と一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率",
      topics: ["条件付き確率", "漸化式", "色の一致", "玉の移動"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2,3,4,5$ について操作を $40$ 万回ずつ模擬すると、確率は $0.66542,\\,0.55550,\\,0.51962,\\,0.50644$ となり、$\\frac12+\\frac1{2\\cdot3^{n-1}}=0.66667,\\,0.55556,\\,0.51852,\\,0.50617$ とよく合っている",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`一連の操作のあと番号 $n$ の箱から取り出した玉を番号 $1$ の箱に入れたとき、番号 $1$ の箱に赤玉と白玉が $1$ 個ずつ入っている確率を求める`,
          answer: String.raw`$\dfrac12+\dfrac1{2\cdot3^{n-1}}=\dfrac{3^{n-1}+1}{2\cdot3^{n-1}}$`,
          approach: String.raw`箱 $1$ には「最初の操作で残ったほうの玉」と「最後に $n$ 番から来た玉」の2個が入る。残ったほうは、$1$ 番から送り出した玉 $C_1$ の**逆の色**である。だから「赤白1個ずつ」は「$n$ 番から来た玉の色 $C_n$ が $C_1$ と同じ」と同値になる。あとは $C_k$ の色が $C_1$ と一致する確率に漸化式を立てればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`番号 $k$ の箱から番号 $k+1$ の箱へ送られる玉の色を $C_k$（$k=1,\dots,n-1$）とし、最後に番号 $n$ の箱から取り出す玉の色を $C_n$ とする。`,
            },
            {
              k: "p",
              t: String.raw`**箱 $1$ の中身。** 箱 $1$ は最初 $\{$赤,白$\}$ で、最初の操作で $C_1$ が出ていくので、残るのは $C_1$ と逆の色の玉1個である。そこへ最後に $C_n$ が入るので、箱 $1$ の2個は`,
            },
            { k: "math", t: String.raw`\left\{\overline{C_1},\;C_n\right\}\qquad\left(\overline{C}\text{ は }C\text{ の逆の色}\right)` },
            { k: "p", t: String.raw`である。これが赤白1個ずつになる条件は $\overline{C_1}\ne C_n$、つまり` },
            { k: "math", t: String.raw`C_n=C_1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**色の受け渡し。** $k\ge1$ のとき、箱 $k+1$ はもともと $\{$赤,白$\}$ で、そこへ $C_k$ が入って3個になる。そこから1個取り出すので`,
            },
            {
              k: "math",
              t: String.raw`P\left(C_{k+1}=C_k\right)=\frac23,\qquad P\left(C_{k+1}\ne C_k\right)=\frac13`,
            },
            {
              k: "p",
              t: String.raw`である（同じ色の玉が2個、逆の色が1個）。これは最後の「番号 $n$ の箱から取り出す」操作にもそのまま当てはまる。`,
            },
            {
              k: "p",
              t: String.raw`**漸化式。** $q_k=P\left(C_k=C_1\right)$ とおく。$q_1=1$ で、$k\ge1$ のとき`,
            },
            {
              k: "math",
              t: String.raw`q_{k+1}=\frac23q_k+\frac13\left(1-q_k\right)=\frac13q_k+\frac13`,
            },
            { k: "p", t: String.raw`である。$\dfrac12$ を引くと` },
            {
              k: "math",
              t: String.raw`q_{k+1}-\frac12=\frac13\left(q_k-\frac12\right)`,
            },
            { k: "p", t: String.raw`なので、$q_1-\dfrac12=\dfrac12$ より` },
            {
              k: "math",
              t: String.raw`q_k=\frac12+\frac12\left(\frac13\right)^{k-1}`,
            },
            { k: "p", t: String.raw`である。求める確率は $q_n$ だから` },
            {
              k: "math",
              t: String.raw`P=\frac12+\frac{1}{2\cdot3^{n-1}}=\frac{3^{n-1}+1}{2\cdot3^{n-1}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=2$ なら $\dfrac23$、$n=3$ なら $\dfrac59$、$n=4$ なら $\dfrac{14}{27}$ である。$n$ を大きくすると、受け渡しのたびに色の記憶が薄れて $\dfrac12$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`箱 $1$ に残る玉は $C_1$ ではなく**その逆の色**である。ここを取り違えると答えが $1-q_n$ になってしまう。`,
            String.raw`$C_k$ 単独の確率（赤である確率）はどの $k$ でも $\frac12$ で、そこからは何も分からない。$C_1$ との**一致**を追うのが要点である。`,
            String.raw`箱 $k+1$ は、玉を受け取った時点で必ず3個（もとの2個＋来た1個）である。途中の箱から玉が減ることはない（$k+1$ 番の箱は、$k+1$ 回目の操作ではじめて1個出す）。`,
            String.raw`最後の「$n$ 番から取り出して $1$ 番へ」も、確率 $\frac23,\frac13$ の同じ受け渡しである。$k=n-1$ から $k=n$ への1歩として数える。`,
          ],
          check: String.raw`$n=2,3,4,5$ について操作を $40$ 万回ずつ模擬すると、確率は $0.66542,\,0.55550,\,0.51962,\,0.50644$ となり、$\frac23=0.66667$、$\frac59=0.55556$、$\frac{14}{27}=0.51852$、$\frac{41}{81}=0.50617$ とよく合っている。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["4点が同一平面上", "外積による面積", "平行四辺形", "2次関数の最小"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$p+q=3$ のもとで $\\mathrm{O},\\mathrm{P},\\mathrm{F},\\mathrm{Q}$ が同一平面上にある（行列式が $0$）ことを $p$ を $30$ 万等分して確かめた",
          "$\\overrightarrow{\\mathrm{OP}}+\\overrightarrow{\\mathrm{OQ}}=\\overrightarrow{\\mathrm{OF}}$ となり $\\mathrm{OPFQ}$ が平行四辺形であることを確かめた",
          "面積 $S=\\left|\\overrightarrow{\\mathrm{OP}}\\times\\overrightarrow{\\mathrm{OQ}}\\right|$ の最小が $3.346640106$（$p=0.600000$）で、$\\frac{2\\sqrt{70}}{5}=3.346640106$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\mathrm{O},\mathrm{F}$ と辺 $\mathrm{AE}$ 上の $\mathrm{P}$、辺 $\mathrm{CG}$ 上の $\mathrm{Q}$ が同一平面上にあるとき、四角形 $\mathrm{OPFQ}$ の面積 $S$ を最小にする $\mathrm{P},\mathrm{Q}$ と、そのときの $S$ を求める`,
          answer: String.raw`$\mathrm{P}\left(1,0,\dfrac35\right)$、$\mathrm{Q}\left(0,2,\dfrac{12}{5}\right)$、$S=\dfrac{2\sqrt{70}}{5}$`,
          approach: String.raw`$\mathrm{P}(1,0,p)$、$\mathrm{Q}(0,2,q)$ とおくと、同一平面の条件は行列式 $=0$ で $p+q=3$ と出る。すると $\overrightarrow{\mathrm{OP}}+\overrightarrow{\mathrm{OQ}}=\overrightarrow{\mathrm{OF}}$ になるので $\mathrm{OPFQ}$ は平行四辺形で、面積は外積の大きさ。あとは $p$ の2次関数の最小である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`辺 $\mathrm{AE}$ は $\mathrm{A}(1,0,0)$ と $\mathrm{E}(1,0,3)$ を結ぶので $\mathrm{P}(1,0,p)$（$0\le p\le3$）、辺 $\mathrm{CG}$ は $\mathrm{C}(0,2,0)$ と $\mathrm{G}(0,2,3)$ を結ぶので $\mathrm{Q}(0,2,q)$（$0\le q\le3$）とおける。`,
            },
            {
              k: "p",
              t: String.raw`**同一平面の条件。** $\mathrm{O}$ が原点なので、$\overrightarrow{\mathrm{OP}},\overrightarrow{\mathrm{OQ}},\overrightarrow{\mathrm{OF}}$ が同じ平面に乗る条件は`,
            },
            {
              k: "math",
              t: String.raw`\begin{vmatrix}1&0&p\\0&2&q\\1&2&3\end{vmatrix}=(6-2q)-2p=0\quad\Longleftrightarrow\quad p+q=3`,
            },
            {
              k: "p",
              t: String.raw`である（行列式を使わないなら、$\overrightarrow{\mathrm{OF}}=s\overrightarrow{\mathrm{OP}}+t\overrightarrow{\mathrm{OQ}}$ とおいて成分を比べると $s=t=1$、$p+q=3$ が出る）。`,
            },
            {
              k: "p",
              t: String.raw`**平行四辺形になる。** $p+q=3$ のとき`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}+\overrightarrow{\mathrm{OQ}}=(1,2,p+q)=(1,2,3)=\overrightarrow{\mathrm{OF}}`,
            },
            {
              k: "p",
              t: String.raw`なので、$\mathrm{OP}$ と $\mathrm{QF}$、$\mathrm{OQ}$ と $\mathrm{PF}$ がそれぞれ平行で長さも等しい。つまり四角形 $\mathrm{OPFQ}$ は平行四辺形で、面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\left|\overrightarrow{\mathrm{OP}}\times\overrightarrow{\mathrm{OQ}}\right|`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`外積を使わないなら、$S=2\triangle\mathrm{OPQ}$ と見て $\triangle\mathrm{OPQ}=\frac12\sqrt{\left|\overrightarrow{\mathrm{OP}}\right|^{2}\left|\overrightarrow{\mathrm{OQ}}\right|^{2}-\left(\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OQ}}\right)^{2}}$ を使えばよい。下の計算と同じ式になる。`,
            },
            { k: "p", t: String.raw`**面積を $p$ で書く。** $q=3-p$ として` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}\times\overrightarrow{\mathrm{OQ}}=(1,0,p)\times(0,2,3-p)=\left(-2p,\;p-3,\;2\right)`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`S^{2}=4p^{2}+(p-3)^{2}+4=5p^{2}-6p+13=5\left(p-\frac35\right)^{2}+\frac{56}{5}`,
            },
            {
              k: "p",
              t: String.raw`である。$p=\dfrac35$ は $0\le p\le3$ の中にあり、このとき $q=3-\dfrac35=\dfrac{12}{5}$ も範囲内である。最小値は`,
            },
            {
              k: "math",
              t: String.raw`S=\sqrt{\frac{56}{5}}=\frac{2\sqrt{14}}{\sqrt5}=\frac{2\sqrt{70}}{5}`,
            },
            { k: "p", t: String.raw`で、そのとき` },
            {
              k: "math",
              t: String.raw`\mathrm{P}\left(1,\,0,\,\frac35\right),\qquad\mathrm{Q}\left(0,\,2,\,\frac{12}{5}\right)`,
            },
            { k: "p", t: String.raw`である（$S=3.3466$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$S=\sqrt{5p^{2}-6p+13}$ のグラフ（$0\le p\le3$）。$p=\frac35$ で最小 $\frac{2\sqrt{70}}{5}=3.347$ をとる。両端は $p=0$ で $\sqrt{13}=3.606$、$p=3$ で $\sqrt{40}=6.325$。`,
                view: [-0.3, 3.35, 2.7, 6.9],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: S4, from: 0, to: 3 },
                  { k: "dot", at: [0.6, S4(0.6)], label: "最小 2√70/5", place: "below-right" },
                  { k: "dot", at: [0, S4(0)], label: "√13", place: "left" },
                  { k: "dot", at: [3, S4(3)], label: "√40", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{OPFQ}$ は $\mathrm{O}\to\mathrm{P}\to\mathrm{F}\to\mathrm{Q}$ の順の四角形である。$\mathrm{P}$ と $\mathrm{Q}$ が向かい合う頂点ではないことに注意する（向かい合うのは $\mathrm{O}$ と $\mathrm{F}$）。`,
            String.raw`平行四辺形だと分かれば面積は三角形2つぶんで、$\triangle\mathrm{OPQ}$ の2倍である。四角形のまま対角線で切ろうとすると、$\mathrm{PQ}$ で切るか $\mathrm{OF}$ で切るかで迷う。`,
            String.raw`$p=\frac35$ が $0\le p\le3$ の内部にあることを確かめる。外に出ていれば端の値を比べる。`,
            String.raw`$\sqrt{\frac{56}{5}}$ は分母を有理化して $\frac{2\sqrt{70}}{5}$ とする。`,
          ],
          check: String.raw`$p=\frac35$、$q=\frac{12}{5}$ のとき $\overrightarrow{\mathrm{OP}}=(1,0,0.6)$、$\overrightarrow{\mathrm{OQ}}=(0,2,2.4)$ で、和は $(1,2,3)=\overrightarrow{\mathrm{OF}}$ になる。外積は $(-1.2,-2.4,2)$ で大きさは $3.346640$、$\frac{2\sqrt{70}}{5}=3.346640$ と一致する。$p$ を $30$ 万等分して調べても最小は $p=0.600000$ であった。`,
        },
      ],
    },
    {
      no: 5,
      field: "整数",
      topics: ["合同式", "素数", "3で割った余り", "場合分け"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$200$ 未満のすべての素数 $p$ について $p^{4}+14$ が素数かを判定すると、素数になるものは1つもなかった",
          "$p\\ne3$ の素数では $p^{4}+14$ が $3$ の倍数になり、$p=3$ では $95=5\\times19$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$p$ が素数ならば $p^{4}+14$ は素数でないことを示す`,
          answer: String.raw`$p\ne3$ なら $p^{4}+14$ は $3$ の倍数で $3$ より大きい。$p=3$ なら $95=5\times19$`,
          approach: String.raw`$14$ を $3$ で割ると $2$ 余るので、$3$ を法として考えるのが自然である。$3$ でない素数は $3$ と互いに素だから $p^{2}\equiv1\pmod3$ となり、$p^{4}\equiv1$、合わせて $0$ になる。$p=3$ だけが例外なので、そこは直接計算する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$3$ を法として考える。$14\equiv2\pmod3$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$p\ne3$ のとき。** $p$ は素数なので $p$ は $3$ の倍数ではなく、$p\equiv1$ または $p\equiv2\pmod3$ である。どちらの場合も`,
            },
            {
              k: "math",
              t: String.raw`p^{2}\equiv1\pmod3\quad\Longrightarrow\quad p^{4}=\left(p^{2}\right)^{2}\equiv1\pmod3`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`p^{4}+14\equiv1+2=3\equiv0\pmod3`,
            },
            {
              k: "p",
              t: String.raw`で、$p^{4}+14$ は $3$ の倍数である。さらに $p\ge2$ より $p^{4}+14\ge16+14=30>3$ なので、$p^{4}+14$ は $3$ の倍数でありながら $3$ 自身ではない。よって素数ではない。`,
            },
            {
              k: "p",
              t: String.raw`**$p=3$ のとき。** `,
            },
            { k: "math", t: String.raw`3^{4}+14=81+14=95=5\times19` },
            { k: "p", t: String.raw`なので素数ではない。` },
            { k: "p", t: String.raw`以上より、$p$ が素数ならば $p^{4}+14$ は素数ではない。` },
            {
              k: "note",
              t: String.raw`$p\equiv\pm1\pmod3$ なら $p^{2}\equiv1$ というのは、$(\pm1)^{2}=1$ というだけのことである。$p^{4}$ まで上げなくても $p^{2}$ の段階で決まっている。`,
            },
          ],
          pitfalls: [
            String.raw`$3$ の倍数であることを示しただけでは足りない。$3$ 自身である可能性を消すために、$p^{4}+14>3$ を書く。`,
            String.raw`$p=3$ は唯一の例外なので、必ず別に計算する。$95$ が $5\times19$ と分解できることまで示す。`,
            String.raw`$p=2$ も素数である。$2^{4}+14=30=2\cdot3\cdot5$ で、一般の議論（$3$ の倍数）に含まれている。`,
          ],
          check: String.raw`$200$ 未満のすべての素数 $p$ について $p^{4}+14$ が素数かを判定すると、素数になるものは1つもなかった。$p=2$ で $30$、$p=3$ で $95$、$p=5$ で $639=3^{2}\times71$、$p=7$ で $2415=3\times5\times7\times23$ といずれも合成数である。`,
        },
      ],
    },
  ],
};
