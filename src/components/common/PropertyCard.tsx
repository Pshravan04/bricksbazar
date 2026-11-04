'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { formatINR, formatArea, calculatePricePerSqFt } from '@/lib/utils';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Heart, MapPin, Bed, Maximize, Calendar, Phone, ArrowUpRight, Bath } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PropertyCardProps {
  property: Property;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  onContactClick?: (property: Property) => void;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export function PropertyCard({
  property,
  isFavorited = false,
  onToggleFavorite,
  onContactClick,
  className,
  viewMode = 'grid',
}: PropertyCardProps) {
  const [favorite, setFavorite] = useState(isFavorited);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    if (onToggleFavorite) onToggleFavorite(property.id);
  };

  const isRent = property.listingType === 'rent';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-card border border-brand-border overflow-hidden hover:shadow-card-hover transition-all duration-200 flex flex-col md:flex-row group">
        {/* Image Container */}
        <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0 bg-brand-bg overflow-hidden">
          <Link href={`/property/${property.slug}`} className="block w-full h-full">
            <Image
              src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </Link>

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.isVerified && <Badge variant="verified">Verified</Badge>}
            {property.isFeatured && <Badge variant="featured">Featured</Badge>}
            {property.isDemoRecord && <DemoBadge />}
          </div>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-brand-text hover:text-brand-red transition shadow-sm z-10"
            aria-label="Save to favourites"
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-brand-red text-brand-red' : ''}`} />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wide">
                  {property.propertyCategory}
                </span>
                <span className="text-brand-text-muted">&bull;</span>
                <span className="text-xs text-brand-text-secondary">{property.possession}</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-brand-text">
                  {formatINR(property.price, isRent)}
                </div>
                {!isRent && (
                  <div className="text-[11px] text-brand-text-secondary">
                    {calculatePricePerSqFt(property.price, property.carpetArea)}
                  </div>
                )}
              </div>
            </div>

            <Link href={`/property/${property.slug}`}>
              <h3 className="text-base font-bold text-brand-text group-hover:text-brand-red transition line-clamp-1 mb-2">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mb-4">
              <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
              <span className="truncate">
                {property.location.locality}, {property.location.city}
              </span>
            </div>

            {/* Spec Pills */}
            <div className="flex items-center gap-4 py-2.5 px-3 bg-brand-bg rounded-lg border border-brand-border text-xs text-brand-text font-medium mb-4">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-text-secondary" />
                <span>{property.bhk}</span>
              </div>
              <div className="h-3 w-px bg-brand-border" />
              <div className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4 text-brand-text-secondary" />
                <span>{formatArea(property.carpetArea)}</span>
              </div>
              <div className="h-3 w-px bg-brand-border" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-text-secondary" />
                <span>{property.furnishing}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-brand-border">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-red-light text-brand-red font-bold text-xs flex items-center justify-center">
                {property.ownerOrAgent.name.charAt(0)}
              </div>
              <div className="text-xs">
                <span className="font-semibold text-brand-text block leading-tight">
                  {property.ownerOrAgent.name}
                </span>
                <span className="text-[10px] text-brand-text-secondary">
                  Posted by {property.postedBy}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContactClick && onContactClick(property)}
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                Enquire
              </Button>
              <Link href={`/property/${property.slug}`}>
                <Button size="sm">
                  View
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default — Minimalist & Clean)
  const bathCount = property.configurations?.[0]?.bathrooms || Math.max(1, parseInt(property.bhk) || 2);
  const bedLabel = property.bhk.includes('BHK') ? property.bhk.replace(' BHK', ' Beds') : property.bhk;

  return (
    <div className="bg-white rounded-lg border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
      {/* Image Container */}
      <div className="relative w-full h-56 bg-brand-bg overflow-hidden flex-shrink-0">
        <Link href={`/property/${property.slug}`} className="block w-full h-full">
          <Image
            src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[80%]">
          {property.isVerified && <Badge variant="verified">Verified</Badge>}
          {property.isFeatured && <Badge variant="featured">Featured</Badge>}
          {property.isDemoRecord && <DemoBadge />}
        </div>

        {/* Minimalist Favorite Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-md bg-white/95 backdrop-blur-sm text-brand-text hover:text-brand-red flex items-center justify-center transition shadow-sm z-10"
          aria-label="Save to favourites"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-brand-red text-brand-red' : ''}`} />
        </button>

        {/* Listing Type Pill */}
        <div className="absolute bottom-3 left-3 bg-brand-text/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
          {property.listingType === 'buy' ? 'For Sale' : property.listingType === 'rent' ? 'For Rent' : property.listingType}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Rate */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xl font-extrabold text-brand-text font-sans">
              {formatINR(property.price, isRent)}
            </span>
            {!isRent && (
              <span className="text-xs text-brand-text-secondary font-medium">
                {calculatePricePerSqFt(property.price, property.carpetArea)}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/property/${property.slug}`}>
            <h3 className="text-base font-bold text-brand-text font-heading group-hover:text-brand-red transition line-clamp-1 mb-1.5">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-text-muted flex-shrink-0" />
            <span className="truncate">
              {property.location.locality}, {property.location.city}
            </span>
          </div>

          {/* Minimal Horizontal Specs Row */}
          <div className="flex items-center gap-4 py-2.5 border-t border-brand-border/60 text-xs text-brand-text-secondary mt-1">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-brand-text-muted" />
              <span>{bedLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-brand-text-muted" />
              <span>{bathCount} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-brand-text-muted" />
              <span>{property.carpetArea} sq.ft</span>
            </div>
          </div>
        </div>

        {/* Footer: Owner/Agent + CTA */}
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-red-light text-brand-red font-bold text-xs flex items-center justify-center">
              {property.ownerOrAgent.name.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-brand-text truncate max-w-[110px]">
              {property.ownerOrAgent.name}
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="rounded-lg text-xs px-3.5 h-8 hover:bg-brand-red hover:text-white hover:border-brand-red transition"
            onClick={() => onContactClick && onContactClick(property)}
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}

