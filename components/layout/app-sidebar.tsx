"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { LogoMark } from "@/components/branding/logo-mark";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { categoryNav, primaryNav, siteConfig, toolNav } from "@/lib/site";
import { useAuthUser } from "@/lib/supabase/use-auth-user";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  onClose?: () => void;
  onNavigate?: () => void;
  pathname: string;
};

type SidebarNavSectionProps = {
  authNext?: string | null;
  isAuthPage: boolean;
  isSignedIn: boolean;
  items: Array<{
    href: string;
    isProtected?: boolean;
    label: string;
    meta?: string;
  }>;
  pathname: string;
  title: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string, authNext?: string | null) {
  if (pathname === "/auth" && authNext === href) {
    return true;
  }

  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

function SidebarNavSection({
  authNext,
  isAuthPage,
  isSignedIn,
  items,
  pathname,
  title,
  onNavigate,
}: SidebarNavSectionProps) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href, authNext);
          const signInRequired = Boolean(item.isProtected && !isSignedIn);
          const href = signInRequired ? `/auth?next=${encodeURIComponent(item.href)}` : item.href;
          const isDisabled = isAuthPage && signInRequired;

          const content = (
            <>
              <span
                className={cn(
                  "min-w-0 flex-1 text-left leading-5",
                  active && "!text-white",
                )}
              >
                {item.label}
              </span>
              {isDisabled ? (
                <span className="shrink-0 rounded-full bg-[var(--color-surface-muted)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-muted)]">
                  Sign in
                </span>
              ) : item.meta ? (
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                    active
                      ? "bg-white/14 !text-white"
                      : "bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)]",
                  )}
                >
                  {item.meta}
                </span>
              ) : null}
            </>
          );

          if (isDisabled) {
            return (
              <div
                key={item.href}
                aria-disabled="true"
                className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-muted)]"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={href}
              onClick={onNavigate}
              scroll={false}
              className={cn(
                "flex items-start justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm transition-colors duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none",
                active
                  ? "bg-[var(--color-text)] !text-white shadow-[var(--shadow-soft)]"
                  : "text-[var(--color-text-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function AppSidebar({
  onClose,
  onNavigate,
  pathname,
}: AppSidebarProps) {
  const searchParams = useSearchParams();
  const { user } = useAuthUser();
  const authNext = searchParams.get("next");
  const isAuthPage = pathname === "/auth";

  return (
    <Card className="flex h-full flex-col bg-white p-4 shadow-[var(--shadow-sidebar)]">
      <div className="flex items-start justify-between gap-3">
        <Link
          href="/"
          onClick={onNavigate}
          scroll={false}
          className="flex min-w-0 items-start gap-3 rounded-[var(--radius-lg)] bg-[linear-gradient(135deg,_rgba(37,99,235,0.12),_rgba(255,255,255,0.92))] p-3"
        >
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[1.25rem] bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]">
            <LogoMark className="h-8 w-8" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="truncate text-base font-semibold tracking-[-0.03em] text-[var(--color-text)]">
              {siteConfig.name}
            </p>
            <p className="text-[13px] leading-5 text-[var(--color-text-soft)]">
              {siteConfig.sidebarTagline}
            </p>
          </div>
        </Link>

        <button
          className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-soft)] transition-colors duration-150 ease-out hover:bg-[var(--color-surface-muted)] active:scale-[0.99] motion-reduce:transition-none lg:hidden"
          onClick={onClose}
          type="button"
        >
          <span className="sr-only">Close navigation</span>
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        <Badge variant="neutral">Batch 1 MVP foundation</Badge>
      </div>

      <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
        <SidebarNavSection
          authNext={authNext}
          isAuthPage={isAuthPage}
          isSignedIn={Boolean(user)}
          items={primaryNav}
          onNavigate={onNavigate}
          pathname={pathname}
          title="Navigation"
        />

        <SidebarNavSection
          authNext={authNext}
          isAuthPage={isAuthPage}
          isSignedIn={Boolean(user)}
          items={categoryNav}
          onNavigate={onNavigate}
          pathname={pathname}
          title="Categories"
        />

        <SidebarNavSection
          authNext={authNext}
          isAuthPage={isAuthPage}
          isSignedIn={Boolean(user)}
          items={toolNav}
          onNavigate={onNavigate}
          pathname={pathname}
          title="Batch 1 tools"
        />
      </div>
    </Card>
  );
}
