# Phase 09: Builders and Developers — Implementation Details

## Architecture Overview
The developers module introduces company-centric discovery:
- `src/app/developers/page.tsx`: Filters `MOCK_DEVELOPERS` by operating cities and years of experience.
- `src/app/developers/[slug]/page.tsx`: In-depth company profile cross-referencing active projects from `MOCK_PROJECTS`.
