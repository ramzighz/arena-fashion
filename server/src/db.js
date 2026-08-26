import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PRODUCTS } from './data/catalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

export const db = new Database(path.join(DATA_DIR, 'arena.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    sku TEXT DEFAULT '',
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT DEFAULT '',
    price INTEGER NOT NULL,
    fit TEXT DEFAULT '',
    color TEXT DEFAULT '',
    sizes TEXT NOT NULL,
    stock TEXT DEFAULT '{}',
    inStock INTEGER DEFAULT 1,
    stockCount INTEGER DEFAULT 0,
    images TEXT NOT NULL,
    material TEXT DEFAULT '',
    details TEXT DEFAULT '[]',
    care TEXT DEFAULT '',
    tags TEXT DEFAULT '[]',
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  )
`);

// Migration: add stock column to pre-existing databases
try {
  db.exec(`ALTER TABLE products ADD COLUMN stock TEXT DEFAULT '{}'`);
} catch {
  // column already exists
}

// Backfill: legacy rows get per-size stock = their old single stockCount
const legacyRows = db.prepare(`SELECT id, sizes, stock, stockCount FROM products WHERE stock IS NULL OR stock = '{}' OR stock = ''`).all();
for (const row of legacyRows) {
  const map = {};
  for (const s of JSON.parse(row.sizes)) map[String(s)] = row.stockCount || 0;
  db.prepare('UPDATE products SET stock = ? WHERE id = ?').run(JSON.stringify(map), row.id);
}

const rowToProduct = (row) => {
  const stock = JSON.parse(row.stock || '{}');
  const totalCount = Object.values(stock).reduce((a, b) => a + b, 0);
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory,
    price: row.price,
    fit: row.fit,
    color: row.color,
    sizes: JSON.parse(row.sizes),
    stock,
    inStock: totalCount > 0,
    stockCount: totalCount,
    images: JSON.parse(row.images),
    material: row.material,
    details: JSON.parse(row.details),
    care: row.care,
    tags: JSON.parse(row.tags),
  };
};

export const getAllProducts = () => db.prepare('SELECT * FROM products ORDER BY rowid').all().map(rowToProduct);

export const getProductById = (id) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ? OR LOWER(sku) = LOWER(?)').get(id, id);
  return row ? rowToProduct(row) : null;
};

export const insertProduct = (p) => {
  db.prepare(`
    INSERT INTO products (id, sku, name, category, subcategory, price, fit, color, sizes, stock, inStock, stockCount, images, material, details, care, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    p.id, p.sku, p.name, p.category, p.subcategory, p.price, p.fit, p.color,
    JSON.stringify(p.sizes), JSON.stringify(p.stock), p.inStock ? 1 : 0, p.stockCount,
    JSON.stringify(p.images), p.material, JSON.stringify(p.details), p.care, JSON.stringify(p.tags)
  );
};

export const updateProductRow = (p) => {
  db.prepare(`
    UPDATE products SET sku=?, name=?, category=?, subcategory=?, price=?, fit=?, color=?, sizes=?, stock=?, inStock=?, stockCount=?, images=?, material=?, details=?, care=?, tags=?, updatedAt=datetime('now')
    WHERE id=?
  `).run(
    p.sku, p.name, p.category, p.subcategory, p.price, p.fit, p.color,
    JSON.stringify(p.sizes), JSON.stringify(p.stock), p.inStock ? 1 : 0, p.stockCount,
    JSON.stringify(p.images), p.material, JSON.stringify(p.details), p.care, JSON.stringify(p.tags),
    p.id
  );
};

export const deleteProduct = (id) => db.prepare('DELETE FROM products WHERE id = ?').run(id);

// Atomic stock decrement for an order. All items checked first; if any fails,
// nothing is deducted. Returns { ok: true } or { ok: false, error }.
export const decrementStock = (items) => {
  const checks = [];
  for (const item of items) {
    const p = getProductById(item.id);
    if (!p) return { ok: false, error: `Product ${item.id} is no longer available.` };
    const sizeKey = String(item.size);
    const available = p.stock[sizeKey];
    if (available === undefined) continue; // size not stock-tracked (e.g. "Adjustable")
    if (available < item.quantity) {
      return { ok: false, error: `Size ${sizeKey} of "${p.name}" just sold out.` };
    }
    checks.push({ id: p.id, sizeKey, qty: item.quantity });
  }

  const decrement = db.transaction(() => {
    for (const { id, sizeKey, qty } of checks) {
      const p = getProductById(id);
      const newStock = { ...p.stock, [sizeKey]: p.stock[sizeKey] - qty };
      const total = Object.values(newStock).reduce((a, b) => a + b, 0);
      db.prepare(`UPDATE products SET stock=?, inStock=?, stockCount=?, updatedAt=datetime('now') WHERE id=?`)
        .run(JSON.stringify(newStock), total > 0 ? 1 : 0, total, id);
    }
  });

  try {
    decrement();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: 'Failed to update stock.' };
  }
};

// Seed database from static catalog on first run
const { total } = db.prepare('SELECT COUNT(*) AS total FROM products').get();
if (total === 0) {
  for (const p of PRODUCTS) {
    const stock = {};
    for (const s of p.sizes) stock[String(s)] = p.stockCount || 0;
    insertProduct({ ...p, stock, inStock: (p.stockCount || 0) > 0 });
  }
  console.log(`[Arena Fashion DB] Seeded ${PRODUCTS.length} products into SQLite`);
}
