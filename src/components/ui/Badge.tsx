import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Star, ShieldCheck, AlertCircle } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'verified' | 'featured' | 'rera' | 'demo' | 'warning' | 'outline';
  size?: 'sm' | 'md';
  icon?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  icon = true,
  children,
  ...props
}: BadgeProps) {
  const base =
    'inline-flex items-center gap-1 font-semibold tracking-wide uppercase rounded-badge transition select-none';

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  };

  const variants = {
    default: 'bg-brand-bg text-brand-text border border-brand-border',
    verified: 'bg-brand-success-light text-brand-success border border-brand-success/20',
    featured: 'bg-brand-red-light text-brand-red border border-brand-red/20',
    rera: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    demo: 'bg-amber-50 text-amber-800 border border-amber-300 font-mono tracking-normal',
    warning: 'bg-brand-warning-light text-brand-warning border border-brand-warning/20',
    outline: 'bg-transparent text-brand-text-secondary border border-brand-border',
  };

  return (
    <span className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {icon && variant === 'verified' && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
      {icon && variant === 'featured' && <Star className="w-3 h-3 fill-current" />}
      {icon && variant === 'rera' && <ShieldCheck className="w-3.5 h-3.5" />}
      {icon && variant === 'demo' && <AlertCircle className="w-3 h-3" />}
      {children}
    </span>
  );
}

/**
 * Clearly labeled badge for simulated demo records (disabled/hidden per user request)
 */
export function DemoBadge({ className }: { className?: string }) {
  return null;
}

