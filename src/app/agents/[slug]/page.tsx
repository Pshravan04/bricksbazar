'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getAgentBySlug, MOCK_PROPERTIES } from '@/mocks';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/common/PropertyCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import {
  Star,
  MapPin,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Languages,
} from 'lucide-react';

export default function AgentProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  // Active listings by this agent
  const agentProperties = MOCK_PROPERTIES.filter(
    (p) => p.ownerOrAgent.name.toLowerCase().includes(agent.name.toLowerCase()) || p.postedBy === 'Agent'
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header Bar */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Agents & Brokers', href: '/agents' },
              { label: agent.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Bio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Agent Identity Card */}
            <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-card">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-border flex-shrink-0">
                  <Image
                    src={agent.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                    alt={agent.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {agent.isVerified && <Badge variant="verified">RERA Verified Consultant</Badge>}
                    {agent.isDemoRecord && <DemoBadge />}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                    {agent.name}
                  </h1>

                  <div className="text-sm font-semibold text-brand-text-secondary">
                    {agent.agencyName} &bull; {agent.location.locality}, {agent.location.city}
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1 font-bold text-brand-text">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>{agent.rating} Rating</span>
                      <span className="text-brand-text-secondary font-normal">({agent.reviewCount} Reviews)</span>
                    </div>
                    <span>&bull;</span>
                    <span className="font-semibold text-brand-text">{agent.experienceYears} Years Exp.</span>
                  </div>
                </div>
              </div>

              {/* RERA & Credentials Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-brand-bg rounded-xl border border-brand-border text-xs mb-6">
                <div>
                  <span className="text-brand-text-secondary block">RERA Registration No.</span>
                  <span className="font-mono font-bold text-brand-text mt-0.5 block">{agent.reraNumber || 'A51900014299'}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Languages Spoken</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{agent.languages.join(', ')}</span>
                </div>
                <div>
                  <span className="text-brand-text-secondary block">Listed Properties</span>
                  <span className="font-bold text-brand-text mt-0.5 block">{agent.listedPropertiesCount} Active ({agent.verifiedListingsCount} Verified)</span>
                </div>
              </div>

              {/* About Consultant */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
                  About {agent.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {agent.about}
                </p>
              </div>

              {/* Specializations */}
              <div className="pt-6 border-t border-brand-border mt-6">
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-2">
                  Micro-Market Specializations
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {agent.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-brand-bg border border-brand-border rounded-button text-xs font-semibold text-brand-text"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Property Listings by this Agent */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-brand-text">
                Active Listings by {agent.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact & Advisory Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              <div className="space-y-1 pb-4 border-b border-brand-border">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">
                  Direct Agent Connect
                </span>
                <h3 className="text-lg font-bold text-brand-text">
                  Contact {agent.name}
                </h3>
                <p className="text-xs text-brand-text-secondary">
                  Discuss specific property requirements, schedule viewings, or request market valuations.
                </p>
              </div>

              <div className="space-y-2 text-xs text-brand-text-secondary">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-red" />
                  <span className="font-semibold text-brand-text">{agent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-red" />
                  <span>{agent.email}</span>
                </div>
              </div>

              <EnquiryForm
                propertyOrItemTitle={`Direct Consultation with ${agent.name}`}
                recipientName={agent.name}
                recipientRole="RERA Registered Agent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

