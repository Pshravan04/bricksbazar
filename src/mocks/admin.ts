export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  entityType: 'Property' | 'Project' | 'Agent' | 'User' | 'Marketplace' | 'System';
  entityId: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface ModerationItem {
  id: string;
  type: 'property' | 'project' | 'agent' | 'product';
  title: string;
  submittedBy: string;
  submittedByRole: string;
  submittedAt: string;
  city: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_REVISION';
  reraNumber?: string;
  priceOrBudget?: string;
  flagReason?: string;
}

export const MOCK_MODERATION_QUEUE: ModerationItem[] = [
  {
    id: 'mod-prop-901',
    type: 'property',
    title: '4 BHK Duplex Penthouse with Private Plunge Pool at Worli Seaface',
    submittedBy: 'Vikramaditya Singhania',
    submittedByRole: 'Agent',
    submittedAt: '2026-03-03T11:20:00Z',
    city: 'Mumbai',
    status: 'PENDING',
    reraNumber: 'A51900028941',
    priceOrBudget: '₹ 28.5 Cr',
  },
  {
    id: 'mod-prop-902',
    type: 'property',
    title: '3 BHK Highrise Flat with Golf View at Sector 150',
    submittedBy: 'Sanjay Aggarwal',
    submittedByRole: 'Owner',
    submittedAt: '2026-03-03T09:45:00Z',
    city: 'Noida (Delhi NCR)',
    status: 'PENDING',
    priceOrBudget: '₹ 2.15 Cr',
  },
  {
    id: 'mod-agent-801',
    type: 'agent',
    title: 'Kavita Menon (Menon Realty Consultants)',
    submittedBy: 'Kavita Menon',
    submittedByRole: 'Broker',
    submittedAt: '2026-03-02T15:10:00Z',
    city: 'Pune',
    status: 'PENDING',
    reraNumber: 'A52100091823',
    priceOrBudget: '12 Active Listings Submitted',
  },
  {
    id: 'mod-proj-701',
    type: 'project',
    title: 'Prestige Serenity Palms — Phase 2 Launch',
    submittedBy: 'Prestige Estates Projects Ltd',
    submittedByRole: 'Developer',
    submittedAt: '2026-03-01T17:30:00Z',
    city: 'Bengaluru',
    status: 'PENDING',
    reraNumber: 'PRM/KA/RERA/1251/310/PR/240126',
    priceOrBudget: '380 Residential Units',
  },
  {
    id: 'mod-mat-601',
    type: 'product',
    title: 'UltraTech Super Weather-Shield Waterproof Cement (50kg Bags)',
    submittedBy: 'Siddhivinayak Building Materials Pvt Ltd',
    submittedByRole: 'Supplier',
    submittedAt: '2026-03-01T12:00:00Z',
    city: 'Thane',
    status: 'PENDING',
    priceOrBudget: '₹ 385 / bag',
  },
];

export const MOCK_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-03-03T11:42:10Z',
    actor: 'Rajeshwar Rao',
    actorRole: 'Super Admin',
    action: 'PROPERTY_APPROVED',
    entityType: 'Property',
    entityId: 'prop-101',
    details: 'Approved 3 BHK Luxury Sea-View Apartment at Bandra West after MahaRERA title verification.',
    ipAddress: '49.36.128.54 (Mumbai, IN)',
    status: 'SUCCESS',
  },
  {
    id: 'log-102',
    timestamp: '2026-03-03T10:15:32Z',
    actor: 'Pooja Sharma',
    actorRole: 'Compliance Officer',
    action: 'AGENT_VERIFIED',
    entityType: 'Agent',
    entityId: 'agent-201',
    details: 'Granted verified badge to Vikramaditya Singhania following RERA registry match.',
    ipAddress: '103.21.124.91 (Bengaluru, IN)',
    status: 'SUCCESS',
  },
  {
    id: 'log-103',
    timestamp: '2026-03-02T18:05:40Z',
    actor: 'Security Daemon',
    actorRole: 'Automated Bot',
    action: 'SUSPICIOUS_LOGIN_BLOCKED',
    entityType: 'User',
    entityId: 'user-8991',
    details: 'Triggered rate-limit challenge after 5 failed password attempts on admin gateway.',
    ipAddress: '185.220.101.4 (Tor Exit Node)',
    status: 'WARNING',
  },
  {
    id: 'log-104',
    timestamp: '2026-03-02T14:30:19Z',
    actor: 'Rajeshwar Rao',
    actorRole: 'Super Admin',
    action: 'PROJECT_MODERATED',
    entityType: 'Project',
    entityId: 'proj-301',
    details: 'Updated inventory counts and verified occupancy certificate for Lodha Park Tower A.',
    ipAddress: '49.36.128.54 (Mumbai, IN)',
    status: 'SUCCESS',
  },
  {
    id: 'log-105',
    timestamp: '2026-03-01T09:20:11Z',
    actor: 'Pooja Sharma',
    actorRole: 'Compliance Officer',
    action: 'LISTING_REJECTED',
    entityType: 'Property',
    entityId: 'prop-991',
    details: 'Rejected unverified plot listing due to missing non-agricultural (NA) sanction certificate.',
    ipAddress: '103.21.124.91 (Bengaluru, IN)',
    status: 'FAILED',
  },
];

