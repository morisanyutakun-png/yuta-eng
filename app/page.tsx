import type { Metadata } from "next";
import Image from "next/image";

import { LpPageViewEvent } from "@/components/analytics-events";
import { Container } from "@/components/container";
import { Blob } from "@/components/decor";
import { JsonLd } from "@/components/json-ld";
import { Illust, Mascot } from "@/components/nobit-media";
import { ViewItemBeacon, TrackedLink, LeadLink } from "@/components/lp-tracking";
import { subjectToItem } from "@/lib/ga4-items";
import { homeFaq } from "@/data/home";
import { kdpAmazonUrl } from "@/data/site";
import {
  buyoutTotal,
  CAMPAIGN_DEADLINE_LABEL,
  currentPerRound,
  currentSinglePrice,
  formatYen,
  GRADING_COUNT,
  isCampaignActive,
  listTotal,
  MATERIAL_PRICE,
  SUBJECT_AREAS,
  SUBJECTS,
  TRIAL_GRADING_COUNT,
  TRIAL_PRICE,
} from "@/lib/pricing";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
} from "@/lib/structured-data";

const PAGE_TITLE = "高校生の通信添削｜教材と答案添削が買い切り｜ノビットスタディ";
const PAGE_DESCRIPTION =
  "高校生向けの買い切り通信添削。1回10〜20分の教材を解いて答案を提出すると、途中式や考え方まで添削します。教材・解答解説・専用アプリ込み。";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      "高校生 添削",
      "通信添削",
      "答案添削",
      "大学受験 添削",
      "数学 添削",
      "化学 添削",
      "英語 添削",
    ],
    path: "/",
  }),
  // レイアウトの title テンプレート（"%s | ノビットスタディ"）を二重適用させない。
  title: { absolute: PAGE_TITLE },
};

/* ───────────────────────── 価格（lib/pricing 単一ソース＝決済額と一致） ───────────────────────── */

const campaign = isCampaignActive();
const single = currentSinglePrice(campaign); // 1教材（開講記念 9,800 / 通常 14,800）
const perRound = currentPerRound(campaign); // 1回あたり（約98円）
const pack2 = buyoutTotal(2, campaign); // 2教材パック（17,800）
const pack2List = listTotal(2); // 2教材 通常合計（29,600）

/* ───────────────────────── コンテンツ ───────────────────────── */

const heroChips = [
  `約${GRADING_COUNT}回分`,
  "教材PDF込み",
  "提出ごとの添削",
  "専用アプリ込み",
  "入会金・月額料金なし",
];

const problems = [
  { icon: "stall", text: "問題集を買っても、\n途中で止まる" },
  { icon: "mark", text: "解答を読んでも、\n直し方が分からない" },
  { icon: "clock", text: "塾に通う時間はないが、\n答案は見てほしい" },
];

const flow = [
  { n: "1", title: "教材を選ぶ", verb: "選ぶ" },
  { n: "2", title: "10〜20分で解く", verb: "解く" },
  { n: "3", title: "写真やPDFで出す", verb: "出す" },
  { n: "4", title: "添削を見て進む", verb: "進む" },
];

// 購入後の流れ（決済のあとは自動で始まる＝安心して申し込める）。
const afterSteps = [
  { n: "1", title: "決済（一括）", body: "面談・電話勧誘なし。" },
  { n: "2", title: "ログイン情報が自動発行", body: "IDとPINがメールで届く。" },
  { n: "3", title: "教材が自動で届く", body: "手続き不要で自動割り当て。" },
  { n: "4", title: "その日から提出", body: "1回目を解いて提出。" },
];

const included = [
  "約100回分の演習教材",
  "詳しい解答・解説",
  "提出ごとの答案添削",
  "専用学習アプリ",
  "進捗・返却の履歴",
  "修了までの利用権",
];

// 提出〜返却のアプリ画面（public/samples）。
const sampleV = "20260711b";
const correctionShots = [
  {
    title: "提出画面",
    body: "画面で解くか、答案を添付して提出。",
    src: `/samples/submit-screen-math-sample.png?v=${sampleV}`,
    width: 666,
    height: 387,
  },
  {
    title: "解答解説PDF",
    body: "提出直後に届き、考え方と途中式で自己採点。",
    src: `/samples/answer-key-math-sample.png?v=${sampleV}`,
    width: 1075,
    height: 1518,
  },
  {
    title: "返却・講師コメント",
    body: "採点コメント・添削・再提出の指示を確認。",
    src: `/samples/returned-screen-v2.png?v=${sampleV}`,
    width: 526,
    height: 170,
  },
  {
    title: "合格・進捗の記録",
    body: "合格数・再提出・履歴を振り返る。",
    src: `/samples/report-screen-v2.png?v=${sampleV}`,
    width: 724,
    height: 634,
  },
];

