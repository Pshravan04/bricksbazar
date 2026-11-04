import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

export function createRateLimiter(windowMs: number = 60 * 1000, maxRequests: number = 60) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    const record = memoryStore.get(ip);

    if (!record || now > record.resetTime) {
      memoryStore.set(ip, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        success: false,
        error: 'Too Many Requests: Rate limit exceeded. Please try again shortly.',
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      });
      return;
    }

    record.count++;
    next();
  };
}

