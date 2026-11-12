'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Waves,
  Dumbbell,
  TreePine,
  Film,
  Sparkles,
  Trophy,
  Gamepad2,
  Laptop,
  Building2,
  Zap,
  ShieldCheck,
  Car,
  Maximize2,
  SlidersHorizontal,
  Grid,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface AmenitiesSliderProps {
  amenities: string[];
  propertyName?: string;
}

interface AmenityItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const AMENITY_META_MAP: Array<{
  keywords: string[];
  category: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}> = [
  {
    keywords: ['pool', 'swimming', 'jacuzzi', 'water', 'lap pool', 'aquatics'],
    category: 'Aquatics & Leisure',
    description: 'Temperature-controlled infinity pool with wooden sundeck, private cabanas, and poolside loungers.',
    image: '/images/amenities/swimming-pool.jpg',
    icon: <Waves className="w-4 h-4" />,
  },
  {
    keywords: ['club', 'clubhouse', 'community', 'banquet', 'hall'],
    category: 'Clubhouse & Social',
    description: 'Grand architectural clubhouse featuring banquet spaces, multipurpose recreation, and private party lawns.',
    image: '/images/amenities/clubhouse.jpg',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    keywords: ['gym', 'gymnasium', 'fitness', 'yoga', 'aerobics', 'meditation'],
    category: 'Health & Fitness',
    description: 'State-of-the-art fitness center with Olympic-grade strength training, cardio stations, and yoga studio.',
    image: '/images/amenities/gymnasium.jpg',
    icon: <Dumbbell className="w-4 h-4" />,
  },
  {
    keywords: ['garden', 'park', 'green', 'lawn', 'boardwalk', 'forest', 'trail', 'miyawaki', 'nature', 'landscape'],
    category: 'Landscape & Greenery',
    description: 'Serene botanical gardens, shaded timber boardwalks, and tranquil reflexology walking paths.',
    image: '/images/amenities/garden.jpg',
    icon: <TreePine className="w-4 h-4" />,
  },
  {
    keywords: ['theatre', 'cinema', 'screening', 'movie', 'auditorium'],
    category: 'Entertainment',
    description: 'Private 24-seater screening theater with Dolby Atmos acoustic soundproofing and luxury recliners.',
    image: '/images/amenities/theatre.jpg',
    icon: <Film className="w-4 h-4" />,
  },
  {
    keywords: ['spa', 'wellness', 'sauna', 'steam', 'massage', 'hammam', 'jacuzzi'],
    category: 'Wellness & Therapy',
    description: 'Holistic rejuvenation spa sanctuary featuring herbal steam, Finnish sauna, and hydrotherapy suites.',
    image: '/images/amenities/spa-wellness.jpg',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    keywords: ['court', 'tennis', 'squash', 'badminton', 'cricket', 'sports', 'track', 'turf', 'futsal', 'basketball'],
    category: 'Sports Arena',
    description: 'International tournament regulation sports courts with all-weather synthetic surfaces and floodlights.',
    image: '/images/amenities/sports-court.jpg',
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    keywords: ['kids', 'children', 'play', 'creche', 'toddler', 'park'],
    category: 'Family & Children',
    description: 'Soft-padded children play park with sensory slides, swings, sandbox, and CCTV safety monitoring.',
    image: '/images/amenities/kids-play.jpg',
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    keywords: ['work', 'working', 'coworking', 'business', 'office', 'pod', 'conference'],
    category: 'Business & Co-Working',
    description: 'Quiet executive work pods, high-speed leased line WiFi, conference suites, and meeting rooms.',
    image: '/images/amenities/co-working.jpg',
    icon: <Laptop className="w-4 h-4" />,
  },
  {
    keywords: ['sky', 'lounge', 'deck', 'observatory', 'rooftop', 'view'],
    category: 'Sky Residences & Views',
    description: 'Panoramic rooftop sky lounge and observatory deck offering 360-degree city and horizon views.',
    image: '/images/amenities/sky-lounge.jpg',
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    keywords: ['ev', 'charging', 'electric', 'charger', 'pod'],
    category: 'Smart Mobility',
    description: 'Dedicated high-speed EV charging bays with automated billing and compatibility for all electric vehicles.',
    image: '/images/amenities/ev-charging.jpg',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    keywords: ['parking', 'garage', 'valet', 'car park', 'basement'],
    category: 'Parking & Transit',
    description: 'Multi-level covered car parking with automated sensor access, wide driveways, and dedicated visitor bays.',
    image: '/images/amenities/ev-charging.jpg',
    icon: <Car className="w-4 h-4" />,
  },
  {
    keywords: ['security', 'cctv', 'surveillance', 'intercom', 'gate', 'guard', 'smart access'],
    category: '24x7 Security & Safety',
    description: 'Multi-tier smart security with 24x7 CCTV command center, biometric access control, and RFID booms.',
    image: '/images/amenities/security.jpg',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

const FALLBACK_IMAGES = [
  '/images/amenities/swimming-pool.jpg',
  '/images/amenities/clubhouse.jpg',
  '/images/amenities/gymnasium.jpg',
  '/images/amenities/garden.jpg',
  '/images/amenities/theatre.jpg',
  '/images/amenities/spa-wellness.jpg',
  '/images/amenities/sports-court.jpg',
  '/images/amenities/sky-lounge.jpg',
];

function resolveAmenity(name: string, index: number): AmenityItem {
  const lower = name.toLowerCase();
  for (const meta of AMENITY_META_MAP) {
    if (meta.keywords.some((kw) => lower.includes(kw))) {
      return {
        id: `amenity-${index}`,
        name,
        category: meta.category,
        description: meta.description,
        image: meta.image,
        icon: meta.icon,
      };
    }
  }

  // Fallback
  const fallbackImg = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  return {
    id: `amenity-${index}`,
    name,
    category: 'Exclusive Lifestyle',
    description: 'Bespoke lifestyle amenity curated to elevate everyday convenience and luxury living.',
    image: fallbackImg,
    icon: <Sparkles className="w-4 h-4" />,
  };
}

export function AmenitiesSlider({ amenities, propertyTitle }: AmenitiesSliderProps & { propertyTitle?: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

  const resolvedAmenities: AmenityItem[] = React.useMemo(() => {
    return (amenities || []).map((amenity, idx) => resolveAmenity(amenity, idx));
  }, [amenities]);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [resolvedAmenities]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 320;
    const scrollAmount = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  if (!resolvedAmenities || resolvedAmenities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-brand-text">Amenities &amp; Facilities</h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-red-light text-brand-red">
              {resolvedAmenities.length} Curated
            </span>
          </div>
          <p className="text-xs text-brand-text-secondary mt-1">
            Explore world-class wellness, leisure, and recreational amenities designed for refined living.
          </p>
        </div>

        {/* View Toggle & Slider Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center bg-brand-bg rounded-button p-0.5 border border-brand-border text-xs">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={cn(
                'px-2.5 py-1 rounded-[6px] font-medium transition flex items-center gap-1.5',
                viewMode === 'slider'
                  ? 'bg-white text-brand-text shadow-xs font-bold'
                  : 'text-brand-text-secondary hover:text-brand-text'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Slider
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'px-2.5 py-1 rounded-[6px] font-medium transition flex items-center gap-1.5',
                viewMode === 'grid'
                  ? 'bg-white text-brand-text shadow-xs font-bold'
                  : 'text-brand-text-secondary hover:text-brand-text'
              )}
            >
              <Grid className="w-3.5 h-3.5" />
              Grid
            </button>
          </div>

          {viewMode === 'slider' && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-brand-border">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={cn(
                  'w-8 h-8 rounded-full border flex items-center justify-center transition',
                  canScrollLeft
                    ? 'border-brand-border bg-white text-brand-text hover:bg-brand-red hover:text-white hover:border-brand-red shadow-xs'
                    : 'border-brand-border/40 bg-brand-bg text-brand-text-secondary/40 cursor-not-allowed'
                )}
                aria-label="Previous amenities"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={cn(
                  'w-8 h-8 rounded-full border flex items-center justify-center transition',
                  canScrollRight
                    ? 'border-brand-border bg-white text-brand-text hover:bg-brand-red hover:text-white hover:border-brand-red shadow-xs'
                    : 'border-brand-border/40 bg-brand-bg text-brand-text-secondary/40 cursor-not-allowed'
                )}
                aria-label="Next amenities"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slider View Mode */}
      {viewMode === 'slider' ? (
        <div className="relative group/slider">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 px-0.5 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {resolvedAmenities.map((amenity) => (
              <div
                key={amenity.id}
                onClick={() => setSelectedAmenity(amenity)}
                className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start bg-brand-bg rounded-card border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
              >
                {/* Image Container with high-res photography */}
                <div className="relative w-full h-44 bg-brand-border/30 overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.name}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Gradient for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/15">
                      {amenity.icon}
                      {amenity.category}
                    </span>
                  </div>

                  {/* Zoom Preview Hint on Hover */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-full bg-white/90 text-brand-text hover:text-brand-red backdrop-blur-xs shadow-sm flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Title overlay at the base of the image */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h4 className="text-sm font-bold text-white leading-tight drop-shadow-sm group-hover:text-brand-red-light transition-colors">
                      {amenity.name}
                    </h4>
                  </div>
                </div>

                {/* Card Description Footer */}
                <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-xs text-brand-text-secondary leading-relaxed line-clamp-2">
                    {amenity.description}
                  </p>
                  <div className="pt-2.5 mt-2.5 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-semibold text-brand-red">
                    <span>View Amenity Specs</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {resolvedAmenities.map((item, idx) => (
              <span
                key={item.id}
                className="w-1.5 h-1.5 rounded-full bg-brand-border transition-all"
                title={item.name}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Grid View Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {resolvedAmenities.map((amenity) => (
            <div
              key={amenity.id}
              onClick={() => setSelectedAmenity(amenity)}
              className="rounded-card border border-brand-border overflow-hidden bg-white hover:shadow-card-hover transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative w-full h-36 bg-brand-bg overflow-hidden">
                <Image
                  src={amenity.image}
                  alt={amenity.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/15">
                    {amenity.icon}
                    {amenity.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <h4 className="text-sm font-bold text-white drop-shadow-sm group-hover:text-brand-red-light transition-colors">
                    {amenity.name}
                  </h4>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-brand-text-secondary leading-relaxed line-clamp-2">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Amenity Detail Modal */}
      {selectedAmenity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
          onClick={() => setSelectedAmenity(null)}
        >
          <div
            className="bg-white rounded-card max-w-lg w-full overflow-hidden shadow-2xl border border-brand-border relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-64 bg-black">
              <Image
                src={selectedAmenity.image}
                alt={selectedAmenity.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <button
                type="button"
                onClick={() => setSelectedAmenity(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center text-sm font-bold transition"
                aria-label="Close modal"
              >
                &times;
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-red text-white mb-2 shadow-xs">
                  {selectedAmenity.icon}
                  {selectedAmenity.category}
                </span>
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {selectedAmenity.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider block">
                  Amenity Specification
                </span>
                <p className="text-sm text-brand-text leading-relaxed mt-1">
                  {selectedAmenity.description}
                </p>
              </div>

              <div className="bg-brand-bg p-3.5 rounded-lg border border-brand-border text-xs text-brand-text-secondary flex items-center justify-between">
                <span>Part of {propertyTitle || 'BricksBazar Luxury Residences'}</span>
                <span className="font-bold text-brand-success flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Operational &amp; Maintained
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAmenity(null)}
                className="w-full py-2.5 rounded-button text-xs font-bold bg-brand-text text-white hover:bg-brand-red transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

