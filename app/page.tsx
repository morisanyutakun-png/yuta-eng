import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { homeFaq } from "@/data/home";
import { kdpAmazonUrl } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title:
    "理系の毎日添削オンライン塾｜物理・化学・数学・英語の答案添削 - ノビットスタディ 中高部",
  description:
    "ノビットスタディ 中高部は、授業をしない「添削専門」のオンライン塾。物理・化学・数学・英語の答案を、16冊の教材を書いた塾長が毎日添削します。公式アプリで進捗を見える化し、保護者も安心。教科ごとに選べて月¥4,980〜、いまなら初月半額・入会金/教材費0円。",
  path: "/",
});

/* ───────────────────────── content data ───────────────────────── */

const problems = [
  {
    title: "問題は解けるけど、記述答案に自信がない",
    body: "答えは合っているのに、途中式や説明の書き方で減点される。自分の答案が試験で通用するのか分からない。",
  },
  {
    title: "参考書を読んでも、どこで詰まっているか分からない",
    body: "解説を読めば「分かった気」になる。でも自分のどこが弱点なのか、誰も具体的に指摘してくれない。",
  },
  {
    title: "学校や塾では、答案を細かく見てもらえない",
    body: "答え合わせはしてくれても、途中式・考え方・減点ポイントまで一枚ずつ添削してもらう機会がない。",
  },
  {
    title: "難関大レベルの記述力を、本気で伸ばしたい",
    body: "名大・難関大の二次や記述模試で安定して得点したい。自己流ではなく、プロの目で答案を仕上げたい。",
  },
];

const features = [
  {
    no: "01",
    title: "教材を書いた本人が、答案を添削する",
    body: "16冊の物理・数学教材を刊行する塾長が、あなたの答案に直接向き合います。市販書籍と同じ「理解で解く」設計思想のまま添削するから、教材と指導に一切のズレがありません。",
  },
  {
    no: "02",
    title: "授業はしない。毎日の添削で伸ばす",
    body: "一方通行の授業や映像授業はありません。毎日取り組んだ答案に、毎日フィードバック。「手を動かす → 直す」の反復こそが、記述力を定着させる一番の近道です。",
  },
  {
    no: "03",
    title: "途中式・考え方・減点ポイントまで",
    body: "正解／不正解では終わらせません。なぜその式になるのか、どこで論理が飛んだのか、本番なら何点引かれるのか、次の一手は何か——答案を仕上げる視点で指摘します。",
  },
  {
    no: "04",
    title: "学習管理つきで、自分のペースで続く",
    body: "独自の学習管理システムで毎日の演習と添削が回り、進み具合も見える化。通塾も時間割もありません。塾としては安価に、毎日プロの添削を受け続けられます。",
  },
];

const flow = [
  {
    step: "STEP 1",
    title: "教材・課題に取り組む",
    body: "塾長オリジナル教材と公式演習本で、その日の課題に取り組みます。自分のペースで、毎日少しずつ。",
  },
  {
    step: "STEP 2",
    title: "答案を提出する",
    body: "解いた答案を、独自の学習管理システムから提出。途中式や考え方も含めて、まるごと見てもらえます。",
  },
  {
    step: "STEP 3",
    title: "添削コメントを受け取る",
    body: "提出した答案に、毎日添削フィードバックが届きます。途中式・考え方・減点ポイントまで具体的に。",
  },
  {
    step: "STEP 4",
    title: "復習して次の課題へ",
    body: "指摘をもとに復習し、次の課題へ。「演習 → 添削 → 復習」のループで、記述力が積み上がっていきます。",
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
    body: "弱点に合わせて、次に取り組む演習を提示。やみくもではなく、必要な順番で積み上げます。",
  },
];

// 「授業を受ける塾」との違いを、行ごとに対比。
const comparisonRows = [
  { label: "学び方", others: "授業を受ける（受け身になりがち）", nobit: "自分で解いて、添削で直す（手が動く）" },
  { label: "答案の添削", others: "答え合わせ中心。一枚ずつは見てもらいにくい", nobit: "途中式・考え方・減点ポイントまで毎日添削" },
  { label: "進めるペース", others: "クラスや配信のペースに合わせる", nobit: "自分のペースで、毎日少しずつ" },
  { label: "料金の考え方", others: "コマ数・授業時間で高額になりやすい", nobit: "塾としては安価に、毎日プロの添削" },
  { label: "面談・質問対応", others: "あり（その分コストもかかる）", nobit: "現状なし。添削に特化（将来拡充予定）" },
];

const forYouFit = [
  "解けるけど、記述答案に自信がない",
  "自分のペースで毎日コツコツ続けたい",
  "難関大・名大の記述対策を本気でしたい",
  "物理・化学・数学のどこが弱点か、具体的に知りたい",
  "教材は持っているが、答案が書けるようにならない",
];

