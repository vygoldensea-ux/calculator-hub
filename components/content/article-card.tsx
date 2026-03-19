import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPublishedDate, getCategoryBySlug, getToolBySlug } from "@/lib/site";
import type { BlogArticle } from "@/types/content";
import type { ToolManifestItem } from "@/types/site";

type ArticleCardProps = {
  article: BlogArticle;
  compact?: boolean;
};

export function ArticleCard({
  article,
  compact = false,
}: ArticleCardProps) {
  const category = getCategoryBySlug(article.category);
  const relatedTools = article.relatedCalculators
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolManifestItem => Boolean(tool))
    .slice(0, compact ? 2 : 3);

  return (
    <Link href={`/blog/${article.slug}`}>
      <Card interactive className={compact ? "h-full p-5" : "h-full p-6"}>
        <div className="flex flex-wrap items-center gap-2">
          {category ? <Badge>{category.title}</Badge> : null}
          <span className="text-sm text-[var(--color-text-muted)]">
            {formatPublishedDate(article.publishedAt)}
          </span>
        </div>

        <h3
          className={
            compact
              ? "mt-4 break-words text-xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]"
              : "mt-5 break-words text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]"
          }
        >
          {article.title}
        </h3>

        <p className="mt-3 break-words text-sm leading-7 text-[var(--color-text-soft)]">
          {article.description}
        </p>

        {relatedTools.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {relatedTools.map((tool) => (
              <span
                key={tool.slug}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-medium text-[var(--color-text-soft)]"
              >
                {tool.title}
              </span>
            ))}
          </div>
        ) : null}
      </Card>
    </Link>
  );
}
