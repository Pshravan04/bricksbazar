import { PropertyDiscovery } from '@/features/properties/PropertyDiscovery';

export const metadata = {
  title: 'Commercial Office Spaces, Shops & Warehouses | BricksBazar',
  description:
    'Grade-A corporate IT offices, retail shops, and warehouses across BKC Mumbai, Hinjawadi Pune, and Whitefield Bengaluru.',
};

export default function CommercialPage() {
  return (
    <PropertyDiscovery
      initialListingType="commercial"
      pageTitle="Commercial Real Estate"
      pageDescription="Grade-A corporate offices, retail retail shops, and high-yield commercial investments."
    />
  );
}

