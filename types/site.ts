import type {
  CalculatorFaq,
  ImplementedCalculatorSlug,
} from "@/types/calculator";

export type CategorySlug = "health" | "finance" | "everyday";

export type NavItem = {
  href: string;
  isProtected?: boolean;
  label: string;
  meta?: string;
};

export type CategoryManifestItem = {
  featuredToolSlugs: ImplementedCalculatorSlug[];
  intro: string;
  slug: CategorySlug;
  title: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
};

export type ToolManifestItem = {
  slug: ImplementedCalculatorSlug;
  title: string;
  category: CategorySlug;
  shortDescription: string;
  intro: string;
  faqItems: CalculatorFaq[];
  relatedCalculatorSlugs: ImplementedCalculatorSlug[];
  relatedArticleSlugs: string[];
  seoTitle: string;
  seoDescription: string;
};
