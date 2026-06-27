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
    "高校物理・数学の毎日添削オンライン塾｜考える力を育てる - ノビットスタディ 中高部",
  description:
    "ノビットスタディ 中高部は、高校物理・数学・英語の記述答案を毎日添削するオンライン学習管理塾。面談や授業は行わず、塾長オリジナル教材と独自の管理システムで、自分のペースの自立学習と途中式・考え方・答案の組み立てまで丁寧に指導します。塾としては安価に毎日プロの添削。無料体験受付中。",
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
    title: "記述答案を、一枚ずつ丁寧に添削",
    body: "答えが合っているかだけでなく、途中式・考え方・答案の組み立てまで確認。「どこをどう直すか」が分かる形でフィードバックします。",
  },
  {
    no: "02",
    title: "塾長オリジナル教材で段階的に学べる",
    body: "塾長が開発した独自教材と公式演習本で、基礎から記述レベルまで無理なくステップアップ。KDP 刊行の物理シリーズの設計思想がベースです。",
  },
  {
    no: "03",
    title: "途中式・考え方・減点ポイントまで指摘",
    body: "正解/不正解で終わらせません。なぜその式になるのか、どこで論理が飛んだのか、本番なら何点引かれるのかまで踏み込みます。",
  },
  {
    no: "04",
    title: "オンライン完結だから、続けやすい",
    body: "通塾なし。独自の学習管理システムで毎日の演習と添削が回るので、自分のペースを崩さず自立した学びを継続できます。",
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
          <div className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.25)] sm:text-[0.74rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                オンライン添削塾・中高部
              </p>

              <h1 className="mt-6 text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.018em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.16] lg:text-[3.1rem]">
                <span className="block">考える力を育てる、</span>
                <span className="block bg-[linear-gradient(95deg,#1d4ed8_0%,#0d9488_55%,#16a34a_100%)] bg-clip-text text-transparent">
                  高校物理の<span className="whitespace-nowrap">オンライン添削。</span>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-[1.02rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
                解答を書いて終わりにしない。
                <strong className="font-bold text-[#0b1d4a]">途中式・考え方・答案の組み立て</strong>
                まで、毎日丁寧に添削します。高校物理を中心に、数学・英語の記述答案にも対応。
              </p>

              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrimaryCta href="/contact">無料体験を申し込む</PrimaryCta>
                <SecondaryCta href="/#features">サービス内容を見る</SecondaryCta>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.84rem] font-semibold text-[#475569]">
                {["毎日演習・毎日添削", "面談・授業なしの添削専門", "自分のペースで自立学習"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="text-[#0d9488]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-w-0">
              {/* 背面の柔らかな発光 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-10 h-60 w-60 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.22),transparent)] blur-2xl"
              />
              {/* 本物の演習本ページ（冊子に見えるよう表紙を背面に） */}
              <div className="relative mx-auto max-w-[20rem] sm:max-w-[24rem] lg:mx-0 lg:ml-auto">
                <div
                  aria-hidden="true"
                  className="absolute -right-4 top-5 hidden w-[74%] rotate-[7deg] overflow-hidden rounded-[12px] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_24px_44px_-26px_rgba(11,29,74,0.5)] sm:block"
                >
                  <PrintImage base="print-cover" alt="" sizes="280px" className="block h-auto w-full" />
                </div>
                <div className="relative -rotate-[2.5deg] overflow-hidden rounded-[14px] bg-white ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_44px_70px_-38px_rgba(11,29,74,0.55)]">
                  <PrintImage
                    base="print-problem"
                    alt="ノビット公式演習本（数学IIIC 関数）の問題ページ。右側に解答欄があり、提出した答案を毎日添削する。"
                    sizes="(min-width: 1024px) 440px, 78vw"
                    priority
                    className="block h-auto w-full"
                  />
                </div>
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

      {/* ───────── FLOW（学習の流れ） ───────── */}
      <section id="flow" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
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
                塾長は、KDP（Amazon Kindle）で
                <strong className="font-bold text-[#0b1d4a]">「考える力を育てる高校物理」シリーズ</strong>
                を刊行している教材開発者です。市販教材と同じ設計思想で作られた公式演習本に取り組み、
                その答案を開発者本人が毎日添削する——だから、教材と添削に一切のズレがありません。
              </p>
              <ul className="mt-6 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155]">
                {[
                  "ノビット公式演習本で、記述前提の演習を毎日積む",
                  "KDP 物理シリーズの設計思想をそのままカリキュラムへ",
                  "教材だけの購入も可能（添削はサービスとセット）",
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCta href="/contact">無料体験で教材を試す</PrimaryCta>
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
              {/* KDP の市販教材＝信頼材料 */}
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.08)]">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/denjikigaku-cover-200.avif 200w, /denjikigaku-cover-400.avif 400w"
                    sizes="64px"
                  />
                  <source
                    type="image/webp"
                    srcSet="/denjikigaku-cover-200.webp 200w, /denjikigaku-cover-400.webp 400w"
                    sizes="64px"
                  />
                  <img
                    src="/denjikigaku-cover-200.webp"
                    alt="KDP 刊行『考える力を育てる高校物理』シリーズ（電磁気学）の表紙"
                    width={857}
                    height={1328}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-auto shrink-0 rounded-[6px] shadow-[0_10px_22px_-12px_rgba(11,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.08)]"
                  />
                </picture>
                <p className="text-[0.84rem] leading-[1.8] text-[#334155]">
                  市販の <strong className="font-bold text-[#0b1d4a]">『考える力を育てる高校物理』</strong>（KDP）も塾長が執筆。
                  同じ設計思想の演習本に取り組み、その答案を<strong className="font-bold text-[#0b1d4a]">開発者本人が添削</strong>します。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── PRICING / 無料体験 ───────── */}
      <section id="pricing" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-center text-[0.98rem] font-bold text-[#0f766e] sm:mb-8 sm:text-[1.1rem]">
              まずは気軽に、無料体験から。
            </p>
            <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_70px_-50px_rgba(15,29,74,0.4)]">
              <div className="bg-[linear-gradient(135deg,#0d9488_0%,#0f766e_100%)] px-7 py-7 text-white sm:px-10">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#bbf7e9]">
                  Price · 料金・無料体験
                </p>
                <h2 className="mt-2 text-[1.6rem] font-extrabold leading-[1.3] sm:text-[2rem]">
                  まずは無料体験から。
                </h2>
              </div>
              <div className="px-7 py-8 sm:px-10 sm:py-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[18px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
                    <p className="text-[0.78rem] font-bold tracking-[0.1em] text-[#0f766e]">月額プラン</p>
                    <p className="mt-2 flex items-baseline gap-2">
                      <span className="text-[1.8rem] font-extrabold text-[#0b1d4a]">準備中</span>
                    </p>
                    <p className="mt-2 text-[0.86rem] leading-[1.85] text-[#475569]">
                      料金プランは現在準備中です。「塾としては安価に、毎日プロの添削」を大切に設計しています。お申し込み・ご相談時に最新の料金をご案内します。
                    </p>
                  </div>
                  <div className="rounded-[18px] bg-[#fff7ed] p-6 ring-1 ring-[rgba(234,88,12,0.18)]">
                    <p className="text-[0.78rem] font-bold tracking-[0.1em] text-[#ea580c]">無料体験</p>
                    <p className="mt-2 text-[1.8rem] font-extrabold text-[#0b1d4a]">受付中</p>
                    <p className="mt-2 text-[0.86rem] leading-[1.85] text-[#7c2d12]">
                      実際の教材で演習し、答案を提出して、ノビットの添削を体験できます。学習管理システムの使い方もご案内します。
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <PrimaryCta href="/contact">無料体験を申し込む</PrimaryCta>
                  <SecondaryCta href="/contact">相談してみる</SecondaryCta>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
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
                まずは無料体験で、ノビットの教材と添削を試してみてください。
                現状の悩みや目標を聞かせていただければ、続け方のイメージもご案内します。
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <PrimaryCta href="/contact">無料体験を申し込む</PrimaryCta>
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
    </>
  );
}
