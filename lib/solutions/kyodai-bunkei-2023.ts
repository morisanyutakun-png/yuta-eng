import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2023年度（令和5年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで5問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第3問の図。単位円に内接する正五角形の頂点（上から反時計回り）。 */
const PENT = Array.from({ length: 5 }, (_, k): [number, number] => [
  Math.cos(Math.PI / 2 + (2 * Math.PI * k) / 5),
  Math.sin(Math.PI / 2 + (2 * Math.PI * k) / 5),
]);

export const kyodaiBunkei2023: SolutionSet = {
  slug: "kyodai-bunkei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "京都大学",
  short: "京大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "確率／式の計算",
      topics: ["余事象", "3乗根の有理化", "整式の割り算", "反復試行"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$n=1$ から $6$ まで $6^{n}$ 通りの出目をすべて列挙して積が $5$ の倍数になる確率を数えると、$\\frac16,\\frac{11}{36},\\frac{91}{216},\\frac{671}{1296},\\frac{4651}{7776},\\frac{31031}{46656}$ となり、$1-\\left(\\frac56\\right)^{n}$ と完全に一致した",
          "$t=\\sqrt[3]{3}$ として $\\left(2t^{2}+t+5\\right)\\left(9t^{2}-7t-19\\right)=-110.000000000$ を数値で確かめた",
          "$\\frac{55}{2\\sqrt[3]{9}+\\sqrt[3]{3}+5}=5.187496292$ と $\\frac{19+7\\sqrt[3]{3}-9\\sqrt[3]{9}}{2}=5.187496292$ が一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`さいころを $n$ 回投げたとき、出た目の積が $5$ で割り切れる確率を求める`,
          answer: String.raw`$1-\left(\dfrac56\right)^{n}$`,
          approach: String.raw`$5$ は素数で、$1$ から $6$ のうち $5$ の倍数は $5$ だけである。だから積が $5$ で割り切れるのは「少なくとも1回 $5$ が出る」ときで、余事象をとるのがいちばん速い。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$5$ は素数なので、積が $5$ で割り切れるのは、因数に $5$ をもつ目が少なくとも1回出るときである。$1,2,3,4,5,6$ のうち $5$ の倍数は $5$ だけだから、条件は`,
            },
            { k: "math", t: String.raw`n\text{ 回のうち少なくとも1回は }5\text{ が出る}` },
            { k: "p", t: String.raw`である。余事象は「$1$ 回も $5$ が出ない」で、各回 $5$ 以外が出る確率は $\dfrac56$ だから` },
            {
              k: "math",
              t: String.raw`P=1-\left(\frac56\right)^{n}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=1$ で $\dfrac16$、$n=2$ で $1-\dfrac{25}{36}=\dfrac{11}{36}$ である。$n$ を大きくすると $1$ に近づく。`,
            },
          ],
          pitfalls: [
            String.raw`「積が $5$ の倍数」を「積が $5$ 以外の素因数をもたない」などと読み違えない。$5$ が1回でも出れば、他の目が何であっても積は $5$ の倍数である。`,
            String.raw`$5$ が素数であることが効いている。たとえば「積が $4$ で割り切れる」なら、$2$ が2回出る場合なども数えることになり、余事象だけでは済まない。`,
          ],
          check: String.raw`$n=1,\dots,6$ について $6^{n}$ 通りの出目をすべて列挙して積が $5$ の倍数になる確率を数えると、$\frac16,\frac{11}{36},\frac{91}{216},\frac{671}{1296},\frac{4651}{7776},\frac{31031}{46656}$ となり、$\frac{6^{n}-5^{n}}{6^{n}}=1-\left(\frac56\right)^{n}$ と完全に一致する。`,
        },
        {
          label: "問2",
          task: String.raw`$\dfrac{55}{2\sqrt[3]{9}+\sqrt[3]{3}+5}$ の分母を有理化する`,
          answer: String.raw`$\dfrac{19+7\sqrt[3]{3}-9\sqrt[3]{9}}{2}$`,
          approach: String.raw`$t=\sqrt[3]{3}$ とおくと $t^{3}=3$、$\sqrt[3]{9}=t^{2}$ で、分母は $t$ の2次式になる。かける相手も $t$ の2次式 $at^{2}+bt+c$ とおき、$t^{3}=3$、$t^{4}=3t$ を使って展開してから、$t^{2}$ と $t$ の係数が消えるように $a,b,c$ を決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$t=\sqrt[3]{3}$ とおく。$t^{3}=3$、$t^{4}=3t$、$\sqrt[3]{9}=t^{2}$ なので、分母は $2t^{2}+t+5$ である。`,
            },
            {
              k: "p",
              t: String.raw`**かける式を探す。** $at^{2}+bt+c$ を掛けて展開し、$t^{3}=3$、$t^{4}=3t$ で次数を下げると`,
            },
            {
              k: "math",
              t: String.raw`\left(2t^{2}+t+5\right)\left(at^{2}+bt+c\right)=\left(5a+b+2c\right)t^{2}+\left(6a+5b+c\right)t+\left(3a+6b+5c\right)`,
            },
            { k: "p", t: String.raw`となる。$t^{2}$ と $t$ の係数を $0$ にすればよいので` },
            {
              k: "math",
              t: String.raw`\begin{cases}5a+b+2c=0\\[1mm]6a+5b+c=0\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`を解く。1本目から $b=-5a-2c$、これを2本目に入れると $6a-25a-10c+c=-19a-9c=0$ で $c=-\dfrac{19}{9}a$ である。$a=9$ ととると`,
            },
            { k: "math", t: String.raw`a=9,\qquad c=-19,\qquad b=-45+38=-7` },
            { k: "p", t: String.raw`となる。このとき定数項は` },
            {
              k: "math",
              t: String.raw`3a+6b+5c=27-42-95=-110`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\left(2t^{2}+t+5\right)\left(9t^{2}-7t-19\right)=-110`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**有理化する。** 分母・分子に $9t^{2}-7t-19$ を掛けると` },
            {
              k: "math",
              t: String.raw`\frac{55}{2t^{2}+t+5}=\frac{55\left(9t^{2}-7t-19\right)}{-110}=\frac{-9t^{2}+7t+19}{2}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{55}{2\sqrt[3]{9}+\sqrt[3]{3}+5}=\frac{19+7\sqrt[3]{3}-9\sqrt[3]{9}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$55$ と $110$ の関係から $\dfrac12$ がきれいに残る。問題の分子が $55$ なのはそのためである。`,
            },
          ],
          pitfalls: [
            String.raw`$t^{4}$ が出てくるので、$t^{4}=t\cdot t^{3}=3t$ と下げる。$t^{3}=3$ だけ使って止めないこと。`,
            String.raw`$a,b,c$ は比だけ決まるので、分数を避けられる $a=9$ をとる。$a=1$ でも最後に約分すれば同じ答えになる。`,
            String.raw`$\sqrt[3]{3}+\sqrt[3]{9}$ のような形を「$x^{3}-y^{3}$ の因数分解」で消そうとしても、項が3つあるので1回では消えない。連立方程式で係数を決めるほうが確実である。`,
          ],
          check: String.raw`$\sqrt[3]{3}=1.442250$、$\sqrt[3]{9}=2.080084$ として、もとの式は $\frac{55}{10.602418}=5.187496$、答えの式は $\frac{19+10.095748-18.720755}{2}=5.187496$ で一致する。$\left(2t^{2}+t+5\right)\left(9t^{2}-7t-19\right)$ を数値で計算すると $-110.000000$ になる。`,
        },
      ],
    },
    {
      no: 2,
      field: "空間ベクトル",
      topics: ["1次独立", "共線条件", "係数比較", "内分点"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{OR}}=\\frac1{10}\\overrightarrow{\\mathrm{OD}}$、$s=\\frac53$、$u=\\frac12$ のとき、直線 $\\mathrm{QR}$ 上の点と直線 $\\mathrm{PC}$ 上の点がどちらも $\\left(\\frac16,0,\\frac12\\right)$（$\\overrightarrow{\\mathrm{OA}},\\overrightarrow{\\mathrm{OB}},\\overrightarrow{\\mathrm{OC}}$ を基本ベクトルにとった座標）になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`直線 $\mathrm{QR}$ と直線 $\mathrm{PC}$ が交点をもつように $\mathrm{R}$ を直線 $\mathrm{OD}$ 上にとるとき、$\mathrm{OR}:\mathrm{RD}$ を求める`,
          answer: String.raw`$\mathrm{OR}:\mathrm{RD}=1:9$`,
          approach: String.raw`$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}},\overrightarrow{\mathrm{OC}}$ は1次独立なので、これを「座標軸」だと思って係数を比べればよい。$\overrightarrow{\mathrm{OR}}=k\overrightarrow{\mathrm{OD}}$ とおき、2直線上の点を媒介変数で書いて一致させると、3本の式から $k$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{O},\mathrm{A},\mathrm{B},\mathrm{C}$ は同一平面上にないので、$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$、$\vec c=\overrightarrow{\mathrm{OC}}$ は1次独立である。条件より`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OD}}=\vec a+2\vec b+3\vec c,\qquad\overrightarrow{\mathrm{OP}}=\frac13\vec a,\qquad\overrightarrow{\mathrm{OQ}}=\frac12\vec b`,
            },
            {
              k: "p",
              t: String.raw`である（$\mathrm{P}$ は $\mathrm{OA}$ を $1:2$ に内分、$\mathrm{Q}$ は $\mathrm{OB}$ の中点）。$\mathrm{R}$ は直線 $\mathrm{OD}$ 上なので`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=k\overrightarrow{\mathrm{OD}}=k\vec a+2k\vec b+3k\vec c`,
            },
            { k: "p", t: String.raw`とおける。` },
            {
              k: "p",
              t: String.raw`**2直線上の点を書く。** 直線 $\mathrm{QR}$ 上の点は、実数 $s$ を使って`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OQ}}+s\left(\overrightarrow{\mathrm{OR}}-\overrightarrow{\mathrm{OQ}}\right)=sk\,\vec a+\left\{\frac12+s\left(2k-\frac12\right)\right\}\vec b+3sk\,\vec c`,
            },
            { k: "p", t: String.raw`である。直線 $\mathrm{PC}$ 上の点は、実数 $u$ を使って` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}+u\left(\vec c-\overrightarrow{\mathrm{OP}}\right)=\frac{1-u}{3}\vec a+0\cdot\vec b+u\,\vec c`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**係数を比べる。** 1次独立だから、交点をもつことは次の3式が同時に成り立つ $s,u,k$ があることと同値である。`,
            },
            {
              k: "math",
              t: String.raw`\begin{cases}sk=\dfrac{1-u}{3}&\cdots\;\vec a\\[2mm]\dfrac12+s\left(2k-\dfrac12\right)=0&\cdots\;\vec b\\[2mm]3sk=u&\cdots\;\vec c\end{cases}`,
            },
            {
              k: "p",
              t: String.raw`$\vec c$ の式を $\vec a$ の式に入れると $sk=\dfrac{1-3sk}{3}$、つまり $3sk=1-3sk$ より`,
            },
            { k: "math", t: String.raw`sk=\frac16,\qquad u=\frac12` },
            { k: "p", t: String.raw`である。$\vec b$ の式に $sk=\dfrac16$ を入れると` },
            {
              k: "math",
              t: String.raw`\frac12+2\cdot\frac16-\frac s2=0\quad\Longrightarrow\quad\frac s2=\frac56\quad\Longrightarrow\quad s=\frac53`,
            },
            { k: "p", t: String.raw`となり、$k=\dfrac{1/6}{5/3}=\dfrac1{10}$ である。よって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OR}}=\frac1{10}\overrightarrow{\mathrm{OD}},\qquad\mathrm{OR}:\mathrm{RD}=1:9`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`交点は $\dfrac16\vec a+\dfrac12\vec c$ にあたる点である。$\vec b$ の係数が $0$ になっているので、この点は平面 $\mathrm{OAC}$ 上にある。`,
            },
          ],
          pitfalls: [
            String.raw`$\vec b$ の式に $s\left(2k-\frac12\right)$ と $k$ がかかった形で現れるので、$sk$ をひとかたまりとして扱うと見通しがよい。$s$ と $k$ を別々に解こうとすると式が混み合う。`,
            String.raw`$\mathrm{P}$ は $\mathrm{OA}$ を $1:2$ に内分するので $\overrightarrow{\mathrm{OP}}=\frac13\vec a$ である。$\frac12$ や $\frac23$ と取り違えない。`,
            String.raw`$\mathrm{OR}:\mathrm{RD}$ は $k:(1-k)$ である。$k=\frac1{10}$ から $1:9$ となる。$1:10$ としない。`,
          ],
          check: String.raw`$\vec a,\vec b,\vec c$ を基本ベクトルにとった座標で計算すると、$s=\frac53$、$k=\frac1{10}$ のとき直線 $\mathrm{QR}$ 上の点は $\left(\frac16,0,\frac12\right)$、$u=\frac12$ のとき直線 $\mathrm{PC}$ 上の点も $\left(\frac16,0,\frac12\right)$ で一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "三角関数",
      topics: ["2倍角・3倍角", "正五角形", "cos36°", "大小の評価"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\cos36^\\circ=0.809016994$ が $\\frac{1+\\sqrt5}{4}=0.809016994$ と一致することを確かめた",
          "一辺の長さ $2\\sin36^\\circ=1.175570505$ が $\\sqrt{\\frac{5-\\sqrt5}{2}}=1.175570505$ と一致し、$1.15$ より大きいことを確かめた",
          "$1.15^{2}=1.3225<\\frac{5-\\sqrt5}{2}=1.381966$、および $2.355^{2}=5.546025>5$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\cos2\theta$ と $\cos3\theta$ を $\cos\theta$ の式で表す`,
          answer: String.raw`$\cos2\theta=2\cos^{2}\theta-1$、$\cos3\theta=4\cos^{3}\theta-3\cos\theta$`,
          approach: String.raw`加法定理から順に出す。$\cos2\theta$ は $\cos(\theta+\theta)$、$\cos3\theta$ は $\cos(2\theta+\theta)$ として、$\sin$ が出てきたら $\sin^{2}\theta=1-\cos^{2}\theta$ で消す。`,
          blocks: [
            { k: "p", t: String.raw`加法定理より` },
            {
              k: "math",
              t: String.raw`\cos2\theta=\cos^{2}\theta-\sin^{2}\theta=\cos^{2}\theta-\left(1-\cos^{2}\theta\right)=2\cos^{2}\theta-1`,
            },
            { k: "p", t: String.raw`である。さらに` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\cos3\theta&=\cos(2\theta+\theta)=\cos2\theta\cos\theta-\sin2\theta\sin\theta\\[1mm]
&=\left(2\cos^{2}\theta-1\right)\cos\theta-2\sin^{2}\theta\cos\theta\\[1mm]
&=\left(2\cos^{2}\theta-1\right)\cos\theta-2\left(1-\cos^{2}\theta\right)\cos\theta\\[1mm]
&=4\cos^{3}\theta-3\cos\theta
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\sin2\theta\sin\theta=2\sin\theta\cos\theta\cdot\sin\theta=2\sin^{2}\theta\cos\theta$ と、$\sin$ を偶数個にしてから $1-\cos^{2}\theta$ に置き換える。`,
          ],
          check: String.raw`$\theta=60^\circ$ なら $\cos\theta=\frac12$ で、$2\cdot\frac14-1=-\frac12=\cos120^\circ$、$4\cdot\frac18-3\cdot\frac12=-1=\cos180^\circ$ となり合っている。`,
        },
        {
          label: "(2)",
          task: String.raw`半径 $1$ の円に内接する正五角形の一辺の長さが $1.15$ より大きいかを判定する`,
          answer: String.raw`一辺は $\sqrt{\dfrac{5-\sqrt5}{2}}=1.1755\cdots$ で、$1.15$ より**大きい**`,
          approach: String.raw`一辺は中心角 $72^\circ$ に対する弦なので $2\sin36^\circ$ である。$36^\circ$ の三角比は、$3\times36^\circ=108^\circ=180^\circ-2\times36^\circ$ という関係から (1) を使って求まる。平方してから比べると根号が1つで済む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正五角形の一辺は中心角 $\dfrac{360^\circ}{5}=72^\circ$ に対する弦なので、長さは $2\sin36^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\cos36^\circ$ を求める。** $\theta=36^\circ$ とおくと $3\theta=108^\circ$、$2\theta=72^\circ$ で $3\theta=180^\circ-2\theta$ だから`,
            },
            { k: "math", t: String.raw`\cos3\theta=\cos\left(180^\circ-2\theta\right)=-\cos2\theta` },
            { k: "p", t: String.raw`である。$c=\cos\theta$ とおいて (1) を使うと` },
            {
              k: "math",
              t: String.raw`4c^{3}-3c=-\left(2c^{2}-1\right)\quad\Longleftrightarrow\quad4c^{3}+2c^{2}-3c-1=0`,
            },
            { k: "p", t: String.raw`となる。$c=-1$ が解なので因数分解できて` },
            {
              k: "math",
              t: String.raw`(c+1)\left(4c^{2}-2c-1\right)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$c=\cos36^\circ>0$ なので $4c^{2}-2c-1=0$、つまり`,
            },
            {
              k: "math",
              t: String.raw`c=\frac{1+\sqrt5}{4}`,
            },
            { k: "p", t: String.raw`である（$\dfrac{1-\sqrt5}{4}<0$ は捨てる）。` },
            { k: "p", t: String.raw`**一辺を求める。** 一辺を $a$ とすると $a=2\sin36^\circ$ で` },
            {
              k: "math",
              t: String.raw`a^{2}=4\sin^{2}36^\circ=4\left(1-c^{2}\right)=4-4c^{2}`,
            },
            { k: "p", t: String.raw`である。$4c^{2}=2c+1$ だから` },
            {
              k: "math",
              t: String.raw`a^{2}=4-(2c+1)=3-2c=3-\frac{1+\sqrt5}{2}=\frac{5-\sqrt5}{2}`,
            },
            { k: "p", t: String.raw`となる。` },
            { k: "p", t: String.raw`**$1.15$ と比べる。** どちらも正なので平方して比べればよい。` },
            {
              k: "math",
              t: String.raw`a^{2}-1.15^{2}=\frac{5-\sqrt5}{2}-\frac{529}{400}=\frac{1000-200\sqrt5-529}{400}=\frac{471-200\sqrt5}{400}`,
            },
            {
              k: "p",
              t: String.raw`である。$200\sqrt5<471$ すなわち $\sqrt5<2.355$ を言えばよい。$2.355^{2}=5.546025>5$ なので $\sqrt5<2.355$ であり、$a^{2}>1.15^{2}$ である。よって`,
            },
            { k: "math", t: String.raw`a=\sqrt{\frac{5-\sqrt5}{2}}>1.15` },
            { k: "p", t: String.raw`で、一辺は $1.15$ より大きい（実際 $a=1.1755\cdots$）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`半径 $1$ の円に内接する正五角形。一辺は中心角 $72^\circ$ に対する弦で、長さは $2\sin36^\circ=\sqrt{\frac{5-\sqrt5}{2}}=1.176$。`,
                view: [-1.45, 1.45, -1.25, 1.2],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (th: number): [number, number] => [Math.cos(th), Math.sin(th)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  ...PENT.map((v, k) => ({ k: "seg" as const, a: v, b: PENT[(k + 1) % 5] })),
                  { k: "seg", a: [0, 0], b: PENT[0], dash: true, faint: true },
                  { k: "seg", a: [0, 0], b: PENT[1], dash: true, faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  ...PENT.map((v) => ({ k: "dot" as const, at: v })),
                  {
                    k: "text",
                    at: [(PENT[0][0] + PENT[1][0]) / 2, (PENT[0][1] + PENT[1][1]) / 2],
                    label: "一辺 1.176",
                    place: "left",
                  },
                  { k: "text", at: [0, 0.35], label: "72°", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`一辺は $2\sin36^\circ$ であって $2\sin72^\circ$ ではない。中心角 $72^\circ$ の弦は、二等辺三角形を半分にして $2\times1\times\sin\frac{72^\circ}{2}$ である。`,
            String.raw`$4c^{3}+2c^{2}-3c-1=0$ の解 $c=-1$ は $\theta=180^\circ$ にあたるもので、$36^\circ$ では使えない。$c>0$ で絞る。`,
            String.raw`$\sqrt5<2.355$ を言うときは、$2.355$ を平方して $5$ と比べる。$\sqrt5=2.236\cdots$ と小数を「知っている」だけでは理由にならない。`,
            String.raw`平方して比べてよいのは両辺が正だからである。一言そえておく。`,
          ],
          check: String.raw`$\cos36^\circ=0.809016994$ は $\frac{1+\sqrt5}{4}=0.809016994$ と一致する。一辺 $2\sin36^\circ=1.175570505$ は $\sqrt{\frac{5-\sqrt5}{2}}=1.175570505$ と一致し、$1.15$ より大きい。$\frac{5-\sqrt5}{2}=1.381966$、$1.15^{2}=1.3225$ である。`,
        },
      ],
    },
    {
      no: 4,
      field: "数列",
      topics: ["和と一般項", "階差", "置き換え", "等比数列の和"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "漸化式 $a_n=\\frac{S_n}{n}+(n-1)2^{n}$ を $S_{n-1}$ から順に数値で回して $a_1,\\dots,a_{14}$ を求めると、$3,11,31,79,191,447,1023,2303,5119,\\dots$ となり、$(n+1)2^{n}-1$ と完全に一致した",
          "同じ計算で $S_n=n\\left(2^{n+1}-1\\right)$ も $n\\le14$ のすべてで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$a_1=3$、$a_n=\dfrac{S_n}{n}+(n-1)\cdot2^{n}$（$n\ge2$）をみたす数列の一般項を求める`,
          answer: String.raw`$a_n=(n+1)2^{n}-1$`,
          approach: String.raw`$\dfrac{S_n}{n}$ という形が出ているので、これ自体を新しい数列 $b_n$ とおくのが自然である。$a_n=S_n-S_{n-1}=nb_n-(n-1)b_{n-1}$ を使うと、$(n-1)$ がきれいに約分されて $b_n-b_{n-1}=2^{n}$ という階差の形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$b_n=\dfrac{S_n}{n}$ とおく。$S_n=nb_n$、$S_{n-1}=(n-1)b_{n-1}$ なので、$n\ge2$ のとき`,
            },
            {
              k: "math",
              t: String.raw`a_n=S_n-S_{n-1}=nb_n-(n-1)b_{n-1}`,
            },
            { k: "p", t: String.raw`である。一方、与えられた漸化式は $a_n=b_n+(n-1)2^{n}$ だから` },
            {
              k: "math",
              t: String.raw`nb_n-(n-1)b_{n-1}=b_n+(n-1)2^{n}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`(n-1)\left(b_n-b_{n-1}\right)=(n-1)2^{n}`,
            },
            { k: "p", t: String.raw`である。$n\ge2$ では $n-1\ne0$ なので` },
            { k: "math", t: String.raw`b_n-b_{n-1}=2^{n}\qquad(n\ge2)` },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "p",
              t: String.raw`**$b_n$ を求める。** $b_1=\dfrac{S_1}{1}=a_1=3$ である。階差をたし上げると、$n\ge2$ で`,
            },
            {
              k: "math",
              t: String.raw`b_n=b_1+\sum_{k=2}^{n}2^{k}=3+\left(2^{n+1}-4\right)=2^{n+1}-1`,
            },
            {
              k: "p",
              t: String.raw`である。$n=1$ でも $2^{2}-1=3=b_1$ なので、この式はすべての $n\ge1$ で成り立つ。よって`,
            },
            { k: "math", t: String.raw`S_n=nb_n=n\left(2^{n+1}-1\right)` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**一般項。** $n\ge2$ のとき` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
a_n&=S_n-S_{n-1}=n\left(2^{n+1}-1\right)-(n-1)\left(2^{n}-1\right)\\[1mm]
&=2^{n}\left(2n-n+1\right)-1=(n+1)2^{n}-1
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$n=1$ でも $2\cdot2-1=3=a_1$ なので、求める一般項は`,
            },
            { k: "math", t: String.raw`a_n=(n+1)2^{n}-1\qquad(n\ge1)` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`最初の数項は $3,\,11,\,31,\,79,\,191,\dots$ である。$a_2$ を確かめると、$S_2=3+11=14$ で $\frac{S_2}{2}+1\cdot2^{2}=7+4=11$ となり合っている。`,
            },
          ],
          pitfalls: [
            String.raw`$\frac{S_n}{n}$ をそのまま $b_n$ とおくのが要点である。$S_n$ のままだと $nS_n-\dots$ のような重い式になる。`,
            String.raw`$(n-1)\left(b_n-b_{n-1}\right)=(n-1)2^{n}$ から両辺を $n-1$ で割れるのは $n\ge2$ のときだけである。$n=1$ は $b_1=a_1$ から別に押さえる。`,
            String.raw`$\sum_{k=2}^{n}2^{k}=2^{n+1}-4$ である。初項が $2^{2}=4$ であることに注意（$2^{n+1}-2$ ではない）。`,
            String.raw`最後に $n=1$ でも成り立つかを確かめる。成り立つので場合分けせずに書ける。`,
          ],
          check: String.raw`$S_{n-1}$ から $a_n=\frac{S_{n-1}}{n-1}+n\cdot2^{n}$ の形で順に数値計算すると $3,11,31,79,191,447,1023,2303,5119,\dots$ となり、$(n+1)2^{n}-1$ の値と $n\le14$ まで完全に一致する。$S_n=n\left(2^{n+1}-1\right)$ も同じ範囲で一致した。`,
        },
      ],
    },
    {
      no: 5,
      field: "積分法",
      topics: ["定積分と恒等式", "未知定数の置き換え", "係数比較", "連立方程式"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$f(x)=1-3x$ として $\\int_{-1}^{1}(x-y)^{2}f(y)\\,dy$ を $200$ 万点の数値積分で計算し、$x=-1,-0.3,0,0.7,2$ のいずれでも $f(x)$ を足すと $2x^{2}+x+\\frac53$ に一致することを確かめた",
          "$A=\\int_{-1}^{1}f=2$、$B=\\int_{-1}^{1}yf(y)\\,dy=-2$、$C=\\int_{-1}^{1}y^{2}f(y)\\,dy=\\frac23$ を直接計算して確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$f(x)+\displaystyle\int_{-1}^{1}(x-y)^{2}f(y)\,dy=2x^{2}+x+\dfrac53$ をみたす整式 $f(x)$ を求める`,
          answer: String.raw`$f(x)=-3x+1$`,
          approach: String.raw`$(x-y)^{2}$ を展開すると、積分は $x$ について「定数 $\times x^{2}$ ＋ 定数 $\times x$ ＋ 定数」の形になる。その3つの定数を $A,B,C$ とおくと、式から $f$ が2次以下の整式だと分かる。$f$ を $px^{2}+qx+r$ とおいて $A,B,C$ を $p,q,r$ で書き直せば、連立方程式になる。`,
          blocks: [
            { k: "p", t: String.raw`$(x-y)^{2}=x^{2}-2xy+y^{2}$ と展開すると` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}(x-y)^{2}f(y)\,dy=Ax^{2}-2Bx+C`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`A=\int_{-1}^{1}f(y)\,dy,\quad B=\int_{-1}^{1}yf(y)\,dy,\quad C=\int_{-1}^{1}y^{2}f(y)\,dy`,
            },
            { k: "p", t: String.raw`はいずれも定数である。したがって` },
            {
              k: "math",
              t: String.raw`f(x)=(2-A)x^{2}+(1+2B)x+\left(\frac53-C\right)`,
            },
            {
              k: "p",
              t: String.raw`となり、$f$ は2次以下の整式である。そこで $f(x)=px^{2}+qx+r$ とおく。`,
            },
            { k: "p", t: String.raw`**$A,B,C$ を $p,q,r$ で書く。** 奇関数の $-1$ から $1$ までの積分は $0$ なので` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
A&=\int_{-1}^{1}\left(py^{2}+qy+r\right)dy=\frac23p+2r\\[1mm]
B&=\int_{-1}^{1}\left(py^{3}+qy^{2}+ry\right)dy=\frac23q\\[1mm]
C&=\int_{-1}^{1}\left(py^{4}+qy^{3}+ry^{2}\right)dy=\frac25p+\frac23r
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**係数を比べる。** ` },
            {
              k: "steps",
              items: [
                String.raw`$x$ の係数：$q=1+2B=1+\dfrac43q$ より $-\dfrac13q=1$、つまり $q=-3$。`,
                String.raw`$x^{2}$ の係数：$p=2-A=2-\dfrac23p-2r$ より $\dfrac53p+2r=2$。`,
                String.raw`定数項：$r=\dfrac53-C=\dfrac53-\dfrac25p-\dfrac23r$ より $\dfrac25p+\dfrac53r=\dfrac53$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`2本目から $r=1-\dfrac56p$ で、これを3本目に入れると`,
            },
            {
              k: "math",
              t: String.raw`\frac25p+\frac53\left(1-\frac56p\right)=\frac53\quad\Longrightarrow\quad\left(\frac25-\frac{25}{18}\right)p=0\quad\Longrightarrow\quad-\frac{89}{90}p=0`,
            },
            { k: "p", t: String.raw`となるので $p=0$、したがって $r=1$ である。よって` },
            { k: "math", t: String.raw`f(x)=-3x+1` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**確かめ。** $f(y)=1-3y$ のとき $A=2$、$B=-2$、$C=\dfrac23$ で`,
            },
            {
              k: "math",
              t: String.raw`f(x)+2x^{2}+4x+\frac23=(1-3x)+2x^{2}+4x+\frac23=2x^{2}+x+\frac53`,
            },
            { k: "p", t: String.raw`となり、確かに恒等式をみたす。` },
          ],
          pitfalls: [
            String.raw`$A,B,C$ は定数なので、積分の中の $x$ は外に出せる。$\int(x-y)^{2}f(y)dy$ を「$x$ の関数」として扱い、$y$ についてだけ積分することを徹底する。`,
            String.raw`$f$ が2次以下であることは、仮定ではなく式から従う。「$f$ を2次式とおく」と書く前に、その理由を一言入れる。`,
            String.raw`$-2Bx$ の符号を落とさない。$(x-y)^{2}$ の中の $-2xy$ から来ている。`,
            String.raw`$p=0$ なので $f$ は1次式になる。2次の項が残ると思い込んで検算を飛ばさない。`,
          ],
          check: String.raw`$f(x)=1-3x$ として $\int_{-1}^{1}(x-y)^{2}f(y)\,dy$ を $200$ 万点の数値積分で求め、$f(x)$ を足すと、$x=-1,-0.3,0,0.7,2$ のいずれでも $2x^{2}+x+\frac53$ の値（$2.666667,\,1.546667,\,1.666667,\,3.346667,\,11.666667$）に一致した。`,
        },
      ],
    },
  ],
};
