import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function getSafeNextPath(nextPath: string | null) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return "/dashboard";
  }

  return nextPath;
}

function getEmailOtpType(type: string | null): EmailOtpType | null {
  switch (type) {
    case "signup":
    case "invite":
    case "magiclink":
    case "recovery":
    case "email_change":
    case "email":
      return type;
    default:
      return null;
  }
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const nextPath = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!hasSupabaseEnv) {
    return NextResponse.redirect(
      new URL(
        `/auth?message=${encodeURIComponent("Supabase is not configured yet.")}`,
        requestUrl.origin,
      ),
    );
  }

  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = getEmailOtpType(requestUrl.searchParams.get("type"));

  if (!code && !(tokenHash && type)) {
    return NextResponse.redirect(
      new URL(
        `/auth?message=${encodeURIComponent("The sign-in link is missing its verification code.")}`,
        requestUrl.origin,
      ),
    );
  }

  const supabase = await createClient();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({
        token_hash: tokenHash as string,
        type: type as EmailOtpType,
      });

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/auth?message=${encodeURIComponent(error.message)}`,
        requestUrl.origin,
      ),
    );
  }

  const redirectUrl = new URL(nextPath, requestUrl.origin);
  redirectUrl.searchParams.set("auth", "complete");

  return NextResponse.redirect(redirectUrl);
}
