import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

// Sanitize string to prevent XSS attacks
export const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return sanitizeHtml(input.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (typeof input === 'object' && input !== null) {
    if (Array.isArray(input)) {
      return input.map(sanitizeInput);
    }
    const cleanObj = {};
    for (const key of Object.keys(input)) {
      cleanObj[key] = sanitizeInput(input[key]);
    }
    return cleanObj;
  }
  return input;
};

// Express middleware for sanitizing req.body and req.query
export const sanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  next();
};

// Zod schemas for validation
export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(60),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const OrderCreateSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.union([z.string(), z.number()]),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
      image: z.string().optional(),
    })
  ).min(1, 'Order must contain at least 1 item'),
  shippingAddress: z.object({
    fullName: z.string().min(2),
    street: z.string().min(3),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
  }),
  contact: z.object({
    phone: z.string().min(7),
  }),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export const OrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});

export const ProductSchema = z.object({
  sku: z.string().optional().default(''),
  name: z.string().min(2),
  category: z.string().min(2),
  subcategory: z.string().optional().default(''),
  price: z.number().positive(),
  fit: z.string().optional().default(''),
  color: z.string().optional().default(''),
  sizes: z.array(z.union([z.string(), z.number()])).min(1, 'At least one size required'),
  stock: z.record(z.string(), z.number().min(0)).optional().default({}),
  inStock: z.boolean().optional().default(true),
  stockCount: z.number().int().min(0).optional().default(0),
  images: z.array(z.string().min(4)).min(1, 'At least one image required'),
  material: z.string().optional().default(''),
  details: z.array(z.string()).optional().default([]),
  care: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
});

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: err.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
      });
    }
    next(err);
  }
};
