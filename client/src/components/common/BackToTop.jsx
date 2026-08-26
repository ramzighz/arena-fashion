import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="back-to-top fixed bottom-20 right-4 z-40 p-3 rounded-full bg-milano-900 dark:bg-milano-100 text-white dark:text-milano-900 shadow-xl hover:bg-milano-800 dark:hover:bg-milano-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-milano-500"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
