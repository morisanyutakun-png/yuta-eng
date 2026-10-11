import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2020年度（令和2年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第3問は文系の第4問、第5問は文系の第5問とまったく同じ問題なので、
 * 解説もそちらと同じ内容を置いている（第5問には問題冊子にマス目の例の図が
 * 付いているが、こちらでは一切再現していない）。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第1問の図。3解は正三角形をなす。 */
const A1 = Math.pow(2, -1 / 3);
const R1A: [number, number] = [-2 * A1, 0];
const R1B: [number, number] = [-A1 / 2, (A1 * Math.sqrt(3)) / 2];
const R1C: [number, number] = [-A1 / 2, -(A1 * Math.sqrt(3)) / 2];

/** 第3問の図。a-b に垂直な平面で切った断面に現れる点（文系第4問と同じ）。 */
const KK = (3 * Math.SQRT2 - Math.sqrt(6)) / 8;
const CY = -1 / Math.SQRT2;
const CZ = 1 / Math.SQRT2;
const DY = (2 * KK) / Math.sqrt(3);
const DZ = 1 / Math.SQRT2 + (2 * KK) / Math.sqrt(3);
const MY = Math.sqrt(3) / 2;

/** 第6問の図。x = X での断面（円環）の内半径と外半径。 */
const L2 = Math.log(2);
const INR = (x: number) => Math.sqrt(Math.log(1 + Math.abs(x)));
const OUTR = (x: number) => Math.sqrt(1 + L2 - x * x);

