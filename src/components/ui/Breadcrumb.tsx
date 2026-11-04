import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-brand-text-secondary', className)}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="hover:text-brand-red transition inline-flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-brand-text-muted flex-shrink-0" />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="inline-flex items-center">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-brand-red transition">
                  {item.label}
                </Link>
              ) : (
                <span className={cn('font-semibold', isLast ? 'text-brand-text truncate max-w-[200px] sm:max-w-xs' : '')}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 mx-1 text-brand-text-muted flex-shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

