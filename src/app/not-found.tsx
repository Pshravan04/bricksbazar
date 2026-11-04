'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-brand-bg">
      <div className="max-w-md w-full bg-white p-8 rounded-card border border-brand-border text-center shadow-card">
        <div className="w-16 h-16 bg-brand-red-light rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-brand-red">404</span>
        </div>
        <h1 className="text-2xl font-bold text-brand-text mb-2">Page Not Found</h1>
        <p className="text-brand-text-secondary text-sm mb-6">
          The property, project or marketplace page you are looking for may have been moved or is currently unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-button bg-brand-red text-white text-sm font-semibold hover:bg-brand-red-hover transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-button bg-white border border-brand-border text-brand-text text-sm font-semibold hover:bg-brand-bg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}

