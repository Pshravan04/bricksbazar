# Phase 15: Admin Panel — Scope

## Objective
Provide platform administrators and compliance officers with a centralized governance interface to inspect and moderate property submissions, verify broker and builder RERA accreditations, audit marketplace products, review system security audit ledgers, and adjust platform rules.

## Key Modules
1. **Platform Governance Overview (`/admin`)**:
   - Executive operational metrics: Active listings, Pending moderation queue count, Verified brokers count, Monthly GMV pipeline.
   - Pending moderation queue widget with 1-click Approve and Reject actions.
   - Security and compliance audit log stream.
   - System health, database connection, and API uptime diagnostics.

2. **Property Moderation Queue (`/admin/properties`)**:
   - Inspection table filtering across cities and listing types.
   - Full property inspection modal verifying RERA compliance, carpet area Section 2(k) adherence, and watermark-free photography.
   - Multi-action controls: Approve & Publish, Reject Listing, Request Revision.

3. **Agent & Broker Verification Queue (`/admin/agents`)**:
   - Verification queue matching submitted MahaRERA and State RERA license certificates.
   - Grant and revoke Verified badges with instant platform sync.

4. **Construction Marketplace Moderation (`/admin/marketplace`)**:
   - Building material catalog review and pricing audits.

5. **Security & Audit Logs (`/admin/audit-logs`)**:
   - Immutable security ledger tracking all admin interventions, entity modifications, IP addresses, and timestamps.
   - Free-text search and JSON export simulation.

6. **Platform Governance Settings (`/admin/settings`)**:
   - RERA enforcement switches, auto-approval thresholds, SMS OTP requirements, and commission split standards.
