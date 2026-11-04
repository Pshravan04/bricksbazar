'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';

export default function ContactPage() {
  const { success } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('General Support');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    success(
      'Message Received',
      `Thank you ${name}. A BricksBazar relationship manager will respond to ${email} within 4 business hours.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-16">
      {/* Hero Header */}
      <section className="bg-white border-b border-[#EAEAEA] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#FCEEEF] text-[#C6383B] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            Contact & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
            How Can We Assist Your Real Estate Journey?
          </h1>
          <p className="text-sm sm:text-base text-[#777777] mt-3 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking to list a project, verify broker credentials, source bulk construction materials,
            or speak with client support, our team is available across India.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEAEA] shadow-xs">
            <h2 className="text-xl font-bold text-[#252525] mb-1">Send Us a Direct Message</h2>
            <p className="text-xs text-[#777777] mb-6">
              Fill in your inquiry details below. All communications are confidential.
            </p>

            {isSubmitted ? (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-[#EAEAEA] space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#21865B] mx-auto" />
                <h3 className="text-lg font-bold text-[#252525]">Inquiry Dispatched Successfully!</h3>
                <p className="text-xs text-[#777777] max-w-sm mx-auto leading-relaxed">
                  We have assigned your ticket to our {department} team. A specialist will connect with you on {phone}{' '}
                  shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="text-xs mt-2"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Full Name *"
                    placeholder="e.g. Ramesh Chandra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Mobile Number *"
                    placeholder="e.g. 9820098200"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="e.g. ramesh@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Select
                    label="Inquiry Department *"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    options={[
                      { value: 'General Support', label: 'General Portal Support' },
                      { value: 'Agent Accreditation', label: 'Agent & Broker RERA Verification' },
                      { value: 'Developer Projects', label: 'Developer Project Listing Desk' },
                      { value: 'Materials Procurement', label: 'Construction Materials & Bulk Supply' },
                      { value: 'Enterprise & API', label: 'Enterprise & Institutional Partnerships' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Your Message / Requirement *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify your query or property requirement..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#EAEAEA] bg-white text-[#252525] placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#C6383B]"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full">
                  <Send className="w-4 h-4 mr-2" /> Submit Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Regional Corporate Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#252525] uppercase tracking-wider">
                Corporate Headquarters
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C6383B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#252525]">Mumbai Corporate Tower</p>
                    <p className="text-[#777777] mt-0.5 leading-relaxed">
                      Level 14, One BKC, G-Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-[#EAEAEA] pt-3">
                  <MapPin className="w-4 h-4 text-[#C6383B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#252525]">Bengaluru Tech & Engineering Hub</p>
                    <p className="text-[#777777] mt-0.5 leading-relaxed">
                      Indiqube Golf View Homes, Wind Tunnel Road, HAL 2nd Stage, Bengaluru, Karnataka 560008
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-[#EAEAEA] pt-3">
                  <MapPin className="w-4 h-4 text-[#C6383B] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#252525]">Pune Regional Operations</p>
                    <p className="text-[#777777] mt-0.5 leading-relaxed">
                      E-Square Heights, University Road, Shivaji Nagar, Pune, Maharashtra 411016
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="bg-white p-6 rounded-2xl border border-[#EAEAEA] shadow-xs space-y-3 text-xs">
              <h3 className="text-sm font-bold text-[#252525]">Direct Assistance</h3>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#21865B]" />
                <div>
                  <p className="font-bold text-[#252525]">Toll-Free Helpline</p>
                  <p className="text-[#777777] font-mono">1800 209 8899 (9:00 AM - 8:00 PM IST)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#EAEAEA] pt-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-bold text-[#252525]">Email Support</p>
                  <p className="text-[#777777]">support@bricksbazar.com / legal@bricksbazar.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

