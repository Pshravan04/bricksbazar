'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_PROPERTIES } from '@/mocks';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { PlusCircle, Building2, Inbox, Eye, ArrowUpRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function OwnerDashboardPage() {
  const ownerProperty = MOCK_PROPERTIES[1]; // Sunil Deshmukh owner listing

  return (
    <DashboardShell
      currentRole="owner"
      pageTitle="Property Owner Dashboard"
      pageDescription="Manage your listed homes, view verified buyer enquiries, and update occupancy."
      actionButton={
        <Link href="/dashboard/properties/create">
          <Button size="sm" className="font-bold gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Post Another Property
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Live Listings</span>
              <Building2 className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">1</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">Active on Portal</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Total Buyer Views</span>
              <Eye className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">1,240</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">+180 this week</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Inquiries Received</span>
              <Inbox className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">4</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">2 Site Visit Bookings</span>
          </div>
        </div>

        {/* My Listed Property */}
        <div id="listings" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-extrabold text-base text-brand-text">
              My Active Listings
            </h3>
            <Badge variant="verified" size="sm">Active</Badge>
          </div>

          <div className="p-4 bg-brand-bg rounded-xl border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-brand-text">{ownerProperty.title}</span>
              </div>
              <div className="text-xs text-brand-text-secondary">
                {ownerProperty.location.locality}, {ownerProperty.location.city} &bull; {ownerProperty.bhk} &bull; {ownerProperty.carpetArea} sq.ft
              </div>
              <div className="text-base font-black text-brand-text pt-1">
                {formatINR(ownerProperty.price)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/property/${ownerProperty.slug}`}>
                <Button size="sm" variant="outline" className="text-xs">
                  View Public Listing
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

