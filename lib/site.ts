import { CATEGORY_MANIFEST, TOOL_MANIFEST } from "@/content/manifest";
import type { CategorySlug, NavItem, ToolManifestItem } from "@/types/site";

export const siteConfig = {
  description:
    "A clean calculator hub for BMI, calories, mortgages, loans, investing, dates, grades, discounts, and percentage math, paired with helpful guides.",
  contactEmail: "hello@goldenseastudios.com",
  name: "Clarity Calculator Hub",
  sidebarTagline: "Planner-grade calculator workspace",
  studioName: "Goldensea Studios",
} as const;

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", isProtected: true, label: "Dashboard" },
  { href: "/saved", isProtected: true, label: "Saved Tools" },
  { href: "/blog", label: "Blog" },
];

export const categoryNav: NavItem[] = CATEGORY_MANIFEST.map((category) => ({
  href: `/category/${category.slug}`,
  label: category.title,
  meta: `${TOOL_MANIFEST.filter((tool) => tool.category === category.slug).length}`,
}));

export const toolNav: NavItem[] = TOOL_MANIFEST.map((tool) => ({
  href: `/calculator/${tool.slug}`,
  label: tool.title,
}));

const articleDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const POPULAR_TOOL_SLUGS: ToolManifestItem["slug"][] = [
  "mortgage-calculator",
  "investment-calculator",
  "percentage-calculator",
  "bmi-calculator",
  "age-calculator",
  "discount-calculator",
];

export function getCategoryBySlug(slug: string) {
  return CATEGORY_MANIFEST.find((category) => category.slug === slug);
}

export function getToolBySlug(slug: string) {
  return TOOL_MANIFEST.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: CategorySlug) {
  return TOOL_MANIFEST.filter((tool) => tool.category === category);
}

export function getPopularTools(limit = POPULAR_TOOL_SLUGS.length) {
  return POPULAR_TOOL_SLUGS.map((slug) => getToolBySlug(slug))
    .filter((tool): tool is ToolManifestItem => Boolean(tool))
    .slice(0, limit);
}

export function formatPublishedDate(publishedAt: string) {
  return articleDateFormatter.format(new Date(publishedAt));
}
