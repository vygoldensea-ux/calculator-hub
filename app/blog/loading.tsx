import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";

export default function BlogLoading() {
  return (
    <PageContainer className="space-y-6">
      <Card className="p-8">
        <div className="h-4 w-28 rounded-full bg-[var(--color-surface-muted)]" />
        <div className="mt-5 h-14 w-full max-w-3xl rounded-3xl bg-[var(--color-surface-muted)]" />
        <div className="mt-4 h-20 w-full max-w-4xl rounded-3xl bg-[var(--color-surface-muted)]" />
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-64 p-6">
            <div className="h-full rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)]" />
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
