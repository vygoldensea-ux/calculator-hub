import type { Metadata } from "next";

import { ArticleCard } from "@/components/content/article-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CategoryCard } from "@/components/tool/category-card";
import { ToolCard } from "@/components/tool/tool-card";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { CATEGORY_MANIFEST, TOOL_MANIFEST } from "@/content/manifest";
import { implementedCalculatorSlugs } from "@/lib/calculators/registry";
import { getFeaturedArticles } from "@/lib/content";
import { buildMetadata, buildWebsiteJsonLd } from "@/lib/seo";
import { getPopularTools } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  description:
    "Use calculators for BMI, calories, mortgages, loans, investing, percentages, dates, grades, and discounts with clear guides in one hub.",
  path: "/",
  title: "Calculator Hub for Health, Finance, and Everyday Planning",
});

const heroStats = [
  {
    label: "Batch 1 tools",
    value: TOOL_MANIFEST.length.toString().padStart(2, "0"),
  },
  {
    label: "Core categories",
    value: CATEGORY_MANIFEST.length.toString().padStart(2, "0"),
  },
  {
    label: "Live calculators",
    value: implementedCalculatorSlugs.length.toString().padStart(2, "0"),
  },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const popularTools = getPopularTools(6);

  return (
    <PageContainer className="space-y-8">
      <JsonLd data={buildWebsiteJsonLd()} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)]">
        <Card className="relative overflow-hidden p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.85),_rgba(245,247,251,0.95))]" />
          <div className="relative space-y-8">
            <div className="space-y-4">
              <Badge>Trusted calculator hub</Badge>
              <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-[var(--text-3xl)] leading-[1.05] tracking-[-0.04em] text-[var(--color-text)]">
                Use one clear hub for health, finance, date, grade, discount,
                and percentage calculators.
              </h1>
              <p className="max-w-2xl text-[var(--text-lg)] leading-8 text-[var(--color-text-soft)]">
                Get quick answers for body metrics, mortgage payments,
                investment growth, grades, age, date differences, and everyday
                percentage math without bouncing between scattered tools.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/category/finance"
                className={buttonStyles({ variant: "primary" })}
                label="explore_finance"
                location="home_hero"
              >
                Explore finance
              </TrackedLink>
              <TrackedLink
                href="/blog"
                className={buttonStyles({ variant: "secondary" })}
                label="read_guides"
                location="home_hero"
              >
                Read the guides
              </TrackedLink>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[var(--radius-lg)] border border-white/80 bg-white/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur"
                >
                  <p className="text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeader
            eyebrow="Why use it"
            title="A calculator hub built for quick planning"
            description="The goal is to give you fast answers, clear formulas, and useful next-step links without clutter."
          />
          <div className="mt-6 space-y-3">
            {[
              "Twelve working calculators across health, finance, and everyday tasks",
              "Guides that explain the math behind common planning questions",
              "Saved history for signed-in users who return to the same tools",
              "A clean shell that keeps navigation, results, and related links easy to scan",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-6 text-[var(--color-text-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Core categories"
          title="Three calculator categories for common planning questions"
          description="Start with the category that matches your question, then move into the calculators and guides that support it."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {CATEGORY_MANIFEST.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Popular tools"
          title="Start with the calculators people reach for most"
          description="These are the tools most likely to solve the first question quickly before you browse the full directory."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Read next"
          title="Guides that support calculator intent"
          description="Read the plain-English version of the math, then move back into the calculator when you are ready to act."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="All tools"
          title="The full calculator directory"
          description="Browse all current calculators in one place, from mortgages and investing to BMI, grades, dates, and discounts."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {TOOL_MANIFEST.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Clear calculator pages",
            copy: "Each public page has its own title, description, intro copy, and related links so search engines and people both get a clearer first impression.",
          },
          {
            title: "Natural internal links",
            copy: "Popular tools, related guides, and category cross-links make it easier to move from one question to the next without getting lost.",
          },
          {
            title: "Focused planning flow",
            copy: "The hub keeps the main action simple: pick a tool, run the numbers, read the explanation, and continue only if you need more detail.",
          },
        ].map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
              {item.copy}
            </p>
          </Card>
        ))}
      </section>

      <Card className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            Start with a calculator or read the guide first
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
            Some people want the number immediately. Others want the explanation
            first. The hub supports both paths without forcing extra steps.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href="/category/health"
            className={cn(buttonStyles({ variant: "secondary", size: "sm" }))}
            label="browse_health"
            location="home_footer"
          >
            Browse health
          </TrackedLink>
          <TrackedLink
            href="/blog"
            className={cn(buttonStyles({ variant: "ghost", size: "sm" }))}
            label="view_blog_guides"
            location="home_footer"
          >
            View blog guides
          </TrackedLink>
        </div>
      </Card>
    </PageContainer>
  );
}
