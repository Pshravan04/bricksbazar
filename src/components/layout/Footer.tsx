'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/constants';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Building,
  Handshake,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Don't render public footer on admin or dashboard sub-routes
  const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  if (isDashboardRoute) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-brand-border text-brand-text">
      {/* 1. Top Value Propositions Strip */}
      <div className="border-b border-brand-border bg-brand-bg/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1840px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-white transition group">
            <div className="w-10 h-10 rounded-lg bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-brand-text font-heading">100% RERA Verified</h4>
              <p className="text-xs text-brand-text-secondary mt-0.5 leading-relaxed">
                Every listed project is cross-checked with State RERA registries for undisputed title clearance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-white transition group">
            <div className="w-10 h-10 rounded-lg bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-brand-text font-heading">Direct Developer Desk</h4>
              <p className="text-xs text-brand-text-secondary mt-0.5 leading-relaxed">
                Connect directly with property owners and marquee builders without spam calls or hidden markups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-white transition group">
            <div className="w-10 h-10 rounded-lg bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-brand-text font-heading">50:50 Co-Broking</h4>
              <p className="text-xs text-brand-text-secondary mt-0.5 leading-relaxed">
                Transparent commission sharing and off-market mandate collaboration for licensed consultants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-white transition group">
            <div className="w-10 h-10 rounded-lg bg-brand-red-light text-brand-red flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red group-hover:text-white transition">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-brand-text font-heading">Institutional Advisory</h4>
              <p className="text-xs text-brand-text-secondary mt-0.5 leading-relaxed">
                Private client site visits, market price benchmark checks, and legal escrow support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Real Estate Intelligence Newsletter Strip */}
      <div className="border-b border-brand-border py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1840px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-xl bg-brand-bg/60 border border-brand-border">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-red block mb-1">
              Market Intelligence &bull; Quarterly Report
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-brand-text">
              Subscribe to The BricksBazar Real Estate Index
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary mt-1">
              Curated micro-market price movements, MahaRERA policy updates, and off-market luxury launches delivered quarterly.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-shrink-0 flex items-center gap-2 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 text-brand-success text-xs font-bold bg-brand-success-light px-4 py-2.5 rounded-lg border border-brand-success/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! You are subscribed to our quarterly intelligence report.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your official email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-brand-border text-brand-text text-xs rounded-lg px-4 py-2.5 w-full sm:w-72 focus:outline-none focus:border-brand-red transition shadow-xs"
                />
                <Button type="submit" size="sm" className="rounded-lg text-xs font-bold px-4 py-2.5 flex-shrink-0">
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* 3. Main Footer Directory Links */}
      <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit" aria-label="BricksBazar Home">
              <div className="relative h-9 w-9 flex-shrink-0">
                <Image
                  src="/brand/logo-mark.png"
                  alt="BricksBazar"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-brand-text group-hover:text-brand-red transition">
                Bricks<span className="text-brand-red">Bazar</span>
              </span>
            </Link>

            <p className="text-xs text-brand-text-secondary leading-relaxed max-w-sm font-sans">
              BricksBazar is India’s premier real estate discovery platform connecting verified luxury residences, high-yield commercial assets, and accredited MahaRERA brokers across top Indian economic corridors.
            </p>

            <div className="space-y-2 text-xs text-brand-text-secondary pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{BRAND.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span className="font-semibold text-brand-text">{BRAND.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>{BRAND.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Prime Residences Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-brand-text uppercase tracking-wider font-heading">
              Prime Residences
            </h5>
            <ul className="space-y-2 text-xs text-brand-text-secondary">
              <li>
                <Link href="/buy?city=Mumbai" className="hover:text-brand-red transition">
                  Luxury Flats in Mumbai
                </Link>
              </li>
              <li>
                <Link href="/buy?city=Pune" className="hover:text-brand-red transition">
                  Modern Condos in Pune
                </Link>
              </li>
              <li>
                <Link href="/buy?city=Bengaluru" className="hover:text-brand-red transition">
                  Tech Corridor Homes in Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/buy?city=Hyderabad" className="hover:text-brand-red transition">
                  Gated Communities in Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/buy?city=Goa" className="hover:text-brand-red transition">
                  Sea-Facing Luxury Villas in Goa
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-brand-red transition">
                  High-End Corporate Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* Commercial & Plots Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-brand-text uppercase tracking-wider font-heading">
              Commercial &amp; Land
            </h5>
            <ul className="space-y-2 text-xs text-brand-text-secondary">
              <li>
                <Link href="/commercial" className="hover:text-brand-red transition">
                  Grade-A Corporate Offices
                </Link>
              </li>
              <li>
                <Link href="/commercial" className="hover:text-brand-red transition">
                  Pre-Leased High-Yield Retail
                </Link>
              </li>
              <li>
                <Link href="/plots" className="hover:text-brand-red transition">
                  Clear-Title Residential Plots
                </Link>
              </li>
              <li>
                <Link href="/new-projects" className="hover:text-brand-red transition">
                  Tier-1 Developer Launches
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-brand-red transition">
                  Real Estate Price Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Legal Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-brand-text uppercase tracking-wider font-heading">
              Network &amp; Legal
            </h5>
            <ul className="space-y-2 text-xs text-brand-text-secondary">
              <li>
                <Link href="/post-property" className="hover:text-brand-red font-semibold text-brand-red transition">
                  List Property For Free &rarr;
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-brand-red transition">
                  MahaRERA Broker Directory
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-brand-red transition">
                  Marquee Developer Registry
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-red transition">
                  About BricksBazar
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-red transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-brand-red transition">
                  Terms of Service &amp; RERA Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Bottom Copyright Bar */}
      <div className="border-t border-brand-border bg-brand-bg py-5 px-4 sm:px-6 lg:px-8 text-xs text-brand-text-secondary">
        <div className="max-w-[1840px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} BricksBazar Real Estate Platforms Ltd. All rights reserved. MahaRERA Regulatory Compliant.
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-brand-success">
              <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse inline-block" />
              Verified Registry Live
            </span>
            <span>&bull;</span>
            <span className="text-brand-text-secondary">
              ISO 9001:2015 Quality Standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
