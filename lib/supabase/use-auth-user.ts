"use client";

import { useAuthContext } from "@/lib/supabase/auth-context";

// Delegates to AuthUserProvider context so all callers share a single
// Supabase client, one getSession() call, and one subscription.
export function useAuthUser() {
  return useAuthContext();
}
