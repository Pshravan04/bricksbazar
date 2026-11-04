import { MetadataRoute } from 'next';
import { MOCK_PROPERTIES } from '@/mocks/properties';
import { MOCK_PROJECTS } from '@/mocks/projects';
import { MOCK_AGENTS } from '@/mocks/agents';
import { MOCK_DEVELOPERS } from '@/mocks/developers';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks/marketplace';
import { MOCK_ARTICLES } from '@/mocks/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bricksbazar.com';
  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/buy`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/rent`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/commercial`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plots`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/new-projects`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/agents`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/brokers`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/developers`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/marketplace`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/post-property`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Dynamic Properties
  const propertyRoutes: MetadataRoute.Sitemap = MOCK_PROPERTIES.map((prop) => ({
    url: `${baseUrl}/property/${prop.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic Projects
  const projectRoutes: MetadataRoute.Sitemap = MOCK_PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Dynamic Agents & Brokers
  const agentRoutes: MetadataRoute.Sitemap = MOCK_AGENTS.map((agent) => ({
    url: `${baseUrl}/${agent.role === 'broker' ? 'brokers' : 'agents'}/${agent.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Developers
  const developerRoutes: MetadataRoute.Sitemap = MOCK_DEVELOPERS.map((dev) => ({
    url: `${baseUrl}/developers/${dev.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Marketplace Products
  const productRoutes: MetadataRoute.Sitemap = MOCK_MARKETPLACE_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/marketplace/product/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Insights Articles
  const articleRoutes: MetadataRoute.Sitemap = MOCK_ARTICLES.map((art) => ({
    url: `${baseUrl}/insights/${art.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...propertyRoutes,
    ...projectRoutes,
    ...agentRoutes,
    ...developerRoutes,
    ...productRoutes,
    ...articleRoutes,
  ];
}

