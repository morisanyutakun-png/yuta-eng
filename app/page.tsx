import type { Metadata } from "next";
import Link from "next/link";

import { AppScreen } from "@/components/app-screens";
import { Container } from "@/components/container";
import { PrimaryCta, SecondaryCta } from "@/components/cta";
import { Blob, CtaDoodle, CurveDivider, DarkSectionDecor, PhoneBackdrop, SectionGlow } from "@/components/decor";
import { JsonLd } from "@/components/json-ld";
import { GroundedMascot, Illust, Mascot, PrintImage } from "@/components/nobit-media";
import { bookGroups, officialBooks } from "@/data/books";
import { homeFaq } from "@/data/home";
import { kdpAmazonUrl } from "@/data/site";
import { firstMonthTotal, formatYen, monthlyTotal } from "@/lib/pricing";
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
    "ノビットスタディ 中高部は、塾でも参考書でもない「続く学習システム」。開発者が自作したオリジナル教材を毎日1枚ずつ進め、提出した答案に毎日添削。専用アプリで習慣化し、保護者も進捗を確認できます。物理・化学・数学・英語、教科ごと月¥4,980〜・初月半額・入会金/教材費0円。",
  path: "/",
});

/* ───────────────────────── content data ───────────────────────── */

// 独学・受け身の学びが続かない理由＝「習慣」と「フィードバック」の欠落。
const problems = [
  { title: "参考書は買った。でも、三日で開かなくなった。", body: "続かないのは、あなたの意志が弱いからじゃない。「続く仕組み」が無いだけです。" },
  { title: "解いて丸つけ。それで、やりっぱなし。", body: "どこがなぜ違うのか、誰も直してくれない。だから同じ失点を、何度もくり返す。" },
  { title: "映像授業は「見て、分かった気」になる。", body: "でも手を動かさないと、分かった“つもり”のまま。点には変わりません。" },
  { title: "そもそも、今日“何を”やればいいの？", body: "毎日の計画づくりに疲れて、勉強そのものが止まってしまう。" },
];

