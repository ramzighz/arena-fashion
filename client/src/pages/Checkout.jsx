import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, RefreshCw, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function Checkout() {
  const { items, subtotal, shipping, total, clearCart, utmParams } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    country: 'Algeria',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-milano-900 dark:text-white">{t('cart.emptyTitle')}</h2>
        <Link to="/shop" className="text-xs font-bold uppercase underline">
          {t('checkout.returnBag')}
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderPayload = {
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        size: i.size,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      shippingAddress: {
        fullName: shippingForm.fullName,
        street: shippingForm.street,
        city: shippingForm.city,
        state: shippingForm.state,
        country: shippingForm.country,
      },
      contact: {
        phone: shippingForm.phone,
      },
      utmSource: utmParams?.utmSource || 'direct',
      utmCampaign: utmParams?.utmCampaign || 'organic',
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Checkout failed');
      }

      clearCart();
      navigate('/thank-you', { state: { order: data.order } });
    } catch (err) {
      setError(err.message || 'Order processing failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      <div className="flex items-center justify-between pb-4 border-b border-milano-200 dark:border-milano-800">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-milano-600 dark:text-milano-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>{t('checkout.returnBag')}</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-milano-500">
          <Lock className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t('checkout.sslSecure')}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Shipping Information */}
          <div className="p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-milano-900 dark:text-white">
              {t('checkout.destinationTitle')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-milano-700 dark:text-milano-300">{t('checkout.fullName')}</label>
                <input
                  type="text"
                  required
                  placeholder="Yacine Belkacem"
                  value={shippingForm.fullName}
                  onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                  className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white placeholder:text-milano-400 dark:placeholder:text-milano-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-milano-700 dark:text-milano-300">{t('checkout.streetAddress')}</label>
                <input
                  type="text"
                  required
                  placeholder="45 Rue Didouche Mourad"
                  value={shippingForm.street}
                  onChange={(e) => setShippingForm({ ...shippingForm, street: e.target.value })}
                  className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white placeholder:text-milano-400 dark:placeholder:text-milano-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-milano-700 dark:text-milano-300">{t('checkout.cityWilaya')}</label>
                <input
                  type="text"
                  required
                  placeholder="Oran"
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white placeholder:text-milano-400 dark:placeholder:text-milano-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-milano-700 dark:text-milano-300">{t('checkout.stateRegion')}</label>
                <input
                  type="text"
                  required
                  placeholder="Constantine"
                  value={shippingForm.state}
                  onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                  className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white placeholder:text-milano-400 dark:placeholder:text-milano-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-milano-700 dark:text-milano-300">{t('checkout.phone')}</label>
                <input
                  type="tel"
                  required
                  placeholder="0661234567"
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  className="w-full p-2.5 rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white placeholder:text-milano-400 dark:placeholder:text-milano-500"
                />
              </div>
            </div>
          </div>

          {/* Payment: Cash on Delivery */}
          <div className="p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-3">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-milano-900 dark:text-white">
              {t('checkout.paymentTitle')}
            </h2>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <Banknote className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {t('checkout.codOnly')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4 shadow-sm">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-milano-900 dark:text-white">
              {t('checkout.orderSummary')} ({items.length})
            </h3>

            <div className="divide-y divide-milano-100 dark:divide-milano-800 max-h-60 overflow-y-auto space-y-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="pt-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-milano-900 dark:text-white">{item.name}</span>
                    <div className="text-milano-500 font-mono">
                      {t('cart.size')}: {item.size} &bull; {t('checkout.qty')}: {item.quantity}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-milano-900 dark:text-white">
                    {(item.price * item.quantity).toLocaleString()} DZD
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-milano-100 dark:border-milano-800 pt-4 text-milano-600 dark:text-milano-400">
              <div className="flex justify-between">
                <span>{t('checkout.subtotal')}</span>
                <span className="font-mono font-bold text-milano-900 dark:text-white">{subtotal.toLocaleString()} DZD</span>
              </div>
              <div className="flex justify-between">
                <span>{t('checkout.expressDelivery')}</span>
                <span className="font-mono font-bold text-milano-900 dark:text-white">
                  {shipping === 0 ? t('cart.free') : `${shipping.toLocaleString()} DZD`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-milano-900 dark:text-white pt-2 border-t border-milano-100 dark:border-milano-800">
                <span>{t('checkout.totalDue')}</span>
                <span className="font-mono">{total.toLocaleString()} DZD</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('checkout.processing')}</span>
                </>
              ) : (
                <span>{t('checkout.completePurchase')} ({total.toLocaleString()} DZD)</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
