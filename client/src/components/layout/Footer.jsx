import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-milano-950 text-milano-300 pt-10 sm:pt-16 pb-12 border-t border-milano-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-milano-800/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <svg className="w-7 h-7 text-white" viewBox="0 0 32 32" fill="currentColor">
                <rect width="32" height="32" rx="6" fill="#1e293b" />
                <text x="16" y="22" textAnchor="middle" fill="#ffffff" fontSize="16" fontFamily="sans-serif" fontWeight="bold">Y</text>
              </svg>
              <span className="font-extrabold text-xl tracking-[0.2em] text-white uppercase">
                YOUR LOGO
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-milano-400 max-w-sm">
              {t('footer.bio')}
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs">
              <div className="flex items-center gap-2 text-milano-300">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
                >
                  <span className="font-mono">(555) 123-4567</span>
                  <span>&bull; WhatsApp</span>
                </a>
              </div>
              <div className="flex items-start gap-2 text-milano-300">
                <MapPin className="w-3.5 h-3.5 text-milano-400 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/place/Your+Business/@0,0,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  123 Main Street, Suite 100, Your City, ST 12345
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              {t('footer.collectionsTitle')}
            </h3>
            <ul className="space-y-2 text-xs text-milano-400">
              <li>
                <Link to="/shop?category=jeans" className="hover:text-white transition-colors">
                  {t('footer.jeansLink')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tees" className="hover:text-white transition-colors">
                  {t('footer.teesLink')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=shirts" className="hover:text-white transition-colors">
                  {t('footer.shirtsLink')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bottoms" className="hover:text-white transition-colors">
                  {t('footer.bottomsLink')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=footwear" className="hover:text-white transition-colors">
                  {t('footer.footwearLink')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-white transition-colors">
                  {t('footer.accessoriesLink')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Service & Discovery */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-2 text-xs text-milano-400">
              <li>
                <Link to="/stores" className="hover:text-white transition-colors font-bold text-milano-200">
                  {t('footer.storesLink')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('footer.contactLink')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  {t('footer.privacyLink')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  {t('footer.termsLink')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-milano-500">
          <div>
            &copy; {currentYear} {t('footer.rights')}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('footer.codSecure')}</span>
            </span>
            <span>{t('footer.cityCountry')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
