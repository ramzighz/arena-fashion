import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Upload, Loader2, Shirt } from 'lucide-react';
import { CATEGORIES } from '../../data/catalog.js';

const EMPTY_FORM = {
  name: '', sku: '', category: 'jeans', subcategory: '', price: '',
  fit: '', color: '', sizes: '', stock: {},
  images: [], material: '', details: '', care: '', tags: '',
};

const toForm = (p) => ({
  name: p.name, sku: p.sku || '', category: p.category, subcategory: p.subcategory || '',
  price: String(p.price), fit: p.fit || '', color: p.color || '',
  sizes: p.sizes.join(', '),
  stock: Object.fromEntries(Object.entries(p.stock || {}).map(([k, v]) => [k, String(v)])),
  images: [...p.images], material: p.material || '', details: p.details.join('\n'),
  care: p.care || '', tags: p.tags.join(', '),
});

const toPayload = (f) => ({
  name: f.name.trim(),
  sku: f.sku.trim(),
  category: f.category,
  subcategory: f.subcategory.trim(),
  price: Number(f.price),
  fit: f.fit.trim(),
  color: f.color.trim(),
  sizes: f.sizes.split(',').map((s) => s.trim()).filter(Boolean),
  stock: Object.fromEntries(Object.entries(f.stock).map(([k, v]) => [k, Number(v) || 0])),
  images: f.images.filter(Boolean),
  material: f.material.trim(),
  details: f.details.split('\n').map((s) => s.trim()).filter(Boolean),
  care: f.care.trim(),
  tags: f.tags.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
});

const inputCls = 'w-full p-2 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-xs text-milano-900 dark:text-white';
const labelCls = 'block text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-1';

