"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-neutral-950/90" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-white transition-colors hover:opacity-90"
        >
          <span className="text-emerald-500">⬡</span> OpenRemap
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Docs
          </Link>
          <a
            href="https://github.com/Pinelo92/openremap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            GitHub <span className="text-xs opacity-60">↗</span>
          </a>
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-xl text-neutral-400 transition-colors hover:text-white md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-neutral-800 bg-neutral-950 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <Link
          href="/#features"
          onClick={closeMobileMenu}
          className="block px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          Features
        </Link>
        <Link
          href="/docs"
          onClick={closeMobileMenu}
          className="block px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          Docs
        </Link>
        <a
          href="https://github.com/Pinelo92/openremap"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileMenu}
          className="block px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          GitHub <span className="text-xs opacity-60">↗</span>
        </a>
      </div>
    </header>
  );
}
