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
  Phone,
  Mail,
  HeartHandshake,
  Lightbulb,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/constants';

export const metadata: Metadata = {
  title: 'About Us | BricksBazar Realty LLP — Realty in Detail',
  description:
    'Bricksbazar Realty LLP is a trusted Mumbai real estate consultancy bringing over a decade of expertise, MahaRERA compliance (A51800029418), and meticulous service across residential, commercial, and investment portfolios.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#EAEAEA] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-md uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Realty in Detail &bull; Over A Decade in Mumbai</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#252525] tracking-tight leading-tight">
            About Bricksbazar Realty LLP
          </h1>
          <p className="text-base sm:text-xl font-medium text-[#C6383B] mt-2">
            &#8220;Realty in Detail&#8221;
          </p>
          <p className="text-base sm:text-lg text-[#777777] mt-4 max-w-3xl mx-auto leading-relaxed">
            At Bricksbazar Realty LLP, we don&apos;t just sell properties—we build lasting relationships. Located in the vibrant heart
            of Powai and Ghatkopar West, Mumbai, our firm has been a trusted cornerstone of the local real estate scene for over a
            decade. Our passion for real estate in Mumbai is driven by the joy of helping our clients find their perfect home or investment.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#252525]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              MahaRERA Registered Agent: A51800029418
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

      {/* Stats Counter Section */}
      <section className="bg-white border-b border-[#EAEAEA] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">10+ Years</p>
              <p className="text-xs text-[#777777] uppercase font-bold mt-1">Real Estate Expertise</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">500+ Units</p>
              <p className="text-xs text-[#777777] uppercase font-bold mt-1">Available Curated Inventory</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">25+ Builders</p>
              <p className="text-xs text-[#777777] uppercase font-bold mt-1">Official Tier-1 Partners</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#C6383B]">1,200+</p>
              <p className="text-xs text-[#777777] uppercase font-bold mt-1">Satisfied Homeowners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C6383B] tracking-wider uppercase">Guiding Principles</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] mt-1">Our Mission, Vision & Values</h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-2">
            Delivering meticulous service with unwavering dedication to understanding and fulfilling your unique property needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 bg-[#FCEEEF] text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Our Mission</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed">
              To offer comprehensive real estate solutions tailored to the unique needs of each client. We take the time to understand
              and fulfill your aspirations, ensuring that every interaction provides exceptional value and service. Our goal is to make
              your real estate journey as smooth and rewarding as possible.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 bg-[#FCEEEF] text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Our Vision</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed">
              We aim to be the most trusted and innovative consultancy, known for our client-centric approach. We strive to stand out
              for our unparalleled service, continually pushing boundaries to offer you the best in the industry, creating lasting
              relationships built on trust and exceptional experiences.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] shadow-xs hover:border-gray-300 transition">
            <div className="w-12 h-12 bg-[#FCEEEF] text-[#C6383B] rounded-xl flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#252525]">Our Values</h3>
            <p className="text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed">
              Integrity is at the core of everything we do; we believe in honest and transparent dealings. We place your satisfaction at
              the forefront, driven by a commitment to excellence in all our endeavors. Embracing innovation, we deliver cutting-edge
              solutions that meet your evolving needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Purpose & Heritage */}
      <section className="bg-white border-y border-[#EAEAEA] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#C6383B] tracking-wider uppercase">Our Purpose</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525]">
                Exploring Future Dwelling Spaces with &ldquo;Realty in Detail&rdquo;
              </h2>
              <p className="text-sm text-[#777777] leading-relaxed">
                Whether you are seeking newly launched apartments with early-bird benefits, mid-stage under-construction developments
                with milestone escrow security, or ready-to-move luxury sanctuaries in prime Mumbai neighbourhoods, our team is equipped
                with the ground intelligence to assist you.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#252525]">Diverse Living Spaces</h4>
                    <p className="text-xs text-[#777777]">
                      Curated 1, 2, 3, 4+ BHK residences, coastal penthouses, and bespoke gated communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#252525]">Transparent, Verified Pricing</h4>
                    <p className="text-xs text-[#777777]">
                      Direct developer pricing, no hidden markups, and structured RERA payment schedule verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#252525]">Savvy Investment Picks</h4>
                    <p className="text-xs text-[#777777]">
                      High ROI projects, pre-leased offices, and land acquisition across high-growth transit corridors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8F8F8] p-8 rounded-2xl border border-[#EAEAEA] space-y-5">
              <h3 className="text-lg font-bold text-[#252525] border-b border-[#EAEAEA] pb-3">
                Corporate & Registered Office
              </h3>
              <div className="space-y-3 text-xs text-[#777777]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252525] block">Office Address:</strong>
                    A-909, 9th Floor, Crystal 86-Central, off Shreyas Signal, Andheri-Ghatkopar Link Road, Ghatkopar West, Mumbai - 400086
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252525] block">Direct Consultation Lines:</strong>
                    +91 98206 15020 / +91 98206 15070
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C6383B] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252525] block">Official Inquiries:</strong>
                    info@bricksbazar.in / info.bricksbazar@gmail.com
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252525] block">Regulatory Credential:</strong>
                    MahaRERA Registration Number: <span className="font-mono text-[#252525] font-bold">A51800029418</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
        <div className="bg-[#252525] text-white p-8 sm:p-12 rounded-3xl shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold">Don&apos;t Wait To Secure Your Next Great Property Deal!</h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Connect with our seasoned real estate advisory team at Bricksbazar Realty LLP and experience &#8220;Realty in Detail&#8221;.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link href="/buy">
              <Button variant="primary" size="md" className="bg-[#C6383B] hover:bg-[#b03033]">
                Explore Verified Properties
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="md" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View All Advisory Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="md" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Contact Advisory Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
