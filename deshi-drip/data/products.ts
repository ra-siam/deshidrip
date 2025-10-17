import { Product, Bundle, WeeklyDrop } from '@/types';

export const products: Product[] = [
  // ZeroOne Brand - Streetwear Focus
  {
    id: 'zo1-001',
    name: 'Urban Legend Hoodie',
    brand: 'zeroone',
    price: 89.99,
    originalPrice: 129.99,
    description: 'Premium heavyweight hoodie with signature embroidered logo. Made from 100% organic cotton.',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Grey'],
    isNewArrival: true,
    isExclusive: false,
    isWeeklyDrop: true,
    stock: 50
  },
  {
    id: 'zo1-002',
    name: 'Skyline Joggers',
    brand: 'zeroone',
    price: 69.99,
    description: 'Tapered fit joggers with zip pockets and adjustable drawstring.',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'],
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    isNewArrival: true,
    isExclusive: false,
    isWeeklyDrop: true,
    stock: 75
  },
  {
    id: 'zo1-003',
    name: 'City Lights Tee',
    brand: 'zeroone',
    price: 39.99,
    description: 'Oversized graphic tee with unique city skyline print.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    isNewArrival: false,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 100
  },
  {
    id: 'zo1-004',
    name: 'Phantom Bomber Jacket',
    brand: 'zeroone',
    price: 149.99,
    originalPrice: 199.99,
    description: 'Limited edition bomber jacket with reversible design.',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    category: 'Jackets',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Olive'],
    isNewArrival: true,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 30
  },

  // ZeroTwo Brand - Minimalist Luxury
  {
    id: 'zo2-001',
    name: 'Essence Crewneck',
    brand: 'zerotwo',
    price: 99.99,
    description: 'Minimalist crewneck with subtle branding and premium cotton blend.',
    images: ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800'],
    category: 'Sweatshirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Black', 'Sage'],
    isNewArrival: true,
    isExclusive: false,
    isWeeklyDrop: true,
    stock: 60
  },
  {
    id: 'zo2-002',
    name: 'Clarity Cargo Pants',
    brand: 'zerotwo',
    price: 119.99,
    description: 'Modern cargo pants with clean lines and functional pockets.',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'],
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black', 'Navy'],
    isNewArrival: false,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 45
  },
  {
    id: 'zo2-003',
    name: 'Pure Form Polo',
    brand: 'zerotwo',
    price: 79.99,
    description: 'Elevated polo shirt in premium pique cotton.',
    images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800'],
    category: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy'],
    isNewArrival: false,
    isExclusive: false,
    isWeeklyDrop: false,
    stock: 80
  },
  {
    id: 'zo2-004',
    name: 'Zenith Trench Coat',
    brand: 'zerotwo',
    price: 249.99,
    originalPrice: 349.99,
    description: 'World exclusive trench coat in water-resistant fabric.',
    images: ['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800'],
    category: 'Outerwear',
    sizes: ['M', 'L', 'XL'],
    colors: ['Khaki', 'Black'],
    isNewArrival: true,
    isExclusive: true,
    isWeeklyDrop: true,
    stock: 20
  },

  // ZeroThree Brand - Athletic Performance
  {
    id: 'zo3-001',
    name: 'Velocity Track Jacket',
    brand: 'zerothree',
    price: 109.99,
    description: 'High-performance track jacket with moisture-wicking technology.',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red'],
    isNewArrival: true,
    isExclusive: false,
    isWeeklyDrop: true,
    stock: 55
  },
  {
    id: 'zo3-002',
    name: 'Sprint Tech Shorts',
    brand: 'zerothree',
    price: 49.99,
    description: 'Lightweight shorts with breathable mesh panels.',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'],
    category: 'Shorts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey', 'Navy'],
    isNewArrival: false,
    isExclusive: false,
    isWeeklyDrop: false,
    stock: 90
  },
  {
    id: 'zo3-003',
    name: 'Pulse Performance Tee',
    brand: 'zerothree',
    price: 44.99,
    description: 'Anti-odor athletic tee with quick-dry fabric.',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Grey', 'Blue'],
    isNewArrival: false,
    isExclusive: false,
    isWeeklyDrop: false,
    stock: 120
  },
  {
    id: 'zo3-004',
    name: 'Apex Training Hoodie',
    brand: 'zerothree',
    price: 94.99,
    originalPrice: 124.99,
    description: 'World exclusive performance hoodie with four-way stretch.',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Charcoal', 'Navy'],
    isNewArrival: true,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 40
  },

  // ZeroFour Brand - Avant-Garde Fashion
  {
    id: 'zo4-001',
    name: 'Noir Statement Jacket',
    brand: 'zerofour',
    price: 189.99,
    originalPrice: 249.99,
    description: 'Deconstructed jacket with asymmetrical design and premium hardware.',
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    category: 'Jackets',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Charcoal'],
    isNewArrival: true,
    isExclusive: true,
    isWeeklyDrop: true,
    stock: 25
  },
  {
    id: 'zo4-002',
    name: 'Eclipse Oversized Tee',
    brand: 'zerofour',
    price: 59.99,
    description: 'Extra oversized tee with unique cut and bold graphics.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
    category: 'T-Shirts',
    sizes: ['One Size', 'XL'],
    colors: ['Black', 'White', 'Rust'],
    isNewArrival: true,
    isExclusive: false,
    isWeeklyDrop: true,
    stock: 70
  },
  {
    id: 'zo4-003',
    name: 'Dimension Cargo Pants',
    brand: 'zerofour',
    price: 139.99,
    description: 'Multi-pocket cargo pants with detachable elements.',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'],
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Olive', 'Grey'],
    isNewArrival: false,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 35
  },
  {
    id: 'zo4-004',
    name: 'Vortex Puffer Jacket',
    brand: 'zerofour',
    price: 299.99,
    description: 'World exclusive oversized puffer with unique quilting pattern.',
    images: ['https://images.unsplash.com/photo-1548126032-079751f4d3da?w=800'],
    category: 'Outerwear',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Silver'],
    isNewArrival: true,
    isExclusive: true,
    isWeeklyDrop: false,
    stock: 15
  },
];

