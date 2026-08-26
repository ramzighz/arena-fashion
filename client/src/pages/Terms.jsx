import React from 'react';
import { FileText } from 'lucide-react';

export function Terms() {
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
          <FileText className="w-3.5 h-3.5" />
          <span>Client Agreement & Legal Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-milano-900 dark:text-white">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-milano-500 font-mono">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-xs text-milano-700 dark:text-milano-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            1. Scope of Agreement
          </h2>
          <p>
            By accessing or ordering from Arena Fashion (arenafashion.com), you agree to be bound by these Terms and Conditions. Our casual menswear, denim garments, and footwear are sold subject to inventory availability and verified transaction confirmation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            2. Orders, Pricing, and Currency
          </h2>
          <p>
            All prices are listed in Algerian Dinar (DZD). While we endeavor to maintain precise pricing, we reserve the right to correct typographical errors. Orders are confirmed only upon receipt of official payment authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-milano-900 dark:text-white">
            3. Limitation of Liability
          </h2>
          <p>
            Arena Fashion shall not be liable for indirect, incidental, or consequential damages resulting from product use or delivery delays caused by common carrier disruptions.
          </p>
        </section>

      </div>
    </main>
  );
}
