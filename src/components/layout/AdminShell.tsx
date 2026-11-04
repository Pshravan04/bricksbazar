'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  Briefcase,
  UserCheck,
  Store,
  ShieldAlert,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface AdminShellProps {
  children: React.ReactNode;
  pageTitle: string;
  pageDescription?: string;
  actionButton?: React.ReactNode;
}

const NAV_LINKS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Property Moderation', href: '/admin/properties', icon: Building, badge: '2' },
  { label: 'Agent Verification', href: '/admin/agents', icon: UserCheck, badge: '1' },
  { label: 'Marketplace Products', href: '/admin/marketplace', icon: Store, badge: '1' },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
  { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
];

export function AdminShell({
  children,
  pageTitle,
  pageDescription,
  actionButton,
}: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1E1E1E] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C6383B] flex items-center justify-center font-bold text-white text-sm">
                BB
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">BRICKSBAZAR</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6383B] block">
                  Admin Control
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Platform Governance
            </div>
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#C6383B] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#C6383B]' : 'bg-[#C6383B] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer of Sidebar */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C6383B] text-white flex items-center justify-center font-bold text-xs shrink-0">
              RR
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Rajeshwar Rao</p>
              <p className="text-[10px] text-gray-400">Super Administrator</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Return to Public Portal
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#EAEAEA] flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#777777] hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5" /> Admin Simulator Active
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" /> System Nominal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/properties">
              <Button variant="outline" size="sm" className="text-xs">
                Review Queue (4)
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="text-xs">
                User Dashboard
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Page Title & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#252525] tracking-tight">{pageTitle}</h1>
              {pageDescription && (
                <p className="text-xs sm:text-sm text-[#777777] mt-1">{pageDescription}</p>
              )}
            </div>
            {actionButton && <div>{actionButton}</div>}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

