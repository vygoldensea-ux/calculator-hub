"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { RightRail } from "@/components/layout/right-rail";
import { TopHeader } from "@/components/layout/top-header";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
};

function SidebarFallback() {
  return (
    <Card className="flex h-full flex-col bg-white p-4 shadow-[var(--shadow-sidebar)]">
      <div className="h-16 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)]" />
      <div className="mt-4 h-6 w-40 rounded-full bg-[var(--color-surface-muted)]" />
      <div className="mt-6 space-y-6">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-2">
            <div className="h-3 w-24 rounded-full bg-[var(--color-surface-muted)]" />
            <div className="space-y-1">
              {Array.from({ length: sectionIndex === 2 ? 4 : 3 }).map((__, itemIndex) => (
                <div
                  key={itemIndex}
                  className="h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-muted)]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [sidebarRoute, setSidebarRoute] = useState<string | null>(null);
  const isSidebarOpen = sidebarRoute === pathname;

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] gap-4 px-4 py-4 lg:px-5">
        <button
          aria-hidden={!isSidebarOpen}
          className={cn(
            "fixed inset-0 z-40 bg-slate-950/20 transition-opacity duration-200 lg:hidden",
            isSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          onClick={() => setSidebarRoute(null)}
          type="button"
        />

        <aside
          className={cn(
            "fixed inset-y-4 left-4 z-50 w-[min(var(--sidebar-width),calc(100vw-2rem))] transition-transform duration-200 lg:static lg:inset-auto lg:z-auto lg:w-[var(--sidebar-width)] lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]",
          )}
        >
          <Suspense fallback={<SidebarFallback />}>
            <AppSidebar
              onClose={() => setSidebarRoute(null)}
              onNavigate={() => setSidebarRoute(null)}
              pathname={pathname}
            />
          </Suspense>
        </aside>

        <div className="min-w-0 flex-1">
          <TopHeader onOpenSidebar={() => setSidebarRoute(pathname)} />
          <main className="min-h-[calc(100vh-7rem)] min-w-0 pb-10">{children}</main>
        </div>

        <RightRail />
      </div>
    </div>
  );
}
