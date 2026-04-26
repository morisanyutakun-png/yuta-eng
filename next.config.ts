import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
