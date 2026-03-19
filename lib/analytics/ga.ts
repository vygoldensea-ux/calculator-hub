"use client";

export type AnalyticsEventName =
  | "calculate"
  | "cta_click"
  | "lead_submit"
  | "save_calculation"
  | "signup_complete"
  | "signup_start"
  | "view_blog_post"
  | "view_calculator";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: "config" | "event" | "js",
      target: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
}

export function trackEvent(
  name: AnalyticsEventName,
  params: Record<string, unknown> = {},
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", name, params);
}
