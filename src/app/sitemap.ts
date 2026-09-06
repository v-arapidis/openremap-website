import type { MetadataRoute } from "next";

const BASE_URL = "https://openremap.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
