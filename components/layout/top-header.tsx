"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthControls } from "@/components/auth/auth-controls";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { InputShell } from "@/components/ui/input-shell";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import { cn } from "@/lib/utils";

type TopHeaderProps = {
  onOpenSidebar: () => void;
};

export function TopHeader({ onOpenSidebar }: TopHeaderProps) {
  const pathname = usePathname();
  const { user } = useAuthUser();
  const isAuthPage = pathname === "/auth";
  const savedHref = user ? "/saved" : `/auth?next=${encodeURIComponent("/saved")}`;

  return (
    <header className="sticky top-4 z-30 mb-6">
      <div className="flex min-w-0 flex-wrap items-center gap-3 rounded-[var(--radius-xl)] border border-white/70 bg-white/78 px-3 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:flex-nowrap sm:px-4">
        <Button
          aria-label="Open navigation"
          className="lg:hidden"
          onClick={onOpenSidebar}
          size="sm"
          variant="ghost"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
        </Button>

        <div className="order-3 min-w-0 basis-full sm:order-none sm:basis-auto sm:flex-1">
          <InputShell
            aria-disabled="true"
            aria-label="Search not available in this MVP"
            className="pointer-events-none cursor-default"
            leading={
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M16 16l4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.7"
                />
              </svg>
            }
            placeholder="Search is not available in this MVP yet"
            readOnly
            shellClassName="pointer-events-none cursor-default opacity-80"
            tabIndex={-1}
          />
        </div>

        <Badge className="hidden xl:inline-flex" variant="neutral">
          Sidebar + routes ready
        </Badge>

        {isAuthPage && !user ? (
          <span
            aria-disabled="true"
            className={cn(
              buttonStyles({ size: "sm", variant: "secondary" }),
              "hidden cursor-not-allowed border-dashed opacity-70 md:inline-flex",
            )}
          >
            Saved requires sign-in
          </span>
        ) : (
          <Link
            className={cn(
              buttonStyles({ size: "sm", variant: "secondary" }),
              "hidden md:inline-flex",
            )}
            href={savedHref}
            scroll={false}
          >
            Saved
          </Link>
        )}

        <AuthControls />
      </div>
    </header>
  );
}
