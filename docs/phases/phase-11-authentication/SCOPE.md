# Phase 11: Authentication — Scope

## Objective
Implement role-based user onboarding, registration, login, mobile OTP verification, and password recovery interfaces across all 8 platform personas: Buyer, Tenant, Property Owner, Real Estate Agent, Property Broker, Builder/Developer, Material Supplier, and Administrator.

## Deliverables
1. Login Experience (`/login`):
   - Email/Mobile + Password validation.
   - Password visibility toggle.
   - Instant Demo Evaluation Pills allowing 1-click test sign-in into any role dashboard.
2. Multi-Role Registration Portal (`/register`):
   - 6 visual role selection cards.
   - Zod-validated input schema (Full Name, 10-digit Indian Mobile phone, Email, Password, Terms agreement).
3. Mobile OTP Verification Screen (`/verify-otp`):
   - 6-digit individual input boxes with auto-focus advance.
   - 45-second countdown timer with resend trigger.
   - Role-aware redirect to appropriate dashboard.
4. Password Recovery Screen (`/forgot-password`):
   - Recovery request with demo mode disclosure.
