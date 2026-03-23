import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";

import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/supabase";

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

function buildAuthRedirectUrl(origin: string, nextPath: string, message?: string) {
  const authUrl = new URL("/auth", origin);
  authUrl.searchParams.set("next", nextPath);

  if (message) {
    authUrl.searchParams.set("message", message);
  }

  return authUrl;
}

function getRequestOrigin(request: NextRequest) {
  const protocol =
    request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(/:$/, "");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");

  if (!host) {
    return request.nextUrl.origin;
  }

  return `${protocol}://${host}`;
}

export async function GET(request: NextRequest) {
  const requestOrigin = getRequestOrigin(request);
  const requestUrl = new URL(request.url);
  const nextPath = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (!hasSupabaseEnv) {
    return NextResponse.redirect(
      buildAuthRedirectUrl(
        requestOrigin,
        nextPath,
        "Supabase is not configured yet.",
      ),
    );
  }

  const successRedirectUrl = new URL(nextPath, requestOrigin);
  successRedirectUrl.searchParams.set("auth", "complete");
  const response = NextResponse.redirect(successRedirectUrl);
  const { publishableKey, url } = getSupabaseEnv();

  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, options, value }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = getEmailOtpType(requestUrl.searchParams.get("type"));
  const callbackError =
    requestUrl.searchParams.get("error_description") || requestUrl.searchParams.get("error");

  if (!code && !(tokenHash && type)) {
    return NextResponse.redirect(
      buildAuthRedirectUrl(requestOrigin, nextPath, callbackError || undefined),
    );
  }

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : await supabase.auth.verifyOtp({
        token_hash: tokenHash as string,
        type: type as EmailOtpType,
      });

  if (error) {
    return NextResponse.redirect(
      buildAuthRedirectUrl(requestOrigin, nextPath, error.message),
    );
  }

  return response;
}
