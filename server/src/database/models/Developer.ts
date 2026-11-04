import { Schema, model, Document } from 'mongoose';

export interface IDeveloper extends Document {
  name: string;
  slug: string;
  logo: string;
  foundedYear: number;
  headquarters: string;
  experienceYears: number;
  totalProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  rating: number;
  reviewCount: number;
  operatingCities: string[];
  description: string;
  isVerified: boolean;
  isDemoRecord: boolean;
}

const DeveloperSchema = new Schema<IDeveloper>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    headquarters: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    totalProjects: { type: Number, default: 0 },
    ongoingProjects: { type: Number, default: 0 },
    completedProjects: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    operatingCities: [{ type: String }],
    description: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Developer = model<IDeveloper>('Developer', DeveloperSchema);