export function ProductsPanel({ sellerKey }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setSizeStock = (size, v) => setForm((f) => ({ ...f, stock: { ...f.stock, [size]: v } }));
  const sizeList = form ? form.sizes.split(',').map((s) => s.trim()).filter(Boolean) : [];

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const startAdd = () => { setEditingId('new'); setForm({ ...EMPTY_FORM }); setFormError(''); };
  const startEdit = (p) => { setEditingId(p.id); setForm(toForm(p)); setFormError(''); };
  const cancelForm = () => { setEditingId(null); setForm(null); setFormError(''); };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setFormError('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'x-seller-key': sellerKey }, body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setForm((f) => ({ ...f, images: [...f.images, data.url] }));
    } catch (err) {
      setFormError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    const payload = toPayload(form);
    if (!payload.images.length) { setFormError('At least one image is required (upload a file or paste a URL).'); return; }
    setSaving(true);
    try {
      const res = await fetch(editingId === 'new' ? '/api/products' : `/api/products/${editingId}`, {
        method: editingId === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-seller-key': sellerKey },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.details?.map((d) => `${d.field}: ${d.message}`).join(', ') || data.error);
      cancelForm();
      loadProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.name}" permanently?`)) return;
    try {
      const res = await fetch(`/api/products/${p.id}`, { method: 'DELETE', headers: { 'x-seller-key': sellerKey } });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  if (form) {
    return (
      <form onSubmit={handleSave} className="p-5 rounded-xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            {editingId === 'new' ? 'Add Product' : 'Edit Product'}
          </h3>
          <button type="button" onClick={cancelForm} className="p-1.5 text-milano-500 hover:text-milano-900 dark:hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className={labelCls}>Name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className={`${inputCls} bg-white dark:bg-milano-900`}>
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Subcategory</label>
            <input value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)} className={inputCls} placeholder="Slim Fit" />
          </div>
          <div>
            <label className={labelCls}>Price (DZD) *</label>
            <input required type="number" min="1" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Sizes (comma separated) *</label>
            <input required value={form.sizes} onChange={(e) => set('sizes', e.target.value)} className={inputCls} placeholder="S, M, L, XL" />
          </div>
          <div>
            <label className={labelCls}>Color</label>
            <input value={form.color} onChange={(e) => set('color', e.target.value)} className={inputCls} placeholder="Rinsed Indigo" />
          </div>
          {sizeList.length > 0 && (
            <div className="sm:col-span-2">
              <label className={labelCls}>Stock per size *</label>
              <div className="flex flex-wrap gap-2">
                {sizeList.map((size) => (
                  <div key={size} className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-lg border border-milano-300 dark:border-milano-700">
                    <span className="text-xs font-extrabold text-milano-900 dark:text-white uppercase">{size}</span>
                    <input
                      type="number"
                      min="0"
                      value={form.stock[size] ?? '0'}
                      onChange={(e) => setSizeStock(size, e.target.value)}
                      className="w-14 p-1 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-xs text-center text-milano-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="sm:col-span-2">
            <label className={labelCls}>Search tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => set('tags', e.target.value)} className={inputCls} placeholder="jeans, slim, denim" />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className={labelCls}>Images * (upload files or paste URLs)</label>
            {form.images.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <img src={img} alt="" className="w-10 h-10 rounded object-cover bg-milano-100 dark:bg-milano-800 shrink-0" />
                <input value={img} onChange={(e) => setForm((f) => { const images = [...f.images]; images[i] = e.target.value; return { ...f, images }; })} className={inputCls} />
                <button type="button" onClick={() => set('images', form.images.filter((_, j) => j !== i))} className="p-1.5 text-red-500 hover:text-red-700 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800 cursor-pointer">
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                {uploading ? 'Uploading…' : 'Upload image'}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleUpload} className="hidden" disabled={uploading} />
              </label>
              <button type="button" onClick={() => set('images', [...form.images, ''])} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800">
                <Plus className="w-3.5 h-3.5" />
                Add URL
              </button>
            </div>
          </div>
        </div>

        {formError && <p className="text-xs font-bold text-red-600 dark:text-red-400">{formError}</p>}

        <div className="flex gap-2">
          <button type="submit" disabled={saving || uploading} className="px-5 py-2.5 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 text-xs font-extrabold uppercase tracking-wider hover:opacity-90 disabled:opacity-50">
            {saving ? 'Saving…' : editingId === 'new' ? 'Add Product' : 'Save Changes'}
          </button>
          <button type="button" onClick={cancelForm} className="px-5 py-2.5 rounded-lg border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 text-xs font-extrabold uppercase tracking-wider hover:bg-milano-100 dark:hover:bg-milano-800">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-milano-600 dark:text-milano-400">{products.length} products live on the storefront</p>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 text-xs font-extrabold uppercase tracking-wider hover:opacity-90">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {error && <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>}

      <div className="rounded-xl border border-milano-200 dark:border-milano-800 overflow-hidden bg-white dark:bg-milano-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-milano-50 dark:bg-milano-950 text-left text-[10px] uppercase tracking-wider text-milano-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-4 py-8 text-center font-semibold text-milano-500">Loading…</td></tr>
              ) : products.map((p) => (
                <tr key={p.id} className="border-t border-milano-200 dark:border-milano-800">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="w-9 h-9 rounded object-cover bg-milano-100 dark:bg-milano-800 shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded bg-milano-100 dark:bg-milano-800 flex items-center justify-center shrink-0">
                          <Shirt className="w-4 h-4 text-milano-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-milano-900 dark:text-white">{p.name}</p>
                        <p className="text-[10px] text-milano-400 font-mono">{p.sku || p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-milano-600 dark:text-milano-400 capitalize">{p.category}</td>
                  <td className="px-4 py-2.5 font-bold text-milano-900 dark:text-white whitespace-nowrap">{p.price.toLocaleString()} DZD</td>
                  <td className="px-4 py-2.5">
                    {(() => {
                      const entries = Object.entries(p.stock || {});
                      if (entries.length === 0) {
                        return <span className={`font-bold ${p.inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{p.inStock ? 'In stock' : 'Out of stock'}</span>;
                      }
                      const total = entries.reduce((a, [, v]) => a + v, 0);
                      return (
                        <div>
                          <div className="flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[11px]">
                            {entries.map(([size, qty]) => (
                              <span key={size} className={qty === 0 ? 'text-red-500 font-bold' : qty <= 2 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-milano-600 dark:text-milano-400'}>
                                {size}:{qty}
                              </span>
                            ))}
                          </div>
                          {total === 0 ? (
                            <span className="text-[10px] font-bold uppercase text-red-500">Out of stock</span>
                          ) : entries.some(([, v]) => v > 0 && v <= 2) ? (
                            <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Low stock - restock</span>
                          ) : null}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => startEdit(p)} className="p-2 text-milano-500 hover:text-milano-900 dark:hover:text-white" aria-label={`Edit ${p.name}`}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p)} className="p-2 text-milano-500 hover:text-red-600" aria-label={`Delete ${p.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
