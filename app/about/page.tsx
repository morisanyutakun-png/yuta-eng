import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { kdpAmazonUrl, siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createPersonJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "塾について｜塾長・森 祐太と、ノビットスタディの考え方",
  description:
    "ノビットスタディ 中高部の塾長・森 祐太のプロフィールと、塾の考え方。名古屋大学 工学部 電気電子情報系で学び、応用情報技術者を取得。KDP で『考える力を育てる高校物理』シリーズを刊行する教材開発者が、高校物理・数学・英語の記述答案を毎日添削します。面談や授業は行わない、添削専門の学習管理塾です。",
  keywords: [
    "森 祐太",
    "ノビットスタディ 塾長",
    "高校物理 教材開発者",
    "高校物理 添削 指導者",
    "名古屋大学 電気電子情報",
    "応用情報技術者",
    "考える力を育てる高校物理",
  ],
  path: "/about",
});

const principles = [
  {
    label: "01",
    title: "答案を、毎日プロが見る",
    text: "「解いて終わり」にしない。途中式・考え方・答案の組み立てまで、毎日の添削で具体的に指摘します。独学では気づけない弱点を、見える化します。",
  },
  {
    label: "02",
    title: "公式暗記ではなく、考える力を",
    text: "現象・図・言葉・式を地続きにつなぐ、構造で理解する学び方。暗記に頼らず、初見の問題でも自分で答案を組み立てられる力を育てます。",
  },
  {
    label: "03",
    title: "自分のペースで、自立した学びを",
    text: "面談や授業はしません。毎日の演習を独自の学習管理システムで回し、添削で軌道修正する。生活に合わせて続けられる、自立学習の形を設計しています。",
  },
];

const expertise = [
  {
    label: "Physics",
    title: "高校物理 / 電磁気学",
    body: "現象 → 図 → 言葉 → 式 を地続きにつなぐ、構造で理解する教材設計。公式暗記に依存しない学び方をつくっています。",
  },
  {
    label: "Materials",
    title: "教材開発 / KDP 刊行",
    body: "『考える力を育てる高校物理』シリーズを KDP で刊行。市販教材と同じ設計思想で、ノビット公式演習本を制作しています。",
  },
  {
    label: "Marking",
    title: "記述答案の添削指導",
    body: "途中式・考え方・減点ポイントまで踏み込み、本番で通用する答案へ。教材開発者本人が直接添削します。",
  },
  {
    label: "Tech",
    title: "学習管理システム",
    body: "応用情報技術者として培った技術で、毎日の演習・提出・添削が回る独自の学習管理を設計・運用しています。",
  },
];

