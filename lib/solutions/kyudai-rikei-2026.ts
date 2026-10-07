import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2026年度（令和8年度）一般選抜 前期日程 数学（理科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 九州大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */
export const kyudaiRikei2026: SolutionSet = {
  slug: "kyudai-rikei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "九州大学",
  short: "九大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間図形",
      topics: ["球の切り口の円", "点と直線の距離", "円柱の方程式", "だ円"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "中心 $(\\pm\\sqrt2,0,\\pm\\sqrt6)$ が球面上にあり、$\\mathrm{OP}$ 方向に $2\\sqrt2$ の位置にあることを確かめた",
          "$z=0$ の切り口が $\\frac34x^{2}+y^{2}=1$ になることを、円柱上の点を数値で取って確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円 $C_1,\ C_2$ の中心の座標を求める`,
          answer: String.raw`$C_1$ の中心 $(\sqrt2,\,0,\,\sqrt6)$、$C_2$ の中心 $(-\sqrt2,\,0,\,-\sqrt6)$`,
          approach: String.raw`$\mathrm{OP}$ に垂直な平面で球を切ると、切り口の円の中心は**直線 $\mathrm{OP}$ 上**に来る。中心までの距離は三平方の定理で決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$|\mathrm{OP}|=\sqrt{1+0+3}=2$ なので、$\mathrm{OP}$ 方向の単位ベクトルは $\vec u=\left(\frac12,\,0,\,\frac{\sqrt3}{2}\right)$。`,
            },
            {
              k: "p",
              t: String.raw`中心から距離 $d$ の位置で切ると、切り口の円の半径は $\sqrt{9-d^{2}}$。これが $1$ だから $d^{2}=8$、$d=2\sqrt2$。`,
            },
            { k: "math", t: String.raw`\pm2\sqrt2\,\vec u=\pm\left(\sqrt2,\,0,\,\sqrt6\right)` },
            { k: "p", t: String.raw`$z$ 座標の符号で振り分けて、$C_1$ の中心が $(\sqrt2,0,\sqrt6)$、$C_2$ の中心が $(-\sqrt2,0,-\sqrt6)$。` },
          ],
          check: String.raw`$(\sqrt2)^{2}+0+(\sqrt6)^{2}=8=(2\sqrt2)^{2}$ なので、確かに原点から $2\sqrt2$。$9-8=1$ で半径 $1$ も合う。`,
          pitfalls: [
            String.raw`「$\mathrm{OP}$ と直交する平面」なので、中心は $\mathrm{OP}$ 上。平面の式を立てる必要はない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`円柱の側面を平面 $z=0$ で切った曲線の方程式を求める`,
          answer: String.raw`だ円 $\dfrac34x^{2}+y^{2}=1$（長軸は $x$ 軸方向で半径 $\dfrac{2\sqrt3}{3}$、短軸は $y$ 軸方向で半径 $1$）`,
          approach: String.raw`$C_1,C_2$ の中心はどちらも直線 $\mathrm{OP}$ 上にあり、半径も等しい。だから円柱の軸は $\mathrm{OP}$ そのもので、側面は「**直線 $\mathrm{OP}$ からの距離が $1$**」という1本の式で書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`点 $\mathrm{X}(x,y,z)$ から直線 $\mathrm{OP}$ までの距離の2乗は $|\mathrm{X}|^{2}-(\vec{\mathrm{OX}}\cdot\vec u)^{2}$。側面はこれが $1$ だから`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}+z^{2}-\left(\frac{x}{2}+\frac{\sqrt3}{2}z\right)^{2}=1`,
            },
            { k: "p", t: String.raw`$z=0$ を代入すると` },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}-\frac{x^{2}}{4}=1\ \Longleftrightarrow\ \frac34x^{2}+y^{2}=1`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{x^{2}}{\left(\frac{2}{\sqrt3}\right)^{2}}+\dfrac{y^{2}}{1^{2}}=1$ と書けるので、$x$ 軸方向に $\dfrac{2}{\sqrt3}=\dfrac{2\sqrt3}{3}=1.1547\ldots$、$y$ 軸方向に $1$ のだ円。長軸は $x$ 軸方向。`,
            },
            {
              k: "note",
              t: String.raw`切り口が2つの底面の間に収まっていることも確かめておく。この曲線上では $\vec{\mathrm{OX}}\cdot\vec u=\dfrac{x}{2}$ で、$|x|\le\dfrac{2}{\sqrt3}$ だから $\left|\vec{\mathrm{OX}}\cdot\vec u\right|\le0.578<2\sqrt2$ となり、確かに収まっている。`,
            },
          ],
          check: String.raw`$C_1$ の中心から $\vec u$ に垂直な向きに $1$ 進んだ点 $\left(\sqrt2+\frac{\sqrt3}{2},\,0,\,\sqrt6-\frac12\right)$ を上の式に入れると、$|\mathrm{X}|^{2}=9$、$\vec{\mathrm{OX}}\cdot\vec u=2\sqrt2$ で $9-8=1$。側面の式が合っている。`,
          pitfalls: [
            String.raw`円柱の軸が $\mathrm{OP}$ であることに気づくかどうか。底面の中心が2つとも $\mathrm{OP}$ 上にあるので、軸は $\mathrm{OP}$ しかない。`,
            String.raw`「距離の2乗 $=|\mathrm{X}|^{2}-(\vec{\mathrm{OX}}\cdot\vec u)^{2}$」は、$\vec u$ が**単位**ベクトルのときだけ成り立つ。$\vec{\mathrm{OP}}$ をそのまま使わない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "複素数平面",
      topics: ["z+1/z の像", "双曲線", "回転体の体積", "軸に垂直な断面"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$w=z+\\frac1z$ の実部・虚部が $X^{2}-Y^{2}=2$ をみたすことを、$t$ を細かく動かして確かめた",
          "$Y$ がちょうど $[-1,1]$ を動くこと、$X$ が $[\\sqrt2,\\sqrt3]$ を動くことを確かめた",
          "体積 $\\frac{8\\pi}{3}$ を数値積分で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`軌跡 $C$ を求める`,
          answer: String.raw`双曲線 $x^{2}-y^{2}=2$ のうち、$x>0$ かつ $-1\le y\le1$ の部分（$(\sqrt3,-1)$ から頂点 $(\sqrt2,0)$ を通って $(\sqrt3,1)$ までの弧）`,
          approach: String.raw`$z\ne0$ なので $w=z+\dfrac1z$。$z=t(1+i)$ を入れて実部と虚部に分けると、和と差がきれいな形になり、**掛け合わせると $t$ が消える**。`,
          blocks: [
            { k: "p", t: String.raw`$t>0$ より $z\ne0$ で、$z^{2}-wz+1=0$ から $w=z+\dfrac1z$。$z=t(1+i)$ を入れると` },
            {
              k: "math",
              t: String.raw`w=t(1+i)+\frac{1-i}{2t}=\underbrace{\left(t+\frac{1}{2t}\right)}_{X}+i\underbrace{\left(t-\frac{1}{2t}\right)}_{Y}`,
            },
            { k: "p", t: String.raw`$X+Y=2t,\ X-Y=\dfrac1t$ だから、掛けて` },
            { k: "math", t: String.raw`X^{2}-Y^{2}=(X+Y)(X-Y)=2t\cdot\frac1t=2` },
            {
              k: "p",
              t: String.raw`範囲を調べる。$t_1=\dfrac{\sqrt3-1}{2},\ t_2=\dfrac{\sqrt3+1}{2}$ とおくと $t_1t_2=\dfrac12$、つまり $\dfrac{1}{2t_1}=t_2$。よって`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t=t_1$ のとき $Y=t_1-t_2=-1$、$X=t_1+t_2=\sqrt3$`,
                String.raw`$t=t_2$ のとき $Y=t_2-t_1=1$、$X=\sqrt3$`,
                String.raw`$Y=t-\dfrac{1}{2t}$ は増加関数なので、$Y$ は $-1$ から $1$ までをくまなくとる`,
              ],
            },
            {
              k: "p",
              t: String.raw`$X=\sqrt{2+Y^{2}}>0$ なので右側の分枝。$Y=0$（$t=\frac{1}{\sqrt2}$）で頂点 $(\sqrt2,0)$ を通る。`,
            },
          ],
          check: String.raw`$t_1t_2=\dfrac{3-1}{4}=\dfrac12$ がこの問題の仕掛け。両端で $X$ が同じ $\sqrt3$ になり、$Y$ がちょうど $\pm1$ で対称になる。`,
          pitfalls: [
            String.raw`$X+Y$ と $X-Y$ を作ると $t$ が1つずつ残り、掛けるだけで消える。実部・虚部を2乗して足し引きするより早い。`,
            String.raw`$Y$ の端点を $t_1,t_2$ で確かめる。$t_1t_2=\frac12$ に気づかないと $\pm1$ が出てこない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$C$ と線分 $\mathrm{OP_1},\mathrm{OP_2}$ で囲まれる領域を虚軸のまわりに1回転させた立体の体積を求める`,
          answer: String.raw`$\dfrac{8\pi}{3}$`,
          approach: String.raw`虚軸（$y$ 軸）のまわりなので、**$y$ で輪切り**にする。各 $y$ での断面は、内側が線分、外側が双曲線の円環になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P_1}(\sqrt3,1),\ \mathrm{P_2}(\sqrt3,-1)$。線分 $\mathrm{OP_1}$ は $x=\sqrt3\,y\ (0\le y\le1)$、線分 $\mathrm{OP_2}$ は $x=-\sqrt3\,y\ (-1\le y\le0)$。まとめて $x=\sqrt3\,|y|$。`,
            },
            {
              k: "p",
              t: String.raw`外側は $C$ で $x=\sqrt{2+y^{2}}$。よって高さ $y$ での断面は、内半径 $\sqrt3\,|y|$、外半径 $\sqrt{2+y^{2}}$ の円環。`,
            },
            {
              k: "math",
              t: String.raw`V=\int_{-1}^{1}\pi\Big\{(2+y^{2})-3y^{2}\Big\}dy=2\pi\int_{0}^{1}(2-2y^{2})\,dy`,
            },
            { k: "math", t: String.raw`=2\pi\left[2y-\frac{2y^{3}}{3}\right]_0^1=2\pi\cdot\frac43=\frac{8\pi}{3}` },
            {
              k: "note",
              t: String.raw`断面積に出てくるのは半径の**2乗**なので、根号はここで消える。$\left(\sqrt{2+y^{2}}\right)^{2}=2+y^{2}$、$\left(\sqrt3|y|\right)^{2}=3y^{2}$ となり、絶対値も根号も残らずただの2次式になる。`,
            },
          ],
          check: String.raw`$y=\pm1$ で内半径と外半径がどちらも $\sqrt3$ になり、断面が潰れる。領域が $\mathrm{P_1},\mathrm{P_2}$ で閉じていることと合う。数値積分でも $8\pi/3=8.3776\ldots$ になる。`,
          pitfalls: [
            String.raw`回転軸は**虚軸**（$y$ 軸）。$x$ で積分すると面倒になる。`,
            String.raw`$|y|$ のまま進めてよい。2乗する段階で消えるので、$y\ge0$ と $y<0$ に分ける必要はない。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "確率・漸化式",
      topics: ["最初の1回で分ける", "3項間漸化式", "特性方程式", "等比数列との差"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$p_n$ を、硬貨の列を全列挙して数え上げた値と突き合わせた（$n\\le10$、$r=0.3,0.5,0.7$）",
          "漸化式 $p_n=(1-r)p_{n-1}+rp_{n-2}$ と、閉じた式の両方で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p_1,\ p_2$ を求める`,
          answer: String.raw`$p_1=(1-r)^{3},\qquad p_2=(1-r)^{4}$`,
          approach: String.raw`玉の位置は、**先頭から順に投げた結果で決まっていく**。左から数えて何番目が黒かは、そこまでに置かれた玉の個数で決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p_1$ は1,2,3番目がすべて黒。黒は1回の裏で1個ずつ置かれるので、最初の3回がすべて裏であることと同じ。よって $(1-r)^{3}$。`,
            },
            {
              k: "p",
              t: String.raw`$p_2$ は2,3,4番目が黒。1回目が表だと1,2番目が白になって2番目が黒にならないので、1回目は裏。そのあとは「1,2,3番目が黒」と同じ状況だから`,
            },
            { k: "math", t: String.raw`p_2=(1-r)\,p_1=(1-r)^{4}` },
          ],
          pitfalls: [
            String.raw`表を出すと玉が**2個**置かれる。何回目の投げが何番目の玉になるかは、表の回数で変わる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`1, $n$, $n+1$, $n+2$ 番目がすべて黒である確率を $p_{n-1}$ で表す`,
          answer: String.raw`$(1-r)\,p_{n-1}$`,
          approach: String.raw`1番目が黒 ⟺ 1回目が裏。そのあとの列は**同じ規則の新しい列**とみなせて、全体の $n$ 番目が新しい列の $n-1$ 番目になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`1番目が黒になるのは1回目が裏のときだけで、確率 $1-r$。このとき玉が1個置かれているので、2番目以降は、新しく始めた列の1番目以降と同じ。`,
            },
            {
              k: "p",
              t: String.raw`全体の $n,n+1,n+2$ 番目は、新しい列の $n-1,n,n+1$ 番目にあたる。これがすべて黒である確率は $p_{n-1}$。2回目以降の投げは1回目と独立だから`,
            },
            { k: "math", t: String.raw`(1-r)\,p_{n-1}` },
          ],
        },
        {
          label: "(3)",
          task: String.raw`$n\ge3$ のとき $p_n$ を $p_{n-2},\ p_{n-1}$ で表す`,
          answer: String.raw`$p_n=(1-r)\,p_{n-1}+r\,p_{n-2}$`,
          approach: String.raw`1番目が黒か白かで分ける。黒なら (2) がそのまま使え、白なら玉が2個進むので添字が2つ下がる。`,
          blocks: [
            {
              k: "steps",
              items: [
                String.raw`1番目が黒（1回目が裏、確率 $1-r$）… (2) より寄与は $(1-r)p_{n-1}$`,
                String.raw`1番目が白（1回目が表、確率 $r$）… 1,2番目が白で埋まる。$n,n+1,n+2$ 番目は新しい列の $n-2,n-1,n$ 番目にあたるので、寄与は $r\,p_{n-2}$`,
              ],
            },
            { k: "math", t: String.raw`p_n=(1-r)\,p_{n-1}+r\,p_{n-2}\qquad(n\ge3)` },
          ],
          pitfalls: [
            String.raw`表のときは玉が2個置かれるので、添字は1つではなく**2つ**下がる。ここが $p_{n-2}$ の出どころ。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$p_n$ を求める`,
          answer: String.raw`$p_n=\dfrac{(1-r)^{3}\big\{1-(-r)^{n}\big\}}{1+r}$`,
          approach: String.raw`特性方程式が $x^{2}-(1-r)x-r=0$、つまり $(x-1)(x+r)=0$ と**因数分解できる**。解が $1$ と $-r$ なので、一般項は定数＋等比の形。`,
          blocks: [
            { k: "math", t: String.raw`x^{2}-(1-r)x-r=(x-1)(x+r)=0\ \Longrightarrow\ x=1,\ -r` },
            { k: "p", t: String.raw`$p_n=A+B(-r)^{n}$ とおいて $p_1,p_2$ を入れ、差をとる。` },
            {
              k: "math",
              t: String.raw`p_2-p_1=B\left\{(-r)^{2}-(-r)\right\}=B\,r(1+r)`,
            },
            {
              k: "p",
              t: String.raw`一方 $p_2-p_1=(1-r)^{4}-(1-r)^{3}=-r(1-r)^{3}$ だから、見比べて`,
            },
            {
              k: "math",
              t: String.raw`B=-\frac{(1-r)^{3}}{1+r},\qquad A=p_1+Br=\frac{(1-r)^{3}}{1+r}`,
            },
            { k: "p", t: String.raw`よって` },
            { k: "math", t: String.raw`p_n=\frac{(1-r)^{3}}{1+r}\Big\{1-(-r)^{n}\Big\}` },
          ],
          check: String.raw`$n=1$ で $\dfrac{(1-r)^{3}}{1+r}(1+r)=(1-r)^{3}$、$n=2$ で $\dfrac{(1-r)^{3}}{1+r}(1-r^{2})=(1-r)^{4}$。どちらも (1) と合う。$n=3$ は $(1-r)^{3}(1-r+r^{2})$ で、漸化式から出る値とも一致する。`,
          pitfalls: [
            String.raw`特性方程式に $x=1$ が入るので、一般項に定数項が残る。等比2つの形にしようとすると行き詰まる。`,
            String.raw`$0<r<1$ なので $|-r|<1$。$n\to\infty$ で $p_n\to\dfrac{(1-r)^{3}}{1+r}$ に落ち着く。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "整数・無理数",
      topics: ["二重根号", "背理法", "4次方程式の解", "有理数であることの矛盾"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$x^{4}-10x^{2}+1=0$ の4解が $\\pm\\sqrt2\\pm\\sqrt3$ であることを数値で確かめた",
          "(3) の場合分けで出る $p^{2}=12,\\ 8$ がどちらも有理数の平方でないことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\sqrt2+\sqrt3=\sqrt{5+2\sqrt6}$ を示し、$\sqrt2+\sqrt3$ が無理数であることを示す`,
          answer: String.raw`2乗して比べる。無理数であることは、有理数と仮定すると $\sqrt6$ が有理数になることから`,
          approach: String.raw`「2乗すると $\sqrt6$ が出てくる」という性質が、この大問を通じて使われる。`,
          blocks: [
            { k: "math", t: String.raw`\left(\sqrt2+\sqrt3\right)^{2}=2+2\sqrt6+3=5+2\sqrt6` },
            {
              k: "p",
              t: String.raw`両辺とも正なので $\sqrt2+\sqrt3=\sqrt{5+2\sqrt6}$。`,
            },
            {
              k: "p",
              t: String.raw`$\alpha=\sqrt2+\sqrt3$ が有理数だとすると、$\alpha^{2}=5+2\sqrt6$ も有理数。すると $\sqrt6=\dfrac{\alpha^{2}-5}{2}$ も有理数になり、$\sqrt6$ が無理数であることに反する。`,
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\sqrt2+\sqrt3$ を解にもつ有理数係数の4次方程式を1つ求め、その解をすべて求める`,
          answer: String.raw`$x^{4}-10x^{2}+1=0$。解は $\sqrt2+\sqrt3,\ -\sqrt2-\sqrt3,\ \sqrt3-\sqrt2,\ \sqrt2-\sqrt3$`,
          approach: String.raw`(1) の $\alpha^{2}-5=2\sqrt6$ をもう一度2乗すれば根号が消える。できた方程式は $x^{2}$ の2次式なので、解も根号で書き下せる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\alpha^{2}-5=2\sqrt6\ \Longrightarrow\ (\alpha^{2}-5)^{2}=24\ \Longrightarrow\ \alpha^{4}-10\alpha^{2}+1=0`,
            },
            { k: "p", t: String.raw`$x^{2}=X$ とおくと $X^{2}-10X+1=0$ から $X=5\pm2\sqrt6$。(1) と同じ形なので` },
            {
              k: "math",
              t: String.raw`\sqrt{5+2\sqrt6}=\sqrt2+\sqrt3,\qquad \sqrt{5-2\sqrt6}=\sqrt3-\sqrt2`,
            },
            { k: "p", t: String.raw`（$\left(\sqrt3-\sqrt2\right)^{2}=5-2\sqrt6$ で、$\sqrt3>\sqrt2$ だから正。）よって解は $\pm(\sqrt2+\sqrt3)$ と $\pm(\sqrt3-\sqrt2)$ の4つ。` },
          ],
          check: String.raw`4解の和は $0$（$x^{3}$ の係数が $0$）、積は $1$（定数項）。実際 $(\sqrt3+\sqrt2)(\sqrt3-\sqrt2)=1$ で、符号を付けた4つを掛けると $1$ になる。`,
          pitfalls: [
            String.raw`$\sqrt{5-2\sqrt6}$ は $\sqrt2-\sqrt3$ ではなく $\sqrt3-\sqrt2$。根号は正の値を表すので、大きいほうから引く。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\sqrt2+\sqrt3$ を解にもつ有理数係数の2次方程式が存在しないことを示す`,
          answer: String.raw`存在すると仮定すると、$\sqrt6$ が有理数になるか、$p^{2}=12$ または $8$ となって $p$ が無理数になり、いずれも矛盾`,
          approach: String.raw`$x^{2}+px+q=0$（$p,q$ は有理数）とおいて $\alpha$ を代入し、**$\sqrt6$ について解く**。解けてしまえば $\sqrt6$ が有理数になって矛盾する。解けない場合だけを別に調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`2次の係数で割って $x^{2}+px+q=0$（$p,q$ は有理数）としてよい。$\alpha=\sqrt2+\sqrt3$ を代入し、$\alpha^{2}=5+2\sqrt6$ を使うと`,
            },
            { k: "math", t: String.raw`2\sqrt6+p\left(\sqrt2+\sqrt3\right)=-(5+q)=:s\quad(s\text{ は有理数})` },
            {
              k: "p",
              t: String.raw`**$p=0$ のとき。** $2\sqrt6=s$ となり $\sqrt6$ が有理数。矛盾。`,
            },
            {
              k: "p",
              t: String.raw`**$p\ne0$ のとき。** $\sqrt2+\sqrt3=\dfrac{s-2\sqrt6}{p}$ の両辺を2乗して $5+2\sqrt6=\dfrac{s^{2}+24-4s\sqrt6}{p^{2}}$、整理すると`,
            },
            { k: "math", t: String.raw`\left(2p^{2}+4s\right)\sqrt6=s^{2}+24-5p^{2}` },
            {
              k: "steps",
              items: [
                String.raw`$2p^{2}+4s\ne0$ なら $\sqrt6$ が有理数になり矛盾`,
                String.raw`$2p^{2}+4s=0$ なら右辺も $0$。$s=-\dfrac{p^{2}}{2}$ を代入して $p^{4}-20p^{2}+96=0$、すなわち $p^{2}=12$ または $8$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$p^{2}=12,\ 8$ はいずれも有理数の平方ではない（$p=\pm2\sqrt3,\ \pm2\sqrt2$）ので、$p$ が有理数であることに反する。`,
            },
            { k: "p", t: String.raw`以上よりどの場合も矛盾し、そのような2次方程式は存在しない。` },
            {
              k: "note",
              t: String.raw`(2) の4次式は、実は有理数係数でこれ以上分解できない。だから $\alpha$ を解にもつ有理数係数の方程式は、次数が $4$ の倍数でないと作れない。(3) はその $2$ 次の場合を手で確かめたことになる。`,
            },
          ],
          pitfalls: [
            String.raw`$\sqrt6$ について解けない場合（係数が $0$）を必ず別に調べる。ここを飛ばすと証明が穴だらけになる。`,
            String.raw`$p,q$ が有理数であることを最後まで使う。$p^{2}=12$ が出た時点で「$p$ は有理数のはず」と突き合わせる。`,
          ],
        },
      ],
    },
    {
      no: 5,
      field: "微分積分",
      topics: ["積分で定義された関数", "微分と増減", "部分積分", "差の極限"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$f(-\\frac12)=\\log2+\\frac{\\pi}{2}-2$ を数値積分で確かめた",
          "$x=-\\frac12$ が最小であることを、$x$ を細かく動かして確かめた",
          "$x\\{f(x)-f(x-1)\\}$ が $x\\to\\infty$ で $2$ に近づくことを数値で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)$ が極値をとる $x$ と、そのときの極値を求める`,
          answer: String.raw`$x=-\dfrac12$ で極小値 $\log2+\dfrac{\pi}{2}-2$`,
          approach: String.raw`積分区間の両端が動くので、微分すると**両端の値の差**になる。$f'(x)=0$ は $4t^{2}+1$ の値が両端で等しいことと同じ。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=\log\big(4(x+1)^{2}+1\big)-\log\big(4x^{2}+1\big)=\log\frac{4(x+1)^{2}+1}{4x^{2}+1}` },
            {
              k: "p",
              t: String.raw`$f'(x)=0\iff(x+1)^{2}=x^{2}\iff x=-\dfrac12$。$x>-\dfrac12$ では $(x+1)^{2}>x^{2}$ なので $f'>0$、$x<-\dfrac12$ では $f'<0$。よって $x=-\dfrac12$ で極小。`,
            },
            { k: "p", t: String.raw`極値を求める。部分積分で原始関数を出すと` },
            {
              k: "math",
              t: String.raw`\int\log(4t^{2}+1)\,dt=t\log(4t^{2}+1)-2t+\arctan(2t)+\mathrm{C}`,
            },
            { k: "p", t: String.raw`被積分関数は偶関数なので` },
            {
              k: "math",
              t: String.raw`f\!\left(-\frac12\right)=\int_{-1/2}^{1/2}\log(4t^{2}+1)\,dt=2\left[\frac12\log2-1+\frac{\pi}{4}\right]=\log2+\frac{\pi}{2}-2`,
            },
          ],
          check: String.raw`$\log2+\dfrac{\pi}{2}-2=0.26394\ldots$。数値積分でも同じ値になる。極大値はない（$f$ は $-\frac12$ を境に減少→増加するだけ）。`,
          pitfalls: [
            String.raw`$\displaystyle\int\frac{dt}{4t^{2}+1}=\frac12\arctan(2t)$。$\frac12$ を落としやすい。`,
            String.raw`問われているのは極値。$x=-\frac12$ 以外に $f'=0$ となる点はないので、極大値は存在しない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{x\to\infty}x\big\{f(x)-f(x-1)\big\}$ を求める`,
          answer: String.raw`$2$`,
          approach: String.raw`$f(x)-f(x-1)$ を**1つの積分にまとめる**。区間を $s\in[0,1]$ でそろえると、中身が $\log$ の比になり、$\log(1+\varepsilon)\approx\varepsilon$ が効く。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f(x)-f(x-1)=\int_0^1\log\frac{4(x+s)^{2}+1}{4(x+s-1)^{2}+1}\,ds`,
            },
            { k: "p", t: String.raw`$u=x+s$ とおくと、被積分関数は` },
            {
              k: "math",
              t: String.raw`\log\frac{4u^{2}+1}{4(u-1)^{2}+1}=2\log\frac{u}{u-1}+\log\frac{4+\frac{1}{u^{2}}}{4+\frac{1}{(u-1)^{2}}}`,
            },
            {
              k: "p",
              t: String.raw`第1項は $2\log\left(1+\dfrac{1}{u-1}\right)$ で、$x$ 倍すると $\dfrac{2x}{u-1}\to2$。第2項は $\dfrac{1}{u^{2}}-\dfrac{1}{(u-1)^{2}}=O\!\left(\dfrac{1}{u^{3}}\right)$ なので、$x$ 倍しても $0$ に向かう。`,
            },
            {
              k: "p",
              t: String.raw`$s\in[0,1]$ でこれが一様に成り立つので、積分と極限を入れ替えて`,
            },
            { k: "math", t: String.raw`\lim_{x\to\infty}x\big\{f(x)-f(x-1)\big\}=\int_0^1 2\,ds=2` },
            {
              k: "note",
              t: String.raw`別の見方もできる。$F(x)=\displaystyle\int_0^x\log(4t^{2}+1)dt$ とおくと $f(x)-f(x-1)=F(x+1)-2F(x)+F(x-1)$ で、これは2階差分である。$F''(x)=\dfrac{8x}{4x^{2}+1}\approx\dfrac2x$ なので、$x$ 倍すれば $2$ に近づく、とも読める。`,
            },
          ],
          check: String.raw`$x=1000$ で $x\{f(x)-f(x-1)\}=2.0000\ldots$、$x=100$ で $2.0001\ldots$。数値でも $2$ に近づく。`,
          pitfalls: [
            String.raw`$\log$ の中が $\dfrac{u^{2}}{(u-1)^{2}}$ に近づくところまで分けると、係数 $2$ がどこから来るかがはっきりする。いきなり $\approx\dfrac2x$ と書かない。`,
            String.raw`$4t^{2}+1$ の $+1$ は、$x$ 倍しても消える程度の差しか生まない。そこを $O(1/u^{3})$ と評価しておく。`,
          ],
        },
      ],
    },
  ],
};
