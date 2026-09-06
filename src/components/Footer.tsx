import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/Header";
import { GitHubIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";
const PYPI_URL = "https://pypi.org/project/openremap/";

const links = [
  { label: "Engine — openremap-core", href: "/#engine" },
  { label: "Supported firmware", href: "/#coverage" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "GitHub — watch the repo", href: GITHUB_URL, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-panel/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="inline-block" aria-label="OpenRemap — home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-md font-mono text-[12.5px] uppercase leading-relaxed tracking-[0.08em] text-ink-faint">
              <span className="text-signal">engine v0.7.x — live now</span>{" "}
              · pip install openremap
              <br />
              <span className="text-amber">harness v1.0.0 — pending</span> ·
              desktop app · win / mac / linux
            </p>
          </div>

          <div className="flex flex-col items-start gap-2.5 md:items-end">
            {links.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-signal"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  {l.label}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-signal"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-edge pt-5 sm:flex-row">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
            © 2025–2026 OpenRemap Contributors · MIT
          </p>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-ink-faint">
            <a
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline underline-offset-2 transition-colors hover:text-signal"
            >
              MIT License
            </a>{" "}
            · no telemetry · offline by design ·{" "}
            <a
              href={PYPI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted underline underline-offset-2 transition-colors hover:text-signal"
            >
              PyPI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
