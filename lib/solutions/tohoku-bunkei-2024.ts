import { tohokuRikei2024 } from "@/lib/solutions/tohoku-rikei-2024";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2024年度（令和6年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第1問は理系の第1問、文系の第3問は理系の第2問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理系の側から借りる。第2問・第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2024.questions.find((q) => q.no === no)!;

/** 理系 第1問（2次関数・積分法）。文系の第1問とまったく同じ問題。 */
const sharedHoubutsu: Question = { ...rikei(1), no: 1 };

/** 理系 第2問（対数・不等式）。文系の第3問とまったく同じ問題。 */
const sharedTaisuu: Question = { ...rikei(2), no: 3 };

/** 第2問の図。$d=\sqrt3$、$a=3+2\sqrt3$、$b=2\sqrt3-3$。 */
const D24 = Math.sqrt(3);
const A24 = 3 + 2 * Math.sqrt(3);
const B24 = 2 * Math.sqrt(3) - 3;
/** 原点から直線 XY に下ろした垂線の足。 */
const foot24 = (X: [number, number], Y: [number, number]): [number, number] => {
  const dx = Y[0] - X[0];
  const dy = Y[1] - X[1];
  const t = -(X[0] * dx + X[1] * dy) / (dx * dx + dy * dy);
  return [X[0] + t * dx, X[1] + t * dy];
};
const PT_O24: [number, number] = [0, 0];
const PT_A24: [number, number] = [A24, 0];
const PT_B24: [number, number] = [B24, 0];
const PT_D24: [number, number] = [0, D24];
const PT_P24 = foot24(PT_A24, PT_D24);
const PT_Q24 = foot24(PT_B24, PT_D24);

