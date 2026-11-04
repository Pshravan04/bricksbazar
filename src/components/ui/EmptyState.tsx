import React from 'react';
import { cn } from '@/lib/utils';
import { Inbox, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'w-full py-16 px-6 bg-white rounded-card border border-brand-border text-center flex flex-col items-center justify-center shadow-card',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-secondary mb-4">
        {icon || <Inbox className="w-7 h-7 text-brand-text-muted" />}
      </div>
      <h3 className="text-base font-bold text-brand-text mb-1">{title}</h3>
      <p className="text-xs text-brand-text-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'Failed to load this content. Please try again.',
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-full py-12 px-6 bg-brand-red-light/40 rounded-card border border-brand-red/20 text-center flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-brand-red-light flex items-center justify-center text-brand-red mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-brand-text mb-1">{title}</h3>
      <p className="text-xs text-brand-text-secondary max-w-xs mb-4">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function LoadingState({
  message = 'Loading...',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-full py-16 flex flex-col items-center justify-center text-center',
        className
      )}
    >
      <Loader2 className="w-8 h-8 text-brand-red animate-spin mb-3" />
      <span className="text-xs font-semibold text-brand-text-secondary tracking-wide uppercase">
        {message}
      </span>
    </div>
  );
}