// §7 教材カードの表紙（ASIN）。apply-form の MATERIAL_PROFILES と同じ表紙に対応。
const subjectCovers: Record<string, string> = {
  "physics-basic": "B0H4J34162",
  physics: "B0H3LLW1F2",
  "physics-advanced": "B0H639CPQW",
  "chemistry-basic": "B0H7YWLDJJ",
  chemistry: "B0H7RHT1NF",
  "math-1a": "B0H6ZRPLVJ",
  "math-2bc": "B0H71TQJYY",
  "math-3c": "B0H724CBBT",
  "english-reading": "B0H7LPFKN1",
  "english-grammar": "B0H7LQW2W8",
};

// §7 教材カード用の「対象」ラベル（教科タブごと）。
const subjectTargets: Record<string, string> = {
  "physics-basic": "物理が苦手・初学者",
  physics: "共通テスト〜国公立二次 標準",
  "physics-advanced": "難関大・記述対策",
  "chemistry-basic": "高1〜高2・化学基礎",
  chemistry: "高2〜受験・理系化学",
  "math-1a": "高1〜受験基礎",
  "math-2bc": "高2〜受験基礎",
  "math-3c": "理系入試",
  "english-reading": "長文読解を強化",
  "english-grammar": "高校英文法の総点検",
};

// 運営者セクションで見せる著書（3〜4冊）。
const authorBooks = [
  { asin: "B0H4J34162", title: "高校物理 入門演習" },
  { asin: "B0H3LLW1F2", title: "高校物理 標準演習" },
  { asin: "B0GZGBMPJG", title: "力学（考える力を育てる）" },
  { asin: "B0H4D4RZNF", title: "名大物理 予想問題集" },
];

const viewItems = SUBJECTS.map((s) => subjectToItem(s, single));

/* ───────────────────────── 小物 ───────────────────────── */

