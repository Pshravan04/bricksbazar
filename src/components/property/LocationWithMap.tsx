'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { LocationInfo } from '@/types';

interface LandmarkSimple {
  name: string;
  distance: string;
}

interface LocationWithMapProps {
  location: LocationInfo;
  propertyTitle: string;
  customLandmarks?: LandmarkSimple[];
}

export function LocationWithMap({ location, propertyTitle, customLandmarks }: LocationWithMapProps) {
  const [copiedCoordinates, setCopiedCoordinates] = useState(false);

  const { lat, lng } = location.coordinates || { lat: 19.076, lng: 72.8777 };

  // Normal, authentic landmarks tailored to the property's locality and city
  const landmarks: LandmarkSimple[] = React.useMemo(() => {
    if (customLandmarks && customLandmarks.length > 0) {
      return customLandmarks;
    }

    const locLower = (location.locality || '').toLowerCase();

    if (locLower.includes('powai') || locLower.includes('chandivali')) {
      return [
        { name: 'Saki Naka & JVLR Metro Station (Lines 1 & 6)', distance: '450 meters (5 mins walk)' },
        { name: 'Chhatrapati Shivaji Maharaj International Airport (T2)', distance: '7.8 km (18 mins drive)' },
        { name: 'Hiranandani Foundation School & IIT Bombay', distance: '1.2 km (4 mins drive)' },
        { name: 'Dr. L H Hiranandani Multi-Speciality Hospital', distance: '1.5 km (6 mins drive)' },
        { name: 'R City Mall & Galleria High Street Shopping', distance: '2.2 km (7 mins drive)' },
        { name: 'Bandra Kurla Complex (BKC) Financial District', distance: '9.2 km (22 mins drive)' },
        { name: 'Jogeshwari-Vikhroli Link Road (JVLR Arterial)', distance: '600 meters (2 mins drive)' },
      ];
    }

    if (locLower.includes('bandra') || locLower.includes('khar')) {
      return [
        { name: 'Bandra-Worli Sea Link (BWSL Entrance)', distance: '1.5 km (4 mins drive)' },
        { name: 'Bandra Kurla Complex (BKC Financial Center)', distance: '3.6 km (9 mins drive)' },
        { name: 'Bandra Terminus & Metro Line 3 Station', distance: '900 meters (10 mins walk)' },
        { name: 'Lilavati Hospital & Research Centre', distance: '1.1 km (4 mins drive)' },
        { name: 'American School of Bombay & Dhirubhai Ambani School', distance: '3.2 km (8 mins drive)' },
        { name: 'Linking Road & Pali Hill High Street Retail', distance: '400 meters (5 mins walk)' },
        { name: 'Chhatrapati Shivaji Maharaj International Airport (T2)', distance: '8.4 km (18 mins drive)' },
      ];
    }

    if (locLower.includes('thane') || locLower.includes('majiwada') || locLower.includes('pokhran')) {
      return [
        { name: 'Thane Railway Station & Metro Line 4 Station', distance: '1.8 km (6 mins drive)' },
        { name: 'Viviana Mall & Korum High Street', distance: '900 meters (3 mins drive)' },
        { name: 'Jupiter Hospital (Eastern Express Corridor)', distance: '1.1 km (4 mins drive)' },
        { name: 'Smt. Sulochanadevi Singhania School', distance: '1.4 km (5 mins drive)' },
        { name: 'Ghodbunder Road & Eastern Express Highway', distance: '400 meters (2 mins drive)' },
        { name: 'Ashar IT Park & Wagle Industrial IT Estate', distance: '3.1 km (8 mins drive)' },
      ];
    }

    // Default clean normal list
    return [
      { name: 'Metro / Rapid Transit Station', distance: '450 meters (5 mins walk)' },
      { name: 'International Airport (BOM / PNQ / BLR)', distance: '8.2 km (20 mins drive)' },
      { name: 'Top ICSE / IB World School', distance: '1.2 km (6 mins drive)' },
      { name: 'Multi-Speciality Hospital & Emergency Care', distance: '1.8 km (8 mins drive)' },
      { name: 'Luxury High Street Mall & Multiplex', distance: '900 meters (3 mins drive)' },
      { name: 'Central Corporate IT Tech Park / Business District', distance: '3.5 km (10 mins drive)' },
    ];
  }, [location, customLandmarks]);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoordinates(true);
    setTimeout(() => setCopiedCoordinates(false), 2000);
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const exploreMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${propertyTitle} ${location.address} ${location.city}`)}`;
  const iframeSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;

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

      {/* Main Layout: Interactive Map + Normal List */}
      <div className="space-y-6">
        {/* =========================================================================
            1. INTERACTIVE MAP SECTION
            Embedded high-fidelity Google Map with property pin & live controls
            ========================================================================= */}
        <div className="relative w-full rounded-card overflow-hidden border border-brand-border bg-brand-bg shadow-sm">
          {/* Real-time Map Iframe */}
          <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[380px] bg-slate-100">
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
                <span className="text-xs font-bold text-brand-text truncate block">
                  {propertyTitle}
                </span>
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
            2. KEY INFRASTRUCTURE & COMMUTE DISTANCES — NORMAL CLEAN LIST
            ========================================================================= */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand-text">
              Key Infrastructure &amp; Commute Distances
            </h4>
            <span className="text-xs text-brand-text-secondary">
              {landmarks.length} Nearby Landmarks
            </span>
          </div>

          <div className="space-y-2.5">
            {landmarks.map((lm, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-brand-bg rounded-lg border border-brand-border text-xs hover:border-brand-border/80 transition"
              >
                <div className="flex items-center gap-2.5 font-medium text-brand-text">
                  <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>{lm.name}</span>
                </div>
                <span className="font-bold text-brand-text-secondary whitespace-nowrap ml-3">
                  {lm.distance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
