import { kyudaiRikei2026 } from "@/lib/solutions/kyudai-rikei-2026";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2026年度（令和8年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 九州大学はこの年度の問題を公開しているので、そのページへリンクしている。
 *
 * 文科系の第4問は理科系の第3問とまったく同じ問題だった。
 * 同じ解説を2通り書くと必ず食い違うので、理科系の側を1つの正本として持ち、
 * ここでは番号だけ差し替えて使い回す。
 */

const rikei = (no: number) => kyudaiRikei2026.questions.find((q) => q.no === no)!;

/** 理科系 第3問と共通の出題。番号だけ文科系のものに付け替える。 */
const sharedKakuritsu: Question = { ...rikei(3), no: 4 };

export const kyudaiBunkei2026: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["3次関数の極値", "絶対値つきの放物線", "面積", "場合分けして積分"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "極大・極小を、$f$ を細かく刻んだ数値探索で確かめた（$x=-3$ で $82$、$x=2$ で $-43$）",
          "面積 $\\frac{13}{6}$ を、$|x^{2}-1|$ と $x+1$ の差の数値積分で確かめた",
          "交点が $x=-1,\\,0,\\,2$ の3つだけであることを数値の総当たりで確かめた",
          "$x=-1$ が交差ではなく接触（差の符号が変わらない）であることを、左右の値で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=2x^{3}+3x^{2}-36x+1$ が極値をとる $x$ と、そのときの極値を求める`,
          answer: String.raw`$x=-3$ で極大値 $82$、$x=2$ で極小値 $-43$`,
          approach: String.raw`3次関数の極値は $f'(x)=0$ の解でしか起こらない。$f'$ が**因数分解できる形**なので、符号の変化まで一息で読める。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=6x^{2}+6x-36=6(x^{2}+x-6)=6(x+3)(x-2)` },
            {
              k: "p",
              t: String.raw`$f'(x)=0$ の解は $x=-3,\ 2$。$f'$ は下に凸の放物線なので、符号は**正・負・正**と変わる。だから $x=-3$ で極大、$x=2$ で極小。`,
            },
            {
              k: "math",
              t: String.raw`f(-3)=-54+27+108+1=82,\qquad f(2)=16+12-72+1=-43`,
            },
          ],
          check: String.raw`$f(-4)=-128+48+144+1=65<82$、$f(-2)=-16+12+72+1=69<82$ で $x=-3$ が山。$f(1)=2+3-36+1=-30>-43$、$f(3)=54+27-108+1=-26>-43$ で $x=2$ が谷。`,
          pitfalls: [
            String.raw`「極値をとる $x$」と「極値」の両方を聞かれている。$x$ だけで止めない。`,
            String.raw`$f'(x)=0$ は極値の**必要条件**にすぎない。3次関数では重解のとき極値を持たないので、符号が実際に変わることまで示す。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$C:y=|x^{2}-1|$ と、点 $(-1,0)$ を通る傾き $1$ の直線 $l$ で囲まれる領域の面積を求める`,
          answer: String.raw`$\dfrac{13}{6}$`,
          approach: String.raw`$|x^{2}-1|$ は $|x|\le1$ と $|x|\ge1$ で式が変わる。**絶対値を外す前に交点を全部押さえてから**、区間ごとにどちらが上かを決めて積分する。`,
          blocks: [
            { k: "p", t: String.raw`$l$ は $y=x+1$。なお $(-1,0)$ は $C$ 上の点でもある（$|1-1|=0$）。` },
            {
              k: "steps",
              items: [
                String.raw`$|x|\ge1$ のとき $x^{2}-1=x+1$ より $x^{2}-x-2=(x-2)(x+1)=0$、つまり $x=2,\,-1$。どちらも $|x|\ge1$ をみたす`,
                String.raw`$|x|\le1$ のとき $1-x^{2}=x+1$ より $x^{2}+x=x(x+1)=0$、つまり $x=0,\,-1$`,
                String.raw`合わせて交点は $x=-1,\ 0,\ 2$ の3つ`,
              ],
            },
            {
              k: "p",
              t: String.raw`交点が3つあるので、囲まれる部分は $[-1,0]$ と $[0,2]$ の**2つ**に分かれる。上下はそれぞれの区間の中では入れ替わらないので、代表点1つで判定できる。`,
            },
            {
              k: "note",
              t: String.raw`$x=-1$ は $C$ の角（$y=|x^{2}-1|$ が $V$ 字に折れる点）で、$l$ はそこを通るだけで $C$ を**またがない**。実際 $x<-1$ では差が $(x-2)(x+1)>0$、$-1<x<0$ では差が $-x(x+1)>0$ で、どちらも $C$ が上。だから $x<-1$ の側には囲まれる部分ができず、考えるのは $-1\le x\le2$ だけでよい。`,
            },
            {
              k: "p",
              t: String.raw`$x=-\dfrac12$ では $C$ が $\dfrac34$、$l$ が $\dfrac12$ で $C$ が上。$x=1$ では $C$ が $0$、$l$ が $2$ で $l$ が上。`,
            },
            {
              k: "math",
              t: String.raw`S_1=\int_{-1}^{0}\Big\{(1-x^{2})-(x+1)\Big\}dx=\int_{-1}^{0}(-x^{2}-x)\,dx=\Big[-\frac{x^{3}}{3}-\frac{x^{2}}{2}\Big]_{-1}^{0}=\frac16`,
            },
            { k: "p", t: String.raw`$[0,2]$ は $x=1$ で式が切り替わるので、さらに2つに分ける。` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\Big\{(x+1)-(1-x^{2})\Big\}dx=\int_{0}^{1}(x^{2}+x)\,dx=\frac13+\frac12=\frac56`,
            },
            {
              k: "math",
              t: String.raw`\int_{1}^{2}\Big\{(x+1)-(x^{2}-1)\Big\}dx=\int_{1}^{2}(-x^{2}+x+2)\,dx=\Big[-\frac{x^{3}}{3}+\frac{x^{2}}{2}+2x\Big]_{1}^{2}=\frac{20}{6}-\frac{13}{6}=\frac76`,
            },
            { k: "math", t: String.raw`S=S_1+\frac56+\frac76=\frac16+2=\frac{13}{6}` },
          ],
          check: String.raw`$[0,2]$ の部分だけなら $\dfrac56+\dfrac76=2$ とちょうど整数になる。$[-1,0]$ の部分は、差が $-x^{2}-x=-x(x+1)$ という $x$ 軸と2交点を持つ放物線なので、$\dfrac16(0-(-1))^{3}=\dfrac16$（$\frac16$ 公式）でも出る。`,
          alts: [
            {
              title: "$\\frac16$ 公式を使う",
              blocks: [
                {
                  k: "p",
                  t: String.raw`2次関数と直線が $\alpha<\beta$ で交わるとき、挟まれた面積は $\dfrac{|a|}{6}(\beta-\alpha)^{3}$（$a$ は2次の係数）。`,
                },
                {
                  k: "p",
                  t: String.raw`$[-1,0]$ は $a=-1$、$\beta-\alpha=1$ なので $\dfrac16$。$[0,1]$ と $[1,2]$ は放物線が途中で入れ替わるため、この公式をそのまま全体に当てることはできない。区間を切ってから使う。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`交点が3つあるので、$x=-1$ と $x=2$ だけを見て一気に積分すると $[-1,0]$ の上下が逆になり、値がずれる。`,
            String.raw`$x=1$ で $|x^{2}-1|$ の式が変わる。$[0,2]$ を一本の積分で書かない。`,
            String.raw`$(-1,0)$ は $C$ と $l$ の交点でもある。「直線が通る点」と「交点」を別物として数えない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["平面の法線ベクトル", "外積にあたる計算", "点と平面の距離", "四面体の体積"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{P}(1,-2,-1)$ を、球面上に点を多数ばらまいて $\\mathrm{OP}\\perp\\alpha$ に最も近いものを探す方法で確かめた",
          "$s=\\frac16,\\ t=-\\frac12$ を、$\\alpha$ 上で $\\mathrm{P}$ に最も近い点を数値探索して確かめた",
          "体積 $\\frac83$ を、行列式とモンテカルロ法の2通りで確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`球面 $S$ 上にあり、$\mathrm{OP}$ が平面 $\alpha$ と直交し、$y$ 座標が $-1$ 以下である点 $\mathrm{P}$ の座標を求める`,
          answer: String.raw`$\mathrm{P}(1,\,-2,\,-1)$`,
          approach: String.raw`「直線 $\mathrm{OP}$ が $\alpha$ と直交する」は「$\vec{\mathrm{OP}}$ が $\alpha$ の**法線ベクトル**と平行」と言い換えられる。法線が決まれば $\mathrm{P}$ は1つの文字で書けるので、あとは球面の式に入れるだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec{\mathrm{AB}}=(1,1,-1)$、$\vec{\mathrm{AC}}=(3,1,1)$。法線 $\vec n=(a,b,c)$ は $\vec n\cdot\vec{\mathrm{AB}}=\vec n\cdot\vec{\mathrm{AC}}=0$、つまり`,
            },
            { k: "math", t: String.raw`a+b-c=0,\qquad 3a+b+c=0` },
            {
              k: "p",
              t: String.raw`辺々足して $4a+2b=0$ より $b=-2a$。これを1本目に入れて $c=a+b=-a$。$a=1$ として $\vec n=(1,-2,-1)$。`,
            },
            { k: "p", t: String.raw`$\vec{\mathrm{OP}}=t\vec n=(t,-2t,-t)$ とおき、$S$ の式に代入する。` },
            {
              k: "math",
              t: String.raw`(t-1)^{2}+(-2t+1)^{2}+(-t+1)^{2}=6t^{2}-8t+3=1`,
            },
            { k: "math", t: String.raw`3t^{2}-4t+1=(3t-1)(t-1)=0\ \Longrightarrow\ t=\frac13,\ 1` },
            {
              k: "p",
              t: String.raw`$t=\dfrac13$ なら $y$ 座標は $-\dfrac23>-1$ で条件に合わない。$t=1$ のとき $y=-2\le-1$ で合う。`,
            },
          ],
          check: String.raw`$(1-1)^{2}+(-2+1)^{2}+(-1+1)^{2}=1$ なので $\mathrm{P}$ は確かに $S$ 上。$\vec{\mathrm{OP}}\cdot\vec{\mathrm{AB}}=1-2+1=0$、$\vec{\mathrm{OP}}\cdot\vec{\mathrm{AC}}=3-2-1=0$ で、$\alpha$ と直交している。`,
          pitfalls: [
            String.raw`$y\le-1$ という条件は、2つ出てくる候補のどちらを採るかを決めるためのもの。解が2つ出た時点で捨ててはいけない。`,
            String.raw`法線は向きと長さが自由なので、$\vec n=(-1,2,1)$ でもよい。その場合 $t$ の符号が反転するだけで $\mathrm{P}$ は同じ。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}$ から $\alpha$ に下ろした垂線の足 $\mathrm{H}$ について、$\vec{\mathrm{OH}}=\vec{\mathrm{OA}}+s\vec{\mathrm{AB}}+t\vec{\mathrm{AC}}$ をみたす $s,\ t$ を求める`,
          answer: String.raw`$s=\dfrac16,\qquad t=-\dfrac12$`,
          approach: String.raw`$\vec{\mathrm{PH}}$ も $\vec{\mathrm{OP}}$ も $\alpha$ の法線と平行だから、$\mathrm{O},\ \mathrm{P},\ \mathrm{H}$ は**同一直線上**にある。つまり $\mathrm{H}$ は「直線 $\mathrm{OP}$ と $\alpha$ の交点」として先に座標が出せる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec n=(1,-2,-1)$、$\mathrm{A}(1,1,1)$ から $\alpha$ の方程式は`,
            },
            { k: "math", t: String.raw`(x-1)-2(y-1)-(z-1)=0\ \Longleftrightarrow\ x-2y-z+2=0` },
            {
              k: "p",
              t: String.raw`$\mathrm{H}=k(1,-2,-1)$ と書けるので代入して $k+4k+k+2=0$、$k=-\dfrac13$。`,
            },
            { k: "math", t: String.raw`\mathrm{H}\left(-\frac13,\ \frac23,\ \frac13\right)` },
            {
              k: "p",
              t: String.raw`これを $\vec{\mathrm{OA}}+s\vec{\mathrm{AB}}+t\vec{\mathrm{AC}}=(1+s+3t,\ 1+s+t,\ 1-s+t)$ と見比べる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$y$ 成分 … $1+s+t=\dfrac23$ より $s+t=-\dfrac13$`,
                String.raw`$z$ 成分 … $1-s+t=\dfrac13$ より $-s+t=-\dfrac23$`,
                String.raw`辺々足して $2t=-1$、$t=-\dfrac12$。戻して $s=\dfrac16$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$x$ 成分は使っていないので検算に回せる。$1+\dfrac16-\dfrac32=\dfrac{6+1-9}{6}=-\dfrac13$ で合う。`,
            },
          ],
          check: String.raw`$\vec{\mathrm{PH}}=\mathrm{H}-\mathrm{P}=\left(-\dfrac43,\ \dfrac83,\ \dfrac43\right)=-\dfrac43(1,-2,-1)$ で、確かに法線と平行。`,
          alts: [
            {
              title: "$s,\\ t$ を直接連立する",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$\mathrm{H}$ の座標を出さず、$\vec{\mathrm{PH}}\cdot\vec{\mathrm{AB}}=0$ と $\vec{\mathrm{PH}}\cdot\vec{\mathrm{AC}}=0$ の2本から直接 $s,t$ を出してもよい。$\alpha$ の方程式を立てずに済む。`,
                },
                {
                  k: "p",
                  t: String.raw`$\vec{\mathrm{AP}}=(0,-3,-2)$ なので $\vec{\mathrm{PH}}=s\vec{\mathrm{AB}}+t\vec{\mathrm{AC}}-\vec{\mathrm{AP}}$。内積は $|\vec{\mathrm{AB}}|^{2}=3$、$|\vec{\mathrm{AC}}|^{2}=11$、$\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}}=3$、$\vec{\mathrm{AP}}\cdot\vec{\mathrm{AB}}=-1$、$\vec{\mathrm{AP}}\cdot\vec{\mathrm{AC}}=-5$。`,
                },
                { k: "math", t: String.raw`3s+3t+1=0,\qquad 3s+11t+5=0` },
                {
                  k: "p",
                  t: String.raw`辺々引いて $8t+4=0$、$t=-\dfrac12$。戻して $s=\dfrac16$ となり、同じ答えが出る。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{H}$ は $\mathrm{O},\mathrm{P}$ と同一直線上にある。これに気づかずに $\mathrm{P}$ から垂線を一般に下ろそうとすると、式が一気に重くなる。`,
            String.raw`基準点が $\mathrm{O}$ ではなく $\mathrm{A}$ であることに注意。$\vec{\mathrm{OH}}=\vec{\mathrm{OA}}+\cdots$ の形を崩さない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`四面体 $\mathrm{ABCP}$ の体積を求める`,
          answer: String.raw`$\dfrac83$`,
          approach: String.raw`底面を $\triangle\mathrm{ABC}$ にとれば、高さはちょうど (2) で出した $\mathrm{PH}$ の長さになる。(1)(2) がそのまま効く形。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$|\vec{\mathrm{AB}}|^{2}=3$、$|\vec{\mathrm{AC}}|^{2}=11$、$\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}}=3+1-1=3$ なので`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{ABC}=\frac12\sqrt{|\vec{\mathrm{AB}}|^{2}|\vec{\mathrm{AC}}|^{2}-(\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}})^{2}}=\frac12\sqrt{33-9}=\frac12\cdot2\sqrt6=\sqrt6`,
            },
            {
              k: "p",
              t: String.raw`高さは点 $\mathrm{P}(1,-2,-1)$ と平面 $x-2y-z+2=0$ の距離。`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{PH}=\frac{|1+4+1+2|}{\sqrt{1^{2}+(-2)^{2}+(-1)^{2}}}=\frac{8}{\sqrt6}`,
            },
            { k: "math", t: String.raw`V=\frac13\cdot\sqrt6\cdot\frac{8}{\sqrt6}=\frac83` },
          ],
          check: String.raw`(2) で出した $\vec{\mathrm{PH}}=-\dfrac43(1,-2,-1)$ の長さは $\dfrac43\sqrt6=\dfrac{8}{\sqrt6}$ で一致する。別ルートとして、$\vec{\mathrm{AP}}=(0,-3,-2)$ を使った $V=\dfrac16\left|\det(\vec{\mathrm{AB}},\vec{\mathrm{AC}},\vec{\mathrm{AP}})\right|=\dfrac{16}{6}=\dfrac83$ でも同じ。`,
          pitfalls: [
            String.raw`$\sqrt6$ が約分で消えるので、$\triangle\mathrm{ABC}$ と高さを別々に小数にしてから掛けると誤差が出る。分数のまま進める。`,
            String.raw`点と平面の距離の式は、平面を $ax+by+cz+d=0$ の形にそろえてから使う。$=0$ に移しておかないと符号を落とす。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "整数・無理数",
      topics: ["背理法", "√2 が無理数であること", "二項定理", "偶数・奇数で分ける"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$n\\le20$ について $(\\sqrt2+1)^{n}+(\\sqrt2-1)^{n}$ を120桁精度で計算し、整数になるのが偶数のときだけであることを確かめた",
          "漸化式 $S_n=2\\sqrt2\\,S_{n-1}-S_{n-2}$ でも同じ値が出ることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\sqrt2$ が無理数であることを示す`,
          answer: String.raw`既約分数で表せると仮定すると、分子・分母がともに偶数になって既約性に反する（背理法）`,
          approach: String.raw`「無理数である」は**ないことの証明**なので、背理法を使う。有理数と仮定したときに「これ以上約分できない」という前提そのものを壊すのが一番短い。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\sqrt2$ が有理数だと仮定する。このとき互いに素な自然数 $p,q$ を使って $\sqrt2=\dfrac{q}{p}$ と書ける。`,
            },
            { k: "math", t: String.raw`q^{2}=2p^{2}` },
            {
              k: "p",
              t: String.raw`右辺は偶数なので $q^{2}$ は偶数。$q$ が奇数なら $q^{2}$ も奇数だから、$q$ は偶数。$q=2q'$ とおくと`,
            },
            { k: "math", t: String.raw`4q'^{2}=2p^{2}\ \Longrightarrow\ p^{2}=2q'^{2}` },
            {
              k: "p",
              t: String.raw`同じ理由で $p$ も偶数。すると $p,q$ がともに $2$ で割れることになり、互いに素としたことに反する。よって $\sqrt2$ は無理数。`,
            },
          ],
          pitfalls: [
            String.raw`「$q^{2}$ が偶数 $\Rightarrow$ $q$ が偶数」は、対偶（$q$ が奇数なら $q^{2}$ は奇数）を一言添えておく。ここを飛ばすと減点されやすい。`,
            String.raw`「互いに素な $p,q$ がとれる」ことを最初に断る。有理数の定義から言えるが、書いておかないと矛盾の落としどころが曖昧になる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$n$ を自然数とするとき、$(\sqrt2+1)^{n}+(\sqrt2-1)^{n}$ が整数となるための $n$ の必要十分条件を求める`,
          answer: String.raw`$n$ が偶数であること`,
          approach: String.raw`2つを足すと、二項展開で $\sqrt2$ の**奇数乗か偶数乗のどちらか一方だけが残る**。どちらが残るかは $n$ の偶奇で決まるので、そこで切り分ければ「整数になる／ならない」が同時に言える。`,
          blocks: [
            { k: "p", t: String.raw`二項定理で両方を展開して足すと` },
            {
              k: "math",
              t: String.raw`(\sqrt2+1)^{n}+(\sqrt2-1)^{n}=\sum_{j=0}^{n}{}_n\mathrm{C}_j(\sqrt2)^{j}\Big\{1+(-1)^{\,n-j}\Big\}`,
            },
            {
              k: "p",
              t: String.raw`$\{\ \}$ の中は $n-j$ が偶数のとき $2$、奇数のとき $0$。つまり **$j$ が $n$ と同じ偶奇のときだけ**項が残る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n$ が偶数のとき … 残るのは $j$ が偶数の項だけ。$(\sqrt2)^{j}=2^{j/2}$ は整数なので、全体は整数`,
                String.raw`$n$ が奇数のとき … 残るのは $j$ が奇数の項だけ。$(\sqrt2)^{j}=2^{(j-1)/2}\sqrt2$ なので、全体は $\sqrt2$ の整数倍`,
              ],
            },
            {
              k: "p",
              t: String.raw`$n$ が奇数のときの値を $M\sqrt2$ と書くと`,
            },
            {
              k: "math",
              t: String.raw`M=2\sum_{j:\ \text{奇数}}{}_n\mathrm{C}_j\,2^{(j-1)/2}`,
            },
            {
              k: "p",
              t: String.raw`すべての項が正だから $M$ は正の整数。もし $M\sqrt2$ が整数 $N$ なら $\sqrt2=\dfrac{N}{M}$ となって (1) に反する。よって整数にならない。`,
            },
            { k: "p", t: String.raw`以上より、整数になるのは $n$ が偶数のときに限る。` },
          ],
          check: String.raw`$n=1$ で $2\sqrt2=2.828\ldots$、$n=2$ で $6$、$n=3$ で $10\sqrt2=14.142\ldots$、$n=4$ で $34$。偶数のときだけ整数になっている。`,
          alts: [
            {
              title: "漸化式で押さえる",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$a=\sqrt2+1,\ b=\sqrt2-1$ とおくと $a+b=2\sqrt2$、$ab=1$。$S_n=a^{n}+b^{n}$ は`,
                },
                { k: "math", t: String.raw`S_n=2\sqrt2\,S_{n-1}-S_{n-2}\qquad(n\ge3)` },
                {
                  k: "p",
                  t: String.raw`$S_1=2\sqrt2$、$S_2=6$ から始めると、$\sqrt2$ の係数と定数項が1つおきに入れ替わる。$n$ が偶数なら定数項だけ、奇数なら $\sqrt2$ の項だけが残ることを帰納法で示せる。`,
                },
                {
                  k: "p",
                  t: String.raw`この見方だと、偶数番目の値 $6,\ 34,\ 198,\ 1154,\ \ldots$ が $S_{2m}=6S_{2m-2}-S_{2m-4}$ をみたすこともすぐ出る。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`**必要十分条件**を聞かれている。「偶数なら整数」だけでは足りず、「奇数なら整数でない」も示す。後者で (1) を使う。`,
            String.raw`$\sqrt2$ の整数倍が整数にならないことは、(1) がないと言えない。(1) を引用する形にする。`,
            String.raw`$(\sqrt2-1)^{n}$ は $0$ に近い正の数だが、$0$ ではない。「ほぼ $0$ だから無視」とは書けない。`,
          ],
        },
      ],
    },
    sharedKakuritsu,
  ],
};
