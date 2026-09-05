import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validate, RegisterSchema, LoginSchema } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { strictLimiter } from '../config/security.js';

const router = express.Router();
const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    console.error('[FATAL] JWT_SECRET is not set in environment.');
    return null;
  }
  return process.env.JWT_SECRET;
};
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// In-memory secure users store (with pre-seeded admin)
// Passwords hashed with bcrypt (salt rounds 10)
const salt = bcrypt.genSaltSync(10);
const USERS = [
  {
    id: 'usr-admin-01',
    name: 'Your Business Name Admin',
    email: process.env.ADMIN_EMAIL || 'admin@yourbusiness.com',
    passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'changeme', salt),
    role: 'admin',
    createdAt: '2026-01-01T00:00:00Z',
  },
];

export const validateAdminConfig = () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error('[FATAL] ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment.');
    process.exit(1);
  }
};

// Helper to sign JWT
const signToken = (user) => {
  const secret = getJwtSecret();
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    secret,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// POST /api/auth/register
router.post('/register', strictLimiter, validate(RegisterSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    USERS.push(newUser);
    const token = signToken(newUser);

    // Set secure HttpOnly cookie
    res.cookie('arena_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'Account successfully registered.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Registration failed. Please retry.' });
  }
});

// POST /api/auth/login
router.post('/login', strictLimiter, validate(LoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password.',
      });
    }

    const token = signToken(user);

    res.cookie('arena_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: 'Welcome back to Your Business Name.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Login service encountered an issue.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User profile not found.' });
  }
  return res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('arena_jwt');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
