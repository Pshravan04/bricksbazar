# Phase 03: Global Website Layout — Implementation Details

## Architecture Overview
The layout structure wraps the application at the root (`src/app/layout.tsx`). The layout components detect dashboard and admin sub-paths dynamically, ensuring that platform administrative and specialized dashboard layouts remain completely decoupled from public consumer pages.

## Key Files Created & Modified
- `src/components/layout/Header.tsx`: Responsive navigation header featuring brand logo, desktop megamenu dropdowns, active path highlighting, and Post Property CTA.
- `src/components/layout/MobileNavDrawer.tsx`: Off-canvas navigation drawer with accessible accordion sections, quick metro buttons, and direct phone contact.
- `src/components/layout/Footer.tsx`: Comprehensive footer featuring four core trust pillars, property navigation links across major Indian metros, materials categories, and brand attribution.
- `src/app/layout.tsx`: Root HTML layout wrapping pages with `ToastProvider`, `Header`, and `Footer`.
