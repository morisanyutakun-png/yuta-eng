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
  /** Secondary radial glow color used in the top-right corner (different hue from `glow` for chromatic depth). */
  secondaryGlow: string;
  /** Tertiary radial glow used in the bottom-left for a three-color composition. */
  tertiaryGlow: string;
  accent: string;
  accentSoft: string;
  /** Pop / contrast color used for sparkle dots — chosen complementary to `accent`. */
  pop: string;
  chip: string;
  chipText: string;
  motif: "physics" | "materials" | "latex" | "education" | "default";
};

// Each gradient mixes 4–5 distinct hues so the thumbnails read as vivid
// multi-color compositions instead of monochromatic blue/amber washes.
const categoryAccent: Record<string, AccentTheme> = {
  Physics: {
    // midnight → indigo → violet → fuchsia → cyan (clear hue rotation, not just blue shades)
    bg: "linear-gradient(135deg, #020617 0%, #1e1b4b 20%, #4338ca 42%, #c026d3 68%, #38bdf8 100%)",
    glow: "rgba(56,189,248,0.7)",
    secondaryGlow: "rgba(192,38,211,0.55)",
    tertiaryGlow: "rgba(167,139,250,0.45)",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    pop: "#f472b6",
    chip: "#bae6fd",
    chipText: "#0b1d4a",
    motif: "physics",
  },
  Materials: {
    // dark espresso → mahogany → amber → coral → tangerine
    bg: "linear-gradient(135deg, #1a0a01 0%, #4a1d05 22%, #92400e 48%, #f59e0b 76%, #fb923c 100%)",
    glow: "rgba(251,191,36,0.7)",
    secondaryGlow: "rgba(251,113,133,0.5)",
    tertiaryGlow: "rgba(125,211,252,0.3)",
    accent: "#fbbf24",
    accentSoft: "#fef3c7",
    pop: "#fb7185",
    chip: "#fef3c7",
    chipText: "#7c2d12",
    motif: "materials",
  },
  LaTeX: {
    // navy → indigo → violet → magenta → cyan (AI / sci-fi feel)
    bg: "linear-gradient(135deg, #020617 0%, #1e1b4b 20%, #4c1d95 42%, #be185d 70%, #06b6d4 100%)",
    glow: "rgba(167,139,250,0.7)",
    secondaryGlow: "rgba(244,114,182,0.55)",
    tertiaryGlow: "rgba(34,211,238,0.5)",
    accent: "#c4b5fd",
    accentSoft: "#ede9fe",
    pop: "#22d3ee",
    chip: "#ede9fe",
    chipText: "#3b0764",
    motif: "latex",
  },
  Education: {
    // dark forest → teal → emerald → lime with a warm yellow pop
    bg: "linear-gradient(135deg, #022c22 0%, #064e3b 22%, #0f766e 48%, #10b981 75%, #84cc16 100%)",
    glow: "rgba(94,234,212,0.7)",
    secondaryGlow: "rgba(253,224,71,0.5)",
    tertiaryGlow: "rgba(244,114,182,0.3)",
    accent: "#5eead4",
    accentSoft: "#ccfbf1",
    pop: "#fde047",
    chip: "#d1fae5",
    chipText: "#064e3b",
    motif: "education",
  },
};

const defaultAccent: AccentTheme = {
  bg: "linear-gradient(135deg, #02061b 0%, #1e1b4b 35%, #5b21b6 70%, #06b6d4 100%)",
  glow: "rgba(186,230,253,0.55)",
  secondaryGlow: "rgba(244,114,182,0.45)",
  tertiaryGlow: "rgba(94,234,212,0.4)",
  accent: "#7dd3fc",
  accentSoft: "#e2e8f0",
  pop: "#f472b6",
  chip: "#e2e8f0",
  chipText: "#0f172a",
  motif: "default",
};

type Params = { slug: string };

/** Map a slug to a per-article diagram key based on content keywords. */
function getDiagramKey(slug: string): string {
  if (slug.includes("simple-harmonic-motion") || slug.includes("pendulum")) return "pendulum";
  if (slug.includes("circular-motion") || slug.includes("centripetal")) return "orbit";
  if (slug.includes("doppler")) return "doppler";
  if (slug.includes("electromagnetism")) return "field";
  if (slug.includes("uniform-acceleration") || slug.includes("equations-of")) return "vtgraph";
  if (slug.includes("chatgpt") || slug.includes("prompt")) return "prompt";
  // AI × LaTeX tool-set article: a richer diagram showing the 5-feature toolkit
  // (math, table, figure, similar problems, PDF) radiating from an AI core.
  if (slug.includes("ai-tools") || slug.includes("templates-guide")) return "aitoolset";
  if (slug.includes("latex") || slug.includes("overleaf")) return "latex";
  if (slug.includes("retrieval-practice") || slug.includes("learning-design")) return "memory";
  if (slug.includes("personalized-learning")) return "paths";
  if (slug.includes("common-test")) return "exam";
  if (slug.includes("teaching-material") || slug.includes("tools-comparison")) return "tools";
  if (slug.includes("physics-material-creation")) return "book";
  return theme_motif_default(slug);
}
function theme_motif_default(_slug: string) {
  return "default";
}

