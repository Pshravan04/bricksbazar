'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Default redirect to agent dashboard for rich evaluation
    router.replace('/dashboard/agent');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="w-10 h-10 border-4 border-brand-red-light border-t-brand-red rounded-full animate-spin" />
    </div>
  );
}

