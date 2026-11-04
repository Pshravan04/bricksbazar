import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | BricksBazar',
  description:
    'BricksBazar Privacy Policy formulated under the Digital Personal Data Protection Act 2023 (DPDP Act) and the Information Technology Act 2000 of India.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      <div className="bg-white border-b border-[#EAEAEA] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-4">
            <Link href="/" className="hover:text-[#252525]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#252525] font-semibold">Privacy Policy</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#252525] tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-[#777777] mt-2">
            Last Updated: March 1, 2026 • Effective Date: March 1, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">1. Introduction & Statutory Compliance</h2>
            <p>
              BricksBazar (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal data and respecting your privacy rights under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong>, and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong> of India.
            </p>
            <p>
              This Privacy Policy applies to all visitors, buyers, tenants, property owners, real estate agents, brokers, builders, developers, and material suppliers who use our website, APIs, and associated mobile applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">2. Personal Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Identity Data:</strong> Full name, verified mobile phone number, email address, password hash.</li>
              <li><strong>Regulatory Credentials:</strong> State RERA registration numbers, MahaRERA certificates, GSTIN numbers, and broker association accreditations.</li>
              <li><strong>Property & Asset Data:</strong> Property ownership deeds, title documents, geographical coordinates, municipal ward details, and floor measurements.</li>
              <li><strong>Transaction & Telemetry Data:</strong> IP addresses, browser user-agents, device fingerprints, enquiry timestamps, and site visit logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">3. Purpose of Data Processing</h2>
            <p>
              We process personal data solely for legitimate, statutory, and contractual purposes including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Facilitating verified property inquiries between buyers and licensed brokers.</li>
              <li>Authenticating lister identities through 6-digit Indian mobile OTP mechanisms.</li>
              <li>Verifying developer track records against public RERA compliance registries.</li>
              <li>Maintaining immutable platform security and anti-fraud audit logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">4. Data Sharing & Third-Party Disclosure</h2>
            <p>
              We do not sell, rent, or trade your personal information to third-party marketing brokers. Data is shared strictly with verified real estate consultants or building material suppliers when you explicitly submit an enquiry or request a site visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">5. Grievance Officer</h2>
            <p>
              In accordance with Rule 5(9) of the IT Rules, 2011, the details of the designated Grievance Officer are provided below:
            </p>
            <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] text-xs space-y-1 font-mono">
              <p><strong>Name:</strong> Rajeshwar Rao</p>
              <p><strong>Designation:</strong> Data Protection & Grievance Officer, BricksBazar</p>
              <p><strong>Address:</strong> Level 14, One BKC, G-Block, Bandra Kurla Complex, Mumbai 400051</p>
              <p><strong>Email:</strong> grievance@bricksbazar.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

