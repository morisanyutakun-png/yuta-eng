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
    "Solvora は、AI 教材作成「Eddivom」・物理専門オンライン塾「物理の森」・学習アプリ「Solvora Physics」「IT Pass」を集約した理系人材育成のEdTechハブ。GIGAスクール構想後の高校・大学・社会人の学びを、AI教材作成と学習支援アプリでつなぎ、現場で使える形に整理しています。教育DX・STEM教育・LaTeX教材作成を実装する公式入口。",
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
    title: "学習アプリ Solvora Physics・IT Pass",
    sub: "高校物理 / IT パスポートをスマホで毎日 5〜10 分積み上げ。",
    href: "/apps",
    // sky-700 (was sky-700 already) but Lighthouse counts 4.84:1 borderline
    // for the small-uppercase eyebrow size. Bump to sky-800 (6.28:1, passes
    // WCAG AA comfortably).
    accent: "#0369a1",
  },
  {
    label: "Insights",
    title: "理系教育・教材設計の解説ブログ",
    sub: "GIGA・EdTech・学習科学を、現場で使える形に整理。",
    href: "/blog",
    // sky-500 (#0ea5e9) was 3.31:1 on white — fails WCAG AA. Use sky-800.
    accent: "#0369a1",
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
  // ID-safe key for SVG defs (label may contain spaces).
  const id = label.replace(/[^A-Za-z0-9]/g, "");
  // Per-service light gradient palettes (no dark fills) so cards feel bright.
  const palettes: Record<string, { from: string; via: string; to: string }> = {
    "AI Materials": { from: "#eef4ff", via: "#fff7ed", to: "#fef3c7" },
    "Physics School": { from: "#eff6ff", via: "#dbeafe", to: "#bae6fd" },
    "Learning Apps": { from: "#ecfeff", via: "#e0f2fe", to: "#dbeafe" },
    Insights: { from: "#f0fdfa", via: "#ecfeff", to: "#eef4ff" },
  };
  const palette = palettes[label] ?? { from: "#eef4ff", via: "#f8fbff", to: "#dbeafe" };

  return (
    <svg viewBox="0 0 200 200" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.from} />
          <stop offset="0.55" stopColor={palette.via} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.78" cy="0.18" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" rx="22" fill={`url(#bg-${id})`} />
      <rect width="200" height="200" rx="22" fill={`url(#glow-${id})`} />

      {label === "AI Materials" ? (
        // Doc + AI sparkle — Eddivom motif
        <g>
          <rect x="48" y="44" width="92" height="116" rx="10" fill="#ffffff" stroke={accent} strokeWidth="2" />
          <rect x="62" y="64" width="56" height="6" rx="3" fill={accent} opacity="0.85" />
          <rect x="62" y="80" width="64" height="6" rx="3" fill={accent} opacity="0.55" />
          <rect x="62" y="96" width="44" height="6" rx="3" fill={accent} opacity="0.4" />
          <rect x="62" y="118" width="64" height="22" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6" />
          <text x="94" y="134" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">PDF</text>
          <g transform="translate(140 38)">
            <path d="M 12 0 L 14 10 L 24 12 L 14 14 L 12 24 L 10 14 L 0 12 L 10 10 Z" fill="#f59e0b" />
          </g>
          <g transform="translate(36 152)">
            <path d="M 7 0 L 9 6 L 14 7 L 9 8 L 7 14 L 5 8 L 0 7 L 5 6 Z" fill={accent} opacity="0.7" />
          </g>
        </g>
      ) : label === "Physics School" ? (
        // Wave + atom orbit — physics motif
        <g fill="none" strokeLinecap="round">
          <path d="M 30 130 Q 60 90 90 130 T 150 130 T 210 130" stroke={accent} strokeWidth="3" />
          <path d="M 30 100 Q 60 60 90 100 T 150 100 T 210 100" stroke={accent} strokeWidth="2.4" opacity="0.55" />
          <ellipse cx="100" cy="100" rx="48" ry="20" stroke={accent} strokeWidth="2" opacity="0.45" />
          <ellipse cx="100" cy="100" rx="48" ry="20" stroke={accent} strokeWidth="2" opacity="0.45" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="48" ry="20" stroke={accent} strokeWidth="2" opacity="0.45" transform="rotate(-60 100 100)" />
          <circle cx="100" cy="100" r="9" fill={accent} />
        </g>
      ) : label === "Learning Apps" ? (
        // Phone + bar chart — apps motif
        <g>
          <rect x="64" y="34" width="72" height="132" rx="14" fill="#ffffff" stroke={accent} strokeWidth="2" />
          {/* `rx` only takes a single length per SVG spec — the browser logged
              a console error before. Use rx + a clipping rect for the rounded
              top corners. */}
          <path d="M 64 56 L 64 48 a 14 14 0 0 1 14 -14 h 44 a 14 14 0 0 1 14 14 v 8 z" fill={accent} opacity="0.12" />
          <circle cx="100" cy="46" r="2.5" fill={accent} opacity="0.7" />
          <rect x="78" y="120" width="10" height="32" rx="3" fill={accent} opacity="0.5" />
          <rect x="94" y="100" width="10" height="52" rx="3" fill={accent} opacity="0.75" />
          <rect x="110" y="80" width="10" height="72" rx="3" fill={accent} />
          <path d="M 78 90 L 94 78 L 110 64 L 122 56" stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <circle cx="122" cy="56" r="3.5" fill="#f59e0b" />
        </g>
      ) : (
        // Insights — open book + lines
        <g>
          <path d="M 30 64 Q 100 48 170 64 L 170 156 Q 100 140 30 156 Z" fill="#ffffff" stroke={accent} strokeWidth="2" />
          <line x1="100" y1="56" x2="100" y2="148" stroke={accent} strokeWidth="2" opacity="0.4" />
          <g stroke={accent} strokeWidth="2" strokeLinecap="round">
            <line x1="46" y1="80" x2="86" y2="76" opacity="0.85" />
            <line x1="46" y1="96" x2="92" y2="92" opacity="0.6" />
            <line x1="46" y1="112" x2="80" y2="108" opacity="0.45" />
            <line x1="114" y1="80" x2="154" y2="84" opacity="0.85" />
            <line x1="114" y1="96" x2="158" y2="100" opacity="0.6" />
            <line x1="114" y1="112" x2="148" y2="116" opacity="0.45" />
          </g>
          <g transform="translate(150 36)">
            <path d="M 9 0 L 11 7 L 18 9 L 11 11 L 9 18 L 7 11 L 0 9 L 7 7 Z" fill={accent} opacity="0.7" />
          </g>
        </g>
      )}
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

      {/* HERO — cosmic gradient (lightweight: no SVG, no multi-radial bg) */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #02061b 0%, #050b2c 40%, #0b1d4a 100%)",
        }}
      >
        {/* Single decorative orb (cheap to paint) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(29,78,216,0.5), transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,#38bdf8,#f59e0b,#38bdf8,transparent)] opacity-70"
        />

        <Container className="relative px-6">
          <div className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-36">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#bae6fd] ring-1 ring-white/15 backdrop-blur-md sm:text-[0.74rem] sm:tracking-[0.24em]">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#38bdf8]" />
                </span>
                Solvora · STEM EdTech Hub
              </p>

              <h1 className="mt-6 text-balance text-[2.4rem] font-extrabold leading-[1.14] tracking-[-0.018em] text-white sm:text-[3.4rem] sm:leading-[1.1] lg:text-[4.2rem]">
                <span className="block">理系の学びを、</span>
                <span className="relative block">
                  <span className="bg-[linear-gradient(120deg,#ffffff_0%,#bae6fd_45%,#7dd3fc_70%,#ffffff_100%)] bg-clip-text text-transparent">
                    つくり直す。
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[3px] w-32 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#bae6fd] to-transparent sm:-bottom-2 sm:w-48"
                  />
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-pretty text-[1rem] leading-[2] text-white/85 sm:text-[1.1rem]">
                教材・アプリ・AI で、
                <strong className="font-bold text-white">理系人材の未来を設計する</strong>。
                AI 教材作成 <strong className="font-bold text-white">Eddivom</strong>、物理専門塾 <strong className="font-bold text-white">物理の森</strong>、学習アプリ <strong className="font-bold text-white">Solvora Physics・IT Pass</strong> を 1 つの動線で。
              </p>

              {/* Visual coverage badges — each pairs an icon with a short label */}
              <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:max-w-md sm:gap-3">
                {[
                  {
                    label: "GIGA・教育DX",
                    bg: "from-[#eef4ff] to-[#dbeafe]",
                    fg: "#1e3a8a",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M2 19h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <circle cx="12" cy="11" r="2" fill="currentColor" />
                        <path d="M8 11h2M14 11h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    label: "AI 教材作成",
                    bg: "from-[#fef3c7] to-[#fed7aa]",
                    fg: "#7c2d12",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" fill="currentColor" />
                        <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.6" />
                        <circle cx="6" cy="18" r="1.4" fill="currentColor" opacity="0.4" />
                      </svg>
                    ),
                  },
                  {
                    label: "学習アプリ",
                    bg: "from-[#e0f2fe] to-[#bae6fd]",
                    fg: "#0c4a6e",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <rect x="7" y="2.5" width="10" height="19" rx="2" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M11 19h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M9 7h6M9 10h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M9 14l2-1.5 2 1 2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                  {
                    label: "学習科学ベース",
                    bg: "from-[#d1fae5] to-[#a7f3d0]",
                    fg: "#064e3b",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <path d="M12 3a4 4 0 014 4v1a5 5 0 11-8 0V7a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.7" />
                        <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                        <circle cx="12" cy="9" r="1.2" fill="currentColor" />
                      </svg>
                    ),
                  },
                ].map((badge) => (
                  <li
                    key={badge.label}
                    className="inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/[0.1]"
                    style={{ color: "#ffffff" }}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ring-white/20"
                      style={{ background: `${badge.fg}33`, color: "#ffffff" }}
                    >
                      {badge.icon}
                    </span>
                    <span className="text-[0.82rem] font-bold leading-[1.3] tracking-[-0.005em] sm:text-[0.88rem]">
                      {badge.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/apps"
                  className="group/cta relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 text-[0.96rem] font-semibold tracking-[0.02em] text-[#0b1d4a] shadow-[0_18px_38px_-14px_rgba(186,230,253,0.6)] transition hover:-translate-y-px hover:shadow-[0_22px_44px_-14px_rgba(186,230,253,0.7)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#bae6fd_55%,#7dd3fc_100%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.7)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
                  />
                  <span className="relative">サービスを見る →</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-2 text-[0.96rem] font-semibold text-[#bae6fd] transition hover:text-white"
                >
                  解説ブログを読む <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </div>

            {/* Right column orb — pure CSS gradient hub (no SVG) */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square w-full overflow-hidden rounded-[32px] ring-1 ring-white/10">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(125,211,252,0.5) 0%, rgba(29,78,216,0.35) 35%, transparent 70%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#bae6fd] to-[#1d4ed8] shadow-[0_24px_60px_-12px_rgba(56,189,248,0.6)]"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-extrabold tracking-[0.18em] text-[#0b1d4a] text-[1.2rem]">
                    SOLVORA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline ribbon at the bottom of hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(186,230,253,0.3),transparent)]"
          />
        </Container>
      </section>

      {/* CREDENTIALS / KPI STRIP — dark gradient breaks the rhythm */}
      <section
        aria-labelledby="kpi-heading"
        className="cv-defer relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(circle at 90% 10%, rgba(56,189,248,0.28), transparent 50%), radial-gradient(circle at 10% 80%, rgba(245,158,11,0.18), transparent 55%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 60%, #1d4ed8 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <Container className="relative px-6 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#bae6fd] sm:text-[0.76rem]">
                Solvora at a glance · 数字で見るハブ
              </p>
              <h2
                id="kpi-heading"
                className="mt-3 text-balance text-[1.85rem] font-extrabold leading-[1.22] tracking-[-0.005em] sm:text-[2.4rem]"
              >
                <span className="bg-gradient-to-r from-white via-[#bae6fd] to-white bg-clip-text text-transparent">
                  理系人材を育てる
                </span>
                <br />
                4 つの公式入口、1 つのハブ。
              </h2>
              <p className="mt-5 max-w-md text-[0.98rem] leading-[1.95] text-white/80">
                AI 教材作成・物理塾・学習アプリ・解説ブログを、Solvora が <strong className="font-bold text-white">理系人材育成 EdTech ハブ</strong> として束ねています。記事は無料、サービスは目的別に切り替え可能。
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {[
                {
                  value: "4",
                  unit: "公式入口",
                  label: "AI教材・塾・アプリ・ブログ",
                  visual: (
                    <svg viewBox="0 0 64 32" className="h-6 w-12" fill="none" aria-hidden="true">
                      <circle cx="8" cy="16" r="6" fill="#bae6fd" opacity="0.95" />
                      <circle cx="24" cy="16" r="6" fill="#fef3c7" opacity="0.9" />
                      <circle cx="40" cy="16" r="6" fill="#bbf7d0" opacity="0.9" />
                      <circle cx="56" cy="16" r="6" fill="#e9d5ff" opacity="0.9" />
                    </svg>
                  ),
                },
                {
                  value: `${latestPosts.length > 0 ? "16" : "0"}+`,
                  unit: "本",
                  label: "深掘り解説記事",
                  visual: (
                    <svg viewBox="0 0 60 32" className="h-6 w-12" fill="none" aria-hidden="true">
                      <rect x="4" y="6" width="14" height="22" rx="2" fill="#bae6fd" opacity="0.85" />
                      <rect x="22" y="2" width="14" height="26" rx="2" fill="#fef3c7" />
                      <rect x="40" y="10" width="14" height="18" rx="2" fill="#bbf7d0" opacity="0.85" />
                      <line x1="0" y1="30" x2="60" y2="30" stroke="#bae6fd" strokeWidth="1" opacity="0.5" />
                    </svg>
                  ),
                },
                {
                  value: "3",
                  unit: "領域",
                  label: "物理・数学・情報",
                  visual: (
                    <svg viewBox="0 0 64 32" className="h-6 w-12" fill="none" aria-hidden="true">
                      <text x="6" y="22" fontSize="14" fontWeight="800" fill="#bae6fd">π</text>
                      <text x="22" y="22" fontSize="14" fontWeight="800" fill="#fef3c7">∑</text>
                      <text x="40" y="22" fontSize="13" fontWeight="800" fill="#bbf7d0">{"</>"}</text>
                    </svg>
                  ),
                },
                {
                  value: "1",
                  unit: "ハブ",
                  label: "理系人材育成EdTech",
                  visual: (
                    <svg viewBox="0 0 64 32" className="h-6 w-12" fill="none" aria-hidden="true">
                      <circle cx="32" cy="16" r="6" fill="#fef3c7" />
                      <circle cx="8" cy="16" r="3.5" fill="#bae6fd" />
                      <circle cx="56" cy="16" r="3.5" fill="#bae6fd" />
                      <circle cx="32" cy="4" r="3" fill="#bbf7d0" />
                      <circle cx="32" cy="28" r="3" fill="#bbf7d0" />
                      <line x1="11" y1="16" x2="26" y2="16" stroke="#bae6fd" strokeWidth="1.5" opacity="0.7" />
                      <line x1="38" y1="16" x2="53" y2="16" stroke="#bae6fd" strokeWidth="1.5" opacity="0.7" />
                      <line x1="32" y1="7" x2="32" y2="10" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7" />
                      <line x1="32" y1="22" x2="32" y2="25" stroke="#bbf7d0" strokeWidth="1.5" opacity="0.7" />
                    </svg>
                  ),
                },
              ].map((kpi) => (
                <li
                  key={kpi.label}
                  className="relative overflow-hidden rounded-[20px] bg-white/[0.06] p-4 ring-1 ring-white/15 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.1] sm:p-5"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(closest-side,rgba(186,230,253,0.4),transparent)]"
                  />
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[2.4rem] font-extrabold leading-none tracking-[-0.02em] text-white tabular-nums sm:text-[3rem]">
                        {kpi.value}
                      </span>
                      <span className="text-[0.78rem] font-semibold text-[#bae6fd] sm:text-[0.84rem]">
                        {kpi.unit}
                      </span>
                    </div>
                    <div className="opacity-90">{kpi.visual}</div>
                  </div>
                  <p className="mt-2 text-[0.78rem] leading-[1.6] text-white/75 sm:text-[0.84rem]">
                    {kpi.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage stripe */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-[0.78rem] text-white/70 sm:gap-x-7 sm:text-[0.84rem]">
            <span className="font-semibold text-[#bae6fd]">対応領域</span>
            {[
              "高校物理",
              "高校数学",
              "情報I",
              "ITパスポート",
              "AI教材作成",
              "教育DX",
              "GIGAスクール 後",
              "学習アプリ設計",
            ].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* SUBJECT GRID */}
      <section className="cv-defer bg-[#f8fafc]">
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

      {/* FLOW DIAGRAM — visual ecosystem map */}
      <section className="cv-defer relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.14),transparent)] blur-3xl"
        />
        <Container className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#1d4ed8] sm:text-[0.76rem]">
              How it connects · 学びの動線
            </p>
            <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.32] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.3rem]">
              読む → 解く → つくる → 教える、を1つの動線に。
            </h2>
            <p className="mt-4 text-[0.96rem] leading-[1.95] text-[#475569] sm:text-[1.02rem]">
              Solvora は4つのサービスを循環できる導線で結びます。学習者は<strong className="font-bold text-[#0b1d4a]">読む</strong>から、教える側は<strong className="font-bold text-[#0b1d4a]">つくる</strong>から入れます。
            </p>
          </div>

          {/* Lightweight CSS-only ecosystem layout (replaced 116-line inline SVG) */}
          <ul className="mx-auto mt-12 grid max-w-5xl gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {[
              // Background fills behind white text — keep darker shades so
              // the white-on-color contrast stays well above WCAG AA.
              { verb: "読む", what: "解説ブログ", color: "#0369a1" },
              { verb: "解く", what: "学習アプリ", color: "#0284c7" },
              { verb: "つくる", what: "Eddivom", color: "#b45309" },
              { verb: "教える", what: "物理の森", color: "#1e3a8a" },
            ].map((node) => (
              <li
                key={node.verb}
                className="flex items-center gap-4 rounded-[18px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,29,74,0.4)]"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[1rem] font-extrabold text-white"
                  style={{ background: node.color }}
                >
                  {node.verb}
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#475569]">
                    {node.verb}
                  </span>
                  <span className="text-[0.98rem] font-extrabold leading-[1.4] text-[#0b1d4a]">
                    {node.what}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FEATURED: Physics School */}
      <section className="cv-defer bg-[#f8fafc]">
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
      <section className="cv-defer relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-64 w-[40%] bg-[radial-gradient(closest-side,rgba(245,158,11,0.18),transparent)]"
        />
        <Container className="relative px-6 py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="order-2 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#eef4ff] via-[#fff7ed] to-[#fef3c7] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_30px_70px_-50px_rgba(15,29,74,0.4)] lg:order-1">
              <picture>
                <source type="image/avif" srcSet="/eddivom-hero.avif" />
                <source type="image/webp" srcSet="/eddivom-hero.webp" />
                <img
                  src="/eddivom-hero.webp"
                  alt="Eddivom — AI で問題下書きを作り、LaTeX に整形して PDF・Web 配布まで一気通貫"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </picture>
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
      <section className="cv-defer bg-white">
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

      {/* ABOUT — Manifesto */}
      <section className="cv-defer relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,29,74,0.2),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.14),transparent)] blur-3xl"
        />
        <Container className="relative px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[#1d4ed8] sm:text-[0.78rem]">
              Manifesto · 私たちが信じていること
            </p>

            {/* Display-size pull quote */}
            <blockquote className="relative mt-6 sm:mt-8">
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-4 select-none text-[5rem] font-extrabold leading-none text-[#dbeafe] sm:-left-4 sm:-top-8 sm:text-[8rem]"
              >
                “
              </span>
              <p className="relative text-balance text-center text-[1.7rem] font-extrabold leading-[1.42] tracking-[-0.012em] text-[#0b1d4a] sm:text-[2.4rem] sm:leading-[1.32] lg:text-[2.9rem]">
                理系の学びを、
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
                  社会につなぐ EdTech
                </span>
                に。
              </p>
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-[1.02rem] leading-[2] text-[#334155]">
              Solvora は、物理・数学・情報の解説ブログ、AI 教材作成 <strong className="font-bold text-[#0b1d4a]">Eddivom</strong>、学習アプリ <strong className="font-bold text-[#0b1d4a]">Solvora Physics・IT Pass</strong>、物理専門オンライン塾 <strong className="font-bold text-[#0b1d4a]">物理の森</strong> を集約する <strong className="font-bold text-[#0b1d4a]">理系人材育成 EdTech ハブ</strong>。GIGA スクール構想後の高校・大学・社会人の学びをひとつの動線でつなぎます。
            </p>

            {/* Three pillars — short value props with iconic visuals */}
            <ul className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  no: "01",
                  title: "理解で解く。",
                  body: "公式暗記ではなく、現象を読み解く順序を設計する。",
                  accent: "#1d4ed8",
                  bgFrom: "#eef4ff",
                  bgTo: "#dbeafe",
                  visual: (
                    // Lightbulb + circuit lines (理解＝ひらめき)
                    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
                      <circle cx="32" cy="28" r="14" fill="#fef3c7" />
                      <path
                        d="M32 14a10 10 0 0110 10c0 4-2 6-3.5 8-1 1.2-1.5 2.5-1.5 4h-10c0-1.5-.5-2.8-1.5-4-1.5-2-3.5-4-3.5-8a10 10 0 0110-10z"
                        stroke="#1d4ed8"
                        strokeWidth="2"
                        fill="#ffffff"
                      />
                      <line x1="28" y1="40" x2="36" y2="40" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
                      <line x1="29" y1="44" x2="35" y2="44" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
                      <path d="M30 46l4 4M34 46l-4 4" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                      <path d="M14 28h-4M54 28h-4M32 6V2M18 14l-3-3M46 14l3-3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  no: "02",
                  title: "AI で軽く。",
                  body: "AI × LaTeX で、教材作成を毎週の負担から解放する。",
                  // amber-700 — used as both the SVG stroke color and the
                  // pillar number text color. The previous amber-500 was 2.13:1
                  // on white, well below WCAG AA. amber-700 hits 4.59:1.
                  accent: "#b45309",
                  bgFrom: "#fef3c7",
                  bgTo: "#fed7aa",
                  visual: (
                    // Document with AI sparkle (AI教材作成)
                    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
                      <rect x="14" y="10" width="32" height="44" rx="4" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="20" y1="20" x2="36" y2="20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      <line x1="20" y1="26" x2="40" y2="26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                      <line x1="20" y1="32" x2="32" y2="32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                      <rect x="20" y="40" width="20" height="8" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="30" y="46" textAnchor="middle" fontSize="6" fontWeight="800" fill="#92400e">PDF</text>
                      <g transform="translate(46 8)">
                        <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#f59e0b" />
                        <circle cx="14" cy="14" r="2" fill="#f59e0b" opacity="0.6" />
                      </g>
                    </svg>
                  ),
                },
                {
                  no: "03",
                  title: "動線でつなぐ。",
                  body: "ブログ → 教材 → アプリ → 塾。学びを止めない動線を組む。",
                  // sky-500 (#0ea5e9) was 3.31:1 on white. sky-800 (#0369a1)
                  // hits 6.28:1, comfortably passing WCAG AA for the pillar
                  // number text.
                  accent: "#0369a1",
                  bgFrom: "#e0f2fe",
                  bgTo: "#bae6fd",
                  visual: (
                    // Connected nodes flow (動線)
                    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
                      <path
                        d="M10 16 Q 22 16 22 32 Q 22 48 34 48 Q 46 48 50 36"
                        stroke="#0ea5e9"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                      />
                      <circle cx="10" cy="16" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                      <circle cx="22" cy="32" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                      <circle cx="34" cy="48" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                      <circle cx="50" cy="36" r="6" fill="#0ea5e9" />
                      <text x="50" y="39" textAnchor="middle" fontSize="6" fontWeight="800" fill="#ffffff">★</text>
                    </svg>
                  ),
                },
              ].map((pillar) => (
                <li
                  key={pillar.no}
                  className="relative overflow-hidden rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)] sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent 80%)` }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className="block text-[0.72rem] font-extrabold tracking-[0.22em]"
                      style={{ color: pillar.accent }}
                    >
                      {pillar.no}
                    </span>
                    <span
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-[16px] ring-1 ring-[rgba(15,29,74,0.06)]"
                      style={{
                        background: `linear-gradient(135deg, ${pillar.bgFrom}, ${pillar.bgTo})`,
                      }}
                    >
                      {pillar.visual}
                    </span>
                  </div>
                  <p className="mt-4 text-[1.18rem] font-extrabold leading-[1.45] tracking-[-0.005em] text-[#0b1d4a]">
                    {pillar.title}
                  </p>
                  <p className="mt-2 text-[0.92rem] leading-[1.95] text-[#475569]">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center text-[0.95rem] font-semibold text-[#1d4ed8] hover:text-[#0b1d4a]"
              >
                Solvora の運営方針と事業構成を読む <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv-defer bg-[#f8fafc]">
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
      <section className="cv-defer bg-white">
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
