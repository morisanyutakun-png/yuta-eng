import { nagoyaRikei2026 } from "@/lib/solutions/nagoya-rikei-2026";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 名古屋大学 2026年度（令和8年度）一般選抜 前期日程 数学（文科系）。
 *
 * 実物の問題冊子を理科系・文科系の両方で突き合わせたところ、
 * **文科系の第2問・第3問は、理科系の第3問・第4問とまったく同じ問題**だった
 * （第2問だけ小問の並びが入れ替わっている）。
 * 同じ問題に別々の解説を書くと食い違いが生まれるので、解説は理科系の側から借りる。
 *
 * 問題文・図・表は1つも載せていない。
 */

const rikei = (no: number) => nagoyaRikei2026.questions.find((q) => q.no === no)!;

/** 理科系 第3問（整数）。文科系では小問の並びが (1)(2)(3) と入れ替わっている。 */
const sharedSeisu: Question = {
  ...rikei(3),
  no: 2,
  subs: [
    rikei(3).subs[0],
    {
      label: "(2)",
      task: String.raw`$abc=120$ をみたす組 $(a,b,c)$ の個数を求める`,
      answer: String.raw`$27$ 個`,
      approach: String.raw`(1) と理由は同じ。$120=2^{3}\cdot3\cdot5$ の**素数のべきの塊が3つ**あり、それぞれを $a,b,c$ のどこへ入れるかを独立に選べる。`,
      blocks: [
        {
          k: "p",
          t: String.raw`どの2つも互いに素という条件から、$2^{3},\ 3,\ 5$ はそれぞれまるごと $a,b,c$ のどれか1つに属する。逆にどう振り分けても積は $120$ になり、2つの数が共通の素因数をもつことはない。`,
        },
        { k: "math", t: String.raw`3\times3\times3=3^{3}=27\ \text{個}` },
        {
          k: "note",
          title: "(1) との数の合い方",
          t: String.raw`(1) で書き出した5組を並べ替えると $3+6+6+6+6=27$ 通り。$(1,1,120)$ だけは同じ数が2つあるので $3$ 通りしかない。`,
        },
      ],
      check: String.raw`(1) の5組それぞれの並べ替えを足すと $27$。順序つきで数えた $3^{3}$ と一致する。`,
      pitfalls: [
        String.raw`ここで数えているのは**順序つき**の組。$(1,3,40)$ と $(3,1,40)$ を別に数えている。(1) の $a\le b\le c$ とは数え方が違う。`,
      ],
    },
    { ...rikei(3).subs[1], label: "(3)" },
  ],
  review: {
    ...rikei(3).review,
    verified: [
      ...rikei(3).review.verified,
      "(2) の $27$ が、(1) の5組の並べ替えの総数と一致することを全探索で確かめた",
    ],
  },
};

/** 理科系 第4問（確率・漸化式）。文科系の第3問とまったく同じ問題。 */
const sharedKakuritsu: Question = { ...rikei(4), no: 3 };

