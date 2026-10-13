import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2024年度（令和6年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 */

/** 第4問の図。$S_{1}:S_{2}=\left(\sqrt2+1\right):\left(\sqrt2-1\right)$ になる $p=2+\sqrt3$、$q=1$ の場合。 */
const P24 = 2 + Math.sqrt(3);
const AL24 = Math.PI / 12;
const BE24 = (13 * Math.PI) / 12;
const F24 = (x: number): number => P24 * Math.sin(x);
const G24 = (x: number): number => Math.cos(x);

const S1PTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const n = 40;
  for (let i = 0; i <= n; i++) pts.push([AL24 + ((Math.PI - AL24) * i) / n, F24(AL24 + ((Math.PI - AL24) * i) / n)]);
  pts.push([Math.PI / 2, 0]);
  for (let i = n; i >= 0; i--) {
    const x = AL24 + ((Math.PI / 2 - AL24) * i) / n;
    pts.push([x, G24(x)]);
  }
  return pts;
})();

const S2PTS: [number, number][] = (() => {
  const pts: [number, number][] = [[Math.PI / 2, 0], [Math.PI, 0]];
  const n = 40;
  for (let i = 0; i <= n; i++) {
    const x = Math.PI + ((BE24 - Math.PI) * i) / n;
    pts.push([x, F24(x)]);
  }
  for (let i = n; i >= 0; i--) {
    const x = Math.PI / 2 + ((BE24 - Math.PI / 2) * i) / n;
    pts.push([x, G24(x)]);
  }
  return pts;
})();

