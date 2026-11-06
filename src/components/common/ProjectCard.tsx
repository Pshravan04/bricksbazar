'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { MapPin, Building, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-card border border-brand-border overflow-hidden hover:shadow-card-hover transition-all duration-200 flex flex-col group h-full">
      {/* Cover Image */}
      <div className="relative w-full h-52 bg-brand-bg overflow-hidden flex-shrink-0">
        <Link href={`/projects/${project.slug}`} className="block w-full h-full">
          <Image
            src={project.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[85%]">
          {project.isVerified && <Badge variant="verified">Verified Project</Badge>}
          {project.isReraApproved && <Badge variant="rera">RERA Approved</Badge>}
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 bg-brand-text/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-badge uppercase tracking-wider">
          {project.projectStatus}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Starting Price */}
          <div className="mb-1.5">
            <span className="text-xs text-brand-text-secondary block">Starting from</span>
            <span className="text-xl font-extrabold text-brand-text">
              {formatINR(project.startingPrice)}
            </span>
          </div>

          {/* Project Title */}
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-base font-bold text-brand-text group-hover:text-brand-red transition line-clamp-1 mb-1">
              {project.name}
            </h3>
          </Link>

          {/* Developer */}
          <div className="flex items-center gap-1.5 text-xs text-brand-text font-medium mb-2">
            <Building className="w-3.5 h-3.5 text-brand-text-secondary" />
            <span>By {project.developer.name}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span className="truncate">
              {project.location.locality}, {project.location.city}
            </span>
          </div>

          {/* Config Chips */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.configurations.map((cfg) => (
              <span
                key={cfg}
                className="px-2 py-0.5 rounded-badge bg-brand-bg border border-brand-border text-[11px] font-semibold text-brand-text"
              >
                {cfg}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Possession & CTA */}
        <div className="pt-3 border-t border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-brand-text-secondary">
            <Calendar className="w-3.5 h-3.5" />
            <span>Possession: {project.possessionDate}</span>
          </div>

          <Link href={`/projects/${project.slug}`}>
            <Button size="sm" variant="outline">
              Explore
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

