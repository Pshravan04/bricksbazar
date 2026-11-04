import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../database/models/User';
import { config } from '../../config';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, role, reraNumber, agencyName } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      res.status(400).json({ error: 'User with this email or phone already exists' });
      return;
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      role: role || 'buyer',
      reraNumber,
      agencyName,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        reraNumber: user.reraNumber,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone.toLowerCase() }, { phone: emailOrPhone }],
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email/phone or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email/phone or password' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        reraNumber: user.reraNumber,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const authRoutes = router;

