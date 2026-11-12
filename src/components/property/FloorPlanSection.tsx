'use client';

import React, { useState } from 'react';
import {
  Maximize2,
  FileDown,
  Compass,
  Layers,
  Calendar,
  CheckCircle2,
  Building2,
  Eye,
  Download,
  Info,
  Check,
} from 'lucide-react';
import { cn, formatINR, formatArea } from '@/lib/utils';
import { PropertyConfiguration } from '@/types';
import { Button } from '@/components/ui/Button';

interface FloorPlanSectionProps {
  configurations?: PropertyConfiguration[];
  selectedConfigId?: string;
  onSelectConfig?: (id: string) => void;
  defaultBhk?: string;
  defaultCarpetArea?: number;
  defaultSuperBuiltUpArea?: number;
  defaultPrice?: number;
  isRent?: boolean;
  propertyTitle?: string;
  onScheduleVisit?: () => void;
}

export function FloorPlanSection({
  configurations,
  selectedConfigId,
  onSelectConfig,
  defaultBhk = '3 BHK',
  defaultCarpetArea = 1100,
  defaultSuperBuiltUpArea = 1450,
  defaultPrice = 30000000,
  isRent = false,
  propertyTitle = 'Luxury Residence',
  onScheduleVisit,
}: FloorPlanSectionProps) {
  // If configurations exist, use them; otherwise create a single default configuration
  const configList: PropertyConfiguration[] = React.useMemo(() => {
    if (configurations && configurations.length > 0) {
      return configurations;
    }
    return [
      {
        id: 'cfg-default',
        bhk: defaultBhk as any,
        carpetArea: defaultCarpetArea,
        superBuiltUpArea: defaultSuperBuiltUpArea,
        bathrooms: defaultBhk.includes('4') ? 4 : defaultBhk.includes('3') ? 3 : 2,
        balconies: 2,
        price: defaultPrice,
      },
    ];
  }, [configurations, defaultBhk, defaultCarpetArea, defaultSuperBuiltUpArea, defaultPrice]);

  const [activeId, setActiveId] = useState<string>(
    selectedConfigId || configList[0]?.id || 'cfg-default'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Synchronize with external selectedConfigId if provided
  React.useEffect(() => {
    if (selectedConfigId) {
      setActiveId(selectedConfigId);
    }
  }, [selectedConfigId]);

  const currentConfig = configList.find((c) => c.id === activeId) || configList[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (onSelectConfig) {
      onSelectConfig(id);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Determine BHK type for SVG selection
  const bhkNumber = currentConfig?.bhk?.match(/\d+/)?.[0] || '2';

  // Room dimension breakdown for current layout
  const roomDimensions = React.useMemo(() => {
    if (bhkNumber === '1') {
      return [
        { label: 'Living & Dining', dim: '16\'6" x 10\'6"' },
        { label: 'Master Bedroom', dim: '12\'0" x 10\'0"' },
        { label: 'Modular Kitchen', dim: '8\'6" x 7\'0"' },
        { label: 'Bathroom Suite', dim: '7\'0" x 4\'6"' },
        { label: 'Utility Balcony', dim: '6\'6" x 4\'0"' },
        { label: 'Foyer / Entry', dim: '5\'0" x 4\'0"' },
      ];
    }
    if (bhkNumber === '4') {
      return [
        { label: 'Living & Dining', dim: '28\'0" x 17\'0"' },
        { label: 'Master Suite', dim: '18\'0" x 15\'0"' },
        { label: 'Bedroom 2 Suite', dim: '14\'0" x 12\'6"' },
        { label: 'Bedroom 3 Suite', dim: '13\'6" x 12\'0"' },
        { label: 'Chef Kitchen', dim: '12\'6" x 9\'6"' },
        { label: 'Wrap Sundeck', dim: '28\'0" x 7\'0"' },
      ];
    }
    if (bhkNumber === '3') {
      return [
        { label: 'Living & Dining', dim: '25\'0" x 15\'6"' },
        { label: 'Master Suite', dim: '16\'0" x 13\'6"' },
        { label: 'Guest Bedroom 2', dim: '13\'0" x 11\'6"' },
        { label: 'Kids Bedroom 3', dim: '11\'6" x 11\'0"' },
        { label: 'Kitchen & Dry', dim: '11\'0" x 8\'6"' },
        { label: 'Sundeck Balcony', dim: '24\'0" x 6\'0"' },
      ];
    }
    return [
      { label: 'Living & Dining', dim: '20\'0" x 13\'0"' },
      { label: 'Master Suite', dim: '13\'6" x 11\'6"' },
      { label: 'Bedroom 2', dim: '11\'6" x 10\'6"' },
      { label: 'Modular Kitchen', dim: '9\'6" x 8\'0"' },
      { label: 'Master Bath', dim: '7\'6" x 4\'6"' },
      { label: 'Sundeck Balcony', dim: '12\'0" x 5\'0"' },
    ];
  }, [bhkNumber]);

  return (
    <div className="bg-white rounded-card border border-brand-border p-5 sm:p-6 shadow-card space-y-4">
      {/* 1. Header Bar: Title, RERA Badge & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-3.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-base sm:text-lg font-bold text-brand-text">Floor Plans &amp; Layouts</h3>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            RERA Approved
          </span>
          <span className="hidden md:inline-block text-xs text-brand-text-secondary">
            • Vastu Compliant 2D Architectural Scheme
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleDownload}
            className="px-2.5 py-1.5 rounded-button text-xs font-semibold border border-brand-border bg-brand-bg hover:bg-white text-brand-text transition flex items-center gap-1.5 shadow-2xs"
            title="Download PDF"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-success" />
                <span className="text-brand-success">Downloaded</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5 text-brand-red" />
                <span>Brochure</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 rounded-button text-xs font-bold bg-brand-text text-white hover:bg-brand-red transition flex items-center gap-1.5 shadow-2xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Enlarge Plan</span>
          </button>
        </div>
      </div>

      {/* 2. Compact Configuration Selector Pills */}
      {configList.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {configList.map((cfg) => {
            const isSelected = cfg.id === activeId;
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleSelect(cfg.id)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-bold border transition flex items-center gap-2 shrink-0',
                  isSelected
                    ? 'bg-brand-red text-white border-brand-red shadow-xs'
                    : 'bg-brand-bg text-brand-text border-brand-border hover:bg-white'
                )}
              >
                <span>{cfg.bhk}</span>
                <span className={cn('text-[11px] font-normal', isSelected ? 'text-white/90' : 'text-brand-text-secondary')}>
                  ({formatArea(cfg.carpetArea)})
                </span>
                <span className={cn('pl-1.5 border-l text-[11px] font-semibold', isSelected ? 'border-white/30 text-white' : 'border-brand-border text-brand-text')}>
                  {formatINR(cfg.price, isRent)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Optimized Space-Efficient 2-Column Split: Specs on Left, Drawing on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Left Column (5 Cols): Compact Specs & Room Dimension Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          {/* 4 Key Dimensions Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border">
              <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Carpet Area</span>
              <span className="text-sm font-bold text-brand-text mt-0.5 block">{formatArea(currentConfig.carpetArea)}</span>
              <span className="text-[10px] text-brand-text-secondary block">100% Usable Space</span>
            </div>
            <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border">
              <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Super Built-Up</span>
              <span className="text-sm font-bold text-brand-text mt-0.5 block">{formatArea(currentConfig.superBuiltUpArea)}</span>
              <span className="text-[10px] text-brand-text-secondary block">
                {Math.round((currentConfig.carpetArea / currentConfig.superBuiltUpArea) * 100)}% Efficiency
              </span>
            </div>
            <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border">
              <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Bathrooms</span>
              <span className="text-sm font-bold text-brand-text mt-0.5 block">{currentConfig.bathrooms} En-Suite</span>
              <span className="text-[10px] text-brand-text-secondary block">Luxury Fittings</span>
            </div>
            <div className="p-2.5 bg-brand-bg rounded-lg border border-brand-border">
              <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Balconies &amp; Vastu</span>
              <span className="text-sm font-bold text-brand-text mt-0.5 block">{currentConfig.balconies} Sundecks</span>
              <span className="text-[10px] text-brand-text-secondary block">East Facing</span>
            </div>
          </div>

          {/* Room Dimensions Compact Table */}
          <div className="p-3 bg-brand-bg/60 rounded-lg border border-brand-border">
            <span className="text-[10px] font-bold text-brand-text uppercase tracking-wider block mb-2">
              Key Room Dimensions
            </span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {roomDimensions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5 border-b border-brand-border/40 text-[11px]">
                  <span className="text-brand-text-secondary truncate">{item.label}:</span>
                  <span className="font-bold text-brand-text whitespace-nowrap ml-1">{item.dim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Flat Tour CTA Button */}
          <button
            type="button"
            onClick={() => {
              if (onScheduleVisit) {
                onScheduleVisit();
              } else {
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }
            }}
            className="w-full py-2 px-3 rounded-button text-xs font-bold border border-brand-red/30 bg-brand-red-light/40 hover:bg-brand-red hover:text-white text-brand-red transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Tour Actual Sample Flat on Site</span>
          </button>
        </div>

        {/* Right Column (7 Cols): Architectural CAD Blueprint Canvas */}
        <div className="lg:col-span-7 relative rounded-card overflow-hidden border border-brand-border bg-[#F8FAFC] p-3 sm:p-5 flex flex-col items-center justify-center min-h-[290px] sm:min-h-[330px] group">
          {/* Subtle CAD Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #0F172A 1px, transparent 1px), linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Top Floating Badge Bar */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 border border-brand-border text-brand-text shadow-2xs backdrop-blur-xs">
              <Layers className="w-3 h-3 text-brand-red" />
              {currentConfig.bhk} Layout Scheme
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-semibold text-brand-text-secondary">
              Scale 1:100
            </span>
          </div>

          {/* Compass Rose */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-white/95 border border-brand-border rounded px-2 py-0.5 text-[10px] font-bold text-brand-text shadow-2xs backdrop-blur-xs">
            <Compass className="w-3 h-3 text-brand-red" />
            <span>North</span>
          </div>

          {/* Vector Blueprint Drawing */}
          <div
            className="relative w-full max-w-xl cursor-pointer transition-transform duration-300 hover:scale-[1.01] my-auto"
            onClick={() => setIsModalOpen(true)}
            title="Click to enlarge floor plan"
          >
            {bhkNumber === '4' ? (
              <FloorPlan4BHK config={currentConfig} />
            ) : bhkNumber === '3' ? (
              <FloorPlan3BHK config={currentConfig} />
            ) : bhkNumber === '1' ? (
              <FloorPlan1BHK config={currentConfig} />
            ) : (
              <FloorPlan2BHK config={currentConfig} />
            )}
          </div>

          {/* Bottom Floating Hint */}
          <div className="w-full flex items-center justify-between pt-2 border-t border-brand-border/40 text-[10px] text-brand-text-secondary z-10">
            <span>Measurements subject to MahaRERA sanction</span>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-brand-red font-bold hover:underline flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>Full Screen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-card max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-brand-border relative p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-brand-text">
                  {currentConfig.bhk} Comprehensive Floor Plan Layout
                </h3>
                <p className="text-xs text-brand-text-secondary mt-0.5">
                  {propertyTitle} • Carpet Area: {formatArea(currentConfig.carpetArea)} ({currentConfig.superBuiltUpArea} sq.ft Super Built-up)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-red hover:text-white transition font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Large Blueprint Canvas */}
            <div className="bg-[#F8FAFC] rounded-lg border border-brand-border p-6 flex items-center justify-center">
              <div className="w-full max-w-3xl">
                {bhkNumber === '4' ? (
                  <FloorPlan4BHK config={currentConfig} isEnlarged />
                ) : bhkNumber === '3' ? (
                  <FloorPlan3BHK config={currentConfig} isEnlarged />
                ) : bhkNumber === '1' ? (
                  <FloorPlan1BHK config={currentConfig} isEnlarged />
                ) : (
                  <FloorPlan2BHK config={currentConfig} isEnlarged />
                )}
              </div>
            </div>

            {/* Room Dimensions Breakdown Table in Modal */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">
                Full Room Dimensions Breakdown
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {roomDimensions.map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-brand-bg border border-brand-border flex items-center justify-between">
                    <span className="text-brand-text-secondary text-[11px]">{item.label}</span>
                    <span className="font-bold text-brand-text">{item.dim}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs">
              <span className="text-brand-text-secondary">
                Configuration Price: <strong className="text-brand-text">{formatINR(currentConfig.price, isRent)}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-button font-bold bg-brand-red text-white hover:bg-brand-red-dark transition"
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

// =========================================================================
// VECTOR ARCHITECTURAL FLOOR PLAN BLUEPRINTS (1 BHK, 2 BHK, 3 BHK, 4 BHK)
// Scalable, crystal-clear CAD vector drawings
// =========================================================================

function FloorPlan1BHK({ config, isEnlarged = false }: { config: PropertyConfiguration; isEnlarged?: boolean }) {
  return (
    <svg
      viewBox="0 0 760 480"
      className="w-full h-auto drop-shadow-sm select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Boundary Wall */}
      <rect x="20" y="20" width="720" height="440" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />

      {/* ================= LIVING & DINING ROOM (Left 50%) ================= */}
      <rect x="20" y="140" width="370" height="230" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <rect x="40" y="170" width="45" height="110" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="95" y="190" width="55" height="70" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="220" y="170" width="80" height="50" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="205" cy="195" r="6" fill="#CBD5E1" />
      <circle cx="315" cy="195" r="6" fill="#CBD5E1" />
      <text x="180" y="270" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        LIVING &amp; DINING LOUNGE
      </text>
      <text x="180" y="288" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        16&apos;6&quot; &times; 10&apos;6&quot; (173 sq.ft)
      </text>

      {/* ================= PRIVATE SUNDECK BALCONY (Bottom-Left) ================= */}
      <rect x="20" y="370" width="370" height="90" fill="#FEF3C7" fillOpacity="0.45" stroke="#D97706" strokeWidth="2" strokeDasharray="4 2" />
      <line x1="20" y1="395" x2="390" y2="395" stroke="#FDE68A" strokeWidth="1" />
      <line x1="20" y1="420" x2="390" y2="420" stroke="#FDE68A" strokeWidth="1" />
      <line x1="20" y1="445" x2="390" y2="445" stroke="#FDE68A" strokeWidth="1" />
      <text x="195" y="420" textAnchor="middle" className="text-[12px] font-bold fill-amber-900 font-sans">
        SUNDECK BALCONY (4&apos;0&quot; Wide)
      </text>

      {/* ================= ENTRY FOYER (Top-Left) ================= */}
      <rect x="20" y="20" width="180" height="120" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
      <text x="110" y="75" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 font-sans">
        ENTRY FOYER
      </text>
      <text x="110" y="92" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        Vastu East Entry
      </text>
      <path d="M 35 125 A 30 30 0 0 1 65 95" fill="none" stroke="#C6383B" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="35" y1="125" x2="65" y2="125" stroke="#C6383B" strokeWidth="2" />

      {/* ================= MODULAR KITCHEN & UTILITY (Top-Right) ================= */}
      <rect x="200" y="20" width="190" height="120" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <rect x="205" y="25" width="180" height="24" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="230" cy="37" r="6" fill="#CBD5E1" />
      <circle cx="250" cy="37" r="6" fill="#CBD5E1" />
      <text x="295" y="80" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        MODULAR KITCHEN
      </text>
      <text x="295" y="96" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        8&apos;6&quot; &times; 7&apos;0&quot; + Dry Balcony
      </text>

      {/* ================= BATHROOM SUITE (Center-Right) ================= */}
      <rect x="390" y="20" width="350" height="140" fill="#EFF6FF" stroke="#334155" strokeWidth="2" />
      <circle cx="430" cy="70" r="14" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
      <rect x="670" y="40" width="55" height="70" rx="3" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1" />
      <text x="560" y="85" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        BATHROOM SUITE
      </text>
      <text x="560" y="102" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        7&apos;0&quot; &times; 4&apos;6&quot; (Premium Fittings)
      </text>

      {/* ================= SINGLE MASTER BEDROOM (Bottom-Right) ================= */}
      <rect x="390" y="160" width="350" height="300" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
      <rect x="490" y="220" width="115" height="135" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="500" y="228" width="42" height="25" rx="2" fill="#FFFFFF" />
      <rect x="552" y="228" width="42" height="25" rx="2" fill="#FFFFFF" />
      <rect x="465" y="225" width="20" height="25" rx="2" fill="#CBD5E1" />
      <rect x="610" y="225" width="20" height="25" rx="2" fill="#CBD5E1" />
      <rect x="670" y="200" width="50" height="180" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <text x="550" y="400" textAnchor="middle" className="text-[13px] font-bold fill-slate-900 font-sans">
        MASTER BEDROOM
      </text>
      <text x="550" y="418" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        12&apos;0&quot; &times; 10&apos;0&quot; + Wardrobe Niche
      </text>
    </svg>
  );
}

function FloorPlan2BHK({ config, isEnlarged = false }: { config: PropertyConfiguration; isEnlarged?: boolean }) {
  return (
    <svg
      viewBox="0 0 760 480"
      className="w-full h-auto drop-shadow-sm select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Boundary Wall */}
      <rect x="20" y="20" width="720" height="440" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />

      {/* ================= LIVING & DINING ROOM (Center-Left) ================= */}
      <rect x="20" y="140" width="360" height="230" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      {/* Furniture: Sofa */}
      <rect x="40" y="170" width="45" height="110" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="95" y="190" width="55" height="70" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      {/* Dining Table */}
      <rect x="220" y="170" width="90" height="55" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="205" cy="197" r="7" fill="#CBD5E1" />
      <circle cx="325" cy="197" r="7" fill="#CBD5E1" />
      {/* Labels */}
      <text x="180" y="270" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        LIVING &amp; DINING LOUNGE
      </text>
      <text x="180" y="288" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        22&apos;0&quot; &times; 14&apos;6&quot; (319 sq.ft)
      </text>

      {/* ================= PRIVATE SUNDECK BALCONY (Bottom-Left) ================= */}
      <rect x="20" y="370" width="360" height="90" fill="#FEF3C7" fillOpacity="0.45" stroke="#D97706" strokeWidth="2" strokeDasharray="4 2" />
      <line x1="20" y1="395" x2="380" y2="395" stroke="#FDE68A" strokeWidth="1" />
      <line x1="20" y1="420" x2="380" y2="420" stroke="#FDE68A" strokeWidth="1" />
      <line x1="20" y1="445" x2="380" y2="445" stroke="#FDE68A" strokeWidth="1" />
      <text x="200" y="420" textAnchor="middle" className="text-[12px] font-bold fill-amber-900 font-sans">
        PRIVATE SUNDECK BALCONY (6&apos;0&quot; Wide)
      </text>

      {/* ================= ENTRY FOYER (Top-Left) ================= */}
      <rect x="20" y="20" width="170" height="120" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
      <text x="105" y="75" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 font-sans">
        ENTRY FOYER
      </text>
      <text x="105" y="92" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        Vastu East Entry
      </text>
      <path d="M 35 125 A 30 30 0 0 1 65 95" fill="none" stroke="#C6383B" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="35" y1="125" x2="65" y2="125" stroke="#C6383B" strokeWidth="2" />

      {/* ================= MODULAR KITCHEN & UTILITY (Top-Center) ================= */}
      <rect x="190" y="20" width="190" height="120" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <rect x="195" y="25" width="180" height="24" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <rect x="350" y="49" width="25" height="85" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="230" cy="37" r="7" fill="#CBD5E1" />
      <circle cx="255" cy="37" r="7" fill="#CBD5E1" />
      <text x="280" y="80" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        MODULAR KITCHEN
      </text>
      <text x="280" y="96" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        10&apos;6&quot; &times; 8&apos;6&quot; + Dry Balcony
      </text>

      {/* ================= BEDROOM 2 / GUEST BEDROOM (Top-Right) ================= */}
      <rect x="380" y="20" width="360" height="200" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <rect x="490" y="30" width="95" height="115" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="500" y="35" width="35" height="22" rx="2" fill="#FFFFFF" />
      <rect x="540" y="35" width="35" height="22" rx="2" fill="#FFFFFF" />
      <rect x="685" y="30" width="45" height="140" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <text x="560" y="170" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        BEDROOM 2
      </text>
      <text x="560" y="188" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        12&apos;6&quot; &times; 11&apos;0&quot;
      </text>

      {/* ================= MASTER BEDROOM SUITE (Bottom-Right) ================= */}
      <rect x="380" y="220" width="360" height="240" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
      <rect x="500" y="260" width="115" height="135" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="510" y="268" width="42" height="25" rx="2" fill="#FFFFFF" />
      <rect x="562" y="268" width="42" height="25" rx="2" fill="#FFFFFF" />
      <rect x="475" y="265" width="20" height="25" rx="2" fill="#CBD5E1" />
      <rect x="620" y="265" width="20" height="25" rx="2" fill="#CBD5E1" />
      <rect x="680" y="240" width="50" height="170" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
      <text x="560" y="420" textAnchor="middle" className="text-[13px] font-bold fill-slate-900 font-sans">
        MASTER BEDROOM SUITE
      </text>
      <text x="560" y="438" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        14&apos;0&quot; &times; 12&apos;6&quot; + Walk-in Dresser
      </text>

      {/* ================= ATTACHED MASTER BATH & COMMON BATH ================= */}
      <rect x="380" y="220" width="110" height="95" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <text x="435" y="265" textAnchor="middle" className="text-[10px] font-bold fill-sky-900 font-sans">
        EN-SUITE BATH
      </text>
      <text x="435" y="280" textAnchor="middle" className="text-[9px] fill-sky-700 font-sans">
        8&apos;0&quot; &times; 5&apos;0&quot;
      </text>

      <rect x="380" y="125" width="110" height="95" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <text x="435" y="170" textAnchor="middle" className="text-[10px] font-bold fill-sky-900 font-sans">
        COMMON BATH
      </text>
      <text x="435" y="185" textAnchor="middle" className="text-[9px] fill-sky-700 font-sans">
        7&apos;6&quot; &times; 5&apos;0&quot;
      </text>
    </svg>
  );
}

function FloorPlan3BHK({ config, isEnlarged = false }: { config: PropertyConfiguration; isEnlarged?: boolean }) {
  return (
    <svg
      viewBox="0 0 820 500"
      className="w-full h-auto drop-shadow-sm select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Boundary Wall */}
      <rect x="20" y="20" width="780" height="460" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />

      {/* ================= LIVING & FORMAL DINING ROOM ================= */}
      <rect x="20" y="130" width="380" height="250" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <rect x="40" y="165" width="50" height="120" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="100" y="185" width="60" height="80" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="240" y="165" width="100" height="60" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="200" y="275" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        GRAND LIVING &amp; DINING
      </text>
      <text x="200" y="293" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        25&apos;0&quot; &times; 15&apos;6&quot; (387 sq.ft)
      </text>

      {/* Double Width Deck */}
      <rect x="20" y="380" width="380" height="100" fill="#FEF3C7" fillOpacity="0.45" stroke="#D97706" strokeWidth="2" strokeDasharray="4 2" />
      <text x="210" y="435" textAnchor="middle" className="text-[12px] font-bold fill-amber-900 font-sans">
        EXPANSIVE PANORAMIC SUNDECK (24&apos;0&quot; &times; 6&apos;0&quot;)
      </text>

      {/* Entry Foyer & Kitchen */}
      <rect x="20" y="20" width="180" height="110" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
      <text x="110" y="75" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 font-sans">
        ENTRY FOYER
      </text>

      <rect x="200" y="20" width="200" height="110" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <text x="300" y="75" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        GOURMET KITCHEN
      </text>

      {/* Bedroom 3 / Kids Room (Right-Top) */}
      <rect x="400" y="20" width="200" height="180" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <text x="500" y="105" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        BEDROOM 3 / KIDS
      </text>
      <text x="500" y="122" textAnchor="middle" className="text-[10px] fill-slate-500 font-sans">
        11&apos;6&quot; &times; 11&apos;0&quot;
      </text>

      {/* Bedroom 2 / Guest Suite (Right-Center) */}
      <rect x="600" y="20" width="200" height="220" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <text x="700" y="125" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        GUEST BEDROOM 2
      </text>
      <text x="700" y="143" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        13&apos;0&quot; &times; 11&apos;6&quot;
      </text>

      {/* Master Bedroom Suite (Right-Bottom) */}
      <rect x="400" y="240" width="400" height="240" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
      <text x="610" y="370" textAnchor="middle" className="text-[14px] font-bold fill-slate-900 font-sans">
        PALATIAL MASTER BEDROOM SUITE
      </text>
      <text x="610" y="390" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        16&apos;0&quot; &times; 13&apos;6&quot; + Walk-in Wardrobe + Master Bath
      </text>

      {/* Bathrooms */}
      <rect x="400" y="200" width="100" height="85" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <text x="450" y="245" textAnchor="middle" className="text-[10px] font-bold fill-sky-900 font-sans">
        BATH 2
      </text>

      <rect x="500" y="200" width="100" height="85" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <text x="550" y="245" textAnchor="middle" className="text-[10px] font-bold fill-sky-900 font-sans">
        POWDER
      </text>
    </svg>
  );
}

function FloorPlan4BHK({ config, isEnlarged = false }: { config: PropertyConfiguration; isEnlarged?: boolean }) {
  return (
    <svg
      viewBox="0 0 880 520"
      className="w-full h-auto drop-shadow-sm select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Boundary Wall */}
      <rect x="20" y="20" width="840" height="480" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="4" />

      {/* Living & Dining Area */}
      <rect x="20" y="140" width="420" height="260" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <text x="230" y="260" textAnchor="middle" className="text-[14px] font-bold fill-slate-900 font-sans">
        DOUBLE-HEIGHT LIVING &amp; FORMAL DINING
      </text>
      <text x="230" y="280" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        28&apos;0&quot; &times; 17&apos;0&quot; (476 sq.ft)
      </text>

      {/* Deck Wrap */}
      <rect x="20" y="400" width="420" height="100" fill="#FEF3C7" fillOpacity="0.45" stroke="#D97706" strokeWidth="2" strokeDasharray="4 2" />
      <text x="230" y="455" textAnchor="middle" className="text-[12px] font-bold fill-amber-900 font-sans">
        SIGNATURE WRAP-AROUND SUNDECK (28&apos;0&quot; &times; 7&apos;0&quot;)
      </text>

      {/* Foyer & Chef Kitchen */}
      <rect x="20" y="20" width="200" height="120" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
      <text x="120" y="80" textAnchor="middle" className="text-[12px] font-bold fill-slate-700 font-sans">
        PRIVATE FOYER
      </text>

      <rect x="220" y="20" width="220" height="120" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <text x="330" y="80" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        CHEF&apos;S ISLAND KITCHEN
      </text>

      {/* Bedroom 4 / Study */}
      <rect x="440" y="20" width="190" height="190" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <text x="535" y="110" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        BEDROOM 4 / STUDY
      </text>

      {/* Bedroom 3 */}
      <rect x="630" y="20" width="230" height="210" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
      <text x="745" y="120" textAnchor="middle" className="text-[13px] font-bold fill-slate-800 font-sans">
        BEDROOM 3 SUITE
      </text>

      {/* Bedroom 2 */}
      <rect x="440" y="210" width="200" height="190" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <text x="540" y="300" textAnchor="middle" className="text-[12px] font-bold fill-slate-800 font-sans">
        BEDROOM 2 SUITE
      </text>

      {/* Master Sky Suite */}
      <rect x="640" y="230" width="220" height="270" fill="#F1F5F9" stroke="#334155" strokeWidth="3" />
      <text x="750" y="370" textAnchor="middle" className="text-[14px] font-bold fill-slate-900 font-sans">
        PRESIDENTIAL
      </text>
      <text x="750" y="390" textAnchor="middle" className="text-[14px] font-bold fill-slate-900 font-sans">
        MASTER SUITE
      </text>
      <text x="750" y="410" textAnchor="middle" className="text-[11px] fill-slate-500 font-sans">
        18&apos;0&quot; &times; 15&apos;0&quot;
      </text>
    </svg>
  );
}
