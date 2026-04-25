import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { homeFaq } from "@/data/home";
import { siteConfig } from "@/data/site";
import { getLatestPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "理系人材育成のEdTechハブ｜AI教材・学習アプリ・物理塾を集約 - Solvora",
  description:
    "Solvora は、AI 教材作成「Eddivom」・物理専門オンライン塾「物理の森」・学習アプリ「Physics」「IT Pass」を集約した理系人材育成のEdTechハブ。GIGAスクール構想後の高校・大学・社会人の学びを、AI教材作成と学習支援アプリでつなぎ、現場で使える形に整理しています。教育DX・STEM教育・LaTeX教材作成を実装する公式入口。",
  keywords: [
    "理系人材育成",
    "EdTech 日本",
    "GIGAスクール",
    "教育DX",
    "STEM教育",
    "AI 教材作成",
    "教材作成 AI",
    "LaTeX 教材作成",
    "学習支援アプリ",
    "Eddivom",
    "物理の森",
    "高校物理 オンライン塾",
    "Solvora",
  ],
  path: "/",
});

const subjects = [
  {
    label: "AI Materials",
    title: "AI 教材作成 Eddivom",
    sub: "AIで下書き → LaTeX で組版 → PDF 配布までワンストップ。",
    href: "/apps#eddivom",
    accent: "#1d4ed8",
  },
  {
    label: "Physics School",
    title: "物理専門オンライン塾「物理の森」",
    sub: "高校物理に完全特化したカリキュラムを Solvora が直営。",
    href: "/apps#physics-school",
    accent: "#0b1d4a",
  },
  {
    label: "Learning Apps",
    title: "学習アプリ Physics・IT Pass",
    sub: "高校物理 / IT パスポートをスマホで毎日 5〜10 分積み上げ。",
    href: "/apps",
    accent: "#0284c7",
  },
  {
    label: "Insights",
    title: "理系教育・教材設計の解説ブログ",
    sub: "GIGA・EdTech・学習科学を、現場で使える形に整理。",
    href: "/blog",
    accent: "#0ea5e9",
  },
];

const faqItems = homeFaq;

