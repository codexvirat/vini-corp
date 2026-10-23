import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Vini Corporate — Solar Panel Dealer & Installation, Gorakhpur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage:
            "linear-gradient(135deg, #060a14 0%, #0a1224 25%, #0f1c34 48%, #3a2412 72%, #7a3b12 88%, #f59e0b 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle at 35% 30%, #fff8e1 0%, #ffd75e 30%, #f59e0b 62%, #ea580c 100%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              backgroundImage: "linear-gradient(135deg, #ffd75e, #ea580c)",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#f6f3ec" }}>
            Vini Corporate
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 60,
            fontWeight: 800,
            color: "#f6f3ec",
            maxWidth: 800,
            lineHeight: 1.15,
          }}
        >
          Harness the Sun. Power Your Tomorrow.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "rgba(246,243,236,0.7)",
          }}
        >
          Solar Panel Dealer &amp; Installation • Golghar, Gorakhpur
        </div>
      </div>
    ),
    { ...size }
  );
}
