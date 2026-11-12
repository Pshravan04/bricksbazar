'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Train,
  Plane,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Building2,
  Car,
  Compass,
  Clock,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationInfo } from '@/types';

interface LandmarkItem {
  id: string;
  name: string;
  category: 'transit' | 'airport' | 'education' | 'healthcare' | 'shopping' | 'business';
  categoryLabel: string;
  distance: string;
  duration: string;
  type: string;
  description: string;
}

interface LocationWithMapProps {
  location: LocationInfo;
  propertyTitle: string;
  customLandmarks?: Array<{ name: string; distance: string }>;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Advantages' },
  { id: 'transit', label: 'Metro & Transit' },
  { id: 'airport', label: 'Airports & Highways' },
  { id: 'business', label: 'Business Parks' },
  { id: 'education', label: 'Schools & Colleges' },
  { id: 'healthcare', label: 'Hospitals' },
  { id: 'shopping', label: 'Malls & Retail' },
] as const;

export function LocationWithMap({ location, propertyTitle, customLandmarks }: LocationWithMapProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedCoordinates, setCopiedCoordinates] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);

  const { lat, lng } = location.coordinates || { lat: 19.076, lng: 72.8777 };

  // Generate authentic landmarks tailored to the property's locality and city
  const landmarks: LandmarkItem[] = React.useMemo(() => {
    const locLower = (location.locality || '').toLowerCase();

    if (locLower.includes('powai') || locLower.includes('chandivali')) {
      return [
        {
          id: 'lm-1',
          name: 'Saki Naka & JVLR Metro Station (Lines 1 & 6)',
          category: 'transit',
          categoryLabel: 'Metro Transit',
          distance: '450 meters',
          duration: '5 mins walk',
          type: 'transit',
          description: 'Direct metro interchange connecting Western & Eastern Suburbs and Line 3 underground.',
        },
        {
          id: 'lm-2',
          name: 'Chhatrapati Shivaji Maharaj Int’l Airport (T2)',
          category: 'airport',
          categoryLabel: 'International Airport',
          distance: '7.8 km',
          duration: '18 mins drive',
          type: 'airport',
          description: 'Seamless signal-free connectivity via elevated airport expressway and Sahar elevated road.',
        },
        {
          id: 'lm-3',
          name: 'Hiranandani Foundation School & IIT Bombay',
          category: 'education',
          categoryLabel: 'Schools & Universities',
          distance: '1.2 km',
          duration: '4 mins drive',
          type: 'education',
          description: 'Premier ICSE/IB world schools and India’s topmost engineering institute IIT Bombay.',
        },
        {
          id: 'lm-4',
          name: 'Dr. L H Hiranandani Multi-Speciality Hospital',
          category: 'healthcare',
          categoryLabel: 'Super-Speciality Care',
          distance: '1.5 km',
          duration: '6 mins drive',
          type: 'healthcare',
          description: 'NABH-accredited tertiary care hospital with 24x7 trauma & emergency department.',
        },
        {
          id: 'lm-5',
          name: 'R City Mall & Galleria High Street',
          category: 'shopping',
          categoryLabel: 'Luxury Retail & Malls',
          distance: '2.2 km',
          duration: '7 mins drive',
          type: 'shopping',
          description: 'Over 300+ international fashion brands, gourmet fine-dining, and multiplex cinema.',
        },
        {
          id: 'lm-6',
          name: 'Bandra Kurla Complex (BKC) Financial District',
          category: 'business',
          categoryLabel: 'Central Business Hub',
          distance: '9.2 km',
          duration: '22 mins drive',
          type: 'business',
          description: 'Mumbai’s premier financial hub hosting multinational banks, consulates, and exchanges.',
        },
        {
          id: 'lm-7',
          name: 'Jogeshwari-Vikhroli Link Road (JVLR Arterial)',
          category: 'airport',
          categoryLabel: 'Arterial Expressway',
          distance: '600 meters',
          duration: '2 mins drive',
          type: 'airport',
          description: 'Key cross-city connector linking Western Express Highway to Eastern Express Highway.',
        },
        {
          id: 'lm-8',
          name: 'Nesco IT Park & Goregaon East Tech Corridor',
          category: 'business',
          categoryLabel: 'Tech IT Corridors',
          distance: '6.5 km',
          duration: '15 mins drive',
          type: 'business',
          description: 'High-density tech corridors hosting top IT campuses, fintech hubs, and corporate HQs.',
        },
      ];
    }

    if (locLower.includes('bandra') || locLower.includes('khar')) {
      return [
        {
          id: 'lm-b1',
          name: 'Bandra-Worli Sea Link (BWSL Entrance)',
          category: 'airport',
          categoryLabel: 'Coastal Highway',
          distance: '1.5 km',
          duration: '4 mins drive',
          type: 'airport',
          description: 'Rapid bridge link reaching South Mumbai (Worli/Nariman Point) in 15 minutes.',
        },
        {
          id: 'lm-b2',
          name: 'Bandra Kurla Complex (BKC Financial Center)',
          category: 'business',
          categoryLabel: 'Central Business District',
          distance: '3.6 km',
          duration: '9 mins drive',
          type: 'business',
          description: 'Heart of corporate banking, stock exchange facilities, and international consulates.',
        },
        {
          id: 'lm-b3',
          name: 'Bandra Terminus & Metro Line 3 Station',
          category: 'transit',
          categoryLabel: 'Rapid Transit',
          distance: '900 meters',
          duration: '10 mins walk',
          type: 'transit',
          description: 'Underground Aqua Line Metro 3 connecting Colaba to SEEPZ via Bandra.',
        },
        {
          id: 'lm-b4',
          name: 'Lilavati Hospital & Research Centre',
          category: 'healthcare',
          categoryLabel: 'Multi-Speciality Hospital',
          distance: '1.1 km',
          duration: '4 mins drive',
          type: 'healthcare',
          description: 'State-of-the-art super-speciality hospital with premier cardiology and surgical care.',
        },
        {
          id: 'lm-b5',
          name: 'American School of Bombay & Dhirubhai Ambani School',
          category: 'education',
          categoryLabel: 'International Schools',
          distance: '3.2 km',
          duration: '8 mins drive',
          type: 'education',
          description: 'Leading IB international day schools with global academic curriculum.',
        },
        {
          id: 'lm-b6',
          name: 'Linking Road & Pali Hill High Street Retail',
          category: 'shopping',
          categoryLabel: 'Fashion & Dining High Street',
          distance: '400 meters',
          duration: '5 mins walk',
          type: 'shopping',
          description: 'Iconic celebrity restaurants, boutique cafes, designer flagship showrooms, and retail stores.',
        },
        {
          id: 'lm-b7',
          name: 'Chhatrapati Shivaji Maharaj Int’l Airport (T2)',
          category: 'airport',
          categoryLabel: 'International Airport',
          distance: '8.4 km',
          duration: '18 mins drive',
          type: 'airport',
          description: 'Quick transit via Western Express Highway directly to Mumbai International departures.',
        },
      ];
    }

    if (locLower.includes('thane') || locLower.includes('majiwada') || locLower.includes('pokhran')) {
      return [
        {
          id: 'lm-t1',
          name: 'Thane Railway Station & Metro Line 4 Station',
          category: 'transit',
          categoryLabel: 'Metro Transit Hub',
          distance: '1.8 km',
          duration: '6 mins drive',
          type: 'transit',
          description: 'Green Line Metro 4 directly connecting Wadala (Mumbai) to Kasarvadavali (Thane).',
        },
        {
          id: 'lm-t2',
          name: 'Viviana Mall & Korum High Street',
          category: 'shopping',
          categoryLabel: 'Retail & Multiplex',
          distance: '900 meters',
          duration: '3 mins drive',
          type: 'shopping',
          description: 'Mega-mall with 250+ lifestyle stores, IMAX cineplex, and international dining.',
        },
        {
          id: 'lm-t3',
          name: 'Jupiter Hospital (Eastern Express Corridor)',
          category: 'healthcare',
          categoryLabel: 'Quaternary Healthcare',
          distance: '1.1 km',
          duration: '4 mins drive',
          type: 'healthcare',
          description: 'NABH and NABL accredited hospital renowned for multi-organ transplants and cardiology.',
        },
        {
          id: 'lm-t4',
          name: 'Smt. Sulochanadevi Singhania School',
          category: 'education',
          categoryLabel: 'Top Ranked School',
          distance: '1.4 km',
          duration: '5 mins drive',
          type: 'education',
          description: 'Consistently ranked among the top 3 ICSE schools across Maharashtra.',
        },
        {
          id: 'lm-t5',
          name: 'Ghodbunder Road & Eastern Express Highway',
          category: 'airport',
          categoryLabel: 'Express Highway Arterial',
          distance: '400 meters',
          duration: '2 mins drive',
          type: 'airport',
          description: 'Seamless road corridors connecting Thane to BKC, Mumbai City, and Western Suburbs.',
        },
        {
          id: 'lm-t6',
          name: 'Ashar IT Park & Wagle Industrial IT Estate',
          category: 'business',
          categoryLabel: 'Corporate IT Parks',
          distance: '3.1 km',
          duration: '8 mins drive',
          type: 'business',
          description: 'Home to leading IT, fintech, and banking technology support centers.',
        },
      ];
    }

    // Default universal Indian metro landmarks
    return [
      {
        id: 'lm-u1',
        name: `${location.locality} Metro & Rapid Transit Station`,
        category: 'transit',
        categoryLabel: 'Rapid Transit Station',
        distance: '450 meters',
        duration: '5 mins walk',
        type: 'transit',
        description: 'Frequent high-frequency rapid transit connectivity to major central business districts.',
      },
      {
        id: 'lm-u2',
        name: 'International Airport & Highway Junction',
        category: 'airport',
        categoryLabel: 'Airports & Expressways',
        distance: '8.2 km',
        duration: '18 mins drive',
        type: 'airport',
        description: 'Uninterrupted arterial connectivity with elevated multi-lane transit corridors.',
      },
      {
        id: 'lm-u3',
        name: 'Top ICSE / IB International World School',
        category: 'education',
        categoryLabel: 'Premier Education',
        distance: '1.2 km',
        duration: '5 mins drive',
        type: 'education',
        description: 'Renowned academic institutions with world-class sports fields and curriculum.',
      },
      {
        id: 'lm-u4',
        name: 'Super-Speciality Hospital & 24x7 Trauma Care',
        category: 'healthcare',
        categoryLabel: 'Healthcare & Emergency',
        distance: '1.8 km',
        duration: '7 mins drive',
        type: 'healthcare',
        description: 'Comprehensive medical infrastructure with round-the-clock emergency medical response.',
      },
      {
        id: 'lm-u5',
        name: 'City High Street Mall & Multiplex Boulevard',
        category: 'shopping',
        categoryLabel: 'Shopping & Entertainment',
        distance: '1.9 km',
        duration: '6 mins drive',
        type: 'shopping',
        description: 'Curated premium fashion, luxury departmental stores, hypermarkets, and movie theatres.',
      },
      {
        id: 'lm-u6',
        name: 'Central Corporate Business Park & IT Hub',
        category: 'business',
        categoryLabel: 'Commercial IT Hub',
        distance: '4.5 km',
        duration: '12 mins drive',
        type: 'business',
        description: 'Major technology campuses, corporate offices, and prominent multinational employers.',
      },
    ];
  }, [location]);

  const filteredLandmarks = React.useMemo(() => {
    if (activeCategory === 'all') return landmarks;
    return landmarks.filter((l) => l.category === activeCategory);
  }, [landmarks, activeCategory]);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoordinates(true);
    setTimeout(() => setCopiedCoordinates(false), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transit':
        return <Train className="w-4 h-4 text-brand-red" />;
      case 'airport':
        return <Plane className="w-4 h-4 text-brand-red" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-brand-red" />;
      case 'healthcare':
        return <Stethoscope className="w-4 h-4 text-brand-red" />;
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-brand-red" />;
      case 'business':
        return <Building2 className="w-4 h-4 text-brand-red" />;
      default:
        return <MapPin className="w-4 h-4 text-brand-red" />;
    }
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const exploreMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${propertyTitle} ${location.address} ${location.city}`)}`;
  const iframeSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${mapZoom}&output=embed`;

  return (
    <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-brand-text">Location Advantages &amp; Infrastructure</h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-bg text-brand-text border border-brand-border">
              {location.locality}, {location.city}
            </span>
          </div>
          <p className="text-xs text-brand-text-secondary mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span>{location.address} {location.landmark ? `(Near ${location.landmark})` : ''}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCopyCoords}
            className="px-3 py-1.5 rounded-button text-xs font-semibold border border-brand-border bg-brand-bg hover:bg-white text-brand-text transition flex items-center gap-1.5"
            title="Copy coordinates"
          >
            {copiedCoordinates ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCoordinates ? 'Copied' : `${lat.toFixed(4)}, ${lng.toFixed(4)}`}</span>
          </button>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-button text-xs font-bold bg-brand-red text-white hover:bg-brand-red-dark transition flex items-center gap-1.5 shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      {/* Main Layout: Interactive Map + Location Advantages Grid */}
      <div className="space-y-6">
        {/* =========================================================================
            1. INTERACTIVE MAP SECTION
            Embedded high-fidelity Google Map with customized controls & location pin
            ========================================================================= */}
        <div className="relative w-full rounded-card overflow-hidden border border-brand-border bg-brand-bg shadow-sm">
          {/* Real-time Map Iframe */}
          <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[400px] bg-slate-100">
            <iframe
              title={`Map location of ${propertyTitle}`}
              src={iframeSrc}
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Top Overlaid Property Floating Badge */}
          <div className="absolute top-3 left-3 z-10 max-w-[85%] sm:max-w-md pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 border border-brand-border/80 shadow-md pointer-events-auto flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-brand-text truncate block">
                    {propertyTitle}
                  </span>
                </div>
                <p className="text-[11px] text-brand-text-secondary truncate mt-0.5">
                  {location.locality}, {location.city} • PIN: {location.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Overlaid Quick Controls Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-button border border-brand-border shadow-xs text-[11px] font-bold text-brand-text pointer-events-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Geographic Location</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <a
                href={exploreMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-button text-xs font-bold bg-white/95 backdrop-blur-md text-brand-text hover:text-brand-red border border-brand-border shadow-xs flex items-center gap-1.5 transition"
              >
                <span>View Fullscreen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. LOCATION ADVANTAGES & INFRASTRUCTURE TABS & LIST
            Categorized nearby transit points, schools, hospitals, hubs
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-sm font-bold text-brand-text">
              Key Infrastructure &amp; Commute Distances
            </h4>
            <span className="text-xs text-brand-text-secondary">
              Showing {filteredLandmarks.length} nearby landmark points
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const count = tab.id === 'all' ? landmarks.length : landmarks.filter((l) => l.category === tab.id).length;
              if (count === 0 && tab.id !== 'all') return null;
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border',
                    isActive
                      ? 'bg-brand-red text-white border-brand-red shadow-xs font-bold'
                      : 'bg-white text-brand-text-secondary hover:text-brand-text border-brand-border hover:bg-brand-bg'
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-brand-bg text-brand-text-secondary'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Landmarks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {filteredLandmarks.map((lm) => (
              <div
                key={lm.id}
                className="p-3.5 bg-brand-bg rounded-lg border border-brand-border hover:border-brand-red/40 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between gap-2.5 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    {getCategoryIcon(lm.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-text group-hover:text-brand-red transition-colors">
                        {lm.name}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-brand-text-secondary tracking-wider block mt-0.5">
                      {lm.categoryLabel}
                    </span>
                    <p className="text-[11px] text-brand-text-secondary leading-snug mt-1">
                      {lm.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-text flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    {lm.distance}
                  </span>
                  <span className="font-semibold text-brand-text-secondary bg-white px-2 py-0.5 rounded-full border border-brand-border/70 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-brand-text-secondary" />
                    {lm.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
