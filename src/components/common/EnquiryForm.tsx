'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { CheckCircle2, ShieldAlert, Send, Clock, User, Phone, Mail } from 'lucide-react';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  preferredTime: z.string().min(1, 'Please select your preferred time slot'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export interface EnquiryFormProps {
  propertyOrItemTitle?: string;
  recipientName?: string;
  recipientRole?: string;
  onSuccess?: () => void;
  className?: string;
}

export function EnquiryForm({
  propertyOrItemTitle,
  recipientName = 'Listing Agent',
  recipientRole = 'Verified Consultant',
  onSuccess,
  className,
}: EnquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<EnquiryFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormData>({
    defaultValues: {
      preferredTime: 'Morning (9 AM - 12 PM)',
      message: propertyOrItemTitle
        ? `Hello, I am interested in "${propertyOrItemTitle}". Please share more details and arrange a site visit.`
        : 'Hello, I am interested in this listing. Please contact me.',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    // Simulate brief network delay
    await new Promise((res) => setTimeout(res, 600));
    setSubmittedData(data);
    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="bg-brand-bg/80 border border-brand-border rounded-xl p-6 text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 bg-brand-success-light text-brand-success rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-brand-text">Enquiry Recorded (Demo Mode)</h4>
          <p className="text-xs text-brand-text-secondary mt-1">
            Thank you, <span className="font-semibold text-brand-text">{submittedData.name}</span>.
            In production, this enquiry will be delivered via SMS/Email to {recipientName}.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-left space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Development Notice</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            This is currently operating in local demo mode. No real SMS or webhook has been dispatched to third-party telecommunication gateways.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleReset} className="w-full">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-brand-text">Enquire About This Listing</h4>
        <p className="text-xs text-brand-text-secondary">
          Connect directly with {recipientName} ({recipientRole})
        </p>
      </div>

      <div className="space-y-3">
        <Input
          label="Full Name"
          placeholder="e.g. Rajesh Sharma"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Mobile Number"
          placeholder="e.g. 9820012345"
          leftIcon={<Phone className="w-4 h-4" />}
          helperText="10-digit Indian mobile number"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="Email Address"
          placeholder="e.g. rajesh@example.com"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Select
          label="Preferred Contact Time"
          options={[
            'Morning (9 AM - 12 PM)',
            'Afternoon (12 PM - 4 PM)',
            'Evening (4 PM - 8 PM)',
            'Anytime on Weekends',
          ]}
          error={errors.preferredTime?.message}
          {...register('preferredTime')}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
            Message
          </label>
          <textarea
            rows={3}
            className="w-full bg-white text-brand-text text-sm rounded-button border border-brand-border px-3.5 py-2.5 transition focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
            placeholder="Tell the consultant what you're looking for..."
            {...register('message')}
          />
          {errors.message?.message && (
            <p className="text-xs text-brand-error font-medium">{errors.message.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="w-full" size="md">
        <Send className="w-4 h-4 mr-1.5" />
        Send Enquiry
      </Button>

      <p className="text-[10px] text-brand-text-muted text-center">
        By submitting, you agree to BricksBazar Terms of Service & Privacy Policy.
      </p>
    </form>
  );
}

