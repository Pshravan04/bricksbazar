import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee currency with Crores (Cr) and Lakhs (L) shorthand
 * @param amount Amount in INR
 * @param isRent Whether this is a rental price
 */
export function formatINR(amount: number, isRent = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return 'Price on Request';
  }

  if (isRent) {
    if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(1)} L/mo`;
    }
    return `₹ ${amount.toLocaleString('en-IN')}/mo`;
  }

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹ ${cr >= 10 ? cr.toFixed(1) : cr.toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹ ${l >= 10 ? l.toFixed(1) : l.toFixed(2)} L`;
  }

  return `₹ ${amount.toLocaleString('en-IN')}`;
}

/**
 * Format square feet area
 */
export function formatArea(sqft: number): string {
  if (!sqft) return 'N/A';
  return `${sqft.toLocaleString('en-IN')} sq.ft`;
}

/**
 * Calculate price per sqft
 */
export function calculatePricePerSqFt(price: number, areaSqft: number): string {
  if (!price || !areaSqft || areaSqft === 0) return 'N/A';
  const perSqft = Math.round(price / areaSqft);
  return `₹ ${perSqft.toLocaleString('en-IN')}/sq.ft`;
}

/**
 * Create URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

