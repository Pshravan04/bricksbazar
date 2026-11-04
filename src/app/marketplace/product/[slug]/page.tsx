'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getMarketplaceProductBySlug, MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { ProductCard } from '@/components/common/ProductCard';
import { Modal } from '@/components/ui/Modal';
import {
  Store,
  MapPin,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Truck,
  Box,
  Layers,
  Phone,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getMarketplaceProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const relatedProducts = MOCK_MARKETPLACE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Marketplace', href: '/marketplace' },
              { label: product.category, href: `/marketplace/category/${product.categorySlug}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Product Image, Specs, Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mb-6">
                {/* Product Image */}
                <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-brand-bg border border-brand-border">
                  <Image
                    src={product.images[0] || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <Badge variant="default" size="sm">{product.category}</Badge>
                    {product.isDemoRecord && <DemoBadge />}
                  </div>
                </div>

                {/* Main Product Info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-brand-red uppercase tracking-wider block mb-1">
                      {product.brand}
                    </span>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-brand-text leading-snug">
                      {product.name}
                    </h1>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-brand-bg rounded-xl border border-brand-border">
                    <span className="text-xs text-brand-text-secondary block">Wholesale Rate</span>
                    {product.isPriceOnQuotation || !product.price ? (
                      <span className="text-2xl font-black text-brand-text">Price on Quotation</span>
                    ) : (
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-brand-text">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </span>
                        {product.priceUnit && (
                          <span className="text-xs text-brand-text-secondary font-semibold">
                            {product.priceUnit}
                          </span>
                        )}
                      </div>
                    )}
                    <span className="text-xs text-brand-text-secondary block mt-1">
                      Min. Order: <strong className="text-brand-text">{product.minOrderQuantity}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>In Stock & Ready for Direct Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="pt-6 border-t border-brand-border space-y-3">
                <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
                  Technical Specifications & Compliance
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                      <span className="text-brand-text-secondary block">{key}</span>
                      <span className="font-bold text-brand-text mt-0.5 block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-brand-border space-y-2">
                <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
                  Product Description
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Supplier Profile & Quotation Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              {/* Supplier Header */}
              <div className="space-y-2 pb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                    Authorized Supplier
                  </span>
                  {product.supplier.isVerified && <Badge variant="verified" size="sm">Verified</Badge>}
                </div>
                <h3 className="text-base font-bold text-brand-text">
                  {product.supplier.businessName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                  <span>{product.supplier.location}</span>
                </div>
              </div>

              {/* Request Quotation Form */}
              <EnquiryForm
                propertyOrItemTitle={`Material Quotation: ${product.name}`}
                recipientName={product.supplier.businessName}
                recipientRole="Building Material Supplier"
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 mt-16 border-t border-brand-border">
            <h3 className="text-xl font-extrabold text-brand-text mb-6">
              More in {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

