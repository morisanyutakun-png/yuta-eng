import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2026年度（令和8年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 名古屋市立大学はこの年度の問題PDFを公開しているので、そこへリンクしている。
 */
export const ncuMed2026: SolutionSet = {
  slug: "ncu-med",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル",
      topics: ["平面の法線ベクトル", "垂線の足", "四面体の体積", "4点を通る球面"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{H}$ を「平面 $\\mathrm{OBC}$ 上で $\\mathrm{A}$ に最も近い点」として数値探索し、$\\left(\\frac{31}{11},\\frac{20}{11},\\frac{17}{11}\\right)$ と一致することを確かめた",
          "体積 $3$ を、行列式・$\\frac13\\times$底面$\\times$高さ・モンテカルロ法の3通りで確かめた",
          "球面の式に $\\mathrm{O},\\mathrm{A},\\mathrm{B},\\mathrm{C}$ を分数のまま代入し、残差が厳密に $0$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面 $\mathrm{OBC}$ に $\mathrm{A}$ から下ろした垂線の足 $\mathrm{H}$ の座標を求める`,
          answer: String.raw`$\mathrm{H}\left(\dfrac{31}{11},\ \dfrac{20}{11},\ \dfrac{17}{11}\right)$`,
          approach: String.raw`平面が**原点を通る**ので、法線 $\vec n$ さえ出れば平面の式は $\vec n\cdot\vec x=0$ と定数項なしで書ける。$\mathrm{H}$ は $\mathrm{A}$ から $\vec n$ 方向に進んだ点なので、文字は1つで足りる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec n=(a,b,c)$ が $\vec{\mathrm{OB}}=(3,0,1)$、$\vec{\mathrm{OC}}=(1,2,1)$ の両方と垂直だから`,
            },
            { k: "math", t: String.raw`3a+c=0,\qquad a+2b+c=0` },
            {
              k: "p",
              t: String.raw`1本目から $c=-3a$。2本目に入れて $a+2b-3a=0$、$b=a$。$a=1$ として $\vec n=(1,1,-3)$。平面 $\mathrm{OBC}$ は`,
            },
            { k: "math", t: String.raw`x+y-3z=0` },
            {
              k: "p",
              t: String.raw`$\mathrm{H}=\mathrm{A}+t\vec n=(2+t,\ 1+t,\ 4-3t)$ を代入すると`,
            },
            {
              k: "math",
              t: String.raw`(2+t)+(1+t)-3(4-3t)=11t-9=0\ \Longrightarrow\ t=\frac{9}{11}`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{H}\left(\frac{31}{11},\ \frac{20}{11},\ \frac{17}{11}\right)`,
            },
          ],
          check: String.raw`$\dfrac{31}{11}+\dfrac{20}{11}-3\cdot\dfrac{17}{11}=\dfrac{31+20-51}{11}=0$ で、確かに平面上にある。`,
          pitfalls: [
            String.raw`平面が原点を通るので定数項は $0$。$\mathrm{B},\mathrm{C}$ を代入して確かめておくと安心（$3+0-3=0$、$1+2-3=0$）。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\triangle\mathrm{OBC}$ の面積と四面体 $\mathrm{OABC}$ の体積を求める`,
          answer: String.raw`$\triangle\mathrm{OBC}=\sqrt{11}$、体積 $=3$`,
          approach: String.raw`面積は $\frac12\sqrt{|\vec b|^{2}|\vec c|^{2}-(\vec b\cdot\vec c)^{2}}$。体積は (1) で出した $\mathrm{AH}$ をそのまま高さに使えば、新しい計算はほとんど要らない。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$|\vec{\mathrm{OB}}|^{2}=10$、$|\vec{\mathrm{OC}}|^{2}=6$、$\vec{\mathrm{OB}}\cdot\vec{\mathrm{OC}}=3+0+1=4$ なので`,
            },
            {
              k: "math",
              t: String.raw`\triangle\mathrm{OBC}=\frac12\sqrt{10\cdot6-4^{2}}=\frac12\sqrt{44}=\sqrt{11}`,
            },
            {
              k: "p",
              t: String.raw`高さは $\mathrm{AH}=|t|\,|\vec n|=\dfrac{9}{11}\sqrt{11}=\dfrac{9}{\sqrt{11}}$。`,
            },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot\sqrt{11}\cdot\frac{9}{\sqrt{11}}=3`,
            },
          ],
          check: String.raw`$\sqrt{11}$ が約分で消えて整数になる。別ルートとして $V=\dfrac16\left|\det\left(\vec{\mathrm{OA}},\vec{\mathrm{OB}},\vec{\mathrm{OC}}\right)\right|=\dfrac{18}{6}=3$ でも同じ。`,
          pitfalls: [
            String.raw`$\sqrt{11}$ と $\dfrac{9}{\sqrt{11}}$ を別々に小数にしてから掛けない。約分すれば整数になる。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ を通る球面の方程式を求める`,
          answer: String.raw`$x^{2}+y^{2}+z^{2}-\dfrac{17}{9}x+\dfrac19y-\dfrac{13}{3}z=0$（中心 $\left(\dfrac{17}{18},-\dfrac{1}{18},\dfrac{13}{6}\right)$、半径 $\dfrac{\sqrt{1811}}{18}$）`,
          approach: String.raw`中心と半径を未知数に置くより、**一般形 $x^{2}+y^{2}+z^{2}+px+qy+rz+s=0$ に置くほうが式が1次になる**。原点を通るので $s=0$ が即決まり、未知数は3つで済む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O}$ を通るから $s=0$。残り3点を入れて`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\mathrm{A}(2,1,4)$ … $21+2p+q+4r=0$`,
                String.raw`$\mathrm{B}(3,0,1)$ … $10+3p+r=0$`,
                String.raw`$\mathrm{C}(1,2,1)$ … $6+p+2q+r=0$`,
              ],
            },
            {
              k: "p",
              t: String.raw`2本目から $r=-10-3p$。3本目に入れて $6+p+2q-10-3p=0$、つまり $q=p+2$。1本目に入れると`,
            },
            {
              k: "math",
              t: String.raw`21+2p+(p+2)+4(-10-3p)=-17-9p=0\ \Longrightarrow\ p=-\frac{17}{9}`,
            },
            {
              k: "math",
              t: String.raw`q=-\frac{17}{9}+2=\frac19,\qquad r=-10+\frac{17}{3}=-\frac{13}{3}`,
            },
            {
              k: "p",
              t: String.raw`分母を払って $9(x^{2}+y^{2}+z^{2})-17x+y-39z=0$ と書いてもよい。平方完成すると中心と半径が出る。`,
            },
            {
              k: "math",
              t: String.raw`\left(x-\frac{17}{18}\right)^{2}+\left(y+\frac1{18}\right)^{2}+\left(z-\frac{13}{6}\right)^{2}=\frac{1811}{324}`,
            },
          ],
          check: String.raw`中心から4点までの距離の2乗はどれも $\dfrac{1811}{324}$。たとえば $\mathrm{O}$ なら $\left(\dfrac{17}{18}\right)^{2}+\left(\dfrac1{18}\right)^{2}+\left(\dfrac{13}{6}\right)^{2}=\dfrac{289+1+1521}{324}=\dfrac{1811}{324}$。`,
          pitfalls: [
            String.raw`中心 $(X,Y,Z)$ と半径 $R$ を直接置くと、4本とも2次式になって手間が増える。一般形なら $p,q,r,s$ について1次。`,
            String.raw`$1811$ は素数なので、根号はこれ以上簡単にならない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "場合の数",
      topics: ["正六面体の塗り分け", "回転による重複", "向かい合う面", "使う色数で分ける"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$6^{6}=46656$ 通りを全探索し、隣り合う面が異なるものを回転24通りで正規化して数えた結果が (1) 30、(2) 230 と一致した",
          "ラベル付きの正当な塗り分けが $4080$ 通りであること、バーンサイドの内訳が $4080+3\\times480$ であることも全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`6色すべてを使って正六面体の面を塗り分ける方法の総数を求める`,
          answer: String.raw`$30$ 通り`,
          approach: String.raw`6色すべてを使うなら6面の色は**全部違う**。だから「隣り合う面は異なる色」という条件は自動的にみたされ、考えるのは回転による重複だけになる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`面に名前をつけて塗る方法は $6!=720$ 通り。6色すべて違うので、**どの回転も塗り方を変えてしまう**（ある面の色が別の色の面に移るので、同じ塗り方には戻らない）。`,
            },
            {
              k: "p",
              t: String.raw`つまり $720$ 通りが、回転24通りずつのグループにきれいに分かれる。`,
            },
            { k: "math", t: String.raw`\frac{6!}{24}=\frac{720}{24}=30` },
          ],
          alts: [
            {
              title: "固定して数える",
              blocks: [
                {
                  k: "p",
                  t: String.raw`1色（たとえば赤）を上の面に固定する。向かい合う下の面は残り5色から選べて $5$ 通り。`,
                },
                {
                  k: "p",
                  t: String.raw`側面の4色は、残り4色を円形に並べる問題。上下軸まわりの回転4通りで重なるので $\dfrac{4!}{4}=3!=6$ 通り。`,
                },
                { k: "math", t: String.raw`5\times6=30` },
              ],
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{6!}{24}$ が使えるのは「どの回転でも塗り方が変わらないものが1つもない」ときだけ。色がすべて異なるこの小問では成り立つが、(2) ではそうならない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`6色のうち何色かを使って正六面体の面を塗り分ける方法の総数を求める`,
          answer: String.raw`$230$ 通り`,
          approach: String.raw`隣り合う面が異なる、とは「**向かい合う面だけが同じ色でよい**」ということ。だから3組の向かい合う面を単位にして考えると、条件がきれいに言い換わる。重複は回転で起きるので、固定した塗り方を数えて回転で割る（バーンサイドの考え方）。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正六面体の面は、向かい合う3組に分かれる。ある面は、自分の向かいを除く4面すべてと隣り合う。よって条件は`,
            },
            {
              k: "note",
              title: "条件の言い換え",
              t: String.raw`**異なる組に属する面どうしは必ず色が違う。同じ組（向かい合う2面）だけは、同じ色でも違う色でもよい。**`,
            },
            {
              k: "p",
              t: String.raw`まず面に名前をつけたまま数える。2色使う組の個数を $a\ (=0,1,2,3)$ とすると、使う色数は $3+a$ 色で、色を入れる場所も $3+a$ か所。どの組を2色にするかが $ {}_3\mathrm{C}_a$ 通り、色の入れ方が $6\cdot5\cdots(6-(3+a)+1)$ 通りだから`,
            },
            {
              k: "math",
              t: String.raw`\sum_{a=0}^{3}{}_3\mathrm{C}_a\cdot\frac{6!}{(3-a)!}=120+3\cdot360+3\cdot720+720=4080`,
            },
            {
              k: "p",
              t: String.raw`次に回転24通りのそれぞれについて、「その回転で変わらない塗り方」がいくつあるかを見る。`,
            },
            {
              k: "steps",
              items: [
                String.raw`恒等変換（1通り）… $4080$ 通りすべてが変わらない`,
                String.raw`面の中心を通る軸まわり $90^\circ,270^\circ$（6通り）… 側面4枚が同じ色になるが、側面どうしは隣り合うので不可。$0$`,
                String.raw`面の中心を通る軸まわり $180^\circ$（3通り）… 側面が向かい合う2枚ずつ同色になる。これは許される。軸上の2面が1組、同色になった側面が2組ぶんで、$120+360=480$ 通り`,
                String.raw`頂点を通る軸まわり $120^\circ,240^\circ$（8通り）… 隣り合う3面が同色になるので不可。$0$`,
                String.raw`辺の中点を通る軸まわり $180^\circ$（6通り）… 隣り合う2面が入れ替わって同色になるので不可。$0$`,
              ],
            },
            { k: "math", t: String.raw`\frac{4080+3\times480}{24}=\frac{5520}{24}=230` },
          ],
          check: String.raw`使う色数ごとに分けると、ちょうど3色が $20$、4色が $90$、5色が $90$、6色が $30$ で、合計 $20+90+90+30=230$。最後の $30$ は (1) の答えと一致する。`,
          alts: [
            {
              title: "使う色数ごとに数える",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$3+a$ 色を使う塗り方だけを取り出して、それぞれ回転で割る方法もある。$a=3$（6色）のときが (1) の $30$ 通り。`,
                },
                {
                  k: "p",
                  t: String.raw`ただし $a\le2$ のときは「回転しても変わらない塗り方」が現れるので、単純に $24$ で割れない。結局はバーンサイドを使うことになる。上の解き方のほうが見通しがよい。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`「6色のうち何色か」なので、**1色だけ・2色だけ**も候補に入れて考える。ただし隣り合う面が異なるという条件から、実際には3色以上必要（向かい合う3組の色は互いに違うため）。`,
            String.raw`$\dfrac{4080}{24}=170$ としてはいけない。回転で変わらない塗り方があるので、単純に割ると足りなくなる。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "数列・整数",
      topics: ["階差数列", "和の消し合い", "素数になる条件", "積が素数になるのは片方が1のとき"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$a_n=m^{n}-nm$ が漸化式をみたすことを、$m=1,\\dots,5$・$n\\le12$ で数値的に確かめた",
          "$a_9=494$ をみたす $m$ が $2$ だけであることを $m\\le199$ の全探索で確かめた",
          "素数の項をもつ $m$ が $2,3$ だけであることを $m\\le499$・$n\\le39$ の全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`数列 $\{a_n\}$ の一般項を求める`,
          answer: String.raw`$a_n=m^{n}-nm$`,
          approach: String.raw`$a_{n+1}-a_n$ が与えられているので階差数列。足し合わせるとき、$m^{j+1}-m^{j}$ の部分が**次々に消し合う**ことに気づけば一瞬で終わる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`a_n=a_1+\sum_{j=1}^{n-1}\left(m^{j+1}-m^{j}-m\right)\qquad(n\ge2)`,
            },
            {
              k: "p",
              t: String.raw`$\displaystyle\sum_{j=1}^{n-1}\left(m^{j+1}-m^{j}\right)$ は、$m^{2}-m,\ m^{3}-m^{2},\ \ldots$ と並べると間が消えて $m^{n}-m$ だけが残る。残りの $-m$ は $n-1$ 個ぶん。`,
            },
            {
              k: "math",
              t: String.raw`a_n=0+\left(m^{n}-m\right)-(n-1)m=m^{n}-nm`,
            },
            { k: "p", t: String.raw`$n=1$ でも $m-m=0=a_1$ なので、この式は $n\ge1$ で使える。` },
          ],
          check: String.raw`$a_2=m^{2}-2m$。漸化式からは $a_2=a_1+m^{2}-m-m=m^{2}-2m$ で一致する。$a_3=m^{3}-3m$ も同様。`,
          pitfalls: [
            String.raw`階差の和は $n-1$ 項ぶん。$n$ 項と書くと $m$ の係数がずれる。`,
            String.raw`最後に $n=1$ を入れて $a_1$ に戻ることを確かめる。階差から出した式は $n\ge2$ でしか保証されない。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$a_9=494$ をみたす正の整数 $m$ を求める`,
          answer: String.raw`$m=2$`,
          approach: String.raw`$m^{9}$ は $m$ が1増えただけで桁が跳ね上がる。だから**候補はごく小さい $m$ しかない**ことを先に押さえると、調べる範囲が一瞬で決まる。`,
          blocks: [
            { k: "math", t: String.raw`m^{9}-9m=494` },
            {
              k: "steps",
              items: [
                String.raw`$m=1$ … $1-9=-8$ で小さすぎる`,
                String.raw`$m=2$ … $512-18=494$ ✓`,
                String.raw`$m=3$ … $19683-27=19656$ で大きすぎる`,
                String.raw`$m\ge3$ では $m^{9}-9m$ は増える一方なので、これ以上は $494$ にならない`,
              ],
            },
            { k: "p", t: String.raw`よって $m=2$。` },
          ],
          check: String.raw`$2^{9}=512$、$9\times2=18$、$512-18=494$。`,
          pitfalls: [
            String.raw`$m\ge3$ を「大きいから」で切るときは、$m^{9}-9m$ が $m$ について増加することを一言添える。$m\ge2$ なら $m^{9}$ の伸びが $9m$ を大きく上回る。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\{a_n\}$ に素数である項が含まれるような正の整数 $m$ を求める`,
          answer: String.raw`$m=2,\ 3$`,
          approach: String.raw`$a_n=m\left(m^{n-1}-n\right)$ と**因数分解できる**ことが鍵。積が素数になるのは、片方が $1$ でもう片方が素数のときに限る。`,
          blocks: [
            { k: "math", t: String.raw`a_n=m^{n}-nm=m\left(m^{n-1}-n\right)` },
            {
              k: "p",
              t: String.raw`$m=1$ なら $a_n=1-n\le0$ で、素数になりえない。以下 $m\ge2$ とする。`,
            },
            {
              k: "p",
              t: String.raw`$m\ge2$ のとき、$a_n$ が素数なら $m$ は $a_n$ の約数で $1$ でないから、もう一方が $1$ でなければならない。`,
            },
            {
              k: "math",
              t: String.raw`m^{n-1}-n=1\quad\text{かつ}\quad m\ \text{は素数}`,
            },
            { k: "p", t: String.raw`$m^{n-1}=n+1$ をみたす正の整数の組を探す。` },
            {
              k: "steps",
              items: [
                String.raw`$n=1$ … $m^{0}=1$ だが $n+1=2$。不適`,
                String.raw`$n=2$ … $m=3$ ✓`,
                String.raw`$n=3$ … $m^{2}=4$ より $m=2$ ✓`,
                String.raw`$n\ge4$ … $m\ge2$ なので $m^{n-1}\ge2^{n-1}>n+1$。不適`,
              ],
            },
            {
              k: "p",
              t: String.raw`$m=3$ は素数で、このとき $a_2=9-6=3$。$m=2$ も素数で、$a_3=8-6=2$。どちらも確かに素数。`,
            },
            { k: "p", t: String.raw`以上より $m=2,\ 3$。` },
          ],
          check: String.raw`$m=4$ なら $a_n=4\left(4^{n-1}-n\right)$ で、$4$ が素数でないから常に合成数（または $0$ 以下）。$m=5$ なら $5^{n-1}-n=1$ をみたす $n$ がない。`,
          pitfalls: [
            String.raw`$m$ が素数であることまで要る。$m^{n-1}-n=1$ だけでは $a_n=m$ が素数とは言えない。`,
            String.raw`$2^{n-1}>n+1$ が $n\ge4$ で成り立つことは、$n=4$ で $8>5$ を示したうえで帰納法か、$2^{n-1}$ の増え方で押さえる。`,
            String.raw`$m^{n-1}-n$ が負や $0$ になる場合も、素数にならないことを確認しておく。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "微分積分",
      topics: ["差をとると簡単になる関数", "和積の公式", "望遠鏡和", "無限級数の和"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$f_k-f_{k-1}=\\cos kx$ を、$k\\le14$・$x\\in[1,\\pi]$ の51点で数値的に確かめた（最大誤差 $5\\times10^{-15}$）",
          "$\\sum_{k=1}^{n}\\frac{\\sin k}{k}=\\frac{\\pi-1}{2}-I_n$ を、$n=1,3,7,20$ について数値積分で確かめた",
          "$I_n$ が $n=10,50,200,800$ で $0$ に近づくことと、級数の40万項の和が $\\frac{\\pi-1}{2}$ に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正の整数 $k$ について $f_k(x)-f_{k-1}(x)$ を計算する`,
          answer: String.raw`$f_k(x)-f_{k-1}(x)=\cos kx$`,
          approach: String.raw`分母が共通なので、分子の $\sin$ の差に**和積の公式**を当てる。分母の $\sin\frac{x}{2}$ がそのまま約分されるように作られている。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\sin A-\sin B=2\cos\dfrac{A+B}{2}\sin\dfrac{A-B}{2}$ に $A=\dfrac{(2k+1)x}{2}$、$B=\dfrac{(2k-1)x}{2}$ を入れる。$\dfrac{A+B}{2}=kx$、$\dfrac{A-B}{2}=\dfrac{x}{2}$ だから`,
            },
            {
              k: "math",
              t: String.raw`\sin\frac{(2k+1)x}{2}-\sin\frac{(2k-1)x}{2}=2\cos kx\,\sin\frac{x}{2}`,
            },
            {
              k: "math",
              t: String.raw`f_k(x)-f_{k-1}(x)=\frac{2\cos kx\,\sin\frac{x}{2}}{2\sin\frac{x}{2}}=\cos kx`,
            },
            {
              k: "note",
              title: "分母が消せる理由",
              t: String.raw`$1\le x\le\pi$ では $\dfrac12\le\dfrac{x}{2}\le\dfrac{\pi}{2}$ なので $\sin\dfrac{x}{2}\ge\sin\dfrac12>0$。$0$ で割る心配がないことを、約分の前に断っておく。`,
            },
          ],
          check: String.raw`$k=1$、$x=\dfrac{\pi}{2}$ で左辺は $\dfrac{\sin\frac{3\pi}{4}}{2\sin\frac{\pi}{4}}-\dfrac{\sin\frac{\pi}{4}}{2\sin\frac{\pi}{4}}=\dfrac12-\dfrac12=0$、右辺は $\cos\dfrac{\pi}{2}=0$ で一致。`,
          pitfalls: [
            String.raw`$f_0(x)=\dfrac{\sin\frac{x}{2}}{2\sin\frac{x}{2}}=\dfrac12$ という**定数**になる。これが (2) で効く。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\sum_{k=1}^{n}\frac{\sin k}{k}$ を $I_n$ で表す`,
          answer: String.raw`$\displaystyle\sum_{k=1}^{n}\frac{\sin k}{k}=\frac{\pi-1}{2}-I_n$`,
          approach: String.raw`(1) の両辺を $1$ から $\pi$ まで積分する。左辺を $k=1$ から $n$ まで足すと**途中が消えて $I_n-I_0$ だけ残り**、右辺からは $\dfrac{\sin k}{k}$ が出てくる。`,
          blocks: [
            { k: "p", t: String.raw`まず右辺を積分する。$\sin k\pi=0$ に注意して` },
            {
              k: "math",
              t: String.raw`\int_{1}^{\pi}\cos kx\,dx=\left[\frac{\sin kx}{k}\right]_{1}^{\pi}=\frac{\sin k\pi-\sin k}{k}=-\frac{\sin k}{k}`,
            },
            { k: "p", t: String.raw`左辺を $k=1$ から $n$ まで足すと、間の項が消えて` },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{n}\int_{1}^{\pi}\left\{f_k(x)-f_{k-1}(x)\right\}dx=I_n-I_0`,
            },
            {
              k: "p",
              t: String.raw`$f_0(x)=\dfrac12$ だから $I_0=\displaystyle\int_{1}^{\pi}\frac12\,dx=\frac{\pi-1}{2}$。したがって`,
            },
            {
              k: "math",
              t: String.raw`I_n-\frac{\pi-1}{2}=-\sum_{k=1}^{n}\frac{\sin k}{k}\ \Longrightarrow\ \sum_{k=1}^{n}\frac{\sin k}{k}=\frac{\pi-1}{2}-I_n`,
            },
          ],
          check: String.raw`$n=1$ なら左辺は $\sin1=0.8414709848\ldots$。右辺は $\dfrac{\pi-1}{2}=1.0707963\ldots$ から $I_1$ を引いた値で、数値積分すると同じ値になる。`,
          pitfalls: [
            String.raw`$I_0$ を忘れない。足し合わせで残るのは $I_n-I_0$ であって $I_n$ ではない。`,
            String.raw`$\displaystyle\int_1^{\pi}\cos kx\,dx$ の下端は $1$ であって $0$ ではない。ここから $\sin k$ が出る。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}I_n$ を求める`,
          answer: String.raw`$0$`,
          approach: String.raw`$I_n$ は「なめらかで有界な関数 $\times$ 激しく振動する $\sin$」の積分。部分積分で振動する側を1回移すと、$\dfrac{1}{n}$ の大きさに落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$g(x)=\dfrac{1}{2\sin\frac{x}{2}}$、$\lambda=\dfrac{2n+1}{2}$ と置くと $I_n=\displaystyle\int_{1}^{\pi}g(x)\sin\lambda x\,dx$。`,
            },
            {
              k: "p",
              t: String.raw`$1\le x\le\pi$ で $\sin\dfrac{x}{2}\ge\sin\dfrac12>0$ だから、$g$ はこの区間で連続かつ微分可能で、$g$ も $g'$ も有界。部分積分すると`,
            },
            {
              k: "math",
              t: String.raw`I_n=\left[-\frac{g(x)\cos\lambda x}{\lambda}\right]_{1}^{\pi}+\frac1\lambda\int_{1}^{\pi}g'(x)\cos\lambda x\,dx`,
            },
            {
              k: "p",
              t: String.raw`$|g|\le M$、$|g'|\le M'$ とすると`,
            },
            {
              k: "math",
              t: String.raw`|I_n|\le\frac{2M}{\lambda}+\frac{M'(\pi-1)}{\lambda}\xrightarrow[n\to\infty]{}0`,
            },
            { k: "p", t: String.raw`よって $\displaystyle\lim_{n\to\infty}I_n=0$。` },
          ],
          check: String.raw`数値積分すると $I_{10}=-0.0537$、$I_{50}=0.0202$、$I_{200}=0.0044$、$I_{800}=-0.0011$。符号は振れながら、大きさはおよそ $\dfrac1n$ で減っている。`,
          pitfalls: [
            String.raw`$\sin\lambda x$ が $0$ と $1$ の間を動くから、といった理由では $0$ に行くことは言えない。振動の速さが効いていることを、部分積分か区間の分割で示す。`,
            String.raw`区間が $[1,\pi]$ で、$\sin\dfrac{x}{2}$ が $0$ になる $x=0$ を含まないことが前提。$[0,\pi]$ だったらこの議論は通らない。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`無限級数 $\displaystyle\sum_{k=1}^{\infty}\frac{\sin k}{k}$ の和を求める`,
          answer: String.raw`$\dfrac{\pi-1}{2}$`,
          approach: String.raw`(2) の等式で $n\to\infty$ とするだけ。(3) で $I_n\to0$ を示したので、残るのは定数項だけになる。`,
          blocks: [
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{\infty}\frac{\sin k}{k}=\lim_{n\to\infty}\left(\frac{\pi-1}{2}-I_n\right)=\frac{\pi-1}{2}`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{\pi-1}{2}=1.0707963\ldots$。`,
            },
          ],
          check: String.raw`実際に $40$ 万項まで足すと $1.070794\ldots$ で、$\dfrac{\pi-1}{2}=1.070796\ldots$ にごく近い。収束がゆっくりなのは、$\dfrac{\sin k}{k}$ が交代級数のようにきれいに符号を変えないため。`,
          pitfalls: [
            String.raw`(1)〜(3) が全部ここにつながっている。(3) を示さずに「$I_n$ は $0$ だろう」と飛ばすと、この小問の根拠がなくなる。`,
            String.raw`$\displaystyle\sum\frac{1}{k}$ は発散するが、$\sin k$ の符号が不規則に変わるおかげでこの級数は収束する。絶対収束はしない。`,
          ],
        },
      ],
    },
  ],
};
