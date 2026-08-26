import express from 'express';
import { randomBytes } from 'node:crypto';
import { validate, ProductSchema } from '../middleware/validate.js';
import { requireSeller } from '../middleware/seller.js';
import { getAllProducts, getProductById, insertProduct, updateProductRow, deleteProduct } from '../db.js';
import { CATEGORIES, STYLE_GUIDES, STORE_LOCATIONS } from '../data/catalog.js';

const router = express.Router();

// GET /api/products - Public: all products (storefront reads from here)
router.get('/', (req, res) => {
  let list = getAllProducts();
  const { category, search, minPrice, maxPrice, sort, inStock } = req.query;

  if (category && category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (minPrice) list = list.filter((p) => p.price >= parseFloat(minPrice));
  if (maxPrice) list = list.filter((p) => p.price <= parseFloat(maxPrice));
  if (inStock === 'true') list = list.filter((p) => p.inStock);

  if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);

  return res.json({ success: true, total: list.length, products: list });
});

// GET /api/products/categories
router.get('/categories', (req, res) => {
  return res.json({ success: true, categories: CATEGORIES });
});

// GET /api/products/guides
router.get('/guides', (req, res) => {
  return res.json({ success: true, guides: STYLE_GUIDES });
});

// GET /api/products/stores
router.get('/stores', (req, res) => {
  return res.json({ success: true, stores: STORE_LOCATIONS });
});

// POST /api/products - Seller: create product
router.post('/', requireSeller, validate(ProductSchema), (req, res) => {
  const stock = {};
  for (const s of req.body.sizes) stock[String(s)] = Number(req.body.stock?.[String(s)] ?? 0);
  const total = Object.values(stock).reduce((a, b) => a + b, 0);
  const product = {
    ...req.body,
    stock,
    stockCount: total,
    inStock: total > 0,
    id: `arena-${randomBytes(3).toString('hex')}`,
  };
  insertProduct(product);
  return res.status(201).json({ success: true, product });
});

// PUT /api/products/:id - Seller: update product
router.put('/:id', requireSeller, validate(ProductSchema), (req, res) => {
  const existing = getProductById(req.params.id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Product not found.' });
  }
  const stock = {};
  for (const s of req.body.sizes) stock[String(s)] = Number(req.body.stock?.[String(s)] ?? 0);
  const total = Object.values(stock).reduce((a, b) => a + b, 0);
  const product = { ...req.body, stock, stockCount: total, inStock: total > 0, id: existing.id };
  updateProductRow(product);
  return res.json({ success: true, product });
});

// DELETE /api/products/:id - Seller: delete product
router.delete('/:id', requireSeller, (req, res) => {
  const existing = getProductById(req.params.id);
  if (!existing) {
    return res.status(404).json({ success: false, error: 'Product not found.' });
  }
  deleteProduct(existing.id);
  return res.json({ success: true, message: `Deleted ${existing.name}` });
});

// GET /api/products/:id - Public: single product + related (keep LAST to avoid conflicts)
router.get('/:id', (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found in the current collection.' });
  }
  const related = getAllProducts().filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  return res.json({ success: true, product, related });
});

export default router;
