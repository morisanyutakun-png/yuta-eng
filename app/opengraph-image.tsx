import { ImageResponse } from "next/og";

export const alt =
  "Lumora — 高校物理と教材作成AIをつなぐEdTechスタジオ";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #fff7ed 0%, #e0f2fe 48%, #ecfdf5 100%)",
          color: "#0b1220",
          display: "flex",
          fontFamily: "Arial",
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
                background: "#fbbf24",
                borderRadius: "999px",
                display: "flex",
                height: 18,
                width: 18,
              }}
            />
            LUMORA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                color: "#0b1220",
                display: "flex",
                fontSize: 76,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                lineHeight: 1.02,
                maxWidth: 960,
              }}
            >
              高校物理を「理解」で乗り越える。
            </div>
            <div
              style={{
                color: "#334155",
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                maxWidth: 960,
              }}
            >
              読んで → 解いて → つなぐ。教材作成AIまで揃った EdTech スタジオ Lumora。
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["高校物理", "教材作成AI", "学習アプリ"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#ffffff",
                  border: "1px solid #bae6fd",
                  borderRadius: "999px",
                  color: "#0369a1",
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
    size,
  );
}
