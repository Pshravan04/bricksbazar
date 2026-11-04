import { Router, Request, Response } from 'express';
import { Agent } from '../../database/models/Agent';
import { Developer } from '../../database/models/Developer';

const router = Router();

// GET /api/agents
router.get('/', async (req: Request, res: Response) => {
  try {
    const { city, role } = req.query;
    const query: any = {};

    if (city && city !== 'all') {
      query['location.city'] = new RegExp(`^${city}$`, 'i');
    }
    if (role) {
      query.role = role;
    }

    const agents = await Agent.find(query).sort({ rating: -1, listedPropertiesCount: -1 });
    res.json({ success: true, data: agents });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/agents/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const agent = await Agent.findOne({ slug: req.params.slug });
    if (!agent) {
      res.status(404).json({ error: 'Agent profile not found' });
      return;
    }
    res.json({ success: true, data: agent });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/developers
router.get('/developers/all', async (_req: Request, res: Response) => {
  try {
    const developers = await Developer.find().sort({ totalProjects: -1 });
    res.json({ success: true, data: developers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const agentRoutes = router;

