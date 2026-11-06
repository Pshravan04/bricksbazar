import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Home,
  Building2,
  TrendingUp,
  Globe,
  Scale,
  BadgeCheck,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/constants';

export const metadata: Metadata = {
  title: 'Our Services | BricksBazar Realty LLP - Realty in Detail',
  description:
    'Comprehensive real estate advisory in Mumbai: Residential properties, commercial spaces, high-yield investments, NRI consultation, and MahaRERA legal diligence.',
};

const SERVICES = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Properties',
    tagline: 'Finding Your Perfect Mumbai Home with Precision',
    description:
      'From prime sea-facing penthouses in South Mumbai to contemporary gated high-rises in the Western and Central suburbs, we curate homes tailored to your lifestyle and budget.',
    offerings: [
      {
        title: 'Newly Launched Apartments',
        desc: 'Early-bird access to premier developer launches with in-depth floor plan analysis and pre-booking benefits.',
      },
      {
        title: 'Under-Construction Projects',
        desc: 'MahaRERA progress tracking, escrow account compliance, and milestone-linked payment plan guidance.',
      },
      {
        title: 'Ready-to-Move Residences',
        desc: 'Immediate possession homes with verified Occupancy Certificates (OC), clear titles, and pristine amenities.',
      },
    ],
    highlight: 'Curated 1, 2, 3, 4+ BHK options across Goregaon, Bandra, Powai, Ghatkopar, Thane & Worli.',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Spaces',
    tagline: 'Strategic Workspaces Designed to Elevate Business',
    description:
      'We align commercial real estate with your operational growth, offering Grade-A corporate offices, retail frontage, and logistics assets across Mumbai’s major financial hubs.',
    offerings: [
      {
        title: 'Corporate Office Spaces',
        desc: 'Bare-shell and plug-and-play offices in BKC, Andheri, Powai, Lower Parel, and Navi Mumbai commercial nodes.',
      },
      {
        title: 'High-Street Retail Shops',
        desc: 'High-footfall commercial spaces engineered for maximum brand visibility, customer density, and strong rental yields.',
      },
      {
        title: 'Industrial Units & Warehousing',
        desc: 'Functional industrial setups with optimal logistics connectivity, heavy power supply, and cargo access.',
      },
    ],
    highlight: 'Offices from 300 to 10,000+ sq.ft with modern HVAC and LEED green building standards.',
  },
  {
    id: 'investment',
    icon: TrendingUp,
    title: 'Investment Opportunities',
    tagline: 'Data-Driven Insights for High-Yield Capital Growth',
    description:
      'Unlock the full wealth-building potential of Mumbai real estate with Bricksbazar Realty LLP. We provide deep market analytics and strategic foresight for maximum ROI.',
    offerings: [
      {
        title: 'High ROI & Capital Growth Corridors',
        desc: 'Expert intelligence on upcoming infrastructure (Metro lines, Coastal Road, Trans-Harbour Link) driving price surges.',
      },
      {
        title: 'Pre-Leased Commercial Units',
        desc: 'Immediate rental returns backed by long-term leases with multinational tenants and structured escalation clauses.',
      },
      {
        title: 'Strategic Land & Villa Plots',
        desc: 'Clear-title NA/commercial plots in Khopoli, Alibaug, and surrounding peri-urban growth belts.',
      },
    ],
    highlight: 'Rigorous yield modeling and exit strategy planning for discerning investors.',
  },
  {
    id: 'nri',
    icon: Globe,
    title: 'NRI Consultation & Advisory',
    tagline: 'Effortless Remote Property Acquisition in Mumbai',
    description:
      'Tailored consultation designed specifically for Non-Resident Indians seeking to purchase, invest, or manage property in India with complete legal security and transparent updates.',
    offerings: [
      {
        title: 'Virtual Tours & Video Walkthroughs',
        desc: 'High-definition 360-degree interactive tours and live construction streaming from the site.',
      },
      {
        title: 'Power of Attorney & Legal Documentation',
        desc: 'Seamless assistance with PoA registration, KYC compliance, RBI/FEMA regulations, and NRE/NRO repatriation.',
      },
      {
        title: 'Property Care & Tenancy Management',
        desc: 'Complete property oversight while you are abroad: tenant screening, lease agreements, and maintenance.',
      },
    ],
    highlight: 'Trusted by Indian expats in the UAE, USA, UK, Singapore, and Canada.',
  },
  {
    id: 'advisory',
    icon: Scale,
    title: 'Legal Due Diligence & Home Loans',
    tagline: '100% Risk Mitigation and Regulatory Compliance',
    description:
      'Every property transaction is backed by thorough legal verification and competitive financing solutions from top national financial institutions.',
    offerings: [
      {
        title: 'MahaRERA Title & Land Registry Audit',
        desc: 'Verification of promoter RERA registrations, encumbrance certificates, approved sanction plans, and litigations.',
      },
      {
        title: 'Home Loan Facilitation',
        desc: 'Preferred tie-ups with leading banks (HDFC, SBI, ICICI, Axis) for fast pre-approvals and subsidized interest rates.',
      },
      {
        title: 'Stamp Duty & Registration Support',
        desc: 'Complete on-ground support at Mumbai sub-registrar offices for smooth, hassle-free document registration.',
      },
    ],
    highlight: 'Registered Real Estate Agent under MahaRERA No. A51800029418.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#EAEAEA] py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-md uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Realty in Detail &bull; Over a Decade of Expertise</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
            Our Real Estate Advisory Services
          </h1>
          <p className="text-base sm:text-lg text-[#777777] mt-4 max-w-3xl mx-auto leading-relaxed">
            At Bricksbazar Realty LLP, &#8220;Realty in Detail&#8221; means delivering advisory with meticulous attention to every
            facet of Mumbai&apos;s property landscape. From your initial aspiration to key handover, we ensure a seamless and
            rewarding journey.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#252525]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              MahaRERA Agent: A51800029418
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-[#252525] border border-gray-200">
              <MapPin className="w-4 h-4 text-[#C6383B]" />
              Powai & Ghatkopar West, Mumbai
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-[#252525] border border-gray-200">
              <Phone className="w-4 h-4 text-[#C6383B]" />
              +91 98206 15020 / +91 98206 15070
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {SERVICES.map((srv, index) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              id={srv.id}
              className="bg-white rounded-2xl border border-[#EAEAEA] p-6 sm:p-10 shadow-xs hover:border-gray-300 transition"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FCEEEF] text-[#C6383B] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#C6383B] uppercase tracking-wider block mb-0.5">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">{srv.title}</h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#777777] mt-1">{srv.tagline}</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#252525] text-white hover:bg-[#C6383B] transition text-xs font-bold whitespace-nowrap self-start"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-sm text-[#777777] my-6 leading-relaxed max-w-4xl">{srv.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {srv.offerings.map((off, oidx) => (
                  <div key={oidx} className="bg-[#F8F8F8] p-5 rounded-xl border border-[#EAEAEA]">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C6383B] flex-shrink-0" />
                      <h3 className="font-bold text-sm text-[#252525]">{off.title}</h3>
                    </div>
                    <p className="text-xs text-[#777777] leading-relaxed">{off.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAEAEA]/80 flex items-center gap-2 text-xs font-semibold text-[#252525]">
                <span className="w-2 h-2 rounded-full bg-[#C6383B]" />
                <span className="text-[#777777]">Focus:</span>
                <span>{srv.highlight}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#252525] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#C6383B] tracking-wider uppercase">Let&apos;s Connect</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Don’t Wait To Secure Your Next Great Mumbai Property Deal!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Have questions or need expert advice on your real estate journey? Reach out to our team of licensed consultants at
              Bricksbazar Realty LLP.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+919820615020"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C6383B] text-white hover:bg-[#AB2F32] font-bold text-xs transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 98206 15020</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-600 hover:border-white text-white font-semibold text-xs transition"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
