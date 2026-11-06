'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DemoBadge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) return;
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsLoading(false);
    setSubmitted(true);
    success('Reset Link Sent', 'Password reset instructions have been dispatched in demo mode.');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-brand-bg">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-brand-border">
              <Image src="/brand/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-brand-text">
              BRICKS<span className="text-brand-red">BAZAR</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-brand-text">Reset Your Password</h2>
          <p className="text-xs text-brand-text-secondary">
            Enter your registered email address or mobile number to receive password recovery instructions.
          </p>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          {submitted ? (
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-brand-success-light text-brand-success flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-brand-text">Check Your Inbox / Phone</h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                We have prepared a password reset link for <strong className="text-brand-text">{emailOrPhone}</strong>.
              </p>
              <div className="p-3 bg-brand-bg rounded-lg border border-brand-border text-xs text-brand-text-secondary">
                Please follow the instructions sent to your registered address to reset your password.
              </div>
              <Link href="/login" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email or Mobile"
                placeholder="e.g. name@example.com or 9820012345"
                leftIcon={<Mail className="w-4 h-4" />}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />

              <Button type="submit" isLoading={isLoading} className="w-full" size="md">
                Send Reset Link
              </Button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-brand-border">
            <Link href="/login" className="text-xs font-semibold text-brand-text-secondary hover:text-brand-red inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

