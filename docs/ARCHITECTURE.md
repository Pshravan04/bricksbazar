# BRICKSBAZAR — System Architecture

## 1. Architectural Philosophy
BricksBazar is architected as an **integrated, enterprise-grade real estate discovery portal and construction material marketplace** tailored specifically to the Indian regulatory (MahaRERA/State RERA) and commercial ecosystem. 

The application utilizes a **Modular Monolith** pattern:
- **Loose Coupling**: Distinct domain modules (`properties`, `projects`, `agents`, `developers`, `marketplace`, `leads`, `admin`).
- **High Cohesion**: Each module encapsulates its controllers, domain models, validations (Zod schemas), and route handlers.
- **Service Adapter Pattern**: All data retrieval and transaction workflows interact through standardized service interfaces, enabling zero-code-change transitions between simulated mock datasets, in-memory seed stores, and persistent MongoDB/Express backends.

---

## 2. High-Level System Architecture Diagram

```
[ Web & Mobile Clients (Desktop / Tablet / Mobile 390px) ]
                         │
                         ▼ HTTPS / WSS
              [ Nginx Reverse Proxy (SSL / Gzip) ]
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
[ Next.js 14 App Router ]        [ Express REST API ]
  - Server Components (SSR/SSG)    - Rate Limiter & Helmet
  - Client Interactivity (React)   - Auth & RBAC Middleware
  - Zod Validation / Hook Form     - Module Controllers
  - Tailwind / Helvetica Neue      - Service Abstractions
        │                                 │
        └────────────────┬────────────────┘
                         ▼
        [ MongoDB Database Cluster (Mongoose ODM) ]
          - Compound Indexes & Geospatial
          - Role Scopes & Audit Logs
          - Soft Deletion & Timestamps
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
[ Storage Service ] [ SMS / OTP ]  [ Email / Maps ]
  - S3 / DO Spaces    - Fast2SMS     - SendGrid / Gmaps
```

---

## 3. Frontend Architecture (Next.js 14 App Router)
- **Framework**: Next.js 14.2.x with React 18 & TypeScript 5.8.
- **Styling & Tokens**: Tailwind CSS 3.4 with custom typography (`Helvetica Neue` for display/headings, `Outfit` for body/paragraphs) and brand colors (`#C6383B` Primary Red, `#FFFFFF` Dominant White, `#F8F8F8` Surface, `#161616` Charcoal).
- **Responsive Fluid Canvas**: Max width standard of `1840px` for modern ultra-wide monitors, transitioning seamlessly down to 390px mobile viewports with zero horizontal overflow.
- **State & Form Management**: React Hook Form with Zod resolvers for strict client-side validation; React Query for asynchronous data caching; URL-driven search and filter state for shareable, bookmarkable search results.

---

## 4. Backend & Database Architecture
- **Server Engine**: Node.js v24 LTS + Express 5 with TypeScript.
- **Database**: MongoDB with Mongoose ODM models.
- **Data Safety**:
  - Validated Mongoose schemas for all 30 core entities.
  - Compound indexes on frequent search vectors (`location.city + listingType + price`).
  - Strict audit logging for all moderation and administrative actions.
- **Security & Authorization**:
  - JWT token verification with secure HTTP-only cookies.
  - Role-Based Access Control (RBAC) across 8 distinct user roles.
  - Mandatory server-side ownership checks on all update and delete mutations.

---

## 5. Integration Services Abstraction Layer
BricksBazar defines uniform interface abstractions located in `src/services/` and `server/src/services/`:
1. **Maps Service** (`mapsService`): Forward and reverse geocoding, proximity calculation using Haversine formula, and coordinate bounds.
2. **SMS Service** (`smsService`): OTP dispatch, phone verification, and simulation fallback for local development.
3. **Storage Service** (`storageService`): Multi-part file uploads, S3/DO Spaces key generation, and CDN URL resolution.
4. **Email Service** (`emailService`): Transactional templates for lead notifications, welcome emails, and moderation alerts.
5. **Payment Service** (`paymentService`): Quotation-first commerce with gateway-ready order generation in Indian Rupee (paise conversion).