// ノビットの価値＝3本柱。教材 × 習慣化 × 添削。
const pillars = [
  {
    no: "01",
    tag: "教材",
    icon: "pillar-materials",
    color: "#1d4ed8",
    title: "自作のオリジナル教材を、毎日サイズで。",
    body: "16冊を刊行した開発者が「理解で解く」設計で書き下ろし。毎日少しずつ進む大きさに分割します。",
  },
  {
    no: "02",
    tag: "習慣化",
    icon: "pillar-habit",
    color: "#0d9488",
    title: "「今日やること」が決まっているから、続く。",
    body: "専用アプリが毎日1枚を配信。連続記録・はなまる・称号で、勉強が生活のリズムになります。",
  },
  {
    no: "03",
    tag: "添削",
    icon: "pillar-correction",
    color: "#ea580c",
    title: "出した答案に、毎日あなた専用の指摘。",
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
  { no: "03", verb: "返る", caption: "翌日までに、先生の添削が返ってくる", base: "print-problem", tilt: "-rotate-2", stamp: "添削" },
  { no: "04", verb: "進む", caption: "合格したら、次の教材へ", base: "print-cover", tilt: "-rotate-1", stamp: "合格" },
];

// 1日のサイクル（習慣ループ）。
const flow = [
  {
    step: "STEP 1",
    verb: "届く",
    color: "#1d4ed8",
    glyph: "M4 6h16v11H4z M4 6l8 6 8-6", // 通知が届く（封筒）
    title: "今日の1枚が届く",
    body: "その日やる課題がアプリに配信。「何をやろう」と迷う時間はゼロ。座ったらすぐ始められます。",
  },
  {
    step: "STEP 2",
    verb: "解く",
    color: "#0d9488",
    glyph: "M4 20l1-4L16 5l3 3L8 19zM14 7l3 3", // 鉛筆で書く
    title: "解いて、出す",
    body: "自作教材で理解して書く。提出と同時に解答・解説が届くので、その場で自己採点まで完了します。",
  },
  {
    step: "STEP 3",
    verb: "返る",
    color: "#ea580c",
    glyph: "M9 7L4 12l5 5M4 12h10a6 6 0 0 1 6 6", // 添削が返ってくる（返信矢印）
    title: "翌日までに添削が返る",
    body: "自己採点だけで終わりません。翌日までに、あなた専用の添削が返却。スマホでそのまま見返せます。",
  },
  {
    step: "STEP 4",
    verb: "進む",
    color: "#16a34a",
    glyph: "M20 7a8 8 0 1 0 1.5 5M20 4v4h-4", // くりかえす（ループ矢印）
    title: "直して、また明日へ",
    body: "指摘をもとに直し、連続記録を1日のばす。この小さなループが、力を積み上げます。",
  },
];

// 1 枚の添削が届けてくれる具体的な価値。
const correctionPoints = [
  {
    mark: "①",
    title: "途中式の論理",
    body: "式と式のつながりを確認。どこで論理が飛んだか、説明が足りないかを具体的に指摘します。",
  },
  {
    mark: "②",
    title: "減点ポイント",
    body: "本番なら何点引かれるか。記号の定義漏れ・条件の書き落としなど、もったいない失点を洗い出します。",
  },
  {
    mark: "③",
    title: "考え方の筋道",
    body: "なぜその方針を選ぶのか。より速く確実な解き筋があれば、考え方そのものを提案します。",
  },
  {
    mark: "④",
    title: "次の一手",
    body: "弱点に合わせて、次に取り組む課題を提示。やみくもではなく、必要な順番で積み上げます。",
  },
];

// 市場での立ち位置。他の学び方の「物足りなさ」を1行で。
const alternatives = [
  { label: "参考書・独学", lack: "安いが、続かない・直されない" },
  { label: "映像授業", lack: "見て満足。手が動かず点に変わりにくい" },
  { label: "集団・個別塾", lack: "通塾と受け身。費用も高くなりがち" },
  { label: "一般的な通信教育", lack: "教材は既製、添削は数週間に一度" },
];

// あらゆる段階の生徒に「自分のことだ」と思ってもらえるよう、入門〜難関までを広く。
// img は用意されたイラスト（連番は section の逆順で生成されているため明示的に対応づけ）。
const forYouFit = [
  { title: "何から手をつければいいか分からない", body: "今日やる1枚が毎日届くから、迷わず始められます。", img: "foryou-6" },
  { title: "毎日続けられる自信が、まだない", body: "続ける仕組みごとお渡しします。続け方から一緒に。", img: "foryou-5" },
  { title: "解けるのに、記述答案に自信がない", body: "途中式・考え方まで、毎日の添削で仕上げます。", img: "foryou-4" },
  { title: "部活や習い事で、時間が取りにくい", body: "1回10〜20分から。スキマ時間で積み上がります。", img: "foryou-3" },
  { title: "難関大・名大の記述まで本気で伸ばしたい", body: "基礎から入試レベルまで、切れ目なく対応します。", img: "foryou-2" },
  { title: "子どもの学習を、そっと見守りたい", body: "保護者も同じアプリで進捗を確認できて安心です。", img: "foryou-1" },
];

// アプリ「ノビットスタディ」＝習慣化のエンジン。
const appPoints = [
  { title: "今日の1枚が届く", body: "その日やる課題が毎日配信。迷わず始められ、勉強が習慣に変わります。" },
  { title: "添削がそのまま返る", body: "提出した答案に、途中式・減点ポイントまでの添削が返却。スマホで見返せます。" },
  { title: "保護者も進捗を確認", body: "提出数・添削完了・連続日数を見える化。保護者も同じ画面で見守れて安心です。" },
  { title: "続けたくなる仕組み", body: "はなまる・称号・連続記録で、毎日の学習が自然と積み上がります。" },
];

const faqItems = homeFaq;

// 流れる帯（マーキー）のフレーズ。視覚的なリズム＋SEO のキーワードを兼ねる。
const marqueeItems = [
  "物理・化学・数学・英語",
  "毎日演習 × 毎日添削",
  "提出と同時に解答・解説",
  "翌日までにプロの添削",
  "自作オリジナル教材",
  "習慣化アプリで毎日続く",
  "保護者も進捗を確認",
  "入会金・教材費 0円",
  "いまなら初月半額",
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
        <PrimaryCta href="/apply">料金を見て申し込む（初月半額）</PrimaryCta>
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
          <p className="text-[0.6rem] font-extrabold tracking-[0.14em] text-[#ea580c]">初月</p>
          <p className="mt-1 text-[1.55rem] font-black text-[#ea580c]">半額</p>
          <p className="mt-1 text-[0.58rem] font-black tracking-[0.08em] text-[#f97316]">50% OFF</p>
        </div>
      </div>
    </div>
  );
}

