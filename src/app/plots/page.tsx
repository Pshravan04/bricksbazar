import { PropertyDiscovery } from '@/features/properties/PropertyDiscovery';

export const metadata = {
  title: 'Residential & Villa Plots for Sale | BricksBazar',
  description:
    'Gated community villa NA plots and land parcels in PMRDA Pune, Navi Mumbai, and surrounding growth corridors.',
};

export default function PlotsPage() {
  return (
    <PropertyDiscovery
      initialListingType="plot"
      pageTitle="Residential & Villa Plots"
      pageDescription="Collector NA clear title plots inside gated townships with immediate registry and demarcations."
    />
  );
}

