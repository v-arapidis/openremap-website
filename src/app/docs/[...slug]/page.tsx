import { fetchDoc, getAllDocSlugs, DOC_MANIFEST } from "@/lib/docs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  return {
    title: entry?.title ?? "Documentation",
    description: `OpenRemap documentation — ${entry?.title ?? ""}`,
  };
}

export default async function DocsSlugPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const doc = await fetchDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
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

      {/* Document content */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
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
  );
}
