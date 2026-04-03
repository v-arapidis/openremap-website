export default function DocsSlugLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:px-12">
      {/* Breadcrumb skeleton */}
      <nav className="mb-6 flex items-center gap-2">
        <div className="h-4 w-10 animate-pulse rounded bg-neutral-800" />
        <span className="text-sm text-neutral-700 select-none">/</span>
        <div className="h-4 w-20 animate-pulse rounded bg-neutral-800" />
        <span className="text-sm text-neutral-700 select-none">/</span>
        <div className="h-4 w-28 animate-pulse rounded bg-neutral-800" />
      </nav>

      {/* Title skeleton */}
      <div className="mb-8">
        <div className="h-9 w-3/5 animate-pulse rounded-md bg-neutral-800" />
      </div>

      {/* Content skeleton — simulates paragraphs of varying length */}
      <div className="space-y-6">
        {/* Paragraph 1 */}
        <div className="space-y-2.5">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-neutral-800/70" />
        </div>

        {/* Subheading */}
        <div className="h-7 w-2/5 animate-pulse rounded-md bg-neutral-800 pt-2" />

        {/* Paragraph 2 */}
        <div className="space-y-2.5">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-7/12 animate-pulse rounded bg-neutral-800/70" />
        </div>

        {/* Code block skeleton */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-5">
          <div className="space-y-2">
            <div className="h-3.5 w-7/12 animate-pulse rounded bg-neutral-800/60" />
            <div className="h-3.5 w-9/12 animate-pulse rounded bg-neutral-800/60" />
            <div className="h-3.5 w-5/12 animate-pulse rounded bg-neutral-800/60" />
          </div>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2.5">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-neutral-800/70" />
        </div>

        {/* Another subheading */}
        <div className="h-7 w-1/3 animate-pulse rounded-md bg-neutral-800 pt-2" />

        {/* Paragraph 4 */}
        <div className="space-y-2.5">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-8/12 animate-pulse rounded bg-neutral-800/70" />
          <div className="h-4 w-5/12 animate-pulse rounded bg-neutral-800/70" />
        </div>
      </div>

      {/* Bottom nav skeleton */}
      <div className="mt-16 border-t border-neutral-800 pt-8">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
