import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function Cart() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-milano-100 dark:bg-milano-800 flex items-center justify-center mx-auto text-milano-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold uppercase text-milano-900 dark:text-white">
            {t('cart.emptyTitle')}
          </h1>
          <p className="text-xs text-milano-500 max-w-sm mx-auto">
            {t('cart.emptyDesc')}
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-extrabold text-xs uppercase tracking-wider"
        >
          <span>{t('cart.exploreDrop')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="flex items-center justify-between pb-4 border-b border-milano-200 dark:border-milano-800">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
            {t('cart.bagTitle')} ({items.length})
          </h1>
          <p className="text-xs text-milano-500 mt-0.5">
            {t('cart.bagSubtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-milano-500 hover:text-red-600 transition-colors"
        >
          {t('cart.clearBag')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Item List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="p-4 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-milano-100 dark:bg-milano-950 shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-mono uppercase text-milano-500">
                  {item.category}
                </span>
                <h2 className="font-bold text-sm text-milano-900 dark:text-white truncate">
                  {item.name}
                </h2>
                <div className="text-xs text-milano-500 font-mono">
                  {t('cart.size')}: <span className="font-bold text-milano-900 dark:text-white">{item.size}</span>
                </div>
                <div className="font-extrabold text-sm text-milano-900 dark:text-white font-mono">
                  {item.price.toLocaleString()} DZD
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="p-2.5 text-milano-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center border border-milano-300 dark:border-milano-700 rounded-lg overflow-hidden bg-white dark:bg-milano-900">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="p-2.5 text-milano-500 hover:text-milano-900 dark:hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2.5 text-xs font-mono font-bold text-milano-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="p-2.5 text-milano-500 hover:text-milano-900 dark:hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-6 shadow-sm">
          <h2 className="font-extrabold text-base uppercase tracking-wider text-milano-900 dark:text-white">
            {t('cart.bagTitle')}
          </h2>

          {/* Line Item Totals */}
          <div className="space-y-2.5 text-xs border-t border-milano-100 dark:border-milano-800 pt-4 text-milano-600 dark:text-milano-400">
            <div className="flex justify-between">
              <span>{t('cart.subtotal')}</span>
              <span className="font-mono font-bold text-milano-900 dark:text-white">{subtotal.toLocaleString()} DZD</span>
            </div>

            <div className="flex justify-between">
              <span>{t('cart.delivery')}</span>
              <span className="font-mono font-bold text-milano-900 dark:text-white">
                {shipping === 0 ? t('cart.free') : `${shipping.toLocaleString()} DZD`}
              </span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-milano-900 dark:text-white pt-3 border-t border-milano-100 dark:border-milano-800">
              <span>{t('cart.totalDue')}</span>
              <span className="font-mono">{total.toLocaleString()} DZD</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
          >
            <span>{t('cart.proceedCheckout')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-milano-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('cart.secureBadge')}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
