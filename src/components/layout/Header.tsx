'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS, BRAND } from '@/constants';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  User,
  ArrowRight,
} from 'lucide-react';
import { MobileNavDrawer } from './MobileNavDrawer';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Don't render public header on admin or dashboard sub-routes
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  if (isDashboardRoute) return null;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b border-brand-border',
          isScrolled ? 'shadow-sticky py-2.5' : 'py-3.5'
        )}
      >
        <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Brand Logo (Header logo artwork, no extra text) */}
          <Link href="/" className="flex items-center flex-shrink-0 py-0.5 group" aria-label="BricksBazar Home">
            <div className="relative h-9 sm:h-10 md:h-11 w-32 sm:w-36 md:w-40 flex-shrink-0">
              <Image
                src="/brand/logo-header.png"
                alt="BricksBazar"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);

              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(link.label)}
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition select-none',
                      isActive
                        ? 'text-brand-red bg-brand-red-light/60 font-bold'
                        : 'text-brand-text hover:text-brand-red hover:bg-brand-bg/80'
                    )}
                  >
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200 text-brand-text-secondary group-hover:text-brand-red',
                          openDropdown === link.label && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu Card */}
                  {hasDropdown && (
                    <div
                      className={cn(
                        'absolute top-full left-0 pt-2 transition-all duration-200 z-50',
                        openDropdown === link.label
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible pointer-events-none translate-y-1'
                      )}
                    >
                      <div className="w-72 bg-white rounded-xl shadow-dropdown border border-brand-border p-2">
                        <div className="py-0.5 space-y-0.5">
                          {link.dropdown?.map((sub: any) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="group/item flex flex-col px-3 py-2 rounded-lg hover:bg-brand-red-light/60 transition"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-brand-text group-hover/item:text-brand-red transition">
                                  {sub.label}
                                </span>
                                <ArrowRight className="w-3 h-3 text-brand-text-muted opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-brand-red transition-all" />
                              </div>
                              {sub.description && (
                                <span className="text-[11px] text-brand-text-secondary mt-0.5 line-clamp-1">
                                  {sub.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Login / Register */}
            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="text-xs font-bold gap-1.5">
                <User className="w-3.5 h-3.5 text-brand-text-secondary" />
                Login / Register
              </Button>
            </Link>

            {/* Post Property CTA */}
            <Link href="/dashboard/properties/create">
              <Button size="sm" className="text-xs font-bold gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm">
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Post Property</span>
                <span className="sm:hidden text-xs">Post</span>
                <span className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[9px] bg-white/20 text-white rounded font-bold uppercase tracking-wider">
                  Free
                </span>
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-brand-text hover:bg-brand-bg border border-brand-border transition flex-shrink-0"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

