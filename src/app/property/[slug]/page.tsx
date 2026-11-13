'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getPropertyBySlug, MOCK_PROPERTIES } from '@/mocks';
import { PropertyConfiguration } from '@/types';
import { cn, formatINR, formatArea, calculatePricePerSqFt } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { PropertyCard } from '@/components/common/PropertyCard';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { AmenitiesSlider } from '@/components/property/AmenitiesSlider';
import { LocationWithMap } from '@/components/property/LocationWithMap';
import { FloorPlanSection } from '@/components/property/FloorPlanSection';
import {
  MapPin,
  Heart,
  Share2,
  Calendar,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Clock,
  Sparkles,
  Maximize,
  Compass,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const property = getPropertyBySlug(slug);
  const { success, info } = useToast();

  if (!property) {
    notFound();
  }

  // Configurations selection (e.g. 3 BHK vs 4 BHK)
  const [selectedConfigId, setSelectedConfigId] = useState<string>(
    property.configurations?.[0]?.id || 'default'
  );

  const activeConfig = useMemo(() => {
    return property.configurations?.find((c) => c.id === selectedConfigId) || null;
  }, [property.configurations, selectedConfigId]);

  // Dynamic pricing based on active config
  const currentPrice = activeConfig ? activeConfig.price : property.price;
  const currentCarpetArea = activeConfig ? activeConfig.carpetArea : property.carpetArea;
  const currentSuperBuiltUpArea = activeConfig ? activeConfig.superBuiltUpArea : property.superBuiltUpArea;
  const currentBhk = activeConfig ? activeConfig.bhk : property.bhk;
  const isRent = property.listingType === 'rent';

  // UI States
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [siteVisitModalOpen, setSiteVisitModalOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      success('Link Copied', 'Property link copied to clipboard.');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) success('Saved to Shortlist');
    else info('Removed from Shortlist');
  };

  const similarProperties = useMemo(() => {
    const strictMatches = MOCK_PROPERTIES.filter((p) => {
      if (p.id === property.id) return false;
      if (p.listingType !== property.listingType) return false;
      if (p.location.city.toLowerCase() !== property.location.city.toLowerCase()) return false;
      const ratio = p.price / property.price;
      return ratio >= 0.5 && ratio <= 1.8;
    });
    if (strictMatches.length >= 3) return strictMatches.slice(0, 3);
    const cityMatches = MOCK_PROPERTIES.filter(
      (p) => p.id !== property.id && p.listingType === property.listingType && p.location.city.toLowerCase() === property.location.city.toLowerCase()
    );
    return cityMatches.slice(0, 3);
  }, [property]);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* 1. Header & Breadcrumb Bar */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Properties', href: '/properties' },
              { label: property.location.city, href: `/buy?city=${property.location.city}` },
              { label: property.location.locality, href: `/buy?city=${property.location.city}` },
              { label: property.title },
            ]}
          />

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              className="gap-1.5 text-xs"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isFavorited ? 'fill-brand-red text-brand-red' : ''}`}
              />
              {isFavorited ? 'Shortlisted' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Image Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative rounded-xl overflow-hidden bg-brand-bg border border-brand-border shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-[340px] sm:h-[460px]">
            {/* Main Primary Image */}
            <div
              className={cn(
                'relative h-full cursor-pointer group overflow-hidden',
                property.images.length > 1 ? 'lg:col-span-2' : 'lg:col-span-3'
              )}
              onClick={() => {
                setGalleryStartIndex(0);
                setIsGalleryOpen(true);
              }}
            >
              <Image
                src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {property.isVerified && property.reraId && (
                  <a
                    href={property.location.city.toLowerCase() === 'bengaluru' ? 'https://rera.karnataka.gov.in/' : 'https://maharera.maharashtra.gov.in/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/95 text-white backdrop-blur-sm shadow-sm hover:bg-emerald-700 transition"
                    title={`Verified on ${property.reraVerificationSource || 'MahaRERA Public Registry'} on ${property.reraVerifiedOn || '2026-03-15'}`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>RERA: {property.reraId}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                  </a>
                )}
                {property.isFeatured && <Badge variant="featured">Featured Listing</Badge>}
              </div>
            </div>

            {/* Side Thumbnail Stack */}
            {property.images.length > 1 && (
              <div
                className={cn(
                  'hidden lg:grid gap-2 h-full',
                  property.images.length === 2 ? 'grid-rows-1' : 'grid-rows-2'
                )}
              >
                {property.images.slice(1, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-full cursor-pointer group overflow-hidden"
                    onClick={() => {
                      setGalleryStartIndex(idx + 1);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${property.title} gallery thumbnail ${idx + 2}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* View All Photos Overlay Button */}
          <button
            type="button"
            onClick={() => {
              setGalleryStartIndex(0);
              setIsGalleryOpen(true);
            }}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-brand-text font-bold text-xs px-4 py-2 rounded-button shadow-dropdown hover:bg-white transition flex items-center gap-1.5"
          >
            <span>{property.images.length > 1 ? `View All ${property.images.length} Photos` : 'View Photo'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Details & Sticky Enquiry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Specifications, Overview, Amenities, Floor Plans */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Pricing Card */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                      {property.propertyCategory} for {property.listingType === 'rent' ? 'Rent' : 'Sale'}
                    </span>
                    <span className="text-brand-text-muted">&bull;</span>
                    <span className="text-xs font-semibold text-brand-text-secondary">
                      {property.possession}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text leading-snug">
                    {property.title}
                  </h1>

                  <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mt-2">
                    <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{property.location.address}, {property.location.locality}, {property.location.city} - {property.location.pincode}</span>
                  </div>
                </div>

                {/* Dynamic Price Display */}
                <div className="text-left sm:text-right bg-brand-bg sm:bg-transparent p-3 sm:p-0 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-black text-brand-text">
                    {formatINR(currentPrice, isRent)}
                  </div>
                  {!isRent && (
                    <div className="text-xs text-brand-text-secondary mt-0.5">
                      {calculatePricePerSqFt(currentPrice, currentCarpetArea)}
                    </div>
                  )}
                  {property.isNegotiable && (
                    <span className="text-[11px] font-semibold text-brand-success block mt-0.5">
                      Price Negotiable
                    </span>
                  )}
                </div>
              </div>

              {/* Configuration Variant Selector */}
              {property.configurations && property.configurations.length > 1 && (
                <div className="pt-4 border-t border-brand-border space-y-2">
                  <label className="text-xs font-bold text-brand-text uppercase tracking-wider block">
                    Select Configuration Variant
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {property.configurations.map((cfg) => {
                      const isSelected = cfg.id === selectedConfigId;
                      return (
                        <button
                          key={cfg.id}
                          type="button"
                          onClick={() => setSelectedConfigId(cfg.id)}
                          className={cn(
                            'px-4 py-2 rounded-button text-xs font-bold border transition text-left',
                            isSelected
                              ? 'bg-brand-red text-white border-brand-red shadow-sm'
                              : 'bg-white text-brand-text border-brand-border hover:bg-brand-bg'
                          )}
                        >
                          <div>{cfg.bhk} ({cfg.carpetArea} sq.ft)</div>
                          <div className={cn('text-[11px] font-normal', isSelected ? 'text-white/90' : 'text-brand-text-secondary')}>
                            {formatINR(cfg.price, isRent)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Quick Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-brand-border text-center">
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Configuration</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{currentBhk}</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Carpet Area</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{formatArea(currentCarpetArea)}</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Furnishing</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{property.furnishing}</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Possession</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{property.possession}</span>
                </div>
              </div>
            </div>

            {/* Detailed Overview Table */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-brand-text border-b border-brand-border pb-3">
                Property Overview & Specs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="text-brand-text-secondary block">Super Built-Up Area</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{formatArea(currentSuperBuiltUpArea)}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Floor Level</span>
                  <span className="font-bold text-brand-text mt-0.5 block">
                    {property.floorNumber ? `${property.floorNumber} of ${property.totalFloors} Floors` : 'Ground Floor'}
                  </span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Facing / Vastu</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{property.facing || 'East Facing'}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Property Age</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{property.propertyAge || 'Brand New'}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">RERA Registration</span>
                  {property.reraId ? (
                    <a
                      href={property.location.city.toLowerCase() === 'bengaluru' ? 'https://rera.karnataka.gov.in/' : 'https://maharera.maharashtra.gov.in/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-brand-red hover:underline mt-0.5 inline-flex items-center gap-1"
                      title="Verify on official government RERA portal"
                    >
                      <span>{property.reraId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-bold text-brand-text mt-0.5 block">Not Applicable</span>
                  )}
                  {property.reraVerifiedOn && (
                    <span className="text-[10px] text-emerald-700 block font-medium mt-0.5">
                      Verified on {property.reraVerifiedOn}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Posted By</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{property.postedBy}</span>
                </div>
              </div>
            </div>

            {/* Architectural Floor Plans & Layouts */}
            <FloorPlanSection
              configurations={property.configurations}
              selectedConfigId={selectedConfigId}
              onSelectConfig={setSelectedConfigId}
              defaultBhk={currentBhk}
              defaultCarpetArea={currentCarpetArea}
              defaultSuperBuiltUpArea={currentSuperBuiltUpArea}
              defaultPrice={currentPrice}
              isRent={isRent}
              propertyTitle={property.title}
              onScheduleVisit={() => setSiteVisitModalOpen(true)}
            />

            {/* Key Highlights & Description */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-brand-text border-b border-brand-border pb-3">
                Key Highlights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-brand-text">
                    <CheckCircle2 className="w-4 h-4 text-brand-success flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-sm font-bold text-brand-text pt-4 border-t border-brand-border">
                Property Description
              </h4>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities & Facilities Images Slider */}
            <AmenitiesSlider
              amenities={property.amenities}
              propertyTitle={property.title}
            />

            {/* Location Advantages & Infrastructure with Interactive Map */}
            <LocationWithMap
              location={property.location}
              propertyTitle={property.title}
            />
          </div>

          {/* Right Column: Sticky Enquiry & Consultant Card */}
          <div className="space-y-6">
            {/* Sticky Lead Form Card */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              {/* Consultant Profile Pill */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-brand-border">
                <div className="w-12 h-12 rounded-full bg-brand-red-light text-brand-red font-bold text-base flex items-center justify-center flex-shrink-0">
                  {property.ownerOrAgent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-brand-text">
                      {property.ownerOrAgent.name}
                    </span>
                    {property.ownerOrAgent.isVerified && (
                      <Badge variant="verified" size="sm">Verified</Badge>
                    )}
                  </div>
                  <span className="text-xs text-brand-text-secondary block">
                    {property.ownerOrAgent.agencyName || `Direct Property ${property.postedBy}`}
                  </span>
                </div>
              </div>

              {/* Listing Source Disclosure Banner */}
              <div className="text-[11px] px-3.5 py-2.5 rounded-lg bg-brand-bg border border-brand-border text-brand-text-secondary leading-snug">
                {property.postedBy === 'Owner' && (
                  <span>
                    <strong className="text-emerald-700 font-semibold">Direct Owner Listing:</strong> Connect directly with the property owner with zero intermediary brokerage fees.
                  </span>
                )}
                {(property.postedBy === 'Builder' || property.postedBy === 'Developer') && (
                  <span>
                    <strong className="text-blue-700 font-semibold">Developer Direct Sales:</strong> Listed directly by the project promoter. Official builder pricing with zero buyer brokerage.
                  </span>
                )}
                {property.postedBy === 'Agent' && (
                  <span>
                    <strong className="text-brand-text font-semibold">RERA Registered Agent Listing:</strong> Marketed by a licensed real estate consultant. Professional advisory and standard brokerage apply as per RERA guidelines.
                  </span>
                )}
              </div>

              {/* Dynamic Price Reminder in Widget */}
              <div className="bg-brand-bg p-3.5 rounded-lg border border-brand-border">
                <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">
                  Selected Price
                </span>
                <span className="text-xl font-extrabold text-brand-text block">
                  {formatINR(currentPrice, isRent)}
                </span>
                <span className="text-xs text-brand-text-secondary mt-0.5 block">
                  {currentBhk} &bull; {currentCarpetArea} sq.ft
                </span>
              </div>

              {/* Direct Schedule Visit CTA */}
              <Button
                variant="outline"
                className="w-full text-xs font-bold gap-1.5"
                onClick={() => setSiteVisitModalOpen(true)}
              >
                <Calendar className="w-4 h-4 text-brand-red" />
                Schedule Physical Site Visit
              </Button>

              {/* Lead Capture Form */}
              <EnquiryForm
                propertyOrItemTitle={property.title}
                recipientName={property.ownerOrAgent.name}
                recipientRole={`Posted by ${property.postedBy}`}
              />
            </div>
          </div>
        </div>

        {/* 4. Similar Properties Grid */}
        {similarProperties.length > 0 && (
          <div className="pt-16 mt-16 border-t border-brand-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text">
                  Similar Properties in {property.location.city}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary mt-0.5">
                  Handpicked homes with similar budget and BHK specifications
                </p>
              </div>
              <Link
                href={`/buy?city=${property.location.city}`}
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                View More in {property.location.city} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Architectural Image Gallery Modal */}
      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={property.images}
        title={property.title}
        initialIndex={galleryStartIndex}
      />

      {/* Schedule Site Visit Modal */}
      <Modal
        isOpen={siteVisitModalOpen}
        onClose={() => setSiteVisitModalOpen(false)}
        title="Schedule Private Site Visit"
        description={property.title}
      >
        <EnquiryForm
          propertyOrItemTitle={`Physical Site Visit: ${property.title}`}
          recipientName={property.ownerOrAgent.name}
          recipientRole={`Consultant (${property.postedBy})`}
          onSuccess={() => setSiteVisitModalOpen(false)}
        />
      </Modal>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-brand-border p-3 flex items-center justify-between gap-3 lg:hidden z-40 shadow-dropdown">
        <div>
          <span className="text-[10px] text-brand-text-secondary block">Price</span>
          <span className="font-extrabold text-base text-brand-text leading-tight block">
            {formatINR(currentPrice, isRent)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSiteVisitModalOpen(true)}
          >
            Visit
          </Button>
          <Button
            size="sm"
            onClick={() => setSiteVisitModalOpen(true)}
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
