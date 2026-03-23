import type { MonetizationConfig } from "@/types/content";

export const monetizationConfig: MonetizationConfig = {
  goldenseaLead: {
    description:
      "Goldensea Studios can help you ship custom calculators, internal tools, and SEO-friendly product surfaces without bloating the stack.",
    eyebrow: "Goldensea Studios",
    requestHref:
      "mailto:hello@goldenseastudios.com?subject=Custom%20calculator%20request",
    requestLabel: "Request a custom calculator",
    seoToolHref:
      "mailto:hello@goldenseastudios.com?subject=SEO%20tool%20or%20web%20product%20build",
    seoToolLabel: "Discuss a web product build",
    title: "Need a custom calculator or search-friendly tool?",
  },
  slots: {
    belowResult: {
      description:
        "Reserved for a future tasteful placement below the live result card. Disabled by default to keep the calculator flow clear.",
      enabled: false,
      label: "Below-result ad slot",
      minHeight: 188,
    },
    inArticle: {
      description:
        "Reserved for an in-article sponsor or affiliate module with a stable footprint and clean spacing.",
      enabled: false,
      label: "In-article ad slot",
      minHeight: 172,
    },
    rightRail: {
      description:
        "Reserved for a future sponsor or affiliate block in the desktop rail, away from the calculator CTA area.",
      enabled: false,
      label: "Right rail ad slot",
      minHeight: 220,
    },
    sponsorCard: {
      description:
        "Reserved for a sponsor card or vetted partner mention. Kept disabled by default for the MVP.",
      enabled: false,
      label: "Sponsor card",
      minHeight: 180,
    },
  },
};
