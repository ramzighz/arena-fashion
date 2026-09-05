import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, MessageCircle, Image } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/catalog.js';
import { useLanguage } from '../context/LanguageContext';

export function StoreLocator() {
  const store = STORE_LOCATIONS[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t } = useLanguage();

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-milano-100 dark:bg-milano-900 border border-milano-200 dark:border-milano-800 text-xs font-bold uppercase tracking-wider text-milano-900 dark:text-white">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t('stores.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          {t('stores.title')}
        </h1>
        <p className="text-xs sm:text-sm text-milano-600 dark:text-milano-400 leading-relaxed">
          {t('stores.subtitle')}
        </p>
      </div>

      {/* Store Photos Gallery Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
          {t('stores.photosTitle')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Large Display */}
          <div className="lg:col-span-8 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-milano-100 dark:bg-milano-800 border-2 border-dashed border-milano-300 dark:border-milano-600 relative group shadow-lg flex flex-col items-center justify-center text-milano-400 dark:text-milano-500">
            <Image className="w-16 h-16 mb-3 opacity-50" />
            <p className="text-sm font-semibold">{store.images[activeImageIndex].caption}</p>
            <p className="text-xs mt-1 opacity-70">Replace with your store photo</p>
          </div>

          {/* Thumbnails list */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {store.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-1 lg:flex-initial flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all text-left ${
                  activeImageIndex === idx
                    ? 'border-milano-900 dark:border-white bg-white dark:bg-milano-900 shadow-md'
                    : 'border-transparent bg-milano-50 dark:bg-milano-950 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-20 h-16 rounded-lg bg-milano-200 dark:bg-milano-700 shrink-0 flex items-center justify-center">
                  <Image className="w-6 h-6 text-milano-400" />
                </div>
                <div className="hidden sm:block min-w-0">
                  <span className="text-xs font-bold text-milano-900 dark:text-white line-clamp-1">
                    {img.caption}
                  </span>
                  <span className="text-[10px] text-milano-500 font-mono">
                    Photo {idx + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Store Information and Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Store Details Card (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-6 shadow-sm">
          <div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider">
              {t('stores.storeOpen')}
            </span>
            <h2 className="text-xl font-extrabold uppercase text-milano-900 dark:text-white mt-2">
              {store.name}
            </h2>
            <p className="text-xs text-milano-500 font-medium">
              {store.tagline}
            </p>
          </div>

          <div className="space-y-4 text-xs text-milano-700 dark:text-milano-300 border-t border-milano-100 dark:border-milano-800 pt-4">
            
            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono uppercase text-[10px] text-milano-500 block">{t('stores.addressLabel')}</span>
                <span className="font-bold text-milano-900 dark:text-white block mt-0.5">
                  {store.address}
                </span>
                <span className="text-milano-500 text-[11px] block mt-0.5">
                  {t('stores.addressOpposite')}
                </span>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono uppercase text-[10px] text-milano-500 block">{t('stores.phoneLabel')}</span>
                <div className="flex items-center gap-3 mt-0.5">
                  <a
                    href={`tel:${store.phone}`}
                    className="font-bold text-sm text-milano-900 dark:text-white hover:underline"
                  >
                    {store.phoneFormatted}
                  </a>
                  <a
                    href={`https://wa.me/${store.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono uppercase text-[10px] text-milano-500 block">{t('stores.hoursLabel')}</span>
                <span className="font-semibold text-milano-900 dark:text-white block mt-0.5">
                  {t('stores.hoursText')}
                </span>
              </div>
            </div>

            {/* Transit */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono uppercase text-[10px] text-milano-500 block">{t('stores.transitLabel')}</span>
                <span className="text-milano-600 dark:text-milano-400 block mt-0.5">
                  {t('stores.transitText')}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Store Map Visual & Services (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Map Visual */}
          <div className="p-6 rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-milano-900 dark:text-white">
                {t('stores.locationTitle')}
              </h3>
              <span className="text-xs font-mono text-milano-500">
                Code Plus: YOUR-CODE
              </span>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-milano-950 border border-milano-800 flex items-center justify-center text-white">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 text-center space-y-2 p-6">
                <div className="w-12 h-12 rounded-full bg-white text-milano-950 mx-auto flex items-center justify-center font-bold text-lg shadow-xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base uppercase text-white tracking-wide">
                  YOUR BUSINESS NAME
                </h4>
                <p className="text-xs text-milano-300 max-w-sm">
                  {store.address}
                </p>
                <div className="pt-2">
                  <a
                    href={store.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-milano-800 hover:bg-milano-700 text-xs font-bold uppercase tracking-wider text-white border border-milano-700 shadow"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('stores.openMaps')}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* In-store Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-milano-50 dark:bg-milano-800/60 border border-milano-100 dark:border-milano-700">
                <h4 className="font-bold text-milano-900 dark:text-white uppercase">{t('stores.fittingService')}</h4>
                <p className="text-milano-500 mt-1">{t('stores.fittingServiceDesc')}</p>
              </div>
              <div className="p-3 rounded-lg bg-milano-50 dark:bg-milano-800/60 border border-milano-100 dark:border-milano-700">
                <h4 className="font-bold text-milano-900 dark:text-white uppercase">{t('stores.sneakerService')}</h4>
                <p className="text-milano-500 mt-1">{t('stores.sneakerServiceDesc')}</p>
              </div>
              <div className="p-3 rounded-lg bg-milano-50 dark:bg-milano-800/60 border border-milano-100 dark:border-milano-700">
                <h4 className="font-bold text-milano-900 dark:text-white uppercase">{t('stores.pickupService')}</h4>
                <p className="text-milano-500 mt-1">{t('stores.pickupServiceDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
