# Phase 18: Integrations Architecture — Scope

## Objective
Implement modular, vendor-agnostic integration service interfaces for external third-party systems required by an enterprise real estate portal and construction marketplace in India. Ensure real production credentials can be configured seamlessly via environment variables without modifying core application code.

## Integrated Services
1. **S3-Compatible Cloud Storage (`src/services/storage.ts`)**:
   - DigitalOcean Spaces / AWS S3 / Cloudflare R2 adapter.
   - File uploads, CDN URL resolution, pre-signed direct upload URLs, and asset deletion.
   - Fallback simulation when API keys are omitted.

2. **Geolocation & Mapping (`src/services/maps.ts`)**:
   - Mapbox & Google Maps geocoding adapter.
   - Indian metropolitan fallback coordinates with deterministic locality offsets.
   - Great-Circle Haversine distance calculator in kilometers.
   - Static map image URL generator.

3. **Indian Mobile SMS & OTP Gateway (`src/services/sms.ts`)**:
   - Fast2SMS / MSG91 / Twilio adapter.
   - 6-digit authentication OTP dispatch and high-priority lead alert SMS to consultants.

4. **Transactional Email (`src/services/email.ts`)**:
   - SendGrid / Resend / AWS SES adapter.
   - Branded responsive HTML templates for welcome onboarding, lead alerts, and site visit confirmations.

5. **Indian Payment Gateway (`src/services/payment.ts`)**:
   - Razorpay / Cashfree / Stripe adapter.
   - INR order creation with paise conversion, signature verification, and sandbox simulation.

6. **WhatsApp Business API (`src/services/whatsapp.ts`)**:
   - Meta Cloud API / Gupshup / Interakt adapter.
   - Click-to-chat URL formatter with telephone number sanitization.
