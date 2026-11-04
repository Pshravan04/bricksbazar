'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_PROJECTS } from '@/mocks';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Building2, PlusCircle, Inbox, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function DeveloperDashboardPage() {
  const devProject = MOCK_PROJECTS[0]; // Oberoi Grand Crest

  return (
    <DashboardShell
      currentRole="developer"
      pageTitle="Builder & Developer Enterprise Portal"
      pageDescription="Monitor master township launches, configuration price matrices, and institutional enquiries."
      actionButton={
        <Link href="/dashboard/properties/create">
          <Button size="sm" className="font-bold gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Launch New Project
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <span className="text-xs font-semibold text-brand-text-secondary block mb-1">Active Projects</span>
            <div className="text-2xl font-black text-brand-text">8</div>
            <span className="text-[11px] text-brand-text-secondary block mt-0.5">Across Mumbai & Thane</span>
          </div>
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <span className="text-xs font-semibold text-brand-text-secondary block mb-1">Units In Inventory</span>
            <div className="text-2xl font-black text-brand-text">420</div>
            <span className="text-[11px] text-brand-success font-semibold block mt-0.5">64% Sold in Phase 1</span>
          </div>
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <span className="text-xs font-semibold text-brand-text-secondary block mb-1">Monthly Inquiries</span>
            <div className="text-2xl font-black text-brand-text">148</div>
            <span className="text-[11px] text-brand-success font-semibold block mt-0.5">32 High-Net-Worth Leads</span>
          </div>
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <span className="text-xs font-semibold text-brand-text-secondary block mb-1">Total Pipeline</span>
            <div className="text-2xl font-black text-brand-text">₹ 142 Cr</div>
            <span className="text-[11px] text-brand-text-secondary block mt-0.5">Pre-allocation bookings</span>
          </div>
        </div>

        {/* Featured Project Management Card */}
        <div id="projects" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <div>
              <h3 className="font-extrabold text-base text-brand-text">
                Flagship Project: {devProject.name}
              </h3>
              <p className="text-xs text-brand-text-secondary">
                RERA ID: {devProject.reraId} &bull; Possession: {devProject.possessionDate}
              </p>
            </div>
            <Badge variant="verified">Under Construction</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-brand-bg rounded-lg">
              <span className="text-brand-text-secondary block">Starting Price</span>
              <span className="font-extrabold text-brand-text block mt-0.5">{formatINR(devProject.startingPrice)}</span>
            </div>
            <div className="p-3 bg-brand-bg rounded-lg">
              <span className="text-brand-text-secondary block">Max Price</span>
              <span className="font-extrabold text-brand-text block mt-0.5">{formatINR(devProject.maxPrice)}</span>
            </div>
            <div className="p-3 bg-brand-bg rounded-lg">
              <span className="text-brand-text-secondary block">Total Acreage</span>
              <span className="font-extrabold text-brand-text block mt-0.5">{devProject.projectAreaAcres} Acres</span>
            </div>
            <div className="p-3 bg-brand-bg rounded-lg">
              <span className="text-brand-text-secondary block">Configurations</span>
              <span className="font-extrabold text-brand-text block mt-0.5">{devProject.configurations.join(', ')}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link href={`/projects/${devProject.slug}`}>
              <Button size="sm" variant="outline" className="text-xs">
                View Public Project Showcase
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

