# Phase 08: Agents and Brokers — Implementation Details

## Architecture Overview
The agents and brokers module powers directory search and profile presentation:
- `src/app/agents/page.tsx`: Filters `MOCK_AGENTS` by city, minimum experience years, verification status, and name/agency query.
- `src/app/agents/[slug]/page.tsx`: Individual consultant profile incorporating RERA verification, active listings cross-referenced from `MOCK_PROPERTIES`, and lead capture.
- `src/app/brokers/page.tsx` & `/brokers/[slug]`: Dedicated co-broking and commercial brokerage gateway.
