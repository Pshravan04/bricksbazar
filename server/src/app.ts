import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { createRateLimiter } from './middleware/rateLimiter';

// Import route modules
import { authRoutes } from './modules/auth/auth.routes';
import { propertyRoutes } from './modules/properties/property.routes';
import { projectRoutes } from './modules/projects/project.routes';
import { agentRoutes } from './modules/agents/agent.routes';
import { marketplaceRoutes } from './modules/marketplace/marketplace.routes';
import { leadRoutes } from './modules/leads/lead.routes';
import { adminRoutes } from './modules/admin/admin.routes';

export function createApp(): Application {
  const app: Application = express();

  // Basic security and parsing middleware
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Global rate limiter (120 req/minute per IP)
  app.use(createRateLimiter(60 * 1000, 120));

  // Health check & diagnostic endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      platform: 'BricksBazar API Engine',
      environment: config.env,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Mount API modules
  app.use('/api/auth', authRoutes);
  app.use('/api/properties', propertyRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/agents', agentRoutes);
  app.use('/api/marketplace', marketplaceRoutes);
  app.use('/api/leads', leadRoutes);
  app.use('/api/admin', adminRoutes);

  // 404 Not Found handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: `Endpoint ${req.method} ${req.originalUrl} not found on BricksBazar API`,
    });
  });

  // Centralized Error handler
  app.use(errorHandler);

  return app;
}