function HeroVisual() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 520"
      className="block h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f8fbff" />
          <stop offset="1" stopColor="#eef4ff" />
        </linearGradient>
        <linearGradient id="hero-bar1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="hero-bar2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="hero-bar3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#7dd3fc" />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.7" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#bae6fd" stopOpacity="0.55" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="520" fill="url(#hero-bg)" />
      <rect width="640" height="520" fill="url(#hero-glow)" />

      {/* soft grid */}
      <g stroke="rgba(15,29,74,0.06)" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 56 + 32} y1="40" x2={i * 56 + 32} y2="480" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="32" y1={i * 52 + 60} x2="608" y2={i * 52 + 60} />
        ))}
      </g>

      {/* axes */}
      <g stroke="#0b1d4a" strokeWidth="2.5" strokeLinecap="round">
        <line x1="120" y1="430" x2="540" y2="430" />
        <line x1="120" y1="430" x2="120" y2="100" />
      </g>
      <polygon points="120,86 110,108 130,108" fill="#0b1d4a" />
      <polygon points="556,430 534,420 534,440" fill="#0b1d4a" />

      {/* bar chart */}
      <rect x="180" y="320" width="44" height="110" rx="3" fill="url(#hero-bar1)" />
      <rect x="246" y="260" width="44" height="170" rx="3" fill="url(#hero-bar2)" />
      <rect x="312" y="200" width="44" height="230" rx="3" fill="url(#hero-bar3)" />
      <rect x="378" y="150" width="44" height="280" rx="3" fill="url(#hero-bar3)" opacity="0.85" />

      {/* orbit curve */}
      <path
        d="M 60 470 Q 30 280 220 160 Q 460 30 600 130"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="600" cy="130" r="11" fill="#38bdf8" />
      <circle cx="60" cy="470" r="9" fill="#1d4ed8" />

      {/* small annotation node */}
      <circle cx="312" cy="200" r="5" fill="#0b1d4a" />
      <circle cx="312" cy="200" r="11" fill="none" stroke="#0b1d4a" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function PhysicsVisual() {
  return (
    <svg viewBox="0 0 720 480" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="phy-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0b1d4a" />
          <stop offset="1" stopColor="#1e3a8a" />
        </linearGradient>
        <radialGradient id="phy-glow" cx="0.8" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="720" height="480" fill="url(#phy-bg)" />
      <rect width="720" height="480" fill="url(#phy-glow)" />

      {/* v-t graph */}
      <g stroke="rgba(255,255,255,0.16)" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`vv${i}`} x1={i * 64 + 40} y1="60" x2={i * 64 + 40} y2="430" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`hh${i}`} x1="40" y1={i * 56 + 80} x2="680" y2={i * 56 + 80} />
        ))}
      </g>
      <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
        <line x1="80" y1="400" x2="660" y2="400" />
        <line x1="80" y1="400" x2="80" y2="80" />
      </g>
      <text x="92" y="100" fill="#bae6fd" fontSize="13" fontFamily="system-ui" letterSpacing="2">
        v
      </text>
      <text x="640" y="420" fill="#bae6fd" fontSize="13" fontFamily="system-ui" letterSpacing="2">
        t
      </text>
      <path
        d="M 80 380 Q 240 360 360 280 T 660 100"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 80 380 Q 240 360 360 280 T 660 100 L 660 400 L 80 400 Z"
        fill="rgba(56,189,248,0.18)"
      />
      <circle cx="360" cy="280" r="6" fill="#fbbf24" />
      <circle cx="360" cy="280" r="14" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function MaterialVisual() {
  return (
    <svg viewBox="0 0 720 480" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mat-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f0f9ff" />
          <stop offset="1" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>
      <rect width="720" height="480" fill="url(#mat-bg)" />

      {/* three stacked sheets */}
      <g>
        <rect x="120" y="110" width="320" height="200" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="140" y="135" width="200" height="8" rx="3" fill="#bfdbfe" />
        <rect x="140" y="155" width="260" height="6" rx="3" fill="#e2e8f0" />
        <rect x="140" y="170" width="240" height="6" rx="3" fill="#e2e8f0" />
        <rect x="140" y="185" width="180" height="6" rx="3" fill="#e2e8f0" />
        <rect x="140" y="220" width="120" height="40" rx="6" fill="#dbeafe" />
        <rect x="280" y="220" width="120" height="40" rx="6" fill="#bae6fd" />
      </g>
      <g transform="translate(180 60)">
        <rect width="320" height="200" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="20" y="25" width="200" height="8" rx="3" fill="#3b82f6" />
        <rect x="20" y="45" width="260" height="6" rx="3" fill="#e2e8f0" />
        <rect x="20" y="60" width="240" height="6" rx="3" fill="#e2e8f0" />
      </g>
      <g transform="translate(260 30)">
        <rect width="380" height="240" rx="16" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="22" y="28" width="180" height="10" rx="3" fill="#0b1d4a" />
        <rect x="22" y="50" width="320" height="6" rx="3" fill="#cbd5e1" />
        <rect x="22" y="65" width="280" height="6" rx="3" fill="#cbd5e1" />
        <rect x="22" y="80" width="240" height="6" rx="3" fill="#cbd5e1" />
        <rect x="22" y="115" width="100" height="80" rx="6" fill="#dbeafe" />
        <rect x="135" y="115" width="100" height="80" rx="6" fill="#bae6fd" />
        <rect x="248" y="115" width="100" height="80" rx="6" fill="#7dd3fc" />
      </g>

      {/* AI chip */}
      <g transform="translate(80 350)">
        <rect width="160" height="64" rx="32" fill="#0b1d4a" />
        <text x="80" y="40" textAnchor="middle" fill="#bae6fd" fontFamily="system-ui" fontSize="18" fontWeight="700" letterSpacing="3">
          AI · LaTeX
        </text>
      </g>
    </svg>
  );
}

