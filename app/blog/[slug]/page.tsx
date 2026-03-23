import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Link from "next/link";

import { ArticleCard } from "@/components/content/article-card";
import { AffiliateResourceCard } from "@/components/marketing/affiliate-resource-card";
import { GoldenseaLeadCard } from "@/components/marketing/goldensea-lead-card";
import { MonetizationSlot } from "@/components/marketing/monetization-slot";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolCard } from "@/components/tool/tool-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  getAllArticles,
  getArticleBySlug,
  getReadNextArticles,
} from "@/lib/content";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import {
  formatPublishedDate,
  getCategoryBySlug,
  getPopularTools,
  getToolBySlug,
} from "@/lib/site";
import type { ToolManifestItem } from "@/types/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return buildMetadata({
    description: article.description,
    path: `/blog/${article.slug}`,
    publishedTime: article.publishedAt,
    title: article.title,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryBySlug(article.category);
  const relatedTools = article.relatedCalculators
    .map((calculatorSlug) => getToolBySlug(calculatorSlug))
    .filter((tool): tool is ToolManifestItem => Boolean(tool));
  const readNextArticles = getReadNextArticles(article, 3);
  const popularTools = getPopularTools(3);

  return (
    <PageContainer className="space-y-8">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />
      <JsonLd data={buildArticleJsonLd(article)} />

      <Card className="p-8 md:p-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { label: article.title },
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {category ? (
            <Link href={`/category/${category.slug}`} scroll={false}>
              <Badge>{category.title}</Badge>
            </Link>
          ) : null}
          <Badge variant="neutral">{formatPublishedDate(article.publishedAt)}</Badge>
        </div>
        <h1 className="page-hero-title mt-4 max-w-4xl text-[var(--color-text)]">
          {article.title}
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          {article.description}
        </p>
      </Card>

      <section className="space-y-4">
        {article.contentSections.map((section, index) => (
          <Fragment key={section.title}>
            <Card className="p-6 md:p-8">
              <h2 className="break-words text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-8 text-[var(--color-text-soft)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets?.length ? (
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-text-soft)]">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.callout ? (
                <div className="mt-5 rounded-[var(--radius-lg)] border border-sky-200 bg-sky-50/70 px-5 py-4 text-sm leading-7 text-sky-900">
                  {section.callout}
                </div>
              ) : null}
            </Card>

            {index === 1 ? <MonetizationSlot slot="inArticle" /> : null}
          </Fragment>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <AffiliateResourceCard resource={article.resource} />
        <GoldenseaLeadCard location={`blog_${article.slug}`} />
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Related calculators"
          title="Use the tools behind the article"
          description="Each guide points back to the calculators it supports so readers can move from explanation to action quickly."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Read next"
          title="Keep the thread going"
          description="These next reads continue the same planning journey without forcing generic anchor text."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {readNextArticles.map((candidate) => (
            <ArticleCard key={candidate.slug} article={candidate} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Popular tools"
          title="Or jump back into a calculator"
          description="A short list of high-intent tools gives the article template another natural way back into product usage."
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
