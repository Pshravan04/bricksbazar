'use client';

import React from 'react';
import { FilterState, ListingType } from '@/types';
import { PROPERTY_CATEGORIES, BHK_OPTIONS, FURNISHING_OPTIONS, POSSESSION_OPTIONS, POSTED_BY_OPTIONS } from '@/constants';
import { LocationSelector } from './LocationSelector';
import { PriceRangeSelector } from './PriceRangeSelector';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterPanelProps {
  filters: FilterState;
  onChange: (updatedFilters: FilterState) => void;
  onReset: () => void;
  className?: string;
  isMobileModal?: boolean;
  onCloseMobileModal?: () => void;
}

const COMMON_AMENITIES = [
  'Swimming Pool',
  'Clubhouse & Gym',
  '24x7 Security & CCTV',
  'Reserved Covered Parking',
  'Power Backup 100%',
  'Kids Play Area',
  'EV Charging Stations',
  'Vastu Compliant Layout',
];

export function FilterPanel({
  filters,
  onChange,
  onReset,
  className,
  isMobileModal = false,
  onCloseMobileModal,
}: FilterPanelProps) {
  const isRent = filters.listingType === 'rent';

  const handleCityChange = (city: string) => {
    onChange({ ...filters, city });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, propertyCategory: e.target.value });
  };

  const toggleBhk = (bhk: string) => {
    const exists = filters.bhk.includes(bhk);
    const updated = exists
      ? filters.bhk.filter((b) => b !== bhk)
      : [...filters.bhk, bhk];
    onChange({ ...filters, bhk: updated });
  };

  const toggleFurnishing = (furnishing: string) => {
    const exists = filters.furnishing.includes(furnishing);
    const updated = exists
      ? filters.furnishing.filter((f) => f !== furnishing)
      : [...filters.furnishing, furnishing];
    onChange({ ...filters, furnishing: updated });
  };

  const togglePossession = (possession: string) => {
    const exists = filters.possession.includes(possession);
    const updated = exists
      ? filters.possession.filter((p) => p !== possession)
      : [...filters.possession, possession];
    onChange({ ...filters, possession: updated });
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filters.amenities.includes(amenity);
    const updated = exists
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: updated });
  };

  const togglePostedBy = (posted: string) => {
    const exists = filters.postedBy.includes(posted);
    const updated = exists
      ? filters.postedBy.filter((p) => p !== posted)
      : [...filters.postedBy, posted];
    onChange({ ...filters, postedBy: updated });
  };

  return (
    <div
      className={cn(
        'bg-white rounded-card border border-brand-border p-5 space-y-6 shadow-card',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-red" />
          <h3 className="font-bold text-base text-brand-text">Filter Properties</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-brand-text-secondary hover:text-brand-red flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3 bg-brand-success-light/60 border border-brand-success/20 rounded-lg">
        <Switch
          checked={filters.verifiedOnly}
          onChange={(checked) => onChange({ ...filters, verifiedOnly: checked })}
          label="Verified Listings Only"
          description="Show only RERA & agent verified records"
        />
      </div>

      {/* City / Metro Selector */}
      <LocationSelector
        selectedCity={filters.city}
        onCityChange={handleCityChange}
      />

      {/* Property Category */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          Property Type
        </label>
        <select
          value={filters.propertyCategory}
          onChange={handleCategoryChange}
          className="w-full bg-white text-brand-text text-sm rounded-button border border-brand-border px-3.5 py-2.5 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
        >
          <option value="All">All Property Types</option>
          {PROPERTY_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* BHK Selector Chips */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          BHK Configuration
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {BHK_OPTIONS.map((bhk) => {
            const isSelected = filters.bhk.includes(bhk);
            return (
              <button
                key={bhk}
                type="button"
                onClick={() => toggleBhk(bhk)}
                className={cn(
                  'px-2 py-2 rounded-button text-xs font-bold border transition text-center',
                  isSelected
                    ? 'bg-brand-red text-white border-brand-red shadow-sm'
                    : 'bg-white text-brand-text border-brand-border hover:bg-brand-bg'
                )}
              >
                {bhk}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Range */}
      <PriceRangeSelector
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onMinPriceChange={(val) => onChange({ ...filters, minPrice: val })}
        onMaxPriceChange={(val) => onChange({ ...filters, maxPrice: val })}
        isRent={isRent}
      />

      {/* Furnishing Status */}
      <div className="space-y-2.5 pt-2 border-t border-brand-border">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          Furnishing
        </label>
        <div className="space-y-2">
          {FURNISHING_OPTIONS.map((furn) => (
            <Checkbox
              key={furn}
              label={furn}
              checked={filters.furnishing.includes(furn)}
              onChange={() => toggleFurnishing(furn)}
            />
          ))}
        </div>
      </div>

      {/* Possession Status */}
      <div className="space-y-2.5 pt-2 border-t border-brand-border">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          Possession Status
        </label>
        <div className="space-y-2">
          {POSSESSION_OPTIONS.map((poss) => (
            <Checkbox
              key={poss}
              label={poss}
              checked={filters.possession.includes(poss)}
              onChange={() => togglePossession(poss)}
            />
          ))}
        </div>
      </div>

      {/* Posted By */}
      <div className="space-y-2.5 pt-2 border-t border-brand-border">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          Posted By
        </label>
        <div className="space-y-2">
          {POSTED_BY_OPTIONS.map((poster) => (
            <Checkbox
              key={poster}
              label={poster}
              checked={filters.postedBy.includes(poster)}
              onChange={() => togglePostedBy(poster)}
            />
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2.5 pt-2 border-t border-brand-border">
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          Popular Amenities
        </label>
        <div className="space-y-2">
          {COMMON_AMENITIES.map((amenity) => (
            <Checkbox
              key={amenity}
              label={amenity}
              checked={filters.amenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
            />
          ))}
        </div>
      </div>

      {isMobileModal && onCloseMobileModal && (
        <div className="pt-4 border-t border-brand-border">
          <Button onClick={onCloseMobileModal} className="w-full">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}

