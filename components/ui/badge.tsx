import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "brand" | "neutral" | "success";
};

export function Badge({
  className,
  variant = "brand",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold leading-none uppercase tracking-[0.18em]",
        variant === "brand" &&
          "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]",
        variant === "neutral" &&
          "bg-[var(--color-surface-muted)] text-[var(--color-text-soft)]",
        variant === "success" &&
          "bg-[var(--color-success-soft)] text-[#0f766e]",
        className,
      )}
      {...props}
    />
  );
}
