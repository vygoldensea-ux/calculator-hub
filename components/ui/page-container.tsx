import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--content-width)] px-1 sm:px-0", className)}
      {...props}
    />
  );
}
