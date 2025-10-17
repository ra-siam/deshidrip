export type Brand = 'zeroone' | 'zerotwo' | 'zerothree' | 'zerofour';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  isNewArrival: boolean;
  isExclusive: boolean;
  isWeeklyDrop: boolean;
  stock: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
}

export interface CustomBundle {
  id: string;
  name: string;
  products: { product: Product; quantity: number }[];
  discount: number; // percentage discount
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WeeklyDrop {
  id: string;
  week: string;
  releaseDate: string;
  products: Product[];
  featured: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  paymentFee: number;
  total: number;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: {
    division: string;
    district: string;
    area: string;
    address: string;
  };
  payment: {
    method: string;
    transactionId?: string;
    status: 'pending' | 'paid' | 'failed';
  };
  shippingDetails: {
    provider: string;
    trackingNumber?: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
