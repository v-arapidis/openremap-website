import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs";

const BASE_URL = "https://openremap.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Doc pages from manifest
  const docPages: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: `${BASE_URL}/docs/${slug.join("/")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...docPages];
}
