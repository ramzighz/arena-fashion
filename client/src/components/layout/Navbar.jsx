import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Sun, Moon, Menu, X, Globe, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/catalog.js';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOpen, setShopOpen] = useState(false);
  const { totalCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-obsidian/90 backdrop-blur-md border-b border-milano-200 dark:border-milano-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-milano-700 dark:text-milano-200 hover:text-milano-900 dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo: Geometric SVG Emblem + Wordmark */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group" aria-label="Arena Fashion Home">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-milano-900 dark:text-white transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="currentColor">
                <rect width="32" height="32" rx="6" fill="currentColor" fillOpacity="0.08" />
                <path d="M10 26L16 8L22 26H18L16 20L14 26H10Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-xl tracking-[0.2em] text-milano-900 dark:text-white leading-none uppercase">
                  ARENA
                </span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-milano-500 font-semibold mt-0.5">
                  FASHION
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-wider text-milano-700 dark:text-milano-300">
            {/* Collection Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                type="button"
                onClick={() => setShopOpen(!shopOpen)}
                className="flex items-center gap-1.5 hover:text-milano-900 dark:hover:text-white transition-colors py-2"
                aria-expanded={shopOpen}
              >
                <span>{t('nav.collection')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopOpen && (
                <div className="absolute left-0 top-full pt-1 z-50 animate-fade-in">
                  <div className="w-60 rounded-xl bg-white dark:bg-obsidian border border-milano-200 dark:border-milano-800 shadow-2xl py-2 overflow-hidden">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={cat.id === 'all' ? '/shop' : `/shop?category=${cat.id}`}
                        onClick={() => setShopOpen(false)}
                        className="block px-4 py-2.5 text-xs font-semibold text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800 hover:text-milano-900 dark:hover:text-white transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/stores" className="hover:text-milano-900 dark:hover:text-white transition-colors">
              {t('nav.stores')}
            </Link>
            <Link to="/contact" className="hover:text-milano-900 dark:hover:text-white transition-colors">
              {t('footer.contactLink')}
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-5">
            
            {/* Language Toggle: hidden on mobile (available in drawer) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden sm:flex px-3 py-2 rounded-lg border border-milano-200 dark:border-milano-700 bg-milano-100 dark:bg-milano-800 text-milano-900 dark:text-white text-xs font-extrabold items-center gap-1.5 hover:border-milano-400 dark:hover:border-milano-500 transition-colors shadow-sm"
              title={language === 'en' ? 'Basculer en Français' : 'Switch to English'}
              aria-label="Toggle language between English and French"
            >
              <Globe className="w-3.5 h-3.5 text-milano-500 dark:text-milano-400" />
              <span className="font-mono uppercase tracking-wider">
                <span className={language === 'en' ? 'text-milano-950 dark:text-white underline decoration-2' : 'text-milano-400'}>EN</span>
                <span className="text-milano-300 dark:text-milano-600 mx-0.5">/</span>
                <span className={language === 'fr' ? 'text-milano-950 dark:text-white underline decoration-2' : 'text-milano-400'}>FR</span>
              </span>
            </button>

            {/* Social Links - desktop only */}
            <a
              href="https://www.instagram.com/arena_babezouar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block p-2 text-milano-700 dark:text-milano-300 hover:text-milano-900 dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/arenafashion.bez/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block p-2 text-milano-700 dark:text-milano-300 hover:text-milano-900 dark:hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-milano-700 dark:text-milano-300 hover:text-milano-900 dark:hover:text-white transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle - hidden on mobile (available in drawer) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:block p-2.5 text-milano-700 dark:text-milano-300 hover:text-milano-900 dark:hover:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-milano-900 dark:bg-white text-white dark:text-milano-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              aria-label={`Shopping bag with ${totalCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.bag')}</span>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static sm:ml-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Live Search Bar Overlay */}
        {searchOpen && (
          <div className="py-3 px-2 border-t border-milano-200 dark:border-milano-800 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-milano-400 absolute left-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-9 pr-24 py-2 text-xs rounded-lg border border-milano-300 dark:border-milano-700 bg-milano-50 dark:bg-milano-900 text-milano-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-milano-900 dark:focus:ring-white"
              />
              <div className="absolute right-2 flex items-center gap-2">
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-milano-900 dark:bg-white text-white dark:text-milano-900 text-[11px] font-bold rounded uppercase"
                >
                  {t('nav.searchBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-milano-400 hover:text-milano-600 dark:hover:text-milano-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-milano-200 dark:border-milano-800 bg-white dark:bg-obsidian px-6 py-6 space-y-4 animate-fade-in">
          
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-3 border-b border-milano-100 dark:border-milano-800">
            <span className="text-xs font-bold text-milano-500 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Language / Langue</span>
            </span>
            <div className="flex rounded-lg overflow-hidden border border-milano-300 dark:border-milano-700">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold ${
                  language === 'en'
                    ? 'bg-milano-900 dark:bg-white text-white dark:text-milano-900'
                    : 'bg-milano-100 dark:bg-milano-800 text-milano-700 dark:text-milano-300'
                }`}
              >
                ENG
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1 text-xs font-bold ${
                  language === 'fr'
                    ? 'bg-milano-900 dark:bg-white text-white dark:text-milano-900'
                    : 'bg-milano-100 dark:bg-milano-800 text-milano-700 dark:text-milano-300'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile Theme Toggle Row */}
          <div className="flex items-center justify-between pb-3 border-b border-milano-100 dark:border-milano-800">
            <span className="text-xs font-bold text-milano-500 uppercase tracking-wider flex items-center gap-1.5">
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>Theme / Thème</span>
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDark ? 'bg-milano-900 dark:bg-white' : 'bg-milano-300'
              }`}
              aria-label="Toggle dark mode"
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-milano-900 shadow transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="space-y-3 text-sm font-bold uppercase tracking-wider">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-900 dark:text-white border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.collection')}
            </Link>
            <Link
              to="/shop?category=jeans"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.jeans')}
            </Link>
            <Link
              to="/shop?category=tees"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.tees')}
            </Link>
            <Link
              to="/shop?category=polos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.polos')}
            </Link>
            <Link
              to="/shop?category=shirts"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.shirts')}
            </Link>
            <Link
              to="/shop?category=layering"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.layering')}
            </Link>
            <Link
              to="/shop?category=jackets"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.jackets')}
            </Link>
            <Link
              to="/shop?category=bottoms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.bottoms')}
            </Link>
            <Link
              to="/shop?category=footwear"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.footwear')}
            </Link>
            <Link
              to="/shop?category=accessories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.accessories')}
            </Link>
            <Link
              to="/stores"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('nav.stores')}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-milano-700 dark:text-milano-300 border-b border-milano-100 dark:border-milano-800"
            >
              {t('footer.contactLink')}
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-milano-500">
            <a
              href="https://wa.me/213552778744"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
            >
              WhatsApp: 0552 77 87 44
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/arena_babezouar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-milano-500 hover:text-milano-900 dark:hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/arenafashion.bez/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-milano-500 hover:text-milano-900 dark:hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
