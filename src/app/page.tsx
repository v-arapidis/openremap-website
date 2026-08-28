import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Star,
  Search,
  HeartPulse,
  Flame,
  Zap,
  FolderSearch,
  ShieldCheck,
  Sparkles,
  Monitor,
  GitBranch,
  Layers,
  FileText,
  ChevronRight,
  Terminal,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import TuiGallery from "@/components/TuiGallery";
import { GitHubIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";

/* ─────────────────────────── Shared bits ─────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-bright">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base leading-relaxed text-ink-muted">{sub}</p>
      )}
    </div>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

const terminalLines = [
  { cmd: "pip install openremap", out: "✔ installed — ready to go" },
  { cmd: "openremap identify stock.bin", out: "Bosch EDC17CP14 · confidence HIGH" },
  {
    cmd: "openremap cook stock.bin tuned.bin --output stage1.remap",
    out: "✔ wrote stage1.remap · 79 instructions",
  },
];

function TerminalDemo() {
  return (
    <div className="relative mx-auto mt-14 max-w-2xl">
      {/* glow behind terminal */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-brand/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-edge bg-surface shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center border-b border-edge bg-surface-2 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="mx-auto flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            <Terminal className="h-3.5 w-3.5" /> openremap — terminal
          </span>
          <span className="w-12" />
        </div>

        {/* Lines */}
        <div className="space-y-4 px-5 py-5 font-mono text-[13px] leading-relaxed sm:px-6">
          {terminalLines.map((line, i) => (
            <div
              key={line.cmd}
              className="terminal-line"
              style={{ animationDelay: `${0.3 + i * 0.45}s` }}
            >
              <div>
                <span className="select-none text-brand">$ </span>
                <span className="text-ink">{line.cmd}</span>
              </div>
              <div className="mt-0.5 text-ink-muted">{line.out}</div>
            </div>
          ))}
          <div
            className="terminal-line flex items-center gap-2"
            style={{ animationDelay: `${0.3 + terminalLines.length * 0.45}s` }}
          >
            <span className="select-none text-brand">$ </span>
            <span className="inline-block h-4 w-2 animate-blink bg-brand-bright" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background: grid + glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-180px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute right-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28 text-center sm:pt-32">
        {/* Announcement pill */}
        <div className="animate-fade-in-up inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-edge bg-surface/80 px-4 py-1.5 text-sm text-ink-muted backdrop-blur">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="font-medium text-ink">
            OpenRemap Harness
          </span>
          <span className="text-ink-faint">·</span>
          <span className="text-brand-bright">v1.0.0</span>
          <span className="text-ink-faint">— desktop app, coming soon</span>
        </div>

        <h1
          className="animate-fade-in-up mt-8 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.08s" }}
        >
          ECU binaries,
          <br />
          <span className="text-gradient">without the black box.</span>
        </h1>

        <p
          className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted"
          style={{ animationDelay: "0.16s" }}
        >
          OpenRemap is the open-source intelligence layer for ECU binary work —
          identify, health-check, cook, and tune, fully offline. The{" "}
          <span className="font-semibold text-ink">Harness</span> desktop app
          lands with v1.0.0.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.24s" }}
        >
          <Link
            href="/#install"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-brand-bright hover:shadow-[0_0_28px_rgba(16,185,129,0.4)]"
          >
            Get OpenRemap <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand-bright"
          >
            Read the docs <ExternalLink className="h-4 w-4 opacity-70" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" /> Star on GitHub
          </a>
        </div>

        {/* Badges */}
        <div
          className="animate-fade-in-up mt-7 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.32s" }}
        >
          <a
            href="https://pypi.org/project/openremap/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/pypi/v/openremap?color=10b981&label=PyPI&style=flat-square"
              alt="OpenRemap version on PyPI"
              className="h-5"
            />
          </a>
          <a href={`${GITHUB_URL}/stargazers`} target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.shields.io/github/stars/v-arapidis/openremap-core?color=10b981&style=flat-square"
              alt="GitHub stars"
              className="h-5"
            />
          </a>
          <a
            href={`${GITHUB_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/github/license/v-arapidis/openremap-core?color=10b981&style=flat-square"
              alt="MIT license"
              className="h-5"
            />
          </a>
        </div>

        <TerminalDemo />
      </div>
    </section>
  );
}

/* ─────────────────────────── Stats ─────────────────────────── */

const stats = [
  { value: "36", label: "extractor families" },
  { value: "6", label: "manufacturers" },
  { value: "100%", label: "offline — always" },
  { value: "0", label: "telemetry, ever" },
];

function StatsStrip() {
  return (
    <section className="border-y border-edge bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-gradient text-3xl font-extrabold tracking-tight sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1.5 text-xs font-medium uppercase tracking-widest text-ink-faint">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── Features ─────────────────────────── */

const features = [
  {
    icon: <Search className="h-5 w-5" />,
    title: "Identify",
    description:
      "36 extractors across 6 OEMs — Bosch, Siemens, Delphi, Marelli, Denso, Hitachi. Every result returns a confidence tier with the evidence behind it.",
    href: `${DOCS_URL}/commands/identify`,
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    title: "Health-check",
    description:
      "One command: checksums, axis sanity, map-count envelope, erased blocks, VIN duplication. CI-gateable, so it fits straight into your pipeline.",
    href: `${DOCS_URL}/commands/health`,
  },
  {
    icon: <Flame className="h-5 w-5" />,
    title: "Cook",
    description:
      "Diff a stock and tuned binary byte-by-byte into a portable .remap recipe — schema 4.5, map-annotated, and volatile-aware for cross-car portability.",
    href: `${DOCS_URL}/commands/cook`,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Tune",
    description:
      "Apply a recipe with validate → apply → verify-after. All-or-nothing — if any check fails, nothing is written to your binary.",
    href: `${DOCS_URL}/commands/tune`,
  },
  {
    icon: <FolderSearch className="h-5 w-5" />,
    title: "Scan",
    description:
      "Batch-identify every binary in a folder. Sort by manufacturer and ECU family. Flag suspicious files before you touch them.",
    href: `${DOCS_URL}/commands/scan`,
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Checksums",
    description:
      "Verify ME7, IronFelix, NefMoto, MS43, GS20/SMG2, and Denso Subaru checksum schemes — reliable detection, no guesswork.",
    href: `${DOCS_URL}/commands/checksum`,
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Everything you need,{" "}
              <span className="text-gradient">nothing you don&apos;t</span>
            </>
          }
          sub="A library-first engine under the hood, wrapped in a simple CLI — and soon a desktop app."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <a
              key={f.title}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-edge bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:bg-surface-2"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                {f.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {f.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Learn more <ChevronRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Harness (v1.0.0) ─────────────────────────── */

const milestones = [
  {
    version: "0.7.x",
    label: "Stabilisation",
    note: "current — bugs + third-party OSS integration",
    active: false,
  },
  {
    version: "0.8.0",
    label: "Cross-firmware",
    note: "relocate tunes between revisions + plugins",
    active: false,
  },
  {
    version: "0.9.0",
    label: "Modern TUI",
    note: "a refined, modern terminal interface",
    active: false,
  },
  {
    version: "1.0.0",
    label: "OpenRemap Harness",
    note: "desktop app — Windows · macOS · Linux",
    active: true,
  },
];

function HarnessSection() {
  return (
    <section id="harness" className="relative scroll-mt-24 overflow-hidden py-24">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand/25 bg-surface p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-bright ring-1 ring-brand/30">
                <Sparkles className="h-3.5 w-3.5" /> Coming in v1.0.0
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Introducing{" "}
                <span className="text-gradient">OpenRemap Harness</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                A native desktop app for Windows, macOS, and Linux that wraps
                the entire OpenRemap engine. No Python. No terminal. Download,
                double-click, and tune.
              </p>

              <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                {[
                  { title: "Native desktop app", note: "Windows · macOS · Linux" },
                  { title: "No Python install", note: "double-click and go" },
                  { title: "Same engine", note: "the exact CLI you trust today" },
                ].map((chip) => (
                  <div
                    key={chip.title}
                    className="rounded-xl border border-edge bg-surface-2/70 px-4 py-4 text-center"
                  >
                    <Monitor className="mx-auto h-5 w-5 text-brand-bright" />
                    <p className="mt-2 text-sm font-semibold text-ink">
                      {chip.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">{chip.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-brand-bright hover:shadow-[0_0_28px_rgba(16,185,129,0.4)]"
                >
                  <GitHubIcon className="h-4 w-4" /> Watch the repo
                </a>
                <a
                  href={`${GITHUB_URL}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand-bright"
                >
                  <Star className="h-4 w-4" /> Follow releases
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <div
              key={m.version}
              className={`rounded-2xl border p-5 transition-all ${
                m.active
                  ? "border-brand/40 bg-brand/10 shadow-[0_0_30px_rgba(16,185,129,0.12)]"
                  : "border-edge bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-sm font-bold ${
                    m.active ? "text-brand-bright" : "text-ink-muted"
                  }`}
                >
                  {m.version}
                </span>
                {m.active && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-bright">
                    <GitBranch className="h-3 w-3" /> next
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-faint">
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

const pipelineSteps = [
  {
    step: 1,
    title: "Identify",
    description:
      "Feed in a raw binary. OpenRemap fingerprints it against 36 extractors and returns structured metadata with a confidence tier.",
  },
  {
    step: 2,
    title: "Cook",
    description:
      "Supply a stock and tuned binary pair. OpenRemap diffs them byte-by-byte and outputs a portable .remap recipe file.",
  },
  {
    step: 3,
    title: "Validate",
    description:
      "Before anything is written, every recipe is validated against the target — manufacturer, family, and length must all match.",
  },
  {
    step: 4,
    title: "Tune",
    description:
      "Apply the recipe to produce a patched binary. Atomic — if any check fails, nothing is written.",
  },
];

function HowItWorksSection() {
  return (
    <section className="border-t border-edge bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From stock binary to tuned output"
          sub="A simple four-step pipeline. Every step is verifiable, every step is offline."
        />
        <div className="relative mt-14 space-y-12 pl-12">
          <div className="absolute bottom-4 left-[15px] top-4 w-px bg-edge" />
          {pipelineSteps.map((s) => (
            <div key={s.step} className="relative">
              <div className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-sm font-bold text-brand-bright">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Showcase ─────────────────────────── */

function ShowcaseSection() {
  return (
    <section id="showcase" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Showcase"
          title={
            <>
              See it in <span className="text-gradient">action</span>
            </>
          }
          sub="The terminal interface that powers the engine today — the same engine Harness will wrap."
        />
        <div className="mt-14">
          <TuiGallery />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Why OpenRemap ─────────────────────────── */

const whyPoints = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Works alongside your calibration tools",
    description:
      "OpenRemap is not a WinOLS or ECM Titanium replacement — it fills the gap underneath them: the binary-level plumbing nobody opens up.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Recipes, not firmware",
    description:
      "A .remap recipe records only the bytes you changed — your calibration work, cleanly separated from OEM intellectual property. Shareable, auditable, versionable.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Verifiable end-to-end",
    description:
      "Every operation runs validate → apply → verify-after with atomic semantics. If any check fails, your original file is never touched.",
  },
];

function WhySection() {
  return (
    <section className="border-t border-edge bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why OpenRemap"
          title="The layer below your calibration software"
          sub="Open-source, offline-first, and built to be audited — every byte, every step."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-edge bg-surface-2/60 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                {p.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Install ─────────────────────────── */

function InstallSection() {
  return (
    <section id="install" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Install"
          title="Install in seconds"
          sub="Choose your package manager and you&apos;re ready to go — the desktop app arrives with v1.0.0."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-edge bg-surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">pip</h3>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-bright">
                recommended
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-edge bg-bg px-4 py-3">
              <code className="text-sm text-ink-muted">
                pip install openremap
              </code>
              <CopyButton text="pip install openremap" />
            </div>
          </div>
          <div className="rounded-2xl border border-edge bg-surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ink">uv</h3>
              <span className="rounded-full border border-edge bg-surface-3 px-2.5 py-0.5 text-xs font-medium text-ink-muted">
                fast
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-edge bg-bg px-4 py-3">
              <code className="text-sm text-ink-muted">
                uv pip install openremap
              </code>
              <CopyButton text="uv pip install openremap" />
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-ink-faint">
          Runs entirely offline. .bin, .ori, and .hex files all accepted. See
          the{" "}
          <a
            href={`${DOCS_URL}/getting-started/install`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-bright underline underline-offset-2 hover:text-brand"
          >
            install guide
          </a>{" "}
          for Windows, macOS, and Linux details.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */

function CtaSection() {
  return (
    <section className="border-t border-edge py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface px-8 py-16 text-center sm:px-14">
          <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" />
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Be ready for <span className="text-gradient">v1.0.0</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            OpenRemap Harness will wrap the exact engine you can run today. Star
            the repo, read the docs, and try the CLI now — so you&apos;re tuning
            the day Harness ships.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-bg transition-all hover:bg-brand-bright hover:shadow-[0_0_28px_rgba(16,185,129,0.4)]"
            >
              <GitHubIcon className="h-4 w-4" /> Star on GitHub
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand-bright"
            >
              Read the docs <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
            <Link
              href="/#install"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Try the CLI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function HomePage() {
  return (
    <div className="bg-bg text-ink">
      <Hero />
      <StatsStrip />
      <FeaturesSection />
      <HarnessSection />
      <HowItWorksSection />
      <ShowcaseSection />
      <WhySection />
      <InstallSection />
      <CtaSection />
    </div>
  );
}
