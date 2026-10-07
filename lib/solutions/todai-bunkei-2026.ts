import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2026年度（令和8年度）一般選抜 前期日程 数学（文科）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。
 */
export const todaiBunkei2026: SolutionSet = {
  slug: "todai-bunkei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "2次関数・積分法",
      topics: ["放物線の頂点", "6分の1公式", "y切片の条件", "1文字への集約"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$d$ を細かく動かして面積を数値積分し、$S=\\frac43 d$ と一致することを確かめた",
          "両端 $d=\\sqrt3,\\ 3$ で $y$ 切片がちょうど $-2,\\ 0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`面積 $S$ のとりうる値の範囲を求める`,
          answer: String.raw`$\dfrac{4\sqrt3}{3}\le S\le 4$`,
          approach: String.raw`$\alpha,\beta,k$ の3文字あるが、頂点の条件2本で**1文字に集約できる**。$d=\dfrac{\beta-\alpha}{2}$ とおくと、$y$ 切片も面積も $d$ だけの式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y=k(x-\alpha)(\beta-x)$ は上に凸で、軸は $x=\dfrac{\alpha+\beta}{2}$。頂点が $(-3,1)$ だから`,
            },
            { k: "math", t: String.raw`\frac{\alpha+\beta}{2}=-3,\qquad k\left(\frac{\beta-\alpha}{2}\right)^{2}=1` },
            {
              k: "p",
              t: String.raw`$d=\dfrac{\beta-\alpha}{2}>0$ とおくと $\alpha=-3-d,\ \beta=-3+d$、$k=\dfrac{1}{d^{2}}$。`,
            },
            { k: "p", t: String.raw`$y$ 切片は $x=0$ を入れて` },
            {
              k: "math",
              t: String.raw`-k\alpha\beta=-\frac{(-3-d)(-3+d)}{d^{2}}=-\frac{9-d^{2}}{d^{2}}=1-\frac{9}{d^{2}}`,
            },
            { k: "p", t: String.raw`これが $-2$ 以上 $0$ 以下なので` },
            {
              k: "steps",
              items: [
                String.raw`$1-\dfrac{9}{d^{2}}\ge-2\ \Longleftrightarrow\ d^{2}\ge3\ \Longleftrightarrow\ d\ge\sqrt3$`,
                String.raw`$1-\dfrac{9}{d^{2}}\le0\ \Longleftrightarrow\ d^{2}\le9\ \Longleftrightarrow\ d\le3$`,
              ],
            },
            { k: "p", t: String.raw`よって $\sqrt3\le d\le3$。面積は6分の1公式から` },
            {
              k: "math",
              t: String.raw`S=\int_{\alpha}^{\beta}k(x-\alpha)(\beta-x)\,dx=\frac{k(\beta-\alpha)^{3}}{6}=\frac{1}{d^{2}}\cdot\frac{(2d)^{3}}{6}=\frac{4}{3}d`,
            },
            {
              k: "p",
              t: String.raw`$S=\dfrac43 d$ は $d$ の増加関数だから、$\sqrt3\le d\le3$ より $\dfrac{4\sqrt3}{3}\le S\le4$。`,
            },
          ],
          check: String.raw`$d=3$ のとき $k=\dfrac19,\ \alpha=-6,\ \beta=0$ で、$C$ は原点を通る（$y$ 切片 $0$）。このとき $S=4$。$d=\sqrt3$ のとき $k=\dfrac13$ で $y$ 切片は $-2$、$S=\dfrac{4\sqrt3}{3}=2.309\ldots$。どちらも端点がちょうど条件を満たす。`,
          pitfalls: [
            String.raw`$y$ 切片は $k\cdot(0-\alpha)(\beta-0)=-k\alpha\beta$。符号を取り違えやすいので、$\alpha<0<\ldots$ の位置関係に頼らず式で出す。`,
            String.raw`6分の1公式は $\displaystyle\int_\alpha^\beta(x-\alpha)(\beta-x)dx=\frac{(\beta-\alpha)^{3}}{6}$。$(x-\alpha)(x-\beta)$ の形との符号の違いに注意。`,
            String.raw`$d$ の範囲の端点が両方とも取れるので、答えは閉区間になる。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "確率・場合の数",
      topics: ["余事象", "一直線上に並ぶ3点", "等差数列", "偶奇で数える"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1,\\dots,9$ について $3n$ 個の格子点から3点を選ぶ全組合せを列挙し、三角形になる確率を数え上げて式と一致することを確かめた",
          "(2) の式に $m=1$ を入れた値が、全探索の $p_2$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p_5$ を求める`,
          answer: String.raw`$p_5=\dfrac{412}{455}$`,
          approach: String.raw`三角形にならない＝**一直線上に並ぶ**。余事象で数える。列が3本しかないので、縦・横・斜めの3通りしか起こらず、斜めは「等差数列」になる場合だけ。`,
          blocks: [
            { k: "p", t: String.raw`$3n$ 個の点から3点を選ぶ総数は $ {}_{3n}\mathrm{C}_3$。一直線上に並ぶ組を数える。` },
            {
              k: "steps",
              items: [
                String.raw`**縦**（$x$ が同じ）… 各列に $n$ 個なので $3{}_n\mathrm{C}_3$ 通り`,
                String.raw`**それ以外** … 列が3本しかないので、縦でない直線は各列から1点ずつ。$(1,a),(2,b),(3,c)$ が一直線上 $\iff 2b=a+c$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$2b=a+c$ は「$a,b,c$ がこの順に等差数列」。$a,c$ を決めれば $b=\dfrac{a+c}{2}$ が決まり、$1\le a,c\le n$ なら $b$ も自動的に範囲に入る。だから**$a\equiv c\pmod 2$ をみたす $(a,c)$ の個数**を数えればよい（$a=c$ のときが横一直線）。`,
            },
            {
              k: "p",
              t: String.raw`$n=5$ なら、奇数は $1,3,5$ の3個、偶数は $2,4$ の2個なので $3^{2}+2^{2}=13$ 通り。縦は $3{}_5\mathrm{C}_3=30$ 通り。合わせて $43$ 通り。`,
            },
            { k: "math", t: String.raw`p_5=1-\frac{43}{{}_{15}\mathrm{C}_3}=1-\frac{43}{455}=\frac{412}{455}` },
          ],
          pitfalls: [
            String.raw`横一直線（$a=b=c$）は「各列から1点ずつ」に含まれている。縦と別に足すと二重に数える。`,
            String.raw`列が3本しかないことが効いている。縦でない直線には、1つの列から2点以上は乗らない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$m\ge2$ のとき $p_{2m}$ を求める`,
          answer: String.raw`$p_{2m}=\dfrac{m(16m-7)}{(6m-1)(3m-1)}$`,
          approach: String.raw`(1) と数え方は同じ。$n=2m$ は**偶数**なので、$1$ から $n$ までに奇数も偶数もちょうど $m$ 個ずつあり、$a\equiv c$ の個数が $m^{2}+m^{2}$ ときれいに出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n=2m$ では奇数・偶数がそれぞれ $m$ 個なので、$a\equiv c\pmod2$ をみたす $(a,c)$ は $m^{2}+m^{2}=2m^{2}$ 通り。縦は`,
            },
            {
              k: "math",
              t: String.raw`3{}_{2m}\mathrm{C}_3=\frac{(2m)(2m-1)(2m-2)}{2}=2m(2m-1)(m-1)`,
            },
            { k: "p", t: String.raw`一直線上に並ぶ組は合わせて` },
            {
              k: "math",
              t: String.raw`2m(2m-1)(m-1)+2m^{2}=2m\big\{(2m-1)(m-1)+m\big\}=2m(2m^{2}-2m+1)`,
            },
            { k: "p", t: String.raw`総数は $ {}_{6m}\mathrm{C}_3=2m(6m-1)(3m-1)$ だから` },
            {
              k: "math",
              t: String.raw`p_{2m}=1-\frac{2m^{2}-2m+1}{(6m-1)(3m-1)}=\frac{18m^{2}-9m+1-(2m^{2}-2m+1)}{(6m-1)(3m-1)}=\frac{m(16m-7)}{(6m-1)(3m-1)}`,
            },
          ],
          check: String.raw`$m=2$（$n=4$）とすると $\dfrac{2\cdot25}{11\cdot5}=\dfrac{10}{11}$。実際、$12$ 点から3点を選ぶ $220$ 通りのうち、縦 $3{}_4\mathrm{C}_3=12$ 通り、$a\equiv c$ が $2\cdot2^{2}=8$ 通りで、$1-\dfrac{20}{220}=\dfrac{10}{11}$ と合う。`,
          pitfalls: [
            String.raw`$ {}_{6m}\mathrm{C}_3$ を展開するとき $\dfrac{6m(6m-1)(6m-2)}{6}=2m(6m-1)(3m-1)$。$6m-2=2(3m-1)$ を使うと約分が通る。`,
            String.raw`$n$ が奇数のときは奇数・偶数の個数が $1$ 個ずれるので、$(2)$ の式はそのままでは使えない。$(1)$ で $n=5$ を別に数えたのはこのため。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "関数・方程式",
      topics: ["折れ線（周期関数）", "平方完成", "相加相乗平均", "共有点の個数の場合分け"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) を $a$ と $x$ の細かい格子で数値的に確かめ、$x\\ge4$ で $f>g$ が崩れないことを見た",
          "(2) の共有点の個数を $a$ を細かく動かして数値的に数え、$a=4-2\\sqrt3$ の前後で $2$ 個／$3$ 個／$4$ 個に変わることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x\ge4$ で $f(x)>g(x)$ を示す`,
          answer: String.raw`$4\le x<5$ では $f(x)-g(x)=\dfrac{a}{8}\Big(x-1-\dfrac4a\Big)^{2}>0$、$x\ge5$ では $f(x)\ge f(5)>1\ge g(x)$`,
          approach: String.raw`$g$ の値は $0$ 以上 $1$ 以下。$x\ge5$ では「$f$ が $1$ を超える」で済むが、$x=4$ の近くは $f$ がまだ小さいので粗すぎる。そこは $g$ の式を入れて**平方完成**する。判別式がちょうど $0$ になるのがこの問題の仕掛け。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$x\ge5$ のとき。** $f$ は $x\ge1$ で増加だから $f(x)\ge f(5)=2a+\dfrac2a-3$。相加相乗平均より $2a+\dfrac2a\ge4$ で、等号は $a=1$ のときだけ。$0<a<1$ だから $f(5)>1$。一方 $g(x)\le1$ なので $f(x)>g(x)$。`,
            },
            {
              k: "p",
              t: String.raw`**$4\le x<5$ のとき。** $4=2\cdot2$ なので $g(x)=x-4$。$u=x-1\in[3,4)$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`f(x)-g(x)=\frac{a}{8}u^{2}-u+\frac2a=\frac{a}{8}\left(u-\frac4a\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`（判別式が $1-4\cdot\dfrac{a}{8}\cdot\dfrac2a=0$ なので、完全平方になる。）$0<a<1$ より $\dfrac4a>4>u$ だから $u\ne\dfrac4a$ で、この値は正。`,
            },
            { k: "p", t: String.raw`以上より $x\ge4$ でつねに $f(x)>g(x)$。` },
          ],
          pitfalls: [
            String.raw`$g(x)\le1$ だけで押し切ろうとすると、$x=4$ の近くで $f$ が $1$ を下回る場合（$a$ が $1$ に近いとき）に失敗する。区間を分ける必要がある。`,
            String.raw`$2a+\dfrac2a\ge4$ の等号は $a=1$。$0<a<1$ で $a=1$ が除かれているから**狭義の不等号**になる、と書いておく。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\dfrac12<a<\dfrac23$ のとき、$x\ge0$ での共有点の個数を求める`,
          answer: String.raw`$\dfrac12<a<4-2\sqrt3$ のとき **2個**、$a=4-2\sqrt3$ のとき **3個**、$4-2\sqrt3<a<\dfrac23$ のとき **4個**`,
          approach: String.raw`(1) より $x\ge4$ には共有点がないので、調べるのは $0\le x<4$ だけ。$g$ の折れ目 $x=1,2,3$ で区切り、各区間で $f-g$ が**単調**であることを使って、端の符号だけ見る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k=\dfrac{a}{8},\ c=f(1)=\dfrac2a-3$ とおく。$\dfrac12<a<\dfrac23$ より $0<c<1$、$\dfrac1{16}<k<\dfrac1{12}$。$f(x)=k(x-1)^{2}+c$。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\le x<1$（$g=x$）… $f-g$ の微分は $2k(x-1)-1<0$ で減少。端は $f(0)-0=k+c>0$ と $c-1<0$ なので**1個**`,
                String.raw`$1\le x<2$（$g=-x+2$）… 微分は $2k(x-1)+1>0$ で増加。端は $c-1<0$ と $k+c>0$ なので**1個**`,
                String.raw`$2\le x<3$（$g=x-2$）… 微分は $2k(x-1)-1<0$ で減少。端は $k+c>0$ と $f(3)-1$`,
                String.raw`$3\le x<4$（$g=-x+4$）… 微分は $2k(x-1)+1>0$ で増加。端は $f(3)-1$ と $9k+c>0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`後ろの2区間は、どちらも $f(3)-1$ の符号で決まる。`,
            },
            {
              k: "math",
              t: String.raw`f(3)-1=\frac{a}{2}+\frac2a-4,\qquad \frac{a}{2}+\frac2a-4=0\iff a^{2}-8a+4=0\iff a=4-2\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`$4-2\sqrt3=0.5358\ldots$ は $\left(\dfrac12,\dfrac23\right)$ の中にある。$\dfrac{a}{2}+\dfrac2a$ はこの範囲で減少するので`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\dfrac12<a<4-2\sqrt3$ … $f(3)>1$。後ろの2区間とも共有点なしで、合計 **2個**`,
                String.raw`$a=4-2\sqrt3$ … $f(3)=1$ でちょうど $x=3$ が共有点。合計 **3個**`,
                String.raw`$4-2\sqrt3<a<\dfrac23$ … $f(3)<1$。後ろの2区間に1個ずつで、合計 **4個**`,
              ],
            },
          ],
          check: String.raw`$a=0.6$（$>4-2\sqrt3$）では $f(3)=0.633<1$ で、4区間すべてに1個ずつ入り4個。$a=0.52$（$<4-2\sqrt3$）では $f(3)=1.106>1$ で、$2\le x<4$ では $f-g$ が正のままとなり2個。数値で数えても同じ。`,
          pitfalls: [
            String.raw`$x=3$ は $g$ の山の頂点で、$g(3)=1$。左右の区間の端の値が**同じ $f(3)-1$ になる**ので、1つの符号判定で2区間ぶん片づく。`,
            String.raw`$4-2\sqrt3$ が与えられた範囲の内側に入ることを確かめてから場合分けする。外にあれば場合分けは要らない。`,
            String.raw`$a=4-2\sqrt3$ のときの3個を落としやすい。等号の場合を独立に書く。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "微分法・図形と方程式",
      topics: ["3次曲線の接線", "正接の加法定理", "60°で交わる3直線", "3直線が作る三角形の面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(2) の範囲を、$k$ を細かく動かして「3本の接線のなす角がすべて $60°$」になる $P,Q$ の存在を数値的に確かめた",
          "(3) の $k=\\frac{5\\sqrt3}{12}$ で、4通りの符号の組から出る面積がちょうど2値になり、比が $4$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\tan\left(\theta+\dfrac{\pi}{3}\right)$ を $\tan\theta$ で表す`,
          answer: String.raw`$\tan\left(\theta+\dfrac{\pi}{3}\right)=\dfrac{\tan\theta+\sqrt3}{1-\sqrt3\tan\theta}$`,
          approach: String.raw`正接の加法定理に $\tan\dfrac{\pi}{3}=\sqrt3$ を入れるだけ。範囲 $-\dfrac{\pi}{2}<\theta<\dfrac{\pi}{6}$ は、分母が $0$ にならないこと（$\theta\ne\dfrac{\pi}{6}$）を保証している。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\tan\left(\theta+\frac{\pi}{3}\right)=\frac{\tan\theta+\tan\frac{\pi}{3}}{1-\tan\theta\tan\frac{\pi}{3}}=\frac{\tan\theta+\sqrt3}{1-\sqrt3\tan\theta}`,
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`条件をみたす $\mathrm{P},\mathrm{Q}$ が存在する $k$ の範囲を求める`,
          answer: String.raw`$k>\dfrac{\sqrt3}{3}$`,
          approach: String.raw`$y=x^{3}-kx$ の $x=s$ における接線は $y=(3s^{2}-k)x-2s^{3}$。3本が**どの2本も $60°$** で交わるとは、傾きの角が $\theta,\ \theta+\dfrac{\pi}{3},\ \theta+\dfrac{2\pi}{3}$ と並ぶこと。原点での傾きを $\tan\theta$ とおけば、残り2本の傾きが決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`接線は $y=(3s^{2}-k)x-2s^{3}$。原点（$s=0$）での傾きは $-k$ なので、$t=\tan\theta=-k$ とおく。$\mathrm{P},\mathrm{Q}$ の接線の傾きはそれぞれ $\tan\left(\theta+\dfrac{\pi}{3}\right),\ \tan\left(\theta+\dfrac{2\pi}{3}\right)$ でなければならない。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ の $x$ 座標を $p$ とすると $3p^{2}-k=\tan\left(\theta+\dfrac{\pi}{3}\right)$、つまり $3p^{2}=\tan\left(\theta+\dfrac{\pi}{3}\right)-t$。$p\ne0$ が要るので、これが**正**であることが条件。(1) を使って`,
            },
            {
              k: "math",
              t: String.raw`\tan\left(\theta+\frac{\pi}{3}\right)-t=\frac{t+\sqrt3}{1-\sqrt3t}-t=\frac{\sqrt3(1+t^{2})}{1-\sqrt3t}`,
            },
            { k: "p", t: String.raw`同じように $\tan\dfrac{2\pi}{3}=-\sqrt3$ を使って` },
            {
              k: "math",
              t: String.raw`\tan\left(\theta+\frac{2\pi}{3}\right)-t=\frac{t-\sqrt3}{1+\sqrt3t}-t=\frac{-\sqrt3(1+t^{2})}{1+\sqrt3t}`,
            },
            {
              k: "p",
              t: String.raw`$\sqrt3(1+t^{2})>0$ だから、2つとも正になる条件は $1-\sqrt3t>0$ かつ $1+\sqrt3t<0$、すなわち $t<-\dfrac{1}{\sqrt3}$。$t=-k$ より`,
            },
            { k: "math", t: String.raw`k>\frac{1}{\sqrt3}=\frac{\sqrt3}{3}` },
            {
              k: "note",
              t: String.raw`傾きの角が $60°$ ずつ違うので、3本の傾きはつねに相異なり、平行になることはない。どの2本も交わるという条件は自動的に満たされる。`,
            },
          ],
          pitfalls: [
            String.raw`$3p^{2}>0$（$p\ne0$）が条件の本体。$\mathrm{P}$ が原点と異なることが、この不等式になって効く。`,
            String.raw`$\tan\left(\theta+\frac{2\pi}{3}\right)$ は (1) の $\frac{\pi}{3}$ を $-\sqrt3$ に替えるだけ。別に加法定理を立て直さない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$M=4m$ となる $k$ の値を求める`,
          answer: String.raw`$k=\dfrac{5\sqrt3}{12}$`,
          approach: String.raw`$k$ を決めると3本の**傾きは完全に決まる**。動けるのは $p,q$ の**符号**だけで、面積は2通りの値しか取らない。その比が $4$ になる条件を書く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3本の接線 $y=m_ix+c_i$ が作る三角形の面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\frac12\cdot\frac{\big(c_1(m_2-m_3)+c_2(m_3-m_1)+c_3(m_1-m_2)\big)^{2}}{\big|(m_1-m_2)(m_2-m_3)(m_3-m_1)\big|}`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{O},\mathrm{P},\mathrm{Q}$ の接線は $(m,c)=(-k,0),\ (3p^{2}-k,\,-2p^{3}),\ (3q^{2}-k,\,-2q^{3})$。代入して整理すると`,
            },
            { k: "math", t: String.raw`S=\frac23\cdot\frac{p^{2}q^{2}\,|p-q|}{|p+q|}` },
            {
              k: "p",
              t: String.raw`$p^{2},q^{2}$ は (2) で決まった値に固定され、動けるのは符号だけ。$p_0,q_0>0$ を $|p|=p_0,\ |q|=q_0$ とすると、$\dfrac{|p-q|}{|p+q|}$ は`,
            },
            {
              k: "steps",
              items: [
                String.raw`同符号のとき … $r=\dfrac{|p_0-q_0|}{p_0+q_0}\ (<1)$`,
                String.raw`異符号のとき … $\dfrac{1}{r}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$p_0\ne q_0$ なので $r\ne1$。よって $\dfrac{M}{m}=\dfrac{1}{r^{2}}$ で、$M=4m$ は $r=\dfrac12$ と同じこと。$q_0>p_0$ として $\dfrac{q_0-p_0}{q_0+p_0}=\dfrac12$ から $q_0=3p_0$、つまり $\dfrac{q_0^{2}}{p_0^{2}}=9$。`,
            },
            { k: "p", t: String.raw`(2) の計算から（$t=-k$ を入れて）` },
            {
              k: "math",
              t: String.raw`3p_0^{2}=\frac{\sqrt3(1+k^{2})}{1+\sqrt3k},\qquad 3q_0^{2}=\frac{\sqrt3(1+k^{2})}{\sqrt3k-1}`,
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`\frac{q_0^{2}}{p_0^{2}}=\frac{1+\sqrt3k}{\sqrt3k-1}=9\ \Longleftrightarrow\ 8\sqrt3k=10\ \Longleftrightarrow\ k=\frac{5}{4\sqrt3}=\frac{5\sqrt3}{12}`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{5\sqrt3}{12}>\dfrac{4\sqrt3}{12}=\dfrac{\sqrt3}{3}$ なので (2) の範囲に入っている。$p_0>q_0$ の場合は $k<0$ となり範囲外。`,
            },
            {
              k: "note",
              t: String.raw`3本が1点で交わるのは $S=0$ の場合だが、$S=0$ になるのは分子が $0$、すなわち $p=q$ のときだけである。$p^{2}\ne q^{2}$ だからこれは起こらず、三角形がつぶれる心配はない。`,
            },
          ],
          check: String.raw`$k=\dfrac{5\sqrt3}{12}$ では $\sqrt3k=\dfrac54$ なので $\dfrac{q_0^{2}}{p_0^{2}}=\dfrac{1+5/4}{5/4-1}=\dfrac{9/4}{1/4}=9$。確かに $q_0=3p_0$ で $r=\dfrac{3-1}{3+1}=\dfrac12$、$\dfrac{M}{m}=4$。`,
          pitfalls: [
            String.raw`$p,q$ の符号を変えても $p^{2},q^{2}$ は変わらないので、**接線の傾きは変わらず切片だけ変わる**。面積が2通りしかないのはこのため。`,
            String.raw`$\dfrac{M}{m}=\dfrac1{r^{2}}$ であって $\dfrac1r$ ではない。$M$ と $m$ の両方が $r$ を含むことに注意。`,
          ],
        },
      ],
    },
  ],
};