export default function AboutPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "塾について", path: "/about" },
  ]);
  const personJsonLd = createPersonJsonLd();

  return (
    <>
      <JsonLd data={[breadcrumb, personJsonLd]} />

      {/* AUTHOR HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_55%,#eef6f6_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[15%] h-[70%] w-[60%] opacity-80"
          style={{
            background:
              "radial-gradient(closest-side, rgba(13,148,136,0.22), transparent 75%)",
          }}
        />
        <Container className="relative px-5 sm:px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#64748b] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#0f766e]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#0b1d4a]">塾について</li>
            </ol>
          </nav>

          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
            <div itemScope itemType="https://schema.org/Person">
              <meta itemProp="url" content={`${siteConfig.url}/about`} />
              <meta itemProp="image" content={`${siteConfig.url}/brand/nobit-mark.svg`} />

              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
                塾長・運営者プロフィール
              </p>
              <h1
                itemProp="name"
                className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.5rem] lg:text-[2.9rem]"
              >
                {siteConfig.author}
              </h1>
              <p
                itemProp="jobTitle"
                className="mt-3 text-[0.95rem] font-bold leading-[1.6] text-[#0f766e] sm:text-[1.05rem]"
              >
                ノビットスタディ 塾長 ／ 教材開発者 ／ 添削指導者
              </p>

              <p
                itemProp="description"
                className="mt-6 text-pretty text-[0.98rem] leading-[2] text-[#334155] sm:text-[1.04rem]"
              >
                <strong className="font-bold text-[#0b1d4a]">{siteConfig.author}</strong> は、
                <strong className="font-bold text-[#0b1d4a]">名古屋大学 工学部 電気電子情報系</strong> で学んだ理系教育者です。
                KDP で <strong className="font-bold text-[#0b1d4a]">『考える力を育てる高校物理』シリーズ</strong> を刊行し、
                その設計思想をそのままノビット公式演習本へ。高校物理を中心に、記述答案を毎日添削しています。
              </p>

              <div
                itemProp="alumniOf"
                itemScope
                itemType="https://schema.org/CollegeOrUniversity"
                className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-full bg-white px-4 py-2 ring-1 ring-[rgba(15,29,74,0.1)]"
              >
                <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[#0b1d4a] text-[0.7rem] font-extrabold text-white">
                  N
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                    Alma Mater
                  </span>
                  <span itemProp="name" className="text-[0.92rem] font-extrabold text-[#0b1d4a]">
                    名古屋大学 工学部 電気電子情報工学科
                  </span>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {["応用情報技術者", "KDP 教材開発", "高校物理 添削"].map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-semibold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.1)]"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="relative">
              <div className="rounded-[24px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_30px_60px_-44px_rgba(15,29,74,0.4)] sm:p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#0b1d4a] to-[#0f5e5e] text-[1.4rem] font-extrabold text-white sm:h-20 sm:w-20 sm:text-[1.7rem]"
                  >
                    森
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
                      塾長
                    </p>
                    <p className="text-[1.15rem] font-extrabold leading-tight text-[#0b1d4a] sm:text-[1.3rem]">
                      {siteConfig.author}
                    </p>
                    <p className="mt-1 text-[0.78rem] font-semibold text-[#0f766e]">
                      教材開発者・添削指導者
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[14px] bg-[#eef6f6] p-3 ring-1 ring-[rgba(13,148,136,0.18)]">
                    <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#0f766e]">
                      Education
                    </dt>
                    <dd className="mt-1 text-[0.86rem] font-bold text-[#0b1d4a]">名古屋大学 工学部</dd>
                    <dd className="text-[0.74rem] text-[#64748b]">電気電子情報工学科</dd>
                  </div>
                  <div className="rounded-[14px] bg-[#eef5ff] p-3 ring-1 ring-[rgba(29,78,216,0.18)]">
                    <dt className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-[#1d4ed8]">
                      Focus
                    </dt>
                    <dd className="mt-1 text-[0.86rem] font-bold text-[#0b1d4a]">高校物理 × 添削</dd>
                    <dd className="text-[0.74rem] text-[#64748b]">教材開発・学習管理</dd>
                  </div>
                </dl>

                <a
                  href={kdpAmazonUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] text-[0.92rem] font-bold tracking-[0.02em] text-white transition hover:bg-[#0f5e5e]"
                >
                  KDP の物理教材を見る <span aria-hidden="true">↗</span>
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Mission
            </p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              「考える力」を、毎日の添削で育てる。
            </h2>
            <div className="mt-7 grid gap-5 text-[1rem] leading-[2.05] text-[#334155] sm:text-[1.04rem]">
              <p>
                高校物理や電磁気を中心に、<strong className="font-bold text-[#0b1d4a]">現象・図・言葉・式</strong> を結びつけ、
                公式暗記に依存しない <strong className="font-bold text-[#0b1d4a]">構造的な理解</strong> を支える教材を作ってきました。
                その教材で演習し、答案を毎日添削する——それがノビットスタディの形です。
              </p>
              <p>
                ノビットは<strong className="font-bold text-[#0b1d4a]">添削専門の学習管理塾</strong>です。
                面談や授業（ライブ指導）は行いません。代わりに、毎日自分のペースで教材を進め、
                提出した答案にプロの添削が入る。塾長が設計したカリキュラムと毎日のプロ添削で、
                <strong className="font-bold text-[#0b1d4a]">自立した学び</strong>を実現します。
              </p>
              <p>
                目指すのは、塾としては手の届きやすい料金で、毎日プロの添削が受けられる環境です。
                質問対応や面談は将来的に拡充する予定ですが、現在は「毎日演習・毎日添削」に集中しています。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
              Principles
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              ノビットが大切にしている 3 つの軸
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {principles.map((item) => (
              <li
                key={item.title}
                className="rounded-[22px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.35)]"
              >
                <p className="text-[1.6rem] font-extrabold leading-none text-[#0d9488]">
                  {item.label}
                </p>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Expertise
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              塾長が担う 4 つの領域
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {expertise.map((area) => (
              <li
                key={area.title}
                className="rounded-[20px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-32px_rgba(15,29,74,0.35)]"
              >
                <span className="inline-flex items-center rounded-full bg-[#0b1d4a] px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white">
                  {area.label}
                </span>
                <p className="mt-3 text-[1.05rem] font-extrabold leading-[1.45] text-[#0b1d4a]">
                  {area.title}
                </p>
                <p className="mt-2 text-[0.88rem] leading-[1.9] text-[#475569]">{area.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 pb-24 pt-4 sm:px-6 sm:pb-32">
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-[28px] p-10 ring-1 ring-[rgba(15,29,74,0.1)] sm:p-14"
            style={{
              background:
                "radial-gradient(circle at 95% 10%, rgba(249,115,22,0.25), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #0f5e5e 100%)",
              color: "#ffffff",
            }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#5eead4]">
                Get Started
              </p>
              <h2 className="mt-4 text-balance text-[1.6rem] font-extrabold leading-[1.4] sm:text-[2rem]">
                まずは無料体験で、添削を試してみてください。
              </h2>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f97316] px-7 text-[0.95rem] font-bold tracking-[0.02em] text-white transition hover:-translate-y-0.5 hover:bg-[#ea580c]"
                >
                  無料体験を申し込む <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-white hover:text-[#0b1d4a]"
                >
                  サービス内容を見る
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
