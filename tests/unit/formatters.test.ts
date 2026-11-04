import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatINR, formatArea, calculatePricePerSqFt, slugify } from '../../src/lib/utils.ts';

describe('Formatters & Calculation Utilities', () => {
  test('formatINR correctly formats Crores and Lakhs', () => {
    assert.equal(formatINR(15000000), '₹ 1.50 Cr');
    assert.equal(formatINR(85000000), '₹ 8.50 Cr');
    assert.equal(formatINR(7500000), '₹ 75.0 L');
    assert.equal(formatINR(65000), '₹ 65,000');
    assert.equal(formatINR(0), '₹ 0');
  });

  test('formatArea formats square feet units correctly', () => {
    assert.equal(formatArea(1420), '1,420 sq.ft');
    assert.equal(formatArea(850), '850 sq.ft');
    assert.equal(formatArea(0), 'N/A');
  });

  test('calculatePricePerSqFt computes accurate rate', () => {
    // 4.85 Cr for 1850 sq.ft
    const rate = calculatePricePerSqFt(48500000, 1850);
    assert.equal(rate, '₹ 26,216/sq.ft');

    // Safeguard for 0 area
    assert.equal(calculatePricePerSqFt(100000, 0), 'N/A');
  });

  test('slugify converts titles into URL-safe slugs', () => {
    assert.equal(
      slugify('3 BHK Luxury Sea-View Apartment in Bandra West!'),
      '3-bhk-luxury-sea-view-apartment-in-bandra-west'
    );
    assert.equal(
      slugify('Godrej Woods Sector 150 Noida (RERA Approved)'),
      'godrej-woods-sector-150-noida-rera-approved'
    );
  });
});
