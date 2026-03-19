import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/supabase";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (browserClient) {
    return browserClient;
  }

  const { publishableKey, url } = getSupabaseEnv();

  browserClient = createBrowserClient<Database>(url, publishableKey);

  return browserClient;
}
