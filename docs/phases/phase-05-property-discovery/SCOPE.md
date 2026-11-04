# Phase 05: Property Discovery — Scope

## Objective
Build a complete, responsive, and functional search and listing discovery engine for BricksBazar. Cover all five discovery routes (`/buy`, `/rent`, `/commercial`, `/plots`, `/properties`), supporting dynamic filtering, grid/list/map view modes, multiple sorting criteria, active filter chips, interactive contact modals, and pagination.

## Deliverables
1. Discovery Engine Feature (`src/features/properties/PropertyDiscovery.tsx`):
   - Integrates live filtering on the mock dataset (`filterProperties` and `sortProperties`).
   - Supports search keywords, city selection, category, BHK chips, budget ranges, furnishing, and verified toggles.
   - Switchable view modes: Grid view (default), List view, and interactive Geotagged Map view.
   - Dynamic sorting: Relevance, Newest, Price (Asc/Desc), Area.
   - Active filter tags with single-click removal and "Clear All".
   - Drawer filter on mobile devices (< 1024px).
2. Dedicated Routes:
   - `/buy`: Residential & commercial purchase discovery.
   - `/rent`: Rental discovery with monthly rent denominations.
   - `/commercial`: Grade-A corporate offices and shops.
   - `/plots`: Residential and gated villa plots.
   - `/properties`: Master property directory.
3. Interactive Lead / Site Visit Dialog:
   - Populated with clicked property title and consultant credentials.
