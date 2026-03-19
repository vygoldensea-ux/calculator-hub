"use client";

import { TrackedLink } from "@/components/analytics/tracked-link";
import { monetizationConfig } from "@/content/monetization";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GoldenseaLeadCardProps = {
  compact?: boolean;
  location: string;
};

export function GoldenseaLeadCard({
  compact = false,
  location,
}: GoldenseaLeadCardProps) {
  const config = monetizationConfig.goldenseaLead;

  return (
    <Card className={cn("overflow-hidden p-6", compact && "p-5")}>
      <div className="rounded-[var(--radius-lg)] bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.96))] p-5">
        <Badge>{config.eyebrow}</Badge>
        <h3
          className={cn(
            "mt-4 font-semibold tracking-[-0.04em] text-[var(--color-text)]",
            compact ? "text-xl" : "text-2xl",
          )}
        >
          {config.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
          {config.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            className={buttonStyles({ size: "sm", variant: "primary" })}
            href={config.requestHref}
            label="goldensea_custom_calculator"
            location={location}
          >
            {config.requestLabel}
          </TrackedLink>
          <TrackedLink
            className={buttonStyles({ size: "sm", variant: "secondary" })}
            href={config.seoToolHref}
            label="goldensea_web_product"
            location={location}
          >
            {config.seoToolLabel}
          </TrackedLink>
        </div>
      </div>
    </Card>
  );
}
