# Clarity Calculator Hub

Production-minded MVP foundation for an English calculator hub built with Next.js App Router, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm run dev
```

## Architecture

- `app/`: Route segments and route-level metadata for home, category, calculator, blog, dashboard, and saved pages.
- `app/sitemap.ts` and `app/robots.ts`: Explicit SEO route outputs for crawl control and discovery.
- `components/layout/`: Shared shell pieces including the sidebar, top header, and optional right rail.
- `components/content/`: Reusable article cards and content-facing UI used by the blog and internal linking blocks.
- `components/marketing/`: Placeholder monetization slots, Goldensea Studios CTA cards, and resource-card components.
- `components/ui/`: Small reusable primitives such as `Card`, `Button`, `Badge`, `SectionHeader`, `InputShell`, and `PageContainer`.
- `components/tool/`: Manifest-driven presentation components for categories and calculators.
- `content/articles.ts`: Local starter article library for the SEO blog system.
- `content/manifest.ts`: Source of truth for calculator and category metadata, including SEO titles, descriptions, intros, featured tool picks, FAQs, and related article slugs.
- `content/monetization.ts`: Central config for placeholder ad slots and the Goldensea Studios lead CTA.
- `lib/content.ts`: Article lookup helpers kept separate from client-shared site helpers to avoid shipping content into the calculator bundle.
- `lib/seo.ts`: Manual metadata, canonical, OG, breadcrumb JSON-LD, and article JSON-LD helpers.
- `lib/site.ts`: Site config plus derived navigation, popular tool helpers, and lightweight shared lookups.
- `types/site.ts`: Shared manifest and navigation types.
- `types/content.ts`: Article and monetization config types for the local content system.
- `public/`: Static assets kept intentionally lean for the MVP.

## Current scope

- Shared dashboard-style layout and navigation shell
- Global design tokens for color, spacing, radius, shadow, and typography scale
- Working calculator engine with manifest-driven calculator content and shared page template
- Supabase-ready auth, persistence, and SQL migration scaffolding
- Local blog/content system with starter SEO articles, article routes, and internal linking blocks
- Manual SEO controls for metadata, sitemap, robots, canonical URLs, and selective JSON-LD
- Centralized GA4 hooks for route views and key calculator/auth actions
- Monetization-ready placeholder slots and lead CTA components that stay disabled or low-pressure by default

## Environment

- Copy `.env.example` to `.env.local`
- Add `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap, and robots output
- Add `NEXT_PUBLIC_SUPABASE_URL`
- Add `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` when GA4 is ready

## Supabase setup

- Put your real project values in `.env.local` using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- The current app expects only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for Supabase client/server auth flows.
- Do not add a service-role key for the current app flows. The existing auth, dashboard, save, and history features are designed to work with the publishable key plus RLS.
- In the Supabase Dashboard, set the site URL to your local or deployed app origin.
- In the Supabase Dashboard, add auth redirect URLs for the environments that will use magic-link sign-in, including the `/auth/confirm` callback path.
- Run the SQL in `supabase/migrations/202603190001_initial_app_schema.sql` in the Supabase SQL Editor before testing saved calculations or the protected dashboard.

## Database

- Apply the SQL in `supabase/migrations/202603190001_initial_app_schema.sql` to create profiles, calculator runs, saved calculations, newsletter subscribers, and lead forms with baseline RLS policies

## Content Flow

- Calculator SEO copy, related article slugs, and category intros live in `content/manifest.ts`, while calculator examples and explanation sections stay in `content/calculator-pages.ts`.
- Blog articles live locally in `content/articles.ts` and are read through `lib/content.ts`.
- Blog cards, related-article blocks, related calculators, and popular-tool sections all pull from these local content files instead of a CMS.

## SEO Flow

- Use `lib/seo.ts` for route metadata, canonical URLs, OG fields, WebSite JSON-LD, breadcrumb JSON-LD, and article JSON-LD.
- Crawlable public routes are listed in `app/sitemap.ts`, while private routes are disallowed in `app/robots.ts`.
- Calculator routes are indexable. Auth, dashboard, and saved routes are marked `noindex`.

## Analytics Events

- Route tracking is centralized in `components/analytics/analytics-route-events.tsx`.
- Event helpers live in `lib/analytics/ga.ts`.
- Active events include calculator views, blog post views, calculate, save calculation, signup start, signup complete, and CTA clicks.

## Monetization Slots

- Placeholder slots are configured in `content/monetization.ts`.
- Shared UI lives in `components/marketing/monetization-slot.tsx`, `components/marketing/affiliate-resource-card.tsx`, and `components/marketing/goldensea-lead-card.tsx`.
- Slots stay disabled or placeholder-first by default so monetization can be introduced later without misleading placement or layout shift.
