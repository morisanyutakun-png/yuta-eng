import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "ノビットスタディ 中高部 — 毎日の学習を、仕組みにする。教材 × 習慣化 × 添削のデジタル通信添削。";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = false;

export default async function Image() {
  const [notoRegular, notoBold, ogpJpg] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Bold.ttf")),
    readFile(join(process.cwd(), "public/illust/ogp-campaign-1200x630.jpg")),
  ]);
  const bg = `data:image/jpeg;base64,${ogpJpg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          fontFamily: '"Noto Sans JP", system-ui, sans-serif',
        }}
      >
        {/* 背景＝ブランドイラスト（スマホ・答案・合格スタンプ） */}
        <img src={bg} width={1200} height={630} style={{ position: "absolute", inset: 0 }} />
        {/* 左側の空きスペースを暗くして白文字の視認性を確保 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(120,25,0,0.62) 0%, rgba(120,25,0,0.28) 42%, rgba(120,25,0,0) 62%)",
          }}
        />
        {/* テキストオーバーレイ（左） */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 26,
            padding: "0 64px",
            width: 660,
            height: "100%",
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#0b1d4a",
              borderRadius: 999,
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "14px 24px",
            }}
          >
            <span style={{ width: 16, height: 16, borderRadius: 999, background: "#fdba74", display: "flex" }} />
            ノビットスタディ 中高部
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              textShadow: "0 4px 24px rgba(80,16,0,0.45)",
            }}
          >
            毎日の学習を、仕組みにする。
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 14px rgba(80,16,0,0.5)",
            }}
          >
            教材 × 習慣化 × 添削のデジタル通信添削。
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["初月半額", "入会金・教材費0円", "毎日添削"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  background: "#ffffff",
                  borderRadius: 999,
                  color: "#c2410c",
                  fontSize: 23,
                  fontWeight: 700,
                  padding: "12px 20px",
                }}
              >
                {t}
              </div>
            ))}
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
