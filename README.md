# Dosa Darbar — Restaurant Website & Online Ordering

A full-featured, production-ready restaurant website for **Dosa Darbar**, a South Indian restaurant located on Ajmer Highway, Jaipur, Rajasthan, India.

Built with Next.js 16, Tailwind CSS v4, TypeScript, Supabase, Razorpay, and Zustand.

## Features

- **Homepage** — Hero section, bestsellers, highlights, testimonials, location map
- **Menu Page** — 50+ items across 12 categories with search, filters, and veg toggle
- **Online Ordering** — Full cart system with quantity controls, special instructions, delivery/takeaway toggle
- **Checkout Flow** — Phone/address input, Razorpay payment integration, COD option
- **About Page** — Restaurant story, mission, photo gallery, team section
- **Contact Page** — Contact form, Google Maps embed, WhatsApp integration
- **Admin Dashboard** — Order management, menu CRUD, analytics overview
- **SEO Optimized** — Meta tags, Open Graph, structured data, sitemap
- **PWA Ready** — Installable on mobile with manifest.json
- **Mobile-First** — Responsive design optimized for phone ordering

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| TypeScript | Type safety |
| Zustand | Cart state management |
| Supabase | Database, Auth, Storage |
| Razorpay | Payment gateway |
| Lucide React | Icons |
| Vercel | Deployment |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project (free tier works)
- Razorpay account (test mode)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd dosa-darbar

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables in .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_DB_SCHEMA=foodstudio

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### Database Setup

1. Create a new Supabase project
2. In **Supabase Dashboard → API Settings**, expose the `foodstudio` schema in exposed schemas.
3. Run the schema migration in the Supabase SQL Editor: `supabase/schema.sql`
4. Seed the menu/admin data: `supabase/seed.sql`

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Navbar, Footer, Cart
│   ├── page.tsx            # Homepage
│   ├── menu/page.tsx       # Menu with search & filters
│   ├── order/page.tsx      # Cart review & checkout flow
│   ├── about/page.tsx      # Restaurant story & gallery
│   ├── contact/page.tsx    # Contact form & info
│   ├── admin/
│   │   ├── page.tsx        # Dashboard overview
│   │   ├── orders/page.tsx # Order management
│   │   └── menu/page.tsx   # Menu item CRUD
│   ├── api/
│   │   ├── menu/route.ts   # Menu API
│   │   ├── orders/route.ts # Orders API
│   │   └── auth/route.ts   # Auth API
│   └── sitemap.ts          # SEO sitemap
├── components/
│   ├── Navbar.tsx           # Sticky nav with cart badge
│   ├── Footer.tsx           # Footer with contact & socials
│   ├── CartDrawer.tsx       # Slide-in cart drawer
│   ├── MenuCard.tsx         # Food item card with Add to Cart
│   ├── HeroSection.tsx      # Homepage hero banner
│   ├── TestimonialCarousel.tsx
│   └── OrderTracker.tsx     # Order status tracker
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── razorpay.ts         # Razorpay helpers
│   ├── menu-data.ts        # Menu seed data (50+ items)
│   └── utils.ts            # Utility functions
├── store/
│   └── cartStore.ts        # Zustand cart state (persisted)
├── types/
│   └── index.ts            # TypeScript interfaces
├── supabase/
│   ├── schema.sql          # Full database schema with RLS
│   └── seed.sql            # Menu seed data (68 items)
└── public/
    └── manifest.json       # PWA manifest
```

## Menu Categories

| Category | Items | Price Range |
|---|---|---|
| Dosa | 15 | ₹60 – ₹150 |
| Special Dosa | 5 | ₹120 – ₹250 |
| Rava Dosa | 5 | ₹80 – ₹130 |
| Uttapam | 6 | ₹70 – ₹110 |
| South Indian | 5 | ₹50 – ₹80 |
| North Indian | 6 | ₹140 – ₹190 |
| Breads | 5 | ₹20 – ₹60 |
| Rice & Biryani | 3 | ₹100 – ₹180 |
| Chinese | 4 | ₹120 – ₹160 |
| Starters | 4 | ₹120 – ₹180 |
| Beverages | 6 | ₹25 – ₹70 |
| Combos | 4 | ₹99 – ₹450 |

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variables in the Vercel dashboard.

### Other Platforms

```bash
npm run build
npm start
```

## License

Private — All rights reserved by Dosa Darbar.
