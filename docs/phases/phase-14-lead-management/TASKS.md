# Phase 14: Lead Management & Exchange — Tasks

- [x] Extend core domain types with `CoBrokingRequirement` in `src/types/index.ts`.
- [x] Expand realistic lead datasets in `src/mocks/leads.ts` with multi-stage inquiries and co-broking requirements.
- [x] Build Lead CRM Hub (`/dashboard/leads`):
  - [x] Metric summary cards (Total Leads, New Inquiries, Site Visits, Won/Booked).
  - [x] Search input filtering across name, property, phone, and locality.
  - [x] Dropdown filters for status and lead inquiry types.
  - [x] Pipeline table with real-time status change selector.
  - [x] Direct communication action buttons (Call, Email, WhatsApp).
  - [x] Comprehensive Lead Detail modal with notes log and add-note input.
  - [x] CSV data export simulation.
- [x] Build Co-Broking & Requirement Exchange (`/dashboard/lead-exchange`):
  - [x] Co-broking guide banner with RERA accreditation reminder.
  - [x] Filter bar for City (Mumbai, Pune, Bengaluru) and Purpose (Buy vs. Rent).
  - [x] Requirement cards with urgency flags, budget, localities, and commission split.
  - [x] Inventory match alert chips.
  - [x] Connect to Co-Broke modal with RERA credential display and WhatsApp/Call triggers.
  - [x] Post Client Requirement modal with input validation and instant feed addition.
- [x] Verify production build (`pnpm run build`) and validate static generation of 30 pages.
