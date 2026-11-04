'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, children, align = 'left', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className={cn(
            'absolute mt-2 min-w-[200px] rounded-card bg-white p-1.5 shadow-dropdown border border-brand-border z-50 animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  className,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2 rounded-button text-sm font-medium cursor-pointer transition select-none',
        danger
          ? 'text-brand-error hover:bg-brand-red-light'
          : 'text-brand-text hover:bg-brand-bg hover:text-brand-red',
        className
      )}
    >
      {children}
    </div>
  );
}

