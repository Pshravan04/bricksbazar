# Phase 19: SEO, Metadata & Performance — QA & Verification

## Automated Verification
- **Build Output**: `pnpm run build` completed with status 0.
- **Routes Generated**:
  - `/robots.txt` (Prerendered static text, 0 B)
  - `/sitemap.xml` (Prerendered static XML, 0 B)
  - 44 total application routes compiled.

## Manual Test Scenarios
1. **Robots.txt Content**:
   - Verify `/robots.txt` disallows crawler access to `/dashboard/` and `/admin/`.
   - Verify presence of `Sitemap: https://bricksbazar.com/sitemap.xml`.
2. **Sitemap Verification**:
   - Inspect output of `/sitemap.xml`.
   - Confirm listing URLs for `/property/[slug]`, `/projects/[slug]`, `/marketplace/product/[slug]`, `/insights/[slug]`.
3. **Structured Data JSON-LD**:
   - Verify Organization JSON-LD script rendered in page `<head>`.
   - Verify presence of Mumbai BKC address and helpline phone number.
4. **Social Sharing Metadata**:
   - Inspect `<meta property="og:title">`, `<meta property="og:image">`, `<meta name="twitter:card">`.
   - Confirm proper title templates and branding image paths (`/brand/logo.png`).
