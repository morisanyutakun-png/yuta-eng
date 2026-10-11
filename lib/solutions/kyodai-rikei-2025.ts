import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2025年度（令和7年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない（同じフォルダに予備校の解答PDFがあるが開いていない）。
 * 問題文・図・表は1つも載せていない。
 * 京都大学はこの年度の問題を公開しているので、そのページへリンクしている。
 */
export const kyodaiRikei2025: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "小問集合（複素数平面・積分法）",
      topics: ["複素数の絶対値", "2倍角", "置換積分", "半角の公式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "問1は $|z|=2$ の円周上を200万点きざみで全探索し、最大 $2.500000000$・最小 $1.500000000$ を確かめた",
          "問2はどちらもシンプソン法で数値積分し、$4-2\\log2+\\frac{\\pi}{3}$ と $\\log2$ に小数10桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$|z|=2$ を動く複素数 $z$ について $\left|z-\dfrac{i}{z}\right|$ の最大値と最小値を求める`,
          answer: String.raw`最大値 $\dfrac52$、最小値 $\dfrac32$`,
          approach: String.raw`$|z|=2$ という条件は $z=2\left(\cos\theta+i\sin\theta\right)$ と置けば1つの変数に落ちる。絶対値は2乗して実部・虚部から計算すると、$\theta$ の2倍角だけが残る形にまとまる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$|z|=2$ より $z=2\left(\cos\theta+i\sin\theta\right)$ とおける。このとき $z\overline z=4$ だから $\dfrac1z=\dfrac{\overline z}{4}$ であり`,
            },
            {
              k: "math",
              t: String.raw`z-\frac{i}{z}=z-\frac{i\overline z}{4}=2\left(\cos\theta+i\sin\theta\right)-\frac{i}{2}\left(\cos\theta-i\sin\theta\right)`,
            },
            { k: "p", t: String.raw`となる。実部と虚部に分けると` },
            {
              k: "math",
              t: String.raw`z-\frac{i}{z}=\left(2\cos\theta-\frac12\sin\theta\right)+i\left(2\sin\theta-\frac12\cos\theta\right)`,
            },
            { k: "p", t: String.raw`であるから、絶対値の2乗は` },
            {
              k: "math",
              t: String.raw`\left|z-\frac{i}{z}\right|^{2}=\left(2\cos\theta-\frac12\sin\theta\right)^{2}+\left(2\sin\theta-\frac12\cos\theta\right)^{2}=\frac{17}{4}-4\sin\theta\cos\theta=\frac{17}{4}-2\sin2\theta`,
            },
            {
              k: "p",
              t: String.raw`となる。$\theta$ が実数全体を動くとき $\sin2\theta$ は $-1$ から $1$ までのすべての値を取るので、この2乗は $\dfrac{17}{4}-2=\dfrac94$ から $\dfrac{17}{4}+2=\dfrac{25}{4}$ までを動く。絶対値は $0$ 以上だから、求める最大値は $\sqrt{\dfrac{25}{4}}=\dfrac52$、最小値は $\sqrt{\dfrac94}=\dfrac32$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{i}{z}$ を $\dfrac{i\overline z}{|z|^{2}}$ に直すところで $|z|^{2}=4$ を使う。$|z|=2$ をそのまま分母に置くと符号と大きさがずれる。`,
            String.raw`$\left|z-\dfrac{i}{z}\right|\le|z|+\left|\dfrac{i}{z}\right|=2+\dfrac12=\dfrac52$ という評価だけでは、等号が成り立つ $\theta$ が実際にあることを言わないと最大値とは言えない。2乗して計算すれば、その確認まで一度に済む。`,
          ],
          check: String.raw`$2\theta=-\dfrac{\pi}{2}$ すなわち $\theta=-\dfrac{\pi}{4}$ のとき $z=\sqrt2-\sqrt2\,i$ で、$z-\dfrac{i}{z}=\dfrac{5\sqrt2}{4}-\dfrac{5\sqrt2}{4}i$ となり絶対値は $\dfrac52$。$\theta=\dfrac{\pi}{4}$ では絶対値が $\dfrac32$ になる。`,
        },
        {
          label: "問2(1)",
          task: String.raw`$\displaystyle\int_{0}^{\sqrt3}\frac{x\sqrt{x^{2}+1}+2x^{3}+1}{x^{2}+1}\,dx$ を求める`,
          answer: String.raw`$4-2\log2+\dfrac{\pi}{3}$`,
          approach: String.raw`分子が3つの項の和なので、分母で割って3つの積分に分ける。分けてしまえば、順に「$\sqrt{x^{2}+1}$ の微分」「割り算で次数を下げる」「$\tan$ の置換」という別々の型になる。`,
          blocks: [
            { k: "p", t: String.raw`被積分関数を項ごとに分けると` },
            {
              k: "math",
              t: String.raw`\frac{x\sqrt{x^{2}+1}+2x^{3}+1}{x^{2}+1}=\frac{x}{\sqrt{x^{2}+1}}+\frac{2x^{3}}{x^{2}+1}+\frac{1}{x^{2}+1}`,
            },
            {
              k: "p",
              t: String.raw`となる。第1項は $\left(\sqrt{x^{2}+1}\right)'=\dfrac{x}{\sqrt{x^{2}+1}}$ だから、そのまま積分できて`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\sqrt3}\frac{x}{\sqrt{x^{2}+1}}\,dx=\Bigl[\sqrt{x^{2}+1}\Bigr]_{0}^{\sqrt3}=2-1=1`,
            },
            { k: "p", t: String.raw`である。第2項は分子の次数が分母より高いので、割り算をして` },
            {
              k: "math",
              t: String.raw`\frac{2x^{3}}{x^{2}+1}=2x-\frac{2x}{x^{2}+1},\qquad
\int_{0}^{\sqrt3}\left(2x-\frac{2x}{x^{2}+1}\right)dx=\Bigl[x^{2}-\log\left(x^{2}+1\right)\Bigr]_{0}^{\sqrt3}=3-\log4`,
            },
            {
              k: "p",
              t: String.raw`となる。第3項は $x=\tan t$ と置けば $dx=\dfrac{dt}{\cos^{2}t}$、$x^{2}+1=\dfrac{1}{\cos^{2}t}$ で、$x$ が $0$ から $\sqrt3$ まで動くとき $t$ は $0$ から $\dfrac{\pi}{3}$ まで動くから`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{\sqrt3}\frac{dx}{x^{2}+1}=\int_{0}^{\frac{\pi}{3}}dt=\frac{\pi}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。以上を足し合わせて、求める値は $1+\left(3-\log4\right)+\dfrac{\pi}{3}=4-2\log2+\dfrac{\pi}{3}$ となる。`,
            },
          ],
          pitfalls: [
            String.raw`第1項で $\dfrac{x\sqrt{x^{2}+1}}{x^{2}+1}$ を約分し忘れると、置換の形が見えないまま手が止まる。$\dfrac{\sqrt{x^{2}+1}}{x^{2}+1}=\dfrac{1}{\sqrt{x^{2}+1}}$ である。`,
            String.raw`$\log4$ を $2\log2$ に直すところまで書いておくと、答えの形が他の項とそろう。`,
          ],
          check: String.raw`$4-2\log2+\dfrac{\pi}{3}=3.6609031901\ldots$。数値積分でも同じ値になる。`,
        },
        {
          label: "問2(2)",
          task: String.raw`$\displaystyle\int_{0}^{\frac{\pi}{2}}\sqrt{\frac{1-\cos x}{1+\cos x}}\,dx$ を求める`,
          answer: String.raw`$\log2$`,
          approach: String.raw`根号の中が半角の公式そのものの形をしている。$\tan^{2}\dfrac{x}{2}$ に直せば根号が外れ、あとは $\tan$ の積分になる。外すときに符号の確認が要る。`,
          blocks: [
            { k: "p", t: String.raw`半角の公式 $1-\cos x=2\sin^{2}\dfrac{x}{2}$、$1+\cos x=2\cos^{2}\dfrac{x}{2}$ より` },
            {
              k: "math",
              t: String.raw`\frac{1-\cos x}{1+\cos x}=\frac{\sin^{2}\frac{x}{2}}{\cos^{2}\frac{x}{2}}=\tan^{2}\frac{x}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。積分区間 $0\le x\le\dfrac{\pi}{2}$ では $0\le\dfrac{x}{2}\le\dfrac{\pi}{4}$ だから $\tan\dfrac{x}{2}\ge0$ であり、根号はそのまま外れて被積分関数は $\tan\dfrac{x}{2}$ になる。`,
            },
            { k: "p", t: String.raw`したがって` },
            {
              k: "math",
              t: String.raw`\int_{0}^{\frac{\pi}{2}}\tan\frac{x}{2}\,dx=\Bigl[-2\log\cos\frac{x}{2}\Bigr]_{0}^{\frac{\pi}{2}}=-2\log\frac{1}{\sqrt2}+2\log1=\log2`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`$\sqrt{\tan^{2}\dfrac{x}{2}}=\left|\tan\dfrac{x}{2}\right|$ である。区間の中で $\tan\dfrac{x}{2}$ が $0$ 以上であることを断ってから絶対値を外す。断らずに外した答案は、ここで減点される。`,
            String.raw`$\cos\dfrac{x}{2}$ は区間内で正なので、$\log$ の中に絶対値は要らない。要らないことを確かめたうえで書かないのと、確かめずに書かないのとでは意味が違う。`,
          ],
          check: String.raw`$\log2=0.6931471806\ldots$。数値積分でも同じ値になる。`,
        },
      ],
    },

    {
      no: 2,
      field: "整数",
      topics: ["平方数", "因数分解", "合同式", "4乗数の剰余"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$x\\le39$、$y\\le199$ の範囲で $x^{6}+y^{4}$ を全探索し、平方数かつ $3$ の倍数の平方になる最小が $2025=3^{6}+6^{4}=45^{2}$ であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`正の整数 $x,y,z$ を用いて $N=9z^{2}=x^{6}+y^{4}$ と表される正の整数 $N$ の最小値を求める`,
          answer: String.raw`$N=2025$（$x=3,\ y=6,\ z=15$）`,
          approach: String.raw`$x^{6}=\left(x^{3}\right)^{2}$ だから、条件は「$\left(x^{3}\right)^{2}+y^{4}$ が平方数になる」こと。平方数の差の形に直せば因数分解でき、$x$ を1つ決めるごとに $y$ の候補が有限個に絞れる。$x$ を大きくすると $N\ge x^{6}$ がすぐ大きくなるので、調べる $x$ は少なくて済む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$9z^{2}=\left(3z\right)^{2}$ だから、$m=3z$ とおくと条件は「$x^{6}+y^{4}=m^{2}$ をみたす正の整数 $m$ が $3$ の倍数として存在する」ことになる。$x^{6}=\left(x^{3}\right)^{2}$ に注意して移項すると`,
            },
            {
              k: "math",
              t: String.raw`m^{2}-\left(x^{3}\right)^{2}=y^{4}\qquad\text{すなわち}\qquad\left(m-x^{3}\right)\left(m+x^{3}\right)=y^{4}`,
            },
            {
              k: "p",
              t: String.raw`となる。$N=x^{6}+y^{4}\ge x^{6}$ だから、$x\ge4$ なら $N\ge4^{6}=4096$ である。あとで $x=3$ のとき $N=2025$ が実現することを示すので、最小値を与える $x$ は $3$ 以下に限られる。そこで $x=1,2,3$ を順に調べる。`,
            },
            {
              k: "p",
              t: String.raw`**$x=1$ または $x=2$ のとき。** $3$ で割った余りを見ると早い。$4$ 乗数を $9$ で割った余りは、$y$ を $9$ で割った余りが $0,1,2,\dots,8$ のそれぞれに対して $0,1,7,0,4,4,0,7,1$ であり、取りうる値は $0,1,4,7$ だけである。一方 $N$ は $9z^{2}$ だから $9$ で割り切れる。`,
            },
            {
              k: "p",
              t: String.raw`$x=1$ なら $y^{4}\equiv-1\equiv8\pmod 9$、$x=2$ なら $y^{4}\equiv-64\equiv8\pmod 9$ が必要になるが、$8$ は上の4つの中にない。よってどちらも解を持たない。`,
            },
            {
              k: "p",
              t: String.raw`**$x=3$ のとき。** $x^{3}=27$ だから $\left(m-27\right)\left(m+27\right)=y^{4}$ である。$y^{4}$ の値は分からないので、代わりに $N=729+y^{4}$ が平方数になる条件を、$\left(m-27\right)\left(m+27\right)$ の形から追う。$a=m-27$、$b=m+27$ とおくと $ab=y^{4}$、$b-a=54$ であり、$a,b$ はともに正で同じ偶奇である。$b-a=54$ は偶数なので、$a,b$ はともに偶数かともに奇数。`,
            },
            {
              k: "p",
              t: String.raw`ここで $y^{4}=ab$ の約数の組を直接探す代わりに、$y$ を小さい方から確かめるほうが早い。$y=1,2,3,4,5$ では $N=730,745,810,985,1354$ となり、いずれも平方数ではない。$y=6$ のとき`,
            },
            {
              k: "math",
              t: String.raw`N=3^{6}+6^{4}=729+1296=2025=45^{2}`,
            },
            {
              k: "p",
              t: String.raw`となり、$45=3\cdot15$ だから $N=9\cdot15^{2}$ と書ける。すなわち $x=3$、$y=6$、$z=15$ が条件をみたす。`,
            },
            {
              k: "p",
              t: String.raw`$x=3$ で $y\le5$ のときは条件をみたさず、$x\le2$ では解がなく、$x\ge4$ では $N\ge4096>2025$ である。よって求める最小値は $N=2025$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$9z^{2}$ という形は「平方数である」だけでなく「その平方根が $3$ の倍数である」ことまで要求している。$x^{6}+y^{4}$ が平方数になる組を見つけただけでは足りない。$2025$ の場合は $\sqrt{2025}=45$ が $3$ の倍数なので、この条件まで確かめて初めて答えになる。`,
            String.raw`$x\ge4$ を切り捨てるには、先に $x=3$ での実例を1つ押さえておく必要がある。実例を出さないまま「$x$ は小さいはず」と書くと、議論の順序が逆になる。`,
            String.raw`$4$ 乗数を $9$ で割った余りが $0,1,4,7$ の4つしかないことは、$y$ を $9$ で割った余りで場合分けして確かめる。使うなら、その表を答案に書いておく。`,
          ],
          check: String.raw`$3^{6}+6^{4}=729+1296=2025$、$45^{2}=2025$、$9\cdot15^{2}=9\cdot225=2025$。$x\le39$、$y\le199$ の範囲を全探索しても、条件をみたす最小は $2025$ だった。`,
        },
      ],
    },

    {
      no: 3,
      field: "微分法",
      topics: ["接線と法線", "対数関数の微分", "増減表", "値域"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "接線の傾きを数値微分で取り直して $p(t)$ を定義どおり作り、$p(t)=t^{3}\\log t\\left(1+2\\log t\\right)$ と一致することを確かめた",
          "$t$ を20万点きざみで動かし、最小 $-\\frac{1}{9\\sqrt e}$・最大 $3e^{3}$ に一致することを全探索で確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\dfrac{1}{\sqrt e}<t\le e$ のとき、$l_t$ と $x$ 軸の交点の $x$ 座標 $p(t)$ の取りうる値の範囲を求める`,
          answer: String.raw`$-\dfrac{1}{9\sqrt e}\le p(t)\le3e^{3}$`,
          approach: String.raw`$p(t)$ を $t$ の式で書き下すのが先。書いてみると $g(x)$ の中の $-\dfrac{1}{1+2\log x}$ が $l_t$ の傾きとちょうど打ち消し合い、$p(t)$ が驚くほど簡単な形になる。あとは $\log t$ を1つの変数と見て増減を調べる。`,
          blocks: [
            { k: "p", t: String.raw`$f(x)=x^{2}\log x$ より $f'(x)=2x\log x+x=x\left(1+2\log x\right)$ である。` },
            {
              k: "p",
              t: String.raw`$t>\dfrac{1}{\sqrt e}$ のとき $\log t>-\dfrac12$ だから $1+2\log t>0$ であり、$t>0$ とあわせて $f'(t)=t\left(1+2\log t\right)>0$。とくに $f'(t)\ne0$ なので、これに垂直な直線の傾き $-\dfrac{1}{f'(t)}$ が定まる。`,
            },
            { k: "p", t: String.raw`$l_t$ は点 $\left(t,\,g(t)\right)$ を通り傾き $-\dfrac{1}{f'(t)}$ の直線だから` },
            {
              k: "math",
              t: String.raw`l_t:\ y-g(t)=-\frac{1}{t\left(1+2\log t\right)}\left(x-t\right)`,
            },
            { k: "p", t: String.raw`である。$y=0$ とおいて $x$ について解くと` },
            {
              k: "math",
              t: String.raw`p(t)=t+t\left(1+2\log t\right)g(t)=t+t\left(1+2\log t\right)\left(t^{2}\log t-\frac{1}{1+2\log t}\right)`,
            },
            {
              k: "p",
              t: String.raw`となる。右辺を展開すると $t\left(1+2\log t\right)\cdot\dfrac{1}{1+2\log t}=t$ がちょうど先頭の $t$ を打ち消すので`,
            },
            {
              k: "math",
              t: String.raw`p(t)=t^{3}\log t\left(1+2\log t\right)`,
            },
            { k: "p", t: String.raw`と書ける。$g(x)$ に $-\dfrac{1}{1+2\log x}$ が入っていたのは、この打ち消しを起こすためである。` },
            {
              k: "p",
              t: String.raw`ここで $s=\log t$ とおく。$t=e^{s}$ であり、$\dfrac{1}{\sqrt e}<t\le e$ は $-\dfrac12<s\le1$ にあたる。$t$ と $s$ は同じ向きに増減するので、$s$ で調べれば $t$ での増減が分かる。`,
            },
            {
              k: "math",
              t: String.raw`p=e^{3s}\left(2s^{2}+s\right),\qquad
\frac{dp}{ds}=e^{3s}\left(6s^{2}+3s\right)+e^{3s}\left(4s+1\right)=e^{3s}\left(6s+1\right)\left(s+1\right)`,
            },
            {
              k: "p",
              t: String.raw`$-\dfrac12<s\le1$ では $s+1>0$ なので、$\dfrac{dp}{ds}$ の符号は $6s+1$ の符号と一致する。よって $-\dfrac12<s<-\dfrac16$ で減少、$-\dfrac16<s\le1$ で増加し、$s=-\dfrac16$ で最小になる。`,
            },
            {
              k: "math",
              t: String.raw`p\left(-\tfrac16\right)=e^{-\frac12}\left(2\cdot\frac{1}{36}-\frac16\right)=e^{-\frac12}\cdot\left(-\frac19\right)=-\frac{1}{9\sqrt e}`,
            },
            {
              k: "p",
              t: String.raw`端では、$s\to-\dfrac12$ のとき $2s^{2}+s=2\cdot\dfrac14-\dfrac12=0$ だから $p\to0$ である。ただし $s=-\dfrac12$ は定義域に入らないので、この $0$ は取らない。$s=1$ では $p=e^{3}\left(2+1\right)=3e^{3}$ で、これは取る。`,
            },
            {
              k: "p",
              t: String.raw`減少する区間 $-\dfrac12<s\le-\dfrac16$ で $p$ は $0$ の手前から $-\dfrac{1}{9\sqrt e}$ まで連続に動き、増加する区間 $-\dfrac16\le s\le1$ で $-\dfrac{1}{9\sqrt e}$ から $3e^{3}$ まで連続に動く。後者だけで $-\dfrac{1}{9\sqrt e}$ 以上 $3e^{3}$ 以下のすべての値を取るので、求める範囲は`,
            },
            {
              k: "math",
              t: String.raw`-\frac{1}{9\sqrt e}\le p(t)\le3e^{3}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$t>\dfrac{1}{\sqrt e}$ という条件は、$f'(t)\ne0$ を保証して「垂直な直線」が引けるようにするために置かれている。この確認を飛ばすと、傾き $-\dfrac{1}{f'(t)}$ を書いた時点で根拠が抜ける。`,
            String.raw`最小値を取る $s=-\dfrac16$ は定義域の内側にあり、端の $s=-\dfrac12$ は定義域に入らない。開いている端で $p\to0$ となることと、$0$ 自体は別の $s$ で取れることを分けて書く。`,
            String.raw`$p$ が区間の両端より内部で小さくなるので、端の値だけを比べる解き方では最小値を取り逃がす。増減表まで書く。`,
          ],
          check: String.raw`$t=e$ では $p=e^{3}\cdot1\cdot3=3e^{3}=60.2566\ldots$。$t=e^{-1/6}=0.8465\ldots$ では $p=-0.0673922\ldots$ で、$-\dfrac{1}{9\sqrt e}=-0.0673922\ldots$ と一致する。接線の傾きを数値微分で取り直して $p(t)$ を定義どおり作っても、同じ値になる。`,
        },
      ],
    },

    {
      no: 4,
      field: "空間ベクトル",
      topics: ["平面のベクトル方程式", "1次独立", "四面体の体積比"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "具体のベクトルで $s,t,u$ を条件の上で300通り取り、$\\mathrm{P}$ を含む3点との行列式が毎回 $0$ になる（平面 LMN 上にある）ことを確かめた",
          "同じベクトルで四面体 PABC と OABC の体積を外積で出し、比がちょうど $\\frac12$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面 $\mathrm{LMN}$ が $s,t,u$ によらない一定の点 $\mathrm{P}$ を通ること、およびそのような $\mathrm{P}$ がただ1つであることを示す`,
          answer: String.raw`$\vec{\mathrm{OP}}=\dfrac14\vec{\mathrm{OA}}+\dfrac12\vec{\mathrm{OB}}+\dfrac34\vec{\mathrm{OC}}$`,
          approach: String.raw`平面 $\mathrm{LMN}$ 上の点は、係数の和が $1$ になる形で $\mathrm{L},\mathrm{M},\mathrm{N}$ の1次結合に書ける。その係数の和が $1$ という条件と、与えられた $\dfrac1s+\dfrac2t+\dfrac3u=4$ を見比べると、どの係数を取ればよいかが読み取れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\vec{\mathrm{OA}}$、$\vec b=\vec{\mathrm{OB}}$、$\vec c=\vec{\mathrm{OC}}$ とおく。$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ は同一平面上にないので、$\vec a,\vec b,\vec c$ は1次独立であり、空間のどのベクトルもこれらで一意に表せる。`,
            },
            {
              k: "p",
              t: String.raw`$s,t,u$ は $0$ でないので $\mathrm{L},\mathrm{M},\mathrm{N}$ はいずれも $\mathrm{O}$ と異なり、$\vec{\mathrm{OL}}=s\vec a$、$\vec{\mathrm{OM}}=t\vec b$、$\vec{\mathrm{ON}}=u\vec c$ も1次独立である。よって3点は平面をただ1つ定める。点 $\mathrm{X}$ がこの平面上にあることは`,
            },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{OX}}=\alpha\,s\vec a+\beta\,t\vec b+\gamma\,u\vec c,\qquad\alpha+\beta+\gamma=1`,
            },
            { k: "p", t: String.raw`をみたす実数 $\alpha,\beta,\gamma$ があることと同値である。` },
            { k: "p", t: String.raw`そこで` },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{OP}}=\frac14\vec a+\frac12\vec b+\frac34\vec c`,
            },
            {
              k: "p",
              t: String.raw`とおく。これは $s,t,u$ を含まないので、$s,t,u$ の値によらず定まる点である。$\alpha=\dfrac{1}{4s}$、$\beta=\dfrac{1}{2t}$、$\gamma=\dfrac{3}{4u}$ と取れば $\alpha s\vec a+\beta t\vec b+\gamma u\vec c=\vec{\mathrm{OP}}$ であり、係数の和は`,
            },
            {
              k: "math",
              t: String.raw`\alpha+\beta+\gamma=\frac{1}{4s}+\frac{1}{2t}+\frac{3}{4u}=\frac14\left(\frac1s+\frac2t+\frac3u\right)=\frac14\cdot4=1`,
            },
            {
              k: "p",
              t: String.raw`となる。したがって $\mathrm{P}$ は、条件をみたすどの $s,t,u$ についても平面 $\mathrm{LMN}$ 上にある。`,
            },
            {
              k: "p",
              t: String.raw`次に、そのような点がこれ1つであることを示す。点 $\mathrm{Q}$ が同じ性質を持つとし、$\vec{\mathrm{OQ}}=X\vec a+Y\vec b+Z\vec c$ と表す。$\mathrm{Q}$ が平面 $\mathrm{LMN}$ 上にあることは、上と同じ議論で`,
            },
            {
              k: "math",
              t: String.raw`\frac{X}{s}+\frac{Y}{t}+\frac{Z}{u}=1`,
            },
            {
              k: "p",
              t: String.raw`と書ける。$\xi=\dfrac1s$、$\eta=\dfrac1t$、$\zeta=\dfrac1u$ とおくと、条件は「$\xi+2\eta+3\zeta=4$ をみたす $0$ でない $\xi,\eta,\zeta$ のすべてについて $X\xi+Y\eta+Z\zeta=1$ が成り立つ」ことになる。`,
            },
            {
              k: "p",
              t: String.raw`この条件をみたす組を3つ取って連立させればよい。たとえば $\left(\xi,\eta,\zeta\right)=\left(2,\dfrac12,\dfrac13\right),\left(1,1,\dfrac13\right),\left(1,\dfrac12,\dfrac23\right)$ はいずれも $\xi+2\eta+3\zeta=4$ をみたす。これらを代入して差を取ると`,
            },
            {
              k: "math",
              t: String.raw`X-\frac{Y}{2}=0,\qquad \frac{Y}{2}-\frac{Z}{3}=0`,
            },
            {
              k: "p",
              t: String.raw`すなわち $Y=2X$、$Z=3X$ を得る。これを $X\xi+Y\eta+Z\zeta=1$ の1つ、たとえば $\left(1,1,\dfrac13\right)$ に入れると $X+2X+X=1$ から $X=\dfrac14$ となり、$Y=\dfrac12$、$Z=\dfrac34$ が定まる。$\vec a,\vec b,\vec c$ が1次独立だから、この係数を持つ点は1つしかない。よって $\mathrm{Q}=\mathrm{P}$ であり、そのような点はただ1つである。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ が同一平面上にないという条件は、$\vec a,\vec b,\vec c$ が1次独立であること、つまり係数が一意に決まることのために置かれている。ただ1つであることの証明は、最後にこれを使う。`,
            String.raw`$s,t,u$ が $0$ でないという条件がないと、$\mathrm{L},\mathrm{M},\mathrm{N}$ のどれかが $\mathrm{O}$ と一致して平面が定まらない。`,
            String.raw`「ただ1つ」を示すには、条件をみたす $\left(s,t,u\right)$ を**具体的に複数**取って連立させるのがいちばん短い。1つだけでは係数が決まらない。`,
          ],
          check: String.raw`$\left(s,t,u\right)=\left(1,2,3\right)$ は $\dfrac11+\dfrac22+\dfrac33=3$ となり条件をみたさない。条件をみたす組としては $\left(\dfrac12,2,3\right)$ があり、このとき $\dfrac1s+\dfrac2t+\dfrac3u=2+1+1=4$。係数は $\alpha=\dfrac12,\beta=\dfrac14,\gamma=\dfrac14$ で和は $1$ になる。`,
        },
        {
          label: "(2)",
          task: String.raw`四面体 $\mathrm{OABC}$ の体積を $V$ とするとき、四面体 $\mathrm{PABC}$ の体積を $V$ で表す`,
          answer: String.raw`$\dfrac12V$`,
          approach: String.raw`底面 $\mathrm{ABC}$ が共通なので、比べるのは $\mathrm{O}$ と $\mathrm{P}$ の平面 $\mathrm{ABC}$ までの距離だけ。$\vec a,\vec b,\vec c$ の係数の和を見れば、距離の比は計算せずに読み取れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`点 $\mathrm{X}$ を $\vec{\mathrm{OX}}=x\vec a+y\vec b+z\vec c$ と表したとき、$\mathrm{X}$ が平面 $\mathrm{ABC}$ 上にあることは $x+y+z=1$ と同値である。そこで $h(\mathrm{X})=x+y+z-1$ とおくと、$h$ は $\mathrm{X}$ の座標の1次式なので、$\left|h(\mathrm{X})\right|$ は $\mathrm{X}$ から平面 $\mathrm{ABC}$ までの距離に比例する。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{O}$ では $x=y=z=0$ だから $h(\mathrm{O})=-1$ で $\left|h(\mathrm{O})\right|=1$。$\mathrm{P}$ では`,
            },
            {
              k: "math",
              t: String.raw`h(\mathrm{P})=\frac14+\frac12+\frac34-1=\frac12`,
            },
            {
              k: "p",
              t: String.raw`だから $\left|h(\mathrm{P})\right|=\dfrac12$ である。四面体 $\mathrm{OABC}$ と $\mathrm{PABC}$ は底面 $\mathrm{ABC}$ が共通なので、体積の比は高さの比に等しく`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(\text{四面体 PABC}\right)}{\left(\text{四面体 OABC}\right)}=\frac{\left|h(\mathrm{P})\right|}{\left|h(\mathrm{O})\right|}=\frac12`,
            },
            { k: "p", t: String.raw`となる。よって四面体 $\mathrm{PABC}$ の体積は $\dfrac12V$ である。` },
            {
              k: "p",
              t: String.raw`なお $h(\mathrm{P})>0$、$h(\mathrm{O})<0$ なので、$\mathrm{P}$ と $\mathrm{O}$ は平面 $\mathrm{ABC}$ の反対側にある。体積を比べるだけなら符号は効かないが、位置を答案で説明するときはここに触れておくとよい。`,
            },
          ],
          alts: [
            {
              title: "外積を使わずに、分点で高さをたどる",
              blocks: [
                {
                  k: "p",
                  t: String.raw`$\vec{\mathrm{OP}}=\dfrac14\vec a+\dfrac12\vec b+\dfrac34\vec c$ の係数の和は $\dfrac32$ である。$\vec{\mathrm{OP}}=\dfrac32\cdot\left(\dfrac16\vec a+\dfrac13\vec b+\dfrac12\vec c\right)$ と書き直すと、括弧の中は係数の和が $1$ なので平面 $\mathrm{ABC}$ 上の点 $\mathrm{G}$ を表す。`,
                },
                {
                  k: "p",
                  t: String.raw`つまり $\mathrm{P}$ は半直線 $\mathrm{OG}$ 上にあって $\mathrm{OP}=\dfrac32\,\mathrm{OG}$ である。$\mathrm{G}$ は平面 $\mathrm{ABC}$ 上にあるから、$\mathrm{O}$ から平面までの距離を $d$ とすると、$\mathrm{P}$ から平面までの距離は $\left|\dfrac32-1\right|d=\dfrac12 d$ になる。したがって体積の比は $\dfrac12$ である。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`「係数の和が $1$ なら平面 $\mathrm{ABC}$ 上」は、$\vec a,\vec b,\vec c$ が1次独立なとき成り立つ。(1) で確かめた条件をここでも使っている。`,
            String.raw`$\mathrm{P}$ が平面 $\mathrm{ABC}$ の $\mathrm{O}$ と反対側にあるので、$h$ の絶対値を取らずに比を書くと符号が合わない。`,
          ],
          check: String.raw`$\vec a=(1,0.3,-0.2)$、$\vec b=(0.1,2,0.4)$、$\vec c=(-0.3,0.5,1.7)$ で計算すると $V=0.49716667$、四面体 $\mathrm{PABC}$ の体積は $0.24858333$ で、ちょうど半分になる。`,
        },
      ],
    },

    {
      no: 5,
      field: "空間図形・軌跡",
      topics: ["直線と平面の交点", "媒介変数の消去", "双曲線"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$\\theta$ を20万点きざみで動かして $\\mathrm{Q}$ を直接求め、$\\left(x+\\sqrt2\\right)^{2}-y^{2}=1$ を相対誤差 $2.4\\times10^{-15}$ 以下でみたすことを確かめた",
          "同じ全探索で $x$ の最大が $-\\left(\\sqrt2+1\\right)$ になり、左側の分枝だけに乗ることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$-\dfrac{\pi}{4}<\theta<\dfrac{\pi}{4}$ のときの点 $\mathrm{Q}$ の軌跡を求め、$xy$ 平面上に図示する`,
          answer: String.raw`双曲線 $\left(x+\sqrt2\right)^{2}-y^{2}=1$ のうち $x\le-\sqrt2-1$ の部分（左側の分枝の全体）`,
          approach: String.raw`$\mathrm{Q}$ は $\mathrm{A}$ と $\mathrm{P}$ を結ぶ直線の $z=0$ での点なので、媒介変数で書いて $z$ 成分から係数を決める。そのあとは $\theta$ を消す。$x^{2}+y^{2}$ を作ると $\cos\theta,\sin\theta$ がまとめて消えるので、そこから攻める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`直線 $\mathrm{AP}$ 上の点は、実数 $k$ を用いて $\vec{\mathrm{OA}}+k\left(\vec{\mathrm{OP}}-\vec{\mathrm{OA}}\right)$ と書ける。$z$ 成分が $0$ になる条件は`,
            },
            {
              k: "math",
              t: String.raw`\frac{\sqrt2}{4}+k\left(\frac12\cos\theta-\frac{\sqrt2}{4}\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$-\dfrac{\pi}{4}<\theta<\dfrac{\pi}{4}$ では $\cos\theta>\dfrac{\sqrt2}{2}$ だから $\dfrac12\cos\theta-\dfrac{\sqrt2}{4}>0$ であり、$k$ がただ1つ定まる。すなわちこの範囲では直線 $\mathrm{AP}$ は $xy$ 平面と必ず1点で交わる。両辺を4倍して整理すると`,
            },
            {
              k: "math",
              t: String.raw`k=\frac{\sqrt2}{\sqrt2-2\cos\theta}`,
            },
            {
              k: "p",
              t: String.raw`となる。以下 $d=\sqrt2-2\cos\theta$ とおく。$\cos\theta>\dfrac{\sqrt2}{2}$ より $d<0$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{A}$ の $x,y$ 成分はどちらも $0$ なので、$\mathrm{Q}$ の座標は`,
            },
            {
              k: "math",
              t: String.raw`x=\frac{\sqrt2\cos\theta}{d},\qquad y=\frac{\sqrt2\sin\theta}{d}`,
            },
            { k: "p", t: String.raw`である。ここから $\theta$ を消す。まず2乗して足すと $\cos\theta,\sin\theta$ が消えて` },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}=\frac{2\left(\cos^{2}\theta+\sin^{2}\theta\right)}{d^{2}}=\frac{2}{d^{2}}`,
            },
            {
              k: "p",
              t: String.raw`となる。$r=\sqrt{x^{2}+y^{2}}$ とおくと $\left|d\right|=\dfrac{\sqrt2}{r}$ であり、$d<0$ だから $d=-\dfrac{\sqrt2}{r}$ である。`,
            },
            {
              k: "p",
              t: String.raw`次に $x$ の式から $\cos\theta=\dfrac{dx}{\sqrt2}$ を得る。これを $d$ の定義 $d=\sqrt2-2\cos\theta$ に戻すと`,
            },
            {
              k: "math",
              t: String.raw`d=\sqrt2-\sqrt2\,dx\quad\Longrightarrow\quad d\left(1+\sqrt2\,x\right)=\sqrt2`,
            },
            { k: "p", t: String.raw`となる。$d=-\dfrac{\sqrt2}{r}$ を代入して整理すると` },
            {
              k: "math",
              t: String.raw`-\frac{\sqrt2}{r}\left(1+\sqrt2\,x\right)=\sqrt2\quad\Longrightarrow\quad r=-\left(1+\sqrt2\,x\right)`,
            },
            {
              k: "p",
              t: String.raw`を得る。$r\ge0$ だから、この式は $1+\sqrt2\,x\le0$ すなわち $x\le-\dfrac{1}{\sqrt2}$ を意味する。両辺を2乗して $r^{2}=x^{2}+y^{2}$ を代入すると`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+y^{2}=1+2\sqrt2\,x+2x^{2}\quad\Longrightarrow\quad\left(x+\sqrt2\right)^{2}-y^{2}=1`,
            },
            {
              k: "p",
              t: String.raw`となる。これは中心 $\left(-\sqrt2,\,0\right)$、$x$ 軸方向に $1$、$y$ 軸方向に $1$ の双曲線である。この曲線上では $\left(x+\sqrt2\right)^{2}=1+y^{2}\ge1$ だから $x\ge-\sqrt2+1$ または $x\le-\sqrt2-1$ であり、先に出た $x\le-\dfrac{1}{\sqrt2}$ とあわせると $x\le-\sqrt2-1$、つまり左側の分枝に限られる。`,
            },
            {
              k: "p",
              t: String.raw`逆に、左側の分枝の各点が実際に現れることを確かめる。$\theta=0$ のとき $d=\sqrt2-2$ で $x=-\sqrt2-1$、$y=0$ となり、これは左側の分枝の頂点である。$\theta$ を $0$ から $\dfrac{\pi}{4}$ に近づけると $d\to0^{-}$ で $\sin\theta>0$ だから $y\to-\infty$、$\theta$ を $-\dfrac{\pi}{4}$ に近づけると $y\to+\infty$ となる。$y$ は $\theta$ の連続関数なので、中間値の定理からすべての実数値を取る。左側の分枝は $y$ の値で1点に定まるので、分枝全体が軌跡である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`点 $\mathrm{Q}$ の軌跡。双曲線 $\left(x+\sqrt2\right)^{2}-y^{2}=1$ の左側の分枝全体で、頂点は $\left(-\sqrt2-1,\,0\right)$。破線は漸近線 $y=\pm\left(x+\sqrt2\right)$、薄い曲線は軌跡に含まれない右側の分枝。`,
                view: [-6.2, 1.6, -3.4, 3.4],
                step: { x: 1, y: 1 },
                items: [
                  // 左の分枝（描く方）
                  {
                    k: "param",
                    f: (t: number) => [-Math.sqrt(2) - Math.cosh(t), Math.sinh(t)] as [number, number],
                    from: -1.95,
                    to: 1.95,
                  },
                  // 右の分枝は軌跡ではないので、薄い破線で位置だけ示す
                  {
                    k: "param",
                    f: (t: number) => [-Math.sqrt(2) + Math.cosh(t), Math.sinh(t)] as [number, number],
                    from: -1.3,
                    to: 1.3,
                    dash: true,
                    faint: true,
                  },
                  // 漸近線
                  { k: "seg", a: [-5.6, -4.186], b: [1.2, 2.614], dash: true, faint: true },
                  { k: "seg", a: [-5.6, 4.186], b: [1.2, -2.614], dash: true, faint: true },
                  // 図の中の文字はそのまま SVG に入る。数式の命令は書かず、記号を直に置く
                  { k: "dot", at: [-Math.sqrt(2), 0], label: "中心 (−√2, 0)", place: "below-right" },
                  { k: "dot", at: [-Math.sqrt(2) - 1, 0], label: "(−√2−1, 0)", place: "above-left" },
                  { k: "text", at: [-5.1, 2.2], label: "これが軌跡", place: "right" },
                ],
              },
            },
            {
              k: "p",
              t: String.raw`以上より、点 $\mathrm{Q}$ の軌跡は双曲線 $\left(x+\sqrt2\right)^{2}-y^{2}=1$ の $x\le-\sqrt2-1$ の部分、すなわち左側の分枝の全体である。`,
            },
          ],
          pitfalls: [
            String.raw`2乗して $\theta$ を消すと、元の条件より広い図形が出てくる。$r=-\left(1+\sqrt2\,x\right)$ の段階で $r\ge0$ から $x\le-\dfrac{1}{\sqrt2}$ が出ており、これが右側の分枝を落とす根拠になる。2乗する前の式を書き残しておくこと。`,
            String.raw`「軌跡を求めよ」なので、得られた曲線の上の点がすべて実際に現れることまで示す。$\theta=0$ での頂点と、両端で $y$ が $\pm\infty$ に飛ぶことを押さえれば、連続性から全体が埋まる。`,
            String.raw`$-\dfrac{\pi}{4}<\theta<\dfrac{\pi}{4}$ という範囲は、$\dfrac12\cos\theta\ne\dfrac{\sqrt2}{4}$ すなわち直線 $\mathrm{AP}$ が $xy$ 平面と平行にならないことを保証している。範囲の端では交点が存在しない。`,
          ],
          check: String.raw`$\theta=\dfrac{\pi}{6}$ では $d=\sqrt2-\sqrt3=-0.31784\ldots$ で $\mathrm{Q}=\left(-3.8534\ldots,\,-2.2248\ldots\right)$。$\left(x+\sqrt2\right)^{2}-y^{2}=5.9497\ldots-4.9497\ldots=1.0000\ldots$ となる。`,
        },
      ],
    },

    {
      no: 6,
      field: "確率",
      topics: ["確率漸化式", "偶奇の追跡", "隣り合う2項の積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$n=2$ から $18$ まで $2^{n}$ 通りを全探索して $Y_n$ の偶奇を数え、分数のまま式と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$Y_n=\displaystyle\sum_{k=2}^{n}X_{k-1}X_k$ が奇数である確率 $p_n$ を求める`,
          answer: String.raw`$n=2m$ のときも $n=2m+1$ のときも $p_n=\dfrac12\left(1-\dfrac{1}{2^{m}}\right)$`,
          approach: String.raw`$Y_n$ の値そのものではなく**偶奇だけ**を追う。$n$ 回目までの結果で次に必要なのは「最後が表か裏か」と「ここまでの偶奇」の2つだけなので、4つの状態の確率漸化式になる。さらに「偶の確率から奇の確率を引いた量」を見ると、2つの式に減って一気に解ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$X_{k-1}X_k$ は、$k-1$ 回目と $k$ 回目が**どちらも表**のとき $1$、それ以外は $0$ である。したがって $Y_n$ は「表が隣り合う箇所の個数」を数えている。`,
            },
            {
              k: "p",
              t: String.raw`$n$ 回目までの状況を、最後の出目と $Y_n$ の偶奇で4つに分ける。$a_n,b_n$ を「$X_n=1$ で $Y_n$ が偶数・奇数」である確率、$c_n,d_n$ を「$X_n=0$ で $Y_n$ が偶数・奇数」である確率とする。$a_n+b_n+c_n+d_n=1$ であり、求めるものは $p_n=b_n+d_n$ である。`,
            },
            {
              k: "p",
              t: String.raw`$n+1$ 回目を投げたとき、$Y$ が増えるのは「直前が表で、今回も表」のときだけで、そのとき $1$ だけ増えて偶奇が入れ替わる。それ以外では偶奇は変わらない。どの目も確率 $\dfrac12$ だから`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_{n+1}&=\tfrac12\left(b_n+c_n\right), & b_{n+1}&=\tfrac12\left(a_n+d_n\right),\\
c_{n+1}&=\tfrac12\left(a_n+c_n\right), & d_{n+1}&=\tfrac12\left(b_n+d_n\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`となる。$a_{n+1}$ の右辺に $b_n$ が入るのは、直前が表で $Y$ が奇数だったものが、今回も表で偶数に変わるからである。`,
            },
            {
              k: "p",
              t: String.raw`このまま4つを追うのは重い。偶奇を分けたまま扱うより、**差**を見るほうが式が減る。$u_n=a_n-b_n$、$v_n=c_n-d_n$ とおくと、上の4式から`,
            },
            {
              k: "math",
              t: String.raw`u_{n+1}=\tfrac12\left(-u_n+v_n\right),\qquad v_{n+1}=\tfrac12\left(u_n+v_n\right)`,
            },
            {
              k: "p",
              t: String.raw`を得る。さらに $w_n=u_n+v_n$ とおくと、2式を足して $w_{n+1}=v_n$、下の式から $v_{n+1}=\dfrac12 w_n$ だから`,
            },
            {
              k: "math",
              t: String.raw`w_{n+2}=v_{n+1}=\frac12\,w_n`,
            },
            {
              k: "p",
              t: String.raw`となる。$w$ は1つ飛ばしで公比 $\dfrac12$ の等比数列である。`,
            },
            {
              k: "p",
              t: String.raw`初期値を求める。$n=1$ では $Y_1$ は和が空なので $Y_1=0$ であり、偶数である。表なら $a_1=\dfrac12$、裏なら $c_1=\dfrac12$ で $b_1=d_1=0$ だから $u_1=\dfrac12$、$v_1=\dfrac12$、よって $w_1=1$。また $w_2=v_1=\dfrac12$ である。`,
            },
            {
              k: "p",
              t: String.raw`$w_{n+2}=\dfrac12 w_n$ と $w_1=1$、$w_2=\dfrac12$ から、$m$ を $0$ 以上の整数として`,
            },
            {
              k: "math",
              t: String.raw`w_{2m+1}=\left(\frac12\right)^{m},\qquad w_{2m}=\left(\frac12\right)^{m}`,
            },
            {
              k: "p",
              t: String.raw`となる。一方 $w_n=\left(a_n+c_n\right)-\left(b_n+d_n\right)$ は「偶数である確率」から「奇数である確率」を引いたものだから、$w_n=\left(1-p_n\right)-p_n=1-2p_n$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`p_n=\frac{1-w_n}{2}`,
            },
            {
              k: "p",
              t: String.raw`であり、$n=2m$ のときも $n=2m+1$ のときも $p_n=\dfrac12\left(1-\dfrac{1}{2^{m}}\right)$ となる。$n$ が $2$ 以上という条件のもとでは $m\ge1$ である。`,
            },
            {
              k: "p",
              t: String.raw`言い換えると、$n$ を $2$ で割った商を $m$ とすれば $p_n=\dfrac12\left(1-\dfrac{1}{2^{m}}\right)$ で、$n$ が1つ増えても $n$ が偶数から奇数に変わるときは値が変わらない。`,
            },
          ],
          alts: [
            {
              title: "表の個数と表の連なりの個数の差として見る",
              blocks: [
                {
                  k: "p",
                  t: String.raw`表が連続している1つのかたまりの長さを $L$ とすると、そのかたまりが $Y_n$ に与える寄与は $L-1$ である。したがって、表の総数を $H$、表のかたまりの個数を $R$ とすると $Y_n=H-R$ と書ける。`,
                },
                {
                  k: "p",
                  t: String.raw`$Y_n$ の偶奇は $H$ と $R$ の偶奇が一致するかどうかで決まる。この見方からも同じ漸化式が立つが、$H$ と $R$ を同時に追うことになるので、状態は結局4つのままである。上の解き方のほうが短い。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`$Y_n$ は「表の個数」ではない。表が3つ連続すれば寄与は $2$ である。隣り合う組を数えていることを最初に押さえないと、$n$ 回中の表の個数の偶奇を求める別の問題を解いてしまう。`,
            String.raw`$n=1$ のとき和は空で $Y_1=0$ とする。この初期値を $n=2$ から立てると、$w_1,w_2$ の両方が要る漸化式の初期条件が1つ足りなくなる。`,
            String.raw`偶奇を追う問題では、確率そのものより「偶の確率と奇の確率の差」を変数に取ると式が減ることが多い。差の総和 $w_n$ が $1-2p_n$ になることは、答えに戻すときに必ず使う。`,
          ],
          check: String.raw`$n=2$ では $Y_2=X_1X_2$ が奇数になるのは2回とも表のときだけで $p_2=\dfrac14$。式でも $m=1$ として $\dfrac12\left(1-\dfrac12\right)=\dfrac14$。$n=5$ では全探索で $\dfrac38$、式でも $m=2$ として $\dfrac12\left(1-\dfrac14\right)=\dfrac38$。$n=8$ では全探索・式ともに $\dfrac{15}{32}$ になる。`,
        },
      ],
    },
  ],
};
