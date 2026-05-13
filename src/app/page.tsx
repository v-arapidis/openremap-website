import { Suspense } from "react";
import CopyButton from "@/components/CopyButton";
import LandingTabs from "@/components/LandingTabs";
import { fetchLatestRelease } from "@/lib/changelog";

const LABEL_STYLES: Record<string, string> = {
  Fixed: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  New: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  Changed: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  Deprecated: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  Removed: "bg-red-500/10 border-red-500/30 text-red-400",
  Security: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  Tests: "bg-neutral-500/10 border-neutral-500/30 text-neutral-400",
};

function getLabelStyle(label: string): string {
  return (
    LABEL_STYLES[label] ??
    "bg-neutral-500/10 border-neutral-500/30 text-neutral-400"
  );
}

/* ─── Async streamed components (render independently, don't block page) ── */

async function VersionBadge() {
  const release = await fetchLatestRelease();
  if (!release) return null;

  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-sm text-neutral-400">
      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />v
      {release.version} —{" "}
      <a
        href="/docs/changelog"
        className="text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        See what&apos;s new
      </a>
    </div>
  );
}

function VersionBadgeSkeleton() {
  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5">
      <div className="h-2 w-2 rounded-full bg-neutral-700 animate-pulse" />
      <div className="h-4 w-36 rounded bg-neutral-800 animate-pulse" />
    </div>
  );
}

