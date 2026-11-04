import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  className,
  orientation = 'vertical',
}: RadioGroupProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
          {label}
        </span>
      )}
      <div
        className={cn(
          'gap-3',
          orientation === 'horizontal' ? 'flex flex-wrap items-center' : 'flex flex-col'
        )}
      >
        {options.map((opt) => {
          const isChecked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                'inline-flex items-start gap-2.5 cursor-pointer select-none text-sm text-brand-text'
              )}
            >
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => onChange(opt.value)}
                  className="sr-only peer"
                />
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border border-brand-border bg-white flex items-center justify-center transition-all',
                    isChecked ? 'border-brand-red' : 'hover:border-brand-text-secondary'
                  )}
                >
                  {isChecked && <div className="w-2 h-2 rounded-full bg-brand-red" />}
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="font-medium text-brand-text leading-tight">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs text-brand-text-secondary">{opt.description}</div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

