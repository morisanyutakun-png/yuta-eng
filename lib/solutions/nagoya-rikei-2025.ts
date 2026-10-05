import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2025年度（令和7年度）一般選抜 前期日程 数学（理科系）。
 *
 * 手元にある実物の入試問題冊子のスキャンにあたって、大問・小問の番号まで照合したうえで、
 * 4問とも自分で解き直した。他社の解答解説は見ていない。
 * 問題文・図・表は1つも載せていない。名古屋大学はこの年度の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */
export const nagoyaRikei2025: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法",
      topics: ["凸関数", "導関数の単調性", "中間値の定理", "ルジャンドル変換"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(3) の $x_0,\\ g(x_0)$ を $c=0,\\ 0.5,\\ -0.8$ で数値的に求め、式と一致することを確かめた",
          "(3) の $g(x_0)$ が $c=0$ で $0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$g(x)=cx-f(x)$ を最大にする $x_0$ がただ1つ存在することを示す`,
          answer: String.raw`$f'$ が狭義単調増加で、値域がちょうど開区間 $(a,b)$ になることから従う`,
          approach: String.raw`$g'(x)=c-f'(x)$ なので、**$f'(x)=c$ の解がただ1つ**であることを言えばよい。$f''>0$ から $f'$ は狭義単調増加、両端の極限が $a,b$ なので、$f'$ の値域はちょうど $(a,b)$ になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f''(x)>0$ がすべての $x$ で成り立つから、$f'$ は $\mathbb{R}$ 上で狭義単調増加。狭義単調増加で連続な関数の値域は、両端の極限で決まる開区間なので`,
            },
            { k: "math", t: String.raw`f'(\mathbb{R})=\left(\lim_{x\to-\infty}f'(x),\ \lim_{x\to\infty}f'(x)\right)=(a,b)` },
            {
              k: "p",
              t: String.raw`$a<c<b$ だから、$f'(x_0)=c$ をみたす $x_0$ が存在し（中間値の定理）、$f'$ が狭義単調増加だからただ1つに定まる。`,
            },
            { k: "p", t: String.raw`この $x_0$ の前後で $g'(x)=c-f'(x)$ の符号を見る。` },
            {
              k: "steps",
              items: [
                String.raw`$x<x_0$ では $f'(x)<f'(x_0)=c$ なので $g'(x)>0$`,
                String.raw`$x>x_0$ では $f'(x)>c$ なので $g'(x)<0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $g$ は $x_0$ まで狭義増加、そこから狭義減少。$g$ は $x=x_0$ でただ1つの最大値をとる。`,
            },
            {
              k: "note",
              title: "値域が「ちょうど」$(a,b)$ であること",
              t: String.raw`狭義単調増加だから $f'(x)<\lim_{t\to\infty}f'(t)=b$ で、値 $b$ は取らない。$a$ も同様。だから $c=a$ や $c=b$ は除かれていて、問題が $a<c<b$ と切っているのはこのため。`,
            },
          ],
          pitfalls: [
            String.raw`「$f'$ は単調増加だから $f'(x)=c$ の解は高々1つ」だけでは足りない。**存在**も言う必要があり、そこで極限の条件と中間値の定理を使う。`,
            String.raw`$g''=-f''<0$ から「上に凸だから最大値をもつ」と書くだけでは、最大値をとる点の存在が示せていない。$\mathbb{R}$ 全体では上に凸でも最大値を持たない関数がある（$g(x)=-e^{x}$ など）。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$f(x)=\log\dfrac{e^{x}+e^{-x}}{2}$ が $f''>0$ をみたすことを示し、$a,\ b$ を求める`,
          answer: String.raw`$f''(x)=\dfrac{4}{(e^{x}+e^{-x})^{2}}>0$、$a=-1,\ b=1$`,
          approach: String.raw`$f'$ を通分した形のまま微分する。分子が $(A+B)^2-(A-B)^2=4AB$ の形になり、$A=e^{x},\ B=e^{-x}$ で $AB=1$ だから、きれいに $4$ になる。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=\frac{e^{x}-e^{-x}}{e^{x}+e^{-x}}` },
            { k: "p", t: String.raw`商の微分で` },
            {
              k: "math",
              t: String.raw`f''(x)=\frac{(e^{x}+e^{-x})^{2}-(e^{x}-e^{-x})^{2}}{(e^{x}+e^{-x})^{2}}=\frac{4e^{x}e^{-x}}{(e^{x}+e^{-x})^{2}}=\frac{4}{(e^{x}+e^{-x})^{2}}>0`,
            },
            { k: "p", t: String.raw`極限は、分母・分子を $e^{-x}$ または $e^{x}$ で割って求める。` },
            {
              k: "math",
              t: String.raw`f'(x)=\frac{e^{2x}-1}{e^{2x}+1}\ \xrightarrow[x\to-\infty]{}\ \frac{0-1}{0+1}=-1,\qquad f'(x)=\frac{1-e^{-2x}}{1+e^{-2x}}\ \xrightarrow[x\to\infty]{}\ 1`,
            },
            { k: "p", t: String.raw`よって $a=-1,\ b=1$。` },
          ],
          check: String.raw`$f'(0)=0$、$f''(0)=\dfrac{4}{4}=1$。また $|f'(x)|<1$ がすべての $x$ で成り立ち、(1) の「値域がちょうど $(-1,1)$」と合う。`,
          pitfalls: [
            String.raw`$f''$ を求めるのに $f'$ を部分分数などに直す必要はない。通分したまま商の微分をすると、分子が $4e^{x}e^{-x}=4$ になって一息で終わる。`,
            String.raw`極限は「$e^{x}\to0$ だから」と言葉で済ませず、分母・分子を割って形を作ってから取る。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`(2) の $f$ について、$x_0$ と $g(x_0)$ を $c$ で表す`,
          answer: String.raw`$x_0=\dfrac12\log\dfrac{1+c}{1-c},\qquad g(x_0)=\dfrac12\Big\{(1+c)\log(1+c)+(1-c)\log(1-c)\Big\}$`,
          approach: String.raw`$x_0$ は $f'(x_0)=c$ から出る。$g(x_0)=cx_0-f(x_0)$ の $f(x_0)$ は、$e^{x_0}+e^{-x_0}$ を**通分して1つの分数にまとめる**と $\sqrt{1-c^{2}}$ が出てきて、対数が開ける。`,
          blocks: [
            { k: "p", t: String.raw`$f'(x_0)=c$ すなわち $\dfrac{e^{2x_0}-1}{e^{2x_0}+1}=c$ を $e^{2x_0}$ について解くと` },
            { k: "math", t: String.raw`e^{2x_0}=\frac{1+c}{1-c}\quad\Longrightarrow\quad x_0=\frac12\log\frac{1+c}{1-c}` },
            { k: "p", t: String.raw`（$-1<c<1$ なので $\dfrac{1+c}{1-c}>0$ で、対数が取れる。）次に $e^{x_0}=\sqrt{\dfrac{1+c}{1-c}}$ より` },
            {
              k: "math",
              t: String.raw`e^{x_0}+e^{-x_0}=\sqrt{\frac{1+c}{1-c}}+\sqrt{\frac{1-c}{1+c}}=\frac{(1+c)+(1-c)}{\sqrt{(1-c)(1+c)}}=\frac{2}{\sqrt{1-c^{2}}}`,
            },
            { k: "p", t: String.raw`したがって $f(x_0)=\log\dfrac{1}{\sqrt{1-c^{2}}}=-\dfrac12\log(1-c^{2})$ となり` },
            {
              k: "math",
              t: String.raw`g(x_0)=cx_0-f(x_0)=\frac{c}{2}\log\frac{1+c}{1-c}+\frac12\log\big\{(1+c)(1-c)\big\}`,
            },
            { k: "p", t: String.raw`$\log$ を開いて $\log(1+c)$ と $\log(1-c)$ でまとめ直すと` },
            {
              k: "math",
              t: String.raw`g(x_0)=\frac12\Big\{(1+c)\log(1+c)+(1-c)\log(1-c)\Big\}`,
            },
          ],
          check: String.raw`$c=0$ とすると $x_0=0$、$g(x_0)=\dfrac12(1\cdot0+1\cdot0)=0$。実際 $g(0)=0-f(0)=-\log1=0$ で合う。$c=\dfrac12$ では $x_0=\dfrac12\log3=0.5493\ldots$、$g(x_0)=0.13081\ldots$ となり、$cx_0-\log\cosh x_0$ を直接計算した値と一致する。`,
          pitfalls: [
            String.raw`$e^{x_0}+e^{-x_0}$ を2つの根号のまま残さず、通分して1つにまとめる。ここを通ると $\log$ が開けて、最後の対称な形まで届く。`,
            String.raw`最後の形は $c\leftrightarrow-c$ で対称。$g(x_0)$ は $c$ の偶関数になるはずなので、対称でなければどこかで符号を落としている。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["平方差の因数分解", "偶奇の一致", "素数のべきの約数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) $c=24,25,26$ について $a\\le 200$ を全探索し、書き出した組と一致することを確かめた",
          "(2) $p=3,5,7$、$n=1,2$ について全探索し、$n+1$ 組の式と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$c=24,\ 25,\ 26$ について、条件をみたす整数の組 $(a,b)$ をすべて求める`,
          answer: String.raw`$c=24$：$(7,5),(5,1)$／$c=25$：$(13,12),(5,0)$／$c=26$：**なし**`,
          approach: String.raw`$a^{2}-b^{2}=(a-b)(a+b)$ と因数分解し、$u=a-b,\ v=a+b$ と置き換える。$a=\dfrac{u+v}{2},\ b=\dfrac{v-u}{2}$ が整数になる条件が「**$u,v$ の偶奇が一致**」で、これが決め手になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$a\ge b\ge0$ より $u=a-b\ge0$、$v=a+b\ge0$ で、さらに $v-u=2b\ge0$ から $u\le v$。$uv=c$ で、$u,v$ の偶奇が一致するものだけが整数の組を与える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$c=24$：$(u,v)=(1,24),(2,12),(3,8),(4,6)$ のうち偶奇が一致するのは $(2,12),(4,6)$。それぞれ $(a,b)=(7,5),(5,1)$`,
                String.raw`$c=25$：$(1,25),(5,5)$ はどちらも奇数どうし。$(a,b)=(13,12),(5,0)$`,
                String.raw`$c=26$：$(1,26),(2,13)$ はどちらも偶奇が食い違う。解なし`,
              ],
            },
            {
              k: "note",
              title: "$c=26$ に解がない理由は $4$ で割った余り",
              t: String.raw`$u,v$ の偶奇が一致するなら $uv$ は奇数か $4$ の倍数。$26=4\cdot6+2$ はどちらでもないので、因数分解を調べるまでもなく解がない。$c\equiv2\pmod4$ のときはいつもそうなる。`,
            },
          ],
          check: String.raw`$7^{2}-5^{2}=24$、$5^{2}-1^{2}=24$、$13^{2}-12^{2}=25$、$5^{2}-0^{2}=25$。いずれも $a\ge b\ge0$ をみたす。`,
          pitfalls: [
            String.raw`$b=0$ を忘れない。条件は $b\ge0$ であって $b\ge1$ ではないので、$c=25$ の $(5,0)$ は落とせない。`,
            String.raw`$u\le v$ を付けないと、$(u,v)$ と $(v,u)$ を二重に数えたり、$b<0$ の組を拾ったりする。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$p$ を $3$ 以上の素数、$n$ を正の整数、$c=4p^{2n}$ とするとき、条件をみたす $(a,b)$ をすべて求める`,
          answer: String.raw`$(a,b)=\big(p^{\,i}+p^{\,2n-i},\ p^{\,2n-i}-p^{\,i}\big)\quad(i=0,1,\dots,n)$ の $n+1$ 組`,
          approach: String.raw`(1) と同じ置き換えを使う。$c$ が偶数なので $u,v$ は**ともに偶数**しかありえず、$u=2s,\ v=2t$ と書くと $st=p^{2n}$ に化ける。あとは $p$ のべきの約数を数えるだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$uv=4p^{2n}$ は偶数なので、偶奇が一致するなら $u,v$ はともに偶数。$u=2s,\ v=2t$（$0\le s\le t$）とおくと $4st=4p^{2n}$ より $st=p^{2n}$。このとき`,
            },
            { k: "math", t: String.raw`a=\frac{u+v}{2}=s+t,\qquad b=\frac{v-u}{2}=t-s` },
            {
              k: "p",
              t: String.raw`$p$ は素数だから $p^{2n}$ の正の約数は $p^{0},p^{1},\dots,p^{2n}$ のみ。$s=p^{\,i},\ t=p^{\,j}$ とおくと $i+j=2n$ で、$s\le t$ より $i\le j$、すなわち $i\le n$。`,
            },
            {
              k: "math",
              t: String.raw`(a,b)=\big(p^{\,i}+p^{\,2n-i},\ p^{\,2n-i}-p^{\,i}\big)\qquad(i=0,1,\dots,n)`,
            },
            {
              k: "p",
              t: String.raw`$i$ の取りうる値は $0$ から $n$ までの $n+1$ 通りで、どれも相異なる組を与える。`,
            },
            {
              k: "note",
              title: "$p\\ge3$ がどこで効くか",
              t: String.raw`$p$ が奇数なので $s,t$ はともに奇数で、$u=2s,\ v=2t$ の偶奇はつねに一致する。$p=2$ だと $c=4\cdot2^{2n}=2^{2n+2}$ となり、$u,v$ がともに偶数という条件のほかに「$4$ の倍数かどうか」の場合分けが要る。問題が $3$ 以上に限っているのはこのため。`,
            },
          ],
          check: String.raw`$p=3,\ n=1$ なら $c=36$。式からは $i=0$ で $(10,8)$、$i=1$ で $(6,0)$ の $2=n+1$ 組。実際 $10^{2}-8^{2}=36$、$6^{2}-0^{2}=36$ で、ほかに $a\ge b\ge0$ の組はない。`,
          pitfalls: [
            String.raw`$i\le n$ の上限を落とすと、$i$ と $2n-i$ を入れ替えた同じ組を二重に数えてしまう。$b\ge0$ がこの上限そのもの。`,
            String.raw`$i=n$ のときは $b=p^{n}-p^{n}=0$。これも $b\ge0$ をみたすので数に入れる。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "積分法・図形",
      topics: ["通過領域", "点と曲線の距離", "扇形と円環", "パップス・ギュルダンの定理"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) の面積をモンテカルロ法で $r=0.3,0.7,1.0$、$\\alpha=0,\\ \\pi/3,\\ 2\\pi/3$ について推定し、式と一致することを確かめた",
          "(2) の体積も同様にモンテカルロ法で確かめた",
          "$\\alpha=0$ で (1) が $\\pi r^{2}$、(2) が $\\frac43\\pi R^{3}$ に戻ることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円板を原点のまわりに角 $\alpha$ だけ回したとき、通過する領域の面積を求める`,
          answer: String.raw`$2r\alpha+\pi r^{2}$`,
          approach: String.raw`通過領域を「円板の集まり」と見ずに、**中心が描く弧からの距離が $r$ 以下の点の集合**と読み替える。すると図形が「円環の扇形＋両端の半円」に分かれ、積分なしで面積が出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中心は、原点を中心とする半径 $1$ の円周上を、偏角 $0$ から $\alpha$ まで動く。この弧を $A$ とおくと、通過領域は $\{\mathrm{P}:\ \operatorname{dist}(\mathrm{P},A)\le r\}$ に一致する。`,
            },
            { k: "p", t: String.raw`点 $\mathrm{P}$ の偏角で場合が分かれる。` },
            {
              k: "steps",
              items: [
                String.raw`偏角が $0$ と $\alpha$ の間 … 最も近い弧の点は同じ偏角の点なので、条件は $\big||\mathrm{OP}|-1\big|\le r$。つまり半径 $1-r$ から $1+r$ までの**円環の、中心角 $\alpha$ の扇形**`,
                String.raw`偏角がその外 … 最も近いのは弧の端点。つまり両端に付く**半径 $r$ の半円**が2つ`,
              ],
            },
            { k: "p", t: String.raw`円環の扇形の面積は` },
            { k: "math", t: String.raw`\frac{\alpha}{2}\Big\{(1+r)^{2}-(1-r)^{2}\Big\}=\frac{\alpha}{2}\cdot4r=2r\alpha` },
            {
              k: "p",
              t: String.raw`半円2つで円1つぶんの $\pi r^{2}$。2つの半円は偏角が $0$ 未満の側と $\alpha$ より大きい側にあって重ならないから、単純に足して`,
            },
            { k: "math", t: String.raw`2r\alpha+\pi r^{2}` },
            {
              k: "note",
              title: "$0<r\\le1$ がどこで効くか",
              t: String.raw`$r\le1$ だから円環の内半径 $1-r$ が $0$ 以上で、通過領域が原点のまわりで自分と重なることがない。$r>1$ なら内側が潰れて、上の分け方が崩れる。`,
            },
          ],
          check: String.raw`$\alpha=0$ とすると $\pi r^{2}$ で、回していないときの円板の面積に戻る。$r=1,\ \alpha=\pi$ なら $2\pi+\pi=3\pi$。`,
          pitfalls: [
            String.raw`両端の半円を忘れて $2r\alpha$ だけにしてしまう間違いが多い。$\alpha=0$ を代入して $0$ になったら、その式は誤り。`,
            String.raw`「円板の面積 $\times$ 何か」では出ない。通過領域は円板の平行移動の和集合で、重なりがあるので足し算にはならない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`球を $z$ 軸のまわりに角 $\alpha$ だけ回したとき、通過する領域の体積を求める`,
          answer: String.raw`$\pi R^{2}\alpha+\dfrac43\pi R^{3}$`,
          approach: String.raw`(1) と同じ読み替えがそのまま効く。中心が描く弧からの距離が $R$ 以下の点の集合で、「輪切りの扇形（回転体の一部）＋両端の半球」に分かれる。回転体の部分は**パップス・ギュルダンの定理**で一発。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中心は $xy$ 平面内の単位円周上を偏角 $0$ から $\alpha$ まで動く。その弧を $A$ として、通過領域は $\{\mathrm{P}:\ \operatorname{dist}(\mathrm{P},A)\le R\}$。`,
            },
            {
              k: "p",
              t: String.raw`円柱座標 $(\rho,\varphi,z)$ で考える。偏角 $\varphi$ が $0$ と $\alpha$ の間の部分は、$\rho z$ 半平面内の円板 $(\rho-1)^{2}+z^{2}\le R^{2}$ を $z$ 軸のまわりに角 $\alpha$ だけ回したもの。断面積は $\pi R^{2}$、その重心は $\rho=1$ にあるから、パップス・ギュルダンの定理より`,
            },
            { k: "math", t: String.raw`\pi R^{2}\times(\alpha\cdot1)=\pi R^{2}\alpha` },
            {
              k: "p",
              t: String.raw`偏角がその外側の部分は、両端に付く半径 $R$ の半球が2つ。合わせて球1つぶんの $\dfrac43\pi R^{3}$。よって`,
            },
            { k: "math", t: String.raw`\pi R^{2}\alpha+\frac43\pi R^{3}` },
            {
              k: "note",
              title: "$R\\le1$ がここでも効く",
              t: String.raw`$R\le1$ だから断面の円板は $\rho\ge0$ の側に収まり、$z$ 軸をまたがない。またいでしまうと、回転体が自分自身と重なってパップス・ギュルダンがそのまま使えなくなる。`,
            },
          ],
          check: String.raw`$\alpha=0$ とすると $\dfrac43\pi R^{3}$ で、回していないときの球の体積に戻る。(1) の $2r\alpha+\pi r^{2}$ と見比べると、扇形↔回転体、半円↔半球ときれいに対応している。`,
          pitfalls: [
            String.raw`パップス・ギュルダンを使うときは「断面が回転軸をまたがない」ことを書き添える。ここでは $R\le1$ がその保証。`,
            String.raw`回転角が $\alpha$ なので、$2\pi$ ではなく $\alpha$ を掛ける。全周回した場合の公式をそのまま使わない。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "確率",
      topics: ["裏返しの操作", "偶奇の連立方程式", "必要十分条件", "多項係数"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$p_2=\\dfrac1{18}$、$p_4=\\dfrac7{162}$ を、$6^n$ 通りの操作列を全探索して確かめた",
          "グループ分け $A=\\{2,5\\}$ が、偶奇の連立方程式の唯一の解であることを全探索で確かめた",
          "$n$ が奇数のとき $p_n=0$ になることも確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$p_2$ を求める`,
          answer: String.raw`$p_2=\dfrac1{18}$`,
          approach: String.raw`どのコインが何回裏返るかは、**選ばれた回数の偶奇だけ**で決まる。順番は関係ない。だから「各コインが偶数回選ばれたか奇数回選ばれたか」を変数にした連立方程式に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`コイン $i$ が選ばれた回数を $k_i$ とする。コイン $j$ が裏返る回数は、$j$ と隣り合うコインが選ばれた回数の合計。すべて裏向きになる条件は、どの $j$ についてもその合計が奇数になることで、$x_i\equiv k_i\pmod 2$ とおけば $\{0,1\}$ 上の連立方程式になる。`,
            },
            {
              k: "p",
              t: String.raw`(2) で解くとおり、この連立方程式の解は $x_2=x_5=1$、ほかは $0$ のただ1つ。つまり**②と⑤が奇数回、残りの4枚が偶数回**。`,
            },
            {
              k: "p",
              t: String.raw`$n=2$ では $k_1+\cdots+k_6=2$ なので、これをみたすのは $k_2=k_5=1$、ほかは $0$ の場合だけ。並べ方は②→⑤と⑤→②の $2$ 通り、全体は $6^{2}=36$ 通りだから`,
            },
            { k: "math", t: String.raw`p_2=\frac{2}{36}=\frac1{18}` },
          ],
          pitfalls: [
            String.raw`「選んだコインはそのまま」なので、選ばれたコイン自身は裏返らない。自分を含めて裏返すと思うと連立方程式が変わる。`,
            String.raw`$n$ が奇数のときは $p_n=0$。$x_2+x_5=2$ は偶数なので、$\sum k_i$ も偶数でなければならない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`グループ $A,\ B$ への分け方を答える`,
          answer: String.raw`$A=\{②,⑤\}$、$B=\{①,③,④,⑥\}$`,
          approach: String.raw`$x_i\in\{0,1\}$ の連立方程式を解く。**向かい合う位置どうしを足し引き**すると変数が次々に消えて、解が1つに決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`マス目の隣接から、条件は次の6本（左辺はそのコインが裏返る回数の偶奇）。`,
            },
            {
              k: "steps",
              items: [
                String.raw`①：$x_2+x_4\equiv1$`,
                String.raw`②：$x_1+x_3+x_5\equiv1$`,
                String.raw`③：$x_2+x_6\equiv1$`,
                String.raw`④：$x_1+x_5\equiv1$`,
                String.raw`⑤：$x_2+x_4+x_6\equiv1$`,
                String.raw`⑥：$x_3+x_5\equiv1$`,
              ],
            },
            {
              k: "p",
              t: String.raw`①と③から $x_4\equiv x_6\ (\equiv1+x_2)$。これを⑤に入れると $x_2+(x_4+x_6)\equiv x_2\equiv1$。よって $x_2=1$、$x_4=x_6=0$。`,
            },
            {
              k: "p",
              t: String.raw`④と⑥から $x_1\equiv x_3\ (\equiv1+x_5)$。これを②に入れると $(x_1+x_3)+x_5\equiv x_5\equiv1$。よって $x_5=1$、$x_1=x_3=0$。`,
            },
            {
              k: "p",
              t: String.raw`解はただ1つで、$x_2=x_5=1$、ほかは $0$。すなわち $A=\{②,⑤\}$、$B=\{①,③,④,⑥\}$。`,
            },
            {
              k: "note",
              title: "②と⑤だけが特別な理由",
              t: String.raw`$2\times3$ のマス目で、②と⑤は隣が $3$ つある真ん中の列。四隅の①③④⑥は隣が $2$ つ。隣の数の偶奇が効いていて、真ん中の列だけ奇数回選ぶ必要が出る。`,
            },
          ],
          pitfalls: [
            String.raw`解が1つしかないことまで言う。「このように分ければよい」だけでなく「これ以外にない」ことが、(3) で数え漏らさないための根拠になる。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$p_4$ を求める`,
          answer: String.raw`$p_4=\dfrac7{162}$`,
          approach: String.raw`(2) の条件のもとで $k_1+\cdots+k_6=4$ をみたす組を書き出し、それぞれの**並べ方の数（多項係数）**を足す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$k_2,k_5$ が奇数、ほかが偶数で、合計 $4$。$k_2+k_5$ は偶数で $2$ か $4$ なので、場合は次の3通り。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k_2=k_5=1$ で、①③④⑥のどれか1枚が $2$ 回 … 並べ方 $\dfrac{4!}{1!\,1!\,2!}=12$ 通り、コインの選び方が $4$ 通りで $48$ 通り`,
                String.raw`$k_2=3,\ k_5=1$ … $\dfrac{4!}{3!\,1!}=4$ 通り`,
                String.raw`$k_2=1,\ k_5=3$ … 同様に $4$ 通り`,
              ],
            },
            { k: "math", t: String.raw`48+4+4=56` },
            { k: "p", t: String.raw`全体は $6^{4}=1296$ 通りだから` },
            { k: "math", t: String.raw`p_4=\frac{56}{1296}=\frac{7}{162}` },
          ],
          check: String.raw`$6^{4}=1296$ 通りの操作列をすべて作って数えても $56$ 通りになる。また $\dfrac{7}{162}=0.0432\ldots$ で、$p_2=\dfrac1{18}=0.0555\ldots$ より小さい。回数が増えるほど「ちょうど全部裏」に当たりにくくなることと合う。`,
          pitfalls: [
            String.raw`$k_2=k_5=1$ で残り $2$ 回を①③④⑥に配るとき、$2$ 枚に $1$ 回ずつではいけない。それだと両方が奇数回になって条件を外れる。`,
            String.raw`「同じコインを複数回選ぶ」ことが許されている。$4$ 枚から $4$ 枚を選ぶ問題ではないので、組合せではなく多項係数で数える。`,
          ],
        },
      ],
    },
  ],
};
