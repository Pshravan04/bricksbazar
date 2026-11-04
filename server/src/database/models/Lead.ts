import { Schema, model, Document, Types } from 'mongoose';

export interface ILead extends Document {
  leadType: 'Property Enquiry' | 'Rental Enquiry' | 'Site Visit' | 'Quotation' | 'Buyer Requirement';
  source: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  preferredTime?: string;
  message?: string;
  propertyOrItemTitle: string;
  propertyOrItemId?: string;
  budget?: string;
  location?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Site Visit Scheduled' | 'Negotiation' | 'Converted' | 'Closed' | 'Rejected';
  assignedTo?: string;
  assignedUserId?: Types.ObjectId;
  notes?: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    leadType: {
      type: String,
      enum: ['Property Enquiry', 'Rental Enquiry', 'Site Visit', 'Quotation', 'Buyer Requirement'],
      required: true,
      index: true,
    },
    source: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true },
    preferredTime: { type: String },
    message: { type: String },
    propertyOrItemTitle: { type: String, required: true },
    propertyOrItemId: { type: String },
    budget: { type: String },
    location: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Site Visit Scheduled', 'Negotiation', 'Converted', 'Closed', 'Rejected'],
      default: 'New',
      index: true,
    },
    assignedTo: { type: String },
    assignedUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String },
    followUpDate: { type: Date },
  },
  { timestamps: true }
);

export const Lead = model<ILead>('Lead', LeadSchema);

