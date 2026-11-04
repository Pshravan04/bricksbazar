import { Router, Request, Response } from 'express';
import { Project } from '../../database/models/Project';

const router = Router();

// GET /api/projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const { city, status, developer } = req.query;
    const query: any = {};

    if (city && city !== 'all') {
      query['location.city'] = new RegExp(`^${city}$`, 'i');
    }
    if (status) {
      query.projectStatus = status;
    }
    if (developer) {
      query['developer.slug'] = developer;
    }

    const projects = await Project.find(query).sort({ isFeatured: -1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const projectRoutes = router;

