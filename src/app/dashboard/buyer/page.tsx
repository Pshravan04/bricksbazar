'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_PROPERTIES } from '@/mocks';
import { PropertyCard } from '@/components/common/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Heart, Search, Calendar, Inbox, ArrowRight } from 'lucide-react';

export default function BuyerDashboardPage() {
  const savedProperties = MOCK_PROPERTIES.slice(0, 2);

  return (
    <DashboardShell
      currentRole="buyer"
      pageTitle="Buyer & Tenant Portal"
      pageDescription="Manage your shortlisted homes, submitted enquiries, and scheduled site visits."
      actionButton={
        <Link href="/buy">
          <Button size="sm" className="font-bold gap-1.5">
            <Search className="w-4 h-4" />
            Explore More Properties
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Shortlisted Homes</span>
              <Heart className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">{savedProperties.length}</div>
            <span className="text-[11px] text-brand-text-secondary mt-0.5 block">Across Mumbai & Pune</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Enquiries Sent</span>
              <Inbox className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">3</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">1 Agent Callback Pending</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Scheduled Site Visits</span>
              <Calendar className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">1</div>
            <span className="text-[11px] text-brand-text-secondary mt-0.5 block">Saturday 11:30 AM (Powai Condo)</span>
          </div>
        </div>

        {/* Shortlisted Properties */}
        <div id="saved" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-extrabold text-base text-brand-text">
              My Shortlisted Properties
            </h3>
            <Link href="/buy" className="text-xs font-bold text-brand-red hover:underline">
              Add More &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} isFavorited />
            ))}
          </div>
        </div>

        {/* Scheduled Site Visits Timeline */}
        <div id="visits" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <h3 className="font-extrabold text-base text-brand-text border-b border-brand-border pb-3">
            Confirmed Site Visit Bookings
          </h3>

          <div className="p-4 bg-brand-bg rounded-xl border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="verified" size="sm">Confirmed Visit</Badge>
                <span className="text-xs font-bold text-brand-text">Saturday, 11:30 AM</span>
              </div>
              <h4 className="font-bold text-sm text-brand-text">
                2 BHK Modern Condo with Lake View at Powai
              </h4>
              <p className="text-xs text-brand-text-secondary">
                Consultant: Sunil Deshmukh &bull; Phone: +91 99203 88123
              </p>
            </div>

            <Button size="sm" variant="outline" className="text-xs font-bold">
              Reschedule
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

