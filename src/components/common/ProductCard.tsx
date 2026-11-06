'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MarketplaceProduct } from '@/types';
import { formatINR } from '@/lib/utils';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Store, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ProductCardProps {
  product: MarketplaceProduct;
  onRequestQuote?: (product: MarketplaceProduct) => void;
  className?: string;
}

export function ProductCard({ product, onRequestQuote, className }: ProductCardProps) {
  return (
    <div className="bg-white rounded-card border border-brand-border overflow-hidden hover:shadow-card-hover transition-all duration-200 flex flex-col group h-full">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-brand-bg overflow-hidden flex-shrink-0">
        <Link href={`/marketplace/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <Badge variant="default" size="sm">{product.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <span className="text-[11px] font-bold text-brand-red uppercase tracking-wider block mb-1">
            {product.brand}
          </span>

          {/* Product Name */}
          <Link href={`/marketplace/product/${product.slug}`}>
            <h3 className="text-sm font-bold text-brand-text group-hover:text-brand-red transition line-clamp-2 mb-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="mb-3">
            {product.isPriceOnQuotation || !product.price ? (
              <span className="text-base font-bold text-brand-text">Price on Quotation</span>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold text-brand-text">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                {product.priceUnit && (
                  <span className="text-xs text-brand-text-secondary">{product.priceUnit}</span>
                )}
              </div>
            )}
            <span className="text-[11px] text-brand-text-secondary block">
              Min. Order: {product.minOrderQuantity}
            </span>
          </div>

          {/* Supplier Info */}
          <div className="flex items-center gap-1.5 text-xs text-brand-text-secondary pt-2 border-t border-brand-border mb-4">
            <Store className="w-3.5 h-3.5 text-brand-text-secondary flex-shrink-0" />
            <span className="truncate">{product.supplier.businessName}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            className="w-full"
            onClick={() => onRequestQuote && onRequestQuote(product)}
          >
            <FileText className="w-3.5 h-3.5 mr-1" />
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

