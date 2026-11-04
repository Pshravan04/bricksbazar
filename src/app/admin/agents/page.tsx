'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Building,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { MOCK_MODERATION_QUEUE, ModerationItem } from '@/mocks/admin';

export default function AdminAgentVerificationPage() {
  const { success, error, info } = useToast();
  const [agents, setAgents] = useState<ModerationItem[]>([
    ...MOCK_MODERATION_QUEUE.filter((item) => item.type === 'agent'),
    {
      id: 'mod-agent-802',
      type: 'agent',
      title: 'Rohan Kulkarni (Pune Metro Properties)',
      submittedBy: 'Rohan Kulkarni',
      submittedByRole: 'Agent',
      submittedAt: '2026-03-02T18:00:00Z',
      city: 'Pune',
      status: 'APPROVED',
      reraNumber: 'A52100034821',
      priceOrBudget: '28 Active Listings',
    },
    {
      id: 'mod-agent-803',
      type: 'agent',
      title: 'Apex Prime Realty LLP',
      submittedBy: 'Vikramaditya Singhania',
      submittedByRole: 'Broker',
      submittedAt: '2026-03-01T10:00:00Z',
      city: 'Mumbai',
      status: 'APPROVED',
      reraNumber: 'A51900028941',
      priceOrBudget: '45 Active Listings',
    },
  ]);

  const handleGrantBadge = (id: string, name: string) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'APPROVED' } : a)));
    success('RERA Accreditation Verified', `Granted official Verified Broker badge to ${name}.`);
  };

  const handleRevoke = (id: string, name: string) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'REJECTED' } : a)));
    error('Verification Revoked', `Revoked verification credentials for ${name}.`);
  };

  return (
    <AdminShell
      pageTitle="Agent & Broker Verification"
      pageDescription="Validate MahaRERA and State RERA certificates against government regulatory registries to issue Verified badges."
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" size="sm">
              {agents.length} Registered Brokers
            </Badge>
            <span className="text-xs text-[#777777]">
              {agents.filter((a) => a.status === 'APPROVED').length} Verified
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> State RERA Integration Ready
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#777777] border-b border-[#EAEAEA] font-semibold">
                  <th className="py-3 px-4">Consultant / Agency</th>
                  <th className="py-3 px-4">RERA Certificate ID</th>
                  <th className="py-3 px-4">Operating City</th>
                  <th className="py-3 px-4">Portfolio Activity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Verification Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FCEEEF] text-[#C6383B] flex items-center justify-center font-bold text-xs">
                          {agent.submittedBy.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#252525]">{agent.title}</p>
                          <p className="text-[11px] text-[#777777]">Role: {agent.submittedByRole}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold text-[#21865B] bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        {agent.reraNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[#252525]">{agent.city}</td>

                    <td className="py-3.5 px-4 text-[#777777]">{agent.priceOrBudget}</td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          agent.status === 'APPROVED'
                            ? 'bg-green-100 text-[#21865B]'
                            : agent.status === 'REJECTED'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {agent.status === 'APPROVED' ? 'VERIFIED' : agent.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {agent.status !== 'APPROVED' ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleGrantBadge(agent.id, agent.submittedBy)}
                            className="text-xs bg-[#21865B] hover:bg-[#1b6b49] h-8 px-2.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Grant Badge
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevoke(agent.id, agent.submittedBy)}
                            className="text-xs text-red-600 hover:border-red-600 h-8 px-2.5"
                          >
                            Revoke Badge
                          </Button>
                        )}
                      </div>
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

