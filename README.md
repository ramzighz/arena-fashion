# ARENA FASHION | Casual Menswear & Footwear Platform

Premium casual menswear web application engineered with structured Japanese raw denim, heavyweight 500 GSM loopback fleece, flannels, and iconic footwear (Air Max 90 & Air Force 1 '07 Low), paired with a secure Node.js Express backend and OmniRoute AI Personal Stylist proxy.

---

## ⚡ Quick Start

### 1. Start the Backend API & OmniRoute Proxy
```bash
cd server
npm install
npm run dev
# Server running at http://localhost:5000
```

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
# Frontend running at http://localhost:5173
```

---

## 🔐 Credentials & Demo Accounts

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@arenafashion.com` | `ArenaAdmin2026!` | Full Admin Portal, Orders, & OmniRoute Quota Monitoring |
| **Customer** | `alex@example.com` | `ArenaUser2026!` | Order history, Bag sync, Fitting bookings |

---

## 🛡️ Security & Architecture Checklist Compliance

- [x] **Server-side API keys**: OmniRoute and JWT keys isolated in server `.env`.
- [x] **No sensitive keys in git**: `.gitignore` configured for `.env`, logs, and node_modules.
- [x] **RBAC Protected Admin routes**: Role-based access control with bcrypt hashing & JWTs.
- [x] **Input sanitization & XSS prevention**: `sanitize-html` and `Zod` validation on all payloads.
- [x] **Spend Cap & Rate Limiting**: `express-rate-limit` active on all routes + $50.00 spend cap tracker on AI proxy.
- [x] **Security Headers**: Helmet with CSP, HSTS, X-Content-Type-Options: nosniff, and X-Frame-Options: DENY.
- [x] **Secure Cookies**: HttpOnly, SameSite=Lax.
- [x] **Zero forbidden design patterns**:
  - No vercel.app URL
  - No purple gradient
  - No AI slop photos (authentic curated high-contrast photography)
  - No fake reviews or fake customer counts
  - No broken buttons or broken links
  - No scroll animations / scroll hijacks
  - Multi-page architecture (Home, Shop, Detail, Stylist, Lookbook, Stores, Cart, Checkout, Thank You, Auth, Admin, FAQ, Legal, 404)
  - Custom SVG emblem logo
  - Active SVG favicon
  - Solid high-contrast hero typography
  - Complete GDPR/CCPA Privacy Policy and Terms & Conditions
  - No emoji icons (Lucide SVG icons)
  - Crisp, sharp value propositions (no vague hero copy)
  - Modern sans and editorial display typography (no cursive fonts)
  - Zero em dashes in copy strings
- [x] **Complete feature list**:
  - Dark mode toggle
  - Cookie banner
  - Instant live site search & filters
  - Back-to-top button
  - Mobile slide-out drawer menu
  - Hover states and micro-interactions
  - Top scroll progress bar
  - One-click copy buttons with copied feedback
  - Print stylesheet (`@media print`) for invoices and specs
  - Sticky header & sticky mobile CTA bar
  - Accessible skip-to-content link
  - Password visibility toggle
  - UTM campaign tracking preservation
  - Form validation states (success / error)
  - Confirmation modals & size guide
  - Dynamic current year (2026) and last updated dates
  - 5 expandable accessible accordion FAQs
  - Floating concierge drawer with under 2 hour response promise
  - Store locator with transit directions & fitting booking
  - robots.txt and sitemap.xml
  - JSON-LD Schema structured data
