import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { siteConfig } from "@/data/site";

export const alt = "Solvora ブログ記事サムネイル";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

type AccentTheme = {
  bg: string;
  glow: string;
  accent: string;
  accentSoft: string;
  chip: string;
  chipText: string;
  motif: "physics" | "materials" | "latex" | "education" | "default";
};

const categoryAccent: Record<string, AccentTheme> = {
  Physics: {
    bg: "linear-gradient(135deg, #020617 0%, #0b1d4a 35%, #1e3a8a 75%, #1d4ed8 100%)",
    glow: "rgba(56,189,248,0.6)",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    chip: "#bae6fd",
    chipText: "#0b1d4a",
    motif: "physics",
  },
  Materials: {
    bg: "linear-gradient(135deg, #0c0a09 0%, #1c1917 35%, #92400e 75%, #f59e0b 100%)",
    glow: "rgba(251,191,36,0.6)",
    accent: "#fbbf24",
    accentSoft: "#fef3c7",
    chip: "#fef3c7",
    chipText: "#7c2d12",
    motif: "materials",
  },
  LaTeX: {
    bg: "linear-gradient(135deg, #020617 0%, #0c4a6e 40%, #0369a1 75%, #0ea5e9 100%)",
    glow: "rgba(125,211,252,0.6)",
    accent: "#7dd3fc",
    accentSoft: "#e0f2fe",
    chip: "#e0f2fe",
    chipText: "#0c4a6e",
    motif: "latex",
  },
  Education: {
    bg: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0f766e 75%, #14b8a6 100%)",
    glow: "rgba(94,234,212,0.6)",
    accent: "#5eead4",
    accentSoft: "#ccfbf1",
    chip: "#d1fae5",
    chipText: "#064e3b",
    motif: "education",
  },
};

const defaultAccent: AccentTheme = {
  bg: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #334155 100%)",
  glow: "rgba(186,230,253,0.45)",
  accent: "#7dd3fc",
  accentSoft: "#e2e8f0",
  chip: "#e2e8f0",
  chipText: "#0f172a",
  motif: "default",
};

type Params = { slug: string };

