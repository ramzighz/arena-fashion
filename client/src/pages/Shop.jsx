import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowUpDown, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog.js';
import { useLanguage } from '../context/LanguageContext';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => { if (d.success) setProducts(d.products); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(s);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Live search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // Stock filter
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }
    // Featured/newest is default order (original drop order)
    return list;
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-10 space-y-4 sm:space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-milano-500 font-medium" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-milano-900 dark:hover:text-white transition-colors">
          {t('shop.breadcrumbHome')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-milano-900 dark:text-white font-bold uppercase">
          {selectedCategory === 'all' ? t('shop.breadcrumbCollection') : selectedCategory}
        </span>
      </nav>

      {/* Page Title & Active Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 pb-4 sm:pb-6 border-b border-milano-200 dark:border-milano-800">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
            {t('shop.catalogTitle')}
          </h1>
          <p className="text-[10px] sm:text-sm text-milano-500 mt-0.5 sm:mt-1">
            {t('shop.catalogSubtitle')}
          </p>
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-milano-500">
          {t('shop.showingCount')} {filteredProducts.length} {t('shop.of')} {products.length} {t('shop.styles')}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-milano-950 dark:bg-white text-white dark:text-milano-900 shadow-md ring-2 ring-milano-900 dark:ring-white'
                : 'bg-milano-100 dark:bg-milano-800 text-milano-700 dark:text-milano-300 hover:bg-milano-200 dark:hover:bg-milano-700 hover:text-milano-900 dark:hover:text-white'
            }`}
          >
            {t(`categories.${cat.id}`)}
          </button>
        ))}
      </div>

      {/* Filter and Control Strip */}
      <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
        
        {/* Instant Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-milano-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('shop.filterKeyword')}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-milano-300 dark:border-milano-700 bg-transparent text-milano-900 dark:text-white focus:outline-none focus:border-milano-900 dark:focus:border-white"
          />
        </div>

        {/* Max Price Slider (DZD 2,000 - 12,000) */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-milano-600 dark:text-milano-400 whitespace-nowrap font-mono">
            {t('shop.maxPrice')}: {maxPrice.toLocaleString()} DZD
          </label>
          <input
            type="range"
            min="2000"
            max="12000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            className="w-full accent-milano-900 dark:accent-white"
          />
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="inStockCheck"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="rounded border-milano-400 text-milano-900 focus:ring-milano-900"
          />
          <label htmlFor="inStockCheck" className="text-xs font-semibold text-milano-700 dark:text-milano-300 cursor-pointer">
            {t('shop.inStockOnly')}
          </label>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-milano-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort collection"
            className="w-full py-1.5 px-2 text-xs rounded border border-milano-300 dark:border-milano-700 bg-white dark:bg-milano-900 text-milano-900 dark:text-white focus:outline-none"
          >
            <option value="featured">{t('shop.sortFeatured')}</option>
            <option value="price-low">{t('shop.sortPriceLow')}</option>
            <option value="price-high">{t('shop.sortPriceHigh')}</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800">
          <p className="text-xs font-bold uppercase tracking-wider text-milano-500">Loading collection…</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 space-y-3">
          <h3 className="text-lg font-bold text-milano-900 dark:text-white">
            {t('shop.noFoundTitle')}
          </h3>
          <p className="text-xs text-milano-500 max-w-sm mx-auto">
            {t('shop.noFoundDesc')}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setMaxPrice(12000);
              setOnlyInStock(false);
            }}
            className="px-4 py-2 rounded bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-bold text-xs uppercase"
          >
            {t('shop.resetFilters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
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
                  <span className="absolute top-2 sm:top-3 left-2 sm:left-3 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider rounded bg-milano-950/80 text-white backdrop-blur-sm">
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-mono rounded bg-white/90 dark:bg-milano-900/90 text-milano-900 dark:text-white backdrop-blur-sm font-semibold">
                  {product.sizes.length} {t('shop.sizesCount')}
                </span>
              </div>

              <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between space-y-1 sm:space-y-2">
                <div>
                  <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider text-milano-500">
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
                  <div className="flex items-baseline">
                    <span className="font-extrabold text-xs sm:text-sm text-milano-900 dark:text-white font-mono">
                      {product.price.toLocaleString()} DZD
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-milano-600 dark:text-milano-400 group-hover:text-milano-900 dark:group-hover:text-white">
                    {t('shop.viewDetails')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
