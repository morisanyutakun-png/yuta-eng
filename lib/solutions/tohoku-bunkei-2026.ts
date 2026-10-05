import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2026年度（令和8年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */
export const tohokuBunkei2026: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分法・図形と方程式",
      topics: ["放物線の接線", "解と係数の関係", "垂直二等分線", "2次関数の最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$q(u)=2u^{2}-u+\\frac32$ を、接点を数値的に求めてから垂直二等分線の $y$ 切片として計算し直し、一致を確かめた",
          "$u=\\frac14$ で最小値 $\\frac{11}{8}$ になることを、$u$ を細かく動かして確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $(u,u-1)$ を通る接線がちょうど2本あることを示す`,
          answer: String.raw`接点の $x$ 座標の方程式 $t^{2}-2ut+u-1=0$ の判別式が $u^{2}-u+1=\left(u-\frac12\right)^{2}+\frac34>0$`,
          approach: String.raw`接点を $t$ とおいて「通る」条件を $t$ の2次方程式にする。接線の本数＝この方程式の実数解の個数。`,
          blocks: [
            { k: "p", t: String.raw`$C:\ y=x^{2}$ の $x=t$ における接線は $y=2tx-t^{2}$。点 $(u,u-1)$ を通るので` },
            { k: "math", t: String.raw`u-1=2tu-t^{2}\ \Longleftrightarrow\ t^{2}-2ut+u-1=0` },
            { k: "p", t: String.raw`判別式を $4$ で割った値は` },
            { k: "math", t: String.raw`\frac{D}{4}=u^{2}-(u-1)=u^{2}-u+1=\left(u-\frac12\right)^{2}+\frac34>0` },
            {
              k: "p",
              t: String.raw`つねに正なので、$t$ の相異なる実数解が2つある。接点が違えば接線も違うから、接線はちょうど2本。`,
            },
            {
              k: "note",
              title: "$u>0$ は使っていない",
              t: String.raw`判別式は $u$ によらず正なので、(1) はすべての実数 $u$ で成り立つ。$u>0$ が効いてくるのは (2) のほう。`,
            },
          ],
          pitfalls: [
            String.raw`「接線が2本」を「接点が2つ」に言い換えるとき、接点が違えば接線も違うこと（$y=2tx-t^{2}$ の傾き $2t$ が $t$ で決まる）に一言触れる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$m$ が $y$ 軸と交わることを示し、交点の $y$ 座標 $q(u)$ の最小値と、それを与える $u$ を求める`,
          answer: String.raw`$q(u)=2u^{2}-u+\dfrac32$、最小値 $\dfrac{11}{8}$（$u=\dfrac14$ のとき）`,
          approach: String.raw`$t_1,t_2$ を個別に求めず、**解と係数の関係**だけで中点と傾きを出す。$t_1+t_2=2u,\ t_1t_2=u-1$ しか使わない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`接点を $\mathrm{P}_1(t_1,t_1^{2}),\ \mathrm{P}_2(t_2,t_2^{2})$ とすると、(1) の方程式から $t_1+t_2=2u,\ t_1t_2=u-1$。`,
            },
            { k: "p", t: String.raw`直線 $\mathrm{P}_1\mathrm{P}_2$ の傾きは` },
            { k: "math", t: String.raw`\frac{t_1^{2}-t_2^{2}}{t_1-t_2}=t_1+t_2=2u` },
            {
              k: "p",
              t: String.raw`$u>0$ より傾きは $0$ でない。よって垂直二等分線 $m$ の傾きは $-\dfrac{1}{2u}$ で、**$m$ は $y$ 軸と平行にならず**、必ず $y$ 軸と交わる。`,
            },
            { k: "p", t: String.raw`中点は` },
            {
              k: "math",
              t: String.raw`\left(u,\ \frac{t_1^{2}+t_2^{2}}{2}\right)=\left(u,\ \frac{(2u)^{2}-2(u-1)}{2}\right)=\big(u,\ 2u^{2}-u+1\big)`,
            },
            { k: "p", t: String.raw`$m:\ y-(2u^{2}-u+1)=-\dfrac{1}{2u}(x-u)$ に $x=0$ を入れて` },
            { k: "math", t: String.raw`q(u)=2u^{2}-u+1+\frac12=2u^{2}-u+\frac32=2\left(u-\frac14\right)^{2}+\frac{11}{8}` },
            { k: "p", t: String.raw`$u>0$ の範囲に頂点 $u=\dfrac14$ が入っているので、最小値は $\dfrac{11}{8}$。` },
          ],
          check: String.raw`$u=\dfrac14$ のとき $t^{2}-\dfrac12 t-\dfrac34=0$ から $t=\dfrac{1\pm\sqrt{13}}{4}$。接点の中点は $\left(\dfrac14,\ \dfrac{15}{16}\right)$、$m$ の傾きは $-2$ で、$y$ 切片は $\dfrac{15}{16}+\dfrac12=\dfrac{23}{16}$……ではなく $\dfrac{15}{16}+2\cdot\dfrac14=\dfrac{11}{8}$。数値でも一致する。`,
          pitfalls: [
            String.raw`$y$ 軸と交わることの根拠は「$m$ が鉛直でない」こと。$\mathrm{P}_1\mathrm{P}_2$ が水平（傾き $0$）だと $m$ が鉛直になるが、$u>0$ がそれを防いでいる。`,
            String.raw`$t_1,t_2$ を根号で書き下す必要はない。対称式だけで中点も傾きも出る。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "整数",
      topics: ["平方剰余", "偶奇", "mod 4・mod 8", "無限降下"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,c\\le 400$ を全探索し、$a^{2}+2b^{2}=c^{2}$ の解がすべて $a+c$ 偶数・$b$ 偶数であることを確かめた",
          "同じ全探索で、$a,c$ がともに偶数の解の $b$ がすべて $4$ の倍数であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a^{2}+2b^{2}=c^{2}$ をみたす正の整数の組を1つ求める`,
          answer: String.raw`$(a,b,c)=(1,2,3)$`,
          blocks: [{ k: "math", t: String.raw`1^{2}+2\cdot2^{2}=1+8=9=3^{2}` }],
          approach: String.raw`$c^{2}-a^{2}=2b^{2}$ の左辺を $(c-a)(c+a)$ と見て、小さい数で当たりをつける。$b=2$ なら右辺が $8=2\cdot4$ で、$c-a=2,\ c+a=4$ がはまる。`,
        },
        {
          label: "(2)",
          task: String.raw`そのような組が無数にあることを示す`,
          answer: String.raw`$(k,2k,3k)$（$k$ は任意の正の整数）がすべて条件をみたす`,
          approach: String.raw`1つ見つかれば、**定数倍がすべて解になる**。式が $a,b,c$ について同じ次数（2次の同次式）だから。`,
          blocks: [
            { k: "p", t: String.raw`$k$ を正の整数とすると、(1) の組を $k$ 倍して` },
            { k: "math", t: String.raw`(k)^{2}+2(2k)^{2}=k^{2}+8k^{2}=9k^{2}=(3k)^{2}` },
            {
              k: "p",
              t: String.raw`$k$ が異なれば組も異なるから、条件をみたす正の整数の組は無数にある。`,
            },
          ],
          pitfalls: [
            String.raw`「無数にある」を示すだけなら、互いに素な組を無限に作る必要はない。定数倍で十分。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$a+c$ と $b$ が偶数であること、さらに $a,c$ がともに偶数なら $b$ が $4$ の倍数であることを示す`,
          answer: String.raw`平方数を $\bmod 8$ で見ると $b$ の偶数性が出る。後半は $(a,b,c)=(2a',2b',2c')$ と置き直して**前半を使い直す**`,
          approach: String.raw`平方数は $\bmod 8$ で $0,1,4$ のいずれか。この事実ひとつで前半が片づく。後半は、同じ形の式を小さい組で作り直して前半を適用する（降下法）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**$a+c$ が偶数であること。** $c^{2}-a^{2}=2b^{2}$ は偶数なので $c^{2}\equiv a^{2}\pmod2$、したがって $c\equiv a\pmod2$。よって $a+c$ は偶数。`,
            },
            { k: "p", t: String.raw`**$b$ が偶数であること。** $a,c$ の偶奇で分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$a,c$ がともに奇数のとき … 奇数の平方は $\bmod 8$ で $1$ だから $2b^{2}=c^{2}-a^{2}\equiv0\pmod 8$、つまり $b^{2}\equiv0\pmod4$ で $b$ は偶数`,
                String.raw`$a,c$ がともに偶数のとき … $a=2a',\ c=2c'$ とおくと $2b^{2}=4(c'^{2}-a'^{2})$、つまり $b^{2}=2(c'^{2}-a'^{2})$ は偶数。平方が偶数なら元も偶数なので $b$ は偶数`,
              ],
            },
            {
              k: "p",
              t: String.raw`**後半。** $a,c$ がともに偶数とし、$a=2a',\ c=2c'$、さらに前半より $b=2b'$ と書ける。代入すると`,
            },
            {
              k: "math",
              t: String.raw`4a'^{2}+2\cdot4b'^{2}=4c'^{2}\ \Longleftrightarrow\ a'^{2}+2b'^{2}=c'^{2}`,
            },
            {
              k: "p",
              t: String.raw`$a',b',c'$ も正の整数で、**同じ形の式**をみたす。だから前半がそのまま使えて $b'$ は偶数。よって $b=2b'$ は $4$ の倍数。`,
            },
            {
              k: "note",
              title: "奇数の平方が $\\bmod 8$ で $1$ になること",
              t: String.raw`$n=2j+1$ とすると $n^{2}=4j(j+1)+1$ で、$j(j+1)$ は連続2整数の積だから偶数。したがって $n^{2}\equiv1\pmod 8$。`,
            },
          ],
          check: String.raw`$a,b,c\le400$ をすべて調べると、解はつねに $a+c$ が偶数で $b$ も偶数。$a,c$ がともに偶数の解（$(2,4,6),(4,8,12),\dots$）では $b$ が必ず $4$ の倍数になっている。`,
          pitfalls: [
            String.raw`後半を「$b^{2}$ が $8$ の倍数だから」と直接押すより、$2$ で割って同じ形に戻し前半を使い直すほうが短い。降下法の型。`,
            String.raw`$a,c$ がともに奇数の場合に $\bmod 8$ が要る。$\bmod 4$ では $2b^{2}\equiv0\pmod4$ までしか出ず、$b$ の偶数性に届かない。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "ベクトル",
      topics: ["内分点", "交点の表し方", "内積と垂直条件", "円の方程式への変形"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$\\vec a,\\vec b$ を具体的な座標にとり、$s$ を動かして交点 $\\mathrm{F}$ を数値的に求め、(2) の式と一致することを確かめた",
          "$s=\\frac27$ のとき $\\vec{\\mathrm{OF}}\\cdot(\\vec b-\\vec a)=0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$t$ を $s$ で表し、$s$ のとりうる値の範囲を求める`,
          answer: String.raw`$t=\dfrac{1-2s}{5-s}$、$0<s<\dfrac12$`,
          approach: String.raw`垂直条件は $\vec{\mathrm{AE}}\cdot\vec{\mathrm{BD}}=0$。成分に分けず、$|\vec a|^{2}=2,\ |\vec b|^{2}=5,\ \vec a\cdot\vec b=1$ を**そのまま代入**する。`,
          blocks: [
            { k: "p", t: String.raw`$\vec{\mathrm{OD}}=s\vec a,\ \vec{\mathrm{OE}}=t\vec b$ なので` },
            { k: "math", t: String.raw`\vec{\mathrm{AE}}=t\vec b-\vec a,\qquad \vec{\mathrm{BD}}=s\vec a-\vec b` },
            { k: "p", t: String.raw`内積を取って与えられた値を代入すると` },
            {
              k: "math",
              t: String.raw`(t\vec b-\vec a)\cdot(s\vec a-\vec b)=st-5t-2s+1=0\ \Longleftrightarrow\ t=\frac{1-2s}{5-s}`,
            },
            {
              k: "p",
              t: String.raw`$0<s<1$ より $5-s>0$。$t>0\iff1-2s>0\iff s<\dfrac12$、$t<1\iff1-2s<5-s\iff s>-4$（つねに成立）。よって $0<s<\dfrac12$。`,
            },
          ],
          pitfalls: [
            String.raw`$t$ の範囲 $0<t<1$ が $s$ の範囲を決める。$t$ を求めて終わりにしない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\vec{\mathrm{OF}}$ を $\vec a,\vec b,\ s$ で表す`,
          answer: String.raw`$\vec{\mathrm{OF}}=\dfrac{s(s+4)\,\vec a+(1-s)(1-2s)\,\vec b}{2s^{2}-2s+5}$`,
          approach: String.raw`$\mathrm{F}$ を線分 $\mathrm{AE}$ 上と線分 $\mathrm{BD}$ 上の**両方**で表し、$\vec a,\vec b$ が1次独立であることから係数を比べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec{\mathrm{OF}}=(1-\alpha)\vec a+\alpha t\vec b=\beta s\vec a+(1-\beta)\vec b$ とおく。係数を比べて`,
            },
            { k: "math", t: String.raw`1-\alpha=\beta s,\qquad \alpha t=1-\beta` },
            { k: "p", t: String.raw`$\beta$ を消すと $1-s=\alpha(1-ts)$。(1) の $t$ を入れて` },
            {
              k: "math",
              t: String.raw`1-ts=\frac{(5-s)-s(1-2s)}{5-s}=\frac{2s^{2}-2s+5}{5-s},\qquad \alpha=\frac{(1-s)(5-s)}{2s^{2}-2s+5}`,
            },
            { k: "p", t: String.raw`これを戻すと、$\vec a$ の係数は` },
            {
              k: "math",
              t: String.raw`1-\alpha=\frac{2s^{2}-2s+5-(s^{2}-6s+5)}{2s^{2}-2s+5}=\frac{s(s+4)}{2s^{2}-2s+5}`,
            },
            { k: "p", t: String.raw`$\vec b$ の係数は $\alpha t=\dfrac{(1-s)(1-2s)}{2s^{2}-2s+5}$。以上を合わせて答えになる。` },
            {
              k: "note",
              title: "分母が $0$ にならないこと",
              t: String.raw`$2s^{2}-2s+5=2\left(s-\frac12\right)^{2}+\frac92>0$ なので、どんな $s$ でも割れる。`,
            },
          ],
          check: String.raw`$s=\dfrac14$ とすると $\vec{\mathrm{OF}}=\dfrac{17}{74}\vec a+\dfrac{3}{37}\vec b$。$\vec a,\vec b$ を実際の座標にとって交点を数値で求めても同じ点になる。`,
          pitfalls: [
            String.raw`$\vec a,\vec b$ が1次独立であることを使う。三角形 $\mathrm{OAB}$ があるという前提がその根拠。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`条件をみたす $\mathrm{P}$ 全体が半径 $3$ の円になる必要十分条件と、そのときの $s$ を求める`,
          answer: String.raw`必要十分条件は $\vec{\mathrm{OF}}\cdot(\vec b-\vec a)=0$、このとき $s=\dfrac27$`,
          approach: String.raw`$\vec{\mathrm{FP}}=\vec{\mathrm{OP}}-\vec{\mathrm{OF}}$ と置き換えて、$|\vec{\mathrm{OP}}|^{2}$ について**平方完成**する。半径の2乗が $9$ になる条件を読み取る。`,
          blocks: [
            { k: "p", t: String.raw`$\vec p=\vec{\mathrm{OP}},\ \vec f=\vec{\mathrm{OF}}$ とおくと、条件の式は` },
            {
              k: "math",
              t: String.raw`|\vec p|^{2}+2(\vec p-\vec f)\cdot(\vec b-\vec a)=4`,
            },
            { k: "p", t: String.raw`$\vec p$ について平方完成すると` },
            {
              k: "math",
              t: String.raw`\big|\vec p+(\vec b-\vec a)\big|^{2}=4+|\vec b-\vec a|^{2}+2\,\vec f\cdot(\vec b-\vec a)`,
            },
            {
              k: "p",
              t: String.raw`$|\vec b-\vec a|^{2}=5-2\cdot1+2=5$ なので、右辺は $9+2\,\vec f\cdot(\vec b-\vec a)$。これが半径 $3$ の円になる、すなわち右辺が $9$ になる条件は`,
            },
            { k: "math", t: String.raw`\vec{\mathrm{OF}}\cdot(\vec b-\vec a)=0` },
            { k: "p", t: String.raw`(2) を代入する。$\vec a\cdot\vec b-|\vec a|^{2}=-1$、$|\vec b|^{2}-\vec a\cdot\vec b=4$ だから` },
            {
              k: "math",
              t: String.raw`-s(s+4)+4(1-s)(1-2s)=0\ \Longleftrightarrow\ 7s^{2}-16s+4=0\ \Longleftrightarrow\ s=2,\ \frac27`,
            },
            { k: "p", t: String.raw`(1) の範囲 $0<s<\dfrac12$ をみたすのは $s=\dfrac27$ のみ。` },
            {
              k: "note",
              title: "条件の意味",
              t: String.raw`$\vec{\mathrm{OF}}\cdot(\vec b-\vec a)=0$ は「$\mathrm{OF}$ と $\mathrm{AB}$ が垂直」。円の中心は $\vec a-\vec b$ の位置で、$s$ によらない。動くのは半径だけで、それがちょうど $3$ になる $s$ を探していることになる。`,
            },
          ],
          check: String.raw`$s=\dfrac27$ のとき $\vec{\mathrm{OF}}=\dfrac{4\vec a+\vec b}{15}$。内積は $\dfrac{4\cdot1+5-4\cdot2-1}{15}=0$ で、確かに垂直。`,
          pitfalls: [
            String.raw`「半径 $3$ の円になる」は半径の2乗が $9$ ということ。$4$ や $3$ と直接比べない。`,
            String.raw`$7s^{2}-16s+4=0$ の解 $s=2$ は $0<s<\dfrac12$ の外。範囲で落とす一言を書く。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "微分積分",
      topics: ["4次関数の増減", "2点で接する水平線", "共有点が2個になる条件", "面積の比"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$S=\\frac{2\\sqrt2}{15}$ を数値積分で確かめた",
          "$k>0$ の $m$ について $T$ を数値積分し、$T/S>\\sqrt2$ が成り立つことを広い範囲で確かめた",
          "$k\\to0^{+}$ で $T/S\\to\\sqrt2$ に近づく（下限であって最小値ではない）ことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=x^{4}-x^{2}$ の極値を求める`,
          answer: String.raw`極大値 $0$（$x=0$）、極小値 $-\dfrac14$（$x=\pm\dfrac{1}{\sqrt2}$）`,
          approach: String.raw`$f$ は偶関数なので、グラフは $y$ 軸について対称。極小が2つ、極大が1つの「W字」になる。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=4x^{3}-2x=2x(2x^{2}-1)` },
            {
              k: "p",
              t: String.raw`$f'(x)=0$ となるのは $x=0,\ \pm\dfrac{1}{\sqrt2}$。符号は $-,+,-,+$ と変わるので、$x=\pm\dfrac{1}{\sqrt2}$ で極小、$x=0$ で極大。`,
            },
            {
              k: "math",
              t: String.raw`f(0)=0,\qquad f\!\left(\pm\frac{1}{\sqrt2}\right)=\frac14-\frac12=-\frac14`,
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`2点で接する水平な直線 $\ell$ の方程式を求める`,
          answer: String.raw`$\ell:\ y=-\dfrac14$`,
          approach: String.raw`$f$ が偶関数なので、2つの極小値が等しい。その高さの水平線が、2点で同時に接する直線になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x=\pm\dfrac{1}{\sqrt2}$ でともに極小値 $-\dfrac14$ をとるので、$y=-\dfrac14$ はこの2点で接する。`,
            },
            {
              k: "note",
              title: "ほかに候補がないこと",
              t: String.raw`$f(x)-\left(-\frac14\right)=x^{4}-x^{2}+\frac14=\left(x^{2}-\frac12\right)^{2}$ と完全平方になり、$x=\pm\frac{1}{\sqrt2}$ が重解。水平線が2点で接するにはこの形しかない。`,
            },
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\dfrac{T}{S}>\sqrt2$ を示す`,
          answer: String.raw`$m:\ y=k$（$k>0$）に限られ、$\alpha=\sqrt{\dfrac{1+\sqrt{1+4k}}{2}}>1$ として $\dfrac{T}{S}-\sqrt2=\dfrac{6\alpha^{5}-5\alpha^{3}-1}{\sqrt2\,}\cdot\dfrac{1}{1}>0$`,
          approach: String.raw`まず $m$ がどんな直線かを絞る。$y=k$ と $y=f(x)$ の共有点の個数は、$u=x^{2}$ の2次方程式の**正の解の個数**で決まる。共有点がちょうど2個になるのは $k>0$ のときだけ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x^{4}-x^{2}=k$ で $u=x^{2}\ (\ge0)$ とおくと $u^{2}-u-k=0$、$u=\dfrac{1\pm\sqrt{1+4k}}{2}$。正の解1つにつき $x$ が2個（$u=0$ なら1個）出る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k>0$ … 正の解は1つだけ。共有点は**2個**`,
                String.raw`$k=0$ … $u=0,1$ で共有点は3個`,
                String.raw`$-\dfrac14<k<0$ … 正の解が2つで共有点は4個`,
                String.raw`$k=-\dfrac14$ … これは $\ell$ そのもので、$m\ne\ell$ より除く`,
              ],
            },
            { k: "p", t: String.raw`よって $m:\ y=k\ (k>0)$。まず $S$ を求める。(2) の完全平方を使って` },
            {
              k: "math",
              t: String.raw`S=\int_{-1/\sqrt2}^{1/\sqrt2}\left(x^{2}-\frac12\right)^{2}dx=2\left(\frac{c^{5}}{5}-\frac{c^{3}}{3}+\frac{c}{4}\right)_{c=1/\sqrt2}=\frac{2\sqrt2}{15}`,
            },
            {
              k: "p",
              t: String.raw`次に $T$。共有点の $x$ 座標を $\pm\alpha$（$\alpha=\sqrt{u}>1$）とすると $k=\alpha^{4}-\alpha^{2}$ で`,
            },
            {
              k: "math",
              t: String.raw`T=\int_{-\alpha}^{\alpha}\big(k+x^{2}-x^{4}\big)dx=\frac85\alpha^{5}-\frac43\alpha^{3}`,
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`\frac{T}{S}=\frac{\frac85\alpha^{5}-\frac43\alpha^{3}}{\frac{2\sqrt2}{15}}=\frac{12\alpha^{5}-10\alpha^{3}}{\sqrt2}`,
            },
            { k: "p", t: String.raw`$\dfrac{T}{S}>\sqrt2$ は $12\alpha^{5}-10\alpha^{3}>2$、すなわち` },
            { k: "math", t: String.raw`g(\alpha)=6\alpha^{5}-5\alpha^{3}-1>0` },
            {
              k: "p",
              t: String.raw`$g(1)=0$ で、$g'(\alpha)=15\alpha^{2}(2\alpha^{2}-1)>0$（$\alpha>1$）だから $g$ は増加。$k>0$ より $\alpha>1$ なので $g(\alpha)>g(1)=0$。よって $\dfrac{T}{S}>\sqrt2$。`,
            },
            {
              k: "note",
              title: "$\\sqrt2$ は最小値ではない",
              t: String.raw`$k\to0^{+}$ で $\alpha\to1$ となり $\dfrac{T}{S}\to\sqrt2$ に近づくが、$k=0$ は共有点が3個になるので除かれている。$\sqrt2$ は**届かない下限**で、だから不等号が厳密になる。`,
            },
          ],
          check: String.raw`$k=1$ では $\alpha=1.27202\ldots$、$T=2.58408\ldots$、$S=0.18856\ldots$ で $\dfrac{T}{S}=13.70\ldots>\sqrt2$。$k=0.01$ まで下げると $\dfrac{T}{S}=1.4186\ldots$ で、$\sqrt2=1.41421\ldots$ をわずかに上回る。`,
          pitfalls: [
            String.raw`$m$ の条件「共有点がちょうど2個」を先に絞らないと、$k$ の範囲を取り違えて不等式が成り立たなくなる。$-\frac14<k<0$ では共有点が4個。`,
            String.raw`$\alpha>1$ が $k>0$ から来ることを書く。この1点に不等式のすべてがかかっている。`,
          ],
        },
      ],
    },
  ],
};
