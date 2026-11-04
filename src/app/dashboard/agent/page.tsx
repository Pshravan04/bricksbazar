'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_LEADS, MOCK_PROPERTIES } from '@/mocks';
import { Lead } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { formatINR } from '@/lib/utils';
import {
  Building2,
  Users,
  Calendar,
  TrendingUp,
  Inbox,
  PlusCircle,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export default function AgentDashboardPage() {
  const { success } = useToast();
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [searchLead, setSearchLead] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    success('Lead Status Updated', `Lead marked as ${newStatus}`);
  };

  const filteredLeads = leads.filter((l) => {
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (searchLead) {
      const q = searchLead.toLowerCase();
      return (
        l.customerName.toLowerCase().includes(q) ||
        l.propertyOrItemTitle.toLowerCase().includes(q) ||
        l.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <DashboardShell
      currentRole="agent"
      pageTitle="Agent & Broker Command Hub"
      pageDescription="Manage active inventory, incoming client enquiries, site visits, and co-broking deals."
      actionButton={
        <Link href="/dashboard/properties/create">
          <Button size="sm" className="font-bold gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Add New Property
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* 1. KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Active Listings</span>
              <Building2 className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">38</div>
            <div className="text-[11px] text-brand-success font-semibold mt-1">
              +4 new listings this month
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Total Leads Inbox</span>
              <Inbox className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">{leads.length}</div>
            <div className="text-[11px] text-brand-success font-semibold mt-1">
              2 requires immediate follow-up
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Site Visits Scheduled</span>
              <Calendar className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">7</div>
            <div className="text-[11px] text-brand-text-secondary mt-1">
              Next: Saturday 11:30 AM
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Deal Pipeline Value</span>
              <TrendingUp className="w-4 h-4 text-brand-success" />
            </div>
            <div className="text-2xl font-black text-brand-text">₹ 24.8 Cr</div>
            <div className="text-[11px] text-brand-success font-semibold mt-1">
              3 offers under negotiation
            </div>
          </div>
        </div>

        {/* 2. Leads Inbox & Pipeline Table */}
        <div id="leads" className="bg-white rounded-xl border border-brand-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-brand-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-brand-text">
                Client Leads & Site Visit Requests
              </h3>
              <p className="text-xs text-brand-text-secondary">
                Track status, update stages, and manage customer communications
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Input
                isSearch
                placeholder="Search leads..."
                value={searchLead}
                onChange={(e) => setSearchLead(e.target.value)}
                onClear={() => setSearchLead('')}
                className="w-48 text-xs py-1.5"
              />
              <Select
                options={[
                  { label: 'All Statuses', value: 'All' },
                  { label: 'New', value: 'New' },
                  { label: 'Contacted', value: 'Contacted' },
                  { label: 'Qualified', value: 'Qualified' },
                  { label: 'Site Visit Scheduled', value: 'Site Visit Scheduled' },
                  { label: 'Negotiation', value: 'Negotiation' },
                  { label: 'Converted', value: 'Converted' },
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs py-1.5"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-bg/70 border-b border-brand-border text-brand-text-secondary font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Property / Requirement</th>
                  <th className="p-4">Lead Type</th>
                  <th className="p-4">Stage Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-bg/40 transition">
                    <td className="p-4">
                      <div className="font-bold text-brand-text">{lead.customerName}</div>
                      <div className="text-brand-text-secondary flex items-center gap-2 mt-0.5">
                        <span>{lead.customerPhone}</span>
                      </div>
                      {lead.preferredTime && (
                        <div className="text-[10px] text-brand-text-muted mt-0.5">
                          Time: {lead.preferredTime}
                        </div>
                      )}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-brand-text truncate">{lead.propertyOrItemTitle}</div>
                      <div className="text-brand-text-secondary mt-0.5">Budget: {lead.budget || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="default" size="sm">{lead.leadType}</Badge>
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-xs font-bold rounded px-2 py-1 border focus:outline-none cursor-pointer ${
                          lead.status === 'New'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.status === 'Site Visit Scheduled'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : lead.status === 'Converted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-brand-bg text-brand-text border-brand-border'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedLead(lead)}
                        className="text-[11px] h-7 px-2.5"
                      >
                        View Notes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Lead Exchange Network (Co-Broking) */}
        <div id="exchange" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-red" />
                <h3 className="font-extrabold text-base text-brand-text">
                  BricksBazar Co-Broking & Lead Exchange Network
                </h3>
              </div>
              <p className="text-xs text-brand-text-secondary mt-0.5">
                Collaborate with verified local agents on client buy/rent requirements
              </p>
            </div>
            <Button size="sm" variant="outline" className="text-xs font-bold">
              Post Collaboration Requirement
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-brand-bg rounded-xl border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-red">Buyer Requirement #EX-401</span>
                <span className="text-[10px] text-brand-text-secondary">Posted 3 hrs ago</span>
              </div>
              <h4 className="font-bold text-sm text-brand-text">
                Looking for 4 BHK Sea-Facing Resale in Bandra / Khar West
              </h4>
              <p className="text-xs text-brand-text-secondary">
                Budget: ₹ 14 - 18 Cr &bull; Client ready with pre-sanctioned HDFC wealth loan.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-brand-text font-semibold">Posted by: Royal Realtors Mumbai</span>
                <Button size="sm" className="h-7 text-xs">Request Collaboration</Button>
              </div>
            </div>

            <div className="p-4 bg-brand-bg rounded-xl border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-red">Rental Requirement #EX-402</span>
                <span className="text-[10px] text-brand-text-secondary">Posted Today</span>
              </div>
              <h4 className="font-bold text-sm text-brand-text">
                MNC Corporate Client needing 3 BHK in Baner / Balewadi Pune
              </h4>
              <p className="text-xs text-brand-text-secondary">
                Budget: ₹ 65,000 - 80,000/mo &bull; Move-in by 15th of next month.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-brand-text font-semibold">Posted by: Apex Advisory Pune</span>
                <Button size="sm" className="h-7 text-xs">Request Collaboration</Button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Active Property Inventory */}
        <div id="listings" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <div>
              <h3 className="font-extrabold text-base text-brand-text">
                My Active Property Inventory
              </h3>
              <p className="text-xs text-brand-text-secondary">
                Edit listing prices, upload photos, or change availability
              </p>
            </div>
            <Link href="/dashboard/properties/create">
              <Button size="sm" className="text-xs font-bold">
                Post Another Listing
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-brand-border">
            {MOCK_PROPERTIES.slice(0, 3).map((prop) => (
              <div key={prop.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-brand-text">{prop.title}</span>
                    {prop.isVerified && <Badge variant="verified" size="sm">Active</Badge>}
                  </div>
                  <div className="text-xs text-brand-text-secondary">
                    {prop.location.locality}, {prop.location.city} &bull; {prop.bhk} &bull; {prop.carpetArea} sq.ft
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-brand-text">
                    {formatINR(prop.price, prop.listingType === 'rent')}
                  </span>
                  <Link href={`/property/${prop.slug}`}>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View Live
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Lead Details Modal */}
      {selectedLead && (
        <Modal
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          title={`Lead Details: ${selectedLead.customerName}`}
          description={`Registered ID: ${selectedLead.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-brand-bg rounded-lg border border-brand-border space-y-1">
              <span className="text-brand-text-secondary font-semibold">Interested Listing:</span>
              <div className="font-bold text-brand-text">{selectedLead.propertyOrItemTitle}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-brand-text-secondary block">Phone Number</span>
                <span className="font-bold text-brand-text block mt-0.5">{selectedLead.customerPhone}</span>
              </div>
              <div>
                <span className="text-brand-text-secondary block">Email</span>
                <span className="font-bold text-brand-text block mt-0.5">{selectedLead.customerEmail}</span>
              </div>
            </div>

            <div>
              <span className="text-brand-text-secondary block font-semibold">Customer Message:</span>
              <p className="mt-1 p-2.5 bg-brand-bg rounded border border-brand-border text-brand-text">
                {selectedLead.message || 'Customer requested phone callback and site visit coordination.'}
              </p>
            </div>

            {selectedLead.notes && (
              <div>
                <span className="text-brand-text-secondary block font-semibold">Internal Agent Notes:</span>
                <p className="mt-1 p-2.5 bg-amber-50 rounded border border-amber-200 text-amber-900">
                  {selectedLead.notes}
                </p>
              </div>
            )}

            <Button onClick={() => setSelectedLead(null)} className="w-full">
              Close Details
            </Button>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
}

