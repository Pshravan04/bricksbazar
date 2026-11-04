import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center justify-center gap-1.5 select-none', className)}>
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-button border border-brand-border bg-white text-brand-text hover:bg-brand-bg disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={cn(
              'w-9 h-9 rounded-button text-xs font-bold transition flex items-center justify-center border',
              isActive
                ? 'bg-brand-red text-white border-brand-red shadow-sm'
                : 'bg-white text-brand-text border-brand-border hover:bg-brand-bg hover:border-brand-text-secondary'
            )}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-button border border-brand-border bg-white text-brand-text hover:bg-brand-bg disabled:opacity-40 disabled:cursor-not-allowed transition"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

