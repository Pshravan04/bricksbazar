# BRICKSBAZAR — API Specification

## 1. Authentication Endpoints (`/api/auth`)
- `POST /api/auth/register`: Create new user with selected role
- `POST /api/auth/login`: Authenticate user and issue secure HTTP-only cookie
- `POST /api/auth/logout`: Clear session
- `POST /api/auth/verify-otp`: Validate phone OTP
- `GET /api/auth/me`: Get current authenticated user profile

## 2. Properties Endpoints (`/api/properties`)
- `GET /api/properties`: List properties with filter query params (`city`, `listingType`, `category`, `bhk`, `minPrice`, `maxPrice`, `furnishing`, `possession`, `sort`, `page`)
- `GET /api/properties/:slug`: Get single property with configuration variants
- `POST /api/properties`: Create property (Authenticated Owner / Agent / Admin)
- `PUT /api/properties/:id`: Update property
- `DELETE /api/properties/:id`: Delete or archive property

## 3. Projects Endpoints (`/api/projects`)
- `GET /api/projects`: List projects with status and developer filters
- `GET /api/projects/:slug`: Get project details with floor plans and amenities

## 4. Professionals Endpoints (`/api/agents`, `/api/developers`)
- `GET /api/agents`: Directory of verified agents and brokers
- `GET /api/agents/:slug`: Full profile with active listings
- `GET /api/developers`: Directory of builders and developers
- `GET /api/developers/:slug`: Developer portfolio and company stats

## 5. Marketplace Endpoints (`/api/marketplace`)
- `GET /api/marketplace/products`: List construction materials
- `GET /api/marketplace/products/:slug`: Product specs and supplier info
- `GET /api/suppliers`: List verified building material suppliers

## 6. Leads & Inquiries (`/api/leads`, `/api/enquiries`)
- `POST /api/enquiries`: Submit property enquiry or site visit request
- `POST /api/marketplace/quotations`: Request wholesale price quotation
- `GET /api/leads`: Retrieve assigned leads for current agent/owner
- `PUT /api/leads/:id/status`: Update lead stage and notes
- `POST /api/leads/exchange`: Post co-broking requirement

