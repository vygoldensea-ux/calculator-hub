import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { SetupCard } from "@/components/auth/setup-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { buildMetadata } from "@/lib/seo";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata({
  description: "Sign in with a lightweight email magic link to save calculations.",
  noindex: true,
  path: "/auth",
  title: "Sign In",
});

type AuthPageProps = {
  searchParams: Promise<{
    message?: string;
    next?: string;
  }>;
};

function getSafeNextPath(next: string | undefined) {
  if (!next || !next.startsWith("/")) {
    return "/dashboard";
  }

  return next;
}

function getNextPathLabel(nextPath: string) {
  switch (nextPath) {
    case "/dashboard":
      return "Dashboard";
    case "/saved":
      return "Saved Tools";
    default:
      return nextPath.replace(/^\//, "").replaceAll("-", " ") || "Dashboard";
  }
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const nextPath = getSafeNextPath(params.next);
  const nextLabel = getNextPathLabel(nextPath);

  if (hasSupabaseEnv) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect(nextPath);
    }
  }

  return (
    <PageContainer className="space-y-8">
      <Card className="p-8 md:p-10">
        <Badge>Email magic link</Badge>
        <h1 className="page-hero-title mt-4 text-[var(--color-text)]">
          Sign in to save calculations and revisit them later.
        </h1>
        <p className="page-hero-copy mt-5 text-[var(--color-text-soft)]">
          Keep auth intentionally lightweight. Enter an email address, open the
          magic link, and your session will unlock the dashboard, saved
          calculations, and recent history.
        </p>
        <div className="mt-6 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--color-text-soft)]">
          After sign in, you will open {nextLabel}.
        </div>
      </Card>

      {params.message ? (
        <Card className="border-amber-200 bg-amber-50/80 p-5">
          <p className="text-sm leading-7 text-amber-800">{params.message}</p>
        </Card>
      ) : null}

      {hasSupabaseEnv ? (
        <AuthForm nextPath={nextPath} />
      ) : (
        <SetupCard title="Supabase setup needed" />
      )}
    </PageContainer>
  );
}
