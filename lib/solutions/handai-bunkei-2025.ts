import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 大阪大学 2025年度（令和7年度）一般選抜 前期日程 数学（文系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで3問とも自分で解き直した。
 * 大阪大学は解答例も公開しているが、**読んでいないし言い換えてもいない**。
 * 他社の解答解説も見ていない。問題文・図・表は1つも載せていない。
 */

/** 第1問の図。$\cos\angle\mathrm{AOB}=\tfrac13$、$t=3$ の場合。 */
const A25B = [1, 2 * Math.SQRT2] as [number, number];
const T25B = 3;
const P25B = [(1 + 2 * T25B) / 3, (2 * Math.SQRT2) / 3] as [number, number];
const R25B = (2 * T25B + 9) / (2 * T25B + 1);

/** 第3問の図。$p=1$ のとき。 */
const PAR25 = (x: number): number => x * x - 1;
const TAN25 = (x: number): number => 2 * x - 2;
const ZERO25 = (): number => 0;

export const handaiBunkei2025: SolutionSet = {
  slug: "handai-bunkei",
  year: 2025,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "大阪大学",
  short: "阪大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "ベクトル",
      topics: ["内積と正射影", "垂直条件", "内分点", "不等式で範囲を出す"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$\\cos\\angle\\mathrm{AOB}=\\tfrac13$ となる座標をとって $t$ を $0.002$ から $8$ まで動かし、$\\mathrm{AR}\\perp\\mathrm{OP}$ から $\\mathrm{R}$ を直接求めると、つねに $\\left|\\mathrm{OR}\\right|=\\tfrac{2t+9}{2t+1}$ になった（違反 $0$ 件）",
          "$\\tfrac t2\\le\\left|\\mathrm{OR}\\right|\\le t$ の判定と、求めた範囲 $\\tfrac{1+\\sqrt{73}}{4}\\le t\\le\\tfrac{3\\left(1+\\sqrt{17}\\right)}{4}$ による判定が $2$ 万点で $1$ 度も食い違わなかった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面上の三角形 $\mathrm{OAB}$ で $\angle\mathrm{AOB}$ は鋭角、$\mathrm{OA}=3$、$\mathrm{OB}=t$ とする。$\mathrm{A}$ から直線 $\mathrm{OB}$ に下ろした垂線と直線 $\mathrm{OB}$ の交点を $\mathrm{C}$ とし $\mathrm{OC}=1$ とする。内積 $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}$ を $t$ で表す`,
          answer: String.raw`$t$`,
          approach: String.raw`$\mathrm{C}$ は $\mathrm{A}$ の直線 $\mathrm{OB}$ への正射影なので $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=\mathrm{OC}\cdot\mathrm{OB}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\theta=\angle\mathrm{AOB}$ とおく。$\mathrm{C}$ は $\mathrm{A}$ から直線 $\mathrm{OB}$ に下ろした垂線の足なので`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{OC}=\mathrm{OA}\left|\cos\theta\right|=3\left|\cos\theta\right|`,
            },
            {
              k: "p",
              t: String.raw`である。$\theta$ は鋭角なので $\cos\theta>0$ であり、$\mathrm{OC}=1$ から`,
            },
            {
              k: "math",
              t: String.raw`\cos\theta=\frac13`,
            },
            { k: "p", t: String.raw`である。したがって` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=\mathrm{OA}\cdot\mathrm{OB}\cos\theta=3\cdot t\cdot\frac13=t`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{OC}=1$ は「$\angle\mathrm{AOB}$ の大きさが $t$ によらず固定されている」ことを言っている。$\cos\theta=\dfrac13$ はこのあとずっと効く。`,
            },
            {
              k: "figure",
              fig: {
                caption:
                  "t = 3 の場合。C は A から直線 OB に下ろした垂線の足で OC = 1。P は AB を 2 : 1 に内分する点、R は A から直線 OP に下ろした垂線と直線 OB の交点、M は OB の中点。この t では R は線分 MB の上にある。",
                view: [-0.6, 4.0, -0.7, 3.2],
                step: { x: 1, y: 1 },
                items: [
                  { k: "seg", a: [0, 0], b: A25B },
                  { k: "seg", a: [0, 0], b: [T25B, 0] },
                  { k: "seg", a: A25B, b: [T25B, 0] },
                  { k: "seg", a: A25B, b: [1, 0], dash: true },
                  { k: "seg", a: [0, 0], b: P25B },
                  { k: "seg", a: A25B, b: [R25B, 0], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: A25B, label: "A", place: "above" },
                  { k: "dot", at: [T25B, 0], label: "B", place: "below-right" },
                  { k: "dot", at: [1, 0], label: "C", place: "below-left" },
                  { k: "dot", at: P25B, label: "P", place: "above-right" },
                  { k: "dot", at: [1.5, 0], label: "M", place: "below" },
                  { k: "dot", at: [R25B, 0], label: "R", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\angle\mathrm{AOB}$ が鋭角という条件がないと、$\mathrm{C}$ が $\mathrm{B}$ と反対側に来る場合（$\cos\theta<0$）が混ざり、$\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=-t$ になってしまう。`,
          ],
          check: String.raw`座標で作った配置でも $\overrightarrow{\mathrm{OA}}\cdot\overrightarrow{\mathrm{OB}}=t$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`線分 $\mathrm{AB}$ を $2:1$ に内分する点を $\mathrm{P}$、$\mathrm{A}$ から直線 $\mathrm{OP}$ に下ろした垂線と直線 $\mathrm{OB}$ との交点を $\mathrm{R}$ とする。線分 $\mathrm{OR}$ の長さを $t$ で表す`,
          answer: String.raw`$\mathrm{OR}=\dfrac{2t+9}{2t+1}$`,
          approach: String.raw`$\overrightarrow{\mathrm{OR}}=k\overrightarrow{\mathrm{OB}}$ とおき、$\overrightarrow{\mathrm{AR}}\cdot\overrightarrow{\mathrm{OP}}=0$ を展開する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\vec a=\overrightarrow{\mathrm{OA}}$、$\vec b=\overrightarrow{\mathrm{OB}}$ とおく。(1) より`,
            },
            {
              k: "math",
              t: String.raw`\left|\vec a\right|^{2}=9,\qquad\left|\vec b\right|^{2}=t^{2},\qquad\vec a\cdot\vec b=t`,
            },
            { k: "p", t: String.raw`である。$\mathrm{P}$ は $\mathrm{AB}$ を $2:1$ に内分するので` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OP}}=\frac{1\cdot\vec a+2\cdot\vec b}{3}=\frac{\vec a+2\vec b}{3}`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{R}$ は直線 $\mathrm{OB}$ 上なので $\overrightarrow{\mathrm{OR}}=k\vec b$（$k$ は実数）と書ける。$\mathrm{AR}\perp\mathrm{OP}$ より`,
            },
            {
              k: "math",
              t: String.raw`\left(k\vec b-\vec a\right)\cdot\frac{\vec a+2\vec b}{3}=0`,
            },
            { k: "p", t: String.raw`である。$3$ 倍して展開すると` },
            {
              k: "math",
              t: String.raw`k\,\vec a\cdot\vec b+2k\left|\vec b\right|^{2}-\left|\vec a\right|^{2}-2\,\vec a\cdot\vec b=0`,
            },
            { k: "p", t: String.raw`であり、値を入れて` },
            {
              k: "math",
              t: String.raw`kt+2kt^{2}-9-2t=0,\qquad k\,t\left(1+2t\right)=2t+9`,
            },
            { k: "p", t: String.raw`である。$t>0$ なので` },
            {
              k: "math",
              t: String.raw`k=\frac{2t+9}{t\left(2t+1\right)}`,
            },
            { k: "p", t: String.raw`であり、$k>0$ だから` },
            {
              k: "math",
              t: String.raw`\mathrm{OR}=\left|k\right|\left|\vec b\right|=kt=\frac{2t+9}{2t+1}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$k>0$ なので $\mathrm{R}$ は $\mathrm{B}$ と同じ側にある。また $\overrightarrow{\mathrm{OP}}\ne\vec0$（三角形なので $\vec a,\vec b$ は1次独立）なので、垂線は必ず1本に決まる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{AB}$ を $2:1$ に内分する点は $\dfrac{\vec a+2\vec b}{3}$。$\dfrac{2\vec a+\vec b}{3}$ と取り違えると以降すべてずれる。`,
            String.raw`$\mathrm{OR}=kt$ とするには $k>0$ が要る。式から $k>0$ はすぐ読めるので一言添える。`,
          ],
          check: String.raw`$t$ を $0.002$ から $8$ まで走査して、垂線から直接求めた $\mathrm{R}$ と式が一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`線分 $\mathrm{OB}$ の中点を $\mathrm{M}$ とする。点 $\mathrm{R}$ が線分 $\mathrm{MB}$ 上にあるとき、$t$ のとりうる値の範囲を求める`,
          answer: String.raw`$\dfrac{1+\sqrt{73}}{4}\le t\le\dfrac{3\left(1+\sqrt{17}\right)}{4}$`,
          approach: String.raw`$\dfrac t2\le\mathrm{OR}\le t$ を解く。分母 $2t+1>0$ を払えば2次不等式が2つ。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) より $\mathrm{R}$ は半直線 $\mathrm{OB}$ 上にある。$\mathrm{M}$ は $\mathrm{OB}$ の中点なので $\mathrm{OM}=\dfrac t2$ であり、$\mathrm{R}$ が線分 $\mathrm{MB}$ 上にある条件は`,
            },
            {
              k: "math",
              t: String.raw`\frac t2\le\mathrm{OR}\le t,\qquad\frac t2\le\frac{2t+9}{2t+1}\le t`,
            },
            { k: "p", t: String.raw`である。$t>0$ より $2t+1>0$ なので、分母を払ってよい。` },
            { k: "p", t: String.raw`**右側**。$2t+9\le t\left(2t+1\right)$ より` },
            {
              k: "math",
              t: String.raw`2t^{2}-t-9\ge0`,
            },
            { k: "p", t: String.raw`である。解の公式より $t=\dfrac{1\pm\sqrt{73}}{4}$ で、$t>0$ の範囲では` },
            {
              k: "math",
              t: String.raw`t\ge\frac{1+\sqrt{73}}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（負のほうの解 $\dfrac{1-\sqrt{73}}{4}<0$ は $t>0$ の外）。`,
            },
            { k: "p", t: String.raw`**左側**。$t\left(2t+1\right)\le2\left(2t+9\right)$ より` },
            {
              k: "math",
              t: String.raw`2t^{2}-3t-18\le0`,
            },
            {
              k: "p",
              t: String.raw`である。解の公式より $t=\dfrac{3\pm\sqrt{153}}{4}=\dfrac{3\pm3\sqrt{17}}{4}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac{3\left(1-\sqrt{17}\right)}{4}\le t\le\frac{3\left(1+\sqrt{17}\right)}{4}`,
            },
            { k: "p", t: String.raw`であり、$t>0$ と合わせて $t\le\dfrac{3\left(1+\sqrt{17}\right)}{4}$ である。` },
            { k: "p", t: String.raw`2つを合わせて` },
            {
              k: "math",
              t: String.raw`\frac{1+\sqrt{73}}{4}\le t\le\frac{3\left(1+\sqrt{17}\right)}{4}`,
            },
            {
              k: "p",
              t: String.raw`である。両端はおよそ $2.386\le t\le3.842$ で、空でない。`,
            },
            {
              k: "note",
              t: String.raw`$\mathrm{OR}=\dfrac{2t+9}{2t+1}=1+\dfrac{8}{2t+1}$ は $t$ について減少し、$t\to\infty$ で $1$ に近づく。一方 $\dfrac t2$ と $t$ は増加するので、「$\mathrm{R}$ が $\mathrm{M}$ より外」「$\mathrm{R}$ が $\mathrm{B}$ より内」がそれぞれ $t$ の片側だけで成り立ち、はさまれた区間が答えになる。`,
            },
          ],
          pitfalls: [
            String.raw`$\sqrt{153}=3\sqrt{17}$ の整理を忘れない。$\dfrac{3+\sqrt{153}}{4}$ のままでも間違いではないが、$\dfrac{3\left(1+\sqrt{17}\right)}{4}$ のほうが見やすい。`,
            String.raw`$\angle\mathrm{AOB}$ が鋭角、という条件は $\cos\theta=\dfrac13$ で自動的にみたされる。$t$ に追加の制限は付かない。`,
          ],
          check: String.raw`$2$ 万点の走査で、直接の判定と求めた範囲が $1$ 度も食い違わなかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "数列",
      topics: ["漸化式", "恒等式の証明", "数学的帰納法", "和の入れかえ"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$a_{n}$ を分数のまま計算し、$1\\le k,\\ell\\le39$ のすべてで (1) の等式が**厳密に**成り立った（違反 $0$ 件）",
          "$m=1$ から $199$ まで $\\sum_{k=1}^{m}a_{k}a_{m-k+1}$ を分数のまま計算すると、すべてちょうど $1$ だった",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$a_{1}=1$、$a_{n+1}=\dfrac{2n-1}{2n}a_{n}$ で定まる数列 $\left\{a_{n}\right\}$ について、正の整数 $k,\ell$ に対し $\dfrac{k}{k+\ell-1}a_{k+1}a_{\ell}+\dfrac{\ell}{k+\ell-1}a_{k}a_{\ell+1}=a_{k}a_{\ell}$ を示す`,
          answer: String.raw`$a_{k+1}=\dfrac{2k-1}{2k}a_{k}$、$a_{\ell+1}=\dfrac{2\ell-1}{2\ell}a_{\ell}$ を代入すると、$a_{k}a_{\ell}$ の係数が $\dfrac{\left(2k-1\right)+\left(2\ell-1\right)}{2\left(k+\ell-1\right)}=1$ になる`,
          approach: String.raw`両方の項から $a_{k}a_{\ell}$ をくくり出す。`,
          blocks: [
            { k: "p", t: String.raw`漸化式より` },
            {
              k: "math",
              t: String.raw`a_{k+1}=\frac{2k-1}{2k}a_{k},\qquad a_{\ell+1}=\frac{2\ell-1}{2\ell}a_{\ell}`,
            },
            { k: "p", t: String.raw`である。左辺に代入すると` },
            {
              k: "math",
              t: String.raw`\begin{aligned}&\frac{k}{k+\ell-1}\cdot\frac{2k-1}{2k}a_{k}a_{\ell}+\frac{\ell}{k+\ell-1}\cdot\frac{2\ell-1}{2\ell}a_{k}a_{\ell}\\ &=a_{k}a_{\ell}\left\{\frac{2k-1}{2\left(k+\ell-1\right)}+\frac{2\ell-1}{2\left(k+\ell-1\right)}\right\}\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である（$\dfrac{k}{2k}=\dfrac12$、$\dfrac{\ell}{2\ell}=\dfrac12$ が効く）。中括弧の中は`,
            },
            {
              k: "math",
              t: String.raw`\frac{\left(2k-1\right)+\left(2\ell-1\right)}{2\left(k+\ell-1\right)}=\frac{2\left(k+\ell-1\right)}{2\left(k+\ell-1\right)}=1`,
            },
            {
              k: "p",
              t: String.raw`である（$k,\ell\ge1$ より $k+\ell-1\ge1>0$ なので割ってよい）。よって左辺は $a_{k}a_{\ell}$ に等しい。$\blacksquare$`,
            },
            {
              k: "note",
              t: String.raw`$a_{n}$ を具体的に書くと $a_{n}=\dfrac{\left(2n-2\right)!}{4^{\,n-1}\left\{\left(n-1\right)!\right\}^{2}}$ で、$a_{1},a_{2},\ldots=1,\dfrac12,\dfrac38,\dfrac5{16},\dfrac{35}{128},\ldots$ である。ただし (1)(2) を解くのにこの式は要らない。`,
            },
          ],
          pitfalls: [
            String.raw`$\dfrac{k}{2k}$ を約分して $\dfrac12$ にするところが要点。ここで $k$ が消えるので、残りが $k+\ell$ の形にまとまる。`,
          ],
          check: String.raw`$1\le k,\ell\le39$ の $1521$ 組すべてで、分数のまま等式が成り立った。`,
        },
        {
          label: "(2)",
          task: String.raw`正の整数 $m$ に対して $\displaystyle\sum_{k=1}^{m}a_{k}a_{m-k+1}=1$ を示す`,
          answer: String.raw`$S_{m}=\displaystyle\sum_{k=1}^{m}a_{k}a_{m-k+1}$ とおくと、(1) を $k+\ell=m+1$ の組すべてで足すと $S_{m}=S_{m+1}$ が出る。$S_{1}=1$ より帰納法`,
          approach: String.raw`(1) を $\ell=m+1-k$ として $k=1,\ldots,m$ で足し、出てくる項を $T_{j}=a_{j}a_{m+2-j}$ で整理する。`,
          blocks: [
            { k: "p", t: String.raw`$S_{m}=\displaystyle\sum_{k=1}^{m}a_{k}a_{m-k+1}$ とおく。$m$ についての帰納法で $S_{m}=1$ を示す。` },
            { k: "p", t: String.raw`$m=1$ のとき $S_{1}=a_{1}a_{1}=1$ である。` },
            {
              k: "p",
              t: String.raw`$S_{m}=1$ と仮定する。(1) で $\ell=m+1-k$ とおくと $k+\ell-1=m$ なので`,
            },
            {
              k: "math",
              t: String.raw`\frac km a_{k+1}a_{m+1-k}+\frac{m+1-k}{m}a_{k}a_{m+2-k}=a_{k}a_{m+1-k}`,
            },
            {
              k: "p",
              t: String.raw`である（$k=1,\ldots,m$ で $\ell=m+1-k\ge1$ なので使える）。これを $k=1$ から $m$ まで足すと、右辺の和は $S_{m}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`\frac1m\left\{\sum_{k=1}^{m}k\,a_{k+1}a_{m+1-k}+\sum_{k=1}^{m}\left(m+1-k\right)a_{k}a_{m+2-k}\right\}=S_{m}`,
            },
            { k: "p", t: String.raw`である。ここで` },
            {
              k: "math",
              t: String.raw`T_{j}=a_{j}a_{m+2-j}\qquad\left(j=1,2,\ldots,m+1\right)`,
            },
            {
              k: "p",
              t: String.raw`とおくと $S_{m+1}=\displaystyle\sum_{j=1}^{m+1}T_{j}$ である。`,
            },
            {
              k: "p",
              t: String.raw`1つめの和は $j=k+1$ と置きかえると $k=1,\ldots,m$ が $j=2,\ldots,m+1$ に対応し、$a_{k+1}a_{m+1-k}=a_{j}a_{m+2-j}=T_{j}$ なので`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{m}k\,a_{k+1}a_{m+1-k}=\sum_{j=2}^{m+1}\left(j-1\right)T_{j}=\sum_{j=1}^{m+1}\left(j-1\right)T_{j}`,
            },
            {
              k: "p",
              t: String.raw`である（$j=1$ の係数は $0$ なので足しても変わらない）。2つめの和はそのまま`,
            },
            {
              k: "math",
              t: String.raw`\sum_{k=1}^{m}\left(m+1-k\right)a_{k}a_{m+2-k}=\sum_{j=1}^{m}\left(m+1-j\right)T_{j}=\sum_{j=1}^{m+1}\left(m+1-j\right)T_{j}`,
            },
            {
              k: "p",
              t: String.raw`である（$j=m+1$ の係数は $0$）。2つを足すと、$T_{j}$ の係数は`,
            },
            {
              k: "math",
              t: String.raw`\left(j-1\right)+\left(m+1-j\right)=m`,
            },
            { k: "p", t: String.raw`で $j$ によらない。よって` },
            {
              k: "math",
              t: String.raw`\frac1m\cdot m\sum_{j=1}^{m+1}T_{j}=S_{m},\qquad S_{m+1}=S_{m}=1`,
            },
            { k: "p", t: String.raw`である。帰納法よりすべての正の整数 $m$ で $S_{m}=1$ である。$\blacksquare$` },
            {
              k: "note",
              t: String.raw`$\left(1-x\right)^{-1/2}=\displaystyle\sum_{n\ge1}a_{n}x^{n-1}$ であることを知っていれば、$\left(1-x\right)^{-1/2}\cdot\left(1-x\right)^{-1/2}=\left(1-x\right)^{-1}=\displaystyle\sum_{m\ge1}x^{m-1}$ の係数比較が (2) そのものである。高校範囲では使えないが、(1) の等式はこの事実を初等的に手渡すための足場になっている。`,
            },
          ],
          alts: [
            {
              title: "$m$ を1つずらす見方",
              blocks: [
                {
                  k: "p",
                  t: String.raw`(1) の等式は「$a_{k}a_{\ell}$ を、$k+\ell$ が1つ大きい2つの積の重みつき平均で書き直す式」である。重み $\dfrac{k}{k+\ell-1}$ と $\dfrac{\ell}{k+\ell-1}$ は足して $1$ にはならないが、$k+\ell$ を固定して全部足すと、各 $T_{j}$ の重みがちょうど $m$ ずつに揃う。`,
                },
                {
                  k: "p",
                  t: String.raw`この「係数が $j$ によらず $m$ になる」ところが仕掛けで、$\left(j-1\right)+\left(m+1-j\right)=m$ という引き算の打ち消しから来ている。$T_{j}$ の具体形を一切使っていないことに注意する。`,
                },
              ],
            },
          ],
          pitfalls: [
            String.raw`添字の置きかえ $j=k+1$ のあと、和の範囲が $2$ から $m+1$ になる。これを $1$ から $m+1$ に広げてよいのは係数が $0$ だから。`,
            String.raw`$S_{m}$ と $S_{m+1}$ はどちらも「添字の和が一定」の形。$S_{m}$ では和が $m+1$、$S_{m+1}$ では $m+2$ である。混同しやすい。`,
          ],
          check: String.raw`$m=1,\ldots,199$ で分数のまま計算して、すべてちょうど $1$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "微分・積分",
      topics: ["放物線の接線", "面積の計算", "3次関数の最大", "対称性"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-14",
      review: {
        sourceChecked: true,
        verified: [
          "$p=0.5,1,1.5,-1,-2$ で $S$ と $T$ を数値積分すると、$S=\\tfrac{\\left|p\\right|^{3}}{6}+\\tfrac{\\left|p\\right|}{2}$、$T=\\tfrac{\\left|p\\right|^{3}}{3}$ と小数第7位まで一致した",
          "$S-T=-\\tfrac{\\left|p\\right|^{3}}{6}+\\tfrac{\\left|p\\right|}{2}$ を $20$ 万点で最大化すると $0.3333333$（$p=1$）で、$\\tfrac13$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`座標平面において $y=x^{2}-1$ で表される放物線を $C$ とする。$C$ 上の点 $\mathrm{P}$（$y$ 軸上にはない）における $C$ の接線を $\ell$ とする。$\mathrm{O}$ を原点とし、$C$ と線分 $\mathrm{OP}$ および $y$ 軸で囲まれた図形の面積を $S$、$C$ と接線 $\ell$ および $y$ 軸で囲まれた図形の面積を $T$ とする。$S-T$ の最大値を求める`,
          answer: String.raw`$\dfrac13$（$\mathrm{P}=\left(\pm1,0\right)$ のとき）`,
          approach: String.raw`$\mathrm{P}\left(p,p^{2}-1\right)$ とおくと $S=\dfrac{\left|p\right|^{3}}{6}+\dfrac{\left|p\right|}{2}$、$T=\dfrac{\left|p\right|^{3}}{3}$。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P}\left(p,p^{2}-1\right)$（$p\ne0$）とおく。$C$ は $y$ 軸について対称で、$\mathrm{O}$ も $y$ 軸上にあるから、$p\mapsto-p$ で $S$ も $T$ も変わらない。そこで **$p>0$ として考え**、最後に $\left|p\right|$ に書き直す。`,
            },
            { k: "p", t: String.raw`**$T$ を求める**。$y'=2x$ なので $\ell$ は` },
            {
              k: "math",
              t: String.raw`y=\left(p^{2}-1\right)+2p\left(x-p\right)=2px-p^{2}-1`,
            },
            { k: "p", t: String.raw`である。$C$ と $\ell$ の差は` },
            {
              k: "math",
              t: String.raw`\left(x^{2}-1\right)-\left(2px-p^{2}-1\right)=x^{2}-2px+p^{2}=\left(x-p\right)^{2}\ge0`,
            },
            {
              k: "p",
              t: String.raw`なので、$C$ はつねに $\ell$ の上（または上で接する）にある。$y$ 軸と $x=p$ の間ではさまれた部分が求める図形で`,
            },
            {
              k: "math",
              t: String.raw`T=\int_{0}^{p}\left(x-p\right)^{2}dx=\left[\frac{\left(x-p\right)^{3}}{3}\right]_{0}^{p}=0-\left(-\frac{p^{3}}{3}\right)=\frac{p^{3}}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$S$ を求める**。図形の境界は、線分 $\mathrm{OP}$、$\mathrm{P}$ から $\left(0,-1\right)$ までの $C$ の弧、$\left(0,-1\right)$ から $\mathrm{O}$ までの $y$ 軸である。$x$ について積分すると、上側が直線 $\mathrm{OP}$（$y=\dfrac{p^{2}-1}{p}x$）、下側が $C$ なので`,
            },
            {
              k: "math",
              t: String.raw`\begin{aligned}S&=\int_{0}^{p}\left\{\frac{p^{2}-1}{p}x-\left(x^{2}-1\right)\right\}dx\\ &=\frac{p^{2}-1}{p}\cdot\frac{p^{2}}{2}-\frac{p^{3}}{3}+p\\ &=\frac{p^{3}-p}{2}-\frac{p^{3}}{3}+p=\frac{p^{3}}{6}+\frac p2\end{aligned}`,
            },
            {
              k: "p",
              t: String.raw`である。$\dfrac{p^{3}}{2}-\dfrac{p^{3}}{3}=\dfrac{p^{3}}{6}$、$-\dfrac p2+p=\dfrac p2$ でまとまる。`,
            },
            {
              k: "p",
              t: String.raw`なお、直線 $\mathrm{OP}$ が $C$ より上にあることは、$0<x<p$ で`,
            },
            {
              k: "math",
              t: String.raw`\frac{p^{2}-1}{p}x-\left(x^{2}-1\right)=\frac{\left(p-x\right)\left(px+1\right)}{p}>0`,
            },
            {
              k: "p",
              t: String.raw`から確かめられる（$p>0$、$0<x<p$ なら $p-x>0$、$px+1>0$）。だから $S$ は符号つきでなく本当の面積である。`,
            },
            { k: "p", t: String.raw`**$S-T$ の最大**。` },
            {
              k: "math",
              t: String.raw`f\left(p\right)=S-T=\frac{p^{3}}{6}+\frac p2-\frac{p^{3}}{3}=-\frac{p^{3}}{6}+\frac p2\qquad\left(p>0\right)`,
            },
            { k: "p", t: String.raw`とおくと` },
            {
              k: "math",
              t: String.raw`f'\left(p\right)=-\frac{p^{2}}{2}+\frac12=\frac{\left(1-p\right)\left(1+p\right)}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$p>0$ では $1+p>0$ なので、$f'$ の符号は $1-p$ と同じである。よって $f$ は $0<p<1$ で増加、$p>1$ で減少し、$p=1$ で最大になる。最大値は`,
            },
            {
              k: "math",
              t: String.raw`f\left(1\right)=-\frac16+\frac12=\frac13`,
            },
            {
              k: "p",
              t: String.raw`である。対称性より $p=-1$ でも同じ値をとる。したがって`,
            },
            {
              k: "math",
              t: String.raw`S-T\ \text{の最大値は}\ \frac13\qquad\left(\mathrm{P}=\left(\pm1,0\right)\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "最大を与える p = 1 の場合。P は (1, 0) で、上の網かけが S（線分 OP と放物線と y 軸で囲む）、下の網かけが T（放物線と接線 ℓ: y = 2x − 2 と y 軸で囲む）。このとき S = 2/3、T = 1/3。",
                view: [-1.6, 3.0, -2.4, 1.6],
                step: { x: 1, y: 1 },
                items: [
                  { k: "fillBetween", top: ZERO25, bottom: PAR25, from: 0, to: 1 },
                  { k: "fillBetween", top: PAR25, bottom: TAN25, from: 0, to: 1 },
                  { k: "curve", f: PAR25, from: -1.58, to: 1.58 },
                  { k: "seg", a: [0.4, TAN25(0.4)], b: [1.8, TAN25(1.8)] },
                  { k: "seg", a: [0, 0], b: [1, 0] },
                  { k: "dot", at: [0, 0], label: "O", place: "above-left" },
                  { k: "dot", at: [1, 0], label: "P(1, 0)", place: "above-right" },
                  { k: "dot", at: [0, -1], label: "(0, −1)", place: "left" },
                  { k: "dot", at: [0, -2], label: "(0, −2)", place: "left" },
                  { k: "text", at: [0.3, -0.46], label: "S", place: "right" },
                  { k: "text", at: [0.1, -1.42], label: "T", place: "right" },
                  { k: "text", at: [1.85, TAN25(1.85)], label: "ℓ", place: "right" },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`$T=\dfrac{p^{3}}{3}$ は「放物線と接線が囲む面積は $\dfrac{\left|a\right|}{3}\left(\beta-\alpha\right)^{3}$」の形（$a=1$、幅 $p$）になっている。$S$ のほうは原点を通る線なので、$\dfrac{p^{3}}{6}$ の項と $\dfrac p2$ の項に分かれる。`,
            },
          ],
          pitfalls: [
            String.raw`$\mathrm{P}$ が $y$ 軸上にない、という断りは $p\ne0$（接線が水平にならない、$S$ がつぶれない）のため。$p$ の符号での場合分けは対称性で片づけてよいが、「対称だから」と一言書く。`,
            String.raw`$S$ の計算で上側が線分 $\mathrm{OP}$、下側が $C$ であることを確かめておく。$p$ が小さいと逆になりそうに見えるが、$\left(p-x\right)\left(px+1\right)>0$ よりつねにこの順。`,
            String.raw`$f\left(p\right)=-\dfrac{p^{3}}{6}+\dfrac p2$ は $p$ を大きくすると負になる。「面積の差だから正」と思い込まない。`,
          ],
          check: String.raw`$p=0.5,1,1.5,-1,-2$ で数値積分と式が小数第7位まで一致し、最大は $0.3333333$（$p=1$）だった。`,
        },
      ],
    },
  ],
};
