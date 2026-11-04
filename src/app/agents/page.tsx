'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS } from '@/mocks';
import { AgentCard } from '@/components/common/AgentCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CITIES } from '@/constants';
import { Agent } from '@/types';
import { Search, UserCheck, Star, Briefcase, PlusCircle, RotateCcw } from 'lucide-react';

export default function AgentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [minExp, setMinExp] = useState('0');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const filteredAgents = useMemo(() => {
    return MOCK_AGENTS.filter((agent) => {
      if (selectedCity !== 'All' && agent.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (minExp !== '0' && agent.experienceYears < Number(minExp)) {
        return false;
      }
      if (verifiedOnly && !agent.isVerified) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          agent.name.toLowerCase().includes(q) ||
          agent.agencyName.toLowerCase().includes(q) ||
          agent.location.locality.toLowerCase().includes(q) ||
          agent.specializations.some((s) => s.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCity, minExp, verifiedOnly]);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb items={[{ label: 'Real Estate Agents & Brokers' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  Verified Real Estate Agents in India
                </h1>
                <DemoBadge />
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                Connect with licensed RERA consultants who possess deep micro-market insights and verified listings.
              </p>
            </div>

            <Link href="/register?role=agent">
              <Button size="sm" className="gap-2 font-bold whitespace-nowrap">
                <PlusCircle className="w-4 h-4" />
                Register as an Agent
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Controls Filter Bar */}
        <div className="bg-white rounded-xl border border-brand-border p-4 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <Input
              isSearch
              placeholder="Search agent by name, locality or agency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 max-w-lg">
            <Select
              options={[{ label: 'All Metros', value: 'All' }, ...CITIES.map((c) => ({ label: c.name, value: c.name }))]}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />
            <Select
              options={[
                { label: 'Any Experience', value: '0' },
                { label: '5+ Years', value: '5' },
                { label: '10+ Years', value: '10' },
                { label: '15+ Years', value: '15' },
              ]}
              value={minExp}
              onChange={(e) => setMinExp(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-2 rounded-button text-xs font-bold border transition text-center ${
                verifiedOnly
                  ? 'bg-brand-success-light text-brand-success border-brand-success/30'
                  : 'bg-white text-brand-text border-brand-border hover:bg-brand-bg'
              }`}
            >
              RERA Verified Only
            </button>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onContactClick={(a) => {
                setActiveAgent(a);
                setContactModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Contact Agent Modal */}
      {activeAgent && (
        <Modal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          title={`Enquire with ${activeAgent.name}`}
          description={`${activeAgent.agencyName} &bull; ${activeAgent.location.city}`}
        >
          <EnquiryForm
            propertyOrItemTitle={`Direct Advisory with ${activeAgent.name}`}
            recipientName={activeAgent.name}
            recipientRole="Licensed RERA Consultant"
            onSuccess={() => setContactModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

