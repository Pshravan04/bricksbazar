import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | BricksBazar',
  description:
    'Terms of Service and Platform Usage Agreement governing transactions, listings, and co-broking on BricksBazar in accordance with Indian real estate law.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      <div className="bg-white border-b border-[#EAEAEA] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-4">
            <Link href="/" className="hover:text-[#252525]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252525] font-semibold">Terms & Conditions</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#252525] tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-[#777777] mt-2">
            Last Updated: March 1, 2026 • Governing Law: Jurisdiction of Courts at Mumbai, India
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or registering an account on BricksBazar (&ldquo;Portal&rdquo;), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all provisions, you must refrain from using our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">2. RERA Mandate & Listing Authenticity</h2>
            <p>
              All real estate agents, brokers, and developers posting listings on BricksBazar must hold an active and valid registration with the relevant State Real Estate Regulatory Authority (e.g., MahaRERA, Karnataka RERA, UP RERA).
            </p>
            <p>
              Any attempt to post misleading carpet area measurements, unapproved building plans, or fabricated ownership titles will result in permanent listing revocation and blacklisting from the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">3. Intermediary Status & No Warranty</h2>
            <p>
              BricksBazar operates as an electronic marketplace and intermediary as defined under Section 79 of the Information Technology Act, 2000. While we deploy strict moderation and RERA checks, users are advised to conduct independent legal due diligence, title search reports, and physical inspections prior to monetary transactions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">4. Co-Broking & Commission Rules</h2>
            <p>
              Brokers participating in the BricksBazar Lead Exchange agree to honor the standardized 50:50 clean split on brokerage earned through peer co-broking, unless mutually modified in writing prior to client inspection registration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">5. Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any legal disputes arising out of the use of this portal shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

