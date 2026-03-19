"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export function useAuthUser() {
  const [supabase] = useState(() => (hasSupabaseEnv ? createClient() : null));
  const [user, setUser] = useState<User | null | undefined>(
    hasSupabaseEnv ? undefined : null,
  );

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setUser(data.session?.user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    supabase,
    user,
  };
}
