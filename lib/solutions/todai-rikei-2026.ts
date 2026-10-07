import { todaiBunkei2026 } from "@/lib/solutions/todai-bunkei-2026";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東京大学 2026年度（令和8年度）一般選抜 前期日程 数学（理科）。
 *
 * 実物の問題冊子を理科・文科の両方で突き合わせたところ、
 * **理科の第2問・第4問は、文科の第2問・第4問と同じ問題**だった
 * （第4問は、文科にあった正接の加法定理の小問が理科では省かれている）。
 * 同じ問題に別々の解説を置くと食い違いが生まれるので、解説は文科の側から借りる。
 *
 * 問題文・図・表は1つも載せていない。
 */

const bunkei = (no: number) => todaiBunkei2026.questions.find((q) => q.no === no)!;

/** 文科 第2問（格子点と三角形）。理科では第2問。問題文も小問も同じ。 */
const sharedKakuritsu: Question = { ...bunkei(2), no: 2 };

/** 文科 第4問（3次曲線の接線）。理科では加法定理の小問がなく、2問構成になる。 */
const sharedSessen: Question = {
  ...bunkei(4),
  no: 4,
  subs: [
    { ...bunkei(4).subs[1], label: "(1)" },
    { ...bunkei(4).subs[2], label: "(2)" },
  ],
};

