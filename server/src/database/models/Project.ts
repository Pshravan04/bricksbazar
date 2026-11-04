import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  name: string;
  slug: string;
  developer: {
    id?: Types.ObjectId;
    name: string;
    logo: string;
    slug: string;
  };
  location: {
    city: string;
    locality: string;
    address: string;
  };
  startingPrice: number;
  maxPrice: number;
  projectStatus: 'New Launch' | 'Under Construction' | 'Ready to Move';
  possessionDate: string;
  reraNumber: string;
  totalTowers: number;
  totalUnits: number;
  availableUnits: number;
  images: string[];
  amenities: string[];
  description: string;
  isFeatured: boolean;
  isVerified: boolean;
  isDemoRecord: boolean;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    developer: {
      id: { type: Schema.Types.ObjectId, ref: 'Developer' },
      name: { type: String, required: true },
      logo: { type: String, required: true },
      slug: { type: String, required: true },
    },
    location: {
      city: { type: String, required: true, index: true },
      locality: { type: String, required: true, index: true },
      address: { type: String, required: true },
    },
    startingPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    projectStatus: {
      type: String,
      enum: ['New Launch', 'Under Construction', 'Ready to Move'],
      required: true,
      index: true,
    },
    possessionDate: { type: String, required: true },
    reraNumber: { type: String, required: true, index: true },
    totalTowers: { type: Number, default: 1 },
    totalUnits: { type: Number, default: 100 },
    availableUnits: { type: Number, default: 50 },
    images: [{ type: String }],
    amenities: [{ type: String }],
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', ProjectSchema);

