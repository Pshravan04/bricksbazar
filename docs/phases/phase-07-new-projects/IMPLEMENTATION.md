# Phase 07: New Projects — Implementation Details

## Architecture Overview
The New Projects module introduces two core routing interfaces:
1. `src/app/new-projects/page.tsx`: Directory search interface filtering `MOCK_PROJECTS` by city, construction status (`Under Construction`, `New Launch`, `Ready to Move`), and developer name.
2. `src/app/projects/[slug]/page.tsx`: Full-page presentation of RERA-certified projects with timeline benchmarks, architectural highlights, amenities, and developer advisory desk.
