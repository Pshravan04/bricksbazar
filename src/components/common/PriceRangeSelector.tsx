'use client';

import React from 'react';
import { Select } from '@/components/ui/Select';
import { formatINR } from '@/lib/utils';

export interface PriceRangeSelectorProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (val: number) => void;
  onMaxPriceChange: (val: number) => void;
  isRent?: boolean;
  className?: string;
}

const BUY_PRICE_OPTIONS = [
  { label: 'Min Budget (Any)', value: '0' },
  { label: '₹ 25 Lakhs', value: '2500000' },
  { label: '₹ 50 Lakhs', value: '5000000' },
  { label: '₹ 75 Lakhs', value: '7500000' },
  { label: '₹ 1.0 Crore', value: '10000000' },
  { label: '₹ 1.5 Crores', value: '15000000' },
  { label: '₹ 2.0 Crores', value: '20000000' },
  { label: '₹ 3.0 Crores', value: '30000000' },
  { label: '₹ 5.0 Crores', value: '50000000' },
  { label: '₹ 10.0 Crores', value: '100000000' },
];

const BUY_MAX_PRICE_OPTIONS = [
  { label: 'Max Budget (Any)', value: '0' },
  { label: '₹ 50 Lakhs', value: '5000000' },
  { label: '₹ 75 Lakhs', value: '7500000' },
  { label: '₹ 1.0 Crore', value: '10000000' },
  { label: '₹ 1.5 Crores', value: '15000000' },
  { label: '₹ 2.0 Crores', value: '20000000' },
  { label: '₹ 3.0 Crores', value: '30000000' },
  { label: '₹ 5.0 Crores', value: '50000000' },
  { label: '₹ 10.0 Crores', value: '100000000' },
  { label: '₹ 20.0 Crores+', value: '200000000' },
];

const RENT_PRICE_OPTIONS = [
  { label: 'Min Rent (Any)', value: '0' },
  { label: '₹ 15,000/mo', value: '15000' },
  { label: '₹ 25,000/mo', value: '25000' },
  { label: '₹ 40,000/mo', value: '40000' },
  { label: '₹ 60,000/mo', value: '60000' },
  { label: '₹ 1.0 Lakh/mo', value: '100000' },
  { label: '₹ 2.0 Lakhs/mo', value: '200000' },
];

const RENT_MAX_PRICE_OPTIONS = [
  { label: 'Max Rent (Any)', value: '0' },
  { label: '₹ 30,000/mo', value: '30000' },
  { label: '₹ 50,000/mo', value: '50000' },
  { label: '₹ 75,000/mo', value: '75000' },
  { label: '₹ 1.0 Lakh/mo', value: '100000' },
  { label: '₹ 2.0 Lakhs/mo', value: '200000' },
  { label: '₹ 5.0 Lakhs/mo+', value: '500000' },
];

export function PriceRangeSelector({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  isRent = false,
  className,
}: PriceRangeSelectorProps) {
  const minOptions = isRent ? RENT_PRICE_OPTIONS : BUY_PRICE_OPTIONS;
  const maxOptions = isRent ? RENT_MAX_PRICE_OPTIONS : BUY_MAX_PRICE_OPTIONS;

  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1.5">
        Budget Range
      </label>
      <div className="grid grid-cols-2 gap-2">
        <Select
          options={minOptions}
          value={minPrice.toString()}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
        />
        <Select
          options={maxOptions}
          value={maxPrice.toString()}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

