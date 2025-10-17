# Deshi Drip - E-Commerce Platform

A modern, full-featured e-commerce website inspired by Culture Kings, built with Next.js 15, TypeScript, and Tailwind CSS. Featuring Bangladesh-specific payment and shipping integration, admin CMS, and an interactive bundle builder.

## 🎯 Overview

Deshi Drip is a complete e-commerce solution for Bangladesh featuring:
- 4 exclusive fashion brands
- Bangladesh payment methods (bKash, Nagad, Rocket, SSL Commerz, COD)
- Bangladesh shipping providers (Pathao, RedX, Steadfast, Sundarban)
- Admin CMS for complete store management
- Interactive bundle builder with auto-discounts
- Full shopping cart and checkout flow
- Mobile-responsive modern design

---

## 🚀 Quick Start

```bash
# Navigate to project
cd /workspace/deshi-drip

# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

---

## ✨ Core Features

### 🏪 E-Commerce Functionality
- ✅ Product catalog (16 products, 4 brands)
- ✅ Product detail pages with image galleries
- ✅ Shopping cart with localStorage persistence
- ✅ Complete checkout flow
- ✅ Order confirmation
- ✅ Brand and category filtering
- ✅ Responsive design

### 🎯 Special Features
- ✅ **Weekly Drops**: Limited weekly product releases
- ✅ **Bundles**: Pre-curated product bundles with savings
- ✅ **Bundle Builder**: Create custom bundles with up to 20% off
- ✅ **World Exclusives**: Exclusive products only at Deshi Drip
- ✅ **Admin CMS**: Complete store management system

### 🇧🇩 Bangladesh Integration
- ✅ **Payment Methods**:
  - bKash (1.5% fee)
  - Nagad (1.0% fee)
  - Rocket (1.5% fee)
  - SSL Commerz / Card (2.5% fee)
  - Cash on Delivery (0% fee)

- ✅ **Shipping Providers**:
  - Pathao Courier (৳60-120)
  - Steadfast Courier (৳50-100)
  - RedX (৳70-130)
  - Sundarban Courier (৳45-90)

- ✅ **Local Features**:
  - 8 Bangladesh divisions
  - Taka (৳) currency
  - Local phone format (01XXXXXXXXX)
  - Regional shipping rates

### 👨‍💼 Admin CMS
- ✅ **Dashboard**: Key metrics and analytics
- ✅ **Products Management**: Full CRUD operations
- ✅ **Orders Management**: Track and manage orders
- ✅ **Bundles Management**: Create and edit bundles
- ✅ **Analytics**: Sales reports and performance metrics
- ✅ **Settings**: Store, payment, and shipping configuration

**Admin Access**: `/admin/login`
```
Username: admin
Password: admin123
```

---

## 🎨 The Four Brands

### 1. ZeroOne - Urban Legends
- **Color**: Red (#FF6B6B)
- **Style**: Street-inspired fashion
- **Products**: Hoodies, Joggers, Tees, Jackets

### 2. ZeroTwo - Minimalist Luxury
- **Color**: Teal (#4ECDC4)
- **Style**: Refined essentials
- **Products**: Crewnecks, Cargo Pants, Polos, Trench Coats

### 3. ZeroThree - Performance First
- **Color**: Blue (#45B7D1)
- **Style**: Athletic wear
- **Products**: Track Jackets, Tech Shorts, Performance Tees

### 4. ZeroFour - Avant-Garde
- **Color**: Green (#96CEB4)
- **Style**: Bold fashion statements
- **Products**: Statement Jackets, Oversized Tees, Cargo Pants, Puffers

---

## 📁 Project Structure

```
deshi-drip/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage
│   ├── shop/                    # Shop all products
│   ├── product/[id]/            # Product detail pages
│   ├── weekly-drops/            # Weekly drops page
│   ├── bundles/                 # Bundles page
│   ├── bundle-builder/          # Interactive bundle builder
│   ├── exclusives/              # World exclusives page
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout with BD payment/shipping
│   ├── order-confirmation/      # Order success page
│   └── admin/                   # Admin CMS
│       ├── login/               # Admin login
│       ├── dashboard/           # Admin dashboard
│       ├── products/            # Products management
│       ├── orders/              # Orders management
│       ├── bundles/             # Bundles management
│       ├── analytics/           # Analytics & reports
│       └── settings/            # Store settings
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── ProductCard.tsx          # Product card
│   └── AdminLayout.tsx          # Admin layout wrapper
├── context/                      # React Context
│   └── CartContext.tsx          # Cart state management
├── lib/                         # Utility libraries
│   ├── admin-auth.ts            # Admin authentication
│   ├── payment.ts               # Payment integrations (BD)
│   └── shipping.ts              # Shipping providers (BD)
├── data/                        # Product data
│   └── products.ts              # Products, bundles, drops
├── types/                       # TypeScript types
│   └── index.ts                 # Type definitions
└── Documentation files...
```

---

## 📄 Documentation

- **[README.md](README.md)** - This file, project overview
- **[QUICKSTART.md](QUICKSTART.md)** - Quick start guide
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Developer guide
- **[FEATURES.md](FEATURES.md)** - Complete feature list
- **[ADMIN_CMS_GUIDE.md](ADMIN_CMS_GUIDE.md)** - Admin CMS documentation
- **[BANGLADESH_INTEGRATION.md](BANGLADESH_INTEGRATION.md)** - BD payment/shipping guide
- **[BUNDLE_BUILDER_GUIDE.md](BUNDLE_BUILDER_GUIDE.md)** - Bundle builder guide

---

## 🛒 Main Pages

### Customer-Facing
1. **Homepage** (`/`)
   - Hero section, weekly drops banner, brand showcase, featured products

2. **Shop** (`/shop`)
   - All products with brand and category filters

3. **Product Detail** (`/product/[id]`)
   - Images, size/color selection, add to cart, related products

4. **Weekly Drops** (`/weekly-drops`)
   - Current week's limited releases

5. **Bundles** (`/bundles`)
   - Pre-curated product bundles with savings

6. **Bundle Builder** (`/bundle-builder`) ⭐ NEW
   - Interactive custom bundle creator
   - Auto-discounts up to 20%
   - Mix and match products

7. **World Exclusives** (`/exclusives`)
   - Exclusive products only at Deshi Drip

8. **Shopping Cart** (`/cart`)
   - Cart management, quantity updates, totals

9. **Checkout** (`/checkout`) ⭐ UPDATED
   - BD payment methods (bKash, Nagad, Rocket, Card, COD)
   - BD shipping providers (Pathao, RedX, Steadfast, Sundarban)
   - Division-based shipping rates

10. **Order Confirmation** (`/order-confirmation`)
    - Order success with order number

### Admin Panel ⭐ NEW
11. **Admin Login** (`/admin/login`)
    - Secure admin authentication

12. **Dashboard** (`/admin/dashboard`)
    - Metrics, recent orders, low stock alerts

13. **Products** (`/admin/products`)
    - Product management with search and filters

14. **Orders** (`/admin/orders`)
    - Order tracking and management

15. **Bundles** (`/admin/bundles`)
    - Bundle creation and management

16. **Analytics** (`/admin/analytics`)
    - Sales reports and performance metrics

17. **Settings** (`/admin/settings`)
    - Store, payment, and shipping configuration

---

## 🎁 Bundle Builder

### Features
- **Interactive Creation**: Pick any products
- **Auto-Discounts**: 
  - 2-3 items: 5-10% off
  - 4 items: 15% off
  - 5+ items: 20% off
- **Brand Filtering**: Filter by brand
- **Real-time Pricing**: Instant calculations
- **Custom Names**: Name your bundles

### How It Works
1. Browse all products
2. Add items to bundle
3. Adjust quantities
4. Watch savings grow
5. Create your bundle

**Learn More**: [BUNDLE_BUILDER_GUIDE.md](BUNDLE_BUILDER_GUIDE.md)

---

## 💳 Bangladesh Payments

### Supported Methods
1. **bKash** - Most popular mobile banking (1.5% fee)
2. **Nagad** - Government-backed (1.0% fee)
3. **Rocket** - Dutch-Bangla Bank (1.5% fee)
4. **SSL Commerz** - Card payments (2.5% fee)
5. **Cash on Delivery** - Pay on delivery (0% fee)

### How It Works
1. Customer selects payment method
2. For mobile banking: Sends money + enters transaction ID
3. For cards: Enters card details
4. For COD: Pays on delivery
5. Order confirmed

**Learn More**: [BANGLADESH_INTEGRATION.md](BANGLADESH_INTEGRATION.md)

---

## 🚚 Bangladesh Shipping

### Providers
1. **Pathao** - Fast & reliable (৳60-120)
2. **Steadfast** - Nationwide (৳50-100)
3. **RedX** - Express delivery (৳70-130)
4. **Sundarban** - Budget-friendly (৳45-90)

### Coverage
All 8 divisions of Bangladesh:
- Dhaka (Inside Dhaka rates)
- Chittagong, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh (Outside Dhaka rates)

**Learn More**: [BANGLADESH_INTEGRATION.md](BANGLADESH_INTEGRATION.md)

---

## 👨‍💼 Admin CMS

### Quick Access
```
URL: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

