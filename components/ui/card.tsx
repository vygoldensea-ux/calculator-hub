import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({
  className,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white/92 shadow-[var(--shadow-card)] backdrop-blur-sm",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-150 ease-out motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] active:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
