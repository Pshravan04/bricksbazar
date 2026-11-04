import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  count?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className={cn('flex flex-wrap gap-2 p-1 bg-brand-bg rounded-lg border border-brand-border', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-button text-xs font-bold transition-all',
                isActive
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'text-brand-text-secondary hover:text-brand-text hover:bg-white/60'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-brand-border text-brand-text-secondary'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-6 border-b border-brand-border overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-all relative whitespace-nowrap',
              isActive
                ? 'text-brand-red'
                : 'text-brand-text-secondary hover:text-brand-text'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-[11px] px-1.5 py-0.5 rounded-full font-bold',
                  isActive
                    ? 'bg-brand-red-light text-brand-red'
                    : 'bg-brand-bg text-brand-text-secondary'
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

