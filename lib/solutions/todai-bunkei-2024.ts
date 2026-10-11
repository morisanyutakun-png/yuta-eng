import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2024年度（令和6年度）一般選抜 前期日程 数学（文科）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 東京大学は入試問題そのものを公開していないので、リンクは張らない。
 */

/** 第1問の図。最小を与える $\theta=45^\circ$ のときの放物線。 */
const S1 = 1 / Math.SQRT2;
const PARA1 = (x: number) => (-1 / (2 * S1)) * x * x + (S1 * S1 + 1) / (2 * S1);

/** 第3問の図。$p=\frac12$ のときの配置。 */
const P3 = 0.5;
const Q3 = (P3 * (3 - P3 * P3)) / (2 * (1 - P3 * P3));

/** 第4問の図。正九角形の頂点。 */
const V9 = (j: number): [number, number] => [
  Math.cos((2 * Math.PI * j) / 9 + Math.PI / 2),
  Math.sin((2 * Math.PI * j) / 9 + Math.PI / 2),
];

export const todaiBunkei2024: SolutionSet = {
  slug: "todai-bunkei",
  year: 2024,
  subject: "数学",
  schedule: "前期日程",
  division: "文科",
  university: "東京大学",
  short: "東大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式・積分法",
      topics: ["円の接線", "放物線と直線の接触", "面積", "相加相乗平均"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$a,b,c$ の式から放物線を作り、$\\theta=0.3,0.6,\\frac\\pi4,1.2,1.5$ のすべてで2点を通ること・その点での傾きが円の接線の傾きと一致することを確かめた",
          "面積 $A$ をシンプソン法で数値積分し、$\\frac{2\\left(s^{2}+1\\right)^{3/2}}{3s}$ と小数8桁まで一致することを確かめた",
          "$A$ を $s$ について $20$ 万等分で全探索し、最小 $1.732050808$ を $s=0.707105$ でとること、$\\sqrt3=1.732050808$、$\\frac{1}{\\sqrt2}=0.707107$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a,b,c$ を $s=\sin\theta$ で表す`,
          answer: String.raw`$a=-\dfrac{1}{2s}$、$b=0$、$c=\dfrac{s^{2}+1}{2s}$`,
          approach: String.raw`「共通の接線を持つ」とは、その点で接線の傾きが一致することである。円 $x^{2}+y^{2}=1$ 上の点での接線は半径と垂直なので、傾きはすぐ書ける。$\mathrm{P}$ と $\mathrm{Q}$ の2本を立てると、足して $b$ が、引いて $a$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$c=\cos\theta$ と書くと紛らわしいので、$\mathrm{P}\left(\cos\theta,\sin\theta\right)$、$\mathrm{Q}\left(-\cos\theta,\sin\theta\right)$ のまま進める。$0^\circ<\theta<90^\circ$ より $\cos\theta>0$、$\sin\theta>0$ である。`,
            },
            {
              k: "p",
              t: String.raw`円 $x^{2}+y^{2}=1$ の点 $\mathrm{P}$ における接線は半径 $\mathrm{OP}$ に垂直である。$\mathrm{OP}$ の方向は $\left(\cos\theta,\sin\theta\right)$ だから、接線の傾きは $-\dfrac{\cos\theta}{\sin\theta}$ である。同様に $\mathrm{Q}$ での接線の傾きは $\dfrac{\cos\theta}{\sin\theta}$ である。`,
            },
            { k: "p", t: String.raw`放物線 $y=ax^{2}+bx+c$ の接線の傾きは $2ax+b$ だから、共通接線をもつ条件は` },
            {
              k: "math",
              t: String.raw`2a\cos\theta+b=-\frac{\cos\theta}{\sin\theta},\qquad -2a\cos\theta+b=\frac{\cos\theta}{\sin\theta}`,
            },
            {
              k: "p",
              t: String.raw`である。辺々足すと $2b=0$ で $b=0$。辺々引くと $4a\cos\theta=-\dfrac{2\cos\theta}{\sin\theta}$ で、$\cos\theta\ne0$ より`,
            },
            { k: "math", t: String.raw`a=-\frac{1}{2\sin\theta}=-\frac{1}{2s}` },
            { k: "p", t: String.raw`を得る。$\mathrm{P}$ を通ることから、$\cos^{2}\theta=1-s^{2}$ を使って` },
            {
              k: "math",
              t: String.raw`s=a\left(1-s^{2}\right)+c,\qquad c=s+\frac{1-s^{2}}{2s}=\frac{2s^{2}+1-s^{2}}{2s}=\frac{s^{2}+1}{2s}`,
            },
            { k: "p", t: String.raw`となる。$\mathrm{Q}$ を通る条件は $b=0$ のもとで同じ式になるので、新しい条件は出ない。` },
          ],
          pitfalls: [
            String.raw`「共通の接線を持つ」は「接線の傾きが等しい」だけでなく「同じ点を通る」ことも要るが、どちらも点 $\mathrm{P}$ で接するので、通ることは「放物線が $\mathrm{P}$ を通る」という条件に含まれている。`,
            String.raw`$b=0$ は、$\mathrm{P}$ と $\mathrm{Q}$ が $y$ 軸について対称であることから当然そうなる。先に $b=0$ と見当をつけてもよいが、2式を足して出すほうが確実である。`,
          ],
          check: String.raw`$\theta=45^\circ$（$s=\dfrac{1}{\sqrt2}$）なら $a=-\dfrac{1}{\sqrt2}$、$c=\dfrac{3}{2\sqrt2}$。$x=\dfrac{1}{\sqrt2}$ を入れると $y=-\dfrac{1}{\sqrt2}\cdot\dfrac12+\dfrac{3}{2\sqrt2}=\dfrac{1}{\sqrt2}$ で $\mathrm{P}$ を通る。傾きは $2a\cdot\dfrac{1}{\sqrt2}=-1$ で、円の接線の傾き $-\dfrac{\cos45^\circ}{\sin45^\circ}=-1$ と一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`放物線 $C$ と $x$ 軸で囲まれた図形の面積 $A$ を $s$ で表す`,
          answer: String.raw`$A=\dfrac{2\left(s^{2}+1\right)\sqrt{s^{2}+1}}{3s}$`,
          approach: String.raw`$b=0$ なので $C$ は $y$ 軸について対称な上に凸の放物線である。$x$ 軸との交点がすぐ求まるので、$\dfrac16$ 公式を使えば積分を書かずに面積が出る。`,
          blocks: [
            { k: "p", t: String.raw`(1) より` },
            {
              k: "math",
              t: String.raw`C:\ y=-\frac{1}{2s}x^{2}+\frac{s^{2}+1}{2s}=\frac{1}{2s}\left\{\left(s^{2}+1\right)-x^{2}\right\}`,
            },
            {
              k: "p",
              t: String.raw`である。$s>0$ より上に凸で、$x$ 軸との交点は $x=\pm\beta$（$\beta=\sqrt{s^{2}+1}$）である。$\dfrac16$ 公式より`,
            },
            {
              k: "math",
              t: String.raw`A=\frac{\left|-\frac{1}{2s}\right|}{6}\left(2\beta\right)^{3}=\frac{8\beta^{3}}{12s}=\frac{2\beta^{3}}{3s}=\frac{2\left(s^{2}+1\right)\sqrt{s^{2}+1}}{3s}`,
            },
            { k: "p", t: String.raw`となる。` },
          ],
          check: String.raw`$s=\dfrac{1}{\sqrt2}$ なら $\beta=\sqrt{\dfrac32}$ で $A=\dfrac{2}{3}\cdot\sqrt2\cdot\left(\dfrac32\right)^{\frac32}=\sqrt3=1.7320$。数値積分しても $1.73205081$ で一致する。$s=0.5$ では式が $1.86338998$、数値積分も $1.86338998$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$A\ge\sqrt3$ を示す`,
          answer: String.raw`$s=\dfrac{1}{\sqrt2}$（$\theta=45^\circ$）で最小値 $\sqrt3$ をとる`,
          approach: String.raw`$A$ を $s$ の関数として微分するのが素直だが、根号つきなので $A^{2}$ を調べるほうが楽である。$A^{2}=\dfrac{4\left(s^{2}+1\right)^{3}}{9s^{2}}$ で、$u=s^{2}$ とおけば $u$ の分数関数になり、相加相乗平均が使える形に整理できる。`,
          blocks: [
            { k: "p", t: String.raw`$0^\circ<\theta<90^\circ$ より $0<s<1$ である。$A>0$ なので $A^{2}$ の最小を調べればよい。$u=s^{2}$（$0<u<1$）とおくと` },
            { k: "math", t: String.raw`A^{2}=\frac{4\left(s^{2}+1\right)^{3}}{9s^{2}}=\frac{4(u+1)^{3}}{9u}` },
            { k: "p", t: String.raw`である。$g(u)=\dfrac{(u+1)^{3}}{u}$ を微分すると` },
            {
              k: "math",
              t: String.raw`g'(u)=\frac{3(u+1)^{2}\cdot u-(u+1)^{3}}{u^{2}}=\frac{(u+1)^{2}\left\{3u-(u+1)\right\}}{u^{2}}=\frac{(u+1)^{2}(2u-1)}{u^{2}}`,
            },
            {
              k: "p",
              t: String.raw`となる。$u>0$ では符号は $2u-1$ で決まり、$u<\dfrac12$ で負、$u>\dfrac12$ で正である。よって $g$ は $u=\dfrac12$ で最小になり`,
            },
            {
              k: "math",
              t: String.raw`g\!\left(\frac12\right)=\frac{\left(\frac32\right)^{3}}{\frac12}=\frac{27}{8}\cdot2=\frac{27}{4}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`A^{2}\ge\frac49\cdot\frac{27}{4}=3,\qquad A\ge\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`となる。等号は $u=\dfrac12$、すなわち $s=\dfrac{1}{\sqrt2}$（$\theta=45^\circ$）のときに成り立ち、この $\theta$ は $0^\circ<\theta<90^\circ$ の範囲にある。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`等号が成り立つ $\theta=45^\circ$ のとき。放物線 $C$ は円 $x^{2}+y^{2}=1$ と $\mathrm{P},\mathrm{Q}$ で接し、網かけの面積が $\sqrt3$ になる。`,
                view: [-1.75, 1.75, -0.35, 1.45],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "fillBetween",
                    top: PARA1,
                    bottom: () => 0,
                    from: -Math.sqrt(1.5),
                    to: Math.sqrt(1.5),
                  },
                  { k: "curve", f: PARA1, from: -1.3, to: 1.3 },
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  { k: "dot", at: [S1, S1], label: "P", place: "above-right" },
                  { k: "dot", at: [-S1, S1], label: "Q", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`根号のまま微分すると式が重い。$A^{2}$（さらに $u=s^{2}$）に直すと、ただの分数関数の最小問題になる。`,
            String.raw`最小を与える $s=\dfrac{1}{\sqrt2}$ が $0<s<1$ の内部にあることを確かめる。端での値と比べる必要はない。`,
          ],
          check: String.raw`$s=\dfrac{1}{\sqrt2}$ で $A=\sqrt3=1.73205$。$s=0.2$ では $3.53532$、$s=0.9$ では $1.80378$ で、どちらも $\sqrt3$ より大きい。$s$ を $20$ 万等分した全探索でも最小は $1.732050808$（$s=0.707105$）だった。`,
        },
      ],
    },
    {
      no: 2,
      field: "指数・対数",
      topics: ["常用対数", "桁数の評価", "不等式のはさみ", "指数の比較"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "多倍長整数で $5^{27}=7450580596923828125<10^{19}$、$5^{28}=37252902984619140625>10^{19}$ を直接確かめた",
          "$5^{27}+4^{27}=7468594995433310109<10^{19}$、$5^{28}+4^{28}>10^{19}$ を直接確かめ、最小の $n$ も $m$ も $28$ であることを確かめた",
          "$\\left(\\frac45\\right)^{9}=\\frac{262144}{1953125}<\\frac14$ と $\\frac{5^{28}}{4}<10^{19}$ を有理数のまま確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$5^{n}>10^{19}$ となる最小の自然数 $n$ を求める`,
          answer: String.raw`$n=28$`,
          approach: String.raw`両辺の常用対数をとると $n\log_{10}5>19$ になる。$\log_{10}5=1-\log_{10}2$ なので、与えられた $\log_{10}2$ の評価がそのまま使える。$n=27$ と $n=28$ の2つを押さえれば終わる。`,
          blocks: [
            { k: "p", t: String.raw`$\log_{10}5=1-\log_{10}2$ で、$0.3<\log_{10}2<0.31$ より` },
            { k: "math", t: String.raw`0.69<\log_{10}5<0.7` },
            { k: "p", t: String.raw`である。$5^{n}>10^{19}$ は $n\log_{10}5>19$ と同値である。` },
            {
              k: "steps",
              items: [
                String.raw`$n=27$：$27\log_{10}5<27\times0.7=18.9<19$ なので $5^{27}<10^{19}$。`,
                String.raw`$n=28$：$28\log_{10}5>28\times0.69=19.32>19$ なので $5^{28}>10^{19}$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`$5^{n}$ は $n$ について増加するから、$5^{n}>10^{19}$ となる最小の自然数は $n=28$ である。`,
            },
          ],
          check: String.raw`実際に計算すると $5^{27}=7450580596923828125$（$7.45\times10^{18}$）で $10^{19}$ より小さく、$5^{28}=37252902984619140625$（$3.73\times10^{19}$）で大きい。`,
        },
        {
          label: "(2)",
          task: String.raw`$5^{m}+4^{m}>10^{19}$ となる最小の自然数 $m$ を求める`,
          answer: String.raw`$m=28$`,
          approach: String.raw`$5^{m}+4^{m}>5^{m}$ なので、(1) から $m\le28$ はすぐ分かる。残るのは「$m=27$ では足りない」ことで、$4^{27}$ が $5^{27}$ に比べてどれくらい小さいかを押さえればよい。$\left(\frac45\right)^{9}<\frac14$ が使える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$5^{28}+4^{28}>5^{28}>10^{19}$ は (1) から従うので、$m=28$ は条件をみたす。あとは $m=27$ では足りないことを示せばよい。`,
            },
            { k: "p", t: String.raw`$\left(\dfrac45\right)^{9}=\dfrac{4^{9}}{5^{9}}=\dfrac{262144}{1953125}$ で、$4\times262144=1048576<1953125$ だから` },
            { k: "math", t: String.raw`\left(\frac45\right)^{9}<\frac14` },
            { k: "p", t: String.raw`である。$0<\dfrac45<1$ なので $27>9$ より $\left(\dfrac45\right)^{27}<\left(\dfrac45\right)^{9}<\dfrac14$、すなわち` },
            { k: "math", t: String.raw`4^{27}<\frac{5^{27}}{4}` },
            { k: "p", t: String.raw`が成り立つ。したがって` },
            {
              k: "math",
              t: String.raw`5^{27}+4^{27}<5^{27}+\frac{5^{27}}{4}=\frac54\cdot5^{27}=\frac{5^{28}}{4}`,
            },
            { k: "p", t: String.raw`である。右辺の常用対数は` },
            {
              k: "math",
              t: String.raw`\log_{10}\frac{5^{28}}{4}=28\log_{10}5-2\log_{10}2=28-30\log_{10}2<28-30\times0.3=19`,
            },
            {
              k: "p",
              t: String.raw`なので $\dfrac{5^{28}}{4}<10^{19}$、よって $5^{27}+4^{27}<10^{19}$ である。$5^{m}+4^{m}$ は $m$ について増加するから、求める最小の自然数は $m=28$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$5^{m}+4^{m}<2\cdot5^{m}$ という粗い評価では足りない。$\log_{10}\left(2\cdot5^{27}\right)=27-26\log_{10}2<19.2$ までしか言えず、$19$ を切れない。$4^{27}$ が $5^{27}$ の $\dfrac14$ より小さいところまで詰める必要がある。`,
            String.raw`$\left(\dfrac45\right)^{3}=\dfrac{64}{125}$ は $\dfrac12$ より大きいので、3乗で止めると足りない。9乗まで進めると $\dfrac14$ を切る。`,
          ],
          check: String.raw`$5^{27}+4^{27}=7468594995433310109$ で、$10^{19}$ より小さい。$\dfrac{5^{28}}{4}=9313225746154785156.25$ もたしかに $10^{19}$ 未満である。`,
        },
      ],
    },
    {
      no: 3,
      field: "図形と方程式",
      topics: ["正接の加法定理", "2倍角の公式", "3次方程式", "三角形の面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$p$ を $0.001$ 刻みで動かし、$q$ の式から $\\mathrm{Q}$ を決めて $\\angle\\mathrm{OAP}$ と $\\angle\\mathrm{PMQ}$ を内積から直接計算すると、$999$ 点すべてで一致することを確かめた",
          "$p=\\frac{\\sqrt7-2}{3}=0.21525$ のとき $q=0.33333$ になることを確かめた",
          "$S>T$ となる $p$ を $0.001$ 刻みで全探索すると $0.001$ から $0.774$ までになり、$\\frac{\\sqrt{15}}{5}=0.7746$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$q$ を $p$ で表す`,
          answer: String.raw`$q=\dfrac{p\left(3-p^{2}\right)}{2\left(1-p^{2}\right)}$`,
          approach: String.raw`$\mathrm{M}$ は $\mathrm{AP}$ の中点なので、半直線 $\mathrm{MP}$ は半直線 $\mathrm{AP}$ と同じ向きである。だから $\angle\mathrm{PMQ}$ は「直線 $\mathrm{AP}$ と直線 $\mathrm{MQ}$ のなす角」で、$x$ 軸との傾きで測れる。$\tan$ で書き直すと、2倍角の公式がそのまま出てくる形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha=\angle\mathrm{OAP}$ とおく。$\mathrm{A}(0,1)$、$\mathrm{O}(0,0)$、$\mathrm{P}(p,0)$ で $\angle\mathrm{AOP}=90^\circ$ だから`,
            },
            { k: "math", t: String.raw`\tan\alpha=\frac{\mathrm{OP}}{\mathrm{OA}}=p` },
            {
              k: "p",
              t: String.raw`である。$0<p<1$ より $0<\alpha<45^\circ$ である。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{M}\left(\dfrac p2,\dfrac12\right)$ は $\mathrm{AP}$ の中点なので、半直線 $\mathrm{MP}$ は半直線 $\mathrm{AP}$ と同じ向きである。直線 $\mathrm{AP}$ が $x$ 軸の正の向きとなす角は、傾きが $-\dfrac1p$ なので $180^\circ-\beta$（$\tan\beta=\dfrac1p$）と書ける。いっぽう直線 $\mathrm{MQ}$ は $\mathrm{M}$ から $\mathrm{Q}(q,0)$ へ下る向きで、$x$ 軸の正の向きとなす角は $-\gamma$（$\tan\gamma=\dfrac{\frac12}{q-\frac p2}=\dfrac{1}{2q-p}$）である。`,
            },
            { k: "p", t: String.raw`$\mathrm{M}$ を頂点として測ると` },
            { k: "math", t: String.raw`\angle\mathrm{PMQ}=\beta-\gamma` },
            {
              k: "p",
              t: String.raw`である（$q>p$ より $2q-p>p$ なので $\tan\gamma<\tan\beta$、すなわち $\gamma<\beta$）。また $\tan\beta=\dfrac1p=\dfrac{1}{\tan\alpha}$ だから $\beta=90^\circ-\alpha$ である。条件 $\angle\mathrm{OAP}=\angle\mathrm{PMQ}$ は`,
            },
            { k: "math", t: String.raw`\alpha=\left(90^\circ-\alpha\right)-\gamma,\qquad \gamma=90^\circ-2\alpha` },
            { k: "p", t: String.raw`となる。よって` },
            {
              k: "math",
              t: String.raw`\frac{1}{2q-p}=\tan\gamma=\tan\left(90^\circ-2\alpha\right)=\frac{1}{\tan2\alpha}`,
            },
            { k: "p", t: String.raw`すなわち $2q-p=\tan2\alpha$ である。2倍角の公式から` },
            { k: "math", t: String.raw`\tan2\alpha=\frac{2\tan\alpha}{1-\tan^{2}\alpha}=\frac{2p}{1-p^{2}}` },
            { k: "p", t: String.raw`（$0<p<1$ より分母は正）なので` },
            {
              k: "math",
              t: String.raw`q=\frac12\left(p+\frac{2p}{1-p^{2}}\right)=\frac{p\left(1-p^{2}\right)+2p}{2\left(1-p^{2}\right)}=\frac{p\left(3-p^{2}\right)}{2\left(1-p^{2}\right)}`,
            },
            {
              k: "p",
              t: String.raw`を得る。このとき $\dfrac qp=\dfrac{3-p^{2}}{2\left(1-p^{2}\right)}>1$（$3-p^{2}>2-2p^{2}$ は $p^{2}>-1$ と同値）なので、条件 $p<q$ も自動的にみたされる。`,
            },
            {
              k: "figure",
                fig: {
                caption: String.raw`$p=\frac12$ のときの配置。$\mathrm{M}$ は $\mathrm{AP}$ の中点で、$\angle\mathrm{OAP}$ と $\angle\mathrm{PMQ}$（網かけ）が等しくなるように $\mathrm{Q}$ が決まる。このとき $q=\frac{11}{12}$。`,
                view: [-0.3, 1.35, -0.3, 1.3],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fill", pts: [[0, 0], [0, 1], [P3, 0]] },
                  { k: "fill", pts: [[P3, 0], [P3 / 2, 0.5], [Q3, 0]] },
                  { k: "seg", a: [0, 1], b: [P3, 0] },
                  { k: "seg", a: [0, 0], b: [0, 1] },
                  { k: "seg", a: [P3 / 2, 0.5], b: [Q3, 0] },
                  { k: "seg", a: [0, 0], b: [1.25, 0], faint: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [0, 1], label: "A", place: "above-left" },
                  { k: "dot", at: [P3, 0], label: "P", place: "below" },
                  { k: "dot", at: [Q3, 0], label: "Q", place: "below-right" },
                  { k: "dot", at: [P3 / 2, 0.5], label: "M", place: "right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\angle\mathrm{PMQ}$ の $\mathrm{MP}$ 側は、$\mathrm{M}$ から $\mathrm{P}$ へ向かう向きである。$\mathrm{A}$ から $\mathrm{P}$ へ向かう向きと同じなので、直線 $\mathrm{AP}$ の傾きがそのまま使える。`,
            String.raw`$\beta=90^\circ-\alpha$ に気づくと、条件が $\gamma=90^\circ-2\alpha$ という素直な形になり、2倍角の公式につながる。`,
          ],
          check: String.raw`$p=\dfrac12$ なら $q=\dfrac{\frac12\cdot\frac{11}{4}}{2\cdot\frac34}=\dfrac{11}{12}=0.9167$。$\mathrm{M}\left(\dfrac14,\dfrac12\right)$ として内積から角を計算すると、$\angle\mathrm{OAP}=\angle\mathrm{PMQ}=0.46365$ ラジアンで一致する。$p$ を $0.001$ 刻みで $999$ 点調べても例外はなかった。`,
        },
        {
          label: "(2)",
          task: String.raw`$q=\dfrac13$ となる $p$ の値を求める`,
          answer: String.raw`$p=\dfrac{\sqrt7-2}{3}$`,
          approach: String.raw`(1) の式を代入して分母を払うと $p$ の3次方程式になる。範囲外の整数解 $p=2$ が見つかるので、そこで因数分解できる。`,
          blocks: [
            { k: "p", t: String.raw`$\dfrac{p\left(3-p^{2}\right)}{2\left(1-p^{2}\right)}=\dfrac13$ の分母を払うと` },
            {
              k: "math",
              t: String.raw`3p\left(3-p^{2}\right)=2\left(1-p^{2}\right)\iff 3p^{3}-2p^{2}-9p+2=0`,
            },
            { k: "p", t: String.raw`となる。$p=2$ を代入すると $24-8-18+2=0$ なので $p-2$ で割り切れて` },
            { k: "math", t: String.raw`(p-2)\left(3p^{2}+4p-1\right)=0` },
            { k: "p", t: String.raw`である。$0<p<1$ より $p=2$ は不適。$3p^{2}+4p-1=0$ を解くと` },
            { k: "math", t: String.raw`p=\frac{-2\pm\sqrt7}{3}` },
            {
              k: "p",
              t: String.raw`で、$\sqrt7=2.64\ldots$ より正の解は $p=\dfrac{\sqrt7-2}{3}=0.215\ldots$ である。これは $0<p<1$ をみたすので、これが答えである。`,
            },
          ],
          check: String.raw`$p=\dfrac{\sqrt7-2}{3}=0.2152504$ を (1) の式に入れると $q=0.3333333$ となり、$\dfrac13$ と一致する。`,
        },
        {
          label: "(3)",
          task: String.raw`$\triangle\mathrm{OAP}=S$、$\triangle\mathrm{PMQ}=T$ とするとき、$S>T$ となる $p$ の範囲を求める`,
          answer: String.raw`$0<p<\dfrac{\sqrt{15}}{5}$`,
          approach: String.raw`どちらの三角形も底辺が $x$ 軸上にあるので、面積は「底辺 × 高さ ÷ 2」ですぐ書ける。$\mathrm{M}$ の高さが $\dfrac12$ で固定なのがポイントで、$S>T$ は $q<3p$ という単純な条件になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\triangle\mathrm{OAP}$ は $\mathrm{O}$ で直角なので $S=\dfrac12\cdot\mathrm{OP}\cdot\mathrm{OA}=\dfrac p2$ である。$\triangle\mathrm{PMQ}$ は底辺 $\mathrm{PQ}$ が $x$ 軸上にあり長さ $q-p$、高さは $\mathrm{M}$ の $y$ 座標 $\dfrac12$ だから`,
            },
            { k: "math", t: String.raw`T=\frac12(q-p)\cdot\frac12=\frac{q-p}{4}` },
            { k: "p", t: String.raw`である。よって` },
            { k: "math", t: String.raw`S>T\iff \frac p2>\frac{q-p}{4}\iff 2p>q-p\iff q<3p` },
            { k: "p", t: String.raw`となる。(1) の式を代入し、$p>0$ で割ると` },
            {
              k: "math",
              t: String.raw`\frac{3-p^{2}}{2\left(1-p^{2}\right)}<3`,
            },
            { k: "p", t: String.raw`である。$0<p<1$ より $1-p^{2}>0$ なので、分母を払って` },
            {
              k: "math",
              t: String.raw`3-p^{2}<6-6p^{2}\iff 5p^{2}<3\iff p<\sqrt{\frac35}=\frac{\sqrt{15}}{5}`,
            },
            {
              k: "p",
              t: String.raw`を得る。$\dfrac{\sqrt{15}}{5}=0.774\ldots<1$ なので、$0<p<1$ とあわせて求める範囲は $0<p<\dfrac{\sqrt{15}}{5}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$\triangle\mathrm{PMQ}$ の高さは $\mathrm{M}$ の $y$ 座標 $\dfrac12$ で、$p$ によらない。$\mathrm{M}$ が $\mathrm{AP}$ の中点で $\mathrm{A}$ の高さが $1$ だからである。`,
            String.raw`$1-p^{2}>0$ を確かめてから分母を払う。$p>1$ なら不等号の向きが変わるが、ここでは $0<p<1$ なので心配ない。`,
          ],
          check: String.raw`$p=0.5$ なら $S=0.25$、$q=\dfrac{11}{12}$ より $T=\dfrac{11/12-1/2}{4}=\dfrac{5}{48}=0.104$ で $S>T$。$p=0.8>\dfrac{\sqrt{15}}{5}$ では $q=\dfrac{0.8\times2.36}{2\times0.36}=2.622$、$T=\dfrac{1.822}{4}=0.456>S=0.4$ となり逆転する。$0.001$ 刻みの全探索でも境目は $0.774$ と $0.775$ のあいだだった。`,
        },
      ],
    },
    {
      no: 4,
      field: "確率・場合の数",
      topics: ["円に内接する多角形", "余事象", "組合せ", "半円に収まる条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-11",
      review: {
        sourceChecked: true,
        verified: [
          "$n=5,7,9,11,13,15,21$ について、$ {}_{n}\\mathrm{C}_{4}$ 通りの4点すべてを列挙し、偏角の最大の隙間が $\\pi$ 未満かどうかで判定して確率を分数のまま求め、$\\frac{n+1}{2(n-2)}$ と完全に一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`選んだ4点を頂点とする四角形が $\mathrm{O}$ を内部に含む確率 $p_n$ を求める`,
          answer: String.raw`$p_n=\dfrac{n+1}{2(n-2)}$`,
          approach: String.raw`「中心を内部に含む」より「含まない」のほうが数えやすい。円に内接する多角形が中心を内部に含まないのは、4点が半円（中心を通る直線の片側）にまとめて乗っているときである。$n$ が奇数なので対頂の点が存在せず、その数え方が重複なく進む。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正 $n$ 角形の頂点に、円周に沿って $0,1,\dots,n-1$ と番号をつける。$n=2k+1$（$k\ge2$）とおく。`,
            },
            {
              k: "p",
              t: String.raw`円周上の4点を頂点とする四角形が中心 $\mathrm{O}$ を内部に含まないのは、4点が $\mathrm{O}$ を通るある直線の片側（境界を含む半円）にすべて乗っているときである。言いかえると、4点を円周順に並べたときにできる4つの弧のうち、いちばん大きいものが半円以上になるときである。`,
            },
            {
              k: "p",
              t: String.raw`$n$ は奇数なので、頂点どうしを結ぶ線分が中心を通ることはなく、半円にちょうど収まる4点の集まりは「連続する $k+1$ 個の頂点の中に入っているもの」と一致する。実際、頂点どうしの間隔は $\dfrac{2\pi}{n}$ で、長さ $\pi$ の弧は $k+\dfrac12$ 間隔ぶんなので、半円に入る頂点は最大 $k+1$ 個である。`,
            },
            {
              k: "p",
              t: String.raw`そこで、半円に収まる4点の組を「いちばん反時計回り側の点」で分類する。その点を $v$ とすると、残りの3点は $v$ から時計回りに続く $k$ 個の頂点から選ぶことになるので $ {}_{k}\mathrm{C}_{3}$ 通り。$v$ の選び方は $n$ 通りで、どの組も $v$ がただ1つに定まるため重複はない。よって $\mathrm{O}$ を含まない選び方は`,
            },
            { k: "math", t: String.raw`n\cdot{}_{k}\mathrm{C}_{3}\ \text{通り}` },
            { k: "p", t: String.raw`である。全体は $ {}_{n}\mathrm{C}_{4}$ 通りだから` },
            {
              k: "math",
              t: String.raw`1-p_n=\frac{n\cdot{}_{k}\mathrm{C}_{3}}{{}_{n}\mathrm{C}_{4}}=\frac{n\cdot\frac{k(k-1)(k-2)}{6}}{\frac{n(n-1)(n-2)(n-3)}{24}}=\frac{4k(k-1)(k-2)}{(n-1)(n-2)(n-3)}`,
            },
            { k: "p", t: String.raw`となる。$n=2k+1$ より $n-1=2k$、$n-2=2k-1$、$n-3=2(k-1)$ なので` },
            {
              k: "math",
              t: String.raw`1-p_n=\frac{4k(k-1)(k-2)}{2k\cdot(2k-1)\cdot2(k-1)}=\frac{k-2}{2k-1}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`p_n=1-\frac{k-2}{2k-1}=\frac{k+1}{2k-1}`,
            },
            { k: "p", t: String.raw`となる。$k=\dfrac{n-1}{2}$ を戻すと $k+1=\dfrac{n+1}{2}$、$2k-1=n-2$ なので` },
            { k: "math", t: String.raw`p_n=\frac{n+1}{2(n-2)}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
                fig: {
                caption: String.raw`$n=9$ のとき、連続する4頂点を選んだ場合。4点がすべて半円に収まるので、四角形は中心 $\mathrm{O}$ を内部に含まない。$ {}_{9}\mathrm{C}_{4}=126$ 通りのうち、こうなるのは $9\times{}_{4}\mathrm{C}_{3}=36$ 通り。`,
                view: [-1.45, 1.45, -1.3, 1.3],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number) => [Math.cos(t), Math.sin(t)] as [number, number],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  ...Array.from({ length: 9 }, (_, j) => ({
                    k: "seg" as const,
                    a: V9(j),
                    b: V9((j + 1) % 9),
                    faint: true,
                    dash: true,
                  })),
                  { k: "fill", pts: [V9(0), V9(1), V9(2), V9(3)] },
                  { k: "seg", a: V9(0), b: V9(1) },
                  { k: "seg", a: V9(1), b: V9(2) },
                  { k: "seg", a: V9(2), b: V9(3) },
                  { k: "seg", a: V9(3), b: V9(0) },
                  { k: "dot", at: [0, 0], label: "O", place: "below-right" },
                  { k: "dot", at: V9(0) },
                  { k: "dot", at: V9(1) },
                  { k: "dot", at: V9(2) },
                  { k: "dot", at: V9(3) },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$n$ が奇数であることが効いている。偶数だと向かい合う頂点が存在し、半円の境界に2点が乗る場合が出て、「いちばん反時計回り側の点」での分類に重複が生じる。`,
            String.raw`$k=2$（$n=5$）では $ {}_{2}\mathrm{C}_{3}=0$ で、$\mathrm{O}$ を含まない選び方が1つもない。正五角形から4点選ぶとどう選んでも中心を含む、という事実と合う。`,
          ],
          check: String.raw`$n=5$ では $p_5=\dfrac{6}{6}=1$、$n=7$ では $\dfrac{8}{10}=\dfrac45$、$n=9$ では $\dfrac{10}{14}=\dfrac57$。$ {}_{n}\mathrm{C}_{4}$ 通りをすべて列挙して「偏角の最大の隙間が $\pi$ 未満か」で判定すると、$n=5,7,9,11,13,15,21$ のすべてで分数として一致した。`,
        },
      ],
    },
  ],
};
