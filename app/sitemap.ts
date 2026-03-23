import type { MetadataRoute } from "next";

import { CATEGORY_MANIFEST, TOOL_MANIFEST } from "@/content/manifest";
import { getAllArticles } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: `${siteUrl}/`,
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.8,
      url: `${siteUrl}/blog`,
    },
    ...CATEGORY_MANIFEST.map((category) => ({
      changeFrequency: "weekly" as const,
      lastModified: now,
      priority: 0.8,
      url: `${siteUrl}/category/${category.slug}`,
    })),
    ...TOOL_MANIFEST.map((tool) => ({
      changeFrequency: "weekly" as const,
      lastModified: now,
      priority: 0.9,
      url: `${siteUrl}/calculator/${tool.slug}`,
    })),
    ...getAllArticles().map((article) => ({
      changeFrequency: "monthly" as const,
      lastModified: new Date(article.publishedAt),
      priority: 0.7,
      url: `${siteUrl}/blog/${article.slug}`,
    })),
  ];
}
