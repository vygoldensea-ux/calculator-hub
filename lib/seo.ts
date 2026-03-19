import type { Metadata } from "next";

import type { CalculatorFaq } from "@/types/calculator";
import type { BlogArticle } from "@/types/content";
import type { CategoryManifestItem, ToolManifestItem } from "@/types/site";
import { siteConfig } from "@/lib/site";

// ─── types ────────────────────────────────────────────────────────────────────

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

// ─── constants ────────────────────────────────────────────────────────────────

/** Default social-share image. Place a 1200×630 PNG at /public/og-image.png */
const OG_IMAGE_PATH = "/og-image.png";

// ─── helpers ──────────────────────────────────────────────────────────────────

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

// ─── core metadata builder ────────────────────────────────────────────────────

export function buildMetadata({
  description,
  noindex = false,
  path,
  publishedTime,
  title,
  type = "website",
}: BuildMetadataInput): Metadata {
  const absoluteUrl = buildAbsoluteUrl(path);
  const ogImage = buildAbsoluteUrl(OG_IMAGE_PATH);

  return {
    alternates: {
      canonical: absoluteUrl,
    },
    description,
    openGraph: {
      description,
      images: [{ alt: title, height: 630, url: ogImage, width: 1200 }],
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      type,
      url: absoluteUrl,
      ...(type === "article" && publishedTime
        ? { publishedTime: new Date(publishedTime).toISOString() }
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
      creator: "@goldenseastudio",
      description,
      images: [ogImage],
      site: "@goldenseastudio",
      title,
    },
  };
}

// ─── breadcrumb schema ────────────────────────────────────────────────────────

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

// ─── article schema ───────────────────────────────────────────────────────────

export function buildArticleJsonLd(article: BlogArticle) {
  const wordCount = article.contentSections
    .flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: article.category,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    dateModified: new Date(article.publishedAt).toISOString(),
    datePublished: new Date(article.publishedAt).toISOString(),
    description: article.description,
    headline: article.title,
    image: {
      "@type": "ImageObject",
      height: 630,
      url: buildAbsoluteUrl(OG_IMAGE_PATH),
      width: 1200,
    },
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@id": buildAbsoluteUrl(`/blog/${article.slug}`),
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl("/favicon.ico"),
      },
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    wordCount,
  };
}

// ─── website schema ───────────────────────────────────────────────────────────

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    name: siteConfig.name,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/blog?q={search_term_string}`,
      },
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl("/favicon.ico"),
      },
      name: siteConfig.name,
      url: getSiteUrl(),
    },
    url: getSiteUrl(),
  };
}

// ─── FAQ schema (calculator pages) ───────────────────────────────────────────

export function buildFaqJsonLd(faqs: CalculatorFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
  };
}

// ─── SoftwareApplication schema (calculator pages) ────────────────────────────

export function buildToolJsonLd(
  tool: ToolManifestItem,
  _category: CategoryManifestItem,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "UtilitiesApplication",
    description: tool.seoDescription,
    name: tool.seoTitle,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Web",
    url: buildAbsoluteUrl(`/calculator/${tool.slug}`),
  };
}

// ─── CollectionPage schema (category pages) ───────────────────────────────────

export function buildCollectionJsonLd(
  category: CategoryManifestItem,
  tools: ToolManifestItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    description: category.seoDescription,
    hasPart: tools.map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.title,
      url: buildAbsoluteUrl(`/calculator/${tool.slug}`),
    })),
    name: category.seoTitle,
    url: buildAbsoluteUrl(`/category/${category.slug}`),
  };
}

// ─── ItemList schema (blog / listing pages) ───────────────────────────────────

export function buildItemListJsonLd(
  items: Array<{ slug: string; title: string }>,
  basePath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: {
        "@type": "Article",
        name: item.title,
        url: buildAbsoluteUrl(`${basePath}/${item.slug}`),
      },
      position: index + 1,
    })),
    numberOfItems: items.length,
  };
}
