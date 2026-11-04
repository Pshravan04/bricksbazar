import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Building2,
  ShieldCheck,
  Users,
  Award,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us | BricksBazar',
  description:
    'Learn about BricksBazar: India premier real estate marketplace bridging homebuyers, developers, verified brokers, and construction material suppliers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#EAEAEA] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Our Mission & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
            Building Transparency in Indian Real Estate
          </h1>
          <p className="text-base sm:text-lg text-[#777777] mt-5 max-w-3xl mx-auto leading-relaxed">
            BricksBazar is India’s integrated property discovery platform and construction material marketplace. We
            bring together homebuyers, verified RERA agents, premier developers, and certified material suppliers
            under one trusted ecosystem.
          </p>
        </div>
      </section>

      {/* Core Values / Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252525]">The BricksBazar Foundation</h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-2">
            Engineered to replace fragmented portals, hidden brokerage traps, and unverified building materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="w-12 h-12 bg-red-50 text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Strict RERA Verification</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-2 leading-relaxed">
              Every project and broker profile is matched against official State RERA regulatory registries, ensuring
              only legitimate titles and registered promoters enter our discovery index.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="w-12 h-12 bg-red-50 text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Full Life-Cycle Platform</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-2 leading-relaxed">
              From land acquisition and raw construction materials (TMT steel, cement) to residential launches and
              secondary co-broking, we power the complete real estate lifecycle.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="w-12 h-12 bg-red-50 text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Standardized Co-Broking</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-2 leading-relaxed">
              We empower verified agents and brokers to collaborate through our Lead Exchange with clean 50:50
              commission splits, reducing transaction friction in high-value Tier-1 deals.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Network Footprint */}
      <section className="bg-white border-y border-[#EAEAEA] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">8+</p>
              <p className="text-xs text-[#777777] uppercase font-semibold mt-1">Metro Markets Covered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">100%</p>
              <p className="text-xs text-[#777777] uppercase font-semibold mt-1">RERA Mandated Checks</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">2,500+</p>
              <p className="text-xs text-[#777777] uppercase font-semibold mt-1">Verified Agents & Dealers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">₹ 500 Cr+</p>
              <p className="text-xs text-[#777777] uppercase font-semibold mt-1">Quarterly Inventory Pipeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <div className="bg-[#252525] text-white p-8 sm:p-12 rounded-3xl shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Experience the New Real Estate Standard?</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Join thousands of prospective homebuyers, verified brokers, and top developers transacting transparently.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link href="/buy">
              <Button variant="primary" size="md" className="bg-[#C6383B] hover:bg-[#b03033]">
                Explore Verified Properties
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="md" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Register as a Professional
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

