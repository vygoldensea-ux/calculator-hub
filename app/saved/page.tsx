import type { Metadata } from "next";

import { SetupCard } from "@/components/auth/setup-card";
import { CalculationRecordList } from "@/components/dashboard/calculation-record-list";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { buildMetadata } from "@/lib/seo";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { getSavedSnapshot } from "@/lib/supabase/queries";

export const metadata: Metadata = buildMetadata({
  description: "Saved calculations and recent history for signed-in users.",
  noindex: true,
  path: "/saved",
  title: "Saved Tools",
});

export const dynamic = "force-dynamic";

export default async function SavedPage() {
  if (!hasSupabaseEnv) {
    return (
      <PageContainer className="space-y-8">
        <SetupCard title="Supabase setup needed for saved calculations" />
      </PageContainer>
    );
  }

  const { errorMessage, recentRuns, savedCalculations, user } =
    await getSavedSnapshot();

  return (
    <PageContainer className="space-y-8">
      <Card className="p-8 md:p-10">
        <Badge>Saved calculations</Badge>
        <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
          A quiet place for your most-used calculators.
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          Signed in as {user.email ?? "your account"}. Saved calculations keep a
          copy of the inputs and result summary so you can reopen a tool with
          the same context later.
        </p>
      </Card>

      {errorMessage ? (
        <Card className="border-amber-200 bg-amber-50/80 p-5">
          <p className="text-sm leading-7 text-amber-800">
            Saved data could not be fully loaded right now. {errorMessage}
          </p>
        </Card>
      ) : null}

      <CalculationRecordList
        emptyMessage="Save a result from any calculator page and it will appear here."
        eyebrow="Saved"
        records={savedCalculations}
        title="Saved calculations"
      />

      <CalculationRecordList
        emptyMessage="Recent calculation runs will appear here after you click calculate while signed in."
        eyebrow="History"
        records={recentRuns}
        title="Recent calculation history"
      />
    </PageContainer>
  );
}
