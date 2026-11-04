# Phase 02: Design System — Scope

## Objective
Establish a complete, cohesive, accessible, and responsive Design System for BricksBazar. Build all atomic UI primitives, form controls, navigation elements, composite real estate and marketplace cards, search/filter panels, and living interactive showcase.

## Deliverables
1. Atomic Components:
   - Button (Primary, Secondary, Outline, Ghost, Danger, Loading, Disabled)
   - Input (Text, Search with clear, leading/trailing icons, error states)
   - Select & MultiSelect (custom chip tags)
   - Checkbox, RadioGroup, and Switch
   - Tabs (Underline & Pills), Dropdown Menu
   - Modal Dialog & Mobile Drawer (accessible, esc listener, body scroll lock)
   - Toast notification system (`useToast` hook)
   - Tooltip & Badges (Verified, Featured, RERA, Demo)
   - Breadcrumbs, Pagination
   - Skeletons, EmptyState, ErrorState, LoadingState
   - ImageGallery modal with thumbnail strip & keyboard navigation
2. Composite Components:
   - `PropertyCard` (Grid & List view modes, INR formatting, specs, favorite toggle)
   - `ProjectCard` (RERA badge, developer name, price range, configurations)
   - `AgentCard` (Rating stars, experience, active listings, verified badge)
   - `DeveloperCard` (Logo, experience, ongoing & delivered project counts)
   - `ProductCard` (Brand, price per unit/quotation, min order quantity, supplier)
   - `EnquiryForm` (Zod validation, phone validation, preferred time, demo alert)
   - `PriceRangeSelector` (Indian currency denominations Lakhs & Crores)
   - `LocationSelector` (Metros & cities)
   - `FilterPanel` (Multi-faceted filter engine with reset & apply)
3. Living showcase page at `/design-system`.
