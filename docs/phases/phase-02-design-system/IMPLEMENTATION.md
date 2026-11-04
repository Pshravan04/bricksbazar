# Phase 02: Design System — Implementation Details

## Architecture Overview
The Design System is organized into two primary layers:
1. **Atomic UI Primitives** in `src/components/ui/`: Generic, accessible, token-driven components.
2. **Domain Composite Components** in `src/components/common/`: Business-logic aware cards, search selectors, filter drawers, and enquiry forms specifically configured for Indian real estate and construction materials.

## Key Files Created
- `src/components/ui/Button.tsx`: Supports variants `primary` (#C6383B), `secondary`, `outline`, `ghost`, `danger`, and sizes `sm`, `md`, `lg`, `icon`.
- `src/components/ui/Input.tsx`: Form input supporting `isSearch` with clear button, validation error text, helper text, and left/right icons.
- `src/components/ui/Select.tsx`: Accessible select element.
- `src/components/ui/MultiSelect.tsx`: Custom multi-select with removable badge chips and dropdown picker.
- `src/components/ui/Checkbox.tsx`: Custom checkbox with checkmark and focus ring.
- `src/components/ui/Radio.tsx`: Grouped radio selection with horizontal or vertical layouts.
- `src/components/ui/Switch.tsx`: Toggle switch with smooth slide animation.
- `src/components/ui/Tabs.tsx`: Tab switcher with active brand red indicator and count pills.
- `src/components/ui/Dropdown.tsx`: Dropdown menu with click-outside detection.
- `src/components/ui/Modal.tsx` & `Drawer.tsx`: Overlay containers with backdrop blur and escape key listener.
- `src/components/ui/Toast.tsx`: Toast provider with `success`, `error`, `info`, and auto-dismiss.
- `src/components/ui/Tooltip.tsx`: Lightweight hover tooltip.
- `src/components/ui/Badge.tsx`: Badges for `verified` (#21865B), `featured` (#C6383B), `rera`, and `demo`.
- `src/components/ui/Breadcrumb.tsx`: Breadcrumb trail with Home icon and chevron separators.
- `src/components/ui/Pagination.tsx`: Multi-page navigation controls.
- `src/components/ui/Skeleton.tsx`: Skeletons including `PropertyCardSkeleton`.
- `src/components/ui/EmptyState.tsx`: High-polish empty, error, and loading states.
- `src/components/ui/ImageGallery.tsx`: Full-screen architectural image gallery modal with thumbnail strip and keyboard navigation.
- `src/components/common/PropertyCard.tsx`: Grid and list view property cards with INR pricing and specs.
- `src/components/common/ProjectCard.tsx`: New launch / under-construction project cards.
- `src/components/common/AgentCard.tsx`: Real estate agent card with rating, reviews, and active listing counts.
- `src/components/common/DeveloperCard.tsx`: Builder card with project portfolio stats.
- `src/components/common/ProductCard.tsx`: Construction material card with quotation trigger.
- `src/components/common/EnquiryForm.tsx`: Zod-validated lead capture form with demo alert.
- `src/components/common/PriceRangeSelector.tsx`: Indian currency budget selector.
- `src/components/common/LocationSelector.tsx`: Metro and city selector.
- `src/components/common/FilterPanel.tsx`: Full property filter panel.
- `src/app/design-system/page.tsx`: Interactive living gallery page testing all components.