### Features
- **Dashboard**: Real-time metrics
- **Products**: Full product management
- **Orders**: Order tracking and fulfillment
- **Bundles**: Create and manage bundles
- **Analytics**: Sales and performance reports
- **Settings**: Configure store, payments, shipping

**Learn More**: [ADMIN_CMS_GUIDE.md](ADMIN_CMS_GUIDE.md)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Context API
- **Storage**: localStorage (demo)
- **Authentication**: Custom auth (demo)

---

## 📊 Statistics

- **Pages**: 17 (10 customer + 7 admin)
- **Products**: 16 across 4 brands
- **Bundles**: 4 pre-made + unlimited custom
- **Payment Methods**: 5 (BD-specific)
- **Shipping Providers**: 4 (BD couriers)
- **Admin Features**: 6 main sections

---

## 🚀 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Environment Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Access at `http://localhost:3000`

### Adding Products
Edit `/data/products.ts` to add products, bundles, or weekly drops.

**Learn More**: [DEVELOPMENT.md](DEVELOPMENT.md)

---

## 🎯 Use Cases

### For Customers
- Browse and shop latest fashion
- Create custom bundles and save
- Pay with local methods (bKash, Nagad, etc.)
- Track orders
- Get fast delivery across Bangladesh

### For Store Owners
- Manage products via admin panel
- Track orders and sales
- View analytics and reports
- Configure payments and shipping
- Manage bundles and promotions

