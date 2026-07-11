import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LpPageViewEvent } from "@/components/analytics-events";
import { AppScreen } from "@/components/app-screens";
import { Container } from "@/components/container";
import { PrimaryCta, SecondaryCta } from "@/components/cta";
import { Blob, CtaDoodle, CurveDivider, DarkSectionDecor, PhoneBackdrop, SectionGlow } from "@/components/decor";
import { JsonLd } from "@/components/json-ld";
import { GroundedMascot, Illust, Mascot, PrintImage } from "@/components/nobit-media";
import { PostPurchaseTeaser } from "@/components/post-purchase-flow";
import { bookGroups, officialBooks } from "@/data/books";
import { homeFaq } from "@/data/home";
import { kdpAmazonUrl } from "@/data/site";
import {
  buyoutTotal,
  CAMPAIGN_DEADLINE_LABEL,
  formatYen,
  GRADING_COUNT,
  listTotal,
  MATERIAL_PRICE,
  PACK_UNIT_PRICE,
  packSavings,
  PER_DAY_PRICE,
  PROGRAM_DAYS,
  SUBJECT_AREAS,
  SUBJECTS,
} from "@/lib/pricing";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title:
    "毎日の学習を、仕組みにする。デジタル通信添削 - ノビットスタディ 中高部",
  description:
    "ノビットスタディ 中高部は、自作教材を好きなタイミングで1枚ずつ進める、買い切りのデジタル通信添削。提出すると解答解説PDFと次の範囲が届き、先生の添削・再提出は並行して進みます。物理・化学・数学・英語、1教材（約100日分・添削込み）買い切り¥14,800〜、8/6まで開講記念パック割、入会金・追加費用0円。",
  path: "/",
});

/* ───────────────────────── content data ───────────────────────── */

// 独学・受け身の学びが続かない理由＝「習慣」と「フィードバック」の欠落。
const problems = [
  { title: "参考書は買った。でも、三日で開かなくなった。", body: "続かないのは、あなたの意志が弱いからじゃない。「続く仕組み」が無いだけです。" },
  { title: "解いて丸つけ。それで、やりっぱなし。", body: "どこがなぜ違うのか、誰も直してくれない。だから同じ失点を、何度もくり返す。" },
  { title: "映像授業は「見て、分かった気」になる。", body: "でも手を動かさないと、分かった“つもり”のまま。点には変わりません。" },
  { title: "そもそも、今日“何を”やればいいの？", body: "学習計画づくりに疲れて、勉強そのものが止まってしまう。" },
];

// ノビットの価値＝3本柱。教材 × 習慣化 × 添削。
const pillars = [
  {
    no: "01",
    tag: "教材",
    icon: "pillar-materials",
    color: "#1d4ed8",
    title: "自作のオリジナル教材を、取り組みサイズで。",
    body: "16冊を刊行した開発者が「理解で解く」設計で書き下ろし。少しずつ進む大きさに分割します。",
  },
  {
    no: "02",
    tag: "習慣化",
    icon: "pillar-habit",
    color: "#0d9488",
    title: "提出すると次が届くから、迷わない。",
    body: "専用アプリが提出と同時に解答解説PDFと次の範囲を配信。返却待ちでも学習が止まらず、勉強が生活のリズムになります。",
  },
  {
    no: "03",
    tag: "添削",
    icon: "pillar-correction",
    color: "#ea580c",
    title: "出した答案に、あなた専用の指摘。",
    body: "教材を書いた本人が添削。途中式・考え方・減点ポイントまで、直し方が分かる形で返します。",
  },
];

// 価値をひと目で伝えるステップ（解く → 出す → 返る → 進む）。実物のプリント画像で見せる。
type Step = {
  no: string;
  verb: string;
  caption: string;
  base: string;
  tilt: string;
  stamp?: string;
  tag?: string;
};
const steps: Step[] = [
  { no: "01", verb: "解く", caption: "プリント教材で答案をつくる", base: "print-problem", tilt: "-rotate-2" },
  { no: "02", verb: "出す", caption: "提出と同時に解答・解説が届く（その場で自己採点）", base: "print-solution", tilt: "rotate-2", tag: "解答・解説" },
  { no: "03", verb: "返る", caption: "運用日程に沿って、先生の添削が返ってくる", base: "print-problem", tilt: "-rotate-2", stamp: "添削" },
  { no: "04", verb: "進む", caption: "次の範囲へ進み、全範囲合格で修了", base: "print-cover", tilt: "-rotate-1", stamp: "合格" },
];

// 1日のサイクル（習慣ループ）。
const flow = [
  {
    step: "STEP 1",
    verb: "届く",
    color: "#1d4ed8",
    glyph: "M4 6h16v11H4z M4 6l8 6 8-6", // 通知が届く（封筒）
    title: "今日の範囲が見える",
    body: "アプリを開くと、いま取り組む教材と範囲が分かります。「何をやろう」と迷う時間はゼロ。座ったらすぐ始められます。",
  },
  {
    step: "STEP 2",
    verb: "解く",
    color: "#0d9488",
    glyph: "M4 20l1-4L16 5l3 3L8 19zM14 7l3 3", // 鉛筆で書く
    title: "解いて、出す",
    body: "自作教材で理解して書く。好きなタイミングで取り組み、提出と同時に解答解説PDFと次の範囲が届きます。",
  },
  {
    step: "STEP 3",
    verb: "返る",
    color: "#ea580c",
    glyph: "M9 7L4 12l5 5M4 12h10a6 6 0 0 1 6 6", // 添削が返ってくる（返信矢印）
    title: "添削が返る",
    body: "自己採点だけで終わりません。先生の添削が返却されたら、コメントや添削PDFをスマホでそのまま見返せます。",
  },
  {
    step: "STEP 4",
    verb: "進む",
    color: "#16a34a",
    glyph: "M20 7a8 8 0 1 0 1.5 5M20 4v4h-4", // くりかえす（ループ矢印）
    title: "返却・再提出も並行",
    body: "再提出が必要な範囲は戻って確認。次の範囲と復習を並行して進め、8割を合格目安に先生が採点。全範囲が合格になったら教材修了です。",
  },
];

// 添削の価値＝人が読み、やり取りが続き、やる気につながること。
const correctionPoints = [
  {
    mark: "①",
    title: "人の目で、読む",
    body: "機械の丸つけでは拾えない「考え方」まで。途中式の論理も、本番で引かれる減点ポイントも、講師が一枚ずつ読み込みます。",
  },
  {
    mark: "②",
    title: "やり取りが、続く",
    body: "出して終わり、ではありません。コメントに返信でき、次の答案でまた返ってくる。双方向だから、疑問がその場で消えます。",
  },
  {
    mark: "③",
    title: "「見てくれている」実感",
    body: "提出を続けるほど、頑張りが伝わる。認めてもらえる一言が、次の範囲へのやる気になります。",
  },
  {
    mark: "④",
    title: "次まで、いっしょに",
    body: "返却・再提出・次の範囲をアプリで整理。ひとりで抱え込まず、必要な順番で積み上げられます。",
  },
];

// 教材の特徴（主役＝教材）。市販の寄せ集めではないことを1行で。
const materialPoints = [
  { label: "自作オリジナル", body: "16冊を刊行した開発者が書き下ろし。市販の寄せ集めにはない、一貫した設計。" },
  { label: "理解で解く", body: "暗記ではなく、現象・図・言葉・式を地続きに。初見の問題でも、自分で答案を組み立てられる。" },
  { label: "取り組みサイズ", body: "1回10〜20分に分割。約100回で1冊、自分のペースで最後までやり切れる大きさに。" },
];

// あらゆる段階の生徒に「自分のことだ」と思ってもらえるよう、入門〜難関までを広く。
// img は用意されたイラスト（連番は section の逆順で生成されているため明示的に対応づけ）。
const forYouFit = [
  { title: "何から手をつければいいか分からない", body: "次に取り組む1枚が届くから、迷わず始められます。", img: "foryou-6" },
  { title: "続けられる自信が、まだない", body: "続ける仕組みごとお渡しします。続け方から一緒に。", img: "foryou-5" },
  { title: "解けるのに、記述答案に自信がない", body: "途中式・考え方まで、提出ごとの添削で仕上げます。", img: "foryou-4" },
  { title: "部活や習い事で、時間が取りにくい", body: "1回10〜20分から。スキマ時間で積み上がります。", img: "foryou-3" },
  { title: "難関大・名大の記述まで本気で伸ばしたい", body: "基礎から入試レベルまで、切れ目なく対応します。", img: "foryou-2" },
  { title: "子どもの学習を、そっと見守りたい", body: "生徒アカウントの画面を家でも確認でき、提出・返却・連続日数を一緒に見守れます。", img: "foryou-1" },
];

// アプリ「ノビットスタディ」＝習慣化のエンジン。
const appPoints = [
  { title: "次の範囲が届く", body: "提出すると解答解説PDFと次の範囲が届くので、返却待ちで止まらず、迷わず進められます。" },
  { title: "添削がそのまま返る", body: "提出した答案に、途中式・減点ポイントまでの添削が返却。スマホで見返せます。" },
  { title: "家でも進捗を確認", body: "生徒アカウントの画面を家でも共有して、提出数・添削完了・連続日数を見守れます。" },
  { title: "続けたくなる仕組み", body: "はなまる・称号・連続記録で、学習が自然と積み上がります。" },
];

// 広告・検索から来た人が、最初の数十秒で購入判断できるようにする要約。
const quickAnswers = [
  {
    label: "これは何？",
    title: "買い切りのデジタル通信添削",
    body: "物理・化学・数学・英語のオリジナル教材を、1枚ずつ解いてアプリで提出します。",
  },
  {
    label: "何が届く？",
    title: "解答解説PDFと次の範囲",
    body: "提出した瞬間に自己採点へ。先生の添削返却を待たずに、次の学習へ進めます。",
  },
  {
    label: "誰が見る？",
    title: "教材を書いた本人が添削",
    body: "途中式・考え方・減点ポイントまで読み、直し方が分かるコメントで返します。",
  },
  {
    label: "いくら？",
    title: `1日あたり${PER_DAY_PRICE}円`,
    body: `約${PROGRAM_DAYS}日ぶん・毎回添削で、買い切り${formatYen(MATERIAL_PRICE)}〜。入会金・追加費用0円、自動更新なし。`,
  },
];

const purchaseIncludes = [
  `オリジナル教材（約${GRADING_COUNT}回分の分割課題）`,
  "毎日提出できる（自分のペースでOK）",
  "毎回そのつど添削",
  "解答解説PDF・次の範囲の配信",
  "再提出・合格管理",
  "アプリで進捗管理（家でも確認）",
];

const sampleAssetVersion = "20260711";

