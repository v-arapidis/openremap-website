import type { NextConfig } from "next";

const DOCS_SITE = "https://docs.openremap.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Docs moved to their own site (openremap-docs repo) — send old
      // /docs/* bookmarks and links to the new home, keeping the slug.
      {
        source: "/docs/:path*",
        destination: `${DOCS_SITE}/:path*`,
        permanent: true,
      },
      {
        source: "/docs",
        destination: DOCS_SITE,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
