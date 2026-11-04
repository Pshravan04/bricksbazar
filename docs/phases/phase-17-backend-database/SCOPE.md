# Phase 17: Backend & Database Architecture — Scope

## Objective
Establish a production-grade, modular Node.js + Express + MongoDB backend with Mongoose Object Data Modeling (ODM). Provide high-concurrency API route modules, database schemas with geospatial indexing, role-based JWT authentication, rate limiting, and centralized error handling.

## Components Delivered
1. **Server Configuration & Database Connection**:
   - `server/src/config/index.ts`: Config loader with environment validation and mock fallback flags.
   - `server/src/database/connection.ts`: Mongoose connection manager with reconnection resilience.

2. **Mongoose Domain Models (`server/src/database/models/`)**:
   - `User.ts`: Identity model with bcrypt salted hashing, 8 role enums, and verification statuses.
   - `Property.ts`: Comprehensive property schema with 2dsphere geospatial indexing, RERA carpet area checks, and multi-factor compound indices (`location.city` + `listingType` + `propertyCategory` + `price`).
   - `Project.ts`: Master builder project model with tower counts, unit inventory, and RERA tracking.
   - `Agent.ts`: Professional consultant profile with agency affiliations, RERA licenses, and rating metrics.
   - `Developer.ts`: Builder track record with completed/ongoing project counts.
   - `Product.ts`: Construction materials catalog with specifications map and supplier references.
   - `Supplier.ts`: Materials dealer business profile.
   - `Lead.ts`: Lead lifecycle tracking with status transitions, inquiry sources, and activity notes.
   - `CoBrokingRequirement.ts`: Structured broker-to-broker co-broking requirements.
   - `AuditLog.ts`: Immutable security audit log tracking administrative interventions and IP addresses.

3. **Middleware Suite (`server/src/middleware/`)**:
   - `auth.ts`: JWT bearer token verification with `requireRole(...)` authorization guards.
   - `errorHandler.ts`: Centralized Express error handler formatting operational and validation errors.
   - `rateLimiter.ts`: In-memory sliding-window rate limiter protecting against brute-force attacks.

4. **Modular Route Controllers (`server/src/modules/`)**:
   - `/api/auth`: User registration, bcrypt authentication, and profile discovery.
   - `/api/properties`: Geospatial property querying, multi-filter search, pagination, and authenticated posting.
   - `/api/projects`: Project discovery and detail retrieval.
   - `/api/agents`: Directory and verification queries.
   - `/api/marketplace`: Building materials catalog and supplier listings.
   - `/api/leads`: Public inquiry ingestion, consultant CRM updates, and co-broking requirement feed.
   - `/api/admin`: Moderation endpoints, platform KPIs, and security audit ledger queries.
   - `/api/health`: Microservice telemetry and health diagnostic endpoint.
