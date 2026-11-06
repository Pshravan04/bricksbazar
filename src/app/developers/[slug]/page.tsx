'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getDeveloperBySlug, MOCK_PROJECTS } from '@/mocks';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/common/ProjectCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import {
  Building2,
  Calendar,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';

export default function DeveloperProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const developer = getDeveloperBySlug(slug);

  if (!developer) {
    notFound();
  }

  // Projects by this developer
  const developerProjects = MOCK_PROJECTS.filter(
    (p) => p.developer.name.toLowerCase().includes(developer.name.toLowerCase()) || p.developer.id === developer.id
  );

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Builders & Developers', href: '/developers' },
              { label: developer.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Developer Overview & Portfolio */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-brand-border bg-brand-bg flex-shrink-0 flex items-center justify-center p-2">
                  <Image
                    src={developer.logo || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=400&q=80'}
                    alt={developer.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {developer.isVerified && <Badge variant="verified">Verified Indian Developer</Badge>}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                    {developer.name}
                  </h1>

                  <div className="text-sm font-semibold text-brand-text-secondary">
                    Headquartered in {developer.headquarters} &bull; Founded {developer.foundedYear}
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1 font-bold text-brand-text">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>{developer.rating} Customer Rating</span>
                      <span className="text-brand-text-secondary font-normal">({developer.reviewCount} Reviews)</span>
                    </div>
                    <span>&bull;</span>
                    <span className="font-semibold text-brand-text">{developer.experienceYears} Years Track Record</span>
                  </div>
                </div>
              </div>

              {/* Delivery Stats Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-brand-bg rounded-xl border border-brand-border text-center text-xs mb-6">
                <div>
                  <span className="text-brand-text-secondary block">Total Projects</span>
                  <span className="text-base font-extrabold text-brand-text mt-0.5 block">{developer.totalProjects}</span>
                </div>
                <div className="border-x border-brand-border">
                  <span className="text-brand-text-secondary block">Ongoing Launches</span>
                  <span className="text-base font-extrabold text-brand-red mt-0.5 block">{developer.ongoingProjects}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Successfully Delivered</span>
                  <span className="text-base font-extrabold text-brand-success mt-0.5 block">{developer.completedProjects}</span>
                </div>
              </div>

              {/* Company Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
                  About {developer.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {developer.description}
                </p>
              </div>

              {/* Operating Metros */}
              <div className="pt-6 border-t border-brand-border mt-6">
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-2">
                  Operating Cities & Regional Footprint
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {developer.operatingCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 bg-brand-bg border border-brand-border rounded-button text-xs font-semibold text-brand-text"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Developer Project Portfolio */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-brand-text">
                Current Projects Portfolio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developerProjects.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Developer Desk Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              <div className="space-y-1 pb-4 border-b border-brand-border">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">
                  Corporate Sales Desk
                </span>
                <h3 className="text-lg font-bold text-brand-text">
                  Enquire with {developer.name}
                </h3>
                <p className="text-xs text-brand-text-secondary">
                  Connect with developer sales executives for pre-launch allocations, NRI investments, and bulk purchases.
                </p>
              </div>

              <EnquiryForm
                propertyOrItemTitle={`Corporate Developer Enquiry: ${developer.name}`}
                recipientName={`${developer.name} Corporate Sales`}
                recipientRole="Official Developer Representative"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