export const tohokuBunkei2024: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    sharedHoubutsu,
    {
      no: 2,
      field: "図形と計量",
      topics: ["加法定理", "直角三角形と tan", "方べきの定理", "相似"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=3+2\\sqrt3$、$b=2\\sqrt3-3$、$d=\\sqrt3$ で $\\angle\\mathrm{OAD}=15.000000000^{\\circ}$、$\\angle\\mathrm{OBD}=75.000000000^{\\circ}$、$\\mathrm{AB}=6.000000000$ になった",
          "$\\mathrm{P},\\mathrm{Q}$ を「原点から $\\mathrm{AD},\\mathrm{BD}$ に下ろした垂線の足」として計算すると、どちらも円 $C$ 上に乗った",
          "$\\mathrm{AP}\\cdot\\mathrm{AD}=\\mathrm{AO}^{2}=41.784609691$、$\\mathrm{BQ}\\cdot\\mathrm{BD}=\\mathrm{BO}^{2}=0.215390309$ と一致した",
          "$\\mathrm{AP}\\cdot\\mathrm{BQ}=0.750000000$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\tan75^{\circ}$ の値を求める`,
          answer: String.raw`$\tan75^{\circ}=2+\sqrt3$`,
          approach: String.raw`$75^{\circ}=45^{\circ}+30^{\circ}$ と見て加法定理。分母を有理化すると平方がきれいにほどける。`,
          blocks: [
            { k: "p", t: String.raw`$\tan$ の加法定理より` },
            {
              k: "math",
              t: String.raw`\tan75^{\circ}=\tan\left(45^{\circ}+30^{\circ}\right)=\frac{\tan45^{\circ}+\tan30^{\circ}}{1-\tan45^{\circ}\tan30^{\circ}}=\frac{1+\frac{1}{\sqrt3}}{1-\frac{1}{\sqrt3}}`,
            },
            { k: "p", t: String.raw`である。分母・分子を $\sqrt3$ 倍すると` },
            {
              k: "math",
              t: String.raw`=\frac{\sqrt3+1}{\sqrt3-1}=\frac{\left(\sqrt3+1\right)^{2}}{\left(\sqrt3-1\right)\left(\sqrt3+1\right)}=\frac{4+2\sqrt3}{2}=2+\sqrt3`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`ついでに $\tan15^{\circ}=\dfrac{1}{\tan75^{\circ}}=\dfrac{1}{2+\sqrt3}=2-\sqrt3$ も出る（$15^{\circ}$ と $75^{\circ}$ は余角どうし）。`,
            },
          ],
          check: String.raw`$\tan75^{\circ}=3.732050808$ で $2+\sqrt3=3.732050808$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$a,b,d$ を正の実数とし、$xy$ 平面上の点 $\mathrm{O}(0,0)$、$\mathrm{A}(a,0)$、$\mathrm{B}(b,0)$、$\mathrm{D}(0,d)$ が $\angle\mathrm{OAD}=15^{\circ}$、$\angle\mathrm{OBD}=75^{\circ}$、$\mathrm{AB}=6$ をすべて満たすとき、$a,b,d$ の値をそれぞれ求める`,
          answer: String.raw`$a=3+2\sqrt3$、$b=2\sqrt3-3$、$d=\sqrt3$`,
          approach: String.raw`$\triangle\mathrm{OAD}$ も $\triangle\mathrm{OBD}$ も $\mathrm{O}$ が直角である。だから $\tan$ の定義そのままで $a,b$ を $d$ で表せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ と $\mathrm{B}$ は $x$ 軸上、$\mathrm{D}$ は $y$ 軸上にあるので、$\triangle\mathrm{OAD}$ と $\triangle\mathrm{OBD}$ はどちらも $\angle\mathrm{AOD}=\angle\mathrm{BOD}=90^{\circ}$ の直角三角形である。したがって`,
            },
            {
              k: "math",
              t: String.raw`\tan15^{\circ}=\tan\angle\mathrm{OAD}=\frac{\mathrm{OD}}{\mathrm{OA}}=\frac{d}{a},\qquad\tan75^{\circ}=\tan\angle\mathrm{OBD}=\frac{\mathrm{OD}}{\mathrm{OB}}=\frac{d}{b}`,
            },
            { k: "p", t: String.raw`である。(1) と $\tan15^{\circ}=2-\sqrt3$ より` },
            {
              k: "math",
              t: String.raw`a=\frac{d}{2-\sqrt3}=d\left(2+\sqrt3\right),\qquad b=\frac{d}{2+\sqrt3}=d\left(2-\sqrt3\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{1}{2-\sqrt3}=2+\sqrt3$、$\dfrac{1}{2+\sqrt3}=2-\sqrt3$）。$2+\sqrt3>2-\sqrt3>0$ なので $a>b>0$ であり`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AB}=a-b=d\left\{\left(2+\sqrt3\right)-\left(2-\sqrt3\right)\right\}=2\sqrt3\,d=6`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`d=\frac{6}{2\sqrt3}=\frac{3}{\sqrt3}=\sqrt3`,
            },
            { k: "p", t: String.raw`で、これを代入して` },
            {
              k: "math",
              t: String.raw`a=\sqrt3\left(2+\sqrt3\right)=3+2\sqrt3,\qquad b=\sqrt3\left(2-\sqrt3\right)=2\sqrt3-3`,
            },
            {
              k: "p",
              t: String.raw`である。$2\sqrt3=3.46\cdots>3$ なので $b>0$ も満たしている。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AB}=\left|a-b\right|$ である。$\tan75^{\circ}>\tan15^{\circ}$ から $a>b$ を確かめてから引く。`,
          ],
          check: String.raw`この $a,b,d$ で角と長さを計算し直すと $15^{\circ}$、$75^{\circ}$、$\mathrm{AB}=6$ がぴったり出た。`,
        },
        {
          label: "(3)",
          task: String.raw`2点 $\mathrm{O},\mathrm{D}$ を直径の両端とする円を $C$ とし、線分 $\mathrm{AD}$ と $C$ の交点のうち $\mathrm{D}$ と異なるものを $\mathrm{P}$、線分 $\mathrm{BD}$ と $C$ の交点のうち $\mathrm{D}$ と異なるものを $\mathrm{Q}$ とするとき、$\mathrm{AP}\cdot\mathrm{AD}=\mathrm{AO}^{2}$、$\mathrm{BQ}\cdot\mathrm{BD}=\mathrm{BO}^{2}$ を示す`,
          answer: String.raw`$x$ 軸は $C$ に $\mathrm{O}$ で接している。接線と割線についての方べきの定理そのもの`,
          approach: String.raw`$\mathrm{OD}$ が直径で、$\mathrm{OA}\perp\mathrm{OD}$。つまり $x$ 軸は円 $C$ と $\mathrm{O}$ で接している。あとは方べきの定理の「接線版」をあてはめるだけ。相似を使って直接示してもよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C$ の中心は $\mathrm{OD}$ の中点 $\left(0,\dfrac d2\right)$ である。中心から $x$ 軸までの距離は $\dfrac d2$ で、これは半径に等しい。したがって`,
            },
            {
              k: "math",
              t: String.raw`x\ \text{軸は円}\ C\ \text{に点}\ \mathrm{O}\ \text{で接する}`,
            },
            {
              k: "p",
              t: String.raw`である。直線 $\mathrm{AD}$ は $C$ と2点 $\mathrm{P},\mathrm{D}$ で交わるから、点 $\mathrm{A}$ についての方べきの定理（接線と割線）より`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}\cdot\mathrm{AD}=\mathrm{AO}^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。同じく直線 $\mathrm{BD}$ は $C$ と2点 $\mathrm{Q},\mathrm{D}$ で交わるので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{BQ}\cdot\mathrm{BD}=\mathrm{BO}^{2}`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "figure",
              fig: {
                caption:
                  "円 C は OD を直径とする円で、x 軸と O で接している。∠OPD も ∠OQD も直径に対する円周角なので 90°、つまり OP ⊥ AD、OQ ⊥ BD。破線が垂線 OP, OQ。a = 3 + 2√3 ≒ 6.46、b = 2√3 - 3 ≒ 0.46、d = √3 ≒ 1.73。",
                view: [-1.0, 7.2, -0.9, 2.6],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [(D24 / 2) * Math.cos(t), D24 / 2 + (D24 / 2) * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: PT_O24, b: PT_D24 },
                  { k: "seg", a: PT_A24, b: PT_D24 },
                  { k: "seg", a: PT_B24, b: PT_D24 },
                  { k: "seg", a: PT_O24, b: PT_P24, dash: true },
                  { k: "seg", a: PT_O24, b: PT_Q24, dash: true },
                  { k: "dot", at: PT_O24, label: "O", place: "below-left" },
                  { k: "dot", at: PT_B24, label: "B", place: "below" },
                  { k: "dot", at: PT_A24, label: "A", place: "below" },
                  { k: "dot", at: PT_D24, label: "D", place: "above-left" },
                  { k: "dot", at: PT_P24, label: "P", place: "above" },
                  { k: "dot", at: PT_Q24, label: "Q", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**方べきの定理を使わずに示すなら。** $\mathrm{OD}$ は直径なので、円周角の定理より $\angle\mathrm{OPD}=90^{\circ}$、すなわち $\mathrm{OP}\perp\mathrm{AD}$ である。$\triangle\mathrm{APO}$ と $\triangle\mathrm{AOD}$ を比べると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\angle\mathrm{A}$ は共通`,
                String.raw`$\angle\mathrm{APO}=\angle\mathrm{AOD}=90^{\circ}$`,
              ],
            },
            { k: "p", t: String.raw`なので2角が等しく、$\triangle\mathrm{APO}\sim\triangle\mathrm{AOD}$ である。対応する辺の比から` },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{AP}}{\mathrm{AO}}=\frac{\mathrm{AO}}{\mathrm{AD}},\qquad\mathrm{AP}\cdot\mathrm{AD}=\mathrm{AO}^{2}`,
            },
            { k: "p", t: String.raw`となる。$\mathrm{B}$ 側もまったく同じである。` },
          ],
          pitfalls: [
            String.raw`$x$ 軸が円 $C$ の接線であることを言うのが要点。$\mathrm{OD}$ が直径で $\mathrm{OA}\perp\mathrm{OD}$ だからである。`,
          ],
          check: String.raw`数値で $\mathrm{AP}\cdot\mathrm{AD}=41.784609691=\mathrm{AO}^{2}$、$\mathrm{BQ}\cdot\mathrm{BD}=0.215390309=\mathrm{BO}^{2}$ だった。`,
        },
        {
          label: "(4)",
          task: String.raw`(3) の点 $\mathrm{P},\mathrm{Q}$ に対し、積 $\mathrm{AP}\cdot\mathrm{BQ}$ の値を求める`,
          answer: String.raw`$\mathrm{AP}\cdot\mathrm{BQ}=\dfrac34$`,
          approach: String.raw`(3) から $\mathrm{AP}=\dfrac{\mathrm{AO}^{2}}{\mathrm{AD}}$、$\mathrm{BQ}=\dfrac{\mathrm{BO}^{2}}{\mathrm{BD}}$。あとは $\mathrm{AD},\mathrm{BD}$ を三平方の定理で出して掛けるだけ。積の形なので、平方どうしがきれいに約分される。`,
          blocks: [
            { k: "p", t: String.raw`(3) より` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}=\frac{\mathrm{AO}^{2}}{\mathrm{AD}}=\frac{a^{2}}{\sqrt{a^{2}+d^{2}}},\qquad\mathrm{BQ}=\frac{\mathrm{BO}^{2}}{\mathrm{BD}}=\frac{b^{2}}{\sqrt{b^{2}+d^{2}}}`,
            },
            { k: "p", t: String.raw`である。(2) の値を入れる。$a=3+2\sqrt3$、$b=2\sqrt3-3$、$d=\sqrt3$ なので` },
            {
              k: "math",
              t: String.raw`a^{2}=21+12\sqrt3,\qquad b^{2}=21-12\sqrt3,\qquad d^{2}=3`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`a^{2}b^{2}=\left(21\right)^{2}-\left(12\sqrt3\right)^{2}=441-432=9`,
            },
            { k: "p", t: String.raw`で、また` },
            {
              k: "math",
              t: String.raw`\left(a^{2}+d^{2}\right)\left(b^{2}+d^{2}\right)=\left(24+12\sqrt3\right)\left(24-12\sqrt3\right)=576-432=144`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{AP}\cdot\mathrm{BQ}=\frac{a^{2}b^{2}}{\sqrt{\left(a^{2}+d^{2}\right)\left(b^{2}+d^{2}\right)}}=\frac{9}{\sqrt{144}}=\frac{9}{12}=\frac34`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`角で書くと見通しがよい。$\mathrm{AD}=\dfrac{d}{\sin15^{\circ}}$、$\mathrm{AO}=\dfrac{d}{\tan15^{\circ}}$ なので $\mathrm{AP}=\dfrac{d\cos^{2}15^{\circ}}{\sin15^{\circ}}$、同様に $\mathrm{BQ}=\dfrac{d\cos^{2}75^{\circ}}{\sin75^{\circ}}$ である。$\cos75^{\circ}=\sin15^{\circ}$、$\sin75^{\circ}=\cos15^{\circ}$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{AP}\cdot\mathrm{BQ}=d^{2}\sin15^{\circ}\cos15^{\circ}=\frac{d^{2}}{2}\sin30^{\circ}=\frac{d^{2}}{4}=\frac34`,
            },
            {
              k: "p",
              t: String.raw`となる。$15^{\circ}$ と $75^{\circ}$ が足して $90^{\circ}$ であることが効いている。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AP}$ と $\mathrm{BQ}$ を別々に根号のまま求めようとすると面倒になる。積にしてから計算すると根号が外れる。`,
          ],
          check: String.raw`数値では $\mathrm{AP}\cdot\mathrm{BQ}=0.750000000$ だった。`,
        },
      ],
    },
    sharedTaisuu,
    {
      no: 4,
      field: "整数",
      topics: ["共役な無理数", "連立漸化式", "数学的帰納法", "1次不定方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n+1}=a_{n}+2b_{n}$、$b_{n+1}=a_{n}+b_{n}$ で $n=1$ から $14$ まで作った $a_{n},b_{n}$ が $\\left(1+\\sqrt2\\right)^{n}$ と一致した",
          "同じ $a_{n},b_{n}$ で $\\left(1-\\sqrt2\\right)^{n}=a_{n}-b_{n}\\sqrt2$ も $n=14$ まで成り立った",
          "$b_{4},b_{5},b_{6}=12,29,70$、$b_{n+1}b_{n-1}-b_{n}^{2}$ は $n=2$ から $8$ まで $1,-1,1,-1,1,-1,1$ だった",
          "$70p-29q=1$、$0\\leqq p,q\\leqq100$ の整数解は $\\left(p,q\\right)=\\left(17,41\\right)$ だけだった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を正の整数とし、2つの整数 $a_{n},b_{n}$ を $\left(1+\sqrt2\right)^{n}=a_{n}+b_{n}\sqrt2$ で定める。$a_{n+1},b_{n+1}$ を $a_{n},b_{n}$ を用いてそれぞれ表し、さらに $b_{4},b_{5},b_{6}$ の値を求める`,
          answer: String.raw`$a_{n+1}=a_{n}+2b_{n}$、$b_{n+1}=a_{n}+b_{n}$。$b_{4}=12$、$b_{5}=29$、$b_{6}=70$`,
          approach: String.raw`$\left(1+\sqrt2\right)^{n+1}=\left(1+\sqrt2\right)^{n}\left(1+\sqrt2\right)$ を展開し、$\sqrt2$ が無理数であることから係数を比べる。`,
          blocks: [
            { k: "p", t: String.raw`$\left(1+\sqrt2\right)^{n+1}=\left(a_{n}+b_{n}\sqrt2\right)\left(1+\sqrt2\right)$ を展開すると` },
            {
              k: "math",
              t: String.raw`=a_{n}+a_{n}\sqrt2+b_{n}\sqrt2+2b_{n}=\left(a_{n}+2b_{n}\right)+\left(a_{n}+b_{n}\right)\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt2$ は無理数なので、整数 $a_{n+1},b_{n+1}$ との表しかたは1通りに決まる。よって`,
            },
            {
              k: "math",
              t: String.raw`a_{n+1}=a_{n}+2b_{n},\qquad b_{n+1}=a_{n}+b_{n}`,
            },
            { k: "p", t: String.raw`である。$a_{1}=b_{1}=1$ から順に計算すると` },
            {
              k: "steps",
              items: [
                String.raw`$\left(a_{2},b_{2}\right)=\left(1+2,\ 1+1\right)=\left(3,2\right)$`,
                String.raw`$\left(a_{3},b_{3}\right)=\left(3+4,\ 3+2\right)=\left(7,5\right)$`,
                String.raw`$\left(a_{4},b_{4}\right)=\left(7+10,\ 7+5\right)=\left(17,12\right)$`,
                String.raw`$\left(a_{5},b_{5}\right)=\left(17+24,\ 17+12\right)=\left(41,29\right)$`,
                String.raw`$\left(a_{6},b_{6}\right)=\left(41+58,\ 41+29\right)=\left(99,70\right)$`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`b_{4}=12,\qquad b_{5}=29,\qquad b_{6}=70`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`この漸化式で作った $a_{n}+b_{n}\sqrt2$ は $n=14$ まで $\left(1+\sqrt2\right)^{n}$ と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`等式 $\left(1-\sqrt2\right)^{n}=a_{n}-b_{n}\sqrt2$ が成り立つことを数学的帰納法を用いて示す`,
          answer: String.raw`$\sqrt2$ の符号を反転させた掛け算が、(1) の漸化式をそのまま再現する`,
          approach: String.raw`$n=1$ を確かめ、$n$ から $n+1$ は (1) とまったく同じ展開をする。$\sqrt2$ の前の符号が逆になるだけ。`,
          blocks: [
            { k: "p", t: String.raw`**$n=1$。** $a_{1}=b_{1}=1$ なので $a_{1}-b_{1}\sqrt2=1-\sqrt2$ ✓。` },
            { k: "p", t: String.raw`**$n\to n+1$。** $\left(1-\sqrt2\right)^{n}=a_{n}-b_{n}\sqrt2$ と仮定する。このとき` },
            {
              k: "math",
              t: String.raw`\left(1-\sqrt2\right)^{n+1}=\left(a_{n}-b_{n}\sqrt2\right)\left(1-\sqrt2\right)=a_{n}-a_{n}\sqrt2-b_{n}\sqrt2+2b_{n}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`=\left(a_{n}+2b_{n}\right)-\left(a_{n}+b_{n}\right)\sqrt2=a_{n+1}-b_{n+1}\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`である（最後は (1) の漸化式）。よって $n+1$ でも成り立つ。数学的帰納法よりすべての正の整数 $n$ で成り立つ。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$1+\sqrt2$ と $1-\sqrt2$ は「共役」な数で、足し算・掛け算をしても $\sqrt2$ の符号が入れかわるだけ、という関係が保たれる。`,
            },
          ],
          check: String.raw`(1) で作った $a_{n},b_{n}$ について $a_{n}-b_{n}\sqrt2$ を計算すると、$n=14$ まで $\left(1-\sqrt2\right)^{n}$ と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$n\geqq2$ のとき、$b_{n+1}b_{n-1}-b_{n}^{2}$ を求める`,
          answer: String.raw`$b_{n+1}b_{n-1}-b_{n}^{2}=\left(-1\right)^{n}$`,
          approach: String.raw`(1)(2) を掛け合わせると $a_{n}^{2}-2b_{n}^{2}=\left(-1\right)^{n}$ が出る。あとは $b_{n+1},b_{n-1}$ を $a_{n},b_{n}$ で書き直せばよい。`,
          blocks: [
            { k: "p", t: String.raw`(1) と (2) の両辺を掛けると` },
            {
              k: "math",
              t: String.raw`\left(1+\sqrt2\right)^{n}\left(1-\sqrt2\right)^{n}=\left(a_{n}+b_{n}\sqrt2\right)\left(a_{n}-b_{n}\sqrt2\right)`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(1-2\right)^{n}=a_{n}^{2}-2b_{n}^{2},\qquad a_{n}^{2}-2b_{n}^{2}=\left(-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`次に $b_{n\pm1}$ を $a_{n},b_{n}$ で書く。(1) より $b_{n+1}=a_{n}+b_{n}$ である。また $n\geqq2$ のとき (1) を $n-1$ で使うと`,
            },
            {
              k: "math",
              t: String.raw`a_{n}=a_{n-1}+2b_{n-1},\qquad b_{n}=a_{n-1}+b_{n-1}`,
            },
            { k: "p", t: String.raw`なので、辺々引いて` },
            {
              k: "math",
              t: String.raw`a_{n}-b_{n}=b_{n-1}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`b_{n+1}b_{n-1}=\left(a_{n}+b_{n}\right)\left(a_{n}-b_{n}\right)=a_{n}^{2}-b_{n}^{2}`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`b_{n+1}b_{n-1}-b_{n}^{2}=a_{n}^{2}-2b_{n}^{2}=\left(-1\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$b_{n-1}=a_{n}-b_{n}$ を出すところが山場。(1) の2本の漸化式を $n-1$ で書いて引けばよい。`,
          ],
          check: String.raw`$n=2$ から $8$ まで $b_{n+1}b_{n-1}-b_{n}^{2}$ を計算すると $1,-1,1,-1,1,-1,1$ で、$\left(-1\right)^{n}$ と一致した。`,
        },
        {
          label: "(4)",
          task: String.raw`$pb_{6}-qb_{5}=1$、$0\leqq p\leqq100$、$0\leqq q\leqq100$ をすべて満たす整数 $p,q$ の組 $\left(p,q\right)$ を1組求める`,
          answer: String.raw`$\left(p,q\right)=\left(17,41\right)$`,
          approach: String.raw`(3) を $n=5$ で使うと $70\cdot12-29^{2}=-1$ という具体的な等式が手に入る。これを出発点にして、$70$ と $29$ の倍数を足し引きして範囲に入れる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $b_{6}=70$、$b_{5}=29$ なので、求める式は` },
            { k: "math", t: String.raw`70p-29q=1` },
            { k: "p", t: String.raw`である。(3) を $n=5$ で使うと` },
            {
              k: "math",
              t: String.raw`b_{6}b_{4}-b_{5}^{2}=\left(-1\right)^{5}=-1,\qquad 70\cdot12-29\cdot29=-1`,
            },
            { k: "p", t: String.raw`である（$840-841=-1$ ✓）。両辺に $-1$ を掛けると` },
            {
              k: "math",
              t: String.raw`70\cdot\left(-12\right)-29\cdot\left(-29\right)=1`,
            },
            {
              k: "p",
              t: String.raw`なので $\left(p,q\right)=\left(-12,-29\right)$ は方程式を満たす。ただし範囲外である。`,
            },
            {
              k: "p",
              t: String.raw`$70\cdot29-29\cdot70=0$ なので、$\left(p,q\right)$ を $\left(p+29,\ q+70\right)$ に取りかえても方程式は成り立つ。1回ずらすと`,
            },
            {
              k: "math",
              t: String.raw`\left(p,q\right)=\left(-12+29,\ -29+70\right)=\left(17,41\right)`,
            },
            { k: "p", t: String.raw`となり、$0\leqq17\leqq100$、$0\leqq41\leqq100$ を満たす。実際` },
            {
              k: "math",
              t: String.raw`70\cdot17-29\cdot41=1190-1189=1`,
            },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`\left(p,q\right)=\left(17,41\right)` },
            { k: "p", t: String.raw`が条件を満たす。` },
            {
              k: "note",
              t: String.raw`もう1回ずらすと $\left(46,111\right)$ で $q$ が $100$ を超える。したがって範囲内の組はこの1組だけである。また $17=a_{4}$、$41=a_{5}$ になっているのも偶然ではない。`,
            },
          ],
          pitfalls: [
            String.raw`(3) をどの $n$ で使うかを考える。$b_{6},b_{5}$ が出てくるのは $n=5$ のときである。`,
            String.raw`$70$ と $29$ は互いに素なので、解は $29$ と $70$ ずつずれて無数にある。範囲に入るものを選ぶ。`,
          ],
          check: String.raw`$0\leqq p,q\leqq100$ を全探索すると、$70p-29q=1$ の解は $\left(17,41\right)$ だけだった。`,
        },
      ],
    },
  ],
};
