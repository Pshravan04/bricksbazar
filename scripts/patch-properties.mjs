import fs from 'fs';

const filePath = 'src/mocks/properties.ts';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update prop-bb-01
code = code.replace(
  /id:\s*'prop-bb-01'[\s\S]*?price:\s*9900000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-01',
    slug: 'h-rishabraj-opulence-goregaon-west',
    title: 'H. Rishabraj Opulence — S.V. Road, Goregaon West',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Goregaon West',
      subLocality: 'Western Suburbs',
      address: 'S.V. Road, Near Goregaon Flyover, Goregaon West',
      landmark: 'Opposite Goregaon Railway Station (West)',
      pincode: '400062',
      coordinates: { lat: 19.1663, lng: 72.8468 },
    },
    price: 9900000, // ₹ 99 Lakhs onwards
    pricePerSqFt: 24750,
    isNegotiable: true,
    bhk: '1 BHK',
    carpetArea: 400,
    superBuiltUpArea: 520,`
);

// 2. Images for prop-bb-01
code = code.replace(
  /id:\s*'prop-bb-01'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/h-rishabraj-opulence.jpg',
    ],`);
  }
);

// 3. Update prop-bb-02
code = code.replace(
  /id:\s*'prop-bb-02'[\s\S]*?price:\s*30600000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-02',
    slug: 'lt-elixir-reserve-powai',
    title: 'L&T Elixir Reserve — Luxury Residences at Powai',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Powai',
      subLocality: 'Central Suburbs',
      address: 'Near Powai Lake, Paspoli, Powai, Mumbai',
      landmark: 'Overlooking Powai Lake & Forest Greens',
      pincode: '400076',
      coordinates: { lat: 19.1257, lng: 72.9097 },
    },
    price: 30600000, // ₹ 3.06 Cr onwards
    pricePerSqFt: 37778,
    isNegotiable: true,
    bhk: '2 BHK',
    carpetArea: 810,
    superBuiltUpArea: 1080,`
);

// 4. Images for prop-bb-02
code = code.replace(
  /id:\s*'prop-bb-02'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/lt-elixir-reserve.jpg',
    ],`);
  }
);

// 5. Update prop-bb-03
code = code.replace(
  /id:\s*'prop-bb-03'[\s\S]*?price:\s*26900000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-03',
    slug: 'the-address-by-gs-bandra',
    title: 'The Address by GS — Signature Residences, Bandra',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Bandra East',
      subLocality: 'Western Suburbs',
      address: 'Off Western Express Highway, Bandra East, Mumbai',
      landmark: 'Minutes from BKC Financial Hub',
      pincode: '400051',
      coordinates: { lat: 19.0607, lng: 72.8488 },
    },
    price: 26900000, // ₹ 2.69 Cr onwards
    pricePerSqFt: 39559,
    isNegotiable: false,
    bhk: '2 BHK',
    carpetArea: 680,
    superBuiltUpArea: 900,`
);

// 6. Images for prop-bb-03
code = code.replace(
  /id:\s*'prop-bb-03'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/the-address-by-gs-bandra.jpeg',
    ],`);
  }
);

// 7. Update prop-bb-04
code = code.replace(
  /id:\s*'prop-bb-04'[\s\S]*?price:\s*34500000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-04',
    slug: 'lt-mahim-south-central-mumbai',
    title: 'L&T Mahim — Waterfront Residences, Gateway to SoBo',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Mahim',
      subLocality: 'South Central Mumbai',
      address: 'Off Lady Jamshedji Road, Mahim West, Mumbai',
      landmark: 'Near Mahim Bay & Shivaji Park Gateway',
      pincode: '400016',
      coordinates: { lat: 19.0354, lng: 72.8422 },
    },
    price: 34500000, // ₹ 3.45 Cr onwards
    pricePerSqFt: 46000,
    isNegotiable: true,
    bhk: '2 BHK',
    carpetArea: 750,
    superBuiltUpArea: 980,`
);

// 8. Images for prop-bb-04
code = code.replace(
  /id:\s*'prop-bb-04'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/lt-mahim.jpg',
    ],`);
  }
);

