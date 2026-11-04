# Phase 17: Backend & Database Architecture — QA & Verification

## Automated Verification
- **Compilation**: Full TypeScript compilation verified via `pnpm run build` without any syntax, type, or Mongoose schema errors.
- **Dependencies Installed & Locked**:
  - `express` v5.3.0
  - `mongoose` v9.11.4
  - `bcryptjs` v3.0.3
  - `jsonwebtoken` v9.0.3
  - `cors` v2.8.6
  - `dotenv` v18.0.9

## Manual Test Scenarios
1. **Schema Validation**:
   - Verify required fields in `Property` schema (title, slug, price, carpetArea, location).
   - Verify unique indexes on `User` email and phone.
2. **Password Hashing Lifecycle**:
   - Verify pre-save hook properly hashes plain text passwords using bcrypt with salt rounds 10.
   - Verify `comparePassword` correctly validates matched and mismatched strings.
3. **Geospatial & Compound Index Definitions**:
   - Confirm `2dsphere` index configured on `location.coordinates`.
   - Confirm compound index on `location.city` + `listingType` + `propertyCategory` + `price`.
4. **Middleware Security Guardrails**:
   - Verify `authenticate` blocks requests missing `Authorization: Bearer <token>` with HTTP 401.
   - Verify `requireRole('admin')` blocks non-admin authenticated users with HTTP 403 Forbidden.
   - Verify `createRateLimiter` enforces window requests threshold.
