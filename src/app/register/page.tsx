'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserRole } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { DemoBadge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import {
  User,
  Home,
  Briefcase,
  Building,
  Store,
  Lock,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agreeTerms: z.boolean().refine((val) => val === true, 'You must accept the platform terms'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const ROLES: { id: UserRole; title: string; desc: string; icon: any }[] = [
  { id: 'buyer', title: 'Buyer', desc: 'Looking to purchase a flat, villa or plot', icon: Home },
  { id: 'tenant', title: 'Tenant', desc: 'Looking to rent an apartment or home', icon: User },
  { id: 'owner', title: 'Property Owner', desc: 'Want to sell or rent out my property', icon: Building },
  { id: 'agent', title: 'Agent / Broker', desc: 'Licensed consultant with active listings', icon: Briefcase },
  { id: 'developer', title: 'Builder / Developer', desc: 'Promote new projects & residential towers', icon: Building },
  { id: 'supplier', title: 'Material Supplier', desc: 'Distribute cement, steel, tiles & paints', icon: Store },
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'buyer';
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreeTerms: true,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((res) => setTimeout(res, 600));
    success('Account Registered', 'Please enter the 6-digit OTP sent to your mobile.');
    router.push(`/verify-otp?phone=${encodeURIComponent(data.phone)}&role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-brand-bg flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-brand-border">
              <Image src="/brand/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-brand-text">
              BRICKS<span className="text-brand-red">BAZAR</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-brand-text">Join the BricksBazar Ecosystem</h2>
          <p className="text-xs text-brand-text-secondary">
            Select your role to personalize your discovery tools and management dashboard
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-brand-text uppercase tracking-wider block text-center sm:text-left">
            1. Select Your Primary Role
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ROLES.map((r) => {
              const isSelected = selectedRole === r.id;
              const Icon = r.icon;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={cn(
                    'p-4 rounded-xl border cursor-pointer transition select-none flex flex-col justify-between text-left',
                    isSelected
                      ? 'bg-brand-red-light/80 border-brand-red ring-1 ring-brand-red shadow-sm'
                      : 'bg-white border-brand-border hover:border-brand-text-secondary'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        isSelected ? 'bg-brand-red text-white' : 'bg-brand-bg text-brand-text'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-red" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-brand-text leading-tight">{r.title}</h4>
                    <p className="text-[10px] text-brand-text-secondary mt-1 leading-snug">
                      {r.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
              2. Enter Profile Details
            </h3>
            <span className="text-xs font-semibold text-brand-red">
              Role: {selectedRole.toUpperCase()}
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Vikramaditya Mehta"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Mobile Phone"
                placeholder="e.g. 9820154321"
                leftIcon={<Phone className="w-4 h-4" />}
                helperText="10-digit Indian mobile number"
                error={errors.phone?.message}
                {...register('phone')}
              />

              <Input
                label="Email Address"
                placeholder="e.g. vikram@mehtarealty.com"
                type="email"
                leftIcon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Input
              label="Create Secure Password"
              type="password"
              placeholder="At least 6 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="pt-2">
              <Checkbox
                label={
                  <span className="text-xs text-brand-text">
                    I agree to the{' '}
                    <Link href="/terms-and-conditions" className="text-brand-red font-semibold hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" className="text-brand-red font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                }
                error={errors.agreeTerms?.message}
                {...register('agreeTerms')}
              />
            </div>

            <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full font-bold">
              Continue to Mobile Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Existing account link */}
        <div className="text-center text-xs text-brand-text-secondary">
          Already registered on BricksBazar?{' '}
          <Link href="/login" className="font-bold text-brand-red hover:underline">
            Sign in here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-red-light border-t-brand-red rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterContent />
    </React.Suspense>
  );
}
