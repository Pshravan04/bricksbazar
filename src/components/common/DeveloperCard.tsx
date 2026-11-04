'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Developer } from '@/types';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Building2, Award, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface DeveloperCardProps {
  developer: Developer;
  className?: string;
}

export function DeveloperCard({ developer, className }: DeveloperCardProps) {
  return (
    <div className="bg-white rounded-card border border-brand-border p-5 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header: Logo & Name */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-brand-border bg-brand-bg flex-shrink-0 flex items-center justify-center p-1">
            <Image
              src={developer.logo || 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=200&q=80'}
              alt={developer.name}
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
              {developer.isVerified && <Badge variant="verified" size="sm">Verified Builder</Badge>}
              {developer.isDemoRecord && <DemoBadge />}
            </div>

            <Link href={`/developers/${developer.slug}`}>
              <h3 className="text-base font-bold text-brand-text group-hover:text-brand-red transition truncate">
                {developer.name}
              </h3>
            </Link>

            <span className="text-xs text-brand-text-secondary block">
              Est. {developer.foundedYear} ({developer.experienceYears} Years Exp.)
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-brand-bg rounded-lg border border-brand-border text-center text-xs mb-3">
          <div>
            <span className="font-extrabold text-brand-text text-sm block">{developer.totalProjects}</span>
            <span className="text-[10px] text-brand-text-secondary block mt-0.5">Total</span>
          </div>
          <div className="border-x border-brand-border">
            <span className="font-extrabold text-brand-red text-sm block">{developer.ongoingProjects}</span>
            <span className="text-[10px] text-brand-text-secondary block mt-0.5">Ongoing</span>
          </div>
          <div>
            <span className="font-extrabold text-brand-success text-sm block">{developer.completedProjects}</span>
            <span className="text-[10px] text-brand-text-secondary block mt-0.5">Delivered</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-brand-text-secondary line-clamp-2 mb-3 leading-relaxed">
          {developer.description}
        </p>

        {/* Operating Cities */}
        <div className="text-[11px] text-brand-text-secondary mb-4">
          <span className="font-semibold text-brand-text">Cities: </span>
          {developer.operatingCities.join(', ')}
        </div>
      </div>

      <div className="pt-3 border-t border-brand-border">
        <Link href={`/developers/${developer.slug}`} className="block w-full">
          <Button variant="outline" size="sm" className="w-full">
            View Projects Portfolio
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