export const ncuMed2024: SolutionSet = {
  slug: "ncu-med",
  year: 2024,
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
      topics: ["正四面体の内積", "平面上にある条件", "直線と平面の交点", "直角になる条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "1辺 $1$ の正四面体に座標を入れ、$\\overrightarrow{\\mathrm{OP}}=\\tfrac13\\vec a-\\vec b$ が $5\\overrightarrow{\\mathrm{OP}}=\\overrightarrow{\\mathrm{PA}}-3\\overrightarrow{\\mathrm{PB}}$ を満たすことを確かめた",
          "$\\overrightarrow{\\mathrm{OQ}}=\\tfrac13\\vec a+\\tfrac14\\vec c$ が直線 $\\mathrm{GP}$ 上にあること（外積が $\\vec0$）を確かめた",
          "$s=\\tfrac{7+3\\sqrt{41}}{48}=0.5460286$ のとき $\\overrightarrow{\\mathrm{RP}}\\cdot\\overrightarrow{\\mathrm{RQ}}=3\\times10^{-17}$ で、もう一方の解 $-0.2543619$ は線分 $\\mathrm{OA}$ 上にない",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`正四面体 $\mathrm{OABC}$ で、平面 $\mathrm{OAB}$ 上の点 $\mathrm{P}$ が $5\overrightarrow{\mathrm{OP}}=\overrightarrow{\mathrm{PA}}-3\overrightarrow{\mathrm{PB}}$ を満たす。$\overrightarrow{\mathrm{OA}}=\vec a$、$\overrightarrow{\mathrm{OB}}=\vec b$、$\overrightarrow{\mathrm{OC}}=\vec c$ として $\overrightarrow{\mathrm{OP}}$ を $\vec a,\vec b$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OP}}=\dfrac13\vec a-\vec b$`,
          approach: String.raw`$\overrightarrow{\mathrm{PA}}=\vec a-\overrightarrow{\mathrm{OP}}$ などを代入して $\overrightarrow{\mathrm{OP}}$ について解く。`,
          blocks: [
            { k: "p", t: String.raw`$\vec p=\overrightarrow{\mathrm{OP}}$ とおくと $\overrightarrow{\mathrm{PA}}=\vec a-\vec p$、$\overrightarrow{\mathrm{PB}}=\vec b-\vec p$ なので` },
            {
              k: "math",
              t: String.raw`5\vec p=\left(\vec a-\vec p\right)-3\left(\vec b-\vec p\right)=\vec a-3\vec b+2\vec p`,
            },
            { k: "p", t: String.raw`である。よって $3\vec p=\vec a-3\vec b$ で` },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OP}}=\frac13\vec a-\vec b` },
            {
              k: "p",
              t: String.raw`である。$\vec c$ が現れないので、$\mathrm{P}$ は確かに平面 $\mathrm{OAB}$ 上にある。`,
            },
          ],
          check: String.raw`1辺 $1$ の正四面体に座標を入れて確かめると、$5\overrightarrow{\mathrm{OP}}-\left(\overrightarrow{\mathrm{PA}}-3\overrightarrow{\mathrm{PB}}\right)=\vec0$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$\triangle\mathrm{ABC}$ の重心 $\mathrm{G}$ と点 $\mathrm{P}$ を通る直線が平面 $\mathrm{OAC}$ と交わる点を $\mathrm{Q}$ とするとき、$\overrightarrow{\mathrm{OQ}}$ を $\vec a,\vec c$ で表す`,
          answer: String.raw`$\overrightarrow{\mathrm{OQ}}=\dfrac13\vec a+\dfrac14\vec c$`,
          approach: String.raw`直線 $\mathrm{GP}$ 上の点を $\vec a,\vec b,\vec c$ で表し、$\vec b$ の係数が $0$ になるところを探す。`,
          blocks: [
            { k: "p", t: String.raw`$\overrightarrow{\mathrm{OG}}=\dfrac{\vec a+\vec b+\vec c}{3}$ である。(1) より` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{GP}}=\left(\frac13\vec a-\vec b\right)-\frac{\vec a+\vec b+\vec c}{3}=-\frac43\vec b-\frac13\vec c`,
            },
            { k: "p", t: String.raw`なので、直線 $\mathrm{GP}$ 上の点は実数 $t$ を使って` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OG}}+t\,\overrightarrow{\mathrm{GP}}=\frac13\vec a+\left(\frac13-\frac43t\right)\vec b+\left(\frac13-\frac13t\right)\vec c`,
            },
            {
              k: "p",
              t: String.raw`と書ける。$\vec a,\vec b,\vec c$ は1次独立なので、この点が平面 $\mathrm{OAC}$ 上にあるのは $\vec b$ の係数が $0$ のとき、つまり`,
            },
            { k: "math", t: String.raw`\frac13-\frac43t=0,\qquad t=\frac14` },
            { k: "p", t: String.raw`のときである。このとき $\vec c$ の係数は $\dfrac13-\dfrac1{12}=\dfrac14$ なので` },
            { k: "math", t: String.raw`\overrightarrow{\mathrm{OQ}}=\frac13\vec a+\frac14\vec c` },
            { k: "p", t: String.raw`である。` },
          ],
          check: String.raw`この $\mathrm{Q}$ が直線 $\mathrm{GP}$ 上にあることを、座標を入れて外積が $\vec0$ になることで確かめた。`,
        },
        {
          label: "(3)",
          task: String.raw`線分 $\mathrm{OA}$ 上の点 $\mathrm{R}$ について、$\triangle\mathrm{PQR}$ が $\mathrm{PQ}$ を斜辺とする直角三角形になるとき、$\dfrac{\mathrm{OR}}{\mathrm{OA}}$ を求める`,
          answer: String.raw`$\dfrac{\mathrm{OR}}{\mathrm{OA}}=\dfrac{7+3\sqrt{41}}{48}$`,
          approach: String.raw`$\mathrm{PQ}$ が斜辺だから直角は $\mathrm{R}$ にある。$\overrightarrow{\mathrm{RP}}\cdot\overrightarrow{\mathrm{RQ}}=0$ を計算する。`,
          blocks: [
            {
              k: "p",
              t: String.raw`正四面体なので、1辺の長さを $1$ としてよい。$\left|\vec a\right|=\left|\vec b\right|=\left|\vec c\right|=1$ で、どの2つのなす角も $\dfrac\pi3$ だから`,
            },
            { k: "math", t: String.raw`\vec a\cdot\vec b=\vec b\cdot\vec c=\vec c\cdot\vec a=\frac12` },
            {
              k: "p",
              t: String.raw`である。$\mathrm{R}$ は線分 $\mathrm{OA}$ 上なので $\overrightarrow{\mathrm{OR}}=s\vec a$（$0\leqq s\leqq1$）とおける。$\mathrm{PQ}$ が斜辺だから直角は頂点 $\mathrm{R}$ にあり、条件は $\overrightarrow{\mathrm{RP}}\cdot\overrightarrow{\mathrm{RQ}}=0$ である。`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{RP}}=\left(\frac13-s\right)\vec a-\vec b,\qquad\overrightarrow{\mathrm{RQ}}=\left(\frac13-s\right)\vec a+\frac14\vec c`,
            },
            { k: "p", t: String.raw`である。$u=\dfrac13-s$ とおくと` },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{RP}}\cdot\overrightarrow{\mathrm{RQ}}=u^{2}\left|\vec a\right|^{2}+\frac u4\left(\vec a\cdot\vec c\right)-u\left(\vec a\cdot\vec b\right)-\frac14\left(\vec b\cdot\vec c\right)`,
            },
            { k: "p", t: String.raw`で、内積の値を入れると` },
            {
              k: "math",
              t: String.raw`u^{2}+\frac u8-\frac u2-\frac18=u^{2}-\frac38u-\frac18`,
            },
            { k: "p", t: String.raw`である。これが $0$ になるので $8u^{2}-3u-1=0$、すなわち` },
            { k: "math", t: String.raw`u=\frac{3\pm\sqrt{9+32}}{16}=\frac{3\pm\sqrt{41}}{16}` },
            { k: "p", t: String.raw`である。$s=\dfrac13-u$ なので` },
            {
              k: "math",
              t: String.raw`s=\frac13-\frac{3\pm\sqrt{41}}{16}=\frac{16-3\left(3\pm\sqrt{41}\right)}{48}=\frac{7\mp3\sqrt{41}}{48}`,
            },
            {
              k: "p",
              t: String.raw`である。$\sqrt{41}=6.40\ldots$ なので、複号が $-$ のとき（$u$ が $+$ のとき）$s=\dfrac{7-3\sqrt{41}}{48}<0$ となり、$\mathrm{R}$ は線分 $\mathrm{OA}$ 上にない。複号が $+$ のときは`,
            },
            {
              k: "math",
              t: String.raw`s=\frac{7+3\sqrt{41}}{48}=0.546\ldots`,
            },
            { k: "p", t: String.raw`で $0<s<1$ を満たす。$\mathrm{OA}=1$、$\mathrm{OR}=s$ だから` },
            { k: "math", t: String.raw`\frac{\mathrm{OR}}{\mathrm{OA}}=\frac{7+3\sqrt{41}}{48}` },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`「$\mathrm{PQ}$ を斜辺とする」ので直角は $\mathrm{R}$ にある。$\mathrm{P}$ や $\mathrm{Q}$ で直角をとらない。`,
            String.raw`2次方程式の解のうち、$0\leqq s\leqq1$ を満たすほうだけが答えになる。`,
          ],
          check: String.raw`$s=0.5460286$ のとき $\overrightarrow{\mathrm{RP}}\cdot\overrightarrow{\mathrm{RQ}}$ は $3\times10^{-17}$ で、もう一方の解 $-0.2543619$ は線分 $\mathrm{OA}$ 上になかった。`,
        },
      ],
    },
    {
      no: 2,
      field: "確率",
      topics: ["独立な試行", "条件付き確率", "ベイズの考え方", "場合分けして足す"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "操作1のあと箱Bの中身の分布を分数のまま計算すると、赤1個だけが $\\tfrac8{25}$、赤2個が $\\tfrac1{25}$",
          "2回とも赤が記録される確率は $\\tfrac3{25}$ で、条件付き分布は 赤赤・赤青・赤白 がそれぞれ $\\tfrac13$",
          "操作4で赤と青が1個ずつ出る条件付き確率を分数のまま足すと $\\tfrac5{12}$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`赤2個・青4個・白4個が入った袋が2つ、赤1個と青1個が入った箱 $\mathrm{A}$、空の箱 $\mathrm{B}$ がある。操作1（2つの袋から1個ずつ取り出して箱 $\mathrm{B}$ に入れる）を行ったとき、箱 $\mathrm{B}$ に赤玉が1個だけ入っている確率と、2個入っている確率を求める`,
          answer: String.raw`赤玉が1個だけ … $\dfrac8{25}$、2個 … $\dfrac1{25}$`,
          approach: String.raw`どちらの袋も「赤を引く確率 $\dfrac15$」で、2つの袋は独立。`,
          blocks: [
            {
              k: "p",
              t: String.raw`どちらの袋も玉は $2+4+4=10$ 個で、赤を取り出す確率は $\dfrac2{10}=\dfrac15$、赤以外は $\dfrac45$ である。2つの袋から取り出す色は独立だから`,
            },
            {
              k: "math",
              t: String.raw`\left(\text{赤が1個だけ}\right)=2\cdot\frac15\cdot\frac45=\frac8{25},\qquad\left(\text{赤が2個}\right)=\left(\frac15\right)^{2}=\frac1{25}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`あとで使うので、赤が1個だけの $\dfrac8{25}$ の内訳も出しておく。もう1個が青になるのは $2\cdot\dfrac15\cdot\dfrac25=\dfrac4{25}$、白になるのも $\dfrac4{25}$ である。`,
            },
          ],
          check: String.raw`箱 $\mathrm{B}$ の中身の分布を分数のまま計算すると、赤1個だけが $\dfrac8{25}$、赤2個が $\dfrac1{25}$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`操作2・操作3（箱 $\mathrm{B}$ から1個取り出して色を記録し戻す、を2回）まで行って記録された色がいずれも赤であったとき、箱 $\mathrm{B}$ に赤玉が1個だけ入っている確率と、2個入っている確率を求める`,
          answer: String.raw`赤玉が1個だけ … $\dfrac23$、2個 … $\dfrac13$`,
          approach: String.raw`箱 $\mathrm{B}$ の赤の個数ごとに「2回とも赤」の確率を出し、条件付き確率の定義に入れる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`箱 $\mathrm{B}$ の赤の個数を $k$（$k=0,1,2$）とする。操作2・操作3は戻してから引くので独立で、どちらも赤になる確率は $\left(\dfrac k2\right)^{2}$ である。記録がどちらも赤だったという事象を $E$ とすると`,
            },
            {
              k: "steps",
              items: [
                String.raw`$k=0$ … 確率 $\left(\dfrac45\right)^{2}=\dfrac{16}{25}$、$E$ の確率は $0$`,
                String.raw`$k=1$ … 確率 $\dfrac8{25}$、$E$ の確率は $\dfrac14$`,
                String.raw`$k=2$ … 確率 $\dfrac1{25}$、$E$ の確率は $1$`,
              ],
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`P\left(E\right)=\frac8{25}\cdot\frac14+\frac1{25}\cdot1=\frac2{25}+\frac1{25}=\frac3{25}`,
            },
            { k: "p", t: String.raw`であり` },
            {
              k: "math",
              t: String.raw`P\left(k=1\mid E\right)=\frac{\frac2{25}}{\frac3{25}}=\frac23,\qquad P\left(k=2\mid E\right)=\frac{\frac1{25}}{\frac3{25}}=\frac13`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`操作2・操作3は玉を戻すので、2回の試行は独立である。戻さない場合と確率が変わる。`,
          ],
          check: String.raw`$P\left(E\right)=\dfrac3{25}$、条件付き確率は $\dfrac23$ と $\dfrac13$ で、分数のまま計算した値と一致した。`,
        },
        {
          label: "(3)",
          task: String.raw`同じ条件（操作3まで行って記録された色がいずれも赤）のもとで、操作4で箱 $\mathrm{A}$ と箱 $\mathrm{B}$ から1個ずつ取り出したとき、赤玉と青玉が1個ずつ取り出される確率を求める`,
          answer: String.raw`$\dfrac5{12}$`,
          approach: String.raw`$E$ のもとでの箱 $\mathrm{B}$ の中身は「赤赤」「赤青」「赤白」が等確率になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(1) の注より、操作1のあとの箱 $\mathrm{B}$ の中身は「赤赤」が $\dfrac1{25}$、「赤青」が $\dfrac4{25}$、「赤白」が $\dfrac4{25}$ である。$E$ の起こる確率は「赤青」も「赤白」もどちらも $\dfrac14$ なので、$E$ のもとでの条件付き確率は`,
            },
            {
              k: "math",
              t: String.raw`\frac1{25}\cdot1:\frac4{25}\cdot\frac14:\frac4{25}\cdot\frac14=\frac1{25}:\frac1{25}:\frac1{25}`,
            },
            {
              k: "p",
              t: String.raw`すなわち「赤赤」「赤青」「赤白」がそれぞれ $\dfrac13$ である（$\dfrac13+\dfrac13=\dfrac23$ が (2) の「赤1個だけ」と合う）。`,
            },
            {
              k: "p",
              t: String.raw`箱 $\mathrm{A}$ からは赤・青がそれぞれ $\dfrac12$ で出る。箱 $\mathrm{B}$ からは入っている2個がそれぞれ $\dfrac12$ で出る。赤と青が1個ずつになる確率を中身ごとに求めると`,
            },
            {
              k: "steps",
              items: [
                String.raw`「赤赤」… 箱 $\mathrm{B}$ は必ず赤。箱 $\mathrm{A}$ が青であればよく $\dfrac12$`,
                String.raw`「赤青」… $\left(\mathrm{A}=\text{赤},\mathrm{B}=\text{青}\right)$ と $\left(\mathrm{A}=\text{青},\mathrm{B}=\text{赤}\right)$ で $\dfrac14+\dfrac14=\dfrac12$`,
                String.raw`「赤白」… $\left(\mathrm{A}=\text{青},\mathrm{B}=\text{赤}\right)$ だけで $\dfrac14$`,
              ],
            },
            { k: "p", t: String.raw`である。よって求める確率は` },
            {
              k: "math",
              t: String.raw`\frac13\left(\frac12+\frac12+\frac14\right)=\frac13\cdot\frac54=\frac5{12}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`(2) では「赤が1個だけ」をまとめて $\dfrac23$ としたが、(3) では青か白かで結果が変わるので分けて扱う。`,
          ],
          check: String.raw`条件付き分布を分数のまま持って操作4まで計算すると $\dfrac5{12}=0.4167$ だった。`,
        },
      ],
    },
    {
      no: 3,
      field: "整数",
      topics: ["下1桁の周期", "合同式", "周期の最小公倍数", "条件を満たす番号の並び"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$3^{n}-2^{n}$ を $10$ で割った余りは $n=1,\\ldots,8$ で $1,5,9,5,1,5,9,5$ と周期 $4$ で繰り返した",
          "$r_{n}=7$ となる $n$ を小さい順に並べると $7,8,9,18,27,28,29,38,47,48,49,58,\\ldots$ で、周期 $20$ ごとに4つずつ",
          "$a_{100}=498$（全探索）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$n$ を正の整数とするとき、$3^{n}-2^{n}$ を $10$ で割った余りを求める`,
          answer: String.raw`$n\equiv1$ のとき $1$、$n\equiv3$ のとき $9$、$n$ が偶数のとき $5$（いずれも $\bmod4$ で、$n\equiv0,2$ をまとめて「偶数」とした）`,
          approach: String.raw`$3^{n}$ も $2^{n}$ も下1桁が周期 $4$ で繰り返す。`,
          blocks: [
            { k: "p", t: String.raw`$3^{n}$ を $10$ で割った余りは $n=1,2,3,4$ で $3,9,7,1$ となり、以後 $3^{4}\equiv1$ より周期 $4$ で繰り返す。$2^{n}$ の余りも $n=1,2,3,4$ で $2,4,8,6$ となり、$2^{n+4}=16\cdot2^{n}\equiv6\cdot2^{n}$ から $n\geqq1$ では周期 $4$ で繰り返す。よって` },
            {
              k: "steps",
              items: [
                String.raw`$n\equiv1\pmod4$ … $3-2=1$`,
                String.raw`$n\equiv2\pmod4$ … $9-4=5$`,
                String.raw`$n\equiv3\pmod4$ … $7-8=-1\equiv9$`,
                String.raw`$n\equiv0\pmod4$ … $1-6=-5\equiv5$`,
              ],
            },
            { k: "p", t: String.raw`である。まとめると、余りは $n$ が奇数で $n\equiv1\pmod4$ のとき $1$、$n\equiv3\pmod4$ のとき $9$、$n$ が偶数のときは $n\equiv0,2\pmod4$ のどちらでも $5$ である。` },
          ],
          pitfalls: [
            String.raw`$2^{n}$ の下1桁が $2,4,8,6$ を繰り返すのは $n\geqq1$ のとき。$2^{0}=1$ は列に入らない。`,
          ],
          check: String.raw`$n=1,\ldots,8$ で余りは $1,5,9,5,1,5,9,5$ だった。`,
        },
        {
          label: "(2)",
          task: String.raw`$3^{n}-2^{n}+4n$ を $10$ で割った余りを $r_{n}$ とする。$r_{n}=7$ となる $n$ を小さい順に並べた数列を $\left\{a_{m}\right\}$ とするとき、$a_{100}$ を求める`,
          answer: String.raw`$a_{100}=498$`,
          approach: String.raw`$3^{n}-2^{n}$ は周期 $4$、$4n$ は周期 $5$ なので、$r_{n}$ は周期 $20$ で繰り返す。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$4n$ を $10$ で割った余りは $n\equiv1,2,3,4,0\pmod5$ に対して $4,8,2,6,0$ で、周期は $5$ である。(1) より $3^{n}-2^{n}$ の余りの周期は $4$ なので、$r_{n}$ は周期 $\mathrm{lcm}\left(4,5\right)=20$ で繰り返す。`,
            },
            { k: "p", t: String.raw`$n=1$ から $20$ まで $r_{n}$ を並べると` },
            {
              k: "math",
              t: String.raw`5,\ 3,\ 1,\ 1,\ 1,\ 9,\ \mathbf{7},\ \mathbf{7},\ \mathbf{7},\ 5,\ 3,\ 3,\ 3,\ 1,\ 9,\ 9,\ 9,\ \mathbf{7},\ 5,\ 5`,
            },
            { k: "p", t: String.raw`となり、$r_{n}=7$ となるのは` },
            { k: "math", t: String.raw`n\equiv7,\ 8,\ 9,\ 18\pmod{20}` },
            {
              k: "p",
              t: String.raw`の4通りである。つまり $20$ 個ごとに4つずつ現れるので、$k=0,1,2,\ldots$ として`,
            },
            {
              k: "steps",
              items: [
                String.raw`$a_{4k+1}=20k+7$`,
                String.raw`$a_{4k+2}=20k+8$`,
                String.raw`$a_{4k+3}=20k+9$`,
                String.raw`$a_{4k+4}=20k+18$`,
              ],
            },
            { k: "p", t: String.raw`である。$100=4\cdot24+4$ なので $k=24$ の4番目にあたり` },
            { k: "math", t: String.raw`a_{100}=20\cdot24+18=498` },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`実際に並べると $7,8,9,18,27,28,29,38,47,48,49,58,\ldots$ となる。`,
            },
          ],
          pitfalls: [
            String.raw`$100$ 番目は $4$ で割り切れるので、各周期の「4つ目」である $20k+18$ の形になる。$20k+7$ の形と間違えやすい。`,
          ],
          check: String.raw`$n=1$ から $700$ まで全探索して $r_{n}=7$ となる $n$ を並べると、$100$ 番目は $498$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "三角関数・積分法",
      topics: ["2曲線の共有点", "面積の計算", "合成と三角比", "比から条件式を作る"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$p=2+\\sqrt3$、$q=1$ で $S_{1},S_{2}$ を数値積分すると $6.595754113,\\ 1.131652498$ で、式 $\\sqrt{p^{2}+q^{2}}+p-q$、$\\sqrt{p^{2}+q^{2}}-p+q$ と一致した",
          "その比は $5.828427125$ で $\\tfrac{\\sqrt2+1}{\\sqrt2-1}=5.828427125$ と一致した",
          "$\\alpha=0.261799388=\\tfrac\\pi{12}$、$\\beta=3.403392041=\\tfrac{13}{12}\\pi$",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$f\left(x\right)=p\sin x$、$g\left(x\right)=q\cos x$（$p>0,q>0$）について、$y=f\left(x\right)$ と $y=g\left(x\right)$ の $0\leqq x\leqq\pi$、$\pi\leqq x\leqq2\pi$ における共有点の $x$ 座標をそれぞれ $\alpha,\beta$ とする。$\alpha\leqq x\leqq\pi$、$y\geqq0$ で2曲線と $x$ 軸とで囲まれた部分の面積を $S_{1}$、$\dfrac\pi2\leqq x\leqq\beta$、$y\leqq0$ で2曲線と $x$ 軸とで囲まれた部分の面積を $S_{2}$ とする。$S_{1}:S_{2}=\left(\sqrt2+1\right):\left(\sqrt2-1\right)$ のときの $\alpha,\beta$ を求める`,
          answer: String.raw`$\alpha=\dfrac\pi{12}$、$\beta=\dfrac{13}{12}\pi$`,
          approach: String.raw`$S_{1},S_{2}$ を $p,q$ で表すと、どちらも $\sqrt{p^{2}+q^{2}}$ と $p-q$ だけで書ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$p\sin x=q\cos x$ を解く。$\cos x=0$ のときは左辺が $\pm p\neq0$ なので共有点ではない。よって両辺を $\cos x$ で割って`,
            },
            { k: "math", t: String.raw`\tan x=\frac qp\ \left(>0\right)` },
            {
              k: "p",
              t: String.raw`である。$0\leqq x\leqq\pi$ でこれを満たすのは $0<\alpha<\dfrac\pi2$ のただ1つ、$\pi\leqq x\leqq2\pi$ でこれを満たすのは $\beta=\alpha+\pi$ のただ1つである。`,
            },
            { k: "p", t: String.raw`$\tan\alpha=\dfrac qp$、$0<\alpha<\dfrac\pi2$ より` },
            {
              k: "math",
              t: String.raw`\cos\alpha=\frac{p}{\sqrt{p^{2}+q^{2}}},\qquad\sin\alpha=\frac{q}{\sqrt{p^{2}+q^{2}}}`,
            },
            { k: "p", t: String.raw`である。$k=\sqrt{p^{2}+q^{2}}$ とおくと、あとで出てくる` },
            { k: "math", t: String.raw`p\cos\alpha+q\sin\alpha=\frac{p^{2}+q^{2}}{k}=k` },
            { k: "p", t: String.raw`が効く。` },
            {
              k: "p",
              t: String.raw`**$S_{1}$**　$\alpha\leqq x\leqq\dfrac\pi2$ では $\cos x>0$ で $\tan x\geqq\dfrac qp$ だから $p\sin x\geqq q\cos x\geqq0$ である。$\dfrac\pi2\leqq x\leqq\pi$ では $q\cos x\leqq0$ なので、$y\geqq0$ の部分の下の境界は $x$ 軸になる。よって`,
            },
            {
              k: "math",
              t: String.raw`S_{1}=\int_{\alpha}^{\frac\pi2}\left(p\sin x-q\cos x\right)dx+\int_{\frac\pi2}^{\pi}p\sin x\,dx`,
            },
            { k: "p", t: String.raw`である。計算すると` },
            {
              k: "math",
              t: String.raw`\Bigl[-p\cos x-q\sin x\Bigr]_{\alpha}^{\frac\pi2}=-q+p\cos\alpha+q\sin\alpha=k-q`,
            },
            {
              k: "math",
              t: String.raw`\Bigl[-p\cos x\Bigr]_{\frac\pi2}^{\pi}=p`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S_{1}=k+p-q` },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$S_{2}$**　$\dfrac\pi2\leqq x\leqq\pi$ では $p\sin x\geqq0$ なので、$y\leqq0$ の部分の上の境界は $x$ 軸、下の境界は $q\cos x\leqq0$ である。$\pi\leqq x\leqq\beta$ では $p\sin x\leqq0$、$q\cos x\leqq0$ で、$\cos x<0$ と $\tan x\leqq\dfrac qp$ から $p\sin x\geqq q\cos x$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`S_{2}=\int_{\frac\pi2}^{\pi}\left(-q\cos x\right)dx+\int_{\pi}^{\beta}\left(p\sin x-q\cos x\right)dx`,
            },
            { k: "p", t: String.raw`である。$\cos\beta=-\cos\alpha$、$\sin\beta=-\sin\alpha$ を使うと` },
            {
              k: "math",
              t: String.raw`\Bigl[-q\sin x\Bigr]_{\frac\pi2}^{\pi}=q,\qquad\Bigl[-p\cos x-q\sin x\Bigr]_{\pi}^{\beta}=p\cos\alpha+q\sin\alpha-p=k-p`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S_{2}=k-p+q` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "p = 2 + √3、q = 1 のときの y = p sin x と y = q cos x。alpha は 0 から pi の範囲の交点、beta は pi から 2pi の範囲の交点。上の塗りが S1、下の塗りが S2。",
                view: [-0.35, 3.75, -1.35, 3.95],
                items: [
                  { k: "fill", pts: S1PTS },
                  { k: "fill", pts: S2PTS },
                  { k: "curve", f: F24, from: 0, to: 3.7 },
                  { k: "curve", f: G24, from: 0, to: 3.7 },
                  { k: "dot", at: [AL24, F24(AL24)] },
                  { k: "dot", at: [BE24, F24(BE24)] },
                  { k: "text", at: [AL24, -0.12], label: "α", place: "below-left" },
                  { k: "text", at: [BE24, 0.12], label: "β", place: "above-right" },
                  { k: "text", at: [2.0, 1.5], label: "S1", place: "above" },
                  { k: "text", at: [2.75, -0.45], label: "S2", place: "below" },
                ],
              },
            },
            { k: "p", t: String.raw`**比の条件**　$d=p-q$ とおくと $S_{1}=k+d$、$S_{2}=k-d$ である。$S_{1}:S_{2}=\left(\sqrt2+1\right):\left(\sqrt2-1\right)$ より` },
            {
              k: "math",
              t: String.raw`\left(k+d\right)\left(\sqrt2-1\right)=\left(k-d\right)\left(\sqrt2+1\right)`,
            },
            { k: "p", t: String.raw`で、展開して整理すると $2\sqrt2\,d=2k$、つまり` },
            { k: "math", t: String.raw`\sqrt2\left(p-q\right)=\sqrt{p^{2}+q^{2}}` },
            { k: "p", t: String.raw`である。$k>0$ なので $p>q$ である。両辺を2乗して` },
            {
              k: "math",
              t: String.raw`2\left(p-q\right)^{2}=p^{2}+q^{2},\qquad p^{2}-4pq+q^{2}=0`,
            },
            { k: "p", t: String.raw`である。$q>0$ で割ると $\left(\dfrac pq\right)^{2}-4\cdot\dfrac pq+1=0$ なので` },
            { k: "math", t: String.raw`\frac pq=2\pm\sqrt3` },
            { k: "p", t: String.raw`で、$p>q$ より $\dfrac pq=2+\sqrt3$ である。したがって` },
            {
              k: "math",
              t: String.raw`\tan\alpha=\frac qp=\frac1{2+\sqrt3}=2-\sqrt3`,
            },
            {
              k: "p",
              t: String.raw`である。$\tan\dfrac\pi{12}=\tan\left(\dfrac\pi3-\dfrac\pi4\right)=\dfrac{\sqrt3-1}{1+\sqrt3}=2-\sqrt3$ で、$0<\alpha<\dfrac\pi2$ だから`,
            },
            {
              k: "math",
              t: String.raw`\alpha=\frac\pi{12},\qquad\beta=\alpha+\pi=\frac{13}{12}\pi`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$S_{1}$ は $\dfrac\pi2$ を境に下の境界が $y=g\left(x\right)$ から $x$ 軸に変わる。1本の積分で済ませない。`,
            String.raw`$S_{2}$ も $x=\pi$ を境に上の境界が $x$ 軸から $y=f\left(x\right)$ に変わる。`,
            String.raw`$p,q$ は1つに決まらない（比だけが決まる）。決まるのは $\dfrac qp$、つまり $\alpha$ である。`,
          ],
          check: String.raw`$p=2+\sqrt3$、$q=1$ で数値積分すると $S_{1}=6.595754$、$S_{2}=1.131652$ で、比は $5.828427=\dfrac{\sqrt2+1}{\sqrt2-1}$ だった。`,
        },
      ],
    },
  ],
};
