import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Star,
  ExternalLink,
  LayoutDashboard,
  SlidersHorizontal,
  Binary,
  Boxes,
  Workflow,
  MonitorSmartphone,
  Lock,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";
const PYPI_URL = "https://pypi.org/project/openremap/";

/* ─────────────────────────── Shared bits ─────────────────────────── */

type Tone = "green" | "cyan" | "violet" | "pink" | "amber" | "blue";

const toneText: Record<Tone, string> = {
  green: "text-signal",
  cyan: "text-aqua",
  violet: "text-violet",
  pink: "text-pink",
  amber: "text-amber",
  blue: "text-blue",
};

const toneChip: Record<Tone, string> = {
  green: "bg-signal/10 text-signal",
  cyan: "bg-aqua/10 text-aqua",
  violet: "bg-violet/10 text-violet",
  pink: "bg-pink/10 text-pink",
  amber: "bg-amber/10 text-amber",
  blue: "bg-blue/10 text-blue",
};

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

function Eyebrow({ children, color = "text-aqua" }: { children: ReactNode; color?: string }) {
  return <p className={`text-sm font-medium ${color}`}>{children}</p>;
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-violet/[0.10] blur-3xl" />
        <div className="absolute right-[-140px] top-[220px] h-[380px] w-[380px] rounded-full bg-aqua/[0.08] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <p className="animate-fade-in-up text-sm text-ink-muted">
          OpenRemap Harness · native desktop app — Windows · macOS · Linux
        </p>

        <h1 className="animate-fade-in-up mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl">
          ECU binaries, without the <span className="text-gradient">black box.</span>
        </h1>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          The Harness puts the whole OpenRemap engine behind one clean interface —
          identify, inspect, edit, render and automate ECU firmware, from a single
          window.
        </p>

        <div
          className="animate-fade-in-up mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.1s" }}
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 text-sm font-medium text-[#04110c] transition-colors hover:bg-[#4fe3ab]"
          >
            Follow the release <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-edge-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-white/30"
          >
            <Star className="h-4 w-4" /> Star on GitHub
          </a>
          <Link
            href="#engine"
            className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-aqua transition-colors hover:text-ink"
          >
            The engine is live today ↓
          </Link>
        </div>

        <p className="mt-5 text-sm text-ink-faint">
          <span className="text-amber">●</span> Harness v1.0.0 — coming soon · the engine is
          already live
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────── Harness features ─────────────────────── */

const features: { icon: ReactNode; title: string; desc: string; tone: Tone }[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Graphical engine host",
    desc: "A clean desktop front-end for openremap-core — the engine analyzes, the app makes it visual.",
    tone: "green",
  },
  {
    icon: <SlidersHorizontal className="h-5 w-5" />,
    title: "Fully customizable",
    desc: "A workspace you shape for tuners, researchers and ECU reverse engineers.",
    tone: "cyan",
  },
  {
    icon: <Binary className="h-5 w-5" />,
    title: "Hex viewer + editing",
    desc: "Inspect firmware in a fast hex view with light, deliberate edits.",
    tone: "violet",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "2D & 3D map rendering",
    desc: "Modern, GPU-fast rendering of ECU maps in 2D and 3D.",
    tone: "pink",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Automatic workflows",
    desc: "Script and schedule repetitive jobs — for individuals and enterprise.",
    tone: "amber",
  },
  {
    icon: <MonitorSmartphone className="h-5 w-5" />,
    title: "Offline & native",
    desc: "Windows, macOS, Linux. No telemetry, no cloud — your files stay local.",
    tone: "blue",
  },
];