const forYouNotFit = [
  "対面授業・ライブ授業を受けたい",
  "その場で質問してすぐ答えてほしい（現状は未提供）",
  "自分で手を動かす演習はしたくない",
];

// 対応科目（理系を中心に英語まで）。
const subjectGroups = [
  { area: "物理", items: ["物理基礎", "物理"], color: "#1d4ed8" },
  { area: "化学", items: ["化学基礎", "化学"], color: "#0d9488" },
  { area: "数学", items: ["数学IA", "数学IIBC", "数学IIIC"], color: "#16a34a" },
  { area: "英語", items: ["英語長文", "英文法"], color: "#ea580c" },
];

// 料金（教科ごと月額・初月半額）。数字は塾長の添削キャパに合わせて調整可。
const pricingTiers = [
  { count: "1教科", price: "4,980", per: "4,980", note: "まずは1教科から" },
  { count: "2教科", price: "8,800", per: "4,400", popular: true, note: "いちばん人気" },
  { count: "3教科", price: "12,800", per: "4,267", note: "理系をまとめて" },
];

// アプリ「ノビットスタディ」でできること。
const appPoints = [
  { title: "今日の課題が届く", body: "塾長が組んだ課題が毎日アプリに配信。何を解けばいいか迷いません。" },
  { title: "添削がそのまま返る", body: "提出した答案に、途中式・減点ポイントまでの添削が返却。スマホで見返せます。" },
  { title: "保護者も進捗を確認", body: "提出数・添削完了・連続日数を見える化。保護者も同じ画面で見守れて安心です。" },
  { title: "続けたくなる仕組み", body: "はなまる・称号・連続記録で、毎日の学習が自然と習慣になります。" },
];

// 塾長 森祐太 が KDP（Amazon）で刊行する『考える力を育てる』シリーズ全ラインナップ。
// asin から Amazon 商品ページ（/dp/{asin}）と表紙（public/books/{asin}）に対応。
const bookGroups = [
  {
    group: "理論・本質理解編",
    note: "現象・図・言葉・式を結びつけ、本質から理解する。",
    accent: "#1d4ed8",
    books: [
      { asin: "B0GZGBMPJG", title: "力学", sub: "運動方程式・エネルギー・運動量からケプラー・剛体まで。" },
      { asin: "B0FQ2GJY5V", title: "電磁気学", sub: "電場・電位から回路・電磁誘導まで筋道立てて。" },
      { asin: "B0GZNFFC23", title: "熱力学", sub: "気体分子運動論から熱機関・熱効率まで体系的に。" },
      { asin: "B0GZTZH5NJ", title: "波動・原子物理学", sub: "波の式・干渉・光子・原子核を現象のイメージから。" },
    ],
  },
  {
    group: "演習編",
    note: "入門 → 標準 → 発展と、無理なくステップアップ。",
    accent: "#0d9488",
    books: [
      { asin: "B0H4J34162", title: "高校物理 入門演習", sub: "公式の意味を確かめ、自分で立式できる感覚を養う。" },
      { asin: "B0H3LLW1F2", title: "高校物理 標準演習", sub: "入試標準〜難関大を分野横断で鍛える 85 題。" },
      { asin: "B0H639CPQW", title: "高校物理 発展演習", sub: "微積も駆使し、難関大の応用を攻略する 77 題。" },
      { asin: "B0H65Y6FXQ", title: "力学 解法ドリル", sub: "書き込み式・全6章。力学の解法を手で再現する。" },
      { asin: "B0H66JNR6Q", title: "高校物理 無双（全分野）", sub: "力学〜原子の全5分野・厳選60問を一冊で総点検。" },
      { asin: "B0FSCMCRDR", title: "電磁気学演習", sub: "圧倒的な演習量で、電磁気を得点源に変える。" },
    ],
  },
  {
    group: "入試対策編",
    note: "出題傾向に直結、本番でそのまま使える実戦力。",
    accent: "#ea580c",
    books: [
      { asin: "B0H4D4RZNF", title: "名大物理 予想問題集", sub: "名古屋大学に特化した実践模試 5 回分＋詳しい解説。" },
      { asin: "B0H67XF1XL", title: "名工大物理 予想問題集", sub: "名古屋工業大学に特化した実践模試 5 回分。" },
      { asin: "B0H62FCBS5", title: "共通テスト物理 予想問題集", sub: "現象を読む力を鍛える共通テスト型模試 5 回分。" },
    ],
  },
  {
    group: "総まとめ・数学編",
    note: "分野横断の総まとめと、数学の「考える力」。",
    accent: "#16a34a",
    books: [
      { asin: "B0GZKCTHT5", title: "高校物理I（力学・電磁気）", sub: "力学・電磁気を一冊に。難関国公立二次対策。" },
      { asin: "B0GZV321YZ", title: "高校物理II（熱・波動・原子）", sub: "熱・波動・原子を一冊に。難関国公立二次対策。" },
      { asin: "B0GX1ZY4Y6", title: "高校数学 高一からの因数分解", sub: "見抜く力を鍛える 1050 題。4ステップ構成。" },
    ],
  },
];

