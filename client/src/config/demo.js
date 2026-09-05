// ============================================================
// DEMO TEMPLATE CONFIGURATION
// Replace all values below with your client's real information.
// This single file controls every branding touchpoint in the app.
// ============================================================

export const DEMO = {
  // ── Brand Identity ──────────────────────────────────────────
  brandName: 'Your Business Name',
  brandNameShort: 'YOUR LOGO',
  tagline: 'Your Tagline Here',

  // ── Contact Information ─────────────────────────────────────
  phone: '(555) 123-4567',
  phoneRaw: '15551234567',
  whatsapp: '+15551234567',
  whatsappDisplay: '(555) 123-4567',
  email: 'contact@yourbusiness.com',
  privacyEmail: 'privacy@yourbusiness.com',

  // ── Social Media ────────────────────────────────────────────
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',

  // ── Store Address ───────────────────────────────────────────
  address: '123 Main Street, Suite 100, Your City, ST 12345',
  addressShort: 'Your City, ST',
  googleMapsUrl: 'https://www.google.com/maps/place/Your+Business/@0,0,17z',
  coordinates: { lat: 0, lng: 0 },

  // ── Store Hours ─────────────────────────────────────────────
  hours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 12:00 PM - 6:00 PM',

  // ── Store Photos (replace with your client's real photos) ───
  storeFrontImage: '/store/placeholder-storefront.jpg',
  storeInteriorImage: '/store/placeholder-interior.jpg',
  storeFrontCaption: 'Your Storefront - Your City',
  storeInteriorCaption: 'Your Product Collection',

  // ── Currency ────────────────────────────────────────────────
  currency: 'DZD',
  currencySymbol: 'DZD',

  // ── Favicon (SVG) ──────────────────────────────────────────
  faviconSvg: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23090a0f'/%3E%3Ctext x='16' y='22' text-anchor='middle' fill='%23f5f3ef' font-size='16' font-family='sans-serif' font-weight='bold'%3EY%3C/text%3E%3C/svg%3E",

  // ── SEO / Meta Tags ────────────────────────────────────────
  metaTitle: 'Your Business Name | Your Products & Services',
  metaDescription: 'Your business description goes here. We offer premium products and exceptional service.',
  metaKeywords: 'your products, your services, your industry, premium quality',
  ogTitle: 'Your Business Name | Your Tagline',
  ogDescription: 'Your business description for social media sharing.',
  ogImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=80',

  // ── JSON-LD Structured Data ─────────────────────────────────
  jsonLd: {
    type: 'LocalBusiness',
    name: 'Your Business Name',
    description: 'Your business description for search engines.',
    url: 'https://yourbusiness.com',
    telephone: '+1-555-123-4567',
    priceRange: '$$',
    address: {
      streetAddress: '123 Main Street',
      addressLocality: 'Your City',
      addressRegion: 'ST',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      latitude: 0,
      longitude: 0,
    },
    openingHours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '21:00' },
      { days: ['Sunday'], opens: '12:00', closes: '18:00' },
    ],
  },

  // ── Legal Pages ─────────────────────────────────────────────
  businessLegalName: 'Your Business Name',
  domain: 'yourbusiness.com',
};
