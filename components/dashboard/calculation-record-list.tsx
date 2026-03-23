import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CalculatorRunRow, SavedCalculationRow } from "@/types/supabase";

type CalculationRecord = CalculatorRunRow | SavedCalculationRow;

const createdAtFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

type CalculationRecordListProps = {
  emptyMessage: string;
  eyebrow: string;
  records: CalculationRecord[];
  title: string;
};

function formatCreatedAt(value: string) {
  return createdAtFormatter.format(new Date(value));
}

export function CalculationRecordList({
  emptyMessage,
  eyebrow,
  records,
  title,
}: CalculationRecordListProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 break-words text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--color-text)]">
            {title}
          </h2>
        </div>
      </div>

      {records.length > 0 ? (
        <div className="mt-6 space-y-3">
          {records.map((record) => (
            <div
              key={record.id}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{record.calculator_slug.replaceAll("-", " ")}</Badge>
                {"is_pinned" in record && record.is_pinned ? (
                  <Badge variant="neutral">Pinned</Badge>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                {record.result.summary}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
                <span>{formatCreatedAt(record.created_at)}</span>
                <Link
                  className="font-medium text-[var(--color-brand-strong)]"
                  href={`/calculator/${record.calculator_slug}`}
                  scroll={false}
                >
                  Open calculator
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex min-h-56 items-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] p-6 text-sm leading-7 text-[var(--color-text-soft)]">
          {emptyMessage}
        </div>
      )}
    </Card>
  );
}
