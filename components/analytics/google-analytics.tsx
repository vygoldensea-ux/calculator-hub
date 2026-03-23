import Script from "next/script";
import { Suspense } from "react";

import { AnalyticsRouteEvents } from "@/components/analytics/analytics-route-events";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer = window.dataLayer || [];",
            "function gtag(){window.dataLayer.push(arguments);}",
            "window.gtag = gtag;",
            "gtag('js', new Date());",
            `gtag('config', '${measurementId}');`,
          ].join(""),
        }}
        id="ga4-init"
        suppressHydrationWarning
      />
      <Suspense fallback={null}>
        <AnalyticsRouteEvents />
      </Suspense>
    </>
  );
}
