import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2022年度（令和4年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 *
 * 第4問は理科の第6問と同じ設定の問題で、問われている $N$ と条件だけが違う。
 * 原点に戻る条件の出し方はそちらと同じなので、同じ筋道をそのまま書いている。
 */

/** 第1問の図。$a=\frac34$ のときの放物線と2つの円。 */
const A1 = 3 / 4;
const B1 = (A1 * A1 + 1) / 4;
const S1 = Math.sqrt(B1);
const C1 = (x: number) => x * x + A1 * x + B1;
const AX1 = -A1 / 2;
const PT1: [number, number] = [-S1, C1(-S1)];
const PT2: [number, number] = [S1, C1(S1)];
const CEN1: [number, number] = [AX1, PT1[1] + (A1 + 2 * S1) * (AX1 - PT1[0])];
const CEN2: [number, number] = [AX1, PT2[1] + (A1 - 2 * S1) * (AX1 - PT2[0])];
const RAD1 = Math.hypot(CEN1[0] - PT1[0], CEN1[1] - PT1[1]);
const RAD2 = Math.hypot(CEN2[0] - PT2[0], CEN2[1] - PT2[1]);
const circle =
  (c: [number, number], r: number) =>
  (t: number): [number, number] => [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];

/** 第2問の図。$\alpha=0.3$ のときの $C$ と法線、および $u$ のグラフ。 */
const CB = (x: number) => x * x * x - x;
const AL = 0.3;
const M2 = -1 / (3 * AL * AL - 1);
const L2 = (x: number) => M2 * (x - AL) + CB(AL);
const RT2 = Math.sqrt(AL * AL - 4 * (AL * AL - 1 - M2));
const XB = (-AL - RT2) / 2;
const XG = (-AL + RT2) / 2;
const U2 = (a: number) => 4 * a * a * a - 3 * a * a + 1;
const RT3INV = 1 / Math.sqrt(3);

