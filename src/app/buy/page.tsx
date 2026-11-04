import { PropertyDiscovery } from '@/features/properties/PropertyDiscovery';

export const metadata = {
  title: 'Buy Properties in India — Flats, Villas & Houses | BricksBazar',
  description:
    'Search verified residential properties for sale across Mumbai, Pune, Thane, Bengaluru, Hyderabad, and Delhi NCR with verified RERA certificates.',
};

export default function BuyPage() {
  return (
    <PropertyDiscovery
      initialListingType="buy"
      pageTitle="Properties for Sale"
      pageDescription="Explore verified flats, luxury penthouses, and gated villas ready for purchase with clear legal titles."
    />
  );
}

