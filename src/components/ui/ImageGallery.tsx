'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface ImageGalleryProps {
  images: string[];
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageGallery({
  images,
  title,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const nextImage = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, nextImage, prevImage, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10 z-10">
        <div>
          {title && <h4 className="text-sm font-bold text-white truncate max-w-md">{title}</h4>}
          <span className="text-xs text-white/60">
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="Close Gallery"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-4 min-h-[50vh]">
        <button
          type="button"
          onClick={prevImage}
          className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w-5xl h-[65vh] rounded-xl overflow-hidden">
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        <button
          type="button"
          onClick={nextImage}
          className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div className="p-4 bg-black/40 border-t border-white/10 flex justify-center items-center gap-2 overflow-x-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              'relative w-16 h-12 rounded-lg overflow-hidden border-2 transition flex-shrink-0',
              idx === currentIndex
                ? 'border-brand-red opacity-100 scale-105'
                : 'border-transparent opacity-50 hover:opacity-80'
            )}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
