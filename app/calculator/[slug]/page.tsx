import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorExperience } from "@/components/calculator/calculator-experience";
import { JsonLd } from "@/components/seo/json-ld";
import { TOOL_MANIFEST } from "@/content/manifest";
import { getArticlesByCalculatorSlug, getArticlesBySlugs } from "@/lib/content";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getCategoryBySlug, getToolBySlug } from "@/lib/site";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOL_MANIFEST.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return buildMetadata({
    description: tool.seoDescription,
    path: `/calculator/${tool.slug}`,
    title: tool.seoTitle,
  });
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = getCategoryBySlug(tool.category);

  if (!category) {
    notFound();
  }

  const explicitRelatedArticles = getArticlesBySlugs(tool.relatedArticleSlugs).slice(
    0,
    3,
  );
  const relatedArticles =
    explicitRelatedArticles.length > 0
      ? explicitRelatedArticles
      : getArticlesByCalculatorSlug(tool.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `${category.title} calculators`, path: `/category/${category.slug}` },
          { name: tool.title, path: `/calculator/${tool.slug}` },
          ])}
      />
      <CalculatorExperience
        category={category}
        relatedArticles={relatedArticles}
        slug={tool.slug}
        tool={tool}
      />
    </>
  );
}
