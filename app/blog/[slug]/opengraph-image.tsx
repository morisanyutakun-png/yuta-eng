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
    bg: "linear-gradient(135deg, #020617 0%, #0b1d4a 35%, #1e3a8a 70%, #1d4ed8 100%)",
    glow: "rgba(56,189,248,0.55)",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    chip: "#bae6fd",
    chipText: "#0b1d4a",
    motif: "physics",
  },
  Materials: {
    bg: "linear-gradient(135deg, #0c0a09 0%, #1c1917 35%, #92400e 75%, #f59e0b 100%)",
    glow: "rgba(251,191,36,0.55)",
    accent: "#fbbf24",
    accentSoft: "#fef3c7",
    chip: "#fef3c7",
    chipText: "#7c2d12",
    motif: "materials",
  },
  LaTeX: {
    bg: "linear-gradient(135deg, #020617 0%, #0c4a6e 40%, #0369a1 75%, #0ea5e9 100%)",
    glow: "rgba(125,211,252,0.55)",
    accent: "#7dd3fc",
    accentSoft: "#e0f2fe",
    chip: "#e0f2fe",
    chipText: "#0c4a6e",
    motif: "latex",
  },
  Education: {
    bg: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0f766e 75%, #14b8a6 100%)",
    glow: "rgba(94,234,212,0.55)",
    accent: "#5eead4",
    accentSoft: "#ccfbf1",
    chip: "#d1fae5",
    chipText: "#064e3b",
    motif: "education",
  },
};

const defaultAccent: AccentTheme = {
  bg: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #334155 100%)",
  glow: "rgba(186,230,253,0.4)",
  accent: "#7dd3fc",
  accentSoft: "#e2e8f0",
  chip: "#e2e8f0",
  chipText: "#0f172a",
  motif: "default",
};

type Params = { slug: string };

/** Per-category decorative SVG motif painted in top-right and bottom-left.
 *  Vector primitives compress well in AVIF/WebP, keeping files <30KB. */
