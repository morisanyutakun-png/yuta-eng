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

/**
 * 公式演習本＋添削を象った SVG。ティール基調のワークシート（実物の演習本に準拠）に、
 * オレンジ／レッドの添削コメントを重ねて「毎日添削」を表現する。
 */
function WorksheetVisual() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="block h-full w-full"
      role="img"
      aria-label="ノビットスタディ公式演習本の答案に、途中式・考え方・減点ポイントの添削コメントが入っているイメージ"
    >
      <defs>
        <linearGradient id="ws-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3fbfb" />
          <stop offset="1" stopColor="#e6f4f4" />
        </linearGradient>
        <linearGradient id="ws-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="0.5" stopColor="#0d9488" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <rect width="560" height="460" rx="22" fill="url(#ws-bg)" />

      {/* paper sheet */}
      <g>
        <rect x="60" y="40" width="380" height="400" rx="12" fill="#ffffff" stroke="#d4e7e7" strokeWidth="2" />

        {/* header band */}
        <rect x="60" y="40" width="380" height="46" rx="12" fill="#0f5e5e" />
        <rect x="60" y="74" width="380" height="12" fill="#0f5e5e" />
        <text x="84" y="70" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="700" fill="#ffffff">
          高校数学　複素数平面
        </text>
        <rect x="372" y="52" width="48" height="22" rx="5" fill="#0d9488" />
        <text x="396" y="68" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">
          C-1
        </text>

        {/* problem 1 */}
        <g transform="translate(84 108)">
          <rect width="18" height="18" rx="3" fill="#0f5e5e" />
          <text x="9" y="14" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">1</text>
          <text x="28" y="14" fontFamily="serif" fontSize="13" fill="#1f2937">z = −9 + 12i の絶対値を求めよ。</text>
        </g>
        {/* answer box 1 with 添削 check */}
        <rect x="84" y="134" width="312" height="46" rx="6" fill="#ffffff" stroke="#9fc7c7" strokeWidth="1.5" />
        <text x="96" y="164" fontFamily="serif" fontSize="13" fill="#334155">|z| = √(81+144) = 15</text>
        <path d="M356 150 l7 8 l14 -16" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* problem 2 */}
        <g transform="translate(84 200)">
          <rect width="18" height="18" rx="3" fill="#0f5e5e" />
          <text x="9" y="14" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">2</text>
          <text x="28" y="14" fontFamily="serif" fontSize="13" fill="#1f2937">(4 + i)(1 − 2i) を計算せよ。</text>
        </g>
        <rect x="84" y="226" width="312" height="66" rx="6" fill="#ffffff" stroke="#9fc7c7" strokeWidth="1.5" />
        <text x="96" y="252" fontFamily="serif" fontSize="13" fill="#334155">= 4 − 8i + i − 2i²</text>
        {/* red 添削 underline + comment */}
        <text x="96" y="274" fontFamily="serif" fontSize="13" fill="#334155">= 6 − 7i</text>
        <path d="M150 246 q 18 6 36 0" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <text x="210" y="252" fontFamily="system-ui" fontSize="11" fontWeight="700" fill="#ef4444">i²=−1 を明示！</text>

        {/* problem 3 lines */}
        <g transform="translate(84 312)">
          <rect width="18" height="18" rx="3" fill="#0f5e5e" />
          <text x="9" y="14" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#ffffff" textAnchor="middle">3</text>
          <text x="28" y="14" fontFamily="serif" fontSize="13" fill="#1f2937">極形式で表せ。</text>
        </g>
        <rect x="84" y="338" width="312" height="40" rx="6" fill="#ffffff" stroke="#9fc7c7" strokeWidth="1.5" />
        <line x1="98" y1="360" x2="280" y2="360" stroke="#e2e8f0" strokeWidth="1.5" />

        {/* footer mark */}
        <text x="396" y="416" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#0d9488" textAnchor="end">
          NOBIT STUDY
        </text>
      </g>

      {/* floating 添削 comment bubble (考え方OK) */}
      <g transform="translate(360 300)">
        <rect width="172" height="68" rx="14" fill="#0f5e5e" />
        <path d="M28 68 l-12 18 l30 -18 z" fill="#0f5e5e" />
        <text x="16" y="28" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#5eead4">添削コメント</text>
        <text x="16" y="48" fontFamily="system-ui" fontSize="13" fontWeight="700" fill="#ffffff">考え方の筋は◎。</text>
        <text x="16" y="62" fontFamily="system-ui" fontSize="11" fill="#cbfbf1">あと一歩、記述を補足。</text>
      </g>

      {/* growth arrow + score chip */}
      <g transform="translate(24 26)">
        <rect width="120" height="34" rx="17" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <path d="M16 24 q 8 4 16 -2 q 8 -6 12 -12" fill="none" stroke="url(#ws-arrow)" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 8 l8 0 l0 8" fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="23" fontFamily="system-ui" fontSize="13" fontWeight="800" fill="#ea580c">毎日、添削</text>
      </g>
    </svg>
  );
}

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

