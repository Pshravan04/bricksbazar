'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property, ListingType, FilterState } from '@/types';
import { MOCK_PROPERTIES, filterProperties, sortProperties } from '@/mocks';
import { PropertyCard } from '@/components/common/PropertyCard';
import { FilterPanel } from '@/components/common/FilterPanel';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  Filter,
  X,
  ArrowUpDown,
  Search,
  Sparkles,
  Heart,
  Scale,
  MapPin,
  Building,
} from 'lucide-react';
import { cn, formatINR } from '@/lib/utils';

export interface PropertyDiscoveryProps {
  initialListingType?: ListingType;
  pageTitle: string;
  pageDescription: string;
}

export function PropertyDiscoveryInner({
  initialListingType = 'buy',
  pageTitle,
  pageDescription,
}: PropertyDiscoveryProps) {
  const searchParams = useSearchParams();
  const { success, info } = useToast();

  // Search & Filter State
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      searchQuery: searchParams.get('q') || '',
      city: searchParams.get('city') || 'All',
      listingType: (searchParams.get('type') as ListingType) || initialListingType,
      propertyCategory: searchParams.get('category') || 'All',
      bhk: searchParams.get('bhk') ? [searchParams.get('bhk')!] : [],
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 0,
      minArea: 0,
      maxArea: 0,
      furnishing: searchParams.get('furnishing') ? [searchParams.get('furnishing')!] : [],
      possession: searchParams.get('possession') ? [searchParams.get('possession')!] : [],
      amenities: [],
      verifiedOnly: searchParams.get('verified') === 'true',
      postedBy: [],
      sortBy: 'relevance',
    };
  });

  // UI States
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Comparison & Favourites State
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Enquiry Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const categoryParam = searchParams.get('category');
    if (cityParam) setFilters((prev) => ({ ...prev, city: cityParam }));
    if (categoryParam) setFilters((prev) => ({ ...prev, propertyCategory: categoryParam }));
  }, [searchParams]);

  // Actual filtering of the dataset
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(MOCK_PROPERTIES, filters);
    return sortProperties(filtered, filters.sortBy);
  }, [filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(start, start + itemsPerPage);
  }, [filteredProperties, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Handlers
  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      info('Removed from Favorites');
    } else {
      setFavorites([...favorites, id]);
      success('Added to Favorites');
    }
  };

  const handleToggleCompare = (id: string) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter((c) => c !== id));
    } else {
      if (comparedIds.length >= 3) {
        info('Compare Limit', 'You can compare up to 3 properties at a time.');
        return;
      }
      setComparedIds([...comparedIds, id]);
      success('Added to Comparison', `${comparedIds.length + 1} properties selected`);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      city: 'All',
      listingType: initialListingType,
      propertyCategory: 'All',
      bhk: [],
      minPrice: 0,
      maxPrice: 0,
      minArea: 0,
      maxArea: 0,
      furnishing: [],
      possession: [],
      amenities: [],
      verifiedOnly: false,
      postedBy: [],
      sortBy: 'relevance',
    });
  };

  const removeChip = (key: keyof FilterState, val?: string) => {
    if (key === 'city') setFilters({ ...filters, city: 'All' });
    else if (key === 'propertyCategory') setFilters({ ...filters, propertyCategory: 'All' });
    else if (key === 'searchQuery') setFilters({ ...filters, searchQuery: '' });
    else if (key === 'verifiedOnly') setFilters({ ...filters, verifiedOnly: false });
    else if (key === 'minPrice' || key === 'maxPrice') setFilters({ ...filters, minPrice: 0, maxPrice: 0 });
    else if (val && Array.isArray(filters[key])) {
      setFilters({
        ...filters,
        [key]: (filters[key] as string[]).filter((item) => item !== val),
      });
    }
  };

  const comparedProperties = MOCK_PROPERTIES.filter((p) => comparedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-brand-bg pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb
            items={[
              { label: 'Properties', href: '/properties' },
              { label: pageTitle },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  {pageTitle}
                </h1>
                <DemoBadge />
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary">{pageDescription}</p>
            </div>

            {/* Quick Search Bar */}
            <div className="max-w-md w-full">
              <Input
                isSearch
                placeholder="Search by locality, builder, landmark..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                onClear={() => setFilters({ ...filters, searchQuery: '' })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Controls Bar: Active Filters Chips, View Toggles & Sort */}
        <div className="bg-white rounded-xl border border-brand-border p-3 sm:p-4 mb-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Mobile Filter Button + Results Count */}
          <div className="flex items-center justify-between md:justify-start gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-1.5"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Filter className="w-4 h-4 text-brand-red" />
              <span>Filters</span>
              {(filters.city !== 'All' || filters.bhk.length > 0 || filters.verifiedOnly) && (
                <span className="w-2 h-2 rounded-full bg-brand-red" />
              )}
            </Button>

            <span className="text-xs font-semibold text-brand-text">
              Showing <span className="text-brand-red font-bold">{filteredProperties.length}</span> verified properties
            </span>
          </div>

          {/* Right Controls: Sort Dropdown & View Mode Switcher */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })
                }
                className="bg-brand-bg text-brand-text text-xs font-semibold rounded-button border border-brand-border px-2.5 py-1.5 focus:outline-none focus:border-brand-red"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="newest">Sort: Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
              </select>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-brand-bg rounded-lg p-0.5 border border-brand-border">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded text-xs transition',
                  viewMode === 'grid'
                    ? 'bg-white text-brand-red shadow-sm'
                    : 'text-brand-text-secondary hover:text-brand-text'
                )}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-1.5 rounded text-xs transition',
                  viewMode === 'list'
                    ? 'bg-white text-brand-red shadow-sm'
                    : 'text-brand-text-secondary hover:text-brand-text'
                )}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={cn(
                  'p-1.5 rounded text-xs transition',
                  viewMode === 'map'
                    ? 'bg-white text-brand-red shadow-sm'
                    : 'text-brand-text-secondary hover:text-brand-text'
                )}
                aria-label="Map View"
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(filters.city !== 'All' ||
          filters.propertyCategory !== 'All' ||
          filters.verifiedOnly ||
          filters.bhk.length > 0 ||
          filters.furnishing.length > 0 ||
          filters.searchQuery) && (
          <div className="flex items-center flex-wrap gap-2 mb-6">
            <span className="text-xs font-bold text-brand-text-secondary">Active Filters:</span>

            {filters.city !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-white border border-brand-border text-xs text-brand-text">
                City: {filters.city}
                <button onClick={() => removeChip('city')} className="hover:text-brand-red">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.propertyCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-white border border-brand-border text-xs text-brand-text">
                Type: {filters.propertyCategory}
                <button onClick={() => removeChip('propertyCategory')} className="hover:text-brand-red">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-brand-success-light text-brand-success border border-brand-success/20 text-xs font-semibold">
                Verified Only
                <button onClick={() => removeChip('verifiedOnly')} className="hover:text-brand-red">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.bhk.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-brand-red-light text-brand-red border border-brand-red/20 text-xs font-semibold"
              >
                {b}
                <button onClick={() => removeChip('bhk', b)} className="hover:text-brand-red-hover">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-brand-red hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Desktop 2-Column Grid: Left Filters, Right Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filter Panel (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Right Results Column */}
          <div className="lg:col-span-3 space-y-6">
            {filteredProperties.length === 0 ? (
              <EmptyState
                title="No Properties Found"
                description="We could not find any properties matching your exact criteria. Try broadening your budget range, clearing filters, or exploring nearby localities."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : viewMode === 'map' ? (
              /* Simulated Interactive Map View */
              <div className="bg-white rounded-card border border-brand-border overflow-hidden shadow-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-brand-red" />
                    <h3 className="font-bold text-base text-brand-text">
                      Interactive Map View — {filters.city === 'All' ? 'Top Indian Metros' : filters.city}
                    </h3>
                  </div>
                  <span className="text-xs text-brand-text-secondary">
                    {filteredProperties.length} Geotagged Properties
                  </span>
                </div>

                <div className="relative w-full h-[500px] bg-slate-100 rounded-xl overflow-hidden border border-brand-border flex items-center justify-center">
                  {/* Map Graphic Canvas / Background */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C6383B_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Geotagged Property Markers */}
                  <div className="relative z-10 w-full h-full p-8 flex flex-wrap items-center justify-around gap-6">
                    {filteredProperties.slice(0, 6).map((prop, idx) => (
                      <div
                        key={prop.id}
                        className="bg-white border-2 border-brand-red shadow-dropdown rounded-lg p-2.5 max-w-[220px] animate-fade-in hover:scale-105 transition"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-brand-text">
                          <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                          <span className="truncate">{prop.location.locality}</span>
                        </div>
                        <div className="text-xs font-black text-brand-red mt-1">
                          {formatINR(prop.price, prop.listingType === 'rent')}
                        </div>
                        <p className="text-[10px] text-brand-text-secondary truncate mt-0.5">
                          {prop.title}
                        </p>
                        <Button
                          size="sm"
                          className="w-full mt-2 h-7 text-[10px] py-0"
                          onClick={() => {
                            setActiveProperty(prop);
                            setContactModalOpen(true);
                          }}
                        >
                          Enquire
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : viewMode === 'list' ? (
              /* List View */
              <div className="space-y-4">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode="list"
                    isFavorited={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onContactClick={(p) => {
                      setActiveProperty(p);
                      setContactModalOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Grid View (Default) */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode="grid"
                    isFavorited={favorites.includes(property.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onContactClick={(p) => {
                      setActiveProperty(p);
                      setContactModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-brand-border">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Listings"
        side="bottom"
      >
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          isMobileModal
          onCloseMobileModal={() => setMobileFilterOpen(false)}
        />
      </Drawer>

      {/* Contact & Site Visit Modal */}
      {activeProperty && (
        <Modal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          title="Schedule Site Visit / Contact"
          description={activeProperty.title}
        >
          <EnquiryForm
            propertyOrItemTitle={activeProperty.title}
            recipientName={activeProperty.ownerOrAgent.name}
            recipientRole={`Posted by ${activeProperty.postedBy}`}
            onSuccess={() => setContactModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export function PropertyDiscovery(props: PropertyDiscoveryProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-red-light border-t-brand-red rounded-full animate-spin" />
        </div>
      }
    >
      <PropertyDiscoveryInner {...props} />
    </Suspense>
  );
}

