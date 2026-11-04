import { PropertyDiscovery } from '@/features/properties/PropertyDiscovery';

export const metadata = {
  title: 'Rental Homes & Flats in India | BricksBazar',
  description:
    'Find furnished, semi-furnished and bachelor-friendly flats for rent across Mumbai, Pune, Thane, and Bengaluru.',
};

export default function RentPage() {
  return (
    <PropertyDiscovery
      initialListingType="rent"
      pageTitle="Properties for Rent"
      pageDescription="Discover furnished and family apartments available for immediate rent with zero hidden charges."
    />
  );
}

