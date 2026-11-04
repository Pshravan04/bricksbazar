'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { MARKETPLACE_CATEGORIES } from '@/constants';
import { ProductCard } from '@/components/common/ProductCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function CategoryProductsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = MARKETPLACE_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = MOCK_MARKETPLACE_PRODUCTS.filter(
    (p) => p.categorySlug === slug || p.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0])
  );

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb
            items={[
              { label: 'Marketplace', href: '/marketplace' },
              { label: category.name },
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                  {category.name} Catalog
                </h1>
                <DemoBadge />
              </div>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                Certified building supplies and wholesale quotation channels.
              </p>
            </div>

            <Link href="/marketplace">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold">
                <ArrowLeft className="w-3.5 h-3.5" />
                All Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-brand-border p-12 text-center">
            <h3 className="font-bold text-base text-brand-text mb-1">More Supplies Arriving Soon</h3>
            <p className="text-xs text-brand-text-secondary mb-4">
              Authorized dealers are currently submitting fresh consignments for {category.name}.
            </p>
            <Link href="/marketplace">
              <Button size="sm">Browse Other Materials</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

