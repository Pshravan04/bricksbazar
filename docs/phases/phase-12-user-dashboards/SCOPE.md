# Phase 12: Role-Based User Dashboards — Scope

## Objective
Provide tailored, high-productivity control centers for every platform stakeholder persona (Buyer/Tenant, Property Owner, Real Estate Agent, Property Broker, Builder/Developer, Material Supplier). Each dashboard must present role-critical metrics, actionable pipelines, notifications, and fast navigation to operational tasks without visual clutter or generic placeholders.

## User Personas Covered
1. **Agent & Broker (`/dashboard/agent`)**:
   - Inquiries & hot leads inbox with real-time status transitions (New, Contacted, Site Visit, Closed, Lost).
   - High-priority lead exchange co-broking broadcast panel.
   - Active property listings management with view counts and direct edit/view links.
   - Quick action shortcuts (Add Property, Post Requirement).

2. **Property Buyer & Tenant (`/dashboard/buyer`)**:
   - Saved and shortlisted properties with live price changes and status tracking.
   - Scheduled site visits and agent contact records.
   - Saved search criteria and instant alert preferences.

3. **Property Owner (`/dashboard/owner`)**:
   - Live listing status (Active, In Review, Rented, Sold).
   - Direct lead inquiries received from verified buyers/tenants.
   - View/click analytics and listing performance metrics.

4. **Builder & Developer (`/dashboard/developer`)**:
   - Master active project pipeline tracking (Under Construction, Launching Soon, Ready to Move).
   - Unit inventory breakdown and sales velocity.
   - Direct prospective homebuyer inquiries and VIP site visit requests.

5. **Material Supplier & Dealer (`/dashboard/supplier`)**:
   - Material catalog inventory status (In Stock, Low Stock, Restock Needed).
   - Incoming Request For Quotation (RFQ) leads from builders and contractors.
   - Bulk order pipeline value and fulfillment metrics.

## Key Deliverables
- Dynamic shared `DashboardShell` (`src/components/layout/DashboardShell.tsx`) with sidebar navigation, persona switcher, live notifications drawer, and user profile summary.
- Dedicated dashboard views with realistic data and interactive controls across all 5 persona sub-routes.
- Live persona switching allowing QA testers and stakeholders to review any role's viewpoint in one click.
