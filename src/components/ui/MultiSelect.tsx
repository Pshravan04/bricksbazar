'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, X, Check } from 'lucide-react';

export interface MultiSelectProps {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((item) => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  const removeChip = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== opt));
  };

  return (
    <div className={cn('w-full space-y-1.5 relative', className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'min-h-[42px] w-full bg-white text-brand-text text-sm rounded-button border border-brand-border px-3 py-1.5 flex flex-wrap items-center gap-1.5 cursor-pointer transition',
          'hover:border-brand-text-secondary focus-within:border-brand-red',
          isOpen && 'border-brand-red ring-1 ring-brand-red'
        )}
      >
        {selected.length === 0 ? (
          <span className="text-brand-text-muted text-sm">{placeholder}</span>
        ) : (
          selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-badge bg-brand-red-light text-brand-red text-xs font-medium"
            >
              {item}
              <button
                type="button"
                onClick={(e) => removeChip(item, e)}
                className="hover:text-brand-red-hover focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}

        <div className="ml-auto pl-1 text-brand-text-secondary">
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brand-border rounded-lg shadow-dropdown z-50 max-h-56 overflow-y-auto p-1.5 animate-fade-in">
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition',
                  isSelected
                    ? 'bg-brand-red-light text-brand-red font-semibold'
                    : 'text-brand-text hover:bg-brand-bg'
                )}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-brand-red" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

