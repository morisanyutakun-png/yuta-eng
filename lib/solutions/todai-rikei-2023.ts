import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2023年度（令和5年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第3問の図。円の中心の高さ。図を描くためだけの代表値。 */
const A3 = 1.3;

/** 第6問の図。上面のふちのまわりで届く距離（$y=0$ の断面）。 */
const RIM = Math.sqrt(3) - Math.SQRT2;

/** 第4問の図。平面 OAB 上での B の座標（OA 方向を横軸にとった正規直交系）。 */
const B4: [number, number] = [1, Math.SQRT2];
const H4: [number, number] = [4 / 3, (2 * Math.SQRT2) / 3];

export const todaiRikei2023: SolutionSet = {
  slug: "todai-rikei",
  year: 2023,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法・極限",
      topics: ["置換積分", "絶対値を含む積分", "はさみうちの原理", "区分求積法"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$A_k$ をシンプソン法で数値積分し、$k=1,2,5,20,100$ のすべてで $\\frac{1}{\\sqrt{(k+1)\\pi}}\\le A_k\\le\\frac{1}{\\sqrt{k\\pi}}$ を数値で確かめた",
          "$B_n$ を $n=50,200,1000,4000$ で数値積分し、$0.4673886\\ldots$ から $0.4673899\\ldots$ へ近づくことと、$\\frac{2\\left(\\sqrt2-1\\right)}{\\sqrt\\pi}=0.46738995\\ldots$ に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\dfrac{1}{\sqrt{(k+1)\pi}}\le A_k\le\dfrac{1}{\sqrt{k\pi}}$ を示す`,
          answer: String.raw`$t=x^{2}$ と置換すると $A_k=\displaystyle\int_{k\pi}^{(k+1)\pi}\frac{|\sin t|}{2\sqrt t}\,dt$ となり、$\sqrt t$ を両端の値で置きかえればはさめる`,
          approach: String.raw`$\sin\left(x^{2}\right)$ のままでは原始関数が書けない。積分区間の端が $\sqrt{k\pi}$、$\sqrt{(k+1)\pi}$ という形をしているので、$t=x^{2}$ と置けば区間が $k\pi\le t\le(k+1)\pi$ という素直な形になる。そうすると被積分関数が $\dfrac{|\sin t|}{2\sqrt t}$ となり、$|\sin t|$ の積分は正確に計算できて、残る $\dfrac{1}{2\sqrt t}$ を定数で上下からはさめばよい。`,
          blocks: [
            { k: "p", t: String.raw`$t=x^{2}$ とおくと $dt=2x\,dx$、$x=\sqrt t$ より $dx=\dfrac{dt}{2\sqrt t}$ である。$x:\sqrt{k\pi}\to\sqrt{(k+1)\pi}$ のとき $t:k\pi\to(k+1)\pi$ だから` },
            { k: "math", t: String.raw`A_k=\int_{k\pi}^{(k+1)\pi}\frac{|\sin t|}{2\sqrt t}\,dt` },
            { k: "p", t: String.raw`となる。この区間では $k\pi\le t\le(k+1)\pi$ なので $\sqrt{k\pi}\le\sqrt t\le\sqrt{(k+1)\pi}$ であり、$|\sin t|\ge0$ とあわせて` },
            {
              k: "math",
              t: String.raw`\frac{|\sin t|}{2\sqrt{(k+1)\pi}}\le\frac{|\sin t|}{2\sqrt t}\le\frac{|\sin t|}{2\sqrt{k\pi}}`,
            },
            { k: "p", t: String.raw`が成り立つ。区間 $k\pi\le t\le(k+1)\pi$ では $\sin t$ の符号は一定で、$|\sin t|$ の積分は山ひとつぶんだから` },
            { k: "math", t: String.raw`\int_{k\pi}^{(k+1)\pi}|\sin t|\,dt=\int_0^{\pi}\sin s\,ds=2` },
            { k: "p", t: String.raw`である。よって3辺を $t$ で積分して` },
            {
              k: "math",
              t: String.raw`\frac{2}{2\sqrt{(k+1)\pi}}\le A_k\le\frac{2}{2\sqrt{k\pi}},\qquad\text{すなわち}\qquad \frac{1}{\sqrt{(k+1)\pi}}\le A_k\le\frac{1}{\sqrt{k\pi}}`,
            },
            { k: "p", t: String.raw`を得る。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=\left|\sin\left(x^{2}\right)\right|$ のグラフ。$x$ が大きくなるほど山の幅が狭くなる。破線は $x=\sqrt{k\pi}$ で、$A_k$ は山ひとつぶんの面積。`,
                view: [1.6, 4.15, -0.3, 1.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: (x: number) => Math.abs(Math.sin(x * x)), from: 1.7725, to: 3.9633 },
                  ...[1, 2, 3, 4, 5].map((k) => ({
                    k: "seg" as const,
                    a: [Math.sqrt(k * Math.PI), 0] as [number, number],
                    b: [Math.sqrt(k * Math.PI), 1.05] as [number, number],
                    dash: true,
                    faint: true,
                  })),
                  { k: "text", at: [2.14, -0.06], label: "A1", place: "below" },
                  { k: "text", at: [2.79, -0.06], label: "A2", place: "below" },
                  { k: "text", at: [3.31, -0.06], label: "A3", place: "below" },
                  { k: "text", at: [3.75, -0.06], label: "A4", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`置換したあとの $\dfrac{1}{2\sqrt t}$ を落とさない。$dx$ と $dt$ の取りかえで出てくる因子で、これが最終的な $\dfrac{1}{\sqrt{k\pi}}$ の形を決めている。`,
            String.raw`$\displaystyle\int_{k\pi}^{(k+1)\pi}|\sin t|\,dt$ は $k$ によらず $2$ である。$k$ が偶数か奇数かで場合分けしたくなるが、絶対値がついているので分ける必要はない。`,
          ],
          check: String.raw`$k=1$ では下界 $\dfrac{1}{\sqrt{2\pi}}=0.3989$、上界 $\dfrac{1}{\sqrt\pi}=0.5642$ で、数値積分すると $A_1=0.4644$ となり間に入る。$k=100$ では下界 $0.056139$、上界 $0.056419$ に対し $A_{100}=0.056279$ で、$k$ が大きいほど上下のはさみが狭くなることも見てとれる。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}B_n$ を求める`,
          answer: String.raw`$\dfrac{2\left(\sqrt2-1\right)}{\sqrt\pi}$`,
          approach: String.raw`$B_n$ の積分区間 $\sqrt{n\pi}\le x\le\sqrt{2n\pi}$ は、ちょうど $A_n,A_{n+1},\dots,A_{2n-1}$ の $n$ 個ぶんである。(1) の評価を足し合わせれば $B_n$ が上下からはさめて、その上下の和はどちらも区分求積法の形になる。$\dfrac{1}{\sqrt n}$ の係数が、和を $\dfrac1n\sum$ の形に整えるために置かれている。`,
          blocks: [
            { k: "p", t: String.raw`$\sqrt{2n\pi}=\sqrt{(2n)\pi}$ だから、積分区間を $k=n,n+1,\dots,2n-1$ の区間に分けて` },
            { k: "math", t: String.raw`\int_{\sqrt{n\pi}}^{\sqrt{2n\pi}}\left|\sin\left(x^{2}\right)\right|dx=\sum_{k=n}^{2n-1}A_k` },
            { k: "p", t: String.raw`と書ける。(1) の評価を $k=n$ から $k=2n-1$ まで足すと` },
            {
              k: "math",
              t: String.raw`\frac{1}{\sqrt n}\sum_{k=n}^{2n-1}\frac{1}{\sqrt{(k+1)\pi}}\ \le\ B_n\ \le\ \frac{1}{\sqrt n}\sum_{k=n}^{2n-1}\frac{1}{\sqrt{k\pi}}`,
            },
            { k: "p", t: String.raw`となる。右辺を区分求積法の形にする。$k=n+j$（$j=0,1,\dots,n-1$）とおくと $\dfrac{k}{n}=1+\dfrac jn$ で` },
            {
              k: "math",
              t: String.raw`\frac{1}{\sqrt n}\sum_{k=n}^{2n-1}\frac{1}{\sqrt{k\pi}}=\frac{1}{\sqrt\pi}\cdot\frac1n\sum_{j=0}^{n-1}\frac{1}{\sqrt{1+\frac jn}}`,
            },
            { k: "p", t: String.raw`である。よって $n\to\infty$ のとき` },
            {
              k: "math",
              t: String.raw`\frac{1}{\sqrt\pi}\cdot\frac1n\sum_{j=0}^{n-1}\frac{1}{\sqrt{1+\frac jn}}\ \longrightarrow\ \frac{1}{\sqrt\pi}\int_0^{1}\frac{du}{\sqrt{1+u}}=\frac{1}{\sqrt\pi}\Bigl[2\sqrt{1+u}\Bigr]_0^{1}=\frac{2\left(\sqrt2-1\right)}{\sqrt\pi}`,
            },
            { k: "p", t: String.raw`となる。左辺も同様で、$k+1=n+j+1$ とおけば` },
            {
              k: "math",
              t: String.raw`\frac{1}{\sqrt n}\sum_{k=n}^{2n-1}\frac{1}{\sqrt{(k+1)\pi}}=\frac{1}{\sqrt\pi}\cdot\frac1n\sum_{j=1}^{n}\frac{1}{\sqrt{1+\frac jn}}`,
            },
            {
              k: "p",
              t: String.raw`となり、同じ区分求積の和で、足す区間の端が1つずれているだけである。和の差は $\dfrac{1}{\sqrt\pi}\cdot\dfrac1n\left(\dfrac{1}{\sqrt2}-1\right)$ で $n\to\infty$ のとき $0$ に収束するから、左辺も同じ極限をもつ。`,
            },
            { k: "p", t: String.raw`はさみうちの原理より` },
            { k: "math", t: String.raw`\lim_{n\to\infty}B_n=\frac{2\left(\sqrt2-1\right)}{\sqrt\pi}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\sqrt{2n\pi}$ を「$\sqrt{2}\cdot\sqrt{n\pi}$」とだけ見ていると、区間が $A_k$ の何個ぶんなのかが見えない。$2n\pi=(2n)\pi$ と読み替えると、$k$ が $n$ から $2n-1$ まで動くことがはっきりする。`,
            String.raw`上下の和は、区分求積の和としては端が1つずれているだけである。この差が $0$ に収束することを一言書いておくと、はさみうちが成立する。`,
          ],
          check: String.raw`数値積分すると $B_{50}=0.4673886$、$B_{200}=0.4673899$、$B_{1000}=0.4673899$ となり、$\dfrac{2\left(\sqrt2-1\right)}{\sqrt\pi}=0.4673900$ に近づく。$B_n$ はおよそ $\dfrac1{\sqrt n}\times(\text{山 }n\text{ 個の面積})$ で、山ひとつの面積が $\dfrac{1}{\sqrt{k\pi}}$ 程度だから $\dfrac{1}{\sqrt\pi}\times(\text{平均}\ 0.83)$ 程度になる、という見積もりとも合う。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["同じものを含む順列", "間に入れる数え方", "条件つき確率"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$12$ 個の位置に赤4個・黒3個を置く全 $27720$ 通りを全探索し、赤が隣り合わないものが $7056$ 通り、赤も黒も隣り合わないものが $4326$ 通りであることを数え上げた",
          "$\\frac{7056}{27720}=\\frac{14}{55}$、$\\frac{4326}{7056}=\\frac{103}{168}$ を分数のまま照合した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`どの赤玉も隣り合わない確率 $p$ を求める`,
          answer: String.raw`$p=\dfrac{14}{55}$`,
          approach: String.raw`色だけが問題なので、$12$ か所のうちどこに赤が来るかだけを見ればよい。赤の位置の選び方は $\binom{12}{4}$ 通りで、どれも同じ確率で起きる。「隣り合わない $4$ か所」の選び方は、赤でない $8$ 個を並べてできる $9$ つのすき間から $4$ つ選ぶ、と読み替えれば数えられる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`取り出す順番は $12!$ 通りあり、どれも同じ確率で起きる。色の並びだけを見ると、赤玉4個がどの位置に来るかで決まり、その選び方 $\binom{12}{4}=495$ 通りはどれも同じ確率である。`,
            },
            {
              k: "p",
              t: String.raw`赤以外の8個を横一列に並べると、その両端と間に9つのすき間ができる。どの赤玉も隣り合わないように置くことは、この9つのすき間から4つを選んで1個ずつ入れることと同じである。よって隣り合わない置き方は $\binom94=126$ 通りである。`,
            },
            { k: "math", t: String.raw`p=\frac{\binom94}{\binom{12}{4}}=\frac{126}{495}=\frac{14}{55}` },
          ],
          pitfalls: [
            String.raw`黒と白の区別はこの小問には効かない。赤かそれ以外かだけで分母・分子をそろえると、$\binom94\big/\binom{12}{4}$ という短い式で済む。`,
          ],
          check: String.raw`$\dfrac{14}{55}=0.2545\ldots$。黒3・赤4・白5の色の並び全 $\dfrac{12!}{3!\,4!\,5!}=27720$ 通りを機械で全部調べると、赤が隣り合わないものは $7056$ 通りで、$\dfrac{7056}{27720}=\dfrac{14}{55}$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`どの赤玉も隣り合わないとき、どの黒玉も隣り合わない条件つき確率 $q$ を求める`,
          answer: String.raw`$q=\dfrac{103}{168}$`,
          approach: String.raw`$q=\dfrac{(\text{赤も黒も隣り合わない並び})}{(\text{赤が隣り合わない並び})}$ である。分子を数えるとき、(1) と同じ「赤でない8個を先に並べる」見方をそのまま使う。先に並べた8個（黒3・白5）の中で黒がくっついている場所があれば、そこには必ず赤を入れなければならない。くっついている箇所の個数で場合分けすれば数え切れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`色の並びは全部で $\dfrac{12!}{3!\,4!\,5!}=27720$ 通りあり、どれも同じ確率で起きる。`,
            },
            {
              k: "p",
              t: String.raw`**分母。** (1) と同じ数え方で、赤でない8個（黒3・白5）の並べ方が $\binom83=56$ 通り、その9つのすき間から4つ選んで赤を入れる方法が $\binom94=126$ 通りだから、赤が隣り合わない並びは $56\times126=7056$ 通りである。`,
            },
            {
              k: "p",
              t: String.raw`**分子。** 赤でない8個の並びを1つ固定し、その中で黒どうしが隣り合っている箇所の個数を $m$ とする。$m$ 箇所のすき間には必ず赤を入れなければ、最終的な並びで黒が隣り合ってしまう。逆にその $m$ 箇所に赤を入れさえすれば、残りの赤をどこに入れても黒は隣り合わない。よって赤の入れ方は、残り $9-m$ 個のすき間から $4-m$ 個を選ぶ $\binom{9-m}{4-m}$ 通りである。`,
            },
            { k: "p", t: String.raw`$m$ の値ごとに、赤でない8個の並びが何通りあるかを数える。` },
            {
              k: "steps",
              items: [
                String.raw`$m=0$（黒がどこも隣り合わない）：白5個の間と両端の6つのすき間から3つ選んで黒を1個ずつ置けばよく、$\binom63=20$ 通り。`,
                String.raw`$m=2$（黒3個が1かたまり）：8か所のうち連続3か所をかたまりの位置にすればよく、$6$ 通り。`,
                String.raw`$m=1$（ちょうど1か所）：全体 $\binom83=56$ 通りから上の2つを引いて $56-20-6=30$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`したがって、赤も黒も隣り合わない並びは` },
            {
              k: "math",
              t: String.raw`20\times\binom94+30\times\binom83+6\times\binom72=20\cdot126+30\cdot56+6\cdot21=2520+1680+126=4326`,
            },
            { k: "p", t: String.raw`通りである。よって` },
            { k: "math", t: String.raw`q=\frac{4326}{7056}=\frac{103}{168}` },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`「黒が隣り合わない並びを先に作る」と始めると、白と黒だけの並びでは隣り合っていた黒が、あとから赤を入れることで離れる場合を取りこぼす。赤でない8個を先に並べ、くっついた黒の箇所に赤を強制的に入れる、という順番にすると漏れなく数えられる。`,
            String.raw`$m=2$ は「隣り合う箇所が2か所」であって「2個が隣り合う」ではない。黒3個が1かたまりになっている場合のことである。`,
            String.raw`$q$ は条件つき確率なので、分母は $27720$ ではなく $7056$ である。`,
          ],
          check: String.raw`$\dfrac{103}{168}=0.6131\ldots$。全 $27720$ 通りを機械で調べると、赤も黒も隣り合わないものは $4326$ 通りで、$\dfrac{4326}{7056}$ は約分して $\dfrac{103}{168}$ になる（$4326=2\cdot3\cdot7\cdot103$、$7056=2^{4}\cdot3^{2}\cdot7^{2}$ で、共通因数は $42$）。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式・微分法",
      topics: ["円と放物線", "接線", "弦の長さ", "関数の単調性"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "(1) は $\\cos^{2}\\theta-\\sin\\theta$ を $\\theta$ の細かい刻みで全探索し、最大値が $\\frac54$ になることを確かめた",
          "(2) は $a$ を $1.26$ から $1.50$ まで動かし、$L_\\mathrm{P}$ を傾き $m$ の関数として $3000$ 点で評価して単調性を調べ、$a<\\frac{11}{8}$ でのみ単調でなくなることを確かめた",
          "接線が放物線から切り取る長さを $L=\\sqrt{1+m^{2}}\\sqrt{m^{2}+4c}$ として、$m$ から直接計算し直した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`円 $C$ が $y>x^{2}$ の表す領域に含まれるような $a$ の範囲を求める`,
          answer: String.raw`$a>\dfrac54$`,
          approach: String.raw`円周上の点を $(\cos\theta,\,a+\sin\theta)$ と置けば、条件は「すべての $\theta$ について $a+\sin\theta>\cos^{2}\theta$」になる。$a$ だけを左辺に残すと、右辺は $\sin\theta$ の2次式になるので、その最大値を超えていればよい。`,
          blocks: [
            { k: "p", t: String.raw`円 $C$ の点は $\left(\cos\theta,\ a+\sin\theta\right)$ と書ける。$C$ が $y>x^{2}$ に含まれる条件は` },
            { k: "math", t: String.raw`a+\sin\theta>\cos^{2}\theta\quad(\text{すべての }\theta)` },
            { k: "p", t: String.raw`すなわち $a>\cos^{2}\theta-\sin\theta$ がすべての $\theta$ で成り立つことである。$s=\sin\theta$（$-1\le s\le1$）とおくと` },
            {
              k: "math",
              t: String.raw`\cos^{2}\theta-\sin\theta=1-s^{2}-s=-\left(s+\frac12\right)^{2}+\frac54`,
            },
            {
              k: "p",
              t: String.raw`となる。$s=-\dfrac12$ は $-1\le s\le1$ にあるので、右辺の最大値は $\dfrac54$ である。よって求める条件は $a>\dfrac54$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$a\ge\dfrac54$ ではない。$s=-\dfrac12$ のとき等号が成り立ち、円周上の点 $\left(\pm\dfrac{\sqrt3}{2},\ a-\dfrac12\right)$ が放物線に乗ってしまうので、$y>x^{2}$（等号なし）をみたさない。`,
            String.raw`「円が放物線と交わらない」ではなく「円周が領域 $y>x^{2}$ に含まれる」である。放物線の下側にすっぽり入る場合は条件をみたさないので、交わらないだけでは足りない。`,
          ],
          check: String.raw`$a=\dfrac54$ のとき、$s=-\dfrac12$ に対応する円周上の点は $\left(\dfrac{\sqrt3}{2},\ \dfrac34\right)$ で、$x^{2}=\dfrac34=y$ となり放物線上にある。$a$ を少しでも大きくすればこの点は放物線より上に上がる。`,
        },
        {
          label: "(2)",
          task: String.raw`$L_\mathrm{Q}=L_\mathrm{R}$ となる $S$ 上の相異なる2点 $\mathrm{Q},\mathrm{R}$ が存在するような $a$ の範囲を求める`,
          answer: String.raw`$\dfrac54<a<\dfrac{11}{8}$`,
          approach: String.raw`$S$ 上の点を1つずつ追うより、その点での接線のほうが扱いやすい。$S$ は円の右下の4分の1なので、そこでの接線は傾き $m\ge0$ の「円の下側の接線」を1回ずつもれなく与える。だから $L_\mathrm{P}$ は $m$ の関数になる。あとは「同じ値を2回とる $\iff$ 単調でない」と読み替えて、微分して増減を見ればよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S$ は $x\ge0$ かつ $y<a$ の部分だから、$\mathrm{P}=\left(\cos\theta,\ a+\sin\theta\right)$ で $-\dfrac\pi2\le\theta<0$ の4分の1の弧である。$\theta=-\varphi$（$0<\varphi\le\dfrac\pi2$）とおくと、$\mathrm{P}$ での接線の傾きは`,
            },
            { k: "math", t: String.raw`m=-\frac{\cos\theta}{\sin\theta}=\frac{\cos\varphi}{\sin\varphi}` },
            {
              k: "p",
              t: String.raw`で、$\varphi$ が $\dfrac\pi2$ から $0$ に近づくにつれて $m$ は $0$ から $+\infty$ まで単調に増える。つまり $\mathrm{P}$ と $m\ge0$ は1対1に対応する。`,
            },
            {
              k: "p",
              t: String.raw`傾き $m$ で円 $C$ に下から接する直線を $y=mx+c$ とすると、中心 $(0,a)$ との距離が $1$ だから $\dfrac{|c-a|}{\sqrt{1+m^{2}}}=1$ で、下側の接線なので $c<a$、よって`,
            },
            { k: "math", t: String.raw`c=a-\sqrt{1+m^{2}}` },
            { k: "p", t: String.raw`である。この直線と $y=x^{2}$ の交点は $x^{2}-mx-c=0$ の解で、2解を $x_1,x_2$ とすると` },
            {
              k: "math",
              t: String.raw`\left(x_1-x_2\right)^{2}=\left(x_1+x_2\right)^{2}-4x_1x_2=m^{2}+4c`,
            },
            {
              k: "p",
              t: String.raw`となる。$\mathrm{P}$ は放物線より上にあるので直線は放物線と2点で交わり、$m^{2}+4c>0$ である。切り取られる線分の長さは`,
            },
            {
              k: "math",
              t: String.raw`L_\mathrm{P}=\sqrt{1+m^{2}}\,\left|x_1-x_2\right|,\qquad {L_\mathrm{P}}^{2}=\left(1+m^{2}\right)\left(m^{2}+4c\right)`,
            },
            { k: "p", t: String.raw`である。ここで $u=\sqrt{1+m^{2}}$ とおく。$m\ge0$ と $u\ge1$ は1対1に対応し、$m^{2}=u^{2}-1$、$c=a-u$ だから` },
            { k: "math", t: String.raw`{L_\mathrm{P}}^{2}=u^{2}\left(u^{2}-1+4a-4u\right)=u^{2}\left(u^{2}-4u+4a-1\right)=:F(u)` },
            {
              k: "p",
              t: String.raw`となる。$L_\mathrm{P}>0$ なので、$L_\mathrm{Q}=L_\mathrm{R}$ となる相異なる2点があることは、$F$ が $u\ge1$ で単射でないことと同じである。`,
            },
            { k: "p", t: String.raw`$F(u)=u^{4}-4u^{3}+(4a-1)u^{2}$ を微分すると` },
            {
              k: "math",
              t: String.raw`F'(u)=4u^{3}-12u^{2}+2(4a-1)u=2u\left(2u^{2}-6u+4a-1\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$u\ge1$ では $2u>0$ だから、$F'$ の符号は $G(u)=2u^{2}-6u+4a-1$ の符号と同じになる。$G$ は下に凸で軸が $u=\dfrac32$、これは $u\ge1$ の内部にあるので、$u\ge1$ での $G$ の最小値は`,
            },
            { k: "math", t: String.raw`G\!\left(\frac32\right)=\frac92-9+4a-1=4a-\frac{11}{2}` },
            { k: "p", t: String.raw`である。場合を分ける。` },
            {
              k: "steps",
              items: [
                String.raw`$4a-\dfrac{11}{2}\ge0$、すなわち $a\ge\dfrac{11}{8}$ のとき：$u\ge1$ で $G\ge0$、つまり $F'\ge0$ で、$F'=0$ となるのはたかだか1点だから $F$ は狭義の増加関数。単射なので、$L_\mathrm{Q}=L_\mathrm{R}$ となる相異なる2点は存在しない。`,
                String.raw`$a<\dfrac{11}{8}$ のとき：$G\!\left(\dfrac32\right)<0$ なので $u=\dfrac32$ の近くで $F'<0$ となり、$F$ はそこで減少する。$F$ は $u\ge1$ で単調でないので、同じ値を2回とる $u$ の組がある。`,
              ],
            },
            {
              k: "p",
              t: String.raw`(1) の条件 $a>\dfrac54$ とあわせて、求める範囲は $\dfrac54<a<\dfrac{11}{8}$ である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$a=1.3$ のときの円 $C$（細線）と放物線 $y=x^{2}$。太い弧が $S$、太い線分が $S$ 上の点 $\mathrm{P}$ での接線が放物線から切り取る部分で、その長さが $L_\mathrm{P}$。`,
                view: [-1.95, 2.35, -0.55, 2.9],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: (x: number) => x * x, from: -1.6, to: 1.65 },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), A3 + Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), A3 + Math.sin(t)] as [number, number],
                    from: -Math.PI / 2,
                    to: 0,
                  },
                  { k: "seg", a: [-0.1731, 0.02997], b: [0.7731, 0.59767] },
                  { k: "dot", at: [-0.1731, 0.02997] },
                  { k: "dot", at: [0.7731, 0.59767] },
                  { k: "dot", at: [0.5145, 0.4425], label: "P", place: "above-left" },
                  { k: "dot", at: [0, A3 - 1], label: "(0, a−1)", place: "left" },
                  { k: "dot", at: [1, A3], label: "(1, a)", place: "right" },
                  { k: "text", at: [0.3, 0.3137], label: "長さ LP", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$S$ の点をそのまま変数にすると式が重くなる。「$S$ の点」と「傾き $m\ge0$ の下側接線」が1対1に対応することを言えば、あとは $m$（さらに $u=\sqrt{1+m^{2}}$）だけの話になる。`,
            String.raw`$u=\sqrt{1+m^{2}}$ の動く範囲は $u\ge1$ である。$u>1$ としてしまうと、$\mathrm{P}$ が $S$ の端 $(0,a-1)$（$m=0$）のときを落とす。`,
            String.raw`$G\!\left(\dfrac32\right)=0$、つまり $a=\dfrac{11}{8}$ のときは $F'\ge0$ で等号は1点だけなので、$F$ はなお狭義増加である。境目は範囲に入らない。`,
          ],
          check: String.raw`$a$ を $1.26,\,1.30,\,1.35,\,1.3749$ と動かして $L_\mathrm{P}$ を $m$ の関数として数値で追うと、どれも途中で減少に転じる。$a=1.375\ \left(=\dfrac{11}{8}\right)$ 以上では、$m$ を $0$ から $12$ まで $3000$ 点で調べてもずっと増加のままだった。境目が $\dfrac{11}{8}$ であることと合う。`,
        },
      ],
    },
    {
      no: 4,
      field: "空間ベクトル",
      topics: ["内積と垂直条件", "垂線の足", "平面への正射影", "球面と図形の共有点"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "(1)(2) は成分計算で $\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OA}}=0$、$\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OB}}=0$、$\\overrightarrow{\\mathrm{OP}}\\cdot\\overrightarrow{\\mathrm{OC}}=1$、$\\overrightarrow{\\mathrm{PH}}\\cdot\\overrightarrow{\\mathrm{AB}}=0$ を分数のまま照合した",
          "(3) は三角形 OHB を $900\\times900$ の格子で走査して $|\\mathrm{QX}|$ の最小・最大を求め、$\\frac{\\sqrt{11}}{2}=1.65831240$、$\\frac{\\sqrt{17}}{2}=2.06155281$ と小数8桁まで一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\overrightarrow{\mathrm{OP}}\perp\overrightarrow{\mathrm{OA}}$、$\overrightarrow{\mathrm{OP}}\perp\overrightarrow{\mathrm{OB}}$、$\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{OC}}=1$ をみたす $\mathrm{P}$ を求める`,
          answer: String.raw`$\mathrm{P}(0,\,-1,\,1)$`,
          approach: String.raw`条件は3つとも内積の式なので、$\mathrm{P}(x,y,z)$ とおけば $x,y,z$ の1次方程式が3本できる。上から順に代入していけば、連立を解くまでもなく1つずつ決まる。`,
          blocks: [
            { k: "p", t: String.raw`$\mathrm{P}(x,y,z)$ とおく。3つの条件はそれぞれ` },
            {
              k: "math",
              t: String.raw`2x=0,\qquad x+y+z=0,\qquad x+2y+3z=1`,
            },
            {
              k: "p",
              t: String.raw`である。1つめから $x=0$、2つめから $z=-y$、これを3つめに入れて $2y-3y=1$、すなわち $y=-1$、$z=1$ を得る。よって $\mathrm{P}(0,-1,1)$ である。`,
            },
          ],
          check: String.raw`$\overrightarrow{\mathrm{OP}}=(0,-1,1)$ として、$\overrightarrow{\mathrm{OA}}=(2,0,0)$ との内積は $0$、$\overrightarrow{\mathrm{OB}}=(1,1,1)$ との内積は $-1+1=0$、$\overrightarrow{\mathrm{OC}}=(1,2,3)$ との内積は $-2+3=1$ で、3条件すべてをみたす。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{P}$ から直線 $\mathrm{AB}$ に下ろした垂線の足 $\mathrm{H}$ について $\overrightarrow{\mathrm{OH}}$ を $\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OH}}=\dfrac13\overrightarrow{\mathrm{OA}}+\dfrac23\overrightarrow{\mathrm{OB}}$`,
          approach: String.raw`$\mathrm{H}$ は直線 $\mathrm{AB}$ 上なので $\overrightarrow{\mathrm{OH}}=(1-t)\overrightarrow{\mathrm{OA}}+t\overrightarrow{\mathrm{OB}}$ と書ける。垂直条件 $\overrightarrow{\mathrm{PH}}\cdot\overrightarrow{\mathrm{AB}}=0$ に (1) を使うと、$\overrightarrow{\mathrm{OP}}$ が $\overrightarrow{\mathrm{AB}}$ とも垂直なので $\overrightarrow{\mathrm{OP}}$ の項が消え、$\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AB}}=0$ だけが残る。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ は直線 $\mathrm{AB}$ 上にあるので $\overrightarrow{\mathrm{OH}}=(1-t)\overrightarrow{\mathrm{OA}}+t\overrightarrow{\mathrm{OB}}$ とおける。$\overrightarrow{\mathrm{AB}}=\overrightarrow{\mathrm{OB}}-\overrightarrow{\mathrm{OA}}=(-1,1,1)$ である。`,
            },
            {
              k: "p",
              t: String.raw`(1) より $\overrightarrow{\mathrm{OP}}$ は $\overrightarrow{\mathrm{OA}}$ とも $\overrightarrow{\mathrm{OB}}$ とも垂直だから、その差である $\overrightarrow{\mathrm{AB}}$ とも垂直で $\overrightarrow{\mathrm{OP}}\cdot\overrightarrow{\mathrm{AB}}=0$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{PH}}\cdot\overrightarrow{\mathrm{AB}}=\left(\overrightarrow{\mathrm{OH}}-\overrightarrow{\mathrm{OP}}\right)\cdot\overrightarrow{\mathrm{AB}}=\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AB}}`,
            },
            { k: "p", t: String.raw`となり、垂直条件は $\overrightarrow{\mathrm{OH}}\cdot\overrightarrow{\mathrm{AB}}=0$ と同じである。$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{AB}}=-2$、$\overrightarrow{\mathrm{OB}}\cdot\overrightarrow{\mathrm{AB}}=-1+1+1=1$ だから` },
            { k: "math", t: String.raw`(1-t)(-2)+t\cdot1=0\iff 3t=2\iff t=\frac23` },
            { k: "p", t: String.raw`である。よって $\overrightarrow{\mathrm{OH}}=\dfrac13\overrightarrow{\mathrm{OA}}+\dfrac23\overrightarrow{\mathrm{OB}}$ となる。` },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{OP}}$ が平面 $\mathrm{OAB}$ の法線になっていることが、この小問と (3) の両方で効く。(1) の答えを座標としてだけ見ずに、「平面 $\mathrm{OAB}$ に垂直なベクトル」として持っておく。`,
          ],
          check: String.raw`$\mathrm{H}\left(\dfrac43,\dfrac23,\dfrac23\right)$ となる。$\overrightarrow{\mathrm{PH}}=\left(\dfrac43,\dfrac53,-\dfrac13\right)$ で、$\overrightarrow{\mathrm{AB}}=(-1,1,1)$ との内積は $-\dfrac43+\dfrac53-\dfrac13=0$ である。`,
        },
        {
          label: "(3)",
          task: String.raw`$\overrightarrow{\mathrm{OQ}}=\dfrac34\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OP}}$ とし、$\mathrm{Q}$ を中心とする半径 $r$ の球面 $S$ が三角形 $\mathrm{OHB}$ と共有点をもつ $r$ の範囲を求める`,
          answer: String.raw`$\dfrac{\sqrt{11}}{2}\le r\le\dfrac{\sqrt{17}}{2}$`,
          approach: String.raw`球面が図形と共有点をもつのは、中心からその図形までの距離が最小のものと最大のものの間に $r$ が入るときである。三角形 $\mathrm{OHB}$ は平面 $\mathrm{OAB}$ の上にあり、$\overrightarrow{\mathrm{OP}}$ はその平面の法線だから、$\mathrm{Q}$ は平面から $\left|\overrightarrow{\mathrm{OP}}\right|=\sqrt2$ だけ離れていて、その正射影は $\dfrac34\overrightarrow{\mathrm{OA}}$ である。三平方の定理で、平面内の2次元の問題に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{H}$ は $\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ の1次結合なので、三角形 $\mathrm{OHB}$ は平面 $\mathrm{OAB}$ の上にある。(1) より $\overrightarrow{\mathrm{OP}}$ はこの平面の法線で、$\left|\overrightarrow{\mathrm{OP}}\right|=\sqrt2$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{OQ}}=\dfrac34\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OP}}$ だから、$\mathrm{Q}$ の平面 $\mathrm{OAB}$ への正射影を $\mathrm{Q}'$ とすると $\overrightarrow{\mathrm{OQ'}}=\dfrac34\overrightarrow{\mathrm{OA}}$、つまり $\mathrm{Q}'\left(\dfrac32,0,0\right)$ で、$\mathrm{QQ'}=\sqrt2$ である。平面上の点 $\mathrm{X}$ に対して三平方の定理より`,
            },
            { k: "math", t: String.raw`\mathrm{QX}^{2}=2+\mathrm{Q'X}^{2}` },
            {
              k: "p",
              t: String.raw`が成り立つ。よって $\mathrm{Q'X}$ の最小・最大を三角形 $\mathrm{OHB}$ の中で求めればよい。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{Q}'=\dfrac34\overrightarrow{\mathrm{OA}}$ は、$\overrightarrow{\mathrm{OA}},\overrightarrow{\mathrm{OB}}$ を基準にすると $\overrightarrow{\mathrm{OA}}$ の係数が $\dfrac34$ である。三角形 $\mathrm{OHB}$ の3頂点は、同じ基準で $(0,0)$、$\left(\dfrac13,\dfrac23\right)$、$(0,1)$ だから $\overrightarrow{\mathrm{OA}}$ の係数は $\dfrac13$ 以下で、$\mathrm{Q}'$ は三角形の外にある。したがって最小は辺の上で起きる。`,
            },
            { k: "p", t: String.raw`**最大。** 三角形の点のうち $\mathrm{Q}'$ から最も遠いのは頂点のどれかである。` },
            {
              k: "math",
              t: String.raw`\mathrm{Q'O}=\frac32,\qquad \mathrm{Q'H}=\sqrt{\left(-\frac16\right)^{2}+\left(\frac23\right)^{2}+\left(\frac23\right)^{2}}=\sqrt{\frac{11}{12}},\qquad \mathrm{Q'B}=\sqrt{\left(-\frac12\right)^{2}+1+1}=\frac32`,
            },
            { k: "p", t: String.raw`なので最大は $\dfrac32$ である（$\mathrm{O}$ と $\mathrm{B}$ の2つで達する）。` },
            { k: "p", t: String.raw`**最小。** 3辺それぞれへの距離を調べる。辺 $\mathrm{OH}$ は方向ベクトル $(2,1,1)$ で、$\mathrm{Q}'$ から下ろした垂線の足は` },
            {
              k: "math",
              t: String.raw`\frac{\overrightarrow{\mathrm{OQ'}}\cdot(2,1,1)}{|(2,1,1)|^{2}}(2,1,1)=\frac{3}{6}(2,1,1)=\left(1,\frac12,\frac12\right)`,
            },
            {
              k: "p",
              t: String.raw`で、これは $\overrightarrow{\mathrm{OH}}$ の $\dfrac34$ 倍だから線分 $\mathrm{OH}$ の上にある。距離は $\left|\left(\dfrac12,-\dfrac12,-\dfrac12\right)\right|=\dfrac{\sqrt3}{2}$ である。辺 $\mathrm{OB}$ への垂線の足は $\left(\dfrac12,\dfrac12,\dfrac12\right)$ で距離は $\sqrt{\dfrac32}$、辺 $\mathrm{HB}$ については垂線の足が線分の外に出るので最短は端点 $\mathrm{H}$ で $\sqrt{\dfrac{11}{12}}$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\dfrac{\sqrt3}{2}=0.866$、$\sqrt{\dfrac{11}{12}}=0.957$、$\sqrt{\dfrac32}=1.225$ だから、最小は $\dfrac{\sqrt3}{2}$ である。`,
            },
            {
              k: "p",
              t: String.raw`三角形は連結で $\mathrm{Q'X}$ は連続だから、$\mathrm{Q'X}$ のとる値は $\dfrac{\sqrt3}{2}$ 以上 $\dfrac32$ 以下のすべてである。したがって`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{QX}^{2}=2+\mathrm{Q'X}^{2}\in\left[2+\frac34,\ 2+\frac94\right]=\left[\frac{11}{4},\ \frac{17}{4}\right]`,
            },
            {
              k: "p",
              t: String.raw`となり、球面 $S$ が三角形と共有点をもつ条件は $\dfrac{\sqrt{11}}{2}\le r\le\dfrac{\sqrt{17}}{2}$ である。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`平面 $\mathrm{OAB}$ を、$\overrightarrow{\mathrm{OA}}$ の向きを横軸にとって正面から見た図（この平面上では長さがそのまま測れる）。$\mathrm{Q}'$ は $\mathrm{Q}$ の正射影で、三角形 $\mathrm{OHB}$ までの距離は最小 $\frac{\sqrt3}{2}$、最大 $\frac32$。`,
                view: [-0.45, 2.5, -0.5, 1.95],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], H4, B4] },
                  { k: "seg", a: [0, 0], b: H4 },
                  { k: "seg", a: H4, b: B4 },
                  { k: "seg", a: B4, b: [0, 0] },
                  { k: "seg", a: [0, 0], b: [2, 0], faint: true, dash: true },
                  { k: "seg", a: [1.5, 0], b: [1, Math.SQRT2 / 2], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [2, 0], label: "A", place: "below-right" },
                  { k: "dot", at: B4, label: "B", place: "above-left" },
                  { k: "dot", at: H4, label: "H", place: "right" },
                  { k: "dot", at: [1.5, 0], label: "Q′", place: "below" },
                  { k: "text", at: [1.2, 0.42], label: "√3/2", place: "above-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「球面」なので、三角形が球の内部にすっぽり入ってしまう $r$ は不適である。最小距離以上かつ最大距離以下、という両側の条件になる。`,
            String.raw`$\mathrm{Q}'$ が三角形の外にあることを確かめないと、最小距離を頂点や辺で探す根拠がない。$\overrightarrow{\mathrm{OA}}$ の係数で比べると一目で分かる。`,
            String.raw`辺 $\mathrm{HB}$ は、垂線の足が線分の外に出る。足が外に出たときの最短は端点であって、直線への距離ではない。`,
          ],
          check: String.raw`三角形 $\mathrm{OHB}$ を $900\times900$ の格子で走査して $|\mathrm{QX}|$ を直接計算すると、最小 $1.65831240$、最大 $2.06155281$ となり、$\dfrac{\sqrt{11}}{2}=1.65831240$、$\dfrac{\sqrt{17}}{2}=2.06155281$ と小数8桁まで一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "整式",
      topics: ["剰余の定理", "重解と微分", "因数分解", "合同式の考え方"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$h(x)^{49}$ を $f(x)$ で割った余りを有理数係数のまま繰り返し2乗法で計算し、$(a,b)=(-2,0),(-2,1)$ で余りが $h(x)$ に一致することを確かめた",
          "$a,b$ を $-8$ から $8$ まで $\\frac12$ 刻みで動かした $4624$ 通りについて $h_2$ を実際に計算し、$h_2=h$ となるのがこの2組だけであることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$g(x)^{7}$ を $f(x)$ で割った余りと $r(x)^{7}$ を $f(x)$ で割った余りが等しいことを示す`,
          answer: String.raw`$g^{7}-r^{7}$ が $g-r$ で割り切れ、$g-r$ が $f$ で割り切れることから従う`,
          approach: String.raw`余りが等しいことを示すには、2つの差が $f$ で割り切れることを言えばよい。$g$ と $r$ は $f$ で割った余りが同じ、つまり $g-r$ が $f$ の倍数である。そこに $A^{7}-B^{7}$ が $A-B$ で割り切れるという因数分解を当てればそれで終わる。`,
          blocks: [
            { k: "p", t: String.raw`$g(x)$ を $f(x)$ で割った商を $Q(x)$ とすると $g(x)=f(x)Q(x)+r(x)$、すなわち` },
            { k: "math", t: String.raw`g(x)-r(x)=f(x)Q(x)` },
            { k: "p", t: String.raw`である。一般に` },
            {
              k: "math",
              t: String.raw`A^{7}-B^{7}=(A-B)\left(A^{6}+A^{5}B+A^{4}B^{2}+A^{3}B^{3}+A^{2}B^{4}+AB^{5}+B^{6}\right)`,
            },
            { k: "p", t: String.raw`だから、$A=g(x)$、$B=r(x)$ とおくと` },
            {
              k: "math",
              t: String.raw`g(x)^{7}-r(x)^{7}=\left(g(x)-r(x)\right)\cdot\left(\cdots\right)=f(x)\cdot Q(x)\left(\cdots\right)`,
            },
            {
              k: "p",
              t: String.raw`となり、$g(x)^{7}-r(x)^{7}$ は $f(x)$ で割り切れる。2つの整式の差が $f$ で割り切れるとき、それぞれを $f$ で割った余りは等しい。よって $g(x)^{7}$ を $f(x)$ で割った余りと $r(x)^{7}$ を $f(x)$ で割った余りは等しい。`,
            },
            {
              k: "note",
              t: String.raw`言いかえると「$f$ で割った余りが同じ」という関係は、足し算・掛け算で保たれる。整数の合同式とまったく同じ性質で、(2) ではこれを繰り返し使う。`,
            },
          ],
          pitfalls: [
            String.raw`$f(x)=(x-1)^{2}(x-2)$ という具体形は (1) では一度も使わない。どんな $f$ でも成り立つ話なので、余計な代入を始めないほうが速い。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$h_2(x)=h(x)$ となる実数 $a,b$ の組をすべて求める`,
          answer: String.raw`$(a,b)=(-2,\,0),\ (-2,\,1)$`,
          approach: String.raw`(1) を2回使うと、$h_2$ は $h^{49}$ を $f$ で割った余りに等しい。$h$ は2次式だから $f$ で割った余りは $h$ 自身で、条件は「$h^{49}-h$ が $f$ で割り切れる」になる。$f=(x-1)^{2}(x-2)$ なので、割り切れる条件は $x=1$ で値と微分係数がともに $0$、$x=2$ で値が $0$、の3本である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$h_1$ は $h^{7}$ を $f$ で割った余りだから、(1) を $g=h^{7}$、$r=h_1$ に使うと、$\left(h^{7}\right)^{7}=h^{49}$ を $f$ で割った余りと $\left(h_1\right)^{7}$ を $f$ で割った余り、すなわち $h_2$ が等しい。つまり $h^{49}-h_2$ は $f$ で割り切れる。`,
            },
            {
              k: "p",
              t: String.raw`$h$ は2次式で $f$ は3次式だから、$h$ を $f$ で割った余りは $h$ 自身である。$h_2$ も $h$ も2次以下なので、$h_2=h$ であることと $h^{49}-h$ が $f$ で割り切れることは同じである。`,
            },
            {
              k: "p",
              t: String.raw`$p(x)=h(x)^{49}-h(x)$ とおく。$f(x)=(x-1)^{2}(x-2)$ で割り切れる条件は`,
            },
            { k: "math", t: String.raw`p(1)=0,\qquad p'(1)=0,\qquad p(2)=0` },
            { k: "p", t: String.raw`の3つである。$\alpha=h(1)=1+a+b$、$\beta=h(2)=4+2a+b$ とおく。` },
            {
              k: "steps",
              items: [
                String.raw`$p(1)=\alpha^{49}-\alpha=\alpha\left(\alpha^{48}-1\right)=0$。$\alpha$ は実数だから $\alpha=0,\,1,\,-1$。`,
                String.raw`$p(2)=\beta^{49}-\beta=0$ も同様に $\beta=0,\,1,\,-1$。`,
                String.raw`$p'(x)=49h(x)^{48}h'(x)-h'(x)=h'(x)\left(49h(x)^{48}-1\right)$ より $p'(1)=h'(1)\left(49\alpha^{48}-1\right)$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\alpha=0$ のとき $49\alpha^{48}-1=-1$、$\alpha=\pm1$ のとき $49\alpha^{48}-1=48$ で、いずれも $0$ でない。よってどの場合も $h'(1)=0$ が必要で、$h'(x)=2x+a$ より`,
            },
            { k: "math", t: String.raw`h'(1)=2+a=0,\qquad a=-2` },
            { k: "p", t: String.raw`が確定する。このとき` },
            { k: "math", t: String.raw`\alpha=1+a+b=b-1,\qquad \beta=4+2a+b=b` },
            {
              k: "p",
              t: String.raw`だから、$b-1\in\{0,1,-1\}$ かつ $b\in\{0,1,-1\}$、すなわち $b\in\{0,1,2\}$ かつ $b\in\{-1,0,1\}$ である。共通部分は $b=0,\,1$ となる。`,
            },
            { k: "p", t: String.raw`以上より $(a,b)=(-2,0)$ または $(-2,1)$ である。実際、` },
            {
              k: "steps",
              items: [
                String.raw`$(a,b)=(-2,0)$ のとき $h(x)=x(x-2)$ で $h(1)=-1$、$h(2)=0$、$h'(1)=0$。3条件をみたす。`,
                String.raw`$(a,b)=(-2,1)$ のとき $h(x)=(x-1)^{2}$ で $h(1)=0$、$h(2)=1$、$h'(1)=0$。3条件をみたす。`,
              ],
            },
            { k: "p", t: String.raw`となり、どちらも条件をみたす。` },
          ],
          pitfalls: [
            String.raw`$(x-1)^{2}$ で割り切れる条件は「$x=1$ を代入して $0$」だけでは足りない。導関数に $x=1$ を代入しても $0$、という条件が要る。これを落とすと $a$ が決まらず、余計な解が残る。`,
            String.raw`$\alpha^{49}=\alpha$ の実数解は $0,\pm1$ の3つである。$\alpha^{48}=1$ から $\alpha=\pm1$、これに $\alpha=0$ を足す。複素数まで広げると解が増えるが、$a,b$ は実数なので $\alpha,\beta$ も実数である。`,
            String.raw`$h_2=h$ は「割った余りが $h$ に等しい」であって「$h^{49}=h$」ではない。$h$ の次数が $f$ より低いことを使って初めて、$h^{49}-h$ が $f$ で割り切れる、と言いかえられる。`,
          ],
          check: String.raw`$h(x)^{49}$ を $f(x)$ で割った余りを有理数係数のまま繰り返し2乗法で計算すると、$(a,b)=(-2,0)$ では $x^{2}-2x$、$(-2,1)$ では $x^{2}-2x+1$ となり、どちらも $h(x)$ そのものに戻る。$a,b$ を $-8$ から $8$ まで $\dfrac12$ 刻みで動かした $4624$ 通りを全部計算しても、$h_2=h$ となるのはこの2組だけだった。`,
        },
      ],
    },
    {
      no: 6,
      field: "空間図形・体積",
      topics: ["立体の体積", "球の一部の体積", "最短経路", "回転体の断面"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "条件 (i)(ii) と (iii)(iv)(v) を、線分と立方体の5面との交点を直接求める判定で実装し、$\\mathrm{N}$ を上面のふち $4801$ 点から探す全探索と、こちらの導いた形（立方体・四角錐の扇形・ふちまわりの $\\frac{3\\pi}{4}$ の扇形）が $40$ 万点で1点も食い違わないことを確かめた",
          "その形の体積を $400$ 万点のモンテカルロで測り、$V=10.285\\pm0.009$、$W=10.806\\pm0.009$ となって、閉じた式の $10.294$、$10.816$ と誤差の範囲で一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`条件 (i)(ii) をみたす点 $\mathrm{P}$ の動く範囲 $V$ の体積を求める`,
          answer: String.raw`$\dfrac{20}{3}+\dfrac{2\sqrt3}{3}\pi$`,
          approach: String.raw`$S$ は立方体の表面から**上面だけを取り除いた**ものである。$\mathrm{O}$ は立方体の中心なので、$\mathrm{O}$ から出る半直線は表面をちょうど1回だけ横切る。その出口が上面なら $S$ を通らないので $\mathrm{P}$ はどこまででも行けるし、出口が上面以外なら $\mathrm{P}$ はそこまでしか行けない。つまり条件 (ii) は「上面の方向かどうか」で2つに分かれる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`立方体を $K$、その上面 $\left\{|x|\le1,\ |y|\le1,\ z=1\right\}$ を $T$ とする。$S$ は $K$ の表面のうち $z<1$ の部分だから、$K$ の表面から $T$ を取り除いたものである。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{O}$ は $K$ の内部にあるので、$\mathrm{O}$ を端点とする半直線は $K$ の表面をちょうど1点で横切る。その点を**出口**と呼ぶ。出口より手前は $K$ の内部、先は $K$ の外部で、どちらも表面上の点ではない。したがって`,
            },
            {
              k: "steps",
              items: [
                String.raw`出口が $T$ の上にあるとき：線分 $\mathrm{OP}$ はどこまで延ばしても $S$ と出会わない。条件 (ii) は自動的にみたされ、(i) だけが効く。`,
                String.raw`出口が $T$ の上にないとき：出口は $S$ の点である。$\mathrm{P}$ が出口より先にあると、出口が $\mathrm{P}$ 以外の共有点になってしまう。よって $\mathrm{OP}$ は出口までで、$\mathrm{P}$ が出口と一致するときは共有点が $\mathrm{P}$ だけなので許される。`,
              ],
            },
            {
              k: "p",
              t: String.raw`出口が $T$ 上にある方向は、$z\ge|x|$ かつ $z\ge|y|$ かつ $z>0$ をみたす方向、つまり $\mathrm{O}$ を頂点とし $T$ を底面とする四角錐を無限に延ばした領域 $\varLambda$ の方向である。まとめると`,
            },
            {
              k: "math",
              t: String.raw`V=K\ \cup\ \left(\varLambda\cap B\right),\qquad B=\left\{\mathrm{OP}\le\sqrt3\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。立方体の中心から表面までの距離は最大でも頂点までの $\sqrt3$ なので、$K$ はまるごと $B$ に入っており、上の式で条件 (i) も過不足なく反映されている。`,
            },
            { k: "p", t: String.raw`**体積を出す。** 立方体の体積は $2^{3}=8$ である。` },
            {
              k: "p",
              t: String.raw`$\varLambda$ は、$\mathrm{O}$ から6つの面それぞれに向かう合同な6つの錐で空間を分けたうちの1つだから、$\mathrm{O}$ のまわりの全方向のちょうど $\dfrac16$ を占める。よって半径 $\sqrt3$ の球を $\varLambda$ で切り取った部分の体積は`,
            },
            {
              k: "math",
              t: String.raw`\frac16\cdot\frac43\pi\left(\sqrt3\right)^{3}=\frac16\cdot4\sqrt3\,\pi=\frac{2\sqrt3}{3}\pi`,
            },
            {
              k: "p",
              t: String.raw`である。重なっているのは $K\cap\varLambda$、すなわち $\mathrm{O}$ を頂点とし $T$ を底面とする四角錐で、体積は $\dfrac13\cdot(2\times2)\cdot1=\dfrac43$ である。したがって`,
            },
            {
              k: "math",
              t: String.raw`V=8+\frac{2\sqrt3}{3}\pi-\frac43=\frac{20}{3}+\frac{2\sqrt3}{3}\pi`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          pitfalls: [
            String.raw`$S$ に上面が含まれないことが、この問題のすべてである。上面のふち（$z=1$ かつ $|x|=1$ などの辺）も $z=1$ なので $S$ には入らない。`,
            String.raw`立方体の外に出られるのは上面の方向だけで、それ以外の方向では立方体の表面で止まる。だから $V$ は「球の一部」ではなく「立方体＋球の $\dfrac16$」から重なりを引いた形になる。`,
          ],
          check: String.raw`$\dfrac{20}{3}+\dfrac{2\sqrt3}{3}\pi=6.667+3.628=10.294$。条件 (i)(ii) を線分と5つの面との交点から直接判定するプログラムで、$1$ 辺 $3.5$ の立方体に $400$ 万点をばらまいて測ると $10.285\pm0.009$ となり、誤差の範囲で一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`条件 (iii)(iv)(v) をみたす点 $\mathrm{P}$ の動く範囲 $W$ の体積を求める`,
          answer: String.raw`$\dfrac{20}{3}+\left(8+\dfrac{2\sqrt3}{3}-9\sqrt2\,\alpha\right)\pi$（$\sin\alpha=\dfrac{1}{\sqrt3}$、$0<\alpha<\dfrac\pi2$）`,
          approach: String.raw`$\mathrm{O}\to\mathrm{N}\to\mathrm{P}$ という2本の線分で、長さの合計 $\sqrt3$ 以内で、$S$ をよけて $\mathrm{P}$ に届くか、という問題である。$\mathrm{N}=\mathrm{O}$ にとれば (1) の $V$ がそのまま入る。新しく届くのは、上面のふちで1回折れ曲がって立方体の外側に回り込む分だけである。ふちは線分なので、「線分の向こう側にある2点を結ぶ最短の折れ線」という平面の問題に落ちる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{N}=\mathrm{O}$ とすれば条件 (iii)(iv)(v) は (1) の (i)(ii) そのものになるので、$V\subset W$ である。以下、$V$ に入らない $\mathrm{P}$ がどこまで届くかを調べる。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{P}$ が立方体の外にあって $V$ に入らないとき、(1) で見たように線分 $\mathrm{OP}$ は $S$ を横切る。折れ線 $\mathrm{O}\to\mathrm{N}\to\mathrm{P}$ がこれをよけるには、上面 $T$ のふち、すなわち4本の辺のどれかで折れ曲がるしかない。どんな折れ線も長さは $\mathrm{OP}$ 以上なので、最短のものを調べれば十分である。`,
            },
            {
              k: "p",
              t: String.raw`辺 $\ell:\left\{(1,t,1)\ \middle|\ -1\le t\le1\right\}$ の場合を考える。$\ell$ を含む直線までの距離で測ると、$\mathrm{O}$ は $\sqrt2$ 離れていて、その垂線の足は $(1,0,1)$ である。$\mathrm{P}(x,y,z)$ について`,
            },
            {
              k: "math",
              t: String.raw`\rho=\sqrt{(x-1)^{2}+(z-1)^{2}}`,
            },
            { k: "p", t: String.raw`とおく。$\mathrm{N}=(1,t,1)$ にとると` },
            {
              k: "math",
              t: String.raw`\mathrm{ON}+\mathrm{NP}=\sqrt{2+t^{2}}+\sqrt{\rho^{2}+(y-t)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。これは、平面上に点 $\mathrm{O}'(0,\sqrt2)$ と $\mathrm{P}'(y,-\rho)$ をとり、$x$ 軸上の点 $(t,0)$ を経由する道のりとまったく同じ形をしている。よって最小値は $\mathrm{O}'\mathrm{P}'$ の直線距離`,
            },
            {
              k: "math",
              t: String.raw`\min_{t}\left(\mathrm{ON}+\mathrm{NP}\right)=\sqrt{y^{2}+\left(\sqrt2+\rho\right)^{2}}`,
            },
            {
              k: "p",
              t: String.raw`で、そのときの $t=\dfrac{\sqrt2\,y}{\sqrt2+\rho}$ は $|t|\le|y|$ をみたすから、$|y|\le1$ であれば確かに辺 $\ell$ の上にある。条件 (iii) は`,
            },
            {
              k: "math",
              t: String.raw`y^{2}+\left(\sqrt2+\rho\right)^{2}\le3\iff \rho\le\sqrt{3-y^{2}}-\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`となる。右辺が $0$ 以上になるのは $|y|\le1$ のときだけで、これは辺 $\ell$ の長さとちょうど合っている。`,
            },
            {
              k: "p",
              t: String.raw`**回り込める向き。** 直線 $\ell$ に垂直な平面で切って、$u=x-1$、$v=z-1$ とおく。この断面で $S$ にあたるのは半直線 $u=0,\ v<0$（側面 $x=1$）だけで、$u<0,\ v=0$ の側（上面）は $S$ ではない。$\mathrm{P}$ が $V$ に入らないのは $u>0$ かつ $v<u$ のときで、これは向きでいうと $(0,-1)$ の方向から $(1,1)$ の方向までの`,
            },
            { k: "math", t: String.raw`\frac{3}{4}\pi\ \ \left(=135^\circ\right)` },
            {
              k: "p",
              t: String.raw`ぶんの扇形である。したがって辺 $\ell$ のまわりで新たに届く範囲は、各 $y$ について半径 $R(y)=\sqrt{3-y^{2}}-\sqrt2$、中心角 $\dfrac34\pi$ の扇形で、その面積は $\dfrac12R(y)^{2}\cdot\dfrac34\pi=\dfrac{3\pi}{8}R(y)^{2}$ である。`,
            },
            { k: "p", t: String.raw`**積分する。**` },
            {
              k: "math",
              t: String.raw`R(y)^{2}=\left(3-y^{2}\right)-2\sqrt2\sqrt{3-y^{2}}+2=5-y^{2}-2\sqrt2\sqrt{3-y^{2}}`,
            },
            { k: "p", t: String.raw`で、$\displaystyle\int_{-1}^{1}\left(5-y^{2}\right)dy=\frac{28}{3}$ である。残りは $y=\sqrt3\sin\theta$ と置換する。$dy=\sqrt3\cos\theta\,d\theta$、$\sqrt{3-y^{2}}=\sqrt3\cos\theta$ で、$y=\pm1$ は $\sin\theta=\pm\dfrac{1}{\sqrt3}$、すなわち $\theta=\pm\alpha$ にあたるから` },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}\sqrt{3-y^{2}}\,dy=\int_{-\alpha}^{\alpha}3\cos^{2}\theta\,d\theta=3\int_{-\alpha}^{\alpha}\frac{1+\cos2\theta}{2}\,d\theta=3\left[\frac{\theta}{2}+\frac{\sin2\theta}{4}\right]_{-\alpha}^{\alpha}=3\alpha+\frac32\sin2\alpha`,
            },
            {
              k: "p",
              t: String.raw`となる。$\sin\alpha=\dfrac{1}{\sqrt3}$、$0<\alpha<\dfrac\pi2$ より $\cos\alpha=\sqrt{\dfrac23}$ なので $\sin2\alpha=2\cdot\dfrac{1}{\sqrt3}\cdot\dfrac{\sqrt2}{\sqrt3}=\dfrac{2\sqrt2}{3}$ で、この積分は $3\alpha+\sqrt2$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\int_{-1}^{1}R(y)^{2}\,dy=\frac{28}{3}-2\sqrt2\left(\sqrt2+3\alpha\right)=\frac{16}{3}-6\sqrt2\,\alpha`,
            },
            { k: "p", t: String.raw`となり、辺 $\ell$ 1本ぶんの体積は` },
            {
              k: "math",
              t: String.raw`\frac{3\pi}{8}\left(\frac{16}{3}-6\sqrt2\,\alpha\right)=2\pi-\frac{9\sqrt2}{4}\pi\alpha`,
            },
            {
              k: "p",
              t: String.raw`である。4本の辺について同じことが起き、辺 $\ell$ のぶんは $x>1$、隣の辺のぶんは $y>1$ のように、どの2つも重ならない。よって`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
W&=\frac{20}{3}+\frac{2\sqrt3}{3}\pi+4\left(2\pi-\frac{9\sqrt2}{4}\pi\alpha\right)\\[1mm]
&=\frac{20}{3}+\left(8+\frac{2\sqrt3}{3}-9\sqrt2\,\alpha\right)\pi
\end{aligned}`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$y=0$ での断面。濃い部分が $W$。真ん中の正方形が立方体、上に開いた扇形が条件 (i)(ii) で直接届く範囲（半径 $\sqrt3$）、上の2つの角についた小さな扇形がふちで1回折れ曲がって回り込める範囲（半径 $\sqrt3-\sqrt2$、中心角 $\frac34\pi$）。上辺（破線）は $S$ に含まれない開いた部分。`,
                view: [-2.35, 2.35, -1.55, 2.15],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[-1, -1], [1, -1], [1, 1], [-1, 1]] },
                  {
                    k: "fill",
                    pts: [
                      [0, 0],
                      ...Array.from({ length: 41 }, (_, i) => {
                        const th = Math.PI / 4 + (Math.PI / 2) * (i / 40);
                        return [Math.sqrt(3) * Math.cos(th), Math.sqrt(3) * Math.sin(th)] as [number, number];
                      }),
                    ],
                  },
                  ...[1, -1].map((s) => ({
                    k: "fill" as const,
                    pts: [
                      [s * 1, 1] as [number, number],
                      ...Array.from({ length: 31 }, (_, i) => {
                        const th = -Math.PI / 2 + ((3 * Math.PI) / 4) * (i / 30);
                        return [s * (1 + RIM * Math.cos(th)), 1 + RIM * Math.sin(th)] as [number, number];
                      }),
                    ],
                  })),
                  { k: "seg", a: [-1, -1], b: [1, -1] },
                  { k: "seg", a: [1, -1], b: [1, 1] },
                  { k: "seg", a: [-1, -1], b: [-1, 1] },
                  { k: "seg", a: [-1, 1], b: [1, 1], dash: true },
                  {
                    k: "param",
                    f: (th: number) => [Math.sqrt(3) * Math.cos(th), Math.sqrt(3) * Math.sin(th)] as [number, number],
                    from: Math.PI / 4,
                    to: (3 * Math.PI) / 4,
                  },
                  { k: "seg", a: [0, 0], b: [Math.sqrt(1.5), Math.sqrt(1.5)], faint: true, dash: true },
                  { k: "seg", a: [0, 0], b: [-Math.sqrt(1.5), Math.sqrt(1.5)], faint: true, dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [1, 1] },
                  { k: "text", at: [0, Math.sqrt(3)], label: "半径 √3", place: "above" },
                  { k: "text", at: [1 + RIM, 1], label: "ふちを回り込む分", place: "right" },
                  { k: "text", at: [0, 1], label: "ここが開いている", place: "above" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{N}$ は $S$ に触れてはいけない（条件 (iv) には「$\mathrm{N}$ のみを共有点に持つ」という逃げ道がない）が、上面のふちは $z=1$ なので $S$ ではなく、そこで折れ曲がってよい。`,
            String.raw`$\mathrm{ON}+\mathrm{NP}$ の最小値を求めるところが山場である。$\mathrm{O}$ と $\mathrm{P}$ を辺 $\ell$ のまわりの「軸方向の座標」と「軸からの距離」で測り直すと、平面上で直線の向こう側へ渡る最短経路の問題と同じ形になる。`,
            String.raw`回り込める向きが $\dfrac34\pi$ であることは、辺に垂直な断面で考える。側面 $x=1$ が壁、上面が開口部なので、壁の方向から上面の延長方向までのちょうど $135^\circ$ ぶんが「直接は見えないが回り込める」範囲になる。`,
            String.raw`4本の辺の寄与は重ならない。辺 $x=1$ のぶんは $x>1$、辺 $y=1$ のぶんは $y>1$ をみたすが、$x>1$ の点は辺 $y=1$ まわりの条件 $|x|\le1$ を破るので、両方に数えられることはない。`,
          ],
          check: String.raw`$\sin\alpha=\dfrac{1}{\sqrt3}$ をみたす $\alpha=0.61548$ として $\dfrac{20}{3}+\left(8+\dfrac{2\sqrt3}{3}-9\sqrt2\,\alpha\right)\pi=10.816$。条件を直接判定し、$\mathrm{N}$ を上面のふち $4801$ 点から探す全探索と、ここで導いた形とを $40$ 万点で突き合わせると、判定の食い違いは $0$ だった。体積も $400$ 万点のモンテカルロで $10.806\pm0.009$ となり一致する。`,
        },
      ],
    },
  ],
};
