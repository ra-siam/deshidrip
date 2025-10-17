# Admin CMS Guide - Deshi Drip

## Accessing the Admin Panel

### Login Credentials
**URL**: `http://localhost:3000/admin/login`

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

## Admin Features

### 1. Dashboard (`/admin/dashboard`)
The main overview of your e-commerce store.

**Features:**
- 📊 Key metrics cards (Products, Orders, Revenue, Customers)
- 📈 Trend indicators (+/- percentages)
- 📦 Recent orders list
- ⚠️ Low stock alerts
- Real-time statistics

### 2. Products Management (`/admin/products`)
Manage your entire product catalog.

**Features:**
- View all products in a data table
- Search products by name
- Filter by brand (ZeroOne, ZeroTwo, ZeroThree, ZeroFour)
- Product details:
  - Product image
  - Name and ID
  - Brand and category
  - Price (current and original)
  - Stock levels
  - Status badges (Exclusive, Weekly Drop)
- Actions: Edit, Delete

**Product Information Displayed:**
- Thumbnail image
- Product name and ID
- Brand
- Category
- Price (with sale price if applicable)
- Current stock
- Special status badges

### 3. Orders Management (`/admin/orders`)
Track and manage all customer orders.

**Features:**
- View all orders with complete details
- Filter by status: All, Pending, Processing, Shipped, Delivered, Cancelled
- Order information:
  - Order ID and date
  - Customer name and phone
  - Number of items
  - Total amount
  - Payment method and status
  - Shipping provider and destination
  - Order status
- Actions: View details, Update shipping

**Order Statuses:**
- 🟡 Pending - New order waiting for confirmation
- 🟠 Processing - Order confirmed, preparing for shipment
- 🔵 Shipped - Order dispatched with courier
- 🟢 Delivered - Order received by customer
- 🔴 Cancelled - Order cancelled

### 4. Bundles Management (`/admin/bundles`)
Create and manage product bundles.

**Features:**
- View all existing bundles
- Bundle details:
  - Bundle image
  - Name and description
  - Included products list
  - Regular price vs Bundle price
  - Savings amount
- Create new bundles
- Edit existing bundles
- Delete bundles
- View bundle on storefront

### 5. Analytics & Reports (`/admin/analytics`)
Comprehensive sales and performance analytics.

**Metrics Available:**
- 💰 Total Revenue with trend
- 📦 Total Orders with trend
- 👥 Customer count
- 💵 Average order value

**Sales Reports:**
- Sales by brand (percentage breakdown)
- Top selling products (units and revenue)
- Payment methods distribution
- Shipping by region statistics

**Visual Data:**
- Progress bars for brand performance
- Ranked list of top products
- Payment method breakdown
- Regional shipping distribution

### 6. Settings (`/admin/settings`)
Configure store settings.

**Settings Categories:**

#### Store Settings
- Store name
- Store email
- Store phone
- Currency selection (BDT, USD)

#### Shipping Providers
- Enable/Disable shipping providers:
  - Pathao Courier
  - Steadfast Courier
  - RedX
  - Sundarban Courier
- Configure each provider

#### Payment Methods
- Enable/Disable payment options:
  - bKash
  - Nagad
  - Rocket
  - SSL Commerz (Card payments)
  - Cash on Delivery
- Configure payment gateways

#### Notifications
- Email for new orders
- Low stock alerts
- New customer registration
- Weekly sales reports

#### Security
- Change admin password
- Update security settings

## Admin Interface Features

### Navigation
- **Sidebar Navigation**: Quick access to all admin sections
- **Toggle Sidebar**: Collapse/expand for more workspace
- **Breadcrumb**: Always know where you are
- **Quick Actions**: Jump to any section

### Top Bar
- **Store View**: Link to view the public store
- **Admin Profile**: Shows current admin username and role
- **Logout**: Quick logout button

### Responsive Design
- Works on desktop and tablets
- Optimized for admin workflows
- Clean, professional interface

## User Roles

### Super Admin
- Full access to all features
- Can manage other admins
- Access to all settings

### Editor
- Can manage products and orders
- Limited settings access
- No admin management

## Data Management

### Products
- Total: 16 products across 4 brands
- Categories: Hoodies, Jackets, Pants, T-Shirts, Shorts, etc.
- Stock tracking enabled
- Price management
- Multiple images support

### Orders
All orders include:
- Customer information
- Shipping address (Bangladesh divisions)
- Payment details
- Shipping provider
- Order status tracking

### Bangladesh-Specific Features
- Division-based shipping
- Local payment methods (bKash, Nagad, Rocket)
- Cash on Delivery
- Regional shipping rates
- Taka (৳) currency

## Best Practices

### Product Management
1. Keep stock levels updated
2. Add clear product descriptions
3. Use high-quality images
4. Set appropriate categories
5. Mark special items (Exclusive, Weekly Drops)

### Order Management
1. Respond to new orders quickly
2. Update shipping status regularly
3. Confirm payments for COD orders
4. Track low-stock items
5. Process refunds promptly

### Analytics Usage
1. Check dashboard daily
2. Monitor top-selling products
3. Track payment method preferences
4. Analyze regional performance
5. Review weekly reports

## Security

### Admin Account
- Keep password secure
- Change password regularly
- Don't share credentials
- Use strong passwords

### Data Protection
- Orders stored securely
- Customer data encrypted
- Payment info masked
- Secure SSL connection

## Technical Details

### Built With
- Next.js 15 (App Router)
- TypeScript
- React Context for state
- Tailwind CSS for styling
- Local storage for demo

### Demo Mode
Currently in demo mode with:
- Mock data
- Local authentication
- No real payment processing
- Sample analytics

### Production Requirements
For production use:
1. Set up proper database
2. Implement real authentication
3. Connect payment gateways
4. Set up email service
5. Configure shipping APIs
6. Add backup system

## Troubleshooting

### Can't Login?
- Use demo credentials: admin / admin123
- Clear browser cache
- Check console for errors

### Data Not Saving?
- Demo mode uses localStorage
- Data resets on browser clear
- Production needs database

### Orders Not Showing?
- Check filter status
- Verify mock data loaded
- Refresh the page

## Future Enhancements

Coming soon:
- [ ] Real-time order notifications
- [ ] Email integration
- [ ] Advanced reporting
- [ ] Bulk product upload
- [ ] Customer management
- [ ] Inventory forecasting
- [ ] Marketing tools
- [ ] API integration

## Support

For questions or issues:
1. Check this documentation
2. Review code comments
3. Check Next.js docs
4. Test with demo credentials

## Quick Reference

### URLs
- Admin Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Bundles: `/admin/bundles`
- Analytics: `/admin/analytics`
- Settings: `/admin/settings`

### Demo Login
```
Username: admin
Password: admin123
```

### Common Tasks
1. **Add Product**: Products → Add Product button
2. **Process Order**: Orders → View → Update status
3. **Create Bundle**: Bundles → Create Bundle button
4. **View Reports**: Analytics → Select metric
5. **Update Settings**: Settings → Edit → Save

---

**Note**: This is a demo CMS. For production use, implement proper authentication, database, and security measures.
