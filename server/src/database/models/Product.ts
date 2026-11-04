import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand: string;
  images: string[];
  price?: number;
  priceUnit?: string;
  isPriceOnQuotation: boolean;
  minOrderQuantity: string;
  specifications: Map<string, string>;
  description: string;
  supplier: {
    id?: Types.ObjectId;
    name: string;
    businessName: string;
    location: string;
    phone: string;
    isVerified: boolean;
  };
  inStock: boolean;
  isDemoRecord: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    brand: { type: String, required: true, index: true },
    images: [{ type: String }],
    price: { type: Number },
    priceUnit: { type: String },
    isPriceOnQuotation: { type: Boolean, default: false },
    minOrderQuantity: { type: String, required: true },
    specifications: { type: Map, of: String },
    description: { type: String, required: true },
    supplier: {
      id: { type: Schema.Types.ObjectId, ref: 'Supplier' },
      name: { type: String, required: true },
      businessName: { type: String, required: true },
      location: { type: String, required: true },
      phone: { type: String, required: true },
      isVerified: { type: Boolean, default: true },
    },
    inStock: { type: Boolean, default: true },
    isDemoRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', ProductSchema);

