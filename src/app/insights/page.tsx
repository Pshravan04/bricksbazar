'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Hammer,
  Home,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_ARTICLES, Article } from '@/mocks/articles';

const CATEGORIES = ['All', 'Market Trends', 'RERA & Legal', 'Home Buying', 'Construction'];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = MOCK_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Editorial Hero Banner */}
      <section className="bg-white border-b border-[#EAEAEA] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#C6383B] uppercase tracking-wider block mb-2">
              BricksBazar Intelligence & Research
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Real Estate Insights, Legal Analysis & Construction Handbooks
            </h1>
            <p className="text-sm sm:text-base text-[#777777] mt-3 leading-relaxed">
              Actionable market intelligence, RERA legal compliance guides, and construction material handbooks curated
              by senior property economists and structural engineers.
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-[#EAEAEA] pt-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#C6383B] text-white shadow-xs'
                      : 'bg-gray-100 text-[#777777] hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#EAEAEA] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Headline Article */}
      {selectedCategory === 'All' && !searchQuery && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link href={`/insights/${featuredArticle.slug}`}>
            <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 group cursor-pointer">
              <div className="lg:col-span-7 relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#C6383B] text-white text-xs font-bold rounded shadow-xs uppercase tracking-wider">
                  Featured Report
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#777777] mb-2">
                    <span className="font-semibold text-[#C6383B]">{featuredArticle.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#252525] group-hover:text-[#C6383B] transition-colors leading-snug">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#EAEAEA] flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#252525]">{featuredArticle.author.name}</p>
                      <p className="text-[10px] text-[#777777]">{featuredArticle.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#C6383B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#252525]">
            {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs text-[#777777]">{filteredArticles.length} Articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`}>
              <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden shadow-xs hover:border-[#C6383B]/40 hover:shadow-md transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold rounded">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[#777777] mb-2">
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#252525] group-hover:text-[#C6383B] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#777777] mt-2 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#EAEAEA]/60 mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-semibold text-[#252525] truncate max-w-[120px]">
                      {article.author.name}
                    </span>
                  </div>
                  <span className="text-[#C6383B] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

