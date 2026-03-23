import type { Metadata } from "next";
import Link from "next/link";

import { ArticleCard } from "@/components/content/article-card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolCard } from "@/components/tool/tool-card";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { getAllArticles, getFeaturedArticles } from "@/lib/content";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getPopularTools } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  description:
    "Browse calculator guides that explain BMI, calories, mortgages, investing, grades, dates, discounts, and percentage math in plain language.",
  path: "/blog",
  title: "Calculator Guides and Planning Articles",
});

export default function BlogPage() {
  const allArticles = getAllArticles();
  const featuredArticle = getFeaturedArticles(1)[0];
  const popularTools = getPopularTools(6);
  const latestArticles = allArticles.filter(
    (article) => article.slug !== featuredArticle?.slug,
  );

  return (
    <PageContainer className="space-y-8">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Card className="p-8 md:p-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: "Blog" },
          ]}
        />
        <Badge>Evergreen guides</Badge>
        <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
          Guides that explain the calculators in plain English.
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          Read quick explainers for BMI, calories, investing, grades,
          mortgages, dates, discounts, and percentage math, then jump straight
          into the matching calculator.
        </p>

        {featuredArticle ? (
          <div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Featured guide
            </p>
            <h2 className="mt-3 break-words text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl">
              {featuredArticle.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-soft)]">
              {featuredArticle.description}
            </p>
            <div className="mt-5">
              <Link
                className={buttonStyles({ size: "sm", variant: "secondary" })}
                href={`/blog/${featuredArticle.slug}`}
                scroll={false}
              >
                Read the article
              </Link>
            </div>
          </div>
        ) : null}
      </Card>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Latest articles"
          title="Starter SEO content for the first calculator batch"
          description="Start with the article that best matches your question, then use the related calculator when you want to run the numbers."
        />
        {allArticles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(featuredArticle ? latestArticles : allArticles).map((article) => (
              <ArticleCard key={article.slug} article={article} compact />
            ))}
          </div>
        ) : (
          <Card className="border-dashed p-6 text-sm leading-7 text-[var(--color-text-soft)]">
            New guides will appear here as the content library grows.
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Popular tools"
          title="Jump from a guide into a calculator"
          description="If you already know what you want to calculate, use one of these high-intent tools instead of reading first."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
