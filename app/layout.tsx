import type { Metadata, Viewport } from "next";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AppShell } from "@/components/layout/app-shell";
import { getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

// Viewport is a separate export in Next.js App Router (not part of Metadata)
export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
  width: "device-width",
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
  },
  keywords: [
    "calculator hub",
    "bmi calculator",
    "blog calculator guides",
    "mortgage calculator",
    "loan calculator",
    "finance calculator",
    "health calculator",
  ],
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        height: 630,
        url: "/og-image.png",
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: getSiteUrl(),
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@goldenseastudio",
    description: siteConfig.description,
    site: "@goldenseastudio",
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
