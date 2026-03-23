import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getToolsByCategory } from "@/lib/site";
import type { CategoryManifestItem } from "@/types/site";

type CategoryCardProps = {
  category: CategoryManifestItem;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const tools = getToolsByCategory(category.slug);

  return (
    <Link href={`/category/${category.slug}`} scroll={false}>
      <Card interactive className="h-full p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge>{category.title}</Badge>
          <span className="text-sm font-medium text-[var(--color-text-muted)]">
            {tools.length} tools
          </span>
        </div>
        <h3 className="mt-5 break-words text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]">
          {category.title}
        </h3>
        <p className="mt-3 break-words text-sm leading-7 text-[var(--color-text-soft)]">
          {category.shortDescription}
        </p>
      </Card>
    </Link>
  );
}
