import Link from "next/link";

import { GoldenseaLeadCard } from "@/components/marketing/goldensea-lead-card";
import { MonetizationSlot } from "@/components/marketing/monetization-slot";
import { Card } from "@/components/ui/card";
import { getPopularTools } from "@/lib/site";

export function RightRail() {
  const popularTools = getPopularTools(4);

  return (
    <aside className="hidden w-[var(--rail-width)] flex-none 2xl:block">
      <div className="sticky top-28 space-y-4">
        <MonetizationSlot slot="rightRail" />

        <Card className="p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            Popular tools
          </p>
          <div className="mt-4 space-y-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                className="block rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-medium leading-6 text-[var(--color-text)] transition hover:bg-white"
                href={`/calculator/${tool.slug}`}
                scroll={false}
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </Card>

        <MonetizationSlot slot="sponsorCard" />
        <GoldenseaLeadCard compact location="right_rail" />
      </div>
    </aside>
  );
}
