import fs from 'fs';
import path from 'path';
import { MOCK_PROPERTIES } from '../src/mocks/properties';

console.log(`Auditing ${MOCK_PROPERTIES.length} properties in MOCK_PROPERTIES...\n`);

const violations: string[] = [];

// Track RERA IDs and Images across properties
const reraMap = new Map<string, string[]>();
const imageMap = new Map<string, string[]>();

MOCK_PROPERTIES.forEach((prop, idx) => {
  const pId = prop.id;
  const title = prop.title;

  // 1. Math check: price / carpetArea vs pricePerSqFt
  const computedPpsf = Math.round(prop.price / prop.carpetArea);
  const diffPct = Math.abs(computedPpsf - prop.pricePerSqFt) / prop.pricePerSqFt;
  if (diffPct > 0.05) {
    violations.push(`[MATH] ${pId} (${title}): price=${prop.price}, carpet=${prop.carpetArea} -> computed ${computedPpsf}/sqft, but pricePerSqFt=${prop.pricePerSqFt} (diff ${(diffPct * 100).toFixed(1)}%)`);
  }

  // 2. Variant consistency
  if (prop.configurations && prop.configurations.length > 0) {
    const baseConfig = prop.configurations[0];
    if (prop.price !== baseConfig.price) {
      violations.push(`[VARIANT PRICE] ${pId} (${title}): top-level price ${prop.price} != base variant (${baseConfig.bhk}) price ${baseConfig.price}`);
    }
    if (prop.bhk !== baseConfig.bhk && prop.configurations.length > 1) {
      // Check if top-level bhk matches one of the configurations
      const matchingBhk = prop.configurations.find(c => c.bhk === prop.bhk);
      if (matchingBhk && matchingBhk.carpetArea !== prop.carpetArea) {
        violations.push(`[VARIANT AREA] ${pId} (${title}): top-level BHK ${prop.bhk} has carpetArea ${prop.carpetArea}, but matching config carpetArea is ${matchingBhk.carpetArea}`);
      }
    }
  }

  // 3. RERA check
  if (prop.reraId) {
    const isProjectRera = /^P[0-9]{11}$/.test(prop.reraId);
    if (!isProjectRera) {
      violations.push(`[RERA FORMAT] ${pId} (${title}): reraId '${prop.reraId}' does not match standard MahaRERA format (P + 11 digits)`);
    }
    if (!reraMap.has(prop.reraId)) reraMap.set(prop.reraId, []);
    reraMap.get(prop.reraId)!.push(pId);
  } else if (prop.isVerified) {
    violations.push(`[RERA MISSING] ${pId} (${title}): marked isVerified=true but has no reraId`);
  }

  // 4. Verification metadata
  if (prop.isVerified && !(prop as any).reraVerifiedOn) {
    violations.push(`[RERA DATE] ${pId} (${title}): verified listing missing 'reraVerifiedOn' date stamp or source`);
  }

  // 5. Image existence and cross-reuse
  prop.images.forEach(img => {
    if (img.startsWith('/')) {
      const diskPath = path.join(process.cwd(), 'public', img);
      if (!fs.existsSync(diskPath)) {
        violations.push(`[IMAGE 404] ${pId} (${title}): image '${img}' does not exist on disk`);
      }
    }
    if (!imageMap.has(img)) imageMap.set(img, []);
    imageMap.get(img)!.push(pId);
  });

  // 6. Location check: duplicated strings
  const loc = prop.location;
  if (loc.address.includes(`${loc.locality}, ${loc.locality}`)) {
    violations.push(`[LOCATION DUPE] ${pId} (${title}): address contains duplicate locality: '${loc.address}'`);
  }
});

// Check RERA duplicates
reraMap.forEach((props, rera) => {
  if (props.length > 1) {
    violations.push(`[RERA DUPLICATE] RERA ID '${rera}' is shared across multiple properties: ${props.join(', ')}`);
  }
});

// Check Image cross-reuse
imageMap.forEach((props, img) => {
  if (props.length > 1) {
    violations.push(`[IMAGE REUSED] Image '${img}' is reused across: ${props.join(', ')}`);
  }
});

console.log(`Found ${violations.length} violations:`);
violations.forEach(v => console.log('  ' + v));
