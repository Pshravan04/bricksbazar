/**
 * BricksBazar System Constants
 */

export const BRAND = {
  name: 'BricksBazar Realty LLP',
  tagline: 'Realty in Detail',
  rera: 'A51800029418',
  description:
    'BricksBazar Realty LLP is a trusted Mumbai real estate consultancy bringing over a decade of expertise with our signature "Realty in Detail" commitment across residential, commercial, and investment advisory.',
  colors: {
    primaryRed: '#C6383B',
    primaryRedHover: '#AB2F32',
    white: '#FFFFFF',
    lightBg: '#F8F8F8',
    softRed: '#FCEEEF',
    mainText: '#252525',
    secondaryText: '#777777',
    border: '#EAEAEA',
    success: '#21865B',
    warning: '#D68A2E',
    error: '#C6383B',
  },
  contact: {
    phone: '+91 98206 15020',
    phoneSecondary: '+91 98206 15070',
    email: 'info@bricksbazar.in',
    address: 'A-909, 9th Floor, Crystal 86-Central, off Shreyas Signal, Andheri-Ghatkopar Link Road, Ghatkopar West, Mumbai - 400086',
  },
  logo: '/brand/logo.png',
};

export const CITIES = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', count: '14,200+' },
  { id: 'mumbai-sobo', name: 'South Mumbai (SoBo)', state: 'Maharashtra', count: '2,800+' },
  { id: 'mumbai-western', name: 'Western Suburbs', state: 'Maharashtra', count: '6,400+' },
  { id: 'mumbai-central', name: 'Central Suburbs', state: 'Maharashtra', count: '5,000+' },
  { id: 'thane', name: 'Thane MMR', state: 'Maharashtra', count: '5,120+' },
  { id: 'navi-mumbai', name: 'Navi Mumbai', state: 'Maharashtra', count: '4,890+' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', count: '8,450+' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', count: '12,800+' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', count: '9,750+' },
  { id: 'delhi-ncr', name: 'Delhi NCR', state: 'Delhi & NCR', count: '16,500+' },
  { id: 'goa', name: 'Goa', state: 'Goa', count: '1,400+' },
];

export const PROPERTY_CATEGORIES = [
  'Apartment',
  'Villa',
  'Independent House',
  'Plot / Land',
  'Penthouse',
  'Commercial Office',
  'Commercial Shop',
  'Warehouse',
] as const;

export const BHK_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'] as const;

export const FURNISHING_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'] as const;

export const POSSESSION_OPTIONS = ['Ready to Move', 'Under Construction', 'New Launch'] as const;

export const POSTED_BY_OPTIONS = ['Owner', 'Agent', 'Builder'] as const;

export const MARKETPLACE_CATEGORIES = [
  { id: 'cement', name: 'Cement & Concrete', icon: 'Box', slug: 'cement' },
  { id: 'steel', name: 'Steel & TMT Bars', icon: 'Shield', slug: 'steel-tmt-bars' },
  { id: 'tiles', name: 'Tiles & Flooring', icon: 'Grid', slug: 'tiles-flooring' },
  { id: 'paints', name: 'Paints & Wall Finishes', icon: 'Paintbrush', slug: 'paints' },
  { id: 'plumbing', name: 'Plumbing & Pipes', icon: 'Wrench', slug: 'plumbing' },
  { id: 'electrical', name: 'Electrical Materials', icon: 'Zap', slug: 'electrical-materials' },
  { id: 'hardware', name: 'Hardware & Fittings', icon: 'Tool', slug: 'hardware' },
  { id: 'doors-windows', name: 'Doors & Windows', icon: 'DoorOpen', slug: 'doors-windows' },
  { id: 'roofing', name: 'Roofing Solutions', icon: 'Home', slug: 'roofing' },
  { id: 'tools', name: 'Construction Tools', icon: 'Hammer', slug: 'construction-tools' },
];

export const NAV_LINKS = [
  {
    label: 'Properties',
    href: '/buy',
    dropdown: [
      { label: 'Buy Residential', href: '/buy', description: 'Apartments, villas, and penthouses' },
      { label: 'Rent Homes', href: '/rent', description: 'Flats, furnished homes, and villas' },
      { label: 'Commercial Spaces', href: '/commercial', description: 'Offices, retail shops, and hubs' },
      { label: 'Plots & Land', href: '/plots', description: 'Residential and investment plots' },
      { label: 'Luxury Portfolios', href: '/buy?category=Villa', description: 'High-end coastal and golf villas' },
    ],
  },
  {
    label: 'New Projects',
    href: '/new-projects',
    dropdown: [
      { label: 'All Project Launches', href: '/new-projects', description: 'Curated RERA developments' },
      { label: 'New Launches', href: '/new-projects?status=New+Launch', description: 'Fresh project announcements' },
      { label: 'Under Construction', href: '/new-projects?status=Under+Construction', description: 'Mid-stage construction units' },
      { label: 'Ready to Move In', href: '/new-projects?status=Ready+to+Move', description: 'Immediate possession residences' },
      { label: 'Top Developers', href: '/developers', description: 'Tier-1 developer directories' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'All Services', href: '/services', description: 'Comprehensive real estate solutions' },
      { label: 'Residential Advisory', href: '/services#residential', description: 'New launches, under-construction & ready flats' },
      { label: 'Commercial Spaces', href: '/services#commercial', description: 'Offices, retail shops & industrial units' },
      { label: 'Investment Opportunities', href: '/services#investment', description: 'Pre-leased, high ROI projects & land' },
      { label: 'NRI Consultation', href: '/services#nri', description: 'Tailored property advisory for overseas buyers' },
      { label: 'Legal & Home Loans', href: '/services#advisory', description: 'MahaRERA title search & bank assistance' },
    ],
  },
  {
    label: 'Professionals',
    href: '/agents',
    dropdown: [
      { label: 'RERA Licensed Agents', href: '/agents', description: 'Verified residential consultants' },
      { label: 'Property Brokers', href: '/brokers', description: 'Local commercial & rental specialists' },
      { label: 'Co-Broking Exchange', href: '/dashboard/lead-exchange', description: '50:50 broker requirement network' },
      { label: 'Builders & Developers', href: '/developers', description: 'Reputable construction groups' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    dropdown: [
      { label: 'All Guides & Analysis', href: '/insights', description: 'Market research and legal intel' },
      { label: 'Homebuyer Checklist', href: '/insights/first-time-homebuyer-checklist-india', description: 'First-time diligence playbook' },
      { label: 'FSI & Carpet Area Rules', href: '/insights/understanding-fsi-and-carpet-area-rules', description: 'RERA legal compliance definitions' },
      { label: 'Construction Cost Guide', href: '/insights/construction-cost-estimation-residential-villas', description: 'Per sq.ft budget frameworks' },
    ],
  },
];

