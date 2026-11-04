# Phase 16: Real Estate Insights & Content — Implementation Details

## Content Architecture & Typography
- **Dataset**: `src/mocks/articles.ts`
  - Deep-dive editorial content covering Mumbai coastal infrastructure, MahaRERA legal due diligence, and Fe 550D TMT rebar specifications.
  - Section IDs mapped to Table of Contents navigation.

- **Dynamic Article Reader**: `src/app/insights/[slug]/page.tsx`
  - Sticky right sidebar with Table of Contents tracking section anchor tags (`scroll-mt-24`).
  - Native clipboard API integration for sharing links.
  - Editorial callouts highlighted with `#C6383B` left border accents and soft red backgrounds (`#FCEEEF`).

- **Statutory & Institutional Compliance**:
  - `src/app/privacy-policy/page.tsx`: Explicit references to the **Digital Personal Data Protection Act (DPDP Act) 2023** and designated Grievance Officer contacts.
  - `src/app/terms-and-conditions/page.tsx`: Explicit disclosures on Section 79 intermediary liability under the Information Technology Act 2000, RERA mandates, and Mumbai court jurisdiction.
  - `src/app/contact/page.tsx`: Multi-department routing and realistic physical office addresses in One BKC (Mumbai), HAL 2nd Stage (Bengaluru), and Shivaji Nagar (Pune).
  - `src/app/faq/page.tsx`: Accessible collapsible accordion answering core stakeholder questions.
