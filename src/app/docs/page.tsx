import Link from "next/link";
import type { ReactNode } from "react";
import { DOC_CATEGORIES, getDocsManifest, type DocEntry } from "@/lib/docs";
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

function getDocsByCategory(entries: DocEntry[]): Record<string, DocEntry[]> {
  const grouped: Record<string, DocEntry[]> = {};
  for (const entry of entries) {
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
    "OpenRemap documentation — installation guides, CLI command reference, confidence scoring, recipe format, and manufacturer-specific documentation for Bosch, Siemens, Delphi, Marelli, Denso, and Hitachi ECUs.",
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

/* ─── Commands card: two-tier (command + indented "advanced") ───────── */

function CommandsCard({ entries }: { entries: DocEntry[] }) {
  const commands = entries.filter((e) => e.slug.length === 2);
  const advanced = entries.filter((e) => e.slug.length === 3);

  const advancedByParent = new Map<string, DocEntry[]>();
  for (const entry of advanced) {
    const parent = entry.slug.slice(0, 2).join("/");
    const list = advancedByParent.get(parent) ?? [];
    list.push(entry);
    advancedByParent.set(parent, list);
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-700 md:col-span-2 lg:col-span-3">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="text-emerald-400">
          {getCategoryIcon("Commands")}
        </span>
        <h2 className="text-lg font-semibold text-white">Commands</h2>
      </div>
      <p className="mb-5 text-sm text-neutral-500">
        {getCategoryDescription("Commands")}
      </p>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
        {commands.map((entry) => {
          const href = `/docs/${entry.slug.join("/")}`;
          const children = advancedByParent.get(entry.slug.join("/")) ?? [];
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
              {children.length > 0 && (
                <ul className="ml-5 space-y-0.5 border-l border-neutral-800 pl-3">
                  {children.map((child) => (
                    <li key={child.slug.join("/")}>
                      <Link
                        href={`/docs/${child.slug.join("/")}`}
                        className="block rounded-md px-2.5 py-1 text-xs text-neutral-500 transition-colors hover:bg-neutral-800/40 hover:text-emerald-400"
                      >
                        advanced
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Manufacturers card: OEM groups, families collapsed by default ── */

function ManufacturersCard({ entries }: { entries: DocEntry[] }) {
  const oems = entries.filter((e) => e.slug.length === 2);
  const families = entries.filter(
    (e) => e.slug.length === 3 && e.slug[e.slug.length - 1] !== "internals",
  );

  const familiesByOem = new Map<string, DocEntry[]>();
  for (const entry of families) {
    const oem = entry.slug[1];
    const list = familiesByOem.get(oem) ?? [];
    list.push(entry);
    familiesByOem.set(oem, list);
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-700 md:col-span-2 lg:col-span-3">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="text-emerald-400">
          {getCategoryIcon("Manufacturers")}
        </span>
        <h2 className="text-lg font-semibold text-white">Manufacturers</h2>
      </div>
      <p className="mb-5 text-sm text-neutral-500">
        {getCategoryDescription("Manufacturers")}
      </p>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {oems.map((oem) => {
          const oemSlug = oem.slug[1];
          const oemFamilies = familiesByOem.get(oemSlug) ?? [];
          const href = `/docs/${oem.slug.join("/")}`;
          return (
            <details
              key={oemSlug}
              className="group rounded-lg border border-neutral-800 bg-neutral-950/40 open:bg-neutral-900/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2">
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors group-hover:text-emerald-400">
                  <span className="text-xs text-neutral-600">›</span>
                  <Link href={href} className="hover:text-emerald-400">
                    {oem.title}
                  </Link>
                </span>
                <span className="flex items-center gap-2 text-xs text-neutral-500">
                  {oemFamilies.length}{" "}
                  {oemFamilies.length === 1 ? "family" : "families"}
                </span>
              </summary>
              <ul className="mb-2 space-y-0.5 border-t border-neutral-800 pl-6 pt-2">
                {oemFamilies.map((family) => (
                  <li key={family.slug.join("/")}>
                    <Link
                      href={`/docs/${family.slug.join("/")}`}
                      className="block rounded-md px-2.5 py-1 text-sm text-neutral-500 transition-colors hover:bg-neutral-800/40 hover:text-emerald-400"
                    >
                      {family.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Contributing & Legal card: changelog versions collapsed ──────── */

function ChangelogCard({ entries }: { entries: DocEntry[] }) {
  const top = entries.filter((e) => e.slug.length === 1);
  const versions = entries.filter(
    (e) => e.slug.length === 2 && e.slug[0] === "changelog",
  );

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-700">
      <div className="mb-1 flex items-center gap-2.5">
        <span className="text-emerald-400">
          {getCategoryIcon("Contributing & Legal")}
        </span>
        <h2 className="text-lg font-semibold text-white">
          Contributing & Legal
        </h2>
      </div>
      <p className="mb-5 text-sm text-neutral-500">
        {getCategoryDescription("Contributing & Legal")}
      </p>

      <ul className="space-y-1.5">
        {top.map((entry) => {
          const href = `/docs/${entry.slug.join("/")}`;
          if (entry.slug[0] === "changelog") {
            return (
              <details
                key={href}
                className="group rounded-lg border border-neutral-800 bg-neutral-950/40 open:bg-neutral-900/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-2.5 py-1.5">
                  <span className="flex items-center gap-2 text-sm text-neutral-400 transition-colors group-hover:text-emerald-400">
                    <span className="text-xs text-neutral-600">›</span>
                    <Link href={href}>{entry.title}</Link>
                  </span>
                  <span className="text-xs text-neutral-500">
                    {versions.length} releases
                  </span>
                </summary>
                <ul className="mb-1.5 space-y-0.5 border-t border-neutral-800 pl-6 pt-1.5">
                  {versions.map((version) => (
                    <li key={version.slug.join("/")}>
                      <Link
                        href={`/docs/${version.slug.join("/")}`}
                        className="block rounded-md px-2.5 py-1 text-sm text-neutral-500 transition-colors hover:bg-neutral-800/40 hover:text-emerald-400"
                      >
                        {version.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          }
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
}

export default async function DocsIndexPage() {
  const entries = await getDocsManifest();
  const grouped = getDocsByCategory(entries);

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
          href="/docs/getting-started/about"
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
          href="/docs/commands"
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

          if (category === "Commands") {
            return <CommandsCard key={category} entries={entries} />;
          }

          if (category === "Manufacturers") {
            return <ManufacturersCard key={category} entries={entries} />;
          }

          if (category === "Contributing & Legal") {
            return <ChangelogCard key={category} entries={entries} />;
          }

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
            href="https://github.com/v-arapidis/openremap-core/issues"
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