export const bundles: Bundle[] = [
  {
    id: 'bundle-001',
    name: 'ZeroOne Essentials',
    description: 'Complete streetwear look with hoodie, joggers, and tee',
    products: [
      products.find(p => p.id === 'zo1-001')!,
      products.find(p => p.id === 'zo1-002')!,
      products.find(p => p.id === 'zo1-003')!,
    ],
    price: 169.99,
    originalPrice: 199.97,
    savings: 29.98,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'
  },
  {
    id: 'bundle-002',
    name: 'ZeroTwo Minimalist Pack',
    description: 'Refined basics for the modern wardrobe',
    products: [
      products.find(p => p.id === 'zo2-001')!,
      products.find(p => p.id === 'zo2-002')!,
      products.find(p => p.id === 'zo2-003')!,
    ],
    price: 259.99,
    originalPrice: 299.97,
    savings: 39.98,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800'
  },
  {
    id: 'bundle-003',
    name: 'ZeroThree Performance Kit',
    description: 'Complete athletic outfit for peak performance',
    products: [
      products.find(p => p.id === 'zo3-001')!,
      products.find(p => p.id === 'zo3-002')!,
      products.find(p => p.id === 'zo3-003')!,
    ],
    price: 179.99,
    originalPrice: 204.97,
    savings: 24.98,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'
  },
  {
    id: 'bundle-004',
    name: 'ZeroFour Statement Set',
    description: 'Bold fashion pieces for the trendsetter',
    products: [
      products.find(p => p.id === 'zo4-001')!,
      products.find(p => p.id === 'zo4-002')!,
      products.find(p => p.id === 'zo4-003')!,
    ],
    price: 349.99,
    originalPrice: 389.97,
    savings: 39.98,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'
  },
];

export const weeklyDrops: WeeklyDrop[] = [
  {
    id: 'drop-w42',
    week: 'Week 42 Drop',
    releaseDate: '2025-10-17',
    featured: true,
    products: products.filter(p => p.isWeeklyDrop),
  },
];

export const exclusiveProducts = products.filter(p => p.isExclusive);

export const brandInfo = {
  zeroone: {
    name: 'ZeroOne',
    tagline: 'Urban Legends',
    description: 'Street-inspired fashion for the modern rebel',
    color: '#FF6B6B'
  },
  zerotwo: {
    name: 'ZeroTwo',
    tagline: 'Minimalist Luxury',
    description: 'Refined essentials for the discerning individual',
    color: '#4ECDC4'
  },
  zerothree: {
    name: 'ZeroThree',
    tagline: 'Performance First',
    description: 'Athletic wear engineered for excellence',
    color: '#45B7D1'
  },
  zerofour: {
    name: 'ZeroFour',
    tagline: 'Avant-Garde',
    description: 'Pushing boundaries of contemporary fashion',
    color: '#96CEB4'
  },
};
