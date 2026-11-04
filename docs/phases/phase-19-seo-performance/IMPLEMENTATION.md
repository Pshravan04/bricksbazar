# Phase 19: SEO, Metadata & Performance — Implementation Details

## Technical Implementation
- **Robots Directives (`src/app/robots.ts`)**:
  - Leverages Next.js 14 App Router `MetadataRoute.Robots`.
  - Disallows crawler access to `/dashboard/`, `/admin/`, `/login`, `/register`, `/verify-otp`.
  - References official sitemap URL `https://bricksbazar.com/sitemap.xml`.

- **Sitemap Generator (`src/app/sitemap.ts`)**:
  - Leverages `MetadataRoute.Sitemap`.
  - Aggregates static marketing pages with priority 1.0 down to 0.5.
  - Dynamically iterates over all mock properties, projects, agents, developers, products, and articles, calculating change frequencies and priority weights.

- **Structured Data (`src/lib/seo.ts`)**:
  - Generates JSON-LD schema adhering to Google Rich Results guidelines.
  - Injected directly into root `<head>` in `src/app/layout.tsx`.
