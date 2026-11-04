'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  ShieldCheck,
  Bell,
  Database,
  Lock,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/components/ui/Toast';

export default function AdminSettingsPage() {
  const { success } = useToast();
  const [reraStrictEnforcement, setReraStrictEnforcement] = useState(true);
  const [autoModerateTrustedBrokers, setAutoModerateTrustedBrokers] = useState(false);
  const [smsOtpVerification, setSmsOtpVerification] = useState(true);
  const [platformCommissionRate, setPlatformCommissionRate] = useState('1.5');
  const [maxPhotosPerListing, setMaxPhotosPerListing] = useState('25');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Platform governance configuration updated successfully.');
  };

  return (
    <AdminShell
      pageTitle="Platform Governance Settings"
      pageDescription="Configure RERA compliance enforcement, moderation automation thresholds, and platform parameters."
    >
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Compliance Enforcement */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#252525] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6383B]" /> Regulatory & RERA Rules
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#252525]">Strict RERA Certificate Enforcement</p>
                <p className="text-[11px] text-[#777777]">
                  Require valid State RERA IDs for all agent, broker, and builder project submissions.
                </p>
              </div>
              <Switch
                checked={reraStrictEnforcement}
                onChange={setReraStrictEnforcement}
              />
            </div>

            <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-4">
              <div>
                <p className="text-xs font-bold text-[#252525]">Auto-Approve High-Trust Verified Brokers</p>
                <p className="text-[11px] text-[#777777]">
                  Automatically publish listings submitted by agencies with 50+ approved transactions.
                </p>
              </div>
              <Switch
                checked={autoModerateTrustedBrokers}
                onChange={setAutoModerateTrustedBrokers}
              />
            </div>

            <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-4">
              <div>
                <p className="text-xs font-bold text-[#252525]">Mandatory Indian Mobile OTP Verification</p>
                <p className="text-[11px] text-[#777777]">
                  Send 6-digit SMS OTP verification before enabling property contact reveals.
                </p>
              </div>
              <Switch
                checked={smsOtpVerification}
                onChange={setSmsOtpVerification}
              />
            </div>
          </div>
        </div>

        {/* Operational Parameters */}
        <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#252525] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C6383B]" /> Operational Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Input
              label="Default Co-Broking Commission Split (%)"
              value={platformCommissionRate}
              onChange={(e) => setPlatformCommissionRate(e.target.value)}
              helperText="Standard broker commission split percentage"
            />
            <Input
              label="Maximum Photos per Listing"
              value={maxPhotosPerListing}
              onChange={(e) => setMaxPhotosPerListing(e.target.value)}
              helperText="Enforced during property submission"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md">
            <Save className="w-4 h-4 mr-2" /> Save Configuration
          </Button>
        </div>
      </form>
    </AdminShell>
  );
}

