import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw, ChevronDown, Package, Lock, LogOut, Shirt, Trash2 } from 'lucide-react';
import { ProductsPanel } from '../components/seller/ProductsPanel';

const STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_STYLES = {
  Pending: 'bg-amber-400 text-amber-950',
  Confirmed: 'bg-blue-500 text-white',
  Shipped: 'bg-violet-500 text-white',
  Delivered: 'bg-emerald-500 text-white',
  Cancelled: 'bg-red-500 text-white',
};

const fmtDZD = (n) => `${n.toLocaleString('fr-DZ')} DZD`;
const fmtDate = (iso) => new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const isSameDay = (iso, ref) => {
  const d = new Date(iso);
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth() && d.getDate() === ref.getDate();
};

export function Seller() {
  const [sellerKey, setSellerKey] = useState(() => sessionStorage.getItem('sellerKey') || '');
  const [unlocked, setUnlocked] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [tab, setTab] = useState('orders');

  const loadOrders = async (key) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', { headers: { 'x-seller-key': key } });
      if (res.status === 401) {
        setAuthError('Incorrect password');
        setUnlocked(false);
        sessionStorage.removeItem('sellerKey');
        setSellerKey('');
        setOrders([]);
        return false;
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to load orders');
      setOrders(data.orders);
      setAuthError('');
      setUnlocked(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerKey) loadOrders(sellerKey);
  }, []);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!keyInput) return;
    const ok = await loadOrders(keyInput);
    if (ok) {
      sessionStorage.setItem('sellerKey', keyInput);
      setSellerKey(keyInput);
      setKeyInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sellerKey');
    setSellerKey('');
    setUnlocked(false);
    setOrders([]);
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm(`Permanently delete order ${orderId}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'x-seller-key': sellerKey },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    } catch (err) {
      setError(`Failed to delete ${orderId}: ${err.message}`);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-seller-key': sellerKey },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setOrders((prev) => prev.map((o) => (o.orderId === orderId ? data.order : o)));
    } catch (err) {
      setError(`Failed to update ${orderId}: ${err.message}`);
    }
  };

  const filtered = useMemo(() => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    if (to) to.setHours(23, 59, 59, 999);
    return orders.filter((o) => {
      if (statusFilter !== 'All' && o.status !== statusFilter) return false;
      const d = new Date(o.createdAt);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }, [orders, statusFilter, fromDate, toDate]);

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    const acc = { today: { count: 0, revenue: 0 }, week: { count: 0, revenue: 0 }, month: { count: 0, revenue: 0 }, byStatus: {} };
    for (const s of STATUSES) acc.byStatus[s] = 0;
    for (const o of orders) {
      acc.byStatus[o.status] = (acc.byStatus[o.status] || 0) + 1;
      if (isSameDay(o.createdAt, now)) { acc.today.count++; acc.today.revenue += o.total; }
      if (new Date(o.createdAt) >= weekStart) { acc.week.count++; acc.week.revenue += o.total; }
      if (new Date(o.createdAt) >= monthStart) { acc.month.count++; acc.month.revenue += o.total; }
    }
    return acc;
  }, [orders]);

  const filteredRevenue = filtered.reduce((sum, o) => sum + o.total, 0);

  if (!unlocked) {
    return (
      <main className="max-w-md mx-auto px-4 py-24">
        <form onSubmit={handleUnlock} className="p-8 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4 text-center">
          <Lock className="w-8 h-8 mx-auto text-milano-900 dark:text-white" />
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-milano-900 dark:text-white">Seller Access</h1>
          <p className="text-xs font-semibold text-milano-500">Enter the seller password to view orders.</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-sm text-milano-900 dark:text-white text-center"
          />
          {authError && <p className="text-xs font-bold text-red-600 dark:text-red-400">{authError}</p>}
          {error && <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 text-xs font-extrabold uppercase tracking-wider hover:opacity-90 disabled:opacity-50">
            {loading ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    );
  }

  const StatCard = ({ label, count, revenue }) => (
    <div className="p-4 rounded-xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800">
      <p className="text-[10px] font-bold uppercase tracking-wider text-milano-500">{label}</p>
      <p className="text-2xl font-extrabold text-milano-900 dark:text-white mt-1">{count}</p>
      <p className="text-xs font-semibold text-milano-600 dark:text-milano-400">{fmtDZD(revenue)}</p>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-milano-200 dark:border-milano-800">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-milano-900 dark:text-white" />
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-milano-900 dark:text-white">Seller Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => loadOrders(sellerKey)} disabled={loading} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800 disabled:opacity-50">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={handleLogout} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800">
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setTab('orders')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors ${tab === 'orders' ? 'bg-milano-900 dark:bg-white text-white dark:text-milano-900' : 'border border-milano-300 dark:border-milano-700 text-milano-600 dark:text-milano-400 hover:bg-milano-100 dark:hover:bg-milano-800'}`}
        >
          <Package className="w-4 h-4" />
          Orders
        </button>
        <button
          onClick={() => setTab('products')}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors ${tab === 'products' ? 'bg-milano-900 dark:bg-white text-white dark:text-milano-900' : 'border border-milano-300 dark:border-milano-700 text-milano-600 dark:text-milano-400 hover:bg-milano-100 dark:hover:bg-milano-800'}`}
        >
          <Shirt className="w-4 h-4" />
          Products
        </button>
      </div>

      {tab === 'products' && <ProductsPanel sellerKey={sellerKey} />}

      {tab === 'orders' && (
      <>
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-xs font-semibold text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Today" count={stats.today.count} revenue={stats.today.revenue} />
        <StatCard label="This Week" count={stats.week.count} revenue={stats.week.revenue} />
        <StatCard label="This Month" count={stats.month.count} revenue={stats.month.revenue} />
        <div className="p-4 rounded-xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800">
          <p className="text-[10px] font-bold uppercase tracking-wider text-milano-500">By Status</p>
          <div className="grid grid-cols-2 gap-x-3 mt-1.5 text-[11px] font-semibold">
            {STATUSES.map((s) => (
              <span key={s} className={s === 'Pending' ? 'text-amber-600 dark:text-amber-400' : 'text-milano-600 dark:text-milano-400'}>
                {stats.byStatus[s] || 0} {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 flex-wrap">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-1">Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-xs font-semibold p-2 rounded border border-milano-300 dark:border-milano-700 bg-white dark:bg-milano-900 text-milano-900 dark:text-white">
            <option>All</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-1">From</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="text-xs p-2 rounded border border-milano-300 dark:border-milano-700 bg-white dark:bg-milano-900 text-milano-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-1">To</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="text-xs p-2 rounded border border-milano-300 dark:border-milano-700 bg-white dark:bg-milano-900 text-milano-900 dark:text-white" />
        </div>
        {(statusFilter !== 'All' || fromDate || toDate) && (
          <button onClick={() => { setStatusFilter('All'); setFromDate(''); setToDate(''); }} className="text-xs font-bold underline text-milano-600 dark:text-milano-400 pb-2">
            Clear
          </button>
        )}
        <p className="ml-auto text-xs font-bold text-milano-600 dark:text-milano-400 pb-2">
          {filtered.length} order{filtered.length !== 1 ? 's' : ''} &middot; {fmtDZD(filteredRevenue)}
        </p>
      </div>

      <div className="rounded-xl border border-milano-200 dark:border-milano-800 overflow-hidden bg-white dark:bg-milano-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-milano-50 dark:bg-milano-950 text-left text-[10px] uppercase tracking-wider text-milano-500">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && orders.length === 0 ? (
                <tr><td colSpan="6" className="px-4 py-8 text-center font-semibold text-milano-500">Loading orders…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="px-4 py-8 text-center font-semibold text-milano-500">No orders match these filters.</td></tr>
              ) : (
                filtered.map((o) => (
                  <React.Fragment key={o.orderId}>
                    <tr
                      onClick={() => setExpandedId(expandedId === o.orderId ? null : o.orderId)}
                      className="border-t border-milano-200 dark:border-milano-800 cursor-pointer hover:bg-milano-50 dark:hover:bg-milano-950/60"
                    >
                      <td className="px-4 py-3 font-bold text-milano-900 dark:text-white whitespace-nowrap">
                        <span className={`inline-block mr-1 transition-transform ${expandedId === o.orderId ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-3 h-3 inline" />
                        </span>
                        {o.orderId}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-milano-900 dark:text-white">{o.shippingAddress.fullName}</p>
                        <p className="text-milano-500">{o.contact.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-milano-600 dark:text-milano-400">
                        {o.items.reduce((n, i) => n + i.quantity, 0)} item{o.items.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''}
                      </td>
                      <td className="px-4 py-3 font-bold text-milano-900 dark:text-white whitespace-nowrap">{fmtDZD(o.total)}</td>
                      <td className="px-4 py-3 text-milano-500 whitespace-nowrap">{fmtDate(o.createdAt)}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <select
                            value={STATUSES.includes(o.status) ? o.status : STATUSES[0]}
                            onChange={(e) => updateStatus(o.orderId, e.target.value)}
                            className={`text-[11px] font-bold p-1.5 rounded-md border-0 cursor-pointer ${STATUS_STYLES[o.status] || STATUS_STYLES.Pending}`}
                          >
                            {!STATUSES.includes(o.status) && <option className="bg-white text-milano-900">{o.status}</option>}
                            {STATUSES.map((s) => <option key={s} className="bg-white text-milano-900">{s}</option>)}
                          </select>
                          <button
                            onClick={() => deleteOrder(o.orderId)}
                            className="p-1.5 text-milano-400 hover:text-red-600 transition-colors"
                            aria-label={`Delete order ${o.orderId}`}
                            title="Delete order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === o.orderId && (
                      <tr className="border-t border-milano-200 dark:border-milano-800 bg-milano-50/60 dark:bg-milano-950/60">
                        <td colSpan="6" className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-2">Items</p>
                              <ul className="space-y-1.5">
                                {o.items.map((i, idx) => (
                                  <li key={idx} className="flex justify-between gap-3 text-milano-700 dark:text-milano-300">
                                    <span>{i.name} <span className="text-milano-400">(Size: {String(i.size)}) ×{i.quantity}</span></span>
                                    <span className="font-semibold whitespace-nowrap">{fmtDZD(i.price * i.quantity)}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-2 pt-2 border-t border-milano-200 dark:border-milano-800 text-milano-600 dark:text-milano-400">
                                Subtotal {fmtDZD(o.subtotal)} + Shipping {fmtDZD(o.shipping)} = <strong className="text-milano-900 dark:text-white">{fmtDZD(o.total)}</strong>
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-2">Delivery Address</p>
                              <p className="text-milano-700 dark:text-milano-300 leading-relaxed">
                                {o.shippingAddress.fullName}<br />
                                {o.shippingAddress.street}<br />
                                {o.shippingAddress.city}, {o.shippingAddress.state}<br />
                                {o.shippingAddress.country}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-milano-500 mb-2">Contact & Meta</p>
                              <p className="text-milano-700 dark:text-milano-300 leading-relaxed">
                                Phone: {o.contact.phone}
                                {o.contact.email && (<><br />Email: {o.contact.email}</>)}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

    </main>
  );
}
