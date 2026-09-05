import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingContact() {
  return (
    <a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="floating-contact fixed bottom-20 left-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-400 transition-all text-xs font-semibold uppercase tracking-wider"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
