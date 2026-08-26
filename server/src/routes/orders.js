import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rateLimit from 'express-rate-limit';
import { validate, OrderCreateSchema, OrderStatusSchema } from '../middleware/validate.js';
import { requireSeller } from '../middleware/seller.js';
import { decrementStock } from '../db.js';
import { notifyNewOrder } from '../services/notify.js';

const router = express.Router();

const trackLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { success: false, error: 'Too many tracking requests. Try again later.' } });
const sellerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15, message: { success: false, error: 'Too many seller requests. Try again later.' } });

// Generate 8-char alphanumeric order ID (e.g., AF-8K3N2P)
function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'AF-';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

// File-backed orders store (DZD currency) - persists across restarts
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORDERS_FILE = path.join(__dirname, '..', '..', 'data', 'orders.json');

const SEED_ORDER = {
  orderId: 'AF-8K3N2P',
  createdAt: '2026-03-09T14:32:00Z',
  items: [
    {
      id: '001',
      name: '14.5oz Japanese Selvedge Straight Jean',
      size: '32x32',
      price: 8500,
      quantity: 1,
    },
    {
      id: '007',
      name: 'Air Max 90 Premium Retro Runner',
      size: 'US 10',
      price: 11800,
      quantity: 1,
    },
  ],
  subtotal: 20300,
  shipping: 0,
  total: 20300,
  status: 'Delivered',
  trackingNumber: '98321455',
  carrier: 'Express Delivery Services',
  shippingAddress: {
    fullName: 'Marcus Vance',
    street: 'Didouche Mourad St',
    city: 'Algiers',
    state: 'Algiers',
    zip: '16000',
    country: 'Algeria',
  },
  contact: {
    email: 'marcus@example.com',
    phone: '+213 555 0144',
  },
  utmSource: 'newsletter',
  utmCampaign: 'spring_streetwear_2026',
};

const loadOrders = () => {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    const seeded = [SEED_ORDER];
    saveOrders(seeded);
    return seeded;
  }
};

const saveOrders = (orders) => {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// POST /api/orders - Create new order
router.post('/', validate(OrderCreateSchema), (req, res) => {
  try {
    const { items, shippingAddress, contact, utmSource, utmCampaign } = req.body;

    // Atomic per-size stock check + decrement - order fails if any size is short
    const stockResult = decrementStock(items.map((i) => ({ id: i.id, size: i.size, quantity: i.quantity })));
    if (!stockResult.ok) {
      return res.status(409).json({ success: false, error: stockResult.error });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 15000 ? 0 : 800; // Free shipping over 15,000 DZD, standard 800 DZD
    const total = subtotal + shipping;

    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      total,
      currency: 'DZD',
      status: 'Pending',
      estimatedDelivery: '2 to 4 business days',
      shippingAddress,
      contact,
      utmSource: utmSource || 'direct',
      utmCampaign: utmCampaign || 'organic',
    };

    const orders = loadOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    // Fire-and-forget seller notification (Telegram / WhatsApp)
    notifyNewOrder(newOrder).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order: newOrder,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to process order.' });
  }
});

// DELETE /api/orders/:orderId - Seller: permanently delete an order
router.delete('/:orderId', sellerLimiter, requireSeller, (req, res) => {
  const { orderId } = req.params;
  const orders = loadOrders();
  const idx = orders.findIndex((o) => o.orderId.toLowerCase() === orderId.toLowerCase());
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Order not found with provided reference.' });
  }
  const [removed] = orders.splice(idx, 1);
  saveOrders(orders);
  return res.json({ success: true, message: `Deleted ${removed.orderId}` });
});

// GET /api/orders/track/:orderId - Order lookup
router.get('/track/:orderId', trackLimiter, (req, res) => {
  const { orderId } = req.params;
  const order = loadOrders().find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());

  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found with provided reference.' });
  }

  return res.json({
    success: true,
    order,
  });
});

// PATCH /api/orders/:orderId/status - Seller status management (COD workflow)
router.patch('/:orderId/status', sellerLimiter, requireSeller, validate(OrderStatusSchema), (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const orders = loadOrders();
  const order = orders.find((o) => o.orderId.toLowerCase() === orderId.toLowerCase());

  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found with provided reference.' });
  }

  order.status = status;
  order.statusUpdatedAt = new Date().toISOString();
  saveOrders(orders);

  return res.json({ success: true, order });
});

// GET /api/orders - Seller dashboard list (protected)
router.get('/', sellerLimiter, requireSeller, (req, res) => {
  const orders = loadOrders();
  return res.json({
    success: true,
    totalOrders: orders.length,
    orders,
  });
});

export default router;
