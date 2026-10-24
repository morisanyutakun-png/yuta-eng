import type { NextConfig } from "next";
import moshiSample from "./data/moshi-sample.json";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 決済後の自動返信メールに添付するPDFや模試データ（assets/moshi-exams/ および sales/mock-exams/）を
  // サーバー関数のバンドルに含める。assets/ や sales/ は静的配信の対象外なので、
  // 指定しないと Vercel 本番でファイルが見つからない。public/ には置かない。
  outputFileTracingIncludes: {
    "/api/moshi/*": ["./assets/moshi-exams/**/*.pdf", "./assets/moshi-exams/**/*.json"],
    "/api/stripe/webhook": [
      "./sales/mock-exams/**/*.pdf",
      "./sales/mock-exams/**/product.json",
    ],
    "/api/mock-exams/*": [
      "./sales/mock-exams/**/*.pdf",
      "./sales/mock-exams/**/product.json",
    ],
    "/mock-exams/*": [
      "./sales/mock-exams/**/*.pdf",
      "./sales/mock-exams/**/product.json",
    ],
  },
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
