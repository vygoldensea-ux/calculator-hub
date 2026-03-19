import { monetizationConfig } from "@/content/monetization";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { MonetizationSlotName } from "@/types/content";
import { cn } from "@/lib/utils";

type MonetizationSlotProps = {
  className?: string;
  slot: MonetizationSlotName;
};

export function MonetizationSlot({
  className,
  slot,
}: MonetizationSlotProps) {
  const config = monetizationConfig.slots[slot];

  return (
    <Card className={cn("p-5", className)}>
      <div
        className="flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[linear-gradient(180deg,_rgba(248,250,252,0.9),_rgba(241,245,249,0.75))] p-5"
        style={{ minHeight: config.minHeight }}
      >
        <div>
          <Badge variant="neutral">
            {config.enabled ? "Placement enabled" : "Placeholder slot"}
          </Badge>
          <p className="mt-4 text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            {config.label}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
            {config.description}
          </p>
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          Stable footprint to prevent layout shift
        </p>
      </div>
    </Card>
  );
}
