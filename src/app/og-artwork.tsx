/* Shared artwork for opengraph-image + twitter-image (1200 × 630). */

import type { CSSProperties } from "react";

function HexMark({ size = 46 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ flex: "none" }}
      aria-hidden="true"
    >
      <path d="M16 2L28.124 9V23L16 30L3.876 23V9L16 2Z" fill="#10b981" />
      <path d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z" fill="#071019" />
      <path d="M16 10L21.196 13V19L16 22L10.804 19V13L16 10Z" fill="#35f0a9" />
    </svg>
  );
}

function Corner({ style }: { style: CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 34,
        height: 34,
        border: "3px solid rgba(53, 240, 169, 0.5)",
        ...style,
      }}
    />
  );
}

export function OgArtwork() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        backgroundColor: "#03060a",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "52px 64px 46px",
        overflow: "hidden",
      }}
    >
      {/* ambient glows */}
      <div
        style={{
          position: "absolute",
          top: -220,
          left: -160,
          width: 900,
          height: 620,
          background:
            "radial-gradient(closest-side, rgba(53,240,169,0.14), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -200,
          width: 900,
          height: 640,
          background:
            "radial-gradient(closest-side, rgba(77,217,255,0.12), transparent)",
        }}
      />

      {/* corner brackets */}
      <Corner style={{ top: 24, left: 24, borderRight: "none", borderBottom: "none" }} />
      <Corner style={{ top: 24, right: 24, borderLeft: "none", borderBottom: "none" }} />
      <Corner style={{ bottom: 24, left: 24, borderRight: "none", borderTop: "none" }} />
      <Corner style={{ bottom: 24, right: 24, borderLeft: "none", borderTop: "none" }} />

      {/* header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <HexMark />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 27,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#eafff5",
                textTransform: "uppercase",
              }}
            >
              OpenRemap
            </div>
            <div
              style={{
                fontSize: 15,
                letterSpacing: 3,
                color: "#6d8ca6",
                textTransform: "uppercase",
              }}
            >
              openremap-core · open source
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          <div
            style={{
              border: "2px solid rgba(53,240,169,0.85)",
              color: "#35f0a9",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Engine v0.7.x · Live
          </div>
          <div
            style={{
              border: "2px solid rgba(255,196,77,0.9)",
              color: "#ffc44d",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Harness v1.0.0 · Pending
          </div>
        </div>
      </div>

      {/* headline block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: 7,
            color: "#4ad9ff",
            textTransform: "uppercase",
          }}
        >
          OpenRemap Harness — native desktop app
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2,
            color: "#eafff5",
          }}
        >
          ECU binaries, without the
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2,
            color: "#35f0a9",
          }}
        >
          black box.
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 23,
            color: "#9db4c5",
            letterSpacing: 0.2,
          }}
        >
          Identify · health-check · checksum-verify · cook · tune — 38
          extractor families across 6 OEMs. 100% offline.
        </div>
      </div>

      {/* footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(77,217,255,0.3)",
          paddingTop: 26,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: "#d9f6ea" }}>
          openremap.com
        </div>
        <div
          style={{
            fontSize: 16,
            letterSpacing: 2.5,
            color: "#6d8ca6",
            textTransform: "uppercase",
          }}
        >
          pip install openremap · MIT · 0 telemetry
        </div>
      </div>
    </div>
  );
}
