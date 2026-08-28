import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpenRemap — Open-Source ECU Binary Toolkit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle gradient background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center top, rgba(16, 185, 129, 0.08) 0%, transparent 60%)",
          }}
        />

        {/* Hexagon icon */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 32 32"
          fill="none"
          style={{ marginBottom: 24 }}
        >
          <path
            d="M16 2L28.124 9V23L16 30L3.876 23V9L16 2Z"
            fill="#10b981"
          />
          <path
            d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z"
            fill="#0a0a0f"
          />
          <path
            d="M16 10L21.196 13V19L16 22L10.804 19V13L16 10Z"
            fill="#10b981"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#f5f5f5",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          OpenRemap
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#a3a3a3",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Open-Source ECU Binary Toolkit
        </div>

        {/* Tag line */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 32,
            fontSize: 16,
            color: "#10b981",
          }}
        >
          <span>Identify</span>
          <span style={{ color: "#525252" }}>•</span>
          <span>Health-check</span>
          <span style={{ color: "#525252" }}>•</span>
          <span>Cook</span>
          <span style={{ color: "#525252" }}>•</span>
          <span>Offline</span>
        </div>

        {/* Version badge */}
        <div
          style={{
            marginTop: 24,
            fontSize: 14,
            color: "#737373",
            padding: "6px 16px",
            border: "1px solid #262626",
            borderRadius: 999,
          }}
        >
          OpenRemap Harness · coming in v1.0.0 · pip install openremap
        </div>
      </div>
    ),
    { ...size }
  );
}
