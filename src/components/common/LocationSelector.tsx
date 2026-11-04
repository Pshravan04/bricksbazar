'use client';

import React from 'react';
import { CITIES } from '@/constants';
import { Select } from '@/components/ui/Select';
import { MapPin } from 'lucide-react';

export interface LocationSelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  className?: string;
  showAllOption?: boolean;
}

export function LocationSelector({
  selectedCity,
  onCityChange,
  className,
  showAllOption = true,
}: LocationSelectorProps) {
  const options = [
    ...(showAllOption ? [{ label: 'All Indian Metros', value: 'All' }] : []),
    ...CITIES.map((c) => ({
      label: `${c.name} (${c.state})`,
      value: c.name,
    })),
  ];

  return (
    <div className={className}>
      <Select
        label="Select Metro / City"
        options={options}
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
      />
    </div>
  );
}

