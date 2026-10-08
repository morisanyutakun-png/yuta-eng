import type { NextConfig } from "next";
import moshiSample from "./data/moshi-sample.json";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      // 更新前の画像を再表示させない。生成済みの版だけを許可する。
      ...moshiSample.return.pages.map((page) => ({
        pathname: page.file,
        search: `?v=${page.version}`,
      })),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
