'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_MARKETPLACE_PRODUCTS } from '@/mocks';
import { MARKETPLACE_CATEGORIES } from '@/constants';
import { MarketplaceProduct } from '@/types';
import { ProductCard } from '@/components/common/ProductCard';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  Store,
  Search,
  ShieldCheck,
  Truck,
  FileText,
  Building,
  CheckCircle2,
  Box,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function MarketplaceHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  const handleRequestQuote = (prod: MarketplaceProduct) => {
    setSelectedProduct(prod);
    setQuoteModalOpen(true);
  };

  const filteredProducts = MOCK_MARKETPLACE_PRODUCTS.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* 1. Marketplace Hero */}
      <div className="bg-brand-text text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                <Store className="w-3.5 h-3.5 text-brand-red" />
                <span>Integrated Construction Materials Bazaar</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Direct Wholesale Materials & Building Supplies
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Source certified cement, high-ductility TMT steel, vitrified tiles, and premium paints directly from verified manufacturers and authorized dealers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center sm:text-right max-w-xs w-full">
              <span className="text-xs text-white/70 block">Commercial B2B Procurements</span>
              <span className="text-2xl font-black text-white block mt-1">₹ Wholesale Rates</span>
              <p className="text-[11px] text-white/80 mt-1">
                Zero commissions. Request price quotations directly from certified regional distributors.
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="mt-8 max-w-xl">
            <Input
              isSearch
              placeholder="Search cement, TMT steel, Kajaria tiles, Asian paints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              className="bg-white text-brand-text py-3"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* 2. Category Navigation Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text">
                Browse by Material Category
              </h2>
              <p className="text-xs text-brand-text-secondary mt-0.5">
                IS-standard certified construction supplies for residential and commercial works
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {MARKETPLACE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/marketplace/category/${cat.slug}`}
                className="bg-white rounded-xl border border-brand-border p-4 hover:border-brand-red hover:shadow-card transition text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-bg text-brand-red flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-red group-hover:text-white transition">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-brand-text group-hover:text-brand-red transition">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Popular Brands */}
        <div className="bg-white rounded-xl border border-brand-border p-6 shadow-card">
          <h3 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-4">
            Certified Manufacturer Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
            {['UltraTech Cement', 'Tata Tiscon Rebars', 'Kajaria Ceramics', 'Asian Paints', 'Astral Pipes', 'Schneider Electric'].map((brand) => (
              <div key={brand} className="p-3 bg-brand-bg rounded-lg border border-brand-border text-xs font-bold text-brand-text truncate">
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Featured Products Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text">
                Featured Materials & Rebars
              </h2>
              <DemoBadge />
            </div>
            <Link href="/suppliers" className="text-xs font-bold text-brand-red hover:underline">
              View Verified Suppliers &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onRequestQuote={handleRequestQuote}
              />
            ))}
          </div>
        </div>

        {/* 5. Verified Suppliers Spotlight */}
        <div className="bg-gradient-to-r from-brand-bg to-brand-red-light/30 border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <span className="px-3 py-1 bg-white border border-brand-border text-xs font-bold text-brand-red rounded-full inline-block">
              For Construction Material Dealers
            </span>
            <h3 className="text-2xl font-extrabold text-brand-text">
              List Your Building Material Supplies on BricksBazar
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
              Connect with over 45,000 active builders, contractors, and civil engineers looking for bulk cement, steel, tiles, and fittings.
            </p>
          </div>

          <Link href="/register?role=supplier">
            <Button size="lg" className="font-bold whitespace-nowrap">
              Register as Supplier
            </Button>
          </Link>
        </div>
      </div>

      {/* Direct Quotation Request Modal */}
      {selectedProduct && (
        <Modal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          title={`Request Wholesale Quotation`}
          description={`${selectedProduct.name} &bull; ${selectedProduct.supplier.businessName}`}
        >
          <EnquiryForm
            propertyOrItemTitle={`Quotation Request: ${selectedProduct.name}`}
            recipientName={selectedProduct.supplier.businessName}
            recipientRole="Authorized Building Material Supplier"
            onSuccess={() => setQuoteModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

