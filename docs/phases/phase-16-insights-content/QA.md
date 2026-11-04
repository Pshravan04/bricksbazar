# Phase 16: Real Estate Insights & Content — QA & Verification

## Automated Verification
- **Build Status**: `pnpm run build` completed with code 0.
- **Routes Generated & Validated**:
  - `/insights` (6.44 kB, 102 kB bundle)
  - `/insights/[slug]` (8.15 kB, 113 kB bundle)
  - `/about` (187 B, 96.1 kB bundle)
  - `/contact` (5.14 kB, 102 kB bundle)
  - `/privacy-policy` (187 B, 96.1 kB bundle)
  - `/terms-and-conditions` (187 B, 96.1 kB bundle)
  - `/faq` (2.83 kB, 90.1 kB bundle)

## Manual Test Scenarios
1. **Insights Category Filtering**:
   - Navigate to `/insights`.
   - Click "RERA & Legal" pill.
   - Verify only legal compliance articles appear in the grid.
2. **Search Verification**:
   - In the search bar on `/insights`, type "Coastal Road".
   - Confirm Mumbai infrastructure trend article displays.
3. **Article TOC & Social Sharing**:
   - Open `/insights/mumbai-real-estate-appreciation-trends-2026`.
   - Click a heading in the sticky Table of Contents. Verify smooth scroll to target section.
   - Click the "Copy Link" button and verify toast notification: "Article link copied to clipboard."
4. **Contact Form Submission**:
   - Navigate to `/contact`.
   - Fill in full name, 10-digit mobile number, email, select "Developer Projects", and submit.
   - Confirm confirmation panel displays and success toast fires.
5. **FAQ Accordion**:
   - Navigate to `/faq`.
   - Click through questions across different stakeholder categories.
   - Confirm smooth toggle expansion and chevron indicator rotation.
