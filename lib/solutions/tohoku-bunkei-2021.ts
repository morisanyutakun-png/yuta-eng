import { tohokuRikei2021 } from "@/lib/solutions/tohoku-rikei-2021";
import type { Question, SolutionSet } from "@/lib/solutions/types";

/**
 * 東北大学 2021年度（令和3年度）一般選抜 前期日程 数学（文系）。
 * 文学部・教育学部・法学部・経済学部（文系）・医学部保健学科看護学専攻。
 *
 * 実物の問題冊子を理系・文系の両方で突き合わせたところ、
 * **文系の第1問は理系の第1問、文系の第2問は理系の第3問とまったく同じ問題**だった
 * （小問の並びも同じ）。同じ問題に別々の解説を書くと食い違いが生まれるので、
 * 解説は理系の側から借りる。第3問・第4問は文系だけの問題なので、自分で解き直した。
 *
 * 問題文・図・表は1つも載せていない。東北大学はこの年度の数学の問題を公開していないので、
 * リンクも張らない（lib/solutions/sources.ts の `kind: "none"`）。
 */

const rikei = (no: number) => tohokuRikei2021.questions.find((q) => q.no === no)!;

/** 理系 第1問（図形と方程式）。文系の第1問とまったく同じ問題。 */
const sharedRegion: Question = { ...rikei(1), no: 1 };

/** 理系 第3問（場合の数）。文系の第2問とまったく同じ問題。 */
const sharedOctagon: Question = { ...rikei(3), no: 2 };

/** 第3問の図。$r=\tfrac{\sqrt3}{3}$ のとき $R=\tfrac{2\sqrt3}{3}$。 */
const R21 = (2 * Math.sqrt(3)) / 3;
const RR21 = Math.sqrt(3) / 3;
/** 共通部分（レンズ）の輪郭。左は $C_{2}$ の半円、右は $C_{1}$ の弓形。 */
const LENS21: [number, number][] = [
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const th = Math.PI / 2 + (Math.PI * i) / 40;
    return [1 + RR21 * Math.cos(th), RR21 * Math.sin(th)];
  }),
  ...Array.from({ length: 41 }, (_, i): [number, number] => {
    const th = -Math.PI / 6 + (Math.PI / 3) * (i / 40);
    return [R21 * Math.cos(th), R21 * Math.sin(th)];
  }),
];

/** 第4問の図。 */
const PAR21 = (x: number): number => x * x + 4 * x + 16;
const L1_21 = (x: number): number => 8 * x + 12;
const L2_21 = (x: number): number => 16 * x - 20;

