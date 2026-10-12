import { kyudaiRikei2019 } from "@/lib/solutions/kyudai-rikei-2019";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 九州大学 2019年度（平成31年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 *
 * 文科系の第4問は理科系の第2問とまったく同じ問題だった。
 * 同じ解説を2通り書くと必ず食い違うので、理科系の側を1つの正本として持ち、
 * ここでは番号だけ差し替えて使い回す。
 */

/** 理科系 第2問と共通の出題（2つの恒等式から f, g を決める）。文科系では第4問。 */
const sharedSeishiki: Question = { ...kyudaiRikei2019.questions.find((q) => q.no === 2)!, no: 4 };

/** 第2問。k に対する（極大値 − 極小値）= (4/27)(k²-3k)^{3/2}。 */
const DF19 = (k: number): number => ((4 / 27) * Math.pow(k * k - 3 * k, 1.5));
/** 比較する 4|k|³。 */
const RH19 = (k: number): number => 4 * Math.abs(k) ** 3;

export const kyudaiBunkei2019: SolutionSet = {
  slug: "kyudai-bunkei",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "九州大学",
  short: "九大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "確率",
      topics: ["常用対数", "桁数", "反復試行", "二項係数"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$k=0,\\dots,10$ について $3^{k}\\cdot8^{10-k}$ を実際に計算して桁数を数えると、$8$ 桁になるのは $k=3$（$56623104$）と $k=4$（$21233664$）だけだった",
          "$ {}_{10}\\mathrm{C}_3+{}_{10}\\mathrm{C}_4=120+210=330$ で、$\\frac{330}{1024}=\\frac{165}{512}$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`表に $3$、裏に $8$ が書かれた硬貨を $10$ 回投げるとき、出た数字 $10$ 個の積が $8$ 桁になる確率を求める（$\log_{10}2=0.3010$、$\log_{10}3=0.4771$）`,
          answer: String.raw`$\dfrac{165}{512}$`,
          approach: String.raw`表が $k$ 回出たときの積は $3^{k}\cdot8^{10-k}$ である。常用対数をとると $k$ の1次式になるので、「$8$ 桁」$\Longleftrightarrow$「$7\le\log_{10}(\text{積})<8$」を $k$ の不等式に直す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`表が $k$ 回（$0\le k\le10$）出たとすると、積は`,
            },
            {
              k: "math",
              t: String.raw`P_k=3^{k}\cdot8^{10-k}=3^{k}\cdot2^{3(10-k)}`,
            },
            { k: "p", t: String.raw`である。常用対数をとると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\log_{10}P_k&=k\log_{10}3+(30-3k)\log_{10}2\\[1mm]
&=0.4771k+(30-3k)\times0.3010\\[1mm]
&=0.4771k+9.03-0.903k=9.03-0.4259k
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$8$ 桁の条件。** $P_k$ が $8$ 桁 $\Longleftrightarrow$ $10^{7}\le P_k<10^{8}$ $\Longleftrightarrow$ $7\le\log_{10}P_k<8$ である。`,
            },
            {
              k: "math",
              t: String.raw`7\le9.03-0.4259k<8`,
            },
            { k: "p", t: String.raw`を解く。各辺から $9.03$ を引いて $-1$ を掛けると（不等号が逆転して）` },
            {
              k: "math",
              t: String.raw`1.03<0.4259k\le2.03`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{1.03}{0.4259}<k\le\frac{2.03}{0.4259}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{1.03}{0.4259}=2.418\cdots$、$\dfrac{2.03}{0.4259}=4.766\cdots$ なので、$k$ は整数より`,
            },
            { k: "math", t: String.raw`k=3,\;4` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**確率。** 表が $k$ 回出る確率は $\dfrac{{}_{10}\mathrm{C}_k}{2^{10}}$ なので`,
            },
            {
              k: "math",
              t: String.raw`P=\frac{{}_{10}\mathrm{C}_3+{}_{10}\mathrm{C}_4}{2^{10}}=\frac{120+210}{1024}=\frac{330}{1024}=\frac{165}{512}`,
            },
            { k: "p", t: String.raw`である（$0.322$ ほど）。` },
            {
              k: "note",
              t: String.raw`実際に計算すると $P_3=27\cdot8^{7}=56\,623\,104$、$P_4=81\cdot8^{6}=21\,233\,664$ でどちらも $8$ 桁、$P_2=150\,994\,944$ は $9$ 桁、$P_5=7\,962\,624$ は $7$ 桁である。`,
            },
          ],
          pitfalls: [
            String.raw`$\log_{10}P_k$ は $k$ の**減少**関数である（係数が $-0.4259$）。不等式を $k$ について解くとき向きが逆になる。`,
            String.raw`$8$ で割り切れる形にせず、$8=2^{3}$ として $\log_{10}2$ を使う。$\log_{10}8=3\times0.3010=0.903$。`,
            String.raw`$n$ 桁の条件は $10^{n-1}\le P<10^{n}$ である。$\le$ と $<$ の向きを合わせる。`,
            String.raw`$\frac{1.03}{0.4259}=2.418$ は $2$ より大きいので $k=2$ は入らない。境目を丁寧に見る。`,
          ],
          check: String.raw`$k=0,\dots,10$ で $3^{k}\cdot8^{10-k}$ を実際に計算すると、$8$ 桁になるのは $k=3,4$ だけだった。確率は $\frac{330}{1024}=\frac{165}{512}$ である。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["極値をもつ条件", "極大値と極小値の差", "3次方程式", "絶対値"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$k=-\\frac38,-1,4,5$ で極大値と極小値を実際に計算すると、差が $\\frac4{27}\\left(k^{2}-3k\\right)^{3/2}$ と小数9桁まで一致した",
          "$k$ を $-2$ から $5$ まで $70$ 万点に刻んで条件をみたす値を探すと $k=-0.375=-\\frac38$ だけだった（$k\\to0$ の側は極値が消えるので不適）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`3次関数 $y=x^{3}-kx^{2}+kx+1$ が極大値と極小値をもち、極大値から極小値を引いた値が $4\left|k\right|^{3}$ になるとき、$k$ の値を求める`,
          answer: String.raw`$k=-\dfrac38$`,
          approach: String.raw`$y'=3x^{2}-2kx+k$ の2解を $\alpha<\beta$ とすると、$\alpha$ が極大、$\beta$ が極小である。差を $\alpha,\beta$ の対称式で表すと、$(\beta-\alpha)$ と $k$ だけの式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y'=3x^{2}-2kx+k$ である。極大値と極小値をもつ条件は $y'=0$ が異なる2つの実数解をもつことで`,
            },
            {
              k: "math",
              t: String.raw`\frac{D}4=k^{2}-3k>0\quad\Longleftrightarrow\quad k<0\;\text{または}\;k>3`,
            },
            {
              k: "p",
              t: String.raw`である。2解を $\alpha<\beta$ とすると $x^{3}$ の係数が正なので、$x=\alpha$ で極大、$x=\beta$ で極小である。`,
            },
            { k: "p", t: String.raw`**差を計算する。** $f(x)=x^{3}-kx^{2}+kx+1$ とおくと` },
            {
              k: "math",
              t: String.raw`f(\alpha)-f(\beta)=\left(\alpha^{3}-\beta^{3}\right)-k\left(\alpha^{2}-\beta^{2}\right)+k(\alpha-\beta)`,
            },
            { k: "p", t: String.raw`で、$\alpha-\beta$ でくくると` },
            {
              k: "math",
              t: String.raw`=(\alpha-\beta)\left\{\left(\alpha^{2}+\alpha\beta+\beta^{2}\right)-k(\alpha+\beta)+k\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。解と係数の関係より $\alpha+\beta=\dfrac{2k}3$、$\alpha\beta=\dfrac k3$ なので`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
\alpha^{2}+\alpha\beta+\beta^{2}&=(\alpha+\beta)^{2}-\alpha\beta=\frac{4k^{2}}9-\frac k3\\[1mm]
\left\{\;\cdots\;\right\}&=\frac{4k^{2}}9-\frac k3-\frac{2k^{2}}3+k=-\frac{2k^{2}}9+\frac{2k}3=-\frac29\left(k^{2}-3k\right)
\end{aligned}`,
            },
            { k: "p", t: String.raw`である。また` },
            {
              k: "math",
              t: String.raw`\beta-\alpha=\frac{2\sqrt{k^{2}-3k}}3,\qquad\alpha-\beta=-\frac23\sqrt{k^{2}-3k}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f(\alpha)-f(\beta)=\left(-\frac23\sqrt{k^{2}-3k}\right)\left(-\frac29\left(k^{2}-3k\right)\right)
=\frac4{27}\left(k^{2}-3k\right)^{3/2}`,
            },
            { k: "p", t: String.raw`である（正になっていて、確かに極大 $-$ 極小）。` },
            { k: "p", t: String.raw`**方程式を解く。** 条件は` },
            {
              k: "math",
              t: String.raw`\frac4{27}\left(k^{2}-3k\right)^{3/2}=4\left|k\right|^{3}`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\left(k^{2}-3k\right)^{3/2}=27\left|k\right|^{3}=\left(3\left|k\right|\right)^{3}=\left(9k^{2}\right)^{3/2}`,
            },
            {
              k: "p",
              t: String.raw`である。両辺とも $0$ 以上なので $\dfrac23$ 乗して`,
            },
            {
              k: "math",
              t: String.raw`k^{2}-3k=9k^{2}\quad\Longleftrightarrow\quad8k^{2}+3k=0\quad\Longleftrightarrow\quad k(8k+3)=0`,
            },
            {
              k: "p",
              t: String.raw`である。$k=0$ では $k^{2}-3k=0$ となり極値をもたないので不適。よって`,
            },
            { k: "math", t: String.raw`k=-\frac38` },
            {
              k: "p",
              t: String.raw`である。これは $k<0$ をみたし、$k^{2}-3k=\dfrac9{64}+\dfrac98=\dfrac{81}{64}>0$ で確かに極値をもつ。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`実線が（極大値 $-$ 極小値）$=\frac4{27}\left(k^{2}-3k\right)^{3/2}$、点線が $4\left|k\right|^{3}$。極値をもつのは $k<0$ と $k>3$ の部分だけで、2つが交わるのは $k=-\frac38$ の1か所である（$k\to0$ では両方 $0$ に近づくが、そこでは極値が消える）。`,
                view: [-1.6, 5.6, -1.2, 7.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: DF19, from: -1.5, to: -0.001 },
                  { k: "curve", f: DF19, from: 3.001, to: 5.5 },
                  { k: "curve", f: RH19, from: -1.2, to: 1.2, dash: true },
                  { k: "dot", at: [-0.375, DF19(-0.375)], label: "k = -3/8", place: "above-left" },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: [3, 0], label: "3", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「極大値と極小値をもつ」ので $k^{2}-3k>0$、つまり $k<0$ または $k>3$ である。これを先に押さえる。`,
            String.raw`$x^{3}$ の係数が正なので、小さいほうの解 $\alpha$ が極大である。逆にすると符号が反転する。`,
            String.raw`$27\left|k\right|^{3}=\left(9k^{2}\right)^{3/2}$ と書き直すのがポイント。$\left|k\right|$ のまま2乗・3乗すると場合分けが増える。`,
            String.raw`$k=0$ は式の上では解だが、極値をもたないので答えにならない。`,
          ],
          check: String.raw`$k=-\frac38$ で極大値 $-$ 極小値を実際に計算すると $0.2109375$、$4\left|k\right|^{3}=0.2109375$ で一致した。$k$ を $70$ 万点に刻んで条件をみたす値を探すと $-0.375$ だけだった。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["平面の法線", "点と平面の距離", "四面体の体積", "三角関数の合成"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\overrightarrow{\\mathrm{AB}}\\times\\overrightarrow{\\mathrm{AC}}=(0,-6,6)$ で、$\\triangle\\mathrm{ABC}=4.242640687=3\\sqrt2$ になることを確かめた",
          "$(p,q)=(9,7),(10,7),(9,8)$ で $\\frac{\\left|q-p-1\\right|}{\\sqrt2}$ と点と平面の距離の公式が一致した",
          "$\\mathrm{P}$ を円周上 $6$ 万点以上動かして四面体の体積を計算すると、最小 $1.585786438=3-\\sqrt2$、最大 $4.414213562=3+\\sqrt2$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`点 $\mathrm{P}$ から平面 $\alpha$ に下ろした垂線と $\alpha$ との交点を $\mathrm{H}$ とするとき、線分 $\mathrm{PH}$ の長さを $p,q$ を用いて表す`,
          answer: String.raw`$\mathrm{PH}=\dfrac{\left|q-p-1\right|}{\sqrt2}$`,
          approach: String.raw`$\overrightarrow{\mathrm{AB}}$ と $\overrightarrow{\mathrm{AC}}$ の外積で法線を求め、平面の方程式を書く。あとは点と平面の距離の公式である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\overrightarrow{\mathrm{AB}}=(2,0,0)$、$\overrightarrow{\mathrm{AC}}=(3,3,3)$ なので、法線ベクトルは`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AB}}\times\overrightarrow{\mathrm{AC}}=(0\cdot3-0\cdot3,\;0\cdot3-2\cdot3,\;2\cdot3-0\cdot3)=(0,-6,6)`,
            },
            {
              k: "p",
              t: String.raw`で、$(0,-1,1)$ に平行である。$\mathrm{A}(1,2,3)$ を通るので平面 $\alpha$ は`,
            },
            {
              k: "math",
              t: String.raw`0\cdot(x-1)-1\cdot(y-2)+1\cdot(z-3)=0\quad\Longleftrightarrow\quad-y+z-1=0`,
            },
            { k: "p", t: String.raw`である（$\mathrm{B},\mathrm{C}$ も代入すると成り立つ）。` },
            { k: "p", t: String.raw`**距離。** $\mathrm{P}(6,p,q)$ との距離は` },
            {
              k: "math",
              t: String.raw`\mathrm{PH}=\frac{\left|-p+q-1\right|}{\sqrt{0^{2}+(-1)^{2}+1^{2}}}=\frac{\left|q-p-1\right|}{\sqrt2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`平面の式に $x$ が出てこない。$\overrightarrow{\mathrm{AB}}$ が $x$ 軸方向なので、$\alpha$ は $x$ 軸に平行な平面になっている。だから $\mathrm{P}$ の $x$ 座標 $6$ は距離に効かない。`,
            },
          ],
          pitfalls: [
            String.raw`法線は $(0,-6,6)$ でも $(0,-1,1)$ でもよいが、距離の公式では分母にその大きさを使う。約分した形で揃える。`,
            String.raw`$\mathrm{P}$ は $\alpha$ 上にないので $q-p-1\ne0$ である。絶対値は外せない。`,
          ],
          check: String.raw`$(p,q)=(9,7),(10,7),(9,8)$ で $\frac{\left|q-p-1\right|}{\sqrt2}$ を計算すると $2.12132,\,2.828427,\,1.414214$ で、外積から直接求めた距離と一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`点 $\mathrm{P}$ が $(p-9)^{2}+(q-7)^{2}=1$ をみたしながら動くとき、四面体 $\mathrm{ABCP}$ の体積の最大値と最小値を求める`,
          answer: String.raw`最大値 $3+\sqrt2$、最小値 $3-\sqrt2$`,
          approach: String.raw`体積は $\dfrac13\triangle\mathrm{ABC}\cdot\mathrm{PH}$ である。$\triangle\mathrm{ABC}$ は定数なので、$\mathrm{PH}$ の最大・最小を求めればよい。$p,q$ を三角関数で表して合成する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**底面積。** $\triangle\mathrm{ABC}=\dfrac12\left|\overrightarrow{\mathrm{AB}}\times\overrightarrow{\mathrm{AC}}\right|=\dfrac12\left|(0,-6,6)\right|=\dfrac12\cdot6\sqrt2=3\sqrt2$ である。`,
            },
            { k: "p", t: String.raw`**体積。** (1) より` },
            {
              k: "math",
              t: String.raw`V=\frac13\cdot3\sqrt2\cdot\frac{\left|q-p-1\right|}{\sqrt2}=\left|q-p-1\right|`,
            },
            { k: "p", t: String.raw`である（$\sqrt2$ がきれいに約分される）。` },
            {
              k: "p",
              t: String.raw`**$q-p-1$ の動く範囲。** $p=9+\cos\theta$、$q=7+\sin\theta$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
q-p-1&=(7+\sin\theta)-(9+\cos\theta)-1\\[1mm]
&=-3+\sin\theta-\cos\theta=-3+\sqrt2\,\sin\!\left(\theta-\frac\pi4\right)
\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sin$ は $-1$ から $1$ まで動くので`,
            },
            {
              k: "math",
              t: String.raw`-3-\sqrt2\le q-p-1\le-3+\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`で、$\sqrt2=1.414<3$ だからこの値はつねに負である。したがって`,
            },
            {
              k: "math",
              t: String.raw`V=\left|q-p-1\right|=3-\sqrt2\,\sin\!\left(\theta-\frac\pi4\right)`,
            },
            { k: "p", t: String.raw`となり` },
            {
              k: "math",
              t: String.raw`3-\sqrt2\le V\le3+\sqrt2`,
            },
            {
              k: "p",
              t: String.raw`である。よって最大値 $3+\sqrt2$、最小値 $3-\sqrt2$ である（$4.414$ と $1.586$）。`,
            },
            {
              k: "note",
              t: String.raw`$V$ が $0$ にならないので、$\mathrm{P}$ は円周上のどこにあっても $\alpha$ 上に来ない。「$\mathrm{P}$ は $\alpha$ 上にない」という条件が自動的にみたされている。`,
            },
          ],
          pitfalls: [
            String.raw`$\sqrt2$ が約分されて $V=\left|q-p-1\right|$ というきれいな式になる。ここで計算が軽くなる。`,
            String.raw`$\sin\theta-\cos\theta=\sqrt2\sin\left(\theta-\frac\pi4\right)$ の合成。係数 $\sqrt2$ を忘れない。`,
            String.raw`$-3+\sqrt2<0$ なので絶対値は符号を反転させる。$V$ の最大は $\sin=-1$ のときである。`,
          ],
          check: String.raw`$\mathrm{P}$ を円周上 $6$ 万点以上動かして体積を計算すると、最小 $1.585786438$、最大 $4.414213562$ で、$3\mp\sqrt2$ と一致した。`,
        },
      ],
    },
    sharedSeishiki,
  ],
};
