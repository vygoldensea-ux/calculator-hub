"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { RightRail } from "@/components/layout/right-rail";
import { TopHeader } from "@/components/layout/top-header";
import { AuthUserProvider } from "@/lib/supabase/auth-context";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <AuthUserProvider>
      <div className="min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-[1680px] gap-4 px-4 py-4 lg:px-5">
          <button
            aria-hidden={!isSidebarOpen}
            aria-label="Close navigation"
            className={cn(
              "fixed inset-0 z-40 bg-slate-950/20 lg:hidden",
              isSidebarOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
              "transition-opacity duration-200",
            )}
            onClick={() => setIsSidebarOpen(false)}
            tabIndex={isSidebarOpen ? 0 : -1}
            type="button"
          />

          <aside
            className={cn(
              "fixed inset-y-4 left-4 z-50 w-[min(var(--sidebar-width),calc(100vw-2rem))] transition-transform duration-200 lg:static lg:inset-auto lg:z-auto lg:w-[var(--sidebar-width)] lg:translate-x-0",
              isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]",
            )}
          >
            {/* No Suspense here — AppSidebar is a pure client component that
                no longer calls useSearchParams(), so it never suspends.
                Removing Suspense prevents the skeleton flash on every navigation. */}
            <AppSidebar
              onClose={() => setIsSidebarOpen(false)}
              onNavigate={() => setIsSidebarOpen(false)}
              pathname={pathname}
            />
          </aside>

          <div className="min-w-0 flex-1">
            <TopHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
            <main className="min-h-[calc(100vh-7rem)] min-w-0 pb-10">{children}</main>
          </div>

          <RightRail />
        </div>
      </div>
    </AuthUserProvider>
  );
}
