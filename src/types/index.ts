/**
 * BricksBazar Core Domain Types
 */

export type UserRole =
  | 'buyer'
  | 'tenant'
  | 'owner'
  | 'agent'
  | 'broker'
  | 'developer'
  | 'dealer'
  | 'supplier'
  | 'admin';

export type ListingType = 'buy' | 'rent' | 'commercial' | 'plot';

export type PropertyCategory =
  | 'Apartment'
  | 'Villa'
  | 'Independent House'
  | 'Plot / Land'
  | 'Penthouse'
  | 'Commercial Office'
  | 'Commercial Shop'
  | 'Warehouse';

export type BHKType = '1 RK' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '5+ BHK' | 'Studio' | 'Plot';

export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';

export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch';

export type PostedBy = 'Owner' | 'Agent' | 'Builder';

export interface LocationInfo {
  city: string;
  locality: string;
  subLocality?: string;
  address: string;
  landmark?: string;
  pincode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PropertyConfiguration {
  id: string;
  bhk: BHKType;
  carpetArea: number; // sq.ft
  superBuiltUpArea: number; // sq.ft
  bathrooms: number;
  balconies: number;
  price: number;
  floorPlanUrl?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  listingType: ListingType;
  propertyCategory: PropertyCategory;
  location: LocationInfo;
  price: number;
  pricePerSqFt: number;
  isNegotiable?: boolean;
  bhk: BHKType;
  carpetArea: number;
  superBuiltUpArea: number;
  configurations?: PropertyConfiguration[];
  images: string[];
  furnishing: FurnishingStatus;
  possession: PossessionStatus;
  possessionDate?: string;
  propertyAge?: string;
  floorNumber?: number;
  totalFloors?: number;
  facing?: string;
  amenities: string[];
  highlights: string[];
  description: string;
  reraId?: string;
  isVerified: boolean;
  isFeatured?: boolean;
  postedBy: PostedBy;
  ownerOrAgent: {
    name: string;
    phone: string;
    email: string;
    agencyName?: string;
    avatar?: string;
    isVerified: boolean;
    rating?: number;
  };
  isDemoRecord: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: {
    id: string;
    name: string;
    logo?: string;
    experienceYears: number;
    isVerified: boolean;
  };
  location: LocationInfo;
  startingPrice: number;
  maxPrice: number;
  configurations: string[]; // e.g. ["2 BHK", "3 BHK", "4 BHK"]
  carpetAreaRange: { min: number; max: number };
  projectStatus: PossessionStatus;
  possessionDate: string;
  launchDate: string;
  totalUnits?: number;
  totalTowers?: number;
  projectAreaAcres?: number;
  reraId: string;
  isReraApproved: boolean;
  isFeatured?: boolean;
  isVerified: boolean;
  images: string[];
  coverImage: string;
  amenities: string[];
  specifications?: Record<string, string[]>;
  highlights: string[];
  overview: string;
  isDemoRecord: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  role: 'agent' | 'broker';
  agencyName: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  location: LocationInfo;
  specializations: string[];
  languages: string[];
  listedPropertiesCount: number;
  verifiedListingsCount: number;
  phone: string;
  email: string;
  about: string;
  reraNumber?: string;
  isVerified: boolean;
  isDemoRecord: boolean;
}

export interface Developer {
  id: string;
  slug: string;
  name: string;
  logo: string;
  foundedYear: number;
  headquarters: string;
  experienceYears: number;
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  rating: number;
  reviewCount: number;
  operatingCities: string[];
  description: string;
  isVerified: boolean;
  isDemoRecord: boolean;
}

export interface MarketplaceProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  images: string[];
  price?: number;
  priceUnit?: string; // e.g., "per bag", "per MT", "per sq.ft"
  isPriceOnQuotation: boolean;
  minOrderQuantity: string;
  specifications: Record<string, string>;
  description: string;
  supplier: {
    id: string;
    name: string;
    businessName: string;
    location: string;
    phone: string;
    isVerified: boolean;
  };
  inStock: boolean;
  isDemoRecord: boolean;
}

export interface Lead {
  id: string;
  leadType: 'Property Enquiry' | 'Rental Enquiry' | 'Site Visit' | 'Quotation' | 'Buyer Requirement';
  source: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredTime?: string;
  message?: string;
  propertyOrItemTitle: string;
  propertyOrItemId?: string;
  budget?: string;
  location?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Site Visit Scheduled' | 'Negotiation' | 'Converted' | 'Closed' | 'Rejected';
  assignedTo?: string;
  notes?: string;
  followUpDate?: string;
  createdAt: string;
}

export interface CoBrokingRequirement {
  id: string;
  clientInitials: string;
  clientType: 'Investor' | 'End User Buyer' | 'Corporate Tenant' | 'NRI Buyer';
  purpose: 'Buy' | 'Rent';
  propertyCategory: string;
  bhk: string;
  budget: string;
  targetLocalities: string[];
  city: string;
  urgency: 'Immediate (within 15 days)' | 'Within 30 Days' | 'Within 60 Days';
  commissionSplit: string;
  agentName: string;
  agentAgency: string;
  agentRera: string;
  agentPhone: string;
  agentCity: string;
  postedDate: string;
  matchedInventoryCount: number;
}

export interface FilterState {
  searchQuery: string;
  city: string;
  listingType: ListingType;
  propertyCategory: string;
  bhk: string[];
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  furnishing: string[];
  possession: string[];
  amenities: string[];
  verifiedOnly: boolean;
  postedBy: string[];
  sortBy: 'relevance' | 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

