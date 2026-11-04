export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Market Trends' | 'RERA & Legal' | 'Home Buying' | 'Construction';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tableOfContents: { id: string; title: string }[];
  content: {
    sectionId: string;
    heading: string;
    paragraphs: string[];
    callout?: string;
  }[];
  relatedSlugs: string[];
}

export const MOCK_ARTICLES: Article[] = [
  {
    slug: 'mumbai-real-estate-appreciation-trends-2026',
    title: 'Mumbai Real Estate Price Trends 2026: Coastal Road Impact & Micro-Market Analysis',
    excerpt:
      'How the Mumbai Coastal Road, Line 3 Aqua Metro, and Trans-Harbour Link (Atal Setu) are driving double-digit capital appreciation across Bandra, Worli, and Navi Mumbai.',
    category: 'Market Trends',
    author: {
      name: 'Aditya Singhania',
      role: 'Chief Research Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    publishedAt: 'March 1, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'executive-summary', title: '1. Executive Market Summary' },
      { id: 'infrastructure-catalysts', title: '2. Major Infrastructure Catalysts' },
      { id: 'micro-market-winners', title: '3. Top Micro-Market Performers' },
      { id: 'rera-impact', title: '4. MahaRERA & Developer Execution Track Record' },
      { id: 'investment-verdict', title: '5. BricksBazar Investment Outlook' },
    ],
    content: [
      {
        sectionId: 'executive-summary',
        heading: '1. Executive Market Summary',
        paragraphs: [
          'Mumbai Metropolitan Region (MMR) recorded its highest-ever quarterly residential capital value expansion in Q1 2026. Premium residential units priced above ₹ 5 Crore experienced a 16.4% year-on-year value appreciation, propelled primarily by end-user demand from C-suite executives, tech entrepreneurs, and NRI families.',
          'Unlike speculative bubbles of previous decades, the current surge is fundamentally driven by unprecedented civic infrastructure delivery, including operational metro networks and coastal freeways.',
        ],
        callout:
          'Key Takeaway: Capital values in Grade-A gated townships in Western Suburbs and South-Central Mumbai are outperforming traditional fixed-income yields by over 380 basis points.',
      },
      {
        sectionId: 'infrastructure-catalysts',
        heading: '2. Major Infrastructure Catalysts',
        paragraphs: [
          'The completion of the Mumbai Coastal Road linking Marine Lines to the Bandra-Worli Sea Link has reduced peak-hour transit times from 65 minutes down to just 14 minutes. This has ignited renewed residential demand in South-Central clusters like Prabhadevi, Worli, and Mahalaxmi.',
          'Simultaneously, the Navi Mumbai International Airport (NMIA) nearing commercial flight operations has catalyzed an influx of Grade-A developers into Ulwe, Kharghar, and Panvel.',
        ],
      },
      {
        sectionId: 'micro-market-winners',
        heading: '3. Top Micro-Market Performers',
        paragraphs: [
          'Bandra West continues to command premier price points, with redeveloped luxury societies commanding ₹ 85,000 to ₹ 1,20,000 per sq.ft on carpet area. In the Central Suburbs, Powai has consolidated its position as a high-yield rental magnet, delivering gross rental yields of 3.8% to 4.4%.',
        ],
      },
      {
        sectionId: 'rera-impact',
        heading: '4. MahaRERA & Developer Execution Track Record',
        paragraphs: [
          'MahaRERA regulatory oversight has eliminated fly-by-night operators. Over 94% of new residential inventory registered in 2025-2026 is backed by institutional developers with zero debt default history.',
        ],
      },
      {
        sectionId: 'investment-verdict',
        heading: '5. BricksBazar Investment Outlook',
        paragraphs: [
          'For end-users, ready possession and near-completion (within 9 months) 3 BHK and 4 BHK units represent the sweet spot for capital safety. Investors should evaluate Navi Mumbai transit corridors for superior 5-year capital multiplication.',
        ],
      },
    ],
    relatedSlugs: ['maharera-checklist-for-homebuyers-2026', 'grade-a-tmt-steel-cement-guide'],
  },
  {
    slug: 'maharera-checklist-for-homebuyers-2026',
    title: 'The Essential MahaRERA Checklist: 7 Legal Verifications Before Buying a Home',
    excerpt:
      'A comprehensive legal guide on verifying RERA registration numbers, commencement certificates, encumbrance certificates, and title ownership in Maharashtra.',
    category: 'RERA & Legal',
    author: {
      name: 'Advocate Meera Kulkarni',
      role: 'Senior Real Estate Legal Counsel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    publishedAt: 'February 24, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'rera-importance', title: '1. Why RERA Verification is Non-Negotiable' },
      { id: 'step-1-project-search', title: '2. Verifying State RERA Portal Records' },
      { id: 'step-2-commencement', title: '3. Commencement Certificate (CC) vs. IOD' },
      { id: 'step-3-carpet-area', title: '4. RERA Carpet Area Definition' },
      { id: 'step-4-title-search', title: '5. Title Clearance & Encumbrance Verification' },
    ],
    content: [
      {
        sectionId: 'rera-importance',
        heading: '1. Why RERA Verification is Non-Negotiable',
        paragraphs: [
          'Under the Real Estate (Regulation and Development) Act 2016, no promoter can advertise, market, book, sell, or invite persons to purchase any plot, apartment, or building without registering the real estate project with the regulatory authority.',
          'Purchasing in an unregistered project exposes buyers to non-redressable delays, unauthorized building height violations, and potential demolition notices from local municipal corporations.',
        ],
        callout:
          'Legal Tip: Never write an advance booking cheque before confirming the active RERA registration number and checking the escrow account details on the official MahaRERA website.',
      },
      {
        sectionId: 'step-1-project-search',
        heading: '2. Verifying State RERA Portal Records',
        paragraphs: [
          'Every registered project has a public dossier on the State RERA portal. Look for the sanctioned floor plans, proposed possession date, developer bank accounts, and quarterly compliance filings.',
        ],
      },
      {
        sectionId: 'step-2-commencement',
        heading: '3. Commencement Certificate (CC) vs. IOD',
        paragraphs: [
          'An Intimation of Disapproval (IOD) is merely conditional permission. A Commencement Certificate (CC) issued by the municipal planning authority is the only legal permit that authorizes physical building construction.',
        ],
      },
      {
        sectionId: 'step-3-carpet-area',
        heading: '4. RERA Carpet Area Definition',
        paragraphs: [
          'Section 2(k) of RERA defines carpet area as the net usable floor area of an apartment, excluding the area covered by the external walls, service shafts, and exclusive balcony or verandah area. Ensure your sales agreement quotes carpet area, not super built-up area.',
        ],
      },
      {
        sectionId: 'step-4-title-search',
        heading: '5. Title Clearance & Encumbrance Verification',
        paragraphs: [
          'Always demand a 30-year Title Search Report prepared by an independent advocate. This certifies that the land title is marketable, free from litigation, and has no registered mortgage encumbrances.',
        ],
      },
    ],
    relatedSlugs: ['mumbai-real-estate-appreciation-trends-2026'],
  },
  {
    slug: 'grade-a-tmt-steel-cement-guide',
    title: 'Selecting Grade-A TMT Steel & Cement: Construction Quality Handbook for Builders',
    excerpt:
      'Understanding Fe 550D rebar ductility, OPC vs. PPC cement grades, and corrosion resistance standards for coastal highrise construction.',
    category: 'Construction',
    author: {
      name: 'Er. Rajesh Varma',
      role: 'Chief Structural Consultant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    publishedAt: 'February 18, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    tableOfContents: [
      { id: 'tmt-overview', title: '1. What Fe 550D TMT Rebar Means' },
      { id: 'cement-selection', title: '2. OPC vs PPC: Which to Use Where' },
      { id: 'coastal-corrosion', title: '3. Coastal Anti-Corrosion Treatment' },
      { id: 'quality-testing', title: '4. On-Site Batch Testing Protocol' },
    ],
    content: [
      {
        sectionId: 'tmt-overview',
        heading: '1. What Fe 550D TMT Rebar Means',
        paragraphs: [
          'In seismic zones III and IV (which encompass Mumbai, Pune, and Delhi NCR), structural resilience demands high ductility. Fe 550D rebars provide superior elongation (minimum 14.5%) combined with high yield strength (550 N/mm²), dissipating earthquake shockwaves without brittle fractures.',
        ],
        callout:
          'Quality Note: Always verify the embossed BIS ISI mark and manufacturer batch identification tag on every bundle delivered to the site.',
      },
      {
        sectionId: 'cement-selection',
        heading: '2. OPC vs PPC: Which to Use Where',
        paragraphs: [
          'Use 53-Grade Ordinary Portland Cement (OPC) for high-load columns, pre-stressed concrete, and fast formwork stripping. For plastering, brick masonry, and coastal foundations, Portland Pozzolana Cement (PPC) offers lower heat of hydration and superior impermeability against saline groundwater.',
        ],
      },
      {
        sectionId: 'coastal-corrosion',
        heading: '3. Coastal Anti-Corrosion Treatment',
        paragraphs: [
          'Projects within 5 km of the Arabian Sea should deploy Corrosion Resistant Steel (CRS) or epoxy-coated rebars to prevent subterranean chloride degradation.',
        ],
      },
      {
        sectionId: 'quality-testing',
        heading: '4. On-Site Batch Testing Protocol',
        paragraphs: [
          'Never pour concrete without performing standard slump cone tests for workability and 7-day / 28-day cube compression crushing tests in an accredited NABL laboratory.',
        ],
      },
    ],
    relatedSlugs: ['mumbai-real-estate-appreciation-trends-2026'],
  },
];

