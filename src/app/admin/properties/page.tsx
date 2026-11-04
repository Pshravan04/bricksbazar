'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  MapPin,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { MOCK_MODERATION_QUEUE, ModerationItem } from '@/mocks/admin';
import { formatINR } from '@/lib/utils';

export default function AdminPropertyModerationPage() {
  const { success, error, info } = useToast();
  const [items, setItems] = useState<ModerationItem[]>(
    MOCK_MODERATION_QUEUE.filter((item) => item.type === 'property')
  );
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<ModerationItem | null>(null);

  const handleApprove = (id: string, title: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'APPROVED' } : item)));
    setPreviewItem(null);
    success('Listing Approved', `"${title.substring(0, 35)}..." is now publicly discoverable on BricksBazar.`);
  };

  const handleReject = (id: string, title: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'REJECTED' } : item)));
    setPreviewItem(null);
    error('Listing Rejected', `"${title.substring(0, 35)}..." has been declined.`);
  };

  const handleRequestRevision = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'NEEDS_REVISION' } : item)));
    setPreviewItem(null);
    info('Revision Requested', 'Lister notified to update carpet area certificate and clear title documents.');
  };

  const filteredItems = items.filter((item) => {
    return selectedCity === 'all' || item.city.toLowerCase().includes(selectedCity.toLowerCase());
  });

  return (
    <AdminShell
      pageTitle="Property Moderation Queue"
      pageDescription="Verify title deeds, RERA compliance, carpet area disclosures, and high-resolution photos prior to publication."
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#252525]">Filter City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Cities</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Noida">Noida / Delhi NCR</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              {filteredItems.length} Listings in Queue
            </Badge>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3 h-3" /> Moderation Sandbox
            </span>
          </div>
        </div>

        {/* Listings Moderation Table */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#777777] border-b border-[#EAEAEA] font-semibold">
                  <th className="py-3 px-4">Listing Ref & Title</th>
                  <th className="py-3 px-4">Submitted By</th>
                  <th className="py-3 px-4">Price & City</th>
                  <th className="py-3 px-4">RERA Compliance</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <span className="text-[10px] font-mono text-[#777777] block mb-0.5">{item.id}</span>
                      <p className="font-bold text-[#252525] leading-snug">{item.title}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#252525]">{item.submittedBy}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] bg-gray-100 text-[#777777]">
                        {item.submittedByRole}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#252525]">{item.priceOrBudget}</p>
                      <p className="text-[11px] text-[#777777]">{item.city}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      {item.reraNumber ? (
                        <span className="font-mono text-[11px] font-semibold text-[#21865B] bg-green-50 px-2 py-0.5 rounded border border-green-200">
                          {item.reraNumber}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Owner Direct (No RERA needed)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.status === 'APPROVED'
                            ? 'bg-green-100 text-[#21865B]'
                            : item.status === 'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : item.status === 'NEEDS_REVISION'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewItem(item)}
                          className="text-xs h-8 px-2.5"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> Inspect
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Moderation Inspection Modal */}
      {previewItem && (
        <Modal
          isOpen={!!previewItem}
          onClose={() => setPreviewItem(null)}
          title={`Inspect Listing: ${previewItem.id}`}
          maxWidth="lg"
        >
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-[#C6383B] uppercase tracking-wider">
                {previewItem.submittedByRole} Listing Submission
              </span>
              <h3 className="text-lg font-bold text-[#252525] mt-1">{previewItem.title}</h3>
              <p className="text-xs text-[#777777] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6383B]" /> {previewItem.city} • Valuation: {previewItem.priceOrBudget}
              </p>
            </div>

            {/* Checklist items */}
            <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] space-y-2 text-xs">
              <span className="font-bold text-[#252525] block mb-1">RERA & Compliance Checklist</span>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0" />
                <span>Geographic coordinates resolved and verified within civic municipal jurisdiction.</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0" />
                <span>High-resolution architectural photography clear of external watermarks.</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0" />
                <span>Carpet area conforms strictly to Section 2(k) of RERA guidelines.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EAEAEA]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRequestRevision(previewItem.id)}
                className="w-full sm:w-auto text-xs text-amber-700 hover:border-amber-600"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Request Revision
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReject(previewItem.id, previewItem.title)}
                  className="w-full sm:w-auto text-xs text-red-600 hover:border-red-600"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1" /> Reject Listing
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleApprove(previewItem.id, previewItem.title)}
                  className="w-full sm:w-auto text-xs bg-[#21865B] hover:bg-[#1b6b49]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve & Publish
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AdminShell>
  );
}

