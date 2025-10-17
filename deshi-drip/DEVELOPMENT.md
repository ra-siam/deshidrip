# Deshi Drip - Development Guide

## Quick Start

```bash
# Navigate to project directory
cd /workspace/deshi-drip

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Overview

Deshi Drip is a full-featured e-commerce platform with:

### Pages
1. **Homepage** (`/`) - Hero, brands showcase, featured products
2. **Shop** (`/shop`) - Product listing with filters
3. **Product Detail** (`/product/[id]`) - Individual product pages
4. **Weekly Drops** (`/weekly-drops`) - Weekly release products
5. **Bundles** (`/bundles`) - Curated product bundles
6. **Exclusives** (`/exclusives`) - World exclusive products
7. **Cart** (`/cart`) - Shopping cart management
8. **Checkout** (`/checkout`) - Checkout flow
9. **Order Confirmation** (`/order-confirmation`) - Order success page

### Key Features Implemented

#### 1. Four Brands
- **ZeroOne**: Urban streetwear
- **ZeroTwo**: Minimalist luxury
- **ZeroThree**: Athletic performance
- **ZeroFour**: Avant-garde fashion

Each brand has unique color scheme, products, and identity.

#### 2. Weekly Drops
- Featured weekly product releases
- Limited quantity indicators
- Special "Weekly Drop" badges on products

#### 3. Bundles
- Curated multi-product packages
- Automatic savings calculation
- Complete outfit suggestions

#### 4. World Exclusives
- Exclusive products with special badges
- Limited availability messaging
- Unique designs not available elsewhere

#### 5. Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage (localStorage)
- Free shipping threshold ($100)
- Real-time total calculation

#### 6. Product Features
- Multiple images per product
- Size selection
- Color selection
- Stock availability
- Sale pricing
- Related products

## Technical Implementation

### State Management
- Cart state managed with React Context API
- Persisted to localStorage
- Global access via `useCart()` hook

### Data Structure
All product data in `/data/products.ts`:
- 16 products across 4 brands
- Multiple categories
- Bundle configurations
- Weekly drop definitions

### Styling
- Tailwind CSS for all styling
- Responsive design (mobile-first)
- Custom brand colors
- Modern UI components

### Type Safety
- Full TypeScript implementation
- Type definitions in `/types/index.ts`
- Strict type checking

## Adding New Features

### Add a New Product

Edit `/data/products.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  brand: 'zeroone', // or zerotwo, zerothree, zerofour
  price: 99.99,
  originalPrice: 129.99, // optional
  description: 'Product description',
  images: ['image-url'],
  category: 'Category Name',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Black', 'White'],
  isNewArrival: true,
  isExclusive: false,
  isWeeklyDrop: false,
  stock: 50
}
```

### Add a New Bundle

```typescript
{
  id: 'bundle-id',
  name: 'Bundle Name',
  description: 'Bundle description',
  products: [product1, product2, product3],
  price: 299.99,
  originalPrice: 349.99,
  savings: 50.00,
  image: 'bundle-image-url'
}
```

### Add a New Brand

1. Update `/types/index.ts`:
```typescript
export type Brand = 'zeroone' | 'zerotwo' | 'zerothree' | 'zerofour' | 'zerofive';
```

2. Add brand info in `/data/products.ts`:
```typescript
zerofive: {
  name: 'ZeroFive',
  tagline: 'Brand Tagline',
  description: 'Brand description',
  color: '#HEX_COLOR'
}
```

3. Create products with the new brand

## Testing Checklist

- [ ] Homepage loads correctly
- [ ] Brand filtering works
- [ ] Add to cart functionality
- [ ] Cart updates and persists
- [ ] Checkout form validation
- [ ] Mobile responsive design
- [ ] All links work
- [ ] Images load properly
- [ ] Weekly drops display
- [ ] Bundles calculate savings
- [ ] Exclusives filter works

## Performance Considerations

- Images optimized with Next.js Image component
- Static page generation where possible
- Client-side cart state for instant updates
- Lazy loading of product images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Known Limitations

- Mock checkout (no payment processing)
- No user authentication
- No backend/database
- No email notifications
- No order tracking

## Future Roadmap

1. **Phase 1**: Backend Integration
   - Database setup
   - API endpoints
   - Real payment processing

2. **Phase 2**: User Features
   - Authentication
   - User profiles
   - Order history
   - Wishlist

3. **Phase 3**: Advanced Features
   - Product search
   - Reviews/ratings
   - Size guide
   - Product recommendations

4. **Phase 4**: Admin Panel
   - Inventory management
   - Order management
   - Analytics dashboard

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Cart Not Persisting
- Check browser localStorage is enabled
- Clear localStorage and try again

### Images Not Loading
- Verify image URLs are accessible
- Check Next.js Image configuration

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check Next.js documentation
4. Review Tailwind CSS docs

## Contributing

When making changes:
1. Test thoroughly
2. Update documentation
3. Follow existing code style
4. Use TypeScript types
5. Test mobile responsiveness
