import { Schema, model, Document, Types } from 'mongoose';

export interface IPropertyConfiguration {
  bhk: string;
  carpetArea: number;
  superBuiltUpArea: number;
  bathrooms: number;
  balconies: number;
  price: number;
  floorPlanUrl?: string;
}

export interface IProperty extends Document {
  title: string;
  slug: string;
  listingType: 'buy' | 'rent' | 'commercial' | 'plot';
  propertyCategory: string;
  location: {
    city: string;
    locality: string;
    subLocality?: string;
    address: string;
    landmark?: string;
    pincode: string;
    coordinates?: {
      type: string;
      coordinates: [number, number]; // [lng, lat]
    };
  };
  price: number;
  pricePerSqFt: number;
  isNegotiable: boolean;
  bhk: string;
  carpetArea: number;
  superBuiltUpArea: number;
  furnishing: string;
  possessionStatus: string;
  possessionDate?: string;
  floorNumber: number;
  totalFloors: number;
  facing: string;
  images: string[];
  amenities: string[];
  description: string;
  highlights: string[];
  configurations: IPropertyConfiguration[];
  reraNumber?: string;
  postedBy: 'Owner' | 'Agent' | 'Builder';
  lister: {
    name: string;
    phone: string;
    email: string;
    agencyName?: string;
    isVerified: boolean;
    userId?: Types.ObjectId;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_REVISION';
  isFeatured: boolean;
  isVerified: boolean;
  viewsCount: number;
  inquiriesCount: number;
  isDemoRecord: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertyConfigurationSchema = new Schema<IPropertyConfiguration>(
  {
    bhk: { type: String, required: true },
    carpetArea: { type: Number, required: true },
    superBuiltUpArea: { type: Number, required: true },
    bathrooms: { type: Number, default: 1 },
    balconies: { type: Number, default: 0 },
    price: { type: Number, required: true },
    floorPlanUrl: { type: String },
  },
  { _id: false }
);

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    listingType: {
      type: String,
      enum: ['buy', 'rent', 'commercial', 'plot'],
      required: true,
      index: true,
    },
    propertyCategory: { type: String, required: true, index: true },
    location: {
      city: { type: String, required: true, index: true },
      locality: { type: String, required: true, index: true },
      subLocality: { type: String },
      address: { type: String, required: true },
      landmark: { type: String },
      pincode: { type: String, required: true },
      coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' },
      },
    },
    price: { type: Number, required: true, index: true },
    pricePerSqFt: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    bhk: { type: String, required: true, index: true },
    carpetArea: { type: Number, required: true },
    superBuiltUpArea: { type: Number, required: true },
    furnishing: { type: String, default: 'Unfurnished' },
    possessionStatus: { type: String, default: 'Ready to Move' },
    possessionDate: { type: String },
    floorNumber: { type: Number, default: 1 },
    totalFloors: { type: Number, default: 1 },
    facing: { type: String, default: 'East' },
    images: [{ type: String }],
    amenities: [{ type: String }],
    description: { type: String, required: true },
    highlights: [{ type: String }],
    configurations: [PropertyConfigurationSchema],
    reraNumber: { type: String, trim: true },
    postedBy: { type: String, enum: ['Owner', 'Agent', 'Builder'], required: true },
    lister: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      agencyName: { type: String },
      isVerified: { type: Boolean, default: false },
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'NEEDS_REVISION'],
      default: 'PENDING',
      index: true,
    },
    isFeatured: { type: Boolean, default: false, index: true },
    isVerified: { type: Boolean, default: false, index: true },
    viewsCount: { type: Number, default: 0 },
    inquiriesCount: { type: Number, default: 0 },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compound indexing for multi-factor search performance
PropertySchema.index({ 'location.city': 1, listingType: 1, propertyCategory: 1, price: 1 });
PropertySchema.index({ title: 'text', description: 'text', 'location.locality': 'text' });

export const Property = model<IProperty>('Property', PropertySchema);

