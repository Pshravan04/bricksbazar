import { Schema, model, Document, Types } from 'mongoose';

export interface ICoBrokingRequirement extends Document {
  clientInitials: string;
  clientType: 'Investor' | 'End User Buyer' | 'Corporate Tenant' | 'NRI Buyer';
  purpose: 'Buy' | 'Rent';
  propertyCategory: string;
  bhk: string;
  budget: string;
  targetLocalities: string[];
  city: string;
  urgency: 'Immediate (within 15 days)' | 'Within 30 Days' | 'Within 60 Days';
  commissionSplit: string;
  agentName: string;
  agentAgency: string;
  agentRera: string;
  agentPhone: string;
  agentUserId?: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CoBrokingRequirementSchema = new Schema<ICoBrokingRequirement>(
  {
    clientInitials: { type: String, required: true },
    clientType: {
      type: String,
      enum: ['Investor', 'End User Buyer', 'Corporate Tenant', 'NRI Buyer'],
      required: true,
    },
    purpose: { type: String, enum: ['Buy', 'Rent'], required: true },
    propertyCategory: { type: String, required: true },
    bhk: { type: String, required: true },
    budget: { type: String, required: true },
    targetLocalities: [{ type: String }],
    city: { type: String, required: true, index: true },
    urgency: {
      type: String,
      enum: ['Immediate (within 15 days)', 'Within 30 Days', 'Within 60 Days'],
      default: 'Within 30 Days',
    },
    commissionSplit: { type: String, default: '50:50 Clean Split' },
    agentName: { type: String, required: true },
    agentAgency: { type: String, required: true },
    agentRera: { type: String, required: true },
    agentPhone: { type: String, required: true },
    agentUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CoBrokingRequirement = model<ICoBrokingRequirement>(
  'CoBrokingRequirement',
  CoBrokingRequirementSchema
);

