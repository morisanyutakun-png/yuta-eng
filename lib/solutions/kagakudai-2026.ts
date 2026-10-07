import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京科学大学（旧・東京工業大学）2026年度（令和8年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */
export const kagakudai2026: SolutionSet = {
  slug: "kagakudai",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "東京科学大学",
  short: "東京科学大",
  source: null,
  questions: [
    {
      no: 1,
      field: "整数・無理数",
      topics: ["無理数と有理数係数の方程式", "一意性の示し方", "3乗根", "次数の下がらない理由"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$x=a+b\\sqrt n$ について $p=-2a,\\ q=a^{2}-b^{2}n$ を多数の $a,b,n$ で数値的に確かめた",
          "$x=a+b\\sqrt[3]{n}$ について $p=-3a,\\ q=3a^{2},\\ r=-(a^{3}+b^{3}n)$ を同様に確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$x^{2}+px+q=0$ をみたす有理数 $p,q$ を求め、組がただ一つであることを示す`,
          answer: String.raw`$p=-2a,\qquad q=a^{2}-b^{2}n$`,
          approach: String.raw`$x-a=b\sqrt n$ として**根号を片側に寄せてから2乗**すれば、有理数係数の2次式になる。一意性は、2つあると仮定して引き算すると1次式になることから。`,
          blocks: [
            { k: "math", t: String.raw`x-a=b\sqrt n\ \Longrightarrow\ (x-a)^{2}=b^{2}n\ \Longrightarrow\ x^{2}-2ax+a^{2}-b^{2}n=0` },
            { k: "p", t: String.raw`$a,b,n$ は有理数（$n$ は整数）なので $p=-2a,\ q=a^{2}-b^{2}n$ は有理数。` },
            {
              k: "p",
              t: String.raw`**一意性。** $x^{2}+px+q=0$ と $x^{2}+p'x+q'=0$ がともに成り立つとすると、引いて $(p-p')x+(q-q')=0$。`,
            },
            {
              k: "p",
              t: String.raw`もし $p\ne p'$ なら $x=-\dfrac{q-q'}{p-p'}$ となって $x$ が有理数になり、$x$ が無理数であることに反する。よって $p=p'$、続いて $q=q'$。`,
            },
          ],
          pitfalls: [
            String.raw`一意性の論法がこの大問の核。「差をとると次数が下がる」ことを使い、$x$ が無理数であることと矛盾させる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$x^{3}+px^{2}+qx+r=0$ をみたす有理数 $p,q,r$ を求め、組がただ一つであることを示す`,
          answer: String.raw`$p=-3a,\qquad q=3a^{2},\qquad r=-\left(a^{3}+b^{3}n\right)$`,
          approach: String.raw`求め方は (1) と同じで、3乗する。一意性は差をとると2次式になるので、「$\sqrt[3]{n}$ は有理数係数の2次方程式をみたさない」という一段を挟む必要がある。`,
          blocks: [
            {
              k: "math",
              t: String.raw`(x-a)^{3}=b^{3}n\ \Longrightarrow\ x^{3}-3ax^{2}+3a^{2}x-a^{3}-b^{3}n=0`,
            },
            {
              k: "p",
              t: String.raw`**一意性。** 2組あるとして差をとると $Ax^{2}+Bx+C=0$（$A,B,C$ は有理数）。$t=\sqrt[3]{n}$、$x=a+bt$（$b\ne0$、$t$ は無理数）を入れて $t$ について整理すると`,
            },
            {
              k: "math",
              t: String.raw`Ab^{2}t^{2}+\left(2Aab+Bb\right)t+\left(Aa^{2}+Ba+C\right)=0`,
            },
            {
              k: "p",
              t: String.raw`**補題。** $t=\sqrt[3]{n}$ が無理数なら、有理数 $\alpha,\beta,\gamma$ で $\alpha t^{2}+\beta t+\gamma=0$ をみたすのは $\alpha=\beta=\gamma=0$ のときだけ。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\alpha=0$ なら $\beta t+\gamma=0$。$\beta\ne0$ だと $t$ が有理数になるので $\beta=0$、続いて $\gamma=0$`,
                String.raw`$\alpha\ne0$ なら $\alpha=1$ としてよく $t^{2}=-\beta t-\gamma$。両辺に $t$ を掛けて $t^{3}=n$ を使うと $(\beta^{2}-\gamma)t=n-\beta\gamma$`,
                String.raw`$\beta^{2}-\gamma\ne0$ なら $t$ が有理数になり矛盾。$\beta^{2}-\gamma=0$ なら $\gamma=\beta^{2}$ かつ $n=\beta\gamma=\beta^{3}$ となり、$\sqrt[3]{n}=\beta$ が有理数で矛盾`,
              ],
            },
            {
              k: "p",
              t: String.raw`補題より $Ab^{2}=0$。$b\ne0$ だから $A=0$、続いて $B=0,\ C=0$。よって2組は一致する。`,
            },
            {
              k: "note",
              t: String.raw`(1) では差が1次式になり、$x$ が無理数であることだけで片づいた。(2) では差が2次式になるので、「$\sqrt[3]{n}$ は2次方程式をみたさない」という事実が1つ余計に要る。$3$ 乗根が $2$ 乗根より面倒になるのは、この一手間の差である。`,
            },
          ],
          check: String.raw`$a=1,b=1,n=2$ なら $x=1+\sqrt[3]2$ で、$p=-3,q=3,r=-3$。実際 $(x-1)^{3}=2$ を展開すると $x^{3}-3x^{2}+3x-3=0$ になる。`,
          pitfalls: [
            String.raw`$x$ が無理数であることだけでは、2次式が $0$ になることを否定できない。補題を立てて $t$ の2次式に落とす。`,
          ],
        },
      ],
    },
    {
      no: 2,
      field: "場合の数",
      topics: ["パスカルの法則", "二項係数の和", "格子点の数え上げ", "重複を除く"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(2) の $ {}_{n-1}\\mathrm{C}_3$ を $n=4..40$ で全探索と突き合わせた",
          "(3) の偶奇で分かれる式を $n=4..40$ で全探索と突き合わせた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`パスカルの法則と、二項係数の縦の和の公式を示す`,
          answer: String.raw`どちらも階乗で書くか、パスカルの法則を使って**差の形**に直し、telescoping で示す`,
          approach: String.raw`2つめの式は、パスカルの法則を「$ {}_k\mathrm{C}_r={}_{k+1}\mathrm{C}_{r+1}-{}_k\mathrm{C}_{r+1}$」と**差の形に読み替える**と、足し合わせたときに次々打ち消し合う。`,
          blocks: [
            { k: "p", t: String.raw`**パスカルの法則。** 階乗で書いて通分すると` },
            {
              k: "math",
              t: String.raw`{}_{n-1}\mathrm{C}_r+{}_{n-1}\mathrm{C}_{r-1}=\frac{(n-1)!\,\{(n-r)+r\}}{r!\,(n-r)!}=\frac{n!}{r!\,(n-r)!}={}_n\mathrm{C}_r`,
            },
            { k: "p", t: String.raw`**縦の和。** パスカルの法則を $r+1$ の位置で使うと $ {}_{k+1}\mathrm{C}_{r+1}={}_k\mathrm{C}_{r+1}+{}_k\mathrm{C}_r$、すなわち` },
            { k: "math", t: String.raw`{}_k\mathrm{C}_r={}_{k+1}\mathrm{C}_{r+1}-{}_k\mathrm{C}_{r+1}` },
            { k: "p", t: String.raw`$k=r$ から $n$ まで足すと、隣どうしが打ち消し合って` },
            {
              k: "math",
              t: String.raw`\sum_{k=r}^{n}{}_k\mathrm{C}_r={}_{n+1}\mathrm{C}_{r+1}-{}_r\mathrm{C}_{r+1}={}_{n+1}\mathrm{C}_{r+1}`,
            },
            { k: "p", t: String.raw`（$ {}_r\mathrm{C}_{r+1}=0$。）` },
          ],
        },
        {
          label: "(2)",
          task: String.raw`$x+y+z<n$ をみたす正の整数の点の個数を求める`,
          answer: String.raw`$ {}_{n-1}\mathrm{C}_3=\dfrac{(n-1)(n-2)(n-3)}{6}$`,
          approach: String.raw`和の値 $m$ で分けて数え、$m$ について足す。そこで (1) の**縦の和**がそのまま効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x+y+z=m$ をみたす正の整数の組は、仕切りの入れ方を考えて $ {}_{m-1}\mathrm{C}_2$ 通り。$x+y+z<n$ は $m=3,4,\dots,n-1$ をすべて足すことなので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{m=3}^{n-1}{}_{m-1}\mathrm{C}_2=\sum_{k=2}^{n-2}{}_k\mathrm{C}_2={}_{n-1}\mathrm{C}_3`,
            },
          ],
          check: String.raw`$n=4$ なら $x+y+z=3$ の $(1,1,1)$ だけで $1$ 個、$ {}_3\mathrm{C}_3=1$。$n=5$ なら $1+3=4$ 個で $ {}_4\mathrm{C}_3=4$。合う。`,
          pitfalls: [
            String.raw`$x,y,z$ は**正**の整数。$0$ を許すと仕切りの数え方が変わる。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$x+y+z=3n$ かつ $x<y<z$ をみたす点の個数を求める`,
          answer: String.raw`$n$ が偶数のとき $\dfrac{3n^{2}-6n+4}{4}$、$n$ が奇数のとき $\dfrac{3(n-1)^{2}}{4}$`,
          approach: String.raw`まず順序を無視して数え、**2つ以上が等しい組**を除いてから $3!$ で割る。等しい組の個数に $n$ の偶奇が効く。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$x+y+z=3n$ をみたす正の整数の組は $ {}_{3n-1}\mathrm{C}_2$ 通り。このうち $x=y$ となるのは $2x+z=3n$、$x\ge1$、$z\ge1$ のとき。$z=3n-2x\ge1$ より $x\le\dfrac{3n-1}{2}$ だから、その個数 $A$ は $1\le x\le\dfrac{3n-1}{2}$ をみたす整数 $x$ の個数である。$y=z$、$x=z$ のときも同数。`,
            },
            {
              k: "p",
              t: String.raw`3つとも等しいのは $x=y=z=n$ の1通りだけ。包除原理で「2つ以上が等しい」組は $3A-2$ 通りなので`,
            },
            {
              k: "math",
              t: String.raw`\text{（相異なる順序つきの組）}={}_{3n-1}\mathrm{C}_2-(3A-2)`,
            },
            { k: "p", t: String.raw`$x<y<z$ はこれを $3!=6$ で割ったもの。$A$ を偶奇で書き分けると` },
            {
              k: "steps",
              items: [
                String.raw`$n$ が偶数 … $A=\dfrac{3n-2}{2}$ で、個数は $\dfrac{3n^{2}-6n+4}{4}$`,
                String.raw`$n$ が奇数 … $A=\dfrac{3n-1}{2}$ で、個数は $\dfrac{3(n-1)^{2}}{4}$`,
              ],
            },
            {
              k: "note",
              t: String.raw`$n$ の偶奇で分かれた2つの値は、どちらも $\dfrac{3(n-1)^{2}}{4}$ にいちばん近い整数である。$n$ が奇数のときはちょうどその値、偶数のときは $\dfrac14$ だけ大きい。`,
            },
          ],
          check: String.raw`$n=4$ なら $x+y+z=12$ を相異なる3数に分ける方法で $(1,2,9),(1,3,8),(1,4,7),(1,5,6),(2,3,7),(2,4,6),(3,4,5)$ の $7$ 個。式も $\dfrac{48-24+4}{4}=7$。$n=5$ は $12$ 個で $\dfrac{3\cdot16}{4}=12$。`,
          pitfalls: [
            String.raw`$3n$ は $3$ の倍数なので $x=y=z=n$ がつねに起こる。包除原理でここを $2$ 回引きすぎないよう注意。`,
            String.raw`$A$ の床関数が $n$ の偶奇で変わる。最後に場合分けが残るのはそのため。`,
          ],
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["中点と外心", "垂直条件", "相似の対応", "辺の比"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{Q}$ が $\\mathrm{O},\\mathrm{B},\\mathrm{C}$ から等距離にあることを多数の $a,b$ で確かめた",
          "2つの $\\mathrm{R}$ でそれぞれ $\\vec{\\mathrm{RP}}\\cdot\\vec{\\mathrm{RQ}}=0$ になることを確かめた",
          "$\\mathrm{R}=\\left(\\frac a4,0\\right)$ でつねに $|\\mathrm{RQ}|:|\\mathrm{RP}|=b:a$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\mathrm{P},\mathrm{Q}$ の座標を $a,b$ で表す`,
          answer: String.raw`$\mathrm{P}\left(\dfrac{3a}{4},\ \dfrac b4\right),\qquad \mathrm{Q}\left(\dfrac{a^{2}-b^{2}}{4a},\ \dfrac b2\right)$`,
          approach: String.raw`$\mathrm{Q}$ は $\mathrm{O},\mathrm{B}$ から等距離なので、まず**$\mathrm{OB}$ の垂直二等分線 $y=\frac b2$ 上**にあると分かる。あとは $\mathrm{C}$ からの距離をそろえるだけ。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{C}$ は $\mathrm{AB}$ の中点で $\left(\frac a2,\frac b2\right)$、$\mathrm{P}$ は $\mathrm{AC}$ の中点で $\left(\frac{3a}{4},\frac b4\right)$。` },
            {
              k: "p",
              t: String.raw`$\mathrm{O}(0,0)$ と $\mathrm{B}(0,b)$ はどちらも $y$ 軸上にあるので、外心は $y=\dfrac b2$ 上。$\mathrm{Q}\left(q,\frac b2\right)$ とおいて $|\mathrm{QO}|=|\mathrm{QC}|$ より`,
            },
            {
              k: "math",
              t: String.raw`q^{2}+\frac{b^{2}}{4}=\left(q-\frac a2\right)^{2}\ \Longrightarrow\ q=\frac{a^{2}-b^{2}}{4a}`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{O},\mathrm{B},\mathrm{C}$ が一直線上に並ばないことを確かめておく。$\mathrm{C}$ の $x$ 座標が $\frac a2\ne0$ なので大丈夫。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`直線 $\mathrm{OA}$ 上で $\angle\mathrm{PRQ}=\dfrac{\pi}{2}$ をみたす点 $\mathrm{R}$ をすべて求める`,
          answer: String.raw`$\mathrm{R}\left(\dfrac a4,\ 0\right)$ と $\mathrm{R}\left(\dfrac{3a^{2}-b^{2}}{4a},\ 0\right)$（$b=\sqrt2\,a$ のときは一致して1点）`,
          approach: String.raw`$\mathrm{R}(t,0)$ とおいて $\vec{\mathrm{RP}}\cdot\vec{\mathrm{RQ}}=0$。$t$ の2次方程式になり、判別式が**完全平方**になるので根号が外れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{R}(t,0)$ とすると $\vec{\mathrm{RP}}=\left(\frac{3a}{4}-t,\ \frac b4\right)$、$\vec{\mathrm{RQ}}=\left(\frac{a^{2}-b^{2}}{4a}-t,\ \frac b2\right)$。内積を $0$ とおいて整理すると`,
            },
            {
              k: "math",
              t: String.raw`t^{2}-\frac{4a^{2}-b^{2}}{4a}\,t+\frac{3a^{2}-b^{2}}{16}=0`,
            },
            { k: "p", t: String.raw`判別式を計算すると` },
            {
              k: "math",
              t: String.raw`D=\frac{(4a^{2}-b^{2})^{2}-4a^{2}(3a^{2}-b^{2})}{16a^{2}}=\frac{\left(2a^{2}-b^{2}\right)^{2}}{16a^{2}}`,
            },
            { k: "p", t: String.raw`完全平方なので $\sqrt D=\dfrac{\left|2a^{2}-b^{2}\right|}{4a}$ となり、2解は符号にかかわらず` },
            { k: "math", t: String.raw`t=\frac a4,\qquad t=\frac{3a^{2}-b^{2}}{4a}` },
          ],
          check: String.raw`$t=\dfrac a4$ では $\vec{\mathrm{RP}}=\left(\frac a2,\frac b4\right),\ \vec{\mathrm{RQ}}=\left(-\frac{b^{2}}{4a},\frac b2\right)$ で、内積は $-\frac{b^{2}}{8}+\frac{b^{2}}{8}=0$。もう一方も同様に $0$ になる。`,
          pitfalls: [
            String.raw`判別式が完全平方になるので、$\left|2a^{2}-b^{2}\right|$ の符号で場合分けしても2解の組は同じ。場合分けして書き分ける必要はない。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\triangle\mathrm{PQR}\backsim\triangle\mathrm{ABO}$ または $\triangle\mathrm{QPR}\backsim\triangle\mathrm{ABO}$ となる $\mathrm{R}$ をすべて求める`,
          answer: String.raw`$\mathrm{R}\left(\dfrac a4,\ 0\right)$（このとき $\triangle\mathrm{PQR}\backsim\triangle\mathrm{ABO}$ が $a,b$ によらずつねに成り立つ）`,
          approach: String.raw`$\triangle\mathrm{ABO}$ は $\mathrm{O}$ が直角で、直角をはさむ辺の比が $\mathrm{OA}:\mathrm{OB}=a:b$。$\triangle\mathrm{PQR}$ も $\mathrm{R}$ が直角なので、**直角をはさむ2辺の比だけ**を見ればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\triangle\mathrm{PQR}\backsim\triangle\mathrm{ABO}$（$\mathrm{P}\leftrightarrow\mathrm{A},\mathrm{Q}\leftrightarrow\mathrm{B},\mathrm{R}\leftrightarrow\mathrm{O}$）は $\dfrac{|\mathrm{RQ}|}{|\mathrm{RP}|}=\dfrac ba$、$\triangle\mathrm{QPR}\backsim\triangle\mathrm{ABO}$ は $\dfrac{|\mathrm{RP}|}{|\mathrm{RQ}|}=\dfrac ba$ と同じこと。`,
            },
            { k: "p", t: String.raw`**$\mathrm{R}\left(\frac a4,0\right)$ のとき。**` },
            {
              k: "math",
              t: String.raw`|\mathrm{RP}|^{2}=\frac{4a^{2}+b^{2}}{16},\qquad |\mathrm{RQ}|^{2}=\frac{b^{2}\left(4a^{2}+b^{2}\right)}{16a^{2}}`,
            },
            {
              k: "p",
              t: String.raw`比をとると $\dfrac{|\mathrm{RQ}|^{2}}{|\mathrm{RP}|^{2}}=\dfrac{b^{2}}{a^{2}}$、つまり $\dfrac{|\mathrm{RQ}|}{|\mathrm{RP}|}=\dfrac ba$ が**$a,b$ によらずつねに成り立つ**。よって $\triangle\mathrm{PQR}\backsim\triangle\mathrm{ABO}$。`,
            },
            { k: "p", t: String.raw`**$\mathrm{R}\left(\frac{3a^{2}-b^{2}}{4a},0\right)$ のとき。** 同様に計算すると` },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{RP}}=\left(\frac{b^{2}}{4a},\ \frac b4\right),\qquad \vec{\mathrm{RQ}}=\left(-\frac a2,\ \frac b2\right),\qquad \frac{|\mathrm{RQ}|}{|\mathrm{RP}|}=\frac{2a}{b}`,
            },
            {
              k: "steps",
              items: [
                String.raw`$\triangle\mathrm{PQR}\backsim\triangle\mathrm{ABO}$ … $\dfrac{2a}{b}=\dfrac ba$ すなわち $b^{2}=2a^{2}$。だがこのとき (2) の2点は一致するので、新しい点は出ない`,
                String.raw`$\triangle\mathrm{QPR}\backsim\triangle\mathrm{ABO}$ … $\dfrac{b}{2a}=\dfrac ba$ となり $\dfrac12=1$。起こらない`,
              ],
            },
            { k: "p", t: String.raw`以上より、求める点は $\mathrm{R}\left(\dfrac a4,\ 0\right)$ のみ。` },
          ],
          check: String.raw`$a=1,b=2$ では $\mathrm{R}\left(\frac14,0\right)$ で $|\mathrm{RQ}|:|\mathrm{RP}|=\sqrt2:\frac{\sqrt2}{2}=2:1=b:a$。もう一方の $\mathrm{R}\left(-\frac14,0\right)$ では比が $1$ になり、$b:a=2:1$ と合わない。`,
          pitfalls: [
            String.raw`直角の位置が $\triangle\mathrm{PQR}$ では $\mathrm{R}$、$\triangle\mathrm{ABO}$ では $\mathrm{O}$。対応がそろっているので、残りは直角をはさむ2辺の比だけ。`,
            String.raw`$\mathrm{R}\left(\frac a4,0\right)$ が条件を無条件に満たすのは偶然ではない。$|\mathrm{RQ}|^{2}$ に $\frac{b^{2}}{a^{2}}$ がそのまま括り出せる形になっている。`,
          ],
        },
      ],
    },
    {
      no: 4,
      field: "複素数平面",
      topics: ["直線に関する対称移動", "共役と回転", "正六角形の辺", "周期6の漸化式"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$R_n$ の式が、$\\ell_n$ 上の点を動かさず、$\\ell_n$ に下ろした垂線の足で折り返すことを数値で確かめた",
          "$z_7=z_1-3\\sqrt3\\,i$ を、$z_1$ を多数とって数値で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$R_n(z)=e(\theta_1)\overline z+\sqrt3\,e(\theta_2)$ の $\theta_1,\theta_2$ を $n$ で表す`,
          answer: String.raw`$\theta_1=\dfrac{2(n+1)\pi}{3},\qquad \theta_2=\dfrac{(2n-1)\pi}{6}$`,
          approach: String.raw`2点 $p,q$ を通る直線に関する対称移動は $z\mapsto\dfrac{q-p}{\overline{q-p}}\left(\overline z-\overline p\right)+p$。$\ell_n$ は単位円に内接する**正六角形の辺**なので、$q-p$ の偏角がきれいに出る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\zeta=e\!\left(\frac{\pi}{3}\right)$ とおくと $p=\zeta^{\,n-1},\ q=\zeta^{\,n}$ で`,
            },
            {
              k: "math",
              t: String.raw`q-p=\zeta^{\,n-1}(\zeta-1)=\zeta^{\,n-1}\,e\!\left(\frac{2\pi}{3}\right)=e\!\left(\frac{(n+1)\pi}{3}\right)`,
            },
            { k: "p", t: String.raw`（$\zeta-1=-\frac12+\frac{\sqrt3}{2}i=e\!\left(\frac{2\pi}{3}\right)$。）よって $\dfrac{q-p}{\overline{q-p}}=e\!\left(\dfrac{2(n+1)\pi}{3}\right)=\zeta^{\,2n+2}$ で` },
            { k: "math", t: String.raw`R_n(z)=\zeta^{\,2n+2}\,\overline z+\left(\zeta^{\,n-1}-\zeta^{\,n+3}\right)` },
            { k: "p", t: String.raw`定数項は $\zeta^{\,n-1}\left(1-\zeta^{4}\right)$ で、$1-\zeta^{4}=\dfrac32+\dfrac{\sqrt3}{2}i=\sqrt3\,e\!\left(\dfrac{\pi}{6}\right)$。したがって` },
            {
              k: "math",
              t: String.raw`R_n(z)=e\!\left(\frac{2(n+1)\pi}{3}\right)\overline z+\sqrt3\,e\!\left(\frac{(2n-1)\pi}{6}\right)`,
            },
          ],
          check: String.raw`$n=1$ なら $\ell_1$ は $1$ と $e\!\left(\frac{\pi}{3}\right)$ を結ぶ直線。$R_1(1)=1$、$R_1\!\left(e\!\left(\frac\pi3\right)\right)=e\!\left(\frac\pi3\right)$ となり、直線上の点は動かない。$R_1(0)=\frac32+\frac{\sqrt3}{2}i$ は、原点から $\ell_1$ に下ろした垂線の足 $\left(\frac34,\frac{\sqrt3}{4}\right)$ の2倍で、確かに対称点。`,
          pitfalls: [
            String.raw`$\dfrac{q-p}{\overline{q-p}}$ は「直線の向きの2乗」。$|q-p|$ で割らなくても、比の形になっているので自動的に絶対値 $1$。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$z_1=a+bi,\ z_{n+1}=R_n(z_n)$ で定まる $\{z_n\}$ の一般項を求める`,
          answer: String.raw`$z_{n+6}=z_n-3\sqrt3\,i$。$z_1\sim z_6$ は下の表のとおりで、$n=6q+r\ (1\le r\le6)$ と書くと $z_n=z_r-3\sqrt3\,q\,i$`,
          approach: String.raw`$\zeta^{6}=1$ なので $R_n$ は $n$ について**周期6**。6回ぶん合成すると、対称移動が偶数回で向きが戻り、結果は**平行移動**になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\zeta=e\!\left(\frac\pi3\right),\ \eta=e\!\left(\frac\pi6\right)$ とおくと $R_n(z)=\zeta^{\,2n+2}\overline z+\sqrt3\,\eta\,\zeta^{\,n-1}$ で、$n$ を $6$ 増やすと元に戻る。順に計算すると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$z_2=\zeta^{4}\overline{z_1}+\sqrt3\,\eta$`,
                String.raw`$z_3=\zeta^{2}z_1+\sqrt3\,\eta$`,
                String.raw`$z_4=\overline{z_1}+3\zeta^{2}$`,
                String.raw`$z_5=\zeta^{4}z_1-3+\sqrt3\,i$`,
                String.raw`$z_6=\zeta^{2}\overline{z_1}-3-2\sqrt3\,i$`,
                String.raw`$z_7=z_1-3\sqrt3\,i$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$z_7$ で $z_1$ の係数が $1$ に戻り、共役も外れた。つまり6回の合成は**平行移動** $z\mapsto z-3\sqrt3\,i$。$R_n$ が周期6で繰り返すので、この関係はどこから始めても成り立ち`,
            },
            { k: "math", t: String.raw`z_{n+6}=z_n-3\sqrt3\,i` },
            {
              k: "p",
              t: String.raw`$n$ を $6$ で割った余りで分け、$n=6q+r\ (1\le r\le6)$ と書けば $z_n=z_r-3\sqrt3\,q\,i$。`,
            },
            {
              k: "note",
              t: String.raw`対称移動は向きを変えるので、$6$ 回すなわち偶数回合成すれば向きは元に戻り、結果は回転か平行移動のどちらかになる。$\ell_1,\dots,\ell_6$ は正六角形の6辺で、一周ぶんの回転角が打ち消し合うため、回転成分が消えて平行移動だけが残る。`,
            },
          ],
          check: String.raw`$z_1=0$ から順に計算すると $z_2=z_3=\frac32+\frac{\sqrt3}{2}i$、$z_4=-\frac32+\frac{3\sqrt3}{2}i$、$z_5=-3+\sqrt3\,i$、$z_6=-3-2\sqrt3\,i$、$z_7=-3\sqrt3\,i$。確かに $z_7=z_1-3\sqrt3\,i$。`,
          pitfalls: [
            String.raw`共役が入るので、2回合成するごとに $z$ と $\overline z$ が入れ替わる。偶数回で共役が外れることを使う。`,
            String.raw`$z_3=\zeta^{2}z_1+\sqrt3\eta$ は $z\mapsto\zeta^{2}(z-\zeta)+\zeta$（$\zeta$ を中心とする $120^\circ$ 回転）と書けるが、この形は $z_2\to z_4$ では成り立たない。一般の $n$ で同じ式を使い回さないこと。`,
          ],
        },
      ],
    },
    {
      no: 5,
      field: "極限・積分",
      topics: ["リーマン・ルベーグの補題", "半角の公式", "ガンマ積分", "端の評価"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$\\int_0^{100}x^k e^{-x}dx$ が $k!$ とほぼ等しいこと（差が $10^{-20}$ 未満）を確かめた",
          "$n$ を大きくした数値積分が $\\frac{k!}{2}$ に近づくことを $k=1..5$ で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`不等式をみたす最小の $k$ を求める`,
          answer: String.raw`$k=4$`,
          approach: String.raw`$\sin^{2}(nx)=\dfrac{1-\cos(2nx)}{2}$ と直すと、**振動する項は $n\to\infty$ で消える**。残るのは定数 $\frac12$ 倍の積分で、それが $k!$ にほぼ等しい。`,
          blocks: [
            { k: "p", t: String.raw`半角の公式で分けると` },
            {
              k: "math",
              t: String.raw`\int_0^{100}x^{k}e^{-x}\sin^{2}(nx)\,dx=\frac12\int_0^{100}x^{k}e^{-x}dx-\frac12\int_0^{100}x^{k}e^{-x}\cos(2nx)\,dx`,
            },
            {
              k: "p",
              t: String.raw`第2項は部分積分すると $\dfrac{1}{2n}$ の大きさになる（$g(x)=x^{k}e^{-x}$ とその導関数は $[0,100]$ で有界）。よって $n\to\infty$ で $0$ に向かい`,
            },
            { k: "math", t: String.raw`\lim_{n\to\infty}\int_0^{100}x^{k}e^{-x}\sin^{2}(nx)\,dx=\frac12\int_0^{100}x^{k}e^{-x}dx` },
            { k: "p", t: String.raw`$I_k=\displaystyle\int_0^{100}x^{k}e^{-x}dx$ とおくと、部分積分で $I_k=k\,I_{k-1}-100^{k}e^{-100}$。$\displaystyle\int_0^{\infty}x^{k}e^{-x}dx=k!$ との差は、$x\ge100$ で $x^{k}e^{-x/2}$ が減少することから` },
            {
              k: "math",
              t: String.raw`0<k!-I_k=\int_{100}^{\infty}x^{k}e^{-x}dx\le100^{k}e^{-50}\int_{100}^{\infty}e^{-x/2}dx=2\cdot100^{k}e^{-100}`,
            },
            {
              k: "p",
              t: String.raw`$e>2$ より $e^{-100}<2^{-100}$ なので、$k\le4$ ではこの差は $10^{-20}$ より小さい。したがって $I_k$ は $k!$ とみなしてよく、求める条件 $\dfrac{I_k}{2}>10$ は実質 $k!>20$。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k=1,2,3$ … $k!=1,2,6$ でいずれも $20$ 以下。条件を満たさない`,
                String.raw`$k=4$ … $k!=24>20$。条件を満たす`,
              ],
            },
            { k: "p", t: String.raw`よって最小の $k$ は $4$。` },
          ],
          check: String.raw`$I_4=23.999\ldots$（$24$ との差は $10^{-20}$ 未満）なので $\dfrac{I_4}{2}=11.99\ldots>10$。$I_3\fallingdotseq6$ で $\dfrac{I_3}{2}=3<10$。数値積分で $n$ を大きくしても同じ値に近づく。`,
          pitfalls: [
            String.raw`$\sin^{2}$ の平均が $\dfrac12$ であることが効く。$\sin^{2}(nx)\le1$ だけで押さえると $k!$ が出てしまい、$k=3$ を誤って答えてしまう。`,
            String.raw`積分区間が $[0,100]$ で $[0,\infty)$ ではない。差が無視できることを $e>2$ を使って評価しておく。この但し書きはそのためにある。`,
          ],
        },
      ],
    },
  ],
};
