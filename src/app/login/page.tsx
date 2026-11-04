'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { DemoBadge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { DEMO_PRESET_USERS, getDashboardRouteForRole } from '@/lib/auth';
import { UserRole } from '@/types';
import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ShieldAlert } from 'lucide-react';

const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter your registered email or phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: 'vikram@mehtarealty.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((res) => setTimeout(res, 600));
    success('Logged in successfully', 'Welcome back to BricksBazar.');
    router.push('/dashboard/agent');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const user = DEMO_PRESET_USERS[role];
    setValue('identifier', user.email);
    setValue('password', 'password123');
    success(`Signed in as ${user.name} (${user.role.toUpperCase()})`);
    router.push(getDashboardRouteForRole(role));
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-brand-bg">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-brand-border">
              <Image src="/brand/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-brand-text">
              BRICKS<span className="text-brand-red">BAZAR</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-brand-text">Sign in to your account</h2>
          <p className="text-xs text-brand-text-secondary">
            Access your saved listings, enquiries, and partner dashboards
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email or Mobile Number"
              placeholder="e.g. name@example.com or 9820012345"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.identifier?.message}
              {...register('identifier')}
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-brand-red hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-brand-text-secondary hover:text-brand-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Checkbox label="Remember me on this device" {...register('rememberMe')} />
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full" size="md">
              Sign In
            </Button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="pt-4 border-t border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-brand-text-secondary uppercase tracking-wider">
                Instant Demo Evaluation Logins:
              </span>
              <DemoBadge />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('buyer')}
                className="p-2 rounded-lg border border-brand-border bg-brand-bg text-[11px] font-bold text-brand-text hover:border-brand-red hover:text-brand-red transition"
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('owner')}
                className="p-2 rounded-lg border border-brand-border bg-brand-bg text-[11px] font-bold text-brand-text hover:border-brand-red hover:text-brand-red transition"
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('agent')}
                className="p-2 rounded-lg border border-brand-border bg-brand-bg text-[11px] font-bold text-brand-text hover:border-brand-red hover:text-brand-red transition"
              >
                Agent
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('developer')}
                className="p-2 rounded-lg border border-brand-border bg-brand-bg text-[11px] font-bold text-brand-text hover:border-brand-red hover:text-brand-red transition"
              >
                Developer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('supplier')}
                className="p-2 rounded-lg border border-brand-border bg-brand-bg text-[11px] font-bold text-brand-text hover:border-brand-red hover:text-brand-red transition"
              >
                Supplier
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-lg border border-brand-red/30 bg-brand-red-light text-[11px] font-bold text-brand-red hover:bg-brand-red hover:text-white transition"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center text-xs text-brand-text-secondary">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-bold text-brand-red hover:underline">
            Register for free &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

