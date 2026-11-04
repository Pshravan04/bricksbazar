'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { MOCK_MODERATION_QUEUE, ModerationItem } from '@/mocks/admin';

export default function AdminMarketplaceModerationPage() {
  const { success, error } = useToast();
  const [items, setItems] = useState<ModerationItem[]>([
    ...MOCK_MODERATION_QUEUE.filter((item) => item.type === 'product'),
    {
      id: 'mod-mat-602',
      type: 'product',
      title: 'JSW Neosteel 500D Fe TMT Rebar (12mm)',
      submittedBy: 'Apex Steel Distributors',
      submittedByRole: 'Supplier',
      submittedAt: '2026-03-02T14:15:00Z',
      city: 'Pune',
      status: 'APPROVED',
      priceOrBudget: '₹ 64,000 / MT',
    },
  ]);

  const handleApprove = (id: string, title: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'APPROVED' } : item)));
    success('Product Approved', `"${title.substring(0, 30)}..." published to Marketplace.`);
  };

  const handleReject = (id: string, title: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'REJECTED' } : item)));
    error('Product Rejected', `Product declined.`);
  };

  return (
    <AdminShell
      pageTitle="Construction Marketplace Moderation"
      pageDescription="Approve building materials, verify dealer BIS/ISO certifications, and audit bulk pricing quotes."
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex items-center justify-between">
          <Badge variant="outline" size="sm">
            {items.length} Marketplace Catalog Items
          </Badge>
          <span className="text-xs text-[#777777]">
            {items.filter((i) => i.status === 'APPROVED').length} Active in Store
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#777777] border-b border-[#EAEAEA] font-semibold">
                  <th className="py-3 px-4">Item Ref & Name</th>
                  <th className="py-3 px-4">Supplier Business</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Quoted Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#252525]">{item.title}</td>
                    <td className="py-3.5 px-4 text-[#777777]">{item.submittedBy}</td>
                    <td className="py-3.5 px-4">{item.city}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#252525]">{item.priceOrBudget}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'APPROVED' ? 'bg-green-100 text-[#21865B]' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.status !== 'APPROVED' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(item.id, item.title)}
                          className="text-xs bg-[#21865B] hover:bg-[#1b6b49] h-8 px-2.5"
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(item.id, item.title)}
                          className="text-xs text-red-600 hover:border-red-600 h-8 px-2.5"
                        >
                          Revoke
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

