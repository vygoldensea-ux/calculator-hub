const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseEnv =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(supabaseKey);

export function getSupabaseEnv() {
  if (!supabaseKey) {
    throw new Error("Missing Supabase key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }

  return {
    publishableKey: supabaseKey,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  };
}