export const kyodaiRikei2020: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2020,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "複素数平面",
      topics: ["解と係数の関係", "正三角形", "平行移動", "3乗根"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$a=\\frac{\\sqrt[3]4}{2}=0.793701$、$b=\\frac{3\\sqrt[3]2}{2}=1.889882$ として3解 $-\\sqrt[3]4$、$\\frac{\\sqrt[3]4}{4}\\left(-1\\pm\\sqrt3i\\right)$ から多項式を組み立てると、係数が $1,\\,3a,\\,b,\\,1$ に一致することを確かめた",
          "3解の相互の距離がすべて $1.374729637=\\sqrt3\\,a$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$z^{3}+3az^{2}+bz+1=0$（$a>0$、$a,b$ 実数）の3解が一辺 $\sqrt3\,a$ の正三角形の頂点になるとき、$a,b$ と3解を求める`,
          answer: String.raw`$a=\dfrac{\sqrt[3]4}{2}$、$b=\dfrac{3\sqrt[3]2}{2}$、3解は $-\sqrt[3]4$ と $\dfrac{\sqrt[3]4}{4}\left(-1\pm\sqrt3\,i\right)$`,
          approach: String.raw`3解の和が $-3a$ なので重心は $-a$ である。重心を原点に移すと「和が $0$ の正三角形」になり、$w^{3}=$ 定数 という形の方程式の3解になる。そこで $z=w-a$ と置き換えると、もとの方程式が $w^{3}=$ 定数 になるはずで、その条件から $a$ が決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`3解を $z_1,z_2,z_3$ とすると、解と係数の関係より`,
            },
            {
              k: "math",
              t: String.raw`z_1+z_2+z_3=-3a,\qquad z_1z_2+z_2z_3+z_3z_1=b,\qquad z_1z_2z_3=-1`,
            },
            {
              k: "p",
              t: String.raw`である。重心は $\dfrac{z_1+z_2+z_3}{3}=-a$ で、正三角形の重心は外心でもあるから、3解は中心 $-a$、半径 $R$ の円周上に $120^\circ$ おきに並ぶ。一辺 $\sqrt3\,a$ の正三角形では（一辺）$=\sqrt3R$ なので $R=a$ である。`,
            },
            {
              k: "p",
              t: String.raw`**平行移動する。** $w=z+a$ とおくと、$w_k=z_k+a$ は絶対値 $a$ で偏角が $120^\circ$ ずつ違う3つの複素数だから、ある実数 $\theta$ を使って`,
            },
            {
              k: "math",
              t: String.raw`w_k=a\,e^{i\left(\theta+\frac{2k\pi}{3}\right)}\qquad(k=0,1,2)`,
            },
            { k: "p", t: String.raw`と書ける。このとき` },
            {
              k: "math",
              t: String.raw`w_0+w_1+w_2=0,\qquad w_0w_1+w_1w_2+w_2w_0=0,\qquad w_0w_1w_2=a^{3}e^{3i\theta}`,
            },
            {
              k: "p",
              t: String.raw`である（前2つは $1+\omega+\omega^{2}=0$ から）。つまり $w_0,w_1,w_2$ は $w^{3}=a^{3}e^{3i\theta}$ の3解である。`,
            },
            {
              k: "p",
              t: String.raw`**$a$ を決める。** $z_k=w_k-a$ なので`,
            },
            {
              k: "math",
              t: String.raw`z_1z_2z_3=\prod_{k}\left(w_k-a\right)=-\prod_{k}\left(a-w_k\right)=-\left(a^{3}-a^{3}e^{3i\theta}\right)`,
            },
            {
              k: "p",
              t: String.raw`である（$\prod(x-w_k)=x^{3}-a^{3}e^{3i\theta}$ に $x=a$ を代入した）。これが $-1$ に等しいので`,
            },
            {
              k: "math",
              t: String.raw`a^{3}\left(1-e^{3i\theta}\right)=1`,
            },
            {
              k: "p",
              t: String.raw`である。左辺が正の実数になるには $e^{3i\theta}$ が実数、つまり $e^{3i\theta}=\pm1$ でなければならない。$e^{3i\theta}=1$ だと左辺が $0$ になって不適だから $e^{3i\theta}=-1$ で`,
            },
            {
              k: "math",
              t: String.raw`2a^{3}=1\quad\Longrightarrow\quad a=\frac{1}{\sqrt[3]2}=\frac{\sqrt[3]4}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**解を書き下す。** $e^{3i\theta}=-1$ より $\theta=\dfrac\pi3$ ととってよい（他の $\theta$ は3解の入れ替えになるだけ）。このとき`,
            },
            {
              k: "math",
              t: String.raw`w_0=a\,e^{i\frac\pi3},\quad w_1=a\,e^{i\pi}=-a,\quad w_2=a\,e^{i\frac{5\pi}3}`,
            },
            { k: "p", t: String.raw`なので、$z_k=w_k-a$ は` },
            {
              k: "math",
              t: String.raw`z=-2a,\qquad z=-\frac a2\pm\frac{\sqrt3}{2}a\,i`,
            },
            { k: "p", t: String.raw`である。$a=\dfrac{\sqrt[3]4}{2}$ を入れると` },
            {
              k: "math",
              t: String.raw`z=-\sqrt[3]4,\qquad z=\frac{\sqrt[3]4}{4}\left(-1\pm\sqrt3\,i\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$b$。** $z_2+z_3=-a$、$z_2z_3=\dfrac{a^{2}}4+\dfrac{3a^{2}}4=a^{2}$（$z_1=-2a$ とした）なので`,
            },
            {
              k: "math",
              t: String.raw`b=z_1\left(z_2+z_3\right)+z_2z_3=(-2a)(-a)+a^{2}=3a^{2}=3\cdot\frac{\sqrt[3]{16}}{4}=\frac{3\sqrt[3]2}{2}`,
            },
            {
              k: "p",
              t: String.raw`である（$a^{2}=2^{-2/3}=\dfrac{\sqrt[3]2}{2}$）。$b$ は実数なので、題意にも合っている。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`3解の位置。重心（$=$ 外心）は $-a=-0.794$ で、$-\sqrt[3]4=-1.587$ と $\frac{\sqrt[3]4}{4}\left(-1\pm\sqrt3i\right)=-0.397\pm0.687i$ が一辺 $\sqrt3\,a=1.375$ の正三角形をなす。`,
                view: [-2.15, 0.55, -1.15, 1.15],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: R1A, b: R1B },
                  { k: "seg", a: R1B, b: R1C },
                  { k: "seg", a: R1C, b: R1A },
                  { k: "dot", at: R1A, label: "-∛4", place: "left" },
                  { k: "dot", at: R1B, label: "z", place: "above-right" },
                  { k: "dot", at: R1C, label: "z の共役", place: "below-right" },
                  { k: "dot", at: [-A1, 0], label: "重心 -a", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「一辺 $s$ の正三角形の外接円の半径は $\dfrac{s}{\sqrt3}$」である。$s=\sqrt3\,a$ なので $R=a$ となり、$a$ が2つの意味（係数と半径）をもつのがこの問題の仕掛けである。`,
            String.raw`$w=z+a$ と平行移動すると、$w$ の3つの値が $w^{3}=$ 定数 の解になる。これに気づけば積の条件だけで $a$ が決まる。`,
            String.raw`$a>0$ と「$b$ が実数」から $e^{3i\theta}=-1$ に絞る。$e^{3i\theta}=1$ は $a^{3}\cdot0=1$ となって不可能である。`,
            String.raw`$\theta$ の取り方は3通りあるが、3解の集合は同じになる。どれを選んでも答えは変わらない。`,
          ],
          check: String.raw`$a=0.793701$、$b=1.889882$ として3解 $-1.587401$、$-0.396850\pm0.687364i$ から多項式を組み立てると、係数は $1,\,2.381102,\,1.889882,\,1$ となり、$3a=2.381102$、$b=1.889882$ と一致する。3解の相互の距離はすべて $1.374730=\sqrt3\,a$ である。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列・極限",
      topics: ["対称式の漸化式", "偶奇", "sin の周期", "はさみうち"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$p=1,2,3,5$ について $s_n=\\alpha^{n}+\\beta^{n}$ を漸化式 $s_{n+1}=2ps_n+s_{n-1}$ で計算すると、$n\\le40$ ですべて偶数の整数になり、$\\alpha^{n}+\\beta^{n}$ の数値とも一致することを確かめた",
          "恒等式 $\\sin\\left(\\alpha^{n}\\pi\\right)=-(-1)^{n}\\sin\\frac{\\pi}{\\alpha^{n}}$ を $n\\le8$ で数値的に確かめた",
          "$-\\alpha^{n}\\sin\\frac{\\pi}{\\alpha^{n}}$ が $n=10,20,40$ で $-3.141592654$ になることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`すべての正の整数 $n$ に対し $\alpha^{n}+\beta^{n}$ が偶数の整数であることを示す`,
          answer: String.raw`$s_n=\alpha^{n}+\beta^{n}$ は $s_{n+1}=2ps_n+s_{n-1}$、$s_0=2$、$s_1=2p$ をみたすので、帰納法で整数かつ偶数`,
          approach: String.raw`対称式なので、解と係数の関係から漸化式が立つ。$\alpha,\beta$ が $x^{2}=2px+1$ をみたすことを使えば、2項間ならぬ3項間の漸化式が出る。初項2つが偶数なら、漸化式の形から全部偶数になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`解と係数の関係より $\alpha+\beta=2p$、$\alpha\beta=-1$ である。$s_n=\alpha^{n}+\beta^{n}$ とおく。$\alpha,\beta$ は $x^{2}=2px+1$ をみたすので、両辺に $x^{n-1}$ を掛けて足すと`,
            },
            {
              k: "math",
              t: String.raw`s_{n+1}=2p\,s_n+s_{n-1}\qquad(n\ge1)`,
            },
            { k: "p", t: String.raw`である。また` },
            { k: "math", t: String.raw`s_0=2,\qquad s_1=\alpha+\beta=2p` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**帰納法。** $s_0=2$、$s_1=2p$ はどちらも偶数の整数である。$s_{n-1},s_n$ が偶数の整数なら、$s_{n+1}=2ps_n+s_{n-1}$ も整数で、$2ps_n$ も $s_{n-1}$ も偶数だから $s_{n+1}$ も偶数である。よってすべての $n\ge0$ で $s_n$ は偶数の整数であり、とくに正の整数 $n$ について成り立つ。`,
            },
            {
              k: "note",
              t: String.raw`$p=1$ なら $s_n$ は $2,2,6,14,34,82,\dots$、$p=2$ なら $2,4,18,76,322,\dots$ である。どれも偶数になっている。`,
            },
          ],
          pitfalls: [
            String.raw`$s_0=2$ から始める。$s_1,s_2$ だけを初期値にすると、$s_2=\left(\alpha+\beta\right)^{2}-2\alpha\beta=4p^{2}+2$ を別に計算することになる（結果は同じ）。`,
            String.raw`漸化式の係数が $+1$（$s_{n-1}$ の符号）なのは $\alpha\beta=-1$ だからである。$x^{2}-2px-1=0$ の $-1$ を落とさない。`,
          ],
          check: String.raw`$p=1,2,3,5$ について漸化式で $s_n$ を計算すると $n\le40$ ですべて偶数の整数で、$\alpha^{n}+\beta^{n}$ の数値とも一致する。`,
        },
        {
          label: "(2)",
          task: String.raw`$\displaystyle\lim_{n\to\infty}(-\alpha)^{n}\sin\left(\alpha^{n}\pi\right)$ を求める`,
          answer: String.raw`$-\pi$`,
          approach: String.raw`$\alpha\beta=-1$ より $\beta^{n}=\dfrac{(-1)^{n}}{\alpha^{n}}$ である。(1) から $\alpha^{n}$ は「偶数の整数」から小さい数を引いた形になるので、$\sin\left(\alpha^{n}\pi\right)$ がその小さい数だけで書ける。あとは $\frac{\sin x}{x}\to1$ を使う。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\alpha\beta=-1$ より $\beta=-\dfrac1\alpha$ で、$|\alpha|>1$ だから $|\beta|<1$ である。実際 $\alpha=p+\sqrt{p^{2}+1}>1$、$\beta=p-\sqrt{p^{2}+1}\in(-1,0)$ である。`,
            },
            { k: "p", t: String.raw`(1) の $s_n$（偶数の整数）を使うと` },
            {
              k: "math",
              t: String.raw`\alpha^{n}=s_n-\beta^{n}=s_n-\frac{(-1)^{n}}{\alpha^{n}}`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\sin\left(\alpha^{n}\pi\right)=\sin\left(s_n\pi-\frac{(-1)^{n}\pi}{\alpha^{n}}\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$s_n$ は**偶数**だから $\sin\left(s_n\pi-x\right)=\sin(-x)=-\sin x$ である。さらに $\sin$ は奇関数なので`,
            },
            {
              k: "math",
              t: String.raw`\sin\left(\alpha^{n}\pi\right)=-\sin\frac{(-1)^{n}\pi}{\alpha^{n}}=-(-1)^{n}\sin\frac{\pi}{\alpha^{n}}`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`(-\alpha)^{n}\sin\left(\alpha^{n}\pi\right)=(-1)^{n}\alpha^{n}\cdot\left(-(-1)^{n}\right)\sin\frac{\pi}{\alpha^{n}}=-\alpha^{n}\sin\frac{\pi}{\alpha^{n}}`,
            },
            { k: "p", t: String.raw`となる。` },
            {
              k: "p",
              t: String.raw`**極限。** $\alpha>1$ より $\alpha^{n}\to\infty$、つまり $t_n=\dfrac{\pi}{\alpha^{n}}\to0$ である。`,
            },
            {
              k: "math",
              t: String.raw`-\alpha^{n}\sin\frac{\pi}{\alpha^{n}}=-\pi\cdot\frac{\sin t_n}{t_n}\xrightarrow[n\to\infty]{}-\pi`,
            },
            { k: "p", t: String.raw`である。したがって求める極限は` },
            { k: "math", t: String.raw`-\pi` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$s_n$ が**偶数**であることがここで効く。奇数だと $\sin\left(s_n\pi-x\right)=\sin x$ となって符号が変わり、極限は $+\pi$ になる。(1) は (2) のための準備である。`,
            },
          ],
          pitfalls: [
            String.raw`$\sin\left(\alpha^{n}\pi\right)$ を直接計算しようとしない。$\alpha^{n}$ は巨大になるが、整数部分が $\sin$ で消えることを使う。`,
            String.raw`$\sin\left(\frac{(-1)^{n}\pi}{\alpha^{n}}\right)=(-1)^{n}\sin\frac{\pi}{\alpha^{n}}$ は $\sin$ が奇関数だから。$(-1)^{n}$ を中に入れたまま放置しない。`,
            String.raw`最後は $\lim_{t\to0}\frac{\sin t}{t}=1$ の形に持ち込む。$\alpha^{n}=\frac{\pi}{t_n}$ と見る。`,
          ],
          check: String.raw`恒等式 $\sin\left(\alpha^{n}\pi\right)=-(-1)^{n}\sin\frac{\pi}{\alpha^{n}}$ は $p=1,2,3,5$、$n\le8$ で数値的に成り立つ。$-\alpha^{n}\sin\frac{\pi}{\alpha^{n}}$ は $n=10,20,40$ でいずれも $-3.141592654=-\pi$ になる。`,
        },
      ],
    },
    {
      no: 3,
      field: "空間ベクトル",
      topics: ["内積", "対称性", "単位球面", "2次方程式"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$k=\\frac{3\\sqrt2-\\sqrt6}{8}=0.224143868$ として座標を作ると、$|\\vec a|=|\\vec b|=|\\vec c|=|\\vec d|=1$、$\\vec a\\cdot\\vec b=\\vec c\\cdot\\vec d=0.5$、$\\vec a\\cdot\\vec c=\\vec b\\cdot\\vec c=-0.612372436=-\\frac{\\sqrt6}{4}$、$\\vec a\\cdot\\vec d=\\vec b\\cdot\\vec d=0.224143868=k$ となり、条件をすべてみたすことを確かめた",
          "$16k^{2}+4\\sqrt6\\,k-3=0$ が成り立つことを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`単位球面上の4点が与えられた内積の関係をみたすとき、$k=\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OD}}=\overrightarrow{\mathrm{OB}}\cdot\overrightarrow{\mathrm{OD}}$ を求める`,
          answer: String.raw`$k=\dfrac{3\sqrt2-\sqrt6}{8}$`,
          approach: String.raw`$\vec c$ も $\vec d$ も $\vec a,\vec b$ と**同じ**内積をもつので、どちらも $\vec a-\vec b$ と直交する。つまり $\vec c,\vec d$ は $\vec a-\vec b$ に垂直な平面の中にある。この平面を座標平面にとってしまえば、あとは平面上の単位ベクトル2本の話になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a,\vec b,\vec c,\vec d$ を $\overrightarrow{\mathrm{OA}},\dots,\overrightarrow{\mathrm{OD}}$ とする。すべて単位ベクトルである。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec c,\vec d$ は $\vec a-\vec b$ に垂直。** 条件より $\vec a\cdot\vec c=\vec b\cdot\vec c$ なので`,
            },
            {
              k: "math",
              t: String.raw`\left(\vec a-\vec b\right)\cdot\vec c=0,\qquad\text{同様に}\quad\left(\vec a-\vec b\right)\cdot\vec d=0`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**座標を置く。** $\left|\vec a-\vec b\right|^{2}=1+1-2\cdot\dfrac12=1$ なので $\vec f=\vec a-\vec b$ は単位ベクトルである。また $\vec e=\dfrac{\vec a+\vec b}{\left|\vec a+\vec b\right|}$ とおくと $\left|\vec a+\vec b\right|^{2}=3$ より $\vec e=\dfrac{\vec a+\vec b}{\sqrt3}$ で、$\vec e\cdot\vec f=0$ である。$\vec f,\vec e$ と、両方に垂直な単位ベクトル $\vec g$ を座標軸にとると`,
            },
            {
              k: "math",
              t: String.raw`\vec a=\left(\frac12,\;\frac{\sqrt3}{2},\;0\right),\qquad\vec b=\left(-\frac12,\;\frac{\sqrt3}{2},\;0\right)`,
            },
            {
              k: "p",
              t: String.raw`であり、$\vec c,\vec d$ は第1成分が $0$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec c$ を決める。** $\vec c=(0,c_2,c_3)$、$c_2^{2}+c_3^{2}=1$ である。$\vec a\cdot\vec c=\dfrac{\sqrt3}{2}c_2=-\dfrac{\sqrt6}{4}$ より`,
            },
            {
              k: "math",
              t: String.raw`c_2=-\frac{\sqrt6}{4}\cdot\frac{2}{\sqrt3}=-\frac{1}{\sqrt2},\qquad c_3=\pm\frac{1}{\sqrt2}`,
            },
            {
              k: "p",
              t: String.raw`である。$\vec g$ の向きを選んで $c_3=\dfrac{1}{\sqrt2}$ としてよい。`,
            },
            {
              k: "p",
              t: String.raw`**$\vec d$ を決める。** $\vec d=(0,d_2,d_3)$ で、$\vec a\cdot\vec d=\dfrac{\sqrt3}{2}d_2=k$ より $d_2=\dfrac{2k}{\sqrt3}$ である。$\vec c\cdot\vec d=\dfrac12$ より`,
            },
            {
              k: "math",
              t: String.raw`-\frac{1}{\sqrt2}\cdot\frac{2k}{\sqrt3}+\frac{1}{\sqrt2}d_3=\frac12\quad\Longrightarrow\quad d_3=\frac{1}{\sqrt2}+\frac{2k}{\sqrt3}`,
            },
            { k: "p", t: String.raw`である。$\left|\vec d\right|=1$ に入れると` },
            {
              k: "math",
              t: String.raw`\frac{4k^{2}}{3}+\left(\frac{1}{\sqrt2}+\frac{2k}{\sqrt3}\right)^{2}=1`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`\frac{8k^{2}}{3}+\frac{4k}{\sqrt6}-\frac12=0\quad\Longleftrightarrow\quad16k^{2}+4\sqrt6\,k-3=0`,
            },
            { k: "p", t: String.raw`である。解くと` },
            {
              k: "math",
              t: String.raw`k=\frac{-4\sqrt6\pm\sqrt{96+192}}{32}=\frac{-4\sqrt6\pm12\sqrt2}{32}=\frac{-\sqrt6\pm3\sqrt2}{8}`,
            },
            { k: "p", t: String.raw`で、$k>0$ より` },
            { k: "math", t: String.raw`k=\frac{3\sqrt2-\sqrt6}{8}` },
            { k: "p", t: String.raw`である（$0.2241$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$\vec a-\vec b$ に垂直な平面で切った断面。横軸が $\vec e=\frac{\vec a+\vec b}{\sqrt3}$ の向き。$\vec c,\vec d$ はこの平面内の単位ベクトルで、$\vec a,\vec b$ はどちらも点 $\mathrm{M}\left(\frac{\sqrt3}{2},0\right)$ に射影される。$\vec c$ と $\vec d$ のなす角は $60^\circ$。`,
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
                  { k: "seg", a: [0, 0], b: [CY, CZ] },
                  { k: "seg", a: [0, 0], b: [DY, DZ] },
                  { k: "seg", a: [0, 0], b: [MY, 0], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [CY, CZ], label: "c", place: "above-left" },
                  { k: "dot", at: [DY, DZ], label: "d", place: "above-right" },
                  { k: "dot", at: [MY, 0], label: "M", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\vec a\cdot\vec c=\vec b\cdot\vec c$ を「$\vec c$ が $\vec a,\vec b$ と同じ角をなす」で止めず、$\left(\vec a-\vec b\right)\cdot\vec c=0$ という**垂直**の形にすると、座標を置く方針がはっきりする。`,
            String.raw`$c_3$ の符号は、座標軸の向きの選び方で決まる自由度である。どちらにとっても $k$ の方程式は同じになる。`,
            String.raw`$16k^{2}+4\sqrt6k-3=0$ の2解のうち負のほうは $k>0$ で捨てる。$\sqrt{288}=12\sqrt2$ の計算に注意する。`,
            String.raw`4点が実際にこの条件で存在することは、$k$ を代入して $\left|\vec d\right|=1$ を確かめれば分かる。問題は $k$ を求めよなので必須ではないが、検算になる。`,
          ],
          check: String.raw`$k=\frac{3\sqrt2-\sqrt6}{8}=0.224143868$ として座標を作ると、4本とも長さ $1$ で、$\vec a\cdot\vec b=\vec c\cdot\vec d=0.500000000$、$\vec a\cdot\vec c=\vec b\cdot\vec c=-0.612372436=-\frac{\sqrt6}{4}$、$\vec a\cdot\vec d=\vec b\cdot\vec d=0.224143868=k$ となり、条件をすべてみたす。`,
        },
      ],
    },
    {
      no: 4,
      field: "整数",
      topics: ["3進付値", "合同式", "mod 9 での絞り込み", "最大値を与える組"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$1\\le m\\le30$、$1\\le n\\le30$（$3\\nmid n$）のすべてについて $B\\left(m^{3}+n^{2}+n+3\\right)$ を直接計算すると、最大は $4$ で、与える $(m,n)$ は $(3,11),(12,11),(21,11),(30,11)$ の4組だけだった",
          "$f(3,11)=162=3^{4}\\cdot2$、$f(12,11)=1863=3^{4}\\cdot23$、$f(21,11)=9396=3^{4}\\cdot116$、$f(30,11)=27135=3^{4}\\cdot335$ を確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$A(m,n)=B\left(m^{3}+n^{2}+n+3\right)$ の最大値と、それを与える $(m,n)$ をすべて求める`,
          answer: String.raw`最大値 $4$。与える $(m,n)$ は $(3,11),(12,11),(21,11),(30,11)$ の4組`,
          approach: String.raw`まず $3$ で割った余りで、$m$ と $n$ の組み合わせを絞る。$n\equiv1$ の場合は $f$ が $3$ でちょうど1回しか割れないことが計算で分かるので、$n\equiv2$（このとき $m\equiv0$）だけが残る。$m=3m'$ とすると $m^{3}$ が $27$ の倍数になるので、$n^{2}+n+3$ の $3$ の指数が $3$ 以上かどうかが勝負になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$f(m,n)=m^{3}+n^{2}+n+3$ とする。フェルマーの小定理（あるいは $m\equiv0,1,2$ の直接計算）より $m^{3}\equiv m\pmod3$ である。$3\nmid n$ なので $n\equiv1$ または $2\pmod3$ で`,
            },
            {
              k: "steps",
              items: [
                String.raw`$n\equiv1$：$n^{2}+n\equiv2$ なので $f\equiv m+2$。$3\mid f$ には $m\equiv1\pmod3$。`,
                String.raw`$n\equiv2$：$n^{2}+n\equiv4+2\equiv0$ なので $f\equiv m$。$3\mid f$ には $m\equiv0\pmod3$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$n\equiv1\pmod3$ の場合は $A=1$ まで。** $m=3s+1$、$n=3t+1$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}
m^{3}&=27s^{3}+27s^{2}+9s+1\\[1mm]
n^{2}+n+3&=9t^{2}+9t+5
\end{aligned}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`f=3\left(9s^{3}+9s^{2}+3s+3t^{2}+3t+2\right)`,
            },
            {
              k: "p",
              t: String.raw`で、かっこの中は $3$ で割ると $2$ 余る。したがって $A(m,n)=1$ である。`,
            },
            {
              k: "p",
              t: String.raw`**$n\equiv2\pmod3$、$m\equiv0\pmod3$ の場合。** $m=3m'$ とすると $m^{3}=27m'^{3}$ である。まず $n^{2}+n+3$ の $3$ の指数を調べる。$n=3u+2$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`n^{2}+n+3=9u^{2}+15u+9=3\left(3u^{2}+5u+3\right)`,
            },
            {
              k: "p",
              t: String.raw`で、$3u^{2}+5u+3\equiv2u\pmod3$ である。さらに $u=3w$ のとき`,
            },
            {
              k: "math",
              t: String.raw`3u^{2}+5u+3=27w^{2}+15w+3=3\left(9w^{2}+5w+1\right),\qquad9w^{2}+5w+1\equiv2w+1\pmod3`,
            },
            {
              k: "p",
              t: String.raw`である。$1\le n\le30$、$n\equiv2\pmod9$ となるのは $n=2,11,20,29$（$w=0,1,2,3$）で、$2w+1\equiv0\pmod3$ となるのは $w=1$、すなわち`,
            },
            { k: "math", t: String.raw`n=11:\quad n^{2}+n+3=135=27\cdot5` },
            {
              k: "p",
              t: String.raw`だけである。他の $n$ では $B\left(n^{2}+n+3\right)\le2$ である。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$B\left(n^{2}+n+3\right)\le2$ のとき：$27\mid m^{3}$ なので $B(f)=B\left(n^{2}+n+3\right)\le2$。`,
                String.raw`$n=11$ のとき：$f=27m'^{3}+135=27\left(m'^{3}+5\right)$ なので $A=3+B\left(m'^{3}+5\right)$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`**$B\left(m'^{3}+5\right)$ を調べる。** $3\mid m'^{3}+5$ は $m'^{3}\equiv1\pmod3$、つまり $m'\equiv1\pmod3$ と同値である。このとき $m'=3k+1$ とすると`,
            },
            {
              k: "math",
              t: String.raw`m'^{3}=27k^{3}+27k^{2}+9k+1\equiv1\pmod9`,
            },
            {
              k: "p",
              t: String.raw`なので $m'^{3}+5\equiv6\pmod9$ となり、$9$ では割り切れない。したがって $B\left(m'^{3}+5\right)=1$ ちょうどで`,
            },
            { k: "math", t: String.raw`A=3+1=4` },
            {
              k: "p",
              t: String.raw`である。$m=3m'\le30$ より $m'\le10$ で、$m'\equiv1\pmod3$ となるのは $m'=1,4,7,10$、すなわち $m=3,12,21,30$ である。`,
            },
            { k: "p", t: String.raw`**まとめ。** 以上より最大値は` },
            { k: "math", t: String.raw`A_{\max}=4` },
            {
              k: "math",
              t: String.raw`(m,n)=(3,11),\;(12,11),\;(21,11),\;(30,11)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`実際 $f(3,11)=27+121+11+3=162=2\cdot3^{4}$、$f(30,11)=27000+135=27135=335\cdot3^{4}$ である。`,
            },
          ],
          pitfalls: [
            String.raw`$m\equiv0\pmod3$ のとき $m^{3}$ は $27$ の倍数になる（$9$ ではなく $27$）。だから $n^{2}+n+3$ の指数が $2$ 以下なら、$m$ は結果に影響しない。`,
            String.raw`$n^{2}+n+3$ の指数が $3$ になるのは $n=11$ だけである。$n\equiv2\pmod9$ まで絞ってから、さらに $w$ の条件を見る。`,
            String.raw`$m'\equiv1\pmod3$ なら $m'^{3}\equiv1\pmod9$ である（$\bmod3$ ではなく $\bmod9$ で効く）。これで $B\left(m'^{3}+5\right)$ が $1$ で止まる。`,
            String.raw`$n\equiv1\pmod3$ の場合を「たぶん小さい」で片づけず、$A=1$ をきちんと示す。`,
          ],
          check: String.raw`$1\le m\le30$、$1\le n\le30$（$3\nmid n$）のすべてで $B(f(m,n))$ を直接計算すると、最大は $4$ で、与える組は $(3,11),(12,11),(21,11),(30,11)$ の4つだけだった。それぞれ $f=162,1863,9396,27135$ で、$3^{4}=81$ で割ると $2,23,116,335$ となり、いずれも $3$ の倍数ではない。`,
        },
      ],
    },
    {
      no: 5,
      field: "場合の数",
      topics: ["ラテン方陣", "完全順列", "置換の型", "場合分け"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$4$ 行すべてを全探索して数えると、条件をみたす入れ方は $576$ 通りだった",
          "1行目を固定したときの内訳が「2行目が $(2,2)$ 型の $3$ 通り×各 $4$ 通り」と「$4$ 項環状型の $6$ 通り×各 $2$ 通り」で合計 $24$ 通りになることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$4\times4$ のマス目に $1,2,3,4$ を入れ、どの行にもどの列にも同じ数字が1回しか現れないようにする入れ方の総数を求める`,
          answer: String.raw`$576$ 通り`,
          approach: String.raw`各行は $1,2,3,4$ の並べ替えになる。1行目は $4!$ 通り、2行目は1行目と同じ列に同じ数字が来てはいけないので「完全順列」になる。3行目以降の数は、2行目の「ずれ方」の型（2つの入れ替えか、4つの巡回か）で変わるので、そこで場合分けする。`,
          blocks: [
            {
              k: "p",
              t: String.raw`どの行にも $1,2,3,4$ が1回ずつ現れるので、各行は $1,2,3,4$ の並べ替えである。`,
            },
            { k: "p", t: String.raw`**1行目。** $4!=24$ 通り。以下、1行目を固定して数え、最後に $24$ を掛ける。` },
            {
              k: "p",
              t: String.raw`**2行目。** どの列でも1行目と違う数字が来るので、2行目は1行目に対する完全順列（どの位置も動く並べ替え）である。$4$ 個の完全順列は $9$ 通りで、その内訳は`,
            },
            {
              k: "steps",
              items: [
                String.raw`2つずつ入れ替える型（たとえば $1234\to2143$）：$4$ 個を2組のペアに分ける分け方で $3$ 通り。`,
                String.raw`$4$ つが順に回る型（たとえば $1234\to2341$）：$3!=6$ 通り。`,
              ],
            },
            { k: "p", t: String.raw`である（$3+6=9$）。` },
            {
              k: "p",
              t: String.raw`**3・4行目。** 各列には、1行目と2行目で使った数字以外の2つが残る。3行目はその残り2つから1つずつ選んで並べ替えになるようにし、4行目は自動的に決まる。`,
            },
            {
              k: "p",
              t: String.raw`1行目を $1,2,3,4$ として型ごとに数える。`,
            },
            {
              k: "steps",
              items: [
                String.raw`**2つずつ入れ替える型**（例：2行目が $2,1,4,3$）。各列の残りは左から $\{3,4\},\{3,4\},\{1,2\},\{1,2\}$ である。3行目は左2列に $3,4$ を並べ（$2$ 通り）、右2列に $1,2$ を並べる（$2$ 通り）ので $4$ 通り。4行目は残りで決まる。よって $3\times4=12$ 通り。`,
                String.raw`**$4$ つが順に回る型**（例：2行目が $2,3,4,1$）。各列の残りは $\{3,4\},\{1,4\},\{1,2\},\{2,3\}$ である。1列目に $3$ を置くと4列目は $2$、3列目は $1$、2列目は $4$ と順に決まり $3,4,1,2$。$4$ を置くと $4,1,2,3$。よって $2$ 通りで、$6\times2=12$ 通り。`,
              ],
            },
            {
              k: "p",
              t: String.raw`1行目を固定したときの総数は $12+12=24$ 通りである。したがって全体は`,
            },
            { k: "math", t: String.raw`24\times24=576` },
            { k: "p", t: String.raw`通りである。` },
            {
              k: "note",
              t: String.raw`$n\times n$ でこのような入れ方の総数は「ラテン方陣の個数」と呼ばれ、$n=4$ では $576$ である。$n=5$ では $161280$ と急に増え、一般の公式は知られていない。`,
            },
          ],
          pitfalls: [
            String.raw`2行目が1行目の完全順列になることは「列ごとに違う」から従う。$9$ という数は $4$ 個の完全順列の個数で、$3!=6$ ではない。`,
            String.raw`完全順列の型で3・4行目の数が変わる（$4$ 通りと $2$ 通り）。型を分けずに一律に掛けると答えがずれる。`,
            String.raw`4行目は3行目まで決めれば自動的に決まる。ここでさらに掛けないこと。`,
            String.raw`問題は「マス目に数字を入れる」ことを数えているので、回転や裏返しで移り合うものも別に数える。`,
          ],
          check: String.raw`$4$ 行すべてを全探索して数えると $576$ 通りだった。1行目を固定したときの内訳も、$(2,2)$ 型の $3$ 通りが合計 $12$、$4$ 項環状型の $6$ 通りが合計 $12$ で、$24$ 通りと一致する。`,
        },
      ],
    },
    {
      no: 6,
      field: "積分法",
      topics: ["2回の回転", "断面積", "円環", "log の積分"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "断面積 $\\pi\\left(1+\\log2-X^{2}-\\log(1+|X|)\\right)$ を $-1\\le X\\le1$ で $200$ 万点の数値積分すると $6.116803331$ となり、$2\\pi\\left(\\frac53-\\log2\\right)=6.116803331$ と一致した",
          "同じ条件で $200$ 万点の3次元モンテカルロ法を行うと体積は $6.11604$ となり、よく合っている",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$xz$ 平面の曲線 $z=\sqrt{\log(1+x)}$（$0\le x\le1$）を $z$ 軸のまわりに回して $S$ を作り、$S$ を $x$ 軸のまわりに回してできる立体 $V$ の体積を求める`,
          answer: String.raw`$2\pi\left(\dfrac53-\log2\right)=\dfrac{10\pi}{3}-2\pi\log2$`,
          approach: String.raw`$z$ 軸まわりに回した $S$ は「$z=\sqrt{\log(1+r)}$（$r=\sqrt{x^{2}+y^{2}}\le1$）」という回転面である。次に $x$ 軸まわりに回すので、$x$ を固定して「$S$ の点の $x$ 軸からの距離」がどんな値をとるかを調べればよい。その範囲が区間になるので、断面は円環になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$S$ は $z$ 軸まわりの回転面なので、$r=\sqrt{x^{2}+y^{2}}$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`S=\left\{(x,y,z)\;\middle|\;z=\sqrt{\log(1+r)},\;0\le r\le1\right\}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$x$ を固定して考える。** $x$ 軸まわりに回すので、$S$ の点 $(x,y,z)$ は平面 $x=$（一定）の中で半径`,
            },
            { k: "math", t: String.raw`\rho=\sqrt{y^{2}+z^{2}}` },
            {
              k: "p",
              t: String.raw`の円を描く。$x$ を固定したとき $\rho$ のとりうる値を調べる。$r^{2}=x^{2}+y^{2}$ より $y^{2}=r^{2}-x^{2}$ で、$r$ は $|x|\le r\le1$ を動く（$y$ はそれに応じて決まる）。したがって`,
            },
            {
              k: "math",
              t: String.raw`\rho^{2}=y^{2}+z^{2}=\left(r^{2}-x^{2}\right)+\log(1+r)`,
            },
            {
              k: "p",
              t: String.raw`である。$r\mapsto r^{2}+\log(1+r)$ は $r\ge0$ で増加するので、$\rho^{2}$ は $r=|x|$ から $r=1$ まで連続に増え`,
            },
            {
              k: "math",
              t: String.raw`\log(1+|x|)\le\rho^{2}\le1+\log2-x^{2}`,
            },
            {
              k: "p",
              t: String.raw`のすべての値をとる。つまり平面 $x=$（一定）での $V$ の断面は、内半径 $\sqrt{\log(1+|x|)}$、外半径 $\sqrt{1+\log2-x^{2}}$ の円環である。`,
            },
            {
              k: "p",
              t: String.raw`（$|x|=1$ では両者が $\sqrt{\log2}$ で一致し、断面は円周だけになる。$|x|>1$ では $S$ の点がないので断面は空である。）`,
            },
            { k: "p", t: String.raw`**体積。** 断面積は` },
            {
              k: "math",
              t: String.raw`\pi\left\{\left(1+\log2-x^{2}\right)-\log(1+|x|)\right\}`,
            },
            { k: "p", t: String.raw`なので、偶関数であることを使って` },
            {
              k: "math",
              t: String.raw`V=\int_{-1}^{1}\pi\left\{1+\log2-x^{2}-\log(1+|x|)\right\}dx=2\pi\int_{0}^{1}\left\{1+\log2-x^{2}-\log(1+x)\right\}dx`,
            },
            { k: "p", t: String.raw`である。それぞれ計算すると` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left(1+\log2\right)dx=1+\log2,\qquad\int_{0}^{1}x^{2}dx=\frac13`,
            },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\log(1+x)\,dx=\Bigl[(1+x)\log(1+x)-(1+x)\Bigr]_{0}^{1}=\left(2\log2-2\right)-(-1)=2\log2-1`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\int_{0}^{1}\left\{\cdots\right\}dx=\left(1+\log2\right)-\frac13-\left(2\log2-1\right)=\frac53-\log2`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`V=2\pi\left(\frac53-\log2\right)=\frac{10\pi}{3}-2\pi\log2`,
            },
            { k: "p", t: String.raw`である（$6.1168$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`平面 $x=$（一定）での断面の半径。内半径 $\sqrt{\log(1+|x|)}$ と外半径 $\sqrt{1+\log2-x^{2}}$ で、$|x|=1$ でどちらも $\sqrt{\log2}=0.833$ に一致する。網かけの幅が円環の厚みにあたる。`,
                view: [-1.3, 1.3, -0.18, 1.5],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fillBetween", top: OUTR, bottom: INR, from: -1, to: 1 },
                  { k: "curve", f: OUTR, from: -1, to: 1 },
                  { k: "curve", f: INR, from: -1, to: 1 },
                  { k: "dot", at: [0, Math.sqrt(1 + L2)], label: "√(1+log2)", place: "above" },
                  { k: "dot", at: [1, Math.sqrt(L2)], label: "√(log2)", place: "right" },
                  { k: "dot", at: [0, 0], label: "O", place: "below" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$S$ は曲面（厚みのない面）である。それを回すので、断面は円環になり、内側に穴が開く。$S$ を「曲線が通過した部分」と読み違えて塗りつぶさない。`,
            String.raw`$x$ を固定したとき $r$ が動ける範囲は $|x|\le r\le1$ である。$r\ge|x|$ は $y^{2}=r^{2}-x^{2}\ge0$ から来る。`,
            String.raw`$\rho^{2}=r^{2}-x^{2}+\log(1+r)$ が $r$ について連続増加なので、$\rho$ のとりうる値が**区間**になる。ここを言わないと「円環全体が埋まる」ことが示せない。`,
            String.raw`$\int\log(1+x)dx$ は部分積分で $(1+x)\log(1+x)-(1+x)$ である。$x\log(1+x)-x$ としない。`,
          ],
          check: String.raw`断面積を $-1\le x\le1$ で $200$ 万点の数値積分すると $6.116803331$ で、$2\pi\left(\frac53-\log2\right)=6.116803331$ と一致する。同じ条件で3次元のモンテカルロ法（$200$ 万点）を行っても $6.11604$ となり、よく合っている。`,
        },
      ],
    },
  ],
};
