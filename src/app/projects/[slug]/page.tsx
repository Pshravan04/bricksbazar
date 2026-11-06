'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getProjectBySlug, MOCK_PROJECTS } from '@/mocks';
import { formatINR, formatArea } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge, DemoBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { ProjectCard } from '@/components/common/ProjectCard';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import {
  MapPin,
  Building,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FileDown,
  Sparkles,
  Phone,
  Layers,
  ArrowRight,
  Share2,
  Check,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);
  const { success } = useToast();

  if (!project) {
    notFound();
  }

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  const handleDownloadBrochure = () => {
    success('Brochure Request Logged', 'A download link has been prepared in demo mode.');
  };

  const similarProjects = MOCK_PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-brand-bg pb-24">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'New Projects', href: '/new-projects' },
              { label: project.location.city, href: `/new-projects?city=${project.location.city}` },
              { label: project.name },
            ]}
          />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadBrochure}
              className="gap-1.5 text-xs font-bold"
            >
              <FileDown className="w-3.5 h-3.5 text-brand-red" />
              Download Brochure
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative rounded-xl overflow-hidden bg-brand-bg border border-brand-border shadow-card h-[360px] sm:h-[480px]">
          <Image
            src={project.coverImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80'}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {project.isVerified && <Badge variant="verified">Verified Project</Badge>}
            {project.isReraApproved && <Badge variant="rera">RERA Approved: {project.reraId}</Badge>}
          </div>

          {/* Bottom Title & Specs Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-brand-red-light mb-1">
                By {project.developer.name} &bull; {project.projectStatus}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {project.name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-white/80 mt-2">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>{project.location.address}, {project.location.locality}, {project.location.city}</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-left sm:text-right">
              <span className="text-xs text-white/70 block">Price Range</span>
              <span className="text-2xl sm:text-3xl font-black text-white block">
                {formatINR(project.startingPrice)} - {formatINR(project.maxPrice)}
              </span>
              <span className="text-xs text-white/80 block mt-0.5">
                Configurations: {project.configurations.join(', ')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-brand-text font-bold text-xs px-3.5 py-2 rounded-button shadow-dropdown hover:bg-white transition hidden sm:block"
          >
            View Project Gallery
          </button>
        </div>
      </div>

      {/* Main Content & Sticky Inquiry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Metrics Grid */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card">
              <h3 className="text-base font-bold text-brand-text border-b border-brand-border pb-3 mb-4">
                Project Snapshot & Timeline
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Possession Date</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{project.possessionDate}</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Project Land Area</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{project.projectAreaAcres} Acres</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">Total Towers</span>
                  <span className="text-sm font-bold text-brand-text mt-0.5 block">{project.totalTowers || 2} High-Rise Towers</span>
                </div>
                <div className="p-3 bg-brand-bg rounded-lg border border-brand-border">
                  <span className="text-[10px] text-brand-text-secondary uppercase font-semibold block">RERA Status</span>
                  <span className="text-sm font-bold text-brand-success mt-0.5 block">Approved</span>
                </div>
              </div>
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-brand-text border-b border-brand-border pb-3">
                About {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                {project.overview}
              </p>

              <div className="pt-3">
                <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider mb-2">
                  Key Architectural Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-brand-text">
                      <CheckCircle2 className="w-4 h-4 text-brand-success flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Curated Amenities */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-brand-text border-b border-brand-border pb-3">
                Master Clubhouse & Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.amenities.map((a, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-brand-bg rounded-lg border border-brand-border flex items-center gap-2.5 text-xs font-semibold text-brand-text"
                  >
                    <Sparkles className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Credibility */}
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <h3 className="text-base font-bold text-brand-text">Developer Background</h3>
                <Link href={`/developers/${project.developer.id}`} className="text-xs font-bold text-brand-red hover:underline">
                  View Developer Profile &rarr;
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-brand-bg border border-brand-border flex items-center justify-center font-bold text-brand-red text-xl">
                  {project.developer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-brand-text">{project.developer.name}</h4>
                  <p className="text-xs text-brand-text-secondary mt-0.5">
                    {project.developer.experienceYears} Years of Legacy in Real Estate Development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Project Advisory Desk */}
          <div className="space-y-6">
            <div className="bg-white rounded-card border border-brand-border p-6 shadow-card sticky top-24 space-y-6">
              <div className="space-y-1 pb-4 border-b border-brand-border">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider block">
                  Official Developer Desk
                </span>
                <h3 className="text-lg font-bold text-brand-text">
                  Direct Project Consultation
                </h3>
                <p className="text-xs text-brand-text-secondary">
                  Connect with the official sales advisory team for pricing sheets and exclusive floor plans.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs font-bold gap-1.5"
                onClick={() => setSiteVisitOpen(true)}
              >
                <Calendar className="w-4 h-4 text-brand-red" />
                Book VIP Site Visit
              </Button>

              <EnquiryForm
                propertyOrItemTitle={project.name}
                recipientName={`${project.developer.name} Sales Advisory`}
                recipientRole="Official Developer Representative"
              />
            </div>
          </div>
        </div>

        {/* Similar Projects */}
        {similarProjects.length > 0 && (
          <div className="pt-16 mt-16 border-t border-brand-border">
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-text mb-6">
              More Projects in {project.location.city}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <ImageGallery
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={project.images}
        title={project.name}
      />

      {/* Site Visit Modal */}
      <Modal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        title="Schedule VIP Project Site Visit"
        description={project.name}
      >
        <EnquiryForm
          propertyOrItemTitle={`Project VIP Site Visit: ${project.name}`}
          recipientName={`${project.developer.name} Sales Desk`}
          recipientRole="Direct Developer Advisory"
          onSuccess={() => setSiteVisitOpen(false)}
        />
      </Modal>
    </div>
  );
}

