import { Router, Request, Response } from 'express';
import { Lead } from '../../database/models/Lead';
import { CoBrokingRequirement } from '../../database/models/CoBrokingRequirement';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

// POST /api/leads/enquiry (Public inquiry submission)
router.post('/enquiry', async (req: Request, res: Response) => {
  try {
    const lead = new Lead({
      ...req.body,
      status: 'New',
    });
    await lead.save();
    res.status(201).json({ success: true, data: lead });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/leads (Consultant inbox)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, data: leads });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/leads/:id/status
router.patch('/:id/status', authenticate, async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, ...(notes && { notes }) },
      { new: true }
    );
    if (!lead) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/leads/co-broking (Co-Broking Requirement Board)
router.get('/co-broking', authenticate, async (req: Request, res: Response) => {
  try {
    const { city, purpose } = req.query;
    const query: any = { isActive: true };
    if (city && city !== 'all') query.city = city;
    if (purpose && purpose !== 'all') query.purpose = purpose;

    const requirements = await CoBrokingRequirement.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: requirements });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/leads/co-broking
router.post('/co-broking', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const requirement = new CoBrokingRequirement({
      ...req.body,
      agentUserId: req.user?.id,
    });
    await requirement.save();
    res.status(201).json({ success: true, data: requirement });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export const leadRoutes = router;

