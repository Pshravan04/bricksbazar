'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { Button } from '@/components/ui/Button';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Store, PlusCircle, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function SupplierDashboardPage() {
  const supplierProducts = MOCK_MARKETPLACE_PRODUCTS.slice(0, 2);

  return (
    <DashboardShell
      currentRole="supplier"
      pageTitle="Material Supplier & Dealer Portal"
      pageDescription="Manage building product inventory, review wholesale quotation requests, and update stocks."
      actionButton={
        <Link href="/marketplace">
          <Button size="sm" className="font-bold gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Add Material Consignment
          </Button>
        </Link>
      }
    >
      <div className="space-y-8">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Active Products in Bazaar</span>
              <Store className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">14</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">Cement, Steel & TMT Rebars</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Quotation Requests</span>
              <FileText className="w-4 h-4 text-brand-red" />
            </div>
            <div className="text-2xl font-black text-brand-text">8</div>
            <span className="text-[11px] text-brand-success font-semibold mt-0.5 block">3 Contractors waiting for rates</span>
          </div>

          <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
            <div className="flex items-center justify-between text-brand-text-secondary mb-2">
              <span className="text-xs font-semibold">Dealer Verification</span>
              <CheckCircle2 className="w-4 h-4 text-brand-success" />
            </div>
            <div className="text-sm font-bold text-brand-text">Authorized Stockist</div>
            <span className="text-[11px] text-brand-text-secondary mt-0.5 block">GSTIN & ISO Certified</span>
          </div>
        </div>

        {/* Product Inventory Table */}
        <div id="inventory" className="bg-white rounded-xl border border-brand-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-extrabold text-base text-brand-text">
              Active Stock & Catalog
            </h3>
            <DemoBadge />
          </div>

          <div className="divide-y divide-brand-border">
            {supplierProducts.map((prod) => (
              <div key={prod.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-brand-text">{prod.name}</span>
                    <Badge variant="verified" size="sm">In Stock</Badge>
                  </div>
                  <div className="text-xs text-brand-text-secondary">
                    {prod.brand} &bull; Min. Order: {prod.minOrderQuantity}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-sm text-brand-text">
                    ₹ {prod.price?.toLocaleString('en-IN')} {prod.priceUnit}
                  </span>
                  <Link href={`/marketplace/product/${prod.slug}`}>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      View
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

