'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { ProductCard } from '@/components/common/ProductCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Store, MapPin, Phone, ShieldCheck, Mail } from 'lucide-react';

export default function SupplierProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const supplierProduct = MOCK_MARKETPLACE_PRODUCTS.find((p) => p.supplier.id === slug);
  if (!supplierProduct) {
    notFound();
  }

  const supplier = supplierProduct.supplier;
  const supplierProducts = MOCK_MARKETPLACE_PRODUCTS.filter((p) => p.supplier.id === slug);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Header */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Suppliers', href: '/suppliers' },
              { label: supplier.businessName },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Supplier Info & Catalog */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-brand-bg border border-brand-border text-brand-red font-black text-2xl flex items-center justify-center">
                  {supplier.businessName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="verified">Authorized Distributor</Badge>
                    <DemoBadge />
                  </div>
                  <h1 className="text-2xl font-extrabold text-brand-text">
                    {supplier.businessName}
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span>{supplier.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-text-secondary leading-relaxed">
                Wholesale stockist providing high-grade construction cement, structural steel rebars, and luxury interior finishing materials. Serving contractors, builders, and developers with on-site transit logistics.
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-brand-text">
                Available Product Catalog ({supplierProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {supplierProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quotation Desk */}
          <div className="space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              <div className="space-y-1 pb-4 border-b border-brand-border">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">
                  Procurement Desk
                </span>
                <h3 className="text-lg font-bold text-brand-text">
                  Request Bulk Quotation
                </h3>
                <p className="text-xs text-brand-text-secondary">
                  Specify rebar metric tonnage or cement bag requirements for delivery timelines.
                </p>
              </div>

              <EnquiryForm
                propertyOrItemTitle={`Material Consignment Enquiry with ${supplier.businessName}`}
                recipientName={supplier.businessName}
                recipientRole="Authorized Building Supplier"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

