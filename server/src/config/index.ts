import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bricksbazar',
  jwtSecret: process.env.JWT_SECRET || 'bricksbazar-super-secure-production-jwt-secret-key-2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  enableMockFallback: process.env.ENABLE_MOCK_FALLBACK !== 'false',
};

