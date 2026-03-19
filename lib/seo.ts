import type { Metadata } from "next";

import type { BlogArticle } from "@/types/content";
import { siteConfig } from "@/lib/site";

type BuildMetadataInput = {
  description: string;
  noindex?: boolean;
  path: string;
  publishedTime?: string;
  title: string;
  type?: "article" | "website";
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://claritycalculatorhub.com").replace(
    /\/$/,
    "",
  );
}

export function buildAbsoluteUrl(path: string) {
  if (!path) {
    return getSiteUrl();
  }

  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  description,
  noindex = false,
  path,
  publishedTime,
  title,
  type = "website",
}: BuildMetadataInput): Metadata {
  const absoluteUrl = buildAbsoluteUrl(path);

  return {
    alternates: {
      canonical: absoluteUrl,
    },
    description,
    openGraph: {
      description,
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      type,
      url: absoluteUrl,
      ...(type === "article" && publishedTime
        ? {
            publishedTime: new Date(publishedTime).toISOString(),
          }
        : {}),
    },
    robots: noindex
      ? {
          follow: false,
          googleBot: {
            follow: false,
            index: false,
            "max-image-preview": "none",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
          index: false,
        }
      : {
          follow: true,
          index: true,
        },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      title,
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: buildAbsoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  };
}

export function buildArticleJsonLd(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: article.category,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    dateModified: new Date(article.publishedAt).toISOString(),
    datePublished: new Date(article.publishedAt).toISOString(),
    description: article.description,
    headline: article.title,
    isAccessibleForFree: true,
    mainEntityOfPage: buildAbsoluteUrl(`/blog/${article.slug}`),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    name: siteConfig.name,
    url: getSiteUrl(),
  };
}
