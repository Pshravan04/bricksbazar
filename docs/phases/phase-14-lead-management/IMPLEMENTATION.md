# Phase 14: Lead Management & Exchange — Implementation Details

## Architecture & Data Flow
- **Leads Engine**:
  - `src/app/dashboard/leads/page.tsx` utilizes `DashboardShell` configured with `currentRole="agent"`.
  - In-memory state tracking enables rapid testing of lead progression without requiring external database round-trips during UI prototyping.
  - Interactive status modification notifies consultants via `useToast()` notifications.
  - Activity notes maintain a cumulative string log with bullet formatting.

- **Co-Broking Engine**:
  - `src/app/dashboard/lead-exchange/page.tsx` introduces structured collaboration workflows between independent brokers.
  - Commission terms are explicitly defined (e.g. `50:50 Clean Split`) to prevent disputes.
  - Direct connection modals link via `tel:` and `https://wa.me/` protocols with phone number sanitization.

## Data Schema Extensions
- `CoBrokingRequirement`:
  - `clientInitials`, `clientType`, `purpose`, `propertyCategory`, `bhk`, `budget`, `targetLocalities`, `city`, `urgency`, `commissionSplit`, `agentName`, `agentAgency`, `agentRera`, `agentPhone`, `matchedInventoryCount`.