/** マスコット「ノビットくん」。白背景なので明るい面のみで使用する。 */
function Mascot({
  variant,
  className,
  alt = "",
}: {
  variant: "wave" | "point";
  className?: string;
  alt?: string;
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
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
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
          <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.25)] sm:text-[0.74rem]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                オンライン添削塾・中高部
              </p>

              <h1 className="mt-6 text-balance text-[2.1rem] font-extrabold leading-[1.2] tracking-[-0.018em] text-[#0b1d4a] sm:text-[2.9rem] sm:leading-[1.15] lg:text-[3.3rem]">
                考える力を育てる、
                <br />
                <span className="bg-[linear-gradient(95deg,#1d4ed8_0%,#0d9488_55%,#16a34a_100%)] bg-clip-text text-transparent">
                  高校物理のオンライン添削。
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

            <div className="relative">
              <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_40px_80px_-50px_rgba(11,29,74,0.5)]">
                <WorksheetVisual />
              </div>
              {/* マスコットを地に馴染ませる発光と接地影 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -left-6 h-44 w-44 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.28),transparent)] blur-2xl sm:-left-10 sm:h-52 sm:w-52"
              />
              <div className="pointer-events-none absolute -bottom-7 -left-3 z-10 sm:-left-7">
                <Mascot
                  variant="wave"
                  alt="ノビットくん"
                  className="h-28 w-auto drop-shadow-[0_16px_18px_rgba(11,29,74,0.22)] sm:h-36"
                />
                {/* 接地影 */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-1 mx-auto h-3 rounded-[50%] bg-[rgba(11,29,74,0.18)] blur-md"
                />
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
              <div className="grid grid-cols-[1fr_1.25fr] items-end gap-4 sm:gap-6">
                {/* KDP book cover */}
                <figure className="overflow-hidden rounded-[16px] bg-[#f1f5f9] shadow-[0_30px_60px_-40px_rgba(11,29,74,0.6)] ring-1 ring-[rgba(15,29,74,0.08)]">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/denjikigaku-cover-200.avif 200w, /denjikigaku-cover-400.avif 400w, /denjikigaku-cover-600.avif 600w"
                      sizes="(min-width: 1024px) 200px, 40vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/denjikigaku-cover-200.webp 200w, /denjikigaku-cover-400.webp 400w, /denjikigaku-cover-600.webp 600w"
                      sizes="(min-width: 1024px) 200px, 40vw"
                    />
                    <img
                      src="/denjikigaku-cover-400.webp"
                      alt="KDP 刊行『考える力を育てる高校物理』シリーズ（電磁気学）の表紙"
                      width={857}
                      height={1328}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </picture>
                  <figcaption className="bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">
                    KDP『考える力を育てる高校物理』
                  </figcaption>
                </figure>
                {/* official workbook */}
                <figure className="overflow-hidden rounded-[16px] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_60px_-40px_rgba(11,29,74,0.5)]">
                  <WorksheetVisual />
                  <figcaption className="bg-white px-3 py-2 text-center text-[0.72rem] font-semibold text-[#475569]">
                    ノビット公式演習本＋毎日添削
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── PRICING / 無料体験 ───────── */}
      <section id="pricing" className="cv-defer scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8">
              <Mascot variant="point" alt="ノビットくん" className="h-16 w-auto sm:h-20" />
              <p className="text-[0.98rem] font-bold text-[#0f766e] sm:text-[1.1rem]">
                まずは気軽に、無料体験から！
              </p>
            </div>
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
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] sm:text-[2.4rem]">
              答案を、毎日プロに見てもらう習慣を。
            </h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-[1.95] text-white/85">
              まずは無料体験で、ノビットの教材と添削を試してみてください。
              現状の悩みや目標を聞かせていただければ、続け方のイメージもご案内します。
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <PrimaryCta href="/contact">無料体験を申し込む</PrimaryCta>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.98rem] font-semibold text-white transition hover:bg-white hover:text-[#0b1d4a]"
              >
                相談してみる
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
