import { Router, Request, Response } from 'express';
import { Product } from '../../database/models/Product';
import { Supplier } from '../../database/models/Supplier';

const router = Router();

// GET /api/marketplace/products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, brand, inStock } = req.query;
    const query: any = {};

    if (category) query.categorySlug = category;
    if (brand) query.brand = brand;
    if (inStock !== undefined) query.inStock = inStock === 'true';

    const products = await Product.find(query).sort({ inStock: -1, createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/marketplace/products/:slug
router.get('/products/:slug', async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/marketplace/suppliers
router.get('/suppliers', async (_req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find().sort({ rating: -1 });
    res.json({ success: true, data: suppliers });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const marketplaceRoutes = router;

