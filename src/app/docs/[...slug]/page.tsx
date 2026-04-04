import { fetchDoc, getAllDocSlugs, DOC_MANIFEST } from "@/lib/docs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TableOfContents from "@/components/TableOfContents";

interface DocsPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugKey = slug.join("/");
  const entry = DOC_MANIFEST.find((e) => e.slug.join("/") === slugKey);

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
  return html.replace(
    /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
    (match, level, attrs, content) => {
      const text = content.replace(/<[^>]*>/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (attrs.includes('id="')) return match;
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    },
  );
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = await fetchDoc(slug);

  if (!doc) {
    notFound();
  }

  const processedHtml = injectHeadingIds(doc.contentHtml);

  // Calculate prev/next from DOC_MANIFEST
  const currentIndex = DOC_MANIFEST.findIndex(
    (e) => e.slug.join("/") === slug.join("/"),
  );
  const prevDoc = currentIndex > 0 ? DOC_MANIFEST[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < DOC_MANIFEST.length - 1
      ? DOC_MANIFEST[currentIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Docs",
                item: "https://openremap.com/docs",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: doc.category,
                item: "https://openremap.com/docs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: doc.title,
                item: `https://openremap.com/docs/${slug.join("/")}`,
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <a href="/docs" className="transition-colors hover:text-emerald-400">
          Docs
        </a>
        {doc.category && (
          <>
            <span className="select-none">/</span>
            <span className="text-neutral-400">{doc.category}</span>
          </>
        )}
        <span className="select-none">/</span>
        <span className="text-neutral-300">{doc.title}</span>
      </nav>

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
                href={`https://github.com/Pinelo92/openremap/edit/main/${
                  DOC_MANIFEST.find((e) => e.slug.join("/") === slug.join("/"))
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
