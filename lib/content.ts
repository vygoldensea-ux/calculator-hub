import { BLOG_ARTICLES } from "@/content/articles";
import type { BlogArticle } from "@/types/content";
import type { ImplementedCalculatorSlug } from "@/types/calculator";
import type { CategorySlug } from "@/types/site";

export function getAllArticles() {
  return [...BLOG_ARTICLES].sort(
    (left, right) =>
      new Date(right.publishedAt).valueOf() -
      new Date(left.publishedAt).valueOf(),
  );
}

export function getArticleBySlug(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getFeaturedArticles(limit = 3) {
  return getAllArticles()
    .filter((article) => article.featured)
    .slice(0, limit);
}

export function getArticlesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is BlogArticle => Boolean(article));
}

export function getArticlesByCategory(category: CategorySlug, excludeSlug?: string) {
  return getAllArticles().filter(
    (article) => article.category === category && article.slug !== excludeSlug,
  );
}

export function getArticlesByCalculatorSlug(
  slug: ImplementedCalculatorSlug,
  excludeSlug?: string,
) {
  return getAllArticles().filter(
    (article) =>
      article.slug !== excludeSlug && article.relatedCalculators.includes(slug),
  );
}

export function getReadNextArticles(article: BlogArticle, limit = 3) {
  const explicitMatches = article.readNextSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((candidate): candidate is BlogArticle => Boolean(candidate));

  const fallbackMatches = getArticlesByCategory(article.category, article.slug).filter(
    (candidate) => !explicitMatches.some((match) => match.slug === candidate.slug),
  );

  return [...explicitMatches, ...fallbackMatches].slice(0, limit);
}
