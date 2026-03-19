import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ArticleResourceCard } from "@/types/content";

type AffiliateResourceCardProps = {
  resource?: ArticleResourceCard;
};

export function AffiliateResourceCard({
  resource,
}: AffiliateResourceCardProps) {
  if (!resource) {
    return (
      <Card className="p-6">
        <Badge variant="neutral">Resource slot</Badge>
        <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
          Reserved for a vetted resource or affiliate recommendation
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
          This block stays placeholder-ready so article layouts can support
          tasteful monetization later without surprising the reader.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Badge variant="neutral">
        {resource.kind === "affiliate" ? "Affiliate-ready card" : "Resource card"}
      </Badge>
      <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
        {resource.title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
        {resource.description}
      </p>
      <div className="mt-5">
        <Link className={buttonStyles({ size: "sm", variant: "secondary" })} href={resource.href}>
          {resource.ctaLabel}
        </Link>
      </div>
      {resource.note ? (
        <p className="mt-4 text-xs leading-6 text-[var(--color-text-muted)]">
          {resource.note}
        </p>
      ) : null}
    </Card>
  );
}
