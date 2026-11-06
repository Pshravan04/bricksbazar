'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Checkbox } from '@/components/ui/Checkbox';
import { RadioGroup } from '@/components/ui/Radio';
import { Switch } from '@/components/ui/Switch';
import { Tabs } from '@/components/ui/Tabs';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton, PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/EmptyState';
import { Tooltip } from '@/components/ui/Tooltip';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { ImageGallery } from '@/components/ui/ImageGallery';

import { PropertyCard } from '@/components/common/PropertyCard';
import { ProjectCard } from '@/components/common/ProjectCard';
import { AgentCard } from '@/components/common/AgentCard';
import { DeveloperCard } from '@/components/common/DeveloperCard';
import { ProductCard } from '@/components/common/ProductCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { PriceRangeSelector } from '@/components/common/PriceRangeSelector';
import { LocationSelector } from '@/components/common/LocationSelector';
import { FilterPanel } from '@/components/common/FilterPanel';

import { MOCK_PROPERTIES, MOCK_PROJECTS, MOCK_AGENTS, MOCK_DEVELOPERS, MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { FilterState } from '@/types';
import { Home, ArrowLeft, Layers, Palette, Eye, Bell, Check, Phone } from 'lucide-react';

function DesignSystemContent() {
  const { success, error, info } = useToast();

  // State controls for testing components
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>(['Mumbai', 'Pune']);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('owner');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [minPrice, setMinPrice] = useState(2500000);
  const [maxPrice, setMaxPrice] = useState(20000000);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    city: 'Mumbai',
    listingType: 'buy',
    propertyCategory: 'All',
    bhk: ['2 BHK', '3 BHK'],
    minPrice: 0,
    maxPrice: 0,
    minArea: 0,
    maxArea: 0,
    furnishing: ['Furnished'],
    possession: ['Ready to Move'],
    amenities: ['Swimming Pool'],
    verifiedOnly: true,
    postedBy: ['Agent'],
    sortBy: 'relevance',
  });

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-brand-border py-4 px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-sm text-brand-text-secondary hover:text-brand-red transition">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="h-4 w-px bg-brand-border" />
            <h1 className="text-base font-bold text-brand-text">
              BricksBazar Design System — Phase 02 Living Showcase
            </h1>
          </div>
          <Badge variant="verified">Design System Complete</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* Intro */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider mb-2">
            <Palette className="w-4 h-4" />
            Brand Tokens & Typography
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-3">
            Precision Indian Real Estate Design Tokens
          </h2>
          <p className="text-sm text-brand-text-secondary max-w-2xl leading-relaxed mb-6">
            All components are built using strictly bounded brand tokens: Primary Red (`#C6383B`),
            White (`#FFFFFF`), neutral text (`#252525`), subtle borders (`#EAEAEA`), and verified greens.
          </p>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#C6383B] mb-2" />
              <div className="text-xs font-bold text-brand-text">Primary Red</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#C6383B</div>
            </div>
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#AB2F32] mb-2" />
              <div className="text-xs font-bold text-brand-text">Hover Red</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#AB2F32</div>
            </div>
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#FCEEEF] border border-brand-red/20 mb-2" />
              <div className="text-xs font-bold text-brand-text">Soft Red</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#FCEEEF</div>
            </div>
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#252525] mb-2" />
              <div className="text-xs font-bold text-brand-text">Main Text</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#252525</div>
            </div>
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#21865B] mb-2" />
              <div className="text-xs font-bold text-brand-text">Success Green</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#21865B</div>
            </div>
            <div className="p-3 rounded-lg border border-brand-border bg-white shadow-sm">
              <div className="w-full h-10 rounded bg-[#F8F8F8] border border-brand-border mb-2" />
              <div className="text-xs font-bold text-brand-text">Light Neutral</div>
              <div className="text-[10px] text-brand-text-secondary font-mono">#F8F8F8</div>
            </div>
          </div>
        </div>

        {/* Section 1: Buttons & Interactive Feedback */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-card space-y-6">
          <h3 className="text-lg font-bold text-brand-text border-b border-brand-border pb-3">
            1. Buttons, Modals, Drawers & Toast Notifications
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Red</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" isLoading>Loading State</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          <div className="pt-4 border-t border-brand-border flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Open Interactive Modal
            </Button>
            <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
              Open Mobile Drawer
            </Button>
            <Button variant="outline" onClick={() => setIsGalleryOpen(true)}>
              Launch Image Gallery
            </Button>
            <Button variant="secondary" onClick={() => success('Property Saved', 'Added to your favorites shortlist.')}>
              Trigger Success Toast
            </Button>
            <Button variant="secondary" onClick={() => error('Network Alert', 'Simulated offline indicator.')}>
              Trigger Error Toast
            </Button>
          </div>
        </div>

        {/* Section 2: Form Atoms */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-card space-y-6">
          <h3 className="text-lg font-bold text-brand-text border-b border-brand-border pb-3">
            2. Form Controls & Inputs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="Standard Text Input"
              placeholder="e.g. Enter property title"
              helperText="Helper message explaining format"
            />
            <Input
              label="Search Input with Clear"
              isSearch
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClear={() => setSearchValue('')}
              placeholder="Search locality, project or builder..."
            />
            <Input
              label="Validation Error State"
              value="Invalid phone"
              readOnly
              error="Please enter a valid 10-digit Indian phone number"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Select
              label="Select Dropdown"
              options={['Apartment', 'Villa', 'Commercial Office', 'Plot / Land']}
            />
            <MultiSelect
              label="Multi-Select with Chips"
              options={['Mumbai', 'Pune', 'Thane', 'Bengaluru', 'Hyderabad', 'Delhi NCR']}
              selected={multiSelected}
              onChange={setMultiSelected}
            />
            <div className="space-y-4 pt-1">
              <Checkbox
                label="Verified Properties Only"
                description="Filter out unverified agent submissions"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Switch
                label="Direct Owner Listings"
                description="Hide brokerage and developer listings"
                checked={switchChecked}
                onChange={setSwitchChecked}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Navigation, Tabs & Pagination */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-card space-y-6">
          <h3 className="text-lg font-bold text-brand-text border-b border-brand-border pb-3">
            3. Navigation, Badges, Tabs & Breadcrumbs
          </h3>

          <Breadcrumb
            items={[
              { label: 'Properties in Mumbai', href: '/buy' },
              { label: 'Bandra West', href: '/buy?city=Mumbai' },
              { label: '3 BHK Luxury Sea View' },
            ]}
          />

          <Tabs
            tabs={[
              { id: 'overview', label: 'Overview', count: '12' },
              { id: 'pricing', label: 'Pricing & Configurations' },
              { id: 'amenities', label: 'Amenities & Specs' },
              { id: 'floorplans', label: 'Floor Plans' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Badge variant="verified">RERA Verified</Badge>
            <Badge variant="featured">Featured Listing</Badge>
            <Badge variant="rera">RERA Approved</Badge>
            <Badge variant="warning">Under Negotiation</Badge>
            <Badge variant="outline">Ready to Move</Badge>
          </div>

          <div className="pt-2">
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Section 4: Composite Property & Project Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-brand-text">
            4. Composite Real Estate & Marketplace Cards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.slice(0, 3).map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onContactClick={() => setIsModalOpen(true)}
              />
            ))}
          </div>

          {/* List View Example */}
          <div className="mt-6">
            <h4 className="text-sm font-bold text-brand-text mb-3">Property Card (List View Layout)</h4>
            <PropertyCard
              property={MOCK_PROPERTIES[0]}
              viewMode="list"
              onContactClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Project & Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <ProjectCard project={MOCK_PROJECTS[0]} />
            <AgentCard agent={MOCK_AGENTS[0]} onContactClick={() => setIsModalOpen(true)} />
            <DeveloperCard developer={MOCK_DEVELOPERS[0]} />
          </div>

          {/* Marketplace Product Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {MOCK_MARKETPLACE_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onRequestQuote={() => setIsModalOpen(true)}
              />
            ))}
          </div>
        </div>

        {/* Section 5: Filter Panel & Enquiry Form in Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={() =>
                setFilters({
                  searchQuery: '',
                  city: 'All',
                  listingType: 'buy',
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
                })
              }
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-card">
              <EnquiryForm
                propertyOrItemTitle="3 BHK Luxury Sea-View Apartment at Bandra West"
                recipientName="Vikramaditya Mehta"
                recipientRole="Verified Premium Consultant"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmptyState
                title="No Shortlisted Properties"
                description="Save your favorite homes to view and compare them whenever you return."
                actionLabel="Explore Properties"
                onAction={() => {}}
              />
              <PropertyCardSkeleton />
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Overlays */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Private Site Visit"
        description="Connect with a verified BricksBazar consultant"
      >
        <EnquiryForm
          propertyOrItemTitle="The Grand Crest Worli Sky Mansion"
          recipientName="Oberoi Realty Advisory"
          recipientRole="Direct Developer Desk"
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Mobile Filter Drawer"
      >
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => {}}
          isMobileModal
          onCloseMobileModal={() => setIsDrawerOpen(false)}
        />
      </Drawer>

      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        title="3 BHK Luxury Sea-View Apartment at Bandra West"
        images={MOCK_PROPERTIES[0].images}
      />
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <DesignSystemContent />
    </ToastProvider>
  );
}

