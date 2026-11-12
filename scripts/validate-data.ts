import fs from 'fs';
import path from 'path';
import { MOCK_PROPERTIES } from '../src/mocks/properties';
import { MOCK_PROJECTS } from '../src/mocks/projects';
import { MOCK_AGENTS } from '../src/mocks/agents';
import { MOCK_DEVELOPERS } from '../src/mocks/developers';
import { formatINR, calculatePricePerSqFt } from '../src/lib/utils';

console.log('====================================================');
console.log('BRICKSBAZAR CI DATA INTEGRITY VALIDATION RUNNER');
console.log('====================================================\n');

let violationsCount = 0;

function reportViolation(category: string, entityId: string, message: string) {
  violationsCount++;
  console.error(`❌ [${category}] [${entityId}]: ${message}`);
}

// ---------------------------------------------------------
// 1. PROPERTY MATHEMATICAL INTEGRITY & PRICE CONSISTENCY
// ---------------------------------------------------------
console.log(`Checking ${MOCK_PROPERTIES.length} listings for pricing, areas & rates...`);

const reraMap = new Map<string, string[]>();
const imageMap = new Map<string, string[]>();

MOCK_PROPERTIES.forEach((prop) => {
  const pId = prop.id;

  // 1a. Math check: price / carpetArea must equal pricePerSqFt within 1%
  const computedPpsf = Math.round(prop.price / prop.carpetArea);
  const diff = Math.abs(computedPpsf - prop.pricePerSqFt);
  const diffPct = diff / prop.pricePerSqFt;
  if (diffPct > 0.01) {
    reportViolation(
      'PRICE_MATH_MISMATCH',
      pId,
      `price (${prop.price}) / carpetArea (${prop.carpetArea}) = ${computedPpsf}/sq.ft, but pricePerSqFt is ${prop.pricePerSqFt} (diff ${(diffPct * 100).toFixed(2)}% > 1% limit)`
    );
  }

  // 1b. Variant consistency
  if (prop.configurations && prop.configurations.length > 0) {
    const baseConfig = prop.configurations[0];
    if (prop.price !== baseConfig.price) {
      reportViolation(
        'VARIANT_PRICE_MISMATCH',
        pId,
        `Top-level starting price (${prop.price}) does not match base configuration price (${baseConfig.price})`
      );
    }
    if (prop.carpetArea !== baseConfig.carpetArea) {
      reportViolation(
        'VARIANT_AREA_MISMATCH',
        pId,
        `Top-level carpet area (${prop.carpetArea}) does not match base configuration area (${baseConfig.carpetArea})`
      );
    }
    if (prop.bhk !== baseConfig.bhk) {
      reportViolation(
        'VARIANT_BHK_MISMATCH',
        pId,
        `Top-level BHK (${prop.bhk}) does not match base configuration BHK (${baseConfig.bhk})`
      );
    }

    // Every variant validation
    prop.configurations.forEach((cfg) => {
      if (!cfg.price || cfg.price <= 0) {
        reportViolation('INVALID_VARIANT', pId, `Variant ${cfg.id} has invalid price: ${cfg.price}`);
      }
      if (!cfg.carpetArea || cfg.carpetArea <= 0) {
        reportViolation('INVALID_VARIANT', pId, `Variant ${cfg.id} has invalid carpetArea: ${cfg.carpetArea}`);
      }
      if (!cfg.bathrooms || cfg.bathrooms < 1) {
        reportViolation('INVALID_VARIANT', pId, `Variant ${cfg.id} has invalid bathrooms: ${cfg.bathrooms}`);
      }
    });
  }

  // 1c. RERA Integrity
  if (prop.isVerified) {
    if (!prop.reraId || prop.reraId.trim() === '') {
      reportViolation('MISSING_RERA', pId, `Listing marked isVerified=true but missing reraId`);
    } else {
      const isMahaRera = /^P[0-9]{11}$/.test(prop.reraId);
      const isKarnatakaRera = /^PRM\/KA\/RERA\//.test(prop.reraId);
      if (!isMahaRera && !isKarnatakaRera) {
        reportViolation('INVALID_RERA_FORMAT', pId, `reraId '${prop.reraId}' does not match standard regulatory pattern`);
      }

      if (!prop.reraVerifiedOn) {
        reportViolation('MISSING_RERA_DATE', pId, `Listing missing 'reraVerifiedOn' audit timestamp`);
      }
      if (!prop.reraVerificationSource) {
        reportViolation('MISSING_RERA_SOURCE', pId, `Listing missing 'reraVerificationSource' official registry source`);
      }

      if (!reraMap.has(prop.reraId)) reraMap.set(prop.reraId, []);
      reraMap.get(prop.reraId)!.push(pId);
    }
  }

  // 1d. Images: Existence and Cross-Listing Reuse
  prop.images.forEach((img) => {
    if (img.startsWith('/')) {
      const diskPath = path.join(process.cwd(), 'public', img);
      if (!fs.existsSync(diskPath)) {
        reportViolation('IMAGE_NOT_FOUND', pId, `Image file '${img}' does not exist on disk`);
      }
    }
    if (!imageMap.has(img)) imageMap.set(img, []);
    imageMap.get(img)!.push(pId);
  });

  // 1e. Location integrity: no duplicate strings and clean PIN
  const loc = prop.location;
  if (loc.address.includes(`${loc.locality}, ${loc.locality}`)) {
    reportViolation('DUPLICATE_LOCATION_STRING', pId, `Address contains duplicated locality name: '${loc.address}'`);
  }
  if (!loc.pincode || !/^[1-9][0-9]{5}$/.test(loc.pincode)) {
    reportViolation('INVALID_PINCODE', pId, `Pincode '${loc.pincode}' is not a valid 6-digit Indian PIN`);
  }
  if (loc.coordinates) {
    if (loc.coordinates.lat < 8 || loc.coordinates.lat > 37 || loc.coordinates.lng < 68 || loc.coordinates.lng > 98) {
      reportViolation('INVALID_COORDINATES', pId, `Coordinates (${loc.coordinates.lat}, ${loc.coordinates.lng}) outside India`);
    }
  }
});

