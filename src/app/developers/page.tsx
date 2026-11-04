'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_DEVELOPERS } from '@/mocks';
import { DeveloperCard } from '@/components/common/DeveloperCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CITIES } from '@/constants';
import { Building2, Search, Award, PlusCircle, RotateCcw } from 'lucide-react';

export default function DevelopersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [minExp, setMinExp] = useState('0');

  const filteredDevelopers = useMemo(() => {
    return MOCK_DEVELOPERS.filter((dev) => {
      if (selectedCity !== 'All' && !dev.operatingCities.includes(selectedCity)) {
        return false;
      }
      if (minExp !== '0' && dev.experienceYears < Number(minExp)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          dev.name.toLowerCase().includes(q) ||
          dev.headquarters.toLowerCase().includes(q) ||
          dev.operatingCities.some((c) => c.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCity, minExp]);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb items={[{ label: 'Builders & Developers' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  Top Real Estate Builders & Developers in India
                </h1>
                <DemoBadge />
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                Track record, ongoing high-rises, and delivered projects from India&apos;s leading construction groups.
              </p>
            </div>

            <Link href="/register?role=developer">
              <Button size="sm" className="gap-2 font-bold whitespace-nowrap">
                <PlusCircle className="w-4 h-4" />
                Register as a Developer
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Controls Bar */}
        <div className="bg-white rounded-xl border border-brand-border p-4 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <Input
              isSearch
              placeholder="Search developer by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1 max-w-md">
            <Select
              options={[{ label: 'All Operating Cities', value: 'All' }, ...CITIES.map((c) => ({ label: c.name, value: c.name }))]}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />
            <Select
              options={[
                { label: 'Any Experience', value: '0' },
                { label: '10+ Years', value: '10' },
                { label: '25+ Years', value: '25' },
                { label: '35+ Years', value: '35' },
              ]}
              value={minExp}
              onChange={(e) => setMinExp(e.target.value)}
            />
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
      </div>
    </div>
  );
}