/** Big article-specific hero artwork (right half of the OG card). */
function ArticleArtwork({ theme }: { theme: AccentTheme }) {
  const stroke = theme.accent;
  const soft = theme.accentSoft;

  if (theme.motif === "physics") {
    // Atomic system: nucleus + 3 orbits + traveling electron + sine wave
    return (
      <svg
        width="540"
        height="540"
        viewBox="0 0 540 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Glow ring */}
        <circle cx="270" cy="270" r="220" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.25" />
        <circle cx="270" cy="270" r="180" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" strokeDasharray="2 6" />
        {/* 3 orbital ellipses */}
        <ellipse cx="270" cy="270" rx="200" ry="78" stroke={stroke} strokeWidth="2" fill="none" opacity="0.85" />
        <ellipse cx="270" cy="270" rx="200" ry="78" stroke={stroke} strokeWidth="2" fill="none" opacity="0.85" transform="rotate(60 270 270)" />
        <ellipse cx="270" cy="270" rx="200" ry="78" stroke={stroke} strokeWidth="2" fill="none" opacity="0.85" transform="rotate(-60 270 270)" />
        {/* Nucleus */}
        <circle cx="270" cy="270" r="44" fill={soft} opacity="0.95" />
        <circle cx="270" cy="270" r="44" stroke={stroke} strokeWidth="2" fill="none" opacity="0.7" />
        <circle cx="270" cy="270" r="20" fill={stroke} opacity="0.85" />
        {/* Electrons */}
        <circle cx="470" cy="270" r="10" fill={soft} />
        <circle cx="338" cy="105" r="8" fill={soft} opacity="0.9" />
        <circle cx="138" cy="425" r="7" fill={soft} opacity="0.8" />
        {/* Sine wave at bottom */}
        <path
          d="M 40 480 Q 80 440 120 480 T 200 480 T 280 480 T 360 480 T 440 480 T 520 480"
          stroke={stroke}
          strokeWidth="2.4"
          fill="none"
          opacity="0.7"
        />
        {/* Particles scattered */}
        <circle cx="80" cy="120" r="3" fill={soft} opacity="0.85" />
        <circle cx="450" cy="80" r="2.5" fill={soft} opacity="0.7" />
        <circle cx="500" cy="450" r="3" fill={soft} opacity="0.6" />
      </svg>
    );
  }

  if (theme.motif === "latex") {
    // Big curly braces + integral + sigma curve + code lines
    return (
      <svg
        width="540"
        height="540"
        viewBox="0 0 540 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Big left brace */}
        <path
          d="M 130 50 Q 60 50 60 200 Q 60 270 30 270 Q 60 270 60 340 Q 60 490 130 490"
          stroke={soft}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Big right brace */}
        <path
          d="M 410 50 Q 480 50 480 200 Q 480 270 510 270 Q 480 270 480 340 Q 480 490 410 490"
          stroke={soft}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Inner integral curve */}
        <path
          d="M 200 130 Q 240 180 230 280 Q 220 380 280 430"
          stroke={stroke}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Sigma-style triangle */}
        <path
          d="M 320 200 L 380 200 L 340 270 L 380 340 L 320 340"
          stroke={stroke}
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Code-style underlines */}
        <line x1="80" y1="540" x2="460" y2="540" stroke={stroke} strokeWidth="2" opacity="0.4" />
        <circle cx="270" cy="280" r="6" fill={stroke} opacity="0.5" />
      </svg>
    );
  }

  if (theme.motif === "materials") {
    // Stack of documents + AI sparkles + connection lines
    return (
      <svg
        width="540"
        height="540"
        viewBox="0 0 540 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Background glow circle */}
        <circle cx="270" cy="270" r="220" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.25" strokeDasharray="2 6" />
        {/* Document layer 3 (back) */}
        <rect x="180" y="100" width="240" height="320" rx="14" fill={soft} opacity="0.18" stroke={stroke} strokeWidth="1.6" />
        {/* Document layer 2 */}
        <rect x="150" y="80" width="240" height="320" rx="14" fill={soft} opacity="0.28" stroke={stroke} strokeWidth="1.8" />
        {/* Document layer 1 (front) */}
        <rect x="120" y="60" width="240" height="320" rx="14" fill={soft} opacity="0.45" stroke={stroke} strokeWidth="2.2" />
        {/* Document content lines */}
        <line x1="140" y1="110" x2="320" y2="110" stroke={stroke} strokeWidth="2.5" opacity="0.85" />
        <line x1="140" y1="140" x2="300" y2="140" stroke={stroke} strokeWidth="2.5" opacity="0.7" />
        <line x1="140" y1="170" x2="280" y2="170" stroke={stroke} strokeWidth="2.5" opacity="0.55" />
        {/* Inner box (formula/code area) */}
        <rect x="140" y="200" width="200" height="100" rx="8" fill={stroke} opacity="0.4" />
        <rect x="140" y="200" width="200" height="100" rx="8" stroke={stroke} strokeWidth="2" fill="none" opacity="0.7" />
        <line x1="158" y1="232" x2="240" y2="232" stroke={soft} strokeWidth="2.5" opacity="0.95" />
        <line x1="158" y1="252" x2="280" y2="252" stroke={soft} strokeWidth="2.5" opacity="0.85" />
        <line x1="158" y1="272" x2="220" y2="272" stroke={soft} strokeWidth="2.5" opacity="0.75" />
        {/* Bottom rule line */}
        <line x1="140" y1="330" x2="280" y2="330" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <line x1="140" y1="355" x2="240" y2="355" stroke={stroke} strokeWidth="2" opacity="0.35" />
        {/* AI Sparkles */}
        <path d="M 440 90 l 6 16 l 16 6 l -16 6 l -6 16 l -6 -16 l -16 -6 l 16 -6 z" fill={soft} opacity="0.95" />
        <path d="M 60 480 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 z" fill={soft} opacity="0.75" />
        <path d="M 480 380 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill={soft} opacity="0.6" />
      </svg>
    );
  }

  if (theme.motif === "education") {
    // Larger learning network with 7 nodes
    return (
      <svg
        width="540"
        height="540"
        viewBox="0 0 540 540"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Outer dashed ring */}
        <circle cx="270" cy="270" r="240" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.3" strokeDasharray="2 6" />
        {/* Connection lines */}
        <line x1="120" y1="180" x2="270" y2="80" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="270" y1="80" x2="420" y2="180" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="120" y1="180" x2="270" y2="270" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="420" y1="180" x2="270" y2="270" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="270" y1="270" x2="160" y2="420" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="270" y1="270" x2="380" y2="420" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="160" y1="420" x2="380" y2="420" stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 5" />
        <line x1="120" y1="180" x2="160" y2="420" stroke={stroke} strokeWidth="1.5" opacity="0.45" strokeDasharray="3 5" />
        <line x1="420" y1="180" x2="380" y2="420" stroke={stroke} strokeWidth="1.5" opacity="0.45" strokeDasharray="3 5" />
        {/* Nodes (small outer) */}
        <circle cx="120" cy="180" r="18" fill={soft} stroke={stroke} strokeWidth="2.5" />
        <circle cx="420" cy="180" r="18" fill={soft} stroke={stroke} strokeWidth="2.5" />
        <circle cx="160" cy="420" r="18" fill={soft} stroke={stroke} strokeWidth="2.5" />
        <circle cx="380" cy="420" r="18" fill={soft} stroke={stroke} strokeWidth="2.5" />
        {/* Top node (highlighted) */}
        <circle cx="270" cy="80" r="26" fill={stroke} stroke={soft} strokeWidth="2.5" />
        <circle cx="270" cy="80" r="10" fill={soft} />
        {/* Center hub (big) */}
        <circle cx="270" cy="270" r="44" fill={soft} opacity="0.92" />
        <circle cx="270" cy="270" r="44" stroke={stroke} strokeWidth="3" fill="none" />
        <circle cx="270" cy="270" r="22" fill={stroke} />
        <circle cx="270" cy="270" r="8" fill={soft} />
      </svg>
    );
  }

  return (
    <svg
      width="540"
      height="540"
      viewBox="0 0 540 540"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "flex" }}
    >
      <circle cx="270" cy="270" r="220" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.5" />
      <circle cx="270" cy="270" r="160" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" />
      <circle cx="270" cy="270" r="100" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.35" />
      <circle cx="270" cy="270" r="48" fill={soft} opacity="0.95" />
      <circle cx="270" cy="270" r="22" fill={stroke} />
    </svg>
  );
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const category = post?.category ?? "Solvora";
  const theme = categoryAccent[category] ?? defaultAccent;
  const date = post?.formattedDate ?? "";
  const reading = post?.readingTime ?? "";
  // Pick 1-2 tags as the "topic chip" — short and visual, no full title.
  const topic = post?.tags?.[0] ?? category;

  const [notoRegular, notoBold] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: theme.bg,
          color: "#ffffff",
          fontFamily: '"Noto Sans JP", system-ui, sans-serif',
          padding: "60px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Layer 1: micro-grid blueprint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />
        {/* Layer 2: large blueprint accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "192px 192px",
            display: "flex",
          }}
        />
        {/* Layer 3: top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
            display: "flex",
          }}
        />
        {/* Layer 4: bottom-left soft glow */}
        <div
          style={{
            position: "absolute",
            bottom: -240,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(186,230,253,0.2), transparent 70%)",
            display: "flex",
          }}
        />
        {/* Layer 5: corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            width: 64,
            height: 64,
            borderTop: `2px solid ${theme.accent}`,
            borderLeft: `2px solid ${theme.accent}`,
            borderTopLeftRadius: 4,
            opacity: 0.7,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            width: 64,
            height: 64,
            borderBottom: `2px solid ${theme.accent}`,
            borderRight: `2px solid ${theme.accent}`,
            borderBottomRightRadius: 4,
            opacity: 0.7,
            display: "flex",
          }}
        />
        {/* Layer 6: top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${theme.accent}, ${theme.accentSoft}, ${theme.accent}, transparent)`,
            display: "flex",
          }}
        />

        {/* Main 2-column layout: brand on left, artwork on right */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          {/* LEFT: brand identity column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: "1.1",
              paddingRight: 40,
            }}
          >
            {/* Top: ARTICLE eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: theme.accent,
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.36em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 2,
                  background: theme.accent,
                }}
              />
              ARTICLE
            </div>

            {/* Middle: BIG brand mark + wordmark */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: 156,
                  height: 156,
                  borderRadius: 36,
                  background: `linear-gradient(135deg, #ffffff 0%, ${theme.accentSoft} 100%)`,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 24px 60px -16px ${theme.glow}`,
                }}
              >
                <svg width="118" height="118" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 14h22v64h44v22H28V14Z" fill="#0b1d4a" />
                  <rect x="54" y="64" width="7" height="14" rx="1" fill="#1f3a8a" />
                  <rect x="63" y="56" width="7" height="22" rx="1" fill="#2563eb" />
                  <rect x="72" y="46" width="7" height="32" rx="1" fill="#38bdf8" />
                  <rect x="81" y="36" width="7" height="42" rx="1" fill="#7dd3fc" />
                  <path d="M16 100 Q 4 56 42 28 Q 82 4 108 22" fill="none" stroke="#1d4ed8" strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="106" cy="22" r="6" fill="#38bdf8" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: "72px",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: "#ffffff",
                  }}
                >
                  Solvora
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: theme.accentSoft,
                    letterSpacing: "0.32em",
                    fontWeight: 700,
                  }}
                >
                  STEM LEARNING HUB
                </span>
              </div>
              {/* Topic chip (single tag, short — replaces the full title) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: theme.chip,
                    color: theme.chipText,
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: theme.chipText,
                    }}
                  />
                  {category.toUpperCase()}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.8)",
                    letterSpacing: "0.04em",
                    border: `1px solid ${theme.accent}80`,
                    padding: "9px 16px",
                    borderRadius: 999,
                  }}
                >
                  #{topic}
                </div>
              </div>
            </div>

            {/* Bottom: author + date footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderTop: "1px solid rgba(255,255,255,0.18)",
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSoft})`,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  color: theme.chipText,
                  boxShadow: `0 6px 16px -4px ${theme.glow}`,
                }}
              >
                森
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff" }}>
                  {siteConfig.author}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}
                >
                  {date ? <span>{date}</span> : null}
                  {date && reading ? <span style={{ opacity: 0.5 }}>·</span> : null}
                  {reading ? <span>{reading}</span> : null}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: big article-specific artwork */}
          <div
            style={{
              display: "flex",
              flex: "0.9",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Subtle frame around artwork */}
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 24,
                height: 24,
                borderTop: `2px solid ${theme.accent}80`,
                borderRight: `2px solid ${theme.accent}80`,
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -10,
                left: -10,
                width: 24,
                height: 24,
                borderBottom: `2px solid ${theme.accent}80`,
                borderLeft: `2px solid ${theme.accent}80`,
                display: "flex",
              }}
            />
            <ArticleArtwork theme={theme} />
            {/* URL label below artwork */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: theme.accentSoft,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.28em",
                opacity: 0.75,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.accent,
                }}
              />
              YUTA-ENG.COM/BLOG
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: notoRegular, style: "normal", weight: 400 },
        { name: "Noto Sans JP", data: notoBold, style: "normal", weight: 700 },
      ],
    },
  );
}
