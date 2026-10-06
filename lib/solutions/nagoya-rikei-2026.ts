import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2026年度（令和8年度）一般選抜 前期日程 数学（理科系）。
 *
 * 原典は名古屋大学が自分のサイトで公開している問題紙 PDF。
 * そこに当たって大問番号・小問番号まで照合したうえで、解答はすべてこちらで解き直した。
 * 問題文・大学の出題意図・他社の解答解説は一切載せていない。
 *
 * 文中で $C$ や $P_n$ といった記号を使うのは、解答を読むのに要る範囲の言及にとどめる。
 * 設定そのものは原典のリンクから読んでもらう。
 */
export const nagoyaRikei2026: SolutionSet = {
  slug: "nagoya-rikei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "理科系",
  university: "名古屋大学",
  short: "名大理系",
  // 問題の見てもらい方は lib/solutions/sources.ts にまとめてある
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["1/x の積分", "面積", "正接の加法定理", "増減表による最小値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) $a=1,\\ b=e$ を入れて $S=1$ になることを、領域を2つに分けた直接積分で確かめた",
          "(3) 最小値が $S=\\log(1+\\sqrt2)$ という簡単な形になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`面積 $S$ を $a,\ b$ で表す`,
          answer: String.raw`$S=\log\dfrac{b}{a}$`,
          approach: String.raw`囲んでいる3本のうち2本は**原点を通る線分**なので、$x$ で切って積分すると、直線の部分がきれいに打ち消し合う。$x=a$ で2つに分けるのが素直。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A}\left(a,\frac1a\right)$ を通り原点を通る直線は $y=\dfrac{x}{a^2}$、$\mathrm{B}\left(b,\frac1b\right)$ のほうは $y=\dfrac{x}{b^2}$。$0<a<b$ より $\dfrac{1}{a^2}>\dfrac{1}{b^2}$ だから、$\mathrm{OA}$ のほうが傾きが大きい。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$0\le x\le a$ では、上が $y=\dfrac{x}{a^2}$、下が $y=\dfrac{x}{b^2}$`,
                String.raw`$a\le x\le b$ では、上が $y=\dfrac1x$、下が $y=\dfrac{x}{b^2}$`,
              ],
            },
            { k: "p", t: String.raw`よって` },
            {
              k: "math",
              t: String.raw`S=\int_0^a\left(\frac{x}{a^2}-\frac{x}{b^2}\right)dx+\int_a^b\left(\frac1x-\frac{x}{b^2}\right)dx`,
            },
            {
              k: "math",
              t: String.raw`=\frac{a^2}{2}\left(\frac{1}{a^2}-\frac{1}{b^2}\right)+\Big[\log x-\frac{x^2}{2b^2}\Big]_a^b`,
            },
            {
              k: "math",
              t: String.raw`=\frac12-\frac{a^2}{2b^2}+\left(\log b-\frac12\right)-\left(\log a-\frac{a^2}{2b^2}\right)=\log\frac{b}{a}`,
            },
            {
              k: "note",
              title: "なぜきれいに消えるか",
              t: String.raw`$\dfrac12$ と $\dfrac{a^2}{2b^2}$ が打ち消し合うのは偶然ではない。原点を通る直線と $y=\dfrac1x$ で囲む「扇形」の面積は、どこから測っても $\log(\text{比})$ になる。$a,b$ を $k$ 倍しても $S$ が変わらないことからも見当がつく。`,
            },
          ],
          check: String.raw`$a=1,\ b=e$ とすると $S=\log e=1$。実際に $\int_0^1\left(x-\frac{x}{e^2}\right)dx+\int_1^e\left(\frac1x-\frac{x}{e^2}\right)dx=\frac12\left(1-\frac{1}{e^2}\right)+\frac12+\frac{1}{2e^2}=1$ で合う。`,
          pitfalls: [
            String.raw`$x=a$ で場合を分けずに $\int_a^b\left(\frac1x-\text{（直線）}\right)dx$ だけで済ませると、$0\le x\le a$ の三角形部分が抜ける。`,
            String.raw`$\mathrm{OA}$ の式を $y=\frac{x}{a}$ と書き間違えやすい。$\mathrm{A}$ の $y$ 座標は $\frac1a$ なので傾きは $\frac{1/a}{a}=\frac{1}{a^2}$。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\theta=\dfrac{\pi}{4}$ のとき $b$ を $a$ で表す`,
          answer: String.raw`$b=\sqrt{\dfrac{1+a^2}{1-a^2}}$`,
          approach: String.raw`$\theta$ は2直線の**なす角**なので、傾きの差ではなく正接の加法定理で扱う。$\mathrm{OA},\mathrm{OB}$ が $x$ 軸の正の向きとなす角を $\alpha,\beta$ とおけば $\theta=\alpha-\beta$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\tan\alpha=\dfrac{1}{a^2},\ \tan\beta=\dfrac{1}{b^2}$ で、どちらも正。$0<a<b$ より $\tan\alpha>\tan\beta>0$ だから $0<\beta<\alpha<\dfrac{\pi}{2}$ で、$\theta=\alpha-\beta$。`,
            },
            {
              k: "math",
              t: String.raw`\tan\theta=\frac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}=\frac{\dfrac{1}{a^2}-\dfrac{1}{b^2}}{1+\dfrac{1}{a^2b^2}}=\frac{b^2-a^2}{a^2b^2+1}`,
            },
            { k: "p", t: String.raw`これが $\tan\dfrac{\pi}{4}=1$ に等しいので` },
            {
              k: "math",
              t: String.raw`b^2-a^2=a^2b^2+1\ \Longleftrightarrow\ b^2(1-a^2)=1+a^2`,
            },
            {
              k: "p",
              t: String.raw`$0<a<1$ だから $1-a^2>0$ で割れて $b^2=\dfrac{1+a^2}{1-a^2}$。$b>0$ より $b=\sqrt{\dfrac{1+a^2}{1-a^2}}$。`,
            },
            {
              k: "note",
              title: "条件 $a<b$ は自動で満たされる",
              t: String.raw`$b^2-a^2=\dfrac{1+a^2}{1-a^2}-a^2=\dfrac{1+a^4}{1-a^2}>0$ なので、この $b$ は確かに $a$ より大きい。答案ではここまで触れておくと安心。`,
            },
          ],
          pitfalls: [
            String.raw`$0<a<1$ という条件がここで効く。$a\ge1$ だと $1-a^2\le0$ となって $b$ が決まらない。問題が $a$ の範囲を切っている理由はこれ。`,
            String.raw`分母・分子に $a^2b^2$ を掛けて整理する一手を省くと、分数のまま扱って符号を間違えやすい。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\theta=\dfrac{\pi}{4}$ を保ったまま動くとき、$S$ を最小にする $a$ を求める`,
          answer: String.raw`$a=\sqrt{\sqrt2-1}$`,
          approach: String.raw`$S=\log\dfrac{b}{a}$ は $\dfrac{b}{a}$ の**増加関数**なので、$S$ を直接微分する必要はない。$\dfrac{b^2}{a^2}$ を最小にすればよく、根号も対数も消える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $\dfrac{b^2}{a^2}=\dfrac{1+a^2}{a^2(1-a^2)}$。$t=a^2$ とおくと $0<t<1$ で`,
            },
            { k: "math", t: String.raw`f(t)=\frac{1+t}{t-t^2}\qquad(0<t<1)` },
            { k: "p", t: String.raw`を最小にすればよい。` },
            {
              k: "math",
              t: String.raw`f'(t)=\frac{(t-t^2)-(1+t)(1-2t)}{(t-t^2)^2}=\frac{t^2+2t-1}{(t-t^2)^2}`,
            },
            {
              k: "p",
              t: String.raw`分母は正なので符号は $t^2+2t-1$ で決まる。$t^2+2t-1=0$ の正の解は $t=\sqrt2-1$ で、これは $0<t<1$ を満たす。$0<t<\sqrt2-1$ で $f'(t)<0$、$\sqrt2-1<t<1$ で $f'(t)>0$ だから、$t=\sqrt2-1$ で最小。`,
            },
            { k: "p", t: String.raw`$t=a^2$ かつ $a>0$ より $a=\sqrt{\sqrt2-1}$。` },
          ],
          check: String.raw`$t=\sqrt2-1$ を入れると $f(t)=\dfrac{\sqrt2}{(\sqrt2-1)(2-\sqrt2)}=\dfrac{\sqrt2}{3\sqrt2-4}=3+2\sqrt2=(1+\sqrt2)^2$。つまり $\dfrac{b}{a}=1+\sqrt2$、最小値は $S=\log(1+\sqrt2)$。ここまで簡単な形になるので、計算が合っているかの目印になる。`,
          pitfalls: [
            String.raw`$t=a^2$ とおいたら $0<t<1$ を必ず書く。$t\to0$ でも $t\to1$ でも $f(t)\to+\infty$ なので、最小値は内部でとる。`,
            String.raw`$S$ のまま $\log$ を微分しても解けるが、計算量が増える。単調性で言い換える一言を書いておくと、以降の計算が軽くなる。`,
            String.raw`$a=\sqrt{\sqrt2-1}$ を $\sqrt2-1$ と書いてしまう取り違えが多い。問われているのは $a$ であって $a^2$ ではない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "空間図形・ベクトル",
      topics: ["平面の方程式", "法線ベクトル", "直線の媒介変数表示", "符号による存在条件"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(2) の端点 $a=-2$ で D が、$a=-\\dfrac{19}{3}$ で E が平面上に乗ることを、平面の方程式へ代入して確かめた",
          "法線ベクトルの第1成分が $0$ にならないので、3点がつねに平面を定めることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面 $H$ が直線 $\mathrm{DE}$ と共有点をもつ $a$ の条件`,
          answer: String.raw`$a\neq\dfrac92$`,
          approach: String.raw`平面を方程式で、直線を媒介変数で表して代入すると、$t$ についての**1次方程式**になる。「共有点をもつ」はその方程式が解をもつこと。1次の係数が $0$ になるときだけ別に調べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec{\mathrm{CA}}=(1,1,3),\ \vec{\mathrm{CB}}=(a+1,3,4)$。法線ベクトルを $\vec n=(p,q,r)$ とおくと`,
            },
            { k: "math", t: String.raw`p+q+3r=0,\qquad (a+1)p+3q+4r=0` },
            {
              k: "p",
              t: String.raw`第1式から $q=-p-3r$。第2式に入れて $(a-2)p-5r=0$、すなわち $r=\dfrac{(a-2)p}{5}$。$p=5$ と選ぶと`,
            },
            { k: "math", t: String.raw`\vec n=(5,\ 1-3a,\ a-2)` },
            {
              k: "note",
              title: "3点はつねに平面を定める",
              t: String.raw`$\vec n$ の第1成分は $a$ によらず $5$ なので $\vec n\neq\vec 0$。つまり $\mathrm{A},\mathrm{B},\mathrm{C}$ が一直線上に並ぶことはなく、$H$ はどんな $a$ でも平面として決まる。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{C}(1,0,0)$ を通るので $H:\ 5(x-1)+(1-3a)y+(a-2)z=0$。直線 $\mathrm{DE}$ は $\vec{\mathrm{DE}}=(-2,-1,-1)$ より`,
            },
            { k: "math", t: String.raw`\mathrm{P}(t)=(-1-2t,\ 2-t,\ 1-t)\qquad(t\text{ は実数})` },
            { k: "p", t: String.raw`これを $H$ の式に代入し、左辺を $g(t)$ とおくと` },
            { k: "math", t: String.raw`g(t)=(2a-9)t-5(a+2)` },
            {
              k: "steps",
              items: [
                String.raw`$2a-9\neq0$、つまり $a\neq\dfrac92$ のとき、$t=\dfrac{5(a+2)}{2a-9}$ がただ1つ定まり、共有点をもつ`,
                String.raw`$a=\dfrac92$ のとき $g(t)=-\dfrac{65}{2}$（$t$ によらない定数）で $0$ にならず、共有点をもたない`,
              ],
            },
            { k: "p", t: String.raw`よって求める条件は $a\neq\dfrac92$。` },
          ],
          pitfalls: [
            String.raw`$1$ 次の係数が $0$ になる場合を飛ばすと、答えが「すべての実数」になってしまう。$a=\dfrac92$ は直線が $H$ と平行で、しかも $H$ 上にない場合。`,
            String.raw`$\vec n$ は定数倍の自由度があるので、$p=5$ のように**分母が払える値**を選ぶと以降の計算が楽になる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`平面 $H$ が線分 $\mathrm{DE}$（両端を含む）と共有点をもつ $a$ の条件`,
          answer: String.raw`$-\dfrac{19}{3}\le a\le-2$`,
          approach: String.raw`$g(t)$ は $t$ の1次式（または定数）なので、$0\le t\le1$ に解をもつ条件は**端点の値の符号**だけで決まる。$g(0),g(1)$ は $\mathrm{D},\mathrm{E}$ を平面の式に入れた値そのもので、符号が逆なら線分は平面を横切る。`,
          blocks: [
            { k: "math", t: String.raw`g(0)=-5(a+2),\qquad g(1)=(2a-9)-5(a+2)=-(3a+19)` },
            { k: "p", t: String.raw`求める条件は $g(0)g(1)\le0$、すなわち` },
            { k: "math", t: String.raw`5(a+2)(3a+19)\le0\ \Longleftrightarrow\ -\frac{19}{3}\le a\le-2` },
            {
              k: "note",
              title: "$a=\\dfrac92$ はちゃんと除かれている",
              t: String.raw`$g$ が定数になる $a=\dfrac92$ のときは $g(0)=g(1)=-\dfrac{65}{2}$ で積が正になるので、この不等式には含まれない。1次式と定数を分けて書かなくてよい理由がこれ。`,
            },
          ],
          alts: [
            {
              title: "$t$ を求めてから範囲を考える",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$a\neq\dfrac92$ のとき $t=\dfrac{5(a+2)}{2a-9}$ なので、$0\le\dfrac{5(a+2)}{2a-9}\le1$ を解く。$2a-9$ の符号で場合分けが要るぶん手間は増えるが、共有点の位置まで同時に分かる。`,
                },
                {
                  k: "p",
                  t: String.raw`$a<\dfrac92$ では $2a-9<0$ なので、両辺に掛けると不等号が反転して $2a-9\le5(a+2)\le0$、つまり $-\dfrac{19}{3}\le a\le-2$。$a>\dfrac92$ では $5(a+2)>0$ かつ $2a-9>0$ から $t>0$ だが $t\le1$ が $3a+19\le0$ となり、$a>\dfrac92$ と両立しない。`,
                },
              ],
            },
          ],
          check: String.raw`端点で確かめられる。$a=-2$ のとき $H:\ 5(x-1)+7y-4z=0$ に $\mathrm{D}(-1,2,1)$ を入れると $-10+14-4=0$。$a=-\dfrac{19}{3}$ のとき $H:\ 5(x-1)+20y-\dfrac{25}{3}z=0$ に $\mathrm{E}(-3,1,0)$ を入れると $-20+20=0$。どちらも端点がちょうど $H$ 上に乗る。`,
          pitfalls: [
            String.raw`「両端を含む」ので等号を入れる。$a=-2$ は $\mathrm{D}$ が、$a=-\dfrac{19}{3}$ は $\mathrm{E}$ が $H$ 上に来る場合で、どちらも共有点をもつ。`,
            String.raw`$-\dfrac{19}{3}<-2$ なので、不等式の向きを書き間違えないこと。数直線に $-6.33\ldots$ と $-2$ を取って確かめるとよい。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["互いに素", "素因数分解の一意性", "場合の数", "重複を除く数え方"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) で書き出した5組が (3) の式に $m=3$ を入れた値と一致することを確かめた",
          "(1) の5組の並べ替えの総数 $3+6+6+6+6=27$ が (2) の $3^3$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$abc=120$ かつ $a\le b\le c$ を満たす組をすべて求める`,
          answer: String.raw`$(1,1,120),\ (1,3,40),\ (1,5,24),\ (1,8,15),\ (3,5,8)$ の5組`,
          approach: String.raw`どの2つも互いに素という条件は、**素因数の分かれ方**を完全に縛る。同じ素数が2つに分かれて入ると、その2つの最大公約数がその素数以上になってしまうので、各素数のべきはまるごと1つに属する。`,
          blocks: [
            { k: "p", t: String.raw`$120=2^3\cdot3\cdot5$ なので、分けられない塊は $8,\ 3,\ 5$ の3つ。` },
            {
              k: "p",
              t: String.raw`この3つの塊を $a,b,c$ に振り分ければよい（どこにも塊が来なければその数は $1$）。塊の分け方で場合分けすると、$a\le b\le c$ に並べ替えて次のようになる。`,
            },
            {
              k: "steps",
              items: [
                String.raw`3つとも別々 … $(3,5,8)$`,
                String.raw`$8$ と $3$ を同じところへ … $(1,5,24)$`,
                String.raw`$8$ と $5$ を同じところへ … $(1,3,40)$`,
                String.raw`$3$ と $5$ を同じところへ … $(1,8,15)$`,
                String.raw`3つとも同じところへ … $(1,1,120)$`,
              ],
            },
            {
              k: "p",
              t: String.raw`いずれも積は $120$ で、どの2つも共通の素因数をもたないから条件を満たす。`,
            },
          ],
          pitfalls: [
            String.raw`$2^3$ を $2$ と $4$ に割って配ることはできない。$2$ の指数をどう分けても両方に $2$ が入り、互いに素でなくなる。`,
            String.raw`$1$ はどの数とも互いに素なので、$(1,1,120)$ も条件を満たす。「$1$ を除く」とは書かれていないので落とさない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$abc=N!$ を満たす組 $(a,b,c)$ の個数を $m$ で表す`,
          answer: String.raw`$3^m$ 個`,
          approach: String.raw`(1) と理由は同じ。$N!$ の素因数は「$N$ 以下の素数」がちょうど全部で、その個数が $m$。素数ごとに「$a,b,c$ のどこへ入れるか」を独立に選べる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$N!$ を素因数分解して $N!=p_1^{e_1}p_2^{e_2}\cdots p_m^{e_m}$ と書くと、現れる素数はちょうど $m$ 種類。どの2つも互いに素という条件から、各 $p^{e_p}$ はまるごと $a,b,c$ のどれか1つに属する。`,
            },
            {
              k: "p",
              t: String.raw`逆に、$m$ 個の塊をどう振り分けても積は $N!$ になり、2つの数が共通の素因数をもつことはないので条件を満たす。塊ごとに3通りで、選び方は独立だから`,
            },
            { k: "math", t: String.raw`3^m\ \text{個}` },
            {
              k: "note",
              title: "$e_p$ の値は答えに効かない",
              t: String.raw`指数 $e_p$ がいくつかは数えるうえで関係なく、**素数が何種類あるか**だけで決まる。$N!$ の指数を具体的に求めようとすると回り道になる。`,
            },
          ],
          pitfalls: [
            String.raw`ここで数えているのは**順序つき**の組。$(1,3,40)$ と $(3,1,40)$ は別に数えている。(3) との違いを最初に宣言しておく。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$abc=N!$ かつ $a\le b\le c$ を満たす組の個数を $m$ で表す`,
          answer: String.raw`$\dfrac{3^m+3}{6}$ 個`,
          approach: String.raw`(2) の $3^m$ 個を $6$ で割りたいが、**同じ数が混ざる組**だけは並べ替えの個数が $6$ にならない。互いに素という条件のおかげで、その例外が1種類しかないことが効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず、2つが等しいとき。$a=b$ なら $a$ と $b$ の最大公約数は $a$ で、これが $1$ だから $a=b=1$。このとき $c=N!$。`,
            },
            {
              k: "p",
              t: String.raw`次に、3つとも等しいとき。同じ理由で $a=b=c=1$ となるが、すると $abc=1$。$N\ge2$ より $N!\ge2$ なので、これは起こらない。`,
            },
            {
              k: "p",
              t: String.raw`よって例外は $\{a,b,c\}=\{1,1,N!\}$ の形だけで、順序つきでは $N!$ を置く位置の $3$ 通り。残る $3^m-3$ 個は $a,b,c$ が相異なるので、$a\le b\le c$ の組1つにつき $3!=6$ 個ずつ対応する。`,
            },
            {
              k: "math",
              t: String.raw`1+\frac{3^m-3}{6}=\frac{3^m+3}{6}`,
            },
          ],
          check: String.raw`$N=5$ とすると $N!=120$、$5$ 以下の素数は $2,3,5$ で $m=3$。$\dfrac{3^3+3}{6}=5$ となり、(1) で書き出した5組と一致する。順序つきでも $3+6+6+6+6=27=3^3$ で (2) と合う。`,
          pitfalls: [
            String.raw`「どの2つも互いに素」だから、等しい2つがあればその値は $1$。この一歩を踏むと、重複する場合が1種類に絞れる。`,
            String.raw`$N\ge2$ より $N!\ge2$ であることを書いておかないと、$a=b=c=1$ の場合の処理が抜ける。`,
            String.raw`$\dfrac{3^m}{6}$ としてしまうと整数にならない。$3^m$ は奇数なので、割り切れないこと自体が検算になる。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "確率・漸化式",
      topics: ["確率漸化式", "対称性", "3項間漸化式", "数学的帰納法", "特性方程式"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "$P_1,P_2,P_3$ を (2) の漸化式からと場合分けの直接計算からの両方で出し、一致を確かめた",
          "(3) の漸化式で $P_4=\\dfrac{41}{81}$ を出し、$a_4,b_4$ からの直接計算と一致を確かめた",
          "$\\alpha=\\dfrac{1+\\sqrt2}{3}$ が $9x^2-6x-1=0$ の解であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$P_1,\ P_2,\ P_3$ を求める`,
          answer: String.raw`$P_1=1,\quad P_2=\dfrac79,\quad P_3=\dfrac{17}{27}$`,
          approach: String.raw`座標を2つとも追うと場合が増えるが、条件に出てくるのは $y-x$ だけ。**$d=y-x$ の1次元の動き**に読み替えると、3通りの移動がそのまま $d$ の $-1,\ 0,\ +1$ に対応する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`時刻 $n$ での点 $\mathrm{A}$ の座標を $(x_n,y_n)$、$d_n=y_n-x_n$ とおく。3つの移動はそれぞれ`,
            },
            {
              k: "steps",
              items: [
                String.raw`$(x+1,y)$ へ … $d$ は $1$ 減る`,
                String.raw`$(x+1,y+1)$ へ … $d$ は変わらない`,
                String.raw`$(x,y+1)$ へ … $d$ は $1$ 増える`,
              ],
            },
            {
              k: "p",
              t: String.raw`どれも確率 $\dfrac13$ で、$d_0=0$。条件 $(*)$ は「$d_0,d_1,\dots,d_n$ がすべて $-1,0,1$ のいずれか」と言い換えられる。`,
            },
            {
              k: "p",
              t: String.raw`$d_1$ は $-1,0,1$ のいずれかなので $P_1=1$。$P_2$ は $d_1$ で分けて`,
            },
            {
              k: "math",
              t: String.raw`P_2=\underbrace{\frac13\cdot1}_{d_1=0}+\underbrace{\frac13\cdot\frac23}_{d_1=1}+\underbrace{\frac13\cdot\frac23}_{d_1=-1}=\frac13+\frac29+\frac29=\frac79`,
            },
            {
              k: "p",
              t: String.raw`$P_3$ は (2) の $a_n,b_n$ を使うのが速い。$a_1=\dfrac13,\ b_1=\dfrac23$ から $a_2=\dfrac13,\ b_2=\dfrac49$、さらに $a_3=\dfrac7{27},\ b_3=\dfrac{10}{27}$ となり`,
            },
            { k: "math", t: String.raw`P_3=a_3+b_3=\frac{7}{27}+\frac{10}{27}=\frac{17}{27}` },
          ],
          pitfalls: [
            String.raw`$d_1=1$ から次に $d=2$ へ出てしまう確率が $\dfrac13$ ある。この「はみ出す枝」を落とすと $P_2=1$ になってしまう。`,
            String.raw`$P_n$ は「時刻 $n$ まで**ずっと**条件内」であって「時刻 $n$ で条件内」ではない。途中で一度でも出たらその先は数えない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$a_{n+1},\ b_{n+1}$ を $a_n,\ b_n$ で表す`,
          answer: String.raw`$a_{n+1}=\dfrac13 a_n+\dfrac13 b_n,\qquad b_{n+1}=\dfrac23 a_n+\dfrac13 b_n$`,
          approach: String.raw`$d_n=1$ と $d_n=-1$ をひとまとめに $b_n$ としてよいのは、移動のルールが $d$ の符号について**左右対称**だから。この一言を書いておくと、$2$ 状態で話が閉じる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$d_n=0$（寄与 $a_n$）からは、次の $3$ 通りがすべて条件内。$d_{n+1}=0$ になるのは $1$ 通りで $\dfrac13a_n$、$d_{n+1}=\pm1$ になるのは $2$ 通りで $\dfrac23a_n$。`,
            },
            {
              k: "p",
              t: String.raw`$d_n=1$ からは次が $0,1,2$ で、$2$ は条件外。$d_{n+1}=0$ が $\dfrac13$、$d_{n+1}=1$ が $\dfrac13$。$d_n=-1$ も対称に同じなので、まとめて $b_n$ から $d_{n+1}=0$ へ $\dfrac13b_n$、$d_{n+1}=\pm1$ へ $\dfrac13b_n$。`,
            },
            {
              k: "math",
              t: String.raw`a_{n+1}=\frac13a_n+\frac13b_n,\qquad b_{n+1}=\frac23a_n+\frac13b_n`,
            },
          ],
          check: String.raw`$a_1=\dfrac13,b_1=\dfrac23$ から順に計算すると $a_2=\dfrac13,b_2=\dfrac49$、$a_3=\dfrac7{27},b_3=\dfrac{10}{27}$。和はそれぞれ $\dfrac79,\dfrac{17}{27}$ で (1) と合う。`,
          pitfalls: [
            String.raw`$b_n$ は $d_n=1$ と $d_n=-1$ の確率の**和**なので、$b_n$ から $d_{n+1}=1$ へ移る確率は $\dfrac23b_n$ ではなく $\dfrac13b_n$。$d_n=1$ からしか $d_{n+1}=1$ へは行けない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$P_{n+2}$ を $P_{n+1},\ P_n$ で表す`,
          answer: String.raw`$P_{n+2}=\dfrac23P_{n+1}+\dfrac19P_n$`,
          approach: String.raw`$P_n=a_n+b_n$ なので、(2) の2式を足して $P$ だけの関係に直す。$a_n,b_n$ を $P_n,P_{n+1}$ で書き戻すのが要領。`,
          blocks: [
            { k: "p", t: String.raw`(2) の2式を足すと` },
            { k: "math", t: String.raw`P_{n+1}=a_{n+1}+b_{n+1}=a_n+\frac23b_n\qquad\cdots(\mathrm{i})` },
            {
              k: "p",
              t: String.raw`$a_n+b_n=P_n$ と合わせて $b_n=3(P_n-P_{n+1}),\ a_n=3P_{n+1}-2P_n$。これを (2) に入れると`,
            },
            {
              k: "math",
              t: String.raw`a_{n+1}=\frac13(a_n+b_n)=\frac13P_n,\qquad b_{n+1}=\frac23a_n+\frac13b_n=P_{n+1}-\frac13P_n`,
            },
            { k: "p", t: String.raw`$(\mathrm{i})$ を $n+1$ で使って` },
            {
              k: "math",
              t: String.raw`P_{n+2}=a_{n+1}+\frac23b_{n+1}=\frac13P_n+\frac23\left(P_{n+1}-\frac13P_n\right)=\frac23P_{n+1}+\frac19P_n`,
            },
          ],
          check: String.raw`$n=1$ とすると $P_3=\dfrac23\cdot\dfrac79+\dfrac19\cdot1=\dfrac{14}{27}+\dfrac3{27}=\dfrac{17}{27}$ で (1) と合う。さらに $P_4=\dfrac23\cdot\dfrac{17}{27}+\dfrac19\cdot\dfrac79=\dfrac{41}{81}$ となり、$a_4=\dfrac{17}{81},b_4=\dfrac{24}{81}$ からの直接計算とも一致する。`,
          pitfalls: [
            String.raw`$(\mathrm{i})$ は $P_{n+1}$ を $a_n,b_n$ で表した式で、$P_n=a_n+b_n$ とは係数が違う。この $\dfrac23$ の違いが $b_n$ を取り出す鍵になる。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$\alpha=\dfrac{1+\sqrt2}{3}$ のとき $P_n\le\alpha^{n-1}$ をすべての $n\ge1$ で示す`,
          answer: String.raw`$n=1,2$ を出発点に、(3) の漸化式と $\alpha^2=\dfrac23\alpha+\dfrac19$ を使った数学的帰納法で示せる`,
          approach: String.raw`$\alpha$ は (3) の漸化式の**特性方程式 $9x^2-6x-1=0$ の解**。これに気づくと、帰納法の1歩が一行で終わる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`まず $9\alpha^2=(1+\sqrt2)^2=3+2\sqrt2$ と $6\alpha+1=2(1+\sqrt2)+1=3+2\sqrt2$ が等しいので`,
            },
            { k: "math", t: String.raw`\alpha^2=\frac23\alpha+\frac19\qquad\cdots(\mathrm{ii})` },
            { k: "p", t: String.raw`**出発点。** $n=1$ は $P_1=1=\alpha^0$ で成立。$n=2$ は` },
            {
              k: "math",
              t: String.raw`P_2=\frac79\le\alpha=\frac{1+\sqrt2}{3}\ \Longleftrightarrow\ \frac43\le\sqrt2\ \Longleftrightarrow\ \frac{16}{9}\le2`,
            },
            { k: "p", t: String.raw`より成立。` },
            {
              k: "p",
              t: String.raw`**帰納の1歩。** $P_n\le\alpha^{n-1}$ と $P_{n+1}\le\alpha^{n}$ を仮定する。(3) の係数 $\dfrac23,\dfrac19$ はともに正なので不等号の向きが保たれ`,
            },
            {
              k: "math",
              t: String.raw`P_{n+2}=\frac23P_{n+1}+\frac19P_n\le\frac23\alpha^{n}+\frac19\alpha^{n-1}=\alpha^{n-1}\left(\frac23\alpha+\frac19\right)`,
            },
            { k: "p", t: String.raw`$(\mathrm{ii})$ よりこれは $\alpha^{n-1}\cdot\alpha^2=\alpha^{n+1}$ に等しい。よって $P_{n+2}\le\alpha^{(n+2)-1}$。` },
            {
              k: "p",
              t: String.raw`以上より、すべての $n\ge1$ で $P_n\le\alpha^{n-1}$ が成り立つ。`,
            },
          ],
          check: String.raw`$\alpha=0.8047\ldots$ なので $\alpha^3=0.5211\ldots$。一方 $P_4=\dfrac{41}{81}=0.5061\ldots$ で、確かに $P_4\le\alpha^3$。$n$ が大きいほど両者の比は一定に近づく（$\alpha$ が特性方程式の大きいほうの解だから）。`,
          pitfalls: [
            String.raw`2つ前まで使う漸化式なので、出発点は $n=1$ と $n=2$ の**両方**が要る。$n=1$ だけだと回らない。`,
            String.raw`$P_2\le\alpha$ は数値で「だいたい $0.78<0.80$」と書くのではなく、$\dfrac{16}{9}\le2$ まで有理数に落として示す。`,
            String.raw`$\alpha$ がどこから来た数かに触れずに計算だけ進めると、$(\mathrm{ii})$ が天下りに見える。特性方程式の解であることを一言添える。`,
          ],
        },
      ],
    },
  ],
};