/** Article-specific diagram, dispatched by slug. */
function ArticleDiagram({ slug, theme }: { slug: string; theme: AccentTheme }) {
  const key = getDiagramKey(slug);
  // Fallback to category motif when no slug-specific diagram is defined.
  if (key === "default") return <PosterArtwork theme={theme} />;

  const stroke = theme.accent;
  const soft = theme.accentSoft;
  const W = 720;
  const H = 720;
  const cx = 360;
  const cy = 360;

  if (key === "pendulum") {
    // Spring oscillator + pendulum + sine wave (simple harmonic motion)
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        {/* Top mounting bar */}
        <line x1="120" y1="80" x2="600" y2="80" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="60" x2="120" y2="100" stroke={stroke} strokeWidth="2" />
        <line x1="600" y1="60" x2="600" y2="100" stroke={stroke} strokeWidth="2" />
        {/* Pendulum (left) — string + bob */}
        <line x1="240" y1="80" x2="200" y2="380" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
        <line x1="240" y1="80" x2="280" y2="380" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" opacity="0.4" strokeDasharray="3 5" />
        <circle cx="200" cy="380" r="32" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="200" cy="380" r="14" fill={stroke} />
        {/* Arc trace */}
        <path d="M 200 380 Q 240 410 280 380" stroke={stroke} strokeWidth="1.8" fill="none" opacity="0.55" strokeDasharray="2 6" />
        <path d="M 215 380 a 25 25 0 0 1 50 0" stroke={stroke} strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Spring (right) — coil + mass */}
        <line x1="500" y1="80" x2="500" y2="120" stroke={stroke} strokeWidth="2.4" />
        <path d="M 500 120 L 470 140 L 530 160 L 470 180 L 530 200 L 470 220 L 530 240 L 470 260 L 530 280 L 500 300" stroke={stroke} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="500" y1="300" x2="500" y2="340" stroke={stroke} strokeWidth="2.4" />
        <rect x="450" y="340" width="100" height="70" rx="8" fill={soft} stroke={stroke} strokeWidth="3" />
        <line x1="475" y1="370" x2="525" y2="370" stroke={stroke} strokeWidth="2" opacity="0.7" />
        <line x1="475" y1="386" x2="525" y2="386" stroke={stroke} strokeWidth="2" opacity="0.5" />
        {/* Velocity arrows */}
        <path d="M 410 375 L 440 375 M 432 369 L 440 375 L 432 381" stroke={stroke} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 590 375 L 560 375 M 568 369 L 560 375 L 568 381" stroke={stroke} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* Sine wave at bottom — represents x(t) */}
        <path d="M 60 580 Q 105 530 150 580 T 240 580 T 330 580 T 420 580 T 510 580 T 600 580 T 690 580" stroke={stroke} strokeWidth="3" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 60 580 Q 105 530 150 580 T 240 580 T 330 580 T 420 580 T 510 580 T 600 580 T 690 580" stroke={soft} strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
        {/* Time axis */}
        <line x1="60" y1="640" x2="690" y2="640" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <circle cx="150" cy="580" r="5" fill={soft} />
        <circle cx="330" cy="580" r="5" fill={soft} />
        <circle cx="510" cy="580" r="5" fill={soft} />
      </svg>
    );
  }

  if (key === "orbit") {
    // Circular motion + centripetal force vector + velocity tangent
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        {/* Outer rings */}
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        <circle cx={cx} cy={cy} r="240" stroke={stroke} strokeWidth="2" fill="none" opacity="0.55" strokeDasharray="6 6" />
        {/* Main orbit circle */}
        <circle cx={cx} cy={cy} r="200" stroke={stroke} strokeWidth="3" fill="none" opacity="0.95" />
        {/* Glow center */}
        <circle cx={cx} cy={cy} r="48" fill={stroke} opacity="0.3" />
        <circle cx={cx} cy={cy} r="28" fill={soft} opacity="0.95" />
        <circle cx={cx} cy={cy} r="14" fill={stroke} />
        {/* Object on orbit (top-right) */}
        <circle cx="500" cy="220" r="22" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="500" cy="220" r="9" fill={stroke} />
        {/* Centripetal force vector (object → center) */}
        <line x1="500" y1="220" x2={cx + 16} y2={cy - 8} stroke={stroke} strokeWidth="3.4" strokeLinecap="round" />
        <path d={`M ${cx + 16} ${cy - 8} L ${cx + 30} ${cy - 18} L ${cx + 24} ${cy + 4} Z`} fill={stroke} />
        {/* Velocity vector (tangent) */}
        <line x1="500" y1="220" x2="640" y2="280" stroke={soft} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M 640 280 L 632 268 L 628 290 Z" fill={soft} />
        {/* r label line (radius) */}
        <line x1={cx} y1={cy} x2="500" y2="220" stroke={stroke} strokeWidth="1.6" opacity="0.4" strokeDasharray="4 6" />
        {/* Other orbiting objects */}
        <circle cx="160" cy="360" r="14" fill={soft} opacity="0.85" />
        <circle cx="360" cy="560" r="12" fill={soft} opacity="0.75" />
        <circle cx="220" cy="500" r="9" fill={soft} opacity="0.65" />
        {/* Decorative angular ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = cx + 200 * Math.cos(a);
          const y1 = cy + 200 * Math.sin(a);
          const x2 = cx + 220 * Math.cos(a);
          const y2 = cy + 220 * Math.sin(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="2" opacity="0.5" />;
        })}
      </svg>
    );
  }

  if (key === "doppler") {
    // Moving sound source + concentric wavefronts compressed forward
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        {/* Source position trail (left → right) */}
        <line x1="100" y1={cy} x2="620" y2={cy} stroke={stroke} strokeWidth="1.5" opacity="0.4" strokeDasharray="3 6" />
        {/* Wavefronts — circles emitted at past positions, expanded over time.
            Each earlier emission is larger and centered further left. Compression in front of source. */}
        {[
          { x: 200, r: 220, op: 0.18 },
          { x: 240, r: 180, op: 0.28 },
          { x: 280, r: 150, op: 0.4 },
          { x: 320, r: 120, op: 0.55 },
          { x: 360, r: 90, op: 0.7 },
          { x: 400, r: 60, op: 0.85 },
        ].map((w, i) => (
          <circle key={i} cx={w.x} cy={cy} r={w.r} stroke={stroke} strokeWidth="2.2" fill="none" opacity={w.op} />
        ))}
        {/* Source (moving right) */}
        <circle cx="440" cy={cy} r="26" fill={soft} stroke={stroke} strokeWidth="3" />
        <path d="M 432 350 L 432 370 L 442 360 Z M 444 350 L 444 370 L 454 360 Z" fill={stroke} />
        {/* Velocity arrow */}
        <line x1="475" y1={cy} x2="540" y2={cy} stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M 540 360 L 528 352 L 528 368 Z" fill={stroke} />
        {/* Observer on right (compressed waves) */}
        <g>
          <circle cx="640" cy={cy} r="20" fill={stroke} opacity="0.85" />
          <circle cx="640" cy={cy} r="10" fill={soft} />
          <line x1="630" y1="328" x2="650" y2="328" stroke={soft} strokeWidth="2" strokeLinecap="round" />
          <line x1="635" y1="318" x2="645" y2="318" stroke={soft} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
        {/* Frequency indicator — high freq sine top-right */}
        <path d="M 540 200 Q 555 180 570 200 T 600 200 T 630 200 T 660 200 T 690 200" stroke={stroke} strokeWidth="2.2" fill="none" opacity="0.7" />
        {/* Frequency indicator — low freq sine bottom-left */}
        <path d="M 60 540 Q 95 510 130 540 T 200 540 T 270 540" stroke={stroke} strokeWidth="2.2" fill="none" opacity="0.5" />
      </svg>
    );
  }

  if (key === "field") {
    // E-field + B-field grid with arrows (electromagnetism)
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Charge in center */}
        <circle cx={cx} cy={cy} r="42" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx={cx} cy={cy} r="42" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" strokeDasharray="3 4" />
        {/* Plus sign */}
        <line x1={cx - 16} y1={cy} x2={cx + 16} y2={cy} stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cy - 16} x2={cx} y2={cy + 16} stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        {/* Radial E-field lines (8 directions) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          const x1 = cx + 60 * Math.cos(a);
          const y1 = cy + 60 * Math.sin(a);
          const x2 = cx + 280 * Math.cos(a);
          const y2 = cy + 280 * Math.sin(a);
          const ax = cx + 270 * Math.cos(a);
          const ay = cy + 270 * Math.sin(a);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="2.6" opacity="0.85" strokeLinecap="round" />
              <circle cx={ax} cy={ay} r="6" fill={stroke} />
            </g>
          );
        })}
        {/* B-field (concentric loops representing magnetic field) */}
        <circle cx={cx} cy={cy} r="180" stroke={soft} strokeWidth="2" fill="none" opacity="0.55" strokeDasharray="6 6" />
        <circle cx={cx} cy={cy} r="240" stroke={soft} strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="6 6" />
        {/* Curl indicators (B field circulation) */}
        <path d="M 540 360 a 12 12 0 1 1 0.1 0" stroke={soft} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 180 360 a 12 12 0 1 0 -0.1 0" stroke={soft} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 360 180 a 12 12 0 1 1 0.1 0" stroke={soft} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M 360 540 a 12 12 0 1 0 -0.1 0" stroke={soft} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (key === "vtgraph") {
    // v-t graph: axes, slope line, area under curve
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Grid */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`g${i}`} x1={120 + i * 60} y1="160" x2={120 + i * 60} y2="600" stroke={stroke} strokeWidth="1" opacity="0.18" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`gh${i}`} x1="120" y1={160 + i * 60} x2="640" y2={160 + i * 60} stroke={stroke} strokeWidth="1" opacity="0.18" />
        ))}
        {/* Axes */}
        <line x1="120" y1="600" x2="640" y2="600" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="600" x2="120" y2="140" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Arrow heads */}
        <path d="M 640 600 L 624 592 L 624 608 Z" fill={stroke} />
        <path d="M 120 140 L 112 156 L 128 156 Z" fill={stroke} />
        {/* v-t slope (linearly increasing v) */}
        <path d="M 120 540 L 600 220" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        {/* Area under curve = displacement (filled trapezoid) */}
        <path d="M 120 540 L 600 220 L 600 600 L 120 600 Z" fill={stroke} opacity="0.25" />
        <path d="M 120 540 L 600 220 L 600 600 L 120 600 Z" stroke={stroke} strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="3 5" />
        {/* v0 marker */}
        <circle cx="120" cy="540" r="8" fill={soft} stroke={stroke} strokeWidth="2" />
        {/* v marker at t */}
        <circle cx="600" cy="220" r="9" fill={soft} stroke={stroke} strokeWidth="3" />
        {/* Reference dashed line down */}
        <line x1="600" y1="220" x2="600" y2="600" stroke={stroke} strokeWidth="1.5" opacity="0.4" strokeDasharray="3 5" />
        <line x1="120" y1="220" x2="600" y2="220" stroke={stroke} strokeWidth="1.5" opacity="0.4" strokeDasharray="3 5" />
        {/* Decorative ticks */}
        <circle cx="120" cy="600" r="4" fill={stroke} />
        <circle cx="600" cy="600" r="5" fill={soft} />
      </svg>
    );
  }

  if (key === "prompt") {
    // AI prompt → answer flow with sparkles
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Prompt box (left) */}
        <rect x="100" y="220" width="220" height="280" rx="16" fill={soft} opacity="0.4" stroke={stroke} strokeWidth="2.4" />
        <line x1="120" y1="260" x2="280" y2="260" stroke={stroke} strokeWidth="2.6" opacity="0.85" />
        <line x1="120" y1="290" x2="260" y2="290" stroke={stroke} strokeWidth="2.6" opacity="0.65" />
        <line x1="120" y1="320" x2="240" y2="320" stroke={stroke} strokeWidth="2.6" opacity="0.5" />
        <rect x="120" y="350" width="180" height="40" rx="6" fill={stroke} opacity="0.45" />
        <line x1="138" y1="370" x2="240" y2="370" stroke={soft} strokeWidth="2.4" />
        {/* AI processing core (center) */}
        <circle cx={cx} cy={cy} r="80" fill={soft} opacity="0.25" />
        <circle cx={cx} cy={cy} r="56" fill={soft} stroke={stroke} strokeWidth="3" />
        <path d={`M ${cx} ${cy - 28} l 8 18 l 18 8 l -18 8 l -8 18 l -8 -18 l -18 -8 l 18 -8 z`} fill={stroke} />
        <circle cx={cx + 22} cy={cy + 22} r="5" fill={stroke} opacity="0.7" />
        {/* Output box (right) */}
        <rect x="400" y="200" width="220" height="320" rx="16" fill={soft} opacity="0.55" stroke={stroke} strokeWidth="2.4" />
        <line x1="420" y1="240" x2="600" y2="240" stroke={stroke} strokeWidth="2.6" />
        <line x1="420" y1="270" x2="580" y2="270" stroke={stroke} strokeWidth="2.6" opacity="0.8" />
        <line x1="420" y1="300" x2="560" y2="300" stroke={stroke} strokeWidth="2.6" opacity="0.65" />
        <rect x="420" y="330" width="180" height="60" rx="8" fill={stroke} opacity="0.45" />
        <line x1="438" y1="350" x2="540" y2="350" stroke={soft} strokeWidth="2.6" />
        <line x1="438" y1="370" x2="500" y2="370" stroke={soft} strokeWidth="2.6" opacity="0.7" />
        <line x1="420" y1="420" x2="560" y2="420" stroke={stroke} strokeWidth="2" opacity="0.55" />
        <line x1="420" y1="448" x2="540" y2="448" stroke={stroke} strokeWidth="2" opacity="0.4" />
        <line x1="420" y1="476" x2="500" y2="476" stroke={stroke} strokeWidth="2" opacity="0.3" />
        {/* Flow arrow */}
        <line x1="320" y1={cy} x2="400" y2={cy} stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
        <path d={`M 400 ${cy} L 388 ${cy - 8} L 388 ${cy + 8} Z`} fill={stroke} />
        {/* Sparkles */}
        <path d="M 90 140 l 6 16 l 16 6 l -16 6 l -6 16 l -6 -16 l -16 -6 l 16 -6 z" fill={soft} opacity="0.9" />
        <path d="M 600 580 l 5 14 l 14 5 l -14 5 l -5 14 l -5 -14 l -14 -5 l 14 -5 z" fill={soft} opacity="0.8" />
        <path d="M 660 130 l 4 10 l 10 4 l -10 4 l -4 10 l -4 -10 l -10 -4 l 10 -4 z" fill={soft} opacity="0.7" />
      </svg>
    );
  }

  if (key === "aitoolset") {
    // AI core in the middle, with 5 tool satellites: math (∫), table, chart,
    // problem doc (類題), PDF. Connecting lines + sparkle accents.
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        <circle cx={cx} cy={cy} r="240" stroke={stroke} strokeWidth="1.6" fill="none" opacity="0.32" strokeDasharray="4 8" />

        {/* Connection rays from center to each satellite */}
        {[
          { x: cx, y: 130 },        // top — math
          { x: 600, y: 240 },       // top-right — table
          { x: 600, y: 480 },       // bottom-right — chart
          { x: cx, y: 600 },        // bottom — problem doc
          { x: 120, y: 360 },       // left — PDF
        ].map((s, i) => (
          <line
            key={`ray-${i}`}
            x1={cx}
            y1={cy}
            x2={s.x}
            y2={s.y}
            stroke={stroke}
            strokeWidth="2"
            opacity="0.45"
            strokeDasharray="5 6"
          />
        ))}

        {/* Center AI core: glowing nucleus + 8-point sparkle */}
        <circle cx={cx} cy={cy} r="100" fill={stroke} opacity="0.25" />
        <circle cx={cx} cy={cy} r="74" fill={soft} opacity="0.95" />
        <circle cx={cx} cy={cy} r="74" stroke={stroke} strokeWidth="3" fill="none" opacity="0.7" />
        <path
          d={`M ${cx} ${cy - 44} l 12 28 l 28 12 l -28 12 l -12 28 l -12 -28 l -28 -12 l 28 -12 z`}
          fill={stroke}
        />
        <circle cx={cx + 30} cy={cy + 30} r="5" fill={stroke} opacity="0.7" />
        <circle cx={cx - 26} cy={cy - 28} r="3" fill={stroke} opacity="0.6" />

        {/* Satellite 1 (top): math integral ∫ */}
        <g>
          <circle cx={cx} cy="130" r="46" fill={soft} opacity="0.9" stroke={stroke} strokeWidth="3" />
          <path
            d={`M ${cx + 8} 100 Q ${cx + 16} 116 ${cx + 4} 130 Q ${cx - 8} 144 ${cx} 160`}
            stroke={stroke}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Satellite 2 (top-right): mini table */}
        <g>
          <circle cx="600" cy="240" r="46" fill={soft} opacity="0.9" stroke={stroke} strokeWidth="3" />
          <rect x="572" y="218" width="56" height="44" rx="3" stroke={stroke} strokeWidth="2.4" fill="none" />
          <line x1="572" y1="232" x2="628" y2="232" stroke={stroke} strokeWidth="2" />
          <line x1="600" y1="218" x2="600" y2="262" stroke={stroke} strokeWidth="2" opacity="0.7" />
          <line x1="572" y1="247" x2="628" y2="247" stroke={stroke} strokeWidth="1.6" opacity="0.55" />
        </g>

        {/* Satellite 3 (bottom-right): bar chart / figure */}
        <g>
          <circle cx="600" cy="480" r="46" fill={soft} opacity="0.9" stroke={stroke} strokeWidth="3" />
          <line x1="574" y1="504" x2="626" y2="504" stroke={stroke} strokeWidth="2.4" />
          <rect x="578" y="488" width="8" height="16" fill={stroke} />
          <rect x="592" y="478" width="8" height="26" fill={stroke} opacity="0.85" />
          <rect x="606" y="468" width="8" height="36" fill={stroke} opacity="0.7" />
          <rect x="620" y="460" width="6" height="44" fill={stroke} opacity="0.55" />
        </g>

        {/* Satellite 4 (bottom): problem doc with stacked variation lines — 類題 */}
        <g>
          <circle cx={cx} cy="600" r="46" fill={soft} opacity="0.9" stroke={stroke} strokeWidth="3" />
          <rect x={cx - 18} y="576" width="36" height="48" rx="3" stroke={stroke} strokeWidth="2.4" fill="none" />
          <line x1={cx - 12} y1="586" x2={cx + 12} y2="586" stroke={stroke} strokeWidth="2.2" />
          <line x1={cx - 12} y1="596" x2={cx + 8} y2="596" stroke={stroke} strokeWidth="2.2" opacity="0.8" />
          <line x1={cx - 12} y1="606" x2={cx + 6} y2="606" stroke={stroke} strokeWidth="2.2" opacity="0.6" />
          <line x1={cx - 12} y1="616" x2={cx + 4} y2="616" stroke={stroke} strokeWidth="2.2" opacity="0.4" />
        </g>

        {/* Satellite 5 (left): PDF doc — page silhouette with folded corner */}
        <g>
          <circle cx="120" cy="360" r="46" fill={soft} opacity="0.9" stroke={stroke} strokeWidth="3" />
          <path d="M 102 334 L 132 334 L 142 344 L 142 388 L 102 388 Z" stroke={stroke} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
          <path d="M 132 334 L 132 344 L 142 344" stroke={stroke} strokeWidth="2.2" fill="none" />
          <line x1="108" y1="354" x2="136" y2="354" stroke={stroke} strokeWidth="2.2" />
          <line x1="108" y1="364" x2="132" y2="364" stroke={stroke} strokeWidth="2.2" opacity="0.75" />
          <line x1="108" y1="374" x2="128" y2="374" stroke={stroke} strokeWidth="2.2" opacity="0.55" />
        </g>

        {/* Outer sparkles */}
        <path d="M 70 90 l 7 16 l 16 7 l -16 7 l -7 16 l -7 -16 l -16 -7 l 16 -7 z" fill={soft} opacity="0.85" />
        <path d="M 660 90 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 z" fill={soft} opacity="0.7" />
        <path d="M 70 640 l 5 12 l 12 5 l -12 5 l -5 12 l -5 -12 l -12 -5 l 12 -5 z" fill={soft} opacity="0.7" />
        <path d="M 660 640 l 7 16 l 16 7 l -16 7 l -7 16 l -7 -16 l -16 -7 l 16 -7 z" fill={soft} opacity="0.85" />
      </svg>
    );
  }

  if (key === "latex") {
    // LaTeX braces + integral + Σ symbol + flow arrow → PDF doc
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        {/* Big left brace */}
        <path d="M 200 120 Q 100 120 100 280 Q 100 340 60 360 Q 100 380 100 440 Q 100 600 200 600" stroke={soft} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        {/* Big right brace */}
        <path d="M 400 120 Q 500 120 500 280 Q 500 340 540 360 Q 500 380 500 440 Q 500 600 400 600" stroke={soft} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
        {/* Inner integral */}
        <path d="M 240 200 Q 280 240 270 360 Q 260 480 320 540" stroke={stroke} strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Sigma triangle */}
        <path d="M 340 280 L 410 280 L 360 360 L 410 440 L 340 440" stroke={stroke} strokeWidth="4" fill="none" strokeLinejoin="round" opacity="0.7" />
        <circle cx={cx} cy={cy} r="8" fill={stroke} opacity="0.8" />
        {/* PDF doc on right */}
        <rect x="580" y="240" width="100" height="140" rx="8" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <line x1="595" y1="270" x2="665" y2="270" stroke={stroke} strokeWidth="2" />
        <line x1="595" y1="290" x2="660" y2="290" stroke={stroke} strokeWidth="2" opacity="0.7" />
        <line x1="595" y1="310" x2="650" y2="310" stroke={stroke} strokeWidth="2" opacity="0.5" />
        <rect x="595" y="335" width="60" height="22" rx="3" fill={stroke} opacity="0.7" />
        {/* Arrow latex → pdf */}
        <line x1="540" y1="310" x2="580" y2="310" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d={`M 580 310 L 568 302 L 568 318 Z`} fill={stroke} />
      </svg>
    );
  }

  if (key === "memory") {
    // Forgetting curve + retrieval boost (memory science)
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="120" y1={200 + i * 70} x2="640" y2={200 + i * 70} stroke={stroke} strokeWidth="1" opacity="0.15" />
        ))}
        {/* Axes */}
        <line x1="120" y1="600" x2="640" y2="600" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="600" x2="120" y2="180" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M 640 600 L 624 592 L 624 608 Z" fill={stroke} />
        <path d="M 120 180 L 112 196 L 128 196 Z" fill={stroke} />
        {/* Forgetting curve (decaying exponential) — drops fast */}
        <path d="M 120 220 Q 200 380 280 480 Q 360 540 440 565 T 600 580" stroke={stroke} strokeWidth="2.4" fill="none" opacity="0.5" strokeDasharray="6 6" />
        {/* Retrieval-boosted curve — saw-tooth recovery */}
        <path d="M 120 220 Q 180 320 240 380 L 280 280 Q 320 340 360 380 L 400 280 Q 440 350 480 400 L 520 320 Q 560 380 600 420" stroke={stroke} strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Recall events */}
        <circle cx="280" cy="280" r="11" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="400" cy="280" r="11" fill={soft} stroke={stroke} strokeWidth="3" />
        <circle cx="520" cy="320" r="11" fill={soft} stroke={stroke} strokeWidth="3" />
        {/* Brain-ish circle (top-right) */}
        <circle cx="600" cy="220" r="44" fill={soft} opacity="0.4" stroke={stroke} strokeWidth="2.4" />
        <path d="M 580 200 Q 600 180 620 200 M 580 220 Q 600 200 620 220 M 580 240 Q 600 220 620 240" stroke={stroke} strokeWidth="1.8" fill="none" />
      </svg>
    );
  }

  if (key === "paths") {
    // Personalized paths — multiple branching paths converging to goal
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.2" strokeDasharray="2 8" />
        {/* Start nodes (left) */}
        {[
          { x: 100, y: 200 },
          { x: 100, y: 360 },
          { x: 100, y: 520 },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="22" fill={soft} stroke={stroke} strokeWidth="3" />
            <circle cx={n.x} cy={n.y} r="9" fill={stroke} />
          </g>
        ))}
        {/* Path curves to goal (right) */}
        <path d="M 122 200 Q 280 220 380 320 Q 480 380 590 360" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
        <path d="M 122 360 Q 260 320 380 360 Q 480 380 590 360" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
        <path d="M 122 520 Q 260 480 380 400 Q 480 380 590 360" stroke={stroke} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="6 4" />
        {/* Intermediate nodes */}
        <circle cx="280" cy="240" r="14" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <circle cx="280" cy="380" r="14" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <circle cx="280" cy="500" r="14" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <circle cx="420" cy="320" r="14" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <circle cx="420" cy="400" r="14" fill={soft} stroke={stroke} strokeWidth="2.4" />
        {/* Goal (right, big star) */}
        <circle cx="600" cy="360" r="56" fill={stroke} opacity="0.3" />
        <circle cx="600" cy="360" r="36" fill={soft} stroke={stroke} strokeWidth="3.5" />
        <path d="M 600 332 l 8 18 l 18 5 l -14 12 l 4 18 l -16 -10 l -16 10 l 4 -18 l -14 -12 l 18 -5 z" fill={stroke} />
      </svg>
    );
  }

  if (key === "exam") {
    // Exam strategy — timeline + score curve rising
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Calendar grid */}
        <rect x="120" y="180" width="500" height="240" rx="14" fill={soft} opacity="0.18" stroke={stroke} strokeWidth="2.4" />
        {Array.from({ length: 5 }).map((_, c) =>
          Array.from({ length: 3 }).map((__, r) => {
            const x = 140 + c * 95;
            const y = 200 + r * 70;
            return (
              <rect
                key={`${c}-${r}`}
                x={x}
                y={y}
                width="80"
                height="55"
                rx="4"
                fill={r === 2 && c >= 3 ? stroke : "none"}
                stroke={stroke}
                strokeWidth="1.6"
                opacity={r === 2 && c >= 3 ? 0.7 : 0.5}
              />
            );
          }),
        )}
        {/* Score-rise curve below */}
        <line x1="120" y1="600" x2="640" y2="600" stroke={stroke} strokeWidth="2.5" />
        <path d="M 120 580 Q 220 560 320 540 T 520 480 T 640 440" stroke={stroke} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="120" cy="580" r="6" fill={soft} stroke={stroke} strokeWidth="2" />
        <circle cx="320" cy="540" r="7" fill={soft} stroke={stroke} strokeWidth="2.4" />
        <circle cx="520" cy="480" r="8" fill={soft} stroke={stroke} strokeWidth="2.6" />
        <circle cx="640" cy="440" r="14" fill={stroke} stroke={soft} strokeWidth="3" />
        {/* Trophy/star at top of curve */}
        <path d="M 640 410 l 6 14 l 14 4 l -10 10 l 4 14 l -14 -8 l -14 8 l 4 -14 l -10 -10 l 14 -4 z" fill={soft} />
      </svg>
    );
  }

  if (key === "tools") {
    // Tool comparison — 4 tool cards in grid with comparison checkmarks
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {[
          { x: 120, y: 180 },
          { x: 380, y: 180 },
          { x: 120, y: 400 },
          { x: 380, y: 400 },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width="220" height="180" rx="14" fill={soft} opacity={0.2 + i * 0.1} stroke={stroke} strokeWidth="2.4" />
            {/* Header bar */}
            <rect x={c.x + 16} y={c.y + 18} width="80" height="12" rx="3" fill={stroke} opacity="0.7" />
            {/* Body lines */}
            <line x1={c.x + 16} y1={c.y + 60} x2={c.x + 180} y2={c.y + 60} stroke={stroke} strokeWidth="2.4" opacity="0.6" />
            <line x1={c.x + 16} y1={c.y + 88} x2={c.x + 160} y2={c.y + 88} stroke={stroke} strokeWidth="2.4" opacity="0.4" />
            <line x1={c.x + 16} y1={c.y + 116} x2={c.x + 140} y2={c.y + 116} stroke={stroke} strokeWidth="2.4" opacity="0.3" />
            {/* Check */}
            <circle cx={c.x + 192} cy={c.y + 152} r="14" fill={i === 0 ? stroke : "none"} stroke={stroke} strokeWidth="2.6" />
            {i === 0 && <path d={`M ${c.x + 184} ${c.y + 152} L ${c.x + 190} ${c.y + 158} L ${c.x + 200} ${c.y + 146}`} stroke={soft} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        ))}
        {/* Comparison arrow */}
        <path d="M 350 290 L 360 290 M 360 290 L 370 290" stroke={stroke} strokeWidth="3" />
      </svg>
    );
  }

  if (key === "book") {
    // Open book + physics formula
    return (
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: "flex" }}>
        <circle cx={cx} cy={cy} r="320" stroke={stroke} strokeWidth="1.4" fill="none" opacity="0.18" strokeDasharray="2 8" />
        {/* Open book pages */}
        <path d="M 120 220 Q 240 200 360 220 L 360 540 Q 240 520 120 540 Z" fill={soft} opacity="0.5" stroke={stroke} strokeWidth="3" />
        <path d="M 360 220 Q 480 200 600 220 L 600 540 Q 480 520 360 540 Z" fill={soft} opacity="0.4" stroke={stroke} strokeWidth="3" />
        {/* Book spine */}
        <line x1={cx} y1="220" x2={cx} y2="540" stroke={stroke} strokeWidth="2" opacity="0.5" />
        {/* Left page lines */}
        <line x1="160" y1="270" x2="320" y2="262" stroke={stroke} strokeWidth="2.4" opacity="0.85" />
        <line x1="160" y1="300" x2="320" y2="294" stroke={stroke} strokeWidth="2.4" opacity="0.65" />
        <line x1="160" y1="330" x2="300" y2="324" stroke={stroke} strokeWidth="2.4" opacity="0.5" />
        {/* Right page formula box */}
        <rect x="400" y="270" width="160" height="80" rx="8" fill={stroke} opacity="0.4" />
        <line x1="420" y1="296" x2="500" y2="296" stroke={soft} strokeWidth="2.6" />
        <line x1="420" y1="320" x2="540" y2="320" stroke={soft} strokeWidth="2.6" opacity="0.85" />
        <line x1="400" y1="380" x2="540" y2="378" stroke={stroke} strokeWidth="2.4" opacity="0.6" />
        <line x1="400" y1="410" x2="520" y2="408" stroke={stroke} strokeWidth="2.4" opacity="0.45" />
        {/* Floating sparkle */}
        <path d="M 600 160 l 6 14 l 14 6 l -14 6 l -6 14 l -6 -14 l -14 -6 l 14 -6 z" fill={soft} opacity="0.85" />
        <circle cx="120" cy="600" r="4" fill={stroke} opacity="0.6" />
      </svg>
    );
  }

  return <PosterArtwork theme={theme} />;
}

