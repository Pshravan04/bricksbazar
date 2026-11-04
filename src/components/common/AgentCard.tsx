'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Agent } from '@/types';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Star, MapPin, Building2, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AgentCardProps {
  agent: Agent;
  onContactClick?: (agent: Agent) => void;
  className?: string;
}

export function AgentCard({ agent, onContactClick, className }: AgentCardProps) {
  return (
    <div className="bg-white rounded-card border border-brand-border p-5 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: Avatar, Name, Badges */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-border group-hover:border-brand-red transition">
            <Image
              src={agent.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {agent.isVerified && <Badge variant="verified" size="sm">Verified</Badge>}
              {agent.isDemoRecord && <DemoBadge />}
            </div>

            <Link href={`/agents/${agent.slug}`}>
              <h3 className="text-base font-bold text-brand-text group-hover:text-brand-red transition truncate">
                {agent.name}
              </h3>
            </Link>

            <span className="text-xs text-brand-text-secondary block truncate">
              {agent.agencyName}
            </span>
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-brand-bg rounded-lg border border-brand-border text-center text-xs mb-3">
          <div>
            <div className="flex items-center justify-center gap-1 font-bold text-brand-text">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{agent.rating}</span>
              <span className="text-brand-text-secondary font-normal">({agent.reviewCount})</span>
            </div>
            <span className="text-[10px] text-brand-text-secondary block mt-0.5">Rating</span>
          </div>
          <div className="border-l border-brand-border">
            <span className="font-bold text-brand-text block">{agent.experienceYears} Years</span>
            <span className="text-[10px] text-brand-text-secondary block mt-0.5">Experience</span>
          </div>
        </div>

        {/* Location & Listings */}
        <div className="space-y-1.5 text-xs text-brand-text-secondary mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span className="truncate">{agent.location.locality}, {agent.location.city}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-brand-text">
            <Building2 className="w-3.5 h-3.5 text-brand-text-secondary flex-shrink-0" />
            <span>{agent.listedPropertiesCount} Active Listings ({agent.verifiedListingsCount} Verified)</span>
          </div>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1 mb-4">
          {agent.specializations.slice(0, 2).map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 bg-brand-bg rounded-md text-brand-text-secondary border border-brand-border"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-3 border-t border-brand-border flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onContactClick && onContactClick(agent)}
        >
          <Phone className="w-3.5 h-3.5 mr-1" />
          Contact
        </Button>
        <Link href={`/agents/${agent.slug}`} className="flex-1">
          <Button size="sm" className="w-full">
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

