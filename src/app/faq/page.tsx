'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, Search, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Homebuyers & Tenants' | 'Owners & Sellers' | 'Agents & Brokers' | 'Materials';
}

const FAQS: FAQItem[] = [
  {
    category: 'Homebuyers & Tenants',
    question: 'How does BricksBazar verify property listings?',
    answer:
      'Every listing submitted by a real estate broker or builder must include an active State RERA registration number. Our compliance desk cross-checks titles, sanctioned building layouts, and carpet area definitions against government portal registries before public release.',
  },
  {
    category: 'Homebuyers & Tenants',
    question: 'Are there any hidden fees or charges for browsing and contacting agents?',
    answer:
      'No. Exploring properties, reading intelligence reports, and sending site visit requests on BricksBazar is 100% free for all homebuyers and tenants.',
  },
  {
    category: 'Owners & Sellers',
    question: 'How do I post my property for sale or rent?',
    answer:
      'Click on "Post Property" in the top navigation bar. Follow our guided 14-step wizard to enter your property specifications, photos, and contact hours. Once submitted, our team reviews it within 2 hours.',
  },
  {
    category: 'Agents & Brokers',
    question: 'What is the BricksBazar Lead Exchange and how does co-broking work?',
    answer:
      'The Lead Exchange is a private B2B marketplace where verified agents post unfulfilled buyer requirements. Peer brokers with matching inventory can connect directly to co-broke the deal with standardized 50:50 commission splits.',
  },
  {
    category: 'Agents & Brokers',
    question: 'Is RERA registration mandatory for real estate agents on BricksBazar?',
    answer:
      'Yes. In compliance with the Real Estate (Regulation and Development) Act, all real estate consultants and agencies operating on BricksBazar must hold a valid State RERA license (e.g. MahaRERA).',
  },
  {
    category: 'Materials',
    question: 'How do construction material quotation requests work?',
    answer:
      'Builders, contractors, and individual home builders can browse our Construction Materials Marketplace and submit Request for Quotations (RFQs) for TMT rebar, cement, aggregates, and tiles directly to verified manufacturers and authorized regional dealers.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Homebuyers & Tenants', 'Owners & Sellers', 'Agents & Brokers', 'Materials'];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = selectedCat === 'All' || f.category === selectedCat;
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      <section className="bg-white border-b border-[#EAEAEA] py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#777777] mt-3 max-w-xl mx-auto">
            Find answers to common questions about buying, renting, agent verification, co-broking, and building materials.
          </p>

          <div className="max-w-md mx-auto mt-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#EAEAEA] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
            />
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCat === c
                  ? 'bg-[#C6383B] text-white shadow-xs'
                  : 'bg-white border border-[#EAEAEA] text-[#777777] hover:bg-gray-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EAEAEA] shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#252525] hover:text-[#C6383B] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#777777] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C6383B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                    <p className="pt-2">{faq.answer}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] bg-gray-100 text-[#777777] font-semibold">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

