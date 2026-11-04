import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, checked, disabled, id, onChange, ...props }, ref) => {
    const checkId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1">
        <label
          htmlFor={checkId}
          className={cn(
            'inline-flex items-start gap-2.5 cursor-pointer select-none',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkId}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'w-4 h-4 rounded border border-brand-border bg-white transition-all duration-150',
                'peer-checked:bg-brand-red peer-checked:border-brand-red',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-red peer-focus-visible:ring-offset-1',
                error ? 'border-brand-error' : 'hover:border-brand-text-secondary'
              )}
            >
              {checked && <Check className="w-3 h-3 text-white stroke-[3] mx-auto" />}
            </div>
          </div>

          {(label || description) && (
            <div className="space-y-0.5">
              {label && <div className="text-sm font-medium text-brand-text leading-tight">{label}</div>}
              {description && <div className="text-xs text-brand-text-secondary">{description}</div>}
            </div>
          )}
        </label>
        {error && <p className="text-xs text-brand-error font-medium">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