---

## 🔒 Security

### Current (Demo Mode)
- Local authentication
- localStorage for cart
- Mock payment processing
- Demo admin credentials

### Production Requirements
- Database integration
- Real authentication (JWT, OAuth)
- Secure payment gateways
- Encrypted transactions
- HTTPS/SSL certificates

---

## 🌟 Highlights

### What Makes It Special
1. **Bangladesh-First**: Built for BD market
2. **Complete Solution**: E-commerce + Admin + Analytics
3. **Interactive**: Bundle builder, filters, search
4. **Modern Design**: Clean, professional UI/UX
5. **Mobile-Friendly**: Responsive on all devices
6. **Local Payments**: bKash, Nagad, Rocket, COD
7. **Local Shipping**: Pathao, RedX, Steadfast
8. **Admin CMS**: Full store management

---

## 📈 Future Enhancements

### Planned Features
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search
- [ ] Email notifications
- [ ] SMS integration (BD)
- [ ] Real payment gateway integration
- [ ] Real shipping API integration
- [ ] Inventory management
- [ ] Marketing tools
- [ ] Customer management
- [ ] Multi-language support (English/Bengali)

---

## 🐛 Known Issues

### Current Limitations
- Demo payment processing (not real)
- Mock shipping integration
- No email notifications
- No SMS notifications
- No order tracking (courier APIs)
- localStorage-based cart (not persistent across devices)

---

## 📞 Support

### Getting Help
1. Check documentation files
2. Review code comments
3. See Next.js documentation
4. Check Tailwind CSS docs

### Common Issues
- **Build errors**: Clear `.next` folder
- **Cart not persisting**: Check localStorage
- **Admin can't login**: Use demo credentials
- **Images not loading**: Check URLs

---

## 🎓 Learning Resources

### Documentation Files
- Start with: [QUICKSTART.md](QUICKSTART.md)
- Development: [DEVELOPMENT.md](DEVELOPMENT.md)
- Features: [FEATURES.md](FEATURES.md)
- Admin: [ADMIN_CMS_GUIDE.md](ADMIN_CMS_GUIDE.md)
- BD Integration: [BANGLADESH_INTEGRATION.md](BANGLADESH_INTEGRATION.md)
- Bundle Builder: [BUNDLE_BUILDER_GUIDE.md](BUNDLE_BUILDER_GUIDE.md)

---

## 📝 License

This project is created for demonstration purposes.

---

## 🙏 Acknowledgments

Inspired by Culture Kings' e-commerce experience, adapted for the Bangladesh market with local payment methods, shipping providers, and cultural preferences.

---

## 🎉 Get Started

```bash
# Run the development server
npm run dev

# Visit the store
http://localhost:3000

# Access admin panel
http://localhost:3000/admin/login
Username: admin
Password: admin123
```

---

**Built with ❤️ for Bangladesh 🇧🇩**

**Deshi Drip** - Your destination for exclusive streetwear
