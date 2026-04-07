"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  FileText,
  Monitor,
  BarChart3,
  Search,
  ClipboardList,
  Zap,
  FolderSearch,
  Scale,
  ShieldCheck,
  Eye,
  WifiOff,
  HardDrive,
  Lock,
  MonitorSmartphone,
  Package,
  Flag,
  CheckCircle2,
  Circle,
  Loader2,
  Lightbulb,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import TuiGallery from "@/components/TuiGallery";

const features = [
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

const coverageData = [
  {
    manufacturer: "Bosch",
    families: 18,
    examples: "EDC17, EDC16, ME7, M5.x, and more",
  },
  {
    manufacturer: "Siemens",
    families: 6,
    examples: "SIMOS, PPD, SID, Simtec",
  },
  {
    manufacturer: "Delphi",
    families: 2,
    examples: "Multec, Multec S",
  },
  {
    manufacturer: "Marelli",
    families: 4,
    examples: "IAW 1AV, IAW 1AP, IAW 4LV, MJD 6JF",
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

const roadmapItems = [
  {
    phase: "Now",
    title: "CLI + TUI — identify, cook, tune, scan",
    description:
      "Full interactive terminal interface with four core commands. Install with pip and start working immediately.",
    status: "done" as const,
  },
  {
    phase: "v0.x",
    title: "Expanding ECU coverage",
    description:
      "More Bosch families, Denso, Keihin, Continental — adding extractors for the ECUs you actually see on the bench.",
    status: "in-progress" as const,
  },
  {
    phase: "v0.x",
    title: "Map recognition — see what you\u2019re editing",
    description:
      "Identify the maps, tables, and axes inside your binaries automatically. Know exactly which calibration data you\u2019re looking at before you change a single byte — no more guessing offsets in a hex editor.",
    status: "planned" as const,
  },
  {
    phase: "v1.0",
    title: "Stable release — recipe format frozen",
    description:
      "Stable API, locked recipe format, full test coverage. The foundation everything else builds on.",
    status: "planned" as const,
  },
  {
    phase: "Post v1.0",
    title: "Standalone desktop app — no Python needed",
    description:
      "Download a .exe on Windows (or native bundles on macOS / Linux), double-click, and you\u2019re tuning. No terminal, no Python, no setup.",
    status: "planned" as const,
  },
  {
    phase: "Future",
    title: "Recipe sharing & community marketplace",
    description:
      "Optional, privacy-first way to share and discover recipes from other tuners. Your files stay yours — sharing is always opt-in.",
    status: "exploring" as const,
  },
  {
    phase: "Future",
    title: "Checksum correction",
    description:
      "Automatic checksum recalculation after patching, so the binary is flash-ready straight out of the tool.",
    status: "exploring" as const,
  },
];

const statusConfig = {
  done: {
    label: "Done",
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  "in-progress": {
    label: "In Progress",
    icon: <Loader2 className="h-4 w-4" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/30",
    dot: "bg-blue-500",
  },
  planned: {
    label: "Planned",
    icon: <Circle className="h-4 w-4" />,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    dot: "bg-yellow-500",
  },
  exploring: {
    label: "Exploring",
    icon: <Lightbulb className="h-4 w-4" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/30",
    dot: "bg-purple-500",
  },
};

const faqItems = [
  {
    question: "Does this replace WinOLS or ECM Titanium?",
    answer:
      "No. OpenRemap works alongside your calibration tools, not instead of them. WinOLS and ECM Titanium interpret maps, axes, and calibration tables — that\u2019s their job and they do it well. OpenRemap handles the binary-level plumbing underneath: identifying ECUs, diffing stock vs. tuned files byte-by-byte, and applying those changes reliably to other binaries. Think of it as the layer below your calibration software.",
  },
  {
    question: "Will it corrupt my binary?",
    answer:
      "No. Every tune operation runs full pre-flight validation before a single byte is written — manufacturer, ECU family, file length, and context anchors must all match. If any check fails, the operation is aborted. Your original file is never modified in place. The operation is atomic: it either succeeds completely or nothing is written.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. OpenRemap is MIT-licensed and open-source. No hidden tiers, no feature gates, no subscription, no \u201Cfree for personal use\u201D caveats. The source code is on GitHub \u2014 read every line if you want to.",
  },
  {
    question: "Does it support my ECU?",
    answer:
      "Currently there are 30 extractor families covering Bosch, Siemens, Delphi, and Marelli \u2014 including EDC17, EDC16, ME7, SIMOS, PPD, and many more. Check the Coverage tab for the full list, or just run \u201Copenremap identify\u201D on your binary to find out. Coverage is expanding with every release.",
  },
  {
    question: "Can I use this commercially in my workshop?",
    answer:
      "Yes. The MIT license allows unrestricted commercial use. You can use OpenRemap in your workshop, integrate it into your workflow, build services on top of it, and charge your customers for the tuning work you do with it. No restrictions, no royalties.",
  },
  {
    question: "Does it phone home or collect any data?",
    answer:
      "No. Zero telemetry, zero analytics, zero network calls. Everything runs locally on your machine. Your binaries and recipes never leave your computer. The source is open \u2014 verify it yourself.",
  },
  {
    question: "What exactly is a .remap recipe?",
    answer:
      "A small JSON file that records only the bytes you changed \u2014 not the full firmware. It contains your calibration work (the diff), cleanly separated from the manufacturer\u2019s intellectual property. You can read it, audit it, version it, and share it without distributing copyrighted OEM firmware. See the Recipes tab for the full explanation.",
  },
  {
    question: "Do I need to know Python or the command line?",
    answer:
      "No. Type \u201Copenremap\u201D and a full graphical interface launches right in your terminal \u2014 no commands to memorise. After v1.0, a standalone .exe is planned so you won\u2019t even need Python installed.",
  },
];

const comparisonRows = [
  {
    capability: "Identify ECU from raw binary",
    hexEditor: "no",
    calibrationTool: "partial",
    openremap: "yes",
  },
  {
    capability: "Structured byte-level diff",
    hexEditor: "no",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "Portable recipe format",
    hexEditor: "no",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "Pre-flight validation before patching",
    hexEditor: "no",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "Batch-scan entire folders",
    hexEditor: "no",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "Confidence scoring",
    hexEditor: "no",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "100% offline, no telemetry",
    hexEditor: "yes",
    calibrationTool: "varies",
    openremap: "yes",
  },
  {
    capability: "Open source",
    hexEditor: "yes",
    calibrationTool: "no",
    openremap: "yes",
  },
  {
    capability: "Map & table editing",
    hexEditor: "no",
    calibrationTool: "yes",
    openremap: "planned",
  },
  {
    capability: "Checksum correction",
    hexEditor: "no",
    calibrationTool: "yes",
    openremap: "planned",
  },
];

const tabDefinitions = [
  { label: "Overview", icon: <Layers className="h-4 w-4" /> },
  { label: "Recipes", icon: <FileText className="h-4 w-4" /> },
  { label: "The App", icon: <Monitor className="h-4 w-4" /> },
  { label: "Coverage", icon: <BarChart3 className="h-4 w-4" /> },
  { label: "Roadmap", icon: <Flag className="h-4 w-4" /> },
  { label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
];

const tabSlugs = [
  "overview",
  "recipes",
  "the-app",
  "coverage",
  "roadmap",
  "faq",
];

function FaqAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-800/30"
      >
        <span className="text-sm font-semibold text-white">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingTabs() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const idx = tabSlugs.indexOf(hash);
    if (idx !== -1) {
      setActiveTab(idx);
    }
  }, []);

  return (
    <div>
      {/* Sticky tab bar */}
      <div
        id="roadmap"
        className="sticky top-16 z-30 border-b border-neutral-800/60 bg-neutral-950/95 backdrop-blur-md"
      >
        <div className="mx-auto max-w-3xl overflow-x-auto px-6">
          <div className="flex flex-nowrap gap-1">
            {tabDefinitions.map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`relative flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                  i === activeTab
                    ? "text-emerald-400"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-500 transition-opacity duration-200 ${
                    i === activeTab ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}

      {/* Tab 1: Overview */}
      {activeTab === 0 && (
        <div>
          {/* Sub-section A: The gap no tool fills */}
          <section className="bg-neutral-900/30 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                The gap no tool fills
              </h2>
              <div className="mt-10 space-y-6 text-base leading-relaxed text-neutral-400">
                <p>
                  When you load a tune into WinOLS, ECM Titanium, or any
                  professional calibration tool, those tools are doing something
                  sophisticated: they interpret the binary. They know where the
                  maps are, what the axes mean, what the values represent.{" "}
                  <span className="text-neutral-300">
                    That knowledge is valuable, and those tools have earned
                    their place in professional workshops.
                  </span>
                </p>
                <p className="text-lg font-medium text-neutral-200">
                  But there is a gap they do not fill.
                </p>
                <p>
                  When you take a modified binary and want to know{" "}
                  <em className="text-emerald-400 not-italic font-medium">
                    exactly
                  </em>{" "}
                  what changed — at the byte level — and move that change
                  reliably to another ECU with the same software, there is no
                  clean, open, scriptable way to do it. You are either
                  eyeballing hex diffs, using proprietary scripts, or hoping the
                  checksum tool and the flash tool agree on what happened.
                </p>
                <p>
                  <span className="text-neutral-200 font-medium">
                    OpenRemap fills that gap.
                  </span>{" "}
                  It does not try to replace calibration software. It works
                  alongside it.
                </p>
              </div>
            </div>
          </section>

          {/* Sub-section B: Everything you need */}
          <section className="border-t border-neutral-800/60 bg-neutral-950 py-24">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                Four commands. Zero cloud dependencies. Works on any machine
                with Python&nbsp;3.14+.
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

          {/* Sub-section C: How It Works */}
          <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
                A simple four-step pipeline from raw binary to patched output.
              </p>
              <div className="relative mt-16 space-y-12 pl-12">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-neutral-800" />
                {pipelineSteps.map((s) => (
                  <div key={s.step} className="relative">
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

          {/* Sub-section D: How it compares */}
          <section className="border-t border-neutral-800/60 bg-neutral-950 py-24">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                How it compares
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                OpenRemap doesn&apos;t replace your calibration software — it
                fills the gap underneath it. Here&apos;s where each type of tool
                sits.
              </p>
              <div className="mt-12 overflow-hidden rounded-xl border border-neutral-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/60">
                      <th className="px-5 py-3 font-semibold text-neutral-300">
                        Capability
                      </th>
                      <th className="px-5 py-3 text-center font-semibold text-neutral-300">
                        Hex editor
                      </th>
                      <th className="px-5 py-3 text-center font-semibold text-neutral-300">
                        Calibration tools
                      </th>
                      <th className="px-5 py-3 text-center font-semibold text-emerald-400">
                        OpenRemap
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.capability}
                        className="border-b border-neutral-800/60"
                      >
                        <td className="px-5 py-3 font-medium text-neutral-300">
                          {row.capability}
                        </td>
                        {[
                          row.hexEditor,
                          row.calibrationTool,
                          row.openremap,
                        ].map((val, i) => (
                          <td key={i} className="px-5 py-3 text-center">
                            {val === "yes" && (
                              <span className="text-emerald-400 font-medium">
                                ✓
                              </span>
                            )}
                            {val === "no" && (
                              <span className="text-red-400/60">✗</span>
                            )}
                            {val === "partial" && (
                              <span className="text-yellow-400 text-xs font-medium">
                                Partial
                              </span>
                            )}
                            {val === "varies" && (
                              <span className="text-yellow-400 text-xs font-medium">
                                Varies
                              </span>
                            )}
                            {val === "planned" && (
                              <span className="text-blue-400 text-xs font-medium">
                                Planned
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-center text-sm text-neutral-500">
                OpenRemap is complementary — use it alongside WinOLS, ECM
                Titanium, or whatever calibration tool you prefer.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Recipes */}
      {activeTab === 1 && (
        <div>
          <section className="bg-neutral-950 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Why the recipe format changes everything
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                A{" "}
                <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm">
                  .remap
                </code>{" "}
                recipe is not a modified binary. It&apos;s a set of instructions
                that describes only the bytes <em>you</em> changed — nothing
                else.
              </p>

              <div className="mt-14 space-y-8">
                {/* The problem with .bin files */}
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-red-500/10 p-2.5 text-red-400">
                      <Scale className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-400">
                        The problem with selling modified .bin files
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        A modified .bin file contains the{" "}
                        <span className="text-neutral-200 font-medium">
                          entire original firmware
                        </span>{" "}
                        — every byte of it. That firmware belongs to Bosch,
                        Siemens, Delphi, or whoever manufactured the ECU. When
                        you send a customer a modified .bin, you are
                        distributing their copyrighted software along with your
                        calibration work. Whether you realise it or not, that
                        creates legal exposure — for you and for your customer.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The recipe solution */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-400">
                        A recipe contains only your work
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                        A <code className="text-emerald-400">.remap</code>{" "}
                        recipe is a diff — it records which bytes changed, what
                        they were before, and what you changed them to. It does{" "}
                        <span className="text-neutral-200 font-medium">
                          not
                        </span>{" "}
                        contain the firmware itself. Your calibration work is
                        cleanly separated from the manufacturer&apos;s
                        intellectual property. You own the recipe. You share the
                        recipe. The OEM firmware stays where it belongs — on the
                        customer&apos;s ECU.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefit cards */}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <span className="text-emerald-400">
                    <FileText className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">
                    Readable &amp; auditable
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    A recipe is plain text. You can open it, read every change,
                    and know exactly what a tune does before it goes anywhere
                    near a vehicle. No black boxes. No trust-me binaries from
                    forums.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <span className="text-emerald-400">
                    <Eye className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">
                    Full transparency for your customers
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    Hand your customer a recipe alongside the tune. They can see
                    every byte you touched. That level of transparency builds
                    trust — and sets you apart from tuners who hand over opaque
                    files and say &ldquo;just flash it.&rdquo;
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <span className="text-emerald-400">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">
                    Protect your business
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    If a manufacturer ever questions what you distributed, a
                    recipe is your answer: &ldquo;I distributed calibration
                    instructions, not your firmware.&rdquo; Your IP stays yours.
                    Their IP stays theirs. Clean separation, clear boundaries.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <span className="text-emerald-400">
                    <ClipboardList className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">
                    Build a recipe library
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    Cook a recipe once, apply it to every matching ECU that
                    walks through the door. Stage 1, stage 2, flex fuel — each
                    one is a small file you can archive, version, and reuse. No
                    more hunting through folders of 2MB .bin files to find the
                    right one.
                  </p>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-neutral-500">
                Read the full{" "}
                <a
                  href="/docs/recipe-format"
                  className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                >
                  recipe format specification
                </a>{" "}
                for the technical details.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Tab 3: The App */}
      {activeTab === 2 && (
        <div>
          {/* Sub-section A: 100% offline */}
          <section className="bg-neutral-950 py-24">
            <div className="mx-auto max-w-4xl px-6">
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-neutral-900/80 to-neutral-950 p-10 sm:p-14">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <WifiOff className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                    100% offline. Your files never leave your machine.
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
                    OpenRemap runs entirely on your desktop — a full interactive
                    terminal interface with panels for every operation. No
                    cloud. No uploads. No accounts. No telemetry. Your binaries,
                    your recipes, your data — they stay right where they are.
                  </p>
                  <div className="mt-10 grid w-full max-w-2xl gap-5 sm:grid-cols-3">
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                      <HardDrive className="h-6 w-6 text-emerald-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Runs locally
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Everything runs on your hardware. No server, no
                          internet connection required.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                      <Lock className="h-6 w-6 text-emerald-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Zero data collection
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          No analytics, no usage tracking, no phone-home. The
                          code is open — verify it yourself.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                      <MonitorSmartphone className="h-6 w-6 text-emerald-400" />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Interactive TUI
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Just type{" "}
                          <code className="text-emerald-400">openremap</code> —
                          a full graphical interface in your terminal. No
                          commands to memorise.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sub-section B: See it in action */}
          <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                See it in action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                No command line experience needed. Just type{" "}
                <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm">
                  openremap
                </code>{" "}
                and the full graphical interface launches in your terminal.
              </p>
              <div className="mt-12">
                <TuiGallery />
              </div>
            </div>
          </section>

          {/* Sub-section C: Standalone .exe roadmap note */}
          <section className="border-t border-neutral-800/60 bg-neutral-950 py-16">
            <div className="mx-auto max-w-2xl px-6">
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">
                      Standalone desktop version coming soon
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                      After reaching{" "}
                      <span className="font-medium text-emerald-400">
                        v1.0.0
                      </span>
                      , OpenRemap will ship as a standalone{" "}
                      <code className="text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded text-xs">
                        .exe
                      </code>{" "}
                      for Windows (and native bundles for macOS / Linux) — no
                      Python install required. Download, double-click, and
                      you&apos;re tuning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 4: Coverage */}
      {activeTab === 3 && (
        <div>
          {/* Sub-section A: Broad ECU Coverage */}
          <section className="bg-neutral-950 py-24">
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

          {/* Sub-section B: Built-in Confidence Scoring */}
          <section className="border-t border-neutral-800/60 bg-neutral-900/30 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Built-in Confidence Scoring
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-neutral-400">
                Every identification returns a confidence level so you always
                know how much to trust the result.
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
        </div>
      )}

      {/* Tab 5: Roadmap */}
      {activeTab === 4 && (
        <div>
          <section className="bg-neutral-950 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Where we&apos;re heading
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                OpenRemap is actively developed. Here&apos;s what&apos;s done,
                what&apos;s next, and what we&apos;re thinking about.
              </p>

              {/* Status legend */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {Object.entries(statusConfig).map(([key, cfg]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-xs text-neutral-400"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="relative mt-14 space-y-0 pl-10">
                {/* Vertical line */}
                <div className="absolute bottom-4 left-[13px] top-4 w-px bg-neutral-800" />

                {roadmapItems.map((item, i) => {
                  const cfg = statusConfig[item.status];
                  return (
                    <div key={i} className="relative pb-10 last:pb-0">
                      {/* Dot on the timeline */}
                      <div
                        className={`absolute -left-10 top-1 flex h-7 w-7 items-center justify-center rounded-full border ${cfg.bg}`}
                      >
                        <span className={cfg.color}>{cfg.icon}</span>
                      </div>

                      {/* Phase badge */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-neutral-700 bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                          {item.phase}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom note */}
              <div className="mt-16 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
                <p className="text-sm text-neutral-400">
                  Got a feature you need?{" "}
                  <a
                    href="https://github.com/Openremap/openremap-core/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                  >
                    Open an issue on GitHub
                  </a>{" "}
                  — this roadmap is shaped by what tuners actually ask for.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 6: FAQ */}
      {activeTab === 5 && (
        <div>
          <section className="bg-neutral-950 py-24">
            <div className="mx-auto max-w-3xl px-6">
              <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-400">
                The questions tuners ask before they install.
              </p>

              <div className="mt-14 space-y-3">
                {faqItems.map((item, i) => (
                  <FaqAccordionItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>

              <div className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
                <p className="text-sm text-neutral-400">
                  Still have questions?{" "}
                  <a
                    href="https://github.com/Openremap/openremap-core/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                  >
                    Start a discussion on GitHub
                  </a>{" "}
                  — we&apos;re happy to help.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