/** §悩み で使う線画アイコン（右脳的に一目で伝える）。 */
function ProblemIcon({ kind, className = "" }: { kind: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "stall") {
    // 途中で閉じた本
    return (
      <svg {...common}>
        <path d="M12 6.5C10.5 5.3 8.5 5 4 5v12c4.5 0 6.5.3 8 1.5" />
        <path d="M12 6.5C13.5 5.3 15.5 5 20 5v12c-4.5 0-6.5.3-8 1.5" />
        <path d="M12 6.5v12" />
      </svg>
    );
  }
  if (kind === "mark") {
    // はてな（分からない）
    return (
      <svg {...common}>
        <path d="M9.2 9a2.8 2.8 0 1 1 4 2.5c-.9.5-1.7 1.1-1.7 2.3" />
        <path d="M11.5 17.5h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }
  // clock（時間がない）
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.3 4.3L19 7" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">{children}</p>
  );
}

/** 統一CTA（オレンジ）。cta_location で発火位置を計測。 */
function PrimaryCta({
  location,
  children,
  href = "/apply#form",
  className = "",
}: {
  location: string;
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <TrackedLink
      href={href}
      location={location}
      className={`group/cta relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-center text-[0.98rem] font-bold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px sm:w-auto sm:px-8 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
      <span className="relative">{children}</span>
    </TrackedLink>
  );
}

function SecondaryCta({
  location,
  children,
  href,
  className = "",
}: {
  location: string;
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <TrackedLink
      href={href}
      location={location}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-center text-[0.96rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white sm:w-auto sm:px-8 ${className}`}
    >
      {children}
    </TrackedLink>
  );
}

function BookCover({ asin, title }: { asin: string; title: string }) {
  return (
    <span className="block aspect-[71/100] overflow-hidden rounded-md bg-[#f8fafc] shadow-[0_16px_28px_-20px_rgba(11,29,74,0.7)] ring-1 ring-[rgba(15,29,74,0.08)]">
      <picture className="block h-full w-full">
        <source type="image/avif" srcSet={`/books/${asin}.avif`} />
        <source type="image/webp" srcSet={`/books/${asin}.webp`} />
        <img
          src={`/books/${asin}.webp`}
          alt={`${title}の表紙`}
          width={320}
          height={451}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover"
        />
      </picture>
    </span>
  );
}

/**
 * ファーストビューのメインビジュアル。手書き答案が赤ペンで添削され、合格スタンプと
 * 励ましコメントで返る——というサービスの中身を、1枚のイラストで直感的に伝える。
 * 背景のブロブ・発光とマスコットで、右脳に届くアート面を作る。
 */
function HeroVisual() {
  return (
    <div className="relative">
      {/* 背景の有機ブロブ＋発光（にじませてアート感を出す）。DOM順で card の背面に置く。 */}
      <span aria-hidden="true" className="pointer-events-none absolute -inset-5">
        <Blob fill="#5eead4" className="absolute -left-4 -top-6 h-40 w-40 opacity-45 blur-2xl sm:h-48 sm:w-48" />
        <Blob fill="#fdba74" className="absolute -right-6 bottom-2 h-44 w-44 opacity-50 blur-2xl sm:h-52 sm:w-52" />
        <Blob fill="#93c5fd" className="absolute left-8 bottom-[-2rem] h-28 w-28 opacity-40 blur-2xl" />
      </span>

      <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#ffffff_0%,#f5f9ff_52%,#eef8f4_100%)] p-4 shadow-[0_48px_96px_-46px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.06)] sm:p-5">
        {/* サービスの流れを一目で（提出→赤ペン添削→合格で返却） */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[0.72rem] font-extrabold sm:text-[0.76rem]">
          <span className="rounded-full bg-white px-2.5 py-1 text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]">答案を提出</span>
          <span aria-hidden="true" className="text-[#f97316]">→</span>
          <span className="rounded-full bg-[#fff1e6] px-2.5 py-1 text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.25)]">赤ペンで添削</span>
          <span aria-hidden="true" className="text-[#0d9488]">→</span>
          <span className="rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.22)]">合格で返却</span>
        </div>

        {/* 添削イラスト（紙を少し傾けてアナログな手添削の質感） */}
        <div className="relative mx-auto max-w-[27rem] -rotate-[1.5deg]">
          <Illust
            base="correction-graded"
            widths={[560, 1120]}
            width={1448}
            height={1086}
            alt="手書きの数学答案が赤ペンで添削され、合格スタンプと励ましのコメントが返ってきたイメージ"
            sizes="(max-width: 1024px) 86vw, 440px"
            priority
            className="h-auto w-full rounded-[16px] shadow-[0_24px_48px_-26px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.06)]"
          />
        </div>

        <p className="mt-2.5 text-center text-[0.7rem] font-semibold text-[#94a3b8]">
          赤ペン添削のイメージ図です
        </p>
      </div>

      {/* マスコット：答案を差し出すように、カード左下からのぞかせる */}
      <Mascot
        variant="wave"
        className="pointer-events-none absolute -bottom-4 -left-3 w-[4.5rem] drop-shadow-[0_12px_18px_rgba(11,29,74,0.28)] sm:-left-5 sm:w-[5.5rem]"
      />
    </div>
  );
}

/** ファーストビュー等に置く「高い？→お試し」への誘導ライン。 */
function HeroTrialLink({ location }: { location: string }) {
  return (
    <TrackedLink
      href="/apply#trial"
      location={location}
      className="mt-3 flex items-center gap-2 rounded-full bg-[#fff1e6] px-4 py-2.5 text-[0.83rem] font-bold text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.3)] transition hover:bg-[#ffe4d1]"
    >
      <span aria-hidden="true" className="shrink-0 rounded-full bg-[#ea580c] px-2 py-0.5 text-[0.66rem] font-extrabold text-white">お試し</span>
      <span className="leading-snug">まずは添削3回・{formatYen(TRIAL_PRICE)}から。本契約で全額値引き。</span>
      <span aria-hidden="true" className="ml-auto">→</span>
    </TrackedLink>
  );
}

/* ───────────────────────── ページ ───────────────────────── */

export default function HomePage() {
  return (
    <>
      <LpPageViewEvent />
      <JsonLd data={[createHomePageJsonLd(), createEducationalServiceJsonLd(), createHomeFaqJsonLd()]} />

      {/* 2. ファーストビュー */}
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <Container className="px-5 py-10 sm:px-6 sm:py-16">
          <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            {/* 左カラム（デスクトップ）。モバイルはこの中で 見出し→ビジュアル→価格 の順に並ぶ */}
            <div className="flex flex-col">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.74rem] font-bold text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.22)]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                高校生向け・買い切り通信添削
              </p>
              <h1 className="mt-4 text-[1.72rem] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.4rem] sm:leading-[1.25]">
                問題集を買って終わりにしない。
                <br />
                約{GRADING_COUNT}回の演習を、
                <span className="text-[#ea580c]">答案添削つき</span>で最後まで。
              </h1>
              <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#334155] sm:text-[1rem]">
                1回10〜20分の教材を解いて、提出。
                <br />
                作った本人が<span className="font-bold text-[#0b1d4a]">途中式や考え方まで添削</span>して、アプリで返します。
              </p>

              {/* モバイル専用：見出し直後にメインビジュアルを差し込む（デスクトップは右カラムに表示） */}
              <div className="mt-7 lg:hidden">
                <HeroVisual />
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {heroChips.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-bold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]">
                    <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#0d9488] text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {/* 価格 */}
              <div className="mt-6 rounded-[18px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_24px_50px_-40px_rgba(11,29,74,0.5)] sm:p-5">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  {campaign ? (
                    <span className="rounded-full bg-[#fff1e6] px-2.5 py-0.5 text-[0.72rem] font-extrabold text-[#ea580c]">開講記念価格</span>
                  ) : null}
                  <span className="text-[0.82rem] font-bold text-[#475569]">1教材</span>
                  {campaign ? (
                    <span className="text-[0.9rem] font-semibold text-[#94a3b8] line-through">{formatYen(MATERIAL_PRICE)}</span>
                  ) : null}
                  <span className="text-[2.1rem] font-black leading-none tracking-[-0.02em] text-[#0b1d4a]">{formatYen(single)}</span>
                  <span className="text-[0.82rem] font-bold text-[#475569]">（税込）</span>
                </p>
                <p className="mt-1.5 text-[0.8rem] font-semibold text-[#0f766e]">
                  約{GRADING_COUNT}回分でならすと<span className="text-[#ea580c]">1回あたり約{perRound}円</span>／買い切り・自動更新なし
                </p>
                {/* 「高い？」への即レス：価格のすぐ下にお試し導線 */}
                <HeroTrialLink location="hero_trial" />
              </div>

              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta location="hero_primary">対応教材を見て申し込む</PrimaryCta>
                <SecondaryCta location="hero_samples" href="#samples">アプリ画面を見る</SecondaryCta>
              </div>
              <p className="mt-3 text-[0.78rem] leading-[1.7] text-[#64748b]">
                クレジットカード決済／追加料金なし／決済後すぐに開始のご案内をお送りします。
              </p>
            </div>

            {/* 右カラム：デスクトップの実物画像（返却＝添削画面）。モバイルは上に出すので非表示 */}
            <div className="relative hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. 解決する悩み */}
      <section className="bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Problem</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              問題集だけでは続かなかった人へ。
            </h2>
          </div>
          <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            {problems.map((p) => (
              <li key={p.text} className="flex flex-col items-center gap-4 rounded-[18px] bg-[#f8fafc] p-6 text-center ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.18)]">
                  <ProblemIcon kind={p.icon} className="h-7 w-7" />
                </span>
                <p className="whitespace-pre-line text-[0.98rem] font-bold leading-[1.7] text-[#0b1d4a]">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4. 利用の流れ */}
      <section id="how" className="scroll-mt-20 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              解いて、出して、進む。4ステップ。
            </h2>
          </div>
          <ol className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {flow.map((s) => (
              <li key={s.n} className="rounded-[18px] bg-white p-5 text-center ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#0b1d4a] text-[0.9rem] font-black text-white">{s.n}</span>
                <p className="mt-3 text-[1.15rem] font-black leading-none text-[#0b1d4a]">{s.verb}</p>
                <p className="mt-2 text-[0.8rem] font-semibold leading-[1.5] text-[#475569]">{s.title}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.86rem] leading-[1.9] text-[#64748b]">
            提出した瞬間に<span className="font-bold text-[#0f766e]">解答解説</span>が届き、
            <span className="font-bold text-[#0f766e]">添削を待たずに次へ</span>進めます。
          </p>
        </Container>
      </section>

      {/* 5. 実際に届くもの */}
      <section className="bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>What you get</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              教材・添削・アプリが、
              <br className="sm:hidden" />
              まとめて1つの買い切り。
            </h2>
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <li key={item} className="flex items-center gap-2.5 rounded-[14px] bg-[#f8fafc] px-4 py-3.5 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0d9488] text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-[0.92rem] font-bold leading-[1.4] text-[#0b1d4a]">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. 提出から返却まで（アプリ画面・信頼の中心） */}
      <section id="samples" className="scroll-mt-20 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Screens · 提出から返却まで</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              提出すると、
              <br className="sm:hidden" />
              こう返ってきます。
            </h2>
            <p className="mt-3 text-[0.9rem] leading-[1.85] text-[#475569]">
              丸つけで終わりにしない。途中式・考え方・減点されやすい書き方まで確認します。
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            {correctionShots.map((shot) => (
              <figure key={shot.title} className="overflow-hidden rounded-[16px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_28px_60px_-48px_rgba(11,29,74,0.5)]">
                <p className="mb-2 inline-flex items-center gap-1.5 text-[0.8rem] font-extrabold text-[#0f766e]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                  {shot.title}
                </p>
                <div className="overflow-hidden rounded-[10px] bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.06)]">
                  <Image
                    src={shot.src}
                    alt={`${shot.title}（デモ画面）`}
                    width={shot.width}
                    height={shot.height}
                    sizes="(max-width: 640px) 92vw, 460px"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2 text-[0.82rem] leading-[1.75] text-[#475569]">{shot.body}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-[0.72rem] font-semibold text-[#94a3b8]">※ 画面と添削内容は、アプリの機能を示す見本（サンプル）です。実在する生徒の提出データではありません。</p>
          <div className="mt-8 flex justify-center">
            <PrimaryCta location="samples_primary">教材を見て申し込む</PrimaryCta>
          </div>
        </Container>
      </section>

      {/* 7. 教材選択 */}
      <section id="materials" className="scroll-mt-20 bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <ViewItemBeacon items={viewItems} />
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Materials · 教材を選ぶ</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              物理・化学・数学・英語から、必要な教材だけ。
            </h2>
            <p className="mt-3 text-[0.9rem] leading-[1.85] text-[#475569]">
              1教材＝約{GRADING_COUNT}回分・{campaign ? `開講記念${formatYen(single)}（通常${formatYen(MATERIAL_PRICE)}）` : formatYen(single)}（税込）。
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6">
            {SUBJECT_AREAS.map((area) => {
              const items = SUBJECTS.filter((s) => s.area === area);
              const color = items[0]?.color ?? "#0b1d4a";
              return (
                <div key={area}>
                  <p className="mb-3 flex items-center gap-2 text-[0.9rem] font-extrabold text-[#0b1d4a]">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                    {area}
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s) => (
                      <li
                        key={s.id}
                        className="flex flex-col overflow-hidden rounded-[16px] bg-white ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_22px_46px_-40px_rgba(11,29,74,0.55)]"
                      >
                        <div className="flex gap-3.5 p-4">
                          {/* 表紙 */}
                          <span
                            className="w-[4.6rem] shrink-0 self-start rounded-[9px] p-1.5 ring-1 ring-[rgba(15,29,74,0.06)]"
                            style={{ background: `linear-gradient(180deg, ${s.color}1f 0%, rgba(248,250,252,0.9) 100%)` }}
                          >
                            {subjectCovers[s.id] ? (
                              <BookCover asin={subjectCovers[s.id]} title={s.label} />
                            ) : null}
                          </span>
                          {/* 情報 */}
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex w-fit rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold text-white" style={{ background: s.color }}>
                              {s.label}
                            </span>
                            <p className="mt-2 text-[0.8rem] font-semibold leading-[1.5] text-[#475569]">対象：{subjectTargets[s.id] ?? "高校生"}</p>
                            <p className="mt-1 text-[0.74rem] leading-[1.5] text-[#64748b]">約{GRADING_COUNT}回分・提出ごとに添削</p>
                            <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                              {campaign ? (
                                <span className="text-[0.74rem] font-semibold text-[#94a3b8] line-through">{formatYen(MATERIAL_PRICE)}</span>
                              ) : null}
                              <span className="text-[1.2rem] font-black leading-none tracking-[-0.01em] text-[#0b1d4a]">{formatYen(single)}</span>
                              <span className="text-[0.7rem] font-semibold text-[#475569]">税込</span>
                            </p>
                          </div>
                        </div>
                        {/* 押しやすい大きめCTA：押すと該当教材がカートに入った状態で申込へ */}
                        <TrackedLink
                          href={`/apply?add=${s.id}#form`}
                          location={`material_card_${s.id}`}
                          ariaLabel={`${s.label}をカートに入れて申し込む`}
                          className="group/mc relative m-3 mt-0 inline-flex min-h-[3rem] items-center justify-center gap-1.5 overflow-hidden rounded-full px-4 text-[0.92rem] font-extrabold text-white shadow-[0_16px_30px_-14px_rgba(234,88,12,0.85)] transition hover:-translate-y-px active:translate-y-0"
                        >
                          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                          <span aria-hidden="true" className="relative">＋</span>
                          <span className="relative">カートに入れる</span>
                        </TrackedLink>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[0.88rem] leading-[1.8] text-[#475569]">
            どれを選べばよいか迷う場合は、
            <LeadLink href="/contact" location="materials_lead" className="font-bold text-[#0f766e] underline underline-offset-2">
              教材選びを相談する
            </LeadLink>
            。
          </p>
        </Container>
      </section>

      {/* 8. 料金 */}
      <section id="pricing" className="scroll-mt-20 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Price · 料金</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              1教材・約{GRADING_COUNT}回分。買い切り。
            </h2>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 lg:grid-cols-2">
            {/* 1教材 */}
            <div className="rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_64px_-50px_rgba(11,29,74,0.5)]">
              <p className="text-[0.82rem] font-bold text-[#0f766e]">1教材（約{GRADING_COUNT}回分）</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {campaign ? (
                  <span className="text-[1rem] font-semibold text-[#94a3b8] line-through">通常{formatYen(MATERIAL_PRICE)}</span>
                ) : null}
                <span className="text-[2.4rem] font-black leading-none tracking-[-0.02em] text-[#0b1d4a]">{formatYen(single)}</span>
                <span className="text-[0.86rem] font-bold text-[#475569]">（税込）</span>
              </p>
              {campaign ? (
                <p className="mt-1.5 inline-flex rounded-full bg-[#fff1e6] px-3 py-1 text-[0.76rem] font-extrabold text-[#ea580c]">
                  {CAMPAIGN_DEADLINE_LABEL}まで 開講記念価格
                </p>
              ) : null}
              <p className="mt-4 text-[0.78rem] font-bold tracking-[0.06em] text-[#64748b]">含まれるもの</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {["教材", "解答解説", "添削", "専用アプリ"].map((t) => (
                  <li key={t} className="rounded-full bg-[#f1f5f9] px-3 py-1 text-[0.8rem] font-bold text-[#334155]">{t}</li>
                ))}
              </ul>
            </div>

            {/* 2教材パック */}
            <div className="rounded-[20px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f5e5e_100%)] p-6 text-white shadow-[0_30px_64px_-46px_rgba(11,29,74,0.7)]">
              <p className="text-[0.82rem] font-bold text-[#5eead4]">2教材パック</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {campaign ? (
                  <span className="text-[1rem] font-semibold text-white/60 line-through">通常{formatYen(pack2List)}</span>
                ) : null}
                <span className="text-[2.4rem] font-black leading-none tracking-[-0.02em]">{formatYen(pack2)}</span>
                <span className="text-[0.86rem] font-bold text-white/80">（税込）</span>
              </p>
              <p className="mt-3 text-[0.84rem] leading-[1.8] text-white/85">
                主科目＋弱点補強にどうぞ。2教材以上はパック割で、1教材あたりさらにおトクです。
              </p>
              <ul className="mt-4 grid gap-1.5 text-[0.82rem] font-semibold text-white/90">
                {["入会金0円", "月額料金0円", "自動更新なし", "追加費用なし"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#5eead4] text-[#0b1d4a]"><Check className="h-2.5 w-2.5" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PrimaryCta location="pricing_primary">教材を選んで申し込む</PrimaryCta>
            <SecondaryCta location="pricing_lead" href="/contact">教材選びを相談する</SecondaryCta>
          </div>

          {/* お試し導線（「高い？」への即レスとして目立たせる） */}
          <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#fff7ed_0%,#ffe8d1_100%)] ring-1 ring-[rgba(234,88,12,0.3)] shadow-[0_28px_60px_-46px_rgba(234,88,12,0.6)]">
            <div className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:justify-between sm:gap-6 sm:p-7 sm:text-left">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-[#ea580c] text-center text-[0.7rem] font-black leading-tight text-white shadow-[0_10px_20px_-8px_rgba(234,88,12,0.8)]">
                  お試し
                </span>
                <div>
                  <p className="text-[0.94rem] font-extrabold text-[#9a3412]">高いと感じたら、まず3回だけ。</p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span className="text-[0.82rem] font-bold text-[#7c2d12]">添削{TRIAL_GRADING_COUNT}回お試し</span>
                    <span className="text-[2rem] font-black leading-none tracking-[-0.02em] text-[#ea580c]">{formatYen(TRIAL_PRICE)}</span>
                    <span className="text-[0.76rem] font-bold text-[#9a3412]">（税込）</span>
                  </p>
                  <p className="mt-1.5 inline-flex items-center rounded-full bg-white/70 px-2.5 py-0.5 text-[0.76rem] font-bold text-[#0f766e]">
                    本契約に進めば、お試し代{formatYen(TRIAL_PRICE)}はそのまま値引き
                  </p>
                </div>
              </div>
              <TrackedLink
                href="/apply#trial"
                location="pricing_trial"
                className="group/tr relative inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 text-[0.92rem] font-extrabold text-white shadow-[0_16px_30px_-14px_rgba(234,88,12,0.85)] transition hover:-translate-y-px sm:w-auto"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative">お試しを申し込む</span>
                <span aria-hidden="true" className="relative">→</span>
              </TrackedLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 8.5 購入後の流れ（決済後は自動で始まる＝安心） */}
      <section id="after" className="scroll-mt-20 bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>After purchase · 購入後の流れ</SectionLabel>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
              買ったら、あとは<span className="text-[#ea580c]">自動で</span>始まります。
            </h2>
            <p className="mt-3 text-[0.9rem] leading-[1.9] text-[#475569]">
              面倒な手続きは、ありません。
              <br className="sm:hidden" />
              決済が終わると教材が自動で入り、その日から始められます。
            </p>
          </div>

          {/* 自動割り当ての見本（ダッシュボード） */}
          <figure className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-[18px] bg-[#f8fafc] p-3 ring-1 ring-[rgba(15,29,74,0.07)] shadow-[0_28px_60px_-48px_rgba(11,29,74,0.5)]">
            <Image
              src={`/samples/after-purchase-dashboard-v2.png?v=${sampleV}`}
              alt="購入した教材が自動でダッシュボードに入った画面（見本）"
              width={724}
              height={203}
              sizes="(max-width: 768px) 92vw, 720px"
              className="h-auto w-full rounded-[10px] ring-1 ring-[rgba(15,29,74,0.06)]"
            />
            <figcaption className="mt-2 text-center text-[0.72rem] font-semibold text-[#94a3b8]">
              購入教材が自動で入ったダッシュボード（見本）
            </figcaption>
          </figure>

          {/* 4ステップ */}
          <ol className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {afterSteps.map((s) => (
              <li key={s.n} className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0d9488] text-[0.95rem] font-extrabold text-white">{s.n}</span>
                <p className="mt-3 text-[0.98rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{s.title}</p>
                <p className="mt-1.5 text-[0.82rem] leading-[1.75] text-[#475569]">{s.body}</p>
              </li>
            ))}
          </ol>

          {/* 安心の一言＋バッジ */}
          <div className="mx-auto mt-6 max-w-3xl rounded-[18px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f5e5e_100%)] p-6 text-center text-white shadow-[0_30px_64px_-48px_rgba(11,29,74,0.7)]">
            <p className="text-[0.98rem] font-bold leading-[1.8] sm:text-[1.05rem]">
              決済のあと、あなたがやる手続きはありません。
              <br className="hidden sm:block" />
              だから、思い立った日にそのまま始められます。
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {["面談・勧誘なし", "教材は自動で割り当て", "ログイン情報はメールでも届く", "その日から提出OK"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[0.78rem] font-bold text-white ring-1 ring-white/20">
                  <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#5eead4] text-[#0b1d4a]">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PrimaryCta location="after_primary">教材を選んで申し込む</PrimaryCta>
            <SecondaryCta location="after_detail" href="/after-purchase">購入後の流れをくわしく見る</SecondaryCta>
          </div>
        </Container>
      </section>

      {/* 9. 運営者の信頼 */}
      <section id="about" className="scroll-mt-20 bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)]">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
            <div>
              <SectionLabel>Author · 運営者</SectionLabel>
              <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
                教材を書いた本人が、答案を確認します。
              </h2>
              <dl className="mt-5 grid gap-1.5 text-[0.9rem] text-[#334155]">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold text-[#0b1d4a]">森 祐太</dt>
                  <dd className="text-[#64748b]">／ 名古屋大学 工学部</dd>
                </div>
                <div>
                  <dd className="font-semibold text-[#0b1d4a]">応用情報技術者</dd>
                </div>
                <div>
                  <dd>『考える力を育てる』シリーズなど16冊を執筆</dd>
                </div>
              </dl>
              <p className="mt-4 text-[0.9rem] leading-[1.9] text-[#475569]">
                教材の意図を理解した作成者本人が、途中式や考え方まで確認します。
              </p>
              <a
                href={kdpAmazonUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#0b1d4a] px-5 text-[0.86rem] font-bold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                著書を見る（Amazon）
                <span aria-hidden="true" className="text-[0.72rem]">↗</span>
              </a>
            </div>
            <ul className="grid grid-cols-4 gap-3">
              {authorBooks.map((b) => (
                <li key={b.asin}>
                  <BookCover asin={b.asin} title={b.title} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="scroll-mt-20 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionLabel>FAQ · よくある質問</SectionLabel>
              <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[2rem]">
                申し込む前に
              </h2>
            </div>
            <ul className="mt-8 grid gap-3">
              {homeFaq.map((item) => (
                <li key={item.question} className="rounded-[14px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <p className="flex items-start gap-2.5 text-[0.98rem] font-extrabold leading-[1.55] text-[#0b1d4a]">
                    <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#0d9488] text-[0.76rem] font-bold text-white">Q</span>
                    {item.question}
                  </p>
                  <p className="mt-3 border-t border-dotted border-[rgba(15,29,74,0.12)] pt-3 text-[0.88rem] leading-[1.95] text-[#334155]">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 11. 最終CTA */}
      <section className="bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-20">
          <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] px-6 py-11 text-center text-white shadow-[0_44px_90px_-50px_rgba(11,29,74,0.8)] sm:px-10 sm:py-14">
            <h2 className="text-[1.5rem] font-extrabold leading-[1.35] sm:text-[2rem]">
              問題集を、今度こそ最後まで。
            </h2>
            <p className="mt-3 text-[0.94rem] leading-[1.9] text-white/85">
              約{GRADING_COUNT}回分の教材・解答解説・答案添削・専用アプリがセット。
            </p>
            <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
              {campaign ? (
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.72rem] font-extrabold text-[#5eead4]">開講記念価格</span>
              ) : null}
              <span className="text-[2.4rem] font-black leading-none tracking-[-0.02em]">{formatYen(single)}</span>
              <span className="text-[0.86rem] font-bold text-white/80">（税込）</span>
            </p>
            <p className="mt-1 text-[0.8rem] font-semibold text-white/75">買い切り・自動更新なし</p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <PrimaryCta location="final_primary">教材を選んではじめる</PrimaryCta>
              <TrackedLink
                href="/contact"
                location="final_lead"
                eventName="generate_lead"
                extraParams={{ method: "form" }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/50 px-6 text-[0.96rem] font-semibold text-white transition hover:bg-white hover:text-[#0b1d4a] sm:w-auto sm:px-8"
              >
                教材選びを相談する
              </TrackedLink>
            </div>
          </div>
        </Container>
      </section>

      {/* モバイル下部の固定CTA */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="mx-auto max-w-[40rem] px-3 pb-[calc(env(safe-area-inset-bottom)+0.6rem)]">
          <TrackedLink
            href="/apply#form"
            location="mobile_sticky"
            className="relative flex min-h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 text-[0.98rem] font-extrabold text-white shadow-[0_18px_40px_-14px_rgba(234,88,12,0.85)]"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
            <span className="relative">{formatYen(single)}で教材を選ぶ</span>
            <span aria-hidden="true" className="relative">→</span>
          </TrackedLink>
        </div>
      </div>
    </>
  );
}