function DesignVisual() {
  return (
    <svg viewBox="0 0 720 480" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ds-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fafaf9" />
          <stop offset="1" stopColor="#f1f5f9" />
        </linearGradient>
        <marker
          id="ds-arrow"
          markerWidth="14"
          markerHeight="14"
          refX="11"
          refY="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M2 2 L12 7 L2 12 z" fill="#1d4ed8" />
        </marker>
        <marker
          id="ds-arrow-warm"
          markerWidth="14"
          markerHeight="14"
          refX="11"
          refY="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M2 2 L12 7 L2 12 z" fill="#38bdf8" />
        </marker>
      </defs>
      <rect width="720" height="480" fill="url(#ds-bg)" />

      {/* Eyebrow label */}
      <text x="360" y="56" textAnchor="middle" fontFamily="system-ui" fontSize="13" fontWeight="700" fill="#1d4ed8" letterSpacing="6">
        LEARNING LOOP
      </text>

      {/* Forward arrows: 読む → 解く → 続ける → 戻る → 読む */}
      <g stroke="#1d4ed8" strokeWidth="2.4" fill="none" strokeLinecap="round">
        {/* 読む → 解く */}
        <path d="M 188 218 Q 232 168 268 148" markerEnd="url(#ds-arrow)" />
        {/* 解く → 続ける */}
        <path d="M 376 152 Q 460 184 488 218" markerEnd="url(#ds-arrow)" />
        {/* 続ける → 戻る */}
        <path d="M 488 268 Q 460 308 376 332" markerEnd="url(#ds-arrow)" />
        {/* 戻る → 読む */}
        <path d="M 268 332 Q 232 308 188 268" markerEnd="url(#ds-arrow)" />
      </g>

      {/* Reinforcement arrow (back-loop) — clearly inside the diagram */}
      <path
        d="M 488 234 Q 540 184 488 144"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="6 5"
        markerEnd="url(#ds-arrow-warm)"
      />

      {/* Circle nodes */}
      {[
        { cx: 140, cy: 240, label: "読む", sub: "READ" },
        { cx: 320, cy: 140, label: "解く", sub: "SOLVE" },
        { cx: 320, cy: 340, label: "戻る", sub: "BACK" },
        { cx: 540, cy: 240, label: "続ける", sub: "CONTINUE" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r="56" fill="#ffffff" stroke="#0b1d4a" strokeWidth="2" />
          <text x={n.cx} y={n.cy - 2} textAnchor="middle" fontFamily="system-ui" fontSize="20" fontWeight="700" fill="#0b1d4a">
            {n.label}
          </text>
          <text x={n.cx} y={n.cy + 22} textAnchor="middle" fontFamily="system-ui" fontSize="10" fontWeight="700" fill="#1d4ed8" letterSpacing="3">
            {n.sub}
          </text>
        </g>
      ))}

      {/* Center label */}
      <text x="340" y="246" textAnchor="middle" fontFamily="system-ui" fontSize="12" fontWeight="700" fill="#94a3b8" letterSpacing="4">
        FEEDBACK
      </text>
    </svg>
  );
}

