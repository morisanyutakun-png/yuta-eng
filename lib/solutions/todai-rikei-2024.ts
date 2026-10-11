import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2024年度（令和6年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第5問。$x$ での断面の、内側の半径。$x=\frac13$ で式が切り替わる。 */
const innerRadius = (x: number) =>
  x <= 1 / 3 ? Math.sqrt(5 * x * x - 4 * x + 1) : (1 - x) / Math.SQRT2;

/** 第4問。$C_t$ が点 $(3,a)$ を通る条件 $h(t)=a^2$ の左辺。 */
const h4 = (t: number) => -(3 / 8) * t ** 4 + (3 / 2) * t ** 3 + 3 * t * t - 18 * t + 23;

/** 第4問。放物線 $y=f(x)$。 */
const f4 = (x: number) => -(Math.SQRT2 / 4) * x * x + 4 * Math.SQRT2;

export const todaiRikei2024: SolutionSet = {
  slug: "todai-rikei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル・領域の図示",
      topics: ["内積となす角", "軌跡と領域", "楕円", "図示"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$xy$ 平面を $1201\\times1201$ の格子で走査し、角を $\\arccos$ で直接計算した判定と、答えの不等式 $y\\ge|x|$ かつ $x^{2}+\\frac{(y-1)^{2}}{3}\\le1$ による判定が、境界の刻み幅ぶんを除いて1点も食い違わないことを確かめた",
          "境界が交わる点 $(1,1)$ で $\\angle\\mathrm{AOP}=\\frac23\\pi$、$\\angle\\mathrm{OAP}=\\frac\\pi6$ がともにちょうど等号になることを、内積から直接確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`条件 (i)(ii)(iii) をすべてみたす点 $\mathrm{P}$ の範囲を $xy$ 平面上に図示する`,
          answer: String.raw`楕円 $x^{2}+\dfrac{(y-1)^{2}}{3}\le1$ の内部と周のうち、$y\ge|x|$ をみたす部分から原点 $\mathrm{O}$ を除いた領域（下図の網かけ。境界は含み、$\mathrm{O}$ だけを除く）`,
          approach: String.raw`角の大小はそのままでは式にならないので、$\cos$ をとって内積の形に直す。$0\le\theta\le\pi$ で $\cos\theta$ は減少するから、角の不等号は $\cos$ の不等号で向きが逆になる。$\angle\mathrm{AOP}$ は $\mathrm{O}$ が頂点なので $\overrightarrow{\mathrm{OA}}$ と $\overrightarrow{\mathrm{OP}}$、$\angle\mathrm{OAP}$ は $\mathrm{A}$ が頂点なので $\overrightarrow{\mathrm{AO}}$ と $\overrightarrow{\mathrm{AP}}$ を使う。どちらの頂点から見た角かを取り違えないことだけが要点で、あとは2乗して整理すれば2次不等式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ は $xy$ 平面上の点だから $\mathrm{P}(x,\,y,\,0)$ とおける。$r=\mathrm{OP}=\sqrt{x^{2}+y^{2}}$ と書くと、条件 (i) は $r>0$ である。`,
            },
            { k: "p", t: String.raw`**条件 (ii) を式にする。** $\overrightarrow{\mathrm{OA}}=(0,-1,1)$、$\left|\overrightarrow{\mathrm{OA}}\right|=\sqrt2$ で` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OP}}=0\cdot x+(-1)\cdot y+1\cdot 0=-y`,
            },
            {
              k: "p",
              t: String.raw`だから $\cos\angle\mathrm{AOP}=\dfrac{-y}{\sqrt2\,r}$ である。$0\le\angle\mathrm{AOP}\le\pi$ の範囲で $\cos$ は減少するので、$\angle\mathrm{AOP}\ge\dfrac23\pi$ は $\cos\angle\mathrm{AOP}\le\cos\dfrac23\pi=-\dfrac12$ と同じで、`,
            },
            { k: "math", t: String.raw`\frac{-y}{\sqrt2\,r}\le-\frac12\iff 2y\ge\sqrt2\,r` },
            {
              k: "p",
              t: String.raw`となる。右辺は $0$ 以上だから、この不等式が成り立つときは必ず $y\ge0$ であり、両辺とも $0$ 以上なので2乗してよい。`,
            },
            {
              k: "math",
              t: String.raw`4y^{2}\ge2r^{2}=2x^{2}+2y^{2}\iff 2y^{2}\ge2x^{2}\iff y^{2}\ge x^{2}`,
            },
            {
              k: "p",
              t: String.raw`$y\ge0$ とあわせて、条件 (ii) は $y\ge|x|$ と同値である。`,
            },
            { k: "p", t: String.raw`**条件 (iii) を式にする。** $\overrightarrow{\mathrm{AO}}=(0,1,-1)$、$\overrightarrow{\mathrm{AP}}=(x,\,y+1,\,-1)$ で` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AO}}\cdot\overrightarrow{\mathrm{AP}}=y+1+1=y+2,\qquad \left|\overrightarrow{\mathrm{AP}}\right|=\sqrt{x^{2}+(y+1)^{2}+1}`,
            },
            {
              k: "p",
              t: String.raw`だから、$\angle\mathrm{OAP}\le\dfrac\pi6$ は $\cos\angle\mathrm{OAP}\ge\dfrac{\sqrt3}{2}$ と同じで`,
            },
            {
              k: "math",
              t: String.raw`\frac{y+2}{\sqrt2\left|\overrightarrow{\mathrm{AP}}\right|}\ge\frac{\sqrt3}{2}\iff 2(y+2)\ge\sqrt6\left|\overrightarrow{\mathrm{AP}}\right|`,
            },
            {
              k: "p",
              t: String.raw`となる。右辺が $0$ 以上なので、この不等式のもとでは $y+2\ge0$ であり、両辺を2乗してよい。`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
4(y+2)^{2}&\ge6\left\{x^{2}+(y+1)^{2}+1\right\}\\[1mm]
4y^{2}+16y+16&\ge6x^{2}+6y^{2}+12y+12\\[1mm]
0&\ge6x^{2}+2y^{2}-4y-4\\[1mm]
3x^{2}+(y-1)^{2}&\le3
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`すなわち条件 (iii) は $x^{2}+\dfrac{(y-1)^{2}}{3}\le1$ と同値で、中心 $(0,1)$、$x$ 方向の半径 $1$、$y$ 方向の半径 $\sqrt3$ の楕円の内部と周である。`,
            },
            {
              k: "p",
              t: String.raw`**2つを重ねる。** 境界どうしの交点を求める。$y=x$ を $3x^{2}+(y-1)^{2}=3$ に代入すると`,
            },
            {
              k: "math",
              t: String.raw`3x^{2}+(x-1)^{2}=3\iff 4x^{2}-2x-2=0\iff 2x^{2}-x-1=0\iff (x-1)(2x+1)=0`,
            },
            {
              k: "p",
              t: String.raw`となり $x=1,\,-\dfrac12$ を得る。$x=-\dfrac12$ は $y=-\dfrac12<|x|$ となって条件 (ii) に反するので捨て、交点は $(1,1)$ である。$y=-x$ 側は $y$ 軸対称だから $(-1,1)$ となる。なお $(1,1)$ は楕円のいちばん右の点（$x$ が最大の点）でもある。`,
            },
            {
              k: "p",
              t: String.raw`求める範囲は、この楕円の内部と周のうち $y\ge|x|$ をみたす部分である。ただし原点 $\mathrm{O}$ は $y\ge|x|$ も楕円の内部の条件もみたすが、条件 (i) で除かれるので取り除く。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`点 $\mathrm{P}$ がとりうる範囲（網かけ）。境界の楕円 $x^{2}+\dfrac{(y-1)^{2}}{3}=1$ と2直線 $y=\pm x$ は含み、原点だけを除く。破線は楕円の残りの部分。`,
                view: [-1.7, 1.7, -0.95, 3.15],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "fill",
                    pts: [
                      [0, 0] as [number, number],
                      ...Array.from({ length: 73 }, (_, i) => {
                        const th = (Math.PI * i) / 72;
                        return [Math.cos(th), 1 + Math.sqrt(3) * Math.sin(th)] as [number, number];
                      }),
                    ],
                  },
                  {
                    k: "param",
                    f: (th: number) => [Math.cos(th), 1 + Math.sqrt(3) * Math.sin(th)] as [number, number],
                    from: 0,
                    to: Math.PI,
                  },
                  {
                    k: "param",
                    f: (th: number) => [Math.cos(th), 1 + Math.sqrt(3) * Math.sin(th)] as [number, number],
                    from: Math.PI,
                    to: 2 * Math.PI,
                    dash: true,
                    faint: true,
                  },
                  { k: "seg", a: [0, 0], b: [1, 1] },
                  { k: "seg", a: [0, 0], b: [-1, 1] },
                  { k: "dot", at: [1, 1], label: "(1, 1)", place: "right" },
                  { k: "dot", at: [-1, 1], label: "(−1, 1)", place: "left" },
                  { k: "dot", at: [0, 1 + Math.sqrt(3)], label: "(0, 1+√3)", place: "above" },
                  { k: "text", at: [0, 0], label: "O は除く", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\angle\mathrm{AOP}\ge\dfrac23\pi$ を $\cos$ に直すとき、不等号の向きが逆になる。$0\le\theta\le\pi$ で $\cos\theta$ が減少することを一言添えておく。`,
            String.raw`$2y\ge\sqrt2\,r$ を2乗する前に、両辺が $0$ 以上であることを言う。ここを飛ばすと $y<0$ の偽の解を拾う。`,
            String.raw`$4y^{2}\ge2x^{2}+2y^{2}$ を整理すると $y^{2}\ge x^{2}$ であって $2y^{2}\ge x^{2}$ ではない。ここを間違えると境界が $y=\dfrac{|x|}{\sqrt2}$ になり、交点も汚い値になる。交点が $(1,1)$ という気持ちのよい値になるかどうかが、そのまま検算になる。`,
            String.raw`原点を除くことは、図のうえでも白丸や注記で示す。式だけ書いて図で示さないと、条件 (i) を使っていないのと同じ扱いになる。`,
          ],
          check: String.raw`境界の交点 $(1,1)$ で両方の等号が成り立つかを見る。$\overrightarrow{\mathrm{OP}}=(1,1,0)$、$\overrightarrow{\mathrm{OA}}=(0,-1,1)$ で内積 $-1$、長さの積は $\sqrt2\cdot\sqrt2=2$ だから $\cos\angle\mathrm{AOP}=-\dfrac12$、つまり $\angle\mathrm{AOP}=\dfrac23\pi$ ちょうど。$\overrightarrow{\mathrm{AP}}=(1,2,-1)$、$\overrightarrow{\mathrm{AO}}=(0,1,-1)$ で内積 $3$、長さの積は $\sqrt6\cdot\sqrt2=2\sqrt3$ だから $\cos\angle\mathrm{OAP}=\dfrac{\sqrt3}{2}$、つまり $\dfrac\pi6$ ちょうど。2つの境界がここで交わることと合う。`,
        },
      ],
    },
    {
      no: 2,
      field: "積分法",
      topics: ["絶対値を含む定積分", "積分で定義された関数の微分", "2倍角の公式", "最大最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)$ をシンプソン法で数値積分し、$f'(x)=2\\arctan x-\\frac\\pi4$ を数値微分と突き合わせて小数8桁まで一致することを確かめた",
          "$0\\le x\\le1$ を $2000$ 等分した全探索で最小値 $0.188226\\ldots$、最大値 $0.438825\\ldots$ を出し、$\\log\\frac{1+\\sqrt2}{2}$、$\\frac\\pi4-\\frac12\\log2$ と小数7桁以上一致することを確かめた",
          "最小を与える $x$ が $0.4142\\ldots=\\sqrt2-1$ になることを格子の全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$0<\alpha<\dfrac\pi4$ で $f'(\tan\alpha)=0$ となる $\alpha$ を求める`,
          answer: String.raw`$\alpha=\dfrac\pi8$`,
          approach: String.raw`絶対値は中身の符号で割るしかない。$0\le x\le1$ なので $t=x$ で割れば、$0\le t\le x$ では $|t-x|=x-t$、$x\le t\le1$ では $t-x$ になる。割ったあとは $x$ が積分区間の端にも被積分関数にも入るが、端では被積分関数が $0$ になるので、微分すると端からの寄与が消えてすっきりする。$\dfrac{1}{1+t^{2}}$ の原始関数は高校の範囲に名前がないが、$t=\tan\theta$ の置換で $\displaystyle\int_0^{\tan\alpha}\frac{dt}{1+t^{2}}=\alpha$ がそのまま使えるので、答えは角のままきれいに出る。`,
          blocks: [
            { k: "p", t: String.raw`$0\le x\le1$ のもとで絶対値を外すと` },
            {
              k: "math",
              t: String.raw`f(x)=\int_0^{x}\frac{x-t}{1+t^{2}}\,dt+\int_x^{1}\frac{t-x}{1+t^{2}}\,dt`,
            },
            { k: "p", t: String.raw`である。見やすくするために` },
            {
              k: "math",
              t: String.raw`F(x)=\int_0^{x}\frac{dt}{1+t^{2}},\qquad G(x)=\int_0^{x}\frac{t}{1+t^{2}}\,dt=\frac12\log\left(1+x^{2}\right)`,
            },
            { k: "p", t: String.raw`とおく。$F'(x)=\dfrac{1}{1+x^{2}}$、$G'(x)=\dfrac{x}{1+x^{2}}$ である。これらで書き直すと` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(x)&=xF(x)-G(x)+\bigl\{G(1)-G(x)\bigr\}-x\bigl\{F(1)-F(x)\bigr\}\\[1mm]
&=2xF(x)-2G(x)+G(1)-xF(1)
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。$G(1)$、$F(1)$ は定数だから、積の微分で` },
            {
              k: "math",
              t: String.raw`f'(x)=2F(x)+2x\cdot\frac{1}{1+x^{2}}-2\cdot\frac{x}{1+x^{2}}-F(1)=2F(x)-F(1)`,
            },
            {
              k: "p",
              t: String.raw`を得る。$x$ を含む項がきれいに消えるのは、分けた2つの積分の境目 $t=x$ で被積分関数 $|t-x|$ が $0$ になるからである。`,
            },
            { k: "p", t: String.raw`$F$ の値は $t=\tan\theta$ の置換で出る。$dt=\dfrac{d\theta}{\cos^{2}\theta}$、$1+t^{2}=\dfrac{1}{\cos^{2}\theta}$ だから、$0<\alpha<\dfrac\pi2$ に対して` },
            {
              k: "math",
              t: String.raw`F(\tan\alpha)=\int_0^{\alpha}\frac{1}{\frac{1}{\cos^{2}\theta}}\cdot\frac{d\theta}{\cos^{2}\theta}=\int_0^{\alpha}d\theta=\alpha`,
            },
            { k: "p", t: String.raw`である。とくに $F(1)=F\left(\tan\dfrac\pi4\right)=\dfrac\pi4$ となる。したがって` },
            { k: "math", t: String.raw`f'(\tan\alpha)=2\alpha-\frac\pi4` },
            {
              k: "p",
              t: String.raw`であり、これが $0$ になるのは $\alpha=\dfrac\pi8$ のときである。$0<\dfrac\pi8<\dfrac\pi4$ をみたすので、これが求める $\alpha$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\displaystyle\frac{d}{dx}\int_0^{x}\frac{x-t}{1+t^{2}}\,dt$ を「端 $t=x$ の寄与だけ」で済ませない。$x$ が被積分関数にも入っているので、$x$ を積分の外に出してから積の微分をする。`,
            String.raw`$\dfrac{1}{1+t^{2}}$ の原始関数を無理に書こうとしない。$F(x)$ と名前をつけて最後まで持っていき、$F(\tan\alpha)=\alpha$ という形でだけ値を使うのが速い。`,
          ],
          check: String.raw`$f'(x)=2F(x)-F(1)$ は $F$ が増加関数なので増加関数で、$f'(0)=-\dfrac\pi4<0$、$f'(1)=2\cdot\dfrac\pi4-\dfrac\pi4=\dfrac\pi4>0$ となる。$0<x<1$ のどこかにただ1つ $f'=0$ の点があることと合う。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) の $\alpha$ に対する $\tan\alpha$ の値を求める`,
          answer: String.raw`$\tan\alpha=\sqrt2-1$`,
          approach: String.raw`$\dfrac\pi8$ は $\dfrac\pi4$ の半分なので、2倍角の公式を「逆向き」に使う。$\tan\dfrac\pi4=1$ が分かっているところに $\tan2\theta$ の公式を当てると、$\tan\dfrac\pi8$ についての2次方程式が出る。符号の決定は $0<\dfrac\pi8<\dfrac\pi4$ から $0<\tan\dfrac\pi8<1$ でよい。`,
          blocks: [
            { k: "p", t: String.raw`$u=\tan\dfrac\pi8$ とおく。$0<\dfrac\pi8<\dfrac\pi4$ だから $0<u<1$ である。2倍角の公式` },
            { k: "math", t: String.raw`\tan\frac\pi4=\frac{2u}{1-u^{2}}=1` },
            { k: "p", t: String.raw`から $2u=1-u^{2}$、すなわち` },
            { k: "math", t: String.raw`u^{2}+2u-1=0,\qquad u=-1\pm\sqrt2` },
            { k: "p", t: String.raw`を得る。$0<u<1$ より $u=\sqrt2-1$ である。` },
          ],
          check: String.raw`$\sqrt2-1=0.4142\ldots$ で、たしかに $0$ と $1$ のあいだにある。さらに $\tan\dfrac\pi8$ の2倍角を計算し直すと $\dfrac{2(\sqrt2-1)}{1-(3-2\sqrt2)}=\dfrac{2\sqrt2-2}{2\sqrt2-2}=1$ となり、$\tan\dfrac\pi4=1$ に戻る。`,
        },
        {
          label: "(3)",
          task: String.raw`$0\le x\le1$ における $f(x)$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac\pi4-\dfrac12\log2$（$x=1$ のとき）、最小値 $\log\dfrac{1+\sqrt2}{2}$（$x=\sqrt2-1$ のとき）`,
          approach: String.raw`$f'(x)=2F(x)-\dfrac\pi4$ で $F$ は増加関数だから、$f'$ も増加関数で符号は1回しか変わらない。だから $f$ は「下がって上がる」形で、最小は $f'=0$ の点、最大は両端のどちらかである。両端の比較には $\log2$ の評価が要る。問題文が $0.69<\log2<0.7$ を与えているのは、ここで使わせるためである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f'(x)=2F(x)-\dfrac\pi4$ で $F$ は増加関数だから $f'$ も増加関数である。(1)(2) より $f'\left(\sqrt2-1\right)=0$ なので、$0\le x<\sqrt2-1$ で $f'<0$、$\sqrt2-1<x\le1$ で $f'>0$ となる。したがって $f$ は $x=\sqrt2-1$ で最小になり、最大は $x=0$ と $x=1$ のどちらかで起きる。`,
            },
            { k: "p", t: String.raw`**両端の値。** (1) の $f(x)=2xF(x)-2G(x)+G(1)-xF(1)$ に代入する。$F(0)=G(0)=0$、$G(1)=\dfrac12\log2$、$F(1)=\dfrac\pi4$ だから` },
            {
              k: "math",
              t: String.raw`f(0)=G(1)=\frac12\log2,\qquad f(1)=2F(1)-2G(1)+G(1)-F(1)=F(1)-G(1)=\frac\pi4-\frac12\log2`,
            },
            { k: "p", t: String.raw`である。差をとると` },
            { k: "math", t: String.raw`f(1)-f(0)=\frac\pi4-\log2` },
            {
              k: "p",
              t: String.raw`となる。$\pi>3.14$ より $\dfrac\pi4>0.785$ で、$\log2<0.7$ だから $f(1)-f(0)>0.085>0$ である。よって最大値は $f(1)=\dfrac\pi4-\dfrac12\log2$ である。`,
            },
            { k: "p", t: String.raw`**最小値。** $a=\sqrt2-1$ とおく。(1) より $F(a)=\dfrac\pi8$、また $a^{2}=3-2\sqrt2$ から` },
            { k: "math", t: String.raw`1+a^{2}=4-2\sqrt2,\qquad G(a)=\frac12\log\left(4-2\sqrt2\right)` },
            { k: "p", t: String.raw`である。これらを代入すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
f(a)&=2a\cdot\frac\pi8-2\cdot\frac12\log\left(4-2\sqrt2\right)+\frac12\log2-a\cdot\frac\pi4\\[1mm]
&=\frac{a\pi}{4}-\frac{a\pi}{4}+\frac12\log2-\log\left(4-2\sqrt2\right)\\[1mm]
&=\frac12\log2-\log\left(4-2\sqrt2\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。$\pi$ を含む項が打ち消し合うのは、$F(a)=\dfrac\pi8$ がちょうど $\dfrac12F(1)$ だからである。あとは対数をまとめる。`,
            },
            {
              k: "math",
              t: String.raw`\frac12\log2-\log\left(4-2\sqrt2\right)=\log\frac{\sqrt2}{4-2\sqrt2}=\log\frac{\sqrt2\left(4+2\sqrt2\right)}{\left(4-2\sqrt2\right)\left(4+2\sqrt2\right)}=\log\frac{4\sqrt2+4}{8}=\log\frac{1+\sqrt2}{2}`,
            },
            {
              k: "p",
              t: String.raw`よって最小値は $\log\dfrac{1+\sqrt2}{2}$ で、$x=\sqrt2-1$ のときである。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=f(x)$ のグラフ。$x=\sqrt2-1$ でいちばん低くなり、区間の右端 $x=1$ でいちばん高くなる。左端 $f(0)=\frac12\log2$ は右端より低い。`,
                view: [-0.12, 1.2, -0.04, 0.55],
                step: { x: 1 },
                items: [
                  {
                    k: "curve",
                    f: (x: number) =>
                      2 * x * Math.atan(x) - Math.log(1 + x * x) + 0.5 * Math.log(2) - (x * Math.PI) / 4,
                    from: 0,
                    to: 1,
                  },
                  { k: "dot", at: [0, 0.5 * Math.log(2)], label: "左端", place: "above-right" },
                  { k: "dot", at: [Math.SQRT2 - 1, Math.log((1 + Math.SQRT2) / 2)], label: "最小", place: "below" },
                  { k: "dot", at: [1, Math.PI / 4 - 0.5 * Math.log(2)], label: "最大", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`最小を与える $x$ が区間の内部にあるからといって、最大も内部にあるとは限らない。$f'$ が増加関数であることを言えば、$f$ の形は「下がって上がる」に限られ、最大が端点であることが確定する。`,
            String.raw`$f(1)>f(0)$ は $\dfrac\pi4>\log2$ と同じで、どちらも $0.7$ 前後なので目分量では決められない。$\pi>3.14$ と $\log2<0.7$ の2つを書いて初めて示せる。`,
          ],
          check: String.raw`数値で見ると最小値 $\log\dfrac{1+\sqrt2}{2}=0.1882\ldots$、最大値 $\dfrac\pi4-\dfrac12\log2=0.4388\ldots$、左端 $\dfrac12\log2=0.3466\ldots$ となり、$f(x)$ を数値積分した値と小数7桁まで一致する。また $f(x)$ は $\dfrac{|t-x|}{1+t^{2}}\ge0$ の積分なので必ず正で、これとも合う。`,
        },
      ],
    },
    {
      no: 3,
      field: "確率・数列",
      topics: ["対称移動", "確率漸化式", "対称性による言いかえ", "等比数列"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "8点の上の推移を分数のまま $n=16$ まで追い、各 $n$ で $(2,1)$ と $(-2,-1)$ の確率が完全に一致することを確かめた",
          "同じ計算で、偶数の $n$ について $\\frac14\\left(1+\\frac{1}{3^{n}}\\right)$ と分数として一致し、奇数の $n$ では $0$ になることを確かめた",
          "$n=2$ のとき $\\frac{5}{18}$、$n=4$ のとき $\\frac{41}{162}$ を、直接の場合分けでも確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P}$ がとりうる点の座標をすべて求める`,
          answer: String.raw`$(2,1)$、$(2,-1)$、$(-2,1)$、$(-2,-1)$、$(1,2)$、$(1,-2)$、$(-1,2)$、$(-1,-2)$ の8点`,
          approach: String.raw`4種類の操作はどれも「成分の符号を変える」か「2つの成分を入れかえる」かのどちらかである。だから $\{|x|,|y|\}$ は $\{2,1\}$ のまま変わらない。逆にその8点が全部出ることは、$(2,1)$ から順にたどれば分かる。`,
          blocks: [
            { k: "p", t: String.raw`点 $(a,b)$ に対する4つの操作は、順に` },
            {
              k: "math",
              t: String.raw`(a,b)\mapsto(a,-b),\quad(a,b)\mapsto(-a,b),\quad(a,b)\mapsto(b,a),\quad(a,b)\mapsto(-b,-a)`,
            },
            {
              k: "p",
              t: String.raw`である。どれも成分の符号を変えるか、$2$ つの成分を入れかえるだけなので、$|x|$ と $|y|$ の組は $\{2,1\}$ のまま変わらない。よって $\mathrm{P}$ は上の8点から出ない。`,
            },
            {
              k: "p",
              t: String.raw`逆に8点すべてに行けることは、$(2,1)$ から1手で $(2,-1)$、$(-2,1)$、$(1,2)$、$(-1,-2)$ に行け、さらに $(2,-1)$ から1手で $(-2,-1)$ と $(-1,2)$、$(1,2)$ から1手で $(1,-2)$ に行けることから分かる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$\mathrm{P}$ がとりうる8点。原点を中心に、$y=x$ と $y=-x$（薄い線）について対称な位置に並ぶ。`,
                view: [-3.8, 3.8, -3, 3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [-2.7, -2.7], b: [2.7, 2.7], faint: true, dash: true },
                  { k: "seg", a: [-2.7, 2.7], b: [2.7, -2.7], faint: true, dash: true },
                  { k: "dot", at: [2, 1], label: "(2, 1)", place: "right" },
                  { k: "dot", at: [2, -1], label: "(2, −1)", place: "right" },
                  { k: "dot", at: [-2, 1], label: "(−2, 1)", place: "left" },
                  { k: "dot", at: [-2, -1], label: "(−2, −1)", place: "left" },
                  { k: "dot", at: [1, 2], label: "(1, 2)", place: "above" },
                  { k: "dot", at: [-1, 2], label: "(−1, 2)", place: "above" },
                  { k: "dot", at: [1, -2], label: "(1, −2)", place: "below" },
                  { k: "dot", at: [-1, -2], label: "(−1, −2)", place: "below" },
                ],
              },
            },
          ],
          check: String.raw`どの操作も原点からの距離を変えないので、8点はすべて $\sqrt{2^{2}+1^{2}}=\sqrt5$ の距離にある。実際 $2^{2}+1^{2}=1^{2}+2^{2}=5$ で、8点はすべて同じ円周上に並ぶ。`,
        },
        {
          label: "(2)",
          task: String.raw`$n$ 秒後に $(2,1)$ にいる確率と $(-2,-1)$ にいる確率が等しいことを示す`,
          answer: String.raw`どの正の整数 $n$ についても等しい`,
          approach: String.raw`正面から2つの確率を計算する必要はない。「1手前がどこであっても、そこから $(2,1)$ へ行く確率と $(-2,-1)$ へ行く確率が同じ」ことさえ言えれば、全部足したものも等しい。4点ぶん確かめるだけで済む。そのために、まず偶数秒と奇数秒でいる場所が完全に分かれることを押さえておく。`,
          blocks: [
            { k: "p", t: String.raw`8点を次の2組に分ける。` },
            {
              k: "math",
              t: String.raw`A=\bigl\{(2,1),\,(-1,2),\,(-2,-1),\,(1,-2)\bigr\},\qquad B=\bigl\{(2,-1),\,(1,2),\,(-2,1),\,(-1,-2)\bigr\}`,
            },
            {
              k: "p",
              t: String.raw`$A$ の4点はどれも、4つの操作すべてで $B$ の点に移る。たとえば $(2,1)$ からは順に $(2,-1)$、$(-2,1)$、$(1,2)$、$(-1,-2)$ となり、すべて $B$ の点である。$(-1,2)$、$(-2,-1)$、$(1,-2)$ も同じように確かめられる。逆に $B$ の4点はどれも、4つの操作すべてで $A$ の点に移る。`,
            },
            {
              k: "p",
              t: String.raw`最初 $\mathrm{P}$ は $(2,1)\in A$ にいるから、偶数秒後には $A$ の点に、奇数秒後には $B$ の点にいる。$(2,1)$ も $(-2,-1)$ も $A$ の点なので、$n$ が奇数のときはどちらの確率も $0$ で、等しい。`,
            },
            {
              k: "p",
              t: String.raw`$n$ が偶数のときを考える。$n-1$ 秒後、$\mathrm{P}$ は $B$ の4点のどれかにいる。そこで $B$ の各点について、$(2,1)$ へ移る操作と $(-2,-1)$ へ移る操作の確率を並べる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$(2,-1)$ からは、$x$ 軸対称（確率 $\dfrac13$）で $(2,1)$ に、$y$ 軸対称（確率 $\dfrac13$）で $(-2,-1)$ に移る。どちらも $\dfrac13$。`,
                String.raw`$(-2,1)$ からは、$y$ 軸対称（$\dfrac13$）で $(2,1)$ に、$x$ 軸対称（$\dfrac13$）で $(-2,-1)$ に移る。どちらも $\dfrac13$。`,
                String.raw`$(1,2)$ からは、$y=x$ 対称（$\dfrac16$）で $(2,1)$ に、$y=-x$ 対称（$\dfrac16$）で $(-2,-1)$ に移る。どちらも $\dfrac16$。`,
                String.raw`$(-1,-2)$ からは、$y=-x$ 対称（$\dfrac16$）で $(2,1)$ に、$y=x$ 対称（$\dfrac16$）で $(-2,-1)$ に移る。どちらも $\dfrac16$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`つまり $B$ のどの点 $\mathrm{Q}$ についても、$\mathrm{Q}$ から1秒後に $(2,1)$ にいる確率と $(-2,-1)$ にいる確率は等しい。それを $w(\mathrm{Q})$ と書くと、$n-1$ 秒後に $\mathrm{Q}$ にいる確率を $q(\mathrm{Q})$ として`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{$n$ 秒後に }(2,1)\right)=\sum_{\mathrm{Q}\in B}q(\mathrm{Q})\,w(\mathrm{Q})=\left(\text{$n$ 秒後に }(-2,-1)\right)`,
            },
            { k: "p", t: String.raw`となり、2つの確率は等しい。以上でどの正の整数 $n$ についても示された。` },
          ],
          pitfalls: [
            String.raw`奇数秒のときに「どちらも $0$ だから等しい」で済ませるには、偶数秒と奇数秒でいる場所が分かれることを先に示しておく必要がある。これは (3) でも効くので、ここで書いておくと二度手間にならない。`,
            String.raw`$(2,1)$ と $(-2,-1)$ は原点対称な2点だが、「原点対称だから等しい」だけでは理由になっていない。$4$ つの操作の確率が $\dfrac13,\dfrac13,\dfrac16,\dfrac16$ と2つずつ等しいことまで使って初めて言える。`,
          ],
          check: String.raw`$n=2$ で直接確かめられる。$2$ 秒後に $(2,1)$ に戻るのは同じ操作を2回続けたときだけで、確率は $\left(\dfrac13\right)^{2}\times2+\left(\dfrac16\right)^{2}\times2=\dfrac{5}{18}$。$(-2,-1)$ に行くのは「$x$ 軸対称と $y$ 軸対称を1回ずつ」または「$y=x$ 対称と $y=-x$ 対称を1回ずつ」で、$\dfrac13\cdot\dfrac13\times2+\dfrac16\cdot\dfrac16\times2=\dfrac{5}{18}$。一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$n$ 秒後に $\mathrm{P}$ が $(2,1)$ にいる確率を求める`,
          answer: String.raw`$n$ が偶数のとき $\dfrac14\left(1+\dfrac{1}{3^{n}}\right)=\dfrac{3^{n}+1}{4\cdot3^{n}}$、$n$ が奇数のとき $0$`,
          approach: String.raw`8点を1つずつ追うと8本の漸化式になって手に負えない。ここで効くのが「どの操作も $|x|$ と $|y|$ を入れかえるか入れかえないかのどちらか」という見方である。$|x|=2$ か $|x|=1$ かだけを見れば、状態は2つになり、漸化式は1本で済む。そのうえで (2) を使うと、その2つのうち $(2,1)$ の取り分がちょうど半分だと分かる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`8点を、$|x|=2$ の4点（横長の組）と $|x|=1$ の4点（縦長の組）に分ける。操作が組をどう変えるかを見る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$x$ 軸対称と $y$ 軸対称は符号を変えるだけなので、$|x|$ も $|y|$ も変わらない。組は変わらない。確率は合わせて $\dfrac13+\dfrac13=\dfrac23$。`,
                String.raw`$y=x$ 対称と $y=-x$ 対称は $x$ と $y$ を入れかえるので、$|x|$ と $|y|$ が入れかわる。組は必ず入れかわる。確率は合わせて $\dfrac16+\dfrac16=\dfrac13$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`そこで $w_n$ を「$n$ 秒後に $|x|=2$ の組にいる確率」とおく。$w_0=1$ であり、上の観察から`,
            },
            { k: "math", t: String.raw`w_{n+1}=\frac23w_n+\frac13\left(1-w_n\right)=\frac13w_n+\frac13` },
            { k: "p", t: String.raw`が成り立つ。$w_{n+1}-\dfrac12=\dfrac13\left(w_n-\dfrac12\right)$ と変形でき、$w_0-\dfrac12=\dfrac12$ だから` },
            { k: "math", t: String.raw`w_n-\frac12=\frac12\cdot\frac{1}{3^{n}},\qquad w_n=\frac12+\frac{1}{2\cdot3^{n}}` },
            { k: "p", t: String.raw`となる。` },
            {
              k: "p",
              t: String.raw`$n$ が偶数のとき、(2) で見たように $\mathrm{P}$ は $A=\bigl\{(2,1),(-1,2),(-2,-1),(1,-2)\bigr\}$ の点にいる。このうち $|x|=2$ なのは $(2,1)$ と $(-2,-1)$ の2点だけなので`,
            },
            { k: "math", t: String.raw`w_n=p_n+\left(\text{$n$ 秒後に }(-2,-1)\right)` },
            { k: "p", t: String.raw`であり、(2) よりこの2つは等しいから $w_n=2p_n$ である。したがって` },
            { k: "math", t: String.raw`p_n=\frac{w_n}{2}=\frac14+\frac{1}{4\cdot3^{n}}=\frac14\left(1+\frac{1}{3^{n}}\right)` },
            {
              k: "p",
              t: String.raw`となる。$n$ が奇数のときは $\mathrm{P}$ は $B$ の点にいるので $p_n=0$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$w_n$ の漸化式は偶数秒・奇数秒を区別せずに立つ。組の入れかえは、いまどちらの組にいるかに関係なく確率 $\dfrac13$ で起きるからである。`,
            String.raw`$p_n=\dfrac{w_n}{2}$ が言えるのは $n$ が偶数のときだけである。奇数のときは $|x|=2$ の点が $(2,-1)$ と $(-2,1)$ の2つで、$(2,1)$ ではない。`,
            String.raw`$n\to\infty$ で $p_n\to\dfrac14$ になるが、これは8点に均等にばらけた $\dfrac18$ ではない。偶数秒には $A$ の4点にしか行けないので、$\dfrac14$ が正しい。`,
          ],
          check: String.raw`$n=2$ では $\dfrac14\left(1+\dfrac19\right)=\dfrac{5}{18}$ となり、(2) の検算で直接数えた値と一致する。$n=4$ では $\dfrac14\left(1+\dfrac1{81}\right)=\dfrac{41}{162}$ で、これは8点の上の推移を分数のまま4回たどった値と一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・図形と方程式",
      topics: ["法線", "円の方程式", "4次関数の増減", "方程式の実数解の個数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$t=0.5,1,2,3,3.5,3.9$ について、中心 $(c(t),0)$ から接点へのベクトルと放物線の接線ベクトルの内積が $0$ になること、および $(t-c(t))^{2}+f(t)^{2}$ が $\\{r(t)\\}^{2}$ の式と小数9桁まで一致することを確かめた",
          "$\\{r(t)\\}^{2}=\\frac{\\left(t^{2}-16\\right)^{2}\\left(t^{2}+2\\right)}{16}$ という因数分解形が展開形と一致することを確かめ、$0<t<4$ で正であることを見た",
          "$h(t)=a^{2}$ の実数解の個数を $t$ の $400000$ 等分で符号変化から数え、$a<\\sqrt5$ で1個、$a=\\sqrt5$ で2個（$t=2,\\,2\\sqrt3$）、$\\sqrt5<a<\\frac{7\\sqrt2}{4}$ で3個になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円 $C_t$ の中心 $(c(t),0)$ と $\{r(t)\}^{2}$ を $t$ の整式で表す`,
          answer: String.raw`$c(t)=\dfrac{t^{3}}{4}-3t$、$\{r(t)\}^{2}=\dfrac{t^{6}}{16}-\dfrac{15}{8}t^{4}+12t^{2}+32$`,
          approach: String.raw`「点 $(t,f(t))$ で放物線と共通の接線を持つ円」は、その点で放物線と接する円のことである。円の接線は中心と接点を結ぶ半径に垂直だから、中心は接点を通る**法線**の上にある。中心が $x$ 軸上にもあるのだから、法線と $x$ 軸の交点を出せばそれが中心で、あとは中心と接点の距離が半径になる。`,
          blocks: [
            { k: "p", t: String.raw`$f'(x)=-\dfrac{\sqrt2}{2}x$ だから、点 $\left(t,f(t)\right)$ における放物線の接線の傾きは $-\dfrac{\sqrt2}{2}t$ である。` },
            {
              k: "p",
              t: String.raw`円 $C_t$ はこの点で同じ接線を持つから、中心と接点を結ぶ線分はその接線に垂直、すなわち中心は接点における法線の上にある。$0<t<4$ では接線の傾きは $0$ でないので、法線の傾きは $\dfrac{2}{\sqrt2\,t}=\dfrac{\sqrt2}{t}$ で、法線は`,
            },
            { k: "math", t: String.raw`y-f(t)=\frac{\sqrt2}{t}\left(x-t\right)` },
            { k: "p", t: String.raw`と書ける。$y=0$ とおくと` },
            {
              k: "math",
              t: String.raw`x=t-\frac{t\,f(t)}{\sqrt2}=t-\frac{t}{\sqrt2}\left(-\frac{\sqrt2}{4}t^{2}+4\sqrt2\right)=t+\frac{t^{3}}{4}-4t`,
            },
            { k: "p", t: String.raw`となるので` },
            { k: "math", t: String.raw`c(t)=\frac{t^{3}}{4}-3t` },
            { k: "p", t: String.raw`である。半径は中心と接点の距離だから` },
            {
              k: "math",
              t: String.raw`\{r(t)\}^{2}=\left(t-c(t)\right)^{2}+\left\{f(t)\right\}^{2}=\left(4t-\frac{t^{3}}{4}\right)^{2}+\left(-\frac{\sqrt2}{4}t^{2}+4\sqrt2\right)^{2}`,
            },
            { k: "p", t: String.raw`となる。それぞれ展開すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\left(4t-\frac{t^{3}}{4}\right)^{2}&=16t^{2}-2t^{4}+\frac{t^{6}}{16}\\[1mm]
\left(-\frac{\sqrt2}{4}t^{2}+4\sqrt2\right)^{2}&=2\left(\frac{t^{2}}{4}-4\right)^{2}=\frac{t^{4}}{8}-4t^{2}+32
\end{aligned}`,
            },
            { k: "p", t: String.raw`だから、足して` },
            { k: "math", t: String.raw`\{r(t)\}^{2}=\frac{t^{6}}{16}-\frac{15}{8}t^{4}+12t^{2}+32` },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`放物線 $y=f(x)$ と、円 $C_t$ の例（$t=3.5$ と $t=3.9$）。どちらも中心が $x$ 軸上にあり、点 $\left(t,f(t)\right)$ で放物線に接する。$t$ が $4$ に近づくほど円は小さくなる。`,
                view: [-5.2, 5.2, -4.2, 6.5],
                step: { x: 2, y: 2 },
                items: [
                  { k: "curve", f: f4, from: -4.4, to: 4.4 },
                  {
                    k: "param",
                    f: (th: number) =>
                      [0.21875 + 3.5390 * Math.cos(th), 3.5390 * Math.sin(th)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (th: number) =>
                      [3.12975 + 0.8191 * Math.cos(th), 0.8191 * Math.sin(th)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "dot", at: [3.5, f4(3.5)], label: "接点", place: "above-right" },
                  { k: "dot", at: [0.21875, 0], label: "中心", place: "below-left" },
                  { k: "dot", at: [3.12975, 0] },
                  { k: "text", at: [-1, f4(-1)], label: "y = f(x)", place: "above-left" },
                  { k: "text", at: [-2.5, 2.27], label: "t = 3.5 の円", place: "left" },
                  { k: "text", at: [3.12975, -0.8191], label: "t = 3.9 の円", place: "below" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`この式は $t^{2}$ の3次式と見ると因数分解できて、$\{r(t)\}^{2}=\dfrac{\left(t^{2}-16\right)^{2}\left(t^{2}+2\right)}{16}$ となる。答案に書く必要はないが、$0<t<4$ で正であることがすぐ見え、$t\to4$ で半径が $0$ に近づくことも分かるので、検算に使える。`,
            },
          ],
          pitfalls: [
            String.raw`「共通の接線を持つ」を「接線の方程式を連立する」と読み替えると計算が重くなる。円の中心と接点を結ぶ半径が接線に垂直、という1行で済む。`,
            String.raw`法線の傾きは接線の傾きの逆数ではなく、$-1$ をかけた逆数である。$-\dfrac{\sqrt2}{2}t$ の法線は $\dfrac{2}{\sqrt2 t}=\dfrac{\sqrt2}{t}$ になる。`,
          ],
          check: String.raw`$t\to0$ の極限を見ると $c\to0$、$\{r\}^{2}\to32$ となり、$r\to4\sqrt2=f(0)$ である。これは放物線の頂点 $\left(0,4\sqrt2\right)$ で接し、中心が原点にある円そのもので、確かに $x$ 軸上に中心がある。$t=2$ では $c(2)=\dfrac84-6=-4$、$f(2)=-\sqrt2+4\sqrt2=3\sqrt2$ なので、中心 $(-4,0)$ と接点 $\left(2,3\sqrt2\right)$ の距離の2乗は $6^{2}+\left(3\sqrt2\right)^{2}=36+18=54$ となり、$\{r(2)\}^{2}=\dfrac{64}{16}-\dfrac{15}{8}\cdot16+48+32=54$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$0<a<f(3)$ のとき、$C_t$ が点 $(3,a)$ を通るような $t$ が $0<t<4$ にいくつあるかを求める`,
          answer: String.raw`$0<a<\sqrt5$ のとき1個、$a=\sqrt5$ のとき2個、$\sqrt5<a<\dfrac{7\sqrt2}{4}$ のとき3個`,
          approach: String.raw`「$C_t$ が $(3,a)$ を通る」を式にすると $\left(3-c(t)\right)^{2}+a^{2}=\{r(t)\}^{2}$ で、$t$ について整理すれば $t$ の4次方程式 $h(t)=a^{2}$ になる。$a$ は右辺にしかいないので、$y=h(t)$ のグラフと水平線 $y=a^{2}$ の交点を数える形に持ち込める。$h'(t)$ がきれいに因数分解するので、増減表が書ける。`,
          blocks: [
            { k: "p", t: String.raw`$C_t$ が $(3,a)$ を通る条件は` },
            { k: "math", t: String.raw`\left(3-c(t)\right)^{2}+a^{2}=\{r(t)\}^{2}` },
            { k: "p", t: String.raw`である。$c=c(t)$ と書くと $\left(3-c\right)^{2}=c^{2}-6c+9$ で` },
            {
              k: "math",
              t: String.raw`c^{2}=\frac{t^{6}}{16}-\frac32t^{4}+9t^{2},\qquad -6c=-\frac32t^{3}+18t`,
            },
            { k: "p", t: String.raw`だから、$\{r(t)\}^{2}$ から引くと $t^{6}$ の項が消えて` },
            {
              k: "math",
              t: String.raw`h(t):=\{r(t)\}^{2}-\left(3-c(t)\right)^{2}=-\frac38t^{4}+\frac32t^{3}+3t^{2}-18t+23`,
            },
            { k: "p", t: String.raw`となる。求める $t$ の個数は、$0<t<4$ で $h(t)=a^{2}$ となる $t$ の個数である。` },
            { k: "p", t: String.raw`**増減を調べる。**` },
            {
              k: "math",
              t: String.raw`h'(t)=-\frac32t^{3}+\frac92t^{2}+6t-18=-\frac32\left(t^{3}-3t^{2}-4t+12\right)=-\frac32(t+2)(t-2)(t-3)`,
            },
            {
              k: "p",
              t: String.raw`である。$0<t<4$ では $t+2>0$ なので、$h'$ の符号は $-(t-2)(t-3)$ の符号と同じになる。すなわち $0<t<2$ で $h'<0$、$2<t<3$ で $h'>0$、$3<t<4$ で $h'<0$ である。値は`,
            },
            {
              k: "math",
              t: String.raw`h(0)=23,\qquad h(2)=5,\qquad h(3)=\frac{49}{8},\qquad h(4)=-1`,
            },
            {
              k: "p",
              t: String.raw`となる。つまり $h$ は $23$ から下がって $t=2$ で $5$ になり、$t=3$ で $\dfrac{49}{8}$ まで上がり、また下がって $t=4$ で $-1$ になる。$t=0$ と $t=4$ は範囲に入らない。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=h(t)$ のグラフ（$0\le t\le4$）。$C_t$ が $(3,a)$ を通るのは $h(t)=a^{2}$ のときだから、水平線 $y=a^{2}$ との交点の個数を数えればよい。破線は $y=5$ と $y=\frac{49}{8}$。`,
                view: [-0.3, 4.4, -2.5, 24.5],
                step: { x: 1, y: 5 },
                items: [
                  { k: "curve", f: h4, from: 0, to: 4 },
                  { k: "seg", a: [0, 5], b: [4.3, 5], dash: true, faint: true },
                  { k: "seg", a: [0, 49 / 8], b: [4.3, 49 / 8], dash: true, faint: true },
                  { k: "dot", at: [2, 5], label: "(2, 5)", place: "below-left" },
                  { k: "dot", at: [3, 49 / 8], label: "(3, 49/8)", place: "above-right" },
                  { k: "dot", at: [4, -1], label: "(4, −1)", place: "below-left" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**$a^{2}$ の範囲。** $f(3)=-\dfrac{\sqrt2}{4}\cdot9+4\sqrt2=\dfrac{7\sqrt2}{4}$ で、$\left\{f(3)\right\}^{2}=\dfrac{49}{8}$ である。条件 $0<a<f(3)$ は $0<a^{2}<\dfrac{49}{8}$ と同じになる。$h(3)=\dfrac{49}{8}$ はこの値そのもので、$t=3$ のときの円がちょうど点 $\left(3,f(3)\right)$ を通ることに対応している。`,
            },
            { k: "p", t: String.raw`$s=a^{2}$ とおき、$0<s<\dfrac{49}{8}$ の範囲で、3つの区間ごとに解の個数を数える。` },
            {
              k: "steps",
              items: [
                String.raw`$0<t\le2$：$h$ は $23$（$t=0$ は除く）から $5$ まで減少するので、$5\le s<23$ のときだけ解が1個ある。いまは $s<\dfrac{49}{8}$ なので、$5\le s<\dfrac{49}{8}$ のとき1個。`,
                String.raw`$2\le t\le3$：$h$ は $5$ から $\dfrac{49}{8}$ まで増加するので、$5\le s\le\dfrac{49}{8}$ のとき解が1個。いまは $s<\dfrac{49}{8}$ なので、$5\le s<\dfrac{49}{8}$ のとき1個。`,
                String.raw`$3\le t<4$：$h$ は $\dfrac{49}{8}$ から $-1$（$t=4$ は除く）まで減少するので、$-1<s\le\dfrac{49}{8}$ のとき解が1個。いまの $s$ は必ずこの範囲なので、つねに1個。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$s=5$ のときは最初の2つの区間がともに $t=2$ を与えるので、同じ解を2回数えないようにする。まとめると、解の個数は $0<s<5$ のとき1個、$s=5$ のとき2個、$5<s<\dfrac{49}{8}$ のとき3個である。`,
            },
            {
              k: "p",
              t: String.raw`$a>0$ なので $s=a^{2}$ と $a$ の大小は向きが同じで、$s=5$ は $a=\sqrt5$ にあたる。$\sqrt5=2.23\ldots$、$\dfrac{7\sqrt2}{4}=2.47\ldots$ なので $\sqrt5<f(3)$ であり、3つの場合はすべて起きる。よって求める個数は`,
            },
            {
              k: "math",
              t: String.raw`\begin{cases}
1\ \text{個} & \left(0<a<\sqrt5\right)\\[1mm]
2\ \text{個} & \left(a=\sqrt5\right)\\[1mm]
3\ \text{個} & \left(\sqrt5<a<\dfrac{7\sqrt2}{4}\right)
\end{cases}`,
            },
          ],
          pitfalls: [
            String.raw`$h(t)=a^{2}$ の解を数えるとき、$t=0$ と $t=4$ が範囲に入らないことを落とさない。とくに $h(4)=-1<0$ なので、$t=4$ の近くでは $h$ が負になり、$s$ がどんなに小さくても3つめの区間に必ず解が1つある。`,
            String.raw`$s=5$ のとき $t=2$ は $h$ の極小を与える点で、そこで $h(t)-5$ は重解になる。グラフが水平線に接するので、交点としては1つしか数えない。`,
            String.raw`$a$ の条件は $0<a<f(3)$ で、$a^{2}$ に直すと $0<a^{2}<\dfrac{49}{8}$ になる。$a>0$ が効いているので、$a$ が負の場合まで考えて場合分けを増やさない。`,
          ],
          check: String.raw`$a=\sqrt5$ のときの2つの解を直接求めると、$h(t)=5$ は $-\dfrac38t^{4}+\dfrac32t^{3}+3t^{2}-18t+18=0$、つまり $(t-2)^{2}\left(t^{2}-12\right)=0$（定数倍を除く）となり、$t=2$（重解）と $t=2\sqrt3=3.46\ldots$ を得る。どちらも $0<t<4$ にあり、確かに2個である。`,
        },
      ],
    },
    {
      no: 5,
      field: "空間図形・積分法",
      topics: ["回転体の体積", "断面積", "円環", "2次関数の最大最小"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "各 $x$ について断面の線分を $2000$ 等分し、$x$ 軸からの距離の最大・最小を直接走査して円環の面積を出し、$x$ を $20000$ 等分して足し上げると $0.34906585\\ldots$ になり $\\frac\\pi9=0.34906585\\ldots$ と小数8桁まで一致することを確かめた",
          "$150$ 万点のモンテカルロでも $0.3509$ となり、$\\frac\\pi9=0.3491$ と統計誤差の範囲で一致することを確かめた",
          "場合分けの境目 $x=\\frac13$ で、2つの式がともに面積 $\\frac{2\\pi}{9}$ を与えることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`三角形 $\mathrm{ABD}$ の周および内部を $x$ 軸のまわりに1回転させた立体の体積を求める`,
          answer: String.raw`$\dfrac\pi9$`,
          approach: String.raw`回転体は $x$ 軸に垂直な平面で切って足す。切り口は、三角形の切り口（線分）を回したものなので、円板ではなく**円環**になりうる。線分の各点の $x$ 軸からの距離を調べ、その最大と最小を出せばよい。三角形は平面 $x+y+z=1$ の上にあるので、$x$ を固定すると $y+z$ が決まり、距離は1変数の2次関数になる。あとはその2次関数の定義域の端と頂点の位置関係で場合分けする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{D}$ は $\mathrm{AC}$ の中点なので $\mathrm{D}\left(\dfrac12,0,\dfrac12\right)$ である。$\mathrm{A},\mathrm{B},\mathrm{C}$ はいずれも平面 $x+y+z=1$ 上にあり、$\mathrm{D}$ もその上にある。`,
            },
            { k: "p", t: String.raw`**三角形を不等式で書く。** 三角形 $\mathrm{ABD}$ の周と内部は` },
            { k: "math", t: String.raw`x+y+z=1,\qquad y\ge0,\qquad z\ge0,\qquad y+2z\le1` },
            {
              k: "p",
              t: String.raw`で表せる。実際、辺 $\mathrm{AB}$ は $z=0$、辺 $\mathrm{AD}$ は $y=0$、辺 $\mathrm{BD}$ は $\mathrm{B}(0,1,0)$ と $\mathrm{D}\left(\frac12,0,\frac12\right)$ を結ぶので、その上では $y+2z=1$ が成り立つ。3頂点はこの3本の不等式の等号の組で得られる。`,
            },
            {
              k: "p",
              t: String.raw`**$x$ で切る。** $x$ を固定し、$k=1-x$ とおく。切り口は $y+z=k$、$y\ge0$、$z\ge0$、$y+2z\le1$ をみたす点の集合である。$y=k-z$ を $y+2z\le1$ に入れると $k+z\le1$、つまり $z\le1-k=x$ となるので、`,
            },
            { k: "math", t: String.raw`0\le z\le m,\qquad m=\min\{x,\ 1-x\}` },
            {
              k: "p",
              t: String.raw`の範囲の線分である。$x$ の動く範囲は $0\le x\le1$ で、$x=1$ が $\mathrm{A}$、$x=0$ が $\mathrm{B}$ にあたる。`,
            },
            { k: "p", t: String.raw`この線分上の点の $x$ 軸からの距離の2乗は` },
            {
              k: "math",
              t: String.raw`g(z)=y^{2}+z^{2}=(k-z)^{2}+z^{2}=2\left(z-\frac{k}{2}\right)^{2}+\frac{k^{2}}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。線分は連結だから、回してできる切り口は $g$ の最小値を内半径の2乗、最大値を外半径の2乗とする円環になる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$x=\frac15$ のときの切り口を $yz$ 平面で見たもの。線分（三角形の切り口）を原点のまわりに回すと、内側に穴のあいた円環ができる。外半径は $\frac45$、内半径は $\sqrt{\frac25}$。`,
                view: [-1.35, 1.35, -1.15, 1.15],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (th: number) => [0.8 * Math.cos(th), 0.8 * Math.sin(th)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (th: number) =>
                      [Math.sqrt(0.4) * Math.cos(th), Math.sqrt(0.4) * Math.sin(th)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                    dash: true,
                  },
                  { k: "seg", a: [0.8, 0], b: [0.6, 0.2] },
                  { k: "dot", at: [0.8, 0] },
                  { k: "dot", at: [0.6, 0.2] },
                  { k: "text", at: [0.566, 0.566], label: "外半径 4/5", place: "above-right" },
                  { k: "text", at: [-0.447, 0.447], label: "内半径 √(2/5)", place: "above-left" },
                  { k: "text", at: [0.7, 0.1], label: "切り口", place: "above-right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`**最大・最小を求める。** $g$ は下に凸で、軸は $z=\dfrac{k}{2}$ にある。定義域 $0\le z\le m$ の端の値は`,
            },
            {
              k: "math",
              t: String.raw`g(0)=k^{2},\qquad g(m)=(k-m)^{2}+m^{2}`,
            },
            {
              k: "p",
              t: String.raw`である。まず最大値を見る。$0\le x\le\dfrac12$ では $m=x$、$k=1-x$ で`,
            },
            {
              k: "math",
              t: String.raw`g(0)-g(m)=(1-x)^{2}-\left\{(1-2x)^{2}+x^{2}\right\}=2x(1-2x)\ge0`,
            },
            {
              k: "p",
              t: String.raw`となり、$\dfrac12\le x\le1$ では $m=k$ なので $g(m)=k^{2}=g(0)$ となる。いずれにしても最大値は $g(0)=k^{2}=(1-x)^{2}$ である。`,
            },
            {
              k: "p",
              t: String.raw`次に最小値を見る。軸 $z=\dfrac{k}{2}$ が定義域に入るのは $\dfrac{k}{2}\le m$ のときで、$0\le x\le\dfrac12$ では $m=x$ だから $\dfrac{1-x}{2}\le x$、すなわち $x\ge\dfrac13$ のときである。$x\ge\dfrac12$ では $m=k\ge\dfrac{k}{2}$ なので必ず入る。まとめると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\dfrac13\le x\le1$：軸が定義域に入るので最小値は $g\left(\dfrac{k}{2}\right)=\dfrac{k^{2}}{2}=\dfrac{(1-x)^{2}}{2}$。`,
                String.raw`$0\le x<\dfrac13$：軸は定義域の右にあり $g$ は減少するので、最小値は $g(m)=g(x)=(1-2x)^{2}+x^{2}=5x^{2}-4x+1$。`,
              ],
            },
            { k: "p", t: String.raw`したがって切り口の面積 $S(x)$ は` },
            {
              k: "math",
              t: String.raw`S(x)=\begin{cases}
\pi\left\{(1-x)^{2}-\left(5x^{2}-4x+1\right)\right\}=2\pi x(1-2x) & \left(0\le x\le\dfrac13\right)\\[3mm]
\pi\left\{(1-x)^{2}-\dfrac{(1-x)^{2}}{2}\right\}=\dfrac{\pi(1-x)^{2}}{2} & \left(\dfrac13\le x\le1\right)
\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`である。境目 $x=\dfrac13$ ではどちらの式も $\dfrac{2\pi}{9}$ となり、つながっている。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$x$ 軸を含む平面で切ったときの断面の上半分。外側の曲線は半径 $1-x$、内側の曲線は $0\le x\le\frac13$ で $\sqrt{5x^{2}-4x+1}$、$\frac13\le x\le1$ で $\frac{1-x}{\sqrt2}$。この2本ではさまれた部分を $x$ 軸のまわりに回したものが求める立体。`,
                view: [-0.12, 1.22, -0.1, 1.2],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "fillBetween",
                    top: (x: number) => 1 - x,
                    bottom: innerRadius,
                    from: 0,
                    to: 1,
                  },
                  { k: "curve", f: (x: number) => 1 - x, from: 0, to: 1 },
                  { k: "curve", f: innerRadius, from: 0, to: 1 },
                  { k: "dot", at: [1 / 3, 2 / 3], label: "x = 1/3", place: "above-right" },
                  { k: "dot", at: [0, 1], label: "(0, 1)", place: "above-right" },
                ],
              },
            },
            { k: "p", t: String.raw`**積分する。**` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\int_0^{\frac13}2\pi x(1-2x)\,dx&=2\pi\left[\frac{x^{2}}{2}-\frac{2x^{3}}{3}\right]_0^{\frac13}=2\pi\left(\frac{1}{18}-\frac{2}{81}\right)=2\pi\cdot\frac{5}{162}=\frac{5\pi}{81}\\[2mm]
\int_{\frac13}^{1}\frac{\pi(1-x)^{2}}{2}\,dx&=\frac\pi2\left[-\frac{(1-x)^{3}}{3}\right]_{\frac13}^{1}=\frac\pi2\cdot\frac{1}{3}\left(\frac23\right)^{3}=\frac\pi2\cdot\frac{8}{81}=\frac{4\pi}{81}
\end{aligned}`,
            },
            { k: "p", t: String.raw`足して、求める体積は` },
            { k: "math", t: String.raw`V=\frac{5\pi}{81}+\frac{4\pi}{81}=\frac{9\pi}{81}=\frac\pi9` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`切り口を円板だと思い込まない。線分が $x$ 軸をまたがず、軸からいちばん近い点が端点でないことがあるので、内側に穴があく。穴の有無は $g$ の軸 $z=\dfrac{k}{2}$ が定義域に入るかどうかで決まる。`,
            String.raw`$z$ の動く範囲が $\min\{x,1-x\}$ で切り替わるので、場合分けの境目が2か所（$x=\dfrac13$ と $x=\dfrac12$）あるように見える。実際には最大値は全域で $(1-x)^{2}$、最小値の切り替わりは $x=\dfrac13$ だけなので、面積の式は2つで足りる。`,
            String.raw`$\mathrm{C}$ は使わない。$\mathrm{D}$ の座標を出すためにだけ出てくる点で、回転させるのは三角形 $\mathrm{ABD}$ である。`,
          ],
          check: String.raw`$x=0$ では $m=0$ で切り口が1点になり、$S(0)=0$ となる。式でも $2\pi\cdot0\cdot1=0$ で合う。$x=1$ でも $S(1)=0$ である。$x=\dfrac13$ での面積 $\dfrac{2\pi}{9}=0.698$ は、外半径 $\dfrac23$ の円の面積 $\dfrac{4\pi}{9}=1.396$ のちょうど半分で、内半径が外半径の $\dfrac{1}{\sqrt2}$ 倍であることと合う。`,
        },
      ],
    },
    {
      no: 6,
      field: "整数",
      topics: ["素数", "因数分解", "約数", "2次方程式の解の個数"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "(1) は $-500\\le n\\le499$ を全探索し、$f(n)$ が素数になるのが $n=-7,-3,1$ の3つだけであることを確かめた",
          "(2) は $-200\\le a,b\\le200$ の $160801$ 通りについて、$|n|=1$ または $|n^{2}+an+b|=1$ をみたす $n$ の候補を列挙して素数判定し、個数が $4$ 以上になる組が1つもないことを確かめた",
          "同じ全探索で、ちょうど3個になる組が $117$ 通りあることを確かめた（上限 $3$ は到達する）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=x^{3}+10x^{2}+20x$ について、$f(n)$ が素数となる整数 $n$ をすべて求める`,
          answer: String.raw`$n=-7,\ -3,\ 1$（このとき $f(n)$ はそれぞれ $7,\ 3,\ 31$）`,
          approach: String.raw`$f(n)=n\left(n^{2}+10n+20\right)$ と因数分解できることが出発点になる。素数は「$1$ と自分自身以外に正の約数を持たない」のだから、2つの整数の積が素数になるには、どちらかが $\pm1$ でなければならない。調べる $n$ が一気に有限個に絞れる。`,
          blocks: [
            { k: "p", t: String.raw`$f(n)=n\left(n^{2}+10n+20\right)$ である。$q(n)=n^{2}+10n+20$ とおく。` },
            {
              k: "p",
              t: String.raw`$f(n)=n\,q(n)$ が素数 $p$ になったとする。$n$ と $q(n)$ は整数で積が $p$ だから、$n$ は $p$ の約数であり、$n=\pm1$ または $n=\pm p$ である。$n=\pm p$ なら $q(n)=\pm1$ になるので、結局 $|n|=1$ か $|q(n)|=1$ のどちらかが成り立つ。順に調べる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n=1$：$f(1)=1+10+20=31$ で、これは素数。適する。`,
                String.raw`$n=-1$：$f(-1)=-1+10-20=-11$ で、負だから素数ではない。適さない。`,
                String.raw`$q(n)=1$：$n^{2}+10n+19=0$ の判別式は $100-76=24$ で平方数でないから、整数解はない。`,
                String.raw`$q(n)=-1$：$n^{2}+10n+21=(n+3)(n+7)=0$ より $n=-3,\,-7$。このとき $f(n)=-n$ で、$f(-3)=3$、$f(-7)=7$。どちらも素数で適する。`,
              ],
            },
            { k: "p", t: String.raw`以上より $n=-7,\,-3,\,1$ である。` },
          ],
          pitfalls: [
            String.raw`素数は $2$ 以上の整数なので、$f(n)$ が負になる場合は外す。$n=-1$ はここで落ちる。`,
            String.raw`$|n|=1$ の場合と $|q(n)|=1$ の場合は重なることがある。重複して数えないよう、最後に $n$ の値で見直す。`,
          ],
          check: String.raw`$f(-7)=-343+490-140=7$、$f(-3)=-27+90-60=3$、$f(1)=31$ で、いずれも素数。$-500\le n\le499$ を機械で全部調べても、素数になるのはこの3つだけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`$a,b$ を整数、$g(x)=x^{3}+ax^{2}+bx$ とするとき、$g(n)$ が素数となる整数 $n$ の個数が3個以下であることを示す`,
          answer: String.raw`そのような $n$ は3個以下（(1) の $a=10,\,b=20$ でちょうど3個になるので、$3$ は最良の上限）`,
          approach: String.raw`(1) と同じく $g(n)=n\,q(n)$、$q(x)=x^{2}+ax+b$ と書けるので、候補は「$|n|=1$」と「$q(n)=1$」と「$q(n)=-1$」の3種類に分かれる。それぞれ高々2個なので、そのままだと6個までしか言えない。効くのは、$q(n)=1$ の側の $n$ が必ず $2$ 以上、$q(n)=-1$ の側の $n$ が必ず $-2$ 以下になることで、この2つは**同時には起きない**。$q$ が2次式であることから出る差の評価が決め手になる。`,
          blocks: [
            { k: "p", t: String.raw`$q(x)=x^{2}+ax+b$ とおくと $g(n)=n\,q(n)$ である。$g(n)$ が素数になる整数 $n$ 全体の集合を $T$ とし、次の3つに分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$P=\left\{n\in T:q(n)=1\right\}$。このとき $g(n)=n$ なので $n$ 自身が素数で、とくに $n\ge2$。`,
                String.raw`$N=\left\{n\in T:q(n)=-1\right\}$。このとき $g(n)=-n$ なので $-n$ が素数で、とくに $n\le-2$。`,
                String.raw`$E=\left\{n\in T:|q(n)|\ne1\right\}$。$n\,q(n)$ が素数で $|q(n)|\ne1$ なら $|n|=1$ でなければならないので、$n=\pm1$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$T$ のどの要素も、$|n|=1$ か $|q(n)|=1$ のどちらかをみたす（(1) と同じ議論）ので、$T=P\cup N\cup E$ である。$P,N$ の要素は $|n|\ge2$、$E$ の要素は $|n|=1$ だから、3つに重なりはない。また $q(x)=1$、$q(x)=-1$ はどちらも2次方程式なので $|P|\le2$、$|N|\le2$ であり、$|E|\le2$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$P$ と $N$ が両方とも空でないことはない。** $r\in P$、$s\in N$ があったとする。$r\ge2$、$s\le-2$ だから $r-s\ge4$ である。一方`,
            },
            {
              k: "math",
              t: String.raw`q(r)-q(s)=\left(r^{2}-s^{2}\right)+a(r-s)=(r-s)(r+s+a)`,
            },
            {
              k: "p",
              t: String.raw`で、左辺は $1-(-1)=2$ である。$r+s+a$ は整数だから $r-s$ は $2$ の約数となり $r-s\le2$ だが、これは $r-s\ge4$ に反する。よって $P=\varnothing$ または $N=\varnothing$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$|P|=2$ なら $-1\notin E$。** $P=\left\{r_1,r_2\right\}$（$r_1\ne r_2$、ともに素数なので $2$ 以上で、一方は $3$ 以上）とする。$q(x)-1$ は最高次の係数が $1$ の2次式で $r_1,r_2$ を解に持つから $q(x)-1=\left(x-r_1\right)\left(x-r_2\right)$ である。$x=-1$ を入れると`,
            },
            {
              k: "math",
              t: String.raw`q(-1)-1=\left(1+r_1\right)\left(1+r_2\right)\ge3\cdot4=12`,
            },
            {
              k: "p",
              t: String.raw`なので $q(-1)\ge13$ である。すると $g(-1)=-q(-1)\le-13<0$ となり素数ではない。よって $-1\notin E$、したがって $|E|\le1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$|N|=2$ なら $-1\notin E$。** $N=\left\{s_1,s_2\right\}$（$s_1\ne s_2$、ともに $-2$ 以下で、一方は $-3$ 以下）とする。同じように $q(x)+1=\left(x-s_1\right)\left(x-s_2\right)$ と書けて`,
            },
            {
              k: "math",
              t: String.raw`q(-1)+1=\left(-1-s_1\right)\left(-1-s_2\right)\ge1\cdot2=2`,
            },
            {
              k: "p",
              t: String.raw`なので $q(-1)\ge1$ である。すると $g(-1)=-q(-1)\le-1<0$ となり素数ではない。よってこの場合も $|E|\le1$ である。`,
            },
            { k: "p", t: String.raw`**まとめる。** $P=\varnothing$ か $N=\varnothing$ のどちらかなので、$|T|=|P|+|N|+|E|$ は次のどちらかに収まる。` },
            {
              k: "steps",
              items: [
                String.raw`$|P|\le1$ かつ $|N|\le1$ のとき：$P$ と $N$ の一方は空なので $|P|+|N|\le1$ となり、$|T|\le1+2=3$。`,
                String.raw`$|P|=2$ または $|N|=2$ のとき：もう一方は空で、上で見たとおり $|E|\le1$ だから $|T|\le2+0+1=3$。`,
              ],
            },
            { k: "p", t: String.raw`いずれの場合も $|T|\le3$ である。すなわち $g(n)$ が素数となる整数 $n$ は3個以下である。` },
            {
              k: "note",
              t: String.raw`上限の $3$ は実際に達成される。(1) の $a=10$、$b=20$ では $q(-3)=q(-7)=-1$ なので $N=\{-3,-7\}$、$q(1)=31$ で $|q(1)|\ne1$ だから $E=\{1\}$ となり、ちょうど3個になっている。$P$ が空であることも、上の議論と合っている。`,
            },
          ],
          pitfalls: [
            String.raw`「$|n|=1$ が2個、$q(n)=1$ が2個、$q(n)=-1$ が2個で高々6個」で止まらない。6個から3個まで落とすのが問題の中身で、そこを埋めないと点にならない。`,
            String.raw`$q(r)-q(s)$ が $r-s$ で割り切れるのは、$q$ が整数係数の多項式だからである。$r^{2}-s^{2}=(r-s)(r+s)$ と $a(r-s)$ の2つに分けて書けば、特別な定理を持ち出さずに示せる。`,
            String.raw`$n=1$ と $n=-1$ のうち、落ちるのはいつも $n=-1$ の側である。$g(-1)=-q(-1)$ という符号の関係から、$q(-1)$ が正だと素数になりえないためで、この非対称性が $3$ と $4$ を分けている。`,
          ],
          check: String.raw`$-200\le a,b\le200$ の $160801$ 通りについて、$|n|=1$ と $|q(n)|=1$ をみたす $n$ の候補をすべて列挙して素数判定すると、個数の最大は $3$ で、$4$ 以上になる組は1つもなかった。ちょうど3個になる組は $117$ 通りあり、たとえば $a=-99$、$b=195$ では $n=1,2,97$ の3つで素数になる。`,
        },
      ],
    },
  ],
};
