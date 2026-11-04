import { Router, Request, Response } from 'express';
import { Property } from '../../database/models/Property';
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth';

const router = Router();

// GET /api/properties
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      city,
      listingType,
      category,
      bhk,
      minPrice,
      maxPrice,
      furnishing,
      possession,
      sort = 'newest',
      page = '1',
      limit = '12',
    } = req.query;

    const query: any = { status: 'APPROVED' };

    if (city && city !== 'all') {
      query['location.city'] = new RegExp(`^${city}$`, 'i');
    }

    if (listingType) {
      query.listingType = listingType;
    }

    if (category) {
      query.propertyCategory = category;
    }

    if (bhk) {
      const bhkList = Array.isArray(bhk) ? bhk : (bhk as string).split(',');
      query.bhk = { $in: bhkList };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOptions: any = {};
    if (sort === 'price-asc') sortOptions.price = 1;
    else if (sort === 'price-desc') sortOptions.price = -1;
    else if (sort === 'area-desc') sortOptions.carpetArea = -1;
    else sortOptions.createdAt = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [properties, total] = await Promise.all([
      Property.find(query).sort(sortOptions).skip(skip).limit(Number(limit)),
      Property.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/properties/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    // Increment views asynchronously
    property.viewsCount += 1;
    await property.save();

    res.json({ success: true, data: property });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/properties (Authenticated listers)
router.post(
  '/',
  authenticate,
  requireRole('agent', 'broker', 'owner', 'developer', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const property = new Property({
        ...req.body,
        lister: {
          ...req.body.lister,
          userId: req.user?.id,
        },
        status: req.user?.role === 'admin' ? 'APPROVED' : 'PENDING',
      });

      await property.save();
      res.status(201).json({ success: true, data: property });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export const propertyRoutes = router;

