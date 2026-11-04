import { Schema, model, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  businessName: string;
  slug: string;
  logo: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  productCount: number;
  about: string;
  isVerified: boolean;
  isDemoRecord: boolean;
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    businessName: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    categories: [{ type: String }],
    productCount: { type: Number, default: 0 },
    about: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Supplier = model<ISupplier>('Supplier', SupplierSchema);