function SubjectIcon({ accent, label }: { accent: string; label: string }) {
  return (
    <svg viewBox="0 0 200 200" className="block h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`sg-${label}`} cx="0.3" cy="0.3" r="0.8">
          <stop offset="0" stopColor={accent} stopOpacity="0.18" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="20" fill="#f8fafc" />
      <rect width="200" height="200" rx="20" fill={`url(#sg-${label})`} />
      <g transform="translate(36 40)" stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round">
        <line x1="14" y1="120" x2="120" y2="120" />
        <line x1="14" y1="120" x2="14" y2="14" />
        <polygon points="14,8 6,22 22,22" fill={accent} />
        <polygon points="128,120 116,112 116,128" fill={accent} />
      </g>
      <g transform="translate(36 40)">
        <rect x="34" y="80" width="14" height="36" fill={accent} opacity="0.55" />
        <rect x="56" y="62" width="14" height="54" fill={accent} opacity="0.75" />
        <rect x="78" y="44" width="14" height="72" fill={accent} />
      </g>
      <circle cx="146" cy="62" r="7" fill={accent} />
      <path d="M 30 170 Q 100 130 170 158" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const homeJsonLd = [
    createHomePageJsonLd(),
    createEducationalServiceJsonLd(),
    createHomeFaqJsonLd(),
    createItemListJsonLd(
      "Solvora の最新記事",
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

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <Container className="px-6">
          <div className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-32">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
                STEM Learning Hub · 理系人材育成 EdTech
              </p>
              <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.2rem]">
                理系人材を、育てる。
                <br />
                学びを設計する EdTech ハブ。
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
                AI 教材作成 <strong className="font-bold text-[#0b1d4a]">Eddivom</strong>、物理専門オンライン塾 <strong className="font-bold text-[#0b1d4a]">物理の森</strong>、学習アプリ <strong className="font-bold text-[#0b1d4a]">Physics・IT Pass</strong>。GIGA スクール構想以降の理系教育を、教材設計・AI・アプリで一気通貫につなぎ直します。
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/apps"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.96rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                >
                  サービスを見る
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-2 text-[0.96rem] font-semibold text-[#1d4ed8] transition hover:text-[#0b1d4a]"
                >
                  解説ブログを読む <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-50px_rgba(15,29,74,0.35)] ring-1 ring-[rgba(15,29,74,0.08)]">
                <HeroVisual />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SUBJECT GRID */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
              4 services × 1 hub
            </p>
            <h2 className="mt-2 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              理系人材育成を、4 つの公式入口で。
            </h2>
            <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569] sm:text-base">
              AI 教材作成・物理塾・学習アプリ・解説ブログ。Solvora が公式に運営／パートナー連携する 4 サービスで、教育現場と学習者をつなぎます。
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <li key={subject.label}>
                <Link
                  href={subject.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)]"
                >
                  <div className="aspect-square overflow-hidden">
                    <SubjectIcon accent={subject.accent} label={subject.label} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span
                      className="text-[0.7rem] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: subject.accent }}
                    >
                      {subject.label}
                    </span>
                    <p className="text-[0.98rem] font-bold leading-[1.5] text-[#0b1d4a]">
                      {subject.title}
                    </p>
                    <p className="text-[0.84rem] leading-[1.85] text-[#475569]">{subject.sub}</p>
                    <span className="mt-auto pt-2 text-[0.85rem] font-semibold text-[#1d4ed8] opacity-0 transition group-hover:opacity-100">
                      詳しく見る →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FEATURED: Physics School */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Physics
              </p>
              <h2 className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.2] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.6rem]">
                物理に特化した、
                <br />
                オンライン専門塾。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                公式を覚えるのではなく、現象を読み解く。
                高校物理だけに集中したカリキュラムで、つまずきの前提から丁寧に積み直します。
              </p>
              <a
                href={siteConfig.physicsSchoolUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.96rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
              >
                物理の森を見る <span aria-hidden="true" className="ml-1.5">↗</span>
              </a>
            </div>
            <div className="overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgba(11,29,74,0.55)]">
              <PhysicsVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED: Eddivom — AI教材作成 */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-2 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eef4ff] via-[#fff7ed] to-[#fef3c7] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_70px_-50px_rgba(15,29,74,0.4)] lg:order-1">
              <img
                src="/eddivom-hero.webp"
                alt="Eddivom — AI で問題下書きを作り、LaTeX に整形して PDF・Web 配布まで一気通貫"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.74rem]">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#f59e0b]" />
                AI Materials · 教材作成 AI
              </p>
              <h2 className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.2] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.6rem]">
                <span className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#f59e0b] bg-clip-text text-transparent">
                  Eddivom
                </span>
                ｜
                <br className="hidden sm:block" />
                教材づくりを、AI で一気通貫に。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                AI で問題の下書きを作り、そのまま LaTeX で整形、PDF・Web で配布まで。<strong className="font-bold text-[#0b1d4a]">教材作成 AI「Eddivom」</strong> は、塾講師・高校教員・教材制作者の問題プリント・小テスト・解答集の作業時間を圧縮します。GIGA スクール後の教材 DX を実装する Solvora の主力サービスです。
              </p>
              <ul className="mt-6 grid gap-2 text-[0.92rem] leading-[1.85] text-[#334155]">
                {[
                  "AI 下書き → LaTeX 整形 → PDF 出力までワンストップ",
                  "物理・数学の数式組版（amsmath / physics 系）に最適化",
                  "1問の元データから類題と解答 PDF を派生生成",
                ].map((feat) => (
                  <li key={feat} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#f59e0b]"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.eddivomUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-6 text-[0.96rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                >
                  Eddivom を開く <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/apps#eddivom"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-[0.96rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                >
                  詳しく見る
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED: Learning design */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Learning Design
              </p>
              <h2 className="mt-3 text-balance text-[2rem] font-extrabold leading-[1.2] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.6rem]">
                使われる学びを、
                <br />
                設計する。
              </h2>
              <p className="mt-6 max-w-lg text-[1rem] leading-[1.95] text-[#334155]">
                機能を増やすのではなく、動線を整える。
                「読む・解く・戻る・続ける」のループから、教室で実際に使われる学習体験を考えます。
              </p>
              <Link
                href="/blog/education-technology-learning-design"
                className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.96rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                考え方を読む <span aria-hidden="true" className="ml-1.5">→</span>
              </Link>
            </div>
            <div className="overflow-hidden rounded-[28px] ring-1 ring-[rgba(15,29,74,0.08)]">
              <DesignVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* LATEST */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                新しい記事
              </h2>
              <p className="mt-3 text-[0.96rem] leading-[1.95] text-[#475569]">
                最近書いたものから。
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center text-[0.95rem] font-semibold text-[#1d4ed8] hover:text-[#0b1d4a]"
            >
              すべて見る <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {latestPosts.map((post, idx) => (
              <li key={post.slug} className="h-full">
                <ArticleCard post={post} preload={idx === 0} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ABOUT */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <img
              alt="Solvora"
              src="/brand/solvora-mark.svg"
              width={360}
              height={360}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-[160px] sm:w-[200px]"
            />
            <h2 className="mt-10 text-balance text-[1.6rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              理系の学びを、社会につなぐ EdTech プラットフォームに。
            </h2>
            <p className="mt-6 text-[1rem] leading-[2] text-[#334155]">
              Solvora は、物理・数学・情報の解説ブログ、AI 教材作成 Eddivom、学習アプリ Physics・IT Pass、物理専門オンライン塾「物理の森」を集約する <strong className="font-bold text-[#0b1d4a]">理系人材育成 EdTech ハブ</strong>。GIGA スクール後の高校・大学・社会人の学びをひとつの動線で支援します。
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-[0.95rem] font-semibold text-[#1d4ed8] hover:text-[#0b1d4a]"
            >
              About を読む <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              よくある質問
            </h2>
            <ul className="mt-10 grid gap-3">
              {faqItems.map((item) => (
                <li
                  key={item.question}
                  className="rounded-[18px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]"
                >
                  <p className="text-[1rem] font-bold leading-[1.65] text-[#0b1d4a]">
                    {item.question}
                  </p>
                  <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-balance text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.4rem]">
              次の一歩を、選んでください。
            </h2>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/blog"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.96rem] font-semibold text-white transition hover:bg-[#1e3a8a]"
              >
                記事を読む
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.96rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                相談する
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
