import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-milano-200 dark:border-milano-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-milano-100 dark:bg-milano-900 border border-milano-200 dark:border-milano-800 text-xs font-bold uppercase tracking-wider text-milano-900 dark:text-white">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Client Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-milano-500 font-mono">
          Last Updated: {lastUpdated} &bull; Effective Date: January 1, 2026
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-8 text-xs text-milano-700 dark:text-milano-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            1. Overview & Data Philosophy
          </h2>
          <p>
            Arena Fashion ("Arena Fashion", "we", "us", or "our") respects your privacy. We collect only the data essential to fulfill apparel orders, process secure transactions, and manage fitting reservations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Order & Identity Data:</strong> Full name, shipping destination, billing address, email address, and phone number.
            </li>
            <li>
              <strong>Authentication & Account Data:</strong> Hashed credentials (stored using bcrypt with 10 salt rounds) and session JWTs.
            </li>
            <li>
              <strong>Device & Essential Cookies:</strong> IP address, browser type, and essential cookies for shopping bag persistence and CSRF defense.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            3. Security Standards & Data Retention
          </h2>
          <p>
            All network communication is enforced over HTTPS with TLS 1.3 encryption, Content Security Policies (CSP), HSTS preloading, and HttpOnly cookies. We do not sell, rent, or trade your personal data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            4. Your Rights (GDPR / CCPA)
          </h2>
          <p>
            Under applicable privacy frameworks, you hold the right to access, rectify, or request deletion of your stored profile information. To submit a data request, contact our privacy officer at <a href="mailto:privacy@arenafashion.com" className="font-bold underline text-milano-900 dark:text-white">privacy@arenafashion.com</a>.
          </p>
        </section>

      </div>
    </main>
  );
}