/**
 * キャンペーン告知バンド（toC の主役）。実在するオファー（初月半額・入会/教材費0円）を
 * 大きな数字と割引前→後の対比で一気に見せ、購買行動の背中を押す。虚偽の実績は載せない。
 */
function CampaignBanner() {
  const regular = monthlyTotal(1);
  const first = firstMonthTotal(1);
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
                CAMPAIGN · 新規開講キャンペーン実施中
              </p>
              <p className="mt-2.5 text-[1.55rem] font-black leading-[1.15] tracking-[-0.01em] text-white sm:text-[2.05rem]">
                いま始めると、初月半額。
              </p>
              <p className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 lg:justify-start">
                <span className="text-[0.8rem] font-bold text-white/90">1科目あたり</span>
                <span className="text-[0.98rem] font-bold text-white/70 line-through decoration-2">{formatYen(regular)}</span>
                <span aria-hidden="true" className="text-[1.1rem] font-black text-white/85">→</span>
                <span className="text-[2.1rem] font-black leading-none tracking-[-0.02em] text-white sm:text-[2.5rem]">{formatYen(first)}</span>
                <span className="text-[0.8rem] font-bold text-white/90">/ 初月（税込）</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-1.5 rounded-full bg-white px-8 text-[1rem] font-extrabold text-[#ea580c] shadow-[0_18px_34px_-16px_rgba(88,20,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-16px_rgba(88,20,0,0.7)]"
            >
              初月半額ではじめる
              <span aria-hidden="true">→</span>
            </Link>
            <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.74rem] font-bold text-white">
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />入会金0円
              </li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />教材費0円
              </li>
              <li aria-hidden="true" className="text-white/50">/</li>
              <li className="flex items-center gap-1">
                <IconCheck className="h-3.5 w-3.5" />いつでも解約OK
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** セクションに奥行きを出すやわらかい光（装飾）。overflow-hidden な relative 親に置く。 */
/** 数字で価値を一気に見せる帯（訴求＋デザインのアクセント）。 */
function StatsBand() {
  const stats = [
    { n: "9", u: "科目", d: "物理・化学・数学・英語" },
    { n: "¥4,980", u: "〜/月", d: "1教科・税込" },
    { n: "毎日", u: "添削", d: "翌日までに返却" },
    { n: "0", u: "円", d: "入会金・教材費" },
  ];
  return (
    <section className="cv-defer relative overflow-hidden bg-white">
      <Container className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 rounded-[24px] bg-[linear-gradient(120deg,#f8fbff_0%,#eef6f6_100%)] px-6 py-9 ring-1 ring-[rgba(15,29,74,0.06)] sm:grid-cols-4 sm:py-10">
          {stats.map((s, i) => (
            <div key={s.u} className={`text-center ${i > 0 ? "sm:border-l sm:border-[rgba(15,29,74,0.1)]" : ""}`}>
              <p className="flex items-baseline justify-center gap-0.5">
                <span className="bg-[linear-gradient(120deg,#1d4ed8,#0d9488)] bg-clip-text text-[1.9rem] font-extrabold leading-none tracking-[-0.02em] text-transparent sm:text-[2.3rem]">
                  {s.n}
                </span>
                <span className="text-[0.86rem] font-bold text-[#0f766e]">{s.u}</span>
              </p>
              <p className="mt-1.5 text-[0.72rem] leading-[1.5] text-[#64748b]">{s.d}</p>
            </div>
          ))}
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
          <div className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-24">
            <div className="min-w-0 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.06em] text-[#0f766e] shadow-[0_8px_20px_-12px_rgba(13,148,136,0.5)] ring-1 ring-[rgba(13,148,136,0.22)] backdrop-blur sm:text-[0.76rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                デジタル通信添削
              </p>

              <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#0b1d4a] sm:text-[3.2rem] lg:text-[3.6rem]">
                解いて、出して、
                <br />
                <Penned color="#f97316">
                  <span className="bg-[linear-gradient(95deg,#1d4ed8_0%,#0d9488_55%,#16a34a_100%)] bg-clip-text text-transparent">
                    進む。
                  </span>
                </Penned>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-[1.08rem] leading-[1.85] text-[#334155] sm:text-[1.15rem] lg:mx-0">
                毎日1枚、出すだけ。その場で<strong className="font-bold text-[#0b1d4a]">解答・解説</strong>、
                翌日までに<strong className="font-bold text-[#0b1d4a]">先生の添削</strong>。
                <br className="hidden sm:block" />
                「続ける」も「直す」も、まるごと仕組みにしました。
              </p>

              <div className="relative mt-7 flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:items-center lg:mx-0">
                <CtaDoodle />
                <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
                <SecondaryCta href="/apply#pricing">料金・科目を見る</SecondaryCta>
              </div>
              {/* トラストチップ */}
              <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-start">
                {["入会金・教材費0円", "初月半額", "いつでも解約OK"].map((t) => (
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
                <div className="absolute -left-14 top-10 z-0 w-[42%] max-w-[160px] -rotate-[9deg] overflow-hidden rounded-[12px] bg-white shadow-[0_30px_50px_-30px_rgba(11,29,74,0.5)] ring-1 ring-[rgba(15,29,74,0.1)] sm:-left-20">
                  <PrintImage base="print-problem" alt="ノビット公式演習本の問題ページ" sizes="160px" className="block h-auto w-full" priority />
                </div>
                <AppScreen variant="home" className="relative z-10 float-slow" />
                {/* 手書きメモ風の付箋（正直なひとことで、人の手作り感を出す） */}
                <div className="absolute -bottom-3 right-0 z-20 hidden -rotate-[5deg] rounded-[12px] bg-white/85 px-3.5 py-2.5 text-[0.74rem] font-bold leading-snug text-[#9a3412] shadow-[0_20px_40px_-18px_rgba(154,52,18,0.5)] ring-1 ring-white/70 backdrop-blur-md sm:block">
                  教材も添削も、<br />つくった本人が担当。
                </div>
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* ───────── 流れるキーワード帯（リズム＋SEO） ───────── */}
      <MarqueeBand />

      {/* ───────── CAMPAIGN（初月半額・toC の主役オファー） ───────── */}
      <CampaignBanner />

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
              出した瞬間に解答・解説、翌日までに先生の添削。この流れを毎日くりかえすだけです。
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
            <strong className="font-bold text-[#0b1d4a]">出した瞬間に自己採点、翌日までにプロの添削。</strong>
            この二段構えのフィードバックが、毎日の学習を確実な伸びに変えます。
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
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
            通塾も時間割もありません。生活のリズムの中で、毎日の学習が自然に回り続けます。
          </p>
        </Container>
      </section>

      {/* ───────── POSITIONING（市場での立ち位置） ───────── */}
      <section className="cv-defer bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Positioning · ノビットの立ち位置
            </p>
            <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              続いて、直って、<Penned color="#1d4ed8">ちゃんと伸びる</Penned>。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              どの学び方にもある「物足りなさ」を、ノビットはすべて解消します。これが、毎日の学習のいちばんいい形です。
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {alternatives.map((a) => (
                <li key={a.label} className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <p className="text-[0.96rem] font-bold text-[#64748b]">{a.label}</p>
                  <p className="mt-2 flex gap-1.5 text-[0.86rem] leading-[1.8] text-[#94a3b8]">
                    <span aria-hidden="true" className="mt-[0.1em] text-[#cbd5e1]">×</span>
                    {a.lack}
                  </p>
                </li>
              ))}
            </ul>

            {/* 解決＝ノビット */}
            <div className="relative mt-6 overflow-hidden rounded-[22px] bg-[linear-gradient(120deg,#0b1d4a_0%,#0f5e5e_100%)] p-7 text-white shadow-[0_34px_60px_-40px_rgba(11,29,74,0.7)] sm:p-9">
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#5eead4]">そこで、ノビットスタディ</p>
              <p className="mt-3 text-balance text-[1.25rem] font-extrabold leading-[1.55] sm:text-[1.5rem]">
                オリジナル教材を<span className="text-[#7dd3fc]">毎日</span>進め、
                答案に<span className="text-[#fdba74]">毎日添削</span>。
                習慣化アプリつきで、<span className="text-[#5eead4]">月¥4,980〜</span>。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { t: "続く", b: "毎日の課題＋アプリで習慣に。" },
                  { t: "手が動く", b: "自作教材で毎日書く。点に変わる。" },
                  { t: "直る", b: "あなた専用の添削で軌道修正。" },
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
            授業や質問対応が必要な時期は、他のサービスと併用するのも手です。ノビットは「毎日続けて、毎日直す」役割に集中しています。
          </p>
          <InlineCta note="必要な科目を選ぶだけ。いまなら初月半額ではじめられます。" />
        </Container>
      </section>

      {/* ───────── FLOW（1日のサイクル） ───────── */}
      <section id="flow" className="cv-defer relative overflow-hidden scroll-mt-24 bg-white">
        <SectionGlow className="-right-24 top-0" color="rgba(13,148,136,0.12)" />
        <SectionGlow className="-left-28 bottom-10" color="rgba(29,78,216,0.08)" />
        <Container className="relative px-6 py-16 sm:py-24 lg:pb-44">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Daily Loop · 1日のサイクル
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              届く → 解く → 返る → 直す。<Penned color="#0d9488">毎日</Penned>くりかえす。
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
                <span className="text-[0.7rem] font-bold leading-tight">毎日<br />くりかえす</span>
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

      {/* ───────── APP（習慣化のエンジン・保護者も安心） ───────── */}
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
                <strong className="font-bold text-[#0b1d4a]">保護者も同じ画面で進捗を確認</strong>できるから、安心して任せられます。
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

              {/* 保護者も安心（イラストで見せる） */}
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
                    保護者も、同じ画面で見守れる。
                  </p>
                  <p className="mt-1 text-[0.84rem] leading-[1.8] text-[#475569]">
                    提出・添削・連続日数がひと目で。声をかけるタイミングまで分かるから、無理なく応援できます。
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
                毎日、返ってくる
              </span>
            </div>

            {/* 右：4つの指摘 */}
            <div className="order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
                Correction · 添削でわかること
              </p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                「○×」では、<Penned>終わらせない</Penned>。
              </h2>
              <p className="mt-4 max-w-lg text-[0.96rem] leading-[1.95] text-[#475569]">
                提出した答案1枚から、次の4つが返ってきます。これが「やりっぱなし」をなくす中身です。
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
            この1枚を毎日くりかえす。だから「分かったつもり」で止まらず、本番で書ける答案になります。
          </p>
          <InlineCta note="毎日の添削を、今日から。科目ごとに選べます。" />
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
                いまは数学を先行公開し、物理・化学・英語など各分野へ
                <strong className="font-bold text-[#0b1d4a]">順次拡大中</strong>。
                さらに開発者が KDP で刊行する
                <strong className="font-bold text-[#0b1d4a]">『考える力を育てる』シリーズ（全16冊）</strong>
                も演習に活用します。
                <strong className="font-bold text-[#0b1d4a]">教材が豊富だから、毎日の演習に困りません。</strong>
                そのすべてを、つくった本人が毎日添削します。
              </p>
              <ul className="mt-6 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155]">
                {[
                  "ノビット公式教材で、記述前提の演習を毎日積む",
                  "公式教材は各分野で続々制作中（数学 → 物理・化学・英語…）",
                  "KDP『考える力を育てる』シリーズ16冊も演習に活用できる",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
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
                毎日取り組むノビット公式演習本（数値違いの並行類題＋方針つき解答解説）。
              </p>
            </div>
          </div>

          {/* ノビット公式教材（先行公開：数学。各分野へ拡大予定） */}
          <div className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#0b1d4a] px-3 py-1 text-[0.68rem] font-extrabold tracking-[0.08em] text-white">
                ノビット公式教材
              </p>
              <h3 className="mt-4 text-[1.5rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.9rem]">
                演習の土台は、公式教材から。
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
                ノビットのために書き下ろした公式教材。まずは
                <strong className="font-bold text-[#0b1d4a]">数学（ⅠA・ⅡBC・ⅢC）</strong>
                を公開中で、<strong className="font-bold text-[#0b1d4a]">物理・化学・英語など各分野へ順次拡大</strong>していきます。
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-3">
              {officialBooks.map((b) => (
                <li key={b.asin}>
                  <a
                    href={`https://www.amazon.co.jp/dp/${b.asin}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/book flex h-full flex-col rounded-[16px] bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-34px_rgba(11,29,74,0.45)]"
                  >
                    <div className="relative overflow-hidden rounded-[10px] bg-[#0b1d4a] shadow-[0_18px_30px_-18px_rgba(11,29,74,0.55)]">
                      <span className="absolute left-2 top-2 z-10 rounded-full bg-[#16a34a] px-2 py-0.5 text-[0.6rem] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(22,163,74,0.8)]">
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
              {["物理基礎・物理", "化学基礎・化学", "英語長文・英文法"].map((s) => (
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
                公式教材に加え、開発者が KDP で刊行するこのシリーズも演習に活用できます。
                <strong className="font-bold text-[#0b1d4a]">理論・演習・入試対策・総まとめ</strong>まで、学びはじめから合格までを切れ目なく支えます。各表紙から Amazon（KDP）の商品ページへ。
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
                                alt={`考える力を育てる ${b.title}（森祐太・KDP）の表紙`}
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
                    "物理・化学・数学・英語の答案を、毎日添削",
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
                  本当に力がついたのは、毎日自分で答案を書き、どこが足りないかを一枚ずつ直してもらえたときでした。
                </p>
                <p>
                  だからノビットは、授業をしません。私が書いた教材で毎日手を動かし、その答案を私が添削する。
                  <strong className="font-bold text-[#0b1d4a]">途中式・考え方・減点ポイント</strong>まで踏み込み、
                  「次にどう直すか」が分かる形でお返しします。
                </p>
                <p>
                  派手さはありません。でも、毎日続く仕組みと毎日のフィードバックこそが、いちばん確実に伸びる道だと信じています。
                  自分のペースで、毎日少しずつ。一緒に積み上げていきましょう。
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
              今の成績も、得意・苦手も問いません。「毎日少しずつ続けたい」——その気持ちさえあれば、十分です。
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
              いまは対面授業やその場での質問対応は行わず、<strong className="font-bold text-[#0b1d4a]">「自分のペースで毎日進める」</strong>ことに集中しています。
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
            {/* 初月半額シール（キャンペーンと統一） */}
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
              <h2 className="relative mt-3 text-balance text-[1.9rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.4rem]">
                教科ごとに選べて、<br className="sm:hidden" />月{" "}
                <span className="text-[#fdba74]">¥4,980〜</span>。
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-[0.98rem] leading-[1.9] text-white/85">
                入会金・教材費は0円。理系を中心に9科目から、必要な分だけ選べます。
              </p>
              <p className="relative mt-6">
                <span className="inline-flex -rotate-1 items-center gap-1.5 rounded-[12px] bg-[#f97316] px-4 py-2 text-[0.9rem] font-extrabold text-white shadow-[0_14px_28px_-14px_rgba(234,88,12,0.9)]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  いまなら初月半額キャンペーン中
                </span>
              </p>
              {/* 割引前→後の価格対比（申込直前の後押し） */}
              <div className="relative mx-auto mt-6 inline-flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 rounded-[18px] bg-white/[0.08] px-6 py-4 ring-1 ring-white/15">
                <span className="text-[0.84rem] font-bold text-white/85">初月なら 1科目</span>
                <span className="text-[1rem] font-bold text-white/55 line-through decoration-2">{formatYen(monthlyTotal(1))}</span>
                <span aria-hidden="true" className="text-[1.1rem] font-black text-white/80">→</span>
                <span className="text-[2.1rem] font-black leading-none tracking-[-0.02em] text-[#fdba74] sm:text-[2.4rem]">{formatYen(firstMonthTotal(1))}</span>
                <span className="text-[0.8rem] font-bold text-white/85">（税込）</span>
              </div>
              <div className="relative mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <PrimaryCta href="/apply">料金を見て申し込む（初月半額）</PrimaryCta>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.98rem] font-semibold text-white transition hover:bg-white hover:text-[#0b1d4a]"
                >
                  まず質問する
                </Link>
              </div>
              <p className="relative mt-5 text-[0.78rem] leading-[1.7] text-white/70">
                申込ページで科目を選ぶと料金を自動計算。詳しい料金表・対応科目もそちらでご確認いただけます。
              </p>
              <p className="relative mt-2 text-[0.7rem] leading-[1.7] text-white/45">
                物理基礎・物理・化学基礎・化学・数学IA・数学IIBC・数学IIIC・英語長文・英文法
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
                毎日の学習を、今日から仕組みに。
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-[1.95] text-white/85 lg:mx-0">
                必要な科目を選んで、初月半額ではじめられます。入会金・教材費は0円、面談や勧誘もありません。
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <PrimaryCta href="/apply">初月半額ではじめる</PrimaryCta>
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
              毎日続く学習システム・月¥4,980〜
            </p>
            <p className="truncate text-[0.68rem] text-[#64748b]">いまなら初月半額／入会金0円</p>
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
