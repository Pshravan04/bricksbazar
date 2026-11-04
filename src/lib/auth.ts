import { UserRole } from '@/types';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
  isDemoUser: boolean;
}

export const DEMO_PRESET_USERS: Record<UserRole, AuthUser> = {
  buyer: {
    id: 'usr-buyer-01',
    name: 'Ananya Deshmukh',
    email: 'ananya.buyer@example.com',
    phone: '+91 98200 11223',
    role: 'buyer',
    isVerified: true,
    isDemoUser: true,
  },
  tenant: {
    id: 'usr-tenant-01',
    name: 'Saurabh Tandon',
    email: 'saurabh.tenant@example.com',
    phone: '+91 97110 56789',
    role: 'tenant',
    isVerified: true,
    isDemoUser: true,
  },
  owner: {
    id: 'usr-owner-01',
    name: 'Sunil Deshmukh',
    email: 'sunil.owner@gmail.com',
    phone: '+91 99203 88123',
    role: 'owner',
    isVerified: true,
    isDemoUser: true,
  },
  agent: {
    id: 'usr-agent-01',
    name: 'Vikramaditya Mehta',
    email: 'vikram@mehtarealty.com',
    phone: '+91 98201 54321',
    role: 'agent',
    isVerified: true,
    isDemoUser: true,
  },
  broker: {
    id: 'usr-broker-01',
    name: 'Rohan Kulkarni',
    email: 'rohan@puneestatepartners.in',
    phone: '+91 97654 32109',
    role: 'broker',
    isVerified: true,
    isDemoUser: true,
  },
  developer: {
    id: 'usr-dev-01',
    name: 'Oberoi Realty Management',
    email: 'sales@oberoirealty.com',
    phone: '+91 22 6789 0000',
    role: 'developer',
    isVerified: true,
    isDemoUser: true,
  },
  dealer: {
    id: 'usr-dealer-01',
    name: 'Mahavir Building Supplies',
    email: 'procurement@mahavir.in',
    phone: '+91 98204 11223',
    role: 'dealer',
    isVerified: true,
    isDemoUser: true,
  },
  supplier: {
    id: 'usr-supplier-01',
    name: 'TileZone Ceramics Gallery',
    email: 'orders@tilezone.in',
    phone: '+91 98812 34567',
    role: 'supplier',
    isVerified: true,
    isDemoUser: true,
  },
  admin: {
    id: 'usr-admin-01',
    name: 'BricksBazar Platform Administrator',
    email: 'admin@bricksbazar.com',
    phone: '+91 98200 99999',
    role: 'admin',
    isVerified: true,
    isDemoUser: true,
  },
};

/**
 * Returns dashboard target route based on user role
 */
export function getDashboardRouteForRole(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'buyer':
    case 'tenant':
      return '/dashboard/buyer';
    case 'owner':
      return '/dashboard/owner';
    case 'agent':
    case 'broker':
      return '/dashboard/agent';
    case 'developer':
      return '/dashboard/developer';
    case 'dealer':
    case 'supplier':
      return '/dashboard/supplier';
    default:
      return '/dashboard';
  }
}

