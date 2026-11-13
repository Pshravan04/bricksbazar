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
              BricksBazar Realty LLP (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered with the Maharashtra Real Estate Regulatory Authority under MahaRERA Agent Registration Number <strong>A51800029418</strong>, is committed to safeguarding personal data in accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong>, and applicable regulatory directives of India.
            </p>
            <p>
              This Privacy Policy applies to all users—including prospective buyers, property owners, licensed real estate agents, institutional brokers, developers, and corporate procurement partners—accessing <a href="https://bricksbazar.in" className="text-[#C6383B] underline">bricksbazar.in</a> and our associated APIs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">2. Personal Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Identity & Contact Data:</strong> Full legal name, 10-digit Indian mobile number, verified email address.</li>
              <li><strong>Regulatory Credentials:</strong> State RERA certificate numbers, GSTIN, broker agency affiliations, and firm partnership documentation.</li>
              <li><strong>Property & Asset Records:</strong> Unit carpet area measurements, floor level, ownership documentation copies, and geocoded coordinates.</li>
              <li><strong>Technical Telemetry:</strong> IP address, device telemetry, browser headers, and timestamped audit logs for security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">3. Purpose of Processing & Consent Framework (Section 6, DPDP Act)</h2>
            <p>
              Under Section 6 of the DPDP Act 2023, personal data is processed solely on the basis of informed, specific, unambiguous, and revocable consent, or for legitimate uses recognized by law:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Facilitating verified property inquiries directly between prospective buyers and registered listers/advisors.</li>
              <li>Authenticating users via one-time passwords (OTP) to prevent unauthorized fraudulent listings.</li>
              <li>Verifying project titles and carpet area measurements against public State RERA registries.</li>
              <li>Maintaining immutable platform security, audit logs, and fraud prevention records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">4. Rights of Data Principals (Sections 11–14, DPDP Act 2023)</h2>
            <p>
              As a Data Principal, you possess statutory rights enforceable under the DPDP Act 2023:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right to Access:</strong> You may request a summary of your personal data processed by BricksBazar and the identities of entities with whom it was shared.</li>
              <li><strong>Right to Correction & Erasure:</strong> You may update outdated data or request permanent erasure of data where processing is no longer necessary.</li>
              <li><strong>Right of Grievance Redressal:</strong> You may file an expedited grievance with our Data Protection Officer regarding data handling.</li>
              <li><strong>Right to Nominate:</strong> You may designate a nominee to exercise your data rights in the event of death or incapacity.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">5. Data Retention & Erasure Policy (Section 8(7), DPDP Act)</h2>
            <p>
              In compliance with Section 8(7) of the DPDP Act, personal data is retained only for the duration necessary to satisfy the purpose for which it was collected or to comply with statutory statutory audit periods under RERA and Indian tax statutes. Data associated with deleted accounts or withdrawn consent is permanently sanitized or rendered anonymized.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#252525]">6. Grievance Officer & Statutory Redressal</h2>
            <p>
              In accordance with Rule 5(9) of the IT Rules 2011 and Section 13 of the DPDP Act 2023, the details of the designated Data Protection & Grievance Officer are set forth below:
            </p>
            <div className="p-4 bg-gray-50 rounded-xl border border-[#EAEAEA] text-xs space-y-1 font-mono">
              <p><strong>Name:</strong> Rajeshwar Rao</p>
              <p><strong>Designation:</strong> Data Protection & Grievance Redressal Officer</p>
              <p><strong>Entity:</strong> BricksBazar Realty LLP (MahaRERA: A51800029418)</p>
              <p><strong>Address:</strong> A-909, 9th Floor, Crystal 86-Central, off Shreyas Signal, Andheri-Ghatkopar Link Road, Ghatkopar West, Mumbai - 400086</p>
              <p><strong>Email:</strong> grievance@bricksbazar.in / info@bricksbazar.in</p>
              <p><strong>Response Timeline:</strong> Grievances acknowledged within 48 hours and resolved within 30 days.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

