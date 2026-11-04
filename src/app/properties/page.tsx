import { PropertyDiscovery } from '@/features/properties/PropertyDiscovery';

export const metadata = {
  title: 'All Real Estate Properties in India | BricksBazar',
  description:
    'Comprehensive real estate directory of verified flats, luxury villas, commercial offices, and plots.',
};

export default function PropertiesIndexPage() {
  return (
    <PropertyDiscovery
      pageTitle="Discover All Verified Properties"
      pageDescription="Search through verified listings with direct owner and licensed agent contacts."
    />
  );
}

