import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { apps } from "@/data/apps";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createEducationalOrganizationJsonLd,
  createFaqJsonLd,
  createItemListJsonLd,
  createSoftwareAppJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title:
    "物理専門塾オンライン・高校物理アプリ・LaTeX教材作成・ITパスポートアプリ - Solvora",
  description:
    "Solvora が運営する物理専門塾「物理の森」、高校物理アプリ「Physics」、LaTeX教材作成アプリ「Eddivom」、ITパスポート対策アプリ「IT Pass」を1ページで比較。受験生・教員・社会人それぞれに最適な公式入口へ直接アクセスできます。",
  keywords: [
    "物理専門塾 オンライン",
    "高校物理 アプリ",
    "LaTeX 教材作成",
    "ITパスポート アプリ",
    "高校物理 オンライン塾",
    "教材作成 AI",
    "物理 個別指導 オンライン",
  ],
  path: "/apps",
});

/**
 * Per-service visual identity — picked to mirror each product's UI vibe so
 * the cards on `/apps` feel like extensions of the actual apps:
 *  - butsuri-no-mori: paper-warm ink-navy palette of physics.yuta-eng.com
 *  - eddivom        : violet → magenta → cyan (the LaTeX×AI OG palette)
 *  - physics        : ocean blue (matches the high-school physics app)
 *  - it-pass        : forest teal (study/productivity feel)
 *
 * `bg` is the gradient backdrop, `ring` is the ring color around the card,
 * `chip` is the eyebrow text/border color, `glow*` are the radial-gradient
 * orbs that sit behind the visual to add depth without raster images.
 */
type Visual = {
  bg: string;
  ring: string;
  chip: string;
  glow1: string;
  glow2: string;
  ink: string;
  inkSoft: string;
  artwork: ReactNode;
};

