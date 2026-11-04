'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'bottom';
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: DrawerProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideStyles = {
    right: 'inset-y-0 right-0 w-full max-w-md h-full',
    left: 'inset-y-0 left-0 w-full max-w-md h-full',
    bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed bg-white shadow-dropdown flex flex-col z-10 transition-transform duration-300 ease-in-out',
          sideStyles[side],
          className
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <h3 className="text-base font-bold text-brand-text">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-brand-text-secondary hover:text-brand-text hover:bg-brand-bg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

