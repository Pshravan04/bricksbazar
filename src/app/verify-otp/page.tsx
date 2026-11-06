'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { DemoBadge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { getDashboardRouteForRole } from '@/lib/auth';
import { UserRole } from '@/types';
import { ShieldCheck, Phone, CheckCircle2, RotateCcw } from 'lucide-react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '+91 98200 12345';
  const role = (searchParams.get('role') as UserRole) || 'buyer';
  const { success } = useToast();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (idx: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val !== '' && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[idx] === '' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    await new Promise((res) => setTimeout(res, 600));
    success('Mobile Verified', 'Welcome to BricksBazar!');
    router.push(getDashboardRouteForRole(role));
  };

  const handleResend = () => {
    setTimer(45);
    success('OTP Resent', 'A new 6-digit code has been dispatched in demo mode.');
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
          <h2 className="text-xl font-bold text-brand-text">Verify Your Mobile Number</h2>
          <p className="text-xs text-brand-text-secondary">
            Enter the 6-digit code sent to <strong className="text-brand-text">{phone}</strong>
          </p>
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-extrabold rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:border-brand-red focus:bg-white focus:ring-1 focus:ring-brand-red"
                />
              ))}         </div>

            <div className="bg-brand-bg border border-brand-border rounded-lg p-3 text-xs text-brand-text-secondary flex items-start gap-2">
              <span>Enter the 6-digit verification code sent to your registered contact.</span>
            </div>

            <Button type="submit" isLoading={isVerifying} className="w-full" size="md">
              Verify & Enter Dashboard
            </Button>
          </form>

          <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs text-brand-text-secondary">
            <span>Didn&apos;t receive code?</span>
            {timer > 0 ? (
              <span className="font-semibold text-brand-text">Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-red-light border-t-brand-red rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </React.Suspense>
  );
}
