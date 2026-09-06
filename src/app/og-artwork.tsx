/* Shared artwork for opengraph-image + twitter-image (1200 × 630). */

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
      <path d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z" fill="#05070a" />
      <path d="M16 10L21.196 13V19L16 22L10.804 19V13L16 10Z" fill="#34d399" />
    </svg>
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
        backgroundColor: "#05070a",
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
            "radial-gradient(closest-side, rgba(167,139,250,0.14), transparent)",
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
            "radial-gradient(closest-side, rgba(56,189,248,0.12), transparent)",
        }}
      />

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
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: -0.4,
                color: "#f4f7f9",
              }}
            >
              OpenRemap
            </div>
            <div style={{ fontSize: 15, color: "#9aa7b4" }}>
              openremap-core · open source
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              border: "1.5px solid rgba(52,211,153,0.7)",
              color: "#34d399",
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Engine v0.7.x · Live
          </div>
          <div
            style={{
              border: "1.5px solid rgba(244,114,182,0.7)",
              color: "#f472b6",
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Harness v1.0.0 · Pending
          </div>
        </div>
      </div>

      {/* headline block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#38bdf8" }}>
          OpenRemap Harness — native desktop app
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#f4f7f9",
          }}
        >
          ECU binaries, without the
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#a78bfa",
          }}
        >
          black box.
        </div>
        <div style={{ marginTop: 22, fontSize: 22, color: "#9aa7b4" }}>
          Identify · inspect · edit · render · automate — 38 extractor families
          across 6 OEMs. 100% offline.
        </div>
      </div>

      {/* footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 24,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: "#f4f7f9" }}>
          openremap.com
        </div>
        <div style={{ fontSize: 16, color: "#6b7785" }}>
          pip install openremap · MIT · 0 telemetry
        </div>
      </div>
    </div>
  );
}
