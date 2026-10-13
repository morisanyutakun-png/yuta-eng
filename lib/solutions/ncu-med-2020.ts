import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2020年度（令和2年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第4問の図。楕円 $2x^{2}+\tfrac29\left(y-\tfrac32\right)^{2}=1$。 */
const SX20 = 1 / Math.SQRT2;
const SY20 = 3 / Math.SQRT2;
const ELL20 = (t: number): [number, number] => [SX20 * Math.cos(t), 1.5 + SY20 * Math.sin(t)];
/** 回転させたときの外側の半径（上側の枝）。 */
const OUT20 = (x: number): number => 1.5 + SY20 * Math.sqrt(Math.max(0, 1 - 2 * x * x));
/** 内側の半径（下側の枝）。$\left|x\right|\leqq\tfrac12$ では負になり、そこは円板になる。 */
const IN20 = (x: number): number => 1.5 - SY20 * Math.sqrt(Math.max(0, 1 - 2 * x * x));

export const ncuMed2020: SolutionSet = {
  slug: "ncu-med",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面・極限",
      topics: ["連立漸化式を複素数にまとめる", "絶対値と偏角", "三角形の面積", "無限等比級数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式どおりに $z_{n}$ を計算すると、$n=1,\\ldots,11$ で $\\left|\\tfrac{z_{n+1}}{z_{n}}\\right|=1.414213562373$（$\\sqrt2$）",
          "$\\sin\\theta_{n}$ は $n=1,\\ldots,11$ でぴったり $3^{-n}$ になった",
          "$T_{1},T_{2},T_{3}=0.2357023,0.1571348,0.1047566$ で $\\tfrac1{2\\sqrt2}\\left(\\tfrac23\\right)^{n}$ と一致し、第11項までの和 $0.6989319$ は $\\tfrac{\\sqrt2}2=0.7071068$ に近づいた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{1}=1$、$a_{n+1}=\sqrt{2-\dfrac2{9^{n}}}\,a_{n}-\dfrac{\sqrt2}{3^{n}}b_{n}$、$b_{1}=0$、$b_{n+1}=\dfrac{\sqrt2}{3^{n}}a_{n}+\sqrt{2-\dfrac2{9^{n}}}\,b_{n}$ とし、$z_{n}=a_{n}+b_{n}i$ とする。$\left|\dfrac{z_{n+1}}{z_{n}}\right|$ を求める`,
          answer: String.raw`$\left|\dfrac{z_{n+1}}{z_{n}}\right|=\sqrt2$`,
          approach: String.raw`2本の漸化式は、ある複素数を掛ける操作にまとまる。`,
          blocks: [
            { k: "p", t: String.raw`$w_{n}=\sqrt{2-\dfrac2{9^{n}}}+\dfrac{\sqrt2}{3^{n}}i$ とおくと` },
            {
              k: "math",
              t: String.raw`w_{n}z_{n}=\left(\sqrt{2-\frac2{9^{n}}}\,a_{n}-\frac{\sqrt2}{3^{n}}b_{n}\right)+\left(\frac{\sqrt2}{3^{n}}a_{n}+\sqrt{2-\frac2{9^{n}}}\,b_{n}\right)i`,
            },
            { k: "p", t: String.raw`であり、右辺はちょうど $a_{n+1}+b_{n+1}i=z_{n+1}$ である。よって` },
            { k: "math", t: String.raw`z_{n+1}=w_{n}z_{n}` },
            { k: "p", t: String.raw`である。$z_{1}=1\neq0$ で $w_{n}\neq0$ なので $z_{n}\neq0$ であり` },
            {
              k: "math",
              t: String.raw`\left|\frac{z_{n+1}}{z_{n}}\right|=\left|w_{n}\right|=\sqrt{\left(2-\frac2{9^{n}}\right)+\frac2{9^{n}}}=\sqrt2`,
            },
            { k: "p", t: String.raw`である（$n$ によらない）。` },
          ],
          pitfalls: [
            String.raw`$\left(\sqrt{2-\dfrac2{9^{n}}}\right)^{2}$ と $\left(\dfrac{\sqrt2}{3^{n}}\right)^{2}=\dfrac2{9^{n}}$ がちょうど打ち消し合って $2$ になる。ここが仕掛け。`,
          ],
          check: String.raw`漸化式どおりに計算すると、$n=1,\ldots,11$ で比の絶対値はどれも $1.414213562373=\sqrt2$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\theta_{n}=\arg\dfrac{z_{n+1}}{z_{n}}$ とするとき、$\sin\theta_{n}$ を求める`,
          answer: String.raw`$\sin\theta_{n}=\dfrac1{3^{n}}$`,
          approach: String.raw`$\dfrac{z_{n+1}}{z_{n}}=w_{n}$ の虚部を絶対値で割る。`,
          blocks: [
            { k: "p", t: String.raw`(1) より $\dfrac{z_{n+1}}{z_{n}}=w_{n}$、$\left|w_{n}\right|=\sqrt2$ である。極形式で書くと` },
            {
              k: "math",
              t: String.raw`w_{n}=\sqrt2\left(\cos\theta_{n}+i\sin\theta_{n}\right)`,
            },
            { k: "p", t: String.raw`なので、虚部を比べて` },
            {
              k: "math",
              t: String.raw`\sqrt2\sin\theta_{n}=\frac{\sqrt2}{3^{n}},\qquad\sin\theta_{n}=\frac1{3^{n}}`,
            },
            {
              k: "p",
              t: String.raw`である。実部からは $\cos\theta_{n}=\sqrt{1-\dfrac1{9^{n}}}>0$ なので、$0<\theta_{n}<\dfrac\pi2$ である。`,
            },
          ],
          check: String.raw`$n=1,\ldots,11$ で $\sin\theta_{n}$ を数値計算すると、どれも $3^{-n}$ と小数12桁まで一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`複素数平面上で $0,z_{n},z_{n+1}$ を頂点とする三角形の面積を $T_{n}$ とするとき、$\displaystyle\sum_{n=1}^{\infty}T_{n}$ を求める`,
          answer: String.raw`$\dfrac{\sqrt2}{2}$`,
          approach: String.raw`$T_{n}=\dfrac12\left|z_{n}\right|\left|z_{n+1}\right|\sin\theta_{n}$。$\left|z_{n}\right|$ は (1) から等比数列。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left|z_{1}\right|=1$ で、(1) より $\left|z_{n+1}\right|=\sqrt2\left|z_{n}\right|$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left|z_{n}\right|=\left(\sqrt2\right)^{n-1}=2^{\frac{n-1}{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。原点から見た $z_{n}$ と $z_{n+1}$ のなす角は $\theta_{n}$（$0<\theta_{n}<\dfrac\pi2$）だから`,
            },
            {
              k: "math",
              t: String.raw`T_{n}=\frac12\left|z_{n}\right|\left|z_{n+1}\right|\sin\theta_{n}=\frac12\cdot2^{\frac{n-1}{2}}\cdot2^{\frac n2}\cdot\frac1{3^{n}}`,
            },
            { k: "p", t: String.raw`である。$2^{\frac{n-1}{2}}\cdot2^{\frac n2}=2^{n-\frac12}=\dfrac{2^{n}}{\sqrt2}$ なので` },
            {
              k: "math",
              t: String.raw`T_{n}=\frac{2^{n}}{2\sqrt2\cdot3^{n}}=\frac1{2\sqrt2}\left(\frac23\right)^{n}`,
            },
            { k: "p", t: String.raw`である。これは公比 $\dfrac23$（$\left|\dfrac23\right|<1$）の無限等比級数だから` },
            {
              k: "math",
              t: String.raw`\sum_{n=1}^{\infty}T_{n}=\frac1{2\sqrt2}\cdot\frac{\frac23}{1-\frac23}=\frac1{2\sqrt2}\cdot2=\frac1{\sqrt2}=\frac{\sqrt2}{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\left|z_{n}\right|\left|z_{n+1}\right|$ は $2^{n-\frac12}$ であって $2^{n}$ ではない。半端な $\dfrac1{\sqrt2}$ が最後の答えに残る。`,
          ],
          check: String.raw`$T_{1},T_{2},T_{3}$ を数値で出すと $0.2357023,0.1571348,0.1047566$ で式と一致し、第11項までの和 $0.6989319$ は $\dfrac{\sqrt2}2=0.7071068$ に近づいた。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率・極限",
      topics: ["3で割った余りで状態を分ける", "余りが0以外をまとめる", "1次の漸化式", "極限"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式 $P_{n+1}=\\tfrac58P_{n}+\\tfrac18$ を数値で回すと $P_{1},P_{2},P_{3}=0.75,0.59375,0.49609375$",
          "$\\tfrac13+\\tfrac23\\left(\\tfrac58\\right)^{n}$ は同じ値を与え、$n=10$ で $0.339396631$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`3枚の硬貨を同時に投げ、3枚とも表なら1点加点、3枚とも裏なら1点減点、それ以外は変更しない。$0$ 点から始めて $n$ 回繰り返したあとの得点が $3$ の倍数である確率 $P_{n}$ を求める`,
          answer: String.raw`$P_{n}=\dfrac13+\dfrac23\left(\dfrac58\right)^{n}$`,
          approach: String.raw`得点そのものではなく「$3$ で割った余り」を追う。余りが $0$ かどうかだけで閉じた漸化式ができる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1回の試行で、3枚とも表になる確率は $\dfrac18$、3枚とも裏になる確率は $\dfrac18$、それ以外は $\dfrac68=\dfrac34$ である。`,
            },
            {
              k: "p",
              t: String.raw`得点を $3$ で割った余りで分ける。$n$ 回後に余りが $0,1,2$ である確率を $p_{n},q_{n},r_{n}$ とすると $p_{n}+q_{n}+r_{n}=1$ である。$n+1$ 回後に余りが $0$ になるのは`,
            },
            {
              k: "steps",
              items: [
                String.raw`余り $0$ から点が動かない … $\dfrac34p_{n}$`,
                String.raw`余り $2$ から $1$ 点加点 … $\dfrac18r_{n}$`,
                String.raw`余り $1$ から $1$ 点減点 … $\dfrac18q_{n}$`,
              ],
            },
            { k: "p", t: String.raw`の場合なので` },
            {
              k: "math",
              t: String.raw`p_{n+1}=\frac34p_{n}+\frac18\left(q_{n}+r_{n}\right)=\frac34p_{n}+\frac18\left(1-p_{n}\right)=\frac58p_{n}+\frac18`,
            },
            {
              k: "p",
              t: String.raw`である（$q_{n},r_{n}$ は個別に要らず、和だけで足りる）。$P_{n}=p_{n}$ で $P_{0}=1$ である。`,
            },
            { k: "p", t: String.raw`$\alpha=\dfrac58\alpha+\dfrac18$ の解は $\alpha=\dfrac13$ なので` },
            {
              k: "math",
              t: String.raw`P_{n}-\frac13=\frac58\left(P_{n-1}-\frac13\right)`,
            },
            { k: "p", t: String.raw`である。$P_{0}-\dfrac13=\dfrac23$ だから` },
            { k: "math", t: String.raw`P_{n}=\frac13+\frac23\left(\frac58\right)^{n}` },
            {
              k: "p",
              t: String.raw`である（$n=1$ で $\dfrac13+\dfrac5{12}=\dfrac34$。1回では得点が $-1,0,1$ のいずれかで、$3$ の倍数は $0$ だけ、その確率は $\dfrac34$ なので合う）。`,
            },
          ],
          pitfalls: [
            String.raw`余り $1$ と余り $2$ を分けて3本の漸化式にしなくても、和 $q_{n}+r_{n}=1-p_{n}$ でまとめれば1本で済む。`,
            String.raw`得点は負にもなるが、$3$ で割った余りで考えれば $0,1,2$ の3状態で閉じる。`,
          ],
          check: String.raw`漸化式を数値で回すと $P_{1},P_{2},P_{3}=0.75,0.59375,0.49609375$ で、式と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}P_{n}$ を求める`,
          answer: String.raw`$\dfrac13$`,
          approach: String.raw`$\left(\dfrac58\right)^{n}\to0$。`,
          blocks: [
            { k: "p", t: String.raw`$0<\dfrac58<1$ なので $\left(\dfrac58\right)^{n}\to0$ である。よって` },
            { k: "math", t: String.raw`\lim_{n\to\infty}P_{n}=\frac13` },
            {
              k: "p",
              t: String.raw`である。長く続けると、余りが $0,1,2$ になる確率がどれも $\dfrac13$ に近づく、ということである。`,
            },
          ],
          check: String.raw`$n=10$ で $P_{10}=0.339396631$、$n=30$ ではさらに $\dfrac13$ に近づいた。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["直交する3辺", "垂線の足", "体積から面積を出す", "3次元の三平方の定理"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\alpha,\\beta,\\gamma=2,3,5$ で $\\overrightarrow{\\mathrm{OH}}$ を計算すると $\\left(1.2465374,0.8310249,0.4986150\\right)$ で、$\\tfrac x\\alpha+\\tfrac y\\beta+\\tfrac z\\gamma=1$ を満たし、$\\overrightarrow{\\mathrm{AB}},\\overrightarrow{\\mathrm{AC}}$ との内積は $0$",
          "外積から出した $\\triangle\\mathrm{ABC}$ の面積は $9.5$ で、$\\tfrac12\\sqrt{\\alpha^{2}\\beta^{2}+\\beta^{2}\\gamma^{2}+\\gamma^{2}\\alpha^{2}}=9.5$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`四面体 $\mathrm{OABC}$ で $\angle\mathrm{AOB}=\angle\mathrm{BOC}=\angle\mathrm{COA}=\dfrac\pi2$、$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$、$\left|\vec a\right|=\alpha$、$\left|\vec b\right|=\beta$、$\left|\vec c\right|=\gamma$ とする。$\mathrm{O}$ から平面 $\mathrm{ABC}$ に下ろした垂線を $\mathrm{OH}$ とするとき、$\overrightarrow{\mathrm{OH}}$ を表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac{\beta^{2}\gamma^{2}\vec a+\gamma^{2}\alpha^{2}\vec b+\alpha^{2}\beta^{2}\vec c}{\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}+\alpha^{2}\beta^{2}}$`,
          approach: String.raw`$\vec a,\vec b,\vec c$ は互いに直交するので、内積の計算が座標と同じようにできる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3つの角が直角なので $\vec a\cdot\vec b=\vec b\cdot\vec c=\vec c\cdot\vec a=0$ である。$\mathrm{H}$ は平面 $\mathrm{ABC}$ 上なので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=s\vec a+t\vec b+u\vec c,\qquad s+t+u=1`,
            },
            {
              k: "p",
              t: String.raw`と書ける。$\overrightarrow{\mathrm{OH}}\perp\overrightarrow{\mathrm{AB}}=\vec b-\vec a$ より`,
            },
            {
              k: "math",
              t: String.raw`\left(s\vec a+t\vec b+u\vec c\right)\cdot\left(\vec b-\vec a\right)=t\beta^{2}-s\alpha^{2}=0`,
            },
            { k: "p", t: String.raw`で、同様に $\overrightarrow{\mathrm{OH}}\perp\overrightarrow{\mathrm{AC}}$ より $u\gamma^{2}-s\alpha^{2}=0$ である。よって` },
            {
              k: "math",
              t: String.raw`s\alpha^{2}=t\beta^{2}=u\gamma^{2}=k`,
            },
            { k: "p", t: String.raw`とおける。$s=\dfrac k{\alpha^{2}}$、$t=\dfrac k{\beta^{2}}$、$u=\dfrac k{\gamma^{2}}$ を $s+t+u=1$ に入れると` },
            {
              k: "math",
              t: String.raw`k\left(\frac1{\alpha^{2}}+\frac1{\beta^{2}}+\frac1{\gamma^{2}}\right)=1,\qquad k=\frac{\alpha^{2}\beta^{2}\gamma^{2}}{\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}+\alpha^{2}\beta^{2}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\frac{\beta^{2}\gamma^{2}\vec a+\gamma^{2}\alpha^{2}\vec b+\alpha^{2}\beta^{2}\vec c}{\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}+\alpha^{2}\beta^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`ついでに $\left|\overrightarrow{\mathrm{OH}}\right|^{2}=k^{2}\left(\dfrac1{\alpha^{2}}+\dfrac1{\beta^{2}}+\dfrac1{\gamma^{2}}\right)=k$ なので $\left|\overrightarrow{\mathrm{OH}}\right|=\dfrac{\alpha\beta\gamma}{\sqrt{\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}+\alpha^{2}\beta^{2}}}$ である。(2) で使う。`,
            },
          ],
          check: String.raw`$\alpha,\beta,\gamma=2,3,5$ で計算すると、$\overrightarrow{\mathrm{OH}}$ は平面 $\mathrm{ABC}$ 上にあり、$\overrightarrow{\mathrm{AB}},\overrightarrow{\mathrm{AC}}$ との内積はどちらも $0$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\triangle\mathrm{ABC}$ の面積を $\alpha,\beta,\gamma$ で表す`,
          answer: String.raw`$\dfrac12\sqrt{\alpha^{2}\beta^{2}+\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}}$`,
          approach: String.raw`四面体の体積を2通りに表す。$\mathrm{OA},\mathrm{OB},\mathrm{OC}$ が直交するので体積はすぐ出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{OA},\mathrm{OB},\mathrm{OC}$ が互いに直交するので、$\triangle\mathrm{OAB}$ を底面と見ると高さは $\gamma$ で`,
            },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot\frac12\alpha\beta\cdot\gamma=\frac{\alpha\beta\gamma}{6}`,
            },
            { k: "p", t: String.raw`である。一方 $\triangle\mathrm{ABC}$ を底面と見ると高さは $\left|\overrightarrow{\mathrm{OH}}\right|$ なので` },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot\triangle\mathrm{ABC}\cdot\left|\overrightarrow{\mathrm{OH}}\right|`
            },
            { k: "p", t: String.raw`である。(1) の注より $\left|\overrightarrow{\mathrm{OH}}\right|=\dfrac{\alpha\beta\gamma}{\sqrt{\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}+\alpha^{2}\beta^{2}}}$ だから` },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ABC}=\frac{3V}{\left|\overrightarrow{\mathrm{OH}}\right|}=\frac{\frac{\alpha\beta\gamma}{2}}{\frac{\alpha\beta\gamma}{\sqrt{\alpha^{2}\beta^{2}+\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}}}}=\frac12\sqrt{\alpha^{2}\beta^{2}+\beta^{2}\gamma^{2}+\gamma^{2}\alpha^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\triangle\mathrm{OAB}=\dfrac{\alpha\beta}{2}$、$\triangle\mathrm{OBC}=\dfrac{\beta\gamma}{2}$、$\triangle\mathrm{OCA}=\dfrac{\gamma\alpha}{2}$ なので、この式は`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ABC}^{2}=\triangle\mathrm{OAB}^{2}+\triangle\mathrm{OBC}^{2}+\triangle\mathrm{OCA}^{2}`,
            },
            { k: "p", t: String.raw`と書ける。三平方の定理の立体版である。` },
          ],
          check: String.raw`$\alpha,\beta,\gamma=2,3,5$ で外積から面積を計算すると $9.5$ で、式の値と一致した。`,
        },
      ],
    },
    {
      no: 4,
      field: "図形と方程式・積分法",
      topics: ["内分点の軌跡", "楕円", "x 軸をまたぐ図形の回転", "回転体の体積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{A},\\mathrm{B}$ を乱数で6通りとり、$\\mathrm{P}$ が $2x^{2}+\\tfrac29\\left(y-\\tfrac32\\right)^{2}=1$ を満たすことを確かめた",
          "体積を数値積分すると $45.0908873$ で、$\\tfrac{15\\pi}4+\\tfrac{27\\pi^{2}}8=45.0908873$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{A}$ は直線 $y=\dfrac32$ 上を、点 $\mathrm{B}$ は $y$ 軸上を、線分 $\mathrm{AB}$ の長さがつねに $2\sqrt2$ となるように動く。線分 $\mathrm{AB}$ を $3:1$ に内分する点 $\mathrm{P}$ が描く曲線 $C$ の方程式を求める`,
          answer: String.raw`$2x^{2}+\dfrac29\left(y-\dfrac32\right)^{2}=1$`,
          approach: String.raw`$\mathrm{A}\left(a,\tfrac32\right)$、$\mathrm{B}\left(0,b\right)$ とおいて $\mathrm{P}$ の座標を $a,b$ で表し、$a^{2}+\left(b-\tfrac32\right)^{2}=8$ に代入する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}\left(a,\dfrac32\right)$、$\mathrm{B}\left(0,b\right)$ とおくと、$\mathrm{AB}=2\sqrt2$ より`,
            },
            {
              k: "math",
              t: String.raw`a^{2}+\left(b-\frac32\right)^{2}=8\qquad\cdots\left(\ast\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{P}$ は $\mathrm{AB}$ を $3:1$ に内分するので $\overrightarrow{\mathrm{OP}}=\dfrac14\overrightarrow{\mathrm{OA}}+\dfrac34\overrightarrow{\mathrm{OB}}$、つまり`,
            },
            {
              k: "math",
              t: String.raw`x=\frac a4,\qquad y=\frac14\cdot\frac32+\frac34b=\frac38+\frac34b`,
            },
            { k: "p", t: String.raw`である。これを $a,b$ について解くと` },
            {
              k: "math",
              t: String.raw`a=4x,\qquad b=\frac43\left(y-\frac38\right)=\frac43y-\frac12`,
            },
            { k: "p", t: String.raw`で、$b-\dfrac32=\dfrac43y-2=\dfrac43\left(y-\dfrac32\right)$ である。$\left(\ast\right)$ に入れると` },
            {
              k: "math",
              t: String.raw`16x^{2}+\frac{16}{9}\left(y-\frac32\right)^{2}=8`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`2x^{2}+\frac29\left(y-\frac32\right)^{2}=1,\qquad\text{つまり}\quad\frac{x^{2}}{\frac12}+\frac{\left(y-\frac32\right)^{2}}{\frac92}=1`,
            },
            {
              k: "p",
              t: String.raw`である。これは中心 $\left(0,\dfrac32\right)$、$x$ 方向の半径 $\dfrac1{\sqrt2}$、$y$ 方向の半径 $\dfrac3{\sqrt2}$ の楕円である。`,
            },
            {
              k: "note",
              t: String.raw`$\left(\ast\right)$ は $\left(a,b\right)$ の円なので、$\mathrm{A},\mathrm{B}$ はその円上を自由に動ける。つまり $\mathrm{P}$ はこの楕円を全部描く。`,
            },
          ],
          check: String.raw`$\mathrm{A},\mathrm{B}$ を乱数で6通りとって $\mathrm{P}$ を計算すると、どれも $2x^{2}+\dfrac29\left(y-\dfrac32\right)^{2}=1$ を満たした。`,
        },
        {
          label: "(2)",
          task: String.raw`曲線 $C$ で囲まれた図形を $x$ 軸のまわりに1回転してできる立体の体積を求める`,
          answer: String.raw`$\dfrac{15\pi}{4}+\dfrac{27\pi^{2}}{8}$`,
          approach: String.raw`$\dfrac3{\sqrt2}>\dfrac32$ なので楕円は $x$ 軸をまたぐ。またいでいる範囲では断面が円板、そうでない範囲では円環になる。`,
          blocks: [
            { k: "p", t: String.raw`$\left|x\right|\leqq\dfrac1{\sqrt2}$ のとき、楕円上の $y$ は` },
            {
              k: "math",
              t: String.raw`y=\frac32\pm d\left(x\right),\qquad d\left(x\right)=\frac3{\sqrt2}\sqrt{1-2x^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。下側の枝 $\dfrac32-d$ が $0$ 以下になるのは $d\geqq\dfrac32$、すなわち`,
            },
            {
              k: "math",
              t: String.raw`\frac3{\sqrt2}\sqrt{1-2x^{2}}\geqq\frac32\iff1-2x^{2}\geqq\frac12\iff\left|x\right|\leqq\frac12`,
            },
            { k: "p", t: String.raw`のときである。したがって` },
            {
              k: "steps",
              items: [
                String.raw`$\left|x\right|\leqq\dfrac12$ … 断面の $y$ の範囲が $0$ をまたぐので、回すと半径 $\dfrac32+d$ の**円板**。面積 $\pi\left(\dfrac32+d\right)^{2}$`,
                String.raw`$\dfrac12\leqq\left|x\right|\leqq\dfrac1{\sqrt2}$ … 断面は $0<\dfrac32-d\leqq y\leqq\dfrac32+d$ なので**円環**。面積 $\pi\left\{\left(\dfrac32+d\right)^{2}-\left(\dfrac32-d\right)^{2}\right\}=6\pi d$`,
              ],
            },
            {
              k: "p",
              t: String.raw`である。$y$ 軸対称なので $x\geqq0$ の分を2倍して`,
            },
            {
              k: "math",
              t: String.raw`V=2\pi\left\{\int_{0}^{\frac12}\left(\frac32+d\right)^{2}dx+\int_{\frac12}^{\frac1{\sqrt2}}6d\,dx\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$x=\dfrac1{\sqrt2}\sin\theta$ と置換すると $d=\dfrac3{\sqrt2}\cos\theta$、$dx=\dfrac1{\sqrt2}\cos\theta\,d\theta$ で、$x=\dfrac12$ は $\theta=\dfrac\pi4$、$x=\dfrac1{\sqrt2}$ は $\theta=\dfrac\pi2$ である。$\displaystyle\int\cos^{2}\theta\,d\theta=\dfrac\theta2+\dfrac{\sin2\theta}{4}$ を使う。`,
            },
            { k: "p", t: String.raw`$\left(\dfrac32+d\right)^{2}=\dfrac94+3d+d^{2}$ を項ごとに積分すると` },
            {
              k: "steps",
              items: [
                String.raw`$\displaystyle\int_{0}^{\frac12}\frac94dx=\frac98$`,
                String.raw`$\displaystyle\int_{0}^{\frac12}d^{2}dx=\frac92\int_{0}^{\frac12}\left(1-2x^{2}\right)dx=\frac92\left(\frac12-\frac1{12}\right)=\frac{15}8$`,
                String.raw`$\displaystyle\int_{0}^{\frac12}3d\,dx=\frac9{\sqrt2}\cdot\frac1{\sqrt2}\int_{0}^{\frac\pi4}\cos^{2}\theta\,d\theta=\frac92\left(\frac\pi8+\frac14\right)=\frac{9\pi}{16}+\frac98$`,
              ],
            },
            { k: "p", t: String.raw`なので、前半の積分は $\dfrac98+\dfrac{15}8+\dfrac{9\pi}{16}+\dfrac98=\dfrac{33}8+\dfrac{9\pi}{16}$ である。後半は` },
            {
              k: "math",
              t: String.raw`\int_{\frac12}^{\frac1{\sqrt2}}6d\,dx=\frac{18}{\sqrt2}\cdot\frac1{\sqrt2}\int_{\frac\pi4}^{\frac\pi2}\cos^{2}\theta\,d\theta=9\left(\frac\pi8-\frac14\right)=\frac{9\pi}8-\frac94`,
            },
            { k: "p", t: String.raw`である。足して` },
            {
              k: "math",
              t: String.raw`V=2\pi\left(\frac{33}8-\frac94+\frac{9\pi}{16}+\frac{9\pi}8\right)=2\pi\left(\frac{15}8+\frac{27\pi}{16}\right)=\frac{15\pi}4+\frac{27\pi^{2}}8`,
            },
            { k: "p", t: String.raw`である（$45.09\ldots$）。` },
            {
              k: "figure",
              fig: {
                caption:
                  "曲線 C は中心 (0, 3/2)、x 方向の半径 1/√2、y 方向の半径 3/√2 の楕円で、x 軸をまたぐ。|x| ≦ 1/2 では断面が x 軸をまたぐので回すと円板、それより外では円環になる。",
                view: [-2.9, 2.9, -1.1, 3.95],
                items: [
                  { k: "param", f: ELL20, from: 0, to: 2 * Math.PI },
                  { k: "curve", f: OUT20, from: -SX20, to: SX20, faint: true },
                  { k: "curve", f: IN20, from: -SX20, to: SX20, faint: true },
                  { k: "seg", a: [-0.5, -1.0], b: [-0.5, 3.8], dash: true },
                  { k: "seg", a: [0.5, -1.0], b: [0.5, 3.8], dash: true },
                  { k: "dot", at: [0.5, 0], label: "x = 1/2", place: "below-right" },
                  { k: "dot", at: [-0.5, 0], label: "x = −1/2", place: "below-left" },
                  { k: "dot", at: [0, 1.5], label: "(0, 3/2)", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`楕円が $x$ 軸をまたぐので、$\left|x\right|\leqq\dfrac12$ では「上の枝の2乗 $-$ 下の枝の2乗」ではなく「上の枝の2乗」だけになる。下の枝は $x$ 軸の反対側に回って内側に穴を作らない。`,
            String.raw`$\left(\dfrac32+d\right)^{2}-\left(\dfrac32-d\right)^{2}=6d$ と簡単になる。展開してから引くと手間が増える。`,
          ],
          check: String.raw`体積を数値積分すると $45.0908873$ で、$\dfrac{15\pi}4+\dfrac{27\pi^{2}}8=45.0908873$ と一致した。`,
        },
      ],
    },
  ],
};
