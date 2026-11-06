'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Store, MapPin, Phone, ShieldCheck, PlusCircle, ArrowRight } from 'lucide-react';

export default function SuppliersDirectoryPage() {
  // Extract unique suppliers from products
  const suppliersMap = new Map();
  MOCK_MARKETPLACE_PRODUCTS.forEach((p) => {
    if (!suppliersMap.has(p.supplier.id)) {
      suppliersMap.set(p.supplier.id, {
        ...p.supplier,
        categories: [p.category],
      });
    } else {
      const existing = suppliersMap.get(p.supplier.id);
      if (!existing.categories.includes(p.category)) {
        existing.categories.push(p.category);
      }
    }
  });

  const suppliers = Array.from(suppliersMap.values());

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-3">
          <Breadcrumb items={[{ label: 'Building Material Suppliers' }]} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-1">
                Verified Construction Material Suppliers
              </h1>
              <p className="text-xs sm:text-sm text-brand-text-secondary">
                Authorized regional stockists, steel distributors, and cement dealerships across India.
              </p>
            </div>

            <Link href="/register?role=supplier">
              <Button size="sm" className="gap-2 font-bold whitespace-nowrap">
                <PlusCircle className="w-4 h-4" />
                Register as Supplier
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((sup: any) => (
            <div
              key={sup.id}
              className="bg-white rounded-card border border-brand-border p-6 hover:shadow-card transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg bg-brand-bg border border-brand-border text-brand-red flex items-center justify-center font-bold text-lg">
                    {sup.businessName.charAt(0)}
                  </div>
                  {sup.isVerified && <Badge variant="verified" size="sm">Verified Dealer</Badge>}
                </div>

                <h3 className="font-bold text-base text-brand-text group-hover:text-brand-red transition mb-1">
                  {sup.businessName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mb-4">
                  <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>{sup.location}</span>
                </div>

                <div className="space-y-1 pt-3 border-t border-brand-border text-xs">
                  <span className="text-brand-text-secondary block font-semibold">Authorized Categories:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {sup.categories.map((c: string) => (
                      <span key={c} className="px-2 py-0.5 bg-brand-bg rounded text-[11px] font-medium text-brand-text">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-text">{sup.phone}</span>
                <Link href={`/suppliers/${sup.id}`}>
                  <Button size="sm" variant="outline">
                    View Catalog
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

