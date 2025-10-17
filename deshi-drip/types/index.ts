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
