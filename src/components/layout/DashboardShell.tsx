'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { UserRole } from '@/types';
import { DEMO_PRESET_USERS, getDashboardRouteForRole } from '@/lib/auth';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Home,
  Building,
  Briefcase,
  Users,
  Store,
  PlusCircle,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Calendar,
  FileText,
  BarChart3,
  Heart,
  Scale,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Inbox,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DashboardShellProps {
  currentRole: UserRole;
  children: React.ReactNode;
  pageTitle: string;
  pageDescription?: string;
  actionButton?: React.ReactNode;
}

export function DashboardShell({
  currentRole,
  children,
  pageTitle,
  pageDescription,
  actionButton,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentUser = DEMO_PRESET_USERS[currentRole] || DEMO_PRESET_USERS.agent;

  // Role-specific sidebar links
  const getNavLinks = () => {
    switch (currentRole) {
      case 'buyer':
      case 'tenant':
        return [
          { label: 'Overview', href: '/dashboard/buyer', icon: Home },
          { label: 'Saved Properties', href: '/dashboard/buyer#saved', icon: Heart },
          { label: 'My Enquiries', href: '/dashboard/buyer#enquiries', icon: Inbox },
          { label: 'Site Visits', href: '/dashboard/buyer#visits', icon: Calendar },
          { label: 'Search Homes', href: '/buy', icon: Search },
        ];
      case 'owner':
        return [
          { label: 'Overview', href: '/dashboard/owner', icon: Home },
          { label: 'My Listings', href: '/dashboard/owner#listings', icon: Building },
          { label: 'Post New Property', href: '/dashboard/properties/create', icon: PlusCircle },
          { label: 'Inquiries Received', href: '/dashboard/owner#enquiries', icon: Inbox },
          { label: 'Market Trends', href: '/insights', icon: BarChart3 },
        ];
      case 'agent':
      case 'broker':
        return [
          { label: 'Overview', href: '/dashboard/agent', icon: Home },
          { label: 'My Listings', href: '/dashboard/agent#listings', icon: Building },
          { label: 'Post Property', href: '/dashboard/properties/create', icon: PlusCircle },
          { label: 'Leads Inbox', href: '/dashboard/agent#leads', icon: Inbox },
          { label: 'Lead Exchange', href: '/dashboard/agent#exchange', icon: Users },
          { label: 'Site Visits', href: '/dashboard/agent#calendar', icon: Calendar },
          { label: 'Analytics', href: '/dashboard/agent#analytics', icon: BarChart3 },
        ];
      case 'developer':
        return [
          { label: 'Overview', href: '/dashboard/developer', icon: Home },
          { label: 'Manage Projects', href: '/dashboard/developer#projects', icon: Building },
          { label: 'Launch New Project', href: '/dashboard/properties/create', icon: PlusCircle },
          { label: 'Enquiries & Leads', href: '/dashboard/developer#leads', icon: Inbox },
          { label: 'Analytics', href: '/dashboard/developer#analytics', icon: BarChart3 },
        ];
      case 'dealer':
      case 'supplier':
        return [
          { label: 'Overview', href: '/dashboard/supplier', icon: Home },
          { label: 'Product Inventory', href: '/dashboard/supplier#inventory', icon: Store },
          { label: 'Add Material', href: '/dashboard/supplier#add', icon: PlusCircle },
          { label: 'Quotation Requests', href: '/dashboard/supplier#quotations', icon: FileText },
          { label: 'Marketplace View', href: '/marketplace', icon: ArrowUpRight },
        ];
      default:
        return [{ label: 'Overview', href: '/dashboard/agent', icon: Home }];
    }
  };

  const navLinks = getNavLinks();

  const handleSwitchRole = (newRole: UserRole) => {
    setRoleDropdownOpen(false);
    router.push(getDashboardRouteForRole(newRole));
  };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* 1. Collapsible Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-brand-border flex-shrink-0 z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-brand-border">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-brand-border">
              <Image src="/brand/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-xl font-black tracking-tight text-brand-text">
              BRICKS<span className="text-brand-red">BAZAR</span>
            </span>
          </Link>
        </div>

        {/* Current Active Persona Banner */}
        <div className="p-4 border-b border-brand-border bg-brand-bg/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-wider">
              Portal Mode
            </span>
            <DemoBadge />
          </div>
          <div className="text-xs font-bold text-brand-text capitalize flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-success" />
            {currentRole} Dashboard
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-button text-xs font-semibold transition',
                  isActive
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-brand-text hover:bg-brand-bg hover:text-brand-red'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Mini Profile & Role Switcher */}
        <div className="p-4 border-t border-brand-border space-y-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-brand-bg hover:bg-brand-border/60 transition text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-brand-red-light text-brand-red font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-brand-text truncate block">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-brand-text-secondary capitalize block">
                    Role: {currentRole}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-brand-text-secondary" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-card shadow-dropdown border border-brand-border p-1.5 z-50 animate-fade-in text-xs space-y-0.5">
                <span className="text-[10px] font-bold text-brand-text-secondary uppercase px-2 py-1 block">
                  Switch Dashboard Persona:
                </span>
                {(['buyer', 'owner', 'agent', 'developer', 'supplier', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleSwitchRole(r)}
                    className={cn(
                      'w-full text-left px-2.5 py-1.5 rounded-button capitalize transition font-semibold flex items-center justify-between',
                      currentRole === r ? 'bg-brand-red-light text-brand-red' : 'hover:bg-brand-bg text-brand-text'
                    )}
                  >
                    <span>{r} View</span>
                    {currentRole === r && <CheckCircle2 className="w-3 h-3 text-brand-red" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/" className="block">
            <Button variant="ghost" size="sm" className="w-full text-xs justify-start text-brand-text-secondary gap-2">
              <LogOut className="w-3.5 h-3.5" />
              Exit to Public Portal
            </Button>
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-brand-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-bg border border-brand-border"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-brand-text-secondary hidden sm:block">
              BricksBazar Management Console
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full text-brand-text-secondary hover:text-brand-text hover:bg-brand-bg relative transition"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-red" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-card shadow-dropdown border border-brand-border p-3 z-50 animate-fade-in text-xs space-y-2">
                  <div className="font-bold text-brand-text pb-2 border-b border-brand-border flex items-center justify-between">
                    <span>Recent Notifications</span>
                    <span className="text-[10px] text-brand-red font-semibold">2 New</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 bg-brand-bg rounded-lg">
                      <div className="font-semibold text-brand-text">New Site Visit Requested</div>
                      <div className="text-[10px] text-brand-text-secondary mt-0.5">Priya Narang for 2 BHK Powai Condo</div>
                    </div>
                    <div className="p-2 bg-brand-bg rounded-lg">
                      <div className="font-semibold text-brand-text">RERA Verification Approved</div>
                      <div className="text-[10px] text-brand-text-secondary mt-0.5">Your profile badge is now active.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Public Site Quick Link */}
            <Link href="/" className="text-xs font-semibold text-brand-text hover:text-brand-red flex items-center gap-1">
              <span>View Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Header Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-black text-brand-text tracking-tight">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-xs text-brand-text-secondary mt-1">{pageDescription}</p>
              )}
            </div>

            {actionButton && <div>{actionButton}</div>}
          </div>

          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-dropdown z-10 flex flex-col animate-slide-up">
            <div className="h-16 flex items-center justify-between px-6 border-b border-brand-border">
              <span className="text-xl font-black text-brand-text">
                BRICKS<span className="text-brand-red">BAZAR</span>
              </span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-brand-text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-button text-xs font-semibold text-brand-text hover:bg-brand-bg"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