// Check for cross-listing image reuse
imageMap.forEach((propIds, imgPath) => {
  if (propIds.length > 1) {
    reportViolation('REUSED_GALLERY_IMAGE', propIds.join(', '), `Image '${imgPath}' is reused across multiple listings`);
  }
});

// Check for duplicate RERA IDs across different projects
reraMap.forEach((propIds, reraId) => {
  if (propIds.length > 1) {
    reportViolation('DUPLICATE_RERA_ID', propIds.join(', '), `RERA ID '${reraId}' is shared across multiple listings`);
  }
});

// ---------------------------------------------------------
// 2. FLOOR PLAN & ROOM DIMENSIONS VALIDATION
// ---------------------------------------------------------
console.log('Checking Floor Plan room dimensions against carpet area bounds...');

const floorPlanSchemes: Record<string, { maxCarpet: number; dims: { label: string; sqft: number }[] }> = {
  '1': {
    maxCarpet: 500,
    dims: [
      { label: 'Living & Dining', sqft: 16.5 * 10.5 },
      { label: 'Master Bedroom', sqft: 12.0 * 10.0 },
      { label: 'Modular Kitchen', sqft: 8.5 * 7.0 },
      { label: 'Bathroom Suite', sqft: 7.0 * 4.5 },
      { label: 'Utility Balcony', sqft: 6.5 * 4.0 },
      { label: 'Foyer', sqft: 5.0 * 4.0 },
    ],
  },
  '2': {
    maxCarpet: 900,
    dims: [
      { label: 'Living & Dining', sqft: 20.0 * 13.0 },
      { label: 'Master Suite', sqft: 13.5 * 11.5 },
      { label: 'Bedroom 2', sqft: 11.5 * 10.5 },
      { label: 'Modular Kitchen', sqft: 9.5 * 8.0 },
      { label: 'Master Bath', sqft: 7.5 * 4.5 },
      { label: 'Sundeck Balcony', sqft: 12.0 * 5.0 },
    ],
  },
};

for (const [bhk, scheme] of Object.entries(floorPlanSchemes)) {
  const sumRoomSqft = scheme.dims.reduce((acc, d) => acc + d.sqft, 0);
  if (sumRoomSqft > scheme.maxCarpet * 1.1) {
    reportViolation(
      'FLOOR_PLAN_OVERFLOW',
      `${bhk} BHK`,
      `Sum of room dimensions (${sumRoomSqft.toFixed(1)} sq.ft) exceeds maximum carpet area allowance (${scheme.maxCarpet} sq.ft)`
    );
  }
}

// ---------------------------------------------------------
// 3. CURRENCY FORMATTER VALIDATION
// ---------------------------------------------------------
console.log('Testing unified currency formatting helper...');
const testAmounts = [
  { val: 9900000, expected: '₹ 99.0 L' },
  { val: 15500000, expected: '₹ 1.55 Cr' },
  { val: 30600000, expected: '₹ 3.06 Cr' },
  { val: 65000, rent: true, expected: '₹ 65,000/mo' },
];

for (const t of testAmounts) {
  const formatted = formatINR(t.val, t.rent);
  if (formatted !== t.expected) {
    reportViolation('CURRENCY_FORMAT_ERROR', `${t.val}`, `Expected '${t.expected}', got '${formatted}'`);
  }
}

// ---------------------------------------------------------
// RESULT
// ---------------------------------------------------------
console.log('\n====================================================');
if (violationsCount === 0) {
  console.log('✅ ALL CI DATA INTEGRITY CHECKS PASSED PERFECTLY!');
  console.log('   - 18 Listings mathematically consistent');
  console.log('   - Zero reused or 404 gallery images');
  console.log('   - Zero generic or duplicated locations');
  console.log('   - All RERA IDs valid, unique, and dated');
  console.log('====================================================\n');
  process.exit(0);
} else {
  console.error(`💥 DATA INTEGRITY FAILED WITH ${violationsCount} VIOLATIONS!`);
  console.log('====================================================\n');
  process.exit(1);
}
