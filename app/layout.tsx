import type { Metadata } from "next";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AppShell } from "@/components/layout/app-shell";
import { getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(getSiteUrl()),
  keywords: [
    "calculator hub",
    "bmi calculator",
    "blog calculator guides",
    "mortgage calculator",
    "loan calculator",
    "finance calculator",
    "health calculator",
  ],
  openGraph: {
    description: siteConfig.description,
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: getSiteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    title: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GoogleAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
