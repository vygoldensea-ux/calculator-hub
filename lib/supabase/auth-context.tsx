"use client";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type AuthContextValue = {
  supabase: SupabaseClient | null;
  user: User | null | undefined;
};

const AuthContext = createContext<AuthContextValue>({
  supabase: null,
  user: hasSupabaseEnv ? undefined : null,
});

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => (hasSupabaseEnv ? createClient() : null));
  const [user, setUser] = useState<User | null | undefined>(
    hasSupabaseEnv ? undefined : null,
  );

  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) setUser(data.session?.user ?? null);
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

  return (
    <AuthContext.Provider value={{ supabase, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
