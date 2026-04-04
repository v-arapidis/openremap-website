import Link from "next/link";
import type { ReactNode } from "react";
import { DOC_CATEGORIES, DOC_MANIFEST, type DocEntry } from "@/lib/docs";
import {
  Rocket,
  BookOpen,
  Package,
  TerminalSquare,
  Target,
  Factory,
  ScrollText,
  FileText,
  BookMarked,
  Monitor,
  Terminal,
} from "lucide-react";

function getCategoryIcon(category: string): ReactNode {
  switch (category) {
    case "Getting Started":
      return <Rocket className="h-5 w-5" />;
    case "Guides":
      return <BookOpen className="h-5 w-5" />;
    case "Installation":
      return <Package className="h-5 w-5" />;
    case "Commands":
      return <TerminalSquare className="h-5 w-5" />;
    case "Concepts":
      return <Target className="h-5 w-5" />;
    case "Manufacturers":
      return <Factory className="h-5 w-5" />;
    case "Contributing & Legal":
      return <ScrollText className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
}

function getCategoryDescription(category: string): string {
  switch (category) {
    case "Getting Started":
      return "Learn about OpenRemap, initial setup, and CLI basics.";
    case "Guides":
      return "Walkthroughs, workflows, and the interactive TUI.";
    case "Installation":
      return "Platform-specific installation guides.";
    case "Commands":
      return "Detailed reference for every CLI command.";
    case "Concepts":
      return "Understand confidence scoring, recipes, and system architecture.";
    case "Manufacturers":
      return "ECU manufacturer-specific documentation and internals.";
    case "Contributing & Legal":
      return "How to contribute, legal disclaimers, and changelog.";
    default:
      return "";
  }
}

function getDocsByCategory(): Record<string, DocEntry[]> {
  const grouped: Record<string, DocEntry[]> = {};
  for (const entry of DOC_MANIFEST) {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push(entry);
  }
  return grouped;
}

export const metadata = {
  title: "Documentation",
  description:
    "OpenRemap documentation — installation guides, CLI command reference, confidence scoring, recipe format, and manufacturer-specific documentation for Bosch, Siemens, Delphi, and Marelli ECUs.",
  openGraph: {
    title: "Documentation | OpenRemap",
    description:
      "Guides, command reference, and manufacturer-specific documentation for the open-source ECU binary toolkit.",
    url: "https://openremap.com/docs",
  },
  alternates: {
    canonical: "https://openremap.com/docs",
  },
};

export default function DocsIndexPage() {
  const grouped = getDocsByCategory();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      {/* Page header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Documentation
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
          Everything you need to identify, diff, and patch ECU binaries with
          OpenRemap.
        </p>
      </div>

      {/* Quick links bar */}
      <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs/about"
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/20 transition-all hover:bg-emerald-600/20 hover:ring-emerald-500/40"
        >
          <BookMarked className="h-4 w-4" />
          Start Here
        </Link>
        <Link
          href="/docs/install/windows"
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800/60 px-4 py-2 text-sm font-medium text-neutral-300 ring-1 ring-neutral-700 transition-all hover:bg-neutral-800 hover:text-white"
        >
          <Monitor className="h-4 w-4" />
          Windows
        </Link>
        <Link
          href="/docs/install/macos-linux"
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800/60 px-4 py-2 text-sm font-medium text-neutral-300 ring-1 ring-neutral-700 transition-all hover:bg-neutral-800 hover:text-white"
        >
          <Terminal className="h-4 w-4" />
          macOS / Linux
        </Link>
        <Link
          href="/docs/commands/overview"
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-800/60 px-4 py-2 text-sm font-medium text-neutral-300 ring-1 ring-neutral-700 transition-all hover:bg-neutral-800 hover:text-white"
        >
          <TerminalSquare className="h-4 w-4" />
          Commands
        </Link>
      </div>

      {/* Category grid */}
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {DOC_CATEGORIES.map((category) => {
          const entries = grouped[category];
          if (!entries || entries.length === 0) return null;

          return (
            <div
              key={category}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-700"
            >
              <div className="mb-1 flex items-center gap-2.5">
                <span className="text-emerald-400">
                  {getCategoryIcon(category)}
                </span>
                <h2 className="text-lg font-semibold text-white">{category}</h2>
              </div>
              <p className="mb-5 text-sm text-neutral-500">
                {getCategoryDescription(category)}
              </p>

              <ul className="space-y-1.5">
                {entries.map((entry) => {
                  const href = `/docs/${entry.slug.join("/")}`;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-800/60 hover:text-emerald-400"
                      >
                        <span className="text-xs text-neutral-600 transition-colors group-hover:text-emerald-500">
                          ›
                        </span>
                        {entry.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <p className="text-sm text-neutral-500">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a
            href="https://github.com/Pinelo92/openremap/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Open an issue on GitHub
          </a>{" "}
          and we&apos;ll help you out.
        </p>
      </div>
    </div>
  );
}
