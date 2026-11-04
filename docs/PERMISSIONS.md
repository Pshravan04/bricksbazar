# BRICKSBAZAR — Role-Based Access Control & Permissions Matrix

## 1. Overview
BricksBazar enforces strict, multi-tiered Role-Based Access Control (RBAC). Access to protected views, APIs, and mutations is validated on the server side using cryptographically signed JWT tokens or session cookies. Client-side state is never trusted as an authority for authorization.

---

## 2. Defined Platform Roles

| Role Key | Display Name | Target User |
|---|---|---|
| `buyer` | Property Buyer | Individuals searching to purchase residential or commercial properties. |
| `tenant` | Tenant / Renter | Individuals or corporations searching for rental properties. |
| `owner` | Property Owner | Direct owners listing their residential, commercial, or plot assets. |
| `agent` | Real Estate Agent | Licensed real estate agents managing client inventory and leads. |
| `broker` | RERA Broker | MahaRERA-accredited corporate brokers participating in co-broking. |
| `developer` | Builder / Developer | Real estate developers launching upcoming and ongoing projects. |
| `supplier` | Material Supplier | Construction material manufacturers, stockists, and wholesale dealers. |
| `admin` | Administrator | Platform moderators reviewing listings, verifying KYC, and resolving disputes. |
| `super_admin` | Super Administrator | Executive administrators configuring global policies, roles, and audit access. |

---

## 3. Comprehensive Role-Permission Matrix

| Resource / Action | Buyer | Tenant | Owner | Agent | Broker | Developer | Supplier | Admin | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Browse Public Listings** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Submit Property Enquiry** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Request Site Visit** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Request Material Quotation** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Save Favourites / Compare** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Post Property Listing** | ✗ | ✗ | Own | Own | Own | Own | ✗ | All | All |
| **Edit Property Listing** | ✗ | ✗ | Own | Own | Own | Own | ✗ | All | All |
| **Direct Publish (No Moderation)**| ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Approve / Reject Listing** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Create Project** | ✗ | ✗ | ✗ | ✗ | ✗ | Own | ✗ | All | All |
| **Manage Project Configurations** | ✗ | ✗ | ✗ | ✗ | ✗ | Own | ✗ | All | All |
| **Access Lead Inbox** | ✗ | ✗ | Own | Own | Own | Own | Own | All | All |
| **Participate in Co-Broking** | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | Read | All |
| **Add Marketplace Products** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Own | All | All |
| **Issue Material Quotations** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Own | All | All |
| **Access Admin Panel (`/admin`)** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Verify KYC / RERA Licenses** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |
| **Manage Global Roles & Settings**| ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| **Inspect System Audit Logs** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Read | Full |

---

## 4. Protected Route Map & Access Rules

### Public Routes (No Auth Required)
- `/`, `/buy`, `/rent`, `/commercial`, `/plots`, `/properties`, `/property/[slug]`
- `/new-projects`, `/projects/[slug]`
- `/agents`, `/agents/[slug]`, `/brokers`, `/brokers/[slug]`
- `/developers`, `/developers/[slug]`
- `/marketplace`, `/marketplace/category/[slug]`, `/marketplace/product/[slug]`
- `/suppliers`, `/suppliers/[slug]`
- `/insights`, `/insights/[slug]`, `/about`, `/contact`, `/privacy-policy`, `/terms-and-conditions`
- `/login`, `/register`, `/forgot-password`, `/verify-otp`

### Role-Specific Dashboard Routes (Auth Required)
- `/dashboard/buyer` — Restricted to `buyer` role.
- `/dashboard/owner` — Restricted to `owner` role.
- `/dashboard/agent` — Restricted to `agent` and `broker` roles.
- `/dashboard/developer` — Restricted to `developer` role.
- `/dashboard/supplier` — Restricted to `supplier` role.
- `/dashboard/leads` & `/dashboard/lead-exchange` — Restricted to `owner`, `agent`, `broker`, `developer`, `supplier`.
- `/dashboard/properties/create` & `/post-property` — Restricted to verified owners, agents, and brokers.

### Administrative Routes (Admin Auth Required)
- `/admin` — Overview metrics.
- `/admin/properties` — Moderation queue for submitted properties.
- `/admin/agents` — KYC and MahaRERA verification queue for agents and brokers.
- `/admin/marketplace` — Product approval and supplier verification.
- `/admin/audit-logs` — Immutable audit records of all administrative actions.
- `/admin/settings` — Platform configuration, moderation parameters, and super admin controls.

