import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow framing by other origins (clickjacking protection)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop legacy XSS auditor leakage
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Restrict referrer info to same-origin only
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unused browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Serve compressed assets (gzip / brotli)
  compress: true,

  // Prefer modern image formats for smaller payloads
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Security + SEO-friendly HTTP headers on every route
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
