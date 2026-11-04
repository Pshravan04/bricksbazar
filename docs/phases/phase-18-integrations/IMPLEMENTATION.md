# Phase 18: Integrations Architecture — Implementation Details

## Service Design Pattern
All external communication services adopt an abstracted adapter pattern. When production credentials (`AWS_ACCESS_KEY`, `MAPBOX_TOKEN`, `RAZORPAY_KEY_ID`, `SMS_API_KEY`) are present in `.env`, the service communicates directly with vendor APIs. If credentials are omitted, services automatically enter a safe simulation sandbox, returning structured mock responses and logging events for testing.

## Service Catalog
- `CloudStorageService` (`src/services/storage.ts`):
  - Pre-signed URL generation, buffer uploading, and CDN asset management.
- `MapsService` (`src/services/maps.ts`):
  - Forward/Reverse geocoding with Indian metro fallbacks and Great-Circle Haversine distance calculations.
- `SmsService` (`src/services/sms.ts`):
  - 6-digit OTP delivery and urgent lead SMS dispatches.
- `EmailService` (`src/services/email.ts`):
  - Responsive HTML email templating styled with `#C6383B`.
- `PaymentGatewayService` (`src/services/payment.ts`):
  - Razorpay order creation with Indian Rupee paise conversion and HMAC SHA256 signature verification.
- `WhatsAppService` (`src/services/whatsapp.ts`):
  - Direct WhatsApp click-to-chat URL formatting and template dispatch.
