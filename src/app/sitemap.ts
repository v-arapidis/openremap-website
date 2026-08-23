import type { MetadataRoute } from "next";
import { getDocsManifest } from "@/lib/docs";

const BASE_URL = "https://openremap.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Doc pages from manifest (includes discovered changelog versions)
  const entries = await getDocsManifest();
  const docPages: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${BASE_URL}/docs/${entry.slug.join("/")}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...docPages];
}
