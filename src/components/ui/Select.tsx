import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (SelectOption | string)[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, id, disabled, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-brand-text"
          >
            {label}
            {props.required && <span className="text-brand-red ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full appearance-none bg-white text-brand-text text-sm rounded-button border border-brand-border px-3.5 py-2.5 pr-10 transition-all duration-150',
              'focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red',
              'disabled:bg-brand-bg disabled:text-brand-text-muted disabled:cursor-not-allowed cursor-pointer',
              error && 'border-brand-error focus:border-brand-error focus:ring-brand-error',
              className
            )}
            {...props}
          >
            {options.map((opt) => {
              const value = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              const isDisabled = typeof opt === 'string' ? false : opt.disabled;
              return (
                <option key={value} value={value} disabled={isDisabled}>
                  {optLabel}
                </option>
              );
            })}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-secondary">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error && <p className="text-xs text-brand-error font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-brand-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

