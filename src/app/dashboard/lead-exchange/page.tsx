'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Share2,
  Building2,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { MOCK_CO_BROKING_REQUIREMENTS } from '@/mocks/leads';
import { CoBrokingRequirement } from '@/types';

export default function LeadExchangePage() {
  const { toast, success, info } = useToast();
  const [requirements, setRequirements] = useState<CoBrokingRequirement[]>(MOCK_CO_BROKING_REQUIREMENTS);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [activeReq, setActiveReq] = useState<CoBrokingRequirement | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New requirement form state
  const [newReq, setNewReq] = useState({
    clientType: 'End User Buyer' as const,
    purpose: 'Buy' as const,
    propertyCategory: 'Apartment',
    bhk: '3 BHK',
    budget: '₹ 3.5 - 4.5 Cr',
    targetLocalities: 'Bandra West, Khar West',
    city: 'Mumbai',
    urgency: 'Immediate (within 15 days)' as const,
    commissionSplit: '50:50 Clean Split',
    agentName: 'Vikramaditya Mehta',
    agentAgency: 'Apex Prime Realty',
    agentRera: 'A51900028941',
    agentPhone: '+91 98200 98200',
  });

  const filteredRequirements = requirements.filter((r) => {
    const matchesCity = selectedCity === 'all' || r.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesPurpose = selectedPurpose === 'all' || r.purpose.toLowerCase() === selectedPurpose.toLowerCase();
    return matchesCity && matchesPurpose;
  });

  const handlePostRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CoBrokingRequirement = {
      id: `cb-${Date.now().toString(36)}`,
      clientInitials: 'New Client',
      clientType: newReq.clientType,
      purpose: newReq.purpose,
      propertyCategory: newReq.propertyCategory,
      bhk: newReq.bhk,
      budget: newReq.budget,
      targetLocalities: newReq.targetLocalities.split(',').map((s) => s.trim()),
      city: newReq.city,
      urgency: newReq.urgency,
      commissionSplit: newReq.commissionSplit,
      agentName: newReq.agentName,
      agentAgency: newReq.agentAgency,
      agentRera: newReq.agentRera,
      agentPhone: newReq.agentPhone,
      agentCity: newReq.city,
      postedDate: 'Just now',
      matchedInventoryCount: 2,
    };

    setRequirements([created, ...requirements]);
    setIsPostModalOpen(false);
    success('Requirement Broadcasted', 'Your buyer requirement is live on the Co-Broking Exchange!');
  };

  return (
    <DashboardShell
      currentRole="agent"
      pageTitle="Lead Exchange & Co-Broking"
      pageDescription="Collaborate with verified peer brokers, exchange high-intent buyer requirements, and match inventory with 50:50 commission splits."
    >
      <div className="space-y-6">
        {/* Value Prop Banner */}
        <div className="bg-gradient-to-r from-[#252525] to-[#3a3a3a] text-white p-6 sm:p-8 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-3 border border-white/20">
              <ShieldCheck className="w-4 h-4 text-[#C6383B]" /> Verified MahaRERA & State RERA Agents Only
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              BricksBazar Co-Broking & Requirement Exchange
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Match your exclusive listings with serious, verified buyer requirements from peer brokers across Mumbai,
              Pune, and Bengaluru. Standardize co-broking with clean 50:50 commission splits.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsPostModalOpen(true)}
                className="bg-[#C6383B] hover:bg-[#b03033]"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Post Client Requirement
              </Button>
              <Link href="/dashboard/leads">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  View My Leads Inbox
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-6 -bottom-6 opacity-10 hidden lg:block pointer-events-none">
            <Share2 className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#252525]">Filter Exchange:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>

            <select
              value={selectedPurpose}
              onChange={(e) => setSelectedPurpose(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Purposes (Buy & Rent)</option>
              <option value="Buy">Outright Buy</option>
              <option value="Rent">Lease / Rent</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              {filteredRequirements.length} Active Requirements
            </Badge>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3 h-3" /> Live Demo Data
            </span>
          </div>
        </div>

        {/* Co-Broking Requirements Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequirements.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-[#EAEAEA] p-5 shadow-xs hover:border-[#C6383B]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Purpose & Urgency */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        req.purpose === 'Buy'
                          ? 'bg-[#FCEEEF] text-[#C6383B]'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {req.purpose === 'Buy' ? 'Buyer Requirement' : 'Tenant Requirement'}
                    </span>
                    <span className="text-[11px] text-[#777777]">• {req.clientType}</span>
                  </div>
                  <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                    {req.urgency}
                  </span>
                </div>

                {/* BHK & Category */}
                <h3 className="text-base font-bold text-[#252525]">
                  {req.bhk} • {req.propertyCategory}
                </h3>

                {/* Target Localities */}
                <div className="flex items-center gap-1.5 text-xs text-[#777777] mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C6383B] shrink-0" />
                  <span className="truncate">
                    {req.targetLocalities.join(', ')} ({req.city})
                  </span>
                </div>

                {/* Budget & Commission Details */}
                <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] my-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase font-semibold">Budget Range</span>
                    <span className="font-bold text-[#252525] text-sm">{req.budget}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase font-semibold">Commission Split</span>
                    <span className="font-semibold text-[#21865B] text-xs">{req.commissionSplit}</span>
                  </div>
                </div>

                {/* Matching Inventory Notice */}
                {req.matchedInventoryCount > 0 && (
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs mb-3">
                    <span className="text-emerald-800 font-medium">
                      🎯 You have {req.matchedInventoryCount} matching properties in your inventory
                    </span>
                  </div>
                )}
              </div>

              {/* Footer: Posting Agent & CTA */}
              <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-100 text-[#252525] flex items-center justify-center text-xs font-bold">
                    {req.agentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#252525] leading-tight">{req.agentName}</p>
                    <p className="text-[10px] text-[#777777]">{req.agentAgency}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveReq(req)}
                  className="text-xs"
                >
                  Connect to Co-Broke <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect to Co-Broke Modal */}
      {activeReq && (
        <Modal
          isOpen={!!activeReq}
          onClose={() => setActiveReq(null)}
          title="Connect with Verified Broker"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FCEEEF] text-[#C6383B] flex items-center justify-center font-bold text-base">
                  {activeReq.agentName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#252525]">{activeReq.agentName}</h4>
                  <p className="text-xs text-[#777777]">{activeReq.agentAgency} • {activeReq.agentCity}</p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-mono text-[#21865B] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> RERA: {activeReq.agentRera}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EAEAEA] text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#777777]">Requirement:</span>
                  <span className="font-bold text-[#252525]">{activeReq.bhk} in {activeReq.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Budget:</span>
                  <span className="font-bold text-[#C6383B]">{activeReq.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">Agreed Terms:</span>
                  <span className="font-semibold text-[#21865B]">{activeReq.commissionSplit}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Co-Broking Ethics Reminder:</strong> Both parties must respect client exclusivity and register
              the inspection before arranging property viewings.
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                className="w-full text-xs text-green-700 hover:border-green-600"
                onClick={() => {
                  window.open(`https://wa.me/${activeReq.agentPhone.replace(/\D/g, '')}`);
                  toast({
                    type: 'info',
                    title: 'WhatsApp Connected',
                    message: `Opening chat with ${activeReq.agentName}`,
                  });
                }}
              >
                <MessageSquare className="w-4 h-4 mr-1.5 text-green-600" /> WhatsApp Broker
              </Button>
              <Button
                variant="primary"
                className="w-full text-xs"
                onClick={() => {
                  window.open(`tel:${activeReq.agentPhone}`);
                  toast({
                    type: 'info',
                    title: 'Direct Call',
                    message: `Connecting to ${activeReq.agentName}`,
                  });
                }}
              >
                <Phone className="w-4 h-4 mr-1.5" /> Call Now ({activeReq.agentPhone})
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Post Client Requirement Modal */}
      {isPostModalOpen && (
        <Modal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          title="Post Buyer / Tenant Requirement"
          maxWidth="lg"
        >
          <form onSubmit={handlePostRequirement} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Client Type *"
                value={newReq.clientType}
                onChange={(e) => setNewReq({ ...newReq, clientType: e.target.value as any })}
                options={[
                  { value: 'End User Buyer', label: 'End User Buyer' },
                  { value: 'Investor', label: 'Property Investor' },
                  { value: 'Corporate Tenant', label: 'Corporate Tenant' },
                  { value: 'NRI Buyer', label: 'NRI Buyer' },
                ]}
              />

              <Select
                label="Purpose *"
                value={newReq.purpose}
                onChange={(e) => setNewReq({ ...newReq, purpose: e.target.value as any })}
                options={[
                  { value: 'Buy', label: 'Outright Buy' },
                  { value: 'Rent', label: 'Rent / Lease' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="City *"
                value={newReq.city}
                onChange={(e) => setNewReq({ ...newReq, city: e.target.value })}
                options={[
                  { value: 'Mumbai', label: 'Mumbai' },
                  { value: 'Pune', label: 'Pune' },
                  { value: 'Thane', label: 'Thane' },
                  { value: 'Bengaluru', label: 'Bengaluru' },
                ]}
              />

              <Input
                label="BHK & Property Type *"
                placeholder="e.g. 3 BHK Luxury Apartment"
                value={newReq.bhk}
                onChange={(e) => setNewReq({ ...newReq, bhk: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Target Localities *"
                placeholder="e.g. Bandra West, Khar, Santacruz"
                value={newReq.targetLocalities}
                onChange={(e) => setNewReq({ ...newReq, targetLocalities: e.target.value })}
                required
              />

              <Input
                label="Budget Range *"
                placeholder="e.g. ₹ 4.5 - 5.5 Cr"
                value={newReq.budget}
                onChange={(e) => setNewReq({ ...newReq, budget: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                label="Urgency *"
                value={newReq.urgency}
                onChange={(e) => setNewReq({ ...newReq, urgency: e.target.value as any })}
                options={[
                  { value: 'Immediate (within 15 days)', label: 'Immediate (within 15 days)' },
                  { value: 'Within 30 Days', label: 'Within 30 Days' },
                  { value: 'Within 60 Days', label: 'Within 60 Days' },
                ]}
              />

              <Input
                label="Commission Split Terms *"
                placeholder="e.g. 50:50 Clean Split"
                value={newReq.commissionSplit}
                onChange={(e) => setNewReq({ ...newReq, commissionSplit: e.target.value })}
                required
              />
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between text-xs">
              <span className="text-[#777777]">Posting Agent RERA:</span>
              <span className="font-mono font-bold text-[#252525]">{newReq.agentRera}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#EAEAEA]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsPostModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Broadcast Requirement
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardShell>
  );
}