const faqItems = homeFaq;

/* ───────────────────────── visuals ───────────────────────── */


/* ───────────────────────── reusable bits ───────────────────────── */

function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[0.98rem] font-bold tracking-[0.01em] text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px hover:shadow-[0_22px_44px_-14px_rgba(234,88,12,0.8)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]"
      />
      <span
        aria-hidden="true"
        className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.98rem] font-semibold tracking-[0.01em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
    >
      {children}
    </Link>
  );
}

/** 本物の公式演習本ページ（PDF からレンダリングした実画像）。 */
function PrintImage({
  base,
  alt,
  className,
  sizes = "(min-width: 1024px) 460px, 80vw",
  priority = false,
}: {
  base: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/prints/${base}-620.avif 620w, /prints/${base}-960.avif 960w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`/prints/${base}-620.webp 620w, /prints/${base}-960.webp 960w`}
        sizes={sizes}
      />
      <img
        src={`/prints/${base}-960.webp`}
        alt={alt}
        width={1241}
        height={1754}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

/** マスコット「ノビットくん」（透過 PNG / AVIF・WebP）。 */
function Mascot({
  variant,
  className,
}: {
  variant: "wave" | "point";
  className?: string;
}) {
  const base = variant === "wave" ? "nobit-kun-wave" : "nobit-kun-point";
  const w = variant === "wave" ? 740 : 887;
  const h = variant === "wave" ? 896 : 976;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`/brand/${base}-240.avif 240w, /brand/${base}-480.avif 480w`}
        sizes="200px"
      />
      <source
        type="image/webp"
        srcSet={`/brand/${base}-240.webp 240w, /brand/${base}-480.webp 480w`}
        sizes="200px"
      />
      <img
        src={`/brand/${base}-480.webp`}
        alt="ノビットスタディのマスコット「ノビットくん」"
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/**
 * 各セクションの空きスペースに「立っている」マスコット。接地影＋ステージ発光で
 * 背景に馴染ませる（明るい面に貼り付いた感を出さない）。デスクトップのみ表示。
 */
function GroundedMascot({
  variant,
  position,
  sizeClass,
}: {
  variant: "wave" | "point";
  position: string;
  sizeClass: string;
}) {
  return (
    <div className={`pointer-events-none absolute z-10 hidden lg:block ${position}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.18),rgba(29,78,216,0.06)_55%,transparent)] blur-xl"
        />
        <Mascot variant={variant} className={`relative w-auto ${sizeClass}`} />
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-[50%] bg-[rgba(11,29,74,0.15)] blur-[6px]"
        />
      </div>
    </div>
  );
}

/**
 * 添削管理アプリ「ノビットスタディ」の画面を、電話フレームで再現したモック。
 * 進捗・連続日数・添削の返却・課題が一目で分かり、保護者も同じ画面で見守れる。
 */
function AppMock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-[270px] shrink-0 ${className}`}>
      {/* 端末ベゼル */}
      <div className="rounded-[2.4rem] bg-[#0b1d4a] p-2.5 shadow-[0_50px_80px_-40px_rgba(11,29,74,0.7)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#eef3fb]">
          {/* ノッチ */}
          <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          <div className="px-3 pb-4 pt-7">
            {/* ヘッダーカード */}
            <div className="relative overflow-hidden rounded-[16px] bg-[linear-gradient(120deg,#1d4ed8_0%,#0d9488_100%)] p-3.5 text-white">
              <div className="pr-12">
                <p className="text-[0.82rem] font-extrabold leading-tight">こんにちは、ユウタさん！</p>
                <p className="mt-1 text-[0.6rem] leading-snug text-white/85">今日の課題が2件 届いています。</p>
              </div>
              <img
                src="/brand/nobit-kun-wave-240.webp"
                alt=""
                width={740}
                height={896}
                loading="lazy"
                decoding="async"
                className="absolute -bottom-2 right-1 h-16 w-auto drop-shadow-[0_6px_8px_rgba(11,29,74,0.3)]"
              />
              <div className="mt-3 flex gap-1.5">
                {[
                  { t: "🔥 12日", s: "れんぞく" },
                  { t: "⭐ 48", s: "はなまる" },
                  { t: "🏅 努力家", s: "称号" },
                ].map((c) => (
                  <div key={c.s} className="flex-1 rounded-[8px] bg-white/15 px-1.5 py-1 text-center ring-1 ring-white/20">
                    <p className="text-[0.6rem] font-bold leading-none">{c.t}</p>
                    <p className="mt-0.5 text-[0.48rem] text-white/80">{c.s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 添削が返ってきた通知 */}
            <div className="mt-2.5 flex items-center gap-2 rounded-[12px] border-l-[3px] border-[#16a34a] bg-[#eafaf0] px-2.5 py-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#16a34a] text-[0.7rem] text-white">✓</span>
              <p className="text-[0.62rem] font-bold leading-snug text-[#0b1d4a]">
                先生から添削が2件 返ってきました
              </p>
            </div>

            {/* 今日の課題 */}
            <div className="mt-2.5 rounded-[12px] bg-white p-3 ring-1 ring-[rgba(15,29,74,0.06)]">
              <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">今日の課題</p>
              <ul className="mt-2 grid gap-1.5">
                {[
                  { s: "物理", t: "力学・運動方程式", c: "#1d4ed8" },
                  { s: "数学IIBC", t: "複素数平面", c: "#0d9488" },
                ].map((q) => (
                  <li key={q.s} className="flex items-center gap-2 rounded-[8px] bg-[#f8fafc] px-2 py-1.5">
                    <span
                      className="shrink-0 rounded-[5px] px-1.5 py-0.5 text-[0.5rem] font-bold text-white"
                      style={{ background: q.c }}
                    >
                      {q.s}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[0.6rem] font-semibold text-[#334155]">{q.t}</span>
                    <span className="shrink-0 rounded-full bg-[#f97316] px-2 py-0.5 text-[0.5rem] font-bold text-white">提出</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* がんばりメーター */}
            <div className="mt-2.5 rounded-[12px] bg-white p-3 ring-1 ring-[rgba(15,29,74,0.06)]">
              <div className="flex items-center justify-between">
                <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">がんばりメーター</p>
                <p className="text-[0.52rem] font-semibold text-[#0f766e]">あと1こで昇格</p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div className="h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#1d4ed8,#0d9488)]" />
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
                {[
                  { n: "48", l: "はなまる", c: "#ea580c" },
                  { n: "31", l: "添削完了", c: "#16a34a" },
                  { n: "6", l: "今週の提出", c: "#1d4ed8" },
                ].map((s) => (
                  <div key={s.l} className="rounded-[8px] bg-[#f8fafc] py-1.5">
                    <p className="text-[0.86rem] font-extrabold leading-none" style={{ color: s.c }}>
                      {s.n}
                    </p>
                    <p className="mt-0.5 text-[0.48rem] text-[#64748b]">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_55%,#eef6f6_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.18), transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(29,78,216,0.12), transparent 70%)" }}
        />
        {/* 方眼ノートのテクスチャ — 演習・添削のブランドに馴染ませる */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,148,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 70% at 72% 38%, #000 35%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 72% 38%, #000 35%, transparent 78%)",
          }}
        />

        <Container className="relative px-6">
          <div className="grid grid-cols-1 items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:py-24">
            <div className="min-w-0 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.06em] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.25)] sm:text-[0.76rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                理系を伸ばす・オンライン添削塾
              </p>

              <h1 className="mt-5 text-[2.3rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#0b1d4a] sm:text-[2.9rem] lg:text-[3.2rem]">
                <span className="block">考える力を育てる、</span>
                <span className="block bg-[linear-gradient(95deg,#1d4ed8_0%,#0d9488_55%,#16a34a_100%)] bg-clip-text text-transparent">
                  理系の<span className="whitespace-nowrap">毎日添削。</span>
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-md text-[1.05rem] leading-[1.85] text-[#334155] sm:text-[1.12rem] lg:mx-0">
                物理・化学・数学・英語。教材を書いた塾長が、あなたの答案を
                <strong className="font-bold text-[#0b1d4a]">毎日添削</strong>します。授業はしません。
              </p>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:items-center lg:mx-0">
                <PrimaryCta href="/contact">初月半額ではじめる</PrimaryCta>
                <SecondaryCta href="/#pricing">料金・科目を見る</SecondaryCta>
              </div>
              <p className="mt-3 text-[0.8rem] text-[#64748b]">
                入会金・教材費 0円／いつでも科目の追加・解約OK。
              </p>
            </div>

            <div className="relative min-w-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.22),rgba(29,78,216,0.08)_55%,transparent)] blur-2xl sm:h-96 sm:w-96"
              />
              {/* アプリ画面（主役）＋演習本プリント（背面） */}
              <div className="relative mx-auto flex w-fit items-center justify-center">
                <div className="absolute -left-14 top-8 w-[46%] max-w-[170px] -rotate-[9deg] overflow-hidden rounded-[12px] bg-white shadow-[0_30px_50px_-30px_rgba(11,29,74,0.5)] ring-1 ring-[rgba(15,29,74,0.1)] sm:-left-24">
                  <PrintImage base="print-problem" alt="ノビット公式演習本の問題ページ" sizes="170px" className="block h-auto w-full" />
                </div>
                <AppMock className="relative z-10" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── PROBLEMS（悩み訴求） ───────── */}
      <section className="cv-defer bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">
              Problem · こんな悩みはありませんか
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              「解ける」と「答案が書ける」は、別の力。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              記述答案でつまずく高校生の多くが、同じ壁にぶつかっています。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {problems.map((p) => (
              <li
                key={p.title}
                className="flex gap-4 rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fff1e6] text-[1rem] font-extrabold text-[#ea580c]"
                >
                  ?
                </span>
                <span>
                  <p className="text-[1.02rem] font-bold leading-[1.55] text-[#0b1d4a]">{p.title}</p>
                  <p className="mt-2 text-[0.9rem] leading-[1.9] text-[#475569]">{p.body}</p>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── MODEL（添削専門・面談なしの明確化） ───────── */}
      <section className="cv-defer bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">
                What is Nobit Study
              </p>
              <h2 className="mt-3 text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.3rem]">
                ノビットは、
                <br className="hidden sm:block" />
                <span className="text-[#7dd3fc]">添削専門</span>の学習管理塾です。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-white/85">
                面談や授業（ライブ指導）は行いません。
                毎日自分のペースで教材を進め、提出した答案にプロの添削が入る——
                その繰り返しで<strong className="font-bold text-white">自立した学び</strong>を実現します。
                塾長オリジナル教材で設計されたカリキュラムと、毎日のプロ添削が、ノビットの売りです。
              </p>
              <p className="mt-4 max-w-lg text-[0.9rem] leading-[1.9] text-white/70">
                ※ 質問対応や面談は将来的に拡充予定ですが、現在は提供していません。
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "毎日、自分のペースで", b: "教材が毎日進む。通塾も時間割もなし。生活に合わせて続けられます。" },
                { t: "プロの添削が毎日介入", b: "答案にプロの目が毎日入るから、独学では気づけない弱点が見える化されます。" },
                { t: "塾長オリジナルのカリキュラム", b: "塾長が設計した教材と演習本で、基礎から記述まで段階的に。" },
                { t: "塾として、安価に", b: "毎日添削が受けられて、塾としては手の届きやすい料金を目指しています。" },
              ].map((c) => (
                <li
                  key={c.t}
                  className="rounded-[18px] bg-white/[0.07] p-5 ring-1 ring-white/15 backdrop-blur-sm"
                >
                  <p className="flex items-center gap-2 text-[1rem] font-bold leading-[1.5]">
                    <span aria-hidden="true" className="text-[#5eead4]">◆</span>
                    {c.t}
                  </p>
                  <p className="mt-2 text-[0.86rem] leading-[1.85] text-white/75">{c.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───────── FEATURES（特徴） ───────── */}
      <section id="features" className="cv-defer scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Features · ノビットスタディの特徴
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              答案を仕上げる力を、毎日の添削で。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              「正解か」ではなく「本番で通用する答案か」を、一枚ずつ育てます。
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f.no}
                className="relative overflow-hidden rounded-[20px] bg-[#f8fafc] p-7 ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.35)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#1d4ed8,#0d9488_60%,transparent)]"
                />
                <span className="text-[0.78rem] font-extrabold tracking-[0.18em] text-[#0d9488]">
                  {f.no}
                </span>
                <p className="mt-3 text-[1.18rem] font-extrabold leading-[1.45] text-[#0b1d4a]">
                  {f.title}
                </p>
                <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">{f.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── APP（アプリ・保護者も安心） ───────── */}
      <section id="app" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            {/* アプリ画面 */}
            <div className="relative order-1 flex justify-center lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.18),transparent)] blur-2xl sm:h-96 sm:w-96"
              />
              <AppMock className="relative" />
            </div>

            <div className="order-2 lg:order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                App · 公式アプリで完結
              </p>
              <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                毎日の学習も添削も、
                <br className="hidden sm:block" />
                アプリひとつで。
              </h2>
              <p className="mt-4 max-w-lg text-[0.98rem] leading-[1.9] text-[#334155]">
                課題・提出・添削・進捗を、専用アプリ「ノビットスタディ」に集約。
                <strong className="font-bold text-[#0b1d4a]">保護者も同じ画面で進捗を確認</strong>できるから、安心して任せられます。
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {appPoints.map((p) => (
                  <li key={p.title} className="rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                    <p className="flex items-center gap-2 text-[1rem] font-bold leading-[1.4] text-[#0b1d4a]">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                      {p.title}
                    </p>
                    <p className="mt-2 text-[0.86rem] leading-[1.8] text-[#475569]">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── CORRECTION（添削の中身） ───────── */}
      <section className="cv-defer relative overflow-hidden bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#5eead4]">
              Correction · 添削でわかること
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] sm:text-[2.2rem]">
              1 枚の添削が、答案を仕上げる。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.95] text-white/80">
              ノビットの添削は「○×」で終わりません。提出した答案 1 枚から、次の 4 つが返ってきます。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {correctionPoints.map((c) => (
              <li
                key={c.title}
                className="rounded-[20px] bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#5eead4] text-[1rem] font-extrabold text-[#0b1d4a]">
                  {c.mark}
                </span>
                <p className="mt-4 text-[1.08rem] font-extrabold leading-[1.45]">{c.title}</p>
                <p className="mt-2 text-[0.86rem] leading-[1.9] text-white/75">{c.body}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.86rem] leading-[1.85] text-white/70">
            この 1 枚を毎日くりかえす。だから「分かったつもり」で止まらず、本番で書ける答案になります。
          </p>
        </Container>
      </section>

      {/* ───────── FLOW（学習の流れ） ───────── */}
      <section id="flow" className="cv-defer relative overflow-hidden scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24 lg:pb-44">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Flow · 学習の流れ
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              演習 → 提出 → 添削 → 復習を、毎日くりかえす。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              シンプルなループだから、続く。自分のペースで積み上がります。
            </p>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((s, i) => (
              <li
                key={s.step}
                className="relative rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6f6] px-3 py-1 text-[0.72rem] font-extrabold tracking-[0.1em] text-[#0f766e]">
                  {s.step}
                </span>
                <p className="mt-4 text-[1.08rem] font-extrabold leading-[1.45] text-[#0b1d4a]">
                  {s.title}
                </p>
                <p className="mt-2 text-[0.88rem] leading-[1.9] text-[#475569]">{s.body}</p>
                {i < flow.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[1.3rem] text-[#0d9488] lg:block"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
        {/* 学習の流れを見守るノビットくん（デスクトップのみ） */}
        <GroundedMascot
          variant="point"
          position="bottom-4 right-[4%] xl:right-[7%]"
          sizeClass="h-36 xl:h-40"
        />
      </section>

      {/* ───────── DIFFERENCE（他の学び方との違い） ───────── */}
      <section className="cv-defer bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Difference · 他の学び方との違い
            </p>
            <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              授業を受ける塾ではなく、
              <br className="hidden sm:block" />
              答案を仕上げる塾。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              集団塾・映像授業・個別指導と、ノビットは役割が違います。
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[20px] ring-1 ring-[rgba(15,29,74,0.1)]">
            <div className="grid grid-cols-[0.9fr_1.1fr_1.3fr] bg-[#0b1d4a] text-white">
              <div className="px-3 py-3.5 text-[0.74rem] font-bold sm:px-5 sm:text-[0.84rem]">比較項目</div>
              <div className="px-3 py-3.5 text-[0.74rem] font-semibold text-white/75 sm:px-5 sm:text-[0.84rem]">
                一般的な塾・予備校
              </div>
              <div className="flex items-center gap-1.5 bg-[#0f5e5e] px-3 py-3.5 text-[0.78rem] font-extrabold sm:px-5 sm:text-[0.9rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#5eead4]" />
                ノビットスタディ
              </div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[0.9fr_1.1fr_1.3fr] ${i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"}`}
              >
                <div className="px-3 py-4 text-[0.8rem] font-bold text-[#0b1d4a] sm:px-5 sm:text-[0.9rem]">
                  {row.label}
                </div>
                <div className="px-3 py-4 text-[0.8rem] leading-[1.7] text-[#64748b] sm:px-5 sm:text-[0.88rem]">
                  {row.others}
                </div>
                <div className="border-l-2 border-[#0f5e5e]/15 bg-[#0f5e5e]/[0.04] px-3 py-4 text-[0.8rem] font-semibold leading-[1.7] text-[#0b1d4a] sm:px-5 sm:text-[0.88rem]">
                  {row.nobit}
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.86rem] leading-[1.85] text-[#475569]">
            授業や質問対応が必要な時期は、他のサービスと併用するのも手です。ノビットは「答案を毎日仕上げる」役割に集中しています。
          </p>
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
                教材を開発した本人が、
                <br className="hidden sm:block" />
                直接添削します。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                塾長は、KDP（Amazon）で
                <strong className="font-bold text-[#0b1d4a]">『考える力を育てる』シリーズ</strong>
                ──理論編・演習編・入試対策編──を刊行する教材開発者です。
                その設計思想でつくられたノビット公式演習本に取り組み、
                答案を<strong className="font-bold text-[#0b1d4a]">開発者本人が毎日添削</strong>する。
                だから、教材と添削に一切のズレがありません。
              </p>
              <ul className="mt-6 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155]">
                {[
                  "ノビット公式演習本で、記述前提の演習を毎日積む",
                  "『考える力を育てる』シリーズの設計思想をカリキュラムへ",
                  "市販書籍の購入も可能（毎日添削・学習管理はサービスとセット）",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCta href="/contact">初月半額ではじめる</PrimaryCta>
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

          {/* 『考える力を育てる』シリーズ 全ラインナップ */}
          <div className="mt-16 sm:mt-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f97316]">
                Books · 塾長の著書
              </p>
              <h3 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.9rem]">
                『考える力を育てる』シリーズ
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
                公式の丸暗記から抜け出し、現象・図・言葉・式を結びつけて理解する力を育てる——その一点を貫いたシリーズ。
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

      {/* ───────── MESSAGE（塾長メッセージ） ───────── */}
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
                      塾長・教材開発者
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
                <Link
                  href="/about"
                  className="mt-5 inline-flex items-center text-[0.86rem] font-semibold text-[#0f766e] hover:text-[#0b1d4a]"
                >
                  塾長と塾の考え方を見る <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                Message · 塾長より
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
                  だからノビットは、授業をしません。私が書いた教材で毎日手を動かし、その答案を私が添削する。
                  <strong className="font-bold text-[#0b1d4a]">途中式・考え方・減点ポイント</strong>まで踏み込み、
                  「次にどう直すか」が分かる形でお返しします。
                </p>
                <p>
                  派手さはありませんが、これがいちばん確実に伸びる方法だと信じています。
                  自分のペースで、毎日少しずつ。あなたの答案を、本番で書ける答案に変えていきましょう。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── FOR YOU（向き・不向き） ───────── */}
      <section className="cv-defer bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              For You · 向いている方・向いていない方
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              正直に、お伝えします。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
              合わない方に無理におすすめはしません。まずは相性をご確認ください。
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 lg:grid-cols-2">
            <div className="rounded-[20px] bg-[#eef6f6] p-7 ring-1 ring-[rgba(13,148,136,0.2)]">
              <p className="flex items-center gap-2 text-[1.05rem] font-extrabold text-[#0f766e]">
                <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[#0d9488] text-[0.8rem] text-white">○</span>
                向いている方
              </p>
              <ul className="mt-4 grid gap-2.5">
                {forYouFit.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[0.92rem] leading-[1.8] text-[#0b1d4a]">
                    <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] bg-[#f8fafc] p-7 ring-1 ring-[rgba(15,29,74,0.08)]">
              <p className="flex items-center gap-2 text-[1.05rem] font-extrabold text-[#64748b]">
                <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[#94a3b8] text-[0.8rem] text-white">△</span>
                今は向いていない方
              </p>
              <ul className="mt-4 grid gap-2.5">
                {forYouNotFit.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[0.92rem] leading-[1.8] text-[#475569]">
                    <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#cbd5e1]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8rem] leading-[1.75] text-[#94a3b8]">
                ※ 質問対応・面談は将来的に拡充予定です。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── PRICING（料金・対応科目） ───────── */}
      <section id="pricing" className="cv-defer scroll-mt-24 bg-white">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
              Price · 料金・対応科目
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              必要な科目だけ、毎日添削。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.9] text-[#475569]">
              入会金・教材費は0円。理系を中心に9科目から、必要な分だけ選べます。
              <strong className="font-bold text-[#ea580c]">いまなら初月半額</strong>ではじめられます。
            </p>
          </div>

          {/* 対応科目 */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            <span className="text-[0.74rem] font-bold text-[#64748b]">対応科目</span>
            {subjectGroups.flatMap((g) =>
              g.items.map((it) => (
                <span
                  key={it}
                  className="rounded-full bg-[#f8fafc] px-3 py-1 text-[0.8rem] font-semibold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]"
                >
                  <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: g.color }} />
                  {it}
                </span>
              )),
            )}
          </div>

          {/* 料金プラン */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
            {pricingTiers.map((t) => (
              <div
                key={t.count}
                className={`relative flex flex-col rounded-[22px] p-6 sm:p-7 ${
                  t.popular
                    ? "bg-[#0b1d4a] text-white shadow-[0_34px_60px_-34px_rgba(11,29,74,0.7)] ring-1 ring-[#0b1d4a] sm:-translate-y-2"
                    : "bg-[#f8fafc] text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]"
                }`}
              >
                {t.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f97316] px-3 py-1 text-[0.66rem] font-extrabold tracking-[0.06em] text-white shadow-[0_8px_18px_-8px_rgba(234,88,12,0.7)]">
                    {t.note}
                  </span>
                ) : null}
                <p className={`text-[0.82rem] font-bold ${t.popular ? "text-[#7dd3fc]" : "text-[#0f766e]"}`}>
                  {t.count}
                </p>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="text-[0.95rem] font-bold">¥</span>
                  <span className="text-[2.4rem] font-extrabold leading-none tracking-[-0.02em]">{t.price}</span>
                  <span className={`text-[0.84rem] font-semibold ${t.popular ? "text-white/70" : "text-[#64748b]"}`}>/月</span>
                </p>
                <p className={`mt-1.5 text-[0.78rem] ${t.popular ? "text-white/70" : "text-[#64748b]"}`}>
                  1教科あたり ¥{t.per}
                </p>
                <p className={`mt-3 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[0.72rem] font-bold ${t.popular ? "bg-white/15 text-white" : "bg-[#fff1e6] text-[#ea580c]"}`}>
                  初月は半額 ¥{(Number(t.price.replace(",", "")) / 2).toLocaleString()}
                </p>
                <div className="mt-5">
                  <Link
                    href="/contact"
                    className={`flex min-h-11 items-center justify-center rounded-full px-5 text-[0.9rem] font-bold transition ${
                      t.popular
                        ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                        : "border border-[#0b1d4a] text-[#0b1d4a] hover:bg-[#0b1d4a] hover:text-white"
                    }`}
                  >
                    この科目数ではじめる
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-[0.82rem] leading-[1.7] text-[#64748b]">
            4教科以上は ¥12,800 ＋ 1教科ごと +¥3,000。いつでも科目の追加・休会・解約OK（入会金・教材費なし）。
          </p>

          {/* 他塾との比較 */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-[18px] bg-[#eef6f6] p-5 text-center ring-1 ring-[rgba(13,148,136,0.18)] sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
            <p className="text-[0.86rem] leading-[1.7] text-[#475569]">
              大手の個別指導は <span className="font-bold text-[#0b1d4a]">1教科 週1で月¥15,000〜</span>。
            </p>
            <span aria-hidden="true" className="hidden text-[#0d9488] sm:block">→</span>
            <p className="text-[0.95rem] font-extrabold leading-[1.5] text-[#0f766e]">
              ノビットは毎日添削で <span className="text-[1.15rem]">月¥4,980〜</span>。
            </p>
          </div>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <PrimaryCta href="/contact">初月半額ではじめる</PrimaryCta>
            <SecondaryCta href="/contact">まず質問してみる</SecondaryCta>
          </div>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="cv-defer relative overflow-hidden scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24 lg:pb-40">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                FAQ · よくある質問
              </p>
              <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
                よくある質問
              </h2>
            </div>
            <ul className="mt-10 grid gap-3">
              {faqItems.map((item) => (
                <li
                  key={item.question}
                  className="rounded-[18px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]"
                >
                  <p className="flex items-start gap-2.5 text-[1rem] font-bold leading-[1.6] text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#0d9488] text-[0.78rem] font-bold text-white"
                    >
                      Q
                    </span>
                    {item.question}
                  </p>
                  <p className="mt-3 border-t border-dotted border-[rgba(15,29,74,0.12)] pt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        {/* よくある質問のそばに立つノビットくん（デスクトップのみ） */}
        <GroundedMascot
          variant="wave"
          position="bottom-3 left-[4%] xl:left-[9%]"
          sizeClass="h-40 xl:h-44"
        />
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
                <source
                  type="image/avif"
                  srcSet="/brand/nobit-kun-wave-240.avif 240w, /brand/nobit-kun-wave-480.avif 480w"
                  sizes="200px"
                />
                <source
                  type="image/webp"
                  srcSet="/brand/nobit-kun-wave-240.webp 240w, /brand/nobit-kun-wave-480.webp 480w"
                  sizes="200px"
                />
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
              {/* 接地のための淡い光のプラットフォーム */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-28 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(94,234,212,0.55),transparent)] blur-[3px] sm:w-32"
              />
            </div>

            <div>
              <h2 className="text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.4rem]">
                答案を、毎日プロに見てもらう習慣を。
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-[1.95] text-white/85 lg:mx-0">
                必要な科目を選んで、初月半額ではじめられます。入会金・教材費は0円、面談や勧誘もありません。
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <PrimaryCta href="/contact">初月半額ではじめる</PrimaryCta>
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
              理系の毎日添削・月¥4,980〜
            </p>
            <p className="truncate text-[0.68rem] text-[#64748b]">いまなら初月半額／入会金0円</p>
          </div>
          <Link
            href="/contact"
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
