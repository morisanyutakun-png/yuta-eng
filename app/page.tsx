import type { Metadata } from "next";
import Link from "next/link";

import { AppCard } from "@/components/app-card";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { HeroMotion } from "@/components/hero-motion";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { StaggerReveal } from "@/components/stagger-reveal";
import { apps } from "@/data/apps";
import { focusAreas } from "@/data/focus-areas";
import {
  designSystemNotes,
  homepageAnswers,
  visitorPaths,
} from "@/data/home";
import { seoClusters } from "@/data/seo";
import { siteConfig } from "@/data/site";
import { getLatestPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

const heroFocuses = [
  "高校物理の理解",
  "AIとLaTeXの教材制作",
  "学習支援アプリへの入口",
];

const heroStats = [
  {
    value: "Physics",
    label: "高校物理を現象・図・数式・演習でつなぐ",
  },
  {
    value: "AI",
    label: "生成AIとLaTeXで教材制作を整える",
  },
  {
    value: "Apps",
    label: "必要な学習支援アプリへ案内する",
  },
];

const studioTiles = [
  {
    label: "Step 01",
    title: "つまずきを言語化",
    detail: "力学・物理基礎の苦手を小さな問いに分ける",
  },
  {
    label: "Step 02",
    title: "図解と数式へ変換",
    detail: "現象、自由物体図、式、単位を同じ画面で見る",
  },
  {
    label: "Step 03",
    title: "AI教材で復習",
    detail: "問題案、解説案、LaTeX化まで育てる",
  },
];

const psychologyCards = [
  {
    title: "目的が見える",
    text: "高校物理、教材制作、学習アプリの入口を分け、今いる場所から選びやすくします。",
  },
  {
    title: "小さく進める",
    text: "読む、理解する、演習する、アプリへ進む流れを短い単位に分けます。",
  },
  {
    title: "戻れるから続く",
    text: "つまずいた前提知識へ戻れる導線を置き、学び直しを続けやすくします。",
  },
];

const learningFlow = [
  {
    label: "Physics",
    title: "高校物理の理解から始める",
    description:
      "力学や物理基礎で止まりやすいところを、現象、図、数式、演習の順にほどいていきます。",
  },
  {
    label: "AI Materials",
    title: "AI教材作成で学びを速く形にする",
    description:
      "生成AIを下書きや問題案に使い、LaTeXやWebで再利用しやすい教材へ整えます。",
  },
  {
    label: "EdTech Apps",
    title: "学習支援Webアプリへ接続する",
    description:
      "記事や教材で整理した内容を、必要なタイミングで Eddivom、IT Pass、Physics へつなげます。",
  },
];

const actionCards = [
  {
    title: "高校物理でつまずいている",
    text: "力学・物理基礎・問題演習の考え方を、短い記事から確認できます。",
    href: "/blog/physics-material-creation",
    cta: "物理の記事から読む",
  },
  {
    title: "教材作成をAIで効率化したい",
    text: "生成AI、LaTeX、Webを組み合わせた教材制作の流れを整理できます。",
    href: "/blog/latex-web-workflow",
    cta: "教材制作を読む",
  },
  {
    title: "学習支援アプリを見たい",
    text: "目的に合う外部アプリへ、公式リンクからそのまま移動できます。",
    href: "/apps",
    cta: "アプリを選ぶ",
  },
];

const homeApps = apps.map((app) => {
  if (app.name === "Eddivom") {
    return {
      ...app,
      description:
        "教育コンテンツや学習導線を整理し、必要なページへ進みやすくする学習支援アプリです。ここから公式アプリへ移動できます。",
      status: "外部アプリ",
    };
  }

  if (app.name === "IT Pass") {
    return {
      ...app,
      description:
        "ITの基礎学習や試験対策を続けるための学習アプリです。基礎を確認したいときの入口として案内します。",
      status: "外部アプリ",
    };
  }

  if (app.name === "Physics") {
    return {
      ...app,
      description:
        "物理の概念理解や演習への接続を助ける学習アプリです。記事で整理した内容を、手を動かす学びへつなげます。",
      status: "外部アプリ",
    };
  }

  return app;
});

const topicMapCopy: Record<
  string,
  {
    title: string;
    summary: string;
    themes: string[];
    paths: string[];
  }
> = {
  "高校物理 塾": {
    title: "高校物理を理解し直す",
    summary:
      "力学や物理基礎で止まったところを、概念、図、数式、演習のつながりから学び直します。",
    themes: ["概念理解", "図解", "問題演習", "物理基礎", "学び直し"],
    paths: [
      "力学の考え方を整理したい",
      "公式暗記から抜け出したい",
      "定期テスト前に物理基礎を復習したい",
      "物理をどこから戻ればよいか知りたい",
    ],
  },
  "教材作成AI 自動": {
    title: "AIで教材制作を整える",
    summary:
      "生成AIを下書きや問題案に使い、LaTeXやWebで更新しやすい教材へ仕上げます。",
    themes: ["生成AI", "教材制作", "LaTeX", "問題案", "Web展開"],
    paths: [
      "AIで授業プリントの下書きを作りたい",
      "問題集をLaTeXで管理したい",
      "教材制作の手戻りを減らしたい",
      "AI任せにしない編集手順を知りたい",
    ],
  },
  "GIGAスクール 教材作成": {
    title: "デジタル教材を学習導線につなぐ",
    summary:
      "GIGAスクール後の環境で、教材、演習、復習、アプリをどうつなぐかを整理します。",
    themes: ["GIGAスクール", "教育DX", "AIドリル", "個別最適な学び", "学習導線"],
    paths: [
      "端末前提の教材をどう設計するか知りたい",
      "AIドリルと教材の役割を分けたい",
      "学習支援Webアプリの考え方を知りたい",
      "教育ICTを授業や自学へつなげたい",
    ],
  },
  "学習支援Webアプリ": {
    title: "学習支援Webアプリを考える",
    summary:
      "アプリを機能一覧としてではなく、学ぶ順序、復習、記録を支える道具として設計します。",
    themes: ["教育ICT", "復習導線", "演習", "学習ログ", "Webアプリ"],
    paths: [
      "学習アプリに必要な入口を整理したい",
      "教材とWebアプリを連携したい",
      "復習しやすい画面構成を考えたい",
      "小さく始める教育アプリを作りたい",
    ],
  },
  "物理 教材制作": {
    title: "物理教材を作る",
    summary:
      "物理教材を、答えの説明だけでなく思考の順序が残るコンテンツとして組み立てます。",
    themes: ["物理教材", "力学", "図解", "解説", "演習設計"],
    paths: [
      "物理の解説をわかりやすくしたい",
      "図と数式を同じ流れで見せたい",
      "演習につながる教材を作りたい",
      "つまずきやすい前提を補いたい",
    ],
  },
  "LaTeX 教材作成": {
    title: "LaTeX教材を育てる",
    summary:
      "数式を含む教材や問題集を、印刷物にもWebにも展開しやすい形で管理します。",
    themes: ["LaTeX", "数式組版", "問題集", "MDX", "教材管理"],
    paths: [
      "LaTeX教材をWebにも使いたい",
      "問題集を再利用しやすくしたい",
      "数式教材のテンプレートを整えたい",
      "ブログと教材をつなげたい",
    ],
  },
  "EdTech 個人ブランドサイト": {
    title: "制作思想と実装をひとつにまとめる",
    summary:
      "教育、物理、教材制作、アプリ開発を横断する活動を、公式ハブとして見つけやすく整理します。",
    themes: ["個人ブランド", "教育ブログ", "アプリ紹介", "制作思想", "公式ハブ"],
    paths: [
      "森祐太の活動全体を知りたい",
      "教材制作とアプリ開発の考え方を読みたい",
      "ブログとアプリの入口をまとめて見たい",
      "相談前に専門領域を確認したい",
    ],
  },
};

const topicMapCards = seoClusters.map((cluster) => ({
  ...cluster,
  ...(topicMapCopy[cluster.primary] ?? {
    title: cluster.label,
    summary: cluster.intent,
    themes: cluster.supporting.slice(0, 5),
    paths: cluster.longTail,
  }),
}));

const homeFocusAreas = focusAreas.map((area) => {
  if (area.title === "Education / GIGA") {
    return {
      ...area,
      description:
        "GIGAスクールや教育DXの環境で、教材、演習、復習が自然につながる学びを設計します。",
    };
  }

  if (area.title === "Physics") {
    return {
      ...area,
      description:
        "高校物理を、公式暗記ではなく現象・図・数式・演習の関係から理解できるように整理します。",
    };
  }

  if (area.title === "LaTeX") {
    return {
      ...area,
      description:
        "数式教材や問題集を、きれいに組むだけでなく、再利用しやすい制作資産として整えます。",
    };
  }

  if (area.title === "AI Material Creation") {
    return {
      ...area,
      description:
        "生成AIを下書きや問題案に活かし、人が理解しやすい順序と説明密度へ編集します。",
    };
  }

  if (area.title === "EdTech / Web Apps") {
    return {
      ...area,
      description:
        "学習の入口、演習、復習、記録を支えるWebアプリを作り、教材と実践をつなげます。",
    };
  }

  return area;
});

export const metadata: Metadata = createPageMetadata({
  title: "高校物理の塾・教材作成AI・EdTech学習支援 | Yuta Eng",
  description:
    "高校物理の塾を探す人、教材作成AIを自動化したい人、GIGAスクールや教育DXに合う学習支援Webアプリを知りたい人のためのEdTech学習スタジオです。",
  keywords: [
    "高校物理 塾",
    "高校物理 オンライン塾",
    "物理基礎 定期テスト対策",
    "教材作成AI 自動",
    "AI教材作成",
    "生成AI 教材作成",
    "GIGAスクール 教材作成",
    "EdTech 学習支援",
    "教育DX 学習支援Webアプリ",
  ],
  path: "/",
});

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const homeJsonLd = [
    createHomePageJsonLd(),
    createEducationalServiceJsonLd(),
    createHomeFaqJsonLd(),
    createItemListJsonLd(
      "yuta-eng.com から移動できる学習支援アプリ",
      homeApps.map((app) => ({
        name: app.name,
        description: app.description,
        url: app.href,
      })),
    ),
    createItemListJsonLd(
      "yuta-eng.com の最新ブログ記事",
      latestPosts.map((post) => ({
        name: post.title,
        description: post.description,
        url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HeroMotion className="home-hero relative isolate overflow-hidden">
        <div className="ambient-grid absolute inset-0 -z-30" />
        <div className="home-aurora absolute inset-0 -z-20" />
        <div className="hero-glow absolute left-[8%] top-28 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.42),rgba(56,189,248,0.16)_44%,transparent_70%)] blur-3xl" />
        <div className="motion-depth-2 absolute right-[-12rem] top-10 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(253,186,116,0.38),rgba(250,204,21,0.12)_48%,transparent_70%)] blur-3xl" />

        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 lg:grid-cols-[0.94fr_1.06fr] lg:py-24">
          <div className="fade-up">
            <p className="liquid-glass inline-flex rounded-full px-4 py-2 text-sm font-semibold text-slate-700">
              森祐太の教育開発ハブ
            </p>
            <h1 className="text-balance mt-7 max-w-5xl font-serif text-5xl font-semibold leading-[1.03] tracking-[-0.095em] text-slate-950 sm:text-6xl lg:text-7xl">
              高校物理・教材制作・学習アプリをつなぐ、教育開発ハブ。
            </h1>
            <p className="text-pretty mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              Yuta Eng は、高校物理の理解を支える記事、AIとLaTeXを使った
              教材制作の知見、学習支援アプリへの入口をまとめた公式ハブです。
              学びたい人も、教材を作りたい人も、目的に合わせて次の一歩を選べます。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {heroFocuses.map((focus) => (
                <span className="keyword-pill" key={focus}>
                  {focus}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/blog/physics-material-creation">
                高校物理から読む
              </ButtonLink>
              <ButtonLink href="/blog/latex-web-workflow" variant="secondary">
                教材制作を読む
              </ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                学習アプリを選ぶ
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                相談する
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div className="liquid-glass rounded-[1.4rem] p-4" key={item.value}>
                  <p className="font-mono text-sm font-semibold text-sky-700">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 relative">
            <div className="motion-depth-1 relative">
              <div className="float-slow liquid-glass absolute -left-4 top-10 hidden rounded-[1.7rem] p-4 shadow-[0_25px_80px_-55px_rgba(14,165,233,0.75)] md:block">
                <p className="font-mono text-xs text-slate-500">start point</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">
                  高校物理の理解
                </p>
              </div>
              <div className="studio-device rounded-[3.2rem] p-3 shadow-[0_45px_140px_-78px_rgba(15,23,42,0.72)]">
                <div className="rounded-[2.75rem] bg-white p-4">
                  <div className="studio-screen relative overflow-hidden rounded-[2.35rem] p-6">
                    <div className="relative flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                          Learning Studio
                        </p>
                        <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                          Physics OS
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-800">
                        clear path
                      </span>
                    </div>

                    <div className="relative mt-8 grid gap-3">
                      {studioTiles.map((tile, index) => (
                        <div
                          className="studio-tile grid gap-4 rounded-[1.65rem] p-4 sm:grid-cols-[auto_1fr]"
                          key={tile.title}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-mono text-sm font-semibold text-white">
                            0{index + 1}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                              {tile.label}
                            </p>
                            <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-950">
                              {tile.title}
                            </p>
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                              {tile.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                      {homeApps.map((app) => (
                        <a
                          className="app-dock-card rounded-[1.35rem] p-4 transition hover:-translate-y-1"
                          href={app.href}
                          key={app.href}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <p className="font-semibold text-slate-950">{app.name}</p>
                          <p className="mt-3 text-xs leading-5 text-slate-500">
                            {app.category}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HeroMotion>

      <Container>
        <Section
          description="高校物理を学びたい人、教材を作りたい人、学習アプリを使いたい人が、自分に近い入口から進めるように整理しています。"
          eyebrow="Purpose Guide"
          title="目的に合わせて入口を選ぶ"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {visitorPaths.map((path) => (
              <Link
                className="intent-lens-card group relative flex min-h-80 flex-col overflow-hidden rounded-[2.6rem] p-6 transition hover:-translate-y-1"
                href={path.href}
                key={path.title}
              >
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {path.label}
                  </p>
                  <h2 className="text-balance mt-5 text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                    {path.title}
                  </h2>
                  <p className="mt-5 rounded-2xl bg-white/70 p-4 text-sm leading-7 text-slate-600 shadow-sm backdrop-blur">
                    {path.query}
                  </p>
                </div>
                <div className="relative mt-auto pt-12">
                  <p className="text-sm leading-7 text-slate-600">
                    {path.description}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-slate-950">
                    {path.cta} <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="読む、作る、使うの3つに分けることで、初めて来た人でも今すぐできる行動を選びやすくしています。"
          eyebrow="First Step"
          title="読む・作る・使う。最初の一歩を選ぶ"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-3">
            {actionCards.map((card) => (
              <Link
                className="action-card group rounded-[2.2rem] p-6 transition hover:-translate-y-1"
                href={card.href}
                key={card.title}
              >
                <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.text}</p>
                <p className="mt-7 text-sm font-semibold text-slate-950">
                  {card.cta} <span aria-hidden="true">→</span>
                </p>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="Eddivom、IT Pass、Physics への公式リンクをまとめています。外部アプリであることを明示しながら、用途が一目で分かる入口にしています。"
          eyebrow="Apps Hub"
          headerAction={
            <ButtonLink href="/apps" variant="secondary">
              アプリ一覧へ
            </ButtonLink>
          }
          title="学習支援アプリへ迷わず移動する"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {homeApps.map((app) => (
              <AppCard app={app} featured key={app.href} />
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="高校物理、AI教材制作、LaTeX、教育ICT、Webアプリを別々の話題にせず、必要な記事やサービスへたどれる地図としてまとめています。"
          eyebrow="Learning Map"
          title="学びと制作のテーマを地図のようにたどる"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topicMapCards.map((cluster) => (
              <Link
                className="seo-cluster-card group rounded-[2rem] p-6 transition hover:-translate-y-1"
                href={cluster.route}
                key={cluster.primary}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  {cluster.label}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {cluster.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {cluster.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cluster.themes.map((word) => (
                    <span className="keyword-pill compact" key={word}>
                      {word}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-sky-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    よくある入口
                  </p>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-500">
                    {cluster.paths.map((word) => (
                      <li key={word}>{word}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="見た目の装飾だけではなく、目的を選びやすくし、必要な前提へ戻れることを学びやすさの中心に置いています。"
          eyebrow="Learning Design"
          title="迷いにくく、戻りやすい学びの設計"
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="canva-board relative overflow-hidden rounded-[3rem] border border-white/80 p-6 shadow-[0_35px_130px_-90px_rgba(15,23,42,0.72)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {designSystemNotes.map((note, index) => (
                  <article
                    className="rounded-[2rem] border border-white/80 bg-white/80 p-5 backdrop-blur-xl"
                    key={note}
                  >
                    <p className="font-mono text-xs text-sky-700">
                      design / 0{index + 1}
                    </p>
                    <p className="mt-5 text-base font-semibold leading-7 tracking-[-0.03em] text-slate-950">
                      {note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {psychologyCards.map((card, index) => (
                <article
                  className="psychology-card rounded-[2rem] p-6"
                  key={card.title}
                >
                  <p className="font-mono text-xs font-semibold text-sky-700">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          description="記事で考え方を読み、教材制作で形にし、必要に応じてアプリへ進む。サイト全体をその一本の流れとして見せています。"
          eyebrow="Learning Flow"
          title="記事から教材、アプリまでを一本の流れにする"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-950 p-7 text-white shadow-[0_30px_110px_-80px_rgba(15,23,42,0.95)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                  Learning Hub
                </p>
                <h2 className="text-balance mt-5 font-serif text-4xl font-semibold tracking-[-0.07em]">
                  読むほど、次に試す場所が見えてくる。
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  ホームページを固定の名刺ではなく、記事、教材、アプリが
                  自然につながる学習ハブとして設計しています。
                </p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {["Blog", "AI", "Apps"].map((item) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 text-center text-xs font-semibold text-slate-200"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <StaggerReveal className="grid gap-4" step={120}>
              {learningFlow.map((item, index) => (
                <article
                  className="motion-step-card relative overflow-hidden rounded-[2.2rem] border border-slate-200 p-6 shadow-[0_22px_80px_-62px_rgba(15,23,42,0.75)] transition hover:-translate-y-1 hover:border-sky-200"
                  key={item.title}
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-sm font-semibold text-sky-700">
                        0{index + 1} / {item.label}
                      </p>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                        {item.title}
                      </h2>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                      step
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Section>

        <Section
          description="教育、物理、LaTeX、AI教材制作、EdTech/Webアプリを横断し、学ぶ人と作る人の両方を支える領域として整理しています。"
          eyebrow="Focus Areas"
          title="取り組んでいる領域"
        >
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {homeFocusAreas.map((area, index) => (
              <article
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white"
                key={area.title}
              >
                <p className="font-mono text-xs text-sky-700 group-hover:text-sky-200">
                  0{index + 1}
                </p>
                <h2 className="mt-5 text-lg font-semibold tracking-[-0.04em]">
                  {area.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition group-hover:text-slate-300">
                  {area.description}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="初めて来た人が確認したいことを短くまとめました。詳しく知りたい場合は、関連する記事やアプリ一覧へ進めます。"
          eyebrow="FAQ"
          title="よくある疑問に短く答える"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-2">
            {homepageAnswers.map((item) => (
              <article
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_80px_-65px_rgba(15,23,42,0.6)]"
                key={item.question}
              >
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {item.question}
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="高校物理、教材制作、教育ICTの考え方を、実際に読んで使える形で整理しています。"
          eyebrow="Latest Articles"
          headerAction={
            <ButtonLink href="/blog" variant="secondary">
              Blog一覧へ
            </ButtonLink>
          }
          title="最近の記事から学ぶ"
        >
          <StaggerReveal className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </StaggerReveal>
        </Section>

        <Section className="pb-24">
          <div className="final-cta overflow-hidden rounded-[2.9rem] p-1 shadow-[0_30px_110px_-80px_rgba(15,23,42,0.75)]">
            <div className="grid gap-0 rounded-[2.65rem] bg-white/[0.86] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-[2.65rem] bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.42),transparent_35%),linear-gradient(145deg,#0f172a,#0f766e)] p-8 text-white sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">
                  Start Here
                </p>
                <h2 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-[-0.06em]">
                  高校物理、教材制作、学習アプリをひとつの流れへ。
                </h2>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-pretty text-base leading-8 text-slate-600">
                  森祐太の Yuta Eng は、物理を学ぶ人、教材を作る人、
                  学習アプリを探す人が同じ文脈で次へ進める場所です。
                  記事で考え方を読み、教材制作で形にし、必要なアプリへつなげる。
                  その流れを、落ち着いて選べる公式ハブとして育てています。
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/about">制作思想を読む</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    相談する
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
