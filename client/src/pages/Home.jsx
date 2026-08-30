import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const [products, setProducts] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => { if (d.success) setProducts(d.products); })
      .catch(() => {});
  }, []);

  const featured = products.slice(0, 4);

  return (
    <main id="main-content" className="space-y-16 sm:space-y-24">
      
      {/* Hero Section: Editorial & Clean */}
      <section className="relative bg-obsidian text-white overflow-hidden py-20 sm:py-32 border-b border-milano-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-milano-900 border border-milano-700 text-xs uppercase tracking-widest text-milano-300 font-semibold">
              <span>{t('home.heroBadge')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{t('home.heroDrop')}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-none text-white">
              {t('home.heroTitle')}
            </h1>

            <p className="text-base sm:text-lg text-milano-300 leading-relaxed font-normal">
              {t('home.heroSubtitle')}
            </p>

            {/* CTAs Above The Fold */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-lg bg-white text-milano-950 font-extrabold text-xs uppercase tracking-wider hover:bg-milano-100 transition-colors flex items-center gap-2 shadow-lg"
              >
                <span>{t('home.heroExplore')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/stores"
                className="px-6 py-3.5 rounded-lg bg-milano-900 border border-milano-700 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-milano-800 transition-colors flex items-center gap-2"
              >
                <span>{t('home.heroStore')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Background Accent - Pure CSS, no imagery */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_65%)]" />
          <div className="absolute -bottom-28 -right-16 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="hidden lg:block absolute right-12 top-12 w-64 h-64 rounded-3xl border border-white/10 rotate-12" />
          <div className="hidden lg:block absolute right-44 bottom-14 w-40 h-40 rounded-2xl border border-white/10 -rotate-6" />
          <div className="hidden lg:block absolute right-24 top-40 w-24 h-24 rounded-xl border border-amber-500/20 rotate-45" />
        </div>
      </section>

      {/* Featured Apparel & Sneakers Drop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-milano-500">
              {t('home.highlightsTag')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white mt-1">
              {t('home.highlightsTitle')}
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-milano-900 dark:text-white hover:underline"
          >
            <span>{t('home.viewAll')} ({products.length}) {t('home.itemsCount')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group flex flex-col rounded-lg sm:rounded-xl overflow-hidden bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 hover:border-milano-400 dark:hover:border-milano-600 transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-milano-100 dark:bg-milano-950">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded bg-milano-950/80 text-white backdrop-blur-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between space-y-1 sm:space-y-2">
                <div>
                  <span className="hidden sm:inline text-[10px] sm:text-[11px] font-mono uppercase text-milano-500">
                    {product.subcategory}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-milano-900 dark:text-white group-hover:underline line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-milano-500 dark:text-milano-400 line-clamp-1 mt-0.5 hidden sm:block">
                    {product.fit}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-milano-100 dark:border-milano-800">
                  <span className="font-extrabold text-xs sm:text-sm text-milano-900 dark:text-white font-mono">
                    {product.price.toLocaleString()} DZD
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-milano-600 dark:text-milano-400 group-hover:text-milano-900 dark:group-hover:text-white flex items-center gap-1">
                    <span className="hidden sm:inline">{t('home.inspect')}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Physical Store Showcase: ARENA FASHION Bab Ezzouar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-milano-950 text-white overflow-hidden border border-milano-800 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          
          {/* Info Side */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-milano-900 border border-milano-700 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('home.storeBannerBadge')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                {t('home.storeBannerTitle')}
              </h2>

              <p className="text-xs sm:text-sm text-milano-300 leading-relaxed">
                {t('home.storeBannerDesc')}
              </p>

              <div className="space-y-2 text-xs text-milano-300 pt-2 border-t border-milano-800">
                <div className="font-semibold text-white">
                  P5CH+2WP, Boulevard de l'Université, Bab Ezzouar, Alger
                </div>
                <a
                  href="https://wa.me/213552778744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>0552 77 87 44</span>
                  <span className="text-milano-400 font-normal">&bull; Appels &amp; WhatsApp</span>
                </a>
                <div className="text-milano-400">
                  Samedi – Jeudi: 10h00 – 21h00 | Vendredi: 15h00 – 21h00
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.google.com/maps/place/ARENA+Fashion/@36.7201693,3.1796428,20.5z/data=!4m14!1m7!3m6!1s0x128e518d1386423f:0xadf1d053b907d85c!2sP59H%2BXX9,+Bd+de+l%27Universit%C3%A9,+Bab+Ezzouar!3b1!8m2!3d36.7199125!4d3.1799844!3m5!1s0x128e511ce702b63b:0x3e9d6ad1a50113a!8m2!3d36.7200775!4d3.1798196!16s%2Fg%2F11n093gx87?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-white text-milano-950 font-bold text-xs uppercase tracking-wider hover:bg-milano-100 transition-colors"
              >
                {t('home.storeBannerMaps')}
              </a>
              <Link
                to="/stores"
                className="px-5 py-3 rounded-lg border border-milano-600 text-milano-200 text-xs font-bold uppercase tracking-wider hover:bg-milano-900 hover:border-milano-500 transition-colors"
              >
                {t('home.storeBannerGallery')}
              </Link>
            </div>
          </div>

          {/* Photos Side */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2 p-2 bg-milano-900 h-full">
            <div className="relative min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden group">
              <img
                src="/store/Storefront.png"
                alt="Façade ARENA FASHION Bab Ezzouar"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[11px] font-bold text-white">
                {t('home.storeFrontCap')}
              </div>
            </div>
            <div className="relative min-h-[220px] sm:min-h-[280px] rounded-2xl overflow-hidden group">
              <img
                src="/store/Interior_Racks.png"
                alt="Intérieur ARENA FASHION - Jeans, T-Shirts & Sneakers"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-[11px] font-bold text-white">
                {t('home.storeRacksCap')}
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
