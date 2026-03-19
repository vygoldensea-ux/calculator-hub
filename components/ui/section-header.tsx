import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  action?: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
};

export function SectionHeader({
  action,
  className,
  description,
  eyebrow,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="section-title mt-2 break-words text-[var(--color-text)]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-3xl break-words text-base leading-7 text-[var(--color-text-soft)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
