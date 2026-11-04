import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-red text-white hover:bg-brand-red-hover focus-visible:ring-brand-red shadow-sm',
      secondary:
        'bg-white text-brand-text border border-brand-border hover:bg-brand-bg focus-visible:ring-brand-text',
      outline:
        'bg-transparent text-brand-red border border-brand-red hover:bg-brand-red-light focus-visible:ring-brand-red',
      ghost:
        'bg-transparent text-brand-text hover:bg-brand-bg focus-visible:ring-brand-text',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-button gap-1.5 h-8',
      md: 'text-sm px-4 py-2.5 rounded-button gap-2 h-10',
      lg: 'text-base px-6 py-3 rounded-button gap-2.5 h-12',
      icon: 'p-2 rounded-button w-10 h-10',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

