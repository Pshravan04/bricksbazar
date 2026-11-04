# Phase 19: SEO, Metadata & Performance — Tasks

- [x] Configure search engine indexing rules and disallow directives in `src/app/robots.ts`.
- [x] Implement multi-entity dynamic sitemap generator in `src/app/sitemap.ts` (17 static routes + all dynamic properties, projects, agents, developers, products, articles).
- [x] Build comprehensive Schema.org JSON-LD generators in `src/lib/seo.ts`:
  - [x] Organization schema.
  - [x] RealEstateListing schema with coordinates, carpet area, and pricing in INR.
  - [x] RealEstateAgent local business schema.
  - [x] Construction Material Product schema with seller details.
  - [x] Insights Article schema.
  - [x] BreadcrumbList schema.
- [x] Configure root metadata, Open Graph tags, Twitter summary card, and embed Organization JSON-LD in `src/app/layout.tsx`.
- [x] Verify production build (`pnpm run build`), confirming static generation of `/robots.txt` and `/sitemap.xml`.
