import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 京都大学 2021年度（令和3年度）一般選抜 前期日程 数学（理系）。
 *
 * 実物の問題冊子にあたって、大問・小問の番号まで照合したうえで6問とも自分で解き直した。
 * 他社の解答解説は見ていない。問題文・図・表は1つも載せていない。
 * 京都大学は古い年度の問題を公開していないので、リンクは張らない。
 */

/** 第2問の図。y=(x²+1)/2 と、L が最小になる接線（p=1/√2）。 */
const CV2 = (x: number) => (x * x + 1) / 2;
const P2 = 1 / Math.SQRT2;
const PY2 = CV2(P2);
const QX2 = (P2 * P2 - 1) / (2 * P2);
const TG2 = (x: number) => P2 * x - (P2 * P2 - 1) / 2;

/** 第4問の図。y=log(1+cos x)。 */
const CV4 = (x: number) => Math.log(1 + Math.cos(x));

/** 第5問の図。外接円と垂心の軌跡。 */
const RT3 = Math.sqrt(3);
const A5ANG = (70 * Math.PI) / 180;
const AX5 = 2 * Math.cos(A5ANG);
const AY5 = 2 * Math.sin(A5ANG);

export const kyodaiRikei2021: SolutionSet = {
  slug: "kyodai-rikei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "理系",
  university: "京都大学",
  short: "京大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "空間ベクトル／確率",
      topics: ["平面に関する対称点", "法線ベクトル", "包除原理", "初めて起こる確率"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{Q}=\\left(\\frac{13}9,\\frac59,\\frac{11}9\\right)$ について、$\\mathrm{PQ}$ の中点が平面 $2x-2y+z=2$ 上にあり、$\\overrightarrow{\\mathrm{PQ}}$ が法線 $(2,-2,1)$ と平行であることを座標で確かめた",
          "$n=4$ から $8$ まで $4^{n}$ 通りの記録をすべて列挙すると、確率は $\\frac3{128},\\frac9{256},\\frac{75}{2048},\\frac{135}{4096},\\frac{903}{32768}$ となり、$\\frac{3^{n-1}-3\\cdot2^{n-1}+3}{4^{n}}$ と完全に一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$\mathrm{A}(1,0,0)$、$\mathrm{B}(0,-1,0)$、$\mathrm{C}(0,0,2)$ を通る平面 $\alpha$ に関して $\mathrm{P}(1,1,1)$ と対称な点 $\mathrm{Q}$ を求める`,
          answer: String.raw`$\mathrm{Q}\left(\dfrac{13}{9},\;\dfrac59,\;\dfrac{11}{9}\right)$`,
          approach: String.raw`3点が座標軸上にあるので、平面は切片形 $\frac x1+\frac y{-1}+\frac z2=1$ ですぐ書ける。あとは法線ベクトルの向きに $\mathrm{P}$ から動かすだけで、$\mathrm{Q}=\mathrm{P}+t\vec n$ とおいて中点が平面上に乗る $t$ を決める。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{A},\mathrm{B},\mathrm{C}$ はそれぞれ $x,y,z$ 軸上の点なので、平面 $\alpha$ は切片形で`,
            },
            {
              k: "math",
              t: String.raw`\frac x1+\frac y{-1}+\frac z2=1\quad\Longleftrightarrow\quad2x-2y+z=2`,
            },
            {
              k: "p",
              t: String.raw`と書ける。法線ベクトルは $\vec n=(2,-2,1)$ で $\left|\vec n\right|^{2}=9$ である。`,
            },
            {
              k: "p",
              t: String.raw`**対称点を作る。** $\mathrm{PQ}\perp\alpha$ より $\overrightarrow{\mathrm{PQ}}=t\vec n$ と書けるので $\mathrm{Q}=(1+2t,\;1-2t,\;1+t)$ である。中点`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{M}=\left(1+t,\;1-t,\;1+\frac t2\right)`,
            },
            { k: "p", t: String.raw`が $\alpha$ 上にあるので` },
            {
              k: "math",
              t: String.raw`2(1+t)-2(1-t)+\left(1+\frac t2\right)=2\;\Longrightarrow\;\frac92t+1=2\;\Longrightarrow\;t=\frac29`,
            },
            { k: "p", t: String.raw`である。よって` },
            {
              k: "math",
              t: String.raw`\mathrm{Q}=\left(1+\frac49,\;1-\frac49,\;1+\frac29\right)=\left(\frac{13}{9},\;\frac59,\;\frac{11}{9}\right)`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$\mathrm{P}$ を平面に代入すると $2-2+1=1$ で、右辺 $2$ との差は $-1$ である。公式 $\mathrm{Q}=\mathrm{P}-\dfrac{2\left(\vec n\cdot\mathrm{P}-d\right)}{\left|\vec n\right|^{2}}\vec n$ に入れても $t=\dfrac29$ が出る。`,
            },
          ],
          pitfalls: [
            String.raw`切片形は「軸との交点が $(p,0,0),(0,q,0),(0,0,r)$ なら $\frac xp+\frac yq+\frac zr=1$」である。$\mathrm{B}$ の $y$ 切片が $-1$ なので分母が $-1$ になる。`,
            String.raw`$\overrightarrow{\mathrm{PQ}}=t\vec n$ とおけるのは「$\mathrm{PM}$ が垂線」という条件そのものである。$t$ は中点が平面上に乗る条件から決まる。`,
            String.raw`$t$ を求めたあと、$\mathrm{Q}=\mathrm{P}+t\vec n$（中点ではない）に戻す。`,
          ],
          check: String.raw`$\mathrm{Q}\left(\frac{13}9,\frac59,\frac{11}9\right)$ のとき中点は $\left(\frac{11}9,\frac79,\frac{10}9\right)$ で、$2\cdot\frac{11}9-2\cdot\frac79+\frac{10}9=\frac{18}9=2$ となり平面上にある。$\overrightarrow{\mathrm{PQ}}=\left(\frac49,-\frac49,\frac29\right)=\frac29(2,-2,1)$ で法線と平行である。`,
        },
        {
          label: "問2",
          task: String.raw`$n$ 回目に初めて赤玉が出て、その時点で4色すべてが記録済みになる確率を求める（$n\ge4$）`,
          answer: String.raw`$\dfrac{3^{n-1}-3\cdot2^{n-1}+3}{4^{n}}$`,
          approach: String.raw`条件は「$n$ 回目が赤」かつ「最初の $n-1$ 回が赤以外の3色だけで、しかも3色すべてが出る」である。後半は「3色で $n-1$ 回、全色が出る」という典型的な包除原理の問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n$ 回目に初めて赤が出るので、最初の $n-1$ 回は白・青・黄のいずれかである。さらに $n$ 回目で4色そろうには、その $n-1$ 回で白・青・黄が**すべて**出ていなければならない。`,
            },
            {
              k: "p",
              t: String.raw`**$n-1$ 回で3色すべてが出る場合の数。** 全部で $3^{n-1}$ 通りのうち、少なくとも1色が出ないものを包除原理で引くと`,
            },
            {
              k: "math",
              t: String.raw`3^{n-1}-{}_{3}\mathrm{C}_{1}\cdot2^{n-1}+{}_{3}\mathrm{C}_{2}\cdot1^{n-1}=3^{n-1}-3\cdot2^{n-1}+3`,
            },
            {
              k: "p",
              t: String.raw`通りである（3色とも出ない場合は $0$ 通り）。$n$ 回目は赤の1通りだから、条件をみたす記録の列は`,
            },
            { k: "math", t: String.raw`3^{n-1}-3\cdot2^{n-1}+3\ \text{通り}` },
            {
              k: "p",
              t: String.raw`である。各回の記録は4色が等確率なので、どの列も確率 $\left(\dfrac14\right)^{n}$ である。よって`,
            },
            {
              k: "math",
              t: String.raw`P=\frac{3^{n-1}-3\cdot2^{n-1}+3}{4^{n}}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`$n=4$ では $\dfrac{27-24+3}{256}=\dfrac6{256}=\dfrac3{128}$ で、最初の3回が白・青・黄の並べ替え（$3!=6$ 通り）、4回目が赤、という数え方と合う。`,
            },
          ],
          pitfalls: [
            String.raw`「4種類すべてが記録済み」は $n$ 回目を含めての話である。赤は $n$ 回目に出るので、残り3色が最初の $n-1$ 回で出そろう必要がある。`,
            String.raw`玉は毎回戻すので、各回は独立で確率 $\frac14$ ずつである。戻さない場合と混同しない。`,
            String.raw`包除原理の最後の項 $+{}_{3}\mathrm{C}_{2}\cdot1^{n-1}=3$ を落とさない。「2色が出ない」＝「1色だけ」の場合である。`,
          ],
          check: String.raw`$n=4,\dots,8$ について $4^{n}$ 通りをすべて列挙すると、確率は $\frac3{128},\frac9{256},\frac{75}{2048},\frac{135}{4096},\frac{903}{32768}$ で、式の値と完全に一致する。`,
        },
      ],
    },
    {
      no: 2,
      field: "微分法",
      topics: ["接線", "線分の長さ", "相加相乗平均", "置き換え"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$p$ を $0$ から $3$ まで $400$ 万点動かして $\\mathrm{PQ}$ を座標から直接計算すると、最小 $1.299038106$（$p=0.707106$）となり、$\\frac{3\\sqrt3}{4}=1.299038106$、$p=\\frac1{\\sqrt2}=0.707107$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$y=\dfrac{x^{2}+1}{2}$ 上の点 $\mathrm{P}$ での接線が $x$ 軸と交わる点を $\mathrm{Q}$ とするとき、$L=\mathrm{PQ}$ の最小値を求める`,
          answer: String.raw`$L_{\min}=\dfrac{3\sqrt3}{4}$`,
          approach: String.raw`接点を $\mathrm{P}\left(p,\frac{p^{2}+1}{2}\right)$ とおくと、$x$ 軸との交点がすぐ出る。$L^{2}$ を計算すると $\frac{\left(p^{2}+1\right)^{3}}{4p^{2}}$ という形になり、$u=p^{2}$ とおけば1変数の最小値問題になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$y'=x$ なので、$\mathrm{P}\left(p,\dfrac{p^{2}+1}{2}\right)$ での接線は`,
            },
            {
              k: "math",
              t: String.raw`y=p(x-p)+\frac{p^{2}+1}{2}=px-\frac{p^{2}-1}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$x$ 軸と交わるには傾き $p\ne0$ が必要で、そのとき`,
            },
            {
              k: "math",
              t: String.raw`\mathrm{Q}\left(\frac{p^{2}-1}{2p},\;0\right)`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**$L^{2}$ を計算する。** $x$ 座標の差は` },
            {
              k: "math",
              t: String.raw`p-\frac{p^{2}-1}{2p}=\frac{2p^{2}-p^{2}+1}{2p}=\frac{p^{2}+1}{2p}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`L^{2}=\left(\frac{p^{2}+1}{2p}\right)^{2}+\left(\frac{p^{2}+1}{2}\right)^{2}=\left(\frac{p^{2}+1}{2}\right)^{2}\cdot\frac{1+p^{2}}{p^{2}}=\frac{\left(p^{2}+1\right)^{3}}{4p^{2}}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**最小化。** $u=p^{2}>0$ とおくと` },
            {
              k: "math",
              t: String.raw`L^{2}=\frac{(u+1)^{3}}{4u}=:G(u)`,
            },
            { k: "p", t: String.raw`で` },
            {
              k: "math",
              t: String.raw`G'(u)=\frac{3(u+1)^{2}\cdot4u-(u+1)^{3}\cdot4}{16u^{2}}=\frac{(u+1)^{2}(2u-1)}{4u^{2}}`,
            },
            {
              k: "p",
              t: String.raw`である。$u>0$ では $(u+1)^{2}>0$ なので、$G$ は $u<\dfrac12$ で減少、$u>\dfrac12$ で増加し、$u=\dfrac12$ で最小になる。値は`,
            },
            {
              k: "math",
              t: String.raw`G\left(\frac12\right)=\frac{\left(\frac32\right)^{3}}{4\cdot\frac12}=\frac{\frac{27}8}{2}=\frac{27}{16}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`L_{\min}=\sqrt{\frac{27}{16}}=\frac{3\sqrt3}{4}`,
            },
            {
              k: "p",
              t: String.raw`である（$p=\pm\dfrac1{\sqrt2}$ のとき、$1.2990$ ほど）。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=\frac{x^{2}+1}{2}$ と、$\mathrm{PQ}$ が最小になる接線（$p=\frac1{\sqrt2}$）。$\mathrm{P}\left(0.707,0.75\right)$、$\mathrm{Q}\left(-0.354,0\right)$ で $L=\frac{3\sqrt3}{4}=1.299$。`,
                view: [-1.25, 1.85, -0.38, 1.65],
                step: { x: 1, y: 1 },
                items: [
                  { k: "curve", f: CV2, from: -1.15, to: 1.75 },
                  { k: "seg", a: [-0.65, TG2(-0.65)], b: [1.55, TG2(1.55)], dash: true },
                  { k: "seg", a: [QX2, 0], b: [P2, PY2] },
                  { k: "dot", at: [P2, PY2], label: "P", place: "above-left" },
                  { k: "dot", at: [QX2, 0], label: "Q", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`「接線が $x$ 軸と交わる」ので $p\ne0$ である（$p=0$ だと接線 $y=\frac12$ は $x$ 軸と平行）。問題文にその断りがあるので、$p\ne0$ を前提にしてよい。`,
            String.raw`$L^{2}$ の形 $\frac{\left(p^{2}+1\right)^{3}}{4p^{2}}$ まで整理してから $u=p^{2}$ とおく。$p$ のまま微分すると式が重い。`,
            String.raw`$L$ ではなく $L^{2}$ を最小にする。$L>0$ なので同じ場所で最小になる。`,
          ],
          check: String.raw`$p$ を $0$ から $3$ まで $400$ 万点動かして $\mathrm{PQ}$ を座標から直接計算すると、最小は $1.299038106$（$p=0.707106$）で、$\frac{3\sqrt3}{4}=1.299038106$、$\frac1{\sqrt2}=0.707107$ と一致する。`,
        },
      ],
    },
    {
      no: 3,
      field: "複素数平面・極限",
      topics: ["無限等比級数", "複素数の等比数列", "実部をとる", "有理化"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\sum_{n=0}^{399}\\left(\\frac12\\right)^{n}\\cos\\frac{n\\pi}{6}$ を直接足すと $1.476627109439$ となり、$\\frac{14+3\\sqrt3}{13}=1.476627109439$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$\displaystyle\sum_{n=0}^{\infty}\left(\frac12\right)^{n}\cos\frac{n\pi}{6}$ を求める`,
          answer: String.raw`$\dfrac{14+3\sqrt3}{13}$`,
          approach: String.raw`$\cos$ は複素数の実部なので、$z=\frac12\left(\cos\frac\pi6+i\sin\frac\pi6\right)$ とおくと、求める和は等比級数 $\sum z^{n}$ の実部である。$|z|=\frac12<1$ なので収束し、$\frac1{1-z}$ の実部を取るだけでよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$z=\dfrac12\left(\cos\dfrac\pi6+i\sin\dfrac\pi6\right)$ とおく。ド・モアブルの定理より`,
            },
            {
              k: "math",
              t: String.raw`z^{n}=\left(\frac12\right)^{n}\left(\cos\frac{n\pi}{6}+i\sin\frac{n\pi}{6}\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、求める和は $\displaystyle\sum_{n=0}^{\infty}z^{n}$ の実部である。$|z|=\dfrac12<1$ だからこの等比級数は収束し`,
            },
            { k: "math", t: String.raw`\sum_{n=0}^{\infty}z^{n}=\frac{1}{1-z}` },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**計算する。** $\cos\dfrac\pi6=\dfrac{\sqrt3}{2}$、$\sin\dfrac\pi6=\dfrac12$ なので` },
            {
              k: "math",
              t: String.raw`z=\frac{\sqrt3}{4}+\frac14i,\qquad1-z=\frac{4-\sqrt3}{4}-\frac14i`,
            },
            { k: "p", t: String.raw`である。分母を実数化すると` },
            {
              k: "math",
              t: String.raw`\left|1-z\right|^{2}=\frac{\left(4-\sqrt3\right)^{2}+1}{16}=\frac{16-8\sqrt3+3+1}{16}=\frac{20-8\sqrt3}{16}=\frac{5-2\sqrt3}{4}`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\mathrm{Re}\frac1{1-z}=\frac{\mathrm{Re}\left(\overline{1-z}\right)}{\left|1-z\right|^{2}}=\frac{\frac{4-\sqrt3}{4}}{\frac{5-2\sqrt3}{4}}=\frac{4-\sqrt3}{5-2\sqrt3}`,
            },
            { k: "p", t: String.raw`である。分母を有理化して` },
            {
              k: "math",
              t: String.raw`\frac{\left(4-\sqrt3\right)\left(5+2\sqrt3\right)}{\left(5-2\sqrt3\right)\left(5+2\sqrt3\right)}=\frac{20+8\sqrt3-5\sqrt3-6}{25-12}=\frac{14+3\sqrt3}{13}`,
            },
            { k: "p", t: String.raw`を得る（$1.4766$ ほど）。` },
            {
              k: "note",
              t: String.raw`実数のまま進めるなら、$S=\sum r^{n}\cos n\theta$、$T=\sum r^{n}\sin n\theta$ とおいて加法定理から連立方程式を作ってもよい。一般に $S=\dfrac{1-r\cos\theta}{1-2r\cos\theta+r^{2}}$ で、$r=\frac12$、$\theta=\frac\pi6$ を入れると同じ値になる。`,
            },
          ],
          pitfalls: [
            String.raw`$|z|=\frac12<1$ を確かめてから $\frac1{1-z}$ を使う。収束の確認は省かない。`,
            String.raw`実部を取るのは**最後**である。途中で $\cos$ だけ追うと加法定理の計算が増える。`,
            String.raw`$\left|1-z\right|^{2}$ は $\left(\mathrm{Re}\right)^{2}+\left(\mathrm{Im}\right)^{2}$ である。$1-z$ の虚部は $-\frac14$ で、2乗すれば符号は消える。`,
          ],
          check: String.raw`$n=0$ から $399$ まで直接足すと $1.476627109439$ で、$\frac{14+3\sqrt3}{13}=1.476627109439$ と一致する。`,
        },
      ],
    },
    {
      no: 4,
      field: "積分法",
      topics: ["曲線の長さ", "半角の公式", "1/cos の積分", "置換積分"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\int_0^{\\pi/2}\\sqrt{1+y'^{2}}\\,dx$ を $400$ 万点で数値積分すると $1.762747174$ となり、$2\\log\\left(1+\\sqrt2\\right)=1.762747174$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "",
          task: String.raw`$y=\log(1+\cos x)$ の $0\le x\le\dfrac\pi2$ の部分の長さを求める`,
          answer: String.raw`$2\log\left(1+\sqrt2\right)$`,
          approach: String.raw`$y'$ を半角で書き直すのが決め手である。$1+\cos x=2\cos^{2}\frac x2$、$\sin x=2\sin\frac x2\cos\frac x2$ を使うと $y'=-\tan\frac x2$ となり、$\sqrt{1+y'^{2}}$ が $\frac1{\cos(x/2)}$ になる。`,
          blocks: [
            { k: "p", t: String.raw`$0\le x\le\dfrac\pi2$ では $1+\cos x>0$ である。` },
            {
              k: "math",
              t: String.raw`y'=\frac{-\sin x}{1+\cos x}=\frac{-2\sin\frac x2\cos\frac x2}{2\cos^{2}\frac x2}=-\tan\frac x2`,
            },
            { k: "p", t: String.raw`なので` },
            {
              k: "math",
              t: String.raw`\sqrt{1+y'^{2}}=\sqrt{1+\tan^{2}\frac x2}=\frac{1}{\cos\frac x2}`,
            },
            {
              k: "p",
              t: String.raw`である（$0\le\dfrac x2\le\dfrac\pi4$ で $\cos\dfrac x2>0$）。よって長さは`,
            },
            {
              k: "math",
              t: String.raw`\ell=\int_{0}^{\frac\pi2}\frac{dx}{\cos\frac x2}`,
            },
            { k: "p", t: String.raw`である。$u=\dfrac x2$（$dx=2du$、$u:0\to\dfrac\pi4$）とおくと` },
            {
              k: "math",
              t: String.raw`\ell=2\int_{0}^{\frac\pi4}\frac{du}{\cos u}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**$\dfrac1{\cos u}$ の積分。** 分母分子に $\cos u$ を掛けて $s=\sin u$ とおくと`,
            },
            {
              k: "math",
              t: String.raw`\int\frac{du}{\cos u}=\int\frac{\cos u\,du}{1-\sin^{2}u}=\int\frac{ds}{1-s^{2}}=\frac12\log\left|\frac{1+s}{1-s}\right|`,
            },
            { k: "p", t: String.raw`である。$u:0\to\dfrac\pi4$ で $s:0\to\dfrac1{\sqrt2}$ だから` },
            {
              k: "math",
              t: String.raw`\ell=2\cdot\frac12\left[\log\frac{1+s}{1-s}\right]_{0}^{\frac1{\sqrt2}}=\log\frac{1+\frac1{\sqrt2}}{1-\frac1{\sqrt2}}=\log\frac{\sqrt2+1}{\sqrt2-1}`,
            },
            { k: "p", t: String.raw`である。分母を有理化すると $\dfrac{\sqrt2+1}{\sqrt2-1}=\left(\sqrt2+1\right)^{2}$ なので` },
            {
              k: "math",
              t: String.raw`\ell=\log\left(1+\sqrt2\right)^{2}=2\log\left(1+\sqrt2\right)`,
            },
            { k: "p", t: String.raw`である（$1.7627$ ほど）。` },
            {
              k: "figure",
              fig: {
                caption: String.raw`$y=\log(1+\cos x)$ の $0\le x\le\frac\pi2$ の部分。$x=0$ で $y=\log2=0.693$、$x=\frac\pi2$ で $y=0$。この弧の長さが $2\log\left(1+\sqrt2\right)=1.763$。`,
                view: [-0.18, 1.78, -0.16, 0.88],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "curve", f: CV4, from: 0, to: Math.PI / 2 },
                  { k: "dot", at: [0, Math.log(2)], label: "log 2", place: "above-right" },
                  { k: "dot", at: [Math.PI / 2, 0], label: "π/2", place: "below-right" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\sqrt{1+\tan^{2}\theta}=\dfrac1{\left|\cos\theta\right|}$ で、絶対値がつく。ここでは $0\le\frac x2\le\frac\pi4$ なので外せる。`,
            String.raw`$\dfrac1{\cos u}$ の積分は、$\cos u$ を掛けて $\sin u$ で置換するのが定石である。$\log\left|\tan\left(\frac u2+\frac\pi4\right)\right|$ の公式を覚えていなくても出せる。`,
            String.raw`$\dfrac{\sqrt2+1}{\sqrt2-1}=\left(\sqrt2+1\right)^{2}$ に気づくと、$\log$ の係数 $2$ がきれいに出る。`,
          ],
          check: String.raw`$400$ 万点の数値積分で $1.762747174$ となり、$2\log\left(1+\sqrt2\right)=1.762747174$ と一致する。`,
        },
      ],
    },
    {
      no: 5,
      field: "図形と方程式",
      topics: ["円周角", "外心", "垂心", "軌跡"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$\\mathrm{A}$ を円 $x^{2}+y^{2}=4$ の上半分に $2000$ 点とると、$\\angle\\mathrm{BAC}$ はすべて $60.000000^\\circ$ になり、外心が原点であることを確かめた",
          "同じ $\\mathrm{A}$ について $\\mathrm{H}=\\mathrm{A}+\\mathrm{B}+\\mathrm{C}$ がすべて $x^{2}+(y+2)^{2}=4$ の上にあり、$y$ 座標が $-2$ より大きく $0$ 以下であることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\triangle\mathrm{ABC}$ の外心の座標を求める`,
          answer: String.raw`原点 $(0,0)$`,
          approach: String.raw`$\mathrm{BC}$ の長さと $\angle\mathrm{BAC}$ が決まっているので、正弦定理で外接円の半径が出る。外心は $\mathrm{BC}$ の垂直二等分線（$y$ 軸）上にあり、半径の条件から2か所に絞れる。$\angle\mathrm{BAC}<90^\circ$ なので、$\mathrm{A}$ と同じ側のほうが外心である。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{BC}=2\sqrt3$ である。正弦定理より、外接円の半径を $R$ とすると`,
            },
            {
              k: "math",
              t: String.raw`\frac{\mathrm{BC}}{\sin\angle\mathrm{BAC}}=2R\;\Longrightarrow\;2R=\frac{2\sqrt3}{\sin\frac\pi3}=\frac{2\sqrt3}{\frac{\sqrt3}{2}}=4\;\Longrightarrow\;R=2`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**位置を決める。** 外心は $\mathrm{BC}$ の垂直二等分線、すなわち $y$ 軸上にある。$(0,k)$ とおくと $\mathrm{B}$ までの距離が $2$ だから`,
            },
            {
              k: "math",
              t: String.raw`3+(k+1)^{2}=4\;\Longrightarrow\;(k+1)^{2}=1\;\Longrightarrow\;k=0\ \text{または}\ k=-2`,
            },
            {
              k: "p",
              t: String.raw`である。$\angle\mathrm{BAC}=\dfrac\pi3<\dfrac\pi2$ なので $\mathrm{A}$ は優弧の上にあり、外心は $\mathrm{BC}$ について $\mathrm{A}$ と同じ側にある。$\mathrm{A}$ の $y$ 座標は正で、直線 $\mathrm{BC}$ は $y=-1$ だから、外心も $y>-1$ の側、つまり $k=0$ である。よって外心は`,
            },
            { k: "math", t: String.raw`(0,\,0)` },
            {
              k: "p",
              t: String.raw`である。実際 $\mathrm{OB}=\mathrm{OC}=\sqrt{3+1}=2$ で、$\mathrm{A}$ は円 $x^{2}+y^{2}=4$ の $y>0$ の部分を動く。`,
            },
          ],
          pitfalls: [
            String.raw`$k=-2$ のほうは、$\mathrm{A}$ が劣弧の上にある場合（このとき $\angle\mathrm{BAC}=\frac{2\pi}{3}$）に対応する。$\angle\mathrm{BAC}$ が鋭角か鈍角かで外心の側が変わる。`,
            String.raw`逆に、$\mathrm{A}$ が円 $x^{2}+y^{2}=4$ の $y>0$ の部分を動けば、円周角の定理から $\angle\mathrm{BAC}=\frac\pi3$ がつねに成り立つ。これが (2) の前提になる。`,
          ],
          check: String.raw`$\mathrm{A}$ を円 $x^{2}+y^{2}=4$ の上半分に $2000$ 点とると、$\angle\mathrm{BAC}$ はすべて $60.000000^\circ$ になった。$\mathrm{OA}=\mathrm{OB}=\mathrm{OC}=2$ である。`,
        },
        {
          label: "(2)",
          task: String.raw`$\mathrm{A}$ が条件をみたしながら動くときの $\triangle\mathrm{ABC}$ の垂心の軌跡を求める`,
          answer: String.raw`円 $x^{2}+(y+2)^{2}=4$ の $y>-2$ の部分（両端 $(\pm2,-2)$ は除く）`,
          approach: String.raw`外心を原点にとれたので、「垂心 $=$ 3頂点の位置ベクトルの和」が使える。$\mathrm{B}+\mathrm{C}=(0,-2)$ は定ベクトルなので、垂心は $\mathrm{A}$ を $(0,-2)$ だけ平行移動した点になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`外心が原点 $\mathrm{O}$ のとき、垂心 $\mathrm{H}$ については`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{OH}}=\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}`,
            },
            {
              k: "p",
              t: String.raw`が成り立つ。実際、$\mathrm{H}'$ をこの式で定めると`,
            },
            {
              k: "math",
              t: String.raw`\overrightarrow{\mathrm{AH}'}=\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}},\qquad\overrightarrow{\mathrm{BC}}=\overrightarrow{\mathrm{OC}}-\overrightarrow{\mathrm{OB}}`,
            },
            {
              k: "p",
              t: String.raw`で、$\left|\overrightarrow{\mathrm{OB}}\right|=\left|\overrightarrow{\mathrm{OC}}\right|$ より内積は $\left|\overrightarrow{\mathrm{OC}}\right|^{2}-\left|\overrightarrow{\mathrm{OB}}\right|^{2}=0$、つまり $\mathrm{AH}'\perp\mathrm{BC}$ である。同様に $\mathrm{BH}'\perp\mathrm{CA}$ なので、$\mathrm{H}'$ は垂心である。`,
            },
            { k: "p", t: String.raw`**計算する。** $\mathrm{B}+\mathrm{C}=\left(-\sqrt3+\sqrt3,\;-1-1\right)=(0,-2)$ なので` },
            {
              k: "math",
              t: String.raw`\mathrm{H}=\mathrm{A}+(0,-2)`,
            },
            {
              k: "p",
              t: String.raw`である。$\mathrm{A}=\left(a_1,a_2\right)$ は $a_1^{2}+a_2^{2}=4$、$a_2>0$ を動くので、$\mathrm{H}=(x,y)$ とおくと $a_1=x$、$a_2=y+2$ で`,
            },
            {
              k: "math",
              t: String.raw`x^{2}+(y+2)^{2}=4,\qquad y+2>0`,
            },
            {
              k: "p",
              t: String.raw`である。逆に、この条件をみたす $(x,y)$ に対して $\mathrm{A}=(x,y+2)$ は条件 $(*)$ をみたすので、軌跡はこの全体である。すなわち`,
            },
            {
              k: "math",
              t: String.raw`\text{円 }x^{2}+(y+2)^{2}=4\text{ の }y>-2\text{ の部分}`,
            },
            {
              k: "p",
              t: String.raw`（中心 $(0,-2)$、半径 $2$ の円の上半分で、両端 $(\pm2,-2)$ は含まない）である。`,
            },
            {
              k: "figure",
              fig: {
                caption: String.raw`外接円 $x^{2}+y^{2}=4$（薄い円）の上半分を $\mathrm{A}$ が動く。垂心 $\mathrm{H}=\mathrm{A}+(0,-2)$ の軌跡は、円 $x^{2}+(y+2)^{2}=4$ の $y>-2$ の部分（濃い弧）。`,
                view: [-4.0, 4.0, -4.5, 2.5],
                step: { x: 1, y: 1 },
                items: [
                  {
                    k: "param",
                    f: (t: number): [number, number] => [2 * Math.cos(t), 2 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                    faint: true,
                  },
                  {
                    k: "param",
                    f: (t: number): [number, number] => [2 * Math.cos(t), 2 * Math.sin(t) - 2],
                    from: 0,
                    to: Math.PI,
                  },
                  { k: "seg", a: [-RT3, -1], b: [RT3, -1], faint: true },
                  { k: "seg", a: [AX5, AY5], b: [AX5, AY5 - 2], dash: true },
                  { k: "dot", at: [-RT3, -1], label: "B", place: "left" },
                  { k: "dot", at: [RT3, -1], label: "C", place: "right" },
                  { k: "dot", at: [AX5, AY5], label: "A", place: "above-right" },
                  { k: "dot", at: [AX5, AY5 - 2], label: "H", place: "right" },
                  { k: "dot", at: [0, 0], label: "外心 O", place: "above-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`$\overrightarrow{\mathrm{OH}}=\overrightarrow{\mathrm{OA}}+\overrightarrow{\mathrm{OB}}+\overrightarrow{\mathrm{OC}}$ が使えるのは $\mathrm{O}$ が**外心**のときである。(1) で外心が原点だと分かったことがそのまま効く。`,
            String.raw`両端 $(\pm2,-2)$ は $a_2=0$（$\mathrm{A}$ が $x$ 軸上）に対応し、条件「$\mathrm{A}$ の $y$ 座標は正」から外れる。開いた弧になる。`,
            String.raw`「軌跡を求めよ」なので逆も言う。$y>-2$ の各点が実際に垂心として現れることを確かめる。`,
          ],
          check: String.raw`$\mathrm{A}$ を上半円に $2000$ 点とって $\mathrm{H}=\mathrm{A}+\mathrm{B}+\mathrm{C}$ を計算すると、すべて $x^{2}+(y+2)^{2}=4$ をみたし、$y$ の範囲は $-1.996858$ から $0$ までだった（$\mathrm{A}=(0,2)$ のとき $\mathrm{H}=(0,0)$）。`,
        },
      ],
    },
    {
      no: 6,
      field: "整数／微分法",
      topics: ["因数分解", "対偶", "平均値の定理", "接線が原点を通る条件"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-12",
      review: {
        sourceChecked: true,
        verified: [
          "$2\\le n\\le40$ で $3^{n}-2^{n}$ が素数になるのは $n=2,3,5,17,29,31$ だけで、いずれも素数であることを確かめた",
          "$f(a)=af(1)$ をみたす2次式を $2000$ 個ランダムに作り、$(1,a)$ に $f(t)=tf'(t)$ の解があることを確かめた（反例 $0$ 件）",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "問1",
          task: String.raw`$n\ge2$ の整数について、$3^{n}-2^{n}$ が素数ならば $n$ も素数であることを示す`,
          answer: String.raw`対偶を示す。$n=ab$（$a,b\ge2$）なら $3^{a}-2^{a}$ が $3^{n}-2^{n}$ の真の約数になる`,
          approach: String.raw`対偶「$n$ が合成数なら $3^{n}-2^{n}$ は素数でない」を示す。$x^{b}-y^{b}$ が $x-y$ で割り切れることを、$x=3^{a}$、$y=2^{a}$ に使えばよい。`,
          blocks: [
            {
              k: "p",
              t: String.raw`対偶「$n$ が合成数ならば $3^{n}-2^{n}$ は素数でない」を示す。$n=ab$（$2\le a<n$、$b\ge2$）とする。`,
            },
            { k: "p", t: String.raw`$x=3^{a}$、$y=2^{a}$ とおくと` },
            {
              k: "math",
              t: String.raw`3^{n}-2^{n}=x^{b}-y^{b}=(x-y)\left(x^{b-1}+x^{b-2}y+\cdots+y^{b-1}\right)`,
            },
            {
              k: "p",
              t: String.raw`なので、$3^{n}-2^{n}$ は $d=3^{a}-2^{a}$ で割り切れる。`,
            },
            { k: "p", t: String.raw`**$d$ が真の約数であること。** ` },
            {
              k: "steps",
              items: [
                String.raw`$a\ge2$ より $d=3^{a}-2^{a}\ge3^{2}-2^{2}=5>1$。`,
                String.raw`$m\mapsto3^{m}-2^{m}$ は狭義増加である（$\left(3^{m+1}-2^{m+1}\right)-\left(3^{m}-2^{m}\right)=2\cdot3^{m}-2^{m}>0$）。$a<n$ なので $d<3^{n}-2^{n}$。`,
              ],
            },
            {
              k: "p",
              t: String.raw`よって $3^{n}-2^{n}$ は $1$ でも自分自身でもない約数 $d$ をもち、素数ではない。対偶が示されたので、もとの命題も成り立つ。`,
            },
            {
              k: "note",
              t: String.raw`逆は成り立たない。$n=7$ は素数だが $3^{7}-2^{7}=2187-128=2059=29\times71$ で素数ではない。`,
            },
          ],
          pitfalls: [
            String.raw`$n$ が合成数のとき $n=ab$ と書けるが、$a,b$ の両方が $2$ 以上であることを明記する。$a=1$ だと $d=1$ になってしまう。`,
            String.raw`$d>1$ と $d<3^{n}-2^{n}$ の**両方**を言う。片方だけでは「真の約数」にならない。`,
            String.raw`$3^{n}-2^{n}>0$ である（$n\ge1$）。負の数の素数判定を気にしなくてよい。`,
          ],
          check: String.raw`$2\le n\le40$ で $3^{n}-2^{n}$ が素数になるのは $n=2,3,5,17,29,31$ だけで、いずれも素数である。合成数の $n$ では必ず合成数になっている。`,
        },
        {
          label: "問2",
          task: String.raw`$a>1$、$f$ は微分可能で $f(a)=af(1)$ のとき、$y=f(x)$ の接線で原点を通るものが存在することを示す`,
          answer: String.raw`$g(x)=\dfrac{f(x)}{x}$ に平均値の定理を使うと $g'(t)=0$ となる $t\in(1,a)$ があり、そこでの接線が原点を通る`,
          approach: String.raw`点 $(t,f(t))$ での接線が原点を通る条件は $f(t)=tf'(t)$ である。これは $\dfrac{f(x)}{x}$ の導関数の分子なので、$g(x)=\dfrac{f(x)}{x}$ を考えればよい。条件 $f(a)=af(1)$ は $g(a)=g(1)$ と同じことである。`,
          blocks: [
            {
              k: "p",
              t: String.raw`**接線が原点を通る条件。** $(t,f(t))$ での接線は $y=f'(t)(x-t)+f(t)$ で、これが原点 $(0,0)$ を通るのは`,
            },
            {
              k: "math",
              t: String.raw`0=-tf'(t)+f(t)\quad\Longleftrightarrow\quad f(t)=tf'(t)`,
            },
            { k: "p", t: String.raw`のときである。この $t$ が存在することを示せばよい。` },
            {
              k: "p",
              t: String.raw`**$g(x)=\dfrac{f(x)}{x}$ を考える。** $a>1$ なので区間 $[1,a]$ では $x\ge1>0$ であり、$f$ が微分可能だから $g$ も $[1,a]$ で連続、$(1,a)$ で微分可能である。また`,
            },
            {
              k: "math",
              t: String.raw`g(1)=f(1),\qquad g(a)=\frac{f(a)}{a}=\frac{af(1)}{a}=f(1)`,
            },
            { k: "p", t: String.raw`なので $g(1)=g(a)$ である。` },
            {
              k: "p",
              t: String.raw`**平均値の定理。** $g$ に平均値の定理を使うと、$t\in(1,a)$ で`,
            },
            {
              k: "math",
              t: String.raw`g'(t)=\frac{g(a)-g(1)}{a-1}=0`,
            },
            { k: "p", t: String.raw`となるものが存在する。いっぽう` },
            {
              k: "math",
              t: String.raw`g'(x)=\frac{f'(x)x-f(x)}{x^{2}}`,
            },
            {
              k: "p",
              t: String.raw`なので、$g'(t)=0$ は $tf'(t)-f(t)=0$、すなわち $f(t)=tf'(t)$ を意味する（$t>0$ より分母は $0$ でない）。`,
            },
            {
              k: "p",
              t: String.raw`したがって、点 $\left(t,f(t)\right)$ での接線は原点を通る。そのような接線が存在することが示された。`,
            },
            {
              k: "note",
              t: String.raw`$f(a)=af(1)$ は「$(1,f(1))$ と $(a,f(a))$ が原点から見て同じ向きにある」、つまり $\dfrac{f(1)}{1}=\dfrac{f(a)}{a}$ ということである。原点から見た傾きが両端で等しいので、途中で「原点を向いた接線」が必ず現れる、というのが図形的な意味である。`,
            },
          ],
          pitfalls: [
            String.raw`$g(x)=\frac{f(x)}{x}$ が $[1,a]$ で定義できるのは $a>1>0$ だからである。$0$ をまたぐ区間だと使えない。`,
            String.raw`接線が原点を通る条件を $f(t)=tf'(t)$ と書き直すところが出発点である。$\frac{f(t)}{t}=f'(t)$（原点との傾き $=$ 接線の傾き）と見てもよい。`,
            String.raw`平均値の定理の結論は「$t$ が存在する」であって、$t$ を具体的に求めることはできない。存在を示せば十分である。`,
          ],
          check: String.raw`$f(a)=af(1)$ をみたす2次式を $2000$ 個ランダムに作り、$(1,a)$ で $f(t)-tf'(t)$ の符号変化を調べると、すべての場合で零点が見つかった（反例 $0$ 件）。`,
        },
      ],
    },
  ],
};