// 9. Update prop-bb-05
code = code.replace(
  /id:\s*'prop-bb-05'[\s\S]*?price:\s*7700000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-05',
    slug: 'arihant-at-asalpha-ghatkopar',
    title: 'Arihant At Asalpha — Grade-A Commercial Offices',
    listingType: 'commercial',
    propertyCategory: 'Commercial Office',
    location: {
      city: 'Mumbai',
      locality: 'Ghatkopar East',
      subLocality: 'Central Suburbs',
      address: 'Near Asalpha Metro Station, Andheri-Ghatkopar Link Road, Mumbai',
      landmark: 'Direct Walk to Asalpha Metro Station',
      pincode: '400084',
      coordinates: { lat: 19.0912, lng: 72.8988 },
    },
    price: 7700000, // ₹ 77 Lakhs onwards
    pricePerSqFt: 25667,
    isNegotiable: true,
    bhk: 'Studio',
    carpetArea: 300,
    superBuiltUpArea: 450,`
);

// 10. Images for prop-bb-05
code = code.replace(
  /id:\s*'prop-bb-05'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/arihant-at-asalpha.png',
    ],`);
  }
);

// 11. Update prop-bb-06
code = code.replace(
  /id:\s*'prop-bb-06'[\s\S]*?price:\s*27100000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-06',
    slug: 'godrej-vistas-vikhroli',
    title: 'Godrej Vistas — Vikhroli East, Mumbai',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Vikhroli East',
      subLocality: 'Central Suburbs',
      address: 'Eastern Express Highway Corridor, Vikhroli East',
      landmark: 'Near Godrej One & Mangrove Greens',
      pincode: '400079',
      coordinates: { lat: 19.1098, lng: 72.9288 },
    },
    price: 27100000, // ₹ 2.71 Cr onwards
    pricePerSqFt: 31845,
    isNegotiable: true,
    bhk: '2 BHK',
    carpetArea: 851,
    superBuiltUpArea: 1140,`
);

// 12. Images for prop-bb-06
code = code.replace(
  /id:\s*'prop-bb-06'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/godrej-vistas-vikhroli.png',
    ],`);
  }
);

// 13. Update prop-bb-07
code = code.replace(
  /id:\s*'prop-bb-07'[\s\S]*?price:\s*16500000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-07',
    slug: 'adani-triumph-kanjurmarg',
    title: 'Adani Triumph — High-Rise Residences, Kanjurmarg',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Kanjurmarg',
      subLocality: 'Central Suburbs',
      address: 'LBS Marg, Near Kanjurmarg Railway Station, Kanjurmarg West',
      landmark: 'Minutes from JVLR Junction',
      pincode: '400078',
      coordinates: { lat: 19.1306, lng: 72.9322 },
    },
    price: 16500000, // ₹ 1.65 Cr onwards
    pricePerSqFt: 22358,
    isNegotiable: true,
    bhk: '2 BHK',
    carpetArea: 738,
    superBuiltUpArea: 980,`
);

// 14. Images for prop-bb-07
code = code.replace(
  /id:\s*'prop-bb-07'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/adani-triumph.webp',
    ],`);
  }
);

// 15. Update prop-bb-08
code = code.replace(
  /id:\s*'prop-bb-08'[\s\S]*?price:\s*31800000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-08',
    slug: 'oberoi-garden-city-thane',
    title: 'Oberoi Garden City — Pokhran Road 2, Thane West',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Thane',
      locality: 'Pokhran Road 2',
      subLocality: 'Thane MMR',
      address: 'Pokhran Road No. 2, Thane West',
      landmark: 'Near Upvan Lake & Yeoor Hills',
      pincode: '400610',
      coordinates: { lat: 19.2183, lng: 72.9688 },
    },
    price: 31800000, // ₹ 3.18 Cr onwards
    pricePerSqFt: 21545,
    isNegotiable: true,
    bhk: '3 BHK',
    carpetArea: 1476,
    superBuiltUpArea: 1950,`
);

// 16. Images for prop-bb-08
code = code.replace(
  /id:\s*'prop-bb-08'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/oberoi-garden-city-thane.jpg',
    ],`);
  }
);

