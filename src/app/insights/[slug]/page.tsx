'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  Twitter,
  Linkedin,
  Copy,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { MOCK_ARTICLES } from '@/mocks/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const { success, info } = useToast();
  const [copied, setCopied] = useState(false);

  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = MOCK_ARTICLES.filter((a) =>
    article.relatedSlugs.includes(a.slug)
  );

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      success('Link Copied', 'Article link copied to clipboard.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    info(`Share on ${platform}`, `Initiating share dialogue for "${article.title.substring(0, 30)}..."`);
  };

  return (
    <article className="min-h-screen bg-[#F8F8F8] pb-20">
      {/* Article Header & Cover */}
      <header className="bg-white border-b border-[#EAEAEA] pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-6">
            <Link href="/" className="hover:text-[#252525]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/insights" className="hover:text-[#252525]">
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252525] font-semibold">{article.category}</span>
          </div>

          <span className="inline-block px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#777777] mt-4 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-[#EAEAEA]">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-[#252525]">{article.author.name}</p>
                <div className="flex items-center gap-2 text-xs text-[#777777]">
                  <span>{article.author.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Share Shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl border border-[#EAEAEA] text-[#777777] hover:text-[#252525] hover:bg-gray-50 transition-colors"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('LinkedIn')}
                className="p-2 rounded-xl border border-[#EAEAEA] text-[#777777] hover:text-[#0A66C2] hover:bg-gray-50 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('Twitter / X')}
                className="p-2 rounded-xl border border-[#EAEAEA] text-[#777777] hover:text-black hover:bg-gray-50 transition-colors"
                title="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare('WhatsApp')}
                className="p-2 rounded-xl border border-[#EAEAEA] text-[#777777] hover:text-green-600 hover:bg-gray-50 transition-colors"
                title="Share on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="rounded-2xl overflow-hidden shadow-md border border-[#EAEAEA]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full max-h-[460px] object-cover"
          />
        </div>
      </div>

      {/* Article Content & Table of Contents Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {article.content.map((sec) => (
              <section key={sec.sectionId} id={sec.sectionId} className="space-y-4 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#252525] tracking-tight">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <div className="p-4 bg-[#FCEEEF]/60 rounded-xl border-l-4 border-[#C6383B] my-4 text-xs sm:text-sm text-[#252525] font-medium leading-relaxed">
                    {sec.callout}
                  </div>
                )}
              </section>
            ))}

            {/* Author Signoff Box */}
            <div className="p-6 bg-white rounded-2xl border border-[#EAEAEA] mt-12 flex items-start gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-full object-cover shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#C6383B] uppercase tracking-wider">
                  Written by
                </span>
                <h3 className="text-base font-bold text-[#252525]">{article.author.name}</h3>
                <p className="text-xs text-[#777777]">{article.author.role}</p>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Specializing in real estate valuation models, State RERA compliance frameworks, and infrastructure
                  urbanism across Indian Tier-1 metropolitan markets.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Table of Contents (4 cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-5 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-4">
              <span className="text-xs font-bold text-[#252525] uppercase tracking-wider block">
                Table of Contents
              </span>
              <nav className="space-y-2">
                {article.tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs text-[#777777] hover:text-[#C6383B] hover:translate-x-1 transition-all py-1"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#EAEAEA]">
                <span className="text-xs font-bold text-[#252525] block mb-2">Looking for a property?</span>
                <p className="text-[11px] text-[#777777] mb-3 leading-relaxed">
                  Explore verified, RERA-compliant properties in Mumbai and Pune.
                </p>
                <Link href="/buy">
                  <Button variant="primary" size="sm" className="w-full text-xs">
                    Browse Verified Homes
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Publications */}
      {relatedArticles.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#252525]">Related Intelligence Reports</h3>
            <Link href="/insights" className="text-xs text-[#C6383B] font-semibold hover:underline">
              View All Articles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link key={rel.slug} href={`/insights/${rel.slug}`}>
                <div className="bg-white p-4 rounded-xl border border-[#EAEAEA] shadow-xs hover:border-[#C6383B]/40 transition-all flex items-center gap-3 group">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#C6383B] uppercase">{rel.category}</span>
                    <h4 className="text-xs font-bold text-[#252525] group-hover:text-[#C6383B] transition-colors line-clamp-2 mt-0.5">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-[#777777] mt-1 block">{rel.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

