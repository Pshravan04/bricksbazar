# Phase 20: Testing & Quality Assurance — Scope

## Objective
Establish an automated and reproducible test suite verifying core computational helpers, Indian regulatory validation rules, multi-factor filtering logic, and external integration service adapters using Node.js's native high-performance test runner (`node:test`).

## Test Suites Delivered
1. **Formatters & Calculations (`tests/unit/formatters.test.ts`)**:
   - `formatINR`: Accurate formatting across Crores (`Cr`), Lakhs (`L`), and standard thousands with Rupee symbol `₹`.
   - `formatArea`: Square feet notation with comma grouping and zero-value fallback.
   - `calculatePricePerSqFt`: Division by carpet area with safeguard against divide-by-zero.
   - `slugify`: Conversion of property and project titles into URL-safe slugs.

2. **Regulatory & Input Validation (`tests/unit/validation.test.ts`)**:
   - Indian 10-digit mobile phone validation starting with 6, 7, 8, 9.
   - Indian 6-digit PIN codes excluding initial zeroes.
   - Email regex compliance.
   - MahaRERA Agent (`A...`) and Project (`P...`) registration certificate patterns.

3. **Property Filtering & Sorting Logic (`tests/unit/filters.test.ts`)**:
   - Exact and case-insensitive city matching.
   - Listing purpose segregation (`buy` vs. `rent`).
   - Boundary testing on minimum and maximum price thresholds.
   - Multi-select BHK configuration matching.
   - Ascending, descending, and area sorting algorithms.

4. **Integration Service Abstractions (`tests/integration/services.test.ts`)**:
   - `mapsService`: Geocode coordinate resolution and Haversine distance calculations.
   - `smsService`: OTP dispatch and message ID generation in simulation mode.
   - `paymentService`: Order creation with INR rupee-to-paise conversion.
   - `storageService`: S3 object key generation and CDN URL resolution.
   - `emailService`: Transactional HTML email template generation.
