import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋市立大学 医学部医学科 2019年度（平成31年度）一般選抜 前期日程 数学。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで4問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 第3問は問題に点の配置の図が添えられているが、当サイトでは問題の図は載せず、
 * 座標から読み取れることを言葉で書いている。
 */

/** 第2問(3) で条件を満たす $\vec q$ の座標。$q_{1}=m$、$q_{2}^{2}=\tfrac{4m}{n}-m^{2}$。 */
const Q19: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let m = -4; m <= 4; m++) {
    if (m === 0) continue;
    for (let n = -4; n <= 4; n++) {
      if (n === 0 || m * n < 1 || m * n > 4) continue;
      const sq = (4 * m) / n - m * m;
      if (sq < -1e-12) continue;
      pts.push([m, Math.sqrt(Math.max(0, sq))]);
    }
  }
  return pts;
})();

export const ncuMed2019: SolutionSet = {
  slug: "ncu-med",
  year: 2019,
  subject: "数学",
  schedule: "前期日程",
  division: "医学部医学科",
  university: "名古屋市立大学",
  short: "名市大医",
  source: null,
  questions: [
    {
      no: 1,
      field: "積分法",
      topics: ["符号の変わる関数の面積", "場合分け", "置き換えて2次関数の最小", "対数の計算"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$a=0.3,0.6,\\tfrac1{\\sqrt2},0.9,1.5$ で $\\int_{a}^{2a}\\left|f\\right|dx$ を数値積分し、場合分けした式と小数9桁まで一致した",
          "$a$ を $0.001$ 刻みで走査すると最小は $a=0.707$ で $S=0.2402266$、$\\tfrac{\\left(\\log2\\right)^{2}}2=0.2402265$ と合った",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f\left(x\right)=\dfrac2x\log x$（$x>0$）とする。$a>0$ に対し、曲線 $y=f\left(x\right)$ と $x$ 軸および直線 $x=a$、$x=2a$ で囲まれた部分の面積 $S\left(a\right)$ を求める`,
          answer: String.raw`$0<a\leqq\dfrac12$ で $\left(\log a\right)^{2}-\left(\log2a\right)^{2}$、$\dfrac12<a<1$ で $\left(\log a\right)^{2}+\left(\log2a\right)^{2}$、$a\geqq1$ で $\left(\log2a\right)^{2}-\left(\log a\right)^{2}$`,
          approach: String.raw`$\left\{\left(\log x\right)^{2}\right\}'=\dfrac{2\log x}{x}=f\left(x\right)$。$f$ の符号は $x$ と $1$ の大小で変わるので、$1$ が区間 $\left[a,2a\right]$ に入るかで分ける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\left\{\left(\log x\right)^{2}\right\}'=2\log x\cdot\dfrac1x=f\left(x\right)$ なので、$F\left(x\right)=\left(\log x\right)^{2}$ が $f$ の原始関数である。`,
            },
            {
              k: "p",
              t: String.raw`$f\left(x\right)$ の符号は $\log x$ の符号と同じで、$0<x<1$ で負、$x=1$ で $0$、$x>1$ で正である。$1$ が $\left[a,2a\right]$ のどこに来るかで3つに分ける。`,
            },
            {
              k: "p",
              t: String.raw`**$a\geqq1$ のとき**　区間全体で $f\geqq0$ なので`,
            },
            {
              k: "math",
              t: String.raw`S\left(a\right)=\int_{a}^{2a}f\left(x\right)dx=\left(\log2a\right)^{2}-\left(\log a\right)^{2}`,
            },
            { k: "p", t: String.raw`**$2a\leqq1$、つまり $0<a\leqq\dfrac12$ のとき**　区間全体で $f\leqq0$ なので` },
            {
              k: "math",
              t: String.raw`S\left(a\right)=-\int_{a}^{2a}f\left(x\right)dx=\left(\log a\right)^{2}-\left(\log2a\right)^{2}`,
            },
            { k: "p", t: String.raw`**$\dfrac12<a<1$ のとき**　$a<1<2a$ で、$\left[a,1\right]$ では負、$\left[1,2a\right]$ では正だから` },
            {
              k: "math",
              t: String.raw`S\left(a\right)=-\int_{a}^{1}f\,dx+\int_{1}^{2a}f\,dx=\left(\log a\right)^{2}+\left(\log2a\right)^{2}`,
            },
            { k: "p", t: String.raw`である（$\log1=0$ を使った）。` },
            {
              k: "note",
              t: String.raw`$\left(\log2a\right)^{2}-\left(\log a\right)^{2}=\left(\log2a+\log a\right)\left(\log2a-\log a\right)=\log2\left(\log2+2\log a\right)$ と因数分解できる。$a\geqq1$ でも $a\leqq\dfrac12$ でも、$S$ は $\log a$ の1次式になる。`,
            },
          ],
          pitfalls: [
            String.raw`「$x$ 軸および $x=a,x=2a$ で囲まれた部分」なので、$f$ が負の区間では $-f$ を積分する。符号をそのままにしない。`,
          ],
          check: String.raw`$a=0.3,0.6,\dfrac1{\sqrt2},0.9,1.5$ で数値積分すると、場合分けした式と小数9桁まで一致した。`,
        },
        {
          label: "(2)",
          task: String.raw`$S\left(a\right)$ が最小となるときの $a$ と、そのときの $S\left(a\right)$ を求める`,
          answer: String.raw`$a=\dfrac1{\sqrt2}=\dfrac{\sqrt2}{2}$ のとき最小値 $\dfrac{\left(\log2\right)^{2}}{2}$`,
          approach: String.raw`$u=\log a$ とおくと、どの場合も $u$ の1次式か2次式になる。真ん中の場合が下に凸の2次関数。`,
          blocks: [
            { k: "p", t: String.raw`$u=\log a$、$L=\log2>0$ とおく。$\log2a=u+L$ である。` },
            {
              k: "steps",
              items: [
                String.raw`$a\geqq1$（$u\geqq0$）… $S=\left(u+L\right)^{2}-u^{2}=L^{2}+2Lu$。$u$ について増加なので最小は $u=0$、つまり $a=1$ で $S=L^{2}$。`,
                String.raw`$0<a\leqq\dfrac12$（$u\leqq-L$）… $S=u^{2}-\left(u+L\right)^{2}=-L^{2}-2Lu$。$u$ について減少なので最小は $u=-L$、つまり $a=\dfrac12$ で $S=-L^{2}+2L^{2}=L^{2}$。`,
                String.raw`$\dfrac12<a<1$（$-L<u<0$）… $S=u^{2}+\left(u+L\right)^{2}=2u^{2}+2Lu+L^{2}$。`,
              ],
            },
            { k: "p", t: String.raw`である。3つ目を平方完成すると` },
            {
              k: "math",
              t: String.raw`S=2\left(u+\frac L2\right)^{2}+\frac{L^{2}}{2}`,
            },
            {
              k: "p",
              t: String.raw`で、頂点 $u=-\dfrac L2$ は $-L<u<0$ の範囲に入っている。そこでの値 $\dfrac{L^{2}}{2}$ は、他の2つの場合の最小値 $L^{2}$ より小さい。よって全体の最小は`,
            },
            {
              k: "math",
              t: String.raw`\log a=-\frac{\log2}{2},\qquad a=2^{-\frac12}=\frac1{\sqrt2}=\frac{\sqrt2}{2}`,
            },
            { k: "p", t: String.raw`のときで、最小値は` },
            { k: "math", t: String.raw`S=\frac{\left(\log2\right)^{2}}{2}` },
            {
              k: "p",
              t: String.raw`である（$0.2402\ldots$）。このとき $\log a=-\dfrac{\log2}{2}$、$\log2a=\dfrac{\log2}{2}$ で、2つの部分の面積がちょうど等しくなっている。`,
            },
          ],
          pitfalls: [
            String.raw`3つの場合の最小値を比べる。真ん中の場合の頂点が範囲に入っているかどうかも確かめる。`,
          ],
          check: String.raw`$a$ を $0.001$ 刻みで走査すると最小は $a=0.707$ で $S=0.2402266$、$\dfrac{\left(\log2\right)^{2}}2=0.2402265$ と合った。`,
        },
      ],
    },
  ],
};
