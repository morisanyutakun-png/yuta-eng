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
    bg: "linear-gradient(135deg, #02061b 0%, #0b1d4a 35%, #1e3a8a 75%, #1d4ed8 100%)",
    glow: "rgba(56,189,248,0.65)",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    chip: "#bae6fd",
    chipText: "#0b1d4a",
    motif: "physics",
  },
  Materials: {
    bg: "linear-gradient(135deg, #0c0a09 0%, #1c1917 35%, #92400e 75%, #f59e0b 100%)",
    glow: "rgba(251,191,36,0.65)",
    accent: "#fbbf24",
    accentSoft: "#fef3c7",
    chip: "#fef3c7",
    chipText: "#7c2d12",
    motif: "materials",
  },
  LaTeX: {
    bg: "linear-gradient(135deg, #020617 0%, #0c4a6e 40%, #0369a1 75%, #0ea5e9 100%)",
    glow: "rgba(125,211,252,0.65)",
    accent: "#7dd3fc",
    accentSoft: "#e0f2fe",
    chip: "#e0f2fe",
    chipText: "#0c4a6e",
    motif: "latex",
  },
  Education: {
    bg: "linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0f766e 75%, #14b8a6 100%)",
    glow: "rgba(94,234,212,0.65)",
    accent: "#5eead4",
    accentSoft: "#ccfbf1",
    chip: "#d1fae5",
    chipText: "#064e3b",
    motif: "education",
  },
};

const defaultAccent: AccentTheme = {
  bg: "linear-gradient(135deg, #02061b 0%, #0f172a 50%, #334155 100%)",
  glow: "rgba(186,230,253,0.5)",
  accent: "#7dd3fc",
  accentSoft: "#e2e8f0",
  chip: "#e2e8f0",
  chipText: "#0f172a",
  motif: "default",
};

type Params = { slug: string };

