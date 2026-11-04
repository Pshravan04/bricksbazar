# Phase 13: Property Submission Wizard — Implementation Details

## Architecture & State Engine
- **Engine**: `src/features/properties/PostPropertyWizard.tsx`
  - React client-side state machine managing 14 steps, linear progress bar, step navigation chips, and form data.
  - Step-by-step validator preventing user progression on invalid fields.
  - Auto-draft saving via browser `localStorage` under key `bb_property_draft`.
  - Realistic default initial state to minimize friction during QA evaluations.

## Visual Design & Brand Alignment
- Clean header with step title, linear progress bar in `#C6383B`, save draft, and reset buttons.
- Distinct card layouts for Purpose and Category selection.
- Amenities grid with selected pill states in `#C6383B` and `#FCEEEF`.
- Dynamic display of price in Indian currency format (`formatINR`) and real-time per sq.ft calculation.
- Clear disclosure tags indicating simulated demo submission with generated reference tracking ID.

## Routes
- `/dashboard/properties/create`: Post property wizard accessible within user management dashboard.
- `/post-property`: Direct public shortcut route accessible from top navigation header and homepage CTAs.
