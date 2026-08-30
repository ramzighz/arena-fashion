import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Truck, CheckCircle, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [stockError, setStockError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setProduct(null);
    setNotFound(false);
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const found = d.success ? d.products.find((p) => p.id === id || p.sku.toLowerCase() === id?.toLowerCase()) : null;
        if (found) {
          setProduct(found);
          setSelectedImage(0);
          setSelectedSize(found.sizes[0] || '');
          setQuantity(1);
          window.scrollTo(0, 0);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => { if (!cancelled) setNotFound(true); });
    return () => { cancelled = true; };
  }, [id]);

  if (notFound) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-milano-900 dark:text-white">Style Not Found</h2>
        <p className="text-xs text-milano-500">The requested apparel item is not in the current active drop.</p>
        <Link to="/shop" className="inline-block px-4 py-2 rounded bg-milano-900 text-white dark:bg-white dark:text-milano-900 font-bold text-xs uppercase">
          Return to Collection
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-milano-500">Loading style…</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    setStockError('');
    
    const stock = product.stock?.[selectedSize];
    if (stock !== undefined && stock < quantity) {
      setStockError(stock === 0 
        ? `${selectedSize} is out of stock right now.`
        : `Only ${stock} left in size ${selectedSize}.`
      );
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 lg:pb-8 pb-24">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-milano-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-milano-900 dark:hover:text-white">{t('product.breadcrumbHome')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-milano-900 dark:hover:text-white">{t('product.breadcrumbShop')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-milano-900 dark:hover:text-white uppercase font-semibold">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-milano-900 dark:text-white font-bold truncate max-w-xs">{language === 'fr' ? product.nameFr : product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-milano-100 dark:bg-milano-950 border border-milano-200 dark:border-milano-800">
            <img
              src={product.images[selectedImage]}
              alt={`${language === 'fr' ? product.nameFr : product.name} - detailed view`}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-milano-900 dark:border-white scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Product Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2 border-b border-milano-200 dark:border-milano-800 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-milano-500">
              {product.subcategory}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
              {language === 'fr' ? product.nameFr : product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-extrabold text-milano-900 dark:text-white font-mono">
                {product.price.toLocaleString()} DZD
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-milano-900 dark:text-white">
                {t('product.selectSize')}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => {
                const qty = product.stock?.[String(size)];
                const soldOut = qty !== undefined && qty <= 0;
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={soldOut}
                    onClick={() => { setSelectedSize(size); setStockError(''); }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      soldOut
                        ? 'bg-milano-50 dark:bg-milano-950 text-milano-300 dark:text-milano-600 line-through cursor-not-allowed'
                        : selectedSize === size
                          ? 'bg-milano-900 dark:bg-white text-white dark:text-milano-900 ring-2 ring-milano-900 dark:ring-white'
                          : 'bg-milano-100 dark:bg-milano-800 text-milano-800 dark:text-milano-200 hover:bg-milano-200 dark:hover:bg-milano-700'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add To Bag */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-milano-300 dark:border-milano-700 rounded-lg overflow-hidden bg-white dark:bg-milano-900">
                <button
                  type="button"
                  onClick={() => { setQuantity(Math.max(1, quantity - 1)); setStockError(''); }}
                  className="p-3 text-milano-500 hover:text-milano-900 dark:hover:text-white"
                  aria-label={t('product.decreaseQty')}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold font-mono text-milano-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => { setQuantity(quantity + 1); setStockError(''); }}
                  className="p-3 text-milano-500 hover:text-milano-900 dark:hover:text-white"
                  aria-label={t('product.increaseQty')}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3 px-6 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{t('product.addToBag')} ({(product.price * quantity).toLocaleString()} DZD)</span>
              </button>
            </div>

            {addedToast && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>{t('product.addedToast')} {quantity}x {language === 'fr' ? product.nameFr : product.name} ({selectedSize}) {t('product.toBag')}</span>
                </span>
                <Link to="/cart" className="underline font-bold">
                  {t('product.viewBag')}
                </Link>
              </div>
            )}

            {stockError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <span className="text-red-500">!</span>
                <span>{stockError}</span>
              </div>
            )}
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-milano-200 dark:border-milano-800 text-xs text-milano-600 dark:text-milano-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-milano-900 dark:text-white" />
              <span>{t('product.fastDelivery')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-milano-900 dark:text-white" />
              <span>{t('product.guarantee')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Stock Error Toast - Mobile */}
      {stockError && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-30 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs font-semibold flex items-center gap-2 animate-fade-in shadow-lg">
          <span className="text-red-500">!</span>
          <span>{stockError}</span>
        </div>
      )}

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 dark:bg-obsidian/95 backdrop-blur-md border-t border-milano-200 dark:border-milano-800 flex items-center justify-between gap-4">
        <div>
          <div className="font-extrabold text-sm text-milano-900 dark:text-white font-mono">
            {product.price.toLocaleString()} DZD
          </div>
          <div className="text-[10px] text-milano-500 uppercase font-mono">
            {t('cart.size')}: {selectedSize}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-6 py-2.5 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-bold text-xs uppercase tracking-wider shadow-lg"
        >
          {t('product.addToBag')}
        </button>
</div>

    </main>
  );
}
