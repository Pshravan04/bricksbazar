# BRICKSBAZAR — Route Map

## 1. Public Discovery Routes
- `/`: Homepage (Search hero, property categories, top cities, featured listings, new projects, verified agents, materials marketplace)
- `/buy`: Residential & commercial purchase discovery with filter engine
- `/rent`: Rental properties with furnishing and possession filters
- `/commercial`: Commercial office spaces, shops, and warehouses
- `/plots`: Residential and commercial plots with land sanction details
- `/property/[slug]`: Comprehensive property detail page with interactive configuration selector, image gallery, and enquiry card
- `/new-projects`: New launches and under-construction developments
- `/projects/[slug]`: New project details with floor plans, master layout, and developer history
- `/agents`: Real estate agents & consultants directory
- `/agents/[slug]`: Agent profile with active listings and verified reviews
- `/brokers`: Property brokers directory
- `/brokers/[slug]`: Broker profile
- `/developers`: Builder & developer directory
- `/developers/[slug]`: Developer profile with completed and ongoing projects

## 2. Construction Materials Marketplace
- `/marketplace`: Construction materials homepage
- `/marketplace/category/[slug]`: Category-specific products (Cement, Steel, Tiles, Paints, etc.)
- `/marketplace/product/[slug]`: Material detail page with technical specs & quotation request
- `/suppliers`: Verified material suppliers & dealers directory
- `/suppliers/[slug]`: Supplier business profile with catalog

## 3. Authentication & Account
- `/login`: Role-aware login portal
- `/register`: User onboarding with role selection (Buyer, Owner, Agent, Developer, Supplier)
- `/forgot-password`: Password recovery interface
- `/verify-otp`: Mobile OTP verification

## 4. Role-Based Dashboards
- `/dashboard`: Unified dashboard router based on user role
- `/dashboard/buyer`: Saved properties, compared listings, inquiries, and site visits
- `/dashboard/owner`: My properties, add listing, inquiries received
- `/dashboard/agent`: Lead inbox, lead exchange, client pipeline, listing manager
- `/dashboard/developer`: Project portfolio, lead analytics, configuration editor
- `/dashboard/supplier`: Product catalog, quotation requests, inventory
- `/dashboard/properties/create`: 14-step property submission wizard
- `/post-property`: Direct public shortcut to the 14-step property submission wizard
- `/dashboard/leads`: Dedicated agent CRM pipeline tracker and notes log
- `/dashboard/lead-exchange`: Co-Broking & Agent Requirement Board with 50:50 commission splits

## 5. Platform Administration
- `/admin`: Master administrative panel with KPIs, pending queues, and system telemetry
- `/admin/properties`: Property verification & moderation queue with inspection modal
- `/admin/agents`: Agent & broker RERA verification queue with verified badge toggles
- `/admin/marketplace`: Construction product catalog moderation
- `/admin/audit-logs`: Immutable security ledger and audit trails
- `/admin/settings`: Regulatory compliance thresholds and platform configuration

## 6. Insights & Legal
- `/insights`: Real estate market guides, trends, and home loan articles
- `/insights/[slug]`: In-depth editorial article with sticky Table of Contents & social sharing
- `/about`: Company overview, 4 pillars, and pan-India network statistics
- `/contact`: Official contact details, support form, and office addresses in Mumbai, Pune, and Bengaluru
- `/privacy-policy`: Privacy policy compliant with DPDP Act 2023 & IT Act 2000
- `/terms-and-conditions`: Platform terms with RERA mandates & Section 79 intermediary protections
- `/faq`: Frequently asked questions across buyers, owners, agents, and materials

## 7. Search Engine & Metadata Directives
- `/robots.txt`: Search crawler directives and private area exclusions
- `/sitemap.xml`: Multi-entity dynamic XML sitemap

