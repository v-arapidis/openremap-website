import DocsSidebar from "@/components/DocsSidebar";

export default function DocsSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar — hidden on mobile, shown on larger screens */}
      <div className="hidden lg:block">
        <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <DocsSidebar />
        </div>
      </div>

      {/* Main content — rendered by page.tsx or loading.tsx */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
