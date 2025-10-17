# Deshi Drip - E-Commerce Platform

A modern, full-featured e-commerce website inspired by Culture Kings, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### 🏪 Core E-Commerce Functionality
- **Product Catalog**: Browse products from 4 exclusive brands (ZeroOne, ZeroTwo, ZeroThree, ZeroFour)
- **Product Details**: Detailed product pages with image galleries, size/color selection
- **Shopping Cart**: Full cart management with localStorage persistence
- **Checkout Flow**: Complete checkout process with shipping and payment forms
- **Order Confirmation**: Professional order confirmation page

### 🎯 Special Features
- **Weekly Drops**: Dedicated section for weekly product releases
- **Bundle Deals**: Curated product bundles with savings
- **World Exclusives**: Exclusive products only available at Deshi Drip
- **Brand Filtering**: Filter products by brand and category
- **Responsive Design**: Mobile-first, fully responsive UI

### 🎨 Brands

1. **ZeroOne** - Urban Legends
   - Street-inspired fashion for the modern rebel
   - Focus: Streetwear essentials

2. **ZeroTwo** - Minimalist Luxury
   - Refined essentials for the discerning individual
   - Focus: Minimalist design

3. **ZeroThree** - Performance First
   - Athletic wear engineered for excellence
   - Focus: Athletic performance

4. **ZeroFour** - Avant-Garde
   - Pushing boundaries of contemporary fashion
   - Focus: Bold fashion statements

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Persistence**: localStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
cd /workspace/deshi-drip
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
deshi-drip/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── shop/                # Shop all products
│   ├── product/[id]/        # Product detail pages
│   ├── weekly-drops/        # Weekly drops page
│   ├── bundles/             # Bundles page
│   ├── exclusives/          # World exclusives page
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout flow
│   └── order-confirmation/  # Order confirmation
├── components/              # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── context/                 # React Context providers
│   └── CartContext.tsx
├── data/                    # Product data
│   └── products.ts
└── types/                   # TypeScript types
    └── index.ts
```

## Features Breakdown

### Navigation
- Sticky header with brand logo
- Quick links to Weekly Drops, Bundles, Exclusives
- Brand dropdown menu
- Shopping cart icon with item count
- Mobile-responsive hamburger menu

### Homepage
- Hero section with CTAs
- Weekly drop banner
- Brand showcase grid
- Featured new arrivals
- World exclusives preview
- Bundle preview
- Trust badges (free shipping, secure payment, easy returns)

### Product Pages
- Image gallery with thumbnails
- Size and color selection
- Quantity selector
- Stock availability
- Add to cart functionality
- Related products
- Product badges (Exclusive, Weekly Drop, New)

### Shopping Cart
- Item management (add, remove, update quantity)
- Real-time total calculation
- Free shipping threshold indicator
- Persistent cart (localStorage)
- Empty cart state

### Checkout
- Contact information form
- Shipping address form
- Payment information (card details)
- Order summary sidebar
- Secure payment indicator
- Form validation

## Data Structure

Products include:
- 16 unique products across 4 brands
- Multiple product categories (Hoodies, Jackets, Pants, T-Shirts, etc.)
- Size and color variants
- Sale pricing
- Stock management
- Special flags (exclusive, weekly drop, new arrival)

## Customization

### Adding Products
Edit `/data/products.ts` to add new products, bundles, or weekly drops.

### Styling
- Global styles: `/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles: Inline with Tailwind classes

### Brand Configuration
Update brand information in `/data/products.ts` under `brandInfo` object.

## Future Enhancements

- User authentication and accounts
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Search functionality
- Email notifications
- Payment gateway integration
- Admin dashboard
- Inventory management
- Advanced filtering and sorting
- Product recommendations

## License

This project is created for demonstration purposes.

## Author

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
