# Phase 19: SEO, Metadata & Performance — Scope

## Objective
Maximize organic search discoverability and performance for Indian real estate search queries across Google, Bing, and major search engines. Implement structured Schema.org JSON-LD definitions, dynamic multi-entity XML sitemaps, search-engine crawler directives via `robots.ts`, Open Graph / Twitter Card social metadata, and Core Web Vitals optimizations.

## Core Deliverables
1. **Crawler Control Directives (`src/app/robots.ts`)**:
   - Allows indexing across public search, discovery, and marketplace routes.
   - Restricts crawler bots from indexing private authenticated areas (`/dashboard/`, `/admin/`, `/verify-otp`).
   - Declares official sitemap endpoint (`https://bricksbazar.com/sitemap.xml`).

2. **Dynamic XML Sitemap (`src/app/sitemap.ts`)**:
   - Indexes all 17 core static marketing routes.
   - Dynamically aggregates and indexes all active property slugs, project slugs, agent/broker profiles, developer track records, marketplace materials, and intelligence reports with individual priority ratings and change frequencies.

3. **Schema.org Structured Data Engine (`src/lib/seo.ts`)**:
   - `Organization`: Corporate headquarters in Mumbai BKC, helpline contacts, and official branding.
   - `RealEstateListing`: Pricing in INR, carpet area in square feet (`FTK`), bed/bath configuration, and geographic coordinates.
   - `RealEstateAgent`: State RERA registration, star ratings, and agency location.
   - `Product`: Construction materials specifications, brand, and supplier details.
   - `Article`: Insights reports, author credentials, and publish timestamps.
   - `BreadcrumbList`: Hierarchical navigational metadata.

4. **Meta Tags & Social Cards (`src/app/layout.tsx`)**:
   - Configured `metadataBase`, Open Graph (`og:type`, `og:locale`, `og:image`, `og:site_name`), and Twitter summary cards.
   - Embedded Organization JSON-LD script in document head.
