import type { MetadataRoute } from "next";

import { CATEGORY_MANIFEST, TOOL_MANIFEST } from "@/content/manifest";
import { getAllArticles } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

/**
 * The date the tool/category content was last meaningfully updated.
 * Update this when you add or substantially edit a calculator or category page.
 */
const CONTENT_UPDATED_AT = new Date("2026-03-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    {
      changeFrequency: "weekly",
      lastModified: CONTENT_UPDATED_AT,
      priority: 1,
      url: `${siteUrl}/`,
    },
    {
      changeFrequency: "weekly",
      lastModified: CONTENT_UPDATED_AT,
      priority: 0.8,
      url: `${siteUrl}/blog`,
    },
    ...CATEGORY_MANIFEST.map((category) => ({
      changeFrequency: "weekly" as const,
      lastModified: CONTENT_UPDATED_AT,
      priority: 0.8,
      url: `${siteUrl}/category/${category.slug}`,
    })),
    ...TOOL_MANIFEST.map((tool) => ({
      changeFrequency: "weekly" as const,
      lastModified: CONTENT_UPDATED_AT,
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