async function WhatsNew() {
  const release = await fetchLatestRelease();
  if (!release || release.entries.length === 0) return null;

  return (
    <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
      <div className="mx-auto max-w-3xl px-6 animate-fade-in-up">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          What&apos;s New in v{release.version}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
          {release.summary || "Latest improvements to the toolkit."}
        </p>
        <div className="mt-12 space-y-4">
          {release.entries.map((entry) => (
            <div
              key={entry.title}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getLabelStyle(entry.label)}`}
                >
                  {entry.label}
                </span>
                <span className="text-sm font-semibold text-white">
                  {entry.title}
                </span>
              </div>
              <p className="text-sm text-neutral-400">{entry.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-neutral-500">
          See the full{" "}
          <a
            href="/docs/changelog"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            changelog
          </a>{" "}
          for all previous releases.
        </p>
      </div>
    </section>
  );
}

function WhatsNewSkeleton() {
  return (
    <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mx-auto h-9 w-64 rounded-md bg-neutral-800 animate-pulse" />
        <div className="mx-auto mt-4 h-5 w-80 rounded bg-neutral-800/70 animate-pulse" />
        <div className="mt-12 space-y-4">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-14 rounded-full bg-neutral-800 animate-pulse" />
              <div className="h-4 w-48 rounded bg-neutral-800 animate-pulse" />
            </div>
            <div className="h-4 w-full rounded bg-neutral-800/60 animate-pulse mt-2" />
            <div className="h-4 w-3/4 rounded bg-neutral-800/60 animate-pulse mt-1.5" />
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-12 rounded-full bg-neutral-800 animate-pulse" />
              <div className="h-4 w-40 rounded bg-neutral-800 animate-pulse" />
            </div>
            <div className="h-4 w-full rounded bg-neutral-800/60 animate-pulse mt-2" />
            <div className="h-4 w-2/3 rounded bg-neutral-800/60 animate-pulse mt-1.5" />
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-16 rounded-full bg-neutral-800 animate-pulse" />
              <div className="h-4 w-44 rounded bg-neutral-800 animate-pulse" />
            </div>
            <div className="h-4 w-full rounded bg-neutral-800/60 animate-pulse mt-2" />
            <div className="h-4 w-1/2 rounded bg-neutral-800/60 animate-pulse mt-1.5" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page (non-async, renders instantly as static HTML) ──────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* FAQ structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does OpenRemap replace WinOLS or ECM Titanium?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. OpenRemap works alongside your calibration tools, not instead of them. WinOLS and ECM Titanium interpret maps, axes, and calibration tables. OpenRemap handles the binary-level plumbing underneath: identifying ECUs, diffing stock vs. tuned files byte-by-byte, and applying those changes reliably to other binaries.",
                },
              },
              {
                "@type": "Question",
                name: "Will OpenRemap corrupt my ECU binary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Every tune operation runs full pre-flight validation before a single byte is written — manufacturer, ECU family, file length, and context anchors must all match. If any check fails, the operation is aborted. Your original file is never modified. The operation is atomic: it either succeeds completely or nothing is written.",
                },
              },
              {
                "@type": "Question",
                name: "Is OpenRemap really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OpenRemap is MIT-licensed and open-source. No hidden tiers, no feature gates, no subscription. The source code is on GitHub — read every line if you want to.",
                },
              },
              {
                "@type": "Question",
                name: "Which ECUs does OpenRemap support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Currently there are 30 extractor families covering Bosch, Siemens, Delphi, and Marelli — including EDC17, EDC16, ME7, SIMOS, PPD, and many more. Coverage is expanding with every release.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use OpenRemap commercially in my workshop?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The MIT license allows unrestricted commercial use. You can use OpenRemap in your workshop, integrate it into your workflow, and charge customers for tuning work you do with it. No restrictions, no royalties.",
                },
              },
              {
                "@type": "Question",
                name: "Does OpenRemap collect any data or phone home?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Zero telemetry, zero analytics, zero network calls. Everything runs locally on your machine. Your binaries and recipes never leave your computer.",
                },
              },
              {
                "@type": "Question",
                name: "What is a .remap recipe file?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A small JSON file that records only the bytes you changed — not the full firmware. It contains your calibration work (the diff), cleanly separated from the manufacturer's intellectual property. You can share it without distributing copyrighted OEM firmware.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to know Python or the command line to use OpenRemap?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Type 'openremap' and a full graphical interface launches right in your terminal — no commands to memorise. After v1.0, a standalone .exe is planned so you won't even need Python installed.",
                },
              },
            ],
          }),
        }}
      />
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/3 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-32 text-center sm:pt-40 animate-fade-in-up">
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

          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
            Built for independent tuners, workshops, and anyone tired of
            managing raw .bin files.
          </p>

          <Suspense fallback={<VersionBadgeSkeleton />}>
            <VersionBadge />
          </Suspense>

          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://pypi.org/project/openremap/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/pypi/v/openremap?color=10b981&label=PyPI&style=flat-square"
                alt="PyPI version"
                className="h-5"
              />
            </a>
            <a
              href="https://pypi.org/project/openremap/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/pypi/dm/openremap?color=10b981&label=Downloads&style=flat-square"
                alt="PyPI downloads"
                className="h-5"
              />
            </a>
            <a
              href="https://github.com/v-arapidis/openremap-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/github/license/v-arapidis/openremap-core?color=10b981&style=flat-square"
                alt="License"
                className="h-5"
              />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#install"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Get Started
            </a>
            <a
              href="https://github.com/v-arapidis/openremap-core"
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

      {/* ───────────────────────── Tabbed Content ───────────────────────── */}
      <LandingTabs />

      {/* ───────────────────────── Install ───────────────────────── */}
      <section
        id="install"
        className="border-t border-neutral-800/60 bg-neutral-900/30 py-24"
      >
        <div className="mx-auto max-w-3xl px-6 animate-fade-in-up">
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
              href="/docs/install/windows"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              platform-specific installation guides
            </a>{" "}
            for Docker, Windows, and offline setups.
          </p>
        </div>
      </section>

      {/* ───────────────────────── What's New ───────────────────────── */}
      <Suspense fallback={<WhatsNewSkeleton />}>
        <WhatsNew />
      </Suspense>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="border-t border-neutral-800/60 bg-neutral-950 py-24">
        <div className="mx-auto max-w-2xl px-6 text-center animate-fade-in-up">
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
              href="https://github.com/v-arapidis/openremap-core"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