function MoriArtwork() {
  // 物理の森: trees / wave / dotted ground — warm paper feel of the app's hero.
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="物理の森のビジュアル：紙のような暖色背景に三本の杉と物理の波形"
    >
      <defs>
        <linearGradient id="mori-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b7cd9" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b7cd9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e28040" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mori-tree" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f3a6b" />
          <stop offset="100%" stopColor="#0e1e3d" />
        </linearGradient>
      </defs>
      {/* Cream paper backdrop */}
      <rect width="480" height="320" fill="#fbf5e6" rx="12" />
      <rect
        width="480"
        height="320"
        rx="12"
        fill="url(#mori-grain)"
        opacity="0.04"
      />
      <pattern
        id="mori-grain"
        width="22"
        height="22"
        patternUnits="userSpaceOnUse"
      >
        <path d="M0 22 L22 0" stroke="#142341" strokeWidth="0.6" />
      </pattern>
      {/* Sun-like orange orb top-right */}
      <circle cx="396" cy="60" r="46" fill="#f5d68a" opacity="0.7" />
      <circle cx="396" cy="60" r="22" fill="#e28040" opacity="0.85" />
      {/* Sky-blue orb top-left */}
      <circle cx="60" cy="48" r="38" fill="#9bbcff" opacity="0.6" />
      {/* Three stylised cedars (the 森 motif) */}
      {[
        { x: 110, h: 1 },
        { x: 240, h: 1.18 },
        { x: 360, h: 0.92 },
      ].map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${110}) scale(1 ${t.h})`}>
          <path d="M0 0 L 26 60 L -26 60 Z" fill="url(#mori-tree)" />
          <path d="M0 30 L 32 100 L -32 100 Z" fill="url(#mori-tree)" />
          <path d="M0 60 L 38 140 L -38 140 Z" fill="url(#mori-tree)" />
          <rect x="-3" y="138" width="6" height="20" fill="#3a2c0a" />
        </g>
      ))}
      {/* Physics wave across the bottom */}
      <path
        d="M0,278 C80,250 160,310 240,278 C320,246 400,310 480,278"
        stroke="url(#mori-wave)"
        strokeWidth="2.4"
        fill="none"
      />
      <path
        d="M0,290 C80,266 160,318 240,290 C320,262 400,318 480,290"
        stroke="url(#mori-wave)"
        strokeWidth="1.4"
        fill="none"
        opacity="0.6"
      />
      {/* Dotted ground texture */}
      {Array.from({ length: 18 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + i * 26}
          cy={302}
          r={1.3}
          fill="#142341"
          opacity="0.45"
        />
      ))}
    </svg>
  );
}

function EddivomArtwork() {
  // AI core + LaTeX braces + page lines — matches the article OG style.
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="Eddivom のビジュアル：AI コアから LaTeX 整形と PDF が放射するレイアウト"
    >
      <defs>
        <linearGradient id="ed-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#5b21b6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#ed-bg)" rx="12" />
      <circle cx="120" cy="80" r="80" fill="#c026d3" opacity="0.32" />
      <circle cx="380" cy="240" r="100" fill="#22d3ee" opacity="0.25" />
      {/* LaTeX braces */}
      <path
        d="M 130 120 Q 100 120 100 160 Q 100 175 86 180 Q 100 185 100 200 Q 100 240 130 240"
        stroke="#ede9fe"
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 350 120 Q 380 120 380 160 Q 380 175 394 180 Q 380 185 380 200 Q 380 240 350 240"
        stroke="#ede9fe"
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* AI core */}
      <circle cx="240" cy="180" r="46" fill="#ede9fe" opacity="0.95" />
      <circle cx="240" cy="180" r="46" fill="none" stroke="#c4b5fd" strokeWidth="2" />
      <path
        d="M 240 156 l 7 16 l 16 7 l -16 7 l -7 16 l -7 -16 l -16 -7 l 16 -7 z"
        fill="#5b21b6"
      />
      {/* "PDF" page (right) */}
      <rect
        x="170"
        y="76"
        width="56"
        height="32"
        rx="4"
        stroke="#22d3ee"
        strokeWidth="2"
        fill="rgba(255,255,255,0.08)"
      />
      <line x1="180" y1="86" x2="216" y2="86" stroke="#22d3ee" strokeWidth="1.6" />
      <line x1="180" y1="94" x2="208" y2="94" stroke="#22d3ee" strokeWidth="1.6" opacity="0.7" />
      <line x1="180" y1="102" x2="200" y2="102" stroke="#22d3ee" strokeWidth="1.6" opacity="0.5" />
      {/* Sparkles */}
      <path d="M 410 60 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill="#ede9fe" opacity="0.85" />
      <path d="M 50 250 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z" fill="#22d3ee" opacity="0.7" />
    </svg>
  );
}

function PhysicsArtwork() {
  // Phone shape with kinematic v-t graph — high-school physics app feel.
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="Physics アプリのビジュアル：スマホ画面に v-t グラフが表示されている図"
    >
      <defs>
        <linearGradient id="phys-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#phys-bg)" rx="12" />
      <circle cx="380" cy="60" r="60" fill="#bae6fd" opacity="0.3" />
      <circle cx="80" cy="270" r="80" fill="#0ea5e9" opacity="0.3" />
      {/* Phone */}
      <rect
        x="170"
        y="40"
        width="140"
        height="240"
        rx="22"
        fill="#0b1d4a"
        stroke="#bae6fd"
        strokeWidth="2"
      />
      <rect
        x="178"
        y="56"
        width="124"
        height="208"
        rx="6"
        fill="#fbf9f4"
      />
      {/* Status bar */}
      <rect x="186" y="64" width="20" height="3" rx="1.5" fill="#0b1d4a" opacity="0.4" />
      <circle cx="290" cy="65.5" r="2" fill="#0b1d4a" opacity="0.4" />
      {/* v-t graph */}
      <line x1="186" y1="244" x2="296" y2="244" stroke="#0b1d4a" strokeWidth="1.4" />
      <line x1="186" y1="244" x2="186" y2="84" stroke="#0b1d4a" strokeWidth="1.4" />
      <path
        d="M 186 232 L 296 110"
        stroke="#0284c7"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M 186 232 L 296 110 L 296 244 L 186 244 Z"
        fill="#0284c7"
        fillOpacity="0.18"
      />
      <circle cx="296" cy="110" r="4" fill="#f59e0b" />
      <circle cx="186" cy="232" r="3" fill="#0b1d4a" />
      {/* Title / subtitle on screen */}
      <text x="194" y="100" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#0b1d4a">
        v-t グラフ
      </text>
      <text x="194" y="262" fontFamily="system-ui" fontSize="7" fontWeight="600" fill="#475569">
        概念 → 例題 → 演習
      </text>
      {/* Floating equations */}
      <g transform="translate(60 130)">
        <rect width="80" height="32" rx="6" fill="rgba(255,255,255,0.94)" />
        <text x="40" y="20" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#0b1d4a" textAnchor="middle">
          v = v₀ + at
        </text>
      </g>
      <g transform="translate(340 200)">
        <rect width="86" height="32" rx="6" fill="rgba(255,255,255,0.94)" />
        <text x="43" y="20" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#0b1d4a" textAnchor="middle">
          F = mv²/r
        </text>
      </g>
    </svg>
  );
}

function ItPassArtwork() {
  // Checkmark progress bars — IT pass exam prep feel.
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="IT Pass のビジュアル：チェックリストと棒グラフでスキマ時間学習を表現"
    >
      <defs>
        <linearGradient id="it-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#022c22" />
          <stop offset="55%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#it-bg)" rx="12" />
      <circle cx="80" cy="80" r="60" fill="#5eead4" opacity="0.35" />
      <circle cx="400" cy="260" r="80" fill="#84cc16" opacity="0.28" />
      {/* Checklist card */}
      <rect x="70" y="80" width="190" height="170" rx="14" fill="rgba(255,255,255,0.96)" />
      <text x="86" y="106" fontFamily="system-ui" fontSize="11" fontWeight="800" fill="#022c22">
        ITパスポート 過去問
      </text>
      {[
        { y: 130, label: "ストラテジ系", pct: 0.85 },
        { y: 162, label: "マネジメント系", pct: 0.6 },
        { y: 194, label: "テクノロジ系", pct: 0.42 },
      ].map((row, i) => (
        <g key={i}>
          <text x="86" y={row.y} fontFamily="system-ui" fontSize="9" fontWeight="600" fill="#475569">
            {row.label}
          </text>
          <rect x="86" y={row.y + 6} width="160" height="8" rx="4" fill="#d1fae5" />
          <rect
            x="86"
            y={row.y + 6}
            width={160 * row.pct}
            height="8"
            rx="4"
            fill="#10b981"
          />
        </g>
      ))}
      <g transform="translate(86 222)">
        <rect width="20" height="20" rx="5" fill="#10b981" />
        <path d="M 5 10 L 9 14 L 16 6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="14" fontFamily="system-ui" fontSize="9" fontWeight="700" fill="#022c22">
          毎日 5〜10 分
        </text>
      </g>
      {/* Floating bar chart */}
      <g transform="translate(290 110)">
        <rect width="120" height="120" rx="14" fill="rgba(255,255,255,0.9)" />
        <text x="60" y="22" fontFamily="system-ui" fontSize="9" fontWeight="800" fill="#022c22" textAnchor="middle">
          達成度
        </text>
        {[40, 64, 84, 100].map((h, i) => (
          <rect
            key={i}
            x={16 + i * 24}
            y={108 - h}
            width="14"
            height={h}
            rx="3"
            fill="#10b981"
            opacity={0.5 + i * 0.15}
          />
        ))}
        <line x1="14" y1="108" x2="106" y2="108" stroke="#022c22" strokeWidth="1" opacity="0.5" />
      </g>
      {/* Sparkle */}
      <path d="M 430 70 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill="#fde047" opacity="0.85" />
    </svg>
  );
}

const visualBySlug: Record<string, Visual> = {
  "butsuri-no-mori": {
    bg: "bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_55%,#f7f0de_100%)]",
    ring: "ring-[rgba(20,35,65,0.1)]",
    chip: "text-[#142341] border-[rgba(20,35,65,0.2)]",
    glow1: "rgba(155,188,255,0.55)",
    glow2: "rgba(226,128,64,0.35)",
    ink: "text-[#142341]",
    inkSoft: "text-[#3a4d6b]",
    artwork: <MoriArtwork />,
  },
  eddivom: {
    bg: "bg-[linear-gradient(135deg,#1e1b4b_0%,#4c1d95_45%,#0b1d4a_100%)]",
    ring: "ring-[rgba(196,181,253,0.25)]",
    chip: "text-[#ede9fe] border-[rgba(196,181,253,0.4)]",
    glow1: "rgba(192,38,211,0.4)",
    glow2: "rgba(34,211,238,0.35)",
    ink: "text-white",
    inkSoft: "text-[#e9d5ff]",
    artwork: <EddivomArtwork />,
  },
  physics: {
    bg: "bg-[linear-gradient(135deg,#0b1d4a_0%,#0c4a6e_55%,#082f49_100%)]",
    ring: "ring-[rgba(186,230,253,0.18)]",
    chip: "text-[#bae6fd] border-[rgba(186,230,253,0.4)]",
    glow1: "rgba(56,189,248,0.45)",
    glow2: "rgba(125,211,252,0.3)",
    ink: "text-white",
    inkSoft: "text-[#bae6fd]",
    artwork: <PhysicsArtwork />,
  },
  "it-pass": {
    bg: "bg-[linear-gradient(135deg,#022c22_0%,#064e3b_55%,#022c22_100%)]",
    ring: "ring-[rgba(94,234,212,0.22)]",
    chip: "text-[#5eead4] border-[rgba(94,234,212,0.4)]",
    glow1: "rgba(94,234,212,0.4)",
    glow2: "rgba(132,204,22,0.32)",
    ink: "text-white",
    inkSoft: "text-[#a7f3d0]",
    artwork: <ItPassArtwork />,
  },
};

export default function AppsPage() {
  const featured = apps.find((a) => a.featured);
  const others = apps.filter((a) => !a.featured);
  const allFaq = apps.flatMap((a) =>
    a.faq.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  );
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "サービス一覧", path: "/apps" },
  ]);
  const itemList = createItemListJsonLd(
    "Solvora の公式サービス一覧",
    apps.map((a) => ({
      name: `${a.name}（${a.primaryKeyword}）`,
      description: a.comparison,
      url: a.href,
    })),
  );
  const serviceJsonLd = apps.map((a) => {
    const input = {
      name: a.name,
      alternateName: a.alternateName,
      description: a.description,
      url: a.href,
      audience: a.schemaAudience,
    };
    return a.schemaType === "EducationalOrganization"
      ? createEducationalOrganizationJsonLd(input)
      : createSoftwareAppJsonLd(input);
  });
  const faqJsonLd = createFaqJsonLd(allFaq);

  return (
    <>
      <JsonLd data={[breadcrumb, itemList, ...serviceJsonLd, faqJsonLd]} />

      {/* HERO — paper-warm aurora matching physics.yuta-eng.com */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_55%,#f7f0de_100%)]">
        {/* Layered radial orbs (zero requests, GPU-cheap) */}
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
          className="pointer-events-none absolute -bottom-[15%] left-1/2 h-[55%] w-[55%] -translate-x-1/2 opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, rgba(243,228,182,0.5), rgba(202,163,75,0.10) 55%, transparent 80%)",
          }}
        />
        {/* Subtle paper grain (CSS only, ~70 bytes inline) */}
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
              <li className="text-[#142341]">サービス一覧</li>
            </ol>
          </nav>

          <div className="py-10 sm:py-16 lg:py-20">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Services · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[1.85rem] font-extrabold leading-[1.25] tracking-[-0.01em] text-[#142341] sm:text-[2.4rem] sm:leading-[1.2] lg:text-[2.9rem]">
              物理専門塾オンライン、高校物理アプリ、
              <br className="hidden sm:block" />
              LaTeX 教材作成、ITパスポート アプリ。
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[0.98rem] leading-[1.95] text-[#3a4d6b] sm:mt-6 sm:text-[1.06rem]">
              Solvora が運営・公式紹介する 4 つのサービスを 1 ページにまとめました。高校生・受験生から教員・社会人まで、目的別に最短ルートで公式サイトへアクセスできます。
            </p>

            {/* Quick-jump dock — anchors to each service section */}
            <ul className="mt-7 flex flex-wrap gap-2 sm:mt-8">
              {apps.map((a) => (
                <li key={a.slug}>
                  <a
                    href={`#${a.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[0.84rem] font-semibold text-[#142341] ring-1 ring-[rgba(20,35,65,0.14)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_28px_-18px_rgba(20,35,65,0.5)]"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#3b7cd9]" />
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Decorative wave at the bottom of the hero — physics motif */}
        <svg
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[14%] w-full opacity-50"
        >
          <defs>
            <linearGradient id="apps-hero-wave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b7cd9" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b7cd9" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e28040" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,110 C200,40 380,180 600,110 C820,40 1000,180 1200,110 C1380,50 1500,150 1600,110"
            stroke="url(#apps-hero-wave)"
            strokeWidth="1.4"
            fill="none"
          />
        </svg>
      </section>

      {/* FEATURED: 物理の森 */}
      {featured ? (
        <section className="bg-[#fbf5e6]" id={featured.slug}>
          <Container className="px-5 py-14 sm:px-6 sm:py-20">
            <ServiceCard
              app={featured}
              visual={visualBySlug[featured.slug]}
              isFeatured
            />
          </Container>
        </section>
      ) : null}

      {/* OTHER SERVICES */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                All Services
              </p>
              <h2 className="mt-2 text-[1.5rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:mt-3 sm:text-[1.95rem]">
                目的別の公式入口
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-12 sm:gap-14">
            {others.map((app) => (
              <ServiceCard
                key={app.slug}
                app={app}
                visual={visualBySlug[app.slug]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* BRAND STRUCTURE */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fefcf6_0%,#fbf5e6_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[60%] w-[55%] opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, rgba(251,221,196,0.55), transparent 70%)",
          }}
        />
        <Container className="relative px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
              Brand Structure
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#142341] sm:text-[2.05rem]">
              Solvora と各サービスの関係
            </h2>
            <p className="mt-4 text-[0.92rem] leading-[1.95] text-[#3a4d6b]">
              Solvora は理系学習ハブの親ブランド。物理の森は Solvora が直営するオンライン物理専門塾、Physics は高校物理アプリ、Eddivom は LaTeX 教材作成 AI、IT Pass は IT パスポート アプリです。
            </p>
          </div>

          {/* Visual brand tree */}
          <BrandStructureDiagram />

          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#142341] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              物理の森を開く <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#142341] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-[#142341] transition hover:bg-[#142341] hover:text-white"
            >
              ブログを読む
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-[0.94rem] font-semibold text-[#1e3a8a] transition hover:text-[#142341]"
            >
              Solvora について <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

type App = (typeof apps)[number];

function ServiceCard({
  app,
  visual,
  isFeatured = false,
}: {
  app: App;
  visual: Visual | undefined;
  isFeatured?: boolean;
}) {
  const v = visual ?? visualBySlug.physics;
  const ctaStyle: CSSProperties = isFeatured
    ? { backgroundColor: "#142341" }
    : {};
  return (
    <article
      id={app.slug}
      className={`scroll-mt-24 sm:scroll-mt-28 ${isFeatured ? "" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-[24px] ${v.bg} p-6 ring-1 ${v.ring} sm:rounded-[28px] sm:p-9 lg:p-10`}
      >
        {/* Decorative orbs — pure CSS gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] -top-[20%] h-[55%] w-[45%] opacity-90"
          style={{
            background: `radial-gradient(closest-side, ${v.glow1}, transparent 72%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[12%] bottom-[-20%] h-[55%] w-[45%] opacity-80"
          style={{
            background: `radial-gradient(closest-side, ${v.glow2}, transparent 72%)`,
          }}
        />

        <div className="relative grid gap-7 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full border bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] backdrop-blur-sm sm:text-[0.74rem] ${v.chip}`}
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: "currentColor" }}
              />
              {app.category} · {app.status}
            </div>
            <h2
              className={`mt-4 text-balance text-[1.55rem] font-extrabold leading-[1.3] tracking-[-0.005em] ${v.ink} sm:text-[1.95rem]`}
            >
              {app.name}
              <span className={`block text-[1.05rem] font-bold leading-[1.55] ${v.inkSoft} sm:text-[1.18rem]`}>
                {app.primaryKeyword}
              </span>
            </h2>
            <p className={`mt-4 text-[0.95rem] leading-[1.9] ${v.inkSoft} sm:text-[1.02rem]`}>
              {app.comparison}
            </p>
            <a
              href={app.href}
              rel="noreferrer noopener"
              target="_blank"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.94rem] font-bold tracking-[0.02em] text-[#0b1d4a] shadow-[0_14px_30px_-16px_rgba(15,29,74,0.55)] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
              style={ctaStyle.backgroundColor ? undefined : undefined}
            >
              {app.ctaLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Visual artwork (inline SVG, zero extra requests) */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-[20px] ring-1 shadow-[0_30px_60px_-40px_rgba(15,29,74,0.4)]"
              style={{ aspectRatio: "3 / 2" }}
            >
              {v.artwork}
            </div>
          </div>
        </div>
      </div>

      {/* Description + highlights */}
      <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-[1.1fr_1fr]">
        <p className="rounded-[18px] bg-[#fbf9f4] p-5 text-[0.92rem] leading-[1.95] text-[#1f3a6b] ring-1 ring-[rgba(20,35,65,0.08)] sm:p-6">
          {app.description}
        </p>
        <ul className="grid gap-3">
          {app.highlights.map((h) => (
            <li
              key={h.title}
              className="rounded-[16px] bg-white p-4 ring-1 ring-[rgba(20,35,65,0.08)] shadow-[0_14px_30px_-26px_rgba(20,35,65,0.35)] sm:p-5"
            >
              <p className="text-[0.95rem] font-extrabold leading-[1.45] text-[#142341]">
                {h.title}
              </p>
              <p className="mt-1.5 text-[0.85rem] leading-[1.85] text-[#3a4d6b]">
                {h.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Audience + tags */}
      <div className="mt-5 flex flex-col gap-2 rounded-[16px] bg-[#fffaf0] p-4 ring-1 ring-[rgba(226,128,64,0.18)] sm:flex-row sm:items-start sm:gap-4 sm:p-5">
        <span className="shrink-0 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-[#a35a16]">
          向いている人
        </span>
        <p className="text-[0.88rem] leading-[1.85] text-[#3a4d6b]">{app.audience}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#475569]">
          関連キーワード
        </span>
        {app.secondaryKeywords.map((k) => (
          <span
            key={k}
            className="inline-flex items-center rounded-full bg-[#f1f5f9] px-3 py-1 text-[0.74rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)]"
          >
            #{k}
          </span>
        ))}
      </div>

      {/* Per-service FAQ */}
      <details className="group mt-6 rounded-[18px] bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.06)]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-[0.92rem] font-bold tracking-[-0.005em] text-[#142341] [&::-webkit-details-marker]:hidden">
          <span>{app.primaryKeyword} に関するよくある質問</span>
          <span aria-hidden="true" className="text-[#1e3a8a] transition group-open:rotate-90">
            →
          </span>
        </summary>
        <ul className="grid gap-4 px-5 pb-5">
          {app.faq.map((q) => (
            <li key={q.question}>
              <p className="text-[0.88rem] font-bold text-[#142341]">Q. {q.question}</p>
              <p className="mt-1.5 text-[0.86rem] leading-[1.85] text-[#3a4d6b]">A. {q.answer}</p>
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

function BrandStructureDiagram() {
  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="rounded-[24px] bg-white p-6 ring-1 ring-[rgba(20,35,65,0.08)] shadow-[0_30px_60px_-44px_rgba(20,35,65,0.4)] sm:p-8">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#142341] px-5 py-2 text-[0.86rem] font-extrabold tracking-[0.04em] text-white">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#e28040]" />
            SOLVORA
            <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-[#bae6fd]">
              HUB
            </span>
          </span>
        </div>
        <svg
          viewBox="0 0 480 80"
          aria-hidden="true"
          className="mx-auto mt-3 h-12 w-full max-w-md"
          preserveAspectRatio="none"
        >
          <path d="M 240 0 L 240 30 L 60 30 L 60 80" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
          <path d="M 240 30 L 180 30 L 180 80" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
          <path d="M 240 30 L 300 30 L 300 80" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
          <path d="M 240 30 L 420 30 L 420 80" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
        </svg>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {apps.map((a) => {
            const v = visualBySlug[a.slug];
            return (
              <li key={a.slug}>
                <a
                  href={`#${a.slug}`}
                  className="block rounded-[14px] bg-[#fbf9f4] p-3 text-center ring-1 ring-[rgba(20,35,65,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-18px_rgba(20,35,65,0.4)]"
                >
                  <span
                    aria-hidden="true"
                    className="mx-auto block h-1.5 w-8 rounded-full"
                    style={{ background: v?.glow1 ?? "#3b7cd9" }}
                  />
                  <span className="mt-2 block text-[0.86rem] font-extrabold text-[#142341]">
                    {a.name}
                  </span>
                  <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#3a4d6b]">
                    {a.category}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
