'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (item: Omit<ToastItem, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = useCallback((title: string, message?: string) => toast({ type: 'success', title, message }), [toast]);
  const error = useCallback((title: string, message?: string) => toast({ type: 'error', title, message }), [toast]);
  const info = useCallback((title: string, message?: string) => toast({ type: 'info', title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3 p-4 rounded-card border shadow-dropdown animate-slide-up bg-white',
                t.type === 'success' && 'border-brand-success/30 text-brand-text',
                t.type === 'error' && 'border-brand-error/30 text-brand-text',
                t.type === 'info' && 'border-blue-200 text-brand-text',
                t.type === 'warning' && 'border-brand-warning/30 text-brand-text'
              )}
            >
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-brand-success flex-shrink-0" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 text-brand-error flex-shrink-0" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />}
              {t.type === 'warning' && <AlertCircle className="w-5 h-5 text-brand-warning flex-shrink-0" />}

              <div className="flex-1 space-y-0.5">
                <div className="text-xs font-bold text-brand-text">{t.title}</div>
                {t.message && <div className="text-xs text-brand-text-secondary">{t.message}</div>}
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-brand-text-muted hover:text-brand-text p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Graceful fallback for non-provider renders
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
    };
  }
  return ctx;
}