const sampleScreens = [
  {
    title: "購入後に何が届くか",
    body: "購入した教材がダッシュボードに自動で入り、教材表紙つきで現在地が表示されます。",
    bullets: ["表紙と範囲名で確認", "合格数・採点待ちも教材別に確認"],
    src: `/samples/after-purchase-dashboard-v2.png?v=${sampleAssetVersion}`,
    width: 724,
    height: 204,
  },
  {
    title: "教材PDFの一部",
    body: "数学IA標準の問題PDFを、アプリ内やタブレットで縦スクロールしながら確認できます。",
    bullets: ["数式つきPDFも閲覧", "ペンで書き込んで保存"],
    src: `/samples/material-pdf-math-sample.png?v=${sampleAssetVersion}`,
    width: 1075,
    height: 1518,
  },
  {
    title: "提出画面",
    body: "教材の表紙・範囲・問題PDFを確認し、そのまま画面で解くか、答案ファイルを添付して提出できます。",
    bullets: ["画面で解く", "PDF・写真は最大3件", "提出前に添付内容を確認"],
    src: `/samples/submit-screen-math-sample.png?v=${sampleAssetVersion}`,
    width: 666,
    height: 387,
  },
  {
    title: "解答解説PDFの見え方",
    body: "提出後に同じ範囲の解答解説PDFを開き、考え方と途中式を見ながら自己採点できます。",
    bullets: ["数学IA標準 A-1", "考え方・途中式つき"],
    src: `/samples/answer-key-math-sample.png?v=${sampleAssetVersion}`,
    width: 1075,
    height: 1518,
  },
  {
    title: "返却画面",
    body: "先生の採点コメント、添削PDF、再提出の指示を返却タブで確認します。",
    bullets: ["自己採点とは別画面", "再提出が必要なものを確認"],
    src: `/samples/returned-screen-v2.png?v=${sampleAssetVersion}`,
    width: 411,
    height: 362,
  },
  {
    title: "レポート画面",
    body: "合格率・平均点・教科別の成績・返却履歴をひとつの画面で振り返れます。",
    bullets: ["数値と履歴で確認", "返却コメントや再提出依頼も残る"],
    src: `/samples/report-screen-v2.png?v=${sampleAssetVersion}`,
    width: 980,
    height: 1180,
    overlays: [
      {
        text: "山田太郎",
        className:
          "left-[75.8%] top-[1.25%] h-[3.1%] w-[7.2%] bg-white text-[clamp(0.36rem,1.25vw,0.72rem)] font-extrabold text-[#123657]",
      },
    ],
  },
];

const subjectAreas = SUBJECTS.reduce(
  (acc, subject) => {
    acc[subject.area] = [...(acc[subject.area] ?? []), subject.label];
    return acc;
  },
  {} as Record<string, string[]>,
);

const subjectGuideGroups = [
  {
    area: "物理",
    lead: "公式暗記で苦しくなりやすい科目。いまの理解度で、基礎・標準・発展を選びます。",
    items: [
      { id: "physics-basic", badge: "初学・苦手", fit: "物理が不安／教科書の式の意味から固めたい", start: "まずはここ" },
      { id: "physics", badge: "標準", fit: "典型問題を解けるようにして、入試の土台を作りたい", start: "迷ったらここ" },
      { id: "physics-advanced", badge: "難関・記述", fit: "二次試験・難関大の記述答案まで仕上げたい", start: "得意を伸ばす" },
    ],
  },
  {
    area: "化学",
    lead: "暗記で押し切らず、考え方と答案の書き方を一緒に整えます。",
    items: [
      { id: "chemistry-basic", badge: "基礎", fit: "化学基礎から不安／理論の見方を固めたい", start: "土台づくり" },
      { id: "chemistry", badge: "標準", fit: "理論・無機・有機を入試演習として積みたい", start: "受験演習" },
    ],
  },
  {
    area: "数学",
    lead: "学年や受験範囲に合わせて選びます。答案の途中式まで見てもらいたい人向けです。",
    items: [
      { id: "math-1a", badge: "高1・土台", fit: "数と式・場合の数・図形など、IAを固めたい", start: "最初の一冊" },
      { id: "math-2bc", badge: "高2・受験基礎", fit: "数列・ベクトル・微積など、受験数学の中心を進めたい", start: "優先度高" },
      { id: "math-3c", badge: "理系", fit: "理系入試の微積・複素数平面まで取り組みたい", start: "理系向け" },
    ],
  },
  {
    area: "英語",
    lead: "読解と文法を分けて選べます。長文で点を取りたいか、文法の穴を埋めたいかで決めます。",
    items: [
      { id: "english-reading", badge: "読解", fit: "長文の読み方・根拠の取り方を鍛えたい", start: "読解強化" },
      { id: "english-grammar", badge: "文法", fit: "文法問題や英文の構造把握に不安がある", start: "穴埋め" },
    ],
  },
];

const guideShortcuts = [
  {
    title: "まず1教材だけなら",
    body: "いま一番「答案を見てもらいたい」科目から。続けられるか不安な人も、1教材で始められます。",
  },
  {
    title: "2教材パックで始めるなら",
    body: "主科目＋弱点補強がおすすめ。例：数学IIBC＋物理 標準、英語長文＋英文法。",
  },
  {
    title: "難関大の記述を意識するなら",
    body: "得点源にしたい科目は発展・理系範囲まで。添削で途中式と説明の精度を上げます。",
  },
];

const faqItems = homeFaq;

// 流れる帯（マーキー）のフレーズ。視覚的なリズム＋SEO のキーワードを兼ねる。
const marqueeItems = [
  "物理・化学・数学・英語",
  "好きな時に提出 × 添削",
  "提出と同時に解答・解説",
  "プロの添削が返る",
  "自作オリジナル教材",
  "習慣化アプリで続く",
  "家でも進捗を確認",
  "入会金・追加費用 0円",
  "8/6まで 開講記念パック割",
];

/* ───────────────────────── reusable bits ───────────────────────── */

/**
 * 採点ペン風のマーカー下線。ただの直線にせず、右端を「サッ」と跳ね上げ、
 * 下に二度引きのにじみを重ねて、先生が答案に引いた一筆のような個性を出す。
 */
function PenUnderline({ className = "", color = "#f97316" }: { className?: string; color?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      className={className}
    >
      {/* 本線：左から勢いよく引き、右端を上に跳ね上げる */}
      <path
        d="M6 11C48 6.5 104 5.8 156 8C172 8.7 187 8.6 196 4.5"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 二度引きのにじみ：少し下に、薄く。felt-tip の質感 */}
      <path
        d="M18 15.5C66 13 128 13 182 14.2"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}

/**
 * 強調語＋採点ペン下線。下線は文字のベースライン直下に置き、グリフへ重ねない。
 * inline-block 幅＝文字幅なので、語にぴったり沿う。
 */
function Penned({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <PenUnderline
        color={color}
        className="pointer-events-none absolute left-0 top-full -mt-[0.14em] h-[0.42em] w-full"
      />
    </span>
  );
}

/** 答案に押す赤い「合格／返却」スタンプ風。アナログな採点の質感を出す。 */
function Stamp({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid -rotate-12 place-items-center rounded-full border-[3px] border-[#e11d48] font-extrabold leading-none tracking-[0.08em] text-[#e11d48] shadow-[0_6px_14px_-8px_rgba(225,29,72,0.6)] ${className}`}
      style={{ fontFamily: "'Hiragino Mincho ProN','YuMincho',serif" }}
    >
      {label}
    </span>
  );
}

/* 絵文字の代わりに使う、線画のミニアイコン（現在色を継承）。 */
function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.3 4.3L19 7" />
    </svg>
  );
}
function IconChat({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a7 7 0 0 1-10.4 6.1L5 19l1.4-4.1A7 7 0 1 1 20 11.5Z" />
    </svg>
  );
}

/** 流れるキーワード帯。スクロールで現れ、横に流れてリズムと SEO を兼ねる。 */
function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 text-[0.9rem] font-bold tracking-[0.02em] text-white sm:text-[0.96rem]">
            {t}
          </span>
          <span aria-hidden="true" className="text-[0.7rem] text-[#5eead4]">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

function MarqueeBand({ reverse = false }: { reverse?: boolean }) {
  return (
    <section className="cv-defer overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] py-3.5">
      <div className="marquee">
        <div className={`marquee__track${reverse ? " marquee__track--reverse" : ""}`}>
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}

/** セクション間に置く申込・料金への誘導。CTAを増やして申込導線を強化。 */
function InlineCta({ note }: { note?: string }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      {note ? (
        <p className="text-center text-[0.92rem] font-semibold text-[#475569]">{note}</p>
      ) : null}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <PrimaryCta href="/apply">料金を見て申し込む（買い切り）</PrimaryCta>
        <SecondaryCta href="/apply#pricing">料金・科目を見る</SecondaryCta>
      </div>
    </div>
  );
}

/** キャンペーンの「50%OFF」シール（ギザギザの星形）。中心に文言を重ねる。 */
function Starburst({ className = "" }: { className?: string }) {
  const spikes = 16;
  const cx = 50;
  const cy = 50;
  const outer = 49;
  const inner = 39;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_12px_22px_rgba(124,25,0,0.35)]">
        <polygon points={pts.join(" ")} fill="#fff" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#fdba74" strokeWidth="1.4" strokeDasharray="2 3" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none">
          <p className="text-[0.58rem] font-extrabold tracking-[0.12em] text-[#ea580c]">開講記念</p>
          <p className="mt-1 text-[1.15rem] font-black text-[#ea580c]">パック割</p>
          <p className="mt-1 text-[0.58rem] font-black tracking-[0.06em] text-[#f97316]">{CAMPAIGN_DEADLINE_LABEL}まで</p>
        </div>
      </div>
    </div>
  );
}

/**
 * キャンペーン告知バンド（toC の主役）。実在するオファー（開講記念パック割・入会/追加費用0円）を
 * 大きな数字と割引前→後の対比で一気に見せ、購買行動の背中を押す。虚偽の実績は載せない。
 */