export const nagoyaBunkei2026: SolutionSet = {
  slug: "nagoya-bunkei",
  year: 2026,
  subject: "数学",
  schedule: "前期日程",
  division: "文科系",
  university: "名古屋大学",
  short: "名大文系",
  source: null,
  questions: [
    {
      no: 1,
      field: "図形と方程式・微分法",
      topics: ["放物線の接線", "2接点の座標", "ベクトルの内積と外積", "最大最小への帰着"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-05",
      review: {
        sourceChecked: true,
        verified: [
          "(1) の $b,c$ を接線の式へ戻し、点 $\\mathrm{A}$ を通ることを確かめた",
          "(3) の $\\tan\\theta$ を、$p,a$ を動かしてベクトルから直に計算した値と突き合わせた",
          "(4) の $p\\le\\frac34$ を、$p$ と $a$ の細かい格子で $\\theta\\ge\\frac{\\pi}{3}$ を数値的に確かめた",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`接点の $x$ 座標 $b,\ c$ を $p,\ a$ で表す`,
          answer: String.raw`$b=a-\sqrt p,\qquad c=a+\sqrt p$`,
          approach: String.raw`接点の $x$ 座標を $t$ とおいて接線を立て、点 $\mathrm{A}$ を通る条件を $t$ の2次方程式にする。$a^{2}$ がきれいに消えて**完全平方**になるのがこの問題の芯。`,
          blocks: [
            { k: "p", t: String.raw`$Q:\ y=x^{2}+p$ の $x=t$ における接線は $y=2tx-t^{2}+p$。これが $\mathrm{A}(a,a^{2})$ を通るので` },
            { k: "math", t: String.raw`a^{2}=2ta-t^{2}+p\ \Longleftrightarrow\ t^{2}-2at+a^{2}-p=0\ \Longleftrightarrow\ (t-a)^{2}=p` },
            { k: "p", t: String.raw`$p>0$ だから $t=a\pm\sqrt p$。$b<c$ より $b=a-\sqrt p,\ c=a+\sqrt p$。` },
            {
              k: "note",
              title: "接線が2本引けること",
              t: String.raw`$\mathrm{A}$ の $y$ 座標 $a^{2}$ は $Q$ 上の点の $y$ 座標 $a^{2}+p$ より $p$ だけ小さい。つまり $\mathrm{A}$ は放物線の外（下側）にあり、接線はつねに2本引ける。`,
            },
          ],
          pitfalls: [
            String.raw`$b,c$ は $a$ を中心に $\pm\sqrt p$ と**対称**に並ぶ。この対称性が (2) 以降の計算をすべて軽くする。`,
          ],
        },
        {
          label: "(2)",
          task: String.raw`$\theta=\dfrac{\pi}{2}$ のとき $p$ を $a$ で表す`,
          answer: String.raw`$p=a^{2}+\dfrac14$`,
          approach: String.raw`$\theta$ は $\vec{\mathrm{AB}}$ と $\vec{\mathrm{AC}}$ のなす角なので、直角は**内積が $0$**。成分を $\sqrt p$ でくくると、$(\sqrt p-a)(\sqrt p+a)=p-a^{2}$ が現れて一気に片づく。`,
          blocks: [
            { k: "p", t: String.raw`(1) より、$y$ 座標の差を整理すると` },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{AB}}=\big(-\sqrt p,\ 2\sqrt p(\sqrt p-a)\big),\qquad \vec{\mathrm{AC}}=\big(\sqrt p,\ 2\sqrt p(\sqrt p+a)\big)`,
            },
            { k: "p", t: String.raw`内積は` },
            {
              k: "math",
              t: String.raw`\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}}=-p+4p(\sqrt p-a)(\sqrt p+a)=p\big\{4(p-a^{2})-1\big\}`,
            },
            { k: "p", t: String.raw`$p>0$ だから、これが $0$ になるのは $4(p-a^{2})-1=0$、すなわち $p=a^{2}+\dfrac14$。` },
          ],
          check: String.raw`$a=0,\ p=\dfrac14$ とすると $b=-\dfrac12,\ c=\dfrac12$、$\mathrm{A}(0,0)$、$\mathrm{B}\left(-\dfrac12,\dfrac12\right)$、$\mathrm{C}\left(\dfrac12,\dfrac12\right)$。$\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}}=-\dfrac14+\dfrac14=0$ で直角になる。`,
          pitfalls: [
            String.raw`$y$ 座標の差は $(a\pm\sqrt p)^{2}+p-a^{2}=2p\pm2a\sqrt p=2\sqrt p(\sqrt p\pm a)$。$\sqrt p$ でくくる形に揃えておくと、内積も外積も見通しがよくなる。`,
          ],
        },
        {
          label: "(3)",
          task: String.raw`$\theta\ne\dfrac{\pi}{2}$ のとき $\tan\theta$ を $p,\ a$ で表す`,
          answer: String.raw`$\tan\theta=\dfrac{4\sqrt p}{4p-4a^{2}-1}$`,
          approach: String.raw`$\tan\theta=\dfrac{|\vec{\mathrm{AB}}\times\vec{\mathrm{AC}}|}{\vec{\mathrm{AB}}\cdot\vec{\mathrm{AC}}}$ を使う。$0<\theta<\pi$ なので、外積の大きさを分子、内積を分母に置けば**鈍角のとき自動的に負**になり、場合分けが要らない。`,
          blocks: [
            { k: "p", t: String.raw`外積（$z$ 成分）は、$a$ を含む項が打ち消し合って` },
            {
              k: "math",
              t: String.raw`-\sqrt p\cdot2\sqrt p(\sqrt p+a)-2\sqrt p(\sqrt p-a)\cdot\sqrt p=-2p\big\{(\sqrt p+a)+(\sqrt p-a)\big\}=-4p\sqrt p`,
            },
            { k: "p", t: String.raw`大きさは $4p\sqrt p$。(2) の内積と合わせて` },
            {
              k: "math",
              t: String.raw`\tan\theta=\frac{4p\sqrt p}{p(4p-4a^{2}-1)}=\frac{4\sqrt p}{4p-4a^{2}-1}`,
            },
          ],
          check: String.raw`分母が $0$ になるのは $p=a^{2}+\dfrac14$ のときで、(2) の直角の条件とちょうど一致する。式のつながりが取れている。`,
          pitfalls: [
            String.raw`$\tan\theta$ の分母に絶対値を付けない。付けると鈍角のときに符号が合わなくなる。分子だけ絶対値を取る。`,
          ],
        },
        {
          label: "(4)",
          task: String.raw`すべての実数 $a$ で $\theta\ge\dfrac{\pi}{3}$ となる $p$ の範囲を求める`,
          answer: String.raw`$0<p\le\dfrac34$`,
          approach: String.raw`$D=4p-4a^{2}-1$ とおくと $\tan\theta=\dfrac{4\sqrt p}{D}$。$D\le0$ なら $\theta\ge\dfrac{\pi}{2}$ で自動的に条件を満たすので、**1本の不等式 $D\le\dfrac{4\sqrt p}{\sqrt3}$ にまとめられる**。`,
          blocks: [
            {
              k: "steps",
              items: [
                String.raw`$D\le0$ のとき … 内積が $0$ 以下なので $\theta\ge\dfrac{\pi}{2}>\dfrac{\pi}{3}$。条件は成り立つ`,
                String.raw`$D>0$ のとき … $\theta$ は鋭角で、$\theta\ge\dfrac{\pi}{3}\iff\tan\theta\ge\sqrt3\iff D\le\dfrac{4\sqrt p}{\sqrt3}$`,
              ],
            },
            {
              k: "p",
              t: String.raw`$\dfrac{4\sqrt p}{\sqrt3}>0$ なので、$D\le0$ の場合も2つめの不等式に含まれる。よって求める条件は「すべての $a$ で $D\le\dfrac{4\sqrt p}{\sqrt3}$」。$D=4p-1-4a^{2}$ は $a=0$ で最大になるから`,
            },
            { k: "math", t: String.raw`4p-1\le\frac{4\sqrt p}{\sqrt3}` },
            { k: "p", t: String.raw`$s=\sqrt p>0$ とおいて整理すると` },
            {
              k: "math",
              t: String.raw`4\sqrt3\,s^{2}-4s-\sqrt3\le0\ \Longleftrightarrow\ \left(2s-\sqrt3\right)\left(2\sqrt3\,s+1\right)\le0\ \Longleftrightarrow\ s\le\frac{\sqrt3}{2}`,
            },
            { k: "p", t: String.raw`$s=\sqrt p$ より $p\le\dfrac34$。$p>0$ と合わせて $0<p\le\dfrac34$。` },
          ],
          check: String.raw`$p=\dfrac34,\ a=0$ では $D=2$、$\tan\theta=\dfrac{4\cdot\frac{\sqrt3}{2}}{2}=\sqrt3$ で $\theta=\dfrac{\pi}{3}$。等号がちょうど達成される。$p=1,\ a=0$ では $\tan\theta=\dfrac43<\sqrt3$ となり $\theta=53.1^\circ<60^\circ$ で条件を外れる。`,
          pitfalls: [
            String.raw`$D\le0$ の場合を「$\tan\theta$ が負だから」と切り捨てない。$\theta\ge\dfrac{\pi}{2}$ はむしろ条件を満たす側。`,
            String.raw`$a$ について最悪の場合は $a=0$。$\theta$ は $D$ が大きいほど小さくなるので、$D$ の最大値で押さえる。`,
          ],
        },
      ],
    },
    sharedSeisu,
    sharedKakuritsu,
  ],
};
