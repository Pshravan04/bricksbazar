'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MOCK_PROPERTIES,
  MOCK_PROJECTS,
  MOCK_AGENTS,
  MOCK_DEVELOPERS,
  MOCK_CO_BROKING_REQUIREMENTS,
} from '@/mocks';
import { Property, ListingType } from '@/types';
import { CITIES, PROPERTY_CATEGORIES, BHK_OPTIONS } from '@/constants';
import { PropertyCard } from '@/components/common/PropertyCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatINR, formatArea } from '@/lib/utils';
import {
  Search,
  MapPin,
  Building,
  Home,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  PlusCircle,
  Users,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Layers,
  Award,
  Handshake,
  Check,
  Bed,
  Maximize,
  Bath,
  Heart,
  Star,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();

  // Hero Search Panel State
  const [activeTab, setActiveTab] = useState<ListingType>('buy');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedCategory, setSelectedCategory] = useState('Apartment');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('0');

  // Popular Listings Interactive Category Filter State
  const [popularCategory, setPopularCategory] = useState<'all' | 'buy' | 'rent' | 'commercial' | 'plots'>('all');

  // Contact Modal State
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeEnquiryItem, setActiveEnquiryItem] = useState<{
    title: string;
    recipientName: string;
    recipientRole: string;
  } | null>(null);

  const handleOpenContact = (title: string, name: string, role: string) => {
    setActiveEnquiryItem({ title, recipientName: name, recipientRole: role });
    setContactModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity && selectedCity !== 'All') params.set('city', selectedCity);
    if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedBhk && selectedBhk !== 'All') params.set('bhk', selectedBhk);
    if (selectedBudget && selectedBudget !== '0') params.set('maxPrice', selectedBudget);

    const targetRoute =
      activeTab === 'rent'
        ? '/rent'
        : activeTab === 'commercial'
        ? '/commercial'
        : activeTab === 'plot'
        ? '/plots'
        : '/buy';

    router.push(`${targetRoute}?${params.toString()}`);
  };

  // Dynamically filter popular properties based on interactive filter tabs
  const popularProperties = MOCK_PROPERTIES.filter((p) => {
    if (popularCategory === 'all') return true;
    if (popularCategory === 'buy') return p.listingType === 'buy';
    if (popularCategory === 'rent') return p.listingType === 'rent';
    if (popularCategory === 'commercial')
      return (
        p.listingType === 'commercial' ||
        p.propertyCategory === 'Commercial Office' ||
        p.propertyCategory === 'Commercial Shop' ||
        p.propertyCategory === 'Warehouse'
      );
    if (popularCategory === 'plots')
      return p.listingType === 'plot' || p.propertyCategory === 'Plot / Land';
    return true;
  }).slice(0, 6);

  return (
    <div className="min-h-screen bg-white text-brand-text">
      {/* =========================================================================
          1. MINIMALIST CINEMATIC HERO SECTION
          Large rounded container card with editorial headline & floating search box
          ========================================================================= */}
      <section className="w-full px-3 sm:px-6 lg:px-8 pt-3 pb-8 sm:pb-12 max-w-[1840px] mx-auto">
        <div className="relative w-full rounded-xl overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center p-6 sm:p-10 lg:p-16 shadow-card">
          {/* Background Image: High-end Architectural Landscape */}
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Modern Luxury Residence & Natural Landscape"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Deep Cinematic Contrast Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Inner Grid: Left Editorial Copy & Right Floating Search Card */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Big Confident Headline & Pill CTA Button */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-white">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span>RERA Verified Properties &bull; Curated Sanctuaries</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold font-heading text-white leading-[1.08] tracking-tight">
                  Buy, Rent, &amp; Sell <br className="hidden sm:inline" />
                  <span className="italic font-normal text-brand-red-light">Property</span>
                </h1>

                <p className="text-base sm:text-lg text-white/80 max-w-lg leading-relaxed font-sans">
                  India’s premier real estate portal connecting verified luxury residences, high-yield commercial hubs, and RERA-approved developments across top Indian metros.
                </p>
              </div>

              <div>
                <Link
                  href="/buy"
                  className="inline-flex items-center gap-2 bg-white text-brand-text font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg group"
                >
                  <span>Explore All Property</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Crisp White Search Card */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="bg-white rounded-xl p-6 sm:p-7 shadow-xl max-w-md w-full border border-gray-100">
                <div className="mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-brand-text font-heading leading-tight">
                    Find your Best Property
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-text-secondary mt-0.5">
                    what do you want!
                  </p>
                </div>

                {/* Minimal Segmented Tab Control */}
                <div className="grid grid-cols-4 p-1 bg-brand-bg rounded-md border border-brand-border text-xs font-semibold mb-4 text-center">
                  {[
                    { id: 'buy', label: 'Buy' },
                    { id: 'rent', label: 'Rent' },
                    { id: 'commercial', label: 'Office' },
                    { id: 'plot', label: 'Plots' },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as ListingType)}
                        className={cn(
                          'py-1.5 rounded transition text-xs font-semibold',
                          isActive
                            ? 'bg-white text-brand-text shadow-sm font-bold'
                            : 'text-brand-text-secondary hover:text-brand-text'
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Search Form Inputs */}
                <form onSubmit={handleSearchSubmit} className="space-y-3.5">
                  {/* Location Input */}
                  <div>
                    <label className="text-[11px] font-semibold text-brand-text-secondary block mb-1">
                      Location
                    </label>
                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-brand-text-muted absolute left-3.5 pointer-events-none" />
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-brand-bg/80 text-brand-text text-xs sm:text-sm font-medium rounded-md border border-brand-border pl-10 pr-4 py-2.5 appearance-none focus:outline-none focus:border-brand-red focus:bg-white transition"
                      >
                        <option value="All">All Indian Metros</option>
                        {CITIES.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}, India
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Property Type Input */}
                  <div>
                    <label className="text-[11px] font-semibold text-brand-text-secondary block mb-1">
                      Property Type
                    </label>
                    <div className="relative flex items-center">
                      <Home className="w-4 h-4 text-brand-text-muted absolute left-3.5 pointer-events-none" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-brand-bg/80 text-brand-text text-xs sm:text-sm font-medium rounded-md border border-brand-border pl-10 pr-4 py-2.5 appearance-none focus:outline-none focus:border-brand-red focus:bg-white transition"
                      >
                        <option value="All">All Property Types</option>
                        {PROPERTY_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Configuration / Beds Row */}
                  <div>
                    <label className="text-[11px] font-semibold text-brand-text-secondary block mb-1">
                      Configuration
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-xs">
                      {['All', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => {
                        const isBhkActive = selectedBhk === (bhk === '4+ BHK' ? '4 BHK' : bhk);
                        return (
                          <button
                            key={bhk}
                            type="button"
                            onClick={() => setSelectedBhk(bhk === '4+ BHK' ? '4 BHK' : bhk)}
                            className={cn(
                              'py-2 px-1 rounded-md border text-center font-medium transition text-xs',
                              isBhkActive
                                ? 'border-brand-red bg-brand-red-light text-brand-red font-bold'
                                : 'border-brand-border bg-brand-bg/60 text-brand-text hover:bg-brand-bg'
                            )}
                          >
                            {bhk}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Max Price Range */}
                  <div>
                    <label className="text-[11px] font-semibold text-brand-text-secondary block mb-1">
                      Max Price
                    </label>
                    <div className="relative flex items-center">
                      <span className="text-xs font-bold text-brand-text-muted absolute left-3.5 pointer-events-none">
                        ₹
                      </span>
                      <select
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        className="w-full bg-brand-bg/80 text-brand-text text-xs sm:text-sm font-medium rounded-md border border-brand-border pl-10 pr-4 py-2.5 appearance-none focus:outline-none focus:border-brand-red focus:bg-white transition"
                      >
                        <option value="0">Any Budget Limit</option>
                        <option value="5000000">Up to ₹ 50 Lakh</option>
                        <option value="10000000">Up to ₹ 1.00 Crore</option>
                        <option value="25000000">Up to ₹ 2.50 Crore</option>
                        <option value="50000000">Up to ₹ 5.00 Crore</option>
                        <option value="100000000">Up to ₹ 10.00 Crore+</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <span>Search Properties</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT BRICKSBAZAR / TRUST STRIP
          Building Transparency in Indian Real Estate + Mission + Trusted Partners
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-brand-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10">
          {/* Left Part: About BricksBazar Mission & Metrics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-red-light text-brand-red text-xs font-bold tracking-wide">
              <span>About BricksBazar</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-text tracking-tight leading-tight">
              Building Transparency <br />
              in Indian Real Estate.
            </h2>

            <div className="flex items-center gap-3 pt-1">
              {/* Stacked Round Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Property Client"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Broker"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-9 h-9 rounded-full ring-2 ring-white overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Architect"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
                  +
                </div>
              </div>

              <div className="text-xs">
                <div className="font-bold text-brand-text flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  4.9 Rating
                </div>
                <div className="text-brand-text-secondary text-[11px]">
                  from 12k+ buyers &amp; developers
                </div>
              </div>
            </div>
          </div>

          {/* Center Part: Decorative Minimalist Asterisk Motif */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-red-light/60 flex items-center justify-center text-brand-red">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Right Part: Real BricksBazar Value Proposition & Action Links */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-brand-text-secondary leading-relaxed font-sans">
              BricksBazar is India’s integrated property discovery platform. We bring together homebuyers, verified MahaRERA brokers, and marquee developers under one trusted ecosystem — engineered to eliminate hidden brokerage traps, fake listings, and unverified titles across top Indian metros.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/about"
                className="px-6 py-2.5 rounded-lg bg-brand-charcoal text-white text-xs sm:text-sm font-semibold hover:bg-black transition shadow-sm"
              >
                Learn Our Story
              </Link>
              <button
                type="button"
                onClick={() => handleOpenContact('Private Client Advisory', 'Senior Advisory Desk', 'Principal Advisor')}
                className="text-xs sm:text-sm font-semibold text-brand-text hover:text-brand-red transition inline-flex items-center gap-1.5"
              >
                <span>Request a Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Marquee Partner Strip with Subheading */}
        <div className="pt-8 border-t border-brand-border/60">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-text-muted">
              Marquee Developers &bull; Direct Verified Mandates
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center text-center">
            {[
              { name: 'OBEROI REALTY', sub: 'Luxury Residences' },
              { name: 'LODHA LUXURY', sub: 'Signature Towers' },
              { name: 'GODREJ PROPERTIES', sub: 'Sustainable Living' },
              { name: 'PIRAMAL REALTY', sub: 'Iconic Waterfronts' },
              { name: 'DLF LIMITED', sub: 'Cyber City Hubs' },
              { name: 'PRESTIGE GROUP', sub: 'Urban Landmarks' },
            ].map((partner) => (
              <div key={partner.name} className="py-2 px-3 rounded-lg hover:bg-brand-bg transition group">
                <span className="font-heading font-black text-sm tracking-wider text-brand-text-muted group-hover:text-brand-text transition block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-brand-text-secondary tracking-widest uppercase block mt-0.5">
                  {partner.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. POPULAR LISTINGS SECTION (INTERACTIVE & CREATIVE MINIMAL UI)
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-b border-brand-border">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-red-light text-brand-red text-xs font-bold tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Indian Sanctuaries</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-brand-text tracking-tight">
              Popular Listings
            </h2>
            <p className="text-brand-text-secondary text-sm sm:text-base mt-1">
              Explore verified prime residences, commercial headquarters, and holiday retreats
            </p>
          </div>

          <Link
            href={`/${popularCategory === 'all' || popularCategory === 'buy' ? 'buy' : popularCategory === 'rent' ? 'rent' : popularCategory === 'commercial' ? 'commercial' : 'plots'}`}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:border-brand-text text-xs sm:text-sm font-semibold text-brand-text hover:text-brand-red transition inline-flex items-center gap-1.5 w-fit shadow-xs"
          >
            <span>Explore All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Minimalist Interactive Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Curated Residences' },
            { id: 'buy', label: 'For Sale (Luxury)' },
            { id: 'rent', label: 'Premium Rentals' },
            { id: 'commercial', label: 'Commercial IT Hubs' },
            { id: 'plots', label: 'Gated Villa Plots' },
          ].map((cat) => {
            const isActive = popularCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setPopularCategory(cat.id as any)}
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-xs border',
                  isActive
                    ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-xs'
                    : 'bg-white text-brand-text-secondary border-brand-border hover:border-brand-text hover:text-brand-text'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3 Columns Minimal Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onContactClick={(p) => handleOpenContact(p.title, p.ownerOrAgent.name, p.postedBy)}
            />
          ))}
        </div>

        {/* Creative Discovery Bar */}
        <div className="mt-12 pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            <span className="font-semibold text-brand-text">Showing {popularProperties.length} of 24 Verified Residences</span>
            <span>&bull;</span>
            <span>100% MahaRERA Audited</span>
          </div>

          <Link
            href={`/${popularCategory === 'all' || popularCategory === 'buy' ? 'buy' : popularCategory === 'rent' ? 'rent' : popularCategory === 'commercial' ? 'commercial' : 'plots'}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-charcoal text-white hover:bg-black transition text-xs font-bold shadow-xs"
          >
            <span>View All Curated Properties</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-red" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          4. POPULAR CITIES / TOP MICRO-MARKETS (ARCHITECTURAL METRO CAPSULES)
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-b border-brand-border">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-red-light text-brand-red text-xs font-bold tracking-wide mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Micro-Market Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-brand-text tracking-tight">
              Top Indian Metro Hubs
            </h2>
            <p className="text-brand-text-secondary text-sm sm:text-base mt-1">
              Explore high-growth urban economic corridors, capital appreciation trends, and curated sanctuaries
            </p>
          </div>

          <Link
            href="/buy"
            className="px-5 py-2 rounded-lg border border-gray-300 hover:border-brand-text text-xs sm:text-sm font-semibold text-brand-text hover:text-brand-red transition inline-flex items-center gap-1.5 w-fit shadow-xs"
          >
            <span>Explore All 8+ Metros</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 City Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            {
              city: 'Mumbai',
              state: 'Maharashtra',
              count: '480+ Listings',
              avgPrice: '₹ 34,200/sq.ft',
              localities: 'Worli • Bandra • BKC',
              image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
            },
            {
              city: 'Pune',
              state: 'Maharashtra',
              count: '290+ Listings',
              avgPrice: '₹ 9,800/sq.ft',
              localities: 'Kharadi • Baner • Koregaon',
              image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
            },
            {
              city: 'Bengaluru',
              state: 'Karnataka',
              count: '370+ Listings',
              avgPrice: '₹ 11,500/sq.ft',
              localities: 'Indiranagar • Whitefield',
              image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            },
            {
              city: 'Hyderabad',
              state: 'Telangana',
              count: '260+ Listings',
              avgPrice: '₹ 8,900/sq.ft',
              localities: 'HITEC City • Gachibowli',
              image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
            },
            {
              city: 'Delhi NCR',
              state: 'North Hub',
              count: '320+ Listings',
              avgPrice: '₹ 15,200/sq.ft',
              localities: 'Golf Course Rd • Noida',
              image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
            },
            {
              city: 'Goa',
              state: 'Coastal Sanctuary',
              count: '140+ Luxury Villas',
              avgPrice: '₹ 19,400/sq.ft',
              localities: 'Assagao • Anjuna • Candolim',
              image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
            },
          ].map((metro) => (
            <Link
              key={metro.city}
              href={`/buy?city=${encodeURIComponent(metro.city)}`}
              className="group relative rounded-xl overflow-hidden aspect-[3/4.2] bg-brand-bg flex flex-col justify-between p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover border border-brand-border/40"
            >
              <Image
                src={metro.image}
                alt={metro.city}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:from-black/95 transition-colors" />

              {/* Top Rate Pill */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wide">
                  {metro.avgPrice}
                </span>
                <div className="w-7 h-7 rounded-lg bg-white/15 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-red-light font-bold block">
                  {metro.state}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                  {metro.city}
                </h3>
                <p className="text-[11px] text-white/70 truncate">
                  {metro.localities}
                </p>
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white/90">
                  <span>{metro.count}</span>
                  <span className="text-[10px] text-brand-red-light group-hover:translate-x-0.5 transition-transform">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          THE BRICKSBAZAR STANDARD (EDITORIAL 4-PILLAR GRID)
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-b border-brand-border bg-brand-bg/30">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-charcoal text-white text-xs font-bold tracking-wide mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>The BricksBazar Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-brand-text tracking-tight">
            How We Protect Discerning Buyers &amp; High-Value Mandates
          </h2>
          <p className="text-brand-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
            Engineered to replace chaotic broker portals with institutional verification, zero spam, and structured co-broking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'MahaRERA Direct Registry Sync',
              desc: 'Every project RERA ID and promoter profile is verified against state regulatory registries to eliminate fake claims and litigation hazards.',
            },
            {
              num: '02',
              title: 'Masked Privacy & Zero Tele-Spam',
              desc: 'Your contact credentials remain private. Connect directly with verified developer desks without receiving dozens of aggressive telecalling loops.',
            },
            {
              num: '03',
              title: 'Guaranteed 50:50 Co-Broking',
              desc: 'Standardized digital commission agreements protect licensed consultants, enabling frictionless inter-agency co-broking on marquee assets.',
            },
            {
              num: '04',
              title: 'Real Carpet Area & Pricing Audits',
              desc: 'No exaggerated super built-up claims. Access verified carpet area measurements, milestone-based possession dates, and price-per-sq.ft checks.',
            },
          ].map((pillar) => (
            <div
              key={pillar.num}
              className="p-6 sm:p-7 rounded-xl bg-white border border-brand-border hover:border-brand-text/30 hover:shadow-card transition flex flex-col justify-between group"
            >
              <div>
                <span className="font-heading font-black text-3xl sm:text-4xl text-brand-border group-hover:text-brand-red transition block mb-4">
                  {pillar.num}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-brand-text leading-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. VERIFIED PROFESSIONALS & LIVE CO-BROKING EXCHANGE
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-b border-brand-border">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-red-light text-brand-red text-xs font-bold tracking-wide mb-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>RERA Broker Network &bull; Live Exchange</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-brand-text tracking-tight">
              Verified Professionals &amp; Co-Broking
            </h2>
            <p className="text-brand-text-secondary text-sm sm:text-base mt-1">
              Connect with accredited consultants or collaborate on live 50:50 commission split requirements across India
            </p>
          </div>

          <Link
            href="/agents"
            className="px-5 py-2 rounded-lg border border-gray-300 hover:border-brand-text text-xs sm:text-sm font-semibold text-brand-text hover:text-brand-red transition inline-flex items-center gap-1.5 w-fit shadow-xs"
          >
            <span>Browse All 2,500+ Agents</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Agents Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {MOCK_AGENTS.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl border border-brand-border p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-brand-bg border-2 border-brand-border">
                    <Image
                      src={agent.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link href={`/agents/${agent.slug}`}>
                      <h3 className="font-heading font-bold text-base text-brand-text group-hover:text-brand-red transition line-clamp-1">
                        {agent.name}
                      </h3>
                    </Link>
                    <span className="text-xs text-brand-text-secondary block">
                      {agent.agencyName} &bull; {agent.location.city}
                    </span>
                    <span className="text-[10px] text-brand-success font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-success" />
                      {agent.reraNumber || 'MahaRERA Accredited'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-brand-bg/60 rounded-lg border border-brand-border text-center text-xs text-brand-text mb-4">
                  <div>
                    <span className="text-[10px] text-brand-text-secondary block">Experience</span>
                    <span className="font-bold text-xs">{agent.experienceYears} Years</span>
                  </div>
                  <div className="border-x border-brand-border">
                    <span className="text-[10px] text-brand-text-secondary block">Listings</span>
                    <span className="font-bold text-xs">{agent.listedPropertiesCount}+ Active</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-brand-text-secondary block">Rating</span>
                    <span className="font-bold text-xs flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {agent.rating}
                    </span>
                  </div>
                </div>

                {/* Specialties Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(agent.specializations || ['Luxury Resale', 'Pre-Leased Commercial', 'MahaRERA Advisory']).slice(0, 2).map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-brand-bg text-[11px] font-medium text-brand-text-secondary border border-brand-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-lg hover:bg-brand-red hover:text-white hover:border-brand-red transition text-xs font-semibold py-2.5"
                onClick={() => handleOpenContact(agent.name, agent.name, 'MahaRERA Licensed Consultant')}
              >
                Schedule Consultation
              </Button>
            </div>
          ))}
        </div>

        {/* Live Co-Broking Requirements Ticker Strip */}
        <div className="p-4 sm:p-5 rounded-xl bg-brand-charcoal text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white uppercase tracking-wider block sm:inline mr-2">
                Live Co-Broking Ticker:
              </span>
              <span className="text-gray-300">
                42 Active Lead Splits &bull; Bandra 4 BHK (₹ 24 Cr) &bull; BKC Pre-Leased Office (18,000 sq.ft) &bull; Guaranteed 50:50 Commission
              </span>
            </div>
          </div>

          <Link
            href="/dashboard/lead-exchange"
            className="px-4 py-2 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-hover transition shadow-sm whitespace-nowrap flex-shrink-0"
          >
            Access Co-Broking Desk &rarr;
          </Link>
        </div>
      </section>

      {/* =========================================================================
          6. DUAL CONVERSION PORTALS (ARCHITECTURAL SPLIT)
          ========================================================================= */}
      <section className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Property Owners & Builders */}
          <div className="relative rounded-xl p-8 sm:p-12 bg-brand-charcoal text-white overflow-hidden shadow-card flex flex-col justify-between min-h-[340px] group border border-white/10">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-brand-red-light text-[11px] font-bold uppercase tracking-wider">
                <span>Direct Owner &amp; Promoter Desk</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white leading-tight">
                List Your Property With Zero Brokerage.
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed">
                Connect directly with verified corporate buyers, high-net-worth investors, and pre-screened tenants across top Indian metros.
              </p>

              <div className="space-y-2 pt-2 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red-light flex-shrink-0" />
                  <span>100% Privacy Protection &bull; Masked mobile numbers to stop spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red-light flex-shrink-0" />
                  <span>Free MahaRERA title compliance &amp; legal documentation assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red-light flex-shrink-0" />
                  <span>Dedicated Relationship Desk for buyer site visits</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <Link
                href="/post-property"
                className="inline-flex items-center gap-2 bg-brand-red text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-lg hover:bg-brand-red-hover transition shadow-md group-hover:translate-x-0.5"
              >
                <span>Post Your Listing FREE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: RERA Agents & Brokers */}
          <div className="relative rounded-xl p-8 sm:p-12 bg-[#F6F6F6] border border-brand-border text-brand-text overflow-hidden shadow-card flex flex-col justify-between min-h-[340px] group">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-red-light text-brand-red text-[11px] font-bold uppercase tracking-wider">
                <span>RERA Broker Network &bull; 50:50 Exchange</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-brand-text leading-tight">
                Collaborate on Premium Indian Mandates.
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary max-w-md leading-relaxed">
                Partner with certified consultants on high-ticket residential &amp; commercial deals with guaranteed 50:50 co-broking splits.
              </p>

              <div className="space-y-2 pt-2 text-xs text-brand-text">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Access exclusive off-market developer mandates in Tier-1 cities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Standardized digital co-broking agreement with commission escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Verified buyer requirements syndicated from our advisory desk</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8">
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 bg-brand-text text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-lg hover:bg-black transition shadow-md group-hover:translate-x-0.5"
              >
                <span>Join Verified Broker Network</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact / Enquiry Modal */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={activeEnquiryItem ? `Connect with ${activeEnquiryItem.recipientName}` : 'Enquire'}
      >
        {activeEnquiryItem && (
          <div className="space-y-4">
            <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
              <div className="text-xs font-bold text-brand-text">{activeEnquiryItem.title}</div>
              <div className="text-[11px] text-brand-text-secondary">
                {activeEnquiryItem.recipientRole}: {activeEnquiryItem.recipientName}
              </div>
            </div>
            <EnquiryForm
              propertyOrItemTitle={activeEnquiryItem.title}
              recipientName={activeEnquiryItem.recipientName}
              recipientRole={activeEnquiryItem.recipientRole}
              onSuccess={() => setContactModalOpen(false)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
