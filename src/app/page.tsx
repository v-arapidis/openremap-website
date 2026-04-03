import { Search, ClipboardList, Zap, FolderSearch } from "lucide-react";
import CopyButton from "@/components/CopyButton";

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Identify",
    description:
      "Read any ECU binary and extract manufacturer, family, hardware number, software version, and calibration data in under a second.",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Cook",
    description:
      "Diff a stock and tuned binary byte-by-byte into a portable .remap recipe — a structured JSON file listing every changed byte with context anchors.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Tune",
    description:
      "Apply a recipe to a target binary with full pre-flight validation. All-or-nothing — partial patches never happen.",
  },
  {
    icon: <FolderSearch className="h-6 w-6" />,
    title: "Scan",
    description:
      "Batch-identify every binary in a folder. Sort them by manufacturer and ECU family. Flag suspicious files before you touch them.",
  },
];

const pipelineSteps = [
  {
    step: 1,
    title: "Identify",
    description:
      "Feed in a raw binary. OpenRemap fingerprints it against 30 extractors and returns structured metadata with a confidence score.",
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
      "Before anything is written, every recipe is validated against the target binary — manufacturer, family, and length must all match.",
  },
  {
    step: 4,
    title: "Tune",
    description:
      "Apply the recipe to produce a patched binary. The operation is atomic — if any check fails, nothing is written.",
  },
];

const confidenceLevels = [
  {
    level: "HIGH",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    description: "Strong match on multiple markers — safe to proceed.",
  },
  {
    level: "MEDIUM",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    description: "Partial match — review the output before acting.",
  },
  {
    level: "LOW",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/30",
    description: "Weak signals only — manual verification recommended.",
  },
  {
    level: "SUSPICIOUS",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    description: "Contradictory markers detected — do not trust blindly.",
  },
  {
    level: "UNKNOWN",
    color: "text-neutral-400",
    bg: "bg-neutral-500/10 border-neutral-500/30",
    description: "No extractor matched — the binary is unrecognised.",
  },
];

const coverageData = [
  {
    manufacturer: "Bosch",
    families: 18,
    examples: "EDC17, EDC16, ME7, M5.x, and more",
  },
  { manufacturer: "Siemens", families: 6, examples: "SIMOS, PPD, SID, Simtec" },
  { manufacturer: "Delphi", families: 2, examples: "Multec, Multec S" },
  {
    manufacturer: "Marelli",
    families: 4,
    examples: "IAW 1AV, IAW 1AP, IAW 4LV, MJD 6JF",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 text-center sm:pt-40">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Open-Source{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              ECU Binary
            </span>{" "}
            Toolkit
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Identify, diff, and patch ECU binaries. Free. Offline. No data
            leaves your machine.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#install"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Get Started
            </a>
            <a
              href="https://github.com/Pinelo92/openremap"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white"
            >
              View on GitHub
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
            <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
              <span className="ml-2 text-xs text-neutral-500">terminal</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <code className="text-sm text-neutral-300">
                <span className="select-none text-emerald-500">$ </span>
                pip install openremap
              </code>
              <CopyButton text="pip install openremap" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Features ───────────────────────── */}
      <section
        id="features"
        className="border-t border-neutral-800/60 bg-neutral-950 py-24"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
            Four commands. Zero cloud dependencies. Works on any machine with
            Python&nbsp;3.10+.
          </p>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
              >
                <span className="text-emerald-400">{f.icon}</span>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── How It Works ───────────────────────── */}
      <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
            A simple four-step pipeline from raw binary to patched output.
          </p>

          <div className="relative mt-16 space-y-12 pl-12">
            {/* Vertical connector line */}
            <div className="absolute bottom-4 left-[15px] top-4 w-px bg-neutral-800" />

            {pipelineSteps.map((s) => (
              <div key={s.step} className="relative">
                {/* Step circle */}
                <div className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Coverage ───────────────────────── */}
      <section className="border-t border-neutral-800/60 bg-neutral-950 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Broad ECU Coverage
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
            30 extractors across 4 manufacturers, from 1982 to present.
          </p>

          <div className="mt-12 overflow-hidden rounded-xl border border-neutral-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-900/60">
                  <th className="px-5 py-3 font-semibold text-neutral-300">
                    Manufacturer
                  </th>
                  <th className="px-5 py-3 text-center font-semibold text-neutral-300">
                    Families
                  </th>
                  <th className="px-5 py-3 font-semibold text-neutral-300">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {coverageData.map((row) => (
                  <tr
                    key={row.manufacturer}
                    className="border-b border-neutral-800/60"
                  >
                    <td className="px-5 py-3 font-medium">
                      {row.manufacturer}
                    </td>
                    <td className="px-5 py-3 text-center text-emerald-400">
                      {row.families}
                    </td>
                    <td className="px-5 py-3 text-neutral-400">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-neutral-900/40">
                  <td className="px-5 py-3 font-semibold">Total</td>
                  <td className="px-5 py-3 text-center font-semibold text-emerald-400">
                    30
                  </td>
                  <td className="px-5 py-3" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Install ───────────────────────── */}
      <section
        id="install"
        className="border-t border-neutral-800/60 bg-neutral-900/30 py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Install in seconds
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
            Choose your preferred package manager and you&apos;re ready to go.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {/* pip card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">pip</h3>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  recommended
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
                <code className="text-sm text-neutral-300">
                  pip install openremap
                </code>
                <CopyButton text="pip install openremap" />
              </div>
            </div>

            {/* uv card */}
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">uv</h3>
                <span className="rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-400">
                  fast
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
                <code className="text-sm text-neutral-300">
                  uv pip install openremap
                </code>
                <CopyButton text="uv pip install openremap" />
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            See the{" "}
            <a
              href="/docs/about"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              platform-specific installation guides
            </a>{" "}
            for Docker, Windows, and offline setups.
          </p>
        </div>
      </section>

      {/* ───────────────────────── Confidence ───────────────────────── */}
      <section className="border-t border-neutral-800/60 bg-neutral-950 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Built-in Confidence Scoring
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
            Every identification returns a confidence level so you always know
            how much to trust the result.
          </p>

          <div className="mt-12 space-y-4">
            {confidenceLevels.map((c) => (
              <div
                key={c.level}
                className={`flex flex-col gap-2 rounded-lg border px-5 py-4 sm:flex-row sm:items-center sm:gap-4 ${c.bg}`}
              >
                <span
                  className={`text-sm font-bold tracking-wider ${c.color} w-28 shrink-0`}
                >
                  {c.level}
                </span>
                <span className="text-sm text-neutral-400">
                  {c.description}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Learn more in the{" "}
            <a
              href="/docs/about"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              full documentation
            </a>
            .
          </p>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to try it?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-400">
            Install OpenRemap and start identifying ECU binaries in under a
            minute.
          </p>

          <div className="mx-auto mt-10 flex max-w-md items-center justify-between gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-5 py-3">
            <code className="text-sm text-neutral-300">
              <span className="select-none text-emerald-500">$ </span>
              pip install openremap
            </code>
            <CopyButton text="pip install openremap" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/docs/about"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Read the Docs
            </a>
            <a
              href="https://github.com/Pinelo92/openremap"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
