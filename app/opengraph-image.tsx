import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "ノビットスタディ 中高部 — 高校物理・数学の毎日添削オンライン塾。考える力を育てる記述答案の添削。";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";
export const revalidate = false;

export default async function Image() {
  const [notoRegular, notoBold] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/NotoSansJP-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 48%, #fff7ed 100%)",
          color: "#0b1220",
          display: "flex",
          fontFamily: '"Noto Sans JP", system-ui, sans-serif',
          height: "100%",
          justifyContent: "center",
          padding: "58px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            border: "2px solid rgba(255, 255, 255, 0.92)",
            borderRadius: "48px",
            boxShadow: "0 34px 100px rgba(15, 23, 42, 0.18)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "54px",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              alignSelf: "flex-start",
              background: "#0b1220",
              borderRadius: "999px",
              color: "#bae6fd",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              gap: 14,
              letterSpacing: "0.18em",
              padding: "16px 26px",
            }}
          >
            <span
              style={{
                background: "#f97316",
                borderRadius: "999px",
                display: "flex",
                height: 18,
                width: 18,
              }}
            />
            ノビットスタディ 中高部
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                color: "#0b1220",
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                maxWidth: 980,
              }}
            >
考える力を育てる、高校物理のオンライン添削。
            </div>
            <div
              style={{
                color: "#334155",
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                maxWidth: 980,
              }}
            >
              毎日演習・毎日添削で、途中式・考え方・答案の組み立てまで丁寧に。塾長オリジナル教材で自立した学びを。
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["毎日演習・毎日添削", "塾長オリジナル教材", "添削専門・自立学習"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#ffffff",
                  border: "1px solid #99f6e4",
                  borderRadius: "999px",
                  color: "#0f766e",
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "14px 22px",
                }}
              >
                {item}
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
