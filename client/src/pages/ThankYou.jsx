import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Printer, Truck, ArrowRight } from 'lucide-react';
import { CopyButton } from '../components/common/CopyButton';
import { useLanguage } from '../context/LanguageContext';

export function ThankYou() {
  const location = useLocation();
  const { t } = useLanguage();

  const order = location.state?.order || {
    orderId: '8921',
    createdAt: new Date().toISOString(),
    status: 'Confirmed & Processing',
    trackingNumber: '98321455',
    carrier: 'Arena Fashion Express',
    estimatedDelivery: '2 to 4 business days',
    subtotal: 14700,
    shipping: 0,
    total: 14700,
    items: [
      {
        id: '001',
        name: '14.5oz Japanese Selvedge Straight Jean',
        size: '32x32',
        price: 8500,
        quantity: 1,
      },
      {
        id: '003',
        name: '500 GSM Heavyweight French Terry Boxy Hoodie',
        size: 'L',
        price: 6200,
        quantity: 1,
      },
    ],
    shippingAddress: {
      fullName: 'Marcus Vance',
      street: 'Didouche Mourad St',
      city: 'Algiers',
      state: 'Algiers',
      zip: '16000',
      country: 'Algeria',
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Thank you Banner */}
      <div className="text-center space-y-3 no-print">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          {t('thankYou.orderConfirmed')}
        </h1>
        <p className="text-xs sm:text-sm text-milano-600 dark:text-milano-400 max-w-md mx-auto">
          {t('thankYou.orderConfirmedDesc')}
        </p>
      </div>

      {/* Printable Receipt Card */}
      <div className="receipt-card p-6 sm:p-8 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-6 shadow-sm">
        
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-milano-200 dark:border-milano-800">
          <div>
            <span className="text-[10px] font-mono uppercase text-milano-500 font-bold block">
              {t('thankYou.invoiceTitle')}
            </span>
            <h2 className="text-xl font-extrabold uppercase text-milano-900 dark:text-white mt-0.5">
              ARENA FASHION
            </h2>
            <div className="text-xs text-milano-500 font-mono mt-1">
              {t('thankYou.orderDate')}: {new Date(order.createdAt).toLocaleDateString()} &bull; Bab Ezzouar, Alger
            </div>
          </div>

          <div className="flex items-center gap-3 no-print">
            <CopyButton text={order.orderId} label={order.orderId} />
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-milano-100 dark:bg-milano-800 hover:bg-milano-200 dark:hover:bg-milano-700 text-xs font-bold text-milano-900 dark:text-white border border-milano-300 dark:border-milano-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('thankYou.printReceipt')}</span>
            </button>
          </div>
        </div>

        {/* Live Order Tracking Timeline Simulation */}
        <div className="p-4 rounded-xl bg-milano-50 dark:bg-milano-950/60 border border-milano-200 dark:border-milano-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-milano-900 dark:text-white">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-500" />
              <span>{order.status}</span>
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {order.orderId}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-2">
            <div className="p-2 rounded bg-white dark:bg-milano-900 border border-emerald-500 font-bold text-emerald-600 dark:text-emerald-400">
              {t('thankYou.step1')}
            </div>
            <div className="p-2 rounded bg-white dark:bg-milano-900 border border-milano-300 dark:border-milano-700 font-bold text-milano-700 dark:text-milano-300">
              {t('thankYou.step2')}
            </div>
            <div className="p-2 rounded bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 text-milano-400">
              {t('thankYou.step3')}
            </div>
          </div>
        </div>

        {/* Items Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-milano-900 dark:text-white">
            {t('thankYou.purchasedItems')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-milano-200 dark:border-milano-800 text-milano-500 font-mono uppercase">
                <th className="py-2">{t('thankYou.itemDesc')}</th>
                <th className="py-2">{t('thankYou.size')}</th>
                <th className="py-2">{t('thankYou.qty')}</th>
                <th className="py-2 text-right">{t('thankYou.price')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-milano-100 dark:divide-milano-800">
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-2.5 font-bold text-milano-900 dark:text-white">{item.name}</td>
                  <td className="py-2.5 font-mono">{item.size}</td>
                  <td className="py-2.5 font-mono">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono font-bold">{(item.price * item.quantity).toLocaleString()} DZD</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-milano-200 dark:border-milano-800 space-y-1.5 text-xs text-milano-600 dark:text-milano-400">
          <div className="flex justify-between">
            <span>{t('thankYou.subtotal')}</span>
            <span className="font-mono font-bold text-milano-900 dark:text-white">{order.subtotal.toLocaleString()} DZD</span>
          </div>
          <div className="flex justify-between">
            <span>{t('thankYou.delivery')}</span>
            <span className="font-mono font-bold text-milano-900 dark:text-white">
              {order.shipping === 0 ? t('cart.free') : `${order.shipping.toLocaleString()} DZD`}
            </span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-milano-900 dark:text-white pt-2 border-t border-milano-100 dark:border-milano-800">
            <span>{t('thankYou.totalPaid')}</span>
            <span className="font-mono">{order.total.toLocaleString()} DZD</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="pt-4 border-t border-milano-200 dark:border-milano-800 text-xs text-milano-600 dark:text-milano-400">
          <h4 className="font-bold text-milano-900 dark:text-white uppercase mb-1">{t('thankYou.destination')}</h4>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
        </div>
      </div>

      {/* Return to shop */}
      <div className="text-center no-print pt-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-extrabold text-xs uppercase tracking-wider shadow-lg"
        >
          <span>{t('thankYou.continueShopping')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
