import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import eddivomShowcase from "@/assets/home/eddivom-showcase.webp";
import learningHubVisual from "@/assets/home/learning-hub-visual.webp";
import { AppCard } from "@/components/app-card";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { HeroMotion } from "@/components/hero-motion";
import {
  FocusAreaGlyph,
  HeroMeshOverlay,
  IntentVisual,
  LearningFlowDiagram,
} from "@/components/home-visuals";
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

const appSpotlightPoints = [
  {
    label: "Official",
    text: "外部アプリであることを明示しながら、役割がすぐ伝わる見せ方にする",
  },
  {
    label: "Mobile",
    text: "スマホでも画像で雰囲気をつかんでから、迷わずアプリ一覧へ進める",
  },
  {
    label: "Flow",
    text: "記事で読んだ内容から、そのまま実際の学習アプリへ移動しやすくする",
  },
];

const intentVisualVariants = ["physics", "materials", "apps"] as const;

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
        <div className="hero-glow absolute left-[8%] top-20 -z-10 hidden h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.42),rgba(56,189,248,0.16)_44%,transparent_70%)] blur-3xl sm:top-28 sm:block sm:h-[28rem] sm:w-[28rem]" />
        <div className="motion-depth-2 absolute right-[-12rem] top-10 -z-10 hidden h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(253,186,116,0.38),rgba(250,204,21,0.12)_48%,transparent_70%)] blur-3xl lg:block" />

        <Container className="grid min-h-[calc(100vh-3.75rem)] items-center gap-10 py-10 sm:min-h-[calc(100vh-4rem)] sm:gap-14 sm:py-16 lg:grid-cols-[0.94fr_1.06fr] lg:py-24">
          <div className="fade-up">
            <p className="liquid-glass inline-flex rounded-full px-4 py-2 text-sm font-semibold text-slate-700">
              森祐太の教育開発ハブ
            </p>
            <h1 className="text-balance mt-7 max-w-5xl font-serif text-[2.3rem] font-semibold leading-[1.06] tracking-[-0.085em] text-slate-950 sm:text-5xl sm:leading-[1.03] lg:text-7xl">
              高校物理・教材制作・学習アプリをつなぐ、教育開発ハブ。
            </h1>
            <p className="text-pretty mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:mt-7 sm:text-lg sm:leading-9">
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
            <div className="mt-8 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href="/blog/physics-material-creation">
                高校物理から読む
              </ButtonLink>
              <ButtonLink
                className="w-full sm:w-auto"
                href="/blog/latex-web-workflow"
                variant="secondary"
              >
                教材制作を読む
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/apps" variant="secondary">
                学習アプリを選ぶ
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/contact" variant="ghost">
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

          <div className="order-first fade-up fade-up-delay-2 relative mx-auto w-full max-w-[42rem] lg:order-none lg:max-w-none">
            <div className="motion-depth-1 relative">
              <div className="hero-visual-orb absolute inset-x-[12%] top-[8%] -z-10 h-[62%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28),rgba(125,211,252,0.14)_44%,transparent_72%)] blur-3xl" />
              <div className="hero-visual-orb hero-visual-orb-warm absolute bottom-[3%] right-[4%] -z-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(253,186,116,0.26),rgba(251,191,36,0.14)_48%,transparent_74%)] blur-3xl sm:h-52 sm:w-52" />

              <div className="hero-image-frame relative overflow-hidden rounded-[2rem] p-2.5 sm:rounded-[2.8rem] sm:p-3">
                <div className="hero-image-mask relative aspect-[5/6] overflow-hidden rounded-[1.55rem] sm:aspect-[4/3] sm:rounded-[2.15rem] lg:aspect-[11/10]">
                  <Image
                    alt="高校物理、教材制作、学習アプリが一つのハブでつながる学習ビジュアル"
                    className="h-full w-full object-cover object-center"
                    placeholder="blur"
                    priority
                    quality={82}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 48vw"
                    src={learningHubVisual}
                  />
                  <HeroMeshOverlay />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.18)_100%)]" />
                </div>

                <div className="hero-floating-card hero-floating-card-top hidden sm:block">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Physics
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                    図・数式・演習を、ひとつの流れで理解する
                  </p>
                </div>

                <div className="hero-floating-card hero-floating-card-bottom">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-amber-600">
                    Materials
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                    AI・LaTeX・Webをつないで、教材を育てる
                  </p>
                </div>

                <div className="hero-image-caption absolute inset-x-3 bottom-3 rounded-[1.4rem] px-4 py-3 sm:inset-x-auto sm:left-4 sm:bottom-4 sm:max-w-[15rem] sm:rounded-[1.5rem] sm:px-4 sm:py-3.5">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Learning Hub
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-950">
                    記事、教材、アプリがひとつの画面でつながる
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {["Blog", "Materials", "Apps"].map((item) => (
                  <div
                    className="hero-mini-dock rounded-[1.1rem] px-3 py-3 text-center text-xs font-semibold text-slate-700 sm:rounded-[1.4rem] sm:px-4"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
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
          <StaggerReveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visitorPaths.map((path, index) => (
              <Link
                className="intent-lens-card group relative flex min-h-[18rem] flex-col overflow-hidden rounded-[2rem] p-5 transition hover:-translate-y-1 sm:min-h-80 sm:rounded-[2.6rem] sm:p-6"
                href={path.href}
                key={path.title}
              >
                <div className="intent-visual-shell mb-5 overflow-hidden rounded-[1.45rem] sm:mb-6 sm:rounded-[1.8rem]">
                  <IntentVisual variant={intentVisualVariants[index]} />
                </div>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {path.label}
                  </p>
                  <h2 className="text-balance mt-4 text-2xl font-semibold tracking-[-0.06em] text-slate-950 sm:mt-5 sm:text-3xl">
                    {path.title}
                  </h2>
                  <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm leading-7 text-slate-600 shadow-sm backdrop-blur sm:mt-5">
                    {path.query}
                  </p>
                </div>
                <div className="relative mt-auto pt-9 sm:pt-12">
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
                className="action-card group rounded-[1.85rem] p-5 transition hover:-translate-y-1 sm:rounded-[2.2rem] sm:p-6"
                href={card.href}
                key={card.title}
              >
                <h2 className="text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-2xl">
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
            <ButtonLink className="w-full sm:w-auto" href="/apps" variant="secondary">
              アプリ一覧へ
            </ButtonLink>
          }
          title="学習支援アプリへ迷わず移動する"
        >
          <div className="showcase-spotlight mb-6 overflow-hidden rounded-[2rem] p-3 sm:mb-8 sm:rounded-[2.75rem] sm:p-4">
            <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[1.65rem] sm:rounded-[2.1rem]">
                <Image
                  alt="Eddivom の世界観を示すアプリビジュアル"
                  className="h-full w-full object-cover object-center"
                  placeholder="blur"
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  src={eddivomShowcase}
                />
              </div>

              <div className="px-2 pb-2 sm:px-3 lg:pr-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                  Visual Spotlight
                </p>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-3xl">
                  アプリ導線も、ブランドの一部として見せる
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Eddivom を含む学習支援アプリ群は、単なる外部リンク集ではなく、
                  ブログや教材制作の流れから自然につながる実践の入口として見せています。
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {appSpotlightPoints.map((point) => (
                    <article className="showcase-point rounded-[1.35rem] p-4" key={point.label}>
                      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-sky-700">
                        {point.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                        {point.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                className="seo-cluster-card group rounded-[1.8rem] p-5 transition hover:-translate-y-1 sm:rounded-[2rem] sm:p-6"
                href={cluster.route}
                key={cluster.primary}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  {cluster.label}
                </p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-2xl">
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
            <div className="canva-board relative overflow-hidden rounded-[2.2rem] border border-white/80 p-4 shadow-[0_35px_130px_-90px_rgba(15,23,42,0.72)] sm:rounded-[3rem] sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {designSystemNotes.map((note, index) => (
                  <article
                    className="rounded-[1.55rem] border border-white/80 bg-white/80 p-4 backdrop-blur-xl sm:rounded-[2rem] sm:p-5"
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
                  className="psychology-card rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-6"
                  key={card.title}
                >
                  <p className="font-mono text-xs font-semibold text-sky-700">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-2xl">
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
              <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 p-6 text-white shadow-[0_30px_110px_-80px_rgba(15,23,42,0.95)] sm:rounded-[2.5rem] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                  Learning Hub
                </p>
                <h2 className="text-balance mt-5 font-serif text-3xl font-semibold tracking-[-0.07em] sm:text-4xl">
                  読むほど、次に試す場所が見えてくる。
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  ホームページを固定の名刺ではなく、記事、教材、アプリが
                  自然につながる学習ハブとして設計しています。
                </p>
                <LearningFlowDiagram className="mt-7" />
                <div className="mt-7 grid grid-cols-3 gap-2">
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
                  className="motion-step-card relative overflow-hidden rounded-[1.85rem] border border-slate-200 p-5 shadow-[0_22px_80px_-62px_rgba(15,23,42,0.75)] transition hover:-translate-y-1 hover:border-sky-200 sm:rounded-[2.2rem] sm:p-6"
                  key={item.title}
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-sm font-semibold text-sky-700">
                        0{index + 1} / {item.label}
                      </p>
                      <h2 className="mt-4 text-xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-2xl">
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
                <div className="focus-glyph-shell mb-4">
                  <FocusAreaGlyph title={area.title} />
                </div>
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
            <ButtonLink className="w-full sm:w-auto" href="/blog" variant="secondary">
              Blog一覧へ
            </ButtonLink>
          }
          title="最近の記事から学ぶ"
        >
          <StaggerReveal className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </StaggerReveal>
        </Section>

        <Section className="pb-24">
          <div className="final-cta overflow-hidden rounded-[2.2rem] p-1 shadow-[0_30px_110px_-80px_rgba(15,23,42,0.75)] sm:rounded-[2.9rem]">
            <div className="grid gap-0 rounded-[2rem] bg-white/[0.86] backdrop-blur-xl sm:rounded-[2.65rem] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.42),transparent_35%),linear-gradient(145deg,#0f172a,#0f766e)] p-6 text-white sm:rounded-[2.65rem] sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">
                  Start Here
                </p>
                <h2 className="text-balance mt-4 font-serif text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                  高校物理、教材制作、学習アプリをひとつの流れへ。
                </h2>
              </div>
              <div className="p-6 sm:p-10">
                <p className="text-pretty text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  森祐太の Yuta Eng は、物理を学ぶ人、教材を作る人、
                  学習アプリを探す人が同じ文脈で次へ進める場所です。
                  記事で考え方を読み、教材制作で形にし、必要なアプリへつなげる。
                  その流れを、落ち着いて選べる公式ハブとして育てています。
                </p>
                <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
                  <ButtonLink className="w-full sm:w-auto" href="/about">
                    制作思想を読む
                  </ButtonLink>
                  <ButtonLink className="w-full sm:w-auto" href="/contact" variant="secondary">
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
