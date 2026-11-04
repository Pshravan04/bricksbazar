'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { MOCK_AUDIT_LOGS, AdminAuditLog } from '@/mocks/admin';

export default function AdminAuditLogsPage() {
  const { info } = useToast();
  const [logs] = useState<AdminAuditLog[]>(MOCK_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);

    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminShell
      pageTitle="System Audit & Security Logs"
      pageDescription="Immutable ledger of administrative decisions, title verifications, moderation overrides, and security events."
    >
      <div className="space-y-6">
        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by action, actor, IP address, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#EAEAEA] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            >
              <option value="all">All Outcomes</option>
              <option value="SUCCESS">Success</option>
              <option value="WARNING">Warning</option>
              <option value="FAILED">Failed / Denied</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => info('Audit Exported', 'Downloaded BricksBazar_AuditLedger_March2026.json (Simulated)')}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Export JSON
            </Button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#777777] border-b border-[#EAEAEA] font-semibold">
                  <th className="py-3 px-4">Timestamp & Ref</th>
                  <th className="py-3 px-4">Action Code</th>
                  <th className="py-3 px-4">Actor & IP Address</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Event Details</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-[#252525] font-semibold">
                        {new Date(log.timestamp).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}{' '}
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <span className="text-[10px] text-[#777777] font-mono">{log.id}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#252525]">{log.action}</td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#252525]">{log.actor}</p>
                      <p className="text-[10px] text-[#777777] font-mono">{log.ipAddress}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[10px]">
                        {log.entityType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-md text-gray-700 leading-relaxed">{log.details}</td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status === 'SUCCESS' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : log.status === 'WARNING' ? (
                          <AlertTriangle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {log.status}
                      </span>
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

