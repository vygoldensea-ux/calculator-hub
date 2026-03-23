import type { Metadata } from "next";

import { SetupCard } from "@/components/auth/setup-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CalculationRecordList } from "@/components/dashboard/calculation-record-list";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeader } from "@/components/ui/section-header";
import { implementedCalculatorSlugs } from "@/lib/calculators/registry";
import { buildMetadata } from "@/lib/seo";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { getDashboardSnapshot } from "@/lib/supabase/queries";

export const metadata: Metadata = buildMetadata({
  description:
    "Minimal authenticated dashboard for recent saved calculations and quick return links.",
  noindex: true,
  path: "/dashboard",
  title: "Dashboard",
});

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!hasSupabaseEnv) {
    return (
      <PageContainer className="space-y-8">
        <SetupCard title="Supabase setup needed for the dashboard" />
      </PageContainer>
    );
  }

  const { errorMessage, recentRuns, savedCalculations, user } =
    await getDashboardSnapshot();
  const pinnedSaved = savedCalculations.filter((record) => record.is_pinned);

  return (
    <PageContainer className="space-y-8">
      <Card className="p-8 md:p-10">
        <Badge>Authenticated dashboard</Badge>
        <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
          A workspace for people who come back to the same decisions.
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          Signed in as {user.email ?? "your account"}. This stays intentionally
          light: recent saved calculations, a quick history lane, and direct
          links back to active tools.
        </p>
      </Card>

      {errorMessage ? (
        <Card className="border-amber-200 bg-amber-50/80 p-5">
          <p className="text-sm leading-7 text-amber-800">
            Dashboard data could not be loaded right now. {errorMessage}
          </p>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <CalculationRecordList
          emptyMessage="Saved calculations will appear here after you save a result from any working calculator."
          eyebrow="Saved"
          records={savedCalculations}
          title="Recent saved calculations"
        />

        <div className="space-y-6">
          <Card className="p-6">
            <SectionHeader
              eyebrow="Pinned tools"
              title="Favorites placeholder"
              description="Pinned tools are scaffolded through saved calculations, but this MVP keeps the UI intentionally simple."
            />
            {pinnedSaved.length > 0 ? (
              <div className="mt-5 space-y-3">
                {pinnedSaved.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-6 text-[var(--color-text)]"
                  >
                    {record.calculator_slug.replaceAll("-", " ")}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] p-5 text-sm leading-7 text-[var(--color-text-soft)]">
                No pinned tools yet. Save a calculation first, then this lane
                can grow into a richer favorites workflow later.
              </div>
            )}
          </Card>

          <Card className="p-6">
            <SectionHeader
              eyebrow="Quick links"
              title="Jump back into a calculator"
              description="A few direct routes back to working tools."
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {implementedCalculatorSlugs.slice(0, 6).map((slug) => (
                <TrackedLink
                  key={slug}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition hover:bg-white"
                  href={`/calculator/${slug}`}
                  label={slug}
                  location="dashboard_quick_links"
                >
                  {slug.replaceAll("-", " ")}
                </TrackedLink>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <CalculationRecordList
        emptyMessage="Recent calculation history appears when you calculate while signed in."
        eyebrow="History"
        records={recentRuns}
        title="Recent calculation history"
      />
    </PageContainer>
  );
}
