import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋工業大学 2026年度（令和8年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 名工大は解答例と出題意図も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */
export const nitech2026: SolutionSet = {
  slug: "nitech",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "工学部",
  university: "名古屋工業大学",
  short: "名工大",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["対数の置きかえ", "変曲点", "置換積分", "部分積分のくり返し"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "極大・極小の位置を $u=\\log x$ の刻み幅 $5\\times10^{-6}$ の全探索で確かめ、値が $\\pm2\\sqrt3$ になることを確かめた",
          "変曲点の前後で2階微分の符号が実際に変わることを数値微分で確かめた",
          "面積 $2e^{3}+14e^{-3}+2=42.868092804$ を数値積分で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=\dfrac13(\log x)^{3}-3\log x$ の極値を求める`,
          answer: String.raw`$x=e^{-\sqrt3}$ で極大値 $2\sqrt3$、$x=e^{\sqrt3}$ で極小値 $-2\sqrt3$`,
          approach: String.raw`$u=\log x$ と置くと $f$ は $u$ の3次式になる。$x>0$ で $u=\log x$ は**増加**なので、$u$ についての増減がそのまま $x$ についての増減になる。`,
          blocks: [
            { k: "p", t: String.raw`定義域は $x>0$。$u=\log x$ と置くと $f=\dfrac{u^{3}}{3}-3u$ で、合成関数の微分から` },
            { k: "math", t: String.raw`f'(x)=\left(u^{2}-3\right)\cdot\frac1x=\frac{(\log x)^{2}-3}{x}` },
            {
              k: "p",
              t: String.raw`$x>0$ だから符号は分子で決まる。$u^{2}-3=0$ より $u=\pm\sqrt3$、すなわち $x=e^{\pm\sqrt3}$。`,
            },
            {
              k: "p",
              t: String.raw`$u^{2}-3$ は下に凸の放物線なので、符号は $u$ の小さいほうから**正・負・正**。$u$ は $x$ とともに増えるので、$x$ についても同じ順で変わる。`,
            },
            {
              k: "math",
              t: String.raw`f\!\left(e^{-\sqrt3}\right)=\frac{-3\sqrt3}{3}+3\sqrt3=2\sqrt3,\qquad f\!\left(e^{\sqrt3}\right)=\frac{3\sqrt3}{3}-3\sqrt3=-2\sqrt3`,
            },
          ],
          check: String.raw`$f$ は $u$ の奇関数（$u\mapsto-u$ で符号が反転する）なので、極大値と極小値が符号違いで同じ大きさになるのは自然。$2\sqrt3=3.4641\ldots$。`,
          pitfalls: [
            String.raw`$u$ の増減を $x$ の増減に読み替えるとき、$\log x$ が増加関数であることを使う。ここを飛ばすと極大・極小が入れ替わる危険がある。`,
            String.raw`答えは $x$ の値ではなく**極値**（$y$ の値）を聞かれている。両方書いておくのが安全。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`曲線 $C:y=f(x)$ の変曲点の座標を求める`,
          answer: String.raw`$\left(e^{-1},\ \dfrac83\right)$ と $\left(e^{3},\ 0\right)$`,
          approach: String.raw`$f'=\dfrac{u^{2}-3}{x}$ をもう一度微分する。**商の微分**で $\dfrac1{x^{2}}$ が出るので、符号は分子だけで決まる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`f''(x)=\frac{2u\cdot\frac1x\cdot x-(u^{2}-3)}{x^{2}}=\frac{-u^{2}+2u+3}{x^{2}}=\frac{-(u-3)(u+1)}{x^{2}}`,
            },
            {
              k: "p",
              t: String.raw`$f''=0$ となるのは $u=3,\ -1$、つまり $x=e^{3},\ e^{-1}$。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$u<-1$ … $(u-3)(u+1)>0$ なので $f''<0$（上に凸）`,
                String.raw`$-1<u<3$ … $(u-3)(u+1)<0$ なので $f''>0$（下に凸）`,
                String.raw`$u>3$ … $f''<0$（上に凸）`,
              ],
            },
            { k: "p", t: String.raw`どちらでも凹凸が入れ替わるので、**2つとも変曲点**。$y$ 座標は` },
            {
              k: "math",
              t: String.raw`f\!\left(e^{-1}\right)=-\frac13+3=\frac83,\qquad f\!\left(e^{3}\right)=\frac{27}{3}-9=0`,
            },
          ],
          check: String.raw`$x=e^{3}$ では $y=0$ なので、変曲点がちょうど $x$ 軸上に乗る。これは (3) で面積の端点になる点と同じで、話がつながる。`,
          pitfalls: [
            String.raw`$f''=0$ は変曲点の**必要条件**。符号が実際に変わることまで確かめる。`,
            String.raw`$x^{2}>0$ なので符号は分子だけ。分母を気にして場合分けしない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`曲線 $C$ と $x$ 軸で囲まれる図形の面積 $S$ を求める`,
          answer: String.raw`$S=2e^{3}+14e^{-3}+2$`,
          approach: String.raw`$x=e^{u}$ と置換すると $dx=e^{u}du$ で、$\left(\text{3次式}\right)\times e^{u}$ の積分になる。部分積分を3回くり返す形だが、**1つの原始関数をまとめて作っておく**と2区間ぶんを一度に処理できる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $x$ 軸との交点。$\dfrac{u(u^{2}-9)}{3}=0$ より $u=0,\pm3$、つまり $x=e^{-3},\ 1,\ e^{3}$。`,
            },
            {
              k: "p",
              t: String.raw`$u(u^{2}-9)$ の符号から、$-3<u<0$ で $f>0$、$0<u<3$ で $f<0$。囲まれる部分は2つに分かれる。`,
            },
            { k: "p", t: String.raw`$x=e^{u}$ と置換して、原始関数をまとめて作る。` },
            {
              k: "math",
              t: String.raw`\int\left(\frac{u^{3}}{3}-3u\right)e^{u}\,du=\frac{e^{u}\left(u^{3}-3u^{2}-3u+3\right)}{3}=G(u)`,
            },
            {
              k: "p",
              t: String.raw`$\displaystyle\int u^{3}e^{u}du=e^{u}(u^{3}-3u^{2}+6u-6)$ と $\displaystyle\int ue^{u}du=e^{u}(u-1)$ を組み合わせれば出る。値は`,
            },
            {
              k: "math",
              t: String.raw`G(-3)=-14e^{-3},\qquad G(0)=1,\qquad G(3)=-2e^{3}`,
            },
            {
              k: "math",
              t: String.raw`S=\Big\{G(0)-G(-3)\Big\}+\Big\{G(0)-G(3)\Big\}=\left(1+14e^{-3}\right)+\left(1+2e^{3}\right)`,
            },
            { k: "math", t: String.raw`S=2e^{3}+14e^{-3}+2` },
          ],
          check: String.raw`$G$ を微分すると $e^{u}\left(\dfrac{u^{3}}{3}-3u\right)$ に戻る（$u^{3}$ の項と $u^{2}$ の項が打ち消し合う）。数値では $S=42.868092804\ldots$ で、数値積分の結果と一致する。`,
          pitfalls: [
            String.raw`$0<u<3$ では $f<0$ なので、面積は $-\int f$。符号を揃えずに足すと $2e^{3}$ の項が消えてしまう。`,
            String.raw`$e^{-3}$ の項（$14e^{-3}\approx0.697$）は小さいが落とさない。$2e^{3}+2$ だけだと $42.17$ でずれる。`,
            String.raw`置換後の積分区間は $u$ の区間 $[-3,0]$ と $[0,3]$。$x$ の区間のままにしない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "数列",
      topics: ["因数分解を誘導に使う", "逆数の置きかえ", "階差数列", "部分分数分解", "場合分けの見落とし"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式を $a_1$ を4通り変えて12項まで回し、閉じた式 $a_n=\\frac{a_1+1-n}{(n-1)a_1+2n-1}$ と一致することを確かめた（最大誤差 $10^{-15}$）",
          "$a_1=-\\frac72$ で $a_{10}=1$ になることを分数のまま確かめた",
          "$a_1=-1$ のとき $n=1$ の式が $a_2$ によらず成立すること、$a_2=9$ とすれば $a_{10}=1$ になることを分数で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x^{2}+x-xy-y$ を因数分解する`,
          answer: String.raw`$(x+1)(x-y)$`,
          approach: String.raw`$x$ を含む2項、$y$ を含む2項でくくると、共通因数 $x+1$ が出る。`,
          blocks: [
            {
              k: "math",
              t: String.raw`x^{2}+x-xy-y=x(x+1)-y(x+1)=(x+1)(x-y)`,
            },
            {
              k: "note",
              title: "これは誘導",
              t: String.raw`この小問は単独では易しいが、(2) で漸化式の右辺 $a_n^{2}+a_n-a_na_{n+1}-a_{n+1}$ をそのまま $\left(a_n+1\right)\left(a_n-a_{n+1}\right)$ に直すために置かれている。$x=a_n$、$y=a_{n+1}$ にあたる。`,
            },
          ],
        },
        {
          label: "(2)",
          task: String.raw`$b_n=\dfrac{1}{a_n+1}$ とおくとき、$b_{n+1}$ を $b_n$ と $n$ で表す`,
          answer: String.raw`$b_{n+1}=b_n+\dfrac{1}{n(n+1)}$`,
          approach: String.raw`(1) で右辺を $\left(a_n+1\right)\left(a_n-a_{n+1}\right)$ に直すと、両辺に $a_n+1$ がある。約分したあと**両辺を $(a_n+1)(a_{n+1}+1)$ で割る**と、逆数だけの式になる。`,
          blocks: [
            { k: "p", t: String.raw`(1) より右辺は $\left(a_n+1\right)\left(a_n-a_{n+1}\right)$。$a_n\ne-1$ だから両辺を $a_n+1$ で割れて` },
            {
              k: "math",
              t: String.raw`\frac{\left(a_{n+1}+1\right)\left(a_n+1\right)}{(n+1)n}=a_n-a_{n+1}`,
            },
            {
              k: "p",
              t: String.raw`右辺は $\left(a_n+1\right)-\left(a_{n+1}+1\right)$ と書ける。両辺を $\left(a_n+1\right)\left(a_{n+1}+1\right)$ で割ると`,
            },
            {
              k: "math",
              t: String.raw`\frac{1}{n(n+1)}=\frac{1}{a_{n+1}+1}-\frac{1}{a_n+1}=b_{n+1}-b_n`,
            },
            { k: "math", t: String.raw`b_{n+1}=b_n+\frac{1}{n(n+1)}` },
          ],
          check: String.raw`$a_1=2$ とすると $b_1=\dfrac13$、$b_2=\dfrac13+\dfrac12=\dfrac56$ で $a_2=\dfrac65-1=\dfrac15$。これを元の漸化式に入れると両辺とも $\dfrac{9}{10}$ になる。`,
          pitfalls: [
            String.raw`割ってよいのは $a_n\ne-1$ が与えられているから。この条件が (2)(3) に明記されていることに意味がある（(4) で効く）。`,
            String.raw`$\left(a_{n+1}+1\right)$ で割るには $a_{n+1}\ne-1$ も要る。これは「$a_n\ne-1$ ならば $a_{n+1}\ne-1$」から従う（(4) で示す）。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$a_n$ を $a_1$ と $n$ で表す`,
          answer: String.raw`$a_n=\dfrac{a_1+1-n}{(n-1)a_1+2n-1}$`,
          approach: String.raw`(2) は階差の形。$\dfrac{1}{n(n+1)}=\dfrac1n-\dfrac1{n+1}$ と**部分分数に分ける**と、足し合わせたときに途中が消える。`,
          blocks: [
            {
              k: "math",
              t: String.raw`b_n=b_1+\sum_{k=1}^{n-1}\left(\frac1k-\frac1{k+1}\right)=b_1+1-\frac1n\qquad(n\ge1)`,
            },
            { k: "p", t: String.raw`$b_1=\dfrac{1}{a_1+1}$ を入れて通分すると` },
            {
              k: "math",
              t: String.raw`b_n=\frac{1}{a_1+1}+\frac{n-1}{n}=\frac{n+(n-1)\left(a_1+1\right)}{n\left(a_1+1\right)}`,
            },
            { k: "p", t: String.raw`$a_n=\dfrac1{b_n}-1$ なので` },
            {
              k: "math",
              t: String.raw`a_n=\frac{n\left(a_1+1\right)}{n+(n-1)\left(a_1+1\right)}-1=\frac{a_1+1-n}{(n-1)a_1+2n-1}`,
            },
          ],
          check: String.raw`$n=1$ を入れると $\dfrac{a_1}{1}=a_1$ で合う。$a_1=2$ なら $a_2=\dfrac{3-2}{2+3}=\dfrac15$ で (2) の検算と一致する。`,
          pitfalls: [
            String.raw`階差の和は $k=1$ から $n-1$ まで。$n$ までにすると $\dfrac1{n+1}$ がずれる。`,
            String.raw`分母を $n+(n-1)(a_1+1)$ のまま残してもよいが、展開して $(n-1)a_1+2n-1$ にすると (4) の計算が楽になる。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$a_{10}=1$ であるとき、$a_1$ としてとりうる値をすべて求める`,
          answer: String.raw`$a_1=-\dfrac72$ と $a_1=-1$`,
          approach: String.raw`この小問には**「すべての $n$ で $a_n\ne-1$」という条件が付いていない**。だから $a_1=-1$ の場合を別に調べる必要がある。「すべて求めよ」はその合図。`,
          blocks: [
            { k: "p", t: String.raw`**(i) $a_1\ne-1$ のとき。** (3) の式に $n=10$ を入れる。` },
            {
              k: "math",
              t: String.raw`\frac{a_1-9}{9a_1+19}=1\ \Longrightarrow\ a_1-9=9a_1+19\ \Longrightarrow\ a_1=-\frac72`,
            },
            {
              k: "note",
              title: "$a_1\\ne-1$ なら全項が $-1$ にならない",
              t: String.raw`$a_n\ne-1$ のとき、もし $a_{n+1}=-1$ なら (2) の途中式の左辺が $0$、右辺が $a_n-a_{n+1}=a_n+1\ne0$ となって矛盾する。よって帰納的にすべての項が $-1$ でない。だから (3) の式がそのまま使える。`,
            },
            { k: "p", t: String.raw`**(ii) $a_1=-1$ のとき。** 元の漸化式で $n=1$ とすると、左辺は $\left(a_2+1\right)\left(a_1+1\right)^{2}/2=0$、右辺も $\left(a_1+1\right)\left(a_1-a_2\right)=0$。` },
            {
              k: "p",
              t: String.raw`つまり**$a_2$ がどんな値でも成り立つ**。$a_2\ne-1$ を選べば $n\ge2$ で (2) が使えて、$b_{10}=b_2+\displaystyle\sum_{k=2}^{9}\frac{1}{k(k+1)}=b_2+\frac12-\frac1{10}$。`,
            },
            {
              k: "p",
              t: String.raw`$a_{10}=1$ すなわち $b_{10}=\dfrac12$ とすると $b_2=\dfrac12-\dfrac25=\dfrac1{10}$、つまり $a_2=9$。これは $-1$ でないので条件に合う。`,
            },
            { k: "p", t: String.raw`したがって $a_1=-1$ も $a_{10}=1$ を実現できる。以上より $a_1=-\dfrac72,\ -1$。` },
          ],
          check: String.raw`$a_1=-\dfrac72$ では $a_{10}=\dfrac{-\frac72-9}{9\cdot\left(-\frac72\right)+19}=\dfrac{-\frac{25}{2}}{-\frac{25}{2}}=1$。$a_1=-1,\ a_2=9$ では $b_2=\dfrac1{10}$ から順に足して $b_{10}=\dfrac12$、$a_{10}=1$。どちらも分数のまま確かめた。`,
          pitfalls: [
            String.raw`**(2)(3) にあった「$a_n\ne-1$」が (4) にはない。** 問題文の条件の差を読み落とすと $-\dfrac72$ だけで終わる。「すべて求めよ」という言い方が手がかり。`,
            String.raw`$a_1=-1$ のとき漸化式は $0=0$ になり、$a_2$ を決めない。だから $a_2$ を選ぶ自由があり、そこで帳尻を合わせられる。`,
            String.raw`$a_1=-1$ では $b_1=\dfrac1{a_1+1}$ が定義できない。(3) の式に $a_1=-1$ を代入してはいけない。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["正四面体の内積", "内分点", "垂線の足", "平行四辺形で張る領域の面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "一辺1の正四面体を実座標で作り（6辺すべて長さ1を確認）、$\\vec{\\mathrm{OE}}$ が式と一致することを確かめた",
          "$\\mathrm{H}$ を「平面 $\\mathrm{OAC}$ 上で $\\mathrm{E}$ に最も近い点」として数値探索し、$\\frac37\\vec a+\\frac5{14}\\vec c$ と一致することを確かめた",
          "面積 $\\frac{\\sqrt{11}}{7}$ を、外積の大きさからの計算と200万点のモンテカルロの2通りで確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\vec{\mathrm{OE}}$ を $\vec a,\vec b,\vec c$ で表す`,
          answer: String.raw`$\vec{\mathrm{OE}}=\dfrac{3}{14}\vec a+\dfrac{9}{14}\vec b+\dfrac17\vec c$`,
          approach: String.raw`内分点を2段階たどるだけ。先に $\mathrm{D}$ を出してから $\mathrm{E}$ に進む。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{AD}:\mathrm{DB}=3:1$ なので $\mathrm{B}$ 側の重みが大きい。` },
            { k: "math", t: String.raw`\vec{\mathrm{OD}}=\frac{1\cdot\vec a+3\cdot\vec b}{4}=\frac14\vec a+\frac34\vec b` },
            { k: "p", t: String.raw`$\mathrm{CE}:\mathrm{ED}=6:1$ なので $\mathrm{D}$ 側の重みが大きい。` },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{OE}}=\frac{1\cdot\vec c+6\cdot\vec{\mathrm{OD}}}{7}=\frac17\vec c+\frac67\left(\frac14\vec a+\frac34\vec b\right)=\frac{3}{14}\vec a+\frac{9}{14}\vec b+\frac17\vec c`,
            },
            {
              k: "p",
              t: String.raw`係数の和は $\dfrac{3}{14}+\dfrac{9}{14}+\dfrac{2}{14}=1$。$\mathrm{E}$ が $\mathrm{A},\mathrm{B},\mathrm{C}$ の張る平面上にあることと合う。`,
            },
          ],
          pitfalls: [
            String.raw`$m:n$ の内分は $\dfrac{n\vec{\mathrm{OA}}+m\vec{\mathrm{OB}}}{m+n}$。係数を逆にしやすい。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{E}$ から平面 $\mathrm{OAC}$ に下ろした垂線の足 $\mathrm{H}$ について $\vec{\mathrm{OH}}$ を表す`,
          answer: String.raw`$\vec{\mathrm{OH}}=\dfrac37\vec a+\dfrac5{14}\vec c$`,
          approach: String.raw`$\mathrm{H}$ は平面 $\mathrm{OAC}$ 上なので $\vec{\mathrm{OH}}=\alpha\vec a+\gamma\vec c$ と2文字で書ける。条件は $\vec{\mathrm{EH}}\perp\vec a$ と $\vec{\mathrm{EH}}\perp\vec c$ の2本で、ちょうど足りる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`一辺 $1$ の正四面体だから $|\vec a|^{2}=|\vec b|^{2}=|\vec c|^{2}=1$、$\vec a\cdot\vec b=\vec b\cdot\vec c=\vec c\cdot\vec a=\dfrac12$（なす角 $60^\circ$）。`,
            },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{EH}}=\left(\alpha-\frac3{14}\right)\vec a-\frac9{14}\vec b+\left(\gamma-\frac17\right)\vec c`,
            },
            { k: "p", t: String.raw`$\vec{\mathrm{EH}}\cdot\vec a=0$ と $\vec{\mathrm{EH}}\cdot\vec c=0$ を立てると` },
            {
              k: "math",
              t: String.raw`\alpha+\frac{\gamma}{2}=\frac{17}{28},\qquad \frac{\alpha}{2}+\gamma=\frac47`,
            },
            {
              k: "p",
              t: String.raw`上の式を2倍して下を引くなどして解くと $\gamma=\dfrac5{14}$、$\alpha=\dfrac37$。`,
            },
            { k: "math", t: String.raw`\vec{\mathrm{OH}}=\frac37\vec a+\frac5{14}\vec c` },
          ],
          check: String.raw`一辺1の正四面体を実際の座標で作り、平面 $\mathrm{OAC}$ 上で $\mathrm{E}$ に最も近い点を数値探索すると $\alpha=0.42857144$、$\gamma=0.35714285$ となり、$\dfrac37,\ \dfrac5{14}$ と一致した。`,
          pitfalls: [
            String.raw`$\vec b$ の係数は消えない。$\mathrm{E}$ は平面 $\mathrm{OAC}$ の外にあるので、$\vec{\mathrm{EH}}$ に $\vec b$ が残るのが普通。`,
            String.raw`$\vec a,\vec b,\vec c$ は直交していない。内積はすべて $\dfrac12$ なので、展開のたびに交差項が出る。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\angle\mathrm{HAB}=\theta$ とするとき $\cos\theta$ を求める`,
          answer: String.raw`$\cos\theta=\dfrac47$`,
          approach: String.raw`$\mathrm{A}$ を起点にした2つのベクトル $\vec{\mathrm{AH}},\vec{\mathrm{AB}}$ の内積と長さを出すだけ。$|\vec{\mathrm{AH}}|$ がきれいな値になる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\vec{\mathrm{AH}}=\vec{\mathrm{OH}}-\vec a=-\frac47\vec a+\frac5{14}\vec c,\qquad \vec{\mathrm{AB}}=\vec b-\vec a`,
            },
            {
              k: "p",
              t: String.raw`内積を展開する。$\vec a\cdot\vec b=\vec c\cdot\vec b=\vec c\cdot\vec a=\dfrac12$、$|\vec a|^{2}=1$ を使うと`,
            },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{AH}}\cdot\vec{\mathrm{AB}}=-\frac27+\frac5{28}+\frac47-\frac5{28}=\frac27`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec{\mathrm{AH}}\right|^{2}=\frac{16}{49}-\frac{20}{98}+\frac{25}{196}=\frac{49}{196}=\frac14\ \Longrightarrow\ \left|\vec{\mathrm{AH}}\right|=\frac12`,
            },
            { k: "p", t: String.raw`$\left|\vec{\mathrm{AB}}\right|=1$ だから` },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac{\frac27}{1\cdot\frac12}=\frac47`,
            },
          ],
          check: String.raw`実座標で計算しても $\cos\theta=0.571428571429=\dfrac47$、$\left|\vec{\mathrm{AH}}\right|=0.5$ ちょうど。$\sin\theta=\dfrac{\sqrt{33}}{7}$ になり、これが (4) で効く。`,
          pitfalls: [
            String.raw`$\left|\vec{\mathrm{AH}}\right|=\dfrac12$ はきれいすぎて計算ミスを疑いたくなるが正しい。$\dfrac{49}{196}$ で約分される。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$\vec{\mathrm{AP}}=s\vec{\mathrm{AB}}+t\vec{\mathrm{AH}}$（$s\ge0,\ t\ge0,\ s+\sqrt3\,t\le2$）をみたす $\mathrm{P}$ の存在範囲の面積 $S$ を求める`,
          answer: String.raw`$S=\dfrac{\sqrt{11}}{7}$`,
          approach: String.raw`$(s,t)$ の条件は**三角形**。$\vec{\mathrm{AB}},\vec{\mathrm{AH}}$ は直交していないので、$(s,t)$ 平面での面積をそのまま使えない。**$\left|\vec{\mathrm{AB}}\right|\left|\vec{\mathrm{AH}}\right|\sin\theta$ 倍**して実際の平面に移す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$(s,t)$ の動く範囲は $(0,0),\ (2,0),\ \left(0,\dfrac{2}{\sqrt3}\right)$ を頂点とする三角形で、その面積は`,
            },
            {
              k: "math",
              t: String.raw`\frac12\cdot2\cdot\frac{2}{\sqrt3}=\frac{2}{\sqrt3}`,
            },
            {
              k: "p",
              t: String.raw`$\vec{\mathrm{AB}},\vec{\mathrm{AH}}$ の張る平行四辺形の面積は $\left|\vec{\mathrm{AB}}\right|\left|\vec{\mathrm{AH}}\right|\sin\theta$。(3) より $\sin\theta=\sqrt{1-\left(\frac47\right)^{2}}=\dfrac{\sqrt{33}}{7}$ だから`,
            },
            {
              k: "math",
              t: String.raw`1\cdot\frac12\cdot\frac{\sqrt{33}}{7}=\frac{\sqrt{33}}{14}`,
            },
            { k: "p", t: String.raw`$(s,t)$ 平面での面積をこの倍率で引き伸ばせばよい。` },
            {
              k: "math",
              t: String.raw`S=\frac{2}{\sqrt3}\cdot\frac{\sqrt{33}}{14}=\frac{2}{14}\sqrt{\frac{33}{3}}=\frac{\sqrt{11}}{7}`,
            },
          ],
          check: String.raw`$\dfrac{\sqrt{11}}{7}=0.473803541\ldots$。実座標で $(s,t)$ を200万点ばらまいて写した面積も $0.4741$ で一致する。$\sqrt3$ が約分されて $\sqrt{11}$ になるのが答えの形の手がかり。`,
          pitfalls: [
            String.raw`$(s,t)$ の面積 $\dfrac{2}{\sqrt3}$ をそのまま答えにしない。$\vec{\mathrm{AB}}$ と $\vec{\mathrm{AH}}$ は長さも角度も直交座標とは違う。`,
            String.raw`$s+\sqrt3\,t\le2$ の $t$ 切片は $\dfrac{2}{\sqrt3}$ であって $2\sqrt3$ ではない。`,
            String.raw`$\dfrac{\sqrt{33}}{\sqrt3}=\sqrt{11}$ の約分を見落とすと、形が汚いまま残る。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "微分積分",
      topics: ["共通因数で次数を下げる", "共有点の個数と判別式", "回転体の体積", "与えられた積分公式の使い方"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "共有点の個数を $t$ を動かして数値で数え、$t>2\\sqrt{10}-6$ で3点・下回ると1点になることを確かめた",
          "$V=\\frac{25}{3}\\pi$ を数値積分で確かめた",
          "$V_1=V_2$ となる $t$ を二分法で求め、$3\\sqrt5-6=0.708203932$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(x)=x^{3}-2x+4$（$x\ge-2$）の極値を求める`,
          answer: String.raw`$x=-\dfrac{\sqrt6}{3}$ で極大値 $4+\dfrac{4\sqrt6}{9}$、$x=\dfrac{\sqrt6}{3}$ で極小値 $4-\dfrac{4\sqrt6}{9}$`,
          approach: String.raw`ふつうの3次関数の増減。ただし定義域が $x\ge-2$ なので、極値の位置が範囲に入るかを確かめる。`,
          blocks: [
            { k: "math", t: String.raw`f'(x)=3x^{2}-2=0\ \Longrightarrow\ x=\pm\frac{\sqrt6}{3}` },
            {
              k: "p",
              t: String.raw`$\dfrac{\sqrt6}{3}=0.816\ldots$ なので、どちらも $x\ge-2$ の内側にある。$f'$ は下に凸なので符号は正・負・正、つまり $x=-\dfrac{\sqrt6}{3}$ で極大、$x=\dfrac{\sqrt6}{3}$ で極小。`,
            },
            {
              k: "math",
              t: String.raw`f\!\left(\mp\frac{\sqrt6}{3}\right)=4\pm\frac{4\sqrt6}{9}`,
            },
            {
              k: "note",
              title: "極小値が正であること",
              t: String.raw`$\dfrac{4\sqrt6}{9}=1.088\ldots$ なので極小値は $2.911\ldots>0$。よって $x>-2$ では $f(x)>0$ で、$\sqrt{f(x)}$ が定義できる。$f(-2)=0$ なので $C$ は $(-2,0)$ から始まる。`,
            },
          ],
          check: String.raw`$f(-2)=-8+4+4=0$。$f$ が $x\ge-2$ で $0$ 以上であることは、極小値が正であることから言える。`,
          pitfalls: [
            String.raw`$x\ge-2$ という制限がわざわざ付いているのは、$\sqrt{f(x)}$ を定義するため。$f(-2)=0$ が後の小問の鍵になる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$C$ と $\ell_t$ が異なる3つの共有点をもつような $t$ の範囲を求める`,
          answer: String.raw`$t>2\sqrt{10}-6$`,
          approach: String.raw`両辺とも $x\ge-2$ で $0$ 以上なので、2乗しても同値。すると $x^{3}-2x+4=t(x+2)^{2}$ で、**両辺に $x+2$ が共通に現れる**ことに気づけば次数が1つ下がる。`,
          blocks: [
            { k: "p", t: String.raw`$f(-2)=0$ だから $x+2$ でくくれる。` },
            { k: "math", t: String.raw`x^{3}-2x+4=(x+2)\left(x^{2}-2x+2\right)` },
            {
              k: "math",
              t: String.raw`(x+2)\left(x^{2}-2x+2\right)=t(x+2)^{2}`,
            },
            {
              k: "p",
              t: String.raw`$x=-2$ は $t$ によらず**常に共有点**。残りは $x\ne-2$ のもとで`,
            },
            {
              k: "math",
              t: String.raw`x^{2}-(2+t)x+(2-2t)=0`,
            },
            {
              k: "steps",
              items: [
                String.raw`この2次式に $x=-2$ を入れると $10\ne0$。だから $x=-2$ は重複しない`,
                String.raw`2解の和は $2+t>0$ なので、2解がそろって $-2$ より小さいことはない。$x=-2$ での値が正なので2解とも $-2$ より大きい`,
                String.raw`よって3点になる条件は**判別式が正**であることだけ`,
              ],
            },
            {
              k: "math",
              t: String.raw`D=(2+t)^{2}-4(2-2t)=t^{2}+12t-4>0`,
            },
            {
              k: "p",
              t: String.raw`$t>0$ の範囲では $t>-6+2\sqrt{10}$。$2\sqrt{10}-6=0.3245\ldots$。`,
            },
          ],
          check: String.raw`$t=0.345$ では共有点が3つ、$t=0.305$ では1つだけ、と数値で数えても境界が一致する。`,
          pitfalls: [
            String.raw`$x=-2$ を忘れない。2次方程式の解だけ数えると「2点」と答えてしまう。`,
            String.raw`2解が定義域 $x\ge-2$ に入るかの確認が要る。ここは「$x=-2$ での値が正」＋「和が正」で片づく。`,
            String.raw`2乗して同値になるのは、$\ell_t$ の右辺 $\sqrt t\,(x+2)$ が $x\ge-2$ で $0$ 以上だから。無条件ではない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`共有点がちょうど2つ $\mathrm{P},\mathrm{Q}$ のとき、$C$ と線分 $\mathrm{PQ}$ で囲まれる図形を $x$ 軸のまわりに1回転してできる立体の体積 $V$ を求める`,
          answer: String.raw`$V=\dfrac{25}{3}\pi$`,
          approach: String.raw`ちょうど2点 ⟺ 判別式が $0$（重解）。回転体の体積は $\pi\displaystyle\int\left(C^{2}-\ell^{2}\right)dx$ で、**$C^{2}-\ell^{2}$ がそのまま因数分解された形**になるので、与えられた積分公式がそのまま使える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$D=t^{2}+12t-4=0$ より $t=2\sqrt{10}-6$。重解は $x=\dfrac{2+t}{2}=\sqrt{10}-2$。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}(-2,0)$、$\mathrm{Q}$ の $x$ 座標は $\sqrt{10}-2$。2乗の差は`,
            },
            {
              k: "math",
              t: String.raw`C^{2}-\ell_t^{2}=(x+2)\left(x-\left(\sqrt{10}-2\right)\right)^{2}\ \ge0`,
            },
            {
              k: "p",
              t: String.raw`与えられた公式で $a=-2$、$b=c=\sqrt{10}-2$ とすると、$2b-a-c=b+2=\sqrt{10}$、$c-a=\sqrt{10}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\int_{-2}^{\sqrt{10}-2}(x+2)\left(x-\left(\sqrt{10}-2\right)\right)^{2}dx=\frac1{12}\left(\sqrt{10}\right)^{3}\cdot\sqrt{10}=\frac{100}{12}=\frac{25}{3}`,
            },
            { k: "math", t: String.raw`V=\frac{25}{3}\pi` },
          ],
          check: String.raw`数値積分すると $V=26.179938780\ldots$、$\dfrac{25}{3}\pi=26.179938780\ldots$ で一致する。`,
          pitfalls: [
            String.raw`「ちょうど2つ」は判別式 $0$ のとき。$D<0$ なら $x=-2$ だけで1点になる。`,
            String.raw`$C$ が上、$\ell_t$ が下。$(x+2)(x-r)^{2}\ge0$ がそれを示している。符号を逆にしない。`,
            String.raw`与えられた公式は $b=c$ でも使える。$(x-b)(x-c)$ が2乗になるだけ。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`共有点が3つ（$x$ 座標 $\alpha<\beta<\gamma$）で、$C$ と線分 $\mathrm{PQ}$ による回転体の体積 $V_1$ と、$C$ と線分 $\mathrm{QR}$ による回転体の体積 $V_2$ が等しくなる $t$ を求める`,
          answer: String.raw`$t=3\sqrt5-6$`,
          approach: String.raw`$\alpha=-2$ で、$\beta,\gamma$ は (2) の2次方程式の2解。$C^{2}-\ell^{2}=(x+2)(x-\beta)(x-\gamma)$ なので、**2つの体積とも与えられた公式1本で書ける**。あとは和と差だけの式に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\beta,\gamma$ を $p<q$ と書く。$[-2,p]$ では $C\ge\ell_t$、$[p,q]$ では $C\le\ell_t$ なので`,
            },
            {
              k: "math",
              t: String.raw`V_1=\frac{\pi}{12}(p+2)^{3}\left(2q+2-p\right),\qquad V_2=\frac{\pi}{12}(q-p)^{3}\left(4+p+q\right)`,
            },
            {
              k: "p",
              t: String.raw`$V_1$ は公式で $a=-2,\ b=q,\ c=p$、$V_2$ は $a=p,\ b=-2,\ c=q$ として符号を直したもの。`,
            },
            {
              k: "p",
              t: String.raw`$s=p+q$、$d=q-p>0$ と置き、さらに $w=s+4$ とまとめると、$V_1=V_2$ は`,
            },
            { k: "math", t: String.raw`(w-d)^{3}(w+3d)=16\,d^{3}w` },
            { k: "p", t: String.raw`展開して $d^{4}$ で割り、$k=\dfrac wd$ と置くと` },
            {
              k: "math",
              t: String.raw`k^{4}-6k^{2}-8k-3=(k+1)^{3}(k-3)=0`,
            },
            {
              k: "p",
              t: String.raw`$p,q>-2$ より $w=p+q+4>0$、$d>0$ だから $k>0$。よって $k=3$、つまり $s+4=3(q-p)$。`,
            },
            {
              k: "p",
              t: String.raw`解と係数の関係 $p+q=2+t$、$pq=2-2t$ から $pq=6-2s$ なので $(q-p)^{2}=s^{2}+8s-24$。$q-p=\dfrac{s+4}{3}$ を入れて`,
            },
            {
              k: "math",
              t: String.raw`\frac{(s+4)^{2}}{9}=s^{2}+8s-24\ \Longrightarrow\ s^{2}+8s-29=0\ \Longrightarrow\ s=-4\pm3\sqrt5`,
            },
            {
              k: "p",
              t: String.raw`$s=2+t$ で $t>2\sqrt{10}-6$ だから $s>2.32\ldots$。$-4+3\sqrt5=2.708\ldots$ が適し、$-4-3\sqrt5$ は不適。`,
            },
            { k: "math", t: String.raw`t=s-2=3\sqrt5-6` },
          ],
          check: String.raw`$3\sqrt5-6=0.708203932\ldots$ で、(2) の範囲 $t>0.324555\ldots$ に入る。この $t$ で数値積分すると $V_1=V_2=19.634954085$ で、差は $10^{-13}$ 未満。$V_1-V_2$ を二分法で $0$ にする $t$ を探しても同じ値に着く。`,
          pitfalls: [
            String.raw`$[p,q]$ では $C$ が**下**。$V_2$ の被積分関数は $\ell_t^{2}-C^{2}$ で、公式の値に $-1$ を掛ける必要がある。`,
            String.raw`$k^{4}-6k^{2}-8k-3$ は $(k+1)^{3}(k-3)$ と因数分解できる。$k=-1$ は3重解だが、$k>0$ なので捨てる。`,
            String.raw`$s$ の2解のうち負のほうは、共有点が3つになる範囲に入らない。(2) の結果と突き合わせて捨てる。`,
          ],
        },
      ],
    },
  ],
};