export const todaiBunkei2022: SolutionSet = {
  slug: "todai-bunkei",
  year: 2022,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数",
      topics: ["接線", "直交条件", "円と接線", "軸"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a$ を $-3$ から $3$ まで $60$ 万等分し、$b=\\frac{a^{2}+1}{4}$ としたうえで2本の接線の傾きの積を計算すると、どの $a$ でもちょうど $-1$ になることを確かめた",
          "同じ刻みで $D_1,D_2$ の中心と半径を座標から直接出して $\\frac{r_2}{r_1}$ を計算すると、つねに $|a+2\\sqrt b|$ に一致し、$\\frac{r_2}{r_1}=2$ となるのは $a=0.75$ ただ1つだけだった",
          "$a=\\frac34$ のとき $r_1=\\frac{\\sqrt5}{4}=0.559017$、$r_2=\\frac{\\sqrt5}{2}=1.118034$ を中心と接点の距離から直接計算して確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$b$ を $a$ で表し、$a$ のとりうる値の範囲を求める`,
          answer: String.raw`$b=\dfrac{a^{2}+1}{4}$、$a$ はすべての実数をとりうる`,
          approach: String.raw`原点を通る接線を探すとき、接点を $(t,\,t^{2}+at+b)$ とおいて接線の式を作り、そこに原点を代入するのがいちばん短い。この放物線では定数項が $-t^{2}+b$ になるので、条件が $t^{2}=b$ というきわめて簡単な形になる。あとは2つの傾きの積が $-1$ というだけである。`,
          blocks: [
            { k: "p", t: String.raw`$y'=2x+a$ なので、接点を $\left(t,\,t^{2}+at+b\right)$ とすると接線は` },
            {
              k: "math",
              t: String.raw`y=(2t+a)(x-t)+t^{2}+at+b=(2t+a)x-t^{2}+b`,
            },
            { k: "p", t: String.raw`である。これが原点を通る条件は $-t^{2}+b=0$、つまり` },
            { k: "math", t: String.raw`t^{2}=b` },
            {
              k: "p",
              t: String.raw`である。接線が2本あるには $t$ が2つなければならないので $b>0$ が必要で、このとき $t=\pm\sqrt b$ の2つに決まる。`,
            },
            {
              k: "p",
              t: String.raw`**傾きを書き下す。** $x$ 座標の小さい方が $\mathrm{P_1}$ なので $t=-\sqrt b$ が $\mathrm{P_1}$、$t=\sqrt b$ が $\mathrm{P_2}$ である。接線の傾きをそれぞれ $m_1,m_2$ とすると`,
            },
            {
              k: "math",
              t: String.raw`m_1=a-2\sqrt b,\qquad m_2=a+2\sqrt b`,
            },
            { k: "p", t: String.raw`で、$\ell_1\perp\ell_2$ より $m_1m_2=-1$、すなわち` },
            { k: "math", t: String.raw`a^{2}-4b=-1\quad\Longleftrightarrow\quad b=\frac{a^{2}+1}{4}` },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "p",
              t: String.raw`**範囲を確かめる。** 逆に $a$ をどんな実数にとっても $b=\dfrac{a^{2}+1}{4}>0$ だから、接線は確かに2本あり、その傾きの積は $a^{2}-4b=-1$ で直交する。2本は原点で交わっているので、条件をみたす $\ell_1,\ell_2$ が実際にとれる。したがって`,
            },
            { k: "math", t: String.raw`a\text{ はすべての実数をとりうる}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$b>0$ は「接線が2本ある」ための条件として先に出てくるが、$b=\dfrac{a^{2}+1}{4}$ はどんな $a$ でも自動的に正になる。だから $a$ に制限が付かない。範囲を問われているのに制限が出ないときは、ここを書いておかないと答案が完結しない。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P_1}$、$\mathrm{P_2}$ の区別（$x$ 座標の小さい方が $\mathrm{P_1}$）は (1) では効かないが、(2) では $m_1<0<m_2$ を使うところで決定的に効く。ここで $t=-\sqrt b$ が $\mathrm{P_1}$ だと決めておく。`,
            String.raw`接線が「原点で」直交することは、原点を通る2本という条件に含まれている。交点をあらためて求める必要はない。`,
          ],
          check: String.raw`$a=0.2$ なら $b=0.26$、$\sqrt b=0.509902$ で、$m_1=0.2-1.019804=-0.819804$、$m_2=0.2+1.019804=1.219804$。積は $-1.000000$ になる。$a=2$ でも $b=1.25$、$m_1=-0.236068$、$m_2=4.236068$ で積は $-1$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$D_2$ の半径が $D_1$ の半径の2倍になる $a$ を求める`,
          answer: String.raw`$a=\dfrac34$`,
          approach: String.raw`円が点 $\mathrm{P}_i$ で $\ell_i$ に接するなら、中心は $\mathrm{P}_i$ を通る $\ell_i$ の法線上にある。それが軸 $x=-\dfrac a2$ と交わる点が中心で、半径は中心と $\mathrm{P}_i$ の距離である。ここで $m_1m_2=-1$ だから「$\ell_1$ の法線の傾きは $m_2$」「$\ell_2$ の法線の傾きは $m_1$」となり、2つの半径を同じ文字で書ける。比をとると約分が効いて、$\dfrac{r_2}{r_1}=|m_2|$ という驚くほど簡単な式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$s=\sqrt b>0$ とおく。$t^{2}=b$ より $\mathrm{P_1},\mathrm{P_2}$ の $y$ 座標は $b+at+b=2b+at$ と書けるので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{P_1}\left(-s,\;2b-as\right),\qquad \mathrm{P_2}\left(s,\;2b+as\right)`,
            },
            { k: "p", t: String.raw`である。また $C$ の軸は $x=-\dfrac a2$ である。` },
            {
              k: "p",
              t: String.raw`**中心と半径。** $D_1$ は $\mathrm{P_1}$ で $\ell_1$ に接するので、中心は $\mathrm{P_1}$ を通り $\ell_1$ に垂直な直線上にある。その傾きは $-\dfrac{1}{m_1}=m_2$（$m_1m_2=-1$ を使った）である。中心の $x$ 座標は $-\dfrac a2$ なので、$\mathrm{P_1}$ からの $x$ の変化は $-\dfrac a2-(-s)=s-\dfrac a2$ で`,
            },
            {
              k: "math",
              t: String.raw`r_1=\left|s-\frac a2\right|\sqrt{1+m_2^{\,2}}`,
            },
            {
              k: "p",
              t: String.raw`となる。同様に $D_2$ の中心は傾き $-\dfrac{1}{m_2}=m_1$ の法線上にあり、$x$ の変化は $-\dfrac a2-s$ なので`,
            },
            {
              k: "math",
              t: String.raw`r_2=\left|s+\frac a2\right|\sqrt{1+m_1^{\,2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**比をとる。** $m_2=-\dfrac{1}{m_1}$ より`,
            },
            {
              k: "math",
              t: String.raw`\sqrt{1+m_2^{\,2}}=\sqrt{1+\frac{1}{m_1^{\,2}}}=\frac{\sqrt{1+m_1^{\,2}}}{\left|m_1\right|}`,
            },
            { k: "p", t: String.raw`なので、$\sqrt{1+m_1^{\,2}}$ が約分されて` },
            {
              k: "math",
              t: String.raw`\frac{r_2}{r_1}=\frac{\left|s+\frac a2\right|\sqrt{1+m_1^{\,2}}}{\left|s-\frac a2\right|\cdot\frac{\sqrt{1+m_1^{\,2}}}{\left|m_1\right|}}=\frac{\left|2s+a\right|}{\left|2s-a\right|}\cdot\left|a-2s\right|=\left|a+2s\right|=\left|m_2\right|`,
            },
            { k: "p", t: String.raw`となる。よって条件 $r_2=2r_1$ は` },
            { k: "math", t: String.raw`\left|m_2\right|=2` },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`**符号を決める。** $m_2-m_1=4s>0$ かつ $m_1m_2=-1<0$ だから、$m_1<0<m_2$ である。したがって $m_2=2$ に決まり、$m_1=-\dfrac{1}{m_2}=-\dfrac12$ である。$m_1+m_2=2a$ より`,
            },
            {
              k: "math",
              t: String.raw`a=\frac{m_1+m_2}{2}=\frac{-\frac12+2}{2}=\frac34`,
            },
            {
              k: "p",
              t: String.raw`を得る。このとき $s=\dfrac{m_2-m_1}{4}=\dfrac58>0$ で、$b=s^{2}=\dfrac{25}{64}$ は $\dfrac{a^{2}+1}{4}$ と一致している。よって`,
            },
            { k: "math", t: String.raw`a=\frac34` },
            { k: "p", t: String.raw`が答えである。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$a=\frac34$（$b=\frac{25}{64}$）のときの放物線 $C$、原点で直交する2本の接線 $\ell_1,\ell_2$、および軸 $x=-\frac38$ 上に中心をもつ2つの円 $D_1,D_2$。半径は $\frac{\sqrt5}{4}$ と $\frac{\sqrt5}{2}$ でちょうど2倍になる。`,
                view: [-2.2, 2.2, -0.65, 3.05],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: C1, from: -1.7, to: 1.1 },
                  { k: "seg", a: [-2.0, 1.0], b: [1.0, -0.5], faint: true },
                  { k: "seg", a: [-0.3, -0.6], b: [1.4, 2.8], faint: true },
                  { k: "seg", a: [AX1, -0.6], b: [AX1, 3.0], dash: true, faint: true },
                  { k: "param", f: circle(CEN1, RAD1), from: 0, to: 2 * Math.PI },
                  { k: "param", f: circle(CEN2, RAD2), from: 0, to: 2 * Math.PI },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: PT1, label: "P1", place: "below-left" },
                  { k: "dot", at: PT2, label: "P2", place: "below-right" },
                  { k: "dot", at: CEN1, label: "", place: "right" },
                  { k: "dot", at: CEN2, label: "", place: "right" },
                  { k: "text", at: [-0.95, 1.15], label: "D1", place: "right" },
                  { k: "text", at: [CEN2[0], CEN2[1] + RAD2], label: "D2", place: "above" },
                  { k: "text", at: [-1.9, 0.95], label: "l1", place: "above" },
                  { k: "text", at: [1.4, 2.8], label: "l2", place: "left" },
                  { k: "text", at: [1.1, C1(1.1)], label: "C", place: "right" },
                  { k: "text", at: [AX1, -0.45], label: "軸", place: "left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\left|m_2\right|=2$ から $m_2=\pm2$ と2通り書いて、$m_2=-2$ を残してしまうと $a=-\dfrac34$ という余計な答えが出る。$m_2-m_1=4\sqrt b>0$ と $m_1m_2=-1$ から $m_1<0<m_2$ が決まることを、かならず書いておく。`,
            String.raw`$D_1$ の中心は $D_2$ の内部に入る（$a=\frac34$ では2円の中心間距離 $\frac{15}{16}$ が $r_2=\frac{\sqrt5}{2}$ より小さい）。図を描いて「2円が離れているはず」と思い込むと混乱する。接しているのは円と直線で、2円の位置関係は問われていない。`,
            String.raw`半径を「中心と接点の距離」で出すほかに、「中心と直線 $\ell_i$ の距離」で出してもよい。後者だと点と直線の距離の公式になり、$\sqrt{1+m_i^{\,2}}$ が分母に来る。どちらでも比は同じ形になる。`,
          ],
          check: String.raw`$a=\frac34$ のとき $\mathrm{P_1}\left(-\frac58,\frac5{16}\right)$、$\mathrm{P_2}\left(\frac58,\frac54\right)$、軸は $x=-\frac38$。$D_1$ の中心は $\left(-\frac38,\frac{13}{16}\right)$ で $r_1=\sqrt{\frac1{16}+\frac14}=\frac{\sqrt5}{4}=0.559017$、$D_2$ の中心は $\left(-\frac38,\frac74\right)$ で $r_2=\sqrt{1+\frac14}=\frac{\sqrt5}{2}=1.118034$。確かに $r_2=2r_1$ である。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["法線", "3次関数", "解と係数の関係", "値域"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha$ を $-1$ から $1$ まで $20$ 万等分し、$x^{2}+\\alpha x+\\left(\\alpha^{2}-1-m\\right)=0$ の判別式の符号を調べると、正になる範囲がちょうど $-0.57735<\\alpha<0.57735$ で、$\\pm\\frac{1}{\\sqrt3}=\\pm0.57735$ と一致した",
          "$-0.57$ から $0.57$ まで $11$ 万 $4001$ 点で $\\beta,\\gamma$ を数値的に求め、$\\beta^{2}+\\beta\\gamma+\\gamma^{2}-1$ と $m=-\\frac{1}{3\\alpha^{2}-1}$ の差を調べると、不一致は $0$ 件だった",
          "同じ範囲で $u=4\\alpha^{3}+\\frac{1}{\\beta^{2}+\\beta\\gamma+\\gamma^{2}-1}$ を直接計算すると、最大 $1.00000000$、下限側は $-0.75231$ までしか届かず、$-\\frac{4\\sqrt3}{9}=-0.76980$ に端から近づくだけであることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\ell$ が $C$ と3つの異なる点で交わる $\alpha$ の範囲を求める`,
          answer: String.raw`$-\dfrac{1}{\sqrt3}<\alpha<\dfrac{1}{\sqrt3}$`,
          approach: String.raw`$\mathrm{P}$ が交点の1つだとわかっているので、連立の3次式は $x-\alpha$ で必ず割れる。割った残りの2次式が「異なる2実解をもち、どちらも $\alpha$ ではない」が条件である。法線の傾きを $m$ とおいたまま進め、最後に $m=-\dfrac{1}{3\alpha^{2}-1}$ を入れると、$T=3\alpha^{2}-1$ の符号だけの問題に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y'=3x^{2}-1$ なので $\mathrm{P}$ での接線の傾きは $3\alpha^{2}-1$ である。これを $T$ とおく。$T=0$ だと接線が $x$ 軸に平行で $\ell$ は $x=\alpha$ となり、$C$ とは1点でしか交わらない。よって $T\ne0$ で、$\ell$ の傾きは`,
            },
            { k: "math", t: String.raw`m=-\frac1T` },
            { k: "p", t: String.raw`である。$\ell:\;y=m(x-\alpha)+\alpha^{3}-\alpha$ と $C$ の連立は` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
x^{3}-x&=m(x-\alpha)+\alpha^{3}-\alpha\\[1mm]
\left(x^{3}-\alpha^{3}\right)-(x-\alpha)-m(x-\alpha)&=0\\[1mm]
(x-\alpha)\left(x^{2}+\alpha x+\alpha^{2}-1-m\right)&=0
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。$3$ つの異なる交点をもつ条件は、2次式` },
            { k: "math", t: String.raw`g(x)=x^{2}+\alpha x+\alpha^{2}-1-m` },
            {
              k: "p",
              t: String.raw`が異なる2実解をもち、しかもそのどちらも $\alpha$ ではないことである。`,
            },
            { k: "p", t: String.raw`**判別式。** $g(x)=0$ の判別式は` },
            {
              k: "math",
              t: String.raw`D=\alpha^{2}-4\left(\alpha^{2}-1-m\right)=-3\alpha^{2}+4+4m`,
            },
            { k: "p", t: String.raw`である。$3\alpha^{2}=T+1$、$m=-\dfrac1T$ を入れると` },
            {
              k: "math",
              t: String.raw`D=-(T+1)+4-\frac4T=3-T-\frac4T=-\frac{T^{2}-3T+4}{T}`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $T^{2}-3T+4=\left(T-\dfrac32\right)^{2}+\dfrac74>0$ がつねに成り立つので`,
            },
            { k: "math", t: String.raw`D>0\quad\Longleftrightarrow\quad T<0` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$x=\alpha$ が解でないこと。** ` },
            {
              k: "math",
              t: String.raw`g(\alpha)=\alpha^{2}+\alpha^{2}+\alpha^{2}-1-m=T-m=T+\frac1T=\frac{T^{2}+1}{T}`,
            },
            {
              k: "p",
              t: String.raw`で、$T^{2}+1>0$、$T\ne0$ だから $g(\alpha)\ne0$ である。この条件は自動的にみたされる。`,
            },
            { k: "p", t: String.raw`したがって求める条件は $T=3\alpha^{2}-1<0$、すなわち` },
            {
              k: "math",
              t: String.raw`-\frac{1}{\sqrt3}<\alpha<\frac{1}{\sqrt3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\alpha=0.3$ のときの $C:y=x^{3}-x$ と、$\mathrm{P}(0.3,-0.273)$ での法線 $\ell$。$\ell$ は $C$ と3点で交わり、$\mathrm{P}$ 以外の2つの交点の $x$ 座標が $\beta=-1.667$、$\gamma=1.367$ である。`,
                view: [-2.15, 1.95, -3.55, 1.95],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: CB, from: -1.7, to: 1.45 },
                  { k: "seg", a: [-1.9, L2(-1.9)], b: [1.6, L2(1.6)], faint: true },
                  { k: "dot", at: [AL, CB(AL)], label: "P", place: "left" },
                  { k: "dot", at: [XB, CB(XB)], label: "β", place: "left" },
                  { k: "dot", at: [XG, CB(XG)], label: "γ", place: "right" },
                  { k: "text", at: [-RT3INV, CB(-RT3INV)], label: "C", place: "above" },
                  { k: "text", at: [1.6, L2(1.6)], label: "l", place: "below-right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$\alpha=\pm\dfrac{1}{\sqrt3}$ は $C$ の極値をとる $x$ で、そこでは接線が水平、法線が垂直になって交点が1つに減る。$\left|\alpha\right|$ がそれより大きいところでも、法線の傾きが小さすぎて交点は1つしかない。`,
            },
          ],
          pitfalls: [
            String.raw`$T=0$（$\alpha=\pm\frac{1}{\sqrt3}$）を「傾きが定義できない」で片づけず、そのとき $\ell$ が $x=\alpha$ という垂直線になり交点が1個であることまで書く。範囲の端が除かれる理由がここにある。`,
            String.raw`$D>0$ を $-3\alpha^{2}+4+4m>0$ のまま $m$ に代入して分母を払うときは、$T$ の符号で不等号の向きが変わる。$D=-\frac{T^{2}-3T+4}{T}$ の形にまとめてしまえば場合分けが消える。`,
          ],
          check: String.raw`$\alpha=0.3$ なら $T=-0.73$、$m=1.369863$ で $D=0.09-4(0.09-1-1.369863)=9.209452>0$。解は $x=-1.667356,\;1.367356$ となり、$C$ 上の点 $(-1.667356,-2.967993)$、$(1.367356,1.189192)$ はどちらも $\ell$ の上に乗っている。いっぽう $\alpha=0.6$ なら $T=0.08>0$ で $D=-3(0.36)+4+4(-12.5)=-47.08<0$、交点は $\mathrm{P}$ だけである。`,
        },
        {
          label: "(2)",
          task: String.raw`$\beta^{2}+\beta\gamma+\gamma^{2}-1\ne0$ であることを示す`,
          answer: String.raw`$\beta^{2}+\beta\gamma+\gamma^{2}-1=m=-\dfrac{1}{3\alpha^{2}-1}\ne0$`,
          approach: String.raw`$\beta,\gamma$ は (1) で出した2次式の2解なので、$\beta+\gamma$ と $\beta\gamma$ が $\alpha$ と $m$ で書ける。$\beta^{2}+\beta\gamma+\gamma^{2}$ は $(\beta+\gamma)^{2}-\beta\gamma$ という対称式なので、代入するだけで $\alpha$ が消えて $m$ だけが残る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta,\gamma$ は $x^{2}+\alpha x+\left(\alpha^{2}-1-m\right)=0$ の2解だから、解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`\beta+\gamma=-\alpha,\qquad \beta\gamma=\alpha^{2}-1-m`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\beta^{2}+\beta\gamma+\gamma^{2}=(\beta+\gamma)^{2}-\beta\gamma=\alpha^{2}-\left(\alpha^{2}-1-m\right)=1+m`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`\beta^{2}+\beta\gamma+\gamma^{2}-1=m=-\frac{1}{3\alpha^{2}-1}`,
            },
            {
              k: "p",
              t: String.raw`を得る。$m$ は $-\dfrac1T$ という形の数で、分子が $-1$ だから $0$ になりえない。よって`,
            },
            { k: "math", t: String.raw`\beta^{2}+\beta\gamma+\gamma^{2}-1\ne0` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\beta^{2}+\beta\gamma+\gamma^{2}$ は $\beta,\gamma$ の対称式で、$\beta^{2}+2\beta\gamma+\gamma^{2}-\beta\gamma=(\beta+\gamma)^{2}-\beta\gamma$ と見るのがこの形の定石である。$\beta^{3}-\gamma^{3}=(\beta-\gamma)\left(\beta^{2}+\beta\gamma+\gamma^{2}\right)$ の因数として覚えている人は、そちらから $\beta\ne\gamma$ を使って示してもよい。`,
            },
          ],
          pitfalls: [
            String.raw`「$\ne0$ を示せ」なので、値が何になるかまで出してしまうのがいちばん確実である。$\beta^{2}+\beta\gamma+\gamma^{2}-1$ がちょうど $\ell$ の傾き $m$ になるという事実が、そのまま (3) の計算に効く。`,
            String.raw`$\beta,\gamma$ は実数だが、$\beta^{2}+\beta\gamma+\gamma^{2}\ge0$ だけでは $-1$ して $0$ にならないことは言えない。実際 $1+m-1=m$ は負にもなる（$T<0$ だから $m>0$ で、ここでは正だが）。値を出す以外の近道はない。`,
          ],
          check: String.raw`$\alpha=0.3$ では $\beta=-1.667356$、$\gamma=1.367356$ で $\beta^{2}+\beta\gamma+\gamma^{2}-1=2.779876-2.279863+1.869663-1=1.369863$。これは $m=-\frac{1}{3(0.09)-1}=\frac{1}{0.73}=1.369863$ と一致する。$-0.57\le\alpha\le0.57$ を $11$ 万 $4001$ 点で調べても、両者の差はすべて $10^{-9}$ 未満だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$u=4\alpha^{3}+\dfrac{1}{\beta^{2}+\beta\gamma+\gamma^{2}-1}$ のとりうる値の範囲を求める`,
          answer: String.raw`$-\dfrac{4\sqrt3}{9}<u\le1$`,
          approach: String.raw`(2) で分母が $m$ だとわかったので、$\dfrac1m=-T=1-3\alpha^{2}$ と置き換えるだけで $u$ が $\alpha$ だけの3次関数になる。あとは (1) の範囲 $\left|\alpha\right|<\dfrac{1}{\sqrt3}$ での値域を増減表で出す。端が開いていること、極小値が左端の値より大きいことに注意する。`,
          blocks: [
            { k: "p", t: String.raw`(2) より分母は $m=-\dfrac1T$ なので $\dfrac1m=-T=1-3\alpha^{2}$ である。よって` },
            {
              k: "math",
              t: String.raw`u=4\alpha^{3}+1-3\alpha^{2}=4\alpha^{3}-3\alpha^{2}+1`,
            },
            {
              k: "p",
              t: String.raw`となり、$u$ は $\alpha$ だけの関数である。定義域は (1) より $-\dfrac{1}{\sqrt3}<\alpha<\dfrac{1}{\sqrt3}$ である。`,
            },
            { k: "p", t: String.raw`**増減。** $f(\alpha)=4\alpha^{3}-3\alpha^{2}+1$ とすると` },
            {
              k: "math",
              t: String.raw`f'(\alpha)=12\alpha^{2}-6\alpha=6\alpha(2\alpha-1)`,
            },
            {
              k: "p",
              t: String.raw`なので、$\alpha=0$ と $\alpha=\dfrac12$ が極値を与える。$\dfrac{1}{\sqrt3}=0.577\dots$ なのでどちらも定義域の内部にある。$f'$ の符号は $\alpha<0$ で正、$0<\alpha<\dfrac12$ で負、$\alpha>\dfrac12$ で正である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$-\dfrac{1}{\sqrt3}<\alpha\le0$：増加。値は $f\left(-\dfrac{1}{\sqrt3}\right)=-\dfrac{4}{3\sqrt3}-1+1=-\dfrac{4\sqrt3}{9}$ を**含まず**、$f(0)=1$ まで。`,
                String.raw`$0\le\alpha\le\dfrac12$：減少。$1$ から $f\left(\dfrac12\right)=\dfrac12-\dfrac34+1=\dfrac34$ まで。`,
                String.raw`$\dfrac12\le\alpha<\dfrac{1}{\sqrt3}$：増加。$\dfrac34$ から $f\left(\dfrac{1}{\sqrt3}\right)=\dfrac{4\sqrt3}{9}$ を**含まず**まで。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**まとめる。** $\dfrac{4\sqrt3}{9}=0.7698\dots$ は $1$ より小さく、$\dfrac34=0.75$ より大きい。だから3番目の区間で出る値 $\left[\dfrac34,\;\dfrac{4\sqrt3}{9}\right)$ も、2番目の区間で出る値 $\left[\dfrac34,\;1\right]$ も、1番目の区間で出る値`,
            },
            {
              k: "math",
              t: String.raw`\left(-\frac{4\sqrt3}{9},\;1\right]`,
            },
            {
              k: "p",
              t: String.raw`にすべて含まれる。$f$ は1番目の区間で連続かつ増加で、左端の値 $-\dfrac{4\sqrt3}{9}$ だけが届かず $f(0)=1$ は実際にとる。よって`,
            },
            {
              k: "math",
              t: String.raw`-\frac{4\sqrt3}{9}<u\le1`,
            },
            { k: "p", t: String.raw`が求める範囲である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$u=4\alpha^{3}-3\alpha^{2}+1$ のグラフ（$-\frac{1}{\sqrt3}<\alpha<\frac{1}{\sqrt3}$）。$\alpha=0$ で最大値 $1$、$\alpha=\frac12$ で極小値 $\frac34$ をとる。両端は定義域に入らないので、$-\frac{4\sqrt3}{9}=-0.770$ と $\frac{4\sqrt3}{9}=0.770$ はとらない。`,
                view: [-0.9, 1.15, -1.15, 1.35],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: U2, from: -RT3INV, to: RT3INV },
                  { k: "dot", at: [0, 1], label: "最大 1", place: "above-right" },
                  { k: "dot", at: [0.5, 0.75], label: "極小 3/4", place: "below-left" },
                  { k: "dot", at: [-RT3INV, U2(-RT3INV)], label: "含まない", place: "right" },
                  { k: "dot", at: [RT3INV, U2(RT3INV)], label: "含まない", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`極小値 $\dfrac34$ は最小値ではない。左端近くで $u$ は $-\dfrac{4\sqrt3}{9}$ まで下がるので、極小値だけ見て「$\frac34\le u\le1$」とすると大きく外す。定義域の端の値をかならず計算して比べる。`,
            String.raw`右端の値 $\dfrac{4\sqrt3}{9}=0.770$ は最大値 $1$ より小さいので、範囲の上端には関係しない。3つの区間の値域を合わせるときは、数値で大小を確かめておくと安全である。`,
            String.raw`端が開いているので、下端は $<$、上端は $\le$ になる。$u=1$ は $\alpha=0$ で実際にとれる（このとき $\mathrm{P}$ は原点で、$\ell$ は $y=x$ である）。`,
          ],
          check: String.raw`$-\frac{4\sqrt3}{9}=-0.769800$。$\alpha$ を $-0.575$ から $0.575$ まで $23$ 万等分して $u=4\alpha^{3}-3\alpha^{2}+1$ を計算すると、最大 $1.000000$（$\alpha=0$）、最小 $-0.752313$ となる。定義域をさらに端へ寄せると最小は $-0.769800$ に近づくが届かない。$\alpha=\frac12$ では $u=0.75$ である。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["漸化式", "合同式", "周期性", "最大公約数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n+1}=a_n^{2}+n(n+2)$ を $\\bmod 3$ で $n=1$ から $30$ まで回すと $1,1,0,0,0,2$ の周期6がそのまま続き、$2022=6\\times337$ なので6番目の $2$ が $a_{2022}$ の余りになることを確かめた",
          "$\\bmod 3$ の漸化式を $2021$ 回回して $a_{2022}\\equiv2$ を直接計算し、さらに $a_{2023}\\equiv1$、$a_{2024}\\equiv1$ も得た",
          "$2022\\cdot2024=4092528=2^{4}\\cdot3\\cdot11\\cdot23\\cdot337$、$2023\\cdot2025=4096575=3^{4}\\cdot5^{2}\\cdot7\\cdot17^{2}$ の最大公約数が $3$ であることを素因数分解で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{2022}$ を $3$ で割った余りを求める`,
          answer: String.raw`$2$`,
          approach: String.raw`$a_n$ そのものは爆発的に大きくなるので、$\bmod 3$ だけを追う。$n(n+2)$ の余りは $n$ の余りだけで決まるから、全体が周期をもつはずだと見当がつく。実際に数項書けば周期6が見える。`,
          blocks: [
            { k: "p", t: String.raw`$\bmod 3$ で考える。まず $n(n+2)$ の余りは $n$ の余りだけで決まり` },
            {
              k: "math",
              t: String.raw`n\equiv0\Rightarrow n(n+2)\equiv0,\quad n\equiv1\Rightarrow n(n+2)\equiv1\cdot3\equiv0,\quad n\equiv2\Rightarrow n(n+2)\equiv2\cdot4\equiv2`,
            },
            {
              k: "p",
              t: String.raw`である。つまり足される項は、$n\equiv2\pmod 3$ のときだけ $2$ で、ほかは $0$ である。`,
            },
            { k: "p", t: String.raw`$a_1=4\equiv1$ から順に計算すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_1&\equiv1\\[1mm]
a_2&\equiv a_1^{2}+1\cdot3\equiv1+0=1\\[1mm]
a_3&\equiv a_2^{2}+2\cdot4\equiv1+2=0\\[1mm]
a_4&\equiv a_3^{2}+3\cdot5\equiv0+0=0\\[1mm]
a_5&\equiv a_4^{2}+4\cdot6\equiv0+0=0\\[1mm]
a_6&\equiv a_5^{2}+5\cdot7\equiv0+2=2\\[1mm]
a_7&\equiv a_6^{2}+6\cdot8\equiv4+0=1
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。$a_1$ から並べると`,
            },
            {
              k: "math",
              t: String.raw`1,\;1,\;0,\;0,\;0,\;2,\;1,\;1,\;0,\;0,\;0,\;2,\;\dots`,
            },
            {
              k: "p",
              t: String.raw`である。$a_7\equiv a_1\equiv1$ で、$a_{n+1}$ は「$a_n$ の余り」と「$n$ の余り」だけから決まるのだから、$a_7\equiv a_1$ かつ $7\equiv1\pmod 3$（$7-1=6$ は $3$ の倍数）より、以後は周期 $6$ でまったく同じ並びが続く。`,
            },
            { k: "p", t: String.raw`$2022=6\times337$ なので、$a_{2022}$ は周期のちょうど6番目にあたり` },
            { k: "math", t: String.raw`a_{2022}\equiv2\pmod 3` },
            { k: "p", t: String.raw`である。求める余りは $2$ である。` },
            {
              k: "note",
              t: String.raw`周期が $6$ になるのは、$a_n$ の余りが決まっても次を出すには $n$ の余りも必要だからである。「状態」は（$a_n$ の余り、$n$ の余り）の組で、$n$ の周期 $3$ と $a_n$ の並びがかみ合って $6$ になる。$a_7\equiv a_1$ を確かめるだけでなく、$7\equiv1\pmod3$ も確かめないと周期が言えない。`,
            },
          ],
          pitfalls: [
            String.raw`$a_1=4$ を $4$ のまま2乗して $16$、と進めると数が大きくなるだけである。最初から余りに直す。`,
            String.raw`「$a_7\equiv a_1$ だから周期 $6$」と書くには、$n$ の側の余りもそろっていることが必要である。$a_4\equiv a_5\equiv0$ のように同じ余りが並ぶ箇所があるので、$a$ の値だけで周期を主張すると誤る。`,
          ],
          check: String.raw`$\bmod 3$ の漸化式を $n=1$ から $2021$ まで実際に回すと $a_{2022}\equiv2$ になる。$\bmod 9$ で回すと $a_{2022}\equiv8$ で、これも $3$ で割れば $2$ である。周期6の表（$1,1,0,0,0,2$）で $2022\div6=337$ 余り $0$ だから6番目の $2$、という読み方と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$a_{2022},a_{2023},a_{2024}$ の最大公約数を求める`,
          answer: String.raw`$1$`,
          approach: String.raw`漸化式は「次の項 $=$ 前の項の2乗 $+$ 具体的な整数」という形である。だから3項すべてを割る数は、漸化式の差をとることで具体的な整数 $n(n+2)$ を割らなければならない。2つ分使えば候補が一気に絞られ、(1) の結果でとどめを刺せる。`,
          blocks: [
            { k: "p", t: String.raw`$d=\gcd\left(a_{2022},a_{2023},a_{2024}\right)$ とおく（$a_n>0$ なので $d$ は正の整数）。` },
            { k: "p", t: String.raw`**候補を絞る。** 漸化式より` },
            {
              k: "math",
              t: String.raw`a_{2023}=a_{2022}^{2}+2022\cdot2024,\qquad a_{2024}=a_{2023}^{2}+2023\cdot2025`,
            },
            {
              k: "p",
              t: String.raw`である。$d$ は $a_{2022}$ と $a_{2023}$ をともに割るので、$a_{2023}-a_{2022}^{2}=2022\cdot2024$ を割る。同じく $d$ は $a_{2023}$ と $a_{2024}$ をともに割るので、$a_{2024}-a_{2023}^{2}=2023\cdot2025$ を割る。よって`,
            },
            {
              k: "math",
              t: String.raw`d\mid\gcd\left(2022\cdot2024,\;2023\cdot2025\right)`,
            },
            { k: "p", t: String.raw`である。素因数分解すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
2022\cdot2024&=\left(2\cdot3\cdot337\right)\left(2^{3}\cdot11\cdot23\right)=2^{4}\cdot3\cdot11\cdot23\cdot337\\[1mm]
2023\cdot2025&=\left(7\cdot17^{2}\right)\left(3^{4}\cdot5^{2}\right)=3^{4}\cdot5^{2}\cdot7\cdot17^{2}
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`で、共通の素因数は $3$ だけ、しかも前者には $3$ が1個しかないので`,
            },
            {
              k: "math",
              t: String.raw`\gcd\left(2022\cdot2024,\;2023\cdot2025\right)=3`,
            },
            { k: "p", t: String.raw`である。したがって $d=1$ または $d=3$ である。` },
            {
              k: "p",
              t: String.raw`**$3$ を落とす。** (1) より $a_{2022}\equiv2\pmod 3$ なので $a_{2022}$ は $3$ の倍数ではない。よって $d\ne3$ で`,
            },
            { k: "math", t: String.raw`d=1` },
            { k: "p", t: String.raw`である。求める最大公約数は $1$ である。` },
            {
              k: "note",
              t: String.raw`$2024=2^{3}\cdot11\cdot23$、$2025=3^{4}\cdot5^{2}=45^{2}$、$2023=7\cdot17^{2}$ はどれも年号がらみでよく出てくる分解である。$2022=2\cdot3\cdot337$ の $337$ は素数で、$337<19^{2}=361$ なので $2,3,5,7,11,13,17$ で割れないことを確かめれば足りる。`,
            },
          ],
          pitfalls: [
            String.raw`$d\mid3$ まで出した時点で止めると、$d=3$ かもしれない。(1) がここで使われる設問構成なので、$a_{2022}\equiv2$ を引いてくる。`,
            String.raw`$\gcd(a,b,c)$ は3つ同時の最大公約数である。$\gcd\left(a_{2022},a_{2023}\right)$ だけを計算しても、$2022\cdot2024$ の約数という条件しか出ず絞り切れない。2本の差を両方使う。`,
            String.raw`$2022\cdot2024$ に $3$ が1個しかないことまで見る。$\gcd$ の指数は小さい方なので、$2023\cdot2025$ に $3^{4}$ あっても結果は $3^{1}$ である。`,
          ],
          check: String.raw`$2022\cdot2024=4092528$、$2023\cdot2025=4096575$ で $\gcd=3$。いっぽう $\bmod 3$ の漸化式から $a_{2022}\equiv2$、$a_{2023}\equiv1$、$a_{2024}\equiv1$ なので、3項とも $3$ では割れない。$3$ 以外の共通素因数は上の絞り込みで消えているので、最大公約数は $1$ しかありえない。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率・ベクトル",
      topics: ["1次独立", "場合の数", "重複組合せ", "対称性"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$N=5$ について $2^{5}=32$ 通りの表裏をすべて並べて $\\mathrm{X}_5$ を直接計算すると、原点に戻るのは表 $0$ 回が $1$ 通り、表 $3$ 回が $1$ 通りの計 $2$ 通りで、確率は $\\frac{2}{32}=\\frac1{16}$ になった",
          "$(N,r)=(5,3),(8,6),(11,9),(14,12),(11,3),(14,6)$ について全探索した場合の数が、いずれも $\\left({}_{\\frac r3+\\frac{t+1}{3}-1}\\mathrm{C}_{\\frac{t+1}{3}-1}\\right)^{3}$（$t=N-r$）と完全に一致することを確かめた",
          "$N=98$、$r=90$ では $t+1=9$、各類3個・合計30なので $\\left({}_{32}\\mathrm{C}_{2}\\right)^{3}=496^{3}=122023936$ で、$496=2^{4}\\cdot31$ より $\\frac{496^{3}}{2^{98}}=\\frac{31^{3}}{2^{86}}=\\frac{29791}{2^{86}}$ を分数のまま確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$N=5$ のとき $\mathrm{X}_5$ が $\mathrm{O}$ にある確率を求める`,
          answer: String.raw`$\dfrac{1}{16}$`,
          approach: String.raw`$\vec{v_k}$ は $k$ を $3$ で割った余りだけで決まる3本のベクトルで、3本足すと $\vec0$ になる。だから「どの向きを何本足したか」だけが問題になる。表の回数を「その表より前に出た裏の回数」で分類すれば、原点に戻る条件が3つの本数が等しいという条件に化ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec{v_k}$ は $\dfrac{2k\pi}{3}$ で決まるので、$k$ を $3$ で割った余りだけで決まり、$\vec{v_0},\vec{v_1},\vec{v_2}$ の3通りしかない。この3本は正三角形の頂点の向きで`,
            },
            { k: "math", t: String.raw`\vec{v_0}+\vec{v_1}+\vec{v_2}=\vec0` },
            { k: "p", t: String.raw`をみたし、$\vec{v_0}$ と $\vec{v_1}$ は1次独立である。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`3つのベクトル $\vec{v_0},\vec{v_1},\vec{v_2}$。互いに $120^\circ$ ずつずれた単位ベクトルで、3つ足すと $\vec0$ になる。`,
                view: [-1.6, 1.6, -1.4, 1.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "seg", a: [0, 0], b: [-0.5, Math.sqrt(3) / 2] },
                  { k: "seg", a: [0, 0], b: [-0.5, -Math.sqrt(3) / 2] },
                  { k: "dot", at: [1, 0], label: "v0", place: "right" },
                  { k: "dot", at: [-0.5, Math.sqrt(3) / 2], label: "v1", place: "above-left" },
                  { k: "dot", at: [-0.5, -Math.sqrt(3) / 2], label: "v2", place: "below-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`表が出るたびに、そのときまでに出た裏の回数 $k$ に応じて $\vec{v_k}$ が足される。そこで各回の表を「その表より前に出た裏の回数」で分類し、裏がちょうど $j$ 回出たあとに出た表の回数を $m_j$ とする。裏が全部で $t$ 回なら $j=0,1,\dots,t$ である。すると`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}_N}=\sum_{j=0}^{t}m_j\vec{v_j}=A\vec{v_0}+B\vec{v_1}+C\vec{v_2}`,
            },
            {
              k: "p",
              t: String.raw`となる。ここで $A,B,C$ はそれぞれ $j$ を $3$ で割った余りが $0,1,2$ である $m_j$ の総和である。$\vec{v_2}=-\vec{v_0}-\vec{v_1}$ を代入すると`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OX}_N}=(A-C)\vec{v_0}+(B-C)\vec{v_1}`,
            },
            {
              k: "p",
              t: String.raw`で、$\vec{v_0},\vec{v_1}$ が1次独立だから、$\mathrm{X}_N$ が $\mathrm{O}$ にあることは`,
            },
            { k: "math", t: String.raw`A=B=C` },
            { k: "p", t: String.raw`と同値である。` },
            {
              k: "p",
              t: String.raw`**$N=5$ の場合。** 表の回数を $r$ とすると $r=A+B+C=3A$ なので $r$ は $3$ の倍数で、$r\le5$ より $r=0,3$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$r=0$：すべて裏。$A=B=C=0$ で条件をみたす。$1$ 通り。`,
                String.raw`$r=3$：$t=2$ なので $j=0,1,2$ の $3$ 個。余り $0,1,2$ の組にそれぞれ $1$ 個ずつ入るので、$A=m_0$、$B=m_1$、$C=m_2$ である。$A=B=C=1$ より $m_0=m_1=m_2=1$ の $1$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$m_0,m_1,\dots,m_t$ の組を決めることと表裏の並びを決めることは1対1に対応するので、条件をみたす並びは $1+1=2$ 通りである。全体は $2^{5}=32$ 通りで、どれも同じ確率だから`,
            },
            { k: "math", t: String.raw`\frac{2}{32}=\frac{1}{16}` },
            { k: "p", t: String.raw`が答えである。` },
          ],
          pitfalls: [
            String.raw`$k$ は「それまでに出た裏の回数」であって何回目かではない。裏が出た回では点は動かず、$k$ が1つ増えるだけである。`,
            String.raw`$\vec{v_0},\vec{v_1},\vec{v_2}$ の3本は1次従属（足すと $\vec0$）なので、$A\vec{v_0}+B\vec{v_1}+C\vec{v_2}=\vec0$ からただちに $A=B=C=0$ とは言えない。$\vec{v_2}$ を消して1次独立な2本にしてから係数を比べる。`,
            String.raw`$r=3$ のときの並びは「表表表裏裏」ではない。$m_0=m_1=m_2=1$ は「表・裏・表・裏・表」という並び1通りを指す。$m_j$ の組と並びの対応を取り違えないこと。`,
          ],
          check: String.raw`$2^{5}=32$ 通りの表裏をすべて並べて $\mathrm{X}_5$ の座標を直接計算すると、原点に戻るのはちょうど $2$ 通り（表 $0$ 回が $1$ 通り、表 $3$ 回が $1$ 通り）で、上の数え方と一致する。確率は $\frac{2}{32}=\frac1{16}=0.0625$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$N=98$ のとき、表がちょうど $90$ 回・裏がちょうど $8$ 回出て、かつ $\mathrm{X}_{98}$ が $\mathrm{O}$ にある確率を求める`,
          answer: String.raw`$\dfrac{496^{3}}{2^{98}}=\dfrac{31^{3}}{2^{86}}=\dfrac{29791}{2^{86}}$`,
          approach: String.raw`(1) の数え方をそのまま使う。裏が $8$ 回なら $m_j$ の番号 $j$ は $0$ から $8$ までの $9$ 個で、$9$ は $3$ の倍数だから、余り $0,1,2$ の3組にちょうど $3$ 個ずつきれいに分かれる。あとは各組で「$3$ 個の数の和を $30$ にする」のを数えるだけで、重複組合せになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) と同じく、$\mathrm{X}_{98}$ が $\mathrm{O}$ にある条件は $A=B=C$ である。表の回数は $r=90$ で $A+B+C=90$ だから`,
            },
            { k: "math", t: String.raw`A=B=C=30` },
            { k: "p", t: String.raw`が条件である。$90$ は $3$ の倍数なので、この条件は矛盾しない。` },
            {
              k: "p",
              t: String.raw`**組の分かれ方。** 裏は $t=8$ 回なので、$m_j$ の番号 $j$ は $0,1,\dots,8$ の $9$ 個ある。$j$ を $3$ で割った余りで分けると`,
            },
            {
              k: "math",
              t: String.raw`\text{余り }0:\;j=0,3,6\qquad\text{余り }1:\;j=1,4,7\qquad\text{余り }2:\;j=2,5,8`,
            },
            { k: "p", t: String.raw`で、どの組もちょうど $3$ 個である。したがって` },
            {
              k: "math",
              t: String.raw`A=m_0+m_3+m_6,\quad B=m_1+m_4+m_7,\quad C=m_2+m_5+m_8`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**数える。** 各組について「$0$ 以上の整数 $3$ 個の和を $30$ にする」組を数えればよい。これは $30$ 個のものを $3$ 個の箱に分ける重複組合せで`,
            },
            {
              k: "math",
              t: String.raw`{}_{30+3-1}\mathrm{C}_{3-1}={}_{32}\mathrm{C}_{2}=\frac{32\cdot31}{2}=496`,
            },
            {
              k: "p",
              t: String.raw`通りである。3つの組は互いに関係なく決められるので、条件をみたす $\left(m_0,m_1,\dots,m_8\right)$ は`,
            },
            { k: "math", t: String.raw`496^{3}=122023936` },
            {
              k: "p",
              t: String.raw`通りある。$m_j$ の組と表裏の並びは1対1に対応し（$m_j$ が決まれば「表を $m_0$ 回、裏、表を $m_1$ 回、裏、…、裏、表を $m_8$ 回」という並びが一意に決まる）、どの組でも表は $90$ 回、裏は $8$ 回で合計 $98$ 回になる。`,
            },
            { k: "p", t: String.raw`全体は $2^{98}$ 通りでどれも同じ確率だから、求める確率は` },
            {
              k: "math",
              t: String.raw`\frac{496^{3}}{2^{98}}=\frac{\left(2^{4}\cdot31\right)^{3}}{2^{98}}=\frac{2^{12}\cdot31^{3}}{2^{98}}=\frac{31^{3}}{2^{86}}=\frac{29791}{2^{86}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$98$ という回数と $90$ 回という指定が効いているのは、裏が $8$ 回だと番号が $9$ 個になり $3$ で割り切れる点である。たとえば裏が $7$ 回（表 $91$ 回）だと番号が $8$ 個で組の個数が $3,3,2$ と不均等になり、しかも $91$ が $3$ の倍数でないので確率は $0$ になる。`,
            },
          ],
          pitfalls: [
            String.raw`番号の個数は裏の回数 $t$ ではなく $t+1$ である。裏が $8$ 回なら「最初の裏より前」も1区間なので $9$ 個になる。ここを $8$ にすると組が $3$ 個ずつに分かれず、答えが変わってしまう。`,
            String.raw`重複組合せは $ {}_{s+n-1}\mathrm{C}_{n-1}$ で、$n$ は箱の数である。$ {}_{32}\mathrm{C}_{2}$ の $2$ は「$3$ 個の箱の仕切り $2$ 本」であって、$3$ ではない。`,
            String.raw`$m_j$ の組を数えたあとに「並べ方」を掛けてはいけない。$m_j$ の組1つに対して表裏の並びはちょうど1通りで、すでに数え上がっている。`,
            String.raw`最後に約分する。$496=2^{4}\cdot31$ に気づけば $\frac{31^{3}}{2^{86}}$ まで下げられる。`,
          ],
          check: String.raw`小さい場合で同じ数え方を試すと、$(N,r)=(11,3)$ では番号 $9$ 個・各組3個・和 $1$ なので $\left({}_{3}\mathrm{C}_{2}\right)^{3}=27$ 通り、$(N,r)=(14,6)$ では和 $2$ なので $\left({}_{4}\mathrm{C}_{2}\right)^{3}=216$ 通りになる。$2^{11}$、$2^{14}$ 通りの全探索でも、原点に戻る並びはそれぞれちょうど $27$ 通り、$216$ 通りだった。`,
        },
      ],
    },
  ],
};
