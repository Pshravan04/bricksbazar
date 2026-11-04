import { MOCK_PROPERTIES } from './properties';
import { MOCK_PROJECTS } from './projects';
import { MOCK_AGENTS } from './agents';
import { MOCK_DEVELOPERS } from './developers';
import { MOCK_MARKETPLACE_PRODUCTS } from './marketplace';
import { MOCK_LEADS } from './leads';
import { Property, Project, Agent, Developer, MarketplaceProduct, Lead, FilterState } from '@/types';

export * from './properties';
export * from './projects';
export * from './agents';
export * from './developers';
export * from './marketplace';
export * from './leads';

/**
 * Filter properties based on comprehensive query parameters
 */
export function filterProperties(
  properties: Property[],
  filters: Partial<FilterState>
): Property[] {
  return properties.filter((prop) => {
    // City filter
    if (filters.city && filters.city.toLowerCase() !== 'all') {
      if (prop.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    // Listing Type (buy, rent, commercial, plot)
    if (filters.listingType && prop.listingType !== filters.listingType) {
      return false;
    }

    // Property Category
    if (filters.propertyCategory && filters.propertyCategory !== 'All') {
      if (prop.propertyCategory !== filters.propertyCategory) {
        return false;
      }
    }

    // BHK filter
    if (filters.bhk && filters.bhk.length > 0) {
      if (!filters.bhk.includes(prop.bhk)) {
        return false;
      }
    }

    // Price range
    if (filters.minPrice !== undefined && prop.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0 && prop.price > filters.maxPrice) {
      return false;
    }

    // Carpet Area range
    if (filters.minArea !== undefined && prop.carpetArea < filters.minArea) {
      return false;
    }
    if (filters.maxArea !== undefined && filters.maxArea > 0 && prop.carpetArea > filters.maxArea) {
      return false;
    }

    // Furnishing
    if (filters.furnishing && filters.furnishing.length > 0) {
      if (!filters.furnishing.includes(prop.furnishing)) {
        return false;
      }
    }

    // Possession
    if (filters.possession && filters.possession.length > 0) {
      if (!filters.possession.includes(prop.possession)) {
        return false;
      }
    }

    // Verified only
    if (filters.verifiedOnly && !prop.isVerified) {
      return false;
    }

    // Search query keyword (checks title, locality, address, city, description)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(q) ||
        prop.location.locality.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q) ||
        prop.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}

/**
 * Sort properties
 */
export function sortProperties(
  properties: Property[],
  sortBy: FilterState['sortBy'] = 'relevance'
): Property[] {
  const cloned = [...properties];
  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return cloned.sort((a, b) => b.price - a.price);
    case 'area-desc':
      return cloned.sort((a, b) => b.carpetArea - a.carpetArea);
    case 'newest':
      return cloned.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'relevance':
    default:
      return cloned.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
}

/**
 * Retrieve a property by its URL slug
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.slug === slug);
}

/**
 * Retrieve a project by its URL slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return MOCK_PROJECTS.find((p) => p.slug === slug);
}

/**
 * Retrieve an agent by slug
 */
export function getAgentBySlug(slug: string): Agent | undefined {
  return MOCK_AGENTS.find((a) => a.slug === slug);
}

/**
 * Retrieve a developer by slug
 */
export function getDeveloperBySlug(slug: string): Developer | undefined {
  return MOCK_DEVELOPERS.find((d) => d.slug === slug);
}

/**
 * Retrieve a marketplace product by slug
 */
export function getMarketplaceProductBySlug(slug: string): MarketplaceProduct | undefined {
  return MOCK_MARKETPLACE_PRODUCTS.find((p) => p.slug === slug);
}

