import React from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isSearch?: boolean;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      isSearch,
      onClear,
      value,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-brand-text"
          >
            {label}
            {props.required && <span className="text-brand-red ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {isSearch && !leftIcon && (
            <div className="absolute left-3 text-brand-text-secondary pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
          )}
          {leftIcon && (
            <div className="absolute left-3 text-brand-text-secondary pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            value={value}
            disabled={disabled}
            className={cn(
              'w-full bg-white text-brand-text text-sm rounded-button border border-brand-border px-3.5 py-2.5 transition-all duration-150',
              'placeholder:text-brand-text-muted focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red',
              'disabled:bg-brand-bg disabled:text-brand-text-muted disabled:cursor-not-allowed',
              (isSearch || leftIcon) && 'pl-10',
              (rightIcon || (isSearch && value)) && 'pr-10',
              error && 'border-brand-error focus:border-brand-error focus:ring-brand-error',
              className
            )}
            {...props}
          />

          {isSearch && value && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 text-brand-text-secondary hover:text-brand-text p-1 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {rightIcon && !isSearch && (
            <div className="absolute right-3 text-brand-text-secondary pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-brand-error font-medium">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-brand-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

