'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  MessageSquare,
  Building2,
  DollarSign,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { MOCK_LEADS } from '@/mocks/leads';
import { Lead } from '@/types';

type LeadStatus = Lead['status'];

const STATUS_CONFIG: Record<LeadStatus, { label: string; bg: string; text: string; border: string }> = {
  New: { label: 'New Lead', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Contacted: { label: 'Contacted', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Qualified: { label: 'Qualified', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Site Visit Scheduled': { label: 'Site Visit', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Negotiation: { label: 'Negotiation', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Converted: { label: 'Won / Booked', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  Closed: { label: 'Closed', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
  Rejected: { label: 'Lost / Invalid', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

export default function LeadsManagementPage() {
  const { toast, success, info } = useToast();
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.propertyOrItemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.customerPhone.includes(searchQuery) ||
      (lead.location && lead.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesType = selectedType === 'all' || lead.leadType === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    success('Lead Updated', `Lead status updated to ${newStatus}`);
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !activeLead) return;
    const updatedNotes = activeLead.notes ? `${activeLead.notes}\n• ${newNote.trim()}` : newNote.trim();
    setLeads((prev) =>
      prev.map((l) => (l.id === activeLead.id ? { ...l, notes: updatedNotes } : l))
    );
    setActiveLead((prev) => (prev ? { ...prev, notes: updatedNotes } : null));
    setNewNote('');
    success('Note Added', 'Interaction history saved');
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      info('Export Complete', 'Exported 6 verified leads to BricksBazar_Leads_March2026.csv (Simulated)');
    }, 1200);
  };

  // Metrics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const siteVisitsCount = leads.filter((l) => l.status === 'Site Visit Scheduled').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  return (
    <DashboardShell
      currentRole="agent"
      pageTitle="Lead Management & CRM"
      pageDescription="Track and manage inbound property enquiries, site visit schedules, and quotation leads across all listings."
    >
      <div className="space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Total Leads</span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Users className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">{totalLeadsCount}</p>
            <p className="text-xs text-[#21865B] flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +18% from last week
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">New Inquiries</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <AlertCircle className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">{newLeadsCount}</p>
            <p className="text-xs text-amber-700 mt-1 font-semibold">Requires response within 2 hours</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Site Visits Booked</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Calendar className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">{siteVisitsCount}</p>
            <p className="text-xs text-[#777777] mt-1">High conversion propensity</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">Deals Closed</span>
              <span className="p-2 bg-green-50 text-[#21865B] rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">{convertedCount}</p>
            <p className="text-xs text-[#21865B] font-semibold mt-1">₹ 2.85 Lakhs commission earned</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, property, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#EAEAEA] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Lead Types</option>
              <option value="Property Enquiry">Property Enquiry</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Rental Enquiry">Rental Enquiry</option>
              <option value="Quotation">Quotation</option>
              <option value="Buyer Requirement">Buyer Requirement</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={isExporting}
              className="text-xs shrink-0"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>

            <Link href="/dashboard/lead-exchange">
              <Button variant="primary" size="sm" className="text-xs shrink-0">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Co-Broking Board
              </Button>
            </Link>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#EAEAEA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#252525] text-sm">Active Inbound Enquiries</h3>
              <Badge variant="outline" size="sm">
                {filteredLeads.length} Leads
              </Badge>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3 h-3" /> Live Simulator
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-[#EAEAEA] text-[#777777] font-semibold">
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Interested Property / Need</th>
                  <th className="py-3 px-4">Budget & Locality</th>
                  <th className="py-3 px-4">Source & Date</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {filteredLeads.map((lead) => {
                  const statusMeta = STATUS_CONFIG[lead.status] || STATUS_CONFIG['New'];
                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      onClick={() => setActiveLead(lead)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FCEEEF] text-[#C6383B] flex items-center justify-center font-bold text-xs shrink-0">
                            {lead.customerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#252525] group-hover:text-[#C6383B] transition-colors">
                              {lead.customerName}
                            </p>
                            <p className="text-[11px] text-[#777777]">{lead.customerPhone}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-semibold text-[#252525] truncate">{lead.propertyOrItemTitle}</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] bg-gray-100 text-[#777777]">
                          {lead.leadType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#252525]">{lead.budget || 'On Request'}</p>
                        <p className="text-[11px] text-[#777777]">{lead.location || 'Pan India'}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="text-[#252525] font-medium">{lead.source}</p>
                        <p className="text-[11px] text-[#777777]">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border} focus:outline-hidden cursor-pointer`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Site Visit Scheduled">Site Visit</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Converted">Won / Booked</option>
                          <option value="Closed">Closed</option>
                          <option value="Rejected">Lost / Invalid</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              window.open(`tel:${lead.customerPhone}`);
                              toast({ type: 'info', title: 'Initiating Call', message: `Calling ${lead.customerName}` });
                            }}
                            className="p-1.5 rounded-lg border border-[#EAEAEA] hover:border-green-500 hover:text-green-600 transition-colors"
                            title="Call customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              window.open(`mailto:${lead.customerEmail}`);
                              toast({ type: 'info', title: 'Opening Email', message: `Emailing ${lead.customerName}` });
                            }}
                            className="p-1.5 rounded-lg border border-[#EAEAEA] hover:border-blue-500 hover:text-blue-600 transition-colors"
                            title="Send email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveLead(lead)}
                            className="text-xs p-1.5"
                          >
                            <ChevronRight className="w-4 h-4 text-[#777777]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Detail Slide-Over / Modal */}
      {activeLead && (
        <Modal
          isOpen={!!activeLead}
          onClose={() => setActiveLead(null)}
          title={`Lead CRM: ${activeLead.customerName}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Header snapshot */}
            <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#252525]">{activeLead.customerName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FCEEEF] text-[#C6383B]">
                    {activeLead.leadType}
                  </span>
                </div>
                <p className="text-xs text-[#777777] mt-0.5">
                  Assigned Consultant: <span className="font-semibold text-[#252525]">{activeLead.assignedTo || 'Unassigned'}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.open(`https://wa.me/${activeLead.customerPhone.replace(/\D/g, '')}`);
                    toast({ type: 'info', title: 'WhatsApp Web', message: `Opening chat with ${activeLead.customerName}` });
                  }}
                  className="text-xs text-green-700 hover:border-green-600"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1 text-green-600" /> WhatsApp
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    window.open(`tel:${activeLead.customerPhone}`);
                    toast({ type: 'info', title: 'Call Client', message: `Calling ${activeLead.customerName}` });
                  }}
                  className="text-xs"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" /> Call Now
                </Button>
              </div>
            </div>

            {/* Inquired asset specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                <span className="text-[#777777]">Associated Property</span>
                <p className="font-bold text-[#252525] mt-0.5">{activeLead.propertyOrItemTitle}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                <span className="text-[#777777]">Customer Budget & Locality</span>
                <p className="font-bold text-[#252525] mt-0.5">
                  {activeLead.budget || 'Open'} • {activeLead.location || 'Mumbai'}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                <span className="text-[#777777]">Phone & Email</span>
                <p className="font-bold text-[#252525] mt-0.5">
                  {activeLead.customerPhone} • {activeLead.customerEmail}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EAEAEA]">
                <span className="text-[#777777]">Preferred Contact Time</span>
                <p className="font-bold text-[#252525] mt-0.5">
                  {activeLead.preferredTime || 'Anytime during business hours'}
                </p>
              </div>
            </div>

            {/* Initial Inquiry Message */}
            {activeLead.message && (
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs">
                <span className="font-bold text-blue-900 block mb-1">Customer Inquiry Message:</span>
                <p className="text-blue-800 leading-relaxed italic">&ldquo;{activeLead.message}&rdquo;</p>
              </div>
            )}

            {/* Interaction Log / Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#252525]">Consultant Activity Log & Notes</label>
              <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] text-xs text-[#252525] whitespace-pre-line min-h-[70px]">
                {activeLead.notes || 'No notes added yet. Log call outcome or site visit feedback below.'}
              </div>
              <div className="flex gap-2 pt-1">
                <Input
                  placeholder="e.g. Spoke with client. Site visit scheduled for Sunday 11am."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="text-xs"
                />
                <Button variant="outline" size="sm" onClick={handleAddNote} className="shrink-0 text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Note
                </Button>
              </div>
            </div>

            {/* Status Selector */}
            <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#777777]">Update Pipeline Stage:</span>
                <p className="text-xs font-bold text-[#252525]">Current: {activeLead.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={activeLead.status}
                  onChange={(e) => handleStatusChange(activeLead.id, e.target.value as LeadStatus)}
                  className="px-3 py-1.5 rounded-lg border border-[#EAEAEA] text-xs font-semibold bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Converted">Won / Booked</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Lost / Invalid</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
}
