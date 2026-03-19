import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import type { CalculatorRunRow, SavedCalculationRow } from "@/types/supabase";

function getSafeAuthRedirect(nextPath: string) {
  return `/auth?next=${encodeURIComponent(nextPath)}`;
}

export async function requireAuthenticatedUser(nextPath: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(getSafeAuthRedirect(nextPath));
  }

  return {
    supabase,
    user,
  };
}

export async function getDashboardSnapshot() {
  const { supabase, user } = await requireAuthenticatedUser("/dashboard");
  const [
    { data: savedCalculations, error: savedError },
    { data: recentRuns, error: recentError },
  ] = await Promise.all([
    supabase
      .from("saved_calculations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("calculator_runs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    errorMessage: savedError?.message || recentError?.message || null,
    recentRuns: (recentRuns ?? []) as CalculatorRunRow[],
    savedCalculations: (savedCalculations ?? []) as SavedCalculationRow[],
    user,
  };
}

export async function getSavedSnapshot() {
  const { supabase, user } = await requireAuthenticatedUser("/saved");
  const [
    { data: savedCalculations, error: savedError },
    { data: recentRuns, error: recentError },
  ] = await Promise.all([
    supabase
      .from("saved_calculations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(24),
    supabase
      .from("calculator_runs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(12),
  ]);

  return {
    errorMessage: savedError?.message || recentError?.message || null,
    recentRuns: (recentRuns ?? []) as CalculatorRunRow[],
    savedCalculations: (savedCalculations ?? []) as SavedCalculationRow[],
    user,
  };
}
