# Phase 12: Role-Based User Dashboards — Implementation Details

## Architecture & Layout System
- **Component**: `src/components/layout/DashboardShell.tsx`
  - Encapsulates sticky top bar with global search, notifications menu, persona selector, and user avatar.
  - Left navigation sidebar customized per role via declarative role navigation configs.
  - Active route highlighting using `usePathname()`.
  - Global layout decoupling: `src/app/layout.tsx` skips public header/footer on `/dashboard` and `/admin` routes.

## Route Mapping
- `/dashboard`: Gateway route redirecting automatically to `/dashboard/agent` (or active authenticated profile).
- `/dashboard/agent`: Professional workflow for brokers and real estate agents.
- `/dashboard/buyer`: Discovery, shortlisting, and tour management for homebuyers and tenants.
- `/dashboard/owner`: Listing management and direct inquiry oversight for individual property owners.
- `/dashboard/developer`: Portfolio progress, master project status, and inventory sales for developers.
- `/dashboard/supplier`: Product catalog, quotation requests, and stock tracking for construction material dealers.

## Interactive Capabilities
- **Status Change Simulator**: In the Agent Leads Inbox, agents can change lead states (`NEW`, `CONTACTED`, `SITE_VISIT_SCHEDULED`, `NEGOTIATION`, `CLOSED_WON`, `LOST`) with instant UI state updates and toast confirmations.
- **Persona Quick Switch**: Header dropdown lets any user or stakeholder test different dashboard experiences without logging out.
