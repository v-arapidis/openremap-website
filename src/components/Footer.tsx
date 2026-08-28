import Link from "next/link";
import { ExternalLink, Sparkles } from "lucide-react";
import { Logo } from "@/components/Header";
import { GitHubIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";

const projectLinks = [
  { label: "GitHub repository", href: GITHUB_URL },
  {
    label: "Releases & changelog",
    href: `${GITHUB_URL}/releases`,
  },
  { label: "PyPI", href: "https://pypi.org/project/openremap/" },
  { label: "Discussions", href: `${GITHUB_URL}/discussions` },
];

const resourceLinks = [
  { label: "Documentation", href: DOCS_URL },
  { label: "Getting started", href: `${DOCS_URL}/getting-started` },
  { label: "Command reference", href: `${DOCS_URL}/commands` },
  { label: "Supported ECUs", href: `${DOCS_URL}/manufacturers` },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block" aria-label="OpenRemap — home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              The open-source ECU binary intelligence layer — identify,
              health-check, diff, and tune ECU binaries. Free, offline, and
              open source.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/5 px-3.5 py-1.5 text-xs font-medium text-brand-bright">
              <Sparkles className="h-3.5 w-3.5" />
              OpenRemap Harness — desktop app, coming in v1.0.0
            </div>
          </div>

          {/* Project */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Project
            </h3>
            <ul className="mt-4 space-y-2.5">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-brand-bright"
                  >
                    {link.label === "GitHub repository" && (
                      <GitHubIcon className="h-3.5 w-3.5" />
                    )}
                    {link.label}
                    {link.label !== "GitHub repository" && (
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-brand-bright"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-edge pt-6 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; 2025–2026 OpenRemap Contributors
          </p>
          <p className="text-xs text-ink-faint">
            Released under the{" "}
            <a
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline underline-offset-2 transition-colors hover:text-brand-bright"
            >
              MIT License
            </a>{" "}
            · No telemetry · No accounts · No data leaves your machine
          </p>
        </div>
      </div>
    </footer>
  );
}