/** Centered, poster-style hero artwork (fallback when slug has no specific diagram). */
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

        {/* Layer 4: top-right secondary glow (per-theme hue, complements primary glow) */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -180,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.secondaryGlow}, transparent 68%)`,
            display: "flex",
          }}
        />
        {/* Layer 4b: bottom-left tertiary glow (third hue → multi-color composition) */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.tertiaryGlow}, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Layer 4c: pop sparkles in the contrast hue — tiny, scattered, low-density */}
        {[
          { top: 110, left: 160, size: 10, color: theme.pop, opacity: 0.85 },
          { top: 78, right: 220, size: 7, color: theme.accentSoft, opacity: 0.7 },
          { bottom: 200, right: 130, size: 9, color: theme.pop, opacity: 0.75 },
          { bottom: 130, left: 200, size: 6, color: theme.accentSoft, opacity: 0.6 },
          { top: 240, left: 90, size: 5, color: theme.pop, opacity: 0.5 },
          { bottom: 260, right: 250, size: 5, color: theme.accentSoft, opacity: 0.55 },
        ].map((s, i) => (
          <div
            key={`pop-${i}`}
            style={{
              position: "absolute",
              ...(s.top !== undefined ? { top: s.top } : {}),
              ...(s.bottom !== undefined ? { bottom: s.bottom } : {}),
              ...(s.left !== undefined ? { left: s.left } : {}),
              ...(s.right !== undefined ? { right: s.right } : {}),
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: s.color,
              opacity: s.opacity,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              display: "flex",
            }}
          />
        ))}

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

        {/* CENTER: article-specific diagram (dispatched by slug) */}
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
          <ArticleDiagram slug={slug} theme={theme} />
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
