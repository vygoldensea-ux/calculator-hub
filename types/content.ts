import type { ImplementedCalculatorSlug } from "@/types/calculator";
import type { CategorySlug } from "@/types/site";

export type ArticleSection = {
  bullets?: string[];
  callout?: string;
  paragraphs: string[];
  title: string;
};

export type ArticleResourceCard = {
  ctaLabel: string;
  description: string;
  href: string;
  kind?: "affiliate" | "resource";
  note?: string;
  title: string;
};

export type BlogArticle = {
  category: CategorySlug;
  contentSections: ArticleSection[];
  description: string;
  featured?: boolean;
  publishedAt: string;
  readNextSlugs: string[];
  relatedCalculators: ImplementedCalculatorSlug[];
  resource?: ArticleResourceCard;
  slug: string;
  seoDescription: string;
  seoTitle: string;
  title: string;
};

export type MonetizationSlotName =
  | "belowResult"
  | "inArticle"
  | "rightRail"
  | "sponsorCard";

export type MonetizationSlotConfig = {
  description: string;
  enabled: boolean;
  label: string;
  minHeight: number;
};

export type GoldenseaLeadConfig = {
  description: string;
  eyebrow: string;
  requestHref: string;
  requestLabel: string;
  seoToolHref: string;
  seoToolLabel: string;
  title: string;
};

export type MonetizationConfig = {
  goldenseaLead: GoldenseaLeadConfig;
  slots: Record<MonetizationSlotName, MonetizationSlotConfig>;
};
