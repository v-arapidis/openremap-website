"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { DOC_CATEGORIES, type DocEntry } from "@/lib/docs";

interface DocsSidebarProps {
  entries: DocEntry[];
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
            const isChild =
              entry.slug.length >= 3 ||
              (entry.category === "Contributing & Legal" &&
                entry.slug.length >= 2);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isChild ? "ml-3 border-l border-neutral-800 pl-3 text-xs" : ""
                  } ${
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

export default function DocsSidebar({ entries }: DocsSidebarProps) {
  const pathname = usePathname();
  const grouped = getDocsByCategory(entries);
  const [searchQuery, setSearchQuery] = useState("");

  // Determine which category contains the current page so we can auto-expand it
  const activeCategory = entries.find(
    (entry) => pathname === slugToHref(entry.slug),
  )?.category;

  const query = searchQuery.toLowerCase().trim();

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

      <div className="mb-4 px-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-neutral-900/50 py-1.5 pl-8 pr-3 text-sm text-neutral-300 placeholder:text-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
        </div>
      </div>

      {DOC_CATEGORIES.map((category) => {
        const entries = grouped[category];
        if (!entries || entries.length === 0) return null;

        const filtered = query
          ? entries.filter(
              (e) =>
                e.title.toLowerCase().includes(query) ||
                category.toLowerCase().includes(query) ||
                e.slug.join("/").toLowerCase().includes(query),
            )
          : entries;
        if (filtered.length === 0) return null;

        return (
          <CategorySection
            key={query ? `${category}-search` : category}
            category={category}
            entries={filtered}
            pathname={pathname}
            defaultOpen={
              query
                ? true
                : category === activeCategory || category === "Getting Started"
            }
          />
        );
      })}
    </nav>
  );
}
