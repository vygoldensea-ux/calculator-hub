"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputShell } from "@/components/ui/input-shell";
import { trackEvent } from "@/lib/analytics/ga";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type AuthFormProps = {
  nextPath: string;
};

export function AuthForm({ nextPath }: AuthFormProps) {
  const router = useRouter();
  const [supabase] = useState(() => (hasSupabaseEnv ? createClient() : null));
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "finishing">(
    "idle",
  );

  function getNextPathLabel() {
    switch (nextPath) {
      case "/dashboard":
        return "Dashboard";
      case "/saved":
        return "Saved Tools";
      default:
        return nextPath.replace(/^\//, "").replaceAll("-", " ") || "Dashboard";
    }
  }

  useEffect(() => {
    if (!supabase || typeof window === "undefined") {
      return;
    }

    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");
    const authError = hashParams.get("error_description") || hashParams.get("error");

    if (!accessToken && !refreshToken && !authError) {
      return;
    }

    const cleanCurrentUrl = `${window.location.pathname}${window.location.search}`;
    let isActive = true;

    window.history.replaceState(null, "", cleanCurrentUrl);

    if (authError) {
      queueMicrotask(() => {
        setStatus("idle");
        setError(decodeURIComponent(authError));
      });
      return;
    }

    if (!accessToken || !refreshToken) {
      queueMicrotask(() => {
        setStatus("idle");
        setError("The sign-in link is incomplete. Please request a new one.");
      });
      return;
    }

    queueMicrotask(() => {
      setError("");
      setStatus("finishing");
    });

    supabase.auth
      .setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      .then(({ error: sessionError }) => {
        if (!isActive) {
          return;
        }

        if (sessionError) {
          setStatus("idle");
          setError(sessionError.message);
          return;
        }

        trackEvent("signup_complete", {
          method: "magic_link",
        });
        router.replace(nextPath);
      });

    return () => {
      isActive = false;
    };
  }, [nextPath, router, supabase]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError("Supabase environment variables are not configured yet.");
      return;
    }

    setError("");
    setStatus("sending");

    const redirectTo = new URL("/auth/confirm", window.location.origin);
    redirectTo.searchParams.set("next", nextPath);

    trackEvent("signup_start", {
      method: "magic_link",
    });
    trackEvent("cta_click", {
      label: "send_magic_link",
      location: "auth_page",
    });

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo.toString(),
        shouldCreateUser: true,
      },
    });

    if (signInError) {
      setStatus("idle");
      setError(signInError.message);
      return;
    }

    setStatus("sent");
  }

  return (
    <Card className="p-6">
      <form
        aria-busy={status === "sending" || status === "finishing"}
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-[var(--color-text)]"
            htmlFor="auth-email"
          >
            Email address
          </label>
          <InputShell
            autoComplete="email"
            id="auth-email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            readOnly={status === "sending" || status === "finishing"}
            type="email"
            value={email}
          />
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            We will email a secure sign-in link and then send you to {getNextPathLabel()}.
          </p>
        </div>

        {status === "sent" ? (
          <div className="rounded-[var(--radius-md)] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
            Check your email for the sign-in link. {getNextPathLabel()} will open after
            the link is confirmed.
          </div>
        ) : null}

        {status === "finishing" ? (
          <div className="rounded-[var(--radius-md)] border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800">
            Finishing sign-in and opening {getNextPathLabel()}.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-[var(--radius-md)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
            {error}
          </div>
        ) : null}

        <Button disabled={!email || status === "sending" || status === "finishing"} type="submit">
          {status === "sending" ? "Sending link..." : "Send magic link"}
        </Button>
      </form>
    </Card>
  );
}
