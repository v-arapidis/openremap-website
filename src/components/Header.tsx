"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const GITHUB_URL = "https://github.com/v-arapidis/openremap-core";
const DOCS_URL = "https://docs.openremap.com";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Harness", href: "/#harness" },
  { label: "Showcase", href: "/#showcase" },
  { label: "Install", href: "/#install" },
];

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="h-8 w-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
          aria-hidden="true"
        >
          <path d="M16 2L28.124 9V23L16 30L3.876 23V9L16 2Z" fill="#10b981" />
          <path d="M16 6L24.66 11V21L16 26L7.34 21V11L16 6Z" fill="#05060a" />
          <path
            d="M16 10L21.196 13V19L16 22L10.804 19V13L16 10Z"
            fill="#34d399"
          />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Open<span className="text-brand-bright">Remap</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-edge bg-bg/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="transition-opacity hover:opacity-85"
          aria-label="OpenRemap — home"
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Docs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <Link
            href="/#install"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-bg transition-all hover:bg-brand-bright hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-muted transition-colors hover:text-ink lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-edge bg-bg/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          mobileMenuOpen
            ? "max-h-[420px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            Docs <ExternalLink className="h-3.5 w-3.5 opacity-60" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <Link
            href="/#install"
            onClick={closeMobileMenu}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-brand-bright"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
