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

const categoryAccent: Record<string, { bg: string; chip: string; chipText: string }> = {
  Physics: { bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%)", chip: "#bae6fd", chipText: "#0b1d4a" },
  Materials: { bg: "linear-gradient(135deg, #1e293b 0%, #0369a1 60%, #0ea5e9 100%)", chip: "#fef3c7", chipText: "#7c2d12" },
  LaTeX: { bg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #38bdf8 100%)", chip: "#fef3c7", chipText: "#7c2d12" },
  Education: { bg: "linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #0d9488 100%)", chip: "#d1fae5", chipText: "#064e3b" },
};

const defaultAccent = { bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #475569 100%)", chip: "#e2e8f0", chipText: "#0f172a" };

type Params = { slug: string };

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Solvora ブログ";
  const description = post?.description ?? siteConfig.description;
  const category = post?.category ?? "Solvora";
  const accent = categoryAccent[category] ?? defaultAccent;
  const date = post?.formattedDate ?? "";
  const reading = post?.readingTime ?? "";

  // Trim long titles for the headline display
  const displayTitle = title.length > 60 ? title.slice(0, 58) + "…" : title;
  const displayDesc = description.length > 100 ? description.slice(0, 98) + "…" : description;

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
          background: accent.bg,
          color: "#ffffff",
          fontFamily: '"Noto Sans JP", system-ui, sans-serif',
          padding: "56px",
          position: "relative",
        }}
      >
        {/* Decorative grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(186,230,253,0.45), transparent 70%)",
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
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Solvora L mark */}
              <svg width="56" height="56" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="120" rx="22" fill="#ffffff" />
                <path d="M28 14h22v64h44v22H28V14Z" fill="#0b1d4a" />
                <rect x="54" y="64" width="7" height="14" rx="1" fill="#1f3a8a" />
                <rect x="63" y="56" width="7" height="22" rx="1" fill="#2563eb" />
                <rect x="72" y="46" width="7" height="32" rx="1" fill="#38bdf8" />
                <rect x="81" y="36" width="7" height="42" rx="1" fill="#7dd3fc" />
                <path d="M16 100 Q 4 56 42 28 Q 82 4 108 22" fill="none" stroke="#1d4ed8" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="106" cy="22" r="6" fill="#38bdf8" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "26px", fontWeight: 800, letterSpacing: "0.04em" }}>SOLVORA</span>
                <span style={{ fontSize: "12px", color: "#bae6fd", letterSpacing: "0.22em", fontWeight: 700 }}>
                  SCIENCE LEARNING HUB
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: accent.chip,
                color: accent.chipText,
                padding: "10px 20px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0.16em",
              }}
            >
              {category.toUpperCase()}
            </div>
          </div>

          {/* Middle: title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1080px" }}>
            <h1
              style={{
                fontSize: title.length > 36 ? "52px" : "62px",
                lineHeight: 1.28,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {displayTitle}
            </h1>
            <p
              style={{
                fontSize: "20px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.82)",
                margin: 0,
                maxWidth: "960px",
              }}
            >
              {displayDesc}
            </p>
          </div>

          {/* Bottom: meta */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", color: "rgba(255,255,255,0.85)", fontSize: "16px", fontWeight: 600 }}>
              {date ? <span>{date}</span> : null}
              {date && reading ? <span style={{ opacity: 0.5 }}>·</span> : null}
              {reading ? <span>{reading}</span> : null}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#bae6fd", fontSize: "15px", fontWeight: 700, letterSpacing: "0.16em" }}>
              <span>YUTA-ENG.COM/BLOG</span>
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
