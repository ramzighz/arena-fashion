import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('arena_language');
    if (saved && (saved === 'en' || saved === 'fr')) return saved;
    // Default to French for Algeria local audience or browser preference
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('arena_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  /**
   * Helper to look up translation by key path, e.g. t('nav.collection')
   */
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const keys = path.split('.');
    let current = translations[language];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to other language or fallback string
        let alt = translations[language === 'en' ? 'fr' : 'en'];
        for (const k of keys) {
          if (alt && alt[k] !== undefined) {
            alt = alt[k];
          } else {
            return fallback || path;
          }
        }
        return alt;
      }
    }
    return current || fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
