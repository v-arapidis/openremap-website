import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/Header";
import { GitHubIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";
const PYPI_URL = "https://pypi.org/project/openremap/";

const links = [
  { label: "Harness", href: "/#harness" },
  { label: "Engine", href: "/#engine" },
  { label: "The .remap recipe", href: "/#recipe" },
  { label: "Roadmap", href: "/#roadmap" },
];

const externals = [
  { label: "GitHub", href: GITHUB_URL, github: true },
  { label: "Docs", href: DOCS_URL, github: false },
  { label: "PyPI", href: PYPI_URL, github: false },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-panel/50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="inline-block" aria-label="OpenRemap — home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">
              <span className="text-signal">Engine v0.7.x — live now</span> · pip
              install openremap
              <br />
              <span className="text-pink">Harness v1.0.0 — pending</span> · desktop
              app · Windows / macOS / Linux
            </p>
          </div>

          <div className="flex flex-col items-start gap-2.5 md:items-end">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            {externals.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {l.github ? (
                  <GitHubIcon className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                )}
                {l.label}
                {!l.github && <ExternalLink className="h-3 w-3 opacity-50" />}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-edge pt-5 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © 2025–2026 OpenRemap Contributors · MIT
          </p>
          <p className="text-xs text-ink-faint">
            <a
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline underline-offset-2 transition-colors hover:text-ink"
            >
              MIT License
            </a>{" "}
            · no telemetry · offline by design ·{" "}
            <a
              href={PYPI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline underline-offset-2 transition-colors hover:text-ink"
            >
              PyPI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
