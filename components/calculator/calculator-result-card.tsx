import { getResultToneClasses } from "@/lib/calculators/registry";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import type { CalculatorRunState } from "@/types/calculator";
import { cn } from "@/lib/utils";

type CalculatorResultCardProps = {
  state: CalculatorRunState;
};

export function CalculatorResultCard({
  state,
}: CalculatorResultCardProps) {
  return (
    <Card className="min-h-[27rem] p-6">
      <SectionHeader
        eyebrow="Live result"
        title={state.title}
        description={state.message}
      />

      {state.status === "success" ? (
        <div className="mt-6 flex min-h-[19rem] flex-col space-y-5">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(247,248,252,0.96))] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {state.result.primaryLabel}
            </p>
            <p
              className={cn(
                "mt-4 text-5xl font-semibold tracking-[-0.05em]",
                getResultToneClasses(state.result.primaryTone),
              )}
            >
              {state.result.primaryValue}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
              {state.result.summary}
            </p>
          </div>

          <div className="grid flex-1 content-start gap-3 sm:grid-cols-2">
            {state.result.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {metric.label}
                </p>
                <p
                  className={cn(
                    "mt-2 text-base font-semibold text-[var(--color-text)]",
                    metric.tone === "positive" && "text-emerald-700",
                    metric.tone === "warning" && "text-amber-700",
                  )}
                >
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "mt-6 flex min-h-[19rem] flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed p-6 text-center",
            state.status === "error"
              ? "border-amber-300 bg-amber-50/70"
              : "border-[var(--color-border-strong)] bg-[var(--color-surface-muted)]",
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            {state.status === "error" ? "Needs attention" : "Waiting for inputs"}
          </p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text)]">
            {state.status === "error" ? "Check inputs" : "--"}
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            {state.message}
          </p>
        </div>
      )}
    </Card>
  );
}
