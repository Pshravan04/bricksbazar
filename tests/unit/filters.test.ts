import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

interface SampleProperty {
  id: string;
  title: string;
  listingType: 'buy' | 'rent';
  propertyCategory: string;
  city: string;
  bhk: string;
  price: number;
  carpetArea: number;
  isVerified: boolean;
}

const SAMPLE_PROPERTIES: SampleProperty[] = [
  {
    id: 'p-1',
    title: '3 BHK Sea View Flat',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    city: 'Mumbai',
    bhk: '3 BHK',
    price: 48500000,
    carpetArea: 1420,
    isVerified: true,
  },
  {
    id: 'p-2',
    title: '2 BHK Modern Condo',
    listingType: 'rent',
    propertyCategory: 'Apartment',
    city: 'Mumbai',
    bhk: '2 BHK',
    price: 65000,
    carpetArea: 850,
    isVerified: true,
  },
  {
    id: 'p-3',
    title: '4 BHK Independent Villa',
    listingType: 'buy',
    propertyCategory: 'Villa',
    city: 'Pune',
    bhk: '4 BHK',
    price: 32500000,
    carpetArea: 2800,
    isVerified: true,
  },
  {
    id: 'p-4',
    title: '3 BHK Luxury Highrise',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    city: 'Bengaluru',
    bhk: '3 BHK',
    price: 18500000,
    carpetArea: 1350,
    isVerified: false,
  },
];

function filterProps(
  props: SampleProperty[],
  filters: { city?: string; listingType?: string; bhk?: string[]; minPrice?: number; maxPrice?: number }
) {
  return props.filter((p) => {
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.listingType && p.listingType !== filters.listingType) return false;
    if (filters.bhk && filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false;
    if (filters.minPrice !== undefined && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && p.price > filters.maxPrice) return false;
    return true;
  });
}

function sortProps(props: SampleProperty[], order: 'price-asc' | 'price-desc' | 'area-desc') {
  const cloned = [...props];
  if (order === 'price-asc') return cloned.sort((a, b) => a.price - b.price);
  if (order === 'price-desc') return cloned.sort((a, b) => b.price - a.price);
  if (order === 'area-desc') return cloned.sort((a, b) => b.carpetArea - a.carpetArea);
  return cloned;
}

describe('Property Filtering & Sorting Logic', () => {
  test('filterProps accurately filters by City', () => {
    const mumbaiProps = filterProps(SAMPLE_PROPERTIES, { city: 'Mumbai' });
    assert.equal(mumbaiProps.length, 2);
    assert.ok(mumbaiProps.every((p) => p.city === 'Mumbai'));
  });

  test('filterProps accurately filters by Listing Type (buy vs rent)', () => {
    const rentProps = filterProps(SAMPLE_PROPERTIES, { listingType: 'rent' });
    assert.equal(rentProps.length, 1);
    assert.equal(rentProps[0].id, 'p-2');
  });

  test('filterProps handles price range boundaries', () => {
    const buyProps = filterProps(SAMPLE_PROPERTIES, {
      minPrice: 15000000,
      maxPrice: 35000000,
    });

    assert.equal(buyProps.length, 2);
    assert.ok(buyProps.every((p) => p.price >= 15000000 && p.price <= 35000000));
  });

  test('filterProps filters by BHK configuration array', () => {
    const bhk3Props = filterProps(SAMPLE_PROPERTIES, { bhk: ['3 BHK'] });
    assert.equal(bhk3Props.length, 2);
    assert.ok(bhk3Props.every((p) => p.bhk === '3 BHK'));
  });

  test('sortProps orders prices ascending and descending', () => {
    const asc = sortProps(SAMPLE_PROPERTIES, 'price-asc');
    assert.equal(asc[0].price, 65000);
    assert.equal(asc[asc.length - 1].price, 48500000);

    const desc = sortProps(SAMPLE_PROPERTIES, 'price-desc');
    assert.equal(desc[0].price, 48500000);
    assert.equal(desc[desc.length - 1].price, 65000);
  });
});
