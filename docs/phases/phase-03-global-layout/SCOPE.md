# Phase 03: Global Website Layout — Scope

## Objective
Implement a responsive, accessible, premium global layout shell for BricksBazar. This includes a sticky desktop navigation header with interactive dropdown menus, a mobile slide-out drawer with accordion submenus, and a comprehensive footer containing real estate discovery links, materials marketplace categories, verified professional directories, and legal policies.

## Deliverables
1. Sticky Header (`src/components/layout/Header.tsx`):
   - High-fidelity logo integration
   - Desktop navigation for Buy, Rent, Commercial, Plots, New Projects, Professionals, Marketplace, Insights
   - Hover and click dropdown menus for sub-categories
   - Right-side actions: Login/Register and Post Property free CTA
   - Scroll-detection with subtle box-shadow elevation
2. Mobile Navigation Drawer (`src/components/layout/MobileNavDrawer.tsx`):
   - Hamburger trigger
   - Smooth slide-in animation with backdrop blur
   - Accordion submenus for Buy, Rent, Projects, Marketplace
   - Quick metro switcher and customer support hotline
3. Comprehensive Footer (`src/components/layout/Footer.tsx`):
   - 4-column value proposition banner (100% RERA Verified, Direct Owners/Builders, Integrated Materials, Dedicated Advisory)
   - Property links by metro
   - Construction materials category directory
   - Professional ecosystem and legal links
   - Brand color tokens attribution and copyright
4. Root Layout integration (`src/app/layout.tsx`):
   - Wraps all public pages seamlessly
   - Excludes public header/footer on administrative and dashboard sub-routes
