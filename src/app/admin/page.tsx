'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  Users,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Server,
  Activity,
  FileCheck,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { MOCK_MODERATION_QUEUE, MOCK_AUDIT_LOGS, ModerationItem } from '@/mocks/admin';

export default function AdminOverviewPage() {
  const { success, info } = useToast();
  const [queue, setQueue] = useState<ModerationItem[]>(MOCK_MODERATION_QUEUE);

  const handleQuickApprove = (id: string, title: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
    success('Item Approved', `"${title.substring(0, 30)}..." has been verified and published.`);
  };

  const handleQuickReject = (id: string, title: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
    info('Item Rejected', `"${title.substring(0, 30)}..." rejected. Lister notified.`);
  };

  return (
    <AdminShell
      pageTitle="Platform Governance Overview"
      pageDescription="Real-time surveillance of property submissions, broker RERA accreditations, and platform security."
    >
      <div className="space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                Active Listings
              </span>
              <span className="p-2 bg-red-50 text-[#C6383B] rounded-xl">
                <Building className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">1,248</p>
            <p className="text-xs text-[#21865B] flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +24 new this week
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                Pending Moderation
              </span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">{queue.length}</p>
            <p className="text-xs text-amber-700 mt-1 font-semibold">4 requiring urgent SLA check</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                Verified Brokers
              </span>
              <span className="p-2 bg-emerald-50 text-[#21865B] rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">412</p>
            <p className="text-xs text-[#21865B] font-semibold mt-1">98.6% RERA Match Rate</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                Monthly GMV Pipeline
              </span>
              <span className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <Activity className="w-5 h-5" />
              </span>
            </div>
            <p className="text-2xl font-bold text-[#252525] mt-2">₹ 148 Cr</p>
            <p className="text-xs text-[#777777] mt-1">Across Mumbai, Pune & BLR</p>
          </div>
        </div>

        {/* Priority Moderation Queue Table */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#EAEAEA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#252525]">Pending Moderation Queue</h3>
              <Badge variant="outline" size="sm">
                {queue.length} Pending
              </Badge>
            </div>
            <Link
              href="/admin/properties"
              className="text-xs text-[#C6383B] font-semibold hover:underline flex items-center gap-1"
            >
              View Full Queue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {queue.length === 0 ? (
            <div className="p-8 text-center text-[#777777] text-xs">
              <CheckCircle2 className="w-8 h-8 text-[#21865B] mx-auto mb-2" />
              All pending submissions have been moderated!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[#777777] border-b border-[#EAEAEA] font-semibold">
                    <th className="py-3 px-4">Entity & Title</th>
                    <th className="py-3 px-4">Submitted By</th>
                    <th className="py-3 px-4">City & Metrics</th>
                    <th className="py-3 px-4">RERA Registration</th>
                    <th className="py-3 px-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  {queue.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              item.type === 'property'
                                ? 'bg-blue-50 text-blue-700'
                                : item.type === 'agent'
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.type === 'project'
                                ? 'bg-purple-50 text-purple-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {item.type}
                          </span>
                          <span className="text-[10px] text-[#777777] font-mono">{item.id}</span>
                        </div>
                        <p className="font-bold text-[#252525] truncate">{item.title}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-[#252525]">{item.submittedBy}</p>
                        <p className="text-[11px] text-[#777777]">Role: {item.submittedByRole}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#252525]">{item.priceOrBudget || '-'}</p>
                        <p className="text-[11px] text-[#777777]">{item.city}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        {item.reraNumber ? (
                          <span className="font-mono text-[11px] font-semibold text-[#21865B] bg-green-50 px-2 py-0.5 rounded border border-green-200">
                            {item.reraNumber}
                          </span>
                        ) : (
                          <span className="text-[11px] text-amber-600 italic">Owner / Unregistered</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReject(item.id, item.title)}
                            className="text-xs text-red-600 hover:border-red-600 h-8 px-2.5"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleQuickApprove(item.id, item.title)}
                            className="text-xs bg-[#21865B] hover:bg-[#1b6b49] h-8 px-2.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Audit Log Snapshot & Server Health Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Audit Activities (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAEAEA] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#252525]">Recent Security & Audit Logs</h3>
              <Link href="/admin/audit-logs" className="text-xs text-[#C6383B] font-semibold hover:underline">
                View All Logs
              </Link>
            </div>

            <div className="space-y-3">
              {MOCK_AUDIT_LOGS.slice(0, 4).map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[10px] text-gray-500">{log.action}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                    <p className="text-[#252525] font-medium leading-relaxed">{log.details}</p>
                    <p className="text-[10px] text-[#777777]">
                      Actor: {log.actor} ({log.actorRole}) • {log.ipAddress}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#777777] shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Status (1 col) */}
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#252525]">System Health & Telemetry</h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between">
                <span className="text-[#777777]">MongoDB Atlas Cluster</span>
                <span className="font-bold text-[#21865B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.98% Uptime
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between">
                <span className="text-[#777777]">DigitalOcean Spaces CDN</span>
                <span className="font-bold text-[#21865B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 42ms Latency
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between">
                <span className="text-[#777777]">State RERA API Sync</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Scheduled 02:00 AM
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-[#EAEAEA] flex items-center justify-between">
                <span className="text-[#777777]">SMS / WhatsApp Gateway</span>
                <span className="font-bold text-[#21865B] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operational
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => info('Health Ping Sent', 'All 4 microservice endpoints responding nominal.')}
                className="w-full text-xs"
              >
                Trigger Health Diagnostics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

