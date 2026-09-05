import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-milano-100 dark:bg-milano-900 border border-milano-200 dark:border-milano-800 text-xs font-bold uppercase tracking-wider text-milano-900 dark:text-white">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t('contact.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          {t('contact.title')}
        </h1>
        <p className="text-xs sm:text-sm text-milano-600 dark:text-milano-400 leading-relaxed">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* WhatsApp Only Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-700/50 space-y-5 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-full bg-emerald-500/15 text-emerald-400">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h2 className="font-extrabold text-base uppercase tracking-wider text-white">
            Contact Us on WhatsApp
          </h2>
          <p className="text-xs text-milano-300 leading-relaxed max-w-xs">
            For sizing advice, stock availability, order follow-up, and all inquiries — message us directly. Fast replies during store hours.
          </p>
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm uppercase tracking-wider transition-colors shadow-lg inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>(555) 123-4567</span>
          </a>
        </div>

        {/* Store Address */}
        <div className="p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4 shadow-sm">
          <h2 className="font-extrabold text-sm uppercase tracking-wider text-milano-900 dark:text-white">
            {t('contact.storeLabel')}
          </h2>
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-milano-900 dark:text-white block">
                123 Main Street, Suite 100, Your City, ST 12345
              </span>
              <a
                href="https://www.google.com/maps/place/Your+Business/@0,0,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-milano-600 dark:text-milano-400 hover:underline mt-1"
              >
                <span>{t('contact.viewGmaps')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-bold text-xs uppercase tracking-wider"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp the Store</span>
          </a>
        </div>

      </div>
    </main>
  );
}
