import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-brand-border/70', className)}
      {...props}
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-card border border-brand-border overflow-hidden shadow-card">
      <Skeleton className="w-full h-52 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-16 h-4" />
        </div>
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-3/4 h-4" />
        <div className="pt-2 border-t border-brand-border flex justify-between items-center">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-8 rounded-button" />
        </div>
      </div>
    </div>
  );
}

