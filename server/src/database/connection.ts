import mongoose from 'mongoose';
import { config } from '../config';

export async function connectDatabase(): Promise<typeof mongoose | null> {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: config.env !== 'production',
    });
    console.log(`[BricksBazar DB] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[BricksBazar DB] MongoDB connection failed (${(error as Error).message}). Operating in Mock/Simulation fallback mode.`);
    return null;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

