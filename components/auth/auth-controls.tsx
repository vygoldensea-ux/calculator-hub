"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/ga";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import { cn } from "@/lib/utils";

export function AuthControls() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { supabase, user } = useAuthUser();

  if (!hasSupabaseEnv) {
    return (
      <Badge className="hidden md:inline-flex" variant="neutral">
        Auth setup needed
      </Badge>
    );
  }

  if (user === undefined) {
    // Auth still resolving. Render an invisible placeholder matching the
    // button size so the header layout does not shift when the real button appears.
    return <div aria-hidden="true" className="hidden h-10 w-20 md:block" />;
  }

  if (!user) {
    return (
      <Link
        className={cn(buttonStyles({ size: "sm", variant: "primary" }))}
        href={`/auth?next=${encodeURIComponent(pathname || "/dashboard")}`}
        scroll={true}
        onClick={() =>
          trackEvent("cta_click", {
            label: "sign_in",
            location: "header",
          })
        }
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        className={cn(
          buttonStyles({ size: "sm", variant: "secondary" }),
          "hidden md:inline-flex",
        )}
        href="/dashboard"
        scroll={true}
      >
        My dashboard
      </Link>
      <Button
        disabled={isPending}
        onClick={() => {
          if (!supabase) {
            return;
          }

          startTransition(async () => {
            await supabase.auth.signOut();
            router.replace("/");
          });
        }}
        size="sm"
        variant="ghost"
      >
        Sign out
      </Button>
    </div>
  );
}
