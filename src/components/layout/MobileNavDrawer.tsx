'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS, BRAND, CITIES } from '@/constants';
import { Button } from '@/components/ui/Button';
import {
  X,
  ChevronDown,
  User,
  PlusCircle,
  Building,
  Store,
  Phone,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-dropdown flex flex-col z-10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-border bg-brand-bg/60">
          <div className="relative h-8 w-32 flex-shrink-0">
            <Image
              src="/brand/logo-header.png"
              alt="BricksBazar"
              fill
              className="object-contain object-left"
              priority
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-brand-text-secondary hover:text-brand-text hover:bg-brand-border/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CTA Buttons Row */}
        <div className="p-4 border-b border-brand-border space-y-2">
          <Link href="/dashboard/properties/create" onClick={onClose} className="block w-full">
            <Button className="w-full gap-2 text-xs font-bold" size="sm">
              <PlusCircle className="w-4 h-4" />
              Post Free Property
            </Button>
          </Link>
          <Link href="/login" onClick={onClose} className="block w-full">
            <Button variant="secondary" className="w-full gap-2 text-xs font-bold" size="sm">
              <User className="w-4 h-4" />
              Login / Register
            </Button>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
            const isExpanded = expandedSection === link.label;
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            if (!hasDropdown) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block px-3 py-2.5 rounded-button text-sm font-semibold transition',
                    isActive
                      ? 'bg-brand-red-light text-brand-red font-bold'
                      : 'text-brand-text hover:bg-brand-bg'
                  )}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.label} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleSection(link.label)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-button text-sm font-semibold transition text-left',
                    isExpanded || isActive
                      ? 'bg-brand-bg text-brand-red'
                      : 'text-brand-text hover:bg-brand-bg'
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-brand-text-secondary transition-transform duration-200',
                      isExpanded && 'rotate-180'
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-brand-red-light ml-3">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block px-3 py-1.5 text-xs font-bold text-brand-red hover:underline"
                    >
                      All {link.label} &rarr;
                    </Link>
                    {link.dropdown?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className="block px-3 py-1.5 rounded text-xs font-medium text-brand-text-secondary hover:text-brand-text hover:bg-brand-bg transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Cities Section */}
          <div className="pt-4 mt-4 border-t border-brand-border">
            <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider block mb-2 px-3">
              Explore Metros
            </span>
            <div className="grid grid-cols-2 gap-1.5 px-2">
              {CITIES.slice(0, 6).map((city) => (
                <Link
                  key={city.id}
                  href={`/buy?city=${city.name}`}
                  onClick={onClose}
                  className="px-2.5 py-1.5 bg-brand-bg rounded text-xs font-medium text-brand-text hover:text-brand-red truncate block"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="p-4 border-t border-brand-border bg-brand-bg/40 text-xs text-brand-text-secondary space-y-1">
          <div className="flex items-center gap-2 font-semibold text-brand-text">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>{BRAND.contact.phone}</span>
          </div>
          <p className="text-[11px] text-brand-text-muted">
            Mon - Sat (9:00 AM - 7:00 PM IST)
          </p>
        </div>
      </div>
    </div>
  );
}

