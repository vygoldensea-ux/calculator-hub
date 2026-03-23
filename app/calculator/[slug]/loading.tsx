import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";

export default function CalculatorLoading() {
  return (
    <PageContainer className="space-y-8">
      <div className="h-5 w-72 rounded-full bg-[var(--color-surface-muted)]" />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <div className="space-y-6">
          <Card className="h-72 p-8 md:p-10">
            <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
          </Card>
          <Card className="h-80 p-6">
            <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
          </Card>
          <Card className="h-64 p-6">
            <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-72 p-6">
            <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
          </Card>
          <Card className="h-52 p-6">
            <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
          </Card>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-56 p-6">
            <div className="h-full rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)]" />
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
