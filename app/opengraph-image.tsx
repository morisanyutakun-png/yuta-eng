import { ImageResponse } from "next/og";

export const alt =
  "Yuta Eng - High School Physics, AI material creation, and EdTech learning apps";

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
          color: "#0f172a",
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
            background: "rgba(255, 255, 255, 0.78)",
            border: "2px solid rgba(255, 255, 255, 0.9)",
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
              background: "#0f172a",
              borderRadius: "999px",
              color: "#e0f2fe",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "16px 24px",
              alignSelf: "flex-start",
            }}
          >
            YUTA ENG
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 800,
                letterSpacing: "-0.07em",
                lineHeight: 0.98,
                maxWidth: 850,
              }}
            >
              Physics, AI Materials, EdTech Apps.
            </div>
            <div
              style={{
                color: "#334155",
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              High school physics learning studio for the AI era.
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["High School Physics", "AI Material Creation", "Learning Apps"].map(
              (item) => (
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
                    padding: "14px 20px",
                  }}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
