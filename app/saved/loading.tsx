import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";

export default function SavedLoading() {
  return (
    <PageContainer className="space-y-8">
      <Card className="p-8 md:p-10">
        <div className="h-4 w-36 rounded-full bg-[var(--color-surface-muted)]" />
        <div className="mt-5 h-14 w-full max-w-3xl rounded-3xl bg-[var(--color-surface-muted)]" />
        <div className="mt-4 h-20 w-full max-w-4xl rounded-3xl bg-[var(--color-surface-muted)]" />
      </Card>

      <Card className="h-80 p-6">
        <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
      </Card>

      <Card className="h-72 p-6">
        <div className="h-full rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]" />
      </Card>
    </PageContainer>
  );
}
