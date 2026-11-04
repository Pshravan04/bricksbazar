# BRICKSBAZAR — Database Architecture (MongoDB & Mongoose)

## 1. Core Schemas & Entities
- **User**: Authentication, role (`buyer`, `tenant`, `owner`, `agent`, `broker`, `developer`, `dealer`, `supplier`, `admin`), email, phone, status, verification flag, password hash.
- **UserProfile**: Personal details, avatar, company/agency name, RERA registration, languages, bio, KYC docs.
- **Property**:
  - Title, slug, listingType (`buy`, `rent`, `commercial`, `plot`), propertyCategory, location (city, locality, pincode, geo coords).
  - Price, pricePerSqFt, carpetArea, superBuiltUpArea, bhk, furnishing, possessionStatus, possessionDate.
  - Configurations array, amenities array, highlights, description, reraId, images array.
  - PostedBy, ownerOrAgent ref, isVerified, isFeatured, isDemoRecord, timestamps.
- **Project**:
  - Name, slug, developer ref, location, startingPrice, maxPrice, configurations, projectStatus, possessionDate, reraId, images, amenities, specifications.
- **Developer**:
  - Name, slug, logo, foundedYear, headquarters, experienceYears, totalProjects, ongoingProjects, operatingCities, description, rating.
- **Agent**:
  - Name, slug, role (`agent`, `broker`), agencyName, avatar, rating, experienceYears, location, specializations, reraNumber, phone, email.
- **MarketplaceProduct**:
  - Name, slug, category, categorySlug, brand, images, price, priceUnit, isPriceOnQuotation, minOrderQuantity, specifications, supplier ref, inStock.
- **Supplier**:
  - Business name, slug, logo, location, phone, email, isVerified, productCount, ratings.
- **Lead / Enquiry**:
  - LeadType (`Property Enquiry`, `Rental Enquiry`, `Site Visit`, `Quotation`, `Buyer Requirement`), customer details, property/item ref, budget, location, status (`New`, `Contacted`, `Qualified`, `Site Visit Scheduled`, `Negotiation`, `Converted`, `Closed`, `Rejected`), assignedTo ref, notes, followUpDate.
- **LeadExchange**:
  - Requirement post, postingAgent ref, interestedAgents array, status, privacy permissions.
- **Review**:
  - Target ref (`agent`, `developer`, `supplier`, `property`), author ref, rating (1-5), comment, isVerified.
- **SavedItem / Comparison**:
  - User ref, property ref, created timestamp.

## 2. Indexing Strategy
- Compound index on `location.city` + `listingType` + `propertyCategory`.
- Index on `price`, `carpetArea`, `bhk`.
- Text indexes on `title`, `description`, `location.locality`, `location.city`.
- Unique indexes on `slug`, `email`, `phone`, `reraId`.

