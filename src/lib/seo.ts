/**
 * Schema.org JSON-LD Structured Data Generators for BricksBazar
 */

import { Property, Project, Agent, Developer, MarketplaceProduct } from '@/types';
import { Article } from '@/mocks/articles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bricksbazar.com';

/**
 * Platform Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BricksBazar',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    description:
      'India Premier Real Estate Discovery Portal and Construction Materials Marketplace.',
    sameAs: [
      'https://www.linkedin.com/company/bricksbazar',
      'https://twitter.com/bricksbazar',
      'https://www.facebook.com/bricksbazar',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1800-209-8899',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Level 14, One BKC, G-Block, Bandra Kurla Complex',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400051',
      addressCountry: 'IN',
    },
  };
}

/**
 * RealEstateListing & Accommodation Schema
 */
export function generateRealEstateListingSchema(property: Property) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${SITE_URL}/property/${property.slug}`,
    datePosted: property.createdAt,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    about: {
      '@type': property.propertyCategory === 'Apartment' ? 'Apartment' : 'SingleFamilyResidence',
      name: property.title,
      numberOfRooms: property.bhk,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: property.carpetArea,
        unitCode: 'FTK', // square foot
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location.address,
        addressLocality: property.location.locality,
        addressRegion: property.location.city,
        postalCode: property.location.pincode,
        addressCountry: 'IN',
      },
      ...(property.location.coordinates && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: property.location.coordinates.lat,
          longitude: property.location.coordinates.lng,
        },
      }),
      amenityFeature: property.amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        name: a,
        value: true,
      })),
    },
  };
}

/**
 * RealEstateAgent LocalBusiness Schema
 */
export function generateLocalBusinessSchema(agent: Agent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.name,
    image: agent.avatar,
    telephone: agent.phone,
    email: agent.email,
    url: `${SITE_URL}/agents/${agent.slug}`,
    description: agent.about,
    address: {
      '@type': 'PostalAddress',
      streetAddress: agent.location.address,
      addressLocality: agent.location.locality,
      addressRegion: agent.location.city,
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: agent.rating,
      reviewCount: agent.reviewCount || 12,
    },
  };
}

/**
 * Construction Marketplace Product Schema
 */
export function generateProductSchema(product: MarketplaceProduct) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price || 0,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.supplier.businessName,
      },
    },
  };
}

/**
 * Insights Article Schema
 */
export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BricksBazar Intelligence',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo.png`,
      },
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