function HarnessSection() {
  return (
    <Section id="harness">
      <div className="max-w-2xl">
        <Eyebrow color="text-pink">The Harness</Eyebrow>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          The entire engine. <span className="text-ink-muted">One interface.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          OpenRemap Harness hosts the engine behind a desktop app, and gives every
          role in the tuning workflow the tools they need — in one place.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-edge bg-panel p-6 transition-colors hover:border-edge-strong"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneChip[f.tone]}`}
            >
              {f.icon}
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────── Stats band ─────────────────────── */

const stats: { value: string; label: string; tone: Tone }[] = [
  { value: "38", label: "extractor families", tone: "green" },
  { value: "6", label: "OEMs supported", tone: "cyan" },
  { value: "6", label: "checksum schemes", tone: "violet" },
  { value: "9", label: "CPU decoders", tone: "pink" },
  { value: "312k", label: "instructions verified", tone: "amber" },
];

function StatsBand() {
  return (
    <div className="border-y border-edge bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className={`text-4xl font-bold tracking-tight sm:text-5xl ${toneText[s.tone]}`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-sm text-ink-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Engine / why open source ─────────────────────── */

const pillars: { icon: ReactNode; title: string; desc: string; tone: Tone }[] = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: "No black box",
    desc: "Every match is decoded from the CPU itself and evidence-backed — never a secret lookup table.",
    tone: "green",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Open by design",
    desc: "MIT-licensed core, fully offline, zero telemetry. Your files never leave your machine.",
    tone: "cyan",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Built to last",
    desc: "A community-owned alternative to closed tuning suites — free to verify, extend and keep.",
    tone: "violet",
  },
];

function EngineSection() {
  return (
    <Section id="engine">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <Eyebrow color="text-aqua">openremap-core — the engine</Eyebrow>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The engine is open. <span className="text-ink-muted">So is the method.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            openremap-core is the engine the Harness hosts — an open-source Python
            library with a Rust core, live today as a CLI. It reads ECU firmware the
            hard way:{" "}
            <span className="text-ink">by decoding the microcontroller itself.</span>
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            ECU reverse engineering has long been locked behind expensive, closed
            tools. OpenRemap opens the method, so tuners and researchers can see,
            verify and build on it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={PYPI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-edge bg-panel px-4 py-2.5 font-mono text-sm text-ink transition-colors hover:border-edge-strong"
            >
              <span className="text-signal">$</span> pip install openremap
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Docs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-2xl border border-edge bg-panel p-5"
            >
              <div
                className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${toneChip[p.tone]}`}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────── .remap recipe ─────────────────────── */

const recipeChips = ["portable", "schema 4.5", "map-annotated", "volatile-aware"];

function RecipeSection() {
  return (
    <Section id="recipe" className="border-t border-edge bg-panel/30">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow color="text-violet">The .remap recipe</Eyebrow>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            One file. <span className="text-ink-muted">Stock → tuned.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            Cook a diff into a single portable recipe — every changed map annotated,
            volatile regions flagged, checksums re-verified. Apply it anywhere the
            engine runs.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {recipeChips.map((c) => (
              <span
                key={c}
                className="rounded-md bg-violet/10 px-2.5 py-1 text-xs text-violet"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-edge bg-bg">
          <div className="flex items-center justify-between border-b border-edge px-5 py-3">
            <span className="font-mono text-sm text-ink-muted">
              stage1<span className="text-violet">.remap</span>
            </span>
            <span className="text-xs text-ink-faint">concept</span>
          </div>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.85] text-ink-muted">
            <code>
              <span className="text-ink-faint"># tuned.remap — schema 4.5</span>
              {"\n"}
              name: <span className="text-violet">Stage 1</span>
              {"\n"}
              base: <span className="text-aqua">stock.bin</span>
              {"\n"}
              target: <span className="text-aqua">tuned.bin</span>
              {"\n\n"}
              diff:
              {"\n"}
              {"  "}maps: <span className="text-signal">14</span>
              {"\n"}
              {"  "}volatile: <span className="text-amber">3</span>
              {"\n"}
              {"  "}checksums: <span className="text-signal">ok ✓</span>
              {"\n\n"}
              maps:
              {"\n"}
              {"  "}- id: 0x1A2F · axis: rpm×load · <span className="text-pink">Δ +11.2%</span>
              {"\n"}
              {"  "}- id: 0x3B14 · axis: load×iat · <span className="text-pink">Δ +6.4%</span>
            </code>
          </pre>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────── Roadmap ─────────────────────────── */

const roadmap = [
  { version: "0.7.x", label: "Stabilisation", note: "Current release line — live now", state: "live" as const },
  { version: "0.8.0", label: "Cross-firmware", note: "Relocate tunes across SW revisions · plugins", state: "next" as const },
  { version: "0.9.0", label: "Modern TUI", note: "Refined terminal experience", state: "next" as const },
  { version: "1.0.0", label: "OpenRemap Harness", note: "Desktop app · Windows / macOS / Linux", state: "pending" as const },
];

function RoadmapSection() {
  return (
    <Section id="roadmap">
      <div className="max-w-2xl">
        <Eyebrow color="text-ink-faint">Roadmap — the road to v1.0.0</Eyebrow>
        <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          One step left: <span className="text-pink">the Harness</span>
        </h2>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {roadmap.map((m) => {
          const pending = m.state === "pending";
          const live = m.state === "live";
          return (
            <div
              key={m.version}
              className={`rounded-2xl border p-5 ${
                pending ? "border-pink/30 bg-pink/[0.05]" : "border-edge bg-panel"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-sm font-semibold ${
                    pending ? "text-pink" : live ? "text-signal" : "text-ink-muted"
                  }`}
                >
                  {m.version}
                </span>
                {live && <span className="text-xs text-signal">● live</span>}
                {pending && <span className="text-xs text-pink">● pending</span>}
                {!live && !pending && <span className="text-xs text-ink-faint">next</span>}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-faint">{m.note}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─────────────────────────── Release CTA ─────────────────────────── */

function ReleaseSection() {
  return (
    <section id="release" className="scroll-mt-24 pb-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm text-ink-faint">
          <span className="text-pink">●</span> release status — v1.0.0 pending
        </p>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          Stand by for <span className="text-gradient">the Harness</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
          The desktop app is coming to Windows, macOS and Linux. Watch the repo —
          we’ll raise the flag the moment v1.0.0 drops. Meanwhile, the engine is
          live:
        </p>
        <p className="mt-3 font-mono text-sm text-signal">$ pip install openremap</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-signal px-6 py-3 text-sm font-medium text-[#04110c] transition-colors hover:bg-[#4fe3ab]"
          >
            Follow the release <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-edge-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-white/30"
          >
            <Star className="h-4 w-4" /> Star on GitHub
          </a>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-edge px-6 py-3 text-sm text-ink-muted transition-colors hover:border-edge-strong hover:text-ink"
          >
            Docs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function HomePage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <Hero />
      <HarnessSection />
      <StatsBand />
      <EngineSection />
      <RecipeSection />
      <RoadmapSection />
      <ReleaseSection />
    </div>
  );
}
