import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 三重大学 2026年度（令和8年度）一般選抜 前期日程 数学②（医学部医学科・工学部）。
 *
 * 三重大の前期日程は学部によって3つの区分に分かれ、問題はそれぞれ別。
 * 2026年度は ①教育・生物資源、②医学科・工学部、③人文法経・看護 で、
 * 数学IIIが入るのは②だけ。ここで扱うのは②。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 他社の解答解説は見ていない。大学が公開している出題意図も読んでいないし引用もしない。
 * 問題文・図・表は1つも載せていない。
 */
export const mie2026: SolutionSet = {
  slug: "mie",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "数学②（医学部医学科・工学部）",
  university: "三重大学",
  short: "三重大",
  source: null,
  questions: [
    {
      no: 1,
      field: "小問集合",
      topics: ["円を表す条件", "内分点と内積", "加法定理", "対数の大小比較", "複素数平面の1次変換"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(1) 円になる $k$ の範囲を、$k$ を $\\frac1{500}$ 刻みで全探索して判定結果と突き合わせた",
          "(2) $\\mathrm{C}(-1,1)$、内積 $6$、$\\cos\\angle\\mathrm{AOC}=\\frac35$ を分数のまま計算した",
          "(3) 解 $0,\\frac\\pi3,\\pi,\\frac{5\\pi}3$ を数値の全探索で求め、$a-b=1$ の組を4通り変えても同じ解になることを確かめた",
          "(5) 円周上の $z$ を4000点とって $w$ を計算し、中心 $1+\\frac{i}{2}$・半径 $\\frac{\\sqrt2}{2}$ からのずれが $10^{-15}$ 未満であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$k>-1$ のとき、$k(x^{2}+y^{2}-3)+x^{2}+y^{2}-2x+3y+5=0$ が円を表す $k$ の範囲を求める（1点は円とみなさない）`,
          answer: String.raw`$-1<k<-\dfrac12$ または $k>\dfrac76$`,
          approach: String.raw`$x^{2},y^{2}$ の係数をそろえてから平方完成する。**「円」＝右辺が正**であり、$=0$ なら1点、$<0$ なら解なし。問題が「1点は円とみなさない」と断っているので、不等号は**等号を含まない**。`,
          blocks: [
            { k: "p", t: String.raw`$x^{2},y^{2}$ をまとめると` },
            { k: "math", t: String.raw`(k+1)(x^{2}+y^{2})-2x+3y+(5-3k)=0` },
            {
              k: "p",
              t: String.raw`$k>-1$ より $k+1>0$ なので、全体を $k+1$ で割れる。平方完成して`,
            },
            {
              k: "math",
              t: String.raw`\left(x-\frac{1}{k+1}\right)^{2}+\left(y+\frac{3}{2(k+1)}\right)^{2}=\frac{13}{4(k+1)^{2}}-\frac{5-3k}{k+1}`,
            },
            {
              k: "p",
              t: String.raw`円になる条件は右辺 $>0$。$(k+1)^{2}>0$ を掛けて`,
            },
            {
              k: "math",
              t: String.raw`\frac{13}{4}-(5-3k)(k+1)>0\ \Longleftrightarrow\ \frac{13}{4}+3k^{2}-2k-5>0`,
            },
            { k: "math", t: String.raw`12k^{2}-8k-7>0\ \Longleftrightarrow\ (2k+1)(6k-7)>0` },
            {
              k: "p",
              t: String.raw`よって $k<-\dfrac12$ または $k>\dfrac76$。前提の $k>-1$ と合わせて`,
            },
            { k: "math", t: String.raw`-1<k<-\frac12\quad\text{または}\quad k>\frac76` },
          ],
          check: String.raw`$k=\dfrac76$ のとき右辺は $0$ になり、図形は1点に縮む。$k=0$ のときは $x^{2}+y^{2}-2x+3y+5=0$ で、右辺が $1+\dfrac94-5=-\dfrac74<0$ となり解なし。どちらも範囲から外れている。`,
          pitfalls: [
            String.raw`$k+1>0$ を先に確認してから割る。$k>-1$ という条件はそのためにある。`,
            String.raw`「1点は円とみなさない」ので $\ge$ ではなく $>$。境界 $k=-\dfrac12,\ \dfrac76$ は**含まない**。`,
            String.raw`$12k^{2}-8k-7$ は $(2k+1)(6k-7)$ と因数分解できる。解の公式を使うなら判別式 $400$ から $k=\dfrac{8\pm20}{24}$。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{O}(0,0),\mathrm{A}(1,7),\mathrm{B}(-2,-2)$ とし、辺 $\mathrm{AB}$ を $2:1$ に内分する点を $\mathrm{C}$ とする。$\vec{\mathrm{OC}}$ を $\vec{\mathrm{OA}},\vec{\mathrm{OB}}$ で表し、$\vec{\mathrm{OA}}\cdot\vec{\mathrm{OC}}$ を求めて $\angle\mathrm{AOC}$ と $60^\circ$ を比べる`,
          answer: String.raw`$\vec{\mathrm{OC}}=\dfrac13\vec{\mathrm{OA}}+\dfrac23\vec{\mathrm{OB}}$、$\vec{\mathrm{OA}}\cdot\vec{\mathrm{OC}}=6$。$\cos\angle\mathrm{AOC}=\dfrac35>\dfrac12$ なので $\angle\mathrm{AOC}$ は $60^\circ$ **より小さい**`,
          approach: String.raw`角の大小は、角そのものを出さずに**余弦の大小**で決める。$\cos$ は $0^\circ$ から $180^\circ$ で単調減少なので、$\cos\theta>\cos60^\circ$ なら $\theta<60^\circ$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{AC}:\mathrm{CB}=2:1$ の内分点なので、$\mathrm{B}$ 側の重みが大きくなる。`,
            },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{OC}}=\frac{1\cdot\vec{\mathrm{OA}}+2\cdot\vec{\mathrm{OB}}}{2+1}=\frac13\vec{\mathrm{OA}}+\frac23\vec{\mathrm{OB}}`,
            },
            {
              k: "p",
              t: String.raw`座標にすると $\mathrm{C}\left(\dfrac{1-4}{3},\ \dfrac{7-4}{3}\right)=(-1,\ 1)$。`,
            },
            { k: "math", t: String.raw`\vec{\mathrm{OA}}\cdot\vec{\mathrm{OC}}=1\cdot(-1)+7\cdot1=6` },
            {
              k: "p",
              t: String.raw`$|\vec{\mathrm{OA}}|=\sqrt{50}=5\sqrt2$、$|\vec{\mathrm{OC}}|=\sqrt2$ だから`,
            },
            {
              k: "math",
              t: String.raw`\cos\angle\mathrm{AOC}=\frac{6}{5\sqrt2\cdot\sqrt2}=\frac{6}{10}=\frac35`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac35>\dfrac12=\cos60^\circ$ で、$0^\circ\le\theta\le180^\circ$ では $\cos$ が減少するから $\angle\mathrm{AOC}<60^\circ$。つまり**$60^\circ$ より大きくはない**。`,
            },
          ],
          check: String.raw`$\arccos\dfrac35=53.13^\circ$ で、確かに $60^\circ$ より小さい。内積が正なので鋭角であることとも矛盾しない。`,
          pitfalls: [
            String.raw`$2:1$ の内分は $\dfrac{1\cdot\vec{\mathrm{OA}}+2\cdot\vec{\mathrm{OB}}}{3}$。係数を取り違えて $\dfrac{2\vec{\mathrm{OA}}+\vec{\mathrm{OB}}}{3}$ としない。`,
            String.raw`「$60^\circ$ より大きいか」と問われている。$\cos$ が大きいほど角は**小さい**ので、不等号の向きが反転する。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$a-b=1$ のとき $\sin(a\theta)\cos(b\theta)=\cos(a\theta)\sin(b\theta)+\sin2\theta$ をみたす $\theta$（$0\le\theta<2\pi$）をすべて求める`,
          answer: String.raw`$\theta=0,\ \dfrac\pi3,\ \pi,\ \dfrac{5\pi}3$`,
          approach: String.raw`$a,b$ は具体的に決まっていないが、**使われているのは $a-b=1$ だけ**。加法定理で左辺－右辺第1項を1つの $\sin$ にまとめると、$a,b$ が消える。`,
          blocks: [
            { k: "p", t: String.raw`$\sin A\cos B-\cos A\sin B=\sin(A-B)$ を使うと` },
            {
              k: "math",
              t: String.raw`\sin(a\theta)\cos(b\theta)-\cos(a\theta)\sin(b\theta)=\sin\big((a-b)\theta\big)=\sin\theta`,
            },
            { k: "p", t: String.raw`よって方程式は $a,b$ によらず` },
            { k: "math", t: String.raw`\sin\theta=\sin2\theta=2\sin\theta\cos\theta` },
            { k: "math", t: String.raw`\sin\theta\,(1-2\cos\theta)=0` },
            {
              k: "steps",
              items: [
                String.raw`$\sin\theta=0$ … $0\le\theta<2\pi$ で $\theta=0,\ \pi$`,
                String.raw`$\cos\theta=\dfrac12$ … $\theta=\dfrac\pi3,\ \dfrac{5\pi}3$`,
              ],
            },
            { k: "p", t: String.raw`以上4つ。` },
          ],
          check: String.raw`$a=3,b=2$ でも $a=\dfrac32,b=\dfrac12$ でも $a=-2,b=-3$ でも、この4つで等式が成り立つことを数値で確かめた。$a,b$ の取り方によらない。`,
          pitfalls: [
            String.raw`$\sin\theta$ で割らない。$\sin\theta=0$ の解 $\theta=0,\pi$ が消える。`,
            String.raw`$\theta=0$ も範囲に入る（$0\le\theta<2\pi$）。一方 $\theta=2\pi$ は入らない。`,
            String.raw`$a,b$ が消えることに気づかないと、場合分けを始めて行き詰まる。使える情報は $a-b=1$ だけ。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$3$ と $5\log_3 2$ の大小、および $\log_2 12$ と $\log_3 72$ の大小を調べる`,
          answer: String.raw`$3<5\log_3 2$、$\log_2 12<\log_3 72$`,
          approach: String.raw`前半は底をそろえて**真数の大小**に持ち込む。後半は差の共通部分を落として $\log_2 3$ と $3\log_3 2$ の比較にし、そこで**前半の結果をそのまま使う**。2つは独立した問いではない。`,
          blocks: [
            { k: "p", t: String.raw`**前半。** $5\log_3 2=\log_3 2^{5}=\log_3 32$、$3=\log_3 27$。底 $3>1$ なので真数の大小がそのまま効いて` },
            { k: "math", t: String.raw`32>27\ \Longrightarrow\ 5\log_3 2>3` },
            { k: "p", t: String.raw`**後半。** 真数を分解すると、どちらも $2$ が出てくる。` },
            {
              k: "math",
              t: String.raw`\log_2 12=\log_2(2^{2}\cdot3)=2+\log_2 3,\qquad \log_3 72=\log_3(2^{3}\cdot3^{2})=2+3\log_3 2`,
            },
            { k: "p", t: String.raw`よって比べるのは $\log_2 3$ と $3\log_3 2$。$t=\log_2 3$ と置くと $\log_3 2=\dfrac1t$ で、$t>0$ だから` },
            {
              k: "math",
              t: String.raw`\log_2 3<3\log_3 2\ \Longleftrightarrow\ t<\frac3t\ \Longleftrightarrow\ t^{2}<3`,
            },
            {
              k: "p",
              t: String.raw`ここで前半が効く。$5\log_3 2>3$ すなわち $\dfrac5t>3$ だから $t<\dfrac53$。したがって`,
            },
            { k: "math", t: String.raw`t^{2}<\left(\frac53\right)^{2}=\frac{25}{9}<3` },
            { k: "p", t: String.raw`よって $\log_2 3<3\log_3 2$ となり、$\log_2 12<\log_3 72$。` },
          ],
          check: String.raw`数値では $5\log_3 2=3.1546\ldots>3$、$\log_2 12=3.5850\ldots<\log_3 72=3.8928\ldots$。また $t=\log_2 3=1.5850\ldots<\dfrac53=1.6667$、$t^{2}=2.5121\ldots<3$。`,
          pitfalls: [
            String.raw`$\dfrac{25}{9}=2.77\ldots<3$ であることが要。$t<\dfrac53$ で止めず、2乗して $3$ と比べるところまで進める。`,
            String.raw`$t=\log_2 3$ の値を小数で「だいたい $1.58$」と置いて済ませない。前半の結果から $t<\dfrac53$ が**厳密に**言える。`,
            String.raw`底の変換は $\log_3 2=\dfrac{1}{\log_2 3}$。$\log_2 3$ と混同しない。`,
          ],
        },
        {
          label: "(5)",
          task: String.raw`$|z-i|=1$ 上を $z$ が動くとき、$w=\dfrac{(i+1)z+3}{2}$ の描く図形を求める`,
          answer: String.raw`中心 $1+\dfrac{i}{2}$、半径 $\dfrac{\sqrt2}{2}$ の円`,
          approach: String.raw`$w$ は $z$ の1次式なので、**回転と拡大と平行移動**しか起きない。円は円のまま写る。$z$ について解いて条件式に入れるか、$z=i+e^{i\theta}$ と置いて直接代入するかのどちらでもよい。`,
          blocks: [
            { k: "p", t: String.raw`$z=i+e^{i\theta}$（$\theta$ は実数）と書けるので、そのまま代入する。` },
            {
              k: "math",
              t: String.raw`w=\frac{(1+i)\left(i+e^{i\theta}\right)+3}{2}=\frac{(i+i^{2})+3+(1+i)e^{i\theta}}{2}`,
            },
            { k: "p", t: String.raw`$i+i^{2}=-1+i$ なので分子の定数部分は $(-1+i)+3=2+i$。よって` },
            {
              k: "math",
              t: String.raw`w=\frac{2+i}{2}+\frac{1+i}{2}e^{i\theta}=\left(1+\frac{i}{2}\right)+\frac{1+i}{2}e^{i\theta}`,
            },
            {
              k: "p",
              t: String.raw`$\left|\dfrac{1+i}{2}\right|=\dfrac{\sqrt2}{2}$ で、$e^{i\theta}$ は単位円を一周する。したがって $w$ は`,
            },
            {
              k: "math",
              t: String.raw`\left|w-\left(1+\frac{i}{2}\right)\right|=\frac{\sqrt2}{2}`,
            },
            {
              k: "p",
              t: String.raw`すなわち中心 $1+\dfrac{i}{2}$、半径 $\dfrac{\sqrt2}{2}$ の円。$\theta$ が $0$ から $2\pi$ を動けば一周するので、**円全体**が描かれる。`,
            },
          ],
          check: String.raw`中心は $z$ の中心 $i$ を同じ式で写した点：$\dfrac{(1+i)i+3}{2}=\dfrac{-1+i+3}{2}=\dfrac{2+i}{2}=1+\dfrac i2$ で一致する。半径は元の $1$ に $\left|\dfrac{1+i}{2}\right|=\dfrac{\sqrt2}{2}$ を掛けたもの。`,
          alts: [
            {
              title: "$z$ について解く",
              blocks: [
                { k: "p", t: String.raw`$z=\dfrac{2w-3}{1+i}$ を $|z-i|=1$ に入れる。` },
                {
                  k: "math",
                  t: String.raw`\left|\frac{2w-3}{1+i}-i\right|=1\ \Longleftrightarrow\ \big|2w-3-i(1+i)\big|=|1+i|=\sqrt2`,
                },
                {
                  k: "p",
                  t: String.raw`$i(1+i)=-1+i$ だから $|2w-2-i|=\sqrt2$、両辺を $2$ で割って同じ式になる。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`**1次式なので円は円に写る**。わざわざ $w=u+vi$ と実部虚部に分けて計算すると、見通しが悪くなる。`,
            String.raw`半径は $\left|\dfrac{1+i}{2}\right|=\dfrac{\sqrt2}{2}$。$\dfrac{1+i}{2}$ の実部 $\dfrac12$ と取り違えない。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "確率・統計",
      topics: ["さいころ2個の標本空間", "期待値と分散", "独立な確率変数の和", "積の期待値"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "36通りをすべて列挙し、$E,V$ をすべて分数のまま直接計算して、公式から出した値と一致することを確かめた",
          "$E(XZ)=E(X^{2})+E(XY)$ が全列挙でも成り立つことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$Z=6$ となる確率と、$X=2$ かつ $Z=6$ となる確率を求める`,
          answer: String.raw`$P(Z=6)=\dfrac{5}{36}$、$P(X=2\ \text{かつ}\ Z=6)=\dfrac{1}{36}$`,
          approach: String.raw`2個のさいころは $6\times6=36$ 通りが同様に確からしい。**出方の組を数えるだけ**でよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$X+Y=6$ となる $(X,Y)$ は $(1,5),(2,4),(3,3),(4,2),(5,1)$ の5通り。`,
            },
            { k: "math", t: String.raw`P(Z=6)=\frac{5}{36}` },
            {
              k: "p",
              t: String.raw`$X=2$ と決めると $Y=4$ しかないので、組は1通り。`,
            },
            { k: "math", t: String.raw`P(X=2\ \text{かつ}\ Z=6)=\frac{1}{36}` },
          ],
          check: String.raw`$P(Z=6)$ を $X$ の値で分けると $X=1,\ldots,5$ の5通りがそれぞれ $\dfrac1{36}$ で、足すと $\dfrac5{36}$。後半の答えはその1つ分にあたる。`,
          pitfalls: [
            String.raw`$(3,3)$ も1通りとして数える。白と黒で区別しているので、重複ではない。`,
            String.raw`$X=6$ だと $Y=0$ になってしまい、さいころの目にならない。$X$ は $1$ から $5$ まで。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$E(X)$ と $V(X)$ を求める`,
          answer: String.raw`$E(X)=\dfrac72$、$V(X)=\dfrac{35}{12}$`,
          approach: String.raw`$X$ は $1$ から $6$ を等確率でとる。分散は $V(X)=E(X^{2})-\{E(X)\}^{2}$ で出すのが早い。`,
          blocks: [
            {
              k: "math",
              t: String.raw`E(X)=\frac{1+2+3+4+5+6}{6}=\frac{21}{6}=\frac72`,
            },
            {
              k: "math",
              t: String.raw`E(X^{2})=\frac{1+4+9+16+25+36}{6}=\frac{91}{6}`,
            },
            {
              k: "math",
              t: String.raw`V(X)=\frac{91}{6}-\left(\frac72\right)^{2}=\frac{182-147}{12}=\frac{35}{12}`,
            },
          ],
          check: String.raw`偏差の2乗の平均からも出せる。$\left(\dfrac52\right)^{2}\!\times2+\left(\dfrac32\right)^{2}\!\times2+\left(\dfrac12\right)^{2}\!\times2=\dfrac{25+9+1}{4}\times2=\dfrac{35}{2}$、これを $6$ で割って $\dfrac{35}{12}$。`,
          pitfalls: [
            String.raw`$E(X^{2})\ne\{E(X)\}^{2}$。$\dfrac{91}{6}$ と $\dfrac{49}{4}$ は別物。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$E(Z)$ と $V(Z)$ を求める`,
          answer: String.raw`$E(Z)=7$、$V(Z)=\dfrac{35}{6}$`,
          approach: String.raw`$Z=X+Y$ で、$X$ と $Y$ は**独立**。期待値は常に足せるが、分散が足せるのは独立のときだけ。ここはその条件が成り立っている。`,
          blocks: [
            { k: "math", t: String.raw`E(Z)=E(X)+E(Y)=\frac72+\frac72=7` },
            {
              k: "p",
              t: String.raw`2個のさいころは互いに影響しないので独立。したがって`,
            },
            {
              k: "math",
              t: String.raw`V(Z)=V(X)+V(Y)=\frac{35}{12}\times2=\frac{35}{6}`,
            },
          ],
          check: String.raw`$Z$ の分布は $2$ から $12$ まで $\dfrac1{36},\dfrac2{36},\ldots,\dfrac6{36},\ldots,\dfrac1{36}$。これを使って直接 $E(Z^{2})-49$ を計算しても $\dfrac{35}{6}$ になる。`,
          pitfalls: [
            String.raw`$V(X+Y)=V(X)+V(Y)$ は独立のときだけ。独立であることを一言書いておく。`,
            String.raw`$V(2X)=4V(X)$ であって $2V(X)$ ではない。$Z$ は $2X$ ではなく $X+Y$。ここを混同すると $\dfrac{35}{3}$ になってしまう。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`$E(XY)$ と $E(XZ)$ を求める`,
          answer: String.raw`$E(XY)=\dfrac{49}{4}$、$E(XZ)=\dfrac{329}{12}$`,
          approach: String.raw`$X,Y$ が独立だから $E(XY)=E(X)E(Y)$。一方 $Z$ は $X$ を含むので**独立ではない**。$XZ=X^{2}+XY$ と展開して、既に出した値を使う。`,
          blocks: [
            {
              k: "math",
              t: String.raw`E(XY)=E(X)E(Y)=\frac72\cdot\frac72=\frac{49}{4}`,
            },
            { k: "p", t: String.raw`$Z=X+Y$ なので $XZ=X^{2}+XY$。期待値は和について線形だから` },
            {
              k: "math",
              t: String.raw`E(XZ)=E(X^{2})+E(XY)=\frac{91}{6}+\frac{49}{4}=\frac{182+147}{12}=\frac{329}{12}`,
            },
          ],
          check: String.raw`36通りを全部書き出して $xz$ の平均をとっても $\dfrac{329}{12}=27.41\overline{6}$ になる。$E(X)E(Z)=\dfrac72\cdot7=\dfrac{49}{2}=24.5$ とは**違う**ことにも注意。`,
          pitfalls: [
            String.raw`$E(XZ)=E(X)E(Z)$ としない。$X$ と $Z$ は独立でない（$X$ が大きいと $Z$ も大きくなりやすい）。`,
            String.raw`その差 $E(XZ)-E(X)E(Z)=\dfrac{329}{12}-\dfrac{49}{2}=\dfrac{35}{12}$ はちょうど $V(X)$。$Z$ が $X$ を含んでいるぶんだけずれる。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "微分積分",
      topics: ["部分積分の循環", "媒介変数表示の曲線の長さ", "半角の公式", "(1)を(2)で使う"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(1) の原始関数を数値微分して $e^{at}\\cos(bt)$ に戻ることを、$(a,b)$ を4通り変えて確かめた",
          "(2) の長さ $\\frac85\\left(2+e^{-\\pi}\\right)=3.269142269$ を、数値積分と200万分割の折れ線の2通りで確かめた",
          "速さが $4e^{-t}\\cos\\frac t2$ になることを数値微分と突き合わせた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b$ を $0$ でない実数として $\displaystyle\int e^{at}\cos(bt)\,dt$ を求める`,
          answer: String.raw`$\dfrac{e^{at}\big(a\cos bt+b\sin bt\big)}{a^{2}+b^{2}}+C$`,
          approach: String.raw`部分積分を2回すると**元の積分が再び現れる**。それを $I$ と置いて方程式として解く、という型。`,
          blocks: [
            { k: "p", t: String.raw`$I=\displaystyle\int e^{at}\cos bt\,dt$、$J=\displaystyle\int e^{at}\sin bt\,dt$ と置く。` },
            {
              k: "math",
              t: String.raw`I=\frac{e^{at}}{a}\cos bt+\frac ba\int e^{at}\sin bt\,dt=\frac{e^{at}\cos bt}{a}+\frac ba J`,
            },
            {
              k: "math",
              t: String.raw`J=\frac{e^{at}\sin bt}{a}-\frac ba\int e^{at}\cos bt\,dt=\frac{e^{at}\sin bt}{a}-\frac ba I`,
            },
            { k: "p", t: String.raw`下を上に代入すると` },
            {
              k: "math",
              t: String.raw`I=\frac{e^{at}\cos bt}{a}+\frac{b}{a}\left(\frac{e^{at}\sin bt}{a}-\frac ba I\right)=\frac{e^{at}\left(a\cos bt+b\sin bt\right)}{a^{2}}-\frac{b^{2}}{a^{2}}I`,
            },
            {
              k: "p",
              t: String.raw`$I$ について整理すると $\left(1+\dfrac{b^{2}}{a^{2}}\right)I=\dfrac{e^{at}(a\cos bt+b\sin bt)}{a^{2}}$ だから`,
            },
            {
              k: "math",
              t: String.raw`I=\frac{e^{at}\left(a\cos bt+b\sin bt\right)}{a^{2}+b^{2}}+C`,
            },
          ],
          check: String.raw`微分すると、$e^{at}$ の微分から $a$ 倍が、三角関数の微分から $b$ 倍が出て、$\dfrac{(a^{2}+b^{2})e^{at}\cos bt}{a^{2}+b^{2}}=e^{at}\cos bt$ に戻る。$b\to0$ とすると $\dfrac{e^{at}}{a}$ で、これも正しい。`,
          pitfalls: [
            String.raw`2回とも**同じ側**（$e^{at}$ を積分する側、または微分する側）に統一する。途中で入れ替えると $I=I$ となって何も出ない。`,
            String.raw`$a^{2}+b^{2}\ne0$ は $a,b$ が $0$ でないことから保証される。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$x=e^{-t}(\cos t+\sin t)$、$y=e^{-t}(\cos t-\sin t+2)$（$0\le t\le\pi$）の曲線の長さを求める`,
          answer: String.raw`$\dfrac85\left(2+e^{-\pi}\right)$`,
          approach: String.raw`$\left(\dfrac{dx}{dt}\right)^{2}+\left(\dfrac{dy}{dt}\right)^{2}$ を作ると $1+\cos t$ が現れる。**半角の公式で根号が外れる**ので、あとは (1) の形の積分になる。`,
          blocks: [
            { k: "p", t: String.raw`積の微分で、$e^{-t}$ の微分から出る項と三角関数から出る項が打ち消し合う。` },
            {
              k: "math",
              t: String.raw`\frac{dx}{dt}=e^{-t}\big(-\cos t-\sin t-\sin t+\cos t\big)=-2e^{-t}\sin t`,
            },
            {
              k: "math",
              t: String.raw`\frac{dy}{dt}=e^{-t}\big(-\cos t+\sin t-2-\sin t-\cos t\big)=-2e^{-t}(1+\cos t)`,
            },
            { k: "p", t: String.raw`2乗して足すと、$\sin^{2}t+(1+\cos t)^{2}=2(1+\cos t)$ なので` },
            {
              k: "math",
              t: String.raw`\left(\frac{dx}{dt}\right)^{2}+\left(\frac{dy}{dt}\right)^{2}=8e^{-2t}(1+\cos t)=16e^{-2t}\cos^{2}\frac t2`,
            },
            {
              k: "p",
              t: String.raw`$0\le t\le\pi$ では $0\le\dfrac t2\le\dfrac\pi2$ なので $\cos\dfrac t2\ge0$。**絶対値をそのまま外せる**。`,
            },
            {
              k: "math",
              t: String.raw`L=\int_{0}^{\pi}4e^{-t}\cos\frac t2\,dt`,
            },
            { k: "p", t: String.raw`(1) で $a=-1$、$b=\dfrac12$ とすると $a^{2}+b^{2}=\dfrac54$ だから` },
            {
              k: "math",
              t: String.raw`\int e^{-t}\cos\frac t2\,dt=\frac45e^{-t}\left(-\cos\frac t2+\frac12\sin\frac t2\right)+C`,
            },
            {
              k: "math",
              t: String.raw`L=\frac{16}{5}\left[e^{-t}\left(-\cos\frac t2+\frac12\sin\frac t2\right)\right]_{0}^{\pi}=\frac{16}{5}\left(\frac{e^{-\pi}}{2}+1\right)=\frac85\left(2+e^{-\pi}\right)`,
            },
          ],
          check: String.raw`$\dfrac85\left(2+e^{-\pi}\right)=3.269142269\ldots$。曲線を200万個の線分で近似して長さを測っても同じ値になる。$e^{-\pi}=0.0432\ldots$ は小さいので、$\dfrac{16}{5}=3.2$ よりわずかに大きいだけ、という見当もつく。`,
          pitfalls: [
            String.raw`$\sqrt{\cos^{2}\frac t2}=\left|\cos\frac t2\right|$。区間が $[0,\pi]$ だから正だと確認してから外す。$t$ が $\pi$ を超える問題なら場合分けが要る。`,
            String.raw`$1+\cos t=2\cos^{2}\dfrac t2$ に気づかないと、根号が外れず先に進めない。`,
            String.raw`$\dfrac{dy}{dt}$ の定数 $2$ は微分で $-2e^{-t}$ を生む。これが $1+\cos t$ の $1$ の出どころなので、落とすと形が崩れる。`,
          ],
        },
      ],
    },
  ],
};
