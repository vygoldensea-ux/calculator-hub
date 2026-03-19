"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  isSignedIn: boolean;
  items: Array<{
    href: string;
    isProtected?: boolean;
    label: string;
    meta?: string;
  }>;
  pathname: string;
  pendingHref: string | null;
  title: string;
  onLinkClick: (href: string) => void;
};

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

function SidebarNavSection({
  isSignedIn,
  items,
  pathname,
  pendingHref,
  title,
  onLinkClick,
}: SidebarNavSectionProps) {
  return (
    <div className="space-y-2">
      <p className="px-3 text-[var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          const signInRequired = Boolean(item.isProtected && !isSignedIn);
          const href = signInRequired
            ? `/auth?next=${encodeURIComponent(item.href)}`
            : item.href;
          // isDisabled: on auth page, protected-but-unsigned items are shown as
          // disabled placeholders so users know what they'll unlock after sign-in.
          const isDisabled = pathname === "/auth" && signInRequired;
          // Optimistic pending: show immediate highlight on click before
          // usePathname catches up with the new route.
          const isPending = !active && pendingHref === href;

          const content = (
            <>
              <span
                className={cn(
                  "min-w-0 flex-1 text-left leading-5",
                  (active || isPending) && "!text-white",
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
                    active || isPending
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
              onClick={() => onLinkClick(href)}
              scroll={true}
              className={cn(
                "flex items-start justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm transition-colors duration-100 ease-out active:scale-[0.99] motion-reduce:transition-none",
                active
                  ? "bg-[var(--color-text)] !text-white shadow-[var(--shadow-soft)]"
                  : isPending
                    ? "bg-[var(--color-text)] !text-white shadow-[var(--shadow-soft)] opacity-80"
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
  const { user } = useAuthUser();
  // Optimistic pending: track the href last clicked so the item lights up
  // immediately without waiting for usePathname to reflect the new route.
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // Clear pending state once navigation has landed.
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  function handleLinkClick(href: string) {
    setPendingHref(href);
    onNavigate?.();
  }

  return (
    <Card className="flex h-full flex-col bg-white p-4 shadow-[var(--shadow-sidebar)]">
      <div className="flex items-start justify-between gap-3">
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          scroll={true}
          className="flex min-w-0 items-start gap-3 rounded-[var(--radius-lg)] bg-[linear-gradient(135deg,_rgba(37,99,235,0.12),_rgba(255,255,255,0.92))] p-3"
        >
          <div className="grid h-11 w-11 place-items-center rounded-[1.25rem] bg-[var(--color-text)] text-base font-semibold tracking-[-0.04em] text-white">
            C
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
          className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-[var(--color-text-soft)] transition-colors duration-100 ease-out hover:bg-[var(--color-surface-muted)] active:scale-[0.99] motion-reduce:transition-none lg:hidden"
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
          isSignedIn={Boolean(user)}
          items={primaryNav}
          onLinkClick={handleLinkClick}
          pathname={pathname}
          pendingHref={pendingHref}
          title="Navigation"
        />

        <SidebarNavSection
          isSignedIn={Boolean(user)}
          items={categoryNav}
          onLinkClick={handleLinkClick}
          pathname={pathname}
          pendingHref={pendingHref}
          title="Categories"
        />

        <SidebarNavSection
          isSignedIn={Boolean(user)}
          items={toolNav}
          onLinkClick={handleLinkClick}
          pathname={pathname}
          pendingHref={pendingHref}
          title="Batch 1 tools"
        />
      </div>
    </Card>
  );
}