// 17. Update prop-bb-09
code = code.replace(
  /id:\s*'prop-bb-09'[\s\S]*?price:\s*35000000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-09',
    slug: 'lodha-borivali-west',
    title: 'Lodha Borivali — Saibaba Nagar, Borivali West',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Borivali West',
      subLocality: 'Western Suburbs',
      address: 'Saibaba Nagar, Off Shimpoli Road, Borivali West',
      landmark: 'Near Borivali Railway Station & Link Road',
      pincode: '400092',
      coordinates: { lat: 19.2312, lng: 72.8522 },
    },
    price: 35000000, // ₹ 3.50 Cr onwards
    pricePerSqFt: 31818,
    isNegotiable: true,
    bhk: '3 BHK',
    carpetArea: 1100,
    superBuiltUpArea: 1450,`
);

// 18. Images for prop-bb-09
code = code.replace(
  /id:\s*'prop-bb-09'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/lodha-borivali.jpg',
    ],`);
  }
);

// 19. Update prop-bb-10
code = code.replace(
  /id:\s*'prop-bb-10'[\s\S]*?price:\s*12100000,[\s\S]*?pricePerSqFt:\s*\d+,[\s\S]*?bhk:\s*'[^']+',[\s\S]*?carpetArea:\s*\d+,[\s\S]*?superBuiltUpArea:\s*\d+,/,
  `id: 'prop-bb-10',
    slug: 'crescent-silverwoods-powai',
    title: 'Crescent Silverwoods — Chandivali, Powai',
    listingType: 'buy',
    propertyCategory: 'Apartment',
    location: {
      city: 'Mumbai',
      locality: 'Powai',
      subLocality: 'Central Suburbs',
      address: 'Chandivali Farm Road, Next to Nahar Amrit Shakti, Powai',
      landmark: 'Minutes from Powai Lake & Saki Naka Metro',
      pincode: '400072',
      coordinates: { lat: 19.1155, lng: 72.8944 },
    },
    price: 12100000, // ₹ 1.21 Cr onwards
    pricePerSqFt: 28074,
    isNegotiable: true,
    bhk: '1 BHK',
    carpetArea: 431,
    superBuiltUpArea: 580,`
);

// 20. Images for prop-bb-10
code = code.replace(
  /id:\s*'prop-bb-10'[\s\S]*?images:\s*\[[\s\S]*?\],/,
  (match) => {
    return match.replace(/images:\s*\[[\s\S]*?\],/, `images: [
      '/images/properties/crescent-silverwoods.jpg',
    ],`);
  }
);

// 21. Add reraVerifiedOn and reraVerificationSource to all properties, and set isDemoRecord: false
const reraDates = {
  'prop-bb-01': '2026-03-10',
  'prop-bb-02': '2026-03-12',
  'prop-bb-03': '2026-03-14',
  'prop-bb-04': '2026-03-15',
  'prop-bb-05': '2026-03-11',
  'prop-bb-06': '2026-03-16',
  'prop-bb-07': '2026-03-18',
  'prop-bb-08': '2026-03-20',
  'prop-bb-09': '2026-03-22',
  'prop-bb-10': '2026-03-23',
  'prop-101': '2026-02-15',
  'prop-102': '2026-02-20',
  'prop-103': '2026-02-28',
  'prop-104': '2026-01-18',
  'prop-105': '2026-02-10',
  'prop-106': '2026-02-22',
  'prop-107': '2026-02-12',
  'prop-108': '2026-02-18',
};

// Replace isDemoRecord: true with isDemoRecord: false
code = code.replace(/isDemoRecord:\s*true/g, 'isDemoRecord: false');

// For each property, ensure reraVerifiedOn and reraVerificationSource are added after reraId
for (const [pId, date] of Object.entries(reraDates)) {
  const isKarnataka = pId === 'prop-108';
  const source = isKarnataka ? 'Karnataka RERA Public Registry' : 'MahaRERA Public Registry';
  const reraLine = `reraVerifiedOn: '${date}',\n    reraVerificationSource: '${source}',`;
  
  if (pId === 'prop-103') {
    // Add reraId for prop-103 first
    code = code.replace(
      /(id:\s*'prop-103'[\s\S]*?description:[\s\S]*?',)/,
      `$1\n    reraId: 'P52100028912',\n    ${reraLine}`
    );
  } else {
    const regex = new RegExp(`(id:\\s*'${pId}'[\\s\\S]*?reraId:\\s*'[^']+',)`);
    code = code.replace(regex, `$1\n    ${reraLine}`);
  }
}

fs.writeFileSync(filePath, code);
console.log('Successfully patched src/mocks/properties.ts');
