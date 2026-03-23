"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { trackEvent, trackPageView } from "@/lib/analytics/ga";

export function AnalyticsRouteEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const route = query ? `${pathname}?${query}` : pathname;

    trackPageView(route);

    if (pathname.startsWith("/calculator/")) {
      trackEvent("view_calculator", {
        calculator_slug: pathname.replace("/calculator/", ""),
      });
    }

    if (pathname.startsWith("/blog/")) {
      trackEvent("view_blog_post", {
        slug: pathname.replace("/blog/", ""),
      });
    }

    if (searchParams.get("auth") === "complete") {
      trackEvent("signup_complete", {
        source: "magic_link",
      });
    }
  }, [pathname, searchParams]);

  return null;
}
