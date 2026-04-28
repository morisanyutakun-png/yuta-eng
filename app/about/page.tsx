import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createPersonJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title:
    "森 祐太｜理系教育クリエイター・Eddivom 開発者・Solvora 運営者のプロフィール",
  description:
    "森 祐太（Solvora 運営者・Eddivom 開発者）のプロフィール。名古屋大学 工学部 電気電子情報系で学び、応用情報技術者・日商簿記 2 級・FP 3 級を取得。物理教育・教材制作・LaTeX・AI 教材作成アプリ開発を軸に、高校物理を構造で理解する教材と AI×LaTeX による EdTech プロダクトを設計しています。",
  keywords: [
    "森 祐太",
    "森祐太",
    "Solvora 運営者",
    "Eddivom 開発者",
    "理系教育 クリエイター",
    "EdTech 設計者",
    "名古屋大学 電気電子情報",
    "応用情報技術者",
    "高校物理 教材制作",
    "LaTeX 教材作成",
  ],
  path: "/about",
});

const credentials = [
  {
    label: "国家資格",
    name: "応用情報技術者",
    body: "システム設計・ネットワーク・データベース・セキュリティを横断する情報処理の上位資格。Web アプリケーションと教育サービスを設計・運用する技術基盤として保有。",
    issuer: "情報処理推進機構（IPA）",
  },
  {
    label: "公的資格",
    name: "日商簿記検定 2 級",
    body: "教育サービスや SaaS を継続可能な事業として設計するための会計・事業理解の基礎として取得。商業簿記＋工業簿記まで対応。",
    issuer: "日本商工会議所",
  },
  {
    label: "国家資格",
    name: "FP 技能検定 3 級",
    body: "ライフプラン・税・保険・年金など、お金に関する基礎知識として位置づけ。",
    issuer: "金融財政事情研究会",
  },
];

const expertiseAreas = [
  {
    label: "Physics",
    title: "高校物理 / 電磁気学",
    body: "現象 → 図 → 言葉 → 式 を地続きにつなぐ、構造で理解する教材設計。公式暗記に依存しない学び方を作っています。",
  },
  {
    label: "EdTech",
    title: "教材制作・学習設計",
    body: "AI 下書き × LaTeX 整形 × Web 展開のワークフロー。教材を 1 回で終わらせず、毎年磨かれる資産として運用する設計を実装。",
  },
  {
    label: "Web Tech",
    title: "Web アプリケーション開発",
    body: "Next.js / TypeScript / Tailwind CSS をベースに、教材・学習アプリ・SaaS を一貫して設計・実装。",
  },
  {
    label: "Security",
    title: "暗号・セキュリティ",
    body: "名大での専攻領域。教育プロダクトでもデータ保護・認可設計・脆弱性対策を一次品質として扱います。",
  },
  {
    label: "AI × LaTeX",
    title: "AI 教材作成アプリ開発",
    body: "Eddivom の設計・実装。生成 AI と LaTeX 組版を組み合わせ、問題プリント・小テスト・解答 PDF の制作を支援。",
  },
  {
    label: "Business",
    title: "事業・会計設計",
    body: "日商簿記 2 級。教育プロダクトを継続できる事業として運営するための、収益・コスト・キャッシュフローの基礎理解。",
  },
];

const philosophy = [
  {
    label: "01",
    title: "理解の順序を設計する",
    text: "学習者がどこで止まりやすいかを先回りして、現象 → 図 → 式 → 演習の順番を丁寧に整える。公式の暗記より、変化を読む力を育てます。",
  },
  {
    label: "02",
    title: "教材を「使い捨て」にしない",
    text: "AI 下書き・LaTeX 整形・MDX 展開を組み合わせ、教材を 1 回で終わらせず、毎年磨かれる資産として運用できる仕組みを作ります。",
  },
  {
    label: "03",
    title: "学習アプリは動線で設計する",
    text: "機能の足し算ではなく、学習者の迷いを減らす導線を中心に設計する。読む・解く・戻る・続けるが分断しないアプリを目指します。",
  },
];

