# Phase 06: Property Detail Pages — Scope

## Objective
Implement dynamic, high-fidelity property detail pages (`/property/[slug]`) for BricksBazar. Deliver an editorial experience inspired by luxury real estate architectural showcases, including interactive configuration selectors, responsive gallery modals, dynamic pricing updates, sticky enquiry cards, nearby landmark indexes, and verified RERA certificates.

## Deliverables
1. Image Showcase:
   - Primary hero photo with side thumbnail stack.
   - "View all X photos" trigger launching full-screen `ImageGallery` modal with thumbnail strip and keyboard navigation.
2. Configuration & Variant Selector:
   - Dynamic switching between configurations (e.g. 3 BHK vs 4 BHK).
   - Instant calculation and updates for price, rate/sq.ft, carpet area, and super built-up area.
3. Detailed Overview & Specs:
   - Specifications table: Floor, Facing/Vastu, Possession, Age, RERA ID, and Posted By.
   - Key highlights bullet points and complete architectural description.
   - Categorized amenities with icons.
4. Location Advantages:
   - Nearby landmarks with walking/driving distances (Metro, Airport, School, Hospital, Mall).
5. Sticky Desktop Enquiry Card & Mobile Action Bar:
   - Real-time price summary matching selected configuration.
   - Lead form with field validation (Name, 10-digit Indian mobile, Email, Time slot, Message).
   - "Schedule Site Visit" modal dialog.
   - Demo notice preventing fake SMS/webhook dispatch claims.
6. Similar Properties Grid:
   - Cross-linked recommendations matching locality or listing type.
