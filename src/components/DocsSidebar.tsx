"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_CATEGORIES, DOC_MANIFEST, type DocEntry } from "@/lib/docs";

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

function slugToHref(slug: string[]): string {
  return `/docs/${slug.join("/")}`;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-block shrink-0 text-xs text-neutral-500 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
    >
      ›
    </span>
  );
}

interface CategorySectionProps {
  category: string;
  entries: DocEntry[];
  pathname: string;
  defaultOpen: boolean;
}

function CategorySection({
  category,
  entries,
  pathname,
  defaultOpen,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-neutral-300 transition-colors hover:bg-neutral-800/60 hover:text-neutral-100"
        aria-expanded={isOpen}
      >
        <ChevronIcon open={isOpen} />
        <span>{category}</span>
      </button>

      {isOpen && (
        <ul className="mt-0.5 space-y-0.5 pb-2 pl-4">
          {entries.map((entry) => {
            const href = slugToHref(entry.slug);
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 font-medium text-emerald-400"
                      : "text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200"
                  }`}
                >
                  {entry.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function DocsSidebar() {
  const pathname = usePathname();
  const grouped = getDocsByCategory();

  // Determine which category contains the current page so we can auto-expand it
  const activeCategory = DOC_MANIFEST.find(
    (entry) => pathname === slugToHref(entry.slug),
  )?.category;

  return (
    <nav
      className="w-64 shrink-0 overflow-y-auto border-r border-neutral-800 bg-neutral-950/50 py-6 pr-2 pl-2"
      aria-label="Documentation sidebar"
    >
      <div className="mb-4 px-3">
        <Link
          href="/docs"
          className="text-sm font-semibold text-neutral-200 transition-colors hover:text-emerald-400"
        >
          ← All Docs
        </Link>
      </div>

      {DOC_CATEGORIES.map((category) => {
        const entries = grouped[category];
        if (!entries || entries.length === 0) return null;

        return (
          <CategorySection
            key={category}
            category={category}
            entries={entries}
            pathname={pathname}
            defaultOpen={
              category === activeCategory || category === "Getting Started"
            }
          />
        );
      })}
    </nav>
  );
}