const story = [
  {
    year: "Background",
    title: "高校物理を「理解」で乗り越えた経験から",
    body: "公式暗記で物理に苦しんだ経験から、現象・図・式が地続きで見える教え方を試行錯誤してきました。",
  },
  {
    year: "University",
    title: "名古屋大学 工学部 電気電子情報系で学ぶ",
    body: "暗号・セキュリティ分野に関心を持ちながら、電気・電子・情報の三領域を横断する基礎を構築。教育と情報技術を結びつける視点を養いました。",
  },
  {
    year: "Approach",
    title: "AI と LaTeX で教材制作を再設計",
    body: "教材を毎回作り直す消耗をなくすため、生成 AI と LaTeX を組み合わせた制作ワークフローを構築。Eddivom の設計に直結。",
  },
  {
    year: "Now",
    title: "Solvora と Eddivom で動線を 1 本にまとめる",
    body: "親ブランド Solvora の下に、物理専門塾「物理の森」を直営事業として置き、教材作成 AI Eddivom や学習アプリも公式入口で接続。すべてを一本の動線で運営しています。",
  },
];

export default function AboutPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "About", path: "/about" },
  ]);
  // Person JSON-LD on the about page directly — Google's "About" / E-E-A-T
  // signals match the visible biography to the structured author entity.
  const personJsonLd = createPersonJsonLd();

  return (
    <>
      <JsonLd data={[breadcrumb, personJsonLd]} />

      {/* AUTHOR HERO — paper-warm aesthetic shared with /apps */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_55%,#f7f0de_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[8%] top-[-15%] h-[60%] w-[55%] opacity-90"
          style={{
            background:
              "radial-gradient(closest-side, rgba(155,188,255,0.55), rgba(59,124,217,0.18) 50%, transparent 78%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[15%] h-[70%] w-[60%] opacity-85"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,221,196,0.7), rgba(226,128,64,0.18) 50%, transparent 80%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(20,35,65,0.06) 1px, transparent 1px), linear-gradient(-45deg, rgba(20,35,65,0.04) 1px, transparent 1px)",
            backgroundSize: "26px 26px, 26px 26px",
          }}
        />

        <Container className="relative px-5 sm:px-6">
          <nav
            aria-label="パンくずリスト"
            className="pt-7 text-[0.78rem] text-[#3a4d6b] sm:pt-9"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#142341]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#142341]">About</li>
            </ol>
          </nav>

          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
            <div
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="url" content={`${siteConfig.url}/about`} />
              <meta itemProp="image" content={`${siteConfig.url}/brand/solvora-mark.svg`} />

              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a] sm:text-[0.78rem]">
                Author · 運営者プロフィール
              </p>
              <h1
                itemProp="name"
                className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#142341] sm:text-[2.55rem] sm:leading-[1.18] lg:text-[2.95rem]"
              >
                {siteConfig.author}
              </h1>
              <p
                itemProp="jobTitle"
                className="mt-3 text-[0.95rem] font-bold leading-[1.6] text-[#1e3a8a] sm:text-[1.05rem]"
              >
                理系教育クリエイター ／ EdTech 設計者 ／ Eddivom 開発者
              </p>

              <p
                itemProp="description"
                className="mt-6 text-pretty text-[0.98rem] leading-[2] text-[#1f3a6b] sm:text-[1.04rem]"
              >
                <strong className="font-bold text-[#142341]">{siteConfig.author}</strong> は、物理教育・教材制作・LaTeX・AI 教材作成アプリ開発を軸に活動する <strong className="font-bold text-[#142341]">理系教育クリエイター</strong> です。
                <strong className="font-bold text-[#142341]">名古屋大学 工学部 電気電子情報系</strong> で学び、暗号・セキュリティ分野に関心を持ちながら、教育と情報技術を横断する取り組みを行っています。
              </p>

              {/* Affiliation block (with microdata) */}
              <div
                itemProp="alumniOf"
                itemScope
                itemType="https://schema.org/CollegeOrUniversity"
                className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-full bg-white/85 px-4 py-2 ring-1 ring-[rgba(20,35,65,0.14)] backdrop-blur-sm"
              >
                <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[#142341] text-[0.7rem] font-extrabold text-white">
                  N
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#3a4d6b]">
                    Alma Mater
                  </span>
                  <span itemProp="name" className="text-[0.92rem] font-extrabold text-[#142341]">
                    名古屋大学 工学部 電気電子情報工学科
                  </span>
                </div>
              </div>

              {/* Cred badges quick-glance */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {credentials.map((c) => (
                  <li
                    key={c.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-[0.78rem] font-semibold text-[#142341] ring-1 ring-[rgba(20,35,65,0.14)] backdrop-blur-sm"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#e28040]" />
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Author portrait substitute — initials in a paper card with credentials */}
            <aside className="relative">
              <div className="rounded-[24px] bg-white/90 p-6 ring-1 ring-[rgba(20,35,65,0.1)] shadow-[0_30px_60px_-44px_rgba(20,35,65,0.4)] backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#142341] to-[#1e3a8a] text-[1.4rem] font-extrabold text-white shadow-[0_14px_30px_-14px_rgba(20,35,65,0.55)] sm:h-20 sm:w-20 sm:text-[1.7rem]"
                  >
                    森
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#3a4d6b]">
                      Author
                    </p>
                    <p className="text-[1.15rem] font-extrabold leading-tight text-[#142341] sm:text-[1.3rem]">
                      {siteConfig.author}
                    </p>
                    <p className="mt-1 text-[0.78rem] font-semibold text-[#1e3a8a]">
                      Solvora 運営者・Eddivom 開発者
                    </p>
                  </div>
                </div>

                {/* Mini-credential grid */}
                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[14px] bg-[#fbf5e6] p-3 ring-1 ring-[rgba(226,128,64,0.18)]">
                    <dt className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#a35a16]">
                      Education
                    </dt>
                    <dd className="mt-1 text-[0.86rem] font-bold text-[#142341]">
                      名古屋大学 工学部
                    </dd>
                    <dd className="text-[0.74rem] text-[#3a4d6b]">電気電子情報工学科</dd>
                  </div>
                  <div className="rounded-[14px] bg-[#eef4ff] p-3 ring-1 ring-[rgba(59,124,217,0.18)]">
                    <dt className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#1e3a8a]">
                      Focus
                    </dt>
                    <dd className="mt-1 text-[0.86rem] font-bold text-[#142341]">
                      物理教育 × EdTech
                    </dd>
                    <dd className="text-[0.74rem] text-[#3a4d6b]">暗号・セキュリティ</dd>
                  </div>
                </dl>

                {/* CTA to current product */}
                <Link
                  href="/apps"
                  className="mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-[#142341] text-[0.92rem] font-bold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                >
                  運営する 4 サービスを見る <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>

        {/* Decorative wave at the bottom */}
        <svg
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[12%] w-full opacity-50"
        >
          <defs>
            <linearGradient id="about-hero-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b7cd9" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b7cd9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e28040" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,110 C200,40 380,180 600,110 C820,40 1000,180 1200,110 C1380,50 1500,150 1600,110"
            stroke="url(#about-hero-wave)"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </section>

      {/* MISSION — long-form prose lifted from the bio, with strong markup */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Mission
            </p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2rem]">
              理系教育の<span className="text-[#1d4ed8]">学び方</span>と<span className="text-[#1d4ed8]">作り方</span>そのものを改善する。
            </h2>

            <div className="mt-7 grid gap-5 text-[1rem] leading-[2.05] text-[#1f3a6b] sm:text-[1.04rem]">
              <p>
                高校物理や電磁気学を中心に、<strong className="font-bold text-[#142341]">現象・図・言葉・式</strong> を結びつけ、公式暗記に依存しない <strong className="font-bold text-[#142341]">構造的な理解</strong> を支える教材制作を重視しています。
              </p>
              <p>
                情報技術の分野では、<strong className="font-bold text-[#142341]">応用情報技術者</strong> 資格を取得し、<strong className="font-bold text-[#142341]">システム設計・ネットワーク・データベース・セキュリティ</strong> など、Web アプリケーションや教育サービスの開発に必要な基礎を幅広く学んできました。さらに、<strong className="font-bold text-[#142341]">日商簿記 2 級</strong> を取得しており、教育サービスや SaaS を継続可能な事業として設計するための会計・事業理解も大切にしています。FP 3 級については、ライフプランやお金に関する基礎知識として位置づけています。
              </p>
              <p>
                現在は、AI と LaTeX を活用した教材作成アプリ <strong className="font-bold text-[#142341]">「Eddivom」</strong> を開発しています。Eddivom は、問題プリント・小テスト・解答解説・PDF 教材の作成を支援するアプリであり、先生・講師・学習者が教材制作にかける時間と負担を減らすことを目指しています。
              </p>
              <p>
                目指しているのは、<strong className="font-bold text-[#142341]">単に教材を作ることではなく、理系教育の学び方と作り方そのものを改善すること</strong> です。物理を構造で理解するための教材制作と、AI・LaTeX・Web 技術による EdTech 開発を通じて、学ぶ人と教える人の双方にとって使いやすく、信頼できる教育環境をつくっていきます。
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CREDENTIALS — formal certifications with issuer */}
      <section className="bg-[#fbf5e6]">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#a35a16]">
              Credentials
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2rem]">
              取得している資格
            </h2>
            <p className="mt-4 text-[0.92rem] leading-[1.95] text-[#3a4d6b]">
              情報技術・会計・ライフプランの 3 領域で、教育プロダクトを継続的に運営するための公式資格を保有しています。
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {credentials.map((c) => (
              <li
                key={c.name}
                className="rounded-[20px] bg-white p-5 ring-1 ring-[rgba(20,35,65,0.08)] shadow-[0_18px_40px_-32px_rgba(20,35,65,0.4)] sm:p-6"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef3c7] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#a35a16]">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#e28040]" />
                  {c.label}
                </span>
                <p className="mt-3 text-[1.08rem] font-extrabold leading-[1.4] text-[#142341]">
                  {c.name}
                </p>
                <p className="mt-2 text-[0.84rem] leading-[1.85] text-[#3a4d6b]">{c.body}</p>
                <p className="mt-3 border-t border-[rgba(20,35,65,0.08)] pt-2 text-[0.74rem] font-semibold text-[#1e3a8a]">
                  認定：{c.issuer}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* EXPERTISE — six areas with brief explainers */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Expertise
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2rem]">
              扱う 6 つの領域
            </h2>
            <p className="mt-4 text-[0.92rem] leading-[1.95] text-[#3a4d6b]">
              物理教育・EdTech 設計・Web 開発・セキュリティ・AI×LaTeX・事業理解の 6 領域を交差させて、教材と学習アプリを設計しています。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseAreas.map((area) => (
              <li
                key={area.title}
                className="rounded-[20px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(20,35,65,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-32px_rgba(20,35,65,0.4)] sm:p-6"
              >
                <span className="inline-flex items-center rounded-full bg-[#142341] px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white">
                  {area.label}
                </span>
                <p className="mt-3 text-[1.05rem] font-extrabold leading-[1.45] text-[#142341]">
                  {area.title}
                </p>
                <p className="mt-2 text-[0.86rem] leading-[1.9] text-[#3a4d6b]">{area.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Philosophy
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2rem]">
              教材制作で大切にしている 3 つの軸
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {philosophy.map((item) => (
              <li
                key={item.title}
                className="rounded-[22px] bg-white p-7 ring-1 ring-[rgba(20,35,65,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(20,35,65,0.4)]"
              >
                <p className="text-[1.6rem] font-extrabold leading-none text-[#1e3a8a]">
                  {item.label}
                </p>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#142341]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#3a4d6b]">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* STORY */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Timeline
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2rem]">
              これまでの歩み
            </h2>
          </div>
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4">
            {story.map((item, idx) => (
              <li
                key={item.title}
                className="grid grid-cols-[3rem_1fr] gap-5 rounded-[22px] bg-[#fbf5e6] p-6 ring-1 ring-[rgba(226,128,64,0.18)] sm:grid-cols-[3.4rem_1fr] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-[#142341] text-[1rem] font-extrabold text-white"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#a35a16]">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-[1.05rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#142341] sm:text-[1.15rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.95] text-[#3a4d6b]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* VISION CTA */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 pb-24 pt-4 sm:px-6 sm:pb-32">
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-[28px] p-10 ring-1 ring-[rgba(20,35,65,0.1)] sm:p-14"
            style={{
              background:
                "radial-gradient(circle at 95% 10%, rgba(226,128,64,0.22), transparent 50%), linear-gradient(135deg, #142341 0%, #1e3a8a 100%)",
              color: "#ffffff",
            }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[#bae6fd]">
                Vision
              </p>
              <h2 className="mt-4 text-balance text-[1.6rem] font-extrabold leading-[1.4] sm:text-[2rem]">
                学ぶ人と教える人の双方にとって、
                <br className="hidden sm:block" />
                信頼できる教育環境を作る。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[1.95] text-white/85">
                物理を構造で理解するための教材制作と、AI・LaTeX・Web 技術による EdTech 開発を通じて、ブログ・教材・アプリの境界をなくし、読む・解く・つくる・教える が地続きの学習体験を作り続けます。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/apps"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#142341] transition hover:-translate-y-0.5 hover:bg-[#fbf5e6]"
                >
                  運営サービスを見る <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-white hover:text-[#142341]"
                >
                  ブログを読む
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-[0.95rem] font-semibold text-[#bae6fd] transition hover:text-white"
                >
                  相談する <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