function CategoryMotif({ theme }: { theme: AccentTheme }) {
  const stroke = theme.accent;
  const soft = theme.accentSoft;

  if (theme.motif === "physics") {
    // Atomic orbits + sine wave (shapes only, no text — Satori limitation)
    return (
      <svg
        width="640"
        height="640"
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: -120, right: -120, opacity: 0.55 }}
      >
        <ellipse cx="320" cy="320" rx="240" ry="90" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.75" />
        <ellipse cx="320" cy="320" rx="240" ry="90" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.75" transform="rotate(60 320 320)" />
        <ellipse cx="320" cy="320" rx="240" ry="90" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.75" transform="rotate(-60 320 320)" />
        <circle cx="320" cy="320" r="28" fill={soft} opacity="0.95" />
        <circle cx="320" cy="320" r="60" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.5" />
        <circle cx="560" cy="320" r="6" fill={soft} />
        <circle cx="80" cy="320" r="4" fill={stroke} opacity="0.7" />
        <circle cx="500" cy="180" r="3" fill={soft} opacity="0.8" />
        <circle cx="160" cy="480" r="3" fill={soft} opacity="0.6" />
        {/* Sine wave (top-left vibe) */}
        <path
          d="M 40 120 Q 80 80 120 120 T 200 120 T 280 120 T 360 120"
          stroke={stroke}
          strokeWidth="1.6"
          fill="none"
          opacity="0.45"
        />
      </svg>
    );
  }

  if (theme.motif === "latex") {
    // LaTeX brackets + sine waves (shapes only)
    return (
      <svg
        width="640"
        height="640"
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: -100, right: -160, opacity: 0.5 }}
      >
        {/* Big curly bracket left side, drawn as path */}
        <path
          d="M 120 80 Q 60 80 60 200 Q 60 280 30 280 Q 60 280 60 360 Q 60 480 120 480"
          stroke={soft}
          strokeWidth="3"
          fill="none"
          opacity="0.55"
        />
        {/* Big curly bracket right side */}
        <path
          d="M 460 80 Q 520 80 520 200 Q 520 280 550 280 Q 520 280 520 360 Q 520 480 460 480"
          stroke={soft}
          strokeWidth="3"
          fill="none"
          opacity="0.55"
        />
        {/* Inner integral-like swoop */}
        <path
          d="M 220 160 Q 250 200 240 280 Q 230 360 280 400"
          stroke={stroke}
          strokeWidth="2.2"
          fill="none"
          opacity="0.7"
        />
        {/* Code-style underlines */}
        <line x1="80" y1="540" x2="540" y2="540" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <line x1="80" y1="570" x2="380" y2="570" stroke={stroke} strokeWidth="1.5" opacity="0.25" />
        <circle cx="540" cy="540" r="3" fill={stroke} opacity="0.6" />
        <circle cx="380" cy="570" r="3" fill={stroke} opacity="0.4" />
      </svg>
    );
  }

  if (theme.motif === "materials") {
    // Document layers + AI sparkles
    return (
      <svg
        width="640"
        height="640"
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: -60, right: -100, opacity: 0.55 }}
      >
        <rect x="200" y="120" width="240" height="320" rx="14" fill={soft} opacity="0.18" stroke={stroke} strokeWidth="1.5" />
        <rect x="170" y="100" width="240" height="320" rx="14" fill={soft} opacity="0.22" stroke={stroke} strokeWidth="1.5" />
        <rect x="140" y="80" width="240" height="320" rx="14" fill={soft} opacity="0.32" stroke={stroke} strokeWidth="1.6" />
        <line x1="160" y1="130" x2="340" y2="130" stroke={stroke} strokeWidth="2" opacity="0.6" />
        <line x1="160" y1="160" x2="320" y2="160" stroke={stroke} strokeWidth="2" opacity="0.45" />
        <line x1="160" y1="190" x2="300" y2="190" stroke={stroke} strokeWidth="2" opacity="0.3" />
        <rect x="160" y="220" width="180" height="80" rx="6" fill={stroke} opacity="0.35" />
        {/* Sparkles */}
        <path d="M 460 80 l 5 14 l 14 5 l -14 5 l -5 14 l -5 -14 l -14 -5 l 14 -5 z" fill={soft} opacity="0.85" />
        <path d="M 80 460 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill={soft} opacity="0.6" />
      </svg>
    );
  }

  if (theme.motif === "education") {
    // Connected nodes (learning network)
    return (
      <svg
        width="640"
        height="640"
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: -80, right: -120, opacity: 0.55 }}
      >
        <line x1="160" y1="200" x2="320" y2="120" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <line x1="320" y1="120" x2="480" y2="220" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <line x1="160" y1="200" x2="240" y2="380" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <line x1="320" y1="120" x2="240" y2="380" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <line x1="480" y1="220" x2="400" y2="400" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <line x1="240" y1="380" x2="400" y2="400" stroke={stroke} strokeWidth="1.5" opacity="0.6" strokeDasharray="3 5" />
        <circle cx="160" cy="200" r="14" fill={soft} stroke={stroke} strokeWidth="2" />
        <circle cx="320" cy="120" r="22" fill={stroke} stroke={soft} strokeWidth="2" />
        <circle cx="480" cy="220" r="14" fill={soft} stroke={stroke} strokeWidth="2" />
        <circle cx="240" cy="380" r="14" fill={soft} stroke={stroke} strokeWidth="2" />
        <circle cx="400" cy="400" r="18" fill={stroke} stroke={soft} strokeWidth="2" opacity="0.85" />
      </svg>
    );
  }

  return (
    <svg
      width="640"
      height="640"
      viewBox="0 0 640 640"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: -100, right: -100, opacity: 0.4 }}
    >
      <circle cx="320" cy="320" r="200" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.5" />
      <circle cx="320" cy="320" r="140" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.4" />
      <circle cx="320" cy="320" r="80" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.35" />
    </svg>
  );
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Solvora ブログ";
  const description = post?.description ?? siteConfig.description;
  const category = post?.category ?? "Solvora";
  const theme = categoryAccent[category] ?? defaultAccent;
  const date = post?.formattedDate ?? "";
  const reading = post?.readingTime ?? "";

  const displayTitle = title.length > 60 ? title.slice(0, 58) + "…" : title;
  const displayDesc =
    description.length > 110 ? description.slice(0, 108) + "…" : description;

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
        {/* Layer 1: blueprint micro-grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />
        {/* Layer 2: large grid blueprint accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "192px 192px",
            display: "flex",
          }}
        />

        {/* Layer 3: top-right primary glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Layer 4: bottom-left secondary glow */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(186,230,253,0.18), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Layer 5: category-specific decorative motif */}
        <CategoryMotif theme={theme} />

        {/* Layer 6: top-left accent corner bracket */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            width: 60,
            height: 60,
            borderTop: `2px solid ${theme.accent}`,
            borderLeft: `2px solid ${theme.accent}`,
            borderTopLeftRadius: 4,
            opacity: 0.65,
            display: "flex",
          }}
        />
        {/* Layer 7: bottom-right accent corner bracket */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            width: 60,
            height: 60,
            borderBottom: `2px solid ${theme.accent}`,
            borderRight: `2px solid ${theme.accent}`,
            borderBottomRightRadius: 4,
            opacity: 0.65,
            display: "flex",
          }}
        />

        {/* Layer 8: top accent line */}
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

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Top: brand + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              {/* Solvora L mark with glow ring */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, #ffffff 0%, ${theme.accentSoft} 100%)`,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 8px 24px -8px ${theme.glow}`,
                }}
              >
                <svg width="48" height="48" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <path d="M28 14h22v64h44v22H28V14Z" fill="#0b1d4a" />
                  <rect x="54" y="64" width="7" height="14" rx="1" fill="#1f3a8a" />
                  <rect x="63" y="56" width="7" height="22" rx="1" fill="#2563eb" />
                  <rect x="72" y="46" width="7" height="32" rx="1" fill="#38bdf8" />
                  <rect x="81" y="36" width="7" height="42" rx="1" fill="#7dd3fc" />
                  <path d="M16 100 Q 4 56 42 28 Q 82 4 108 22" fill="none" stroke="#1d4ed8" strokeWidth="2.6" strokeLinecap="round" />
                  <circle cx="106" cy="22" r="6" fill="#38bdf8" />
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "0.04em" }}>
                  SOLVORA
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: theme.accentSoft,
                    letterSpacing: "0.28em",
                    fontWeight: 700,
                  }}
                >
                  STEM LEARNING HUB
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: theme.chip,
                color: theme.chipText,
                padding: "12px 22px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.18em",
                boxShadow: `0 8px 22px -8px ${theme.glow}`,
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
          </div>

          {/* Middle: title + description with accent rule */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "1080px" }}>
            {/* Decorative accent rule above title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                color: theme.accent,
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.32em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 56,
                  height: 2,
                  background: theme.accent,
                }}
              />
              ARTICLE
            </div>
            <h1
              style={{
                fontSize: title.length > 36 ? "54px" : "64px",
                lineHeight: 1.26,
                fontWeight: 800,
                letterSpacing: "-0.012em",
                margin: 0,
                textShadow: `0 4px 18px rgba(0,0,0,0.35)`,
              }}
            >
              {displayTitle}
            </h1>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.85)",
                margin: 0,
                maxWidth: "960px",
                fontWeight: 500,
              }}
            >
              {displayDesc}
            </p>
          </div>

          {/* Bottom: meta strip with author + URL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.18)",
              paddingTop: 22,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Author initial avatar */}
              <div
                style={{
                  display: "flex",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSoft})`,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: theme.chipText,
                  boxShadow: `0 4px 12px -4px ${theme.glow}`,
                }}
              >
                森
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>
                  {siteConfig.author}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  {date ? <span>{date}</span> : null}
                  {date && reading ? <span style={{ opacity: 0.5 }}>·</span> : null}
                  {reading ? <span>{reading}</span> : null}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: theme.accentSoft,
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.22em",
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 8,
                  height: 8,
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
