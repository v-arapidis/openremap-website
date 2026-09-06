import Link from "next/link";
import { ArrowRight, Star, ExternalLink } from "lucide-react";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";
const PYPI_URL = "https://pypi.org/project/openremap/";

/* ─────────────────────────── Shared bits ─────────────────────────── */

function Corners({ tone = "green" }: { tone?: "green" | "cyan" | "amber" }) {
  return (
    <span
      aria-hidden="true"
      className={`hud-corners ${tone === "cyan" ? "cyan" : tone === "amber" ? "amber" : ""}`}
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Eyebrow({ children, tone = "aqua" }: { children: React.ReactNode; tone?: "aqua" | "muted" }) {
  return (
    <div
      className={`font-mono text-[12.5px] font-medium uppercase tracking-[0.22em] ${
        tone === "muted" ? "text-ink-faint" : "text-aqua"
      }`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────── Status rail ─────────────────────────── */

function StatusRail() {
  return (
    <div className="border-y border-edge bg-panel/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-hidden whitespace-nowrap px-6 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
        <span>
          SYS/OPENREMAP-CORE <span className="text-signal">v0.7.x</span> · LIVE{" "}
          <span className="mx-1.5 text-edge-strong">—</span> HARNESS{" "}
          <span className="text-aqua">v1.0.0</span> · PENDING
        </span>
        <span className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center gap-2 text-signal">
            <i className="animate-lamp inline-block h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgba(53,240,169,0.9)]" />
            ENGINE ONLINE
          </span>
          <span className="inline-flex items-center gap-2 text-aqua">
            <i className="animate-lamp inline-block h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_8px_rgba(77,217,255,0.9)]" />
            OFFLINE MODE
          </span>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function HeroPanel() {
  return (
    <div className="scanlines relative border border-edge-strong bg-gradient-to-br from-panel-2 to-panel">
      <Corners />
      {/* window title bar */}
      <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal" />
        <span className="ml-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
          OpenRemap Harness — <span className="text-aqua">v1.0.0 · UI preview</span>
        </span>
      </div>

      <div className="flex">
        {/* slim sidebar */}
        <div className="hidden flex-none flex-col border-r border-edge py-3 font-mono text-[11.5px] uppercase tracking-[0.16em] sm:flex">
          {["Identify", "Health", "Checksums", "Cook", "Tune"].map((step, i) => (
            <span
              key={step}
              className={`px-4 py-2 ${
                i === 0
                  ? "border-l-2 border-signal bg-signal/10 text-signal"
                  : "border-l-2 border-transparent text-ink-faint"
              }`}
            >
              {step}
            </span>
          ))}
        </div>

        {/* readouts */}
        <div className="flex-1 px-5 py-4">
          <div className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            <span className="inline-flex items-center gap-2 text-aqua">
              <i className="animate-lamp inline-block h-1 w-1 rounded-full bg-amber" />
              live scan
            </span>
            <span>confidence</span>
          </div>

          <div className="readout-row">
            <span className="k">OEM</span>
            <span className="dots" />
            <span className="v">BOSCH</span>
          </div>
          <div className="readout-row">
            <span className="k">FAMILY</span>
            <span className="dots" />
            <span className="v cy">EDC17CP14</span>
          </div>
          <div className="readout-row">
            <span className="k">REGION</span>
            <span className="dots" />
            <span className="v">EUR</span>
          </div>
          <div className="readout-row">
            <span className="k">IMAGE LEN</span>
            <span className="dots" />
            <span className="v">0x200000</span>
          </div>
          <div className="readout-row">
            <span className="k">CHECKSUM</span>
            <span className="dots" />
            <span className="v ok">OK ✓</span>
          </div>
          <div className="readout-row">
            <span className="k">CONFIDENCE</span>
            <span className="dots" />
            <span className="v ok">0.97 · 3/3</span>
          </div>

          {/* map scan bar */}
          <div className="mt-3">
            <div className="relative h-2 overflow-hidden border border-edge-strong bg-black/50">
              <span className="scan-fill absolute inset-y-0 w-[38%] bg-[repeating-linear-gradient(90deg,var(--color-signal)_0_8px,transparent_8px_14px)]" />
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
              <span>scanning map regions</span>
              <span className="text-signal">68%</span>
            </div>
          </div>

          {/* hex strip */}
          <div className="mt-3 border-t border-edge pt-2.5 font-mono text-[12px] leading-[1.9] tracking-wide text-ink-faint">
            <span className="text-aqua">0x0000</span>&nbsp; 4A 30 31 46{" "}
            <span className="animate-hex font-medium">53 57 20 41</span> 46 54 45 52
            <br />
            <span className="text-aqua">0x0010</span>&nbsp; 00 00 00 00 00 00 00 00 00 00 00 00
            <br />
            <span className="text-aqua">0x0020</span>&nbsp; 30 39 47 30 34 37 34 36 30 34 30 33
          </div>
        </div>
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between border-t border-edge bg-black/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          engine <span className="text-signal">v0.7.x</span>
        </span>
        <span>local only · offline</span>
        <span className="text-aqua">concept — not a screenshot</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-grid-blue absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_-5%,black_10%,transparent_78%)]" />
        <div className="absolute left-[-140px] top-[-120px] h-[460px] w-[460px] rounded-full bg-signal/[0.06] blur-3xl" />
        <div className="absolute right-[-160px] top-[120px] h-[480px] w-[480px] rounded-full bg-aqua/[0.05] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:pt-20">
        {/* ── copy column ── */}
        <div>
          <Eyebrow>OpenRemap Harness — native desktop app</Eyebrow>

          <h1 className="animate-fade-in-up mt-5 font-mono text-4xl font-extrabold uppercase leading-[1.06] tracking-[-0.01em] text-ink sm:text-5xl xl:text-6xl">
            ECU binaries,
            <br />
            <span className="text-ink-faint">without the</span>
            <br />
            <span className="glow-signal">black box.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-muted">
            A native app for <span className="font-semibold text-ink">Windows · macOS · Linux</span>{" "}
            that puts the entire OpenRemap engine behind a clean desktop
            interface — identify, health-check, cook and tune.{" "}
            <span className="font-semibold text-ink">No Python. No terminal.</span>{" "}
            Fully offline.
          </p>

          {/* release status panel */}
          <div className="scanlines relative mt-8 border border-amber/35 bg-panel/70">
            <Corners tone="amber" />
            <div className="px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.2em] text-ink-faint">
                <span>Release status</span>
                <span className="h-px flex-1 bg-amber/25" />
                <span className="inline-flex items-center gap-2 text-amber">
                  <i className="animate-lamp inline-block h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_10px_rgba(255,196,77,0.9)]" />
                  v1.0.0 — pending
                </span>
              </div>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-muted">
                The Harness desktop app is in active development — this very
                interface. We are standing by for release, and we’ll raise the
                flag the day it ships. The engine behind it?{" "}
                <span className="text-ink">Already live — scroll down.</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-signal bg-signal px-5 py-2.5 font-mono text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#020d07] transition-colors hover:bg-[#5cf5bb]"
                >
                  Follow the v1.0.0 release <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-edge-strong px-5 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  <Star className="h-3.5 w-3.5" /> Star
                </a>
                <Link
                  href="#engine"
                  className="inline-flex items-center gap-1.5 px-2 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.12em] text-aqua transition-colors hover:text-ink"
                >
                  Engine is live today ↓
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-faint">
            <span>
              extractors <span className="text-signal">38</span>
            </span>
            <span>
              oems <span className="text-signal">6</span>
            </span>
            <span>
              telemetry <span className="text-signal">0</span>
            </span>
            <span className="text-ink-faint">
              pip · <span className="text-aqua">live today</span>
            </span>
          </div>
        </div>

        {/* ── preview column ── */}
        <div className="animate-fade-in-up relative" style={{ animationDelay: "0.15s" }}>
          <div className="absolute -inset-8 -z-10 rounded-full bg-signal/[0.05] blur-3xl" />
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Ticker ─────────────────────────── */

const tickerItems = [
  "Bosch EDC17",
  "Bosch EDC16",
  "Siemens SIMOS",
  "Delphi",
  "Magneti Marelli",
  "Denso",
  "Hitachi",
  "checksum verified",
  "100% offline",
  "0 telemetry",
];

function Ticker() {
  const half = (
    <span className="shrink-0">
      {tickerItems.map((item, i) => (
        <span key={item}>
          <span className={i % 3 === 2 ? "text-signal" : "text-aqua"}>●</span>
          <span className="mx-6">{item}</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden border-y border-edge bg-panel/50 py-3.5">
      <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-[12.5px] uppercase tracking-[0.2em] text-ink-muted">
        {half}
        {half}
      </div>
    </div>
  );
}

/* ───────────────────── Engine / openremap-core ───────────────────── */

const capabilities = [
  ["Identify", "38 extractor families — confidence tier plus the evidence behind every result."],
  ["Health-check", "Checksums, axis sanity, map-count envelope, erased blocks, VIN duplication — CI-gateable."],
  ["Checksum verify", "ME7 · IronFelix · NefMoto · MS43 · GS20/SMG2 · Denso Subaru — detection, no correction."],
  ["Cook / cook-volatile", "Diff stock vs tuned into a portable .remap recipe — schema 4.5, map-annotated, volatile-aware."],
  ["Tune", "validate → apply → verify-after. All-or-nothing — if any check fails, nothing is written."],
  ["Map tooling", "Structural map discovery, map-level diffing, CSV export, probabilistic labels."],
] as const;

function EngineSection() {
  return (
    <section id="engine" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <Eyebrow>Meanwhile — the engine is live</Eyebrow>
          <h2 className="mt-4 font-mono text-3xl font-extrabold uppercase leading-tight tracking-[-0.01em] sm:text-4xl">
            Every capability Harness will ship{" "}
            <span className="glow-aqua">already runs today</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
            Harness is a shell around <span className="font-semibold text-ink">openremap-core</span> —
            the open-source engine, live right now as a Python CLI (v0.7.x).
            Same binary analysis, same engine — the app just removes the terminal.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* 01 install */}
          <div className="scanlines relative border border-edge bg-panel">
            <Corners />
            <div className="border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-aqua">
              01 // engine — openremap-core
            </div>
            <div className="px-5 py-5">
              <p className="font-mono text-[15px] font-bold uppercase leading-snug text-ink">
                Library-first.
                <br />
                Fully offline.
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                Importable Python services with a mandatory Rust core for the
                hot loops. Python 3.10+, MIT-licensed.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-3 border border-edge bg-black/50 px-3.5 py-2.5">
                  <code className="font-mono text-[13px] text-signal">
                    $ pip install openremap
                  </code>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
                    or uv
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border border-edge bg-black/50 px-3.5 py-2.5">
                  <code className="font-mono text-[13px] text-ink-muted">
                    $ uv tool install openremap
                  </code>
                  <span className="text-signal">✓</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
                <span className="border border-edge-strong px-2.5 py-1 text-signal">mit</span>
                <span className="border border-edge px-2.5 py-1 text-ink-faint">py 3.10+</span>
                <span className="border border-edge px-2.5 py-1 text-ink-faint">.bin · .ori · .hex</span>
              </div>
            </div>
          </div>

          {/* 02 capabilities */}
          <div className="scanlines relative border border-edge bg-panel lg:col-span-2">
            <Corners tone="cyan" />
            <div className="flex items-center justify-between border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em]">
              <span className="text-aqua">02 // capabilities — the exact engine Harness wraps</span>
              <span className="hidden text-ink-faint sm:block">live · cli today</span>
            </div>
            <div className="grid gap-x-8 px-5 py-5 sm:grid-cols-2">
              {capabilities.map(([name, desc]) => (
                <div key={name} className="border-b border-edge-soft py-3 first:pt-0 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                  <p className="font-mono text-[12.5px] font-bold uppercase tracking-[0.18em] text-signal">
                    {name}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Coverage / decoders ───────────────────── */

const manufacturers = ["Bosch", "Siemens", "Delphi", "Magneti Marelli", "Denso", "Hitachi"];

const checksumSchemes = ["ME7", "IronFelix", "NefMoto", "MS43", "GS20 / SMG2", "Denso Subaru"];

const decoders = [
  {
    cpu: "C166 / ST10",
    backend: "rust",
    note: "written from scratch — verified vs Ghidra SLEIGH",
    families: "ME7 · ME9 · EDC15 · MS43 · PPD · SID801/803 · EMS2000 · M5.x · ME1.5.5",
  },
  {
    cpu: "8051 (MCS-51)",
    backend: "rust",
    note: "100% agreement vs at51 on ~312k real instructions",
    families: "M1.8 · M2.x · MP9 · M4.x · Mono-Motronic · SIMOS · Simtec56",
  },
  {
    cpu: "MCS-96 (8096)",
    backend: "rust",
    note: "verified vs MAME opcode tables + Ghidra",
    families: "EDC1 · EDC3",
  },
  {
    cpu: "TriCore",
    backend: "capstone",
    note: "",
    families: "EDC16 · EDC17 · MED9 · MED17",
  },
  {
    cpu: "SuperH",
    backend: "capstone",
    note: "",
    families: "SH7055 · SH7058 · SH72546",
  },
  {
    cpu: "M680X (68HC11 / 6800)",
    backend: "capstone",
    note: "",
    families: "M1.3 · M1.7 · M3.x · MP3.x · MP7.2 · LH-Jetronic",
  },
  {
    cpu: "68K (68000 / CPU32)",
    backend: "capstone",
    note: "",
    families: "M1.5.5 · M1.55 · IAW 4LV",
  },
  {
    cpu: "PowerPC",
    backend: "capstone",
    note: "",
    families: "MJD 6JF",
  },
  {
    cpu: "x86",
    backend: "capstone",
    note: "generic code — bootloaders etc.",
    families: "—",
  },
];

function CoverageSection() {
  return (
    <section id="coverage" className="scroll-mt-20 border-y border-edge bg-panel/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Supported firmware</Eyebrow>
            <h2 className="mt-4 font-mono text-3xl font-extrabold uppercase leading-tight tracking-[-0.01em] sm:text-4xl">
              From LH-Jetronic, <span className="text-ink-faint">1982</span> — to{" "}
              <span className="glow-aqua">EDC17 &amp; Denso Subaru, 2020s</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted">
            <span className="font-semibold text-signal">38 extractor families</span> across 6
            manufacturers — every identification carries a confidence tier and
            the evidence behind it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* manufacturers */}
          <div className="scanlines relative border border-edge bg-panel">
            <Corners />
            <div className="border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-aqua">
              manufacturers · 6
            </div>
            <div className="px-5 py-2">
              {manufacturers.map((m, i) => (
                <div
                  key={m}
                  className="flex items-baseline border-b border-edge-soft py-2.5 last:border-b-0"
                >
                  <span className="mr-4 font-mono text-[11.5px] text-ink-faint">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[14px] font-bold uppercase tracking-[0.08em] text-ink">
                    {m}
                  </span>
                  <span className="ml-auto text-signal">●</span>
                </div>
              ))}
            </div>
            <div className="border-t border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              decode <span className="text-signal">38</span> extractor families
            </div>
          </div>

          {/* checksums */}
          <div className="scanlines relative border border-edge bg-panel">
            <Corners tone="cyan" />
            <div className="border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-aqua">
              checksum verification
            </div>
            <div className="px-5 py-5">
              <div className="flex flex-wrap gap-2">
                {checksumSchemes.map((s) => (
                  <span
                    key={s}
                    className="border border-edge-strong px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-aqua"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[13.5px] leading-relaxed text-ink-muted">
                Reliable detection — never guesswork. Verification only, no
                silent correction.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-signal">
                <i className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
                engine · health &amp; checksum commands
              </div>
            </div>
          </div>

          {/* decoders overview */}
          <div className="scanlines relative border border-edge bg-panel">
            <Corners />
            <div className="border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-aqua">
              how identify works
            </div>
            <div className="px-5 py-5">
              <p className="text-[14px] leading-relaxed text-ink-muted">
                No vendor lookup tables. OpenRemap{" "}
                <span className="font-semibold text-ink">decodes the ECU’s CPU directly</span> —
                extractors read real code references from the firmware.
              </p>
              <div className="mt-4 space-y-2.5">
                <div className="border border-edge bg-black/40 px-3.5 py-2.5">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-signal">
                    rust-native decoders
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                    For CPUs disassemblers ignore: C166/ST10, 8051, MCS-96 —
                    each verified against an independent oracle.
                  </p>
                </div>
                <div className="border border-edge bg-black/40 px-3.5 py-2.5">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-aqua">
                    capstone-backed decoders
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                    TriCore · SuperH · M680X · 68K · PowerPC · x86.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* decoder table */}
        <div className="scanlines relative mt-4 border border-edge-strong bg-panel">
          <Corners tone="cyan" />
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em]">
            <span className="text-aqua">cpu decoder matrix</span>
            <span className="hidden text-ink-faint md:block">
              every mapping evidence-backed — audited from reset-vector headers
            </span>
          </div>
          <div className="divide-y divide-edge-soft">
            {decoders.map((d) => (
              <div
                key={d.cpu}
                className="grid gap-1 px-5 py-2.5 md:grid-cols-[240px_1fr] md:items-baseline md:gap-6"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[13px] font-bold uppercase tracking-[0.06em] text-ink">
                    {d.cpu}
                  </span>
                  <span
                    className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                      d.backend === "rust"
                        ? "border-signal/50 text-signal"
                        : "border-aqua/40 text-aqua"
                    }`}
                  >
                    {d.backend}
                  </span>
                </div>
                <div className="font-mono text-[12.5px] leading-relaxed tracking-wide text-ink-muted">
                  {d.families}
                  {d.note && (
                    <span className="text-ink-faint"> — {d.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-edge px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            16-bit Denso Subaru units run 68HC16 — capstone has no HC16 support, so they are not disassembled
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Roadmap ─────────────────────────── */

const roadmap = [
  { version: "0.7.x", label: "Stabilisation", note: "current release line — live now", state: "live" as const },
  { version: "0.8.0", label: "Cross-firmware", note: "relocate tunes across SW revisions · plugins", state: "next" as const },
  { version: "0.9.0", label: "Modern TUI", note: "refined terminal experience", state: "next" as const },
  { version: "1.0.0", label: "OpenRemap Harness", note: "desktop app · win / mac / linux", state: "pending" as const },
];

function RoadmapSection() {
  return (
    <section id="roadmap" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow tone="muted">Roadmap — the road to v1.0.0</Eyebrow>
            <h2 className="mt-4 font-mono text-2xl font-extrabold uppercase tracking-[-0.01em] sm:text-3xl">
              One step left: <span className="glow-signal">the Harness</span>
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-ink-muted">
            The engine is stable and live. The next milestone is the desktop
            app — that’s the release we are standing by for.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((m, i) => {
            const active = m.state === "pending";
            const live = m.state === "live";
            return (
              <div key={m.version} className="relative">
                <div
                  className={`scanlines relative h-full border p-5 ${
                    active
                      ? "border-amber/45 bg-amber/[0.05]"
                      : "border-edge bg-panel"
                  }`}
                >
                  {active && <Corners tone="amber" />}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-sm font-bold ${
                        active ? "glow-signal" : live ? "text-signal" : "text-ink-muted"
                      }`}
                    >
                      {m.version}
                    </span>
                    {live && (
                      <span className="inline-flex items-center gap-1.5 border border-signal/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                        <i className="inline-block h-1 w-1 rounded-full bg-signal" />
                        live
                      </span>
                    )}
                    {active && (
                      <span className="inline-flex items-center gap-1.5 border border-amber/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
                        <i className="animate-lamp inline-block h-1 w-1 rounded-full bg-amber" />
                        pending
                      </span>
                    )}
                    {!live && !active && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                        next
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 font-mono text-[13px] font-bold uppercase tracking-[0.06em] ${active ? "text-ink" : "text-ink"}`}>
                    {m.label}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{m.note}</p>
                </div>
                {i < roadmap.length - 1 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-signal lg:block">
                    ▸
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Release CTA ─────────────────────────── */

function ReleaseSection() {
  return (
    <section id="release" className="scroll-mt-20 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="scanlines relative border border-edge-strong bg-panel">
          <Corners />
          <div className="flex flex-col items-center px-6 py-14 text-center sm:px-14">
            <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-amber">
              <i className="animate-lamp mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-amber align-middle" />
              release status — v1.0.0 pending
            </div>
            <h2 className="mt-6 font-mono text-3xl font-extrabold uppercase tracking-[-0.01em] sm:text-5xl">
              Stand by for <span className="glow-signal">the Harness</span>
            </h2>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
              The desktop app is coming to Windows, macOS and Linux. Watch the
              repo or follow releases — we’ll raise the flag the moment v1.0.0
              drops. Meanwhile, the engine is live:{" "}
              <code className="font-mono text-[14px] text-signal">pip install openremap</code>.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[#020d07] transition-colors hover:bg-[#5cf5bb]"
              >
                Follow the v1.0.0 release <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-edge-strong px-6 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-signal hover:text-signal"
              >
                <Star className="h-4 w-4" /> Star on GitHub
              </a>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-edge px-6 py-3 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-edge-strong hover:text-ink"
              >
                Docs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
            <div className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              no email lists — watch the repo · star · run the engine
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function HomePage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <StatusRail />
      <Hero />
      <Ticker />
      <EngineSection />
      <CoverageSection />
      <RoadmapSection />
      <ReleaseSection />
    </div>
  );
}
