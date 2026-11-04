import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'buyer' | 'tenant' | 'owner' | 'agent' | 'broker' | 'developer' | 'dealer' | 'supplier' | 'admin';
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isActive: boolean;
  reraNumber?: string;
  agencyName?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['buyer', 'tenant', 'owner', 'agent', 'broker', 'developer', 'dealer', 'supplier', 'admin'],
      default: 'buyer',
    },
    isPhoneVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    reraNumber: { type: String, trim: true },
    agencyName: { type: String, trim: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password as string);
};

export const User = model<IUser>('User', UserSchema);
