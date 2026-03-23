import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";

export default function BlogPostLoading() {
  return (
    <PageContainer className="space-y-6">
      <Card className="p-8">
        <div className="h-4 w-40 rounded-full bg-[var(--color-surface-muted)]" />
        <div className="mt-5 h-16 w-full max-w-4xl rounded-3xl bg-[var(--color-surface-muted)]" />
        <div className="mt-4 h-24 w-full max-w-3xl rounded-3xl bg-[var(--color-surface-muted)]" />
      </Card>

      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="p-8">
          <div className="h-8 w-56 rounded-full bg-[var(--color-surface-muted)]" />
          <div className="mt-5 h-28 w-full rounded-3xl bg-[var(--color-surface-muted)]" />
        </Card>
      ))}
    </PageContainer>
  );
}
