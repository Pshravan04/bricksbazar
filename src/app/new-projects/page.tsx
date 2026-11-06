'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/mocks';
import { ProjectCard } from '@/components/common/ProjectCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CITIES } from '@/constants';
import { Building2, Search, Filter, RotateCcw, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export default function NewProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDeveloper, setSelectedDeveloper] = useState('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((proj) => {
      if (selectedCity !== 'All' && proj.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      if (selectedStatus !== 'All' && proj.projectStatus !== selectedStatus) {
        return false;
      }
      if (selectedDeveloper !== 'All' && proj.developer.name !== selectedDeveloper) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          proj.name.toLowerCase().includes(q) ||
          proj.developer.name.toLowerCase().includes(q) ||
          proj.location.locality.toLowerCase().includes(q) ||
          proj.location.city.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [searchQuery, selectedCity, selectedStatus, selectedDeveloper, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedStatus('All');
    setSelectedDeveloper('All');
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb items={[{ label: 'New Projects & Master Townships' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                New & Upcoming Projects in India
              </h1>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                RERA-approved pre-launches, under-construction towers, and ready gated townships.
              </p>
            </div>

            <div className="max-w-md w-full">
              <Input
                isSearch
                placeholder="Search by project name, developer, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Filter Controls Bar */}
        <div className="bg-white rounded-xl border border-brand-border p-4 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 max-w-2xl">
            <Select
              options={[{ label: 'All Metros', value: 'All' }, ...CITIES.map((c) => ({ label: c.name, value: c.name }))]}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />
            <Select
              options={[
                { label: 'All Project Statuses', value: 'All' },
                { label: 'Under Construction', value: 'Under Construction' },
                { label: 'New Launch', value: 'New Launch' },
                { label: 'Ready to Move', value: 'Ready to Move' },
              ]}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            <Select
              options={[
                { label: 'All Developers', value: 'All' },
                ...MOCK_DEVELOPERS.map((d) => ({ label: d.name, value: d.name })),
              ]}
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-border">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-brand-bg text-brand-text text-xs font-semibold rounded-button border border-brand-border px-3 py-2 focus:outline-none focus:border-brand-red"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

