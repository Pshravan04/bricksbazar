import { Schema, model, Document, Types } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  slug: string;
  role: 'agent' | 'broker';
  agencyName: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  location: {
    city: string;
    locality: string;
    address: string;
  };
  specializations: string[];
  languages: string[];
  listedPropertiesCount: number;
  verifiedListingsCount: number;
  phone: string;
  email: string;
  about: string;
  reraNumber?: string;
  isVerified: boolean;
  isDemoRecord: boolean;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    role: { type: String, enum: ['agent', 'broker'], default: 'agent' },
    agencyName: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 5 },
    location: {
      city: { type: String, required: true, index: true },
      locality: { type: String, required: true },
      address: { type: String, required: true },
    },
    specializations: [{ type: String }],
    languages: [{ type: String }],
    listedPropertiesCount: { type: Number, default: 0 },
    verifiedListingsCount: { type: Number, default: 0 },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    about: { type: String, required: true },
    reraNumber: { type: String, trim: true },
    isVerified: { type: Boolean, default: false, index: true },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Agent = model<IAgent>('Agent', AgentSchema);

