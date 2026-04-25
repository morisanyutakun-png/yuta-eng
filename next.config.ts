import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 90],
    // 1 year — OG images and brand assets rarely change; longer TTL reduces
    // optimizer cold starts and keeps CDN caches warm for SEO.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
