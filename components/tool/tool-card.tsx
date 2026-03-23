import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCategoryBySlug } from "@/lib/site";
import type { ToolManifestItem } from "@/types/site";

type ToolCardProps = {
  showCategory?: boolean;
  tool: ToolManifestItem;
};

export function ToolCard({ showCategory = true, tool }: ToolCardProps) {
  const category = getCategoryBySlug(tool.category);

  return (
    <Link href={`/calculator/${tool.slug}`} scroll={false}>
      <Card interactive className="h-full p-5">
        <div className="flex items-center justify-between gap-3">
          {showCategory && category ? <Badge>{category.title}</Badge> : <span />}
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            Live
          </span>
        </div>
        <h3 className="mt-5 break-words text-xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]">
          {tool.title}
        </h3>
        <p className="mt-3 break-words text-sm leading-7 text-[var(--color-text-soft)]">
          {tool.shortDescription}
        </p>
        <div className="mt-4 text-sm font-medium text-emerald-700">
          Working calculator
        </div>
      </Card>
    </Link>
  );
}
