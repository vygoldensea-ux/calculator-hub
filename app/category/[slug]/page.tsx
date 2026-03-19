import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/content/article-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { CategoryCard } from "@/components/tool/category-card";
import { ToolCard } from "@/components/tool/tool-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { CATEGORY_MANIFEST } from "@/content/manifest";
import { getArticlesByCategory } from "@/lib/content";
import { buildBreadcrumbJsonLd, buildCollectionJsonLd, buildMetadata } from "@/lib/seo";
import { getCategoryBySlug, getToolBySlug, getToolsByCategory } from "@/lib/site";
import type { ToolManifestItem } from "@/types/site";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_MANIFEST.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return buildMetadata({
    description: category.seoDescription,
    path: `/category/${category.slug}`,
    title: category.seoTitle,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);
  const relatedArticles = getArticlesByCategory(category.slug).slice(0, 3);
  const featuredTools = category.featuredToolSlugs
    .map((toolSlug) => getToolBySlug(toolSlug))
    .filter((tool): tool is ToolManifestItem => Boolean(tool));
  const siblingCategories = CATEGORY_MANIFEST.filter(
    (item) => item.slug !== category.slug,
  );

  return (
    <PageContainer className="space-y-8">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `${category.title} calculators`, path: `/category/${category.slug}` },
        ])}
      />
      <JsonLd data={buildCollectionJsonLd(category, tools)} />
      <Card className="p-8 md:p-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: `${category.title} calculators` },
          ]}
        />
        <Badge>{category.title}</Badge>
        <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
          {category.title} calculators
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          {category.intro}
        </p>
        <div className="mt-6 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]">
          {tools.length} tool{tools.length === 1 ? "" : "s"} in this category
        </div>
      </Card>

      {featuredTools.length > 0 ? (
        <section className="space-y-4">
          <SectionHeader
            eyebrow="Featured calculators"
            title={`Start with the most useful ${category.title.toLowerCase()} tools`}
            description={`These featured calculators cover the most common ${category.title.toLowerCase()} planning questions before you browse the full category.`}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} showCategory={false} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Category listing"
          title={`All ${category.title.toLowerCase()} tools in batch 1`}
          description="Every calculator in this category now shares the same shell, result language, and supporting content pattern."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} showCategory={false} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Related guides"
          title={`Read more around ${category.title.toLowerCase()} planning`}
          description="These articles support the calculators in this category and strengthen the internal linking between tools and content."
        />
        {relatedArticles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} compact />
            ))}
          </div>
        ) : (
          <Card className="border-dashed p-6 text-sm leading-7 text-[var(--color-text-soft)]">
            More guides can be added here later without changing the route
            architecture.
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Cross-links"
          title="Explore another category"
          description="Category cross-links keep discovery natural for people whose question shifts from one planning lane to another."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {siblingCategories.map((item) => (
            <CategoryCard key={item.slug} category={item} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
