import { Router, Request, Response } from 'express';
import { Property } from '../../database/models/Property';
import { Agent } from '../../database/models/Agent';
import { AuditLog } from '../../database/models/AuditLog';
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth';

const router = Router();

// GET /api/admin/overview
router.get('/overview', authenticate, requireRole('admin'), async (_req: AuthRequest, res: Response) => {
  try {
    const [totalProperties, pendingProperties, totalAgents, auditLogs] = await Promise.all([
      Property.countDocuments({ status: 'APPROVED' }),
      Property.countDocuments({ status: 'PENDING' }),
      Agent.countDocuments({ isVerified: true }),
      AuditLog.find().sort({ createdAt: -1 }).limit(10),
    ]);

    res.json({
      success: true,
      data: {
        totalProperties,
        pendingProperties,
        totalAgents,
        recentAuditLogs: auditLogs,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/admin/properties/:id/moderate
router.patch(
  '/properties/:id/moderate',
  authenticate,
  requireRole('admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { status, remarks } = req.body;
      const property = await Property.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
      }

      // Log moderation event
      const log = new AuditLog({
        actor: req.user?.name || 'Super Admin',
        actorRole: 'Admin',
        action: `PROPERTY_${status}`,
        entityType: 'Property',
        entityId: property._id.toString(),
        details: remarks || `Property ${property.title} status updated to ${status}`,
        ipAddress: req.ip || '127.0.0.1',
        status: 'SUCCESS',
      });
      await log.save();

      res.json({ success: true, data: property });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/admin/audit-logs
router.get('/audit-logs', authenticate, requireRole('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: logs });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const adminRoutes = router;

