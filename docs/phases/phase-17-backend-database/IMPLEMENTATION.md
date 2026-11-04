# Phase 17: Backend & Database Architecture — Implementation Details

## Architecture Overview
The backend is structured as a modular Express monolith located in `server/src/`, designed for high-concurrency real estate querying, geospatial indexing, and strict role-based access control.

## Database Models & Indices (`server/src/database/models/`)
1. **Property Model (`Property.ts`)**:
   - `location.coordinates`: 2dsphere index enabling geospatial radial radius searches (e.g. properties within 5 km of Bandra).
   - Compound index: `{ 'location.city': 1, listingType: 1, propertyCategory: 1, price: 1 }`.
   - Full-text index: `{ title: 'text', description: 'text', 'location.locality': 'text' }`.
   - Status lifecycle: `PENDING` -> `APPROVED` | `REJECTED` | `NEEDS_REVISION`.
2. **User Model (`User.ts`)**:
   - Automated password hashing using `bcryptjs` (salt rounds: 10) in Mongoose async pre-save hook.
   - Instance method: `comparePassword(candidatePassword: string): Promise<boolean>`.
3. **Domain Models**:
   - `Project.ts`, `Agent.ts`, `Developer.ts`, `Product.ts`, `Supplier.ts`, `Lead.ts`, `CoBrokingRequirement.ts`, `AuditLog.ts`.

## Middleware Suite (`server/src/middleware/`)
- `auth.ts`: Decodes JWT tokens passed via `Authorization: Bearer <token>`, attaching payload to `req.user`.
- `requireRole(...roles)`: Enforces role-based permissions (`admin`, `agent`, `broker`, `owner`, `supplier`, etc.).
- `rateLimiter.ts`: In-memory IP rate limiter returning HTTP 429 when thresholds are exceeded.
- `errorHandler.ts`: Standardized JSON error response handler.

## API Endpoints Implemented
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/properties`, `GET /api/properties/:slug`, `POST /api/properties`
- `GET /api/projects`, `GET /api/projects/:slug`
- `GET /api/agents`, `GET /api/agents/:slug`, `GET /api/agents/developers/all`
- `GET /api/marketplace/products`, `GET /api/marketplace/products/:slug`, `GET /api/marketplace/suppliers`
- `POST /api/leads/enquiry`, `GET /api/leads`, `PATCH /api/leads/:id/status`, `GET /api/leads/co-broking`, `POST /api/leads/co-broking`
- `GET /api/admin/overview`, `PATCH /api/admin/properties/:id/moderate`, `GET /api/admin/audit-logs`
- `GET /api/health`
