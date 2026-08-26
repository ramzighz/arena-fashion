import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('arena_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('arena_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('arena_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 p-4 rounded-lg bg-white dark:bg-milano-900 border border-milano-200 dark:border-milano-800 shadow-2xl transition-all animate-fade-in">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-milano-900 dark:text-milano-100 shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs text-milano-600 dark:text-milano-300">
          <p>
            Arena Fashion uses essential cookies for shopping bag persistence and security. No third-party data tracking. Read our{' '}
            <Link to="/privacy-policy" className="underline font-medium text-milano-900 dark:text-white">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2.5 rounded bg-milano-900 dark:bg-white text-white dark:text-milano-900 font-medium hover:opacity-90 transition-opacity"
            >
              Accept Essential
            </button>
            <button
              type="button"
              onClick={handleDecline}
              className="px-4 py-2.5 rounded border border-milano-300 dark:border-milano-700 text-milano-700 dark:text-milano-300 hover:bg-milano-100 dark:hover:bg-milano-800 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="p-2 text-milano-400 hover:text-milano-600 dark:hover:text-milano-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