export const todaiRikei2026: SolutionSet = {
  slug: "todai-rikei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "理科",
  university: "東京大学",
  short: "東大理系",
  source: null,
  questions: [
    {
      no: 1,
      field: "微分積分",
      topics: ["奇関数の増減", "sin θ の多項式評価", "定積分の評価", "符号が一定であること"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$M=\\sin1-\\frac56$ を数値で確かめ、$f$ が $[-1,1]$ で増加であることを細かい格子で確かめた",
          "$\\int_0^{2\\pi}\\sin(\\cos x-x)dx$ を数値積分し、$\\frac78\\pi$ と $\\frac78\\pi+4M$ の間に収まることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(\theta)=\sin\theta-\theta+\dfrac{\theta^{3}}{6}$ の $[-1,1]$ での最大値 $M$ と最小値 $m$ を求める`,
          answer: String.raw`$M=\sin1-\dfrac56,\qquad m=\dfrac56-\sin1\ (=-M)$`,
          approach: String.raw`$f'(\theta)=\cos\theta-1+\dfrac{\theta^{2}}{2}$ の符号を見る。これをさらに微分すると $\theta-\sin\theta$ になり、符号がはっきりする。`,
          blocks: [
            { k: "math", t: String.raw`f'(\theta)=\cos\theta-1+\frac{\theta^{2}}{2},\qquad f''(\theta)=\theta-\sin\theta` },
            {
              k: "p",
              t: String.raw`$\theta>0$ では $\theta>\sin\theta$、$\theta<0$ では $\theta<\sin\theta$ なので、$f'$ は $\theta=0$ で最小。$f'(0)=0$ だから $f'(\theta)\ge0$ で、等号は $\theta=0$ のときだけ。`,
            },
            {
              k: "p",
              t: String.raw`よって $f$ は $[-1,1]$ で増加（狭義）。端での値が最大・最小になる。`,
            },
            {
              k: "math",
              t: String.raw`M=f(1)=\sin1-1+\frac16=\sin1-\frac56,\qquad m=f(-1)=-\sin1+\frac56`,
            },
            {
              k: "note",
              t: String.raw`$\sin\theta,\ \theta,\ \theta^{3}$ はどれも奇関数なので $f(-\theta)=-f(\theta)$ であり、$f$ 自身も奇関数である。だから $m=-M$ になり、(2) でこの対称性が効いてくる。`,
            },
          ],
          check: String.raw`$\sin1=0.8414709\ldots$、$\dfrac56=0.8333\ldots$ なので $M=0.0081376\ldots$。正の小さな値で、$\sin\theta$ が $\theta-\dfrac{\theta^{3}}{6}$ よりわずかに大きいことを表している。`,
          pitfalls: [
            String.raw`$f'$ の符号を直接は読めない。もう一度微分して $\theta-\sin\theta$ にすると、$f'$ が $\theta=0$ で最小値 $0$ をとることが分かる。`,
            String.raw`$f$ が奇関数であることに触れておくと、$m=-M$ がすぐ出て (2) につながる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\dfrac78\pi\le\displaystyle\int_0^{2\pi}\sin(\cos x-x)\,dx\le\dfrac78\pi+4M$ を示す`,
          answer: String.raw`加法定理で分けると片方が $0$ になり、残りに (1) を $\theta=\cos x$ として適用する`,
          approach: String.raw`$\sin(\cos x-x)$ を加法定理でほどくと、$\sin x$ を含むほうは置換で $0$ になる。残った $\sin(\cos x)\cos x$ に、$|\cos x|\le1$ だから (1) がそのまま使える。`,
          blocks: [
            { k: "math", t: String.raw`\sin(\cos x-x)=\sin(\cos x)\cos x-\cos(\cos x)\sin x` },
            {
              k: "p",
              t: String.raw`後ろの項は $\dfrac{d}{dx}\big(-\sin(\cos x)\big)=\cos(\cos x)\sin x$ だから`,
            },
            {
              k: "math",
              t: String.raw`\int_0^{2\pi}\cos(\cos x)\sin x\,dx=\Big[-\sin(\cos x)\Big]_0^{2\pi}=0`,
            },
            { k: "p", t: String.raw`よって $I=\displaystyle\int_0^{2\pi}\sin(\cos x)\cos x\,dx$ を評価すればよい。$\theta=\cos x$ とおくと $|\theta|\le1$ なので、(1) の $f$ を使って` },
            {
              k: "math",
              t: String.raw`\sin(\cos x)\cos x=\left(\cos x-\frac{\cos^{3}x}{6}\right)\cos x+f(\cos x)\cos x`,
            },
            { k: "p", t: String.raw`第1項の積分は` },
            {
              k: "math",
              t: String.raw`\int_0^{2\pi}\left(\cos^{2}x-\frac{\cos^{4}x}{6}\right)dx=\pi-\frac16\cdot\frac{3\pi}{4}=\frac{7}{8}\pi`,
            },
            {
              k: "p",
              t: String.raw`残りを評価する。$f$ は**奇関数で増加**だから $f(\theta)$ は $\theta$ と同じ符号をもち、$f(\cos x)\cos x\ge0$。さらに $|f(\theta)|\le M$ なので`,
            },
            {
              k: "math",
              t: String.raw`0\le f(\cos x)\cos x=|f(\cos x)|\,|\cos x|\le M|\cos x|`,
            },
            { k: "p", t: String.raw`$\displaystyle\int_0^{2\pi}|\cos x|\,dx=4$ だから` },
            { k: "math", t: String.raw`0\le\int_0^{2\pi}f(\cos x)\cos x\,dx\le4M` },
            { k: "p", t: String.raw`以上を足して $\dfrac78\pi\le I\le\dfrac78\pi+4M$。` },
          ],
          check: String.raw`数値で $I=2.76460\ldots$、$\dfrac78\pi=2.74889\ldots$、$\dfrac78\pi+4M=2.78144\ldots$。確かに間に入っている。`,
          pitfalls: [
            String.raw`下からの評価で $-4M$ ではなく $0$ まで詰められるのが要点。$f$ が奇関数で増加だから $f(\theta)\theta\ge0$ が言える。単に $|f|\le M$ と押さえると $\dfrac78\pi-4M$ までしか出ない。`,
            String.raw`$\displaystyle\int_0^{2\pi}\cos^{4}x\,dx=\dfrac{3\pi}{4}$。半角を2回使うか、$\dfrac{3}{8}\cdot2\pi$ と覚えておく。`,
          ],
        },
      ],
    },
    sharedKakuritsu,
    {
      no: 3,
      field: "空間図形・軌跡",
      topics: ["球面と平面の交わり", "重心の条件", "弦の中点", "通過領域と双曲線"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "中点 $\\mathrm{M}$ が円 $(x-3)^{2}+y^{2}=4$ 上に乗ることを、$\\mathrm{P},\\mathrm{Q}$ を数値で取って確かめた",
          "(2) の領域を、多数の弦を実際に引いて点を打ち、$5(x-3)^{2}-4y^{2}\\le20$ かつ $x^{2}+y^{2}\\le25$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`線分 $\mathrm{PQ}$ の中点 $\mathrm{M}$ の軌跡を求める`,
          answer: String.raw`円 $(x-3)^{2}+y^{2}=4$ から点 $(5,0)$ を除いたもの`,
          approach: String.raw`重心の条件を $\mathrm{R}$ について解くと、$\mathrm{R}$ が $\mathrm{M}$ だけで決まる。$\mathrm{R}$ が球面上にあることが、そのまま $\mathrm{M}$ の条件になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{P},\mathrm{Q}$ は $xy$ 平面上の $S$ 上、つまり円 $x^{2}+y^{2}=25,\ z=0$ 上にある。$\mathrm{M}(u,v,0)$ とすると $\vec{\mathrm{OP}}+\vec{\mathrm{OQ}}=(2u,2v,0)$ で、重心の条件から`,
            },
            { k: "math", t: String.raw`\mathrm{R}=(6-2u,\ -2v,\ 3)` },
            { k: "p", t: String.raw`$\mathrm{R}$ も $S$ 上なので $|\mathrm{R}|=5$、すなわち` },
            {
              k: "math",
              t: String.raw`(6-2u)^{2}+4v^{2}+9=25\ \Longleftrightarrow\ (u-3)^{2}+v^{2}=4`,
            },
            {
              k: "p",
              t: String.raw`逆に、この円上の $\mathrm{M}$ に対して、$\mathrm{M}$ を中点とする弦 $\mathrm{PQ}$ が取れるのは $|\mathrm{OM}|<5$ のとき（$\mathrm{P}\ne\mathrm{Q}$ が要る）。この円上では`,
            },
            { k: "math", t: String.raw`|\mathrm{OM}|^{2}=u^{2}+v^{2}=u^{2}+4-(u-3)^{2}=6u-5` },
            {
              k: "p",
              t: String.raw`$1\le u\le5$ より $|\mathrm{OM}|^{2}\le25$ で、等号は $u=5$ すなわち $\mathrm{M}(5,0)$ のときだけ。そこを除く。`,
            },
            {
              k: "note",
              t: String.raw`$\mathrm{R}$ の $z$ 座標は $3$ で、$\mathrm{P},\mathrm{Q}$ は $z=0$。だから $\mathrm{R}$ が $\mathrm{P},\mathrm{Q}$ と一致することはなく、条件は自動的に満たされる。`,
            },
          ],
          pitfalls: [
            String.raw`$(5,0)$ を除く一言を落とさない。ここは $\mathrm{P}=\mathrm{Q}$ になってしまい、三角形ができない。`,
            String.raw`$\mathrm{P},\mathrm{Q}$ を個別に置かず、和（＝中点の2倍）だけで $\mathrm{R}$ が書けることに気づくと一気に進む。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`線分 $\mathrm{PQ}$ が通過する範囲を求める`,
          answer: String.raw`$x^{2}+y^{2}\le25$ かつ $\dfrac{(x-3)^{2}}{4}-\dfrac{y^{2}}{5}\le1$ をみたす部分（境界を含む）。ただし点 $(5,0)$ を除く`,
          approach: String.raw`点 $\mathrm{X}$ が弦 $\mathrm{PQ}$ 上にある条件は「$\mathrm{X}-\mathrm{M}$ が $\mathrm{OM}$ と垂直」かつ「$|\mathrm{X}|\le5$」。前者を $\mathrm{M}$ の**存在条件**に読み替える。`,
          blocks: [
            {
              k: "p",
              t: String.raw`中点 $\mathrm{M}$ の弦は $\mathrm{OM}$ に垂直なので、$\mathrm{X}(x,y)$ がその弦上にある条件は $\vec{\mathrm{OX}}\cdot\vec{\mathrm{OM}}=|\mathrm{OM}|^{2}$ かつ $|\mathrm{OX}|\le5$。`,
            },
            {
              k: "p",
              t: String.raw`$\mathrm{M}(u,v)$ は (1) の円上なので $u=3+2\cos\varphi,\ v=2\sin\varphi$ と書ける。$|\mathrm{OM}|^{2}=6u-5$ を使って整理すると`,
            },
            {
              k: "math",
              t: String.raw`xu+yv=6u-5\ \Longleftrightarrow\ (x-6)\cos\varphi+y\sin\varphi=\frac{13-3x}{2}`,
            },
            { k: "p", t: String.raw`これをみたす $\varphi$ が存在する条件は、合成して` },
            {
              k: "math",
              t: String.raw`\left|\frac{13-3x}{2}\right|\le\sqrt{(x-6)^{2}+y^{2}}`,
            },
            { k: "p", t: String.raw`両辺を2乗して整理すると` },
            {
              k: "math",
              t: String.raw`5(x-3)^{2}-4y^{2}\le20\ \Longleftrightarrow\ \frac{(x-3)^{2}}{4}-\frac{y^{2}}{5}\le1`,
            },
            {
              k: "p",
              t: String.raw`これと $x^{2}+y^{2}\le25$ を合わせたものが通過範囲。双曲線 $\dfrac{(x-3)^{2}}{4}-\dfrac{y^{2}}{5}=1$ の2つの分枝に**挟まれた側**（頂点は $(1,0)$ と $(5,0)$）を、半径 $5$ の円板で切り取った形になる。`,
            },
            {
              k: "p",
              t: String.raw`点 $(5,0)$ は $x=5$ を代入すると $\varphi$ の条件が $\mathrm{M}=(5,0)$ を要求するので、(1) で除いた分だけここでも除かれる。`,
            },
          ],
          check: String.raw`双曲線の頂点 $(1,0)$ は $\mathrm{M}=(1,0)$（$|\mathrm{OM}|=1$）の弦の端ではなく中点として実際に到達できる。一方 $(5,0)$ は $\mathrm{M}=(5,0)$ からしか来られず、そこは除外されている。弦を多数引いて点を打つ数値実験でも同じ形になる。`,
          pitfalls: [
            String.raw`「存在条件」に読み替えるのが要点。$\varphi$ を消去しようとすると行き詰まる。$a\cos\varphi+b\sin\varphi$ の合成で $\sqrt{a^{2}+b^{2}}$ を出す。`,
            String.raw`$|\mathrm{OX}|\le5$ を忘れない。双曲線の不等式だけだと、円の外まで含んでしまう。`,
          ],
        },
      ],
    },
    sharedSessen,
    {
      no: 5,
      field: "複素数平面",
      topics: ["3乗と偏角", "円を見込む角", "3倍角の公式", "6回対称な領域の面積"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "(1) の $\\pm\\frac{23}{27}$ を、$z$ を円周上で細かく動かして数値的に確かめた",
          "(2) の領域を $\\alpha$ の細かい格子で判定し、面積を数え上げて $4\\sqrt3$ と一致することを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$\alpha=-3$ のとき $\sin\theta$ のとりうる値の範囲を求める`,
          answer: String.raw`$-\dfrac{23}{27}\le\sin\theta\le\dfrac{23}{27}$`,
          approach: String.raw`$z+3$ は中心 $3$・半径 $1$ の円を動く。原点からこの円を**見込む角**が偏角の振れ幅で、$3$ 乗すると偏角はちょうど3倍になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\zeta=z+3$ は円 $|\zeta-3|=1$ 上を動く。原点からこの円への接線が中心方向となす角を $\beta$ とすると $\sin\beta=\dfrac13$ で、$\arg\zeta$ は $[-\beta,\beta]$ をくまなく動く。`,
            },
            { k: "p", t: String.raw`$w=\zeta^{3}$ だから $\theta=\arg w=3\arg\zeta$ は $[-3\beta,\ 3\beta]$ を動く。3倍角の公式から` },
            {
              k: "math",
              t: String.raw`\sin3\beta=3\sin\beta-4\sin^{3}\beta=3\cdot\frac13-4\cdot\frac1{27}=\frac{23}{27}`,
            },
            {
              k: "p",
              t: String.raw`$\sin\beta=\dfrac13$ より $\beta<\dfrac{\pi}{6}$ なので $3\beta<\dfrac{\pi}{2}$。この範囲で $\sin$ は増加だから、$\sin\theta$ は $-\dfrac{23}{27}$ から $\dfrac{23}{27}$ までをくまなくとる。`,
            },
          ],
          check: String.raw`$\beta=0.33984\ldots$、$3\beta=1.01951\ldots<\dfrac{\pi}{2}=1.5708$。$\sin3\beta=0.85185\ldots=\dfrac{23}{27}$ で一致する。`,
          pitfalls: [
            String.raw`$3\beta$ が $\dfrac{\pi}{2}$ を超えないことを確かめる。超えると $\sin$ が単調でなくなり、最大値が $1$ になってしまう。`,
            String.raw`$\arg\zeta$ の範囲は「円を見込む角」。$\zeta$ の実部・虚部を計算しにいくと遠回りになる。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`条件をみたす $\mathrm{R}(\alpha)$ の動く範囲の面積を求める`,
          answer: String.raw`$4\sqrt3$`,
          approach: String.raw`$w=\zeta^{3}$ が正の実数になるのは $\arg\zeta$ が $0,\ \dfrac{2\pi}{3},\ \dfrac{4\pi}{3}$ のとき、負の実数になるのは $\dfrac{\pi}{3},\ \pi,\ \dfrac{5\pi}{3}$ のとき。**$60^\circ$ ごとの6本の半直線**を、円 $|\zeta+\alpha|=1$ が2本以上またぐかどうかで決まる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\zeta=z-\alpha$ は中心 $c=-\alpha$・半径 $1$ の円 $K$ を動く。6本の半直線は $60^\circ$ おきに並び、隣り合う2本は**必ず正と負で種類が違う**。だから条件は「$K$ が隣り合う2本（以上）と交わる」こと。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$|c|\le1$ のとき … 原点が $K$ の内側か上にあるので、$K$ はすべての方向（または半周ぶん）を覆い、条件を満たす`,
                String.raw`$|c|>1$ のとき … $K$ の見込む角は中心方向 $\psi$ のまわりの $\pm\delta$（$\sin\delta=\dfrac{1}{|c|}$）。この幅に $60^\circ$ 刻みの点が2つ入ればよい`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\psi$ を $60^\circ$ で割った余りを $r$ とすると、2つ入る条件は $r\le\delta$ かつ $60^\circ-r\le\delta$、つまり $\delta\ge\max(r,\,60^\circ-r)$。$\sin\delta=\dfrac1{|c|}$ だから`,
            },
            {
              k: "math",
              t: String.raw`|c|\le\frac{1}{\sin\big(\max(r,\,60^\circ-r)\big)}`,
            },
            {
              k: "p",
              t: String.raw`$\max(r,60^\circ-r)$ は $30^\circ$ 以上 $60^\circ$ 以下なので、右辺は $\dfrac{2}{\sqrt3}$ 以上 $2$ 以下。$|c|\le1$ の場合もこの不等式に含まれる。領域は $60^\circ$ ごとに同じ形がくり返す、6つの尖りをもつ形になる。`,
            },
            { k: "p", t: String.raw`極座標で面積を出す。$0^\circ\le\psi\le60^\circ$ での半径を $R(\psi)$ とすると` },
            {
              k: "math",
              t: String.raw`\text{面積}=6\int_0^{\pi/3}\frac{R(\psi)^{2}}{2}\,d\psi=6\int_{\pi/6}^{\pi/3}\frac{d\psi}{\sin^{2}\psi}=6\Big[-\cot\psi\Big]_{\pi/6}^{\pi/3}`,
            },
            { k: "math", t: String.raw`=6\left(\sqrt3-\frac{1}{\sqrt3}\right)=\frac{12}{\sqrt3}=4\sqrt3` },
            {
              k: "p",
              t: String.raw`$\alpha=-c$ は原点に関する対称移動なので、$\mathrm{R}(\alpha)$ の範囲も同じ面積。`,
            },
          ],
          check: String.raw`半直線の方向（$\psi=0^\circ$）では半径が $\dfrac{2}{\sqrt3}=1.1547$、半直線の中間（$\psi=30^\circ$）では $2$。面積 $4\sqrt3=6.928\ldots$ は、半径 $1.1547$ の円（$4.19$）と半径 $2$ の円（$12.57$）の間に収まる。格子で数え上げても同じ値になる。`,
          pitfalls: [
            String.raw`「正の実軸と負の実軸の両方」は、6本の半直線のうち**隣り合う2本**と交われば満たされる。離れた2本（同じ種類）では足りない。`,
            String.raw`$|c|\le1$ の場合を別に確かめる。ここは見込む角が定義できないが、原点を内部に含むので無条件で成り立つ。`,
            String.raw`積分範囲が $\dfrac{\pi}{6}$ から $\dfrac{\pi}{3}$ になるのは、$\max(r,60^\circ-r)$ が $30^\circ$ から $60^\circ$ を動くから。対称性で2つの区間が同じ積分にまとまる。`,
          ],
        },
      ],
    },
    {
      no: 6,
      field: "整数",
      topics: ["約数の個数", "mod 3 での分類", "乗法性", "偶数乗の条件"],
      ownDifficulty: "難",
      status: "published",
      updated: "2026-10-06",
      review: {
        sourceChecked: true,
        verified: [
          "$f(2800)=16,\\ g(2800)=14$ を約数の全列挙で確かめた",
          "$n\\le200000$ で $f(n)\\ge g(n)$ が成り立つことを全探索で確かめた",
          "$g(n)=15$ となる $n$ を探し、$f(n)$ が $15,16,18,20,30$ のいずれかになることを確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`$f(2800),\ g(2800)$ を求める`,
          answer: String.raw`$f(2800)=16,\qquad g(2800)=14$`,
          approach: String.raw`$2800=2^{4}\cdot5^{2}\cdot7$。$3$ の倍数の素因数がないので、どの約数も $3$ で割って $1$ か $2$ 余る。$\bmod 3$ では $2\equiv2,\ 5\equiv2,\ 7\equiv1$ なので、**$2$ と $5$ の指数の和の偶奇**だけで決まる。`,
          blocks: [
            { k: "p", t: String.raw`約数は $2^{a}5^{b}7^{c}\ (0\le a\le4,\ 0\le b\le2,\ 0\le c\le1)$ で、$\bmod 3$ では` },
            { k: "math", t: String.raw`2^{a}5^{b}7^{c}\equiv2^{a}\cdot2^{b}\cdot1^{c}=2^{a+b}\pmod3` },
            {
              k: "p",
              t: String.raw`$2^{k}\equiv1\ (k\text{ 偶})$、$2^{k}\equiv2\ (k\text{ 奇})$。$a+b$ が偶数になる $(a,b)$ は、ともに偶数が $3\times2=6$ 通り、ともに奇数が $2\times1=2$ 通りで計 $8$ 通り。奇数は $15-8=7$ 通り。`,
            },
            { k: "math", t: String.raw`f(2800)=8\times2=16,\qquad g(2800)=7\times2=14` },
          ],
          check: String.raw`約数は全部で $5\cdot3\cdot2=30$ 個。$16+14=30$ で合う。`,
          pitfalls: [
            String.raw`$c$（$7$ の指数）は $\bmod 3$ の値に影響しない。$7\equiv1$ だから、ただ $2$ 倍するだけ。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$f(n)\ge g(n)$ を示す`,
          answer: String.raw`$f(n)-g(n)$ は、$3$ で割って $1$ 余る素因数については「指数 $+1$」を、$2$ 余る素因数については「指数が偶数なら $1$、奇数なら $0$」を掛け合わせた値になり、どの因数も $0$ 以上だから $f(n)\ge g(n)$`,
          approach: String.raw`$3$ で割った余りが $1$ なら $+1$、$2$ なら $-1$ を与える重みを考えると、**積について掛け算が成り立つ**。約数の和が素因数ごとの積にほどける。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$n=3^{e}m$（$m$ は $3$ と互いに素）と書くと、$3$ の倍数の約数は余りが $0$ なので数に入らない。よって $f(n)=f(m),\ g(n)=g(m)$ で、$m$ だけ考えればよい。`,
            },
            {
              k: "p",
              t: String.raw`$m$ の素因数を、$3$ で割って $1$ 余るもの $p_1,\ldots,p_s$（指数 $a_1,\ldots,a_s$）と、$2$ 余るもの $q_1,\ldots,q_t$（指数 $b_1,\ldots,b_t$）に分ける。約数を $p_1^{x_1}\cdots p_s^{x_s}q_1^{y_1}\cdots q_t^{y_t}$ と書くと、$3$ で割った余りは $p_i$ の部分が $1$、$q_j$ の部分が $2^{y_1+\cdots+y_t}$ と同じなので、**$y_1+\cdots+y_t$ の偶奇だけ**で決まる。`,
            },
            {
              k: "math",
              t: String.raw`f(m)-g(m)=\Big\{(a_1+1)\cdots(a_s+1)\Big\}\times\varepsilon_1\varepsilon_2\cdots\varepsilon_t`,
            },
            {
              k: "steps",
              items: [
                String.raw`$p_i$ の指数 $x_i$ は余りに影響しないので、$0$ から $a_i$ まで自由に選べる。ここから $(a_i+1)$ 倍`,
                String.raw`$q_j$ の指数 $y_j$ は $0$ から $b_j$ まで。偶数個の選び方と奇数個の選び方の差を $\varepsilon_j$ と書くと、$\varepsilon_j=1-1+1-\cdots$ となり、$b_j$ が偶数なら $\varepsilon_j=1$、奇数なら $\varepsilon_j=0$`,
              ],
            },
            { k: "p", t: String.raw`どの因子も $0$ 以上だから積も $0$ 以上。よって $f(n)\ge g(n)$。` },
            {
              k: "note",
              t: String.raw`等号が成り立つのは次の場合である。$3$ で割って $2$ 余る素因数のうち1つでも奇数乗であれば、因子が $0$ になって $f=g$ となり、そうでなければ $f>g$ となる。`,
            },
          ],
          pitfalls: [
            String.raw`$3$ で割って $2$ 余る数どうしを掛けると $1$ 余る（$2\times2=4$）。だから余りは「$2$ 余る素因数を何個使ったか」の偶奇だけで決まる。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$g(n)=15$ のとき $f(n)$ のとりうる値を求める`,
          answer: String.raw`$f(n)=15,\ 16,\ 18,\ 20,\ 30$`,
          approach: String.raw`$A=f-g$（(2) の積）と $d=f+g$（$m$ の約数の個数）で書き直す。$A$ の因子の作られ方から、$d=A\cdot B$（$B$ は奇数）という形に縛られる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`(2) の記号で $A=f-g\ge0$、$d=f+g$ とおくと $f=\dfrac{d+A}{2},\ g=\dfrac{d-A}{2}$。$g=15$ より $d-A=30$。`,
            },
            {
              k: "p",
              t: String.raw`**$A=0$ のとき。** $d=30$、$f=15$。$3$ で割って $2$ 余る素因数が奇数乗であればよく、たとえば $m=2^{29}$ で実現できる。`,
            },
            {
              k: "p",
              t: String.raw`**$A>0$ のとき。** $3$ で割って $2$ 余る素因数はすべて偶数乗なので、その部分から出る約数の個数 $B=(b_1+1)\cdots(b_t+1)$ は**奇数どうしの積、すなわち奇数**。一方 $A=(a_1+1)\cdots(a_s+1)$ で、$d=AB$。よって`,
            },
            { k: "math", t: String.raw`d-A=A(B-1)=30` },
            {
              k: "p",
              t: String.raw`$B$ は奇数だから $B-1$ は偶数。$B-1$ は $30$ の偶数の約数、すなわち $2,6,10,30$ に限られ`,
            },
            {
              k: "steps",
              items: [
                String.raw`$B=3,\ A=15$ … $d=45,\ f=30$（例：$m=7^{14}\cdot2^{2}$）`,
                String.raw`$B=7,\ A=5$ … $d=35,\ f=20$`,
                String.raw`$B=11,\ A=3$ … $d=33,\ f=18$`,
                String.raw`$B=31,\ A=1$ … $d=31,\ f=16$（例：$m=2^{30}$）`,
              ],
            },
            {
              k: "p",
              t: String.raw`$3$ で割って $1$ 余る素数も $2$ 余る素数も無数にあるので、どの $(A,B)$ も実際に作れる。よって $f(n)$ のとりうる値は $15,\ 16,\ 18,\ 20,\ 30$。`,
            },
          ],
          check: String.raw`$m=2^{30}$ なら約数は $2^{j}\ (0\le j\le30)$ で、$j$ が偶数の $16$ 個が余り $1$、奇数の $15$ 個が余り $2$。確かに $g=15,\ f=16$。$m=7^{14}\cdot2^{2}$ なら $f=30,\ g=15$。`,
          pitfalls: [
            String.raw`$B$ が奇数であることが効く。$3$ で割って $2$ 余る素因数は偶数乗に限られるので、$e_p+1$ はつねに奇数。`,
            String.raw`$A=0$ の場合を別に調べる。$A(B-1)=30$ の式は $A>0$ を前提にしている。`,
            String.raw`存在の確認まで書く。$30$ の偶数の約数を並べただけでは、実際にそういう $n$ があるかは言えていない。`,
          ],
        },
      ],
    },
  ],
};
