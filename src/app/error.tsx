'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-brand-bg">
      <div className="max-w-md w-full bg-white p-8 rounded-card border border-brand-border text-center shadow-card">
        <div className="w-14 h-14 bg-brand-red-light rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 text-brand-red" />
        </div>
        <h2 className="text-xl font-bold text-brand-text mb-2">Something went wrong</h2>
        <p className="text-brand-text-secondary text-sm mb-6">
          We encountered an unexpected error while loading this section. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-button bg-brand-red text-white text-sm font-semibold hover:bg-brand-red-hover transition shadow-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}

