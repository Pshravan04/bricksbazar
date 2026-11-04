'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_AGENTS } from '@/mocks';
import { AgentCard } from '@/components/common/AgentCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';

export default function BrokersDirectoryPage() {
  const brokers = MOCK_AGENTS.filter((a) => a.role === 'broker' || a.role === 'agent');

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb items={[{ label: 'Property Brokers' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  Licensed Real Estate Brokers & Advisory
                </h1>
                <DemoBadge />
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                Commercial and residential co-broking experts across Maharashtra, Karnataka, Telangana and NCR.
              </p>
            </div>

            <Link href="/register?role=broker">
              <Button size="sm" className="gap-2 font-bold whitespace-nowrap">
                <PlusCircle className="w-4 h-4" />
                Join Broker Network
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <AgentCard key={broker.id} agent={broker} />
          ))}
        </div>
      </div>
    </div>
  );
}

