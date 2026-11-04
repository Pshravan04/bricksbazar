import { Schema, model, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actor: string;
  actorRole: string;
  action: string;
  entityType: 'Property' | 'Project' | 'Agent' | 'User' | 'Marketplace' | 'System';
  entityId: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actor: { type: String, required: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true, index: true },
    entityType: {
      type: String,
      enum: ['Property', 'Project', 'Agent', 'User', 'Marketplace', 'System'],
      required: true,
      index: true,
    },
    entityId: { type: String, required: true },
    details: { type: String, required: true },
    ipAddress: { type: String, required: true },
    status: { type: String, enum: ['SUCCESS', 'WARNING', 'FAILED'], default: 'SUCCESS', index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = model<IAuditLog>('AuditLog', AuditLogSchema);