export const tohokuBunkei2021: SolutionSet = {
  slug: "tohoku-bunkei",
  year: 2021,
  subject: "数学",
  schedule: "前期日程",
  division: "文系",
  university: "東北大学",
  short: "東北大文系",
  source: null,
  questions: [
    sharedRegion,
    sharedOctagon,
    {
      no: 3,
      field: "図形と計量",
      topics: ["余弦定理", "正弦定理", "2円の共通部分", "扇形と弓形"],
      ownDifficulty: "標準",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$R=\\dfrac{r+\\sqrt{4-3r^{2}}}{2}$ を $r=0.3,0.5,\\tfrac{\\sqrt3}3,0.8,0.95$ で確かめると、$R^{2}+r^{2}-Rr=1.000000000$ になった",
          "$r=\\tfrac{\\sqrt3}3$ では $R=1.154700538=\\tfrac{2\\sqrt3}3$ で、交点は $\\left(1,\\pm\\tfrac{\\sqrt3}3\\right)$、$\\angle\\mathrm{OPA}=60^{\\circ}$、$\\angle\\mathrm{PAO}=90^{\\circ}$、$\\angle\\mathrm{POA}=30^{\\circ}$ だった",
          "共通部分の面積はモンテカルロ法で $0.642599$、半円 $0.523598776$ と弓形 $0.120781432$ の和 $0.644380207$ が $\\tfrac{7\\pi}{18}-\\tfrac{\\sqrt3}3$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`平面において2点 $\mathrm{O},\mathrm{A}$ の距離が $1$ であるとし、$\mathrm{O}$ と $\mathrm{A}$ を中心とする2つの円をそれぞれ $C_{1},C_{2}$ とする。$C_{1}$ と $C_{2}$ は2点 $\mathrm{P},\mathrm{Q}$ において交わり、$\angle\mathrm{OPA}=\dfrac{\pi}{3}$、$C_{2}$ の半径 $r$ は $r<1$ を満たすとするとき、$C_{1}$ の半径を求める`,
          answer: String.raw`$\dfrac{r+\sqrt{4-3r^{2}}}{2}$`,
          approach: String.raw`$\mathrm{P}$ は両方の円の上にあるので $\mathrm{OP}$ が $C_{1}$ の半径、$\mathrm{AP}$ が $C_{2}$ の半径。三角形 $\mathrm{OPA}$ で余弦定理を使うと $R$ の2次方程式になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$C_{1}$ の半径を $R$ とおく。$\mathrm{P}$ は $C_{1}$ 上にあるので $\mathrm{OP}=R$、$C_{2}$ 上にもあるので $\mathrm{AP}=r$ である。三角形 $\mathrm{OPA}$ で $\angle\mathrm{OPA}=\dfrac{\pi}{3}$、$\mathrm{OA}=1$ だから、余弦定理より`,
            },
            {
              k: "math",
              t: String.raw`1^{2}=R^{2}+r^{2}-2Rr\cos\frac{\pi}{3}=R^{2}+r^{2}-Rr`,
            },
            { k: "p", t: String.raw`である。$R$ についての2次方程式` },
            {
              k: "math",
              t: String.raw`R^{2}-rR+\left(r^{2}-1\right)=0`,
            },
            { k: "p", t: String.raw`を解くと` },
            {
              k: "math",
              t: String.raw`R=\frac{r\pm\sqrt{r^{2}-4\left(r^{2}-1\right)}}{2}=\frac{r\pm\sqrt{4-3r^{2}}}{2}`,
            },
            {
              k: "p",
              t: String.raw`である。$r<1$ より $4-3r^{2}>r^{2}$、すなわち $\sqrt{4-3r^{2}}>r$ なので、$-$ のほうは負になってしまう。$R>0$ だから`,
            },
            {
              k: "math",
              t: String.raw`R=\frac{r+\sqrt{4-3r^{2}}}{2}`,
            },
            { k: "p", t: String.raw`である。` },
          ],
          pitfalls: [
            String.raw`$\pm$ のうち負になるほうを捨てる理由を書く。$r<1$ がここで効く。`,
          ],
          check: String.raw`$r$ を5通りとって $R^{2}+r^{2}-Rr$ を計算すると、すべて $1.000000000$ になった。`,
        },
        {
          label: "(2)",
          task: String.raw`$r=\dfrac{\sqrt3}{3}$ のとき、$\angle\mathrm{PAO}$ の大きさを求める`,
          answer: String.raw`$\angle\mathrm{PAO}=\dfrac{\pi}{2}$`,
          approach: String.raw`(1) に代入して $R$ を出し、三平方の定理（または正弦定理）で角を決める。`,
          blocks: [
            { k: "p", t: String.raw`$r=\dfrac{\sqrt3}{3}=\dfrac{1}{\sqrt3}$ のとき $r^{2}=\dfrac13$ なので、(1) より` },
            {
              k: "math",
              t: String.raw`R=\frac{\frac{1}{\sqrt3}+\sqrt{4-1}}{2}=\frac{\frac{1}{\sqrt3}+\sqrt3}{2}=\frac{\frac{1+3}{\sqrt3}}{2}=\frac{2}{\sqrt3}=\frac{2\sqrt3}{3}`,
            },
            { k: "p", t: String.raw`である。このとき` },
            {
              k: "math",
              t: String.raw`\mathrm{OA}^{2}+\mathrm{AP}^{2}=1+\frac13=\frac43=\mathrm{OP}^{2}`,
            },
            {
              k: "p",
              t: String.raw`なので、三平方の定理の逆より三角形 $\mathrm{OAP}$ は $\mathrm{A}$ が直角である。よって`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{PAO}=\frac{\pi}{2}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "note",
              t: String.raw`正弦定理でもよい。$\dfrac{\mathrm{OA}}{\sin\angle\mathrm{OPA}}=\dfrac{\mathrm{OP}}{\sin\angle\mathrm{PAO}}$ より $\sin\angle\mathrm{PAO}=\dfrac{\mathrm{OP}\sin\frac{\pi}{3}}{\mathrm{OA}}=\dfrac{2}{\sqrt3}\cdot\dfrac{\sqrt3}{2}=1$ となる。`,
            },
            {
              k: "p",
              t: String.raw`残りの角は $\angle\mathrm{POA}=\pi-\dfrac{\pi}{3}-\dfrac{\pi}{2}=\dfrac{\pi}{6}$ である。`,
            },
          ],
          check: String.raw`座標で計算すると $\angle\mathrm{PAO}=90.000000000^{\circ}$、$\angle\mathrm{POA}=30.000000000^{\circ}$ だった。`,
        },
        {
          label: "(3)",
          task: String.raw`$r=\dfrac{\sqrt3}{3}$ のとき、円 $C_{1}$ の内部と円 $C_{2}$ の内部との共通部分の面積を求める`,
          answer: String.raw`$\dfrac{7\pi}{18}-\dfrac{\sqrt3}{3}$`,
          approach: String.raw`$\angle\mathrm{PAO}=\dfrac{\pi}{2}$ ということは、$\mathrm{PQ}$ が $C_{2}$ の直径で、かつ $\mathrm{OA}$ に垂直だということ。共通部分を直線 $\mathrm{PQ}$ で2つに切ると、片方は半円、もう片方は $C_{1}$ の弓形になる。`,
          blocks: [
            {
              k: "p",
              t: String.raw`$\mathrm{Q}$ は $\mathrm{P}$ を直線 $\mathrm{OA}$ について折り返した点である。(2) より $\angle\mathrm{PAO}=\dfrac{\pi}{2}$ なので $\angle\mathrm{PAQ}=\pi$、つまり**$\mathrm{P},\mathrm{A},\mathrm{Q}$ は一直線上**にあり、$\mathrm{PQ}$ は $C_{2}$ の直径である。また $\mathrm{PQ}\perp\mathrm{OA}$ である。`,
            },
            {
              k: "p",
              t: String.raw`共通部分を直線 $\mathrm{PQ}$ で2つに分ける。`,
            },
            {
              k: "p",
              t: String.raw`**$\mathrm{O}$ 側。** $C_{2}$ の半円（直径 $\mathrm{PQ}$ で切った $\mathrm{O}$ 側）である。この半円が $C_{1}$ の内部に入っていることは、$\mathrm{PQ}$ から $\mathrm{O}$ 側にある $C_{2}$ 上の点の $\mathrm{O}$ からの距離が最大でも $\mathrm{OP}=R$ であることから分かる。面積は`,
            },
            {
              k: "math",
              t: String.raw`\frac12\pi r^{2}=\frac12\pi\cdot\frac13=\frac{\pi}{6}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "p",
              t: String.raw`**反対側。** $C_{1}$ を弦 $\mathrm{PQ}$ で切った、$\mathrm{O}$ と反対側の弓形である。中心角は (2) より`,
            },
            {
              k: "math",
              t: String.raw`\angle\mathrm{POQ}=2\angle\mathrm{POA}=2\cdot\frac{\pi}{6}=\frac{\pi}{3}`,
            },
            { k: "p", t: String.raw`である。弓形の面積は「扇形 $-$ 三角形」で` },
            {
              k: "math",
              t: String.raw`\frac12R^{2}\left(\theta-\sin\theta\right)=\frac12\cdot\frac43\left(\frac{\pi}{3}-\frac{\sqrt3}{2}\right)=\frac23\cdot\frac{\pi}{3}-\frac23\cdot\frac{\sqrt3}{2}=\frac{2\pi}{9}-\frac{\sqrt3}{3}`,
            },
            { k: "p", t: String.raw`である。合わせて` },
            {
              k: "math",
              t: String.raw`\frac{\pi}{6}+\frac{2\pi}{9}-\frac{\sqrt3}{3}=\frac{3\pi+4\pi}{18}-\frac{\sqrt3}{3}=\frac{7\pi}{18}-\frac{\sqrt3}{3}`,
            },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが共通部分。大きい円が C₁（中心 O、半径 2√3/3）、小さい円が C₂（中心 A、半径 √3/3）。∠PAO = 90° なので PQ は C₂ の直径で OA に垂直。PQ で切ると、左は C₂ の半円、右は C₁ の弓形（中心角 60°）になる。",
                view: [-1.4, 2.0, -1.3, 1.3],
                step: { x: 0.5, y: 0.5 },
                items: [
                  { k: "fill", pts: LENS21 },
                  {
                    k: "param",
                    f: (t: number) => [R21 * Math.cos(t), R21 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  {
                    k: "param",
                    f: (t: number) => [1 + RR21 * Math.cos(t), RR21 * Math.sin(t)],
                    from: 0,
                    to: 2 * Math.PI,
                  },
                  { k: "seg", a: [0, 0], b: [1, RR21] },
                  { k: "seg", a: [1, 0], b: [1, RR21] },
                  { k: "seg", a: [1, RR21], b: [1, -RR21], dash: true },
                  { k: "dot", at: [0, 0], label: "O", place: "below-left" },
                  { k: "dot", at: [1, 0], label: "A", place: "below-right" },
                  { k: "dot", at: [1, RR21], label: "P", place: "above-right" },
                  { k: "dot", at: [1, -RR21], label: "Q", place: "below-right" },
                  { k: "text", at: [-0.6, Math.sqrt(R21 * R21 - 0.36)], label: "C₁", place: "above-left" },
                  { k: "text", at: [0.52, -0.48], label: "C₂", place: "below-left" },
                ],
              },
            },
          ],
          pitfalls: [
            String.raw`共通部分を「2つの弓形の和」と見ると計算が重くなる。$\mathrm{PQ}$ が $C_{2}$ の直径になることに気づけば、片方は半円でそのまま面積が出る。`,
            String.raw`弓形の面積は扇形から三角形を引く。三角形の面積は $\dfrac12R^{2}\sin\theta$ である。`,
          ],
          check: String.raw`モンテカルロ法で $0.642599$、式の値は $\dfrac{7\pi}{18}-\dfrac{\sqrt3}{3}=0.644380207$ だった。`,
        },
      ],
    },
    {
      no: 4,
      field: "微分法・積分法",
      topics: ["共通接線", "3次関数と2次関数", "4次方程式の因数分解", "放物線と接線で囲む面積"],
      ownDifficulty: "やや難",
      status: "published",
      updated: "2026-10-13",
      review: {
        sourceChecked: true,
        verified: [
          "$t=\\pm2$ で3次曲線の接線を作ると $y=16x-20$ と $y=8x+12$ になり、放物線の接点はそれぞれ $x=6,\\ x=2$ で接線も一致した",
          "$9t^{4}+4t^{3}-24t^{2}-16t-48=0$ を $10^{-4}$ 刻みで走査すると、実数解は $t=\\pm2$ だけだった",
          "数値積分で面積は $5.333333333$ で、$\\tfrac{16}3=5.333333333$ と一致した",
        ],
        rightsHolds: [],
        todos: [],
      },
      subs: [
        {
          label: "(1)",
          task: String.raw`3次関数 $y=x^{3}+x^{2}$ のグラフと2次関数 $y=x^{2}+4x+16$ のグラフの共通接線（どちらのグラフにも接する直線）は2本ある。それらの方程式を求める`,
          answer: String.raw`$y=16x-20$ と $y=8x+12$`,
          approach: String.raw`それぞれの曲線について接点をパラメータにして接線を書き、傾きと切片を比べる。片方を消去すると $t$ の4次方程式になるが、$t=\pm2$ が見つかれば $t^{2}-4$ でくくれる。`,
          blocks: [
            { k: "p", t: String.raw`**3次曲線の接線。** $y=x^{3}+x^{2}$ の $x=t$ における接線は、$y'=3x^{2}+2x$ より` },
            {
              k: "math",
              t: String.raw`y=\left(3t^{2}+2t\right)\left(x-t\right)+t^{3}+t^{2}=\left(3t^{2}+2t\right)x-2t^{3}-t^{2}`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**放物線の接線。** $y=x^{2}+4x+16$ の $x=s$ における接線は、$y'=2x+4$ より` },
            {
              k: "math",
              t: String.raw`y=\left(2s+4\right)\left(x-s\right)+s^{2}+4s+16=\left(2s+4\right)x-s^{2}+16`,
            },
            { k: "p", t: String.raw`である。` },
            { k: "p", t: String.raw`**比べる。** 傾きと $y$ 切片がそれぞれ等しいので` },
            {
              k: "math",
              t: String.raw`3t^{2}+2t=2s+4,\qquad-2t^{3}-t^{2}=-s^{2}+16`,
            },
            { k: "p", t: String.raw`である。1本目から $s=\dfrac{3t^{2}+2t-4}{2}$ で、2本目は $s^{2}=2t^{3}+t^{2}+16$ だから` },
            {
              k: "math",
              t: String.raw`\left(3t^{2}+2t-4\right)^{2}=4\left(2t^{3}+t^{2}+16\right)`,
            },
            { k: "p", t: String.raw`である。左辺を展開すると` },
            {
              k: "math",
              t: String.raw`9t^{4}+12t^{3}-20t^{2}-16t+16=8t^{3}+4t^{2}+64`,
            },
            { k: "p", t: String.raw`すなわち` },
            {
              k: "math",
              t: String.raw`9t^{4}+4t^{3}-24t^{2}-16t-48=0`,
            },
            {
              k: "p",
              t: String.raw`である。$t=2$ を代入すると $144+32-96-32-48=0$ ✓、$t=-2$ でも $144-32-96+32-48=0$ ✓ なので $t^{2}-4$ で割り切れる。実際`,
            },
            {
              k: "math",
              t: String.raw`9t^{4}+4t^{3}-24t^{2}-16t-48=\left(t^{2}-4\right)\left(9t^{2}+4t+12\right)`,
            },
            {
              k: "p",
              t: String.raw`である。$9t^{2}+4t+12$ の判別式は $16-432<0$ なので実数解はない。よって $t=\pm2$ だけである。`,
            },
            {
              k: "steps",
              items: [
                String.raw`$t=2$：傾き $3\cdot4+4=16$、切片 $-16-4=-20$ で $y=16x-20$（放物線の接点は $s=6$）`,
                String.raw`$t=-2$：傾き $12-4=8$、切片 $16-4=12$ で $y=8x+12$（放物線の接点は $s=2$）`,
              ],
            },
            { k: "p", t: String.raw`である。よって共通接線は` },
            {
              k: "math",
              t: String.raw`y=16x-20,\qquad y=8x+12`,
            },
            { k: "p", t: String.raw`の2本である。` },
          ],
          pitfalls: [
            String.raw`「3次曲線の接線」と「放物線の接線」を別々にパラメータで書いてから、傾きと切片の2式を連立する。接点が一致するわけではないので、$t$ と $s$ は別の文字にする。`,
            String.raw`4次方程式は $t=\pm2$ を見つけて $t^{2}-4$ でくくる。残りの2次式に実数解がないことも確かめる。`,
          ],
          check: String.raw`$9t^{4}+4t^{3}-24t^{2}-16t-48$ を $10^{-4}$ 刻みで走査すると、$0$ になるのは $t=\pm2$ だけだった。`,
        },
        {
          label: "(2)",
          task: String.raw`(1) で求めた2本の共通接線と2次関数 $y=x^{2}+4x+16$ のグラフで囲まれた部分の面積を求める`,
          answer: String.raw`$\dfrac{16}{3}$`,
          approach: String.raw`放物線と接線の差は $\left(x-\text{接点}\right)^{2}$ になる。2本の接線の交点で分けて積分すれば、$\left(x-s\right)^{2}$ の積分2つで済む。`,
          blocks: [
            { k: "p", t: String.raw`2本の接線の交点は $16x-20=8x+12$ より $x=4$、$y=44$ である。また接点は $x=2$ と $x=6$ だった。` },
            { k: "p", t: String.raw`放物線と接線の差をとると` },
            {
              k: "math",
              t: String.raw`\left(x^{2}+4x+16\right)-\left(8x+12\right)=x^{2}-4x+4=\left(x-2\right)^{2}`,
            },
            {
              k: "math",
              t: String.raw`\left(x^{2}+4x+16\right)-\left(16x-20\right)=x^{2}-12x+36=\left(x-6\right)^{2}`,
            },
            {
              k: "p",
              t: String.raw`である（接しているので、差は接点での完全平方になる）。どちらも $0$ 以上なので、放物線は2本の接線の上側にある。したがって求める面積は`,
            },
            {
              k: "math",
              t: String.raw`S=\int_{2}^{4}\left(x-2\right)^{2}dx+\int_{4}^{6}\left(x-6\right)^{2}dx`,
            },
            { k: "p", t: String.raw`である。それぞれ計算すると` },
            {
              k: "math",
              t: String.raw`\left[\frac{\left(x-2\right)^{3}}{3}\right]_{2}^{4}=\frac{8}{3},\qquad\left[\frac{\left(x-6\right)^{3}}{3}\right]_{4}^{6}=0-\left(-\frac{8}{3}\right)=\frac{8}{3}`,
            },
            { k: "p", t: String.raw`なので` },
            { k: "math", t: String.raw`S=\frac83+\frac83=\frac{16}{3}` },
            { k: "p", t: String.raw`である。` },
            {
              k: "figure",
              fig: {
                caption:
                  "網かけが求める部分。放物線 y = x² + 4x + 16 に、2本の共通接線 y = 8x + 12（接点 x = 2）と y = 16x - 20（接点 x = 6）が接している。2直線は (4, 44) で交わり、そこで左右に分かれる。",
                view: [0.8, 6.5, 25, 80],
                step: { x: 1, y: 10 },
                items: [
                  { k: "fillBetween", top: PAR21, bottom: L1_21, from: 2, to: 4 },
                  { k: "fillBetween", top: PAR21, bottom: L2_21, from: 4, to: 6 },
                  { k: "curve", f: PAR21, from: 1.606, to: 6.246 },
                  { k: "curve", f: L1_21, from: 1.625, to: 6.5 },
                  { k: "curve", f: L2_21, from: 2.8125, to: 6.25 },
                  { k: "dot", at: [2, 28], label: "接点 (2, 28)", place: "left" },
                  { k: "dot", at: [6, 76], label: "接点 (6, 76)", place: "above-left" },
                  { k: "dot", at: [4, 44] },
                ],
              },
            },
            {
              k: "note",
              t: String.raw`交点 $x=4$ は接点 $x=2$ と $x=6$ のちょうど真ん中にある。2本の接線が同じ放物線に接しているときはいつもそうなる。`,
            },
          ],
          pitfalls: [
            String.raw`接線と放物線の上下を取り違えない。差が完全平方なので、放物線が上である。`,
            String.raw`積分区間は「接点から交点まで」を2つ。接点から接点まで一気には積分できない（途中で下側の直線が切りかわる）。`,
          ],
          check: String.raw`数値積分すると $5.333333333$ で、$\dfrac{16}{3}=5.333333333$ と一致した。`,
        },
      ],
    },
  ],
};
