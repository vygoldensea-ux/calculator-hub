import Script from "next/script";
import { Suspense } from "react";

import { AnalyticsRouteEvents } from "@/components/analytics/analytics-route-events";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/ga";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer = window.dataLayer || [];",
            "function gtag(){window.dataLayer.push(arguments);}",
            "window.gtag = gtag;",
            "gtag('js', new Date());",
            `gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
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
