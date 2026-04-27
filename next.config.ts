import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Critical CSS inlining is handled in `scripts/inline-critical-css.mjs`
  // (postbuild step). Next.js' `experimental.optimizeCss` was a no-op on the
  // Turbopack pipeline used here, so we run beasties ourselves to inline
  // above-the-fold rules and async-swap the rest. This eliminated the ~2.6s
  // render-blocking CSS on slow 4G that was driving FCP/LCP up to 4 seconds.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 90],
    // 1 year — OG images and brand assets rarely change; longer TTL reduces
    // optimizer cold starts and keeps CDN caches warm for SEO.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // Long-cache the pre-built static OG card variants and brand SVGs that
  // never change between builds. immutable means CDNs/browsers will skip
  // revalidation entirely until the next deploy.
  async headers() {
    return [
      {
        source: "/og/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/eddivom-hero.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/eddivom-hero.avif",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // PageSpeed flagged "効率的なキャッシュ保存期間": ensure favicon, manifest,
      // and other root static files have a meaningful TTL.
      {
        source: "/favicon.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/mask-icon.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      // Static HTML pages are SSG; allow a short cache + long stale-while-revalidate
      // so repeat visits skip the network entirely until the next deploy. The
      // negative lookahead excludes paths with a file extension so static asset
      // headers above stay effective.
      {
        source: "/:path((?!.*\\.[a-zA-Z0-9]+$|_next|api).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