/** Centered, poster-style hero artwork (huge — dominates the canvas). */
function PosterArtwork({ theme }: { theme: AccentTheme }) {
  const stroke = theme.accent;
  const soft = theme.accentSoft;

  if (theme.motif === "physics") {
    // Atomic system: outer rings + 3 orbits + glowing nucleus + electrons
    return (
      <svg
        width="720"
        height="720"
        viewBox="0 0 720 720"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Far outer dashed ring */}
        <circle cx="360" cy="360" r="340" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        <circle cx="360" cy="360" r="290" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.25" />
        <circle cx="360" cy="360" r="240" stroke={stroke} strokeWidth="1.8" fill="none" opacity="0.4" strokeDasharray="3 7" />
        {/* 3 main orbits */}
        <ellipse cx="360" cy="360" rx="280" ry="108" stroke={stroke} strokeWidth="2.4" fill="none" opacity="0.9" />
        <ellipse cx="360" cy="360" rx="280" ry="108" stroke={stroke} strokeWidth="2.4" fill="none" opacity="0.9" transform="rotate(60 360 360)" />
        <ellipse cx="360" cy="360" rx="280" ry="108" stroke={stroke} strokeWidth="2.4" fill="none" opacity="0.9" transform="rotate(-60 360 360)" />
        {/* Glow halo behind nucleus */}
        <circle cx="360" cy="360" r="100" fill={stroke} opacity="0.22" />
        <circle cx="360" cy="360" r="70" fill={stroke} opacity="0.4" />
        {/* Nucleus core */}
        <circle cx="360" cy="360" r="56" fill={soft} opacity="0.96" />
        <circle cx="360" cy="360" r="56" stroke={stroke} strokeWidth="3" fill="none" opacity="0.7" />
        <circle cx="360" cy="360" r="28" fill={stroke} />
        {/* Electrons (5 around) */}
        <circle cx="640" cy="360" r="14" fill={soft} />
        <circle cx="640" cy="360" r="22" fill={soft} opacity="0.25" />
        <circle cx="445" cy="135" r="10" fill={soft} opacity="0.95" />
        <circle cx="195" cy="585" r="9" fill={soft} opacity="0.85" />
        <circle cx="555" cy="585" r="8" fill={soft} opacity="0.75" />
        <circle cx="170" cy="220" r="6" fill={soft} opacity="0.65" />
        {/* Particles scattered */}
        <circle cx="100" cy="120" r="3" fill={soft} opacity="0.85" />
        <circle cx="610" cy="80" r="3.5" fill={soft} opacity="0.8" />
        <circle cx="660" cy="610" r="3" fill={soft} opacity="0.7" />
        <circle cx="80" cy="640" r="2.5" fill={soft} opacity="0.6" />
        <circle cx="380" cy="60" r="2" fill={soft} opacity="0.5" />
      </svg>
    );
  }

  if (theme.motif === "latex") {
    // Massive curly braces + integral curve + sigma symbol
    return (
      <svg
        width="720"
        height="720"
        viewBox="0 0 720 720"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Outer dashed ring */}
        <circle cx="360" cy="360" r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        {/* Big left brace */}
        <path
          d="M 180 80 Q 70 80 70 270 Q 70 340 30 360 Q 70 380 70 450 Q 70 640 180 640"
          stroke={soft}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          opacity="0.92"
        />
        {/* Big right brace */}
        <path
          d="M 540 80 Q 650 80 650 270 Q 650 340 690 360 Q 650 380 650 450 Q 650 640 540 640"
          stroke={soft}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          opacity="0.92"
        />
        {/* Inner integral swoop */}
        <path
          d="M 280 180 Q 330 240 320 360 Q 310 480 380 560"
          stroke={stroke}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Sigma triangle */}
        <path
          d="M 410 240 L 510 240 L 440 360 L 510 480 L 410 480"
          stroke={stroke}
          strokeWidth="4.5"
          fill="none"
          strokeLinejoin="round"
          opacity="0.75"
        />
        {/* Center dot accent */}
        <circle cx="360" cy="360" r="10" fill={stroke} opacity="0.85" />
        <circle cx="360" cy="360" r="22" stroke={stroke} strokeWidth="2" fill="none" opacity="0.5" />
        {/* Code underline particles */}
        <circle cx="120" cy="700" r="3" fill={stroke} opacity="0.5" />
        <circle cx="600" cy="700" r="3" fill={stroke} opacity="0.5" />
      </svg>
    );
  }

  if (theme.motif === "materials") {
    // Document layers + AI sparkles + connection accents
    return (
      <svg
        width="720"
        height="720"
        viewBox="0 0 720 720"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Ring backdrop */}
        <circle cx="360" cy="360" r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.22" strokeDasharray="2 8" />
        {/* Doc layer 3 (back, tilted right) */}
        <rect x="270" y="160" width="280" height="380" rx="18" fill={soft} opacity="0.18" stroke={stroke} strokeWidth="1.8" transform="rotate(6 410 350)" />
        {/* Doc layer 2 (middle) */}
        <rect x="220" y="140" width="280" height="380" rx="18" fill={soft} opacity="0.3" stroke={stroke} strokeWidth="2.2" />
        {/* Doc layer 1 (front, tilted left) */}
        <rect x="170" y="160" width="280" height="380" rx="18" fill={soft} opacity="0.5" stroke={stroke} strokeWidth="2.6" transform="rotate(-6 310 350)" />
        {/* Front doc content lines */}
        <g transform="rotate(-6 310 350)">
          <line x1="200" y1="210" x2="420" y2="210" stroke={stroke} strokeWidth="3" opacity="0.9" />
          <line x1="200" y1="245" x2="400" y2="245" stroke={stroke} strokeWidth="3" opacity="0.7" />
          <line x1="200" y1="280" x2="380" y2="280" stroke={stroke} strokeWidth="3" opacity="0.55" />
          {/* Inner code/formula box */}
          <rect x="200" y="320" width="240" height="120" rx="10" fill={stroke} opacity="0.4" />
          <rect x="200" y="320" width="240" height="120" rx="10" stroke={stroke} strokeWidth="2.5" fill="none" opacity="0.7" />
          <line x1="220" y1="358" x2="320" y2="358" stroke={soft} strokeWidth="3" opacity="0.95" />
          <line x1="220" y1="382" x2="380" y2="382" stroke={soft} strokeWidth="3" opacity="0.85" />
          <line x1="220" y1="406" x2="300" y2="406" stroke={soft} strokeWidth="3" opacity="0.75" />
          {/* Footer lines */}
          <line x1="200" y1="470" x2="380" y2="470" stroke={stroke} strokeWidth="2.5" opacity="0.5" />
          <line x1="200" y1="500" x2="320" y2="500" stroke={stroke} strokeWidth="2.5" opacity="0.35" />
        </g>
        {/* Big sparkle (AI mark) top-right */}
        <path d="M 580 110 l 9 22 l 22 9 l -22 9 l -9 22 l -9 -22 l -22 -9 l 22 -9 z" fill={soft} opacity="0.95" />
        <circle cx="585" cy="138" r="4" fill={stroke} />
        {/* Smaller sparkles */}
        <path d="M 100 140 l 5 14 l 14 5 l -14 5 l -5 14 l -5 -14 l -14 -5 l 14 -5 z" fill={soft} opacity="0.7" />
        <path d="M 620 600 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 z" fill={soft} opacity="0.6" />
        <path d="M 80 600 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill={soft} opacity="0.5" />
      </svg>
    );
  }

  if (theme.motif === "education") {
    // Big learning network — 9 nodes
    return (
      <svg
        width="720"
        height="720"
        viewBox="0 0 720 720"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "flex" }}
      >
        {/* Outer ring */}
        <circle cx="360" cy="360" r="330" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.25" strokeDasharray="2 8" />
        <circle cx="360" cy="360" r="260" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.35" />
        {/* Connection lines */}
        <g stroke={stroke} strokeWidth="2" opacity="0.7" strokeDasharray="3 6" fill="none">
          <line x1="180" y1="240" x2="360" y2="100" />
          <line x1="360" y1="100" x2="540" y2="240" />
          <line x1="180" y1="240" x2="360" y2="360" />
          <line x1="540" y1="240" x2="360" y2="360" />
          <line x1="360" y1="360" x2="200" y2="540" />
          <line x1="360" y1="360" x2="520" y2="540" />
          <line x1="200" y1="540" x2="520" y2="540" />
          <line x1="360" y1="100" x2="360" y2="360" />
          <line x1="100" y1="380" x2="360" y2="360" />
          <line x1="620" y1="380" x2="360" y2="360" />
        </g>
        {/* Outer satellite nodes */}
        <circle cx="180" cy="240" r="24" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="540" cy="240" r="24" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="200" cy="540" r="22" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="520" cy="540" r="22" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="100" cy="380" r="14" fill={soft} stroke={stroke} strokeWidth="2.5" />
        <circle cx="620" cy="380" r="14" fill={soft} stroke={stroke} strokeWidth="2.5" />
        {/* Top highlight node */}
        <circle cx="360" cy="100" r="34" fill={stroke} stroke={soft} strokeWidth="3" />
        <circle cx="360" cy="100" r="14" fill={soft} />
        {/* Center hub (big) */}
        <circle cx="360" cy="360" r="80" fill={soft} opacity="0.25" />
        <circle cx="360" cy="360" r="60" fill={soft} opacity="0.95" />
        <circle cx="360" cy="360" r="60" stroke={stroke} strokeWidth="3.5" fill="none" />
        <circle cx="360" cy="360" r="30" fill={stroke} />
        <circle cx="360" cy="360" r="12" fill={soft} />
      </svg>
    );
  }

  // default — concentric rings
  return (
    <svg
      width="720"
      height="720"
      viewBox="0 0 720 720"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "flex" }}
    >
      <circle cx="360" cy="360" r="320" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" />
      <circle cx="360" cy="360" r="240" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" />
      <circle cx="360" cy="360" r="160" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" />
      <circle cx="360" cy="360" r="80" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.4" />
      <circle cx="360" cy="360" r="50" fill={soft} opacity="0.95" />
      <circle cx="360" cy="360" r="22" fill={stroke} />
    </svg>
  );
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const category = post?.category ?? "Solvora";
  const theme = categoryAccent[category] ?? defaultAccent;
  const date = post?.formattedDate ?? "";

  const [notoBold] = await Promise.all([
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

        {/* Layer 3: huge centered glow behind artwork */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.glow}, transparent 65%)`,
            display: "flex",
          }}
        />

        {/* Layer 4: top-right secondary glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 540,
            height: 540,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(186,230,253,0.18), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Layer 5: top accent gradient line */}
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
        {/* Layer 6: bottom accent gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
            opacity: 0.6,
            display: "flex",
          }}
        />

        {/* Layer 7: corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            width: 72,
            height: 72,
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
            top: 36,
            right: 36,
            width: 72,
            height: 72,
            borderTop: `2px solid ${theme.accent}`,
            borderRight: `2px solid ${theme.accent}`,
            borderTopRightRadius: 4,
            opacity: 0.7,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: 36,
            width: 72,
            height: 72,
            borderBottom: `2px solid ${theme.accent}`,
            borderLeft: `2px solid ${theme.accent}`,
            borderBottomLeftRadius: 4,
            opacity: 0.7,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 36,
            width: 72,
            height: 72,
            borderBottom: `2px solid ${theme.accent}`,
            borderRight: `2px solid ${theme.accent}`,
            borderBottomRightRadius: 4,
            opacity: 0.7,
            display: "flex",
          }}
        />

        {/* CENTER: huge poster artwork (dominates the canvas) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PosterArtwork theme={theme} />
        </div>

        {/* TOP-LEFT: tiny brand mark + Solvora wordmark */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 70,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.accentSoft} 100%)`,
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 6px 18px -6px ${theme.glow}`,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 14h22v64h44v22H28V14Z" fill="#0b1d4a" />
              <rect x="54" y="64" width="7" height="14" rx="1" fill="#1f3a8a" />
              <rect x="63" y="56" width="7" height="22" rx="1" fill="#2563eb" />
              <rect x="72" y="46" width="7" height="32" rx="1" fill="#38bdf8" />
              <rect x="81" y="36" width="7" height="42" rx="1" fill="#7dd3fc" />
              <path d="M16 100 Q 4 56 42 28 Q 82 4 108 22" fill="none" stroke="#1d4ed8" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="106" cy="22" r="6" fill="#38bdf8" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "0.04em",
              color: "#ffffff",
            }}
          >
            Solvora
          </span>
        </div>

        {/* TOP-RIGHT: category chip only (tiny, no title) */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 70,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: theme.chip,
            color: theme.chipText,
            padding: "10px 20px",
            borderRadius: 999,
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            boxShadow: `0 6px 18px -6px ${theme.glow}`,
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

        {/* BOTTOM-LEFT: tiny date + author initial */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 70,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentSoft})`,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
              color: theme.chipText,
            }}
          >
            森
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>
              {siteConfig.author}
            </span>
            {date ? (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.04em",
                }}
              >
                {date}
              </span>
            ) : null}
          </div>
        </div>

        {/* BOTTOM-RIGHT: URL ribbon */}
        <div
          style={{
            position: "absolute",
            bottom: 70,
            right: 70,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: theme.accentSoft,
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.28em",
            opacity: 0.85,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: theme.accent,
            }}
          />
          YUTA-ENG.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans JP", data: notoBold, style: "normal", weight: 700 },
      ],
    },
  );
}
