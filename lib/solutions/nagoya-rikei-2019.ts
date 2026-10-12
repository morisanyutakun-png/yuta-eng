import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2019年度（平成31年度）一般入試 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

/** 第1問(3) の図。高さ $z$ での切り口は半径 $r=1-z$ の円で、$x\geqq\tfrac12$ の部分が弓形になる。 */
const R19 = 0.8;
const T19 = Math.acos(0.5 / R19);
/** 弓形の輪郭（弦 $x=\tfrac12$ と円弧）。 */
const SEG19: [number, number][] = [
  [0.5, -R19 * Math.sin(T19)],
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const t = -T19 + (2 * T19 * i) / 40;
    return [R19 * Math.cos(t), R19 * Math.sin(t)];
  }),
];

/** 第2問(3) の $\triangle\mathrm{AB}'\mathrm{C}'$。$\mathrm{AB}'=4$、$\mathrm{AC}'=\sqrt{21}$、$\mathrm{B}'\mathrm{C}'=7$。 */
const AC19 = Math.sqrt(21);
const COS19 = (16 + 21 - 49) / (2 * 4 * AC19);
const CP19: [number, number] = [AC19 * COS19, AC19 * Math.sqrt(1 - COS19 * COS19)];

export const nagoyaRikei2019: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["漸化式のある定積分", "部分積分", "円錐の切断", "弓形の面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$I_{1}$ をシンプソン法で数値積分すると $1.3169578969$ で、$\\log\\left(2+\\sqrt{3}\\right)=1.3169578969$ と一致した",
          "$n=3$ から $8$ まで $I_{n}$ を数値積分し、$\\dfrac{\\sqrt{3}\\cdot2^{n-2}+(n-2)I_{n-2}}{n-1}$ と小数9桁まで一致することを確かめた",
          "弓形の面積 $r^{2}\\arccos\\dfrac{1}{2r}-\\dfrac12\\sqrt{r^{2}-\\dfrac14}$ を $z$ で積分すると $0.1152639615$、$\\dfrac{\\pi}{9}-\\dfrac{\\sqrt{3}}{6}+\\dfrac{\\log\\left(2+\\sqrt{3}\\right)}{24}=0.1152639615$ だった",
          "200万点のモンテカルロでも体積は $0.115162$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$I_{n}=\displaystyle\int_{0}^{\frac{\pi}{3}}\frac{d\theta}{\cos^{n}\theta}$ について $I_{1}$ を求める`,
          answer: String.raw`$I_{1}=\log\left(2+\sqrt{3}\right)$`,
          approach: String.raw`問題に与えられた分解 $\dfrac{1}{\cos\theta}=\dfrac12\left(\dfrac{\cos\theta}{1+\sin\theta}+\dfrac{\cos\theta}{1-\sin\theta}\right)$ をそのまま使う。分子が分母の微分（の $\pm$）になっているので、どちらも $\log$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$\left(1+\sin\theta\right)'=\cos\theta$、$\left(1-\sin\theta\right)'=-\cos\theta$ なので` },
            {
              k: "math",
              t: String.raw`\int\frac{d\theta}{\cos\theta}=\frac{1}{2}\left\{\log\left(1+\sin\theta\right)-\log\left(1-\sin\theta\right)\right\}+C=\frac{1}{2}\log\frac{1+\sin\theta}{1-\sin\theta}+C`,
            },
            { k: "p", t: String.raw`である（$0\leqq\theta\leqq\tfrac\pi3$ では $1\pm\sin\theta>0$）。$\sin\tfrac\pi3=\tfrac{\sqrt3}{2}$、$\sin0=0$ だから` },
            {
              k: "math",
              t: String.raw`I_{1}=\frac{1}{2}\log\frac{1+\frac{\sqrt{3}}{2}}{1-\frac{\sqrt{3}}{2}}=\frac{1}{2}\log\frac{2+\sqrt{3}}{2-\sqrt{3}}`,
            },
            { k: "p", t: String.raw`である。分母を有理化すると $\left(2-\sqrt3\right)\left(2+\sqrt3\right)=1$ だから` },
            {
              k: "math",
              t: String.raw`\frac{2+\sqrt{3}}{2-\sqrt{3}}=\left(2+\sqrt{3}\right)^{2}`,
            },
            { k: "p", t: String.raw`で、したがって` },
            {
              k: "math",
              t: String.raw`I_{1}=\frac{1}{2}\log\left(2+\sqrt{3}\right)^{2}=\log\left(2+\sqrt{3}\right)`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\dfrac{2+\sqrt3}{2-\sqrt3}$ をそのまま $\log$ に残さない。$\left(2-\sqrt3\right)\left(2+\sqrt3\right)=1$ で平方になる。`,
          ],
          check: String.raw`数値積分で $1.3169578969$、$\log\left(2+\sqrt3\right)=1.3169578969$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$n\geqq3$ のとき $I_{n}$ を $I_{n-2}$ と $n$ で表す`,
          answer: String.raw`$I_{n}=\dfrac{\sqrt{3}\cdot2^{n-2}+\left(n-2\right)I_{n-2}}{n-1}$`,
          approach: String.raw`$\dfrac{\tan\theta}{\cos^{n-2}\theta}$ を微分すると $\dfrac{1}{\cos^{n}\theta}$ と $\dfrac{1}{\cos^{n-2}\theta}$ だけが出てくる。これを $0$ から $\tfrac\pi3$ まで積分すれば、そのまま漸化式になる。部分積分を「微分して確かめる」向きに使うのがいちばん速い。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{\tan\theta}{\cos^{n-2}\theta}$ を微分する。積の微分で` },
            {
              k: "math",
              t: String.raw`\frac{d}{d\theta}\left(\frac{\tan\theta}{\cos^{n-2}\theta}\right)=\frac{1}{\cos^{2}\theta}\cdot\frac{1}{\cos^{n-2}\theta}+\tan\theta\cdot\frac{\left(n-2\right)\sin\theta}{\cos^{n-1}\theta}`,
            },
            { k: "p", t: String.raw`である（$\left(\cos^{-(n-2)}\theta\right)'=\left(n-2\right)\sin\theta\cos^{-(n-1)}\theta$）。まとめると` },
            {
              k: "math",
              t: String.raw`=\frac{1}{\cos^{n}\theta}+\frac{\left(n-2\right)\sin^{2}\theta}{\cos^{n}\theta}=\frac{1}{\cos^{n}\theta}+\frac{\left(n-2\right)\left(1-\cos^{2}\theta\right)}{\cos^{n}\theta}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{d}{d\theta}\left(\frac{\tan\theta}{\cos^{n-2}\theta}\right)=\frac{n-1}{\cos^{n}\theta}-\frac{n-2}{\cos^{n-2}\theta}`,
            },
            { k: "p", t: String.raw`である。両辺を $0$ から $\tfrac\pi3$ まで積分すると、右辺は $\left(n-1\right)I_{n}-\left(n-2\right)I_{n-2}$ で、左辺は` },
            {
              k: "math",
              t: String.raw`\left[\frac{\tan\theta}{\cos^{n-2}\theta}\right]_{0}^{\frac{\pi}{3}}=\frac{\sqrt{3}}{\left(\frac{1}{2}\right)^{n-2}}-0=\sqrt{3}\cdot2^{n-2}`,
            },
            { k: "p", t: String.raw`である（$\tan\tfrac\pi3=\sqrt3$、$\cos\tfrac\pi3=\tfrac12$）。よって` },
            {
              k: "math",
              t: String.raw`\left(n-1\right)I_{n}-\left(n-2\right)I_{n-2}=\sqrt{3}\cdot2^{n-2}`,
            },
            { k: "p", t: String.raw`で、$n\geqq3$ より $n-1\neq0$ だから` },
            {
              k: "math",
              t: String.raw`I_{n}=\frac{\sqrt{3}\cdot2^{n-2}+\left(n-2\right)I_{n-2}}{n-1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=3$ とすると $I_{3}=\dfrac{2\sqrt3+I_{1}}{2}=\sqrt{3}+\dfrac{1}{2}\log\left(2+\sqrt{3}\right)$ である。(3) で使う。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{1}{\cos^{n}\theta}=\dfrac{1}{\cos^{n-2}\theta}\cdot\dfrac{1}{\cos^{2}\theta}$ と見て部分積分してもよいが、「何を微分すると目的の形が出るか」から入るほうが計算が短い。`,
            String.raw`$\sin^{2}\theta=1-\cos^{2}\theta$ で次数を2つ下げるのがこの種の漸化式の要である。`,
          ],
          check: String.raw`$n=3$ から $8$ まで $I_{n}$ を数値積分し、この式の右辺と小数9桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`$xy$ 平面の原点を中心とする半径 $1$ の円板 $D$ を底面、$(0,0,1)$ を頂点とする円錐 $C$ を平面 $x=\tfrac12$ で2つに切ったとき、小さいほうの立体 $S$ の体積を求める`,
          answer: String.raw`$\dfrac{\pi}{9}-\dfrac{\sqrt{3}}{6}+\dfrac{1}{24}\log\left(2+\sqrt{3}\right)$`,
          approach: String.raw`$z$ 軸に垂直な平面で切ると、円錐の切り口は半径 $1-z$ の円板で、$S$ の切り口はそれを弦 $x=\tfrac12$ で切った**弓形**になる。弓形の面積を $z$ の式で書いて積分する。$\arccos$ が出るので、$\dfrac{1}{2r}=\cos\theta$ と置換すると (1)(2) の $I_{n}$ に帰着する。`,
          blocks: [
            {
              k: "figure",
              fig: {
                caption:
                  "高さ z での切り口。円錐の断面は半径 r = 1 - z の円で、S の断面は弦 x = 1/2 より右の弓形（網かけ）。中心角の半分を θ とすると cos θ = 1/(2r)。図は r = 0.8 の場合。",
                view: [-1.3, 1.3, -1.15, 1.15],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: SEG19 },
                  { k: "param", f: (t: number) => [Math.cos(t), Math.sin(t)], from: 0, to: 2 * Math.PI, faint: true },
                  {
                    k: "param",
                    f: (t: number) => [R19 * Math.cos(t), R19 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [0.5, -1.1], b: [0.5, 1.1], dash: true },
                  { k: "seg", a: [0, 0], b: [R19 * Math.cos(T19), R19 * Math.sin(T19)] },
                  { k: "seg", a: [0, 0], b: [R19, 0], faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "text", at: [0.28, 0.13], label: "θ", place: "right" },
                  { k: "text", at: [0.5, 1.1], label: "x = 1/2", place: "above-left" },
                  { k: "text", at: [-0.72, 0.72], label: "半径 r = 1 - z", place: "left" },
                  { k: "text", at: [-0.78, -0.78], label: "底面 D", place: "below-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**切り口の面積。** 高さ $z$（$0\leqq z\leqq1$）での円錐の切り口は、原点を中心とする半径 $r=1-z$ の円板である。$S$ はこのうち $x\geqq\tfrac12$ の部分だから、切り口は弦 $x=\tfrac12$ で切り取られる弓形になる。$r\leqq\tfrac12$、つまり $z\geqq\tfrac12$ では空である。`,
            },
            {
              k: "p",
              t: String.raw`$0\leqq z<\tfrac12$ のとき、弓形を挟む中心角の半分を $\theta$ とすると $\cos\theta=\dfrac{1}{2r}$ である。弓形の面積は「扇形 $-$ 三角形」で`,
            },
            {
              k: "math",
              t: String.raw`A(r)=r^{2}\theta-\frac{1}{2}\cdot\frac{1}{2}\cdot2r\sin\theta=r^{2}\theta-\frac{1}{2}\sqrt{r^{2}-\frac{1}{4}}`,
            },
            {
              k: "p",
              t: String.raw`である（扇形は中心角 $2\theta$ で面積 $\tfrac12r^{2}\cdot2\theta=r^{2}\theta$、三角形は底辺 $2r\sin\theta=2\sqrt{r^{2}-\tfrac14}$、高さ $\tfrac12$）。`,
            },
            { k: "p", t: String.raw`**積分する。** 求める体積は` },
            {
              k: "math",
              t: String.raw`V=\int_{0}^{\frac{1}{2}}A\left(1-z\right)dz=\int_{\frac{1}{2}}^{1}A(r)\,dr`,
            },
            { k: "p", t: String.raw`である（$r=1-z$、$dr=-dz$ で向きが入れ替わる）。ここで $\cos\theta=\dfrac{1}{2r}$、つまり` },
            {
              k: "math",
              t: String.raw`r=\frac{1}{2\cos\theta},\qquad dr=\frac{\sin\theta}{2\cos^{2}\theta}\,d\theta`,
            },
            {
              k: "p",
              t: String.raw`と置換する。$r=\tfrac12$ のとき $\cos\theta=1$ で $\theta=0$、$r=1$ のとき $\cos\theta=\tfrac12$ で $\theta=\tfrac\pi3$ である。また`,
            },
            {
              k: "math",
              t: String.raw`r^{2}=\frac{1}{4\cos^{2}\theta},\qquad\sqrt{r^{2}-\frac{1}{4}}=\frac{1}{2}\sqrt{\frac{1-\cos^{2}\theta}{\cos^{2}\theta}}=\frac{\tan\theta}{2}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`A(r)=\frac{\theta}{4\cos^{2}\theta}-\frac{\tan\theta}{4}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`V=\int_{0}^{\frac{\pi}{3}}\left(\frac{\theta}{4\cos^{2}\theta}-\frac{\tan\theta}{4}\right)\frac{\sin\theta}{2\cos^{2}\theta}\,d\theta=\frac{1}{8}\int_{0}^{\frac{\pi}{3}}\frac{\theta\sin\theta}{\cos^{4}\theta}\,d\theta-\frac{1}{8}\int_{0}^{\frac{\pi}{3}}\frac{\sin^{2}\theta}{\cos^{3}\theta}\,d\theta`,
            },
            { k: "p", t: String.raw`である。2つに分けて計算する。` },
            {
              k: "p",
              t: String.raw`**第1項。** $\dfrac{d}{d\theta}\left(\dfrac{1}{3\cos^{3}\theta}\right)=\dfrac{\sin\theta}{\cos^{4}\theta}$ なので、部分積分で`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{3}}\frac{\theta\sin\theta}{\cos^{4}\theta}\,d\theta=\left[\frac{\theta}{3\cos^{3}\theta}\right]_{0}^{\frac{\pi}{3}}-\frac{1}{3}\int_{0}^{\frac{\pi}{3}}\frac{d\theta}{\cos^{3}\theta}=\frac{8\pi}{9}-\frac{I_{3}}{3}`,
            },
            { k: "p", t: String.raw`である（$\cos^{3}\tfrac\pi3=\tfrac18$ なので $\dfrac{\pi/3}{3\cdot\frac18}=\dfrac{8\pi}{9}$）。` },
            { k: "p", t: String.raw`**第2項。** $\sin^{2}\theta=1-\cos^{2}\theta$ より` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{3}}\frac{\sin^{2}\theta}{\cos^{3}\theta}\,d\theta=\int_{0}^{\frac{\pi}{3}}\left(\frac{1}{\cos^{3}\theta}-\frac{1}{\cos\theta}\right)d\theta=I_{3}-I_{1}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`V=\frac{1}{8}\left(\frac{8\pi}{9}-\frac{I_{3}}{3}\right)-\frac{1}{8}\left(I_{3}-I_{1}\right)=\frac{\pi}{9}-\frac{I_{3}}{6}+\frac{I_{1}}{8}`,
            },
            { k: "p", t: String.raw`である（$-\tfrac{1}{24}I_{3}-\tfrac18 I_{3}=-\tfrac16 I_{3}$）。(2) より $I_{3}=\sqrt{3}+\tfrac12I_{1}$ だから` },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{9}-\frac{1}{6}\left(\sqrt{3}+\frac{I_{1}}{2}\right)+\frac{I_{1}}{8}=\frac{\pi}{9}-\frac{\sqrt{3}}{6}+\left(\frac{1}{8}-\frac{1}{12}\right)I_{1}`,
            },
            { k: "p", t: String.raw`で、$\tfrac18-\tfrac1{12}=\tfrac1{24}$ と $I_{1}=\log\left(2+\sqrt3\right)$ から` },
            {
              k: "math",
              t: String.raw`V=\frac{\pi}{9}-\frac{\sqrt{3}}{6}+\frac{1}{24}\log\left(2+\sqrt{3}\right)`,
            },
            { k: "p", t: String.raw`である。数値は $0.11526\cdots$ で、円錐全体の体積 $\tfrac\pi3=1.0472$ の約 $11\%$ である。` },
          ],
          pitfalls: [
            String.raw`切り口が空になるのは $r\leqq\tfrac12$、つまり $z\geqq\tfrac12$ のとき。積分範囲を $0\leqq z\leqq1$ にしない。`,
            String.raw`弓形の面積は「扇形 $-$ 三角形」。三角形の高さは $\tfrac12$（原点から弦までの距離）で、$r$ ではない。`,
            String.raw`$\cos\theta=\dfrac{1}{2r}$ という置換が (1)(2) への橋渡しになっている。$\theta$ の範囲が $\left[0,\tfrac\pi3\right]$ とぴったり一致するのが設計である。`,
          ],
          check: String.raw`弓形の面積を $z$ について数値積分すると $0.1152639615$、式の値も $0.1152639615$ だった。200万点のモンテカルロでも $0.115162$ になった。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["正射影", "内積", "鈍角の判定", "余弦定理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{AB}'=4,\\ \\mathrm{AC}'=\\sqrt{21},\\ \\mathrm{B}'\\mathrm{C}'=7$ から $\\cos\\angle\\mathrm{B}'\\mathrm{AC}'=-\\dfrac{3}{2\\sqrt{21}}$（$109.1^{\\circ}$）、$\\overrightarrow{\\mathrm{AB}'}\\cdot\\overrightarrow{\\mathrm{AC}'}=-6$",
          "$bc=6$ と $b^{2}-c^{2}=5$ から $(b,c)=(3,2)$ を得て座標を組み立てると、$\\mathrm{AB}=\\mathrm{AC}=5.000000000$、$\\overrightarrow{\\mathrm{AB}}\\cdot\\overrightarrow{\\mathrm{AC}}=0$ になった",
          "$\\mathrm{AB}'$ と $\\mathrm{AC}'$ を入れ替えても $(b,c)=(2,3)$ で $\\mathrm{AB}=5$ になった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`空間内の $\angle\mathrm{BAC}=\tfrac\pi2$ の直角二等辺三角形 $\mathrm{ABC}$ と平面 $P$ があり、$\mathrm{A}$ は $P$ 上、$\mathrm{B},\mathrm{C}$ は $P$ 上になく $P$ に関して同じ側にある。$\mathrm{B},\mathrm{C}$ から $P$ に下ろした垂線の足を $\mathrm{B}',\mathrm{C}'$ とするとき、$\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}=0$ を示す`,
          answer: String.raw`$\overrightarrow{\mathrm{AB}}=\overrightarrow{\mathrm{AB}'}+\overrightarrow{\mathrm{B}'\mathrm{B}}$ などと分解すると、直交する項が消えて $\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}=0$ そのものになる`,
          approach: String.raw`$\overrightarrow{\mathrm{AB}}$ を「$P$ に平行な成分」と「$P$ に垂直な成分」に分ける。前者が $\overrightarrow{\mathrm{AB}'}$、後者が $\overrightarrow{\mathrm{B}'\mathrm{B}}$ で、異なる種類どうしの内積は $0$ になる。示すべき式はちょうど $\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}$ の展開である。`,
          blocks: [
            { k: "p", t: String.raw`$P$ の単位法線ベクトルを $\vec{n}$ とする。$\mathrm{B}'$ は $\mathrm{B}$ から $P$ に下ろした垂線の足なので $\overrightarrow{\mathrm{B}'\mathrm{B}}$ は $\vec{n}$ に平行、$\overrightarrow{\mathrm{AB}'}$ は $P$ 上のベクトルなので $\vec{n}$ に垂直である。$\mathrm{C}$ についても同じである。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}=0,\qquad\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{AC}'}=0`,
            },
            { k: "p", t: String.raw`である。一方` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}=\overrightarrow{\mathrm{AB}'}+\overrightarrow{\mathrm{B}'\mathrm{B}},\qquad\overrightarrow{\mathrm{AC}}=\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{C}'\mathrm{C}}`,
            },
            { k: "p", t: String.raw`なので、内積を展開すると` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}=\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}+\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}`,
            },
            { k: "p", t: String.raw`で、まん中の2項が $0$ だから` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}=\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}`,
            },
            { k: "p", t: String.raw`である。$\angle\mathrm{BAC}=\tfrac\pi2$ より左辺は $0$ なので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}+\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}=0`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{AB}'}$ は「$P$ 上のベクトル」、$\overrightarrow{\mathrm{B}'\mathrm{B}}$ は「$P$ に垂直なベクトル」。この2種類が直交することを明記する。`,
            String.raw`$\mathrm{A}$ が $P$ 上にあるので $\overrightarrow{\mathrm{AB}'}$ が $P$ 上のベクトルになる。$\mathrm{A}$ の位置の条件が効いている。`,
          ],
          check: String.raw`座標を組んで数値で確かめると、左辺は $0.00\mathrm{e}{+}00$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\angle\mathrm{B}'\mathrm{AC}'>\tfrac\pi2$ を示す`,
          answer: String.raw`(1) より $\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}=-\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}<0$`,
          approach: String.raw`$\mathrm{B},\mathrm{C}$ は $P$ の同じ側にあるので $\overrightarrow{\mathrm{B}'\mathrm{B}}$ と $\overrightarrow{\mathrm{C}'\mathrm{C}}$ は同じ向きで、その内積は正である。(1) の等式からもう一方の内積が負と分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$P$ の単位法線 $\vec{n}$ を、$\mathrm{B}$ のある側を向くようにとる。$\mathrm{B},\mathrm{C}$ は $P$ 上になく同じ側にあるので、正の数 $b,c$ があって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{B}'\mathrm{B}}=b\vec{n},\qquad\overrightarrow{\mathrm{C}'\mathrm{C}}=c\vec{n}\qquad\left(b>0,\ c>0\right)`,
            },
            { k: "p", t: String.raw`と書ける。$\left|\vec{n}\right|=1$ だから` },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{B}'\mathrm{B}}\cdot\overrightarrow{\mathrm{C}'\mathrm{C}}=bc>0` },
            { k: "p", t: String.raw`である。(1) より` },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}=-bc<0\qquad\cdots\text{①}` },
            {
              k: "p",
              t: String.raw`である。とくに左辺は $0$ でないので $\overrightarrow{\mathrm{AB}'}\neq\vec{0}$、$\overrightarrow{\mathrm{AC}'}\neq\vec{0}$ であり、$\angle\mathrm{B}'\mathrm{AC}'$ が定まる。そして`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{B}'\mathrm{AC}'=\frac{\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}}{\left|\overrightarrow{\mathrm{AB}'}\right|\left|\overrightarrow{\mathrm{AC}'}\right|}<0`,
            },
            { k: "p", t: String.raw`である。$0\leqq\angle\mathrm{B}'\mathrm{AC}'\leqq\pi$ で $\cos$ が負なのは $\tfrac\pi2<\angle\mathrm{B}'\mathrm{AC}'\leqq\pi$ のときだから` },
            { k: "math", t: String.raw`\angle\mathrm{B}'\mathrm{AC}'>\frac{\pi}{2}` },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`「同じ側にある」が $b,c$ の符号をそろえ、「$P$ 上にない」が $b,c\neq0$ を保証している。どちらが欠けても結論は崩れる。`,
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{AB}'}=\vec{0}$ だと角が定まらない。① の左辺が $0$ でないことから、$\mathrm{B}'\neq\mathrm{A}$、$\mathrm{C}'\neq\mathrm{A}$ が言える。`,
          ],
          check: String.raw`(3) の設定で実際に角を計算すると $109.1^{\circ}>90^{\circ}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$P$ 上の三角形 $\mathrm{AB}'\mathrm{C}'$ の辺の長さが短いものから $4,\ \sqrt{21},\ 7$ であるとき、辺 $\mathrm{AB}$ の長さを求める`,
          answer: String.raw`$\mathrm{AB}=5$`,
          approach: String.raw`(2) より $\mathrm{A}$ のところが鈍角なので、$\mathrm{A}$ の対辺 $\mathrm{B}'\mathrm{C}'$ がいちばん長い $7$ に決まる。これで3辺の割り当てが確定し、余弦定理から ① の $bc$ が出る。あとは $\mathrm{AB}=\mathrm{AC}$ を使って $b,c$ を決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**辺の割り当て。** 三角形では最大角の対辺が最大辺である。(2) より $\angle\mathrm{B}'\mathrm{AC}'$ は鈍角で、三角形の鈍角は1つしかないから $\angle\mathrm{B}'\mathrm{AC}'$ が最大角である。よってその対辺 $\mathrm{B}'\mathrm{C}'$ が最大辺で`,
            },
            { k: "math", t: String.raw`\mathrm{B}'\mathrm{C}'=7,\qquad\left\{\mathrm{AB}',\ \mathrm{AC}'\right\}=\left\{4,\ \sqrt{21}\right\}` },
            {
              k: "p",
              t: String.raw`である。以下 $\mathrm{AB}'=4$、$\mathrm{AC}'=\sqrt{21}$ とする（入れ替えても $\mathrm{AB}$ は同じ値になることを最後に確かめる）。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "平面 P 上の三角形 AB'C'。A のところが鈍角（約 109.1°）なので、その対辺 B'C' が最大辺 7 になる。",
                view: [-2.7, 5.4, -1.25, 5.4],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: [4, 0] },
                  { k: "seg", a: [0, 0], b: CP19 },
                  { k: "seg", a: [4, 0], b: CP19 },
                  { k: "dot", at: [0, 0], label: "A", place: "below-left" },
                  { k: "dot", at: [4, 0], label: "B′", place: "below-right" },
                  { k: "dot", at: CP19, label: "C′", place: "above-left" },
                  { k: "text", at: [2, 0], label: "4", place: "below" },
                  { k: "text", at: [CP19[0] / 2, CP19[1] / 2], label: "√21", place: "left" },
                  { k: "text", at: [(4 + CP19[0]) / 2, CP19[1] / 2], label: "7", place: "right" },
                ],
              },
            },
            { k: "p", t: String.raw`**内積を求める。** 余弦定理から` },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{B}'\mathrm{AC}'=\frac{4^{2}+\left(\sqrt{21}\right)^{2}-7^{2}}{2\cdot4\cdot\sqrt{21}}=\frac{16+21-49}{8\sqrt{21}}=\frac{-12}{8\sqrt{21}}=-\frac{3}{2\sqrt{21}}`,
            },
            { k: "p", t: String.raw`である（負なので確かに鈍角）。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}'}\cdot\overrightarrow{\mathrm{AC}'}=4\cdot\sqrt{21}\cdot\left(-\frac{3}{2\sqrt{21}}\right)=-6`,
            },
            { k: "p", t: String.raw`で、(2) の ① から` },
            { k: "math", t: String.raw`bc=6\qquad\cdots\text{②}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$b,c$ を決める。** 三平方の定理から` },
            {
              k: "math",
              t: String.raw`\mathrm{AB}^{2}=\mathrm{AB}'^{2}+b^{2}=16+b^{2},\qquad\mathrm{AC}^{2}=\mathrm{AC}'^{2}+c^{2}=21+c^{2}`,
            },
            { k: "p", t: String.raw`である。$\triangle\mathrm{ABC}$ は $\angle\mathrm{BAC}=\tfrac\pi2$ の直角二等辺三角形なので $\mathrm{AB}=\mathrm{AC}$、したがって` },
            { k: "math", t: String.raw`16+b^{2}=21+c^{2},\qquad\text{すなわち}\quad b^{2}-c^{2}=5\qquad\cdots\text{③}` },
            { k: "p", t: String.raw`である。② より $c=\dfrac{6}{b}$ を ③ に入れると` },
            {
              k: "math",
              t: String.raw`b^{2}-\frac{36}{b^{2}}=5\quad\Longrightarrow\quad b^{4}-5b^{2}-36=0\quad\Longrightarrow\quad\left(b^{2}-9\right)\left(b^{2}+4\right)=0`,
            },
            { k: "p", t: String.raw`となる。$b>0$ より $b^{2}=9$、つまり $b=3$ で、② から $c=2$ である。よって` },
            { k: "math", t: String.raw`\mathrm{AB}^{2}=16+9=25,\qquad\mathrm{AB}=5` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**入れ替えた場合。** $\mathrm{AB}'=\sqrt{21}$、$\mathrm{AC}'=4$ とすると ③ は $b^{2}-c^{2}=-5$ になり、同じ計算で $b=2,\ c=3$、$\mathrm{AB}^{2}=21+4=25$ でやはり $\mathrm{AB}=5$ である。`,
            },
            { k: "math", t: String.raw`\mathrm{AB}=5` },
          ],
          pitfalls: [
            String.raw`「短いものから $4,\sqrt{21},7$」だけでは $\mathrm{A}$ がどの頂点か決まらない。(2) の鈍角が、最大辺 $7$ を $\mathrm{A}$ の対辺に固定する働きをしている。`,
            String.raw`$b^{4}-5b^{2}-36=0$ の $b^{2}=-4$ は捨てる。$b$ は長さなので正である。`,
            String.raw`$\mathrm{AB}=\mathrm{AC}$ は「直角二等辺」の等辺が $\mathrm{AB},\mathrm{AC}$ であることによる（直角が $\mathrm{A}$ にあるから）。`,
          ],
          check: String.raw`$(b,c)=(3,2)$ として座標を組むと $\mathrm{AB}=\mathrm{AC}=5.000000000$、$\overrightarrow{\mathrm{AB}}\cdot\overrightarrow{\mathrm{AC}}=0$、$\mathrm{B}'\mathrm{C}'=7.000000$ で、すべて条件に合った。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["平方根の小数部分", "不等式の整数解", "ガウス記号"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n$ を $1$ から順に調べ、$\\sqrt{n}$ の小数部分が $0.01$ 以上 $0.1$ 未満になるものを並べると $26,37,50,65,82,101,102,122,123,145,146,170,171,197,198,\\dots$ だった",
          "最小は $26$（$\\sqrt{26}=5.09901951$）、10番目は $145$（$\\sqrt{145}=12.04159458$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の整数 $n$ の正の平方根 $\sqrt{n}$ が整数でなく、$10$ 進法で表したとき小数第1位が $0$、第2位が $0$ 以外であるとき、このような $n$ の最小のものを求める`,
          answer: String.raw`$n=26$`,
          approach: String.raw`条件を小数部分の不等式 $0.01\leqq\sqrt{n}-m<0.1$（$m=\left[\sqrt{n}\right]$）に書き直す。2乗すると $n$ が入る区間が $m$ の式で書けるので、$m=1,2,3,\dots$ と順に、その区間に整数が入るかを見ればよい。`,
          blocks: [
            { k: "p", t: String.raw`$m=\left[\sqrt{n}\right]$ とおく。$\sqrt{n}$ の小数部分を $f=\sqrt{n}-m$ とすると、条件は` },
            {
              k: "steps",
              items: [
                String.raw`小数第1位が $0$：$0\leqq f<0.1$`,
                String.raw`小数第2位が $0$ 以外：$f\geqq0.01$（これは $\sqrt{n}$ が整数でないことも含む）`,
              ],
            },
            { k: "p", t: String.raw`すなわち` },
            { k: "math", t: String.raw`0.01\leqq\sqrt{n}-m<0.1\qquad\cdots\text{①}` },
            { k: "p", t: String.raw`である。① の各辺に $m$ を足して2乗すると（すべて正なので向きは変わらない）` },
            {
              k: "math",
              t: String.raw`\left(m+0.01\right)^{2}\leqq n<\left(m+0.1\right)^{2}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`m^{2}+0.02m+0.0001\leqq n<m^{2}+0.2m+0.01\qquad\cdots\text{②}`,
            },
            { k: "p", t: String.raw`である。$k=n-m^{2}$（整数）とおくと ② は` },
            { k: "math", t: String.raw`0.02m+0.0001\leqq k<0.2m+0.01\qquad\cdots\text{③}` },
            { k: "p", t: String.raw`となる。$m$ を小さいほうから調べる。` },
            {
              k: "steps",
              items: [
                String.raw`$m=1$：$0.0201\leqq k<0.21$。整数 $k$ なし`,
                String.raw`$m=2$：$0.0401\leqq k<0.41$。なし`,
                String.raw`$m=3$：$0.0601\leqq k<0.61$。なし`,
                String.raw`$m=4$：$0.0801\leqq k<0.81$。なし`,
                String.raw`$m=5$：$0.1001\leqq k<1.01$。$k=1$ があり、$n=25+1=26$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$m$ が大きくなると $n\geqq m^{2}$ も大きくなるので、$m\leqq4$ に解がない以上、最小は $m=5$ のときの`,
            },
            { k: "math", t: String.raw`n=26` },
            { k: "p", t: String.raw`である。実際 $\sqrt{26}=5.09901\cdots$ で、小数第1位は $0$、第2位は $9$ である。` },
            {
              k: "note",
              t: String.raw`③ の右端が $1$ を超えるのは $0.2m+0.01>1$、つまり $m\geqq5$ のときである。「$k=1$ が入れるようになる最小の $m$」が $5$ だと見てもよい。`,
            },
          ],
          pitfalls: [
            String.raw`「小数第2位が $0$ 以外」は $f\geqq0.01$ と同値（$f<0.1$ のもとで）。$f>0$ だけでは足りない。`,
            String.raw`$\left(m+0.01\right)^{2}$ を展開するとき $0.0001$ を落とさない。もっとも、$k$ が整数なので最後は効かない。`,
          ],
          check: String.raw`$n=1$ から順に $\sqrt{n}$ の小数部分を計算すると、条件を満たす最小の $n$ は $26$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`このような $n$ を小さいものから順に並べたときの10番目を求める`,
          answer: String.raw`$n=145$`,
          approach: String.raw`(1) の ③ をそのまま $m=5,6,7,\dots$ と続ける。$m$ ごとに該当する $k$（したがって $n$）を全部書き出し、$m$ の小さい順に並べれば順番がそのまま決まる。`,
          blocks: [
            { k: "p", t: String.raw`(1) の ③ は` },
            { k: "math", t: String.raw`0.02m+0.0001\leqq k<0.2m+0.01` },
            { k: "p", t: String.raw`である。$m$ が同じなら $n=m^{2}+k$ は $k$ について増加し、$m$ が1つ増えると $n$ は必ず大きくなるので、$m$ の小さい順に並べればよい。` },
            {
              k: "steps",
              items: [
                String.raw`$m=5$：$0.1001\leqq k<1.01$ より $k=1$。$n=26$`,
                String.raw`$m=6$：$0.1201\leqq k<1.21$ より $k=1$。$n=37$`,
                String.raw`$m=7$：$0.1401\leqq k<1.41$ より $k=1$。$n=50$`,
                String.raw`$m=8$：$0.1601\leqq k<1.61$ より $k=1$。$n=65$`,
                String.raw`$m=9$：$0.1801\leqq k<1.81$ より $k=1$。$n=82$`,
                String.raw`$m=10$：$0.2001\leqq k<2.01$ より $k=1,2$。$n=101,\ 102$`,
                String.raw`$m=11$：$0.2201\leqq k<2.21$ より $k=1,2$。$n=122,\ 123$`,
                String.raw`$m=12$：$0.2401\leqq k<2.41$ より $k=1,2$。$n=145,\ 146$`,
              ],
            },
            { k: "p", t: String.raw`小さい順に並べると` },
            {
              k: "math",
              t: String.raw`26,\ 37,\ 50,\ 65,\ 82,\ 101,\ 102,\ 122,\ 123,\ \underline{145},\ 146,\ \dots`,
            },
            { k: "p", t: String.raw`なので、10番目は` },
            { k: "math", t: String.raw`n=145` },
            { k: "p", t: String.raw`である。実際 $\sqrt{145}=12.04159\cdots$ で、小数第1位は $0$、第2位は $4$ である。` },
            {
              k: "note",
              t: String.raw`$m$ ごとの個数は ③ の区間の幅 $0.18m+0.0099$ でおおよそ決まり、$m=5\sim9$ で1個、$m=10\sim15$ で2個、…… と増えていく。9番目までが $m\leqq11$ で尽きるので、10番目は $m=12$ の小さいほうになる。`,
            },
          ],
          pitfalls: [
            String.raw`$m$ ごとに $k$ が1個とは限らない。$m=10$ から2個になるので、ここで数え落とすと順番がずれる。`,
            String.raw`$k<0.2m+0.01$ の右端は整数になりえない（$0.01$ がある）ので、$k\leqq\left[0.2m+0.01\right]$ としてよい。`,
          ],
          check: String.raw`$n$ を $1$ から順に総当たりすると、条件を満たすものは $26,37,50,65,82,101,102,122,123,145,\dots$ で、10番目は $145$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "場合の数",
      topics: ["順列のサイクル", "かく乱順列", "対数と調和級数", "積分による評価"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=3$ の $6$ 通りを全列挙すると、長さ1のサイクルをもつのは $4$ 通りで確率 $\\tfrac23$ だった",
          "$n=4$ の $24$ 通りを全列挙すると、長さ4のサイクルをもつのは $(2,3,4,1),(2,4,1,3),(3,1,4,2),(3,4,2,1),(4,1,2,3),(4,3,1,2)$ の6通りだった",
          "$1\\leqq k\\leqq n\\leqq59$ のすべてで $\\sum_{j=k}^{n}\\tfrac1j>\\log(n+1)-\\log k$ が成り立った",
          "$n=5,7,9,11$ で全列挙した $p$ が $\\sum_{j=(n+1)/2}^{n}\\tfrac1j$ と分数のまま一致し、いずれも $\\log2=0.69314718$ より大きかった（$0.78333,\\ 0.75952,\\ 0.74563,\\ 0.73654$）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$1,2,\dots,n$ の順列 $\left(a_{1},\dots,a_{n}\right)$ を等確率に選び、$a_{i}=j\to a_{j}=k\to\cdots$ とたどってできる巡回の長さをサイクルの長さとする。$n=3$ のとき、選んだ順列が長さ $1$ のサイクルを含む確率を求める`,
          answer: String.raw`$\dfrac{2}{3}$`,
          approach: String.raw`長さ $1$ のサイクルとは $a_{i}=i$（不動点）のこと。余事象は「不動点がない」、つまりかく乱順列である。$n=3$ なら数えるだけで済む。`,
          blocks: [
            { k: "p", t: String.raw`長さ $1$ のサイクルは $a_{i}=i$ となる $i$ そのものである（$a_{i}=i$ なら1歩で戻る）。` },
            { k: "p", t: String.raw`$n=3$ の順列は $3!=6$ 通りで、$a_{i}=i$ となる $i$ が1つもないのは` },
            { k: "math", t: String.raw`\left(2,3,1\right),\qquad\left(3,1,2\right)` },
            { k: "p", t: String.raw`の $2$ 通りである（どちらも長さ $3$ のサイクル1つ）。よって長さ $1$ のサイクルを含むのは $6-2=4$ 通りで、求める確率は` },
            { k: "math", t: String.raw`\frac{4}{6}=\frac{2}{3}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`残り4通りを書き出すと $\left(1,2,3\right)$（長さ1が3つ）、$\left(1,3,2\right),\left(3,2,1\right),\left(2,1,3\right)$（長さ1が1つと長さ2が1つ）である。`,
            },
          ],
          check: String.raw`$6$ 通りを全列挙して数えると $4$ 通りだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$n=4$ のとき、長さ $4$ のサイクルを含む順列をすべて挙げる`,
          answer: String.raw`$\left(2,3,4,1\right),\ \left(2,4,1,3\right),\ \left(3,1,4,2\right),\ \left(3,4,2,1\right),\ \left(4,1,2,3\right),\ \left(4,3,1,2\right)$ の6個`,
          approach: String.raw`長さ $4$ のサイクルは $1,2,3,4$ をひと回りする巡回で、$1$ から出発して残り3つを並べる順番で決まるから $3!=6$ 個。巡回の順番を書き出し、それを $a_{i}$ の形に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n=4$ で長さ $4$ のサイクルを含むのは、$1,2,3,4$ 全体が1つの巡回になっているときである。巡回は $1\to x\to y\to z\to1$ の形で、$\left(x,y,z\right)$ は $2,3,4$ の並べ方だから $3!=6$ 通りある。`,
            },
            { k: "p", t: String.raw`それぞれを $\left(a_{1},a_{2},a_{3},a_{4}\right)$ に直す。たとえば $1\to2\to3\to4\to1$ なら $a_{1}=2,\ a_{2}=3,\ a_{3}=4,\ a_{4}=1$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$1\to2\to3\to4\to1$：$\left(2,3,4,1\right)$`,
                String.raw`$1\to2\to4\to3\to1$：$\left(2,4,1,3\right)$`,
                String.raw`$1\to3\to2\to4\to1$：$\left(3,4,2,1\right)$`,
                String.raw`$1\to3\to4\to2\to1$：$\left(3,1,4,2\right)$`,
                String.raw`$1\to4\to2\to3\to1$：$\left(4,3,1,2\right)$`,
                String.raw`$1\to4\to3\to2\to1$：$\left(4,1,2,3\right)$`,
              ],
            },
            { k: "p", t: String.raw`番号順に並べ直すと` },
            {
              k: "math",
              t: String.raw`\left(2,3,4,1\right),\ \left(2,4,1,3\right),\ \left(3,1,4,2\right),\ \left(3,4,2,1\right),\ \left(4,1,2,3\right),\ \left(4,3,1,2\right)`,
            },
            { k: "p", t: String.raw`の6個である。` },
          ],
          pitfalls: [
            String.raw`巡回の書き方 $1\to3\to2\to4\to1$ と、順列の書き方 $\left(3,4,2,1\right)$ を混同しない。前者は「次にどこへ行くか」の並び、後者は添字順に値を並べたものである。`,
            String.raw`$\left(2,1,4,3\right)$ のような「長さ2が2つ」は長さ4のサイクルではない。`,
          ],
          check: String.raw`$24$ 通りを全列挙してサイクル分解すると、長さ $4$ のサイクル1つになるのはこの6通りだけだった。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ 以下の正の整数 $k$ に対して $\displaystyle\sum_{j=k}^{n}\frac{1}{j}>\log\left(n+1\right)-\log k$ を示す`,
          answer: String.raw`$\dfrac1j>\displaystyle\int_{j}^{j+1}\frac{dx}{x}$ を $j=k$ から $n$ まで足す`,
          approach: String.raw`$\dfrac1x$ は減少関数なので、区間 $\left[j,\,j+1\right]$ では $\dfrac1x\leqq\dfrac1j$ で、等号は左端だけ。幅 $1$ の区間で積分すると $\dfrac1j$ のほうが真に大きい。これを足し合わせると右辺の $\log$ が望遠鏡のように縮む。`,
          blocks: [
            { k: "p", t: String.raw`$j$ を正の整数とする。$j\leqq x\leqq j+1$ では $\dfrac1x\leqq\dfrac1j$ で、$x>j$ では真に $\dfrac1x<\dfrac1j$ である。よって` },
            {
              k: "math",
              t: String.raw`\int_{j}^{j+1}\frac{dx}{x}<\int_{j}^{j+1}\frac{dx}{j}=\frac{1}{j}`,
            },
            { k: "p", t: String.raw`である。左辺は` },
            {
              k: "math",
              t: String.raw`\int_{j}^{j+1}\frac{dx}{x}=\log\left(j+1\right)-\log j`,
            },
            { k: "p", t: String.raw`だから` },
            { k: "math", t: String.raw`\frac{1}{j}>\log\left(j+1\right)-\log j` },
            { k: "p", t: String.raw`である。これを $j=k,k+1,\dots,n$ について足すと、右辺は隣どうしで打ち消し合って` },
            {
              k: "math",
              t: String.raw`\sum_{j=k}^{n}\left\{\log\left(j+1\right)-\log j\right\}=\log\left(n+1\right)-\log k`,
            },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`\sum_{j=k}^{n}\frac{1}{j}>\log\left(n+1\right)-\log k`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
          ],
          pitfalls: [
            String.raw`不等号が**真に**成り立つことを言うには、$\dfrac1x<\dfrac1j$ となる $x$ が区間の中に正の長さぶんあることに触れる。`,
            String.raw`$\log\left(n+1\right)$ と $\log n$ を取り違えない。区間の右端まで積分するので $n+1$ である。`,
          ],
          check: String.raw`$1\leqq k\leqq n\leqq59$ のすべての組で数値的に確かめ、反例は $0$ 件だった。`,
        },
        {
          label: "(4)",
          task: String.raw`$n$ を奇数とするとき、選んだ順列が長さ $\tfrac{n+1}{2}$ 以上のサイクルを含む確率 $p$ が $p>\log2$ を満たすことを示す`,
          answer: String.raw`長さがちょうど $L\ \left(L>\tfrac n2\right)$ のサイクルをもつ確率が $\dfrac1L$ なので $p=\displaystyle\sum_{L=\frac{n+1}{2}}^{n}\frac1L>\log\left(n+1\right)-\log\frac{n+1}{2}=\log2$`,
          approach: String.raw`$L>\tfrac n2$ の長さのサイクルは、あったとしても1つしかない。だから「長さ $L$ のサイクルをもつ順列」の個数を数えて足せばよく、重複を心配しなくてよい。個数を数えると $\dfrac{n!}{L}$ というきれいな形になり、確率は $\dfrac1L$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**長さが半分を超えるサイクルは高々1つ。** 長さ $L_{1},L_{2}$ の異なる2つのサイクルがあれば、それらは共通の数字をもたないので $L_{1}+L_{2}\leqq n$ である。$L>\tfrac n2$ のサイクルが2つあると $L_{1}+L_{2}>n$ となって矛盾する。よって長さ $\tfrac n2$ より大きいサイクルは、あっても1つである。`,
            },
            {
              k: "p",
              t: String.raw`$n$ は奇数なので $\tfrac{n+1}{2}>\tfrac n2$ である。したがって「長さ $\tfrac{n+1}{2}$ 以上のサイクルを含む」という事象は、$L=\tfrac{n+1}{2},\ \tfrac{n+1}{2}+1,\ \dots,\ n$ について「長さがちょうど $L$ のサイクルをもつ」という事象の**排反**な和になる。`,
            },
            { k: "p", t: String.raw`**長さちょうど $L$ のサイクルをもつ順列の個数。** $\tfrac n2<L\leqq n$ とする。` },
            {
              k: "steps",
              items: [
                String.raw`サイクルに入る $L$ 個の数字を選ぶ：$ {}_n\mathrm{C}_L$ 通り`,
                String.raw`その $L$ 個を1つの巡回に並べる：$\left(L-1\right)!$ 通り（円順列）`,
                String.raw`残り $n-L$ 個の並べ方：$\left(n-L\right)!$ 通り（$n-L<\tfrac n2<L$ なので、ここから長さ $L$ 以上のサイクルは出てこない）`,
              ],
            },
            { k: "p", t: String.raw`よって個数は` },
            {
              k: "math",
              t: String.raw`{}_n\mathrm{C}_L\cdot\left(L-1\right)!\cdot\left(n-L\right)!=\frac{n!}{L!\left(n-L\right)!}\cdot\left(L-1\right)!\cdot\left(n-L\right)!=\frac{n!}{L}`,
            },
            { k: "p", t: String.raw`である。全体が $n!$ 通りなので、長さちょうど $L$ のサイクルをもつ確率は $\dfrac1L$ である。` },
            { k: "p", t: String.raw`**$p$ を書く。** 排反な和だから` },
            {
              k: "math",
              t: String.raw`p=\sum_{L=\frac{n+1}{2}}^{n}\frac{1}{L}`,
            },
            { k: "p", t: String.raw`である。(3) を $k=\dfrac{n+1}{2}$（$n$ が奇数なので正の整数）として使うと` },
            {
              k: "math",
              t: String.raw`p>\log\left(n+1\right)-\log\frac{n+1}{2}=\log\frac{n+1}{\frac{n+1}{2}}=\log2`,
            },
            { k: "p", t: String.raw`である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$n=5$ なら $p=\tfrac13+\tfrac14+\tfrac15=\tfrac{47}{60}=0.7833$、$n=11$ なら $0.7365$ で、$n$ を大きくしても $\log2=0.6931$ を下回らない。実際 $n\to\infty$ で $p\to\log2$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`「長さ $\tfrac{n+1}{2}$ 以上」をいきなり足すと重複を疑いたくなるが、半分を超える長さのサイクルは高々1つなので排反である。$n$ が奇数という条件はここで効く。`,
            String.raw`$ {}_n\mathrm{C}_L\left(L-1\right)!\left(n-L\right)!=\dfrac{n!}{L}$ の約分を丁寧に書く。$L!$ と $\left(L-1\right)!$ が $L$ だけ残す。`,
            String.raw`(3) の $k$ に $\tfrac{n+1}{2}$ を入れるには、それが正の整数で $k\leqq n$ であることが要る。$n$ が奇数で $n\geqq1$ ならどちらも成り立つ。`,
          ],
          check: String.raw`$n=5,7,9,11$ で全順列を列挙して $p$ を分数で求めると、$\tfrac{47}{60},\tfrac{319}{420},\tfrac{1879}{2520},\tfrac{20417}{27720}$ となり、$\sum_{L}\tfrac1L$ と完全に一致した。いずれも $\log2=0.69314718$ より大きい。`,
        },
      ],
    },
  ],
};