function CampaignBanner() {
  const packList = listTotal(2);
  const packPrice = buyoutTotal(2, true);
  return (
    <section className="cv-defer relative overflow-hidden bg-[linear-gradient(120deg,#fb7185_0%,#f97316_56%,#fbbf24_100%)]">
      <Blob fill="#ffffff" className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 opacity-[0.16]" />
      <Blob fill="#ffffff" className="pointer-events-none absolute -bottom-24 right-[-4rem] h-80 w-80 opacity-[0.12]" />
      <span aria-hidden="true" className="pointer-events-none absolute left-[12%] top-6 h-2.5 w-2.5 rounded-full bg-white/50" />
      <span aria-hidden="true" className="pointer-events-none absolute right-[16%] top-8 h-2 w-2 rounded-full bg-white/40" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-6 left-[38%] h-2 w-2 rounded-full bg-white/40" />
      <Container className="relative px-6 py-10 sm:py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:gap-8 lg:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Starburst className="h-24 w-24 shrink-0 -rotate-6 sm:h-28 sm:w-28" />
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-[0.66rem] font-extrabold tracking-[0.1em] text-white ring-1 ring-white/45 backdrop-blur">
                <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                CAMPAIGN · 夏の開講記念（{CAMPAIGN_DEADLINE_LABEL}まで）
              </p>
              <p className="mt-2.5 text-[1.55rem] font-black leading-[1.15] tracking-[-0.01em] text-white sm:text-[2.05rem]">
                2教材パックで、もっとおトク。
              </p>
              <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 lg:justify-start">
                <span className="text-[0.8rem] font-bold text-white/90">2教材パック</span>
                <span className="text-[0.98rem] font-bold text-white/70 line-through decoration-2">{formatYen(packList)}</span>
                <span aria-hidden="true" className="text-[1.1rem] font-black text-white/85">→</span>
                <span className="text-[2.1rem] font-black leading-none tracking-[-0.02em] text-white sm:text-[2.5rem]">{formatYen(packPrice)}</span>
                <span className="text-[0.8rem] font-bold text-white/90">/ 買い切り（税込）</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 rounded-full bg-white px-8 text-[1rem] font-extrabold text-[#ea580c] shadow-[0_18px_34px_-16px_rgba(88,20,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-16px_rgba(88,20,0,0.7)]"
            >
              教材を買って、はじめる
              <span aria-hidden="true">→</span>
            </Link>
            <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.74rem] font-bold text-white">
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />入会金0円
              </li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />追加費用0円
              </li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />買い切り・自動更新なし
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuickAnswerSection() {
  return (
    <section id="quick-view" className="cv-defer scroll-mt-24 bg-white">
      <Container className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
            First View · 30秒で分かる
          </p>
          <h2 className="mt-3 text-balance text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.05rem]">
            ノビットは「教材を買って、答案を見てもらう」サービスです。
          </h2>
          <p className="mt-3 text-[0.94rem] leading-[1.9] text-[#475569]">
            まず購入前に知りたいことだけ、先にまとめます。くわしい仕組みはその後で確認できます。
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickAnswers.map((item, i) => (
            <li
              key={item.label}
              className="relative overflow-hidden rounded-[18px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_20px_42px_-36px_rgba(11,29,74,0.42)]"
            >
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-[0.1]"
                style={{ background: ["#1d4ed8", "#0d9488", "#ea580c", "#16a34a"][i] }}
              />
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#64748b]">{item.label}</p>
              <p className="mt-2 text-[1.02rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{item.title}</p>
              <p className="mt-2 text-[0.84rem] leading-[1.85] text-[#475569]">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
          <SecondaryCta href="/#guide">教材選びガイドを見る</SecondaryCta>
        </div>
      </Container>
    </section>
  );
}

function PurchaseShelfSection() {
  const packCount = 2;
  const packPrice = buyoutTotal(packCount, true);
  const savings = packSavings(packCount, true);

  return (
    <section id="buy" className="cv-defer relative overflow-hidden bg-[#f8fafc]">
      <SectionGlow className="-left-28 top-8" color="rgba(29,78,216,0.1)" />
      <SectionGlow className="-right-24 bottom-0" color="rgba(249,115,22,0.1)" />
      <Container className="relative px-6 py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] p-7 text-white shadow-[0_38px_82px_-52px_rgba(11,29,74,0.8)] sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div className="relative">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1 text-[0.68rem] font-extrabold tracking-[0.12em] text-[#5eead4] ring-1 ring-white/15">
                BUYOUT · 教材単位で購入
              </p>
              <h2 className="mt-4 text-balance text-[1.75rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.2rem]">
                買うものは、1教材。
                <br />
                中身は、約{GRADING_COUNT}回分＋添削。
              </h2>
              <p className="mt-4 text-[0.95rem] leading-[1.9] text-white/82">
                月謝ではなく、教材を最後までやり切るための買い切りです。必要な分だけ選べて、修了まで自分のものになります。
              </p>

              <div className="mt-7 rounded-[18px] bg-white/[0.08] p-4 ring-1 ring-white/15">
                <p className="text-[0.72rem] font-bold tracking-[0.08em] text-[#5eead4]">1日あたり（約{PROGRAM_DAYS}日ぶんで割ると）</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-[3rem] font-black leading-none tracking-[-0.02em] text-white sm:text-[3.4rem]">{PER_DAY_PRICE}</span>
                  <span className="text-[1rem] font-extrabold text-white">円</span>
                  <span className="text-[0.8rem] font-bold text-white/70">／ 毎回そのつど添削</span>
                </p>
                <p className="mt-2 text-[0.78rem] font-semibold leading-[1.7] text-white/70">
                  買い切り <span className="font-extrabold text-white/90">{formatYen(MATERIAL_PRICE)}〜</span>（税込）を、約{GRADING_COUNT}回分でならすと1日{PER_DAY_PRICE}円。追加課金ではありません。
                </p>
              </div>

              <div className="mt-3 grid gap-3 rounded-[18px] bg-white/[0.08] p-4 ring-1 ring-white/15 sm:grid-cols-2">
                <div>
                  <p className="text-[0.72rem] font-bold tracking-[0.08em] text-white/65">1教材・買い切り（税込）</p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[2.3rem] font-black leading-none tracking-[-0.02em] text-white">{formatYen(MATERIAL_PRICE)}</span>
                    <span className="text-[0.82rem] font-bold text-white/75">〜</span>
                  </p>
                </div>
                <div className="border-t border-white/15 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <p className="text-[0.72rem] font-bold tracking-[0.08em] text-[#fdba74]">{CAMPAIGN_DEADLINE_LABEL}まで・2教材パック</p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[2.3rem] font-black leading-none tracking-[-0.02em] text-[#fdba74]">{formatYen(packPrice)}</span>
                    <span className="text-[0.78rem] font-bold text-white/75">税込</span>
                  </p>
                  <p className="mt-1 text-[0.74rem] font-bold text-white/72">
                    1教材 {formatYen(PACK_UNIT_PRICE)}・{formatYen(savings)}おトク
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[0.72rem] font-bold tracking-[0.12em] text-white/60">この価格に、ぜんぶ含まれます</p>
              <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                {purchaseIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[0.84rem] font-semibold text-white/86">
                    <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#5eead4] text-[#0b1d4a]">
                      <IconCheck className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-[0_30px_64px_-48px_rgba(11,29,74,0.5)] ring-1 ring-[rgba(15,29,74,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
                  Lineup · 対応教材
                </p>
                <h3 className="mt-3 text-[1.45rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.8rem]">
                  {SUBJECTS.length}教材から、必要なものだけ。
                </h3>
              </div>
              <p className="text-[0.86rem] leading-[1.75] text-[#64748b] sm:max-w-[17rem]">
                申込ページで選ぶと、買い切り価格とパック割が自動で反映されます。
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {SUBJECT_AREAS.map((area) => (
                <section key={area} className="rounded-[16px] bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <p className="flex items-center gap-2 text-[1rem] font-extrabold text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: SUBJECTS.find((s) => s.area === area)?.color ?? "#0d9488" }}
                    />
                    {area}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {(subjectAreas[area] ?? []).map((label) => (
                      <li
                        key={label}
                        className="rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-bold text-[#334155] ring-1 ring-[rgba(15,29,74,0.08)]"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
              <SecondaryCta href="/apply#pricing">料金表を見る</SecondaryCta>
            </div>
            <p className="mt-4 text-[0.78rem] leading-[1.7] text-[#64748b]">
              面談や電話勧誘はありません。購入後は登録情報をもとにアプリ利用を案内します。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SubjectGuideSection() {
  return (
    <section id="guide" className="cv-defer scroll-mt-24 bg-white">
      <Container className="px-6 py-16 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Guide · 教材選び
            </p>
            <h2 className="mt-3 text-balance text-[1.75rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.25rem]">
              迷ったら、<br className="hidden lg:block" />
              いま一番困っている教材から。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.9] text-[#475569]">
              最初から全部そろえる必要はありません。まずは「答案を見てもらいたい科目」を1つ選び、続けられそうなら追加するのが自然です。
            </p>

            <div className="mt-6 rounded-[20px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.07)]">
              <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#0f766e]">
                Quick rule
              </p>
              <ul className="mt-4 grid gap-3">
                {guideShortcuts.map((item, i) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0b1d4a] text-[0.78rem] font-extrabold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[0.94rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{item.title}</span>
                      <span className="mt-1 block text-[0.82rem] leading-[1.75] text-[#64748b]">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start">
              <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
              <SecondaryCta href="/contact">迷うので相談する</SecondaryCta>
            </div>
          </div>

          <div className="grid gap-8">
            {subjectGuideGroups.map((group) => (
              <section key={group.area} aria-labelledby={`guide-${group.area}`}>
                <div className="flex flex-col gap-2 border-b border-[rgba(15,29,74,0.08)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p
                      className="inline-flex rounded-full px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.08em] text-white"
                      style={{ background: SUBJECTS.find((s) => s.area === group.area)?.color ?? "#0d9488" }}
                    >
                      {group.area}
                    </p>
                    <h3 id={`guide-${group.area}`} className="mt-3 text-[1.25rem] font-extrabold leading-[1.4] text-[#0b1d4a]">
                      {group.area}は、こう選ぶ
                    </h3>
                  </div>
                  <p className="text-[0.86rem] leading-[1.75] text-[#64748b] sm:max-w-md">{group.lead}</p>
                </div>

                <ul className="mt-4 grid gap-3">
                  {group.items.map((item) => {
                    const subject = SUBJECTS.find((s) => s.id === item.id);
                    if (!subject) return null;

                    return (
                      <li
                        key={subject.id}
                        className="grid gap-3 rounded-[16px] bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.06)] sm:grid-cols-[10rem_1fr_auto] sm:items-center"
                      >
                        <div>
                          <span
                            className="inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold text-white"
                            style={{ background: subject.color }}
                          >
                            {item.badge}
                          </span>
                          <p className="mt-2 text-[1.02rem] font-extrabold leading-[1.35] text-[#0b1d4a]">{subject.label}</p>
                        </div>
                        <p className="text-[0.88rem] leading-[1.8] text-[#475569]">{item.fit}</p>
                        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-[0.76rem] font-extrabold text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.18)]">
                          {item.start}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function SampleScreensSection() {
  const sampleFlow = ["教材PDF", "提出", "解答解説", "返却", "レポート", "修了PDF"];

  return (
    <section id="samples" className="cv-defer relative scroll-mt-24 overflow-hidden bg-[#f8fafc]">
      <SectionGlow className="-left-24 top-6" color="rgba(29,78,216,0.08)" />
      <SectionGlow className="-right-24 top-32" color="rgba(13,148,136,0.12)" />
      <Container className="relative px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-[#0f766e] shadow-[0_14px_30px_-24px_rgba(11,29,74,0.45)] ring-1 ring-[rgba(13,148,136,0.18)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            Sample · 購入前に見える安心材料
          </p>
          <h2 className="mt-4 text-balance text-[1.85rem] font-extrabold leading-[1.28] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.45rem]">
            申し込む前に、
            <br className="hidden sm:block" />
            学習スタート後の画面まで見えます。
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.96rem] leading-[1.9] text-[#475569]">
            教材PDF・解答解説PDF・提出画面・返却画面・レポート画面まで。
            購入後に「どこで何を見るのか」を、先に具体的に確認できます。
          </p>

          <ol className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-2">
            {sampleFlow.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.74rem] font-extrabold text-[#334155] ring-1 ring-[rgba(15,29,74,0.08)]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#0b1d4a] text-[0.62rem] text-white">
                    {i + 1}
                  </span>
                  {item}
                </span>
                {i < sampleFlow.length - 1 ? (
                  <span aria-hidden="true" className="hidden h-px w-5 bg-[rgba(15,29,74,0.18)] sm:block" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {sampleScreens.map((sample, i) => (
            <article
              key={sample.title}
              className="overflow-hidden rounded-[8px] bg-white shadow-[0_24px_56px_-46px_rgba(11,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.08)]"
            >
              <div className="relative overflow-hidden bg-[#eef4f8]">
                <Image
                  src={sample.src}
                  alt={`${sample.title}の画面サンプル`}
                  width={sample.width}
                  height={sample.height}
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="h-auto w-full"
                />
                {sample.overlays?.map((overlay) => (
                  <span
                    key={overlay.text}
                    aria-hidden="true"
                    className={`absolute flex items-center whitespace-nowrap ${overlay.className}`}
                  >
                    {overlay.text}
                  </span>
                ))}
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[0.68rem] font-extrabold tracking-[0.16em] text-[#0d9488]">
                  SAMPLE {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[1.12rem] font-extrabold leading-[1.45] text-[#0b1d4a]">
                  {sample.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.85] text-[#475569]">{sample.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {sample.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-full bg-[#f8fafc] px-3 py-1.5 text-[0.76rem] font-bold text-[#334155] ring-1 ring-[rgba(15,29,74,0.08)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
          <SecondaryCta href="/after-purchase">購入後の流れを詳しく見る</SecondaryCta>
        </div>
      </Container>
    </section>
  );
}

/** セクションに奥行きを出すやわらかい光（装飾）。overflow-hidden な relative 親に置く。 */
/** 数字で価値を一気に見せる帯（訴求＋デザインのアクセント）。 */
/** 赤ペンで囲んだ風の手描き楕円（採点の“ここ大事”の気配）。 */
function HandCircle({ className = "", color = "#ea580c" }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 74" fill="none" preserveAspectRatio="none" className={className}>
      <path
        d="M64 7C98 3 116 22 112 40 108 60 74 69 44 66 17 63 6 47 10 31 14 14 42 6 78 9"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * 数字で価値を見せる帯。ただの KPI カード並べだと量産テンプレ感（AI感）が出るので、
 * ブランドの添削・方眼モチーフに寄せた「先生の採点メモ」ふうに。手描きの囲み・
 * マーカー下線・点線区切り・わずかな傾きで、人の手でメモした気配を出す。
 */
function StatsBand() {
  const stats = [
    { n: String(SUBJECTS.length), u: "教材", d: "物理・化学・数学・英語", tilt: "-rotate-[1.2deg]" },
    { n: `${PER_DAY_PRICE}`, u: "円/日", d: `約${PROGRAM_DAYS}日ぶん・買い切り${formatYen(MATERIAL_PRICE)}〜`, tilt: "rotate-[0.6deg]", pen: true },
    { n: "提出", u: "添削", d: "答案ごとに返却", tilt: "-rotate-[0.5deg]", check: true },
    { n: "0", u: "円", d: "入会金・追加費用", tilt: "rotate-[1deg]", circle: true },
  ];
  return (
    <section className="cv-defer relative overflow-hidden bg-white">
      <Container className="px-6 py-12 sm:py-16">
        <div className="relative mx-auto max-w-3xl -rotate-[0.5deg]">
          {/* マスキングテープ（紙を貼った気配） */}
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-24 -translate-x-1/2 -rotate-2 rounded-[2px] bg-[rgba(94,234,212,0.55)] shadow-[0_4px_10px_-6px_rgba(11,29,74,0.5)]" />
          {/* 方眼メモ紙 */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#fffdf6] px-4 py-8 shadow-[0_28px_54px_-34px_rgba(11,29,74,0.45)] ring-1 ring-[rgba(234,88,12,0.16)] sm:px-9 sm:py-9">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(13,148,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.1) 1px, transparent 1px)",
                backgroundSize: "23px 23px",
              }}
            />
            <ul className="relative grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
              {stats.map((s, i) => (
                <li
                  key={s.u}
                  className={`relative min-w-0 text-center ${i > 0 ? "sm:before:absolute sm:before:-left-2 sm:before:top-1/2 sm:before:h-12 sm:before:-translate-y-1/2 sm:before:border-l sm:before:border-dashed sm:before:border-[rgba(15,29,74,0.18)]" : ""}`}
                >
                  <p className={`relative inline-flex max-w-full items-baseline gap-0.5 ${s.tilt}`}>
                    {s.check ? (
                      <span aria-hidden="true" className="absolute -left-3.5 -top-2 text-[1rem] font-black text-[#16a34a]">✓</span>
                    ) : null}
                    <span className="relative text-[1.5rem] font-extrabold leading-none tracking-[-0.02em] text-[#0b1d4a] sm:text-[2.2rem]">
                      {s.n}
                      {s.pen ? <PenUnderline color="#ea580c" className="absolute -bottom-1.5 left-0 h-[0.42em] w-full" /> : null}
                      {s.circle ? <HandCircle className="absolute left-1/2 top-1/2 h-[2.1em] w-[2.7em] -translate-x-1/2 -translate-y-[55%]" /> : null}
                    </span>
                    <span className="text-[0.84rem] font-bold text-[#0f766e]">{s.u}</span>
                  </p>
                  <p className="mt-2 text-[0.72rem] leading-[1.5] text-[#6b7280]">{s.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function Home() {
  const homeJsonLd = [
    createHomePageJsonLd(),
    createEducationalServiceJsonLd(),
    createHomeFaqJsonLd(),
  ];

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <LpPageViewEvent />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        {/* レイヤードなメッシュ背景（奥行き・上質感） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 46% at 8% 4%, rgba(29,78,216,0.10), transparent 60%), radial-gradient(50% 45% at 95% 8%, rgba(13,148,136,0.16), transparent 60%), radial-gradient(46% 52% at 82% 96%, rgba(249,115,22,0.08), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f4f8fc 100%)",
          }}
        />
        {/* 有機的なブロブ（色のインパクト） */}
        <Blob fill="#1d4ed8" className="pointer-events-none absolute -left-28 -top-16 h-[24rem] w-[24rem] opacity-[0.16]" />
        <Blob fill="#0d9488" className="pointer-events-none absolute -right-24 top-1/4 h-[26rem] w-[26rem] opacity-[0.18]" />
        <Blob fill="#f97316" className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 opacity-[0.12]" />
        {/* 方眼ノートのテクスチャ — 演習・添削のブランドに馴染ませる */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,29,74,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,29,74,0.045) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 80% 70% at 72% 40%, #000 32%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 72% 40%, #000 32%, transparent 80%)",
          }}
        />

        <Container className="relative px-6">
          <div className="grid grid-cols-1 items-center gap-7 py-8 sm:gap-10 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-24">
            <div className="min-w-0 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.06em] text-[#0f766e] shadow-[0_8px_20px_-12px_rgba(13,148,136,0.5)] ring-1 ring-[rgba(13,148,136,0.22)] backdrop-blur sm:text-[0.76rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                中高生向け・買い切りデジタル通信添削
              </p>

              <h1 className="mt-4 text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0b1d4a] sm:mt-5 sm:text-[3.2rem] lg:text-[3.6rem]">
                教材を買って、
                <br />
                <Penned color="#f97316">
                  <span className="bg-[linear-gradient(95deg,#1d4ed8_0%,#0d9488_55%,#16a34a_100%)] bg-clip-text text-transparent">
                    答案を見てもらう。
                  </span>
                </Penned>
              </h1>

              <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-[1.75] text-[#334155] sm:mt-6 sm:text-[1.15rem] lg:mx-0">
                <span className="sm:hidden">
                  物理・化学・数学・英語の教材を、1枚ずつ解いて提出。
                  <br />
                  出すと、<strong className="font-bold text-[#0b1d4a]">解答解説</strong>と<strong className="font-bold text-[#0b1d4a]">次の範囲</strong>が届きます。
                  <br />
                  後から先生の添削も返ります。
                </span>
                <span className="hidden sm:inline">
                  ノビットスタディは、物理・化学・数学・英語のオリジナル教材を1枚ずつ進める
                  <strong className="font-bold text-[#0b1d4a]">買い切りの通信添削</strong>です。
                  <br className="hidden sm:block" />
                  提出直後に解答解説PDFと次の範囲、後から先生の添削が返ります。
                </span>
              </p>

              <div className="relative mt-7 hidden flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:items-center lg:mx-0 lg:flex">
                <CtaDoodle />
                <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
                <SecondaryCta href="/apply#pricing">料金・教材を見る</SecondaryCta>
              </div>
              <div className="mt-5 hidden max-w-xl items-center gap-3 rounded-[18px] bg-white/74 p-3 text-left shadow-[0_18px_38px_-30px_rgba(11,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.08)] backdrop-blur lg:flex">
                <div className="shrink-0 rounded-[14px] bg-[#0b1d4a] px-4 py-3 text-white">
                  <p className="text-[0.66rem] font-bold tracking-[0.12em] text-white/65">1日あたり</p>
                  <p className="mt-0.5 flex items-baseline gap-0.5">
                    <span className="text-[1.9rem] font-black leading-none">{PER_DAY_PRICE}</span>
                    <span className="text-[0.9rem] font-extrabold">円</span>
                  </p>
                </div>
                <p className="min-w-0 text-[0.84rem] font-semibold leading-[1.75] text-[#475569]">
                  約{PROGRAM_DAYS}日ぶん・毎回そのつど添削。
                  <br />
                  買い切り<strong className="font-extrabold text-[#0b1d4a]"> {formatYen(MATERIAL_PRICE)}〜</strong>（税込）／{CAMPAIGN_DEADLINE_LABEL}まで2教材パックは
                  <strong className="font-extrabold text-[#ea580c]"> {formatYen(buyoutTotal(2, true))}</strong>。
                </p>
              </div>
              {/* トラストチップ */}
              <ul className="mt-6 hidden flex-wrap justify-center gap-x-4 gap-y-2 lg:flex lg:justify-start">
                {["入会金・追加費用0円", `${SUBJECTS.length}教材から選べる`, "買い切り・自動更新なし"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-[#475569]">
                    <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#0d9488] text-white">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.3 4.3L19 7" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-w-0">
              <PhoneBackdrop />
              {/* 実アプリ画面（主役）＋演習本プリント（背面） */}
              <div className="relative mx-auto flex w-fit items-center justify-center">
                <div className="absolute -left-14 top-10 z-0 hidden w-[42%] max-w-[160px] -rotate-[9deg] overflow-hidden rounded-[12px] bg-white shadow-[0_30px_50px_-30px_rgba(11,29,74,0.5)] ring-1 ring-[rgba(15,29,74,0.1)] sm:-left-20 sm:block">
                  <PrintImage base="print-problem" alt="ノビット公式演習本の問題ページ" sizes="160px" className="block h-auto w-full" priority />
                </div>
                <AppScreen variant="home" className="relative z-10 origin-center scale-[0.9] float-slow sm:scale-100" />
                {/* 手書きメモ風の付箋（正直なひとことで、人の手作り感を出す） */}
                <div className="absolute -bottom-3 right-0 z-20 hidden -rotate-[5deg] rounded-[12px] bg-white/85 px-3.5 py-2.5 text-[0.74rem] font-bold leading-snug text-[#9a3412] shadow-[0_20px_40px_-18px_rgba(154,52,18,0.5)] ring-1 ring-white/70 backdrop-blur-md sm:block">
                  1日あたり{PER_DAY_PRICE}円。<br />約{PROGRAM_DAYS}日ぶん・毎回添削。
                </div>
              </div>
              <div className="relative -mt-2 grid gap-3 lg:hidden">
                <PrimaryCta href="/apply#form">教材を選んで申し込む</PrimaryCta>
                <SecondaryCta href="/apply#pricing">料金・教材を見る</SecondaryCta>
                <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                  {[`1日あたり${PER_DAY_PRICE}円`, `約${PROGRAM_DAYS}日ぶん・毎回添削`, `買い切り${formatYen(MATERIAL_PRICE)}〜`].map((t) => (
                    <li key={t} className="flex items-center gap-1.5 text-[0.74rem] font-semibold text-[#475569]">
                      <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#0d9488] text-white">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.3 4.3L19 7" /></svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ───────── QUICK ANSWER（広告・検索流入の購入判断） ───────── */}
      <QuickAnswerSection />

      {/* ───────── 流れるキーワード帯（リズム＋SEO） ───────── */}
      <MarqueeBand />

      {/* ───────── CAMPAIGN（開講記念パック割・toC の主役オファー） ───────── */}
      <CampaignBanner />

      {/* ───────── PURCHASE SHELF（商品棚・教材選択） ───────── */}
      <PurchaseShelfSection />

      {/* ───────── SUBJECT GUIDE（迷わず教材を選ぶ） ───────── */}
      <SubjectGuideSection />

      {/* ───────── AFTER PURCHASE TEASER（購入後の安心導線） ───────── */}
      <section id="after-purchase" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-12 sm:py-16">
          <PostPurchaseTeaser />
        </Container>
      </section>

      {/* ───────── SAMPLES（購入後に届くもの・見る画面） ───────── */}
      <SampleScreensSection />

      {/* ───────── STEPS（やることはこれだけ・実物プリントで見せる） ───────── */}
      <section id="steps" className="cv-defer scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              4 STEP · やることは、これだけ
            </p>
            <h2 className="mt-3 text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.4rem]">
              解いて、出して、
              <Penned color="#ea580c">進む</Penned>。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.9] text-[#475569]">
              出した瞬間に解答・解説と次の範囲。先生の添削・再提出は、学習と並行して進みます。
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-5xl items-stretch gap-y-10 sm:gap-y-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:gap-x-1">
            {steps.map((s, i) => (
              <li key={s.no} className="contents">
                <div className="group relative flex flex-col items-center text-center">
                  {/* 実物プリント＋スタンプ／タグ */}
                  <div className={`relative ${s.tilt} transition group-hover:rotate-0`}>
                    <div className="w-[176px] overflow-hidden rounded-[12px] bg-white shadow-[0_30px_50px_-30px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.12)]">
                      <PrintImage
                        base={s.base}
                        alt={`ステップ${s.no} ${s.verb}：${s.caption}`}
                        sizes="176px"
                        className="block h-auto w-full"
                      />
                    </div>
                    {s.stamp ? (
                      <Stamp
                        label={s.stamp}
                        className="absolute -right-3 -top-3 h-[3.6rem] w-[3.6rem] text-[0.92rem]"
                      />
                    ) : null}
                    {s.tag ? (
                      <span className="absolute -right-2 -top-2 -rotate-6 rounded-full bg-[#0d9488] px-2.5 py-1 text-[0.66rem] font-extrabold text-white shadow-[0_8px_16px_-8px_rgba(13,148,136,0.8)]">
                        {s.tag}
                      </span>
                    ) : null}
                    {/* ステップ番号バッジ */}
                    <span className="absolute -left-3 -top-3 grid h-10 w-10 place-items-center rounded-full bg-[#0b1d4a] text-[0.95rem] font-extrabold text-white ring-4 ring-white">
                      {s.no}
                    </span>
                  </div>
                  <p className="mt-6 text-[1.5rem] font-extrabold leading-none text-[#0b1d4a]">{s.verb}</p>
                  <p className="mt-2 max-w-[176px] text-[0.86rem] leading-[1.7] text-[#475569]">{s.caption}</p>
                </div>

                {/* ステップ間の矢印 */}
                {i < steps.length - 1 ? (
                  <div aria-hidden="true" className="flex items-center justify-center">
                    <span className="text-[1.7rem] font-bold text-[#0d9488]">
                      <span className="hidden lg:inline">→</span>
                      <span className="lg:hidden">↓</span>
                    </span>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.92rem] leading-[1.8] text-[#475569]">
            <strong className="font-bold text-[#0b1d4a]">出した瞬間に自己採点、返却後にプロの添削。</strong>
            次へ進む流れと直す流れを分けることで、学習を止めずに積み上げられます。
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCta href="/apply">買い切りではじめる</PrimaryCta>
          </div>
        </Container>
      </section>

      {/* ───────── 数字で見る（デザインのアクセント） ───────── */}
      <StatsBand />

      {/* ───────── PROBLEMS（独学・受け身の限界） ───────── */}
      <section className="cv-defer relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-left-24 top-10" color="rgba(249,115,22,0.1)" />
        <SectionGlow className="-right-28 bottom-0" color="rgba(29,78,216,0.08)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* 左：悩みチェックリスト */}
            <div className="order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1e6] px-3.5 py-1.5 text-[0.72rem] font-extrabold tracking-[0.08em] text-[#ea580c]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                CHECK · こんな悩み、ありませんか？
              </p>
              <h2 className="mt-4 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.15rem]">
                その「続かない」、<br className="hidden sm:block" />
                <Penned>あなたのせい</Penned>じゃない。
              </h2>
              <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
                成績が伸び悩むほとんどの人が、同じ2つの穴——「続かない」「直されない」——に落ちています。ひとつでも当てはまったら、読み進めてください。
              </p>
              <ul className="mt-7 grid gap-3">
                {problems.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-3.5 rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_18px_36px_-30px_rgba(15,29,74,0.5)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[7px] border-2 border-[#f8b48a] bg-[#fff7f1] text-[#ea580c]"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.3 4.3L19 7" /></svg>
                    </span>
                    <span>
                      <p className="text-[1rem] font-bold leading-[1.55] text-[#0b1d4a]">{p.title}</p>
                      <p className="mt-1.5 text-[0.88rem] leading-[1.85] text-[#475569]">{p.body}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 右：イラスト＋安心のブリッジ */}
            <div className="relative order-1 mx-auto w-full max-w-md lg:order-2">
              <SectionGlow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(13,148,136,0.14)" />
              <Illust
                base="student-study"
                widths={[560, 1120]}
                width={1448}
                height={1086}
                alt="スマホと教材で学ぶ高校生のイラスト"
                sizes="(min-width: 1024px) 460px, 88vw"
                className="relative block h-auto w-full"
              />
              {/* 安心のひとこと（悩み→解決のブリッジ） */}
              <div className="relative -mt-2 rounded-[18px] bg-[linear-gradient(120deg,#0b1d4a,#0f5e5e)] px-5 py-4 text-white shadow-[0_28px_50px_-34px_rgba(11,29,74,0.7)] sm:-mt-4 sm:ml-6">
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#5eead4]">Good news</p>
                <p className="mt-1 text-[1.05rem] font-extrabold leading-[1.5]">
                  その悩み、ぜんぶ<span className="text-[#fdba74]">「仕組み」</span>で解決できます。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── PILLARS（教材 × 習慣化 × 添削） ───────── */}
      <section id="features" className="cv-defer relative scroll-mt-24 overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        {/* 直前セクション(#f8fafc)から曲線でつなぐ */}
        <CurveDivider fill="#f8fafc" />
        <DarkSectionDecor />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">
              The Method · ノビットの3本柱
            </p>
            <h2 className="mt-3 text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.3rem]">
              <span className="text-[#7dd3fc]">教材</span> ×{" "}
              <span className="text-[#5eead4]">習慣化</span> ×{" "}
              <span className="text-[#fdba74]">添削</span>。
            </h2>
            <p className="mt-4 text-[0.98rem] leading-[1.95] text-white/80">
              3つがかみ合って、はじめて学習は「仕組み」になる。どれが欠けても、続かないか・直らないかのどちらかです。
            </p>
          </div>

          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <li
                key={p.no}
                className="group overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] ring-1 ring-white/20 transition duration-300 hover:-translate-y-1.5"
              >
                {/* 画像パネル（各柱の色でトーンづけ） */}
                <div
                  className="relative flex aspect-[16/11] items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(120% 120% at 50% 15%, ${p.color}1f, #ffffff 72%)` }}
                >
                  <span aria-hidden="true" className="absolute right-4 top-4 h-16 w-16 rounded-full" style={{ background: `${p.color}14` }} />
                  <span aria-hidden="true" className="absolute -bottom-6 -left-4 h-20 w-20 rounded-full" style={{ background: `${p.color}12` }} />
                  <Illust
                    base={p.icon}
                    widths={[128, 256]}
                    width={256}
                    height={256}
                    alt={`${p.tag}のイラスト`}
                    sizes="(min-width: 1024px) 240px, 60vw"
                    className="relative h-[68%] w-auto object-contain drop-shadow-[0_18px_24px_rgba(11,29,74,0.18)] transition duration-300 group-hover:scale-[1.05]"
                  />
                  <span
                    className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.76rem] font-extrabold text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                    style={{ background: p.color }}
                  >
                    <span aria-hidden="true" className="text-[0.66rem] font-black opacity-80">{p.no}</span>
                    {p.tag}
                  </span>
                </div>
                {/* テキスト */}
                <div className="p-6 sm:p-7">
                  <p className="text-[1.18rem] font-extrabold leading-[1.5] text-[#0b1d4a]">{p.title}</p>
                  <p className="mt-3 text-[0.9rem] leading-[1.95] text-[#475569]">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-9 max-w-2xl text-center text-[0.9rem] leading-[1.9] text-white/70">
            通塾も時間割もありません。生活のリズムの中で、学習が自然に回り続けます。
          </p>
        </Container>
      </section>

      {/* ───────── MATERIALS（教材アピール・主役＝教材） ───────── */}
      <section className="cv-defer bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Materials · 教材のこと
            </p>
            <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              武器は、著者が書き下ろした<Penned color="#1d4ed8">教材</Penned>。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              市販の寄せ集めではありません。16冊を刊行した開発者が「理解で解く」設計で書き下ろし、取り組みやすいサイズに分割。<strong className="font-bold text-[#0b1d4a]">この1冊を最後までやり切ること</strong>が、いちばんの近道です。
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <ul className="grid gap-3 sm:grid-cols-3">
              {materialPoints.map((m, i) => (
                <li key={m.label} className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <p className="flex items-center gap-2 text-[0.98rem] font-extrabold text-[#0b1d4a]">
                    <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[#1d4ed8] text-[0.74rem] font-black text-white">{i + 1}</span>
                    {m.label}
                  </p>
                  <p className="mt-2.5 text-[0.86rem] leading-[1.85] text-[#475569]">{m.body}</p>
                </li>
              ))}
            </ul>

            {/* 教材 × 仕組み、両輪で1冊をやり切る */}
            <div className="relative mt-6 overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#0b1d4a_0%,#0f5e5e_100%)] p-7 text-white shadow-[0_34px_60px_-40px_rgba(11,29,74,0.7)] sm:p-9">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#5eead4]">教材 × 仕組み、両輪で。</p>
              <p className="mt-3 text-balance text-[1.25rem] font-extrabold leading-[1.55] sm:text-[1.5rem]">
                「<span className="text-[#7dd3fc]">何をやるか</span>（教材）」と「<span className="text-[#fdba74]">やり切る仕組み</span>（習慣化＋添削）」。
                この両輪で、1冊を<span className="text-[#5eead4]">最後まで</span>終わらせます。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "手が動く", b: "自作教材で答案を書く。点に変わる。" },
                  { t: "続く", b: "今日の範囲＋アプリで習慣に。" },
                  { t: "直る", b: "著者本人の添削で軌道修正。" },
                ].map((c) => (
                  <li key={c.t} className="rounded-[14px] bg-white/[0.08] p-4 ring-1 ring-white/15">
                    <p className="flex items-center gap-1.5 text-[0.98rem] font-extrabold">
                      <span aria-hidden="true" className="text-[#5eead4]">◎</span>
                      {c.t}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] leading-[1.8] text-white/75">{c.b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.86rem] leading-[1.85] text-[#475569]">
            授業はしません。自分の手で解いて、提出するたびに著者本人に見てもらう。だから「分かったつもり」で止まらず、1冊をやり切れます。
          </p>
          <InlineCta note="必要な教材を選ぶだけ。8/6まで、2教材パック割でおトクにはじめられます。" />
        </Container>
      </section>

      {/* ───────── FLOW（学習サイクル） ───────── */}
      <section id="flow" className="cv-defer relative overflow-hidden scroll-mt-24 bg-white">
        <SectionGlow className="-right-24 top-0" color="rgba(13,148,136,0.12)" />
        <SectionGlow className="-left-28 bottom-10" color="rgba(29,78,216,0.08)" />
        <Container className="relative px-6 py-16 sm:py-24 lg:pb-44">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Learning Loop · 学習サイクル
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              出す → 振り返る → 次へ。<Penned color="#0d9488">好きな時に</Penned>くりかえす。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              1回10〜20分から。シンプルなループだから、無理なく続いて積み上がります。
            </p>
          </div>
          <div className="relative mx-auto mt-12 max-w-4xl">
            {/* 背景の点線ループ環＋中央ハブ（大画面のみ・サイクル感を図解） */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[22%] inset-y-2 hidden rounded-full border-2 border-dashed border-[rgba(13,148,136,0.28)] lg:block" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-[linear-gradient(135deg,#0b1d4a,#0f5e5e)] text-center text-white shadow-[0_24px_44px_-24px_rgba(11,29,74,0.8)]">
                <span className="text-[0.7rem] font-bold leading-tight">好きな時に<br />くりかえす</span>
              </span>
            </div>

            <ol className="grid gap-5 sm:grid-cols-2">
              {flow.map((s, i) => (
                <li
                  key={s.step}
                  className="group relative flex items-start gap-4 rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_26px_50px_-40px_rgba(11,29,74,0.55)] transition hover:-translate-y-1"
                >
                  {/* グリフ入りの色付きノード */}
                  <span
                    className="relative grid h-14 w-14 shrink-0 place-items-center rounded-[16px] text-white shadow-[0_16px_28px_-16px_rgba(0,0,0,0.5)]"
                    style={{ background: s.color }}
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={s.glyph} />
                    </svg>
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-[0.72rem] font-extrabold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.1)]">
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-baseline gap-2">
                      <span className="text-[1.15rem] font-extrabold leading-none text-[#0b1d4a]">{s.verb}</span>
                      <span className="text-[0.68rem] font-bold tracking-[0.12em] text-[#94a3b8]">{s.step}</span>
                    </p>
                    <p className="mt-2 text-[1rem] font-bold leading-[1.45] text-[#0b1d4a]">{s.title}</p>
                    <p className="mt-1.5 text-[0.86rem] leading-[1.85] text-[#475569]">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
        {/* 学習の流れを見守るノビットくん（デスクトップのみ） */}
        <GroundedMascot variant="point" position="bottom-4 right-[4%] xl:right-[7%]" sizeClass="h-36 xl:h-40" />
      </section>

      {/* ───────── APP（習慣化のエンジン） ───────── */}
      <section id="app" className="cv-defer scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            {/* アプリ画面 */}
            <div className="relative order-1 flex justify-center lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.18),transparent)] blur-2xl sm:h-96 sm:w-96"
              />
              <AppScreen variant="returned" className="relative float-slow" />
            </div>

            <div className="order-2 lg:order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                App · 続ける仕組み、まるごと
              </p>
              <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                習慣化は、根性ではなく
                <br className="hidden sm:block" />
                アプリの仕事。
              </h2>
              <p className="mt-4 max-w-lg text-[0.98rem] leading-[1.9] text-[#334155]">
                課題・提出・添削・進捗を、専用アプリ「ノビットスタディ」に集約。連続記録やはなまるで、続けるほど楽しくなる。
                <strong className="font-bold text-[#0b1d4a]">生徒アカウントの画面を家でも確認</strong>できるので、提出・返却・連続日数を見守れます。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {appPoints.map((p) => (
                  <li key={p.title} className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                    <p className="flex items-center gap-2 text-[1rem] font-bold leading-[1.4] text-[#0b1d4a]">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                      {p.title}
                    </p>
                    <p className="mt-2 text-[0.86rem] leading-[1.8] text-[#475569]">{p.body}</p>
                  </li>
                ))}
              </ul>

              {/* 家での進捗確認（イラストで見せる） */}
              <figure className="mt-5 flex items-center gap-4 rounded-[18px] bg-[#eef6f6] p-4 ring-1 ring-[rgba(13,148,136,0.2)]">
                <Illust
                  base="parent-child"
                  widths={[520, 1040]}
                  width={1254}
                  height={1254}
                  alt="スマホの学習進捗を一緒に見る保護者と中高生のイラスト"
                  sizes="88px"
                  className="h-20 w-20 shrink-0 rounded-[12px] object-cover ring-1 ring-[rgba(13,148,136,0.2)]"
                />
                <figcaption>
                  <p className="text-[0.98rem] font-extrabold leading-[1.45] text-[#0b1d4a]">
                    家でも、同じ画面で見守れる。
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-[1.8] text-[#475569]">
                    生徒アカウントの画面を共有すれば、提出・添削・連続日数がひと目で。声をかけるタイミングまで分かるから、無理なく応援できます。
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── CORRECTION（添削の中身） ───────── */}
      <section className="cv-defer relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-left-24 top-4" color="rgba(234,88,12,0.1)" />
        <SectionGlow className="-right-24 bottom-4" color="rgba(13,148,136,0.1)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            {/* 左：採点済み答案のイラスト（赤ペン添削・合格スタンプ・先生コメントを内包） */}
            <div className="relative order-1 mx-auto w-full max-w-md">
              <SectionGlow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" color="rgba(234,88,12,0.18)" />
              <div className="relative -rotate-2 overflow-hidden rounded-[18px] bg-white shadow-[0_44px_80px_-44px_rgba(11,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.1)] transition hover:rotate-0">
                <Illust
                  base="correction-graded"
                  widths={[560, 1120]}
                  width={1448}
                  height={1086}
                  alt="赤ペンで添削された数学の答案。途中式へのチェック、合格スタンプ、先生の手書きコメント入り"
                  sizes="(min-width: 1024px) 440px, 88vw"
                  className="block h-auto w-full"
                />
              </div>
              <span className="absolute -right-3 -top-3 -rotate-6 rounded-full bg-[#ea580c] px-3.5 py-1.5 text-[0.78rem] font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(234,88,12,0.9)]">
                提出ごとに返る
              </span>
            </div>

            {/* 右：4つの指摘 */}
            <div className="order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
                Correction · 人が読む添削
              </p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                答案の向こうに、いつも<Penned>人がいる</Penned>。
              </h2>
              <p className="mt-4 max-w-lg text-[0.96rem] leading-[1.95] text-[#475569]">
                答案には、講師が目を通してコメントを返します。ただの丸つけと違い、やり取りが生まれ、進み具合まで見てもらえる。「ちゃんと見てくれている」——その手ごたえが、次に進む力を支えます。
              </p>
              <ul className="mt-7 grid gap-3">
                {correctionPoints.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-start gap-4 rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_20px_38px_-34px_rgba(11,29,74,0.5)]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0b1d4a] text-[1rem] font-extrabold text-white">
                      {c.mark}
                    </span>
                    <span>
                      <p className="text-[1.05rem] font-extrabold leading-[1.4] text-[#0b1d4a]">{c.title}</p>
                      <p className="mt-1 text-[0.86rem] leading-[1.85] text-[#475569]">{c.body}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.86rem] leading-[1.85] text-[#475569]">
            見てくれる人がいて、やり取りが続く。ひとりにしないから、「分かったつもり」で止まらない。<strong className="font-bold text-[#0b1d4a]">学習を止めない見守りと伴走そのもの</strong>——それが、ノビットの添削です。
          </p>
          <InlineCta note="提出ごとの添削を、今日から。教材ごとに選べます。" />
        </Container>
      </section>

      {/* ───────── MATERIALS（教材・実績） ───────── */}
      <section id="materials" className="cv-defer scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-2 lg:order-1">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">
                Materials · 教材・実績
              </p>
              <h2 className="mt-3 text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.3rem]">
                書いた本人が、
                <br className="hidden sm:block" />
                あなたの答案を<Penned>直接見る</Penned>。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                演習の土台は、ノビットのために書き下ろした
                <strong className="font-bold text-[#0b1d4a]">公式教材</strong>。
                数学（ⅠA・ⅡBC・ⅢC）に加えて、化学基礎・化学標準・英語長文・英文法まで
                <strong className="font-bold text-[#0b1d4a]">演習教材として公開中</strong>。
                さらに開発者が制作する
                <strong className="font-bold text-[#0b1d4a]">『考える力を育てる』シリーズ（全16冊）</strong>
                も演習に活用します。
                <strong className="font-bold text-[#0b1d4a]">教材が豊富だから、日々の演習に困りません。</strong>
                そのすべてを、つくった本人が添削します。
              </p>
              <ul className="mt-6 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155]">
                {[
                  "ノビット公式教材で、記述前提の演習を積む",
                  "数学・化学・英語の公式教材を、表紙つきで確認できる",
                  "『考える力を育てる』シリーズ16冊も演習に活用できる",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCta href="/apply">買い切りではじめる</PrimaryCta>
                <a
                  href={kdpAmazonUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b1d4a] px-6 text-[0.95rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                >
                  Amazon で教材を見る <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                実際の公式演習本（数学Ⅲ C 関数）より
              </p>
              {/* 本物の演習本：問題ページと解答・解説ページ */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <figure className="overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_26px_50px_-34px_rgba(11,29,74,0.5)]">
                  <PrintImage
                    base="print-problem"
                    alt="ノビット公式演習本の問題ページ（解答欄つき）"
                    sizes="(min-width: 1024px) 230px, 44vw"
                    className="block h-auto w-full"
                  />
                  <figcaption className="border-t border-[rgba(15,29,74,0.06)] bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">
                    問題ページ（解答欄つき）
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-[12px] bg-white ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_26px_50px_-34px_rgba(11,29,74,0.5)]">
                  <PrintImage
                    base="print-solution"
                    alt="ノビット公式演習本の解答・解説ページ（方針つきの丁寧な解説）"
                    sizes="(min-width: 1024px) 230px, 44vw"
                    className="block h-auto w-full"
                  />
                  <figcaption className="border-t border-[rgba(15,29,74,0.06)] bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">
                    解答・解説（方針つき）
                  </figcaption>
                </figure>
              </div>
              <p className="mt-3 text-center text-[0.78rem] leading-[1.7] text-[#64748b]">
                アプリで取り組むノビット公式演習本（数値違いの並行類題＋方針つき解答解説）。
              </p>
            </div>
          </div>

          {/* ノビット公式教材 */}
          <div className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#0b1d4a] px-3 py-1 text-[0.68rem] font-extrabold tracking-[0.08em] text-white">
                ノビット公式教材
              </p>
              <h3 className="mt-4 text-[1.5rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.9rem]">
                演習の土台は、公式教材から。
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
                ノビットのために書き下ろした公式教材。
                <strong className="font-bold text-[#0b1d4a]">数学（ⅠA・ⅡBC・ⅢC）・化学基礎・化学標準・英語長文・英文法</strong>
                まで、提出・解答解説・添削に合わせて使える形でそろえています。
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {officialBooks.map((b) => (
                <li key={b.asin}>
                  <a
                    href={`https://www.amazon.co.jp/dp/${b.asin}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/book flex h-full flex-col rounded-[16px] bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-34px_rgba(11,29,74,0.45)]"
                  >
                    <div className="relative overflow-hidden rounded-[10px] bg-[#0b1d4a] shadow-[0_18px_30px_-18px_rgba(11,29,74,0.55)]">
                      <span className="absolute left-2 top-2 z-10 rounded-full px-2 py-0.5 text-[0.6rem] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(15,29,74,0.45)]" style={{ background: b.accent }}>
                        {b.subject}
                      </span>
                      <picture>
                        <source type="image/avif" srcSet={`/books/${b.asin}.avif`} />
                        <source type="image/webp" srcSet={`/books/${b.asin}.webp`} />
                        <img
                          src={`/books/${b.asin}.webp`}
                          alt={`${b.title}（森祐太・ノビット公式教材）の表紙`}
                          width={355}
                          height={500}
                          loading="lazy"
                          decoding="async"
                          className="block aspect-[71/100] h-auto w-full object-cover"
                        />
                      </picture>
                    </div>
                    <p className="mt-3 text-[0.92rem] font-bold leading-[1.45] text-[#0b1d4a] transition group-hover/book:text-[#0f766e]">
                      {b.title}
                    </p>
                    <p className="mt-1 text-[0.76rem] leading-[1.6] text-[#64748b]">{b.sub}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#ea580c]">
                      Amazonで見る <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-[0.74rem] font-semibold text-[#64748b]">
              <li className="text-[#475569]">続々制作中：</li>
              {["物理 基礎・標準・発展"].map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-white px-3 py-1 text-[#94a3b8] ring-1 ring-dashed ring-[rgba(15,29,74,0.15)]"
                >
                  {s}（準備中）
                </li>
              ))}
            </ul>
          </div>

          {/* あわせて演習できる教材：『考える力を育てる』シリーズ 全ラインナップ */}
          <div className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">
                Books · あわせて演習できる教材
              </p>
              <h3 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.9rem]">
                『考える力を育てる』シリーズ（全16冊）
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
                公式教材に加え、開発者が制作するこのシリーズも演習に活用できます。
                <strong className="font-bold text-[#0b1d4a]">理論・演習・入試対策・総まとめ</strong>まで、学びはじめから合格までを切れ目なく支えます。各表紙から Amazon の商品ページへ。
              </p>
            </div>

            <div className="mt-10 grid gap-8">
              {bookGroups.map((group) => (
                <div key={group.group}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[rgba(15,29,74,0.08)] pb-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.06em] text-white"
                      style={{ background: group.accent }}
                    >
                      {group.group}
                    </span>
                    <span className="text-[0.82rem] text-[#64748b]">{group.note}</span>
                  </div>
                  <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                    {group.books.map((b) => (
                      <li key={b.asin}>
                        <a
                          href={`https://www.amazon.co.jp/dp/${b.asin}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group/book flex h-full flex-col"
                        >
                          <div className="overflow-hidden rounded-[10px] bg-[#0b1d4a] shadow-[0_18px_30px_-18px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.1)] transition group-hover/book:-translate-y-1 group-hover/book:shadow-[0_26px_44px_-20px_rgba(11,29,74,0.6)]">
                            <picture>
                              <source type="image/avif" srcSet={`/books/${b.asin}.avif`} />
                              <source type="image/webp" srcSet={`/books/${b.asin}.webp`} />
                              <img
                                src={`/books/${b.asin}.webp`}
                                alt={`考える力を育てる ${b.title}（森祐太）の表紙`}
                                width={320}
                                height={451}
                                loading="lazy"
                                decoding="async"
                                className="block aspect-[71/100] h-auto w-full object-cover"
                              />
                            </picture>
                          </div>
                          <p className="mt-2.5 text-[0.84rem] font-bold leading-[1.4] text-[#0b1d4a] transition group-hover/book:text-[#0f766e]">
                            {b.title}
                          </p>
                          <p className="mt-1 text-[0.72rem] leading-[1.6] text-[#64748b]">{b.sub}</p>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-[#ea580c]">
                            Amazonで見る <span aria-hidden="true">↗</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href={kdpAmazonUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-7 text-[0.96rem] font-semibold tracking-[0.01em] text-white transition hover:bg-[#0f5e5e]"
              >
                Amazon で「考える力を育てる 森祐太」を見る <span aria-hidden="true">↗</span>
              </a>
              <p className="text-[0.8rem] text-[#94a3b8]">
                新刊・電子書籍版・無料配布の演習プリント情報もあわせてご覧いただけます。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── MESSAGE（開発・添削担当より） ───────── */}
      <section className="cv-defer bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto grid max-w-4xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <div className="rounded-[24px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_60px_-44px_rgba(15,29,74,0.4)]">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0b1d4a] to-[#0f5e5e] text-[1.5rem] font-extrabold text-white"
                  >
                    森
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                      開発・添削担当
                    </p>
                    <p className="text-[1.2rem] font-extrabold leading-tight text-[#0b1d4a]">森 祐太</p>
                    <p className="mt-0.5 text-[0.78rem] font-semibold text-[#0f766e]">
                      名古屋大学 工学部 ／ 応用情報技術者
                    </p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2 border-t border-[rgba(15,29,74,0.08)] pt-4 text-[0.85rem] leading-[1.7] text-[#475569]">
                  {[
                    "『考える力を育てる』シリーズ 全16冊を執筆",
                    "公式暗記に頼らない「理解で解く」教材設計",
                    "物理・化学・数学・英語の答案を、添削",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                {/* 実物の書影で「全16冊執筆」を可視化 */}
                <div className="mt-5 border-t border-[rgba(15,29,74,0.08)] pt-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#64748b]">
                    著書『考える力を育てる』シリーズ（全16冊・一部）
                  </p>
                  <ul className="mt-3 grid grid-cols-5 gap-2">
                    {bookGroups.flatMap((g) => g.books).slice(0, 5).map((b) => (
                      <li key={b.asin} className="overflow-hidden rounded-[6px] shadow-[0_10px_18px_-12px_rgba(11,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.1)] transition hover:-translate-y-0.5">
                        <picture>
                          <source type="image/avif" srcSet={`/books/${b.asin}.avif`} />
                          <source type="image/webp" srcSet={`/books/${b.asin}.webp`} />
                          <img src={`/books/${b.asin}.webp`} alt={`考える力を育てる ${b.title}（森祐太）`} width={142} height={200} loading="lazy" decoding="async" className="block aspect-[71/100] h-auto w-full object-cover" />
                        </picture>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center text-[0.86rem] font-semibold text-[#0f766e] hover:text-[#0b1d4a]"
                >
                  つくり手の考え方を見る <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                Message · つくり手より
              </p>
              <h2 className="mt-3 text-balance text-[1.6rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
                「分かったつもり」を、終わりにする。
              </h2>
              <div className="mt-5 grid gap-4 text-[0.96rem] leading-[2] text-[#334155]">
                <p>
                  私自身、公式暗記で物理に苦しみ、解説を読んでは「分かったつもり」で止まっていました。
                  本当に力がついたのは、自分で答案を書き、どこが足りないかを一枚ずつ直してもらえたときでした。
                </p>
                <p>
                  だからノビットは、授業をしません。私が書いた教材で自分のペースで手を動かし、その答案を私が添削する。
                  <strong className="font-bold text-[#0b1d4a]">途中式・考え方・減点ポイント</strong>まで踏み込み、
                  「次にどう直すか」が分かる形でお返しします。
                </p>
                <p>
                  派手さはありません。でも、続く仕組みと提出ごとのフィードバックこそが、いちばん確実に伸びる道だと信じています。
                  自分のペースで、少しずつ。一緒に積み上げていきましょう。
                </p>
              </div>
              {/* 手書きサイン風（人の手の気配） */}
              <p className="mt-6 text-[1.4rem] font-extrabold italic tracking-wide text-[#0b1d4a]" style={{ fontFamily: "'Hiragino Mincho ProN', 'YuMincho', serif" }}>
                森 祐太
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── FOR YOU（こんな方へ・やわらかく万人受け） ───────── */}
      <section className="cv-defer relative overflow-hidden bg-[#f8fafc]">
        <SectionGlow className="-right-24 top-8" color="rgba(13,148,136,0.12)" />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              For You · こんな方へ
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              得意でも、苦手でも。<Penned color="#0d9488">あなたのペース</Penned>で。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              今の成績も、得意・苦手も問いません。「自分のペースで続けたい」——その気持ちさえあれば、十分です。
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {forYouFit.map((f) => (
              <li
                key={f.title}
                className="group overflow-hidden rounded-[20px] bg-white ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_30px_56px_-44px_rgba(11,29,74,0.5)] transition hover:-translate-y-1.5 hover:shadow-[0_36px_64px_-40px_rgba(11,29,74,0.55)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(160deg,#eef4fb,#ffffff)]">
                  <Illust
                    base={f.img}
                    widths={[360, 640]}
                    width={1254}
                    height={1254}
                    alt={`${f.title}——そんなあなたへ`}
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 44vw, 88vw"
                    className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.04]"
                  />
                  <span aria-hidden="true" className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#0f766e] shadow-[0_8px_16px_-8px_rgba(13,148,136,0.6)] backdrop-blur">
                    <IconCheck className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[1rem] font-bold leading-[1.5] text-[#0b1d4a]">「{f.title}」</p>
                  <p className="mt-2 text-[0.88rem] leading-[1.85] text-[#475569]">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 正直な一言は、冷たい「不向き」ではなく、やさしい相談導線として */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 rounded-[20px] bg-[#eef6f6] p-6 text-center ring-1 ring-[rgba(13,148,136,0.18)] sm:flex-row sm:items-center sm:gap-6 sm:text-left">
            <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#0f766e] shadow-[0_10px_20px_-12px_rgba(13,148,136,0.6)]">
              <IconChat className="h-6 w-6" />
            </span>
            <p className="text-[0.92rem] leading-[1.9] text-[#334155]">
              いまは対面授業やその場での質問対応は行わず、<strong className="font-bold text-[#0b1d4a]">「自分のペースで進める」</strong>ことに集中しています。
              「うちの子に合うかな？」と迷ったら、どんな小さなことでも気軽にご相談ください。
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-[#0f766e] px-5 text-[0.88rem] font-bold text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              相談してみる
            </Link>
          </div>
        </Container>
      </section>

      {/* ───────── 流れるキーワード帯（逆方向・再リズム） ───────── */}
      <MarqueeBand reverse />

      {/* ───────── PRICING（料金・対応科目） ───────── */}
      {/* ───────── PRICING（料金の告知・詳細は申込ページへ集約） ───────── */}
      <section id="pricing" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white shadow-[0_44px_90px_-55px_rgba(11,29,74,0.6)]">
            <Blob fill="#ffffff" className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 opacity-[0.06]" />
            <Blob fill="#5eead4" className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 opacity-[0.12]" />
            {/* パック割シール（キャンペーンと統一） */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 z-10 hidden rotate-12 sm:block">
              <Starburst className="h-24 w-24 drop-shadow-[0_12px_22px_rgba(0,0,0,0.35)]" />
            </div>
            <div className="relative px-6 py-12 text-center sm:px-12 sm:py-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <p className="relative text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">
                Price · 料金
              </p>
              <h2 className="relative mt-3 text-balance text-[2.4rem] font-extrabold leading-[1.15] tracking-[-0.01em] sm:text-[3.1rem]">
                1日たった{" "}
                <span className="text-[#fdba74]">{PER_DAY_PRICE}円</span>。
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-[1.02rem] font-bold leading-[1.7] text-white/90">
                約{PROGRAM_DAYS}日ぶん・毎回そのつど添削つき。
              </p>
              <p className="relative mx-auto mt-3 max-w-xl text-[0.94rem] leading-[1.9] text-white/75">
                買い切り{formatYen(MATERIAL_PRICE)}〜（税込）を約{GRADING_COUNT}回分でならすと1日{PER_DAY_PRICE}円。入会金・追加費用は0円、理系を中心に10教材から、やり切る分だけ選べます。
              </p>

              {/* 約100日後に目指せること（成果イメージ） */}
              <div className="relative mx-auto mt-7 max-w-xl">
                <p className="text-[0.72rem] font-bold tracking-[0.16em] text-[#5eead4]">約{PROGRAM_DAYS}日、続けたその先に</p>
                <ul className="mt-3 grid gap-2 text-left sm:grid-cols-3">
                  {[
                    "記述力を、毎回の添削で鍛える",
                    "毎日机に向かう習慣がつく",
                    "自分の弱点が、はっきり見える",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 rounded-[14px] bg-white/[0.07] px-3 py-2.5 text-[0.82rem] font-semibold leading-[1.55] text-white/88 ring-1 ring-white/12">
                      <span aria-hidden="true" className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#5eead4] text-[#0b1d4a]">
                        <IconCheck className="h-2.5 w-2.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 今はじめる理由（誇張なし・今日から始められる／夏休み／パック割の締切） */}
              <ul className="relative mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.78rem] font-bold text-white/85">
                {["申し込んだその日から始められる", "夏休みのうちにまとまった量を進められる", `パック割は${CAMPAIGN_DEADLINE_LABEL}まで`].map((t, i, a) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1.5">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#fdba74]" />
                      {t}
                    </span>
                    {i < a.length - 1 && <span aria-hidden="true" className="text-white/30">/</span>}
                  </li>
                ))}
              </ul>

              <p className="relative mt-6">
                <span className="inline-flex -rotate-1 items-center gap-1.5 rounded-[12px] bg-[#f97316] px-4 py-2 text-[0.9rem] font-extrabold text-white shadow-[0_14px_28px_-14px_rgba(234,88,12,0.9)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  {CAMPAIGN_DEADLINE_LABEL}まで 開講記念パック割
                </span>
              </p>
              {/* 割引前→後の価格対比（2教材パック・申込直前の後押し） */}
              <div className="relative mx-auto mt-6 inline-flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 rounded-[18px] bg-white/[0.08] px-6 py-4 ring-1 ring-white/15">
                <span className="text-[0.84rem] font-bold text-white/85">2教材パック</span>
                <span className="text-[1rem] font-bold text-white/55 line-through decoration-2">{formatYen(listTotal(2))}</span>
                <span aria-hidden="true" className="text-[1.1rem] font-black text-white/80">→</span>
                <span className="text-[2.1rem] font-black leading-none tracking-[-0.02em] text-[#fdba74] sm:text-[2.4rem]">{formatYen(buyoutTotal(2, true))}</span>
                <span className="text-[0.8rem] font-bold text-white/85">（税込・買い切り）</span>
              </div>
              <div className="relative mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <PrimaryCta href="/apply">料金を見て申し込む（買い切り）</PrimaryCta>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.98rem] font-semibold text-white transition hover:bg-white hover:text-[#0b1d4a]"
                >
                  まず質問する
                </Link>
              </div>
              <p className="relative mt-5 text-[0.78rem] leading-[1.7] text-white/70">
                申込ページで教材を選ぶと買い切り価格を自動計算。詳しい料金表・対応教材もそちらでご確認いただけます。
              </p>
              <p className="relative mt-2 text-[0.7rem] leading-[1.7] text-white/45">
                物理 基礎・物理 標準・物理 発展・化学基礎・化学・数学IA・数学IIBC・数学IIIC・英語長文・英文法
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="cv-defer relative overflow-hidden scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            {/* 左：見出し＋マスコット＋相談導線 */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                FAQ · よくある質問
              </p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.1rem]">
                まだ、気になる<br className="hidden lg:block" />ことは？
              </h2>
              <p className="mt-3 text-[0.94rem] leading-[1.9] text-[#475569]">
                よくいただく質問をまとめました。ここに無いことは、どんな小さなことでも気軽にご相談ください。
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-[#eef6f6] p-4 ring-1 ring-[rgba(13,148,136,0.18)]">
                <Mascot variant="wave" className="h-20 w-auto shrink-0" />
                <div>
                  <p className="text-[0.9rem] font-extrabold text-[#0b1d4a]">解決しないときは</p>
                  <Link
                    href="/contact"
                    className="mt-1.5 inline-flex min-h-10 items-center justify-center rounded-full bg-[#0f766e] px-5 text-[0.86rem] font-bold text-white transition hover:bg-[#0b1d4a]"
                  >
                    相談してみる <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* 右：アコーディオン（ネイティブ details・JSなし） */}
            <ul className="grid gap-3">
              {faqItems.map((item, i) => (
                <li key={item.question}>
                  <details
                    className="group rounded-[16px] bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.06)] transition open:bg-white open:shadow-[0_24px_44px_-36px_rgba(11,29,74,0.4)] open:ring-[rgba(13,148,136,0.22)]"
                    {...(i === 0 ? { open: true } : {})}
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
                      <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#0d9488] text-[0.78rem] font-bold text-white">
                        Q
                      </span>
                      <span className="flex-1 text-[0.98rem] font-bold leading-[1.55] text-[#0b1d4a]">{item.question}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#0f766e] transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="border-t border-dotted border-[rgba(15,29,74,0.12)] px-5 pb-5 pt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="cv-defer relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.3),transparent)]"
        />
        <Container className="relative px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-4xl items-center gap-8 text-center lg:grid-cols-[auto_1fr] lg:gap-14 lg:text-left">
            {/* ノビットくんを暗背景の中で発光と接地でシーンに立たせる */}
            <div className="relative mx-auto w-fit lg:mx-0">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(94,234,212,0.4),rgba(94,234,212,0.12)_55%,transparent)] blur-md sm:h-56 sm:w-56"
              />
              <picture>
                <source type="image/avif" srcSet="/brand/nobit-kun-wave-240.avif 240w, /brand/nobit-kun-wave-480.avif 480w" sizes="200px" />
                <source type="image/webp" srcSet="/brand/nobit-kun-wave-240.webp 240w, /brand/nobit-kun-wave-480.webp 480w" sizes="200px" />
                <img
                  src="/brand/nobit-kun-wave-480.webp"
                  alt="ノビットスタディのマスコット「ノビットくん」"
                  width={740}
                  height={896}
                  loading="lazy"
                  decoding="async"
                  className="relative h-36 w-auto sm:h-44 lg:h-52"
                />
              </picture>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-28 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(94,234,212,0.55),transparent)] blur-[3px] sm:w-32"
              />
            </div>

            <div>
              <h2 className="text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.4rem]">
                日々の学習を、今日から仕組みに。
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-[1.95] text-white/85 lg:mx-0">
                必要な教材を選んで、買い切りではじめられます。入会金・追加費用は0円、面談や勧誘もありません。
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <PrimaryCta href="/apply">買い切りではじめる</PrimaryCta>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.98rem] font-semibold text-white transition hover:bg-white hover:text-[#0b1d4a]"
                >
                  相談してみる
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* モバイル固定 CTA バー（スマホ最優先・常時表示で申込導線を確保） */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(15,29,74,0.1)] bg-white/95 px-4 py-2.5 shadow-[0_-8px_24px_-12px_rgba(15,29,74,0.25)] backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.82rem] font-extrabold text-[#0b1d4a]">
              1教材 買い切り¥14,800〜・添削込み
            </p>
            <p className="truncate text-[0.68rem] text-[#64748b]">8/6まで開講記念パック割／入会金0円</p>
          </div>
          <Link
            href="/apply"
            className="relative inline-flex min-h-11 shrink-0 items-center justify-center overflow-hidden rounded-full px-5 text-[0.86rem] font-bold text-white shadow-[0_8px_18px_-8px_rgba(234,88,12,0.7)]"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316,#ea580c)]" />
            <span className="relative">申し込む</span>
          </Link>
        </div>
      </div>
    </>
  );
}
