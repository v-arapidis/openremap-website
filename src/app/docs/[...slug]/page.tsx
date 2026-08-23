import { fetchDoc, getDocsManifest } from "@/lib/docs";
import type { DocEntry } from "@/lib/docs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";

interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const entries = await getDocsManifest();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entries = await getDocsManifest();
  const slugKey = slug.join("/");
  const entry = entries.find((e) => e.slug.join("/") === slugKey);

  const title = entry?.title ?? "Documentation";
  const description = entry
    ? `${entry.title} — OpenRemap documentation for the open-source ECU binary toolkit.`
    : "OpenRemap documentation — guides, commands, and manufacturer reference.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://openremap.com/docs/${slugKey}`,
    },
    openGraph: {
      title: `${title} | OpenRemap Docs`,
      description,
      url: `https://openremap.com/docs/${slugKey}`,
      type: "article",
    },
  };
}

function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
    (match, level, attrs, content) => {
      const text = content.replace(/<[^>]*>/g, "").trim();
      let id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (!id) id = "section";
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count + 1}`;
      if (attrs.includes('id="')) return match;
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    },
  );
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const entries = await getDocsManifest();
  const doc = await fetchDoc(slug, entries);

  if (!doc) {
    notFound();
  }

  const processedHtml = injectHeadingIds(doc.contentHtml);

  // Category-scoped prev/next (next page within the same category)
  const categoryEntries = entries.filter(
    (e) => e.category === doc.category,
  );
  const currentIndex = categoryEntries.findIndex(
    (e) => e.slug.join("/") === slug.join("/"),
  );
  const prevDoc = currentIndex > 0 ? categoryEntries[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < categoryEntries.length - 1
      ? categoryEntries[currentIndex + 1]
      : null;

  // Breadcrumb trail: Docs / Category / [parent] / current
  const trail: { name: string; href?: string }[] = [{ name: "Docs", href: "/docs" }];
  const categoryIndex = entries.find(
    (e) => e.slug.length === 1 && e.category === doc.category,
  );
  trail.push(
    categoryIndex
      ? { name: doc.category, href: `/docs/${categoryIndex.slug.join("/")}` }
      : { name: doc.category },
  );
  if (slug.length >= 3) {
    const parentSlug = slug.slice(0, -1);
    const parent = entries.find(
      (e) => e.slug.join("/") === parentSlug.join("/"),
    );
    if (parent) {
      trail.push({ name: parent.title, href: `/docs/${parentSlug.join("/")}` });
    }
  }
  trail.push({ name: doc.title });

  // Two-tier affordance: index page → "Advanced reference" chip,
  // advanced page → back to its overview
  const advancedEntry = entries.find(
    (e) => e.slug.join("/") === [...slug, "advanced"].join("/"),
  );
  const isAdvancedPage =
    slug.length > 0 && slug[slug.length - 1] === "advanced";
  const overviewEntry = isAdvancedPage
    ? entries.find(
        (e) => e.slug.join("/") === slug.slice(0, -1).join("/"),
      )
    : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: item.href
                ? `https://openremap.com${item.href}`
                : `https://openremap.com/docs/${slug.join("/")}`,
            })),
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="select-none">/</span>}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-emerald-400"
                >
                  {item.name}
                </a>
              ) : (
                <span
                  className={isLast ? "text-neutral-300" : "text-neutral-400"}
                >
                  {item.name}
                </span>
              )}
            </span>
          );
        })}
      </nav>

      {/* Two-tier chip */}
      {advancedEntry && (
        <a
          href={`/docs/${advancedEntry.slug.join("/")}`}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
        >
          Advanced reference →
        </a>
      )}
      {overviewEntry && (
        <a
          href={`/docs/${overviewEntry.slug.join("/")}`}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/60 px-3 py-1 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
        >
          ← Overview
        </a>
      )}

      <div className="flex gap-10">
        {/* Main content column */}
        <div className="min-w-0 flex-1">
          {/* Document content */}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />

          {/* Bottom navigation */}
          <div className="mt-16 border-t border-neutral-800 pt-8">
            <div className="flex items-center justify-between">
              <a
                href="/docs"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-emerald-400"
              >
                ← Back to docs
              </a>

              <a
                href={`https://github.com/v-arapidis/openremap-core/edit/main/${
                  entries.find((e) => e.slug.join("/") === slug.join("/"))
                    ?.githubPath ?? ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-300"
              >
                ✎ Edit on GitHub ↗
              </a>
            </div>
          </div>

          {/* Previous / Next navigation */}
          {(prevDoc || nextDoc) && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              {prevDoc ? (
                <a
                  href={`/docs/${prevDoc.slug.join("/")}`}
                  className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700"
                >
                  <span className="text-xs text-neutral-500">Previous</span>
                  <span className="mt-1 block text-sm font-medium text-neutral-300 transition-colors group-hover:text-emerald-400">
                    ← {prevDoc.title}
                  </span>
                </a>
              ) : (
                <div />
              )}
              {nextDoc ? (
                <a
                  href={`/docs/${nextDoc.slug.join("/")}`}
                  className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-right transition-colors hover:border-neutral-700"
                >
                  <span className="text-xs text-neutral-500">Next</span>
                  <span className="mt-1 block text-sm font-medium text-neutral-300 transition-colors group-hover:text-emerald-400">
                    {nextDoc.title} →
                  </span>
                </a>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Mobile sidebar toggle hint */}
          <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 text-center lg:hidden">
            <a
              href="/docs"
              className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              ← Browse all documentation
            </a>
          </div>
        </div>

        {/* TOC - right side */}
        <TableOfContents contentHtml={processedHtml} />
      </div>
    </div>
  );
}
